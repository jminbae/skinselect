import type { Doctor } from "@/lib/types";

/**
 * ⚠ 스텁 데이터 — 리서치 에이전트가 pibutenten.kr 및 각 지점 홈페이지의
 * 의료진 소개를 기준으로 15명 전원을 채울 것.
 * photos는 "/images/doctors/{slug}-1.webp", "-2.webp" 규칙.
 */
export const doctors: Doctor[] = [
  {
    slug: "bae-jungmin",
    name: "배정민",
    branch: "gangnam",
    badge: "피부과 전문의",
    position: "대표원장",
    headline: "근거 있는 치료만 말씀드립니다.",
    intro: [
      "피부과 전문의 배정민입니다.",
      "백반증과 색소 질환을 오래 진료해 왔습니다.",
    ],
    career: [{ item: "피부과 전문의" }],
    fields: ["기미·색소", "백반증"],
    fieldSlugs: ["pigment"],
    photos: [
      "/images/doctors/bae-jungmin-1.webp",
      "/images/doctors/bae-jungmin-2.webp",
    ],
  },
];

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}

export function doctorsByBranch(branch: string) {
  return doctors.filter((d) => d.branch === branch);
}
