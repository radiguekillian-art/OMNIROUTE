import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/format";

type FigureProps = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  index?: string;
  sizes: string;
  /** Ratio du cadre (ex. "aspect-[4/5]"). Sans ratio, l'image garde ses proportions. */
  ratio?: string;
  background?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  tone?: "dark" | "light";
};

/** Photographie éditoriale avec légende numérotée. Chargement différé par défaut. */
export function Figure({
  src,
  alt,
  caption,
  index,
  sizes,
  ratio,
  background,
  className,
  imageClassName,
  priority,
  tone = "dark",
}: FigureProps) {
  return (
    <figure className={className}>
      <div className="overflow-hidden" style={{ backgroundColor: background }}>
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={cn("h-auto w-full", ratio && `${ratio} object-cover`, imageClassName)}
        />
      </div>
      {caption ? (
        <figcaption
          className={cn(
            "mt-4 flex items-baseline gap-4 text-[0.75rem] tracking-[0.04em]",
            tone === "dark" ? "text-stone" : "text-silver",
          )}
        >
          {index ? <span className="eyebrow text-carmine">{index}</span> : null}
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
