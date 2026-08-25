'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getTranslationStatus } from '@/lib/business-settings'

function slugify(text: string): string {
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
  }

  const normalized = text
    .split('')
    .map((char) => trMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return normalized || 'isletme'
}

export async function createBusinessAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Oturum açmanız gerekiyor.' }
  }

  const name = (formData.get('name') as string)?.trim()
  const businessType = (formData.get('businessType') as string)?.trim() || 'Kafe'
  const phone = (formData.get('phone') as string)?.trim() || null
  const address = (formData.get('address') as string)?.trim() || null
  const instagram = (formData.get('instagram') as string)?.trim() || null
  const plainDescription = (formData.get('description') as string)?.trim() || null
  const logoUrlRaw = (formData.get('logoUrl') as string)?.trim()
  const logoUrl = logoUrlRaw && logoUrlRaw !== '__REMOVE__' ? logoUrlRaw : null

  if (!name) {
    return { error: 'İşletme adı zorunludur.' }
  }

  const customSlug = (formData.get('slug') as string)?.trim()
  const baseSlug = slugify(customSlug || name)
  let candidateSlug = baseSlug

  // Check if candidateSlug is unique
  const { data: existing } = await supabase
    .from('businesses')
    .select('id, slug')
    .eq('slug', candidateSlug)
    .maybeSingle()

  if (existing) {
    if (customSlug) {
      return { error: `"${customSlug}" bağlantı adresi (slug) zaten başka bir işletme tarafından kullanılıyor. Lütfen farklı bir isim deneyin.` }
    }
    candidateSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`
  }

  const { encodeBusinessDescriptionWithSettings } = await import('@/lib/business-settings')
  const encodedDesc = encodeBusinessDescriptionWithSettings(plainDescription, {
    menu_theme: 'elegant',
    show_menu_intro: true,
  })

  const insertPayload: Record<string, unknown> = {
    user_id: user.id,
    name,
    slug: candidateSlug,
    business_type: businessType,
    phone,
    address,
    instagram,
    description: encodedDesc,
    logo_url: logoUrl,
    default_lang: 'tr',
    menu_theme: 'elegant',
    show_menu_intro: true,
  }

  let { data: business, error: businessError } = await supabase
    .from('businesses')
    .insert(insertPayload)
    .select()
    .single()

  // Fallback if some schema columns are missing
  if (businessError && (businessError.message.includes('column') || businessError.code === '42703' || businessError.code === 'PGRST204')) {
    const fallbackPayload = {
      user_id: user.id,
      name,
      slug: candidateSlug,
      business_type: businessType,
      phone,
      address,
      instagram,
      description: encodedDesc,
      logo_url: logoUrl,
      default_lang: 'tr',
    }
    const fb = await supabase.from('businesses').insert(fallbackPayload).select().single()
    business = fb.data
    businessError = fb.error
  }

  if (businessError) {
    console.error('Business create error details:', businessError)
    if (businessError.code === '42501' || businessError.message.includes('permission denied')) {
      return { error: 'İşletme kaydı sırasında yetki sorunu oluştu. Lütfen sayfayı yenileyip tekrar deneyin.' }
    }
    if (businessError.message.includes('duplicate key') || businessError.code === '23505') {
      return { error: 'Bu işletme adı veya bağlantı adresi zaten kullanılıyor. Lütfen farklı bir isim deneyin.' }
    }
    return { error: 'İşletme oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.' }
  }

  // Create default active menu
  const { error: menuError } = await supabase
    .from('menus')
    .insert({
      business_id: business.id,
      name: 'Ana Menü',
      slug: 'ana-menu',
      is_active: true,
      position: 0,
    })

  if (menuError) {
    console.error('Menu creation error:', menuError)
  }

  revalidatePath('/panel')
  revalidatePath(`/m/${business.slug}`)
  return { success: true, business }
}

export async function updateBusinessAction(businessId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  // Fetch current business to preserve existing settings
  const { data: currentBusiness } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!currentBusiness) {
    return { error: 'İşletme bulunamadı veya yetkisiz işlem.' }
  }

  const { parseBusinessSettings, encodeBusinessDescriptionWithSettings } = await import('@/lib/business-settings')
  const currentSettings = parseBusinessSettings(currentBusiness)

  const name = (formData.get('name') as string)?.trim()
  const businessType = (formData.get('businessType') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim() || null
  const address = (formData.get('address') as string)?.trim() || null
  const instagram = (formData.get('instagram') as string)?.trim() || null
  const plainDescription = (formData.get('description') as string)?.trim() || null
  const logoUrlRaw = formData.get('logoUrl') as string | null
  const logoUrl = logoUrlRaw === '__REMOVE__' ? null : (logoUrlRaw?.trim() || undefined)
  const welcomeMessage = (formData.get('welcomeMessage') as string)?.trim() || currentSettings.welcome_message
  const slogan = (formData.get('slogan') as string)?.trim() || currentSettings.slogan
  const workingHours = (formData.get('workingHours') as string)?.trim() || currentSettings.working_hours
  const menuTheme = (formData.get('menuTheme') as string)?.trim() || currentSettings.menu_theme
  const showMenuIntroRaw = formData.get('showMenuIntro')
  const showMenuIntro = showMenuIntroRaw !== null ? showMenuIntroRaw === 'true' : currentSettings.show_menu_intro

  if (!name) {
    return { error: 'İşletme adı boş bırakılamaz.' }
  }

  const encodedDescription = encodeBusinessDescriptionWithSettings(plainDescription ?? currentSettings.descriptionText, {
    menu_theme: menuTheme,
    show_menu_intro: showMenuIntro,
    welcome_message: welcomeMessage,
    slogan,
    working_hours: workingHours,
  })

  const updatePayload: Record<string, unknown> = {
    name,
    business_type: businessType,
    phone,
    address,
    instagram,
    description: encodedDescription,
    menu_theme: menuTheme,
    show_menu_intro: showMenuIntro,
    welcome_message: welcomeMessage,
    slogan,
    working_hours: workingHours,
    updated_at: new Date().toISOString(),
  }

  if (logoUrl !== undefined) {
    updatePayload.logo_url = logoUrl
  }

  let { error } = await supabase
    .from('businesses')
    .update(updatePayload)
    .eq('id', businessId)
    .eq('user_id', user.id)

  // If new direct columns are not yet in DB schema, fallback to base payload with encoded description
  if (error && (error.message.includes('column') || error.code === '42703' || error.code === 'PGRST204')) {
    const basePayload: Record<string, unknown> = {
      name,
      business_type: businessType,
      phone,
      address,
      instagram,
      description: encodedDescription,
      updated_at: new Date().toISOString(),
    }
    if (logoUrl !== undefined) {
      basePayload.logo_url = logoUrl
    }
    const retryRes = await supabase
      .from('businesses')
      .update(basePayload)
      .eq('id', businessId)
      .eq('user_id', user.id)
    error = retryRes.error
  }

  if (error) {
    console.error('Update business error:', error)
    return { error: 'İşletme güncellenirken bir sorun oluştu. Lütfen tekrar deneyin.' }
  }

  revalidatePath('/panel')
  if (currentBusiness.slug) {
    revalidatePath(`/m/${currentBusiness.slug}`)
    revalidatePath(`/qr/${currentBusiness.slug}`)
  }
  return { success: true }
}

export async function createCategoryAction(businessId: string, menuId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const position = parseInt((formData.get('position') as string) || '0', 10)

  if (!name) {
    return { error: 'Kategori adı zorunludur.' }
  }

  let targetMenuId = menuId
  if (!targetMenuId) {
    const { data: defaultMenu } = await supabase
      .from('menus')
      .select('id')
      .eq('business_id', businessId)
      .order('position', { ascending: true })
      .limit(1)
      .maybeSingle()
    targetMenuId = defaultMenu?.id || ''
  }

  const { data: category, error } = await supabase
    .from('categories')
    .insert({
      business_id: businessId,
      menu_id: targetMenuId,
      name,
      description,
      position,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message || 'Kategori oluşturulamadı.' }
  }

  revalidatePath('/panel')
  return { success: true, category }
}

export async function updateCategoryAction(categoryId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const isActive = formData.get('isActive') === 'true'

  if (!name) {
    return { error: 'Kategori adı boş olamaz.' }
  }

  const { error } = await supabase
    .from('categories')
    .update({
      name,
      description,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq('id', categoryId)

  if (error) {
    return { error: error.message || 'Kategori güncellenemedi.' }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function deleteCategoryAction(categoryId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId)

  if (error) {
    return { error: error.message || 'Kategori silinemedi.' }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function createProductAction(businessId: string, menuId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const categoryId = (formData.get('categoryId') as string)?.trim()
  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const priceRaw = (formData.get('price') as string)?.trim()
  const imageUrl = (formData.get('imageUrl') as string)?.trim() || null
  const isFeatured = formData.get('isFeatured') === 'true'
  const isActive = formData.get('isActive') !== 'false'

  if (!categoryId || !name || !priceRaw) {
    return { error: 'Kategori, ürün adı ve fiyat alanları zorunludur.' }
  }

  const price = parseFloat(priceRaw.replace(',', '.'))
  if (isNaN(price) || price < 0) {
    return { error: 'Geçersiz fiyat formatı.' }
  }

  let targetMenuId = menuId
  if (!targetMenuId) {
    const { data: defaultMenu } = await supabase
      .from('menus')
      .select('id')
      .eq('business_id', businessId)
      .order('position', { ascending: true })
      .limit(1)
      .maybeSingle()
    targetMenuId = defaultMenu?.id || ''
  }

  const tags = isFeatured ? ['featured'] : []

  const { data: product, error } = await supabase
    .from('products')
    .insert({
      business_id: businessId,
      menu_id: targetMenuId,
      category_id: categoryId,
      name,
      description,
      price,
      image_url: imageUrl,
      is_active: isActive,
      tags: JSON.stringify(tags),
    })
    .select()
    .single()

  if (error) {
    return { error: error.message || 'Ürün oluşturulamadı.' }
  }

  revalidatePath('/panel')
  return { success: true, product }
}

export async function updateProductAction(productId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const categoryId = (formData.get('categoryId') as string)?.trim()
  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const priceRaw = (formData.get('price') as string)?.trim()
  const imageUrl = (formData.get('imageUrl') as string)?.trim() || null
  const isFeatured = formData.get('isFeatured') === 'true'
  const isActive = formData.get('isActive') !== 'false'

  if (!name || !priceRaw) {
    return { error: 'Ürün adı ve fiyat boş bırakılamaz.' }
  }

  const price = parseFloat(priceRaw.replace(',', '.'))
  if (isNaN(price) || price < 0) {
    return { error: 'Geçersiz fiyat formatı.' }
  }

  const tags = isFeatured ? ['featured'] : []

  const updatePayload: Record<string, unknown> = {
    name,
    description,
    price,
    image_url: imageUrl,
    is_active: isActive,
    tags: JSON.stringify(tags),
    updated_at: new Date().toISOString(),
  }

  if (categoryId) {
    updatePayload.category_id = categoryId
  }

  const { error } = await supabase
    .from('products')
    .update(updatePayload)
    .eq('id', productId)

  if (error) {
    return { error: error.message || 'Ürün güncellenemedi.' }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function deleteProductAction(productId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) {
    return { error: error.message || 'Ürün silinemedi.' }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function toggleProductStatusAction(productId: string, isActive: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const { error } = await supabase
    .from('products')
    .update({
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId)

  if (error) {
    return { error: error.message || 'Durum değiştirilemedi.' }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function saveTranslationAction(
  type: 'category' | 'product',
  id: string,
  langCode: string,
  name: string,
  description?: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  if (type === 'category') {
    let { error } = await supabase
      .from('category_translations')
      .upsert({
        category_id: id,
        lang_code: langCode,
        name,
        description: description || null,
        is_manual: true,
        status: 'manual',
        base_hash: 'manual',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'category_id,lang_code' })

    if (error && (error.message.includes('status') || error.code === '42703' || error.code === 'PGRST204')) {
      const fallback = await supabase
        .from('category_translations')
        .upsert({
          category_id: id,
          lang_code: langCode,
          name,
          description: description || null,
          is_manual: true,
          base_hash: 'manual',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'category_id,lang_code' })
      error = fallback.error
    }

    if (error) return { error: error.message }
  } else {
    let { error } = await supabase
      .from('product_translations')
      .upsert({
        product_id: id,
        lang_code: langCode,
        name,
        description: description || null,
        is_manual: true,
        status: 'manual',
        base_hash: 'manual',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'product_id,lang_code' })

    if (error && (error.message.includes('status') || error.code === '42703' || error.code === 'PGRST204')) {
      const fallback = await supabase
        .from('product_translations')
        .upsert({
          product_id: id,
          lang_code: langCode,
          name,
          description: description || null,
          is_manual: true,
          base_hash: 'manual',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'product_id,lang_code' })
      error = fallback.error
    }

    if (error) return { error: error.message }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function fetchTranslationsAction(businessId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  // Get active categories and products IDs for this business
  const { data: categories } = await supabase
    .from('categories')
    .select('id')
    .eq('business_id', businessId)

  const { data: products } = await supabase
    .from('products')
    .select('id')
    .eq('business_id', businessId)

  const catIds = (categories || []).map((c) => c.id)
  const prodIds = (products || []).map((p) => p.id)

  const { data: categoryTranslations } = catIds.length > 0
    ? await supabase
        .from('category_translations')
        .select('*')
        .in('category_id', catIds)
    : { data: [] }

  const { data: productTranslations } = prodIds.length > 0
    ? await supabase
        .from('product_translations')
        .select('*')
        .in('product_id', prodIds)
    : { data: [] }

  // Normalize status for all returned rows
  const normalizedCatTrans = (categoryTranslations || []).map((row) => ({
    ...row,
    status: getTranslationStatus(row),
  }))

  const normalizedProdTrans = (productTranslations || []).map((row) => ({
    ...row,
    status: getTranslationStatus(row),
  }))

  return {
    categoryTranslations: normalizedCatTrans,
    productTranslations: normalizedProdTrans,
  }
}

export async function generateAiTranslationsAction(
  businessId: string,
  targetLangs: ('en' | 'de' | 'ru')[]
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  // Verify business ownership
  const { data: business } = await supabase
    .from('businesses')
    .select('id, slug')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!business) {
    return { error: 'İşletme bulunamadı veya yetkisiz işlem.' }
  }

  // 1. Fetch categories and products
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, description')
    .eq('business_id', businessId)

  const { data: products } = await supabase
    .from('products')
    .select('id, name, description')
    .eq('business_id', businessId)

  const catIds = (categories || []).map((c) => c.id)
  const prodIds = (products || []).map((p) => p.id)

  // 2. Fetch existing translations to prevent overwriting manual translations
  const { data: existingCatTrans } = catIds.length > 0
    ? await supabase.from('category_translations').select('*').in('category_id', catIds)
    : { data: [] }

  const { data: existingProdTrans } = prodIds.length > 0
    ? await supabase.from('product_translations').select('*').in('product_id', prodIds)
    : { data: [] }

  const itemsToTranslate: Array<{
    id: string;
    type: 'product' | 'category';
    name: string;
    description?: string | null;
  }> = []

  // Check categories needing translation
  for (const cat of categories || []) {
    for (const lang of targetLangs) {
      const existing = (existingCatTrans || []).find(
        (t) => t.category_id === cat.id && t.lang_code === lang
      )
      const status = getTranslationStatus(existing)
      // Never overwrite manual translation!
      if (!existing || (!existing.is_manual && status !== 'manual')) {
        if (!itemsToTranslate.some((it) => it.id === cat.id)) {
          itemsToTranslate.push({
            id: cat.id,
            type: 'category',
            name: cat.name,
            description: cat.description,
          })
        }
      }
    }
  }

  // Check products needing translation
  for (const prod of products || []) {
    for (const lang of targetLangs) {
      const existing = (existingProdTrans || []).find(
        (t) => t.product_id === prod.id && t.lang_code === lang
      )
      const status = getTranslationStatus(existing)
      // Never overwrite manual translation!
      if (!existing || (!existing.is_manual && status !== 'manual')) {
        if (!itemsToTranslate.some((it) => it.id === prod.id)) {
          itemsToTranslate.push({
            id: prod.id,
            type: 'product',
            name: prod.name,
            description: prod.description,
          })
        }
      }
    }
  }

  if (itemsToTranslate.length === 0) {
    return {
      success: true,
      count: 0,
      message: 'Seçili diller için tüm öğelerin manuel veya onaylı çevirisi zaten mevcut. Çevrilecek yeni öğe bulunamadı.',
    }
  }

  // 3. Call server-side translation service
  const { translateMenuItems } = await import('@/lib/services/ai-translation')
  const { translations, provider } = await translateMenuItems(itemsToTranslate, targetLangs)

  // 4. Save results with status: 'ai_pending' and base_hash: 'ai_pending:<model>'
  let savedCount = 0
  for (const item of translations) {
    const hashValue = `ai_pending:${item.ai_model || 'v1'}:${item.base_hash}`

    if (item.type === 'category') {
      const existing = (existingCatTrans || []).find(
        (t) => t.category_id === item.id && t.lang_code === item.lang_code
      )
      const status = getTranslationStatus(existing)
      if (existing?.is_manual || status === 'manual') continue

      let { error } = await supabase.from('category_translations').upsert({
        category_id: item.id,
        lang_code: item.lang_code,
        name: item.name,
        description: item.description || null,
        is_manual: false,
        status: 'ai_pending',
        ai_model: item.ai_model,
        base_hash: hashValue,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'category_id,lang_code' })

      if (error && (error.message.includes('status') || error.code === '42703' || error.code === 'PGRST204')) {
        const fallback = await supabase.from('category_translations').upsert({
          category_id: item.id,
          lang_code: item.lang_code,
          name: item.name,
          description: item.description || null,
          is_manual: false,
          base_hash: hashValue,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'category_id,lang_code' })
        error = fallback.error
      }
      if (!error) savedCount++
    } else {
      const existing = (existingProdTrans || []).find(
        (t) => t.product_id === item.id && t.lang_code === item.lang_code
      )
      const status = getTranslationStatus(existing)
      if (existing?.is_manual || status === 'manual') continue

      let { error } = await supabase.from('product_translations').upsert({
        product_id: item.id,
        lang_code: item.lang_code,
        name: item.name,
        description: item.description || null,
        is_manual: false,
        status: 'ai_pending',
        ai_model: item.ai_model,
        base_hash: hashValue,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'product_id,lang_code' })

      if (error && (error.message.includes('status') || error.code === '42703' || error.code === 'PGRST204')) {
        const fallback = await supabase.from('product_translations').upsert({
          product_id: item.id,
          lang_code: item.lang_code,
          name: item.name,
          description: item.description || null,
          is_manual: false,
          base_hash: hashValue,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'product_id,lang_code' })
        error = fallback.error
      }
      if (!error) savedCount++
    }
  }

  revalidatePath('/panel')
  return {
    success: true,
    count: savedCount,
    provider,
    message: savedCount > 0
      ? `✓ ${savedCount} AI çevirisi hazır. Onayınız bekleniyor.`
      : 'Çeviri oluşturulmadı.',
  }
}

export async function generateSingleItemAiTranslationAction(
  businessId: string,
  type: 'product' | 'category',
  id: string,
  targetLangs: ('en' | 'de' | 'ru')[] = ['en', 'de', 'ru']
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  // Verify business ownership
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!business) {
    return { error: 'İşletme bulunamadı veya yetkisiz işlem.' }
  }

  let itemToTranslate: { id: string; type: 'product' | 'category'; name: string; description?: string | null } | null = null

  if (type === 'category') {
    const { data: cat } = await supabase
      .from('categories')
      .select('id, name, description')
      .eq('id', id)
      .eq('business_id', businessId)
      .maybeSingle()

    if (cat) {
      itemToTranslate = { id: cat.id, type: 'category', name: cat.name, description: cat.description }
    }
  } else {
    const { data: prod } = await supabase
      .from('products')
      .select('id, name, description')
      .eq('id', id)
      .eq('business_id', businessId)
      .maybeSingle()

    if (prod) {
      itemToTranslate = { id: prod.id, type: 'product', name: prod.name, description: prod.description }
    }
  }

  if (!itemToTranslate) {
    return { error: 'Çevrilecek öğe bulunamadı.' }
  }

  const { translateMenuItems } = await import('@/lib/services/ai-translation')
  const { translations } = await translateMenuItems([itemToTranslate], targetLangs)

  let savedCount = 0
  for (const item of translations) {
    const hashValue = `ai_pending:${item.ai_model || 'v1'}:${item.base_hash}`

    if (item.type === 'category') {
      let { error } = await supabase.from('category_translations').upsert({
        category_id: item.id,
        lang_code: item.lang_code,
        name: item.name,
        description: item.description || null,
        is_manual: false,
        status: 'ai_pending',
        ai_model: item.ai_model,
        base_hash: hashValue,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'category_id,lang_code' })

      if (error) {
        const fb = await supabase.from('category_translations').upsert({
          category_id: item.id,
          lang_code: item.lang_code,
          name: item.name,
          description: item.description || null,
          is_manual: false,
          base_hash: hashValue,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'category_id,lang_code' })
        error = fb.error
      }
      if (!error) savedCount++
    } else {
      let { error } = await supabase.from('product_translations').upsert({
        product_id: item.id,
        lang_code: item.lang_code,
        name: item.name,
        description: item.description || null,
        is_manual: false,
        status: 'ai_pending',
        ai_model: item.ai_model,
        base_hash: hashValue,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'product_id,lang_code' })

      if (error) {
        const fb = await supabase.from('product_translations').upsert({
          product_id: item.id,
          lang_code: item.lang_code,
          name: item.name,
          description: item.description || null,
          is_manual: false,
          base_hash: hashValue,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'product_id,lang_code' })
        error = fb.error
      }
      if (!error) savedCount++
    }
  }

  revalidatePath('/panel')
  return {
    success: true,
    count: savedCount,
    message: `✓ "${itemToTranslate.name}" için ${savedCount} adet AI çeviri önerisi hazırlandı. Onayınız bekleniyor.`,
  }
}

export async function approveAiTranslationAction(
  type: 'category' | 'product',
  id: string,
  langCode: string,
  name?: string,
  description?: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const updateData: Record<string, unknown> = {
    status: 'ai_approved',
    base_hash: 'ai_approved',
    is_manual: false,
    updated_at: new Date().toISOString(),
  }
  if (name !== undefined) updateData.name = name
  if (description !== undefined) updateData.description = description || null

  if (type === 'category') {
    let { error } = await supabase
      .from('category_translations')
      .update(updateData)
      .eq('category_id', id)
      .eq('lang_code', langCode)

    if (error && (error.message.includes('status') || error.code === '42703' || error.code === 'PGRST204')) {
      const fallbackData = { ...updateData }
      delete fallbackData.status
      const fb = await supabase
        .from('category_translations')
        .update(fallbackData)
        .eq('category_id', id)
        .eq('lang_code', langCode)
      error = fb.error
    }

    if (error) return { error: error.message }
  } else {
    let { error } = await supabase
      .from('product_translations')
      .update(updateData)
      .eq('product_id', id)
      .eq('lang_code', langCode)

    if (error && (error.message.includes('status') || error.code === '42703' || error.code === 'PGRST204')) {
      const fallbackData = { ...updateData }
      delete fallbackData.status
      const fb = await supabase
        .from('product_translations')
        .update(fallbackData)
        .eq('product_id', id)
        .eq('lang_code', langCode)
      error = fb.error
    }

    if (error) return { error: error.message }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function rejectAiTranslationAction(
  type: 'category' | 'product',
  id: string,
  langCode: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  if (type === 'category') {
    const { error } = await supabase
      .from('category_translations')
      .delete()
      .eq('category_id', id)
      .eq('lang_code', langCode)

    if (error) return { error: error.message }
  } else {
    const { error } = await supabase
      .from('product_translations')
      .delete()
      .eq('product_id', id)
      .eq('lang_code', langCode)

    if (error) return { error: error.message }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function approveAllAiTranslationsAction(
  businessId: string,
  targetLang?: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('id')
    .eq('business_id', businessId)

  const { data: products } = await supabase
    .from('products')
    .select('id')
    .eq('business_id', businessId)

  const catIds = (categories || []).map((c) => c.id)
  const prodIds = (products || []).map((p) => p.id)

  if (catIds.length > 0) {
    let query = supabase
      .from('category_translations')
      .select('*')
      .in('category_id', catIds)

    if (targetLang) query = query.eq('lang_code', targetLang)
    const { data: catRows } = await query

    const pendingCatIds = (catRows || [])
      .filter((r) => getTranslationStatus(r) === 'ai_pending')
      .map((r) => r.id)

    if (pendingCatIds.length > 0) {
      const { error } = await supabase
        .from('category_translations')
        .update({ status: 'ai_approved', base_hash: 'ai_approved', updated_at: new Date().toISOString() })
        .in('id', pendingCatIds)

      if (error) {
        await supabase
          .from('category_translations')
          .update({ base_hash: 'ai_approved', updated_at: new Date().toISOString() })
          .in('id', pendingCatIds)
      }
    }
  }

  if (prodIds.length > 0) {
    let query = supabase
      .from('product_translations')
      .select('*')
      .in('product_id', prodIds)

    if (targetLang) query = query.eq('lang_code', targetLang)
    const { data: prodRows } = await query

    const pendingProdIds = (prodRows || [])
      .filter((r) => getTranslationStatus(r) === 'ai_pending')
      .map((r) => r.id)

    if (pendingProdIds.length > 0) {
      const { error } = await supabase
        .from('product_translations')
        .update({ status: 'ai_approved', base_hash: 'ai_approved', updated_at: new Date().toISOString() })
        .in('id', pendingProdIds)

      if (error) {
        await supabase
          .from('product_translations')
          .update({ base_hash: 'ai_approved', updated_at: new Date().toISOString() })
          .in('id', pendingProdIds)
      }
    }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function rejectAllAiTranslationsAction(
  businessId: string,
  targetLang?: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('id')
    .eq('business_id', businessId)

  const { data: products } = await supabase
    .from('products')
    .select('id')
    .eq('business_id', businessId)

  const catIds = (categories || []).map((c) => c.id)
  const prodIds = (products || []).map((p) => p.id)

  if (catIds.length > 0) {
    let query = supabase
      .from('category_translations')
      .select('*')
      .in('category_id', catIds)

    if (targetLang) query = query.eq('lang_code', targetLang)
    const { data: catRows } = await query

    const pendingCatIds = (catRows || [])
      .filter((r) => getTranslationStatus(r) === 'ai_pending')
      .map((r) => r.id)

    if (pendingCatIds.length > 0) {
      await supabase
        .from('category_translations')
        .delete()
        .in('id', pendingCatIds)
    }
  }

  if (prodIds.length > 0) {
    let query = supabase
      .from('product_translations')
      .select('*')
      .in('product_id', prodIds)

    if (targetLang) query = query.eq('lang_code', targetLang)
    const { data: prodRows } = await query

    const pendingProdIds = (prodRows || [])
      .filter((r) => getTranslationStatus(r) === 'ai_pending')
      .map((r) => r.id)

    if (pendingProdIds.length > 0) {
      await supabase
        .from('product_translations')
        .delete()
        .in('id', pendingProdIds)
    }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function toggleMenuStatusAction(menuId: string, isActive: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  const { error } = await supabase
    .from('menus')
    .update({
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq('id', menuId)

  if (error) {
    return { error: error.message || 'Menü durumu güncellenemedi.' }
  }

  revalidatePath('/panel')
  return { success: true }
}

export async function updateMenuThemeAction(businessId: string, theme: string, menuId?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  // 1. Fetch current business to verify ownership and read existing settings
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!business) {
    return { error: 'İşletme bulunamadı veya yetkisiz işlem.' }
  }

  const { parseBusinessSettings, encodeBusinessDescriptionWithSettings } = await import('@/lib/business-settings')
  const { sanitizeThemeId } = await import('@/lib/themes/registry')
  const validTheme = sanitizeThemeId(theme)
  const currentSettings = parseBusinessSettings(business)

  const encodedDescription = encodeBusinessDescriptionWithSettings(currentSettings.descriptionText, {
    ...currentSettings,
    menu_theme: validTheme,
  })

  // 2. Attempt update on businesses with both direct column and encoded description
  let { error: bError } = await supabase
    .from('businesses')
    .update({
      menu_theme: validTheme,
      description: encodedDescription,
      updated_at: new Date().toISOString(),
    })
    .eq('id', businessId)
    .eq('user_id', user.id)

  // If column error occurs (column not yet added in Supabase), fallback to updating description
  if (bError && (bError.message.includes('column') || bError.code === '42703' || bError.code === 'PGRST204')) {
    const fallbackRes = await supabase
      .from('businesses')
      .update({
        description: encodedDescription,
        updated_at: new Date().toISOString(),
      })
      .eq('id', businessId)
      .eq('user_id', user.id)
    bError = fallbackRes.error
  }

  // 3. Also update menus table if menuId provided
  if (menuId) {
    await supabase
      .from('menus')
      .update({
        menu_theme: validTheme,
        updated_at: new Date().toISOString(),
      })
      .eq('id', menuId)
  }

  if (bError) {
    console.error('Update menu theme error:', bError)
    return { error: 'Tema kaydedilemedi. Lütfen tekrar deneyin.' }
  }

  revalidatePath('/panel')
  if (business.slug) {
    revalidatePath(`/m/${business.slug}`)
    revalidatePath(`/qr/${business.slug}`)
  }
  return { success: true, theme: validTheme }
}

export async function toggleMenuIntroAction(businessId: string, showIntro: boolean, menuId?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz erişim.' }
  }

  // 1. Fetch current business to verify ownership and read existing settings
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!business) {
    return { error: 'İşletme bulunamadı veya yetkisiz işlem.' }
  }

  const { parseBusinessSettings, encodeBusinessDescriptionWithSettings } = await import('@/lib/business-settings')
  const currentSettings = parseBusinessSettings(business)

  const encodedDescription = encodeBusinessDescriptionWithSettings(currentSettings.descriptionText, {
    ...currentSettings,
    show_menu_intro: showIntro,
  })

  // 2. Attempt update on businesses with both direct column and encoded description
  let { error: bError } = await supabase
    .from('businesses')
    .update({
      show_menu_intro: showIntro,
      description: encodedDescription,
      updated_at: new Date().toISOString(),
    })
    .eq('id', businessId)
    .eq('user_id', user.id)

  // If column error occurs, fallback to updating description
  if (bError && (bError.message.includes('column') || bError.code === '42703' || bError.code === 'PGRST204')) {
    const fallbackRes = await supabase
      .from('businesses')
      .update({
        description: encodedDescription,
        updated_at: new Date().toISOString(),
      })
      .eq('id', businessId)
      .eq('user_id', user.id)
    bError = fallbackRes.error
  }

  // 3. Also update menus table if menuId provided
  if (menuId) {
    await supabase
      .from('menus')
      .update({
        show_menu_intro: showIntro,
        updated_at: new Date().toISOString(),
      })
      .eq('id', menuId)
  }

  if (bError) {
    console.error('Toggle menu intro error:', bError)
    return { error: 'Giriş ekranı ayarı güncellenemedi. Lütfen tekrar deneyin.' }
  }

  revalidatePath('/panel')
  if (business.slug) {
    revalidatePath(`/m/${business.slug}`)
    revalidatePath(`/qr/${business.slug}`)
  }
  return { success: true, showIntro }
}



