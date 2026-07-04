/**
 * 1단계: 원장 프로필 배경 제거 → PNG 누끼 생성 (sharp 미사용 — DLL 충돌 회피).
 * 2단계 변환은 scripts/cut-to-webp.mjs (별도 프로세스).
 */
import { removeBackground } from "@imgly/background-removal-node";
import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIR = path.resolve(import.meta.dirname, "..", "public", "images", "doctors");

const files = (await fs.readdir(DIR)).filter(
  (f) => f.endsWith(".webp") && !f.endsWith("-cut.webp"),
);

console.log(`대상: ${files.length}장`);
for (const f of files) {
  const src = path.join(DIR, f);
  const png = path.join(DIR, f.replace(".webp", "-cut.png"));
  const webp = path.join(DIR, f.replace(".webp", "-cut.webp"));
  try {
    await fs.access(webp);
    console.log(`skip: ${f}`);
    continue;
  } catch {}
  try {
    await fs.access(png);
    console.log(`skip(png): ${f}`);
    continue;
  } catch {}
  const t0 = Date.now();
  const blob = await removeBackground(pathToFileURL(src).href, {
    output: { format: "image/png" },
  });
  await fs.writeFile(png, Buffer.from(await blob.arrayBuffer()));
  console.log(`✓ ${path.basename(png)} (${Math.round((Date.now() - t0) / 1000)}s)`);
}
console.log("PNG 생성 완료");
