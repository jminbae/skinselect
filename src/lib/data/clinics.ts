import type { BranchSlug, Clinic } from "@/lib/types";

/**
 * 지점 실데이터 — 각 지점 공식 홈페이지 기준 수집 (2026-07-04).
 * NAP(상호·주소·전화)는 공식 채널과 문자 단위 일치가 원칙 (상세기획서 B-5).
 * 출처: healhousegn.com / healhousesw.com / healhousepg.com / healhousegd.com / healhousedg.com
 * "확인 필요" 표기 항목은 공식 홈페이지에서 확인하지 못한 값 — 지점 확인 후 교체할 것.
 */
export const clinics: Clinic[] = [
  {
    slug: "gangnam",
    name: "힐하우스피부과 강남점",
    shortName: "강남점",
    officialName: "힐하우스피부과의원",
    subjects: "피부과",
    region: "서울 강남구",
    address: "서울특별시 강남구 강남대로 518, 4-5층 (논현동)",
    phone: "02-6951-5761",
    hours: [
      { day: "월–금", time: "10:00 – 20:00", note: "안티에이징 CT" },
      { day: "토요일", time: "09:00 – 15:00", note: "안티에이징 CT · 점심시간 없이 진료" },
      { day: "월·금", time: "09:30 – 19:30", note: "백반증 CT" },
      { day: "화·수·목", time: "09:30 – 18:30", note: "백반증 CT" },
      { day: "토요일", time: "09:00 – 14:00", note: "백반증 CT · 점심시간 없이 진료" },
    ],
    lunch: "13:00 – 14:00",
    closedNote: "일요일·공휴일 휴진",
    access: [
      "지하철 논현역 3번 출구 도보 2분",
      "버스 논현역 정류장 이용 (23123 · 22013 · 32007)",
      "건물 주차 가능 (발렛비 추가될 수 있음)",
    ],
    homepage: "https://healhousegn.com",
    photos: [
      "/images/clinics/gangnam/1.webp",
      "/images/clinics/gangnam/2.webp",
      "/images/clinics/gangnam/3.webp",
      "/images/clinics/gangnam/4.webp",
      "/images/clinics/gangnam/5.webp",
    ],
    doctorSlugs: ["park-saemi", "bae-jungmin", "jung-hanmi", "chu-jiyoon"],
    intro:
      "논현역 인근에서 안티에이징 센터와 백반증 센터를 함께 운영하는 강남 지점입니다.",
  },
  {
    slug: "suwon",
    name: "힐하우스피부과 수원점",
    shortName: "수원점",
    officialName: "힐하우스피부과의원",
    subjects: "피부과",
    region: "경기 수원시",
    address: "경기도 수원시 팔달구 매산로 24 3층 (매산로2가, 파르마)",
    phone: "031-248-7730",
    hours: [
      { day: "월·금", time: "09:30 – 20:00", note: "야간진료" },
      { day: "화·수·목", time: "09:30 – 18:30" },
      { day: "토요일", time: "09:00 – 14:00", note: "점심시간 없이 진료" },
    ],
    lunch: "13:00 – 14:00 (토요일 제외)",
    closedNote: "확인 필요",
    access: [
      "지하철 수원역 9번 출구 도보 3분",
      "버스 세무서·신용회복위원회 정류장(03-038), 매산시장 정류장(03-164)",
    ],
    homepage: "https://healhousesw.com",
    photos: [
      "/images/clinics/suwon/1.webp",
      "/images/clinics/suwon/2.webp",
      "/images/clinics/suwon/3.webp",
      "/images/clinics/suwon/4.webp",
      "/images/clinics/suwon/5.webp",
    ],
    doctorSlugs: ["go-hyerim", "kwon-suhyun", "kim-sujeong", "kim-suhyeong"],
    intro:
      "수원역 인근에서 리프팅·색소·여드름 진료와 백반증 클리닉을 운영하는 수원 지점입니다.",
  },
  {
    slug: "pangyo",
    name: "힐하우스피부과 판교점",
    shortName: "판교점",
    officialName: "힐하우스피부과의원 판교점",
    subjects: "피부과",
    region: "경기 성남시",
    address: "경기도 성남시 분당구 분당내곡로 131, 2층 (백현동)",
    phone: "031-701-7438",
    hours: [
      { day: "월·수·목", time: "10:00 – 19:00" },
      { day: "화·금", time: "10:00 – 20:30", note: "야간진료" },
      { day: "토요일", time: "09:30 – 14:00", note: "점심시간 없이 진료" },
    ],
    lunch: "13:30 – 14:30",
    closedNote: "확인 필요",
    access: [
      "신분당선·경강선 판교역 1번 출구 연결",
      "버스 판교역동편·판교역북편 정류장 이용",
      "판교테크원타워 주차장 이용 가능 (최대 3시간 지원)",
    ],
    homepage: "https://healhousepg.com",
    photos: [
      "/images/clinics/pangyo/1.webp",
      "/images/clinics/pangyo/2.webp",
      "/images/clinics/pangyo/3.webp",
      "/images/clinics/pangyo/4.webp",
      "/images/clinics/pangyo/5.webp",
    ],
    doctorSlugs: ["kim-jongsik", "byun-hyunjung"],
    intro: "판교역 1번 출구와 연결된 건물에서 진료하는 판교 지점입니다.",
  },
  {
    slug: "geondae",
    name: "힐하우스피부과 건대점",
    shortName: "건대점",
    officialName: "힐하우스피부과의원 건대점",
    subjects: "피부과",
    region: "서울 광진구",
    address: "서울시 광진구 능동로 90, B동 2층 C202호",
    phone: "02-444-7585",
    hours: [
      { day: "월·금", time: "10:00 – 20:00", note: "야간진료" },
      { day: "화·수·목", time: "10:00 – 19:00" },
      { day: "토요일", time: "10:00 – 15:00", note: "점심시간 없이 진료" },
    ],
    lunch: "13:00 – 14:00",
    closedNote: "일요일·공휴일 휴진",
    access: [
      "지하철 건대입구역 5번 출구 도보 3분",
      "버스 광진문화예술회관 정류장(05-204), 광진구의회 정류장(05-695)",
    ],
    homepage: "https://healhousegd.com",
    photos: [
      "/images/clinics/geondae/1.webp",
      "/images/clinics/geondae/2.webp",
      "/images/clinics/geondae/3.webp",
      "/images/clinics/geondae/4.webp",
      "/images/clinics/geondae/5.webp",
    ],
    doctorSlugs: ["kang-hyunjin", "lee-doyoung"],
    intro: "건대입구역 인근에서 진료하는 건대 지점입니다.",
  },
  {
    slug: "daegu",
    name: "힐하우스피부과 대구점",
    shortName: "대구점",
    officialName: "힐하우스피부과의원 대구점",
    subjects: "피부과",
    region: "대구 동구",
    address: "대구광역시 동구 동대구로 525, 2층 (신천동)",
    phone: "053-710-1127",
    hours: [
      { day: "월·금", time: "09:30 – 20:30", note: "야간진료" },
      { day: "화·수·목", time: "09:30 – 18:30" },
      { day: "토요일", time: "09:00 – 14:00", note: "점심시간 없이 진료" },
    ],
    lunch: "13:00 – 14:00",
    closedNote: "확인 필요",
    access: [
      "지하철 1호선 동대구역 2번 출구 도보 4분 · KTX/SRT 동대구역 도보 3분",
      "버스 동대구동화아이위시아파트앞 정류장(00-468)",
      "건물 뒤편 주차 가능",
    ],
    homepage: "https://healhousedg.com",
    photos: [
      "/images/clinics/daegu/1.webp",
      "/images/clinics/daegu/2.webp",
      "/images/clinics/daegu/3.webp",
      "/images/clinics/daegu/4.webp",
      "/images/clinics/daegu/5.webp",
    ],
    doctorSlugs: ["kim-hyunwook", "park-hyojin", "yoon-jimin"],
    intro: "동대구역 인근에서 진료하는 대구 지점입니다.",
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
