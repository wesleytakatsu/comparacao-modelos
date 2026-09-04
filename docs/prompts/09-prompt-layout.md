# PROMPT MESTRE — FASE 2 DE REFATORAÇÃO TÉCNICA, DOMÍNIO TEMPORAL, BENCHMARK RUNS, DATA HEALTH E MODULARIZAÇÃO

Você é um **engenheiro de software sênior, arquiteto frontend, engenheiro de dados, especialista em sistemas de benchmarking de IA, modelagem temporal e UX para produtos densos em dados**.

Sua missão agora é executar a **segunda fase de evolução** do projeto abaixo.

## Projeto

Site:

https://wesleytakatsu.github.io/comparacao-modelos/

Repositório:

https://github.com/wesleytakatsu/comparacao-modelos

Trabalhe sobre o **estado atual real do branch `main`**, incluindo as alterações mais recentes.

A primeira grande reorganização de interface e arquitetura de informação já foi feita.

Portanto:

**NÃO refaça novamente a navegação principal do zero.**

A sidebar, Home, rota de modelos, comparador integrado e camada inicial de domínio já foram melhorados.

Agora o foco deve ser:

* corrigir bugs conceituais restantes;
* amadurecer a camada de domínio;
* eliminar hardcodes temporais;
* separar modelo/configuração/oferta/execução;
* estruturar benchmarks como runs reproduzíveis;
* criar um sistema real de claims/evidências;
* melhorar dossiers das demais entidades;
* criar Data Health;
* criar Impact Engine;
* modularizar o frontend;
* melhorar testes e manutenção futura.

---

# 1. REGRA PRINCIPAL

A arquitetura deve obedecer ao princípio:

> **Dados armazenam fatos.**
>
> **Domínio calcula rankings, relações e recomendações.**
>
> **Interface explica os resultados.**

Nenhuma dessas responsabilidades deve ser misturada.

---

# 2. NÃO FAZER NOVO REWRITE VISUAL

A navegação principal atual já melhorou substancialmente.

Preserve:

* Home atual;
* Modelos;
* Planos;
* Casos de Uso;
* Comparar;
* Decidir;
* Ferramentas;
* Pesquisa & Evidências;
* Quick Inspector;
* Command Palette;
* tema claro/escuro;
* comparação;
* filtros;
* charts;
* rotas compatíveis.

Faça apenas ajustes visuais necessários para suportar os novos recursos.

Não transformar esta tarefa numa nova rodada de redesign cosmético.

---

# 3. PRIMEIRA ETAPA — AUDITORIA DO ESTADO ATUAL

Antes de alterar qualquer arquivo:

1. leia o `main` atual;
2. identifique exatamente o último commit;
3. leia as implementações existentes;
4. confirme o que já foi implementado;
5. só então altere.

Revise pelo menos:

* `app.js`
* `data.js`
* `data/domain.js`
* `data/dossiers.js`
* `data/plans.js`
* `data/plan-explorer.js`
* `data/platforms.js`
* `data/history.js`
* `data/use-cases.js`
* `data/community.js`
* `data/behavior.js`
* `scripts/audit-data.js`
* `index.html`
* `style.css`
* `package.json`
* `README.md`

Procure especialmente:

* hardcodes de data;
* hardcodes de vencedor;
* strings competitivas;
* contagens fixas;
* inconsistência de nomenclatura de evidência;
* valores factualizados dentro do domínio;
* rankings com filtros frágeis;
* deep links que apenas abrem modal;
* arquivos grandes demais;
* responsabilidades misturadas;
* dados redundantes;
* campos que deveriam ter ID em vez de string.

---

# 4. CORRIGIR URGENTEMENTE O SISTEMA DE FRESHNESS

Hoje o `DomainFreshness` não pode possuir uma data atual fixa.

É proibido algo como:

```js
const now = new Date('2026-09-04');
```

em código de produção.

Refatore para:

```js
getFreshness(dateStr, options?)
```

ou estrutura equivalente.

O relógio real deve vir de:

```js
new Date()
```

em produção.

Para testes determinísticos, permitir injeção:

```js
getFreshness(dateStr, {
  now: new Date('2026-09-04')
})
```

---

# 5. REMOVER TEXTOS DE DATA HARDCODED

Não retornar textos como:

```text
Hoje (03/09/2026)
```

hardcoded.

Gerar dinamicamente.

Exemplo:

```text
Hoje
Ontem
há 3 dias
verificado em 02/09/2026
```

quando apropriado.

---

# 6. FRESHNESS POR TIPO DE DADO

Não usar uma única política como:

```text
0–15 dias = recente
16–45 = válido
>45 = legado
```

