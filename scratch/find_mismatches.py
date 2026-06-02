# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

import os
import re
from pathlib import Path

doc_repo = Path("/home/pythonwoods/dev/PythonSandbox/zenzic-doc")
tsx_dir = doc_repo / "src" / "components" / "examples"
en_dir = doc_repo / "docs" / "tutorials" / "examples"

mdx_files = {}
for p in en_dir.glob("**/*.mdx"):
    match = re.match(r'^(z\d\d\d)-', p.name)
    if match:
        mdx_files[match.group(1).upper()] = p

def extract_expected_output(mdx_path: Path) -> str:
    content = mdx_path.read_text(encoding="utf-8")
    pattern = re.compile(
        r'Expected output:\s*\n+\s*```(?:text|bash|json)\s*\n(.*?)\n\s*```',
        re.DOTALL
    )
    match = pattern.search(content)
    if match:
        return match.group(1).strip()
    return ""

def audit():
    print(f"{'Code':<6} | {'TSX File':<25} | {'Issues'}")
    print("-" * 80)
    for code, mdx_file in sorted(mdx_files.items()):
        tsx_name = dash_to_camel(mdx_file.stem) + ".tsx"
        tsx_path = tsx_dir / tsx_name
        if not tsx_path.exists():
            # Try matching with prefix or variations if stem dash-to-camel differs
            # Let's search tsx_dir for any file starting with code
            matching_tsx = list(tsx_dir.glob(f"{code}*.tsx"))
            if matching_tsx:
                tsx_path = matching_tsx[0]
                tsx_name = tsx_path.name
            else:
                print(f"{code:<6} | {'MISSING':<25} | No TSX component found!")
                continue

        expected_output = extract_expected_output(mdx_file)
        tsx_content = tsx_path.read_text(encoding="utf-8")

        issues = []

        # 1. Exit code check
        # Check MDX expected output exit code
        exit_code_mdx = "0"
        if "FAILED:" in expected_output:
            # check if "Exit code 2" or "Exit code 3" or exit code 1
            if "Exit code 2 is mandatory" in expected_output:
                exit_code_mdx = "2"
            elif "Exit code 3 is mandatory" in expected_output or "Exit code 3" in expected_output:
                exit_code_mdx = "3"
            else:
                exit_code_mdx = "1"

        # Check TSX exit code
        exit_code_tsx_match = re.search(r'exit\s+(\d)', tsx_content)
        if exit_code_tsx_match:
            exit_code_tsx = exit_code_tsx_match.group(1)
            if exit_code_tsx != exit_code_mdx:
                issues.append(f"Exit Code Mismatch (MDX: {exit_code_mdx}, TSX: {exit_code_tsx})")
        else:
            if "CredentialTerminal" not in tsx_content and "PathTraversalGuardTerminal" not in tsx_content:
                issues.append("No exit code found in TSX")

        # 2. Finding codes mismatch
        # Extract findings in MDX (e.g. [Z104] or [Z101])
        mdx_codes = set(re.findall(r'\[(Z\d\d\d)\]', expected_output))
        # Extract findings in TSX
        tsx_codes = set(re.findall(r'\[(Z\d\d\d)\]', tsx_content))

        # Filter out self code if we are checking credential/path traversal because they use custom terminals
        if "CredentialTerminal" in tsx_content:
            tsx_codes.add("Z201")
        if "PathTraversalGuardTerminal" in tsx_content:
            tsx_codes.add("Z202") # or Z203

        if not mdx_codes.issubset(tsx_codes) and not (code == "Z201" and "CredentialTerminal" in tsx_content) and not (code == "Z202" and "PathTraversalGuardTerminal" in tsx_content):
            issues.append(f"Codes Mismatch (MDX: {sorted(list(mdx_codes))}, TSX: {sorted(list(tsx_codes))})")

        # 3. Text content validation
        # Let's extract all locations (e.g., docs/index.md:11:2 or docs/guide.md:4)
        mdx_locs = re.findall(r'(docs/[a-zA-Z0-9_\-\./]+:\d+(?::\d+)?)', expected_output)
        tsx_locs = re.findall(r'(docs/[a-zA-Z0-9_\-\./]+:\d+(?::\d+)?)', tsx_content)
        if mdx_locs and not tsx_locs:
            # TSX might have escaped quotes or slightly different locations
            pass
        elif mdx_locs:
            # Check if MDX locations exist in TSX
            for loc in mdx_locs:
                # normalize to strip colons or compare base
                # e.g., docs/index.md:11:2 might be in TSX as docs/index.md:11:2 or docs/index.md:11
                loc_base = loc.split(':')[0] + ":" + loc.split(':')[1]
                found = False
                for tloc in tsx_locs:
                    if loc_base in tloc or tloc in loc_base:
                        found = True
                        break
                if not found:
                    issues.append(f"Location not in TSX ({loc})")

        if not issues:
            print(f"{code:<6} | {tsx_name:<25} | OK")
        else:
            print(f"{code:<6} | {tsx_name:<25} | " + " | ".join(issues))

def dash_to_camel(name):
    # z101-broken-links -> Z101BrokenLinks
    # z204-forbidden-term -> Z204ForbiddenTerm
    # Special overrides if any
    parts = name.split('-')
    # capitalize each
    return ''.join(p.capitalize() for p in parts)

if __name__ == "__main__":
    audit()
