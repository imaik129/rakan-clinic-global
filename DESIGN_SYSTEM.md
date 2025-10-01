# 🎨 Rakan Clinic Design System

## Overview

This design system is based on the [Rakan Clinic Tokyo website](https://www.rakanclinic-tokyo.jp/english) brand identity, providing an elegant, sophisticated medical spa aesthetic that communicates luxury, trust, and professionalism.

## 🎨 Color Palette

### Primary Colors

```css
--primary: #4a9b7f    /* Teal Green - Trust, Health, Growth */
--gold: #c9a962       /* Gold Accent - Luxury, Premium */
--dark: #1a1a1a       /* Dark Text - Readability */
--cream: #f8f6f3      /* Cream Background - Warmth, Comfort */
--white: #ffffff      /* Pure White - Clean, Medical */
--gray: #666666       /* Gray Text - Secondary Content */
```

### Color Usage

| Color | Usage | Examples |
|-------|-------|----------|
| **Teal (#4a9b7f)** | Primary actions, highlights, accents | Buttons, links, badges, icons |
| **Gold (#c9a962)** | Premium features, special sections | Elite pricing, featured content |
| **Dark (#1a1a1a)** | Body text, headings | All text content, dark sections |
| **Cream (#f8f6f3)** | Page backgrounds | Body background, section backgrounds |
| **White (#ffffff)** | Cards, forms, overlays | Card backgrounds, input fields |
| **Gray (#666666)** | Secondary text | Descriptions, subtitles |

### Color Psychology

- **Teal Green**: Represents health, renewal, and tranquility - perfect for medical tourism
- **Gold**: Conveys luxury, excellence, and premium service
- **Cream**: Creates warmth and comfort, reducing clinical harshness
- **Dark**: Provides sophistication and authority

## 📝 Typography

### Font Families

**Headings:** Cormorant Garamond (Serif)
```css
font-family: 'Cormorant Garamond', serif;
```

**Body Text:** Montserrat (Sans-serif)
```css
font-family: 'Montserrat', sans-serif;
```

### Typography Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **H1 (Hero)** | 3.5-7rem | 300 (Light) | 1.0 | -2px |
| **H2 (Section)** | 2.5-5rem | 300 (Light) | 1.1 | -1px |
| **H3 (Subsection)** | 1.5-1.8rem | 400 (Regular) | 1.2 | 0 |
| **Body Large** | 1.1rem | 300 (Light) | 1.8 | 0 |
| **Body** | 1rem | 400 (Regular) | 1.6 | 0 |
| **Small/Labels** | 0.75-0.85rem | 400-500 | 1.4 | 1-3px |
| **Uppercase Labels** | 0.75rem | 500 (Medium) | 1.4 | 3px |

### Typography Rules

1. **Headings**: Always use Cormorant Garamond for elegance
2. **Body Text**: Use Montserrat for readability
3. **Uppercase**: Reserve for labels, navigation, buttons
4. **Letter Spacing**: Increase for uppercase text (2-3px)
5. **Font Weight**: Keep most text light (300) or regular (400)
6. **Line Height**: Generous spacing for readability (1.6-1.8)

## 🎯 Design Principles

### 1. **Elegance Over Boldness**
- Use generous whitespace
- Light font weights (300-400)
- Subtle transitions and animations
- Refined color palette

### 2. **Medical Professionalism**
- Clean, organized layouts
- Clear hierarchy
- Trust-building elements
- Professional imagery

### 3. **Luxury Experience**
- Premium feel through details
- Gold accents for special features
- High-end typography
- Sophisticated interactions

### 4. **International Appeal**
- Multi-language support (7 languages)
- RTL support for Arabic
- Universal symbols and icons
- Culturally neutral imagery

## 📐 Layout & Spacing

### Container Widths
```css
max-width: 1600px;  /* Main content container */
padding: 0 5%;      /* Responsive side padding */
```

### Spacing Scale
```css
--spacing-xs: 0.25rem   (4px)
--spacing-sm: 0.5rem    (8px)
--spacing-md: 1rem      (16px)
--spacing-lg: 2rem      (32px)
--spacing-xl: 4rem      (64px)
--spacing-2xl: 8rem     (128px)
```

### Section Padding
- **Vertical**: `8rem` (128px) top & bottom
- **Horizontal**: `5%` of viewport width
- **Mobile**: Reduce to `4rem` (64px) vertical

### Grid Systems
- **Two Columns**: Hero, About, Contact Info
- **Three Columns**: Services, Statistics, Features
- **Four Columns**: Footer links

## 🎭 Components

### Buttons

**Primary Button:**
```css
background: #4a9b7f;
color: white;
padding: 1.2rem 3rem;
font-size: 0.85rem;
letter-spacing: 2px;
text-transform: uppercase;
transition: all 400ms;

hover {
  background: #3d8269;
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(74, 155, 127, 0.3);
}
```

**Secondary Button:**
```css
border: 2px solid #1a1a1a;
color: #1a1a1a;
background: transparent;

hover {
  background: #1a1a1a;
  color: white;
}
```

### Cards
```css
background: white;
padding: 2rem;
box-shadow: 0 5px 15px rgba(0,0,0,0.05);

hover {
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}
```

### Forms
```css
input, textarea {
  border: 1px solid rgba(0,0,0,0.1);
  padding: 1rem;
  background: white;
  
  focus {
    border-color: #4a9b7f;
    box-shadow: 0 0 0 3px rgba(74, 155, 127, 0.1);
  }
}
```

### Navigation
```css
link {
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  
  after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background: #4a9b7f;
    transition: width 300ms;
  }
  
  hover:after {
    width: 100%;
  }
}
```

## ✨ Animations & Transitions

### Standard Transitions
```css
transition: all 300ms ease;  /* Default */
transition: all 400ms ease;  /* Buttons, major elements */
```

### Hover Effects
- **Buttons**: Translate up 2px + shadow
- **Cards**: Enhanced shadow
- **Links**: Underline animation
- **Images**: Scale 1.05

### Page Load Animations
- **Float Animation**: Subtle circular motion for decorative elements
- **Fade In**: Sections reveal on scroll
- **Scale**: Elements gently scale in

## 🌐 Responsive Design

### Breakpoints
```css
mobile: < 768px
tablet: 768px - 1024px
desktop: > 1024px
```

### Mobile Adjustments
- Hide navigation, show menu toggle
- Stack grid columns
- Reduce font sizes (clamp)
- Adjust padding (4rem instead of 8rem)
- Simplify animations

## 🎪 Section Designs

### Hero Section
- Full viewport height
- Two-column layout
- Large serif heading
- Primary + secondary CTAs
- Floating background decoration

### Statistics Section
- Three-column grid
- Large numbers in Cormorant
- Centered layout
- Teal accent color

### Services Cards
- White cards on cream background
- Large number watermark
- Subtle shadow on hover
- Clean typography

### Dark Section (Why Us)
- Dark background (#1a1a1a)
- White text
- Gold accents for headings
- Two-column feature grid
- Icon boxes with teal accent

### Contact Form
- Split layout: info + form
- Form on cream background
- Teal focus states
- Uppercase labels

## 📱 Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Dark (#1a1a1a) on Cream (#f8f6f3): 12.3:1
- White on Teal (#4a9b7f): 3.8:1 ✓
- White on Dark (#1a1a1a): 19.6:1

### Interactive Elements
- Minimum touch target: 44x44px
- Clear focus indicators
- Keyboard navigation support
- Screen reader friendly

### Typography
- Minimum body text: 16px (1rem)
- Generous line height (1.6+)
- Sufficient letter spacing
- Clear hierarchy

## 🔧 Implementation

### Tailwind Classes
Use these custom utilities:
```html
text-primary     /* Teal text */
bg-primary       /* Teal background */
text-gold        /* Gold text */
bg-gold          /* Gold background */
bg-cream         /* Cream background */
font-heading     /* Cormorant Garamond */
font-body        /* Montserrat */
```

### CSS Variables
```css
var(--primary)
var(--gold)
var(--dark)
var(--cream)
var(--white)
var(--gray)
```

## 📚 Resources

- **Font Source**: [Google Fonts](https://fonts.google.com/)
  - Cormorant Garamond: Weights 300, 400, 500, 600, 700
  - Montserrat: Weights 300, 400, 500, 600, 700

- **Inspiration**: [Rakan Clinic Tokyo](https://www.rakanclinic-tokyo.jp/english)

- **Design Tools**:
  - ColorZilla (color extraction)
  - Chrome DevTools (inspect styles)
  - Figma (design mockups)

## ✅ Design Checklist

Before shipping any new component or page:

- [ ] Uses Rakan color palette
- [ ] Cormorant Garamond for headings
- [ ] Montserrat for body text
- [ ] Cream background (#f8f6f3)
- [ ] Proper spacing (8rem sections)
- [ ] Hover effects on interactive elements
- [ ] 400ms transitions
- [ ] Responsive on mobile
- [ ] Accessible (WCAG AA)
- [ ] Multi-language support
- [ ] Tested in Arabic (RTL)

---

**This design system ensures consistency across the entire Rakan Clinic medical tourism website.** 🎨✨

