# Planejamento Mestre de Implementação (Arquitetura DevTools 2026 - Edição Expandida)
## Portal de Inteligência, Benchmarks Multidimensionais, Hardware & Engenharia de Modelos de IA

Este documento define a arquitetura técnica, o sistema de roteamento SPA com links compartilháveis, o design system, os 12 módulos funcionais e o cronograma executivo para a construção do **Portal de Inteligência de Modelos de IA (Edição Agosto/2026)**.

---

## 1. Visão Geral & Filosofia da Arquitetura

A plataforma é concebida como um **Portal de Engenharia de Software e DevTools de Alta Performance** (inspirado em referências como *Raycast, Linear, Vercel e Hugging Face Spaces*).

### Pilares Arquiteturais:
1. **Roteamento SPA por URL com Links Compartilháveis (`Hash Routing`)**: Cada tela, provedor, modelo individual, simulação de hardware e comparação lado a lado possui um link direto navegável.
2. **Command Palette Global (`Ctrl + K` / `Cmd + K`)**: Barra de comando flutuante acessível em qualquer ponto com busca fuzzy instantânea e navegação por teclado (`↑` `↓` `Enter`).
3. **Painel Retrátil de Inspeção Rápida (`Quick Inspector Drawer`)**: Gaveta lateral que desliza suavemente ao clicar em qualquer modelo em tabelas ou gráficos, permitindo consulta instantânea de specs e VRAM sem perder o contexto atual da página.
4. **Dossiês Técnicos Profundos (6 Sub-Abas)**: Páginas detalhadas de página inteira para cada um dos 45 modelos (*Visão Geral, Arquitetura & Tensores, Benchmarks & Thinking, Hardware & VRAM, Tarifas & Planos, Harnesses & ZDR*).
5. **Gráfico de Radar 10D de Capacidades**: Gráfico spider plotando o vetor de 10 dimensões (*Agentic Coding, Algoritmos, Tool & Shell, Reasoning, Multimodal, Long Context, Throughput, Custo-Benefício, Local Efficiency, Harness Portability*).
6. **Calculadoras de Engenharia de Alta Precisão**:
   - VRAM Real com compressão de KV Cache (*MLA, DSA, DeltaNet, Mamba-2*).
   - Custo Energético em Reais (R$/mês) com base na tarifa local de kWh.
   - Calculadora de ROI para equipes (API Direta vs Assinaturas vs Servidor Local).
7. **Assistente de Diagnóstico de Erros de Harness (`Troubleshooter`)**: Soluções documentadas para problemas conhecidos de integração em IDEs e CLIs.
8. **Exportador Universal**: Geração instantânea de relatórios técnicos em Markdown formatado para Notion/Obsidian/GitHub.

---

## 2. Mapa Completo de Rotas e Módulos da Interface

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ⚡ AI MODEL INTELLIGENCE PORTAL 2026                               [ 🔍 Command Palette (Ctrl + K) ]   │
├──────────────────────────┬──────────────────────────────────────────────────────────────────────────────┤
│  SIDEBAR NAVEGAÇÃO       │  VISUALIZAÇÃO DA ROTA ATIVA (SPA HASH ROUTING)                               │
│                          │                                                                              │
│  📊 1. Dashboard         │  /#dashboard       -> Visão Geral, KPIs de Topo & Resumo Executivo           │
│  🏢 2. Hub de Provedores │  /#providers       -> 14 Fabricantes & Filtro por Famílias                   │
│  📄 3. Dossiês Técnicos  │  /#model/:id       -> Dossiê de 6 Sub-Abas (com Quick Inspector Drawer)      │
│  📈 4. Benchmarks & Radar│  /#benchmarks      -> CursorBench Thinking, Radar 10D & Multi-Ledger         │
│  ⚖️ 5. Pareto & Eficiência│ /#pareto          -> Fronteira 2D (Qualidade x Custo/VRAM/Latência)         │
│  ⚔️ 6. Comparador        │  /#comparator      -> Batalha Lado a Lado Head-to-Head (URL compartilhável)  │
│  🖥️ 7. Hardware & VRAM   │  /#calculator      -> Calculadora de VRAM Real (MLA/DSA) & Custo Energético  │
│  💰 8. Custos & ROI      │  /#simulator       -> Simulador OpenCode Go, Cursor Pro & ROI de Equipe      │
│  🧭 9. Model Router      │  /#router          -> Assistente de Decisão & Cascata de Fallback            │
│  🔌 10. Harnesses & IDEs │  /#harnesses       -> Matriz 15x11 & Gerador de JSON para IDEs               │
│  🛠️ 11. Diagnóstico/Erros│  /#troubleshoot    -> Soluções de Erros Conhecidos nos Clientes de IDE       │
│  🔒 12. Privacidade & ZDR│  /#privacy         -> Matriz ZDR, Retenção 0-30d & Ledger Auditável          │
└──────────────────────────┴──────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Especificação Detalhada dos 12 Módulos

