'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BusinessData, CategoryData, ProductData } from './PanelDashboardOverview';
import {
  createProductAction,
  deleteProductAction,
  generateSingleItemAiTranslationAction,
  toggleProductStatusAction,
  updateProductAction,
} from '@/app/panel/actions';
import styles from './panel.module.css';

export default function PanelMenuManager({
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
  const [activeCatId, setActiveCatId] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [aiTranslatingId, setAiTranslatingId] = useState<string | null>(null);

  // Add modal image state
  const [addImagePreview, setAddImagePreview] = useState<string>('');
  // Edit modal image state
  const [editImagePreview, setEditImagePreview] = useState<string>('');

  const filteredProducts = activeCatId === 'all'
    ? products
    : products.filter((p) => p.category_id === activeCatId);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleAiTranslateProduct = async (product: ProductData) => {
    setAiTranslatingId(product.id);
    const res = await generateSingleItemAiTranslationAction(business.id, 'product', product.id);
    setAiTranslatingId(null);

    if (res.error) {
      showFeedback('error', res.error);
    } else {
      showFeedback('success', res.message || `✓ "${product.name}" için AI çeviri önerileri hazırlandı.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, mode: 'add' | 'edit') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Lütfen geçerli bir görsel formatı seçin (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Görsel boyutu maksimum 5MB olmalıdır.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (mode === 'add') {
        setAddImagePreview(result);
      } else {
        setEditImagePreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (addImagePreview) {
      formData.set('imageUrl', addImagePreview);
    }
    const result = await createProductAction(business.id, menuId, formData);
    setLoading(false);

    if (result.error) {
      showFeedback('error', result.error);
    } else {
      showFeedback('success', 'Ürün başarıyla eklendi.');
      setIsAddModalOpen(false);
      setAddImagePreview('');
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (editImagePreview) {
      formData.set('imageUrl', editImagePreview);
    }
    const result = await updateProductAction(editingProduct.id, formData);
    setLoading(false);

    if (result.error) {
      showFeedback('error', result.error);
    } else {
      showFeedback('success', 'Ürün güncellendi. Masadaki QR kodunuz aynı kaldı!');
      setEditingProduct(null);
      setEditImagePreview('');
    }
  };

  const handleToggleStatus = async (product: ProductData) => {
    const nextStatus = !product.is_active;
    const result = await toggleProductStatusAction(product.id, nextStatus);
    if (result.error) {
      showFeedback('error', result.error);
    } else {
      showFeedback('success', nextStatus ? 'Ürün menüde aktif edildi.' : 'Ürün menüden gizlendi.');
    }
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`"${productName}" ürününü silmek istediğinize emin misiniz?`)) return;
    const result = await deleteProductAction(productId);
    if (result.error) {
      showFeedback('error', result.error);
    } else {
      showFeedback('success', 'Ürün silindi.');
    }
  };

  return (
    <div>
      <div className={styles.sectionCardHeader}>
        <div>
          <h2>Menü ve Ürün Yönetimi</h2>
          <p className="mt-1 text-xs text-slate-500">
            Fiyatlarınızı ve ürünlerinizi buradan güncelleyebilirsiniz. Yapılan değişiklikler canlı menünüze anında yansır.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (categories.length === 0) {
              alert('Lütfen önce "Kategoriler" sekmesinden en az bir kategori ekleyin.');
              return;
            }
            setAddImagePreview('');
            setIsAddModalOpen(true);
          }}
          className={styles.actionPrimaryBtn}
        >
          <span>＋</span> Yeni Ürün Ekle
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

      {/* CATEGORY TABS */}
      <div className={styles.categoryTabs}>
        <button
          type="button"
          onClick={() => setActiveCatId('all')}
          className={`${styles.categoryTab} ${activeCatId === 'all' ? styles.categoryTabActive : ''}`}
        >
          Tüm Ürünler ({products.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCatId(cat.id)}
            className={`${styles.categoryTab} ${activeCatId === cat.id ? styles.categoryTabActive : ''}`}
          >
            {cat.name} ({products.filter((p) => p.category_id === cat.id).length})
          </button>
        ))}
      </div>

      {/* PRODUCT LIST */}
      <div className={styles.sectionCard}>
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📋</div>
            <h3>Bu kategoride henüz ürün bulunmuyor</h3>
            <p>Lezzetli ürünlerinizi, fiyatlarınızı ve açıklamalarınızı ekleyerek menünüzü zenginleştirin.</p>
            <button
              type="button"
              onClick={() => {
                if (categories.length === 0) {
                  alert('Lütfen önce bir kategori oluşturun.');
                  return;
                }
                setAddImagePreview('');
                setIsAddModalOpen(true);
              }}
              className={styles.actionPrimaryBtn}
            >
              ＋ Ürün Ekle
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>Ürün</th>
                  <th>Kategori</th>
                  <th>Fiyat</th>
                  <th>Menü Durumu</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const cat = categories.find((c) => c.id === product.category_id);
                  return (
                    <tr key={product.id}>
                      <td className={styles.productTitleCol}>
                        <div className="flex items-center gap-3">
                          {product.image_url && (
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="h-10 w-10 shrink-0 rounded-lg object-cover border border-slate-200"
                              unoptimized
                            />
                          )}
                          <div>
                            <strong>{product.name}</strong>
                            {product.description && <p>{product.description}</p>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold text-slate-700">{cat?.name || 'Genel'}</span>
                      </td>
                      <td>
                        <span className={styles.productPriceTag}>₺{product.price}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(product)}
                          className={product.is_active ? styles.statusActive : styles.statusPassive}
                          title="Durumu değiştirmek için tıklayın"
                        >
                          {product.is_active ? '✓ Menüde Açık' : '○ Gizli'}
                        </button>
                      </td>
                      <td>
                        <div className={styles.tableActions}>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(product);
                              setEditImagePreview(product.image_url || '');
                            }}
                            className={styles.iconBtn}
                          >
                            ✏️ Düzenle
                          </button>
                          <button
                            type="button"
                            disabled={aiTranslatingId === product.id}
                            onClick={() => handleAiTranslateProduct(product)}
                            className={`${styles.iconBtn} bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200`}
                            title="Bu ürün için İngilizce, Almanca ve Rusça AI çeviri önerisi oluştur"
                          >
                            {aiTranslatingId === product.id ? '⏳ Çevriliyor...' : '✨ AI ile Çevir'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                            title="Sil"
                          >
                            🗑️ Sil
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

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Yeni Ürün Ekle</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className={styles.closeModalBtn}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateProduct}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="prod-cat">Kategori *</label>
                <select
                  id="prod-cat"
                  name="categoryId"
                  className={styles.formSelect}
                  defaultValue={activeCatId !== 'all' ? activeCatId : categories[0]?.id}
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="prod-name">Ürün Adı *</label>
                <input
                  id="prod-name"
                  name="name"
                  type="text"
                  placeholder="Örn: Türk Kahvesi, Avocado Toast"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="prod-price">Fiyat (₺) *</label>
                <input
                  id="prod-price"
                  name="price"
                  type="number"
                  step="0.5"
                  placeholder="90"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="prod-desc">Açıklama / İçerik</label>
                <textarea
                  id="prod-desc"
                  name="description"
                  placeholder="İçerik, pişirme usulü veya porsiyon bilgisi..."
                  className={styles.formTextarea}
                />
              </div>

              {/* IMAGE UPLOAD / URL */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="prod-file">Ürün Fotoğrafı (Opsiyonel)</label>
                <div className="flex items-center gap-3">
                  <input
                    id="prod-file"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleFileChange(e, 'add')}
                    className="text-xs text-slate-500 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {addImagePreview && (
                    <button
                      type="button"
                      onClick={() => setAddImagePreview('')}
                      className="text-xs text-red-600 underline"
                    >
                      Kaldır
                    </button>
                  )}
                </div>
                {addImagePreview && (
                  <div className="mt-2">
                    <Image
                      src={addImagePreview}
                      alt="Önizleme"
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <input
                  name="imageUrl"
                  type="hidden"
                  value={addImagePreview}
                />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input type="checkbox" id="prod-feat" name="isFeatured" value="true" className="h-4 w-4" />
                <label htmlFor="prod-feat" className="text-xs font-semibold text-slate-700">
                  Öne çıkan ürün olarak işaretle (Menü başında vurgulanır)
                </label>
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
                  {loading ? 'Kaydediliyor…' : 'Ürünü Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Ürünü Düzenle</h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className={styles.closeModalBtn}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateProduct}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="edit-cat">Kategori</label>
                <select
                  id="edit-cat"
                  name="categoryId"
                  className={styles.formSelect}
                  defaultValue={editingProduct.category_id}
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="edit-name">Ürün Adı *</label>
                <input
                  id="edit-name"
                  name="name"
                  type="text"
                  defaultValue={editingProduct.name}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="edit-price">Fiyat (₺) *</label>
                <input
                  id="edit-price"
                  name="price"
                  type="number"
                  step="0.5"
                  defaultValue={editingProduct.price}
                  className={styles.formInput}
                  required
                />
                <small className="text-[11px] text-slate-500">
                  Fiyatı güncellediğinizde canlı menünüz anında güncellenir; masadaki QR kodunuz aynı kalır.
                </small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="edit-desc">Açıklama / İçerik</label>
                <textarea
                  id="edit-desc"
                  name="description"
                  defaultValue={editingProduct.description || ''}
                  className={styles.formTextarea}
                />
              </div>

              {/* IMAGE UPLOAD / URL EDIT */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="edit-file">Ürün Fotoğrafı</label>
                <div className="flex items-center gap-3">
                  <input
                    id="edit-file"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleFileChange(e, 'edit')}
                    className="text-xs text-slate-500 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {editImagePreview && (
                    <button
                      type="button"
                      onClick={() => setEditImagePreview('')}
                      className="text-xs text-red-600 underline"
                    >
                      Kaldır
                    </button>
                  )}
                </div>
                {editImagePreview && (
                  <div className="mt-2">
                    <Image
                      src={editImagePreview}
                      alt="Önizleme"
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <input
                  name="imageUrl"
                  type="hidden"
                  value={editImagePreview}
                />
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className={styles.actionSecondaryBtn}
                >
                  İptal
                </button>
                <button type="submit" disabled={loading} className={styles.actionPrimaryBtn}>
                  {loading ? 'Güncelleniyor…' : 'Fiyatı ve Bilgileri Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
