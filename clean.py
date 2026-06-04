# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

import sys

def clean_file(path, ranges):
    with open(path, 'r') as f:
        lines = f.readlines()

    for start, end in sorted(ranges, reverse=True):
        del lines[start-1:end]

    with open(path, 'w') as f:
        f.writelines(lines)

ranges_to_delete = [(39, 64), (116, 118), (134, 185), (198, 200), (227, 228), (299, 307), (344, 347)]

# EN checks.mdx
clean_file('/home/pythonwoods/dev/PythonSandbox/zenzic-doc/docs/reference/checks.mdx', ranges_to_delete)

# IT checks.mdx
clean_file('/home/pythonwoods/dev/PythonSandbox/zenzic-doc/i18n/it/docusaurus-plugin-content-docs/current/reference/checks.mdx', ranges_to_delete)

print("Checks extraction completed successfully.")
