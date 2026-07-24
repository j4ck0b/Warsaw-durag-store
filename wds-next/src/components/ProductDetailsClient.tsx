'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Truck, ShieldCheck, RefreshCw, Star, Check } from 'lucide-react';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* Left: Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-[#F7F5F2] border border-[#CFCFCF]/50 rounded-sm overflow-hidden">
          <Image
            src={selectedImage || product.images[0]}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute top-4 left-4 bg-[#0D0D0B] text-[#D9A87E] text-xs uppercase tracking-widest font-semibold px-3 py-1.5">
            {product.categoryLabel}
          </div>
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 bg-[#F7F5F2] border rounded-sm overflow-hidden transition-all ${
                  selectedImage === img ? 'border-[#734C1D] ring-2 ring-[#734C1D]/30' : 'border-[#CFCFCF]'
                }`}
              >
                <Image src={img} alt={`${product.name} - ujęcie ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Info */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#734C1D] block mb-2">
            {product.material}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0D0D0B] font-medium">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex text-[#734C1D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-[#3B3C40] font-light">
              ({product.reviews.length} opinie klienta)
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-2xl font-semibold text-[#0D0D0B] pb-4 border-b border-[#CFCFCF]/40">
          {product.price.toFixed(2)} PLN
          <span className="text-xs text-[#2E7D32] font-normal ml-3">Darmowa dostawa w PL</span>
        </div>

        {/* Description */}
        <div className="text-sm text-[#3B3C40] font-light leading-relaxed whitespace-pre-line">
          {product.description}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-[#CFCFCF]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-sm text-[#3B3C40] hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-sm text-[#3B3C40] hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-grow bg-[#0D0D0B] hover:bg-[#734C1D] text-white py-3.5 px-8 text-xs font-semibold uppercase tracking-[0.2em] transition-colors rounded-full flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Dodaj do koszyka</span>
            </button>
          </div>

          {addedMessage && (
            <div className="bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32] text-xs p-3 rounded-sm flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>Dodano produkt do koszyka! Otwórz koszyk, aby dokończyć zamówienie.</span>
            </div>
          )}
        </div>

        {/* Specs Table */}
        <div className="border-t border-[#CFCFCF]/40 pt-6 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0D0D0B]">
            Specyfikacja Rzemieślnicza
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs text-[#3B3C40]">
            <div>
              <span className="block font-semibold text-[#0D0D0B]">Długość pasów:</span>
              <span>100 cm (podwójne owinięcie)</span>
            </div>
            <div>
              <span className="block font-semibold text-[#0D0D0B]">Szerokość pasów:</span>
              <span>8 cm (rozłożony nacisk na czole)</span>
            </div>
            <div>
              <span className="block font-semibold text-[#0D0D0B]">Szew:</span>
              <span>Zewnętrzny bezodciskowy</span>
            </div>
            <div>
              <span className="block font-semibold text-[#0D0D0B]">Konserwacja:</span>
              <span>Pranie ręczne 30°C</span>
            </div>
          </div>
        </div>

        {/* Trust Points */}
        <div className="bg-[#F7F5F2] p-4 border border-[#CFCFCF]/50 rounded-sm space-y-2 text-xs text-[#3B3C40]">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#734C1D]" />
            <span>Wysyłka w 1–2 dni z magazynu w Warszawie</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#734C1D]" />
            <span>Gwarancja 14 dni na darmowy zwrot towaru</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#734C1D]" />
            <span>Oryginalny produkt z polskiej szwalni</span>
          </div>
        </div>

      </div>

    </div>
  );
}
