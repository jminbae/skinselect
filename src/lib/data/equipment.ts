import type { Equipment } from "@/lib/types";

/**
 * ⚠ 스텁 데이터 — 사진 큐레이션 결과에 따라 채움.
 * "이 장비로 무엇을 하는가" 1~2문장 — 효능 보장 표현(개선·완치·최고) 금지.
 */
export const equipment: Equipment[] = [];

export function equipmentByBranch(branch: string) {
  return equipment.filter((e) => e.branches.includes(branch as never));
}
