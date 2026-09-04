# AUDITORIA FINAL DE CONSISTÊNCIA + INCLUSÃO COMPLETA DO CAMELAI

## Snapshot verificado: 03/09/2026

O projeto ainda NÃO está completamente corrigido.

Esta tarefa deve:

1. corrigir as inconsistências restantes;
2. preservar a implementação nova e correta do OpenCode Go;
3. adicionar camelAI/camelCode/camelStream;
4. melhorar os testes para impedir regressões semelhantes.

Não aumente a contagem de modelos de 44 por causa do camelAI.

camelAI é uma **plataforma/produto**, não um novo modelo canônico comparável a GPT, Claude ou Gemini.

---

# 1. PRESERVAR O OPENCODE GO NOVO

A implementação atual de `OPENCODE_GO_DATA` está, em linhas gerais, correta.

Preservar:

```text
26 modelos oficiais
US$10/mês
US$12 / 5h
US$30 / semana
US$60 / mês nominal
```

Classes:

```text
US$60 → 1× burn → 100% → valor 6×
US$30 → 2× burn → 50% → valor 3×
US$15 → 4× burn → 25% → valor 1,5×
```

Preservar:

* simulador;
* request estimates;
* pricing por canal Go;
* token profiles;
* endpoints;
* privacy específica;
* Muse Contributor warning;
* DeepSeek ZDR `needs-revalidation`;
* Zen balance fallback;
* IDs `opencode-go/...`.

Não reverter essa implementação.

---

# 2. `data/plans.js` AINDA ESTÁ DESATUALIZADO

Corrigir completamente.

O arquivo atual ainda contém dados antigos como:

```text
Claude Pro:
Fable 5.1 (Cota Compartilhada)
```

ERRADO.

Ainda contém:

```text
Claude Team:
US$30
min 5 seats
```

ERRADO.

Ainda contém:

```text
Google AI Pro:
2 TB
```

ERRADO.

Ainda contém:

```text
Cursor Pro:
500 Fast Requests

Pro+:
1.500

Ultra:
10.000
```

ERRADO no pricing usage-based atual.

Também não possui adequadamente:

```text
Google AI Plus
ChatGPT Pro 5x
ChatGPT Pro 20x
```

Corrigir esses dados antes de adicionar camelAI.

---

# 3. CLAUDE FABLE 5.1 NO PRO

Regra canônica:

```js
{
  planId: 'anthropic-claude-pro',
  modelId: 'claude-fable-5-1',

  available: true,
  visibleInPicker: true,

  includedInBaseQuota: false,

  billingMode: 'usage-credits',
  requiresUsageCredits: true
}
```

Não dizer:

```text
Fable 5.1 incluído no Pro
```

Fable 5.1 pode ser usado no Pro, mas consome créditos pagos desde a primeira chamada.

---

# 4. FABLE NOS OUTROS PLANOS

## Max 5x

```text
US$100/mês
Fable disponível
Fable incluído
até 50% da quota semanal total pode ser Fable
```

## Max 20x

```text
US$200/mês
Fable disponível
Fable incluído
até 50% da quota semanal total pode ser Fable
```

Esse 50% NÃO é uma quota extra.

## Team Standard

```text
Fable disponível
não incluído
usage credits
```

## Team Premium

```text
Fable disponível
incluído
até 50% do weekly limit total
```

---

# 5. CLAUDE TEAM

Substituir o objeto antigo único por:

## Standard

```text
US$25/user/mês mensal
US$20/user/mês equivalente anual
```

## Premium

```text
US$125/user/mês mensal
US$100/user/mês equivalente anual
```

Team atual:

```text
mínimo: 2 usuários
máximo self-service: conforme documentação atual
```

Não manter:

```text
min 5 seats
```

---

# 6. GOOGLE AI PLUS

Adicionar:

```text
Google AI Plus

Brasil:
R$24,99/mês

armazenamento:
400 GB

Gemini usage:
2× Free
```

Outros benefícios:

```text
mais acesso ao Gemini 3.1 Pro
mais Deep Research
Gemini Notebook ampliado
Gemini nos apps Google
Google Flow ampliado
compartilhamento familiar até 5 pessoas
```

---

# 7. GOOGLE AI PRO

Corrigir para:

```text
Brasil:
R$96,99/mês

EUA:
US$19,99/mês

storage:
5 TB

Gemini usage:
4× Free
```

NUNCA mostrar 2 TB.

Registrar também:

```text
Google Flow:
1.000 credits quando aplicável ao benefício atual

Gemini:
acesso expandido

Deep Research:
expandido

Google Antigravity:
limites iniciais/entry do tier Pro

AI Studio:
limites maiores

Jules:
limites maiores

Gemini Notebook:
limites maiores

Gemini nos apps Google:
sim

family sharing:
até 5 pessoas
```

Não confundir Google Cloud credits com Gemini API credits.

---

# 8. GOOGLE ULTRA

## Ultra 5x

```text
Brasil:
R$779,90

EUA:
US$99,99

storage:
20 TB

uso:
5× Google AI Pro
```

## Ultra 20x

```text
Brasil:
R$999,90

EUA:
US$199,99

storage:
30 TB

uso:
20× Google AI Pro
```

---

# 9. CHATGPT PRO

O projeto deve ter dois tiers:

## Pro 5x

```text
US$100/mês
5× mais uso que Plus
```

## Pro 20x

```text
US$200/mês
20× mais uso que Plus
```

Os dois oferecem as funcionalidades Pro principais.

Não existe billing anual para:

```text
Go
Plus
Pro
```

---

# 10. CURSOR — CORRIGIR MODELO DE USO

Planos:

```text
Hobby    $0
Pro      $20
Pro+     $60
Ultra    $200
```

Pools:

```text
Cursor Models
Other Models
```

Cursor Models contém SOMENTE:

```text
Cursor Grok 4.6
Grok 4.5
Composer 2.5
```

Remover Gemini 3.8 desse pool.

---

# 11. GEMINI 3.8 NO CURSOR

Deve ser:

```text
pool:
Other Models

input:
$0.75/M

cache read:
$0.075/M

output:
$3.50/M

default context:
200K

max:
1M
```

Não classificar Gemini 3.8 como Cursor Model.

---

# 12. REMOVER FAST REQUESTS LEGACY

Não usar atualmente:

```text
500 Fast
1.500 Fast
10.000 Fast
```

Como modelo principal de Pro/Pro+/Ultra.

Usar:

```text
Pro:
base Agent limits

Pro+:
~3× Agent limits do Pro

Ultra:
~20× Agent limits do Pro
```

E:

```text
Other Models:
usage consumido de acordo com API price
```

Quando a franquia acaba:

```text
on-demand usage disponível
```

---

# 13. CURSOR GROK PRICING

Atual:

## Grok 4.6 standard

```text
input:
$2/M

cache:
$0.50/M

output:
$6/M
```

## Fast

```text
input:
$4/M

cache:
$1/M

output:
$12/M
```

Corrigir qualquer ocorrência de:

```text
$2/$10
```

para Grok 4.6 Cursor.

---

# 14. ANTIGRAVITY — POOLS

Atualizar.

## Gemini Models

```text
Gemini 3.8 Flash
Gemini 3.7 Flash
Gemini 3.6 Flash
Gemini 3.1 Pro
```

## Claude and GPT models

```text
Claude Sonnet 4.6 Thinking
Claude Opus 4.6 Thinking
GPT-OSS-120B Medium
```

Remover Gemini 3.1 Pro do pool Claude/GPT.

Adicionar GPT-OSS-120B.

---

# 15. ANTIGRAVITY — PLAN AVAILABILITY

No snapshot atual:

```text
Free & Google AI Plus
Google AI Pro
Google AI Ultra
```

oferecem os reasoning models acima.

Enterprise atualmente lista Gemini, mas não Claude/GPT nessa tabela.

Não inferir quota numérica de prompts.

A quota é work-based.

---

# 16. CORRIGIR `data/fx.js`

O arquivo ainda afirma:

```text
USD_BRL = 5.1556
source = Banco Central / PTAX
date = 03/09/2026
```

Essa provenance não está correta.

Substituir por um snapshot explicitamente de mercado.

Usar como snapshot desta atualização:

```js
USD_BRL: {
  rate: 5.108,
  verifiedAt: '2026-09-03',
  type: 'mid-market-snapshot',
  officialPtax: false
}
```

CNY:

```js
CNY_BRL: {
  rate: 0.7599,
  verifiedAt: '2026-09-03',
  type: 'mid-market-snapshot',
  officialPtax: false
}
```

Não chamar de PTAX.

Preço oficial localizado sempre ganha da conversão.

---

# 17. CORRIGIR ROI

O HTML possui:

```text
Cotação USD/BRL default = 5.80
```

Remover.

Inicializar dinamicamente com:

```js
FX_RATES_DATA.USD_BRL.rate
```

Não hardcode nenhuma cotação na interface.

---

# 18. CORRIGIR AUDITOR

O audit script ainda força:

```text
USD_BRL === 5.1556
CNY_BRL === 0.7595

SUBSCRIPTION_PLANS_DATA.length === 32

ChatGPT Pro único == $200
```

Remover esses asserts rígidos.

A inclusão do camelAI por si só tornará `32` inválido.

Validar entidades e schema, não número fixo de planos.

---

# 19. NOVO PROVIDER / PLATFORM: CAMELAI

Adicionar empresa/plataforma:

```js
{
  id: 'camelai',
  name: 'camelAI',
  company: 'CamelQA, Inc.',
  website: 'https://camelai.com',
  country: 'EUA',
  type: [
    'coding-agent-platform',
    'app-builder',
    'inference-router'
  ]
}
```

Não aumentar:

```text
44 modelos catalogados
```

camelAI NÃO é modelo canônico.

---

# 20. CAMELAI POSSUI DOIS PRODUTOS ATUAIS DISTINTOS

Criar:

```text
camelCode
camelStream
```

Também existe:

```text
camelCode self-hosted
```

como deployment mode.

Não misturar com:

```text
camelAI Legacy
```

---

# 21. NÃO CADASTRAR O ANTIGO $200 PROFESSIONAL COMO PLANO ATUAL

Documentação antiga ainda existe para:

```text
camelAI Embedded Analytics / Legacy
Professional $200 + usage
```

Esse produto está marcado:

```text
LEGACY
no longer actively developed
```

Se desejar histórico:

```js
{
  id: 'camelai-legacy-professional',
  current: false,
  status: 'legacy',
  monthlyPriceUsd: 200
}
```

Mas NÃO mostrar na lista de planos atuais.

---

# 22. CAMELCODE — FREE

Adicionar:

```js
{
  id: 'camelai-code-free',

  provider: 'camelai',
  product: 'camelCode',
  planName: 'Free',

  monthlyPriceUsd: 0,

  seats: 1,
  workspaces: 1,

  storageGbPerWorkspace: 5,

  deployedApps: 3,

  customDomains: 0,

  emailInbox: false,
  rbac: false,

  premiumModelCreditsUsd: 0,

  camelFree: {
    included: true,
    priority: false,
    capacity: 'shared'
  }
}
```

Free:

```text
sem cartão
Camel Free incluído
BYOK permitido
premium models podem ser liberados por top-up/BYOK/OpenAI login
```

---

# 23. CAMELCODE STARTER

```text
US$10/mês
≈ R$51,08 usando snapshot atual
```

Dados:

```js
{
  seats: 1,
  workspaces: 1,
  storageGbPerWorkspace: 50,
  deployedApps: 30,
  customDomains: 10,

  premiumModelCreditsUsd: 10,

  emailInbox: true,
  rbac: false,

  camelFreePriority: true
}
```

---

# 24. CAMELCODE PRO

```text
US$40/mês
≈ R$204,32
```

Dados:

```js
{
  seats: 1,
  workspaces: 1,

  storageGbPerWorkspace: 100,

  deployedApps: 'unlimited',
  customDomains: 'unlimited',

  premiumModelCreditsUsd: 40,

  automations: 50,
  automationMinimumIntervalMinutes: 5,

  emailInbox: true,
  rbac: false,

  camelFreePriority: true
}
```

---

# 25. CAMELCODE TEAM

```text
US$50 / seat / mês
≈ R$255,40 / seat
```

Mínimo:

```text
3 seats
```

Custo mínimo:

```text
US$150/mês
≈ R$766,20/mês
```

Dados:

```js
{
  minimumSeats: 3,

  workspaces: 2,

  storageGbPerWorkspace: 100,

  deployedApps: 'unlimited',
  customDomains: 'unlimited',

  premiumModelCreditsUsdPerSeat: 50,

  automationsPerMember: 50,
  automationMinimumIntervalMinutes: 5,

  emailInbox: true,
  rbac: true,

  camelFreePriority: true
}
```

---

# 26. CAMELCODE ENTERPRISE

Preço:

```text
Custom / contact sales
```

Adicionar:

```text
SSO / SAML
BYOC / Bring Your Own Cloud
HIPAA / SOC 2
dedicated support
unlimited workspaces
custom limits
```

BYOC:

```text
deploy apps inside customer's Cloudflare account
```

Não inventar preço.

---

# 27. DIVERGÊNCIA OFICIAL NAS AUTOMAÇÕES

Há neste momento conflito entre duas páginas oficiais camelAI.

Documentação detalhada de planos informa:

```text
Free:
1 automation · daily

Starter:
1 automation · hourly

Pro:
50 · every 5 min

Team:
50/member · every 5 min
```

A página comercial de pricing publicou:

```text
Free:
2 cron jobs daily

Starter:
10 cron jobs hourly

Pro:
50

Team:
herda Pro / Team rules
```

Não esconder o conflito.

Guardar:

```js
automationLimits: {
  canonicalDocs: {
    free: 1,
    starter: 1
  },

  marketingPage: {
    free: 2,
    starter: 10
  },

  sourceConflict: true,
  preferredSource: 'detailed-plan-docs',
  needsRevalidation: true
}
```

Para interface principal, prefira a documentação detalhada:

```text
Free: 1 daily
Starter: 1 hourly
```

mas mostrar:

```text
⚠ Existe divergência entre docs e pricing page.
```

---

# 28. PREMIUM MODEL CREDITS CAMELCODE

Créditos incluídos:

```text
Free: $0
Starter: $10/mês
Pro: $40/mês
Team: $50/mês por seat
```

camelAI cobra os modelos premium:

```text
provider rate
sem markup camelAI
```

Ou seja:

```text
$10 de crédito
≈ $10 de consumo do modelo à taxa do provider
```

---

# 29. QUANDO O CRÉDITO ACABA

O serviço NÃO para.

Fluxo:

```text
premium credits esgotados
        ↓
Camel Free continua funcionando
```

Apps:

```text
continuam funcionando
```

Workspace:

```text
preservado
```

Automations:

```text
preservadas
```

Para voltar a premium:

```text
top-up
upgrade
BYOK
Sign in with OpenAI
```

---

# 30. TOP-UP CREDITS

Disponível inclusive em:

```text
Free
```

Créditos:

```text
prepaid
via Stripe
```

Plan credits + top-up:

```text
mesmo saldo
```

Não inventar tamanhos dos packs.

A interface informa os packs disponíveis no momento da compra.

Não afirmar rollover porque a política de rollover não foi confirmada na documentação recuperada.

Usar:

```text
rolloverPolicy = unknown/not-confirmed
```

---

# 31. CAMEL FREE

Todos os planos possuem:

```text
Camel Free
```

Mas NÃO adicionar `Camel Free` aos 44 modelos canônicos.

Tratar como:

```js
{
  platformSku: true,
  opaqueHostedModel: true,
  canonicalModelId: null
}
```

Free:

```text
shared capacity
pode ficar mais lento em horários de pico
```

Pagantes:

```text
priority over free traffic
```

---

# 32. FAMÍLIAS PREMIUM SUPORTADAS

A documentação atual cita famílias:

```text
GPT
Gemini
Grok
Kimi
DeepSeek
Claude
```

Não inventar lista exata de SKUs/latest versions.

O model picker depende do provider/configuração atual.

---

# 33. 4 FORMAS DE USAR PREMIUM MODELS NO CAMELCODE

Todas funcionam até no Free.

## 1. Plan credits

```text
Starter / Pro / Team
```

## 2. Top-up credits

```text
prepaid
```

## 3. BYOK

```text
Anthropic
OpenAI
OpenRouter
AWS Bedrock
```

## 4. Sign in with OpenAI

Usa a assinatura ChatGPT do usuário.

---

# 34. SIGN IN WITH OPENAI — GRANDE VANTAGEM

Se o usuário já possui ChatGPT subscription:

```text
GPT model usage
→ usa a franquia existente do ChatGPT
```

Segundo camelAI:

```text
sem custo adicional camelAI pelo uso GPT
```

Isso é diferente de BYOK.

Pode coexistir com:

```text
camelAI credits
ou outro provider key
```

mas cobre somente GPT.

Adicionar como vantagem forte.

---

# 35. BYOK — LIMITAÇÃO IMPORTANTE

Quando o usuário conecta uma API key comum:

```text
BYOK substitui TODOS os hosted models do camelAI
```

inclusive:

```text
Camel Free
```

Não é possível configurar:

```text
minha key Anthropic para Claude
+
camel credits para GPT
```

simultaneamente.

Uma única configuração de provider substitui o hosted setup.

---

# 36. OPENROUTER BYOK

Se o usuário deseja:

```text
múltiplas famílias
com uma só chave
```

usar OpenRouter.

Providers diretamente não suportados, como certas rotas Azure/Vertex, podem ser acessados por OpenRouter quando disponíveis.

---

# 37. CAMELCODE — PRINCIPAIS VANTAGENS

Cadastrar:

```text
agente coding persistente
```

```text
workspace que sobrevive entre sessões
```

```text
full-stack app building
```

Stack promovida:

```text
React
TypeScript
Tailwind
```

```text
one-click deployment
```

```text
DNS
SSL
CDN
```

