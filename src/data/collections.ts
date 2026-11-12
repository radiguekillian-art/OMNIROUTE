export const collections = {
  "collection-01": {
    id: "collection-01",
    number: "01",
    title: "Collection 01",
    season: "Automne / Hiver",
  },
} as const;

export type CollectionId = keyof typeof collections;
