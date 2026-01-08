# Typography System Documentation

## Overview
A comprehensive typography system for a modern UX design portfolio, optimized for readability and visual hierarchy across all devices.

**Primary Typefaces:**
- **Headers:** Clash Display (400, 500, 600, 700)
- **Body:** Post Grotesk (300, 400, 500)

**Design Context:**
- Portfolio for a product designer focused on tech startups
- Modern, bold, confident aesthetic
- Mobile-first responsive design

---

## Semantic HTML Structure

- **H1:** Used once per page for main page identifier (name on homepage, project title on case study pages)
- **H2:** Section titles (project titles on homepage, major sections on case study pages)
- **H3:** Subsections within projects
- **H4:** Minor headings, component titles
- **H5-H6:** Metadata, labels, timestamps

---

## 1. Desktop Typography (1440px+)

| Element | Font | Size | Weight | Line Height | Letter Spacing | Use Case |
|--------|------|------|--------|-------------|----------------|----------|
| **H1** | Clash Display | 72px (4.5rem) | 600 | 1.1 (79px) | -0.02em | Page title, main project title |
| **H2** | Clash Display | 48px (3rem) | 600 | 1.2 (58px) | -0.01em | Section titles, project titles |
| **H3** | Clash Display | 32px (2rem) | 500 | 1.3 (42px) | -0.01em | Subsection titles |
| **H4** | Clash Display | 24px (1.5rem) | 500 | 1.4 (34px) | 0 | Component titles, minor headings |
| **Subhead** | Post Grotesk | 24px (1.5rem) | 400 | 1.6 (38px) | 0 | Intro text, descriptions |
| **Body Large** | Post Grotesk | 20px (1.25rem) | 400 | 1.6 (32px) | 0 | Featured content, pull quotes |
| **Body Regular** | Post Grotesk | 18px (1.125rem) | 400 | 1.7 (31px) | 0 | Main paragraph text |
| **Body Small** | Post Grotesk | 16px (1rem) | 400 | 1.6 (26px) | 0 | Secondary information |
| **Caption** | Post Grotesk | 14px (0.875rem) | 500 | 1.5 (21px) | 0.01em | Metadata, dates, tags |
| **Button** | Post Grotesk | 16px (1rem) | 500 | 1.5 (24px) | 0.01em | Button labels |

---

## 2. Tablet Typography (768px - 1439px)

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|--------|------|------|--------|-------------|----------------|
| **H1** | Clash Display | 56px (3.5rem) | 600 | 1.1 | -0.02em |
| **H2** | Clash Display | 40px (2.5rem) | 600 | 1.2 | -0.01em |
| **H3** | Clash Display | 28px (1.75rem) | 500 | 1.3 | -0.01em |
| **H4** | Clash Display | 22px (1.375rem) | 500 | 1.4 | 0 |
| **Subhead** | Post Grotesk | 22px (1.375rem) | 400 | 1.6 | 0 |
| **Body Large** | Post Grotesk | 19px (1.1875rem) | 400 | 1.6 | 0 |
| **Body Regular** | Post Grotesk | 17px (1.0625rem) | 400 | 1.7 | 0 |
| **Body Small** | Post Grotesk | 15px (0.9375rem) | 400 | 1.6 | 0 |
| **Caption** | Post Grotesk | 13px (0.8125rem) | 500 | 1.5 | 0.01em |
| **Button** | Post Grotesk | 15px (0.9375rem) | 500 | 1.5 | 0.01em |

---

## 3. Mobile Typography (375px - 767px)

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|--------|------|------|--------|-------------|----------------|
| **H1** | Clash Display | 40px (2.5rem) | 600 | 1.1 | -0.02em |
| **H2** | Clash Display | 32px (2rem) | 600 | 1.2 | -0.01em |
| **H3** | Clash Display | 24px (1.5rem) | 500 | 1.3 | -0.01em |
| **H4** | Clash Display | 20px (1.25rem) | 500 | 1.4 | 0 |
| **Subhead** | Post Grotesk | 20px (1.25rem) | 400 | 1.6 | 0 |
| **Body Large** | Post Grotesk | 18px (1.125rem) | 400 | 1.6 | 0 |
| **Body Regular** | Post Grotesk | 16px (1rem) | 400 | 1.7 | 0 |
| **Body Small** | Post Grotesk | 14px (0.875rem) | 400 | 1.6 | 0 |
| **Caption** | Post Grotesk | 12px (0.75rem) | 500 | 1.5 | 0.01em |
| **Button** | Post Grotesk | 16px (1rem) | 500 | 1.5 | 0.01em |

---

## 4. Typeface Usage Rules

### Clash Display (Headers)

**When to Use:**
- All heading levels (H1-H4)
- Hero statements and bold declarations
- Project titles and section headers
- Any text that needs to command attention
- Always use weights 500 (Medium) or 600 (Semibold) for optimal presence

