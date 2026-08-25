'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function mapAuthError(errorMsg: string): string {
  const lower = errorMsg.toLowerCase()
  if (lower.includes('user already registered') || lower.includes('already registered')) {
    return 'Bu e-posta adresi ile kayıtlı bir hesap zaten var. Lütfen giriş yapın.'
  }
  if (lower.includes('password should be at least 6 characters') || lower.includes('weak password')) {
    return 'Şifreniz en az 6 karakterden oluşmalıdır.'
  }
  if (lower.includes('invalid login credentials') || lower.includes('invalid credentials')) {
    return 'E-posta adresi veya şifre hatalı.'
  }
  if (lower.includes('invalid email') || lower.includes('unable to validate email')) {
    return 'Lütfen geçerli bir e-posta adresi girin.'
  }
  if (lower.includes('fetch failed') || lower.includes('network') || lower.includes('enotfound')) {
    return 'Sunucuya bağlanılamadı. Supabase proje URL ve anahtarınızın (.env.local) aktif ve doğru olduğunu kontrol edin.'
  }
  return errorMsg || 'İşlem gerçekleştirilemedi.'
}

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const redirectTo = (formData.get('redirectTo') as string) || '/panel'

  if (!email || !password) {
    const errorParam = encodeURIComponent('Lütfen e-posta ve şifrenizi girin.')
    redirect(`/login?mode=login&message=${errorParam}&redirect=${encodeURIComponent(redirectTo)}`)
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const errorParam = encodeURIComponent(mapAuthError(error.message))
    redirect(`/login?mode=login&message=${errorParam}&redirect=${encodeURIComponent(redirectTo)}`)
  }

  revalidatePath('/', 'layout')
  redirect(redirectTo)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const passwordConfirm = (formData.get('passwordConfirm') as string)?.trim()
  const fullName = (formData.get('fullName') as string)?.trim()
  const redirectTo = (formData.get('redirectTo') as string) || '/panel'

  if (!email || !password) {
    const errorParam = encodeURIComponent('Lütfen tüm zorunlu alanları doldurun.')
    redirect(`/login?mode=signup&message=${errorParam}&redirect=${encodeURIComponent(redirectTo)}`)
  }

  if (password.length < 6) {
    const errorParam = encodeURIComponent('Şifreniz en az 6 karakter olmalıdır.')
    redirect(`/login?mode=signup&message=${errorParam}&redirect=${encodeURIComponent(redirectTo)}`)
  }

  if (passwordConfirm && password !== passwordConfirm) {
    const errorParam = encodeURIComponent('Girdiğiniz şifreler birbiriyle eşleşmiyor.')
    redirect(`/login?mode=signup&message=${errorParam}&redirect=${encodeURIComponent(redirectTo)}`)
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || '',
      },
    },
  })

  if (error) {
    const errorParam = encodeURIComponent(mapAuthError(error.message))
    redirect(`/login?mode=signup&message=${errorParam}&redirect=${encodeURIComponent(redirectTo)}`)
  }

  revalidatePath('/', 'layout')
  redirect(redirectTo)
}

export async function updatePasswordAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Oturum açmanız gerekiyor.' }
  }

  const newPassword = formData.get('newPassword') as string
  const newPasswordConfirm = formData.get('newPasswordConfirm') as string

  if (!newPassword || newPassword.length < 6) {
    return { error: 'Yeni şifreniz en az 6 karakter olmalıdır.' }
  }

  if (newPassword !== newPasswordConfirm) {
    return { error: 'Girdiğiniz yeni şifreler eşleşmiyor.' }
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: mapAuthError(error.message) }
  }

  return { success: true }
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
