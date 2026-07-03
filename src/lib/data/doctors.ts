import type { Doctor } from "@/lib/types";

/**
 * 힐하우스피부과 15인 원장 실데이터.
 *
 * 출처(공식 소스만 사용):
 * - 강남  https://healhousegn.com/sub/doctors.php
 * - 수원  https://healhousesw.com/subpage/doctors.php
 * - 판교  https://healhousepg.com/subpage/doctors.php
 * - 건대  https://healhousegd.com/subpage/doctors.php
 * - 대구  https://healhousedg.com/subpage/doctors.php
 * - 피부텐텐 https://pibutenten.kr/doctors/{slug} (인사말·주력 분야 보강)
 *
 * badge는 공식 소스에 "피부과 전문의" 명시가 확인된 경우에만 부여 (의료법 56조).
 * stats는 실데이터 연동 전까지 미기재 (목업 수치 노출 금지 — 검수 반영).
 *
 * headline·intro·fields·fieldSlugs는 시술·안티에이징 6축 개편(2026-07-04) 기준.
 * career는 공식 소스 그대로 유지 — 콘텐츠 축과 무관하게 수정 금지.
 */
export const doctors: Doctor[] = [
  // ───────────────────────────── 강남 ─────────────────────────────
  {
    slug: "bae-jungmin",
    name: "배정민",
    branch: "gangnam",
    badge: "피부과 전문의",
    position: "대표원장",
    headline: "빛이 피부색을 고르게 만드는 원리를 연구자의 언어로 씁니다.",
    intro: [
      "피부과 전문의 배정민입니다. 대학병원에서 피부과 교수로 오래 진료하고 연구해 왔습니다.",
      "피부색과 빛의 상호작용을 깊이 공부했고, 지금도 학회 활동과 연구를 이어가고 있습니다.",
      "토닝·피코·IPL은 이름보다 기전의 차이를 아는 것이 먼저입니다. 근거가 확인된 범위만 말씀드리겠습니다.",
      "궁금한 점은 어렵게 생각하지 말고 편하게 물어봐 주세요.",
    ],
    greeting:
      "진심 어린 치료와 꾸준한 연구로 백반증으로 고민하는 환자분들의 든든한 동반자가 되겠습니다.",
    career: [
      { item: "가톨릭대학교 의과대학 의학과 졸업" },
      { item: "가톨릭대학교 의과대학 대학원 의학박사" },
      { item: "가톨릭중앙의료원 인턴 및 피부과 전공의" },
      { item: "연세대학교 의과대학 세브란스병원 피부과 임상강사" },
      { item: "가톨릭대학교 의과대학 피부과 임상강사" },
      { item: "가톨릭대학교 의과대학 피부과 조교수" },
      { item: "가톨릭대학교 의과대학 피부과 부교수" },
      { item: "대한피부과의사회 학술이사" },
      { item: "대한백반증색소학회 기획정책이사" },
      { item: "대한피부연구학회 정보간사" },
      { item: "대한피부과학회 대외협력위원·정회원" },
      { item: "대한광의학회 평의원" },
      { item: "대한아토피피부염학회·대한건선학회·대한모발학회 정회원" },
      { item: "대한미용외과학회·대한여드름학회 정회원" },
      { item: "대한피부과학회 동화학술상 (2018)" },
      { item: "대한백반증색소학회 학술대회 최우수연제상 (2019)" },
      { item: "대한피부연구학회 신진연구자상 (2019)" },
    ],
    fields: ["톤·브라이트닝", "피코 토닝", "결 관리"],
    fieldSlugs: ["toning", "skin-boosting"],
    photos: [
      "/images/doctors/bae-jungmin-1.webp",
      "/images/doctors/bae-jungmin-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/bae-jungmin",
        label: "피부텐텐 Q&A",
      },
    ],
  },
  {
    slug: "jung-hanmi",
    name: "정한미",
    branch: "gangnam",
    badge: "피부과 전문의",
    position: "대표원장",
    headline: "얼마나 채우느냐보다 어디를 왜 채우는지를 씁니다.",
    intro: [
      "피부과 전문의 정한미입니다. 가톨릭중앙의료원에서 피부과 수련을 마쳤습니다.",
      "꺼진 볼륨을 다시 채우는 필러와 볼륨 설계를 중심으로 피부 노화 진료를 이어 왔습니다.",
      "얼마나 채우느냐보다 어디를 왜 채우느냐가 전체 인상의 균형을 좌우합니다.",
      "기전과 주의사항까지 충분히 설명드린 뒤에 함께 결정하겠습니다.",
    ],
    greeting:
      "피부의 모든 것을 믿고 맡길 수 있는 평생 피부 주치의가 되겠습니다.",
    career: [
      { item: "가톨릭대학교 의과대학 의학과 졸업" },
      { item: "가톨릭중앙의료원 인턴 및 피부과 전공의" },
      { item: "가톨릭대학교 성빈센트병원 피부과 임상강사" },
      { item: "전) 후즈후피부과 동탄점 원장" },
      { item: "대한피부과학회 정회원" },
      { item: "대한아토피피부염학회·대한건선학회 정회원" },
      { item: "대한모발학회·대한미용외과학회·대한여드름학회 정회원" },
    ],
    fields: ["볼륨 설계", "필러", "주름 스무딩"],
    fieldSlugs: ["volumizing", "smoothing", "skin-boosting"],
    photos: [
      "/images/doctors/jung-hanmi-1.webp",
      "/images/doctors/jung-hanmi-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/jung-hanmi",
        label: "피부텐텐 Q&A",
      },
    ],
  },
  {
    slug: "park-saemi",
    name: "박새미",
    branch: "gangnam",
    badge: "피부과 전문의",
    position: "대표원장",
    headline: "피부 톤이 흐려지는 이유와 레이저가 개입하는 지점을 씁니다.",
    intro: [
      "피부과 전문의 박새미입니다. 가톨릭중앙의료원에서 피부과 수련을 마쳤습니다.",
      "레이저 토닝과 IPL처럼 색과 결을 고르게 다듬는 시술을 주로 진료합니다.",
      "같은 칙칙함이라도 원인과 깊이에 따라 접근이 달라야 합니다.",
      "피부를 찬찬히 살피고, 지금 단계에 맞는 계획을 말씀드리겠습니다.",
    ],
    career: [
      { item: "가톨릭중앙의료원 인턴 및 피부과 전공의 수료" },
      { item: "전) 후즈후피부과 압구정점 원장" },
      { item: "대한피부과학회 정회원" },
      { item: "대한피부과의사회 정회원" },
      { item: "대한피부항노화연구회 정회원" },
      { item: "대한피부레이저학회 정회원" },
      { item: "대한여드름주사학회 정회원" },
    ],
    fields: ["레이저 토닝", "톤·브라이트닝", "결 관리"],
    fieldSlugs: ["toning", "remodeling"],
    photos: [
      "/images/doctors/park-saemi-1.webp",
      "/images/doctors/park-saemi-2.webp",
    ],
  },
  {
    slug: "chu-jiyoon",
    name: "추지윤",
    branch: "gangnam",
    badge: "피부과 전문의",
    position: "원장",
    headline: "콜라겐이 다시 지어지는 몇 달의 과정을 씁니다.",
    intro: [
      "피부과 전문의 추지윤입니다. 가톨릭중앙의료원에서 피부과 수련을 마쳤습니다.",
      "여러 피부과에서 원장으로 진료하며 고주파(RF)와 마이크로니들 같은 리모델링 시술 경험을 쌓았습니다.",
      "콜라겐은 시술 당일이 아니라 그 후 몇 달에 걸쳐 서서히 다시 만들어지는 것으로 알려져 있습니다.",
      "시술은 한 번으로 끝나는 일이 아니라 과정입니다. 단계마다 무엇이 일어나는지 설명드리겠습니다.",
    ],
    career: [
      { item: "가톨릭대학교 의과대학 의학과 졸업" },
      { item: "가톨릭중앙의료원 인턴 및 피부과 전공의" },
      { item: "전) 차앤박피부과 도곡양재점 원장" },
      { item: "전) 모델로피부과 청담점 원장" },
      { item: "대한피부과학회 정회원" },
      { item: "대한피부과의사회 정회원" },
      { item: "대한피부항노화연구회 정회원" },
      { item: "대한피부레이저학회 정회원" },
      { item: "대한여드름주사학회 정회원" },
    ],
    fields: ["리모델링 RF", "마이크로니들", "탄력 관리"],
    fieldSlugs: ["remodeling", "lifting"],
    photos: [
      "/images/doctors/chu-jiyoon-1.webp",
      "/images/doctors/chu-jiyoon-2.webp",
    ],
  },

  // ───────────────────────────── 수원 ─────────────────────────────
  {
    slug: "kwon-suhyun",
    name: "권수현",
    branch: "suwon",
    badge: "피부과 전문의",
    position: "대표원장",
    headline: "마이크로니들 RF가 피부 결과 모공을 바꾸는 과정을 씁니다.",
    intro: [
      "피부과 전문의 권수현입니다. 아주대학교병원에서 피부과 수련을 마치고 임상강사로 일했습니다.",
      "마이크로니들 RF처럼 피부 속 콜라겐을 다시 짓는 리모델링 시술을 주로 진료합니다.",
      "모공과 결, 탄력처럼 오래 신경 쓰이는 고민일수록 원리를 알고 접근해야 합니다.",
      "피부는 하루아침에 바뀌지 않습니다. 무리한 약속 대신 단계적인 계획을 말씀드리겠습니다.",
    ],
    greeting:
      "한 분 한 분의 피부를 깊이 이해하고 피부 건강을 끝까지 책임지는 힐링 닥터가 되겠습니다.",
    career: [
      { item: "아주대학교 의과대학 의학과 졸업" },
      { item: "아주대학교병원 인턴 및 피부과 전공의 수료" },
      { item: "아주대학교 의과대학 박사과정" },
      { item: "아주대학교병원 임상강사" },
      { item: "전) 닥터스피부과 광교점 원장" },
      { item: "대한피부과학회·대한피부과의사회 정회원" },
      { item: "대한백반증색소학회 정회원" },
      { item: "대한아토피피부염학회·대한건선학회 정회원" },
      { item: "대한미용외과학회·대한여드름학회 정회원" },
    ],
    fields: ["마이크로니들 RF", "리모델링", "결·모공 관리"],
    fieldSlugs: ["remodeling", "toning"],
    photos: [
      "/images/doctors/kwon-suhyun-1.webp",
      "/images/doctors/kwon-suhyun-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/kwon-soohyun",
        label: "피부텐텐 Q&A",
      },
    ],
  },
  {
    slug: "go-hyerim",
    name: "고혜림",
    branch: "suwon",
    badge: "피부과 전문의",
    position: "원장",
    headline: "피부 속 수분과 재생 신호가 하는 일을 씁니다.",
    intro: [
      "피부과 전문의 고혜림입니다. 가톨릭중앙의료원에서 피부과 수련을 마쳤습니다.",
      "스킨부스터처럼 피부 속 수분과 재생을 다루는 시술을 주로 진료합니다.",
      "부스터라는 이름은 같아도 성분과 기전이 다르고, 피부 상태에 따라 맞는 선택도 달라집니다.",
      "피부의 기초 체력부터 차근차근, 지금 피부에 맞는 순서를 함께 정하겠습니다.",
    ],
    greeting:
      "자신감 넘치는 피부로 환자분의 삶이 더 당당히 빛나도록 늘 곁에서 노력하겠습니다.",
    career: [
      { item: "가톨릭중앙의료원 인턴 및 피부과 전공의 수료" },
      { item: "전) 오라클피부과 천안신부점 원장" },
      { item: "대한피부과학회·대한피부과의사회 정회원" },
      { item: "대한백반증색소학회 정회원" },
      { item: "대한미용피부외과학회 정회원" },
      { item: "대한피부레이저학회 정회원" },
      { item: "대한피부항노화학회 정회원" },
      { item: "대한여드름주사학회 정회원" },
    ],
    fields: ["스킨부스팅", "수분·재생", "결 관리"],
    fieldSlugs: ["skin-boosting", "toning"],
    photos: [
      "/images/doctors/go-hyerim-1.webp",
      "/images/doctors/go-hyerim-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/ko-hyerim",
        label: "피부텐텐 Q&A",
      },
    ],
  },
  {
    slug: "kim-sujeong",
    name: "김수정",
    branch: "suwon",
    badge: "피부과 전문의",
    position: "원장",
    headline: "같은 색이라도 깊이가 다르다는 것부터 씁니다.",
    intro: [
      "피부과 전문의 김수정입니다. 충남대학교병원에서 피부과 수련을 마치고 외래교수로 일했습니다.",
      "일본 규슈대학병원 파견 경험을 포함해 대학병원과 개원가에서 두루 진료해 왔습니다.",
      "레이저 토닝·피코·IPL처럼 색과 결을 고르게 다듬는 시술을 주로 봅니다.",
      "같은 색이라도 깊이와 원인이 다릅니다. 지금 피부에 맞는 접근부터 함께 확인하겠습니다.",
    ],
    career: [
      { item: "충남대학교 의과대학 의학과 졸업" },
      { item: "충남대학교병원 인턴 및 피부과 전공의 수료" },
      { item: "충남대학교병원 의학석사" },
      { item: "충남대학교병원 피부과 외래교수" },
      { item: "전) Kyushu University Hospital 파견의" },
      { item: "전) 오라클피부과 대전둔산점 원장" },
      { item: "전) 아름다운피부과 영통점 원장" },
      { item: "대한피부과학회·대한피부과의사회 정회원" },
      { item: "대한임상피부치료연구회 정회원" },
      { item: "대한백반증색소학회 정회원" },
      { item: "대한여드름주사학회·대한아토피피부염학회 정회원" },
    ],
    fields: ["토닝·브라이트닝", "피코 레이저", "결 관리"],
    fieldSlugs: ["toning", "skin-boosting"],
    photos: [
      "/images/doctors/kim-sujeong-1.webp",
      "/images/doctors/kim-sujeong-2.webp",
    ],
  },
  {
    slug: "kim-suhyeong",
    name: "김수형",
    branch: "suwon",
    badge: "피부과 전문의",
    position: "원장",
    headline: "스킨부스터라는 이름 안의 성분과 기전을 씁니다.",
    intro: [
      "피부과 전문의 김수형입니다. 가톨릭중앙의료원에서 피부과 수련을 마쳤습니다.",
      "스킨부스터를 중심으로 피부 속 수분과 재생을 다루는 시술을 주로 진료합니다.",
      "같은 부스터라도 성분과 기전이 다르고, 기대할 수 있는 범위도 다릅니다.",
      "시술의 원리와 한계를 있는 그대로 설명드리고, 피부에 맞는 선택을 돕겠습니다.",
    ],
    greeting:
      "건강한 피부를 넘어 삶의 긍정적인 변화까지 드리는 피부 주치의가 되겠습니다.",
    career: [
      { item: "가톨릭대학교 의과대학 의학과 졸업" },
      { item: "가톨릭중앙의료원 인턴 및 피부과 전공의" },
      { item: "전) MJ피부과 원장" },
      { item: "대한피부과학회·대한피부과의사회 정회원" },
      { item: "대한백반증색소학회 정회원" },
      { item: "대한피부항노화학회 정회원" },
      { item: "대한여드름주사학회 정회원" },
      { item: "대한아토피피부염학회 정회원" },
      { item: "대한미용피부외과학회 정회원" },
    ],
    fields: ["스킨부스팅", "수분·광채 설계", "재생 관리"],
    fieldSlugs: ["skin-boosting", "volumizing"],
    photos: [
      "/images/doctors/kim-suhyeong-1.webp",
      "/images/doctors/kim-suhyeong-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/kim-soohyung",
        label: "피부텐텐 Q&A",
      },
    ],
  },

  // ───────────────────────────── 판교 ─────────────────────────────
  {
    slug: "kim-jongsik",
    name: "김종식",
    branch: "pangyo",
    badge: "피부과 전문의",
    position: "대표원장",
    headline: "고주파가 피부 속에서 하는 일을 공학의 눈으로 씁니다.",
    intro: [
      "피부과 전문의 김종식입니다. 서울대에서 공학을 공부한 뒤 의학의 길로 들어와 가톨릭중앙의료원에서 피부과 수련을 마쳤습니다.",
      "고주파(RF)와 마이크로니들처럼 에너지로 콜라겐을 다시 짓는 리모델링 시술을 주로 진료합니다.",
      "장비 이름보다 에너지가 닿는 깊이와 전달 방식의 차이를 이해하는 것이 먼저입니다.",
      "충분히 듣고 충분히 설명하는 것이 좋은 진료의 절반이라고 생각합니다.",
    ],
    greeting:
      "피부 고민에 깊이 공감하고 충분한 소통을 바탕으로 개인별 맞춤 솔루션을 제시하겠습니다.",
    career: [
      { item: "서울대학교 기계항공공학부" },
      { item: "가톨릭대학교 의과대학 의학과" },
      { item: "가톨릭중앙의료원 피부과 전공의 수료" },
      { item: "전) 새봄피부과 원장" },
      { item: "대한피부과학회·대한피부과의사회 정회원" },
      { item: "대한백반증색소학회 정회원" },
      { item: "대한미용피부외과학회 정회원" },
      { item: "대한피부레이저학회 정회원" },
      { item: "대한피부암학회 정회원" },
      { item: "대한피부항노화학회 정회원" },
      { item: "대한여드름주사학회 정회원" },
      { item: "한국피부유형연구회 정회원" },
    ],
    fields: ["리모델링 RF", "마이크로니들", "탄력 설계"],
    fieldSlugs: ["remodeling", "lifting", "toning"],
    photos: [
      "/images/doctors/kim-jongsik-1.webp",
      "/images/doctors/kim-jongsik-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/kim-jongsic",
        label: "피부텐텐 Q&A",
      },
    ],
  },
  {
    slug: "byun-hyunjung",
    name: "변현정",
    branch: "pangyo",
    badge: "피부과 전문의",
    position: "원장",
    headline: "표정을 지키면서 주름을 다루는 균형을 씁니다.",
    intro: [
      "피부과 전문의 변현정입니다. 삼성서울병원에서 피부과 수련을 마쳤습니다.",
      "여러 피부과에서 원장으로 진료하며 보툴리눔 톡신처럼 표정 주름을 다루는 시술 경험을 쌓았습니다.",
      "주름을 줄이는 것보다 표정의 자연스러움을 지키는 일이 더 섬세한 과제입니다.",
      "용량과 주기, 주의사항까지 담백하게 설명드리겠습니다.",
    ],
    career: [
      { item: "성균관대학교 의과대학 졸업" },
      { item: "삼성서울병원 인턴 및 피부과 레지던트 수료" },
      { item: "전) 용산 오아로피부과 원장" },
      { item: "전) 신사·신도림 닥터스피부과 원장" },
      { item: "전) 리뉴미피부과 분당점 원장" },
      { item: "대한피부과학회 정회원" },
      { item: "대한피부과의사회 정회원" },
    ],
    fields: ["주름 스무딩", "보툴리눔 톡신", "표정 설계"],
    fieldSlugs: ["smoothing", "volumizing"],
    photos: [
      "/images/doctors/byun-hyunjung-1.webp",
      "/images/doctors/byun-hyunjung-2.webp",
    ],
  },

  // ───────────────────────────── 건대 ─────────────────────────────
  {
    slug: "lee-doyoung",
    name: "이도영",
    branch: "geondae",
    badge: "피부과 전문의",
    position: "대표원장",
    headline: "당기는 시술의 기대치와 한계를 씁니다.",
    intro: [
      "피부과 전문의 이도영입니다. 서울대학교 의과대학을 졸업하고 서울아산병원에서 피부과 수련을 마쳤습니다.",
      "집속 초음파(HIFU)처럼 처짐을 다루는 리프팅 시술을 중심으로 진료합니다.",
      "미국 뉴욕 프레스비테리언 병원 피부외과 연수를 포함해 대학병원과 학회에서 꾸준히 공부해 왔습니다.",
      "에너지가 닿는 깊이에 따라 기대할 수 있는 범위가 달라집니다. 원리와 한계까지 설명드리겠습니다.",
    ],
    greeting:
      "한 분 한 분의 피부를 한 폭의 캔버스라 여기며 고유한 아름다움을 찾아드리겠습니다.",
    career: [
      { item: "서울대학교 의과대학 졸업" },
      { item: "의학박사" },
      { item: "서울아산병원 피부과 전공의" },
      { item: "서울아산병원 피부과 임상전임강사" },
      { item: "New York Presbyterian Hospital 피부외과 클리닉 연수" },
      { item: "울산대학교 의과대학 피부과 외래교수" },
      { item: "대한피부과학회 정회원" },
      { item: "대한피부과의사회 정회원·학술이사" },
      { item: "대한피부항노화학회 정회원·학술이사" },
      { item: "대한피부레이저학회 정회원" },
      { item: "대한여드름학회·대한모발학회 정회원" },
      { item: "KOREADERMA Academic Director" },
      { item: "대한피부과의사회 학술상 (2021·2022·2024)" },
      { item: "대한피부항노화학회 학술상 (2023)" },
    ],
    fields: ["리프팅", "탄력 설계", "리모델링 RF"],
    fieldSlugs: ["lifting", "remodeling"],
    photos: [
      "/images/doctors/lee-doyoung-1.webp",
      "/images/doctors/lee-doyoung-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/rhee-doyoung",
        label: "피부텐텐 Q&A",
      },
    ],
  },
  {
    slug: "kang-hyunjin",
    name: "강현진",
    branch: "geondae",
    badge: "피부과 전문의",
    position: "원장",
    headline: "초음파 에너지가 닿는 깊이의 의미를 씁니다.",
    intro: [
      "피부과 전문의 강현진입니다. 토론토대학교에서 생명과학을 공부한 뒤 가톨릭중앙의료원에서 피부과 수련을 마쳤습니다.",
      "집속 초음파(HIFU) 리프팅처럼 처짐과 탄력을 다루는 시술을 주로 진료합니다.",
      "생명과학을 공부한 배경대로, 시술의 기전을 근거 중심으로 풀어 설명하는 일을 좋아합니다.",
      "레티노이드·자외선 차단제 같은 성분 궁금증도 근거를 바탕으로 차근차근 답해 드리겠습니다.",
    ],
    greeting:
      "면밀한 상담과 끊임없는 연구로 환자분 한 분 한 분께 가장 알맞은 치료를 찾아드리겠습니다.",
    career: [
      { item: "토론토대학교 생명과학 전공" },
      { item: "가톨릭대학교 의과대학 의학과 졸업" },
      { item: "가톨릭중앙의료원 인턴 및 피부과 전공의 수료" },
      { item: "대한피부과학회 정회원" },
      { item: "대한피부과의사회 정회원" },
      { item: "대한피부레이저학회 정회원" },
      { item: "대한피부항노화학회 정회원" },
      { item: "대한여드름주사학회 정회원" },
    ],
    fields: ["리프팅", "탄력 케어", "스킨부스팅"],
    fieldSlugs: ["lifting", "skin-boosting"],
    photos: [
      "/images/doctors/kang-hyunjin-1.webp",
      "/images/doctors/kang-hyunjin-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/kang-hyunjin",
        label: "피부텐텐 Q&A",
      },
    ],
  },

  // ───────────────────────────── 대구 ─────────────────────────────
  {
    slug: "kim-hyunwook",
    name: "김현욱",
    branch: "daegu",
    badge: "피부과 전문의",
    position: "원장",
    headline: "처짐이 시작되는 신호와 리프팅의 순서를 씁니다.",
    intro: [
      "피부과 전문의 김현욱입니다. 계명대학교 동산병원에서 피부과 수련을 마쳤습니다.",
      "군 병원 피부과장으로 일하며 다양한 피부 고민을 진료한 경험이 있습니다.",
      "처짐과 탄력 저하를 다루는 리프팅 시술을 중심으로 진료합니다.",
      "지금 필요한 것이 무엇인지부터 짚고, 시술의 순서를 함께 정하겠습니다.",
    ],
    career: [
      { item: "계명대학교 의과대학 의학과 졸업" },
      { item: "계명대학교 의과대학 의학석사" },
      { item: "계명대학교 동산병원 피부과 전공의 수료" },
      { item: "전) 계룡대 지구병원 피부과장" },
      { item: "대한피부과학회 정회원" },
      { item: "대한피부과의사회 정회원" },
      { item: "대한항노화학회 정회원" },
    ],
    fields: ["리프팅", "탄력 관리", "리모델링 RF"],
    fieldSlugs: ["lifting", "remodeling"],
    photos: [
      "/images/doctors/kim-hyunwook-1.webp",
      "/images/doctors/kim-hyunwook-2.webp",
    ],
  },
  {
    slug: "park-hyojin",
    name: "박효진",
    branch: "daegu",
    badge: "피부과 전문의",
    position: "대표원장",
    headline: "꺼진 자리와 처진 자리를 구분하는 눈을 씁니다.",
    intro: [
      "피부과 전문의 박효진입니다. 서울성모병원과 부천성모병원에서 피부과 수련을 마쳤습니다.",
      "꺼진 볼륨을 채우는 필러와 볼륨 설계, 주름·탄력 고민을 주로 진료합니다.",
      "처져서 생긴 그늘인지 꺼져서 생긴 그늘인지에 따라 접근이 달라집니다.",
      "피부 고민은 그 자체로 스트레스입니다. 마음까지 가벼워지는 진료를 하겠습니다.",
    ],
    greeting:
      "피부 건강과 아름다움은 물론 마음까지 치유될 수 있도록 정성껏 진료하겠습니다.",
    career: [
      { item: "계명대학교 의과대학 의학과 졸업" },
      { item: "서울성모병원·부천성모병원 피부과 전공의 수련" },
      { item: "가톨릭중앙의료원 피부과 전문의 취득" },
      { item: "전) 더퍼스트피부과 대구점 원장" },
      { item: "전) 힐하우스피부과 수원점 원장" },
      { item: "대한피부과학회·대한피부과의사회 정회원" },
      { item: "대한백반증색소학회 정회원" },
      { item: "대한피부항노화학회 정회원" },
      { item: "대한피부레이저학회 정회원" },
      { item: "대한미용피부외과학회 정회원" },
      { item: "대한화장품의학회 정회원" },
    ],
    fields: ["볼륨 설계", "필러", "리프팅"],
    fieldSlugs: ["volumizing", "lifting", "smoothing"],
    photos: [
      "/images/doctors/park-hyojin-1.webp",
      "/images/doctors/park-hyojin-2.webp",
    ],
    sns: [
      {
        type: "etc",
        url: "https://pibutenten.kr/doctors/park-hyojin",
        label: "피부텐텐 Q&A",
      },
    ],
  },
  {
    slug: "yoon-jimin",
    name: "윤지민",
    branch: "daegu",
    badge: "피부과 전문의",
    position: "원장",
    headline: "표정 주름과 새겨진 주름을 구분하는 기준을 씁니다.",
    intro: [
      "피부과 전문의 윤지민입니다. 계명대학교 동산병원에서 피부과 수련을 마쳤습니다.",
      "동산병원 전임의와 임상교수요원으로 일하며 폭넓은 진료 경험을 쌓았습니다.",
      "표정 주름인지 새겨진 주름인지에 따라 보툴리눔 톡신으로 기대할 수 있는 범위가 달라집니다.",
      "구분이 먼저라는 대학병원의 원칙 그대로, 근거에 따라 설명드리겠습니다.",
    ],
    career: [
      { item: "계명대학교 의과대학 의학과 졸업" },
      { item: "계명대학교 동산병원 피부과 전공의 수료" },
      { item: "전) 계명대학교 동산병원 전임의 및 임상교수요원" },
      { item: "대한피부과학회 정회원" },
      { item: "대한피부과의사회 정회원" },
    ],
    fields: ["주름 스무딩", "보툴리눔 톡신", "결 관리"],
    fieldSlugs: ["smoothing", "toning"],
    photos: [
      "/images/doctors/yoon-jimin-1.webp",
      "/images/doctors/yoon-jimin-2.webp",
    ],
  },
];

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}

export function doctorsByBranch(branch: string) {
  return doctors.filter((d) => d.branch === branch);
}
