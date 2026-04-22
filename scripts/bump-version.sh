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

print(f"\n✓ Bump complete ({changes} file(s) updated). Run 'just verify' to validate.")
PYEOF
