# REFATORAÇÃO DO CATÁLOGO DE PLANOS — EXPLORADOR DE ASSINATURAS, MODELOS E ORÇAMENTO

Você está trabalhando no projeto:

`wesleytakatsu/comparacao-modelos`

Execute esta tarefa **somente depois de concluir e validar as correções atuais de dados, planos, quotas e plataformas**.

A base corrigida deve ser considerada a fonte de verdade.

Sua missão agora é **reorganizar completamente a experiência da área de Planos**, sem alterar arbitrariamente os dados já auditados.

O objetivo é transformar a atual lista de planos em um **Explorador de Assinaturas e Acesso a Modelos**.

---

# 1. OBJETIVO DE UX

A área de planos deve responder rapidamente perguntas como:

> Quais planos a OpenAI possui?

> Quais planos custam até R$100?

> Onde consigo usar Claude Fable 5.1?

> Fable está incluído ou pago por fora?

> Qual plano me dá GPT + Claude + Gemini?

> Tenho R$200/mês. Qual combinação de assinaturas faz mais sentido?

> Qual plano é melhor para coding?

> Qual tem mais quota?

> Qual inclui API?

> Qual aceita BYOK?

> Qual possui melhor privacidade?

> Qual plano oferece mais modelos pelo menor custo?

> Quais serviços oferecem Gemini 3.8 Flash?

A página não deve mais parecer uma grande lista desordenada de cards.

---

# 2. PRINCÍPIO CENTRAL

Separar claramente duas perguntas:

## A. PLANOS

> “O que eu recebo se assinar este produto?”

## B. ACESSO A MODELOS

> “Onde consigo usar este modelo, em qual plano e como ele é cobrado?”

Essas duas visões devem compartilhar os mesmos dados, mas possuir interfaces diferentes.

---

# 3. NOVA ESTRUTURA PRINCIPAL

Transformar a atual seção `#plans` em um explorador com abas principais:

```text
Planos
Modelos
Orçamento
Comparar
Favoritos
```

Opcionalmente:

```text
Histórico
```

se já houver infraestrutura suficiente.

---

# 4. ABA PADRÃO: “PLANOS”

Esta deve ser a visualização inicial.

Organizar planos por EMPRESA.

Exemplo:

```text
OpenAI
  ChatGPT Free
  ChatGPT Go
  ChatGPT Plus
  ChatGPT Pro 5x
  ChatGPT Pro 20x
  ChatGPT Business Standard
  ChatGPT Business Premium
  Enterprise

Anthropic
  Claude Free
  Claude Pro
  Claude Max 5x
  Claude Max 20x
  Team Standard
  Team Premium
  Enterprise

Google
  Google AI Free
  Google AI Plus
  Google AI Pro
  Google AI Ultra 5x
  Google AI Ultra 20x

Cursor
...

OpenCode
...

Z.ai
...

Kimi
...

xAI
...

camelAI
...
```

---

# 5. EMPRESAS EM SEÇÕES EXPANSÍVEIS

Cada empresa deve possuir uma seção/categoria expansível.

Header exemplo:

```text
🟢 OpenAI
7 planos
US$0 → US$200/mês
```

Ao expandir:

cards dos planos.

Guardar estado expandido/recolhido durante a sessão.

---

# 6. ORDEM DAS EMPRESAS

Default recomendado:

```text
OpenAI
Anthropic
Google
Cursor
OpenCode
Z.ai
xAI
Kimi
camelAI
Outros
```

Permitir ordenar também por:

```text
Nome
Menor preço
Maior número de planos
Coding-focused
```

---

# 7. CARD FECHADO DEVE SER SIMPLES

Não colocar todos os detalhes no card inicial.

Cada card deve exibir aproximadamente:

```text
Claude Pro

US$20/mês
≈ R$...

Individual

Melhor para:
Coding diário + Claude Code

Modelos:
Sonnet / Opus / Fable*

Quota:
Plano com franquia + créditos

[Fable pago à parte]

[Comparar] [Detalhes] [☆]
```

