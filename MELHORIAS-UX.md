# Spec de implementação — UX do Portal de Inteligência de Modelos

Documento para **outro agente implementar**. Não é brainstorm: é contrato.  
SPA em `http://127.0.0.1:3000/`. Código: `index.html`, `app.js`, `style.css` (confirmar o `href` no `<link>` — pode aparecer como `style.css`), `data.js`, `server.js`.

**Nada disto foi implementado ainda.** Antes de cada PR, `grep` os IDs reais: há drift histórico (`btnModeCards` vs `btnModeCards`, `dashboardFilterChips` vs `dashboardFilterChips`). **O grep ganha deste texto.**

---

## 0. Decisões que mudaram ao detalhar o código

| Ideia antiga | O que o código mostrou | Decisão nova (seguir esta) |
| --- | --- | --- |
| “Mover o toggle Cards / Tabela Densa para o ranking” | `btnModeCards` / `btnModeTable` **não mudam a tabela**. Só fazem `display:none` em `.kpi-grid` e `.quick-estimator-widget` e dão scroll até a tabela | **Apagar o toggle.** KPIs + estimador ficam sempre visíveis. Opcional: link “Ir ao catálogo” no `view-header` |
| “Router em wizard de 3 passos” | `#view-router` **já é** 3 grupos (`routerTaskChips`, `routerBudgetChips`, `routerPrivacyChips`) com `label` 1/2/3 | **Não reescrever o fluxo.** Corrigir visual (grupos empilhados, `aria-pressed`, resultado sticky) |
| “KPI filtra o ranking **ou** abre dossiê” | Hoje `onclick="location.hash='#model/…'"` **sai da home** para `#model/:id` | **KPI abre o drawer** (`openQuickInspector(id)`), igual à linha da tabela. Dossiê completo só no footer do drawer. Usuário não perde o dashboard |
| “Inventar Comparar N do zero” | `AppState.comparatorModels` já tem **4 slots** e a rota lê `?models=` | Checkbox / “Adicionar à comparação” grava nesses slots + **bandeja fixa** “Comparar n/4” → `#comparator?models=` |
| “Sidebar de 5 links, jogar o resto em Laboratório” | Já existem **4 zonas** (Descoberta, Inteligência, Engenharia, Finanças) | Não destruir a IA. **Fixar** Dashboard, Comparador, Router, VRAM. Zonas 2–4 viram `<details>` recolhidos por padrão (exceto o link pinado que estiver nela) |
| “Modal de exportar vira view artigo” | `openExportModal` já gera Markdown numa textarea | Manter modal **pequeno**. Incluir comando na palette, **ESC**, clique no overlay, botão **Baixar .md** (`Blob`). Relatório não precisa de rota nova neste ciclo |
| Overflow “é o grid de KPIs” | `.kpi-grid` é `auto-fit, minmax(260px, 1fr)` — em tese cabe. Header tem busca ~520px + pills VRAM/Router + 📥. Tabela tem coluna extra | Priorizar **header magro** e **minmax(0,1fr)** no shell. Medir `document.documentElement.scrollWidth` depois de cada PR |

---

## 1. Princípios (desempate)

1. Um controle, um lugar.
2. Header = sessão (busca, tema, menu ⋯). Lista = abrir / filtrar / comparar.
3. Ícone sem texto só em fechar e topo; sempre `aria-label`.
4. Um eixo de filtro visível; o resto em “Mais filtros”.
5. Reusar `AppState` e hashes existentes (`#dashboard`, `#model/:id`, `#comparator?models=`, `#calculator`, `#router`).
6. Tema = os **mesmos nomes** de token; zero `rgba(255,255,255,…)` em componente.

Não redesenhar: palette Ctrl/Cmd+K, drawer, 4 zonas da nav, ideia dos KPIs, Chart.js nas views de benchmark/radar/pareto.

---

## 2. Arquitetura alvo (depois de todos os PRs)

```
Header     marca PT · [Buscar  Ctrl K] · [Tema] · [⋯]
Sidebar    pinados: Dashboard, Comparador, Router, Calculadora VRAM
           <details> Inteligência | resto Engenharia | resto Finanças
Main       view hash como hoje
Drawer     overlay fixed (já é); ESC + backdrop (export também)
Bandeja    só se 1–4 modelos na comparação (bottom, não tapa o drawer)
```

Shell CSS esperado:

```css
.app-shell { /* ou o seletor real: .app-layout / .layout-root */
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  max-width: 100%;
}
.app-main { min-width: 0; max-width: 100%; }
```

