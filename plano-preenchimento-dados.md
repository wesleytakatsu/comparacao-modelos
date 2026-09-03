# 🗺️ Matriz Real de Cobertura e Auditoria Técnica de Dados (44 Modelos)

> **Status:** ✅ Auditado e Validado com Metrologia Rigorosa  
> **Escopo:** Catálogo canônico consolidado de **44 modelos ativos** (incluindo `gemini-3-8-flash` e `claude-fable-5-1`).  
> **Data de Referência da Auditoria:** 2 de setembro de 2026  
> **Integridade de Código:** `scripts/audit-data.js` executado com 100% de sucesso (Zero erros, Zero NaNs).

---

## 🎯 Diretriz Metrológica da Auditoria

1. **Hierarquia de Veracidade das Fontes:**
   - **(O) Oficial:** Model cards, papers e documentações técnicas primárias dos fabricantes (Google DeepMind, Anthropic, OpenAI, xAI, DeepSeek, Meta, Alibaba, etc.).
   - **(T) Terceiro Independente:** Ledgers reproduzíveis com protocolo aberto (CursorBench 3.2, Artificial Analysis v4.1.1, DeepSWE 1.1, Terminal-Bench 2.1/4.0, SWE-bench Verified).
   - **(E) Estimativa Calibrada:** Vetores normalizados para visualização (Radar 10D) e projeções de workload.
   - **(C) Comunidade / Telemetria:** Casos experimentais explicitamente rotulados (ex: `deepseek-v4-vision-exp`).
2. **Política de Células Vazias (`N/D` / `null`):**
   - É terminantemente proibido inventar scores ou interpolar benchmarks inexistentes. Modelos sem testes oficiais ou independentes publicados mantêm seus campos como `null` / `N/D`.
3. **Preservação Histórica:**
   - Modelos como `gemini-3-7-flash` e `claude-fable-5` foram integralmente preservados com marcação adequada de status para viabilizar análises comparativas e geracionais.

---

## 📊 Matriz Real de Cobertura de Dados (Auditado em Setembro/2026)

| Módulo / Dimensão de Dados | Modelos Cobertos | % Cobertura Real | Status e Critério de Auditoria |
| :--- | :---: | :---: | :--- |
| **Especificações Canônicas** | **44 / 44** | **100%** | Arquitetura, atenção, janela de contexto, limites de saída, modalidades e capabilities. |
| **Precificação Estruturada** | **44 / 44** | **100%** | Input, output, prompt cache read, cache write (5m/1h) e mapeamento nos pools (Cursor/Go). |
| **Multi-Benchmark Ledger** | **44 / 44** | **100%** | Todos os 44 modelos indexados com as colunas auditadas disponíveis ou `null` quando não testados. |
| **Benchmarks Oficiais (Fabricante)** | **43 / 44** | **98%** | 43 modelos possuem model card oficial (incluindo GLM-5.3-Flash via Z.ai). Apenas `composer-2-5` opera como serviço proprietário sem model card aberto. |
| **CursorBench 3.2 (Baterias Reais)** | **16 / 44** | **36% (58 runs)** | 16 modelos frontier avaliados em múltiplos níveis de thinking (*Low, Med, High, XHigh, Max*). Os 28 modelos restantes permanecem como `N/D` por ausência de runs auditadas. |
| **Radar de Capacidades 10D** | **44 / 44** | **100%** | Vetores 0–100 calibrados para projeção comparativa nas 10 dimensões. |
| **Simulador de 5 Workloads** | **44 / 44** | **100%** | Cálculo dinâmico em tempo de execução via `AI_DATA_HELPERS.calculateRequestCost` para todos os 44 modelos. |
| **Dossiês: Guia Operacional** | **44 / 44** | **100%** | `idealFor`, `avoidFor` e fluxos de orquestração preenchidos individualmente. |
| **Hardware Local & Topologia VRAM** | **10 / 10** | **100%** | 100% dos modelos de pesos abertos com dimensionamento de quantização (INT4/FP8/BF16) e GPU recomendada (incluindo GLM-5.3-Flash de 320B). |
| **Privacidade, ZDR & Governança** | **11 / 44** | **25%** | Mapeamento explícito de Zero Data Retention, políticas de retenção de dados e segurança documental. |
| **Rastreabilidade e Fontes Primárias** | **44 / 44** | **100%** | Registro de proveniência através do registro `DATA_SOURCES` e metadados nos modelos principais. |

---

## 🏆 Principais Marcos da Atualização (Setembro/2026)

1. **Claude Fable 5.1 (Anthropic):**
   - **Novo #1 CursorBench 3.2:** Score recorde de **73,4%** no nível Max ($9,64 / task) e 72,8% no XHigh ($6,96).
   - **Líder Geral Artificial Analysis:** Intelligence Index **66**.
   - **Economia de Cache:** Cache read de **$0,25/M** (redução de 75% em relação ao Fable 5).
   - **Terminal-Bench 2.1:** **91,4%** (novo recorde do benchmark).
2. **Gemini 3.8 Flash (Google DeepMind):**
   - **Terminal-Bench 2.1:** Salto para **90,8%** (superando Gemini 3.7 Flash em +5,0 p.p.).
   - **DeepSWE 1.1:** **74% ±1%** ($2,36/task, 166 steps, 143k tokens).
   - **Throughput Extremo:** **305–310 tokens/segundo** e TTFT de 0,18 s.
   - **CursorBench 3.2:** **69,2%** no High ($2,38/task) e **67,0%** no Medium ($1,93/task).
   - **Google Antigravity:** Alocado no **Pool 1** (`gemini-models`).
3. **Claude Fable 5 (Predecessor):**
   - Preservado com status `superseded` para análise geracional.
   - Output máximo corrigido para **128k tokens** e cache read de $1,00/M.
4. **Revelação de Identidade: GLM-5.3-Flash (Z.ai — ex-Ox Alpha):**
   - Identidade oficial confirmada pela Z.ai em 26/08/2026: MoE de 320B total / 18B ativos sob licença permissiva MIT.
   - Atenção híbrida Sparse-Linear (mHC + IndexPool) com redução de 3.01× no compute de atenção e 4.44× no KV-cache.
   - Substituição canônica de `ox-alpha` no catálogo ativo (contagem mantida estritamente em 44 modelos).
   - Preservação do histórico preliminar da fase stealth preview (DeepSWE 58,4% em 113 tarefas).
   - Benchmarks oficiais Z.ai: Terminal-Bench 2.1 de 84,3%, DeepSWE 1.1 de 63,4%, Toolathlon de 78,4%.
   - Inclusão em Hardware Local (160GB INT4 / 320GB FP8 / 640GB BF16) com notas de CPU/RAM offload via KTransformers.

---

## 🧪 Verificação Automatizada

A integridade deste catálogo é garantida pelo script de teste contínuo:
```bash
node scripts/audit-data.js
```
O script executa 12 asserções automáticas de tipos, limites, unicidade de identificadores e consistência matemática de custos.
