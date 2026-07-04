"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SnsLink } from "@/lib/types";

/** SNS 풍선 위치 프리셋 — 사진 주변에 떠 있는 배치 (deterministic, hydration 안전) */
const BALLOON_POS: { top: string; left?: string; right?: string; delay: number }[] = [
  { top: "18%", left: "4%", delay: 0 },
  { top: "38%", right: "4%", delay: 0.8 },
  { top: "60%", left: "6%", delay: 1.6 },
  { top: "9%", right: "9%", delay: 2.2 },
  { top: "74%", right: "5%", delay: 0.4 },
];

function SnsGlyph({ type }: { type: SnsLink["type"] }) {
  const cls = "h-[16px] w-[16px]";
  switch (type) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="#E4405F" strokeWidth="2" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="#E4405F" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="#FF0000" strokeWidth="2" aria-hidden>
          <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
          <path d="M10 9.2l5 2.8-5 2.8V9.2z" fill="#FF0000" stroke="none" />
        </svg>
      );
    case "blog":
    case "brunch":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="#0e7a5f" strokeWidth="2" aria-hidden>
          <path d="M4 20h4l11-11a2.4 2.4 0 0 0-3.4-3.4L4.6 16.6 4 20z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="#2E86DE" strokeWidth="2" aria-hidden>
          <path d="M10 14a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
          <path d="M14 10a5 5 0 0 0-7.1 0l-2.4 2.4a5 5 0 0 0 7.1 7.1l1.2-1.2" />
        </svg>
      );
  }
}

/**
 * 원장 히어로 — 스튜디오 그라데이션 배경 + 큰 사진 2장 크로스페이드 +
 * 사진 주변에 떠 있는 SNS 풍선 (akd-members 레퍼런스 스타일).
 */
export default function DoctorHero({
  photos,
  name,
  position,
  badge,
  clinicName,
  clinicHref,
  quote,
  sns,
}: {
  photos: string[];
  name: string;
  position: string;
  badge: string;
  clinicName?: string;
  clinicHref?: string;
  quote: string;
  sns?: SnsLink[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced || photos.length < 2) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      8000,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduced, photos.length]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 68% 24%, #eef1f4 0%, #d3dae0 48%, #b4bec7 100%)",
      }}
    >
      <style>{`
        @keyframes balloon-float {
          from { transform: translateY(-6px); }
          to { transform: translateY(8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sns-balloon { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end px-0 md:min-h-[600px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:px-8">
        {/* 정보 블록 — 모바일 상단 · 데스크탑 좌하단 */}
        <div className="px-5 pb-2 pt-9 md:px-0 md:pb-20 md:pt-24">
          {clinicName &&
            (clinicHref ? (
              <Link
                href={clinicHref}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-ink"
              >
                <svg viewBox="0 0 14 14" className="h-3 w-3 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M2 12V5.5L7 2l5 3.5V12M5.5 12V8.5h3V12" />
                </svg>
                {clinicName}
              </Link>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/60 px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft backdrop-blur-sm">
                {clinicName}
              </span>
            ))}
          <h1 className="mt-4 text-[52px] font-extrabold leading-none tracking-[-0.04em] text-ink md:text-[76px]">
            {name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="rounded-full bg-white/65 px-3 py-1 text-[12.5px] font-semibold text-ink-soft backdrop-blur-sm">
              {position}
            </span>
            <span className="inline-flex items-center gap-1 text-[13.5px] font-bold text-accent-deep">
              <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <circle cx="6" cy="6" r="5" />
                <path d="M3.8 6.2l1.5 1.5 2.9-3.2" />
              </svg>
              {badge}
            </span>
          </div>
          <p className="mt-6 max-w-md text-[15.5px] italic leading-[1.7] text-ink-soft md:text-[16.5px]">
            “{quote}”
          </p>
        </div>

        {/* 사진 블록 — 하단 플러시 + SNS 풍선 */}
        <div className="relative md:self-end">
          <div className="relative mx-auto -mt-4 aspect-[4/5] w-full max-w-[460px] md:mt-0 md:max-w-none">
            {photos.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity ease-in-out"
                style={{
                  opacity: i === index ? 1 : 0,
                  transitionDuration: reduced ? "0ms" : "1200ms",
                }}
                aria-hidden={i !== index}
              >
                <Image
                  src={src}
                  alt={i === index ? `${name} 프로필 사진` : ""}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-contain object-bottom"
                />
              </div>
            ))}

            {/* SNS 풍선 */}
            {sns && sns.length > 0 && (
              <div aria-hidden={false}>
                {sns.slice(0, 5).map((s, i) => {
                  const pos = BALLOON_POS[i];
                  return (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label ?? s.type}
                      className="sns-balloon absolute z-10 flex items-center gap-2 rounded-full bg-white/90 py-2 pl-2.5 pr-3.5 text-[12px] font-semibold text-ink shadow-[0_6px_20px_-6px_rgba(20,20,20,0.25)] backdrop-blur-sm transition-transform hover:scale-105"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        right: pos.right,
                        animation: `balloon-float 3.6s ease-in-out ${pos.delay}s infinite alternate`,
                      }}
                    >
                      <SnsGlyph type={s.type} />
                      <span className="max-w-[110px] truncate">
                        {s.label ?? s.type}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}

            {/* 일시정지 — WCAG 2.2.2 */}
            {photos.length > 1 && !reduced && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "사진 전환 재생" : "사진 전환 일시정지"}
                className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45"
              >
                {paused ? (
                  <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden>
                    <path d="M4 2.5v11l9-5.5-9-5.5z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                    <path d="M4 2h3v12H4zM9 2h3v12H9z" />
                  </svg>
                )}
              </button>
            )}

            {/* reduced-motion: 수동 도트 */}
            {photos.length > 1 && reduced && (
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${i + 1}번째 사진 보기`}
                    className={`h-2.5 w-2.5 rounded-full ${
                      i === index ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
