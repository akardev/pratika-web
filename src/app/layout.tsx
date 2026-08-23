import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pratika | Modern Araçlar ve Hesaplama Platformu",
    template: "%s | Pratika",
  },
  description: "Günlük hayatınızı kolaylaştıran modern araçlar ve hesaplama platformu. Aradığınız sonucu saniyeler içinde bulun.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://pratika.com",
    siteName: "Pratika",
    title: "Pratika | Modern Araçlar ve Hesaplama Platformu",
    description: "Günlük hayatınızı kolaylaştıran modern araçlar ve hesaplama platformu. Aradığınız sonucu saniyeler içinde bulun.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratika | Modern Araçlar ve Hesaplama Platformu",
    description: "Günlük hayatınızı kolaylaştıran modern araçlar ve hesaplama platformu. Aradığınız sonucu saniyeler içinde bulun.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
