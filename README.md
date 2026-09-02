# waterui.dev

The landing page for [WaterUI](https://github.com/water-rs/waterui), built with Vite, React, and Tailwind CSS 4, deployed to Cloudflare Pages on every push to `main`.

## Develop

```bash
bun install
bun run dev
```

`bun run build` type-checks and produces `dist/`; `bun run lint` runs ESLint.

## Design

The visual language is derived from the `<#-#>` mark in `docs/logo.svg` of the main repository: monoline hairline rules instead of filled blocks, ink on paper with a single water accent, monospace display type, and the `#` glyph as the node in every data-flow drawing. Colour tokens live in `src/index.css` and switch with the viewer's colour scheme; a manual override is stored under `waterui.theme`.

The hero demo animates the mark itself: a `Binding` on the left `#`, a view on the right `#`, and the bond between them carrying each change.

## Content

- `src/locales/*.json` hold every user-facing string. English is the source of truth; add a language by adding a file and an entry in `src/i18n.ts`. The current language is stored under `waterui.lang` and can be forced with `?lang=zh`.
- Code samples are plain files under `src/snippets/` and are imported with `?raw`.
- Example screenshots under `public/examples/` are rendered with `water preview`; `src/data/examples.ts` lists which ones are shown.

## Brand assets

`public/favicon.svg` is the mark. `public/og.png` and `public/apple-touch-icon.png` are rendered from `scripts/og.html` and `scripts/touch-icon.html` by:

```bash
./scripts/render-assets.sh
```
