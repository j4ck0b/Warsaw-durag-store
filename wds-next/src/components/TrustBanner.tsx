import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Award } from 'lucide-react';

export default function TrustBanner() {
  return (
    <section className="bg-[#F7F5F2] border-y border-[#CFCFCF]/60 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D] shrink-0">
              <Truck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0D0B]">Wysyłka 1–2 Dni</h4>
              <p className="text-[12px] text-[#3B3C40] font-light mt-0.5">Express z magazynu w Warszawie</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D] shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0D0B]">Darmowa Dostawa</h4>
              <p className="text-[12px] text-[#3B3C40] font-light mt-0.5">InPost & Kurier w PL bez progu</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D] shrink-0">
              <RefreshCw className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0D0B]">14 Dni na Zwrot</h4>
              <p className="text-[12px] text-[#3B3C40] font-light mt-0.5">Bezproblemowa procedura zwrotu</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#CFCFCF] flex items-center justify-center text-[#734C1D] shrink-0">
              <Award className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0D0B]">Jedwab 19 Momme</h4>
              <p className="text-[12px] text-[#3B3C40] font-light mt-0.5">Gwarancja 100% naturalnego jedwabiu</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
