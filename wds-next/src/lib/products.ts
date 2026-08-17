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
  category: 'silk' | 'satin' | 'velvet' | 'seasonal' | 'accessories';
  categoryLabel: string;
  material: string;
  description: string;
  storyDescription?: string;
  images: string[];
  colors: ProductColor[];
  reviews: ProductReview[];
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  all: "Kompletna kolekcja ręcznie szytych duragów w Warszawie — z czystego jedwabiu, satyny, weluru oraz materiałów sezonowych.",
  silk: "Luksusowy jedwab morwowy 19 Momme zapewniający najwyższą gładkość, ochronę i delikatną pielęgnację włosów.",
  satin: "Gładka satyna poliestrowa łącząca trwałość, komfort noszenia i idealny połysk na co dzień.",
  velvet: "Mięsisty, luksusowy welur o głębokiej strukturze i eleganckim wyglądzie.",
  seasonal: "Wyjątkowe tkaniny takie jak cupro, len i krepa satynowa dopasowane do zmieniających się pór roku.",
  accessories: "Szczotki wave brush, wave capy i niezbędne akcesoria do pielęgnacji fal 360 waves."
};

export const PRODUCTS: Product[] = [
  {
    id: 1160,
    slug: "durag-milanowek",
    name: "Durag Milanówek — Jedwabny",
    nameEn: "Durag Milanówek Silk",
    price: 149.0,
    category: "silk",
    categoryLabel: "Czysty Jedwab Morwowy",
    material: "100% Jedwab Morwowy (19 Momme)",
    description: "Hołd dla legendarnej, polskiej stolicy jedwabnictwa i przedwojennej elegancji. Wykonany z najwyższej klasy naturalnego jedwabiu morwowego — luksusowo gładkiego, hipoalergicznego i ultralekkiego. Genialnie oddycha, redukuje tarcie do zera i oferuje prestiżowy, czysty minimalizm w wersji czarnej lub białej. Bo styl rodzi się na głowie.",
    storyDescription: "Milanówek. Legendarna, polska stolica jedwabnictwa i przedwojenna elegancja. Najwyższej klasy naturalny jedwab – luksusowo gładki, prestiżowy minimalizm.",
    images: [
      "/assets/durag_silk_black.png",
      "/assets/durag_silk_champagne.png"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    reviews: [
      { author: "Kamil W.", rating: 5, comment: "Jedyny prawdziwy jedwab w Polsce. Niesamowita gładkość.", date: "14.05.2026" },
      { author: "Mateusz R.", rating: 5, comment: "Idealny na noc, zero puszenia włosów.", date: "02.06.2026" }
    ]
  },
  {
    id: 1335,
    slug: "durag-wroclaw",
    name: "Durag Wrocław — Biała Satyna",
    nameEn: "Durag Wrocław White Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Gładka Satyna Poliestrowa",
    description: "Inspirowany architektoniczną lekkością i jasną, otwartą przestrzenią miasta mostów. Śnieżnobiała satyna o płynnym kształcie i czystej formie. Śliska struktura włókna minimalizuje tarcie włosów, pomagając utrzymać fale 360 w nienaruszonym stanie.",
    storyDescription: "Wrocław. Inspirowany architektoniczną lekkością i jasną, otwartą przestrzenią miasta mostów. Śnieżnobiała satyna o płynnym kształcie i czystej formie.",
    images: [
      "/assets/durag_silk_champagne.png"
    ],
    colors: [{ name: "Pure White", hex: "#FFFFFF" }],
    reviews: [
      { author: "Piotr S.", rating: 5, comment: "Bardzo lekki i świetnie leży.", date: "18.05.2026" }
    ]
  },
  {
    id: 1365,
    slug: "durag-lodz",
    name: "Durag Łódź — Czarny Welur",
    nameEn: "Durag Łódź Black Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Łódź. Surowy, postindustrialny charakter i głębokie tradycje tekstylne przełożone na mięsisty welur w odcieniu absolutnej czerni. Teksturowany minimalizm, który nie potrzebuje słów. Głęboka czerni z aksamitnym finiszem zapewnia niesamowite wrażenia dotykowe i komfort.",
    storyDescription: "Łódź. Surowy, postindustrialny charakter i głębokie tradycje tekstylne przełożone na mięsisty welur w odcieniu absolutnej czerni.",
    images: [
      "/assets/durag_velvet_emerald.png"
    ],
    colors: [{ name: "Deep Black", hex: "#0A0A0A" }],
    reviews: [
      { author: "Dawid K.", rating: 5, comment: "Super jakość weluru!", date: "20.04.2026" }
    ]
  },
  {
    id: 1366,
    slug: "durag-bialystok",
    name: "Durag Białystok — Brązowy Welur",
    nameEn: "Durag Białystok Brown Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Białystok. Odzwierciedlenie dzikiej natury i głębokich, leśnych barw Podlasia. Ciepły, czekoladowy welur o szlachetnym, organicznym wyrazie. Wyjątkowo gęsty i otulający materiał, który wyróżnia się w każdej codziennej stylizacji.",
    storyDescription: "Białystok. Odzwierciedlenie dzikiej natury i głębokich, leśnych barw Podlasia. Ciepły, czekoladowy welur o szlachetnym wyrazie.",
    images: [
      "/assets/durag_velvet_emerald.png"
    ],
    colors: [{ name: "Forest Brown", hex: "#4A2E1B" }],
    reviews: [
      { author: "Marek K.", rating: 5, comment: "Ciepły, głęboki odcień brązu.", date: "10.05.2026" }
    ]
  },
  {
    id: 1367,
    slug: "durag-zyrardow",
    name: "Durag Żyrardów — Przewiewny Len",
    nameEn: "Durag Żyrardów Linen",
    price: 99.0,
    category: "seasonal",
    categoryLabel: "Sezonowe Materiały",
    material: "Naturalny Przewiewny Len",
    description: "Żyrardów. Ukłon w stronę historycznej stolicy polskiego lnu i rzemiosła. Naturalna, oddychająca struktura tkaniny zapewniająca bezkompromisową, surową lekkość. Dostępny w klasycznej czerni i czystej bieli — idealny wybór na cieplejsze dni.",
    storyDescription: "Żyrardów. Ukłon w stronę historycznej stolicy polskiego lnu i rzemiosła. Naturalna, oddychająca struktura tkaniny.",
    images: [
      "/assets/durag_silk_champagne.png"
    ],
    colors: [
      { name: "Linen Black", hex: "#1A1A1A" },
      { name: "Linen White", hex: "#F5F5F0" }
    ],
    reviews: [
      { author: "Jan D.", rating: 5, comment: "Świetny przewiewny materiał na lato.", date: "01.06.2026" }
    ]
  },
  {
    id: 1368,
    slug: "durag-stalowa-wola",
    name: "Durag Stalowa Wola — Krepa Mirella",
    nameEn: "Durag Stalowa Wola Satin Crepe",
    price: 99.0,
    category: "seasonal",
    categoryLabel: "Sezonowe Materiały",
    material: "Krepa Satynowa Mirella",
    description: "Stalowa Wola. Stworzony na cześć miasta o silnych, modernistycznych korzeniach i geometrycznej strukturze. Krepa satynowa łącząca mat z technicznym połyskiem. Posiada mocniejszą strukturę, która stabilnie układa się na głowie.",
    storyDescription: "Stalowa Wola. Stworzony na cześć miasta o silnych, modernistycznych korzeniach. Krepa satynowa łącząca mat z technicznym połyskiem.",
    images: [
      "/assets/durag_silk_black.png"
    ],
    colors: [
      { name: "Mirella Black", hex: "#0F0F0F" },
      { name: "Mirella White", hex: "#FFFFFF" }
    ],
    reviews: [
      { author: "Krzysztof O.", rating: 5, comment: "Bardzo ciekawa struktura materiału.", date: "12.05.2026" }
    ]
  },
  {
    id: 1369,
    slug: "durag-barbie",
    name: "Durag Barbie — Różowa Satyna",
    nameEn: "Durag Barbie Pink Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Premium",
    description: "Barbie. Projekt czerpiący z popkulturowej ikony stylu i bezkompromisowej wyrazistości. Intensywny, magnetyczny róż o spektakularnym błysku. Gładka tkanina redukuje tarcie i nadaje wyjątkowy charakter każdej stylizacji.",
    storyDescription: "Barbie. Projekt czerpiący z popkulturowej ikony stylu i bezkompromisowej wyrazistości. Intensywny, magnetyczny róż o spektakularnym błysku.",
    images: [
      "/assets/durag_velvet_royal.png"
    ],
    colors: [{ name: "Hot Pink", hex: "#FF69B4" }],
    reviews: [
      { author: "Ola W.", rating: 5, comment: "Cudowny kolor i żywy błysk!", date: "05.06.2026" }
    ]
  },
  {
    id: 1370,
    slug: "durag-bielsko-biala",
    name: "Durag Bielsko-Biała — Biały Welur",
    nameEn: "Durag Bielsko-Biała White Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Bielsko-Biała. Inspirowany surowymi, górskimi szczytami i czystym minimalizmem podbeskidzkiej natury. Mięsisty, luksusowo miękki welur w czystej bieli.",
    storyDescription: "Bielsko-Biała. Inspirowany surowymi, górskimi szczytami i czystym minimalizmem natury. Mięsisty welur w czystej bieli.",
    images: [
      "/assets/durag_silk_champagne.png"
    ],
    colors: [{ name: "Alpine White", hex: "#F8F9FA" }],
    reviews: [
      { author: "Łukasz R.", rating: 5, comment: "Niezwykle miękki i wyrazisty.", date: "14.06.2026" }
    ]
  },
  {
    id: 1371,
    slug: "durag-radom",
    name: "Durag Radom — Granatowy Welur",
    nameEn: "Durag Radom Navy Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Radom. Nawiązanie do robotniczego charakteru, dumnej historii i autentycznego, miejskiego klimatu. Głęboki, wieczorny granat na stabilnej, welurowej fakturze.",
    storyDescription: "Radom. Nawiązanie do robotniczego charakteru i autentycznego klimatu. Głęboki granat na stabilnej welurowej fakturze.",
    images: [
      "/assets/durag_velvet_royal.png"
    ],
    colors: [{ name: "Midnight Navy", hex: "#1B263B" }],
    reviews: [
      { author: "Bartek K.", rating: 5, comment: "Elegancki granatowy odcień.", date: "08.06.2026" }
    ]
  },
  {
    id: 1372,
    slug: "durag-katowice",
    name: "Durag Katowice — Fioletowa Satyna",
    nameEn: "Durag Katowice Purple Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Premium",
    description: "Katowice. Czerpie z neonowej energii nocnego Śląska i nowoczesnej transformacji regionu. Fioletowa satyna intrygująca metalicznym refleksem.",
    storyDescription: "Katowice. Neonowa energia nocnego Śląska i nowoczesna transformacja. Fioletowa satyna z metalicznym refleksem.",
    images: [
      "/assets/durag_velvet_royal.png"
    ],
    colors: [{ name: "Neon Violet", hex: "#8A2BE2" }],
    reviews: [
      { author: "Grzegorz P.", rating: 5, comment: "Super światło i refleks w słońcu.", date: "17.05.2026" }
    ]
  },
  {
    id: 1373,
    slug: "durag-zabrze",
    name: "Durag Zabrze — Srebrna Satyna",
    nameEn: "Durag Zabrze Silver Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Premium",
    description: "Zabrze. Hołd dla industrialnego serca, gdzie stal i surowy, fabryczny połysk łączą się z nowoczesnością. Srebrzysta satyna o futurystycznym sznycie.",
    storyDescription: "Zabrze. Industrialne serce, stal i surowy fabryczny połysk. Srebrzysta satyna o futurystycznym sznycie.",
    images: [
      "/assets/durag_silk_champagne.png"
    ],
    colors: [{ name: "Futuristic Silver", hex: "#C0C0C0" }],
    reviews: [
      { author: "Szymon M.", rating: 5, comment: "Unikalny srebrzysty blesk.", date: "22.05.2026" }
    ]
  },
  {
    id: 1374,
    slug: "durag-kielce",
    name: "Durag Kielce — Czerwona Satyna",
    nameEn: "Durag Kielce Red Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Premium",
    description: "Kielce. Inspirowany dynamicznym rytmem miasta i jego zdecydowanym, wyrazistym charakterem. Intensywna, krwista czerwień, która natychmiast przyciąga spojrzenia.",
    storyDescription: "Kielce. Dynamiczny rytm miasta i wyrazisty charakter. Intensywna czerwień przyciągająca spojrzenia.",
    images: [
      "/assets/durag_silk_black.png"
    ],
    colors: [{ name: "Crimson Red", hex: "#DC143C" }],
    reviews: [
      { author: "Dominik T.", rating: 5, comment: "Czerwony ogień!", date: "03.06.2026" }
    ]
  },
  {
    id: 1375,
    slug: "durag-rzeszow",
    name: "Durag Rzeszów — Wzorzysty Fiolet",
    nameEn: "Durag Rzeszów Pattern Purple",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Wzorzysta",
    description: "Rzeszów. Dynamicznie rozwijająca się stolica innowacji, łącząca technologię z nowoczesną estetyką. Unikalny, geometryczny wzór na fioletowej satynie przełamuje monotonię.",
    storyDescription: "Rzeszów. Stolica innowacji i technologia z estetyką. Geometryczny wzór na fioletowej satynie.",
    images: [
      "/assets/durag_velvet_royal.png"
    ],
    colors: [{ name: "Pattern Purple", hex: "#6A5ACD" }],
    reviews: [
      { author: "Kacper S.", rating: 5, comment: "Fajny niespotykany wzór.", date: "11.06.2026" }
    ]
  },
  {
    id: 1376,
    slug: "durag-elblag",
    name: "Durag Elbląg — Blue Camo Satyna",
    nameEn: "Durag Elbląg Blue Camo Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Camo",
    description: "Elbląg. Inspirowany bliskością wody, portowym rodowodem i surowym, północnym klimatem. Niebieski motyw military camo w technicznym wydaniu.",
    storyDescription: "Elbląg. Inspirowany bliskością wody i surowym klimatem. Niebieskie military camo w technicznym wydaniu.",
    images: [
      "/assets/durag_silk_black.png"
    ],
    colors: [{ name: "Blue Camo", hex: "#4682B4" }],
    reviews: [
      { author: "Robert V.", rating: 5, comment: "Świetne camo na głowie.", date: "19.05.2026" }
    ]
  },
  {
    id: 1377,
    slug: "durag-legionowo",
    name: "Durag Legionowo — Klasyczne Camo Satyna",
    nameEn: "Durag Legionowo Classic Camo Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Camo",
    description: "Legionowo. Ukłon w stronę wojskowych tradycji miasta i bezkompromisowej, użytkowej klasyki. Tradycyjny wzór moro na gładkiej, satynowej bazie.",
    storyDescription: "Legionowo. Ukłon w stronę wojskowych tradycji miasta. Tradycyjne moro na gładkiej satynie.",
    images: [
      "/assets/durag_silk_black.png"
    ],
    colors: [{ name: "Classic Camo", hex: "#556B2F" }],
    reviews: [
      { author: "Adrian K.", rating: 5, comment: "Klasyk nie do podrobienia.", date: "07.06.2026" }
    ]
  },
  {
    id: 1378,
    slug: "durag-chalupy",
    name: "Durag Chałupy — Niebieska Satyna",
    nameEn: "Durag Chałupy Blue Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Premium",
    description: "Chałupy. Złapany w formę klimat nadmorskiej wolności, surfingu i bezkresu Bałtyku. Satyna w odcieniu czystego, letniego błękitu.",
    storyDescription: "Chałupy. Złapany w formę klimat nadmorskiej wolności i Bałtyku. Satyna w odcieniu letniego błękitu.",
    images: [
      "/assets/durag_silk_champagne.png"
    ],
    colors: [{ name: "Ocean Blue", hex: "#00BFFF" }],
    reviews: [
      { author: "Michał F.", rating: 5, comment: "Wspaniały błękitny kolor.", date: "16.06.2026" }
    ]
  },
  {
    id: 1379,
    slug: "durag-tychy",
    name: "Durag Tychy — Granatowa Satyna",
    nameEn: "Durag Tychy Navy Satin",
    price: 79.0,
    category: "satin",
    categoryLabel: "Satyna Poliestrowa",
    material: "Satyna Poliestrowa Premium",
    description: "Tychy. Odniesienie do precyzyjnie zaplanowanej urbanistyki i głębokich tafli tyskich jezior. Klasyczny, harmonijny granat na gładkiej satynie.",
    storyDescription: "Tychy. Precyzyjna urbanistyka i tafle jezior. Klasyczny, harmonijny granat na gładkiej satynie.",
    images: [
      "/assets/durag_silk_black.png"
    ],
    colors: [{ name: "Deep Navy", hex: "#000080" }],
    reviews: [
      { author: "Sebastian L.", rating: 5, comment: "Idealny klasyczny granat.", date: "04.06.2026" }
    ]
  },
  {
    id: 1380,
    slug: "durag-sosnowiec",
    name: "Durag Sosnowiec — Zielony Welur",
    nameEn: "Durag Sosnowiec Green Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Sosnowiec. Inspirowany rozległymi parkami miasta i jego wyrazistą, miejską tożsamością. Welur w głębokim odcieniu butelkowej zieleni. Oferuje luksusową mięsistość i świetnie dopasowuje się do głowy.",
    storyDescription: "Sosnowiec. Inspirowany rozległymi parkami i miejską tożsamością. Welur w odcieniu butelkowej zieleni.",
    images: [
      "/assets/durag_velvet_emerald.png"
    ],
    colors: [{ name: "Emerald Green", hex: "#004B49" }],
    reviews: [
      { author: "Filip Z.", rating: 5, comment: "Kolor butelkowej zieleni robi ogromne wrażenie.", date: "15.06.2026" }
    ]
  },
  {
    id: 1381,
    slug: "durag-wloclawek",
    name: "Durag Włocławek — Czerwony Welur",
    nameEn: "Durag Włocławek Red Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Włocławek. Stworzony z myślą o mieście o bogatej historii fabrycznego rzemiosła. Królewska, nasycona czerwień weluru nadająca unikalnej ciężkości i wyrazistego charakteru.",
    storyDescription: "Włocławek. Fabryczne rzemiosło i nasycona czerwień weluru nadająca unikalnej ciężkości.",
    images: [
      "/assets/durag_velvet_royal.png"
    ],
    colors: [{ name: "Royal Red Velvet", hex: "#8B0000" }],
    reviews: [
      { author: "Damian P.", rating: 5, comment: "Ciężki, mięsisty welur najwyższej próby.", date: "09.05.2026" }
    ]
  },
  {
    id: 1382,
    slug: "durag-gdansk",
    name: "Durag Gdańsk — Niebieski Welur",
    nameEn: "Durag Gdańsk Blue Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Gdańsk. Inspirowany głębią wzburzonego, zimowego morza i surową, hanzeatycką architekturą. Mięsisty welur w odcieniu głębokiego niebieskiego łączy morską melancholię z najwyższym komfortem.",
    storyDescription: "Gdańsk. Głębokie zimowe morze i surowa architektura. Mięsisty welur w głębokim niebieskim odcieniu.",
    images: [
      "/assets/durag_velvet_royal.png"
    ],
    colors: [{ name: "Oceanic Navy Velvet", hex: "#1034A6" }],
    reviews: [
      { author: "Patryk G.", rating: 5, comment: "Głęboki granatowo-niebieski welur.", date: "13.06.2026" }
    ]
  },
  {
    id: 1383,
    slug: "durag-szczecin",
    name: "Durag Szczecin — Srebrny Welur",
    nameEn: "Durag Szczecin Silver Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Szczecin. Stoczniowy rodowód otoczony wodą i nowoczesna architektura przełożone na surowy, srebrzysto-szary welur z metalicznym refleksem. Zapewnia idealny balans między formą a miękkością.",
    storyDescription: "Szczecin. Stoczniowy rodowód i nowoczesna architektura. Srebrzysto-szary welur z metalicznym refleksem.",
    images: [
      "/assets/durag_velvet_emerald.png"
    ],
    colors: [{ name: "Metallic Silver Velvet", hex: "#8A9EA7" }],
    reviews: [
      { author: "Adam B.", rating: 5, comment: "Srebrny refleks w welurze czad!", date: "09.06.2026" }
    ]
  },
  {
    id: 1384,
    slug: "durag-poznan",
    name: "Durag Poznań — Fioletowy Welur",
    nameEn: "Durag Poznań Purple Velvet",
    price: 89.0,
    category: "velvet",
    categoryLabel: "Luksusowy Welur",
    material: "Welur Poliestrowy Premium",
    description: "Poznań. Wielkomiejski, nowoczesny rytm i dumna estetyka stolicy Wielkopolski. Welur w odcieniu nasyconego fioletu dla szukających unikalnej faktury.",
    storyDescription: "Poznań. Wielkomiejski rytm i dumna estetyka. Welur w odcieniu nasyconego fioletu.",
    images: [
      "/assets/durag_velvet_royal.png"
    ],
    colors: [{ name: "Royal Purple Velvet", hex: "#4B0082" }],
    reviews: [
      { author: "Tomasz N.", rating: 5, comment: "Fiolet jest niesamowity.", date: "28.05.2026" }
    ]
  },
  {
    id: 1385,
    slug: "durag-bydgoszcz",
    name: "Durag Bydgoszcz — Miedziany Cupro",
    nameEn: "Durag Bydgoszcz Copper Cupro",
    price: 99.0,
    category: "seasonal",
    categoryLabel: "Sezonowe Materiały",
    material: "Innowacyjna Tkanina Cupro",
    description: "Bydgoszcz. Industrialne spichrze, rzeczne kanały i metaliczne refleksy nad Brdą. Nowoczesne tworzywo cupro w szlachetnym, miedzianym odcieniu. Łączy jedwabistą gładkość z naturalną przewiewnością i unikalnym, matowo-lśniącym finiszem.",
    storyDescription: "Bydgoszcz. Industrialne spichrze i metaliczne refleksy nad Brdą. Nowoczesne tworzywo cupro w miedzianym odcieniu.",
    images: [
      "/assets/durag_silk_champagne.png"
    ],
    colors: [{ name: "Copper Bronze", hex: "#B87333" }],
    reviews: [
      { author: "Igor B.", rating: 5, comment: "Cupro to niesamowite odkrycie, bardzo lekkie.", date: "20.06.2026" }
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
    storyDescription: "Szczotka z naturalnego włosia dzika do profesjonalnej pielęgnacji fal 360 waves.",
    images: [
      "/assets/wave_brush_premium.png"
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