---

### Módulo 1: `/#dashboard` — Painel Executivo & KPIs
- **Header KPI Cards**:
  - 🌟 **Sweet Spot Geral**: `Grok 4.6 (Medium)` — 67,1% no CursorBench a $1,28/task (Pool Cursor).
  - 👑 **Líder Absoluto de Score**: `Grok 4.6 (XHigh)` — 70,8% no CursorBench ($2,81) e `GPT-5.6 Sol Max` (88,8 Terminal-Bench).
  - 💎 **Ultra Custo-Benefício**: `GPT-5.6 Luna (High/Max)` — 56,8% por $0,16 e 61,1% por $0,39.
  - ⚡ **Campeão Open-Weights Local**: `gpt-oss-20b (High)` — 60,7% no SWE-Verified cabendo em 16 GB (3,79 score/GB).
  - 🚀 **Executor de Altíssima Velocidade**: `Nemotron 3.5 Lightning (NVFP4)` — 135 tok/s decode e 45 ms TTFT.
  - 👁️ **Visão Multimodal de Baixo Custo**: `DeepSeek V4 Flash Vision Exp` — 83,9 Terminal / 75,9 Toolathlon.
  - 🎭 **Stealth Preview de 1M**: `Ox Alpha` — 1M tokens, Imagem + Vídeo nativo, gratuito em preview.
- **Tabela Densa Rápida**: Visão consolidada com busca instantânea, badges de status e clique que aciona o *Quick Inspector Drawer*.

---

### Módulo 2: `/#providers` & `/#provider/:id` — Hub de Provedores
- **Seletor de Fabricantes**: Cards interativos para os 14 provedores catalogados:
  *OpenAI, Anthropic, xAI, Google, DeepSeek, Alibaba Qwen, Moonshot Kimi, Z.ai GLM, Xiaomi MiMo, MiniMax, Tencent Hy3, NVIDIA, gpt-oss, Stealth (Ox Alpha)*.
- **Página de Provedor**: Ao clicar em uma família, lista todos os seus modelos ativos, licenças, políticas de privacidade e volume no OpenCode Go.

---

