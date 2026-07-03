import Link from "next/link";
import Image from "next/image";
import type { Column, Doctor } from "@/lib/types";
import { DoctorBadge } from "@/components/ui";

/**
 * 필진 카드 — 미니멀 가로형. 작은 사진 + 이름 + 배지 + 한 줄 + 대표 글.
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
      className="group flex h-full items-start gap-4 rounded-xl bg-paper p-5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-paper-warm">
        <Image
          src={doctor.photos[0]}
          alt={`${doctor.name} 프로필 사진`}
          fill
          sizes="64px"
          className="object-cover object-top"
        />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[16px] font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
            {doctor.name}
          </span>
          <DoctorBadge badge={doctor.badge} />
        </span>
        <span className="mt-1.5 line-clamp-2 block text-[13.5px] leading-relaxed text-ink-soft">
          {doctor.headline}
        </span>
        {pinnedColumn ? (
          <span className="mt-2.5 line-clamp-1 block text-[12.5px] text-ink-faint">
            대표 글 · {pinnedColumn.title}
          </span>
        ) : (
          <span className="mt-2.5 block text-[12.5px] text-ink-faint">
            첫 칼럼을 준비하고 있어요
          </span>
        )}
      </span>
    </Link>
  );
}
