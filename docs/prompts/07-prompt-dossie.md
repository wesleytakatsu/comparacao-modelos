# DOSSIÊ FRONTIER / SPECIALIST MODELS — EXPANSÃO MASSIVA DE BENCHMARKS

## Snapshot de referência: 03/09/2026

Você está trabalhando no projeto:

`wesleytakatsu/comparacao-modelos`

O agente NÃO possui acesso à internet.

Utilize os dados fornecidos neste documento como snapshot auditado de referência.

Esta tarefa deve criar um **dossiê técnico profundo por modelo**, corrigir benchmarks equivocados existentes, adicionar benchmarks ausentes e melhorar a arquitetura para que benchmarks de fontes diferentes nunca mais sejam misturados.

---

# 1. MODELOS PRIORITÁRIOS DESTA AUDITORIA

Criar dossiês completos para:

```text
Gemini 3.8 Flash

GPT-5.6 Sol
GPT-5.6 Terra
GPT-5.6 Luna

DeepSeek-V4-Flash-0731
DeepSeek-V4-Flash-Vision-Exp

Grok 4.6

GLM-5.3-Flash
GLM-5.3

Kimi K3

Hy4 preview
Hy3

Qwen3.8 Max
Qwen3.8 Flash

MiniMax M3

Muse Spark 1.3
Muse Spark 1.3 Contributor
```

---

# 2. IMPORTANTE: ALGUNS NOVOS MODELOS NÃO ESTÃO NO CATÁLOGO CANÔNICO

O projeto atualmente não possui como modelos canônicos:

```text
hy4-preview
qwen3-8-flash
muse-spark-1-3
```

Adicionar esses modelos caso continuem ausentes após verificar o estado atual do código.

NÃO hardcode novamente:

```text
44 modelos
```

A quantidade deve ser calculada dinamicamente.

---

# 3. MUSE SPARK 1.3 CONTRIBUTOR NÃO DEVE SER AUTOMATICAMENTE TRATADO COMO O MESMO SKU DO META MUSE SPARK 1.3

Separar:

```text
Muse Spark 1.3
```

modelo Meta conhecido e avaliado.

De:

```text
Muse Spark 1.3 Contributor
```

SKU observado em plataformas como OpenCode.

Até existir confirmação inequívoca de que o Contributor corresponde exatamente ao mesmo checkpoint/configuração:

```js
{
  canonicalModelCandidate: 'muse-spark-1-3',
  identityConfidence: 'probable-but-not-fully-verified'
}
```

Não copiar automaticamente todos os benchmarks do Muse Spark 1.3 para o Contributor.

O dossiê do Contributor pode mostrar:

> “Modelo relacionado: Muse Spark 1.3”

---

# 4. QWEN3.8 FLASH VS QWEN3.8-FLASH-NEXT

Existe uma distinção importante.

## Qwen3.8-Flash

É o produto/endpoint de produção.

Características:

```text
context:
1M na versão de serviço

max output:
~131K

input:
text
image
video

pricing aproximado:
$0.16/M input
$0.47/M output
```

## Qwen3.8-Flash-Next

É a release/open-weight subjacente avaliada publicamente.

Arquitetura:

```text
125B parâmetros principais
6B ativos

+ 51B parâmetros de n-gram embeddings

contexto nativo:
262,144

expansível via YaRN:
~1M
```

Não assumir que uma medição do `Flash-Next` é automaticamente uma medição do serviço `Qwen3.8 Flash`.

Criar:

```js
relatedVariants: [
  'qwen3-8-flash-next'
]
```

---

# 5. NOVA ARQUITETURA: `MODEL_DOSSIERS_DATA`

Criar:

```js
const MODEL_DOSSIERS_DATA = {};
```

Cada modelo deve possuir:

```js
{
  modelId,

  identity: {},
  architecture: {},
  context: {},
  modalities: {},
  pricing: {},
  availability: {},

  artificialAnalysis: {},

  benchmarkSnapshots: [],

  performanceProfile: {},

  strengths: [],
  weaknesses: [],

  bestFor: [],
  avoidFor: [],

  sourceIds: [],

  verifiedAt
}
```

---

# 6. NÃO CRIAR OUTRA MATRIZ PLANA GIGANTE COMO ÚNICA FONTE DE VERDADE

O atual:

```text
MULTI_BENCHMARK_LEDGER
```

pode continuar existindo para compatibilidade da UI.

Mas deve ser uma VIEW DERIVADA.

Fonte canônica:

```text
MODEL_DOSSIERS_DATA
+
benchmarkSnapshots
```

---

# 7. ESTRUTURA DE UM BENCHMARK

Cada resultado deve ser armazenado aproximadamente assim:

```js
{
  benchmarkId: 'terminal-bench',
  benchmarkVersion: '2.1',

  score: 90.8,
  unit: 'percent',

  sourceType: 'official',

  sourceId: 'google-gemini38-enterprise-eval',

  harness: 'Google Enterprise Agent Platform',

  effort: 'high',

  toolsEnabled: true,

  snapshotDate: '2026-09-02',

  confidenceInterval: null,

  costPerTaskUsd: null,
  outputTokensPerTask: null,
  agentStepsPerTask: null,

  notes: ''
}
```

---

# 8. `sourceType` OBRIGATÓRIO

Valores:

```text
official
vendor-reported
independent
community
estimated
```

---

# 9. NÃO MISTURAR RESULTADOS DO MESMO BENCHMARK

Exemplo real:

Gemini 3.8 possui:

```text
τ³ Banking oficial Google:
38.1
```

e:

```text
τ³ Banking Artificial Analysis:
~45
```

Os dois podem estar corretos.

São harnesses diferentes.

Guardar os dois.

NÃO escolher um arbitrariamente.

---

# 10. REGISTRO GLOBAL DE BENCHMARKS

Criar:

```js
BENCHMARK_REGISTRY
```

---

# 11. CODING / SOFTWARE ENGINEERING

Cadastrar separadamente:

```text
Terminal-Bench 2.0
Terminal-Bench 2.1
Terminal-Bench 3.0
Terminal-Bench 4.0
Terminal-Bench Science 0.1

DeepSWE 1.1

SWE-bench Verified
SWE-bench Pro
SWE-bench Multilingual

SWE-Atlas
SWE-Atlas Refactoring
SWE-Atlas Test Writing

NL2Repo

ProgramBench

FrontierSWE

SWE-Marathon

PostTrainBench

SWE-fficiency

KernelBench Hard

FrontierCode 1.1 Extended

APEX-SWE

Kimi Code Bench 2.0
```

