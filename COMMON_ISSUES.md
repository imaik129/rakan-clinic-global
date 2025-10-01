# 🔧 Common Issues & Solutions

## Issue: "Invalid hook call" or "useTranslations is not callable within an async component"

### ❌ Error Message:
```
Error: `useTranslations` is not callable within an async component.
Invalid hook call. Hooks can only be called inside of the body of a function component.
```

### ✅ Solution:

**The Problem:** You're using `useTranslations()` (a React hook) in an async server component.

**The Fix:** Use the correct function for your component type:

#### For Server Components (Async):
```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyPage() {
  const t = await getTranslations();
  return <h1>{t('title')}</h1>;
}
```

#### For Client Components:
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  return <button>{t('cta')}</button>;
}
```

### 📋 Quick Reference:

| Component Type | Import From | Function | Async? |
|----------------|-------------|----------|--------|
| Server (async) | `'next-intl/server'` | `getTranslations()` | ✅ Yes (use `await`) |
| Client ('use client') | `'next-intl'` | `useTranslations()` | ❌ No |

---

## Issue: Seeing `[key.name]` on the page

### ❌ Problem:
Text shows as `[hero.title]` instead of the translated content.

### ✅ Solution:
The translation key is missing in that language file.

**Steps:**
1. Identify the key showing (e.g., `hero.title`)
2. Check which language you're viewing (e.g., `/ar`)
3. Add the key to that language file (`messages/ar.json`)

**Example:**
```json
// messages/ar.json
{
  "hero": {
    "title": "عنوان البطل"
  }
}
```

---

## Issue: Wrong language showing

### ❌ Problem:
Page shows English when you expect Arabic.

### ✅ Solution:
Check the URL includes the locale:
- Wrong: `http://localhost:3000/`
- Right: `http://localhost:3000/ar`

The middleware will auto-redirect to a default language, but always use the full URL with locale.

---

## Issue: RTL not working for Arabic

### ❌ Problem:
Arabic text not displaying right-to-left.

### ✅ Solution:
Check `app/[locale]/layout.tsx` has the `dir` attribute:

```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

---

## Issue: Translations not updating

### ❌ Problem:
Changed translation file but see old text.

### ✅ Solution:

**Option 1:** Hard refresh the page
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Option 2:** Restart dev server
```bash
# Press Ctrl+C in terminal, then:
npm run dev
```

**Option 3:** Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

---

## Issue: TypeScript errors about locale type

### ❌ Problem:
```
Type 'string' is not assignable to type 'Locale'
```

### ✅ Solution:
Import the Locale type:

```tsx
import { type Locale } from '@/i18n';

export default async function Page({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // ...
}
```

---

## Issue: Language switcher not visible

### ❌ Problem:
Can't see the language dropdown in the header.

### ✅ Solution:
1. Check component is imported in page:
```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';
```

2. Check it's rendered with current locale:
```tsx
<LanguageSwitcher currentLocale={locale} />
```

3. Check on desktop (hidden on mobile):
```tsx
<div className="hidden md:flex items-center space-x-8">
  {/* ... */}
  <LanguageSwitcher currentLocale={locale} />
</div>
```

---

## Issue: Build fails with translation errors

### ❌ Problem:
```
Module not found: Can't resolve './messages/fr.json'
```

### ✅ Solution:
Ensure ALL language files exist in `messages/`:
```bash
ls messages/
# Should show: ar.json de.json en.json es.json fr.json ru.json zh.json
```

If any are missing, copy from English:
```bash
cp messages/en.json messages/fr.json
```

---

## Issue: "No locale was returned from getRequestConfig"

### ❌ Error:
```
Error: No locale was returned from `getRequestConfig`.
```

### ✅ Solution:
This is a Next.js 15 / next-intl 4.x compatibility issue. The parameter name changed from `locale` to `requestLocale`.

**Fixed `i18n.ts` config:**

```typescript
export default getRequestConfig(async ({ requestLocale }) => {
  // IMPORTANT: Use requestLocale (not locale) in Next.js 15
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,  // Return locale explicitly
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

**Also ensure middleware matcher is comprehensive:**
```typescript
// middleware.ts
export const config = {
  matcher: [
    // Match all pathnames except API routes, Next.js internals, and static files
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
```

---

## General Debugging Steps

1. **Check the URL** - Does it have `/en` or `/ar`?
2. **Check translation files** - Do all 7 files have the key?
3. **Check imports** - Using correct function for component type?
4. **Restart server** - Sometimes Next.js needs a restart
5. **Clear cache** - `rm -rf .next && npm run dev`
6. **Check console** - Look for specific error messages
7. **Read error carefully** - Most errors tell you exactly what's wrong!

---

## Still Having Issues?

1. Read [I18N_GUIDE.md](./I18N_GUIDE.md) for complete documentation
2. Check [QUICK_START.md](./QUICK_START.md) for patterns
3. Look at working examples in `app/[locale]/page.tsx`
4. Verify all dependencies are installed: `npm install`

---

## Prevention Tips

✅ **DO:**
- Always use `getTranslations()` in async server components
- Always use `useTranslations()` in client components
- Add translations to ALL 7 language files
- Test in multiple languages before committing
- Restart dev server after major changes

❌ **DON'T:**
- Mix up `getTranslations` and `useTranslations`
- Forget 'use client' directive when needed
- Skip language files
- Hardcode text in components
- Ignore `[key.name]` errors

---

**Most issues are solved by:**
1. Using the right function (`getTranslations` vs `useTranslations`)
2. Adding missing translation keys
3. Restarting the dev server

Good luck! 🚀

