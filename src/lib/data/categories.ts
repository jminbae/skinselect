import type { Category } from "@/lib/types";

/**
 * 카테고리 6축 — 시술·안티에이징 중심 (2026-07-04 콘텐츠 전환).
 * 감각적 시술 언어: 리모델링 / 리프팅 / 스킨부스팅 / 볼류마이징 / 스무딩 / 토닝.
 */
export const categories: Category[] = [
  {
    slug: "remodeling",
    name: "리모델링",
    short: "리모델링",
    en: "Remodeling",
    description:
      "고주파(RF)와 마이크로니들 — 피부 깊은 층의 콜라겐을 다시 짓는 원리",
    tone: { from: "#c2542e", to: "#c2542e", fg: "#ffffff" },
    image: "/images/equipment/thermage-flx.webp",
  },
  {
    slug: "lifting",
    name: "리프팅",
    short: "리프팅",
    en: "Lifting",
    description:
      "집속 초음파(HIFU) — 처짐을 당겨 올리는 에너지의 깊이와 한계",
    tone: { from: "#0e7a5f", to: "#0e7a5f", fg: "#ffffff" },
    image: "/images/equipment/ultherapy-prime.webp",
  },
  {
    slug: "skin-boosting",
    name: "스킨부스팅",
    short: "스킨부스팅",
    en: "Skin Boosting",
    description:
      "피부 속 수분과 재생 신호 — 결과 광을 만드는 부스터의 실제",
    tone: { from: "#3f7fae", to: "#3f7fae", fg: "#ffffff" },
    image: "/images/clinics/gangnam/4.webp",
  },
  {
    slug: "volumizing",
    name: "볼류마이징",
    short: "볼류마이징",
    en: "Volumizing",
    description:
      "꺼진 볼륨을 다시 채우는 일 — 필러와 볼륨 설계의 균형 감각",
    tone: { from: "#b06a8c", to: "#b06a8c", fg: "#ffffff" },
    image: "/images/clinics/pangyo/4.webp",
  },
  {
    slug: "smoothing",
    name: "스무딩",
    short: "스무딩",
    en: "Smoothing",
    description:
      "표정이 남긴 주름을 다루는 법 — 보툴리눔 톡신의 기전과 주기",
    tone: { from: "#8a7bb8", to: "#8a7bb8", fg: "#ffffff" },
    image: "/images/clinics/suwon/3.webp",
  },
  {
    slug: "toning",
    name: "토닝·브라이트닝",
    short: "토닝",
    en: "Toning",
    description:
      "레이저가 색과 결을 고르게 만드는 원리 — 토닝·피코·IPL의 차이",
    tone: { from: "#c99a2e", to: "#c99a2e", fg: "#ffffff" },
    image: "/images/equipment/picoplus.webp",
  },
];

export const categoryMap = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string) {
  return categoryMap.get(slug as Category["slug"]);
}
