'use client';

import { useState } from 'react';
import { updateRequestStatusAction } from '@/app/admin/actions';
import styles from './admin.module.css';

export interface ContactRequestItem {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'in_review' | 'completed' | 'rejected';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const subjectLabels: Record<string, string> = {
  'qr-menu-kurulum': '🤝 Menü Kurulum Desteği',
  'qr-menu-ek-dil': '🌐 Ek Dil Talebi',
  'general-support': '🛠️ Genel Destek',
  'tool-suggestion': '💡 Yeni Araç Önerisi',
  collaboration: '💼 İş Birliği',
  other: '📌 Diğer',
};

export default function AdminRequestsClient({ initialRequests }: { initialRequests: ContactRequestItem[] }) {
  const [requests, setRequests] = useState<ContactRequestItem[]>(initialRequests);
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'in_review' | 'completed' | 'rejected'>('all');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const filteredRequests = activeFilter === 'all'
    ? requests
    : requests.filter((r) => r.status === activeFilter);

  const handleStatusChange = async (requestId: string, nextStatus: 'new' | 'in_review' | 'completed' | 'rejected') => {
    setLoadingId(requestId);
    setFeedback(null);

    // Optimistic UI
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: nextStatus } : r))
    );

    const res = await updateRequestStatusAction(requestId, nextStatus);
    setLoadingId(null);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ Talep durumu güncellendi.' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div>
      {feedback && (
        <div
          className={`mb-4 rounded-xl border p-3 text-xs font-bold ${
            feedback.type === 'success'
              ? 'border-green-500/30 bg-green-500/10 text-emerald-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* FILTER PILLS */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[
          { key: 'all', label: `Tümü (${requests.length})` },
          { key: 'new', label: `🟡 Yeni (${requests.filter((r) => r.status === 'new').length})` },
          { key: 'in_review', label: `🔵 İnceleniyor (${requests.filter((r) => r.status === 'in_review').length})` },
          { key: 'completed', label: `🟢 Tamamlandı (${requests.filter((r) => r.status === 'completed').length})` },
          { key: 'rejected', label: `🔴 Reddedildi (${requests.filter((r) => r.status === 'rejected').length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilter(tab.key as typeof activeFilter)}
            className={`${styles.filterPill} ${
              activeFilter === tab.key ? styles.filterPillActive : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* REQUESTS LIST */}
      <div className={styles.adminCard}>
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            {activeFilter === 'all'
              ? 'Henüz gelen bir müşteri veya destek talebi bulunmuyor.'
              : 'Seçili filtreye ait talep bulunamadı.'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => {
              const dateStr = new Date(req.created_at).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={req.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-white">
                          {req.full_name}
                        </strong>
                        <span className="text-xs text-slate-400">({req.email})</span>
                        {req.phone && (
                          <span className="text-xs text-blue-400">📞 {req.phone}</span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-300">
                          {subjectLabels[req.subject] || req.subject}
                        </span>
                        <span className="text-slate-500">· {dateStr}</span>
                      </div>
                    </div>

                    {/* STATUS SELECTOR */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">Durum:</span>
                      <select
                        value={req.status}
                        disabled={loadingId === req.id}
                        onChange={(e) =>
                          handleStatusChange(
                            req.id,
                            e.target.value as 'new' | 'in_review' | 'completed' | 'rejected'
                          )
                        }
                        className="rounded-lg bg-slate-900 border border-white/15 px-3 py-1 text-xs font-bold text-white outline-none focus:border-blue-500"
                      >
                        <option value="new">🟡 Yeni</option>
                        <option value="in_review">🔵 İnceleniyor</option>
                        <option value="completed">🟢 Tamamlandı</option>
                        <option value="rejected">🔴 Reddedildi</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {req.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
