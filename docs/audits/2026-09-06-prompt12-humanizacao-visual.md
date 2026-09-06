# Relatório — Prompt 12: Humanização Visual + History Atlas

> Execução: 2026-09 · Página-piloto: `#history` · Stack inalterada (Vanilla JS/CSS + Chart.js)

## 1. Visual audit (problemas encontrados antes)

| Rota | Problemas |
|---|---|
| Todas | H2 com emoji + subtítulo explicando tudo; card arredondado uniforme; cyan+glow em tudo; hover `translateY` universal; títulos LLM-ish ("Head-to-Head", "Roteador Inteligente", "Integridade & Auditoria Contínua"). |
| `#history` | 8 KPI-cards idênticos; "árvores genealógicas" como lista de cards com setas ➔ em texto; posição temporal inexistente (ordem fixa por track); modal genérico de inspeção; timeline = feed de cards repetidos; benchmarks = só tabela; dezenas de `style="…"` inline. |
| `#use-cases` | badge `E — Calibrado` no título principal. |
| Sidebar | 18 emojis diferentes como ícones de navegação. |

## 2. Foundations (tokens v2, camada anexada ao fim de `style.css`)

- `--surface-0..3`, `--shadow-subtle/elevated/floating`, `--focus-ring` (dark+light).
- `.page-heading` (__eyebrow / __title / __subtitle) como View Header global.
- `.num`/`.mono` com `font-variant-numeric: tabular-nums` para datas, scores, preços, tokens.
- Tabs refinadas (`.view-tabs` com underline animada), chips de filtro (`.timeline-filters`), toolbar compartilhada (`.data-toolbar`), painel de superfície (`.surface-panel`).
- Tipografia: Inter mantido (troca de fonte exigiria medição em 25 views; ganho incerto); tracking/escala dos títulos corrigidos.
- §23: hover de cards globais migrou de `translateY(-2px)` para border-contrast + surface.
- Foco visível global (`:focus-visible` → `--focus-ring`) e `prefers-reduced-motion` neutralizando animações.

## 3. History redesign — Model History Atlas

- **Hero** compacto: eyebrow "Model History Atlas", título "Histórico", subtítulo de 1 linha e escala 2024→hoje com **dots reais por data, cor por provedor** (mapa de densidade, não decoração).
- **Stat strip** (`.metric-strip`) substitui os 8 KPI-cards: 6 números tabulares em linha com 88% em destaque — sem caixas repetidas.
- **Tabs** "Linhagens · Linha do tempo · Benchmarks" sem emoji; ARIA tablist/tabpanel; underline animada.
- **Atlas (Linhagens)** — layout rail → canvas → inspector:
  - `history-utils.js` (novo, puro e testável): `scaleDate()`, `computeHistoryRange()`, `eventTier()`, `edgeStyleFor()`, provider marks — nós posicionados por **data normalizada**, nunca gap constante.
  - Rail de famílias com dot do provedor, contagem e estado ativo; vira seletor horizontal no mobile.
  - Canvas com time ruler de ano/quarter, gridlines anuais, labels de trilha sticky, chips de nó (dot + nome + data + status), marca `current` e halo tracejado para predecessores.
  - **Edges SVG**: sólida = verificada; tracejada âmbar = inferida; curva lateral p/ rename/redeploy; hover aumenta contraste; clique abre inspector com semântica, confiança, delta documentado, fontes e caveat "derivação arquitetural não estabelecida" (p/ inferidas) — cor nunca é o único canal (§85).
  - **Inspector lateral** substitui o modal (mantido só p/ compatibilidade de links antigos); fecha com × e `Escape`.
  - Deep-links: `#history?tab=lineages&family=<id>&node=<id>` abre família, seleciona o nó e centraliza o canvas.
  - Empty state elegante com ação "Limpar filtros".
- **Timeline**: changelog editorial por mês ("SET 2026"), colunas dia/provedor/título/tipo; hierarquia major/standard/minor; clique expande inline com descrição, data efetiva, proveniência e fontes linkadas.
- **Benchmark History**: seletor de benchmark + gráfico temporal (eixo X = data real, cores por provedor, tooltip com score/IC/custo/task/data) + runs table com números tabulares.

## 4. Global polish (sem reescrever views)

- 22 títulos de view reescritos curtos ("Comparar", "Router", "Privacidade", "Planos", "Data Health", "Plataformas", "Fontes"…); badge "E — Calibrado" removido do título de use-cases.
- **59 emojis estruturais removidos** de h1–h4 gerados em `app.js` / `data/*.js` / `index.html`.
- Sidebar: 18 emojis → sprite SVG inline (mesmo stroke/caixa/tamanho); badges mais discretos; zone titles sem emoji.
- Override `?theme=light|dark` no boot script (QA/screenshots determinísticos de tema).

## 5. Screenshots

Comparação before/after salva localmente em `.agents/shots/` (gitignored):
`before/history-1440.png` → `v2/v5-light-lineages.png`, `v2/v6-deeplink.png`, `v1/v2` timeline, `v5-light-timeline.png`, `v1-history-benchmarks.png`, mobile `v3-mobile.png`.
Reprodução automatizada: `./scripts/visual-smoke.sh` (matriz §3/§101 com Chromium headless; sem dependências novas).

## 6. Accessibility