**Weight Guidelines:**
- **500 (Medium):** Use for H3 and H4 - provides clear hierarchy without being too heavy
- **600 (Semibold):** Default for H1 and H2 - maximum impact and presence

**Context Rules:**
- ✅ Always use for headings
- ✅ Can be used for large display text (40px+)
- ✅ Works well for short phrases (1-5 words)
- ❌ Avoid for body text longer than 2 lines
- ❌ Don't use weights lighter than 500 for headings

### Post Grotesk (Body)

**When to Use:**
- All body copy and paragraphs (weight 400)
- Descriptions and explanations (weight 400)
- Navigation links (weight 500)
- Button labels (weight 500)
- Metadata and captions (weight 500)
- Supporting text (weight 400)

**Weight Guidelines:**
- **400 (Regular):** Default for all body text - provides excellent readability
- **500 (Medium):** Use for navigation, buttons, captions - creates subtle emphasis

**Context Rules:**
- ✅ Always use for paragraphs and body content
- ✅ Use for UI elements (buttons, links, labels)
- ✅ Use for any text longer than 2 lines
- ✅ Use for metadata and secondary information
- ❌ Avoid for headings (use Clash Display instead)

### Weight Pairing Guidelines

**Recommended Combinations:**

1. **Maximum Contrast:**
   - H1 Clash Display 600 → Body Post Grotesk 400
   - Best for: Hero sections, landing pages, key messages

2. **Strong Hierarchy:**
   - H2 Clash Display 600 → Body Large Post Grotesk 400
   - Best for: Case studies, detailed content, articles

3. **Clear but Softer:**
   - H3 Clash Display 500 → Body Post Grotesk 400
   - Best for: Subsections, supporting content

4. **Subtle Differentiation:**
   - Caption Post Grotesk 500 with Body Post Grotesk 400
   - Best for: Metadata, labels, supporting information

---

## 5. Spacing & Hierarchy

### Margin/Padding Between Elements

| Element | Space After | Notes |
|---------|-------------|-------|
| **H1** | 24px | Space before following content |
| **H2** | 20px | Space before following content |
| **H3** | 16px | Space before following content |
| **H4** | 12px | Space before following content |
| **Paragraphs** | 16px | Space between paragraphs |
| **Major Sections** | 80px (desktop)<br>60px (tablet)<br>48px (mobile) | Space between major sections |

### Max-Width for Body Text

- **Optimal:** 680px (approximately 65-75 characters per line at 18px)
- Use for all body copy, subheads, and body large text

### Visual Hierarchy Examples

#### Homepage Hero:
```
H1 (72px Clash Display 600) "Yao Zhou"
↓ 16px space
Subhead (24px Post Grotesk 400) "Product Designer with agency..."
↓ 40px space before next section
```

#### Project Listing:
```
H2 (48px Clash Display 600) "From Swipes to Actual Dates"
↓ 12px space
Body Regular (18px Post Grotesk 400) "MVP redesign for a dating App..."
↓ 60px space before next project
```

#### Case Study Intro:
```
H1 (72px Clash Display 600) Project name
↓ 16px space
Caption (14px Post Grotesk 500) "Role, Timeline, Platform"
↓ 32px space
Body Large (20px Post Grotesk 400) Project overview
```

#### Section Within Case Study:
```
H3 (32px Clash Display 500) "Research & Discovery"
↓ 16px space
Body Regular (18px Post Grotesk 400) Content paragraphs
```

---

## 6. CSS Variables Structure

All typography values are available as CSS custom properties:

```css
/* Font Families */
--font-heading: 'Clash Display', sans-serif;
--font-body: 'Post Grotesk', sans-serif;

/* H1 Variables */
--text-h1-font-family
--text-h1-size
--text-h1-weight
--text-h1-line-height
--text-h1-letter-spacing

/* H2 Variables */
--text-h2-font-family
--text-h2-size
--text-h2-weight
--text-h2-line-height
--text-h2-letter-spacing

/* H3 Variables */
--text-h3-font-family
--text-h3-size
--text-h3-weight
--text-h3-line-height
--text-h3-letter-spacing

/* H4 Variables */
--text-h4-font-family
--text-h4-size
--text-h4-weight
--text-h4-line-height
--text-h4-letter-spacing

/* Subhead Variables */
--text-subhead-font-family
--text-subhead-size
--text-subhead-weight
--text-subhead-line-height
--text-subhead-letter-spacing

/* Body Large Variables */
--text-body-large-font-family
--text-body-large-size
--text-body-large-weight
--text-body-large-line-height
--text-body-large-letter-spacing

/* Body Regular Variables */
--text-body-font-family
--text-body-size
--text-body-weight
--text-body-line-height
--text-body-letter-spacing

/* Body Small Variables */
--text-body-small-font-family
--text-body-small-size
--text-body-small-weight
--text-body-small-line-height
--text-body-small-letter-spacing

/* Caption Variables */
--text-caption-font-family
--text-caption-size
--text-caption-weight
--text-caption-line-height
--text-caption-letter-spacing
--text-caption-text-transform

/* Button Variables */
--text-button-font-family
--text-button-size
--text-button-weight
--text-button-line-height
--text-button-letter-spacing

/* Spacing Variables */
--spacing-after-h1
--spacing-after-h2
--spacing-after-h3
--spacing-after-h4
--spacing-paragraph
--spacing-section-desktop
--spacing-section-tablet
--spacing-section-mobile

/* Max-Width Variables */
--max-width-body

/* Color Variables */
--text-primary
--text-secondary
--text-tertiary
--text-muted
--text-inverse
```

