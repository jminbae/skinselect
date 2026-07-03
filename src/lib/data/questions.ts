import type { CommunityQuestion } from "@/lib/types";

/**
 * ⚠ 스텁 데이터 — 콘텐츠 에이전트가 공개 질문 보드 예시 질문·답변
 * 8~10건으로 교체할 것. (닉네임 기반, 개별 진단·처방성 답변 금지)
 */
export const questions: CommunityQuestion[] = [];

export function getQuestion(id: string) {
  return questions.find((q) => q.id === id);
}
