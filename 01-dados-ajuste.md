# DATA PACK — DADOS VERIFICADOS PARA IMPLEMENTAÇÃO

## Snapshot de referência: 03/09/2026

Use os dados abaixo para executar o prompt anterior.

**Não peça ao usuário para pesquisar esses valores.**
**Não invente dados ausentes.**
Quando houver conflito com a base atual, aplique as correções explicitamente indicadas abaixo.

---

# 1. CORREÇÕES IMPORTANTES JÁ IDENTIFICADAS NO PROJETO

## 1.1 Terminologia do catálogo

O projeto contém **44 modelos catalogados**, mas nem todos são ativos.

Não usar globalmente:

`44 modelos ativos`

Usar:

`44 modelos catalogados`

Os estados devem poder incluir:

```text
active
stable
preview
superseded
legacy
retired
stealth-revealed
```

Exemplos:

```text
claude-fable-5-1 = active/stable
claude-fable-5 = superseded
gemini-3-8-flash = active/stable
gemini-3-7-flash = predecessor / legacy ou superseded conforme canal
glm-5-3-flash = active/stable
Ox Alpha = alias histórico, NÃO modelo ativo
```

---

# 2. CORREÇÃO: OX ALPHA

A relação correta é:

```text
Ox Alpha
    ↓
identidade revelada
    ↓
GLM-5.3-Flash
```

Ox Alpha não deve existir como modelo independente atual.

Modelo canônico:

```js
{
  id: 'glm-5-3-flash',
  name: 'GLM-5.3-Flash',
  provider: 'zai',
  historicalAliases: [
    'Ox Alpha',
    'stealth/ox-alpha'
  ]
}
```

Não confundir com:

`glm-5-3`

GLM-5.3 e GLM-5.3-Flash são modelos diferentes.

GLM-5.3-Flash:

```text
320B parâmetros totais
18B parâmetros ativos/token
1M de contexto
128K de output
multimodal
open weights
licença MIT
Sparse Attention + Linear Attention
mHC
~30T tokens multimodais de treinamento
```

A Z.ai confirmou que o GLM-5.3-Flash foi testado anonimamente como Ox Alpha antes do lançamento público.

Ox Alpha gratuito deve existir apenas no histórico.

---

# 3. CÂMBIO PARA CONVERSÃO EM REAIS

Snapshot:

```js
const FX_RATES_DATA = {
  USD_BRL: {
    rate: 5.1556,
    asOf: '2026-09-03',
    type: 'market-snapshot'
  },

  CNY_BRL: {
    rate: 0.7595,
    asOf: '2026-09-03',
    type: 'market-snapshot'
  }
};
```

Regra:

```text
Preço em reais convertido =
preço USD × 5.1556
```

Não armazenar manualmente o BRL calculado em cada modelo se puder ser derivado.

Mostrar:

```text
US$ 20/mês
≈ R$ 103,11/mês
```

Quando existir preço oficial brasileiro, ele tem prioridade sobre a conversão.

---

# 4. PLANOS CHATGPT / OPENAI

## Individual

```text
ChatGPT Free
USD: $0
BRL: R$0

ChatGPT Go
USD: $8/mês
BRL convertido: ≈ R$41,24

ChatGPT Plus
USD: $20/mês
BRL convertido: ≈ R$103,11

ChatGPT Pro
USD: $200/mês
BRL convertido: ≈ R$1.031,12
```

### CORREÇÃO

Não cadastrar:

```text
ChatGPT Pro 5x = $100
ChatGPT Pro 20x = $200
```

como planos individuais atuais da OpenAI.

Isso pertence à estrutura de outros fornecedores, não à assinatura individual ChatGPT atual.

O ChatGPT possui atualmente um único plano individual:

```text
Pro = $200/mês
```

Go, Plus e Pro não incluem automaticamente consumo de API.

API deve ser representada separadamente.

---

# 5. CHATGPT BUSINESS

Planos atuais:

```text
Business Standard
mensal:
$25 / usuário / mês
≈ R$128,89

anual:
$20 / usuário / mês equivalente
≈ R$103,11
```

```text
Business Premium
mensal:
$125 / usuário / mês
≈ R$644,45

anual:
$100 / usuário / mês equivalente
≈ R$515,56
```

Enterprise:

```text
price = null
pricingType = 'contact-sales'
```

Business suporta créditos flexíveis além do uso incluído.

---

# 6. CLAUDE / ANTHROPIC — PLANOS

## Individual

```text
Claude Free
$0
```

```text
Claude Pro
$20/mês
≈ R$103,11
```

```text
Claude Max 5x
$100/mês
≈ R$515,56
```

```text
Claude Max 20x
$200/mês
≈ R$1.031,12
```

## Team

CORRIGIR dados anteriores caso existam.

Preço atual:

```text
Claude Team

mensal:
$30 / usuário / mês
≈ R$154,67

anual:
$25 / usuário / mês equivalente
≈ R$128,89

mínimo:
5 membros
```

Não cadastrar atualmente:

```text
Team Standard = $25 mensal
Team Premium = $125 mensal
```

como se fossem os tiers oficiais atuais.

Enterprise:

```text
contact sales
```

Assinatura Claude não significa créditos de Anthropic API.

---

# 7. GOOGLE AI — EUA

## Google AI Pro

```text
USD:
$19.99/mês

conversão cambial:
≈ R$103,06
```

## Google AI Ultra 5x

```text
USD:
$99.99/mês

conversão:
≈ R$515,51
```

## Google AI Ultra 20x

```text
USD:
$199.99/mês

conversão:
≈ R$1.031,07
```

---

# 8. GOOGLE AI — PREÇOS OFICIAIS NO BRASIL

Usar estes valores na interface brasileira em vez da simples conversão:

```text
Google AI Pro
R$96,99/mês
```

```text
Google AI Ultra 5x
R$779,90/mês
```

```text
Google AI Ultra 20x
R$999,90/mês
```

