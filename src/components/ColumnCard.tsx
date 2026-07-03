import Link from "next/link";
import Image from "next/image";
import type { Column, Doctor } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { DoctorBadge, Reactions } from "@/components/ui";
import CoverArt from "@/components/CoverArt";

/** 저자 미니 라인 (사진 + 이름 + 배지) */
export function AuthorChip({
  doctor,
  size = "sm",
}: {
  doctor: Doctor;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="group/author relative z-10 flex items-center gap-2.5"
    >
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full bg-paper-warm ${
          size === "md" ? "h-10 w-10" : "h-8 w-8"
        }`}
      >
        <Image
          src={doctor.photos[0]}
          alt={`${doctor.name} 원장`}
          fill
          sizes="40px"
          className="object-cover object-top"
        />
      </span>
      <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <span
          className={`font-semibold text-ink group-hover/author:text-accent ${
            size === "md" ? "text-[15px]" : "text-[13.5px]"
          }`}
        >
          {doctor.name} 원장
        </span>
        <DoctorBadge badge={doctor.badge} />
      </span>
    </Link>
  );
}

/** 카드 전체를 덮는 스트레치드 링크 — 내부에 개별 링크(저자 등)가 공존할 수 있게 */
function StretchedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="absolute inset-0 z-[1]" aria-label={label} />
  );
}

/**
 * 칼럼 카드 — variant:
 *  hero     오늘의 픽 대형 카드 (홈 최상단)
 *  featured 에디터 픽 (커버 + 요약)
 *  row      리스트형 (텍스트 중심, 목록·피드)
 *  mini     가로 스크롤용 축소형
 *
 * hero/featured/row는 내부에 저자 링크가 공존하므로 중첩 <a>를 피해
 * 스트레치드 링크 패턴을 쓴다 (React 19 hydration 규칙).
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
      <div className="group relative overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
        <StretchedLink href={`/columns/${column.slug}`} label={column.title} />
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px]">
            <CoverArt category={column.category} title={column.title} size="lg" />
          </div>
          <div className="flex flex-col justify-between p-6 md:p-9">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-clay">
                오늘의 픽
              </p>
              <h3 className="mt-3 font-serif text-[24px] font-bold leading-[1.35] text-ink transition-colors group-hover:text-accent md:text-[30px]">
                {column.title}
              </h3>
              <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-ink-soft">
                {column.summary}
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <AuthorChip doctor={author} size="md" />
              <Reactions helpful={column.helpful} questions={column.questionCount} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
        <StretchedLink href={`/columns/${column.slug}`} label={column.title} />
        <div className="relative aspect-[16/9]">
          <CoverArt category={column.category} title={column.title} />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-[17.5px] font-bold leading-snug text-ink transition-colors group-hover:text-accent">
            {column.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
            {column.summary}
          </p>
          <div className="mt-4 flex items-center justify-between gap-2">
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
        className="group flex h-full w-[72%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-card-hover sm:w-[46%] md:w-[31%]"
        role="listitem"
      >
        <div className="relative aspect-[16/9]">
          <CoverArt category={column.category} title={column.title} size="sm" />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
            {column.title}
          </h3>
          <p className="mt-auto pt-3 text-[12.5px] text-ink-faint">
            {author.name} 원장 · {cat?.short}
          </p>
        </div>
      </Link>
    );
  }

  // row (기본)
  return (
    <div className="group relative flex items-start gap-5 border-b border-line py-6 last:border-b-0">
      <StretchedLink href={`/columns/${column.slug}`} label={column.title} />
      <div className="min-w-0 flex-1">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-accent">
          {cat?.name}
        </p>
        <h3 className="mt-1.5 font-serif text-[17.5px] font-bold leading-snug text-ink transition-colors group-hover:text-accent md:text-[19px]">
          {column.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-ink-soft">
          {column.summary}
        </p>
        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <AuthorChip doctor={author} />
          <Reactions helpful={column.helpful} questions={column.questionCount} />
        </div>
      </div>
      <div className="relative hidden h-[92px] w-[132px] shrink-0 overflow-hidden rounded-xl sm:block">
        <CoverArt category={column.category} title={column.title} size="sm" />
      </div>
    </div>
  );
}
