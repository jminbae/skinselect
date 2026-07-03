/** 지점 slug — 5개 고정 */
export type BranchSlug = "gangnam" | "suwon" | "pangyo" | "geondae" | "daegu";

/** 카테고리 slug — 8개 고정 (상세기획서 F-3) */
export type CategorySlug =
  | "acne"
  | "pigment"
  | "anti-aging"
  | "laser"
  | "sensitive"
  | "scalp-hair"
  | "skin-disease"
  | "skincare";

export interface Category {
  slug: CategorySlug;
  name: string; // 여드름·모공
  short: string; // 여드름 (칩용 축약)
  description: string;
  /** 커버 아트 톤 (타이포그래픽 커버의 배경 그라데이션) */
  tone: { from: string; to: string; fg: string };
}

export interface CareerItem {
  item: string; // "고려대학교 의과대학 졸업"
}

export interface SnsLink {
  type: "instagram" | "youtube" | "blog" | "brunch" | "etc";
  url: string;
  label?: string;
}

export interface Doctor {
  slug: string; // "bae-jungmin"
  name: string; // "배정민"
  branch: BranchSlug;
  /** 배지 이원화 체계 — 검증 데이터 기반 */
  badge: "피부과 전문의" | "전문의" | "의사";
  position?: string; // "대표원장" | "원장"
  headline: string; // 한 줄 진료 철학 (HERO)
  intro: string[]; // 쉬운 언어 소개 3~4문장
  greeting?: string; // 원장 인사말 (블로그 홈 소유감 장치, 300자 이내)
  career: CareerItem[]; // 학력·경력·학회 — 첫 3줄 + 아코디언
  fields: string[]; // 주력 진료 분야 칩 3~5개 (카테고리명 또는 태그)
  fieldSlugs: CategorySlug[]; // fields와 짝 — 카테고리 연결
  photos: string[]; // "/images/doctors/{slug}-1.webp", "-2.webp"
  sns?: SnsLink[];
  /** 사회적 증거 — 임계값(칼럼 3편·조회 1만·답변 5건) 미달 필드는 undefined */
  stats?: { columns?: number; views?: number; answers?: number };
}

export interface ClinicHours {
  day: string; // "월·화·목·금"
  time: string; // "10:00 – 19:00"
  note?: string;
}

export interface Clinic {
  slug: BranchSlug;
  name: string; // "힐하우스피부과 강남점"
  shortName: string; // "강남점"
  officialName: string; // 개설 명칭
  subjects: string; // 진료 과목
  region: string; // "서울 강남구"
  address: string;
  phone: string;
  hours: ClinicHours[];
  lunch?: string;
  closedNote?: string;
  access: string[]; // 대중교통·주차 안내
  homepage: string; // 병원 공식 홈페이지 (예약 아웃링크)
  naverBooking?: string;
  naverMap?: string; // 네이버 지도 링크
  photos: string[]; // "/images/clinics/{slug}/1.webp" ...
  doctorSlugs: string[];
  intro: string; // 지점 한 줄 소개
}

export interface Equipment {
  name: string; // 장비명
  what: string; // "이 장비로 무엇을 하는가" 1~2문장 (효능 보장 표현 금지)
  image?: string; // "/images/equipment/{file}.webp"
  fieldSlugs: CategorySlug[]; // 관련 진료 분야 태그 (③↔⑥ 연동)
  branches: BranchSlug[];
}

/** 칼럼 본문의 Q&A 블록 — H2 질문형 소제목 + 직접 답변 + 근거 상술 */
export interface QABlock {
  question: string; // 환자가 검색하는 질문형 문장 (H2)
  answer: string; // 2~3문장 직접 답변 (피처드 스니펫 타깃)
  detail: string[]; // 근거·상술 문단들 (통계·출처 포함)
}

export interface Column {
  slug: string; // 짧은 영문 키워드 slug (날짜·ID 배제)
  title: string; // 검색 질의 포함 질문형, 60자 이내
  category: CategorySlug;
  tags: string[];
  authorSlug: string;
  reviewedBy?: string; // 피어리뷰 감수 원장 이름 ("의학적 감수: ○○○ 전문의")
  date: string; // 최종 검토일 YYYY-MM-DD
  summary: string; // 결론 즉답 2~4문장 (= meta description, 스니펫 박스)
  bullets: string[]; // 핵심 요약 불릿 3~5개
  blocks: QABlock[]; // Q&A 블록 3~6개
  conclusion: string[]; // "이 글의 결론"
  references: string[]; // 출처/참고문헌
  readingMinutes: number;
  isHub?: boolean; // 카테고리 허브(총정리) 글
  featured?: boolean; // 에디터 픽
  todaysPick?: boolean; // 오늘의 픽 (홈 상단 대형 카드 1편)
  helpful: number; // 도움됐어요
  saved: number; // 저장
  questionCount: number; // 이 글에 달린 질문 수
}

export interface CommunityQuestion {
  id: string;
  nickname: string;
  date: string;
  title: string;
  body: string;
  tags: string[];
  answer?: {
    doctorSlug: string;
    date: string;
    body: string; // 2~5문장 일반론 답변 (개별 진단·처방 금지)
  };
  becameColumnSlug?: string; // "이 질문으로 칼럼이 발행됐어요" 배지
  helpful: number;
}
