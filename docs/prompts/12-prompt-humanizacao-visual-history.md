# PROMPT 12 — DIREÇÃO VISUAL CONTEMPORÂNEA, HUMANIZAÇÃO DO PORTAL E REDESIGN DE `#history`

> Revisão ampliada: **05/09/2026 — BRT**  
> Página piloto: `https://wesleytakatsu.github.io/comparacao-modelos/#history`  
> Repositório: `https://github.com/wesleytakatsu/comparacao-modelos`  
> Branch alvo: `main`  
> Base técnica observada: commit `251ee5405b24824d9b3c8e9ef23c4a51de9e4eaa` ou posterior.  
> Objetivo: **fazer o portal parecer um produto visualmente sofisticado, contemporâneo, autoral e confiável — não um dashboard genérico, não uma landing page de IA de 2023, e também não uma interface minimalista sem personalidade. `#history` será a página-piloto, mas o trabalho inclui um polish pass global para que o portal inteiro fale a mesma língua visual.**

---

# 0. PAPEL DO AGENTE

Você é simultaneamente:

- Product Designer sênior;
- UX Designer para produtos técnicos densos em dados;
- Information Designer;
- Data Visualization Designer;
- Design Systems Engineer;
- Frontend Engineer Vanilla JS/CSS;
- revisor editorial de microcopy de produto.

Sua missão não é apenas “deixar bonito”.

Sua missão é criar **composição, hierarquia, ritmo, identidade e acabamento**.

O resultado deve parecer feito por uma equipe de produto experiente que tomou decisões deliberadas.

---

# 1. CORREÇÃO DE DIREÇÃO EM RELAÇÃO À VERSÃO ANTERIOR DESTE PLANO

A versão anterior acertou ao identificar os clichês visuais atuais, mas corria o risco de exagerar na austeridade.

Não interprete este trabalho como:

- remover toda cor;
- eliminar toda profundidade;
- deixar tudo plano;
- transformar o portal em documentação monocromática;
- imitar GitHub;
- imitar Linear;
- produzir um “terminal de dados” frio;
- remover toda personalidade.

O objetivo correto é:

> **menos decoração repetitiva, mais composição visual.**

E também:

> **menos efeitos espalhados, mais momentos visuais memoráveis.**

Uma interface pode ser rica, colorida, profunda e bonita sem parecer gerada por IA.

---

# 2. AUDITORIA VISUAL GLOBAL OBRIGATÓRIA ANTES DE ALTERAR CÓDIGO

Antes de editar qualquer arquivo, abra e navegue de verdade por todas estas rotas no navegador:

```text
#dashboard
#models
#model/gpt-6-astra
#plans
#plan/<um-plano-real>
#use-cases
#use-case/<um-caso-real>
#compare
#router
#benchmarks
#history
#community
#sources
#privacy
#platforms
#platform/<uma-plataforma-real>
#provider/openai
#benchmark/<um-benchmark-real>
#data-health
#simulator
#calculator
#roi
#harnesses
#troubleshoot
```

Não fazer auditoria apenas lendo HTML/CSS.

O agente deve usar navegador real e observar:

- primeira dobra;
- scroll completo;
- hover;
- focus;
- modais;
- drawers;
- tabs;
- tabelas;
- gráficos;
- estados vazios;
- estados com muitos dados;
- dark mode;
- light mode;
- desktop;
- tablet;
- mobile.

---

# 3. MATRIZ DE SCREENSHOTS OBRIGATÓRIA

Antes e depois da alteração, capturar screenshots pelo menos em:

```text
1440 × 1000
1024 × 900
390 × 844
```

Para estas páginas prioritárias:

```text
Dashboard
Models
Model dossier
Plans
Use Cases
Comparator
Benchmarks
History / Lineages
History / Timeline
History / Benchmark History
Community
Sources
Platforms
Data Health
```

Salvar screenshots de comparação temporariamente durante o desenvolvimento ou em artefato de CI, se possível.

A avaliação visual final deve ser feita pelos screenshots, não apenas pelo código.

---

# 4. O QUE A AUDITORIA ATUAL JÁ MOSTRA

O portal atual possui muitos pontos fortes funcionais, mas repete demais a mesma gramática:

- H2 com emoji;
- subtítulo explicando tudo;
- card arredondado;
- border translúcida;
- pill/badge;
- cyan;
- glow;
- hover com elevação;
- bloco interno com mais cards;
- muitos `style="..."` inline;
- títulos com termos como “Inteligente”, “Auditado”, “Completo”, “Matriz”, “Hub”, “Explorer”, “Head-to-Head”.

Esse padrão aparece em praticamente todas as rotas.

A sensação artificial vem da **repetição mecânica**, não da existência de cards ou cor em si.

---

# 5. NORTH STAR VISUAL

O portal deve parecer uma mistura coerente de:

- produto analítico premium;
- observatório técnico;
- publicação de dados interativa;
- ferramenta de pesquisa;
- console de decisão;
- atlas visual.

Não copiar visualmente nenhuma marca específica.

