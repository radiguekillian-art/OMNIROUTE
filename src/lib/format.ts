import { commerce, pendingCopy } from "@/config/commerce";

const formatter = new Intl.NumberFormat(commerce.priceLocale, {
  style: "currency",
  currency: commerce.currency,
  minimumFractionDigits: 2,
});

/** Formate un montant en centimes. `null` → mention « prix communiqué prochainement ». */
export function formatPrice(cents: number | null): string {
  if (cents === null) return pendingCopy.price;
  return formatter.format(cents / 100);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