para tudo.

Criar políticas por domínio.

Exemplo conceitual:

```js
FRESHNESS_POLICIES = {
  pricing: {
    freshDays: 7,
    staleDays: 14
  },

  plans: {
    freshDays: 7,
    staleDays: 14
  },

  availability: {
    freshDays: 7,
    staleDays: 14
  },

  benchmarks: {
    freshDays: 30,
    staleDays: 90
  },

  specs: {
    freshDays: 90,
    staleDays: 180
  },

  architecture: {
    freshDays: 180,
    staleDays: 365
  },

  community: {
    freshDays: 60,
    staleDays: 120
  }
}
```

Ajuste números se houver motivo metodológico melhor.

---

# 7. NOMENCLATURA DE FRESHNESS

Não usar `legacy` como status temporal.

`legacy` já pertence ao lifecycle do modelo.

Para freshness usar algo como:

```text
fresh
aging
stale
unknown
```

Para lifecycle continuar usando:

```text
active
stable
preview
superseded
legacy
retired
stealth-revealed
```

---

# 8. ELIMINAR DATAS HARDCODED NO DOMAIN

Funções como:

```text
getBenchmarkLeader()
getBestValueModel()
getFastestModel()
getBestLocalModel()
```

não podem retornar:

```js
verifiedAt: '2026-09-02'
```

porque o domain não deve inventar essa data.

Sempre puxar de:

* benchmark run;
* evidence;
* source;
* registry;
* record original.

Exemplo:

```js
verifiedAt: run.verifiedAt
sourceId: run.sourceId
```

---

# 9. CORRIGIR TODOS OS CONTADORES FIXOS

Atualmente existem lugares onde diferentes contagens aparecem no HTML.

Nunca armazenar:

```text
44
47
49
58
```

como verdade visual quando esses números podem ser derivados.

Criar algo como:

```js
getCatalogStats()
```

retornando:

```js
{
  modelCount,
  activeModelCount,
  historicalModelCount,
  planCount,
  benchmarkRunCount,
  sourceCount,
  providerCount,
  platformCount
}
```

Toda interface deve usar essa função.

No HTML usar placeholders:

```html
<span id="modelCount">—</span>
```

Nenhum contador factual deve ser congelado.

---

# 10. CORRIGIR O RANKING DE MODELOS LOCAIS

Audite `getBestLocalModel()`.

É proibido filtrar hardware apenas procurando `"TB"` dentro de strings.

Não assumir que:

```text
160 GB
```

é viável numa GPU única consumer.

Normalizar hardware.

Criar campos numéricos equivalentes a:

```js
minVramGb
recommendedVramGb
gpuCount
minimumNodeClass
```

---

# 11. CATEGORIAS DE EXECUÇÃO LOCAL

Criar categorias explícitas:

## Consumer

Até aproximadamente 24 GB em uma GPU.

## Workstation

Até aproximadamente 48–96 GB.

## Multi-GPU

Requer várias GPUs.

## Server / Datacenter

Requer hardware especializado.

Essas categorias devem ser estruturadas.

---

# 12. NÃO TER APENAS UM “CAMPEÃO LOCAL”

Separar:

```text
Melhor Local Consumer
Melhor Local Workstation
Melhor Open-Weights
Melhor Local sem limite de hardware
```

Quando aplicável.

Mostrar claramente os critérios.

---

# 13. CRIAR BENCHMARK REGISTRY GENÉRICO

Evite funções com uma sequência crescente de:

```js
if (benchmarkKey === ...)
```

Criar um registry central.

Exemplo:

```js
BENCHMARK_REGISTRY = {
  'cursorbench-3.2': {
    id: 'cursorbench-3.2',
    name: 'CursorBench 3.2',
    category: 'coding-agentic',
    direction: 'higher',
    scoreScale: 'percentage',
    provider: 'Cursor',
    sourceType: 'independent',
    ...
  },

  'terminal-bench-2.1': {...},

  'artificial-analysis-index-4.1.1': {...},

  'deepswe-1.1': {...}
}
```

---

# 14. TRANSFORMAR BENCHMARK EM ENTIDADE REAL

Criar:

```text
Benchmark
BenchmarkVersion
BenchmarkRun
```

Não tratar benchmark apenas como coluna numa tabela.

---

# 15. CRIAR `BenchmarkRun`

Esta é uma das tarefas mais importantes.

Cada execução deve conseguir representar:

```js
{
  id,

  benchmarkId,
  benchmarkVersion,

  modelId,
  configurationId,
  offeringId,

  harnessId,
  executionEnvironmentId,

  runDate,
  verifiedAt,

  score,
  scoreUnit,

  costUsd,
  tokensInput,
  tokensOutput,
  reasoningTokens,
  tokensPerTask,

  steps,
  attempts,

  ttftMs,
  throughputTps,

  confidenceInterval,
  sampleSize,

  fallbackUsed,
  fallbackRate,

  sourceId,
  evidenceType,
  provenanceType,

  notes
}
```

Não é obrigatório possuir todos os campos em todas as runs.

Campos ausentes devem ficar `null`, nunca inventados.

---

# 16. SEPARAR MODELO DE CONFIGURAÇÃO

Hoje o portal ainda aproxima conceitos como:

```text
Claude Fable 5.1
Claude Fable 5.1 Max
Claude Fable 5.1 High
```

Criar entidade:

```text
ModelConfiguration
```

Exemplo:

```js
{
  id: 'claude-fable-5-1:max',
  modelId: 'claude-fable-5-1',

  reasoningMode: 'adaptive',
  effort: 'max',

  temperature: null,
  tools: true,

  fallbackPolicy: 'default'
}
```

---

# 17. SEPARAR MODELO DE OFFERING / ROUTE

Criar entidade equivalente a:

```text
Offering
```

Representar:

```text
Anthropic API
OpenRouter
Cursor
OpenCode
Antigravity
camelAI
```

Exemplo:

```js
{
  id: 'anthropic-api:claude-fable-5-1',
  modelId: 'claude-fable-5-1',
  providerId: 'anthropic',
  platformId: 'anthropic-api',

  apiModelId: '...',
  region: 'global',

  availableFrom: '...',
  availableUntil: null
}
```

---

# 18. MODELO CANÔNICO

Garantir que cada modelo possua identidade central:

```js
{
  id,
  name,
  familyId,
  providerId,

  marketingName,

  apiModelIds: [],
  aliases: [],
  historicalAliases: [],

  releaseDate,
  status
}
```

Evitar duplicar nome e provider desnecessariamente em todos os datasets.

---

# 19. CRIAR SISTEMA DE `Claim`

Outra tarefa crítica.

Uma afirmação importante deve poder ser representada explicitamente.

Exemplo:

```js
{
  id: 'claim-fable51-aa-1',

  subjectType: 'model',
  subjectId: 'claude-fable-5-1',

  predicate: 'benchmark-score',

  benchmarkId: 'artificial-analysis-index',
  benchmarkRunId: '...',

  value: 66,

  evidenceType: 'measured',
  provenanceType: 'independent',

  sourceIds: ['...'],

  validFrom: '2026-09-01',
  validUntil: null,

  status: 'verified',

  confidence: 'high'
}
```

---

# 20. STATUS DE CLAIM

Suportar:

```text
verified
stale
superseded
disputed
estimated
needs-review
```

---

# 21. CLAIM SUPERSEDED

Quando um claim novo substituir um claim competitivo antigo:

Exemplo:

```text
Claude Opus 5 é #1 AA
```

deve passar para:

```text
superseded
```

e não apenas ficar velho.

Permitir:

```js
supersededByClaimId
```

---

# 22. DOIS EIXOS DE EVIDÊNCIA

Atualmente existem duas classificações no projeto que não devem ser confundidas.

Preserve ambas.

## Proveniência

De onde veio?

```text
O — Official
I — Independent
C — Community
```

Pode usar nomes equivalentes.

## Natureza

Como o dado foi obtido?

```text
M — Measured
D — Derived
C — Calibrated
A — Anecdotal
```

Exemplo correto:

```text
M · Independente
D · Independente
M · Oficial
A · Comunidade
C · Editorial
```

---

# 23. NÃO USAR A MESMA LETRA “C” SEM CONTEXTO

Como existe:

```text
Community
Calibrated
```

evite mostrar somente:

```text
C
```

sem distinguir eixo.

Use badges diferentes:

```text
Natureza: C · Calibrado
Fonte: Comunidade
```

ou códigos não ambíguos.

---

# 24. ATUALIZAR README E METODOLOGIA

A documentação deve refletir exatamente o sistema implementado.

Não deixar README usando:

```text
O/T/C/E
```

enquanto a interface usa:

```text
M/D/C/A
```

Explique os dois eixos.

---

# 25. CRIAR `ComparisonConfidence`

Ao comparar modelos, calcular confiança da comparação.

Considere:

```text
benchmarks compartilhados
recência
mesma versão
mesmo harness
mesma configuração comparável
fonte independente
sample size
confidence interval
coverage
```

Retornar algo como:

```js
{
  score: 0.88,
  label: 'high',
  sharedBenchmarks: 7,
  totalComparableMetrics: 9,
  warnings: []
}
```

