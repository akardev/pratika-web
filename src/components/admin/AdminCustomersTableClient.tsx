'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { AdminUserRecord } from '@/lib/admin';
import AdminCreateUserModal from './AdminCreateUserModal';
import { updateUserRoleAction, deleteUserByAdminAction, sendPasswordResetByAdminAction } from '@/app/admin/actions';
import styles from './admin.module.css';

interface AdminCustomersTableClientProps {
  initialUsers: AdminUserRecord[];
}

export default function AdminCustomersTableClient({ initialUsers }: AdminCustomersTableClientProps) {
  const [users, setUsers] = useState<AdminUserRecord[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'admin' | 'customer' | 'with_business' | 'no_business'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<AdminUserRecord | null>(null);
  const [roleChangeUser, setRoleChangeUser] = useState<{ user: AdminUserRecord; nextRole: 'admin' | 'customer' } | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter and search
  const filteredUsers = users.filter((u) => {
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const matches =
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.businesses.some((b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q));
      if (!matches) return false;
    }

    // Tab
    if (activeFilter === 'admin') return u.role === 'admin';
    if (activeFilter === 'customer') return u.role === 'customer';
    if (activeFilter === 'with_business') return u.businesses.length > 0;
    if (activeFilter === 'no_business') return u.businesses.length === 0;

    return true;
  });

  const handleRoleChangeConfirm = async () => {
    if (!roleChangeUser) return;
    const { user, nextRole } = roleChangeUser;
    setLoadingUserId(user.id);
    setFeedback(null);
    setRoleChangeUser(null);

    const res = await updateUserRoleAction(user.id, nextRole);
    setLoadingUserId(null);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ Rol güncellendi.' });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: nextRole } : u))
      );
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleDeleteUserConfirm = async () => {
    if (!deleteConfirmUser) return;
    const target = deleteConfirmUser;
    setLoadingUserId(target.id);
    setFeedback(null);
    setDeleteConfirmUser(null);

    const res = await deleteUserByAdminAction(target.id);
    setLoadingUserId(null);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ Hesap silindi.' });
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleSendPasswordReset = async (email: string) => {
    setFeedback(null);
    const res = await sendPasswordResetByAdminAction(email);
    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ Şifre sıfırlama bağlantısı gönderildi.' });
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  return (
    <div>
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

      {/* TOP HEADER & ACTION */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            👥 Kullanıcı &amp; Müşteri Yönetimi
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Sisteme kayıtlı tüm kullanıcılar, roller ve bağlı işletmelerin merkezi yönetimi.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className={styles.btnPrimary}
        >
          <span>➕</span>
          <span>Yeni Kullanıcı Oluştur</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className={styles.filterBar}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İsim, e-posta, işletme veya ID ara..."
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Temizle
            </button>
          )}
        </div>

        <div className={styles.filterPills}>
          {[
            { key: 'all', label: `Tümü (${users.length})` },
            { key: 'admin', label: `👑 Adminler (${users.filter((u) => u.role === 'admin').length})` },
            { key: 'customer', label: `👤 Müşteriler (${users.filter((u) => u.role === 'customer').length})` },
            { key: 'with_business', label: `🏪 İşletmesi Olanlar (${users.filter((u) => u.businesses.length > 0).length})` },
            { key: 'no_business', label: `⭕ İşletmesiz (${users.filter((u) => u.businesses.length === 0).length})` },
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
      </div>

      {/* USERS TABLE */}
      <div className={styles.adminCard}>
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Arama kriterlerinize uygun kullanıcı bulunamadı.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Kullanıcı</th>
                  <th>Rol</th>
                  <th>Bağlı İşletme(ler)</th>
                  <th>Hesap Durumu</th>
                  <th>Trial &amp; Plan</th>
                  <th>Kayıt Tarihi</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const dateStr = new Date(u.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  const primaryBiz = u.primaryBusiness;
                  const letter = (u.fullName[0] || u.email[0] || 'U').toUpperCase();

                  return (
                    <tr key={u.id}>
                      {/* USER */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-800 to-indigo-900 border border-white/10 font-bold text-white text-sm">
                            {letter}
                          </div>
                          <div>
                            <strong className="block text-white text-sm">{u.fullName}</strong>
                            <span className="text-xs text-slate-400">{u.email}</span>
                            <div className="text-[10px] font-mono text-slate-500">ID: {u.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>

                      {/* ROLE */}
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            u.role === 'admin' ? styles.badgeWarning : styles.badgeInfo
                          }`}
                        >
                          {u.role === 'admin' ? '👑 Yönetici' : '👤 Müşteri'}
                        </span>
                      </td>

                      {/* BUSINESS */}
                      <td>
                        {primaryBiz ? (
                          <div className="flex items-center gap-2">
                            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 font-bold text-orange-400 text-xs">
                              {primaryBiz.logoUrl ? (
                                <Image
                                  src={primaryBiz.logoUrl}
                                  alt={primaryBiz.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                primaryBiz.name[0]?.toUpperCase() || 'P'
                              )}
                            </div>
                            <div>
                              <strong className="block text-white text-xs">{primaryBiz.name}</strong>
                              <a
                                href={`/m/${primaryBiz.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-blue-400 hover:text-blue-300"
                              >
                                /m/{primaryBiz.slug} ↗
                              </a>
                            </div>
                          </div>
                        ) : (
                          <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-400 border border-white/5">
                            ⭕ Henüz İşletme Yok
                          </span>
                        )}
                      </td>

                      {/* STATUS */}
                      <td>
                        <span className={`${styles.statusBadge} ${styles.badgeSuccess}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Aktif
                        </span>
                      </td>

                      {/* TRIAL */}
                      <td>
                        {primaryBiz ? (
                          <div className="text-xs">
                            <span
                              className={`${styles.statusBadge} ${
                                primaryBiz.trial.isExpired ? styles.badgeDanger : styles.badgeWarning
                              }`}
                            >
                              {primaryBiz.trial.isExpired ? 'Süresi Doldu' : `${primaryBiz.trial.daysLeft} Gün`}
                            </span>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              {primaryBiz.productCount} ürün · {primaryBiz.categoryCount} kat.
                            </p>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500">İşletme Bekleniyor</span>
                        )}
                      </td>

                      {/* CREATED AT */}
                      <td>
                        <span className="text-xs text-slate-400">{dateStr}</span>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/admin/customers/${u.id}`}
                            className={styles.btnSecondary}
                            title="Detaylı kullanıcı ve işletme görünümü"
                          >
                            Detay →
                          </Link>

                          {/* Role switch button */}
                          <button
                            type="button"
                            disabled={loadingUserId === u.id}
                            onClick={() =>
                              setRoleChangeUser({
                                user: u,
                                nextRole: u.role === 'admin' ? 'customer' : 'admin',
                              })
                            }
                            className="rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300 hover:bg-white/10 hover:text-white"
                            title={`Rolü ${u.role === 'admin' ? 'Müşteri' : 'Yönetici'} yap`}
                          >
                            {u.role === 'admin' ? '👤 Müşteri Yap' : '👑 Admin Yap'}
                          </button>

                          {/* Reset password button */}
                          <button
                            type="button"
                            disabled={loadingUserId === u.id}
                            onClick={() => handleSendPasswordReset(u.email)}
                            className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-2 py-1 text-[11px] font-bold text-blue-400 hover:bg-blue-500/20"
                            title="Şifre sıfırlama bağlantısı gönder"
                          >
                            📧
                          </button>

                          {/* Delete button */}
                          <button
                            type="button"
                            disabled={loadingUserId === u.id}
                            onClick={() => setDeleteConfirmUser(u)}
                            className="rounded-lg bg-red-500/10 border border-red-500/20 px-2 py-1 text-[11px] font-bold text-red-400 hover:bg-red-500/20"
                            title="Kullanıcıyı ve verilerini sil"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: CREATE USER */}
      <AdminCreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* MODAL: ROLE CHANGE CONFIRMATION */}
      {roleChangeUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setRoleChangeUser(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4 text-amber-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Rol Değişikliğini Onayla</h3>
                <p className="text-xs text-slate-400">Kullanıcı yetki seviyesi güncellenecek.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              <strong>{roleChangeUser.user.fullName}</strong> ({roleChangeUser.user.email}) kullanıcısının rolünü{' '}
              <strong className="text-amber-400 uppercase">
                {roleChangeUser.nextRole === 'admin' ? 'Yönetici (Admin)' : 'Müşteri (Normal Kullanıcı)'}
              </strong>{' '}
              olarak değiştirmek istediğinize emin misiniz?
            </p>

            <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => setRoleChangeUser(null)}
                className={styles.btnSecondary}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleRoleChangeConfirm}
                className={styles.btnPrimary}
              >
                Onayla ve Değiştir →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE USER CONFIRMATION */}
      {deleteConfirmUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setDeleteConfirmUser(null)}
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
                <h3 className="text-base font-extrabold text-white">Hesabı Silmeyi Onayla</h3>
                <p className="text-xs text-red-300">Bu işlem geri alınamaz!</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              <strong>{deleteConfirmUser.fullName}</strong> ({deleteConfirmUser.email}) kullanıcısını sistemden tamamen silmek üzeresiniz.
            </p>

            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-[11px] text-red-200 mb-5 space-y-1">
              <p>⚠️ <strong>Uyarı:</strong> Bu işlem gerçekleştirildiğinde:</p>
              <ul className="list-disc list-inside space-y-0.5 text-red-300">
                <li>Kullanıcının Supabase Auth hesabı silinir.</li>
                <li>Bağlı işletmeleri ({deleteConfirmUser.businesses.length} adet), menüleri, kategorileri ve ürünleri temizlenir.</li>
                <li>Kullanıcı bir daha bu hesapla giriş yapamaz.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => setDeleteConfirmUser(null)}
                className={styles.btnSecondary}
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleDeleteUserConfirm}
                className={styles.btnOutlineDanger}
              >
                Evet, Hesabı Tamamen Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
