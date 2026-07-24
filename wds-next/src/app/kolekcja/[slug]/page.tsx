import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import TrustBanner from '@/components/TrustBanner';
import { getProductsByCategory, getAllProducts } from '@/lib/products';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CATEGORY_NAMES: Record<string, { title: string; desc: string }> = {
  all: {
    title: 'Wszystkie Duragi i Akcesoria Streetwear',
    desc: 'Odkryj pełną kolekcję Warsaw Durag Store. Luksusowe duragi z naturalnego jedwabiu morwowego 19 Momme, podwójnego aksamitu oraz profesjonalne akcesoria do pielęgnacji fal 360.',
  },
  silk: {
    title: 'Duragi z Czystego Jedwabiu Morwowego (19 Momme)',
    desc: 'Kolekcja duragów uszytych ze 100% naturalnego jedwabiu morwowego. Maksymalna ochrona struktury włosa, retencja wilgoci i jedwabisty połysk.',
  },
  velvet: {
    title: 'Duragi z Luksusowego Aksamitu (Velvet)',
    desc: 'Eleganckie duragi aksamitne z miękką satynową podszewką. Optymalna kompresja dla idealnych fal 360 waves oraz unikalna tekstura streetwear.',
  },
  accessories: {
    title: 'Akcesoria do Fal 360 Waves & Pielęgnacja',
    desc: 'Profesjonalne szczotki z naturalnego włosia dzika oraz akcesoria wspomagające codzienną rutynę pielęgnacji fal.',
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'all' },
    { slug: 'silk' },
    { slug: 'velvet' },
    { slug: 'accessories' },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryInfo = CATEGORY_NAMES[slug];
  if (!categoryInfo) {
    return { title: 'Kolekcja | Warsaw Durag Store' };
  }
  return {
    title: `${categoryInfo.title} | Warsaw Durag Store`,
    description: categoryInfo.desc,
    openGraph: {
      title: `${categoryInfo.title} | Warsaw Durag Store`,
      description: categoryInfo.desc,
      url: `https://warsaw-durag-store.vercel.app/kolekcja/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryInfo = CATEGORY_NAMES[slug];

  if (!categoryInfo) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <div>
      {/* Category Hero Header */}
      <section className="bg-[#0D0D0B] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#D9A87E] text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
            [ warsaw durag store collection ]
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium mb-4">
            {categoryInfo.title}
          </h1>
          <p className="text-sm text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            {categoryInfo.desc}
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-[#F7F5F2] border-b border-[#CFCFCF]/50">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-3 flex-wrap text-xs uppercase tracking-wider font-semibold">
          <Link
            href="/kolekcja/all"
            className={`px-5 py-2.5 rounded-full transition-colors ${
              slug === 'all' ? 'bg-[#0D0D0B] text-white' : 'bg-white text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white border border-[#CFCFCF]/50'
            }`}
          >
            Wszystko ({getAllProducts().length})
          </Link>
          <Link
            href="/kolekcja/silk"
            className={`px-5 py-2.5 rounded-full transition-colors ${
              slug === 'silk' ? 'bg-[#0D0D0B] text-white' : 'bg-white text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white border border-[#CFCFCF]/50'
            }`}
          >
            Jedwab Morwowy
          </Link>
          <Link
            href="/kolekcja/velvet"
            className={`px-5 py-2.5 rounded-full transition-colors ${
              slug === 'velvet' ? 'bg-[#0D0D0B] text-white' : 'bg-white text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white border border-[#CFCFCF]/50'
            }`}
          >
            Luksusowy Aksamit
          </Link>
          <Link
            href="/kolekcja/accessories"
            className={`px-5 py-2.5 rounded-full transition-colors ${
              slug === 'accessories' ? 'bg-[#0D0D0B] text-white' : 'bg-white text-[#3B3C40] hover:bg-[#0D0D0B] hover:text-white border border-[#CFCFCF]/50'
            }`}
          >
            Akcesoria
          </Link>
        </div>
      </section>

      <TrustBanner />

      {/* Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-base text-[#3B3C40]">Brak produktów w tej kategorii.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
