import type { Metadata } from "next";
import { questions } from "@/lib/data/questions";
import { answerDisclaimer, draftNotice } from "@/lib/site";
import { Eyebrow } from "@/components/ui";
import Disclaimer from "@/components/Disclaimer";
import AskButton from "@/components/community/AskButton";
import QuestionCard from "@/components/community/QuestionCard";

export const metadata: Metadata = {
  title: "질문과 답 — 묻고, 의사가 답합니다",
  description:
    "피부 고민을 남기면 면허를 검증한 피부과 의사가 실명으로 답합니다. 좋은 질문은 한 편의 칼럼이 되어 같은 고민을 가진 모두에게 돌아갑니다.",
};

/** COM-01 질문 보드 목록 — 최신순, 랭킹·정렬 UI 없음 */
export default function CommunityPage() {
  const sorted = [...questions].sort((a, b) => b.date.localeCompare(a.date));
  const answeredCount = questions.filter((q) => q.answer).length;

  return (
    <div>
      {/* 헤더 */}
      <section className="border-b border-line bg-paper-warm">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center md:px-8 md:py-20">
          <Eyebrow>Community</Eyebrow>
          <h1 className="mt-3 font-serif text-[28px] font-bold leading-[1.35] text-ink md:text-[38px]">
            묻고, <span className="text-accent">의사가 답합니다</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            피부 고민을 남기면 면허를 검증한 피부과 의사가 실명으로 답하고,
            좋은 질문은 한 편의 칼럼이 되어 돌아옵니다.
          </p>
          <div className="mt-8">
            <AskButton />
          </div>
        </div>
      </section>

      {/* 보드 — 중앙 1열 (최대 720px) */}
      <section className="mx-auto max-w-[720px] px-5 py-10 md:px-8 md:py-14">
        <Disclaimer text={answerDisclaimer} />
        <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-faint">
          <span
            className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
            aria-hidden
          />
          {draftNotice}
        </p>

        <div className="mt-8 mb-4 flex items-end justify-between gap-4">
          <h2 className="font-serif text-[19px] font-bold text-ink md:text-[21px]">
            질문 보드
          </h2>
          <p className="text-[13px] text-ink-faint">
            질문 {questions.length}건 · 답변 {answeredCount}건
          </p>
        </div>

        <div className="stagger space-y-5">
          {sorted.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      </section>
    </div>
  );
}
