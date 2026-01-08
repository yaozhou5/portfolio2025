# Typography System Implementation Guide

## Files Created

1. **`TYPOGRAPHY_SYSTEM.md`** - Complete documentation with all specifications
2. **`app/typography.css`** - CSS variables and utility classes (EXACT specifications)
3. **`TYPOGRAPHY_QUICK_REFERENCE.md`** - Quick reference with code examples
4. **`app/globals.css`** - Updated to import typography system

## Quick Start

### 1. Typography System is Ready

The typography CSS is already imported in `app/globals.css`:

```css
@import './typography.css';
```

### 2. Use Semantic HTML (Easiest Method)

Simply use semantic HTML elements - styles are automatically applied:

```jsx
<h1>Yao Zhou</h1>
<p className="text-subhead max-width-body">
  Product Designer with agency, startup, and founder experience...
</p>

<h2>From Swipes to Actual Dates</h2>
<p className="max-width-body">
  MVP redesign for a dating App targeting Gen Z...
</p>
```

### 3. Use CSS Variables

```jsx
<h1 style={{
  fontFamily: 'var(--text-h1-font-family)',
  fontSize: 'var(--text-h1-size)',
  fontWeight: 'var(--text-h1-weight)',
  lineHeight: 'var(--text-h1-line-height)',
  letterSpacing: 'var(--text-h1-letter-spacing)',
  marginBottom: 'var(--spacing-after-h1)'
}}>
  Hero Title
</h1>
```

### 4. Use Utility Classes

```jsx
<h1 className="text-h1 spacing-after-h1">Hero Title</h1>
<h2 className="text-h2 spacing-after-h2">Section Header</h2>
<p className="text-body max-width-body spacing-paragraph">Body content</p>
```

## Typography Scale Overview

### Desktop (1440px+)
- **H1:** 72px / Clash Display 600 / Line-height 1.1
- **H2:** 48px / Clash Display 600 / Line-height 1.2
- **H3:** 32px / Clash Display 500 / Line-height 1.3
- **H4:** 24px / Clash Display 500 / Line-height 1.4
- **Subhead:** 24px / Post Grotesk 400 / Line-height 1.6
- **Body:** 18px / Post Grotesk 400 / Line-height 1.7
- **Caption:** 14px / Post Grotesk 500 / Line-height 1.5

### Tablet (768px-1439px)
- **H1:** 56px
- **H2:** 40px
- **H3:** 28px
- **H4:** 22px
- **Body:** 17px

### Mobile (375px-767px)
- **H1:** 40px
- **H2:** 32px
- **H3:** 24px
- **H4:** 20px
- **Body:** 16px

## Key Features

✅ **Exact Specifications** - Matches your requirements precisely  
✅ **Semantic HTML** - Automatic styling for `<h1>`-`<h6>` and `<p>`  
✅ **Responsive by default** - Automatically scales across breakpoints  
✅ **CSS Variables** - Easy to customize and maintain  
✅ **Utility Classes** - Quick implementation  
✅ **WCAG AA Compliant** - Proper contrast ratios  
✅ **Mobile-first** - Optimized for all devices  
✅ **Spacing System** - Built-in spacing utilities  

## Spacing System

| Element | Space After |
|---------|-------------|
| H1 | 24px |
| H2 | 20px |
| H3 | 16px |
| H4 | 12px |
| Paragraphs | 16px |
| Major Sections | 80px (desktop) / 60px (tablet) / 48px (mobile) |

## Max-Width

- **Body Text:** 680px (optimal reading width)
- Use `max-width-body` class or `var(--max-width-body)` variable

## Semantic HTML Structure

- **H1:** Used once per page (name on homepage, project title on case study)
- **H2:** Section titles (project titles on homepage, major sections on case study)
- **H3:** Subsections within projects
- **H4:** Minor headings, component titles
- **H5-H6:** Metadata, labels, timestamps

## Common Patterns

### Homepage Hero
```jsx
<h1>Yao Zhou</h1>
<p className="text-subhead max-width-body">
  Product Designer with agency, startup, and founder experience...
</p>
```

### Project Listing
```jsx
<h2>From Swipes to Actual Dates</h2>
<p className="text-body max-width-body">
  MVP redesign for a dating App targeting Gen Z
</p>
<span className="text-caption">Product Design • 2024</span>
```

### Case Study Intro
```jsx
<h1>Project Title</h1>
<span className="text-caption">Role • Timeline • Platform</span>
<p className="text-body-large max-width-body">
  Project overview paragraph...
</p>
```

## Next Steps

1. **Review** `TYPOGRAPHY_SYSTEM.md` for complete specifications
2. **Reference** `TYPOGRAPHY_QUICK_REFERENCE.md` for code examples
3. **Test** semantic HTML elements (`<h1>`, `<h2>`, `<p>`) - they're automatically styled!
4. **Customize** CSS variables in `app/typography.css` if needed
5. **Test** across devices and browsers

## Customization

All values are stored as CSS variables, making it easy to customize:

```css
/* In app/typography.css */
:root {
  --text-h1-size: 4.5rem; /* Change this to adjust H1 size */
  --text-body-size: 1.125rem; /* Change this to adjust body size */
  --spacing-after-h1: 1.5rem; /* Change spacing */
  /* etc. */
}
```

## Important Notes

1. **H1 Usage:** Use `<h1>` once per page only (semantic HTML requirement)
2. **Max-Width:** Always apply `max-width-body` to body text for readability
3. **Spacing:** Semantic HTML elements have automatic spacing, or use utility classes
4. **Responsive:** All typography automatically scales - no additional code needed
5. **Font Weights:** 
   - Clash Display: Use 500 or 600 only
   - Post Grotesk: Use 400 for body, 500 for buttons/captions

## Support

For questions or issues:
1. Check `TYPOGRAPHY_SYSTEM.md` for detailed specifications
2. Review `TYPOGRAPHY_QUICK_REFERENCE.md` for usage examples
3. Test with browser DevTools to verify CSS variables are loading
4. Ensure semantic HTML structure is correct (H1-H6 hierarchy)
