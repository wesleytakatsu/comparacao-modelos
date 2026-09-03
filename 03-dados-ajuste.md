# CORREÇÃO PRIORITÁRIA — OPENCODE GO

## Auditoria completa do Go — Snapshot oficial 03/09/2026

A implementação atual do OpenCode Go no projeto está estruturalmente incorreta e precisa ser refeita.

A documentação oficial de referência foi atualizada em 02/09/2026.

Esta correção tem prioridade sobre dados antigos de OpenCode Go presentes em:

* `data.js`
* `data/plans.js`
* `data/platforms.js`
* `app.js`
* `index.html`
* simuladores
* Model Router
* stacks de orçamento
* fichas dos modelos
* PRIVACY_ZDR_DATABASE
* `OPENCODE_GO_CATALOG`
* qualquer campo `openCodeGo` dentro de `AI_MODELS_DATA`

---

# 1. PRINCIPAL ERRO CONCEITUAL DO GO

O OpenCode Go custa:

```text
US$10/mês
≈ R$51,27 usando USD/BRL 5,127
```

Os limites NOMINAIS gerais são:

```text
5 horas: US$12 de valor de uso
semana:   US$30 de valor de uso
mês:      US$60 de valor de uso
```

PORÉM:

**nem todos os modelos recebem os US$60 completos de valor mensal.**

A documentação possui uma coluna oficial chamada:

`Uso`

e cada modelo pertence a uma das classes:

```text
US$60
US$30
US$15
```

Isso muda drasticamente o consumo da quota.

---

# 2. COMO EXPLICAR ESSA QUOTA AO USUÁRIO

Usar três classes visuais.

## 🟢 Classe US$60 — FULL GO / 6×

```text
Valor máximo efetivo:
US$60

Valor recebido vs assinatura de US$10:
6×

Participação da quota nominal:
100%

Quota burn:
1×

Eficiência Go:
máxima
```

Se o usuário consumir US$1 equivalente nesse modelo:

```text
consome ~US$1 da quota nominal Go
```

---

## 🟡 Classe US$30 — HALF GO / 3×

```text
Valor máximo efetivo:
US$30

Valor recebido vs assinatura:
3×

Participação da quota nominal:
50%

Quota burn:
2×
```

Isto significa:

> um modelo classe US$30 consome a quota aproximadamente DUAS VEZES mais rápido que um modelo classe US$60.

Exemplo:

```text
US$1 de uso equivalente do modelo
≈ US$2 da quota nominal Go
```

Portanto, mesmo o plano dizendo:

```text
US$60/mês
```

se o usuário utilizar exclusivamente um modelo classe US$30:

```text
ele consegue aproveitar apenas cerca de metade desse valor nominal.
```

Isso deve estar MUITO explícito na UI.

---

## 🔴 Classe US$15 — QUARTER GO / 1,5×

```text
Valor máximo efetivo:
US$15

Valor recebido vs assinatura:
1,5×

Participação da quota nominal:
25%

Quota burn:
4×
```

Ou seja:

> esses modelos queimam aproximadamente QUATRO VEZES mais quota que os modelos US$60.

Exemplo:

```text
US$1 de uso equivalente
≈ US$4 da quota nominal Go
```

Se usados exclusivamente:

```text
quota nominal:
US$60

valor efetivo:
US$15

somente 25%
```

---

# 3. FÓRMULAS OFICIAIS/DERIVADAS

Criar:

```js
goPlanPriceUsd = 10;
goNominalMonthlyQuotaUsd = 60;
```

Para cada modelo:

```js
valueMultiplierVsSubscription =
  modelUsageAllowanceUsd / 10;
```

```js
quotaBurnMultiplier =
  60 / modelUsageAllowanceUsd;
```

```js
effectiveNominalQuotaSharePct =
  modelUsageAllowanceUsd / 60 * 100;
```

Resultados:

| Uso   | valor vs US$10 | burn | quota efetiva |
| ----- | -------------: | ---: | ------------: |
| US$60 |             6× |   1× |          100% |
| US$30 |             3× |   2× |           50% |
| US$15 |           1,5× |   4× |           25% |

---

# 4. IMPORTANTE — NÃO SÃO 3 POOLS INDEPENDENTES

Não representar como se o usuário recebesse:

```text
$60 para modelos verdes
+
$30 para amarelos
+
$15 para vermelhos
```

Não é isso.

Tratar como **fatores de consumo sobre a franquia do Go**.

Ao misturar modelos, cada uso deve consumir quota de acordo com seu `quotaBurnMultiplier`.

---

