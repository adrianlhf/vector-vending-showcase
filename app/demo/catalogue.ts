/** Curated simulation, never machine inventory. Reviewed 17 November 2026. */
export type MachineId = "polar" | "uncle";
export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  source: string;
  review?: string;
  group?: string;
  supplierCode?: string;
  rangeEvidence?: string;
};
const polarSource = "https://polarpuffs-cakes.com/products/cakes/swiss-roll/";
const uncleSource = "https://uncleleeconfectionery.cococart.co/";
export type Machine = {
  id: MachineId;
  name: string;
  short: string;
  logo: string;
  photo: string;
  line: string;
  subtitle: string;
  number: string;
  products: Product[];
};
export const machines: Machine[] = [
  {
    id: "polar" as const,
    name: "Polar Puffs & Cakes",
    short: "Polar",
    logo: "polar-logo.webp",
    photo: "demo/polar-machine.webp",
    line: "A little slice of happiness.",
    subtitle:
      "Rolls, slices and little cakes. Discover the curated vending range.",
    number: "01",
    products: [
      {
        id: "pandan",
        group: "Slices",
        supplierCode: "FGSLC-0000123",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        name: "Pandan Swiss Roll Slice",
        image: "polar-pandan-swiss-roll-slice.webp",
        description:
          "A slice of Polar’s pandan Swiss roll, in the format listed in its vending selection.",
        source: polarSource,
      },
      {
        id: "strawberry",
        group: "Slices",
        supplierCode: "FGSLC-0000124",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        name: "Strawberry Swiss Roll Slice",
        image: "polar-strawberry-swiss-roll-slice.webp",
        description:
          "A strawberry Swiss roll slice from Polar’s supplied vending selection.",
        source: polarSource,
      },
      {
        id: "chocolate-roll",
        group: "Slices",
        supplierCode: "FGSLC-0000121",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        name: "Chocolate Swiss Roll Slice",
        image: "polar-chocolate-swiss-roll-slice.webp",
        description:
          "A slice of Polar’s chocolate Swiss roll. A little chocolate moment to discover.",
        source: polarSource,
      },

      {
        id: "chocolate-whole",
        name: "Chocolate Swiss Roll (Whole)",
        image: "polar-swiss-roll-chocolate.webp",
        group: "Whole rolls & blocks",
        supplierCode: "FGBLK-0000009",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Chocolate Swiss roll with chocolate buttercream, shown in its whole-roll format.",
        source: "https://polarpuffs-cakes.com/products/cakes/swiss-roll/",
      },
      {
        id: "pandan-whole",
        name: "Pandan Swiss Roll (Whole)",
        image: "polar-swiss-roll-pandan.webp",
        group: "Whole rolls & blocks",
        supplierCode: "FGBLK-0000011",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "A whole pandan Swiss roll with pandan buttercream. The familiar flavour, ready to explore.",
        source: "https://polarpuffs-cakes.com/products/cakes/swiss-roll/",
      },
      {
        id: "strawberry-whole",
        name: "Strawberry Swiss Roll (Whole)",
        image: "polar-swiss-roll-strawberry.webp",
        group: "Whole rolls & blocks",
        supplierCode: "FGBLK-0000012",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Strawberry Swiss roll with strawberry buttercream, shown as a whole roll.",
        source: "https://polarpuffs-cakes.com/products/cakes/swiss-roll/",
      },
      {
        id: "three-layer",
        name: "Three Layer Block Cake",
        image: "polar-three-layer-block-cake.webp",
        group: "Whole rolls & blocks",
        supplierCode: "FGBLK-0000014",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Pandan, strawberry and chocolate come together in one colourful block cake.",
        source: "https://polarpuffs-cakes.com/products/three-layer-sponge/",
      },
      {
        id: "butter-slice",
        name: "Butter Cake Slice",
        image: "polar-butter-slice.webp",
        group: "Slices",
        supplierCode: "FGSLC-0000007",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "A butter cake slice from Polar’s vending range. A simple little cake moment.",
        source: "https://polarpuffs-cakes.com/products/cakes/block-cakes/",
        review:
          "Official block-cake family cross-checked; exact slice recipe not independently confirmed.",
      },
      {
        id: "brownie",
        name: "Chocolate Brownie",
        image: "polar-brownie-slice.webp",
        group: "Slices",
        supplierCode: "FGSLC-0000213",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Polar’s chocolate brownie, shown in the slice format supplied for its vending range.",
        source: "https://polarpuffs-cakes.com/products/cakes/whole-cakes/",
        review:
          "Official Brownie cake family cross-checked; no whole-cake recipe details transferred to vending brownie.",
      },
      {
        id: "marble",
        name: "Marble Cake Slice",
        image: "polar-marble-slice.webp",
        group: "Slices",
        supplierCode: "FGSLC-0000026",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "A marble cake slice from Polar’s vending range. A classic to discover in a smaller format.",
        source:
          "https://polarpuffs-cakes.com/products/delightful-party-box-30-pcs/",
      },
      {
        id: "fruit",
        name: "Fruit Cake Slice",
        image: "polar-fruit-cake-slice.webp",
        group: "Slices",
        supplierCode: "FGSLC-0000021",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Polar’s fruit cake in the slice format listed in its vending selection.",
        source: "https://polarpuffs-cakes.com/products/cakes/block-cakes/",
        review:
          "Official block-cake family cross-checked; exact slice recipe not independently confirmed.",
      },
      {
        id: "orange-sugee",
        name: "Orange Sugee Slice",
        image: "polar-orange-sugee-slice.webp",
        group: "Slices",
        supplierCode: "FGSLC-0000051",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "An orange sugee cake slice from Polar’s supplied vending selection.",
        source: "https://polarpuffs-cakes.com/products/cakes/block-cakes/",
        review:
          "Official Orange Sugee Block cross-checked; exact slice recipe not independently confirmed.",
      },
      {
        id: "blackforest",
        name: "Blackforest Cake (Mini)",
        image: "polar-blackforest-cake-mini.webp",
        group: "Mini cakes",
        supplierCode: "FGWCK-0000001-MIN",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Polar’s Blackforest Cake in the mini format listed in its vending catalogue.",
        source: "https://polarpuffs-cakes.com/products/cakes/whole-cakes/",
        review:
          "Official Black Forest whole-cake family cross-checked. Mini-format recipe details are not independently confirmed.",
      },
      {
        id: "tiramisu",
        name: "Tiramisu Cake (Mini)",
        image: "polar-tiramisu-cake-mini.webp",
        group: "Mini cakes",
        supplierCode: "FGWCK-0000049-MIN",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "A little Tiramisu Cake from Polar’s supplied mini-cake vending selection.",
        source: "https://polarpuffs-cakes.com/products/tiramisu-3/",
        review:
          "Official Tiramisu family cross-checked. No whole-cake ingredient or recipe claims transferred to the mini format.",
      },
      {
        id: "chocolate-mousse",
        name: "Chocolate Mousse Cake (Mini)",
        image: "polar-chocolate-mousse-cake-mini.webp",
        group: "Mini cakes",
        supplierCode: "FGWCK-0000007-MIN",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Polar’s Chocolate Mousse Cake, shown in its mini vending-catalogue format.",
        source: "https://polarpuffs-cakes.com/products/cakes/whole-cakes/",
        review:
          "Official Chocolate Mousse family cross-checked. Mini-format recipe details are not independently confirmed.",
      },
      {
        id: "fairlady",
        name: "Fairlady Cake (Mini)",
        image: "polar-fairlady-cake-mini.webp",
        group: "Mini cakes",
        supplierCode: "FGWCK-0000019-MIN",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "A mini Fairlady Cake from Polar’s supplied vending selection. A little cake moment to discover.",
        source: "https://polarpuffs-cakes.com/products/fairlady-6/",
        review:
          "Official Fairlady family cross-checked. Whole-cake buttercream and coating claims are not assumed for this mini format.",
      },
      {
        id: "cheese",
        name: "Cheese Cake (Mini)",
        image: "polar-cheese-cake-mini.webp",
        group: "Mini cakes",
        supplierCode: "FGWCK-0000027-MIN",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Polar’s Cheese Cake in the mini format shown in its vending catalogue.",
        source: "https://polarpuffs-cakes.com/products/cakes/whole-cakes/",
        review:
          "Official Classic Cheese Cake family cross-checked; exact mini recipe/crust not independently confirmed.",
      },
      {
        id: "cookies-cream",
        name: "Cookies and Cream Cake (Mini)",
        image: "polar-cookie-and-cream-cake-mini.webp",
        group: "Mini cakes",
        supplierCode: "FGWCK-0000017-MIN",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "A mini Cookies and Cream Cake from Polar’s supplied vending range.",
        source: "https://polarpuffs-cakes.com/products/cakes/whole-cakes/",
        review:
          "Official Cookies & Cream family cross-checked; exact mini recipe and cookie brand not independently confirmed.",
      },
      {
        id: "cocoa-hazelnut",
        name: "Cocoa Hazelnut Cake (Mini)",
        image: "polar-coco-hazelnut-cake-mini.webp",
        group: "Mini cakes",
        supplierCode: "FGWCK-0000029-MIN",
        rangeEvidence: "Polar revised vending catalogue, 2 November 2026",
        description:
          "Polar’s Cocoa Hazelnut Cake, shown in the mini format listed for vending.",
        source: "https://polarpuffs-cakes.com/products/cakes/whole-cakes/",
        review:
          "Supplier filename uses Coco Hazelnut; revised catalogue says Cocoa Hazelnut. Official Cocoa Hazelnut Supreme family cross-checked; no mini recipe details inferred.",
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
        group: "Whole cakes",
        name: "Kaya Cake",
        image: "ulc-kaya.webp",
        description:
          "Kaya cake from Uncle Lee Confectionery. A nostalgic bake to discover, one virtual dispense at a time.",
        source: uncleSource,
      },
      {
        id: "peanut",
        group: "Whole cakes",
        name: "Peanut Cake",
        image: "ulc-peanut.webp",
        description: "Explore Uncle Lee’s peanut cake in this curated demo.",
        source: uncleSource,
        review:
          "Name and image retained from the existing supplied catalogue. Detailed recipe description pending official confirmation.",
      },
      {
        id: "chocolate",
        group: "Whole cakes",
        name: "Chocolate Cake",
        image: "ulc-chocolate.webp",
        description: "Explore Uncle Lee’s chocolate cake in this curated demo.",
        source: uncleSource,
        review:
          "Name and image retained from the existing supplied catalogue. Detailed recipe description pending official confirmation.",
      },
      {
        id: "yam",
        name: "Yam Cake",
        image: "demo/ulc-yam.webp",
        group: "Whole cakes",
        rangeEvidence:
          "Uncle Lee installation artwork: Yam; supplied For SMRT (Adeline) yam3.jpg",
        description:
          "Uncle Lee’s nostalgic Yam Cake. Discover this familiar cake in the virtual vending selection.",
        source: "https://uncleleeconfectionery.cococart.co/shop",
        review:
          "Name verified in official storefront; detailed recipe and machine-specific size not inferred.",
      },
    ] satisfies Product[],
  },
];
export const assetPath = (file: string) => "/assets/" + file;
