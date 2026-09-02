'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface CostResult {
  unitPurchasePrice: number;
  quantity: number;
  totalPurchaseCost: number;
  shippingCost: number;
  commissionCost: number;
  otherCost: number;
  totalExtraCost: number;
  totalCost: number;
  unitCost: number;
}

export default function MaliyetHesaplama() {
  const [unitPurchasePriceStr, setUnitPurchasePriceStr] = useState<string>('');
  const [shippingCostStr, setShippingCostStr] = useState<string>('');
  const [commissionCostStr, setCommissionCostStr] = useState<string>('');
  const [otherCostStr, setOtherCostStr] = useState<string>('');
  const [quantityStr, setQuantityStr] = useState<string>('1');

  const [result, setResult] = useState<CostResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // 1. Birim Alış Fiyatı Kontrolü (Zorunlu)
    if (!unitPurchasePriceStr.trim()) {
      setError("Birim alış fiyatı 0&apos;dan büyük olmalıdır.");
      return;
    }

    const unitPurchasePriceNum = parseTurkishNumber(unitPurchasePriceStr);
    if (isNaN(unitPurchasePriceNum) || unitPurchasePriceNum <= 0) {
      setError("Birim alış fiyatı 0&apos;dan büyük olmalıdır.");
      return;
    }

    // 2. Kargo / Nakliye (Opsiyonel)
    let shippingCostNum = 0;
    if (shippingCostStr.trim()) {
      shippingCostNum = parseTurkishNumber(shippingCostStr);
      if (isNaN(shippingCostNum)) {
        setError('Geçerli bir tutar girin.');
        return;
      }
      if (shippingCostNum < 0) {
        setError('Kargo / nakliye tutarı negatif olamaz.');
        return;
      }
    }

    // 3. Komisyon (Opsiyonel)
    let commissionCostNum = 0;
    if (commissionCostStr.trim()) {
      commissionCostNum = parseTurkishNumber(commissionCostStr);
      if (isNaN(commissionCostNum)) {
        setError('Geçerli bir tutar girin.');
        return;
      }
      if (commissionCostNum < 0) {
        setError('Komisyon tutarı negatif olamaz.');
        return;
      }
    }

    // 4. Diğer Giderler (Opsiyonel)
    let otherCostNum = 0;
    if (otherCostStr.trim()) {
      otherCostNum = parseTurkishNumber(otherCostStr);
      if (isNaN(otherCostNum)) {
        setError('Geçerli bir tutar girin.');
        return;
      }
      if (otherCostNum < 0) {
        setError('Diğer giderler negatif olamaz.');
        return;
      }
    }

    // 5. Ürün Adedi Kontrolü (Zorunlu, Pozitif Tam Sayı)
    if (!quantityStr.trim()) {
      setError("Ürün adedi 0&apos;dan büyük olmalıdır.");
      return;
    }

    if (quantityStr.includes(',') || quantityStr.includes('.')) {
      setError('Ürün adedi tam sayı olmalıdır.');
      return;
    }

    const quantityNum = parseTurkishNumber(quantityStr);
    if (isNaN(quantityNum) || !Number.isInteger(quantityNum)) {
      setError('Ürün adedi tam sayı olmalıdır.');
      return;
    }

    if (quantityNum <= 0) {
      setError("Ürün adedi 0&apos;dan büyük olmalıdır.");
      return;
    }

    // Hesaplama Formülleri
    const totalPurchaseCost = unitPurchasePriceNum * quantityNum;
    const totalExtraCost = shippingCostNum + commissionCostNum + otherCostNum;
    const totalCost = totalPurchaseCost + totalExtraCost;
    const unitCost = totalCost / quantityNum;

    setResult({
      unitPurchasePrice: unitPurchasePriceNum,
      quantity: quantityNum,
      totalPurchaseCost,
      shippingCost: shippingCostNum,
      commissionCost: commissionCostNum,
      otherCost: otherCostNum,
      totalExtraCost,
      totalCost,
      unitCost,
    });
  };

  return (
    <div className="w-full">
      {/* Hesaplama Kartı */}
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sol Kolon: Form */}
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            {/* Satır 1: Birim Alış Fiyatı & Ürün Adedi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="unitPurchasePrice" className="block text-sm font-medium mb-2 text-foreground">
                  Birim Alış Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="unitPurchasePrice"
                    placeholder="Örn: 600,00"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={unitPurchasePriceStr}
                    onChange={(e) => setUnitPurchasePriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-foreground">
                  Ürün Adedi <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="quantity"
                    placeholder="1"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-14 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={quantityStr}
                    onChange={(e) => setQuantityStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    Adet
                  </div>
                </div>
              </div>
            </div>

            {/* Satır 2: Kargo / Nakliye & Komisyon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="shippingCost" className="block text-sm font-medium mb-2 text-foreground">
                  Kargo / Nakliye (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="shippingCost"
                    placeholder="Örn: 15,00"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={shippingCostStr}
                    onChange={(e) => setShippingCostStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="commissionCost" className="block text-sm font-medium mb-2 text-foreground">
                  Komisyon (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="commissionCost"
                    placeholder="Örn: 250,00"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={commissionCostStr}
                    onChange={(e) => setCommissionCostStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
                </div>
              </div>
            </div>

            {/* Satır 3: Diğer Giderler */}
            <div>
              <label htmlFor="otherCost" className="block text-sm font-medium mb-2 text-foreground">
                Diğer Giderler (TL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="otherCost"
                  placeholder="Örn: 34,00"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={otherCostStr}
                  onChange={(e) => setOtherCostStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Maliyeti Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç Paneli */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                {/* Ana Sonuç (Hero): Toplam Maliyet */}
                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Maliyet</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalCost)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Birim Maliyet: <strong>{formatCurrency(result.unitCost)}</strong> / adet
                  </span>
                </div>

                {/* Detay Tablosu */}
                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Birim Alış Fiyatı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.unitPurchasePrice)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Ürün Adedi:</span>
                    <span className="font-semibold text-foreground">{result.quantity} Adet</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Alış Maliyeti:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalPurchaseCost)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Kargo / Nakliye:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.shippingCost)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Komisyon:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.commissionCost)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Diğer Giderler:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.otherCost)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Birim Maliyet:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.unitCost)}</span>
                  </div>
                </div>

                {/* Kâr/Zarar Çapraz Bağlantısı */}
                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kar-zarar-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Satış fiyatınıza göre kâr/zararınızı hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Birim alış fiyatı, adet ve ek giderleri girip &ldquo;Maliyeti Hesapla&rdquo; butonuna basın.</p>
                <p className="text-xs text-muted-foreground mt-1">Toplam alış, ek giderler, toplam ve birim maliyet burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Maliyet Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Maliyet hesaplama, tedarik edilen ürünlerin toplam alış tutarı ile satışa hazır hale gelene kadar yapılan kargo, komisyon ve operasyonel giderleri toplayarak gerçek toplam ve birim maliyeti bulma işlemidir.
        </p>

        {/* Formül Kutusu */}
        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Maliyet Formülleri:
          </p>
          <p className="font-semibold">Toplam Alış Maliyeti = Birim Alış Fiyatı &times; Ürün Adedi</p>
          <p className="font-semibold">Toplam Maliyet = (Birim Alış Fiyatı &times; Ürün Adedi) + Kargo + Komisyon + Diğer Giderler</p>
          <p className="font-semibold">Birim Maliyet = Toplam Maliyet / Ürün Adedi</p>
        </div>

        {/* Gerçek Kullanım Senaryoları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Senaryo 1: 10 Adet E-Ticaret Ürünü</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Birim Alış:</strong> 600 TL &times; 10 Adet = 6.000 TL
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Ek Giderler:</strong> 15 TL Kargo + 250 TL Komisyon + 34 TL Diğer = 299 TL
            </p>
            <p className="text-xs text-primary font-bold mb-1">
              Toplam Maliyet: 6.299,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Birim Maliyet:</strong> 629,90 TL / adet
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Senaryo 2: Toplu Toptan Alım (10 Adet)</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Birim Alış:</strong> 800 TL &times; 10 Adet = 8.000 TL
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Ek Giderler:</strong> 50 TL Kargo + 300 TL Komisyon + 200 TL Diğer = 550 TL
            </p>
            <p className="text-xs text-primary font-bold mb-1">
              Toplam Maliyet: 8.550,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Birim Maliyet:</strong> 855,00 TL / adet
            </p>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular (SSS) */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Bir ürünün maliyeti nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Ürünün birim alış fiyatı ile ürün adedi çarpılarak toplam alış maliyeti bulunur. Bu tutara nakliye, kargo, komisyon ve paketleme gibi ek giderler eklenerek toplam maliyete ve toplam maliyetin adede bölünmesiyle birim maliyete ulaşılır.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Birim alış fiyatı ile birim maliyet arasındaki fark nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Birim alış fiyatı yalnızca tedarikçiye ödenen çıplak ürün bedelidir. Birim maliyet ise bu bedele adet başına düşen kargo, komisyon ve paketleme masraflarının eklenmiş gerçek maliyetidir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Toplam maliyet ile birim maliyet arasındaki fark nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Toplam maliyet partideki tüm ürünler için yapılan genel harcamadır. Birim maliyet ise o partideki tek bir ürünün satıcıya gerçek maliyetini ifade eder.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Kargo ve komisyon maliyete nasıl dahil edilir?</h4>
            <p className="text-muted-foreground mt-2">
              Bu araçta toplu partiye ait kargo, komisyon ve diğer giderler toplam maliyete eklenir ve ürün adedine eşit olarak dağıtılarak birim maliyete yansıtılır.
            </p>
          </div>


          <div>
            <h4 className="font-semibold text-lg text-foreground">Birim maliyet neden satış fiyatından önce bilinmelidir?</h4>
            <p className="text-muted-foreground mt-2">
              Yalnızca birim alış fiyatını baz alarak satış fiyatı belirlendiğinde, kargo ve komisyon gibi gizli masraflar kârı eriterek satıcının zarar etmesine neden olabilir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Maliyeti bulduktan sonra kârımı nasıl hesaplarım?</h4>
            <p className="text-muted-foreground mt-2">
              Belirlediğiniz satış fiyatından hesapladığınız toplam maliyeti çıkararak net kârınızı bulabilir; Pratika&apos;nın <Link href="/arac/kar-zarar-hesaplama" className="text-primary hover:underline font-medium">Kâr / Zarar Hesaplama</Link> ve <Link href="/arac/kar-marji-hesaplama" className="text-primary hover:underline font-medium">Kar Marjı Hesaplama</Link> araçlarını kullanarak kârlılık oranlarınızı anında görebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
