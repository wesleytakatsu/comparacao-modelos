# PROMPT 10 — GPT-6 ASTRA: DOSSIÊ TÉCNICO, BENCHMARKS POR EFFORT, CUSTOS, PLANOS, COTAS, SAFETY E INTEGRAÇÃO COMPLETA

> Snapshot de pesquisa: **04/09/2026 — BRT**  
> Modelo canônico: **GPT-6 Astra**  
> Model ID: **`gpt-6-astra`**  
> Provider: **OpenAI**  
> Release pública: **03/09/2026**  
> Objetivo deste documento: servir como **prompt normativo de implementação** para integrar GPT-6 Astra ao Portal de Inteligência de Modelos de IA com o maior nível de detalhe disponível, preservando provenance, versões de benchmark, reasoning effort, harness, surface, plano, cota, custo e incerteza.

---

# 0. PAPEL DO AGENTE

Você é um **engenheiro de software sênior, engenheiro de dados de benchmarks, especialista em LLM evaluation, pricing, subscription metering, OpenAI API e UX de sistemas densos em evidências**.

Sua missão é implementar **GPT-6 Astra** no projeto:

- Site: `https://wesleytakatsu.github.io/comparacao-modelos/`
- Repositório: `https://github.com/wesleytakatsu/comparacao-modelos`
- Branch alvo: `main`

O portal já possui uma arquitetura de domínio v2 com:

- `DomainRankings`
- `DomainEvidence`
- `DomainFreshness`
- `DomainEntities`
- `DomainRegistry`
- `DomainClaims`
- `DomainComparison`
- `DomainHealth`
- `DomainImpact`

Além disso, o projeto já possui:

- dossiers de modelos;
- dossiers de planos;
- dossiers de providers/plataformas;
- Data Health;
- Impact Engine;
- histórico temporal;
- benchmark registry;
- source registries;
- use cases com ranking derivado;
- comparador multidimensional;
- planos com `modelAccess` separado por surface;
- provenance e evidence tiers.

**NÃO crie uma arquitetura paralela.**

Antes de editar qualquer arquivo:

1. leia o `main` atual;
2. leia `docs/prompts/09-prompt-layout.md`;
3. leia `data/domain.js` integralmente;
4. leia `data/dossiers.js`;
5. leia os registros atuais de OpenAI em `data.js`;
6. leia os planos OpenAI em `data/plans.js`;
7. leia `data/history.js`;
8. leia `data/use-cases.js`;
9. leia `data/plan-dossier.js`;
10. leia `data/entity-views.js`;
11. leia os testes em `scripts/`;
12. só então implemente.

A regra de precedência é:

> **Código atual > documentação histórica > exemplos deste prompt.**

Se o schema atual tiver evoluído desde este documento, adapte os dados ao schema real em vez de reintroduzir versões antigas.

---

# 1. REGRA CRÍTICA DE VERIFICAÇÃO

GPT-6 Astra acabou de ser lançado e vários dados ainda estão mudando rapidamente.

Antes de escrever os números finais no dataset:

1. reabra todas as fontes primárias listadas neste documento;
2. confira se os dados mudaram desde 04/09/2026;
3. use a informação mais recente da fonte primária;
4. registre a data real em `verifiedAt` / `retrievedAt`;
5. preserve snapshots históricos quando o valor mudou;
6. não sobrescreva silenciosamente um resultado antigo de outra versão/harness;
7. qualquer número que não puder ser revalidado deve ser marcado como `needs-review`, `estimated`, `mirror` ou equivalente.

Não transforme este documento em fonte primária.

Ele é um **mapa de implementação e snapshot de pesquisa**.

---

# 2. PRINCÍPIO METROLÓGICO

Toda métrica deve responder:

- Qual modelo?
- Qual configuração de reasoning?
- Qual versão do benchmark?
- Qual harness?
- Qual agente?
- Quantas tarefas?
- Quantos trials?
- Qual score?
- Qual intervalo de confiança?
- Qual custo?
- Quantos tokens?
- Qual data?
- Qual fonte?
- É oficial, independente ou mirror?
- É medido, derivado, calibrado ou anedótico?

Nunca reduzir uma execução a algo como:

```js
model.arcAgi3 = 99.9;
```

quando o dado correto é algo como:

```text
GPT-6 Astra
reasoning: high
ARC-AGI-3
Provider Adapter harness
99.95%
```

Outro exemplo:

```text
GPT-6 Astra
reasoning: max
ARC-AGI-3
Standard harness
62.71%
```

Esses dois números são corretos, mas descrevem **execuções diferentes**.

---

# 3. MODELO CANÔNICO — NÃO DUPLICAR GPT-6 PRO

Existe **um único modelo canônico**:

```text
gpt-6-astra
```

Nome:

```text
GPT-6 Astra
```

No ChatGPT, ele aparece como:

```text
GPT-6 Pro
```

**GPT-6 Pro NÃO deve ser criado como um segundo modelo no catálogo.**

Trate GPT-6 Pro como:

- product offering;
- surface alias;
- display name;
- entitlement de ChatGPT;
- ou entidade equivalente ao schema atual.

Conceitualmente:

```js
{
  id: 'chatgpt:gpt-6-pro',
  displayName: 'GPT-6 Pro',
  modelId: 'gpt-6-astra',
  surface: 'chatgpt-chat'
}
```

Não criar:

```text
gpt-6-pro
```

como `AI_MODELS_DATA` independente, a menos que uma futura fonte oficial confirme que se tornou um modelo tecnicamente separado.

---

# 4. IDENTIDADE CANÔNICA

Cadastrar no catálogo principal:

| Campo | Valor |
|---|---|
| ID canônico | `gpt-6-astra` |
| Nome | GPT-6 Astra |
| Família | GPT-6 |
| Provider | OpenAI |
| Release date | 2026-09-03 |
| Status | active / rollout conforme schema |
| API model ID | `gpt-6-astra` |
| ChatGPT product name | GPT-6 Pro |
| Open weights | false |
| License | Proprietary OpenAI |
| Context window | **1,050,000 tokens** |
| Max output | **128,000 tokens** |
| Knowledge cutoff | **2026-04-30** |
| Reasoning | true |
| Public API efforts | low, medium, high, xhigh, max |
| Text input | sim |
| Text output | sim |
| Image input | sim |
| Image output nativo | não |
| Audio input/output | não suportado |
| Video input/output | não suportado |
| Fine-tuning | não suportado atualmente |
| Streaming | sim |
| Function calling | sim |
| Structured outputs | sim |
| Local inference | não |
| Parameters | não divulgados |
| Architecture | não divulgada publicamente em detalhe |

Não inventar:

- número de parâmetros;
- MoE/dense;
- número de experts;
- tamanho de active params;
- topologia de treinamento;
- hardware de treinamento;
- quantização;
- VRAM local.

Se não houver fonte oficial:

```text
N/D — não divulgado
```

---

# 5. FONTES PRIMÁRIAS E REGISTRY

Adicionar/atualizar fontes canônicas equivalentes às seguintes.

## 5.1 OpenAI — API model card

Suggested source ID:

```text
openai-gpt6-astra-api
```

URL:

`https://developers.openai.com/api/docs/models/gpt-6-astra`

Usar para:

- model ID;
- context;
- output;
- cutoff;
- reasoning efforts;
- pricing;
- modalities;
- rate limits;
- Responses tools;
- feature support;
- current snapshots/aliases.

---

## 5.2 OpenAI — Model Guidance

Suggested source ID:

```text
openai-gpt6-astra-guide
```

URL:

`https://developers.openai.com/api/docs/guides/latest-model`

Usar para:

- async tool calling;
- mid-turn steering;
- configuration updates;
- changing reasoning effort mid-conversation;
- cache-preserving migration;
- prompt guidance;
- unsupported parameters;
- behavioral guidance;
- Responses API recommendations;
- Fast mode caveats.

---

## 5.3 OpenAI — Release article

Suggested source ID:

```text
openai-gpt6-astra-launch
```

URL:

`https://openai.com/index/gpt-6-astra/`

Usar para:

- release date;
- rollout;
- official benchmark table;
- official comparisons;
- efficiency claims;
- computer use;
- science;
- professional work;
- cybersecurity;
- long context;
- official interpretation.

---

## 5.4 OpenAI — GPT-6 Pro in ChatGPT

Suggested source ID:

```text
openai-gpt6-pro-chat-limits
```

URL:

`https://help.openai.com/en/articles/20001354-gpt-56-and-gpt-6-pro-in-chatgpt`

Usar para:

- GPT-6 Pro = Astra in Chat;
- ChatGPT plan availability;
- Pro $100 / $200 limits;
- Business Standard / Premium limits;
- Plus exclusion from GPT-6 Pro Chat;
- fallback behavior.

---

## 5.5 OpenAI — Work & Codex

Suggested source ID:

```text
openai-gpt6-astra-work-codex
```

URL:

`https://help.openai.com/en/articles/20001275`

Usar para:

- Work/Codex rollout;
- included allowance behavior;
- Plus limited Astra allowance;
- Pro full existing allowance;
- Business Standard limited allowance;
- Business Premium full existing allowance;
- relationship between ChatGPT plan billing and API key billing.

---

## 5.6 OpenAI — Business model limits

Suggested source ID:

```text
openai-business-astra-limits
```

URL:

`https://help.openai.com/en/articles/12003714-chatgpt-team-models-limits`

Usar para:

- local-message estimates;
- Business Standard vs Premium;
- Work/Codex usage notes;
- Astra/Sol/Terra/Luna comparative allowance.

---

## 5.7 OpenAI — Credit Rate Card

Suggested source ID:

```text
openai-chatgpt-credit-rate-card
```

URL:

`https://help.openai.com/en/articles/11481834-chatgpt-rate-card`

Usar para:

- credit metering;
- actual-token charging;
- Work/Codex credits;
- model token credit rates;
- Fast-mode Work/Codex multipliers;
- shared agentic usage pool.

---

## 5.8 OpenAI — Enterprise USD token rate card

Suggested source ID:

```text
openai-enterprise-token-rate-card
```

URL:

`https://help.openai.com/en/articles/20001415-chatgpt-rate-card-enterprise-token-based-pricing`

Usar para:

- token-based enterprise pricing;
- Astra vs Sol/Terra/Luna direct rate comparison.

---

## 5.9 OpenAI — Safety overview

Suggested source ID:

```text
openai-gpt6-astra-safety-overview
```

URL:

`https://openai.com/index/safety-overview-gpt-6-astra/`

---

## 5.10 OpenAI — System card

Suggested source ID:

```text
openai-gpt6-astra-system-card
```

URL:

`https://deploymentsafety.openai.com/gpt-6-astra/vision`

Usar para:

- Preparedness classification;
- health;
- prompt-injection robustness;
- alignment;
- monitorability;
- workplace safety;
- external evals.

---

## 5.11 Artificial Analysis — Astra release

Suggested source ID:

```text
aa-gpt6-astra-v411
```

URL:

`https://artificialanalysis.ai/models/releases/gpt-6-astra`

Usar para:

- Intelligence Index v4.1.1 by effort;
- cost per Intelligence Index task;
- Non-reasoning evaluation-only record;
- speed = N/D currently.

---

## 5.12 Artificial Analysis — Index v4.2

Suggested source ID:

```text
aa-index-v42-20260904
```

URL:

`https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-2`

Usar para:

- version transition;
- AA-Briefcase;
- GDP.pdf;
- index methodology changes;
- current qualitative rank position.

---

## 5.13 DeepSWE primary

Suggested source ID:

```text
deep-swe-v11-20260903
```

URL:

`https://deepswe.datacurve.ai/`

---

## 5.14 DeepSWE mirror for full effort table

Suggested source ID:

```text
benchsift-deepswe-20260903
```

URL:

`https://benchsift.nxtaigen.com/benchmarks/deepswe`

Classificar como:

```text
independent-mirror
```

Nunca dar a ele prioridade sobre o leaderboard primário.

---

## 5.15 ARC Prize

Suggested source ID:

```text
arcprize-gpt6-astra-20260902
```

URL:

`https://arcprize.org/results/openai-gpt-6-astra`

---

## 5.16 Terminal-Bench Science

Suggested source ID:

```text
snorkel-terminal-bench-science-01
```

URL:

`https://snorkel.ai/leaderboard/terminal-bench-science/`

---

## 5.17 Terminal-Bench 4 mirror

Suggested source ID:

```text
benchlm-terminal-bench-4-20260903
```

URL:

`https://benchlm.ai/benchmarks/terminal-bench-4`

