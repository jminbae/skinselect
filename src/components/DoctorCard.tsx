import Link from "next/link";
import Image from "next/image";
import type { Column, Doctor } from "@/lib/types";
import { DoctorBadge } from "@/components/ui";
import { branchName } from "@/lib/data/clinics";

/**
 * 원장 카드 (DOC-00 스펙) — 사진(정방형)+이름+배지+지점+분야 칩 최대 3개
 * +대표 칼럼 1편. 별점·후기·순위·조회수 없음 (Must).
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
        <p className="mt-1 text-[13px] text-ink-faint">
          힐하우스 {branchName(doctor.branch)}
        </p>
        <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-ink-soft">
          {doctor.headline}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {doctor.fields.slice(0, 3).map((f) => (
            <span
              key={f}
              className="rounded-full bg-paper-warm px-2.5 py-1 text-[12px] font-medium text-ink-soft"
            >
              {f}
            </span>
          ))}
        </div>
        {pinnedColumn && (
          <p className="mt-4 border-t border-line pt-3.5 text-[13px] leading-snug text-ink-soft">
            <span className="mr-1.5 font-semibold text-accent">대표 칼럼</span>
            <span className="line-clamp-1 inline">{pinnedColumn.title}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
