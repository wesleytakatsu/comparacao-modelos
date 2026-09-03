# ATUALIZAÇÃO E EXPANSÃO ESTRUTURAL DO PROJETO `wesleytakatsu/comparacao-modelos`

Você está trabalhando diretamente no projeto:

`https://github.com/wesleytakatsu/comparacao-modelos`

Site publicado:

`https://wesleytakatsu.github.io/comparacao-modelos/`

Sua missão é transformar este projeto de um comparador técnico baseado principalmente em benchmarks em um **portal completo de decisão sobre modelos de IA, plataformas, planos, custos, histórico, casos de uso e experiência real da comunidade**.

A data de referência desta atualização é **3 de setembro de 2026**.

Não faça apenas uma análise ou plano.
**Implemente as alterações efetivamente no repositório, pesquise dados atuais na internet, valide tudo e teste o site.**

---

# 1. OBJETIVO GERAL

O portal deve responder não apenas:

> “Qual modelo tem o benchmark maior?”

Mas também perguntas como:

> “Tenho R$300 por mês. Qual combinação de planos e modelos é melhor para programação?”

> “Qual modelo é melhor para criar um SaaS grande?”

> “Qual é melhor para jogos Unity, Unreal, Godot ou Three.js?”

> “Qual é melhor para frontend?”

> “Qual modelo costuma overengineer?”

> “Qual é melhor para debugging de código legado?”

> “Qual consome mais cota?”

> “Qual modelo é melhor como arquiteto e qual é melhor como executor?”

> “Esse modelo ainda existe?”

> “Qual modelo substituiu esse?”

> “Quanto custa esse plano em dólares e em reais?”

> “O que os benchmarks dizem e o que usuários reais dizem?”

O portal deve se tornar um **ledger técnico + guia operacional + comparador econômico + histórico de modelos + agregador de experiência prática**.

---

# 2. PRINCÍPIOS OBRIGATÓRIOS

## 2.1 Não inventar dados

Use esta hierarquia:

### O — Oficial

Documentação, model cards, pricing pages, release notes e páginas do fabricante.

### T — Third-party / independente

Artificial Analysis, CursorBench, DeepSWE/DataCurve, ARC Prize, SWE-bench, Terminal-Bench etc.

### C — Community / anecdotal

Reddit, fóruns, Hacker News, GitHub issues/discussions, comunidades de Cursor/Claude/OpenAI/Z.ai etc.

### E — Estimativa calibrada

Somente para scores derivados, radar, projeções e métricas sem medição direta.

Nunca apresente relato da comunidade como benchmark científico.

Nunca apresente estimativa como dado oficial.

---

# 3. PRIMEIRO: AUDITAR A BASE ATUAL

Leia integralmente:

* `data.js`
* `app.js`
* `index.html`
* `style.css`
* `README.md`
* `info-modelos-ia.md`
* `plano-preenchimento-dados.md`
* `planejamento-implementacao.md`
* `MELHORIAS-UX.md`
* `scripts/audit-data.js`
* qualquer outro arquivo relevante

Antes de adicionar novas features, procure inconsistências atuais.

---

# 4. CORRIGIR PROBLEMAS EXISTENTES DE PROVENANCE

Existem sinais de campos duplicados e fontes misturadas dentro de `data.js`.

Procure especialmente por propriedades JS duplicadas como:

```js
sourceConfidence
sources
pricing
officialBenchmarks
```

em um mesmo objeto.

Exemplo de problema a detectar:

```js
{
  sources: ['fonte-a'],
  sources: ['fonte-b']
}
```

JavaScript silenciosamente sobrescreve o primeiro valor.

O audit script atual provavelmente não detecta isso.

## Implementar detecção

Crie uma verificação estática ou parser que detecte duplicate object keys no código-fonte, especialmente dentro do catálogo de modelos.

---

# 5. PROVENANCE POR FATO, NÃO APENAS POR MODELO

Hoje um modelo pode ter:

```js
sources: [
  'official-model-card',
  'cursorbench',
  'artificial-analysis'
]
```

Isso não é suficiente.

Não sabemos qual fonte sustenta qual número.

Criar um schema mais rigoroso.

Exemplo:

```js
benchmarks: {
  terminalBench21: {
    value: 91.4,
    sourceId: 'artificial-analysis-fable51',
    sourceType: 'independent',
    benchmarkVersion: '2.1',
    effort: 'max',
    harness: 'Artificial Analysis',
    snapshotDate: '2026-09-02'
  }
}
```

ou uma estrutura central equivalente.

O importante é que cada fato importante possa responder:

* qual fonte?
* oficial ou independente?
* qual versão?
* qual effort?
* qual harness?
* qual data?
* tools habilitadas?
* número de trials?
* confidence interval?
* custo/tarefa?
* tokens?
* steps?

---

# 6. NÃO MISTURAR BENCHMARKS OFICIAIS E INDEPENDENTES

Audite os modelos atuais.

Por exemplo:

Artificial Analysis:

* Terminal-Bench 2.1
* SciCode
* HLE

não deve aparecer dentro de:

`officialBenchmarks`

somente porque pertence ao mesmo modelo.

Separar claramente:

```js
officialBenchmarks
independentBenchmarks
communityEvaluations
calibratedScores
```

---

# 7. CORRIGIR DADOS HISTÓRICOS DOS MODELOS

O catálogo atual não deve ser descrito simplesmente como “44 modelos ativos”.

Há modelos:

* active
* stable
* preview
* superseded
* legacy
* retired
* historical
* stealth-revealed

Use uma nomenclatura correta.

