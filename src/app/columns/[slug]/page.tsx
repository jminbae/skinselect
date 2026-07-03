import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { columns, getColumn, relatedColumns } from "@/lib/data/columns";
import { getDoctor } from "@/lib/data/doctors";
import { getCategory } from "@/lib/data/categories";
import { draftNotice, site } from "@/lib/site";
import ColumnCard, { AuthorChip } from "@/components/ColumnCard";
import ScrollRow from "@/components/ScrollRow";
import SectionHeading from "@/components/SectionHeading";
import Disclaimer from "@/components/Disclaimer";
import { Chip, DoctorBadge } from "@/components/ui";
import { TocDesktop, TocMobile } from "@/components/columns/ColumnToc";

export function generateStaticParams() {
  return columns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) return {};
  return {
    title: column.title,
    description: column.summary,
  };
}

export default async function ColumnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) notFound();

  const author = getDoctor(column.authorSlug);
  const cat = getCategory(column.category);
  if (!author || !cat) notFound();

  const related = relatedColumns(column, 4);
  const dateDot = column.date.replaceAll("-", ".");
  const url = `${site.url}/columns/${column.slug}`;

  const tocItems = [
    ...column.blocks.map((b, i) => ({ id: `q-${i + 1}`, label: b.question })),
    { id: "conclusion", label: "이 글의 결론" },
  ];

  /* MedicalWebPage + FAQPage + BreadcrumbList — 기획서 B-1 (e) 구조화 데이터 */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": url,
        url,
        name: column.title,
        headline: column.title,
        description: column.summary,
        inLanguage: "ko",
        about: cat.name,
        datePublished: column.date,
        dateModified: column.date,
        lastReviewed: column.date,
        author: {
          "@type": "Physician",
          name: author.name,
          url: `${site.url}/doctors/${author.slug}`,
        },
        ...(column.reviewedBy
          ? {
              reviewedBy: {
                "@type": "Physician",
                name: column.reviewedBy,
              },
            }
          : {}),
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: column.blocks.map((b) => ({
          "@type": "Question",
          name: b.question,
          acceptedAnswer: { "@type": "Answer", text: b.answer },
        })),
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
          { "@type": "ListItem", position: 4, name: column.title, item: url },
        ],
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 상단: 카테고리 라벨 + 제목 + 메타 ── */}
      <header className="mx-auto max-w-6xl px-5 pt-10 md:px-8 md:pt-14">
        <div className="max-w-3xl">
          <nav
            aria-label="현재 위치"
            className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-faint"
          >
            <Link href="/columns" className="transition-colors hover:text-ink">
              칼럼
            </Link>
            <span aria-hidden>›</span>
            <Link
              href={`/columns/topic/${cat.slug}`}
              className="font-bold uppercase tracking-[0.08em] text-accent transition-colors hover:text-accent-deep"
            >
              {cat.name}
            </Link>
          </nav>

          <h1 className="mt-4 font-serif text-[27px] font-bold leading-[1.42] text-ink md:text-[38px] md:leading-[1.35]">
            {column.title}
          </h1>

          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-faint">
            <span>최종 검토일 {dateDot}</span>
            <span aria-hidden className="text-line-strong">
              ·
            </span>
            <span>{column.readingMinutes}분 읽기</span>
          </p>

          {/* 감수 전 예시 고지 — 한 줄 소형 배지 */}
          <p className="mt-6 inline-flex max-w-full items-start gap-2 rounded-lg border border-line bg-paper-warm px-3 py-1.5 text-[11px] leading-relaxed text-ink-faint">
            <span
              className="mt-[5px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              aria-hidden
            />
            {draftNotice}
          </p>
        </div>
      </header>

      {/* ── 본문 2단: 본문 + 우측 sticky TOC ── */}
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-8 md:px-8 md:pb-20 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
        <div className="max-w-3xl">
          {/* 요약 스니펫 박스 — AI 발췌 타깃 */}
          <section
            aria-label="핵심 요약"
            className="rounded-2xl border border-accent/15 bg-accent-soft p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-deep">
                핵심 요약
              </p>
              <p className="text-[11.5px] text-accent-deep/60">
                이 박스만 읽어도 답이 됩니다
              </p>
            </div>
            <p className="mt-4 text-[15.5px] font-medium leading-[1.85] text-ink">
              {column.summary}
            </p>
            <ul className="mt-5 space-y-2.5 border-t border-accent/10 pt-5">
              {column.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-soft"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-[4.5px] h-3.5 w-3.5 shrink-0 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/* 저자·감수 라인 */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-y border-line py-5">
            <AuthorChip doctor={author} size="md" />
            <div className="text-[12.5px] leading-relaxed text-ink-faint">
              <p>
                작성·검토: {author.name} 원장 · 최종 검토일 {dateDot}
              </p>
              {column.reviewedBy && (
                <p className="mt-0.5">
                  의학적 감수: {column.reviewedBy} 전문의
                </p>
              )}
            </div>
          </div>

          {/* 모바일 접이식 목차 */}
          <div className="mt-6 lg:hidden">
            <TocMobile items={tocItems} />
          </div>

          {/* Q&A 블록 */}
          {column.blocks.map((block, i) => (
            <section key={block.question} className="mt-12 md:mt-16">
              <p className="font-serif text-[14px] font-bold text-gold">
                Q{i + 1}
              </p>
              <h2
                id={`q-${i + 1}`}
                className="mt-2 scroll-mt-36 font-serif text-[21px] font-bold leading-[1.45] text-ink md:text-[24px]"
              >
                {block.question}
              </h2>
              {/* 직접 답변 — 즉답 스타일 */}
              <p className="mt-5 rounded-r-xl border-l-[3px] border-accent bg-accent-soft/45 py-3.5 pl-5 pr-5 text-[16px] font-medium leading-[1.8] text-ink">
                {block.answer}
              </p>
              <div className="prose-column mt-6 space-y-5">
                {block.detail.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </section>
          ))}

          {/* 이 글의 결론 */}
          <section
            id="conclusion"
            className="mt-14 scroll-mt-28 rounded-2xl bg-accent-deep p-7 md:mt-16 md:p-9"
          >
            <h2 className="font-serif text-[20px] font-bold text-white md:text-[22px]">
              이 글의 결론
            </h2>
            <div className="mt-4 space-y-3.5">
              {column.conclusion.map((c) => (
                <p
                  key={c}
                  className="text-[15px] leading-[1.85] text-white/85 md:text-[15.5px]"
                >
                  {c}
                </p>
              ))}
            </div>
          </section>

          {/* 출처/참고문헌 */}
          <section className="mt-12" aria-label="출처 및 참고문헌">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-faint">
              출처·참고문헌
            </h2>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-ink-faint">
              {column.references.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </section>

          {/* 태그 */}
          <div className="mt-8 flex flex-wrap gap-2">
            {column.tags.map((t) => (
              <Chip key={t} label={`#${t}`} />
            ))}
          </div>

          {/* 공통 의학 고지 */}
          <div className="mt-10">
            <Disclaimer />
          </div>

          {/* 저자 카드 */}
          <section className="mt-12" aria-label="이 글을 쓴 의사">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              이 글을 쓴 의사
            </p>
            <Link
              href={`/doctors/${author.slug}`}
              className="group mt-4 flex gap-5 rounded-2xl bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover md:gap-6 md:p-7"
            >
              <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-paper-warm md:h-24 md:w-24">
                <Image
                  src={author.photos[0]}
                  alt={`${author.name} 원장`}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="font-serif text-[18px] font-bold text-ink transition-colors group-hover:text-accent">
                    {author.name} 원장
                  </span>
                  <DoctorBadge badge={author.badge} />
                </p>
                <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-ink-soft">
                  {author.headline}
                </p>
                <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-ink-faint">
                  {author.intro[0]}
                </p>
                <p className="mt-3 flex items-center gap-1 text-[13px] font-semibold text-accent">
                  프로필 보기
                  <span
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </p>
              </div>
            </Link>
          </section>
        </div>

        {/* 데스크탑 sticky TOC */}
        <aside className="hidden lg:block" aria-label="칼럼 목차">
          <div className="sticky top-28">
            <TocDesktop items={tocItems} />
          </div>
        </aside>
      </div>

      {/* ── 관련 글 ── */}
      {related.length > 0 && (
        <section className="border-t border-line bg-paper-warm">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <SectionHeading
              eyebrow="Keep Reading"
              title="이어서 읽기"
              moreHref={`/columns/topic/${cat.slug}`}
              moreLabel={`${cat.short} 칼럼 전체`}
            />
            <ScrollRow ariaLabel="관련 칼럼">
              {related.map((rc) => {
                const a = getDoctor(rc.authorSlug);
                if (!a) return null;
                return (
                  <ColumnCard
                    key={rc.slug}
                    column={rc}
                    author={a}
                    variant="mini"
                  />
                );
              })}
            </ScrollRow>
          </div>
        </section>
      )}
    </article>
  );
}
