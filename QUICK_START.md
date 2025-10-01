# 🚀 Quick Start Guide - Multi-Language Development

## For New Developers

Welcome to Rakan Clinic's website! Here's everything you need to know to start developing **without breaking multi-language support**.

## ⚡ The Golden Rule

**NEVER hardcode text in your components!**

Always use the translation system:

```tsx
// ❌ BAD
<h1>Welcome to Rakan Clinic</h1>

// ✅ GOOD
const t = useTranslations();
<h1>{t('welcome.title')}</h1>
```

## 📝 Adding New Content (Step-by-Step)

### Example: Adding a "Testimonials" Section

**Step 1**: Add translations to ALL language files

**File: `messages/en.json`**
```json
{
  "testimonials": {
    "heading": "What Our Patients Say",
    "patient1": {
      "name": "John Smith",
      "quote": "Excellent care and service!",
      "location": "United States"
    }
  }
}
```

**File: `messages/ar.json`**
```json
{
  "testimonials": {
    "heading": "ماذا يقول مرضانا",
    "patient1": {
      "name": "جون سميث",
      "quote": "رعاية وخدمة ممتازة!",
      "location": "الولايات المتحدة"
    }
  }
}
```

**File: `messages/es.json`**
```json
{
  "testimonials": {
    "heading": "Lo Que Dicen Nuestros Pacientes",
    "patient1": {
      "name": "John Smith",
      "quote": "¡Excelente atención y servicio!",
      "location": "Estados Unidos"
    }
  }
}
```

*Repeat for `fr.json`, `de.json`, `ru.json`, `zh.json`*

**Step 2**: Create your component

**Option A - Client Component:**
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  
  return (
    <section className="py-20">
      <h2>{t('heading')}</h2>
      <div>
        <h3>{t('patient1.name')}</h3>
        <p>{t('patient1.quote')}</p>
        <span>{t('patient1.location')}</span>
      </div>
    </section>
  );
}
```

**Option B - Server Component (Async):**
```tsx
import { getTranslations } from 'next-intl/server';

export default async function Testimonials() {
  const t = await getTranslations('testimonials');
  
  return (
    <section className="py-20">
      <h2>{t('heading')}</h2>
      <div>
        <h3>{t('patient1.name')}</h3>
        <p>{t('patient1.quote')}</p>
        <span>{t('patient1.location')}</span>
      </div>
    </section>
  );
}
```

**Step 3**: Add to page

```tsx
import Testimonials from '@/components/Testimonials';

export default function Page() {
  return (
    <>
      {/* ... existing content ... */}
      <Testimonials />
    </>
  );
}
```

## 🧰 Common Patterns

### Pattern 1: Simple Text (Server Component - ASYNC)
```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyComponent() {
  const t = await getTranslations();
  return <p>{t('about.description')}</p>;
}
```

### Pattern 1b: Simple Text (Client Component)
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  return <p>{t('about.description')}</p>;
}
```

### Pattern 2: Nested Objects
```json
{
  "services": {
    "medical": {
      "title": "Medical Care",
      "description": "Best in class"
    }
  }
}
```
```tsx
const t = useTranslations('services');
<h3>{t('medical.title')}</h3>
<p>{t('medical.description')}</p>
```

### Pattern 3: Arrays/Lists
```json
{
  "features": {
    "list": {
      "item1": "24/7 Support",
      "item2": "Expert Doctors",
      "item3": "Modern Facilities"
    }
  }
}
```
```tsx
const t = useTranslations('features.list');
{['item1', 'item2', 'item3'].map((key) => (
  <li key={key}>{t(key)}</li>
))}
```

### Pattern 4: Button Text
```tsx
const t = useTranslations();
<button>{t('cta.bookNow')}</button>
```

### Pattern 5: Form Labels
```tsx
const t = useTranslations('form');
<label>{t('firstName.label')}</label>
<input placeholder={t('firstName.placeholder')} />
```

## 🔍 Debugging Checklist

### Problem: Text shows as `[key.name]`
- [ ] Did you add the key to ALL language files?
- [ ] Is the key spelled correctly?
- [ ] Did you restart the dev server?

### Problem: Wrong language showing
- [ ] Check URL (`/en`, `/ar`, etc.)
- [ ] Check browser language settings
- [ ] Try language switcher in header

### Problem: TypeScript error
- [ ] Did you import `useTranslations` from 'next-intl'?
- [ ] Is your component inside the locale layout?
- [ ] Did you run `npm install`?

## 📋 Pre-Commit Checklist

Before committing code with new text:

- [ ] Added translation keys to **all 7** language files
- [ ] Tested in at least English AND Arabic
- [ ] No hardcoded strings in components
- [ ] Language switcher still works
- [ ] RTL layout works for Arabic
- [ ] No linter errors

## 🎯 Quick Commands

```bash
# Start dev server
npm run dev

# Test different languages
open http://localhost:3000/en
open http://localhost:3000/ar
open http://localhost:3000/es

# Check for linter errors
npx next lint

# Build for production
npm run build
```

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `messages/en.json` | English translations |
| `messages/ar.json` | Arabic translations |
| `app/[locale]/page.tsx` | Homepage component |
| `components/LanguageSwitcher.tsx` | Language selector |
| `i18n.ts` | i18n configuration |
| `I18N_GUIDE.md` | Full documentation |

## 🎓 Learning Resources

1. **Read first**: [I18N_GUIDE.md](./I18N_GUIDE.md)
2. **next-intl docs**: https://next-intl-docs.vercel.app/
3. **Example**: Look at `app/[locale]/page.tsx` to see how translations are used

## ⚠️ Common Mistakes to Avoid

1. ❌ Hardcoding text: `<h1>Hello</h1>`
2. ❌ Only adding to one language file
3. ❌ Forgetting to import `useTranslations`
4. ❌ Not testing in multiple languages
5. ❌ Modifying files outside `app/[locale]/`

## 💡 Pro Tips

- Use descriptive translation keys: `hero.title` not `t1`
- Group related translations together
- Keep translation strings short and simple
- Test Arabic (RTL) regularly
- Use the language switcher often while developing

---

**Remember**: The system is designed to make it IMPOSSIBLE to forget translations. If you see `[key.name]` on the page, you forgot to add that translation key! 🎯

