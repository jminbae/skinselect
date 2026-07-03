import { site } from "@/lib/site";

/** ⚠ 임시 홈 — 홈 페이지 에이전트가 HOME-02 매거진 뷰로 교체 */
export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <h1 className="font-serif text-4xl font-bold text-ink">{site.name}</h1>
      <p className="mt-4 text-lg text-ink-soft">{site.tagline}</p>
    </div>
  );
}
