"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";

/**
 * GNB. 모바일 전체 메뉴는 header 밖의 형제 요소로 렌더링한다 —
 * header의 backdrop-filter가 fixed 요소의 containing block이 되어
 * 오버레이가 깨져 보이던 문제 방지.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8">
          <Link
            href="/"
            className="flex items-baseline gap-2"
            aria-label="스킨셀렉트 홈"
          >
            <span className="font-serif text-[22px] font-bold tracking-tight text-ink md:text-2xl">
              스킨셀렉트
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint sm:inline">
              SkinSelect
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="주 메뉴">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-[15px] transition-colors ${
                    active
                      ? "bg-accent-soft font-semibold text-accent-deep"
                      : "font-medium text-ink-soft hover:bg-paper-warm hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <span className="ml-3 rounded-full border border-line-strong px-3 py-1.5 text-xs font-semibold tracking-wide text-ink-faint">
              DRAFT v0.1
            </span>
          </nav>

          <button
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-label="메뉴 열기"
            onClick={() => setOpen(true)}
          >
            <span className="relative block h-[14px] w-[20px]">
              <span className="absolute left-0 top-0 h-[1.5px] w-full bg-ink" />
              <span className="absolute left-0 top-[6px] h-[1.5px] w-full bg-ink" />
              <span className="absolute left-0 top-[12px] h-[1.5px] w-full bg-ink" />
            </span>
          </button>
        </div>
      </header>

      {/* 모바일 전체 메뉴 — header 밖 형제 요소, 불투명 풀스크린 */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-paper transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        inert={!open}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="flex items-center gap-2.5">
            <span className="font-serif text-[22px] font-bold tracking-tight text-ink">
              스킨셀렉트
            </span>
            <span className="rounded-full border border-line-strong px-2.5 py-1 text-[10px] font-semibold tracking-wide text-ink-faint">
              DRAFT v0.1
            </span>
          </span>
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          >
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5 text-ink"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pt-6"
          aria-label="모바일 메뉴"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-line py-4 font-serif text-2xl font-semibold text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <p className="pt-6 text-sm leading-relaxed text-ink-faint">
            피부에 대해 궁금하면,
            <br />
            광고가 아니라 의사의 답을 읽는 곳
          </p>
        </nav>
      </div>
    </>
  );
}