A frase padrão deve ser algo como:

> “44 modelos catalogados”

e não:

> “44 modelos ativos”

quando alguns já foram substituídos.

---

# 8. CRIAR UM SISTEMA DE HISTÓRICO / LINHAGEM DOS MODELOS

Adicionar uma nova estrutura:

```js
MODEL_HISTORY_DATA
```

ou arquitetura equivalente.

Cada modelo deve possuir timeline.

Exemplo:

```js
{
  modelId: 'glm-5-3-flash',

  predecessors: [],
  successors: [],
  historicalAliases: ['Ox Alpha', 'stealth/ox-alpha'],

  events: [
    {
      date: '2026-08-20',
      type: 'stealth-preview',
      title: 'Modelo aparece anonimamente como Ox Alpha'
    },
    {
      date: '2026-08-26',
      type: 'identity-reveal',
      title: 'Z.ai revela Ox Alpha como GLM-5.3-Flash'
    },
    {
      date: '2026-08-26',
      type: 'pricing-change',
      title: 'Preview gratuito encerrado'
    }
  ]
}
```

---

# 9. TIPOS DE EVENTOS HISTÓRICOS

Suportar pelo menos:

```text
announcement
preview
stealth-preview
identity-reveal
release
general-availability
weights-released
license-change
pricing-change
quota-change
benchmark-update
context-upgrade
tool-support-added
added-to-cursor
removed-from-cursor
added-to-antigravity
removed-from-antigravity
added-to-opencode
removed-from-opencode
renamed
superseded
deprecated
retired
```

---

# 10. CRIAR TELA “HISTÓRICO & LINHAGENS”

Adicionar nova rota da SPA.

Sugestão:

`#history`

ou:

`#timeline`

A página deve permitir:

* timeline cronológica geral;
* filtro por provider;
* filtro por família;
* visualizar predecessor → sucessor;
* aliases antigos;
* datas de lançamento;
* mudanças de preço;
* aposentadorias;
* mudanças de benchmark;
* lançamento de pesos;
* adição/remoção de plataformas.

---

# 11. VISUALIZAÇÃO DE LINHAGEM

Exemplo:

```text
Claude

Opus 4.6 ─────────────→ Opus 5

Sonnet 4.6 ───────────→ Sonnet 5

Fable 5 ──────────────→ Fable 5.1
```

Outro exemplo:

```text
GLM

5.1 → 5.2 → 5.3
             \
              → 5.3-Flash
                    ↑
                 Ox Alpha
             stealth preview
```

Outro:

```text
Gemini

3.1 Pro
   │
3.5 Flash
   │
3.7 Flash
   │
3.8 Flash
```

Não crie relações sem evidência.

---

# 12. HISTÓRICO DE BENCHMARKS

Não sobrescrever silenciosamente benchmarks antigos.

Criar:

```js
BENCHMARK_HISTORY_DATA
```

Exemplo:

```js
{
  modelId: 'gemini-3-8-flash',
  benchmark: 'DeepSWE',
  benchmarkVersion: '1.1',
  date: '2026-09-02',
  score: 74,
  confidenceInterval: 1,
  costPerTaskUsd: 2.36,
  tokensPerTask: 143000,
  agentSteps: 166,
  sourceId: 'deepswe-datacurve'
}
```

Isso permitirá gráficos de evolução.

---

# 13. CRIAR GRÁFICOS DE EVOLUÇÃO

Permitir comparações como:

### Claude Fable

```text
Fable 5
↓
Fable 5.1
```

Mostrar evolução:

* CursorBench
* AA Intelligence
* custo por tarefa
* tokens/tarefa
* throughput
* HLE
* Terminal-Bench

### Gemini

```text
3.5 Flash
3.7 Flash
3.8 Flash
```

### GLM

```text
5.1
5.2
5.3
5.3-Flash
```

---

# 14. CRIAR BANCO DE PLANOS / ASSINATURAS

Criar:

```js
SUBSCRIPTION_PLANS_DATA
```

Não misturar com API pricing.

Cada plano deve conter:

```js
{
  provider: 'cursor',
  product: 'Cursor',
  planId: 'cursor-pro-plus',
  planName: 'Pro+',

  nativeCurrency: 'USD',
  monthlyPrice: 60,

  annualPrice: null,

  billingUnit: 'user',
  billingPeriod: 'monthly',

  includedModels: [],
  pools: [],
  quotaDescription: '',
  overage: '',

  current: true,

  sourceId: '',
  verifiedAt: '2026-09-03'
}
```

---

# 15. PESQUISAR TODOS OS PLANOS RELEVANTES

Incluir, quando existirem:

## OpenAI / ChatGPT

Pesquisar e atualizar:

* Free
* Go
* Plus
* Pro
* Pro 5x / 20x, caso essa nomenclatura continue vigente
* Business
* Enterprise quando houver preço público ou “contact sales”

Registrar:

* preço
* limites
* modelos
* Codex
* contexto
* quotas
* overage/credits
* restrições.

---

# 16. Anthropic / Claude

Pesquisar:

* Free
* Pro
* Max
* Max 5x
* Max 20x
* Team Standard
* Team Premium
* Enterprise

Registrar diferenças entre:

* Claude subscription
* Claude API

Deixar explícito:

> assinatura Claude ≠ créditos de API

---

# 17. Google

Pesquisar:

* Free
* Google AI Pro
* Google AI Ultra
* níveis Ultra existentes atualmente
* Antigravity
* AI credits
* pools
* Gemini app
* Gemini API

Registrar separadamente:

```text
Google AI subscription
Gemini API
Antigravity
```

---

# 18. Cursor

Pesquisar:

* Hobby
* Pro
* Pro+
* Ultra
* Teams
* Enterprise
* pools
* included usage
* overage
* modelos Cursor
* modelos de terceiros
* Max mode
* contexto por modelo.

---

# 19. OpenCode

Pesquisar:

* Free
* Go
* outros planos atuais

Não limitar a plataforma aos modelos principais do portal.

Criar um catálogo separado de modelos por plataforma.

---

# 20. Z.ai

Pesquisar:

* Coding Lite
* Coding Pro
* Coding Max
* planos atuais
* GLM endpoints
* quotas
* consumo relativo
* API direta.

---

# 21. xAI / Grok

Pesquisar:

* Free
* SuperGrok
* SuperGrok Plus
* outros tiers atuais
* API.

---

# 22. Kimi

Pesquisar planos atuais em CNY.

Guardar preço nativo.

Exemplo estrutural:

```js
{
  nativeCurrency: 'CNY',
  monthlyPrice: 99
}
```

Depois converter dinamicamente para USD e BRL.

---

# 23. MINIMAX, QWEN, DEEPSEEK, MIMO E OUTROS

Pesquisar se existem:

* subscriptions
* coding plans
* prepaid packages
* API bundles
* free tiers
* promotional credits

Se não houver assinatura direta comparável, deixar explícito:

> “API / provider based”

e não inventar plano.

---

# 24. CÂMBIO USD → BRL

O usuário quer valores em:

* dólares
* reais

Criar estrutura central:

```js
FX_RATES_DATA = {
  USD_BRL: {
    rate: ...,
    asOf: 'YYYY-MM-DD',
    sourceId: '...'
  },

  CNY_BRL: {
    rate: ...,
    asOf: 'YYYY-MM-DD',
    sourceId: '...'
  }
}
```

Não hardcode conversão individual em cada plano.

---

# 25. MOSTRAR VALORES ASSIM

Exemplo:

```text
Cursor Pro+
US$ 60 / mês
≈ R$ 309 / mês
```

Exibir:

```text
Cotação utilizada:
US$ 1 = R$ X
Atualizado em DD/MM/YYYY
```

---

# 26. PREÇO OFICIAL LOCALIZADO TEM PRIORIDADE

Se o fornecedor realmente cobrar um valor oficial em BRL:

mostrar:

```text
Preço oficial no Brasil:
R$ XXX
```

e não apenas converter USD.

Separar:

```text
officialLocalizedPrice
```

de:

```text
convertedEstimate
```

---

# 27. IMPOSTOS E CARTÃO

Não tentar estimar automaticamente IOF ou spread sem necessidade.

Adicionar apenas nota:

> “Conversões em reais são aproximadas. Cobrança efetiva pode variar por preço localizado, impostos, IOF e câmbio do cartão.”

---

# 28. NOVA ROTA “PLANOS & PREÇOS”

Criar:

`#plans`

Permitir filtros:

* fornecedor
* preço mensal
* moeda
* individual/team
* coding-focused
* modelos incluídos
* cota
* API incluída?
* uso excedente?
* melhor para estudante
* melhor para dev diário
* melhor para heavy agentic usage.

---

# 29. CRIAR COMPARADOR DE PLANOS

Selecionar até 4 planos.

Mostrar:

```text
Preço USD
Preço BRL
Modelos
Pools
Quota
Contexto
Coding agent
API incluída?
Overage
Privacy
```

---

# 30. CRIAR “STACKS POR ORÇAMENTO”

Adicionar ferramenta:

> Quanto você pode gastar por mês?

Faixas:

```text
R$0
até R$50
até R$100
até R$200
até R$300
até R$500
até R$1.000
R$1.000+
```

Retornar combinações.

Exemplo conceitual:

```text
R$150/mês

Opção A:
Cursor Pro + OpenCode Go

Opção B:
Claude Pro + OpenCode Go

Opção C:
Google AI Pro + OpenCode Go
```

Não hardcode as recomendações.

Calcular com dados atuais dos planos.

---

# 31. CLASSIFICAR PLANOS POR PERFIL

Perfis:

```text
casual
student
indie-dev
professional-dev
heavy-agentic
team
enterprise
privacy-first
local-first
```

---

# 32. CRIAR BANCO DE RELATOS DA COMUNIDADE

Criar:

```js
COMMUNITY_REPORTS_DATA
```

Separado dos benchmarks.

Cada entrada deve conter:

```js
{
  modelId: 'gpt-5-6-sol',
  date: '2026-08-14',

  sourcePlatform: 'reddit',
  sourceUrl: '...',

  harness: 'Cursor',
  effort: 'medium',

  category: 'backend',

  sentiment: 'positive',

  observations: [
    'strong financial correctness',
    'good concurrency edge cases',
    'strong test generation'
  ],

  caveats: '',

  evidenceType: 'anecdotal'
}
```

---

# 33. FONTES DE COMUNIDADE

Pesquisar principalmente:

* Reddit
* GitHub Discussions
* GitHub Issues
* Hacker News
* fóruns oficiais
* comunidades Cursor
* comunidades Claude Code
* Z.ai
* OpenAI/Codex
* game development
* web development

Não usar sites de SEO que apenas copiam Reddit.

---

# 34. NÃO USAR UM POST ÚNICO COMO “VERDADE”

Para cada modelo/categoria, tentar encontrar múltiplos relatos.

Criar agregação.

Exemplo:

```text
Backend

GPT-5.6 Sol

Relatos analisados: 18

Positivos: 12
Neutros: 3
Negativos: 3
```

---

# 35. EXTRAIR TEMAS DOS RELATOS

Categorias positivas:

```text
architecture
debugging
speed
frontend-quality
backend-correctness
test-quality
scope-discipline
tool-use
autonomy
game-dev
long-context
```

Negativas:

```text
overengineering
quota-burn
latency
design-drift
hallucination
tool-loop
destructive-edits
verbosity
premature-finish
excessive-token-use
```

---

# 36. CRIAR “ENGINEERING BEHAVIOR”

Criar uma nova matriz além do Radar 10D:

```js
ENGINEERING_BEHAVIOR_DATA
```

Dimensões sugeridas:

```text
scopeDiscipline
overengineeringRisk
firstPassSuccess
reworkRate
autonomy
persistence
humanReviewBurden
visualTaste
instructionFollowing
testDiscipline
destructiveEditRisk
quotaEfficiency
```

---

# 37. NÃO TRATAR ESSES SCORES COMO BENCHMARK OFICIAL

Essas notas devem ser:

```text
community-calibrated
```

Mostrar claramente na UI:

> “Calibração baseada em relatos da comunidade + benchmarks operacionais.”

---

# 38. CRIAR COMPARAÇÃO POR CASO DE USO

Adicionar:

```js
USE_CASE_COMPARISON_DATA
```

Categorias principais:

### Desenvolvimento de sistemas

* arquitetura do zero
* SaaS
* backend
* APIs
* bancos de dados
* distributed systems
* microservices
* migrations
* autenticação
* pagamentos
* concorrência
* testes

### Frontend

* React
* Vue
* Svelte
* Angular
* Next.js
* UI visual
* design system
* CSS
* responsive
* screenshot iteration

### Mobile

* Flutter
* React Native
* Swift
* Kotlin
* Compose
* SwiftUI

### Jogos

* Unity
* Unreal Engine
* Godot
* Three.js
* WebGL
* Roblox
* game logic
* AI/NPC
* procedural generation
* shaders
* ECS
* networking
* physics
* performance.

### 3D

* Blender
* Three.js
* Babylon
* rendering
* shaders
* geometry
* MCP / tools

### Low-level

* C
* C++
* Rust
* reverse engineering
* embedded
* OS/kernel
* compilers

### Data

* Python
* SQL
* ETL
* notebooks
* analytics
* ML pipelines

### DevOps

* Docker
* Kubernetes
* CI/CD
* Terraform
* shell
* terminal agents

### Segurança

* secure code review
* vulnerability discovery
* threat modeling
* defensive analysis

### Legacy

* monorepos
* large codebase
* undocumented code
* migration
* refactoring
* root-cause debugging

---

# 39. PARA CADA CASO DE USO

Guardar algo parecido com:

```js
{
  useCaseId: 'game-unity',

  modelId: 'claude-fable-5-1',

  score: 96,

  evidence: {
    benchmarks: [...],
    communityReports: [...],
    architectureCapabilities: [...]
  },

  bestRole: 'architect',

  strengths: [
    'large-system planning',
    'strong C# reasoning'
  ],

  weaknesses: [
    'high quota consumption'
  ]
}
```

---

# 40. DIFERENCIAR PAPÉIS

Não perguntar somente:

> “Qual é o melhor modelo?”

Mostrar:

```text
Architect
Planner
Executor
Reviewer
Debugger
UI Specialist
Test Generator
Researcher
Subagent Worker
```

Exemplo:

```text
SaaS grande

Architect:
Fable 5.1

Main implementer:
Gemini 3.8 / Sonnet 5 / Terra

Fast workers:
Luna / Gemini Flash / Composer

Final reviewer:
Fable 5.1 / Sol
```

Esses rankings devem ser calibrados a partir dos dados atuais, não hardcoded sem justificativa.

---

# 41. CRIAR COMPARADOR DE ORQUESTRAÇÃO

Uma tela poderia permitir escolher:

```text
Projeto:
SaaS

Orçamento:
R$300/mês

Prioridade:
qualidade

Privacidade:
cloud allowed
```

E sugerir:

```text
Planner
↓
Workers
↓
Reviewer
```

com custo estimado.

---

# 42. CASO ESPECIAL: CRIAÇÃO DE SISTEMAS

Criar avaliação específica para:

```text
architecture-from-zero
database-design
backend-correctness
financial-systems
concurrency
test-generation
refactoring
maintainability
documentation
deployment
```

Dar peso maior para:

* DeepSWE
* Terminal-Bench
* SWE-bench
* tool adherence
* scope discipline
* comunidade
* long context
* testing behavior.

---

# 43. CASO ESPECIAL: GAME DEVELOPMENT

Criar página/aba dedicada.

Separar:

```text
Unity
Unreal
Godot
Three.js
Browser games
2D games
3D games
gameplay systems
tools/editor scripting
shaders
multiplayer
```

---

# 44. PARA JOGOS, NÃO USE SÓ BENCHMARKS DE CODING

Adicionar fatores:

```text
C#/C++ knowledge
visual understanding
spatial reasoning
iteration speed
MCP compatibility
engine APIs
debugging
architecture
performance reasoning
gameplay reasoning
autonomy
```

---

# 45. PESQUISAR EXPERIÊNCIAS REAIS DE GAME DEV

Pesquisar comparações atuais envolvendo:

* Claude/Fable/Opus
* GPT-5.6 Sol/Terra
* Grok
* Gemini
* GLM
* Kimi
* Composer

Com:

* Unity
* Unreal
* Godot
* Three.js

Registrar harness.

Exemplo:

```text
Claude Code + Unity MCP
```

é diferente de:

```text
Claude no chat sem tools
```

---

# 46. FRONTEND / UI

Criar score separado para:

```text
visualTaste
pixelAccuracy
responsiveTesting
browserIteration
scopePreservation
```

Levar em conta relatos de usuários.

Modelos podem ser:

* mais rápidos;
* mais estéticos;
* mais metódicos;
* mais propensos a modificar design existente.

---

# 47. HARNESS IMPORTA MUITO

Community reports devem sempre tentar identificar:

```text
Cursor
Claude Code
Codex
OpenCode
Antigravity
Cline
Aider
ZCode
OpenRouter
MCPs
skills
custom agents
```

Não diga:

> “Grok é ótimo em UI”

se os melhores relatos são na realidade:

> “Grok + Open Design + Cursor”.

---

# 48. CRIAR UI “BENCHMARK VS COMUNIDADE”

Por modelo:

```text
Fable 5.1

Benchmarks
────────────────
Agentic       100
Reasoning      99
Coding         98

Comunidade
────────────────
Architecture   ★★★★★
Big repos      ★★★★★
Game proto     ★★★★★
Speed          ★★★
Quota          ★★
Simplicity     ★★★★

Principais elogios:
...

Principais críticas:
...
```

---

# 49. MOSTRAR DIVERGÊNCIAS

Exemplos:

> “Benchmark excelente, mas usuários relatam alto consumo de quota.”

> “Modelo muito rápido, mas alguns usuários relatam design drift.”

> “Score menor no benchmark, mas comunidade elogia aderência ao escopo.”

Esse tipo de informação é valioso.

---

# 50. CRIAR CONFIDENCE SCORE PARA COMUNIDADE

Uma opinião isolada não deve ter o mesmo peso de 50 relatos.

Exemplo:

```js
communityConfidence: {
  reportCount: 23,
  recencyScore: 0.9,
  sourceDiversity: 0.8,
  confidence: 'medium-high'
}
```

---

# 51. RECÊNCIA IMPORTA

Relatos antigos de Fable 5 não devem pesar da mesma forma que relatos do Fable 5.1.

Criar decay temporal.

Exemplo:

```text
0–30 dias: peso 1.0
31–90 dias: peso 0.75
91–180 dias: peso 0.5
legacy model: histórico somente
```

---

# 52. MODELOS E PLATAFORMAS SÃO ENTIDADES DIFERENTES

Criar separação clara:

```js
AI_MODELS_DATA
```

vs

```js
PLATFORM_MODEL_CATALOG
```

O OpenCode, Cursor ou Antigravity pode oferecer modelos que não estão entre os “44 principais”.

Não adicionar todo SKU de plataforma ao catálogo principal automaticamente.

---

# 53. `PLATFORM_MODEL_CATALOG`

Exemplo:

```js
{
  platform: 'opencode-go',

  models: [
    {
      platformModelId: '...',
      canonicalModelId: '...',
      displayName: '...',
      active: true,
      quotaMultiplier: 1.5
    }
  ]
}
```

Se ainda não existe modelo canônico:

```js
canonicalModelId: null
```

---

# 54. PREÇOS DE API DEVEM SER POR CANAL

Estruturar melhor:

```js
pricing: {
  directApi: {},
  cursor: {},
  openRouter: {},
  antigravity: {},
  opencode: {}
}
```

Não usar um preço do fabricante como se fosse igual em todos os providers.

---

# 55. HISTÓRICO DE PREÇOS

Criar:

```js
PRICE_HISTORY_DATA
```

Exemplo:

```js
{
  modelId: 'gemini-3-8-flash',
  channel: 'google-api',
  effectiveFrom: '2026-09-02',
  effectiveUntil: '2026-12-31',
  input: 0.75,
  output: 3.75,
  promotional: true
}
```

Não apagar preço anterior.

---

# 56. EXPIRAÇÃO AUTOMÁTICA DE PROMOÇÕES

Se:

```text
effectiveUntil < hoje
```

o sistema deve:

* parar de exibir como preço atual;
* mover para histórico;
* usar novo preço vigente.

O audit script deve detectar promoção expirada marcada como atual.

---

# 57. VERSIONAR FX

Também criar histórico do câmbio utilizado.

Não precisa ser atualizado em tempo real.

Pode usar snapshot:

```text
Atualizado em:
03/09/2026
```

---

# 58. REORGANIZAR `data.js`

O arquivo já está grande demais.

Migrar gradualmente para:

```text
data/
  sources.js
  providers.js
  models.js
  benchmarks.js
  benchmark-history.js
  model-history.js
  plans.js
  fx.js
  pricing.js
  platforms.js
  community.js
  use-cases.js
  engineering-behavior.js
  hardware.js
  privacy.js
```

Preservar funcionamento do GitHub Pages.

Pode continuar usando JS clássico se quiser evitar build system.

---

# 59. NÃO INTRODUZIR FRAMEWORK DESNECESSÁRIO

O projeto atual é Vanilla JS.

Não migrar para React/Vue apenas por conveniência.

Preserve:

* GitHub Pages;
* zero backend;
* performance;
* facilidade de manutenção.

---

# 60. CRIAR ÍNDICE CENTRAL

Pode criar:

```js
data/index.js
```

ou carregar arquivos em ordem adequada via `<script>`.

Evitar dependências cíclicas.

---

# 61. AUDITORIA AUTOMÁTICA — MELHORAR

