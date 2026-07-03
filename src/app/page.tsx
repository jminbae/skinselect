import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { categories, getCategory } from "@/lib/data/categories";
import {
  columns,
  columnsByAuthor,
  columnsByCategory,
} from "@/lib/data/columns";
import { doctors, getDoctor } from "@/lib/data/doctors";
import ColumnCard from "@/components/ColumnCard";
import SectionHeading from "@/components/SectionHeading";
import ScrollRow from "@/components/ScrollRow";
import { Eyebrow, Chip } from "@/components/ui";
import WriterCard from "@/components/home/WriterCard";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
};

/* ── 큐레이션 (정적 데이터) ──────────────────────────────── */

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  b.date.localeCompare(a.date);

/** 오늘의 픽 — todaysPick 지정 1편 */
const todaysPick = columns.find((c) => c.todaysPick) ?? columns[0];

/** 에디터 픽 — featured 4편 (오늘의 픽 중복 제외) */
const editorPicks = columns
  .filter((c) => c.featured && c.slug !== todaysPick.slug)
  .slice(0, 4);

/** 카테고리별 최신 — 오늘의 픽·에디터 픽과 겹치지 않는 3개 주제 큐레이션 */
const curatedTopics = ["acne", "skincare", "skin-disease"] as const;

/** 필진별 최신 글 — 칼럼이 있는 원장만, 최신 발행순 */
const writers = doctors
  .flatMap((doctor) => {
    const latest = [...columnsByAuthor(doctor.slug)].sort(byDateDesc)[0];
    return latest ? [{ doctor, column: latest }] : [];
  })
  .sort((a, b) => byDateDesc(a.column, b.column));

export default function Home() {
  return (
    <div>
      {/* ── 1·2. 브랜드 히어로 + 오늘의 픽 ─────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-44 h-[440px] w-[440px] rounded-full border border-accent/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-16 top-28 hidden h-40 w-40 rounded-full border border-accent/10 lg:block"
        />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
          <div className="stagger">
            <Eyebrow>Written by verified dermatologists</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-serif text-[32px] font-bold leading-[1.38] text-ink md:text-[46px]">
              피부에 대해 궁금하면,
              <br />
              광고가 아니라 <span className="text-accent">의사의 답</span>을
              읽는 곳
            </h1>

            {/* 신뢰 시그널 스트립 */}
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/doctors" className="group flex items-center gap-3">
                <span className="flex -space-x-2.5">
                  {doctors.slice(0, 5).map((d) => (
                    <span
                      key={d.slug}
                      className="relative block h-8 w-8 overflow-hidden rounded-full bg-paper-warm ring-2 ring-paper"
                    >
                      <Image
                        src={d.photos[0]}
                        alt=""
                        fill
                        sizes="32px"
                        className="object-cover object-top"
                      />
                    </span>
                  ))}
                </span>
                <span className="text-[13.5px] font-medium text-ink-soft transition-colors group-hover:text-accent">
                  피부과 전문의 {site.doctorCount}명 실명 집필
                </span>
              </Link>
              <span aria-hidden className="hidden h-4 w-px bg-line-strong sm:block" />
              <p className="flex items-center gap-2 text-[13.5px] font-medium text-ink-soft">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <circle cx="8" cy="8" r="6.4" />
                  <path d="M5.2 8.3l2 2 3.6-4.4" />
                </svg>
                모든 칼럼에 근거 출처
              </p>
              <span aria-hidden className="hidden h-4 w-px bg-line-strong sm:block" />
              <p className="flex items-center gap-2 text-[13.5px] font-medium text-ink-soft">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M8 2.2v11.6" strokeDasharray="2 2" />
                  <rect x="1.8" y="4.2" width="3.8" height="7.6" rx="1" />
                  <rect x="10.4" y="4.2" width="3.8" height="7.6" rx="1" />
                </svg>
                광고와 정보의 분리
              </p>
            </div>

            {/* 오늘의 픽 */}
            <div className="mt-12 md:mt-16">
              <ColumnCard
                column={todaysPick}
                author={getDoctor(todaysPick.authorSlug)!}
                variant="hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 에디터 픽 ────────────────────────────────────── */}
      <section className="border-y border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="Curation"
            title="에디터 픽"
            moreHref="/columns"
            moreLabel="칼럼 전체 보기"
          />
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {editorPicks.map((column) => (
              <ColumnCard
                key={column.slug}
                column={column}
                author={getDoctor(column.authorSlug)!}
                variant="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4·5. 카테고리 탐색 + 카테고리별 최신 ─────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHeading eyebrow="Topics" title="주제로 찾아보기" />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip key={c.slug} label={c.name} href={`/columns/topic/${c.slug}`} />
          ))}
        </div>

        <div className="mt-14 md:mt-16">
          {curatedTopics.map((slug, i) => {
            const cat = getCategory(slug)!;
            const latest = [...columnsByCategory(slug)]
              .sort(byDateDesc)
              .slice(0, 3);
            return (
              <div
                key={slug}
                className={`grid gap-7 lg:grid-cols-[280px_1fr] lg:gap-14 ${
                  i > 0 ? "mt-12 border-t border-line pt-12 md:mt-14 md:pt-14" : ""
                }`}
              >
                <div>
                  <p className="font-serif text-[15px] font-bold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-serif text-[21px] font-bold leading-snug text-ink">
                    {cat.name}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">
                    {cat.description}
                  </p>
                  <Link
                    href={`/columns/topic/${cat.slug}`}
                    className="group mt-5 inline-flex items-center gap-1 text-[13.5px] font-semibold text-accent transition-colors hover:text-accent-deep"
                  >
                    {cat.short} 칼럼 더 보기
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
                <div className="lg:-mt-6">
                  {latest.map((column) => (
                    <ColumnCard
                      key={column.slug}
                      column={column}
                      author={getDoctor(column.authorSlug)!}
                      variant="row"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. 필진 ─────────────────────────────────────────── */}
      <section className="border-t border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="Writers"
            title="글 쓰는 의사들"
            moreHref="/doctors"
            moreLabel="필진 전체 보기"
          />
          <ScrollRow ariaLabel="필진별 최신 글">
            {writers.map(({ doctor, column }) => (
              <WriterCard key={doctor.slug} doctor={doctor} column={column} />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* ── 7. 마무리 CTA ───────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
        <div className="rounded-3xl bg-accent-soft px-6 py-14 text-center md:py-20">
          <Eyebrow>SkinSelect</Eyebrow>
          <h2 className="mt-4 font-serif text-[26px] font-bold leading-snug text-ink md:text-[32px]">
            진료실의 언어로 쓴 글이
            <br className="md:hidden" /> 매주 도착합니다
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
            광고도, 출처 없는 조언도 없습니다. 피부과 의사 {site.doctorCount}
            명이 실명으로 쓰는 피부 매거진을 읽어 보세요.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/columns"
              className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              칼럼 읽기
            </Link>
            <Link
              href="/doctors"
              className="rounded-full border border-accent/30 bg-white px-7 py-3.5 text-[15px] font-semibold text-accent-deep transition-colors hover:border-accent"
            >
              필진 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
