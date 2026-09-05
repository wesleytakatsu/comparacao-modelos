# PROMPT 11 — AUDITORIA E RECONSTRUÇÃO COMPLETA DE HISTÓRICO, LINHAGENS E TIMELINE

> Snapshot de pesquisa: **05/09/2026 — BRT**  
> Página alvo: `https://wesleytakatsu.github.io/comparacao-modelos/#history`  
> Repositório: `https://github.com/wesleytakatsu/comparacao-modelos`  
> Branch alvo: `main`  
> Objetivo: **corrigir fatos históricos, completar linhagens, separar relações comprovadas de inferências, melhorar o histórico de benchmarks e transformar a rota `#history` em uma cronologia auditável do ecossistema de modelos de IA.**

---

# 0. PAPEL DO AGENTE

Você é um **engenheiro de software sênior, pesquisador de história de modelos de IA, engenheiro de dados temporais, especialista em proveniência e UX para sistemas densos em evidências**.

Sua tarefa não é simplesmente editar textos da página.

Você deve:

1. auditar o estado real do `main`;
2. pesquisar novamente todas as datas e relações relevantes;
3. corrigir o dataset histórico;
4. corrigir metadados de fontes quando estiverem errados;
5. melhorar a semântica de linhagem;
6. completar famílias ausentes;
7. corrigir o histórico de benchmarks;
8. melhorar a UI de `#history` sem refazer a navegação global;
9. adicionar testes para impedir reincidência dos erros;
10. preservar a arquitetura Domain v2 já existente.

O portal já possui:

- `DomainRankings`;
- `DomainEvidence`;
- `DomainFreshness`;
- `DomainEntities`;
- `DomainRegistry`;
- `DomainClaims`;
- `DomainComparison`;
- `DomainHealth`;
- `DomainImpact`;
- dossiers de entidades;
- Data Health;
- benchmark registry;
- histórico temporal;
- CI.

**Não crie uma arquitetura paralela.**

Reutilize os sistemas existentes.

---

# 1. PROBLEMA CENTRAL DA PÁGINA ATUAL

A rota `#history` possui boas ideias, mas atualmente mistura conceitos diferentes:

- lançamento público;
- preview;
- GA;
- knowledge cutoff;
- snapshot;
- sucessor de geração;
- predecessor funcional;
- possível ancestral arquitetural;
- rename/identity reveal;
- benchmark update;
- mudança de preço;
- disponibilidade em plataforma;
- status editorial como “líder”.

Isso cria três problemas:

## 1.1 Datas semanticamente erradas

Uma data de knowledge cutoff pode acabar aparecendo como release date.

Uma data de preview pode aparecer como GA.

Uma data de publicação de uma fonte pode ser confundida com a data do evento.

## 1.2 Setas sugerem ancestralidade onde ela não foi comprovada

A UI atual desenha os nós sequencialmente em uma trilha com setas.

Visualmente isso comunica:

> A gerou B, que gerou C.

Em vários casos a evidência pública permite apenas afirmar:

> B substituiu A no mesmo papel de produto.

ou:

> B pertence à geração seguinte.

Essas relações não são equivalentes.

## 1.3 Notas históricas contêm fatos voláteis

Exemplos ruins para uma árvore genealógica:

- “Atual líder absoluto”;
- “#1 no benchmark X”;
- preço atual;
- throughput atual;
- ranking que muda com novo leaderboard.

A árvore deve conter fatos historicamente estáveis.

Benchmarks, preços e rankings devem aparecer em timeline/history datasets apropriados.

---

# 2. PRIMEIRA ETAPA OBRIGATÓRIA — AUDITAR O ESTADO REAL

Antes de alterar qualquer coisa, leia no mínimo:

- `data/history.js`;
- `data.js`;
- `data/domain.js`;
- `data/dossiers.js`;
- `data/pricing-history.js`;
- `data/platforms.js`;
- `data/plans.js`;
- `app.js`;
- `index.html`;
- `style.css`;
- `scripts/audit-data.js`;
- `docs/prompts/09-prompt-layout.md`;
- `docs/prompts/10-prompt-gpt-6-astra.md`;
- metodologia relevante.

Também abra a página publicada:

`#history`

e confira:

- árvores;
- timeline;
- filtros;
- histórico de benchmarks;
- responsividade;
- deep links;
- estados vazios;
- tooltips;
- fontes;
- badges.

O código atual ganha de documentos antigos.

---

# 3. REGRA DE PESQUISA

Para cada data histórica importante, siga esta ordem:

1. anúncio/model card oficial do provedor;
2. changelog oficial da API;
3. documentação oficial de lifecycle;
4. system card oficial;
5. benchmark independente original;
6. fonte secundária somente como apoio.

Não use snippet de busca como fonte final se a página original puder ser aberta.

Não transforme ausência de informação em certeza.

Quando houver conflito:

```text
status = disputed | needs-review
```

ou estrutura equivalente.

Registre as duas evidências.

---

# 4. SEMÂNTICA TEMPORAL NOVA

Não use um único `releaseDate` para representar tudo.

Quando os dados existirem, suportar campos equivalentes a:

```js
{
  announcedAt: null,
  previewAt: null,
  releasedAt: null,
  gaAt: null,
  availableFrom: null,
  deprecatedAt: null,
  retiredAt: null,
  knowledgeCutoff: null,
  sourcePublishedAt: null,
  verifiedAt: null
}
```

Nem todo modelo precisa de todos os campos.

### Regra

`knowledgeCutoff` nunca deve ser usado como `releasedAt` automaticamente.

---

# 5. TIMELINE EVENT COMO ENTIDADE TEMPORAL

Normalizar eventos para algo equivalente a:

```js
{
  id,
  date,
  eventType,

  entityType,
  entityId,

  title,
  description,

  sourceIds: [],
  provenanceType,
  evidenceType,

  confidence,
  status,

  publishedAt,
  verifiedAt,

  metadata: {}
}
```

`date` representa a data em que o evento aconteceu.

`publishedAt` representa a data da fonte.

As duas podem ser diferentes.

---

# 6. TAXONOMIA DE EVENTOS

Expandir os event types.

No mínimo:

```text
announcement
preview
release
ga
rollout
availability-expansion
suspension
redeployment
deprecation
retirement
pricing-change
quota-change
weights-released
license-change
snapshot-update
benchmark-update
benchmark-methodology-change
identity-reveal
rename
safety-policy-change
api-change
```

Preservar aliases antigos quando necessário.

---

# 7. RELAÇÕES DE LINHAGEM — NÃO USAR UMA ÚNICA SETA GENÉRICA

Criar tipos de relação claros.

Sugestão:

```text
architectural-successor
generation-successor
flagship-role-successor
product-tier-successor
explicit-predecessor
snapshot-update
rename
identity-reveal
parallel-branch
series-convergence
inferred-related
```

---

# 8. LINEAGE EDGE EVIDENCE

Cada edge deve ter estrutura equivalente a:

```js
{
  from,
  to,
  relationType,

  status: 'verified' | 'inferred' | 'disputed',
  confidence: 'high' | 'medium' | 'low',

  sourceIds: [],
  validFrom: null,
  notes: ''
}
```

Nenhuma relação arquitetural forte deve existir sem fonte.

---

# 9. REPRESENTAÇÃO VISUAL DOS EDGES

Na UI:

- linha/seta sólida = relação verificada;
- linha/seta tracejada = relação inferida;
- relação disputada = badge de alerta;
- hover/click = tipo da relação + fonte + explicação.

Adicionar legenda.

Exemplo:

```text
→ Sucessor geracional
⇢ Relação inferida
↔ Variante paralela
≡ Rename / identidade revelada
```

Não precisa usar exatamente esses símbolos.

---

# 10. STATUS DE MODELO ≠ RELAÇÃO

Remover `predecessor` como lifecycle status se estiver sendo usado dessa forma.

`predecessor` é uma relação.

Lifecycle deve continuar alinhado aos status canônicos do catálogo, como:

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

# 11. CORREÇÕES CONFIRMADAS — OPENAI GPT-5.6

## Erro atual

O histórico registra Sol/Terra/Luna com:

```text
2026-02-16
```

como lançamento.

Isso está incorreto.

Essa data corresponde ao knowledge cutoff usado em páginas dos modelos, não ao lançamento público da família.

## Datas verificadas

### Preview limitado

```text
2026-06-26
```

Fonte oficial:

`https://openai.com/index/previewing-gpt-5-6-sol/`

O texto anuncia preview limitado de:

- Sol;
- Terra;
- Luna.

### General Availability

```text
2026-07-09
```

Fonte oficial:

`https://openai.com/index/gpt-5-6/`

A OpenAI afirma explicitamente que está lançando a família em GA após o preview limitado.

### Estrutura correta sugerida

```js
GPT-5.6 Sol:
previewAt: '2026-06-26'
gaAt: '2026-07-09'
knowledgeCutoff: '2026-02-16'
```

Aplicar equivalente para Terra/Luna quando confirmado.

---

# 12. CORRIGIR METADADOS DA FONTE GPT-5.6

O `DATA_SOURCES` atual possui fonte `openai-gpt56-launch` com data incorreta em torno de agosto.

Corrigir para a fonte real de GA:

```text
2026-07-09
```

Não misturar o post de GA com updates posteriores.

Criar fontes separadas para updates quando necessário.

---

# 13. GPT-5.6 — EVENTOS IMPORTANTES AUSENTES

Adicionar, após revalidar:

## 26/06/2026

Preview limitado da família.

## 09/07/2026

GA de GPT-5.6.

## 30/07/2026

OpenAI reduz preços de:

- Luna em 80%;
- Terra em 20%.

A página oficial de GPT-5.6 possui changelog dessa atualização.

## 06/08/2026

Update de GPT-5.6 no ChatGPT, incluindo mudanças de comportamento/disponibilidade documentadas nas release notes.

## 13/08/2026

Preview do modo Ultrafast para Sol.

## 21/08/2026

Redução de preço API/credits do Sol superior a 20% pelo período anunciado.

Não colocar esses preços na árvore genealógica.

Colocar na timeline/pricing history.

---

# 14. OPENAI O-SERIES — CORRIGIR O3

O histórico atual registra OpenAI o3 como lançado em:

```text
2025-01-31
```

Isso não representa o lançamento público do modelo o3.

Fonte oficial:

`https://openai.com/index/introducing-o3-and-o4-mini/`

Public release:

```text
2025-04-16
```

Se houver evento de anúncio/preview anterior, representar separadamente.

Não chamar o evento anterior de GA.

---

# 15. OPENAI O1 — PREVIEW VS MODELO FINAL

O nó atual `openai-o1` usa data de setembro de 2024.

Auditar se o nó representa:

- `o1-preview`;
- ou `o1` final.

Se a data for de `o1-preview`, renomear corretamente o nó histórico.

Não usar nome “OpenAI o1” genérico para um evento que era especificamente preview.

Fonte recomendada:

`https://openai.com/index/introducing-openai-o1-preview/`

---

# 16. GPT-OSS — ERRO CRÍTICO DE DATA

O histórico atual registra:

```text
gpt-oss-20b: 2026-07-01
gpt-oss-120b: 2026-07-01
```

Isso está errado.

Fonte oficial:

`https://openai.com/index/introducing-gpt-oss/`

Data oficial:

```text
2025-08-05
```

Os dois modelos foram lançados juntos.

Licença:

```text
Apache 2.0
```

Corrigir também o evento `weights-released`.

---

# 17. OPENAI — NÃO TRATAR GPT-OSS COMO RAMO GERADO DO GPT-5.6

Pode permanecer sob um card amplo “OpenAI Models” se isso ajudar a UX.

Mas visualmente deve ficar como linhagem paralela/open-weight.

Não sugerir que:

```text
GPT-5.6 → gpt-oss
```

sem evidência.

---

# 18. GPT-6 ASTRA — RELAÇÃO COM GPT-5.6 SOL

A relação correta deve ser descrita com cautela.

Astra é:

- nova geração GPT-6;
- novo flagship da OpenAI;
- sucessor funcional/geracional do papel de flagship exercido por Sol.

A evidência pública **não permite afirmar** que Astra seja uma continuação arquitetural direta do checkpoint de Sol.

Portanto substituir algo genérico como:

```text
generational-upgrade
```

por relação mais explícita:

```text
flagship-role-successor
```

ou:

```text
generation-successor
```

com nota:

> Sucessão de geração e papel de flagship; ancestralidade arquitetural direta não divulgada.

Fonte:

`https://openai.com/index/gpt-6-astra/`

---

# 19. OPENAI — O-SERIES → GPT SERIES

OpenAI afirmou oficialmente em abril de 2025 que estava convergindo:

- reasoning especializado da o-series;
- capacidades conversacionais/tool use da GPT-series.

Fonte:

`https://openai.com/index/introducing-o3-and-o4-mini/`

Se quiser mostrar o3 como predecessor conceitual de gerações GPT posteriores, usar:

```text
relationType: series-convergence
```

Não usar `architectural-successor` sem fonte.

---

# 20. ANTHROPIC — CLAUDE FABLE 5

O histórico atual registra Fable 5 em maio de 2026.

Corrigir.

Fonte oficial:

`https://www.anthropic.com/news/claude-fable-5-mythos-5`

Data de lançamento:

```text
2026-06-09
```

---

# 21. FABLE 5 — SUSPENSÃO TEMPORÁRIA

Adicionar evento histórico importante:

```text
2026-06-12
```

Anthropic suspendeu o acesso a Claude Fable 5 e Mythos 5 após controles de exportação aplicados pelo governo dos EUA.

Esse evento é relevante para histórico de disponibilidade.

Tipo:

```text
suspension
```

Fonte oficial na própria página de lançamento e no post de redeployment.

---