O script atual não deve ter:

```js
assert(modelCount === 44)
```

como verdade permanente.

Isso fará o próximo lançamento legítimo quebrar o teste.

Substituir por validação baseada em catálogo real.

---

# 62. NOVAS VALIDAÇÕES

Adicionar verificações para:

* IDs duplicados;
* duplicate object keys;
* fontes inexistentes;
* benchmark sem source;
* benchmark oficial usando source independente;
* preço promocional expirado;
* plano aposentado marcado ativo;
* endpoint morto;
* alias sem modelo canônico;
* lineage circular;
* successor inexistente;
* predecessor inexistente;
* FX stale;
* BRL convertido incorretamente;
* community report sem data;
* community report sem source URL;
* community report sem harness quando aplicável;
* community score sem quantidade de evidências;
* pricing channel sem moeda;
* benchmark history sem versão.

---

# 63. NÃO MEDIR COVERAGE COMO “TEM UM OBJETO”

O atual coverage pode considerar um modelo coberto apenas porque há um objeto preenchido.

Melhorar.

Exemplo:

```text
Pricing coverage
```

só é 100% se os preços realmente estiverem verificados e atuais.

Mostrar:

```text
current
stale
unknown
not-applicable
```

---

# 64. CRIAR FRESHNESS

Cada dado importante deve possuir:

```text
verifiedAt
```

Criar status:

```text
fresh: <= 30 dias
aging: 31–90
stale: >90
```

Para preços e planos, usar janela menor:

```text
fresh <= 14 dias
```

---

# 65. DASHBOARD DE FRESHNESS

Adicionar uma pequena seção:

```text
Dados atualizados:
97%

Preços verificados nos últimos 14 dias:
85%

Community reports dos últimos 30 dias:
73%
```

---

# 66. COMPARADOR POR CATEGORIA

Criar nova rota:

`#use-cases`

ou:

`#projects`

Com cards:

* 🏗️ Sistema / SaaS
* 🎮 Game Dev
* 🎨 Frontend / UI
* 📱 Mobile
* 🧠 Debugging
* 🧱 Monorepo
* 🔄 Refactoring
* 🛡️ Segurança
* ⚙️ DevOps
* 📊 Data/ML
* 🧬 Reverse Engineering
* 🤖 Agentic Automation

---

# 67. CADA CATEGORIA DEVE MOSTRAR

Exemplo:

## Criar SaaS

### Melhor arquiteto

...

### Melhor daily driver

...

### Melhor custo-benefício

...

### Melhor worker

...

### Melhor para debugging

...

### Melhor para frontend

...

### Melhor stack de até R$100

...

### Melhor stack de até R$300

...

### O que a comunidade diz

...

---

# 68. GAME DEV

Exemplo:

## Unity

Mostrar:

```text
Arquitetura
C#
Debugging
MCP
GameObjects
Scene understanding
Editor tooling
Performance
Quota efficiency
```

## Unreal

Dar peso a:

```text
C++
Blueprints
large codebase
performance
rendering
build systems
```

---

# 69. RANKING NÃO DEVE SER UMA MÉDIA SIMPLES

Para cada caso de uso, aplicar pesos.

Exemplo SaaS:

```text
SWE / DeepSWE           25%
Agentic                 20%
Architecture/reasoning  20%
Tools                    10%
Long context             10%
Community                 5%
Scope discipline          5%
Cost                      5%
```

Game Dev pode ter pesos diferentes.

---

# 70. EXPLICAR A PONTUAÇÃO

Ao mostrar:

```text
Fable 5.1 — 96/100 para arquitetura
```

adicionar:

> “Baseado em DeepSWE, agentic benchmarks, long-context, community reports e comportamento de planejamento.”

Não mostrar números mágicos.

---

# 71. ADICIONAR `scoreBreakdown`

Exemplo:

```js
scoreBreakdown: {
  benchmarks: 38,
  community: 18,
  multimodal: 10,
  tools: 15,
  cost: 7,
  latency: 5
}
```

---

# 72. COMPARAÇÃO DE MODELOS PELA COMUNIDADE

Criar recurso:

```text
Fable 5.1 vs GPT-5.6 Sol
```

Mostrar:

### Benchmarks

### Custos

### Comunidade

### Onde Fable ganha

### Onde Sol ganha

### Divergências

### Melhor para...

---

# 73. CAPTURAR RELATOS CONTRADITÓRIOS

Não tente criar consenso artificial.

Exemplo:

```text
Grok 4.6 UI

Relatos positivos:
- rápido
- bom com Open Design

Relatos negativos:
- design drift
- modifica layout existente

Conclusão:
harness e prompt parecem ter forte impacto.
```

Isso é melhor que:

```text
UI score = 87
```

sozinho.

---

# 74. PRIVACIDADE POR PLANO / PLATAFORMA

Ampliar.

Não usar:

```text
Anthropic = 0-day retention
```

como regra global.

Privacidade pode depender de:

* modelo;
* plataforma;
* plano;
* enterprise;
* opt-in;
* API;
* Cursor;
* OpenRouter.

Criar overrides.

---

# 75. CUSTO TOTAL DE USO

Além de API/tokens, calcular:

```text
subscription monthly cost
+
estimated overage
+
API spend
```

Assim o usuário pode comparar:

```text
Cursor Pro+
```

contra:

```text
OpenCode Go + API direta
```

---

# 76. ROI MELHORADO

Atualizar calculadora ROI para escolher:

* plano;
* modelos;
* equipe;
* horas;
* requests;
* workload.

Não usar uma média fixa como:

