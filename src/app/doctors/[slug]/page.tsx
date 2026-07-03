import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CategorySlug, Doctor, SnsLink } from "@/lib/types";
import { doctors, getDoctor } from "@/lib/data/doctors";
import { branchName, getClinic } from "@/lib/data/clinics";
import { columnsByAuthor } from "@/lib/data/columns";
import { equipmentByBranch } from "@/lib/data/equipment";
import { site } from "@/lib/site";
import HeroCrossfade from "@/components/HeroCrossfade";
import CountUpStrip, { type StripItem } from "@/components/CountUpStrip";
import ColumnCard from "@/components/ColumnCard";
import ScrollRow from "@/components/ScrollRow";
import SectionHeading from "@/components/SectionHeading";
import { Chip, DoctorBadge, Eyebrow } from "@/components/ui";
import DoctorActionBar from "@/components/doctors/DoctorActionBar";

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
    title: `${doctor.name} 원장 — ${doctor.badge}`,
    description: `"${doctor.headline}" — 피부과 전문의 ${doctor.name} 원장의 칼럼과 소개.`,
    openGraph: { images: [doctor.photos[0]] },
  };
}

/* ── ② 사회적 증거 임계값 — 미달 칸은 숨김, 전부 미달이면 스트립 미노출 ── */
const STAT_THRESHOLDS = { columns: 3, views: 10000, answers: 5 } as const;

function buildStripItems(doctor: Doctor): StripItem[] {
  const { stats } = doctor;
  if (!stats) return [];
  const items: StripItem[] = [];
  if (stats.columns !== undefined && stats.columns >= STAT_THRESHOLDS.columns) {
    items.push({ label: "발행 칼럼", value: stats.columns, suffix: "편" });
  }
  if (stats.views !== undefined && stats.views >= STAT_THRESHOLDS.views) {
    items.push({ label: "누적 조회", value: stats.views, format: "man" });
  }
  if (stats.answers !== undefined && stats.answers >= STAT_THRESHOLDS.answers) {
    items.push({ label: "질문 답변", value: stats.answers, suffix: "건" });
  }
  return items;
}

/* ── ③ 분야 칩 ↔ 카테고리 링크 짝짓기 ──
 * fields(원장 커스텀 라벨)와 fieldSlugs의 길이가 다른 원장이 있어
 * 키워드 매칭(본인 fieldSlugs 안에서만)을 우선하고, 길이가 같으면 인덱스로 짝짓는다. */
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

/* ── ① SNS 아이콘 행 — 고정 배치, 24px 아이콘 + 44px 터치 영역, 새 탭 ── */
function SnsIcon({ type }: { type: SnsLink["type"] }) {
  const cls = "h-[18px] w-[18px]";
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
    case "blog":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M4 20h4l11-11a2.4 2.4 0 0 0-3.4-3.4L4.6 16.6 4 20z" />
        </svg>
      );
    case "brunch":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5z" />
          <path d="M8 7h8M8 11h8" />
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

function SnsRow({ sns }: { sns: SnsLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {sns.map((s) => (
        <a
          key={s.url}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label ?? s.type}
          className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line-strong px-3.5 text-ink-soft transition-all duration-150 hover:scale-105 hover:border-accent hover:text-accent"
        >
          <SnsIcon type={s.type} />
          {s.label && (
            <span className="text-[13px] font-medium">{s.label}</span>
          )}
        </a>
      ))}
    </div>
  );
}

/* ── ⑥ 서브행 라벨 ── */
function RowLabel({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <h3 className="text-[15px] font-bold text-ink">{title}</h3>
      {note && <span className="text-[12.5px] text-ink-faint">{note}</span>}
    </div>
  );
}