Classificar como:

```text
independent-mirror
```

Se houver leaderboard primário de Terminal-Bench 4.0 disponível no momento da implementação, preferi-lo.

---

# 6. CONFIGURAÇÕES DE REASONING

Criar ou reutilizar o schema atual de configuração para representar exatamente:

```text
low
medium
high
xhigh
max
```

Não criar `none` como configuração pública da API.

Artificial Analysis possui um run denominado:

```text
GPT-6 Astra (Non-reasoning)
```

Esse run deve ser armazenado como:

```text
evaluation-only
```

ou equivalente.

O portal deve deixar explícito:

> A API pública do GPT-6 Astra não lista `none`; o registro Non-reasoning é uma configuração específica da avaliação da Artificial Analysis.

---

# 7. REASONING NÃO É MONOTÔNICO

O dossiê deve destacar que maior effort **não garante melhor resultado em todos os benchmarks**.

Exemplos observados:

- DeepSWE: `xhigh` 74.1% > `max` 73.2%.
- Terminal-Bench 4: `high` 57.88% = `xhigh` 57.88%, enquanto `max` chega apenas a 58.18% com custo muito maior.
- Terminal-Bench Science: `high` 62.0% > `xhigh` 60.9%.
- ARC-AGI-3 Provider Adapter: `high` 99.95% > `max` 98.55%.
- ARC-AGI-1: high/xhigh 98.5% > max 97.5%.

Isso deve ser uma conclusão **D — Derived**, não uma afirmação oficial da OpenAI.

---

# 8. API PRICING — STANDARD

Valores oficiais por 1M tokens:

| Tipo | GPT-6 Astra |
|---|---:|
| Input | **US$ 10.00** |
| Cached input | **US$ 1.00** |
| Cache write | **US$ 12.50** |
| Output | **US$ 50.00** |

Observações:

- Cached input representa desconto de 90% sobre input padrão.
- Cache write custa 1.25× o input uncached.
- Output custa 5× input.
- O modelo é significativamente mais caro por token que GPT-5.6 Sol.

---

# 9. API PRICING — LONG CONTEXT >272K INPUT

Para prompts com **mais de 272.000 tokens de input**, a requisição inteira recebe:

- 2× preço de input;
- 2× preço de cache;
- 1.5× preço de output.

Tabela efetiva Standard:

| Tipo | <=272K input | >272K input |
|---|---:|---:|
| Input | $10.00 | **$20.00** |
| Cached input | $1.00 | **$2.00** |
| Cache write | $12.50 | **$25.00** |
| Output | $50.00 | **$75.00** |

Não aplicar o multiplicador apenas aos tokens que excedem 272K.

A documentação informa que ele vale para a **requisição inteira**.

---

# 10. API PRICING — BATCH E FLEX

Batch e Flex:

```text
50% do Standard aplicável
```

Tabela para request <=272K input:

| Tipo | Batch / Flex |
|---|---:|
| Input | $5.00 |
| Cached input | $0.50 |
| Cache write | $6.25 |
| Output | $25.00 |

Se o prompt ultrapassar 272K, aplicar primeiro a regra de long context e depois a redução correspondente conforme documentação vigente.

Revalidar a ordem operacional no momento da implementação.

---

# 11. API PRICING — FAST

Fast API:

```text
2× a tarifa aplicável
```

Tabela <=272K:

| Tipo | Fast API |
|---|---:|
| Input | $20.00 |
| Cached input | $2.00 |
| Cache write | $25.00 |
| Output | $100.00 |

Não confundir com o multiplicador de **2.5×** usado em determinadas superfícies de Work/Codex cobradas por créditos.

São sistemas de billing diferentes.

---

# 12. FAST — CAVEAT DE RESIDÊNCIA DE DADOS

A documentação de Model Guidance deve ser revalidada para a regra atual.

No snapshot desta pesquisa:

> Fast mode não estava disponível para GPT-6 Astra quando usado com configuração de residência de dados na União Europeia.

Registrar como constraint de offering/API, não como limitação inerente ao modelo.

Não afirmar que usuários localizados na UE não podem usar Astra.

**Localização do usuário != inference/data residency.**

---

# 13. COMPARAÇÃO NOMINAL DE PREÇO COM GPT-5.6

Preços token-based atuais:

| Modelo | Input | Cached | Output |
|---|---:|---:|---:|
| GPT-6 Astra | $10.00 | $1.00 | $50.00 |
| GPT-5.6 Sol | $4.00 | $0.40 | $20.00 |
| GPT-5.6 Terra | $2.00 | $0.20 | $12.00 |
| GPT-5.6 Luna | $0.20 | $0.02 | $1.20 |

Ratios nominais:

### Astra vs Sol

```text
Input: 2.5×
Cached: 2.5×
Output: 2.5×
```

### Astra vs Terra

```text
Input: 5×
Cached: 5×
Output: 4.1667×
```

### Astra vs Luna

```text
Input: 50×
Cached: 50×
Output: 41.6667×
```

Mostrar como:

```text
D — Derived from official pricing
```

---

# 14. NÃO CONFUNDIR PREÇO POR TOKEN COM CUSTO POR TAREFA

Esse é um dos pontos centrais do modelo.

Astra é premium por token, mas diversos benchmarks mostram forte redução no número de tokens ou ações necessários.

Por isso o dossiê precisa separar:

- `$ / MTok`;
- `$ / task`;
- `$ / solved task`;
- tokens/task;
- steps/task;
- elapsed time/task.

Não usar apenas uma badge `CARO` ou `BARATO`.

---

# 15. RATE LIMITS DA API

Snapshot oficial:

| Tier | RPM | TPM | Batch queue |
|---|---:|---:|---:|
| Free | não suportado | — | — |
| Tier 1 | 500 | 500,000 | 1,500,000 |
| Tier 2 | 5,000 | 1,000,000 | 3,000,000 |
| Tier 3 | 5,000 | 2,000,000 | 100,000,000 |
| Tier 4 | 10,000 | 4,000,000 | 200,000,000 |
| Tier 5 | 15,000 | 40,000,000 | 15,000,000,000 |

Revalidar antes do commit final.

---

# 16. ENDPOINTS E CAPABILITIES

Usar a página Compare Models como fonte preferencial para endpoints de inferência principais.

No snapshot atual:

- Chat Completions;
- Responses;
- Batch.

A model card detalhada pode render uma lista global de endpoints do produto; não confundir uma lista de endpoints da plataforma com suporte funcional real do modelo.

Features explicitamente suportadas:

- Streaming;
- Function calling;
- Structured outputs;
- Image input.

Fine-tuning:

```text
não suportado
```

---

# 17. RESPONSES API — TOOLS

A documentação oficial lista suporte a:

- Web Search;
- File Search;
- Image Generation tool;
- Code Interpreter;
- Hosted Shell;
- Apply Patch;
- Skills;
- Computer Use;
- MCP;
- Tool Search.

Exibir isso no dossiê em seção de Developer Capabilities.

Não interpretar `Image Generation tool` como output multimodal nativo do modelo.

O model card ainda descreve a modalidade nativa como:

```text
image input only
text output
```

---

# 18. ASYNC TOOL CALLING

Astra introduz suporte documentado para **async tool calling**.

Conceito:

- marcar function/custom tool com `async: true`;
- Astra pode continuar raciocinando;
- pode chamar outras tools;
- pode responder partes independentes da solicitação;
- aplicação continua executando o trabalho externo;
- resultado posterior deve ser associado ao `call_id` original.

Adicionar ao dossier:

```text
Async tool calling: supported
```

Classificar como developer capability oficial.

---

# 19. MID-TURN STEERING

Astra suporta orientação adicional enquanto a execução ainda está acontecendo.

O usuário/aplicação pode enviar:

- correções;
- mudança de requisitos;
- novas restrições;
- prioridade nova;

sem necessariamente descartar todo o trabalho da execução em progresso.

Adicionar:

```text
Mid-turn steering: supported
```

Isso é particularmente relevante para:

- agentes long-running;
- coding;
- research;
- computer use;
- workflows profissionais.

---

# 20. ALTERAR REASONING MID-CONVERSATION

A documentação descreve `configuration_update` ou mecanismo equivalente para alterar reasoning effort durante a conversa.

Objetivo:

- mudar esforço sem reiniciar toda a conversa;
- preservar cache/prefixo quando possível;
- manter contexto de trabalho.

Adicionar essa capacidade ao dossier e, se o schema permitir, à matriz de capabilities.

---

# 21. PARÂMETROS NÃO SUPORTADOS / MIGRATION NOTES

Ao migrar para Astra, a documentação orienta revisar parâmetros como:

- `temperature`;
- `top_p`;
- `top_logprobs`;
- `logprobs` em determinados endpoints;
- includes antigos relacionados a output-text logprobs.

Não copiar configurações antigas de GPT-4/GPT-5 automaticamente.

Também auditar prompt caching:

- configurações antigas de `prompt_cache_retention` podem ter sido substituídas;
- guidance atual usa opções de cache com TTL, incluindo exemplo de `30m`.

Registrar no dossier em “Migration / Integration Notes”.

---

# 22. ARTIFICIAL ANALYSIS — V4.1.1 POR EFFORT

Manter v4.1.1 como snapshot histórico/versionado.

Tabela atual conhecida:

| Effort | AA Intelligence Index v4.1.1 | Cost / Intelligence task |
|---|---:|---:|
| Low | **57** | **$0.46** |
| Medium | **59** | **$0.75** |
| High | **60** | **$0.96** |
| XHigh | **61** | **$1.20** |
| Max | **61** | **$1.67** |
| Non-reasoning | **55** | **$0.93** |

Importantíssimo:

- `Non-reasoning` = evaluation-only;
- não adicionar `none` aos public API efforts;
- speed/output tok/s está como **N/D** no leaderboard atual;
- não inventar throughput.

Artificial Analysis apresenta preço blended de aproximadamente:

```text
$7.70 / 1M tokens
```

para sua cesta metodológica.

Esse valor não substitui a tarifa API input/output.

---

# 23. AA V4.1.1 — DERIVED EFFICIENCY

### Max vs XHigh

```text
Index: 61 vs 61
Cost/task: $1.67 vs $1.20
```

Max custa aproximadamente:

```text
+39.2%
```

por task e não aumenta o índice arredondado.

Classificar a conclusão:

```text
D — Derived
```

Não afirmar que Max nunca é útil.

Apenas afirmar que **neste benchmark/version snapshot** XHigh domina Max em score arredondado vs custo.

---

# 24. ARTIFICIAL ANALYSIS — V4.2 LANÇADO EM 04/09/2026

Não sobrescrever v4.1.1.

Criar uma nova versão do benchmark.

Mudanças documentadas no v4.2:

- adiciona **AA-Briefcase**;
- adiciona **Surge GDP.pdf**;
- remove **GPQA Diamond** do índice agregado por saturação;
- aumenta peso de private held-out tests;
- aproximadamente 40% do índice passa a usar held-out private data;
- atualiza grading infrastructure;
- ajusta AA-LCR;
- melhora sampling / re-anchoring em GDPval-AA e AA-Briefcase;
- melhora sandboxes de SciCode.

Resultados qualitativos atuais:

- Claude Fable 5.1 lidera o índice;
- GPT-6 Astra vem em segundo;
- Astra mostra ganho de aproximadamente **4 pontos sobre GPT-5.6 Sol** sob v4.2;
- Astra domina a fronteira de eficiência de output tokens entre quase todos os modelos próximos da fronteira de inteligência.

Não deduzir um score absoluto de Astra v4.2 apenas desse delta.

**Antes de implementar o headline v4.2, abrir o leaderboard e capturar o valor exato por configuração.**

Se não estiver exposto em texto estruturado:

```text
Index v4.2: N/D exato — rank #2 confirmado
```

até haver fonte verificável.

---

# 25. AA-BRIEFCASE

Segundo o artigo v4.2:

- Claude Fable 5.1 e Claude Opus 5 lideram;
- GPT-6 Astra vem logo depois;
- Astra melhora aproximadamente **85 Elo** sobre GPT-5.6 Sol.

Não transformar o delta em um Elo absoluto inventado.

Registrar:

```text
deltaVsSolElo: ~85
```

com sourceId do artigo v4.2.

---

# 26. GDP.PDF

Artificial Analysis v4.2 reporta:

| Modelo | GDP.pdf |
|---|---:|
| GPT-6 Astra | **33.2%** |
| GPT-5.6 Sol | 28.2% |
| Claude Fable 5.1 | 26.2% |

GDP.pdf:

- 100 PDFs;
- 10 domínios;
- 4,592 páginas;
- 1,275 critérios atômicos;
- All-pass Rate exige satisfazer todos os critérios da tarefa.

Adicionar ao benchmark registry se ainda não existir.

---

# 27. AA CODING AGENT INDEX — CUIDADO COM HARNESS

O article/release da OpenAI mostra:

```text
Artificial Analysis Coding Agent Index v1.4: 67.0
```

E análises independentes da AA mostram forte eficiência de tokens de Astra.

Não misturar:

- AA Coding Agent Index;
- DataCurve DeepSWE;
- Terminal-Bench 4;
- DeepSWE component interno usado pela AA.

Mesmo que nomes de subbenchmarks se pareçam, são **runs/harnesses diferentes**.

Se importar detalhes do Coding Agent Index, armazenar `agent: Codex` explicitamente.

---

# 28. DEEPSWE V1.1 — METODOLOGIA

Snapshot:

- 113 tasks;
- mini-swe-agent para todos os modelos;
- original software-engineering tasks;
- 91 repositories;
- múltiplas linguagens;
- program-based verifiers;
- 4 runs nas configurações Astra exibidas pelo mirror.

Não comparar com outros resultados chamados “DeepSWE” se harness/version diferirem.

---

# 29. DEEPSWE V1.1 — TODOS OS EFFORTS ASTRA

| Effort | pass@1 | 95% CI | pass@4 | Cost | Time | Output | Input |
|---|---:|---:|---:|---:|---:|---:|---:|
| Low | **67.0%** | 65.7–68.3 | 79.6% | **$2.19** | 10m13s | 11K | 495K |
| Medium | **72.8%** | 70.2–75.4 | **82.3%** | **$4.38** | 14m44s | 20K | 1.0M |
| High | **73.2%** | 69.8–76.7 | **82.3%** | **$5.72** | 17m19s | 27K | 1.3M |
| XHigh | **74.1%** | 71.2–77.0 | 80.5% | **$6.52** | 18m52s | 30K | 1.5M |
| Max | **73.2%** | 72.4–74.1 | 79.6% | **$12.37** | 33m03s | 61K | 2.2M |

Preferência de fonte:

1. DataCurve primary leaderboard;
2. BenchSift mirror para detalhes de rows não expostos no parser primário;
3. se houver divergência, preservar snapshots e priorizar o primário.

---

# 30. DEEPSWE — INTERPRETAÇÃO DERIVADA

### Melhor pass@1

```text
XHigh — 74.1%
```

### Melhor pass@4 entre Astra rows

```text
Medium / High — 82.3%
```

### Max vs XHigh

```text
Score: 73.2 vs 74.1
Cost: $12.37 vs $6.52
```

Max custa aproximadamente:

```text
+89.7%
```

com pass@1 0.9 p.p. menor.

Os intervalos de confiança sobrepõem-se.

Portanto não afirmar superioridade estatística forte de XHigh sobre Max.

A conclusão segura:

> XHigh apresenta o melhor ponto observado de pass@1 e custo muito menor que Max neste snapshot.

---

# 31. DEEPSWE — COMPARAÇÃO COM SOL

Snapshot do mirror:

```text
GPT-5.6 Sol max
pass@1 72.7%
$8.39/task
60K output
7.9M input
```

Snapshot primário pode exibir custo diferente conforme atualização/metodologia.

Por isso:

- não congelar `$8.39` como verdade universal;
- guardar source/harness/date;
- usar primary current para comparação principal;
- usar mirror como snapshot histórico quando necessário.

Astra XHigh:

```text
74.1%
30K output
1.5M input
```

Isso mostra eficiência de token muito alta, mas a comparação precisa carregar a mesma versão/harness.

---

# 32. TERMINAL-BENCH 4.0 — METODOLOGIA

Current public mirror snapshot:

- 66 professional computer-work tasks;
- 5 trials/task;
- 330 executions por configuração;
- timeout de até 8 horas;
- model + agent system;
- Astra usa **Codex**;
- versão 4.0 possui breaking changes;
- NÃO comparar numericamente 4.0 como se fosse a mesma escala de 3.0/2.x.

---

# 33. TERMINAL-BENCH 4.0 — TODOS OS EFFORTS

| Effort | Tasks completed | Solved / 330 | Total cost | Cost / solved |
|---|---:|---:|---:|---:|
| Low | **50.61%** | 167 | $1,557.30 | **$9.33** |
| Medium | **54.24%** | 179 | $1,914.80 | **$10.70** |
| High | **57.88%** | 191 | $2,269.42 | **$11.88** |
| XHigh | **57.88%** | 191 | $2,350.51 | **$12.31** |
| Max | **58.18%** | 192 | $3,267.18 | **$17.02** |

O mirror atualmente confirma scores públicos:

```text
max 58.18
xhigh 57.88
high 57.88
medium 54.24
low 50.61
```

Os custos detalhados devem ser revalidados na fonte operacional antes do commit.

---

# 34. TERMINAL-BENCH 4 — SWEET SPOT DERIVADO

High vs XHigh:

```text
Mesmo score: 57.88%
High tem custo menor.
```

Logo High domina XHigh nesse snapshot.

High vs Max:

```text
57.88% vs 58.18%
$11.88/solved vs $17.02/solved
```

Max ganha apenas:

```text
+0.30 p.p.
```

por aproximadamente:

```text
+43.3% cost/solved
```

Não declarar a diferença de score como estatisticamente relevante sem consultar CI.

Dossier recommendation:

```text
Terminal-Bench 4 Sweet Spot: High
Evidence type: D — Derived
```

---

# 35. TERMINAL-BENCH 4 — ASTRA VS SOL

Current mirror:

```text
GPT-5.6 Sol max
37.27%
```

Astra High:

```text
57.88%
```

Astra Max:

```text
58.18%
```

A OpenAI release reporta aproximadamente:

- Astra ~9% menor estimated API cost/task que Sol no setting usado no lançamento;
- Astra ~63% menor estimated API cost/task que Claude Fable 5.1 no setting comparado.

Esses percentuais são **vendor-reported derived economics**, não benchmark-independent pricing facts.

Guardar como claims separados.

---

# 36. TERMINAL-BENCH SCIENCE 0.1 — METODOLOGIA

Fonte: Snorkel AI.

- 70 tasks;
- 5 science domains;
- workflows baseados em trabalho real de pesquisadores;
- agent para Astra: Codex.

O benchmark é especialmente importante para Astra porque mostra salto muito grande sobre a geração anterior.

---

# 37. TERMINAL-BENCH SCIENCE — OVERALL POR EFFORT

| Effort | Resolution | CI | Tokens | Total cost |
|---|---:|---:|---:|---:|
| Low | **55.4%** | ±2.7 | 2.2B | **$3.80K** |
| Medium | **57.4%** | ±2.6 | 2.3B | **$4.12K** |
| High | **62.0%** | ±2.6 | 2.7B | **$4.98K** |
| XHigh | **60.9%** | ±2.6 | 2.9B | **$5.28K** |
| Max | **65.4%** | ±2.5 | 4.1B | **$8.72K** |

Comparadores:

| Modelo | Score |
|---|---:|
| Claude Opus 5 max | 30.0% |
| GPT-5.6 Sol max | 22.4% |
| Claude Fable 5 max | 21.4% |
| Gemini 3.8 Flash high | 12.4% |
| GPT-5.6 Terra max | 8.6% |
| GPT-5.6 Luna max | 3.3% |

---

# 38. TB SCIENCE — LIFE SCIENCES

| Effort | Score | CI | Tokens | Cost |
|---|---:|---:|---:|---:|
| Low | 54.7% | ±5.1 | 552.9M | $922.61 |
| Medium | 56.8% | ±5.1 | 616.5M | $1.06K |
| High | 58.9% | ±5.0 | 755.6M | $1.35K |
| XHigh | 62.1% | ±5.0 | 882.9M | $1.49K |
| Max | **64.2%** | ±4.9 | 1.1B | $2.10K |

---

# 39. TB SCIENCE — PHYSICAL SCIENCES

| Effort | Score | CI | Tokens | Cost |
|---|---:|---:|---:|---:|
| Low | **58.8%** | ±5.3 | 571.7M | $978.09 |
| Medium | 52.9% | ±5.4 | 607.1M | $1.08K |
| High | 57.6% | ±5.4 | 621.0M | $1.18K |
| XHigh | 50.6% | ±5.4 | 644.0M | $1.23K |
| Max | **60.0%** | ±5.3 | 837.7M | $1.80K |

Essa tabela reforça que effort não é monotônico.

---

# 40. TB SCIENCE — EARTH SCIENCES

| Effort | Score | CI | Tokens | Cost |
|---|---:|---:|---:|---:|
| Low | 52.5% | ±7.9 | 410.4M | $763.18 |
| Medium | 62.5% | ±7.7 | 447.9M | $799.71 |
| High | 70.0% | ±7.2 | 485.5M | $915.66 |
| XHigh | 67.5% | ±7.4 | 476.4M | $847.99 |
| Max | **77.5%** | ±6.6 | 576.5M | $1.23K |

---

# 41. TB SCIENCE — ENGINEERING SCIENCES

| Effort | Score | CI | Tokens | Cost |
|---|---:|---:|---:|---:|
| Low | 48.9% | ±7.5 | 249.9M | $450.32 |
| Medium | **55.6%** | ±7.4 | 252.7M | **$462.71** |
| High | **55.6%** | ±7.4 | 314.9M | $596.93 |
| XHigh | **55.6%** | ±7.4 | 367.7M | $724.67 |
| Max | 51.1% | ±7.5 | 579.1M | $1.33K |

Esse é um exemplo forte onde Max não é a melhor configuração observada.

Medium domina High/XHigh em score empatado vs custo no snapshot.

---

# 42. TB SCIENCE — MATHEMATICAL SCIENCES

| Effort | Score | CI | Tokens | Cost |
|---|---:|---:|---:|---:|
| Low | 57.6% | ±5.4 | 381.9M | $683.37 |
| Medium | 61.2% | ±5.3 | 385.7M | $717.40 |
| High | 69.4% | ±5.0 | 512.5M | $939.62 |
| XHigh | 69.4% | ±5.0 | 502.1M | $983.38 |
| Max | **74.1%** | ±4.8 | 1.1B | $2.26K |

---

# 43. TB SCIENCE — ECONOMICS DERIVED

Overall High vs Max:

```text
Score: 62.0 -> 65.4 (+3.4 pp)
Cost: $4.98K -> $8.72K
```

Max custa aproximadamente:

```text
+75%
```

para +3.4 p.p.

High vs XHigh:

```text
High: 62.0, $4.98K
XHigh: 60.9, $5.28K
```

High domina XHigh no snapshot overall.

---

# 44. ARC-AGI — DOIS HARNESSES OBRIGATÓRIOS

ARC Prize publica dois regimes distintos:

### Standard Harness

Permite que o modelo mantenha notas que ele escolhe carregar ao longo do ambiente.

### Provider Adapter Harness

Preserva reasoning state opaco entre requests e usa compaction em conversas longas.

Nunca misturar os dois.

---

# 45. ARC-AGI — VERIFIED SCORES POR EFFORT

| Effort | ARC-AGI-1 | ARC-AGI-2 | ARC-AGI-3 Standard | ARC-AGI-3 Provider Adapter |
|---|---:|---:|---:|---:|
| Low | **96.5%** | **85.4%** | **17.45%** | **98.03%** |
| Medium | **97.5%** | **92.1%** | **38.59%** | **98.44%** |
| High | **98.5%** | **92.1%** | **54.82%** | **99.95%** |
| XHigh | **98.5%** | **93.3%** | **59.34%** | **98.44%** |
| Max | **97.5%** | **95.0%** | **62.71%** | **98.55%** |
| None* | 86.0% | 59.6% | 35.18% | 96.72% |

`None*` = evaluation-only, não public API effort.

---

# 46. ARC-AGI-3 — HEADLINE CORRETO

A headline da OpenAI:

```text
99.9%
```

corresponde aproximadamente a:

```text
GPT-6 Astra
High
ARC-AGI-3
Provider Adapter
99.95%
```

NÃO exibir:

```text
ARC-AGI-3: 99.9%
```

sem harness.

Isso seria metrologicamente enganoso.

---

# 47. ARC-AGI-3 — STANDARD MAX

Best Standard observed:

```text
Max
62.71%
$26,098
```

Best Provider Adapter observed:

```text
High
99.95%
$18,817
```

Esse caso deve ser usado no portal como exemplo educacional da importância do harness.

