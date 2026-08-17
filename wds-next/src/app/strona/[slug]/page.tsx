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
    title: 'Blog & Poradnik Warsaw Durag Store',
    subtitle: 'Artykuły, kultura streetwear, porady pielęgnacji i 360 waves',
    content: (
      <div className="space-y-12 text-sm text-[#3B3C40] leading-relaxed font-light">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Article 1 */}
          <article className="bg-white border border-[#CFCFCF] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between p-6">
            <div className="space-y-3">
              <span className="text-[10px] text-[#734C1D] uppercase font-bold tracking-widest block">Poradnik Waves</span>
              <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Jak uzyskać idealne 360 waves z jedwabnym duragiem?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Kompleksowy przewodnik krok po kroku: od wyboru odpowiedniej szczotki z naturalnego włosia dzika, przez technikę szczotkowania, aż po kompresję jedwabiem 19 Momme na noc.
              </p>
            </div>
            <div className="pt-6 border-t border-[#CFCFCF]/40 mt-4">
              <Link href="/poradnik/wave-guide" className="text-xs font-bold text-[#734C1D] hover:underline flex items-center gap-1">
                Czytaj pełny przewodnik →
              </Link>
            </div>
          </article>

          {/* Article 2 */}
          <article className="bg-white border border-[#CFCFCF] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between p-6">
            <div className="space-y-3">
              <span className="text-[10px] text-[#734C1D] uppercase font-bold tracking-widest block">Materiały & Jakość</span>
              <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Jedwab morwowy 19 Momme vs Satyna i Welur</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dlaczego naturalny jedwab morwowy to złoty standard ochrony włosów przed puszeniem i łamaniem? Zobacz dokładne porównanie właściwości termoregulacyjnych i oddychalności.
              </p>
            </div>
            <div className="pt-6 border-t border-[#CFCFCF]/40 mt-4">
              <Link href="/strona/tabela-rozmiarow" className="text-xs font-bold text-[#734C1D] hover:underline flex items-center gap-1">
                Porównaj właściwości tkanin →
              </Link>
            </div>
          </article>

          {/* Article 3 */}
          <article className="bg-white border border-[#CFCFCF] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between p-6">
            <div className="space-y-3">
              <span className="text-[10px] text-[#734C1D] uppercase font-bold tracking-widest block">Pielęgnacja Tkanin</span>
              <h3 className="font-serif text-xl text-[#0D0D0B] font-medium">Jak prawidłowo prać i dbać o jedwabny durag?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Praktyczne wskazówki prania ręcznego w letniej wodzie z łagodnym szamponem lub płynem do jedwabiu. Jak zachować blask i gęstość 19 Momme przez lata użytkowania.
              </p>
            </div>
            <div className="pt-6 border-t border-[#CFCFCF]/40 mt-4">
              <Link href="/kolekcja/silk" className="text-xs font-bold text-[#734C1D] hover:underline flex items-center gap-1">
                Zobacz duragi jedwabne →
              </Link>
            </div>
          </article>

        </div>

        {/* Featured Blog Highlight */}
        <div className="bg-[#0D0D0B] text-white p-8 rounded-xl border border-[#D9A87E]/30 space-y-4">
          <span className="text-[#D9A87E] text-xs uppercase tracking-[0.2em] font-semibold">Historia i Streetwear</span>
          <h3 className="font-serif text-2xl font-medium">Kultura noszenia duraga — od lat 90. do współczesnego rzemiosła</h3>
          <p className="text-xs text-gray-300 font-light leading-relaxed">
            Durag przeszedł fascynującą drogę od funkcjonalnego nakrycia głowy chroniącego fale 360 i warkocze do ikonicznego elementu światowej mody i streetwearu. W Warsaw Durag Store łączymy tę bogatą tradycję z tradycyjnym rzemiosłem krawieckim i przedwojenną tradycją jedwabnictwa w Milanówku.
          </p>
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
          <li><strong>Wysyłka z Warszawy w 1 dzień:</strong> Ekspresowa realizacja zamówień złożonych do godz. 14:00.</li>
          <li><strong>Paczkomaty InPost 24/7 & Kurier:</strong> 0 PLN (Darmowa dostawa bez progu kwotowego dla każdego zamówienia). Czas doręczenia: 1–2 dni robocze.</li>
          <li><strong>Odbiór Osobisty w Warszawie:</strong> ul. Włodarzewska 4 lub Centrum (po wcześniejszym ustaleniu przez IG lub email).</li>
        </ul>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium mt-8">2. Promocja 2 + 1 Gratis</h3>
        <p>
          Wszystkie zakupy objęte są promocją zestawu: kupując 2 duragi w sklepie, trzeci model otrzymujesz automatycznie gratis! Promocja nalicza się w koszyku.
        </p>

        <h3 className="font-serif text-xl text-[#0D0D0B] font-medium mt-8">3. Prawo do Zwrotu (14 Dni)</h3>
        <p>
          Zgodnie z polską ustawą o prawach konsumenta masz prawo odstąpić od umowy sprzedaży w ciągu 14 dni od dnia otrzymania przesyłki bez podawania przyczyny. Zwracany produkt nie powinien nosić śladów użytkowania i powinien posiadać oryginalne metki. W celu zwrotu napisz do nas na adres: <strong>support@warsawduragstore.pl</strong>.
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
          Wszystkie duragi Warsaw Durag Store projektowane są w rozmiarze <strong>One-Size Unisex</strong> z wydłużonymi pasami (ok. 100 cm) dopasowanymi do każdego obwodu głowy, gwarantującymi bezpieczne i wygodne wiązanie bez ucisku na czoło.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F5F2] border-b border-[#CFCFCF]">
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Kategoria</th>
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Tkanina</th>
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Gramatura / Cechy</th>
                <th className="p-3 font-semibold uppercase text-[#0D0D0B]">Zastosowanie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFCFCF]/40">
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Jedwabne (Milanówek)</td>
                <td className="p-3">100% Czysty Jedwab Morwowy</td>
                <td className="p-3">19 Momme, gładkość, zero tarcia</td>
                <td className="p-3">Sen, ochrona fal 360, włosy kręcone</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Satynowe</td>
                <td className="p-3">Satyna Poliestrowa Premium</td>
                <td className="p-3">Wysoki połysk, lekkość, odporność</td>
                <td className="p-3">Codzienny streetwear, kompresja</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Welurowe</td>
                <td className="p-3">Mięsisty Welur Poliestrowy</td>
                <td className="p-3">Głęboka faktura, miękka podszewka</td>
                <td className="p-3">Stylizacje jesień/zima, mocna kompresja</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#0D0D0B]">Sezonowe</td>
                <td className="p-3">Cupro, Len, Krepa Satynowa</td>
                <td className="p-3">Naturalna termoregulacja i przewiewność</td>
                <td className="p-3">Wiosna/Lato, upały, lekki outfit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  regulamin: {
    title: 'Regulamin Sklepu Internetowego Warsaw Durag Store',
    subtitle: 'Zasady korzystania, składania zamówień, płatności, dostawy oraz prawa konsumenta',
    content: (
      <div className="space-y-6 text-sm text-[#3B3C40] leading-relaxed font-light">
        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">§ 1. Postanowienia Ogólne</h3>
          <p>
            1. Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego Warsaw Durag Store, dostępnego pod adresem <strong>warsawduragstore.pl</strong>.
          </p>
          <p>
            2. Sklep prowadzony jest przez markę Warsaw Durag Store z siedzibą w Warszawie przy ul. Włodarzewskiej 4, e-mail: <strong>support@warsawduragstore.pl</strong>.
          </p>
          <p>
            3. Sklep prowadzi sprzedaż detaliczną duragów i akcesoriów na terytorium Polski oraz Unii Europejskiej.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">§ 2. Ceny i Płatności</h3>
          <p>
            1. Wszystkie ceny produktów widoczne na stronie są podane w polskich złotych (PLN) i są cenami brutto.
          </p>
          <p>
            2. Klient może wybrać następujące metody płatności: szybkie płatności online (BLIK, karta płatnicza, PayU/Stripe), przelew tradycyjny oraz płatność przy odbiorze.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">§ 3. Dostawa i Realizacja Zamówień</h3>
          <p>
            1. Zamówienia wysyłane są w ciągu 1–2 dni roboczych z magazynu w Warszawie.
          </p>
          <p>
            2. Dostawa realizowana jest za pośrednictwem Paczkomatów InPost 24/7 oraz przesyłek kurierskich. Dostawa na terenie Polski dla wszystkich zamówień jest <strong>darmowa</strong>.
          </p>
          <p>
            3. Możliwy jest również bezpłatny odbiór osobisty w Warszawie (ul. Włodarzewska 4 lub Centrum) po wcześniejszym uzgodnieniu terminu.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">§ 4. Prawo do Odstąpienia od Umowy (Zwroty)</h3>
          <p>
            1. Konsument ma prawo odstąpić od umowy zawartej na odległość w terminie <strong>14 dni</strong> od dnia wejścia w posiadanie towaru, bez podawania przyczyny.
          </p>
          <p>
            2. Aby skorzystać z prawa do odstąpienia od umowy, należy poinformować Sklep drogą mailową: <strong>support@warsawduragstore.pl</strong>.
          </p>
          <p>
            3. Zwracany towar nie może nosić śladów użytkowania i powinien zostać odesłany w stanie kompletnym. Sklep zwraca wszystkie otrzymane od konsumenta płatności w terminie do 14 dni od otrzymania oświadczenia.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">§ 5. Reklamacje i Gwarancja</h3>
          <p>
            1. Sprzedawca odpowiada wobec Klienta za zgodność towaru z umową na zasadach określonych w przepisach Ustawy o prawach konsumenta oraz Kodeksu cywilnego.
          </p>
          <p>
            2. Reklamacje można zgłaszać na adres e-mail: <strong>support@warsawduragstore.pl</strong>. Reklamacje rozpatrywane są w terminie do 14 dni roboczych.
          </p>
        </section>
      </div>
    ),
  },

  'polityka-prywatnosci': {
    title: 'Polityka Prywatności & Informacja o RODO',
    subtitle: 'Zasady przetwarzania danych osobowych, pliki cookies oraz prawa osób, których dane dotyczą',
    content: (
      <div className="space-y-6 text-sm text-[#3B3C40] leading-relaxed font-light">
        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">1. Administrator Danych Osobowych</h3>
          <p>
            Administratorem Twoich danych osobowych jest <strong>Warsaw Durag Store</strong> z siedzibą w Warszawie przy ul. Włodarzewskiej 4. W sprawach związanych z ochroną danych osobowych możesz skontaktować się z nami pod adresem e-mail: <strong>support@warsawduragstore.pl</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">2. Cele i Podstawy Przetwarzania Danych</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Realizacja zamówienia:</strong> przetwarzanie imienia, nazwiska, adresu dostawy, numeru telefonu i emaila jest niezbędne do wykonania umowy sprzedaży (art. 6 ust. 1 lit. b RODO).</li>
            <li><strong>Obowiązki księgowo-podatkowe:</strong> wystawianie rachunków i dowodów zakupu (art. 6 ust. 1 lit. c RODO).</li>
            <li><strong>Newsletter i kontakt:</strong> przesyłanie informacji o nowościach i promocjach na podstawie Twojej dobrowolnej zgody (art. 6 ust. 1 lit. a RODO).</li>
            <li><strong>Prawnie uzasadniony interes:</strong> dochodzenie roszczeń lub obrona przed roszczeniami (art. 6 ust. 1 lit. f RODO).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">3. Odbiorcy Danych</h3>
          <p>
            Twoje dane mogą być przekazywane podmiotom świadczącym usługi na rzecz Sklepu: operatorom pocztowym i kurierskim (InPost, DPD), operatorom płatności online oraz dostawcom hostingu i infrastruktury technicznej.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">4. Prawa Użytkownika</h3>
          <p>
            Posiadasz prawo dostępu do treści swoich danych, ich sprostowania, usunięcia („prawo do bycia zapomnianym”), ograniczenia przetwarzania, prawo do przenoszenia danych oraz prawo wniesienia sprzeciwu. Masz również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO).
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-lg text-[#0D0D0B] font-medium">5. Pliki Cookies</h3>
          <p>
            Sklep korzysta z plików cookies w celach zapewnienia prawidłowego funkcjonowania koszyka zakupowego, utrzymania sesji oraz celach statystycznych. Możesz w każdej chwili zmienić ustawienia dotyczące cookies w swojej przeglądarce internetowej.
          </p>
        </section>
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
  const canonicalUrl = `https://warsawduragstore.pl/strona/${slug}`;

  return {
    title: `${pageData.title} | Warsaw Durag Store`,
    description: pageData.subtitle,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pageData.title} | Warsaw Durag Store`,
      description: pageData.subtitle,
      url: canonicalUrl,
    },
  };
}

export default async function StaticInfoPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = PAGES_DATA[slug];

  if (!pageData) {
    notFound();
  }

  const pageUrl = `https://warsawduragstore.pl/strona/${slug}`;

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona Główna',
        item: 'https://warsawduragstore.pl/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageData.title.split('—')[0].trim(),
        item: pageUrl,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

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