`body { overflow-x: hidden }` **não** é solução: esconde o bug. O conteúdo tem de caber.

---

## 3. Mapa do código (âncoras)

Use estes nomes como ponto de partida; confirme com grep.

| Peça | Onde |
| --- | --- |
| Tokens | topo de `style.css` (`:root`, `--bg-base`, `--text-primary`, …) |
| `color-scheme` | `html` em CSS + `<meta name="color-scheme" content="dark">` + `<meta name="theme-color">` em `index.html` |
| `body.theme-dark` | `index.html` — gancho morto |
| Header | `.global-header` / `.app-header`; `#commandTriggerBtn`; pills `.quick-nav-pill`; `#exportReportBtn` |
| Sidebar | `#appSidebar`; links `.nav-link[data-route]` |
| Dashboard | `#view-dashboard`; `.kpi-grid`; `.kpi-card`; `#dashboardSearchInput`; `#dashboardFilterChips`; `#dashboardTableBody` |
| Toggle inútil | `#btnModeCards`, `#btnModeTable` em `initGlobalEvents` |
| Drawer | `#quickInspectorDrawer`, `#drawerBackdrop`, `openQuickInspector` / `closeQuickInspector` |
| Export | `#exportModalOverlay`, `openExportModal` — **ESC não fecha** |
| Palette | `#commandModalOverlay`, Ctrl+K — ESC já fecha |
| Router | `#view-router`, `initModelRouter`, `AppState.routerTask\|Budget\|Privacy` |
| Comparador | `AppState.comparatorModels`, parse de `?models=` em `handleRoute` |
| Charts | `AppState.charts.*` = instâncias Chart.js; recriar no tema |
| Rotas | `handleRoute` + `view-${route}`; dossiê `route === 'model'` |

---

## 4. PR 1 — Fundação de tema (obrigatório primeiro)

Sem isto, cada tela nova congela hex dark.

### 4.1 Modelo de dados

Atributo **`data-theme` no `<html>`**, valores `light` | `dark`.

`localStorage` chave `ai-portal-theme`: `light` | `dark` | `system` (default `system`).

Função única em `app.js`:

```js
function getPreferredTheme() {
  const saved = localStorage.getItem('ai-portal-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0d14' : '#f4f6fb');
  // destruir e re-render charts da rota atual
}
```

Listener opcional: se a preferência for `system`, `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', …)`.

### 4.2 Anti-FOUC

**Primeiro script do `<head>`**, antes do CSS se possível, senão imediatamente após o `<link>`:

```html
<script>
(function () {
  try {
    var s = localStorage.getItem('ai-portal-theme');
    var t = (s === 'light' || s === 'dark') ? s
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.colorScheme = t;
  } catch (e) {}
})();
</script>
```

Não esperar `DOMContentLoaded`.

### 4.3 Tokens

Manter **os nomes atuais**. Duplicar o bloco:

```css
:root,
[data-theme="dark"] { /* valores atuais de :root */ }

[data-theme="light"] {
  --bg-base: #f4f6fb;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #ffffff;
  --bg-card: #ffffff;
  --bg-card-hover: #f0f3f9;
  --bg-glass: rgba(255, 255, 255, 0.92);
  --bg-glass-heavy: rgba(255, 255, 255, 0.97);

  --border-subtle: rgba(15, 23, 42, 0.10);
  --border-medium: rgba(15, 23, 42, 0.16);
  --border-accent: rgba(8, 145, 178, 0.45);

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --text-inverse: #f8fafc;

  --accent-cyan: #0e7490; /* mais escuro que #06b6d4: AA em texto pequeno no branco */
  --accent-blue: #1d4ed8;
  /* demais acentos: versão “on-light”, ~1 passo mais escura que o dark */

  --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.08);
  --shadow-md: 0 6px 20px rgba(15, 23, 42, 0.10);
  --shadow-lg: 0 16px 40px rgba(15, 23, 42, 0.12);
  --shadow-glow-cyan: none; /* glow some no claro */
  --shadow-glow-purple: none;

  --grad-card-glow: none;
}

html { color-scheme: light dark; } /* não mais só dark */
```

Valores light acima são **ponto de partida**: o agente mede contraste no browser (header, `.nav-link.active`, chip `.active`, célula da tabela, botão primário). Texto primário e chip ativo ≥ **4.5:1**.

### 4.4 Varredura obrigatória de `rgba(255,255,255,…)`

