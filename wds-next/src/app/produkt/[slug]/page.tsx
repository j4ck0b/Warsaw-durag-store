import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Produkt | Warsaw Durag Store' };
  }

  const title = `${product.name} — ${product.material} | Warsaw Durag Store`;
  const description = `${product.name}. ${product.description.slice(0, 150)}... Darmowa dostawa w Polsce. Zamów teraz na Warsaw Durag Store.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://warsaw-durag-store.vercel.app/produkt/${product.slug}`,
      images: [
        {
          url: product.images[0].startsWith('http')
            ? product.images[0]
            : `https://warsaw-durag-store.vercel.app${product.images[0]}`,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  // Schema.org Product JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images[0].startsWith('http')
      ? product.images[0]
      : `https://warsaw-durag-store.vercel.app${product.images[0]}`,
    description: product.description,
    material: product.material,
    offers: {
      '@type': 'Offer',
      url: `https://warsaw-durag-store.vercel.app/produkt/${product.slug}`,
      priceCurrency: 'PLN',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Warsaw Durag Store',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: product.reviews.length || 1,
    },
  };

  return (
    <div>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-[#F7F5F2] border-b border-[#CFCFCF]/50 py-4">
        <div className="max-w-7xl mx-auto px-6 text-xs text-[#3B3C40] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D0D0B]">Strona Główna</Link>
          <span>/</span>
          <Link href={`/kolekcja/${product.category}`} className="hover:text-[#0D0D0B] uppercase">
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#0D0D0B]">{product.name}</span>
        </div>
      </div>

      {/* Main Details */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <ProductDetailsClient product={product} />
      </div>

      {/* Related Products */}
      <section className="bg-[#F7F5F2] py-16 border-t border-[#CFCFCF]/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-2xl text-[#0D0D0B] font-medium text-center mb-10">
            Inni Klienci Wybrali Równieź
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