Portanto o schema deve suportar:

```js
{
  monthlyPriceUsd: 19.99,

  localizedPricing: {
    BRL: {
      price: 96.99,
      official: true
    }
  }
}
```

Não substituir o preço localizado pela conversão USD.

---

# 9. GOOGLE AI ULTRA E ANTIGRAVITY

Os tiers atuais são:

```text
Pro
Ultra 5x
Ultra 20x
```

Os números 5x e 20x indicam níveis superiores de uso/capacidade em relação ao Pro em produtos Gemini/Antigravity, de acordo com as regras atuais do Google.

Quando os limites básicos são atingidos, AI credits podem ser usados para overage em produtos elegíveis.

Não converter isso em:

```text
número exato de prompts
```

sem dado explícito.

---

# 10. CURSOR — PLANOS ATUAIS

```text
Hobby
$0
```

```text
Pro
$20/mês
≈ R$103,11
```

```text
Pro+
$60/mês
≈ R$309,34
```

```text
Ultra
$200/mês
≈ R$1.031,12
```

## Teams

```text
Teams Standard
$40 / usuário / mês
≈ R$206,22
```

```text
Teams Premium
$120 / usuário / mês
≈ R$618,67
```

Enterprise:

```text
contact-sales
```

### Relação entre tiers

```text
Pro+ ≈ 3x limites Agent do Pro
Ultra ≈ 20x limites Agent do Pro
```

Cursor também oferece consumo on-demand adicional cobrando preços de API/modelo quando habilitado.

---

# 11. CURSOR — POOLS

Separar conceitualmente:

```text
Cursor Models
```

de:

```text
Other Models
```

Cursor Models atualmente inclui modelos como:

```text
Grok 4.6
Grok 4.5
Composer 2.5
```

Modelos de terceiros normalmente seguem economics próprios/API rates no pool correspondente.

Não reutilizar automaticamente o preço da API direta como se fosse a experiência econômica completa do plano Cursor.

---

# 12. OPENCODE GO

Plano:

```text
OpenCode Go
$10/mês
≈ R$51,56
```

Limites atuais do plano:

```text
5-hour usage value:
$12

weekly:
$30

monthly:
$60
```

Esses valores representam o valor de uso consumível conforme multiplicadores/preços dos modelos.

---

# 13. OPENCODE GO — CATÁLOGO E ESTIMATIVA DE REQUISIÇÕES

Atualizar o catálogo atual utilizando estes valores.

Formato:

```text
modelo
requests / 5h
requests / semana
requests / mês
```

### Grok 4.6

```text
169
423
845
```

### GPT-5.6 Luna

```text
2050
5100
10250
```

### GLM-5.3-Flash

```text
1580
3950
7900
```

### GLM-5.3

```text
220
540
1080
```

### GLM-5.2

```text
880
2150
4300
```

### GLM-5.1

```text
880
2150
4300
```

### Kimi K3

```text
110
250
490
```

### Kimi K2.7 Code

```text
1350
3380
6750
```

### Kimi K2.6

```text
1150
2880
5750
```

### LongCat-2.0

```text
11400
28600
57200
```

### MiMo-V2.5

```text
30100
75200
150400
```

### MiMo-V2.5-Pro

```text
3250
8150
16300
```

### MiniMax M3

```text
3200
8000
16000
```

### MiniMax M2.7

```text
3400
8500
17000
```

### Muse Spark 1.2 Contributor

```text
45300
113300
226600
```

### Qwen3.8 Max

```text
160
400
810
```

### Qwen3.8 Flash

```text
5400
13500
27000
```

### Qwen3.7 Max

```text
170
420
840
```

### Qwen3.7 Plus

```text
4300
10800
21600
```

### Qwen3.6 Plus

```text
3300
8200
16300
```

### DeepSeek V4 Pro

```text
1050
2600
5200
```

### DeepSeek V4 Flash

```text
7600
18900
37800
```

### DeepSeek V4 Flash Vision Exp

```text
3800
9450
18900
```

### Tencent Hy4 Preview

```text
1350
3380
6770
```

### Tencent Hy3

```text
4300
10750
21500
```

Existe também Muse Spark 1.3 Contributor em regiões elegíveis, mas não atribua uma estimativa de requisições sem dado publicado na mesma tabela.

Ox Alpha não deve estar mais na lista.

---

# 14. xAI / SUPERGROK

```text
xAI Free
$0
```

```text
SuperGrok
$30/mês
≈ R$154,67
```

```text
SuperGrok Plus
$100/mês
≈ R$515,56
```

SuperGrok Plus possui limites substancialmente maiores e recursos adicionais.

---

# 15. Z.AI CODING PLAN

## Mensal

### Lite

```text
$18/mês
≈ R$92,80
```

### Pro

```text
$72/mês
≈ R$371,20
```

### Max

```text
$160/mês
≈ R$824,90
```

## Anual — valor mensal equivalente

```text
Lite
$12.60/mês equivalente
≈ R$64,96
```

```text
Pro
$50.40/mês equivalente
≈ R$259,84
```

```text
Max
$112/mês equivalente
≈ R$577,43
```

Total anual:

```text
Lite:
$151.20
≈ R$779,53

Pro:
$604.80
≈ R$3.118,11

Max:
$1,344
≈ R$6.929,13
```

Não misturar promoções temporárias de ZCode/AutoClaw com o preço-base do Coding Plan.

---

# 16. KIMI MEMBERSHIP

Os preços oficiais são em CNY.

## Andante

```text
¥49/mês
≈ US$7,22
≈ R$37,22

About Agent uses:
30

Parallel tasks:
1

Agent Swarm:
não incluído

Scheduled tasks:
6

Projects:
20

Storage:
20 GB
```

## Moderato

```text
¥99/mês
≈ US$14,58
≈ R$75,19

About Agent uses:
60

Parallel tasks:
2

Agent Swarm:
25 uses
2 subtasks

Scheduled tasks:
10

Projects:
20

Storage:
20 GB
```

