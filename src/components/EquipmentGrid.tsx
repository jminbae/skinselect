"use client";

import Image from "next/image";
import { useState } from "react";
import type { Equipment } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";

const INITIAL = 4;

/** 장비 그리드 — 4개만 보여주고 '더 보기'로 전체 펼침 (akd-members 패턴) */
export default function EquipmentGrid({ items }: { items: Equipment[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, INITIAL);
  const hidden = items.length - INITIAL;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
        {visible.map((e) => {
          const cat = e.fieldSlugs[0] ? getCategory(e.fieldSlugs[0]) : undefined;
          return (
            <div
              key={e.name}
              className="overflow-hidden rounded-xl bg-paper shadow-card"
            >
              <div className="relative aspect-square bg-paper-warm">
                {e.image && (
                  <Image
                    src={e.image}
                    alt={`${e.name} 장비`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain p-5"
                  />
                )}
              </div>
              <div className="p-3.5">
                <p className="text-[13.5px] font-bold tracking-tight text-ink">
                  {e.name}
                </p>
                {cat && (
                  <span className="mt-1.5 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-semibold text-accent-deep">
                    {cat.name}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hidden > 0 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-2.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {expanded ? (
              <>
                접기
                <svg viewBox="0 0 12 12" className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M2 4.5l4 3.5 4-3.5" />
                </svg>
              </>
            ) : (
              <>
                장비 {hidden}개 더 보기
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M2 4.5l4 3.5 4-3.5" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