Há dezenas em `style.css` (scrollbar, `.quick-nav-pill`, `.btn-icon`, hovers, bordas de widget). Cada um deve virar token, por exemplo:

- `--bg-hover`
- `--bg-hover-strong`
- `--border-subtle` (já existe — usar)
- `--scrollbar-thumb`

No claro, “branco 4%” some. Não deixar nenhum `rgba(255,255,255` em regra de componente depois deste PR.

`backdrop-filter` no header/sidebar: no claro reduzir blur ou usar fundo quase opaco (`--bg-glass`).

### 4.5 Chart.js

Helper:

```js
function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
```

Em `new Chart(...)`: `color`, `grid.color`, `ticks.color`, legendas = tokens (`--text-muted`, `--border-subtle`).  
Ao `applyTheme`, `chart.destroy()` e chamar de novo o `render*` da rota atual (`renderBenchmarkExplorer`, radar, pareto).

### 4.6 Toggle no header (pode ficar no PR 2 se o HTML do header for no mesmo commit — preferível **junto**)

Controlo: `#themeToggleBtn` à direita da busca.

- `aria-label`: “Ativar tema claro” quando dark, “Ativar tema escuro” quando light.
- Ícone SVG (sol/lua), não emoji solto.
- `aria-pressed` se for interruptor binário; ou dois botões num `role="group"` “Tema”.
- Ciclo sugerido: `system → light → dark → system` é demais para P0. **P0: binário light/dark** gravando explicitamente. Item “Usar tema do sistema” fica no menu ⋯ (PR 2).

### 4.7 Aceite PR 1

- Primeira visita com SO claro abre claro (sem flash preto→branco longo).
- F5 preserva escolha explícita.
- Dashboard, sidebar, tabela, um gráfico (Benchmarks ou Pareto) legíveis nos dois temas.
- `grep -n 'rgba(255, 255, 255' style.css` vazio (ou só dentro do bloco dark, se ainda houver — preferível zero).

---

## 5. PR 2 — Header magro + exportar decente

### 5.1 Remover pills VRAM e Router

HTML: âncoras `.quick-nav-pill` para `#calculator` e `#router` no `.header-right`.  
**Apagar.** Destinos continuam na sidebar (`data-route="calculator"`, `data-route="router"`).

Não substituir por um dropdown “Ferramentas” neste PR — a nav já cobre.

### 5.2 Busca do header

`#commandTriggerBtn` hoje imita `<input>` largo (~520px) e só abre a palette.

Virar **botão compacto**:

```
[ 🔍 Buscar          Ctrl K ]
```

Largura máxima ~280px; em viewport &lt; 1100px esconder o texto “Buscar”, ficar ícone + `aria-label="Buscar (Control K)"` (Mac: `⌘K` se `navigator.platform` tiver Mac).

Não criar um segundo campo de busca global. O catálogo já tem `#dashboardSearchInput` — esse filtra só a tabela; manter.

### 5.3 Marca

- Título visível em PT-BR, ex.: “Portal de Inteligência de Modelos”.
- Subtítulo curto, ex.: “Benchmarks, hardware e custo”.
- Badge “Agosto / 2026 • 42 Modelos”: **sair do header**. Ir para `.sidebar-footer` ou um `footer` da view Dashboard “Dados: ago/2026 · 42 modelos · 34 runs”. Não duplicar nos dois.

### 5.4 Exportar

Hoje: `#exportReportBtn` só 📥, `title="Exportar Relatório em Markdown"`, sem `aria-label`. Abre `#exportModalOverlay`. Overlay **não** escuta ESC (o handler de ESC só fecha o drawer). Clique fora: verificar; se não fechar, implementar.

**Fazer:**

1. Tirar o botão ícone do header.
2. Menu `#headerMoreMenu` (botão ⋯, `aria-haspopup="menu"`, `aria-expanded`):
   - Copiar relatório Markdown (chama `openExportModal` ou copia direto + toast).
   - Baixar `relatorio-modelos.md` (`Blob` + `a[download]`).
   - Usar tema do sistema (limpa a chave ou grava `system`).
3. Palette: adicionar item “Exportar relatório” / “Copiar relatório Markdown” em `renderCommandResults`.
4. ESC fecha export se `.open`; clique no overlay (alvo === overlay) fecha.
5. Modal: título “Copiar relatório”; CTA primário “Copiar”; secundário “Baixar .md”. Sem preview gigante — textarea `max-height: 40vh` ou omitir preview e só copiar/baixar.

