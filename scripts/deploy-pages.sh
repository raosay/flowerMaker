#!/usr/bin/env bash
# Build and publish dist/ to the gh-pages branch (GitHub Pages).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Building..."
npm run build

TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

cp -R dist/. "$TMP/"
touch "$TMP/.nojekyll"

cd "$TMP"
git init -q -b gh-pages
git add .
git -c user.name="$(git -C "$ROOT" config user.name 2>/dev/null || echo deploy)" \
    -c user.email="$(git -C "$ROOT" config user.email 2>/dev/null || echo deploy@local)" \
    commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"

REMOTE="$(git -C "$ROOT" remote get-url origin)"
git remote add origin "$REMOTE"
echo "→ Pushing gh-pages..."
git push -f origin gh-pages

echo "✓ Published: https://raosay.github.io/flowerMaker/"