# 5. CALCULADORA DE QUOTA GO

Criar cálculo:

```js
normalizedGoQuotaConsumed =
  equivalentModelUsageUsd * quotaBurnMultiplier;
```

Exemplo:

```text
US$5 equivalentes usando modelo US$60:
5 × 1 = US$5 de quota

US$5 equivalentes usando modelo US$30:
5 × 2 = US$10 de quota

US$5 equivalentes usando modelo US$15:
5 × 4 = US$20 de quota
```

Esse exemplo deve aparecer na interface.

---

# 6. LIMITES POR JANELA

Limites nominais:

```js
{
  fiveHoursUsd: 12,
  weeklyUsd: 30,
  monthlyUsd: 60
}
```

É útil mostrar também, como MÉTRICA DERIVADA, o equivalente por classe:

| Classe |    5h |   semana |   mês |
| ------ | ----: | -------: | ----: |
| US$60  | US$12 |    US$30 | US$60 |
| US$30  | ~US$6 |   ~US$15 | US$30 |
| US$15  | ~US$3 | ~US$7,50 | US$15 |

Marcar:

```text
DERIVED / derivado da proporção oficial de uso
```

e não fingir que a documentação publica esses três limites separados literalmente.

---

# 7. CATÁLOGO OFICIAL ATUAL

O catálogo Go atual possui:

**26 modelos**

Não 29.

Não “24+”.

Lista oficial:

```text
Grok 4.6
GLM-5.3-Flash
GLM-5.3
GLM-5.2
GLM-5.1
GPT 5.6 Luna
Kimi K3
Kimi K2.7 Code
Kimi K2.6
LongCat-2.0
MiMo-V2.5
MiMo-V2.5-Pro
MiniMax M3
MiniMax M2.7
Muse Spark 1.3 Contributor
Muse Spark 1.2 Contributor
Qwen3.8 Max
Qwen3.8 Flash
Qwen3.7 Max
Qwen3.7 Plus
Qwen3.6 Plus
DeepSeek V4 Pro
DeepSeek V4 Flash
DeepSeek V4 Flash Vision Exp
Hy4 preview
Hy3
```

Snapshot:

```text
02/09/2026
```

A própria documentação diz que a lista pode mudar.

---

# 8. REMOVER DISPONIBILIDADES GO FALSAS

O `AI_MODELS_DATA` atual marca vários modelos como Go que NÃO estão no catálogo oficial.

Remover disponibilidade Go, entre outros, de:

```text
GPT-5.6 Sol
GPT-5.6 Terra
GPT-5.5
GPT-OSS-120B
GPT-OSS-20B
```

e qualquer outro modelo não presente na lista oficial dos 26 acima.

GPT-5.6 disponível no Go atualmente é:

```text
GPT 5.6 Luna
```

---

# 9. ELIMINAR `openCodeGo` DUPLICADO DE `AI_MODELS_DATA`

Atualmente cada modelo possui blocos como:

```js
openCodeGo: {
  available: true,
  id: 'openai/...',
  quotaMultiplier: ...,
  estReqMonth: ...
}
```

REMOVER essa fonte de verdade.

Ela está desatualizada.

Disponibilidade Go deve ser derivada exclusivamente do catálogo central Go.

---

# 10. ELIMINAR O ANTIGO `OPENCODE_GO_CATALOG`

O `data.js` ainda possui:

```text
CATÁLOGO COMPLETO DO OPENCODE GO (29 IDS)
```

Esse catálogo está obsoleto.

Há, por exemplo:

```text
GLM-5.3-Flash
estReqMonth: 15000
```

enquanto a tabela oficial atual é:

```text
7900
```

Remover esse dataset antigo ou convertê-lo em uma view gerada dinamicamente a partir do novo dataset canônico.

---

# 11. UMA ÚNICA FONTE DE VERDADE

Criar:

```js
OPENCODE_GO_DATA
```

Pode substituir ou incorporar:

```js
PLATFORM_MODEL_CATALOG.opencodeGo
```

Mas deve existir somente **uma fonte canônica**.

Todo o resto consulta essa estrutura.

---

# 12. NÃO USAR MAIS `multiplier` AMBÍGUO

O atual `data/platforms.js` possui coisas como:

```text
Grok multiplier: 5.0
Luna multiplier: 0.8
GLM-5.3 multiplier: 4.0
```

Esses números não representam corretamente a economia atual do Go.

Remover `multiplier` genérico.

Usar campos semanticamente explícitos:

```js
usageAllowanceUsd
valueMultiplierVsSubscription
quotaBurnMultiplier
effectiveQuotaPct
```

