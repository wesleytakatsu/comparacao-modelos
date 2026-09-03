# AUDITORIA CORRETIVA FINAL — CONSISTÊNCIA SEMÂNTICA, PLANOS, PLATAFORMAS, BENCHMARKS E PROVENANCE

## Snapshot de referência: 03/09/2026 — aproximadamente 03:30 BRT

Você está trabalhando diretamente no projeto:

`wesleytakatsu/comparacao-modelos`

A implementação atual melhorou muito, mas a nova auditoria encontrou diversos erros residuais e problemas arquiteturais que ainda podem produzir informações falsas.

Sua tarefa é aplicar TODAS as correções deste documento.

NÃO pesquise na internet: os dados necessários estão fornecidos abaixo.

Se uma instrução anterior entrar em conflito com este documento, **este documento tem prioridade**.

---

# 1. O QUE JÁ ESTÁ CORRETO E DEVE SER PRESERVADO

Não reverta as seguintes melhorias:

## OpenCode Go

Preservar o catálogo canônico atual com:

```text
26 modelos
US$10/mês

limite nominal:
US$12 / 5h
US$30 / semana
US$60 / mês

classe US$60:
1× burn
100% quota efetiva
6× valor do plano

classe US$30:
2× burn
50% quota efetiva
3× valor

classe US$15:
4× burn
25% quota efetiva
1,5× valor
```

Preservar:

* simulador de quota;
* request estimates oficiais;
* pricing específico Go;
* token profiles;
* Zen balance fallback;
* IDs `opencode-go/...`;
* warnings Muse Contributor;
* warning de revalidação DeepSeek ZDR.

---

## Google AI Pro Brasil

Preservar:

```text
R$96,99/mês
5 TB
4× acesso vs Free
1.000 Flow credits/mês
até 5 pessoas no grupo familiar
```

---

## Google AI Plus Brasil

Preservar:

```text
R$24,99/mês
400 GB
2× acesso vs Free
200 Flow credits/mês
até 5 pessoas
```

---

## Google Ultra

Preservar:

```text
Ultra 5x:
20 TB
10.000 Flow credits

Ultra 20x:
30 TB
25.000 Flow credits
```

---

## Claude Fable no Pro

Preservar:

```text
available = true
includedInBaseQuota = false
billingMode = usage-credits
```

Fable 5.1 NÃO está incluído na franquia do Claude Pro.

---

## Cursor Models Pool

Preservar EXATAMENTE:

```text
grok-4-6
grok-4-5
composer-2-5
```

---

## Antigravity

Preservar:

```text
Gemini pool:
gemini-3-8-flash
gemini-3-7-flash
gemini-3-6-flash
gemini-3-1-pro
```

```text
Claude/GPT pool:
claude-sonnet-4-6
claude-opus-4-6
gpt-oss-120b
```

---

## CamelAI

Preservar a separação:

```text
camelCode
camelStream
self-hosted
legacy
```

Não adicionar Camel Free nem camelStream Auto aos 44 modelos canônicos.

---

# 2. PROBLEMA ARQUITETURAL CENTRAL: `includedModels`

Mesmo depois das correções, `includedModels` continua misturando coisas diferentes.

Exemplos atuais incorretos:

```text
GPT-5.6 Sol
Canvas
Deep Research
Admin Console
5 TB Cloud
Workspaces
```

Esses itens NÃO pertencem à mesma entidade.

Criar separação.

---

# 3. NOVO SCHEMA DE PLANO

Cada plano deve possuir pelo menos:

```js
{
  id,
  provider,
  product,
  planName,

  pricing: {},

  modelAccess: [],
  features: [],
  storage: {},
  usage: {},
  credits: {},
  surfaces: [],

  privacyProfileId,

  current,
  verifiedAt
}
```

---

# 4. `modelAccess`

Usar estrutura semelhante:

```js
{
  modelId: 'gpt-5-6-sol',
  surface: 'chatgpt-chat',

  available: true,
  included: true,

  billingMode: 'included',

  efforts: [
    'medium',
    'high'
  ],

  notes: ''
}
```

Não guardar feature dentro disso.

---

# 5. `features`

Exemplo:

```js
features: [
  'Canvas',
  'Deep Research',
  'Work',
  'Codex'
]
```

---

# 6. SURFACES PRECISAM VIRAR ENTIDADES DE PRIMEIRA CLASSE

Um mesmo plano oferece modelos diferentes dependendo do produto/surface.

Criar suporte para:

```text
chatgpt-chat
chatgpt-work
codex

claude-chat
claude-code
claude-cowork
claude-agent-sdk

gemini-app
antigravity
google-ai-studio
flow
jules

cursor-agent
cursor-tab
cursor-cloud-agent

camelcode
camelstream
```

---

# 7. CHATGPT FREE / GO — GPT-5.6

Na experiência normal do ChatGPT:

```text
default model:
GPT-5.6 Luna
```

Free e Go:

```text
GPT-5.6 Sol:
NÃO incluído
```

```text
Think:
GPT-5.6 Luna
```

Importante:

```text
Free e Go possuem chats de texto cotidianos ilimitados,
sujeitos a proteções de abuso.
```

Mas continuam existindo limites separados para:

```text
uploads de arquivos
imagem
voz
análise de dados
outras ferramentas
```

Não escrever genericamente:

```text
“mensagens ilimitadas”
```

sem essa ressalva.

---

# 8. CHATGPT PLUS — SURFACE CHAT

No ChatGPT normal:

```text
GPT-5.6 Sol Instant:
sim

GPT-5.6 Sol Medium:
sim

GPT-5.6 Sol High:
sim

GPT-5.6 Sol Extra High:
não

GPT-5.6 Sol Pro:
não
```

Terra e Luna:

```text
não selecionáveis em conversa padrão
```

Portanto REMOVER do `includedModels` genérico:

```text
GPT-5.6 Terra
GPT-5.6 Luna
```

como se fossem opções normais do picker Plus.

---

# 9. CHATGPT PRO 5X / 20X

Nos tiers Pro:

```text
Sol Medium
Sol High
Sol Extra High
Sol Pro
```

são elegíveis conforme o controle atual.

Não criar modelos:

```text
GPT-5.6 Sol Max
GPT-5.6 Sol Ultra
```

Esses nomes não são modelos canônicos.

---

# 10. CHATGPT WORK

Para:

```text
Plus
Pro
Business
Enterprise
```

Work oferece:

```text
GPT-5.6 Sol
GPT-5.6 Terra
GPT-5.6 Luna
```

Esse acesso é específico da surface:

```text
chatgpt-work
```

---

# 11. CODEX

Free e Go:

```text
GPT-5.6 Terra
```

Plus / Pro / Business / Enterprise:

```text
GPT-5.6 Sol
GPT-5.6 Terra
GPT-5.6 Luna
```

Isso é específico de:

```text
codex
```

---

# 12. OPENAI API

Disponíveis:

```text
GPT-5.6 Sol
GPT-5.6 Terra
GPT-5.6 Luna
```

NÃO disponível como OpenAI API model:

```text
GPT-5.6 Sol Pro
```

Corrigir:

```js
gpt-5-6-pro.directApi = false
```

---

# 13. REMOVER PREÇO API FICTÍCIO DO SOL PRO

Atualmente o modelo Sol Pro possui pricing semelhante a:

```text
$15 input
$60 output
```

Esse preço não deve ser tratado como OpenAI API pricing.

Sol Pro é uma opção de produto do ChatGPT Pro, não um endpoint público da OpenAI API.

Usar:

```js
pricing: {
  api: null,
  subscriptionOnly: true
}
```

ou schema equivalente.

---

# 14. PRIVACIDADE CHATGPT PERSONAL

O projeto ainda contém afirmações excessivas como:

```text
“sem treino com prompts”
“proteção comercial”
```

para contas pessoais.

Corrigir Free / Go / Plus / Pro para:

```js
{
  profileType: 'consumer',
  modelTrainingControl: 'opt-out-available',
  noTrainingByDefault: false,
  zdr: false
}
```

Usuários pessoais podem desativar:

```text
Improve the model for everyone
```

Não afirmar ZDR.

---

# 15. CHATGPT BUSINESS

Para Business:

```text
inputs/outputs não usados para treinamento por padrão
```

Isso NÃO significa:

```text
Zero Data Retention
```

Remover frases atuais como:

```text
“ZDR formal”
“Zero Data Retention para dados da empresa”
```

Se a política não garante retenção zero.

Usar:

```js
{
  noTrainingByDefault: true,
  zdr: false,
  retentionPolicy: 'business-policy'
}
```

---

# 16. CHATGPT BUSINESS PRICES

Preservar:

## Standard

```text
$25/user/mês mensal
$20/user/mês equivalente anual
```

## Premium

```text
$125/user/mês mensal
$100/user/mês equivalente anual
```

Mínimo:

```text
2 paid seats
```

Premium:

```text
5× mais uso que Standard
sem limite de uso de 5 horas
```

---

# 17. CLAUDE PRO — FALTA ANUAL

Atualmente o projeto não representa corretamente o anual.

Adicionar:

```text
Claude Pro mensal:
$20

Claude Pro anual:
$200 total

equivalente:
$16,67/mês
```

---

# 18. CLAUDE MAX

```text
Max 5x:
$100/mês

Max 20x:
$200/mês
```

Somente mensal.

---

# 19. CLAUDE TEAM

## Standard

```text
$25/user/mês mensal
$20/user/mês equivalente anual

1,25× mais uso por sessão que Pro
```

## Premium

```text
$125/user/mês mensal
$100/user/mês equivalente anual

6,25× mais uso por sessão que Pro
```

Team:

```text
mínimo 2 membros
máximo 150
```

Os limites são por membro, não um pool único compartilhado pelo time.

---

# 20. CLAUDE FABLE

Preservar:

## Pro / Team Standard

```text
available = true
included = false
billing = usage-credits
```

## Max / Team Premium

```text
included = true

até 50% da quota semanal NORMAL
pode ser usada em Fable
```

Não é quota adicional.

Depois do limite Fable:

```text
usage credits
ou
trocar para outro Claude
```

---

# 21. FABLE HISTORY

Registrar:

```text
promo Fable 5 encerrou:
19/07/2026 23:59:59 PT

Fable 5.1:
NUNCA participou dessa promoção
```

---

# 22. CLAUDE USAGE BUNDLES

Adicionar aos planos:

```text
valor nominal $50
paga $45
desconto 10%

valor nominal $250
paga $200
desconto 20%

valor nominal $1000
paga $700
desconto 30%
```

Disponível:

```text
Pro
Max
Team
```

Limite de bundles com desconto:

```text
Pro/Max individual:
até $2.000 nominais/mês

Team:
até $3.000 nominais/mês
```

---

# 23. CLAUDE AGENT SDK — CRÉDITO SEPARADO

Desde 15/06/2026:

```text
Claude Agent SDK
claude -p
```

não consomem mais o limite interativo normal do plano.