---

# 48. BENCHMARKS OFICIAIS DE LANÇAMENTO — REGRA DE EFFORT

A OpenAI declara explicitamente:

> Evaluation scores are the maximum at any effort.

Portanto:

**não atribuir automaticamente `max` a todas as linhas oficiais.**

Usar algo como:

```text
effort: best-of-public-efforts
```

ou:

```text
effort: null
selectionPolicy: maximum-at-any-effort
```

quando a tabela oficial não informa qual effort produziu o resultado.

---

# 49. OFFICIAL — CODING

| Benchmark | Astra | Sol | Fable 5.1 | Fable 5 | Opus 5 | Gemini 3.8 Flash |
|---|---:|---:|---:|---:|---:|---:|
| Terminal-Bench 4.0 | **57.9%** | 37.3% | 55.8% | 42.0% | 52.3% | 19.1% |
| DeepSWE v1.1 | **74.1%** | 72.7% | 67.4% | 69.9% | 73.7% | 73.8% |
| FrontierCode 1.1 Extended | **64.5%** | 60.6% | 63.6% | 64.9% | 63.6% | 56.3% |
| FrontierCode 1.1 Main | **53.3%** | 47.5% | 50.9% | 53.5% | 53.4% | 43.6% |
| Internal DB Migration | **63.9%** | 42.7% | 57.8% | 50.3% | N/D | N/D |
| AA Coding Agent Index v1.4 | **67.0** | 65.1 | N/D | 67.2 | 68.1 | 61.2 |

Esses valores devem entrar como **official/vendor benchmark snapshot**, mesmo quando o benchmark original também possuir fonte independente.

Não substituir independent runs.

---

# 50. OFFICIAL — ACADEMIC

| Benchmark | Astra | Sol | Fable 5.1 | Fable 5 | Opus 5 | Gemini 3.8 |
|---|---:|---:|---:|---:|---:|---:|
| Terminal-Bench Science 0.1 | **64.6%** launch snapshot | 22.4% | 52.6% | 21.4% | 30.0% | — |
| FrontierMath Tier 4 v2 | **97.6%** | 83.0% | 87.8% | 87.8% | 73.2% | — |
| GPQA Diamond | **96.0%** | 94.6% | 93.7% | 92.6% | 93.7% | 95.3% |
| HLE with tools | **57.2%** | — | 65.0% | 63.8% | 63.6% | — |

Terminal-Bench Science launch article tinha 64.6%; leaderboard Snorkel atual posteriormente mostra 65.4% max.

**Preservar os dois snapshots com fontes/datas diferentes.**

---

# 51. OFFICIAL — LONG CONTEXT

| Benchmark | Astra | Sol |
|---|---:|---:|
| MRCR v2 8-needle 256K–512K | **100.0%** | 91.5% |
| MRCR v2 8-needle 512K–1M | **96.3%** | 73.8% |

Esses números são particularmente relevantes para o contexto oficial de 1.05M.

Criar seção de dossier:

```text
Long Context Performance
```

Não resumir apenas ao tamanho nominal da janela.

---

# 52. OFFICIAL — COMPUTER USE

Adicionar/validar:

| Benchmark | Astra |
|---|---:|
| Agents' Last Exam | **59.3%** |
| OSWorld 2.0 Offline Partial | **72.6%** |
| ScreenSpot-Pro no tools | **92.7%** |

Sempre incluir sourceId de lançamento/system card e configuração quando disponível.

A OpenAI também relata que Astra conclui determinados OSWorld workflows em substancialmente menos tempo que Sol.

Se incluir tempo comparativo, registrar como vendor-reported experiment, não métrica universal de latency.

---

# 53. OFFICIAL — PROFESSIONAL WORK

Adicionar/validar:

| Benchmark | Astra |
|---|---:|
| AutomationBench | **41.4%** |
| BenchCAD | **95.9%** |
| BrowseComp | **91.5%** |
| OpenScore String Quartets | **0.84** |
| Internal Design Tasks | **50.0%** |
| Internal Data Science | **40.9%** |

BenchCAD e design/data-science devem ser exibidos com label de source/vendor/internal apropriada.

---

# 54. OFFICIAL — SCIENCE & HEALTH

Current release/system-card snapshot:

| Benchmark | Astra | Sol |
|---|---:|---:|
| GeneBench Pro | **37.8%** | 28.7% |
| MedChemBench internal | **49.3%** | 47.4% |
| LifeSciBench | **60.3%** | 59.9% |
| HealthBench Professional length-adjusted | **63.4%** | 60.5% |

Se alguma fonte previamente capturada no repositório tiver GeneBench `37.1%`, não sobrescrever silenciosamente.

Verificar se era:

- snapshot anterior;
- erro editorial corrigido;
- versão diferente.

Registrar histórico/claim conflict apenas se houver evidência real do snapshot antigo.

---

# 55. HEALTHBENCH — DETALHAMENTO DO SYSTEM CARD

Adicionar quatro variantes quando confirmadas:

| Variante | Astra length-adjusted | Astra unadjusted | Sol length-adjusted | Sol unadjusted |
|---|---:|---:|---:|---:|
| HealthBench Professional | **63.4** | 69.5 | 60.5 | 64.1 |
| HealthBench | **58.1** | 59.7 | 57.0 | 55.6 |
| HealthBench Hard | **36.3** | 37.8 | 33.1 | 31.1 |
| HealthBench Consensus | **95.8** | 95.9 | 95.5 | 95.3 |

O system card observa que variantes abertas podem recompensar respostas mais longas.

Guardar comprimento médio quando o schema comportar.

---

# 56. OFFICIAL — CYBERSECURITY

| Benchmark | Astra | Sol |
|---|---:|---:|
| ExploitBench | **100.0%** | 78.5% |
| ExploitGym | **42.4%** | 30.3% |
| ExploitBench Jun–Aug 2026 | **39.0%** | 11.5% current release table |
| SRE-Bench pass@1 | **88.0%** | 55.9% |
| SRE-Bench within 4 attempts | **99.2%** | 68.7% |
| SEC-Bench Pro | **85.4%** | 79.1% |

Não apresentar esses números sem safety context.

Astra é classificado pela OpenAI como **Critical cybersecurity capability**.

---

# 57. PREPAREDNESS FRAMEWORK

Registrar:

```text
Cybersecurity capability: CRITICAL
Bio/Chem capability: HIGH
AI self-improvement: below HIGH
```

Revalidar no system card antes do commit.

Astra é o primeiro modelo que a OpenAI declarou atingir Critical em cybersecurity sob seu Preparedness Framework.

Isso deve aparecer em Governance/Safety, não como uma badge promocional.

---

# 58. CYBER — IMPORTANTE DISTINÇÃO DE ACESSO

Os resultados máximos de cyber podem refletir configurações sem production safeguards e/ou acesso Daybreak.

Não afirmar que todo usuário da API padrão possui a mesma capacidade operacional irrestrita.

Distinguir:

- base capability evaluation;
- default production safeguards;
- trusted/Daybreak access;
- API behavior.

---

# 59. ALIGNMENT — OFFICIAL TABLE

Lower is better onde indicado:

| Benchmark | Astra | Sol |
|---|---:|---:|
| Internal computer-use safety, lower better | **2.4%** | 22.0% |
| Same + AutoReview, lower better | **1.8%** | 4.3% |
| Internal circumvention, lower better | **0.00%** | 0.29% |
| ExploitGym honeypot, lower better | **0.0%** | 48.2% |
| Impossible ExploitGym | **100.0%** | — |
| Internal hallucination, lower better | **4.2%** | 12.2% |

Registrar `higherIsBetter: false` onde aplicável.

---

# 60. PROMPT-INJECTION ROBUSTNESS

System card snapshot:

```text
Indirect prompt injection robustness:
Astra 99.79%
Sol 96.23%
```

Instruction hierarchy:

```text
Astra 99.99%
```

Também há Gray Swan IPI Arena external evals.

Adicionar detalhes somente se fonte atual confirmar exatamente amostra e métrica.

---

# 61. ALIGNMENT — LARGE INTERNAL CODEX SIMULATION

OpenAI reporta simulation com mais de 54k tarefas internas.

Snapshot conhecido:

```text
matched simulation: 54,218 tasks
severity 3+ flags:
Astra 34 (~0.063%)
Sol 73 (~0.135%)
```

Interpretação da OpenAI:

```text
aproximadamente metade das flags de maior severidade
```

Não transformar isso em garantia de segurança para todos os deployments.

---

# 62. MONITORABILITY REGRESSION

Essa limitação deve aparecer no dossier.

OpenAI reporta que Astra:

- tem maior controle do próprio written chain-of-thought;
- tende a incluir menos informação incriminatória no CoT;
- em cenários adversariais consegue às vezes evitar monitores em sandbagging/sabotage;
- não apresentou evidência de steganographic CoT nos testes citados;
- apesar disso, overall alignment é melhor que Sol nas avaliações principais.

Dossier section:

```text
Safety caveat: Monitorability decreased vs GPT-5.6 Sol
```

Não omitir essa nuance.

---

# 63. SAFETY EM WORKPLACE / COMPUTER USE

O system card contém taxas de outcomes indesejados em ambientes realistas.

Se importar a tabela completa, preservar:

- base harness;
- confirmation-policy variant;
- lower-is-better semantics;
- categoria de outcome.

Exemplos de categorias:

- unauthorized transactions;
- data exfiltration;
- destructive action;
- service disruption;
- security weakening;
- unauthorized communication;
- circumvention.

Não combinar tudo em um único “Safety Score” sem metodologia explícita.

---

# 64. PRIVACY / GOVERNANCE

Astra API pode participar de configurações de **Zero Data Retention para clientes elegíveis**, conforme documentação atual da OpenAI.

Não afirmar:

```text
ChatGPT Business = ZDR
```

Isso continua incorreto.

Separar:

- no-training-by-default para dados business;
- retention policy;
- API ZDR eligibility;
- enterprise controls;
- data residency;
- inference residency.

Reutilizar o schema de privacy atual do projeto.

---

# 65. CHATGPT — GPT-6 PRO AVAILABILITY

GPT-6 Astra aparece no ChatGPT como:

```text
GPT-6 Pro
```

Availability atual de Chat:

| Plano | GPT-6 Pro em Chat |
|---|---|
| Free | não |
| Go | não |
| Plus | **não incluído** |
| Pro $100 | sim, rollout |
| Pro $200 | sim, rollout |
| Business Standard | sim, rollout |
| Business Premium | sim, rollout |
| Enterprise | sim, sujeito a admin / rollout |

Não confundir com Astra em Work/Codex, onde Plus possui rollout limitado.

---

# 66. CHATGPT PRO $200 — GPT-6 PRO LIMIT

Current Chat allowance:

```text
GPT-6 Pro: 200 messages/week
```

GPT-5.6 Sol Pro:

```text
170 messages/day
```

E ambos juntos:

```text
combined cap: 200 messages/day
```

Quando GPT-6 Pro weekly allowance acaba:

```text
ChatGPT automatically falls back to GPT-5.6 Thinking Medium
```

Sol Pro pode continuar selecionável enquanto houver allowance própria e combined daily allowance.

---

# 67. CHATGPT PRO $100

Current allowance:

```text
50 messages/week
```

Compartilhados entre:

```text
GPT-6 Pro
GPT-5.6 Sol Pro
```

Trocar de modelo não reseta nem multiplica a cota.

---

# 68. BUSINESS STANDARD — CHAT

Current Pro allowance:

```text
15 messages/month
```

Compartilhados entre:

```text
GPT-6 Pro
GPT-5.6 Sol Pro
```

Esses 15 não são a mesma coisa que Work/Codex allowance.

---

# 69. BUSINESS PREMIUM — CHAT

Current Pro allowance:

```text
50 messages/week
```

Compartilhados entre:

```text
GPT-6 Pro
GPT-5.6 Sol Pro
```

---

# 70. ENTERPRISE — CHAT

Astra/GPT-6 Pro rollout depende de:

- workspace permissions;
- admin controls;
- rollout state;
- enterprise agreement.

Não inventar uma cota fixa se a documentação pública não a fornecer.

No lançamento, Enterprise pode exigir habilitação administrativa explícita.

---

# 71. WORK/CODEX — SUPERFÍCIE SEPARADA

Astra em Work/Codex deve ser modelado separadamente de GPT-6 Pro Chat.

Current product rule:

### Pro $100

- Astra entra na allowance existente de Work/Codex;
- pode usar a full existing allowance quando rollout estiver habilitado.

### Pro $200

