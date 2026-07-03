import type { Metadata } from "next";
import { doctors } from "@/lib/data/doctors";
import { columnsByAuthor } from "@/lib/data/columns";
import { Eyebrow } from "@/components/ui";
import DoctorCard from "@/components/DoctorCard";

export const metadata: Metadata = {
  title: "필진 — 글 쓰는 의사들",
  description: `의사 면허를 검증한 피부과 전문의 ${doctors.length}명이 실명으로 직접 씁니다. 스킨셀렉트의 필진을 만나 보세요.`,
};

/** 필진 — 팀블로그의 저자 목록 (/doctors) */
export default function DoctorsPage() {
  return (
    <div>
      {/* 헤더 */}
      <section className="border-b border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <Eyebrow>Writers</Eyebrow>
          <h1 className="mt-3 font-serif text-[30px] font-bold leading-tight text-ink md:text-[40px]">
            글 쓰는 의사들
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
            의사 면허를 검증한 피부과 전문의 {doctors.length}명이 실명으로
            직접 씁니다. 각자의 진료실에서 나온 질문들이 이곳의 글이 됩니다.
          </p>
        </div>
      </section>

      {/* 필진 그리드 */}
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
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
