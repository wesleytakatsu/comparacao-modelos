# PROMPT 12 — HUMANIZAÇÃO VISUAL DO PORTAL E REDESIGN EDITORIAL DE `#history`

> Snapshot do plano: **05/09/2026 — BRT**  
> Página piloto: `https://wesleytakatsu.github.io/comparacao-modelos/#history`  
> Repositório: `https://github.com/wesleytakatsu/comparacao-modelos`  
> Branch alvo: `main`  
> Base técnica observada antes deste plano: commit `01deb90fe9102e13781a0b3301ce1505f8055565` ou posterior.  
> Objetivo: **retirar a aparência de “dashboard feito por IA”, criar uma identidade visual mais humana, editorial e técnica, e usar `#history` como página-piloto dessa evolução sem destruir a densidade de informação nem reescrever a arquitetura do portal.**

---

# 0. PAPEL DO AGENTE

Você é um **designer de produto sênior com forte experiência em interfaces técnicas, visualização de dados, UX editorial, sistemas de design e frontend Vanilla JS**, trabalhando também como engenheiro de frontend responsável pela implementação.

Você está entrando em um projeto que já possui muita funcionalidade e muita informação.

A tarefa **não** é adicionar mais enfeites.

A tarefa é fazer o contrário:

> **reduzir ruído visual, criar hierarquia real, melhorar legibilidade, transformar dados em narrativa visual e substituir clichês de dashboards gerados por IA por decisões de design deliberadas.**

A página piloto será `#history`.

Se a linguagem visual funcionar bem nessa página, ela poderá depois ser migrada gradualmente para outras áreas do portal.

---

# 1. ESTADO ATUAL DO PROJETO

Antes de qualquer alteração:

1. leia o `main` atual;
2. confirme o último commit;
3. confirme que o Prompt 11 já foi implementado;
4. leia a versão atual de:
   - `index.html`;
   - `app.js`;
   - `style.css`;
   - `data/history.js`;
   - `data/domain.js`;
   - `data/data-health-view.js`;
   - `scripts/audit-data.js`;
5. preserve toda a semântica histórica e factual já corrigida.

O Prompt 11 já adicionou, entre outros:

- relações verificadas e inferidas;
- governança temporal;
- filtros;
- cobertura histórica;
- integração com Data Health;
- melhor rastreabilidade de fontes;
- novas famílias;
- KPIs dinâmicos;
- inspector/modal;
- testes de integridade.

**Não refazer a pesquisa factual do Prompt 11 nesta tarefa.**

Só alterar dados históricos se houver um bug indispensável e com fonte clara.

O foco agora é **visual, editorial e interacional**.

---

# 2. PROBLEMA VISUAL CENTRAL

O portal tem boa quantidade de informação, mas parte da interface apresenta características que hoje são fortemente associadas a dashboards automáticos ou interfaces geradas por IA.

Em `#history`, isso aparece principalmente pela repetição excessiva de:

- cards arredondados;
- cards dentro de cards;
- bordas em quase todos os elementos;
- fundos translúcidos;
- glassmorphism;
- gradientes;
- glow cyan;
- emojis em títulos;
- emojis em subtítulos;
- emojis em badges;
- badges para estados comuns;
- pills demais;
- títulos grandiosos;
- hover com `translateY()`;
- sombras em elementos pequenos;
- cor cyan usada como destaque universal;
- componentes diferentes com o mesmo peso visual;
- caixas para informações que poderiam ser apenas texto;
- microcopy excessivamente explicativa;
- muitos elementos “chamando atenção” ao mesmo tempo.

O resultado é:

> **tudo parece importante, logo nada parece realmente importante.**

---

# 3. PRINCÍPIO DE DESIGN

A nova direção deve seguir:

> **Conteúdo primeiro.**
>
> **Estrutura antes de decoração.**
>
> **Cor como informação, não como ornamento.**
>
> **Movimento apenas quando comunica estado.**
>
> **Bordas somente quando delimitam função.**
>
> **Cards apenas quando há necessidade real de agrupamento.**

A página deve parecer criada por uma equipe editorial e técnica experiente, e não por um gerador de dashboards.

---

# 4. REFERÊNCIA CONCEITUAL

A direção desejada é aproximadamente uma combinação de:

- changelog técnico;
- documentação de produto madura;
- observatório de dados;
- atlas histórico;
- gráfico de linhagem;
- interface editorial;
- ferramentas como GitHub, Linear e documentação técnica bem desenhada.

**Não copiar nenhuma marca específica.**

A referência é o nível de sobriedade, hierarquia e precisão.

---

# 5. CONCEITO DA PÁGINA

A rota `#history` deve passar de:

> “dashboard de histórico e linhagens”

para:

> **AI Model Historical Atlas**

ou equivalente em linguagem de produto.

O usuário deve sentir que está explorando:

- quando modelos surgiram;
- quais linhas evoluíram;
- quais relações são confirmadas;
- quais relações são apenas sucessão de produto;
- quais relações são inferidas;
- como os benchmarks mudaram;
- como o mercado acelerou;
- quais famílias desapareceram, convergiram ou foram substituídas.

---

# 6. NÃO TRANSFORMAR EM LANDING PAGE

Evitar completamente:

- hero gigante;
- headline de marketing;
- gradiente colorido ocupando o topo;
- mockup decorativo;
- números gigantes sem contexto;
- slogans;
- frases como “explore o futuro da IA”;
- fundos com blobs;
- grids decorativos neon;
- iluminação simulada;
- efeitos 3D;
- parallax gratuito.

A página é uma ferramenta de pesquisa.

---

# 7. REDUZIR A “DENSIDADE DE COMPONENTES”

Não confundir densidade de dados com densidade de componentes.

A página pode continuar com muitos dados.

Mas menos dados devem estar encapsulados em caixas.

Regra orientativa:

```text
se uma informação pode ser lida como linha de texto,
não criar um card para ela.
```

Exemplo ruim:

```text
[ card ]
  ACTIVE
  GPT-6 Astra
  Sep 03
[/ card ]
```

Exemplo desejado:

```text
● GPT-6 Astra
  Sep 03, 2026 · Active
```

---

# 8. NOVA HIERARQUIA VISUAL

A página deve possuir quatro níveis claros:

## Nível 1 — Página

Título, descrição curta, período histórico.

## Nível 2 — Modo

Lineages / Timeline / Benchmark History.

## Nível 3 — Contexto

Provider, família, ano, benchmark.

## Nível 4 — Dados

Modelos, eventos, edges, runs.

Não inserir containers visuais extras entre esses níveis sem necessidade.

---

# 9. CABEÇALHO MAIS SÓBRIO

Substituir a linguagem atual excessivamente explicativa por algo curto.

Exemplo:

```text
History
Model releases, lineages and benchmark evolution over time.
```

Ou em português:

```text
Histórico
Lançamentos, linhagens e evolução de benchmarks ao longo do tempo.
```

Evitar emoji no título principal.

Não usar `📜`.

---

# 10. RESUMO NUMÉRICO SEM KPI CARDS TRADICIONAIS