### Módulo 3: `/#model/:id` — Dossiê Técnico Completo do Modelo & Quick Inspector Drawer
Página detalhada de página inteira (e visualizável via gaveta lateral retrátil), com **6 Sub-Abas**:
1. **Ficha Canônica & Arquitetura**: Checkpoint oficial, nome de API, open-weights (*true/false*), parâmetros totais vs ativos, arquitetura (*MoE/Denso, MLA, DSA, DeltaNet, Mamba-2*), vocabulário e cutoff.
2. **Escalonamento de Thinking & Benchmarks**: Gráfico individual do modelo mostrando a evolução de score de *Low $\rightarrow$ Max*, tabela do CursorBench 3.2, Terminal-Bench e DeepSWE.
3. **Calculadora de Hardware Dedicada**: Tamanho dos pesos em disco nos formatos oficiais (*MXFP4, NVFP4, FP8, BF16, GGUF*), memória real ocupada com KV Cache calculado dinamicamente (8k a 1M tokens) e status de viabilidade para a GPU do usuário.
4. **Tarifas, Tiers & Assinaturas**: Preço de API direta (Standard, Cache Read/Write/Storage, Fast Tier), alerta de *Long-Context Cliff* (>200k Grok, >272k GPT-5.6), cota no OpenCode Go e pool no Cursor Pro.
5. **Matriz de Harnesses & Gerador de Configuração**: Status nos 11 clientes de IDE e botão **"Copiar Configuração JSON"** pronto para colar no `opencode.json`, `settings.json` do Qwen Code ou `.aider.conf.yml`.
6. **Governança, Privacidade & Fontes**: Retenção de dados (0 a 30 dias), status ZDR e links diretos para Hugging Face, papers e model cards oficiais.

---

### Módulo 4: `/#benchmarks` — Thinking Explorer, Radar 10D & Multi-Ledger
- **Segmented Control de Métricas**:
  - `Score (%) vs Effort` (Curvas de inteligência de todos os modelos).
  - `Custo ($/task) vs Effort` (Crescimento de custo por tarefa).
  - `Tokens / Task vs Effort` (Volume de tokens gerados).
  - `Ganho Marginal (ΔScore / ΔCusto)` (Eficiência de cada upgrade de thinking).
- **Radar 10D de Capacidades**: Gráfico spider comparativo plotando o vetor de 10 dimensões de cada modelo com suporte a sobreposição multi-modelo.
- **Multi-Benchmark Ledger**: Tabela comparativa com filtros por suíte (*CursorBench 3.2, Terminal-Bench 2.1/3.0, DeepSWE 1.1, SWE-bench Pro vs Verified, Toolathlon*).

---

### Módulo 5: `/#pareto` — Fronteira de Pareto & Eficiência
- Gráfico de dispersão 2D interativo com chaveamento dinâmico de eixos:
  1. **Qualidade × Custo por Tarefa** (*CursorBench Score vs Custo USD*).
  2. **Qualidade × VRAM Necessária** (*SWE-bench Verified vs GB VRAM*).
  3. **Qualidade × Latência / TTFT** (*Score vs Tempo em Segundos*).
- **Linha de Fronteira de Pareto**: Destaque para modelos não-dominados e etiqueta transparente para modelos dominados (`Dominado nesta visualização`).

---

### Módulo 6: `/#comparator` — Comparador Lado a Lado (Head-to-Head)
- Permite selecionar **2, 3 ou 4 modelos** simultaneamente.
- Gera URL direta compartilhável: `/#comparator?models=grok-4-6,gpt-5-6-sol,deepseek-v4-flash-0731`.
- **Tabela Comparativa com Realce de Vantagens**: Comparação lado a lado de specs, benchmarks, preços, VRAM, context window, suporte a FIM, tools e privacidade.

---

### Módulo 7: `/#calculator` — Calculadora de Hardware Local, VRAM & Custo Energético
- **Seletor de GPU do Usuário**:
  - *Consumer*: RTX 3060 12GB, RTX 4060 Ti 16GB, RTX 4080 16GB, RTX 3090/4090 24GB, RTX 5090 32GB.
  - *Workstation / Mac*: Dual RTX 4090 (48GB), RTX Pro 6000 (48/96GB), Mac Studio M2/M3/M4 (64GB, 128GB, 192GB, 256GB).
  - *Datacenter*: NVIDIA A100 80GB, H100 80GB, H200 141GB, Cluster Multi-GPU.
