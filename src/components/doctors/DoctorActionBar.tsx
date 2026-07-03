import Link from "next/link";
import type { BranchSlug } from "@/lib/types";

/**
 * DOC-01 하단 고정 바 — 모바일: 2버튼 고정 바, 데스크탑: 우측 하단 플로팅 카드.
 * 라벨은 "안내"로 고정 (예약·상담·문의 등 유인성 단어 금지 — 의료법 컴플라이언스).
 */
export default function DoctorActionBar({
  name,
  branch,
  branchLabel,
}: {
  name: string;
  branch: BranchSlug;
  branchLabel: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-md md:inset-x-auto md:bottom-8 md:right-8 md:w-[290px] md:rounded-2xl md:border md:border-line md:bg-white/95 md:p-5 md:shadow-card-hover">
      <p className="mb-3 hidden text-[13.5px] font-semibold leading-snug text-ink-soft md:block">
        {name} 원장에게 궁금한 점이 있나요?
      </p>
      <div className="flex gap-2.5 md:flex-col">
        <Link
          href="/community"
          className="flex-1 rounded-full bg-accent px-4 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          질문하기
        </Link>
        <Link
          href={`/clinics/${branch}`}
          className="flex-1 rounded-full border border-line-strong bg-transparent px-4 py-3 text-center text-[15px] font-semibold text-ink transition-colors hover:border-ink"
          aria-label={`힐하우스 ${branchLabel} 안내 보기`}
        >
          진료 병원 안내 →
        </Link>
      </div>
    </div>
  );
}
