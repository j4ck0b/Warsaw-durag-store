'use client';

import React, { useState } from 'react';
import { Lock, LogOut, Package, ShoppingBag, Plus, Edit, Trash2, CheckCircle2, Image as ImageIcon, X } from 'lucide-react';
import { getAllProducts, addProduct, updateProduct, deleteProduct, Product } from '@/lib/products';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [productsList, setProductsList] = useState<Product[]>(getAllProducts());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'silk' | 'satin' | 'velvet' | 'seasonal' | 'accessories'>('silk');
  const [categoryLabel, setCategoryLabel] = useState('100% Jedwab Morwowy (19 Momme)');
  const [material, setMaterial] = useState('100% Jedwab Morwowy (19 Momme)');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [colorName, setColorName] = useState('Obsidian Black');
  const [colorHex, setColorHex] = useState('#0A0A0A');

  // Orders Mock/Log Data
  const [orders] = useState([
    { id: 'WDS-9901', customer: 'Jan Kowalski', email: 'jan@example.com', item: 'Durag Milanówek — Jedwabny', total: '149.00 PLN', status: 'Wysłane (InPost 1D)', date: '17.08.2026' },
    { id: 'WDS-9902', customer: 'Pierre Dupont', email: 'pierre@paris.fr', item: 'Durag Łódź — Czarny Welur', total: '89.00 PLN', status: 'Pakowanie (EU Express)', date: '17.08.2026' },
    { id: 'WDS-9903', customer: 'Michael Weber', email: 'm.weber@berlin.de', item: 'Durag Wrocław — Satyna', total: '79.00 PLN', status: 'Zrealizowane', date: '16.08.2026' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'wds2026' || password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
      setProductsList([...getAllProducts()]);
    } else {
      setErrorMsg('Nieprawidłowe hasło dostępowe.');
    }
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setName('');
    setNameEn('');
    setSlug('');
    setPrice('');
    setCategory('silk');
    setCategoryLabel('100% Jedwab Morwowy (19 Momme)');
    setMaterial('100% Jedwab Morwowy (19 Momme)');
    setDescription('');
    setImages(['/assets/durag_silk_black.png']);
    setImageUrl('');
    setColorName('Classic Black');
    setColorHex('#0A0A0A');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setNameEn(product.nameEn || product.name);
    setSlug(product.slug);
    setPrice(product.price.toString());
    setCategory(product.category);
    setCategoryLabel(product.categoryLabel);
    setMaterial(product.material);
    setDescription(product.description);
    setImages(product.images && product.images.length > 0 ? product.images : ['/assets/durag_silk_black.png']);
    setImageUrl('');
    setColorName(product.colors[0]?.name || 'Classic Black');
    setColorHex(product.colors[0]?.hex || '#0A0A0A');
    setIsModalOpen(true);
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const numPrice = parseFloat(price) || 99.0;
    const finalImages = images.length > 0 ? images : ['/assets/durag_silk_black.png'];

    if (editingProductId) {
      updateProduct(editingProductId, {
        name,
        nameEn: nameEn || name,
        slug: finalSlug,
        price: numPrice,
        category,
        categoryLabel,
        material,
        description,
        images: finalImages,
        colors: [{ name: colorName, hex: colorHex }],
      });
    } else {
      addProduct({
        name,
        nameEn: nameEn || name,
        slug: finalSlug,
        price: numPrice,
        category,
        categoryLabel,
        material,
        description,
        images: finalImages,
        colors: [{ name: colorName, hex: colorHex }],
        reviews: []
      });
    }

    setProductsList([...getAllProducts()]);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć ten produkt ze sklepu?')) {
      deleteProduct(id);
      setProductsList([...getAllProducts()]);
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
            Panel Administratora WDS CMS
          </h1>
          <p className="text-xs text-center text-[#3B3C40] mb-6">
            Dostęp zastrzeżony do zarządzania sklepem Warsaw Durag Store.
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
                placeholder="Domyślne hasło: wds2026"
                className="w-full px-4 py-3 text-xs border border-[#CFCFCF] outline-none focus:border-[#734C1D] bg-[#F7F5F2]"
              />
            </div>

            {errorMsg && <p className="text-xs text-[#D32F2F] font-semibold">{errorMsg}</p>}

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
    <div className="min-h-screen bg-[#F7F5F2] py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Header */}
        <div className="bg-[#0D0D0B] text-white p-6 rounded-lg shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest bg-[#734C1D] text-white px-2 py-0.5 rounded font-bold">LIVE EU STORE</span>
              <span className="text-xs text-[#D9A87E]">WDS Content Management System</span>
            </div>
            <h1 className="font-serif text-2xl font-medium mt-1">Zarządzanie Katalogiem i Zamówieniami</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-[#D9A87E] text-[#0D0D0B] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-white transition-colors shadow-md"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Dodaj Nowy Durag</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Wyloguj</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
              activeTab === 'products' ? 'bg-[#0D0D0B] text-white shadow-md' : 'bg-white text-[#3B3C40] border border-[#CFCFCF]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Katalog Produktów ({productsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
              activeTab === 'orders' ? 'bg-[#0D0D0B] text-white shadow-md' : 'bg-white text-[#3B3C40] border border-[#CFCFCF]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Rejestr Zamówień ({orders.length})</span>
          </button>
        </div>

        {/* Tab Content: Products */}
        {activeTab === 'products' ? (
          <div className="bg-white p-6 border border-[#CFCFCF] rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-xl text-[#0D0D0B]">Aktywne Duragi i Akcesoria</h2>
                <p className="text-xs text-gray-500">Zarządzaj cenami, opisami, kategoriami i zdjęciami w czasie rzeczywistym.</p>
              </div>
              <button
                onClick={openAddModal}
                className="bg-[#0D0D0B] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded hover:bg-[#734C1D] transition-colors"
              >
                + Dodaj produkt
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider bg-gray-50">
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">Zdjęcie</th>
                    <th className="py-3 px-3">Nazwa</th>
                    <th className="py-3 px-3">Kategoria</th>
                    <th className="py-3 px-3">Materiał</th>
                    <th className="py-3 px-3 text-right">Cena</th>
                    <th className="py-3 px-3 text-center">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productsList.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono text-gray-400">#{p.id}</td>
                      <td className="py-3 px-3">
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden relative border">
                          <img src={p.images[0] || '/assets/durag_silk_black.png'} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#0D0D0B] block">{p.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">/produkt/{p.slug}</span>
                      </td>
                      <td className="py-3 px-3 uppercase text-[10px] font-bold text-gray-600">
                        <span className="bg-gray-100 px-2 py-0.5 rounded border">{p.category}</span>
                      </td>
                      <td className="py-3 px-3 text-[#734C1D] font-medium">{p.material}</td>
                      <td className="py-3 px-3 text-right font-bold text-[#0D0D0B]">{p.price.toFixed(2)} PLN</td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 bg-gray-100 hover:bg-[#734C1D] hover:text-white rounded text-gray-600 transition-colors"
                            title="Edytuj produkt"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white rounded text-red-600 transition-colors"
                            title="Usuń produkt"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Tab Content: Orders */
          <div className="bg-white p-6 border border-[#CFCFCF] rounded-lg shadow-sm">
            <h2 className="font-serif text-xl text-[#0D0D0B] mb-2">Ostatnie Zamówienia w Sklepie</h2>
            <p className="text-xs text-gray-500 mb-6">Wszystkie zamówienia z Europy spływające bezpośrednio z koszyka.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider bg-gray-50">
                    <th className="py-3 px-3">ID Zamówienia</th>
                    <th className="py-3 px-3">Klient</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Produkt</th>
                    <th className="py-3 px-3">Kwota</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-mono font-bold text-[#734C1D]">{o.id}</td>
                      <td className="py-3 px-3 font-semibold text-[#0D0D0B]">{o.customer}</td>
                      <td className="py-3 px-3 text-gray-500">{o.email}</td>
                      <td className="py-3 px-3 text-gray-700">{o.item}</td>
                      <td className="py-3 px-3 font-bold text-[#0D0D0B]">{o.total}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200">
                          <CheckCircle2 className="w-3 h-3" />
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-gray-400 font-mono">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative border">
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="font-serif text-2xl text-[#0D0D0B] mb-1 font-medium">
                {editingProductId ? 'Edytuj Produkt' : 'Dodaj Nowy Produkt'}
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Wypełnij szczegóły przedmiotu. Produkt natychmiast otrzyma stronę SEO oraz karty w sklepie.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Nazwa Produktu (PL)</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="np. Durag Poznań — Szafirowy Satynowy"
                      className="w-full p-2.5 border rounded outline-none focus:border-[#734C1D]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Nazwa Produktu (EN)</label>
                    <input
                      type="text"
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      placeholder="np. Durag Poznań Sapphire Satin"
                      className="w-full p-2.5 border rounded outline-none focus:border-[#734C1D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Cena (PLN)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="np. 99.00"
                      className="w-full p-2.5 border rounded outline-none focus:border-[#734C1D]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Kategoria</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 border rounded outline-none focus:border-[#734C1D] bg-white"
                    >
                      <option value="silk">Jedwabne (Silk)</option>
                      <option value="satin">Satynowe (Satin)</option>
                      <option value="velvet">Welurowe (Velvet)</option>
                      <option value="seasonal">Sezonowe (Seasonal)</option>
                      <option value="accessories">Akcesoria (Accessories)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Slug SEO (URL)</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="durag-poznan-szafirowy"
                      className="w-full p-2.5 border rounded outline-none focus:border-[#734C1D] font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Etykieta Kategorii</label>
                    <input
                      type="text"
                      value={categoryLabel}
                      onChange={(e) => setCategoryLabel(e.target.value)}
                      placeholder="100% Jedwab Morwowy 19 Momme"
                      className="w-full p-2.5 border rounded outline-none focus:border-[#734C1D]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Skład Materiału</label>
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      placeholder="Gładka Satyna Premium"
                      className="w-full p-2.5 border rounded outline-none focus:border-[#734C1D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Opis SEO & Historia Marki</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Opisz rzemiosło, pochodzenie i właściwości duraga dla klientów z Polski i Europy..."
                    className="w-full p-2.5 border rounded outline-none focus:border-[#734C1D]"
                  />
                </div>

                {/* Images Manager */}
                <div className="bg-gray-50 p-4 border rounded space-y-3">
                  <label className="block font-semibold uppercase text-[10px] text-gray-600">Zdjęcia Produktu (Galeria)</label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Wklej adres URL zdjęcia (np. /assets/durag_silk_black.png lub link https://...)"
                      className="flex-grow p-2 border rounded outline-none bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="bg-[#0D0D0B] text-white px-3 py-2 rounded text-xs font-semibold hover:bg-[#734C1D] transition-colors"
                    >
                      + Dodaj zdjęcie
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 border rounded overflow-hidden bg-white group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute inset-0 bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Variant */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 border rounded">
                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Nazwa Koloru Wariantu</label>
                    <input
                      type="text"
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                      placeholder="Obsidian Black / Pure White / Emerald"
                      className="w-full p-2.5 border rounded outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-gray-600 mb-1">Kod Koloru HEX</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={colorHex}
                        onChange={(e) => setColorHex(e.target.value)}
                        className="w-10 h-10 border rounded cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={colorHex}
                        onChange={(e) => setColorHex(e.target.value)}
                        className="flex-grow p-2.5 border rounded outline-none font-mono bg-white uppercase text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0D0D0B] text-white px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#734C1D] transition-colors shadow-md"
                  >
                    {editingProductId ? 'Zapisz Zmiany' : 'Opublikuj w Sklepie'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