O Prompt 11 adicionou KPIs úteis.

Preservar os valores, mas reconsiderar a apresentação.

Em vez de 8 cards separados, testar uma faixa editorial:

```text
48 modelos   11 famílias   52 relações   147 eventos   verificado 05 Sep
```

Com divisores sutis.

Ou duas linhas compactas.

Não usar:

- sombras;
- glow;
- ícones em cada número;
- borda individual em cada KPI.

Os dados são importantes; os containers não são.

---

# 11. RÉGUA TEMPORAL GLOBAL

Criar um elemento visual característico da página:

```text
2024                     2025                     2026          Today
│────────────────────────│────────────────────────│──────────────│
```

A régua deve:

- ser discreta;
- funcionar em dark e light;
- exibir anos;
- opcionalmente mostrar quarters quando houver espaço;
- servir como contexto para as árvores;
- poder reagir a filtros de período;
- não parecer um slider de formulário.

---

# 12. ABAS PLANAS

Hoje as tabs do histórico usam o mesmo padrão visual de toggles/pills de outras áreas.

Mudar para tabs editoriais planas.

Exemplo:

```text
Lineages        Timeline        Benchmark history
────────
```

Características:

- fundo transparente;
- sem caixa externa;
- sem pill;
- sem preenchimento cyan no item ativo;
- ativo indicado por underline de 2px;
- texto ativo com maior contraste;
- foco de teclado visível.

---

# 13. RETIRAR EMOJIS DAS TABS

Não usar:

- `🌳`;
- `⏱️`;
- `📊`.

Se ícone for realmente necessário, usar SVG monocromático discreto.

Preferência: somente texto.

---

# 14. PROVIDER RAIL

Adicionar uma navegação secundária de providers/famílias à esquerda na visão de linhagens em desktop.

Exemplo:

```text
All families

OpenAI              12
Anthropic           11
Google DeepMind      9
xAI                  5
DeepSeek             8
Alibaba Qwen         7
Z.ai                 6
Moonshot             4
Meta                  3
Tencent               2
MiniMax               2
```

Os números devem ser derivados dinamicamente.

Não hardcodar.

---

# 15. PROVIDER RAIL — VISUAL

A rail deve:

- ter fundo da própria página;
- não ser um card gigante;
- usar tipografia pequena e clara;
- mostrar item ativo com barra vertical ou fundo quase imperceptível;
- evitar pills;
- evitar ícones coloridos grandes;
- permitir busca/filtro sem competir com a árvore.

---

# 16. ALL FAMILIES DEVE SER COMPACTO

Quando `All families` estiver ativo:

- mostrar versões resumidas de cada família;
- evitar expandir todas as tracks com todos os detalhes;
- permitir rápida comparação da indústria;
- permitir clicar numa família para entrar em modo focado.

Isso evita dezenas de cards empilhados verticalmente.

---

# 17. MODO FOCADO DE FAMÍLIA

Ao selecionar OpenAI, Anthropic etc.:

- expandir a visualização;
- mostrar todas as tracks daquele provider;
- permitir inspeção das relações;
- manter breadcrumb/contexto simples;
- preservar filtros de data.

Exemplo:

```text
History / OpenAI
```

Sem caixa ao redor.

---

# 18. O PROVIDER DEVE VIRAR ÂNCORA VISUAL

Hoje o cyan funciona como acento genérico do sistema.

Na página History, usar a cor de provider de maneira muito sutil.

Exemplos possíveis:

- barra de 2px;
- pequeno ponto;
- trecho da linha;
- label do provider.

Nunca usar a cor do provider como grande fundo preenchido.

---

# 19. REGRA DE COR

Meta aproximada:

```text
90–95% neutro
5–10% cor
```

Cor deve comunicar:

- provider;
- seleção;
- warning;
- relation confidence;
- evento excepcional.

Cor não deve ser usada simplesmente para “deixar bonito”.

---

# 20. REDUZIR CYAN GLOBAL NA HISTORY

O `accent-cyan` continua existindo no sistema.

Mas não deve estar simultaneamente em:

- título;
- borda;
- seta;
- hover;
- badge;
- KPI;
- tabs;
- links;
- timeline.

Na History, reservar cyan principalmente para:

- seleção;
- foco;
- links interativos neutros;
- alguns indicadores do sistema.

---

# 21. LINHAGENS COMO VISUALIZAÇÃO, NÃO COMO LISTA DE CARDS

A principal alteração visual deve acontecer aqui.

Hoje os modelos são apresentados como pequenos cards em sequência.

Transformar a visão numa visualização de tracks.

Exemplo conceitual:

```text
OPENAI

           2024               2025                         2026
Reasoning  ● o1 ───────────── ● o3 ───────── ● Sol - - - ● Astra

General    ● GPT-4o ─ ● GPT-4.5 ─────────────── ● Terra

Efficient  ● GPT-4o mini ────────────────────── ● Luna

Open       ························· ● gpt-oss 20B
                                      ● gpt-oss 120B
```

---

# 22. POSIÇÃO X DEVE TER SIGNIFICADO TEMPORAL

A posição horizontal deve refletir aproximadamente a data.

Não usar espaçamento idêntico para intervalos de tempo muito diferentes.

Criar função de normalização temporal, por exemplo:

```js
x = scaleDate(releaseDate, minDate, maxDate)
```

ou equivalente.

A visualização precisa ensinar a velocidade da evolução.

---

# 23. EVITAR DEPENDÊNCIA PESADA

Não adicionar React, Vue ou outro framework.

Não adicionar biblioteca de graph visualization gigante sem necessidade.

Preferência:

- HTML;
- CSS Grid/Flex;
- SVG nativo para linhas e edges;
- Vanilla JS.

D3 só deve ser considerada se houver justificativa clara e ganho substancial.

---

# 24. NÓ DE MODELO MINIMALISTA

O nó de modelo não deve mais parecer um card SaaS.

Preferência:

```text
● GPT-6 Astra
  Sep 03, 2026
```

Componentes possíveis:

- pequeno ponto;
- nome;
- data;
- status apenas se excepcional;
- provider implícito pela track/família.

---

# 25. NÃO MOSTRAR STATUS COMUM COMO BADGE

Não precisa de badge para:

- active;
- stable;
- current.

Esses estados podem ser metadata textual.

Badges devem ficar reservados para exceções:

- Preview;
- Deprecated;
- Retired;
- Disputed;
- Inferred;
- Suspended.

---

# 26. BADGES EXCEPCIONAIS DEVEM SER DISCRETOS

Mesmo nos estados acima:

- fundo quase neutro;
- borda sutil;
- sem gradiente;
- sem glow;
- radius menor;
- texto pequeno.

---

# 27. NÃO USAR `translateY(-2px)` EM NÓS

Hover não deve fazer o nó “flutuar”.

Substituir por:

- aumento sutil de contraste;
- background quase imperceptível;
- destaque de outline;
- realce das edges relacionadas.

Movimento deve ser reservado para mudanças reais de layout.

---

# 28. HOVER DE NÓ DEVE EXPLICAR RELAÇÕES

Ao passar sobre um modelo:

- realçar suas edges;
- reduzir visualmente relações não conectadas;
- mostrar cursor apropriado;
- opcionalmente mostrar uma pequena tooltip factual.

Não exibir tooltip decorativa com informações redundantes.

---

# 29. EDGES COMO PRIMEIRA CLASSE

O Prompt 11 já criou semântica de relações.

A visualização deve torná-la evidente.

Sugestão:

```text
───  verified direct / confirmed
- -  generation or role successor
···  inferred
```

A nomenclatura exata deve vir dos dados.

---

# 30. ESTILO DAS EDGES

Relações verificadas:

- linha sólida;
- contraste moderado.

Relações de sucessão funcional/geracional:

- linha tracejada curta.

Relações inferidas:

- pontilhada;
- menor opacidade.

Disputadas:

- semântica de warning;
- não necessariamente vermelho saturado.

---

# 31. NÃO USAR SETA GRANDE `➔`

Eliminar o padrão de setas textuais entre cards.

Usar SVG/linha contínua.

Seta final pode existir apenas quando a direção for necessária.

---

# 32. INSPECTOR LATERAL

Transformar o inspector histórico num elemento central da experiência desktop.

Layout desejado:

```text
[ provider rail ] [ lineage canvas ] [ inspector ]
```

O inspector pode ter aproximadamente 280–340px.

---

# 33. INSPECTOR SEM “CARDÃO” DECORATIVO

O inspector deve parecer painel técnico.

Exemplo:

```text
GPT-6 Astra
OpenAI · GPT-6

Released
03 Sep 2026

Role
Frontier flagship

Predecessor role
GPT-5.6 Sol

Relationship
Flagship successor

Evidence
Official · Verified

Architectural descent
Not established

Sources  3
Open dossier →
```

---

# 34. INSPECTOR — HIERARQUIA

Usar:

- labels pequenas;
- valores em tamanho normal;
- divisores finos;
- espaço em branco;
- nenhuma grade de mini-cards.

---

# 35. INSPECTOR — FONTES

A fonte precisa estar disponível sem poluir a árvore.

Exibir:

- publisher;
- título curto;
- data;
- provenance;
- link.

Pode haver “View evidence” expansível.

---

# 36. INSPECTOR MOBILE

Em telas estreitas:

- virar bottom sheet ou painel abaixo da visualização;
- não abrir modal central gigante;
- preservar contexto da linha do tempo.

---

# 37. RELATION INSPECTOR

Ao clicar numa edge, mostrar detalhes da relação.

Exemplo:

```text
GPT-5.6 Sol → GPT-6 Astra

Type
Flagship-role successor

Confidence
Verified

What this means
Astra replaced Sol as the flagship generation.

What it does not mean
Direct checkpoint lineage is not established.

Evidence
OpenAI launch documentation
```

---

# 38. LEGENDA DE RELAÇÕES

A legenda deve ser compacta e persistente.

Não virar um card grande.

Pode ficar no rodapé do canvas ou acima dele.

Exemplo:

```text
Relationships   ─ verified   - - succession   ··· inferred
```

---

# 39. TIPOGRAFIA

Manter Inter como fonte principal.

Usar JetBrains Mono somente para dados técnicos.

Exemplos adequados para mono:

- `2026-09-03`;
- `1.05M`;
- `74.1%`;
- `$5.72`;
- `gpt-6-astra`;
- versões de benchmark.

---

# 40. NÃO USAR MONO EM PROSA

Não usar JetBrains Mono em:

- títulos;
- descrições;
- nomes de provider;
- parágrafos;
- labels editoriais comuns.

---

# 41. ESCALA TIPOGRÁFICA

Criar uma escala mais contida.

Sugestão aproximada:

```text
page title       28–32px
section title    18–20px
track label      13–14px
model name       13–14px
metadata         11–12px
technical mono   11–12px
```

Evitar títulos enormes.

---

# 42. PESO TIPOGRÁFICO

Não colocar tudo em 700/800.

Preferência:

- page title: 650/700;
- section: 600;
- model: 550/600;
- metadata: 400/500.

A variação de peso deve criar hierarquia.

---

# 43. REDUZIR UPPERCASE

Não usar text-transform uppercase como padrão em todos os pequenos labels.

Usar uppercase somente onde tiver função editorial clara.

---

# 44. RAIOS MENORES

Para `#history`, reduzir a dependência de `radius-md/lg/xl`.

Meta:

- 4px a 6px para controles;
- 0px a 6px para painéis;
- pills apenas quando semanticamente necessárias.

---

# 45. GLASSMORPHISM

A página History não deve depender de glassmorphism.

Evitar:

- `backdrop-filter` em conteúdo interno;
- múltiplas superfícies translúcidas empilhadas;
- bordas brilhantes.

O header global pode continuar seguindo o sistema existente por enquanto.

---

# 46. SOMBRAS

Usar sombra somente quando existir elevação real:

- dropdown;
- inspector flutuante;
- modal/bottom sheet.

Não usar sombra em cada nó ou evento.

---

# 47. GLOW

History deve ter quase zero glow.

Remover glow de:

- nós;
- family containers;
- tabs;
- timeline;
- badges;
- hover.

---

# 48. GRADIENTES

Não usar gradiente como decoração da página.

Gradiente pode permanecer no sistema global se necessário, mas não deve definir a identidade visual de History.

---

# 49. ESPAÇAMENTO

Usar espaço em branco como ferramenta de hierarquia.

Em vez de:

```text
border + background + shadow
```

preferir:

```text
margin + padding + typographic contrast
```

---

# 50. TIMELINE — ABANDONAR FEED DE CARDS

A timeline deve virar um changelog editorial.

Exemplo:

```text
SEPTEMBER 2026

03 SEP   OpenAI
         GPT-6 Astra released
         Frontier flagship · 1.05M context
         Official source                                  →

02 SEP   Google DeepMind
         Gemini 3.8 Flash released
         Flash series                                     →

01 SEP   Anthropic
         Claude Fable 5.1 released                        →
```

---

# 51. TIMELINE — COLUNAS

Desktop:

```text
DATE | PROVIDER | EVENT | META | SOURCE
```

Mas sem aparência de tabela pesada.

Usar grid e divisores finos.

---

# 52. TIMELINE — HIERARQUIA DE EVENTOS

Criar três níveis editoriais:

## Major

- nova geração;
- flagship release;
- retirada importante;
- suspensão;
- identity reveal.

## Standard

- preview;
- GA;
- mudança importante de preço;
- mudança relevante de disponibilidade.

## Minor

- benchmark update;
- snapshot;
- documentação;
- manutenção.

---

# 53. IMPORTÂNCIA NÃO PODE SER HARDcode EDITORIAL SOLTO

Definir `importance` ou derivar por tipo de evento.

Exemplo:

```js
importance: 'major' | 'standard' | 'minor'
```

Se já houver estrutura equivalente, reutilizar.

---

# 54. MAJOR EVENT

Pode ocupar mais espaço vertical.

Exemplo:

```text
03 SEP 2026
OPENAI
GPT-6 Astra
New GPT-6 generation and flagship role.
```