---

## 7. Usage Examples

### Semantic HTML (Recommended)
```html
<h1>Yao Zhou</h1>
<p class="text-subhead max-width-body">
  Product Designer with agency, startup, and founder experience...
</p>

<section class="spacing-section">
  <h2>From Swipes to Actual Dates</h2>
  <p class="max-width-body">
    MVP redesign for a dating App targeting Gen Z...
  </p>
</section>
```

### Using CSS Variables
```css
.hero-title {
  font-family: var(--text-h1-font-family);
  font-size: var(--text-h1-size);
  font-weight: var(--text-h1-weight);
  line-height: var(--text-h1-line-height);
  letter-spacing: var(--text-h1-letter-spacing);
  margin-bottom: var(--spacing-after-h1);
}
```

### Using Utility Classes
```html
<h1 class="text-h1 spacing-after-h1">Page Title</h1>
<p class="text-subhead max-width-body">Intro text</p>
<h2 class="text-h2 spacing-after-h2">Section Title</h2>
<p class="text-body max-width-body spacing-paragraph">Body content</p>
```

### React/JSX Example
```jsx
<h1 style={{
  fontFamily: 'var(--text-h1-font-family)',
  fontSize: 'var(--text-h1-size)',
  fontWeight: 'var(--text-h1-weight)',
  lineHeight: 'var(--text-h1-line-height)',
  letterSpacing: 'var(--text-h1-letter-spacing)',
  marginBottom: 'var(--spacing-after-h1)'
}}>
  Yao Zhou
</h1>
```

---

## 8. Responsive Breakpoints

```css
/* Mobile First Approach */
Base: 375px - 767px (Mobile)
Tablet: 768px - 1439px
Desktop: 1440px+

/* Media Query Usage */
@media (min-width: 768px) and (max-width: 1439px) { /* Tablet styles */ }
@media (min-width: 1440px) { /* Desktop styles */ }
```

---

## 9. Implementation Notes

### Font Loading Strategy
- Use `font-display: swap` for all custom fonts
- Preload critical fonts (Clash Display 600, Post Grotesk 400)
- Use system font stack as fallback

### Performance Considerations
- Limit font weights loaded (500, 600 for Clash Display; 400, 500 for Post Grotesk)
- Use variable fonts if available for smaller file sizes
- Consider subsetting fonts for Latin-only content

### Accessibility
- Always maintain minimum contrast ratios (WCAG AA)
- Use relative units (rem) for scalability
- Test with browser zoom at 200%
- Ensure text remains readable at all sizes
- Semantic HTML structure ensures proper heading hierarchy

---

## 10. Quick Reference

### Most Common Patterns

**Hero Section:**
```css
h1 {
  font-family: var(--text-h1-font-family);
  font-size: var(--text-h1-size);
  font-weight: var(--text-h1-weight);
  line-height: var(--text-h1-line-height);
  letter-spacing: var(--text-h1-letter-spacing);
  margin-bottom: var(--spacing-after-h1);
}
```

**Section Header:**
```css
h2 {
  font-family: var(--text-h2-font-family);
  font-size: var(--text-h2-size);
  font-weight: var(--text-h2-weight);
  line-height: var(--text-h2-line-height);
  letter-spacing: var(--text-h2-letter-spacing);
  margin-bottom: var(--spacing-after-h2);
}
```

**Body Text:**
```css
p {
  font-family: var(--text-body-font-family);
  font-size: var(--text-body-size);
  font-weight: var(--text-body-weight);
  line-height: var(--text-body-line-height);
  letter-spacing: var(--text-body-letter-spacing);
  margin-bottom: var(--spacing-paragraph);
  max-width: var(--max-width-body);
}
```

**Button:**
```css
.button {
  font-family: var(--text-button-font-family);
  font-size: var(--text-button-size);
  font-weight: var(--text-button-weight);
  line-height: var(--text-button-line-height);
  letter-spacing: var(--text-button-letter-spacing);
}
```