gerenciados.

```text
50+ integrações
```

Incluindo categorias como:

```text
PostgreSQL
MySQL
MongoDB
Redis
Snowflake
BigQuery
Stripe
Slack
GitHub
Notion
etc.
```

---

# 38. CONNECTION SECURITY

Credenciais de Connections:

```text
encrypted at rest
```

```text
não aparecem em logs/chat
```

```text
injetadas server-side
```

Aplicações podem utilizar secure connection bindings.

Isso é uma vantagem relevante.

---

# 39. CAMELCODE — LIMITAÇÕES

Destacar:

```text
premium LLM usage não é ilimitado
```

Depois dos créditos incluídos:

```text
top-up ou BYOK
```

---

Solo plans:

```text
Free / Starter / Pro:
somente 1 workspace incluído
```

Team:

```text
2 workspaces
```

Mais workspaces atualmente:

```text
via contato com suporte
self-service a-la-carte ainda não é padrão
```

---

# 40. CAMELCODE SELF-HOSTED

Adicionar como opção separada:

```text
camelCode Self-Hosted
```

Não é uma assinatura mensal normal.

Software:

```text
MIT
open source
```

Preço camelAI:

```text
$0 de licença de software
```

Custos:

```text
infraestrutura do usuário
+
LLM provider
+
DNS/storage/etc.
```

---

# 41. REQUISITOS SELF-HOST

```text
x86_64 Linux
Ubuntu 24.04 recomendado
```

```text
4 vCPU mínimo
8 GiB RAM mínimo
100 GiB persistent disk recomendado
```

Software:

```text
Docker Engine
Docker Compose v2
Git
Node.js 22
Bun 1.3.14
```

Também precisa:

```text
hostname
OIDC
wildcard domain
TLS/DNS
provider API key
```

---

# 42. PROVIDERS SELF-HOST

Suporta:

```text
AWS Bedrock
Anthropic
OpenAI
OpenRouter
compatible custom endpoint
```

---

# 43. LIMITAÇÕES SELF-HOST

Muito importante:

```text
single-node
```

Não inclui:

```text
multi-node failover
managed control plane
managed backup
managed monitoring
managed disaster recovery
```

Tudo isso é responsabilidade do operador.

---

# 44. EMAIL SELF-HOST

Não suporta atualmente:

```text
password signup + email verification
outbound email
internal SMTP
```

SMTP interno:

```text
não implementado
```

Invitations:

```text
podem ser criadas
mas admin precisa entregar URL manualmente
```

---

# 45. RISCO DOCKER SOCKET

Grande warning:

```text
camelAI application container
possui read-write access ao Docker socket
```

Consequência:

```text
quem controla esse container
possui efetivamente root-equivalent access à VM
```

Mostrar warning em Security.

---

# 46. CAMELSTREAM — PRODUTO DIFERENTE

Adicionar separadamente:

```text
camelStream
```

Tipo:

```text
flat-rate AI inference API
```

Não confundir com créditos camelCode.

---

# 47. CAMELSTREAM PRICING

Preço:

```text
US$5 / stream / mês
≈ R$25,54 / stream / mês
```

Self-service:

```text
1 a 50 streams
```

Mais de:

```text
50 streams
```

→ contact sales.

Ajustes de quantidade são prorated no ciclo corrente.

---

# 48. CAMELSTREAM — TOKENS

```text
Unlimited tokens
```

Não há:

```text
token meter
token allowance
overage charge
```

Preço permanece:

```text
$5 × número de streams
```

---

# 49. O QUE “STREAM” SIGNIFICA

Cada stream garante:

```text
1 geração concorrente
```

Exemplo:

```text
1 stream
→ 1 request gerando

segunda request
→ fila
```

```text
10 streams
→ 10 gerações garantidas paralelas
```

Burst extra pode ocorrer, mas NÃO é garantido.

---

# 50. LIMITAÇÃO PRINCIPAL CAMELSTREAM

`Unlimited tokens` NÃO significa:

```text
unlimited concurrency
```

A limitação é:

```text
parallel generation lanes
```

A fila pode inclusive durar mais que o timeout configurado pelo cliente.

Isso deve estar MUITO explícito.

---

# 51. CAMELSTREAM API

```text
Base URL:
https://stream.camelai.com/v1
```

Model:

```text
auto
```

Compatibilidade:

```text
OpenAI Chat Completions
OpenAI Responses
Anthropic Messages
```

Streaming:

```text
sim
```

Tool calling:

```text
sim
```

Structured output:

```text
sim
```

---

