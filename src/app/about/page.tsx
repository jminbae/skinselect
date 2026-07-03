import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "소개",
  description:
    "스킨셀렉트는 피부과 의사가 실명으로 직접 쓰는 검증된 피부 정보 매거진입니다. 모든 칼럼에 근거 출처를 답니다.",
};

const principles = [
  {
    title: "의사가 실명으로 씁니다",
    body: "모든 글의 저자는 의사 면허를 검증한 피부과 의사입니다. 익명의 조언, 출처 없는 정보, 광고성 후기는 이곳에 없습니다.",
  },
  {
    title: "모든 칼럼에 근거 출처",
    body: "학술 논문과 진료 가이드라인에 근거한 내용만 씁니다. 의사가 쓴 글이라도 근거가 없으면 발행하지 않습니다.",
  },
  {
    title: "광고와 정보를 분리합니다",
    body: "칼럼과 원장 페이지에는 예약 버튼이 없습니다. 병원 위치·진료시간 등 실무 정보는 '광고'로 표시된 지점 페이지에서만 안내합니다.",
  },
  {
    title: "묻고, 의사가 답합니다",
    body: "궁금한 것을 공개 질문 보드에 남기면 의사가 직접 답합니다. 좋은 질문은 한 편의 칼럼이 되어 같은 고민을 가진 모두에게 돌아갑니다.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* 브랜드 스테이트먼트 */}
      <section className="border-b border-line bg-paper-warm">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
          <Eyebrow>About SkinSelect</Eyebrow>
          <h1 className="mt-4 font-serif text-[32px] font-bold leading-[1.4] text-ink md:text-[44px]">
            피부에 대해 궁금하면,
            <br />
            광고가 아니라 <span className="text-accent">의사의 답</span>을
            읽는 곳
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-ink-soft">
            검색하면 광고가 먼저 나오는 시대에, 스킨셀렉트는 다른 약속을
            합니다. 피부과 의사 {site.doctorCount}명이 진료실에서 가장 많이
            받는 질문에 실명으로, 근거를 들어 답합니다.
          </p>
        </div>
      </section>

      {/* 원칙 4 */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="rounded-2xl bg-white p-7 shadow-card md:p-9"
            >
              <p className="font-serif text-[15px] font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-serif text-[21px] font-bold text-ink">
                {p.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 어떻게 만들어지는가 */}
      <section className="border-t border-line bg-paper-warm">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 font-serif text-[26px] font-bold text-ink md:text-[30px]">
            칼럼 한 편이 만들어지는 과정
          </h2>
          <ol className="mt-8 space-y-6">
            {[
              ["진료실의 질문에서 시작", "원장이 진료실에서 가장 자주 받는 질문, 독자가 질문 보드에 남긴 질문이 칼럼의 소재가 됩니다."],
              ["근거 확인", "논문과 진료 가이드라인을 대조해 사실을 확인하고, 출처를 답니다."],
              ["동료 의사의 감수", "필요한 경우 동료 전문의가 의학적 감수를 더하고, 감수자를 함께 표기합니다."],
              ["원장이 직접 발행을 승인", "최종 발행 승인은 저자인 의사 본인이 직접 합니다. 글의 책임이 저자에게 있다는 뜻입니다."],
              ["주기적 업데이트", "발행 후에도 6~12개월 주기로 다시 검토하고, 최종 검토일을 갱신합니다."],
            ].map(([t, b], i) => (
              <li key={t} className="flex gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-[15px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[16.5px] font-bold text-ink">{t}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
                    {b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8 md:py-24">
        <h2 className="font-serif text-[26px] font-bold text-ink">
          지금, 의사의 답을 읽어 보세요
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/columns"
            className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            칼럼 읽기
          </Link>
          <Link
            href="/doctors"
            className="rounded-full border border-line-strong px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
          >
            의사들 만나기
          </Link>
        </div>
      </section>
    </div>
  );
}
