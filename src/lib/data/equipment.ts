import type { Equipment } from "@/lib/types";

/**
 * 장비 데이터 — "이 장비로 무엇을 하는가" 중립 서술 (효능 보장 표현 금지).
 * 분류는 시술 6축(리모델링·리프팅·스킨부스팅·볼류마이징·스무딩·토닝) 기준.
 */
export const equipment: Equipment[] = [
  {
    name: "울쎄라피 프라임",
    what: "집속 초음파(HIFU) 에너지를 피부 근막층에 전달하는 리프팅 장비입니다.",
    image: "/images/equipment/ultherapy-prime.webp",
    fieldSlugs: ["lifting"],
    branches: ["gangnam", "suwon", "pangyo", "geondae"],
  },
  {
    name: "써마지FLX",
    what: "고주파(RF) 에너지로 피부 깊은 층에 열을 전달하는 리모델링 장비입니다.",
    image: "/images/equipment/thermage-flx.webp",
    fieldSlugs: ["remodeling"],
    branches: ["gangnam", "suwon", "geondae"],
  },
  {
    name: "덴서티",
    what: "모노폴라 고주파 방식의 리모델링 장비입니다.",
    image: "/images/equipment/density.webp",
    fieldSlugs: ["remodeling"],
    branches: ["gangnam"],
  },
  {
    name: "텐써마",
    what: "고주파 에너지로 탄력 저하 부위를 다루는 리모델링 장비입니다.",
    image: "/images/equipment/tenthera.webp",
    fieldSlugs: ["remodeling"],
    branches: ["suwon", "daegu"],
  },
  {
    name: "포텐자",
    what: "마이크로니들 고주파로 결·모공을 다루는 스킨 리모델링 장비입니다.",
    image: "/images/equipment/potenza.webp",
    fieldSlugs: ["remodeling"],
    branches: ["daegu"],
  },
  {
    name: "울쎄라",
    what: "집속 초음파로 처짐 부위를 다루는 리프팅 장비입니다.",
    image: "/images/equipment/ulthera.webp",
    fieldSlugs: ["lifting"],
    branches: ["daegu"],
  },
  {
    name: "아그네스",
    what: "미세절연침 고주파로 피지샘·눈밑 부위를 선택적으로 다루는 장비입니다.",
    image: "/images/equipment/agnes.webp",
    fieldSlugs: ["remodeling"],
    branches: ["suwon", "pangyo", "geondae", "daegu"],
  },
  {
    name: "피코플러스",
    what: "피코초 단위 레이저로 색소·결을 다루는 토닝 장비입니다.",
    image: "/images/equipment/picoplus.webp",
    fieldSlugs: ["toning"],
    branches: ["pangyo"],
  },
  {
    name: "레블라이트",
    what: "레이저 토닝 방식으로 색소 병변을 다루는 장비입니다.",
    image: "/images/equipment/revlite.webp",
    fieldSlugs: ["toning"],
    branches: ["geondae"],
  },
  {
    name: "젠틀맥스 프로플러스",
    what: "롱펄스 레이저로 색소·혈관·제모 영역을 다루는 장비입니다.",
    image: "/images/equipment/gentlemax-pro-plus.webp",
    fieldSlugs: ["toning"],
    branches: ["gangnam"],
  },
  {
    name: "브이빔 퍼펙타",
    what: "혈관 병변에 반응하는 레이저로 홍조·붉은 기를 다루는 장비입니다.",
    image: "/images/equipment/vbeam-perfecta.webp",
    fieldSlugs: ["toning"],
    branches: ["pangyo"],
  },
];

export function equipmentByBranch(branch: string) {
  return equipment.filter((e) => e.branches.includes(branch as never));
}
