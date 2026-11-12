import type { ReactNode } from "react";

import { cn } from "@/lib/format";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  as?: "h1" | "h2" | "h3";
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  id?: string;
};

/** Surtitre en capitales espacées + titre serif éditorial. */
export function SectionHeading({
  eyebrow,
  title,
  as: Tag = "h2",
  tone = "dark",
  className,
  titleClassName,
  id,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className={cn("eyebrow flex items-center gap-4", tone === "dark" ? "text-stone" : "text-silver")}>
          <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={cn(
          "display mt-6 text-[clamp(2.5rem,5.4vw,5rem)]",
          tone === "light" ? "text-white" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </Tag>
    </div>
  );
}
