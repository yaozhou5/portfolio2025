# Typography System - Quick Reference Guide

## How to Use This System

### Option 1: Semantic HTML (Recommended)
Use semantic HTML elements - styles are automatically applied:

```html
<h1>Yao Zhou</h1>
<p class="text-subhead max-width-body">
  Product Designer with agency, startup, and founder experience...
</p>

<h2>From Swipes to Actual Dates</h2>
<p class="max-width-body">
  MVP redesign for a dating App targeting Gen Z...
</p>
```

### Option 2: CSS Variables
Use CSS custom properties for maximum flexibility:

```css
.my-heading {
  font-family: var(--text-h2-font-family);
  font-size: var(--text-h2-size);
  font-weight: var(--text-h2-weight);
  line-height: var(--text-h2-line-height);
  letter-spacing: var(--text-h2-letter-spacing);
  margin-bottom: var(--spacing-after-h2);
}
```

### Option 3: Utility Classes
Use pre-built utility classes:

```html
<h1 class="text-h1 spacing-after-h1">Hero Title</h1>
<h2 class="text-h2 spacing-after-h2">Section Header</h2>
<p class="text-body max-width-body spacing-paragraph">Body text content...</p>
```

### Option 4: Inline Styles (React/JSX)
Use CSS variables directly in style props:

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

---

## Common Patterns

### Homepage Hero Section
```jsx
<section className="py-16 md:py-24">
  <h1>Yao Zhou</h1>
  <p className="text-subhead max-width-body">
    Product Designer with agency, startup, and founder experience, 
    working end-to-end to turn ambiguity into progress.
  </p>
</section>
```

### Project Listing
```jsx
<section className="spacing-section">
  <h2>From Swipes to Actual Dates</h2>
  <p className="text-body max-width-body">
    MVP redesign for a dating App targeting Gen Z
  </p>
  <span className="text-caption">Product Design • 2024</span>
</section>
```

### Case Study Intro
```jsx
<article className="max-w-5xl mx-auto px-6 py-16">
  {/* Hero Title */}
  <h1>ClearFeed: Decrypting the Paywall</h1>
  
  {/* Metadata */}
  <div className="flex gap-4 mb-8">
    <span className="text-caption">Product Design</span>
    <span className="text-caption">•</span>
    <span className="text-caption">2024</span>
  </div>
  
  {/* Lead Paragraph */}
  <p className="text-body-large max-width-body spacing-paragraph">
    This is the lead paragraph that introduces the case study and provides
    context for the work that follows.
  </p>
  
  {/* Body Content */}
  <p className="text-body max-width-body spacing-paragraph">
    This is the main body content that goes into detail about the project,
    the challenges faced, and the solutions developed.
  </p>
</article>
```

### Section Within Case Study
```jsx
<section className="spacing-section">
  <h3>Research & Discovery</h3>
  <p className="text-body max-width-body spacing-paragraph">
    Our initial research phase focused on dissecting the modern reader's experience...
  </p>
  <p className="text-body max-width-body">
    The insights were stark and pointed to clear opportunities...
  </p>
</section>
```

### Card Component
```jsx
<div className="bg-white rounded-[24px] p-6">
  <h4>Card Title</h4>
  <p className="text-body-small spacing-paragraph">
    Card description text
  </p>
  <span className="text-caption">Metadata or tag</span>
</div>
```

### Button
```jsx
<button className="px-6 py-3 bg-gray-900 text-white rounded-full">
  <span className="text-button">Call to Action</span>
</button>
```

### Navigation Link
```jsx
<Link 
  href="/work"
  className="text-button text-primary hover:text-link-hover transition-colors"
>
  Work
</Link>
```

---

## Spacing Between Elements

### Automatic Spacing (Semantic HTML)
When using semantic HTML elements (`<h1>`, `<h2>`, `<p>`), spacing is automatically applied:

```html
<h1>Title</h1>
<!-- Automatically has 24px margin-bottom -->
<p>Content</p>
<!-- Automatically has 16px margin-bottom -->
```

### Manual Spacing (Utility Classes)
```jsx
/* H1 followed by body */
<h1 className="text-h1 spacing-after-h1">Title</h1>
<p className="text-body">Content</p>

/* H2 followed by body */
<h2 className="text-h2 spacing-after-h2">Section</h2>
<p className="text-body">Content</p>

/* Multiple paragraphs */
<p className="text-body spacing-paragraph">First paragraph</p>
<p className="text-body spacing-paragraph">Second paragraph</p>
<p className="text-body">Final paragraph</p>

/* Section spacing */
<section className="spacing-section">
  {/* Content */}
</section>
```

