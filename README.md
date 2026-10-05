# waterui.dev

The landing page for [WaterUI](https://github.com/water-rs/waterui), built with Vite, React, and Tailwind CSS 4, deployed to Cloudflare Pages on every push to `main`.

## Develop

```bash
bun install
bun run dev
```

`bun run build` type-checks and produces `dist/`; `bun run lint` runs ESLint.

## Design

The page is drawn the way WaterUI lays it out. Ink and paper carry the content; one colour, the guide blue, is reserved for a layout inspector over the page: containers outlined and named after the WaterUI container they stand for (`VStack`, `HStack`, `Grid`), with their stretch axis, their measured size, and their padding and stack spacing as hatching. The sizes are measured from the live page, so they change as it resizes. `Box` in `src/components/inspector.tsx` draws one; the "Inspect layout" switch in the navigation draws every box on the page, and the choice is stored under `waterui.inspector`.

Colour tokens live in `src/index.css` and switch with the viewer's colour scheme; a manual override is stored under `waterui.theme`. A `band-dark` section takes the dark tokens in either scheme.

## Content

- `src/locales/*.json` hold every user-facing string. English is the source of truth; add a language by adding a file and an entry in `src/i18n.ts`. The current language is stored under `waterui.lang` and can be forced with `?lang=zh`.
- Code samples are plain files under `src/snippets/` and are imported with `?raw`.
- Example captures under `public/examples/<backend>/` come from each backend's nightly end-to-end suite; `src/data/examples.ts` lists which ones are shown and which are held back, with the issue tracking each.
- Live demos under `/demo/<id>/` are Hydrolysis web-backend builds of `water-rs/waterui` examples. They are built by the deploy workflow, never committed: `src/data/demos.json` pins the `water-rs/waterui` revision (`waterui` — an exact sha) and lists the `examples` the deploy job loops through `scripts/build-demo.sh` into `public/demo/` before `bun run build`. To bump the pin, set `waterui` to a newer sha and run every listed example through `scripts/build-demo.sh` plus a browser smoke test before updating `examples`. To build one locally, check out `water-rs/waterui` at the pinned sha and run `WATERUI_DIR=… ./scripts/build-demo.sh map public/demo`, then serve `public/demo/map/` (see `scripts/README.md` for the toolchain).
- `src/data/benchmarks.ts` holds the framework comparison. Every row is a marked placeholder until it is measured.

## Brand assets

`public/favicon.svg` is the mark. `public/og.png` and `public/apple-touch-icon.png` are rendered from `scripts/og.html` and `scripts/touch-icon.html` by:

```bash
./scripts/render-assets.sh
```
