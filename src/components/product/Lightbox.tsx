"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/ui/icons";
import type { ProductImage } from "@/data/products";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/format";

type LightboxProps = {
  images: ProductImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/** Visionneuse plein écran : navigation clavier, zoom au clic qui suit le pointeur. */
export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  useModal(open, onClose, ref);

  const current = index ?? 0;
  const image = images[current];
  const go = (delta: number) => {
    setZoomed(false);
    onChange((current + delta + images.length) % images.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const track = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse de photographies"
      inert={!open}
      data-open={open}
      className={cn("overlay fixed inset-0 z-[60] flex flex-col bg-paper", open ? "opacity-100" : "opacity-0")}
    >
      <div className="container-fadiye flex h-16 shrink-0 items-center justify-between">
        <p className="text-[0.75rem] text-stone" aria-live="polite">
          <span className="eyebrow mr-3 text-ink tabular-nums">
            {current + 1} / {images.length}
          </span>
          {image?.caption}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="-mr-3 grid h-11 w-11 place-items-center hover:text-carmine"
          aria-label="Fermer la visionneuse"
        >
          <CloseIcon size={22} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        {open && image ? (
          <div className="flex h-full w-full items-center justify-center overflow-hidden px-4 pb-2 sm:px-24">
            <button
              type="button"
              onClick={() => setZoomed((value) => !value)}
              onPointerMove={zoomed ? track : undefined}
              className={cn("relative h-full w-full", zoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
              aria-label={zoomed ? "Réduire l'image" : "Zoomer sur l'image"}
            >
              {/* Agrandissement borné (×1,6 la taille native) pour ne jamais flouter un détail. */}
              <span
                className="absolute inset-0 m-auto block max-h-full max-w-full"
                style={{
                  aspectRatio: `${image.src.width} / ${image.src.height}`,
                  width: `min(100%, ${Math.round(image.src.width * 1.6)}px)`,
                  height: "auto",
                }}
              >
                <Image
                  key={current}
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  quality={90}
                  className="animate-fade object-contain transition-transform duration-500 [animation-duration:500ms] ease-[var(--ease-couture)]"
                  style={{ transform: zoomed ? "scale(2)" : "none", transformOrigin: origin }}
                />
              </span>
            </button>
          </div>
        ) : null}

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/90 transition-colors hover:bg-ink hover:text-white lg:left-8"
              aria-label="Photographie précédente"
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/90 transition-colors hover:bg-ink hover:text-white lg:right-8"
              aria-label="Photographie suivante"
            >
              <ArrowRightIcon />
            </button>
          </>
        ) : null}
      </div>

      <div className="no-scrollbar flex shrink-0 justify-start gap-3 overflow-x-auto px-5 py-4 sm:justify-center">
        {images.map((thumb, thumbIndex) => (
          <button
            key={thumbIndex}
            type="button"
            onClick={() => {
              setZoomed(false);
              onChange(thumbIndex);
            }}
            aria-label={`Afficher : ${thumb.caption}`}
            aria-current={thumbIndex === current ? "true" : undefined}
            className={cn(
              "relative h-16 w-[52px] shrink-0 overflow-hidden border transition-colors",
              thumbIndex === current ? "border-ink" : "border-transparent opacity-60 hover:opacity-100",
            )}
            style={{ backgroundColor: thumb.background }}
          >
            <Image src={thumb.src} alt="" fill sizes="52px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