A referência desejada é a qualidade de composição de produtos maduros: tipografia cuidadosa, ritmo, boas superfícies, visualizações fortes, transições refinadas e informação densa sem parecer barulhenta.

---

# 6. REGRA CENTRAL: BONITO É OBRIGATÓRIO

A implementação final deve ser **visualmente atraente**.

Não aceitar uma solução que apenas seja “mais limpa”.

O redesign deve possuir:

- contraste visual elegante;
- momentos de profundidade;
- composição de cor;
- hierarquia tipográfica;
- gráficos bem enquadrados;
- superfícies com materialidade controlada;
- microinterações refinadas;
- bons estados selecionados;
- identidade própria.

A página deve ficar mais bonita do que hoje, não apenas menos chamativa.

---

# 7. NÃO CONFUNDIR SOFISTICAÇÃO COM MINIMALISMO

Minimalismo é uma ferramenta, não o objetivo.

Pode haver:

- gradiente;
- blur;
- sombra;
- brilho;
- cor saturada;
- animação;
- painéis elevados;

Mas somente quando usados como **ponto focal**.

Evitar aplicar todos esses recursos a todos os componentes.

---

# 8. SISTEMA DE ÊNFASE EM 4 NÍVEIS

Criar quatro níveis visuais claros:

## Nível A — Canvas

Fundo principal e estrutura da página.

## Nível B — Surface

Áreas de trabalho: tabela, canvas de gráfico, painel de filtros, inspector.

## Nível C — Elevated

Modal, dropdown, inspector flutuante, command palette.

## Nível D — Spotlight

Elemento especial raro: lançamento atual, seleção crítica, hero de modelo, insight destacado.

Não usar aparência de Nível D em componentes de Nível B.

---

# 9. COR: EXPRESSIVA, MAS COM FUNÇÃO

Remover a regra rígida “90–95% neutro”.

Em vez disso, usar um sistema de cor por camadas:

```text
Base       = neutros
Brand UI   = acento principal do portal
Provider   = identidade de cada fornecedor
Semantic   = sucesso / warning / erro / informação
Data Viz   = escala própria para gráficos
Spotlight  = gradiente ou cor especial rara
```

A cor pode sim ser usada para beleza, desde que não destrua a hierarquia.

---

# 10. CYAN NÃO DEVE SER O ÚNICO IDIOMA VISUAL

O cyan pode continuar sendo parte da identidade do portal, mas hoje ele aparece em excesso.

Criar uma paleta de apoio mais sofisticada, por exemplo:

- cyan/sky para interação primária;
- violet/indigo para inteligência/raciocínio;
- emerald para eficiência/verified;
- amber para incerteza/custo;
- rose apenas para risco/erro;
- cores de provider para identificação.

Não transformar cada componente em arco-íris.

---

# 11. GRADIENTES SÃO PERMITIDOS

Gradientes não são proibidos.

Usar gradiente em:

- hero de um dossier;
- background atmosférico muito sutil;
- seleção de série em gráfico;
- spotlight de release recente;
- estados especiais.

Evitar:

- gradiente em toda badge;
- gradiente em todo card;
- gradiente em todo botão;
- múltiplos gradientes competindo na mesma dobra.

---

# 12. GLOW É PERMITIDO, MAS RARO

Glow pode ser usado em:

- foco selecionado no canvas histórico;
- ponto de release atual;
- hover de uma visualização complexa;
- estados de spotlight.

Não usar glow em:

- cada card;
- cada link;
- cada badge;
- cada botão;
- toda borda.

---

# 13. SOMBRAS

Reduzir o número de sombras diferentes.

Criar apenas aproximadamente três níveis:

```text
shadow-subtle
shadow-elevated
shadow-floating
```

Não usar sombra forte em elementos pequenos.

---

# 14. RAIOS

O problema não é “card arredondado”.

O problema é todos os elementos possuírem o mesmo arredondamento SaaS.

Criar hierarquia:

```text
4–6px   inputs, tabs, células interativas
8–10px  cards utilitários
12–14px painéis principais
16px+   apenas hero/spotlight quando fizer sentido
pill    somente chips, status e filtros compactos
```

---

# 15. TIPOGRAFIA

Reavaliar o uso universal de Inter.

Não trocar fonte por moda, mas testar se uma fonte de interface/editorial com mais personalidade melhora o portal.

Opções aceitáveis, se tecnicamente viáveis:

- manter Inter com melhor escala e tracking;
- Instrument Sans;
- IBM Plex Sans;
- Manrope;
- combinação de sans principal + JetBrains Mono para dados.

Se trocar, medir impacto em layout e performance.

---

# 16. ESCALA TIPOGRÁFICA

Definir tokens reais:

```text
Display
H1
H2
H3
Body Large
Body
Small
Caption
Mono Data
```

Hoje há muitos tamanhos arbitrários inline.

Reduzir valores soltos como `0.72rem`, `0.76rem`, `0.78rem`, `0.82rem`, etc. quando não há razão semântica.

---

# 17. NÚMEROS E DADOS

Usar JetBrains Mono ou fonte tabular para:

