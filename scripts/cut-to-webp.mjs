/** 2단계: 누끼 PNG → webp(알파) 변환 후 PNG 삭제 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const DIR = path.resolve(import.meta.dirname, "..", "public", "images", "doctors");
const files = (await fs.readdir(DIR)).filter((f) => f.endsWith("-cut.png"));

for (const f of files) {
  const src = path.join(DIR, f);
  const dest = path.join(DIR, f.replace(".png", ".webp"));
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  await fs.unlink(src);
  const { size } = await fs.stat(dest);
  console.log(`✓ ${path.basename(dest)} (${Math.round(size / 1024)} KB)`);
}
console.log(`완료: ${files.length}장`);
