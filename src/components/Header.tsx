"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";

function Wordmark() {
  return (
    <span className="text-[19px] font-extrabold tracking-[-0.04em] text-ink">
      skinselect<span className="text-accent">.</span>
    </span>
  );
}

/**
 * GNB — 미니멀. 모바일 전체 메뉴는 header 밖의 형제 요소로 렌더링한다
 * (backdrop-filter가 fixed 요소의 containing block이 되는 문제 방지).
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
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 md:h-16 md:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="스킨셀렉트 홈">
            <Wordmark />
            <span className="rounded border border-line px-1.5 py-0.5 text-[9.5px] font-semibold tracking-wide text-ink-faint">
              DRAFT
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="주 메뉴">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[14.5px] transition-colors ${
                    active
                      ? "font-semibold text-ink"
                      : "font-medium text-ink-faint hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-label="메뉴 열기"
            onClick={() => setOpen(true)}
          >
            <span className="relative block h-[12px] w-[18px]">
              <span className="absolute left-0 top-0 h-[1.5px] w-full bg-ink" />
              <span className="absolute left-0 top-[5.5px] h-[1.5px] w-full bg-ink" />
              <span className="absolute left-0 top-[11px] h-[1.5px] w-full bg-ink" />
            </span>
          </button>
        </div>
      </header>

      {/* 모바일 전체 메뉴 — 불투명 풀스크린 */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-paper transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        inert={!open}
      >
        <div className="flex h-14 items-center justify-between border-b border-line px-5">
          <span className="flex items-center gap-2.5">
            <Wordmark />
            <span className="rounded border border-line px-1.5 py-0.5 text-[9.5px] font-semibold tracking-wide text-ink-faint">
              DRAFT
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
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col overflow-y-auto px-6 pt-4"
          aria-label="모바일 메뉴"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-line py-5 text-[22px] font-bold tracking-tight text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <p className="pt-6 text-[13.5px] leading-relaxed text-ink-faint">
            피부에 대해 궁금하면,
            <br />
            광고가 아니라 의사의 답을 읽는 곳
          </p>
        </nav>
      </div>
    </>
  );
}
