import Link from "next/link";

/** 자격 배지 — 이원화 체계 (검증 데이터 기반) */
export function DoctorBadge({
  badge,
  size = "sm",
}: {
  badge: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-accent font-semibold text-white ${
        size === "md" ? "px-3 py-1 text-[13px]" : "px-2.5 py-0.5 text-[11px]"
      }`}
    >
      <svg
        viewBox="0 0 12 12"
        className={size === "md" ? "h-3 w-3" : "h-2.5 w-2.5"}
        fill="currentColor"
        aria-hidden
      >
        <path d="M6 0l1.5 1.9 2.3-.5.3 2.3 2.2.9-1.2 2 1.2 2-2.2.9-.3 2.3-2.3-.5L6 12l-1.5-1.9-2.3.5-.3-2.3-2.2-.9 1.2-2-1.2-2 2.2-.9.3-2.3 2.3.5L6 0z" />
        <path d="M5.4 7.9L3.6 6.1l.8-.8 1 1 2.2-2.2.8.8-3 3z" fill="#1c5951" />
      </svg>
      {badge}
    </span>
  );
}

/** 카테고리·태그 칩 */
export function Chip({
  label,
  href,
  active = false,
}: {
  label: string;
  href?: string;
  active?: boolean;
}) {
  const cls = `inline-flex shrink-0 items-center rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
    active
      ? "border-ink bg-ink text-paper"
      : "border-line-strong bg-transparent text-ink-soft hover:border-ink hover:text-ink"
  }`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {label}
      </Link>
    );
  }
  return <span className={cls}>{label}</span>;
}

/** 섹션 아이브로 (작은 대문자 라벨) */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
      {children}
    </p>
  );
}

/** '광고' 라벨 배지 — 지점 페이지 최상단 상수 */
export function AdLabel({ reviewNo }: { reviewNo?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center rounded-sm border border-ink-faint px-2 py-0.5 text-[11px] font-bold tracking-widest text-ink-faint">
        광고
      </span>
      {reviewNo && (
        <span className="text-[11px] text-ink-faint">
          의료광고 심의필 {reviewNo}
        </span>
      )}
    </div>
  );
}

/** 반응 지표 (도움됐어요 · 저장 · 질문) — 미니 */
export function Reactions({
  helpful,
  questions,
}: {
  helpful: number;
  questions?: number;
}) {
  return (
    <span className="flex items-center gap-3 text-[12.5px] text-ink-faint">
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M8 14s-5.5-3.3-5.5-7.2C2.5 4.6 4 3 5.9 3c1 0 1.7.4 2.1 1 .4-.6 1.1-1 2.1-1 1.9 0 3.4 1.6 3.4 3.8C13.5 10.7 8 14 8 14z" />
        </svg>
        도움됐어요 {helpful.toLocaleString()}
      </span>
      {questions !== undefined && questions > 0 && (
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <path d="M14 8c0 3-2.7 5.5-6 5.5-.8 0-1.6-.1-2.3-.4L2 14l1-3.2C2.4 10 2 9 2 8c0-3 2.7-5.5 6-5.5S14 5 14 8z" />
          </svg>
          질문 {questions}
        </span>
      )}
    </span>
  );
}