Crédito mensal separado:

| Plano                          | Agent SDK credit |
| ------------------------------ | ---------------: |
| Pro                            |              $20 |
| Max 5x                         |             $100 |
| Max 20x                        |             $200 |
| Team Standard                  |              $20 |
| Team Premium                   |             $100 |
| Enterprise usage-based         |              $20 |
| Enterprise legacy Premium seat |             $200 |

Criar:

```js
agentSdkMonthlyCreditUsd
```

Não chamar isso de crédito geral da Anthropic API.

---

# 24. CLAUDE PRIVACY

Retirar afirmações de:

```text
ZDR
retenção zero
```

quando não houver contrato específico.

Para organizações:

```text
noTrainingByDefault = true
```

é diferente de:

```text
zdr = true
```

---

# 25. GOOGLE — NÃO INVENTAR SKUS

Remover dos planos:

```text
Gemini 3.1 Pro Ultra
Gemini 3.8 Flash Max
Gemini 3.8 Flash Unlimited
```

Não existem como IDs/modelos oficiais.

---

# 26. GOOGLE ULTRA MULTIPLIERS

Não dizer:

```text
“5× capacidade de raciocínio”
```

ou:

```text
“20× capacidade do modelo”
```

O correto é:

```text
Ultra 5x:
5× os limites de uso do Pro

Ultra 20x:
20× os limites de uso do Pro
```

Isso mede acesso/usage limit, não inteligência.

---

# 27. GOOGLE FLOW CREDITS

Adicionar a todos os tiers:

```text
Free:
50 créditos Flow por dia

AI Plus:
200/mês

AI Pro:
1.000/mês

Ultra $100:
10.000/mês

Ultra $200:
25.000/mês
```

Créditos mensais não utilizados:

```text
NÃO fazem rollover para o mês seguinte.
```

---

# 28. GOOGLE AI CREDITS EXTRAS

Regra atual principal:

```text
AI Plus:
não pode comprar AI credits extras

AI Pro:
pode comprar

AI Ultra:
pode comprar
```

Criar:

```js
canPurchaseAiCredits
```

---

# 29. GOOGLE AI PRO STORAGE PRECISA SER LOCALIZÁVEL

Para o plano brasileiro:

```text
R$96,99
5 TB
```

O Google também oferece variantes Pro com diferentes níveis de storage em alguns mercados/checkout.

Portanto não tratar:

```text
Google AI Pro global = sempre 5 TB
```

Criar:

```js
localizedBenefits: {
  BR: {
    storageTb: 5
  }
}
```

---

# 30. GOOGLE CONSUMER PRIVACY

Remover frases como:

```text
“ZDR corporativo”
“garantia comercial de retenção”
```

de:

```text
Google AI Plus
Google AI Pro
Google AI Ultra
```

Eles são produtos consumer.

Privacidade deve referenciar profile consumer Google.

---

# 31. CURSOR — NOMENCLATURA

Planos:

```text
Hobby $0
Pro $20
Pro Plus $60
Ultra $200
```

Preservar:

```text
unlimited tab completions
```

quando aplicável.

NÃO traduzir isso para:

```text
unlimited model usage
```

---

# 32. CURSOR MODELS

Somente:

```text
Grok 4.6
Grok 4.5
Composer 2.5
```

---

# 33. CURSOR OTHER MODELS

Modelos terceiros consomem:

```text
Other Models pool
```

de acordo com:

```text
API/token pricing do modelo
```

Não usar multiplicadores manuais arbitrários como:

```text
Sol = 2.0x
Terra = 1.0x
Opus = 1.5x
```

se não forem derivados de uma fórmula canônica.

---

# 34. CURSOR PRO / PRO+ / ULTRA — REMOVER “ILIMITADO”

Há strings atuais como:

```text
Cursor Models (Uso Ilimitado/Generoso)
```

Trocar por:

```text
Cursor Models — included high-allowance pool
```

ou equivalente.

Não afirmar unlimited model usage.

---

# 35. REMOVER MODELOS INVENTADOS DO CURSOR

Remover:

```text
Grok 4.6 Agent Max
Composer 2.5 Max
Claude Fable 5.1 Max
Grok 4.6 Ultra
GPT-5.6 Sol Max
```

Esses nomes representam no máximo configuração/harness, não modelos canônicos.

---

# 36. CURSOR GROK 4.6

Cursor pricing atual:

## Standard

```text
input $2/M
cache read $0.50/M
output $6/M
```

## Fast

```text
input $4/M
cache read $1/M
output $12/M
```

Context:

```text
256K no Cursor
```

Efforts:

```text
low
medium
high default
xhigh
```

---

# 37. CURSOR GROK 4.5

Cursor pricing:

## Standard

```text
input $2/M
cache read $0.50/M
output $6/M
```

## Fast

```text
input $4/M
cache read $1/M
output $18/M
```

Não misturar isso com a xAI API direta.

---

# 38. XAI API — GROK 4.6

API direta:

context:

```text
500K
```

Short context <200K:

```text
input $2
cached $0.50
output $6
```

Long context >=200K:

```text
input $4
cached $1
output $12
```

---

# 39. XAI API — GROK 4.5

Short context:

```text
input $2
cached $0.30
output $6
```

Long context >=200K:

```text
input $4
cached $0.60
output $12
```

Corrigir qualquer ocorrência de:

```text
Grok 4.5 API = $1/$5
```

---

# 40. REFAZER `PLATFORM_AVAILABILITY_MATRIX`

Hoje ela usa strings como:

```text
'🟢 Sim ($4/$20)'
'🟢 Other Models (2.0x)'
'🟡 OpenRouter'
```

Isso é uma fonte de regressão.

Substituir por dados estruturados.

Exemplo:

```js
{
  modelId: 'grok-4-6',

  platform: 'cursor',

  available: true,

  accessMode: 'cursor-models-pool',

  pricingRef: 'cursor-grok46',

  providerModelId: 'grok-4.6',

  verifiedAt: '2026-09-03'
}
```

A UI constrói a string.

---

# 41. GPT-5.6 SOL PRO NA MATRIZ

Corrigir:

```text
OpenAI API:
NÃO

ChatGPT Pro:
SIM
```

OpenRouter/Cursor:

não afirmar disponibilidade direta do Sol Pro sem prova específica.

Se não confirmado:

```text
unverified
```

---

# 42. Z.AI — IMPLEMENTAÇÃO ATUAL ESTÁ ERRADA

Atualmente aparecem coisas como:

```text
GLM-5.3-Flash (Ilimitado)
GLM-5.3 Max Concurrency
Dedicated Endpoint
ZCode Multi-Agent Studio
sem gargalos
ZDR garantido
general API included
overage = true
```

Remover essas afirmações.

---

# 43. Z.AI INDIVIDUAL PRICING

Preservar preço oficial atual do storefront:

## Lite

```text
$18/mês
$12,60/mês equivalente anual
$151,20 total anual
```

## Pro

```text
$72/mês
$50,40/mês equivalente anual
$604,80 total anual
```

## Max

```text
$160/mês
$112/mês equivalente anual
$1.344 total anual
```

---

# 44. Z.AI CURRENT CREDIT ACCOUNTING

Criar:

## Lite

```text
5h:
2.000 credits

weekly:
10.000 credits
```

## Pro

```text
5h:
12.000

weekly:
60.000
```

## Max

```text
5h:
28.000

weekly:
140.000
```

---

# 45. Z.AI MARKETING MULTIPLIER ≠ CREDIT RATIO

O storefront chama:

```text
Pro:
5× Lite usage

Max:
20× Lite usage
```

Mas as quotas brutas de crédito correspondem a:

```text
Pro:
6× Lite credits

Max:
14× Lite credits
```

NÃO tentar reconciliar os dois como se fossem a mesma métrica.

Guardar:

```js
marketingUsageMultiplierVsLite
```

separado de:

```js
creditQuotaRatioVsLite
```

Mostrar nota:

```text
“Os multiplicadores comerciais e os limites brutos de créditos
não representam exatamente a mesma métrica.”
```

---

# 46. Z.AI CREDIT FORMULA

Usar:

```text
credits =
(
  inputTokens × inputMultiplier
  +
  cachedTokens × cachedMultiplier
  +
  outputTokens × outputMultiplier
)
/ 10.000
```

GLM-5.3:

```text
input 6.9
cached 1.7
output 24
```

GLM-5.3-Flash:

```text
input 2.3
cached 0.56
output 8
```

MCP Search / Reader / ZRead:

```text
1.2 credits/call
```

---

# 47. Z.AI OFF-PEAK

Off-peak:

```text
50% do credit rate padrão
```

Peak:

```text
segunda–sexta
14:00–18:00
Singapore Time UTC+8
```

Fora disso:

```text
off-peak
```

---

# 48. Z.AI MODELOS SERVIDOS

Modelos atuais principais no Coding Plan:

```text
GLM-5.3
GLM-5.3-Flash
```

Aliases antigos devem ser tratados como roteamento/migração, não modelos efetivamente servidos.

Requests para:

```text
GLM-5.2
GLM-5.1
```

podem ser roteados para:

```text
GLM-5.3
```

Requests para geração Flash/aliases anteriores devem refletir a família Flash atual quando documentado.

---

# 49. Z.AI NÃO É GENERAL API CREDIT

Criar:

```js
codingPlanCredentialIncluded: true,
generalApiIncluded: false,
restrictedToSupportedTools: true
```

A chave/endpoint do Coding Plan é separado da General API.

---

# 50. Z.AI QUOTA EXHAUSTED

Quando a quota individual acaba:

```text
aguarda refresh
```

Não debitar automaticamente o saldo normal da API.

Portanto:

```js
overageAllowed: false
```

nos planos individuais.

---

# 51. Z.AI MCP QUOTAS

```text
Lite:
100 calls/mês

Pro:
1.000

Max:
4.000
```

Esse pool cobre:

```text
Web Search
Web Reader
ZRead
```

Vision utiliza recursos ligados ao pool de 5h conforme documentação.

---

# 52. Z.AI TEAM — DADO FALTANTE

Adicionar entidade Team separada dos planos individuais.

## Standard seat

```text
5h:
15.000 credits

weekly:
66.000 credits
```

## Premium seat

```text
5h:
35.000 credits

weekly:
155.000 credits
```

Team:

```text
minimumSeats: 2
```

Preço:

```text
null
```

até existir preço público inequívoco no snapshot.

Não inventar.

Team suporta optional overage com controles administrativos.

---

# 53. KIMI — NÃO REMOVER OS AGENT USES

Os números atuais são válidos como estimativas oficiais.

Usar:

## Andante

```text
¥49/mês

~30 Agent uses
1 parallel task
6 scheduled
20 projects
20 GB
```

## Moderato

```text
¥99
~60 Agent uses
25 Agent Swarm uses
2 parallel agent tasks
2 swarm subtasks
10 scheduled
20 GB
```

## Allegretto

