# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

import os
import re
from pathlib import Path

def camel_case_to_dash(name):
    # Z101BrokenLinks -> z101-broken-links
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()

def dash_to_camel_case(name):
    # z101-broken-links -> Z101BrokenLinks
    return ''.join(word.capitalize() for word in name.split('-'))

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

def main():
    doc_repo = Path("/home/pythonwoods/dev/PythonSandbox/zenzic-doc")
    tsx_dir = doc_repo / "src" / "components" / "examples"
    en_dir = doc_repo / "docs" / "tutorials" / "examples"

    # Map all mdx files by their code (e.g. z101)
    mdx_files = {}
    for p in en_dir.glob("**/*.mdx"):
        match = re.match(r'^(z\d\d\d)-', p.name)
        if match:
            mdx_files[match.group(1).upper()] = p

    for tsx_path in tsx_dir.glob("*.tsx"):
        code_match = re.match(r'^(Z\d\d\d)', tsx_path.stem)
        if not code_match:
            continue
        code = code_match.group(1)
        mdx_file = mdx_files.get(code)

        print(f"=== AUDIT FOR {code} ({tsx_path.name}) ===")
        if not mdx_file:
            print(f"No MDX file found for {code}!")
            continue

        expected_output = extract_expected_output(mdx_file)
        print(f"MDX Expected Output (first 3 lines):")
        print("\n".join(expected_output.splitlines()[:5]))
        print("...")

        tsx_content = tsx_path.read_text(encoding="utf-8")
        # Let's count some key strings in TSX to check if they match
        # e.g., check if Zxxx is correct
        findings_in_tsx = re.findall(r'\[Z\d\d\d\]', tsx_content)
        print(f"Z-codes referenced in TSX: {findings_in_tsx}")

        # Let's see if the TSX file uses a specific layout component or custom children
        if "CredentialTerminal" in tsx_content:
            print("Layout type: CredentialTerminal")
        elif "PathTraversalGuardTerminal" in tsx_content:
            print("Layout type: PathTraversalGuardTerminal")
        elif "SnippetTerminal" in tsx_content:
            print("Layout type: SnippetTerminal")
        elif "OrphanTerminal" in tsx_content:
            print("Layout type: OrphanTerminal")
        elif "SummaryTerminal" in tsx_content:
            print("Layout type: SummaryTerminal")
        else:
            print("Layout type: Generic ZenzicTerminal")

        print("\n")

if __name__ == "__main__":
    main()
