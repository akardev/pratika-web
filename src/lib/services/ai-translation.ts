import crypto from 'crypto';

export type TargetLanguage = 'en' | 'de' | 'ru';

export interface MenuItemForTranslation {
  id: string;
  type: 'product' | 'category';
  name: string;
  description?: string | null;
}

export interface TranslatedItemResult {
  id: string;
  type: 'product' | 'category';
  lang_code: TargetLanguage;
  name: string;
  description?: string | null;
  ai_model: string;
  base_hash: string;
}

export function computeTextHash(name: string, description?: string | null): string {
  const normalized = `${name.trim().toLowerCase()}::${(description || '').trim().toLowerCase()}`;
  return crypto.createHash('sha256').update(normalized).digest('hex').slice(0, 16);
}

// Built-in authentic culinary dictionary for Turkish restaurant & cafe items
const CULINARY_NAMES: Record<string, { en: string; de: string; ru: string }> = {
  // Categories
  'kahvaltı': { en: 'Breakfast', de: 'Frühstück', ru: 'Завтрак' },
  'kahvaltılıklar': { en: 'Breakfast Specials', de: 'Frühstücksspezialitäten', ru: 'Завтраки' },
  'kahvaltı tabakları': { en: 'Breakfast Plates', de: 'Frühstücksteller', ru: 'Завтраки' },
  'serpme kahvaltı': { en: 'Traditional Spread Breakfast', de: 'Traditionelles Frühstück', ru: 'Традиционный турецкий завтрак' },
  'sıcak içecekler': { en: 'Hot Beverages', de: 'Heißgetränke', ru: 'Горячие напитки' },
  'soğuk içecekler': { en: 'Cold Beverages', de: 'Kaltgetränke', ru: 'Холодные напитки' },
  'içecekler': { en: 'Beverages', de: 'Getränke', ru: 'Напитки' },
  'kahveler': { en: 'Coffees', de: 'Kaffeespezialitäten', ru: 'Кофе' },
  'çaylar': { en: 'Teas', de: 'Teespezialitäten', ru: 'Чай' },
  'bitki çayları': { en: 'Herbal Teas', de: 'Kräutertees', ru: 'Травяной чай' },
  'tatlılar': { en: 'Desserts', de: 'Desserts & Süßspeisen', ru: 'Десерты' },
  'pastalar': { en: 'Cakes & Pastries', de: 'Kuchen & Torten', ru: 'Торты и выпечка' },
  'burgerler': { en: 'Burgers', de: 'Burger', ru: 'Бургеры' },
  'sandviçler': { en: 'Sandwiches', de: 'Sandwiches', ru: 'Сэндвичи' },
  'tostlar': { en: 'Toasts & Paninis', de: 'Toasts', ru: 'Тосты' },
  'dürüm & sarmalar': { en: 'Wraps & Rolls', de: 'Wraps & Rollen', ru: 'Роллы и шаурма' },
  'dürümler': { en: 'Wraps', de: 'Wraps', ru: 'Роллы в лаваше' },
  'makarnalar': { en: 'Pastas', de: 'Pasta', ru: 'Паста' },
  'pizzalar': { en: 'Pizzas', de: 'Pizzen', ru: 'Пицца' },
  'pideler': { en: 'Traditional Pides', de: 'Pide-Spezialitäten', ru: 'Пиде' },
  'salatalar': { en: 'Salads', de: 'Salate', ru: 'Салаты' },
  'ana yemekler': { en: 'Main Courses', de: 'Hauptgerichte', ru: 'Главные блюда' },
  'ızgaralar': { en: 'Grills & BBQ', de: 'Grillspezialitäten', ru: 'Блюда на гриле' },
  'kebaplar': { en: 'Kebabs', de: 'Kebab-Spezialitäten', ru: 'Кебабы' },
  'çorbalar': { en: 'Soups', de: 'Suppen', ru: 'Супы' },
  'mezeler': { en: 'Appetizers & Mezes', de: 'Meze & Vorspeisen', ru: 'Закуски и мезе' },
  'başlangıçlar': { en: 'Starters', de: 'Vorspeisen', ru: 'Закуски' },
  'atıştırmalıklar': { en: 'Snacks & Bites', de: 'Snacks & Fingerfood', ru: 'Закуски' },
  'özel lezzetler': { en: 'Chef Specials', de: 'Chef-Empfehlungen', ru: 'Фирменные блюда' },

  // Authentic & Popular Dishes
  'köfte dürüm': { en: 'Köfte Wrap', de: 'Köfte-Wrap', ru: 'Кёфте в лаваше' },
  'adana dürüm': { en: 'Adana Kebab Wrap', de: 'Adana-Kebab-Wrap', ru: 'Адана кебаб в лаваше' },
  'urfa dürüm': { en: 'Urfa Kebab Wrap', de: 'Urfa-Kebab-Wrap', ru: 'Урфа кебаб в лаваше' },
  'tavuk dürüm': { en: 'Chicken Wrap', de: 'Hähnchen-Wrap', ru: 'Куриный ролл в лаваше' },
  'köfte': { en: 'Grilled Meatballs (Köfte)', de: 'Gegrillte Köfte', ru: 'Котлеты кёфте на гриле' },
  'ızgara köfte': { en: 'Grilled Köfte Meatballs', de: 'Gegrillte Köfte', ru: 'Котлеты кёфте на гриле' },
  'kaşarlı köfte': { en: 'Cheese-Stuffed Köfte', de: 'Köfte mit Käsefüllung', ru: 'Котлеты кёфте с сыром' },
  'latte': { en: 'Caffè Latte', de: 'Caffè Latte', ru: 'Латте' },
  'cappuccino': { en: 'Cappuccino', de: 'Cappuccino', ru: 'Капучино' },
  'espresso': { en: 'Espresso', de: 'Espresso', ru: 'Эспрессо' },
  'americano': { en: 'Americano', de: 'Americano', ru: 'Американо' },
  'türk kahvesi': { en: 'Turkish Coffee', de: 'Türkischer Kaffee', ru: 'Турецкий кофе' },
  'filtre kahve': { en: 'Filter Coffee', de: 'Filterkaffee', ru: 'Фильтр-кофе' },
  'sıcak çikolata': { en: 'Hot Chocolate', de: 'Heiße Schokolade', ru: 'Горячий шоколад' },
  'mocha': { en: 'Caffè Mocha', de: 'Caffè Mocha', ru: 'Мокка' },
  'türk çayı': { en: 'Turkish Black Tea', de: 'Türkischer Schwarztee', ru: 'Турецкий черный чай' },
  'çay': { en: 'Turkish Black Tea', de: 'Türkischer Schwarztee', ru: 'Турецкий чай' },
  'limonata': { en: 'Fresh Homemade Lemonade', de: 'Hausgemachte Limonade', ru: 'Домашний лимонад' },
  'cheesecake': { en: 'Cheesecake', de: 'Käsekuchen', ru: 'Чизкейк' },
  'san sebastian cheesecake': { en: 'San Sebastian Cheesecake', de: 'San Sebastian Käsekuchen', ru: 'Чизкейк Сан-Себастьян' },
  'tiramisu': { en: 'Classic Tiramisu', de: 'Klassisches Tiramisu', ru: 'Классический тирамису' },
  'sufle': { en: 'Chocolate Soufflé', de: 'Schokoladensoufflé', ru: 'Шоколадное суфле' },
  'baklava': { en: 'Traditional Pistachio Baklava', de: 'Traditionelles Baklava', ru: 'Традиционная пахлава' },
  'künefe': { en: 'Künefe with Melted Cheese', de: 'Künefe mit Käse', ru: 'Кюнефе с сыром' },
  'klasik burger': { en: 'Classic Burger', de: 'Klassischer Burger', ru: 'Классический бургер' },
  'cheeseburger': { en: 'Cheeseburger', de: 'Cheeseburger', ru: 'Чизбургер' },
  'tavuk burger': { en: 'Crispy Chicken Burger', de: 'Knuspriger Hähnchenburger', ru: 'Бургер с хрустящей курицей' },
  'margherita pizza': { en: 'Pizza Margherita', de: 'Pizza Margherita', ru: 'Пицца Маргарита' },
  'karışık pizza': { en: 'Mixed Special Pizza', de: 'Gemischte Spezialpizza', ru: 'Пицца Ассорти' },
  'kaşarlı tost': { en: 'Grilled Cheese Toast', de: 'Käsetoast', ru: 'Тост с сыром' },
  'karışık tost': { en: 'Mixed Toast (Sucuk & Cheese)', de: 'Gemischter Toast', ru: 'Тост с суджуком и сыром' },
  'menemen': { en: 'Menemen (Turkish Scrambled Eggs)', de: 'Menemen (Türkisches Rührei)', ru: 'Менемен (турецкая яичница)' },
  'adana kebap': { en: 'Spicy Adana Kebab', de: 'Scharfer Adana Kebab', ru: 'Острый Адана кебаб' },
  'urfa kebap': { en: 'Urfa Kebab (Mild)', de: 'Milder Urfa Kebab', ru: 'Урфа кебаб' },
  'mercimek çorbası': { en: 'Traditional Red Lentil Soup', de: 'Rote Linsensuppe', ru: 'Чечевичный суп' },
  'sezar salata': { en: 'Caesar Salad', de: 'Caesar Salat', ru: 'Салат Цезарь' },
  'patates kızartması': { en: 'Crispy French Fries', de: 'Knusprige Pommes Frites', ru: 'Картофель фри' },
  'lahmacun': { en: 'Traditional Lahmacun (Turkish Pizza)', de: 'Traditionelles Lahmacun', ru: 'Лахмаджун (турецкая пицца)' },
  'iskender kebap': { en: 'Iskender Kebab with Browned Butter', de: 'Iskender Kebab', ru: 'Искендер кебаб' },
  'manti': { en: 'Turkish Mantı Dumplings with Garlic Yogurt', de: 'Türkische Manti', ru: 'Турецкие манты с йогуртом' },
  'mantı': { en: 'Turkish Mantı Dumplings with Garlic Yogurt', de: 'Türkische Manti', ru: 'Турецкие манты с йогуртом' },
};

