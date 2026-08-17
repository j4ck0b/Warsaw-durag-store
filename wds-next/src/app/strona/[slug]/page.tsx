import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TrustBanner from '@/components/TrustBanner';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PAGES_DATA: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  'o-nas': {
    title: 'O nas — Warsaw Durag Store',
    subtitle: 'Historia polskiej marki tworzonej przez dwóch braci od 2020 roku',
    content: (
      <div className="space-y-8 text-sm text-[#3B3C40] leading-relaxed font-light">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-[#CFCFCF]">
          <Image
            src="/assets/lookbook_editorial.png"
            alt="Kuba i brat - założyciele Warsaw Durag Store"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-base text-[#0D0D0B] font-serif leading-relaxed">
          Warsaw Durag Store powstał w 2020 roku z potrzeby stworzenia miejsca, które przybliży duragi polskiej społeczności i pokaże ich różnorodność — nie tylko jako elementu stylu, ale również praktycznego dodatku z własną historią i charakterem.
        </p>

        <p>
          Od tego czasu stale rozwijamy naszą ofertę, poszerzając ją o kolejne materiały, kolory i modele, szukając nowych sposobów na pokazanie, czym może być współczesny durag. Jesteśmy małym butikiem prowadzonym przez dwóch braci, którym często pomagają również nasi znajomi. Dzięki temu każdy produkt przechodzi przez nasze ręce — od wyboru materiału, przez przygotowanie zamówienia, aż po kontakt z klientem. Dokładamy wszelkich starań, aby każda klientka i każdy klient otrzymywali nie tylko świetny produkt, lecz także dobrą i indywidualną obsługę.
        </p>

        <div className="bg-[#F7F5F2] p-6 rounded-xl border border-[#CFCFCF] space-y-3">
          <h4 className="font-serif text-lg font-medium text-[#0D0D0B]">Współpraca z artystami i sportowcami</h4>
          <p>
            Chcemy, aby Warsaw Durag Store był wsparciem dla artystów, sportowców i wszystkich osób, które poprzez swój styl wyrażają siebie, dlatego chętnie nawiązujemy z nimi współprace - robisz coś w sporcie, modzie lub muzyce pisz do nas po paczkę niespodziankę!
          </p>
        </div>

        <div className="bg-[#0D0D0B] text-white p-6 rounded-xl space-y-2 border border-[#D9A87E]/30">
          <h4 className="font-serif text-lg font-medium text-[#D9A87E]">Odbiór Osobisty w Warszawie</h4>
          <p className="text-xs text-gray-300">
            Na razie nie prowadzimy własnego sklepu stacjonarnego, jednak nasze duragi można odebrać osobiście przy ul. Włodarzewskiej 4 lub w centrum Warszawy — po wcześniejszym umówieniu.
          </p>
          <p className="text-xs text-gray-300 pt-2">
            Instagram: <strong>@warsawduragstore</strong> | Mail: <strong>support@warsawduragstore.pl</strong>
          </p>
        </div>
      </div>
    ),
  },

  kontakt: {
    title: 'Kontakt & Odbiór Osobisty',
    subtitle: 'Napisz do nas lub umów się na odbiór osobisty w Warszawie',
    content: (
      <div className="space-y-8 text-sm text-[#3B3C40] leading-relaxed font-light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F7F5F2] p-8 rounded-xl border border-[#CFCFCF] space-y-4">
            <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Odbiór Osobisty Warszawa</h3>
            <p>Duragi można odebrać osobiście po wcześniejszym ustaleniu godziny:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium text-[#0D0D0B]">
              <li>ul. Włodarzewska 4, Warszawa</li>
              <li>Centrum Warszawy (do uzgodnienia)</li>
            </ul>
            <p className="text-xs text-[#734C1D] pt-2 font-semibold">
              Najszybciej skontaktujesz się z nami przez wiadomość na Instagramie!
            </p>
          </div>

          <div className="bg-[#F7F5F2] p-8 rounded-xl border border-[#CFCFCF] space-y-4">
            <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Dane Kontaktowe</h3>
            <div className="space-y-2 text-xs">
              <p><strong>Instagram:</strong> @warsawduragstore</p>
              <p><strong>E-mail:</strong> support@warsawduragstore.pl</p>
              <p><strong>Godziny odpowiedzi:</strong> Pn–Sob: 9:00 – 20:00</p>
            </div>
            <div className="pt-4">
              <a
                href="https://instagram.com/warsawduragstore"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#0D0D0B] text-white px-6 py-3 rounded-full text-xs uppercase font-bold tracking-wider hover:bg-[#734C1D] transition-colors"
              >
                Napisz na Instagramie
              </a>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  blog: {
    title: 'Blog Warsaw Durag Store',
    subtitle: 'Artykuły, kultura streetwear, porady pielęgnacji 360 waves',
    content: (
      <div className="space-y-8 text-sm text-[#3B3C40] leading-relaxed font-light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#CFCFCF] rounded-xl overflow-hidden shadow-sm space-y-4 p-6">
            <span className="text-[10px] text-[#734C1D] uppercase font-bold tracking-widest block">Poradnik Waves</span>
            <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Jak uzyskać idealne 360 waves z jedwabnym duragiem?</h3>
            <p className="text-xs text-gray-600">
              Kompleksowy przewodnik po kompresji, używaniu szczotki z włosia dzika i znaczeniu jedwabiu 19 Momme podczas snu.
            </p>
            <Link href="/poradnik/wave-guide" className="text-xs font-bold text-[#0D0D0B] underline block pt-2">
              Czytaj poradnik →
            </Link>
          </div>

          <div className="bg-white border border-[#CFCFCF] rounded-xl overflow-hidden shadow-sm space-y-4 p-6">
            <span className="text-[10px] text-[#734C1D] uppercase font-bold tracking-widest block">Materiały & Jakość</span>
            <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Jedwab vs Satyna vs Welur — Co wybrać?</h3>
            <p className="text-xs text-gray-600">
              Dowiedz się, który materiał najlepiej sprawdzi się w Twojej codziennej stylizacji oraz podczas nocy.
            </p>
            <Link href="/strona/tabela-rozmiarow" className="text-xs font-bold text-[#0D0D0B] underline block pt-2">
              Porównaj materiały →
            </Link>
          </div>
        </div>
      </div>
    ),
  },

  'dostawa-i-zwroty': {
    title: 'Dostawa i Zwroty',
    subtitle: 'Wszystkie informacje o wysyłce InPost, Kurierem oraz prawie do zwrotu',
    content: (
      <div className="space-y-6 text-sm text-[#3B3C40] leading-relaxed font-light">
        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">1. Opcje i Koszty Dostawy</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Wysyłka z Warszawy w 1 dzień:</strong> Ekspresowa realizacja zamówień.</li>
          <li><strong>Paczkomaty InPost 24/7 & Kurier:</strong> 0 PLN (Darmowa dostawa bez progu kwotowego). Czas doręczenia: 1–2 dni.</li>
          <li><strong>Odbiór Osobisty w Warszawie:</strong> ul. Włodarzewska 4 lub Centrum (po wcześniejszym ustaleniu).</li>
        </ul>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium mt-8">2. Promocja 2 + 1 Gratis</h3>
        <p>
          Wszystkie zakupy objęte są promocją zestawu: kupując 2 duragi w sklepie, trzeci model otrzymujesz automatycznie gratis!
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium mt-8">3. Prawo do Zwrotu (14 Dni)</h3>
        <p>
          Zgodnie z polskim prawem konsumenckim masz prawo odstąpić od umowy sprzedaży w ciągu 14 dni od dnia otrzymania paczki bez podawania jakiejkolwiek przyczyny. Zwracany produkt nie powinien nosić śladów użytkowania.
        </p>
      </div>
    ),
  },

  'tabela-rozmiarow': {
    title: 'Tabela Rozmiarów & Specyfikacja Materiałów',
    subtitle: 'Wymiary pasów, gęstość jedwabiu 19 Momme i ergonomia szwów',
    content: (
      <div className="space-y-6 text-sm text-[#3B3C40] leading-relaxed font-light">
        <p>
          Wszystkie duragi Warsaw Durag Store projektowane są w rozmiarze <strong>One-Size Unisex</strong> z wydłużonymi pasami dopasowanymi do każdego obwodu głowy.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F5F2] border-b border-[#CFCFCF]">
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Kategoria</th>
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Tkanina</th>
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Cechy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFCFCF]/40">
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Jedwabne (Milanówek)</td>
                <td className="p-3">100% Czysty Jedwab Morwowy (19 Momme)</td>
                <td className="p-3">Gładkość, ochrona włosa przed puszeniem, zero tarcia</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Satynowe</td>
                <td className="p-3">Satyna Poliestrowa Premium</td>
                <td className="p-3">Trwałość, lekkość, wysoki połysk na co dzień</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Welurowe</td>
                <td className="p-3">Mięsisty Welur Poliestrowy</td>
                <td className="p-3">Grubsza struktura, miękkość, wyrazisty styl</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Sezonowe</td>
                <td className="p-3">Cupro, Len, Krepa Satynowa Mirella</td>
                <td className="p-3">Dopasowane do temperatury i pory roku</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  regulamin: {
    title: 'Regulamin Sklepu Internetowego',
    subtitle: 'Zasady korzystania, składania zamówień oraz prawa konsumenta',
    content: (
      <div className="space-y-6 text-sm text-[#3B3C40] leading-relaxed font-light">
        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">§ 1 Postanowienia Ogólne</h3>
        <p>
          Sklep internetowy działający pod adresem warsaw-durag-store.vercel.app prowadzony jest przez Warsaw Durag Store w Warszawie (Email: support@warsawduragstore.pl).
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">§ 2 Składanie i Realizacja Zamówień</h3>
        <p>
          Zamówienia można składać 24 godziny na dobę przez serwis internetowy. Ceny produktów są cenami brutto wyrażonymi w złotych polskich (PLN).
        </p>
      </div>
    ),
  },

  'polityka-prywatnosci': {
    title: 'Polityka Prywatności & RODO',
    subtitle: 'Zasady przetwarzania danych osobowych oraz wykorzystania plików cookies',
    content: (
      <div className="space-y-6 text-sm text-[#3B3C40] leading-relaxed font-light">
        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Administrator Danych Osobowych</h3>
        <p>
          Administratorem Twoich danych osobowych jest Warsaw Durag Store z siedzibą w Warszawie. Kontakt w sprawach ochrony danych: support@warsawduragstore.pl.
        </p>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'o-nas' },
    { slug: 'kontakt' },
    { slug: 'blog' },
    { slug: 'dostawa-i-zwroty' },
    { slug: 'tabela-rozmiarow' },
    { slug: 'regulamin' },
    { slug: 'polityka-prywatnosci' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = PAGES_DATA[slug];
  if (!pageData) return { title: 'Strona | Warsaw Durag Store' };
  return {
    title: `${pageData.title} | Warsaw Durag Store`,
    description: pageData.subtitle,
  };
}

export default async function StaticInfoPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = PAGES_DATA[slug];

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      <section className="bg-[#0D0D0B] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#D9A87E] text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
            [ warsaw durag store info ]
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium mb-3">
            {pageData.title}
          </h1>
          <p className="text-xs text-gray-300 font-light">{pageData.subtitle}</p>
        </div>
      </section>

      <TrustBanner />

      <main className="max-w-4xl mx-auto px-6 py-16">
        {pageData.content}
      </main>
    </div>
  );
}
