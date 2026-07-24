export interface ProductReview {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  category: 'silk' | 'velvet' | 'accessories';
  categoryLabel: string;
  material: string;
  description: string;
  images: string[];
  colors: ProductColor[];
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1160,
    slug: "durag-warszawa",
    name: "Durag Warszawa",
    nameEn: "Durag Warszawa",
    price: 79.0,
    category: "silk",
    categoryLabel: "Czysty Jedwab Morwowy",
    material: "100% Jedwab Morwowy (19 Momme)",
    description: "Czarny jedwabny Durag Warszawa — flagowy model marki Warsaw Durag Store. Wykonany z naturalnego jedwabiu morwowego o gęstości 19 Momme, który gładko przylega do włosów, chroni strukturę fal i zapobiega utracie wilgoci podczas snu. Klasyczna czysta czerń o subtelnym połysku.",
    images: [
      "/assets/durag_silk_black.png",
      "/media/wds/att.mogDC6RrCftjHA9YjiKSvpu79xCgSnYrsr0NvgP4KSc.JPG"
    ],
    colors: [{ name: "Obsidian Black", hex: "#111111" }],
    reviews: [
      { author: "Kamil W.", rating: 5, comment: "Doskonała kompresja i niezrównana gładkość jedwabiu.", date: "14.05.2026" },
      { author: "Mateusz R.", rating: 5, comment: "Idealny na noc do 360 waves.", date: "02.06.2026" }
    ]
  },
  {
    id: 1335,
    slug: "durag-wroclaw",
    name: "Durag Wrocław",
    nameEn: "Durag Wrocław",
    price: 79.0,
    category: "silk",
    categoryLabel: "Czysty Jedwab Morwowy",
    material: "100% Jedwab Morwowy (19 Momme)",
    description: "Biały satynowo-jedwabny durag z kolekcji Silk Champagne / Pure White. Śliska struktura włókna minimalizuje tarcie włosów, utrzymując fale 360 w nienaruszonym stanie.",
    images: [
      "/assets/durag_silk_champagne.png",
      "/media/wds/att.f7ZkEXrCWT6P0MTghpoJIEuEtVPxba5iJLfrLHF0i0s.JPG"
    ],
    colors: [{ name: "Pure White", hex: "#FFFFFF" }],
    reviews: [
      { author: "Piotr S.", rating: 5, comment: "Bardzo lekki i delikatny dla skóry głowy.", date: "18.05.2026" }
    ]
  },
  {
    id: 1365,
    slug: "durag-lodz",
    name: "Durag Łódź",
    nameEn: "Durag Łódź",
    price: 79.0,
    category: "velvet",
    categoryLabel: "Luksusowy Aksamit",
    material: "Elastyczny Welwet Premium + Satynowa Podszewka",
    description: "Czarny welurowy Durag Łódź łączący mięsistość luksusowego aksamitu na zewnątrz z gładką satynową podszewką wewnątrz. Zapewnia optymalną kompresję i wyjątkowy wygląd streetwear.",
    images: [
      "/assets/durag_velvet_emerald.png",
      "/media/wds/att.psFLnn3qAA8FK_ajFfYIJMZwu0oEaaeVbAXMd3XQ_PE.JPG"
    ],
    colors: [{ name: "Deep Velvet Black", hex: "#0A0A0A" }],
    reviews: [
      { author: "Dawid K.", rating: 5, comment: "Super jakość weluru i wykończenie pasów.", date: "20.04.2026" }
    ]
  },
  {
    id: 1369,
    slug: "durag-krakow",
    name: "Durag Kraków",
    nameEn: "Durag Kraków",
    price: 79.0,
    category: "velvet",
    categoryLabel: "Luksusowy Aksamit",
    material: "Elastyczny Welwet Premium + Satynowa Podszewka",
    description: "Różowy Velvet Durag Kraków. Głęboka, nasycona faktura aksamitu i satynowe wnętrze dla optymalnej kompresji i unikalnego stylu ulicznej elegancji.",
    images: [
      "/assets/durag_velvet_royal.png",
      "/media/wds/att.tpMI2e3tJhZe5tpkf-DUNlr_51LUGoVa-6WzsaXVNGs.JPG"
    ],
    colors: [{ name: "Velvet Rose", hex: "#D87093" }],
    reviews: [
      { author: "Jakub M.", rating: 5, comment: "Świetny kolor i bardzo miękka podszewka.", date: "11.05.2026" }
    ]
  },
  {
    id: 1373,
    slug: "durag-szczecin",
    name: "Durag Szczecin",
    nameEn: "Durag Szczecin",
    price: 79.0,
    category: "velvet",
    categoryLabel: "Luksusowy Aksamit",
    material: "Elastyczny Welwet Premium",
    description: "Szary welurowy Durag Szczecin charakteryzujący się stonowanym, eleganckim odcieniem i aksamitnym wykończeniem. Wymiar uniwersalny z pasami o długości 100 cm.",
    images: [
      "/assets/durag_velvet_emerald.png"
    ],
    colors: [{ name: "Smoky Grey", hex: "#708090" }],
    reviews: [
      { author: "Adam B.", rating: 5, comment: "Doskonałe dopasowanie.", date: "09.06.2026" }
    ]
  },
  {
    id: 1374,
    slug: "durag-poznan",
    name: "Durag Poznań",
    nameEn: "Durag Poznań",
    price: 79.0,
    category: "velvet",
    categoryLabel: "Luksusowy Aksamit",
    material: "Elastyczny Welwet Premium",
    description: "Fioletowy welurowy Durag Poznań o barwnej energii i szlachetnym wykończeniu welwetowym. Trwale wspiera proces tworzenia fal.",
    images: [
      "/assets/durag_velvet_royal.png"
    ],
    colors: [{ name: "Velvet Purple", hex: "#4B0082" }],
    reviews: [
      { author: "Tomasz N.", rating: 5, comment: "Materiał i szycie na 10/10.", date: "28.05.2026" }
    ]
  },
  {
    id: 2313,
    slug: "durag-sosnowiec",
    name: "Durag Sosnowiec",
    nameEn: "Durag Sosnowiec",
    price: 79.0,
    category: "velvet",
    categoryLabel: "Luksusowy Aksamit",
    material: "Elastyczny Welwet Premium",
    description: "Szmaragdowy welur o głębokiej zieleni. Wyrazisty i elegancki akcent w stylu haute couture z zewnętrznymi szwami bezodciskowymi.",
    images: [
      "/assets/durag_velvet_emerald.png"
    ],
    colors: [{ name: "Emerald Green", hex: "#004B49" }],
    reviews: [
      { author: "Filip Z.", rating: 5, comment: "Kolor na żywo wygląda niesamowicie.", date: "15.06.2026" }
    ]
  },
  {
    id: 9901,
    slug: "szczotka-wave-brush-medium",
    name: "Szczotka Wave Brush Premium (Medium)",
    nameEn: "Premium Wave Brush Medium",
    price: 69.0,
    category: "accessories",
    categoryLabel: "Pielęgnacja & Akcesoria",
    material: "Drewno Bukowe + 100% Włosie Dzika",
    description: "Ergonomiczna szczotka do fal 360 waves wykonana z impregnowanego drewna bukowego i profilowanego naturalnego włosia dzika. Idealny stopień twardości (medium) do codziennej sesji brushingu.",
    images: [
      "/assets/durag_silk_black.png"
    ],
    colors: [{ name: "Natural Wood", hex: "#8B4513" }],
    reviews: [
      { author: "Wojciech C.", rating: 5, comment: "Niezbędnik każdego wavera. Bardzo wygodna rączka.", date: "19.06.2026" }
    ]
  }
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}