No máximo 5–7 informações visuais principais.

---

# 8. DETALHES EXPANDIDOS

Ao clicar em “Detalhes”, abrir drawer, modal grande ou expansão inline com seções:

```text
Resumo
Modelos
Quota e cobrança
Ferramentas
Plataformas
Storage
Privacidade
Limitações
Histórico
Fontes
```

---

# 9. BADGES UNIVERSAIS

Criar um sistema visual consistente.

## Acesso ao modelo

```text
✅ Incluído
💳 Créditos extras
🧮 Cobrado por uso
🔄 Pool compartilhado
🌐 API separada
🔑 BYOK
❌ Indisponível
❓ Não confirmado
```

## Plano

```text
🆓 Free
👤 Individual
👥 Team
🏢 Enterprise
💻 Coding
🤖 Agentic
```

## Dados

```text
O Oficial
T Independente
E Estimado
```

## Privacidade

```text
🔒 No-training
🛡️ ZDR
⚠ Retenção
```

Não mostrar ZDR se a base não confirmar ZDR contratual.

---

# 10. FILTROS LATERAIS

Desktop:

sidebar lateral de filtros.

Mobile:

botão “Filtros” abrindo sheet/modal.

Filtros principais:

```text
Empresa
Preço
Tipo de plano
Modelos
Plataforma/surface
Uso
Billing
API
BYOK
Storage
Privacidade
```

---

# 11. FILTRO POR EMPRESA

Multi-select:

```text
OpenAI
Anthropic
Google
Cursor
OpenCode
Z.ai
Kimi
xAI
camelAI
...
```

---

# 12. FILTRO DE PREÇO

Permitir:

```text
Grátis
Até US$10
US$11–25
US$26–60
US$61–100
US$101–200
US$200+
Enterprise / custom
```

Também oferecer slider.

Modo moeda:

```text
USD
BRL
```

Quando houver preço brasileiro oficial:

usar preço localizado.

Quando não houver:

usar conversão FX com `≈`.

---

# 13. FILTRO POR PERFIL

```text
Individual
Student
Indie Dev
Professional Dev
Heavy Agentic
Team
Enterprise
Privacy-first
```

---

# 14. FILTRO POR TIPO DE USO

```text
Chat
Coding
Agent
CLI
IDE
API
App Builder
Research
Multimodal
Image/Video
Productivity
```

---

# 15. FILTRO POR BILLING MODE

Permitir filtrar:

```text
Incluído na assinatura
Credits
Usage-based
Pay-as-you-go
Flat-rate
BYOK
API separada
Pool compartilhado
```

---

# 16. FILTRO DE RECURSOS

```text
Claude Code
Codex
Antigravity
Cursor Agent
OpenCode
camelCode
BYOK
API
Cloud Agents
Storage
Family Sharing
SSO
RBAC
```

Gerar a lista dinamicamente dos dados.

---

# 17. BUSCA

Adicionar busca no catálogo de planos.

Deve localizar:

```text
plano
empresa
modelo
feature
surface
```

Exemplo:

digitar:

```text
Fable
```

deve encontrar planos que:

```text
incluem Fable
permitem Fable via créditos
ou oferecem Fable em alguma surface
```

---

# 18. ABA “MODELOS”

Essa aba deve inverter a navegação.

Em vez de:

```text
Plano → modelos
```

mostrar:

```text
Modelo → onde posso usar
```

---

# 19. SELETOR DE MODELO

Dropdown/search:

```text
GPT-5.6 Sol
GPT-5.6 Terra
GPT-5.6 Luna
Claude Fable 5.1
Claude Opus 5
Gemini 3.8 Flash
Grok 4.6
GLM-5.3
...
```

---

# 20. RESULTADO DA ABA MODELO

Exemplo:

## Claude Fable 5.1

Tabela:

| Plataforma    | Plano   | Disponível | Incluído  | Cobrança        |
| ------------- | ------- | ---------- | --------- | --------------- |
| Claude        | Pro     | ✅          | ❌         | Usage credits   |
| Claude        | Max 5x  | ✅          | ✅ parcial | até 50% semanal |
| Claude        | Max 20x | ✅          | ✅ parcial | até 50% semanal |
| Cursor        | Pro     | ✅          | via pool  | Other Models    |
| Anthropic API | API     | ✅          | —         | $10/$50         |
| ...           | ...     | ...        | ...       | ...             |

Depois:

```text
Melhor acesso barato
Melhor acesso incluído
Melhor para uso pesado
API direta
```

---

# 21. NÃO INFERIR “INCLUÍDO”

Usar sempre os campos estruturados de entitlement.

Nunca:

```js
if (plan.includes(model))
```

se isso não diferencia billing.

A UI deve consultar:

```text
available
included
billingMode
quotaPool
surface
```

---

# 22. MOSTRAR SURFACE

Exemplo GPT-5.6 Terra:

```text
ChatGPT normal:
não selecionável

ChatGPT Work:
sim

Codex:
sim

OpenAI API:
sim
```

Isso deve aparecer na aba Modelo.

---

# 23. ABA “ORÇAMENTO”

Criar modo de descoberta por orçamento mensal.

Título:

```text
Quanto você quer gastar?
```

---

# 24. SELETOR DE MOEDA

```text
R$
US$
```

Default:

```text
BRL
```

para locale pt-BR.

---

# 25. SLIDER DE ORÇAMENTO

Faixa sugerida:

```text
R$0 → R$2.000+
```

Presets:

```text
R$0
R$50
R$100
R$150
R$200
R$300
R$500
R$1.000
R$2.000+
```

---

# 26. PERFIL DO USUÁRIO

Perguntar opcionalmente:

```text
Coding
Research
Games
Frontend
Backend
Agentic
Multimodal
General
```

---

# 27. RESULTADOS DE ORÇAMENTO

Separar:

## Planos individuais

```text
Dentro do orçamento
```

## Combinações

```text
Stacks de 2 ou 3 assinaturas
```

---

# 28. EXEMPLO

Orçamento:

```text
R$160
```

Pode retornar:

```text
Cursor Pro
+
OpenCode Go
```

com:

```text
Custo fixo:
R$...

Cobertura:
Cursor
Grok
Composer
OpenCode catalog

Custo variável:
quando aplicável
```

---

# 29. NÃO ESCONDER CUSTO VARIÁVEL

Se o stack inclui:

```text
Fable via credits
Other Models metered
API
```

mostrar:

```text
Custo fixo:
R$ X

+ custo variável
```

Nunca somar apenas assinaturas e dizer:

```text
“custo total”
```

---

# 30. CARD DE STACK

Exemplo:

```text
Cursor Pro + OpenCode Go

≈ R$154/mês

Cobertura:
Coding ★★★★★
Modelos ★★★★☆
Volume ★★★★★

Inclui:
Cursor Agent
OpenCode Go
Grok / Composer / GLM / Kimi etc.

Possíveis extras:
Other Models metered
```

---

# 31. SCORE DOS STACKS

Não usar uma média arbitrária única.

Mostrar dimensões:

```text
Model Coverage
Coding
Agentic
Quota
Cost Efficiency
Multimodal
Privacy
```

Pode haver ranking geral opcional, mas com breakdown.

---

# 32. ABA “COMPARAR”

Permitir selecionar:

```text
2–5 planos
```

Cards devem ter botão:

```text
+ Comparar
```

---

# 33. COMPARADOR DE PLANOS

Criar tabela com linhas:

```text
Preço mensal
Preço BRL
Preço anual
Tipo
Usuários
Modelos
Surfaces
Quota
Credits
Storage
API
BYOK
Overage
Privacidade
Family sharing
SSO
Melhor para
Limitações
```

---

# 34. DESTACAR DIFERENÇAS

Adicionar toggle:

```text
Mostrar apenas diferenças
```

Muito útil quando comparar:

```text
Claude Max 5x
vs
Claude Max 20x
```

---

# 35. COMPARAÇÃO INTELIGENTE

Criar linha automática:

```text
Principal diferença
```

Exemplo:

```text
Max 20x oferece maior franquia,
mas não muda o conjunto principal de modelos.
```

Gerar a partir dos dados, não por LLM.

---

# 36. ABA FAVORITOS

Usar:

```text
localStorage
```

Permitir favoritar:

```text
planos
modelos
stacks
```

Sem backend.

---

# 37. SHORTLIST

Criar:

```text
Minha shortlist
```

Exemplo:

```text
Claude Pro
Cursor Pro
Google AI Pro
OpenCode Go
```

Permitir:

```text
Comparar favoritos
```

---

# 38. ORDENAÇÃO

Na aba Planos:

```text
Empresa
Menor preço
Maior preço
Melhor coding
Maior cobertura de modelos
Melhor quota
Melhor custo-benefício
```

---

# 39. “MELHOR CUSTO-BENEFÍCIO”

Não hardcode.

Criar score calculado.

Sugestão:

```text
30% acesso/model coverage
25% quota
20% coding utility
15% features
10% price
```

Mas:

* deixar fórmula documentada;
* marcar como `E — calibrated`;
* não tratar como benchmark.

---

# 40. NÃO COMPARAR ENTERPRISE COM INDIVIDUAL

Separar rankings:

```text
Individual
Team
Enterprise
```

Enterprise/contact-sales não participa automaticamente de ranking de preço.

---

# 41. AGRUPAR POR FAIXA DE PREÇO

Adicionar opção de visualização:

```text
Agrupar por:
Empresa
Preço
Tipo
```

Quando escolher preço:

```text
Grátis

Até US$10

US$11–25

US$26–60

US$61–100

US$101–200

US$200+

Enterprise
```

---

# 42. AGRUPAR POR TIPO

```text
Consumer
Coding
Team
Enterprise
API/Inference
App Builder
```

Exemplo:

camelStream:

```text
API/Inference
```

camelCode:

```text
Coding/App Builder
```

---

# 43. PLANOS NÃO DEVEM SER “PLANOS DE MODELO”

Não nomear automaticamente:

```text
Claude Fable Plan
Gemini 3.8 Plan
GPT-5.6 Plan
```

A entidade é:

```text
produto/plano
```

que oferece acesso a modelos.

---

# 44. CAMELAI DEVE FICAR BEM DIFERENCIADO

## camelCode

cards:

```text
Free
Starter
Pro
Team
Enterprise
```

## camelStream

não colocar dentro da mesma sequência como se fosse tier do camelCode.

Criar subseção:

```text
Inference API
```

---

# 45. CAMELSTREAM CARD

Mostrar:

```text
US$5/stream/mês

Unlimited tokens
1 geração concorrente garantida por stream
Model routing: auto
260K+ context
Vision
```

warning:

```text
⚠ Standard permite retenção/training
```

---

# 46. OPENCODE GO CARD

O card do Go deve mostrar imediatamente:

```text
US$10/mês

Até:
US$60 nominal/mês

Mas:
1× / 2× / 4× quota burn conforme modelo
```

Botão:

```text
Ver tabela de consumo
```

---

# 47. OPENCODE GO — MINI RESUMO VISUAL

```text
🟢 US$60 models → 1× burn

🟡 US$30 models → 2× burn

🔴 US$15 models → 4× burn
```

Isso precisa aparecer no card expandido.

---

# 48. CLAUDE PRO CARD

Fable deve aparecer assim:

```text
Fable 5.1
💳 Créditos extras
```

e não:

```text
✅ Incluído
```

---

# 49. GOOGLE PRO CARD

Mostrar:

```text
R$96,99
5 TB
4× Free
1.000 Flow credits
```

para Brasil.

Não esconder storage dentro de texto longo.

---

# 50. PREÇOS LOCALIZADOS

Função de display:

```js
getDisplayPrice(plan, locale)
```

Regras:

1. se existir `localizedPricing.BRL.official`:
   usar oficial;
2. senão:
   converter USD/CNY;
3. prefixar conversão com `≈`.

---