- Tabs com `role=tablist/tab/tabpanel` + `aria-selected`; rail com `aria-pressed`; nós são `<button>` com `aria-label` "nome — data"; eventos com `aria-expanded`; inspector fecha em `Escape`; foco visível em nós/arestas/linhas/inspector.
- Relações distinguíveis sem cor: sólido vs tracejado + label textual ("verificada/inferida") + caveat.
- Mobile: inspector vira painel sticky (bottom-sheet-like); canvas com scroll controlado; tablet sem overflow da página.
- `prefers-reduced-motion` global respeitado.

## 7. Performance

- SVG de arestas redesenhado só na re-render do canvas; hover é CSS puro (sem rerender por mouse — §87).
- Sem blur em listas; sombras em 3 níveis; animações 120–220 ms.
- Gráfico do benchmark destruído antes de recriar (`AppState.charts.historyBench`).
- Canvas escala pelo range da família (menos dias → menos largura).

## 8. Tests

- `scripts/test-history.js` (novo; integrado no `npm test`): escala temporal (clamp/monotonia/proporção), tiers de eventos, dash por evidência, ordenação de nós, mapeamento de arestas (0 órfãs), familyIds únicos (alvo de deep-link), datas ISO nos eventos.
- `npm test` → audit-data + smoke + links + history: **PASS**.
- Sweep headless das 22 rotas: todas com view ativa e zero erros de console.

## 8b. Iteração v6 (Fase H — QA visual com Browser Harness, sessão de continuação)

Primeira rodada após o corte da sessão anterior; correções verificadas screenshot a screenshot em `http://localhost:3000` (desktop 1440×1000, tablet 1024×900, mobile 390×844, dark+light):

1. **Hero `#history`**: label "hoje" quebava em duas linhas na borda direita → âncora `--end` (flip + `nowrap`) quando > 88% da escala.
2. **Stat strip**: `46 · 6 arestas verificadas · inferidas` (número solto ambíguo, quebrava em 2ª linha) → `46 arestas verificadas · 6 inferidas`; 6 itens agora cabem em uma linha a 1440.
3. **Benchmark History — gráfico "Todos"**: todos os pontos `rgba(148,163,184,.85)` cinza → paleta data-viz de 10 cores por benchmark (legenda ↔ cor coerente); tooltip ganhou a linha do provedor.
4. **Eixo X temporal**: `type: linear` com callback ISO duplicava `2026-06, 2026-06…` e, em range estreito, o nice-rounding do Chart.js inflava ticks de 2021→2029 (~100 labels sobrepostos) → bounds e ticks agora derivados dos dados: marcos mensais (`jun/26`) quando span ≥ 60 dias, datas reais (`03 set`) quando menor.
5. **Emojis estruturais residentes** (critério §103): sub-tabs do dossiê (`📋/📊/💰/📜/️`), modos do comparador (`comp-mode-btn ×6`), tabs do plano-explorer (`tab-btn ×5`), botões `⚔️ Comparar…`, `🔍 Dossiê`/`⚔️` em ações de tabela (→ `vs`), selo `🛡️ Metrologia`, `⚖️ Trade-offs`, `🏷️ Aliases`, `🎯`, `🧭`, `📊 Cobertura`, ícone da bandeja flutuante. Emojis comunicativos (toasts, estados vazios, ícones de intenção do dashboard) mantidos por §18.
6. **Bug latente exposto pelos tokens v2**: `.btn-table-action` nunca teve CSS (verificado em `git show HEAD:style.css`) — "Expandir/Recolher Todas" e ações de tabela renderizavam com aparência de fábrica (fundo cinza + texto slate ≈ contraste 1:1). Definida como componente real na camada Prompt-12 (surface-1, border-subtle, hover surface-2, focus ring).
7. **`scripts/visual-smoke.sh`**: montava a URL como `BASE/#rota?cb=…&theme=light` — query depois do hash nunca chega em `location.search`, logo os screenshots "light" eram byte-idênticos aos dark (paridade de tema não estava de fato coberta). URL reestruturada: `BASE/?cb=…&theme=…#rota`. Matriz regenerada e conferida.

Artefatos: `.agents/shots/v6/*.png` (estado intermediário + after dos fixes) e `.agents/shots/v6-final/*.png` (matriz oficial final escura/clara/mobile/tablet/deeplink). Testes após iteração: `npm test` (audit-data + smoke 13 rotas + links + history) → PASS; interação verificada ao vivo: tabs, rail por família, clique em nó → inspector, `Escape` fecha, deep link `#history?tab=lineages&family=…&node=…` abre/seleciona/centraliza, chips da timeline filtram (43→3 em "Preço"), toggle de tema, benchmark single-select com linha de tendência e cor por provedor.

## 9. Deferred (motivos)

- **Compare Eras (§72)** → Phase 2, conforme permitido pelo prompt.
- **Troca de fonte (§15)** → Inter mantido com escala/tracking corrigidos; risco de layout > ganho não comprovado.
- **Split de `style.css` em `styles/` (§98)** → camada Prompt 12 é uma seção nomeada no fim do arquivo; split real adiado p/ manter o carregamento simples no GitHub Pages.
- **Playwright em CI (§101)** → sem nova dependência; `scripts/visual-smoke.sh` + override `?theme` documentam e automatizam o procedimento com o Chromium já instalado.
- **Migração massiva de inline styles** nas views não tocadas (§24: "não fazer migração massiva irrelevante").
- **Ícones dos cards de intenção do dashboard** → emojis mantidos por função comunicativa/personalidade (§18 permite).
