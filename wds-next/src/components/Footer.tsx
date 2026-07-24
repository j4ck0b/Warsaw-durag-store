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
              Niezależny, warszawski brand dostarczający najwyższej jakości akcesoria do pielęgnacji fal oraz mody ulicznej. Fuzja kultury i rzemiosła najwyższej próby.
            </p>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A87E] mb-4">Sklep</h4>
            <ul className="space-y-2.5 text-xs text-[#CFCFCF] font-light">
              <li><Link href="/kolekcja/silk" className="hover:text-white transition-colors">Kolekcja Jedwabna</Link></li>
              <li><Link href="/kolekcja/velvet" className="hover:text-white transition-colors">Kolekcja Aksamitna</Link></li>
              <li><Link href="/kolekcja/accessories" className="hover:text-white transition-colors">Wave Care & Akcesoria</Link></li>
              <li><Link href="/kolekcja/all" className="hover:text-white transition-colors">Wszystkie produkty</Link></li>
            </ul>
          </div>

          {/* Col 3: Help & Guides */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A87E] mb-4">Pomoc i Poradniki</h4>
            <ul className="space-y-2.5 text-xs text-[#CFCFCF] font-light">
              <li><Link href="/strona/dostawa-i-zwroty" className="hover:text-white transition-colors">Dostawa i Zwroty</Link></li>
              <li><Link href="/poradnik/wave-guide" className="hover:text-white transition-colors text-[#D9A87E]">Jak pielęgnować fale? (Wave Guide)</Link></li>
              <li><Link href="/strona/tabela-rozmiarow" className="hover:text-white transition-colors">Tabela Rozmiarów i Materiały</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Showroom */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A87E] mb-4">Kontakt & Showroom</h4>
            <div className="text-xs text-[#CFCFCF] font-light space-y-1">
              <p className="font-semibold text-white">WDS Showroom Warszawa</p>
              <p>ul. Mokotowska 42</p>
              <p>00-543 Warszawa, Polska</p>
              <p className="pt-2 text-[11px] text-[#3B3C40]">Poniedziałek - Sobota: 11:00 - 19:00</p>
              <p className="text-[#D9A87E]">Email: contact@warsawduragstore.pl</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#3B3C40] gap-4">
          <div>
            &copy; 2026 Warsaw Durag Store. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex gap-6 text-[#CFCFCF]">
            <Link href="/strona/regulamin" className="hover:text-white transition-colors">Regulamin</Link>
            <Link href="/strona/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka Prywatności</Link>
            <Link href="/admin" className="hover:text-white transition-colors text-xs text-[#3B3C40]">Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