# 51. MOEDA NATIVA

Mostrar opcionalmente:

```text
Kimi Allegretto

¥199/mês
≈ R$...
≈ US$...
```

Não esconder CNY.

---

# 52. ANUAL

Quando houver:

```text
Mensal
Anual
```

Toggle global.

Mostrar:

```text
US$20/mês
ou
US$200/ano (~US$16,67/mês)
```

Não inventar preço anual quando não houver.

---

# 53. CUSTO POR USUÁRIO

Para Team:

```text
US$40 / usuário / mês
```

Se minimum seats existir:

mostrar:

```text
mínimo 3 usuários
mínimo total: US$120/mês
```

---

# 54. ENTERPRISE

Mostrar:

```text
Preço personalizado
```

Não converter para:

```text
US$0
```

Nem incluir em ordenação “mais barato”.

---

# 55. TOOLTIP “TIPO DE COBRANÇA”

Explicar:

```text
Included
Usage credits
Provider metered
Flat-rate
BYOK
Pay-as-you-go
```

---

# 56. TOOLTIP “QUOTA”

Exemplo:

```text
Quota não é necessariamente número de prompts.

Pode depender de:
tokens
tool calls
complexidade
modelo
janela
pool
```

---

# 57. INDICADOR DE FRESHNESS

Cada plano deve exibir discretamente:

```text
Verificado em:
03/09/2026
```

Se >14 dias:

```text
⚠ preço precisa ser revalidado
```

---

# 58. DATA QUALITY

Mostrar badge:

```text
Oficial
Parcial
Estimado
```

Para pricing, idealmente somente:

```text
Oficial
Não confirmado
```

---

# 59. FONTES

Detalhes do plano devem possuir:

```text
Fontes
```

com links agrupados:

```text
Pricing
Quota
Models
Privacy
```

Não apenas uma lista geral.

---

# 60. FAVOR NÃO DUPLICAR DADOS

A UI deve derivar tudo de:

```text
SUBSCRIPTION_PLANS_DATA
PLAN_MODEL_ACCESS_DATA
PLATFORM_MODEL_CATALOG
FX_RATES_DATA
PRIVACY profiles
```

Não criar:

```text
PLAN_CARDS_DATA
```

com cópia das mesmas informações.

---

# 61. URL / STATE

Permitir query/hash state.

Exemplo:

```text
#plans?company=anthropic
```

ou mecanismo equivalente simples.

Também:

```text
#plans/model/claude-fable-5-1
```

se compatível com router atual.

---

# 62. DEEP LINK PARA EMPRESA

Exemplo:

```text
#plans/company/google
```

ou equivalente.

---

# 63. DEEP LINK PARA COMPARAÇÃO

Idealmente:

```text
#plans/compare?ids=cursor-pro,opencode-go
```

Se complexo demais, manter apenas localStorage/state.

---

# 64. RESPONSIVE

Desktop:

```text
sidebar de filtros
grid de 2–4 cards
```

Tablet:

```text
2 cards
```

Mobile:

```text
1 card
filtros em bottom sheet/modal
```

---

# 65. EVITAR TABELA GIGANTE NO MOBILE

Comparador:

usar:

```text
horizontal scroll
```

ou cards empilhados.

Manter primeira coluna sticky no desktop quando possível.

---

# 66. ACESSIBILIDADE

Garantir:

```text
keyboard navigation
aria-expanded
aria-label
focus visible
contraste
```

Badges não devem depender apenas de cor.

---

# 67. PERFORMANCE

Não renderizar todos os detalhes de todos os planos inicialmente.

Cards leves.

Detalhes montados somente ao expandir.

---

# 68. NÃO INTRODUZIR FRAMEWORK

Preservar:

```text
Vanilla JS
GitHub Pages
zero backend
```

Não migrar para React/Vue.

---

# 69. COMPONENTIZAÇÃO EM VANILLA JS

Criar funções como:

```text
renderPlanExplorer()
renderCompanyGroup()
renderPlanCard()
renderPlanDetails()
renderPlanFilters()
renderModelAccessExplorer()
renderBudgetExplorer()
renderPlanComparison()
renderFavorites()
```

