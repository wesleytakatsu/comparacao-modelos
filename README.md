# ⚡ Portal de Inteligência de Modelos de IA 2026

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=flat-square&logo=github)](https://wesleytakatsu.github.io/comparacao-modelos/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)](index.html)

Portal analítico e interativo para engenharia de software e comparação multidimensional de **44 modelos de Inteligência Artificial** de ponta (incluindo Claude Fable 5.1, Gemini 3.8 Flash, Grok 4.6, GPT-5.6, Claude 5, Gemini 3.7, DeepSeek V4, Ox Alpha, gpt-oss, Nemotron 3.5, etc. — Edição Setembro/2026).

🌐 **Acesse a versão online:** [https://wesleytakatsu.github.io/comparacao-modelos/](https://wesleytakatsu.github.io/comparacao-modelos/)

---

## 🎯 Principais Recursos

- 📊 **Comparativo Multidimensional:** Matriz detalhada de especificações, janelas de contexto, cotas, suporte a áudio/vídeo e licenças.
- 👑 **CursorBench 3.2 & Artificial Analysis Index:** Benchmarks agênticos com ranking atualizado liderado por Claude Fable 5.1 (Max 73,4%).
- 🕸️ **Radar de Capacidades 10D:** Visualização gráfica comparativa de habilidades de raciocínio, codificação, multimodalidade e velocidade para todos os 44 modelos.
- 🖥️ **Calculadora de Hardware Local & VRAM:** Estimativa do consumo real de memória com KV Cache dinâmico e suporte a múltiplos formatos de quantização (*MXFP4, NVFP4, FP8, BF16, GGUF*).
- 💰 **Simulador Econômico de Tokens:** Cálculo do custo matemático por tarefa considerando tokens novos de input, taxas de cache hit e geração de saída/raciocínio.
- 📈 **Simulador de ROI de Equipes:** Projeção de retorno de investimento e ganho de produtividade de times de engenharia.
- 🧭 **Roteador Inteligente de Modelos:** Recomendação dinâmica com base na tarefa específica, restrições orçamentárias e requisitos de privacidade.
- 🔒 **Rastreabilidade e Governança:** Registro de proveniência com links diretos para model cards, papers e ledgers oficiais.
- 🌓 **Tema Claro e Escuro:** Alternância fluida e persistente com variáveis CSS e proteção contra flash de tema (zero FOUC).
- ⚡ **Zero Dependências de Backend:** Construído inteiramente com Vanilla JS, CSS3 puro e HTML5 com renderização de gráficos via Chart.js.

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
├── scripts/
│   └── audit-data.js           # Suíte de auditoria técnica e integridade de dados
├── server.js                   # Servidor HTTP local em Node.js (opcional)
├── start.sh                    # Script utilitário de inicialização
└── package.json                # Metadados do projeto
```

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `package.json` para mais detalhes.
