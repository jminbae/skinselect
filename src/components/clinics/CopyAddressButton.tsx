"use client";

import { useEffect, useRef, useState } from "react";

/** 주소 복사 버튼 — 복사 성공 시 체크 아이콘 + '복사됨' 피드백 (CLI-01) */
export default function CopyAddressButton({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // clipboard API 미지원 환경 폴백
      const ta = document.createElement("textarea");
      ta.value = address;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
        copied
          ? "border-accent bg-accent-soft text-accent"
          : "border-line-strong text-ink-soft hover:border-ink hover:text-ink"
      }`}
    >
      {copied ? (
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8.5l3.2 3.2L13 4.8" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5v-2a1 1 0 00-1-1h-6a1 1 0 00-1 1v6a1 1 0 001 1h2" />
        </svg>
      )}
      <span aria-live="polite">{copied ? "복사됨" : "주소 복사"}</span>
    </button>
  );
}