# 22. FABLE 5 — REDEPLOYMENT

Fonte:

`https://www.anthropic.com/news/redeploying-fable-5`

Eventos:

```text
2026-06-30 — Anthropic anuncia retirada dos controles
2026-07-01 — acesso global restaurado
```

Representar o fato corretamente.

O `availableFrom` restaurado pode ser 01/07.

---

# 23. CLAUDE SONNET 5 — DATA ERRADA

O histórico atual usa:

```text
2026-06-20
```

Fonte oficial:

`https://www.anthropic.com/news/claude-sonnet-5`

Data correta:

```text
2026-06-30
```

Anthropic também afirma explicitamente que Sonnet 5 é melhoria sobre Sonnet 4.6.

Essa edge pode ser `verified`.

---

# 24. SONNET 5 — EVENTO DE PREÇO

O preço introdutório de Sonnet 5 possuía duração definida.

Revalidar no post oficial e criar evento de `pricing-change` quando o preço padrão entrou em vigor.

Não deixar preço histórico dentro da descrição permanente da linhagem.

---

# 25. CLAUDE OPUS 5 — DATA ERRADA

O histórico atual usa:

```text
2026-06-12
```

Fonte oficial:

`https://www.anthropic.com/news/claude-opus-5`

Data correta:

```text
2026-07-24
```

Anthropic afirma que Opus 5 substitui o papel do predecessor Opus 4.8.

Auditar a árvore porque atualmente ela pula de Opus 4.6 diretamente para Opus 5.

Se `Opus 4.8` estiver ausente do catálogo, pode existir como nó histórico.

---

# 26. CLAUDE FABLE 5.1

Release:

```text
2026-09-01
```

Usar fonte oficial específica de Fable 5.1.

Não citar a fonte Fable 5.1 para justificar releases de Sonnet 5 ou Opus 5.

Cada modelo deve ter sua própria fonte canônica.

---

# 27. ANTHROPIC — NÃO AFIRMAR QUATRO LINHAGENS “ESTRITAMENTE INDEPENDENTES”

A descrição atual diz que Fable, Opus, Sonnet e Haiku evoluem de forma “estritamente independente”.

Essa formulação é forte demais.

Fable é publicamente descrito como modelo `Mythos-class`.

Reescrever de forma factual:

> O portfólio Claude possui tiers/trilhas de produto com objetivos distintos; relações internas de treinamento entre todas as trilhas não são integralmente públicas.

---

# 28. GOOGLE — GEMINI 3.7 FLASH

O histórico atual registra:

```text
2026-03-10
```

Isso está errado.

Fonte oficial:

`https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/`

Data correta:

```text
2026-08-13
```

Google afirma que o 3.7 chegou três semanas após Gemini 3.6 Flash.

---

# 29. GOOGLE — GEMINI 3.6 FLASH ESTÁ AUSENTE

A fonte oficial do 3.7 declara explicitamente que ele veio três semanas após 3.6 Flash.

Adicionar 3.6 Flash à linhagem se a fonte oficial individual puder ser validada.

A trilha Flash não deve saltar uma geração relevante quando a própria Google a reconhece.

---

# 30. GOOGLE — GEMINI 3.8 FLASH

Fonte oficial:

`https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/`

Data:

```text
2026-09-02
```

Google afirma explicitamente:

- 3.8 constrói sobre o momentum do 3.7;
- foi o terceiro Flash em seis semanas;
- traz duas variantes: Flash e Flash Cyber.

A relação 3.7 → 3.8 pode ser `generation-successor` verificada.

---

# 31. GEMINI 3.8 FLASH CYBER

Não precisa virar modelo canônico do catálogo se o projeto não pretende catalogar acesso restrito.

Mas deve aparecer na timeline como:

```text
relatedRelease / restricted-variant
```

com:

- Fairwind Program;
- acesso a trusted defenders;
- mesma base de inteligência segundo Google;
- mitigação cyber diferente.

---

# 32. GOOGLE — GEMINI 3.1 PRO ESTÁ AUSENTE DA ÁRVORE

Esse é um erro importante porque o catálogo e o escopo do projeto já tratam Gemini 3.1 Pro.

Fonte oficial:

`https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/`

Data:

```text
2026-02-19
```

Status inicial:

```text
preview
```

Google o descreve como upgraded core intelligence e próxima iteração para tarefas complexas.

Adicionar à trilha Pro.

---

# 33. GOOGLE — GEMINI 3.5

Fonte oficial:

`https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/`

Data da família:

```text
2026-05-19
```

Importante:

A Google lançou **3.5 Flash** nesse dia e afirmou que estava trabalhando em **3.5 Pro**, com rollout esperado posteriormente.

Não assumir que “Gemini 3.5 Pro foi lançado em 19/05” somente porque a família foi anunciada.

Pesquisar a fonte específica de 3.5 Pro antes de atribuir release/GA.

---

# 34. GOOGLE — CORRIGIR SOURCE METADATA DE 3.7

O source registry atual possui data aproximada incorreta para o Gemini 3.7 Flash.

Corrigir `publishedAt` para a data oficial:

```text
2026-08-13
```

quando a fonte associada for o post oficial de lançamento.

---

# 35. XAI — GROK 4.5

O histórico atual registra:

```text
2026-04-10
```

Isso está errado.

Fonte oficial:

`https://x.ai/news/grok-4-5`

Data correta:

```text
2026-07-16
```

---

# 36. XAI — GROK 4.6

O histórico atual registra release em torno de 20/08.

Fonte oficial:

`https://x.ai/news/grok-4-6`

Data correta:

```text
2026-08-12
```

A xAI afirma explicitamente:

> Grok 4.6 builds on Grok 4.5.

Logo a relação:

```text
grok-4-5 → grok-4-6
```

pode ser verificada como `generation-successor`.

---

# 37. GROK 4.6 — AVAILABILITY EVENTS

A timeline pode registrar expansões relevantes, sem exagerar.

Fontes oficiais no newsroom xAI:

```text
2026-08-14 — GitHub Copilot
2026-08-19 — Amazon Bedrock
2026-08-21 — Gemini Enterprise Agent Platform
2026-08-26 — Microsoft Foundry
```

Tipo:

```text
availability-expansion
```

Não transformar cada integração trivial em evento principal; permitir filtro por plataforma.

---

# 38. GROK — REMOVER BENCHMARK VOLÁTIL DA DESCRIÇÃO FIXA

A árvore atual usa frases do tipo:

```text
88,6% Terminal-Bench 2.1
```

como descrição permanente do nó.

Mover métricas para benchmark history.

A linhagem deve dizer algo estável, como:

> foco em long-running agents, interactive/visual work e coding.

---

# 39. DEEPSEEK V3.2 — DATA ERRADA

O histórico atual registra:

```text
2025-08-15
```

Fonte oficial:

`https://api-docs.deepseek.com/updates`

Data correta:

```text
2025-12-01
```

O changelog afirma que `deepseek-chat` e `deepseek-reasoner` foram atualizados para V3.2.

