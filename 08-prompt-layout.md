# PROMPT MESTRE — REORGANIZAÇÃO COMPLETA DO PORTAL DE COMPARAÇÃO DE MODELOS DE IA

Você é um **engenheiro de software sênior, arquiteto frontend, especialista em UX para sistemas densos em dados e engenheiro de dados para benchmarks de IA**.

Sua missão é **reorganizar, refatorar e melhorar substancialmente o projeto abaixo**, deixando-o muito mais fácil de entender, navegar, manter e atualizar conforme novos modelos de IA, benchmarks, planos e plataformas forem adicionados.

## Projeto

Site publicado:

https://wesleytakatsu.github.io/comparacao-modelos/

Repositório:

https://github.com/wesleytakatsu/comparacao-modelos

Trabalhe sobre o **estado real e atual do branch principal**.

Não presuma que documentos antigos de planejamento correspondem ao código atual.

**O código atual ganha de qualquer documentação antiga.**

Antes de alterar qualquer componente:

1. leia os arquivos reais;
2. procure os IDs/classes/funções existentes;
3. entenda o comportamento atual;
4. identifique dependências;
5. só depois faça a alteração.

---

# 1. OBJETIVO CENTRAL

O projeto cresceu muito e deixou de funcionar bem como uma página simples.

Ele atualmente contém dezenas de modelos, planos, benchmarks, visualizações, ferramentas, plataformas, dados históricos, avaliações calibradas, comunidade, preços, hardware, privacidade e outros datasets.

O resultado é:

* excesso de informação simultânea;
* sidebar grande e difícil de entender;
* telas que competem entre si;
* conceitos relacionados espalhados por várias rotas;
* componentes que perderam sentido conforme a base cresceu;
* rankings e títulos de “melhor modelo” que podem envelhecer;
* números duplicados em textos editoriais;
* dificuldade para descobrir qual tela usar;
* dificuldade para entender de onde uma informação veio;
* dossiês grandes demais e fragmentados;
* planos tratados de forma menos completa que modelos;
* métricas medidas misturadas com estimativas calibradas;
* custo de manutenção crescente.

O portal precisa deixar de parecer:

> “um dashboard que mostra todos os dados disponíveis”

e passar a funcionar como:

> **“um sistema de decisão sobre modelos, planos, plataformas e casos de uso sustentado por uma base de evidências auditável.”**

Essa é a principal diretriz do projeto.

---

# 2. NÃO FAÇA UM REWRITE DESNECESSÁRIO

Não migre automaticamente para React, Vue, Next.js ou outro framework.

O projeto atual é uma SPA em Vanilla JS e já possui muitos componentes e datasets úteis.

Prioridade:

* reorganizar arquitetura;
* modularizar código;
* reduzir acoplamento;
* normalizar dados;
* melhorar UX;
* eliminar duplicação;
* criar motores derivados;
* melhorar navegação.

**Não transformar esta tarefa numa migração tecnológica gigante.**

Uma migração de framework só seria aceitável se houver uma necessidade técnica extremamente forte e demonstrável. Caso contrário, mantenha a stack atual.

---

# 3. PRIMEIRA ETAPA OBRIGATÓRIA — AUDITORIA DO ESTADO REAL

Antes de implementar mudanças grandes, faça uma auditoria completa.

Leia no mínimo:

* `index.html`
* `app.js`
* `style.css`
* `data.js`
* `data/plans.js`
* `data/platforms.js`
* `data/history.js`
* `data/use-cases.js`
* `data/community.js`
* `data/behavior.js`
* `data/pricing-history.js`
* `scripts/audit-data.js`
* `server.js`
* `package.json`
* README e documentos de planejamento relevantes

Investigue:

* todas as rotas;
* sidebar;
* header;
* dashboard;
* drawer/quick inspector;
* command palette;
* dossiê de modelo;
* planos;
* histórico;
* casos de uso;
* comunidade;
* plataformas;
* provedores;
* Artificial Analysis;
* benchmark explorer;
* Radar 10D;
* Pareto;
* comparador;
* VRAM;
* simuladores;
* ROI;
* router;
* harnesses;
* troubleshooter;
* privacidade;
* Antigravity;
* modais;
* filtros;
* tabelas;
* responsive/mobile;
* tema claro/escuro.

Também procure:

* strings competitivas estáticas;
* rankings hardcoded;
* model IDs hardcoded em componentes;
* números repetidos em textos;
* afirmações duplicadas;
* campos semanticamente misturados;
* dados órfãos;
* datasets que representam o mesmo conceito de maneiras diferentes.

---

# 4. PRINCÍPIO DE ARQUITETURA DE INFORMAÇÃO

A navegação deve ser organizada pela **intenção do usuário**, não pelo nome interno dos datasets.

O fluxo mental desejado é:

**Explorar → Entender → Comparar → Decidir → Aprofundar evidências**

A arquitetura principal desejada é aproximadamente:

## Início

Resumo do ecossistema e novidades.

## Modelos

Catálogo, filtros e dossiês.

## Planos

Assinaturas, custos, cotas e dossiês.

## Casos de uso

Qual modelo escolher para determinada tarefa.

## Comparar

Comparação multidimensional.

## Decidir

Model Router, orçamento e recomendações.

## Ferramentas

VRAM, custos, ROI, harnesses, troubleshooting etc.

## Pesquisa & Evidências

Benchmarks, histórico, metodologia, comunidade, fontes e governança.

Não precisa seguir exatamente esses nomes caso encontre uma solução UX melhor, mas preserve essa lógica.

---

# 5. NOVA SIDEBAR

