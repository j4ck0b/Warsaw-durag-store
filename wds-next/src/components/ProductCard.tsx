'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col bg-white border border-[#CFCFCF]/50 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      
      {/* Tall Portrait Image Container (aspect-3/4) */}
      <Link href={`/produkt/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-[#F7F5F2]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-[#0D0D0B]/80 text-[#D9A87E] text-[10px] uppercase tracking-widest font-semibold px-3 py-1 backdrop-blur-md rounded-full">
          {product.categoryLabel}
        </div>
      </Link>

      {/* Info Container below photo (No button overlay on photo) */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-white">
        <div>
          <span className="text-[11px] text-[#734C1D] uppercase tracking-widest font-semibold block mb-1">
            {product.material}
          </span>
          <Link href={`/produkt/${product.slug}`}>
            <h3 className="font-serif text-xl font-medium text-[#0D0D0B] group-hover:text-[#734C1D] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#3B3C40] font-light mt-2 line-clamp-2 leading-relaxed">
            {product.storyDescription || product.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#CFCFCF]/30 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#0D0D0B]">
              {product.price.toFixed(2)} PLN
            </span>
            <span className="text-[10px] text-emerald-700 block font-semibold">2+1 Gratis w koszyku</span>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0D0D0B] hover:bg-[#734C1D] transition-all duration-300 py-2.5 px-4 rounded-full shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Do koszyka</span>
          </button>
        </div>
      </div>

    </div>
  );
}