---

# 13. CLASSE US$15 — BURN 4×

Estes modelos possuem `Uso = US$15`:

```text
Grok 4.6
GPT 5.6 Luna
GLM-5.3-Flash
GLM-5.3
Kimi K3
MiMo-V2.5-Pro
Qwen3.8 Max
DeepSeek V4 Pro
DeepSeek V4 Flash Vision Exp
```

Para todos:

```js
usageAllowanceUsd: 15,
valueMultiplierVsSubscription: 1.5,
quotaBurnMultiplier: 4,
effectiveQuotaPct: 25
```

Mostrar badge:

```text
🔴 4× QUOTA BURN
US$15 EFFECTIVE
```

---

# 14. CLASSE US$30 — BURN 2×

```text
Qwen3.8 Flash
Qwen3.7 Max
DeepSeek V4 Flash
Hy4 preview
```

Campos:

```js
usageAllowanceUsd: 30,
valueMultiplierVsSubscription: 3,
quotaBurnMultiplier: 2,
effectiveQuotaPct: 50
```

Badge:

```text
🟡 2× QUOTA BURN
US$30 EFFECTIVE
```

---

# 15. CLASSE US$60 — BURN 1×

```text
GLM-5.2
GLM-5.1
Kimi K2.7 Code
Kimi K2.6
LongCat-2.0
MiMo-V2.5
MiniMax M3
MiniMax M2.7
Muse Spark 1.3 Contributor
Muse Spark 1.2 Contributor
Qwen3.7 Plus
Qwen3.6 Plus
Hy3
```

Campos:

```js
usageAllowanceUsd: 60,
valueMultiplierVsSubscription: 6,
quotaBurnMultiplier: 1,
effectiveQuotaPct: 100
```

Badge:

```text
🟢 FULL 6× VALUE
1× QUOTA BURN
```

---

# 16. TABELA OFICIAL COMPLETA DE REQUESTS

Usar exatamente:

| Modelo                       |     5h |  Semana |     Mês | Uso | Burn |
| ---------------------------- | -----: | ------: | ------: | --: | ---: |
| Grok 4.6                     |    169 |     423 |     845 | $15 |   4× |
| GPT 5.6 Luna                 |  2.050 |   5.100 |  10.250 | $15 |   4× |
| GLM-5.3-Flash                |  1.580 |   3.950 |   7.900 | $15 |   4× |
| GLM-5.3                      |    220 |     540 |   1.080 | $15 |   4× |
| GLM-5.2                      |    880 |   2.150 |   4.300 | $60 |   1× |
| GLM-5.1                      |    880 |   2.150 |   4.300 | $60 |   1× |
| Kimi K3                      |    110 |     250 |     490 | $15 |   4× |
| Kimi K2.7 Code               |  1.350 |   3.380 |   6.750 | $60 |   1× |
| Kimi K2.6                    |  1.150 |   2.880 |   5.750 | $60 |   1× |
| LongCat-2.0                  | 11.400 |  28.600 |  57.200 | $60 |   1× |
| MiMo-V2.5                    | 30.100 |  75.200 | 150.400 | $60 |   1× |
| MiMo-V2.5-Pro                |  3.250 |   8.150 |  16.300 | $15 |   4× |
| MiniMax M3                   |  3.200 |   8.000 |  16.000 | $60 |   1× |
| MiniMax M2.7                 |  3.400 |   8.500 |  17.000 | $60 |   1× |
| Muse Spark 1.3 Contributor   | 45.300 | 113.300 | 226.600 | $60 |   1× |
| Muse Spark 1.2 Contributor   | 45.300 | 113.300 | 226.600 | $60 |   1× |
| Qwen3.8 Max                  |    160 |     400 |     810 | $15 |   4× |
| Qwen3.8 Flash                |  5.400 |  13.500 |  27.000 | $30 |   2× |
| Qwen3.7 Max                  |    170 |     420 |     840 | $30 |   2× |
| Qwen3.7 Plus                 |  4.300 |  10.800 |  21.600 | $60 |   1× |
| Qwen3.6 Plus                 |  3.300 |   8.200 |  16.300 | $60 |   1× |
| DeepSeek V4 Pro              |  1.050 |   2.600 |   5.200 | $15 |   4× |
| DeepSeek V4 Flash            |  7.600 |  18.900 |  37.800 | $30 |   2× |
| DeepSeek V4 Flash Vision Exp |  3.800 |   9.450 |  18.900 | $15 |   4× |
| Hy4 preview                  |  1.350 |   3.380 |   6.770 | $30 |   2× |
| Hy3                          |  4.300 |  10.750 |  21.500 | $60 |   1× |

