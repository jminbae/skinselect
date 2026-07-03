import Link from "next/link";

/** 자격 배지 — 이원화 체계 (검증 데이터 기반). 미니멀: 채움 없는 체크 + 텍스트 */
export function DoctorBadge({
  badge,
  size = "sm",
}: {
  badge: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold text-accent ${
        size === "md" ? "text-[13px]" : "text-[11.5px]"
      }`}
    >
      <svg
        viewBox="0 0 12 12"
        className={size === "md" ? "h-3.5 w-3.5" : "h-3 w-3"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden
      >
        <circle cx="6" cy="6" r="5" />
        <path d="M3.8 6.2l1.5 1.5 2.9-3.2" />
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
  const base = "inline-flex shrink-0 items-center rounded-full border px-3.5 py-1.5 text-[13px] font-medium";
  if (href) {
    return (
      <Link
        href={href}
        className={`${base} transition-colors ${
          active
            ? "border-ink bg-ink text-paper"
            : "border-line-strong bg-transparent text-ink-soft hover:border-ink hover:text-ink"
        }`}
      >
        {label}
      </Link>
    );
  }
  return (
    <span
      className={`${base} ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-line-strong bg-transparent text-ink-soft"
      }`}
    >
      {label}
    </span>
  );
}

/** 섹션 아이브로 (작은 대문자 라벨) */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
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
