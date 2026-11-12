"use client";

import { useEffect, useRef } from "react";

/**
 * Animation du hero (lys araignées), servie en vidéo MP4/WebM plutôt qu'en
 * GIF : environ dix fois plus légère et plus fluide. Avec
 * `prefers-reduced-motion`, la vidéo est remplacée par une image fixe.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (query.matches) video.pause();
      else void video.play().catch(() => undefined);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/hero-lys-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/media/hero-lys.webm" type="video/webm" />
        <source src="/media/hero-lys.mp4" type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element -- image fixe de repli, déjà optimisée */}
      <img
        src="/media/hero-lys-still.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
      />
    </>
  );
}