`$8/M tokens`

para toda API.

---

# 77. SIMULADOR DE WORKLOADS

Permitir usar:

```text
API pricing
subscription allocation
platform quota
```

de forma separada.

---

# 78. ADICIONAR “CUSTO POR RESOLUÇÃO”

Quando benchmarks fornecem:

```text
cost per task
success rate
```

calcular:

```text
costPerSolvedTask
```

Exemplo:

```text
$2.36 / 0.74
```

Não misturar automaticamente benchmarks diferentes.

---

# 79. ADICIONAR EFICIÊNCIA AGÊNTICA

Quando disponível:

```text
tokensPerSolvedTask
stepsPerSolvedTask
timePerSolvedTask
```

Isso é muito útil para Gemini 3.8 vs Fable/Opus/Sol.

---

# 80. PLANOS E QUOTAS

Quando uma cota não é publicada numericamente:

não inventar:

```text
500 requests/day
```

Guardar:

```text
quotaType: 'opaque'
description: 'work-based'
```

---

# 81. QUOTA HISTORY

Histórico de mudanças:

```text
Google Antigravity
OpenCode
Cursor
Claude Max
Codex
```

Especialmente quando fornecedor altera limites.

---

# 82. NOVA ROTA “PLATFORM AVAILABILITY”

Mostrar:

| Modelo | API | Cursor | OpenCode | Antigravity | OpenRouter | Local |
| ------ | --- | ------ | -------- | ----------- | ---------- | ----- |

Isso evita confusão.

---

# 83. MODELOS APOSENTADOS

Se endpoint foi encerrado:

mostrar:

```text
RETIRED
```

e:

> “Use X no lugar.”

Exemplo:

```text
Ox Alpha
→ GLM-5.3-Flash
```

---

# 84. BUSCA DEVE RESOLVER ALIASES

Pesquisar:

```text
Ox Alpha
```

deve encontrar:

```text
GLM-5.3-Flash
Anteriormente: Ox Alpha
```

Mesma lógica para IDs antigos/renomeados.

---

# 85. MELHORAR DOSSIÊ INDIVIDUAL

Cada modelo deve ter subtabs:

```text
Overview
Benchmarks
Pricing
Plans & Platforms
History
Community
Use Cases
Hardware
Privacy
Sources
```

---

# 86. OVERVIEW DO MODELO

Mostrar de forma compacta:

```text
Release
Status
Provider
Context
Output
Input modalities
API price
Best plan
Best role
Main strengths
Main weaknesses
```

---

# 87. HISTORY TAB

Mostrar eventos e predecessores.

---

# 88. COMMUNITY TAB

Mostrar:

```text
report count
positive themes
negative themes
recent quotes/resumos
harness distribution
use cases
```

Evitar reproduzir textos longos.

Preferir resumo/paráfrase e link.

---

# 89. SOURCES TAB

Listar evidências por categoria.

Exemplo:

```text
Official
Independent
Community
```

---

# 90. CRIAR “DATA QUALITY BADGE”

Por dado ou modelo:

```text
High confidence
Medium confidence
Low confidence
Community only
Estimated
```

---

# 91. NÃO CONFUNDIR “OPEN-WEIGHT” E “FREE”

Open weight pode:

* exigir hardware caro;
* ter API paga.

Free API não significa open weight.

Plano incluído não significa API grátis.

A UI deve deixar isso claro.

---

# 92. HARDWARE

Continuar mantendo modelos locais.

Acrescentar estimativa:

```text
hardwareCapexUsd
hardwareCapexBrl
powerWatts
monthlyEnergyEstimateBrl
```

Quando aplicável.

---

# 93. CUSTO LOCAL VS API

Criar comparação:

```text
GPT-OSS-120B self-host
vs
API hosted
```

Estimar break-even baseado em requests.

Marcar como estimativa.

---

# 94. HISTÓRICO DE HARDWARE

Não é prioridade, mas se fácil, guardar:

```text
minimum configuration
recommended configuration
benchmark configuration
```

---

# 95. README

Atualizar README para explicar novas capacidades.

Adicionar:

* Planos USD/BRL
* Histórico
* Community reports
* Use-case rankings
* Stack budget planner
* Provenance
* Freshness

---

# 96. `info-modelos-ia.md`

Expandir para incluir:

* planos;
* disponibilidade;
* histórico;
* sucessores;
* comunidade;
* casos de uso;
* comparações práticas.

---

# 97. NÃO DUPLICAR MANUALMENTE DADOS

O Markdown deve ser gerado ou sincronizado quando possível.

Evitar editar:

```text
price = $20
```

em cinco arquivos diferentes.

Uma fonte canônica.

---

# 98. UI / UX

Preserve visual atual.

Adicionar navegação sem deixar sidebar excessivamente grande.

Sugestão:

### Modelos

* Dashboard
* Comparador
* Histórico
* Casos de Uso

### Benchmarks

* Benchmarks
* Radar
* Pareto
* Artificial Analysis

### Economia

* Planos
* API & Tokens
* ROI
* Hardware

### Plataformas

* Availability
* Harnesses
* Antigravity

### Pesquisa

* Community
* Privacy
* Troubleshooting
* Sources

---

# 99. MOBILE

Todas as novas tabelas precisam funcionar no celular.

Use:

* cards;
* horizontal scroll controlado;
* filtros;
* collapsible sections.

---

# 100. TESTES

Executar:

```bash
node --check data.js
node --check app.js
node --check server.js
node scripts/audit-data.js
```

Se separar dados em arquivos, verificar todos.

---