## Allegretto

```text
¥199/mês
≈ US$29,32
≈ R$151,14

About Agent uses:
150

Parallel tasks:
2

Agent Swarm:
50 uses
4 subtasks

Scheduled tasks:
15

Projects:
20

Storage:
20 GB
```

## Allegro

```text
¥699/mês
≈ US$102,97
≈ R$530,89

About Agent uses:
360

Parallel tasks:
4

Agent Swarm:
120 uses
8 subtasks

Scheduled tasks:
20

Projects:
100

Storage:
50 GB

K3:
suporte a conversas de ~1M tokens
```

Todos os tiers compartilham um pool de créditos.

Kimi Code possui limites próprios de uso em janela de 5 horas/semanais; não converta os créditos acima diretamente em prompts de coding.

---

# 17. CORREÇÃO DE API — GPT-5.6 SOL

O projeto pode conter preço de lançamento antigo.

Preço atual da API em setembro/2026:

```text
GPT-5.6 Sol

input:
$4 / 1M tokens

cached input:
$0.40 / 1M

output:
$20 / 1M
```

Conversão aproximada:

```text
input:
≈ R$20,62 / 1M

cached:
≈ R$2,06 / 1M

output:
≈ R$103,11 / 1M
```

Contexto:

```text
~1.05M
```

Max output:

```text
128K
```

Knowledge cutoff:

```text
16/02/2026
```

O preço de lançamento `$5/$30` não deve ser tratado como preço atual.

Manter no histórico de preços, se desejado.

---

# 18. GPT-5.6 TERRA — PREÇO ATUAL

```text
input:
$2/M

cached:
$0.20/M

output:
$12/M
```

BRL aproximado:

```text
input:
R$10,31/M

cached:
R$1,03/M

output:
R$61,87/M
```

Contexto:

```text
~1.05M
```

Output:

```text
128K
```

---

# 19. GPT-5.6 LUNA — PREÇO ATUAL

```text
input:
$0.20/M

cached:
$0.02/M

output:
$1.20/M
```

BRL:

```text
input:
≈ R$1,03/M

cached:
≈ R$0,10/M

output:
≈ R$6,19/M
```

Contexto:

```text
~1.05M
```

Output:

```text
128K
```

### Long context pricing

Para requests acima de aproximadamente 272K tokens de input:

```text
input:
2x

output:
1.5x
```

na request correspondente.

Cache write:

```text
~1.25x do uncached input
```

quando aplicável.

---

# 20. CORREÇÕES ANTHROPIC — API

Use esta tabela como canonical pricing atual.

| Modelo            | Input | Cache write 5m | Cache write 1h | Cache hit | Output |
| ----------------- | ----: | -------------: | -------------: | --------: | -----: |
| Claude Fable 5.1  |   $10 |         $12.50 |            $20 |     $0.25 |    $50 |
| Claude Fable 5    |   $10 |         $12.50 |            $20 |     $1.00 |    $50 |
| Claude Opus 5     |    $5 |          $6.25 |            $10 |     $0.50 |    $25 |
| Claude Opus 4.6   |    $5 |          $6.25 |            $10 |     $0.50 |    $25 |
| Claude Sonnet 5   |    $2 |          $2.50 |             $4 |     $0.20 |    $10 |
| Claude Sonnet 4.6 |    $3 |          $3.75 |             $6 |     $0.30 |    $15 |
| Claude Haiku 4.5  |    $1 |          $1.25 |             $2 |     $0.10 |     $5 |

Valores são por 1M tokens.

---

# 21. CORRIGIR CLAUDE FABLE 5

No projeto atual está cadastrado aproximadamente como:

```text
$12 input
$60 output
$1.20 cache read
```

Isso está ERRADO.

Corrigir para:

```text
input:
$10

cache read:
$1

cache write 5m:
$12.50

cache write 1h:
$20

output:
$50
```

Fable 5 permanece no catálogo como:

```text
status: superseded
```

Max output:

```text
128K
```

---

# 22. CORRIGIR CLAUDE OPUS 5

O projeto atualmente contém aproximadamente:

```text
$6 input
$30 output
```

Isso está ERRADO.

Atual:

```text
input:
$5

cache hit:
$0.50

cache write 5m:
$6.25

cache write 1h:
$10

output:
$25
```

Context:

```text
1M
```

Max output:

```text
128K
```

Knowledge cutoff:

```text
Maio/2026
```

---

# 23. CLAUDE SONNET 5

Preço atual:

```text
input:
$2

cache read:
$0.20

cache write 5m:
$2.50

cache write 1h:
$4

output:
$10
```

O preço `$2/$10`, inicialmente tratado como introdutório, permanece como pricing padrão.

Não aumentar automaticamente para `$3/$15`.

Context:

```text
1M
```

Max output:

```text
128K
```

Knowledge cutoff:

```text
Janeiro/2026
```

---

# 24. CLAUDE OPUS 4.6

Corrigir max output se estiver 64K.

Atual:

```text
context:
1M

max output:
128K

input:
$5

cache hit:
$0.50

cache write 5m:
$6.25

cache write 1h:
$10

output:
$25
```

Release:

```text
05/02/2026
```

Knowledge cutoff:

```text
Maio/2025
```

Status:

```text
legacy
```

Não aposentar definitivamente antes da política publicada permitir isso; atualmente o earliest retirement informado fica em torno de fevereiro/2027.

---

# 25. CLAUDE SONNET 4.6

```text
context:
1M

max output:
128K

input:
$3

cache:
$0.30

cache write 5m:
$3.75

cache write 1h:
$6

output:
$15

release:
17/02/2026

knowledge cutoff:
Agosto/2025
```

Status:

```text
legacy
```

---

# 26. CLAUDE HAIKU 4.5

O projeto está com max output de 32K.

Corrigir para:

```text
context:
200K

max output:
64K

input:
$1

cache:
$0.10

cache write 5m:
$1.25

cache write 1h:
$2

output:
$5

knowledge cutoff:
Fevereiro/2025
```