# 52. CAMELSTREAM NÃO VENDE UM MODELO ESPECÍFICO

Não colocar:

```text
includedModels = DeepSeek V4 Flash
```

como modelo fixo.

`model = auto`.

camelAI decide:

```text
modelo
provider
versão
```

e pode alterar o fleet.

O usuário NÃO consegue pin:

```text
DeepSeek only
Gemini only
GPT only
```

---

# 53. CURRENT CAMELSTREAM FLEET

A página oficial do fleet foi atualizada em:

```text
30/08/2026
```

Ela lista atualmente:

```text
DeepSeek V4 Flash
  0731 as of Aug 2026

Gemini Flash
  3.7 as of Aug 2026

GLM 5.3 Flash

GPT Luna
  5.6 as of Aug 2026

Muse Spark
  1.2 as of Aug 2026
```

IMPORTANTE:

Gemini 3.8 lançou depois.

Não mudar automaticamente:

```text
Gemini 3.7 → 3.8
```

enquanto a página oficial do fleet ainda listar 3.7.

Pode registrar:

```text
fleetDocsLagPossible = true
```

mas não inventar upgrade.

---

# 54. INTELLIGENCE FLOOR

Todo modelo do fleet deve possuir:

```text
Terminal-Bench 2.1 >= 70%
```

OU:

```text
Artificial Analysis Intelligence Index >= 50
```

É esse o contrato de qualidade do fleet.

---

# 55. CAMELSTREAM CONTEXT

Garantia mínima:

```text
260K tokens
```

Todos os modelos:

```text
vision = true
```

Segundo a regra do fleet.

Alguns modelos podem fornecer contexto maior.

---

# 56. CONTEXT COMPACTION

Se conversa ultrapassa a janela suportada:

```text
camelStream compacta a parte do meio
```

preservando:

```text
tarefa inicial
turnos recentes
roles
tool-call IDs
```

Não apresentar isso como:

```text
contexto nativo ilimitado
```

É compactação.

---

# 57. SPEED TARGETS

Metas publicadas:

```text
p10 >= 40 tok/s
p5 >= 20 tok/s
```

TTFT:

```text
p95 < 5 segundos
```

Mas são:

```text
TARGETS
```

NÃO:

```text
SLA
```

---

# 58. CAMELSTREAM NÃO POSSUI SPEED/UPTIME SLA NO STANDARD

Termos deixam claro:

```text
no specific throughput guarantee
no specific latency guarantee
no uptime guarantee
```

Apesar das metas públicas.

Mostrar:

```text
⚠ performance targets, not SLA
```

---

# 59. CAMELSTREAM PRIVACY — WARNING CRÍTICO

Este é talvez o maior ponto negativo do produto.

No plano standard:

```text
prompts e outputs podem ser retidos
```

e:

```text
podem ser usados para treinamento
```

por:

```text
camelAI
inference providers
model-development partners
```

Não existe:

```text
opt-out
```

no plano standard.

---

# 60. CAMELSTREAM NÃO É INDICADO PARA CÓDIGO CONFIDENCIAL

Mostrar warning forte:

> API content não deve ser considerado confidencial no plano standard.

Não recomendar para:

```text
código proprietário sensível
segredos comerciais
PII
credenciais
dados financeiros sensíveis
dados médicos
```

---

# 61. ACCOUNT DATA VS API CONTENT

CamelStream NÃO envia aos inference providers:

```text
nome
email
billing details
API key
IP associado à identidade da conta
```

Mas o provider recebe:

```text
prompt original
```

necessário para gerar a resposta.

Essa diferença deve ficar clara.

---

# 62. TRACE SCRUBBING

camelAI afirma executar privacy filtering sobre a cópia das traces que armazena, mascarando itens como:

```text
nomes
emails
telefones
endereços
account numbers
private URLs
datas privadas
API keys/tokens/passwords
```

Mas:

```text
o modelo serving request recebe o prompt original
```

antes desse scrub.

Não usar scrub como se fosse garantia de confidential inference.

---

# 63. CUSTOM PRIVACY TERMS CAMELSTREAM

Para:

```text
1.000+ streams
```

camelAI informa que pode oferecer custom terms:

```text
no-training
zero-retention
```

e providers compatíveis.

Isso é:

```text
contact sales
```

não parte do plano normal de $5.

---

# 64. CAMELSTREAM BILLING/RISK

Standard:

```text
monthly
cancel anytime
```

Termos permitem alteração de fleet/providers.

Não prometer:

```text
um modelo específico
versão fixa
uptime garantido
```

---

# 65. CAMELSTREAM — MELHOR USO

`bestFor`:

```text
coding agents de alto volume
workloads onde throughput agregado não precisa ser paralelo
experimentos
background workers
batch-like agent work
uso público/não sensível
alto consumo de tokens
```

---

# 66. CAMELSTREAM — EVITAR PARA

```text
dados confidenciais
requisitos ZDR
workloads que exigem modelo fixo
ultra-low-latency concurrency
workloads com muitas requests simultâneas usando só 1 stream
SLA empresarial
```

---

# 67. CAMELSTREAM VANTAGEM ECONÔMICA

Comparação conceitual:

```text
1 stream:
$5/mês
unlimited tokens
1 generation at a time

5 streams:
$25/mês
5 guaranteed concurrent generations

10 streams:
$50/mês
10 guaranteed concurrent generations
```

Não existe token overage.

---

# 68. CAMELSTREAM COMO HARNESS

Adicionar compatibilidade a:

```text
Hermes
Claude Code
Codex
OpenCode
Aider
Kilo Code
outros clientes OpenAI/Anthropic-compatible
```

Não confundir:

```text
compatível com Claude Code
```

com:

```text
modelo Claude
```

O `auto` ainda escolhe o fleet.

---

# 69. CAMELCODE VS CAMELSTREAM NA UI

Criar comparação:

|                       | camelCode                         | camelStream                           |
| --------------------- | --------------------------------- | ------------------------------------- |
| Função                | Coding agent/app builder          | Inference API                         |
| Preço                 | $0/$10/$40/$50 seat               | $5/stream                             |
| Tokens                | créditos premium + Camel Free     | ilimitados                            |
| Modelo fixo           | usuário escolhe quando disponível | não                                   |
| BYOK                  | sim                               | não é a proposta standard             |
| Workspace persistente | sim                               | não                                   |
| Deploy apps           | sim                               | não                                   |
| Automations           | sim                               | não                                   |
| Concurrency           | agente/plano                      | 1 geração por stream                  |
| Privacidade           | política camelCode/provider       | training permitido no Stream standard |

---

# 70. CAMELCODE HOSTED VS SELF-HOST

Criar terceira comparação:

```text
Hosted:
camelAI opera infraestrutura

Self-host:
usuário opera tudo
MIT
provider cost próprio
mais controle
mais responsabilidade
```

---

# 71. NÃO ADICIONAR CAMEL FREE AO RADAR 44

Não possui ledger técnico suficiente para compará-lo aos modelos canônicos.

Pode aparecer como:

```text
opaque hosted baseline
```

nas fichas do plano camelAI.

---

# 72. NÃO ADICIONAR CAMELSTREAM AUTO AO RADAR 44

É um:

```text
router/fleet
```

não um modelo.

Criar ficha de plataforma.

Pode mostrar:

```text
intelligence floor
context guarantee
speed targets
privacy
cost
```

sem inventar um radar como modelo.

---

# 73. CRIAR `CAMELAI_PLATFORM_DATA`

Sugestão:

```js
const CAMELAI_PLATFORM_DATA = {
  company: {...},

  camelCode: {
    hostedPlans: [...],
    modelAccess: {...},
    credits: {...},
    capabilities: [...],
    limits: {...}
  },

  camelStream: {
    pricePerStreamUsd: 5,
    tokenMetering: false,
    unlimitedTokens: true,
    concurrencyPerStream: 1,
    maxSelfServeStreams: 50,
    modelId: 'auto',
    contextMinimum: 260000,
    privacy: {...},
    fleet: [...]
  },

  selfHosted: {...},

  legacy: {...}
};
```

---

# 74. ADICIONAR CAMELAI A `SUBSCRIPTION_PLANS_DATA`

Planos atuais:

```text
camelCode Free
camelCode Starter
camelCode Pro
camelCode Team
camelCode Enterprise
camelStream
```

Self-host:

```text
não deve ser contado como assinatura SaaS normal
```

Pode ser:

```text
deployment option
```

---

# 75. PREÇOS CAMELAI EM BRL

Usando snapshot:

```text
1 USD ≈ R$5,108
```

mostrar:

```text
camelStream
$5
≈ R$25,54
```

```text
Starter
$10
≈ R$51,08
```

```text
Pro
$40
≈ R$204,32
```

```text
Team
$50/seat
≈ R$255,40/seat
```

```text
Team mínimo 3:
$150
≈ R$766,20
```

Conversões:

```text
não oficiais
```

usar `≈`.

---

# 76. FRESHNESS/SOURCES CAMELAI

Adicionar fontes separadas:

