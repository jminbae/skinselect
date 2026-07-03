import type { Metadata } from "next";
import { doctors } from "@/lib/data/doctors";
import { columnsByAuthor } from "@/lib/data/columns";
import DoctorCard from "@/components/DoctorCard";

export const metadata: Metadata = {
  title: "필진 — 글 쓰는 의사들",
  description: `의사 면허를 검증한 피부과 전문의 ${doctors.length}명이 실명으로 직접 씁니다. 스킨셀렉트의 필진을 만나 보세요.`,
};

/** 필진 — 팀 매거진의 저자 목록 (/doctors) */
export default function DoctorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <section className="border-b border-line py-12 md:py-16">
        <h1 className="text-[26px] font-extrabold tracking-[-0.03em] text-ink md:text-[34px]">
          글 쓰는 의사들
        </h1>
        <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
          의사 면허를 검증한 피부과 전문의 {doctors.length}명이 실명으로 직접
          씁니다. 각자의 진료실에서 나온 질문들이 이곳의 글이 됩니다.
        </p>
      </section>

      <section className="py-10 md:py-14">
        <div className="stagger grid gap-4 md:grid-cols-2">
          {doctors.map((doctor) => {
            const pinned = columnsByAuthor(doctor.slug)[0];
            return (
              <DoctorCard
                key={doctor.slug}
                doctor={doctor}
                pinnedColumn={pinned}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