A sidebar atual possui opções demais no mesmo nível.

Reduza a carga cognitiva.

Itens principais devem ser poucos.

Sugestão:

### Principal

* Início
* Modelos
* Planos
* Casos de Uso
* Comparar
* Decidir

### Grupo recolhível: Ferramentas

* Calculadora de custo
* VRAM / Hardware
* ROI
* Harnesses
* Troubleshooter

### Grupo recolhível: Pesquisa & Evidências

* Benchmarks
* Histórico
* Comunidade
* Metodologia / Fontes
* Privacidade / Governança

Evite:

* colocar visualizações analíticas especializadas como Pareto no primeiro nível;
* transformar cada dataset em item de sidebar;
* duplicar destinos em header e sidebar.

A sidebar deve responder:

> “onde eu devo entrar?”

sem exigir que o usuário conheça a estrutura interna do projeto.

---

# 6. REFAZER O INÍCIO / DASHBOARD

O dashboard atual está sobrecarregado.

Não deve continuar sendo simultaneamente:

* painel de campeões;
* simulador;
* tabela completa;
* catálogo;
* comparador;
* dashboard executivo.

Refaça a home.

## Bloco 1 — O que mudou?

Destaque lançamentos e alterações recentes.

Usar os datasets históricos existentes sempre que possível.

Exemplos:

* modelo lançado;
* modelo substituído;
* atualização de benchmark;
* alteração de preço;
* alteração de disponibilidade;
* mudança de plano;
* nova plataforma;
* pesos liberados;
* mudança de status.

Ordenar por data.

Mostrar apenas alguns eventos recentes e fornecer acesso ao histórico completo.

---

## Bloco 2 — O que você quer fazer?

Criar atalhos orientados à intenção.

Exemplos:

* Coding complexo
* Melhor custo/benefício
* Agentes autônomos
* Frontend/UI
* Long context
* Multimodal
* Local/offline
* Privacidade
* Tenho uma GPU específica
* Quero gastar até R$ X
* Quero comparar modelos
* Quero escolher um plano

Esses atalhos devem levar para telas contextuais.

---

## Bloco 3 — Destaques dinâmicos

Reduzir drasticamente o número de “troféus”.

Algo como:

* Melhor desempenho medido
* Melhor valor
* Melhor local
* Mais rápido

Talvez 4–6 no máximo.

**Nenhum vencedor deve ser hardcoded no componente.**

Todos devem vir de funções derivadas.

---

## Bloco 4 — Catálogo resumido

Mostrar alguns modelos recentes/relevantes e botão:

**Ver todos os modelos**

A tabela completa deve morar em `Modelos`, não dominar a home.

---

# 7. CRIAR UMA ROTA “MODELOS”

Hoje o dashboard exerce parcialmente a função de catálogo.

Crie uma área dedicada.

Exemplo:

`#models`

O catálogo deve suportar:

* busca;
* provedor;
* família;
* status;
* open weights;
* multimodal;
* contexto;
* faixa de preço;
* disponibilidade;
* execução local;
* benchmark selecionado;
* qualidade de evidência.

Permitir:

* abrir quick inspector;
* abrir dossiê;
* adicionar à comparação.

O usuário precisa conseguir escolher entre:

* visualização compacta;
* tabela densa.

Mas os dois modos devem realmente alterar apenas a representação do catálogo, não esconder componentes não relacionados.

---

# 8. MANTER O QUICK INSPECTOR

O quick inspector é uma boa ideia.

Use-o como inspeção rápida.

Deve mostrar:

* nome;
* provedor;
* status;
* principais specs;
* 2–4 métricas importantes;
* preço;
* melhores usos;
* limitações;
* atualização/fonte;
* botão “Abrir dossiê completo”;
* botão “Comparar”.

Não transformar o drawer num segundo dossiê completo.

---

# 9. REORGANIZAR COMPLETAMENTE O DOSSIÊ DE MODELO

Manter:

`#model/:id`

Mas reduzir a fragmentação atual.

O dossiê pode continuar completo, porém deve possuir uma hierarquia melhor.

## Cabeçalho

Mostrar imediatamente:

* nome;
* provedor;
* família;
* status;
* data de lançamento;
* predecessor;
* successor se houver;
* proprietário/open weights;
* contexto;
* output máximo;
* multimodalidade;
* última verificação.

Também mostrar um indicador de:

**Cobertura dos dados**

Exemplo:

> Cobertura: 87%
> Atualizado: 03/09/2026
> 2 campos aguardando confirmação

---

## Resumo interpretado

Antes de qualquer tabela:

### Excelente em

3–5 áreas.

### Limitações

3–5 áreas.

### Use quando

tarefas adequadas.

### Evite quando

situações onde outro modelo é melhor.

### Posição atual

Somente rankings derivados e com contexto.

Exemplo:

> #1 — Terminal-Bench 2.1
> 91,4% · independente · atualizado em 01/09/2026

Evite afirmações absolutas sem contexto.

---

## Abas recomendadas

Reduzir as 10 abas atuais para algo aproximadamente assim:

### 1. Visão Geral

* resumo;
* strengths;
* weaknesses;
* best for;
* avoid for;
* geração anterior;
* diferenças importantes.

### 2. Desempenho

* benchmarks;
* esforços de thinking;
* custo/task;
* tokens/task;
* gráficos;
* score history;
* metodologia.

### 3. Preço & Acesso

* API;
* cache;
* long-context multiplier;
* planos;
* plataformas;
* disponibilidade;
* quota/pools;
* privacidade relevante.

### 4. Histórico & Evidências

