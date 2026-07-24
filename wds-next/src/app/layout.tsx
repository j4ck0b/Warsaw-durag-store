import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  metadataBase: new URL('https://warsaw-durag-store.vercel.app'),
  title: 'Duragi Premium z Jedwabiu i Aksamitu | Warsaw Durag Store — Warszawa',
  description: 'Ręcznie szyte duragi z czystego jedwabiu morwowego 19 Momme i aksamitu. Darmowa dostawa w Polsce, wysyłka 1–2 dni. Odkryj kolekcję Warsaw Durag Store →',
  keywords: ['durag', 'warsaw durag', 'waves 360', 'jedwabny durag', 'aksamitny durag', 'streetwear polska'],
  openGraph: {
    title: 'Duragi Premium z Jedwabiu i Aksamitu | Warsaw Durag Store — Warszawa',
    description: 'Ręcznie szyte duragi z jedwabiu morwowego 19 Momme i aksamitu. Darmowa dostawa w Polsce, wysyłka 1–2 dni z Warszawy.',
    url: 'https://warsaw-durag-store.vercel.app',
    siteName: 'Warsaw Durag Store',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duragi Premium z Jedwabiu i Aksamitu | Warsaw Durag Store — Warszawa',
    description: 'Ręcznie szyte duragi z jedwabiu morwowego 19 Momme i aksamitu. Darmowa dostawa w Polsce.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-white text-[#0D0D0B] font-sans antialiased selection:bg-[#734C1D] selection:text-white">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
