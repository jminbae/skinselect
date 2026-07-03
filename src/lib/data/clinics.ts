import type { BranchSlug, Clinic } from "@/lib/types";

/**
 * ⚠ 스텁 데이터 — 리서치 에이전트가 각 지점 공식 홈페이지 기준으로 교체할 것.
 * NAP(상호·주소·전화)는 공식 채널과 문자 단위 일치가 원칙 (상세기획서 B-5).
 */
export const clinics: Clinic[] = [
  {
    slug: "gangnam",
    name: "힐하우스피부과 강남점",
    shortName: "강남점",
    officialName: "힐하우스피부과의원",
    subjects: "피부과",
    region: "서울 강남구",
    address: "서울특별시 강남구 (확인 중)",
    phone: "02-0000-0000",
    hours: [
      { day: "평일", time: "10:00 – 19:00" },
      { day: "토요일", time: "10:00 – 14:00" },
    ],
    lunch: "13:00 – 14:00",
    closedNote: "일요일·공휴일 휴진",
    access: ["지하철 안내 (확인 중)"],
    homepage: "https://healhousegn.com",
    photos: [],
    doctorSlugs: [],
    intro: "힐하우스피부과 강남점",
  },
];

const branchNames: Record<BranchSlug, string> = {
  gangnam: "강남점",
  suwon: "수원점",
  pangyo: "판교점",
  geondae: "건대점",
  daegu: "대구점",
};

export function branchName(slug: BranchSlug) {
  return branchNames[slug];
}

export function getClinic(slug: string) {
  return clinics.find((c) => c.slug === slug);
}