---

# 26. MOSTRAR CONFIANÇA NO COMPARADOR

Exemplo:

```text
Confiança da comparação: Alta
Cobertura comparável: 87%
7 benchmarks diretamente comparáveis
```

Se baixa:

```text
⚠ Comparação limitada
Apenas 3 métricas possuem metodologia equivalente.
```

---

# 27. “MOSTRAR APENAS DIFERENÇAS”

Manter e melhorar esse recurso.

Quando ativado:

* esconder linhas idênticas;
* destacar diferenças relevantes;
* calcular deltas.

---

# 28. MODELO DE REFERÊNCIA

Permitir fixar um modelo.

Exemplo:

```text
Referência: Claude Fable 5.1
```

Mostrar:

```text
Gemini: -8% inteligência
Gemini: -84% custo
Gemini: +362% throughput
```

---

# 29. CRIAR TRADE-OFF SUMMARY

Gerar texto derivado.

Exemplo:

```text
Ao escolher Gemini 3.8 Flash em vez de Fable 5.1:

• perde 7 pontos no AA Index
• perde 0,6 p.p. em Terminal-Bench
• reduz custo estimado em 84%
• aumenta throughput em 360%
```

Não usar linguagem promocional.

---

# 30. PARETO EXPLICÁVEL

Ao clicar em um ponto da fronteira:

mostrar:

```text
Este modelo pertence à fronteira porque nenhum outro modelo combina simultaneamente score >= X e custo <= Y.
```

Derivar matematicamente.

---

# 31. MELHORAR CASOS DE USO

Os casos de uso já existem.

Agora cada caso deve possuir:

```js
criteria
weights
coverage
confidence
rankingMethod
evidenceIds
editorialOverrides
```

---

# 32. RANKING DE CASO DE USO DERIVADO

Não armazenar apenas:

```text
rank: 1
fitScore: 99
```

Criar cálculo.

Exemplo:

```text
coding 40%
agentic 25%
reliability 15%
cost 10%
speed 10%
```

---

# 33. SUPORTAR ANÁLISE DE SENSIBILIDADE

Mostrar quando o vencedor depende fortemente dos pesos.

Exemplo:

```text
Fable 5.1 vence no perfil padrão.

Se custo receber peso acima de 28%, Gemini 3.8 Flash passa para #1.
```

---

# 34. MODO AVANÇADO DE PESOS

Criar uma seção opcional:

```text
Personalizar critérios
```

com sliders.

Não poluir a experiência padrão.

---

# 35. DOSSIÊ REAL DE PLANO

Hoje `#plan/:id` não deve ser apenas alias para abrir modal.

Implementar página real:

```text
#plan/:id
```

---

# 36. MODAL DE PLANO CONTINUA EXISTINDO

O modal deve funcionar como:

```text
Quick Inspector de Plano
```

Mostrar resumo.

Botão:

```text
Abrir dossiê completo
```

---

# 37. DOSSIÊ DE PLANO

Mostrar:

```text
Visão Geral
Preço
Modelos
Recursos
Cotas
Overage
Privacidade
Histórico
Alternativas
Fontes
```

---

# 38. DOSSIÊ REAL DE PROVIDER

Criar:

```text
#provider/:id
```

Não apenas redirecionar para `#models?search=...`.

Mostrar:

```text
provider
model families
active models
historical models
plans
platforms
recent releases
benchmark highlights
pricing policies
sources
```

---

# 39. DOSSIÊ REAL DE PLATFORM

Criar:

```text
#platform/:id
```

Mostrar:

```text
plataforma
modelos disponíveis
planos
formas de cobrança
quota
privacy
regions
BYOK
benchmarks específicos
histórico
fontes
```

---

# 40. DOSSIÊ REAL DE CASO DE USO

Criar:

```text
#use-case/:id
```

A tela deve poder funcionar diretamente por deep link.

Mostrar:

```text
objetivo
critérios
pesos
ranking
ranking por orçamento
premium
value
local
avoid
coverage
confidence
sensitivity
evidence
```

---

# 41. CRIAR DOSSIÊ DE BENCHMARK

Criar:

```text
#benchmark/:id
```

Exemplo:

```text
#benchmark/terminal-bench-2-1
```

Mostrar:

```text
o que mede
mantenedor
versão
categoria
metodologia
harness
leaderboard
historical runs
custo
coverage
limitations
source
```

---

# 42. CRIAR TAXONOMIA DE BENCHMARKS

Categorias sugeridas:

```text
coding-agentic
reasoning
professional-work
tool-use
long-context
multimodal
truthfulness
speed-latency
cost-efficiency
```

