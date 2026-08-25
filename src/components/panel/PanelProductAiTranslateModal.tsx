'use client';

import { useState } from 'react';
import { generateSingleItemAiTranslationAction } from '@/app/panel/actions';
import styles from './panel.module.css';

interface ProductTranslationInfo {
  lang_code: string;
  name: string;
  description?: string | null;
  status?: string;
  is_manual?: boolean;
}

interface PanelProductAiTranslateModalProps {
  businessId: string;
  product: {
    id: string;
    name: string;
    description?: string | null;
  };
  existingTranslations: ProductTranslationInfo[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function PanelProductAiTranslateModal({
  businessId,
  product,
  existingTranslations,
  onClose,
  onSuccess,
}: PanelProductAiTranslateModalProps) {
  const [selectedLangs, setSelectedLangs] = useState<('en' | 'de' | 'ru')[]>(['en', 'de', 'ru']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const langOptions = [
    { code: 'en' as const, label: '🇬🇧 English (İngilizce)' },
    { code: 'de' as const, label: '🇩🇪 Deutsch (Almanca)' },
    { code: 'ru' as const, label: '🇷🇺 Русский (Rusça)' },
  ];

  const toggleLang = (code: 'en' | 'de' | 'ru') => {
    setSelectedLangs((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleTranslate = async () => {
    if (selectedLangs.length === 0) {
      setErrorMsg('Lütfen en az bir hedef dil seçin.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const res = await generateSingleItemAiTranslationAction(
      businessId,
      'product',
      product.id,
      selectedLangs
    );

    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      onSuccess();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-slate-700 bg-[#0f172a] p-6 shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">✨</span>
            <div>
              <h3 className="text-base font-bold text-white">Ürün İçin AI Çeviri</h3>
              <p className="text-xs text-slate-400">
                &ldquo;{product.name}&rdquo; ürününü yapay zeka ile çevirin.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-300">
            {errorMsg}
          </div>
        )}

        {/* SOURCE ITEM PREVIEW */}
        <div className="mb-4 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-xs space-y-1">
          <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
            Kaynak Metin (Türkçe)
          </div>
          <div className="font-bold text-white text-sm">{product.name}</div>
          {product.description && (
            <p className="text-slate-300 text-xs">{product.description}</p>
          )}
        </div>

        {/* TARGET LANGUAGES SELECTION */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-300 mb-2">
            Hedef Dilleri Seçin:
          </label>
          <div className="space-y-2">
            {langOptions.map((opt) => {
              const isChecked = selectedLangs.includes(opt.code);
              const existing = existingTranslations.find((t) => t.lang_code === opt.code);

              return (
                <label
                  key={opt.code}
                  className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition ${
                    isChecked
                      ? 'border-blue-500/50 bg-blue-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleLang(opt.code)}
                      className="rounded border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span className="text-xs font-semibold">{opt.label}</span>
                  </div>

                  {existing && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-white/10 text-slate-300">
                      {existing.is_manual || existing.status === 'manual'
                        ? '✍️ Manuel Çeviri Var'
                        : existing.status === 'ai_approved'
                        ? '✓ Onaylı AI Çevirisi'
                        : '⏳ Onay Bekleyen Çeviri'}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* NOTICE */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-[11px] text-slate-400 mb-5 leading-relaxed">
          💡 <strong>Bilgi:</strong> Oluşturulan AI çevirisi doğrudan yayına çıkmaz. &ldquo;Bekleyen AI Çevirileri&rdquo; alanında onayınıza sunulur. Mevcut manuel çevirilerinizin üzerine yazılmaz.
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={styles.secondaryBtn}
          >
            İptal
          </button>
          <button
            type="button"
            onClick={handleTranslate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
          >
            <span>{loading ? '⏳' : '✨'}</span>
            <span>{loading ? 'Çeviri Hazırlanıyor...' : 'AI ile Çevir'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