Sem card colorido gigante.

---

# 55. MINOR EVENT

Deve ser compacto.

Exemplo:

```text
04 SEP · Artificial Analysis · leaderboard snapshot updated
```

---

# 56. AGRUPAR POR MÊS/ANO

Manter headers editoriais:

```text
September 2026
August 2026
July 2026
```

Não transformar o header mensal em pill cyan.

---

# 57. FILTROS DA TIMELINE

Substituir dezenas de chips por controles discretos.

Preferência:

- search;
- provider select;
- year select;
- event type select;
- evidence status select.

Chips podem existir para filtros rápidos realmente frequentes, mas em número reduzido.

---

# 58. BUSCA

A busca de histórico deve procurar:

- modelo;
- provider;
- família;
- evento;
- benchmark;
- alias.

Placeholder simples:

```text
Search history…
```

ou português equivalente.

---

# 59. BENCHMARK HISTORY — VISUALIZAÇÃO PRINCIPAL

Não tratar histórico de benchmark apenas como tabela cronológica.

Criar um gráfico de evolução temporal.

Exemplo conceitual:

```text
Terminal-Bench 2.1

95 ┤                             ● Fable 5.1
90 ┤                  ● Grok 4.6      ● Gemini 3.8
85 ┤
80 ┤
   └────────────────────────────────────────────
       Jun         Jul         Aug         Sep
```

---

# 60. BENCHMARK HISTORY — CONTROLES

Permitir selecionar:

- benchmark;
- benchmark version;
- provider;
- model;
- effort;
- harness.

Não misturar runs incompatíveis silenciosamente.

---

# 61. BENCHMARK HISTORY — HARNESSES

Se houver mais de um harness:

- usar série diferente;
- ou exigir seleção;
- ou alertar sobre incompatibilidade.

Nunca conectar pontos metodologicamente incomparáveis como uma única série contínua.

---

# 62. BENCHMARK HISTORY — TOOLTIP

Tooltip deve mostrar:

```text
GPT-6 Astra
DeepSWE 1.1
XHigh
74.1%
2026-09-03
mini-swe-agent
Independent
```

Sem linguagem promocional.

---

# 63. BENCHMARK HISTORY — TABELA DE RUNS

Abaixo do gráfico, manter tabela detalhada.

A tabela deve conter:

- date;
- model;
- configuration/effort;
- benchmark version;
- harness;
- score;
- cost, se houver;
- evidence;
- source.

---

# 64. “COMPARE ERAS”

Adicionar uma ferramenta experimental de alto valor editorial.

Usuário seleciona duas datas ou períodos.

Exemplo:

```text
Compare eras
Mar 2025 → Sep 2026
```

---

# 65. COMPARE ERAS — RESULTADOS

Exibir mudanças derivadas, como:

```text
Models tracked          18 → 48
Providers tracked        6 → 11
Max context           200k → 1.05M
Open-weight leaders      … → …
Flagship transitions     …
```

Somente mostrar métricas com base canônica suficiente.

---

# 66. COMPARE ERAS — EVENTOS

Também mostrar:

- novas famílias;
- famílias removidas;
- novos flagships;
- modelos aposentados;
- mudanças de preço relevantes;
- mudanças de benchmark leader quando comparáveis.

---

# 67. COMPARE ERAS — NÃO INVENTAR HISTÓRICO RETROATIVO

Se o dataset não possui snapshot suficiente para uma métrica em determinada data:

```text
Insufficient historical coverage
```

Não reconstruir artificialmente com dados atuais.

---

# 68. LINGUAGEM EDITORIAL

Reduzir frases grandiosas.

Evitar:

- “líder absoluto”;
- “revolucionário”;
- “breakthrough” sem ser nome oficial;
- “ultra” como adjetivo editorial;
- “máxima densidade”;
- “dominância”;
- “campeão” em texto permanente.

---

# 69. LINGUAGEM FACTUAL

Preferir:

```text
Released Sep 3, 2026
Replaced Sol as OpenAI's flagship role
Relationship verified by official launch documentation
```

---

# 70. NOMES DE FAMÍLIA

Evitar títulos como:

```text
OpenAI GPT-5.6 Generation & Open-Weights Tree
Anthropic Claude Architecture Tree
```

Preferir:

```text
OpenAI
Claude
Gemini
Grok
DeepSeek
Qwen
```

Subtítulo curto explica o escopo.

---

# 71. SEPARAR MARCA DE LINHAGEM

Provider heading:

```text
OpenAI
```

Metadata:

```text
4 tracks · 9 releases · 2024–2026
```

Sem título promocional composto.

---

# 72. NÃO DUPLICAR INFORMAÇÃO

Se data já aparece no nó, não repetir a mesma data em badge.

Se provider já está no cabeçalho da família, não repetir provider em cada nó.

Se status é normal, não mostrar.

---

# 73. MICROCOPY

Remover frases como:

```text
Clique para explorar o dossiê completo deste incrível modelo
```

Preferir:

```text
Open dossier
```

---

# 74. ÍCONES

Regra:

- ícone apenas quando acelera compreensão;
- preferir SVG monocromático;
- emoji somente em áreas do portal onde faça parte deliberada da personalidade;
- em History, quase nenhum emoji.

---

# 75. META DE EMOJIS EM `#history`

Após redesign:

- zero emoji em título principal;
- zero emoji nas tabs;
- zero emoji nos track headings;
- zero emoji em badges;
- no máximo poucos emojis em conteúdos históricos onde forem parte literal do nome/registro, o que é raro.

---

# 76. META DE CARDS

Reduzir significativamente a quantidade de `.card`-like surfaces.

Não definir um número arbitrário obrigatório, mas a página deve deixar de ter:

```text
family card
  track card
    model card
```

A árvore deve usar principalmente layout, linhas e texto.

---

# 77. META DE BORDAS

Evitar borda em todo elemento.

Usar borda para:

- separar painel;
- input;
- selected state;
- tabela;
- inspector.

Não usar borda para cada linha de informação.

---

# 78. META DE PILLS

Pills só para:

- filtro removível;
- estado excepcional;
- pequena seleção múltipla quando for claramente a melhor interação.

Não usar pill como default de metadata.

---

# 79. LIGHT MODE

O redesign deve funcionar em light mode de verdade.

Não apenas inverter cores.

Light mode deve ter:

- branco/cinza neutro;
- linhas discretas;
- pouco shadow;
- provider color com contraste WCAG;
- sem glow.

---

# 80. DARK MODE

Dark mode deve ser sóbrio.

Preferência:

- fundo próximo de preto/cinza;
- superfícies um pouco mais claras;
- bordas fracas;
- texto principal quase branco;
- texto secundário cinza;
- cores saturadas apenas em detalhes.

---

# 81. NÃO QUEBRAR IDENTIDADE GLOBAL DE UMA VEZ

Este projeto possui muitas páginas.

Não fazer redesign completo do portal neste prompt.

History será piloto.

Pode adicionar tokens novos no design system, mas preservar compatibilidade.

---

# 82. TOKENS DE HUMANIZAÇÃO

