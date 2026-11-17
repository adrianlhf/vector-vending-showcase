/** Curated simulation, never machine inventory. Reviewed 17 November 2026. */
export type MachineId = "polar" | "uncle";
export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  source: string;
  review?: string;
};
const polarSource = "https://polarpuffs-cakes.com/products/cakes/swiss-roll/";
const uncleSource = "https://uncleleeconfectionery.cococart.co/";
export const machines = [
  {
    id: "polar" as const,
    name: "Polar Puffs & Cakes",
    short: "Polar",
    logo: "polar-logo.webp",
    photo: "demo/polar-machine.webp",
    line: "A little slice of happiness.",
    subtitle: "Swiss rolls. Familiar flavours. A little everyday joy.",
    number: "01",
    products: [
      {
        id: "pandan",
        name: "Pandan Swiss Roll",
        image: "polar-pandan-swiss-roll-slice.webp",
        description:
          "Pandan sponge, rolled with pandan buttercream. A fragrant little pause in your day.",
        source: polarSource,
      },
      {
        id: "strawberry",
        name: "Strawberry Swiss Roll",
        image: "polar-strawberry-swiss-roll-slice.webp",
        description:
          "A strawberry Swiss roll with strawberry buttercream, shown here as a slice.",
        source: polarSource,
      },
      {
        id: "chocolate-roll",
        name: "Chocolate Swiss Roll",
        image: "polar-chocolate-swiss-roll-slice.webp",
        description:
          "Chocolate Swiss roll with a rich chocolate buttercream filling. A little chocolate moment.",
        source: polarSource,
      },
    ] satisfies Product[],
  },
  {
    id: "uncle" as const,
    name: "Uncle Lee Confectionery",
    short: "Uncle Lee",
    logo: "ulc-logo.webp",
    photo: "demo/uncle-machine.webp",
    line: "Old-school joy. One happy tap.",
    subtitle: "A familiar cake. A small moment to make your own.",
    number: "02",
    products: [
      {
        id: "kaya",
        name: "Kaya Cake",
        image: "ulc-kaya.webp",
        description:
          "Kaya cake from Uncle Lee Confectionery. A nostalgic bake to discover, one virtual dispense at a time.",
        source: uncleSource,
      },
      {
        id: "peanut",
        name: "Peanut Cake",
        image: "ulc-peanut.webp",
        description: "Explore Uncle Lee’s peanut cake in this curated demo.",
        source: uncleSource,
        review:
          "Name and image retained from the existing supplied catalogue. Detailed recipe description pending official confirmation.",
      },
      {
        id: "chocolate",
        name: "Chocolate Cake",
        image: "ulc-chocolate.webp",
        description: "Explore Uncle Lee’s chocolate cake in this curated demo.",
        source: uncleSource,
        review:
          "Name and image retained from the existing supplied catalogue. Detailed recipe description pending official confirmation.",
      },
    ] satisfies Product[],
  },
];
export const assetPath = (file: string) => "/assets/" + file;