---

# 70. HELPERS

Criar:

```text
getPlansByCompany()
getPlansByPriceRange()
getPlansForModel()
getModelAccessForPlan()
getPlanFixedCost()
getPlanVariableBilling()
getLocalizedPrice()
getPlanFeatures()
getPlanSurfaces()
```

---

# 71. NÃO USAR STRINGS COMO FONTE DE LÓGICA

Errado:

```js
plan.quotaDescription.includes('Fable')
```

Correto:

```js
PLAN_MODEL_ACCESS_DATA
```

---

# 72. BUDGET ALGORITHM

Gerar stacks de:

```text
1 plano
2 planos
3 planos
```

Evitar explosão combinatória.

Eliminar stack se:

```text
fixedCost > budget
```

---

# 73. DEDUPLICAÇÃO DE STACK

Evitar recomendar:

```text
Google AI Pro + Google AI Plus
```

se um é estritamente superior e não há motivo válido para assinar ambos.

Criar `mutuallyExclusivePlans` ou `planFamily`.

---

# 74. PLAN FAMILY

Exemplo:

```text
google-ai-consumer
```

Planos:

```text
Free
Plus
Pro
Ultra5
Ultra20
```

Usuário normalmente escolhe um.

Mesmo para:

```text
Claude individual
Cursor individual
ChatGPT individual
```

---

# 75. COMPLEMENTARY PRODUCTS

Alguns podem coexistir:

```text
Cursor Pro
+
OpenCode Go
```

Logo não marcar como mutuamente exclusivos.

---

# 76. MODEL COVERAGE SCORE

Calcular:

```text
número de famílias/modelos relevantes acessíveis
```

Mas ponderar:

```text
incluído > pago por créditos > BYOK-only
```

Exemplo de pesos:

```text
included = 1.0
shared quota = 0.9
usage credits = 0.5
BYOK = 0.3
unavailable = 0
```

Marcar score como estimado.

---

# 77. CODING VALUE

Pode usar:

```text
coding surfaces
agent support
model quality
quota
price
```

Não usar só número de modelos.

---

# 78. QUOTA VALUE

Para planos como OpenCode:

usar mecanismo real.

Para opaque/work-based:

não inventar.

Mostrar:

```text
qualitative
```

---

# 79. FILTRO “SEM CUSTO VARIÁVEL”

Adicionar.

Retorna planos onde o uso principal não exige:

```text
usage credits
provider metered
API
```

Útil para usuário que quer custo previsível.

---

# 80. FILTRO “BYOK”

Mostrar:

```text
CamelAI
OpenCode quando aplicável
outros produtos
```

---

# 81. FILTRO “API INCLUÍDA”

Ser muito preciso.

Diferenciar:

```text
provider-specific platform credential
```

de:

```text
general developer API credits
```

---

# 82. FILTRO “STORAGE”

Faixas:

```text
Nenhum
<100 GB
100–500 GB
1 TB+
5 TB+
20 TB+
```

---

# 83. FILTRO PRIVACIDADE

```text
No-training by default
Opt-out available
ZDR contractual
Standard consumer policy
Retention warning
```

---

# 84. PRIVACIDADE NO CARD

Mostrar somente um resumo:

```text
Privacy:
No-training by default
```

ou:

```text
Consumer / opt-out
```

ou:

```text
⚠ Training possible
```

Detalhes ficam no painel expandido.

---

# 85. HISTÓRICO DO PLANO

Se `PRICE_HISTORY_DATA` estiver disponível:

mostrar mini timeline:

```text
Jul/26 — preço X
Sep/26 — novo tier
```

Também eventos:

```text
storage upgrade
quota change
model added
model removed
```

---

# 86. NÃO BLOQUEAR ESTA REFATORAÇÃO POR HISTÓRICO INCOMPLETO

Se faltarem eventos:

mostrar apenas os existentes.

---

# 87. FEATURE “QUAL PLANO É MELHOR PARA MIM?”

