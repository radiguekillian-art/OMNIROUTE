"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type ReactNode } from "react";

import { ZoomIcon } from "@/components/ui/icons";
import type { ProductImage } from "@/data/products";
import { cn } from "@/lib/format";

import { Lightbox } from "./Lightbox";

const isLandscape = (image: ProductImage) => image.src.width / image.src.height > 1.15;

type Row = { kind: "full"; index: number } | { kind: "pair"; indexes: [number, number] } | { kind: "single"; index: number };

/**
 * Mise en page éditoriale : la vue principale et les visuels horizontaux
 * en pleine largeur, les détails verticaux par paires. Un détail vertical
 * isolé est accompagné de sa légende plutôt qu'agrandi artificiellement.
 */
function buildRows(images: ProductImage[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  while (i < images.length) {
    if (i === 0 || isLandscape(images[i])) {
      rows.push({ kind: "full", index: i });
      i += 1;
    } else if (i + 1 < images.length && !isLandscape(images[i + 1])) {
      rows.push({ kind: "pair", indexes: [i, i + 1] });
      i += 2;
    } else {
      rows.push({ kind: "single", index: i });
      i += 1;
    }
  }
  return rows;
}

export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const rows = buildRows(images);

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setCurrent(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    track?.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  const tile = (index: number, sizes: string, frame?: string): ReactNode => {
    const image = images[index];
    return (
      <figure key={index} className="group/tile">
        <button
          type="button"
          onClick={() => setLightboxIndex(index)}
          className="relative block w-full cursor-zoom-in overflow-hidden"
          style={{ backgroundColor: image.background }}
          aria-label={`Agrandir : ${image.caption}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            priority={index === 0}
            placeholder="blur"
            sizes={sizes}
            className={cn(
              "h-auto w-full transition-transform duration-[1200ms] ease-[var(--ease-couture)] group-hover/tile:scale-[1.015]",
              frame,
            )}
          />
          <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center bg-white/90 text-ink opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100">
            <ZoomIcon size={18} />
          </span>
        </button>
        <figcaption className="mt-3 flex gap-4 text-[0.5625rem] text-stone">
          <span className="eyebrow text-carmine">{String(index + 1).padStart(2, "0")}</span>
          {image.caption}
        </figcaption>
      </figure>
    );
  };

  return (
    <>
      {/* Mobile & tablette : carrousel tactile */}
      <div className="lg:hidden">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto sm:-mx-8"
          role="region"
          aria-roledescription="carrousel"
          aria-label={`Photographies — ${productName}`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full shrink-0 snap-center"
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${index + 1} sur ${images.length} : ${image.caption}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="relative block aspect-[4/5] w-full max-h-[78svh]"
                style={{ backgroundColor: image.background }}
                aria-label={`Agrandir : ${image.caption}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  sizes="100vw"
                  className={isLandscape(image) ? "object-contain" : "object-cover"}
                />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[0.5625rem] text-stone">
            <span className="eyebrow mr-3 text-ink tabular-nums">
              {current + 1} / {images.length}
            </span>
            {images[current]?.caption}
          </p>
          <div className="flex gap-2" aria-label="Choisir une photographie">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Photographie ${index + 1} : ${image.caption}`}
                aria-current={current === index ? "true" : undefined}
                className="grid h-6 w-4 place-items-center"
              >
                <span
                  className={cn(
                    "block h-px transition-all duration-500",
                    current === index ? "w-4 bg-ink" : "w-2 bg-silver",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ordinateur : mosaïque éditoriale */}
      <div className="hidden space-y-8 lg:block">
        {rows.map((row, rowIndex) => {
          if (row.kind === "full") return <div key={rowIndex}>{tile(row.index, "(min-width: 1520px) 860px, 56vw")}</div>;
          if (row.kind === "pair")
            return (
              <div key={rowIndex} className="grid grid-cols-2 gap-8">
                {row.indexes.map((index) => tile(index, "(min-width: 1520px) 420px, 28vw", "aspect-[4/5] object-cover"))}
              </div>
            );
          return (
            <div key={rowIndex} className="grid grid-cols-2 items-end gap-8">
              {tile(row.index, "(min-width: 1520px) 420px, 28vw", "aspect-[4/5] object-cover")}
              <p className="prose-fadiye max-w-xs pb-10 text-[1.75rem] leading-[1.2]">
                Chaque détail participe à l’identité de la pièce.
              </p>
            </div>
          );
        })}
      </div>

      <Lightbox images={images} index={lightboxIndex} onClose={closeLightbox} onChange={setLightboxIndex} />
    </>
  );
}
