import Image from "next/image";

import logo from "@/assets/images/brand/logo-fadiye.png";
import { cn } from "@/lib/format";

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** Largeurs d'affichage pour le chargement responsive. */
  sizes?: string;
};

/**
 * Logo calligraphique FADIYE, dans son rouge d'origine.
 * La largeur est pilotée par `className` (ex. `w-36`), la hauteur suit
 * le ratio d'origine : jamais de déformation ni de recoloration.
 */
export function Logo({ className, priority, sizes = "200px" }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="FADIYE"
      priority={priority}
      sizes={sizes}
      className={cn("h-auto select-none", className)}
      draggable={false}
    />
  );
}