---

## Max-Width for Readability

Always use `max-width-body` for body text:

```jsx
/* Body text - optimal reading width (680px) */
<p className="text-body max-width-body">
  Long form content that's easy to read...
</p>

/* Subhead text */
<p className="text-subhead max-width-body">
  Intro paragraphs and descriptions...
</p>

/* Body large text */
<p className="text-body-large max-width-body">
  Featured content and pull quotes...
</p>
```

**Note:** Headings (H1-H4) don't need max-width constraints - they can span wider for visual impact.

---

## Weight Combinations

### Maximum Contrast (Hero Sections)
```jsx
<h1 className="text-h1">Hero Title</h1>
<p className="text-body max-width-body">Supporting body text</p>
```
- H1: Clash Display 600
- Body: Post Grotesk 400

### Strong Hierarchy (Case Studies)
```jsx
<h2 className="text-h2">Section Title</h2>
<p className="text-body-large max-width-body">Lead paragraph</p>
```
- H2: Clash Display 600
- Body Large: Post Grotesk 400

### Clear but Softer (Subsections)
```jsx
<h3 className="text-h3">Subsection</h3>
<p className="text-body max-width-body">Content</p>
```
- H3: Clash Display 500
- Body: Post Grotesk 400

### Subtle Differentiation (Metadata)
```jsx
<p className="text-body max-width-body">Main content</p>
<span className="text-caption">December 2024</span>
```
- Body: Post Grotesk 400
- Caption: Post Grotesk 500

---

## Complete Example: Case Study Page

```jsx
<article className="max-w-5xl mx-auto px-6 py-16">
  {/* Hero Title */}
  <h1>Project Title: Bold Statement</h1>
  
  {/* Metadata */}
  <div className="flex gap-4 mb-8">
    <span className="text-caption">Product Design</span>
    <span className="text-caption">•</span>
    <span className="text-caption">2024</span>
  </div>
  
  {/* Lead Paragraph */}
  <p className="text-body-large max-width-body spacing-paragraph">
    This is the lead paragraph that introduces the case study and provides
    context for the work that follows.
  </p>
  
  {/* Body Content */}
  <p className="text-body max-width-body spacing-paragraph">
    This is the main body content that goes into detail about the project,
    the challenges faced, and the solutions developed.
  </p>
  
  {/* Section Header */}
  <section className="spacing-section">
    <h2>The Challenge</h2>
    
    <p className="text-body max-width-body spacing-paragraph">
      More detailed content about the specific challenges...
    </p>
    
    {/* Subsection */}
    <h3>User Research</h3>
    <p className="text-body max-width-body spacing-paragraph">
      Content about the research phase...
    </p>
  </section>
</article>
```

---

## Responsive Behavior

The typography system automatically scales across breakpoints:

- **Desktop (1440px+):** Full size specifications
- **Tablet (768px-1439px):** Scaled down appropriately
- **Mobile (375px-767px):** Further optimized for small screens

All CSS variables automatically update at each breakpoint - no additional code needed!

---

## Testing Checklist

- [ ] Text is readable at all sizes (375px - 2560px)
- [ ] Contrast ratios meet WCAG AA standards
- [ ] Fonts load with `font-display: swap`
- [ ] Text scales appropriately on zoom (200%)
- [ ] Line heights provide comfortable reading
- [ ] Max-widths prevent overly wide text (680px)
- [ ] Spacing creates clear hierarchy
- [ ] Mobile typography is touch-friendly
- [ ] Headings stand out from body text
- [ ] Semantic HTML structure is maintained (H1-H6)
- [ ] H1 appears once per page
- [ ] Proper heading hierarchy (H1 → H2 → H3 → H4)

---

## Troubleshooting

**Fonts not loading?**
- Check font file paths in `globals.css`
- Verify `@font-face` declarations
- Use browser DevTools Network tab to check loading

**Text too small/large?**
- Adjust CSS variables in `typography.css`
- Check viewport meta tag
- Verify breakpoints are correct

**Poor readability?**
- Ensure max-width-body (680px) is applied
- Check line-height values (1.7 for body, 1.6 for subhead)
- Verify contrast ratios

**Inconsistent spacing?**
- Use semantic HTML for automatic spacing
- Or use spacing utility classes consistently
- Follow spacing guidelines (24px after H1, 20px after H2, etc.)

**Heading hierarchy issues?**
- Ensure H1 appears once per page
- Follow semantic structure: H1 → H2 → H3 → H4
- Use H5/H6 for metadata only
