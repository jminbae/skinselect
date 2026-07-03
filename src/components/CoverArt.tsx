import Image from "next/image";
import { getCategory } from "@/lib/data/categories";
import type { CategorySlug } from "@/lib/types";

/**
 * 실사 커버 — 칼럼 cover 사진, 없으면 카테고리 대표 이미지.
 * 장비 PNG(투명 배경)는 뉴트럴 배경 위에 담는다.
 */
export default function CoverArt({
  category,
  cover,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
}: {
  category: CategorySlug;
  cover?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const cat = getCategory(category);
  const src = cover ?? cat?.image ?? "/images/clinics/gangnam/1.webp";
  const isDevice = src.includes("/equipment/");

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-paper-warm ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={
          isDevice
            ? "object-contain p-6 transition-transform duration-700 group-hover:scale-[1.03]"
            : "object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        }
      />
    </div>
  );
}