Nunca misturar versões.

---

# 12. AGENT / TOOL USE

Cadastrar:

```text
Toolathlon Verified

AutomationBench
AutomationBench-AA

Agents' Last Exam
ALE-CLI

APEX-Agents
APEX-Agents-AA

MCP Atlas
MCPMark Verified

BrowseComp

OSWorld
OSWorld Verified
OSWorld 2

CoWorkBench
JobBench

DeepSearchQA
ResearchRubrics

τ² Retail
τ² Airline
τ³ Banking
```

---

# 13. SCIENCE / KNOWLEDGE / REASONING

```text
GPQA Diamond

Humanity's Last Exam
HLE no tools
HLE with tools
HLE Verified

CritPt

SciCode

MMLU-Pro

FrontierMath Tier 1–3 v2
FrontierMath Tier 4 v2

HMMT 2026
AIME
```

---

# 14. LONG CONTEXT

```text
MRCR v2 256K–512K
MRCR v2 512K–1M

GraphWalks BFS 256K
GraphWalks BFS 1M

OneMillionBench

CorpusQA 1M

AA-LCR
```

---

# 15. MULTIMODAL

```text
MMMU-Pro no tools
MMMU-Pro with tools

CharXiv

GDP.pdf

Chartography

ZeroBench

OfficeQA Pro

MathVision

OmniDocBench

VideoMMMU
Video-MME

MVBench
MMVU
BabyVision
```

---

# 16. BUSINESS / PROFESSIONAL WORK

```text
GDPval-AA v2

AA-Briefcase

Finance Agent v2

Harvey LAB
Harvey Legal Agent

EnterpriseOps-Gym

BankerToolBench

AA-AnalystAgent
```

---

# 17. CYBER / SECURITY

```text
CyberGym

ExploitGym

ExploitBench
```

---

# 18. OUTROS

```text
ARC-AGI-3

RSI Index

GeneBench Pro
LifeSciBench
MedChemBench
HealthBench Professional
```

---

# 19. ARTIFICIAL ANALYSIS — METODOLOGIA

Artificial Analysis Intelligence Index v4.1.1 atualmente utiliza nove avaliações principais:

```text
GDPval-AA v2
τ³-Banking
Terminal-Bench 2.1
SciCode
Humanity's Last Exam
GPQA Diamond
CritPt
AA-Omniscience
AA-LCR
```

Não interpretar o `AA Intelligence Index` como média simples desses scores.

---

# 20. GEMINI 3.8 FLASH — ARTIFICIAL ANALYSIS

CORRIGIR/COMPLETAR.

## High

```text
AA Intelligence:
59

output speed:
304.6 tok/s

cost per AA task:
$0.58

total output tokens:
120M

TTFT / first-answer token:
13.39 s
```

Classificação absoluta do leaderboard:

```text
NÃO hardcode
```

A posição muda conforme novos modelos entram.

---

# 21. GEMINI 3.8 MEDIUM

```text
AA Intelligence:
57

output speed:
~312 tok/s

cost per task:
$0.41

total output:
53M

TTFT:
~6.44 s
```

---

# 22. GEMINI 3.8 LOW

```text
AA Intelligence:
52

output speed:
~313.5 tok/s

cost per task:
$0.24

output:
19M

TTFT:
~0.70 s
```

---

# 23. GEMINI 3.8 — INTERPRETAÇÃO AA

High:

```text
+3 AA points vs Gemini 3.7 Flash High
```

Mas produz aproximadamente:

```text
~30% mais output tokens
```

e o custo por tarefa fica aproximadamente:

```text
~40% maior
```

apesar do mesmo preço unitário promocional.

Adicionar ao perfil:

```text
strength:
frontier-level agentic intelligence for very low token price

weakness:
very high output-token consumption at High
```

---

# 24. GEMINI 3.8 — BENCHMARKS OFICIAIS GOOGLE

Cadastrar:

```text
Terminal-Bench 2.1:
90.8

SWE-Bench Pro:
61.6

SWE-Atlas:
51.9

τ³ Banking:
38.1

CharXiv:
86.2

GDP.pdf:
35.0

HLE:
45.4

HLE-Verified:
54.9

Finance Agent v2:
61.4

Harvey Legal Agent:
10.0
```

---

# 25. CORRIGIR GEMINI 3.8 NO PROJETO

O ledger atual possui:

```text
GPQA Diamond:
94.8

ARC-AGI2:
78.5
```

Não foi encontrada provenance adequada para esses dois valores no snapshot desta auditoria.

Alterar para:

```text
null
```

até existir um source específico.

---

# 26. GEMINI 3.8 — DEEPSWE INDEPENDENTE

Snapshot 02/09/2026:

```text
DeepSWE v1.1

High:

74% ±1

cost/task:
$2.36

output:
143K tokens/task

agent steps:
166
```

Isso é:

```text
independent
```

e NÃO benchmark oficial Google.

---

# 27. GEMINI 3.8 — CURSORBENCH

## High

```text
69.2%

$2.38/task

81,524 tokens/task

161 steps
```

## Medium

```text
67.0%

$1.93/task

61,603 tokens/task

136 steps
```

Corrigir metadata:

```text
pool:
other-models
```

NÃO:

```text
cursor-models
```

Gemini 3.8 é modelo Google no Cursor, não Cursor Model.

---

# 28. GEMINI 3.8 — PERFIL

```text
strengths:
- altíssimo throughput
- excelente agentic persistence
- DeepSWE muito forte
- multimodal nativo
- 1M context
- baixo custo
- tool loops longos
```

```text
weaknesses:
- High extremamente verboso
- alto número de agent steps
- TTFT cresce muito com reasoning
- algumas avaliações teóricas não melhoram sobre 3.7
```

---

# 29. GPT-5.6 — DADOS OFICIAIS COMPARATIVOS

Armazenar tabela Sol / Terra / Luna.

---

# 30. CODING

| Benchmark                 |  Sol | Terra | Luna |
| ------------------------- | ---: | ----: | ---: |
| AA Coding Agent Index 1.1 | 80.0 |  77.4 | 74.6 |
| SWE-Bench Pro             | 64.6 |  63.4 | 62.7 |
| DeepSWE 1.1               | 72.7 |  69.6 | 67.2 |
| Terminal-Bench 2.1        | 88.8 |  87.4 | 84.7 |