* linhagem;
* alterações;
* benchmarks anteriores;
* relatos de comunidade;
* divergências;
* fontes.

### 5. Deploy & Integração

Somente quando aplicável:

* hardware;
* VRAM;
* quantização;
* contexto real local;
* harness;
* CLI;
* configurações.

Não criar uma aba vazia para modelos proprietários sem deploy local.

---

# 10. PLANOS DEVEM VIRAR ENTIDADE DE PRIMEIRA CLASSE

Criar:

`#plans`

e:

`#plan/:id`

Cada plano precisa ter um dossiê próprio.

---

# 11. DOSSIÊ DE PLANO

Exemplo:

`#plan/openai-chatgpt-plus`

Mostrar:

## Resumo

* produto;
* provedor;
* nome;
* público;
* preço mensal;
* preço anual;
* preço localizado;
* número mínimo de seats;
* período de cobrança;
* status;
* data de verificação.

## Modelos disponíveis

Não usar strings soltas quando o modelo existir no catálogo.

Associar por `modelId`.

Mostrar regras de acesso.

Exemplo:

* incluído na cota base;
* requer créditos;
* limitado;
* apenas fallback;
* preview;
* região específica.

## Recursos

Separar de modelos.

Exemplos:

* Projects
* Canvas
* Code Interpreter
* Workspaces
* Deep Research
* SSO
* Admin Console

Não misturar feature e modelo em `includedModels`.

## Cotas

Estruturar:

* janela;
* reset;
* mensagens;
* créditos;
* multiplicador;
* uso semanal;
* pools;
* prioridade;
* rate limits;
* concorrência.

## Overage

* permitido?
* crédito pré-pago?
* preço?
* API separada?

## Privacidade

Campos estruturados.

## Histórico

* preço;
* cotas;
* modelos incluídos;
* mudanças.

## Melhor para

Perfis recomendados.

## Não recomendado para

Limitações.

## Alternativas

Planos adjacentes e concorrentes.

## Fontes

Mostrar provenance.

---

# 12. NORMALIZAR O SCHEMA DE PLANOS

Evite:

`includedModels: ['GPT...', 'Canvas', 'Code Interpreter']`

Substituir conceitualmente por algo semelhante a:

```js
includedModelIds: [],
includedFeatures: [],
includedProducts: [],
modelAccessRules: {},
```

Não precisa usar exatamente estes nomes, mas separe os conceitos.

Usar IDs canônicos sempre que possível.

---

# 13. PRIVACIDADE PRECISA SER ESTRUTURADA

Não usar apenas:

`privacyNotes: "..."`

Criar estrutura equivalente a:

```js
privacy: {
  trainingPolicy,
  retentionPolicy,
  zeroDataRetention,
  zdrEligibility,
  dataResidency,
  inferenceResidency,
  humanReviewPolicy,
  enterpriseControls,
  sourceIds,
  verifiedAt
}
```

Tratar corretamente a diferença entre:

* não usar dados para treinamento;
* retenção limitada;
* Zero Data Retention;
* residência de dados;
* residência de inferência.

Não transformar conceitos diferentes em uma única badge “ZDR”.

---

# 14. CRIAR UM MOTOR DE RANKINGS / AWARDS

Esta é uma das tarefas mais importantes.

Atualmente existem rankings e títulos competitivos armazenados como:

* strings em `strengths`;
* `sweetSpot`;
* `badges`;
* cartões do dashboard;
* rationales;
* textos como “líder”, “campeão”, “melhor”.

Isso inevitavelmente envelhece.

Criar um módulo de domínio responsável por calcular rankings.

Por exemplo:

```text
getBenchmarkLeader(metric)
getBestValueModel(...)
getBestLocalModel(...)
getFastestModel(...)
getBestOpenWeightModel(...)
getBestByUseCase(...)
getParetoFrontier(...)
getModelRank(...)
```

Não precisa usar esses nomes exatos.

---

# 15. NÃO HARDCODE VENCEDORES

Errado:

```js
const bestValue = AI_MODELS_DATA['gpt-5-6-luna'];
```

Correto:

calcular com base em critérios.

Por exemplo:

* score mínimo;
* custo por tarefa;
* qualidade;
* disponibilidade;
* status;
* confidence;
* cobertura.

O modelo vencedor pode mudar quando dados novos forem adicionados.

O componente deve continuar correto automaticamente.

---

# 16. REMOVER NÚMEROS DUPLICADOS DE TEXTOS EDITORIAIS

Há casos onde:

* preço estruturado tem um valor;
* `strengths[]` menciona preço diferente.

Nunca repetir manualmente uma informação factual quando ela já existe em campo estruturado.

Exemplos de dados que devem existir em apenas um lugar:

* preço;
* contexto;
* benchmark;
* output;
* data;
* ranking;
* custo/task;
* disponibilidade;
* throughput.

Quando necessário, gerar a frase em runtime.

---

# 17. BADGES DEVEM SER CLASSIFICAÇÕES, NÃO VERDADES CONGELADAS

Badges como:

* “CAMPEÃO TERMINAL-BENCH”
* “MELHOR CUSTO/BENEFÍCIO”
* “LÍDER ABSOLUTO”

devem ser derivados.

Badges estáticos são aceitáveis para propriedades estáveis:

* OPEN WEIGHTS
* MIT
* APACHE 2.0
* MULTIMODAL
* PREVIEW
* 1M CONTEXT

Mas não para posições competitivas temporárias.

---

# 18. TESTES NÃO DEVEM CONGELAR O CAMPEÃO

Revise `scripts/audit-data.js`.

