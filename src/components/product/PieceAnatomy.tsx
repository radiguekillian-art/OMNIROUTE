"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductImage } from "@/data/products";
import { cn } from "@/lib/format";

/** Points de détail positionnés en % sur le packshot de face (non recadré). */
const points = [
  { id: "broderie", label: "Broderie calligraphique rouge", x: 64, y: 48 },
  { id: "fermoirs", label: "Deux fermoirs métalliques argentés", x: 47, y: 40.5 },
  { id: "boutons", label: "Boutons signature au lys en relief", x: 49, y: 61.2 },
  { id: "col", label: "Col rond côtelé", x: 57.5, y: 24.5 },
  { id: "cotes", label: "Poignets et bas côtelés", x: 29, y: 74 },
];

/**
 * Anatomie de la pièce : la photographie principale annotée de ses détails.
 * Survoler (ou focaliser) une légende met le point correspondant en évidence.
 */
export function PieceAnatomy({ image, tone = "light" }: { image: ProductImage; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end lg:gap-12">
      <div className="relative" style={{ backgroundColor: image.background }}>
        <Image
          src={image.src}
          alt={image.alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="h-auto w-full"
        />
        {points.map((point, index) => (
          <span
            key={point.id}
            aria-hidden="true"
            className={cn(
              "absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-sans text-[0.625rem] tabular-nums transition-all duration-500 ease-[var(--ease-couture)]",
              active === point.id
                ? "scale-125 border-carmine bg-carmine text-white"
                : "border-white/80 bg-ink/55 text-white backdrop-blur-sm",
            )}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <ol className={cn("space-y-0 border-t", dark ? "border-line-dark" : "border-line")}>
        {points.map((point, index) => (
          <li key={point.id}>
            <p
              tabIndex={0}
              onMouseEnter={() => setActive(point.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(point.id)}
              onBlur={() => setActive(null)}
              className={cn(
                "flex cursor-default items-baseline gap-4 border-b py-4 text-[1.1875rem] outline-none transition-colors",
                dark ? "border-line-dark" : "border-line",
                active === point.id ? (dark ? "text-white" : "text-ink") : dark ? "text-silver" : "text-stone",
              )}
            >
              <span className="eyebrow w-5 text-carmine">{String(index + 1).padStart(2, "0")}</span>
              {point.label}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