Adicionar wizard opcional simples.

Perguntas:

```text
Quanto quer gastar?
Individual ou equipe?
Principal uso?
Quais modelos deseja?
Custo previsível é importante?
Precisa de API?
```

Resultado:

3 sugestões.

---

# 88. NÃO USAR LLM PARA O WIZARD

Regra determinística com scores.

---

# 89. EXPLICAÇÃO DA RECOMENDAÇÃO

Sempre mostrar:

```text
Por que recomendamos:
```

Exemplo:

```text
✓ dentro do orçamento
✓ inclui Cursor Agent
✓ alto volume coding
✓ complementa OpenCode Go
```

---

# 90. EMPTY STATES

Exemplo:

```text
Nenhum plano atende todos os filtros.

Tente:
- aumentar orçamento;
- permitir BYOK;
- permitir custo variável.
```

---

# 91. CONTADORES DINÂMICOS

Header:

```text
X empresas
Y planos atuais
Z modelos acessíveis
```

Derivar dos dados.

Não hardcode.

---

# 92. REMOVER A LISTA VISUAL ANTIGA

Depois da nova implementação:

não deixar a lista antiga abaixo da nova página.

Evitar duas interfaces concorrentes.

---

# 93. MANTER LINKS EXISTENTES

Se rota antiga apontava para:

```text
#plans
```

continuar funcionando.

---

# 94. TESTES DE DADOS

Adicionar validações:

```text
todo plano possui provider
todo plano possui planFamily
todo modelo em modelAccess existe ou é platformSku
todo billingMode é válido
todo preço possui moeda
```

---

# 95. TESTES DE UI / HELPERS

Testar:

```text
filtro por empresa
filtro por preço
busca por modelo
comparação
favoritos
budget
localized price
```

---

# 96. TESTE FABLE

Consulta:

```text
Claude Fable 5.1
```

deve retornar Claude Pro como:

```text
Disponível
Não incluído
Usage credits
```

---

# 97. TESTE GOOGLE PRO

Card deve mostrar:

```text
R$96,99
5 TB
```

---

# 98. TESTE OPENCODE GO

Card deve mostrar:

```text
US$10
burn 1×/2×/4×
```

---

# 99. TESTE CAMELSTREAM

Card deve mostrar:

```text
US$5/stream
Unlimited tokens
1 concurrent generation/stream
⚠ training possible
```

---

# 100. TESTE ENTERPRISE

Enterprise com:

```text
monthlyPriceUsd = null
```

deve mostrar:

```text
Fale com vendas
```

e nunca:

```text
US$0
```

---

# 101. TESTE CNY

Kimi deve mostrar:

```text
¥ preço
≈ R$
```

---

# 102. README

Atualizar screenshot/descrição textual da área Planos.

Explicar:

```text
agrupamento por empresa
busca por modelo
budget planner
comparação
favoritos
```

---

# 103. NÃO ALTERAR DADOS TÉCNICOS DE MODELOS

Esta tarefa é de:

```text
UX
arquitetura da área de planos
organização
comparação
```

Não recalibrar benchmarks, radar ou community scores sem necessidade.

---

# 104. DESIGN VISUAL

Preservar identidade visual atual.

Evitar excesso de:

```text
gradients
animações
glassmorphism
```

Priorizar densidade informacional controlada.

---

# 105. CARD VISUAL IDEAL

Estrutura:

```text
┌─────────────────────────────────────┐
│ Claude Pro                    👤    │
│ US$20/mês    ≈ R$...                │
│                                     │
│ Coding diário + Claude Code         │
│                                     │
│ Sonnet ✅   Opus ✅   Fable 💳       │
│                                     │
│ Franquia + usage credits            │
│                                     │
│ [Detalhes] [+ Comparar] [☆]         │
└─────────────────────────────────────┘
```

---

# 106. HEADER DA PÁGINA

Exemplo:

```text
Planos & Assinaturas

Compare preços, modelos, quotas e benefícios
entre os principais ecossistemas de IA.

[Buscar plano ou modelo...]

[USD | BRL]

Planos | Modelos | Orçamento | Comparar | Favoritos
```