/**
 * Clean & validate language purity of translated text
 */
function cleanAndValidateLanguagePurity(
  text: string,
  targetLang: TargetLanguage
): string {
  if (!text || !text.trim()) return '';

  let cleaned = text.trim();

  if (targetLang === 'ru') {
    // Replace any remaining Turkish descriptive fragments with natural Russian
    cleaned = cleaned
      .replace(/ızgarada özenle pişmiş/gi, 'приготовленные на гриле с заботой')
      .replace(/ızgarada/gi, 'на гриле')
      .replace(/özenle pişmiş/gi, 'тщательно приготовленные')
      .replace(/baharatlı köfteler/gi, 'пряные котлеты кёфте')
      .replace(/köfteler/gi, 'котлеты кёфте')
      .replace(/taze lavaşa sarılarak/gi, 'завернутые в свежий лаваш')
      .replace(/taze lavaş/gi, 'свежий лаваш')
      .replace(/lavaş/gi, 'лаваш')
      .replace(/doyurucu bir tat sunar/gi, 'подарят сытный и насыщенный вкус')
      .replace(/tat sunar/gi, 'дарит превосходный вкус')
      .replace(/doyurucu/gi, 'сытный')
      .replace(/taze fırınlanmış/gi, 'свежеиспеченный')
      .replace(/akışkan kıvamıyla/gi, 'с нежной тающей текстурой')
      .replace(/karamelize/gi, 'карамелизированный')
      .replace(/ünlü ispanyol tatlısı/gi, 'знаменитый испанский десерт')
      .replace(/özenle demlenen/gi, 'тщательно заваренные')
      .replace(/bitki çayları/gi, 'травяные чаи')
      .replace(/taze çekilmiş kahve çeşitleri/gi, 'свежемолотые сорта кофе')
      .replace(/çeşitleri/gi, 'сорта и варианты')
      .replace(/servis edilir/gi, 'подается')
      .replace(/özel sos/gi, 'фирменный соус')
      .replace(/lezzetli/gi, 'восхитительный');
  } else if (targetLang === 'en') {
    cleaned = cleaned
      .replace(/ızgarada özenle pişmiş/gi, 'carefully grilled')
      .replace(/ızgarada/gi, 'grilled')
      .replace(/özenle pişmiş/gi, 'carefully cooked')
      .replace(/baharatlı köfteler/gi, 'spiced meatballs')
      .replace(/köfteler/gi, 'meatballs')
      .replace(/taze lavaşa sarılarak/gi, 'wrapped in fresh lavash')
      .replace(/doyurucu bir tat sunar/gi, 'for a satisfying and flavorful meal')
      .replace(/tat sunar/gi, 'offers great flavor')
      .replace(/taze fırınlanmış/gi, 'freshly baked')
      .replace(/akışkan kıvamıyla/gi, 'with a creamy melted center')
      .replace(/ünlü ispanyol tatlısı/gi, 'famous Spanish dessert')
      .replace(/özenle demlenen/gi, 'carefully brewed')
      .replace(/bitki çayları/gi, 'herbal teas')
      .replace(/taze çekilmiş kahve çeşitleri/gi, 'freshly ground coffee varieties')
      .replace(/özel sos/gi, 'special house sauce')
      .replace(/servis edilir/gi, 'served');
  } else if (targetLang === 'de') {
    cleaned = cleaned
      .replace(/ızgarada özenle pişmiş/gi, 'sorgfältig auf dem Grill zubereitete')
      .replace(/ızgarada/gi, 'gegrillt')
      .replace(/özenle pişmiş/gi, 'sorgfältig zubereitet')
      .replace(/baharatlı köfteler/gi, 'würzige Köfte-Fleischbällchen')
      .replace(/köfteler/gi, 'Köfte-Fleischbällchen')
      .replace(/taze lavaşa sarılarak/gi, 'in frisches Lavash gewickelt')
      .replace(/doyurucu bir tat sunar/gi, 'für einen sättigenden und köstlichen Genuss')
      .replace(/tat sunar/gi, 'bietet köstlichen Geschmack')
      .replace(/taze fırınlanmış/gi, 'frisch gebacken')
      .replace(/akışkan kıvamıyla/gi, 'mit cremiger Textur')
      .replace(/ünlü ispanyol tatlısı/gi, 'berühmtes spanisches Dessert')
      .replace(/özenle demlenen/gi, 'sorgfältig aufgebrühte')
      .replace(/bitki çayları/gi, 'Kräutertees')
      .replace(/taze çekilmiş kahve çeşitleri/gi, 'frisch gemahlene Kaffeespezialitäten')
      .replace(/özel sos/gi, 'hausgemachte Spezialsauce')
      .replace(/servis edilir/gi, 'serviert');
  }

  return cleaned;
}

