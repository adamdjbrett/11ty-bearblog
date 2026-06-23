# 11ty ʕ•ᴥ•ʔ Bear Blog

An Eleventy 3 + Nunjucks port of [Hugo ʕ•ᴥ•ʔ Bear Blog](https://github.com/janraasch/hugo-bearblog), based on [Bear Blog](https://bearblog.dev).

> Free, no-nonsense, super-fast blogging.

## Stack

- [Eleventy](https://www.11ty.dev/) 3.x
- Nunjucks layouts and partials
- [`@apleasantview/eleventy-plugin-baseline`](https://www.eleventy-baseline.dev/)
- [`@11ty/eleventy-img`](https://www.11ty.dev/docs/plugins/image/)

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

The source lives in `src/` and the built site is written to `dist/`.

## Build

```bash
npm run build
```

## Content

- Home page: `src/content/index.md`
- Pages: `src/content/*.md`
- Blog index: `src/content/blog/index.md`
- Blog posts: `src/content/blog/*.md`
- Site settings: `src/_data/settings.js`
- Layouts and partials: `src/_includes/`

Blog posts use Bearblog-style permalinks. For example, `src/content/blog/markdown-syntax.md` outputs `/markdown-syntax/`.

## Feeds

This site generates:

- Atom: `/feed/feed.xml`
- JSON Feed: `/feed/feed.json`
- twtxt: `/feed/twtxt.txt`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

The Atom feed is styled with `src/feed/pretty-atom-feed.xsl`.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Jan Raasch](https://www.janraasch.com)
