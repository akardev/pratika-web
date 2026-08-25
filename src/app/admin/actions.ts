'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin, getAdminSupabaseClient, logAdminAction, getAllAdminUsers } from '@/lib/admin';

/**
 * Creates a new user (normal customer or admin) from the admin panel.
 */
export async function createUserByAdminAction(formData: FormData) {
  const { user: currentAdmin } = await requireAdmin();

  const fullName = (formData.get('fullName') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;
  const role = (formData.get('role') as string) === 'admin' ? 'admin' : 'customer';

  if (!fullName || !email || !password) {
    return { error: 'Lütfen ad soyad, e-posta ve şifre alanlarını doldurun.' };
  }

  if (password.length < 6) {
    return { error: 'Şifre en az 6 karakter olmalıdır.' };
  }

  const supabase = await createClient();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let createdUserId: string | null = null;

  if (serviceKey) {
    try {
      const adminClient = getAdminSupabaseClient();
      const { data, error } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          role,
        },
      });

      if (error) {
        return { error: error.message || 'Kullanıcı oluşturulamadı.' };
      }
      createdUserId = data.user?.id || null;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Kullanıcı oluşturulamadı.';
      return { error: msg };
    }
  } else {
    // Fallback: standard signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (error) {
      return { error: error.message || 'Kullanıcı oluşturulamadı.' };
    }
    createdUserId = data.user?.id || null;
  }

  // Record in profiles table
  if (createdUserId) {
    try {
      await supabase.from('profiles').upsert({
        id: createdUserId,
        email,
        full_name: fullName,
        role,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Profile write fallback:', e);
    }
  }

  await logAdminAction({
    actorId: currentAdmin.id,
    actorEmail: currentAdmin.email,
    action: 'user_created',
    targetType: 'user',
    targetId: createdUserId || undefined,
    details: { email, fullName, role },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/customers');
  return { success: true, message: `✓ "${fullName}" kullanıcısı (${role === 'admin' ? 'Yönetici' : 'Müşteri'}) başarıyla oluşturuldu.` };
}

/**
 * Updates a user's role between normal customer and admin.
 */
export async function updateUserRoleAction(targetUserId: string, nextRole: 'admin' | 'customer') {
  const { user: currentAdmin } = await requireAdmin();

  if (!targetUserId) {
    return { error: 'Geçersiz kullanıcı ID.' };
  }

  const allUsers = await getAllAdminUsers();
  const targetUser = allUsers.find((u) => u.id === targetUserId);

  if (!targetUser) {
    return { error: 'Kullanıcı bulunamadı.' };
  }

  // Protection: Last remaining admin cannot demote themselves
  const currentAdmins = allUsers.filter((u) => u.role === 'admin');
  if (targetUserId === currentAdmin.id && nextRole === 'customer' && currentAdmins.length <= 1) {
    return { error: 'Sistemde en az bir yönetici bulunmalıdır. Son yönetici rolü değiştirilemez.' };
  }

  const supabase = await createClient();

  // 1. Update profiles table
  try {
    await supabase.from('profiles').upsert({
      id: targetUserId,
      email: targetUser.email,
      role: nextRole,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('Profile role update fallback:', e);
  }

  // 2. If service role is available, update auth.users metadata
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    try {
      const adminClient = getAdminSupabaseClient();
      await adminClient.auth.admin.updateUserById(targetUserId, {
        user_metadata: { role: nextRole },
        app_metadata: { role: nextRole },
      });
    } catch (e) {
      console.warn('Auth admin role update fallback:', e);
    }
  }

  await logAdminAction({
    actorId: currentAdmin.id,
    actorEmail: currentAdmin.email,
    action: 'role_updated',
    targetType: 'user',
    targetId: targetUserId,
    details: { email: targetUser.email, previousRole: targetUser.role, newRole: nextRole },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/customers');
  revalidatePath(`/admin/customers/${targetUserId}`);
  return { success: true, message: `✓ Kullanıcı rolü başarıyla "${nextRole === 'admin' ? 'Yönetici' : 'Müşteri'}" olarak güncellendi.` };
}

/**
 * Deletes a user and safely cascades their businesses, menus, products, categories and translations.
 */
export async function deleteUserByAdminAction(targetUserId: string) {
  const { user: currentAdmin } = await requireAdmin();

  if (!targetUserId) {
    return { error: 'Geçersiz kullanıcı ID.' };
  }

  // Protection 1: Cannot delete own account
  if (targetUserId === currentAdmin.id) {
    return { error: 'Kendi yönetici hesabınızı silemezsiniz.' };
  }

  const allUsers = await getAllAdminUsers();
  const targetUser = allUsers.find((u) => u.id === targetUserId);

  if (!targetUser) {
    return { error: 'Silinecek kullanıcı bulunamadı.' };
  }

  // Protection 2: Cannot delete last remaining admin
  const currentAdmins = allUsers.filter((u) => u.role === 'admin');
  if (targetUser.role === 'admin' && currentAdmins.length <= 1) {
    return { error: 'Son kalan yönetici hesabı silinemez.' };
  }

  const supabase = await createClient();

  // 1. Find all businesses belonging to target user
  const { data: userBusinesses } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', targetUserId);

  const businessIds = (userBusinesses || []).map((b) => b.id);

  if (businessIds.length > 0) {
    // Fetch products and categories to delete translations
    const { data: prods } = await supabase.from('products').select('id').in('business_id', businessIds);
    const { data: cats } = await supabase.from('categories').select('id').in('business_id', businessIds);

    const prodIds = (prods || []).map((p) => p.id);
    const catIds = (cats || []).map((c) => c.id);

    if (prodIds.length > 0) {
      await supabase.from('product_translations').delete().in('product_id', prodIds);
    }
    if (catIds.length > 0) {
      await supabase.from('category_translations').delete().in('category_id', catIds);
    }

    await supabase.from('products').delete().in('business_id', businessIds);
    await supabase.from('categories').delete().in('business_id', businessIds);
    await supabase.from('menus').delete().in('business_id', businessIds);
    await supabase.from('businesses').delete().in('id', businessIds);
  }

  // 2. Delete from profiles table
  try {
    await supabase.from('profiles').delete().eq('id', targetUserId);
  } catch (e) {
    console.warn('Profile delete error:', e);
  }

  // 3. Delete from Supabase Auth if service role key available
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    try {
      const adminClient = getAdminSupabaseClient();
      await adminClient.auth.admin.deleteUser(targetUserId);
    } catch (e) {
      console.warn('Auth admin delete user error:', e);
    }
  }

  await logAdminAction({
    actorId: currentAdmin.id,
    actorEmail: currentAdmin.email,
    action: 'user_deleted',
    targetType: 'user',
    targetId: targetUserId,
    details: { email: targetUser.email, fullName: targetUser.fullName, deletedBusinessCount: businessIds.length },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/customers');
  revalidatePath('/admin/businesses');
  return { success: true, message: `✓ "${targetUser.fullName}" hesabı ve bağlı verileri başarıyla silindi.` };
}

/**
 * Deletes a single business while keeping the user's Auth account intact.
 */
export async function deleteBusinessByAdminAction(businessId: string) {
  const { user: currentAdmin } = await requireAdmin();

  if (!businessId) {
    return { error: 'Geçersiz işletme ID.' };
  }

  const supabase = await createClient();

  const { data: bData } = await supabase.from('businesses').select('*').eq('id', businessId).single();
  if (!bData) {
    return { error: 'Silinecek işletme bulunamadı.' };
  }

  const { data: prods } = await supabase.from('products').select('id').eq('business_id', businessId);
  const { data: cats } = await supabase.from('categories').select('id').eq('business_id', businessId);

  const prodIds = (prods || []).map((p) => p.id);
  const catIds = (cats || []).map((c) => c.id);

  if (prodIds.length > 0) {
    await supabase.from('product_translations').delete().in('product_id', prodIds);
  }
  if (catIds.length > 0) {
    await supabase.from('category_translations').delete().in('category_id', catIds);
  }

  await supabase.from('products').delete().eq('business_id', businessId);
  await supabase.from('categories').delete().eq('business_id', businessId);
  await supabase.from('menus').delete().eq('business_id', businessId);
  await supabase.from('businesses').delete().eq('id', businessId);

  await logAdminAction({
    actorId: currentAdmin.id,
    actorEmail: currentAdmin.email,
    action: 'business_deleted',
    targetType: 'business',
    targetId: businessId,
    details: { name: bData.name, slug: bData.slug, userId: bData.user_id },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/businesses');
  revalidatePath('/admin/customers');
  return { success: true, message: `✓ "${bData.name}" işletmesi başarıyla silindi. (Kullanıcı hesabı korundu)` };
}

/**
 * Sends a password reset email to the user. Admin NEVER sees the password.
 */
export async function sendPasswordResetByAdminAction(email: string) {
  const { user: currentAdmin } = await requireAdmin();

  if (!email) {
    return { error: 'Geçersiz e-posta adresi.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return { error: error.message || 'Şifre sıfırlama bağlantısı gönderilemedi.' };
  }

  await logAdminAction({
    actorId: currentAdmin.id,
    actorEmail: currentAdmin.email,
    action: 'password_reset_sent',
    targetType: 'user',
    details: { targetEmail: email },
  });

  return { success: true, message: `✓ "${email}" adresine şifre sıfırlama bağlantısı gönderildi.` };
}

export async function updateRequestStatusAction(
  requestId: string,
  status: 'new' | 'in_review' | 'completed' | 'rejected',
  adminNotes?: string
) {
  const { user: currentAdmin } = await requireAdmin();

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

  await logAdminAction({
    actorId: currentAdmin.id,
    actorEmail: currentAdmin.email,
    action: 'request_status_updated',
    targetType: 'request',
    targetId: requestId,
    details: { newStatus: status },
  });

  revalidatePath('/admin/requests');
  revalidatePath('/admin');
  return { success: true, message: '✓ Talep durumu başarıyla güncellendi.' };
}

export async function updateBusinessStatusByAdminAction(
  businessId: string,
  isMenuActive: boolean
) {
  const { user: currentAdmin } = await requireAdmin();

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

  await logAdminAction({
    actorId: currentAdmin.id,
    actorEmail: currentAdmin.email,
    action: 'business_status_updated',
    targetType: 'business',
    targetId: businessId,
    details: { isMenuActive },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/businesses');
  revalidatePath(`/admin/businesses/${businessId}`);
  return { success: true, message: `✓ Menü durumu ${isMenuActive ? 'Aktif (Yayında)' : 'Pasif (Gizli)'} olarak güncellendi.` };
}

export async function adminLoginAction(formData: FormData) {
  const { checkIsAdmin } = await import('@/lib/admin');
  const { redirect } = await import('next/navigation');

  const email = (formData.get('email') as string)?.trim().toLowerCase();
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
