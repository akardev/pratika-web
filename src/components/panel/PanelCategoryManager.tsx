'use client';

import { useState } from 'react';
import type { BusinessData, CategoryData, ProductData } from './PanelDashboardOverview';
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from '@/app/panel/actions';
import styles from './panel.module.css';

export default function PanelCategoryManager({
  business,
  menuId,
  categories,
  products,
}: {
  business: BusinessData;
  menuId: string;
  categories: CategoryData[];
  products: ProductData[];
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await createCategoryAction(business.id, menuId, formData);
    setLoading(false);

    if (result.error) {
      showFeedback('error', result.error);
    } else {
      showFeedback('success', 'Kategori başarıyla eklendi.');
      setIsAddModalOpen(false);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCategory) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await updateCategoryAction(editingCategory.id, formData);
    setLoading(false);

    if (result.error) {
      showFeedback('error', result.error);
    } else {
      showFeedback('success', 'Kategori güncellendi.');
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = async (categoryId: string, catName: string) => {
    const count = products.filter((p) => p.category_id === categoryId).length;
    const confirmText = count > 0
      ? `"${catName}" kategorisini ve içerisindeki ${count} ürünü silmek istediğinize emin misiniz?`
      : `"${catName}" kategorisini silmek istediğinize emin misiniz?`;

    if (!confirm(confirmText)) return;

    const result = await deleteCategoryAction(categoryId);
    if (result.error) {
      showFeedback('error', result.error);
    } else {
      showFeedback('success', 'Kategori silindi.');
    }
  };

  return (
    <div>
      <div className={styles.sectionCardHeader}>
        <div>
          <h2>Kategori Yönetimi</h2>
          <p className="mt-1 text-xs text-slate-500">
            Menünüzün ana bölümlerini (Örn: Kahvaltı, Sıcak Kahveler, Ana Yemekler, Tatlılar) buradan organize edin.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className={styles.actionPrimaryBtn}
        >
          <span>＋</span> Yeni Kategori Ekle
        </button>
      </div>

      {feedbackMsg && (
        <div
          role="alert"
          className={`mb-4 rounded-xl border p-3.5 text-xs font-bold ${
            feedbackMsg.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {feedbackMsg.text}
        </div>
      )}

      <div className={styles.sectionCard}>
        {categories.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📁</div>
            <h3>Henüz kategori eklenmemiş</h3>
            <p>Ürünlerinizi düzenli sunmak için önce bir kategori oluşturun.</p>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className={styles.actionPrimaryBtn}
            >
              ＋ İlk Kategoriyi Ekle
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>Kategori Adı</th>
                  <th>Açıklama</th>
                  <th>Ürün Sayısı</th>
                  <th>Durum</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  const productCount = products.filter((p) => p.category_id === category.id).length;
                  return (
                    <tr key={category.id}>
                      <td>
                        <strong className="text-slate-900">{category.name}</strong>
                      </td>
                      <td>
                        <span className="text-slate-500">{category.description || '—'}</span>
                      </td>
                      <td>
                        <span className="font-bold text-slate-800">{productCount} ürün</span>
                      </td>
                      <td>
                        <span className={category.is_active ? styles.statusActive : styles.statusPassive}>
                          {category.is_active ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td>
                        <div className={styles.tableActions}>
                          <button
                            type="button"
                            onClick={() => setEditingCategory(category)}
                            className={styles.iconBtn}
                          >
                            Düzenle
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(category.id, category.name)}
                            className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                          >
                            Sil
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

      {/* ADD CATEGORY MODAL */}
      {isAddModalOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Yeni Kategori Ekle</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className={styles.closeModalBtn}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateCategory}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="cat-name">Kategori Adı *</label>
                <input
                  id="cat-name"
                  name="name"
                  type="text"
                  placeholder="Örn: Kahvaltı, Kahveler, Ana Yemekler"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="cat-desc">Açıklama (Opsiyonel)</label>
                <input
                  id="cat-desc"
                  name="description"
                  type="text"
                  placeholder="Örn: Saat 12:00'ye kadar servis edilir"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className={styles.actionSecondaryBtn}
                >
                  İptal
                </button>
                <button type="submit" disabled={loading} className={styles.actionPrimaryBtn}>
                  {loading ? 'Kaydediliyor…' : 'Kategoriyi Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Kategoriyi Düzenle</h3>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className={styles.closeModalBtn}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateCategory}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="edit-cat-name">Kategori Adı *</label>
                <input
                  id="edit-cat-name"
                  name="name"
                  type="text"
                  defaultValue={editingCategory.name}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="edit-cat-desc">Açıklama</label>
                <input
                  id="edit-cat-desc"
                  name="description"
                  type="text"
                  defaultValue={editingCategory.description || ''}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className={styles.actionSecondaryBtn}
                >
                  İptal
                </button>
                <button type="submit" disabled={loading} className={styles.actionPrimaryBtn}>
                  {loading ? 'Güncelleniyor…' : 'Kategoriyi Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