```text
¥199
~150 Agent uses
50 Swarm uses
4 swarm subtasks
2 parallel tasks
15 scheduled
20 GB
Goal Mode
Kimi Claw
```

## Allegro

```text
¥699
~360 Agent uses
120 Swarm uses
8 swarm subtasks
4 parallel tasks
20 scheduled
100 projects
50 GB
K3 million-token conversations
```

Importante:

```text
esses Agent uses são ESTIMATIVAS baseadas em consumo típico,
não hard caps fixos.
```

---

# 54. KIMI ANUAL

Adicionar:

| Plano      | mensal equivalente anual |
| ---------- | -----------------------: |
| Andante    |                      ¥39 |
| Moderato   |                      ¥79 |
| Allegretto |                     ¥159 |
| Allegro    |                     ¥559 |

Totais anuais:

```text
Andante:
¥468

Moderato:
¥948

Allegretto:
¥1.908

Allegro:
¥6.708
```

---

# 55. KIMI CODE — ACESSO POR PLANO

## Andante

```text
kimi-for-coding
context 256K
```

## Moderato

```text
k3
k3-256k
kimi-for-coding

context:
256K
```

## Allegretto e Allegro

```text
k3
k3-256k
kimi-for-coding
kimi-for-coding-highspeed
```

Context:

```text
k3:
até 1.048.576

k3-256k:
256K

K2.7 Code:
256K

HighSpeed:
256K
```

---

# 56. K3 1M QUOTA

Dentro de 256K:

```text
k3-256k
```

oferece a mesma qualidade declarada pela Kimi.

O:

```text
k3 1M
```

consome aproximadamente:

```text
2× a quota
```

comparado ao `k3-256k`.

Mostrar isso.

---

# 57. KIMI PRIVACY

Remover frases inventadas:

```text
ZDR corporativo
dedicated cluster
retenção zero
```

dos planos Membership, salvo prova separada.

---

# 58. XAI / SPACEXAI — PLANOS FALTANTES

O projeto atual contém principalmente:

```text
Free
SuperGrok
SuperGrok Plus
```

A família atual também contempla:

```text
SuperGrok Lite
SuperGrok Heavy
Business
Enterprise
```

Quando preço individual não estiver confirmado publicamente no snapshot:

```text
monthlyPriceUsd: null
pricingVisibility: 'checkout-only'
```

NÃO inventar.

---

# 59. GROK BUSINESS

Adicionar:

```text
$30/user/mês
```

Benefícios organizacionais:

```text
no training
SOC 2 Type I & II
RBAC
team/seat management
consolidated billing
domain verification
analytics
connectors
Grok Build
```

Enterprise:

```text
contact sales
```

com recursos adicionais como:

```text
SSO
SCIM
custom RBAC
dedicated onboarding
CMEK
dedicated data plane
```

---

# 60. SUPERGROK PRIVACY

Os planos consumer não devem dizer:

```text
“commercial no-training”
```

Conteúdo consumer pode participar do treinamento conforme controles/política do produto.

Diferenciar de:

```text
Grok Business
```

que explicitamente possui no-training.

---

# 61. GROK BOT

Adicionar recurso/plataforma.

Anúncio de 26/08/2026 informa inclusão em:

```text
SuperGrok
SuperGrok Plus
SuperGrok Heavy

Cursor Pro
Cursor Pro+
Cursor Ultra

Cursor Teams Standard
Cursor Teams Premium
```

Grok Bot:

```text
possui sua própria quota
separada do uso normal Grok/Cursor
```

Isso é importante.

---

# 62. GROK BOT — DIVERGÊNCIA DE DOCUMENTAÇÃO

Algumas páginas de setup ainda mostram elegibilidade mais restrita.

Portanto guardar:

```js
{
  sourceConflict: true,
  preferredSource: 'latest-plan-expansion-announcement',
  rolloutDependent: true
}
```

Não tratar uma documentação antiga de setup como regra mais nova.

---

# 63. CAMELAI — ESTÁ BEM IMPLEMENTADO, MAS CORRIGIR SOURCES

Corrigir source registry.

## Model Providers

Canonical:

```text
domain: camelai.com
path: /docs/plans/model-providers
```

Não:

```text
/docs/models
```

---

# 64. CAMELSTREAM FLEET SOURCE

Canonical:

```text
domain: camelai.com
path: /docs/stream/fleet
```

Não usar como fonte canônica:

```text
stream.camelai.com/fleet
```

---

# 65. CAMEL SELF-HOST SOURCE

Fonte primária:

```text
domain: camelai.com
path: /docs/self-hosting/overview
```

GitHub pode ser source secundário.

---

# 66. CAMEL CONNECTIONS SOURCE

Canonical:

```text
domain: camelai.com
path: /docs/getting-started/connections
```

---

# 67. CAMEL AUTOMATION LIMIT CONFLICT

Hoje o projeto guarda isso apenas em texto.

Transformar em estrutura:

```js
automationLimits: {
  canonicalDocs: {
    free: {
      count: 1,
      interval: 'daily'
    },

    starter: {
      count: 1,
      interval: 'hourly'
    },

    pro: {
      count: 50,
      intervalMinutes: 5
    },

    team: {
      countPerMember: 50,
      intervalMinutes: 5
    }
  },

  marketingPage: {
    free: {
      count: 2,
      interval: 'daily'
    },

    starter: {
      count: 10,
      interval: 'hourly'
    },

    pro: {
      count: 50
    }
  },

  sourceConflict: true,

  preferredSource: 'detailed-plan-documentation'
}
```

Mostrar warning discreto na UI.

---

