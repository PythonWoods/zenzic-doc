#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# bump-version.sh — Update all hardcoded Zenzic version references in zenzic-doc.
#
# Usage:
#   bash scripts/bump-version.sh NEW_VERSION [NEW_BADGE]
#
# NEW_BADGE: full hero badge text.
#            Defaults to: v{NEW_VERSION} Stable
#
# Example (with codename):
#   bash scripts/bump-version.sh 0.6.3 'v0.6.3 "Obsidian Flux" Stable'
#
# Example (generic stable):
#   bash scripts/bump-version.sh 0.6.3

set -euo pipefail

cd "$(dirname "$0")/.."

NEW="${1:?Usage: $0 NEW_VERSION [NEW_BADGE]}"
export BUMP_NEW="${NEW}"
export BUMP_NEW_BADGE="${2:-v${NEW} Stable}"

# Detect current version from the canonical source (docusaurus.config.ts footer).
BUMP_OLD=$(grep -oP 'Zenzic v\K[0-9]+\.[0-9]+\.[0-9]+' docusaurus.config.ts | head -1)
export BUMP_OLD

echo "Bumping: v${BUMP_OLD} → v${BUMP_NEW}"
echo "Badge:   ${BUMP_NEW_BADGE}"
echo ""

python3 - <<'PYEOF'
import os, json
from pathlib import Path

old = os.environ['BUMP_OLD']
new = os.environ['BUMP_NEW']
new_badge = os.environ['BUMP_NEW_BADGE']

# Read current badge text from canonical EN source.
code_en = Path('i18n/en/code.json')
data_en = json.loads(code_en.read_text())
old_badge = data_en['homepage.hero.badge']['message']

changes = 0

def replace_file(path_str, old_str, new_str):
    global changes
    p = Path(path_str)
    content = p.read_text()
    if old_str not in content:
        print(f"  ⚠  {path_str}: pattern not found, skipping")
        return
    p.write_text(content.replace(old_str, new_str))
    changes += 1
    print(f"  ✓  {path_str}")

# 1a. docusaurus.config.ts — footer copyright line
replace_file('docusaurus.config.ts', f'Zenzic v{old}', f'Zenzic v{new}')

# 1b. docusaurus.config.ts — navbar version badge (HTML span)
replace_file('docusaurus.config.ts', f'>v{old}<', f'>v{new}<')

# 2. Quickstart.tsx — terminal "ready" prompt
replace_file('src/components/Homepage/Quickstart.tsx', f'zenzic {old}', f'zenzic {new}')

# 3. pages/index.tsx — JSON-LD softwareVersion
replace_file('src/pages/index.tsx', f'"softwareVersion": "{old}"', f'"softwareVersion": "{new}"')

# 4. Hero.tsx — default badge text inside <Translate> fallback
replace_file('src/components/Homepage/Hero.tsx', old_badge, new_badge)

# 5. i18n/en/code.json — EN hero badge message
data_en['homepage.hero.badge']['message'] = new_badge
code_en.write_text(json.dumps(data_en, indent=2, ensure_ascii=False) + '\n')
changes += 1
print(f"  ✓  i18n/en/code.json")

# 6. i18n/it/code.json — IT hero badge message (mirrors EN badge for version tag)
code_it = Path('i18n/it/code.json')
data_it = json.loads(code_it.read_text())
data_it['homepage.hero.badge']['message'] = new_badge
code_it.write_text(json.dumps(data_it, indent=2, ensure_ascii=False) + '\n')
changes += 1
print(f"  ✓  i18n/it/code.json")

# 7. static/assets/brand/zenzic-brand-system.html — version + codename
import re as _re
brand_html = Path('static/assets/brand/zenzic-brand-system.html')
brand_content = brand_html.read_text()
brand_changed = False

# 7a. Version string: replace every occurrence of v{old} → v{new}
if f'v{old}' in brand_content:
    brand_content = brand_content.replace(f'v{old}', f'v{new}')
    brand_changed = True

# 7b. Codename: extract from badge strings (format: v1.2.3 "Codename" Stable)
#     Replace in all three case variants used in the HTML:
#       Title Case  →  Obsidian Maturity
#       ALL CAPS    →  OBSIDIAN MATURITY
#       all lower   →  obsidian maturity
m_old = _re.search(r'"([^"]+)"', old_badge)
m_new = _re.search(r'"([^"]+)"', new_badge)
if m_old and m_new:
    old_code = m_old.group(1)   # e.g. "Obsidian Maturity"
    new_code = m_new.group(1)   # e.g. "Quantum Glass"
    if old_code != new_code:
        for variant in (
            (old_code,            new_code),
            (old_code.upper(),    new_code.upper()),
            (old_code.lower(),    new_code.lower()),
        ):
            if variant[0] in brand_content:
                brand_content = brand_content.replace(*variant)
                brand_changed = True

