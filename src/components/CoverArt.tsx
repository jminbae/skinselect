import { getCategory } from "@/lib/data/categories";
import type { CategorySlug } from "@/lib/types";

/**
 * 미니멀 커버 — 뉴트럴 블록 + 카테고리 컬러 도트 + 라벨.
 * 사진·그라데이션 없이 리스트의 리듬만 만든다.
 */
export default function CoverArt({
  category,
  size = "md",
  className = "",
}: {
  category: CategorySlug;
  title?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const cat = getCategory(category);
  const dot = cat?.tone.from ?? "#0e7a5f";

  return (
    <div
      className={`relative flex h-full w-full items-end bg-paper-warm ${className}`}
      aria-hidden
    >
      <span
        className={`absolute rounded-full ${
          size === "lg" ? "left-6 top-6 h-2.5 w-2.5" : "left-4 top-4 h-2 w-2"
        }`}
        style={{ background: dot }}
      />
      <p
        className={`font-semibold uppercase tracking-[0.16em] text-ink-faint ${
          size === "sm"
            ? "p-4 text-[10px]"
            : size === "lg"
              ? "p-6 text-[12px]"
              : "p-4 text-[11px]"
        }`}
      >
        {cat?.name}
      </p>
    </div>
  );
}
