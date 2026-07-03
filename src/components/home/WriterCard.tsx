import Link from "next/link";
import Image from "next/image";
import type { Column, Doctor } from "@/lib/types";

/**
 * 홈 — 원장별 최신 글 카드 (HOME-02 §8, ScrollRow 자식).
 * 원형 사진·이름 → 원장 페이지, 칼럼 제목 → 칼럼 상세.
 */
export default function WriterCard({
  doctor,
  column,
}: {
  doctor: Doctor;
  column: Column;
}) {
  return (
    <div className="w-[148px] shrink-0 snap-start" role="listitem">
      <Link href={`/doctors/${doctor.slug}`} className="group block text-center">
        <span className="relative mx-auto block h-[88px] w-[88px] overflow-hidden rounded-full bg-paper-warm shadow-card">
          <Image
            src={doctor.photos[0]}
            alt={`${doctor.name} 원장`}
            fill
            sizes="88px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </span>
        <p className="mt-3 text-[15px] font-semibold text-ink transition-colors group-hover:text-accent">
          {doctor.name} 원장
        </p>
        <p className="mt-0.5 text-[11.5px] text-ink-faint">{doctor.badge}</p>
      </Link>
      <Link href={`/columns/${column.slug}`} className="mt-3 block text-center">
        <span className="line-clamp-2 text-[12.5px] leading-snug text-ink-soft transition-colors hover:text-accent">
          {column.title}
        </span>
      </Link>
    </div>
  );
}