---

# 43. DATA HEALTH

Criar uma área interna:

```text
#data-health
```

Não precisa ficar na sidebar principal.

---

# 44. DATA HEALTH — MÉTRICAS

Mostrar pelo menos:

```text
models
plans
providers
platforms
benchmarks
benchmark runs
claims
sources
```

e:

```text
fresh
aging
stale
unknown
missing sources
orphan references
superseded claims
disputed claims
needs-review
duplicate factual strings
```

---

# 45. DATA HEALTH POR DOMÍNIO

Exemplo:

```text
Pricing          93% fresh
Plans            89% fresh
Benchmarks       97% fresh
Platforms        76% fresh
Community        61% fresh
```

---

# 46. FILA DE REVISÃO

Criar:

```text
Review Queue
```

Cada item:

```js
{
  entityType,
  entityId,
  issueType,
  severity,
  detectedAt,
  message,
  sourceIds
}
```

---

# 47. TIPOS DE REVIEW

Exemplos:

```text
stale
missing-source
conflicting-claim
superseded-ranking
broken-reference
duplicate-fact
unverified-availability
unverified-price
unverified-plan
```

---

# 48. CRIAR IMPACT ENGINE

Uma das tarefas mais importantes para manutenção futura.

Quando um novo dado entrar:

```text
novo modelo
nova benchmark run
novo plano
novo preço
nova availability
```

calcular impacto.

---

# 49. IMPACT ENGINE — EXEMPLO

Ao adicionar um modelo:

```text
Novo modelo: Gemini 3.9 Flash

Impacto:

• novo #1 em throughput
• entrou na Pareto frontier
• alterou 3 rankings de caso de uso
• alterou 2 awards
• 5 claims competitivos ficaram superseded
• 3 textos editoriais precisam revisão
```

---

# 50. IMPACT ENGINE NÃO DEVE DEPENDER DE IA

Implementar de forma determinística.

Pode usar:

* comparação anterior × atual;
* rankings;
* claims;
* awards;
* use cases;
* Pareto.

---

# 51. SNAPSHOT ANTERIOR

Quando necessário, manter uma representação do estado anterior para calcular:

```text
rank delta
leader change
award change
```

Não precisa ser banco de dados sofisticado.

Pode usar snapshots versionados.

---

# 52. RANK DELTA

Mostrar:

```text
#1 ↑1
#3 ↓2
Novo
Sem mudança
```

---

# 53. HOME — “O QUE MUDOU?”

Enriquecer usando o Impact Engine.

Exemplo:

```text
Claude Fable 5.1
Lançamento

AA Index
Novo #1 ↑

Terminal-Bench
Novo #1 ↑

Claude Opus 5
#1 → #2
```

---

# 54. AWARDS DEVEM SER EXPLICÁVEIS

Em cada award:

mostrar:

```text
critério
dataset
threshold
data
fonte
```

Botão:

```text
Ver cálculo
```

---

# 55. BEST VALUE DEVE SER METODOLOGICAMENTE EXPLÍCITO

Não apenas:

```text
score / cost
```

sem contexto.

Definir:

```text
benchmark usado
score mínimo
tratamento de custo zero
status elegível
effort permitido
fonte
```

---

# 56. NÃO MISTURAR EFFORTS AUTOMATICAMENTE

Se houver:

```text
Low
Medium
High
Max
```

tratar como configurações.

Ranking pode ter:

```text
Melhor configuração absoluta
Melhor configuração até $X/task
Melhor configuração padrão
```

---

# 57. NÃO MISTURAR ROUTES AUTOMATICAMENTE

Uma execução em Cursor não deve ser automaticamente tratada como equivalente a API oficial.

Sempre preservar:

```text
modelId
configurationId
offeringId
```

---

# 58. NORMALIZAR AVAILABILITY

Criar estrutura temporal:

```js
{
  modelId,
  platformId,

  status,
  region,

  availableFrom,
  availableUntil,

  offeringId,
  planIds,

  sourceId,
  verifiedAt
}
```

---

# 59. REGIÃO

Permitir:

```text
global
US
BR
EU
CN
other
```

ou estrutura equivalente.

Não assumir disponibilidade global sem fonte.

---

# 60. TESTES — FRESHNESS

Testar relógio injetado.

Exemplo:

```js
const now = new Date('2026-09-04');

getFreshness('2026-09-02', { now })
```

Produção não pode usar relógio congelado.

---

# 61. TESTES — RANKINGS

Nunca testar:

```text
modelo X deve ser #1
```

Testar:

```text
ranking retornado corresponde ao maior resultado elegível
```

---

