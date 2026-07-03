import type { Equipment } from "@/lib/types";

/**
 * 장비 데이터 — "이 장비로 무엇을 하는가" 중립 서술 (효능 보장 표현 금지).
 * 지점별 보유 현황은 사진자료 기준. 이미지는 /images/equipment/*.webp.
 */
export const equipment: Equipment[] = [
  {
    name: "울쎄라피 프라임",
    what: "집속 초음파(HIFU) 에너지를 피부 근막층에 전달해 처짐·탄력 저하를 다루는 리프팅 장비입니다.",
    image: "/images/equipment/ultherapy-prime.webp",
    fieldSlugs: ["anti-aging"],
    branches: ["gangnam", "suwon", "pangyo", "geondae"],
  },
  {
    name: "써마지FLX",
    what: "고주파(RF) 에너지로 피부 깊은 층에 열을 전달해 탄력 저하를 다루는 비수술 리프팅 장비입니다.",
    image: "/images/equipment/thermage-flx.webp",
    fieldSlugs: ["anti-aging"],
    branches: ["gangnam", "suwon", "geondae"],
  },
  {
    name: "아그네스",
    what: "미세절연침 고주파로 여드름 피지샘, 눈 밑 지방 부위를 선택적으로 다루는 장비입니다.",
    image: "/images/equipment/agnes.webp",
    fieldSlugs: ["acne", "anti-aging"],
    branches: ["suwon", "pangyo", "geondae", "daegu"],
  },
  {
    name: "텐써마",
    what: "고주파 에너지로 피부 탄력과 잔주름 부위를 다루는 리프팅 장비입니다.",
    image: "/images/equipment/tenthera.webp",
    fieldSlugs: ["anti-aging"],
    branches: ["suwon", "daegu"],
  },
  {
    name: "젠틀맥스 프로플러스",
    what: "롱펄스 레이저로 색소·혈관 병변과 제모 시술에 쓰이는 장비입니다.",
    image: "/images/equipment/gentlemax-pro-plus.webp",
    fieldSlugs: ["pigment", "laser"],
    branches: ["gangnam"],
  },
  {
    name: "덴서티",
    what: "모노폴라 고주파 방식으로 피부 탄력 관리에 쓰이는 장비입니다.",
    image: "/images/equipment/density.webp",
    fieldSlugs: ["anti-aging"],
    branches: ["gangnam"],
  },
  {
    name: "피코플러스",
    what: "피코초 단위 레이저로 기미·잡티 등 색소 병변 치료에 쓰이는 장비입니다.",
    image: "/images/equipment/picoplus.webp",
    fieldSlugs: ["pigment", "laser"],
    branches: ["pangyo"],
  },
  {
    name: "브이빔 퍼펙타",
    what: "혈관 병변에 반응하는 레이저로 홍조·붉은 자국 치료에 쓰이는 장비입니다.",
    image: "/images/equipment/vbeam-perfecta.webp",
    fieldSlugs: ["sensitive", "laser"],
    branches: ["pangyo"],
  },
  {
    name: "레블라이트",
    what: "레이저 토닝 방식으로 기미 등 색소 병변 치료에 쓰이는 장비입니다.",
    image: "/images/equipment/revlite.webp",
    fieldSlugs: ["pigment", "laser"],
    branches: ["geondae"],
  },
  {
    name: "울쎄라",
    what: "집속 초음파로 피부 처짐 부위를 다루는 리프팅 장비입니다.",
    image: "/images/equipment/ulthera.webp",
    fieldSlugs: ["anti-aging"],
    branches: ["daegu"],
  },
  {
    name: "포텐자",
    what: "마이크로니들 고주파로 모공·흉터·피부결을 다루는 장비입니다.",
    image: "/images/equipment/potenza.webp",
    fieldSlugs: ["acne", "laser"],
    branches: ["daegu"],
  },
];

export function equipmentByBranch(branch: string) {
  return equipment.filter((e) => e.branches.includes(branch as never));
}
