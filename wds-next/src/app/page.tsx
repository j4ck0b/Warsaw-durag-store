import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TrustBanner from '@/components/TrustBanner';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllProducts } from '@/lib/products';
import { Feather, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const products = getAllProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#0D0D0B] text-white min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/assets/hero_bg.png"
            alt="Editorial fashion portrait featuring Warsaw Durag Store Silk Black collection"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-transparent to-[#0D0D0B]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
          <span className="text-[#D9A87E] text-xs uppercase tracking-[0.3em] font-semibold block mb-4">
            [ care & wave system ]
          </span>
          <span className="text-sm font-light uppercase tracking-[0.2em] text-gray-300 block mb-3">
            Premium Headwear & Care — Made in Warszawa
          </span>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight mb-8">
            Premium duragi z jedwabiu i aksamitu — <br />
            <span className="italic text-[#D9A87E]">luxury streetwear Warsaw</span>.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kolekcja/all"
              className="bg-white text-[#0D0D0B] hover:bg-[#734C1D] hover:text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 rounded-full"
            >
              Odkryj kolekcję
            </Link>
            <Link
              href="/poradnik/wave-guide"
              className="border border-white/40 text-white hover:border-[#D9A87E] hover:text-[#D9A87E] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 rounded-full"
            >
              Zobacz 360 Wave Guide
            </Link>
          </div>
        </div>
      </section>

      {/* CRO Trust Banner */}
      <TrustBanner />

      {/* Products Collection Section */}
      <section className="py-20 max-w-7xl mx-auto px-6" id="kolekcja">
        <div className="text-center mb-14">
          <span className="text-[#734C1D] text-xs uppercase tracking-[0.2em] font-semibold block mb-2">
            [ the wave ritual ]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0D0D0B] font-medium">
            Rzemiosło i Estetyka
          </h2>
          <p className="text-sm text-[#3B3C40] font-light max-w-xl mx-auto mt-3">
            Wyselekcjonowane duragi z czystego jedwabiu morwowego 19 Momme oraz luksusowego aksamitu.
          </p>
        </div>

        {/* Filter Navigation Links */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap text-xs uppercase tracking-wider font-semibold">
          <Link href="/kolekcja/all" className="px-5 py-2.5 bg-[#0D0D0B] text-white rounded-full">
            Wszystko
          </Link>
          <Link href="/kolekcja/silk" className="px-5 py-2.5 bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white rounded-full transition-colors">
            Jedwab Morwowy
          </Link>
          <Link href="/kolekcja/velvet" className="px-5 py-2.5 bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white rounded-full transition-colors">
            Luksusowy Aksamit
          </Link>
          <Link href="/kolekcja/accessories" className="px-5 py-2.5 bg-[#F7F5F2] text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white rounded-full transition-colors">
            Akcesoria
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/kolekcja/all"
            className="inline-flex items-center gap-2 border border-[#0D0D0B] text-[#0D0D0B] hover:bg-[#0D0D0B] hover:text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 rounded-full"
          >
            <span>Zobacz wszystkie produkty ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Editorial Lookbook Campaign Section */}
      <section className="bg-[#0D0D0B] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[#111111]">
            <Image
              src="/assets/lookbook_editorial.png"
              alt="Editorial lookbook style showcase - trench coat and luxury silk durag"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6 lg:pl-8">
            <span className="text-[#D9A87E] text-xs uppercase tracking-[0.3em] font-semibold block">
              [ silk craftsmanship ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
              Kampania Editorial: <br />
              <span className="italic text-[#D9A87E]">Jedwab w Mieście</span>.
            </h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Nasza najnowsza linia to hołd dla kultury streetwearu połączony z rzemiosłem najwyższej próby. Każdy durag został uszyty ręcznie z wyselekcjonowanych tkanin, aby zapewnić nie tylko kultowy wygląd, ale przede wszystkim maksymalną ochronę struktury włosów i perfekcję fal 360 waves.
            </p>

            <div className="pt-4">
              <Link
                href="/kolekcja/silk"
                className="inline-block bg-[#734C1D] text-white hover:bg-white hover:text-[#0D0D0B] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 rounded-full"
              >
                Odkryj Kolekcję Jedwabną
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Philosophy / Materials Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#734C1D] text-xs uppercase tracking-[0.2em] font-semibold block mb-2">
            Nasze standardy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0D0D0B] font-medium">
            Filozofia Materiału
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#F7F5F2] p-8 border border-[#CFCFCF]/50 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D]">
              <Feather className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#0D0D0B]">Jedwab morwowy 19 Momme</h3>
            <p className="text-xs text-[#3B3C40] font-light leading-relaxed">
              Używamy wyłącznie naturalnego jedwabiu o gęstości 19 momme. Zapewnia on absolutną gładkość fryzury, zapobiega plątaniu się i tarciu włosa podczas snu oraz doskonale zatrzymuje wilgoć wewnątrz łusek włosa.
            </p>
          </div>

          <div className="bg-[#F7F5F2] p-8 border border-[#CFCFCF]/50 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D]">
              <Sparkles className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#0D0D0B]">Podwójny aksamit & satyna</h3>
            <p className="text-xs text-[#3B3C40] font-light leading-relaxed">
              Nasze modele aksamitne łączą mięsistość i matowość luksusowego welwetu o podwójnej elastyczności z wewnętrznym wyścieleniem ze śliskiej satyny. To gwarancja optymalnej kompresji fal.
            </p>
          </div>

          <div className="bg-[#F7F5F2] p-8 border border-[#CFCFCF]/50 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D]">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#0D0D0B]">Bezszwowa ergonomia pasów</h3>
            <p className="text-xs text-[#3B3C40] font-light leading-relaxed">
              Pasy w naszych duragach zostały zaprojektowane z myślą o ergonomii. Wszystkie szwy biegną wyłącznie na zewnątrz, a optymalna długość 100 cm rozkłada nacisk równomiernie, nie pozostawiając odcisków na czole.
            </p>
          </div>

        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#F7F5F2] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-[#0D0D0B] text-white p-12 sm:p-16 rounded-lg relative overflow-hidden shadow-2xl">
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