Errado:

```text
“Claude X deve ser #1”
```

Correto:

```text
“o item exibido como #1 precisa corresponder ao maior valor válido do dataset”
```

Se amanhã entrar um modelo melhor, o teste não pode falhar por causa disso.

Testar:

* integridade;
* IDs;
* referências;
* esquema;
* ranges;
* coerência;
* cálculos;
* ordenação;
* ausência de duplicações;
* provenance;
* freshness.

Não testar a identidade fixa do vencedor, exceto quando a regra de negócio explicitamente exigir.

---

# 19. CRIAR SISTEMA UNIVERSAL DE PROVENANCE

Toda informação importante deve poder responder:

> De onde veio?

Crie ou fortaleça um modelo universal de fontes.

Cada fato relevante deve possuir:

* sourceId;
* publisher;
* título;
* URL;
* tipo;
* publishedAt;
* retrievedAt;
* official;
* confidence quando aplicável.

O projeto já possui `DATA_SOURCES`.

Aproveite e expanda, não crie outro mecanismo paralelo desnecessário.

---

# 20. TIPOS DE EVIDÊNCIA

Visualmente distinguir quatro classes:

## M — Medido

Benchmark ou telemetria diretamente observada.

## D — Derivado

Cálculo feito a partir de dados medidos.

Ex.:

score/custo.

## C — Calibrado

Avaliação editorial ou score construído a partir de diversos sinais.

## A — Anedótico

Relatos de comunidade/caso isolado.

Use badge, tooltip e descrição.

---

# 21. NÃO APRESENTAR CALIBRAÇÃO COMO MEDIÇÃO PRECISA

O Radar 10D e comportamento de engenharia atualmente usam notas 0–100.

Algumas dimensões são subjetivas/calibradas:

* visualTaste;
* scopeDiscipline;
* overengineeringRisk;
* architecture;
* humanReviewEase.

Evite passar precisão falsa.

Se não houver metodologia forte para diferenciar 94 de 96, considere:

* faixas;
* labels;
* intervalos;
* confiança.

Ex.:

Muito forte / Forte / Médio / Fraco.

Ou mantenha o número, mas obrigatoriamente mostre:

**C — Calibrado · confiança média**

---

# 22. CASOS DE USO DEVEM VIRAR ENTIDADES

Criar:

`#use-cases`

e:

`#use-case/:id`

Exemplos:

* frontend;
* arquitetura;
* backend crítico;
* Unity;
* Unreal;
* agentes;
* multimodal;
* long-context.

---

# 23. DOSSIÊ DE CASO DE USO

Mostrar:

## Objetivo

O que está sendo avaliado.

## Critérios

Ex.:

Frontend:

* coding;
* multimodal;
* design fidelity;
* instruction following;
* custo;
* velocidade.

## Pesos

Mostrar metodologia.

## Ranking atual

Não deixar `rank: 1` manual como única fonte da classificação.

Calcular a classificação a partir de critérios sempre que possível.

Se houver intervenção editorial, registrar explicitamente.

## Categorias de vencedor

Não mostrar apenas um vencedor.

Mostrar:

* melhor geral;
* melhor valor;
* melhor barato;
* melhor local;
* melhor para autonomia;
* melhor premium.

## Cobertura

Ex.:

> 31 de 44 modelos possuem evidência suficiente.

## Confiança

Mostrar a qualidade da comparação.

## Evidências

Listar benchmarks, comunidade e calibrações utilizadas.

---

# 24. ARTIFICIAL ANALYSIS NÃO DEVE SER UMA “ILHA”

Hoje Artificial Analysis, Benchmark Explorer, Radar, Pareto e Comparador são telas diferentes que respondem a perguntas relacionadas.

Reorganize.

Criar um hub:

**Benchmarks & Performance**

Possíveis modos:

* Leaderboard
* Benchmark Explorer
* Histórico
* Trade-offs
* Metodologia

Artificial Analysis deve ser tratada como:

* fonte;
* conjunto de métricas;
* benchmark provider.

Não como universo completamente separado.

---

# 25. RADAR E PARETO DEVEM SER MODOS DO COMPARADOR

A comparação deve ser centrada na seleção de modelos.

Exemplo:

Usuário seleciona:

* Claude Fable 5.1
* Gemini 3.8 Flash
* GPT-5.6 Sol
* Grok 4.6

Depois alterna:

### Resumo

### Specs

### Benchmarks

### Radar

### Custo

### Pareto

### Acesso

### Privacidade

Assim, a seleção permanece a mesma.

Evite o usuário precisar navegar para outra rota e selecionar modelos novamente.

Pode manter deep links específicos caso sejam úteis, mas conceitualmente pertencem ao comparador.

---

# 26. COMPARAÇÃO DE PLANOS

A seleção de planos também deve ser persistente.

Permitir comparar por:

* preço;
* modelos;
* recursos;
* cota;
* overage;
* privacidade;
* seats;
* acesso a API;
* perfil.

Não mostrar apenas cards lado a lado.

Criar uma matriz legível.

---

# 27. COMMUNITY DEVE SER EVIDÊNCIA, NÃO VERDADE CENTRAL

Mantenha o dataset de comunidade.

Mas mova a tela para:

**Pesquisa & Evidências → Comunidade**

E incorpore os relatos nos respectivos dossiês.

Exemplo no modelo:

### O que benchmarks mostram

### O que usuários relatam

### Onde há divergência

Cada relato deve possuir, se possível:

* URL;
* plataforma;
* data;
* tarefa;
* harness;
* caveats;
* confiança.