# 62. TESTES — IMPACT ENGINE

Adicionar fixture com:

```text
snapshot anterior
snapshot novo
```

e validar:

```text
leaderChange
awardChange
rankDelta
```

---

# 63. TESTES — REFERÊNCIAS

Validar:

```text
modelId
configurationId
offeringId
planId
providerId
platformId
benchmarkId
benchmarkRunId
sourceId
claimId
```

Nenhuma referência órfã.

---

# 64. TESTES — CLAIMS

Validar:

```text
status
validFrom
validUntil
sourceIds
subjectId
predicate
```

Claims competitivos devem possuir fonte.

---

# 65. TESTES — CONTAGENS

Nenhuma contagem visual deve depender de literal fixo.

Auditar HTML procurando números como:

```text
44 modelos
47 modelos
49 planos
```

quando representarem dados derivados.

---

# 66. MODULARIZAR `app.js`

O arquivo atual ficou grande demais.

Faça refatoração real.

Objetivo:

reduzir significativamente a responsabilidade de `app.js`.

---

# 67. ESTRUTURA SUGERIDA

Algo equivalente a:

```text
src/

  app/
    router.js
    state.js
    events.js
    bootstrap.js

  views/
    home.js
    models.js
    model-detail.js
    plans.js
    plan-detail.js
    use-cases.js
    use-case-detail.js
    compare.js
    benchmarks.js
    benchmark-detail.js
    providers.js
    provider-detail.js
    platforms.js
    platform-detail.js
    data-health.js

  views/tools/
    simulator.js
    vram.js
    roi.js
    harnesses.js
    troubleshoot.js

  components/
    entity-header.js
    evidence-badge.js
    freshness-badge.js
    coverage-badge.js
    benchmark-table.js
    model-card.js
    plan-card.js
    compare-tray.js
    source-list.js
    review-alert.js

  domain/
    entities.js
    rankings.js
    benchmarks.js
    comparison.js
    freshness.js
    claims.js
    evidence.js
    impact.js
    use-cases.js
    pricing.js
    availability.js
```

Não é obrigatório usar exatamente essa árvore.

Mas separar responsabilidades de verdade.

---

# 68. NÃO CRIAR SOMENTE WRAPPERS

Modularização cosmética não vale.

Não mover 2.000 linhas para outro arquivo e continuar tudo acoplado.

Cada módulo deve ter API clara.

---

# 69. ESTADO GLOBAL

Reduzir `AppState`.

Estado compartilhado global deve conter apenas o que realmente precisa ser compartilhado.

Exemplo:

```text
theme
currency
selectedModels
currentRoute
```

Estado de planos fica com planos.

Estado de benchmarks fica com benchmarks.

---

# 70. INDEX.HTML

Reduzir progressivamente o HTML monolítico.

Não precisa transformar o projeto em framework.

Pode usar templates JS/modulares.

---

# 71. STYLE.CSS

Organizar por responsabilidade.

Exemplo:

```text
styles/
  tokens.css
  shell.css
  navigation.css
  components.css
  models.css
  plans.css
  compare.css
  research.css
  tools.css
  responsive.css
```

Se não quiser múltiplos requests, pode usar build ou imports.

Mas a organização de fonte deve melhorar.

---

# 72. NÃO QUEBRAR GITHUB PAGES

A solução deve continuar compatível com GitHub Pages.

Sem backend obrigatório.

---

# 73. CI / GITHUB ACTIONS

Adicionar workflow.

No mínimo:

```text
npm test
```

e novos testes.

---

# 74. SCRIPTS DE QUALIDADE

Criar scripts equivalentes a:

```json
{
  "test": "...",
  "test:data": "...",
  "test:domain": "...",
  "test:routes": "...",
  "test:links": "...",
  "test:smoke": "...",
  "lint:data": "..."
}
```

Não é obrigatório usar exatamente os nomes.

---

# 75. SMOKE TESTS

Validar pelo menos:

```text
#dashboard
#models
#model/:id
#plans
#plan/:id
#use-cases
#use-case/:id
#compare
#benchmarks
#benchmark/:id
#provider/:id
#platform/:id
#data-health
```

---

# 76. BACK / FORWARD

Garantir que:

```text
browser back
browser forward
refresh
deep link
```

funcionem em todos os dossiers.

---

# 77. PERSISTÊNCIA

Comparador pode continuar preservando seleção.

Mas o estado importante deve ser refletido na URL quando compartilhável.

---

# 78. QUERY PARAMS

Normalizar.

Evitar múltiplas formas desnecessárias como:

```text
?id=
?model=
?case=
```

quando uma forma canônica puder existir.

