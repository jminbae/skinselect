import Link from "next/link";
import { site, medicalDisclaimer, navItems } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-[17px] font-extrabold tracking-[-0.04em] text-ink">
              skinselect<span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              {site.tagline}. 피부과 전문의 {site.doctorCount}명이 실명으로
              직접 쓰고, 모든 칼럼에 근거 출처를 답니다.
            </p>
          </div>
          <nav aria-label="푸터 메뉴">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/clinics"
                  className="text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  병원 둘러보기
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-[12.5px] leading-relaxed text-ink-faint">
            {medicalDisclaimer}
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-faint">
            스킨셀렉트에는 예약·가격·진료시간 등 병원 실무 정보를 싣지
            않습니다. 병원 페이지는 공간과 장비를 둘러보는 갤러리입니다.
          </p>
          <p className="mt-5 text-[12.5px] text-ink-faint">
            © 2026 SkinSelect · 서비스 초안 v0.1 — 화면과 콘텐츠는 감수 전
            예시입니다
          </p>
        </div>
      </div>
    </footer>
  );
}