“Reddit / r/cursor” sozinho não é provenance suficiente.

---

# 28. HISTÓRICO DEVE ALIMENTAR TODO O PORTAL

O histórico não deve ser apenas uma tela separada.

Use-o em:

* home;
* dossiê de modelo;
* dossiê de plano;
* benchmark;
* preço;
* plataformas.

Mostrar:

* lançado em;
* substituído em;
* preço mudou;
* benchmark mudou;
* modelo entrou/saiu de plataforma;
* status mudou.

---

# 29. PROVEDORES E PLATAFORMAS

Criar conceito de **Ecossistema**.

Distinguir claramente:

## Provider

Quem desenvolve/fornece o modelo.

Ex.:

* OpenAI
* Anthropic
* Google
* xAI

## Platform

Onde o modelo pode ser usado.

Ex.:

* Cursor
* OpenCode
* Antigravity
* camelCode

Criar rotas se fizer sentido:

`#provider/:id`

`#platform/:id`

Dossiê do modelo deve mostrar plataformas.

Dossiê da plataforma deve mostrar modelos.

---

# 30. ANTIGRAVITY

Antigravity é informação específica demais para ocupar um item principal da sidebar.

Mover seu conteúdo para:

* dossiê da plataforma Antigravity;
* planos Google relevantes;
* preço/acesso de modelos relevantes.

Manter a informação, remover o destaque global excessivo.

---

# 31. FERRAMENTAS

Agrupar:

## Custos

* simulador de uso;
* custos de API;
* Cursor/OpenCode;
* workloads.

## Hardware

* VRAM;
* GPUs;
* quantização;
* local inference.

## Produtividade

* ROI.

## Operação

* harnesses;
* configs;
* troubleshooter.

Cada ferramenta deve aceitar parâmetros de URL/contexto.

Exemplo:

clicar em:

**Calcular VRAM deste modelo**

deve abrir a calculadora com o modelo já selecionado.

---

# 32. ROUTER / DECISÃO

Manter o router.

Melhorar o resultado.

Mostrar:

* recomendação principal;
* alternativas;
* justificativa;
* trade-offs;
* custo;
* confiança;
* origem das métricas usadas.

Evitar respostas absolutas quando os dados forem incompletos.

Permitir abrir:

* dossiê;
* comparação;
* plano relevante.

---

# 33. FRESHNESS É OBRIGATÓRIO

Este projeto envelhece rapidamente.

Toda entidade importante precisa mostrar:

* `verifiedAt`;
* `updatedAt`;
* freshness;
* confidence;
* cobertura.

Exemplo:

> Atualizado em 03/09/2026
> 91% de cobertura
> 2 campos aguardando revisão

Criar status visual:

* atualizado;
* atenção;
* desatualizado;
* sem fonte recente.

Não esconder essas informações apenas numa página de metodologia.

---

# 34. MODELAR VALIDADE TEMPORAL

Sempre que aplicável usar:

* `effectiveFrom`
* `effectiveTo`
* `verifiedAt`

Especialmente:

* preço;
* plano;
* cota;
* plataforma;
* promoção;
* benchmark;
* disponibilidade.

Dados históricos não devem ser sobrescritos silenciosamente.

---

# 35. PROMOÇÕES E PREÇOS

Não tratar preço promocional como preço eterno.

Schema deve suportar:

```js
pricing: {
  current: ...,
  promotional: ...,
  promotionalUntil: ...,
  regularAfterPromotion: ...
}
```

ou estrutura equivalente.

A UI deve mostrar claramente:

> US$ X até DD/MM/YYYY
> depois US$ Y

---

# 36. STATUS DE MODELOS

Padronize status.

Exemplos:

* active
* stable
* preview
* superseded
* legacy
* retired
* stealth-revealed

Evite usar nomes diferentes para o mesmo conceito em datasets diferentes.

O histórico pode ter conceitos como predecessor, mas o catálogo deve usar vocabulário canônico.

---

# 37. MODELOS ANTIGOS NÃO DEVEM SUMIR

Modelos superseded/legacy são importantes para:

* histórico;
* comparação geracional;
* preço;
* benchmarks históricos.

Mas não devem competir visualmente com modelos atuais por padrão.

No catálogo:

default = modelos atuais.

Filtro:

**Incluir históricos**

---

# 38. NORMALIZAR IDENTIDADES

Evitar repetir `modelName` em todos os datasets quando já existe `modelId`.

Preferir:

```js
modelId: 'gpt-5-6-sol'
```

e resolver nome/provedor/cor pelo catálogo canônico.

Textos duplicados criam drift.

---

# 39. NOVA CAMADA DE DOMÍNIO

O frontend não deve manipular todos os arrays diretamente.

Criar módulos conceituais como:

```text
domain/
  models
  plans
  benchmarks
  rankings
  pricing
  availability
  evidence
  history
  freshness
  recommendations
```

As views devem chamar helpers.

Exemplo:

```text
getModelById()
getPlanById()
getPlansForModel()
getPlatformsForModel()
getBenchmarkRuns()
getModelRank()
getUseCaseRanking()
getFreshness()
getEvidenceCoverage()
```

Não precisa usar exatamente estes nomes.

---

# 40. MODULARIZAR `app.js`

`app.js` cresceu demais.

Separar progressivamente.

Sugestão:

```text
src/
  app/
    router.js
    state.js
    events.js

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

  views/tools/
    costs.js
    vram.js
    roi.js
    harnesses.js
    troubleshoot.js

  components/
    evidence-badge.js
    freshness-badge.js
    model-card.js
    plan-card.js
    entity-header.js
    compare-tray.js
    benchmark-table.js

  domain/
    rankings.js
    evidence.js
    pricing.js
    availability.js
    freshness.js
```

