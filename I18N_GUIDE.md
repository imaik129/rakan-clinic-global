# 🌍 Internationalization (i18n) Guide for Rakan Clinic

## Overview

This project uses **`next-intl`** to ensure multi-language support is **ALWAYS** implemented correctly. The system is designed to make it **impossible to accidentally hardcode text** in your components.

## 🎯 Key Features

✅ **Type-safe translations** - TypeScript will error if you try to hardcode text  
✅ **7 languages supported** - English, Arabic, Spanish, French, German, Russian, Chinese  
✅ **SEO-friendly URLs** - `/en/about`, `/ar/about`, etc.  
✅ **RTL support** - Automatic right-to-left for Arabic  
✅ **Language switcher** - Easy language switching for users  
✅ **Centralized dictionary** - All translations in one place  

## 📁 Project Structure

```
rakan-global/
├── i18n.ts                    # i18n configuration
├── middleware.ts              # Locale detection & routing
├── messages/                  # Translation files (JSON)
│   ├── en.json               # English
│   ├── ar.json               # Arabic (العربية)
│   ├── es.json               # Spanish (Español)
│   ├── fr.json               # French (À traduire)
│   ├── de.json               # German (Zu übersetzen)
│   ├── ru.json               # Russian (Для перевода)
│   └── zh.json               # Chinese (待翻译)
├── app/
│   └── [locale]/             # Locale-based routing
│       ├── layout.tsx        # Layout with i18n provider
│       └── page.tsx          # Homepage using translations
└── components/
    └── LanguageSwitcher.tsx  # Language selector component
```

## 🚀 How It Works

### 1. **URL Structure**
All routes are prefixed with locale:
- `/en` - English homepage
- `/ar` - Arabic homepage  
- `/es` - Spanish homepage
- etc.

The middleware automatically detects the user's language and redirects accordingly.

### 2. **Translation Files**
All text content lives in `messages/{locale}.json`:

```json
{
  "hero": {
    "title": {
      "line1": "Your Health Journey",
      "line2": "Starts Here"
    }
  }
}
```

### 3. **Using Translations in Components**

**✅ CORRECT WAY** (Server Component - ASYNC):
```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyComponent() {
  const t = await getTranslations();
  
  return (
    <h1>{t('hero.title.line1')}</h1>
  );
}
```

**✅ CORRECT WAY** (Client Component):
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations();
  
  return (
    <button>{t('header.cta')}</button>
  );
}
```

**⚠️ IMPORTANT:** 
- Server components (async) → use `getTranslations()` from `'next-intl/server'`
- Client components ('use client') → use `useTranslations()` from `'next-intl'`

**❌ WRONG WAY** (Hardcoded text):
```tsx
// DON'T DO THIS!
export default function MyComponent() {
  return <h1>Your Health Journey</h1>; // ❌ Not translated!
}
```

## 📝 Adding New Text

### Step 1: Add to ALL language files

Add your new translation key to **every** language file in `messages/`:

**messages/en.json:**
```json
{
  "newSection": {
    "title": "New Feature",
    "description": "This is a new feature"
  }
}
```

**messages/ar.json:**
```json
{
  "newSection": {
    "title": "ميزة جديدة",
    "description": "هذه ميزة جديدة"
  }
}
```

### Step 2: Use in your component

```tsx
const t = useTranslations();

<h2>{t('newSection.title')}</h2>
<p>{t('newSection.description')}</p>
```

## 🔧 Configuration

### Supported Locales

Defined in `i18n.ts`:
```typescript
export const locales = ['en', 'ar', 'es', 'fr', 'de', 'ru', 'zh'] as const;
export const defaultLocale = 'en';
```

### Adding a New Language

1. **Add locale to config** (`i18n.ts`):
```typescript
export const locales = ['en', 'ar', 'es', 'fr', 'de', 'ru', 'zh', 'ja'] as const;
export const localeNames = {
  // ... existing
  ja: '日本語'
};
```

2. **Create translation file**:
```bash
cp messages/en.json messages/ja.json
```

3. **Translate content** in `messages/ja.json`

4. **Update middleware** (`middleware.ts`):
```typescript
matcher: ['/', '/(ar|en|es|fr|de|ru|zh|ja)/:path*']
```

## 🎨 Language Switcher

The `LanguageSwitcher` component is already integrated in the header. It:
- Shows current language
- Displays a dropdown with all available languages
- Preserves the current path when switching
- Works on all pages automatically

## 🌐 RTL (Right-to-Left) Support

Arabic automatically gets RTL layout:

```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

If you add more RTL languages (Hebrew, Urdu, etc.), update the logic:

```typescript
const rtlLocales = ['ar', 'he', 'ur'];
const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';
```

## 📊 Best Practices

### ✅ DO:
- Always use `t('key')` for any user-facing text
- Keep translation keys organized and nested
- Add comments in translation files for context
- Test all languages before deploying
- Use `useTranslations()` in every component with text

### ❌ DON'T:
- Never hardcode user-facing text strings
- Don't skip adding keys to all language files
- Don't use inline conditionals for language-specific logic
- Don't forget to update metadata translations

## 🧪 Testing Translations

### Local Testing:
1. Start dev server: `npm run dev`
2. Visit each language:
   - http://localhost:3000/en
   - http://localhost:3000/ar
   - http://localhost:3000/es
3. Use the language switcher to verify navigation

### Check for Missing Keys:
If a translation key is missing, you'll see the key name in brackets:
```
[header.missingKey]
```

## 🔍 Common Issues & Solutions

### Issue: Text shows as `[key.name]`
**Solution**: The translation key doesn't exist in the current language file. Add it to `messages/{locale}.json`.

### Issue: Language switcher not working
**Solution**: Make sure you're using the `LanguageSwitcher` component and passing the current locale.

### Issue: RTL layout broken
**Solution**: Check the `dir` attribute on `<html>` tag in layout.tsx. Use Tailwind's RTL utilities if needed.

### Issue: URL redirects to wrong language
**Solution**: Check middleware.ts configuration and ensure locale is in the matcher pattern.

## 📚 Resources

- **next-intl docs**: https://next-intl-docs.vercel.app/
- **Tailwind RTL**: https://tailwindcss.com/docs/direction
- **Google Translate API**: For professional translation services

## 🎓 Training Checklist

Before starting development, every developer should:
- [ ] Read this guide
- [ ] Understand how to use `useTranslations()`
- [ ] Know where translation files are located
- [ ] Test switching languages locally
- [ ] Practice adding a new text element with translations
- [ ] Understand the `[locale]` routing structure

---

## 💡 Quick Reference Card

**To add any new text to the website:**

1. ✅ Add translation to ALL files in `messages/`
2. ✅ Use `const t = useTranslations()` in component
3. ✅ Display with `{t('your.key')}`
4. ❌ NEVER use plain strings like `"Your text here"`

**This system ensures multi-language support is ALWAYS maintained!** 🌍