- **Sliders Interativos**: Tamanho de Contexto (8k a 1M) e precisão de quantização (*MXFP4, NVFP4, FP8, GGUF Q4_K_M, BF16*).
- **Cálculo Matemático Real**:
  $$\text{VRAM Total} = \text{Pesos em VRAM} + \text{KV Cache (com Fator de Compressão MLA/DSA)} + \text{Overhead CUDA}$$
- **Calculadora de Custo Energético**: Usuário informa o valor do kWh (ex: R$ 0,85) e calcula o custo em Reais por 100 tarefas locais vs pagar API na nuvem.

---

### Módulo 8: `/#simulator` — Simulador de Custos, Planos & ROI de Equipe
- **Simulador de Assinaturas (Go vs Cursor vs API)**:
  - Sliders de volume diário de requisições, tamanho médio de repositório e percentual de cache hit (padrão: 99,4%).
  - Cálculo de dias até esgotar a franquia e alerta piscante quando *Fast Mode* está ativo no Cursor Pro.
- **Calculadora de ROI para Equipes**:
  - Usuário informa número de devs no time e tarefas/mês, gerando o comparativo de custo anual e tempo de amortização de hardware local vs nuvem.

---

### Módulo 9: `/#router` — Roteador Inteligente de Modelos (Model Router)
- Formulário interativo com 3 etapas:
  1. *Tipo de Tarefa*: Autocomplete (<50 ms), Bug Fix rápido, Feature complexa multi-arquivo, Arquitetura/Design, UI/Screenshots, Subagentes em lote.
  2. *Orçamento*: Grátis/Econômico, Custo Moderado, Máxima Inteligência Absoluta.
  3. *Privacidade*: Nuvem pública permitida vs 100% Local / ZDR obrigatório.
- **Saída**: Modelo Primário Recomendado, **Cascata de Escalonamento por Falha (Fallback Cascade)** (*Plano A $\rightarrow$ Plano B $\rightarrow$ Plano C*) e estratégia *Planner $\rightarrow$ Executor $\rightarrow$ Reviewer*.

---

### Módulo 10: `/#harnesses` — Matriz 15×11 & Gerador de JSON para IDEs
- **Matriz 15×11 de Compatibilidade**: Suporte, protocolo e fidelidade de reasoning/tools entre os modelos e os 11 harnesses.
- **Gerador de Configuração**: Botões de um clique para gerar e copiar arquivos de configuração prontos para `opencode.json`, `settings.json` do Qwen Code, `.aider.conf.yml` e Grok Build.

---

### Módulo 11: `/#troubleshoot` — Diagnóstico & Solução de Erros de Harness
- Guia interativo de resolução para os problemas mapeados:
  - *Tags `<think>` vazando no código ao aplicar diff*.
  - *Cota do Cursor Pro drenando 6× mais rápido (Composer Fast ativo)*.
  - *Erro de `wire_api` no Codex CLI com modelos externos*.
  - *Paradas prematuras do Ox Alpha no OpenCode*.
  - *Roo Code quebrando por falta de Native Tool Calling em modelos locais*.

---

### Módulo 12: `/#privacy` — Matriz ZDR, Retenção & Ledger Auditável
- **Matriz de Privacidade & ZDR**: Retenção (0 a 30 dias), treinamento e validade de acordos ZDR.
- **Ledger Auditável de Fontes**: Links diretos para Hugging Face, GitHub, documentações oficiais e papers.
- **Exportador de Relatório**: Botão para exportar a análise comparativa em Markdown estruturado.

---

## 4. Command Palette Global (`Ctrl + K` / `Cmd + K`)

A barra de comando flutuante permite:
- Buscar por modelo (ex: *"Luna"*, *"Grok 4.6"*, *"Ox Alpha"*, *"gpt-oss-20b"*).
- Buscar por fabricante (ex: *"Anthropic"*, *"DeepSeek"*, *"Xiaomi"*, *"NVIDIA"*).
- Buscar por funcionalidade (ex: *"Modelos com 1M e Vídeo"*, *"Modelos que rodam em 16GB"*).
- Ações rápidas: *"Abrir Calculadora de VRAM"*, *"Simular OpenCode Go"*, *"Comparar Grok vs Sol"*, *"Calcular ROI de Equipe"*.

