"use client";

import { useCallback, useRef, useState } from "react";

import { CloseIcon } from "@/components/ui/icons";
import type { SizeGuide } from "@/data/size-guide";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/format";

export function SizeGuideDialog({ guide, productName }: { guide: SizeGuide | undefined; productName: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useModal(open, close, ref);

  const hasMeasurements = guide?.measurements.some((row) => row.values.some((value) => value !== null)) ?? false;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="text-[0.5625rem] text-stone underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
      >
        Guide des tailles
      </button>

      <div className="overlay fixed inset-0 z-50" data-open={open} inert={!open}>
        <div
          className={cn("absolute inset-0 bg-ink/40 transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
          onClick={close}
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto bg-paper px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 transition-transform duration-700 ease-[var(--ease-couture)] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[min(640px,92vw)] sm:-translate-x-1/2 sm:px-10 sm:pb-10",
            open ? "translate-y-0 sm:-translate-y-1/2" : "translate-y-full sm:translate-y-[100vh]",
          )}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow text-stone">{productName}</p>
              <h2 id="size-guide-title" className="display mt-3 text-xl">
                Guide des tailles
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="-mr-3 -mt-1 grid h-11 w-11 shrink-0 place-items-center hover:text-carmine"
              aria-label="Fermer le guide des tailles"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          {guide ? (
            <>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left text-[0.625rem]">
                  <caption className="sr-only">Mesures de la pièce en centimètres, par taille</caption>
                  <thead>
                    <tr className="border-b border-ink">
                      <th scope="col" className="eyebrow py-3 pr-4 font-medium">
                        Mesure (cm)
                      </th>
                      {guide.sizes.map((size) => (
                        <th key={size} scope="col" className="eyebrow w-14 py-3 text-center font-medium">
                          {size}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.measurements.map((row) => (
                      <tr key={row.label} className="border-b border-line">
                        <th scope="row" className="py-4 pr-4 font-normal">
                          {row.label}
                          <span className="mt-1 block text-[0.5625rem] text-stone">{row.description}</span>
                        </th>
                        {row.values.map((value, index) => (
                          <td key={index} className="py-4 text-center tabular-nums text-stone">
                            {value ?? "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!hasMeasurements ? (
                <p className="mt-6 border-l border-carmine pl-4 copy text-stone">
                  Les mesures de la pièce seront communiquées prochainement.
                </p>
              ) : null}
              {guide.note ? <p className="prose-fadiye mt-6">{guide.note}</p> : null}
            </>
          ) : (
            <p className="prose-fadiye mt-8">Le guide des tailles de cette pièce sera communiqué prochainement.</p>
          )}
        </div>
      </div>
    </>
  );
}
