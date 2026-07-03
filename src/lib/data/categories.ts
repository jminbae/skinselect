import type { Category } from "@/lib/types";

/** 카테고리 8개 고정 — 상세기획서 F-3 */
export const categories: Category[] = [
  {
    slug: "acne",
    name: "여드름·모공",
    short: "여드름",
    description: "성인 여드름부터 압출·흉터·모공까지, 원인과 관리의 기준",
    tone: { from: "#e0705a", to: "#e0705a", fg: "#ffffff" },
  },
  {
    slug: "pigment",
    name: "기미·색소·미백",
    short: "기미·색소",
    description: "기미·주근깨·백반증 — 얼굴 색소 질환의 감별과 치료 원리",
    tone: { from: "#d99a2b", to: "#d99a2b", fg: "#ffffff" },
  },
  {
    slug: "anti-aging",
    name: "안티에이징·리프팅",
    short: "안티에이징",
    description: "피부 노화의 과학 — 주름·탄력·볼륨 변화에 대한 근거 있는 답",
    tone: { from: "#0e7a5f", to: "#0e7a5f", fg: "#ffffff" },
  },
  {
    slug: "laser",
    name: "레이저·시술 상식",
    short: "레이저·시술",
    description: "기전·적응증·주의사항의 중립 서술 — 시술을 이해하고 결정하기",
    tone: { from: "#4a7b96", to: "#4a7b96", fg: "#ffffff" },
  },
  {
    slug: "sensitive",
    name: "아토피·습진·민감성",
    short: "민감성 피부",
    description: "장벽이 무너진 피부 — 아토피·습진·민감성 피부의 회복 원칙",
    tone: { from: "#c96f8e", to: "#c96f8e", fg: "#ffffff" },
  },
  {
    slug: "scalp-hair",
    name: "두피·탈모",
    short: "두피·탈모",
    description: "탈모의 진행과 치료 시점, 두피 건강의 기준",
    tone: { from: "#8a6d5a", to: "#8a6d5a", fg: "#ffffff" },
  },
  {
    slug: "skin-disease",
    name: "손발톱·기타 피부질환",
    short: "피부질환",
    description: "무좀·사마귀·대상포진 — 흔하지만 잘 모르는 피부 질환들",
    tone: { from: "#6b72a3", to: "#6b72a3", fg: "#ffffff" },
  },
  {
    slug: "skincare",
    name: "스킨케어·성분",
    short: "스킨케어",
    description: "성분과 근거로 읽는 스킨케어 — 브랜드가 아닌 기준을 말합니다",
    tone: { from: "#6fa06b", to: "#6fa06b", fg: "#ffffff" },
  },
];

export const categoryMap = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string) {
  return categoryMap.get(slug as Category["slug"]);
}
