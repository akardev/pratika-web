'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { submitContactRequestAction } from '@/app/iletisim/actions';

type ContactSubject = 'general-support' | 'pratika-qr' | 'tool-suggestion' | 'collaboration' | 'other';

const fieldClassName =
  'w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15';

const subjectLabels: Record<ContactSubject, string> = {
  'general-support': 'Genel Destek',
  'pratika-qr': 'Pratika QR',
  'tool-suggestion': 'Yeni Araç Önerisi',
  collaboration: 'İş Birliği',
  other: 'Diğer',
};

export default function ContactPageContent() {
  const [subject, setSubject] = useState<ContactSubject | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const focusForm = (nextSubject: ContactSubject) => {
    setSubject(nextSubject);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => document.getElementById('contact-full-name')?.focus(), 350);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitContactRequestAction(formData);
    setSubmitting(false);

    if (res.error) {
      setSubmitStatus({ type: 'error', text: res.error });
    } else {
      setSubmitStatus({ type: 'success', text: res.message || '✓ Mesajınız başarıyla iletildi.' });
      (e.target as HTMLFormElement).reset();
      setSubject('');
    }
  };

  return (
    <>
      <section aria-label="İletişim alanları" className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-border/70 bg-card p-5 sm:p-6">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-primary">Genel Destek</span>
          <h2 className="mb-2 text-lg font-semibold tracking-tight text-foreground">Pratika araçları ve destek</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">Pratika araçları, karşılaştığınız hatalar, öneriler ve genel destek talepleriniz için bize ulaşabilirsiniz.</p>
          <a href="mailto:destek@pratika.com" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">destek@pratika.com</a>
        </article>

        <article className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2"><Image src="/brand/pratika-qr-icon.svg" alt="" width={22} height={22} /><span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Pratika QR</span></div>
          <h2 className="mb-2 text-lg font-semibold tracking-tight text-foreground">Dijital menünüzü yönetin</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">İşletmeniz için profesyonel bir dijital menü oluşturmak istiyorsanız, formu Pratika QR konusu seçili şekilde açın.</p>
          <button type="button" onClick={() => focusForm('pratika-qr')} className="mt-5 inline-flex min-h-11 items-center text-left text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Pratika QR hakkında bilgi al <span aria-hidden="true" className="ml-1">↗</span></button>
        </article>

        <article className="rounded-xl border border-border/70 bg-card p-5 sm:p-6">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-primary">Diğer Talepler</span>
          <h2 className="mb-2 text-lg font-semibold tracking-tight text-foreground">Bir fikriniz mi var?</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">Yeni araç önerileri, geliştirme fikirleri, iş birlikleri ve diğer konular için ilgili talep türünü seçerek yazabilirsiniz.</p>
          <button type="button" onClick={() => focusForm('tool-suggestion')} className="mt-5 inline-flex min-h-11 items-center text-left text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Talep formuna geç <span aria-hidden="true" className="ml-1">↓</span></button>
        </article>
      </section>

      <div ref={formRef} id="iletisim-formu" className="mt-8 grid scroll-mt-24 gap-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <section className="rounded-xl border border-border/70 bg-card p-5 shadow-sm sm:p-7" aria-labelledby="contact-form-title">
          {submitStatus && (
            <div
              role="alert"
              className={`mb-4 rounded-xl border p-3.5 text-xs font-bold ${
                submitStatus.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-800'
                  : 'border-red-200 bg-red-50 text-red-800'
              }`}
            >
              {submitStatus.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="contact-full-name" className="grid gap-1.5 text-sm font-medium text-foreground">
              Ad Soyad *
              <input id="contact-full-name" required className={fieldClassName} name="fullName" autoComplete="name" placeholder="Adınız ve soyadınız" />
            </label>
            <label htmlFor="contact-email" className="grid gap-1.5 text-sm font-medium text-foreground">
              E-posta *
              <input id="contact-email" required className={fieldClassName} name="email" type="email" autoComplete="email" placeholder="ornek@pratika.com" />
            </label>
            <label htmlFor="contact-phone" className="grid gap-1.5 text-sm font-medium text-foreground">
              Telefon
              <input id="contact-phone" className={fieldClassName} name="phone" type="tel" autoComplete="tel" placeholder="05xx xxx xx xx" />
            </label>
            <label htmlFor="contact-subject" className="grid gap-1.5 text-sm font-medium text-foreground">
              Konu *
              <select id="contact-subject" required className={fieldClassName} name="subject" value={subject} onChange={(event) => setSubject(event.target.value as ContactSubject | '')}>
                <option value="" disabled>Seçiniz</option>
                {(Object.keys(subjectLabels) as ContactSubject[]).map((key) => (
                  <option key={key} value={key}>{subjectLabels[key]}</option>
                ))}
              </select>
            </label>
            <label htmlFor="contact-message" className="grid gap-1.5 text-sm font-medium text-foreground sm:col-span-2">
              Mesaj *
              <textarea id="contact-message" required className={`${fieldClassName} min-h-32 resize-y`} name="message" placeholder="Mesajınızı buraya yazın." />
            </label>
            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-xs transition hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? 'Gönderiliyor...' : 'Mesajı Gönder →'}
              </button>
              <span className="text-xs text-muted-foreground">Talebiniz ekibimize iletilir ve en kısa sürede yanıtlanır.</span>
            </div>
          </form>
        </section>

        <aside className="grid gap-4">
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-6"><h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground">Bize Ulaşın</h2><div className="grid gap-4 text-sm"><div><span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">E-posta</span><a href="mailto:destek@pratika.com" className="font-medium text-primary hover:underline">destek@pratika.com</a></div><div><span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp</span><p className="leading-relaxed text-muted-foreground">WhatsApp üzerinden hızlıca bilgi alın.</p><p className="mt-2 text-xs text-muted-foreground/80">Gerçek WhatsApp numarası belirlendiğinde bağlantı eklenecek.</p></div></div></div>
          <div className="rounded-xl border border-border/70 bg-muted/25 p-5 sm:p-6"><h2 className="mb-2 text-lg font-semibold tracking-tight text-foreground">Pratika QR&apos;ı keşfedin</h2><p className="mb-4 text-sm leading-relaxed text-muted-foreground">Dijital menü deneyimini ve canlı demoyu inceleyin.</p><Link href="/qr-menu" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">QR Menü sayfasına git <span aria-hidden="true">↗</span></Link></div>
        </aside>
      </div>
    </>
  );
}