---

# 27. GEMINI 3.8 FLASH — PRICING CORRETO

Até:

```text
31/12/2026
```

usar:

```text
input:
$0.75/M

output:
$3.75/M

cache:
$0.075/M

cache storage:
$0.50 / MTok-hour
```

Batch:

```text
input:
$0.375/M

output:
$1.875/M

cache:
$0.0375/M
```

---

# 28. GEMINI 3.8 — PREÇO APÓS PROMOÇÃO

O projeto atualmente contém aproximadamente:

```text
input $1.00
output $4.50
cache $0.10
```

para janeiro/2027.

Isso está ERRADO.

A partir de:

```text
01/01/2027
```

usar:

```text
input:
$1.50/M

output:
$7.50/M

cache:
$0.15/M

cache storage:
$1.00 / MTok-hour
```

Batch:

```text
input:
$0.75

output:
$3.75

cache:
$0.075
```

---

# 29. GEMINI 3.8 — SEARCH / MAPS

Gemini 3 possui uma franquia compartilhada aproximada de:

```text
5.000 requisições de Search/mês
```

depois:

```text
$14 / 1.000 Search requests
```

quando aplicável.

Maps possui esquema semelhante para requests faturáveis.

Não transformar isso em tokens.

---

# 30. GEMINI 3.8 — SPECS

```text
context:
1,048,576

max output:
65,536
```

Input:

```text
text
image
video
audio
PDF
```

Output:

```text
text
```

Recursos:

```text
Context Caching
Code Execution
Computer Use
File Search
Function Calling
Google Maps
Google Search
Structured Output
Thinking Low/Medium/High
URL Context
```

---

# 31. CORREÇÃO GEMINI 3.8 — ARTIFICIAL ANALYSIS

O projeto possui TTFT muito baixo e incorreto:

```text
Low ~0.25
Medium ~0.55
High ~1.20
```

Corrigir o snapshot atual para aproximadamente:

## Low

```text
AA Intelligence:
52

output speed:
313.5 tok/s

TTFT:
0.70 s

cost/task AA:
$0.24
```

## Medium

```text
AA Intelligence:
57

output speed:
312.3 tok/s

TTFT:
6.44 s

cost/task:
$0.41
```

## High

```text
AA Intelligence:
59

output speed:
304.6 tok/s

TTFT:
13.39 s

cost/task:
$0.58
```

A diferença de TTFT entre Medium/High e Low é real e importante.

---

# 32. GEMINI 3.8 — OUTPUT VOLUME NO AA

No Intelligence Index completo, aproximadamente:

```text
Low:
19M output tokens

Medium:
53M

High:
120M
```

High gera aproximadamente:

```text
~30% mais output que Gemini 3.7 Flash High
```

no conjunto comparável.

Por isso o custo real por tarefa pode ser cerca de:

```text
~40% maior
```

mesmo tendo o mesmo preço unitário inicial.

---

# 33. FABLE 5.1 — CLASSIFICAÇÃO CORRETA DOS BENCHMARKS

No projeto atual, estes números aparecem em `officialBenchmarks`:

```text
Terminal-Bench 2.1 = 91.4
SciCode = 62.0
HLE = 59.1
```

Isso está metodologicamente ERRADO.

Eles são resultados da:

```text
Artificial Analysis
```

Portanto devem ir para:

```text
independentBenchmarks.artificialAnalysis
```

e NÃO para:

```text
officialBenchmarks
```

---

# 34. FABLE 5.1 — ARTIFICIAL ANALYSIS

Snapshot:

```text
Low
AA Intelligence: 58
cost/task: $0.77
```

```text
Medium
AA Intelligence: 60
cost/task: $1.00
```

```text
High
AA Intelligence: 62
cost/task: $1.43
```

```text
XHigh
AA Intelligence: 65
cost/task: $2.65
```

```text
Max
AA Intelligence: 66
cost/task: $3.69
```

Max é o atual topo do AA Intelligence Index nesse snapshot.

Resultados independentes adicionais:

```text
Terminal-Bench 2.1:
91.4%

SciCode:
62.0%

HLE:
59.1%
```

Metodologia importante:

```text
~4% dos output tokens do teste AA
foram atendidos por fallback server-side
para modelos Opus em situações de safeguards.
```

Guardar essa nota.

---

# 35. FABLE 5.1 — CURSORBENCH

Manter/usar:

| Effort | Score | $/task | tokens/task | steps |
| ------ | ----: | -----: | ----------: | ----: |
| Low    |  66.2 |  $2.90 |      19,522 |    31 |
| Medium |  68.0 |  $3.53 |      23,801 |    36 |
| High   |  69.4 |  $4.80 |      33,153 |    44 |
| XHigh  |  72.8 |  $6.96 |      51,349 |    55 |
| Max    |  73.4 |  $9.64 |      72,060 |    70 |

Esses dados são independentes/CursorBench.

---

# 36. GEMINI 3.8 — DEEPSWE

Guardar como independente:

```text
DeepSWE 1.1:
74.0%

confidence:
±1 pp

cost/task:
$2.36

output tokens/task:
143,000

agent steps/task:
166

snapshot:
02/09/2026
```

Esse dado NÃO é simplesmente “benchmark oficial Google”.

---

# 37. GEMINI 3.8 — CURSORBENCH

High:

```text
score:
69.2

cost:
$2.38

tokens:
81,524

steps:
161
```

Medium:

```text
score:
67.0

cost:
$1.93

tokens:
61,603

steps:
136
```

---

# 38. GLM-5.3-FLASH — ARTIFICIAL ANALYSIS

Atual:

```text
AA Intelligence:
57

throughput:
~44.6 tok/s

TTFT:
~1.65 s

cost/task:
~$0.09

context:
1M

params:
320B total
18B active
```

API pricing aproximado:

```text
input:
$0.15/M

output:
$0.50/M
```

