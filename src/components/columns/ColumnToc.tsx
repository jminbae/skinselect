"use client";

import { useEffect, useRef, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * 현재 읽는 섹션 감지 — IntersectionObserver 기반.
 * 헤딩이 뷰포트 상단 기준선(약 160px)을 넘나들 때마다
 * 기준선 위를 지난 마지막 헤딩을 활성 섹션으로 계산한다.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  const key = ids.join("|");

  useEffect(() => {
    const idList = key.split("|").filter(Boolean);
    if (idList.length === 0) return;

    const recompute = () => {
      let current = idList[0];
      for (const id of idList) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 168) current = id;
      }
      setActive(current);
    };

    recompute();

    const observer = new IntersectionObserver(recompute, {
      // 상단 160px 기준선을 교차 경계로 사용
      rootMargin: "-160px 0px 0px 0px",
    });
    for (const id of idList) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [key]);

  return active;
}

/** 데스크탑 — 우측 sticky 목차, 현재 섹션 하이라이트 */
export function TocDesktop({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items.map((i) => i.id));

  return (
    <nav aria-label="목차">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
        목차
      </p>
      <ul className="mt-4 border-l border-line">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`-ml-px block border-l-2 py-2 pl-4 text-[13.5px] leading-snug transition-colors ${
                  isActive
                    ? "border-accent font-semibold text-accent-deep"
                    : "border-transparent text-ink-faint hover:text-ink"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** 모바일 — 접이식 목차 (탭 시 앵커 이동 + 자동 접힘) */
export function TocMobile({ items }: { items: TocItem[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  return (
    <details
      ref={ref}
      className="group rounded-xl border border-line bg-white shadow-card"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
        목차 보기 ({items.length})
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 text-ink-faint transition-transform duration-200 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden
        >
          <path d="M3 6l5 5 5-5" />
        </svg>
      </summary>
      <ul className="border-t border-line px-5 py-2">
        {items.map((item, i) => (
          <li key={item.id} className="border-b border-line/60 last:border-b-0">
            <a
              href={`#${item.id}`}
              onClick={() => ref.current?.removeAttribute("open")}
              className="flex items-baseline gap-3 py-2.5 text-[14px] leading-snug text-ink-soft transition-colors hover:text-accent"
            >
              <span className="shrink-0 font-serif text-[12.5px] font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