Não faça modularização cosmética.

Separar responsabilidades reais.

---

# 41. MODULARIZAR CSS

`style.css` também está muito grande.

Organizar por:

* tokens;
* shell;
* navigation;
* components;
* views;
* responsive;
* utilities.

Evite:

* dezenas de styles inline;
* regras duplicadas;
* cores hardcoded fora de tokens;
* componentes com pequenas variações que poderiam compartilhar classe.

---

# 42. DESIGN SYSTEM

Preserve a identidade atual, mas reduza ruído visual.

Criar padrões consistentes para:

* badges;
* cards;
* KPI;
* alert;
* evidence;
* tables;
* filters;
* tabs;
* entity headers;
* stats.

Evite colocar emoji, glow e cores fortes em toda informação.

Hierarquia visual deve refletir importância.

---

# 43. FILTROS

Princípio:

**um eixo principal visível, filtros secundários recolhíveis.**

Não mostrar 8 selects simultaneamente se não houver necessidade.

Mostrar filtros ativos em chips removíveis.

Adicionar botão:

**Limpar filtros**

---

# 44. BUSCA

A busca global deve encontrar:

* modelos;
* planos;
* provedores;
* plataformas;
* casos de uso;
* ferramentas.

A busca do catálogo deve filtrar apenas o catálogo.

Não confundir as duas funções.

Command Palette pode continuar.

Melhorar resultados por grupos.

---

# 45. URLS / DEEP LINKS

As páginas principais devem possuir URLs compartilháveis.

Exemplos:

```text
#models
#model/gemini-3-8-flash

#plans
#plan/google-ai-pro

#use-cases
#use-case/frontend-ui-ux

#compare?models=...

#provider/google
#platform/antigravity
```

Filtros importantes podem ser serializados na URL quando fizer sentido.

---

# 46. BACK/FORWARD DO BROWSER

Toda navegação deve funcionar corretamente com:

* voltar;
* avançar;
* deep link;
* refresh.

Não depender apenas de estado em memória.

---

# 47. MOBILE

Faça auditoria específica em:

* 360 px;
* 390 px;
* 430 px;
* 768 px.

Verificar:

* sidebar;
* tabelas;
* filtros;
* tabs;
* dossiês;
* comparador;
* cards;
* drawer;
* modais;
* charts.

Não resolver overflow apenas com:

```css
overflow-x: hidden;
```

Corrigir a causa.

Tabelas extensas podem ter scroll contextual.

---

# 48. ACESSIBILIDADE

Garantir:

* navegação por teclado;
* focus visível;
* aria-label;
* aria-current;
* aria-expanded;
* ESC em overlays;
* backdrop click onde apropriado;
* tabs acessíveis;
* botões reais em vez de div clicável;
* contraste adequado nos dois temas.

---

# 49. PERFORMANCE

Com o crescimento dos dados:

* evitar rerender completo desnecessário;
* evitar event listeners repetidos;
* usar delegation quando adequado;
* destruir charts corretamente;
* lazy render de conteúdo pesado;
* não construir tabelas gigantes se a view não estiver ativa.

Não otimizar prematuramente, mas eliminar desperdícios evidentes.

---

# 50. TRATAR DADOS AUSENTES CORRETAMENTE

Nunca transformar falta de dado em score zero.

Distinguir:

* zero real;
* indisponível;
* não medido;
* não aplicável;
* não verificado.

Isso é crítico para rankings.

---

# 51. COBERTURA DE BENCHMARK

Ao calcular rankings, verificar cobertura.

Um modelo com um benchmark forte e 80% dos dados ausentes não deve automaticamente ganhar uma classificação composta sobre um modelo amplamente testado.

Expor:

* quantidade de benchmarks;
* confiança;
* cobertura.

---

# 52. COMPARAÇÕES ENTRE BENCHMARKS

Não misturar arbitrariamente escalas incompatíveis.

Documentar normalização.

Se construir score composto:

* explicar pesos;
* explicar normalização;
* indicar que é derivado;
* permitir inspecionar métricas originais.

---

# 53. METODOLOGIA

Criar uma seção clara de metodologia.

Explicar:

* fontes;
* tipos de evidência;
* normalizações;
* critérios de ranking;
* scores calibrados;
* community evidence;
* freshness;
* tratamento de dados ausentes;
* como funciona “melhor custo/benefício”.

Isso aumenta drasticamente a credibilidade do portal.

---

# 54. AUDITORIA AUTOMÁTICA DE TEXTO COMPETITIVO

Adicione uma verificação capaz de encontrar termos perigosos em dados editoriais.

Exemplos:

* líder;
* campeão;
* melhor;
* imbatível;
* #1;
* recorde;
* absoluto;
* supremo;
* indiscutível.

Não proíba todos.

Mas o auditor deve listar ocorrências para revisão.

Objetivo:

evitar afirmações competitivas congeladas em prosa.

---

# 55. AUDITORIA DE DUPLICAÇÃO DE PREÇO

Quando um texto editorial mencionar `$X`, detectar possível divergência com o preço canônico.

Idealmente remova preços das strings editoriais.

---

# 56. AUDITORIA DE REFERÊNCIAS

Verificar:

* modelId inexistente;
* providerId inexistente;
* planId inexistente;
* platformId inexistente;
* sourceId inexistente;
* benchmarkId inexistente;
* histórico apontando para entidades ausentes.

Nenhuma referência órfã.

---

