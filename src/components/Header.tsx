"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";

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
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <Link href="/" className="flex items-baseline gap-2" aria-label="스킨셀렉트 홈">
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
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-[14px] w-[20px]">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-[1.5px] w-full bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-[1.5px] w-full bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* 모바일 전체 메뉴 */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-paper transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pt-6" aria-label="모바일 메뉴">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-line py-4 font-serif text-2xl font-semibold text-ink"
              style={{
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}
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
    </header>
  );
}