# 101. CRIAR TESTES DAS NOVAS ESTRUTURAS

Validar:

```text
SUBSCRIPTION_PLANS_DATA
MODEL_HISTORY_DATA
BENCHMARK_HISTORY_DATA
COMMUNITY_REPORTS_DATA
USE_CASE_COMPARISON_DATA
ENGINEERING_BEHAVIOR_DATA
FX_RATES_DATA
PLATFORM_MODEL_CATALOG
```

---

# 102. TESTAR ROTAS NOVAS

Testar:

```text
#plans
#history
#community
#use-cases
```

ou nomes escolhidos.

---

# 103. TESTAR CÂMBIO

Validação:

```text
monthlyPriceUsd * fxRate
≈ convertedBrl
```

com tolerância de arredondamento.

---

# 104. TESTAR HISTÓRICO

Nenhum evento pode apontar para modelo inexistente.

---

# 105. TESTAR ALIASES

`ox-alpha` deve redirecionar corretamente.

---

# 106. TESTAR COMMUNITY REPORTS

Nenhum relatório sem:

* source
* date
* model
* evidenceType.

---

# 107. PESQUISA NA INTERNET

Pesquise sempre que houver dúvida.

Prioridade de fontes:

1. fornecedor oficial;
2. benchmark owner;
3. documentação da plataforma;
4. Reddit/GitHub/HN para experiência;
5. imprensa técnica confiável.

---

# 108. COMUNIDADE: RECÊNCIA

Priorizar relatos de:

* últimos 30 dias;
* depois 90 dias.

Evitar usar experiência com versões antigas para modelos novos.

---

# 109. COMPARAÇÕES ESPECÍFICAS QUE DEVEM SER PESQUISADAS

Buscar relatos e evidências para:

```text
Fable 5.1 vs GPT-5.6 Sol
Fable 5.1 vs Opus 5
Gemini 3.8 vs Fable 5.1
Gemini 3.8 vs Gemini 3.7
Grok 4.6 vs GPT-5.6 Sol
Grok 4.6 vs GLM-5.3
GLM-5.3 vs GLM-5.3-Flash
Sonnet 5 vs Opus 5
Composer 2.5 vs frontier models
OpenCode models vs Cursor models
```

---

# 110. PESQUISAR POR PROJETO

Buscar especificamente:

```text
best AI model Unity game development 2026
Claude Fable Unity
GPT-5.6 Sol Unity
Grok 4.6 frontend
GLM-5.3 frontend
Gemini 3.8 coding experience
Fable 5.1 large codebase
Sol overengineering
Opus 5 architecture
Claude Code Unreal
AI coding Godot
```

e equivalentes.

---

# 111. NÃO USAR MARKETING COMO COMMUNITY SIGNAL

Se um fabricante diz:

> “best coding model”

isso é marketing/oficial.

Não entra em `COMMUNITY_REPORTS_DATA`.

---

# 112. QUOTES

Não copie posts inteiros.

Guardar resumo e, quando necessário, citação curta.

---

# 113. REPRESENTAR INCERTEZA

Se community reports estão divididos:

mostrar:

```text
Mixed
```

e explicar.

---

# 114. RESULTADO FINAL DO AGENTE

Ao concluir, entregar relatório com:

### Estrutura

* arquivos criados;
* arquivos alterados;
* novas rotas;
* novos datasets.

### Dados

* quantidade de planos;
* quantidade de preços USD;
* quantidade de preços BRL;
* quantidade de eventos históricos;
* quantidade de community reports;
* quantidade de casos de uso;
* quantidade de plataformas.

### Correções

* dados incorretos encontrados;
* provenance corrigida;
* planos desatualizados;
* benchmarks reclassificados;
* endpoints aposentados.

### Fontes

* oficiais;
* independentes;
* community.

### Testes

* comandos executados;
* resultados;
* warnings.

### Pendências

* campos N/D;
* planos sem preço público;
* benchmarks ainda não disponíveis;
* community confidence baixo.

---

# 115. RESULTADO ESPERADO

Ao fim desta atualização, o portal deve permitir que um usuário faça uma decisão completa.

Exemplo:

```text
Objetivo:
Criar jogo Unity complexo

Orçamento:
R$300/mês

Prioridade:
qualidade

Resultado:

Arquiteto:
Claude Fable 5.1

Worker:
Gemini 3.8 Flash

Alternativa econômica:
...

Plano recomendado:
...

Custo:
US$ ...
≈ R$ ...

Benchmarks:
...

Relatos da comunidade:
...

Pontos fortes:
...

Riscos:
quota burn, latency, overengineering etc.

Orquestração:
Fable → Gemini workers → Fable review
```

Outro:

```text
Objetivo:
Backend financeiro

Melhor qualidade:
GPT-5.6 Sol

Melhor equilíbrio:
...

Melhor barato:
...

Por quê:
benchmarks + community behavior + testing discipline
```

---

# 116. REGRA FINAL

Não transforme o portal em um amontoado de números.

Cada informação precisa servir à pergunta:

> “Qual modelo, plano e plataforma eu deveria escolher para o meu trabalho real?”

O projeto deve combinar:

**Benchmarks**
+
**Preço**
+
**Planos**
+
**Cotas**
+
**Histórico**
+
**Plataformas**
+
**Hardware**
+
**Experiência da comunidade**
+
**Casos de uso**
+
**Orquestração**

com provenance e indicação clara de confiança.

Implemente de forma incremental, preserve compatibilidade com GitHub Pages e mantenha o projeto fácil de atualizar quando novos modelos aparecerem.
