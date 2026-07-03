import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { columns } from "@/lib/data/columns";
import { getDoctor } from "@/lib/data/doctors";
import ColumnCard from "@/components/ColumnCard";
import { Chip } from "@/components/ui";

export const metadata: Metadata = {
  title: "칼럼",
  description:
    "피부과 전문의가 실명으로 쓰는 시술·안티에이징 칼럼. 기전과 근거, 기대치와 한계까지.",
};

/** 칼럼 탐색 — 이미지 카드 그리드 */
export default function ColumnsPage() {
  const sorted = [...columns].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <section className="py-10 md:py-14">
        <h1 className="text-[26px] font-extrabold tracking-[-0.03em] text-ink md:text-[34px]">
          칼럼
        </h1>
        <p className="mt-3 text-[14.5px] text-ink-soft">
          시술의 기전과 근거, 기대치와 한계까지 — 전 {sorted.length}편. 모든
          글에 근거 출처와 최종 검토일이 붙습니다.
        </p>
        <nav aria-label="칼럼 주제" className="mt-6">
          <div className="scroll-row -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            <Chip label="전체" active />
            {categories.map((c) => (
              <Chip
                key={c.slug}
                label={c.name}
                href={`/columns/topic/${c.slug}`}
              />
            ))}
          </div>
        </nav>
      </section>

      <section className="pb-6">
        <div className="stagger grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {sorted.map((column) => {
            const author = getDoctor(column.authorSlug);
            if (!author) return null;
            return (
              <ColumnCard
                key={column.slug}
                column={column}
                author={author}
                variant="featured"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
