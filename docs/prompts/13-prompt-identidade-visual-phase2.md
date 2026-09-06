# PROMPT 13 — IDENTIDADE VISUAL AUTORAL, ART DIRECTION E REFINAMENTO FASE 2

> Snapshot: **06/09/2026 — BRT**  
> Repositório: `wesleytakatsu/comparacao-modelos`  
> Branch alvo: `main`  
> Base observada: commit `6385796bb23984f0d880f6d1df16de9a8d784508` ou posterior.  
> Pré-requisito: Prompt 12 já implementado e auditado em `docs/audits/2026-09-06-prompt12-humanizacao-visual.md`.

---

# 0. MISSÃO

Você está entrando na **segunda fase de direção visual** do portal.

O Prompt 12 resolveu a maior parte dos sintomas de “dashboard genérico feito por IA antiga”:

- removeu grande parte dos emojis estruturais;
- encurtou títulos;
- criou Foundations v2;
- criou o Model History Atlas;
- transformou KPIs em stat strip;
- criou timeline editorial;
- criou gráfico temporal de benchmarks;
- melhorou dark/light/mobile;
- substituiu vários hovers e badges genéricos;
- adicionou QA visual real.

**Não desfazer essas melhorias.**

A missão agora é diferente:

> **transformar um produto técnico já competente em um produto visualmente autoral, memorável, sofisticado e coerente.**

Não queremos apenas “menos cara de IA”.

Queremos que alguém veja a interface e perceba que existe uma **direção de arte própria**.

---

# 1. REGRA PRINCIPAL

Não interpretar esta fase como:

- remover toda cor;
- deixar tudo branco/cinza;
- achatar toda profundidade;
- transformar o portal em documentação crua;
- copiar Linear, Vercel, GitHub, Stripe, Raycast ou qualquer outro produto;
- redesenhar por moda;
- encher de animação;
- criar outra camada de CSS por cima da camada Prompt 12 sem limpar o legado.

A meta é:

> **expressão concentrada + sistema coerente + informação legível.**

---

# 2. AUDITORIA OBRIGATÓRIA ANTES DE EDITAR

Antes de escrever CSS:

1. rode o portal localmente;
2. execute `./scripts/visual-smoke.sh`;
3. navegue manualmente com Browser Harness;
4. capture screenshots atuais;
5. revise no mínimo:
   - `#dashboard`;
   - `#models`;
   - um `#model/:id` complexo;
   - `#plans`;
   - `#use-cases`;
   - `#compare`;
   - `#router`;
   - `#benchmarks`;
   - `#history?tab=lineages`;
   - `#history?tab=timeline`;
   - `#history?tab=benchmarks`;
   - `#community`;
   - `#sources`;
   - `#privacy`;
   - `#platforms`;
   - `#data-health`;
   - pelo menos um dossier de provider/plano/benchmark/caso de uso.

Verificar em:

- 1440×1000;
- 1024×900;
- 390×844;
- dark;
- light.

Não declarar “melhor” sem comparação screenshot a screenshot.

---

# 3. DIAGNÓSTICO ATUAL — O QUE AINDA ENTREGA O LEGADO

Mesmo após o Prompt 12, ainda há inconsistências claras.

## 3.1 O shell global ainda parece pertencer à versão antiga

No estado atual:

- o logo/brand icon continua sendo `⚡`;
- o ícone está dentro de uma caixa com gradiente/glow;
- a busca do header ainda usa `🔍`;
- a busca é uma pill arredondada;
- o header continua com `backdrop-filter: blur(...)` e glassmorphism;
- menus secundários ainda usam emojis;
- a identidade cyan continua forte no shell.

O History Atlas já fala uma linguagem mais madura, mas é acessado através de um shell visual antigo.

**Isto é prioridade P0.**

## 3.2 O CSS ainda possui dois sistemas sobrepostos

`style.css` mantém:

- design tokens antigos;
- glassmorphism;
- sombras e glows antigos;
- Foundations v2 anexado ao final;
- overrides do Prompt 12.

Isto gera drift visual.

A Fase 2 deve começar a **consolidar**, não apenas adicionar novos overrides.

## 3.3 O Atlas ainda conserva mini-cards

`.atlas-node` ainda é aproximadamente:

- 164×44 px;
- background;
- border;
- radius;
- shadow.

A ideia do Atlas deve avançar para uma representação mais cartográfica/editorial.

## 3.4 Gráficos e tabelas ainda não possuem assinatura visual única

Chart.js e tabelas são funcionais, porém ainda parecem componentes utilitários diferentes do restante da direção visual.

## 3.5 A tipografia é competente, mas muito neutra

Inter funciona, porém sozinha não cria identidade.

Não trocar obrigatoriamente.

**Testar antes de decidir.**

---

# 4. OBJETIVO VISUAL

O portal deve combinar quatro qualidades:

1. **observatório técnico** — precisão;
2. **produto editorial** — hierarquia e ritmo;
3. **ferramenta analítica** — densidade sem ruído;
4. **marca própria** — reconhecimento visual.

Palavras-alvo:

- preciso;
- elegante;
- tecnológico;
- editorial;
- profundo;
- confiável;
- contemporâneo;
- autoral.

Palavras a evitar:

- gamer;
- cyberpunk;
- neon;
- SaaS template;
- corporate genérico;
- dashboard admin;
- landing page de startup IA 2023.

---

# 5. BEAUTY BUDGET

Cada view pode ter **1 ou 2 momentos de expressão visual forte**.

Exemplos:

- Dashboard → intelligence brief / headline insight;
- Model dossier → hero do modelo;
- Benchmarks → gráfico principal;
- History → temporal canvas;
- Plans → comparação/pricing;
- Comparator → matrix/delta visualization;
- Data Health → operations console.

Nunca distribuir glow, gradiente, shadow e badges por todos os elementos.

A beleza deve ser **composicional**.

---

# 6. FASE A — NOVA IDENTIDADE DO SHELL GLOBAL

## 6.1 Criar um logomark próprio

Substituir o emoji `⚡` como identidade primária.

Criar um pequeno SVG inline autoral baseado em conceitos do produto, por exemplo:

- dois ou três nós conectados;
- linha temporal + ponto;
- interseção de comparação;
- coordenadas/atlas.

Requisitos:

- funcionar a 16, 20, 24 e 32 px;
- funcionar monocromático;
- funcionar em dark/light;
- não depender de gradiente para ser reconhecível;
- gerar favicon coerente;
- evitar cérebro, robô, raio, estrela ou sparkle como símbolo principal.

Não usar ícone pronto de biblioteca como marca.

## 6.2 Refinar wordmark

Reavaliar visualmente:

`Portal de Inteligência de Modelos`

Sem obrigatoriamente renomear o produto.

Objetivos:

- reduzir aspecto institucional/genérico;
- criar hierarquia mais limpa entre nome e descriptor;
- testar se subtitle permanente é necessário.

## 6.3 Header

Migrar de “glass header SaaS” para um header mais sólido e preciso.

Testar:

- menos blur;
- sombra mínima ou nenhuma;
- divider real;
- altura 56–60 px;
- background opaco/semiopaco controlado;
- brand à esquerda;
- command search central/left;
- ações mínimas à direita.

Glass pode existir, mas não deve ser a identidade.

## 6.4 Command search

Remover `🔍` estrutural.

Usar SVG consistente.

A caixa pode ser arredondada, mas não deve parecer uma pill decorativa.

Sugestão:

- radius 8–10 px;
- ícone + label + shortcut;
- border subtle;
- hover sem glow.

## 6.5 Menu de três pontos

Substituir emojis de menu por SVGs monocromáticos.

O menu deve parecer parte do mesmo sistema do sidebar.

---

# 7. FASE B — SIDEBAR COMO NAVEGAÇÃO DE PRODUTO MADURO