# 68. CAMELSTREAM

Preservar:

```text
$5 / stream / mês
unlimited tokens
1 guaranteed concurrent generation per stream
1–50 self-service streams
model ID = auto
260K minimum context
vision
queue requests beyond concurrency
```

---

# 69. CAMELSTREAM PRIVACY

Preservar warning forte:

```text
standard subscription:
prompts/outputs podem ser retidos e usados para training
```

Sem:

```text
opt-out
```

no standard.

Custom no-training/ZDR:

```text
a partir de ~1.000 streams
via contrato custom
```

---

# 70. CAMELSTREAM FLEET

Snapshot 30/08/2026:

```text
DeepSeek V4 Flash — 0731
Gemini Flash — 3.7
GLM 5.3 Flash
GPT Luna — 5.6
Muse Spark — 1.2
```

Não mudar Gemini para 3.8 automaticamente.

A própria fleet page ainda lista 3.7.

---

# 71. GEMINI 3.1 PRO — STATUS ERRADO SE ESTIVER STABLE

O endpoint atual é:

```text
gemini-3.1-pro-preview
```

Status técnico na Gemini Developer API:

```text
preview
```

Não existe shutdown date anunciado atualmente.

Portanto:

```js
status: 'preview'
```

para API.

Se alguma plataforma consumer o tratar de forma diferente, usar:

```text
platformStatusOverrides
```

---

# 72. GEMINI 3.7 FLASH NÃO É LEGACY

Gemini 3.7 Flash:

```text
stable
active
```

Não existe shutdown date anunciado.

Não marcar como:

```text
legacy
retired
superseded
```

apenas porque 3.8 foi lançado.

Pode registrar:

```text
generationPredecessorOf: gemini-3-8-flash
```

sem mudar seu status operacional.

---

# 73. GROK 4.6 — PROVENANCE DE BENCHMARK ESTÁ ERRADA

O `DATA_SOURCES` atual diz aproximadamente:

```text
official xAI:
CursorBench XHigh 70.8
Terminal-Bench 2.1 88.4
```

Isso mistura fontes.

Corrigir.

---

# 74. GROK 4.6 — BENCHMARKS DO ANÚNCIO OFICIAL

Para `Grok 4.6 High`, anúncio SpaceXAI:

```text
AA Intelligence Index:
61

GDPVal-AA v2:
1753

CursorBench 3.2:
69.9%

DeepSWE 1.1:
65.9%

FrontierCode 1.1 Extended:
61.3%

APEX-Agents:
57.5%

Terminal-Bench 3.0:
26.0%

APEX-SWE:
56.4%

AA-Briefcase:
1577

Harvey LAB:
15.8%
```

---

# 75. TERMINAL-BENCH 2.1 88.4 DO GROK

Pode continuar no projeto SOMENTE como:

```text
sourceType:
independent

publisher:
Artificial Analysis

benchmark:
Terminal-Bench 2.1

score:
88.4
```

NÃO:

```text
official xAI
```

---

# 76. CURSORBENCH 70.8 DO GROK

Se mantiver:

```text
70.8
```

identificar como:

```text
CursorBench live
XHigh
independent
```

O anúncio xAI High publica:

```text
69.9
```

Não misturar os dois.

---

# 77. CORRIGIR XAI SOURCE METADATA

Atual anúncio:

```text
publishedAt:
2026-08-12
```

não:

```text
2026-08-18
```

E o source title deve ser:

```text
Introducing Grok 4.6
```

no site atual SpaceXAI.

---

# 78. GPT-5.6 SOL PRO — BENCHMARKS INVENTADOS

O ledger atual possui:

```text
Terminal-Bench 2.1:
88.0

DeepSWE:
71.0

GPQA:
93.8

AA Index:
60
```

Não existe benchmark row oficial/publicamente comparável para Sol Pro que justifique tratar isso como medição.

REMOVER esses números do ledger factual.

Usar:

```text
null
```

---

# 79. SOL PRO PODE CONTINUAR NO RADAR

O radar é calibrado/estimado.

Portanto Sol Pro pode possuir scores no:

```text
CAPABILITY_RADAR_10D
ENGINEERING_BEHAVIOR_DATA
USE_CASE_COMPARISON_DATA
```

desde que apareça:

```text
E — calibrated estimate
```

Nunca transportar essas estimativas para benchmark ledger.

---

# 80. REGRA NOVA DO LEDGER

Todo benchmark não-null deve possuir evidência.

Criar:

```js
benchmarkEvidence: {
  terminalBench21: {
    sourceId: '...',
    sourceType: 'official|independent',
    benchmarkVersion: '2.1',
    effort: '...',
    harness: '...',
    snapshotDate: '...'
  }
}
```

---

# 81. TESTE AUTOMÁTICO DE BENCHMARK

Para cada:

```text
benchmarkValue !== null
```

exigir:

```text
benchmarkEvidence correspondente
```

Caso contrário:

```text
AUDIT ERROR
```

Não apenas warning.

---

# 82. DEEPSEEK V4 FLASH VISION EXP

Tratar com cuidado.

No OpenCode Go existe um SKU real:

```text
deepseek-v4-flash-vision-exp
```

Isso comprova disponibilidade na plataforma OpenCode.

Mas não transforma automaticamente esse SKU em:

```text
release oficial upstream DeepSeek
```

Se o projeto mantiver um modelo canônico:

```js
sourceConfidence: 'platform-sku/unverified-upstream'
```

Não chamar model card oficial DeepSeek se não houver.

---

# 83. SOURCE REGISTRY — OPENAI GPT-5.6

