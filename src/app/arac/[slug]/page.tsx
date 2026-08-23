import { tools } from '@/data/tools';
import { getArticlesByToolSlug } from '@/data/articles';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ToolCard from '@/components/ui/ToolCard';

// Mevcut 9 Araç
import IndirimHesaplama from '@/components/tools/IndirimHesaplama';
import YuzdeHesaplama from '@/components/tools/YuzdeHesaplama';
import YasHesaplama from '@/components/tools/YasHesaplama';
import KdvHesaplama from '@/components/tools/KdvHesaplama';
import KarMarjiHesaplama from '@/components/tools/KarMarjiHesaplama';
import ZamHesaplama from '@/components/tools/ZamHesaplama';
import KarZararHesaplama from '@/components/tools/KarZararHesaplama';
import FaizHesaplama from '@/components/tools/FaizHesaplama';
import MaliyetHesaplama from '@/components/tools/MaliyetHesaplama';

// Finans & Yatırım (5)
import KrediTaksitHesaplama from '@/components/tools/KrediTaksitHesaplama';
import RoiHesaplama from '@/components/tools/RoiHesaplama';
import KarPayiHesaplama from '@/components/tools/KarPayiHesaplama';
import EnflasyonHesaplama from '@/components/tools/EnflasyonHesaplama';
import VadeFarkiHesaplama from '@/components/tools/VadeFarkiHesaplama';

// İş & Ticaret (4)
import BasabasNoktasiHesaplama from '@/components/tools/BasabasNoktasiHesaplama';
import KomisyonHesaplama from '@/components/tools/KomisyonHesaplama';
import CiroHesaplama from '@/components/tools/CiroHesaplama';
import StokDevirHiziHesaplama from '@/components/tools/StokDevirHiziHesaplama';

// Matematik (6)
import OrtalamaHesaplama from '@/components/tools/OrtalamaHesaplama';
import AgirlikliOrtalamaHesaplama from '@/components/tools/AgirlikliOrtalamaHesaplama';
import OranOrantiHesaplama from '@/components/tools/OranOrantiHesaplama';
import KarekokHesaplama from '@/components/tools/KarekokHesaplama';
import UsHesaplama from '@/components/tools/UsHesaplama';
import EbobEkokHesaplama from '@/components/tools/EbobEkokHesaplama';

// Tarih & Zaman (3)
import TarihFarkiHesaplama from '@/components/tools/TarihFarkiHesaplama';
import TariheGunEkleme from '@/components/tools/TariheGunEkleme';
import IsGunuHesaplama from '@/components/tools/IsGunuHesaplama';

// Dönüşümler (5)
import UzunlukDonusturucu from '@/components/tools/UzunlukDonusturucu';
import AgirlikDonusturucu from '@/components/tools/AgirlikDonusturucu';
import AlanDonusturucu from '@/components/tools/AlanDonusturucu';
import SicaklikDonusturucu from '@/components/tools/SicaklikDonusturucu';
import VeriBirimiDonusturucu from '@/components/tools/VeriBirimiDonusturucu';

// Günlük Hayat & Sağlık (4)
import BmiHesaplama from '@/components/tools/BmiHesaplama';
import SuIhtiyaciHesaplama from '@/components/tools/SuIhtiyaciHesaplama';
import YakitMaliyetiHesaplama from '@/components/tools/YakitMaliyetiHesaplama';
import ElektrikTuketimMaliyetiHesaplama from '@/components/tools/ElektrikTuketimMaliyetiHesaplama';

// Maaş & Çalışma (3)
import SaatUcretiHesaplama from '@/components/tools/SaatUcretiHesaplama';
import FazlaMesaiHesaplama from '@/components/tools/FazlaMesaiHesaplama';
import GunlukUcretHesaplama from '@/components/tools/GunlukUcretHesaplama';

// Metin Araçları (4)
import KelimeSayaci from '@/components/tools/KelimeSayaci';
import BuyukKucukHarfDonusturucu from '@/components/tools/BuyukKucukHarfDonusturucu';
import SlugOlusturucu from '@/components/tools/SlugOlusturucu';
import LoremIpsumOlusturucu from '@/components/tools/LoremIpsumOlusturucu';

