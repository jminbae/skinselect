import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { doctors, getDoctor, doctorsByBranch } from "@/lib/data/doctors";
import { getClinic } from "@/lib/data/clinics";
import { columnsByAuthor } from "@/lib/data/columns";
import { equipmentByBranch } from "@/lib/data/equipment";
import { getCategory } from "@/lib/data/categories";
import { site } from "@/lib/site";
import DoctorHero from "@/components/doctors/DoctorHero";
import ColumnCard from "@/components/ColumnCard";
import DoctorCard from "@/components/DoctorCard";
import { Chip } from "@/components/ui";

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

/** 경력 리스트를 카드 3종으로 분류 — 수상 / 학회 활동 / 학력·경력 */
function splitCareer(career: { item: string }[]) {
  const awards: string[] = [];
  const societies: string[] = [];
  const rest: string[] = [];
  for (const { item } of career) {
    if (/수상|최우수|학술상|연구자상|우수.*상|상 \(|\(\d{4}\)$/.test(item) && /상/.test(item)) {
      awards.push(item);
    } else if (/학회|의사회|연구회/.test(item) && /회원|이사|간사|평의원|위원|의원/.test(item)) {
      societies.push(item);
    } else {
      rest.push(item);
    }
  }
  return { awards, societies, rest };
}

function InfoCard({
  title,
  icon,
  children,
  fullWidth = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`rounded-xl bg-paper p-6 shadow-card md:p-7 ${
        fullWidth ? "md:col-span-2" : ""
      }`}
    >
      <h2 className="flex items-center gap-2 text-[15px] font-bold tracking-tight text-ink">
        <span className="text-accent">{icon}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

const ICONS = {
  intro: (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="8" cy="5.5" r="3" />
      <path d="M2.5 14c.8-2.6 3-4 5.5-4s4.7 1.4 5.5 4" />
    </svg>
  ),
  career: (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M8 1.5l6.5 3L8 7.5l-6.5-3L8 1.5z" />
      <path d="M3 6v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V6" />
    </svg>
  ),
  society: (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="5.5" cy="6" r="2.5" />
      <circle cx="11" cy="6" r="2" />
      <path d="M1.5 13c.6-2 2.2-3.2 4-3.2s3.4 1.2 4 3.2M9.5 10.2c.5-.3 1-.4 1.5-.4 1.6 0 3 1 3.5 2.7" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="8" cy="6" r="4" />
      <path d="M5.5 9.5L4.5 14l3.5-2 3.5 2-1-4.5" />
    </svg>
  ),
  field: (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12.5 1.5l2 2L5 13l-3 1 1-3 9.5-9.5z" />
    </svg>
  ),
} as const;

/** 원장 페이지 — 프로필 히어로 + 인포 카드 + 병원·장비 갤러리 + 칼럼 + 팀 */
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
  const team = doctorsByBranch(doctor.branch).filter(
    (d) => d.slug !== doctor.slug,
  );
  const { awards, societies, rest } = splitCareer(doctor.career);

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

      {/* ── 히어로: 그라데이션 배경 + 누끼 사진 크로스페이드 + SNS 풍선 ── */}
      <DoctorHero
        photos={doctor.photos.map((p) => p.replace(".webp", "-cut.webp"))}
        name={doctor.name}
        position={doctor.position ?? "원장"}
        badge={doctor.badge}
        clinicName={clinic?.name}
        clinicHref={clinic ? `/clinics/${clinic.slug}` : undefined}
        quote={doctor.headline}
        sns={doctor.sns}
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* ── 인포 카드 그리드 ── */}
        <section className="grid gap-4 py-10 md:grid-cols-2 md:gap-5 md:py-14">
          <InfoCard title="소개" icon={ICONS.intro} fullWidth>
            <div className="space-y-2.5">
              {doctor.intro.map((s) => (
                <p key={s} className="text-[14.5px] leading-[1.8] text-ink-soft">
                  {s}
                </p>
              ))}
            </div>
          </InfoCard>

          {rest.length > 0 && (
            <InfoCard title="학력 · 경력" icon={ICONS.career}>
              <ul className="space-y-2.5">
                {rest.map((item) => (
                  <li key={item} className="text-[13.5px] leading-snug text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}

          {societies.length > 0 && (
            <InfoCard title="학회 활동" icon={ICONS.society}>
              <ul className="space-y-2.5">
                {societies.map((item) => (
                  <li key={item} className="text-[13.5px] leading-snug text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}

          {awards.length > 0 && (
            <InfoCard title="수상" icon={ICONS.award}>
              <ul className="space-y-2.5">
                {awards.map((item) => (
                  <li key={item} className="text-[13.5px] leading-snug text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}

          {doctor.fields.length > 0 && (
            <InfoCard title="자주 다루는 주제" icon={ICONS.field}>
              <div className="flex flex-wrap gap-2">
                {doctor.fields.map((f, i) => {
                  const topic = doctor.fieldSlugs[i] ?? doctor.fieldSlugs[0];
                  return (
                    <Chip
                      key={f}
                      label={f}
                      href={topic ? `/columns/topic/${topic}` : undefined}
                    />
                  );
                })}
              </div>
            </InfoCard>
          )}
        </section>

        {/* ── 병원 — 원내 둘러보기 타일 그리드 ── */}
        {clinic && clinic.photos.length > 0 && (
          <section className="border-t border-line py-10 md:py-14">
            <h2 className="mb-6 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
              병원 둘러보기
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {clinic.photos.map((src, i) => (
                <figure
                  key={src}
                  className={`relative overflow-hidden rounded-xl bg-paper-warm ${
                    i === 0 ? "col-span-2 aspect-[16/9] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${clinic.name} 공간 ${i + 1}`}
                    fill
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── 장비 갤러리 ── */}
        {gear.length > 0 && (
          <section className="border-t border-line py-10 md:py-14">
            <h2 className="mb-6 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
              시술 장비
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
              {gear.map((e) => {
                const cat = getCategory(e.fieldSlugs[0]);
                return (
                  <div
                    key={e.name}
                    className="overflow-hidden rounded-xl bg-paper shadow-card"
                  >
                    <div className="relative aspect-square bg-paper-warm">
                      {e.image && (
                        <Image
                          src={e.image}
                          alt={`${e.name} 장비`}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-contain p-5"
                        />
                      )}
                    </div>
                    <div className="p-3.5">
                      <p className="text-[13.5px] font-bold tracking-tight text-ink">
                        {e.name}
                      </p>
                      {cat && (
                        <span className="mt-1.5 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-semibold text-accent-deep">
                          {cat.name}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── 칼럼 ── */}
        <section className="border-t border-line py-10 md:py-14">
          <h2 className="mb-2 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
            칼럼{" "}
            {cols.length > 0 && (
              <span className="text-ink-faint">{cols.length}</span>
            )}
          </h2>
          {cols.length === 0 ? (
            <p className="py-8 text-[14.5px] text-ink-faint">
              {doctor.name}의 첫 칼럼을 준비하고 있어요.
            </p>
          ) : (
            <div>
              {cols.map((c) => (
                <ColumnCard key={c.slug} column={c} author={doctor} variant="row" />
              ))}
            </div>
          )}
        </section>

        {/* ── 함께 일하는 의사 ── */}
        {team.length > 0 && (
          <section className="border-t border-line pt-10 md:pt-14">
            <h2 className="mb-6 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
              함께 일하는 의사
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {team.map((d) => {
                const pinned = columnsByAuthor(d.slug)[0];
                return (
                  <DoctorCard key={d.slug} doctor={d} pinnedColumn={pinned} />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