# 57. AUDITORIA DE FONTES

Para claims importantes, detectar ausência de fonte.

Categorias que devem exigir fonte:

* preços;
* datas;
* contexto;
* output;
* benchmarks;
* planos;
* cotas;
* políticas de privacidade;
* disponibilidade;
* licença;
* hardware oficial.

---

# 58. COMPONENTE UNIVERSAL DE EVIDÊNCIA

Criar componente reutilizável semelhante a:

```text
M · Medido
Artificial Analysis
01/09/2026
Confiança alta
```

Com clique/tooltip para fonte.

Usar no:

* dossiê;
* benchmark;
* ranking;
* plano;
* caso de uso.

---

# 59. COMPONENTE UNIVERSAL DE FRESHNESS

Exemplo:

```text
Atualizado há 1 dia
```

ou:

```text
Verificado em 03/09/2026
```

Com status visual.

---

# 60. COMPONENTE UNIVERSAL DE COBERTURA

Exemplo:

```text
Cobertura de evidência: 82%
```

Ao abrir:

* Specs: 100%
* Benchmarks: 85%
* Pricing: 100%
* Community: 40%
* Plans: 70%

---

# 61. PRIORIDADE DE DADOS

Quando houver conflito:

1. documentação oficial atual;
2. benchmark independente primário;
3. dataset estruturado interno com fonte;
4. comunidade;
5. estimativa editorial.

Nunca deixar uma estimativa sobrescrever silenciosamente um dado oficial.

---

# 62. NÃO INVENTE DADOS

Se uma informação não existe:

mostrar:

**Não verificado**

ou:

**Sem dados suficientes**

Não preencher com estimativa sem deixar explicitamente marcado.

---

# 63. CORRIJA INCONSISTÊNCIAS ENCONTRADAS DURANTE A REFATORAÇÃO

Além da arquitetura, investigue todos os conflitos internos.

Exemplo já conhecido:

GPT-5.6 Luna possui preço canônico diferente de um preço citado dentro de `strengths`.

Procure casos semelhantes em todos os modelos.

Não limite a auditoria ao exemplo.

---

# 64. INVESTIGUE RANKINGS DESATUALIZADOS

Procure componentes que ainda afirmem que um modelo é:

* #1;
* campeão;
* líder;
* melhor.

Compare com os datasets atuais.

Transforme o componente em derivado sempre que possível.

---

# 65. INVESTIGUE ESTATÍSTICAS QUE PERDERAM SENTIDO COM A ESCALA

O portal cresceu.

Um KPI que funcionava com 10 modelos pode não funcionar com 44+.

Analise cada KPI perguntando:

> isso ainda ajuda uma decisão?

Se não:

* remover;
* mover;
* agrupar;
* transformar em filtro;
* transformar em ranking;
* mostrar sob demanda.

Não manter um componente só porque ele já existe.

---

# 66. INVESTIGUE COMPONENTES REDUNDANTES

Pergunte:

* Radar e comparador competem?
* Pareto e benchmark explorer competem?
* provider e platform se sobrepõem?
* comunidade deveria ser tela ou evidência?
* histórico deveria ser página ou camada?
* Antigravity deveria ser navegação global?
* Privacy deveria ser tabela global ou propriedade das entidades?

Implemente a resposta mais coerente.

---

# 67. PRESERVE FUNCIONALIDADES BOAS

Não remova apenas para simplificar.

Preserve e reposicione:

* quick inspector;
* comparação de até 4 modelos;
* command palette;
* histórico;
* theme system;
* filtros;
* charts úteis;
* source registry;
* simuladores;
* dados de hardware;
* dados de community;
* exportação;
* deep links.

---

# 68. ESTADO DE COMPARAÇÃO

Criar uma compare tray/bandeja persistente.

Ao selecionar modelos:

```text
Comparar 3/4
Gemini 3.8 Flash
Claude Fable 5.1
GPT-5.6 Sol
[Comparar]
```

Persistir enquanto navega.

Permitir remover rapidamente.

---

# 69. NÃO DEIXAR CONTROLE SEM FUNÇÃO CLARA

Um controle deve afetar exatamente aquilo que o usuário espera.

Remover toggles que:

* parecem alterar tabela;
* mas na prática escondem outros componentes;
* ou executam comportamento inesperado.

---

# 70. NÃO DUPLICAR CONTROLES

Se algo está na sidebar, não precisa estar também no header sem motivo.

Header deve ser simples:

* marca;
* busca;
* tema;
* menu.

---

# 71. ESTRUTURA DE IMPLEMENTAÇÃO

Faça a refatoração em etapas seguras.

Sugestão:

## Fase 1 — Domínio e integridade

* normalização;
* IDs;
* evidence;
* freshness;
* ranking engine;
* auditor.

## Fase 2 — Navegação

* sidebar;
* novas rotas;
* header;
* shell.

## Fase 3 — Home + Catálogo

* novo início;
* `#models`;
* quick inspector.

## Fase 4 — Dossiês

* modelo;
* plano;
* caso de uso;
* provider/platform.

## Fase 5 — Comparação

* resumo;
* specs;
* benchmark;
* radar;
* pareto;
* custo;
* privacidade.

## Fase 6 — Benchmarks

* consolidar AA;
* explorer;
* metodologia.

## Fase 7 — Ferramentas

* reorganizar VRAM;
* custos;
* ROI;
* harnesses;
* troubleshoot.

## Fase 8 — Polimento

* mobile;
* acessibilidade;
* performance;
* dead code;
* CSS.

---

