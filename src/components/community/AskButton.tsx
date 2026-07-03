"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 질문하기 버튼 — 서비스 초안 데모용 비활성.
 * 클릭 시 "서비스 오픈 후 이용할 수 있어요" 토스트 안내 (COM-01).
 */
export default function AskButton() {
  const [toast, setToast] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  function handleClick() {
    setToast(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(false), 2400);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-disabled="true"
        title="서비스 오픈 후 이용할 수 있어요"
        className="inline-flex cursor-default items-center gap-2.5 rounded-full bg-accent/85 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent"
      >
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M14 8c0 3-2.7 5.5-6 5.5-.8 0-1.6-.1-2.3-.4L2 14l1-3.2C2.4 10 2 9 2 8c0-3 2.7-5.5 6-5.5S14 5 14 8z" />
        </svg>
        질문하기
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold tracking-wide">
          오픈 예정
        </span>
      </button>

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-5"
      >
        {toast && (
          <p className="animate-fade-up rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper shadow-card-hover">
            서비스 오픈 후 이용할 수 있어요
          </p>
        )}
      </div>
    </>
  );
}
