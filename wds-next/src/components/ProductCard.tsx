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
    <div className="group relative flex flex-col bg-white border border-[#CFCFCF]/50 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <Link href={`/produkt/${product.slug}`} className="relative aspect-square overflow-hidden bg-[#F7F5F2]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-[#0D0D0B]/80 text-[#D9A87E] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 backdrop-blur-sm">
          {product.categoryLabel}
        </div>
      </Link>

      {/* Info Container */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] text-[#734C1D] uppercase tracking-wider font-semibold block mb-1">
            {product.material}
          </span>
          <Link href={`/produkt/${product.slug}`}>
            <h3 className="font-serif text-lg font-medium text-[#0D0D0B] group-hover:text-[#734C1D] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#3B3C40] font-light mt-1.5 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-[#CFCFCF]/30 flex items-center justify-between">
          <span className="text-base font-semibold text-[#0D0D0B]">
            {product.price.toFixed(2)} PLN
          </span>
          
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0D0D0B] hover:text-[#734C1D] transition-colors py-1.5 px-3 border border-[#0D0D0B] hover:border-[#734C1D] rounded-full"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Do koszyka</span>
          </button>
        </div>
      </div>

    </div>
  );
}
