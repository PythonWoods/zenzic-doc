// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { CredentialTerminal } from '../ZenzicTerminal';

export default function Z201Credentials(): React.JSX.Element {
  return (
    <CredentialTerminal
      finding="Secret detected (aws-access-key) — rotate immediately."
      location="docs/setup.md:15"
      credential="AKIA************MPLE"
    />
  );
}