---

# 107. FILTROS ATIVOS

Mostrar chips:

```text
Google ×
Até R$200 ×
Coding ×
```

Botão:

```text
Limpar filtros
```

---

# 108. QUANTIDADE DE RESULTADOS

```text
12 planos encontrados
```

---

# 109. “MAIS BARATO PARA ESTE MODELO”

Na aba Modelo:

calcular.

Exemplo:

```text
Acesso mais barato a Gemini X:
...
```

Mas considerar:

```text
modelo incluído?
custo variável?
```

Não comparar simplesmente preço mensal.

---

# 110. CATEGORIAS DE ACESSO

Na aba modelo, ordenar:

```text
Incluído
Incluído com limite
Pago por créditos
Provider-metered
BYOK
API
```

---

# 111. CUSTO PREVISÍVEL

Adicionar badge:

```text
💵 Custo previsível
```

para flat-rate/included cases.

E:

```text
📈 Custo variável
```

para metered/credits.

---

# 112. PLANOS GRATUITOS

Agrupar claramente:

```text
Free
```

Mas diferenciar:

```text
free subscription
free API tier
free model access
```

---

# 113. NÃO COMPARAR STORAGE COMO IA

Storage deve ser benefício separado.

Não aumentar artificialmente:

```text
AI Value
```

apenas porque plano tem 30 TB.

Pode existir score:

```text
Bundle Value
```

se desejar.

---

# 114. SCORES

Se criar scores:

```text
AI Access
Coding
Quota
Bundle
Privacy
```

Evitar um único “98/100”.

---

# 115. MODELO DE DADOS NÃO DEVE DEPENDER DA UI

Não adicionar campos como:

```text
cardSubtitle
badgeColor
```

na base factual se puderem ser derivados.

---

# 116. CONFIG DE UI SEPARADA

Se necessário:

```js
PLAN_UI_CONFIG
```

para:

```text
icons
order
category labels
```

separado dos fatos.

---

# 117. MIGRAÇÃO

Fazer migração incremental.

Não quebrar:

```text
Simulador
ROI
Router
Availability
```

que dependem de dados de planos.

Se modificar schema:

criar helpers de compatibilidade temporários.

---

# 118. DEPRECATION

Marcar `includedModels` antigo como deprecated.

Não remover imediatamente se outros módulos ainda dependem.

Criar:

```js
getLegacyIncludedModels(plan)
```

derivado do novo schema durante transição.

Depois remover dependência.

---

# 119. UMA ÚNICA FONTE DE VERDADE

Resultado final:

```text
SUBSCRIPTION_PLANS_DATA
        +
PLAN_MODEL_ACCESS_DATA
        +
PLATFORM_MODEL_CATALOG
        +
FX_RATES_DATA
        +
PRIVACY DATA
        ↓
todos os cards, filtros, comparações e recomendações
```

---

# 120. ENTREGA FINAL

Ao terminar, informar:

## Arquitetura

```text
datasets alterados
helpers criados
componentes criados
rotas/abas criadas
```

## UX

```text
agrupamento por empresa
filtros
busca
modo modelo
modo orçamento
comparador
favoritos
```

## Compatibilidade

```text
módulos antigos preservados
migrations/helpers usados
```

## Testes

```text
comandos executados
cenários testados
```

---

# CRITÉRIO DE SUCESSO

A nova área deve permitir que alguém que não conhece a estrutura interna do mercado consiga responder em menos de 30 segundos:

```text
Quanto custa?
```

```text
Qual empresa oferece?
```

```text
Quais modelos eu recebo?
```

```text
Estão realmente incluídos?
```

```text
Qual quota?
```

```text
Tem custo extra?
```

```text
Qual plano cabe no meu orçamento?
```

```text
Qual combinação oferece mais cobertura?
```

```text
Onde consigo usar o modelo que quero?
```

A página deve parecer um **explorador de produtos**, não uma lista enorme de objetos técnicos.