Não manter:

```text
Ox Alpha AA = 48
$0/task
85 tok/s
```

como ranking atual.

Isso pertence ao preview histórico.

---

# 39. GLM-5.3 VS GLM-5.3-FLASH

Manter separados.

Snapshot AA:

```text
GLM-5.3 Max
AA Intelligence:
~60

throughput:
~70 tok/s

params:
~753B total
~40B active
```

```text
GLM-5.3-Flash
AA Intelligence:
57

throughput:
~44.6 tok/s

params:
320B
18B active
```

Flash não significa necessariamente maior decode throughput que o modelo full no provider medido.

---

# 40. HISTÓRICO — GLM-5.3-FLASH

Adicionar eventos:

```js
{
  modelId: 'glm-5-3-flash',

  historicalAliases: [
    'Ox Alpha',
    'stealth/ox-alpha'
  ],

  events: [
    {
      date: '2026-08-20',
      type: 'stealth-preview',
      title: 'Surge anonimamente como Ox Alpha'
    },

    {
      date: '2026-08-26',
      type: 'identity-reveal',
      title: 'Z.ai revela Ox Alpha como GLM-5.3-Flash'
    },

    {
      date: '2026-08-26',
      type: 'pricing-change',
      title: 'Preview gratuito é encerrado; modelo passa a operar com identidade e pricing próprios'
    }
  ]
}
```

Preservar benchmark histórico:

```text
Ox Alpha stealth preview
DeepSWE:
58.4%

66 / 113 tasks
```

não como resultado atual principal.

---

# 41. HISTÓRICO — CLAUDE FABLE

Adicionar linhagem:

```text
Claude Fable 5
↓
Claude Fable 5.1
```

Eventos mínimos:

```text
Fable 5
release: 2026

Fable 5.1
release: 01/09/2026

Fable 5:
status atual = superseded
```

Melhorias 5 → 5.1 registráveis:

```text
CursorBench Max:
70.5 → 73.4

CursorBench Max cost:
$17.32 → $9.64

tokens/task Max:
103,525 → 72,060

cache hit:
$1.00/M → $0.25/M
```

---

# 42. HISTÓRICO — GEMINI FLASH

Adicionar linhagem:

```text
Gemini 3.5 Flash
↓
Gemini 3.7 Flash
↓
Gemini 3.8 Flash
```

3.8:

```text
release:
02/09/2026
```

Principais mudanças 3.7 → 3.8:

```text
mais autonomia agentic
mais passos/tool calls
maior consumo de output tokens
melhor DeepSWE/Terminal/CursorBench
similar high raw decode throughput
```

---

# 43. HISTÓRICO — GLM

```text
GLM-5.1
↓
GLM-5.2
↓
GLM-5.3

GLM-5.3-Flash
é variante/sibling de eficiência,
não sucessor direto do GLM-5.3.
```

Não desenhar:

```text
5.3 → 5.3-Flash
```

como se fosse necessariamente sucessor.

Melhor:

```text
            GLM-5.3
           /
GLM-5.x ──
           \
            GLM-5.3-Flash
```

---

# 44. HISTÓRICO CLAUDE 4.6 → 5

```text
Claude Opus 4.6
↓
Claude Opus 5
```

```text
Claude Sonnet 4.6
↓
Claude Sonnet 5
```

Haiku 4.5 deve permanecer linha separada enquanto não houver sucessor confirmado no catálogo.

---

# 45. COMMUNITY DATA — REGRA

Os dados abaixo são:

```text
sourceType: community
evidenceType: anecdotal
```

Não são benchmarks.

Devem aparecer em área separada.

---

# 46. COMMUNITY REPORT — SOL VS GROK 4.6

Adicionar entrada resumida:

```js
{
  models: ['gpt-5-6-sol', 'grok-4-6'],

  date: '2026-08-14',

  platform: 'Reddit / r/cursor',

  harness: 'Cursor',

  taskCategory: 'backend',

  configuration: {
    sol: 'Medium',
    grok: 'Extra High'
  },

  taskApproxSize: '~2.5k LOC',

  findings: {
    preferred: 'gpt-5-6-sol',
    preferenceApprox: '60/40',
    solStrengths: [
      'tratamento de edge cases financeiros',
      'race conditions',
      'clareza arquitetural',
      'testes mais significativos'
    ],

    grokStrengths: [
      'menor custo',
      'velocidade'
    ]
  },

  confidence: 'low-medium'
}
```

Comentários da discussão foram mistos; não tratar como consenso universal.

---

# 47. COMMUNITY — GROK 4.6 NO DIA A DIA

Relato de agosto/2026:

```text
harness:
Cursor

stack:
React + Java

percepção:
Grok 4.6 melhor que 4.5 em:
- codebases maiores
- instruction following
- menos edições desnecessárias

mas usuário ainda preferia Sol
para coding/reasoning mais complexo.
```

Confidence:

```text
low
```

---

# 48. COMMUNITY — SOL E OVERENGINEERING

Adicionar tema recorrente:

```text
GPT-5.6 Sol

positive:
- correctness
- edge cases
- robustez
- testes
- proteção contra falhas

negative:
- pode overengineer
- changesets maiores
- adiciona guards/abstrações demais
- maior carga de revisão humana
```

Um relato comparando Sol High e Fable High disse que Sol produziu mudanças até aproximadamente 3x maiores em certos casos.

Registrar como:

```text
anecdotal
```

e não como métrica objetiva universal.

---

# 49. COMMUNITY — WORKFLOW FABLE → SOL

Tema recorrente em usuários avançados:

```text
Fable:
planejamento / arquitetura

Sol:
implementação / robustez

Fable ou Sol:
review
```

Representar como padrão comunitário possível:

```text
Claude Fable → GPT-5.6 Sol
```

Especialmente para tarefas em que:

```text
Fable mantém escopo simples
Sol fortalece edge cases e testes
```

---

# 50. COMMUNITY — UNITY / CLAUDE

