import Link from "next/link";
import { site, medicalDisclaimer, navItems } from "@/lib/site";

const clinicLinks = [
  { href: "/clinics/gangnam", label: "강남점" },
  { href: "/clinics/suwon", label: "수원점" },
  { href: "/clinics/pangyo", label: "판교점" },
  { href: "/clinics/geondae", label: "건대점" },
  { href: "/clinics/daegu", label: "대구점" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-warm">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-xl font-bold text-ink">스킨셀렉트</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              {site.tagline}.
              <br />
              의사 면허를 검증한 피부과 의사 {site.doctorCount}명이 실명으로
              직접 쓰고, 모든 칼럼에 근거 출처를 답니다.
            </p>
          </div>
          <div className="flex gap-16">
            <nav aria-label="푸터 메뉴">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">
                Menu
              </p>
              <ul className="mt-4 space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] text-ink-soft transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="진료 병원">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">
                Clinics
              </p>
              <ul className="mt-4 space-y-2.5">
                {clinicLinks.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="text-[15px] text-ink-soft transition-colors hover:text-accent"
                    >
                      힐하우스 {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="text-[13px] leading-relaxed text-ink-faint">
            {medicalDisclaimer}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">
            스킨셀렉트의 칼럼·저자 페이지·질문 보드는 의료광고가 아닌 정보성
            콘텐츠입니다. 병원 위치·진료시간 등 실무 정보는 광고 영역으로
            표시된 지점 페이지에서만 제공합니다.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[13px] text-ink-faint">
              © 2026 SkinSelect. 서비스 초안(v0.1) — 화면·콘텐츠는 감수 전
              예시입니다.
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-faint">
              Written by verified dermatologists
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