Preserve aliases antigos apenas para compatibilidade.

---

# 79. DOCUMENTAR ROTAS CANÔNICAS

Exemplo:

```text
#models
#model/:id

#plans
#plan/:id

#use-cases
#use-case/:id

#benchmarks
#benchmark/:id

#provider/:id
#platform/:id

#compare?models=...&mode=...

#data-health
```

---

# 80. DOCUMENTAR SCHEMAS

Criar documentação curta dos schemas:

```text
Model
ModelConfiguration
Offering
Benchmark
BenchmarkRun
Plan
Provider
Platform
Claim
Source
UseCase
```

---

# 81. SCHEMA VERSION

Criar:

```js
schemaVersion
```

quando fizer sentido.

Exemplo:

```js
{
  schemaVersion: 2,
  dataVersion: '2026-09-04'
}
```

---

# 82. MIGRAÇÃO

Quando alterar schema:

criar documentação de migração.

Exemplo:

```text
v1:
benchmark no ledger

v2:
BenchmarkRun separado
```

---

# 83. NÃO DUPLICAR FATOS

Se `BenchmarkRun` possui:

```text
score
cost
tokens
```

não repetir esses valores manualmente dentro de:

```text
strengths
summary
badges
rationale
```

Gerar dinamicamente.

---

# 84. DETECTOR DE DUPLICAÇÃO DE FATOS

Adicionar auditoria.

Procurar:

```text
$X
X%
#1
líder
campeão
melhor
```

em strings editoriais.

Gerar warning para revisão.

---

# 85. DETECTOR DE CLAIM COMPETITIVO

Claims contendo:

```text
best
leader
#1
top
fastest
cheapest
```

devem depender de ranking derivado ou claim temporal.

---

# 86. NÃO BLOQUEAR TESTE POR NOVO MODELO MELHOR

Adicionar um modelo melhor deve:

```text
recalcular ranking
alterar leader
gerar impact
```

e os testes devem continuar passando.

---

# 87. SIMULAR ADIÇÃO DE FUTURO MODELO

Crie fixture de teste:

```text
future-model
score superior ao líder atual
```

Valide que:

```text
DomainRankings
ImpactEngine
Claims
Home awards
```

se ajustariam automaticamente.

---

# 88. PLANOS — CUSTO EFETIVO

Adicionar funções derivadas para estimar:

```text
monthly subscription
credits
overage
estimated tasks
effective cost per task
```

Somente quando houver dados suficientes.

---

# 89. INCERTEZA DE QUOTA

Quando quota for estimada:

mostrar faixa.

Exemplo:

```text
Estimativa central: 3.800 tarefas
Faixa: 2.900–4.700
```

Não apresentar número inferido como exato.

---

# 90. HARDWARE — RENOMEAR “VRAM REAL”

Se a calculadora for baseada em fórmula, não chamar de:

```text
VRAM Real
```

Preferir:

```text
Estimador de VRAM
```

Mostrar:

```text
E · Estimado
```

Quando houver medição real:

```text
M · Medido
```

---

# 91. DATA HEALTH NÃO É PARA USUÁRIO FINAL COMUM

Pode ser página de manutenção.

Adicionar:

```text
meta: internal
```

ou link apenas em metodologia/admin/footer.

Não poluir sidebar principal.

---

# 92. PERFORMANCE

A modularização deve aproveitar para:

* reduzir rerenders completos;
* evitar listeners duplicados;
* lazy render de views;
* destruir Chart.js corretamente;
* carregar dados grandes somente quando necessário, quando viável.

---

# 93. RESPONSIVE

Não redesenhar tudo.

Apenas verificar que novos dossiers e Data Health funcionam em:

```text
360
390
430
768
1024
```

---

# 94. ACESSIBILIDADE

Novas telas devem preservar:

```text
keyboard
focus
ARIA
ESC
tabs acessíveis
botões reais
```

---

# 95. NÃO APAGAR FUNCIONALIDADE EXISTENTE

Preservar:

```text
Home
Modelos
Planos
Comparador
Router
VRAM
ROI
Simulador
Harnesses
Troubleshooter
Histórico
Comunidade
Plataformas
Fontes
Privacidade
Command Palette
Quick Inspector
```

---

# 96. COMPATIBILIDADE COM ROTAS ANTIGAS

Manter aliases:

```text
#radar
#pareto
#artificial-analysis
#antigravity
```

mas redirecionar para a arquitetura nova.

---

# 97. CLEANUP DOS DOCUMENTOS

A raiz do repositório possui muitos prompts e documentos históricos.

Mover para algo como:

```text
docs/
  prompts/
  audits/
  migrations/
  methodology/
  archive/
```