O Prompt 12 já substituiu os emojis principais por SVG.

Agora melhorar:

- ritmo vertical;
- grupos;
- selected state;
- contadores;
- densidade;
- alinhamento ótico dos ícones;
- zone labels.

## 7.1 Active state

Evitar:

- fundo muito chamativo;
- glow;
- pill completa.

Preferir:

- barra lateral curta;
- tonal shift da surface;
- icon/text contrast;
- talvez provider/action accent muito discreto.

## 7.2 Badges da sidebar

`USD/BRL`, contadores e similares devem parecer metadata.

Não usar cores saturadas sem necessidade.

## 7.3 Collapsed mode opcional

Avaliar um modo estreito do sidebar em desktop grande.

Só implementar se realmente melhorar o espaço útil.

Não adicionar complexidade apenas por estética.

---

# 8. FASE C — CONSOLIDAR O DESIGN SYSTEM V2

Não continuar anexando infinitas regras ao final de `style.css`.

Criar uma migração progressiva.

Estrutura recomendada, se não prejudicar GitHub Pages:

```text
styles/
  tokens.css
  base.css
  shell.css
  components.css
  data-viz.css
  views-history.css
  responsive.css
```

Ou outra divisão equivalente.

Se o split gerar risco desnecessário, pelo menos reorganizar `style.css` internamente e eliminar regras mortas.

## 8.1 Tokens

Separar explicitamente:

- canvas;
- surface;
- elevated;
- floating;
- border;
- text;
- action;
- semantic status;
- provider color;
- data-viz series.

Não misturar `accent-cyan` com tudo.

## 8.2 Raios

Reduzir variedade.

Escolher no máximo três famílias:

- small controls;
- panels;
- pill somente quando semanticamente pill.

## 8.3 Sombras

Definir 3 níveis reais:

- subtle;
- elevated;
- overlay.

Eliminar shadows decorativas sem função.

---

# 9. FASE D — TYPOGRAPHY BAKE-OFF

Não trocar a fonte no escuro.

Criar screenshots comparativos em 3 combinações, por exemplo:

### Opção A
Inter + JetBrains Mono.

### Opção B
Instrument Sans + JetBrains Mono.

### Opção C
IBM Plex Sans + JetBrains Mono.

Ou equivalentes open/free adequados.

Comparar:

- Dashboard;
- Model dossier;
- History;
- tabela densa;
- mobile.

Avaliar:

- legibilidade;
- personalidade;
- largura;
- números;
- títulos;
- sensação editorial.

Escolher por screenshot, não por preferência abstrata.

Também testar alternativa conservadora:

- manter Inter no body;
- usar uma display face apenas em títulos/hero.

---

# 10. FASE E — HISTORY ATLAS 2.0

Esta é a evolução de maior impacto.

## 10.1 Nós label-first

Estado padrão do modelo deve ser mais próximo de:

```text
● GPT-6 Astra
  03 set 2026
```

Sem caixa completa obrigatória.

Surface/border aparece apenas em:

- hover;
- seleção;
- current;
- warning/inferred especial.

Objetivo:

> o Atlas deve parecer um mapa de informação, não um board de cards.

## 10.2 Âncora temporal

Adicionar stem/anchor discreto ligando o nó à sua posição temporal real.

Isso melhora a leitura de datas quando labels precisam deslocar para evitar colisões.

## 10.3 Collision layout

Evitar que o posicionamento temporal force labels sobrepostas.

Implementar algoritmo simples e determinístico para:

- offset vertical;
- stagger;
- label displacement;
- stem até data real.

Não mover a data real para “caber”.

## 10.4 Current model

O estado `current` pode ser um dos beauty moments.

Usar com moderação:

- halo baixo;
- ring de provider;
- pequena label current;
- nenhuma animação infinita chamativa.

## 10.5 Major releases

Permitir que certos lançamentos realmente estruturais ganhem peso visual maior.

