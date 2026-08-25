'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { AdminUserRecord } from '@/lib/admin';
import {
  updateUserRoleAction,
  deleteUserByAdminAction,
  deleteBusinessByAdminAction,
  sendPasswordResetByAdminAction,
} from '@/app/admin/actions';
import styles from './admin.module.css';

interface CustomerDetailData {
  user: AdminUserRecord;
  business: {
    id: string;
    name: string;
    slug: string;
    business_type?: string;
    phone?: string | null;
    address?: string | null;
    instagram?: string | null;
    logo_url?: string | null;
    theme: string;
    show_menu_intro?: boolean;
    settings: Record<string, unknown>;
  } | null;
  menu: { id: string; is_active: boolean } | null;
  categories: Array<{ id: string; name: string; position: number }>;
  products: Array<{ id: string; name: string; price: number; is_active: boolean; description?: string; category_id?: string }>;
  productTranslations: Array<{ id: string; product_id: string; lang_code: string }>;
  trial: {
    startDateFormatted: string;
    endDateFormatted: string;
    daysLeft: number;
    isExpired: boolean;
    planName: string;
  } | null;
}

export default function AdminCustomerDetailClient({ data }: { data: CustomerDetailData }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUserRecord>(data.user);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeleteBizModal, setShowDeleteBizModal] = useState(false);

  const { business, categories, products, productTranslations, trial } = data;

  const handleRoleToggle = async () => {
    const nextRole = user.role === 'admin' ? 'customer' : 'admin';
    setLoading(true);
    setFeedback(null);

    const res = await updateUserRoleAction(user.id, nextRole);
    setLoading(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ Rol başarıyla güncellendi.' });
      setUser((prev) => ({ ...prev, role: nextRole }));
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setFeedback(null);

    const res = await sendPasswordResetByAdminAction(user.email);
    setLoading(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ Şifre sıfırlama bağlantısı gönderildi.' });
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    setFeedback(null);
    setShowDeleteUserModal(false);

    const res = await deleteUserByAdminAction(user.id);
    setLoading(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ Kullanıcı hesabı silindi.' });
      setTimeout(() => {
        router.push('/admin/customers');
      }, 1200);
    }
  };

  const handleDeleteBusiness = async () => {
    if (!business) return;
    setLoading(true);
    setFeedback(null);
    setShowDeleteBizModal(false);

    const res = await deleteBusinessByAdminAction(business.id);
    setLoading(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ İşletme silindi.' });
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  const dateStr = new Date(user.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      {/* TOP NOTIFICATIONS */}
      {feedback && (
        <div
          className={`mb-4 rounded-xl border p-3.5 text-xs font-bold ${
            feedback.type === 'success'
              ? 'border-green-500/30 bg-green-500/10 text-emerald-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* TOP HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/customers" className={styles.btnSecondary}>
            ← Kullanıcılar
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {user.fullName}
            </h1>
            <p className="text-xs text-slate-400">
              Kullanıcı ID: <code className="font-mono text-slate-300">{user.id}</code>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {business && (
            <a
              href={`/m/${business.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              <span>🔗</span>
              <span>Menüyü Aç ↗</span>
            </a>
          )}
          <button
            type="button"
            disabled={loading}
            onClick={handlePasswordReset}
            className={styles.btnSecondary}
            title="Kullanıcıya e-posta ile şifre yenileme linki gönder"
          >
            <span>📧</span>
            <span>Şifre Sıfırlama Gönder</span>
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => setShowDeleteUserModal(true)}
            className={styles.btnOutlineDanger}
          >
            <span>⚠️</span>
            <span>Hesabı Sil</span>
          </button>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* 1. KULLANICI HESAP KARTI */}
        <div className={styles.adminCard}>
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              👤 Hesap Bilgileri
            </h2>
            <span
              className={`${styles.statusBadge} ${
                user.role === 'admin' ? styles.badgeWarning : styles.badgeInfo
              }`}
            >
              {user.role === 'admin' ? '👑 Yönetici' : '👤 Müşteri'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Ad Soyad:</span>
              <strong className="text-white">{user.fullName}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">E-Posta:</span>
              <span className="text-slate-200">{user.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Kayıt Tarihi:</span>
              <span className="text-slate-200">{dateStr}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Hesap Durumu:</span>
              <span className="text-emerald-400 font-bold">● Aktif</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5">
            <button
              type="button"
              disabled={loading}
              onClick={handleRoleToggle}
              className="w-full rounded-xl bg-white/5 border border-white/10 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-white transition"
            >
              {user.role === 'admin' ? '👤 Müşteri Rolüne Çevir' : '👑 Yönetici (Admin) Yetkisi Ver'}
            </button>
          </div>
        </div>

        {/* 2. BAĞLI İŞLETME BİLGİSİ */}
        <div className={styles.adminCard}>
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              🏪 Bağlı İşletme
            </h2>
            {business && (
              <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/30 uppercase">
                {business.theme}
              </span>
            )}
          </div>

          {business ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 font-serif text-lg font-bold text-orange-400">
                  {business.logo_url ? (
                    <Image
                      src={business.logo_url}
                      alt={business.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    business.name[0]?.toUpperCase() || 'P'
                  )}
                </div>
                <div>
                  <strong className="block text-white text-sm">{business.name}</strong>
                  <span className="text-xs text-slate-400">/m/{business.slug}</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">İşletme Türü:</span>
                  <span className="text-slate-200">{business.business_type || 'Kafe'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Telefon:</span>
                  <span className="text-slate-200">{business.phone || 'Belirtilmedi'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Adres / Şehir:</span>
                  <span className="text-slate-200">{business.address || 'Belirtilmedi'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Instagram:</span>
                  <span className="text-slate-200">{business.instagram || 'Belirtilmedi'}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowDeleteBizModal(true)}
                  className="w-full rounded-xl bg-red-500/10 border border-red-500/20 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20 transition"
                  title="Yalnızca işletmeyi sil, kullanıcı hesabını koru"
                >
                  🗑️ Yalnızca İşletmeyi Sil
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-2xl mb-2">⭕</div>
              <strong className="block text-slate-200 mb-1">Henüz İşletme Bulunmuyor</strong>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bu kullanıcı kayıt olmuş ancak henüz bir QR menü / işletme profili oluşturmamıştır.
              </p>
            </div>
          )}
        </div>

        {/* 3. TRİAL & DİL DURUMU */}
        <div className={styles.adminCard}>
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              💳 Trial &amp; Diller
            </h2>
          </div>

          {trial ? (
            <div className="space-y-3 text-xs mb-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-slate-400 font-bold">Trial Süresi</span>
                  <span
                    className={`${styles.statusBadge} ${
                      trial.isExpired ? styles.badgeDanger : styles.badgeWarning
                    }`}
                  >
                    {trial.isExpired ? 'Süresi Doldu' : `${trial.daysLeft} Gün Kaldı`}
                  </span>
                </div>
                <div className="text-sm font-extrabold text-white">{trial.planName}</div>
                <div className="text-[10px] text-slate-400 mt-1">Bitiş: {trial.endDateFormatted}</div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Diller &amp; Çeviriler
                </div>
                <div className="rounded-lg bg-white/5 p-2 flex justify-between">
                  <span>🇹🇷 TR — Türkçe</span>
                  <span className="font-bold text-emerald-400">Kaynak Dil</span>
                </div>
                <div className="rounded-lg bg-white/5 p-2 flex justify-between">
                  <span>🇬🇧 EN — English</span>
                  <span className="font-bold text-blue-400">
                    {productTranslations.filter((t) => t.lang_code === 'en').length} Çeviri
                  </span>
                </div>
                <div className="rounded-lg bg-white/5 p-2 flex justify-between">
                  <span>🇩🇪 DE — Deutsch</span>
                  <span className="font-bold text-blue-400">
                    {productTranslations.filter((t) => t.lang_code === 'de').length} Çeviri
                  </span>
                </div>
                <div className="rounded-lg bg-white/5 p-2 flex justify-between">
                  <span>🇷🇺 RU — Русский</span>
                  <span className="font-bold text-blue-400">
                    {productTranslations.filter((t) => t.lang_code === 'ru').length} Çeviri
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 bg-white/5 rounded-2xl border border-white/5">
              <p>İşletme olmadığı için aktif trial veya menü çevirisi bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      {business && (
        <div className={styles.adminCard}>
          <div className={styles.adminCardHeader}>
            <div>
              <h2 className={styles.adminCardTitle}>
                <span>🍽️</span> Menü Ürünleri ({products.length} Ürün · {categories.length} Kategori)
              </h2>
              <p className={styles.adminCardDesc}>
                İşletmenin dijital QR menüsünde yer alan ürünler.
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Bu işletmeye ait henüz ürün bulunmuyor.
            </div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Ürün Adı</th>
                    <th>Kategori</th>
                    <th>Fiyat</th>
                    <th>Durum</th>
                    <th>Açıklama</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const cat = categories.find((c) => c.id === p.category_id);
                    return (
                      <tr key={p.id}>
                        <td>
                          <strong className="text-white text-sm">{p.name}</strong>
                        </td>
                        <td>
                          <span className="text-xs font-semibold text-slate-300">
                            {cat?.name || 'Genel'}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs font-extrabold text-amber-400">
                            ₺{p.price}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${styles.statusBadge} ${
                              p.is_active ? styles.badgeSuccess : styles.badgeNeutral
                            }`}
                          >
                            {p.is_active ? '✓ Menüde' : '○ Gizli'}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs text-slate-400 max-w-xs truncate block">
                            {p.description || '-'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL: DELETE USER */}
      {showDeleteUserModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setShowDeleteUserModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0f172a] p-6 shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4 text-red-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/30 text-xl">
                🗑️
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Kullanıcı Hesabını Sil</h3>
                <p className="text-xs text-red-300">Bu işlem geri alınamaz!</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              <strong>{user.fullName}</strong> ({user.email}) hesabını ve bağlı tüm verilerini silmek istediğinize emin misiniz?
            </p>

            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-[11px] text-red-200 mb-5 space-y-1">
              <p>⚠️ <strong>Uyarı:</strong></p>
              <ul className="list-disc list-inside space-y-0.5 text-red-300">
                <li>Kullanıcının Supabase Auth hesabı silinir.</li>
                <li>Bağlı işletme, menü, kategori ve ürünler temizlenir.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteUserModal(false)}
                className={styles.btnSecondary}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                className={styles.btnOutlineDanger}
              >
                Hesabı Tamamen Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE BUSINESS */}
      {showDeleteBizModal && business && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setShowDeleteBizModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0f172a] p-6 shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4 text-red-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/30 text-xl">
                🏪
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">İşletmeyi Sil</h3>
                <p className="text-xs text-red-300">Kullanıcı hesabı korunacaktır.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              <strong>{business.name}</strong> işletmesini ve menü içeriklerini silmek üzeresiniz. Kullanıcının ({user.email}) Auth hesabı silinmeyecektir.
            </p>

            <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteBizModal(false)}
                className={styles.btnSecondary}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleDeleteBusiness}
                className={styles.btnOutlineDanger}
              >
                İşletmeyi Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
