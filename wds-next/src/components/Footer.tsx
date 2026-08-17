import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0B] text-white border-t border-[#3B3C40]/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#3B3C40]/30">
          
          {/* Col 1: About */}
          <div>
            <Link href="/" className="font-serif text-2xl font-semibold tracking-tight text-white block mb-4">
              Warsaw <span className="text-xs uppercase tracking-[0.2em] font-sans font-light text-[#D9A87E]">Durag Store</span>
            </Link>
            <p className="text-xs text-[#CFCFCF] font-light leading-relaxed">
              Jedyne duragi szyte w Polsce z prawdziwego jedwabiu morwowego, satyny i weluru. Warszawski brand rzemieślniczy.
            </p>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A87E] mb-4">Kolekcje</h4>
            <ul className="space-y-2.5 text-xs text-[#CFCFCF] font-light">
              <li><Link href="/kolekcja/silk" className="hover:text-white transition-colors">Jedwabne</Link></li>
              <li><Link href="/kolekcja/satin" className="hover:text-white transition-colors">Satynowe</Link></li>
              <li><Link href="/kolekcja/velvet" className="hover:text-white transition-colors">Welurowe</Link></li>
              <li><Link href="/kolekcja/seasonal" className="hover:text-white transition-colors">Sezonowe materiały</Link></li>
              <li><Link href="/kolekcja/accessories" className="hover:text-white transition-colors">Akcesoria</Link></li>
            </ul>
          </div>

          {/* Col 3: Information & Guides */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A87E] mb-4">Informacje & Poradniki</h4>
            <ul className="space-y-2.5 text-xs text-[#CFCFCF] font-light">
              <li><Link href="/strona/o-nas" className="hover:text-white transition-colors">O nas</Link></li>
              <li><Link href="/strona/kontakt" className="hover:text-white transition-colors">Kontakt & Odbiór Osobisty</Link></li>
              <li><Link href="/poradnik/wave-guide" className="hover:text-white transition-colors text-[#D9A87E]">Wave Guide 360</Link></li>
              <li><Link href="/strona/dostawa-i-zwroty" className="hover:text-white transition-colors">Dostawa i Zwroty</Link></li>
              <li><Link href="/strona/blog" className="hover:text-white transition-colors">Blog & Artykuły</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Local pickup */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A87E] mb-4">Odbiór w Warszawie</h4>
            <div className="text-xs text-[#CFCFCF] font-light space-y-1">
              <p className="font-semibold text-white">Warszawa (po umówieniu):</p>
              <p>• ul. Włodarzewska 4</p>
              <p>• Centrum Warszawy</p>
              <p className="pt-2 text-gray-400">Instagram: @warsawduragstore</p>
              <p className="text-[#D9A87E]">Email: support@warsawduragstore.pl</p>
            </div>
          </div>

        </div>

        {/* Bottom footer links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>
            &copy; 2026 Warsaw Durag Store. Jedyne duragi szyte w Polsce.
          </div>
          <div className="flex gap-6 text-gray-400">
            <Link href="/strona/o-nas" className="hover:text-white transition-colors">O nas</Link>
            <Link href="/strona/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
            <Link href="/strona/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/strona/regulamin" className="hover:text-white transition-colors">Regulamin</Link>
            <Link href="/strona/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka Prywatności</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
