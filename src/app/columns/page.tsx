import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { columns } from "@/lib/data/columns";
import { getDoctor } from "@/lib/data/doctors";
import ColumnCard from "@/components/ColumnCard";
import { Chip, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "칼럼",
  description:
    "피부과 의사가 실명으로 쓰는 피부 칼럼 — 모든 글에 근거 출처와 최종 검토일을 답니다. 여드름부터 색소·안티에이징·두피까지 8개 주제.",
};

export default function ColumnsPage() {
  const sorted = [...columns].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="border-b border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-12 md:px-8 md:pb-10 md:pt-16">
          <Eyebrow>Columns</Eyebrow>
          <h1 className="mt-3 font-serif text-[30px] font-bold leading-tight text-ink md:text-[40px]">
            의사의 답, 칼럼
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-[16px]">
            모든 글의 저자는 면허를 검증한 의사이고, 모든 글에 근거 출처와
            최종 검토일이 붙습니다. 현재 {sorted.length}편.
          </p>

          {/* 카테고리 칩 — 전체 + 8개 주제 허브 */}
          <nav aria-label="칼럼 주제" className="mt-8">
            <div className="scroll-row -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
              <Chip label="전체" href="/columns" active />
              {categories.map((cat) => (
                <Chip
                  key={cat.slug}
                  label={cat.name}
                  href={`/columns/topic/${cat.slug}`}
                />
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* 전체 칼럼 리스트 — 최신순 */}
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            최신순
          </p>
          <div className="stagger mt-2">
            {sorted.map((column) => {
              const author = getDoctor(column.authorSlug);
              if (!author) return null;
              return (
                <ColumnCard
                  key={column.slug}
                  column={column}
                  author={author}
                  variant="row"
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