- preço;
- score;
- tokens;
- datas técnicas;
- IDs;
- contexto;
- latência;
- throughput.

Usar `font-variant-numeric: tabular-nums` onde fizer sentido.

Isso cria forte identidade de produto analítico.

---

# 18. EMOJIS

Não proibir todos.

Remover emojis principalmente de:

- títulos H1/H2;
- tabs principais;
- labels de seção;
- títulos de cards comuns.

Permitir emoji quando possuir função humana ou comunicativa clara:

- aviso;
- empty state;
- onboarding casual;
- conteúdo comunitário;
- pequeno detalhe de personalidade.

Preferir SVG consistente para navegação e UI estrutural.

---

# 19. ÍCONES

Criar um sistema coerente de ícones SVG com:

- mesmo `stroke-width`;
- mesma caixa;
- mesmo tamanho;
- mesma linguagem.

Evitar mistura de emoji + SVG + caracteres Unicode + ícones textuais na mesma hierarquia.

---

# 20. MICROCOPY

Reduzir títulos que parecem escritos por LLM.

Exemplos atuais a revisar:

```text
“Comparador Lado a Lado (Head-to-Head)”
“Roteador Inteligente de Modelos (Model Router)”
“Governança, Privacidade, ZDR & Fontes Auditáveis”
“Relatos da Comunidade & Comportamento de Engenharia”
“Disponibilidade por Plataforma & Catálogo OpenCode Go”
“Integridade & Auditoria Contínua (Data Health)”
```

Preferir títulos de produto curtos:

```text
Comparar
Router
Privacidade
Comunidade
Plataformas
Data Health
Histórico
Benchmarks
Modelos
Planos
```

Usar subtítulo para explicar.

---

# 21. NÃO REPETIR NO TÍTULO O QUE A NAVEGAÇÃO JÁ EXPLICA

Se o sidebar diz “Benchmarks & Performance”, o H1 não precisa dizer “Thinking & Benchmarks Explorer”.

Se a rota é `#plans`, o título pode simplesmente ser “Planos”.

---

# 22. MOTION DESIGN

Criar poucas animações, mas boas.

Preferir:

- fade/slide de 120–220ms;
- interpolação suave de gráfico;
- destaque de edge;
- expansão de inspector;
- underline de tab animada;
- transitions de seleção.

Evitar:

- card pulando para cima em todo hover;
- pulsação infinita sem necessidade;
- shimmer gratuito;
- animações em dezenas de itens simultaneamente.

Respeitar `prefers-reduced-motion`.

---

# 23. HOVER

Eliminar como padrão universal:

```css
transform: translateY(-2px)
```

Substituir conforme contexto por:

- mudança de surface;
- border contrast;
- highlight interno;
- accent line;
- small scale apenas em elementos realmente clicáveis e destacados.

---

# 24. INLINE STYLES

O portal ainda possui grande quantidade de `style="..."` e estilos gerados via template string.

Nesta tarefa:

- reduzir inline styles nas áreas tocadas;
- extrair padrões para classes;
- não fazer migração massiva irrelevante;
- impedir que `#history` novo seja implementado com dezenas de strings de CSS inline.

---

# 25. DESIGN TOKENS V2

Criar ou consolidar tokens para:

```text
surface-0
surface-1
surface-2
surface-3
border-subtle
border-strong
text-primary
text-secondary
text-muted
accent-primary
focus-ring
provider-*
shadow-*
radius-*
space-*
```

Compatível com dark e light.

---

# 26. DARK MODE

O dark mode pode continuar premium e atmosférico.

Evitar preto puro.

Usar superfícies com pequenas variações de luminância.

Uma pequena textura/gradiente ambiental no fundo pode ser usada, desde que quase imperceptível e sem efeito “neon AI”.

---

# 27. LIGHT MODE

O light mode não pode ser apenas “cards brancos em cinza claro”.

Criar:

- bom contraste;
- superfícies com profundidade delicada;
- borders refinadas;
- selected states fortes;
- data visualization legível.

---

# 28. SIDEBAR GLOBAL — POLISH PASS

Não redesenhar completamente a arquitetura de navegação.

Melhorar visualmente:

- reduzir emojis na estrutura principal;
- usar SVG consistente;
- diminuir badges promocionais persistentes;
- tornar grupos mais leves;
- melhorar active state;
- suavizar bordas e divisões;
- manter contadores discretos;
- melhorar spacing vertical.

---

# 29. HEADER GLOBAL — POLISH PASS

O header pode ficar mais sofisticado com:

- brand mark mais simples;
- search/command bar refinada;
- menos glow;
- melhor border-bottom;
- dropdowns com superfície elevada real;
- melhor alinhamento vertical.

Não precisa ficar totalmente flat.

---

# 30. COMPONENTE `VIEW HEADER` GLOBAL

Criar uma estrutura compartilhada para headers das páginas:

```text
Eyebrow opcional
H1 curto
Subtítulo de 1–2 linhas
Actions à direita
Metadata opcional
```

Remover estilos inline específicos de cada rota quando possível.

---

# 31. DASHBOARD — DIREÇÃO VISUAL

