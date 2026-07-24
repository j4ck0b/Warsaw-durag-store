'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Ticker */}
      <div className="bg-[#0D0D0B] text-[#D9A87E] text-[11px] uppercase tracking-[0.15em] py-2 overflow-hidden border-b border-[#3B3C40]/30 select-none" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="pr-8">WARSAW DURAG STORE • ULTIMATE STREETWEAR HEADWEAR • WAVES CARE SYSTEM • DROPS & COLLABS • SHIPPED FROM WARSAW • </span>
          <span className="pr-8">WARSAW DURAG STORE • ULTIMATE STREETWEAR HEADWEAR • WAVES CARE SYSTEM • DROPS & COLLABS • SHIPPED FROM WARSAW • </span>
          <span className="pr-8">WARSAW DURAG STORE • ULTIMATE STREETWEAR HEADWEAR • WAVES CARE SYSTEM • DROPS & COLLABS • SHIPPED FROM WARSAW • </span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#CFCFCF]/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-semibold tracking-tight text-[#0D0D0B] flex items-center gap-1 group">
            <span>Warsaw</span>
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-light text-[#734C1D] group-hover:text-[#0D0D0B] transition-colors">Durag Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.15em] text-[#3B3C40]">
            <Link href="/kolekcja/all" className="hover:text-[#734C1D] transition-colors py-2">Wszystko</Link>
            <Link href="/kolekcja/silk" className="hover:text-[#734C1D] transition-colors py-2">Jedwab Morwowy</Link>
            <Link href="/kolekcja/velvet" className="hover:text-[#734C1D] transition-colors py-2">Luksusowy Aksamit</Link>
            <Link href="/kolekcja/accessories" className="hover:text-[#734C1D] transition-colors py-2">Akcesoria</Link>
            <Link href="/poradnik/wave-guide" className="hover:text-[#734C1D] transition-colors py-2 text-[#734C1D]">Wave Guide</Link>
          </nav>

          {/* Cart & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#0D0D0B] hover:text-[#734C1D] transition-colors focus:outline-none"
              aria-label="Otwórz koszyk"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#734C1D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#0D0D0B] focus:outline-none"
              aria-label="Menu nawigacji"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#CFCFCF] px-6 py-6 space-y-4 animate-fade-in">
            <Link
              href="/kolekcja/all"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold text-[#0D0D0B]"
            >
              Wszystkie Produkty
            </Link>
            <Link
              href="/kolekcja/silk"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold text-[#3B3C40]"
            >
              Kolekcja Jedwabna
            </Link>
            <Link
              href="/kolekcja/velvet"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold text-[#3B3C40]"
            >
              Kolekcja Aksamitna
            </Link>
            <Link
              href="/kolekcja/accessories"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold text-[#3B3C40]"
            >
              Akcesoria & Brush
            </Link>
            <Link
              href="/poradnik/wave-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-bold text-[#734C1D]"
            >
              Poradnik 360 Wave Guide
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
