'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TrustBanner from '@/components/TrustBanner';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllProducts, CATEGORY_DESCRIPTIONS } from '@/lib/products';
import { Feather, ShieldCheck, Sparkles, ArrowRight, Play, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const products = getAllProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const aboutCarouselImages = [
    {
      src: "/media/wds/att.mogDC6RrCftjHA9YjiKSvpu79xCgSnYrsr0NvgP4KSc.JPG",
      title: "Ręczne pakowanie w Warszawie",
      desc: "Każde zamówienie przechodzi przez nasze ręce i jest starannie przygotowane do wysyłki."
    },
    {
      src: "/assets/lookbook_editorial.png",
      title: "Kuba i Brat — Właściciele Warsaw Durag Store",
      desc: "Mały butik z pasją stworzony w 2020 roku w odpowiedzi na potrzebę prawdziwej jakości."
    },
    {
      src: "/assets/durag_silk_black.png",
      title: "Opinie naszej społeczności na IG",
      desc: "Setki udostępnień i pozytywnych reakcji od waverów, artystów i sportowców z całej Polski."
    }
  ];

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % aboutCarouselImages.length);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + aboutCarouselImages.length) % aboutCarouselImages.length);
  };

  return (
    <div>
      {/* Hero Section with Video */}
      <section className="relative bg-[#0D0D0B] text-white min-h-[88vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <video
            src="/assets/hero_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-[#0D0D0B]/30 to-[#0D0D0B]/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
          <span className="text-[#D9A87E] text-xs uppercase tracking-[0.3em] font-semibold block mb-4 animate-fade-in">
            [ Duragi Najlepszej Jakości ]
          </span>
          <span className="text-sm sm:text-base font-light uppercase tracking-[0.2em] text-gray-200 block mb-6">
            Jedyne duragi szyte w Polsce — Made in Warszawa
          </span>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-white leading-tight mb-8">
            Bo styl rodzi się <br />
            <span className="italic text-[#D9A87E]">na głowie</span>.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#kolekcja"
              className="bg-white text-[#0D0D0B] hover:bg-[#D9A87E] hover:text-white px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full shadow-lg"
            >
              Odkryj kolekcję
            </Link>
            <Link
              href="/poradnik/wave-guide"
              className="border border-white/40 text-white hover:border-[#D9A87E] hover:text-[#D9A87E] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full backdrop-blur-sm"
            >
              Zobacz 360 Wave Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <TrustBanner />

      {/* Products Collection Section */}
      <section className="py-20 max-w-7xl mx-auto px-6" id="kolekcja">
        <div className="text-center mb-10">
          <span className="text-[#734C1D] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            [ Durag Activity ]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0D0D0B] font-medium">
            Unikalny styl
          </h2>
          <p className="text-sm text-[#3B3C40] font-light max-w-xl mx-auto mt-3">
            {CATEGORY_DESCRIPTIONS[selectedCategory] || CATEGORY_DESCRIPTIONS['all']}
          </p>
        </div>

        {/* Filter Navigation Links in requested order */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-[#0D0D0B] text-white shadow-md'
                : 'bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white'
            }`}
          >
            Wszystko ({products.length})
          </button>
          <button
            onClick={() => setSelectedCategory('silk')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 ${
              selectedCategory === 'silk'
                ? 'bg-[#0D0D0B] text-white shadow-md'
                : 'bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white'
            }`}
          >
            Jedwabne
          </button>
          <button
            onClick={() => setSelectedCategory('satin')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 ${
              selectedCategory === 'satin'
                ? 'bg-[#0D0D0B] text-white shadow-md'
                : 'bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white'
            }`}
          >
            Satynowe
          </button>
          <button
            onClick={() => setSelectedCategory('velvet')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 ${
              selectedCategory === 'velvet'
                ? 'bg-[#0D0D0B] text-white shadow-md'
                : 'bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white'
            }`}
          >
            Welurowe
          </button>
          <button
            onClick={() => setSelectedCategory('seasonal')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 ${
              selectedCategory === 'seasonal'
                ? 'bg-[#0D0D0B] text-white shadow-md'
                : 'bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white'
            }`}
          >
            Sezonowe materiały
          </button>
          <button
            onClick={() => setSelectedCategory('accessories')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 ${
              selectedCategory === 'accessories'
                ? 'bg-[#0D0D0B] text-white shadow-md'
                : 'bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white'
            }`}
          >
            Akcesoria
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Jedwab w Mieście Showcase Section */}
      <section className="bg-[#0D0D0B] text-white py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Video showcasing sewing process & silk smoothness */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#111111] shadow-2xl border border-white/10 group">
            <video
              src="/assets/hero_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] text-[#D9A87E] uppercase tracking-widest font-semibold block mb-1">
                Process & Craftsmanship
              </span>
              <p className="text-xs text-gray-300 font-light">
                Autorski proces szycia w Warszawie i gładkość prawdziwego jedwabiu morwowego.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:pl-6">
            <span className="text-[#D9A87E] text-xs uppercase tracking-[0.3em] font-semibold block">
              [ pure silk 19 momme ]
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium leading-tight">
              Jedwab w Mieście.
            </h2>
            
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              W miejskim rytmie nasz Durag Milanówek to coś więcej niż dodatek — chroni, podkreśla styl i wyróżnia nas na tle innych. Wykonany z naturalnego jedwabiu o gramaturze 19 momme — oznaczającej wysoką gęstość, trwałość i jakość materiału — łączy lekkość z wyjątkową wytrzymałością, a jego gładka struktura ogranicza tarcie, pomaga chronić włosy przed łamaniem i puszeniem oraz jest delikatna dla skóry głowy.
            </p>

            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Jedwabny durag to unikatowy modowy hidden gem, który w przeciwieństwie do chusty czy czepka wyróżnia Cię na tle innych zarówno jakością wykonania, jak i subtelną elegancją w stylizacji. Jego lekka tkanina osłania głowę przed wiatrem i promieniowaniem UV, a niepodrabialny, głęboki połysk zmienia światło miasta w część stylizacji. To jedyny w Polsce durag wykonany z prawdziwego jedwabiu — bo styl rodzi się na głowie.
            </p>

            <div className="pt-4">
              <Link
                href="/kolekcja/silk"
                className="inline-block bg-[#D9A87E] text-[#0D0D0B] hover:bg-white px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full shadow-lg"
              >
                Sprawdź
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Materials Philosophy Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#734C1D] text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            Nasze standardy tkanin
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0D0D0B] font-medium">
            Filozofia naszych materiałów
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#F7F5F2] p-8 border border-[#CFCFCF]/50 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D]">
              <Feather className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0D0D0B]">Jedwab stworzony dla włosów</h3>
            <p className="text-xs sm:text-sm text-[#3B3C40] font-light leading-relaxed">
              Użyta przy produkcji Durag Milanówek satyna jedwabna ma naturalnie gładką powierzchnię ograniczającą tarcie, dzięki czemu pozwala chronić włosy przed puszeniem, łamaniem i nadmiernym przesuszaniem. Delikatny dla skóry głowy materiał pozwala włosom zachować naturalną miękkość i zdrowy wygląd, nie odbierając nam komfortu nawet podczas dłuższego noszenia. W przeciwieństwie do syntetycznych tkanin jedwab nie tylko otula włosy, lecz także pomaga ograniczać utratę ich naturalnego nawilżenia. Zastosowany tutaj jedwab o gramaturze 19 momme jest odpowiednio lekki i elastyczny a zarazem odpowiednio gęsty oraz trwały.
            </p>
          </div>

          <div className="bg-[#F7F5F2] p-8 border border-[#CFCFCF]/50 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D]">
              <Sparkles className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0D0D0B]">Satyna stworzona dla codzienności</h3>
            <p className="text-xs sm:text-sm text-[#3B3C40] font-light leading-relaxed">
              Satyna poliestrowa to materiał, który idealnie łączy gładkość, lekkość i trwałość — właśnie dlatego tak dobrze sprawdza się w szyciu duragów i to właśnie z niej korzysta zdecydowana większość klientów. Podobnie jak jedwab satyna poliestrowa jest śliska, przyjemna w dotyku co ogranicza tarcie, pomagając zmniejszyć puszenie i chronić włosy przed niepotrzebnym łamaniem. W przeciwieństwie do naturalnego jedwabiu jest materiałem syntetycznym, bardziej odpornym na codzienne użytkowanie i znacznie łatwiejszym w pielęgnacji oraz tańszym, a równocześnie zachowującym przy tym charakterystyczną gładkość oraz połysk.
            </p>
          </div>

          <div className="bg-[#F7F5F2] p-8 border border-[#CFCFCF]/50 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D]">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0D0D0B]">Welur na co dzień</h3>
            <p className="text-xs sm:text-sm text-[#3B3C40] font-light leading-relaxed">
              Welur poliestrowy to miękki, gęsty materiał o charakterystycznej, delikatnie włoskowatej powierzchni, która nadaje duragowi wyrazistą strukturę i głębię koloru. Wykonany z włókien poliestrowych jest trwały, odporny na częste użytkowanie. Jego przyjemna w dotyku faktura sprawia, że materiał dobrze układa się na głowie, a jednocześnie jest bardziej mięsisty i otulający niż lekki jedwab czy gładka satyna. Welur poliestrowy nie gniecie się łatwo, szybko schnie i jest prosty w codziennej pielęgnacji.
            </p>
          </div>

          <div className="bg-[#F7F5F2] p-8 border border-[#CFCFCF]/50 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D]">
              <Star className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0D0D0B]">Sezonowe materiały</h3>
            <p className="text-xs sm:text-sm text-[#3B3C40] font-light leading-relaxed">
              Nie każdy materiał sprawdza się tak samo o każdej porze roku. Dlatego tworzymy serię duragów wykonanych z sezonowych tkanin, które odpowiadają na zmieniającą się pogodę, temperaturę i sposób noszenia. W tej kolekcji znalazł się Durag Bydgoszcz wykonany z cupro — lekkiej, gładkiej tkaniny o subtelnym połysku, Durag Żyrardów uszyty z naturalnego, przewiewnego lnu oraz Durag Stalowa Wola wykonany z krepy satynowej, która łączy mocniejszą strukturę z eleganckim połyskiem.
            </p>
          </div>

        </div>
      </section>

      {/* "O NAS" Section under material philosophy with photo carousel */}
      <section className="bg-[#0D0D0B] text-white py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Carousel */}
            <div className="relative rounded-xl overflow-hidden bg-[#111111] aspect-[4/3] border border-white/10 group shadow-2xl">
              <Image
                src={aboutCarouselImages[carouselIndex].src}
                alt={aboutCarouselImages[carouselIndex].title}
                fill
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h4 className="font-serif text-xl text-white font-medium mb-1">
                  {aboutCarouselImages[carouselIndex].title}
                </h4>
                <p className="text-xs text-gray-300 font-light">
                  {aboutCarouselImages[carouselIndex].desc}
                </p>
              </div>

              {/* Carousel Controls */}
              <button
                onClick={handlePrevCarousel}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D9A87E] text-white hover:text-[#0D0D0B] flex items-center justify-center transition-colors"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextCarousel}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D9A87E] text-white hover:text-[#0D0D0B] flex items-center justify-center transition-colors"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Content Text */}
            <div className="space-y-6">
              <span className="text-[#D9A87E] text-xs uppercase tracking-[0.3em] font-semibold block">
                [ nasza historia ]
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                O nas — Warsaw Durag Store
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                <p>
                  Warsaw Durag Store powstał w 2020 roku z potrzeby stworzenia miejsca, które przybliży duragi polskiej społeczności i pokaże ich różnorodność — nie tylko jako elementu stylu, ale również praktycznego dodatku z własną historią i charakterem. Od tego czasu stale rozwijamy naszą ofertę, poszerzając ją o kolejne materiały, kolory i modele, szukając nowych sposobów na pokazanie, czym może być współczesny durag.
                </p>
                <p>
                  Jesteśmy małym butikiem prowadzonym przez dwóch braci, którym często pomagają również nasi znajomi. Dzięki temu każdy produkt przechodzi przez nasze ręce — od wyboru materiału, przez przygotowanie zamówienia, aż po kontakt z klientem. Dokładamy wszelkich starań, aby każda klientka i każdy klient otrzymywali nie tylko świetny produkt, lecz także dobrą i indywidualną obsługę.
                </p>
                <p>
                  Chcemy, aby Warsaw Durag Store był wsparciem dla artystów, sportowców i wszystkich osób, które poprzez swój styl wyrażają siebie, dlatego chętnie nawiązujemy z nimi współprace - robisz coś w sporcie, modzie lub muzyce pisz do nas po paczkę niespodziankę.
                </p>
                <p className="text-[#D9A87E] font-medium pt-2">
                  Na razie nie prowadzimy własnego sklepu stacjonarnego, jednak nasze duragi można odebrać osobiście przy ul. Włodarzewskiej 4 lub w centrum Warszawy — po wcześniejszym umówieniu. Z informacji praktycznych to najłatwiej dorwać nas przez Instagram, dla oldschoolowców mamy mail support@warsawduragstore.pl
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/strona/o-nas"
                  className="inline-block border border-[#D9A87E] text-[#D9A87E] hover:bg-[#D9A87E] hover:text-[#0D0D0B] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full"
                >
                  Dowiedz się więcej o nas
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#F7F5F2] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-[#0D0D0B] text-white p-12 sm:p-16 rounded-xl relative overflow-hidden shadow-2xl border border-white/10">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium mb-4">Dołącz do Klubu WDS</h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-lg mx-auto mb-8 leading-relaxed">
              Zapisz się do naszego ekskluzywnego klubu. Zyskaj 10% rabatu na pierwsze zakupy, wczesny dostęp do limitowanych kolekcji oraz poradników 360 waves.
            </p>

            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