---

# 40. DEEPSEEK V4 — PREVIEW DE ABRIL ESTÁ AUSENTE

Fonte oficial:

`https://api-docs.deepseek.com/updates`

Evento:

```text
2026-04-24 — DeepSeek-V4 Preview
```

Na ocasião a API passou a suportar:

- V4-Pro;
- V4-Flash.

Criar evento `preview`.

---

# 41. DEEPSEEK V4 FLASH

O snapshot/API version:

```text
DeepSeek-V4-Flash-0731
```

corresponde ao update de fim de julho.

Preservar distinção entre:

```text
canonical offering: deepseek-v4-flash
snapshot: DeepSeek-V4-Flash-0731
```

Não tratar snapshot como uma família separada.

---

# 42. DEEPSEEK V4 PRO GA

Fonte oficial:

`https://api-docs.deepseek.com/updates/`

Data:

```text
2026-08-13
```

O changelog oficial reporta, entre outros:

```text
Terminal Bench 2.1: 87.9
DeepSWE: 62.7
Toolathlon-Verified: 74.1
```

## Erro atual

O histórico atribui **72,7% DeepSWE** ao V4 Pro em uma descrição de lançamento.

Quando o contexto for a GA oficial de 13/08, o valor oficial publicado é:

```text
62.7%
```

Corrigir a conflation.

Se existir run independente 72,7 em outro harness/configuração, manter como BenchmarkRun separado com fonte e effort, nunca como score oficial genérico.

---

# 43. DEEPSEEK V4 VISION EXP — DATA ERRADA

O histórico atual usa data aproximada de 10/08.

O changelog oficial lista:

```text
2026-08-21 — DeepSeek-V4-Flash-Vision-Exp Release
```

Corrigir.

---

# 44. DEEPSEEK — PREÇOS NÃO DEVEM FICAR NO TRACK NAME/DESC

O histórico contém preços fixos em títulos de trilha.

Isso envelhece rapidamente.

DeepSeek introduziu peak/off-peak pricing efetivo em agosto de 2026.

Fonte:

`https://api-docs.deepseek.com/quick_start/pricing/`

Snapshot atual verificado:

### Flash

```text
cache miss input off-peak: $0.22/M
output off-peak: $0.66/M
cache miss input peak: $0.44/M
output peak: $1.32/M
```

### Pro

```text
cache miss input off-peak: $0.66/M
output off-peak: $1.98/M
cache miss input peak: $1.32/M
output peak: $3.96/M
```

Mover para pricing history/timeline.

---

# 45. QWEN 2.5 MAX — DATA ERRADA

O histórico atual usa:

```text
2024-09-19
```

Essa data está associada à família Qwen2.5, não ao Qwen2.5-Max.

Fonte oficial Qwen:

`https://qwenlm.github.io/blog/qwen2.5-max/`

Data:

```text
2025-01-28
```

Corrigir.

---

# 46. QWEN 3.8 MAX — DATA ERRADA

O histórico atual usa aproximadamente:

```text
2026-08-18
```

Alibaba Model Studio lifecycle registra:

```text
2026-08-02 — qwen3.8-max
```

Fonte oficial:

`https://help.aliyun.com/en/model-studio/newly-released-models`

ou página equivalente do Alibaba Cloud Model Studio.

Corrigir o canonical release.

---

# 47. QWEN 3.8 MAX — SNAPSHOT 0902

Existe snapshot:

```text
qwen3.8-max-0902
alias: qwen3.8-max-2026-09-02
```

Data:

```text
2026-09-02
```

Isso deve ser:

```text
snapshot-update
```

não um novo modelo familiar independente.

---

# 48. QWEN 3.8 FLASH ESTÁ AUSENTE DO HISTÓRICO

O catálogo possui Qwen3.8 Flash.

Alibaba lifecycle registra:

```text
2026-08-26 — qwen3.8-flash
```

Adicionar uma trilha/ramo Flash adequada.

Não misturar com Max.

---

# 49. QWEN 3.8 OPEN-WEIGHT VARIANTS

O catálogo possui variantes como:

- `qwen3-8-27b`;
- `qwen3-8-2-4t-a95b`.

Auditar datas e fontes oficiais antes de preservar os nós atuais.

Não inferir que um modelo de:

```text
2.4T total / 95B active
```

“roda em workstation de 64–96GB” apenas por ter 95B ativos.

Active parameters não equivalem a resident model weights.

Remover essa afirmação da história salvo fonte + quantização + estratégia de offload explícitas.

---

# 50. Z.AI / GLM — REVALIDAÇÃO OBRIGATÓRIA

A árvore atual contém muitas relações arquiteturais específicas.

Exemplo:

```text
glm-5-2 → ox-alpha-stealth
relation: stealth-fork
```

com afirmações de origem arquitetural.

A identidade:

```text
Ox Alpha = GLM-5.3-Flash
```

pode permanecer se sustentada por fonte oficial.

Mas a ancestralidade exata do checkpoint/modelo anterior deve ser revalidada.

Se não houver fonte primária:

```text
status: inferred
confidence: medium/low
```

ou remover a edge.

---

# 51. IDENTIDADE REVELADA NÃO É “GERAÇÃO”

Para:

```text
Ox Alpha → GLM-5.3-Flash
```

usar:

```text
identity-reveal
```

ou `rename` conforme evidência.

Não usar uma seta visual idêntica a uma evolução de geração.

---

# 52. FAMÍLIAS AUSENTES DO HISTÓRICO

A página atual possui apenas um subconjunto das famílias do catálogo.

O catálogo já contém, entre outros, modelos de:

- Moonshot/Kimi;
- Meta/Muse Spark;
- Tencent/Hy;
- MiniMax;
- possivelmente NVIDIA/Nemotron e outros dependendo do snapshot atual;
- Cursor Composer como model family/platform model, quando aplicável.

Auditar `AI_MODELS_DATA` e criar relatório:

```text
catalog model count
models represented in history
models without history
coverage %
```

---

# 53. REGRA PARA CRIAR NOVA LINHAGEM

Não criar árvore falsa só para chegar a 100% de coverage.

Se houver dois ou mais modelos relacionados e evidência suficiente, criar lineage.

Se houver apenas um modelo ou a ancestry não estiver documentada:

```text
standalone historical node
```

ou:

```text
lineage evidence insufficient
```

Isso é melhor que inventar predecessor.

---

# 54. MOONSHOT / KIMI

O catálogo já contém:

- Kimi K2.6;
- Kimi K2.7 Code;
- Kimi K3.

Pesquisar fontes Moonshot oficiais e construir relação somente após verificar:

- release dates;
- posicionamento;
- se K2.7 Code é sucessor direto de K2.6 ou ramo especializado;
- se K3 é geração seguinte ou família paralela.

Não inferir apenas pelos números dos nomes.

---

# 55. META / MUSE SPARK

O catálogo já contém Muse Spark 1.2/1.3 conforme datasets atuais.