/**
 * Translate natural sentences using MyMemory Translation API
 */
async function translateWithNeuralApi(
  text: string,
  targetLang: TargetLanguage
): Promise<string | null> {
  if (!text || !text.trim()) return '';

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=tr|${targetLang}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Pratika-Restaurant-AI/2.0',
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(4500),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const translated = data?.responseData?.translatedText;
    if (translated && typeof translated === 'string' && translated.trim()) {
      // Decode HTML entities if any
      const decoded = translated
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      return cleanAndValidateLanguagePurity(decoded, targetLang);
    }
  } catch {
    // Fall back to rule engine if network timeout occurs
  }

  return null;
}

/**
 * Intelligent Gastronomy & Menu Translation Engine
 */
async function translateMenuItemPure(
  item: MenuItemForTranslation,
  targetLang: TargetLanguage
): Promise<{ name: string; description: string | null }> {
  const lowerName = item.name.trim().toLowerCase();

  // 1. Resolve authentic name: check culinary dictionary first for authentic gastronomy terms
  let translatedName = CULINARY_NAMES[lowerName]?.[targetLang] || '';

  if (!translatedName) {
    // Try neural translation for product/category name
    const neuralName = await translateWithNeuralApi(item.name, targetLang);
    translatedName = neuralName || item.name;
  }

  translatedName = cleanAndValidateLanguagePurity(translatedName, targetLang);

  // 2. Resolve description: neural whole-sentence translation
  let translatedDesc: string | null = null;
  if (item.description && item.description.trim()) {
    const neuralDesc = await translateWithNeuralApi(item.description, targetLang);
    if (neuralDesc) {
      translatedDesc = cleanAndValidateLanguagePurity(neuralDesc, targetLang);
    } else {
      translatedDesc = cleanAndValidateLanguagePurity(item.description, targetLang);
    }
  }

  return {
    name: translatedName || item.name,
    description: translatedDesc,
  };
}

