---
title: Welcome to Bear Blog
description: Getting started with your new ultra-minimal blog theme
date: 2026-02-19
tags:
  - posts
  - welcome
---

Welcome to your new **Bear Blog** powered by Eleventy! This theme brings the minimalist philosophy of Bear Blog to the Eleventy static site generator.

## What is Bear Blog?

Bear Blog is a blogging platform focused on:

- **Speed**: Pages load in milliseconds
- **Privacy**: No tracking, no analytics, no cookies
- **Simplicity**: Clean, distraction-free reading experience
- **Accessibility**: Semantic HTML, proper heading structure

## Features

This Eleventy theme includes:

### Ultra-Minimal CSS

Only **~2.3KB** of CSS for the entire site. The CSS uses:
- CSS variables for easy theming
- Automatic dark mode detection
- Responsive design with mobile-first approach
- Clean typography with system fonts

### Zero JavaScript

No JavaScript required for core functionality. The site is 100% static HTML and CSS.

### Critical CSS Inlining

For optimal performance, critical CSS is inlined in the `<head>` while the full CSS file is loaded asynchronously. This ensures the fastest possible first paint.

### Dark Mode Support

Automatic dark mode based on system preferences using `prefers-color-scheme` media query:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #01242e;
    --text-color: #ddd;
    /* ... */
  }
}
```

### RSS Feed

Automatic RSS feed generation at `/feed.xml` for readers who prefer feed readers.

### SEO Optimized

- Proper meta tags
- OpenGraph support
- Twitter Card support
- Semantic HTML structure
- Sitemap generation

## Getting Started

### Creating Posts

Create new markdown files in the blog content folder:

```yaml
---
layout: post.njk
title: Your Post Title
description: Optional description for SEO
date: 2026-02-19
tags:
  - posts
  - your-tag
---

Your content here...
```

### Customizing

Edit `src/_data/site.js` to:
- Change site title and description
- Enable/disable post navigation
- Hide/show "Made with" footer line
- Update author information

### Navigation

Add pages to navigation in `src/_data/navigation.js`:

```javascript
export default [
  {
    text: "Home",
    url: "/",
    weight: 1
  }
];
```

## Performance

This theme is optimized for speed:

- Critical CSS inlined for fast first paint
- Full CSS preloaded and loaded asynchronously
- Minimal HTML markup
- No external dependencies
- Average page size: **~5KB**

## Philosophy

Bear Blog (and this theme) embrace constraints:

> "Fewer distractions, faster loading, and more privacy are built-in."

By keeping things minimal, we achieve:
- **Faster load times** - Less code = faster downloads
- **Better accessibility** - Semantic HTML works everywhere
- **Easier maintenance** - Less code = fewer bugs
- **Focused content** - No distractions from what matters

## What's Next?

Start writing! The theme is ready to use out of the box. Check out:

- [Blog archive](/blog/) - See all your posts
- [RSS feed](/feed.xml) - Subscribe to updates
- [GitHub](https://github.com/adamdjbrett/11ty-bear) - View source code

Happy blogging! 🐻