Critérios baseados em dados/event tier, não hardcode arbitrário.

## 10.6 Canvas

Reavaliar se o canvas precisa continuar sendo uma caixa arredondada com shadow.

Testar duas versões:

- panel integrado;
- full-bleed dentro da coluna de conteúdo.

Escolher por screenshot.

## 10.7 Provider rail

Manter funcional, mas torná-la mais rica editorialmente.

Pode incluir:

- provider mark;
- família;
- número de releases;
- pequeno indicador temporal.

Não transformar em card list.

---

# 11. FASE F — COMPARE ERAS (PRIORIDADE ALTA)

Esta feature foi adiada no Prompt 12.

Agora deve ser uma das prioridades.

## 11.1 UX

Adicionar modo:

`Comparar eras`

Usuário escolhe duas datas/períodos:

```text
Mar 2025  →  Set 2026
```

## 11.2 Mostrar deltas reais

Exemplos derivados de dados existentes:

- modelos ativos;
- providers ativos;
- maior contexto;
- menor preço de input/output;
- melhor benchmark comparável;
- velocidade;
- open-weight frontier;
- quantidade de famílias;
- principais lançamentos entre as datas.

## 11.3 Visual

Não usar 8 cards de delta.

Criar uma composição tipo editorial split:

```text
MAR 2025                 SET 2026
18 modelos      →        48 modelos
200k contexto   →        1.05M
...
```

Com mini-lines e destaques somente onde relevante.

## 11.4 Mudanças de liderança

Mostrar:

- quem liderava benchmark X;
- quem lidera agora;
- diferença;
- se benchmark/metodologia mudou.

Nunca comparar versões incompatíveis como se fossem a mesma métrica.

---

# 12. FASE G — INDUSTRY TEMPO

Criar uma visualização opcional de ritmo de lançamentos.

Exemplo:

- releases por mês;
- major releases por quarter;
- tempo médio entre flagships;
- concentração por provider.

Pode evoluir a escala do hero para uma **release-density rug/histogram**.

Isto deve ser informativo, não decorativo.

---

# 13. FASE H — BENCHMARK HISTORY MAIS CIENTÍFICO E BONITO

O gráfico temporal atual foi uma ótima evolução.

Agora adicionar contexto metrológico.

## 13.1 Anotações de regime

Marcar visualmente:

- mudança de versão do benchmark;
- mudança de harness;
- mudança de leaderboard;
- revisão metodológica;
- re-run oficial.

Usar linhas/bandas verticais discretas.

## 13.2 Confidence interval

Quando disponível:

- mostrar CI;
- não esconder incerteza.

## 13.3 Point shape

Usar forma/outline para codificar:

- official;
- independent;
- inferred/derived;
- effort/harness quando necessário.

Não depender só de cor.

## 13.4 Tooltips editoriais

Tooltip deve responder rapidamente:

- modelo;
- configuração;
- score;
- benchmark/version;
- date;
- source;
- harness;
- cost/task quando houver.

---

# 14. FASE I — DATA VISUALIZATION SYSTEM GLOBAL

Criar uma assinatura comum para todos os Chart.js.

Padronizar:

- font;
- legend;
- tooltip;
- grid;
- axis;
- line width;
- point size;
- hover;
- annotations;
- colors.

Evitar gráfico “Chart.js default com palette trocada”.

Criar `DATAVIZ_PALETTE` e helpers reutilizáveis.

Separar:

- provider colors;
- categorical series;
- sequential scale;
- positive/negative;
- selected/reference.

---

# 15. FASE J — TABELAS COMO PARTE DA IDENTIDADE

As tabelas são fundamentais no portal.

Elas devem deixar de ser apenas utilitárias.

Implementar/refinar:

- sticky header consistente;
- alinhamento numérico à direita;
- tabular nums;
- row hover sutil;
- selected row;
- density confortável;
- zebra apenas se realmente ajudar;
- frozen first column em tabelas muito largas quando viável;
- tooltip/nota de unidade no header;
- separadores de grupos;
- N/D discreto;
- winner highlight sem medalha/emoji.

