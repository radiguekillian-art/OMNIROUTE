import "server-only";

/**
 * Prestataire de paiement. Stripe Checkout est branché via son API REST
 * (aucune dépendance). Sans `STRIPE_SECRET_KEY`, le paiement est
 * considéré comme NON ACTIVÉ et aucune commande ne peut être passée.
 *
 * Pour intégrer un autre prestataire, implémentez les deux fonctions
 * ci-dessous avec la même signature.
 */
const STRIPE_API = "https://api.stripe.com/v1";

export function isPaymentConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export type CheckoutLine = {
  name: string;
  description: string;
  unitAmount: number;
  quantity: number;
  imageUrl: string | null;
  metadata: Record<string, string>;
};

type CreateSessionInput = {
  lines: CheckoutLine[];
  currency: string;
  successUrl: string;
  cancelUrl: string;
  allowedCountries: string[];
};

async function stripeRequest<T>(path: string, init?: { method?: string; body?: URLSearchParams }): Promise<T> {
  const response = await fetch(`${STRIPE_API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: init?.body,
    cache: "no-store",
  });
  const data = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) throw new Error(data.error?.message ?? `Erreur Stripe (${response.status})`);
  return data;
}

export async function createCheckoutSession(input: CreateSessionInput): Promise<{ url: string }> {
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", input.successUrl);
  params.set("cancel_url", input.cancelUrl);
  params.set("locale", "fr");
  params.set("billing_address_collection", "required");
  input.allowedCountries.forEach((country, i) => params.set(`shipping_address_collection[allowed_countries][${i}]`, country));

  input.lines.forEach((line, i) => {
    const prefix = `line_items[${i}]`;
    params.set(`${prefix}[quantity]`, String(line.quantity));
    params.set(`${prefix}[price_data][currency]`, input.currency.toLowerCase());
    params.set(`${prefix}[price_data][unit_amount]`, String(line.unitAmount));
    params.set(`${prefix}[price_data][product_data][name]`, line.name);
    params.set(`${prefix}[price_data][product_data][description]`, line.description);
    if (line.imageUrl) params.set(`${prefix}[price_data][product_data][images][0]`, line.imageUrl);
    Object.entries(line.metadata).forEach(([key, value]) =>
      params.set(`${prefix}[price_data][product_data][metadata][${key}]`, value),
    );
  });

  const session = await stripeRequest<{ url: string | null }>("/checkout/sessions", { method: "POST", body: params });
  if (!session.url) throw new Error("Session de paiement invalide.");
  return { url: session.url };
}

/** Vérifie côté serveur qu'une session a réellement été payée. */
export async function getCheckoutSessionStatus(sessionId: string): Promise<{ paid: boolean; email: string | null }> {
  const session = await stripeRequest<{ payment_status: string; customer_details?: { email?: string | null } }>(
    `/checkout/sessions/${encodeURIComponent(sessionId)}`,
  );
  return { paid: session.payment_status === "paid", email: session.customer_details?.email ?? null };
}
