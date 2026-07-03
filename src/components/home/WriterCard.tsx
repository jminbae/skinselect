import Link from "next/link";
import Image from "next/image";
import type { Column, Doctor } from "@/lib/types";

/** 홈 — 필진 카드 (ScrollRow 자식). 미니멀: 작은 원형 사진 + 이름 + 최신 글 */
export default function WriterCard({
  doctor,
  column,
}: {
  doctor: Doctor;
  column: Column;
}) {
  return (
    <div className="w-[124px] shrink-0 snap-start" role="listitem">
      <Link href={`/doctors/${doctor.slug}`} className="group block text-center">
        <span className="relative mx-auto block h-16 w-16 overflow-hidden rounded-full bg-paper-warm shadow-card">
          <Image
            src={doctor.photos[0]}
            alt={`${doctor.name} 프로필`}
            fill
            sizes="64px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </span>
        <p className="mt-2.5 text-[14px] font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
          {doctor.name}
        </p>
      </Link>
      <Link href={`/columns/${column.slug}`} className="mt-1.5 block text-center">
        <span className="line-clamp-2 text-[12px] leading-snug text-ink-faint transition-colors hover:text-accent">
          {column.title}
        </span>
      </Link>
    </div>
  );
}
