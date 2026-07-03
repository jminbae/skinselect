import Link from "next/link";
import type { CommunityQuestion } from "@/lib/types";
import { getDoctor } from "@/lib/data/doctors";
import { getColumn } from "@/lib/data/columns";
import { answerDisclaimer } from "@/lib/site";
import { AuthorChip } from "@/components/ColumnCard";

function formatDate(date: string) {
  return date.replaceAll("-", ".");
}

/**
 * 질문 카드 (COM-01) — C2 질문 카드 / C3 답변 카드 통합.
 * 답변 완료: 원장 AuthorChip + 답변 전문(accent 보더 들여쓰기 블록) + 자동 고지.
 * 답변 대기: 상태 배지. 랭킹·별점·병원 안내 요소 없음 (C-0-4).
 */
export default function QuestionCard({
  question,
}: {
  question: CommunityQuestion;
}) {
  const doctor = question.answer
    ? getDoctor(question.answer.doctorSlug)
    : undefined;
  const column = question.becameColumnSlug
    ? getColumn(question.becameColumnSlug)
    : undefined;

  return (
    <article className="rounded-2xl bg-white p-6 shadow-card md:p-8">
      {/* 메타 행: 닉네임·날짜 + 상태 배지 */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <p className="text-[13px] text-ink-faint">
          <span className="font-medium text-ink-soft">{question.nickname}</span>
          <span className="mx-1.5" aria-hidden>
            ·
          </span>
          {formatDate(question.date)}
        </p>
        {question.answer ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[12px] font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            답변 완료
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong bg-paper-warm px-3 py-1 text-[12px] font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            답변을 기다리고 있어요
          </span>
        )}
      </div>

      {/* 질문 제목·본문·태그 */}
      <h3 className="mt-3 font-serif text-[18px] font-bold leading-snug text-ink md:text-[20px]">
        {question.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-ink-soft">
        {question.body}
      </p>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-paper-warm px-2.5 py-1 text-[12px] font-medium text-ink-soft"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 원장 답변 블록 — 들여쓰기 + accent 보더 */}
      {question.answer && doctor && (
        <div className="mt-6 rounded-r-2xl rounded-l-sm border-l-2 border-accent bg-accent-soft/45 p-5 md:ml-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <AuthorChip doctor={doctor} />
            <span className="text-[12.5px] text-ink-faint">
              {formatDate(question.answer.date)} 답변
            </span>
          </div>
          <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft">
            {question.answer.body}
          </p>
          <p className="mt-4 border-t border-line pt-3 text-[12px] leading-relaxed text-ink-faint">
            {answerDisclaimer}
          </p>
        </div>
      )}

      {/* 칼럼 발행 배지 */}
      <div className="mt-5 flex flex-wrap items-center justify-end gap-x-4 gap-y-3">
        {column && (
          <Link
            href={`/columns/${column.slug}`}
            className="group inline-flex items-center gap-1.5 rounded-full bg-clay-soft px-3.5 py-1.5 text-[12.5px] font-semibold text-clay transition-colors hover:bg-clay hover:text-white"
          >
            이 질문으로 칼럼이 발행됐어요
            <span
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
