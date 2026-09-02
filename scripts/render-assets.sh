#!/usr/bin/env bash
# Renders the static brand assets that live in public/ from their sources in scripts/.
#   public/og.png              social card, 1200x630, from scripts/og.html
#   public/apple-touch-icon.png 180x180 raster of public/favicon.svg
# Requires Google Chrome (macOS path below) and the macOS `sips` tool.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$chrome" --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --screenshot="$root/public/og.png" \
  "file://$root/scripts/og.html" 2>/dev/null

"$chrome" --headless --disable-gpu --hide-scrollbars --default-background-color=00000000 \
  --window-size=180,180 --screenshot="$root/public/apple-touch-icon.png" \
  "file://$root/scripts/touch-icon.html" 2>/dev/null

sips -g pixelWidth -g pixelHeight "$root/public/og.png" "$root/public/apple-touch-icon.png"