A Home deve parecer um “morning brief” de inteligência de modelos.

Priorizar:

1. o que mudou;
2. principais decisões;
3. destaques dinâmicos;
4. acesso rápido ao catálogo.

Reduzir a sensação de mural de KPI cards.

Pode haver um hero visual bonito e compacto, com um background atmosférico sutil.

---

# 32. DASHBOARD — HIERARQUIA

Limitar os highlights acima da dobra.

Não mostrar 8–10 caixas igualmente importantes.

Escolher:

- 1 insight principal;
- 2–4 supporting insights;
- demais informações como lista/rail.

---

# 33. MODELOS — DIREÇÃO VISUAL

`#models` deve parecer uma ferramenta de catálogo profissional.

Priorizar:

- tabela excelente;
- filtros compactos;
- provider marks;
- densidade regulável;
- frozen header;
- diferença visual entre model tier/status sem carnaval de badges.

---

# 34. MODELOS — TOOLBAR

Unificar busca, filtros e view mode numa toolbar limpa.

Evitar múltiplas linhas de chips competindo entre si.

Filtros raros podem ir em popover/painel “Mais filtros”.

---

# 35. DOSSIÊ DE MODELO — HERO MAIS FORTE

O dossier é um bom lugar para beleza visual.

Pode haver:

- provider color;
- gradiente muito sutil;
- logo/mark;
- nome grande;
- metadata alinhada;
- 2–4 métricas principais;
- badge excepcional (Preview/Open weights/etc.).

Evitar uma coleção de chips para tudo.

---

# 36. DOSSIÊ DE MODELO — ABAS

Remover emoji das tabs principais.

Usar:

```text
Visão geral
Desempenho
Preço & acesso
Histórico
Deploy
```

Com indicador ativo refinado.

---

# 37. PLANOS — DIREÇÃO VISUAL

`#plans` deve parecer um explorador de ofertas, não uma galeria de cards SaaS.

Usar:

- comparação estruturada;
- destaque para preço/limite;
- visão por empresa;
- tables/matrices onde forem superiores a cards;
- cards somente para resumo de plano.

---

# 38. PLANOS — PROVIDER BRANDING

Usar cores/logos de empresas com moderação para criar identidade.

Não aplicar um gradiente diferente em cada plano.

---

# 39. CASOS DE USO — DIREÇÃO VISUAL

Remover o badge `E — Calibrado` do título principal.

Colocar confidence/evidence dentro da metodologia ou resumo de decisão.

A visão deve parecer uma matriz de decisão, não um painel de classificação automática.

---

# 40. CASO DE USO — DOSSIÊ

Usar um cabeçalho narrativo:

```text
SaaS System Architecture
Prioridade: quality + coding + cost
```

Depois:

- ranking;
- sensibilidade;
- tradeoffs;
- recomendação.

Não colocar tudo em cards iguais.

---

# 41. COMPARADOR — DIREÇÃO VISUAL

`#compare` deve parecer um workspace analítico.

Remover “⚔️ Head-to-Head”.

Usar:

```text
Comparar
```

Fortalecer:

- reference model;
- pinned columns;
- deltas;
- highlight de diferenças;
- confidence strip;
- tabs de modo.

---

# 42. COMPARADOR — COR

Usar cor do provider/modelo em pequenas linhas, dots e séries de gráfico.

Não colorir toda a coluna.

---

# 43. ROUTER — DIREÇÃO VISUAL

O Router deve parecer um assistente de decisão, não um formulário com dezenas de chips.

Usar progressive disclosure:

1. tarefa;
2. restrições;
3. recomendação.

Pode haver stepper elegante.

---

# 44. BENCHMARKS — DIREÇÃO VISUAL

Fazer `#benchmarks` ser **chart-first**.

O gráfico é o protagonista.

Controles devem parecer ferramenta de análise:

- compactos;
- alinhados;
- não dominar a página.

---

# 45. BENCHMARKS — CARDS METODOLÓGICOS

Metodologia pode ficar em accordion ou inspector secundário.

Não ocupar a primeira dobra com várias caixas explicativas.

---

# 46. COMUNIDADE — DIREÇÃO VISUAL

A página deve parecer um feed editorial de evidências qualitativas.

Separar visualmente:

- relato;
- benchmark relacionado;
- confiança;
- divergência;
- caveat.

Evitar labels como `sourceType: community / calibrated` no H1.

---

# 47. FONTES — DIREÇÃO VISUAL

`#sources` deve parecer uma bibliografia interativa / catálogo de evidências.

Usar:

- tabela/lista;
- filtros;
- favicon/provider;
- tipo da fonte;
- data;
- confidence;
- acesso rápido.

Não precisa de um card por fonte.

---

# 48. PRIVACIDADE — DIREÇÃO VISUAL

Priorizar uma matriz comparável:

```text
Provider | Training | Retention | ZDR | Enterprise controls
```

Usar semântica de cor apenas onde útil.

Não exagerar em vermelho/verde.

---

# 49. PLATAFORMAS — DIREÇÃO VISUAL

