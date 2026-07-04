/**
 * 사진자료/1. 장비 전체 스캔 → 장비 전량 등록.
 * - 이름 정규화·별칭 병합, 지점 보유 맵 구성
 * - 장비당 대표 이미지 1장 webp 변환 (public/images/equipment/)
 * - src/lib/data/equipment.ts 자동 생성
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const GEAR_ROOT = path.resolve(ROOT, "..", "사진자료", "1. 장비");
const OUT_IMG = path.join(ROOT, "public", "images", "equipment");
const OUT_TS = path.join(ROOT, "src", "lib", "data", "equipment.ts");

const BRANCHES = [
  ["1. 강남", "gangnam"],
  ["2. 수원", "suwon"],
  ["3. 판교", "pangyo"],
  ["4. 건대", "geondae"],
  ["5. 대구", "daegu"],
];

/** 파일명 → 장비명 별칭 병합 */
const ALIASES = {
  울쎄라피프라임: "울쎄라피 프라임",
  "M22 A": "M22",
  "M22 B": "M22",
  "젠틀맥스 A": "젠틀맥스 프로플러스",
  "젠틀맥스 B": "젠틀맥스 프로플러스",
  "기기_골드 ptt": "골드 PTT",
  "쥬브젠 누끼": "쥬브젠",
  "스킨젯 누끼": "스킨젯",
};

/** 제외 (장비가 아닌 일반 소품 컷) */
const EXCLUDE = new Set(["04 글로우 흰색 앰플", "04 글로우 주사기"]);

/** 장비명 → 6축 분류 (미상은 태그 없음) */
const CATEGORY = {
  remodeling: [
    "써마지FLX", "텐써마", "덴서티", "포텐자", "아그네스", "3DEEP", "시크릿",
    "버츄RF", "올리지오", "세르프", "엠페이스", "CO2레이저", "울트라펄스앙코르",
    "페이셜 EMS(이브시너지)", "콰트로 피아모",
  ],
  lifting: ["울쎄라", "울쎄라피 프라임", "슈링크", "올타이트", "코레지셀핏", "힐로웨이브"],
  toning: [
    "GV", "젠틀맥스 프로플러스", "M22", "헬리오스", "레블라이트", "피코플러스",
    "인라이튼 루비피코", "포토나 스타워커", "포토나 QX MAX", "PiQo", "피콜로",
    "브이빔 퍼펙타", "A+ 레이저", "로터스", "리투오", "엘싸", "TCA필링", "골드 PTT",
  ],
  "skin-boosting": [
    "리쥬란 힐러", "쥬베룩", "셀엑소좀 블랙라벨", "비타란", "고우리", "라플렌",
    "더엘주사", "큐어젯", "미라젯", "스마트젝시드", "LDM", "이온자임", "리바이브", "스킨젯",
  ],
  volumizing: [
    "쥬베룩볼륨", "스컬트라", "레스틸렌", "레디어스", "HA필러", "벨로테로 필러",
    "쥬브젠", "쥬브아셀", "콜라쥬", "브이올렛",
  ],
  smoothing: ["코어톡스", "제오민 보톡스", "엘러간 보톡스 50"],
};
const catOf = (name) => {
  for (const [cat, names] of Object.entries(CATEGORY)) {
    if (names.includes(name)) return cat;
  }
  return null;
};

/** 기존 큐레이션 이미지 유지 (칼럼 커버가 참조) */
const EXISTING_IMG = {
  써마지FLX: "thermage-flx",
  "울쎄라피 프라임": "ultherapy-prime",
  울쎄라: "ulthera",
  덴서티: "density",
  텐써마: "tenthera",
  포텐자: "potenza",
  아그네스: "agnes",
  피코플러스: "picoplus",
  레블라이트: "revlite",
  "젠틀맥스 프로플러스": "gentlemax-pro-plus",
  "브이빔 퍼펙타": "vbeam-perfecta",
};

// ── 스캔 ──
async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.png$/i.test(e.name)) out.push(p);
  }
  return out;
}

const devices = new Map(); // name → { branches:Set, files:[] }
for (const [dirName, slug] of BRANCHES) {
  const dir = path.join(GEAR_ROOT, dirName);
  for (const file of await walk(dir)) {
    let name = path
      .basename(file)
      .replace(/\s*\d+\.png$/i, "")
      .replace(/\.png$/i, "")
      .trim();
    name = ALIASES[name] ?? name;
    if (EXCLUDE.has(name)) continue;
    if (!devices.has(name)) devices.set(name, { branches: new Set(), files: [] });
    const d = devices.get(name);
    d.branches.add(slug);
    d.files.push(file);
  }
}

// ── 이미지 변환 + 항목 구성 ──
const sorted = [...devices.entries()].sort((a, b) => {
  const ca = catOf(a[0]) ?? "zz";
  const cb = catOf(b[0]) ?? "zz";
  return ca === cb ? a[0].localeCompare(b[0], "ko") : ca.localeCompare(cb);
});

await fs.mkdir(OUT_IMG, { recursive: true });
const entries = [];
let idx = 0;
for (const [name, d] of sorted) {
  idx += 1;
  let imgSlug = EXISTING_IMG[name];
  if (!imgSlug) {
    imgSlug = `eq-${String(idx).padStart(2, "0")}`;
    // 대표 컷: '누끼' 우선, 아니면 파일명 정렬 첫 번째
    const pick =
      d.files.find((f) => f.includes("누끼")) ??
      [...d.files].sort((a, b) => path.basename(a).localeCompare(path.basename(b)))[0];
    await sharp(pick)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT_IMG, `${imgSlug}.webp`));
  }
  const cat = catOf(name);
  entries.push({
    name,
    image: `/images/equipment/${imgSlug}.webp`,
    fieldSlugs: cat ? [cat] : [],
    branches: [...d.branches],
  });
  console.log(`✓ ${name} [${cat ?? "-"}] (${[...d.branches].join(",")})`);
}

// ── equipment.ts 생성 ──
const ts = `import type { Equipment } from "@/lib/types";

/**
 * 장비·프로덕트 전량 — scripts/build-equipment.mjs 자동 생성 (수정 금지).
 * 사진자료/1. 장비 폴더 스캔 결과 ${entries.length}종.
 */
export const equipment: Equipment[] = ${JSON.stringify(entries, null, 2).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:")};

export function equipmentByBranch(branch: string) {
  return equipment.filter((e) => e.branches.includes(branch as never));
}
`;
await fs.writeFile(OUT_TS, ts);
console.log(`\n총 ${entries.length}종 → equipment.ts 생성 완료`);
