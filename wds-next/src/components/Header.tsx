'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage, Language } from '@/context/LanguageContext';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const languages: { code: Language; label: string }[] = [
    { code: 'PL', label: 'Polski' },
    { code: 'EN', label: 'English' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'FR', label: 'Français' },
    { code: 'ES', label: 'Español' },
    { code: 'CZ', label: 'Čeština' },
    { code: 'LT', label: 'Lietuvių' },
  ];

  return (
    <>
      {/* Announcement Ticker */}
      <div className="bg-[#0D0D0B] text-[#D9A87E] text-[11px] uppercase tracking-[0.15em] py-2 overflow-hidden border-b border-[#3B3C40]/30 select-none" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="pr-8">{t.announcement}</span>
          <span className="pr-8">{t.announcement}</span>
          <span className="pr-8">{t.announcement}</span>
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
        <div className="max-w-7xl mx-auto px-6 h-24 md:h-28 flex items-center justify-between">
          
          {/* Logo with double color version */}
          <Link href="/" className="flex items-center gap-3 group py-2">
            <Image
              src={isScrolled ? "/assets/logo_white.png" : "/assets/logo_black.png"}
              alt="Warsaw Durag Store Logo"
              width={280}
              height={100}
              className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-all duration-300 transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.15em] ${isScrolled ? 'text-gray-200' : 'text-[#3B3C40]'}`}>
            <Link href="/kolekcja/all" className="hover:text-[#D9A87E] transition-colors py-2">{t.navAll}</Link>
            <Link href="/kolekcja/silk" className="hover:text-[#D9A87E] transition-colors py-2">{t.navSilk}</Link>
            <Link href="/kolekcja/satin" className="hover:text-[#D9A87E] transition-colors py-2">{t.navSatin}</Link>
            <Link href="/kolekcja/velvet" className="hover:text-[#D9A87E] transition-colors py-2">{t.navVelvet}</Link>
            <Link href="/kolekcja/seasonal" className="hover:text-[#D9A87E] transition-colors py-2">{t.navSeasonal}</Link>
            <Link href="/kolekcja/accessories" className="hover:text-[#D9A87E] transition-colors py-2">{t.navAccessories}</Link>
            <Link href="/poradnik/wave-guide" className="hover:text-[#D9A87E] transition-colors py-2 text-[#D9A87E]">{t.navGuide}</Link>
          </nav>

          {/* Cart & Language Selector */}
          <div className="flex items-center gap-4">
            
            {/* Multi-language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
                  isScrolled 
                    ? 'border-white/20 hover:border-[#D9A87E] text-white bg-white/5' 
                    : 'border-gray-300 hover:border-[#0D0D0B] text-[#0D0D0B] bg-gray-50'
                }`}
                title="Wybierz język / Change language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#0D0D0B] border border-white/20 rounded-xl shadow-2xl py-2 z-50 text-xs font-medium text-gray-200 animate-scale-in">
                  {languages.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-[#1A1A1A] hover:text-[#D9A87E] flex items-center justify-between transition-colors ${
                        language === code ? 'text-[#D9A87E] font-bold bg-white/5' : ''
                      }`}
                    >
                      <span>{label}</span>
                      <span className="text-[10px] text-gray-400 font-mono">[{code}]</span>
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