- idem, full existing allowance.

### Business Premium

- full existing allowance para Astra.

### Plus

- limited Astra usage dentro da allowance existente;
- créditos adicionais podem ser comprados onde habilitado.

### Business Standard

- limited Astra usage;
- credits opcionais para uso adicional conforme workspace settings.

---

# 72. PLUS — PONTO QUE A UI PRECISA EXPLICAR

Um usuário Plus pode ler:

```text
GPT-6 Astra available to Plus
```

na comunicação geral de rollout e concluir que recebe GPT-6 Pro no chat.

Isso é incorreto no snapshot atual.

A UI deve dizer explicitamente:

```text
ChatGPT Plus
GPT-6 Pro Chat: não incluído
GPT-6 Astra Work/Codex: rollout limitado
API: separada da assinatura
```

---

# 73. BUSINESS STANDARD — LOCAL MESSAGE ESTIMATES

OpenAI publica estimativas por janela de 5 horas:

| Modelo | Estimated local messages / 5h |
|---|---:|
| GPT-6 Astra | **3–30** |
| GPT-5.6 Sol | **10–100** |
| GPT-5.6 Terra | **25–200** |
| GPT-5.6 Luna | **250–2,000** |

Esses são **ranges estimados**, não limites determinísticos de mensagem.

Uso real depende de:

- task size;
- input size;
- output size;
- reasoning effort;
- work performed;
- Fast mode;
- local vs cloud execution.

---

# 74. BUSINESS PREMIUM — WORK/CODEX

Premium seats possuem aproximadamente:

```text
5× included usage de Standard
```

com benefício de não ficar preso à mesma janela fixa de 5 horas, conforme documentação atual.

Não converter automaticamente isso para `15–150 Astra messages` como quota oficial.

A multiplicação seria apenas uma inferência simplificada e ignoraria a natureza variável do metering.

---

# 75. CREDIT RATE CARD — WORK/CODEX

Current credit rates por 1M tokens:

| Modelo | Input credits | Cached input credits | Output credits |
|---|---:|---:|---:|
| GPT-6 Astra | **250** | **25** | **1,250** |
| GPT-5.6 Sol | 100 | 10 | 500 |
| GPT-5.6 Terra | 50 | 5 | 300 |
| GPT-5.6 Luna | 5 | 0.5 | 30 |

Esses valores devem ser registrados no schema de plan/usage rate card apropriado.

---

# 76. CREDIT BURN — NOMINAL RATIOS

Para o mesmo número de tokens:

### Astra vs Sol

```text
2.5× input
2.5× cached input
2.5× output
```

### Astra vs Terra

```text
5× input
5× cached
4.17× output
```

### Astra vs Luna

```text
50× input
50× cached
41.67× output
```

Badge:

```text
D — Derived
```

Não chamar isso de `messages burn multiplier`, pois tokens/task mudam muito por modelo.

---

# 77. FAST EM WORK/CODEX — DIFERENTE DA API

Current credit-based Astra Fast:

```text
~2.5× Standard credit rate
```

API Fast:

```text
2× applicable API token rates
```

Guardar em objetos de billing separados.

Nunca usar um único:

```js
fastMultiplier: 2.5
```

no model root.

---

# 78. SHARED AGENTIC POOL

O rate card deve ser interpretado no contexto de usage compartilhado entre experiências agentic suportadas, como:

- Codex;
- Work;
- automations;
- code review;
- auto review;
- delegated workers;
- outras workspace-agent surfaces quando aplicável.

Não assumir que cada surface possui uma conta isolada de créditos.

---

# 79. API KEY VS CHATGPT LOGIN

Adicionar nota clara:

### Codex/Work via ChatGPT sign-in

```text
usa allowance / billing do plano ChatGPT
```

### Codex via API key

```text
usa API token pricing
```

Isso evita uma das confusões mais comuns de custos.

---

# 80. NÃO CONFUNDIR “API INCLUDED”

ChatGPT Plus/Pro/Business subscriptions não significam que o usuário recebeu créditos de API pública equivalentes.

Manter:

```text
apiIncluded: false
```

quando isso for o estado contratual real.

Acesso a Astra em Work/Codex via plano não é o mesmo que saldo da Platform API.

---

# 81. ROLLOUT STATUS

O modelo foi lançado em 03/09/2026 com rollout gradual.

Disponibilidade anunciada:

- OpenAI API;
- ChatGPT Plus (Work/Codex, não GPT-6 Pro Chat);
- ChatGPT Pro;
- ChatGPT Business;
- ChatGPT Enterprise;
- Microsoft Azure;
- AWS Bedrock.

Não marcar Azure/Bedrock como `active verified` apenas porque foram anunciados.

Use status temporal:

```text
announced
rolling-out
available
```

conforme evidência atual.

---

# 82. OFFICIAL CONTEXT / TOKEN ECONOMICS

Context:

```text
1,050,000
```

Max output:

```text
128,000
```

Isso é igual ao atual GPT-5.6 Sol/Terra no model compare oficial.

Portanto, Astra não deve receber badge de contexto maior que Sol se ambos estiverem em 1.05M.

Sua vantagem observada está em **retenção/raciocínio no contexto**, não apenas no tamanho nominal.

---

# 83. MULTIMODALIDADE

Canonical:

```text
Input: text + image
Output: text
Audio: not supported
Video: not supported
```

Não inferir native audio/video porque ChatGPT como produto possui voice/video features.

Produto e modelo são camadas diferentes.

---

# 84. AA SPEED

No snapshot atual Artificial Analysis mostra:

```text
output speed: N/D
```

para as configurações Astra.

Portanto:

- não inventar tokens/s;
- não usar “fastest” award;
- não usar marketing de Fast API como throughput medido.

`Fast up to 2×` é característica de service tier, não medição independente de tokens/s.

---

# 85. STRENGTHS — DERIVED, NÃO HARDCODE COMPETITIVO ETERNO

Resumo interpretativo sugerido, desde que gerado a partir dos dados atuais:

### Muito forte em

- autonomous computer use;
- terminal workflows;
- agentic coding;
- long-context reasoning;
- professional artifact work;
- science workflows;
- cyber capability;
- tool-rich long-running tasks;
- token efficiency em tarefas complexas.

### Trade-offs

- preço nominal por token muito alto;
- Max frequentemente apresenta returns decrescentes;
- não é líder atual do AA Intelligence Index;
- speed independente ainda N/D;
- sem audio/video nativo;
- sem open weights;
- sem fine-tuning;
- GPT-6 Pro Chat não incluído no Plus;
- Fast tem restrições de residency;
- output é especialmente caro;
- monitorability regrediu vs Sol em avaliações adversariais.

Nunca armazenar:

```text
melhor modelo do mundo
campeão absoluto
#1 eterno
```

como string estática.

---

# 86. REASONING RECOMMENDATIONS — DERIVED

Criar um bloco visual de “Qual effort usar?”

### Low

Perfil:

- alto volume;
- custo sensível;
- tarefas claras;
- agentic work relativamente direto.

Evidence:

- DeepSWE ainda 67%;
- TB Science 55.4%;
- AA Index 57;
- menor custo em quase todas as matrizes.

---

### Medium

Perfil:

- daily driver sério;
- equilíbrio de custo/qualidade;
- muitas tarefas profissionais gerais.

Evidence:

- DeepSWE 72.8%;
- AA 59;
- TB4 54.24%;
- engineering science empata melhor score observado a custo mínimo entre medium/high/xhigh.

---

### High

Sugestão:

```text
Sweet Spot Geral para coding/terminal no snapshot atual
```

Evidence:

- TB4 57.88 = XHigh;
- apenas 0.30 p.p. abaixo de Max;
- custo/solved muito menor que Max;
- TB Science overall 62.0 > XHigh 60.9;
- ARC Provider Adapter atinge melhor score observado 99.95.

Classificar:

```text
D — Derived recommendation
```

---

### XHigh

Sugestão:

```text
Sweet Spot DeepSWE
```

Evidence:

- melhor pass@1 Astra: 74.1%;
- custa muito menos que Max;
- AA Index igual ao Max arredondado: 61.

---

### Max

Perfil:

- capability ceiling;
- tarefas em que aumento de compute realmente melhora resultado;
- ARC-AGI-2;
- ARC-AGI-3 Standard;
- Terminal-Bench Science overall;
- certain scientific domains.

Caveat:

> Não usar Max como default automático. Diversos benchmarks mostram custo muito maior com ganho pequeno, empate ou regressão.

---

# 87. DOSSIÊ — UX OBRIGATÓRIA

O dossier de Astra deve ser mais rico que um dossier padrão porque existe uma matriz grande de reasoning efforts.

Criar uma seção de primeira classe:

```text
Reasoning Effort Explorer
```

Permitir alternar:

```text
Low | Medium | High | XHigh | Max
```

A seleção deve atualizar:

- benchmark scores;
- cost/task;
- tokens/task;
- time/task;
- notes;
- recommendation.

---

# 88. REASONING EFFORT EXPLORER — CHARTS

Criar visualizações úteis:

### Score vs effort

- AA Index;
- DeepSWE;
- TB4;
- TB Science;
- ARC3 Standard;
- ARC3 Provider Adapter.

### Cost vs effort

- AA cost/task;
- DeepSWE cost/task;
- TB4 cost/solved;
- TB Science total cost.

### Token efficiency

- DeepSWE input/output;
- TB Science total tokens.

Não normalizar datasets incompatíveis sem explicar metodologia.

---

# 89. EFFORT PARETO

Criar Pareto interno às configurações de Astra.

Exemplo:

```text
DeepSWE
XHigh domina Max em score e custo.
```

```text
TB4
High domina XHigh em custo com score empatado.
```

```text
TB Science overall
High domina XHigh em score e custo.
```

Isso ensina ao usuário que reasoning effort é uma decisão econômica, não uma simples escala de qualidade.

---

# 90. DOSSIÊ — SEÇÕES RECOMENDADAS

O dossier final deve conter, no mínimo:

1. Hero / Identity
2. Executive Technical Summary
3. Current Dynamic Positioning
4. Reasoning Effort Explorer
5. API Specifications
6. Pricing & Token Economics
7. Long Context Pricing
8. Developer Capabilities
9. Async Tool Calling
10. Mid-turn Steering
11. Integration / Migration Notes
12. Independent Benchmarks
13. Official Benchmarks
14. Coding & Software Engineering
15. Computer Use
16. Professional Work
17. Science
18. Health
19. Long Context
20. Abstract Reasoning
21. Cybersecurity
22. Alignment & Safety
23. Monitorability Caveat
24. Plans & Access
25. ChatGPT GPT-6 Pro
26. Work / Codex
27. API Availability
28. Quota / Credit Burn
29. Astra vs Sol/Terra/Luna Economics
30. History
31. Sources
32. Data Coverage
33. Review Queue / Missing Data

Integrar essas seções às 5 abas atuais do dossier sem reintroduzir 30 tabs horizontais.

---

# 91. HERO DO DOSSIÊ

Mostrar:

```text
GPT-6 Astra
OpenAI
Released 03/09/2026
1.05M context
128K output
Text + image input
Reasoning: Low → Max
Rollout active
```

Badges estáveis:

- Proprietary;
- Reasoning;
- 1.05M Context;
- Image Input;
- Computer Use;
- Tool Calling;
- Critical Cyber Capability.

Badges competitivas devem ser derivadas.

---

# 92. CURRENT POSITIONING

Deixar DomainRankings recalcular automaticamente.

Não forçar Astra como #1 geral.

No snapshot de 04/09/2026:

- Artificial Analysis v4.2: Claude Fable 5.1 segue à frente no índice geral;
- Astra está em segundo no índice v4.2 segundo artigo AA;
- Astra lidera GDP.pdf entre comparadores citados;
- Astra lidera TB Science 0.1;
- Astra lidera current TB4 published snapshot;
- Astra lidera várias avaliações oficiais específicas.

Tudo precisa continuar dinâmico quando novos modelos entrarem.

---

# 93. USE CASES

Não adicionar posições manuais.

Recalcular todos os casos usando engine atual.

Particularmente revisar:

- system architecture;
- critical backend;
- frontend/UI workflows;
- autonomous coding;
- long-horizon agents;
- research;
- long context;
- data science;
- professional artifacts;
- computer use;
- scientific workflows;
- cybersecurity defensive workflows.

Mostrar coverage/confidence.

---

# 94. NÃO USAR CYBER SCORE PARA RECOMENDAR ATAQUE

No use-case engine, capacidades cyber devem ser apresentadas sob contexto:

- defensive security;
- secure code review;
- remediation;
- vulnerability analysis dentro de acesso permitido;
- safety/access gating.

Não transformar benchmark capability em recomendação irresponsável de uso ofensivo.

---

# 95. PLANS — ATUALIZAR OPENAI RECORDS

Auditar todos os planos OpenAI em `data/plans.js`.

Adicionar Astra sem apagar as configurações GPT-5.6 existentes.

Atualizar pelo menos:

- ChatGPT Plus;
- Pro $100;
- Pro $200;
- Business Standard;
- Business Premium;
- Enterprise.

Free/Go:

- não adicionar Astra enquanto não houver fonte oficial de acesso.

---

# 96. PLUS — MODEL ACCESS EXEMPLO CONCEITUAL

Adaptar ao schema atual.

Algo equivalente a:

```js
{
  modelId: 'gpt-6-astra',
  modelName: 'GPT-6 Astra',
  surface: 'chatgpt-work',
  available: true,
  included: true,
  billingMode: 'included-limited',
  efforts: ['low', 'medium', 'high', 'xhigh', 'max'],
  rolloutStatus: 'rolling-out',
  notes: 'Astra disponível em Work/Codex com uso limitado; GPT-6 Pro Chat não incluído no Plus.'
}
```

E registrar separadamente:

```text
GPT-6 Pro Chat: unavailable
```

---

# 97. PRO $100 — ACCESS

Criar dois access records se o schema usar surface rows:

### Chat

```text
GPT-6 Pro
50 messages/week shared with GPT-5.6 Sol Pro
```

### Work/Codex

```text
GPT-6 Astra
uses full existing included allowance
```

Não misturar essas quotas.

---

# 98. PRO $200 — ACCESS

### Chat

```text
GPT-6 Pro
200 messages/week
```

### Sol Pro

```text
170/day separate
```

### Combined

```text
GPT-6 Pro + Sol Pro <= 200/day combined
```

### Work/Codex

```text
Astra can use full existing included allowance
```

---

# 99. BUSINESS STANDARD — ACCESS

### Chat

```text
15 Pro messages/month shared GPT-6 Pro + Sol Pro
```

### Work/Codex

```text
limited Astra usage
estimated local messages: 3–30 / 5h
optional additional workspace credits
```

---

# 100. BUSINESS PREMIUM — ACCESS

### Chat

```text
50 Pro messages/week shared GPT-6 Pro + Sol Pro
```

### Work/Codex

```text
full existing Astra allowance
~5x Standard included usage
no same 5-hour-window constraint
```

---

# 101. ENTERPRISE — ACCESS

Model:

```text
GPT-6 Astra / GPT-6 Pro
```

Availability:

```text
rollout + workspace admin permissions
```

Do not invent fixed message quotas.

Pricing:

- contract dependent;
- token-based rate card may apply;
- flexible credits may apply.

Privacy:

- business data no-training-by-default;
- ZDR is a separate eligible API configuration, not automatic for every Enterprise chat message.

---

# 102. PLAN DOSSIERS

Nos dossiers de cada plano OpenAI, incluir uma subseção:

```text
GPT-6 Astra Access
```

com matriz:

| Surface | Available | Included | Billing | Limit | Efforts | Notes |
|---|---|---|---|---|---|---|
| Chat | ... | ... | ... | ... | ... | ... |
| Work | ... | ... | ... | ... | ... | ... |
| Codex | ... | ... | ... | ... | ... | ... |
| API | separate | false | token billing | API tier | low-max | subscription not API credit |

---

# 103. HISTORY

Adicionar timeline:

```text
2026-09-03 — GPT-6 Astra public launch
```

Adicionar eventos relacionados:

- rollout to Trusted/Daybreak orgs;
- API rollout;
- ChatGPT rollout;
- v4.1.1 AA results;
- 2026-09-04 AA Index v4.2 methodology update;
- current TBScience leaderboard update;
- future price/plan changes.

Não marcar GPT-5.6 Sol como retired.

Astra é uma nova frontier generation, mas Sol continua disponível e possui diferente price/performance role.

---

# 104. IMPACT ENGINE

Depois de adicionar Astra, rodar DomainImpact.

Esperar potenciais mudanças em:

- benchmark leaders;
- use-case rankings;
- Pareto frontiers;
- cost-efficiency awards;
- OpenAI provider page;
- plan recommendations;
- long-context rankings;
- computer-use rankings;
- coding rankings;
- science rankings.

Não escrever manualmente “Astra substitui X como campeão”.

Deixar o engine calcular.

---

# 105. CLAIMS

Criar claims apenas quando úteis.

Exemplos:

### Claim official release

```text
GPT-6 Astra released 2026-09-03
```

### Claim cyber classification

```text
Preparedness cybersecurity capability = Critical
```

### Claim AA v4.2 rank

```text
Astra ranked #2 behind Fable 5.1 in v4.2 article snapshot
```

### Claim plan surface

```text
Plus does not include GPT-6 Pro Chat
```

Todos com:

- validFrom;
- verifiedAt;
- sourceIds;
- status.

---

# 106. DATA HEALTH

Após integração, `#data-health` deve conseguir detectar:

- benchmark run sem source;
- source stale;
- plan access sem source;
- metric without effort when effort is required;
- duplicate GPT-6 Pro model;
- benchmark version conflicts;
- Chat/Work quota confusion;
- unverified speed;
- official value accidentally marked independent;
- mirror promoted over primary;
- rollout marked active without verification.

---

# 107. SOURCE CONFLICTS / DATA DRIFT

Astra já mostrou exemplos de números mudando entre snapshots.

Exemplos:

- Terminal-Bench Science launch 64.6 vs current Snorkel 65.4 max;
- AA Index version changed from v4.1.1 to v4.2 one day after release;
- independent leaderboard/mirror costs can differ as accounting updates.

Esse comportamento deve ser tratado como:

```text
versioned evidence
```

não como erro a apagar.

---

# 108. BENCHMARK REGISTRY — IDS A GARANTIR

Garantir IDs equivalentes para:

```text
artificial-analysis-index-v4-1-1
artificial-analysis-index-v4-2
aa-briefcase
gdp-pdf
terminal-bench-4-0
terminal-bench-science-0-1
deep-swe-1-1
frontiercode-1-1-extended
frontiercode-1-1-main
arc-agi-1
arc-agi-2
arc-agi-3-standard
arc-agi-3-provider-adapter
frontiermath-t4-v2
gpqa-diamond
hle-with-tools
mrcr-v2-256k-512k
mrcr-v2-512k-1m
agents-last-exam
osworld-2-offline-partial
screenspot-pro
benchcad
automationbench
browsecomp
lifescibench
genebench-pro
medchembench
healthbench-professional
exploitbench
exploitgym
sre-bench
sec-bench-pro
```

Reutilizar IDs atuais quando já existirem.

Não criar duplicatas por hífen/nome diferente.

---

# 109. BENCHMARK RUN — EXEMPLO DEEPSWE

Adaptar ao schema atual:

```js
{
  id: 'deepswe-v11:gpt-6-astra:xhigh:2026-09-03',
  benchmarkId: 'deep-swe-1-1',
  modelId: 'gpt-6-astra',
  effort: 'xhigh',
  harness: 'mini-swe-agent',
  runDate: '2026-09-03',
  score: 74.1,
  scoreUnit: 'percent',
  confidenceInterval: [71.2, 77.0],
  passAt4: 80.5,
  costUsd: 6.52,
  inputTokens: 1500000,
  outputTokens: 30000,
  elapsed: '18m52s',
  runs: 4,
  taskCount: 113,
  sourceId: 'deep-swe-v11-20260903',
  provenanceType: 'independent',
  evidenceType: 'measured'
}
```

Não duplicar esse objeto se o domain v2 já possuir outro schema de run.

---

# 110. BENCHMARK RUN — EXEMPLO ARC

```js
{
  benchmarkId: 'arc-agi-3-provider-adapter',
  modelId: 'gpt-6-astra',
  effort: 'high',
  harness: 'provider-adapter',
  score: 99.95,
  costUsd: 18817,
  sourceId: 'arcprize-gpt6-astra-20260902',
  provenanceType: 'independent',
  evidenceType: 'measured'
}
```

Separado de:

```js
{
  benchmarkId: 'arc-agi-3-standard',
  modelId: 'gpt-6-astra',
  effort: 'max',
  harness: 'standard',
  score: 62.71,
  costUsd: 26098,
  ...
}
```

---

# 111. OFFICIAL RUNS — MAXIMUM AT ANY EFFORT

Exemplo correto:

```js
{
  benchmarkId: 'frontiermath-t4-v2',
  modelId: 'gpt-6-astra',
  score: 97.6,
  effort: null,
  selectionPolicy: 'maximum-at-any-effort',
  sourceId: 'openai-gpt6-astra-launch',
  provenanceType: 'official',
  evidenceType: 'measured'
}
```

Não escrever:

```text
effort: max
```

sem evidência.

---

# 112. QUICK INSPECTOR

Quick Inspector de Astra deve mostrar apenas resumo:

- provider;
- status rollout;
- 1.05M context;
- 128K output;
- API price $10/$50;
- reasoning low→max;
- 3–4 current dynamic benchmark highlights;
- plan access summary;
- freshness;
- button `Abrir dossiê completo`.

Não duplicar toda a matriz de effort dentro do drawer.

---

# 113. CATALOG CARD

No catálogo:

```text
GPT-6 Astra
OpenAI
Active / rollout
1.05M
Reasoning 5 levels
$10 / $50
```

Evitar uma lista de 15 badges.

Badge especial possível:

```text
NEW
```

com validade temporal, não eterna.

---

# 114. PROVIDER DOSSIER — OPENAI

Adicionar Astra no provider OpenAI e recalcular:

- current models;
- flagship role;
- pricing ladder;
- context comparison;
- plan access;
- current benchmark highlights.

Price ladder aproximado atual:

```text
Luna -> Terra -> Sol -> Astra
```

Sol Pro continua product-specific e não deve ser tratado exatamente como API sibling se não possuir public API equivalent.

---

# 115. PRICE HISTORY

Criar price-history event para Astra:

```text
2026-09-03
Standard API launch
Input $10
Cached $1
Cache write $12.50
Output $50
```

Long-context policy:

```text
>272K input -> 2x input/cache, 1.5x output
```

Batch/Flex/Fast devem ser pricing modes, não price-history points separados, a menos que o schema atual modele service tiers dessa forma.

---

# 116. RANKING / AWARDS

Astra não deve ganhar awards por hardcode.

Permitir que concorra em:

- current benchmark leader;
- coding;
- science;
- long context;
- professional work;
- computer use;
- token efficiency;
- premium capability.

Mas qualquer vencedor deve vir de `DomainRankings` ou engine atual.

---

# 117. BEST VALUE

Astra não deve automaticamente ser excluído por preço alto.

Best Value deve considerar:

```text
performance per completed task
```

quando houver benchmark-task cost.

Em alguns benchmarks Astra possui tarifa nominal maior, mas custo por tarefa competitivo por usar menos tokens.

Não usar somente:

```text
model.pricing.input
```

para classificar custo-benefício.

---

# 118. TOKEN EFFICIENCY CARD

Criar card derivado onde houver evidência comparável.

Possíveis métricas:

```text
output tokens / solved task
input tokens / task
steps / solved task
cost / solved task
```

Artificial Analysis v4.2 afirma qualitativamente que Astra domina a output-token frontier entre quase todos os modelos próximos da intelligence frontier.

Guardar essa frase como claim independente com sourceId v4.2.

---

# 119. COMPARADOR

Ao comparar Astra com Sol/Terra/Luna:

mostrar separadamente:

### Model Specs

- context;
- output;
- cutoff;
- modalities.

### API token pricing

- input;
- cache;
- output.

### Plan usage

- Chat availability;
- Work/Codex allowance;
- credits.

### Effort

Permitir escolher configuração Astra.

Não comparar Astra Max com Sol Medium sem avisar que reasoning configurations diferem.

---

# 120. COMPARISON CONFIDENCE

Confidence deve cair quando:

- benchmark versions diferentes;
- harness diferente;
- effort não comparável;
- official vs mirror sem corroboration;
- snapshot dates muito diferentes.

ARC Standard vs Provider Adapter deve ter confidence 0 para comparação direta se o usuário tentar tratá-los como mesma métrica.

---

# 121. MISSING DATA / REVIEW QUEUE

Adicionar review items iniciais, se ainda não houver fonte:

```text
AA v4.2 exact per-effort headline scores
Independent output speed / tok/s
Independent TTFT
API latency distribution
Exact production Fast throughput
Provider availability status Azure
Provider availability status Bedrock
Immutable dated API snapshot ID
Detailed architecture / params
```

Esses campos devem mostrar:

```text
N/D
```

não estimativa inventada.

---

# 122. ARTIFICIAL ANALYSIS V4.2 — HIGH PRIORITY REVIEW

Como v4.2 foi lançado em 04/09/2026, no momento da implementação:

1. abrir live leaderboard;
2. identificar score exato de cada Astra effort se disponível;
3. armazenar como v4.2 runs;
4. manter v4.1.1 runs históricos;
5. não converter v4.1.1 = 61 em v4.2 = 61 por suposição.

---

# 123. COUNTERS

Adicionar Astra deve aumentar `modelCount` automaticamente.

Não alterar manualmente strings como:

```text
44 modelos
47 modelos
```

Deixar `getCatalogStats()` ou engine equivalente derivar a nova contagem.

---

# 124. SEARCH / COMMAND PALETTE

A busca deve encontrar:

```text
GPT-6 Astra
Astra
GPT-6 Pro
gpt-6-astra
```

Mas todos devem abrir:

```text
#model/gpt-6-astra
```

ou dossier canônico equivalente.

---

# 125. ALIASES

Adicionar aliases sem duplicação:

```text
GPT 6 Astra
GPT-6 Astra
Astra
GPT6 Astra
gpt-6-astra
GPT-6 Pro (product alias)
```

`GPT-6 Pro` deve apontar para Astra com contexto de surface ChatGPT.

---

# 126. RESPONSIVE DOSSIER

Reasoning explorer deve funcionar em:

- 360 px;
- 390 px;
- 430 px;
- tablet;
- desktop.

Não colocar cinco colunas fixas impossíveis em mobile.

Em mobile:

- effort selector horizontal scroll ou segmented control;
- tabelas com scroll contextual;
- charts responsivos;
- source badges legíveis.

---

# 127. ACCESSIBILITY

Reasoning selector:

- usar buttons/tabs reais;
- keyboard navigation;
- `aria-selected`;
- focus visible;
- não depender somente de cor.

Evidence badges precisam possuir texto/tooltip acessível.

---

# 128. TESTES — MODEL ID

Adicionar teste:

```text
AI_MODELS_DATA['gpt-6-astra'] existe
```

E:

```text
não existe segundo modelo canônico 'gpt-6-pro'
```

---

# 129. TESTES — REASONING EFFORTS

Validar:

```text
low
medium
high
xhigh
max
```

Não incluir `none` como public effort.

Se houver run `non-reasoning`, exigir:

```text
evaluationOnly === true
```

ou campo equivalente.

---

# 130. TESTES — PRICING

Validar canonical Standard:

```text
input 10
cached 1
cacheWrite 12.5
output 50
```

Validar long-context multipliers:

```text
input/cache 2x
output 1.5x
threshold 272000
```

Validar:

```text
Batch 0.5x
Flex 0.5x
Fast API 2x
```

Não testar Work/Codex Fast usando 2x se rate card atual disser 2.5x credits.

---

# 131. TESTES — CONTEXT

Validar:

```text
contextWindow === 1050000
maxOutputTokens === 128000
knowledgeCutoff === 2026-04-30
```

---

# 132. TESTES — MODALITIES

Validar:

```text
text input/output
image input
no native audio
no native video
```

---

# 133. TESTES — PLAN ACCESS

Validar:

```text
Plus GPT-6 Pro Chat = unavailable
Plus Astra Work/Codex = limited rollout
Pro100 GPT-6 Pro = 50/week shared
Pro200 GPT-6 Pro = 200/week
Business Standard = 15/month shared
Business Premium = 50/week shared
```

Enterprise não deve ter quota inventada.

---

# 134. TESTES — CREDIT RATIOS

Validar tabela atual:

```text
Astra 250/25/1250
Sol 100/10/500
Terra 50/5/300
Luna 5/0.5/30
```

E derived ratios matemáticos.

---

# 135. TESTES — ARC HARNESS

Exigir dois benchmark IDs distintos:

```text
arc-agi-3-standard
arc-agi-3-provider-adapter
```

Falhar se houver apenas:

```text
arcAgi3: 99.9
```

---

# 136. TESTES — OFFICIAL MAX-AT-ANY-EFFORT

Para official launch runs sem effort explícito:

exigir:

```text
selectionPolicy = maximum-at-any-effort
```

ou estrutura equivalente.

Falhar se o import atribuir `max` automaticamente.

---

# 137. TESTES — SPEED

Se AA ainda não possuir output speed:

```text
throughputTps === null
```

Falhar se um número arbitrário tiver sido adicionado sem sourceId.

---

# 138. TESTES — SOURCE PRIORITY

DeepSWE:

```text
primary DataCurve > BenchSift mirror
```

TerminalBench4:

```text
primary current leaderboard > BenchLM mirror
```

Mirror pode permanecer para audit trail.

---

# 139. TESTES — DYNAMIC RANKING

Não testar:

```text
Astra deve ser #1
```

Testar:

```text
se Astra possui maior score elegível, DomainRankings retorna Astra
```

Adicionar fixture onde outro modelo supera Astra e confirmar atualização automática.

---

# 140. TESTES — DATA HEALTH

Após integração:

```text
0 orphan model IDs
0 missing source IDs em benchmark runs importantes
0 duplicate model entity GPT-6 Pro
0 invalid public reasoning efforts
0 benchmark score without version where version required
```

Warnings podem existir para rollout/missing independent speed.

---

# 141. FILES PROVAVELMENTE AFETADOS

Auditar e modificar somente se realmente necessário:

```text
data.js
data/dossiers.js
data/domain.js
data/plans.js
data/history.js
data/use-cases.js
data/plan-dossier.js
data/entity-views.js
app.js
index.html
style.css
scripts/*
README.md
```

Se Domain v2 já possuir benchmark run/claim registries em outro arquivo, use-os.

Não centralizar ainda mais dados em `app.js`.

---

# 142. NÃO AUMENTAR MONOLITO SEM NECESSIDADE

Não colocar 500 linhas de Astra dentro da view.

Dados pertencem aos datasets/domain modules.

Views apenas renderizam.

Se o dossier exigir lógica nova de Reasoning Explorer, criar componente/módulo reutilizável.

---

# 143. SOURCE BADGES

Cada tabela deve indicar source nature:

```text
O · Official
I · Independent
MIRROR · Independent mirror
D · Derived
```

E nature of evidence:

```text
M · Measured
D · Derived
C · Calibrated
A · Anecdotal
```

Não reutilizar a mesma letra C sem contexto.

---

# 144. CURRENT FRESHNESS

Todos os registros criados devem usar data real de verificação.

Não hardcode uma data falsa para passar testes.

Se implementação ocorrer depois de 04/09/2026:

```text
verifiedAt = data efetiva em que a fonte foi reaberta
```

---

# 145. DOSSIER SUMMARY SUGERIDO

Gerar dinamicamente, mas conceitualmente o resumo atual é:

> GPT-6 Astra é o novo frontier flagship da OpenAI para trabalho end-to-end difícil. O modelo combina 1.05M de contexto, cinco níveis públicos de reasoning e forte desempenho em coding agentic, computer use, ciência, long context e professional work. Sua tarifa nominal é 2.5× GPT-5.6 Sol por token, mas diversos benchmarks mostram redução expressiva em tokens, passos ou custo por tarefa concluída. Max não é automaticamente o melhor operating point: High e XHigh frequentemente oferecem melhor trade-off, e em algumas suítes superam Max no score observado.

Esse texto deve ser gerado/atualizado a partir dos facts quando possível.

---

# 146. EXCELLENT IN — DERIVED

Possível bloco atual:

```text
Computer Use
Terminal / Scientific Agents
Coding Agentic
Long Context
Professional Artifacts
Cybersecurity Capability
Complex Tool Workflows
```

Cada item deve apontar para evidência.

---

# 147. LIMITATIONS — DERIVED

Possível bloco atual:

```text
Premium token price
No open weights
No fine-tuning
No native audio/video
Independent speed not yet measured
Max effort has steep diminishing returns on multiple benchmarks
GPT-6 Pro Chat absent from Plus
Rollout still incomplete
Critical cyber safeguards may interrupt legitimate advanced security tasks
CoT monitorability regression vs Sol in adversarial tests
```

---

# 148. “USE WHEN”

Derived recommendations:

- high-complexity software engineering;
- terminal-heavy autonomous agents;
- workflows involving browser/computer use;
- long-context document/code analysis;
- scientific workflows;
- professional document/artifact creation;
- high-value tasks where completion quality matters more than token price;
- defensive security within allowed access.

---

# 149. “AVOID / CONSIDER ALTERNATIVE WHEN”

Derived:

- extreme high-volume low-value token generation;
- simple transformations;
- workloads where Luna/Terra achieves enough quality;
- local/offline requirement;
- audio/video-native model requirement;
- budget where $50/MTok output is prohibitive;
- use cases where Max effort adds little vs High/XHigh.

---

# 150. DO NOT CALL ASTRA “CHEAP”

Astra pode ser eficiente por task, mas sua **tarifa por token é premium**.

UI wording:

```text
High nominal token cost
Strong task-level efficiency on several agentic benchmarks
```

Não:

```text
Cheap model
```

---

# 151. DO NOT CALL ASTRA “AA #1”

No snapshot v4.2:

```text
Claude Fable 5.1 leads
GPT-6 Astra follows
```

Portanto remover qualquer award que afirme `#1 AA` sem cálculo atualizado.

---

# 152. DO NOT FABRICATE CURSORBENCH

Se GPT-6 Astra ainda não possui run CursorBench 3.2 verificável:

```text
CursorBench: N/D
```

Não copiar TerminalBench/DeepSWE para preencher a coluna.

---

# 153. DO NOT FABRICATE RADAR SCORES

Se o Radar 10D usa calibrated scores:

- recalcular com metodologia atual;
- marcar `C · Calibrated`;
- não usar benchmark score diretamente como dimensão sem normalização.

---

# 154. BEHAVIOR / ENGINEERING PROFILE

Se adicionar Astra ao `data/behavior.js`:

- usar calibration rules atuais;
- marcar confidence;
- justificar cada score;
- não tratar propriedades subjetivas como medição.

Guidance oficial sugere características úteis para o perfil:

- mais disposto a pedir esclarecimento quando ambiguidade muda o resultado;
- forte instruction following;
- pode ser sensível a instruções presentes em skills / AGENTS.md;
- pode executar testes mais amplos do que o necessário em pequenas mudanças;
- pode delegar menos que o desejado se não for explicitamente instruído;
- tende a produzir respostas detalhadas com listas/tabelas.

Classificar isso como vendor behavioral guidance / calibrated, não benchmark factual.

---

# 155. PROMPTING NOTES

Criar seção opcional de “Operational Guidance”:

- prefer Responses API para tool-heavy workflows;
- instruir explicitamente quando usar subagents;
- auditar skills/AGENTS.md acessíveis;
- restringir escopo de testes em patches pequenos quando apropriado;
- use async tools para chamadas demoradas;
- use mid-turn steering para long-running agents;
- ajuste reasoning effort por fase do workflow em vez de Max sempre.

---

# 156. ORCHESTRATION EXAMPLE

Uma sugestão derivada:

```text
Planning: Astra High/XHigh
Implementation: Astra High
Routine mechanical workers: Terra/Luna
Critical review: Astra XHigh/Max
```

Não armazenar isso como regra universal.

Marcar como `D — Derived orchestration guidance`.

---

# 157. COST-AWARE ORCHESTRATION

Dossier deve explicar que um pipeline híbrido pode economizar muito:

```text
Astra para planejamento/review de alto valor
Terra/Luna para subtarefas mecânicas
```

Isso também deve aparecer no Router somente se o engine de decisão derivar a recomendação dos custos/benchmarks atuais.

---

# 158. LONG-CONTEXT COST WARNING

Se usuário selecionar Astra e input >272K no simulador:

exibir warning:

```text
Long-context pricing tier activated
Full request uses higher pricing
```

O simulador deve aplicar:

- $20 input;
- $2 cached input;
- $25 cache write;
- $75 output;

para Standard >272K, conforme regra atual.

---

# 159. COST CALCULATOR

Adicionar Astra ao simulador API.

Inputs necessários:

- uncached input tokens;
- cached input tokens;
- cache writes;
- output/reasoning tokens;
- service tier;
- context threshold;
- number of requests.