if brand_changed:
    brand_html.write_text(brand_content)
    changes += 1
    print(f"  ✓  static/assets/brand/zenzic-brand-system.html")
else:
    print(f"  ⚠  static/assets/brand/zenzic-brand-system.html: nothing to update, skipping")

# 8. Social card SVGs — version text (both dark and light variants)
for svg_path in ('static/assets/social/social-card.svg',
                 'static/assets/social/social-card-light.svg'):
    replace_file(svg_path, f'v{old}', f'v{new}')
    if m_old and m_new and old_code != new_code:
        # Also update codename in ALL CAPS (used in SVG text elements)
        p = Path(svg_path)
        c = p.read_text()
        upper_old = old_code.upper()
        upper_new = new_code.upper()
        if upper_old in c:
            p.write_text(c.replace(upper_old, upper_new))
            changes += 1
            print(f"  ✓  {svg_path} (codename ALL-CAPS)")

# 9. Regenerate ALL brand PNGs from their canonical SVGs (pure cairosvg — no subprocess).
#    Then rebuild brand-kit.zip using Python zipfile (no Node subprocess).
#
# MANIFEST: (svg_source, png_target, width, height)
#   - static/brand/svg/ is the canonical SVG source (also packed verbatim in brand-kit.zip)
#   - static/brand/png/ is the canonical PNG target (packed in brand-kit.zip)
#   - static/assets/brand/png/ mirrors brand/png/ for in-site serving
#   - static/assets/social/ sources and mirrors are handled separately
BRAND_PNG_MANIFEST = [
    # (svg_path, png_path, width, height)
    ('static/brand/svg/zenzic-icon.svg',
     'static/brand/png/zenzic-icon-512.png',          512,   512),
    ('static/brand/svg/zenzic-nav-dark.svg',
     'static/brand/png/zenzic-nav-dark.png',          640,   180),
    ('static/brand/svg/zenzic-nav-light.svg',
     'static/brand/png/zenzic-nav-light.png',         640,   180),
    ('static/brand/svg/zenzic-wordmark.svg',
     'static/brand/png/zenzic-wordmark.png',          600,   120),
    ('static/assets/social/social-card.svg',
     'static/assets/social/social-card.png',         1200,   630),
    ('static/assets/social/social-card-light.svg',
     'static/assets/social/social-card-light.png',   1200,   630),
]

# Mirrors: after writing canonical PNG, also copy to assets/brand/png/
BRAND_PNG_MIRRORS = {
    'static/brand/png/zenzic-icon-512.png':  'static/assets/brand/png/zenzic-icon-512.png',
    'static/brand/png/zenzic-nav-dark.png':  'static/assets/brand/png/zenzic-nav-dark.png',
    'static/brand/png/zenzic-nav-light.png': 'static/assets/brand/png/zenzic-nav-light.png',
    'static/brand/png/zenzic-wordmark.png':  'static/assets/brand/png/zenzic-wordmark.png',
}

print("\nRegenerating brand PNGs via cairosvg (pure Python — no subprocess) …")
try:
    import cairosvg as _svg
    import shutil as _shutil

    for svg_src, png_dst, w, h in BRAND_PNG_MANIFEST:
        _svg.svg2png(url=svg_src, write_to=png_dst, output_width=w, output_height=h)
        changes += 1
        print(f"  ✓  {png_dst}  [{w}×{h}]")
        # Mirror to static/assets/brand/png/ if applicable
        mirror = BRAND_PNG_MIRRORS.get(png_dst)
        if mirror and Path(mirror).parent.exists():
            _shutil.copy2(png_dst, mirror)
            print(f"     ↳  mirrored → {mirror}")

    # 10. Rebuild brand-kit.zip using Python zipfile (no Node subprocess).
    #     Mirrors the logic in scripts/build-assets.js.
    import zipfile as _zip
    ZIP_SOURCES = [
        ('static/brand',          'brand'),
        ('static/assets/social',  'social'),
    ]
    zip_out = Path('static/assets/brand-kit.zip')
    with _zip.ZipFile(zip_out, 'w', compression=_zip.ZIP_DEFLATED) as zf:
        for src_dir, prefix in ZIP_SOURCES:
            src = Path(src_dir)
            if not src.exists():
                continue
            for f in sorted(src.rglob('*')):
                if f.is_file():
                    arcname = f'{prefix}/{f.relative_to(src)}'
                    zf.write(f, arcname)
    changes += 1
    print(f"\n  ✓  static/assets/brand-kit.zip  (rebuilt — {zip_out.stat().st_size // 1024} KB)")

except ImportError:
    print("  ⚠  cairosvg not installed — PNGs and brand-kit.zip NOT regenerated.")
    print("     Install:  pip install cairosvg")

print(f"\n✓ Bump complete ({changes} file(s) updated). Run 'just verify' to validate.")
PYEOF