Há também configuração Sol Ultra / multi-agent em alguns testes:

```text
TB2.1:
91.9
```

Não criar modelo canônico:

```text
GPT-5.6 Sol Ultra
```

É configuração/harness.

---

# 31. SCIENCE / HEALTH

| Benchmark                |  Sol | Terra | Luna |
| ------------------------ | ---: | ----: | ---: |
| GeneBench Pro            | 28.7 |  23.3 | 10.8 |
| LifeSciBench             | 59.9 |  56.0 | 51.2 |
| MedChemBench             | 48.3 |  35.0 | 30.4 |
| HealthBench Professional | 60.5 |  57.7 | 55.7 |

---

# 32. SELF-IMPROVEMENT / RESEARCH ENGINEERING

| Benchmark               |  Sol | Terra | Luna |
| ----------------------- | ---: | ----: | ---: |
| Internal Research Debug | 68.3 |  67.8 | 50.8 |
| KernelGen 1P            | 61.1 |  49.2 | 22.4 |
| NanoGPT                 | 9.69 |  14.5 | 1.66 |
| PostTrainBench Lite     | 50.3 |  51.5 | 29.6 |
| RSI Index               | 57.9 |  56.3 | 41.9 |

Importante:

Terra supera Sol em:

```text
NanoGPT
PostTrainBench Lite
```

Isso é exatamente o tipo de nuance que o dossiê deve mostrar.

---

# 33. MULTIMODAL OPENAI

| Benchmark           |  Sol | Terra | Luna |
| ------------------- | ---: | ----: | ---: |
| MMMU-Pro no tools   | 83.0 |  80.7 | 78.4 |
| MMMU-Pro with tools | 84.6 |  82.0 | 79.5 |
| GDP.pdf             | 30.7 |  24.7 | 22.7 |

---

# 34. ACADEMIC REASONING

| Benchmark            |  Sol | Terra | Luna |
| -------------------- | ---: | ----: | ---: |
| GPQA Diamond         | 94.6 |  92.9 | 92.3 |
| FrontierMath T1–3 v2 | 89.0 |  84.9 | 78.6 |
| FrontierMath T4 v2   | 83.0 |  68.3 | 58.5 |

---

# 35. TOOL USE

| Benchmark       |  Sol | Terra | Luna |
| --------------- | ---: | ----: | ---: |
| AutomationBench | 18.1 |  15.2 | 14.9 |
| Toolathlon      | 58.0 |  53.1 | 53.4 |

Observe:

```text
Luna Toolathlon 53.4
>
Terra 53.1
```

apesar de Luna ser menor/barato.

---

# 36. LONG CONTEXT OPENAI

| Benchmark           |  Sol | Terra | Luna |
| ------------------- | ---: | ----: | ---: |
| MRCR 256K–512K      | 91.5 |  89.6 | 41.3 |
| MRCR 512K–1M        | 73.8 |  72.5 | 41.3 |
| GraphWalks BFS 256K | 90.7 |  76.9 | 81.3 |
| GraphWalks BFS 1M   | 77.1 |  71.2 | 51.2 |

Importantíssimo:

Luna é muito pior em MRCR de contexto longo apesar de ter janela nominal de 1M.

Adicionar:

```text
weakness:
nominal context ≠ effective long-context reasoning quality
```

---

# 37. OPENAI — AGENT / COMPUTER USE

Guardar:

```text
OSWorld 2:

Sol:
62.6

Terra:
50.2

Luna:
45.6
```

---

# 38. GPT-5.6 SOL — ARTIFICIAL ANALYSIS

Max:

```text
AA:
61

speed atual:
~74 tok/s

cost/task:
~$0.95
```

Outros efforts, snapshot de release:

```text
XHigh:
59
~79 tok/s
~$0.63

High:
57
~78 tok/s
~$0.43

Medium:
56
~72 tok/s
~$0.29

Low:
51
~73 tok/s
~$0.18

Non-reasoning:
42
~75 tok/s
~$0.18
```

AA speed é live/volátil.

Guardar `snapshotDate`.

---

# 39. GPT-5.6 TERRA — ARTIFICIAL ANALYSIS

```text
Max:
57
~118.5 tok/s
$0.53/task
96M output
```

Release effort table:

```text
XHigh:
53
~97 tok/s
$0.32

High:
50
~98
$0.23

Medium:
47
~98
$0.12

Low:
41
~100
$0.10

Non-reasoning:
35
~94
$0.10
```

---

# 40. GPT-5.6 LUNA — ARTIFICIAL ANALYSIS

Max:

```text
AA:
52

speed live:
~128 tok/s

cost/task:
$0.05

output:
130M
```

Release effort intelligence:

```text
XHigh:
50

High:
47

Medium:
39

Low:
34

Non-reasoning:
27
```

Luna é:

```text
extremamente barato
muito verboso no Max
forte em agentic coding relativo ao preço
fraco em long-context retrieval comparado ao Sol/Terra
```

---

# 41. DEEPSEEK V4 FLASH 0731 — BENCHMARK OFICIAL

Release 31/07:

```text
Terminal-Bench 2.1:
82.7

NL2Repo:
54.2

CyberGym:
76.7

DeepSWE:
54.4

Toolathlon Verified:
70.3

Agents' Last Exam:
25.2

AutomationBench Public:
25.1

DSBench FullStack:
68.7

DSBench Hard:
59.6
```

Harness:

```text
DeepSeek Harness minimal mode
max effort
top_p = 0.95
temperature = 1.0
```

---

# 42. DEEPSEEK 0731 — DEEPSWE INDEPENDENTE ATUAL

Não sobrescrever o vendor result.

Registrar OUTRO snapshot:

```text
DeepSWE independent leaderboard:

53% ±4

cost/task:
~$0.46

output:
~108K

steps:
~153
```

Portanto:

```text
vendor:
54.4

independent:
~53
```

Ambos ficam no dossiê.

---

# 43. DEEPSEEK V4 FLASH 0731 — ARTIFICIAL ANALYSIS

Atual:

```text
AA:
52

speed:
~108 tok/s

cost/task:
~$0.11

TTFT:
~1.5 s

output:
~210M

context:
1M
```

É extremamente verboso no Intelligence Index.

---

# 44. DEEPSEEK V4 FLASH VISION EXP — É UM MODELO REALMENTE DIFERENTE

