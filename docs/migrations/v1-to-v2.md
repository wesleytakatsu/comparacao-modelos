# 🔄 Guia de Migração: Arquitetura v1 para Grafo Temporal v2

> Registro formal das mudanças estruturais conforme Seção 82 de `docs/prompts/09-prompt-layout.md`.

---

## 1. Visão Geral das Mudanças

A arquitetura do portal evoluiu de uma base relacional com números fixos (v1) para um **grafo temporal e metrológico determinístico** (v2).

| Aspecto | Arquitetura v1 (Legado) | Arquitetura v2 (Grafo Temporal) |
| :--- | :--- | :--- |
| **Modelagem de Execuções** | Scores de benchmark embutidos no objeto do modelo. | Entidade desacoplada `BenchmarkRun` com semente, harness, data e esforço. |
| **Afirmações Técnicas** | Prosa editorial com "líder", "campeão", etc. | Entidade formal `Claim` com ciclo de vida (`verified`, `superseded`) e chave de substituição. |
| **Configuração vs Modelo** | "Claude Fable Max" e "Claude Fable High" tratados como variantes informais. | Entidade formal `ModelConfiguration` com `effort`, `reasoningMode` e limites de tokens. |
| **Rotas de Disponibilização** | Campo descritivo de texto ou arrays soltos de planos. | Entidade formal `Offering` com `platformId`, `accessType` e multiplicadores de quota. |
| **Freshness Temporal** | Relógio fixo estático (`new Date('2026-09-03')`) gerando obsolescência automática. | Relógio dinâmico (`new Date()`) em runtime com suporte a injeção determinística `{ now: Date }` para testes. Status: `fresh`, `aging`, `stale`, `unknown`. |
| **Hardware Local** | Modelo de 120B concorrendo como "consumer" por falta de tipagem estrita. | 4 categorias canônicas (`consumer`, `workstation`, `multi_gpu`, `datacenter`) baseadas em campos numéricos (`minVramGb`, `gpuCount`). |
| **Linhagens & Genealogias** | Lista linear de nós conectada cegamente com setas. | Múltiplas trilhas evolutivas paralelas (`tracks`) isolando ramos sem cross-contamination (e.g. Sonnet vs Opus). |

---

## 2. Detalhamento Técnico

### A. Desacoplamento de `BenchmarkRun`
* **Antes**: `MULTI_BENCHMARK_LEDGER[modelId].cursorBenchMax = 73.4`
* **Depois**:
  ```javascript
  BENCHMARK_RUNS_DATA.push({
    runId: 'run-cb-fable-max-202608',
    modelId: 'claude-fable-5-1',
    benchmarkKey: 'cursorBench',
    score: 73.4,
    reasoningEffort: 'max',
    evidence: { provenanceTier: 'I', nature: 'M', sourceId: 'cursorbench' }
  });
  ```

### B. Ciclo de Vida de `Claim` e Substituição
* Quando um novo modelo supera uma afirmação existente, a afirmação anterior não é apagada; seu status é transicionado para `superseded` e aponta para o novo claim através de `supersededByClaimId`.

### C. Isolamento de Linhagens
* As famílias em `MODEL_HISTORY_DATA.lineages` foram modularizadas em `tracks`. O fluxo só conecta modelos que pertencem à mesma linhagem direta (e.g. `claude-sonnet-4-6` ➔ `claude-sonnet-5`).