```text
camelai-plans-official
camelai-model-providers
camelai-stream-overview
camelai-stream-fleet
camelai-stream-terms
camelai-stream-privacy
camelai-self-hosting
camelai-connections
```

`verifiedAt`:

```text
2026-09-03
```

---

# 77. CORRIGIR AUDITOR — PLAN COUNT

Remover:

```js
assert(SUBSCRIPTION_PLANS_DATA.length === 32)
```

Substituir:

```js
assert(SUBSCRIPTION_PLANS_DATA.length > 0)
```

e testes específicos de IDs obrigatórios.

Adicionar:

```text
camelai-code-free
camelai-code-starter
camelai-code-pro
camelai-code-team
camelai-code-enterprise
camelai-stream
```

---

# 78. AUDITOR — CAMELAI

Validar:

```text
Starter = $10
Pro = $40
Team = $50
Team minimumSeats = 3
Stream = $5
```

```text
Stream unlimitedTokens = true
Stream concurrencyPerStream = 1
Stream modelSelection = auto
```

```text
Stream standard privacy:
trainingPossible = true
zdr = false
```

---

# 79. AUDITOR — NÃO DEIXAR LEGACY VIRAR CURRENT

Assert:

```js
camelai-legacy-professional.current !== true
```

Se existir.

---

# 80. CORRIGIR `platforms.js` FORA DO GO

Hoje ainda há erros.

## Cursor Models

Deve ser EXATAMENTE:

```text
grok-4-6
grok-4-5
composer-2-5
```

Remover Gemini 3.8.

## Antigravity Gemini pool

```text
gemini-3-8-flash
gemini-3-7-flash
gemini-3-6-flash
gemini-3-1-pro
```

## Claude/GPT pool

```text
claude-sonnet-4-6
claude-opus-4-6
gpt-oss-120b
```

---

# 81. REMOVER AVAILABILITY STRINGS INVENTADAS

Não utilizar strings manuais como:

```text
z-ai/claude-fable-5-1
```

ou outros provider slugs improváveis.

Availability deve ser estruturada:

```js
{
  available: true,
  providerModelId: '...',
  sourceId: '...',
  verifiedAt: '...'
}
```

Se não houver certeza:

```text
unverified
```

não inventar.

---

# 82. GOOGLE AI PRO — TESTE DE REGRESSÃO

Adicionar:

```js
assert(googleAiPro.storageTb === 5)
```

---

# 83. FABLE PRO — TESTE DE REGRESSÃO

Adicionar:

```js
assert(
  access('anthropic-claude-pro','claude-fable-5-1')
    .includedInBaseQuota === false
)
```

---

# 84. CURSOR — TESTE DE REGRESSÃO

```js
assert(
  cursorModels.sort() ===
  ['composer-2-5','grok-4-5','grok-4-6'].sort()
)
```

---

# 85. ANTIGRAVITY — TESTE DE REGRESSÃO

```text
Gemini 3.1 Pro MUST be in Gemini pool

GPT-OSS-120B MUST be in Claude/GPT pool
```

---

# 86. ROI — TESTE

O HTML não pode conter:

```text
value="5.80"
```

para câmbio default.

A taxa deve vir de `FX_RATES_DATA`.

---

# 87. NOVO RESULTADO DO PROJETO

Depois da alteração, a área de planos deve poder exibir:

## camelCode Pro

```text
US$40/mês
≈ R$204,32

US$40 premium model credits
Camel Free priority
1 workspace
100 GB
Unlimited deployed apps
Unlimited domains
50 automations / 5 min
Email inbox

Premium usage beyond credits:
top-up / BYOK / OpenAI login

Best for:
solo builder usando camelAI como plataforma de desenvolvimento
```

---

## camelStream

```text
US$5/stream/mês
≈ R$25,54

Unlimited tokens
1 guaranteed concurrent generation
Requests adicionais entram em fila
260K mínimo de contexto
Vision
auto model routing
no token overage

⚠ prompts/outputs podem ser usados para treinamento
⚠ sem model pinning
⚠ targets de velocidade não são SLA
```

---

# 88. RESULTADO FINAL

Ao concluir, apresentar:

```text
arquivos modificados
erros corrigidos
planos adicionados
regression tests adicionados
```

E confirmar explicitamente:

```text
OpenCode Go preservado
Fable Pro corrigido
Google Pro 5 TB
Google Plus incluído
Cursor pools corrigidos
Antigravity corrigido
FX atualizado
ROI sem dólar hardcoded
camelCode incluído
camelStream incluído
camelAI Legacy isolado
```

Não afirmar “auditoria concluída” enquanto qualquer um desses pontos continuar incorreto.
