"use client";

import { useEffect, useRef, useState } from "react";

export interface StripItem {
  label: string; // "칼럼"
  value: number; // 24
  format?: "raw" | "man"; // man: 만 단위 표기 (2.4만)
  suffix?: string; // "편", "건"
}

function formatValue(item: StripItem, current: number) {
  if (item.format === "man") {
    const man = current / 10000;
    return man >= 10 ? `${Math.round(man)}만` : `${man.toFixed(1)}만`;
  }
  return current.toLocaleString();
}

/**
 * DOC-01 ② 사회적 증거 스트립 — 뷰포트 진입 시 카운트업 1회.
 * reduced-motion 시 즉시 최종값. 임계값 미달 칸은 호출부에서 제외.
 */
export default function CountUpStrip({ items }: { items: StripItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || played.current) return;
        played.current = true;
        const start = performance.now();
        const dur = 1000;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          setProgress(1 - Math.pow(1 - t, 3)); // ease-out cubic
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      ref={ref}
      className="grid divide-x divide-line rounded-2xl border border-line bg-white shadow-card"
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map((item) => (
        <div key={item.label} className="px-3 py-5 text-center">
          <p className="font-serif text-[22px] font-bold tabular-nums text-ink md:text-[26px]">
            {formatValue(item, Math.round(item.value * progress))}
            {item.suffix && (
              <span className="ml-0.5 text-[14px] font-semibold text-ink-soft">
                {item.suffix}
              </span>
            )}
          </p>
          <p className="mt-1 text-[12px] font-medium tracking-wide text-ink-faint">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