// Developer & Kodlama (4)
import JsonFormatlayici from '@/components/tools/JsonFormatlayici';
import Base64Donusturucu from '@/components/tools/Base64Donusturucu';
import UrlEncodeDecode from '@/components/tools/UrlEncodeDecode';
import UuidOlusturucu from '@/components/tools/UuidOlusturucu';

// Tasarım ve Renk (2)
import QrKodOlusturucu from '@/components/tools/QrKodOlusturucu';
import RenkDonusturucu from '@/components/tools/RenkDonusturucu';

// Güvenlik ve Utility (1)
import GuvenliSifreOlusturucu from '@/components/tools/GuvenliSifreOlusturucu';

// Görsel ve Medya (1)
import SosyalMedyaGorselBoyutlari from '@/components/tools/SosyalMedyaGorselBoyutlari';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return tools
    .filter((t) => t.status === 'active')
    .map((tool) => ({
      slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = tools.find((t) => t.slug === resolvedParams.slug);

  if (!tool) {
    return {
      title: 'Araç Bulunamadı | Pratika',
    };
  }

  const title = `${tool.title} | Pratika`;
  const description = tool.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/arac/${tool.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/arac/${tool.slug}`,
      type: 'website',
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params;
  const tool = tools.find((t) => t.slug === resolvedParams.slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = tools.filter((t) => t.id !== tool.id && t.categoryId === tool.categoryId).slice(0, 4);
  const fallbackRelatedTools = relatedTools.length > 0 ? relatedTools : tools.filter((t) => t.id !== tool.id).slice(0, 4);
  const relatedArticles = getArticlesByToolSlug(tool.slug);

  // WebApplication JSON-LD Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    url: `${siteConfig.url}/arac/${tool.slug}`,
    description: tool.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Araçlar', href: '/araclar' },
          { label: tool.title },
        ]}
      />

      {/* Başlık Alanı */}
      <div className="mb-8 border-b border-border/60 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          {tool.title}
        </h1>
        <p className="text-base text-muted-foreground">
          {tool.description}
        </p>
      </div>

      <div className="mb-14">
        {/* Mevcut 9 Araç */}
        {tool.slug === 'indirim-hesaplama' && <IndirimHesaplama />}
        {tool.slug === 'yuzde-hesaplama' && <YuzdeHesaplama />}
        {tool.slug === 'yas-hesaplama' && <YasHesaplama />}
        {tool.slug === 'kdv-hesaplama' && <KdvHesaplama />}
        {tool.slug === 'kar-marji-hesaplama' && <KarMarjiHesaplama />}
        {tool.slug === 'zam-hesaplama' && <ZamHesaplama />}
        {tool.slug === 'kar-zarar-hesaplama' && <KarZararHesaplama />}
        {tool.slug === 'faiz-hesaplama' && <FaizHesaplama />}
        {tool.slug === 'maliyet-hesaplama' && <MaliyetHesaplama />}

        {/* Finans & Yatırım (5) */}
        {tool.slug === 'kredi-taksit-hesaplama' && <KrediTaksitHesaplama />}
        {tool.slug === 'roi-hesaplama' && <RoiHesaplama />}
        {tool.slug === 'kar-payi-hesaplama' && <KarPayiHesaplama />}
        {tool.slug === 'enflasyon-hesaplama' && <EnflasyonHesaplama />}
        {tool.slug === 'vade-farki-hesaplama' && <VadeFarkiHesaplama />}

        {/* İş & Ticaret (4) */}
        {tool.slug === 'basabas-noktasi-hesaplama' && <BasabasNoktasiHesaplama />}
        {tool.slug === 'komisyon-hesaplama' && <KomisyonHesaplama />}
        {tool.slug === 'ciro-hesaplama' && <CiroHesaplama />}
        {tool.slug === 'stok-devir-hizi-hesaplama' && <StokDevirHiziHesaplama />}

        {/* Matematik (6) */}
        {tool.slug === 'ortalama-hesaplama' && <OrtalamaHesaplama />}
        {tool.slug === 'agirlikli-ortalama-hesaplama' && <AgirlikliOrtalamaHesaplama />}
        {tool.slug === 'oran-oranti-hesaplama' && <OranOrantiHesaplama />}
        {tool.slug === 'karekok-hesaplama' && <KarekokHesaplama />}
        {tool.slug === 'us-hesaplama' && <UsHesaplama />}
        {tool.slug === 'ebob-ekok-hesaplama' && <EbobEkokHesaplama />}

        {/* Tarih & Zaman (3) */}
        {tool.slug === 'tarih-farki-hesaplama' && <TarihFarkiHesaplama />}
        {tool.slug === 'tarihe-gun-ekleme' && <TariheGunEkleme />}
        {tool.slug === 'is-gunu-hesaplama' && <IsGunuHesaplama />}

        {/* Dönüşümler (5) */}
        {tool.slug === 'uzunluk-donusturucu' && <UzunlukDonusturucu />}
        {tool.slug === 'agirlik-donusturucu' && <AgirlikDonusturucu />}
        {tool.slug === 'alan-donusturucu' && <AlanDonusturucu />}
        {tool.slug === 'sicaklik-donusturucu' && <SicaklikDonusturucu />}
        {tool.slug === 'veri-birimi-donusturucu' && <VeriBirimiDonusturucu />}

        {/* Günlük Hayat & Sağlık (4) */}
        {tool.slug === 'bmi-hesaplama' && <BmiHesaplama />}
        {tool.slug === 'su-ihtiyaci-hesaplama' && <SuIhtiyaciHesaplama />}
        {tool.slug === 'yakit-maliyeti-hesaplama' && <YakitMaliyetiHesaplama />}
        {tool.slug === 'elektrik-tuketim-maliyeti-hesaplama' && <ElektrikTuketimMaliyetiHesaplama />}

        {/* Maaş & Çalışma (3) */}
        {tool.slug === 'saat-ucreti-hesaplama' && <SaatUcretiHesaplama />}
        {tool.slug === 'fazla-mesai-hesaplama' && <FazlaMesaiHesaplama />}
        {tool.slug === 'gunluk-ucret-hesaplama' && <GunlukUcretHesaplama />}

        {/* Metin Araçları (4) */}
        {tool.slug === 'kelime-sayaci' && <KelimeSayaci />}
        {tool.slug === 'buyuk-kucuk-harf-donusturucu' && <BuyukKucukHarfDonusturucu />}
        {tool.slug === 'slug-olusturucu' && <SlugOlusturucu />}
        {tool.slug === 'lorem-ipsum-olusturucu' && <LoremIpsumOlusturucu />}

        {/* Developer & Kodlama (4) */}
        {tool.slug === 'json-formatlayici' && <JsonFormatlayici />}
        {tool.slug === 'base64-donusturucu' && <Base64Donusturucu />}
        {tool.slug === 'url-encode-decode' && <UrlEncodeDecode />}
        {tool.slug === 'uuid-olusturucu' && <UuidOlusturucu />}

        {/* Tasarım ve Renk (2) */}
        {tool.slug === 'qr-kod-olusturucu' && <QrKodOlusturucu />}
        {tool.slug === 'renk-donusturucu' && <RenkDonusturucu />}

        {/* Güvenlik ve Utility (1) */}
        {tool.slug === 'guvenli-sifre-olusturucu' && <GuvenliSifreOlusturucu />}

        {/* Görsel ve Medya (1) */}
        {tool.slug === 'sosyal-medya-gorsel-boyutlari' && <SosyalMedyaGorselBoyutlari />}
      </div>

      {/* İlgili Bilgiler (Bilgi Merkezi İçerikleri) */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-border/60 pt-10 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              İlgili Bilgiler
            </h2>
            <Link
              href="/bilgi"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              aria-label="Tüm Bilgi Merkezi içeriklerini gör"
            >
              Bilgi Merkezi &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((ra) => (
              <Link
                key={ra.id}
                href={`/bilgi/${ra.slug}`}
                className="group block p-5 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-xs transition-all"
                aria-label={`${ra.title} bilgi içeriğini oku`}
              >
                <span className="text-xs font-semibold text-primary mb-1 block">
                  {ra.category}
                </span>
                <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors mb-1">
                  {ra.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {ra.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* İlgili Araçlar */}
      {fallbackRelatedTools.length > 0 && (
        <div className="border-t border-border/60 pt-10 mt-10">
          <h2 className="text-lg font-bold tracking-tight text-foreground mb-4">
            İlgili Araçlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fallbackRelatedTools.map((rt) => (
              <ToolCard key={rt.id} tool={rt} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