As requisições são ESTIMATIVAS oficiais baseadas em padrões típicos.

Não apresentar como garantia contratual.

---

# 17. CONSEQUÊNCIA ECONÔMICA — DEVE APARECER NA UI

Exemplo destacado:

```text
DeepSeek V4 Flash
37.800 req/mês
US$30 effective usage
2× quota burn
```

Isso significa:

> Apesar do número enorme de requisições, ele só recebe metade dos US$60 nominais do Go.

Outro:

```text
Kimi K3
490 req/mês
US$15 effective
4× quota burn
```

Outro:

```text
MiMo-V2.5
150.400 req/mês
US$60 effective
1× burn
```

---

# 18. ADICIONAR “GO VALUE EFFICIENCY”

Criar coluna:

```text
Go Value
```

Valores:

```text
6×
3×
1,5×
```

E outra:

```text
Quota Burn
```

Valores:

```text
1×
2×
4×
```

---

# 19. ADICIONAR WARNING PARA MODELOS CAROS DE QUOTA

Para burn 4×:

```text
⚠ Consome a franquia Go 4× mais rápido que modelos Full 6×.
```

Para burn 2×:

```text
⚠ Consome aproximadamente 2× mais quota que um modelo Full 6×.
```

---

# 20. TOKEN PROFILE USADO NAS ESTIMATIVAS

Armazenar também os perfis oficiais.

Formato:

```text
input / cache / output
```

### Grok 4.6

```text
390 / 32.500 / 120
```

### GLM-5.3-Flash

```text
1.000 / 55.000 / 200
```

### GLM-5.3 / 5.2 / 5.1

```text
700 / 52.000 / 150
```

### GPT 5.6 Luna

```text
1.000 / 50.000 / 220
```

### Kimi K3

```text
1.050 / 76.500 / 300
```

### Kimi K2.7 / K2.6

```text
870 / 55.000 / 200
```

### LongCat-2.0

```text
920 / 88.900 / 200
```

### DeepSeek V4 Pro

```text
750 / 82.000 / 290
```

### DeepSeek V4 Flash / Vision Exp

```text
410 / 71.300 / 310
```

### MiniMax M3

```text
510 / 56.000 / 190
```

### MiniMax M2.7

```text
300 / 55.000 / 125
```

### Muse Spark 1.3 / 1.2

```text
620 / 71.400 / 300
```

### Qwen3.8 Max

```text
420 / 66.000 / 200
```

### Qwen3.8 Flash

```text
600 / 58.000 / 200
```

### Qwen3.7 Max

```text
420 / 66.000 / 200
```

### Qwen3.7 Plus

```text
500 / 57.000 / 190
```

### Qwen3.6 Plus

```text
500 / 57.000 / 190
```

### Hy4 / Hy3 / MiMo-V2.5

```text
830 / 71.500 / 295
```

### MiMo-V2.5-Pro

```text
790 / 86.000 / 305
```

---

# 21. TABELA DE PREÇOS USADA PELO GO

Guardar preço específico do canal Go.

Não sobrescrever API pricing canônico do modelo.

Criar:

```js
goPricing
```

---

# 22. GROK 4.6 GO PRICING

Até 200K:

```text
input: $2.00/M
output: $6.00/M
cache read: $0.50/M
usageAllowance: $15
```

Acima de 200K:

```text
input: $4.00
output: $12.00
cache: $1.00
```

---

# 23. GPT 5.6 LUNA GO

Até 272K:

```text
input: $0.20
output: $1.20
cache read: $0.02
cache write: $0.25
```

Acima:

```text
input: $0.40
output: $1.80
cache read: $0.04
cache write: $0.50
```

Uso:

```text
$15
```

---

# 24. GLM

```text
GLM-5.3-Flash
$0.15 / $0.50
cache $0.03
Uso $15
```

```text
GLM-5.3
$1.40 / $4.40
cache $0.26
Uso $15
```

```text
GLM-5.2
$1.40 / $4.40
cache $0.26
Uso $60
```

```text
GLM-5.1
$1.40 / $4.40
cache $0.26
Uso $60
```

Essa diferença é extremamente importante:

> GLM-5.3 tem a mesma taxa por token de 5.2/5.1 no Go, mas só possui US$15 de uso contra US$60 deles.

Logo:

```text
GLM-5.3 = 4× burn
GLM-5.2/5.1 = 1×
```

---

# 25. KIMI