Priorizar disponibilidade e relacionamento:

- plataforma;
- modelos;
- quotas;
- BYOK;
- região;
- privacidade.

Uma availability matrix pode ser mais clara que muitos cards.

---

# 50. DATA HEALTH — DIREÇÃO VISUAL

Data Health pode assumir estética de operations console.

Aqui é aceitável maior densidade.

Usar:

- status summary;
- mini trends;
- review queue;
- tabela;
- severity;
- freshness.

Não transformar cada métrica em KPI card colorido.

---

# 51. FERRAMENTAS — DIREÇÃO VISUAL

Simuladores e calculadoras devem compartilhar:

- form layout consistente;
- input groups;
- resultado destacado;
- tabela de cenários;
- warnings claros.

Evitar quatro cards pequenos para cada output quando um painel de resultados resolve.

---

# 52. `#history` É A PÁGINA-PILOTO DE MAIOR TRANSFORMAÇÃO

A estrutura factual do Prompt 11 deve ser preservada integralmente.

O redesign de History deve ser mais profundo que o polish global.

---

# 53. CONCEITO DE HISTORY

Nome conceitual:

> **Model History Atlas**

Não precisa necessariamente aparecer em inglês na UI.

O usuário deve sentir que está explorando um mapa temporal da indústria.

---

# 54. HISTORY — HERO COM PERSONALIDADE

Não fazer um hero enorme.

Mas permitir um topo bonito e distinto.

Sugestão:

```text
Histórico
Como as famílias de modelos evoluíram — e quando os saltos realmente aconteceram.

2024 ───────── 2025 ───────── 2026 ───── Hoje
```

Pode haver background atmosférico muito sutil com linhas temporais ou textura procedural leve.

Não usar blob neon.

---

# 55. HISTORY — KPIs

Os 8 KPIs criados no Prompt 11 são úteis, mas hoje repetem o padrão de card.

Substituir por uma `history-stat-strip` ou summary grid leve.

Pode possuir cor e ênfase, mas sem 8 caixas iguais com barras coloridas no topo.

---

# 56. HISTORY — TABS

Usar tabs refinadas:

```text
Linhagens
Linha do tempo
Benchmarks
```

Sem emoji.

Ativo pode usar underline animada ou pequeno background surface.

Não precisa obrigatoriamente ser “completamente flat”.

---

# 57. HISTORY — LAYOUT DESKTOP

Estrutura recomendada:

```text
┌ Provider Rail ┐ ┌────────── Temporal Canvas ──────────┐ ┌ Inspector ┐
│               │ │                                    │ │           │
│ OpenAI        │ │  tracks / nodes / relations        │ │ selected  │
│ Anthropic     │ │                                    │ │ node/edge │
│ Google        │ │                                    │ │           │
└───────────────┘ └────────────────────────────────────┘ └───────────┘
```

O inspector pode aparecer somente após seleção.

---

# 58. HISTORY — PROVIDER RAIL

Pode ter um pequeno dot/logo de provider.

Item selecionado pode usar:

- fundo translúcido discreto;
- barra lateral;
- provider accent.

Não precisa ser visualmente “invisível”.

---

# 59. HISTORY — CANVAS

O canvas deve ser uma superfície visual forte e bonita.

Pode possuir:

- grid temporal muito sutil;
- linhas verticais de ano/quarter;
- surface contrast;
- clipping;
- sticky time ruler;
- hover contextual.

Este é um dos “momentos visuais” permitidos do produto.

---

# 60. HISTORY — POSIÇÃO TEMPORAL REAL

Nós devem ser posicionados por data normalizada.

Não usar gap constante.

Criar `scaleDate()` ou função equivalente.

---

# 61. HISTORY — TRACKS

Tracks devem representar papéis/famílias de maneira clara.

Exemplo:

```text
Reasoning
General
Fast / Efficient
Open weights
Multimodal
```

Não inferir tracks inexistentes apenas para preencher layout.

---

# 62. HISTORY — NÓ DE MODELO

O nó deve ser compacto, mas bonito.

Não precisa ser somente texto cru.

Uma boa opção:

```text
● GPT-6 Astra
  Sep 03 · Flagship
```

Com:

- dot de provider;
- label;
- pequeno surface no selected/hover;
- halo discreto se atual/selecionado.

---

# 63. HISTORY — NÓ ATUAL

Modelos ativos/frontier atuais podem possuir diferenciação visual leve:

- maior contraste;
- dot sólido;
- pequena marca `Current` somente quando útil;
- halo ou ring sutil.

Não criar badge gigante `ACTIVE`.

---

# 64. HISTORY — EDGES

Representar visualmente a semântica do Prompt 11:

```text
solid   = relação verificada direta
short-dash = sucessão funcional/geracional
long-dash / dotted = inferida
```

Usar SVG.

---

# 65. HISTORY — EDGE HOVER

Ao hover/selecionar edge:

- aumentar contraste;
- destacar origem/destino;
- mostrar tipo;
- mostrar confidence;
- mostrar fonte.

Esse detalhe aumenta muito a sensação de ferramenta profissional.

---