Não simplificar tudo em input/output se o projeto agora suporta cache write.

---

# 160. PLAN QUOTA CALCULATOR

Para Work/Codex, não usar API dollar rate diretamente se o usuário está em plan allowance.

Modo plan deve mostrar:

```text
included allowance
estimated burn
credit rate after allowance
```

Distinguir:

```text
Included usage != purchased credits != API billing
```

---

# 161. PLAN COMPARISON — OPENAI

Adicionar tabela explicativa no dossier Astra:

| Plan | Chat GPT-6 Pro | Work/Codex Astra | Extra billing |
|---|---|---|---|
| Plus | No | Limited | personal credits where available |
| Pro $100 | 50/w shared Pro chat | Full existing allowance | credits |
| Pro $200 | 200/w Astra chat | Full existing allowance | credits |
| Business Standard | 15/mo shared Pro chat | Limited | workspace credits |
| Business Premium | 50/w shared Pro chat | Full existing allowance | workspace credits |
| Enterprise | Admin/contract | Available by rollout | contract/flexible/token-based |

Revalidar preços e entitlements antes de publish.

---

# 162. ROLLOUT UI

Enquanto rollout não estiver universal:

badge:

```text
Rolling out
```

Tooltip:

```text
Eligibility does not guarantee the model is visible on every account yet.
```

Não marcar usuário como inelegível apenas porque não aparece.

---

# 163. CURRENT MODEL ROLE

Canonical role sugerido:

```text
OpenAI frontier flagship for hardest end-to-end work
```

Não substituir Sol role completamente.

Sol continua relevante como:

- lower token price;
- Chat Instant/Medium/High/XHigh core;
- broader default paid-chat model;
- cost-balanced frontier model.

---

# 164. DATA COVERAGE

Dossier Astra deve mostrar coverage por domínio.

No momento esperado:

```text
Specs: high
Pricing: high
Plans: medium/high during rollout
Coding benchmarks: high
Science: high
Long context: high
Computer use: high
Independent speed: low
Community: low/new
Architecture details: low
Local hardware: N/A
```

Calcular com engine atual, não hardcode percentuais arbitrários.

---

# 165. COMMUNITY

Não fabricar community reports apenas porque o modelo foi lançado.

Aguardando relatos reais.

Se houver poucos relatos:

```text
Community evidence: insufficient / early
```

---

# 166. HISTORY / SOURCE DRIFT

Quando um score mudar devido a benchmark refresh:

não apagar.

Exemplo:

```text
2026-09-03
OpenAI launch snapshot TB Science: 64.6

2026-09-04
Snorkel current max leaderboard: 65.4
```

Isso deve aparecer em historical benchmark view.

---

# 167. AA VERSIONS

Não tratar:

```text
AA Index v4.1.1
AA Index v4.2
```

como o mesmo benchmark histórico sem version distinction.

Eles possuem composição/metodologia diferente.

Rank delta entre versões não é puro model improvement.

---

# 168. DEEPSWE SOURCE DRIFT

Se DataCurve e BenchSift divergirem em custo do mesmo row:

- score/source primary prevalece;
- custos devem receber source-specific run records;
- não escolher o menor custo por conveniência;
- abrir primary live leaderboard antes do commit.

---

# 169. TERMINAL-BENCH VERSIONING

TB4 não é comparável 1:1 com:

- TB3;
- TB2.1.

No ledger composto, nunca tratar os três como três sinais independentes sem family normalization.

---

# 170. SECURITY ACCESS

Não confundir:

```text
GPT-6 Astra standard production
Daybreak Blue
Daybreak Red
```

Daybreak access tiers são offerings/access regimes especiais.

Não criar `GPT-6 Astra Blue` ou `GPT-6 Astra Red` como modelos se a OpenAI não os declarar modelos independentes.

---

# 171. CYBER BENCHMARK DISPLAY

Adicionar disclaimer:

> Algumas avaliações medem capability sem todas as safeguards de produção. O acesso real do usuário pode ser mais restrito.

Isso é importante para interpretar 100% ExploitBench.

---

# 172. ZDR

No model dossier:

```text
API ZDR: eligible customers / configured environments
```

No plan dossier:

usar a política do plano/workspace.

Nunca herdar automaticamente `ZDR=true` do modelo para todo plano.

---

# 173. SNAPSHOT / IMMUTABILITY

A API model card atualmente pode listar apenas o alias:

```text
gpt-6-astra
```

Se ainda não houver dated snapshot ID:

```text
immutableSnapshotId: null
```

Não inventar `gpt-6-astra-2026-09-03`.

---

# 174. RELEASE DATE DISCREPANCIES

ARC Prize page pode mostrar timestamp/entry de 02/09 enquanto OpenAI public launch é 03/09.

Não tratar isso como contradição automática.

Possíveis semantics:

- evaluation submission date;
- pre-release benchmark date;
- public launch date.

Canonical release date do modelo no catálogo:

```text
2026-09-03
```

---

# 175. SCHEMA VERSION

Se adicionar campos novos para Astra que são generalizáveis, incrementar schema version conforme metodologia atual.

Não adicionar campos Astra-only no root quando o conceito serve para todos os modelos.

Exemplos generalizáveis:

- cacheWrite price;
- longContextPricing;
- serviceTierPricing;
- reasoningConfiguration;
- productOffering;
- planSurfaceAccess;
- evaluationOnlyConfiguration.

---

# 176. README

Atualizar README apenas quando necessário.

Evitar trocar:

```text
44 modelos
```

por outro literal.

Preferir linguagem que não envelhece ou contador derivado no app.

Adicionar GPT-6 Astra à lista de exemplos se o README mantém exemplos de frontier models.

---

# 177. AUDIT TEXT COMPETITIVO

Após adicionar Astra, rodar detector de termos:

```text
líder
campeão
melhor
#1
recorde
absoluto
```

Revisar todas as ocorrências potencialmente envelhecidas.

A entrada de Astra pode invalidar claims antigos de Sol, Opus, Fable, Gemini etc.

---

# 178. IMPACT EXPECTATIONS

Sem hardcode, é plausível que Astra afete:

- TB4 leader;
- TB Science leader;
- long-context recommendation;
- computer-use recommendation;
- OpenAI flagship role;
- premium coding recommendation;
- cost/task Pareto;
- plan selection.

Deixar `DomainImpact` produzir o relatório real.

---

# 179. TEST COMMANDS

Executar a suite atual completa.

Além de `npm test`, rodar os scripts de qualidade existentes no `package.json`.

Verificar:

- data integrity;
- domain;
- routes;
- links;
- smoke;
- CI workflow;
- console.

---

# 180. ROUTE

Dossier:

```text
#model/gpt-6-astra
```

Deep link deve funcionar em:

- refresh;
- browser back;
- browser forward;
- command palette;
- model card;
- comparison;
- plans;
- provider page.

---

# 181. ACCEPTANCE — DATA

A implementação só está concluída quando:

- `gpt-6-astra` existe uma única vez no catálogo canônico;
- GPT-6 Pro não é duplicado como modelo;
- specs oficiais estão corretos;
- todos os cinco efforts públicos existem;
- Non-reasoning está marcado evaluation-only;
- pricing modes estão modelados;
- >272K pricing está modelado;
- rate limits estão presentes;
- source registry está completo;
- benchmark versions/harnesses estão separados;
- planos OpenAI foram atualizados;
- history foi atualizado.

---

# 182. ACCEPTANCE — DOSSIER

Dossier precisa exibir:

- identity;
- pricing;
- reasoning explorer;
- effort benchmark matrix;
- independent vs official evidence;
- plans;
- quotas;
- Work/Codex burn;
- API pricing;
- safety;
- strengths;
- limitations;
- sources;
- freshness;
- coverage.

---

# 183. ACCEPTANCE — METROLOGY

Falhar a tarefa se:

- ARC 99.9 aparecer sem Provider Adapter;
- official best-of-effort scores forem rotulados `max` sem fonte;
- speed N/D virar número inventado;
- Plus aparecer com GPT-6 Pro Chat;
- Work/Codex quota for confundida com Chat quota;
- API Fast 2× for confundido com Work/Codex Fast 2.5×;
- ZDR for aplicado a todos os planos;
- TB4/3/2.1 forem tratados como mesma execução;
- AA v4.1.1 for sobrescrito por v4.2;
- mirror tiver prioridade sobre source primary.

---

# 184. ACCEPTANCE — DYNAMIC SYSTEM

Depois da integração:

- Home recalcula destaques;
- Models count recalcula;
- Use Cases recalculam;
- Comparator inclui Astra;
- Pareto inclui Astra quando elegível;
- Router considera Astra;
- Provider OpenAI inclui Astra;
- Plans mostram Astra por surface;
- Data Health reconhece novas fontes/runs;
- Impact Engine mostra mudanças.

---

# 185. FINAL IMPLEMENTATION REPORT

Ao terminar, entregar relatório contendo:

## Files changed

Lista real.

## Canonical model

Schema final.

## Reasoning configurations

Como foram representadas.

## Benchmark runs

Contagem por source/version/effort.

## Plans

Quais foram atualizados.

## Pricing

Como Standard/Batch/Flex/Fast/long-context foram modelados.

## Safety

Quais dados entraram.

## Data conflicts

Qualquer divergência encontrada.

## Review queue

Dados ainda N/D.

## Tests

Comandos e resultados.

## Impact Engine

Mudanças calculadas no portal.

---

# 186. RESUMO DOS NÚMEROS MAIS IMPORTANTES PARA VALIDAÇÃO RÁPIDA

```text
MODEL
GPT-6 Astra
gpt-6-astra
Release: 2026-09-03
Context: 1,050,000
Max output: 128,000
Cutoff: 2026-04-30
Efforts: low medium high xhigh max

API STANDARD
Input: $10/M
Cached: $1/M
Cache write: $12.50/M
Output: $50/M

LONG CONTEXT >272K
Input: 2x
Cache: 2x
Output: 1.5x

BATCH/FLEX
0.5x Standard

FAST API
2x applicable pricing

AA v4.1.1
low 57 / $0.46
medium 59 / $0.75
high 60 / $0.96
xhigh 61 / $1.20
max 61 / $1.67
non-reasoning 55 / $0.93 [evaluation-only]

DEEPSWE
low 67.0 / $2.19
medium 72.8 / $4.38
high 73.2 / $5.72
xhigh 74.1 / $6.52
max 73.2 / $12.37

TB4
low 50.61
medium 54.24
high 57.88
xhigh 57.88
max 58.18

TB SCIENCE
low 55.4
medium 57.4
high 62.0
xhigh 60.9
max 65.4

ARC3 STANDARD
low 17.45
medium 38.59
high 54.82
xhigh 59.34
max 62.71

ARC3 PROVIDER ADAPTER
low 98.03
medium 98.44
high 99.95
xhigh 98.44
max 98.55

GPT-6 PRO CHAT
Plus: no
Pro100: 50/week shared with Sol Pro
Pro200: 200/week Astra; Sol Pro 170/day; combined 200/day
Business Standard: 15/month shared
Business Premium: 50/week shared
Enterprise: admin/contract

BUSINESS STANDARD WORK/CODEX ESTIMATES / 5H
Astra: 3-30
Sol: 10-100
Terra: 25-200
Luna: 250-2000

WORK/CODEX CREDIT RATES / 1M
Astra: 250 / 25 / 1250
Sol: 100 / 10 / 500
Terra: 50 / 5 / 300
Luna: 5 / 0.5 / 30

PREPAREDNESS
Cyber: CRITICAL
Bio/Chem: HIGH
AI self-improvement: below HIGH
```

---

# 187. CONCLUSÃO METODOLÓGICA

GPT-6 Astra deve entrar no portal como o primeiro modelo cujo dossier trata **reasoning effort como dimensão econômica e metrológica de primeira classe**.

O dado mais importante não é simplesmente:

```text
GPT-6 Astra é melhor que X
```

O dado importante é:

```text
Em qual benchmark?
Com qual effort?
Com qual harness?
Com qual custo?
Com quantos tokens?
Em qual plano/surface?
Sob qual versão?
```

Astra demonstra claramente por que o projeto precisa abandonar comparações simplistas de “modelo vs modelo” e avançar para:

```text
Model
+ Configuration
+ Offering
+ Benchmark Run
+ Plan Entitlement
+ Evidence
+ Time
```

Implemente GPT-6 Astra respeitando essa arquitetura.

Não faça apenas uma inclusão superficial no catálogo.

Crie um dossier profundo, auditável, versionado e capaz de continuar correto quando novas medições forem publicadas.