Criar tokens específicos ou revisar tokens existentes para suportar a nova linguagem.

Exemplo conceitual:

```css
--history-bg
--history-surface
--history-divider
--history-text-muted
--history-selection
--history-node-radius
--history-panel-radius
```

Evitar criar 30 tokens redundantes.

---

# 83. TOKENS GLOBAIS QUE PODEM SER REVISTOS FUTURAMENTE

Documentar candidatos a revisão global:

- `--shadow-glow-cyan`;
- `--shadow-glow-purple`;
- `--grad-cyan-blue`;
- `--grad-card-glow`;
- excesso de `--radius-pill`.

Mas não remover globalmente se outras páginas dependem deles.

---

# 84. CSS ESPECÍFICO DA HISTORY

Preferir classes semânticas:

```text
.history-page
.history-summary
.history-tabs
.history-provider-rail
.history-lineage-canvas
.history-track
.history-node
.history-edge
.history-inspector
.history-timeline
.history-event
.history-benchmark-chart
```

Evitar inline styles novos.

---

# 85. REDUZIR INLINE STYLE EXISTENTE NA HISTORY

O renderer atual possui muito CSS inline.

Migrar progressivamente os estilos da History para classes.

Objetivo:

- legibilidade;
- consistência;
- manutenção;
- suporte a dark/light;
- media queries limpas.

---

# 86. NÃO MIGRAR TODO `app.js` NESTE PROMPT

Focar apenas no código de History afetado.

Não transformar a tarefa numa refatoração geral do SPA.

---

# 87. COMPONENTES LÓGICOS

Mesmo em Vanilla JS, separar funções da History.

Sugestão:

```js
renderHistoryShell()
renderHistorySummary()
renderHistoryTabs()
renderProviderRail()
renderLineageAtlas()
renderLineageTrack()
renderHistoryNode()
renderHistoryInspector()
renderHistoryRelationInspector()
renderEditorialTimeline()
renderBenchmarkHistoryChart()
renderCompareEras()
```

Se já houver modularização equivalente, seguir o padrão atual.

---

# 88. ESTADO DA HISTORY

Manter estado específico, por exemplo:

```js
history: {
  tab,
  provider,
  family,
  year,
  eventType,
  query,
  selectedNodeId,
  selectedRelationId,
  benchmarkId,
  effort,
  harness,
  eraStart,
  eraEnd
}
```

Não aumentar `AppState` global sem necessidade se já houver módulo específico.

---

# 89. DEEP LINKS

Preservar e melhorar deep links.

Exemplos:

```text
#history?tab=lineages&provider=openai
#history?tab=timeline&year=2026&provider=anthropic
#history?tab=benchmarks&benchmark=deepswe-1.1
```

Adicionar, se útil:

```text
&model=gpt-6-astra
&relation=gpt56sol-gpt6astra
```

---

# 90. BACK/FORWARD

Browser back/forward deve restaurar:

- tab;
- provider;
- filtros;
- modelo selecionado quando possível.

---

# 91. ACESSIBILIDADE — NAVEGAÇÃO

Todos os elementos interativos devem funcionar por teclado.

Nós devem ser:

- buttons;
- links;
- ou elementos com semântica e keyboard handling correta.

Não usar `div onclick` como novo padrão.

---

# 92. ACESSIBILIDADE — EDGES

Relações importantes precisam de alternativa acessível.

SVG visual sozinho não basta.

Fornecer:

- lista semântica;
- labels;
- `aria-label`;
- relação acessível pelo inspector.

---

# 93. ACESSIBILIDADE — CORES

Nunca depender exclusivamente de cor para:

- verified;
- inferred;
- disputed;
- preview;
- deprecated.

Usar também:

- line style;
- texto;
- iconografia mínima;
- pattern.

---

# 94. ACESSIBILIDADE — MOTION

Respeitar:

```css
@media (prefers-reduced-motion: reduce)
```

Sem transições de movimento desnecessárias.

---

# 95. RESPONSIVIDADE — DESKTOP

Acima de aproximadamente 1200px:

```text
provider rail | lineage canvas | inspector
```

---

# 96. RESPONSIVIDADE — TABLET

Em tablet:

- provider rail pode virar dropdown;
- canvas ocupa largura principal;
- inspector abaixo ou drawer lateral.

---

# 97. RESPONSIVIDADE — MOBILE

No mobile:

- tabs horizontais simples;
- provider select;
- tracks com scroll horizontal controlado;
- escala temporal legível;
- inspector como bottom sheet ou seção expandida;
- timeline em duas colunas: date + content.

---

# 98. NÃO ENCOLHER TUDO NO MOBILE

Não tentar mostrar o desktop inteiro miniaturizado.

Mudar a composição.

---

# 99. SCROLL HORIZONTAL

Em lineage tracks, scroll horizontal pode ser apropriado.

Mas:

- deixar claro que há mais conteúdo;
- manter label da track fixa quando possível;
- não criar nesting de vários scrolls horizontais.

---

# 100. STICKY LABELS

Em desktop largo, considerar:

- provider rail sticky;
- track label sticky à esquerda;
- inspector sticky.

Testar para não causar conflitos com header fixo.

---

# 101. PERFORMANCE

SVG e DOM precisam suportar muitas famílias sem travar.

Evitar:

- listeners individuais desnecessários;
- grandes reflows em hover;
- recalcular todas as posições em cada mousemove.

---

# 102. EVENT DELEGATION

Usar event delegation quando fizer sentido.

---

# 103. CÁLCULO DE POSIÇÃO TEMPORAL

Centralizar o cálculo de escala de datas.

Exemplo:

```js
getHistoryTimeScale(events, range)
getTimePosition(date, range)
```

Não repetir fórmula em cada track.

---

# 104. DATAS DESCONHECIDAS

Se release date não for exata:

- não inventar dia;
- representar month-only ou year-only;
- marcar precision.

O layout temporal deve suportar isso.

---

# 105. DATA PRECISION

Se necessário, suportar:

```js
datePrecision: 'day' | 'month' | 'year' | 'approximate'
```

Reutilizar campo existente se já houver.

---

# 106. PREVIEW VS GA

Visualmente diferenciar evento preview de GA sem exagero.

Exemplo:

```text
○ preview
● GA/release
```

Não usar dois cards diferentes.

---

# 107. STATUS HISTÓRICO

Modelos antigos podem permanecer na linha.

Não reduzir opacidade a ponto de ficarem ilegíveis.

Usar:

- texto muted;
- marker hollow;
- metadata.

---

# 108. MODELO ATUAL

O modelo atual de uma track pode ter marker preenchido ou label `current` muito discreta.

Não colocar badge neon.

---

# 109. SOURCE QUALITY

Evidence quality deve aparecer principalmente no inspector.

Não poluir cada nó com `O`, `T`, `M`, `D` etc.

---

# 110. DATA HEALTH NA HISTORY

Se houver problema de cobertura:

mostrar uma linha discreta:

```text
Historical coverage: 94% · 3 unresolved relationships
```

Com link para Data Health.

Não criar warning card gigante a menos que haja problema crítico.