# 66. HISTORY — INSPECTOR

Substituir modal genérico por inspector lateral quando possível.

Para modelo:

```text
GPT-6 Astra
OpenAI · GPT-6
03 Sep 2026

Role
Frontier flagship

Relation
Successor to GPT-5.6 Sol

Evidence
Verified · Official

Open dossier →
```

Para edge:

```text
Sol → Astra
Flagship-role successor
Verified
Source: OpenAI
Architectural descent: not established
```

---

# 67. HISTORY — TIMELINE

Abandonar feed de cards idênticos.

Usar formato editorial/changelog:

```text
SEP 2026

03   OpenAI       GPT-6 Astra released
02   Google       Gemini 3.8 Flash released
01   Anthropic    Claude Fable 5.1 released
```

Eventos maiores podem ter mais espaço.

Eventos menores ficam compactos.

---

# 68. HISTORY — HIERARQUIA DE EVENTOS

Criar níveis:

```text
major
standard
minor
```

Major:

- nova geração;
- flagship;
- lançamento importante;
- retirement;
- identity reveal.

Minor:

- benchmark update;
- pequena mudança de disponibilidade;
- metadata update.

---

# 69. HISTORY — EVENT DETAIL

Clique num evento abre inspector ou expansão inline.

Mostrar:

- descrição;
- fonte;
- tipo;
- data efetiva;
- entidade;
- impacto;
- links.

---

# 70. HISTORY — BENCHMARK HISTORY

Transformar a terceira aba em visualização temporal real.

Topo:

- benchmark selector;
- metric;
- effort;
- harness;
- provider/model filter.

Centro:

- gráfico temporal.

Base:

- runs table.

---

# 71. HISTORY — GRÁFICO DE BENCHMARK

Mostrar pontos/runs reais por data.

Tooltip:

```text
Model
Score
Effort
Harness
Run date
Source
Cost/task
```

Não ligar pontos de configurações incompatíveis sem explicação.

---

# 72. HISTORY — COMPARE ERAS

Implementar se couber no escopo sem comprometer o principal.

Permitir selecionar duas datas/períodos e derivar:

- modelos ativos;
- frontier leaders;
- contexto máximo;
- custos;
- famílias novas;
- modelos retirados;
- benchmark leaders.

Se ficar grande, deixar preparado como Phase 2.

---

# 73. HISTORY — EMPTY STATE

Ao filtrar até zero resultados:

não usar card genérico “Nenhum resultado encontrado”.

Usar empty state elegante e pequeno:

```text
Nenhuma linhagem corresponde a estes filtros.
Limpar filtros
```

---

# 74. HISTORY — MOBILE

Não tentar comprimir o canvas desktop inteiro.

No mobile:

- provider selector horizontal ou select;
- tracks em lista vertical;
- nós organizados cronologicamente;
- edges simplificadas;
- inspector como bottom sheet;
- timeline editorial continua vertical.

---

# 75. HISTORY — TABLET

Tablet pode manter canvas horizontal com scroll controlado e time ruler sticky.

Não permitir overflow quebrando a página inteira.

---

# 76. POLISH GLOBAL SEM REFAZER TODAS AS PÁGINAS

Além de `#history`, executar um polish global pequeno e consistente:

- headers;
- tabs;
- botões;
- badges;
- icons;
- hover;
- shadows;
- border radii;
- sidebar;
- typography;
- spacing;
- inline styles mais gritantes.

Não reescrever cada view do zero.

---

# 77. BADGES

Criar categorias claras:

```text
status
warning
confidence
plan/access
preview
open-weights
```

Não usar badge apenas porque um dado existe.

---

# 78. CHIPS

Chip deve significar:

- filtro selecionável;
- token removível;
- opção compacta.

Não usar chip como decoração ou subtítulo.

---

# 79. BOTÕES

Definir variantes:

```text
primary
secondary
ghost
danger
icon
```

Reduzir botões com estilos improvisados por página.

---

# 80. TABELAS

Melhorar todas as tabelas tocadas:

- header sticky;
- row hover sutil;
- alinhamento numérico;
- zebra apenas se útil;
- column separators discretos;
- sort state claro;
- selected row;
- density adequada.

---

# 81. GRÁFICOS

Padronizar Chart.js:

- gridlines discretas;
- tipografia consistente;
- tooltip premium;
- provider colors;
- selected series forte;
- séries não selecionadas mais silenciosas;
- legend refinada.

---

# 82. TOOLTIP GLOBAL

Criar estilo coerente para tooltips informativos.

Evitar `title` nativo como única explicação em funcionalidades importantes.

---

# 83. MODAIS E DRAWERS

Unificar:

- backdrop;
- radius;
- shadow;
- header;
- close button;
- spacing;
- mobile behavior.

Não criar um modal visualmente diferente por feature.

---

# 84. FOCUS E TECLADO

Todo elemento interativo novo precisa:

- focus visible;
- Enter/Space;
- Escape para fechar inspector/modal;
- Tab order correto;
- ARIA apropriada.

---

# 85. ACCESSIBILITY DE COR