O registro atual usa uma página denominada:

```text
GPT-5.6 System Card & Official Pricing
```

com source path pouco confiável.

Separar:

```text
openai-gpt56-launch
```

publisher:

```text
OpenAI
```

page:

```text
GPT-5.6
```

domain:

```text
openai.com
```

path:

```text
/index/gpt-5-6/
```

E:

```text
openai-gpt56-safety
```

source:

```text
OpenAI Deployment Safety Hub
```

Não misturar launch, pricing e safety em um único source ID.

---

# 84. SOURCE REGISTRY — SPACEXAI

Usar:

```text
domain:
x.ai

path:
/news/grok-4-6
```

Não:

```text
/blog/grok-4-6
```

---

# 85. SOURCE REGISTRY — CAMELAI

Corrigir os paths conforme seções anteriores.

Cada source deve representar uma página concreta:

```text
plans
model providers
stream overview
stream fleet
stream data usage
stream privacy
self-hosting
connections
```

---

# 86. SOURCE TYPES MAIS RIGOROSOS

Usar:

```text
official-model
official-plan
official-pricing
official-policy
official-platform
independent-benchmark
community
estimated
```

Isso evita classificar:

```text
CursorBench
```

como official manufacturer benchmark apenas porque Cursor é fornecedor de um modelo.

---

# 87. PRIVACY SCHEMA

Parar de usar frases soltas como única fonte.

Criar:

```js
{
  training: {
    defaultUse: 'yes|no|opt-out|unknown',
    optOutAvailable: true
  },

  retention: {
    days: null,
    type: 'policy-dependent'
  },

  zdr: {
    contractual: false,
    verified: false
  },

  dataResidency: {},

  notes: []
}
```

---

# 88. NÃO USAR ZDR COMO SINÔNIMO DE “SEM TREINO”

Criar teste que proíba lógica do tipo:

```text
noTraining === true
→ zdr === true
```

São conceitos diferentes.

---

# 89. REMOVE FAKE MODEL SUFFIXES AUTOMATICAMENTE

Criar lista de padrões suspeitos:

```text
" Max"
" Ultra"
" Unlimited"
" Dedicated"
" High Capacity"
```

Quando anexados a um model name sem canonical model ID.

O auditor deve avisar:

```text
possible invented model SKU
```

Exceção:

quando o próprio modelo oficial realmente possui aquele nome.

---

# 90. FEATURES NÃO PODEM APARECER EM `modelAccess`

Detectar strings como:

```text
Canvas
Deep Research
Admin Console
Workspaces
5 TB Cloud
SSO
Audit Logs
```

dentro de model arrays.

Mover para:

```text
features
storage
governance
```

---

# 91. README ESTÁ DESATUALIZADO

O README ainda documenta principalmente:

```text
data.js
app.js
index.html
audit-data.js
```

Mas o projeto agora possui módulos importantes em:

```text
data/
  plans.js
  platforms.js
  fx.js
  history.js
  community.js
  behavior.js
  use-cases.js
  pricing-history.js
```

Atualizar README.

---

# 92. README — EXPLICAR AS 4 CAMADAS DE EVIDÊNCIA

Adicionar:

```text
O — Official
T — Third-party
C — Community
E — Estimated / calibrated
```

---

# 93. README — DOCUMENTAR NOVAS FEATURES

Adicionar:

```text
Planos e assinaturas
USD/BRL
OpenCode Go quota burn
CamelAI
histórico e linhagens
community reports
engineering behavior
casos de uso
availability por plataforma
pricing history
```

---

# 94. AUDITOR NÃO DEVE CONGELAR DADOS VOLÁTEIS

Separar conceitualmente:

## Integridade

```text
IDs
schema
referential integrity
ranges
duplicate keys
sources
semantic validity
```

## Snapshot

```text
preços atuais
FX
leaderboards
model counts
plan counts
```

---

# 95. EVITAR ASSERTS COMO VERDADE ETERNA

Não usar como integridade:

```text
FX == 5.108
planCount == X
Fable sempre #1
44 para sempre
```

Esses são snapshots.

Podem existir em:

```text
snapshot-tests.js
```

mas não no teste estrutural principal.

---

# 96. REMOVER IMPORT LEGACY

Se `audit-data.js` ainda importa:

```text
OPENCODE_GO_CATALOG
```

remover.

A fonte atual é:

```text
OPENCODE_GO_DATA
```

---

# 97. NOVOS TESTES CRÍTICOS

Adicionar:

```text
GPT-5.6 Sol Pro:
directApi === false
```

```text
Gemini 3.1 Pro:
apiStatus === preview
```

```text
Gemini 3.7 Flash:
status !== legacy
```

```text
Google Pro BR:
storageTb === 5
```

```text
Google Plus:
flowCredits === 200
```

```text
Google Pro:
flowCredits === 1000
```

```text
Ultra5:
10000

Ultra20:
25000
```

---

# 98. TESTES CLAUDE

```text
Claude Pro annual total = 200
```

```text
Fable Pro:
included == false
```

```text
Fable Max:
weeklyShareCapPct == 50
```

```text
Team Standard:
1.25x session capacity vs Pro
```

```text
Team Premium:
6.25x
```

---

# 99. TESTES CURSOR

Cursor Models deve ser EXATAMENTE:

```text
composer-2-5
grok-4-5
grok-4-6
```

Nenhum Gemini.

---

# 100. TESTES Z.AI

```text
Lite credits:
2000 / 10000

Pro:
12000 / 60000

Max:
28000 / 140000
```