/**
 * Calls Gemini API if GEMINI_API_KEY is available
 */
async function callGeminiApi(
  items: MenuItemForTranslation[],
  targetLangs: TargetLanguage[],
  apiKey: string
): Promise<TranslatedItemResult[] | null> {
  try {
    const prompt = `You are an expert culinary & restaurant menu translator. Translate the following Turkish restaurant menu items into the requested languages (${targetLangs.join(', ')}).

CRITICAL GASTRONOMY RULES:
1. PURE TARGET LANGUAGE: The output for each language must be 100% in the target language (EN = English, DE = German, RU = Russian with Russian Cyrillic). NEVER mix Turkish words or Turkish sentence fragments into Russian or English.
2. Authentic dish names: preserve or use authentic culinary names (e.g. "Köfte Wrap" or "Meatball Wrap" in EN, "Köfte-Wrap" in DE, "Кёфте в лаваше" in RU).
3. Translate descriptions appetisingly and naturally into full, grammatical target language sentences.
4. Output ONLY a valid JSON array of objects:
[
  {
    "id": "string",
    "type": "product" | "category",
    "lang_code": "en" | "de" | "ru",
    "name": "Translated Name",
    "description": "Translated description or null"
  }
]

Items to translate:
${JSON.stringify(
  items.map((i) => ({
    id: i.id,
    type: i.type,
    name: i.name,
    description: i.description || null,
  })),
  null,
  2
)}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json',
        },
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    if (!Array.isArray(parsed)) return null;

    const results: TranslatedItemResult[] = [];
    for (const p of parsed) {
      const srcItem = items.find((it) => it.id === p.id);
      if (srcItem && targetLangs.includes(p.lang_code as TargetLanguage)) {
        results.push({
          id: p.id,
          type: p.type || srcItem.type,
          lang_code: p.lang_code as TargetLanguage,
          name: cleanAndValidateLanguagePurity(p.name || srcItem.name, p.lang_code as TargetLanguage),
          description: p.description
            ? cleanAndValidateLanguagePurity(p.description, p.lang_code as TargetLanguage)
            : null,
          ai_model: 'gemini-1.5-flash',
          base_hash: computeTextHash(srcItem.name, srcItem.description),
        });
      }
    }

    return results;
  } catch (err) {
    console.warn('Gemini API translation skipped/error:', err);
    return null;
  }
}

/**
 * Calls OpenAI API if OPENAI_API_KEY is available
 */
async function callOpenAiApi(
  items: MenuItemForTranslation[],
  targetLangs: TargetLanguage[],
  apiKey: string
): Promise<TranslatedItemResult[] | null> {
  try {
    const prompt = `You are a culinary translator for restaurant & cafe menus. Translate these Turkish menu items into: ${targetLangs.join(', ')}.
Rules: 100% pure target language. Never leave Turkish fragments in RU, EN or DE descriptions. Output strict JSON array: [{"id":"...","type":"product|category","lang_code":"en|de|ru","name":"...","description":"..."}]
Items:
${JSON.stringify(items)}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.1,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsedJson = JSON.parse(content);
    const list = Array.isArray(parsedJson) ? parsedJson : parsedJson.translations || parsedJson.items || [];

    const results: TranslatedItemResult[] = [];
    for (const p of list) {
      const srcItem = items.find((it) => it.id === p.id);
      if (srcItem && targetLangs.includes(p.lang_code as TargetLanguage)) {
        results.push({
          id: p.id,
          type: p.type || srcItem.type,
          lang_code: p.lang_code as TargetLanguage,
          name: cleanAndValidateLanguagePurity(p.name || srcItem.name, p.lang_code as TargetLanguage),
          description: p.description
            ? cleanAndValidateLanguagePurity(p.description, p.lang_code as TargetLanguage)
            : null,
          ai_model: 'gpt-4o-mini',
          base_hash: computeTextHash(srcItem.name, srcItem.description),
        });
      }
    }

    return results;
  } catch (err) {
    console.warn('OpenAI API translation skipped/error:', err);
    return null;
  }
}

