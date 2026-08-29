export const museumCategories = [
  { id: "all", label: "Tutte" },
  { id: "walking", label: "Camminata" },
  { id: "running", label: "Corsa" },
  { id: "sprinting", label: "Sprint" },
  { id: "hit", label: "Caos" },
  { id: "collectibles", label: "Oggetti" },
  { id: "distance", label: "Distanza" },
  { id: "zones", label: "Luoghi" },
  { id: "porta", label: "Porta Susa" }
] as const;

export type MuseumCategoryId = (typeof museumCategories)[number]["id"];