Foco: ao abrir, `focus()` no botão primário ou na textarea; ao fechar, devolver foco ao ⋯.

### 5.5 Aceite PR 2

- Header em 1280px sem wrap nem scroll-x.
- Nenhum atalho VRAM/Router no topo.
- Exportar acessível por ⋯ e por Ctrl+K; ESC fecha; arquivo .md baixa.
- Toggle de tema visível e nomeado.

---

## 6. PR 3 — Overflow da home + matar o toggle Cards/Tabela

### 6.1 Apagar o toggle

- HTML: `.view-toggle-group` / `#btnModeCards` / `#btnModeTable`.
- JS: bloco em `initGlobalEvents` que seta `display` no grid e no estimador.
- `AppState.dashboardViewMode` se existir: remover.

Substituir, se fizer falta, por um `<a href="#catalog-anchor">Ir ao catálogo</a>` no `view-header`.

### 6.2 KPIs: 9 cards hoje

Há **9** `.kpi-card` (não 8), todos com `onclick` para `#model/…`.

**Layout:**  
`grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));`  
`minmax(0, 1fr)` nos filhos. Em ≥1440px, **no máximo 4 colunas** (`repeat(4, minmax(0, 1fr))` com media query). Em 1280: 3; em 900: 2; em 390: 1.