Não transformar cada célula em badge.

---

# 16. FASE K — MODEL DOSSIER POLISH

O dossier deve ser um dos pontos mais bonitos do portal.

## 16.1 Hero

Permitir branding por provider/model de modo controlado.

Pode usar:

- provider color;
- gradiente delicado;
- marca geométrica;
- key metrics.

Evitar avatar em “quadradinho SaaS” se não agregar.

## 16.2 Metadata

Aliases, arquitetura, lançamento e status devem ser tratados como metadata editorial.

Não voltar a chips/emojis excessivos.

## 16.3 Tabs

Manter tabs sem emoji.

Melhorar active transition e overflow mobile.

---

# 17. FASE L — DASHBOARD COMO INTELLIGENCE BRIEF

O início deve parecer um briefing de inteligência, não um grid de KPIs.

Prioridades:

1. “o que mudou”;
2. recomendações úteis;
3. principais líderes por dimensão;
4. atalhos para exploração.

Criar assimetria de layout.

Evitar `repeat(auto-fit, minmax(...))` como solução visual para tudo.

---

# 18. FASE M — PLANS / COMPARATOR / ROUTER

## Plans

Migrar gradualmente de galeria de planos para:

- pricing matrix;
- tradeoff bands;
- availability;
- quota visualization.

## Comparator

Aparência de workspace analítico.

- modelo de referência claro;
- diferenças enfatizadas;
- iguais despriorizados;
- micro-viz quando ajudar.

## Router

Reduzir aparência de “quiz de chips”.

Usar progressive disclosure.

Pode usar cards de intenção somente na primeira escolha se houver ganho real.

Etapas seguintes devem parecer formulário/decisão, não gamificação.

---

# 19. FASE N — MICROCOPY EDITORIAL

Padronizar voz.

Evitar misturas gratuitas como:

- “Head-to-Head”;
- “Sweet Spot”;
- “Ultra”;
- “Frontier #1”;
- “inteligente”;
- “máxima qualidade absoluta”;
- “campeão”;
- “veredito” em excesso.

Manter inglês apenas quando é termo técnico estabelecido:

- benchmark;
- harness;
- context window;
- ZDR;
- pass@k;
- etc.

Interface deve soar como produto técnico sério, não como texto promocional de IA.

---

# 20. FASE O — MOTION DESIGN

Criar uma linguagem de movimento pequena e coerente.

Movimentos permitidos:

- tab underline;
- inspector enter/exit;
- timeline expand;
- graph selection;
- count/delta transition curta;
- hover de node/edge.

Evitar:

- pulse infinito;
- floating cards;
- translateY universal;
- parallax;
- shimmer gratuito.

Tudo deve respeitar `prefers-reduced-motion`.

---

# 21. FASE P — MOBILE DE VERDADE

Não tratar mobile como desktop empilhado.

Para `#history`:

- rail → horizontal selector;
- canvas → scroll controlado;
- inspector → bottom sheet real;
- ações importantes sticky;
- tooltip → tap-friendly;
- labels sem clipping.

Para tabelas:

- escolher conscientemente entre scroll, priority columns ou card detail;
- não converter todas as tabelas automaticamente em cards.

---

# 22. LOADING / EMPTY / ERROR STATES

Substituir spinners genéricos quando possível por skeletons/contextual states.

Estados vazios devem explicar:

- por que não há resultado;
- qual filtro causou;
- como recuperar.

Sem emojis gigantes por reflexo.

---

# 23. VISUAL QA RUBRIC

Antes de finalizar, dar nota de 1–5 para cada view principal em:

1. composição;
2. hierarquia;
3. legibilidade;
4. consistência;
5. identidade;
6. data-viz;
7. micro-interação;
8. mobile;
9. dark/light;
10. ausência de clichês de dashboard IA.

