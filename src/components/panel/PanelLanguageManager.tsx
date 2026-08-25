'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { BusinessData, CategoryData, ProductData } from './PanelDashboardOverview';
import {
  approveAiTranslationAction,
  approveAllAiTranslationsAction,
  fetchTranslationsAction,
  generateAiTranslationsAction,
  rejectAiTranslationAction,
  rejectAllAiTranslationsAction,
  saveTranslationAction,
} from '@/app/panel/actions';
import styles from './panel.module.css';

export interface TranslationRecord {
  id?: string;
  category_id?: string;
  product_id?: string;
  lang_code: string;
  name: string;
  description?: string | null;
  is_manual?: boolean;
  status?: string;
  base_hash?: string;
  ai_model?: string;
  updated_at?: string;
}

const SUPPORTED_LANGUAGES = [
  { code: 'tr' as const, label: 'Türkçe', flag: '🇹🇷', codeDisplay: 'TR', badgeLabel: '🇹🇷 TR — Türkçe', isDefault: true, desc: 'Ana menü kaynak dili' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧', codeDisplay: 'EN', badgeLabel: '🇬🇧 EN — English', isDefault: false, desc: 'Global ziyaretçiler için' },
  { code: 'de' as const, label: 'Deutsch', flag: '🇩🇪', codeDisplay: 'DE', badgeLabel: '🇩🇪 DE — Deutsch', isDefault: false, desc: 'Almanca konuşan misafirler' },
  { code: 'ru' as const, label: 'Русский', flag: '🇷🇺', codeDisplay: 'RU', badgeLabel: '🇷🇺 RU — Русский', isDefault: false, desc: 'Rusça konuşan misafirler' },
];

export default function PanelLanguageManager({
  business,
  categories,
  products,
}: {
  business: BusinessData;
  categories: CategoryData[];
  products: ProductData[];
}) {
  // Navigation & Manual Editor state
  const [selectedLang, setSelectedLang] = useState<'en' | 'de' | 'ru'>('en');
  const [selectedItemType, setSelectedItemType] = useState<'product' | 'category'>('product');
  const [selectedItemId, setSelectedItemId] = useState<string>(products[0]?.id || categories[0]?.id || '');
  const [manualDrafts, setManualDrafts] = useState<Record<string, { name?: string; desc?: string }>>({});
  const [manualLoading, setManualLoading] = useState(false);

  // Translations loaded from server
  const [catTranslations, setCatTranslations] = useState<TranslationRecord[]>([]);
  const [prodTranslations, setProdTranslations] = useState<TranslationRecord[]>([]);

  // AI Translation Section state
  const [aiEnabled, setAiEnabled] = useState(false);
  const [selectedAiLangs, setSelectedAiLangs] = useState<('en' | 'de' | 'ru')[]>(['en', 'de', 'ru']);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiApprovingAll, setAiApprovingAll] = useState(false);
  const [aiRejectingAll, setAiRejectingAll] = useState(false);

  // AI Pending view tab: 'products' | 'categories'
  const [aiPendingTab, setAiPendingTab] = useState<'products' | 'categories'>('products');
  const [aiLangFilter, setAiLangFilter] = useState<'all' | 'en' | 'de' | 'ru'>('all');

  // Inline editing for pending items
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [actionLoadingKey, setActionLoadingKey] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Load translations from server
  const loadTranslations = useCallback(async () => {
    const res = await fetchTranslationsAction(business.id);
    if (res.categoryTranslations) {
      setCatTranslations(res.categoryTranslations);
    }
    if (res.productTranslations) {
      setProdTranslations(res.productTranslations);
    }
  }, [business.id]);

  useEffect(() => {
    let isMounted = true;
    fetchTranslationsAction(business.id).then((res) => {
      if (!isMounted) return;
      if (res.categoryTranslations) setCatTranslations(res.categoryTranslations);
      if (res.productTranslations) setProdTranslations(res.productTranslations);
    });
    return () => {
      isMounted = false;
    };
  }, [business.id]);

  // Active item in manual editor
  const activeProduct = products.find((p) => p.id === selectedItemId);
  const activeCategory = categories.find((c) => c.id === selectedItemId);

  // Derived current manual form values
  const currentDraftKey = `${selectedItemType}_${selectedItemId}_${selectedLang}`;
  const existingTranslation = useMemo(() => {
    if (selectedItemType === 'product') {
      return prodTranslations.find(
        (t) => t.product_id === selectedItemId && t.lang_code === selectedLang
      );
    }
    return catTranslations.find(
      (t) => t.category_id === selectedItemId && t.lang_code === selectedLang
    );
  }, [selectedItemType, selectedItemId, selectedLang, prodTranslations, catTranslations]);

  const currentManualName = manualDrafts[currentDraftKey]?.name ?? existingTranslation?.name ?? '';
  const currentManualDesc = manualDrafts[currentDraftKey]?.desc ?? existingTranslation?.description ?? '';

  const handleManualNameChange = (val: string) => {
    setManualDrafts((prev) => ({
      ...prev,
      [currentDraftKey]: {
        ...prev[currentDraftKey],
        name: val,
        desc: prev[currentDraftKey]?.desc ?? existingTranslation?.description ?? '',
      },
    }));
  };

  const handleManualDescChange = (val: string) => {
    setManualDrafts((prev) => ({
      ...prev,
      [currentDraftKey]: {
        ...prev[currentDraftKey],
        name: prev[currentDraftKey]?.name ?? existingTranslation?.name ?? '',
        desc: val,
      },
    }));
  };

  // Translation stats per language
  const languageStats = useMemo(() => {
    const totalItems = categories.length + products.length;
    const stats: Record<string, { approved: number; pending: number; manual: number; total: number }> = {
      en: { approved: 0, pending: 0, manual: 0, total: totalItems },
      de: { approved: 0, pending: 0, manual: 0, total: totalItems },
      ru: { approved: 0, pending: 0, manual: 0, total: totalItems },
    };

    // Category stats
    for (const ct of catTranslations) {
      if (stats[ct.lang_code]) {
        if (ct.status === 'ai_pending') {
          stats[ct.lang_code].pending++;
        } else if (ct.status === 'manual' || ct.status === 'ai_approved' || ct.status === 'approved') {
          stats[ct.lang_code].approved++;
          if (ct.is_manual || ct.status === 'manual') stats[ct.lang_code].manual++;
        }
      }
    }

    // Product stats
    for (const pt of prodTranslations) {
      if (stats[pt.lang_code]) {
        if (pt.status === 'ai_pending') {
          stats[pt.lang_code].pending++;
        } else if (pt.status === 'manual' || pt.status === 'ai_approved' || pt.status === 'approved') {
          stats[pt.lang_code].approved++;
          if (pt.is_manual || pt.status === 'manual') stats[pt.lang_code].manual++;
        }
      }
    }

    return stats;
  }, [categories, products, catTranslations, prodTranslations]);

  // Group pending translations by item for rich card layout
  const pendingProductGroups = useMemo(() => {
    return products.map((prod) => {
      const pendingTrans = prodTranslations.filter(
        (t) => t.product_id === prod.id && t.status === 'ai_pending' && (aiLangFilter === 'all' || t.lang_code === aiLangFilter)
      );
      const approvedTrans = prodTranslations.filter(
        (t) => t.product_id === prod.id && (t.status === 'ai_approved' || t.status === 'manual' || t.is_manual)
      );
      const category = categories.find((c) => c.id === prod.category_id);
      return {
        item: prod,
        type: 'product' as const,
        categoryName: category?.name,
        pendingList: pendingTrans,
        approvedList: approvedTrans,
      };
    }).filter((g) => g.pendingList.length > 0);
  }, [products, prodTranslations, categories, aiLangFilter]);

  const pendingCategoryGroups = useMemo(() => {
    return categories.map((cat) => {
      const pendingTrans = catTranslations.filter(
        (t) => t.category_id === cat.id && t.status === 'ai_pending' && (aiLangFilter === 'all' || t.lang_code === aiLangFilter)
      );
      const approvedTrans = catTranslations.filter(
        (t) => t.category_id === cat.id && (t.status === 'ai_approved' || t.status === 'manual' || t.is_manual)
      );
      return {
        item: cat,
        type: 'category' as const,
        pendingList: pendingTrans,
        approvedList: approvedTrans,
      };
    }).filter((g) => g.pendingList.length > 0);
  }, [categories, catTranslations, aiLangFilter]);

  const totalPendingCount = useMemo(() => {
    const pCount = prodTranslations.filter((t) => t.status === 'ai_pending').length;
    const cCount = catTranslations.filter((t) => t.status === 'ai_pending').length;
    return pCount + cCount;
  }, [prodTranslations, catTranslations]);

  // Save manual translation
  const handleSaveManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId || !currentManualName.trim()) return;

    setManualLoading(true);
    const res = await saveTranslationAction(
      selectedItemType,
      selectedItemId,
      selectedLang,
      currentManualName.trim(),
      currentManualDesc.trim() || undefined
    );
    setManualLoading(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: `✓ ${selectedLang.toUpperCase()} manuel çevirisi kaydedildi ve yayına alındı.` });
      await loadTranslations();
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  // Generate AI Translations
  const handleGenerateAi = async () => {
    if (selectedAiLangs.length === 0 || aiGenerating) return;

    setAiGenerating(true);
    setFeedback({ type: 'info', text: 'AI çevirileri hazırlanıyor, lütfen bekleyiniz...' });

    const res = await generateAiTranslationsAction(business.id, selectedAiLangs);
    setAiGenerating(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({
        type: 'success',
        text: res.count && res.count > 0
          ? `✓ ${res.count} AI çevirisi hazır. Onayınız bekleniyor.`
          : res.message || 'Çeviri oluşturulmadı.',
      });
      await loadTranslations();

      // Scroll to pending approval section automatically
      setTimeout(() => {
        const el = document.getElementById('pending-ai-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  // Approve single AI translation
  const handleApprove = async (
    type: 'product' | 'category',
    id: string,
    langCode: string,
    key: string,
    editedName?: string,
    editedDesc?: string
  ) => {
    setActionLoadingKey(key);

    // Optimistic UI update
    if (type === 'product') {
      setProdTranslations((prev) =>
        prev.map((t) =>
          t.product_id === id && t.lang_code === langCode
            ? {
                ...t,
                status: 'ai_approved',
                base_hash: 'ai_approved',
                name: editedName || t.name,
                description: editedDesc !== undefined ? editedDesc : t.description,
              }
            : t
        )
      );
    } else {
      setCatTranslations((prev) =>
        prev.map((t) =>
          t.category_id === id && t.lang_code === langCode
            ? {
                ...t,
                status: 'ai_approved',
                base_hash: 'ai_approved',
                name: editedName || t.name,
                description: editedDesc !== undefined ? editedDesc : t.description,
              }
            : t
        )
      );
    }

    const res = await approveAiTranslationAction(type, id, langCode, editedName, editedDesc);
    setActionLoadingKey(null);
    setEditingKey(null);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
      await loadTranslations();
    } else {
      setFeedback({ type: 'success', text: `✓ ${langCode.toUpperCase()} çevirisi onaylandı ve menüde aktif edildi!` });
      await loadTranslations();
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Reject single AI translation
  const handleReject = async (type: 'product' | 'category', id: string, langCode: string, key: string) => {
    setActionLoadingKey(key);

    // Optimistic UI update
    if (type === 'product') {
      setProdTranslations((prev) =>
        prev.filter((t) => !(t.product_id === id && t.lang_code === langCode && t.status === 'ai_pending'))
      );
    } else {
      setCatTranslations((prev) =>
        prev.filter((t) => !(t.category_id === id && t.lang_code === langCode && t.status === 'ai_pending'))
      );
    }

    const res = await rejectAiTranslationAction(type, id, langCode);
    setActionLoadingKey(null);
    setEditingKey(null);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
      await loadTranslations();
    } else {
      setFeedback({ type: 'info', text: `✓ ${langCode.toUpperCase()} çeviri önerisi reddedildi.` });
      await loadTranslations();
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Approve all pending AI translations
  const handleApproveAll = async () => {
    if (totalPendingCount === 0 || aiApprovingAll) return;

    const countToApprove = totalPendingCount;
    setAiApprovingAll(true);

    // Optimistic UI update
    setProdTranslations((prev) =>
      prev.map((t) => (t.status === 'ai_pending' ? { ...t, status: 'ai_approved', base_hash: 'ai_approved' } : t))
    );
    setCatTranslations((prev) =>
      prev.map((t) => (t.status === 'ai_pending' ? { ...t, status: 'ai_approved', base_hash: 'ai_approved' } : t))
    );

    const res = await approveAllAiTranslationsAction(business.id);
    setAiApprovingAll(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
      await loadTranslations();
    } else {
      setFeedback({
        type: 'success',
        text: `✓ Tüm bekleyen (${countToApprove}) AI çevirisi onaylandı ve public menüde yayına alındı!`,
      });
      await loadTranslations();
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Reject all pending AI translations
  const handleRejectAll = async () => {
    if (totalPendingCount === 0 || aiRejectingAll) return;

    if (!confirm('Onay bekleyen tüm AI çeviri önerilerini silmek istediğinize emin misiniz?')) return;

    setAiRejectingAll(true);

    // Optimistic UI update
    setProdTranslations((prev) => prev.filter((t) => t.status !== 'ai_pending'));
    setCatTranslations((prev) => prev.filter((t) => t.status !== 'ai_pending'));

    const res = await rejectAllAiTranslationsAction(business.id);
    setAiRejectingAll(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
      await loadTranslations();
    } else {
      setFeedback({
        type: 'info',
        text: '✓ Tüm bekleyen AI çeviri önerileri temizlendi.',
      });
      await loadTranslations();
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const toggleTargetLang = (code: 'en' | 'de' | 'ru') => {
    setSelectedAiLangs((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]
    );
  };

  return (
    <div>
      {/* SECTION HEADER */}
      <div className={styles.sectionCardHeader}>
        <div>
          <h2>Menü Dilleri &amp; AI Otomatik Çeviri</h2>
          <p className="mt-1 text-xs text-slate-500">
            QR menünüzü İngilizce (EN), Almanca (DE) ve Rusça (RU) dillerine çevirin. Manuel çevirebilir veya AI ile otomatik oluşturup onaylayabilirsiniz.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-5 rounded-xl border p-4 text-xs font-bold shadow-xs ${
            feedback.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : feedback.type === 'info'
              ? 'border-blue-200 bg-blue-50 text-blue-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* 1. SUPPORTED LANGUAGES OVERVIEW */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const stats = !lang.isDefault ? languageStats[lang.code] : null;
          const isCurrentEditor = !lang.isDefault && selectedLang === lang.code;

          return (
            <div
              key={lang.code}
              className={`rounded-2xl border p-4 transition bg-white shadow-xs ${
                isCurrentEditor ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{lang.flag}</span>
                {lang.isDefault ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    ● Ana Dil
                  </span>
                ) : stats && stats.pending > 0 ? (
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                    ⏳ {stats.pending} Onay Bekliyor
                  </span>
                ) : stats && stats.approved > 0 ? (
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                    ✓ {stats.approved} Yayında
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                    ● Çeviri Bekliyor
                  </span>
                )}
              </div>

              <div className="mt-3">
                <strong className="block text-sm text-slate-900">{lang.badgeLabel}</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">{lang.desc}</p>
              </div>

              {!lang.isDefault && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    {stats && stats.approved > 0 && (
                      <span className="font-semibold text-emerald-700">✓ {stats.approved} yayında</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedLang(lang.code as 'en' | 'de' | 'ru')}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                      isCurrentEditor
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isCurrentEditor ? 'Seçili Dil' : 'Manuel Düzenle'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2. AI OTOMATİK ÇEVİRİ AYARI & KONTROL PANELİ */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <h3 className="text-sm font-bold text-slate-900">AI Otomatik Çeviri</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  aiEnabled
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {aiEnabled ? 'AÇIK' : 'KAPALI (Varsayılan)'}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl leading-relaxed">
              Ürün ve kategori metinlerinizi seçtiğiniz dillere otomatik olarak çevirin. Oluşturulan çeviriler menünüzde doğrudan yayınlanmaz; önce sizin onayınıza sunulur. Fiyatlar ve manuel çeviriler korunur.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAiEnabled(!aiEnabled)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              aiEnabled ? 'bg-blue-600' : 'bg-slate-300'
            }`}
            role="switch"
            aria-checked={aiEnabled}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                aiEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* AI Control Box (Shown when AI is Enabled) */}
        {aiEnabled && (
          <div className="mt-4 pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Hedef Çeviri Dillerini Seçin:
                </label>
                <div className="flex flex-wrap gap-3">
                  {SUPPORTED_LANGUAGES.filter((l) => !l.isDefault).map((l) => (
                    <label
                      key={l.code}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold cursor-pointer transition ${
                        selectedAiLangs.includes(l.code as 'en' | 'de' | 'ru')
                          ? 'border-blue-500 bg-blue-50/70 text-blue-900'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAiLangs.includes(l.code as 'en' | 'de' | 'ru')}
                        onChange={() => toggleTargetLang(l.code as 'en' | 'de' | 'ru')}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{l.badgeLabel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={aiGenerating || selectedAiLangs.length === 0}
                  onClick={handleGenerateAi}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {aiGenerating ? (
                    <>
                      <span className="inline-block animate-spin">⏳</span>
                      <span>Çeviriler Oluşturuluyor...</span>
                    </>
                  ) : (
                    <>
                      <span>✨ Çevirileri Oluştur</span>
                      <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">
                        {categories.length + products.length} Öğe
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. AI ÇEVİRİLER — ONAY BEKLİYOR (PROMINENT REVIEW & APPROVAL SECTION) */}
      {totalPendingCount > 0 && (
        <div id="pending-ai-section" className="mb-8 rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-50/70 to-amber-50/20 p-6 shadow-sm">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-amber-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⏳</span>
                <h3 className="text-base font-extrabold text-amber-950">
                  AI Çeviriler — Onay Bekliyor ({totalPendingCount})
                </h3>
              </div>
              <p className="mt-1 text-xs text-amber-900">
                AI tarafından oluşturulan çevirileri kontrol edin. Onaylamadan önce düzenleyebilirsiniz. Onaylanan çeviriler anında public menünüzde yayınlanır.
              </p>
            </div>

            {/* Top Bulk Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={aiRejectingAll || aiApprovingAll}
                onClick={handleRejectAll}
                className="rounded-xl border border-red-200 bg-white px-3.5 py-2 text-xs font-bold text-red-700 shadow-xs transition hover:bg-red-50 disabled:opacity-50"
              >
                {aiRejectingAll ? 'Reddediliyor...' : '✕ Tümünü Reddet'}
              </button>
              <button
                type="button"
                disabled={aiApprovingAll || aiRejectingAll}
                onClick={handleApproveAll}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-1.5"
              >
                {aiApprovingAll ? (
                  <span>Onaylanıyor...</span>
                ) : (
                  <>
                    <span>✓ Tümünü Onayla</span>
                    <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">
                      {totalPendingCount}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sub Navigation: Tabs & Language Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAiPendingTab('products')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  aiPendingTab === 'products'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-100/50'
                }`}
              >
                🍽️ Ürün Çevirileri ({pendingProductGroups.reduce((acc, g) => acc + g.pendingList.length, 0)})
              </button>
              <button
                type="button"
                onClick={() => setAiPendingTab('categories')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  aiPendingTab === 'categories'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-100/50'
                }`}
              >
                📁 Kategori Çevirileri ({pendingCategoryGroups.reduce((acc, g) => acc + g.pendingList.length, 0)})
              </button>
            </div>

            {/* Language filter pills */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-amber-200 text-xs">
              <span className="px-2 text-[10px] font-bold text-slate-400 uppercase">Dil:</span>
              {[
                { code: 'all' as const, label: 'Tümü' },
                ...SUPPORTED_LANGUAGES.filter((l) => !l.isDefault).map((l) => ({
                  code: l.code,
                  label: l.badgeLabel,
                })),
              ].map((pill) => (
                <button
                  key={pill.code}
                  type="button"
                  onClick={() => setAiLangFilter(pill.code as 'all' | 'en' | 'de' | 'ru')}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                    aiLangFilter === pill.code
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pending Translation Cards List */}
          <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
            {aiPendingTab === 'products' ? (
              pendingProductGroups.length === 0 ? (
                <div className="rounded-xl border border-dashed border-amber-200 bg-white/70 p-6 text-center text-xs text-slate-500">
                  Seçili filtreye göre bekleyen ürün çevirisi bulunmuyor.
                </div>
              ) : (
                pendingProductGroups.map((group) => (
                  <div
                    key={`group_prod_${group.item.id}`}
                    className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs"
                  >
                    {/* Item Title & Turkish Original */}
                    <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-orange-100 px-2 py-0.5 text-[10px] font-bold uppercase text-orange-800">
                            🍽️ Ürün
                          </span>
                          {group.categoryName && (
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                              📁 {group.categoryName}
                            </span>
                          )}
                          <strong className="text-sm text-slate-900">{group.item.name}</strong>
                        </div>
                        {group.item.description && (
                          <p className="mt-1 text-xs text-slate-600 italic">
                            🇹🇷 Türkçe (Kaynak): &ldquo;{group.item.description}&rdquo;
                          </p>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-700">
                        {group.item.price} ₺
                      </div>
                    </div>

                    {/* Target Languages AI Proposals List */}
                    <div className="mt-3 space-y-3">
                      {group.pendingList.map((t) => {
                        const itemKey = `prod_${group.item.id}_${t.lang_code}`;
                        const isEditing = editingKey === itemKey;
                        const isActionLoading = actionLoadingKey === itemKey;
                        const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === t.lang_code);

                        return (
                          <div
                            key={itemKey}
                            className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 transition"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                                <span>{langObj?.badgeLabel} — AI ÖNERİSİ</span>
                              </span>
                              {t.ai_model && (
                                <span className="text-[10px] text-slate-400">
                                  {t.ai_model}
                                </span>
                              )}
                            </div>

                            {isEditing ? (
                              <div className="space-y-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                                    {langObj?.label} Ürün Adı
                                  </label>
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 p-2 text-xs font-bold text-slate-900 outline-none focus:border-blue-500"
                                    placeholder="Translated Name"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                                    {langObj?.label} Açıklaması
                                  </label>
                                  <textarea
                                    value={editDesc}
                                    onChange={(e) => setEditDesc(e.target.value)}
                                    rows={2}
                                    className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-700 outline-none focus:border-blue-500"
                                    placeholder="Translated Description"
                                  />
                                </div>
                                <div className="flex items-center justify-end gap-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={() => setEditingKey(null)}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                                  >
                                    Vazgeç
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isActionLoading || !editName.trim()}
                                    onClick={() =>
                                      handleApprove('product', group.item.id, t.lang_code, itemKey, editName, editDesc)
                                    }
                                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs disabled:opacity-50"
                                  >
                                    {isActionLoading ? 'Kaydediliyor...' : '✓ Kaydet ve Onayla'}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="text-xs">
                                  <strong className="text-slate-900">{t.name}</strong>
                                  {t.description && (
                                    <p className="text-slate-600 mt-0.5 text-xs">{t.description}</p>
                                  )}
                                </div>

                                <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-slate-200/60">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingKey(itemKey);
                                      setEditName(t.name);
                                      setEditDesc(t.description || '');
                                    }}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                                  >
                                    ✏️ Düzenle
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isActionLoading}
                                    onClick={() => handleReject('product', group.item.id, t.lang_code, itemKey)}
                                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100 transition disabled:opacity-50"
                                  >
                                    ✕ Reddet
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isActionLoading}
                                    onClick={() => handleApprove('product', group.item.id, t.lang_code, itemKey)}
                                    className="rounded-lg bg-emerald-600 px-3.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition disabled:opacity-50"
                                  >
                                    {isActionLoading ? '...' : '✓ Onayla'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )
            ) : (
              pendingCategoryGroups.length === 0 ? (
                <div className="rounded-xl border border-dashed border-amber-200 bg-white/70 p-6 text-center text-xs text-slate-500">
                  Seçili filtreye göre bekleyen kategori çevirisi bulunmuyor.
                </div>
              ) : (
                pendingCategoryGroups.map((group) => (
                  <div
                    key={`group_cat_${group.item.id}`}
                    className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs"
                  >
                    {/* Item Title & Turkish Original */}
                    <div className="pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-800">
                          📁 Kategori
                        </span>
                        <strong className="text-sm text-slate-900">{group.item.name}</strong>
                      </div>
                      {group.item.description && (
                        <p className="mt-1 text-xs text-slate-600 italic">
                          🇹🇷 Türkçe (Kaynak): &ldquo;{group.item.description}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Target Languages AI Proposals List */}
                    <div className="mt-3 space-y-3">
                      {group.pendingList.map((t) => {
                        const itemKey = `cat_${group.item.id}_${t.lang_code}`;
                        const isEditing = editingKey === itemKey;
                        const isActionLoading = actionLoadingKey === itemKey;
                        const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === t.lang_code);

                        return (
                          <div
                            key={itemKey}
                            className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 transition"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                                <span>{langObj?.badgeLabel} — AI ÖNERİSİ</span>
                              </span>
                              {t.ai_model && (
                                <span className="text-[10px] text-slate-400">
                                  {t.ai_model}
                                </span>
                              )}
                            </div>

                            {isEditing ? (
                              <div className="space-y-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                                    {langObj?.label} Kategori Adı
                                  </label>
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 p-2 text-xs font-bold text-slate-900 outline-none focus:border-blue-500"
                                    placeholder="Translated Category Name"
                                  />
                                </div>
                                <div className="flex items-center justify-end gap-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={() => setEditingKey(null)}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                                  >
                                    Vazgeç
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isActionLoading || !editName.trim()}
                                    onClick={() =>
                                      handleApprove('category', group.item.id, t.lang_code, itemKey, editName, editDesc)
                                    }
                                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs disabled:opacity-50"
                                  >
                                    {isActionLoading ? 'Kaydediliyor...' : '✓ Kaydet ve Onayla'}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="text-xs font-bold text-slate-900">
                                  {t.name}
                                </div>

                                <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-slate-200/60">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingKey(itemKey);
                                      setEditName(t.name);
                                      setEditDesc(t.description || '');
                                    }}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                                  >
                                    ✏️ Düzenle
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isActionLoading}
                                    onClick={() => handleReject('category', group.item.id, t.lang_code, itemKey)}
                                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100 transition disabled:opacity-50"
                                  >
                                    ✕ Reddet
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isActionLoading}
                                    onClick={() => handleApprove('category', group.item.id, t.lang_code, itemKey)}
                                    className="rounded-lg bg-emerald-600 px-3.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition disabled:opacity-50"
                                  >
                                    {isActionLoading ? '...' : '✓ Onayla'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      )}

      {/* 4. MANUEL ÇEVİRİ EDİTÖRÜ (DISTINCT SEPARATE SECTION) */}
      <div className={styles.sectionCard}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✏️</span>
              <h3 className="text-base font-extrabold text-slate-900">
                Manuel Çeviri Editörü
              </h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">
                {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.badgeLabel}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              İstediğiniz ürün veya kategoriyi elle birebir çevirin. Manuel girilen çeviriler <strong>&ldquo;Manuel&rdquo;</strong> olarak işaretlenir ve AI tarafından asla ezilmez.
            </p>
          </div>

          {/* Selected language switcher inside manual editor */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {SUPPORTED_LANGUAGES.filter((l) => !l.isDefault).map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setSelectedLang(l.code as 'en' | 'de' | 'ru')}
                className={`rounded-lg px-2.5 py-1 font-bold transition ${
                  selectedLang === l.code
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l.badgeLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Item Type Switcher */}
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedItemType('product');
              if (products.length > 0) setSelectedItemId(products[0].id);
            }}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              selectedItemType === 'product'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🍽️ Ürün Çevirisi ({products.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedItemType('category');
              if (categories.length > 0) setSelectedItemId(categories[0].id);
            }}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              selectedItemType === 'category'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📁 Kategori Çevirisi ({categories.length})
          </button>
        </div>

        <form onSubmit={handleSaveManual} className="max-w-xl">
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="trans-item">
              {selectedItemType === 'product' ? 'Çevrilecek Ürün' : 'Çevrilecek Kategori'}
            </label>
            <select
              id="trans-item"
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className={styles.formSelect}
            >
              {selectedItemType === 'product'
                ? products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))
                : categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
            </select>
          </div>

          {/* Source Turkish Original Info Card */}
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                🇹🇷 Orijinal Türkçe Bilgisi:
              </span>
              {existingTranslation && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  existingTranslation.is_manual || existingTranslation.status === 'manual'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {existingTranslation.is_manual || existingTranslation.status === 'manual'
                    ? '✓ Manuel Çeviri (Korumalı)'
                    : '● AI Onaylı Çeviri'}
                </span>
              )}
            </div>
            <strong className="text-xs text-slate-900 block">
              {selectedItemType === 'product' ? activeProduct?.name : activeCategory?.name}
            </strong>
            {((selectedItemType === 'product' ? activeProduct?.description : activeCategory?.description) || null) && (
              <p className="text-xs text-slate-600 mt-1 italic">
                {selectedItemType === 'product' ? activeProduct?.description : activeCategory?.description}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="trans-name">
              {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.label} Adı ({selectedLang.toUpperCase()}) *
            </label>
            <input
              id="trans-name"
              type="text"
              required
              value={currentManualName}
              onChange={(e) => handleManualNameChange(e.target.value)}
              placeholder={`Örn: ${activeProduct?.name || activeCategory?.name || 'Name in ' + selectedLang.toUpperCase()}`}
              className={styles.formInput}
            />
          </div>

          {selectedItemType === 'product' && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="trans-desc">
                {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.label} Açıklaması ({selectedLang.toUpperCase()})
              </label>
              <textarea
                id="trans-desc"
                rows={3}
                value={currentManualDesc}
                onChange={(e) => handleManualDescChange(e.target.value)}
                placeholder="Örn: Delicious description for guests..."
                className={styles.formTextarea}
              />
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={manualLoading || !currentManualName.trim()}
              className={`${styles.formSubmitBtn} disabled:opacity-50`}
            >
              {manualLoading ? 'Kaydediliyor...' : `✓ ${selectedLang.toUpperCase()} Çevirisini Kaydet (Manuel)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
