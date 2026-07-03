import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data/categories";
import { columnsByCategory } from "@/lib/data/columns";
import { getDoctor } from "@/lib/data/doctors";
import { site } from "@/lib/site";
import ColumnCard, { AuthorChip } from "@/components/ColumnCard";
import CoverArt from "@/components/CoverArt";
import { Chip } from "@/components/ui";

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.name} 칼럼`,
    description: cat.description,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const list = columnsByCategory(cat.slug).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const hub = list.find((c) => c.isHub);
  const rest = hub ? list.filter((c) => c.slug !== hub.slug) : list;
  const hubAuthor = hub ? getDoctor(hub.authorSlug) : undefined;
  const otherCats = categories.filter((c) => c.slug !== cat.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${cat.name} 칼럼`,
        description: cat.description,
        url: `${site.url}/columns/topic/${cat.slug}`,
        isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "칼럼",
            item: `${site.url}/columns`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cat.name,
            item: `${site.url}/columns/topic/${cat.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 카테고리 헤더 밴드 — 커버 아트 톤 */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${cat.tone.from} 0%, ${cat.tone.to} 100%)`,
        }}
      >
        {/* 은은한 텍스처 링 (CoverArt 모티프) */}
        <div
          className="absolute -right-16 -top-24 h-80 w-80 rounded-full opacity-15"
          style={{ border: `1.5px solid ${cat.tone.fg}` }}
          aria-hidden
        />
        <div
          className="absolute -right-4 -top-10 h-40 w-40 rounded-full opacity-20"
          style={{ border: `1px solid ${cat.tone.fg}` }}
          aria-hidden
        />
        <div
          className={`relative mx-auto max-w-6xl px-5 pt-12 md:px-8 md:pt-16 ${
            hub ? "pb-28 md:pb-32" : "pb-14 md:pb-20"
          }`}
          style={{ color: cat.tone.fg }}
        >
          <nav
            aria-label="현재 위치"
            className="flex items-center gap-1.5 text-[12.5px] opacity-75"
          >
            <Link href="/" className="transition-opacity hover:opacity-100">
              홈
            </Link>
            <span aria-hidden>›</span>
            <Link
              href="/columns"
              className="transition-opacity hover:opacity-100"
            >
              칼럼
            </Link>
            <span aria-hidden>›</span>
            <span className="font-semibold">{cat.name}</span>
          </nav>
          <h1 className="mt-5 font-serif text-[32px] font-bold leading-tight md:text-[44px]">
            {cat.name}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-85 md:text-[16.5px]">
            {cat.description}
          </p>
          <p className="mt-6 text-[11.5px] font-bold uppercase tracking-[0.22em] opacity-70">
            칼럼 {list.length}편
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* 총정리(허브) 글 — 상단 고정 대형 카드 */}
        {hub && hubAuthor && (
          <div className="group relative -mt-14 overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover md:-mt-16">
            <Link
              href={`/columns/${hub.slug}`}
              className="absolute inset-0 z-[1]"
              aria-label={hub.title}
            />
            <div className="grid md:grid-cols-[1fr_1.15fr]">
              <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[300px]">
                <CoverArt category={hub.category} title={hub.title} size="lg" />
              </div>
              <div className="flex flex-col justify-between p-6 md:p-9">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-soft px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-clay">
                    총정리
                  </span>
                  <h2 className="mt-4 font-serif text-[22px] font-bold leading-[1.4] text-ink transition-colors group-hover:text-accent md:text-[27px]">
                    {hub.title}
                  </h2>
                  <p className="mt-3.5 line-clamp-3 text-[14.5px] leading-relaxed text-ink-soft">
                    {hub.summary}
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                  <AuthorChip doctor={hubAuthor} size="md" />
                  <span className="text-[12.5px] text-ink-faint">
                    {hub.readingMinutes}분 읽기
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 최신순 리스트 */}
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              최신 글
            </p>
            <div className="stagger mt-2">
              {rest.map((column) => {
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

      {/* 다른 주제로 이동 */}
      <section className="border-t border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <h2 className="font-serif text-[19px] font-bold text-ink md:text-[22px]">
            다른 주제 둘러보기
          </h2>
          <nav aria-label="다른 칼럼 주제" className="mt-5">
            <div className="scroll-row -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
              <Chip label="전체" href="/columns" />
              {otherCats.map((c) => (
                <Chip
                  key={c.slug}
                  label={c.name}
                  href={`/columns/topic/${c.slug}`}
                />
              ))}
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