Cor nunca deve ser único canal para:

- relation type;
- status;
- confidence;
- selected state.

Usar também:

- padrão de linha;
- label;
- ícone;
- weight;
- shape.

---

# 86. PERFORMANCE

O redesign não pode tornar a página lenta.

Evitar:

- centenas de box-shadows pesadas;
- filtros blur em listas grandes;
- animações simultâneas;
- SVG com elementos desnecessários;
- rerender completo em cada hover.

---

# 87. SVG HISTORY

Se usar SVG para edges:

- separar camada de edges e nodes;
- atualizar somente quando layout/filtro mudar;
- não redesenhar em cada movimento de mouse;
- usar `requestAnimationFrame` quando necessário.

---

# 88. RESPONSIVE VISUAL TESTING

Validar manualmente:

```text
360
390
480
768
1024
1280
1440
1920
```

Não precisa screenshot de todas, mas precisa inspeção visual.

---

# 89. CONTEÚDO LONGO

Testar:

- nomes longos de modelos;
- nomes longos de providers;
- várias aliases;
- 10+ tracks;
- 20+ events no mesmo mês;
- tabelas largas;
- muitos filtros ativos.

---

# 90. TEXT WRAPPING

Não permitir:

- badges estourando cards;
- labels sobrepostas;
- nodes ilegíveis;
- datas quebrando em duas linhas sem necessidade.

---

# 91. VISUAL QA — NÃO APROVAR SEM COMPARAÇÃO

Antes de finalizar, colocar screenshots `before` e `after` lado a lado e responder:

1. O foco visual ficou mais claro?
2. Existe menos repetição de card?
3. A página continua bonita?
4. Existe mais identidade?
5. Os dados principais estão mais rápidos de ler?
6. O mobile ficou melhor?
7. Dark e light parecem igualmente intencionais?
8. Alguma área ficou excessivamente minimalista?
9. Alguma área ainda parece template de IA?
10. O portal inteiro ainda parece o mesmo produto?

Se alguma resposta crítica for “não”, iterar.

---

# 92. CHECKLIST “CARA DE IA ANTIGA”

Procurar explicitamente:

- emoji em todo heading;
- glow em todo hover;
- cards idênticos em grid automático;
- gradiente azul/roxo sem função;
- texto “inteligente”, “poderoso”, “avançado”, “definitivo” sem necessidade;
- pills para metadata comum;
- 4 KPIs gigantes em qualquer contexto;
- border-radius alto em tudo;
- icon + label + subtitle em cada pequeno bloco;
- excesso de `rgba(..., 0.1)` colorido;
- sombras em componentes minúsculos;
- títulos explicativos demais;
- excesso de badges de evidência expostos o tempo todo.

Eliminar onde não houver justificativa.

---

# 93. CHECKLIST “MINIMALISMO EXCESSIVO”

Também procurar:

- página sem contraste;
- tudo cinza;
- sem foco visual;
- ausência total de identidade de provider;
- gráficos sem destaque;
- hero sem presença;
- estados selecionados fracos;
- interface parecendo documentação crua;
- ausência de profundidade em modal/drawer;
- nenhum momento visual memorável.

Corrigir igualmente.

---

# 94. BEAUTY BUDGET

Cada página pode ter **1 ou 2 momentos de maior expressão visual**.

Exemplos:

```text
Dashboard   -> hero/insight principal
Model       -> hero do dossier
Benchmarks  -> gráfico principal
History     -> temporal canvas
Plans       -> comparação de pricing
Comparator  -> matrix + delta visualization
```

O restante deve apoiar esses momentos.

---

# 95. IDENTIDADE POR TIPO DE PÁGINA

Não forçar todas as views a usar exatamente a mesma composição.

Consistência deve vir de:

- tokens;
- tipografia;
- controls;
- surfaces;
- motion;
- spacing.

Personalidade pode variar por função.

---

# 96. COMPONENTIZAÇÃO CSS

Criar classes reutilizáveis reais para padrões que surgirem nesta tarefa.

Sugestão:

```text
.page-heading
.page-heading__eyebrow
.page-heading__title
.page-heading__subtitle
.view-tabs
.view-tab
.surface-panel
.data-toolbar
.metric-strip
.entity-mark
.inspector-panel
.status-dot
```

Evitar apenas renomear classes antigas sem consolidar comportamento.

---

# 97. NÃO REESCREVER PARA FRAMEWORK

Continuar Vanilla JS/CSS.

Não introduzir React, Vue, Tailwind ou framework visual apenas para este redesign.

---

# 98. ORGANIZAÇÃO DO CSS

Ao tocar `style.css`, reduzir duplicações.

Se fizer sentido, extrair estilos da nova gramática para arquivo próprio, por exemplo:

```text
styles/
  foundations.css
  components.css
  history.css
```

Somente se o carregamento e GitHub Pages continuarem simples.

Não fazer migração massiva irrelevante.

---

# 99. TESTES FUNCIONAIS

Após redesign validar:

