import type { Column } from "@/lib/types";
import { columnsPart1 } from "./columns-part1";
import { columnsPart2 } from "./columns-part2";
import { columnsPart3 } from "./columns-part3";

/**
 * 예시 칼럼 15편 — 시술·안티에이징 매거진 (2026-07-04 전환).
 * ⚠ 감수 전 예시 콘텐츠. 파트 파일 3개로 분할 관리:
 *  part1 리모델링3 + 리프팅3 / part2 토닝3 + 스킨부스팅2 / part3 볼류마이징2 + 스무딩2
 */
export const columns: Column[] = [
  ...columnsPart1,
  ...columnsPart2,
  ...columnsPart3,
];

export function getColumn(slug: string) {
  return columns.find((c) => c.slug === slug);
}

export function columnsByAuthor(authorSlug: string) {
  return columns.filter((c) => c.authorSlug === authorSlug);
}

export function columnsByCategory(category: string) {
  return columns.filter((c) => c.category === category);
}

/** 관련 글 — 같은 카테고리 우선, 부족하면 같은 저자 글로 채움 (자기 제외) */
export function relatedColumns(column: Column, count = 4) {
  const pool = columns.filter((c) => c.slug !== column.slug);
  const sameCat = pool.filter((c) => c.category === column.category);
  const sameAuthor = pool.filter(
    (c) => c.authorSlug === column.authorSlug && c.category !== column.category,
  );
  return [...sameCat, ...sameAuthor].slice(0, count);
}
