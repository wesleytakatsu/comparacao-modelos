# ⚡ Portal de Inteligência de Modelos de IA 2026

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=flat-square&logo=github)](https://wesleytakatsu.github.io/comparacao-modelos/)
[![CI Quality Gate](https://img.shields.io/badge/CI-Passing-brightgreen?style=flat-square&logo=githubactions)](https://github.com/wesleytakatsu/comparacao-modelos/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)](index.html)

Grafo temporal analítico e plataforma interativa de tomada de decisão para engenharia de software e comparação multidimensional de modelos de Inteligência Artificial de fronteira (Claude Fable 5.1, Gemini 3.8 Flash, Grok 4.6, GPT-5.6, Claude 5, Gemini 3.7, DeepSeek V4, GLM-5.3-Flash, gpt-oss, Nemotron 3.5, etc. — Edição Setembro/2026).

🌐 **Acesse a versão online:** [https://wesleytakatsu.github.io/comparacao-modelos/](https://wesleytakatsu.github.io/comparacao-modelos/)

---

## 🏛️ Os Dois Eixos Canônicos de Evidência Metrológica

Para garantir máxima integridade e transparência metrológica, todo número, score ou afirmação no portal é classificado segundo dois eixos ortogonais:

### Eixo 1 — Proveniência / Origem (`provenanceTier`)
* **`O` — Oficial (Fabricante):** Extraído diretamente de relatórios primários, model cards e ledgers dos laboratórios criadores (OpenAI, Anthropic, Google DeepMind, xAI, Zhipu AI, Moonshot AI, DeepSeek).
* **`I` — Independente (Harness Auditado de Terceiros):** Avaliações padronizadas e reproduzíveis por harnesses neutros de metrologia (*Artificial Analysis Intelligence Index v4.1.1, CursorBench 3.2, Terminal-Bench 2.1/3.0, SWE-bench Verified, DeepSWE 1.1*).
* **`C` — Comunidade (Empírico de Engenharia):** Relatos consolidados de times em produção, incidentes de recusa e divergências empíricas auditadas.

### Eixo 2 — Natureza Metrológica (`nature`)
* **`M` — Medido:** Execução factual de benchmark ou teste prático com semente, dataset e harness formalmente identificados.
* **`D` — Derivado:** Agregação ponderada de múltiplas métricas medidas (e.g., índices de ranking e scores compostos).
* **`C` — Calculado:** Projeção matemática determinística sobre dados tabelados (e.g., custo por tarefa no simulador de tokens, precificação de contexto).
* **`A` — Calibrado / Estimado:** Modelagem vetorial calibrada (e.g., Radar de Capacidades 10D, Estimador de VRAM para KV Cache).

---

## 🗺️ As 13 Rotas Canônicas da Aplicação (SPA)

A aplicação é uma Single Page Application construída em Vanilla JavaScript sem etapa de compilação, com roteamento completo por URL hash, suporte a navegação do navegador (*back/forward*), atualização de página (*refresh*) e *deep links* diretos:

1. **`#dashboard`** — Visão geral executiva com KPIs globais de catálogo, campeões de fronteira, custo-benefício e destaques.
2. **`#models`** — Catálogo explorador completo de modelos de IA com filtros por provedor, licença, modalidade e raciocínio.
3. **`#model/:id`** — Dossiê aprofundado do modelo com 10 seções analíticas, especificações, proveniência e histórico de execuções.
4. **`#plans`** — Explorador de Planos de Assinatura, matriz de onde usar cada modelo, assistente de recomendação e stacks orçamentários.
5. **`#plan/:id`** — Dossiê completo de plano com faturamento, quotas, franquias, limites de taxa e fontes auditadas.
6. **`#use-cases`** — Matriz de casos de uso da engenharia com pesos dinâmicos, ranking sensível a trade-offs e orquestração.
7. **`#use-case/:id`** — Dossiê individualizado de caso de uso com análise de sensibilidade e modelos recomendados.
8. **`#compare`** — Comparador Multidimensional Inteligente com cálculo de índice de confiança, destaque de deltas, trade-offs com modelo de referência e fronteira de Pareto explicada.
9. **`#benchmarks`** — Hub do registro canônico de benchmarks com metodologia, líder atual e critérios de avaliação.
10. **`#benchmark/:id`** — Dossiê aprofundado do benchmark com histórico de execuções registradas e metrologia.
11. **`#provider/:id`** — Dossiê de entidade provedora (laboratório) com modelos ativos, reputação e políticas.
12. **`#platform/:id`** — Dossiê de plataforma de execução (Cursor, OpenCode Go, Antigravity, OpenRouter, Local).
13. **`#data-health`** — Painel de governança e saúde de dados com monitor de frescor temporal (*fresh/aging/stale*), auditoria de referências e fila de revisão de claims substituídos.

---

## 🧠 Arquitetura do Domínio v2

O portal opera sobre uma arquitetura de entidades desacopladas em `data/domain.js`:

* **`BENCHMARK_REGISTRY`**: Catálogo canônico de 12 benchmarks formais divididos em 9 categorias (Coding, Tool Use, Math, Multimodal, Context, etc.).
* **`ModelConfiguration`**: Mapeamento explícito de variações de execução (reasoning effort: Low, Medium, High, Max; contexto; surface).
* **`Offering`**: Relação entre modelo, plataforma de disponibilização e modalidade econômica (API direta, assinatura, pay-per-stream).
* **`BenchmarkRun` (`BENCHMARK_RUNS_DATA`)**: Execuções metrológicas rastreáveis com timestamp, harness, versão, modelo de raciocínio e scores.
* **`Claim` (`CLAIMS_DATA`)**: Afirmações competitivas com status (`verified`, `provisional`, `superseded`) e chave de substituição (`supersededByClaimId`).
* **`DomainComparison`**: Motor estatístico para cálculo de índice de confiança métrica, identificação de divergências e análise de fronteira de Pareto.
* **`DomainImpact`**: Motor de simulação preditiva capaz de recalcular lideranças gerais e setoriais ao injetar novos benchmarks ou modelos.
* **`DomainHealth`**: Motor de governança que inspeciona o frescor dos dados contra o relógio real do sistema e detecta pendências de auditoria.

---

## 📁 Estrutura do Projeto

```text
.
├── index.html                  # Interface SPA principal, containers canônicos e acessibilidade
├── style.css                   # Sistema de design tokens, layouts responsivos e temas
├── app.js                      # Roteamento SPA, controle de estado global e interatividade
├── data.js                     # Grafo canônico de modelos, pricing, benchmarks e claims
├── data/
│   ├── domain.js               # Domínio v2: Registry, Runs, Claims, Impact, Confidence, Health
│   ├── entity-views.js         # Vistas e dossiês de entidades (Provider, Platform, Benchmark, UseCase)
│   ├── plan-dossier.js         # Dossiê normativo de planos com 10 seções completas
│   ├── data-health-view.js     # Painel de governança de dados e fila de revisão
│   ├── fx.js                   # Cotações cambiais e helpers de conversão USD/BRL/CNY
│   ├── plans.js                # Banco de planos de assinatura e budget stacks
│   ├── plan-explorer.js        # Motor funcional do Explorador de Planos e Wizard determinístico
│   ├── platforms.js            # Catálogo de plataformas (OpenCode Go, Cursor, camelAI, etc.)
│   ├── history.js              # Linhagens genealógicas e eventos históricos
│   ├── community.js            # Relatos auditados e divergências empíricas da comunidade
│   ├── behavior.js             # Matriz de comportamento qualitativo de engenharia
│   ├── use-cases.js            # Casos de uso com critérios, pesos e sensibilidade
│   └── pricing-history.js      # Séries históricas de deflação de preços de inferência
├── docs/                       # Documentação histórica e metodológica arquivada
│   ├── prompts/                # Cadernos de especificação e prompts normativos (01 a 09)
│   ├── methodology/            # Notas metodológicas sobre modelos e benchmarks
│   ├── archive/                # Arquivos históricos de UX e planejamento prévio
│   ├── audits/                 # Relatórios de auditoria estática
│   └── migrations/             # Registros de migrações estruturais
├── scripts/
│   ├── audit-data.js           # Suíte de auditoria profunda de integridade e metrologia
│   ├── smoke-test.js           # Smoke test automatizado das 13 rotas canônicas
│   └── test-links.js           # Validador de links e integridade referencial
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline de Integração Contínua (CI)
├── server.js                   # Servidor HTTP local em Node.js (opcional)
├── start.sh                    # Script utilitário de inicialização
└── package.json                # Metadados do projeto e scripts de qualidade
```

---

## 🚀 Como Executar Localmente

### Opção 1: Abrir diretamente no navegador
Por ser uma aplicação 100% estática sem build step, basta abrir o arquivo `index.html` em qualquer navegador:
```bash
# No Linux
xdg-open index.html
```

### Opção 2: Servidor Node.js integrado
```bash
npm start
# O servidor iniciará em http://localhost:3000
```

---

## 🧪 Suíte de Testes e Controle de Qualidade

O projeto conta com validações automatizadas integradas em pipeline de CI:

```bash
# Executa a suíte de testes completa (auditoria + smoke test das 13 rotas + links)
npm test

# Executa apenas a auditoria de integridade do catálogo e dados
npm run test:data

# Executa o smoke test das 13 rotas canônicas da SPA
npm run test:smoke

# Valida integridade de links internos e âncoras
npm run test:links

# Executa simulação determinística do Impact Engine
npm run test:impact

# Valida carregamento limpo do Domínio v2
npm run test:domain
```

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte `package.json` para mais detalhes.
