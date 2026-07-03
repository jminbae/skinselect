/**
 * 사진자료 → public/images 웹 최적화 파이프라인.
 * 1) 원장 프로필: 사진자료/0. 원장님 프로필/** → /images/doctors/{slug}-{n}.webp (1200w)
 * 2) 추가 매니페스트(scripts/image-manifest.json)가 있으면 그 항목도 처리
 *    항목: { "src": "<절대/상대 경로>", "dest": "public/images/...", "width": 1600 }
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PHOTO_ROOT = path.resolve(ROOT, "..", "사진자료");

/** 한글 이름 → slug */
const nameSlugs = {
  박새미: "park-saemi",
  배정민: "bae-jungmin",
  정한미: "jung-hanmi",
  추지윤: "chu-jiyoon",
  고혜림: "go-hyerim",
  권수현: "kwon-suhyun",
  김수정: "kim-sujeong",
  김수형: "kim-suhyeong",
  김종식: "kim-jongsik",
  변현정: "byun-hyunjung",
  강현진: "kang-hyunjin",
  이도영: "lee-doyoung",
  김현욱: "kim-hyunwook",
  박효진: "park-hyojin",
  윤지민: "yoon-jimin",
};

async function convert(src, dest, width, quality = 78) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await sharp(src)
    .rotate() // EXIF 회전 반영
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);
  const { size } = await fs.stat(dest);
  console.log(`✓ ${path.relative(ROOT, dest)} (${Math.round(size / 1024)} KB)`);
}

async function processDoctors() {
  const profileRoot = path.join(PHOTO_ROOT, "0. 원장님 프로필");
  const branches = await fs.readdir(profileRoot);
  for (const branch of branches) {
    const dir = path.join(profileRoot, branch);
    const files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
    for (const file of files) {
      // 예: "1.강남_배정민원장_1.jpg"
      const m = file.match(/_(.+?)원장_(\d)\./);
      if (!m) continue;
      const slug = nameSlugs[m[1]];
      if (!slug) {
        console.warn(`! slug 미정의: ${m[1]} (${file})`);
        continue;
      }
      const dest = path.join(ROOT, "public", "images", "doctors", `${slug}-${m[2]}.webp`);
      await convert(path.join(dir, file), dest, 1200);
    }
  }
}

async function processManifest() {
  const manifestPath = path.join(ROOT, "scripts", "image-manifest.json");
  let manifest;
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  } catch {
    console.log("(추가 매니페스트 없음 — 원장 프로필만 처리)");
    return;
  }
  for (const item of manifest) {
    const src = path.isAbsolute(item.src) ? item.src : path.join(PHOTO_ROOT, item.src);
    const dest = path.join(ROOT, item.dest);
    await convert(src, dest, item.width ?? 1600, item.quality ?? 76);
  }
}

await processDoctors();
await processManifest();
console.log("완료");