- todas as rotas continuam abrindo;
- hash navigation funciona;
- back/forward funciona;
- deep links de History funcionam;
- filtros persistem quando esperado;
- inspector abre/fecha;
- tabs funcionam;
- gráficos renderizam;
- modais não quebram;
- tema alterna;
- mobile nav funciona.

---

# 100. TESTES DE HISTORY

Adicionar testes onde viável para:

- `scaleDate()`;
- ordenação de nodes;
- edge mapping;
- filter state;
- deep link state;
- seleção de provider;
- selected model/edge;
- fallback mobile.

Não testar pixels via unit test.

---

# 101. VISUAL REGRESSION

Se tecnicamente viável com a stack atual, adicionar smoke screenshots com Playwright/Puppeteer em CI.

Prioridade:

```text
#dashboard
#models
#model/gpt-6-astra
#plans
#compare
#benchmarks
#history
#data-health
```

Se adicionar dependência for pesado demais, documentar procedimento manual de screenshots.

---

# 102. CRITÉRIO DE ACEITAÇÃO — HISTORY

History só está concluída se:

- não parecer mais uma lista de cards;
- datas possuírem posição temporal útil;
- providers forem fáceis de navegar;
- relations forem visualmente compreensíveis;
- verified/inferred forem distinguíveis;
- seleção abrir contexto detalhado;
- timeline parecer cronologia editorial;
- benchmark history mostrar evolução temporal;
- mobile for utilizável;
- visual for claramente mais bonito que a versão anterior.

---

# 103. CRITÉRIO DE ACEITAÇÃO — PORTAL GLOBAL

O polish global só está concluído se:

- headers principais estiverem mais curtos;
- emojis estruturais tiverem sido reduzidos;
- icons tiverem maior consistência;
- tabs estiverem mais refinadas;
- badges tiverem significado real;
- cyan não dominar todas as views;
- hover não depender sempre de `translateY`;
- surfaces possuírem hierarquia;
- dark/light estiverem coerentes;
- o portal continuar reconhecível.

---

# 104. CRITÉRIO DE ACEITAÇÃO — BELEZA

Não aceitar “mais clean” como justificativa suficiente.

O agente deve conseguir apontar concretamente:

- qual é o focal point de cada página principal;
- qual é a assinatura visual de History;
- onde cor cria identidade;
- onde profundidade foi preservada;
- quais microinterações elevam o acabamento;
- por que a composição parece deliberada.

---

# 105. FASE A — AUDITORIA E SCREENSHOTS

1. navegar todas as rotas;
2. capturar referências;
3. listar padrões repetidos;
4. classificar problemas em global vs local;
5. não alterar código ainda.

---

# 106. FASE B — FOUNDATIONS

1. refinar tokens;
2. typography scale;
3. surfaces;
4. shadows;
5. radii;
6. icons;
7. buttons;
8. tabs;
9. page headings.

---

# 107. FASE C — POLISH GLOBAL

Aplicar foundations em:

- header;
- sidebar;
- view headers;
- tabs;
- buttons;
- badges;
- tables.

Sem redesenhar features.

---

# 108. FASE D — HISTORY ATLAS

Implementar:

- hero/history header;
- stat strip;
- provider rail;
- temporal ruler;
- canvas;
- nodes;
- edges;
- inspector.

---

# 109. FASE E — TIMELINE

Transformar timeline em changelog editorial hierárquico.

---

# 110. FASE F — BENCHMARK HISTORY

Criar visual temporal + run table.

---

# 111. FASE G — RESPONSIVE E A11Y

Testar desktop/tablet/mobile e teclado.

---

# 112. FASE H — VISUAL QA

Comparar screenshots antes/depois.

Iterar pelo menos uma vez depois da primeira implementação visual.

Não encerrar no primeiro passe.

---

# 113. FASE I — TESTES E DOCUMENTAÇÃO

Executar testes existentes, smoke routes e documentar decisões visuais.

---

# 114. RELATÓRIO FINAL DO AGENTE

Ao terminar, entregar:

## Visual audit
- principais problemas encontrados por rota.

## Foundations
- tokens e componentes alterados.

## History redesign
- estrutura e interação implementadas.

## Global polish
- quais páginas receberam ajustes leves.

## Screenshots
- before/after ou caminho dos artefatos.

## Accessibility
- teclado/mobile/reduced-motion.

## Performance
- impacto e decisões.

## Tests
- comandos executados e resultado.

## Deferred
- itens não implementados e motivo.

---

# 115. PRINCÍPIO FINAL

O objetivo não é fazer um portal “sem cara de IA” por meio de remoção indiscriminada.

O objetivo é fazer um produto que demonstre **gosto, intenção e composição**.

A diferença deve ser percebida assim:

```text
ANTES
muitos componentes bonitos isoladamente,
mas todos usando o mesmo volume visual.

DEPOIS
uma interface com ritmo,
foco,
contraste,
personalidade,
visualizações próprias,
e detalhes refinados.
```

A frase-guia desta implementação é:

> **Menos efeitos repetidos. Mais direção de arte.**

E, para `#history` especificamente:

> **Não mostrar uma lista sobre história. Fazer o usuário enxergar a história.**