Release:

```text
21/08/2026
```

Endpoint:

```text
deepseek-v4-flash-vision-exp
```

É:

```text
experimental
multimodal
```

---

# 45. VISION EXP — BENCHMARK OFICIAL

```text
Terminal-Bench 2.1:
83.9

NL2Repo:
57.7

DeepSWE:
59.3

DSBench Hard:
63.6

AutomationBench Public:
25.7

ApexBench Pass@1:
36.5

Agents' Last Exam:
27.3

Chartography:
64.3

ZeroBench Pass@5:
35.0
```

Toolathlon publicado na comparação DeepSeek:

```text
75.9
```

---

# 46. 0731 VS VISION EXP

Criar tabela direta:

| Benchmark       | 0731 | Vision |
| --------------- | ---: | -----: |
| TB2.1           | 82.7 |   83.9 |
| NL2Repo         | 54.2 |   57.7 |
| DeepSWE         | 54.4 |   59.3 |
| CyberGym        | 76.7 |   75.3 |
| Toolathlon      | 70.3 |   75.9 |
| AutomationBench | 25.1 |   25.7 |
| ALE             | 25.2 |   27.3 |

Isso mostra:

```text
Vision não é simplesmente “0731 + visão”.
```

Há diferenças de post-training/evaluation behavior.

Vision ganha bastante em:

```text
DeepSWE
Toolathlon
visual agent tasks
```

mas pode regredir em:

```text
CyberGym
```

---

# 47. VISION — ARTIFICIAL ANALYSIS

CORRIGIR O PROJETO.

Atual:

```text
AA:
51
```

NÃO:

```text
52
```

Outros:

```text
speed:
120.1 tok/s

cost/task:
$0.12

TTFT:
~1.2 s

output:
130M

context:
1M
```

---

# 48. GROK 4.6 — CORRIGIR PROVENANCE

O projeto atual mistura benchmarks xAI oficiais e independentes.

---

# 49. GROK 4.6 — ANÚNCIO OFICIAL, HIGH

```text
AA Intelligence:
61

GDPval-AA v2:
1753 Elo

CursorBench 3.2 High:
69.9

DeepSWE:
65.9

FrontierCode 1.1 Extended:
61.3

APEX-Agents:
57.5

Terminal-Bench 3.0:
26.0

APEX-SWE:
56.4

AA-Briefcase:
1577 Elo

Harvey LAB:
15.8
```

---

# 50. GROK — TB2.1 88.4

É:

```text
Artificial Analysis
independent
```

e NÃO benchmark oficial xAI.

Registrar:

```text
Terminal-Bench 2.1:
88.4
sourceType:
independent
```

---

# 51. GROK — CURSORBENCH

Live:

## XHigh

```text
70.8

$2.81

41,136 tokens

46 steps
```

## High

```text
69.9

$2.34

32,449 tokens

39 steps
```

## Medium

```text
67.1

$1.28

17,942 tokens

29 steps
```

## Low

```text
61.0

$0.70

10,658 tokens
```

---

# 52. GROK — ARTIFICIAL ANALYSIS

```text
High:
61
~54 tok/s
$0.94/task
72M output

XHigh:
60
~56 tok/s
$1.23

Medium:
59
~56 tok/s
$0.78

Low:
52
~55 tok/s
$0.25
```

Interessante:

```text
High > XHigh no AA Intelligence Index
```

Portanto NÃO assumir monotonicidade automática:

```text
mais reasoning effort ≠ score sempre maior
```

---

# 53. GLM-5.3 — BENCHMARK OFICIAL

```text
Terminal Bench 2.1:
88.2

Terminal Bench 3.0:
28.3

DeepSWE:
66.9

NL2Repo:
58.0

ProgramBench Almost Solved:
19.0

FrontierSWE:
78.1

SWE-Marathon 1.1:
42.5

PostTrainBench:
39.8

CyberGym:
84.5

ExploitGym:
105 / 130
(2h / 6h)

ExploitBench:
54.4

Toolathlon:
73.0

AutomationBench:
48.2

ALE-CLI:
28.5

HLE with Tools:
62.5

GDPval-AA:
1769
```

---

# 54. GLM-5.3 — DEEPSWE INDEPENDENTE

Snapshot:

```text
69% ±3

$3.99/task

80K output tokens

124 agent steps
```

Compare:

```text
vendor harness:
66.9

independent current:
69
```

Guardar os dois.

---

# 55. GLM-5.3 — ARTIFICIAL ANALYSIS

```text
AA:
60

speed atual:
~78 tok/s

TTFT:
~1.6 s

cost/task:
~$0.68

input:
$1.40/M

output:
$4.40/M

output total:
~170M

context:
1M
```

---

# 56. GLM-5.3 — PERFIL

Muito forte:

```text
cyber
long-horizon coding
automation
Terminal
HLE tools
```

Ponto fraco:

```text
custo e tamanho de deployment muito maiores que GLM Flash
```

---

# 57. GLM-5.3-FLASH — SPECS

```text
320B total

18B ativos

45 layers

1M context

128K output

multimodal

MIT
```

Arquitetura:

```text
Sparse Attention
+
Linear Attention

mHC

~30T multimodal training tokens
```

---

# 58. GLM-5.3-FLASH — BENCHMARKS

```text
Terminal-Bench 2.1:
84.3

DeepSWE:
63.4

NL2Repo:
56.3

Toolathlon:
78.4

AutomationBench:
48.8

Agents' Last Exam:
26.3

HLE + Tools:
55.3

GDPval-AA:
1773
```

---

# 59. GLM FLASH — MULTIMODAL

```text
OfficeQA Pro:
62.4

CharXiv Reasoning + Tools:
89.4

Chartography + Tools:
78.0

MMVU:
80.5

BabyVision:
53.4

MVBench:
77.8
```

---

# 60. GLM FLASH — ARTIFICIAL ANALYSIS

```text
AA:
57

speed:
44.6 tok/s

TTFT:
~1.65 s

cost/task:
$0.09

input:
$0.15/M

output:
$0.50/M

output:
150M

context:
1M
```

Muito importante:

```text
“Flash” NÃO significa alto decode throughput.
```

Ele é econômico por token/arquitetura, mas o provider medido pelo AA é relativamente lento.

---

# 61. KIMI K3 — SPECS

```text
MoE

~2.8T total

~104B ativos

93 layers

context:
1M

text + image
```

