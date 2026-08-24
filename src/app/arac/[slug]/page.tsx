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

// Maaş & Çalışma (12)
import KidemTazminatiHesaplama from '@/components/tools/KidemTazminatiHesaplama';
import IhbarTazminatiHesaplama from '@/components/tools/IhbarTazminatiHesaplama';
import KidemIhbarHesaplama from '@/components/tools/KidemIhbarHesaplama';
import YillikIzinHesaplama from '@/components/tools/YillikIzinHesaplama';
import KullanilmayanIzinUcretiHesaplama from '@/components/tools/KullanilmayanIzinUcretiHesaplama';
import IhbarSuresiHesaplama from '@/components/tools/IhbarSuresiHesaplama';
import NettenBruteMaasHesaplama from '@/components/tools/NettenBruteMaasHesaplama';
import BruttenNeteMaasHesaplama from '@/components/tools/BruttenNeteMaasHesaplama';
import IseGirisCikisSuresiHesaplama from '@/components/tools/IseGirisCikisSuresiHesaplama';
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
import SosyalMedyaGorselBoyutlandirici from '@/components/tools/SosyalMedyaGorselBoyutlandirici';

// PDF ve Dosya Araçları (9)
import PdfBirlestir from '@/components/tools/PdfBirlestir';
import PdfBol from '@/components/tools/PdfBol';
import PdfSayfaSil from '@/components/tools/PdfSayfaSil';
import PdfSayfaDondur from '@/components/tools/PdfSayfaDondur';
import GorselleriPdfYap from '@/components/tools/GorselleriPdfYap';
import JpgPdfDonusturucu from '@/components/tools/JpgPdfDonusturucu';
import PdfSayfaCikar from '@/components/tools/PdfSayfaCikar';
import PdfJpgDonusturucu from '@/components/tools/PdfJpgDonusturucu';
import MetniPdfDonusturucu from '@/components/tools/MetniPdfDonusturucu';

// --- 100+ YENİ ARAÇ IMPORTLARI ---
// Batch 1: İş, Maaş & Kariyer
import IsverenMaliyetiHesaplama from '@/components/tools/IsverenMaliyetiHesaplama';
import MaasZamFarkiHesaplama from '@/components/tools/MaasZamFarkiHesaplama';
import DenemeSuresiHesaplama from '@/components/tools/DenemeSuresiHesaplama';
import AsgariUcretKarsilastirma from '@/components/tools/AsgariUcretKarsilastirma';
import EmeklilikYasiHesaplama from '@/components/tools/EmeklilikYasiHesaplama';
import KidemSuresiHesaplama from '@/components/tools/KidemSuresiHesaplama';
import PartTimeUcretHesaplama from '@/components/tools/PartTimeUcretHesaplama';
import IseAlimMaliyetiHesaplama from '@/components/tools/IseAlimMaliyetiHesaplama';
import GunlukYemekYolUcretiHesaplama from '@/components/tools/GunlukYemekYolUcretiHesaplama';
import BesHesaplama from '@/components/tools/BesHesaplama';
import IstenAyrilmaBildirimSuresi from '@/components/tools/IstenAyrilmaBildirimSuresi';
import SerbestMeslekMakbuzuHesaplama from '@/components/tools/SerbestMeslekMakbuzuHesaplama';

// Batch 2: Finans & Birikim
import BilesikFaizHesaplama from '@/components/tools/BilesikFaizHesaplama';
import AylikBirikimTasarrufHesaplama from '@/components/tools/AylikBirikimTasarrufHesaplama';
import TasarrufHedefiHesaplama from '@/components/tools/TasarrufHedefiHesaplama';
import PesinTaksitKarsilastirma from '@/components/tools/PesinTaksitKarsilastirma';
import AlimGucuHesaplama from '@/components/tools/AlimGucuHesaplama';
import AltinKarZararHesaplama from '@/components/tools/AltinKarZararHesaplama';
import DovizKarZararHesaplama from '@/components/tools/DovizKarZararHesaplama';
import BorcKapatmaKredisiHesaplama from '@/components/tools/BorcKapatmaKredisiHesaplama';
import MevduatGetirisiNetStopaj from '@/components/tools/MevduatGetirisiNetStopaj';
import KrediErkenKapamaHesaplama from '@/components/tools/KrediErkenKapamaHesaplama';
import FonGetiriHesaplama from '@/components/tools/FonGetiriHesaplama';
import TemettuVerimiHesaplama from '@/components/tools/TemettuVerimiHesaplama';
import GunlukFaizHesaplama from '@/components/tools/GunlukFaizHesaplama';
import AmortismanHesaplama from '@/components/tools/AmortismanHesaplama';

