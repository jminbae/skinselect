import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export default function SectionHeading({
  eyebrow,
  title,
  moreHref,
  moreLabel = "더 보기",
}: {
  eyebrow?: string;
  title: string;
  moreHref?: string;
  moreLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-1.5 font-serif text-[22px] font-bold leading-tight text-ink md:text-[26px]">
          {title}
        </h2>
      </div>
      {moreHref && (
        <Link
          href={moreHref}
          className="group flex shrink-0 items-center gap-1 pb-0.5 text-[13.5px] font-medium text-ink-faint transition-colors hover:text-accent"
        >
          {moreLabel}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