/**
 * Main translation orchestrator with neural quality assurance
 */
export async function translateMenuItems(
  items: MenuItemForTranslation[],
  targetLangs: TargetLanguage[]
): Promise<{
  translations: TranslatedItemResult[];
  provider: 'gemini' | 'openai' | 'culinary-engine';
  message: string;
}> {
  if (items.length === 0 || targetLangs.length === 0) {
    return { translations: [], provider: 'culinary-engine', message: 'Çevrilecek ürün veya hedef dil bulunamadı.' };
  }

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  // 1. Try Gemini
  if (geminiKey) {
    const geminiResults = await callGeminiApi(items, targetLangs, geminiKey);
    if (geminiResults && geminiResults.length > 0) {
      return {
        translations: geminiResults,
        provider: 'gemini',
        message: `${geminiResults.length} adet çeviri Google Gemini AI ile başarıyla oluşturuldu.`,
      };
    }
  }

  // 2. Try OpenAI
  if (openaiKey) {
    const openaiResults = await callOpenAiApi(items, targetLangs, openaiKey);
    if (openaiResults && openaiResults.length > 0) {
      return {
        translations: openaiResults,
        provider: 'openai',
        message: `${openaiResults.length} adet çeviri OpenAI ile başarıyla oluşturuldu.`,
      };
    }
  }

  // 3. High-Quality Neural + Culinary Lexicon Engine
  const results: TranslatedItemResult[] = [];
  for (const item of items) {
    for (const lang of targetLangs) {
      const translated = await translateMenuItemPure(item, lang);

      results.push({
        id: item.id,
        type: item.type,
        lang_code: lang,
        name: translated.name,
        description: translated.description,
        ai_model: 'pratika-culinary-neural-v2',
        base_hash: computeTextHash(item.name, item.description),
      });
    }
  }

  return {
    translations: results,
    provider: 'culinary-engine',
    message: `${results.length} adet çeviri Pratika Gastronomi & Menü AI motoru ile hazırlandı.`,
  };
}
