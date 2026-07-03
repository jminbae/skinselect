import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CategorySlug, Doctor, SnsLink } from "@/lib/types";
import { doctors, getDoctor } from "@/lib/data/doctors";
import { getClinic } from "@/lib/data/clinics";
import { columnsByAuthor } from "@/lib/data/columns";
import { equipmentByBranch } from "@/lib/data/equipment";
import { site } from "@/lib/site";
import ColumnCard from "@/components/ColumnCard";
import ScrollRow from "@/components/ScrollRow";
import { Chip, DoctorBadge } from "@/components/ui";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name} — ${doctor.badge} · 스킨셀렉트 필진`,
    description: `"${doctor.headline}" — ${doctor.badge} ${doctor.name}의 칼럼과 소개.`,
    openGraph: { images: [doctor.photos[0]] },
  };
}

/* ── 분야 칩 ↔ 카테고리 링크 짝짓기 ── */
const FIELD_KEYWORDS: [RegExp, CategorySlug][] = [
  [/여드름|모공|흉터|피지/, "acne"],
  [/기미|색소|미백|백반증|잡티|피부톤/, "pigment"],
  [/리프팅|탄력|주름|노화|안티에이징|스킨부스터|필러|톡신|볼륨/, "anti-aging"],
  [/아토피|민감|습진|홍조|장벽/, "sensitive"],
  [/두피|탈모|모발/, "scalp-hair"],
  [/질환|사마귀|종양|무좀|손발톱/, "skin-disease"],
  [/스킨케어|성분|화장품|기초/, "skincare"],
  [/레이저|고주파|시술/, "laser"],
];

function fieldTopicSlug(
  doctor: Doctor,
  field: string,
  index: number,
): CategorySlug | undefined {
  for (const [re, slug] of FIELD_KEYWORDS) {
    if (re.test(field) && doctor.fieldSlugs.includes(slug)) return slug;
  }
  if (doctor.fields.length === doctor.fieldSlugs.length) {
    return doctor.fieldSlugs[index];
  }
  return undefined;
}

/* ── SNS 아이콘 ── */
function SnsIcon({ type }: { type: SnsLink["type"] }) {
  const cls = "h-[16px] w-[16px]";
  switch (type) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
          <path d="M10 9.2l5 2.8-5 2.8V9.2z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M10 14a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
          <path d="M14 10a5 5 0 0 0-7.1 0l-2.4 2.4a5 5 0 0 0 7.1 7.1l1.2-1.2" />
        </svg>
      );
  }
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[18px] font-bold tracking-tight text-ink md:text-[20px]">
      {children}
    </h2>
  );
}

/** 원장 페이지 — 디지털 명함 + 개인 블로그 홈 (/doctors/{slug}) */
export default async function DoctorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) notFound();

  const clinic = getClinic(doctor.branch);
  const cols = columnsByAuthor(doctor.slug);
  const gear = equipmentByBranch(doctor.branch);
  const visibleCareer = doctor.career.slice(0, 3);
  const hiddenCareer = doctor.career.slice(3);

  /* Physician JSON-LD — 저자 엔티티 */
  const alumni = doctor.career
    .filter((c) => c.item.includes("대학") && c.item.includes("졸업"))
    .map((c) => ({
      "@type": "CollegeOrUniversity",
      name: c.item.replace(/\s*졸업$/, ""),
    }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: "Dermatology",
    image: `${site.url}${doctor.photos[0]}`,
    url: `${site.url}/doctors/${doctor.slug}`,
    ...(clinic
      ? {
          worksFor: {
            "@type": "MedicalClinic",
            name: clinic.name,
            url: `${site.url}/clinics/${clinic.slug}`,
          },
        }
      : {}),
    ...(alumni.length > 0 ? { alumniOf: alumni } : {}),
    ...(doctor.sns && doctor.sns.length > 0
      ? { sameAs: doctor.sns.map((s) => s.url) }
      : {}),
  };

  return (
    <article className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 명함 헤더: 작은 사진 + 이름 + 배지 + 한 줄 + SNS + 주제 ── */}
      <header className="border-b border-line py-12 md:py-16">
        <div className="flex items-start gap-5 md:gap-8">
          <span className="relative block h-[104px] w-[104px] shrink-0 overflow-hidden rounded-2xl bg-paper-warm shadow-card md:h-[150px] md:w-[150px]">
            <Image
              src={doctor.photos[0]}
              alt={`${doctor.name} 프로필`}
              fill
              priority
              sizes="150px"
              className="object-cover object-top"
            />
          </span>
          <div className="min-w-0 pt-1">
            <h1 className="text-[26px] font-extrabold tracking-[-0.03em] text-ink md:text-[34px]">
              {doctor.name}
              <span className="ml-2 align-middle text-[13px] font-medium tracking-normal text-ink-faint md:text-[14px]">
                {doctor.position ?? "원장"}
              </span>
            </h1>
            <div className="mt-2">
              <DoctorBadge badge={doctor.badge} size="md" />
            </div>
            <p className="mt-4 max-w-md text-[15px] font-medium leading-relaxed text-ink-soft md:text-[16.5px]">
              {doctor.headline}
            </p>
            {doctor.sns && doctor.sns.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {doctor.sns.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label ?? s.type}
                    className="inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-full border border-line px-3 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    <SnsIcon type={s.type} />
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        {doctor.fields.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {doctor.fields.map((f, i) => {
              const topic = fieldTopicSlug(doctor, f, i);
              return (
                <Chip
                  key={f}
                  label={f}
                  href={topic ? `/columns/topic/${topic}` : undefined}
                />
              );
            })}
          </div>
        )}
      </header>

      {/* ── 글 ── */}
      <section className="py-10 md:py-14">
        <div className="mb-2 flex items-end justify-between gap-4">
          <SectionTitle>
            글 {cols.length > 0 && (
              <span className="text-ink-faint">{cols.length}</span>
            )}
          </SectionTitle>
        </div>
        {cols.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line-strong px-6 py-12 text-center">
            <p className="text-[16px] font-bold text-ink">
              {doctor.name}의 첫 칼럼을 준비하고 있어요
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              궁금한 점을 먼저 남겨 보세요. 좋은 질문은 칼럼의 소재가 됩니다.
            </p>
            <Link
              href="/community"
              className="mt-6 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-paper transition-colors hover:bg-accent"
            >
              질문 남기기
            </Link>
          </div>
        ) : (
          <div>
            {cols.map((c) => (
              <ColumnCard key={c.slug} column={c} author={doctor} variant="row" />
            ))}
          </div>
        )}
      </section>

      {/* ── 소개 ── */}
      <section className="border-t border-line py-10 md:py-14">
        <SectionTitle>소개</SectionTitle>
        <div className="mt-5 space-y-3.5">
          {doctor.intro.map((sentence) => (
            <p
              key={sentence}
              className="text-[15px] leading-[1.85] text-ink-soft"
            >
              {sentence}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
            학력 · 경력 · 학회
          </h3>
          <ul className="mt-4 space-y-3">
            {visibleCareer.map((c) => (
              <li
                key={c.item}
                className="flex gap-3 text-[14px] leading-snug text-ink-soft"
              >
                <span
                  className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-line-strong"
                  aria-hidden
                />
                {c.item}
              </li>
            ))}
          </ul>
          {hiddenCareer.length > 0 && (
            <details className="group mt-1.5">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 py-2.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">
                  전체 경력 보기 ({hiddenCareer.length}건 더)
                </span>
                <span className="hidden group-open:inline">접기</span>
                <svg
                  viewBox="0 0 12 12"
                  className="h-3 w-3 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden
                >
                  <path d="M2 4.5l4 3.5 4-3.5" />
                </svg>
              </summary>
              <ul className="mt-1.5 space-y-3">
                {hiddenCareer.map((c) => (
                  <li
                    key={c.item}
                    className="flex gap-3 text-[14px] leading-snug text-ink-soft"
                  >
                    <span
                      className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-line-strong"
                      aria-hidden
                    />
                    {c.item}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </section>

      {/* ── 둘러보기 — 사진만 ── */}
      <section className="border-t border-line py-10 md:py-14">
        <SectionTitle>둘러보기</SectionTitle>

        <ScrollRow className="mt-6" ariaLabel={`${doctor.name} 사진`}>
          {doctor.photos.map((src, i) => (
            <figure
              key={src}
              role="listitem"
              className="w-[58%] shrink-0 snap-start sm:w-[40%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-paper-warm shadow-card">
                <Image
                  src={src}
                  alt={`${doctor.name} 사진 ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 58vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
            </figure>
          ))}
          {clinic?.photos.map((src, i) => (
            <figure
              key={src}
              role="listitem"
              className="w-[58%] shrink-0 snap-start sm:w-[40%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-paper-warm shadow-card">
                <Image
                  src={src}
                  alt={`진료 공간 사진 ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 58vw, 40vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </ScrollRow>

        {gear.length > 0 && (
          <ScrollRow className="mt-4" ariaLabel="장비">
            {gear.map((e) => (
              <figure
                key={e.name}
                role="listitem"
                className="w-[38%] shrink-0 snap-start sm:w-[24%]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-paper-warm shadow-card">
                  {e.image && (
                    <Image
                      src={e.image}
                      alt={`${e.name} 장비 사진`}
                      fill
                      sizes="(max-width: 640px) 38vw, 24vw"
                      className="object-contain p-4"
                    />
                  )}
                </div>
                <figcaption className="mt-2 text-center text-[12px] font-medium text-ink-faint">
                  {e.name}
                </figcaption>
              </figure>
            ))}
          </ScrollRow>
        )}
      </section>

      {/* ── 진료 병원 링크 카드 — 병원으로 가는 유일한 동선 ── */}
      {clinic && (
        <section className="border-t border-line pt-10">
          <Link
            href={`/clinics/${clinic.slug}`}
            className="group flex items-center justify-between gap-5 rounded-xl bg-paper p-5 shadow-card transition-shadow hover:shadow-card-hover md:p-6"
          >
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                진료 병원 안내
              </p>
              <p className="mt-2 text-[16px] font-bold tracking-tight text-ink transition-colors group-hover:text-accent md:text-[18px]">
                {doctor.name} 원장 진료: {clinic.name}
              </p>
              <p className="mt-1 text-[12.5px] text-ink-faint">{clinic.region}</p>
            </div>
            <span
              className="shrink-0 text-[20px] text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden
            >
              →
            </span>
          </Link>
        </section>
      )}
    </article>
  );
}