Criar lineage se Meta publicou relação explícita.

Caso contrário:

```text
Muse Spark 1.2 → 1.3
relationType: generation-successor
status: inferred
```

somente se evidência secundária confiável apoiar.

Preferir fonte oficial Meta.

---

# 56. TENCENT HY / HUNYUAN

O catálogo inclui `Hy4 Preview` e modelos históricos relacionados podem existir.

Pesquisar fontes Tencent/Hunyuan.

Distinguir:

- preview;
- GA;
- snapshot;
- open-weight release.

Não transformar “Hy3” → “Hy4 Preview” em relação arquitetural comprovada sem fonte.

---

# 57. MINIMAX

Auditar os modelos MiniMax presentes no catálogo/ledger.

Criar lineage apenas com fontes oficiais MiniMax.

Não usar score de benchmark como evidência de parentesco.

---

# 58. NVIDIA / NEMOTRON E OUTROS

Faça uma varredura programática no catálogo:

```js
Object.values(AI_MODELS_DATA)
```

Agrupe por provider/family.

Compare com:

```js
MODEL_HISTORY_DATA.lineages
```

Todo provider/family sem representação deve gerar warning de Data Health.

Não significa que todos precisam obrigatoriamente de árvore.

---

# 59. ERRO CRÍTICO — ARTIFICIAL ANALYSIS V4.2 FALSO

O timeline atual possui um evento em 04/09/2026 afirmando aproximadamente:

> Artificial Analysis atualiza Index para v4.2; GPT-6 Astra assume liderança com 61, superando Fable 5.1.

Isso não é sustentado pelas fontes atuais verificadas.

Artificial Analysis atualmente mostra:

```text
GPT-6 Astra Max: 61
GPT-6 Astra XHigh: 61
GPT-5.6 Sol Max: 61
Claude Fable 5.1 Max + default fallback: 66
```

Fonte:

`https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-claude-fable-5-1`

Artigo:

`https://artificialanalysis.ai/articles/benchmarking-gpt-6-astra`

Artificial Analysis afirma explicitamente que Astra está **5 pontos abaixo** de Fable 5.1 no Intelligence Index.

## Ação

Remover/retratar o evento v4.2 falso.

Não criar AA v4.2 até existir fonte oficial do próprio Artificial Analysis que confirme:

- versão;
- metodologia;
- scores.

---

# 60. ARTIFICIAL ANALYSIS — PRESERVAR VERSÃO DO BENCHMARK

Os dados atuais usam Intelligence Index v4.1.1.

Toda run deve carregar:

```text
benchmarkId
benchmarkVersion
configurationId
effort
fallback policy
runDate
sourceId
```

Nunca comparar v4.1.1 com futura v4.2 como se fossem a mesma série sem marcar metodologia.

---

# 61. ASTRA DEEPSWE — SCORE/CUSTO MISTURADOS

Auditar o atual histórico de GPT-6 Astra no DeepSWE.

Há sinal de conflation entre configurações:

```text
XHigh score: 74.1
High cost: ~$5.72
```

A pesquisa anterior do projeto encontrou matriz por effort onde esses valores pertencem a runs diferentes.

Não aceitar um row genérico com:

```text
74.1 + $5.72
```

sem provar que vieram da mesma execução.

Reconsultar o leaderboard DeepSWE atual.

Criar uma run por effort:

```text
low
medium
high
xhigh
max
```

com score, custo, tokens, steps e CI próprios.

---

# 62. ASTRA TERMINAL-BENCH 4.0

O histórico de benchmarks deve suportar múltiplos efforts.

Não guardar apenas:

```text
57.9
```

como “Astra Terminal-Bench”.

Registrar runs verificadas por effort/harness.

Exibir no histórico:

```text
model
configuration
effort
harness
score
cost
run date
```

---

# 63. TERMINAL-BENCH SCIENCE — SEPARAR OFICIAL E INDEPENDENTE

Há valores diferentes circulando para Astra em Terminal-Bench Science.

O lançamento oficial OpenAI e uma avaliação independente podem usar scores/harnesses distintos.

Nunca sobrescrever um pelo outro.

Criar runs separadas.

Cada uma precisa de:

```text
sourceType
sourceId
harnessId
configurationId
```

---

# 64. BENCHMARK HISTORY DEVE CONSUMIR BENCHMARKRUN

O projeto já possui Domain v2.

Evitar manter um segundo banco de números em `BENCHMARK_HISTORY_DATA` se a informação já existir como BenchmarkRun.

Ideal:

```text
BenchmarkRun = fonte de verdade
History UI = query temporal sobre BenchmarkRun
```

Se compatibilidade exigir `BENCHMARK_HISTORY_DATA`, derivá-lo.

---

# 65. CAMPOS OBRIGATÓRIOS DE BENCHMARK HISTORY

Cada run histórica deve suportar:

```js
{
  id,
  modelId,
  configurationId,
  offeringId,

  benchmarkId,
  benchmarkVersion,
  harnessId,

  runDate,
  verifiedAt,

  score,
  scoreUnit,
  confidenceInterval,

  costPerTaskUsd,
  tokensPerTask,
  agentSteps,

  sourceId,
  sourceType,
  evidenceType
}
```

Não inventar campos ausentes.

---

# 66. LINHAGEM NÃO DEVE CONTER “ATUAL LÍDER ABSOLUTO”

Remover expressões temporais competitivas dos nodes, por exemplo:

```text
Atual líder absoluto
#1 geral
campeão
melhor modelo atual
```

Se a afirmação for histórica e importante, transformar em evento temporal/claim:

```text
validFrom
validUntil
```

---

# 67. LINHAGEM NÃO DEVE CONTER PREÇO CORRENTE COMO DESCRIÇÃO PRINCIPAL

Remover frases como:

```text
$0.14/$0.55
$2/$10
$5/$25
```

quando forem apenas preços atuais.

Preço muda.

Linhagem deve focar:

- papel do modelo;
- inovação conhecida;
- release/era;
- relação com outros modelos.

Pricing history guarda o resto.

---

# 68. NÃO DESCREVER TODAS AS RELAÇÕES COMO “ARQUITETURA”

O título atual da página fala em “Evolução arquitetural”.

Isso é forte demais para toda a base.

Trocar o framing para algo como:

> Evolução de famílias, gerações, produtos e relações arquiteturais quando documentadas.

---

# 69. NOVO CABEÇALHO DA PÁGINA HISTORY

A página deve explicar imediatamente:

> Esta visão reúne lançamentos, previews, sucessões de produto, relações arquiteturais documentadas, mudanças de preço/disponibilidade e resultados históricos de benchmark.

Adicionar legenda:

```text
Verificado
Inferido
Disputado
```

---

# 70. KPI DE COBERTURA HISTÓRICA

No topo, mostrar dinamicamente:

```text
Modelos no catálogo
Modelos com história
Cobertura de linhagem
Eventos históricos
Benchmark runs históricos
Edges verificadas
Edges inferidas
Itens needs-review
```