```text
Kimi K3
input $3
output $15
cache $0.30
Uso $15
burn 4×
```

```text
Kimi K2.7 Code
input $0.95
output $4
cache $0.19
Uso $60
```

```text
Kimi K2.6
input $0.95
output $4
cache $0.16
Uso $60
```

---

# 26. LONGCAT

```text
input $0.30
output $1.20
cache $0.006
Uso $60
```

---

# 27. MIMO

```text
MiMo-V2.5

input $0.14
output $0.28
cache $0.0028
Uso $60
```

```text
MiMo-V2.5-Pro

input $0.435
output $0.87
cache $0.003625
Uso $15
```

---

# 28. MINIMAX

```text
M3
$0.30 / $1.20
cache $0.06
Uso $60
```

```text
M2.7
$0.30 / $1.20
cache read $0.06
cache write $0.375
Uso $60
```

A documentação também contém pricing para MiniMax M2.5, mas ele NÃO aparece na lista atual principal dos 26 modelos.

Não adicionar M2.5 ao catálogo ativo apenas por existir na tabela de pricing.

---

# 29. MUSE SPARK CONTRIBUTOR

1.3:

```text
input $0.10
output $0.20
cache $0.002
Uso $60
```

1.2:

```text
input $0.10
output $0.20
cache $0.002
Uso $60
```

Ambos possuem disponibilidade regional limitada.

---

# 30. QWEN

```text
Qwen3.8 Max
$2 / $6
cache $0.25
cache write $2.50
Uso $15
burn 4×
```

```text
Qwen3.8 Flash
$0.15 / $0.47
cache $0.016
cache write $0.20
Uso $30
burn 2×
```

```text
Qwen3.7 Max
$2.50 / $7.50
cache $0.50
cache write $3.125
Uso $30
burn 2×
```

Qwen3.7 Plus <=256K:

```text
$0.40 / $1.60
cache $0.04
write $0.50
```

> 256K:

```text
$1.20 / $4.80
cache $0.12
write $1.50
```

Uso:

```text
$60
```

Qwen3.6 Plus <=256K:

```text
$0.50 / $3
cache $0.05
write $0.625
```

> 256K:

```text
$2 / $6
cache $0.20
write $2.50
```

Uso:

```text
$60
```

---

# 31. DEEPSEEK

## V4 Pro

Off-Peak:

```text
$0.66 / $1.98
cache $0.022
```

Peak:

```text
$1.32 / $3.96
cache $0.044
```

Uso:

```text
$15
burn 4×
```

## V4 Flash

Off-Peak:

```text
$0.22 / $0.66
cache $0.007
```

Peak:

```text
$0.44 / $1.32
cache $0.014
```

Uso:

```text
$30
burn 2×
```

## V4 Flash Vision Exp

Mesmos preços Flash:

```text
$0.22 / $0.66 off-peak
$0.44 / $1.32 peak
```

Uso:

```text
$15
burn 4×
```

---

# 32. DEEPSEEK PEAK HOURS

Peak:

```text
01:00–04:00 UTC
06:00–10:00 UTC
segunda a sexta
```

Todos os demais períodos:

```text
Off-Peak
```

Fim de semana:

```text
Off-Peak
```

---

# 33. DEEPSEEK VISION

Imagens:

```text
convertidas em tokens conforme dimensões
```

e:

```text
cobradas como input tokens
```

---

# 34. HY

```text
Hy4 preview
input $0.834
output $2.501
cache $0.042
Uso $30
burn 2×
```

```text
Hy3
input $0.14
output $0.58
cache $0.035
Uso $60
burn 1×
```

---

# 35. ENDPOINTS GO

A assinatura fornece uma chave API própria do Go.

Base:

```text
https://opencode.ai/zen/go/v1/
```

Não é uma chave geral dos fabricantes.

---

# 36. RESPONSES ENDPOINT

Usam:

```text
/responses
```

Pacote:

```text
@ai-sdk/openai
```

Modelos:

```text
Grok 4.6
GPT 5.6 Luna
Muse Spark 1.3 Contributor
Muse Spark 1.2 Contributor
```

---

# 37. CHAT COMPLETIONS

Usam:

```text
/chat/completions
```

Pacote:

```text
@ai-sdk/openai-compatible
```

Modelos:

```text
GLM-5.3-Flash
GLM-5.3
GLM-5.2
GLM-5.1
Kimi K3
Kimi K2.7 Code
Kimi K2.6
LongCat-2.0
DeepSeek V4 Pro
DeepSeek V4 Flash
DeepSeek V4 Flash Vision Exp
MiMo-V2.5
MiMo-V2.5-Pro
Hy4 preview
Hy3
```

