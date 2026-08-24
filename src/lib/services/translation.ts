export interface TranslationProvider {
  translate(text: string, targetLang: string): Promise<string>
  translateBatch(texts: string[], targetLang: string): Promise<string[]>
}

/**
 * Mock Translation Provider for Development
 * In production, this can be swapped with Google Cloud Translation, DeepL, etc.
 */
class MockTranslationProvider implements TranslationProvider {
  async translate(text: string, targetLang: string): Promise<string> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    if (!text) return ''

    // Return a mocked translation by appending the language code
    return `[${targetLang.toUpperCase()}] ${text}`
  }

  async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return texts.map(t => t ? `[${targetLang.toUpperCase()}] ${t}` : '')
  }
}

export const translationService: TranslationProvider = new MockTranslationProvider()

// Types for supported languages
export type SupportedLanguage = 'tr' | 'en' | 'de' | 'ru'

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; name: string; flag: string }[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]