Caso documentado:

```text
modelo:
Claude Fable 5

harness:
Claude Code + Unity MCP

engine:
Unity

language:
C#

tempo aproximado:
~13 horas
```

Workflow:

```text
implementar sistema
→ testar
→ debug
→ ajustar
→ próximo sistema
```

Conclusão apropriada:

```text
evidência positiva para game development iterativo
com MCP e forte supervisão humana
```

Não transformar em:

```text
"gera jogo completo sozinho"
```

---

# 51. COMMUNITY — FABLE 5.1 / THREE.JS GAME PROTOTYPE

Caso de 01/09/2026:

```text
modelo:
Claude Fable 5.1

projeto:
city-builder / simulation prototype
inspirado em Cities: Skylines

stack:
Three.js

arquitetura:
planejamento primeiro
~14 subagentes paralelos

tempo:
~1 hora
```

Consumo aproximado:

```text
input:
297.7K

output:
1.9M

cache read:
118.2M

cache write:
6.0M
```

Usar como evidência de:

```text
autonomia
orquestração
rapid prototyping
large multi-agent generation
```

NÃO usar como evidência de:

```text
qualidade de jogo final
game feel
produção completa
```

---

# 52. COMMUNITY — FABLE 5.1 QUOTA BURN

Relatos dos dias 2–3/09/2026 indicam:

```text
qualidade:
muito alta

problema:
alto consumo da janela de 5h em tarefas grandes
```

Um usuário relatou que:

```text
review grande de codebase
~30 minutos
consumiu praticamente toda a barra de 5h
```

Outros usuários relataram comportamento semelhante.

Classificar:

```text
communitySignal:
quota-burn

confidence:
medium
```

Não converter em uma quantidade exata universal de tokens/cota.

---

# 53. COMMUNITY — GLM-5.3 VS GROK 4.6 EM FRONTEND

Um comparativo comunitário de agosto:

## Grok 4.6

```text
tempo:
~25 minutos

arquivos:
~60

bugs encontrados posteriormente:
5

observação:
alterou de forma significativa parte do design existente
```

## GLM-5.3

```text
tempo:
~1.5 hora

arquivos:
~60

fases:
12

bugs relatados:
0

testes manuais:
3 resoluções
```

Percepção do autor:

```text
GLM:
mais metódico
melhor aderência ao design
mais disciplinado em testes

Grok:
muito mais rápido
```

Tratar como:

```text
single-user anecdote
confidence = low
```

Mas usar os temas em Engineering Behavior.

---

# 54. COMMUNITY — GEMINI 3.8 NO ANTIGRAVITY

Relato inicial em repo sério:

```text
Gemini 3.8 High
```

percebido como:

```text
melhor que 3.7 em:
- não encerrar tarefa cedo demais
- investigar mais
- testar mais
- ficar mais grounded

ainda abaixo de Sol em determinação
e abaixo de alguns GLM em groundedness,
segundo o usuário.
```

Quota:

```text
similar ou um pouco maior que 3.7
```

Confidence:

```text
low
```

---

# 55. COMMUNITY — GEMINI 3.8 TOKEN BURN

Vários relatos iniciais observam:

```text
muito rápido em tok/s
mas bastante verboso
```

e:

```text
High utiliza significativamente mais tokens que 3.7
```

Esse community signal é corroborado pela Artificial Analysis, que mediu aproximadamente 30% mais output tokens no High.

Portanto:

```text
confidence:
medium-high
```

para o tema:

```text
high-output-token-consumption
```

---

# 56. ENGINEERING BEHAVIOR — SEED CALIBRATION

Criar esta matriz como:

```text
sourceType = calibrated
notOfficial = true
```

Escala:

```text
0 = ruim
100 = excelente
```

Para riscos, inverter visualmente ou usar sufixo `Risk`.

## Claude Fable 5.1

```text
scopeDiscipline: 94
architecture: 100
autonomy: 100
persistence: 98
firstPassSuccess: 96
testDiscipline: 96
instructionFollowing: 97
visualTaste: 94
humanReviewEase: 83
quotaEfficiency: 55
overengineeringRisk: 32
destructiveEditSafety: 91
```

## GPT-5.6 Sol

```text
scopeDiscipline: 82
architecture: 98
autonomy: 97
persistence: 99
firstPassSuccess: 97
testDiscipline: 99
instructionFollowing: 95
visualTaste: 87
humanReviewEase: 72
quotaEfficiency: 72
overengineeringRisk: 72
destructiveEditSafety: 90
```

## Gemini 3.8 Flash High

```text
scopeDiscipline: 92
architecture: 94
autonomy: 98
persistence: 98
firstPassSuccess: 94
testDiscipline: 97
instructionFollowing: 95
visualTaste: 94
humanReviewEase: 85
quotaEfficiency: 91
overengineeringRisk: 35
destructiveEditSafety: 91
```

## Grok 4.6

```text
scopeDiscipline: 84
architecture: 92
autonomy: 94
persistence: 94
firstPassSuccess: 91
testDiscipline: 88
instructionFollowing: 92
visualTaste: 96
humanReviewEase: 87
quotaEfficiency: 88
overengineeringRisk: 35
destructiveEditSafety: 82
```

## GLM-5.3

```text
scopeDiscipline: 96
architecture: 95
autonomy: 96
persistence: 98
firstPassSuccess: 94
testDiscipline: 98
instructionFollowing: 96
visualTaste: 96
humanReviewEase: 91
quotaEfficiency: 92
overengineeringRisk: 26
destructiveEditSafety: 95
```

## GLM-5.3-Flash

```text
scopeDiscipline: 94
architecture: 91
autonomy: 93
persistence: 94
firstPassSuccess: 91
testDiscipline: 94
instructionFollowing: 94
visualTaste: 93
humanReviewEase: 92
quotaEfficiency: 99
overengineeringRisk: 23
destructiveEditSafety: 94
```