---

# 38. MESSAGES ENDPOINT

Usam:

```text
/messages
```

Pacote:

```text
@ai-sdk/anthropic
```

Modelos:

```text
MiniMax M3
MiniMax M2.7
Qwen3.8 Max
Qwen3.8 Flash
Qwen3.7 Max
Qwen3.7 Plus
Qwen3.6 Plus
```

---

# 39. IDS CORRETOS

Configuração OpenCode:

```text
opencode-go/<model-id>
```

Exemplos:

```text
opencode-go/grok-4.6
opencode-go/gpt-5.6-luna
opencode-go/glm-5.3-flash
opencode-go/kimi-k3
opencode-go/deepseek-v4-flash
```

Remover IDs antigos:

```text
xai/grok-4.6
openai/gpt-5.6-luna
zai/glm-...
```

quando o campo representa o ID do OpenCode Go.

---

# 40. CATÁLOGO VS MODELOS CANÔNICOS DO PORTAL

Nem todo modelo Go precisa virar um dos 44 modelos principais.

Manter `canonicalId = null` para SKUs apenas de plataforma quando não houver entrada canônica.

Isso se aplica atualmente a itens como:

```text
Muse Spark 1.3 Contributor
Qwen3.8 Flash
Qwen3.7 Plus
Qwen3.6 Plus
Hy4 preview
```

---

# 41. DEEPSEEK V4 FLASH VISION EXP

O OpenCode oferece explicitamente:

```text
deepseek-v4-flash-vision-exp
```

como SKU.

Isso prova a disponibilidade NO OPENCODE.

Não necessariamente prova que:

```text
deepseek-v4-vision-exp
```

é um release oficial canônico da DeepSeek com exatamente a mesma identidade.

Portanto preferir:

```js
canonicalId: null,
platformSku: true
```

até a identidade upstream estar comprovada.

---

# 42. PRIVACIDADE GO — NÃO É “ZDR PARA TODOS”

A implementação atual afirma genericamente:

```text
ZDR para todos os modelos
```

Isso é ERRADO.

---

# 43. GROK 4.6 NO GO

```text
usado para treinamento:
NÃO

retenção:
30 dias
```

Não é ZDR.

---

# 44. GPT 5.6 LUNA

```text
treinamento:
NÃO

retenção:
até 30 dias
```

Logs são relacionados a monitoramento de abuso.

Não é ZDR estrito.

---

# 45. MODELOS 0-DAY DA TABELA GO

A tabela atual publica:

```text
GLM-5.3-Flash
GLM-5.3
GLM-5.2
GLM-5.1
Kimi K3
Kimi K2.7 Code
Kimi K2.6
LongCat-2.0
MiMo-V2.5
MiMo-V2.5-Pro
Qwen3.8 Max
Qwen3.8 Flash
Qwen3.7 Max
Qwen3.7 Plus
Qwen3.6 Plus
MiniMax M3
MiniMax M2.7
DeepSeek V4 Pro
DeepSeek V4 Flash
DeepSeek V4 Flash Vision Exp
Hy4 preview
Hy3
```

como:

```text
training = NO
retention = 0 days
```

PORÉM existe uma ressalva DeepSeek descrita abaixo.

---

# 46. MUSE SPARK CONTRIBUTOR É EXCEÇÃO

Muse Spark 1.3 Contributor:

```text
training:
SIM

retention:
NOT ZDR
```

Muse Spark 1.2 Contributor:

```text
training:
SIM

retention:
NOT ZDR
```

Os preços têm forte desconto justamente em troca da permissão para usar prompts/respostas para treinamento futuro da Meta.

Isso deve aparecer como warning vermelho.

---

# 47. DEEPSEEK V4 FLASH — ZDR PRECISA DE WARNING

A documentação atual ainda possui a nota:

```text
DeepSeek V4 Flash:
o acordo ZDR é renovado mensalmente.
```

e afirma que o acordo listado era válido até:

```text
31/08/2026
```

A data atual é:

```text
03/09/2026
```

Portanto NÃO marcar simplesmente:

```text
zdrGuaranteed = true
```

Usar algo como:

```js
{
  retentionDaysAccordingToTable: 0,
  zdrAgreementRequiresRenewal: true,
  documentedAgreementValidUntil: '2026-08-31',
  currentGuaranteeStatus: 'needs-revalidation'
}
```

UI:

```text
⚠ A tabela indica 0 dias, mas a nota de acordo ZDR
publicada está expirada desde 31/08/2026.
Revalidação necessária.
```

