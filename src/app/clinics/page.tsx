import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { clinics } from "@/lib/data/clinics";
import { AdLabel, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "진료 병원 안내 (광고)",
  description:
    "스킨셀렉트 필진 원장들이 진료하는 힐하우스피부과 5개 지점(강남·수원·판교·건대·대구)의 위치·진료시간·연락처 안내 페이지입니다.",
};

/** 지점 목록 — 페이지 전체가 명시적 광고 영역 (CLI-01 진입점) */
export default function ClinicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
      {/* 광고 라벨 — 페이지 최상단 좌측 상시 노출 */}
      <AdLabel />

      <header className="mt-8 max-w-2xl md:mt-10">
        <Eyebrow>Clinics</Eyebrow>
        <h1 className="mt-3 font-serif text-[30px] font-bold leading-tight text-ink md:text-[40px]">
          진료 병원 안내
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          이 페이지는 광고 영역입니다. 스킨셀렉트 필진 원장들이 진료하는
          힐하우스피부과 {clinics.length}개 지점의 위치·진료시간·연락처를
          안내합니다.
        </p>
      </header>

      <div className="stagger mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-14 md:gap-6">
        {clinics.map((clinic) => (
          <Link
            key={clinic.slug}
            href={`/clinics/${clinic.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-paper-warm">
              <Image
                src={clinic.photos[0]}
                alt={`${clinic.name} 시설 사진`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-accent">
                {clinic.region}
              </p>
              <h2 className="mt-1.5 font-serif text-[20px] font-bold text-ink transition-colors group-hover:text-accent">
                {clinic.name}
              </h2>
              <p className="mt-2.5 flex-1 line-clamp-2 text-[14px] leading-relaxed text-ink-soft">
                {clinic.intro}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-[13px] text-ink-faint">
                  원장 {clinic.doctorSlugs.length}명 진료
                </span>
                <span className="flex items-center gap-1 text-[13px] font-medium text-accent">
                  지점 안내
                  <span
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