Não hardcodar números.

---

# 71. BUSCA NA PÁGINA HISTORY

Adicionar busca por:

```text
modelo
família
provider
evento
benchmark
```

A busca deve afetar o tab atual.

---

# 72. FILTRO POR PROVIDER

Adicionar:

```text
Todos
OpenAI
Anthropic
Google
xAI
DeepSeek
Z.ai
Alibaba/Qwen
Moonshot
Meta
Tencent
MiniMax
...
```

Gerado dinamicamente.

---

# 73. FILTRO POR ANO

Timeline:

```text
2024
2025
2026
Todos
```

Derivado dos eventos.

---

# 74. FILTRO POR EVENT TYPE

Melhorar filtros atuais.

Grupos sugeridos:

```text
Lançamentos
Previews/GA
Disponibilidade
Pricing/Quota
Open weights
Snapshots/Renames
Benchmarks
Safety/Governance
```

---

# 75. FILTRO DE EVIDÊNCIA

Permitir:

```text
Verified only
Include inferred
Needs review
```

Especialmente para lineage edges.

---

# 76. TOGGLE “MOSTRAR MODELOS HISTÓRICOS FORA DO CATÁLOGO”

Existem nós úteis como GPT-4o, Claude 3.5 Sonnet etc. que podem não estar no catálogo atual.

Permitir:

```text
Mostrar predecessores históricos
```

Default: ligado na tela de linhagens.

---

# 77. COLAPSAR FAMÍLIAS

Com mais famílias, a página ficará grande.

Cada family card deve ser colapsável.

Persistir opcionalmente o estado na sessão.

---

# 78. DEEP LINKS

Suportar URLs compartilháveis.

Exemplos canônicos:

```text
#history?tab=lineages&provider=openai
#history?tab=lineages&family=openai-gpt
#history?tab=timeline&provider=anthropic&year=2026
#history?tab=timeline&type=pricing-change
#history?tab=benchmarks&model=gpt-6-astra
```

Preservar aliases antigos.

---

# 79. NAVEGAÇÃO BACK/FORWARD

Filtros importantes devem refletir na URL quando fizer sentido.

Browser back/forward deve restaurar:

- tab;
- provider;
- family;
- model;
- event type;
- year.

---

# 80. NODE DETAIL / QUICK INSPECT

Ao clicar em um nó histórico, mostrar:

```text
Nome
Provider
Família
Lifecycle
Preview
GA
Retirement se houver
Relações
Fonte(s)
Confidence
```

Se o modelo estiver no catálogo:

```text
Abrir dossiê atual
```

Se for histórico-only:

não tentar navegar para rota inexistente.

---

# 81. EDGE DETAIL

Ao clicar/hover em uma edge:

```text
Tipo da relação
Status da evidência
Confidence
Fonte
Nota metodológica
```

Isso é fundamental para evitar que o usuário interprete toda seta como ancestry comprovada.

---

# 82. TIMELINE — AGRUPAR POR MÊS OU QUARTER

Com muitos eventos, uma lista plana ficará ruidosa.

Usar agrupamento:

```text
Setembro 2026
Agosto 2026
Julho 2026
...
```

ou opção de quarter.

---

# 83. TIMELINE — DIFERENCIAR DATA DO EVENTO E DATA DA FONTE

Se necessário, exibir:

```text
Evento: 01/07/2026
Fonte publicada: 30/06/2026
```

Exemplo perfeito: redeployment do Fable 5.

---

# 84. TIMELINE — SOURCE BADGE

Cada evento deve mostrar:

```text
Official
Independent
Community
```

E link para fonte.

---

# 85. TIMELINE — NÃO DUPLICAR EVENTOS SEM NECESSIDADE

Exemplo:

- announcement;
- GA;
- platform rollout.

Podem ser eventos diferentes quando realmente aconteceram em datas diferentes.

Mas não criar cinco cards apenas porque cinco fontes repetem o mesmo release.

---

# 86. BENCHMARK HISTORY — FILTROS

Adicionar:

```text
model
benchmark
provider
source type
effort
harness
date range
```

---

# 87. BENCHMARK HISTORY — DELTA

Quando houver duas runs comparáveis:

```text
+2.9 pp
-18% cost/task
-25% tokens/task
```

Só calcular quando:

- benchmark/version equivalente;
- harness comparável;
- configuração conhecida.

Caso contrário mostrar:

```text
Não diretamente comparável
```

---

# 88. BENCHMARK METHODOLOGY CHANGE

Quando um benchmark muda de versão:

```text
Terminal-Bench 2.1 → 4.0
AA Index v4.1.1 → futura versão
```

registrar evento:

```text
benchmark-methodology-change
```

Não desenhar score delta direto entre versões incompatíveis.

---

# 89. INTEGRAR COM DOMAIN CLAIMS

Claims históricos competitivos devem ter validade temporal.

Exemplo:

```js
{
  predicate: 'benchmarkLeader',
  validFrom,
  validUntil,
  status: 'superseded'
}
```

Quando surgir novo líder, o histórico deve conseguir dizer:

> foi líder entre data A e data B.

Não apagar a história.

---

# 90. INTEGRAR COM DOMAIN IMPACT

Quando um novo modelo alterar:

- líder;
- Pareto;
- use case ranking;
- award;

DomainImpact deve poder gerar evento histórico derivado quando isso for relevante.

Mas não registrar toda alteração trivial como evento público.

---

# 91. INTEGRAR COM DATA HEALTH

Adicionar checks de história:

```text
historyCoverage
unsourcedEdges
invalidDates
unknownModels
orphanSources
conflictingReleaseDates
benchmarkRunMismatch
volatileLineageClaims
```

---

# 92. DETECTOR DE DATA SUSPEITA

Criar auditoria para casos em que:

```text
releaseDate === knowledgeCutoff
```

ou outra coincidência suspeita.

Não falhar automaticamente porque pode existir coincidência real.

Gerar warning exigindo fonte.

---

# 93. TESTE — TODA EDGE TEM FONTE OU É EXPLICITAMENTE INFERIDA

Regra:

```text
verified edge → sourceIds.length > 0
```

Para inferred:

```text
confidence obrigatório
notes obrigatório
```

---

# 94. TESTE — TODO EVENTO TEM SOURCE

Eventos factuais públicos devem possuir ao menos um `sourceId` válido.

Exceção somente para evento derivado interno claramente marcado.

---

# 95. TESTE — SOURCE ID EXISTE

Todo:

```text
sourceId
sourceIds[]
```

de história deve resolver em registry canônico.

---

# 96. TESTE — NODE STATUS CANÔNICO

Não aceitar:

```text
predecessor
```

como lifecycle status se esse valor não fizer parte do enum canônico.

---

# 97. TESTE — OPENAI DATAS CRÍTICAS

Validar ao menos:

```text
o3 GA = 2025-04-16
gpt-oss = 2025-08-05
GPT-5.6 preview = 2026-06-26
GPT-5.6 GA = 2026-07-09
GPT-6 Astra = 2026-09-03
```

