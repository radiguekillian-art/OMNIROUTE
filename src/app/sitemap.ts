import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { legalDocuments } from "@/content/legal";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/collection`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/nouveautes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/la-maison`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/produits/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
    images: product.images.map((image) => `${base}${image.src.src}`),
  }));

  const legalPages: MetadataRoute.Sitemap = Object.values(legalDocuments)
    .filter((doc) => !doc.draft)
    .map((doc) => ({ url: `${base}/${doc.slug}`, changeFrequency: "yearly", priority: 0.2 }));

  return [...pages, ...productPages, ...legalPages];
}
