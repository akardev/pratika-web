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

export async function adminLoginAction(formData: FormData) {
  const { checkIsAdmin } = await import('@/lib/admin');
  const { redirect } = await import('next/navigation');

  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const redirectTo = (formData.get('redirectTo') as string) || '/admin';

  if (!email || !password) {
    return { error: 'Lütfen yönetici e-posta ve şifrenizi girin.' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: 'E-posta adresi veya şifre hatalı.' };
  }

  // Verify Admin authorization
  if (!checkIsAdmin(data.user)) {
    // If authenticated user is NOT an admin, sign out immediately to protect admin space
    await supabase.auth.signOut();
    return { error: 'Bu hesabın Pratika Yönetici (Admin) yetkisi bulunmamaktadır.' };
  }

  revalidatePath('/', 'layout');
  redirect(redirectTo);
}

export async function adminLogoutAction() {
  const { redirect } = await import('next/navigation');
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}
