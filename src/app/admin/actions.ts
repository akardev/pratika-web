'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin';

export async function updateRequestStatusAction(
  requestId: string,
  status: 'new' | 'in_review' | 'completed' | 'rejected',
  adminNotes?: string
) {
  await requireAdmin();

  const supabase = await createClient();

  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (adminNotes !== undefined) {
    updateData.admin_notes = adminNotes.trim();
  }

  const { error } = await supabase
    .from('contact_requests')
    .update(updateData)
    .eq('id', requestId);

  if (error) {
    console.error('Update request status error:', error);
    return { error: 'Talep durumu güncellenirken bir sorun oluştu.' };
  }

  revalidatePath('/admin/requests');
  revalidatePath('/admin');
  return { success: true, message: '✓ Talep durumu başarıyla güncellendi.' };
}

export async function updateBusinessStatusByAdminAction(
  businessId: string,
  isMenuActive: boolean
) {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase
    .from('menus')
    .update({
      is_active: isMenuActive,
      updated_at: new Date().toISOString(),
    })
    .eq('business_id', businessId);

  if (error) {
    console.error('Admin update business menu status error:', error);
    return { error: 'İşletme menü durumu güncellenirken bir sorun oluştu.' };
  }

  revalidatePath('/admin');
  revalidatePath('/admin/businesses');
  revalidatePath(`/admin/businesses/${businessId}`);
  return { success: true, message: `✓ Menü durumu ${isMenuActive ? 'Aktif (Yayında)' : 'Pasif (Gizli)'} olarak güncellendi.` };
}