// Batch 3: Vergi, Ticaret & Alışveriş
import IskontoHesaplama from '@/components/tools/IskontoHesaplama';
import PazaryeriKomisyonKarHesaplama from '@/components/tools/PazaryeriKomisyonKarHesaplama';
import OtvHesaplama from '@/components/tools/OtvHesaplama';
import TevkifatKdvHesaplama from '@/components/tools/TevkifatKdvHesaplama';
import BirimFiyatKarsilastirma from '@/components/tools/BirimFiyatKarsilastirma';
import KampanyaFiyatHesaplama from '@/components/tools/KampanyaFiyatHesaplama';
import MarkupFiyatlandirmaHesaplama from '@/components/tools/MarkupFiyatlandirmaHesaplama';
import GumrukVergisiHesaplama from '@/components/tools/GumrukVergisiHesaplama';
import DamgaVergisiHesaplama from '@/components/tools/DamgaVergisiHesaplama';
import PesinatsizTaksitTutariHesaplama from '@/components/tools/PesinatsizTaksitTutariHesaplama';
import KiraArtisOraniHesaplama from '@/components/tools/KiraArtisOraniHesaplama';
import KiraGelirVergisiHesaplama from '@/components/tools/KiraGelirVergisiHesaplama';

// Batch 4: Eğitim, Sınav & Not Hesaplama
import VizeFinalHesaplama from '@/components/tools/VizeFinalHesaplama';
import FinaldeKacAlmaliyim from '@/components/tools/FinaldeKacAlmaliyim';
import GpaGanoHesaplama from '@/components/tools/GpaGanoHesaplama';
import NotOrtalamasiHesaplama from '@/components/tools/NotOrtalamasiHesaplama';
import HarfNotuHesaplama from '@/components/tools/HarfNotuHesaplama';
import YksTytNetHesaplama from '@/components/tools/YksTytNetHesaplama';
import YksAytNetHesaplama from '@/components/tools/YksAytNetHesaplama';
import LgsNetHesaplama from '@/components/tools/LgsNetHesaplama';
import KpssNetHesaplama from '@/components/tools/KpssNetHesaplama';
import AlesNetHesaplama from '@/components/tools/AlesNetHesaplama';
import YdsNetHesaplama from '@/components/tools/YdsNetHesaplama';
import DgsNetHesaplama from '@/components/tools/DgsNetHesaplama';
import DevamsizlikHesaplama from '@/components/tools/DevamsizlikHesaplama';
import TakdirTesekkurHesaplama from '@/components/tools/TakdirTesekkurHesaplama';

// Batch 5: Matematik & İstatistik
import YuzdeDegisimFarkHesaplama from '@/components/tools/YuzdeDegisimFarkHesaplama';
import MedyanModHesaplama from '@/components/tools/MedyanModHesaplama';
import FaktoriyelHesaplama from '@/components/tools/FaktoriyelHesaplama';
import KombinasyonPermutasyonHesaplama from '@/components/tools/KombinasyonPermutasyonHesaplama';
import AsalSayiKontrolu from '@/components/tools/AsalSayiKontrolu';
import KesirHesaplama from '@/components/tools/KesirHesaplama';
import OndalikKesirDonusturucu from '@/components/tools/OndalikKesirDonusturucu';
import YuvarlamaAraci from '@/components/tools/YuvarlamaAraci';
import StandartSapmaHesaplama from '@/components/tools/StandartSapmaHesaplama';
import CemberDaireHesaplama from '@/components/tools/CemberDaireHesaplama';

