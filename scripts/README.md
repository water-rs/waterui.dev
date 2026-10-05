# scripts

## build-demo.sh

Builds one WaterUI example as a servable Hydrolysis web bundle:

```bash
WATERUI_DIR=~/checkouts/waterui ./scripts/build-demo.sh <example> public/demo
```

`WATERUI_DIR` must point at a checkout of `water-rs/waterui` at the revision
pinned in `src/data/demos.json` (`waterui` key — an exact sha, never a
branch). The script runs `water package --platform web --backend hydrolysis
--release` on `examples/<example>` and copies the CLI's packaged site to
`<out-dir>/<example>/`, so `<out-dir>/<example>/index.html` is the entry
point. It exits non-zero when the example does not exist or the package step
fails; the deploy workflow loops it over `examples` under
`set -euo pipefail`, so a broken demo fails the deploy.

Toolchain: the `water` CLI on `PATH`, built from the same pinned checkout
(`cargo build --release -p waterui-cli --bin water`), a Rust
toolchain with the `wasm32-unknown-unknown` target, and `wasm-pack`. Set
`CARGO_TARGET_DIR` to a shared directory to compile the dependency graph once
across examples.

## render-assets.sh

Renders `public/og.png` and `public/apple-touch-icon.png` from `og.html` and `touch-icon.html` with headless Chrome.

## Example screenshots

`public/examples/*.webp` are produced by the WaterUI CLI from a checkout of the main repository, then converted with `cwebp -q 82 -m 6`:

```bash
cargo build -p waterui-cli --release --bin water
target/release/water preview demo --backend hydrolysis --theme material3 --frame 900x640 \
  --path examples/<name> --output <name>.png
```

Three examples need a variant:

- `filter` has no representative `#[preview]`, so render its `demo()` as an expression: `water preview --expr "demo()" ...`.
- `video_player`'s preview is named `video_player_preview`, not `demo`: `water preview video_player_preview ...`. Asking for `demo` fails at link time with an undefined `_waterui_preview_video_player_example_demo`.
- `flow_markdown` starts on an empty document; drive it with `--scenario` (a click on "Load full", capture at 1500 ms) and take `frame-1500ms.png` from `--output-dir`. A working scenario file is `scripts/flow_markdown.scenario.toml`.
