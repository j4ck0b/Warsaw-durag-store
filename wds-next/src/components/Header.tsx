'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<'PL' | 'EN' | 'CZ' | 'LT'>('PL');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeText = "Wysyłamy z Warszawy w 1 dzień • Kup dwa a trzeci otrzymasz gratis • Darmowa wysyłka • Ręcznie szyte duragi • Odbiór osobisty w Warszawie • ";

  return (
    <>
      {/* Announcement Ticker */}
      <div className="bg-[#0D0D0B] text-[#D9A87E] text-[11px] uppercase tracking-[0.15em] py-2 overflow-hidden border-b border-[#3B3C40]/30 select-none" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="pr-8">{marqueeText}</span>
          <span className="pr-8">{marqueeText}</span>
          <span className="pr-8">{marqueeText}</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#0D0D0B] text-white border-b border-white/10 shadow-lg'
            : 'bg-white/90 backdrop-blur-md text-[#0D0D0B] border-b border-[#CFCFCF]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo with double color version */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={isScrolled ? "/assets/logo_white.png" : "/assets/logo_black.png"}
              alt="Warsaw Durag Store Logo"
              width={160}
              height={42}
              className="h-10 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.15em] ${isScrolled ? 'text-gray-200' : 'text-[#3B3C40]'}`}>
            <Link href="/kolekcja/all" className="hover:text-[#D9A87E] transition-colors py-2">Wszystko</Link>
            <Link href="/kolekcja/silk" className="hover:text-[#D9A87E] transition-colors py-2">Jedwabne</Link>
            <Link href="/kolekcja/satin" className="hover:text-[#D9A87E] transition-colors py-2">Satynowe</Link>
            <Link href="/kolekcja/velvet" className="hover:text-[#D9A87E] transition-colors py-2">Welurowe</Link>
            <Link href="/kolekcja/seasonal" className="hover:text-[#D9A87E] transition-colors py-2">Sezonowe</Link>
            <Link href="/kolekcja/accessories" className="hover:text-[#D9A87E] transition-colors py-2">Akcesoria</Link>
            <Link href="/poradnik/wave-guide" className="hover:text-[#D9A87E] transition-colors py-2 text-[#D9A87E]">Wave Guide</Link>
          </nav>

          {/* Cart & Language Selector */}
          <div className="flex items-center gap-4">
            
            {/* Multi-language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full border transition-colors ${
                  isScrolled 
                    ? 'border-white/20 hover:border-[#D9A87E] text-white' 
                    : 'border-gray-300 hover:border-[#0D0D0B] text-[#0D0D0B]'
                }`}
                title="Wybierz język / Change language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#0D0D0B] border border-white/20 rounded-xl shadow-xl py-2 z-50 text-xs font-medium text-gray-200 animate-scale-in">
                  {(['PL', 'EN', 'CZ', 'LT'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-1.5 hover:bg-[#1A1A1A] hover:text-[#D9A87E] flex items-center justify-between ${
                        currentLang === lang ? 'text-[#D9A87E] font-bold' : ''
                      }`}
                    >
                      <span>{lang === 'PL' ? 'Polski' : lang === 'EN' ? 'English' : lang === 'CZ' ? 'Čeština' : 'Lietuvių'}</span>
                      <span className="text-[10px] text-gray-400">[{lang}]</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 transition-colors focus:outline-none ${
                isScrolled ? 'text-white hover:text-[#D9A87E]' : 'text-[#0D0D0B] hover:text-[#734C1D]'
              }`}
              aria-label="Otwórz koszyk"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D9A87E] text-[#0D0D0B] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 focus:outline-none ${isScrolled ? 'text-white' : 'text-[#0D0D0B]'}`}
              aria-label="Menu nawigacji"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-6 py-6 space-y-4 animate-fade-in ${
            isScrolled ? 'bg-[#0D0D0B] border-white/10 text-white' : 'bg-white border-[#CFCFCF] text-[#0D0D0B]'
          }`}>
            <Link
              href="/kolekcja/all"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold"
            >
              Wszystkie Produkty
            </Link>
            <Link
              href="/kolekcja/silk"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold text-[#D9A87E]"
            >
              Jedwabne
            </Link>
            <Link
              href="/kolekcja/satin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold opacity-90"
            >
              Satynowe
            </Link>
            <Link
              href="/kolekcja/velvet"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold opacity-90"
            >
              Welurowe
            </Link>
            <Link
              href="/kolekcja/seasonal"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold opacity-90"
            >
              Sezonowe materiały
            </Link>
            <Link
              href="/kolekcja/accessories"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold opacity-90"
            >
              Akcesoria
            </Link>
            <Link
              href="/poradnik/wave-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider font-bold text-[#D9A87E]"
            >
              Poradnik 360 Wave Guide
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
