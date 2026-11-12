import type { ReactNode } from "react";

import { cn } from "@/lib/format";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

/** En-tête de page éditorial : surtitre, grand titre serif, chapeau. */
export function PageHeader({ eyebrow, title, intro, aside, className }: PageHeaderProps) {
  return (
    <header className={cn("container-fadiye pb-12 pt-14 lg:pb-20 lg:pt-24", className)}>
      {eyebrow ? (
        <p className="eyebrow animate-rise flex items-center gap-4 text-stone">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-carmine" />
          {eyebrow}
        </p>
      ) : null}
      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="display animate-rise text-[clamp(3.25rem,8vw,7.5rem)]" style={{ animationDelay: "100ms" }}>
          {title}
        </h1>
        {aside ? <div className="animate-rise lg:pb-4" style={{ animationDelay: "200ms" }}>{aside}</div> : null}
      </div>
      {intro ? (
        <div className="prose-fadiye animate-rise mt-8 max-w-xl text-[1rem]" style={{ animationDelay: "250ms" }}>
          {intro}
        </div>
      ) : null}
    </header>
  );
}
