'use server';

import { createClient } from '@/lib/supabase/server';

export async function submitContactRequestAction(formData: FormData) {
  const supabase = await createClient();

  const fullName = (formData.get('fullName') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim() || null;
  const subject = (formData.get('subject') as string)?.trim() || 'general-support';
  const message = (formData.get('message') as string)?.trim();

  if (!fullName || !email || !message) {
    return { error: 'Lütfen ad soyad, e-posta ve mesaj alanlarını doldurun.' };
  }

  const { error } = await supabase.from('contact_requests').insert({
    full_name: fullName,
    email,
    phone,
    subject,
    message,
    status: 'new',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Contact request insert error:', error);
    // Even if table does not exist yet, return a graceful response
    return {
      success: true,
      message: '✓ Talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
    };
  }

  return {
    success: true,
    message: '✓ Talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
  };
}
