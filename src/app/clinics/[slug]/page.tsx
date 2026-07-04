import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { clinics, getClinic } from "@/lib/data/clinics";
import { doctors } from "@/lib/data/doctors";
import { columnsByAuthor } from "@/lib/data/columns";
import { equipmentByBranch } from "@/lib/data/equipment";
import { getCategory } from "@/lib/data/categories";
import HeroCrossfade from "@/components/HeroCrossfade";
import DoctorCard from "@/components/DoctorCard";

export function generateStaticParams() {
  return clinics.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) return {};
  return {
    title: `${clinic.name} — 둘러보기`,
    description: `${clinic.name}의 공간과 시술 장비, 그리고 이곳에서 글을 쓰는 의사들.`,
  };
}

/** 병원 둘러보기 — 공간·장비 갤러리 + 의료진 (예약·시간표 등 실무 정보 없음) */
export default async function ClinicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) notFound();

  const team = doctors.filter((d) => clinic.doctorSlugs.includes(d.slug));
  const gear = equipmentByBranch(clinic.slug);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
      {/* 히어로 — 공간 사진 크로스페이드 */}
      <section className="pt-6 md:pt-10">
        <HeroCrossfade
          photos={clinic.photos}
          alt={`${clinic.name} 공간`}
          className="aspect-[16/10] w-full rounded-2xl md:aspect-[21/9]"
        />
        <div className="px-1 pt-7 md:pt-9">
          <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-ink md:text-[38px]">
            {clinic.name}
          </h1>
          <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-soft md:text-[15.5px]">
            {clinic.intro}
          </p>
        </div>
      </section>

      {/* 의료진 */}
      {team.length > 0 && (
        <section className="border-b border-line py-10 md:py-14">
          <h2 className="mb-6 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
            글 쓰는 의사들{" "}
            <span className="text-ink-faint">{team.length}</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {team.map((d) => {
              const pinned = columnsByAuthor(d.slug)[0];
              return <DoctorCard key={d.slug} doctor={d} pinnedColumn={pinned} />;
            })}
          </div>
        </section>
      )}

      {/* 원내 둘러보기 */}
      {clinic.photos.length > 0 && (
        <section className="border-b border-line py-10 md:py-14">
          <h2 className="mb-6 text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
            원내 둘러보기
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {clinic.photos.map((src, i) => (
              <figure
                key={src}
                className={`relative overflow-hidden rounded-xl bg-paper-warm ${
                  i === 0
                    ? "col-span-2 aspect-[16/9] md:col-span-2 md:row-span-2 md:aspect-auto"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${clinic.name} 공간 ${i + 1}`}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 시술 장비 */}
      {gear.length > 0 && (
        <section className="py-10 md:py-14">
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
    </article>
  );
}