---

# 111. EMPTY STATES

Empty state deve ser simples.

Exemplo:

```text
No events match these filters.
Clear filters
```

Sem ilustração genérica.

---

# 112. ERROR STATES

Erro de dataset:

```text
History data could not be loaded.
```

Mostrar detalhe técnico somente se útil.

---

# 113. LOADING

Como é SPA local/static, evitar skeletons artificiais se os dados carregam instantaneamente.

Não adicionar loading animation sem necessidade.

---

# 114. LINKS

Links devem ser reconhecíveis, mas não todos cyan forte.

No dark mode, link pode usar tom moderado com underline no hover.

---

# 115. BOTÕES

History deve usar poucos botões primários.

A maioria das ações é navegação/filtro.

Não usar `.btn-primary` cyan para cada ação pequena.

---

# 116. AÇÃO PRIMÁRIA

Possíveis ações principais:

- Open dossier;
- View source.

Mesmo essas podem ser links textuais.

---

# 117. TOOLTIP VS INSPECTOR

Tooltip:

- 1–3 dados rápidos.

Inspector:

- contexto completo.

Não colocar mini-dossier inteiro num tooltip.

---

# 118. FOCUS MODE

Opcionalmente permitir esconder rail/inspector e ampliar canvas.

Somente se simples.

Não priorizar sobre o núcleo da tarefa.

---

# 119. PRINT / EXPORT

History deve continuar imprimível.

No print:

- fundo branco;
- linhas visíveis;
- sem inspector sticky;
- sem controles;
- relações preservadas.

---

# 120. EXPORT MARKDOWN

Não quebrar o export global existente.

---

# 121. TESTES FUNCIONAIS

Adicionar smoke tests ou asserts para:

- History abre;
- tabs mudam;
- provider filter funciona;
- busca funciona;
- node selection funciona;
- relation selection funciona;
- URL query é restaurada;
- timeline filtra;
- benchmark chart troca benchmark;
- mobile não gera overflow global.

---

# 122. TESTES DE DADOS

Não duplicar testes do Prompt 11.

Mas garantir que a nova UI não depende de:

- `nodes` sem data;
- edges órfãs;
- provider inexistente;
- status não reconhecido.

---

# 123. TESTE DE RELAÇÃO VISUAL

Fixture com:

- verified;
- succession;
- inferred;
- disputed.

Cada uma precisa gerar estilo distinto e label acessível.

---

# 124. TESTE DE ESCALA TEMPORAL

Dado:

```text
A = 2024-01-01
B = 2024-02-01
C = 2026-01-01
```

C deve aparecer muito mais distante temporalmente de B do que B de A.

---

# 125. TESTE DE DATAS PARCIAIS

Garantir que `2025`, `2025-03` e data completa não causem crash se o schema aceitar precisão parcial.

---

# 126. TESTES VISUAIS MANUAIS

Antes de concluir, revisar em:

- desktop 1440px;
- desktop 1280px;
- tablet 768px;
- mobile 390px;
- mobile 360px;
- dark mode;
- light mode.

---

# 127. CRITÉRIO “PARECE FEITO POR IA”

Fazer uma revisão específica após implementar.

Perguntar visualmente:

- há cards demais?
- há bordas demais?
- há emojis demais?
- há badges demais?
- há cyan demais?
- há glow?
- há gradiente sem função?
- tudo tem radius grande?
- todo hover se move?
- todo bloco tem título + subtítulo + ícone?
- todos os dados estão em caixas?
- a linguagem é grandiosa demais?

Se sim, simplificar novamente.

---

# 128. ANTI-PATTERN: CARD-IN-CARD-IN-CARD

Proibido manter como estrutura dominante:

```text
family-card
  track-card
    model-card
```

Substituir por:

```text
family section
  track row
    nodes
```

---

# 129. ANTI-PATTERN: EMOJI COMO SISTEMA DE ÍCONES

Não utilizar emoji para construir hierarquia funcional nesta página.

---

# 130. ANTI-PATTERN: PILL PARA TUDO

Não converter metadata em pills por padrão.

---

# 131. ANTI-PATTERN: CYAN = IMPORTANTE

Nem tudo importante deve ficar cyan.

Importância vem de:

- posição;
- tamanho;
- peso;
- espaço;
- contexto.

---

# 132. ANTI-PATTERN: HOVER COMO “EFEITO BONITO”

Hover deve revelar affordance ou relação.

Não usar movimento só por estética.

---

# 133. ANTI-PATTERN: TODOS OS BLOCOS COM SUBTÍTULO EXPLICATIVO

Se o título já é claro, não adicionar uma frase genérica abaixo.

---

# 134. ANTI-PATTERN: MICROCOPY DE MARKETING

A History deve soar como documentação técnica.

---

# 135. ANTI-PATTERN: TUDO É “FRONTIER”

Evitar rótulos promocionais repetitivos.

---

# 136. ANTI-PATTERN: DASHBOARD DE 8 KPIS

Se KPIs formam apenas contexto, mostrar inline.

Card só se KPI for realmente uma decisão/alerta.

---

# 137. ANTI-PATTERN: TABELA DISFARÇADA DE CARDS

Se uma lista possui linhas uniformes com os mesmos campos, considerar tabela/lista editorial.

---

# 138. ANTI-PATTERN: MODAL CENTRAL PARA QUALQUER DETALHE

Preferir inspector contextual.

Modal apenas para ação que realmente precisa bloquear contexto.

---

# 139. ANTI-PATTERN: ÍCONE + TÍTULO + BADGE + VALOR EM TODO ITEM

Reduzir elementos simultâneos.

---

# 140. MIGRAÇÃO GRADUAL DO DESIGN SYSTEM

Após terminar History, produzir uma pequena lista de padrões aprovados que podem ser usados depois em:

- model dossiers;
- providers;
- benchmarks;
- plans;
- data health.

Não implementar essa migração inteira agora.

---

# 141. PADRÕES CANDIDATOS A MIGRAÇÃO

Provavelmente:

- tabs planas;
- metadata textual em vez de badges;
- menos cards;
- menos glow;
- inspector lateral;
- cabeçalhos editoriais;
- listas com divisores;
- uso restrito de cor.

---

# 142. NÃO REMOVER PERSONALIDADE

“Humanizar” não significa tornar o portal genérico ou sem identidade.

A identidade deve vir de:

- rigor dos dados;
- visualizações específicas;
- tipografia;
- relações históricas;
- clareza;
- profundidade;
- pequenas decisões próprias.

Não de efeitos decorativos.

---

# 143. ELEMENTO DE IDENTIDADE EXCLUSIVO

A régua temporal + lineage atlas + inspector deve ser o elemento visual característico de History.

Esse trio deve ser memorável.

---

# 144. NÃO IMITAR “APPLE CLEAN” SEM CONTEÚDO

Não remover tanta informação a ponto de perder utilidade.

O objetivo é **densidade legível**, não minimalismo vazio.

---

# 145. NÃO IMITAR TERMINAL/HACKER UI

Também evitar cair no outro clichê:

- tudo mono;
- verde neon;
- grid de terminal;
- scanlines;
- console fake.

O produto é técnico, mas não precisa parecer cyberpunk.

---

# 146. NÃO CRIAR VISUALIZAÇÃO INCOMPREENSÍVEL

A árvore deve continuar legível para usuário não especialista.

Linhas e relações precisam de legenda.

---

# 147. NÃO SACRIFICAR PERFORMANCE POR DESIGN

Se uma visualização sofisticada exige centenas de elementos SVG complexos e animação constante, simplificar.

---

# 148. FASE 1 — AUDITORIA VISUAL

Antes de codificar:

1. mapear todos os componentes de `#history`;
2. contar onde há:
   - cards;
   - borders;
   - badges;
   - emojis;
   - pills;
   - gradients;
   - shadows;
   - glow;
3. identificar estilos inline;
4. identificar tokens compartilhados;
5. tirar screenshots de referência local se o ambiente permitir.

Entregar no relatório final uma síntese “antes”.

---

# 149. FASE 2 — FUNDAÇÃO VISUAL

Implementar:

- header editorial;
- summary inline;
- tabs planas;
- tokens específicos;
- remoção de emoji;
- tipografia;
- spacing;
- redução de radius/glow;
- provider rail base.

Ainda sem reescrever toda lineage visualization.

---

# 150. FASE 3 — LINEAGE ATLAS

Implementar:

- escala temporal;
- track layout;
- nós minimalistas;
- edges semânticas;
- hover/focus;
- provider focus;
- relation legend.

Essa é a fase principal.

---

# 151. FASE 4 — INSPECTOR

Implementar:

- node inspector;
- relation inspector;
- evidence;
- desktop sticky;
- tablet/mobile adaptation.

---

# 152. FASE 5 — TIMELINE EDITORIAL

Migrar timeline de cards para changelog/lista editorial.

Implementar hierarquia major/standard/minor.

---

# 153. FASE 6 — BENCHMARK HISTORY

Criar gráfico temporal e tabela de runs consistente.

---

# 154. FASE 7 — COMPARE ERAS

Adicionar versão inicial somente se os dados históricos permitirem comparações honestas.

Se a cobertura ainda for insuficiente, implementar shell + mensagem de cobertura e não inventar dados.

---

# 155. FASE 8 — RESPONSIVO E ACESSIBILIDADE

Revisar:

- keyboard;
- screen reader;
- focus;
- contrast;
- reduced motion;
- mobile composition;
- horizontal scroll.

---

# 156. FASE 9 — POLIMENTO ANTI-AI

Executar a checklist específica de humanização.

Remover qualquer elemento que ainda pareça adicionado “porque dashboards costumam ter isso”.

---

# 157. FASE 10 — TESTES E RELATÓRIO

Rodar:

```bash
npm test
```

E demais scripts existentes relevantes.

Corrigir regressões.

---

# 158. CRITÉRIO DE ACEITAÇÃO — HEADER

Aprovado se:

- título sem emoji;
- descrição curta;
- resumo numérico compacto;
- sem hero promocional;
- sem glow.

---

# 159. CRITÉRIO DE ACEITAÇÃO — TABS

Aprovado se:

- tabs planas;
- sem pill container dominante;
- sem emoji;
- ativo por underline/contraste;
- keyboard acessível.

---

# 160. CRITÉRIO DE ACEITAÇÃO — LINEAGES

Aprovado se:

- modelos não são cards tradicionais;
- posição temporal tem significado;
- tracks são legíveis;
- relações possuem estilo semântico;
- edges inferidas e verificadas não parecem iguais;
- provider focus funciona;
- All families é utilizável.

---

# 161. CRITÉRIO DE ACEITAÇÃO — INSPECTOR

Aprovado se:

- seleciona nó;
- seleciona edge;
- mostra evidência;
- não ocupa modal desnecessário;
- funciona no mobile.

---

# 162. CRITÉRIO DE ACEITAÇÃO — TIMELINE

Aprovado se:

- não é feed de cards;
- eventos são agrupados temporalmente;
- major/standard/minor têm peso distinto;
- filtros funcionam;
- fontes continuam acessíveis.

---

# 163. CRITÉRIO DE ACEITAÇÃO — BENCHMARK HISTORY

Aprovado se:

- existe leitura temporal real;
- versões/harnesses não são misturados indevidamente;
- runs detalhados continuam auditáveis.

---

# 164. CRITÉRIO DE ACEITAÇÃO — VISUAL

A página final deve possuir:

- muito menos cards;
- muito menos badges;
- muito menos emoji;
- quase nenhum glow;
- quase nenhum gradiente decorativo;
- cores mais controladas;
- menos radius grande;
- menos hover com movimento;
- maior uso de divisores e espaço em branco;
- tipografia como principal instrumento de hierarquia.

---

# 165. CRITÉRIO DE ACEITAÇÃO — CONTEÚDO

Nenhuma informação factual do Prompt 11 deve desaparecer por causa do redesign.

Ela pode migrar para:

- inspector;
- tooltip;
- metadata;
- tabela;
- source panel.

Mas não pode simplesmente ser removida.

---

# 166. CRITÉRIO DE ACEITAÇÃO — SEMÂNTICA

O redesign não pode voltar a sugerir que toda seta é ancestralidade arquitetural direta.

---

# 167. CRITÉRIO DE ACEITAÇÃO — PERFORMANCE

History deve continuar fluida com todas as famílias atuais.

---

# 168. CRITÉRIO DE ACEITAÇÃO — MOBILE

Nenhum overflow horizontal global.

Scroll horizontal interno somente onde intencional.

---

# 169. CRITÉRIO DE ACEITAÇÃO — DARK/LIGHT

Ambos devem parecer projetados, não apenas invertidos.

---

# 170. CRITÉRIO DE ACEITAÇÃO — TESTES

Todos os testes existentes devem continuar passando.

Novos testes da History devem passar.

---

# 171. CHECKLIST FINAL DE HUMANIZAÇÃO

Antes de concluir, revisar cada item:

```text
[ ] título sem emoji
[ ] tabs sem emoji
[ ] tracks sem emoji decorativo
[ ] sem card-in-card-in-card
[ ] sem glow em nós
[ ] sem translateY em nós
[ ] sem gradiente decorativo na History
[ ] provider color usado com moderação
[ ] badges só para exceções
[ ] status comum como metadata
[ ] timeline editorial
[ ] régua temporal real
[ ] node inspector
[ ] relation inspector
[ ] edges semânticas
[ ] posição temporal proporcional
[ ] dark mode sóbrio
[ ] light mode sóbrio
[ ] mobile utilizável
[ ] keyboard acessível
[ ] fontes preservadas
[ ] Prompt 11 preservado
```

---

# 172. MEDIR O “ANTES E DEPOIS”

No relatório final, fornecer uma comparação qualitativa e, quando possível, quantitativa.

Exemplos:

```text
Emojis funcionais na History: X → Y
Card-like surfaces visíveis no estado inicial: X → Y
Inline styles no renderer da History: X → Y
Badges no default lineage view: X → Y
Glow/shadow usages específicos de History: X → Y
```