---

# 48. USO ALÉM DA COTA

O projeto atualmente possui:

```text
overageAllowed: false
```

Isso está ERRADO.

Se o usuário possuir saldo no:

```text
OpenCode Zen
```

pode habilitar:

```text
Use balance
```

Quando a franquia Go acaba:

```text
Zen balance vira fallback
```

Criar:

```js
zenBalanceFallbackSupported: true,
zenBalanceFallbackRequiresOptIn: true
```

---

# 49. APÓS ESGOTAR A COTA

O usuário também pode continuar utilizando:

```text
modelos gratuitos
```

do ecossistema OpenCode.

Isso precisa aparecer na UI.

---

# 50. O US$60 NÃO É CRÉDITO DE CARTEIRA

Deixar claro:

```text
US$60/month usage
```

não significa:

```text
US$60 depositados no Zen balance
```

É valor de uso permitido pelo mecanismo Go.

O saldo Zen é separado.

---

# 51. SOMENTE UM MEMBRO POR WORKSPACE

Regra oficial:

```text
Only one member per workspace
can subscribe to OpenCode Go.
```

Adicionar ao plano.

---

# 52. PODE USAR COM OUTROS AGENTES

O projeto hoje contém texto sugerindo:

```text
“interface focada em terminal/CLI”
```

ou:

```text
“requer harness OpenCode”
```

Isso é ERRADO.

O Go pode ser usado com:

```text
OpenCode
+
outros coding agents com padrões semelhantes de requests
```

através da API key/endpoints.

---

# 53. TRAFFIC POLICY

A documentação informa que tráfego é monitorado para abuso.

Para evitar flag:

```text
não gerar tráfego abusivo
```

e:

```text
a ferramenta deve identificar-se adequadamente
```

Evitar broad/generic user agents.

Adicionar como nota técnica.

---

# 54. ATUALIZAR `data/plans.js`

Objeto Go deve conter aproximadamente:

```js
{
  id: 'opencode-go',

  monthlyPriceUsd: 10,

  nominalLimits: {
    fiveHoursUsd: 12,
    weeklyUsd: 30,
    monthlyUsd: 60
  },

  targetValueMultiplier: 6,

  subscriberLimitPerWorkspace: 1,

  providerCredentialIncluded: true,
  externalProviderCreditsIncluded: false,

  zenBalanceFallbackSupported: true,
  zenBalanceFallbackRequiresOptIn: true,

  freeModelsAfterLimit: true,

  currentModelCount: 26,

  modelCatalogSource:
    'OPENCODE_GO_DATA',

  privacyModelSpecific: true
}
```

---

# 55. NÃO MANTER `includedModels` MANUAL

Hoje `plans.js` lista apenas alguns modelos.

Remover a lista manual.

Gerar:

```text
modelos disponíveis
```

a partir de:

```js
OPENCODE_GO_DATA.models
```

---

# 56. CORRIGIR BUDGET STACK RECOMMENDER

O stack atual diz coisas como:

```text
volume absurdo / dezenas de milhares de requests
```

Isso é enganoso.

Dependendo do modelo:

```text
Kimi K3 = 490/mês
Qwen3.8 Max = 810
Grok = 845
```

enquanto:

```text
Muse = 226.600
MiMo = 150.400
```

Mostrar sempre:

```text
volume depende fortemente do modelo
```

---

# 57. STACK GO DEVE LEVAR QUOTA BURN EM CONTA

Não recomendar:

```text
GLM-5.3
Grok
Kimi K3
Qwen3.8 Max
```

como modelos cotidianos econômicos sem aviso.

Todos são:

```text
4× burn
```

---

# 58. SUGESTÃO DE ROUTING GO POR EFICIÊNCIA DE COTA

## Workers econômicos — 1× burn

```text
MiMo-V2.5
LongCat-2.0
MiniMax M3
MiniMax M2.7
Kimi K2.7 Code
Kimi K2.6
GLM-5.2
GLM-5.1
Hy3
Qwen3.7 Plus
Qwen3.6 Plus
```

## Intermediários — 2× burn

```text
Qwen3.8 Flash
DeepSeek V4 Flash
Hy4 preview
Qwen3.7 Max
```

## Escalonamento caro de quota — 4× burn

```text
Grok 4.6
GPT 5.6 Luna
GLM-5.3-Flash
GLM-5.3
Kimi K3
MiMo-V2.5-Pro
Qwen3.8 Max
DeepSeek V4 Pro
DeepSeek V4 Flash Vision Exp
```

