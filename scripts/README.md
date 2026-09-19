# scripts

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
