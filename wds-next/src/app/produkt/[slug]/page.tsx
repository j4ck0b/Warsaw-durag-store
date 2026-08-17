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
  const canonicalUrl = `https://warsawduragstore.pl/produkt/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: product.images[0].startsWith('http')
            ? product.images[0]
            : `https://warsawduragstore.pl${product.images[0]}`,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        product.images[0].startsWith('http')
          ? product.images[0]
          : `https://warsawduragstore.pl${product.images[0]}`,
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

  const productUrl = `https://warsawduragstore.pl/produkt/${product.slug}`;
  const imageUrl = product.images[0].startsWith('http')
    ? product.images[0]
    : `https://warsawduragstore.pl${product.images[0]}`;

  // Schema.org Product JSON-LD with reviews and offer
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [imageUrl],
    description: product.description,
    sku: `WDS-${product.id}`,
    mpn: `WDS-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Warsaw Durag Store',
    },
    material: product.material,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'PLN',
      price: product.price.toFixed(2),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Warsaw Durag Store',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'PLN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: Math.max(product.reviews?.length || 1, 1),
      bestRating: '5',
      worstRating: '1',
    },
    review: (product.reviews || []).map((rev) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.author,
      },
      datePublished: '2026-06-01',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: rev.comment,
    })),
  };

  // Schema.org BreadcrumbList JSON-LD
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona Główna',
        item: 'https://warsawduragstore.pl/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.categoryLabel,
        item: `https://warsawduragstore.pl/kolekcja/${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <div>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-[#F7F5F2] border-b border-[#CFCFCF]/50 py-4">
        <div className="max-w-7xl mx-auto px-6 text-xs text-[#3B3C40] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D0D0B] transition-colors">Strona Główna</Link>
          <span>/</span>
          <Link href={`/kolekcja/${product.category}`} className="hover:text-[#0D0D0B] uppercase transition-colors">
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#0D0D0B]">{product.name}</span>
        </div>
      </nav>

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