---

## 5. Roteiro Passo a Passo de Execução

---

### 🟢 FASE 1: Camada de Dados Consolidada (`data.js`)
- [ ] Catálogo canônico das **45 entidades**.
- [ ] **34 registros oficiais do CursorBench 3.2** por nível de effort.
- [ ] Tabelas de ganhos marginais ($\Delta\text{Score}/\Delta\text{Custo}$) e sweet spots.
- [ ] Ledger multi-benchmark consolidado (*Terminal 2.1/3.0, DeepSWE, SWE-bench, Toolathlon*).
- [ ] Matriz de 10 dimensões para o Radar Chart.
- [ ] Tarifas de API direta, tiers de long-context e planos (*OpenCode Go e Cursor Pro*).
- [ ] Specs de hardware local, tamanhos oficiais em disco e fatores de compressão de KV Cache.
- [ ] Matriz 15×11 de harnesses, tabela de privacidade/ZDR e base do Troubleshooter.
- [ ] Ficha canônica e dados técnicos completos do **Ox Alpha**.

---

### 🟢 FASE 2: Estrutura HTML & Layout SPA Modular (`index.html`)
- [ ] Header global com botão de busca `Ctrl + K` e badge de status.
- [ ] Sidebar de navegação com os 12 módulos temáticos.
- [ ] Containers modulares para as 12 seções da SPA.
- [ ] **Quick Inspector Drawer** (painel lateral retrátil).
- [ ] Container do Dossiê Completo do Modelo (6 sub-abas).
- [ ] Modal da Command Palette (`Ctrl + K`).

---

### 🟢 FASE 3: Design System Dark Mode Glassmorphism (`style.css`)
- [ ] Tokens de cores CSS, tipografia *Inter* e *JetBrains Mono*, e sombras em gradiente.
- [ ] Cores semânticas por família de fabricante (*OpenAI, Anthropic, xAI, Google, DeepSeek, etc.*).
- [ ] Estilização dos cards KPI, tabelas interativas com sticky headers e sliders de simulação.
- [ ] Estilização da Command Palette e do Quick Inspector Drawer.
- [ ] Layout responsivo adaptável para telas de 360px a 2560px.

---

### 🟢 FASE 4: Motor de Lógica, Roteamento & Gráficos (`app.js`)
- [ ] **Roteador SPA por URL (`Hash Routing`)** com histórico de navegação.
- [ ] **Command Palette (`Ctrl + K`)** com busca fuzzy e navegação por teclado.
- [ ] **Quick Inspector Drawer** reativo ao clique em qualquer tabela ou gráfico.
- [ ] Gráficos dinâmicos com **Chart.js** (*CursorBench, Radar 10D, Pareto, Ganho Marginal, Bar charts*).
- [ ] Renderizador do **Dossiê Completo de cada Modelo** (6 sub-abas).
- [ ] **Calculadora de VRAM Real** com fórmulas não-lineares e custo elétrico.
- [ ] **Simulador de Assinaturas & ROI de Equipe** com alerta de Fast mode.
- [ ] **Comparador Lado a Lado (Head-to-Head)** com URL compartilhável.
- [ ] **Roteador Inteligente de Modelos (Model Router)**.
- [ ] **Troubleshooter de Harnesses** e gerador de arquivos de configuração para download/cópia.
- [ ] **Exportador de Relatórios em Markdown**.

---

### 🟢 FASE 5: Validação, Testes & Reindexação
- [ ] Auditoria cruzada de integridade de dados contra o `info-modelos-ia.md`.
- [ ] Testes de responsividade em resoluções mobile, tablet e desktop widescreen.
- [ ] Reindexação final do repositório no `jCodeMunch`.
