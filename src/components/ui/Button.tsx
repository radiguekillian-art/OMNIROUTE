import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/format";

type Variant = "primary" | "outline" | "light";

const base =
  "group/button relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-6 text-center font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] sm:px-8 sm:tracking-[0.24em] transition-colors duration-500 ease-[var(--ease-couture)] disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-carmine focus-visible:bg-carmine",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-carmine hover:text-white",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode; arrow?: boolean };

export function ButtonLink({ variant = "primary", className, children, arrow, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; arrow?: boolean };

export function Button({ variant = "primary", className, children, arrow, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...props}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </button>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-px w-6 bg-current transition-[width] duration-500 ease-[var(--ease-couture)] group-hover/button:w-9"
    />
  );
}

/** Lien texte éditorial avec trait qui s'allonge au survol. */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group/text eyebrow inline-flex items-center gap-4 text-ink transition-colors hover:text-carmine",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="inline-block h-px w-8 bg-current transition-[width] duration-500 ease-[var(--ease-couture)] group-hover/text:w-14"
      />
    </Link>
  );
}