Não esconder 5 cards atrás de “mais destaques” neste PR, a menos que 9×4 ainda estoure. Se estourar, os 5 menos críticos vão para `<details>Mais destaques</details>` **abaixo** dos 4 primeiros (Sweet Spot, #1 CursorBench, #1 Terminal, Ultra C/B — nesta ordem).

### 6.3 Clique no KPI

Trocar `onclick="location.hash=..."` por:

```html
<button type="button" class="kpi-card" data-model-id="grok-4-6">
```

(card semanticamente botão, ou `role="button"` + Enter/Espaço se permanecer `div`.)

Listener único no `.kpi-grid`: `openQuickInspector(id)`.  
Chevrons no canto: texto visual “Inspecionar” em `sr-only` ou no footer do card.

Não navegar para `#model/` no clique do KPI.

### 6.4 Tabela

- Linha já tem `onclick` → `openQuickInspector` — manter.
- Remover a coluna **Ações** e o `<button class="btn-icon">📄</button>` em `renderDashboardTable` (hoje `stopPropagation` + `location.hash='#model/…'`).
- “Dossiê completo” permanece no footer do drawer (`#drawerBtnFullDossier` → `#model/${id}`).
- `colspan` do empty state: ajustar se cair uma coluna.
- `.table-responsive { overflow-x: auto }` ok; a tabela **não** deve forçar `scrollWidth` do `body`. Garantir `min-width: 0` no main.

### 6.5 Drawer vs página

`.quick-inspector-drawer` já é `position: fixed`. Se ainda houver scroll-x, a causa é `width: 380px` + conteúdo interno com min-width, ou o main. Não somar `margin-right` no main quando o drawer abre.

Área de clique de `#drawerCloseBtn` ≥ 32×32 (`min-width/height`, padding).

### 6.6 Aceite PR 3

- 1440×900 e 1280×800: `document.documentElement.scrollWidth <= window.innerWidth`.
- Sem botões Cards/Tabela Densa.
- Clique no KPI ou na linha abre o **mesmo** drawer; URL continua `#dashboard` até “dossiê completo”.

---

## 7. PR 4 — Catálogo: um eixo de filtro + comparar a partir da lista

### 7.1 Filtros

`AppState.dashboardFilter` + `data-filter` atuais (manter as chaves no JS):

`all` | `frontier` | `subagents` | `open-weights` | `multimodal` | `sub-dollar` | `opencode-go`

**UI nova:**

Barra visível (segmented, `role="tablist"` ou radiogroup):

- Todos (`all`)
- Frontier (`frontier`)
- Worker (`subagents`) — rótulo **Worker**, não “Subagentes & Worker”
- Local (`open-weights`)

`<details>` “Mais filtros”:

- Multimodal
- Sub-dólar (&lt; $1/M input)
- Disponível no Go

Só **um** `active` por vez (já é o comportamento JS). Não empilhar filtros (isso seria AND e muda o motor — fora deste PR).

Busca `#dashboardSearchInput` fica; placeholder “Filtrar o catálogo…”. Não duplicar Ctrl+K aqui.

O mesmo padrão visual (segmented vs “mais”) copiar depois em `#aaFilterChips` se o HTML for análogo — pode ser o mesmo PR se for copy-paste barato; senão PR 5.

### 7.2 Comparar N (reusa o comparador)

Estado: `AppState.comparatorModels` array de até 4 ids (já existe).

Na tabela: checkbox na primeira coluna, `click` com `stopPropagation` para não abrir o drawer.

- Marcar: preenche o primeiro slot vazio; se já tiver 4, toast “Máximo 4 modelos” e não marca.
- Desmarcar: tira o id, compacta slots.
- Bandeja `position: sticky; bottom: 0` no main (z-index &lt; drawer): “n de 4 selecionados” + botão **Comparar** (`location.hash = '#comparator?models=' + ids.filter(Boolean).join(',')`) + **Limpar**.

Na view comparador, os `<select>` já devem ler `AppState.comparatorModels` no `render` (hoje o `handleRoute` já parseia query). Garantir que marcar na tabela e clicar Comparar preenche os selects.

Não remover a view `#view-comparator` nem o link da sidebar.

### 7.3 Aceite PR 4

- 7 chips na mesma fileira → 4 segmentos + mais filtros.
- É possível ir do dashboard ao comparador com 2–4 modelos sem abrir a view antes.
- Deep-link `#comparator?models=id1,id2` continua válido.

---

## 8. PR 5 — Sidebar + Router + outras telas (padrão, não rewrite)

### 8.1 Sidebar

Estrutura atual (não apagar zonas):

1. Descoberta: Dashboard, Provedores, Comparador  
2. Inteligência: AA, Benchmarks, Radar, Pareto  
3. Engenharia: VRAM, Harnesses, Troubleshooter  
4. Finanças: Simulador, ROI, Router, Antigravity, Privacidade  

**Pinados sempre visíveis** (repetir o `<a>` só uma vez — tirar da zona se a zona recolher):

- Dashboard (`dashboard`)
- Comparador (`comparator`)
- Router (`router`) — mover para cima, junto dos pinados, mesmo que semanticamente seja “finanças”
- Calculadora VRAM (`calculator`)

Zonas 2, resto da 3, resto da 4: `<details class="nav-zone">` com `<summary>Inteligência</summary>`.  
`localStorage` `ai-portal-nav-open` JSON opcional; default **fechado**.

Badges `v4.1.1`, `16`, `2 Pools`: `aria-hidden="true"` se forem decorativos; ou texto no `title`. Não parecer botão.

Rodapé da sidebar: se o header já não mostra “42 modelos”, **aqui** é o lugar certo. Uma vez só.

Item ativo: `aria-current="page"` no `.nav-link.active`.

### 8.2 Router (polimento)

Não fundir os 11 chips numa fileira. Já são 3 `.wizard-step`.

- `role="radiogroup"` + `aria-checked` / `aria-pressed` em cada `.router-chip`.
- Resultado `#routerResultPanel` sticky abaixo do fold curto.
- Se `recommendModel` devolver vazio, estado vazio explícito, não painel em branco.

### 8.3 Outras views — o mínimo coerente

Não é para redesenhar cada ferramenta. Aplicar o **mesmo vocabulário de controle**:

| View | IDs típicos | Fazer |
| --- | --- | --- |
| Benchmarks | switcher de métrica + presets | métrica = segmented; presets = `<select>` ou lista, **não** o mesmo `.chip-btn` |
| Simulador | `#workloadFilterChips` | virar `<select>` “Cenário” ou radios empilhados com nome do plano |
| Harnesses | `#harnessMatrixTable` | manter matriz; botão primário já existente de copiar snippet; `overflow-x: auto` só na tabela |
| Troubleshooter | lista | um `<input type="search">` filtrando os cards (client-side, como o dashboard) |
| VRAM | `#calcModelSelect` | se `sessionStorage lastInspectedModelId` (setar ao abrir drawer), pré-selecionar |
| ROI | sliders | um botão “Calcular” só se hoje recalcular no `input` deixar a UI nervosa; senão deixar live e **não** inventar CTA |
| Provedores | grid | cada card: link “Ver modelos” → dashboard com busca = nome do provedor (preenche `#dashboardSearchInput` + hash dashboard) |
| Privacidade / Antigravity | — | não mexer no cromo além do tema |

### 8.4 Aceite PR 5

- Recarregar a página: laboratório fechado; 4 pinos visíveis sem scroll na sidebar em 900px de altura.
- Router continua 3 perguntas; teclado/leitor de tela entendem seleção exclusiva por grupo.
- De um provedor dá para aterrissar no catálogo filtrado por texto.

---

## 9. PR 6 — A11y, PT-BR, mobile 390

Fazer **depois** dos PRs 1–5 para não conflitar em HTML.

- Substituir emoji de **navegação e botões globais** por SVG inline (sidebar pode ficar com emoji neste ciclo se o SVG atrasar — mas 📈 duplicado em Benchmarks e ROI: um dos dois muda).
- Todo `.btn-icon` restante: `aria-label`.
- `:focus-visible` já existe no CSS — garantir que chips e KPI-botão não tenham `outline: none`.
- Palette: `aria-activedescendant` no input apontando o item `.selected` (hoje só classe CSS).
- Drawer: `aria-modal="true"`, trap de foco opcional (P6; se custar, pelo menos ESC e retorno de foco).
- Viewport 390: hamburger `#mobileMenuBtn` já existe; busca vira só ícone; KPIs 1 coluna; bandeja de comparar em coluna; pills de filtro com wrap (`flex-wrap`) sem overflow-x no body.
- `lang="pt-BR"` já está no HTML — textos EN da marca e chips “Cursor Models” / “Other Models” nas views de benchmark: traduzir ou prefixar “(Cursor)”.

### Aceite PR 6

- Lighthouse a11y da home ≥ o que já tem, sem regressão de contraste nos dois temas.
- 390×844: sem scroll horizontal.
- Navegação por Tab chega em busca, tema, ⋯, nav, KPI, tabela.

---

## 10. Ordem fechada e o que não misturar

| PR | Escopo | Não incluir |
| --- | --- | --- |
| 1 | Tokens, `data-theme`, anti-FOUC, charts, grep rgba branco | Redesign de header |
| 2 | Header, tema toggle se não entrou no 1, export, palette command | Filtros do catálogo |
| 3 | Kill toggle, grid KPIs, drawer a partir do KPI, sumir 📄, scrollWidth | Comparar N |
| 4 | Segmented + mais filtros, checkboxes, bandeja, query comparador | Sidebar `<details>` |
| 5 | Nav, router a11y, provedor→busca, polimento views | Mobile 390 completo |
| 6 | SVG, foco, 390px, microcopy | Features novas |

Cada PR deve deixar `127.0.0.1:3000` usável. Não um branch “big bang”.

---

## 11. Critérios globais de aceite (fim da série)

- 1440×900 e 1280×800: sem overflow-x no dashboard.
- Header: marca PT, busca compacta, tema, ⋯. Zero VRAM/Router/📥.
- Tema claro e escuro persistentes; charts legíveis.
- Um caminho principal para o dossiê: lista/KPI → drawer → “dossiê completo”.
- Comparar 2–4 modelos a partir da tabela.
- ESC fecha drawer, palette **e** export.
- Contraste AA nos dois temas nas amostras: header, nav ativa, chip ativo, td, botão primário.

---

## 12. Fora de escopo (o agente não deve fazer)

- Corrigir números, preços, nomes de modelos em `data.js` salvo se um `id` quebrar o `data-model-id`.
- PWA, SEO, service worker.
- High contrast / tema “sistema” além de `system` no menu ⋯.
- Trocar Chart.js, adicionar framework, bundler.
- Wizard novo do Router.
- View nova só para o relatório Markdown.
- Esconder overflow com `overflow-x: hidden` no `html` como “fix” do P0.

---

## 13. Checklist rápido por ficheiro

**index.html**  
meta theme-color dinâmico via JS; script anti-FOUC; `data-theme` no html; header; KPIs `data-model-id`; filtros; checkboxes; menu ⋯; `aria-*` no export; `<details>` nav.

**style.css**  
bloco `[data-theme="light"]`; tokens de hover/scrollbar; grid shell `minmax(0,1fr)`; KPI max 4 col; bandeja comparar; header compacto; zero branco translúcido em componente.

**app.js**  
`getPreferredTheme` / `applyTheme`; ESC unificado (drawer + export + menu ⋯); remover toggle cards/tabela; KPI → inspector; checkboxes → `comparatorModels`; item palette export; `cssVar` nos charts; `sessionStorage` modelo inspecionado para VRAM.

**data.js**  
só se faltar flag para filtro (não deve faltar: `openWeights`, `openCodeGo`, `modalities`, `pricing`, `badges`).

Testar à mão: F5 nos dois temas, Ctrl+K, ESC no export, clique KPI, comparar 2 modelos, 1280px e 1440px com DevTools.