Nenhuma rota crítica pode ter nota < 4 em:

- legibilidade;
- consistência;
- dark/light;
- mobile.

History deve ter >= 4 em identidade e composição.

---

# 24. TESTE “FEITO POR IA?”

Para cada screenshot, perguntar:

- há cards demais?
- há radius demais?
- há pills demais?
- há cyan demais?
- há glow demais?
- o layout parece derivado de `auto-fit`?
- todos os blocos têm o mesmo peso?
- o texto parece marketing gerado?
- há emojis estruturais?
- o gráfico parece default?
- os números parecem cards de KPI genéricos?

Se sim, revisar.

---

# 25. TESTE “FICOU SEM GRAÇA?”

Também perguntar:

- existe focal point?
- há algum momento memorável?
- providers têm identidade?
- o History parece um Atlas?
- os dossiers parecem próprios do modelo/provider?
- os gráficos têm assinatura?
- dark mode tem profundidade?
- light mode parece premium e não “admin dashboard branco”?

Se não, revisar.

---

# 26. CRITÉRIOS DE ACEITAÇÃO — SHELL

Considerar pronto somente quando:

- `⚡` não for mais o logomark principal;
- search/menu não dependerem de emoji;
- header tiver linguagem visual v2;
- sidebar e header parecerem do mesmo produto que o History Atlas;
- shell funcionar em dark/light/mobile;
- não houver regressão de navegação.

---

# 27. CRITÉRIOS DE ACEITAÇÃO — HISTORY

Considerar pronto somente quando:

- default nodes forem label-first ou justificadamente superiores;
- posição temporal continuar rigorosa;
- collision layout não adulterar a data;
- relations continuam semanticamente corretas;
- inspector continua auditável;
- Compare Eras estiver implementado ou houver justificativa técnica explícita;
- benchmark history mostrar mudanças metodológicas quando disponíveis;
- mobile não depender de zoom do navegador;
- o Atlas tiver identidade própria.

---

# 28. CRITÉRIOS DE ACEITAÇÃO — GLOBAL

- zero regressões nas rotas;
- `npm test` passa;
- visual smoke passa;
- dark/light reais, não screenshots falsos;
- sem console errors;
- sem overflow horizontal da página;
- foco visível;
- reduced motion;
- contraste adequado;
- sem dependência frontend pesada nova sem justificativa.

---

# 29. ARTEFATOS OBRIGATÓRIOS

Ao concluir:

1. commit da implementação;
2. relatório em `docs/audits/` com:
   - before/after;
   - decisões de direção de arte;
   - fontes testadas;
   - alterações de shell;
   - mudanças no Atlas;
   - Compare Eras;
   - QA dark/light/mobile;
   - itens adiados;
3. screenshots locais organizados;
4. comandos para reproduzir visual smoke;
5. lista de arquivos modificados.

---

# 30. ORDEM RECOMENDADA DE EXECUÇÃO

1. screenshot baseline;
2. shell + logomark;
3. consolidar tokens/surfaces;
4. font bake-off;
5. Atlas label-first;
6. collision/stems;
7. Compare Eras;
8. benchmark annotations;
9. data-viz system;
10. tables;
11. model dossier polish;
12. dashboard/comparator/router/plans polish;
13. mobile;
14. dark/light;
15. screenshot matrix final;
16. visual rubric;
17. tests;
18. audit report.

---

# 31. CONCLUSÃO NORMATIVA

O Prompt 12 fez o portal deixar de parecer um dashboard antigo.

O Prompt 13 deve fazer o portal deixar de parecer **um dashboard bem arrumado** e passar a parecer **um produto com autoria visual**.

A régua final não é:

> “ficou mais minimalista?”

Nem:

> “ficou mais colorido?”

A régua é:

> **a interface parece ter sido desenhada intencionalmente para este produto, para estes dados e para este público?**

Se a resposta não for claramente “sim”, continue refinando.
