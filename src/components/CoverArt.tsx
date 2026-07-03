import { getCategory } from "@/lib/data/categories";
import type { CategorySlug } from "@/lib/types";

/**
 * 타이포그래픽 커버 — 사진 없이도 성립하는 칼럼 커버.
 * 카테고리 톤 그라데이션 + 세리프 헤드라인 발췌.
 */
export default function CoverArt({
  category,
  title,
  size = "md",
  className = "",
}: {
  category: CategorySlug;
  title: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const cat = getCategory(category);
  const from = cat?.tone.from ?? "#1c5951";
  const to = cat?.tone.to ?? "#123f39";
  const fg = cat?.tone.fg ?? "#ffffff";
  const firstClause = title.split(/[,?—]/)[0];

  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
      aria-hidden
    >
      {/* 은은한 텍스처 링 */}
      <div
        className="absolute -right-10 -top-14 h-48 w-48 rounded-full opacity-15"
        style={{ border: `1.5px solid ${fg}` }}
      />
      <div
        className="absolute -right-2 -top-6 h-24 w-24 rounded-full opacity-20"
        style={{ border: `1px solid ${fg}` }}
      />
      <div className={size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-5"}>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.24em] opacity-80"
          style={{ color: fg }}
        >
          {cat?.name}
        </p>
        <p
          className={`mt-2 font-serif font-semibold leading-snug ${
            size === "sm"
              ? "text-[15px]"
              : size === "lg"
                ? "text-2xl md:text-3xl"
                : "text-lg"
          }`}
          style={{ color: fg, wordBreak: "keep-all" }}
        >
          {firstClause}
        </p>
      </div>
    </div>
  );
}
