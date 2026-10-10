#!/usr/bin/env bash
# Build one WaterUI example for the web (Hydrolysis backend) and stage the
# servable bundle under <out-dir>/<example>/.
#
# Usage:
#   WATERUI_DIR=/path/to/waterui scripts/build-demo.sh <example> <out-dir>
#
# WATERUI_DIR must point at a water-rs/waterui checkout at the revision pinned
# in src/data/demos.json; the examples' Water.toml resolves the framework from
# it, so the pin is what the build actually ships.
#
# Requires on PATH: the `water` CLI and `wasm-pack`. The deployed bundle is the
# CLI's own packaged site (`index.html`, `bootstrap.js`, `style.css`, `pkg/`,
# staged fonts and assets), copied verbatim — this script assembles nothing.

set -euo pipefail

example="${1:?usage: build-demo.sh <example> <out-dir>}"
out_dir="${2:?usage: build-demo.sh <example> <out-dir>}"

: "${WATERUI_DIR:?WATERUI_DIR must point at a water-rs/waterui checkout}"

project_dir="$WATERUI_DIR/examples/$example"
if [ ! -f "$project_dir/Water.toml" ]; then
  echo "build-demo.sh: no WaterUI example at $project_dir" >&2
  exit 1
fi

# Packaging never touches the network: remote assets the example declares,
# such as its web fonts, are downloaded (and checked against their pinned
# digests) by `water fetch` first.
water fetch --backend hydrolysis --path "$project_dir"

water package \
  --platform web \
  --backend hydrolysis \
  --release \
  --path "$project_dir"

site="$project_dir/target/package/web"
if [ ! -f "$site/index.html" ]; then
  echo "build-demo.sh: water package produced no site at $site" >&2
  exit 1
fi

mkdir -p "$out_dir"
rm -rf "${out_dir:?}/$example"
cp -R "$site" "$out_dir/$example"