```text
individual generalApiIncluded === false
```

```text
individual overageAllowed === false
```

---

# 101. TESTES KIMI

```text
Andante:
kimi-for-coding only for Kimi Code

Moderato:
K3 max 256K

Allegretto+:
K3 max 1M
```

---

# 102. TESTES BENCHMARK

```text
GPT-5.6 Sol Pro
must NOT have factual TB/DeepSWE/GPQA values
without specific benchmark evidence.
```

```text
Grok 4.6:
TB3 official = 26.0
```

```text
Grok TB2.1 88.4:
sourceType = independent
```

---

# 103. BUDGET STACK RECOMMENDER

Recalcular após novo schema.

Nunca recomendar um modelo como “incluído” só porque:

```text
available === true
```

Exemplo:

```text
Claude Pro + Fable 5.1
```

deve mostrar:

```text
fixed:
$20 subscription

variable:
Fable usage credits
```

---

# 104. STACK COST SCHEMA

Usar:

```js
{
  fixedMonthlyCost: 20,

  variableBilling: [
    {
      modelId: 'claude-fable-5-1',
      mode: 'usage-credits'
    }
  ]
}
```

---

# 105. DISPONIBILIDADE NÃO É ENTITLEMENT

Para qualquer modelo, responder separadamente:

```text
Existe na plataforma?
```

```text
Meu plano permite selecionar?
```

```text
Está incluído na franquia?
```

```text
É pago por créditos?
```

```text
Consome qual pool?
```

```text
Existe naquela surface?
```

```text
Qual context window naquela surface?
```

---

# 106. EXEMPLO FINAL — FABLE

UI:

```text
Claude Pro

Fable 5.1:
Disponível ✅
Incluído ❌
Billing: usage credits
Custo variável: sim
```

---

# 107. EXEMPLO FINAL — GPT-5.6 TERRA

```text
ChatGPT Plus standard chat:
não selecionável

ChatGPT Work:
disponível

Codex:
disponível

OpenAI API:
disponível
```

---

# 108. EXEMPLO FINAL — SOL PRO

```text
ChatGPT Pro:
disponível

OpenAI API:
não disponível

Benchmark factual próprio:
N/D
```

---

# 109. EXEMPLO FINAL — GOOGLE AI PRO BRASIL

```text
R$96,99/mês

5 TB

4× Free

Flow:
1.000 credits

AI credits extras:
pode comprar

family:
até 5
```

---

# 110. EXEMPLO FINAL — Z.AI PRO

```text
US$72/mês

12.000 credits / 5h
60.000 / semana

Marketing:
5× Lite usage

Raw-credit ratio:
6× Lite

Models:
GLM-5.3
GLM-5.3-Flash

General API:
não incluída

Automatic balance overage:
não
```

---

# 111. EXEMPLO FINAL — KIMI MODERATO

```text
¥99/mês

~60 Agent uses
2 parallel tasks

Kimi Code:
K3 256K
K3-256K
K2.7 Code 256K

K3 1M:
não incluído neste tier
```

---

# 112. EXEMPLO FINAL — GROK 4.6

Distinguir:

```text
SpaceXAI API:
500K
$2 / $0.50 / $6
long context $4 / $1 / $12
```

de:

```text
Cursor:
256K
Cursor Models pool
Standard $2 / $0.50 / $6
Fast $4 / $1 / $12
```

---

# 113. VERIFICAÇÃO FINAL

Executar:

```bash
node --check data.js
node --check app.js
node --check server.js
node --check data/plans.js
node --check data/platforms.js
node --check data/fx.js
node scripts/audit-data.js
```

---

# 114. BUSCA POR REGRESSÕES

Pesquisar o repositório inteiro por:

```text
Gemini 3.1 Pro Ultra
Gemini 3.8 Flash Max
Fable 5.1 Max
Grok 4.6 Ultra
GPT-5.6 Sol Max
GLM-5.3 Max Concurrency
Dedicated Endpoint
Ilimitado
ZDR formal
ZDR corporativo
500 Fast Requests
1500 Fast
10000 Fast
$15/$60
xai/blog/grok-4-6
OPENCODE_GO_CATALOG
```

Revisar cada ocorrência.

---

# 115. RELATÓRIO FINAL

Ao concluir, informe:

```text
arquivos alterados
erros semânticos corrigidos
fake SKUs removidos
model access convertido para surface-aware
privacy claims corrigidas
benchmarks reclassificados
Z.ai atualizado
Kimi Code atualizado
xAI atualizado
CamelAI sources corrigidas
tests adicionados
```

Também mostrar:

```text
quantidade de assertions removidas por serem snapshots
quantidade de benchmark cells agora com provenance
quantidade de plans com modelAccess estruturado
```

---

# REGRA MAIS IMPORTANTE

O portal não deve concluir que:

```text
“modelo aparece na plataforma”
```

significa:

```text
“modelo está incluído no plano”
```

E também não deve concluir que:

```text
“sem treinamento”
```

significa:

```text
“Zero Data Retention”
```

Nem que:

```text
“effort Max/Ultra”
```

significa:

```text
“existe um modelo chamado Model Max/Ultra”
```

A arquitetura final precisa manter separadas estas entidades:

**modelo**
→ identidade técnica

**effort**
→ configuração de raciocínio

**surface**
→ produto onde é usado

**platform**
→ fornecedor/harness

**plan**
→ assinatura

**entitlement**
→ direito de uso

**quota**
→ limite

**pricing**
→ cobrança

**privacy**
→ política de dados

**benchmark**
→ medição

**source**
→ evidência