Não significa que 4× são “piores”.

Significa apenas:

```text
mais caros na contabilidade da quota Go.
```

---

# 59. CRIAR “GO QUOTA SIMULATOR”

Na página do Go, permitir:

```text
Modelo
Requests estimadas
Janela: 5h / semana / mês
```

Resultado:

```text
Classe de uso
Burn multiplier
Quota efetiva
Requests restantes
Percentual consumido
Zen fallback
```

---

# 60. EXEMPLO VISUAL

Usuário seleciona:

```text
DeepSeek V4 Flash
```

mostrar:

```text
Plano: US$10/mês

Quota nominal:
US$60/mês

Classe do modelo:
US$30

Valor vs assinatura:
3×

Burn:
2×

Quota efetiva:
50%

Estimativa:
37.800 requests/mês
```

Warning:

```text
⚠ Embora o Go anuncie até US$60 de uso,
DeepSeek V4 Flash pertence à classe US$30.
Ele consome quota aproximadamente 2× mais rápido
que modelos Full Go de US$60.
```

---

# 61. EXEMPLO GLM-5.3

```text
GLM-5.3

Uso:
$15

Valor:
1,5× subscription

Burn:
4×

Quota efetiva:
25%

Requests:
220 / 5h
540 / semana
1.080 / mês
```

Warning vermelho.

---

# 62. EXEMPLO MIMO-V2.5

```text
MiMo-V2.5

Uso:
$60

Value:
6×

Burn:
1×

Quota efetiva:
100%

Requests:
30.100 / 5h
75.200 / semana
150.400 / mês
```

---

# 63. AUDITORIA AUTOMÁTICA

Adicionar testes:

```text
Go catalog count == 26
```

---

```text
Muse Spark 1.3 Contributor MUST exist
```

---

```text
GPT-5.6 Sol MUST NOT exist in Go catalog
```

```text
GPT-5.6 Terra MUST NOT exist
```

```text
GPT-5.5 MUST NOT exist
```

```text
GPT-OSS models MUST NOT exist
```

---

# 64. TESTE DE USAGE CLASS

Cada modelo deve ter:

```text
usageAllowanceUsd ∈ {15, 30, 60}
```

---

# 65. TESTE DE BURN

```js
quotaBurnMultiplier ===
  60 / usageAllowanceUsd
```

---

# 66. TESTE DE VALUE

```js
valueMultiplierVsSubscription ===
  usageAllowanceUsd / 10
```

---

# 67. TESTE DE REQUEST TABLE

Validar exatamente os números da tabela oficial deste documento.

---

# 68. TESTE DE PRIVACIDADE

```text
Grok retention == 30
Luna retention == 30
```

Muse:

```text
trainingUsed == true
zdr == false
```

---

# 69. TESTE DE IDs

Todos IDs para configuração OpenCode Go devem resultar em:

```text
opencode-go/<model-id>
```

---

# 70. REMOVER TODOS OS NÚMEROS ANTIGOS GO

Pesquisar no projeto por:

```text
OPENCODE_GO_CATALOG
29 IDS
15000
3200
6400
1200
3600
20000
35000
quotaMultiplier
xai/grok-4.6
openai/gpt-5.6-luna
ZDR garantido para todos
24+ modelos
```

Revisar cada ocorrência.

---

# 71. NÃO DUPLICAR NOVAMENTE

Estrutura final:

```text
OPENCODE_GO_DATA
        │
        ├── Planos
        ├── Availability
        ├── Model dossier
        ├── Router
        ├── Quota simulator
        ├── Privacy
        └── Budget recommender
```

Nenhuma dessas telas deve manter outra cópia manual dos números.

---

# 72. DATA QUALITY

Registrar:

```text
sourceType = official
publisher = OpenCode
verifiedAt = 2026-09-03
documentationUpdatedAt = 2026-09-02
```

Request counts:

```text
estimate = true
```

Pricing/usage class:

```text
official = true
```

Burn factor:

```text
derived = true
```

---

# 73. REGRA FINAL SOBRE O GO

A frase principal da UI deve ser semelhante a:

> OpenCode Go custa US$10/mês e oferece até US$60 de valor de uso, mas esse multiplicador de 6× não vale igualmente para todos os modelos. Modelos da classe US$60 consomem quota a 1×; modelos US$30 consomem aproximadamente 2× mais rápido; e modelos US$15 consomem aproximadamente 4× mais rápido. Consulte a classe de uso antes de escolher o modelo.

Essa informação deve ser visível sem exigir abrir tooltip ou documentação externa.
