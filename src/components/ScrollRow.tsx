/**
 * peek 가로 스크롤 행 — 다음 카드가 살짝 보이는 레이아웃.
 * 자식에 shrink-0 + 폭(w-[72%] 등)을 지정해 사용한다.
 */
export default function ScrollRow({
  children,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div
      className={`scroll-row -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-0 md:px-0 ${className}`}
      role="list"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
