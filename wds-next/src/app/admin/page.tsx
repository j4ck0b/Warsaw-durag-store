'use client';

import React, { useState } from 'react';
import { Lock, ShieldAlert, LogOut, Package, ShoppingBag, Database } from 'lucide-react';
import { getAllProducts } from '@/lib/products';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  const products = getAllProducts();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'wds2026' || password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Nieprawidłowe hasło dostępowe do panelu administracyjnego.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] bg-[#F7F5F2] flex items-center justify-center p-6">
        <div className="bg-white p-8 sm:p-10 border border-[#CFCFCF] max-w-md w-full shadow-2xl rounded-sm">
          <div className="w-12 h-12 rounded-full bg-[#0D0D0B] text-[#D9A87E] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl text-center text-[#0D0D0B] mb-2 font-medium">
            Panel Administratora WDS
          </h1>
          <p className="text-xs text-center text-[#3B3C40] mb-6">
            Dostęp zastrzeżony dla personelu sklepu Warsaw Durag Store.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3B3C40] mb-1">
                Hasło dostępowe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wpisz hasło admina"
                className="w-full px-4 py-3 text-xs border border-[#CFCFCF] outline-none focus:border-[#734C1D] bg-[#F7F5F2]"
              />
            </div>

            {errorMsg && <p className="text-xs text-[#D32F2F]">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full bg-[#0D0D0B] text-white py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#734C1D] transition-colors rounded-full"
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top bar */}
        <div className="bg-[#0D0D0B] text-white p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#D9A87E]">WDS CMS Portal</span>
            <h1 className="font-serif text-2xl font-medium">Zarządzanie Sklepem</h1>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Wyloguj</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-full transition-colors ${
              activeTab === 'products' ? 'bg-[#0D0D0B] text-white' : 'bg-white text-[#3B3C40] border border-[#CFCFCF]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Katalog Produktów ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-full transition-colors ${
              activeTab === 'orders' ? 'bg-[#0D0D0B] text-white' : 'bg-white text-[#3B3C40] border border-[#CFCFCF]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Zamówienia</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'products' ? (
          <div className="bg-white p-6 border border-[#CFCFCF] rounded-sm">
            <h2 className="font-serif text-xl mb-4 text-[#0D0D0B]">Lista Produktów w Bazie</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#CFCFCF] text-[#3B3C40] uppercase">
                    <th className="py-3 px-2">ID</th>
                    <th className="py-3 px-2">Nazwa</th>
                    <th className="py-3 px-2">Kategoria</th>
                    <th className="py-3 px-2">Materiał</th>
                    <th className="py-3 px-2 text-right">Cena</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 px-2 font-mono">{p.id}</td>
                      <td className="py-3 px-2 font-semibold text-[#0D0D0B]">{p.name}</td>
                      <td className="py-3 px-2 uppercase">{p.categoryLabel}</td>
                      <td className="py-3 px-2 text-[#734C1D]">{p.material}</td>
                      <td className="py-3 px-2 text-right font-semibold">{p.price.toFixed(2)} PLN</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 border border-[#CFCFCF] rounded-sm text-center">
            <Database className="w-12 h-12 text-[#734C1D] mx-auto mb-3" />
            <h2 className="font-serif text-xl text-[#0D0D0B] mb-2">Rejestr Zamówień Supabase</h2>
            <p className="text-xs text-[#3B3C40] font-light max-w-md mx-auto">
              Wszystkie zrealizowane zamówienia są przesyłane bezpośrednio do bazy Supabase w tabeli <code>orders</code>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