// Batch 6: Tarih, Zaman & Takvim
import SaatFarkiHesaplama from '@/components/tools/SaatFarkiHesaplama';
import HaftaninGunuBulma from '@/components/tools/HaftaninGunuBulma';
import YilinKacinciGunuHaftasi from '@/components/tools/YilinKacinciGunuHaftasi';
import ArtikYilKontrolu from '@/components/tools/ArtikYilKontrolu';
import ZamanDilimiDonusturucu from '@/components/tools/ZamanDilimiDonusturucu';
import GeriSayimAraci from '@/components/tools/GeriSayimAraci';
import AyEvresiHesaplama from '@/components/tools/AyEvresiHesaplama';
import BioritimHesaplama from '@/components/tools/BioritimHesaplama';

// Batch 7: Günlük Hayat, Ev & Sağlık
import BmrBazalMetabolizmaHesaplama from '@/components/tools/BmrBazalMetabolizmaHesaplama';
import GunlukKaloriIhtiyaciHesaplama from '@/components/tools/GunlukKaloriIhtiyaciHesaplama';
import BelKalcaOraniHesaplama from '@/components/tools/BelKalcaOraniHesaplama';
import VucutYagOraniHesaplama from '@/components/tools/VucutYagOraniHesaplama';
import AdimMesafeKaloriHesaplama from '@/components/tools/AdimMesafeKaloriHesaplama';
import ElektrikFaturasiHesaplama from '@/components/tools/ElektrikFaturasiHesaplama';
import DogalgazTuketimMaliyetiHesaplama from '@/components/tools/DogalgazTuketimMaliyetiHesaplama';
import KlimaBtuHesaplama from '@/components/tools/KlimaBtuHesaplama';
import BoyaMiktariHesaplama from '@/components/tools/BoyaMiktariHesaplama';
import DuvarkagidiRuloHesaplama from '@/components/tools/DuvarkagidiRuloHesaplama';
import EvcilHayvanYasiHesaplama from '@/components/tools/EvcilHayvanYasiHesaplama';

// Batch 8: Birim Dönüştürücüler
import InternetHiziDonusturucu from '@/components/tools/InternetHiziDonusturucu';
import HacimSiviDonusturucu from '@/components/tools/HacimSiviDonusturucu';
import BasincDonusturucu from '@/components/tools/BasincDonusturucu';
import GucEnerjiDonusturucu from '@/components/tools/GucEnerjiDonusturucu';
import AciDonusturucu from '@/components/tools/AciDonusturucu';
import YakitTuketimiDonusturucu from '@/components/tools/YakitTuketimiDonusturucu';
import MutfakOlcubirimDonusturucu from '@/components/tools/MutfakOlcubirimDonusturucu';
import TipografiDonusturucu from '@/components/tools/TipografiDonusturucu';


import KykKrediGeriOdemeHesaplama from '@/components/tools/KykKrediGeriOdemeHesaplama';
import YasFarkiHesaplama from '@/components/tools/YasFarkiHesaplama';
import IdealKiloHesaplama from '@/components/tools/IdealKiloHesaplama';
import DosyaAktarimSuresiHesaplama from '@/components/tools/DosyaAktarimSuresiHesaplama';
import CssGradientOlusturucu from '@/components/tools/CssGradientOlusturucu';
import KelimeSikligiAnalizi from '@/components/tools/KelimeSikligiAnalizi';
import TbmCpcHesaplama from '@/components/tools/TbmCpcHesaplama';
import YakitTasarrufHesaplama from '@/components/tools/YakitTasarrufHesaplama';

