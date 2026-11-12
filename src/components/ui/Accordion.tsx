import type { ReactNode } from "react";

import { PlusIcon } from "./icons";

/** Volet dépliable accessible (élément natif <details>). */
export function Accordion({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-line" open={defaultOpen}>
      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between gap-6 py-5 transition-colors hover:text-carmine [&::-webkit-details-marker]:hidden">
        {title}
        <PlusIcon size={14} className="shrink-0 transition-transform duration-500 group-open:rotate-45" />
      </summary>
      <div className="copy pb-6 text-stone">{children}</div>
    </details>
  );
}