---

# 62. KIMI K3 — BENCHMARKS OFICIAIS

Reasoning:

```text
GPQA:
93.5

CritPt:
23.4

AA-LCR:
74.7
```

HLE:

```text
no tools:
43.5

with tools:
56.0
```

---

# 63. KIMI K3 — CODING

```text
DeepSWE Kimi Code harness:
67.5

DeepSWE mini-SWE-agent:
~67.3

DeepSWE current independent snapshot:
~69% ±5

ProgramBench:
77.8

Terminal-Bench 2.1 Kimi Code:
88.3

FrontierSWE:
81.2

SWE-Marathon:
42.0

PostTrainBench:
36.6

MLS-Bench-Lite:
48.3

SciCode:
58.7

KimiCodeBench 2.0:
72.9
```

---

# 64. KIMI — AGENTIC

```text
BrowseComp:
91.2

DeepSearchQA:
95.0 F1

ResearchRubrics:
76.2

GDPval-AA:
~1682–1686

MCPMark Verified:
94.5

OSWorld Verified:
84.8

Toolathlon:
76.5

AutomationBench:
~30.8
```

---

# 65. KIMI K3 — ARTIFICIAL ANALYSIS

```text
AA:
60

speed:
~38 tok/s

TTFT:
~3.55 s

cost/task:
$0.84

input:
$3/M

output:
$15/M

output:
130M
```

Perfil:

```text
extremamente inteligente
muito forte agentic/search
muito lento e caro por token vs open-weight peers
```

---

# 66. HY4 PREVIEW — ADICIONAR AO CATÁLOGO

ID:

```text
hy4-preview
```

Provider:

```text
Tencent
```

Open weights:

```text
sim
```

---

# 67. HY4 ARCHITECTURE

```text
MoE

770B total

49B ativos

78 backbone layers

+ 1 MTP layer
10B total / 0.7B active
```

Attention:

```text
Gated DeepSeek Sparse Attention
IndexCache
```

Residual:

```text
iHC
```

Experts:

```text
256 routed
1 shared

top-8 routed activated/token
```

Context:

```text
1M
```

---

# 68. HY4 — BENCHMARKS VENDOR-REPORTED

Guardar como:

```text
vendor-reported
```

NÃO independente.

```text
Terminal-Bench 2.1:
85.4

DeepSWE:
64.3

SWE-Bench Pro:
65.7

Toolathlon Verified:
74.1

APEX-Agents:
37.1
```

Outros números publicados no chart Tencent:

```text
ProgramBench:
17.5

SWE-Atlas Refactoring:
53.3

ALE-CLI:
22.8

PostTrainBench:
35.6

OneMillionBench with tools:
65.4

BioMystery:
71.3

HLE text/no-tools:
43.4

HorizonMath pass@4:
8.8
```

---

# 69. HY4 — BLIND ENGINEERING TEST

Tencent:

```text
163 especialistas

203 tarefas de engenharia
```

Hy4:

```text
2.99 / 4
```

GLM-5.3:

```text
2.92
```

Hy4 vs GLM:

```text
46.8% win
12.8% tie
40.4% loss
```

Kimi K3:

```text
2.94
```

Hy4 vs Kimi:

```text
51.2% win
7.9% tie
40.9% loss
```

Classificar:

```text
vendor-internal-blind-evaluation
```

---

# 70. HY4 — LIMITAÇÕES OFICIAIS

Adicionar:

```text
early preview

over-reasoning

tendency to over-verify

pretraining/posttraining still have headroom
```

Isso é especialmente útil no dossiê.

---

# 71. HY4 — ARTIFICIAL ANALYSIS

Até este snapshot:

```text
N/D
```

Não copiar score do Hy3.

---

# 72. HY3 — SPECS

```text
295B total

21B active

context:
256K

open weights
text-only
```

---

# 73. HY3 — ARTIFICIAL ANALYSIS

```text
AA:
42

speed:
~95 tok/s

TTFT:
~2.7 s

cost/task:
$0.04

input:
~$0.14/M

output:
~$0.55/M

output:
140M
```

---

# 74. HY3 — VENDOR BASELINE

Da comparação oficial Hy4:

```text
Terminal-Bench:
70.8

DeepSWE:
28.0

ProgramBench:
3.0

SWE-Atlas Refactoring:
32.9

ALE-CLI:
17.1

Toolathlon:
56.2

APEX-Agents:
24.4

PostTrainBench:
14.0

OneMillionBench:
51.6

BioMystery:
54.9

HLE:
34.4

HorizonMath:
3.5
```

O enorme salto Hy3 → Hy4 deve aparecer na UI.

---

# 75. QWEN3.8 MAX — BENCHMARKS

A tabela comparativa Z.ai fornece:

```text
Terminal-Bench 2.1:
86.6

DeepSWE:
56.6

NL2Repo:
55.9

ProgramBench:
10.5

CyberGym:
78.5

ExploitGym:
14 / 26

ExploitBench:
28.8

Toolathlon:
72.5

AutomationBench:
39.8

ALE:
27.0

HLE + Tools:
56.2

GDPval-AA:
1739
```

---

# 76. QWEN3.8 MAX — DEEPSWE INDEPENDENTE

```text
~57% ±3

$3.73/task

~95K tokens

~111 agent steps
```

---

# 77. QWEN3.8 MAX — ARTIFICIAL ANALYSIS

```text
AA:
58

speed:
~40 tok/s

TTFT:
~2.5 s

cost/task:
~$0.91

input:
$2/M

output:
$6/M

output:
150M

context:
1M

multimodal:
sim
```

O projeto atualmente usa aproximadamente:

```text
$1.13/task
47.2 tok/s
```

Atualizar para o snapshot atual acima e guardar a data.

---

# 78. QWEN3.8 MAX — SCORES QUE PRECISAM DE PROVENANCE

O projeto possui:

```text
SWE-Pro:
67.7

MRCR:
92.9

GPQA:
92.6
```

Não apagar imediatamente se já houver fonte válida.

Mas exigir:

```text
benchmarkEvidence
```

Se não existir source específico:

```text
mover para needsEvidence
ou null
```

---

# 79. QWEN3.8 FLASH-NEXT — BENCHMARKS OFICIAIS

