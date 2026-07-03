import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { SnsLink } from "@/lib/types";
import { doctors, getDoctor } from "@/lib/data/doctors";
import { getClinic } from "@/lib/data/clinics";
import { columnsByAuthor } from "@/lib/data/columns";
import { equipmentByBranch } from "@/lib/data/equipment";
import { getCategory } from "@/lib/data/categories";
import { site } from "@/lib/site";
import HeroCrossfade from "@/components/HeroCrossfade";
import ColumnCard from "@/components/ColumnCard";
import ScrollRow from "@/components/ScrollRow";
import { DoctorBadge } from "@/components/ui";

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

function SnsIcon({ type }: { type: SnsLink["type"] }) {
  const cls = "h-[15px] w-[15px]";
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

const TABS = [
  { id: "clinic", label: "병원" },
  { id: "devices", label: "장비" },
  { id: "columns", label: "칼럼" },
] as const;

/** 원장 페이지 — 디지털 명함: 큰 사진 2장 크로스페이드 → 소속·이름·배지 → 병원·장비·칼럼 */
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
    <article className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 명함 헤더: 큰 사진 2장 크로스페이드 + 소속·이름·배지 ── */}
      <header className="mx-auto max-w-6xl md:px-8 md:pt-10">
        <div className="md:grid md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] md:items-end md:gap-10 lg:gap-14">
          <HeroCrossfade
            photos={doctor.photos}
            alt={`${doctor.name} 프로필`}
            className="aspect-[4/5] w-full md:aspect-[5/6] md:rounded-2xl"
          />
          <div className="px-5 pb-2 pt-7 md:p-0 md:pb-4">
            {clinic && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                {clinic.name}
              </p>
            )}
            <h1 className="mt-2.5 text-[34px] font-extrabold leading-none tracking-[-0.03em] text-ink md:text-[52px]">
              {doctor.name}
              <span className="ml-2.5 align-middle text-[13px] font-medium tracking-normal text-ink-faint md:text-[15px]">
                {doctor.position ?? "원장"}
              </span>
            </h1>
            <div className="mt-3.5">
              <DoctorBadge badge={doctor.badge} size="md" />
            </div>
            <p className="mt-6 max-w-md text-[16px] font-medium leading-[1.65] text-ink-soft md:text-[18px]">
              {doctor.headline}
            </p>

            {/* 주제 · SNS */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {doctor.fields.slice(0, 4).map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-paper-warm px-3 py-1.5 text-[12.5px] font-medium text-ink-soft"
                >
                  {f}
                </span>
              ))}
              {doctor.sns?.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label ?? s.type}
                  className="inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-full border border-line px-2.5 text-[12px] font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  <SnsIcon type={s.type} />
                  {s.label}
                </a>
              ))}
            </div>

            {/* 섹션 탭 */}
            <nav
              aria-label="페이지 내 이동"
              className="mt-8 flex gap-6 border-t border-line pt-5"
            >
              {TABS.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="text-[14px] font-semibold text-ink-faint transition-colors hover:text-ink"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* ── 소개 (간결 명함 블록) ── */}
        <section className="border-b border-line py-10 md:py-14">
          <div className="md:grid md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] md:gap-10 lg:gap-14">
            <div className="space-y-3">
              {doctor.intro.map((sentence) => (
                <p
                  key={sentence}
                  className="text-[15px] leading-[1.85] text-ink-soft md:text-[15.5px]"
                >
                  {sentence}
                </p>
              ))}
            </div>
            <div className="mt-8 md:mt-0">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                학력 · 경력 · 학회
              </h2>
              <ul className="mt-4 space-y-2.5">
                {visibleCareer.map((c) => (
                  <li
                    key={c.item}
                    className="text-[13.5px] leading-snug text-ink-soft"
                  >
                    {c.item}
                  </li>
                ))}
              </ul>
              {hiddenCareer.length > 0 && (
                <details className="group mt-1">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 py-2 text-[13px] font-semibold text-ink-soft transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">
                      전체 보기 ({hiddenCareer.length})
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
                  <ul className="mt-1 space-y-2.5">
                    {hiddenCareer.map((c) => (
                      <li
                        key={c.item}
                        className="text-[13.5px] leading-snug text-ink-soft"
                      >
                        {c.item}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </div>
        </section>

        {/* ── 병원 — 공간 사진 큼직하게 ── */}
        {clinic && clinic.photos.length > 0 && (
          <section id="clinic" className="scroll-mt-20 border-b border-line py-10 md:py-14">
            <h2 className="mb-6 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
              병원
            </h2>
            <ScrollRow ariaLabel="진료 공간 사진">
              {clinic.photos.map((src, i) => (
                <figure
                  key={src}
                  role="listitem"
                  className="w-[82%] shrink-0 snap-start sm:w-[58%] md:w-[44%]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-warm">
                    <Image
                      src={src}
                      alt={`진료 공간 ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 82vw, 44vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              ))}
            </ScrollRow>
          </section>
        )}

        {/* ── 장비 — 프로덕트 카드 ── */}
        {gear.length > 0 && (
          <section id="devices" className="scroll-mt-20 border-b border-line py-10 md:py-14">
            <h2 className="mb-6 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
              장비
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
              {gear.map((e) => {
                const topic = e.fieldSlugs[0];
                const cat = getCategory(topic);
                return (
                  <Link
                    key={e.name}
                    href={`/columns/topic/${topic}`}
                    className="group overflow-hidden rounded-xl bg-paper shadow-card transition-shadow hover:shadow-card-hover"
                  >
                    <div className="relative aspect-square bg-paper-warm">
                      {e.image && (
                        <Image
                          src={e.image}
                          alt={`${e.name} 장비`}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      )}
                    </div>
                    <div className="p-3.5">
                      <p className="text-[13.5px] font-bold tracking-tight text-ink">
                        {e.name}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        {cat?.en}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── 칼럼 ── */}
        <section id="columns" className="scroll-mt-20 py-10 md:py-14">
          <h2 className="mb-2 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
            칼럼{" "}
            {cols.length > 0 && (
              <span className="text-ink-faint">{cols.length}</span>
            )}
          </h2>
          {cols.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line-strong px-6 py-12 text-center">
              <p className="text-[16px] font-bold text-ink">
                {doctor.name}의 첫 칼럼을 준비하고 있어요
              </p>
              <Link
                href="/community"
                className="mt-5 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-paper transition-colors hover:bg-accent"
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

        {/* ── 진료 병원 안내 — 병원으로 가는 유일한 동선 ── */}
        {clinic && (
          <section className="border-t border-line pt-8">
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
                <p className="mt-1 text-[12.5px] text-ink-faint">
                  {clinic.region}
                </p>
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
      </div>
    </article>
  );
}
