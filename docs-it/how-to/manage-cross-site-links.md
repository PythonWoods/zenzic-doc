---
sidebar_label: "Gestire Link Cross-Sito"
sidebar_position: 50
description: "Come tenere felice Z105 ABSOLUTE_PATH quando la documentazione attraversa più istanze Zensical o siti satellite — e quando invece ricorrere agli ignore inline."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Gestire Link Cross-Sito

Quando il tuo progetto ospita più di un'istanza Zensical sotto lo stesso
dominio (per esempio un'area Utente in `/docs/` e un'area Developer in
`/developers/`), i link che attraversano i confini delle istanze
**devono usare URL link** (root-relative `/developers/…` o URL completo)
invece di path file Markdown relativi. Zensical non risolve i path
file relativi attraverso i confini dei plugin — e nemmeno il validator
dei link di Zenzic.

Per impostazione predefinita, la regola `Z105 ABSOLUTE_PATH` di Zenzic
rifiuta qualsiasi link assoluto (`/foo/bar`) perché i path assoluti si
rompono quando il sito è ospitato in una sottocartella. Questa guida
mostra come dichiarare i prefissi cross-istanza che il tuo progetto
possiede legittimamente, in modo che il validator smetta di segnalarli
— senza indebolire Z105 altrove.

---

## TL;DR — Quale strumento, quando?

| Situazione | Usa questo | Non usare |
|---|---|---|
| Una singola riga isolata in un file matcha legittimamente una regola | `<!-- zenzic:ignore: Zxxx -->` (oppure `<!-- zenzic:ignore: Zxxx -->` per MDX) | — |
| Più link cross-plugin in file diversi | Ignore inline — uno per link | — |

La regola decisionale: **se è una proprietà di una riga, va inline.**

---

## Correlati

- [Politica di Soppressione](../reference/suppression-policy.md) — Riferimento completo per tutti i livelli di soppressione.