Esses valores são **estimativas calibradas**, não benchmarks.

Mostrar selo:

`E — Calibrated`

---

# 57. USE CASE — ARQUITETURA DE SISTEMAS / SAAS

Ranking calibrado:

```text
1. Claude Fable 5.1
2. GPT-5.6 Sol
3. Claude Opus 5
4. Gemini 3.8 Flash High
5. GLM-5.3
6. GPT-5.6 Terra
7. Kimi K3
8. Grok 4.6
9. Claude Sonnet 5
10. Qwen3.8 Max
```

### Melhores papéis

```text
Fable 5.1:
Architect / Planner / Final Reviewer

Sol:
Backend architect / correctness / hard debugging

Gemini 3.8:
high-volume implementation + integration

GLM-5.3:
open-weight/cloud planner

Terra:
daily driver balance

Grok 4.6:
fast feature implementation
```

---

# 58. BACKEND CRÍTICO / FINANCEIRO / CONCORRÊNCIA

Ranking calibrado:

```text
1. GPT-5.6 Sol
2. Claude Fable 5.1
3. GPT-5.6 Terra
4. Gemini 3.8 Flash High
5. GLM-5.3
6. Claude Opus 5
7. Claude Sonnet 5
8. Grok 4.6
9. Kimi K3
10. Qwen3.8 Max
```

Sol recebe peso alto por:

```text
edge cases
concurrency
financial correctness
test discipline
```

Além dos benchmarks de reasoning/coding.

---

# 59. FRONTEND / UI

Ranking calibrado, tratando harness como fator importante:

```text
1. Claude Fable 5.1
2. GLM-5.3
3. Grok 4.6
4. Gemini 3.8 Flash
5. Kimi K3
6. Claude Sonnet 5
7. Composer 2.5
8. GPT-5.6 Terra
9. GPT-5.6 Sol
10. GLM-5.3-Flash
```

### Perfis

```text
Fable:
planejamento visual + arquitetura + consistência

GLM-5.3:
metódico, disciplina e testes

Grok:
extremamente rápido, bom gosto visual,
mas maior risco de design drift em alguns relatos

Gemini:
multimodal + browser/tool loops rápidos

Composer:
edição rápida dentro do Cursor
```

---

# 60. GAME DEVELOPMENT — UNITY

Ranking provisório/calibrado:

```text
1. Claude Fable 5.1
2. GPT-5.6 Sol
3. Claude Opus 5
4. Kimi K3
5. Gemini 3.8 Flash
6. GLM-5.3
7. Grok 4.6
8. Claude Sonnet 5
9. GPT-5.6 Terra
10. Qwen3.8 Max
```

Papéis:

```text
Fable:
arquitetura do jogo / systems design / multi-agent

Sol:
C# correctness / debugging / edge cases / performance

Gemini:
workers, assets/docs multimodais, iteration loops

Grok:
rapid iteration / editor tooling

Kimi:
large-context orchestration
```

Confidence geral:

```text
medium-low
```

porque community data específico de game engines ainda é limitado.

---

# 61. GAME DEVELOPMENT — UNREAL / C++

Dar peso maior para:

```text
C++
large codebase
build/debug
performance
long context
architecture
```

Ranking provisório:

```text
1. GPT-5.6 Sol
2. Claude Fable 5.1
3. Claude Opus 5
4. Kimi K3
5. GLM-5.3
6. Gemini 3.8 Flash
7. Grok 4.6
8. Claude Sonnet 5
9. GPT-5.6 Terra
10. Qwen3.8 Max
```

Confidence:

```text
low-medium
```

---

# 62. WEB GAME / THREE.JS

```text
1. Claude Fable 5.1
2. Grok 4.6
3. Gemini 3.8 Flash
4. Kimi K3
5. GLM-5.3
6. GPT-5.6 Sol
7. Claude Sonnet 5
8. GPT-5.6 Terra
9. Composer 2.5
10. GLM-5.3-Flash
```

Fable tem evidência comunitária especialmente forte em rapid prototyping multi-agent.

---

# 63. MONOREPOS GRANDES / BUGS DIFÍCEIS

```text
1. Claude Fable 5.1
2. GPT-5.6 Sol
3. Gemini 3.8 Flash High
4. Claude Opus 5
5. GLM-5.3
6. Kimi K3
7. Grok 4.6
8. GPT-5.6 Terra
9. Claude Sonnet 5
10. DeepSeek V4 Pro
```

Dar pesos altos a:

```text
DeepSWE
Terminal-Bench
long context
persistence
tool adherence
```

---

# 64. RAPID PROTOTYPING

```text
1. Gemini 3.8 Flash
2. Grok 4.6
3. Claude Fable 5.1
4. GPT-5.6 Luna
5. Composer 2.5
6. GLM-5.3-Flash
7. Kimi K3
8. GPT-5.6 Terra
9. Claude Sonnet 5
10. MiMo-V2.5
```

Não interpretar o ranking como capacidade absoluta.

É:

```text
tempo + custo + autonomia + throughput
```

---

# 65. MELHOR WORKER ECONÔMICO

Para volume:

```text
Tier S:

GPT-5.6 Luna
Gemini 3.8 Flash Low/Medium
GLM-5.3-Flash
MiMo-V2.5
Composer 2.5
```

Para local:

```text
GPT-OSS-20B
Nemotron 3.5 Lightning
Qwen3.8-27B
```

Para workers um pouco mais fortes:

```text
DeepSeek V4 Flash
Gemini 3.8 Medium
GLM-5.3-Flash
```

---

# 66. ORQUESTRAÇÃO RECOMENDADA — SISTEMA GRANDE

Qualidade máxima:

```text
Fable 5.1 High/XHigh
        ↓
planejamento e arquitetura
        ↓
Gemini 3.8 Medium/High workers
        ↓
implementação paralela
        ↓
GPT-5.6 Sol
        ↓
review de correctness / edge cases
```

---

# 67. ORQUESTRAÇÃO — CUSTO/BENEFÍCIO

