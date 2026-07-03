import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { categories } from "@/lib/data/categories";
import { columns, columnsByAuthor } from "@/lib/data/columns";
import { doctors, getDoctor } from "@/lib/data/doctors";
import ColumnCard from "@/components/ColumnCard";
import ScrollRow from "@/components/ScrollRow";
import WriterCard from "@/components/home/WriterCard";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
};

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  b.date.localeCompare(a.date);

const todaysPick = columns.find((c) => c.todaysPick) ?? columns[0];
const featured = columns
  .filter((c) => c.featured && c.slug !== todaysPick.slug)
  .slice(0, 3);
const latest = [...columns]
  .filter(
    (c) => c.slug !== todaysPick.slug && !featured.some((f) => f.slug === c.slug),
  )
  .sort(byDateDesc)
  .slice(0, 5);

const writers = doctors
  .flatMap((doctor) => {
    const latestCol = [...columnsByAuthor(doctor.slug)].sort(byDateDesc)[0];
    return latestCol ? [{ doctor, column: latestCol }] : [];
  })
  .sort((a, b) => byDateDesc(a.column, b.column));

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      {/* ── 스테이트먼트 ─────────────────────────────────── */}
      <section className="py-10 md:py-16">
        <h1 className="max-w-2xl text-[28px] font-extrabold leading-[1.3] tracking-[-0.03em] text-ink md:text-[42px]">
          피부에 대해 궁금하면,
          <br />
          광고가 아니라 <span className="text-accent">의사의 답</span>을 읽는 곳
        </h1>
        <p className="mt-4 text-[14px] text-ink-soft md:text-[15px]">
          피부과 전문의 {site.doctorCount}명이 실명으로 씁니다 · 모든 칼럼에
          근거 출처
        </p>
      </section>

      {/* ── 오늘의 픽 — 시네마틱 ─────────────────────────── */}
      <section>
        <ColumnCard
          column={todaysPick}
          author={getDoctor(todaysPick.authorSlug)!}
          variant="hero"
        />
      </section>

      {/* ── 카테고리 타일 6 ──────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
          <h2 className="text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
            무엇이 궁금하세요?
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/columns/topic/${c.slug}`}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className={
                    c.image.includes("/equipment/")
                      ? "bg-paper-warm object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
                      : "object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  }
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-white/70 md:text-[10.5px]">
                    {c.en}
                  </p>
                  <p className="mt-0.5 text-[16px] font-bold tracking-tight text-white md:text-[19px]">
                    {c.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 추천 글 — 이미지 카드 그리드 ─────────────────── */}
      {featured.length > 0 && (
        <section className="border-t border-line py-14 md:py-20">
          <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
            <h2 className="text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
              에디터 추천
            </h2>
            <Link
              href="/columns"
              className="text-[13.5px] font-medium text-ink-faint transition-colors hover:text-ink"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
            {featured.map((column) => (
              <ColumnCard
                key={column.slug}
                column={column}
                author={getDoctor(column.authorSlug)!}
                variant="featured"
              />
            ))}
          </div>
        </section>
      )}

      {/* ── 최신 글 ──────────────────────────────────────── */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2 className="text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
            최신 글
          </h2>
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

      {/* ── 필진 ─────────────────────────────────────────── */}
      <section className="border-t border-line py-12 md:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
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
