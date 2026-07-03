import Link from "next/link";
import Image from "next/image";
import type { Column, Doctor } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { DoctorBadge } from "@/components/ui";
import CoverArt from "@/components/CoverArt";

/** 저자 미니 라인 (사진 + 이름 + 배지) */
export function AuthorChip({
  doctor,
  size = "sm",
  onDark = false,
}: {
  doctor: Doctor;
  size?: "sm" | "md";
  onDark?: boolean;
}) {
  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="group/author relative z-10 flex items-center gap-2.5"
    >
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full bg-paper-warm ${
          size === "md" ? "h-9 w-9" : "h-7 w-7"
        }`}
      >
        <Image
          src={doctor.photos[0]}
          alt={`${doctor.name} 프로필`}
          fill
          sizes="36px"
          className="object-cover object-top"
        />
      </span>
      <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <span
          className={`font-semibold ${
            onDark
              ? "text-white group-hover/author:text-white/80"
              : "text-ink group-hover/author:text-accent"
          } ${size === "md" ? "text-[14.5px]" : "text-[13px]"}`}
        >
          {doctor.name}
        </span>
        {onDark ? (
          <span className="text-[11.5px] font-medium text-white/70">
            {doctor.badge}
          </span>
        ) : (
          <DoctorBadge badge={doctor.badge} />
        )}
      </span>
    </Link>
  );
}

/** 카드 전체를 덮는 스트레치드 링크 */
function StretchedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="absolute inset-0 z-[1]" aria-label={label} />
  );
}

/**
 * 칼럼 카드 — variant:
 *  hero     오늘의 픽 — 시네마틱 오버레이 (홈 최상단)
 *  featured 이미지 카드 (그리드)
 *  row      리스트형 (썸네일 + 텍스트)
 *  mini     가로 스크롤 축소형
 */
export default function ColumnCard({
  column,
  author,
  variant = "row",
}: {
  column: Column;
  author: Doctor;
  variant?: "hero" | "featured" | "row" | "mini";
}) {
  const cat = getCategory(column.category);

  if (variant === "hero") {
    return (
      <div className="group relative overflow-hidden rounded-2xl">
        <StretchedLink href={`/columns/${column.slug}`} label={column.title} />
        <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/10]">
          <CoverArt
            category={column.category}
            cover={column.cover}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
              {cat?.en} · 오늘의 픽
            </p>
            <h3 className="mt-2.5 max-w-2xl text-[24px] font-bold leading-[1.3] tracking-tight text-white md:text-[34px]">
              {column.title}
            </h3>
            <p className="mt-3 hidden max-w-xl text-[14.5px] leading-relaxed text-white/80 sm:line-clamp-2">
              {column.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <AuthorChip doctor={author} onDark />
              <span className="text-[12px] text-white/60">
                {column.readingMinutes}분 읽기
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-paper shadow-card transition-shadow duration-300 hover:shadow-card-hover">
        <StretchedLink href={`/columns/${column.slug}`} label={column.title} />
        <div className="relative aspect-[4/3]">
          <CoverArt
            category={column.category}
            cover={column.cover}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            {cat?.en}
          </p>
          <h3 className="mt-2 text-[16.5px] font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
            {column.title}
          </h3>
          <div className="mt-auto pt-4">
            <AuthorChip doctor={author} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "mini") {
    return (
      <Link
        href={`/columns/${column.slug}`}
        className="group flex h-full w-[68%] shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-paper shadow-card transition-shadow hover:shadow-card-hover sm:w-[42%] md:w-[30%]"
        role="listitem"
      >
        <div className="relative aspect-[16/10]">
          <CoverArt
            category={column.category}
            cover={column.cover}
            sizes="(max-width: 640px) 68vw, 30vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
            {column.title}
          </h3>
          <p className="mt-auto pt-3 text-[12px] text-ink-faint">
            {author.name} · {cat?.short}
          </p>
        </div>
      </Link>
    );
  }

  // row (기본) — 썸네일 + 텍스트
  return (
    <div className="group relative flex items-center gap-4 border-b border-line py-5 last:border-b-0 md:gap-6 md:py-6">
      <StretchedLink href={`/columns/${column.slug}`} label={column.title} />
      <div className="relative h-[76px] w-[104px] shrink-0 overflow-hidden rounded-lg md:h-[92px] md:w-[136px]">
        <CoverArt
          category={column.category}
          cover={column.cover}
          sizes="136px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-faint">
          {cat?.en}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent md:text-[17.5px]">
          {column.title}
        </h3>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <AuthorChip doctor={author} />
          <span className="text-[12px] text-ink-faint">
            {column.readingMinutes}분 읽기
          </span>
        </div>
      </div>
    </div>
  );
}