```text
DeepSWE:
58.7

SWE-bench Pro:
62.5

SWE-bench Multilingual:
81.0

NL2Repo:
48.1

CoWorkBench:
73.9

JobBench:
55.7

Agents' Last Exam:
Pass@1 24.3
Score 51.2

Toolathlon:
73.5
```

---

# 80. QWEN3.8 FLASH — ARTIFICIAL ANALYSIS

Importante:

Artificial Analysis atualmente mede principalmente:

```text
Qwen3.8-Flash-Next
```

não necessariamente o endpoint de produção `Qwen3.8 Flash`.

AA Flash-Next:

```text
~56
```

Não atribuir automaticamente ao produto Qwen3.8 Flash.

Usar:

```text
relatedVariantArtificialAnalysis
```

---

# 81. MINIMAX M3 — SPECS

```text
1M context

native multimodal:
image
video

computer use

open weights
```

---

# 82. MINIMAX M3 — BENCHMARK OFICIAL

CORRIGIR TB2.1 do projeto.

Atual oficial:

```text
SWE-Bench Pro:
59.0

Terminal-Bench 2.1:
66.0

SWE-fficiency:
34.8

KernelBench Hard:
28.8

MCP Atlas:
74.2
```

O projeto possui aproximadamente:

```text
TB2.1 = 65.5
```

Atualizar para:

```text
66.0
```

com source oficial MiniMax.

---

# 83. MINIMAX M3 — COMPUTER USE

```text
OSWorld Verified:

max steps 100:
68.70

max steps 200:
70.06
```

Isso é um excelente exemplo de benchmark sensível ao harness.

Guardar `maxSteps`.

---

# 84. MINIMAX M3 — VIDEO

```text
Video-MME:
84.6

configuration:
512 frames
```

Guardar configuração.

---

# 85. MINIMAX M3 — ARTIFICIAL ANALYSIS

```text
AA:
45

speed:
~99 tok/s

cost/task:
~$0.14

input:
$0.30/M

output:
$1.20/M

output:
~89M

context:
1M
```

Perfil:

```text
forte em:
multimodal
computer use
baixo custo

mais fraco em:
reasoning frontier absoluto
complex coding vs top models
```

---

# 86. MUSE SPARK 1.3 — ARTIFICIAL ANALYSIS

Existem dois efforts extremamente importantes.

## XHigh — disponível

```text
AA:
61

speed live:
181.7 tok/s

TTFT:
27.51 s

cost/task:
$0.55

input:
$1.25/M

output:
$4.25/M

cache discount:
88%

total output:
100M

context:
1M

input:
text
image
video
```

---

# 87. MUSE SPARK 1.3 MAX

Limited preview:

```text
AA:
62

output:
~120M
```

Preço/throughput público:

```text
N/D
```

Não inventar.

---

# 88. MUSE SPARK 1.3 — AA SUB-BENCHMARKS

## XHigh

```text
τ³ Banking:
47

Terminal-Bench 2.1:
85

GDPval-AA:
1709

CritPt:
26

GPQA:
94

HLE:
47

SciCode:
59

AA-LCR:
79

AA-Omniscience Accuracy:
42
```

## Max

```text
τ³ Banking:
52

Terminal-Bench 2.1:
86

GDPval-AA:
1754

CritPt:
25

GPQA:
94

HLE:
49

AA-LCR:
79

AA-Omniscience Accuracy:
44
```

---

# 89. MUSE 1.3 — INTERPRETAÇÃO

Max possui:

```text
AA 62
```

mas:

```text
τ³ Banking 52
```

é um destaque especialmente forte.

XHigh:

```text
AA 61
$0.55/task
~182 tok/s
```

é um dos melhores pontos de:

```text
intelligence / cost / speed
```

do snapshot.

---

# 90. MUSE SPARK 1.3 CONTRIBUTOR

Não atribuir automaticamente:

```text
AA61
```

ao SKU Contributor.

Criar:

```js
{
  id: 'muse-spark-1-3-contributor',

  platformSku: true,

  relatedCanonicalModel: 'muse-spark-1-3',

  exactCheckpointVerified: false,

  benchmarkInheritance: false
}
```

---

# 91. OPEN CODE STATUS MUSE

A documentação principal do Go ainda pode listar:

```text
Muse Spark 1.2 Contributor
```

enquanto dados operacionais já mostram:

```text
Muse Spark 1.3 Contributor
```

Representar:

```text
status:
observed-rollout

docsLagPossible:
true
```

Não esconder a divergência.

---

# 92. DEEPSWE CURRENT SNAPSHOT — COMPARAÇÃO DIRETA

Guardar uma tabela separada do leaderboard independente:

```text
Gemini 3.8 Flash High:
74 ±1
$2.36
143K
166 steps

GPT-5.6 Sol Max:
73 ±3
$6.46
60K
61

GLM-5.3 Max:
69 ±3
$3.99
80K
124

Kimi K3 Max:
69 ±5
$4.65
81K
98

GPT-5.6 Luna Max:
67 ±4
$0.61
73K
102

Grok 4.6 XHigh:
~67 ±2
~$5.50
~71K
~87

GLM-5.3-Flash:
63 ±4
$0.24
73K
123

Qwen3.8 Max:
57 ±3
$3.73
95K
111

DeepSeek V4 Flash:
53 ±4
$0.46
108K
153
```

Snapshot:

```text
02/09/2026
```

---

# 93. NÃO USAR APENAS SCORE NO DEEPSWE

A UI deve permitir ordenar por:

```text
Score

Cost/task

Output tokens/task

Agent steps/task

Cost per solved task
```

---

# 94. CRIAR `costPerSolvedTask`

Para percent benchmarks:

```js
costPerSolvedTask =
  costPerTask / (scorePct / 100)
```

Marcar:

```text
derived = true
```

---

# 95. ARTIFICIAL ANALYSIS — TABELA HEADLINE DOS MODELOS PRIORITÁRIOS

Snapshot atual:

| Modelo/config            |  AA |  Speed | $/task | Output |
| ------------------------ | --: | -----: | -----: | -----: |
| Gemini 3.8 High          |  59 |  304.6 |  $0.58 |   120M |
| GPT-5.6 Sol Max          |  61 |    ~74 |  $0.95 |   ~70M |
| GPT-5.6 Terra Max        |  57 |  118.5 |  $0.53 |    96M |
| GPT-5.6 Luna Max         |  52 |   ~128 |  $0.05 |   130M |
| DeepSeek V4 Flash 0731   |  52 |   ~108 |  $0.11 |   210M |
| DeepSeek Vision Exp      |  51 |  120.1 |  $0.12 |   130M |
| Grok 4.6 High            |  61 |    ~54 |  $0.94 |    72M |
| GLM-5.3 Flash            |  57 |   44.6 |  $0.09 |   150M |
| GLM-5.3 Max              |  60 |    ~78 |  $0.68 |   170M |
| Kimi K3 Max              |  60 |    ~38 |  $0.84 |   130M |
| Hy4 Preview              | N/D |    N/D |    N/D |    N/D |
| Hy3                      |  42 |    ~95 |  $0.04 |   140M |
| Qwen3.8 Max              |  58 |    ~40 |  $0.91 |   150M |
| Qwen3.8 Flash production | N/D |    N/D |    N/D |    N/D |
| Qwen3.8 Flash-Next       | ~56 | ~86–89 | ~$0.10 |    N/D |
| MiniMax M3               |  45 |    ~99 |  $0.14 |   ~89M |
| Muse Spark 1.3 XHigh     |  61 |  181.7 |  $0.55 |   100M |
| Muse Spark 1.3 Max       |  62 |    N/D |    N/D |   120M |

Speed é uma medição live e deve possuir snapshot date.

---

# 96. NÃO HARDCODE RANK DO ARTIFICIAL ANALYSIS

Exemplo:

Gemini High aparece atualmente aproximadamente:

```text
#16–#17
```

porque o número total de modelos muda.

Salvar:

```text
aaIndex: 59
```

Mas rank:

```text
calcular dinamicamente
```

se houver todos os resultados locais.

---

# 97. CRIAR PERFIL “ONDE O MODELO É BOM / RUIM”

Não usar somente Radar 10D.

Criar categorias baseadas em benchmark real:

```text
softwareEngineering
terminal
repositoryNavigation
toolUse
longContext
multimodal
computerUse
scientificReasoning
cyber
businessWork
agenticPersistence
costEfficiency
throughput
```

---

# 98. EXEMPLO GEMINI 3.8

```text
Software Engineering:
elite

Terminal:
elite

Agentic Persistence:
elite

Multimodal:
elite

Throughput:
exceptional

Cost:
excellent

Verbosity:
poor

Reasoning latency High:
poor

Security specialization:
unknown
```

---

# 99. EXEMPLO SOL

```text
Reasoning:
elite

Software Engineering:
elite

Terminal:
elite

Science:
elite

Long Context:
elite

Computer Use:
elite

Throughput:
medium

Cost:
expensive
```

---

# 100. EXEMPLO LUNA

```text
Coding:
very strong for price

Cost:
exceptional

Speed:
excellent

Long context retrieval:
weak relative to nominal 1M window

Reasoning frontier:
below Sol/Terra
```

---

# 101. EXEMPLO DEEPSEEK VISION

```text
Vision agent:
very strong

Tool use:
strong

Coding:
strong

Cyber:
slightly below text Flash on measured CyberGym

AA overall:
slightly below 0731

Cost:
excellent
```

---

# 102. EXEMPLO GLM-5.3

```text
Cyber:
elite

Automation:
elite

Coding:
frontier open-weight

Tool use:
strong

Cost:
medium

Deployment:
very heavy
```

---

# 103. EXEMPLO GLM FLASH

```text
Cost:
exceptional

Multimodal:
excellent

Tool use:
excellent

Coding:
strong

Decode speed:
weak

Local deployment:
more practical than full GLM but still very large
```

---

# 104. EXEMPLO KIMI

```text
Search:
elite

Research:
elite

Long-horizon coding:
elite

Tool use:
elite

Speed:
poor

Price:
high for open-weight
```

---

# 105. EXEMPLO HY4

```text
Coding:
frontier vendor-reported

Long context:
strong

Game development:
vendor explicitly targets this area

Agentic:
strong

Evidence confidence:
medium

Independent benchmarks:
still sparse
```

---

# 106. EXEMPLO HY3

```text
Cost:
exceptional

Speed:
excellent

Coding:
far below current frontier

Context:
256K

Agentic:
moderate
```

---

# 107. EXEMPLO QWEN MAX

```text
Reasoning:
strong

SWE:
strong

Tool use:
strong

Long context:
strong

Speed:
slow

Cost:
moderate-high
```

---

# 108. EXEMPLO QWEN FLASH

```text
Cost:
excellent

SWE:
strong

Multilingual SWE:
very strong

Tool use:
strong

CoWork:
very strong

Frontier absolute reasoning:
below Qwen Max
```

---

# 109. EXEMPLO MINIMAX

```text
Multimodal:
strong

Computer use:
strong

Cost:
excellent

Speed:
strong

Coding:
mid-high

Frontier reasoning:
below top models
```

---

# 110. EXEMPLO MUSE 1.3

```text
AA intelligence:
frontier

Speed:
exceptional

Cost:
excellent for intelligence level

τ³ Banking:
exceptional

TTFT:
poor

Max availability:
limited preview
```

---

# 111. CRIAR UI “DOSSIÊ”

Cada ficha dos modelos prioritários deve possuir abas:

```text
Overview

Artificial Analysis

Coding

Agentic / Tools

Reasoning

Long Context

Multimodal

Professional Work

Security

Pricing & Efficiency

Platforms

Sources
```

---

# 112. OVERVIEW

Mostrar:

```text
Modelo
Provider
Release
Status
Context
Output
Parameters
Active parameters
Modalities
Open weights
License
Price
AA Index
```

---

# 113. “PERFORMANCE FINGERPRINT”

Criar uma pequena visualização:

```text
Excellent
Strong
Average
Weak
Unknown
```

por categoria.

Não usar porcentagens inventadas.

Derivar de benchmarks.

---

# 114. ARTIFICIAL ANALYSIS TAB

Mostrar por effort:

```text
Index
speed
TTFT
cost/task
total output
```

---

# 115. CODING TAB

Mostrar:

```text
TB
DeepSWE
SWE-Pro
SWE-Verified
SWE Multilingual
NL2Repo
ProgramBench
FrontierSWE
PostTrainBench
```

somente quando disponíveis.

---

# 116. AGENT TAB

```text
Toolathlon
AutomationBench
ALE
APEX Agents
MCP Atlas
MCPMark
BrowseComp
OSWorld
```

---

# 117. LONG CONTEXT

Mostrar contexto nominal no topo e qualidade efetiva embaixo.