# 72. NÃO FAÇA UMA REESTRUTURAÇÃO “BIG BANG” SEM TESTAR

Depois de cada fase:

* execute testes;
* abra a aplicação;
* teste as rotas;
* teste tema;
* teste mobile;
* teste back/forward;
* teste filtros;
* teste comparação;
* verifique console.

Corrija antes de seguir.

---

# 73. TESTES MÍNIMOS

`npm test` deve passar.

Além disso, acrescente testes/auditorias quando apropriado.

Verificar:

* contagem de modelos;
* IDs únicos;
* preços válidos;
* fontes;
* ranks derivados;
* nenhuma referência órfã;
* status válidos;
* ausência de NaN;
* dados ausentes tratados corretamente.

---

# 74. CONSOLE LIMPO

Ao final:

* sem erros JavaScript;
* sem recursos 404 importantes;
* sem warnings repetitivos provocados pelo app;
* sem event listeners duplicados conhecidos.

---

# 75. REMOVER DEAD CODE

Depois da migração:

* funções antigas;
* CSS órfão;
* IDs obsoletos;
* componentes não utilizados;
* datasets duplicados;
* aliases desnecessários.

Mas antes de remover, confirme uso por busca no projeto.

---

# 76. NÃO QUEBRAR LINKS ANTIGOS SEM REDIRECT/ALIAS

Se uma rota antiga for removida:

Ex.:

`#radar`

redirecionar ou mapear para:

`#compare?view=radar`

ou equivalente.

Preserve compatibilidade com bookmarks existentes quando razoável.

---

# 77. TEXTO DA INTERFACE

Evite linguagem excessivamente promocional.

Preferir:

> “maior score registrado neste benchmark”

em vez de:

> “CAMPEÃO INDISCUTÍVEL”

Preferir:

> “melhor relação score/custo entre modelos com score ≥ X”

em vez de:

> “rei do custo-benefício”.

Tom:

* técnico;
* claro;
* comparativo;
* auditável.

---

# 78. ENTREGÁVEL FINAL

Não termine apenas com código.

Ao concluir, forneça um relatório de implementação contendo:

## 1. Arquitetura anterior

Principais problemas encontrados.

## 2. Arquitetura nova

Mapa das telas.

## 3. Rotas

Lista final.

## 4. Componentes removidos

E por quê.

## 5. Componentes movidos

Origem → destino.

## 6. Componentes criados

Função de cada um.

## 7. Dados normalizados

Schemas alterados.

## 8. Rankings

Como agora são calculados.

## 9. Evidências

Como provenance/confidence/freshness funcionam.

## 10. Inconsistências corrigidas

Liste uma a uma.

## 11. Testes

O que foi executado e resultado.

## 12. Pendências

Somente questões realmente não resolvidas.

---

# 79. CRITÉRIOS DE ACEITAÇÃO

A tarefa só pode ser considerada concluída quando:

* a navegação estiver substancialmente mais simples;
* não houver ~20 destinos equivalentes competindo na sidebar;
* existir uma área clara de Modelos;
* existir uma área clara de Planos;
* planos possuírem dossiês;
* casos de uso possuírem estrutura detalhada;
* o dossiê de modelo estiver reorganizado;
* Radar e Pareto estiverem integrados ao fluxo de comparação;
* Artificial Analysis não competir como universo isolado;
* home estiver orientada a novidades e decisões;
* “melhores modelos” relevantes forem calculados;
* rankings não dependerem da identidade fixa de um modelo;
* preços e benchmarks não estiverem duplicados desnecessariamente em prosa;
* medido/calibrado/anedótico forem distinguíveis;
* freshness estiver visível;
* fontes estiverem acessíveis;
* o auditor estiver mais genérico e menos congelado;
* nenhuma funcionalidade importante tiver sido perdida;
* desktop estiver bom;
* mobile estiver bom;
* tema claro estiver bom;
* tema escuro estiver bom;
* testes passarem;
* console estiver limpo.

---

# 80. REGRA DE DECISÃO

Quando estiver em dúvida entre:

**mostrar mais dados**

e

**ajudar o usuário a entender melhor**

priorize entendimento.

Quando estiver em dúvida entre:

**criar outra tela**

e

**incorporar a informação ao dossiê da entidade correta**

priorize o dossiê.

Quando estiver em dúvida entre:

**hardcode**

e

**derivar de dados estruturados**

priorize derivação.

Quando estiver em dúvida entre:

**um texto dizendo quem é o melhor**

e

**uma regra que calcula quem é o melhor**

crie a regra.

Quando estiver em dúvida entre:

**apagar informação**

e

**reposicioná-la em contexto**

prefira reposicionar.

---

# 81. PRINCÍPIO FINAL

O banco de dados deve armazenar:

**fatos, medições, relações, fontes, datas e evidências.**

O domínio deve calcular:

**rankings, trade-offs, recomendações e classificações.**

A interface deve explicar:

**o que significa, quando usar e por quê.**

Não misture essas três responsabilidades.

Faça a implementação com esse princípio guiando toda a refatoração.

---

# 82. COMEÇAR AGORA

Não produza apenas uma proposta.

Comece pela auditoria do código atual e implemente as mudanças.

Se encontrar diferenças entre este prompt e o código real:

1. investigue;
2. preserve a intenção;
3. adapte a implementação;
4. registre a decisão no relatório final.

Não interrompa a implementação para pedir confirmação sobre detalhes pequenos de UX ou nomenclatura.

Tome decisões coerentes seguindo os princípios acima.

Faça alterações incrementais e verificáveis até deixar o portal significativamente mais organizado, escalável e fácil de entender.