Não apagar documentação histórica útil.

---

# 98. README

Atualizar:

```text
estrutura real
rotas
camadas de evidência
domínio
scripts
arquitetura
quantidade dinâmica
```

Evitar contagens que envelhecem rapidamente.

---

# 99. CRITÉRIOS DE ACEITAÇÃO — BUGS

A tarefa não está concluída enquanto:

* freshness usar relógio congelado;
* existirem contagens contraditórias;
* ranking local aceitar hardware enorme como consumer;
* `verifiedAt` for inventado pelo domain;
* README contradizer evidência da interface.

---

# 100. CRITÉRIOS DE ACEITAÇÃO — DOMÍNIO

Devem existir estruturas equivalentes a:

```text
ModelConfiguration
Offering
BenchmarkRun
Claim
```

e serem realmente utilizadas.

---

# 101. CRITÉRIOS DE ACEITAÇÃO — ENTIDADES

Devem existir dossiers reais para:

```text
Plan
Provider
Platform
UseCase
Benchmark
```

não apenas filtros/modais.

---

# 102. CRITÉRIOS DE ACEITAÇÃO — DATA HEALTH

A página deve detectar:

```text
stale
missing sources
broken refs
superseded claims
needs review
```

---

# 103. CRITÉRIOS DE ACEITAÇÃO — IMPACT ENGINE

Adicionar uma nova execução de benchmark deve poder gerar:

```text
leader change
rank delta
award change
claim superseded
use case impact
```

---

# 104. CRITÉRIOS DE ACEITAÇÃO — MODULARIZAÇÃO

`app.js` deve ter responsabilidade significativamente menor que antes.

Não é necessário atingir um número arbitrário de KB.

Mas a mudança precisa ser arquiteturalmente real.

---

# 105. NÃO FAZER “BIG BANG” SEM TESTAR

Dividir em etapas.

Após cada etapa:

```text
npm test
smoke test
rotas
console
```

---

# 106. ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

## Fase A — Correções imediatas

* freshness;
* counters;
* hardware local;
* verifiedAt;
* documentação de evidência.

## Fase B — Domain v2

* Benchmark Registry;
* ModelConfiguration;
* Offering;
* BenchmarkRun;
* Claim.

## Fase C — Comparison Intelligence

* confidence;
* delta;
* reference model;
* Pareto explanation;
* sensitivity.

## Fase D — Entity Dossiers

* plan;
* provider;
* platform;
* use case;
* benchmark.

## Fase E — Maintenance Intelligence

* Data Health;
* Review Queue;
* Impact Engine;
* rank history.

## Fase F — Modularização

* app;
* views;
* components;
* domain;
* CSS.

## Fase G — Quality

* CI;
* smoke;
* routes;
* links;
* accessibility;
* README.

---

# 107. ENTREGÁVEL FINAL

Ao concluir, produzir relatório contendo:

## Estado inicial

Problemas encontrados.

## Correções P0

Cada bug corrigido.

## Domain v2

Schemas novos.

## BenchmarkRun

Como funciona.

## Claim system

Como funciona.

## Freshness

Políticas utilizadas.

## Comparison Confidence

Fórmula e limitações.

## Dossiers

Rotas criadas.

## Data Health

O que detecta.

## Impact Engine

Exemplo real ou fixture demonstrando mudança de líder.

## Modularização

Arquivos antigos → novos módulos.

## Testes

Todos os comandos executados.

## Pendências

Somente itens realmente não concluídos.

---

# 108. PRINCÍPIO DE QUALIDADE

Toda informação exibida deve conseguir responder:

```text
O que é?
De onde veio?
Quando foi verificada?
Como foi medida?
Em que configuração?
Em que rota?
Quão comparável é?
Ainda é válida?
Foi substituída?
```

Se a arquitetura não consegue responder isso, ela ainda não está madura o suficiente.

---

# 109. PRINCÍPIO DE ESCALA

A implementação deve continuar funcionando quando houver:

```text
60 modelos
100 modelos
200 modelos
```

e centenas de benchmark runs.

Adicionar um novo modelo não deve exigir revisar manualmente dezenas de componentes.

---

# 110. PRINCÍPIO FINAL

O portal deve evoluir de:

> sistema de páginas com números e rankings

para:

> **grafo temporal de modelos, configurações, ofertas, planos, benchmarks, execuções, claims e evidências, consultado por uma interface de decisão.**

Essa é a meta desta fase.

Comece pela auditoria do código atual.

Não produza apenas uma proposta.

Implemente as mudanças em etapas verificáveis até concluir a maior quantidade possível desta especificação.
