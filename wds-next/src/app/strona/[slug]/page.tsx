import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TrustBanner from '@/components/TrustBanner';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PAGES_DATA: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  'dostawa-i-zwroty': {
    title: 'Dostawa i Zwroty',
    subtitle: 'Wszystkie informacje o wysyłce InPost, Kurierem oraz prawie do zwrotu',
    content: (
      <div className="space-y-6 text-sm text-[#3B3C40] leading-relaxed font-light">
        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">1. Opcje i Koszty Dostawy</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Paczkomaty InPost 24/7:</strong> 0 PLN (Darmowa dostawa bez progu kwotowego). Czas doręczenia: 1–2 dni robocze.</li>
          <li><strong>Kurier InPost / DPD:</strong> 0 PLN (Darmowa dostawa). Czas doręczenia: 1–2 dni robocze.</li>
          <li><strong>Odbiór Stacjonarny Showroom Warszawa:</strong> ul. Mokotowska 42, 00-543 Warszawa (Poniedziałek – Sobota, 11:00–19:00).</li>
        </ul>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium mt-8">2. Prawo do Zwrotu (14 Dni)</h3>
        <p>
          Zgodnie z polskim prawem konsumenckim masz prawo odstąpić od umowy sprzedaży w ciągu 14 dni od dnia otrzymania paczki bez podawania jakiejkolwiek przyczyny. Zwracany produkt nie powinien nosić śladów użytkowania i musi posiadać komplet oryginalnych metek.
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium mt-8">3. Jak Dokonać Zwrotu Krok po Kroku</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Spakuj bezpiecznie produkt wraz z numerem zamówienia lub formularzem zwrotu.</li>
          <li>Wyślij paczkę na adres: <strong>Warsaw Durag Store, ul. Mokotowska 42, 00-543 Warszawa</strong>.</li>
          <li>Środki zostaną zwrócone tą samą metodą płatności w ciągu 3–5 dni roboczych od odebrania przesyłki.</li>
        </ol>
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
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Parametr</th>
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Kolekcja Silk (Jedwab)</th>
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Kolekcja Velvet (Aksamit)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFCFCF]/40">
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Główny Materiał</td>
                <td className="p-3">100% Czysty Jedwab Morwowy (19 Momme)</td>
                <td className="p-3">Welwet Premium + Satynowa Podszewka</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Długość pasów</td>
                <td className="p-3">100 cm (podwójne owinięcie na płasko)</td>
                <td className="p-3">105 cm (podwójne owinięcie)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Szerokość pasów</td>
                <td className="p-3">8 cm (rozłożony nacisk na czole)</td>
                <td className="p-3">8.5 cm (bezuciskowa kompresja)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Konstrukcja szwów</td>
                <td className="p-3">Zewnętrzne szwy bezodciskowe</td>
                <td className="p-3">Zewnętrzne szwy z wzmocnionym brzegiem</td>
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
          Sklep internetowy działający pod adresem warsaw-durag-store.vercel.app prowadzony jest przez Warsaw Durag Store z siedzibą przy ul. Mokotowskiej 42, 00-543 Warszawa (Email: contact@warsawduragstore.pl).
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">§ 2 Składanie i Realizacja Zamówień</h3>
        <p>
          Zamówienia można składać 24 godziny na dobę przez serwis internetowy. Ceny produktów są cenami brutto wyrażonymi w złotych polskich (PLN).
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">§ 3 Płatności i Dostawa</h3>
        <p>
          Sklep umożliwia płatności elektroniczne, przelew oraz karty płatnicze. Dostawa realizowana jest bezpłatnie na terenie Rzeczypospolitej Polskiej za pośrednictwem operatora InPost.
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">§ 4 Reklamacje i Rękojmia</h3>
        <p>
          W przypadku ujawnienia wady fizycznej lub prawnej towaru, kupujący ma prawo do zgłoszenia reklamacji. Zgłoszenia reklamacyjne należy kierować na e-mail: contact@warsawduragstore.pl.
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
          Administratorem Twoich danych osobowych jest Warsaw Durag Store z siedzibą w Warszawie przy ul. Mokotowskiej 42. Kontakt w sprawach ochrony danych: contact@warsawduragstore.pl.
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Cel Przetwarzania</h3>
        <p>
          Dane przetwarzane są wyłącznie w celu realizacji umowy sprzedaży (Art. 6 ust. 1 lit. b RODO), obsługi konta klienta oraz wysyłki newslettera na podstawie dobrowolnej zgody.
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Pliki Cookies</h3>
        <p>
          Serwis wykorzystuje pliki cookies w celu prawidłowego działania sesji koszyka zakupowego oraz do celów analitycznych. Masz prawo w każdej chwili zmienić ustawienia plików cookies w swojej przeglądarce.
        </p>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return [
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
