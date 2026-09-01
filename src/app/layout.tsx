import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pratika",
    template: "%s | Pratika",
  },
  description: siteConfig.description,
  applicationName: "Pratika",
  authors: [{ name: "akardev" }],
  creator: "akardev",
  publisher: "Pratika",
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Pratika | Modern Araçlar ve Hesaplama Platformu",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 588,
        height: 164,
        alt: "Pratika Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratika | Modern Araçlar ve Hesaplama Platformu",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand/pratika-icon.png",
    shortcut: "/brand/pratika-icon.png",
    apple: "/brand/pratika-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1D37",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // WebSite Structured Data (Schema.org)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "tr-TR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/araclar?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="tr"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <SiteChrome>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </SiteChrome>
      </body>
    </html>
  );
}
