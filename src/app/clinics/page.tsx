import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { clinics } from "@/lib/data/clinics";

export const metadata: Metadata = {
  title: "병원 둘러보기",
  description: "스킨셀렉트 필진이 진료하는 공간과 시술 장비를 둘러보세요.",
};

/** 병원 둘러보기 — 갤러리 목록 */
export default function ClinicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <section className="py-10 md:py-14">
        <h1 className="text-[26px] font-extrabold tracking-[-0.03em] text-ink md:text-[34px]">
          병원 둘러보기
        </h1>
        <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
          스킨셀렉트 필진이 진료하는 공간과 시술 장비입니다.
        </p>
      </section>

      <section className="pb-6">
        <div className="stagger grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {clinics.map((c) => (
            <Link
              key={c.slug}
              href={`/clinics/${c.slug}`}
              className="group overflow-hidden rounded-xl bg-paper shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.photos[0]}
                  alt={`${c.name} 공간`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <h2 className="text-[16.5px] font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
                  {c.name}
                </h2>
                <p className="mt-1.5 text-[12.5px] text-ink-faint">
                  의사 {c.doctorSlugs.length}명 · 공간과 장비 보기
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
