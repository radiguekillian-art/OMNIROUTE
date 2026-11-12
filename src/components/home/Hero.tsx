import type { CSSProperties } from "react";

import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";

import { HeroVideo } from "./HeroVideo";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Hero plein écran : animation des lys et logo FADIYE dans son rouge d'origine. */
export function Hero() {
  const t = getDictionary().home.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-64px)] items-center justify-center overflow-hidden bg-white lg:min-h-[calc(100svh-76px)]"
    >
      <HeroVideo />
      {/* Voile lumineux : détache le logo rouge des fleurs sans masquer l'animation. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_58%_42%_at_50%_52%,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0)_100%)]"
      />

      <div className="relative z-10 flex flex-col items-center px-5 py-20 text-center">
        <h1 id="hero-title" className="sr-only">
          FADIYE — {t.title}
        </h1>
        <div className="animate-rise w-[min(820px,88vw)]" style={delay(150)}>
          <Logo className="w-full drop-shadow-[0_2px_24px_rgba(255,255,255,0.9)]" priority sizes="(min-width: 960px) 820px, 88vw" />
        </div>
        <p
          className="animate-rise mt-4 font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-normal tracking-normal text-ink"
          style={delay(400)}
        >
          {t.title}
        </p>
        <div className="animate-rise mt-10" style={delay(600)}>
          <ButtonLink href="#la-piece" arrow>
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