Exemplo:

```text
Luna:

Nominal:
1M

MRCR 512K–1M:
41.3
```

Isso evita o erro:

```text
1M context = excelente em contexto longo
```

---

# 118. PROVENANCE VISUAL

Cada score deve possuir badge:

```text
O
T
V
E
```

Sugestão:

```text
O = official primary source

V = vendor-reported benchmark

T = third-party independent

E = estimated / calibrated
```

---

# 119. TOOLTIP DO SCORE

Exemplo:

```text
DeepSWE 74%

Source:
DeepSWE/DataCurve

Type:
Independent

Harness:
mini-SWE agent

Snapshot:
02/09/2026

Cost:
$2.36

Steps:
166
```

---

# 120. NÃO COMPARAR ELO COM PERCENT

Registrar unit:

```text
percent
elo
rating
tasks
pass-at-k
f1
score
```

---

# 121. TESTE DE INTEGRIDADE NOVO

Todo benchmark factual:

```text
score !== null
```

deve ter:

```text
sourceId
sourceType
benchmarkVersion
snapshotDate
```

Se faltar:

```text
AUDIT ERROR
```

---

# 122. TESTE DO GEMINI

```text
Gemini High AA == 59
```

```text
Medium == 57
Low == 52
```

```text
GPQA official == null
ARC-AGI2 official == null
```

até nova provenance.

---

# 123. TESTE DEEPSEEK

```text
Flash0731 AA == 52
```

```text
Vision AA == 51
```

Nunca ambos 52.

---

# 124. TESTE MINIMAX

```text
M3 TerminalBench21 == 66.0
```

não 65.5.

---

# 125. TESTE GROK

```text
Grok official TerminalBench30 == 26.0
```

```text
Grok TerminalBench21 == 88.4
sourceType == independent
```

---

# 126. TESTE QWEN FLASH

Não permitir:

```text
qwen3-8-flash.aaIndex = 56
```

a menos que metadata diga:

```text
variantMeasured = qwen3-8-flash-next
```

---

# 127. TESTE MUSE CONTRIBUTOR

Não permitir benchmark inheritance automática:

```text
Contributor AA = Muse AA
```

sem:

```text
exactCheckpointVerified === true
```

---

# 128. TESTE HY4

Hy4 deve possuir:

```text
aaIndex = null
```

até medição AA real.

Não copiar Hy3.

---

# 129. CORRIGIR CONTAGEM DE MODELOS

Depois de adicionar modelos canônicos ausentes:

```text
modelCount =
Object.keys(AI_MODELS_DATA).length
```

Não definir:

```text
47
48
etc.
```

manualmente.

---

# 130. SOURCE REGISTRY

Adicionar source IDs separados para:

```text
Artificial Analysis Gemini 3.8
Artificial Analysis GPT-5.6 Sol
Artificial Analysis GPT-5.6 Terra
Artificial Analysis GPT-5.6 Luna

DeepSeek V4 Flash release
DeepSeek Vision Exp release

SpaceXAI Grok 4.6 announcement

Z.ai GLM-5.3 model card
Z.ai GLM-5.3-Flash model card

Kimi K3 tech blog

Tencent Hy4 model card
Tencent Hy3 model card

Qwen3.8 Max
Qwen3.8 Flash-Next

MiniMax M3

Artificial Analysis Muse Spark 1.3
```

Não inventar URL caso não esteja disponível localmente.

Pode registrar:

```text
publisher
title
sourceType
publishedAt
retrievedAt
```

e deixar:

```text
sourceUrl: null
```

se necessário.

---

# 131. ATUALIZAR DATA DE AUDITORIA

Usar:

```text
verifiedAt:
2026-09-03
```

Dados live devem também possuir:

```text
snapshotDate
```

---

# 132. NÃO SOBRESCREVER RESULTADOS HISTÓRICOS

Quando um leaderboard mudar:

NÃO:

```text
score = novo
```

apagando antigo.

Criar novo snapshot.

Exemplo:

```text
DeepSeek 0731:

vendor Jul31:
54.4

DeepSWE independent Sep2:
53 ±4
```

---

# 133. PERFORMANCE HISTORY

Permitir gráfico:

```text
score over time
cost/task over time
throughput over time
```

para Artificial Analysis e leaderboards live.

---

# 134. RESULTADO ESPERADO

O usuário deve poder abrir:

```text
Gemini 3.8 Flash
```

e descobrir imediatamente:

```text
AA High 59

~305 tok/s

$0.58/task

TB2.1 Google 90.8

TB2.1 provider run 89.x
quando houver

DeepSWE 74 ±1

CursorBench 69.2

HLE 45.4

HLE Verified 54.9

CharXiv 86.2

τ3:
38.1 Google
~45 AA
```

sem misturar os harnesses.

---

# 135. DEEPSEEK VISION RESULTADO ESPERADO

Deve ficar óbvio:

```text
0731:
AA52
TB82.7
DeepSWE vendor54.4

Vision:
AA51
TB83.9
DeepSWE59.3
Chartography64.3
ZeroBench35
```

Ou seja:

> Vision é mais especializado, não simplesmente superior em tudo.

---

# 136. RESULTADO FINAL DO AGENTE

Ao terminar, informar:

```text
modelos canônicos adicionados
dossiês criados
benchmarks adicionados
scores removidos por falta de provenance
scores corrigidos
snapshots históricos preservados
source IDs adicionados
audit assertions adicionados
```

Listar explicitamente:

```text
Gemini GPQA/ARC removidos ou provados
DeepSeek Vision AA corrigido 52 → 51
MiniMax TB 65.5 → 66.0
Grok TB2.1 reclassificado independent
Qwen Flash vs Flash-Next separados
Muse Contributor vs Muse 1.3 separados
Hy4 criado
```

---

# REGRA FINAL

O objetivo não é preencher o maior número possível de células.

O objetivo é ter o maior número possível de células **verdadeiras e auditáveis**.

Se um dado não existir:

```text
null
```

é melhor que estimativa.

Para os modelos desta tarefa, o portal precisa mostrar justamente que:

```text
um modelo pode ser excelente em coding e ruim em long context

excelente em multimodal e pior em cyber

excelente em intelligence e lento

barato por token e caro por tarefa

ter 1M de contexto e não conseguir usar bem 1M

ter effort maior e obter score menor
```

O dossiê deve revelar essas diferenças, não escondê-las em um único score geral.
