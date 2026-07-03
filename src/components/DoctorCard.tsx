import Link from "next/link";
import Image from "next/image";
import type { Column, Doctor } from "@/lib/types";
import { DoctorBadge } from "@/components/ui";

/**
 * 필진 카드 — 팀블로그의 저자 카드.
 * 사진 + 이름 + 배지 + 한 줄 철학 + 대표 글.
 * 소속·별점·후기·순위·조회수는 표기하지 않는다.
 */
export default function DoctorCard({
  doctor,
  pinnedColumn,
}: {
  doctor: Doctor;
  pinnedColumn?: Column;
}) {
  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[5/5] overflow-hidden bg-paper-warm">
        <Image
          src={doctor.photos[0]}
          alt={`${doctor.name} 원장 프로필 사진`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-[19px] font-bold text-ink">
            {doctor.name}
          </h3>
          <DoctorBadge badge={doctor.badge} />
        </div>
        <p className="mt-2.5 line-clamp-2 font-serif text-[15px] leading-relaxed text-ink-soft">
          “{doctor.headline}”
        </p>
        {pinnedColumn ? (
          <p className="mt-4 border-t border-line pt-3.5 text-[13px] leading-snug text-ink-soft">
            <span className="mr-1.5 font-semibold text-accent">대표 글</span>
            <span className="line-clamp-1 inline">{pinnedColumn.title}</span>
          </p>
        ) : (
          <p className="mt-4 border-t border-line pt-3.5 text-[13px] text-ink-faint">
            첫 칼럼을 준비하고 있어요
          </p>
        )}
      </div>
    </Link>
  );
}
