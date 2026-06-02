# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

import os
import re
from pathlib import Path

def camel_case_to_dash(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()

def dash_to_camel(name):
    parts = name.split('-')
    return ''.join(p.capitalize() for p in parts)

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

def escape_jsx(text: str) -> str:
    # Escape brackets, quotes and curly braces for React
    text = text.replace('<', '&lt;').replace('>', '&gt;')
    text = text.replace('{', '{"{"}').replace('}', '{"}"}')
    text = text.replace("'", "&apos;").replace('"', "&quot;")
    return text

def parse_expected_output(output: str, code: str) -> list[str]:
    lines = output.splitlines()
    jsx_blocks = []

    # Track states
    in_snippet = False

    # We want to parse lines sequentially and generate React elements
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # 1. Divider line
        if stripped.startswith("────") or stripped == "────────────────────────────────────────────────────────────────────────────────":
            jsx_blocks.append('      <div className="text-zinc-700 my-4 select-none">────────────────────────────────────────────────────────────────────────────────</div>')
            i += 1
            continue

        # 2. Policy violation block (Z204)
        if "POLICY VIOLATION DETECTED" in line:
            jsx_blocks.append('      <div className="text-rose-500 font-semibold mb-2">✘ POLICY VIOLATION DETECTED</div>')
            # Look ahead for Finding, Location, Term, Action
            pl_lines = []
            action_lines = []
            i += 1
            while i < len(lines):
                next_line = lines[i]
                if "POLICY VIOLATION DETECTED" in next_line or next_line.strip().startswith("───") or "Summary:" in next_line or next_line.strip().startswith("standalone") or next_line.strip().startswith("zensical"):
                    # We reached another section
                    break

                next_stripped = next_line.strip()
                if next_stripped.startswith("x "):
                    # Finding, Location, Term
                    # e.g., x Finding:    Forbidden term detected — remove from documentation: 'ProjectX'
                    match_x = re.match(r'^x\s+([A-Za-z]+):\s*(.*)$', next_stripped)
                    if match_x:
                        label = match_x.group(1)
                        val = match_x.group(2)
                        pl_lines.append(f'        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">{label}:</span> {escape_jsx(val)}</div>')
                    else:
                        pl_lines.append(f'        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span>{escape_jsx(next_stripped[2:])}</div>')
                elif next_stripped.startswith("Action:"):
                    action_lines.append(escape_jsx(next_stripped[7:].strip()))
                elif action_lines:
                    # Multi-line action
                    action_lines.append(escape_jsx(next_stripped))
                else:
                    if next_stripped:
                        pl_lines.append(f'        <div className="text-zinc-300">{escape_jsx(next_stripped)}</div>')
                i += 1

            if pl_lines:
                jsx_blocks.append('      <div className="space-y-1 mb-3">\n' + "\n".join(pl_lines) + '\n      </div>')
            if action_lines:
                jsx_blocks.append(f'      <div className="text-zinc-400 mb-4"><span className="text-zinc-500 font-semibold">Action:</span> {" ".join(action_lines)}</div>')
            continue

        # 3. Header engine lines (e.g. standalone - 1 file...)
        if ("standalone - " in line or "zensical - " in line) and "Summary:" not in line:
            jsx_blocks.append(f'      <div className="text-zinc-500 mb-4">{escape_jsx(line)}</div>')
            i += 1
            continue

        # 4. Finding headers: e.g., docs/index.md:11:2  x  [Z104]  'missing.md' not found in docs
        # We can match: path:line:col or path:line or path
        # Followed by x or ! or i
        # Followed by [Zxxx]
        # Followed by message
        finding_match = re.match(
            r'^([a-zA-Z0-9_\-\./]+(?::\d+){0,2})\s+([x!i])\s+\[(Z\d\d\d)\]\s+(.*)$',
            line
        )
        if finding_match:
            loc = finding_match.group(1)
            marker = finding_match.group(2)
            code_finding = finding_match.group(3)
            msg = finding_match.group(4)

            icon = "✘"
            icon_cls = "text-rose-500"
            badge_cls = "bg-rose-500/10 text-rose-400"

            if marker == "!":
                icon = "⚠"
                icon_cls = "text-amber-500"
                badge_cls = "bg-amber-500/10 text-amber-400"
            elif marker == "i":
                icon = "ℹ"
                icon_cls = "text-blue-500"
                badge_cls = "bg-blue-500/10 text-blue-400"

            jsx_blocks.append(f'      <div className="text-zinc-500 mb-1 border-b border-zinc-800/40 pb-1 font-medium mt-6 first:mt-0">\n        {escape_jsx(loc)}\n      </div>')
            jsx_blocks.append(f'      <div className="flex gap-3 mb-4">\n        <span className="{icon_cls}">{icon}</span>\n        <span className="{badge_cls} px-1.5 py-0.5 rounded-sm whitespace-nowrap">\n          [{code_finding}]\n        </span>\n        <span className="text-zinc-300">\n          {escape_jsx(msg)}\n        </span>\n      </div>')
            i += 1
            continue

        # 5. Code snippet lines
        # e.g., "     9  │  ## Broken References"
        # e.g., "    11  ❱  - [Getting Started]..."
        # e.g., "        │    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
        snippet_std = re.match(r'^\s*(\d+)\s+│\s*(.*)$', line)
        snippet_hl = re.match(r'^\s*(\d+)\s+❱\s*(.*)$', line)
        snippet_caret = re.match(r'^\s*│\s*(\^+.*)$', line)

        if snippet_std:
            num = snippet_std.group(1)
            text = snippet_std.group(2)
            jsx_blocks.append(f'      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">{num}</span>│ {escape_jsx(text)}</div>')
            i += 1
            continue
        elif snippet_hl:
            num = snippet_hl.group(1)
            text = snippet_hl.group(2)
            jsx_blocks.append(f'      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">\n        <span className="w-6 text-right mr-3 text-rose-500 font-bold">{num}</span>\n        <span className="text-rose-500 mr-1 font-bold">❱</span>\n        <span>{escape_jsx(text)}</span>\n      </div>')
            i += 1
            continue
        elif snippet_caret:
            carets = snippet_caret.group(1)
            jsx_blocks.append(f'      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3"> </span>│ <span className="text-rose-500">{escape_jsx(carets)}</span></div>')
            i += 1
            continue

        # 6. Summary lines
        # Summary:  x 2 errors  ! 0 warnings  i 0 info  - 1 file with findings
        if line.startswith("Summary:"):
            # Let's replace counts with colored spans if possible, or just print it nicely
            # We can find tokens: x N errors, ! N warnings, etc.
            content_sum = escape_jsx(line)
            # Find and replace:
            content_sum = re.sub(r'x\s+(\d+)\s+errors?', r'<span className="text-rose-500 font-semibold">✘ \1 errors</span>', content_sum)
            content_sum = re.sub(r'!\s+(\d+)\s+warnings?', r'<span className="text-amber-500 font-semibold">⚠ \1 warnings</span>', content_sum)
            content_sum = re.sub(r'i\s+(\d+)\s+info', r'<span className="text-blue-500 font-semibold">ℹ \1 info</span>', content_sum)
            content_sum = re.sub(r'x\s+(\d+)\s+policy violations', r'<span className="text-rose-500 font-semibold">✘ \1 policy violations</span>', content_sum)

            # Reconstruct JSX block
            # Since Summary line is text, we wrap it in a div that resolves the tags
            # Let's write it as dangerouslySetInnerHTML or just direct JSX.
            # Direct JSX is safer:
            # e.g., Summary:  x 2 errors -> Summary: <span...>
            # Let's do a simple manual parsing or direct replacement of tags:
            # We will use string interpolation and compile it properly.
            # Let's just output a clean custom block.
            # For now, let's replace markers with JSX tags:
            # "Summary:  x 2 errors  ! 0 warnings  i 0 info  - 1 file with findings"
            # -> Summary: <span className="text-rose-500">✘ 2 errors</span>...
            parts = []
            # Tokenize by double spaces
            toks = [t.strip() for t in line.split("  ") if t.strip()]
            for tok in toks:
                if tok.startswith("Summary:"):
                    parts.append('Summary:')
                elif tok.startswith("x ") and "error" in tok:
                    err_match = re.search(r'x\s+(\d+)\s+error', tok)
                    num = err_match.group(1) if err_match else "0"
                    parts.append(f'<span className="text-rose-500 font-medium">✘ {num} errors</span>')
                elif tok.startswith("x ") and "policy" in tok:
                    pol_match = re.search(r'x\s+(\d+)\s+policy', tok)
                    num = pol_match.group(1) if pol_match else "0"
                    parts.append(f'<span className="text-rose-500 font-medium">✘ {num} policy violations</span>')
                elif tok.startswith("!") and "warning" in tok:
                    warn_match = re.search(r'!\s+(\d+)\s+warning', tok)
                    num = warn_match.group(1) if warn_match else "0"
                    parts.append(f'<span className="text-amber-500 font-medium">⚠ {num} warnings</span>')
                elif tok.startswith("i ") and "info" in tok:
                    info_match = re.search(r'i\s+(\d+)\s+info', tok)
                    num = info_match.group(1) if info_match else "0"
                    parts.append(f'<span className="text-zinc-500 font-medium">ℹ {num} info</span>')
                else:
                    parts.append(f'<span className="text-zinc-500">{escape_jsx(tok)}</span>')

            jsx_blocks.append('      <div className="flex flex-wrap gap-4 mt-4">\n        ' + " \n        ".join(parts) + '\n      </div>')
            i += 1
            continue

        # 7. Verdict line (FAILED: ... or Analysis complete: ...)
        if line.startswith("FAILED:") or line.startswith("SUCCESS:") or line.startswith("* Analysis complete:"):
            cls = "text-rose-500 font-bold tracking-wide mt-2" if "FAILED:" in line else "text-emerald-500 font-bold tracking-wide mt-2"
            jsx_blocks.append(f'      <div className="{cls}">{escape_jsx(line)}</div>')
            i += 1
            continue

        # 8. Refer to ...
        if line.startswith("Refer to https://zenzic.dev"):
            jsx_blocks.append(f'      <div className="text-zinc-500 mt-1">{escape_jsx(line)}</div>')
            i += 1
            continue

        # 9. Suppression audit
        if "[ Suppression Audit:" in line or "Suppression Audit:" in line or "[ Suppression Audit" in line:
            jsx_blocks.append(f'      <div className="text-zinc-500 mt-1">{escape_jsx(line)}</div>')
            i += 1
            continue

        # 10. General text
        if stripped:
            jsx_blocks.append(f'      <div className="text-zinc-400">{escape_jsx(line)}</div>')
        else:
            jsx_blocks.append('      <div className="h-2" />')

        i += 1

    return jsx_blocks

def main():
    doc_repo = Path("/home/pythonwoods/dev/PythonSandbox/zenzic-doc")
    tsx_dir = doc_repo / "src" / "components" / "examples"
    en_dir = doc_repo / "docs" / "tutorials" / "examples"

    mdx_files = {}
    for p in en_dir.glob("**/*.mdx"):
        match = re.match(r'^(z\d\d\d)-', p.name)
        if match:
            mdx_files[match.group(1).upper()] = p

    # We only compile files that are mismatching
    # These are: Z101, Z102, Z103, Z108, Z204, Z302, Z303, Z402, Z403, Z405, Z501, Z502, Z505
    mismatches = ["Z101", "Z102", "Z103", "Z108", "Z204", "Z302", "Z303", "Z402", "Z403", "Z405", "Z501", "Z502", "Z505"]

    for code in mismatches:
        mdx_file = mdx_files.get(code)
        if not mdx_file:
            print(f"Skipping {code}: no MDX file")
            continue

        expected_output = extract_expected_output(mdx_file)
        if not expected_output:
            print(f"Skipping {code}: empty expected output in MDX")
            continue

        tsx_name = dash_to_camel(mdx_file.stem) + ".tsx"
        # Find exact filename in tsx_dir to be safe
        matching_tsx = list(tsx_dir.glob(f"{code}*.tsx"))
        if matching_tsx:
            tsx_path = matching_tsx[0]
            tsx_name = tsx_path.name
        else:
            tsx_path = tsx_dir / tsx_name

        # Parse output into JSX block elements
        jsx_blocks = parse_expected_output(expected_output, code)

        # 11. Exit code line at the bottom
        exit_code = "0"
        if "FAILED:" in expected_output:
            if "Exit code 2 is mandatory" in expected_output:
                exit_code = "2"
            elif "Exit code 3 is mandatory" in expected_output:
                exit_code = "3"
            else:
                exit_code = "1"

        jsx_blocks.append(f'      <div className="mt-4 text-zinc-500 font-bold">exit {exit_code}</div>')

        # Construct full file code
        formatted_blocks = "\n".join(jsx_blocks)

        # Determine terminal title
        # e.g., zenzic check links or zenzic check security
        title = "zenzic check links"
        if code.startswith("Z2"):
            title = "zenzic check security"
        elif code.startswith("Z5") or code.startswith("Z6") or code.startswith("Z4") or code.startswith("Z3"):
            title = "zenzic check all"

        file_content = f"""// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function {tsx_path.stem}(): React.JSX.Element {{
  // REUSE-IgnoreStart
  return (
    <ZenzicTerminal title="{title}">
{formatted_blocks}
    </ZenzicTerminal>
  );
  // REUSE-IgnoreEnd
}}
"""
        tsx_path.write_text(file_content, encoding="utf-8")
        print(f"Compiled and updated {tsx_name} from {mdx_file.name}")

if __name__ == "__main__":
    main()
