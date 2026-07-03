import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/lib/data/categories";
import { columns, columnsByAuthor } from "@/lib/data/columns";
import { doctors, getDoctor } from "@/lib/data/doctors";
import ColumnCard from "@/components/ColumnCard";
import ScrollRow from "@/components/ScrollRow";
import { Chip } from "@/components/ui";
import WriterCard from "@/components/home/WriterCard";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
};

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  b.date.localeCompare(a.date);

/** 오늘의 픽 1편 + 최신 글 목록 */
const todaysPick = columns.find((c) => c.todaysPick) ?? columns[0];
const latest = [...columns]
  .filter((c) => c.slug !== todaysPick.slug)
  .sort(byDateDesc)
  .slice(0, 6);

/** 필진 — 칼럼이 있는 원장, 최신 발행순 */
const writers = doctors
  .flatMap((doctor) => {
    const latestCol = [...columnsByAuthor(doctor.slug)].sort(byDateDesc)[0];
    return latestCol ? [{ doctor, column: latestCol }] : [];
  })
  .sort((a, b) => byDateDesc(a.column, b.column));

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      {/* ── 스테이트먼트 ─────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <h1 className="max-w-2xl text-[30px] font-extrabold leading-[1.3] tracking-[-0.03em] text-ink md:text-[44px]">
          피부에 대해 궁금하면,
          <br />
          광고가 아니라 <span className="text-accent">의사의 답</span>을 읽는 곳
        </h1>
        <p className="mt-5 text-[14.5px] text-ink-soft md:text-[15px]">
          피부과 전문의 {site.doctorCount}명이 실명으로 씁니다 · 모든 칼럼에
          근거 출처
        </p>
      </section>

      {/* ── 오늘의 픽 ────────────────────────────────────── */}
      <section>
        <ColumnCard
          column={todaysPick}
          author={getDoctor(todaysPick.authorSlug)!}
          variant="hero"
        />
      </section>

      {/* ── 최신 글 ──────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2 className="text-[19px] font-bold tracking-tight text-ink md:text-[21px]">
            최신 글
          </h2>
          <Link
            href="/columns"
            className="text-[13.5px] font-medium text-ink-faint transition-colors hover:text-ink"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="stagger">
          {latest.map((column) => (
            <ColumnCard
              key={column.slug}
              column={column}
              author={getDoctor(column.authorSlug)!}
              variant="row"
            />
          ))}
        </div>
      </section>

      {/* ── 주제 ─────────────────────────────────────────── */}
      <section className="border-t border-line py-12 md:py-16">
        <h2 className="mb-5 text-[19px] font-bold tracking-tight text-ink md:text-[21px]">
          주제로 찾아보기
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip key={c.slug} label={c.name} href={`/columns/topic/${c.slug}`} />
          ))}
        </div>
      </section>

      {/* ── 필진 ─────────────────────────────────────────── */}
      <section className="border-t border-line py-12 md:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-[19px] font-bold tracking-tight text-ink md:text-[21px]">
            글 쓰는 의사들
          </h2>
          <Link
            href="/doctors"
            className="text-[13.5px] font-medium text-ink-faint transition-colors hover:text-ink"
          >
            필진 전체 →
          </Link>
        </div>
        <ScrollRow ariaLabel="필진별 최신 글">
          {writers.map(({ doctor, column }) => (
            <WriterCard key={doctor.slug} doctor={doctor} column={column} />
          ))}
        </ScrollRow>
      </section>
    </div>
  );
}