/** DOC-01 원장 페이지 — /doctors/{slug} (스펙 ①~⑦ 순서 그대로) */
export default async function DoctorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) notFound();

  const clinic = getClinic(doctor.branch);
  const branchLabel = branchName(doctor.branch);
  const cols = columnsByAuthor(doctor.slug);
  const stripItems = buildStripItems(doctor);
  const gear = equipmentByBranch(doctor.branch);
  const visibleCareer = doctor.career.slice(0, 3);
  const hiddenCareer = doctor.career.slice(3);

  /* Physician JSON-LD — 저자 엔티티 SEO의 핵심 자산 */
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
            address: clinic.address,
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
    <article className="pb-28 md:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ① HERO — 모바일 상단 풀블리드 / 데스크탑 좌(사진)·우(텍스트) 2단 */}
      <section className="border-b border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-12 md:px-8 md:py-16 lg:gap-16">
          <HeroCrossfade
            photos={doctor.photos}
            alt={`${doctor.name} 원장`}
            className="aspect-[4/5] w-full bg-paper-warm md:aspect-[5/6] md:rounded-3xl md:shadow-card"
          />
          <div className="stagger px-5 pb-12 pt-8 md:p-0">
            <Eyebrow>Doctor</Eyebrow>
            <h1 className="mt-3 font-serif text-[36px] font-bold leading-tight tracking-tight text-ink md:text-[48px]">
              {doctor.name}
              <span className="ml-2.5 align-middle font-sans text-[15px] font-semibold text-ink-faint md:text-[17px]">
                {doctor.position ?? "원장"}
              </span>
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <DoctorBadge badge={doctor.badge} size="md" />
            </div>
            <p className="mt-7 max-w-md font-serif text-[20px] font-medium leading-[1.6] text-ink md:text-[23px]">
              “{doctor.headline}”
            </p>
            {doctor.sns && doctor.sns.length > 0 && (
              <div className="mt-8">
                <SnsRow sns={doctor.sns} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ② 사회적 증거 스트립 + ③ 주력 진료 분야 칩 */}
      <section className="mx-auto max-w-6xl px-5 pt-10 md:px-8 md:pt-12">
        {stripItems.length > 0 && (
          <div className="mx-auto max-w-2xl">
            <CountUpStrip items={stripItems} />
          </div>
        )}
        <div className={stripItems.length > 0 ? "mt-10" : ""}>
          <Eyebrow>자주 다루는 주제</Eyebrow>
          <div className="mt-3.5 flex flex-wrap gap-2">
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
        </div>
      </section>

      {/* ④ 대표 칼럼 (Story) — 페이지의 실질적 메인 */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="Story"
          title={`${doctor.name} 원장의 칼럼`}
          moreHref={cols.length > 0 ? "/columns" : undefined}
          moreLabel="전체 칼럼"
        />

        {doctor.greeting && (
          <figure className="mb-10 max-w-2xl">
            <blockquote className="relative rounded-2xl border border-line bg-paper-warm px-7 py-7 md:px-9 md:py-8">
              <span
                className="absolute -top-4 left-6 font-serif text-[52px] leading-none text-accent/30"
                aria-hidden
              >
                “
              </span>
              <p className="font-serif text-[17px] font-medium leading-[1.75] text-ink md:text-[19px]">
                {doctor.greeting}
              </p>
              <figcaption className="mt-4 text-[13px] text-ink-faint">
                — {doctor.name} 원장의 인사말
              </figcaption>
            </blockquote>
          </figure>
        )}

        {cols.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong bg-white px-6 py-14 text-center">
            <p className="font-serif text-[19px] font-bold text-ink md:text-[21px]">
              {doctor.name} 원장의 첫 칼럼을 준비하고 있어요
            </p>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
              궁금한 점을 먼저 남겨 보세요. 좋은 질문은 칼럼의 소재가 됩니다.
            </p>
            <Link
              href="/community"
              className="mt-7 inline-flex items-center rounded-full bg-accent px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              질문 남기기
            </Link>
          </div>
        ) : (
          <>
            <div className="max-w-2xl">
              <ColumnCard column={cols[0]} author={doctor} variant="featured" />
            </div>
            {cols.length > 1 && (
              <ScrollRow
                className="mt-6"
                ariaLabel={`${doctor.name} 원장의 다른 칼럼`}
              >
                {cols.slice(1).map((c) => (
                  <ColumnCard
                    key={c.slug}
                    column={c}
                    author={doctor}
                    variant="mini"
                  />
                ))}
              </ScrollRow>
            )}
          </>
        )}
      </section>

      {/* ⑤ 소개 (Profile) — 쉬운 언어 소개 + 학력·경력 아코디언 */}
      <section className="border-y border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <SectionHeading eyebrow="Profile" title="소개" />
          <div className="grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
            <div className="space-y-4">
              {doctor.intro.map((sentence) => (
                <p
                  key={sentence}
                  className="text-[16px] leading-[1.9] text-ink-soft"
                >
                  {sentence}
                </p>
              ))}
            </div>
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                학력 · 경력 · 학회
              </h3>
              <ul className="mt-5 space-y-3.5">
                {visibleCareer.map((c) => (
                  <li
                    key={c.item}
                    className="flex gap-3 text-[14.5px] leading-snug text-ink-soft"
                  >
                    <span
                      className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {c.item}
                  </li>
                ))}
              </ul>
              {hiddenCareer.length > 0 && (
                <details className="group mt-2">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 py-2.5 text-[14px] font-semibold text-accent transition-colors hover:text-accent-deep [&::-webkit-details-marker]:hidden">
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
                  <ul className="mt-1.5 space-y-3.5">
                    {hiddenCareer.map((c) => (
                      <li
                        key={c.item}
                        className="flex gap-3 text-[14.5px] leading-snug text-ink-soft"
                      >
                        <span
                          className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {c.item}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ 둘러보기 — 인물 · 공간 · 장비 (설명 없이 사진만) */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHeading eyebrow="Gallery" title="둘러보기" />

        {/* (a) 원장 갤러리 */}
        <RowLabel title="갤러리" note="인물 · 진료 환경" />
        <ScrollRow ariaLabel={`${doctor.name} 원장 갤러리`}>
          {doctor.photos.map((src, i) => (
            <figure
              key={src}
              role="listitem"
              className="w-[72%] shrink-0 snap-start sm:w-[46%] md:w-[31%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-warm shadow-card">
                <Image
                  src={src}
                  alt={`${doctor.name} 원장 사진 ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 46vw, 31vw"
                  className="object-cover object-top"
                />
              </div>
            </figure>
          ))}
        </ScrollRow>

        {/* (b) 소속 지점 공간 사진 */}
        {clinic && clinic.photos.length > 0 && (
          <>
            <RowLabel title="진료 공간" />
            <ScrollRow ariaLabel={`${clinic.name} 공간 사진`}>
              {clinic.photos.map((src, i) => (
                <figure
                  key={src}
                  role="listitem"
                  className="w-[72%] shrink-0 snap-start sm:w-[46%] md:w-[31%]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-warm shadow-card">
                    <Image
                      src={src}
                      alt={`${clinic.name} 공간 사진 ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 46vw, 31vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              ))}
            </ScrollRow>
          </>
        )}

        {/* (c) 장비 — 사진과 이름만 */}
        {gear.length > 0 && (
          <>
            <RowLabel title="장비" />
            <ScrollRow ariaLabel="보유 장비">
              {gear.map((e) => (
                <figure
                  key={e.name}
                  role="listitem"
                  className="w-[46%] shrink-0 snap-start sm:w-[30%] md:w-[22%]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-warm shadow-card">
                    {e.image && (
                      <Image
                        src={e.image}
                        alt={`${e.name} 장비 사진`}
                        fill
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                        className="object-contain p-5"
                      />
                    )}
                  </div>
                  <figcaption className="mt-2.5 text-center text-[13px] font-medium text-ink-soft">
                    {e.name}
                  </figcaption>
                </figure>
              ))}
            </ScrollRow>
          </>
        )}
      </section>

      {/* ⑦ 진료 병원 링크 카드 — 병원으로 가는 유일한 동선 (지도·전화·예약 문구 없음) */}
      {clinic && (
        <section className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
          <Link
            href={`/clinics/${clinic.slug}`}
            className="group flex items-center justify-between gap-5 rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover md:p-8"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
                진료 병원 안내
              </p>
              <p className="mt-2.5 font-serif text-[19px] font-bold leading-snug text-ink transition-colors group-hover:text-accent md:text-[23px]">
                {doctor.name} 원장 진료: 힐하우스 {branchLabel}
              </p>
              <p className="mt-1.5 text-[13.5px] text-ink-faint">
                {clinic.region}
              </p>
            </div>
            <span
              className="shrink-0 text-[24px] text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden
            >
              →
            </span>
          </Link>
        </section>
      )}

      {/* 하단 고정 바 — 질문하기 | 진료 병원 안내 */}
      <DoctorActionBar
        name={doctor.name}
        branch={doctor.branch}
        branchLabel={branchLabel}
      />
    </article>
  );
}
