import { medicalDisclaimer } from "@/lib/site";

/** 공통 의학 고지문 박스 — 전 칼럼·답변 하단 (기획서 3-4 의무) */
export default function Disclaimer({ text }: { text?: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper-warm px-5 py-4">
      <p className="text-[13px] leading-relaxed text-ink-faint">
        <span className="mr-1.5 font-semibold text-ink-soft">의학 정보 고지</span>
        {text ?? medicalDisclaimer}
      </p>
    </div>
  );
}