```text
Gemini 3.8 Medium
        ↓
planejamento + implementação
        ↓
Gemini 3.8 High
        ↓
integração
        ↓
Fable 5.1 somente se houver impasse
```

---

# 68. ORQUESTRAÇÃO — BACKEND CRÍTICO

```text
Fable 5.1
↓
define arquitetura

GPT-5.6 Sol
↓
implementa regras críticas

Gemini 3.8
↓
workers / testes / documentação

Sol
↓
review final de edge cases
```

---

# 69. ORQUESTRAÇÃO — GAME DEV

```text
Fable 5.1
↓
arquitetura de sistemas do jogo

Gemini 3.8 / Grok
↓
workers de implementação e iteração

Sol
↓
debugging, performance e correctness

Fable
↓
review de arquitetura
```

---

# 70. STACKS POR ORÇAMENTO — SNAPSHOT

Use estes exemplos como presets iniciais, mas calcule dinamicamente.

## Até ~R$60/mês

```text
OpenCode Go
≈ R$51,56
```

## Até ~R$100/mês

Opções individuais:

```text
Google AI Pro
R$96,99 oficial Brasil
```

ou:

```text
Z.ai Coding Lite
≈ R$92,80
```

ou:

```text
Kimi Moderato
≈ R$75,19
```

## ~R$150–160

Exemplo:

```text
Cursor Pro
≈ R$103,11

+

OpenCode Go
≈ R$51,56

TOTAL:
≈ R$154,67
```

## ~R$200

Exemplo:

```text
Claude Pro
≈ R$103,11

+

Google AI Pro
R$96,99

TOTAL:
≈ R$200,10
```

## ~R$360

```text
Cursor Pro+
≈ R$309,34

+

OpenCode Go
≈ R$51,56

TOTAL:
≈ R$360,90
```

## ~R$500

Exemplo:

```text
Claude Max 5x
≈ R$515,56
```

ou preço oficial/localizado equivalente quando houver.

Não apresentar esses presets como “única escolha correta”.

---

# 71. CAMPOS QUE O AUDITOR ATUAL PRECISA CORRIGIR

O projeto atualmente tem:

```js
assert(modelCount === 44)
```

Isso deve ser removido como verdade permanente.

Novo modelo legítimo não pode fazer o teste falhar.

Use algo como:

```text
modelCount > 0

e

modelCount === número derivado das próprias entries
```

---

# 72. DETECTAR DUPLICATE OBJECT KEYS

O projeto possui objetos onde aparecem múltiplas vezes:

```text
sourceConfidence
sources
```

Exemplo identificado no bloco de GPT-5.6 Pro.

Há também duplicação em Gemini 3.8.

Adicionar auditoria estática para:

```text
duplicate JS object keys
```

porque JavaScript sobrescreve silenciosamente o primeiro campo.

---

# 73. GPT-5.6 PRO — PROVENANCE

No bloco atual existem várias repetições de:

```text
sourceConfidence
sources
```

e uma das listas chega a incluir fonte de xAI/Grok.

Corrigir.

GPT-5.6 Pro não deve herdar:

```text
xai-grok46
```

como source.

Se não houver benchmark separado para Pro, marcar:

```text
benchmarkCoverage = limited
```

e não copiar resultados de Sol como se fossem Pro.

---

# 74. GEMINI 3.8 — SOURCES DUPLICADAS

O objeto possui um bloco que ainda aponta para:

```text
google-deepmind-gemini37
```

e depois outro correto para Gemini 3.8.

Remover a duplicação.

Canonical:

```text
google-deepmind-gemini-38
cursorbench-32
deepswe-datacurve
artificial-analysis
```

conforme cada dado.

---

# 75. PROBLEMA COM COVERAGE

Não dizer:

```text
Pricing = 44/44 = 100%
```

simplesmente porque todos possuem:

```js
pricing.standard
```

Alguns modelos open-weight têm zero porque são self-hosted e outros podem ter pricing antigo.

Criar:

```text
verified-current
stale
self-hosted
not-applicable
unknown
```

---

# 76. FRESHNESS

Usar:

```text
plan/pricing:
fresh <= 14 dias

benchmark:
fresh <= 30 dias

community:
fresh <= 30 dias

technical specs:
fresh <= 90 dias
```

---

# 77. NOVOS DATASETS ESPERADOS

Criar ou equivalente:

```text
FX_RATES_DATA

SUBSCRIPTION_PLANS_DATA

MODEL_HISTORY_DATA

BENCHMARK_HISTORY_DATA

PRICE_HISTORY_DATA

PLATFORM_MODEL_CATALOG

COMMUNITY_REPORTS_DATA

ENGINEERING_BEHAVIOR_DATA

USE_CASE_COMPARISON_DATA
```

---

# 78. CUIDADO COM OS SCORES CALIBRADOS

Todos os rankings de projeto e Engineering Behavior deste documento são:

```text
E = estimated/calibrated
```

Mostrar isso claramente.

Nunca exibir:

```text
Fable Game Development = 98%
```

como se fosse benchmark oficial.

Preferir:

```text
Game Dev Fit
98/100
Calibrado
```

---

# 79. DADOS NÃO DEVEM SER MISTURADOS

Manter visualmente separados:

```text
Official manufacturer data
Independent benchmark
Community experience
Calibrated recommendation
```

---

# 80. RESULTADO ESPERADO

Depois de aplicar este DATA PACK, o portal deve conseguir mostrar:

```text
MODELO
+
HISTÓRICO
+
PLANO
+
USD
+
BRL
+
API PRICE
+
PLATAFORMA
+
BENCHMARK
+
COMUNIDADE
+
USE CASE
+
CUSTO
+
ORQUESTRAÇÃO
```

sem exigir nova pesquisa na internet durante esta implementação.

Use **03/09/2026** como `verifiedAt` para os dados deste pacote, salvo quando uma data histórica específica já foi fornecida.
