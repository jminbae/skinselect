import type { Column } from "@/lib/types";

/**
 * ⚠ 스텁 데이터 — 콘텐츠 에이전트가 상세기획서 F-1 템플릿·F-3 주제 맵에 따라
 * 예시 칼럼 12편 이상으로 교체할 것. (감수 전 예시 콘텐츠)
 */
export const columns: Column[] = [];

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
