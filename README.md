# ⚡ Portal de Inteligência de Modelos de IA 2026

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=flat-square&logo=github)](https://wesleytakatsu.github.io/comparacao-modelos/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)](index.html)

Portal analítico e interativo para engenharia de software e comparação multidimensional de **44 modelos de Inteligência Artificial** de ponta (incluindo Claude Fable 5.1, Gemini 3.8 Flash, Grok 4.6, GPT-5.6, Claude 5, Gemini 3.7, DeepSeek V4, GLM-5.3-Flash, gpt-oss, Nemotron 3.5, etc. — Edição Setembro/2026).

🌐 **Acesse a versão online:** [https://wesleytakatsu.github.io/comparacao-modelos/](https://wesleytakatsu.github.io/comparacao-modelos/)

---

## 🎯 Principais Recursos

- 📊 **Comparativo Multidimensional:** Matriz detalhada de especificações, janelas de contexto, cotas, suporte a áudio/vídeo e licenças.
- 👑 **CursorBench 3.2 & Artificial Analysis Index:** Benchmarks agênticos com ranking atualizado liderado por Claude Fable 5.1 (Max 73,4%).
- 🛡️ **Separação Semântica e Proveniência Metrológica:** Distinção rigorosa entre modelo, effort de raciocínio, surface, plataforma, plano, cota, privacidade e evidência com 4 tiers metrológicos auditados.
- 💳 **Catálogo Canônico de Assinaturas & Planos:** 49 planos canônicos cobrindo OpenAI, Claude, Google One AI, Cursor, OpenCode Go, Z.ai Coding, Kimi e camelAI com separação estrita entre acesso a modelos e recursos (Canvas, Workspaces, Storage).
- 💵 **Câmbio Multimoeda (USD / BRL / CNY):** Conversões instantâneas entre moedas com suporte a preços oficiais nacionalizados no Brasil (Google One AI Pro a R$ 96,99) e Yuan chinês.
- 🚀 **OpenCode Go & Quota Burn:** Catálogo canônico de 26 modelos oficiais com rastreamento de queima de franquia (modelos 1×, 2× e 4×).
- 🐫 **camelAI (camelCode & camelStream):** Documentação de hosted plans com workspaces persistentes, automações com anotação de conflito de fonte e inferência flat-rate ilimitada a US$ 5/stream/mês.
- 📜 **Histórico & Linhagens Genealógicas:** Rastreamento de releases stealth, predecessores arquiteturais e migrações geracionais.
- 👥 **Community Reports & Divergências:** Análise qualitativa confrontando métricas sintéticas de benchmark vs relatos auditados de desenvolvedores em produção.
- 🧠 **Engineering Behavior:** Matriz de características operacionais (aderência a schema, verbosidade, follow-up de instruções, refatoração de monorepo).
- 🧭 **Casos de Uso & Orquestração:** Receitas arquiteturais multi-modelo (Planner + Worker + Reviewer).
- 🌐 **Disponibilidade por Plataforma:** Matriz tipada para 44 modelos em 6 plataformas (Direct API, Cursor, OpenCode, Antigravity, OpenRouter, Local).
- 📈 **Pricing History:** Séries históricas de deflação de preços por token e tendências de custo.
- 📦 **Recomendador de Budget Stacks:** Arquitetura financeira clara separando custos fixos de assinatura e tarifação variável em créditos de uso.
- 🕸️ **Radar de Capacidades 10D:** Visualização gráfica comparativa de habilidades de raciocínio, codificação, multimodalidade e velocidade para todos os 44 modelos.
- 🖥️ **Calculadora de Hardware Local & VRAM:** Estimativa do consumo real de memória com KV Cache dinâmico e suporte a múltiplos formatos de quantização (*MXFP4, NVFP4, FP8, BF16, GGUF*).
- 💰 **Simulador Econômico de Tokens:** Cálculo do custo matemático por tarefa considerando tokens novos de input, taxas de cache hit e geração de saída/raciocínio.
- 📈 **Simulador de ROI de Equipes:** Projeção de retorno de investimento e ganho de produtividade de times de engenharia.
- 🧭 **Roteador Inteligente de Modelos:** Recomendação dinâmica com base na tarefa específica, restrições orçamentárias e requisitos de privacidade.
- 🔒 **Rastreabilidade e Governança:** Registro de proveniência com links diretos para model cards, papers e ledgers oficiais.
- 🌓 **Tema Claro e Escuro:** Alternância fluida e persistente com variáveis CSS e proteção contra flash de tema (zero FOUC).
- ⚡ **Zero Dependências de Backend:** Construído inteiramente com Vanilla JS, CSS3 puro e HTML5 com renderização de gráficos via Chart.js.

---

## 🏛️ As 4 Camadas de Evidência (Metrologia Auditada)

O portal adota uma metodologia estrita de classificação metrológica para qualquer dado apresentado:

1. **`O` — Official (Oficial de Lançamento):** Dados extraídos diretamente de fontes primárias do fabricante (model cards, papers técnicos, relatórios de segurança da OpenAI, Anthropic, Google DeepMind, SpaceXAI, Moonshot AI e Zhipu AI).
2. **`T` — Third-Party (Independente / Terceiros):** Avaliações de harnesses independentes e auditáveis com metodologia padronizada (*Artificial Analysis, CursorBench 3.2, Terminal-Bench 2.1/3.0, SWE-bench Verified, DeepSWE 1.1*).
3. **`C` — Community (Comunidade):** Relatos empíricos, testes de engenharia em produção e divergências documentadas entre benchmarks teóricos e comportamento real de desenvolvedores.
4. **`E` — Estimated / Calibrated (Estimado / Calibrado):** Projeções matemáticas e vetores multidimensionais calibrados (*e.g.*, Radar 10D e estimativas de hardware VRAM) explicitamente rotulados para evitar confusão com medições factuais.

---

## 🚀 Como Executar Localmente

### Opção 1: Abrir diretamente no navegador
Por ser uma aplicação 100% estática, basta abrir o arquivo `index.html` diretamente no seu navegador preferido:
```bash
# No Linux
xdg-open index.html
```

### Opção 2: Servidor Node.js integrado
```bash
npm start
# O servidor iniciará em http://localhost:3000
```

### Opção 3: Auditoria de Dados e Testes
```bash
node scripts/audit-data.js
```

---

## 📁 Estrutura do Projeto

```
.
├── index.html                  # Interface principal da aplicação (SPA)
├── style.css                   # Sistema de design tokens, layouts responsivos e temas
├── app.js                      # Lógica da aplicação, eventos, filtros e renderização
├── data.js                     # Base de dados estruturada dos 44 modelos e benchmarks
├── data/
│   ├── fx.js                   # Cotações cambiais e helpers de conversão USD/BRL/CNY
│   ├── plans.js                # Banco canônico de 49 planos de assinatura e budget stacks
│   ├── plan-explorer.js        # Motor funcional do Explorador de Planos e Wizard determinístico
│   ├── platforms.js            # Catálogo de plataformas (OpenCode Go, Cursor, camelAI)
│   ├── history.js              # Linhagens genealógicas e eventos históricos
│   ├── community.js            # Relatos auditados e divergências benchmark vs comunidade
│   ├── behavior.js             # Matriz de comportamento qualitativo de engenharia
│   ├── use-cases.js            # Casos de uso e receitas de orquestração multi-modelo
│   └── pricing-history.js      # Séries históricas de preços e compressão de custos
├── scripts/
│   └── audit-data.js           # Suíte de auditoria técnica e integridade de dados (06-prompt-ajuste)
├── server.js                   # Servidor HTTP local em Node.js (opcional)
├── start.sh                    # Script utilitário de inicialização
└── package.json                # Metadados do projeto
```

---

## 💳 Explorador Multidimensional de Planos & Assinaturas

A área de Planos foi completamente reformulada como uma experiência autônoma em 5 abas integradas:

1. **📋 Catálogo Canônico de Planos:**
   - Agrupamento inteligente pelas 9 empresas canônicas (*OpenAI, Anthropic, Google, Cursor, OpenCode, Z.ai, xAI, Kimi e camelAI*).
   - Acordeões expansíveis com contagem de planos e faixa de preço.
   - Filtros multifacetados: faixa de preço com slider e presets rápidos, público-alvo (*Individual, Equipe, Enterprise*), perfil de uso, custo 100% previsível vs cobranças variáveis, suporte a BYOK, inclusão de armazenamento em nuvem e controles de privacidade/treinamento de dados.
   - Alternância de ciclo de faturamento (*Mensal vs Anual com descontos destacados*).
   - Modal com 6 seções detalhadas, incluindo rastreabilidade e fontes auditadas.

2. **🧠 Onde Usar Cada Modelo:**
   - Seletor dos 44 modelos de fronteira catalogados.
   - Destaque automático do plano mais acessível e do melhor plano com acesso irrestrito incluído.
   - Tabela comparativa de plataformas, superfícies (*Web, IDE, CLI, API*) e modalidades de faturamento (*Incluído, Franquia com burn rate, Créditos pré-pagos extras, Metered*).

3. **💰 Planejador de Orçamento & Stacks Complementares:**
   - Slider orçamentário dinâmico com presets (R$ 50 a R$ 1.000 / US$ 10 a US$ 200).
   - Geração de stacks individuais ou pares balanceados sem duplicar famílias de planos concorrentes.
   - Radar com 6 scores calibrados: *Acesso a Modelos, Coding & IDE, Quota & Franquia, Armazenamento em Nuvem, Privacidade e Custo-Benefício*.
   - Explicitação estrita de custos fixos previsíveis vs eventuais despesas variáveis.

4. **⚔️ Comparador Inteligente de Planos:**
   - Comparação lado a lado de até 5 planos simultâneos.
   - Resumo dinâmico da *Principal Diferença* entre os planos selecionados.
   - Toggle *"Mostrar apenas diferenças"* para rápida tomada de decisão.

5. **⭐ Favoritos:**
   - Shortlist pessoal persistida no navegador (`localStorage`).
   - Ações em lote para comparar todos os favoritos ou limpar a seleção.

6. **🎯 Assistente Interativo de Recomendação ("Qual plano é melhor para mim?"):**
   - Questionário determinístico em 5 etapas rápidas (orçamento, público, foco primário, modelo preferido e tolerância a variáveis).
   - Algoritmo multiobjetivo pontuado sem dependência de LLM ou APIs externas.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `package.json` para mais detalhes.