Evitar testes frágeis para datas que ainda estejam disputadas.

---

# 98. TESTE — ANTHROPIC DATAS CRÍTICAS

Validar:

```text
Fable 5 release = 2026-06-09
Fable 5 suspension = 2026-06-12
Fable 5 restored = 2026-07-01
Sonnet 5 = 2026-06-30
Opus 5 = 2026-07-24
Fable 5.1 = 2026-09-01
```

---

# 99. TESTE — GOOGLE DATAS CRÍTICAS

Validar:

```text
Gemini 3.1 Pro = 2026-02-19
Gemini 3.5 family/Flash = 2026-05-19
Gemini 3.7 Flash = 2026-08-13
Gemini 3.8 Flash = 2026-09-02
```

Não atribuir 19/05 a 3.5 Pro sem fonte específica.

---

# 100. TESTE — XAI

Validar:

```text
Grok 4.5 = 2026-07-16
Grok 4.6 = 2026-08-12
```

---

# 101. TESTE — DEEPSEEK

Validar:

```text
V3.2 = 2025-12-01
V4 Preview = 2026-04-24
V4 Pro GA = 2026-08-13
V4 Vision Exp = 2026-08-21
```

E:

```text
V4 Pro official DeepSWE GA score = 62.7
```

quando referindo-se à fonte oficial GA.

---

# 102. TESTE — QWEN

Validar:

```text
Qwen2.5-Max = 2025-01-28
Qwen3.8-Max = 2026-08-02
Qwen3.8-Flash = 2026-08-26
Qwen3.8-Max-0902 snapshot = 2026-09-02
```

---

# 103. TESTE — AA FALSO V4.2

Adicionar teste para impedir reaparecimento da afirmação sem fonte.

Não deve existir claim/evento dizendo:

```text
GPT-6 Astra AA #1 above Fable 5.1
```

no snapshot atual.

Dados independentes atuais:

```text
Astra Max = 61
Fable 5.1 Max/default fallback = 66
```

---

# 104. TESTE — VOLATILE WORDS EM LINEAGE NOTES

Gerar warnings para expressões:

```text
atual líder
#1
campeão
mais rápido atualmente
melhor atual
```

em `lineage.nodes[].notes`.

Isso não precisa falhar se estiver claramente qualificado com data histórica, mas deve ser revisado.

---

# 105. TESTE — PREÇO EM LINEAGE TRACK

Gerar warning se `trackName`, `trackDesc` ou node note contiver preço corrente (`$X`) sem contexto histórico.

Mover para pricing history.

---

# 106. TESTE — COBERTURA

Calcular:

```text
catalogModelIds
historyModelIds
missingHistoryIds
coveragePercent
```

Não exigir 100%.

Mas imprimir a lista no audit.

---

# 107. TESTE — HISTORICAL NODE SEM CATÁLOGO

Nós históricos fora de `AI_MODELS_DATA` são permitidos.

Devem possuir:

```text
historicalOnly: true
```

ou classificação equivalente.

E pelo menos uma fonte.

---

# 108. TESTE — NÃO NAVEGAR PARA DOSSIÊ INEXISTENTE

A UI deve evitar:

```text
#model/<historical-only-id>
```

quando não existe catálogo/dossiê.

Mostrar inspector histórico em vez disso.

---

# 109. MOBILE

A árvore horizontal atual pode ficar ruim com 5–8 nós.

Em telas pequenas, considerar:

- scroll com snap;
- layout vertical;
- mini-map;
- collapsible timeline.

Testar:

```text
360px
390px
430px
768px
```

---

# 110. ACESSIBILIDADE

Edges e nodes não podem depender apenas de cor.

Adicionar:

- labels;
- focus states;
- keyboard navigation;
- `aria-label` nos controles;
- tooltips acessíveis.

---

# 111. PERFORMANCE

Com dezenas de famílias e centenas de eventos:

- não renderizar tudo repetidamente sem necessidade;
- reutilizar DOM quando viável;
- evitar listeners duplicados;
- lazy render por tab;
- manter filtros eficientes.

---

# 112. NÃO REFAZER A SIDEBAR

A reorganização global já foi feita.

Este prompt é específico de:

```text
#history
```

Não iniciar novo redesign do portal inteiro.

---

# 113. SOURCE REGISTRY — CORRIGIR FONTES MAL REUTILIZADAS

Atualmente alguns eventos de Sonnet 5/Opus 5 usam source IDs de Fable 5.1.

Isso é semanticamente errado.

Criar sources específicos:

```text
anthropic-fable5-launch
anthropic-fable5-redeploy
anthropic-sonnet5-launch
anthropic-opus5-launch
anthropic-fable51-launch
```

Nomes podem variar.

---

# 114. SOURCES OPENAI SUGERIDAS

Registrar e/ou corrigir fontes oficiais equivalentes a:

```text
https://openai.com/index/introducing-openai-o1-preview/
https://openai.com/index/introducing-o3-and-o4-mini/
https://openai.com/index/introducing-gpt-oss/
https://openai.com/index/previewing-gpt-5-6-sol/
https://openai.com/index/gpt-5-6/
https://openai.com/index/gpt-6-astra/
```

Além dos posts específicos de preço/Ultrafast se usados.

---

# 115. SOURCES ANTHROPIC SUGERIDAS

```text
https://www.anthropic.com/news/claude-fable-5-mythos-5
https://www.anthropic.com/news/redeploying-fable-5
https://www.anthropic.com/news/claude-sonnet-5
https://www.anthropic.com/news/claude-opus-5
```

E a fonte oficial de Fable 5.1.

---

# 116. SOURCES GOOGLE SUGERIDAS

```text
https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/
https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/
https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/
https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/
```

Também usar API changelog/model cards quando necessário.

---

# 117. SOURCES XAI SUGERIDAS

```text
https://x.ai/news/grok-4-5
https://x.ai/news/grok-4-6
https://x.ai/news
```

Usar posts específicos de plataforma quando adicionar availability events.

---

# 118. SOURCES DEEPSEEK SUGERIDAS

```text
https://api-docs.deepseek.com/updates
https://api-docs.deepseek.com/quick_start/pricing/
```

Abrir posts individuais do changelog quando disponíveis.

---

# 119. SOURCES QWEN SUGERIDAS

```text
https://qwenlm.github.io/blog/qwen2.5-max/
https://help.aliyun.com/en/model-studio/newly-released-models
https://www.alibabacloud.com/help/en/model-studio/newly-released-models
```

Para snapshots, usar lifecycle oficial.

---

# 120. NÃO CONFIAR CEGAMENTE NESTE PROMPT

Este documento contém uma auditoria verificada em 05/09/2026.

Porém o agente deve **abrir as fontes e revalidar** antes de gravar dados.

Se uma fonte mudou depois deste snapshot:

- preservar evento histórico antigo;
- usar novo `verifiedAt`;
- não apagar história;
- atualizar status conforme necessário.