Não manipular números para parecer melhor.

---

# 173. DOCUMENTAR PADRÕES APROVADOS

Criar ou atualizar documento curto em `docs/` com a nova linguagem visual aprovada para History.

Sugestão:

```text
docs/methodology/visual-language.md
```

ou estrutura equivalente já existente.

---

# 174. DOCUMENTO DE LINGUAGEM VISUAL

Incluir:

- princípios;
- quando usar card;
- quando usar badge;
- uso de emoji;
- uso de cor;
- radius;
- shadows;
- typography;
- tabs;
- inspectors;
- timelines;
- data visualization.

Esse documento servirá para impedir que futuras features voltem ao visual anterior automaticamente.

---

# 175. NÃO CRIAR “DESIGN SYSTEM 3.0” GIGANTE

O documento deve ser curto e operacional.

Não criar burocracia visual excessiva.

---

# 176. FUTURA MIGRAÇÃO DO PORTAL

No relatório final, sugerir uma ordem de futuras páginas a humanizar, sem implementá-las agora.

Minha prioridade recomendada:

1. `#history`;
2. model dossier;
3. benchmark explorer;
4. provider dossier;
5. plans;
6. data health;
7. dashboard/home.

A ordem pode ser ajustada com justificativa.

---

# 177. POR QUE HISTORY PRIMEIRO

History é ideal como piloto porque:

- possui forte narrativa visual própria;
- contém muitos dos anti-patterns atuais;
- não é a rota de entrada principal;
- permite testar nova linguagem sem redesenhar todo o produto;
- possui dados ricos o suficiente para justificar visualizações únicas.

---

# 178. NÃO ALTERAR SIDEBAR GLOBAL NESTA FASE

Preservar sidebar e navegação global.

Podem receber pequenos ajustes locais somente se necessários para consistência.

---

# 179. NÃO ALTERAR BRANDING GLOBAL NESTA FASE

Não trocar nome do portal, logo, favicon ou identidade geral.

---

# 180. NÃO TROCAR FONTES EXTERNAS SEM NECESSIDADE

Inter + JetBrains Mono são suficientes.

---

# 181. NÃO INTRODUZIR IMAGENS DECORATIVAS

History não precisa de ilustração stock ou imagem gerada.

O gráfico em si é a identidade visual.

---

# 182. NÃO CRIAR AVATARES FAKE DE PROVIDERS

Se não houver logo oficial consistente e licitamente utilizável, usar texto + cor sutil.

---

# 183. NÃO CRIAR LOGOS EM EMOJI

Evitar substituir providers por símbolos genéricos.

---

# 184. CÓPIA EDITORIAL

Reescrever textos da UI que soem sintéticos ou exagerados.

Mas não alterar afirmações factuais sem motivo.

---

# 185. EXEMPLO DE TOM

Ruim:

```text
Trilha Frontier de Máxima Densidade Conceitual e Raciocínio Agêntico Revolucionário
```

Melhor:

```text
Frontier models
Long-context reasoning and agentic workloads
```

Ou português equivalente.

---

# 186. EXEMPLO DE METADATA

Ruim:

```text
👑 ACTIVE FRONTIER LEADER
```

Melhor:

```text
Active · released Sep 2026
```

---

# 187. EXEMPLO DE SOURCE LABEL

Ruim:

```text
✅ OFICIAL AUDITADO
```

Melhor:

```text
Official source
```

---

# 188. EXEMPLO DE RELAÇÃO

Ruim:

```text
🚀 GENERATIONAL UPGRADE
```

Melhor:

```text
Generation successor
Verified
```

---

# 189. EXEMPLO DE WARNING

Ruim:

```text
🚨 ATENÇÃO CRÍTICA — RELAÇÃO NÃO CONFIRMADA
```

Melhor:

```text
Inferred relationship
No official lineage statement found.
```

A menos que o risco seja realmente crítico.

---

# 190. DENSIDADE DE INFORMAÇÃO

A meta não é esconder detalhes.

A meta é mover detalhes para o nível correto.

```text
canvas → identificação
inspector → contexto
source panel → evidência
benchmark table → metrologia
```

---

# 191. VISUALIZAR A HISTÓRIA, NÃO DECORAR A HISTÓRIA

A pergunta central de cada decisão deve ser:

> Isso ajuda o usuário a entender evolução temporal, relação ou evidência?

Se não, provavelmente remover.

---

# 192. PRIORIDADE DE IMPLEMENTAÇÃO

P0:

- remover card-in-card-in-card;
- tabs planas;
- eliminar emojis da History;
- reduzir glow/gradientes;
- lineage atlas temporal;
- edges semânticas;
- inspector.

P1:

- timeline editorial;
- benchmark history graph;
- provider rail;
- responsive refinado.

P2:

- compare eras;
- polish avançado;
- futura documentação visual.

---

# 193. NÃO BLOQUEAR P0 POR P2

Se Compare Eras exigir muita expansão do dataset, não atrasar o redesign principal.

---

# 194. RELATÓRIO FINAL DO AGENTE

Ao terminar, fornecer:

## Arquivos alterados

Lista de arquivos.

## Mudanças visuais

Resumo objetivo.

## Mudanças de UX

Resumo das novas interações.

## Antes → Depois

Anti-patterns removidos.

## Semântica preservada

Como Prompt 11 foi mantido.

## Responsividade

Telas testadas.

## Acessibilidade

O que foi verificado.

## Testes

Comandos e resultado.

## Pendências

O que ficou para fase futura.

## Próximas páginas candidatas

Sugestão de rollout da nova linguagem visual.

---

# 195. RESULTADO FINAL ESPERADO

Ao final, `#history` não deve parecer:

> uma coleção de cards de um SaaS de IA.

Deve parecer:

> **uma ferramenta técnica de exploração histórica com identidade própria.**

A sensação desejada é:

- deliberada;
- editorial;
- precisa;
- silenciosa;
- confiável;
- densa, mas legível;
- técnica, sem ser cyberpunk;
- moderna, sem depender de modismos visuais.

---

# 196. FRASE-GUIA

Durante toda a implementação, usar esta regra:

> **Menos componentes. Mais relações. Menos decoração. Mais história.**

---

# 197. ORDEM RECOMENDADA DE EXECUÇÃO

Execute nesta ordem:

```text
1. Audit current #history
2. Establish History visual tokens
3. Simplify header and summary
4. Flatten tabs
5. Build provider rail
6. Build proportional time scale
7. Replace model cards with timeline nodes
8. Replace arrows with semantic SVG edges
9. Build node/relation inspector
10. Convert timeline feed into editorial changelog
11. Add benchmark history chart
12. Add responsive/mobile composition
13. Run anti-AI visual audit
14. Test dark/light/keyboard/mobile
15. Run project tests
16. Document visual language
17. Produce final report
```

---

# 198. REGRA FINAL

Não interpretar “tirar cara de IA” como “remover IA do conteúdo”.

O portal é sobre modelos de IA.

O que deve desaparecer é a **estética automática de template**.

A informação continua profunda.

A interface passa a parecer intencional.
