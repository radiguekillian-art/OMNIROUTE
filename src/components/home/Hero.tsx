import Image from "next/image";
import type { CSSProperties } from "react";

import heroImage from "@/assets/images/ambiance/hero-oeillet.jpg";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { heroMedia } from "@/config/site";
import { getDictionary } from "@/i18n";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * Hero : le visuel d'ambiance est affiché dans son format d'origine (16:9),
 * sans recadrage. Sur ordinateur, le logo se pose sur la partie claire de
 * l'image ; sur mobile, il passe sous l'image pour ne rien masquer.
 */
export function Hero() {
  const t = getDictionary().home.hero;

  const content = (
    <>
      <div className="animate-rise w-[min(560px,82vw)] lg:w-full" style={delay(150)}>
        <Logo className="w-full" priority sizes="(min-width: 1024px) 30vw, 82vw" />
      </div>
      <p className="animate-rise mt-3 text-[clamp(1.75rem,2.6vw,2.75rem)] leading-tight text-ink" style={delay(400)}>
        {t.title}
      </p>
      <div className="animate-rise mt-8 lg:mt-10" style={delay(600)}>
        <ButtonLink href="#la-piece" arrow>
          {t.cta}
        </ButtonLink>
      </div>
    </>
  );

  return (
    <section aria-labelledby="hero-title" className="relative" style={{ backgroundColor: heroMedia.edgeColor }}>
      <h1 id="hero-title" className="sr-only">
        FADIYE — {t.title}
      </h1>
      <div className="relative mx-auto aspect-video w-full lg:w-[min(100%,calc((100svh-76px)*16/9))]">
        {heroMedia.video ? (
          <video
            className="absolute inset-0 h-full w-full object-contain motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage.src}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={heroMedia.video.webmSmall} type="video/webm" media="(max-width: 1023px)" />
            <source src={heroMedia.video.mp4Small} type="video/mp4" media="(max-width: 1023px)" />
            <source src={heroMedia.video.webm} type="video/webm" />
            <source src={heroMedia.video.mp4} type="video/mp4" />
          </video>
        ) : null}
        <Image
          src={heroImage}
          alt=""
          aria-hidden="true"
          // Avec la vidéo, l'image ne sert qu'aux visiteurs qui désactivent les animations :
          // elle n'est alors chargée que si elle s'affiche.
          priority={!heroMedia.video}
          loading={heroMedia.video ? "lazy" : undefined}
          fill
          quality={90}
          placeholder="blur"
          sizes="100vw"
          className={heroMedia.video ? "hidden object-contain motion-reduce:block" : "animate-fade object-contain"}
        />

        {/* Ordinateur : contenu posé sur la partie claire, à gauche des fleurs (qui commencent vers 38 %). */}
        <div className="absolute inset-y-0 left-[5%] hidden w-[30%] flex-col items-start justify-center lg:flex">{content}</div>
      </div>

      {/* Mobile et tablette : contenu sous l'image. */}
      <div className="flex flex-col items-center bg-white px-5 pb-14 pt-10 text-center lg:hidden">{content}</div>
    </section>
  );
}