// Batch 9: Geliştirici, Metin & Tasarım
import HtmlVarlikKodlayici from '@/components/tools/HtmlVarlıkKodlayici';
import MetinKarsilastirmaDiff from '@/components/tools/MetinKarsilastirmaDiff';
import YinelenenSatirTemizleyici from '@/components/tools/YinelenenSatirTemizleyici';
import MetinSiralayici from '@/components/tools/MetinSiralayici';
import MetinTersCevirici from '@/components/tools/MetinTersCevirici';
import HtmlMetinAyiklayici from '@/components/tools/HtmlMetinAyiklayici';
import CssKutuGolgesiOlusturucu from '@/components/tools/CssKutuGolgesiOlusturucu';


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

  const isSocialMediaResizer = tool.slug === 'sosyal-medya-gorsel-boyutlandirici';
  const title = isSocialMediaResizer
    ? 'Sosyal Medya Görsel Boyutlandırıcı | Instagram, YouTube ve TikTok | Pratika'
    : `${tool.title} | Pratika`;
  const description = isSocialMediaResizer
    ? 'Instagram, YouTube, TikTok, LinkedIn ve X için görsellerinizi doğru ölçülere ücretsiz olarak uyarlayın. Görselinizi yükleyin, formatı seçin ve indirin.'
    : tool.description;

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
      <div className="mt-4 mb-8 border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-muted text-muted-foreground border border-border/60 mb-2.5">
          <span>{tool.toolType === 'pdf' ? 'PDF & Dosya Aracı' : 'Ücretsiz Hesaplama'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2">
          {tool.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mb-14">
        {/* Mevcut Temel Araçlar */}
        {tool.slug === 'indirim-hesaplama' && <IndirimHesaplama />}
        {tool.slug === 'yuzde-hesaplama' && <YuzdeHesaplama />}
        {tool.slug === 'yas-hesaplama' && <YasHesaplama />}
        {tool.slug === 'kdv-hesaplama' && <KdvHesaplama />}
        {tool.slug === 'kar-marji-hesaplama' && <KarMarjiHesaplama />}
        {tool.slug === 'zam-hesaplama' && <ZamHesaplama />}
        {tool.slug === 'kar-zarar-hesaplama' && <KarZararHesaplama />}
        {tool.slug === 'faiz-hesaplama' && <FaizHesaplama />}
        {tool.slug === 'maliyet-hesaplama' && <MaliyetHesaplama />}

        {/* Finans & Yatırım (Mevcut) */}
        {tool.slug === 'kredi-taksit-hesaplama' && <KrediTaksitHesaplama />}
        {tool.slug === 'roi-hesaplama' && <RoiHesaplama />}
        {tool.slug === 'kar-payi-hesaplama' && <KarPayiHesaplama />}
        {tool.slug === 'enflasyon-hesaplama' && <EnflasyonHesaplama />}
        {tool.slug === 'vade-farki-hesaplama' && <VadeFarkiHesaplama />}

        {/* İş & Ticaret (Mevcut) */}
        {tool.slug === 'basabas-noktasi-hesaplama' && <BasabasNoktasiHesaplama />}
        {tool.slug === 'komisyon-hesaplama' && <KomisyonHesaplama />}
        {tool.slug === 'ciro-hesaplama' && <CiroHesaplama />}
        {tool.slug === 'stok-devir-hizi-hesaplama' && <StokDevirHiziHesaplama />}

        {/* Matematik (Mevcut) */}
        {tool.slug === 'ortalama-hesaplama' && <OrtalamaHesaplama />}
        {tool.slug === 'agirlikli-ortalama-hesaplama' && <AgirlikliOrtalamaHesaplama />}
        {tool.slug === 'oran-oranti-hesaplama' && <OranOrantiHesaplama />}
        {tool.slug === 'karekok-hesaplama' && <KarekokHesaplama />}
        {tool.slug === 'us-hesaplama' && <UsHesaplama />}
        {tool.slug === 'ebob-ekok-hesaplama' && <EbobEkokHesaplama />}

        {/* Tarih & Zaman (Mevcut) */}
        {tool.slug === 'tarih-farki-hesaplama' && <TarihFarkiHesaplama />}
        {tool.slug === 'tarihe-gun-ekleme' && <TariheGunEkleme />}
        {tool.slug === 'is-gunu-hesaplama' && <IsGunuHesaplama />}

        {/* Dönüşümler (Mevcut) */}
        {tool.slug === 'uzunluk-donusturucu' && <UzunlukDonusturucu />}
        {tool.slug === 'agirlik-donusturucu' && <AgirlikDonusturucu />}
        {tool.slug === 'alan-donusturucu' && <AlanDonusturucu />}
        {tool.slug === 'sicaklik-donusturucu' && <SicaklikDonusturucu />}
        {tool.slug === 'veri-birimi-donusturucu' && <VeriBirimiDonusturucu />}

        {/* Günlük Hayat & Sağlık (Mevcut) */}
        {tool.slug === 'bmi-hesaplama' && <BmiHesaplama />}
        {tool.slug === 'su-ihtiyaci-hesaplama' && <SuIhtiyaciHesaplama />}
        {tool.slug === 'yakit-maliyeti-hesaplama' && <YakitMaliyetiHesaplama />}
        {tool.slug === 'elektrik-tuketim-maliyeti-hesaplama' && <ElektrikTuketimMaliyetiHesaplama />}

        {/* Maaş & Çalışma (Mevcut) */}
        {tool.slug === 'kidem-tazminati-hesaplama' && <KidemTazminatiHesaplama />}
        {tool.slug === 'ihbar-tazminati-hesaplama' && <IhbarTazminatiHesaplama />}
        {tool.slug === 'kidem-ihbar-tazminati-hesaplama' && <KidemIhbarHesaplama />}
        {tool.slug === 'yillik-izin-hesaplama' && <YillikIzinHesaplama />}
        {tool.slug === 'kullanilmayan-yillik-izin-ucreti-hesaplama' && <KullanilmayanIzinUcretiHesaplama />}
        {tool.slug === 'ihbar-suresi-hesaplama' && <IhbarSuresiHesaplama />}
        {tool.slug === 'netten-brute-maas-hesaplama' && <NettenBruteMaasHesaplama />}
        {tool.slug === 'brutten-nete-maas-hesaplama' && <BruttenNeteMaasHesaplama />}
        {tool.slug === 'ise-giris-cikis-suresi-hesaplama' && <IseGirisCikisSuresiHesaplama />}
        {tool.slug === 'saat-ucreti-hesaplama' && <SaatUcretiHesaplama />}
        {tool.slug === 'fazla-mesai-hesaplama' && <FazlaMesaiHesaplama />}
        {tool.slug === 'gunluk-ucret-hesaplama' && <GunlukUcretHesaplama />}

        {/* Metin Araçları (Mevcut) */}
        {tool.slug === 'kelime-sayaci' && <KelimeSayaci />}
        {tool.slug === 'buyuk-kucuk-harf-donusturucu' && <BuyukKucukHarfDonusturucu />}
        {tool.slug === 'slug-olusturucu' && <SlugOlusturucu />}
        {tool.slug === 'lorem-ipsum-olusturucu' && <LoremIpsumOlusturucu />}

        {/* Developer & Kodlama (Mevcut) */}
        {tool.slug === 'json-formatlayici' && <JsonFormatlayici />}
        {tool.slug === 'base64-donusturucu' && <Base64Donusturucu />}
        {tool.slug === 'url-encode-decode' && <UrlEncodeDecode />}
        {tool.slug === 'uuid-olusturucu' && <UuidOlusturucu />}

        {/* Tasarım ve Renk (Mevcut) */}
        {tool.slug === 'qr-kod-olusturucu' && <QrKodOlusturucu />}
        {tool.slug === 'renk-donusturucu' && <RenkDonusturucu />}

        {/* Güvenlik ve Utility (Mevcut) */}
        {tool.slug === 'guvenli-sifre-olusturucu' && <GuvenliSifreOlusturucu />}

        {/* Görsel ve Medya (Mevcut) */}
        {(tool.slug === 'sosyal-medya-gorsel-boyutlandirici' || tool.slug === 'sosyal-medya-gorsel-boyutlari') && (
          <SosyalMedyaGorselBoyutlandirici />
        )}

        {/* PDF ve Dosya Araçları (Mevcut) */}
        {tool.slug === 'pdf-birlestir' && <PdfBirlestir />}
        {tool.slug === 'pdf-bol' && <PdfBol />}
        {tool.slug === 'pdf-sayfa-sil' && <PdfSayfaSil />}
        {tool.slug === 'pdf-sayfa-dondur' && <PdfSayfaDondur />}
        {tool.slug === 'jpg-pdf-donusturucu' && <JpgPdfDonusturucu />}
        {tool.slug === 'gorselleri-pdf-yap' && <GorselleriPdfYap />}
        {tool.slug === 'pdf-sayfa-cikar' && <PdfSayfaCikar />}
        {tool.slug === 'pdf-jpg-donusturucu' && <PdfJpgDonusturucu />}
        {tool.slug === 'metni-pdf-donusturucu' && <MetniPdfDonusturucu />}

        {/* ======================================================== */}
        {/* =================== 104 YENİ ARAÇ ====================== */}
        {/* ======================================================== */}

        {/* Batch 1: İş, Maaş & Kariyer */}
        {tool.slug === 'isveren-maliyeti-hesaplama' && <IsverenMaliyetiHesaplama />}
        {tool.slug === 'maas-zam-farki-hesaplama' && <MaasZamFarkiHesaplama />}
        {tool.slug === 'deneme-suresi-hesaplama' && <DenemeSuresiHesaplama />}
        {tool.slug === 'asgari-ucret-karsilastirma' && <AsgariUcretKarsilastirma />}
        {tool.slug === 'emeklilik-yasi-hesaplama' && <EmeklilikYasiHesaplama />}
        {tool.slug === 'kidem-suresi-hesaplama' && <KidemSuresiHesaplama />}
        {tool.slug === 'part-time-ucret-hesaplama' && <PartTimeUcretHesaplama />}
        {tool.slug === 'ise-alim-maliyeti-hesaplama' && <IseAlimMaliyetiHesaplama />}
        {tool.slug === 'gunluk-yemek-yol-ucreti-hesaplama' && <GunlukYemekYolUcretiHesaplama />}
        {tool.slug === 'bes-hesaplama' && <BesHesaplama />}
        {tool.slug === 'isten-ayrilma-bildirim-suresi' && <IstenAyrilmaBildirimSuresi />}
        {tool.slug === 'serbest-meslek-makbuzu-hesaplama' && <SerbestMeslekMakbuzuHesaplama />}

        {/* Batch 2: Finans, Birikim & Yatırım */}
        {tool.slug === 'bilesik-faiz-hesaplama' && <BilesikFaizHesaplama />}
        {tool.slug === 'aylik-birikim-tasarruf-hesaplama' && <AylikBirikimTasarrufHesaplama />}
        {tool.slug === 'tasarruf-hedefi-hesaplama' && <TasarrufHedefiHesaplama />}
        {tool.slug === 'pesin-taksit-karsilastirma' && <PesinTaksitKarsilastirma />}
        {tool.slug === 'alim-gucu-hesaplama' && <AlimGucuHesaplama />}
        {tool.slug === 'altin-kar-zarar-hesaplama' && <AltinKarZararHesaplama />}
        {tool.slug === 'doviz-kar-zarar-hesaplama' && <DovizKarZararHesaplama />}
        {tool.slug === 'borc-kapatma-kredisi-hesaplama' && <BorcKapatmaKredisiHesaplama />}
        {tool.slug === 'mevduat-getirisi-net-stopaj' && <MevduatGetirisiNetStopaj />}
        {tool.slug === 'kredi-erken-kapama-hesaplama' && <KrediErkenKapamaHesaplama />}
        {tool.slug === 'fon-getiri-hesaplama' && <FonGetiriHesaplama />}
        {tool.slug === 'temettu-verimi-hesaplama' && <TemettuVerimiHesaplama />}
        {tool.slug === 'gunluk-faiz-hesaplama' && <GunlukFaizHesaplama />}
        {tool.slug === 'amortisman-hesaplama' && <AmortismanHesaplama />}

        {/* Batch 3: Vergi, Ticaret & Alışveriş */}
        {tool.slug === 'iskonto-hesaplama' && <IskontoHesaplama />}
        {tool.slug === 'pazaryeri-komisyon-kar-hesaplama' && <PazaryeriKomisyonKarHesaplama />}
        {tool.slug === 'otv-hesaplama' && <OtvHesaplama />}
        {tool.slug === 'tevkifat-kdv-hesaplama' && <TevkifatKdvHesaplama />}
        {tool.slug === 'birim-fiyat-karsilastirma' && <BirimFiyatKarsilastirma />}
        {tool.slug === 'kampanya-fiyat-hesaplama' && <KampanyaFiyatHesaplama />}
        {tool.slug === 'markup-fiyatlandirma-hesaplama' && <MarkupFiyatlandirmaHesaplama />}
        {tool.slug === 'gumruk-vergisi-hesaplama' && <GumrukVergisiHesaplama />}
        {tool.slug === 'damga-vergisi-hesaplama' && <DamgaVergisiHesaplama />}
        {tool.slug === 'pesinatsiz-taksit-tutari-hesaplama' && <PesinatsizTaksitTutariHesaplama />}
        {tool.slug === 'kira-artis-orani-hesaplama' && <KiraArtisOraniHesaplama />}
        {tool.slug === 'kira-gelir-vergisi-hesaplama' && <KiraGelirVergisiHesaplama />}

        {/* Batch 4: Eğitim, Sınav & Not Hesaplama */}
        {tool.slug === 'vize-final-hesaplama' && <VizeFinalHesaplama />}
        {tool.slug === 'finalde-kac-almaliyim' && <FinaldeKacAlmaliyim />}
        {tool.slug === 'gpa-gano-hesaplama' && <GpaGanoHesaplama />}
        {tool.slug === 'not-ortalamasi-hesaplama' && <NotOrtalamasiHesaplama />}
        {tool.slug === 'harf-notu-hesaplama' && <HarfNotuHesaplama />}
        {tool.slug === 'yks-tyt-net-hesaplama' && <YksTytNetHesaplama />}
        {tool.slug === 'yks-ayt-net-hesaplama' && <YksAytNetHesaplama />}
        {tool.slug === 'lgs-net-hesaplama' && <LgsNetHesaplama />}
        {tool.slug === 'kpss-net-hesaplama' && <KpssNetHesaplama />}
        {tool.slug === 'ales-net-hesaplama' && <AlesNetHesaplama />}
        {tool.slug === 'yds-net-hesaplama' && <YdsNetHesaplama />}
        {tool.slug === 'dgs-net-hesaplama' && <DgsNetHesaplama />}
        {tool.slug === 'devamsizlik-hesaplama' && <DevamsizlikHesaplama />}
        {tool.slug === 'takdir-tesekkur-hesaplama' && <TakdirTesekkurHesaplama />}
        {tool.slug === 'kyk-kredi-hesaplama' && <KykKrediGeriOdemeHesaplama />}

        {/* Batch 5: Matematik & İstatistik */}
        {tool.slug === 'yuzde-degisim-fark-hesaplama' && <YuzdeDegisimFarkHesaplama />}
        {tool.slug === 'medyan-mod-hesaplama' && <MedyanModHesaplama />}
        {tool.slug === 'faktoriyel-hesaplama' && <FaktoriyelHesaplama />}
        {tool.slug === 'kombinasyon-permutasyon-hesaplama' && <KombinasyonPermutasyonHesaplama />}
        {tool.slug === 'asal-sayi-kontrolu' && <AsalSayiKontrolu />}
        {tool.slug === 'kesir-hesaplama' && <KesirHesaplama />}
        {tool.slug === 'ondalik-kesir-donusturucu' && <OndalikKesirDonusturucu />}
        {tool.slug === 'yuvarlama-araci' && <YuvarlamaAraci />}
        {tool.slug === 'standart-sapma-hesaplama' && <StandartSapmaHesaplama />}
        {tool.slug === 'cember-daire-hesaplama' && <CemberDaireHesaplama />}

        {/* Batch 6: Tarih, Zaman & Takvim */}
        {tool.slug === 'saat-farki-hesaplama' && <SaatFarkiHesaplama />}
        {tool.slug === 'yas-farki-hesaplama' && <YasFarkiHesaplama />}
        {tool.slug === 'haftanin-gunu-bulma' && <HaftaninGunuBulma />}
        {tool.slug === 'yilin-kacinci-gunu-haftasi' && <YilinKacinciGunuHaftasi />}
        {tool.slug === 'artik-yil-kontrolu' && <ArtikYilKontrolu />}
        {tool.slug === 'zaman-dilimi-donusturucu' && <ZamanDilimiDonusturucu />}
        {tool.slug === 'geri-sayim-araci' && <GeriSayimAraci />}
        {tool.slug === 'ay-evresi-hesaplama' && <AyEvresiHesaplama />}
        {tool.slug === 'bioritim-hesaplama' && <BioritimHesaplama />}

        {/* Batch 7: Günlük Hayat, Ev & Sağlık */}
        {tool.slug === 'bmr-hesaplama' && <BmrBazalMetabolizmaHesaplama />}
        {tool.slug === 'ideal-kilo-hesaplama' && <IdealKiloHesaplama />}
        {tool.slug === 'gunluk-kalori-ihtiyaci-hesaplama' && <GunlukKaloriIhtiyaciHesaplama />}
        {tool.slug === 'bel-kalca-orani-hesaplama' && <BelKalcaOraniHesaplama />}
        {tool.slug === 'vucut-yag-orani-hesaplama' && <VucutYagOraniHesaplama />}
        {tool.slug === 'adim-mesafe-kalori-hesaplama' && <AdimMesafeKaloriHesaplama />}
        {tool.slug === 'elektrik-faturasi-hesaplama' && <ElektrikFaturasiHesaplama />}
        {tool.slug === 'dogalgaz-tuketim-maliyeti-hesaplama' && <DogalgazTuketimMaliyetiHesaplama />}
        {tool.slug === 'klima-btu-hesaplama' && <KlimaBtuHesaplama />}
        {tool.slug === 'boya-miktari-hesaplama' && <BoyaMiktariHesaplama />}
        {tool.slug === 'duvarkagidi-rulo-hesaplama' && <DuvarkagidiRuloHesaplama />}
        {tool.slug === 'evcil-hayvan-yasi-hesaplama' && <EvcilHayvanYasiHesaplama />}

        {/* Batch 8: Birim Dönüştürücüler */}
        {tool.slug === 'dosya-aktarim-suresi' && <DosyaAktarimSuresiHesaplama />}
        {tool.slug === 'internet-hizi-donusturucu' && <InternetHiziDonusturucu />}
        {tool.slug === 'hacim-sivi-donusturucu' && <HacimSiviDonusturucu />}
        {tool.slug === 'basinc-donusturucu' && <BasincDonusturucu />}
        {tool.slug === 'guc-enerji-donusturucu' && <GucEnerjiDonusturucu />}
        {tool.slug === 'aci-donusturucu' && <AciDonusturucu />}
        {tool.slug === 'yakit-tuketimi-donusturucu' && <YakitTuketimiDonusturucu />}
        {tool.slug === 'mutfak-olcubirim-donusturucu' && <MutfakOlcubirimDonusturucu />}
        {tool.slug === 'tipografi-donusturucu' && <TipografiDonusturucu />}

        {/* Batch 9: Geliştirici, Metin & Tasarım */}
        {tool.slug === 'html-varlik-kodlayici' && <HtmlVarlikKodlayici />}
        {tool.slug === 'css-gradient-olusturucu' && <CssGradientOlusturucu />}
        {tool.slug === 'metin-karsilastirma-diff' && <MetinKarsilastirmaDiff />}
        {tool.slug === 'yinelenen-satir-temizleyici' && <YinelenenSatirTemizleyici />}
        {tool.slug === 'kelime-harf-frekansi' && <KelimeSikligiAnalizi />}
        {tool.slug === 'metin-siralayici' && <MetinSiralayici />}
        {tool.slug === 'metin-ters-cevirici' && <MetinTersCevirici />}
        {tool.slug === 'html-metin-ayiklayici' && <HtmlMetinAyiklayici />}
        {tool.slug === 'css-kutu-golgesi-olusturucu' && <CssKutuGolgesiOlusturucu />}
        {tool.slug === 'reklam-tiklama-tbm-hesaplama' && <TbmCpcHesaplama />}
        {tool.slug === 'yakit-tasarruf-hesaplama' && <YakitTasarrufHesaplama />}
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
