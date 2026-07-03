"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * DOC-01 ① HERO 크로스페이드 (상세기획서 B-4 스펙)
 * - 장당 9초 표시, 1.2초 교차 페이드, Ken Burns 1.00→1.06
 * - 세션마다 첫 사진 로테이션
 * - 일시정지/재생 토글 (44×44px, WCAG 2.2.2)
 * - prefers-reduced-motion: 정지 사진 + 수동 넘김 도트로 대체
 */
export default function HeroCrossfade({
  photos,
  alt,
  className = "",
}: {
  photos: string[];
  alt: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // 세션별 첫 사진 로테이션 (마운트 후 적용 — SSR 불일치 방지)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    if (photos.length > 1 && !mq.matches) {
      setIndex(Math.floor(Math.random() * photos.length));
    }
    return () => mq.removeEventListener("change", onChange);
  }, [photos.length]);

  useEffect(() => {
    if (paused || reducedMotion || photos.length < 2) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 9000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reducedMotion, photos.length]);

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      {photos.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: reducedMotion ? "0ms" : "1200ms",
          }}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt={i === index ? alt : ""}
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            style={
              !reducedMotion && i === index && !paused
                ? {
                    animation: "kenburns 9s linear infinite",
                  }
                : undefined
            }
          />
        </div>
      ))}

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1) translateY(0); }
          to { transform: scale(1.06) translateY(-1.5%); }
        }
      `}</style>

      {/* 일시정지/재생 — 44×44 터치 영역 */}
      {photos.length > 1 && !reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "사진 전환 재생" : "사진 전환 일시정지"}
          className="absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        >
          {paused ? (
            <svg viewBox="0 0 16 16" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M4 2.5v11l9-5.5-9-5.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M4 2h3v12H4zM9 2h3v12H9z" />
            </svg>
          )}
        </button>
      )}

      {/* reduced-motion: 수동 넘김 도트 */}
      {photos.length > 1 && reducedMotion && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}번째 사진 보기`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