---

# 121. MIGRAÇÃO DO DATASET

Refatore `MODEL_HISTORY_DATA` gradualmente.

Estrutura sugerida:

```js
MODEL_HISTORY_DATA = {
  lineages: [...],
  edges: [...],
  events: [...],
  coverage: derived
}
```

Pode manter `connections` dentro da família se isso encaixar melhor no código atual.

O importante é que edges tenham provenance/confidence.

---

# 122. DERIVAR NODES DO CATÁLOGO QUANDO POSSÍVEL

Evitar duplicar:

```text
name
provider
status
```

em história se puder ser resolvido pelo catálogo atual.

O histórico precisa armazenar dados temporais/históricos, não duplicar toda ficha do modelo.

---

# 123. SNAPSHOT DE STATUS

Cuidado:

O status atual de um modelo e o status em determinada data são diferentes.

Exemplo:

```text
Fable 5
2026-06-09: active
2026-06-12: unavailable/suspended
2026-07-01: active
2026-09-01: superseded by 5.1
```

A timeline deve conseguir contar essa história.

---

# 124. NÃO APAGAR MODELOS SUPERSEDED

História existe justamente para preservar:

- previews;
- snapshots;
- modelos retirados;
- nomes stealth;
- leaders anteriores.

Não remover um modelo só porque não está mais ativo.

---

# 125. PRICING HISTORY

Quando corrigir os eventos de preço, verificar se já existe entrada em:

```text
data/pricing-history.js
```

Se existir, derivar timeline dela.

Evitar duplicação manual.

---

# 126. AVAILABILITY HISTORY

Quando houver rollout de plataforma, verificar `data/platforms.js`.

Idealmente:

```text
availability data → timeline event derivado
```

quando os campos temporais existirem.

---

# 127. HOME “O QUE MUDOU?”

Se a Home consome history events, as correções deste prompt devem automaticamente corrigir a Home.

Não duplicar evento em dois lugares.

---

# 128. HISTORY COMO GRAFO TEMPORAL

Mental model final:

```text
Provider
  ↓
Model Family
  ↓
Release / Snapshot / Branch
  ↘ relation edge
Timeline Event
  ↕
Source / Claim

Benchmark
  ↓
BenchmarkRun
  ↓
Historical Performance
```

A UI deve ser uma consulta desse grafo, não uma coleção de textos manuais.

---

# 129. CRITÉRIOS DE ACEITAÇÃO — FATOS

A tarefa não está concluída se permanecer qualquer um destes erros conhecidos:

- GPT-5.6 lançado em 16/02/2026;
- o3 lançado publicamente em 31/01/2025;
- gpt-oss lançado em 2026;
- Fable 5 lançado em maio/2026;
- Sonnet 5 em 20/06;
- Opus 5 em 12/06;
- Gemini 3.7 Flash em março/2026;
- Gemini 3.1 Pro ausente;
- Grok 4.5 em abril/2026;
- Grok 4.6 em 20/08;
- DeepSeek V3.2 em agosto/2025;
- DeepSeek V4 Vision Exp em 10/08;
- DeepSeek V4 Pro oficial com DeepSWE 72.7;
- Qwen2.5-Max em setembro/2024;
- Qwen3.8-Max em 18/08;
- evento AA v4.2 dizendo Astra > Fable 5.1 sem fonte.

---

# 130. CRITÉRIOS DE ACEITAÇÃO — LINHAGEM

- toda edge possui tipo;
- toda edge verificada possui fonte;
- edges inferidas são visualmente diferentes;
- predecessor não é lifecycle status;
- nodes históricos são suportados;
- não existem setas genéricas implicando arquitetura sem evidência.

---

# 131. CRITÉRIOS DE ACEITAÇÃO — BENCHMARK HISTORY

- effort aparece quando relevante;
- harness aparece;
- benchmark version aparece;
- source aparece;
- custos e scores de configurações diferentes não são misturados;
- metodologia diferente impede delta enganoso.

---

# 132. CRITÉRIOS DE ACEITAÇÃO — UI

A página deve responder facilmente:

```text
Quando este modelo apareceu?
Foi preview ou GA?
Qual modelo ele substituiu?
Essa relação é comprovada ou inferida?
Quando ficou indisponível?
Quando voltou?
Quando o preço mudou?
Quando apareceu em outra plataforma?
Como seus benchmarks evoluíram?
Qual é a fonte?
```

---

# 133. CRITÉRIOS DE ACEITAÇÃO — COBERTURA

Exibir cobertura das famílias/modelos.

Lista de modelos sem histórico deve ser acessível no Data Health.

Não inventar linha genealógica para completar percentual.

---

# 134. ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

## Fase A — Correção factual

1. OpenAI;
2. Anthropic;
3. Google;
4. xAI;
5. DeepSeek;
6. Qwen;
7. GLM;
8. demais providers.

## Fase B — Modelo de dados

- temporal fields;
- event types;
- lineage edge semantics;
- sources/confidence.

## Fase C — Benchmark history

- migrar para BenchmarkRuns;
- corrigir Astra/DeepSWE;
- corrigir AA;
- adicionar effort/harness.

## Fase D — Coverage

- Moonshot;
- Meta;
- Tencent;
- MiniMax;
- demais famílias do catálogo.

## Fase E — UI

- filtros;
- busca;
- edge legend;
- deep links;
- coverage;
- mobile.

## Fase F — Quality

- audit tests;
- Data Health;
- CI;
- documentação.

---

# 135. RELATÓRIO FINAL DO AGENTE

Ao terminar, gerar relatório contendo:

## Fatos corrigidos

Tabela:

```text
Entity | Antes | Depois | Fonte
```

## Linhagens adicionadas

Listar famílias.

## Relações reclassificadas

Exemplo:

```text
Sol → Astra
antes: generational-upgrade genérico
agora: flagship-role-successor / verified
```

## Eventos adicionados

Previews, GA, suspensions, prices etc.

## Benchmark history

Runs corrigidas/migradas.

## UI

Filtros e deep links.

## Testes

Comandos executados e resultados.

## Pendências

Somente fatos que continuam sem fonte suficiente.

---

# 136. PRINCÍPIO FINAL

A página `#history` não deve afirmar:

> “essa é a árvore arquitetural real”

quando o público só conhece uma sucessão comercial/geracional.

Ela deve funcionar como:

> **um histórico temporal auditável de modelos, releases, snapshots, relações documentadas, disponibilidade, preço e performance, com grau de confiança explícito.**

Esse é o padrão de qualidade esperado.

---

# 137. EXECUTE, NÃO APENAS RECOMENDE

Não entregue somente uma auditoria em texto.

Faça as alterações no projeto.

Ao encontrar divergência:

1. pesquise;
2. registre a fonte;
3. corrija o dataset;
4. atualize a UI se necessário;
5. adicione teste;
6. rode CI/auditoria;
7. reporte o resultado.

Preserve a arquitetura já existente e avance incrementalmente.
