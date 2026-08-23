'use client';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
export default function IndirimHesaplama() {
  const [price, setPrice] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const [result, setResult] = useState<{ discountAmount: number; finalPrice: number; originalPrice: number; discountRate: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const priceNum = parseFloat(price.replace(',', '.'));
    const discountNum = parseFloat(discount.replace(',', '.'));

    if (isNaN(priceNum) || isNaN(discountNum)) {
      setError('Lütfen geçerli değerler giriniz.');
      return;
    }

    if (priceNum < 0) {
      setError('Fiyat 0\'dan küçük olamaz.');
      return;
    }

    if (discountNum < 0 || discountNum > 100) {
      setError('İndirim oranı 0 ile 100 arasında olmalıdır.');
      return;
    }

    const discountAmount = (priceNum * discountNum) / 100;
    const finalPrice = priceNum - discountAmount;

    setResult({ discountAmount, finalPrice, originalPrice: priceNum, discountRate: discountNum });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-2xl border p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Sol Kolon: Form */}
          <form onSubmit={calculateDiscount} className="flex flex-col justify-between space-y-5">
            <div className="space-y-5">
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2">
                  Ürün Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    step="any"
                    required
                    className="w-full rounded-lg border bg-background px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Örn: 1500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    TL
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="discount" className="block text-sm font-medium mb-2">
                  İndirim Oranı (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="discount"
                    step="any"
                    required
                    className="w-full rounded-lg border bg-background px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Örn: 20"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    %
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç Paneli */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/30 rounded-xl border border-primary/20 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
                  Hesaplama Sonucu
                </h3>
                
                <div className="flex flex-col items-center justify-center mb-4">
                  <span className="text-muted-foreground font-medium mb-1 text-sm">İndirimli Fiyat</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.finalPrice)}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center mb-5 pb-4 border-b border-border">
                  <span className="text-muted-foreground font-medium mb-1 text-xs sm:text-sm">İndirim Tutarı</span>
                  <span className="font-bold text-xl sm:text-2xl text-destructive">
                    {formatCurrency(result.discountAmount)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground font-medium mb-0.5">Normal Fiyat</span>
                    <span className="font-semibold text-sm sm:text-base text-foreground">
                      {formatCurrency(result.originalPrice)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground font-medium mb-0.5">İndirim</span>
                    <span className="font-semibold text-sm sm:text-base text-foreground">
                      %{result.discountRate}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
                <span className="text-3xl mb-3">🏷️</span>
                <p className="text-sm font-medium">Değerleri girip &ldquo;Hesapla&rdquo; butonuna basın.</p>
                <p className="text-xs text-muted-foreground mt-1">İndirimli fiyat ve tasarruf tutarınız burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4">İndirim Nasıl Hesaplanır?</h2>
        <p className="mb-4">
          Bir ürünün indirimli fiyatını bulmak için öncelikle indirim tutarını hesaplamalısınız. 
          İndirim tutarı, ürünün normal fiyatının indirim yüzdesi ile çarpılıp 100'e bölünmesiyle bulunur.
        </p>
        <div className="bg-muted/50 p-6 rounded-lg mb-8 border">
          <p className="font-mono text-sm mb-2 text-muted-foreground">Formül:</p>
          <p className="font-medium mb-4 text-lg">İndirim Tutarı = Fiyat × (İndirim Oranı / 100)</p>
          <p className="font-medium text-lg">İndirimli Fiyat = Fiyat - İndirim Tutarı</p>
        </div>

        <h3 className="text-xl font-bold mb-4">Örnek Hesaplama</h3>
        <p className="mb-4">
          Diyelim ki <strong>1.500 TL</strong> değerinde bir ürün alacaksınız ve üründe <strong>%20</strong> indirim var.
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>İndirim Tutarı:</strong> 1500 × (20 / 100) = <strong>300 TL</strong></li>
          <li><strong>İndirimli Fiyat:</strong> 1500 - 300 = <strong>1.200 TL</strong></li>
        </ul>

        <h2 className="text-2xl font-bold mb-6 mt-12">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg">İndirim nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Ürünün normal fiyatını, indirim oranı ile çarpıp 100'e bölerek indirim tutarını bulabilirsiniz. Daha sonra bu tutarı normal fiyattan çıkararak indirimli fiyata ulaşırsınız.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">%20 indirim nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Bir fiyatın %20'sini bulmak için fiyatı 20 ile çarpıp 100'e bölebilirsiniz. Pratik olarak, fiyatı 5'e bölerek de %20'sini (beşte birini) hızlıca bulabilirsiniz.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">İndirimli fiyat nasıl bulunur?</h4>
            <p className="text-muted-foreground mt-2">
              Hesapladığınız indirim tutarını, ürünün ilk (indirimsiz) fiyatından çıkararak ürünün kasada ödeyeceğiniz indirimli fiyatını bulabilirsiniz.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">İndirim tutarı nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Sadece ne kadar kâr ettiğinizi (tasarruf ettiğinizi) görmek istiyorsanız, fiyatı indirim yüzdesi ile çarpıp 100'e bölmeniz yeterlidir. Bu size direkt indirim tutarını verir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
