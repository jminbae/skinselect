/** 사이트 전역 상수 */
export const site = {
  name: "스킨셀렉트",
  nameEn: "SkinSelect",
  tagline: "피부에 대해 궁금하면, 광고가 아니라 의사의 답을 읽는 곳",
  description:
    "피부과 의사가 실명으로 직접 쓰는 검증된 피부 정보 매거진 — 모든 칼럼에 근거 출처, 의사 면허 검증 필진.",
  url: "https://skinselect.kr",
  doctorCount: 15,
  clinicCount: 5,
} as const;

/** 전 글·전 답변 하단 공통 고지문 (기획서 2-5, 3-4) */
export const medicalDisclaimer =
  "이 콘텐츠는 일반적인 의학 정보이며 개별 진료 상담을 대신하지 않습니다. 증상이 있는 경우 반드시 의료기관에서 진료를 받으세요.";

/** 커뮤니티 답변 하단 자동 고지 */
export const answerDisclaimer =
  "개별 진료 상담이 아니며 일반적인 의학 정보입니다. 증상이 있는 경우 의료기관 진료를 받으세요.";

/** 초안(데모) 고지 — 원장 감수 전 예시 콘텐츠임을 명시 */
export const draftNotice =
  "이 페이지는 스킨셀렉트 서비스 초안의 예시 화면입니다. 칼럼·답변은 원장 감수 전의 예시 콘텐츠입니다.";

export const navItems = [
  { href: "/columns", label: "칼럼" },
  { href: "/doctors", label: "의사들" },
  { href: "/community", label: "질문과 답" },
  { href: "/clinics", label: "진료 병원" },
  { href: "/about", label: "소개" },
] as const;
