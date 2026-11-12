import Image from "next/image";

import logoBlack from "@/assets/images/brand/logo-fadiye-black.png";
import logoRed from "@/assets/images/brand/logo-fadiye-red.png";
import logoWhite from "@/assets/images/brand/logo-fadiye-white.png";
import { cn } from "@/lib/format";

const variants = { black: logoBlack, red: logoRed, white: logoWhite } as const;

type LogoProps = {
  /** Couleur de la calligraphie : le tracé original est conservé tel quel. */
  variant?: keyof typeof variants;
  className?: string;
  priority?: boolean;
  /** Largeurs d'affichage pour le chargement responsive. */
  sizes?: string;
};

/**
 * Logo calligraphique FADIYE. La largeur est pilotée par `className`
 * (ex. `w-36`), la hauteur suit le ratio d'origine : jamais de déformation.
 */
export function Logo({ variant = "black", className, priority, sizes = "200px" }: LogoProps) {
  return (
    <Image
      src={variants[variant]}
      alt="FADIYE"
      priority={priority}
      sizes={sizes}
      className={cn("h-auto select-none", className)}
      draggable={false}
    />
  );
}
