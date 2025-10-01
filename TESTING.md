# 🧪 Testing Your Multi-Language Setup

## Quick Test (2 minutes)

Your dev server is running. Test the multi-language system now:

### Test 1: Visit Different Languages

Open these URLs in your browser:

1. **English**: http://localhost:3000/en
2. **Arabic**: http://localhost:3000/ar (notice RTL layout!)
3. **Spanish**: http://localhost:3000/es

You should see the entire website translated in each language.

### Test 2: Use Language Switcher

1. Go to http://localhost:3000/en
2. Click the language dropdown in the header (🌐 icon)
3. Select "العربية" (Arabic)
4. Website should switch to Arabic with RTL layout
5. Try switching to other languages

### Test 3: Verify Translations Work

Check these elements are translated:

- [ ] Header navigation (Services, About, Contact)
- [ ] Hero section title
- [ ] Service cards
- [ ] About section content
- [ ] Contact form labels
- [ ] Footer content

### Test 4: Test RTL (Arabic)

Visit http://localhost:3000/ar and verify:

- [ ] Text flows right-to-left
- [ ] Navigation is on the right
- [ ] Layout mirrors correctly
- [ ] No broken layouts

## Advanced Testing

### Test Missing Translation

1. Open `messages/en.json`
2. Add a new key: `"test": { "missing": "Test" }`
3. Open `app/[locale]/page.tsx`
4. Add: `<div>{t('test.missing')}</div>`
5. Visit http://localhost:3000/en → Shows "Test" ✓
6. Visit http://localhost:3000/ar → Shows `[test.missing]` ✗
7. Add same key to `messages/ar.json`
8. Visit http://localhost:3000/ar → Now shows Arabic text ✓

This demonstrates the system **forces you to add translations**!

### Test URL Redirects

1. Visit http://localhost:3000 (no locale)
2. Should auto-redirect to `/en` or browser's language
3. Check URL includes locale

### Test Metadata (SEO)

1. Visit http://localhost:3000/en
2. View page source (Ctrl+U or Cmd+Option+U)
3. Find `<title>` tag
4. Should show: "Rakan Clinic - Medical Tourism Excellence"

5. Visit http://localhost:3000/ar
6. View page source
7. Find `<title>` tag
8. Should show: "عيادة راكان - التميز في السياحة العلاجية"

Different titles per language = Good SEO! ✓

## Production Testing

Before deploying:

```bash
# Build for production
npm run build

# Start production server
npm start

# Test all languages in production mode
open http://localhost:3000/en
open http://localhost:3000/ar
open http://localhost:3000/es
```

## Checklist Before Going Live

- [ ] All 7 languages tested
- [ ] Arabic RTL works correctly
- [ ] Language switcher functions on all pages
- [ ] No `[key.name]` visible on any page
- [ ] Metadata correct in all languages
- [ ] Forms work in all languages
- [ ] Mobile tested in all languages
- [ ] Production build successful
- [ ] All team members trained on i18n system

## Common Issues & Fixes

### Issue: Seeing `[key.name]` on page
**Fix**: Add that key to the respective language file in `messages/`

### Issue: Language switcher not appearing
**Fix**: Check that `LanguageSwitcher` is imported in page.tsx

### Issue: Wrong language showing
**Fix**: Check URL has correct locale prefix (e.g., `/en`, not just `/`)

### Issue: RTL not working for Arabic
**Fix**: Check `layout.tsx` has `dir={locale === 'ar' ? 'rtl' : 'ltr'}`

### Issue: Translations not updating
**Fix**: Restart dev server: `npm run dev`

## Performance Testing

Test load times:

1. Open DevTools (F12)
2. Go to Network tab
3. Visit http://localhost:3000/en
4. Check load time
5. Should be fast (<1s for initial load)

Translation files are small JSON, so no performance impact.

## Browser Testing

Test in multiple browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Automated Testing (Future)

Consider adding:

```bash
# Example test
npm test -- test/i18n.test.ts
```

Test that:
- All language files have same keys
- No hardcoded strings in components
- Translation keys match patterns

## Success Criteria

✅ You've successfully implemented multi-language support if:

1. All 7 languages work
2. RTL works for Arabic
3. Language switcher works
4. No hardcoded text in components
5. No `[key.name]` visible
6. SEO metadata works per language
7. Team understands how to add content

## Quick Demo Script

Show stakeholders:

```
1. "Our website now supports 7 languages"
   → Visit http://localhost:3000/en

2. "Users can easily switch languages"
   → Use language switcher

3. "We support right-to-left for Arabic speakers"
   → Switch to Arabic, show RTL

4. "Each language has proper SEO"
   → Show page title in different languages

5. "Adding new content is easy and scalable"
   → Show translation files
```

---

**Testing complete? You're ready to serve international patients!** 🎉

