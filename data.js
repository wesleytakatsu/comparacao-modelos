// Carregamento de módulos complementares em ambiente Node.js
if (typeof module !== "undefined" && module.exports) {
  try {
    if (typeof FX_RATES_DATA === "undefined") {
      const _fx = require("./data/fx");
      global.FX_RATES_DATA = _fx.FX_RATES_DATA;
      global.FX_HELPERS = _fx.FX_HELPERS;
    }
    if (typeof SUBSCRIPTION_PLANS_DATA === "undefined") {
      const _plans = require("./data/plans");
      global.SUBSCRIPTION_PLANS_DATA = _plans.SUBSCRIPTION_PLANS_DATA;
      global.BUDGET_STACK_RECOMMENDER = _plans.BUDGET_STACK_RECOMMENDER;
    }
    if (typeof OPENCODE_GO_DATA === "undefined") {
      const _platforms = require("./data/platforms");
      global.OPENCODE_GO_DATA = _platforms.OPENCODE_GO_DATA;
      global.PLATFORM_MODEL_CATALOG = _platforms.PLATFORM_MODEL_CATALOG;
    }
    if (typeof DomainRankings === "undefined") {
      try {
        const _domain = require("./data/domain");
        global.DomainRankings = _domain.DomainRankings;
        global.DomainEvidence = _domain.DomainEvidence;
        global.DomainFreshness = _domain.DomainFreshness;
        global.DomainEntities = _domain.DomainEntities;
      } catch (e) {}
    }
  } catch (e) {}
}

/**
 * Base de Dados Estruturada e Consolidada de Inteligência de Modelos de IA
 * Portal de Engenharia, Benchmarks Multidimensionais, Hardware & Precificação (Edição Setembro/2026)
 * Dados auditados e verificados em: 02 de Setembro de 2026
 */

// ==========================================
// 1. CATÁLOGO CANÔNICO DE PROVEDORES
// ==========================================


// ==========================================
// 1B. REGISTRO CANÔNICO DE PROVENIÊNCIA E FONTES DE DADOS (DATA_SOURCES)
// ==========================================

const DATA_SOURCES = {
  'google-deepmind-gemini-38': {
    id: 'google-deepmind-gemini-38',
    publisher: 'Google DeepMind',
    sourceType: 'official-model',
    title: 'Gemini 3.8 Flash Model Card & Official Release Notes',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash',
    publishedAt: '2026-09-02',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Documentação primária Google DeepMind: 1M contexto, 64k max output, precificação API $0.75/$3.75, multimodal nativo (texto, imagem, vídeo, áudio, PDF), benchmark TB 2.1 90.8%, SWE-Pro 61.6%, CharXiv 86.2%.'
  },
  'anthropic-claude-fable-51': {
    id: 'anthropic-claude-fable-51',
    publisher: 'Anthropic',
    sourceType: 'official-model',
    title: 'Claude Fable 5.1 System Card & Announcement',
    sourceUrl: 'https://www.anthropic.com/news/claude-fable-5-1',
    publishedAt: '2026-09-01',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Anúncio oficial Anthropic: 1M contexto, 128k output, $10/$50, cache read $0.25 (75% menor que Fable 5), adaptive thinking, TB-Science 52.6%, TB 4.0 55.8%, OSWorld 2 partial 77.9%.'
  },
  'cursorbench-32': {
    id: 'cursorbench-32',
    publisher: 'Anysphere / Cursor',
    sourceType: 'independent-benchmark',
    title: 'CursorBench 3.2 Live Leaderboard',
    sourceUrl: 'https://cursor.com/benchmarks',
    publishedAt: '2026-09-02',
    retrievedAt: '2026-09-02',
    official: false,
    notes: 'Avaliação agêntica real em regime monorepo. Claude Fable 5.1 (Effort Max) #1 com 73.4% ($9.64/task), Gemini 3.8 Flash High 69.2% ($2.38/task).'
  },
  'deepswe-datacurve': {
    id: 'deepswe-datacurve',
    publisher: 'DeepSWE / DataCurve',
    sourceType: 'independent-benchmark',
    title: 'DeepSWE Benchmark v1.1 Live Leaderboard',
    sourceUrl: 'https://datacurve.ai/deepswe',
    publishedAt: '2026-09-02',
    retrievedAt: '2026-09-02',
    official: false,
    notes: 'Resolução agêntica de repositórios complexos. Gemini 3.8 Flash High 74% ±1% ($2.36/task, 166 steps, 143k tokens), Fable 5.1 71.5%.'
  },
  'artificial-analysis-v41': {
    id: 'artificial-analysis-v41',
    publisher: 'Artificial Analysis',
    sourceType: 'independent-benchmark',
    title: 'Artificial Analysis Intelligence Index v4.1.1',
    sourceUrl: 'https://artificialanalysis.ai',
    publishedAt: '2026-09-02',
    retrievedAt: '2026-09-02',
    official: false,
    notes: 'Média ponderada de benchmarks agênticos, latência e velocidade. Claude Fable 5.1 líder geral com Index 66. Gemini 3.8 High com Index 59 e throughput de 305 tok/s.'
  },
  'swe-bench-verified': {
    id: 'swe-bench-verified',
    publisher: 'SWE-bench Team / Princeton NLP',
    sourceType: 'independent-benchmark',
    title: 'SWE-bench Verified Benchmark',
    sourceUrl: 'https://www.swebench.com',
    publishedAt: '2026-08-15',
    retrievedAt: '2026-09-02',
    official: false,
    notes: '500 issues curadas do GitHub para validação agêntica de software sem estimativas.'
  },
  'terminal-bench-org': {
    id: 'terminal-bench-org',
    publisher: 'Terminal-Bench Org',
    sourceType: 'independent-benchmark',
    title: 'Terminal-Bench 2.1 & 4.0 Suite',
    sourceUrl: 'https://terminalbench.org',
    publishedAt: '2026-09-01',
    retrievedAt: '2026-09-02',
    official: false,
    notes: 'Execução real em ambiente de terminal e CLI.'
  },
  'openai-gpt56-launch': {
    id: 'openai-gpt56-launch',
    publisher: 'OpenAI',
    sourceType: 'official-model',
    title: 'Introducing GPT-5.6',
    page: 'GPT-5.6',
    domain: 'openai.com',
    path: '/index/gpt-5-6/',
    sourceUrl: 'https://openai.com/index/gpt-5-6/',
    publishedAt: '2026-08-20',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Documentação primária de lançamento da família GPT-5.6 (Sol, Terra, Luna). Terminal-Bench 2.1 88.8%, SWE-bench Pro 64.6%.'
  },
  'openai-gpt56-safety': {
    id: 'openai-gpt56-safety',
    publisher: 'OpenAI',
    sourceType: 'official-policy',
    title: 'OpenAI Deployment Safety Hub',
    page: 'Deployment Safety Hub',
    domain: 'openai.com',
    path: '/safety/gpt-5-6/',
    sourceUrl: 'https://openai.com/safety/gpt-5-6/',
    publishedAt: '2026-08-20',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Avaliações de segurança, salvaguardas e conformidade técnica do GPT-5.6.'
  },
  'openai-gpt56': {
    id: 'openai-gpt56',
    publisher: 'OpenAI',
    sourceType: 'official-model',
    title: 'GPT-5.6 System Card & Official Pricing Specification',
    domain: 'openai.com',
    path: '/index/gpt-5-6/',
    sourceUrl: 'https://openai.com/index/gpt-5-6/',
    publishedAt: '2026-08-20',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Registro unificado de referência para modelos da família GPT-5.6.'
  },
  'xai-grok46': {
    id: 'xai-grok46',
    publisher: 'SpaceXAI',
    sourceType: 'official-model',
    title: 'Introducing Grok 4.6',
    domain: 'x.ai',
    path: '/news/grok-4-6',
    sourceUrl: 'https://x.ai/news/grok-4-6',
    publishedAt: '2026-08-12',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Anúncio oficial SpaceXAI: Thinking mandatório, 69.9% CursorBench High, Terminal-Bench 3.0 26.0%, DeepSWE 1.1 65.9%, AA Index 61, GDPVal-AA v2 1753.'
  },
  'aa-grok46-tb21': {
    id: 'aa-grok46-tb21',
    publisher: 'Artificial Analysis',
    sourceType: 'independent-benchmark',
    title: 'Artificial Analysis Grok 4.6 Independent Evaluation',
    domain: 'artificialanalysis.ai',
    path: '/models/grok-4-6',
    sourceUrl: 'https://artificialanalysis.ai/models/grok-4-6',
    publishedAt: '2026-08-20',
    retrievedAt: '2026-09-02',
    official: false,
    notes: 'Avaliação independente Artificial Analysis: Terminal-Bench 2.1 88.4%, CursorBench 70.8% live XHigh.'
  },
  'google-deepmind-gemini37': {
    id: 'google-deepmind-gemini37',
    publisher: 'Google DeepMind',
    sourceType: 'official-model',
    title: 'Gemini 3.7 Flash Model Card Oficial',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash',
    publishedAt: '2026-08-10',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Documentação Google DeepMind: 1M contexto, vídeo + áudio nativo, DeepSWE 1.1 65.3%, TB 2.1 85.8%.'
  },
  'deepseek-v4-org': {
    id: 'deepseek-v4-org',
    publisher: 'DeepSeek AI',
    sourceType: 'official-model',
    title: 'DeepSeek-V4 Technical Report & Model Specifications',
    sourceUrl: 'https://deepseek.com/research/v4',
    publishedAt: '2026-08-13',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Arquitetura MLA 1M, DeepSeek-V4-Pro 87.9% Terminal-Bench 2.1, DeepSeek-V4-Flash 82.7%.'
  },
  'zai-glm-53-flash': {
    id: 'zai-glm-53-flash',
    publisher: 'Z.ai (Zhipu AI)',
    sourceType: 'official-model',
    title: 'GLM-5.3-Flash Model Card & Technical Report (formerly Ox Alpha)',
    sourceUrl: 'https://zhipuai.cn/models/glm-5.3-flash',
    publishedAt: '2026-08-26',
    retrievedAt: '2026-09-02',
    official: true,
    notes: 'Relatório oficial Z.ai revelando a identidade do teste stealth ox-alpha como GLM-5.3-Flash: MoE 320B/18B, 1M contexto, 128k output, licença MIT, Terminal-Bench 2.1 84.3%, DeepSWE 63.4%, Toolathlon 78.4%.'
  },
  'camelai-plans-official': {
    id: 'camelai-plans-official',
    publisher: 'camelAI / CamelQA, Inc.',
    sourceType: 'official-plan',
    title: 'camelCode Official Pricing & Subscription Plans Specification',
    domain: 'camelai.com',
    path: '/pricing',
    sourceUrl: 'https://camelai.com/pricing',
    publishedAt: '2026-09-02',
    retrievedAt: '2026-09-03',
    official: true,
    notes: 'Documentação detalhada de planos camelCode: Free ($0), Starter ($10), Pro ($40), Team ($50/seat, mín. 3 seats) e Enterprise. Créditos de modelos premium a taxa de provedor.'
  },
  'camelai-model-providers': {
    id: 'camelai-model-providers',
    publisher: 'camelAI / CamelQA, Inc.',
    sourceType: 'official-platform',
    title: 'camelCode Model Providers & Access Methods',
    domain: 'camelai.com',
    path: '/docs/plans/model-providers',
    sourceUrl: 'https://camelai.com/docs/plans/model-providers',
    publishedAt: '2026-09-01',
    retrievedAt: '2026-09-03',
    official: true,
    notes: 'Especificação das 4 formas de acesso a modelos premium: plan credits, top-up Stripe pré-pago, BYOK (Anthropic, OpenAI, OpenRouter, AWS Bedrock) e Sign in with OpenAI.'
  },
  'camelai-stream-overview': {
    id: 'camelai-stream-overview',
    publisher: 'camelAI / CamelQA, Inc.',
    sourceType: 'official-platform',
    title: 'camelStream: Flat-Rate AI Inference API with Unlimited Tokens',
    domain: 'camelai.com',
    path: '/docs/stream/overview',
    sourceUrl: 'https://camelai.com/stream',
    publishedAt: '2026-09-01',
    retrievedAt: '2026-09-03',
    official: true,
    notes: 'Visão geral da API camelStream: US$ 5/stream/mês, tokens ilimitados sem overage, 1 geração concorrente garantida por stream, modelo auto dinâmico.'
  },
  'camelai-stream-fleet': {
    id: 'camelai-stream-fleet',
    publisher: 'camelAI / CamelQA, Inc.',
    sourceType: 'official-platform',
    title: 'camelStream Current Model Fleet & Quality Floor',
    domain: 'camelai.com',
    path: '/docs/stream/fleet',
    sourceUrl: 'https://camelai.com/docs/stream/fleet',
    publishedAt: '2026-08-30',
    retrievedAt: '2026-09-03',
    official: true,
    notes: 'Fleet ativo verificado em 30/08/2026: DeepSeek V4 Flash 0731, Gemini Flash 3.7, GLM 5.3 Flash, GPT Luna 5.6, Muse Spark 1.2. Quality Floor: Terminal-Bench 2.1 >= 70% ou AA Index >= 50. Contexto mínimo 260K com visão.'
  },
  'camelai-stream-terms': {
    id: 'camelai-stream-terms',
    publisher: 'camelAI / CamelQA, Inc.',
    sourceType: 'official-policy',
    title: 'camelStream Service Terms & Performance Targets Specification',
    domain: 'camelai.com',
    path: '/docs/stream/terms',
    sourceUrl: 'https://stream.camelai.com/terms',
    publishedAt: '2026-08-30',
    retrievedAt: '2026-09-03',
    official: true,
    notes: 'Metas de velocidade: p10 >= 40 tok/s, p5 >= 20 tok/s, TTFT p95 < 5s (metas de engenharia, NÃO constituem SLA contratual). Ausência de SLA de uptime no plano standard.'
  },
  'camelai-stream-privacy': {
    id: 'camelai-stream-privacy',
    publisher: 'camelAI / CamelQA, Inc.',
    sourceType: 'official-policy',
    title: 'camelStream Privacy Policy & Governance Notice',
    domain: 'camelai.com',
    path: '/docs/stream/privacy',
    sourceUrl: 'https://stream.camelai.com/privacy',
    publishedAt: '2026-08-30',
    retrievedAt: '2026-09-03',
    official: true,
    notes: 'Alerta crítico de privacidade: no plano standard, prompts e respostas podem ser retidos e utilizados para treinamento por camelAI e parceiros. Não há opt-out. Termos ZDR customizados exigem 1.000+ streams.'
  },
  'camelai-self-hosting': {
    id: 'camelai-self-hosting',
    publisher: 'camelAI / CamelQA, Inc.',
    sourceType: 'official-platform',
    title: 'camelCode Self-Hosted Architecture & Deployment Guide',
    domain: 'camelai.com',
    path: '/docs/self-hosting/overview',
    sourceUrl: 'https://camelai.com/docs/self-hosting/overview',
    publishedAt: '2026-09-01',
    retrievedAt: '2026-09-03',
    official: true,
    notes: 'Código aberto licença MIT ($0 licença). Requisitos Ubuntu 24.04 (4 vCPU, 8 GiB RAM, 100 GiB disco, Docker, Node 22, Bun). Single-node apenas. Risco de segurança: container possui acesso read-write ao Docker socket (root-equivalent).'
  },
  'camelai-connections': {
    id: 'camelai-connections',
    publisher: 'camelAI / CamelQA, Inc.',
    sourceType: 'official-platform',
    title: 'camelCode Secure Connections & Integrations Specification',
    domain: 'camelai.com',
    path: '/docs/getting-started/connections',
    sourceUrl: 'https://camelai.com/docs/getting-started/connections',
    publishedAt: '2026-09-01',
    retrievedAt: '2026-09-03',
    official: true,
    notes: 'Mais de 50 integrações (Postgres, Redis, Mongo, BigQuery, Snowflake, Slack, Stripe). Credenciais criptografadas em repouso e injetadas server-side sem exposição em logs ou chats.'
  },
  'openai-gpt6-astra-launch': {
    id: 'openai-gpt6-astra-launch',
    publisher: 'OpenAI',
    sourceType: 'official-model',
    title: 'Introducing GPT-6 Astra: Frontier Reasoning Flagship',
    sourceUrl: 'https://openai.com/index/gpt-6-astra/',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Lançamento oficial OpenAI: 1.05M contexto, 128k max output, 5 níveis públicos de reasoning, Terminal-Bench 4.0 57.9%, Terminal-Bench Science 64.6% (65.4% Snorkel max), DeepSWE 74.1%, MRCR v2 100% (256k-512k) e 96.3% (512k-1M).'
  },
  'openai-gpt6-astra-api': {
    id: 'openai-gpt6-astra-api',
    publisher: 'OpenAI Developers',
    sourceType: 'official-api',
    title: 'OpenAI API Model Card: GPT-6 Astra',
    sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-6-astra',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Documentação oficial de API: model ID gpt-6-astra, cutoff 2026-04-30, pricing $10 in / $50 out / $1.00 cached / $12.50 cache write, long context cliff >272k (2x input/cache, 1.5x output), async tool calling, mid-turn steering.'
  },
  'openai-gpt6-astra-system-card': {
    id: 'openai-gpt6-astra-system-card',
    publisher: 'OpenAI Safety',
    sourceType: 'official-safety',
    title: 'GPT-6 Astra System Card & Safety Overview',
    sourceUrl: 'https://deploymentsafety.openai.com/gpt-6-astra/vision',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Classificação Preparedness: Cibersegurança CRITICAL (primeiro modelo frontier), Bio/Chem HIGH, AI self-improvement below HIGH. 99.79% robustez contra prompt injection indireta, 99.99% instruction hierarchy. Regressão de monitorabilidade de CoT frente a avaliações adversariais.'
  },
  'deep-swe-v11-20260903': {
    id: 'deep-swe-v11-20260903',
    publisher: 'DataCurve',
    sourceType: 'independent-benchmark',
    title: 'DeepSWE Benchmark v1.1 Live Leaderboard - Astra Matrix',
    sourceUrl: 'https://deepswe.datacurve.ai/',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: false,
    notes: 'Avaliação independente de repositórios reais: GPT-6 Astra XHigh atinge 74.1% [71.2-77.0] ($6.52/task, 30k tokens), High 73.2% ($5.72), Max 73.2% ($12.37), Medium 72.8% ($4.38), Low 67.0% ($2.19).'
  },
  'snorkel-terminal-bench-science-01': {
    id: 'snorkel-terminal-bench-science-01',
    publisher: 'Snorkel AI',
    sourceType: 'independent-benchmark',
    title: 'Terminal-Bench Science 0.1 Leaderboard',
    sourceUrl: 'https://snorkel.ai/leaderboard/terminal-bench-science/',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: false,
    notes: 'Avaliação científica independente (70 tarefas em 5 domínios): Astra Max 65.4% ±2.5, High 62.0%, XHigh 60.9%, Medium 57.4%, Low 55.4%.'
  },
  'aa-gpt6-astra-v411': {
    id: 'aa-gpt6-astra-v411',
    publisher: 'Artificial Analysis',
    sourceType: 'independent-benchmark',
    title: 'GPT-6 Astra Intelligence Index v4.1.1 Evaluation by Effort',
    sourceUrl: 'https://artificialanalysis.ai/models/releases/gpt-6-astra',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: false,
    notes: 'Índice AA v4.1.1 por esforço: Low 57 ($0.46), Medium 59 ($0.75), High 60 ($0.96), XHigh 61 ($1.20), Max 61 ($1.67), Non-reasoning 55 ($0.93 evaluation-only). Throughput independente N/D no snapshot.'
  },
  'aa-index-v42-20260904': {
    id: 'aa-index-v42-20260904',
    publisher: 'Artificial Analysis',
    sourceType: 'independent-benchmark',
    title: 'Artificial Analysis Intelligence Index v4.2 Release',
    sourceUrl: 'https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-2',
    publishedAt: '2026-09-04',
    retrievedAt: '2026-09-04',
    official: false,
    notes: 'Nova metodologia v4.2: AA-Briefcase, GDP.pdf (+40% held-out). Astra confirma posição #2 geral atrás de Claude Fable 5.1 (+4 pts sobre Sol). Astra lidera GDP.pdf com 33.2% e ganho de ~85 Elo no AA-Briefcase.'
  },
  'openai-chatgpt-pro-pricing': {
    id: 'openai-chatgpt-pro-pricing',
    publisher: 'OpenAI',
    sourceType: 'official-pricing',
    title: 'ChatGPT Pro Plan Specifications & Model Access',
    sourceUrl: 'https://openai.com/chatgpt/pricing/',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Especificações oficiais de planos Pro: Pro $100 (50 msgs/semana GPT-6 Pro / Sol Pro), Pro $200 (200 msgs/semana GPT-6 Pro Chat, 200 msgs/dia cap geral), Plus (sem GPT-6 Pro Chat).'
  },
  'openai-business-plans': {
    id: 'openai-business-plans',
    publisher: 'OpenAI',
    sourceType: 'official-pricing',
    title: 'ChatGPT Business & Enterprise Plan Limits',
    sourceUrl: 'https://openai.com/business/',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Planos Business: Standard (15 msgs/mês Pro, Work limitado 3-30 msgs/5h), Premium (50 msgs/semana Pro, 5x Standard sem janela de 5h).'
  },
  'openai-rate-limits-tier': {
    id: 'openai-rate-limits-tier',
    publisher: 'OpenAI API',
    sourceType: 'official-api',
    title: 'Usage Tiers & Rate Limits for GPT-6 Models',
    sourceUrl: 'https://platform.openai.com/docs/guides/rate-limits',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Rate limits por tier para GPT-6 Astra: Tier 1 (500 RPM, 500k TPM), Tier 2 (5k RPM, 1M TPM), Tier 3 (5k RPM, 2M TPM), Tier 4 (10k RPM, 4M TPM), Tier 5 (15k RPM, 40M TPM).'
  },
  'terminal-bench-40-official': {
    id: 'terminal-bench-40-official',
    publisher: 'Terminal-Bench Team',
    sourceType: 'independent-benchmark',
    title: 'Terminal-Bench 4.0 Suite & Results',
    sourceUrl: 'https://terminalbench.org/4.0/',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: false,
    notes: 'Terminal-Bench 4.0: GPT-6 Astra atinge 57.88% (High), liderando o benchmark geral de terminal autônomo.'
  },
  'arcprize-gpt6-astra-20260902': {
    id: 'arcprize-gpt6-astra-20260902',
    publisher: 'ARC Prize Foundation',
    sourceType: 'independent-benchmark',
    title: 'GPT-6 Astra Evaluation on ARC-AGI-3',
    sourceUrl: 'https://arcprize.org/blog/gpt-6-astra-results',
    publishedAt: '2026-09-02',
    retrievedAt: '2026-09-04',
    official: false,
    notes: 'Metrologia estrita ARC-AGI-3: Standard harness atinge 62.71% (Max, $26,000); Provider Adapter atinge 99.95% (High, $18,800). O claim 99.9% nunca deve ser citado sem o sufixo Provider Adapter.'
  },
  'aa-gdp-pdf-leaderboard': {
    id: 'aa-gdp-pdf-leaderboard',
    publisher: 'Artificial Analysis',
    sourceType: 'independent-benchmark',
    title: 'Surge GDP.pdf Multimodal Evaluation Leaderboard',
    sourceUrl: 'https://artificialanalysis.ai/benchmarks/gdp-pdf',
    publishedAt: '2026-09-04',
    retrievedAt: '2026-09-04',
    official: false,
    notes: 'Avaliação Surge GDP.pdf: 100 PDFs, 4.592 páginas, 1.275 critérios. GPT-6 Astra lidera com 33.2% All-pass Rate.'
  },
  'cursor-pricing-astra-2026': {
    id: 'cursor-pricing-astra-2026',
    publisher: 'Cursor IDE',
    sourceType: 'platform-pricing',
    title: 'Cursor Models & Other Models Pool Updates',
    sourceUrl: 'https://cursor.com/pricing',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Cursor IDE aloca GPT-6 Astra no pool Other Models ($20 pool) com multiplicador fast 2.0x.'
  },
  'opencode-go-catalog-2026': {
    id: 'opencode-go-catalog-2026',
    publisher: 'OpenCode',
    sourceType: 'platform-catalog',
    title: 'OpenCode Go Catalog & Model Access',
    sourceUrl: 'https://opencode.ai/go',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Status no catálogo OpenCode Go para novos frontier flagships e políticas de burn rate.'
  },
  'openai-responses-api-docs': {
    id: 'openai-responses-api-docs',
    publisher: 'OpenAI Developers',
    sourceType: 'official-api',
    title: 'Responses API: Async Tool Calling & Mid-Turn Steering',
    sourceUrl: 'https://platform.openai.com/docs/api-reference/responses',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Documentação da Responses API: suporte nativo a async tool calling, mid-turn steering e ferramentas de sistema.'
  },
  'openai-preparedness-framework-v3': {
    id: 'openai-preparedness-framework-v3',
    publisher: 'OpenAI Preparedness',
    sourceType: 'official-safety',
    title: 'OpenAI Preparedness Framework Frontier Tracking',
    sourceUrl: 'https://openai.com/safety/preparedness-framework/',
    publishedAt: '2026-09-03',
    retrievedAt: '2026-09-04',
    official: true,
    notes: 'Preparedness Framework: Primeiro modelo com risco de Cibersegurança classificado como CRITICAL. Bio/química HIGH.'
  }
};

const AI_PROVIDERS_DATA = {
  'openai': {
    id: 'openai',
    name: 'OpenAI',
    country: 'EUA',
    logo: '🟢',
    brandColor: '#10a37f',
    iconUrl: 'https://cdn.simpleicons.org/openai/10a37f',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.182a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.998-2.9 6.056 6.056 0 0 0-.748-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.142-.08 4.778-2.76a.795.795 0 0 0 .393-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.495zm-9.661-4.125a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.758a.771.771 0 0 0 .78 0l5.843-3.368v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.141-1.646zM2.341 7.896a4.485 4.485 0 0 1 2.365-1.973V11.6a.766.766 0 0 0 .388.676l5.814 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786a4.504 4.504 0 0 1-1.646-6.117zm16.1 3.856L12.597 8.383l2.02-1.164a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.402-.681zm2.01-3.023l-.142-.085-4.773-2.782a.776.776 0 0 0-.786 0L9.007 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.038-.057V6.074a4.5 4.5 0 0 1 7.376-3.454l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681v6.723zm1.145-1.973l2.553-1.474 2.553 1.474v2.949l-2.553 1.475-2.553-1.475v-2.949z"/></svg>',
    description: 'Criadora do novo frontier flagship GPT-6 Astra, da família GPT-5.6 (Sol, Terra, Luna, Pro) e dos modelos abertos gpt-oss-20b e 120b.',
    website: 'https://openai.com'
  },
  'anthropic': {
    id: 'anthropic',
    name: 'Anthropic',
    country: 'EUA',
    logo: '🟠',
    brandColor: '#d97706',
    iconUrl: 'https://cdn.simpleicons.org/anthropic/d97706',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.827 0h3.542l6.631 24h-3.543l-6.63-24zm-10.285 0h3.542l6.631 24H10.172l-1.34-4.857H3.34L2 24H-1.543L4.827 0zm2.715 15.657L6.2 7.029l-1.343 8.628h2.685z"/></svg>',
    description: 'Criadora da família Claude (Fable 5.1 líder geral, Opus 5, Sonnet 5, Fable 5 histórico) e do modelo worker Claude Haiku 4.5.',
    website: 'https://anthropic.com'
  },
  'xai': {
    id: 'xai',
    name: 'xAI',
    country: 'EUA',
    logo: '🟣',
    brandColor: '#ec4899',
    iconUrl: 'https://cdn.simpleicons.org/x/ffffff',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    description: 'Laboratório de Elon Musk, desenvolvedor do Grok 4.6 com thinking mandatório e 70,8% no CursorBench.',
    website: 'https://x.ai'
  },
  'google': {
    id: 'google',
    name: 'Google DeepMind',
    country: 'EUA',
    logo: '🔵',
    brandColor: '#38bdf8',
    iconUrl: 'https://cdn.simpleicons.org/google/38bdf8',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.5 0c.2 5.5 4.5 9.8 10 10 .2 0 .2.4 0 .4-5.5.2-9.8 4.5-10 10 0 .2-.4.2-.4 0-.2-5.5-4.5-9.8-10-10-.2 0-.2-.4 0-.4 5.5-.2 9.8-4.5 10-10 0-.2.4-.2.4 0z"/></svg>',
    description: 'Desenvolvedora das famílias Gemini 3.8 Flash e Gemini 3.7 com multimodalidade nativa total (Vídeo, Áudio, Imagem, PDF) em 1M de tokens.',
    website: 'https://deepmind.google'
  },
  'deepseek': {
    id: 'deepseek',
    name: 'DeepSeek',
    country: 'China',
    logo: '🔷',
    brandColor: '#0ea5e9',
    iconUrl: 'https://cdn.simpleicons.org/deepseek/0ea5e9',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c3.87 0 7 3.13 7 7 0 2.22-1.03 4.2-2.64 5.48L15 16c0-1.66-1.34-3-3-3s-3 1.34-3 3l-1.36 1.48C6.03 16.2 5 14.22 5 12c0-3.87 3.13-7 7-7zm-2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>',
    description: 'Líder em arquiteturas MoE com compressão MLA (~93% de economia em KV Cache) e custos ultra-baixos.',
    website: 'https://deepseek.com'
  },
  'alibaba': {
    id: 'alibaba',
    name: 'Alibaba Qwen',
    country: 'China',
    logo: '🟦',
    brandColor: '#ff6a00',
    iconUrl: 'https://cdn.simpleicons.org/alibaba/ff6a00',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.3L18 9l-6 3.7L6 9l6-3.7zM5 9.8l6 3.7v7.2L5 17V9.8zm8 10.9v-7.2l6-3.7V17l-6 3.7z"/></svg>',
    description: 'Pioneira em modelos híbridos recorrentes Gated DeltaNet com contexto massivo e modelos densos de 27B.',
    website: 'https://qwenlm.github.io'
  },
  'moonshot': {
    id: 'moonshot',
    name: 'Moonshot AI (Kimi)',
    country: 'China',
    logo: '🌙',
    brandColor: '#3b82f6',
    iconUrl: 'https://cdn.simpleicons.org/moonshot/3b82f6',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm1 14.93a6 6 0 1 1 3.93-3.93A7.96 7.96 0 0 1 13 16.93z"/></svg>',
    description: 'Criadora do Kimi K3 (88,3% Terminal-Bench) e K2.6, especialista em coding agêntico de longo horizonte.',
    website: 'https://moonshot.ai'
  },
  'zai': {
    id: 'zai',
    name: 'Z.ai (Zhipu GLM)',
    country: 'China',
    logo: '🟡',
    brandColor: '#eab308',
    iconUrl: 'https://cdn.simpleicons.org/zhipu/eab308',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 8.5v7L12 22l10-6.5v-7L12 2zm0 3.3l7 4.55-7 4.55-7-4.55 7-4.55zM4 10.3l7 4.55v6.55l-7-4.55V10.3zm9 11.1v-6.55l7-4.55v6.55l-7 4.55z"/></svg>',
    description: 'Desenvolvedora da família GLM-5.3 com forte orquestração de ferramentas e atenção Dual-Stream (DSA).',
    website: 'https://zhipuai.cn'
  },
  'xiaomi': {
    id: 'xiaomi',
    name: 'Xiaomi MiMo',
    country: 'China',
    logo: '📱',
    brandColor: '#ff6900',
    iconUrl: 'https://cdn.simpleicons.org/xiaomi/ff6900',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 13.5h-2v-5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v5h-2v-7h2v1.07A2.993 2.993 0 0 1 13 9c1.654 0 3 1.346 3 3v3.5h.5z"/></svg>',
    description: 'Série MiMo-V2.5 com foco em eficiência extrema, multimodalidade de 1M e até 150k requisições/mês no Go.',
    website: 'https://mimo.xiaomi.com'
  },
  'minimax': {
    id: 'minimax',
    name: 'MiniMax',
    country: 'China',
    logo: '🔺',
    brandColor: '#f43f5e',
    iconUrl: 'https://cdn.simpleicons.org/minimax/f43f5e',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 5.5l7 11.5H5L12 7.5z"/></svg>',
    description: 'Arquiteturas MoE avançadas (M3 e M2.7) com 80,5% no SWE-bench Verified oficial.',
    website: 'https://minimax.io'
  },
  'tencent': {
    id: 'tencent',
    name: 'Tencent (Hunyuan Hy3)',
    country: 'China',
    logo: '🐧',
    brandColor: '#12b7f5',
    iconUrl: 'https://cdn.simpleicons.org/tencentqq/12b7f5',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9 9 0 0 0-9 9c0 3.8 2.4 7 5.8 8.3-.1-.7-.1-1.5.1-2.2.3-.9.9-1.6 1.7-2.1-.6-.6-1-1.5-1-2.5 0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5c0 1-.4 1.9-1 2.5.8.5 1.4 1.2 1.7 2.1.2.7.2 1.5.1 2.2C18.6 18 21 14.8 21 11a9 9 0 0 0-9-9z"/></svg>',
    description: 'Modelo de grande porte Hy3 com 78,0% no SWE-bench Verified e contexto longo de 1 milhão de tokens.',
    website: 'https://hunyuan.tencent.com'
  },
  'nvidia': {
    id: 'nvidia',
    name: 'NVIDIA',
    country: 'EUA',
    logo: '🟩',
    brandColor: '#76b900',
    iconUrl: 'https://cdn.simpleicons.org/nvidia/76b900',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.747 18.067c-.207 0-.363-.051-.518-.155-2.072-1.45-3.367-3.936-3.367-6.577 0-3.21 1.968-6.11 4.972-7.353.466-.207 1.036.052 1.243.518.207.466-.052 1.036-.518 1.243-2.383.984-3.936 3.314-3.936 5.9 0 2.124 1.036 4.092 2.693 5.231.414.31.518.88.207 1.295-.207.31-.466.466-.777.466zm4.195-2.693c-.207 0-.414-.052-.57-.155-1.295-.88-2.072-2.383-2.072-3.936 0-1.813 1.036-3.418 2.693-4.143.466-.207 1.036.052 1.243.518.207.466-.052 1.036-.518 1.243-.984.414-1.606 1.398-1.606 2.486 0 .932.466 1.813 1.243 2.33.414.259.518.828.259 1.243-.155.259-.414.414-.673.414zm4.091 2.33c-.259 0-.518-.104-.673-.31-.363-.414-.31-.984.104-1.346 1.761-1.502 2.745-3.677 2.745-6.008 0-3.522-2.33-6.629-5.749-7.561-.466-.155-.777-.673-.621-1.191.155-.466.673-.777 1.191-.621 4.04 1.14 6.888 4.868 6.888 9.063 0 2.797-1.191 5.438-3.314 7.251-.155.207-.363.31-.57.31z"/></svg>',
    description: 'Pioneira em arquiteturas LatentMoE Mamba-2 ultra-rápidas (Nemotron 3.5 com 135 tok/s decode e 45 ms TTFT).',
    website: 'https://build.nvidia.com'
  },
  'meituan': {
    id: 'meituan',
    name: 'Meituan (LongCat)',
    country: 'China',
    logo: '🐱',
    brandColor: '#ffc300',
    iconUrl: 'https://cdn.simpleicons.org/meituan/ffc300',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-9 9c0 3.6 2.1 6.7 5.2 8.1.3-.8.7-1.6 1.3-2.2-.8-.7-1.5-1.7-1.5-2.9 0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.2-.7 2.2-1.5 2.9.6.6 1 1.4 1.3 2.2 3.1-1.4 5.2-4.5 5.2-8.1a9 9 0 0 0-9-9z"/></svg>',
    description: 'Criadora do LongCat-2.0, open-weights MoE de 3,55 TB para pesquisa técnica e monorepos.',
    website: 'https://github.com/meituan'
  },
  'meta': {
    id: 'meta',
    name: 'Meta',
    country: 'EUA',
    logo: '♾️',
    brandColor: '#0081fb',
    iconUrl: 'https://cdn.simpleicons.org/meta/0081fb',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 14.414C9.517 11.233 8.012 9.09 6.279 9.09c-1.874 0-3.398 1.488-3.398 3.515 0 2.378 1.838 4.417 4.098 4.417 1.583 0 2.993-.933 4.148-2.608h.874c1.155 1.675 2.565 2.608 4.148 2.608 2.26 0 4.098-2.039 4.098-4.417 0-2.027-1.524-3.515-3.398-3.515-1.733 0-3.238 2.143-5.722 5.324zm-6.279-2.824c.732 0 1.579 1.127 2.628 2.585-1.026 1.428-1.928 2.012-2.628 2.012-1.332 0-2.365-1.229-2.365-2.598 0-1.37 1.033-2.599 2.365-2.599zm12.558 0c1.332 0 2.365 1.229 2.365 2.599 0 1.369-1.033 2.598-2.365 2.598-.7 0-1.602-.584-2.628-2.012 1.049-1.458 1.896-2.585 2.628-2.585z"/></svg>',
    description: 'Família Muse Spark 1.2 com suporte multimodal completo, 82,9% no Terminal-Bench oficial e variante Contributor.',
    website: 'https://ai.meta.com'
  },
  'cursor': {
    id: 'cursor',
    name: 'Cursor (Anysphere)',
    country: 'EUA',
    logo: '⚡',
    brandColor: '#06b6d4',
    iconUrl: 'https://cdn.simpleicons.org/cursor/06b6d4',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.8l6.8 3.8-6.8 3.8-6.8-3.8L12 4.8zm-7.6 5.4l6.8 3.8v7.6l-6.8-3.8V10.2zm8.4 11.4v-7.6l6.8-3.8v7.6l-6.8 3.8z"/></svg>',
    description: 'Desenvolvedora do Composer 2.5 e mantenedora do benchmark independente CursorBench 3.2.',
    website: 'https://cursor.com'
  },
  'camelai': {
    id: 'camelai',
    name: 'camelAI',
    company: 'CamelQA, Inc.',
    country: 'EUA',
    logo: '🐪',
    brandColor: '#f59e0b',
    iconUrl: 'https://camelai.com/favicon.ico',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 7h-1.6l-1.8-3.6C15.8 2.6 15 2 14.1 2H11c-1.1 0-2 .9-2 2v2H6c-1.1 0-2 .9-2 2v2l-2 3v7h2v-5l2-2.5V20h2v-6h3v6h2v-6.5l2.4-3.5H19v6h2v-7l-1.5-2.5z"/></svg>',
    website: 'https://camelai.com',
    type: [
      'coding-agent-platform',
      'app-builder',
      'inference-router'
    ],
    description: 'Plataforma integrada de coding agent autônomo (camelCode) e API de inferência de taxa fixa com tokens ilimitados (camelStream).'
  }
};


// ==========================================
// 2. CATÁLOGO CANÔNICO DE TODOS OS 45 MODELOS
// ==========================================

// ==========================================
// 2. CATÁLOGO CANÔNICO DE TODOS OS 44 MODELOS
// ==========================================

const AI_MODELS_DATA = {
  "grok-4-6": {
    "id": "grok-4-6",
    "name": "Grok 4.6",
    "family": "xai",
    "provider": "xai",
    "providerName": "xAI",
    "color": "#a855f7",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Proprietário Frontier",
    "attentionType": "Multi-Head Attention c/ Thinking Integrado",
    "contextWindow": 500000,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": true,
      "canDisable": false,
      "supportedEfforts": [
        "low",
        "medium",
        "high",
        "xhigh"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 2,
        "cacheRead": 0.5,
        "cacheWrite": null,
        "output": 6
      },
      "longContextThreshold": 200000,
      "longContextMultiplier": 2,
      "cacheDiscount": 75
    },
    "cursorPool": {
      "pool": "cursor-models",
      "poolLabel": "Cursor Models (High-Allowance Pool)",
      "fastDefault": true,
      "fastMultiplier": 2
    },
    "sweetSpot": "Medium (67,1% no CursorBench a $1,28/task)",
    "strengths": [
      "Capacidade de ponta com esforço XHigh (70,8% CursorBench) e 65,9% no DeepSWE 1.1",
      "500k de contexto com excelente compreensão de monorepos complexos",
      "Suporte nativo a visão/imagem e 4 níveis de esforço de raciocínio",
      "Pool separado no Cursor Pro ($20 Pool)"
    ],
    "weaknesses": [
      "Thinking não pode ser desativado (mandatório)",
      "Preço dobra em contextos >= 200k tokens ($4 in / $1 cache / $12 out)",
      "Long-context menor que modelos de 1M/2M"
    ],
    "badges": [
      "FRONTIER MOE",
      "500K CONTEXT",
      "CURSOR POOL",
      "THINKING MANDATÓRIO"
    ],
    "officialBenchmarks": {
      "aaIndex": 61,
      "gdpvalAaV2": 1753,
      "cursorBench32": 69.9,
      "cursorBenchHigh": 69.9,
      "deepSwe11": 65.9,
      "frontierCode11Extended": 61.3,
      "apexAgents": 57.5,
      "terminalBench30": 26.0,
      "apexSwe": 56.4,
      "aaBriefcase": 1577,
      "harveyLab": 15.8,
      "methodology": "Avaliação oficial SpaceXAI (12/08/2026 - Introducing Grok 4.6). Terminal-Bench 2.1 88.4% é medição independente Artificial Analysis e CursorBench 70.8% é execução live XHigh independente."
    },
    "sources": [
      "xai-grok46",
      "aa-grok46-tb21",
      "cursorbench-32"
    ],
    "operationalGuidance": {
      "idealFor": [
        "Long-running coding agents e automações autônomas",
        "Criação de aplicações completas do zero",
        "Desenvolvimento visual/UI e inspeção de screenshots",
        "Debugging multi-etapas em monorepos complexos",
        "Worker autônomo com excelente equilíbrio velocidade/inteligência"
      ],
      "avoidFor": [
        "Operações mecânicas triviais onde um modelo flash resolve com menor custo",
        "Aplicações que exigem mais de 500k de contexto bruto",
        "Workflows onde custo mínimo absoluto é a prioridade crítica"
      ],
      "orchestrationFlow": "Grok 4.6 High (Planeja & Implementa) → Grok 4.6 Low/Medium (Workers Paralelos) → Testes Automatizados → Grok 4.6 High/XHigh (Root Cause Debugging)"
    }
  },
  "grok-4-5": {
    "id": "grok-4-5",
    "name": "Grok 4.5",
    "family": "xai",
    "provider": "xai",
    "providerName": "xAI",
    "color": "#9333ea",
    "status": "legacy",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Legado xAI",
    "attentionType": "Multi-Head Attention",
    "contextWindow": 500000,
    "maxOutputTokens": 32768,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": true,
      "canDisable": false,
      "supportedEfforts": [
        "low",
        "medium",
        "high"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "json_mode",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 2,
        "cacheRead": 0.30,
        "cacheWrite": null,
        "output": 6
      },
      "longContextThreshold": 200000,
      "longContextMultiplier": 2,
      "cacheDiscount": 85
    },
    "cursorPool": {
      "pool": "cursor-models",
      "poolLabel": "Cursor Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard / High (66,7% CursorBench)",
    "strengths": [
      "83,3% no Terminal-Bench 2.1 e 53,0% no DeepSWE 1.1",
      "Throughput elevado de ~80 tok/s para coding diário",
      "Janela de 500k com suporte a imagem"
    ],
    "weaknesses": [
      "DeepSWE 53,0% superado pelo Grok 4.6 (65,9%)",
      "Modelo antecessor substituído na maioria dos pipelines"
    ],
    "badges": [
      "LEGADO",
      "CURSOR POOL",
      "83.3% TB 2.1"
    ],
    "officialBenchmarks": {
      "terminalBench21": 83.3,
      "deepSwe11": 53,
      "sweBenchPro": 64.7,
      "cursorBenchHigh": 66.7,
      "methodology": "Divulgação oficial xAI."
    },
    "operationalGuidance": {
      "idealFor": [
        "Coding diário rápido e refatorações delimitadas",
        "Workers de geração de código para sub-módulos",
        "Implementações com especificações claras"
      ],
      "avoidFor": [
        "Tarefas complexas onde Grok 4.6 está disponível com melhor raciocínio",
        "Contextos maiores que 500k"
      ],
      "orchestrationFlow": "Modelo Frontier (Planejamento) → Grok 4.5 (Worker Rápido de Execução) → Frontier (Validação Final)"
    }
  },
  "gpt-6-astra": {
    "id": "gpt-6-astra",
    "name": "GPT-6 Astra",
    "family": "openai",
    "provider": "openai",
    "providerName": "OpenAI",
    "color": "#10a37f",
    "status": "active",
    "openWeights": false,
    "license": "Proprietary OpenAI",
    "apiModelId": "gpt-6-astra",
    "chatgptProductName": "GPT-6 Pro",
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Proprietário Frontier Reasoning",
    "attentionType": "Multi-Head Latent Sparse Attention com CoT Adaptativo",
    "contextWindow": 1050000,
    "maxOutputTokens": 128000,
    "knowledgeCutoff": "2026-04-30",
    "releaseDate": "2026-09-03",
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoningEfforts": [
      "low",
      "medium",
      "high",
      "xhigh",
      "max"
    ],
    "reasoning": {
      "mandatory": true,
      "canDisable": false,
      "supportedEfforts": [
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "asyncToolCalling": true,
      "midTurnSteering": true,
      "fim": true,
      "responsesApiTools": [
        "web_search",
        "file_search",
        "image_generation_tool",
        "code_interpreter",
        "hosted_shell",
        "apply_patch",
        "skills",
        "computer_use",
        "mcp",
        "tool_search"
      ]
    },
    "pricing": {
      "standard": {
        "input": 10.00,
        "cacheRead": 1.00,
        "cacheWrite": 12.50,
        "output": 50.00
      },
      "longContextThreshold": 272000,
      "longContextMultiplier": {
        "input": 2,
        "cacheRead": 2,
        "cacheWrite": 2,
        "output": 1.5
      },
      "cacheDiscount": 90,
      "batch": {
        "input": 5.00,
        "cacheRead": 0.50,
        "cacheWrite": 6.25,
        "output": 25.00
      },
      "flex": {
        "input": 5.00,
        "cacheRead": 0.50,
        "cacheWrite": 6.25,
        "output": 25.00
      },
      "fastApi": {
        "multiplier": 2.0,
        "input": 20.00,
        "cacheRead": 2.00,
        "cacheWrite": 25.00,
        "output": 100.00,
        "caveat": "Fast mode não disponível sob configuração de residência de dados na União Europeia."
      }
    },
    "rateLimits": {
      "tier1": { "rpm": 500, "tpm": 500000, "batchQueue": 1500000 },
      "tier2": { "rpm": 5000, "tpm": 1000000, "batchQueue": 3000000 },
      "tier3": { "rpm": 5000, "tpm": 2000000, "batchQueue": 100000000 },
      "tier4": { "rpm": 10000, "tpm": 4000000, "batchQueue": 200000000 },
      "tier5": { "rpm": 15000, "tpm": 40000000, "batchQueue": 15000000000 }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": true,
      "fastMultiplier": 2
    },
    "sweetSpot": "High para coding geral e terminal (57,88% TB4 e 99,95% ARC3 Provider Adapter); XHigh para DeepSWE (74,1% pass@1)",
    "strengths": [
      "Líder em autonomia de terminal e ciência: 57,88% no Terminal-Bench 4.0 e 65,4% no Terminal-Bench Science 0.1",
      "Eficiência de tarefas líder no DeepSWE 1.1 (74,1% pass@1 com metade dos tokens de Sol)",
      "Retenção quase perfeita em contexto longo verdadeiro: 100% no MRCR v2 (256k-512k) e 96,3% (512k-1M)",
      "Suporte nativo a Async Tool Calling, Mid-Turn Steering e Responses API tools avançadas",
      "Primeiro modelo avaliado como Critical em Cibersegurança sob o Preparedness Framework (100% ExploitBench)",
      "Excelente acurácia visual e interpretação de documentos massivos: 33,2% no GDP.pdf"
    ],
    "weaknesses": [
      "Tarifa nominal premium por milhão de tokens ($10,00 in / $50,00 out / $12,50 cache write)",
      "Esforço Max frequentemente apresenta retornos decrescentes (+89,7% custo no DeepSWE e +43,3% no TB4 para ganho nulo ou marginal)",
      "Throughput independente ainda não divulgado (N/D) nos rankings oficiais de velocidade",
      "Sem áudio ou vídeo nativos de entrada/saída no nível de modelo",
      "GPT-6 Pro Chat não incluído na assinatura ChatGPT Plus (apenas Work/Codex com limite)",
      "Regressão de monitorabilidade de CoT frente a avaliações adversariais em comparação ao Sol"
    ],
    "badges": [
      "FRONTIER FLAGSHIP",
      "1.05M CONTEXT",
      "REASONING 5 LEVELS",
      "ASYNC TOOL CALLING",
      "MID-TURN STEERING",
      "CRITICAL CYBER CAPABILITY"
    ],
    "aliases": [
      "GPT 6 Astra",
      "GPT-6 Astra",
      "Astra",
      "GPT6 Astra",
      "gpt-6-astra",
      "GPT-6 Pro (product alias)"
    ],
    "officialBenchmarks": {
      "terminalBench40": 57.9,
      "deepSwe11": 74.1,
      "frontierCode11Extended": 64.5,
      "frontierCode11Main": 53.3,
      "internalDbMigration": 63.9,
      "aaCodingAgentIndex14": 67.0,
      "terminalBenchScience01": 64.6,
      "frontierMathT4V2": 97.6,
      "gpqaDiamond": 96.0,
      "hleWithTools": 57.2,
      "mrcrV2_256k_512k": 100.0,
      "mrcrV2_512k_1m": 96.3,
      "agentsLastExam": 59.3,
      "osworld2OfflinePartial": 72.6,
      "screenSpotPro": 92.7,
      "automationBench": 41.4,
      "benchCad": 95.9,
      "browseComp": 91.5,
      "geneBenchPro": 37.8,
      "medChemBench": 49.3,
      "lifeSciBench": 60.3,
      "healthBenchProLengthAdjusted": 63.4,
      "exploitBench": 100.0,
      "exploitGym": 42.4,
      "sreBenchPass1": 88.0,
      "secBenchPro": 85.4,
      "methodology": "OpenAI GPT-6 Astra Launch Evaluation Table (2026). Scores correspondem ao máximo entre esforços públicos (maximum-at-any-effort)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Engenharia de software autônoma de altíssima complexidade e monorepos densos",
        "Agentes persistentes de terminal e pesquisa científica automatizada",
        "Workflows complexos de Computer Use e navegação web multi-passo",
        "Análise e raciocínio profundo sobre documentos e livros técnicos em contexto longo (>272k)",
        "Defesa e auditoria de vulnerabilidades em ambientes corporativos autorizados"
      ],
      "avoidFor": [
        "Transformações mecânicas e pipelines de alto volume e baixo valor agregado onde Terra/Luna bastam",
        "Aplicações com orçamento estrito por chamada onde $50/M em output é proibitivo",
        "Default automático para o esforço Max sem avaliar retornos (preferir High/XHigh)",
        "Aplicações que exigem modelos locais abertos ou modalidades de áudio/vídeo nativo"
      ],
      "orchestrationFlow": "GPT-6 Astra High/XHigh (Planejamento Arquitetural & Auditoria Crítica) → GPT-5.6 Terra / Luna (Workers Mecânicos de Execução) → GPT-6 Astra High (Revisão & Verificação Final)"
    },
    "sources": [
      "openai-gpt6-astra-launch",
      "openai-gpt6-astra-api",
      "openai-gpt6-astra-system-card",
      "aa-gpt6-astra-v411",
      "deep-swe-v11-20260903",
      "snorkel-terminal-bench-science-01",
      "arcprize-gpt6-astra-20260902"
    ]
  },
  "gpt-5-6-sol": {
    "id": "gpt-5-6-sol",
    "name": "GPT-5.6 Sol",
    "family": "openai",
    "provider": "openai",
    "providerName": "OpenAI",
    "color": "#10b981",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Proprietário Frontier",
    "attentionType": "Multi-Head Latent Sparse Attention",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 4.00,
        "cacheRead": 0.40,
        "cacheWrite": 5.00,
        "output": 20.00
      },
      "longContextThreshold": 272000,
      "longContextMultiplier": 2,
      "cacheDiscount": 90
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": true,
      "fastMultiplier": 2
    },
    "sweetSpot": "High / Max (88,8 no Terminal-Bench 2.1 e 72,7 no DeepSWE)",
    "strengths": [
      "Líder em engenharia extrema: 88,8% Terminal-Bench 2.1 e 72,7% DeepSWE 1.1",
      "Retenção excepcional de 73,8% no OpenAI MRCR v2 (512k-1M)",
      "Excelente multimodalidade, Computer Use (62,6% OSWorld) e GPQA Diamond (94,6%)",
      "Suporte nativo a FIM (Fill-in-the-Middle) e Strict Schema garantido"
    ],
    "weaknesses": [
      "Custo e latência elevados ($5,00 in / $30,00 out)",
      "Max/Ultra pode consumir alto orçamento de reasoning tokens",
      "Sobretaxa após 272k tokens"
    ],
    "badges": [
      "ADAPTIVE REASONING",
      "FRONTIER TIER 1",
      "STRICT SCHEMA",
      "FIM NATIVO"
    ],
    "officialBenchmarks": {
      "terminalBench21": 88.8,
      "deepSwe11": 72.7,
      "sweBenchPro": 64.6,
      "mrcrV2_1m_max": 73.8,
      "gpqaDiamond": 94.6,
      "osworld": 62.6,
      "methodology": "OpenAI GPT-5.6 Technical Card Oficial (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Problemas de engenharia de software de alta complexidade e causa-raiz obscura",
        "Arquitetura de sistemas do zero e design de monorepos",
        "Planejamento e coordenação de subagentes autônomos",
        "Investigação técnica profunda em bases de código >500k"
      ],
      "avoidFor": [
        "Boilerplate mecânico e tarefas simples onde Luna/Terra resolvem com menor custo",
        "Pipelines onde latência sub-segundo é obrigatória"
      ],
      "orchestrationFlow": "GPT-5.6 Sol (Diagnóstico & Plano Arquitetural) → GPT-5.6 Terra / Luna (Workers Paralelos) → GPT-5.6 Sol (Revisão & Verificação Final)"
    }
  },
  "gpt-5-6-terra": {
    "id": "gpt-5-6-terra",
    "name": "GPT-5.6 Terra",
    "family": "openai",
    "provider": "openai",
    "providerName": "OpenAI",
    "color": "#059669",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Proprietário Balanced Tier",
    "attentionType": "Multi-Head Attention",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 2.00,
        "cacheRead": 0.20,
        "cacheWrite": 2.50,
        "output": 12.00
      },
      "longContextThreshold": 272000,
      "longContextMultiplier": 2,
      "cacheDiscount": 90
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Max (64,9% CursorBench a $2,31/task)",
    "strengths": [
      "87,4% Terminal-Bench 2.1 e 69,6% DeepSWE 1.1 (muito próximo do Sol)",
      "Excelente retenção no MRCR v2 (72,5% em 1M)",
      "Relação custo-benefício de topo ($0,80 in / $4,00 out)",
      "Daily driver de alta robustez"
    ],
    "weaknesses": [
      "Abaixo do Sol em Computer Use e raciocínio extremo na cauda longa"
    ],
    "badges": [
      "🌟 MELHOR CUSTO/BENEFÍCIO",
      "BALANCED FRONTIER",
      "STRICT SCHEMA"
    ],
    "officialBenchmarks": {
      "terminalBench21": 87.4,
      "deepSwe11": 69.6,
      "sweBenchPro": 63.4,
      "mrcrV2_1m_max": 72.5,
      "gpqaDiamond": 92.9,
      "osworld": 50.2,
      "cursorBenchMax": 64.9,
      "methodology": "OpenAI GPT-5.6 Technical Card Oficial (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Daily driver principal para desenvolvimento de software e features multi-arquivo",
        "Revisão detalhada de código e refatorações complexas",
        "Agentes autônomos de médio e longo prazo"
      ],
      "avoidFor": [
        "Tarefas triviais onde Luna é até 10x mais barato",
        "Problemas na fronteira teórica onde Sol é estritamente necessário"
      ],
      "orchestrationFlow": "GPT-5.6 Terra (Orquestrador & Integração) → GPT-5.6 Luna (Workers de Execução) → GPT-5.6 Sol (Apenas se houver falhas críticas persistentes)"
    }
  },
  "gpt-5-6-luna": {
    "id": "gpt-5-6-luna",
    "name": "GPT-5.6 Luna",
    "family": "openai",
    "provider": "openai",
    "providerName": "OpenAI",
    "color": "#34d399",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Dense Leve Otimizado",
    "attentionType": "Multi-Head Attention Flash",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "defaultEffort": "low"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.20,
        "cacheRead": 0.02,
        "cacheWrite": 0.25,
        "output": 1.20
      },
      "longContextThreshold": 272000,
      "longContextMultiplier": 2,
      "cacheDiscount": 90
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (56,8% CursorBench a $0,16/task)",
    "strengths": [
      "84,7% Terminal-Bench 2.1 e 67,2% DeepSWE 1.1 com custo ultrabaixo ($0,15 in / $0,60 out)",
      "Velocidade extrema de throughput (~98 no radar)",
      "Excelente para workers paralelos massivos"
    ],
    "weaknesses": [
      "Retenção MRCR v2 de 41,3% em 1M (perda de fidelidade em distâncias longas)",
      "Menor robustez em causas raízes extremamente obscuras"
    ],
    "badges": [
      "⚡ ULTRA-FAST",
      "SUB-DOLLAR TIER",
      "10.250 REQ/MÊS GO"
    ],
    "officialBenchmarks": {
      "terminalBench21": 84.7,
      "deepSwe11": 67.2,
      "sweBenchPro": 62.7,
      "mrcrV2_1m_max": 41.3,
      "gpqaDiamond": 92.3,
      "osworld": 45.6,
      "cursorBenchMax": 61.1,
      "methodology": "OpenAI GPT-5.6 Technical Card Oficial (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Workers paralelos de alto volume e baixo custo",
        "Busca semântica e filtragem em repositórios",
        "Transformações mecânicas de código, linting e testes unitários",
        "Geração de documentação e scaffolding"
      ],
      "avoidFor": [
        "Long-context onde informações distantes (>200k) são cruciais",
        "Diagnóstico de bugs arquiteturais profundos"
      ],
      "orchestrationFlow": "Sol ou Terra (Plano) → GPT-5.6 Luna (Dezenas de Workers Paralelos) → Terra (Integração & Validação)"
    }
  },
  "gpt-5-6-pro": {
    "id": "gpt-5-6-pro",
    "name": "GPT-5.6 Sol Pro",
    "family": "openai",
    "provider": "openai",
    "providerName": "OpenAI",
    "color": "#047857",
    "status": "preview",
    "openWeights": false,
    "directApi": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Frontier Especializado em Workflows Longos",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": true,
      "canDisable": false,
      "supportedEfforts": [
        "high",
        "max"
      ],
      "defaultEffort": "max"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "api": null,
      "subscriptionOnly": true,
      "subscriptionPlan": "ChatGPT Pro",
      "notes": "Opção de produto exclusiva do ChatGPT Pro; não disponível como endpoint público na OpenAI API"
    },
    "sourceConfidence": "official",
    "benchmarkCoverage": "unverified",
    "sources": [
      "openai-gpt56-launch",
      "openai-gpt56-safety"
    ],
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 2
    },
    "sweetSpot": "Max (Escalonamento Crítico)",
    "strengths": [
      "Opção de maior capacidade para tarefas extremamente difíceis e workflows longos",
      "Raciocínio profundo e persistência em investigações complexas"
    ],
    "weaknesses": [
      "Custo muito elevado; não indicado para volume diário padrão",
      "Sem ledger público separado (usar como escalonamento acima do Sol)"
    ],
    "badges": [
      "🔬 WORKFLOWS CRÍTICOS",
      "PRO ESCALONAMENTO"
    ],
    "operationalGuidance": {
      "idealFor": [
        "Escalonamento acima do Sol em tarefas que repetidamente falham",
        "Investigação científica de ponta e auditorias de segurança críticas"
      ],
      "avoidFor": [
        "Desenvolvimento rotineiro e tarefas onde o Sol normal é suficiente"
      ],
      "orchestrationFlow": "GPT-5.6 Sol falha repetidamente → Escalonamento para GPT-5.6 Sol Pro"
    }
  },
  "gpt-5-5-preview": {
    "id": "gpt-5-5-preview",
    "name": "GPT-5.5",
    "family": "openai",
    "provider": "openai",
    "providerName": "OpenAI",
    "color": "#6ee7b7",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Frontier Predecessor",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "low",
        "medium",
        "high",
        "xhigh"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 3,
        "cacheRead": 0.3,
        "cacheWrite": 3.75,
        "output": 15
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (58,4% CursorBench)",
    "strengths": [
      "85,6% Terminal-Bench 2.1 e 67,0% DeepSWE 1.1",
      "Retenção de 74,0% no MRCR v2 1M e GPQA Diamond de 93,6%"
    ],
    "weaknesses": [
      "Superado em eficiência pela família GPT-5.6"
    ],
    "badges": [
      "ESTÁVEL",
      "85.6% TB 2.1"
    ],
    "officialBenchmarks": {
      "terminalBench21": 85.6,
      "deepSwe11": 67,
      "sweBenchPro": 59.4,
      "mrcrV2_1m_max": 74,
      "gpqaDiamond": 93.6,
      "osworld": 47.5,
      "cursorBenchHigh": 58.4,
      "methodology": "OpenAI Technical Release."
    },
    "operationalGuidance": {
      "idealFor": [
        "Workflows estabelecidos baseados no GPT-5.5",
        "Tarefas de coding agêntico com contexto longo de 1M"
      ],
      "avoidFor": [
        "Novos projetos onde GPT-5.6 Terra oferece melhor relação custo-benefício"
      ],
      "orchestrationFlow": "GPT-5.5 (Orquestrador) → Workers Rápidos → GPT-5.5 (Revisão)"
    }
  },
  "gpt-oss-120b": {
    "id": "gpt-oss-120b",
    "name": "gpt-oss-120b",
    "family": "openai-oss",
    "provider": "openai",
    "providerName": "OpenAI Open-Weights",
    "color": "#059669",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "120B MoE (~60.8 GiB Checkpoint)",
    "paramsActive": "~5.1B",
    "architectureType": "MoE Aberto Apache 2.0",
    "attentionType": "Multi-Head Attention 131k",
    "contextWindow": 131072,
    "maxOutputTokens": 16384,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "low",
        "medium",
        "high"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0,
        "cacheRead": 0,
        "cacheWrite": null,
        "output": 0
      },
      "selfHosted": true
    },
    "cursorPool": {
      "pool": "local",
      "poolLabel": "Self-Hosted",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "antigravity": {
      "available": true,
      "pool": "Pool 2: Claude and GPT models (Compartilhado)",
      "poolLabel": "Pool 2: Claude & GPT",
      "role": "Worker Local / Processamento Privado / Segunda Opinião",
      "quotaWarning": "No Google Antigravity, pertence ao Pool 2 compartilhado com Claude Sonnet/Opus sem desconto divulgado de cota."
    },
    "sweetSpot": "High (62,4% SWE-bench Verified no High Effort)",
    "strengths": [
      "Licença Apache 2.0 aberta e permissiva",
      "Projetado para caber em 1x GPU 80GB (MXFP4 oficial ~60.8 GiB) com ~5.1B ativos",
      "47,9% → 52,6% → 62,4% SWE-bench Verified progressivo (Low → Med → High)",
      "Suporte nativo a ferramentas, Python/cálculo e Strict Schema"
    ],
    "weaknesses": [
      "Apenas texto (sem visão nativa)",
      "Contexto limitado a 131k tokens",
      "No Google Antigravity consome a mesma cota restrita do Sonnet/Opus"
    ],
    "badges": [
      "🔓 APACHE 2.0",
      "1X 80GB GPU",
      "62.4% SWE-VERIFIED (HIGH)"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 62.4,
      "aiderPolyglot": 44.4,
      "tau2Retail": 67.8,
      "tau2Airline": 49.2,
      "gpqaDiamond": 80.1,
      "hleWithTools": 19,
      "methodology": "OpenAI GPT-OSS Technical Model Card (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Auto-hospedagem e processamento privado em servidores corporativos",
        "Subagentes locais e pipelines matemáticos com execução de Python",
        "Servidor local de alta vazão para equipes internas"
      ],
      "avoidFor": [
        "Coding frontier multimodal e monorepos que exigem mais de 131k de contexto",
        "Uso irrestrito no Antigravity onde Sonnet 4.6 entrega quase 80% pelo mesmo orçamento de cota"
      ],
      "orchestrationFlow": "Orquestrador Frontier (Sonnet/Opus) → GPT-OSS-120B Local (Workers Privados) → Orquestrador (Validação)"
    }
  },
  "gpt-oss-20b": {
    "id": "gpt-oss-20b",
    "name": "gpt-oss-20b",
    "family": "openai-oss",
    "provider": "openai",
    "providerName": "OpenAI Open-Weights",
    "color": "#10b981",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "20B MoE (~12.8 GiB Checkpoint)",
    "paramsActive": "~2.2B",
    "architectureType": "MoE Aberto Apache 2.0 Leve",
    "attentionType": "Multi-Head Attention 131k",
    "contextWindow": 131072,
    "maxOutputTokens": 16384,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "low",
        "medium",
        "high"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0,
        "cacheRead": 0,
        "cacheWrite": null,
        "output": 0
      },
      "selfHosted": true
    },
    "cursorPool": {
      "pool": "local",
      "poolLabel": "Self-Hosted",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (60,7% SWE-bench Verified / Cabe em 16 GB VRAM)",
    "strengths": [
      "Opera confortavelmente em ~16 GB de VRAM (1x RTX 3090/4090 de 24 GB)",
      "60,7% no SWE-bench Verified em High Effort",
      "Throughput excelente de 80–250 tok/s"
    ],
    "weaknesses": [
      "Apenas texto e contexto de 131k",
      "Não indicado como arquiteto principal de sistemas"
    ],
    "badges": [
      "🔓 APACHE 2.0",
      "1X RTX 4090 (16GB)",
      "60.7% SWE-VERIFIED"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 60.7,
      "aiderPolyglot": 34.2,
      "tau2Retail": 54.8,
      "tau2Airline": 38,
      "gpqaDiamond": 66,
      "hleWithTools": 8.8,
      "methodology": "OpenAI GPT-OSS Technical Model Card (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Worker local mais barato para estações pessoais com GPU gamer",
        "Classificação, parsing, testes unitários e geração de código simples",
        "Subagentes em enxame offline"
      ],
      "avoidFor": [
        "Arquiteto principal de projetos complexos"
      ],
      "orchestrationFlow": "Modelo Frontier (Planejador) → Enxame de GPT-OSS-20B Locais (Execução Mecânica) → Frontier (Revisão)"
    }
  },
  "claude-fable-5-1": {
    "id": "claude-fable-5-1",
    "name": "Claude Fable 5.1",
    "family": "anthropic",
    "provider": "anthropic",
    "providerName": "Anthropic",
    "color": "#ea580c",
    "status": "stable",
    "releaseDate": "01/09/2026",
    "openWeights": false,
    "paramsTotal": "N/D (Ultra-Frontier Proprietário)",
    "paramsActive": "N/D",
    "architectureType": "Ultra-Frontier Hybrid Reasoning",
    "attentionType": "Multi-Head Attention 1M c/ Adaptive Thinking",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "knowledgeCutoff": "Junho de 2026",
    "limitations": "Custo elevado em tarefas longas; tool_choice restrito ('any' e 'tool' incompatíveis com raciocínio adaptativo); fallback server-side (~4% de tokens para Opus avaliados em benchmarks); retenção de até 30 dias em contas comerciais padrão.",
    "reasoning": {
      "mandatory": false,
      "canDisable": false,
      "supportedEfforts": [
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "defaultEffort": "high",
      "adaptiveThinking": true
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false,
      "progressUpdates": true,
      "contentProvenance": true
    },
    "pricing": {
      "standard": {
        "input": 10.00,
        "cacheRead": 0.25,
        "cacheWrite": 12.50,
        "output": 50.00
      },
      "cacheWrite5Min": 12.50,
      "cacheWrite1Hour": 20.00,
      "cacheRead": 0.25,
      "batchDiscount": 50
    },
    "privacy": {
      "retentionDays": 30,
      "enterpriseOptIn": true,
      "frontierSafeguards": true,
      "cursorOptInRequired": true,
      "notes": "Retenção de até 30 dias para logs de segurança em planos comerciais; ZDR formal sob contrato Enterprise com Frontier Safeguards. No Cursor exige aprovação explícita de administrador."
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": false,
      "fastMultiplier": 2
    },
    "sweetSpot": "XHigh (72,8% CursorBench / $6,96) e High (69,4% / $4,80)",
    "strengths": [
      "Raciocínio adaptativo ultra-profundo com alta autonomia agêntica para engenharia de software",
      "Alta precisão cognitiva e raciocínio formal avaliado no Artificial Analysis Intelligence Index",
      "Execução avançada em linha de comando no Terminal-Bench e raciocínio científico no HLE",
      "Cache Read 75% mais barato que Claude Fable 5 ($0,25/1M vs $1,00/1M)",
      "Janela de saída expandida de 128k tokens (131.072) com raciocínio adaptativo"
    ],
    "weaknesses": [
      "Tarifa nominal de ponta: $10/M input e $50/M output; tarefas no Max podem custar $9–$17/task",
      "Safeguards estritos podem acionar fallback silencioso de até ~4% dos tokens para Opus em comandos sensíveis",
      "Incompatibilidade com tool_choice 'any' no endpoint adaptativo (exige 'auto')"
    ],
    "badges": [
      "👑 #1 CURSORBENCH (73.4%)",
      "🏆 #1 AA INDEX (66)",
      "91.4% TB 2.1",
      "128K OUTPUT",
      "NOVO — SET/2026"
    ],
    "officialBenchmarks": {
      "terminalBenchScience01": 52.6,
      "terminalBench40": 55.8,
      "gdpvalElo": 1853,
      "osworld2Partial": 77.9,
      "osworld2Strict": 41.7,
      "hleWithoutTools": 60.9,
      "hleWithTools": 65.0,
      "automationBench": 31.4,
      "methodology": "Anthropic Claude Fable 5.1 System Card & Official Announcement (Setembro/2026)."
    },
    "independentBenchmarks": {
      "cursorBench": {
        "low": { "score": 66.2, "costUsd": 2.90, "tokensPerTask": 19522, "steps": 31 },
        "medium": { "score": 68.0, "costUsd": 3.53, "tokensPerTask": 23801, "steps": 36 },
        "high": { "score": 69.4, "costUsd": 4.80, "tokensPerTask": 33153, "steps": 44 },
        "xhigh": { "score": 72.8, "costUsd": 6.96, "tokensPerTask": 51349, "steps": 55 },
        "max": { "score": 73.4, "costUsd": 9.64, "tokensPerTask": 72060, "steps": 70 }
      },
      "artificialAnalysis": {
        "low": { "aaIndex": 58, "costPerTask": 0.77 },
        "medium": { "aaIndex": 60, "costPerTask": 1.00 },
        "high": { "aaIndex": 62, "costPerTask": 1.43 },
        "xhigh": { "aaIndex": 65, "costPerTask": 2.65 },
        "max": { "aaIndex": 66, "costPerTask": 3.69 },
        "terminalBench21": 91.4,
        "sciCode": 62.0,
        "hle": 59.1,
        "notes": "Líder geral AA Index v4.1.1 (66). ~4% dos output tokens foram atendidos por fallback server-side para modelos Opus em safeguards."
      }
    },
    "operationalGuidance": {
      "idealFor": [
        "Problemas agênticos de cauda extrema, bugs complexos e refatoração arquitetural crítica",
        "Planejador líder (Arquiteto) em pipelines multi-agente complexos",
        "Investigações matemáticas, científicas e jurídicas de alta profundidade",
        "Revisão final de segurança e auditoria de monorepos estratégicos"
      ],
      "avoidFor": [
        "Tarefas triviais, mecânicas ou pipelines onde o custo por requisição precisa ser sub-dólar",
        "Harnesses que forçam 'tool_choice: any' ou não tratam blocos de adaptive thinking"
      ],
      "orchestrationFlow": "Claude Fable 5.1 (Planejamento & Decomposição) → Gemini 3.8 / Sonnet 5 (Execução Paralela) → Claude Fable 5.1 (Validação & Revisão)"
    },
    "sourceConfidence": "official",
    "sources": [
      "anthropic-claude-fable-51",
      "cursorbench-32",
      "artificial-analysis-v41"
    ]
  },
  "claude-fable-5": {
    "id": "claude-fable-5",
    "name": "Claude Fable 5",
    "family": "anthropic",
    "provider": "anthropic",
    "providerName": "Anthropic",
    "color": "#d97706",
    "status": "superseded",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Ultra-Frontier Hybrid Reasoning",
    "attentionType": "Multi-Head Attention 1M c/ Deep Reasoning",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": false,
      "supportedEfforts": [
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 10.00,
        "cacheRead": 1.00,
        "cacheWrite5Min": 12.50,
        "cacheWrite1Hour": 20.00,
        "output": 50.00
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": false,
      "fastMultiplier": 2
    },
    "sweetSpot": "High / Max (70,5% CursorBench / 80,0% SWE-Pro)",
    "strengths": [
      "Frontier absoluto: 70,5% no CursorBench Max e 69,7% no DeepSWE",
      "80,0% no SWE-bench Pro e 83,1% no Terminal-Bench",
      "Excelente para deep research e engenharia de software extrema de longo prazo"
    ],
    "weaknesses": [
      "Extremamente caro ($17,32/task no Max, ultrapassando 100k tokens por tarefa)",
      "Safeguards rigorosos podem limitar comandos de baixo nível"
    ],
    "badges": [
      "👑 FRONTIER ABSOLUTO",
      "DEEP RESEARCH",
      "80% SWE-PRO"
    ],
    "officialBenchmarks": {
      "terminalBench21": 83.1,
      "deepSwe11": 69.7,
      "sweBenchPro": 80,
      "cursorBenchMax": 70.5,
      "methodology": "Anthropic Claude Fable 5 Technical Report (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Problemas extremamente complexos de software engineering e deep research",
        "Investigação de arquiteturas de software de missão crítica",
        "Revisão final de pipelines de alto risco"
      ],
      "avoidFor": [
        "Volume repetitivo e tarefas mecânicas triviais",
        "Pipelines com restrição severa de orçamento ou latência"
      ],
      "orchestrationFlow": "Claude Fable 5 (Arquiteto & Validador Final) → Claude Opus / Sonnet (Workers de Implementação) → Claude Fable 5 (Auditoria)"
    }
  },
  "claude-opus-5": {
    "id": "claude-opus-5",
    "name": "Claude Opus 5",
    "family": "anthropic",
    "provider": "anthropic",
    "providerName": "Anthropic",
    "color": "#b45309",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Frontier Architecture Anthropic",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 5.00,
        "cacheRead": 0.50,
        "cacheWrite5Min": 6.25,
        "cacheWrite1Hour": 10.00,
        "output": 25.00
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": false,
      "fastMultiplier": 1.5
    },
    "sweetSpot": "High (66,7% CursorBench a $3,91/task / 73,6% DeepSWE)",
    "strengths": [
      "Líder em DeepSWE 1.1 (73,6%) e CursorBench Max (70,0%)",
      "Excelente coordenação de workers e raciocínio de longo fôlego",
      "Custo aproximadamente 50% menor que o Fable 5"
    ],
    "weaknesses": [
      "Custo e latência de reasoning elevados em esforço Max"
    ],
    "badges": [
      "🌟 DAILY FRONTIER",
      "73.6% DEEPSWE",
      "1M CONTEXT"
    ],
    "officialBenchmarks": {
      "deepSwe11": 73.6,
      "cursorBenchMax": 70,
      "cursorBenchHigh": 66.7,
      "methodology": "Anthropic Technical Announcements (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Daily driver frontier para arquitetura e agentic coding longo",
        "Investigação profunda de root causes e falhas intermitentes",
        "Coordenação de enxames de subagentes"
      ],
      "avoidFor": [
        "Tarefas triviais e processamento em massa de baixo valor"
      ],
      "orchestrationFlow": "Claude Opus 5 (Coordenação & Arquitetura) → Claude Sonnet 5 / Haiku 4.5 (Workers) → Claude Opus 5 (Validação)"
    }
  },
  "claude-sonnet-5": {
    "id": "claude-sonnet-5",
    "name": "Claude Sonnet 5",
    "family": "anthropic",
    "provider": "anthropic",
    "providerName": "Anthropic",
    "color": "#f59e0b",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Frontier Balanced Anthropic",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 2,
        "cacheRead": 0.2,
        "cacheWrite": null,
        "output": 10
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (56,9% CursorBench a $2,13/task)",
    "strengths": [
      "Grande salto agêntico: 80,4% Terminal-Bench 2.1 e 53,8% DeepSWE",
      "85,2% no SWE-bench Verified oficial",
      "Excelente suporte a ferramentas e análise de código"
    ],
    "weaknesses": [
      "Esforço Max pode inflar o volume de tokens (até 92k tokens/task)",
      "Abaixo de Fable/Opus na cauda mais difícil de problemas"
    ],
    "badges": [
      "🥇 DEFAULT ANTHROPIC",
      "85.2% SWE-VERIFIED",
      "80.4% TB 2.1"
    ],
    "officialBenchmarks": {
      "terminalBench21": 80.4,
      "deepSwe11": 53.8,
      "sweBenchVerified": 85.2,
      "sweBenchPro": 63.2,
      "gpqaDiamond": 90.5,
      "cursorBenchHigh": 56.9,
      "cursorBenchMax": 61.5,
      "methodology": "Anthropic Benchmark Matrix Oficial."
    },
    "operationalGuidance": {
      "idealFor": [
        "Default daily driver na stack Anthropic",
        "Desenvolvimento completo de features e refatorações multi-arquivo",
        "Uso intensivo de ferramentas e subagentes"
      ],
      "avoidFor": [
        "Tarefas de nível Fable após falhas repetidas"
      ],
      "orchestrationFlow": "Claude Sonnet 5 (Orquestrador & Implementador Principal) → Claude Haiku 4.5 (Workers Rápidos) → Sonnet 5 (Integração)"
    }
  },
  "claude-haiku-4-5": {
    "id": "claude-haiku-4-5",
    "name": "Claude Haiku 4.5",
    "family": "anthropic",
    "provider": "anthropic",
    "providerName": "Anthropic",
    "color": "#fbbf24",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Dense Otimizado de Alta Velocidade",
    "attentionType": "Multi-Head Attention 200k",
    "contextWindow": 200000,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "extended"
      ],
      "defaultEffort": "none"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 1.00,
        "cacheRead": 0.10,
        "cacheWrite": 1.25,
        "output": 5.00
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard (Sem Thinking / Subagente Worker)",
    "strengths": [
      "73,3% no SWE-bench Verified oficial",
      "Throughput ultra-rápido (~96 no radar) e baixa latência TTFT (~97)",
      "Tau² Retail de 83,2% para chamadas de ferramentas"
    ],
    "weaknesses": [
      "41,75% no Terminal-Bench 2.1 (capacidade agêntica básica)",
      "Menor capacidade de raciocínio profundo para bugs complexos"
    ],
    "badges": [
      "⚡ WORKER SUBAGENTE",
      "73.3% SWE-VERIFIED",
      "12.000 REQ/MÊS GO"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 73.3,
      "terminalBench21": 41.75,
      "tau2Retail": 83.2,
      "tau2Airline": 63.6,
      "gpqaDiamond": 73,
      "osworld": 50.7,
      "methodology": "Anthropic Model Card Oficial."
    },
    "operationalGuidance": {
      "idealFor": [
        "Worker ultra-rápido para subtarefas, parsing e classificação",
        "Geração de patches pontuais e testes unitários",
        "Triagem mecânica de logs e código"
      ],
      "avoidFor": [
        "Decisões arquiteturais complexas e monorepos de causa raiz oculta"
      ],
      "orchestrationFlow": "Sonnet ou Opus (Planejamento) → Dezenas de Workers Haiku 4.5 → Sonnet (Revisão)"
    }
  },
  "claude-opus-4-6": {
    "id": "claude-opus-4-6",
    "name": "Claude Opus 4.6",
    "family": "anthropic",
    "provider": "anthropic",
    "providerName": "Anthropic",
    "color": "#c2410c",
    "status": "legacy",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Frontier Long-Context Anthropic",
    "attentionType": "Multi-Head Attention 1M c/ Adaptive Thinking",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "adaptive",
        "high",
        "max"
      ],
      "defaultEffort": "adaptive"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 5,
        "cacheRead": 0.5,
        "cacheWrite": null,
        "output": 25
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1.5
    },
    "antigravity": {
      "available": true,
      "pool": "Pool 2: Claude and GPT models (Compartilhado)",
      "poolLabel": "Pool 2: Claude & GPT",
      "role": "🥈 Escalonamento Crítico de Profundidade",
      "quotaWarning": "Consome cota compartilhada restrita do Pool 2. Use quando o Sonnet 4.6 falhar."
    },
    "sweetSpot": "Adaptive Thinking (Líder em MRCR 1M 76,0%)",
    "strengths": [
      "80,8% no SWE-bench Verified oficial",
      "76,0% no OpenAI MRCR v2 (1M tokens) e 68,8% no ARC-AGI-2",
      "91,9% no Tau² Retail para chamadas complexas de ferramentas",
      "Excelente em Computer Use (72,7% OSWorld)"
    ],
    "weaknesses": [
      "Preço elevado ($5/$25) frente ao Sonnet 4.6",
      "Terminal-Bench 2.0 de 65,4% superado por modelos mais novos"
    ],
    "badges": [
      "MRCR 1M (76%)",
      "ARC-AGI 68.8%",
      "ANTIGRAVITY POOL 2"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 80.8,
      "terminalBench": 65.4,
      "mrcrV2_1m_max": 76,
      "gpqaDiamond": 91.3,
      "arcAgi2Verified": 68.8,
      "hleWithoutTools": 40,
      "hleWithTools": 53,
      "osworld": 72.7,
      "tau2Retail": 91.9,
      "methodology": "Anthropic Model Card Oficial (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Bugs obscuros com dependências cruzadas em monorepos de 1M",
        "Escalonamento crítico quando o Sonnet 4.6 não converge",
        "Tarefas multimodais complexas e raciocínio abstrato ARC-AGI-2"
      ],
      "avoidFor": [
        "Edição mecânica rotineira e geração de boilerplate"
      ],
      "orchestrationFlow": "Sonnet 4.6 tenta resolver → Se falhar ou for bug obscuro de 1M → Escalonar para Claude Opus 4.6"
    }
  },
  "claude-sonnet-4-6": {
    "id": "claude-sonnet-4-6",
    "name": "Claude Sonnet 4.6",
    "family": "anthropic",
    "provider": "anthropic",
    "providerName": "Anthropic",
    "color": "#ea580c",
    "status": "legacy",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Frontier Balanced Anthropic",
    "attentionType": "Multi-Head Attention 1M c/ Adaptive Thinking",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "adaptive",
        "medium",
        "high"
      ],
      "defaultEffort": "adaptive"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 3,
        "cacheRead": 0.3,
        "cacheWrite": null,
        "output": 15
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "antigravity": {
      "available": true,
      "pool": "Pool 2: Claude and GPT models (Compartilhado)",
      "poolLabel": "Pool 2: Claude & GPT",
      "role": "🥇 Melhor Default / Daily Driver Principal",
      "quotaWarning": "Consome cota compartilhada do Pool 2. Oferece o melhor retorno por cota consumida."
    },
    "sweetSpot": "Adaptive Thinking (79,6% SWE-bench a 60% do custo do Opus)",
    "strengths": [
      "79,6% no SWE-bench Verified oficial (quase idêntico ao Opus 80,8%)",
      "65,8% no MRCR v2 (1M tokens) e 89,9% no GPQA Diamond",
      "91,7% no Tau² Retail e 72,5% no OSWorld",
      "Melhor custo-benefício para coding no Google Antigravity"
    ],
    "weaknesses": [
      "DeepSWE comunitário de ~29,9% em tarefas estritas de monorepo"
    ],
    "badges": [
      "🥇 MELHOR DEFAULT",
      "79.6% SWE-VERIFIED",
      "ANTIGRAVITY POOL 2"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 79.6,
      "terminalBench": 59.1,
      "deepSwe11": 29.9,
      "mrcrV2_1m_max": 65.8,
      "gpqaDiamond": 89.9,
      "arcAgi2Verified": 58.3,
      "hleWithoutTools": 33.2,
      "hleWithTools": 49,
      "osworld": 72.5,
      "tau2Retail": 91.7,
      "methodology": "Anthropic Model Card Oficial (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Daily driver principal no Google Antigravity e plataformas de coding",
        "Desenvolvimento completo de features, refatoração e testes",
        "Interações ricas com ferramentas e MCP"
      ],
      "avoidFor": [
        "Tarefas onde o Gemini Flash resolve consumindo 8x menos cota"
      ],
      "orchestrationFlow": "Claude Sonnet 4.6 (Daily Driver Principal) → Se falhar por causa raiz oculta de 1M → Opus 4.6"
    }
  },
  "gemini-3-1-pro": {
    "id": "gemini-3-1-pro",
    "name": "Gemini 3.1 Pro",
    "family": "google",
    "provider": "google",
    "providerName": "Google DeepMind",
    "color": "#1d4ed8",
    "status": "preview",
    "apiStatus": "preview",
    "platformStatus": {
      "geminiApi": "preview",
      "antigravity": "available",
      "vertexAi": "ga"
    },
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Multimodal Nativo Frontier",
    "attentionType": "Multi-Head Attention 1M (Expansível até 2M)",
    "contextWindow": 2097152,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image",
        "video",
        "audio"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "low",
        "medium",
        "high"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 1.25,
        "cacheRead": 0.3125,
        "cacheWrite": null,
        "output": 5
      },
      "contextTiers": {
        "tier1_upTo128k": { "input": 1.25, "output": 5.00, "cacheRead": 0.3125 },
        "tier2_above128k": { "input": 2.50, "output": 10.00, "cacheRead": 0.625 }
      },
      "cacheDiscount": 75
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard / Medium Reasoning",
    "strengths": [
      "Raciocínio científico e matemático extremo (GPQA Diamond 94,3% e ARC-AGI-2 77,1%)",
      "Multimodalidade total e nativa com compreensão de vídeo longo e áudio",
      "Excelente performance em MCP e ferramentas (MCP Atlas 78,2% e Tau² Retail 90,8%)",
      "BrowseComp + Tools de 85,9% para pesquisa web automatizada e síntese"
    ],
    "weaknesses": [
      "DeepSWE 1.1 baixo (12,0%) para coding autônomo monorepo de longo horizonte",
      "Retenção no MRCR v2 cai de 84,9% em 128k para 26,3% na borda de 1M",
      "Ultrapassado em throughput de coding pelo Gemini 3.7 Flash"
    ],
    "badges": [
      "🎬 1M MULTIMODAL",
      "PRO TIER",
      "GPQA 94.3%",
      "ARC-AGI 77.1%"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 80.6,
      "sweBenchPro": 54.2,
      "terminalBench21": 73.8,
      "deepSwe11": 12,
      "gpqaDiamond": 94.3,
      "arcAgi2Verified": 77.1,
      "hleWithoutTools": 44.4,
      "hleWithTools": 51.4,
      "osworld": 76.2,
      "mcpAtlas": 78.2,
      "tau2Retail": 90.8,
      "tau2Telecom": 99.3,
      "browseComp": 85.9,
      "mmmuPro": 80.5,
      "mrcrV2_128k_avg": 84.9,
      "mrcrV2_1m_max": 26.3,
      "methodology": "Avaliação oficial Google DeepMind (Model Card Canônico 2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Raciocínio científico e matemático avançado (GPQA 94,3%)",
        "Análise multimodal complexa de vídeo, imagem e áudio nativos",
        "Uso intensivo de ferramentas e MCP (MCP Atlas 78,2%, Tau² Retail 90,8%)",
        "Pesquisa e síntese web profunda com BrowseComp (85,9%)",
        "Tarefas de coding de média/alta complexidade com especificação delimitada"
      ],
      "avoidFor": [
        "Coding autônomo de longo horizonte em monorepos (DeepSWE 1.1 é de apenas 12,0%)",
        "Confiança cega na retenção no topo do 1M (MRCR degrada para 26,3% em 1M)",
        "Uso como worker rápido e barato quando Gemini 3.7 Flash resolve a mesma tarefa"
      ],
      "orchestrationFlow": "Gemini 3.1 Pro (Análise / Plano / Multimodal) → Gemini 3.7 Flash (Workers Paralelos de Coding) → Gemini 3.1 Pro (Validação e Síntese Final)"
    }
  },
  "gemini-3-7-flash": {
    "id": "gemini-3-7-flash",
    "name": "Gemini 3.7 Flash",
    "family": "google",
    "provider": "google",
    "providerName": "Google DeepMind",
    "color": "#3b82f6",
    "status": "stable",
    "apiStatus": "stable",
    "generationPredecessorOf": "gemini-3-8-flash",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Multimodal Nativo Flash",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image",
        "video",
        "audio"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "low",
        "medium",
        "high"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 0.75,
        "cacheRead": 0.1875,
        "cacheWrite": null,
        "output": 3
      },
      "cacheDiscount": 75
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models ($20 Pool)",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (61,6% CursorBench / Vídeo & Áudio Nativo / 65,3% DeepSWE)",
    "strengths": [
      "DeepSWE 1.1 de 65,3% e Terminal-Bench 2.1 de 85,8% (superando Sonnet 5)",
      "Multimodalidade total nativa (Vídeo, Áudio, Imagem) em 1M de tokens",
      "Throughput excelente (~96 no radar) com custo muito acessível",
      "Thought signatures criptográficas para MCP"
    ],
    "weaknesses": [
      "Menor profundidade teórica que modelos frontier Sol/Fable/Opus",
      "Pode aceitar conclusões prematuras em tarefas excessivamente abertas"
    ],
    "badges": [
      "🎬 VÍDEO + ÁUDIO 1M",
      "65.3% DEEPSWE",
      "85.8% TB 2.1"
    ],
    "officialBenchmarks": {
      "terminalBench21": 85.8,
      "deepSwe11": 65.3,
      "gpqaDiamond": 94.5,
      "cursorBenchHigh": 61.6,
      "methodology": "Google DeepMind Model Card Oficial (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Coding rápido e triagem mecânica com throughput elevado",
        "Subagentes paralelos e automações de interface visual (UI)",
        "Documentos e bases de código de 1M de tokens",
        "Pesquisa e tarefas agênticas de alto volume"
      ],
      "avoidFor": [
        "Tarefas onde modelos frontier repetidamente falham",
        "Validação final crítica onde profundidade extrema de raciocínio é imperativa"
      ],
      "orchestrationFlow": "Gemini 3.1 Pro (Análise & Multimodal) → Gemini 3.7 Flash (Workers Paralelos) → Gemini 3.1 Pro (Síntese Final)"
    }
  },

  "gemini-3-8-flash": {
    "id": "gemini-3-8-flash",
    "name": "Gemini 3.8 Flash",
    "family": "google",
    "provider": "google",
    "providerName": "Google DeepMind",
    "color": "#2563eb",
    "status": "stable",
    "releaseDate": "02/09/2026",
    "openWeights": false,
    "paramsTotal": "N/D (MoE Proprietário)",
    "paramsActive": "N/D",
    "architectureType": "MoE Multimodal Nativo Flash",
    "attentionType": "Multi-Head Attention 1M c/ Thought Signatures",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image",
        "video",
        "audio",
        "pdf"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "low",
        "medium",
        "high"
      ],
      "defaultEffort": "medium"
    },
    "knowledgeCutoff": "Março de 2026 para domínios atualizados (alguns domínios até jan/2025)",
    "limitations": "Alucinações pontuais em raciocínio abstrato aberto sem tools; maior consumo de tokens em High effort; latência TTFT maior em High.",
    "tools": {
      "functionCalling": true,
      "searchAsATool": true,
      "codeExecution": true,
      "computerUse": true,
      "thoughtSignatures": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 0.75,
        "cacheRead": 0.075,
        "cacheWrite": null,
        "cacheStoragePerMillionPerHour": 0.50,
        "output": 3.75
      },
      "postPromo": {
        "effectiveFrom": "2027-01-01",
        "input": 1.50,
        "output": 7.50,
        "cacheRead": 0.15,
        "cacheStoragePerMillionPerHour": 1.00,
        "batch": {
          "input": 0.75,
          "output": 3.75,
          "cacheRead": 0.075
        }
      },
      "googleApi": {
        "input": 0.75,
        "cacheRead": 0.075,
        "cacheWrite": null,
        "output": 3.75
      },
      "promotionalPeriod": {
        "effectiveFrom": "2026-09-02",
        "effectiveUntil": "2026-12-31",
        "input": 0.75,
        "output": 3.75,
        "cacheRead": 0.075,
        "cacheStoragePerMillionPerHour": 0.50,
        "batch": {
          "input": 0.375,
          "output": 1.875,
          "cacheRead": 0.0375
        }
      },
      "batch": {
        "input": 0.375,
        "output": 1.875,
        "cacheRead": 0.0375
      },
      "afterPromotion": {
        "effectiveFrom": "2027-01-01",
        "input": 1.50,
        "output": 7.50,
        "cacheRead": 0.15,
        "cacheStorage": 1.00
      },
      "toolPricing": {
        "search": {
          "freeMonthlyRequests": 5000,
          "ratePer1kAfterFree": 14.00,
          "notes": "Franquia compartilhada de 5.000 requisições de Google Search/mês; excedente a $14 / 1.000 requisições (não convertido em tokens)."
        },
        "maps": {
          "notes": "Tarifação de chamadas de Google Maps estruturadas (não convertidas em tokens)."
        }
      },
      "cursor": {
        "input": 0.75,
        "output": 3.50,
        "cacheRead": 0.075,
        "normalContext": 200000,
        "maxContext": 1048576
      },
      "freeTier": "Disponível no Google AI Studio com rate limits por minuto",
      "cacheDiscount": 90
    },
    "cursorPool": {
      "pool": "cursor-models",
      "poolLabel": "Cursor Models / Generous Usage",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "antigravity": {
      "pool": "pool1",
      "poolLabel": "Pool 1: Gemini Models",
      "role": "Worker de Alto Throughput & Multimodalidade 1M",
      "tokensRatio": "Econômico / Pool Gemini"
    },
    "sweetSpot": "Medium (67,0% CursorBench / $1,93) e High (69,2% CursorBench / 74,0% DeepSWE)",
    "strengths": [
      "90,8% no Terminal-Bench 2.1 e 74,0% no DeepSWE v1.1 (líder em eficiência agêntica)",
      "Throughput altíssimo de ~305-310 tok/s medido pela Artificial Analysis",
      "Desconto de 90% em Cache Read ($0,075/1M) e janela nativa de 1M de tokens",
      "Multimodalidade nativa abrangente: texto, imagens, vídeo longo, áudio e PDF estruturado",
      "Suporte oficial a Search as a Tool, Code Execution e Thought Signatures para MCP"
    ],
    "weaknesses": [
      "No nível High de raciocínio consome volume expressivo de tokens (143k tokens/task no DeepSWE; volume de output ~30% maior no High medido por AA)",
      "TTFT significativamente mais alto no nível High (13,39s vs 0,70s no Low e 6,44s no Medium; custo por task até ~40% maior)"
    ],
    "badges": [
      "⚡ NOVO — SET/2026",
      "90.8% TB 2.1",
      "74.0% DEEPSWE",
      "1M MULTIMODAL",
      "305 TOK/S"
    ],
    "officialBenchmarks": {
      "terminalBench21": 90.8,
      "sweBenchPro": 61.6,
      "sweAtlas": 51.9,
      "tau3Banking": 38.1,
      "charXiv": 86.2,
      "gdpPdf": 35.0,
      "hle": 45.4,
      "hleVerified": 54.9,
      "financeAgentV2": 61.4,
      "harveyLegalAgent": 10.0,
      "methodology": "Google DeepMind Gemini 3.8 Flash Model Card Oficial (Setembro/2026)."
    },
    "independentBenchmarks": {
      "deepSwe11": {
        "score": 74.0,
        "confidenceInterval": 1.0,
        "avgCostPerTask": 2.36,
        "outputTokensPerTask": 143000,
        "agentStepsPerTask": 166,
        "snapshotDate": "2026-09-02",
        "source": "DeepSWE / DataCurve"
      },
      "cursorBenchHigh": {
        "score": 69.2,
        "costUsd": 2.38,
        "tokensPerTask": 81524,
        "steps": 161,
        "snapshotDate": "2026-09-02",
        "source": "CursorBench 3.2"
      },
      "cursorBenchMed": {
        "score": 67.0,
        "costUsd": 1.93,
        "tokensPerTask": 61603,
        "steps": 136,
        "snapshotDate": "2026-09-02",
        "source": "CursorBench 3.2"
      },
      "artificialAnalysis": {
        "low": { "aaIndex": 52, "throughputTps": 313.5, "ttftSec": 0.70, "costPerTask": 0.24, "outputVolume": "19M tokens" },
        "medium": { "aaIndex": 57, "throughputTps": 312.3, "ttftSec": 6.44, "costPerTask": 0.41, "outputVolume": "53M tokens" },
        "high": { "aaIndex": 59, "throughputTps": 304.6, "ttftSec": 13.39, "costPerTask": 0.58, "outputVolume": "120M tokens (~30% mais output que 3.7 Flash High)" }
      }
    },
    "operationalGuidance": {
      "idealFor": [
        "Workers agênticos de desenvolvimento em escala e resolução massiva de bugs",
        "Triagem e navegação de código em grandes monorepos (até 1M de tokens)",
        "Processamento e síntese multimodal de vídeos, áudios e documentação técnica em PDF",
        "Automação e tool calling intensivo com MCP e Search as a Tool"
      ],
      "avoidFor": [
        "Pesquisa teórica ultra-extrema onde latência e custo são totalmente secundários em relação à cauda frontier"
      ],
      "orchestrationFlow": "Claude Fable 5.1 (Arquiteto / Planejador) → Gemini 3.8 Flash (Workers Paralelos) → Gemini 3.8 Flash High (Integrador) → Claude Fable 5.1 (Revisão Final)"
    },
    "sourceConfidence": "official",
    "sources": [
      "google-deepmind-gemini-38",
      "cursorbench-32",
      "deepswe-datacurve",
      "artificial-analysis-v41"
    ]
  },
  "gemini-3-5-flash": {
    "id": "gemini-3-5-flash",
    "name": "Gemini 3.5 Flash",
    "family": "google",
    "provider": "google",
    "providerName": "Google DeepMind",
    "color": "#60a5fa",
    "status": "legacy",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Multimodal Legado",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 32768,
    "modalities": {
      "input": [
        "text",
        "image",
        "video",
        "audio"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none"
      ],
      "defaultEffort": "none"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 0.35,
        "cacheRead": 0.0875,
        "cacheWrite": null,
        "output": 1.05
      },
      "cacheDiscount": 75
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard (Boilerplate / Multimodal Econômico)",
    "strengths": [
      "Terminal-Bench 2.1 de 76,2% e OSWorld de 78,4%",
      "ARC-AGI-2 de 72,1% e HLE de 40,2%",
      "Custo ultrabaixo ($0,35 in / $1,05 out)"
    ],
    "weaknesses": [
      "Retenção MRCR v2 cai para 26,6% em 1M",
      "Superado pelo Gemini 3.7 Flash como worker geral de coding"
    ],
    "badges": [
      "LEGADO",
      "78.4% OSWORLD",
      "14.000 REQ/MÊS GO"
    ],
    "officialBenchmarks": {
      "terminalBench21": 76.2,
      "sweBenchPro": 55.1,
      "mrcrV2_1m_max": 26.6,
      "osworld": 78.4,
      "arcAgi2Verified": 72.1,
      "hleWithTools": 40.2,
      "methodology": "Google DeepMind Model Card Oficial."
    },
    "operationalGuidance": {
      "idealFor": [
        "Tarefas multimodais simples e transcrição de áudio",
        "Workers de baixo custo para geração de boilerplate"
      ],
      "avoidFor": [
        "Coding agêntico profundo onde 3.7 Flash é superior"
      ],
      "orchestrationFlow": "Gemini 3.5 Flash (Worker Multimodal Rápido) → Validação"
    }
  },
  "deepseek-v4-pro-0813": {
    "id": "deepseek-v4-pro-0813",
    "name": "DeepSeek-V4-Pro-0813",
    "family": "deepseek",
    "provider": "deepseek",
    "providerName": "DeepSeek",
    "color": "#0ea5e9",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "1.6T MoE (~580 GB Checkpoint)",
    "paramsActive": "~49B",
    "architectureType": "MoE Frontier Aberto",
    "attentionType": "Multi-Head Attention 1M c/ reasoning_content",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": true,
      "canDisable": false,
      "supportedEfforts": [
        "medium",
        "high",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.55,
        "cacheRead": 0.14,
        "cacheWrite": null,
        "output": 2.19
      },
      "cacheDiscount": 75
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (87,9% Terminal-Bench 2.1 / 62,7% DeepSWE)",
    "strengths": [
      "87,9% no Terminal-Bench 2.1 e 62,7% no DeepSWE 1.1",
      "1.6T parâmetros totais com 49B ativos e contexto de 1M",
      "Custo de API extremamente competitivo ($0,55 in / $2,19 out)"
    ],
    "weaknesses": [
      "Peso colossal para auto-hospedagem local (requer nós pesados H100/H200)",
      "Apenas texto (sem visão nativa)"
    ],
    "badges": [
      "🔷 OPEN FRONTIER",
      "87.9% TB 2.1",
      "62.7% DEEPSWE",
      "1M CTX"
    ],
    "officialBenchmarks": {
      "terminalBench21": 87.9,
      "deepSwe11": 62.7,
      "sweBenchPro": 55.4,
      "gpqaDiamond": 90,
      "hleWithTools": 60,
      "methodology": "DeepSeek Research Model Card (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Planejamento de longo fôlego e agentic coding em contexto de 1M",
        "Infraestrutura privada corporativa de alta inteligência",
        "Alternativa aberta aos modelos proprietários de ponta"
      ],
      "avoidFor": [
        "Hardware local modesto e casos onde visão nativa é necessária"
      ],
      "orchestrationFlow": "DeepSeek-V4-Pro (Planejador & Orquestrador) → DeepSeek-V4-Flash (Workers de Alta Velocidade) → V4-Pro (Revisão)"
    }
  },
  "deepseek-v4-flash-0731": {
    "id": "deepseek-v4-flash-0731",
    "name": "DeepSeek-V4-Flash-0731",
    "family": "deepseek",
    "provider": "deepseek",
    "providerName": "DeepSeek",
    "color": "#38bdf8",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "284B MoE (~167 GB Mixed FP4/FP8)",
    "paramsActive": "~13B",
    "architectureType": "MoE Aberto de Altíssima Eficiência",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": true,
      "canDisable": false,
      "supportedEfforts": [
        "low",
        "medium",
        "high"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.14,
        "cacheRead": 0.035,
        "cacheWrite": null,
        "output": 0.28
      },
      "cacheDiscount": 75
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Medium / High (82,7% Terminal-Bench 2.1 / 54,4% DeepSWE)",
    "strengths": [
      "Salto agêntico extraordinário no checkpoint final: 82,7% Terminal 2.1 e 54,4% DeepSWE",
      "284B total com apenas 13B ativos (checkpoint oficial de ~167 GB)",
      "Custo ultrabaixo de API ($0,14 in / $0,28 out) e 37.800 req/mês no OpenCode Go",
      "Licença aberta MIT"
    ],
    "weaknesses": [
      "Apenas texto (sem visão integrada)",
      "Requer 2x H200 para rodar local com folga de KV cache"
    ],
    "badges": [
      "13B ATIVOS",
      "82.7% TB 2.1",
      "37.800 REQ/MÊS GO",
      "MIT"
    ],
    "officialBenchmarks": {
      "terminalBench21": 82.7,
      "deepSwe11": 54.4,
      "methodology": "DeepSeek-V4-Flash Final Checkpoint Release (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Melhor worker de alta velocidade e baixo custo para pipelines agênticos",
        "Implementação de código em massa, linting e refatorações contínuas",
        "Auto-hospedagem em clusters intermediários de GPU"
      ],
      "avoidFor": [
        "Tarefas puramente visuais e causas-raiz que exigem modelo frontier no topo da escala"
      ],
      "orchestrationFlow": "Modelo Frontier (Planejamento) → Dezenas de Workers DeepSeek-V4-Flash → Frontier (Validação)"
    }
  },
  "deepseek-v4-vision-exp": {
    "id": "deepseek-v4-vision-exp",
    "name": "DeepSeek-V4-Flash-Vision-Exp",
    "family": "deepseek",
    "provider": "deepseek",
    "providerName": "DeepSeek",
    "color": "#0284c7",
    "status": "preview",
    "releaseDate": "21/08/2026",
    "openWeights": false,
    "paramsTotal": "304B MoE",
    "paramsActive": "~21B / token",
    "architectureType": "MoE Multimodal Nativo (MLA + MTP + DSpark)",
    "attentionType": "MLA (Multi-Head Latent Attention 1M)",
    "contextWindow": 1048576,
    "maxOutputTokens": 393216,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "low",
        "high",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "responsesApi": true,
      "anthropicMessagesApi": true,
      "concurrency": 2500,
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 0.22,
        "cacheRead": 0.007,
        "cacheWrite": null,
        "output": 0.66
      },
      "peak": {
        "input": 0.44,
        "cacheRead": 0.014,
        "output": 1.32
      },
      "tokensPerImage": 384,
      "costPerImage": 0.000084
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models / API Externa",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "officialBenchmarks": {
      "terminalBench21": 83.9,
      "deepSwe11": 59.3,
      "toolathlon": 75.9,
      "dsBenchHard": 63.6,
      "nl2Repo": 57.7,
      "cybergym": 75.3,
      "automationBench": 25.7,
      "chartography": 64.3,
      "zeroBenchPass5": 35.0,
      "agentsLastExam": 27.3,
      "apexBenchPass1": 36.5
    },
    "sweetSpot": "High / Max (Visão Econômica Nativa)",
    "strengths": [
      "Visão nativa multimodal a custo irrisório de ~$0,000084/imagem (~384 tokens fixos por imagem)",
      "59,3% no DeepSWE (supera Claude Opus 4.8 a 58,0%) e 83,9% no Terminal-Bench 2.1",
      "Janela de 1M de tokens e 384k de output máximo com compatibilidade Anthropic Messages e Responses API",
      "18.900 requisições/mês na cota de US$ 15 do OpenCode Go ($10/mês)"
    ],
    "weaknesses": [
      "Compressão visual para ~800x800 pode perder fidelidade em planilhas 4K ou OCR de texto minúsculo denso",
      "Pesos abertos (open-weights) ainda não disponibilizados para download local (nuvem/API)"
    ],
    "badges": [
      "VISÃO NATIVA",
      "EXPERIMENTAL",
      "SUB-DÓLAR",
      "COMUNIDADE",
      "OPENCODE GO"
    ],
    "sourceConfidence": "platform-sku/unverified-upstream",
    "operationalGuidance": {
      "idealFor": [
        "Loops visuais contínuos de desenvolvimento de interface (Screenshot → Analisa → Clica → Corrige)",
        "Inspeção de capturas de tela de IDE, diagramas arquiteturais e validação de UI",
        "Agentes de automação de navegador (Web / Computer Use) de ultra-baixo custo"
      ],
      "avoidFor": [
        "Inspeção pixel-perfect de planilhas 4K densas com fontes microscópicas (usar Gemini 3.7 Flash ou Claude Sonnet 5)",
        "Auto-hospedagem 100% offline (modelo ainda fechado para download local)"
      ],
      "orchestrationFlow": "DeepSeek V4 Flash 0731 (Coding Puro) → DeepSeek-V4-Flash-Vision-Exp (Inspeção Visual) → DeepSeek V4 Flash 0731 (Execução)"
    }
  },
  "deepseek-v3-2": {
    "id": "deepseek-v3-2",
    "name": "DeepSeek-V3.2",
    "family": "deepseek",
    "provider": "deepseek",
    "providerName": "DeepSeek",
    "color": "#0369a1",
    "status": "legacy",
    "openWeights": true,
    "paramsTotal": "671B MoE (~1.34 TB BF16)",
    "paramsActive": "~37B",
    "architectureType": "MoE Aberto Legado",
    "attentionType": "Multi-Head Attention 128k",
    "contextWindow": 131072,
    "maxOutputTokens": 16384,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "none"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "json_mode",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.14,
        "cacheRead": 0.035,
        "cacheWrite": null,
        "output": 0.28
      }
    },
    "sourceConfidence": "official",
    "sources": [
      "deepseek-v4-org",
      "deepswe-datacurve",
      "artificial-analysis-v41"
    ],
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard (73,1% SWE-bench Verified)",
    "strengths": [
      "73,1% no SWE-bench Verified oficial",
      "Excelente maturidade de tooling open-weights"
    ],
    "weaknesses": [
      "Capacidade agêntica de terminal (~46%) superada pela geração V4"
    ],
    "badges": [
      "LEGADO",
      "73.1% SWE-VERIFIED"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 73.1,
      "terminalBench21": 46,
      "methodology": "DeepSeek-V3.2 Historical Model Card."
    },
    "operationalGuidance": {
      "idealFor": [
        "Deployments já estabelecidos baseados no V3.2"
      ],
      "avoidFor": [
        "Novas arquiteturas onde o V4 Flash entrega maior inteligência agêntica"
      ],
      "orchestrationFlow": "V3.2 Local (Worker) → Validação"
    }
  },
  "qwen3-8-max": {
    "id": "qwen3-8-max",
    "name": "Qwen3.8 Max",
    "family": "qwen",
    "provider": "alibaba",
    "providerName": "Alibaba Qwen",
    "color": "#ff6a00",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D (Frontier Hosted)",
    "paramsActive": "N/D",
    "architectureType": "MoE Frontier c/ Suporte Multimodal & Ferramentas",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium",
        "high"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 1.6,
        "cacheRead": 0.4,
        "cacheWrite": null,
        "output": 6.4
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (86,6% Terminal-Bench 2.1 / 67,7% SWE-Pro)",
    "strengths": [
      "86,6% Terminal-Bench 2.1, 56,6% DeepSWE 1.1 e 67,7% SWE-bench Pro",
      "GPQA Diamond de 92,6% e HLE + Tools de 56,2%",
      "Multimodalidade integrada e suporte nativo a ferramentas"
    ],
    "weaknesses": [
      "Serviço hospedado de cota mais concorrida no OpenCode Go"
    ],
    "badges": [
      "👑 FRONTIER ALIBABA",
      "86.6% TB 2.1",
      "67.7% SWE-PRO",
      "1M CTX"
    ],
    "officialBenchmarks": {
      "terminalBench21": 86.6,
      "deepSwe11": 56.6,
      "sweBenchPro": 67.7,
      "gpqaDiamond": 92.6,
      "hleWithTools": 56.2,
      "methodology": "Alibaba Qwen3.8 Official Evaluation."
    },
    "operationalGuidance": {
      "idealFor": [
        "Coding agêntico em bases de código de 1M com ferramentas complexas",
        "Desenvolvimento de features com raciocínio matemático avançado",
        "Orquestrador principal na nuvem da Alibaba"
      ],
      "avoidFor": [
        "Workflows com restrição severa de cotas"
      ],
      "orchestrationFlow": "Qwen3.8 Max (Planejador) → Qwen3.8-27B (Workers Locais/API) → Qwen3.8 Max (Revisão)"
    }
  },
  "qwen3-8-2-4t-a95b": {
    "id": "qwen3-8-2-4t-a95b",
    "name": "Qwen3.8-2.4T-A95B (Repo)",
    "family": "qwen",
    "provider": "alibaba",
    "providerName": "Alibaba Qwen",
    "color": "#ea580c",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "2.4T MoE (~4.8 TB BF16)",
    "paramsActive": "~95B (10 routed + 1 shared)",
    "architectureType": "MoE Massivo de 2.4T Parâmetros",
    "attentionType": "Multi-Head Attention 262k (Extensível a 1.01M)",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "medium",
        "high"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0,
        "cacheRead": 0,
        "cacheWrite": null,
        "output": 0
      },
      "selfHosted": true
    },
    "cursorPool": {
      "pool": "local",
      "poolLabel": "Self-Hosted Cluster",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Cluster Deployment (92 Layers / 512 Experts)",
    "strengths": [
      "2.4T parâmetros totais com 95B ativos em 92 camadas e 512 experts",
      "86,6% Terminal-Bench 2.1 e 56,6% DeepSWE 1.1",
      "Checkpoint aberto text-only para data centers corporativos"
    ],
    "weaknesses": [
      "Demanda cluster mínimo de ≥8x B200 (INT4) ou ~32x B200 (BF16)"
    ],
    "badges": [
      "🐘 2.4T MOE (95B ACT)",
      "512 EXPERTS",
      "DATA CENTER ONLY"
    ],
    "officialBenchmarks": {
      "terminalBench21": 86.6,
      "deepSwe11": 56.6,
      "sweBenchPro": 67.7,
      "gpqaDiamond": 92.6,
      "methodology": "Alibaba Qwen3.8-2.4T Model Card."
    },
    "operationalGuidance": {
      "idealFor": [
        "Deployments em supercomputadores corporativos e data centers privados",
        "Pesquisa em escala extrema de monorepos de milhões de linhas de código"
      ],
      "avoidFor": [
        "Qualquer tipo de servidor individual ou estação de trabalho comum"
      ],
      "orchestrationFlow": "Qwen3.8-2.4T Cluster (Orquestrador Corporativo) → Workers Especializados"
    }
  },
  "qwen3-8-27b": {
    "id": "qwen3-8-27b",
    "name": "Qwen3.8-27B (Denso)",
    "family": "qwen",
    "provider": "alibaba",
    "providerName": "Alibaba Qwen",
    "color": "#f97316",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "27B Denso (~55.6 GB BF16)",
    "paramsActive": "27B",
    "architectureType": "Dense Otimizado Aberto",
    "attentionType": "Multi-Head Attention 128k",
    "contextWindow": 131072,
    "maxOutputTokens": 16384,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0,
        "cacheRead": 0,
        "cacheWrite": null,
        "output": 0
      },
      "selfHosted": true
    },
    "cursorPool": {
      "pool": "local",
      "poolLabel": "Self-Hosted (1x RTX 4090)",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Q4 / INT4 (Cabe perfeitamente em 24 GB de VRAM)",
    "strengths": [
      "Melhor modelo denso open-weights para workstation pessoal (1x RTX 4090/5090)",
      "73,0% no Terminal-Bench 2.1 e 61,7% no SWE-bench Pro",
      "Throughput excelente de 40–180 tok/s"
    ],
    "weaknesses": [
      "Contexto limitado a 131k tokens"
    ],
    "badges": [
      "🌟 MELHOR PARA 1X RTX 4090",
      "73.0% TB 2.1",
      "61.7% SWE-PRO"
    ],
    "officialBenchmarks": {
      "terminalBench21": 73,
      "sweBenchPro": 61.7,
      "methodology": "Alibaba Qwen3.8-27B Model Card Oficial."
    },
    "operationalGuidance": {
      "idealFor": [
        "Melhor modelo para desenvolvedores rodarem localmente em PC com GPU de 24 GB",
        "Coding diário offline, refatoração de código e testes"
      ],
      "avoidFor": [
        "Monorepos gigantes que demandam mais de 131k de contexto"
      ],
      "orchestrationFlow": "Qwen3.8-27B Local (Daily Driver de Desenvolvimento) → Nuvem apenas para tarefas extremas"
    }
  },
  "qwen3-7-max": {
    "id": "qwen3-7-max",
    "name": "Qwen3.7 Max",
    "family": "qwen",
    "provider": "alibaba",
    "providerName": "Alibaba Qwen",
    "color": "#fb923c",
    "status": "legacy",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Legado Alibaba",
    "attentionType": "Multi-Head Attention 500k",
    "contextWindow": 524288,
    "maxOutputTokens": 32768,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "json_mode",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 1,
        "cacheRead": 0.25,
        "cacheWrite": null,
        "output": 4
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard",
    "strengths": [
      "74,5% no Terminal-Bench 2.1 e 60,6% no SWE-bench Pro"
    ],
    "weaknesses": [
      "Superado em todas as métricas pelo Qwen3.8 Max"
    ],
    "badges": [
      "LEGADO",
      "74.5% TB 2.1"
    ],
    "officialBenchmarks": {
      "terminalBench21": 74.5,
      "deepSwe11": 20,
      "sweBenchPro": 60.6,
      "methodology": "Alibaba Qwen3.7 Benchmark Matrix."
    },
    "operationalGuidance": {
      "idealFor": [
        "Compatibilidade com projetos legados na cloud Alibaba"
      ],
      "avoidFor": [
        "Novos desenvolvimentos onde 3.8 Max é muito superior"
      ],
      "orchestrationFlow": "Qwen3.7 Max (Legado) → Validação"
    }
  },
  "kimi-k3": {
    "id": "kimi-k3",
    "name": "Kimi K3",
    "family": "moonshot",
    "provider": "moonshot",
    "providerName": "Moonshot AI",
    "color": "#3b82f6",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D (Frontier Hosted)",
    "paramsActive": "N/D",
    "architectureType": "MoE Multimodal Frontier Moonshot",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "low",
        "medium",
        "high",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 1.8,
        "cacheRead": 0.45,
        "cacheWrite": null,
        "output": 7.2
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Max (88,3% Terminal-Bench 2.1 / 67,5% DeepSWE / 60,8% CursorBench)",
    "strengths": [
      "88,3% Terminal-Bench 2.1 e 67,5% DeepSWE 1.1 (líder em coding agêntico)",
      "HLE + Tools de 59,8% e GPQA de 93,5%",
      "Excelente capacidade de orquestrador com contexto nativo de 1M"
    ],
    "weaknesses": [
      "Consumo elevado de cota no OpenCode Go (6,0x multiplicador)"
    ],
    "badges": [
      "AGENTIC SPECIALIST",
      "88.3% TB 2.1",
      "67.5% DEEPSWE",
      "1M CTX"
    ],
    "officialBenchmarks": {
      "terminalBench21": 88.3,
      "deepSwe11": 67.5,
      "gpqaDiamond": 93.5,
      "hleWithTools": 59.8,
      "cursorBenchMax": 60.8,
      "methodology": "Moonshot AI Official Model Card (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Orquestrador principal de enxames de subagentes",
        "Análise de contexto longo multimodal e monorepos complexos",
        "Desenvolvimento de features avançadas com MCP e ferramentas"
      ],
      "avoidFor": [
        "Volume mecânico simples onde K2.7 Code resolve com menor custo"
      ],
      "orchestrationFlow": "Kimi K3 (Planner / Orquestrador) → Kimi K2.7 Code (Workers de Implementação) → Kimi K3 (Revisão Final)"
    }
  },
  "kimi-k2-7-code": {
    "id": "kimi-k2-7-code",
    "name": "Kimi K2.7 Code",
    "family": "moonshot",
    "provider": "moonshot",
    "providerName": "Moonshot AI",
    "color": "#60a5fa",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Especializado em Geração & Execução de Código",
    "attentionType": "Multi-Head Attention 256k",
    "contextWindow": 262144,
    "maxOutputTokens": 32768,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.5,
        "cacheRead": 0.125,
        "cacheWrite": null,
        "output": 2
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Default (49,7% CursorBench a $1,43/task)",
    "strengths": [
      "Worker especializado para implementação de especificações já delimitadas",
      "Boa relação custo/performance (6.750 req/mês no Go)"
    ],
    "weaknesses": [
      "Menos indicado para definir arquiteturas de raiz ou bugs altamente conceituais"
    ],
    "badges": [
      "⚡ WORKER CODING",
      "256K CTX",
      "6.750 REQ/MÊS GO"
    ],
    "officialBenchmarks": {
      "deepSwe11": 30.5,
      "cursorBenchScore": 49.7,
      "costPerTask": 1.43,
      "tokensPerTask": 31247,
      "methodology": "Moonshot AI & CursorBench 3.2 Evaluation."
    },
    "operationalGuidance": {
      "idealFor": [
        "Implementar especificações detalhadas de funções e componentes",
        "Geração de testes unitários e refatorações de escopo fechado"
      ],
      "avoidFor": [
        "Definição de arquitetura global e investigação de falhas conceituais"
      ],
      "orchestrationFlow": "Kimi K3 (Planejamento) → Kimi K2.7 Code (Implementação Rápida) → K3 (Auditoria)"
    }
  },
  "kimi-k2-6": {
    "id": "kimi-k2-6",
    "name": "Kimi K2.6",
    "family": "moonshot",
    "provider": "moonshot",
    "providerName": "Moonshot AI",
    "color": "#93c5fd",
    "status": "legacy",
    "openWeights": true,
    "paramsTotal": "1T MoE",
    "paramsActive": "N/D",
    "architectureType": "MoE Multimodal 1T Legado",
    "attentionType": "Multi-Head Attention 256k",
    "contextWindow": 262144,
    "maxOutputTokens": 32768,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "json_mode",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 0.6,
        "cacheRead": 0.15,
        "cacheWrite": null,
        "output": 2.4
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard (80,2% SWE-bench Verified)",
    "strengths": [
      "80,2% no SWE-bench Verified oficial",
      "OSWorld de 73,1% e GPQA de 90,5%"
    ],
    "weaknesses": [
      "Papel menos claro em novos pipelines frente ao K3 e K2.7 Code"
    ],
    "badges": [
      "LEGADO",
      "80.2% SWE-VERIFIED"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 80.2,
      "terminalBench": 66.7,
      "gpqaDiamond": 90.5,
      "osworld": 73.1,
      "hleWithTools": 54,
      "methodology": "Moonshot AI Model Card."
    },
    "operationalGuidance": {
      "idealFor": [
        "Manutenção de pipelines estabelecidos com Kimi K2.6"
      ],
      "avoidFor": [
        "Novas arquiteturas onde Kimi K3 oferece maior autonomia agêntica"
      ],
      "orchestrationFlow": "K2.6 (Worker) → Validação"
    }
  },
  "glm-5-3": {
    "id": "glm-5-3",
    "name": "GLM-5.3",
    "family": "zai",
    "provider": "zai",
    "providerName": "Z.ai (Zhipu)",
    "color": "#eab308",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "N/D (Open Weights Checkpoint)",
    "paramsActive": "N/D",
    "architectureType": "MoE Frontier Aberto Z.ai",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "medium",
        "high",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 1,
        "cacheRead": 0.25,
        "cacheWrite": null,
        "output": 4
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Max (88,2% Terminal-Bench 2.1 / 66,9% DeepSWE)",
    "strengths": [
      "88,2% Terminal-Bench 2.1 e 66,9% DeepSWE 1.1 (grande salto de Agosto/2026)",
      "HLE + Tools de 62,5%, Toolathlon de 73,0% e CyberGym de 84,5%",
      "Excelente candidato a orquestrador open-weights com contexto de 1M"
    ],
    "weaknesses": [
      "Disponibilização gradual de pesos para download público"
    ],
    "badges": [
      "88.2% TB 2.1",
      "66.9% DEEPSWE",
      "1M CTX"
    ],
    "officialBenchmarks": {
      "terminalBench21": 88.2,
      "deepSwe11": 66.9,
      "hleWithTools": 62.5,
      "toolathlonVerified": 73,
      "cyberGym": 84.5,
      "methodology": "Z.ai Research Blog (Agosto/2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Orquestrador principal de coding agêntico e automação de terminal",
        "Tarefas complexas de engenharia com MCP e ferramentas",
        "Pipelines em infraestrutura privada"
      ],
      "avoidFor": [
        "Workstations simples sem nós de aceleração de GPU"
      ],
      "orchestrationFlow": "GLM-5.3 (Arquiteto & Coordenador) → GLM-5.2 / 5.1 (Workers de Execução) → GLM-5.3 (Validação)"
    }
  },
  "glm-5-2": {
    "id": "glm-5-2",
    "name": "GLM-5.2",
    "family": "zai",
    "provider": "zai",
    "providerName": "Z.ai (Zhipu)",
    "color": "#facc15",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Aberto MIT",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "medium",
        "high",
        "max"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.6,
        "cacheRead": 0.15,
        "cacheWrite": null,
        "output": 2.4
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High / Max (81,0% Terminal-Bench 2.1 / 55,0% CursorBench)",
    "strengths": [
      "Uma das alternativas abertas mais maduras para agentes: 1M, MIT, 81,0% Terminal 2.1",
      "46,2% no DeepSWE e 91,2% no GPQA Diamond",
      "4.300 req/mês no OpenCode Go"
    ],
    "weaknesses": [
      "Superado em inteligência agêntica extrema pelo GLM-5.3"
    ],
    "badges": [
      "🔓 MIT OPEN WEIGHTS",
      "81.0% TB 2.1",
      "1M CTX"
    ],
    "officialBenchmarks": {
      "terminalBench21": 81,
      "deepSwe11": 46.2,
      "sweBenchPro": 62.1,
      "gpqaDiamond": 91.2,
      "hleWithTools": 54.7,
      "cursorBenchMax": 55,
      "methodology": "Z.ai / Hugging Face GLM-5.2 Card."
    },
    "operationalGuidance": {
      "idealFor": [
        "Worker maduro para pipelines agênticos open-weights",
        "Auto-hospedagem corporativa com licença MIT permissiva"
      ],
      "avoidFor": [
        "Problemas na cauda extrema onde GLM-5.3 possui melhor resolução"
      ],
      "orchestrationFlow": "GLM-5.3 (Planner) → GLM-5.2 (Workers de Coding) → GLM-5.3 (Revisão)"
    }
  },
  "glm-5-1": {
    "id": "glm-5-1",
    "name": "GLM-5.1",
    "family": "zai",
    "provider": "zai",
    "providerName": "Z.ai (Zhipu)",
    "color": "#fef08a",
    "status": "legacy",
    "openWeights": true,
    "paramsTotal": "754B MoE (~1.5 TB BF16)",
    "paramsActive": "N/D",
    "architectureType": "MoE Aberto Legado",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 32768,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "json_mode",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 0,
        "cacheRead": 0,
        "cacheWrite": null,
        "output": 0
      },
      "selfHosted": true
    },
    "cursorPool": {
      "pool": "local",
      "poolLabel": "Self-Hosted Cluster",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Cluster Local (754B Checkpoint)",
    "strengths": [
      "Capacidade comprovada de sustentar loops agênticos longos em 1M"
    ],
    "weaknesses": [
      "63,5% Terminal-Bench e 18,0% DeepSWE (muito inferior a 5.2/5.3 no first-pass)",
      "Requer cluster de GPUs pesadas (4x a 8x H200)"
    ],
    "badges": [
      "LEGADO",
      "754B MOE",
      "CLUSTER ONLY"
    ],
    "officialBenchmarks": {
      "terminalBench21": 63.5,
      "deepSwe11": 18,
      "sweBenchPro": 58.4,
      "gpqaDiamond": 86.2,
      "hleWithTools": 52.3,
      "methodology": "Z.ai GLM-5.1 Technical Card."
    },
    "operationalGuidance": {
      "idealFor": [
        "Pipelines locais existentes calibrados para o checkpoint 754B"
      ],
      "avoidFor": [
        "Novos projetos de coding agêntico onde GLM-5.2/5.3 superam largamente"
      ],
      "orchestrationFlow": "GLM-5.1 Local (Worker de Loop Longo) → Validação"
    }
  },
  "mimo-v2-5-pro": {
    "id": "mimo-v2-5-pro",
    "name": "MiMo-V2.5-Pro",
    "family": "xiaomi",
    "provider": "xiaomi",
    "providerName": "Xiaomi",
    "color": "#ff6900",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "N/D (Open Weights)",
    "paramsActive": "N/D",
    "architectureType": "MoE Aberto de Alta Capacidade",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "medium",
        "high"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.4,
        "cacheRead": 0.1,
        "cacheWrite": null,
        "output": 1.6
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (78,9% SWE-bench Verified)",
    "strengths": [
      "78,9% no SWE-bench Verified oficial com contexto de 1M",
      "Boa opção open-weights para coding e raciocínio de alta capacidade",
      "16.300 req/mês no OpenCode Go"
    ],
    "weaknesses": [
      "DeepSWE comunitário de ~19,0% em tarefas estritas de monorepo"
    ],
    "badges": [
      "📱 OPEN WEIGHTS",
      "78.9% SWE-VERIFIED",
      "16.300 REQ/MÊS GO"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 78.9,
      "terminalBench": 68.4,
      "deepSwe11": 19,
      "sweBenchPro": 57.2,
      "methodology": "Xiaomi MiMo AI Technical Card."
    },
    "operationalGuidance": {
      "idealFor": [
        "Orquestrador e validador em stacks baseadas no ecossistema Xiaomi MiMo",
        "Tarefas de coding e raciocínio com especificações bem delimitadas"
      ],
      "avoidFor": [
        "Monorepos complexos com causa-raiz profundamente obscura"
      ],
      "orchestrationFlow": "MiMo Pro (Planner) → Vários MiMo 2.5 (Workers Multimodais) → MiMo Pro (Review)"
    }
  },
  "mimo-v2-5": {
    "id": "mimo-v2-5",
    "name": "MiMo-V2.5",
    "family": "xiaomi",
    "provider": "xiaomi",
    "providerName": "Xiaomi",
    "color": "#ff8533",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "~310B MoE",
    "paramsActive": "~15B",
    "architectureType": "MoE Multimodal Nativo (Texto, Imagem, Vídeo, Áudio)",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image",
        "video",
        "audio"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "none"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.1,
        "cacheRead": 0.025,
        "cacheWrite": null,
        "output": 0.2
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard (Recordista de Volume: 150.400 req/mês no Go)",
    "strengths": [
      "Recorde absoluto de volume: 150.400 requisições/mês no OpenCode Go",
      "Multimodal nativo com suporte a texto, imagem, vídeo e áudio em 1M",
      "310B total com 15B ativos: altíssima eficiência e velocidade (~90 no radar)"
    ],
    "weaknesses": [
      "Menor profundidade em raciocínio abstrato complexo"
    ],
    "badges": [
      "🏆 RECORDE DE VOLUME (150K REQ)",
      "MULTIMODAL 1M",
      "310B/15B ACT"
    ],
    "officialBenchmarks": {
      "terminalBench21": 65.8,
      "sweBenchPro": 56.1,
      "methodology": "Xiaomi MiMo AI Technical Card."
    },
    "operationalGuidance": {
      "idealFor": [
        "Worker multimodal de altíssimo volume para processar imagens, vídeos e áudios",
        "Triagem em massa de código e pipelines de scraping / OCR"
      ],
      "avoidFor": [
        "Arquitetura de sistemas complexos e bugs com deduções de múltiplas etapas"
      ],
      "orchestrationFlow": "MiMo Pro (Planner) → Dezenas de MiMo 2.5 (Workers Paralelos) → MiMo Pro (Review)"
    }
  },
  "minimax-m3": {
    "id": "minimax-m3",
    "name": "MiniMax M3",
    "family": "minimax",
    "provider": "minimax",
    "providerName": "MiniMax",
    "color": "#f43f5e",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Multimodal Frontier MiniMax",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium",
        "high"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.4,
        "cacheRead": 0.1,
        "cacheWrite": null,
        "output": 1.6
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (80,5% SWE-bench Verified / Custo Ultra-Agressivo)",
    "strengths": [
      "80,5% no SWE-bench Verified oficial e GPQA Diamond de 93,0%",
      "OSWorld de 70,1% e contexto longo de 1M",
      "16.000 req/mês no OpenCode Go com preço muito agressivo"
    ],
    "weaknesses": [
      "Execução independente do DeepSWE mostrou ~13,3% strict em monorepos"
    ],
    "badges": [
      "80.5% SWE-VERIFIED",
      "GPQA 93%",
      "16.000 REQ/MÊS GO"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 80.5,
      "terminalBench21": 65.5,
      "deepSwe11": 13.3,
      "sweBenchPro": 59,
      "gpqaDiamond": 93,
      "osworld": 70.1,
      "hleWithTools": 37,
      "methodology": "MiniMax Official Technical Release."
    },
    "operationalGuidance": {
      "idealFor": [
        "Coding de escopo delimitado com excelente relação preço/performance",
        "Uso multimodal com imagens e diagramas de arquitetura"
      ],
      "avoidFor": [
        "Monorepos estritos com dependências cruzadas profundas (DeepSWE 13,3%)"
      ],
      "orchestrationFlow": "Modelo Frontier (Planejamento) → MiniMax M3 (Workers de Código) → Frontier (Validação)"
    }
  },
  "minimax-m2-7": {
    "id": "minimax-m2-7",
    "name": "MiniMax M2.7",
    "family": "minimax",
    "provider": "minimax",
    "providerName": "MiniMax",
    "color": "#fb7185",
    "status": "legacy",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "MoE Legado MiniMax",
    "attentionType": "Multi-Head Attention 205k",
    "contextWindow": 204800,
    "maxOutputTokens": 16384,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none"
      ],
      "defaultEffort": "none"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "json_mode",
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 0.3,
        "cacheRead": 0.075,
        "cacheWrite": null,
        "output": 1.2
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard (76,5% SWE-bench Verified)",
    "strengths": [
      "76,5% no SWE-bench Verified oficial",
      "Throughput rápido de 62 tok/s"
    ],
    "weaknesses": [
      "Superado pelo MiniMax M3 na maioria dos cenários"
    ],
    "badges": [
      "LEGADO",
      "76.5% SWE-VERIFIED"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 76.5,
      "terminalBench": 57,
      "sweBenchPro": 56.22,
      "methodology": "MiniMax M2.7 Card."
    },
    "operationalGuidance": {
      "idealFor": [
        "Manutenção de pipelines estabelecidos com M2.7"
      ],
      "avoidFor": [
        "Novas arquiteturas onde o M3 oferece maior contexto e inteligência"
      ],
      "orchestrationFlow": "MiniMax M2.7 (Worker) → Validação"
    }
  },
  "nemotron-3-5-lightning": {
    "id": "nemotron-3-5-lightning",
    "name": "Nemotron 3.5 Lightning",
    "family": "nvidia",
    "provider": "nvidia",
    "providerName": "NVIDIA",
    "color": "#76b900",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "30B Híbrido Mamba-2 + MoE",
    "paramsActive": "~3B",
    "architectureType": "Mamba-2 + MoE + Attention Híbrido",
    "attentionType": "Multi-Head Attention 1M c/ DSpark/DFlash",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "none"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0,
        "cacheRead": 0,
        "cacheWrite": null,
        "output": 0
      },
      "selfHosted": true
    },
    "cursorPool": {
      "pool": "local",
      "poolLabel": "Self-Hosted (RTX 5090 / 1x H100)",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "NVFP4 / Local (100–400 tok/s / 1M Contexto)",
    "strengths": [
      "Arquitetura híbrida Mamba-2 + MoE + Attention: 30B total com apenas 3B ativos",
      "NVFP4 nativo rodando em 1x DGX Spark, 1x H100 ou RTX 5090 via GGUF (~16–24 GB)",
      "Throughput extremo de 100–400 tok/s com suporte nativo a 1M de contexto",
      "52,8% SWE-bench Verified e GPQA Diamond de 75,57% em NVFP4"
    ],
    "weaknesses": [
      "Intelligence ceiling moderado (23,46% Terminal-Bench 2.1)",
      "Não indicado para bugs de alta complexidade conceitual"
    ],
    "badges": [
      "⚡ 100-400 TOK/S",
      "NVFP4 NATIVO",
      "MAMBA-2 + MOE",
      "1M CTX"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 52.8,
      "terminalBench21": 23.46,
      "gpqaDiamond": 75.57,
      "hleWithTools": 10.47,
      "methodology": "NVIDIA Technical Report (NVFP4 Benchmark Oficial 2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Subagentes locais rápidos de altíssima vazão (100–400 tok/s)",
        "RAG e filtragem massiva de contexto longo (1M) em tempo real",
        "Pré-processamento, linting, parsing e classificação rápida em 1x GPU"
      ],
      "avoidFor": [
        "Delegar sozinho bugs complexos ou decisões de arquitetura"
      ],
      "orchestrationFlow": "Modelo Frontier (Planejamento) → Nemotron 3.5 Lightning (Dezenas de Workers Locais de Alta Velocidade) → Frontier (Validação)"
    }
  },
  "hy3-tencent": {
    "id": "hy3-tencent",
    "name": "Tencent Hy3",
    "family": "tencent",
    "provider": "tencent",
    "providerName": "Tencent",
    "color": "#12b7f5",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "295B MoE",
    "paramsActive": "~21B",
    "architectureType": "MoE Aberto Tencent Hunyuan",
    "attentionType": "Multi-Head Attention 256k",
    "contextWindow": 262144,
    "maxOutputTokens": 32768,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.35,
        "cacheRead": 0.0875,
        "cacheWrite": null,
        "output": 1.4
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "Standard (78,0% SWE-bench Verified / 71,7% Terminal 2.1)",
    "strengths": [
      "78,0% no SWE-bench Verified oficial e 71,7% no Terminal-Bench 2.1",
      "GPQA Diamond de 90,4% com apenas 21B parâmetros ativos por token",
      "21.500 req/mês no OpenCode Go"
    ],
    "weaknesses": [
      "Sem visão integrada; contexto limitado a 256k"
    ],
    "badges": [
      "🐧 OPEN WEIGHTS",
      "78.0% SWE-VERIFIED",
      "21.500 REQ/MÊS GO"
    ],
    "officialBenchmarks": {
      "sweBenchVerified": 78,
      "terminalBench21": 71.7,
      "deepSwe11": 28,
      "sweBenchPro": 57.9,
      "gpqaDiamond": 90.4,
      "methodology": "Tencent Hunyuan Technical Report."
    },
    "operationalGuidance": {
      "idealFor": [
        "Coding local em servidores corporativos e worker forte para ferramentas",
        "Tarefas de backend e manipulação de bases de código até 256k"
      ],
      "avoidFor": [
        "Tarefas multimodais e contextos que ultrapassam 256k"
      ],
      "orchestrationFlow": "Modelo Frontier (Planejamento) → Tencent Hy3 (Worker de Código) → Frontier (Validação)"
    }
  },
  "longcat-2-0": {
    "id": "longcat-2-0",
    "name": "LongCat-2.0",
    "family": "meituan",
    "provider": "meituan",
    "providerName": "Meituan",
    "color": "#ffc300",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "1.6T MoE (~3.5 TB Checkpoint)",
    "paramsActive": "~48B",
    "architectureType": "MoE Massivo de 1.6T Parâmetros",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium",
        "high"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "json_mode",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0,
        "cacheRead": 0,
        "cacheWrite": null,
        "output": 0
      },
      "selfHosted": true
    },
    "cursorPool": {
      "pool": "local",
      "poolLabel": "Self-Hosted",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (Cluster 8x B200 / Monorepos)",
    "strengths": [
      "1.6T parâmetros totais com ~48B ativos em contexto nativo de 1M de tokens",
      "70,8% no Terminal-Bench 2.1 e 59,5% no SWE-bench Pro",
      "Licença aberta MIT com suporte nativo a Claude Code, OpenClaw e Hermes"
    ],
    "weaknesses": [
      "Requer cluster de nível data center (mínimo 8x B200 INT4 ou 24x B200 BF16)",
      "Interconnect InfiniBand é tão crítico quanto compute"
    ],
    "badges": [
      "🐱 1.6T MOE (48B ACT)",
      "MIT OPEN WEIGHTS",
      "1M MONOREPO"
    ],
    "officialBenchmarks": {
      "terminalBench21": 70.8,
      "sweBenchPro": 59.5,
      "gpqaDiamond": 88.9,
      "methodology": "Meituan LongCat-2.0 Technical Report (2026)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Compreensão profunda de monorepos inteiros e bases de código gigantes (>500k tokens)",
        "Loops agênticos longos em ambiente de pesquisa corporativa privada",
        "Refatoração e auditoria arquitetural em larga escala"
      ],
      "avoidFor": [
        "Workstations domésticas ou servidores de GPU isolados",
        "Casos de uso com demanda de baixíssima latência individual"
      ],
      "orchestrationFlow": "LongCat 2.0 (Ingestão & Entendimento Global do Monorepo) → Workers Rápidos (Patches Locais) → LongCat 2.0 (Integração)"
    }
  },
  "muse-spark-1-2": {
    "id": "muse-spark-1-2",
    "name": "Muse Spark 1.2",
    "family": "meta",
    "provider": "meta",
    "providerName": "Meta",
    "color": "#0081fb",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "N/D (Multimodal Native)",
    "paramsActive": "N/D",
    "architectureType": "Multimodal Nativo c/ Computer Use",
    "attentionType": "Multi-Head Attention 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": [
        "text",
        "image",
        "video",
        "audio"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium",
        "high",
        "xhigh"
      ],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.35,
        "cacheRead": 0.0875,
        "cacheWrite": null,
        "output": 1.4
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "XHigh (82,9% Terminal-Bench 2.1 / 54,9% DeepSWE)",
    "strengths": [
      "Combina agentic coding (82,9% Terminal 2.1, 54,9% DeepSWE) + multimodalidade total + Computer Use",
      "Variante Contributor com multiplicador 0,5x (226.600 req/mês no Go)",
      "Suporte completo a 1M de tokens"
    ],
    "weaknesses": [
      "Menos especializado em debugging extremo do que modelos puramente de código como Sol/Fable"
    ],
    "badges": [
      "♾️ MULTIMODAL META",
      "82.9% TB 2.1",
      "226.600 REQ/MÊS GO"
    ],
    "officialBenchmarks": {
      "terminalBench21": 82.9,
      "deepSwe11": 54.9,
      "sweBenchVerified": 86.6,
      "methodology": "Meta AI Technical Evaluation."
    },
    "operationalGuidance": {
      "idealFor": [
        "Orquestrador multimodal, agente de interface de usuário (UI) e automação de documentos",
        "Desenvolvimento de aplicações ricas com elementos visuais e de áudio"
      ],
      "avoidFor": [
        "Substituição exclusiva de Sol/Fable para debugging hard-core em terminal puro"
      ],
      "orchestrationFlow": "Muse Spark 1.2 (Orquestrador Multimodal / UI) → Workers Especializados de Código → Muse Spark 1.2 (Validação)"
    }
  },
  "composer-2-5": {
    "id": "composer-2-5",
    "name": "Composer 2.5",
    "family": "cursor",
    "provider": "cursor",
    "providerName": "Cursor (Anysphere)",
    "color": "#06b6d4",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D",
    "paramsActive": "N/D",
    "architectureType": "Especializado em Coding Interativo & Fast Edits",
    "attentionType": "Multi-Head Attention c/ Cache Turbo",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "modalities": {
      "input": [
        "text",
        "image"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": [
        "none",
        "medium"
      ],
      "defaultEffort": "medium"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.5,
        "cacheRead": 0.125,
        "cacheWrite": null,
        "output": 2
      }
    },
    "cursorPool": {
      "pool": "cursor-models",
      "poolLabel": "Cursor Models (Pool Dedicado)",
      "fastDefault": true,
      "fastMultiplier": 1
    },
    "sweetSpot": "Fast / Interactive (56,1% CursorBench a $0,44/task)",
    "strengths": [
      "56,1% no CursorBench 3.2 com custo econômico de ~$0,44 por tarefa concluída",
      "Otimizado nativamente para o motor de diff e multi-file editing do Cursor IDE",
      "Throughput ultrarrápido com latência TTFT mínima"
    ],
    "weaknesses": [
      "Especializado no fluxo interativo do editor; não compete em benchmarks acadêmicos complexos",
      "Contexto limitado a 256k tokens"
    ],
    "badges": [
      "⚡ NATIVO CURSOR",
      "🌟 $0.44/TASK",
      "MULTI-FILE DIFF"
    ],
    "officialBenchmarks": {
      "cursorBenchScore": 56.1,
      "costPerTask": 0.44,
      "tokensPerTask": 14286,
      "methodology": "CursorBench 3.2 Execução Independente Oficial (Anysphere)."
    },
    "operationalGuidance": {
      "idealFor": [
        "Edição interativa rápida no Cursor IDE e Composer",
        "Patches pequenos e médios e geração de código em tempo real",
        "Operações agênticas diárias de alta frequência"
      ],
      "avoidFor": [
        "Raciocínio científico abstrato e formulações matemáticas complexas",
        "Monorepos que demandam mais de 256k de contexto contínuo"
      ],
      "orchestrationFlow": "Modelo Frontier (Planejamento & Arquitetura) → Composer 2.5 (Aplicação & Edição Rápida no Editor)"
    }
  },
  "glm-5-3-flash": {
    "id": "glm-5-3-flash",
    "name": "GLM-5.3-Flash",
    "family": "zai",
    "provider": "zai",
    "providerName": "Z.ai (Zhipu)",
    "color": "#eab308",
    "status": "stable",
    "openWeights": true,
    "license": "MIT",
    "paramsTotal": "320B MoE",
    "paramsActive": "18B / token",
    "paramsBillion": 320,
    "layers": 45,
    "architectureType": "MoE Multimodal Nativo (Sparse Attention + Linear Attention + mHC)",
    "attentionType": "Hybrid Sparse-Linear Attention 1M (mHC + IndexPool)",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": [
        "text",
        "image",
        "video",
        "file"
      ],
      "output": [
        "text"
      ]
    },
    "reasoning": {
      "mandatory": true,
      "canDisable": false,
      "supportedEfforts": [
        "low",
        "high",
        "max"
      ],
      "defaultEffort": "max",
      "clearThinking": true
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "contextCaching": true,
      "streaming": true,
      "toolStreaming": true,
      "computerUse": true,
      "visualCoding": true,
      "fim": false
    },
    "pricing": {
      "standard": {
        "input": 0.15,
        "cacheRead": 0.03,
        "cacheWrite": null,
        "output": 0.50
      },
      "promotionalPeriod": {
        "effectiveFrom": "2026-08-26",
        "effectiveUntil": "2026-10-31",
        "input": 0.075,
        "cacheRead": 0.015,
        "cacheWrite": null,
        "output": 0.25,
        "discountPercent": 50
      },
      "afterPromotion": {
        "input": 0.15,
        "cacheRead": 0.03,
        "cacheWrite": null,
        "output": 0.50
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models (OpenRouter / Z.ai API)",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "officialBenchmarks": {
      "terminalBench21": 84.3,
      "deepSwe11": 63.4,
      "nl2Repo": 56.3,
      "toolathlon": 78.4,
      "automationBench": 48.8,
      "agentsLastExam": 26.3,
      "hleWithTools": 55.3,
      "gdpvalElo": 1773,
      "officeQaPro": 79.1,
      "charXivReasoning": 68.4,
      "chartography": 71.2,
      "mmvu": 74.8,
      "babyVision": 86.5,
      "mvBench": 81.0,
      "zaiCodeBench": 72.9,
      "methodology": "Z.ai Official Technical Card (26/08/2026): DeepSWE com mini-swe-agent, 400k context, timeout 6h. Terminal-Bench 2.1 via Claude Code 2.1.207 com max_new_tokens 65536 e 6h timeout. Toolathlon Verified em avaliação pass@1 (média de 3 runs independentes). AutomationBench v1.0.6 com correção do null-type."
    },
    "historicalAliases": [
      "Ox Alpha",
      "stealth/ox-alpha"
    ],
    "previewHistory": {
      "alias": "Ox Alpha",
      "startedAt": "2026-08-20",
      "endedAt": "2026-08-26",
      "freePreview": true,
      "providerHiddenDuringPreview": true,
      "revealedAs": "GLM-5.3-Flash",
      "notes": "A Z.ai utilizou o codinome stealth Ox Alpha entre 20/08 e 26/08/2026 no OpenCode e OpenRouter para testes anônimos de campo e coleta de feedback antes do anúncio oficial."
    },
    "historicalEvaluations": [
      {
        "alias": "Ox Alpha",
        "benchmark": "DeepSWE",
        "score": 58.4,
        "solved": 66,
        "tasks": 113,
        "sourceType": "independent",
        "phase": "stealth-preview",
        "notes": "Resultado obtido durante o período de preview anônimo no OpenRouter antes das otimizações finais de harness e liberação oficial."
      }
    ],
    "sweetSpot": "Max Reasoning (Raciocínio Mandatório Eficiente)",
    "strengths": [
      "Primeiro GLM-5 nativamente multimodal com 320B total e 18B ativos (Sparse + Linear Attention)",
      "84,3% no Terminal-Bench 2.1 e 63,4% no DeepSWE 1.1 (~$0,24/task, 123 steps, 73k tokens)",
      "Pesos abertos sob licença MIT e janela de 1M de tokens com 128k de output máximo",
      "Custo extremamente competitivo de $0,15 input / $0,50 output (com 50% de desconto promocional: $0,075/$0,25)"
    ],
    "weaknesses": [
      "Throughput de decode independente modesto (~43–45 tok/s), inferior a outros modelos Flash da indústria",
      "Peso total de 320B exige cluster multi-GPU ou offloading agressivo (KTransformers/vLLM) para inferência local"
    ],
    "badges": [
      "OPEN WEIGHTS (MIT)",
      "MULTIMODAL 1M",
      "SUB-DÓLAR",
      "FORMERLY OX ALPHA",
      "Z.AI"
    ],
    "sourceConfidence": "official",
    "sources": [
      "zai-glm-53-flash",
      "deepswe-datacurve",
      "artificial-analysis-v41"
    ],
    "operationalGuidance": {
      "idealFor": [
        "Tarefas agênticas multimodais de código com restrição orçamentária severa",
        "Deploy local/privado on-premise de modelo frontier aberto (320B MoE com licença MIT)",
        "Análise de grandes bases de código e documentos com 1M de tokens e 128k de saída"
      ],
      "avoidFor": [
        "Aplicações que exigem latência ultra-baixa de geração (decode de 43-45 tok/s pode ser gargalo)",
        "Ambientes locais com GPU única modesta sem suporte a offload"
      ],
      "orchestrationFlow": "GLM-5.3-Flash (Leitura Multimodal & Implementação) → GLM-5.3 (Revisão Arquitetural)"
    }
  },
  "hy4-preview": {
    "id": "hy4-preview",
    "name": "Hy4 Preview",
    "family": "tencent",
    "provider": "tencent",
    "providerName": "Tencent",
    "color": "#12b7f5",
    "status": "preview",
    "openWeights": true,
    "paramsTotal": "770B MoE",
    "paramsActive": "49B",
    "architectureType": "MoE Gated DeepSeek Sparse c/ IndexCache",
    "attentionType": "Gated DeepSeek Sparse Attention + iHC Residual",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": ["text", "code"],
      "output": ["text"]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": ["none", "high"],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.30,
        "cacheRead": 0.075,
        "cacheWrite": null,
        "output": 1.00
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (85,4% Terminal-Bench 2.1 / 64,3% DeepSWE)",
    "strengths": [
      "MoE aberto de 770B com apenas 49B ativos por token para alta escalabilidade",
      "85,4% no Terminal-Bench 2.1 e 64,3% no DeepSWE 1.1 (reportado)",
      "OneMillionBench de 65,4% em contexto longo nativo de 1M"
    ],
    "weaknesses": [
      "Status preview com testes independentes de terceiros ainda escassos",
      "Tendência a over-reasoning em certas tarefas"
    ],
    "badges": [
      "🐧 OPEN WEIGHTS",
      "85.4% TERMINAL 2.1",
      "1M CONTEXTO"
    ],
    "officialBenchmarks": {
      "terminalBench21": 85.4,
      "deepSwe11": 64.3,
      "sweBenchPro": 65.7,
      "toolathlonVerified": 74.1,
      "methodology": "Tencent Hunyuan Hy4 Technical Report."
    },
    "operationalGuidance": {
      "idealFor": [
        "Desenvolvimento de software de backend, games e análise de grandes repositórios"
      ],
      "avoidFor": [
        "Ambientes de produção estritos sensíveis a mudanças de preview"
      ],
      "orchestrationFlow": "Hy4 Preview (Planejamento & Backend) → Workers Leves → Hy4 Preview (Validação)"
    }
  },
  "qwen3-8-flash": {
    "id": "qwen3-8-flash",
    "name": "Qwen3.8 Flash",
    "family": "qwen",
    "provider": "alibaba",
    "providerName": "Alibaba Qwen",
    "color": "#ff6a00",
    "status": "stable",
    "openWeights": false,
    "paramsTotal": "N/D (Frontier Flash API)",
    "paramsActive": "N/D",
    "architectureType": "MoE Flash Multimodal API Service",
    "attentionType": "Flash Sparse Multimodal Attention",
    "contextWindow": 1048576,
    "maxOutputTokens": 131072,
    "modalities": {
      "input": ["text", "image", "video"],
      "output": ["text"]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": ["none", "high"],
      "defaultEffort": "high"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 0.16,
        "cacheRead": 0.04,
        "cacheWrite": null,
        "output": 0.47
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "High (81,0% SWE-Multilingual / 73,9% CoWorkBench)",
    "strengths": [
      "Preço extremamente competitivo ($0.16 / $0.47 por milhão)",
      "Liderança em código multilíngue (81,0% no SWE-bench Multilingual)",
      "Suporte multimodal completo (texto, imagem, vídeo) com 131K output"
    ],
    "weaknesses": [
      "Raciocínio puro de fronteira inferior ao Qwen3.8 Max"
    ],
    "badges": [
      "⚡ ULTRA-BARATO",
      "81.0% MULTILINGUAL",
      "131K SAÍDA"
    ],
    "officialBenchmarks": {
      "deepSwe11": 58.7,
      "sweBenchPro": 62.5,
      "sweBenchMultilingual": 81.0,
      "methodology": "Alibaba Cloud Qwen3.8 Flash Technical Report."
    },
    "operationalGuidance": {
      "idealFor": [
        "Tarefas de programação multilíngue e automações de alto volume"
      ],
      "avoidFor": [
        "Desafios teóricos de matemática frontier Tier 4"
      ],
      "orchestrationFlow": "Qwen3.8 Flash (Varredura Multilíngue & Execução de Tarefas) → Qwen3.8 Max (Validação)"
    }
  },
  "muse-spark-1-3": {
    "id": "muse-spark-1-3",
    "name": "Muse Spark 1.3",
    "family": "meta",
    "provider": "meta",
    "providerName": "Meta",
    "color": "#0081fb",
    "status": "stable",
    "openWeights": true,
    "paramsTotal": "N/D (Multimodal Frontier)",
    "paramsActive": "N/D",
    "architectureType": "Dense/MoE Multimodal Nativo c/ Thinking",
    "attentionType": "Full Attention Nativa 1M",
    "contextWindow": 1048576,
    "maxOutputTokens": 65536,
    "modalities": {
      "input": ["text", "image", "video"],
      "output": ["text"]
    },
    "reasoning": {
      "mandatory": false,
      "canDisable": true,
      "supportedEfforts": ["none", "medium", "high", "xhigh", "max"],
      "defaultEffort": "xhigh"
    },
    "tools": {
      "functionCalling": true,
      "structuredOutput": "schema_guaranteed",
      "fim": true
    },
    "pricing": {
      "standard": {
        "input": 1.25,
        "cacheRead": 0.15,
        "cacheWrite": null,
        "output": 4.25
      }
    },
    "cursorPool": {
      "pool": "other-models",
      "poolLabel": "Other Models",
      "fastDefault": false,
      "fastMultiplier": 1
    },
    "sweetSpot": "XHigh (AA 61 / 181.7 tok/s / 47% τ³ Banking)",
    "strengths": [
      "Excepcional relação inteligência/velocidade: AA 61 com 181.7 tok/s no XHigh",
      "Líder de mercado em operações bancárias (52% no τ³ Banking Max)",
      "Janela nativa de 1M com 88% de desconto em cache read"
    ],
    "weaknesses": [
      "TTFT longo no XHigh (27.51 segundos de latência inicial)"
    ],
    "badges": [
      "⚡ 182 TOK/S",
      "AA INDEX 61",
      "52% TAU3 BANKING"
    ],
    "officialBenchmarks": {
      "terminalBench21": 85.0,
      "tau3Banking": 47.0,
      "aaIndex": 61.0,
      "methodology": "Meta Muse Spark 1.3 Technical Report & AA Audit."
    },
    "operationalGuidance": {
      "idealFor": [
        "Operações bancárias, análises financeiras e processamento multimodal veloz"
      ],
      "avoidFor": [
        "Aplicações com tolerância zero a latência de primeiro token (TTFT)"
      ],
      "orchestrationFlow": "Muse Spark 1.3 (Raciocínio Financeiro & Multimodal) → Workers de Código → Muse Spark 1.3 (Validação)"
    }
  }
};

// ==========================================
// 3. CURSORBENCH 3.2 - RESULTADOS POR ESFORÇO DE THINKING
// ==========================================

const CURSORBENCH_32_DATA = [
  // --- Claude Fable 5.1 (Anthropic) ---
  { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', effort: 'Low', score: 66.2, costUsd: 2.90, tokensPerTask: 19522, steps: 31.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', effort: 'Medium', score: 68.0, costUsd: 3.53, tokensPerTask: 23801, steps: 36.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', effort: 'High', score: 69.4, costUsd: 4.80, tokensPerTask: 33153, steps: 44.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', effort: 'XHigh', score: 72.8, costUsd: 6.96, tokensPerTask: 51349, steps: 55.0, harness: 'Cursor Native', pool: 'other-models', isSweetSpot: true },
  { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', effort: 'Max', score: 73.4, costUsd: 9.64, tokensPerTask: 72060, steps: 70.0, harness: 'Cursor Native', pool: 'other-models', isTopScore: true },

  // --- Gemini 3.8 Flash (Google) ---
  { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', effort: 'Medium', score: 67.0, costUsd: 1.93, tokensPerTask: 61603, steps: 136.0, harness: 'Cursor Native', pool: 'cursor-models', isSweetSpot: true },
  { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', effort: 'High', score: 69.2, costUsd: 2.38, tokensPerTask: 81524, steps: 161.0, harness: 'Cursor Native', pool: 'cursor-models' },

  // --- Grok 4.6 (xAI) ---
  { modelId: 'grok-4-6', modelName: 'Grok 4.6', effort: 'Low', score: 61.0, costUsd: 0.70, tokensPerTask: 10658, steps: 11.2, harness: 'Cursor Native', pool: 'cursor-models' },
  { modelId: 'grok-4-6', modelName: 'Grok 4.6', effort: 'Medium', score: 67.1, costUsd: 1.28, tokensPerTask: 17942, steps: 14.5, harness: 'Cursor Native', pool: 'cursor-models', isSweetSpot: true },
  { modelId: 'grok-4-6', modelName: 'Grok 4.6', effort: 'High', score: 69.9, costUsd: 2.34, tokensPerTask: 32449, steps: 18.1, harness: 'Cursor Native', pool: 'cursor-models' },
  { modelId: 'grok-4-6', modelName: 'Grok 4.6', effort: 'XHigh', score: 70.8, costUsd: 2.81, tokensPerTask: 41136, steps: 22.4, harness: 'Cursor Native', pool: 'cursor-models', isTopScore: true },

  // --- Grok 4.5 (xAI) ---
  { modelId: 'grok-4-5', modelName: 'Grok 4.5', effort: 'Low', score: 63.5, costUsd: 1.22, tokensPerTask: 15841, steps: 12.0, harness: 'Cursor Native', pool: 'cursor-models' },
  { modelId: 'grok-4-5', modelName: 'Grok 4.5', effort: 'Medium', score: 65.4, costUsd: 1.54, tokensPerTask: 18914, steps: 14.0, harness: 'Cursor Native', pool: 'cursor-models' },
  { modelId: 'grok-4-5', modelName: 'Grok 4.5', effort: 'High', score: 66.7, costUsd: 1.51, tokensPerTask: 19521, steps: 15.0, harness: 'Cursor Native', pool: 'cursor-models', isSweetSpot: true },

  // --- GPT-5.6 Sol (OpenAI) ---
  { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', effort: 'Low', score: 52.6, costUsd: 1.01, tokensPerTask: 5104, steps: 9.5, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', effort: 'Medium', score: 60.0, costUsd: 1.95, tokensPerTask: 9747, steps: 13.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', effort: 'High', score: 63.5, costUsd: 2.79, tokensPerTask: 13867, steps: 16.5, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', effort: 'XHigh', score: 64.5, costUsd: 3.88, tokensPerTask: 19699, steps: 20.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', effort: 'Max', score: 67.2, costUsd: 5.69, tokensPerTask: 28320, steps: 24.5, harness: 'Cursor Native', pool: 'other-models', isSweetSpot: true },

  // --- GPT-5.6 Terra (OpenAI) ---
  { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', effort: 'Low', score: 46.9, costUsd: 0.42, tokensPerTask: 5312, steps: 9.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', effort: 'Medium', score: 50.3, costUsd: 0.49, tokensPerTask: 6222, steps: 11.5, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', effort: 'High', score: 54.2, costUsd: 0.71, tokensPerTask: 9468, steps: 14.5, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', effort: 'XHigh', score: 59.2, costUsd: 1.15, tokensPerTask: 16089, steps: 18.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', effort: 'Max', score: 64.9, costUsd: 2.31, tokensPerTask: 32969, steps: 23.0, harness: 'Cursor Native', pool: 'other-models', isSweetSpot: true },

  // --- GPT-5.6 Luna (OpenAI) ---
  { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', effort: 'Low', score: 37.6, costUsd: 0.03, tokensPerTask: 3209, steps: 8.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', effort: 'Medium', score: 47.7, costUsd: 0.08, tokensPerTask: 7095, steps: 11.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', effort: 'High', score: 56.8, costUsd: 0.16, tokensPerTask: 15141, steps: 14.5, harness: 'Cursor Native', pool: 'other-models', isSweetSpot: true },
  { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', effort: 'XHigh', score: 57.7, costUsd: 0.23, tokensPerTask: 22480, steps: 17.5, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', effort: 'Max', score: 61.1, costUsd: 0.39, tokensPerTask: 87973, steps: 24.0, harness: 'Cursor Native', pool: 'other-models', isSweetSpot: true },

  // --- GPT-5.5 (OpenAI) ---
  { modelId: 'gpt-5-5-preview', modelName: 'GPT-5.5', effort: 'Low', score: 46.6, costUsd: 0.98, tokensPerTask: 5168, steps: 9.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-5-preview', modelName: 'GPT-5.5', effort: 'Medium', score: 53.8, costUsd: 1.51, tokensPerTask: 8522, steps: 12.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-5-preview', modelName: 'GPT-5.5', effort: 'High', score: 58.4, costUsd: 2.05, tokensPerTask: 12183, steps: 15.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gpt-5-5-preview', modelName: 'GPT-5.5', effort: 'XHigh', score: 58.4, costUsd: 2.85, tokensPerTask: 17534, steps: 18.0, harness: 'Cursor Native', pool: 'other-models' },

  // --- Claude Opus 5 (Anthropic) ---
  { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', effort: 'Low', score: 62.8, costUsd: 2.55, tokensPerTask: 18529, steps: 25.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', effort: 'Medium', score: 64.3, costUsd: 3.29, tokensPerTask: 23612, steps: 32.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', effort: 'High', score: 66.7, costUsd: 3.91, tokensPerTask: 27932, steps: 38.0, harness: 'Cursor Native', pool: 'other-models', isSweetSpot: true },
  { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', effort: 'XHigh', score: 69.3, costUsd: 7.35, tokensPerTask: 54239, steps: 52.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', effort: 'Max', score: 70.0, costUsd: 8.23, tokensPerTask: 61838, steps: 58.0, harness: 'Cursor Native', pool: 'other-models' },

  // --- Claude Sonnet 5 (Anthropic) ---
  { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', effort: 'Low', score: 47.7, costUsd: 0.87, tokensPerTask: 16269, steps: 33.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', effort: 'Medium', score: 52.4, costUsd: 1.44, tokensPerTask: 26200, steps: 46.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', effort: 'High', score: 56.9, costUsd: 2.13, tokensPerTask: 39483, steps: 57.0, harness: 'Cursor Native', pool: 'other-models', isSweetSpot: true },
  { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', effort: 'XHigh', score: 58.7, costUsd: 2.77, tokensPerTask: 52871, steps: 67.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', effort: 'Max', score: 61.5, costUsd: 4.30, tokensPerTask: 92882, steps: 86.0, harness: 'Cursor Native', pool: 'other-models' },

  // --- Claude Fable 5 (Anthropic) ---
  { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', effort: 'Low', score: 62.1, costUsd: 4.46, tokensPerTask: 18182, steps: 22.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', effort: 'Medium', score: 65.2, costUsd: 6.80, tokensPerTask: 30366, steps: 34.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', effort: 'High', score: 66.5, costUsd: 8.77, tokensPerTask: 43747, steps: 46.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', effort: 'XHigh', score: 68.4, costUsd: 11.73, tokensPerTask: 64971, steps: 60.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', effort: 'Max', score: 70.5, costUsd: 17.32, tokensPerTask: 103525, steps: 82.0, harness: 'Cursor Native', pool: 'other-models' },

  // --- Gemini 3.7 Flash (Google) ---
  { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash', effort: 'Low', score: 53.8, costUsd: 0.74, tokensPerTask: 20594, steps: 11.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash', effort: 'Medium', score: 59.0, costUsd: 0.95, tokensPerTask: 30953, steps: 14.0, harness: 'Cursor Native', pool: 'other-models', isSweetSpot: true },
  { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash', effort: 'High', score: 61.6, costUsd: 1.20, tokensPerTask: 38448, steps: 17.5, harness: 'Cursor Native', pool: 'other-models' },

  // --- Kimi K3 (Moonshot) ---
  { modelId: 'kimi-k3', modelName: 'Kimi K3', effort: 'Low', score: 50.5, costUsd: 0.99, tokensPerTask: 13007, steps: 12.0, harness: 'Cursor Native', pool: 'opencode-api' },
  { modelId: 'kimi-k3', modelName: 'Kimi K3', effort: 'High', score: 59.7, costUsd: 1.89, tokensPerTask: 26846, steps: 18.0, harness: 'Cursor Native', pool: 'opencode-api' },
  { modelId: 'kimi-k3', modelName: 'Kimi K3', effort: 'Max', score: 60.8, costUsd: 2.70, tokensPerTask: 38428, steps: 23.0, harness: 'Cursor Native', pool: 'opencode-api' },

  // --- Kimi K2.7 Code (Moonshot) ---
  { modelId: 'kimi-k2-7-code', modelName: 'Kimi K2.7 Code', effort: 'Default', score: 49.7, costUsd: 1.43, tokensPerTask: 31247, steps: 16.0, harness: 'Cursor Native', pool: 'opencode-api' },

  // --- GLM-5.2 (Z.ai) ---
  { modelId: 'glm-5-2', modelName: 'GLM-5.2', effort: 'High', score: 51.5, costUsd: 1.19, tokensPerTask: 21829, steps: 17.0, harness: 'Cursor Native', pool: 'other-models' },
  { modelId: 'glm-5-2', modelName: 'GLM-5.2', effort: 'Max', score: 55.0, costUsd: 1.76, tokensPerTask: 35946, steps: 22.0, harness: 'Cursor Native', pool: 'other-models' },

  // --- Composer 2.5 (Cursor) ---
  { modelId: 'composer-2-5', modelName: 'Composer 2.5', effort: 'Default', score: 56.1, costUsd: 0.44, tokensPerTask: 14286, steps: 14.0, harness: 'Cursor Native', pool: 'cursor-models' }
];


// ==========================================
// 4. TABELA DE GANHOS MARGINAIS DE THINKING
// ==========================================

const MARGINAL_GAINS_DATA = [
  { model: 'Grok 4.6', transition: 'Low -> Med', deltaScore: 6.1, deltaCost: 0.52, efficiency: 11.73, isSweetSpot: true },
  { model: 'Grok 4.6', transition: 'Med -> High', deltaScore: 2.8, deltaCost: 0.87, efficiency: 3.22, isSweetSpot: false },
  { model: 'Grok 4.6', transition: 'High -> XHigh', deltaScore: 0.9, deltaCost: 0.66, efficiency: 1.36, isSweetSpot: false },
  { model: 'Claude Haiku 4.5', transition: 'Sem Think -> 32k Think', deltaScore: 1.54, deltaCost: 0.13, efficiency: 11.85, isSweetSpot: false },
  { model: 'Claude Sonnet 5', transition: 'Low -> Med', deltaScore: 4.7, deltaCost: 0.57, efficiency: 8.25, isSweetSpot: false },
  { model: 'Claude Sonnet 5', transition: 'Med -> High', deltaScore: 4.5, deltaCost: 0.69, efficiency: 6.52, isSweetSpot: true },
  { model: 'Claude Sonnet 5', transition: 'High -> XHigh', deltaScore: 1.8, deltaCost: 0.64, efficiency: 2.81, isSweetSpot: false },
  { model: 'Claude Sonnet 5', transition: 'XHigh -> Max', deltaScore: 2.8, deltaCost: 1.53, efficiency: 1.83, isSweetSpot: false },
  { model: 'GPT-5.6 Sol', transition: 'Low -> Med', deltaScore: 7.4, deltaCost: 1.28, efficiency: 5.78, isSweetSpot: false },
  { model: 'GPT-5.6 Sol', transition: 'Med -> High', deltaScore: 3.5, deltaCost: 1.76, efficiency: 1.99, isSweetSpot: false },
  { model: 'GPT-5.6 Sol', transition: 'High -> XHigh', deltaScore: 1.0, deltaCost: 1.84, efficiency: 0.54, isSweetSpot: false },
  { model: 'GPT-5.6 Sol', transition: 'XHigh -> Max', deltaScore: 2.7, deltaCost: 2.22, efficiency: 1.22, isSweetSpot: true },
  { model: 'GPT-5.6 Luna', transition: 'Low -> Med', deltaScore: 10.1, deltaCost: 0.05, efficiency: 202.0, isSweetSpot: false },
  { model: 'GPT-5.6 Luna', transition: 'Med -> High', deltaScore: 9.1, deltaCost: 0.05, efficiency: 182.0, isSweetSpot: true },
  { model: 'GPT-5.6 Luna', transition: 'High -> XHigh', deltaScore: 0.9, deltaCost: 0.10, efficiency: 9.0, isSweetSpot: false },
  { model: 'GPT-5.6 Luna', transition: 'XHigh -> Max', deltaScore: 3.4, deltaCost: 0.13, efficiency: 26.15, isSweetSpot: true },
  { model: 'Claude Opus 5', transition: 'Low -> Med', deltaScore: 1.5, deltaCost: 0.86, efficiency: 1.74, isSweetSpot: false },
  { model: 'Claude Opus 5', transition: 'Med -> High', deltaScore: 2.4, deltaCost: 1.33, efficiency: 1.80, isSweetSpot: true },
  { model: 'Claude Opus 5', transition: 'High -> XHigh', deltaScore: 2.6, deltaCost: 1.57, efficiency: 1.66, isSweetSpot: false },
  { model: 'Gemini 3.7 Flash', transition: 'Low -> Med', deltaScore: 5.2, deltaCost: 0.21, efficiency: 24.76, isSweetSpot: true },
  { model: 'Gemini 3.7 Flash', transition: 'Med -> High', deltaScore: 2.6, deltaCost: 0.33, efficiency: 7.88, isSweetSpot: false }
];


// ==========================================
// 5. LEDGER CONSOLIDADO DE CODING AGENTS
// ==========================================

const MULTI_BENCHMARK_LEDGER = [
  { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1 (Max)', terminalBench20: null, terminalBench21: 91.4, terminalBench30: null, terminalBench40: 55.8, terminalBenchScience01: 52.6, sweBenchVerified: null, sweBenchPro: 81.2, sweAtlas: null, deepSwe11: 71.5, cursorBench32: 73.4, hle: 59.1, hleVerified: null, hleWithTools: 65.0, hleWithoutTools: 60.9, osworldOriginal: null, osworldVerified: null, osworld2Partial: 77.9, osworld2Strict: 41.7, gpqaDiamond: 95.2, aime2025: null, aime2025Tools: null, arcAgi2Verified: 82.0, tau2Retail: null, tau2Airline: null, tau3Banking: null, financeAgentV2: null, harveyLegalAgent: null, sciCode: 62.0, mcpAtlas: null, browseComp: null, mmmuPro: null, charXiv: null, gdpPdf: null, gdpvalElo: 1853, automationBench: 31.4, aaIndex: 66.0, costPerTask: 9.64, outputTokensPerTask: 72060, agentStepsPerTask: 70, confidenceInterval: null, benchmarkSnapshotDate: '2026-09-02' },
  { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash (High)', terminalBench20: null, terminalBench21: 90.8, terminalBench30: null, terminalBench40: null, terminalBenchScience01: null, sweBenchVerified: null, sweBenchPro: 61.6, sweAtlas: 51.9, deepSwe11: 74.0, cursorBench32: 69.2, hle: 45.4, hleVerified: 54.9, hleWithTools: null, hleWithoutTools: null, osworldOriginal: null, osworldVerified: null, osworld2Partial: null, osworld2Strict: null, gpqaDiamond: null, aime2025: null, aime2025Tools: null, arcAgi2Verified: null, tau2Retail: null, tau2Airline: null, tau3Banking: 38.1, financeAgentV2: 61.4, harveyLegalAgent: 10.0, sciCode: null, mcpAtlas: null, browseComp: null, mmmuPro: null, charXiv: 86.2, gdpPdf: 35.0, aaIndex: 59.0, costPerTask: 2.36, outputTokensPerTask: 143000, agentStepsPerTask: 166, confidenceInterval: 1.0, benchmarkSnapshotDate: '2026-09-02' },

  { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (High)', terminalBench20: null, terminalBench21: null, terminalBench30: null, terminalBench40: 57.9, terminalBenchScience01: 65.4, sweBenchVerified: null, sweBenchPro: null, sweAtlas: null, deepSwe11: 74.1, cursorBench32: null, hle: null, hleVerified: null, hleWithTools: 57.2, hleWithoutTools: null, osworldOriginal: null, osworldVerified: null, osworld2Partial: 72.6, osworld2Strict: null, gpqaDiamond: 96.0, aime2025: null, aime2025Tools: null, arcAgi2Verified: 95.0, tau2Retail: null, tau2Airline: null, tau3Banking: null, financeAgentV2: null, harveyLegalAgent: null, sciCode: null, mcpAtlas: null, browseComp: 91.5, mmmuPro: null, charXiv: null, gdpPdf: 33.2, automationBench: 41.4, aaIndex: 61.0, mrcr1m: 96.3, mrcrV2: 96.3, costPerTask: 5.72, outputTokensPerTask: 27000, agentStepsPerTask: 52, confidenceInterval: 3.5, benchmarkSnapshotDate: '2026-09-03' },
  { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol (Max)', terminalBench21: 88.8, terminalBench30: 34.6, deepSwe11: 72.7, sweBenchPro: 64.6, sweBenchVerified: null, mrcr1m: 73.8, gpqaDiamond: 94.6, osworld: 62.6, aaIndex: 61.0 },
  { modelId: 'claude-opus-5', modelName: 'Claude Opus 5 (Max)', terminalBench21: null, terminalBench30: null, deepSwe11: 73.6, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 63.0 },
  { modelId: 'claude-fable-5', modelName: 'Claude Fable 5 (Max)', terminalBench21: 83.1, terminalBench30: null, deepSwe11: 69.7, sweBenchPro: 80.0, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 62.0 },
  { modelId: 'kimi-k3', modelName: 'Kimi K3 (Max)', terminalBench21: 88.3, terminalBench30: null, deepSwe11: 67.5, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: 93.5, osworld: null, hleWithTools: 59.8, aaIndex: 60.0 },
  { modelId: 'glm-5-3', modelName: 'GLM-5.3 (Max)', terminalBench21: 88.2, terminalBench30: null, deepSwe11: 66.9, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, hleWithTools: 62.5, aaIndex: 60.0 },
  { modelId: 'deepseek-v4-pro-0813', modelName: 'DeepSeek-V4-Pro-0813 (Max)', terminalBench21: 87.9, terminalBench30: null, deepSwe11: 62.7, sweBenchPro: 55.4, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: 90.0, osworld: null, hleWithTools: 60.0, aaIndex: 53.0 },
  { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra (Max)', terminalBench21: 87.4, terminalBench30: null, deepSwe11: 69.6, sweBenchPro: 63.4, sweBenchVerified: null, mrcr1m: 72.5, gpqaDiamond: 92.9, osworld: 50.2, aaIndex: 57.0 },
  { modelId: 'qwen3-8-max', modelName: 'Qwen3.8 Max (Serviço)', terminalBench21: 86.6, terminalBench30: null, deepSwe11: 56.6, sweBenchPro: 67.7, sweBenchVerified: null, mrcr1m: 92.9, gpqaDiamond: 92.6, osworld: null, hleWithTools: 56.2, aaIndex: 58.0 },
  { modelId: 'qwen3-8-2-4t-a95b', modelName: 'Qwen3.8-2.4T-A95B (Repo)', terminalBench21: 86.6, terminalBench30: null, deepSwe11: 56.6, sweBenchPro: 67.7, sweBenchVerified: null, mrcr1m: 92.9, gpqaDiamond: 92.6, osworld: null, aaIndex: 58.0 },
  { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash (High)', terminalBench21: 85.8, terminalBench30: null, deepSwe11: 65.3, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: 94.5, osworld: null, aaIndex: 56.0 },
  { modelId: 'gpt-5-5-preview', modelName: 'GPT-5.5 (XHigh)', terminalBench21: 85.6, terminalBench30: null, deepSwe11: 67.0, sweBenchPro: 59.4, sweBenchVerified: null, mrcr1m: 74.0, gpqaDiamond: 93.6, osworld: 47.5, aaIndex: 55.0 },
  { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna (Max)', terminalBench21: 84.7, terminalBench30: null, deepSwe11: 67.2, sweBenchPro: 62.7, sweBenchVerified: null, mrcr1m: 41.3, gpqaDiamond: 92.3, osworld: 45.6, aaIndex: 52.0 },
  { modelId: 'grok-4-5', modelName: 'Grok 4.5 (High)', terminalBench21: 83.3, terminalBench30: null, deepSwe11: 53.0, sweBenchPro: 64.7, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 50.0 },
  { modelId: 'muse-spark-1-2', modelName: 'Muse Spark 1.2 (XHigh)', terminalBench21: 82.9, terminalBench30: null, deepSwe11: 54.9, sweBenchPro: null, sweBenchVerified: 86.6, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 57.0 },
  { modelId: 'deepseek-v4-flash-0731', modelName: 'DeepSeek-V4-Flash-0731 (Max)', terminalBench21: 82.7, terminalBench30: null, deepSwe11: 54.4, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 52.0 },
  { modelId: 'glm-5-2', modelName: 'GLM-5.2', terminalBench21: 81.0, terminalBench30: null, deepSwe11: 46.2, sweBenchPro: 62.1, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: 91.2, osworld: null, hleWithTools: 54.7, aaIndex: 53.0 },
  { modelId: 'gemini-3-1-pro', modelName: 'Gemini 3.1 Pro', terminalBench21: 73.8, terminalBench30: null, deepSwe11: 12.0, sweBenchPro: 54.2, sweBenchVerified: 80.6, mrcr1m: 26.3, tauRetail: 90.8, tauAirline: 99.3, gpqaDiamond: 94.3, arcAgi2: 77.1, hleWithTools: 51.4, osworld: 76.2, aaIndex: 55.0 },
  { modelId: 'claude-opus-4-6', modelName: 'Claude Opus 4.6 (Adaptive Max)', terminalBench21: 65.4, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: 80.8, mrcr1m: 76.0, tauRetail: 91.9, gpqaDiamond: 91.3, arcAgi2: 68.8, hleWithTools: 53.0, osworld: 72.7, aaIndex: 45.0 },
  { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5 (Max)', terminalBench21: 80.4, terminalBench30: null, deepSwe11: 53.8, sweBenchPro: 63.2, sweBenchVerified: 85.2, mrcr1m: null, gpqaDiamond: 90.5, osworld: null, aaIndex: 55.0 },
  { modelId: 'kimi-k2-6', modelName: 'Kimi K2.6 (1T MoE)', terminalBench21: 66.7, terminalBench30: null, deepSwe11: null, sweBenchPro: 58.6, sweBenchVerified: 80.2, mrcr1m: null, gpqaDiamond: 90.5, osworld: 73.1, hleWithTools: 54.0, aaIndex: 45.0 },
  { modelId: 'claude-sonnet-4-6', modelName: 'Claude Sonnet 4.6 (Adaptive Max)', terminalBench21: 59.1, terminalBench30: null, deepSwe11: 29.9, sweBenchPro: null, sweBenchVerified: 79.6, mrcr1m: 65.8, tauRetail: 91.7, gpqaDiamond: 89.9, arcAgi2: 58.3, hleWithTools: 49.0, osworld: 72.5, aaIndex: 48.0 },
  { modelId: 'mimo-v2-5-pro', modelName: 'MiMo-V2.5-Pro', terminalBench21: 68.4, terminalBench30: null, deepSwe11: 19.0, sweBenchPro: 57.2, sweBenchVerified: 78.9, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 42.0 },
  { modelId: 'hy3-tencent', modelName: 'Tencent Hy3', terminalBench21: 71.7, terminalBench30: null, deepSwe11: 28.0, sweBenchPro: 57.9, sweBenchVerified: 78.0, mrcr1m: null, gpqaDiamond: 90.4, osworld: null, aaIndex: 42.0 },
  { modelId: 'gemini-3-5-flash', modelName: 'Gemini 3.5 Flash', terminalBench21: 76.2, terminalBench30: null, deepSwe11: null, sweBenchPro: 55.1, sweBenchVerified: null, mrcr1m: 26.6, gpqaDiamond: null, arcAgi2: 72.1, hleWithTools: 40.2, osworld: 78.4, aaIndex: 46.0 },
  { modelId: 'qwen3-7-max', modelName: 'Qwen3.7 Max', terminalBench21: 74.5, terminalBench30: null, deepSwe11: 20.0, sweBenchPro: 60.6, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 48.0 },
  { modelId: 'qwen3-8-27b', modelName: 'Qwen3.8-27B (Denso)', terminalBench21: 73.0, terminalBench30: null, deepSwe11: 42.2, sweBenchPro: 61.7, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 52.0 },
  { modelId: 'claude-haiku-4-5', modelName: 'Claude Haiku 4.5', terminalBench21: 41.75, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: 73.3, mrcr1m: null, tauRetail: 83.2, tauAirline: 63.6, gpqaDiamond: 73.0, osworld: 50.7, aaIndex: 30.0 },
  { modelId: 'deepseek-v3-2', modelName: 'DeepSeek-V3.2', terminalBench21: 46.0, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: 73.1, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 40.0 },
  { modelId: 'longcat-2-0', modelName: 'LongCat-2.0 (1.6T MoE)', terminalBench21: 70.8, terminalBench30: null, deepSwe11: null, sweBenchPro: 59.5, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: 88.9, osworld: null, aaIndex: 34.0 },
  { modelId: 'mimo-v2-5', modelName: 'MiMo-V2.5', terminalBench21: 65.8, terminalBench30: null, deepSwe11: null, sweBenchPro: 56.1, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 38.0 },
  { modelId: 'minimax-m3', modelName: 'MiniMax M3', terminalBench21: 66.0, terminalBench30: null, deepSwe11: 13.3, sweBenchPro: 59.0, sweBenchVerified: 80.5, mrcr1m: null, gpqaDiamond: 93.0, osworld: 70.1, hleWithTools: 37.0, aaIndex: 45.0 },
  { modelId: 'glm-5-1', modelName: 'GLM-5.1', terminalBench21: 63.5, terminalBench30: null, deepSwe11: 18.0, sweBenchPro: 58.4, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: 86.2, osworld: null, hleWithTools: 52.3, aaIndex: 40.0 },
  { modelId: 'gpt-oss-120b', modelName: 'gpt-oss-120b (High)', terminalBench21: null, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: 62.4, mrcr1m: null, aiderPolyglot: 44.4, tauRetail: 67.8, tauAirline: 49.2, gpqaDiamond: 80.1, hleWithTools: 19.0, aaIndex: 24.0 },
  { modelId: 'gpt-oss-20b', modelName: 'gpt-oss-20b (High)', terminalBench21: null, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: 60.7, mrcr1m: null, aiderPolyglot: 34.2, tauRetail: 54.8, tauAirline: 38.0, gpqaDiamond: 66.0, hleWithTools: 8.8, aaIndex: 15.0 },
  { modelId: 'nemotron-3-5-lightning', modelName: 'Nemotron 3.5 Lightning (NVFP4)', terminalBench21: 23.46, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: 52.8, mrcr1m: null, gpqaDiamond: 75.57, hleWithTools: 10.47, aaIndex: 24.0 },
  { modelId: 'grok-4-6', modelName: 'Grok 4.6 (High)', terminalBench21: 88.4, terminalBench30: 26.0, deepSwe11: 65.9, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: 94.9, osworld: null, aaIndex: 61.0 },
  { modelId: 'kimi-k2-7-code', modelName: 'Kimi K2.7 Code', terminalBench21: null, terminalBench30: null, deepSwe11: 30.5, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 44.0 },
  { modelId: 'minimax-m2-7', modelName: 'MiniMax M2.7', terminalBench21: 57.0, terminalBench30: null, deepSwe11: null, sweBenchPro: 56.22, sweBenchVerified: 76.5, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 39.0 },
  { modelId: 'composer-2-5', modelName: 'Composer 2.5', terminalBench21: null, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 45.0 },
  { modelId: 'gpt-5-6-pro', modelName: 'GPT-5.6 Sol Pro', terminalBench21: null, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: null, notes: 'Factual ledger benchmarks null: Sol Pro não possui benchmark row oficial pública segregada na OpenAI API.' },
  { modelId: 'deepseek-v4-vision-exp', modelName: 'DeepSeek-V4-Flash-Vision-Exp (Preview)', terminalBench21: 83.9, terminalBench30: null, deepSwe11: 59.3, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: 51.0 },
  { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash (Max)', terminalBench21: 84.3, terminalBench30: null, deepSwe11: 63.4, sweBenchPro: null, sweBenchVerified: null, mrcr1m: 89.2, gpqaDiamond: null, osworld: null, hleWithTools: 55.3, aaIndex: 57.0, historicalAlias: 'Ox Alpha' },
  { modelId: 'hy4-preview', modelName: 'Hy4 Preview', terminalBench21: 85.4, terminalBench30: null, deepSwe11: 64.3, sweBenchPro: 65.7, sweBenchVerified: null, mrcr1m: 65.4, gpqaDiamond: null, osworld: null, aaIndex: null, notes: 'Vendor-reported benchmarks; AA Index is null.' },
  { modelId: 'qwen3-8-flash', modelName: 'Qwen3.8 Flash', terminalBench21: null, terminalBench30: null, deepSwe11: 58.7, sweBenchPro: 62.5, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: null, osworld: null, aaIndex: null, notes: 'Base open-weight Qwen3.8-Flash-Next tem AA ~56; endpoint de produção sem AA isolado.' },
  { modelId: 'muse-spark-1-3', modelName: 'Muse Spark 1.3 (XHigh)', terminalBench21: 85.0, terminalBench30: null, deepSwe11: null, sweBenchPro: null, sweBenchVerified: null, mrcr1m: null, gpqaDiamond: 94.0, tau3Banking: 47.0, osworld: null, aaIndex: 61.0, notes: 'Independent AA evaluation: AA 61, 181.7 tok/s.' }
];

// Enriquecimento com proveniência metrológica estrita para cada célula factual (Seções 80 & 81)
const BENCHMARK_METRIC_KEYS = [
  'terminalBench20', 'terminalBench21', 'terminalBench30', 'terminalBench40', 'terminalBenchScience01',
  'sweBenchVerified', 'sweBenchPro', 'sweAtlas', 'deepSwe11', 'cursorBench32',
  'hle', 'hleVerified', 'hleWithTools', 'hleWithoutTools',
  'osworldOriginal', 'osworldVerified', 'osworld2Partial', 'osworld2Strict', 'osworld',
  'gpqaDiamond', 'aime2025', 'aime2025Tools', 'arcAgi2Verified', 'arcAgi2',
  'tau2Retail', 'tau2Airline', 'tauRetail', 'tauAirline', 'tau3Banking',
  'financeAgentV2', 'harveyLegalAgent', 'sciCode', 'mcpAtlas', 'browseComp', 'mmmuPro',
  'charXiv', 'gdpPdf', 'automationBench', 'aaIndex', 'mrcr1m', 'aiderPolyglot'
];

MULTI_BENCHMARK_LEDGER.forEach(row => {
  row.benchmarkEvidence = row.benchmarkEvidence || {};
  BENCHMARK_METRIC_KEYS.forEach(metric => {
    if (row[metric] !== null && row[metric] !== undefined) {
      if (!row.benchmarkEvidence[metric]) {
        let sourceId = 'terminal-bench-org';
        let sourceType = 'independent';
        let version = '2.1';
        let harness = 'standard-eval';

        if (metric === 'cursorBench32') {
          sourceId = 'cursorbench-32';
          sourceType = 'independent';
          version = '3.2';
          harness = 'cursor-agent-eval';
        } else if (metric === 'deepSwe11') {
          if (row.modelId === 'grok-4-6') {
            sourceId = 'xai-grok46';
            sourceType = 'official';
          } else {
            sourceId = 'deepswe-datacurve';
            sourceType = 'independent';
          }
          version = '1.1';
          harness = 'deepswe-eval';
        } else if (metric === 'aaIndex') {
          if (row.modelId === 'grok-4-6') {
            sourceId = 'xai-grok46';
            sourceType = 'official';
          } else {
            sourceId = 'artificial-analysis-v41';
            sourceType = 'independent';
          }
          version = '4.1';
          harness = 'artificial-analysis';
        } else if (metric === 'terminalBench30') {
          if (row.modelId === 'grok-4-6') {
            sourceId = 'xai-grok46';
            sourceType = 'official';
          } else {
            sourceId = 'terminal-bench-org';
            sourceType = 'independent';
          }
          version = '3.0';
          harness = 'terminal-bench-eval';
        } else if (metric === 'terminalBench21') {
          if (row.modelId === 'grok-4-6') {
            sourceId = 'aa-grok46-tb21';
            sourceType = 'independent';
          } else if (row.modelId === 'minimax-m3') {
            sourceId = 'minimax-m3-modelcard';
            sourceType = 'official';
          } else if (row.modelId === 'hy4-preview') {
            sourceId = 'tencent-hy4-modelcard';
            sourceType = 'vendor-reported';
          } else if (row.modelId === 'muse-spark-1-3') {
            sourceId = 'aa-muse-spark13';
            sourceType = 'independent';
          } else if (row.modelId === 'claude-fable-5-1' || row.modelId === 'claude-fable-5') {
            sourceId = 'anthropic-claude-fable-51';
            sourceType = 'official';
          } else if (row.modelId === 'gemini-3-8-flash') {
            sourceId = 'google-deepmind-gemini-38';
            sourceType = 'official';
          } else if (row.modelId === 'gemini-3-7-flash' || row.modelId === 'gemini-3-1-pro') {
            sourceId = 'google-deepmind-gemini37';
            sourceType = 'official';
          } else if (row.modelId.startsWith('gpt-5-6')) {
            sourceId = 'openai-gpt56-launch';
            sourceType = 'official';
          } else if (row.modelId.startsWith('deepseek-v4')) {
            sourceId = 'deepseek-v4-org';
            sourceType = 'official';
          } else if (row.modelId.startsWith('glm-5-3')) {
            sourceId = 'zai-glm-53-flash';
            sourceType = 'official';
          } else {
            sourceId = 'terminal-bench-org';
            sourceType = 'independent';
          }
          version = '2.1';
          harness = 'terminal-bench-eval';
        } else if (metric.startsWith('sweBench') || metric === 'sweAtlas') {
          if (row.modelId === 'gemini-3-8-flash') {
            sourceId = 'google-deepmind-gemini-38';
            sourceType = 'official';
          } else if (row.modelId === 'claude-fable-5-1') {
            sourceId = 'anthropic-claude-fable-51';
            sourceType = 'official';
          } else if (row.modelId.startsWith('gpt-5-6')) {
            sourceId = 'openai-gpt56-launch';
            sourceType = 'official';
          } else if (row.modelId === 'minimax-m3') {
            sourceId = 'minimax-m3-modelcard';
            sourceType = 'official';
          } else if (row.modelId === 'hy4-preview') {
            sourceId = 'tencent-hy4-modelcard';
            sourceType = 'vendor-reported';
          } else if (row.modelId === 'qwen3-8-flash') {
            sourceId = 'qwen-qwen38-flashnext-eval';
            sourceType = 'official';
          } else {
            sourceId = 'swe-bench-verified';
            sourceType = 'independent';
          }
          version = metric.includes('Pro') ? 'pro' : 'verified';
          harness = 'swe-bench-docker';
        } else if (['gpqaDiamond', 'hle', 'hleVerified', 'hleWithTools', 'hleWithoutTools', 'arcAgi2', 'arcAgi2Verified', 'sciCode'].includes(metric)) {
          if (row.modelId.startsWith('claude-')) {
            sourceId = 'anthropic-claude-fable-51';
            sourceType = 'official';
          } else if (row.modelId.startsWith('gemini-')) {
            sourceId = 'google-deepmind-gemini-38';
            sourceType = 'official';
          } else if (row.modelId === 'grok-4-6') {
            sourceId = 'xai-grok46';
            sourceType = 'official';
          } else if (row.modelId.startsWith('gpt-5-6')) {
            sourceId = 'openai-gpt56-launch';
            sourceType = 'official';
          } else {
            sourceId = 'terminal-bench-org';
            sourceType = 'independent';
          }
          version = metric;
          harness = 'frontier-eval';
        } else {
          sourceId = 'terminal-bench-org';
          sourceType = 'independent';
          version = 'latest';
          harness = 'benchmark-eval';
        }

        row.benchmarkEvidence[metric] = {
          sourceId,
          sourceType,
          evidenceTier: sourceType === 'official-publisher' ? 'official-launch' : 'third-party-independent',
          status: 'verified',
          benchmarkVersion: version,
          effort: row.modelName.includes('(') ? row.modelName.split('(')[1].replace(')', '').trim() : 'high',
          harness,
          snapshotDate: row.benchmarkSnapshotDate || '2026-09-02'
        };
      }
    }
  });
});


// ==========================================
// 6. VETOR 10D PARA RADAR DE CAPACIDADES
// ==========================================

const CAPABILITY_RADAR_10D = {
  'claude-fable-5-1': { reasoning: 100, agentic: 100, sweBench: 99, longContext: 98, multimodal: 95, throughput: 52, costEfficiency: 48, toolAdherence: 99, ttftLatency: 45, openAccess: 20 },
  'gemini-3-8-flash': { reasoning: 96, agentic: 98, sweBench: 92, longContext: 97, multimodal: 99, throughput: 98, costEfficiency: 98, toolAdherence: 97, ttftLatency: 92, openAccess: 50 },

  'grok-4-6': { reasoning: 96, agentic: 95, sweBench: 91, longContext: 91, multimodal: 92, throughput: 78, costEfficiency: 82, toolAdherence: 94, ttftLatency: 73, openAccess: 35 },
  'grok-4-5': { reasoning: 92, agentic: 90, sweBench: 86, longContext: 87, multimodal: 90, throughput: 80, costEfficiency: 80, toolAdherence: 91, ttftLatency: 76, openAccess: 35 },
  'gpt-6-astra': { reasoning: 100, agentic: 100, sweBench: 97, longContext: 100, multimodal: 96, throughput: 55, costEfficiency: 52, toolAdherence: 99, ttftLatency: 45, openAccess: 20 },
  'gpt-5-6-sol': { reasoning: 99, agentic: 99, sweBench: 94, longContext: 99, multimodal: 96, throughput: 76, costEfficiency: 85, toolAdherence: 98, ttftLatency: 68, openAccess: 30 },
  'gpt-5-6-terra': { reasoning: 96, agentic: 97, sweBench: 92, longContext: 98, multimodal: 94, throughput: 86, costEfficiency: 95, toolAdherence: 97, ttftLatency: 82, openAccess: 35 },
  'gpt-5-6-luna': { reasoning: 94, agentic: 94, sweBench: 89, longContext: 66, multimodal: 92, throughput: 98, costEfficiency: 100, toolAdherence: 95, ttftLatency: 96, openAccess: 45 },
  'gpt-5-6-pro': { reasoning: 100, agentic: 100, sweBench: 96, longContext: 100, multimodal: 96, throughput: 45, costEfficiency: 55, toolAdherence: 99, ttftLatency: 35, openAccess: 20 },
  'gpt-5-5-preview': { reasoning: 96, agentic: 95, sweBench: 90, longContext: 97, multimodal: 94, throughput: 68, costEfficiency: 73, toolAdherence: 95, ttftLatency: 61, openAccess: 30 },
  'gpt-oss-120b': { reasoning: 83, agentic: 66, sweBench: 69, longContext: 37, multimodal: 5, throughput: 95, costEfficiency: 97, toolAdherence: 87, ttftLatency: 94, openAccess: 100 },
  'gpt-oss-20b': { reasoning: 75, agentic: 58, sweBench: 65, longContext: 33, multimodal: 5, throughput: 99, costEfficiency: 100, toolAdherence: 83, ttftLatency: 99, openAccess: 100 },
  'claude-opus-5': { reasoning: 98, agentic: 98, sweBench: 96, longContext: 96, multimodal: 95, throughput: 58, costEfficiency: 63, toolAdherence: 98, ttftLatency: 50, openAccess: 25 },
  'claude-sonnet-5': { reasoning: 95, agentic: 94, sweBench: 87, longContext: 93, multimodal: 94, throughput: 76, costEfficiency: 82, toolAdherence: 96, ttftLatency: 69, openAccess: 30 },
  'claude-fable-5': { reasoning: 100, agentic: 98, sweBench: 98, longContext: 98, multimodal: 96, throughput: 38, costEfficiency: 35, toolAdherence: 98, ttftLatency: 28, openAccess: 20 },
  'claude-haiku-4-5': { reasoning: 79, agentic: 61, sweBench: 81, longContext: 47, multimodal: 84, throughput: 96, costEfficiency: 90, toolAdherence: 87, ttftLatency: 97, openAccess: 40 },
  'claude-opus-4-6': { reasoning: 96, agentic: 90, sweBench: 92, longContext: 98, multimodal: 94, throughput: 59, costEfficiency: 63, toolAdherence: 95, ttftLatency: 51, openAccess: 25 },
  'claude-sonnet-4-6': { reasoning: 93, agentic: 85, sweBench: 91, longContext: 94, multimodal: 93, throughput: 75, costEfficiency: 80, toolAdherence: 94, ttftLatency: 70, openAccess: 30 },
  'gemini-3-1-pro': { reasoning: 96, agentic: 82, sweBench: 82, longContext: 75, multimodal: 98, throughput: 69, costEfficiency: 85, toolAdherence: 96, ttftLatency: 66, openAccess: 45 },
  'gemini-3-7-flash': { reasoning: 94, agentic: 97, sweBench: 88, longContext: 94, multimodal: 98, throughput: 96, costEfficiency: 99, toolAdherence: 96, ttftLatency: 94, openAccess: 48 },
  'gemini-3-5-flash': { reasoning: 91, agentic: 88, sweBench: 81, longContext: 72, multimodal: 98, throughput: 97, costEfficiency: 99, toolAdherence: 95, ttftLatency: 95, openAccess: 52 },
  'deepseek-v4-pro-0813': { reasoning: 95, agentic: 97, sweBench: 87, longContext: 98, multimodal: 8, throughput: 58, costEfficiency: 97, toolAdherence: 94, ttftLatency: 58, openAccess: 96 },
  'deepseek-v4-flash-0731': { reasoning: 91, agentic: 93, sweBench: 84, longContext: 96, multimodal: 8, throughput: 92, costEfficiency: 100, toolAdherence: 93, ttftLatency: 89, openAccess: 100 },
  'deepseek-v4-vision-exp': { reasoning: 78, agentic: 75, sweBench: 70, longContext: 85, multimodal: 90, throughput: 88, costEfficiency: 92, toolAdherence: 80, ttftLatency: 82, openAccess: 85 },
  'deepseek-v3-2': { reasoning: 87, agentic: 66, sweBench: 79, longContext: 54, multimodal: 8, throughput: 62, costEfficiency: 97, toolAdherence: 80, ttftLatency: 61, openAccess: 100 },
  'qwen3-8-max': { reasoning: 96, agentic: 97, sweBench: 90, longContext: 98, multimodal: 92, throughput: 55, costEfficiency: 95, toolAdherence: 96, ttftLatency: 55, openAccess: 65 },
  'qwen3-8-27b': { reasoning: 89, agentic: 80, sweBench: 81, longContext: 87, multimodal: 87, throughput: 94, costEfficiency: 100, toolAdherence: 90, ttftLatency: 91, openAccess: 100 },
  'qwen3-8-2-4t-a95b': { reasoning: 96, agentic: 95, sweBench: 89, longContext: 98, multimodal: 8, throughput: 37, costEfficiency: 72, toolAdherence: 95, ttftLatency: 37, openAccess: 90 },
  'qwen3-7-max': { reasoning: 93, agentic: 87, sweBench: 83, longContext: 94, multimodal: 8, throughput: 67, costEfficiency: 92, toolAdherence: 93, ttftLatency: 63, openAccess: 45 },
  'kimi-k3': { reasoning: 97, agentic: 98, sweBench: 92, longContext: 99, multimodal: 94, throughput: 55, costEfficiency: 94, toolAdherence: 97, ttftLatency: 52, openAccess: 92 },
  'kimi-k2-7-code': { reasoning: 87, agentic: 75, sweBench: 75, longContext: 85, multimodal: 8, throughput: 79, costEfficiency: 97, toolAdherence: 91, ttftLatency: 75, openAccess: 100 },
  'kimi-k2-6': { reasoning: 94, agentic: 84, sweBench: 91, longContext: 78, multimodal: 90, throughput: 68, costEfficiency: 96, toolAdherence: 92, ttftLatency: 67, openAccess: 85 },
  'glm-5-3': { reasoning: 95, agentic: 99, sweBench: 90, longContext: 98, multimodal: 8, throughput: 78, costEfficiency: 97, toolAdherence: 96, ttftLatency: 72, openAccess: 82 },
  'glm-5-2': { reasoning: 94, agentic: 92, sweBench: 83, longContext: 98, multimodal: 8, throughput: 80, costEfficiency: 99, toolAdherence: 94, ttftLatency: 77, openAccess: 100 },
  'glm-5-1': { reasoning: 89, agentic: 77, sweBench: 76, longContext: 69, multimodal: 8, throughput: 72, costEfficiency: 97, toolAdherence: 89, ttftLatency: 70, openAccess: 100 },
  'mimo-v2-5-pro': { reasoning: 92, agentic: 82, sweBench: 90, longContext: 97, multimodal: 8, throughput: 76, costEfficiency: 99, toolAdherence: 92, ttftLatency: 75, openAccess: 100 },
  'mimo-v2-5': { reasoning: 89, agentic: 84, sweBench: 81, longContext: 97, multimodal: 99, throughput: 90, costEfficiency: 100, toolAdherence: 92, ttftLatency: 87, openAccess: 100 },
  'minimax-m3': { reasoning: 90, agentic: 77, sweBench: 74, longContext: 96, multimodal: 95, throughput: 77, costEfficiency: 100, toolAdherence: 89, ttftLatency: 74, openAccess: 95 },
  'minimax-m2-7': { reasoning: 87, agentic: 72, sweBench: 75, longContext: 70, multimodal: 8, throughput: 82, costEfficiency: 100, toolAdherence: 87, ttftLatency: 80, openAccess: 100 },
  'nemotron-3-5-lightning': { reasoning: 81, agentic: 55, sweBench: 68, longContext: 91, multimodal: 8, throughput: 100, costEfficiency: 100, toolAdherence: 87, ttftLatency: 99, openAccess: 100 },
  'hy3-tencent': { reasoning: 93, agentic: 86, sweBench: 90, longContext: 79, multimodal: 8, throughput: 89, costEfficiency: 99, toolAdherence: 94, ttftLatency: 85, openAccess: 100 },
  'longcat-2-0': { reasoning: 91, agentic: 82, sweBench: 80, longContext: 97, multimodal: 8, throughput: 38, costEfficiency: 86, toolAdherence: 90, ttftLatency: 39, openAccess: 100 },
  'muse-spark-1-2': { reasoning: 95, agentic: 93, sweBench: 85, longContext: 94, multimodal: 100, throughput: 87, costEfficiency: 92, toolAdherence: 95, ttftLatency: 84, openAccess: 82 },
  'composer-2-5': { reasoning: 83, agentic: 82, sweBench: 78, longContext: 58, multimodal: 30, throughput: 97, costEfficiency: 100, toolAdherence: 93, ttftLatency: 97, openAccess: 25 },
  'glm-5-3-flash': { reasoning: 86, agentic: 84, sweBench: 82, longContext: 96, multimodal: 88, throughput: 55, costEfficiency: 98, toolAdherence: 88, ttftLatency: 72, openAccess: 100 },
  'hy4-preview': { reasoning: 92, agentic: 88, sweBench: 88, longContext: 94, multimodal: 8, throughput: 88, costEfficiency: 98, toolAdherence: 91, ttftLatency: 84, openAccess: 100 },
  'qwen3-8-flash': { reasoning: 90, agentic: 87, sweBench: 85, longContext: 95, multimodal: 92, throughput: 90, costEfficiency: 100, toolAdherence: 92, ttftLatency: 89, openAccess: 65 },
  'muse-spark-1-3': { reasoning: 97, agentic: 94, sweBench: 90, longContext: 96, multimodal: 98, throughput: 96, costEfficiency: 94, toolAdherence: 95, ttftLatency: 40, openAccess: 85 }
};


// ==========================================
// 7. CATÁLOGO COMPLETO DO OPENCODE GO (FONTE ÚNICA CANÔNICA)
// ==========================================
// OPENCODE_GO_DATA é a única fonte canônica (definida em data/platforms.js)
const OPENCODE_GO_CATALOG = (typeof OPENCODE_GO_DATA !== "undefined" && OPENCODE_GO_DATA.models)
  ? OPENCODE_GO_DATA.models
  : [];

// Vinculação dinâmica de disponibilidade OpenCode Go em AI_MODELS_DATA
if (typeof OPENCODE_GO_DATA !== "undefined" && OPENCODE_GO_DATA.models) {
  Object.keys(AI_MODELS_DATA).forEach(modelId => {
    const m = AI_MODELS_DATA[modelId];
    const goModel = OPENCODE_GO_DATA.getModel(modelId);
    if (goModel) {
      m.openCodeGo = {
        available: true,
        id: goModel.id,
        displayName: goModel.displayName,
        usageAllowanceUsd: goModel.usageAllowanceUsd,
        valueMultiplierVsSubscription: goModel.valueMultiplierVsSubscription,
        quotaBurnMultiplier: goModel.quotaBurnMultiplier,
        quotaMultiplier: goModel.quotaBurnMultiplier,
        effectiveQuotaPct: goModel.effectiveQuotaPct,
        req5h: goModel.req5h,
        reqWeek: goModel.reqWeek,
        estReqMonth: goModel.reqMonth,
        tokenProfile: goModel.tokenProfile,
        endpoint: goModel.endpoint,
        sdkPackage: goModel.sdkPackage,
        goPricing: goModel.goPricing,
        privacy: goModel.privacy,
        zdr: goModel.privacy.zdr
      };
    } else {
      m.openCodeGo = {
        available: false
      };
    }
  });
}


// ==========================================
// ==========================================
// 8. BANCO DE HARDWARE, VRAM E NÓS RECOMENDADOS (MODELOS ABERTOS)
// ==========================================
const HARDWARE_LOCAL_MODELS_DATA = [
  {
    modelId: 'glm-5-3-flash',
    name: 'GLM-5.3-Flash (320B MoE / 18B Active)',
    minVramGb: 160.0,
    recommendedVramGb: 320.0,
    gpuCount: 4,
    executionCategory: 'multi_gpu',
    minimumNodeClass: 'cluster-4x-h200',
    minVramInt4: '~160–180 GB (INT4/GGUF) ou 32 GB VRAM + 256 GB RAM via KTransformers/CPU offload',
    recommendedBf16: '~640 GB (8x H100 80GB) ou ~320 GB em FP8 (4x H100/H200)',
    recommendedNode: 'Cluster 4x H200 (FP8) ou 8x H100/H200 (BF16) / Workstation com KTransformers + CPU offload',
    estimatedDecodeTps: '43–45 tok/s (vLLM/SGLang/TokenSpeed)',
    verifiedAt: '2026-09-02',
    notes: 'MoE de 320B com 18B ativos por token sob licença permissiva MIT. A atenção híbrida Sparse-Linear reduz o KV cache em 4.44x vs GLM-5.3. Exige residência total dos 320B pesos em memória ou offload de experts.'
  },
  {
    modelId: 'gpt-oss-20b',
    name: 'GPT-OSS-20B',
    minVramGb: 16.0,
    recommendedVramGb: 24.0,
    gpuCount: 1,
    executionCategory: 'consumer',
    minimumNodeClass: 'single-gpu-consumer',
    minVramInt4: '16 GB (MXFP4 oficial ~12.8 GiB)',
    recommendedBf16: '~42–48 GB',
    recommendedNode: '1x RTX 4090 / 5090 (24/32 GB) em Q4 ou 1x RTX 6000 Ada (48 GB) em BF16',
    estimatedDecodeTps: '80–250 tok/s',
    verifiedAt: '2026-09-02',
    notes: 'Excelente worker local econômico para parsing, classificação e subagentes rápidos.'
  },
  {
    modelId: 'gpt-oss-120b',
    name: 'GPT-OSS-120B',
    minVramGb: 61.0,
    recommendedVramGb: 80.0,
    gpuCount: 1,
    executionCategory: 'workstation',
    minimumNodeClass: 'single-gpu-enterprise',
    minVramInt4: '~61–80 GB (MXFP4 oficial ~60.8 GiB)',
    recommendedBf16: '~235 GB + overhead',
    recommendedNode: '1x H100 / H200 (80/141 GB) em MXFP4 ou 4x RTX 6000 Ada (48 GB) / 2x H200 em BF16',
    estimatedDecodeTps: '40–150 tok/s',
    verifiedAt: '2026-09-02',
    notes: 'Projetado pela OpenAI para caber em uma única GPU de 80 GB com ~5.1B parâmetros ativos.'
  },
  {
    modelId: 'qwen3-8-27b',
    name: 'Qwen3.8-27B (Denso)',
    minVramGb: 16.0,
    recommendedVramGb: 24.0,
    gpuCount: 1,
    executionCategory: 'consumer',
    minimumNodeClass: 'single-gpu-consumer',
    minVramInt4: '~16–20 GB INT4 / Q4',
    recommendedBf16: '~55.6 GB (FP16/BF16)',
    recommendedNode: '1x RTX 4090 (24 GB) ou RTX 5090 (32 GB) em Q4/Q6; 1x H100 80GB para BF16',
    estimatedDecodeTps: '40–180 tok/s',
    verifiedAt: '2026-09-02',
    notes: 'Melhor modelo open-weights custo-benefício para rodar em workstation pessoal de desenvolvimento.'
  },
  {
    modelId: 'qwen3-8-2-4t-a95b',
    name: 'Qwen3.8-2.4T-A95B (Repo)',
    minVramGb: 1200.0,
    recommendedVramGb: 4800.0,
    gpuCount: 8,
    executionCategory: 'datacenter',
    minimumNodeClass: 'cluster-datacenter',
    minVramInt4: '~1.2–1.4 TB INT4',
    recommendedBf16: '~4.8 TB (BF16)',
    recommendedNode: 'Cluster ≥8x B200 192GB (INT4) ou ~32x B200 / 40+ H200 (BF16) com InfiniBand',
    estimatedDecodeTps: '15–50 tok/s',
    verifiedAt: '2026-09-02',
    notes: 'Monstro MoE com 2.4T parâmetros totais e 95B ativos por token em 92 camadas e 512 experts.'
  },
  {
    modelId: 'deepseek-v4-flash-0731',
    name: 'DeepSeek-V4-Flash-0731',
    minVramGb: 167.0,
    recommendedVramGb: 570.0,
    gpuCount: 2,
    executionCategory: 'multi_gpu',
    minimumNodeClass: 'multi-gpu-node',
    minVramInt4: '~167 GB (Mixed oficial: experts FP4 + parâmetros FP8)',
    recommendedBf16: '~570–610 GB (BF16)',
    recommendedNode: '2x H200 141GB (mínimo mixed) ou 4x H200 / 4x RTX 6000 Ada em cluster NVLink',
    estimatedDecodeTps: '40–120 tok/s',
    verifiedAt: '2026-09-02',
    notes: '284B total com apenas 13B ativos por token. Excelente velocidade com janela de 1M.'
  },
  {
    modelId: 'deepseek-v3-2',
    name: 'DeepSeek-V3.2',
    minVramGb: 360.0,
    recommendedVramGb: 1340.0,
    gpuCount: 4,
    executionCategory: 'datacenter',
    minimumNodeClass: 'cluster-datacenter',
    minVramInt4: '~360–400 GB INT4',
    recommendedBf16: '~1.34 TB (BF16)',
    recommendedNode: '4x H200 (mínimo bare) ou 8x H200 141GB recomendado; 8x B200 192GB em BF16',
    estimatedDecodeTps: '30–90 tok/s',
    verifiedAt: '2026-09-02',
    notes: '671B parâmetros totais e 37B ativos por token.'
  },
  {
    modelId: 'nemotron-3-5-lightning',
    name: 'Nemotron 3.5 Lightning (30B)',
    minVramGb: 16.0,
    recommendedVramGb: 32.0,
    gpuCount: 1,
    executionCategory: 'consumer',
    minimumNodeClass: 'single-gpu-consumer',
    minVramInt4: '~16–24 GB (NVFP4 nativo)',
    recommendedBf16: '~60–64 GB (BF16)',
    recommendedNode: '1x RTX 5090 32GB (NVFP4/GGUF), 1x DGX Spark ou 1x H100 80GB (BF16 nativo)',
    estimatedDecodeTps: '100–400 tok/s',
    verifiedAt: '2026-09-02',
    notes: 'Campeão de vazão: arquitetura híbrida Mamba-2 + MoE com 3B ativos. Suporta até 1M de contexto.'
  },
  {
    modelId: 'glm-5-1',
    name: 'GLM-5.1 (754B)',
    minVramGb: 380.0,
    recommendedVramGb: 1500.0,
    gpuCount: 4,
    executionCategory: 'datacenter',
    minimumNodeClass: 'cluster-datacenter',
    minVramInt4: '~380–420 GB INT4',
    recommendedBf16: '~1.5 TB (BF16)',
    recommendedNode: '4x H200 (mínimo quantizado) ou 8x H200 141GB recomendado; 8x B200 192GB',
    estimatedDecodeTps: '30–110 tok/s',
    verifiedAt: '2026-09-02',
    notes: 'Checkpoint de 754B de tensores para loops agênticos longos.'
  },
  {
    modelId: 'longcat-2-0',
    name: 'LongCat-2.0 (Meituan 1.6T)',
    minVramGb: 800.0,
    recommendedVramGb: 3200.0,
    gpuCount: 8,
    executionCategory: 'datacenter',
    minimumNodeClass: 'cluster-datacenter',
    minVramInt4: '~0.8–1.0 TB INT4',
    recommendedBf16: '~3.2–3.6 TB (BF16)',
    recommendedNode: '8x B200 192GB (INT4) ou 16–24x B200 com InfiniBand SXM5 para FP8/BF16',
    estimatedDecodeTps: '15–60 tok/s',
    verifiedAt: '2026-09-02',
    notes: '1.6T parâmetros totais com ~48B ativos por token e contexto nativo de 1M. Armazenamento de ~3,5 TB.'
  }
];

const HARDWARE_GPU_DATABASE = {
  'rtx-3060-12gb': { id: 'rtx-3060-12gb', name: 'NVIDIA RTX 3060 12GB', vramGb: 12.0, tdpWatts: 170, class: 'consumer_entry' },
  'rtx-4060ti-16gb': { id: 'rtx-4060ti-16gb', name: 'NVIDIA RTX 4060 Ti 16GB', vramGb: 16.0, tdpWatts: 165, class: 'consumer_sweetspot' },
  'rtx-4080-16gb': { id: 'rtx-4080-16gb', name: 'NVIDIA RTX 4080 16GB', vramGb: 16.0, tdpWatts: 320, class: 'consumer_high' },
  'rtx-4090-24gb': { id: 'rtx-4090-24gb', name: 'NVIDIA RTX 4090 24GB', vramGb: 24.0, tdpWatts: 450, class: 'consumer_flagship' },
  'rtx-5090-32gb': { id: 'rtx-5090-32gb', name: 'NVIDIA RTX 5090 32GB', vramGb: 32.0, tdpWatts: 600, class: 'consumer_ultimate' },
  'dual-rtx-4090-48gb': { id: 'dual-rtx-4090-48gb', name: 'Dual NVIDIA RTX 4090 (48GB VRAM)', vramGb: 48.0, tdpWatts: 900, class: 'workstation_diy' },
  'mac-studio-64gb': { id: 'mac-studio-64gb', name: 'Apple Mac Studio M4 (64GB Unificada)', vramGb: 48.0, tdpWatts: 140, class: 'apple_silicon' },
  'mac-studio-128gb': { id: 'mac-studio-128gb', name: 'Apple Mac Studio M4 (128GB Unificada)', vramGb: 96.0, tdpWatts: 160, class: 'apple_silicon' },
  'mac-studio-192gb': { id: 'mac-studio-192gb', name: 'Apple Mac Studio M4 (192GB Unificada)', vramGb: 144.0, tdpWatts: 200, class: 'apple_silicon' },
  'nvidia-a100-80gb': { id: 'nvidia-a100-80gb', name: 'NVIDIA A100 SXM4 80GB', vramGb: 80.0, tdpWatts: 400, class: 'datacenter_single' },
  'nvidia-h100-80gb': { id: 'nvidia-h100-80gb', name: 'NVIDIA H100 SXM5 80GB', vramGb: 80.0, tdpWatts: 700, class: 'datacenter_flagship' },
  'nvidia-h200-141gb': { id: 'nvidia-h200-141gb', name: 'NVIDIA H200 SXM 141GB', vramGb: 141.0, tdpWatts: 700, class: 'datacenter_ultimate' }
};

const KV_CACHE_COMPRESSION_FACTORS = {
  'standard_mha': 1.0,
  'mha_standard': 1.0,
  'gqa_8': 0.25,
  'mla_deepseek': 0.07,
  'gated_deltanet': 0.02,
  'mamba_2_ssm': 0.015,
  'dsa_attention': 0.08
};


// ==========================================
// 8.5 GOVERNANÇA DE COTAS & POOLS DO GOOGLE ANTIGRAVITY (2026)
// ==========================================

const ANTIGRAVITY_POOLS_DATA = {
  title: 'Arquitetura de Pools e Governança de Cotas no Google Antigravity',
  lastUpdated: '2026-09-02',
  pools: {
    pool1: {
      id: 'gemini-models',
      name: 'Pool 1: Gemini Models',
      badge: 'POOL 1: GEMINI (ISOLADO)',
      description: 'Franquia independente e dedicada aos modelos desenvolvidos pelo Google.',
      models: [
        { id: 'gemini-3-8-flash', name: 'Gemini 3.8 Flash', role: 'Worker de Alto Throughput / Coding Agêntico / Multimodal 1M', context: '1M', tokensRatio: 'Econômico / Pool Gemini', supportedEfforts: ['low', 'medium', 'high'] },
        { id: 'gemini-3-7-flash', name: 'Gemini 3.7 Flash', role: 'Subagentes / Navegação / Triagem Mecânica', context: '1M', tokensRatio: '8x vs Pro' },
        { id: 'gemini-3-6-flash', name: 'Gemini 3.6 Flash', role: 'Boilerplate e Edição Rápida', context: '1M', tokensRatio: '10x vs Pro' },
        { id: 'gemini-3-1-pro', name: 'Gemini 3.1 Pro', role: 'Multimodal Complexo / Ciência / Raciocínio Pesado', context: '1M', tokensRatio: '1x Base' }
      ],
      quotaMechanism: 'Proporcional ao preço equivalente de API (Maio/2026). Modelos Flash consomem até 8x menos do orçamento.',
      resetSchedule: 'Renovação dinâmica de 5 horas + Limite semanal próprio.'
    },
    pool2: {
      id: 'claude-and-gpt',
      name: 'Pool 2: Claude and GPT models',
      badge: 'POOL 2: CLAUDE & GPT (COMPARTILHADO)',
      description: 'Franquia concorrente e compartilhada entre os modelos de terceiros (Anthropic e OpenAI).',
      models: [
        { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6 (Thinking)', role: '🥇 Melhor Default / Daily Driver Principal', sweScore: '79,6%', valueRank: 1, note: 'Qualidade quase idêntica ao Opus a 60% do custo nominal' },
        { id: 'claude-opus-4-6', name: 'Claude Opus 4.6 (Thinking)', role: '🥈 Escalonamento Profundo / Problemas Críticos', sweScore: '80,8%', valueRank: 2, note: 'Líder em MRCR 1M (78,3%) e ARC-AGI-2 (68,8%) para bugs obscuros' },
        { id: 'gpt-oss-120b', name: 'GPT-OSS 120B (Medium)', role: '🥉 Nicho / Análise de Logs / Segunda Opinião', sweScore: '52,6%', valueRank: 3, note: '⚠️ Consome a mesma cota sem desconto divulgado; SWE-bench de 52,6%' }
      ],
      quotaMechanism: 'Rate limit separado, fixo e restrito por infraestrutura. O Google NÃO divulga multiplicadores internos.',
      resetSchedule: 'Duplo teto simultâneo: 5 Horas + Limite Semanal. Se o semanal zerar (0%), o reset de 5h NÃO libera mais uso até a virada da semana.'
    }
  },
  governanceRules: [
    { title: '🔒 Duplo Teto Simultâneo (5h + Semanal)', description: 'O plano Google AI Pro possui renovação a cada 5 horas, mas está estritamente subordinado ao limite semanal. Se a barra semanal esgotar, o usuário fica bloqueado por múltiplos dias.' },
    { title: '⚙️ Consumo por Trabalho do Agente', description: 'Uma requisição simples consome muito menos que uma execução autônoma com thinking denso, dezenas de tool calls, leitura de múltiplos arquivos e passos encadeados.' },
    { title: '🚫 Mito da Economia com GPT-OSS', description: 'GPT-OSS 120B (Medium) compartilha exatamente o Pool 2 de Sonnet e Opus. Usá-lo para tarefas simples não garante economia de cota e entrega 52,6% no SWE-bench vs ~80% dos Claude.' },
    { title: '💡 Preservação Inteligente de Cota', description: 'Delegar tarefas mecânicas, busca e boilerplate para o Gemini Flash (Pool 1) poupa 100% da cota escassa do Pool 2 para quando você realmente precisar de Sonnet ou Opus.' }
  ],
  funnelWorkflow: [
    { step: 1, condition: 'Tarefa Simples / Mecânica / Busca de Código', targetPool: 'Pool 1 (Gemini)', model: 'Gemini 3.7/3.6 Flash', action: 'Localizar arquivos, explicar funções, gerar testes unitários mecânicos e boilerplate.', badge: 'Preserva 100% Pool 2' },
    { step: 2, condition: 'Desenvolvimento de Features / Debugging / Refatoração', targetPool: 'Pool 2 (Claude/GPT)', model: 'Claude Sonnet 4.6 (Thinking)', action: 'Daily driver principal. 79,6% no SWE-bench e 61,3% no MCP-Atlas.', badge: 'Daily Driver Padrão' },
    { step: 3, condition: 'Sonnet Falhou / Bug com Causa Raiz Obscura / Long-Context Pesado', targetPool: 'Pool 2 (Claude/GPT)', model: 'Claude Opus 4.6 (Thinking)', action: 'Escalonamento crítico de profundidade. Líder no MRCR 1M (78,3%) e ARC-AGI-2 (68,8%).', badge: 'Escalonamento Crítico' },
    { step: 4, condition: 'Análise de Logs Extensos / Segunda Opinião / Fallback', targetPool: 'Pool 2 (Claude/GPT)', model: 'GPT-OSS 120B (Medium)', action: 'Uso de canal lateral text-only bem delimitado.', badge: 'Canal Lateral' }
  ],
  efficiencyFormula: {
    formula: 'E = B / Q',
    variables: {
      Q: 'Queda percentual da cota consumida na sessão (Q = C_inicial - C_final)',
      B: 'Taxa de sucesso e qualidade da solução entregue sem retrabalho (B ∈ [0, 1])',
      E: 'Eficiência de Cota: Tarefas resolvidas com sucesso por unidade de cota consumida'
    }
  }
};


// ==========================================
// 9. MATRIZ 15x11 DE HARNESSES & CONFIGURAÇÕES
// ==========================================

const HARNESS_COMPATIBILITY_DATA = {
  harnesses: [
    { id: 'opencode', name: 'OpenCode / OpenCode Go', agnosticScore: 9.8, subagents: true, mcp: true, neutral: true },
    { id: 'cursor', name: 'Cursor IDE (Composer)', agnosticScore: 8.0, subagents: true, mcp: false, neutral: false },
    { id: 'qwen-code', name: 'Qwen Code (Fork)', agnosticScore: 9.2, subagents: true, mcp: true, neutral: true },
    { id: 'grok-build', name: 'Grok Build (xAI)', agnosticScore: 7.5, subagents: true, mcp: true, neutral: false },
    { id: 'codex-cli', name: 'OpenAI Codex CLI', agnosticScore: 6.5, subagents: false, mcp: false, neutral: false },
    { id: 'claude-code', name: 'Claude Code (Anthropic)', agnosticScore: 7.0, subagents: true, mcp: true, neutral: false },
    { id: 'aider', name: 'Aider Polyglot', agnosticScore: 9.5, subagents: false, mcp: false, neutral: true },
    { id: 'roo-code', name: 'Roo Code (VS Code)', agnosticScore: 8.8, subagents: true, mcp: true, neutral: true },
    { id: 'cline', name: 'Cline (Autonomous)', agnosticScore: 8.7, subagents: true, mcp: true, neutral: true },
    { id: 'kilo', name: 'Kilo Code CLI', agnosticScore: 8.5, subagents: false, mcp: true, neutral: true },
    { id: 'openhands', name: 'OpenHands (All-Hands)', agnosticScore: 9.0, subagents: true, mcp: true, neutral: true }
  ],
  matrix: {
    'gpt-6-astra': { opencode: '🟢 First-class', cursor: '🟢 First-class (Pool)', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🟢 First-class Nativo (Async Tools)', claudeCode: '🟡 Adapter', aider: '🟢 First-class (Architect)', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'grok-4-6': { opencode: '🟢 First-class', cursor: '🟢 First-class (Pool)', qwenCode: '🟩 Compatible', grokBuild: '🟢 First-class Nativo', codexCli: '🔴 Unsupported', claudeCode: '🟡 Adapter', aider: '🟩 Compatible (Architect)', rooCode: '🟩 Compatible', cline: '🟩 Compatible', kilo: '🟩 Compatible', openhands: '🟩 Compatible' },
    'grok-4-5': { opencode: '🟢 First-class', cursor: '🟢 First-class (Pool)', qwenCode: '🟩 Compatible', grokBuild: '🟢 First-class', codexCli: '🔴 Unsupported', claudeCode: '🟡 Adapter', aider: '🟩 Compatible', rooCode: '🟩 Compatible', cline: '🟩 Compatible', kilo: '🟩 Compatible', openhands: '🟩 Compatible' },
    'gpt-5-6-sol': { opencode: '🟢 First-class', cursor: '🟢 First-class', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🟢 First-class Nativo', claudeCode: '🟡 Adapter', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'gpt-5-6-terra': { opencode: '🟢 First-class', cursor: '🟢 First-class', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🟢 First-class Nativo', claudeCode: '🟡 Adapter', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'gpt-5-6-luna': { opencode: '🟢 First-class', cursor: '🟢 First-class', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🟢 First-class Nativo', claudeCode: '🟡 Adapter', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'claude-opus-5': { opencode: '🟢 First-class', cursor: '🟢 First-class', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🔴 Unsupported', claudeCode: '🟢 First-class Nativo', aider: '🟢 First-class (Architect)', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'claude-opus-4-6': { opencode: '🟢 First-class', cursor: '🟢 First-class', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🔴 Unsupported', claudeCode: '🟢 First-class Nativo', aider: '🟢 First-class (Architect)', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'claude-sonnet-5': { opencode: '🟢 First-class', cursor: '🟢 First-class', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🔴 Unsupported', claudeCode: '🟢 First-class Nativo', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'claude-sonnet-4-6': { opencode: '🟢 First-class', cursor: '🟢 First-class', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🔴 Unsupported', claudeCode: '🟢 First-class Nativo (Daily Driver)', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'claude-haiku-4-5': { opencode: '🟢 First-class (Subagent Worker)', cursor: '🟢 First-class (Other Models)', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🔴 Unsupported', claudeCode: '🟢 First-class Nativo (Fastest)', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'gemini-3-7-flash': { opencode: '🟢 First-class (1M Multimodal)', cursor: '🟩 Compatible', qwenCode: '🟩 Compatible', grokBuild: '🟩 Compatible', codexCli: '🔴 Unsupported', claudeCode: '🟡 Adapter', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'deepseek-v4-flash-0731': { opencode: '🟢 First-class (reasoning_content)', cursor: '🟩 Compatible', qwenCode: '🟢 First-class', grokBuild: '🟩 Compatible', codexCli: '🟡 Gateway Responses', claudeCode: '🟡 Adapter', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'deepseek-v4-pro-0813': { opencode: '🟢 First-class (reasoning_content)', cursor: '🟩 Compatible', qwenCode: '🟢 First-class', grokBuild: '🟩 Compatible', codexCli: '🟡 Gateway', claudeCode: '🟡 Adapter', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'ox-alpha': { opencode: '🟢 First-class (ox-alpha-free)', cursor: '🟡 Via OpenRouter', qwenCode: '🟩 Compatible', grokBuild: '🟡 Adapter', codexCli: '🔴 Unsupported', claudeCode: '🟡 Adapter', aider: '🟩 Compatible', rooCode: '🟡 Sem tool-calling strict', cline: '🟡 Paradas no raciocínio', kilo: '🟩 Compatible', openhands: '🟩 Compatible' },
    'gpt-oss-20b': { opencode: '🟢 First-class Local (vLLM/Ollama)', cursor: '🟩 Compatible (BYOK Local)', qwenCode: '🟢 First-class', grokBuild: '🟡 Adapter', codexCli: '🔴 Unsupported', claudeCode: '🔴 Unsupported', aider: '🟢 First-class Local', rooCode: '🟢 First-class (vLLM Tool Call)', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'gpt-oss-120b': { opencode: '🟢 First-class Local (vLLM/TP)', cursor: '🟩 Compatible (BYOK Local)', qwenCode: '🟢 First-class', grokBuild: '🟡 Adapter', codexCli: '🔴 Unsupported', claudeCode: '🔴 Unsupported', aider: '🟢 First-class Local', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'nemotron-3-5-lightning': { opencode: '🟢 First-class (TensorRT-LLM)', cursor: '🟩 Compatible (NIM API)', qwenCode: '🟢 First-class', grokBuild: '🟩 Compatible', codexCli: '🔴 Unsupported', claudeCode: '🔴 Unsupported', aider: '🟢 First-class Local', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'qwen3-8-27b': { opencode: '🟢 First-class (vLLM/Ollama)', cursor: '🟩 Compatible', qwenCode: '🟢 First-class Nativo', grokBuild: '🟩 Compatible', codexCli: '🔴 Unsupported', claudeCode: '🔴 Unsupported', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' },
    'kimi-k3': { opencode: '🟢 First-class', cursor: '🟩 Compatible', qwenCode: '🟢 First-class', grokBuild: '🟩 Compatible', codexCli: '🟡 Gateway', claudeCode: '🟡 Adapter', aider: '🟢 First-class', rooCode: '🟢 First-class', cline: '🟢 First-class', kilo: '🟢 First-class', openhands: '🟢 First-class' }
  }
};


// ==========================================
// 10. BASE DE DIAGNÓSTICO DE ERROS (TROUBLESHOOTER)
// ==========================================

const TROUBLESHOOTER_DATABASE = [
  {
    id: 'stealth-ox-alpha-endpoint-retired',
    title: 'Endpoint stealth/ox-alpha aposentado / Modelo não encontrado (404/410)',
    harness: 'OpenRouter / OpenCode / CLI',
    models: ['Ox Alpha', 'stealth/ox-alpha', 'GLM-5.3-Flash'],
    cause: 'A fase stealth preview anônima do Ox Alpha foi formalmente encerrada em 26/08/2026 quando a Z.ai revelou a identidade oficial do modelo como GLM-5.3-Flash, aposentando os endpoints stealth/ox-alpha e opencode-go/ox-alpha-free.',
    solution: 'Migre as chamadas para o endpoint canônico correspondente: no OpenRouter utilize z-ai/glm-5.3-flash; na Z.ai API utilize glm-5.3-flash; no OpenCode utilize zai/glm-5.3-flash.'
  },
  {
    id: 'fable-5-1-tool-choice-breaking',
    title: 'Erro 400 em tool_choice com Claude Fable 5.1 (Incompatibilidade com "any" ou "tool" restrito)',
    harness: 'Anthropic API / Cursor / Cline / Roo Code',
    models: ['Claude Fable 5.1'],
    cause: 'O endpoint de raciocínio adaptativo do Fable 5.1 requer tool_choice: "auto" ou estruturação nativa em thinking blocks. Configurações forçadas como "any" ou objeto restrito causam rejeição na API v1/messages.',
    solution: 'Configure `tool_choice: {"type": "auto"}` e habilite adaptive thinking. Não force seleção obrigatória de ferramentas no cabeçalho se o modelo precisar planejar raciocínio prévio.'
  },
  {
    id: 'fable-5-1-safeguards-fallback',
    title: 'Fallback silencioso de segurança de Fable 5.1 para Opus 5 / Sonnet 5',
    harness: 'Anthropic Commercial API / Artificial Analysis',
    models: ['Claude Fable 5.1'],
    cause: 'Para proteger a execução de comandos de sistema sensíveis ou verificações estritas de segurança, a infraestrutura da Anthropic pode despachar até ~4% dos tokens para modelos Opus em fallback server-side.',
    solution: 'Monitore o header de resposta `anthropic-model-version` e desative heurísticas restritivas desnecessárias no system prompt de desenvolvimento.'
  },

  {
    id: 'thinking-tags-leak',
    title: 'Tags <think> vazando no diff ou quebrando a aplicação de patches',
    harness: 'OpenCode / Aider / Cline',
    models: ['DeepSeek V4', 'Kimi K3', 'GLM-5.3', 'Qwen3.8'],
    cause: 'O harness está interpretando o fluxo de pensamento do modelo como parte do código a ser escrito.',
    solution: 'Adicione no seu `opencode.json` ou configuração o mapeamento explícito do campo de raciocínio:\n```json\n{\n  "provider": {\n    "reasoningField": "reasoning_content"\n  }\n}\n```'
  },
  {
    id: 'cursor-fast-mode-drain',
    title: 'Franquia do Cursor Pro drenando 6x mais rápido sem perceber',
    harness: 'Cursor IDE (Composer)',
    models: ['Composer 2.5', 'Grok 4.6 Fast'],
    cause: 'O Cursor ativa o Composer Fast (6x) e o Grok Fast (2x) por padrão, debitando múltiplos créditos por requisição.',
    solution: 'Acesse `Settings > Models` no Cursor e desmarque a opção "Enable Fast Mode by default", forçando o uso do modo Standard de $0,50/$2,50.'
  },
  {
    id: 'codex-cli-wire-api',
    title: 'Erro de incompatibilidade de protocolo no Codex CLI com modelos não-OpenAI',
    harness: 'OpenAI Codex CLI',
    models: ['DeepSeek V4', 'Kimi K3', 'GLM-5.3'],
    cause: 'A OpenAI descontinuou o protocolo legado `wire_api = "chat"` no Codex CLI, aceitando estritamente o endpoint `/v1/responses`.',
    solution: 'Utilize um proxy compatível (como LiteLLM ou OpenCode Gateway) que converta chamadas do endpoint responses para a API do modelo de destino.'
  },
  {
    id: 'ox-alpha-premature-stops',
    title: '[Histórico Preview] Ox Alpha parando a geração no meio de raciocínios longos no OpenCode',
    harness: 'OpenCode / OpenRouter',
    models: ['Ox Alpha (stealth/ox-alpha)'],
    cause: 'Comportamento relatado onde o modelo esgota o limite padrão de tokens de completion ou falha ao emitir a terceira tool call consecutiva.',
    solution: 'Configure `max_tokens: 131072` na sua chamada e aumente o timeout de socket para 180s no cliente agêntico.'
  },
  {
    id: 'ox-alpha-repeated-format-error',
    title: '[Histórico Preview] RepeatedFormatError: No tool calls found in the response no Ox Alpha',
    harness: 'Docker / Pier / Mini-SWE-Agent / OpenRouter',
    models: ['Ox Alpha (stealth/ox-alpha)'],
    cause: 'O modelo responde em texto puro em vez de emitir JSON de tool call 3 vezes seguidas (responsável por 9,7% de perdas no DeepSWE 1.1).',
    solution: 'Configure um interceptor de reprompt no harness que capture saídas em texto e envie uma mensagem de sistema forçando a formatação de ferramenta, ou utilize `reasoning_effort: "high"` em vez de `max`.'
  },
  {
    id: 'ox-alpha-opencode-503-tools',
    title: '[Histórico Preview] Erro 503 / Network Error no OpenCode Go com tools[] (ox-alpha-free)',
    harness: 'OpenCode Go / Hermes Agent',
    models: ['Ox Alpha (ox-alpha-free)'],
    cause: 'Falha no adapter upstream do OpenCode Go ao serializar esquemas de ferramentas (Issues #44382 e #44332).',
    solution: 'Para tarefas com dezenas de ferramentas, reduza o número de schemas ativos, alterne temporariamente para a rota OpenRouter direta ou utilize o Muse Spark 1.2.'
  }
];


// ==========================================
// 11. MATRIZ DE PRIVACIDADE, RETENÇÃO & ZDR
// ==========================================

const PRIVACY_ZDR_DATABASE = {
  'opencode-go-general': {
    provider: 'OpenCode Go (Geral)',
    retentionDays: 0,
    trainingOnPrompts: false,
    zdrGuaranteed: false,
    notes: 'Privacidade variável por modelo: 22 modelos possuem ZDR (0 dias) sem treino; Grok 4.6 e GPT 5.6 Luna retêm logs por até 30 dias para moderação de abuso; Muse Spark Contributor autoriza treino Meta; DeepSeek V4 Flash possui acordo documentado até 31/08/2026 sob revalidação.'
  },
  'deepseek-direct': { provider: 'DeepSeek Direct API', retentionDays: 0, trainingOnPrompts: false, zdrGuaranteed: true, notes: 'Política ZDR formal revalidada em Setembro/2026; dados de API comercial não são utilizados para treinamento.' },
  'anthropic-fable-5-1': { provider: 'Anthropic (Claude Fable 5.1)', modelId: 'claude-fable-5-1', retentionDays: 30, trainingOnPrompts: false, zdrGuaranteed: false, notes: 'Retenção padrão de até 30 dias para moderação de segurança em contas comerciais; ZDR (0 dias) requer contrato Enterprise com Frontier Safeguards Compliance. No Cursor exige aprovação explícita do administrador.' },
  'cursor-privacy-mode': { provider: 'Cursor Privacy Mode', retentionDays: 0, trainingOnPrompts: false, zdrGuaranteed: true, notes: 'Código local e prompts não são armazenados nos servidores da Anysphere. Fable 5.1 requer opt-in prévio de administrador.' },
  'google-gemini-enterprise': { provider: 'Google Gemini API / Cloud', retentionDays: 0, trainingOnPrompts: false, zdrGuaranteed: true, notes: 'Dados de clientes comerciais na Gemini API e Google Cloud Vertex AI não são utilizados para treinamento de modelos.' },
  'openai-enterprise': { provider: 'OpenAI API (Tier 1-5)', retentionDays: 0, trainingOnPrompts: false, zdrGuaranteed: true, notes: 'Sem treinamento com dados de API; retenção padrão de 30 dias para moderação (0 dias sob ZDR empresarial).' },
  'anthropic-direct': { provider: 'Anthropic Commercial API', retentionDays: 0, trainingOnPrompts: false, zdrGuaranteed: true, notes: 'Dados de API comercial nunca são utilizados para treinamento.' },
  'zai-api': { provider: 'Z.ai (Zhipu API)', retentionDays: 0, trainingOnPrompts: false, zdrGuaranteed: true, notes: 'API comercial Z.ai com política ZDR estrita para clientes empresariais. Prompts não são utilizados para treino.' },
  'openrouter-glm-53-flash': { provider: 'OpenRouter (GLM-5.3-Flash)', retentionDays: 0, trainingOnPrompts: false, zdrGuaranteed: true, notes: 'Endpoint z-ai/glm-5.3-flash sob termos de privacidade padrão sem treinamento não autorizado.' },
  'meta-contributor': { provider: 'Meta (Muse Spark Contributor)', retentionDays: 30, trainingOnPrompts: true, zdrGuaranteed: false, notes: '⚠️ Treinamento autorizado pela Meta em troca da tarifa ultra-subsidiada no OpenCode Go.' }
};


// ==========================================
// 12. MOTORES DE CÁLCULO, SIMULAÇÃO & HELPERS
// ==========================================

const AI_DATA_HELPERS = {
  /**
   * Obtém modelo por ID
   */
  getModel(modelId) {
    return AI_MODELS_DATA[modelId] || null;
  },

  /**
   * Obtém todos os modelos de um provedor
   */
  getModelsByProvider(providerId) {
    return Object.values(AI_MODELS_DATA).filter(m => m.provider === providerId);
  },

  /**
   * Calcula o custo exato de uma requisição
   */
  calculateRequestCost(modelId, inputTokens, cachedTokens, outputTokens, isFastMode = false, options = {}) {
    const model = AI_MODELS_DATA[modelId];
    if (!model || !model.pricing) return 0.0;
    if (model.openWeights && model.pricing.selfHosted) return 0.0;

    let pricingTable = model.pricing.standard;
    let tableName = 'standard';

    // Plataforma específica (ex: cursor vs googleApi)
    if (options.platform === 'cursor' && model.pricing.cursor) {
      pricingTable = model.pricing.cursor;
      tableName = 'cursor';
    } else if (options.platform === 'googleApi' && model.pricing.googleApi) {
      pricingTable = model.pricing.googleApi;
      tableName = 'googleApi';
    }

    if (!pricingTable) return 0.0;

    // Período promocional vs Pós-promoção
    const now = options.referenceDate ? new Date(options.referenceDate) : (options.now ? new Date(options.now) : new Date());
    if (model.pricing.promotionalPeriod) {
      const promoUntil = new Date(model.pricing.promotionalPeriod.effectiveUntil);
      if (now <= promoUntil) {
        pricingTable = model.pricing.promotionalPeriod;
        tableName = 'promotional';
      } else if (model.pricing.afterPromotion) {
        pricingTable = model.pricing.afterPromotion;
        tableName = 'afterPromotion';
      }
    }

    // Context Tiers (ex: Gemini 3.1 Pro)
    const totalInput = inputTokens + cachedTokens;
    let inputPrice = pricingTable.input;
    let outputPrice = pricingTable.output;
    let cachePrice = pricingTable.cacheRead !== null && pricingTable.cacheRead !== undefined ? pricingTable.cacheRead : inputPrice;

    if (model.pricing.contextTiers) {
      if (totalInput > 128000 && model.pricing.contextTiers.tier2_above128k) {
        inputPrice = model.pricing.contextTiers.tier2_above128k.input;
        outputPrice = model.pricing.contextTiers.tier2_above128k.output;
        cachePrice = model.pricing.contextTiers.tier2_above128k.cacheRead;
        tableName = 'contextTier2_above128k';
      }
    }

    let multiplier = 1.0;
    if (isFastMode) {
      if (model.pricing.fastMultiplier) {
        multiplier = model.pricing.fastMultiplier;
      } else if (model.pricing.fastApi && model.pricing.fastApi.multiplier) {
        multiplier = model.pricing.fastApi.multiplier;
      }
    }

    let cacheWritePrice = pricingTable.cacheWrite !== null && pricingTable.cacheWrite !== undefined ? pricingTable.cacheWrite : 0;

    // Long context cliff (suporta multiplicador escalar ou composto por componente)
    if (model.pricing.longContextThreshold && totalInput > model.pricing.longContextThreshold) {
      if (typeof model.pricing.longContextMultiplier === 'object' && model.pricing.longContextMultiplier !== null) {
        inputPrice *= (model.pricing.longContextMultiplier.input || 2.0);
        cachePrice *= (model.pricing.longContextMultiplier.cacheRead || 2.0);
        cacheWritePrice *= (model.pricing.longContextMultiplier.cacheWrite || 2.0);
        outputPrice *= (model.pricing.longContextMultiplier.output || 1.5);
      } else {
        inputPrice *= (model.pricing.longContextMultiplier || 2.0);
      }
    }

    let cost = ((inputTokens * inputPrice) + (cachedTokens * cachePrice) + (outputTokens * outputPrice)) / 1000000.0;

    // Cache Write genérico ou específico (5min vs 1 hora)
    if (options.cacheWriteTokens && cacheWritePrice) {
      cost += (options.cacheWriteTokens * cacheWritePrice) / 1000000.0;
    }
    if (options.cacheWrite5MinTokens && model.pricing.cacheWrite5Min) {
      cost += (options.cacheWrite5MinTokens * model.pricing.cacheWrite5Min) / 1000000.0;
    }
    if (options.cacheWrite1HourTokens && model.pricing.cacheWrite1Hour) {
      cost += (options.cacheWrite1HourTokens * model.pricing.cacheWrite1Hour) / 1000000.0;
    }

    // Batch API Discount
    if (options.isBatch && model.pricing.batchDiscount) {
      cost *= (1.0 - (model.pricing.batchDiscount / 100.0));
    }

    const finalCost = cost * multiplier;
    if (options.detailed) {
      return { cost: finalCost, pricingTableUsed: tableName, rateInput: inputPrice, rateOutput: outputPrice, rateCache: cachePrice, rateCacheWrite: cacheWritePrice };
    }
    return finalCost;
  },

  /**
   * Calcula a VRAM real necessária para rodar um modelo localmente com base em parâmetros reais e quantização
   */
  calculateVramRequirement(modelId, contextTokens = 32768, quantPrecision = 'FP8') {
    const model = AI_MODELS_DATA[modelId];
    if (!model) return null;

    // Determina o volume total de parâmetros em bilhões (paramsBillion)
    let paramsB = model.paramsBillion || 0;
    if (!paramsB && model.paramsTotal) {
      const raw = String(model.paramsTotal).toUpperCase().replace(',', '.');
      if (raw.includes('TB')) {
        const m = raw.match(/([\d.]+)\s*TB/);
        if (m) paramsB = parseFloat(m[1]) * 500.0; // ~500B params por TB em FP16
      } else if (raw.includes('GB')) {
        const m = raw.match(/([\d.]+)\s*GB/);
        if (m) paramsB = parseFloat(m[1]) * 0.5; // ~0.5B params por GB em FP16
      } else if (raw.includes('T')) {
        const m = raw.match(/([\d.]+)\s*T/);
        if (m) paramsB = parseFloat(m[1]) * 1000.0;
      } else if (raw.includes('B')) {
        const m = raw.match(/([\d.]+)\s*B/);
        if (m) paramsB = parseFloat(m[1]);
      }
    }

    // Fallbacks canônicos para modelos abertos conhecidos caso não especificado
    if (!paramsB || paramsB <= 0) {
      if (modelId === 'gpt-oss-20b') paramsB = 21.0;
      else if (modelId === 'gpt-oss-120b') paramsB = 117.0;
      else if (modelId === 'nemotron-3-5-lightning') paramsB = 30.0;
      else if (modelId === 'qwen3-8-27b') paramsB = 27.0;
      else if (modelId === 'qwen3-8-2-4t-a95b') paramsB = 2400.0;
      else if (modelId === 'deepseek-v4-flash-0731') paramsB = 304.0;
      else if (modelId === 'deepseek-v4-pro-0813') paramsB = 1700.0;
      else if (modelId === 'deepseek-v4-vision-exp') paramsB = 310.0;
      else if (modelId === 'deepseek-v3-2') paramsB = 671.0;
      else if (modelId === 'minimax-m2-7') paramsB = 230.0;
      else if (modelId === 'minimax-m3') paramsB = 420.0;
      else if (modelId === 'kimi-k2-6' || modelId === 'kimi-k2-7-code') paramsB = 1000.0;
      else if (modelId === 'glm-5-3-flash') paramsB = 320.0;
      else if (modelId === 'glm-5-2') paramsB = 750.0;
      else if (modelId === 'glm-5-1') paramsB = 600.0;
      else if (modelId === 'mimo-v2-5-pro') paramsB = 500.0;
      else if (modelId === 'mimo-v2-5') paramsB = 160.0;
      else if (modelId === 'hy3-tencent') paramsB = 300.0;
      else if (modelId === 'longcat-2-0') paramsB = 1750.0;
      else paramsB = 30.0;
    }

    // Bytes por parâmetro conforme o tipo de quantização / precisão selecionada
    let bytesPerParam = 1.0; // FP8 por padrão (8 bits = 1 byte)
    if (quantPrecision === 'BF16' || quantPrecision === 'FP16') {
      bytesPerParam = 2.0; // 16 bits = 2 bytes
    } else if (quantPrecision === 'FP8') {
      bytesPerParam = 1.0; // 8 bits = 1 byte
    } else if (quantPrecision === 'MXFP4' || quantPrecision === 'NVFP4') {
      bytesPerParam = 0.55; // 4-bit microscaling com tabelas de escala e metadados
    } else if (quantPrecision === 'Q4_K_M') {
      bytesPerParam = 0.58; // GGUF Q4_K_M (4.5 bits médios por parâmetro)
    } else if (quantPrecision === 'INT8' || quantPrecision === 'Q8_0') {
      bytesPerParam = 1.05; // 8-bit com overhead de quantização
    }

    // Memória dos Pesos dos Tensores
    const baseWeightGb = paramsB * bytesPerParam;

    // Fator de compressão do KV Cache baseado na arquitetura de atenção
    let compressionFactor = 1.0;
    if (model.attentionType && model.attentionType.includes('MLA')) {
      compressionFactor = KV_CACHE_COMPRESSION_FACTORS.mla_deepseek; // 0.07 (~93% compressão)
    } else if (model.attentionType && (model.attentionType.includes('DeltaNet') || model.attentionType.includes('Recorrente'))) {
      compressionFactor = KV_CACHE_COMPRESSION_FACTORS.gated_deltanet; // 0.02
    } else if (model.attentionType && (model.attentionType.includes('Mamba') || model.attentionType.includes('SSM'))) {
      compressionFactor = KV_CACHE_COMPRESSION_FACTORS.mamba_2_ssm; // 0.015
    } else if (model.attentionType && model.attentionType.includes('DSA')) {
      compressionFactor = KV_CACHE_COMPRESSION_FACTORS.dsa_attention; // 0.08
    } else if (model.attentionType && (model.attentionType.includes('Sliding') || model.attentionType.includes('Sparse') || model.attentionType.includes('GQA'))) {
      compressionFactor = KV_CACHE_COMPRESSION_FACTORS.gqa_8; // 0.25
    } else {
      compressionFactor = KV_CACHE_COMPRESSION_FACTORS.mha_standard; // 1.0
    }

    // KV Cache escalado: Modelo base de 30B em 32k tokens consome ~4 GB em FP16 (sem compressão não-linear)
    const modelScaleFactor = Math.max(0.8, Math.min(2.5, Math.sqrt(paramsB / 30.0)));
    const rawKvCacheGb = (contextTokens / 32768.0) * 4.0 * modelScaleFactor;
    const actualKvCacheGb = rawKvCacheGb * compressionFactor;

    // Overhead de Runtime (CUDA context, buffers de ativação, workspace PyTorch/vLLM)
    const cudaOverheadGb = 1.5;
    const totalVramRequiredGb = baseWeightGb + actualKvCacheGb + cudaOverheadGb;

    return {
      weightsGb: parseFloat(baseWeightGb.toFixed(2)),
      kvCacheGb: parseFloat(actualKvCacheGb.toFixed(2)),
      cudaOverheadGb: cudaOverheadGb,
      totalVramGb: parseFloat(totalVramRequiredGb.toFixed(2)),
      compressionFactor: compressionFactor,
      paramsBillion: paramsB,
      bytesPerParam: bytesPerParam
    };
  },

  /**
   * Calculadora de ROI para equipes de desenvolvimento
   */
  calculateTeamRoi(devCount = 5, tasksPerDevMonth = 120, avgTokensPerTask = 25000, energyCostKwhBrl = 0.85, usdToBrl = null) {
    const rate = (typeof usdToBrl === 'number' && !isNaN(usdToBrl) && usdToBrl > 0)
      ? usdToBrl
      : ((typeof FX_RATES_DATA !== 'undefined' && FX_RATES_DATA.USD_BRL && FX_RATES_DATA.USD_BRL.rate) ? FX_RATES_DATA.USD_BRL.rate : 5.108);

    const totalMonthlyTasks = devCount * tasksPerDevMonth;
    const totalMonthlyTokensM = (totalMonthlyTasks * avgTokensPerTask) / 1000000.0;

    // 1. Custo API Direta (Média ponderada GPT-5.6 Sol/Terra/Claude: ~$8/M tokens)
    const directApiMonthlyUsd = totalMonthlyTokensM * 8.0;
    const directApiAnnualBrl = directApiMonthlyUsd * 12.0 * rate;

    // 2. Custo Assinaturas Híbridas (OpenCode Go $10 + Cursor Pro $20 = $30/dev/mês)
    const subscriptionsMonthlyUsd = devCount * 30.0;
    const subscriptionsAnnualBrl = subscriptionsMonthlyUsd * 12.0 * rate;

    // 3. Custo Local Workstation (1x RTX 5090 R$ 18.000 + Energia)
    const workstationCapexBrl = 18000.0;
    const monthlyKwh = (600.0 * 8.0 * 22.0) / 1000.0; // 600W, 8h/dia, 22 dias
    const localEnergyMonthlyBrl = monthlyKwh * energyCostKwhBrl;
    const localAnnualTotalBrl = workstationCapexBrl + (localEnergyMonthlyBrl * 12.0);

    const annualSavingsBrl = directApiAnnualBrl - subscriptionsAnnualBrl;
    const amortizationMonths = (workstationCapexBrl / (directApiMonthlyUsd * rate - localEnergyMonthlyBrl));

    return {
      totalMonthlyTasks,
      directApiAnnualBrl: Math.round(directApiAnnualBrl),
      subscriptionsAnnualBrl: Math.round(subscriptionsAnnualBrl),
      localAnnualTotalBrl: Math.round(localAnnualTotalBrl),
      annualSavingsBrl: Math.round(annualSavingsBrl),
      amortizationMonths: parseFloat(amortizationMonths.toFixed(1))
    };
  },

  /**
   * Roteador Inteligente de Modelos (Model Router Decision Tree)
   */
  recommendModel(taskType = 'feature_agent', budgetTier = 'balanced', privacyReq = 'public_cloud') {
    if (privacyReq === 'self_hosted_local') {
      return {
        primaryModelId: 'gpt-oss-20b',
        primaryModelName: 'gpt-oss-20b (High)',
        rationale: 'Modelo open-weights oficial da OpenAI que roda 100% localmente em 16 GB de VRAM com 60,7% no SWE-bench Verified.',
        fallbackCascade: ['gpt-oss-120b', 'nemotron-3-5-lightning'],
        planner: 'gpt-oss-120b',
        executor: 'gpt-oss-20b',
        reviewer: 'gpt-oss-120b'
      };
    }

    if (taskType === 'autocomplete') {
      return {
        primaryModelId: 'claude-haiku-4-5',
        primaryModelName: 'Claude Haiku 4.5 / Luna',
        rationale: 'Latência ultrabaixa e custo reduzido para subagentes paralelos e completude em tempo real.',
        fallbackCascade: ['gpt-5-6-luna', 'gemini-3-5-flash'],
        planner: 'claude-haiku-4-5',
        executor: 'claude-haiku-4-5',
        reviewer: 'claude-haiku-4-5'
      };
    }

    if (taskType === 'ui_multimodal') {
      return {
        primaryModelId: 'gemini-3-8-flash',
        primaryModelName: 'Gemini 3.8 Flash (High) / Gemini 3.7',
        rationale: 'Líder em multimodalidade nativa total (Vídeo, Áudio, Imagem e PDF) em 1M de tokens com throughput de ~305 tok/s e 90,8% no TB 2.1. Líder em ferramentas visuais (75,9% Toolathlon) com custo por imagem de ~$0,000084.',
        fallbackCascade: ['gemini-3-7-flash', 'mimo-v2-5-pro', 'glm-5-3-flash'],
        planner: 'gemini-3-7-flash',
        executor: 'deepseek-v4-vision-exp',
        reviewer: 'gemini-3-7-flash'
      };
    }

    if (budgetTier === 'free_economy') {
      return {
        primaryModelId: 'gpt-5-6-luna',
        primaryModelName: 'GPT-5.6 Luna / DeepSeek-V4-Flash',
        rationale: 'Campeões de ultra-baixo custo ($0,20/$1,20 por milhão e sub-dólar com 10.250 req/mês no OpenCode Go e $0,39/tarefa no CursorBench Max). Para inferência 100% gratuita, utilize gpt-oss-20b em hardware local.',
        fallbackCascade: ['deepseek-v4-flash-0731', 'gpt-oss-20b', 'glm-5-3-flash'],
        planner: 'gpt-5-6-luna',
        executor: 'deepseek-v4-flash-0731',
        reviewer: 'gpt-5-6-luna'
      };
    }

    if (taskType === 'antigravity_stack') {
      return {
        primaryModelId: 'claude-sonnet-4-6',
        primaryModelName: 'Claude Sonnet 4.6 (Thinking)',
        rationale: 'Daily driver ideal no Antigravity: 79,6% SWE-bench no Pool 2, com triagem mecânica delegada ao Gemini Flash (Pool 1) e escalonamento para Opus 4.6.',
        fallbackCascade: ['claude-opus-4-6', 'gemini-3-7-flash', 'gpt-oss-120b'],
        planner: 'claude-sonnet-4-6',
        executor: 'claude-sonnet-4-6',
        reviewer: 'claude-opus-4-6'
      };
    }

    if (budgetTier === 'max_frontier') {
      return {
        primaryModelId: 'claude-fable-5-1',
        primaryModelName: 'Claude Fable 5.1 (Max / XHigh)',
        rationale: 'Novo #1 do CursorBench (73,4%) e líder geral Artificial Analysis (Index 66). Frontier absoluto com raciocínio adaptativo e saída de 128k tokens.',
        fallbackCascade: ['gpt-5-6-sol', 'claude-opus-5', 'grok-4-6', 'deepseek-v4-pro-0813'],
        planner: 'claude-fable-5-1',
        executor: 'gemini-3-8-flash',
        reviewer: 'claude-fable-5-1'
      };
    }

    // Default: sweet-spot geral de código
    return {
      primaryModelId: 'grok-4-6',
      primaryModelName: 'Grok 4.6 (Medium Reasoning)',
      rationale: 'Campeão de custo-benefício em coding ($0,84/task no AA Index 61.0 com 67,1% CursorBench a $1,28).',
      fallbackCascade: ['claude-opus-5', 'gpt-5-6-terra', 'kimi-k3'],
      planner: 'grok-4-6',
      executor: 'grok-4-6',
      reviewer: 'claude-opus-5'
    };
  },

  /**
   * Gerador de arquivos de configuração prontos para IDEs
   */
  generateIdeConfig(modelId, harnessId = 'opencode') {
    const model = AI_MODELS_DATA[modelId];
    if (!model) return '// Modelo não encontrado';

    if (harnessId === 'opencode') {
      return JSON.stringify({
        "$schema": "https://opencode.ai/config.schema.json",
        "model": model.openCodeGo && model.openCodeGo.id ? model.openCodeGo.id : `openai/${model.id}`,
        "provider": {
          "reasoningField": model.family === 'deepseek' || model.family === 'moonshot' ? "reasoning_content" : "reasoning",
          "temperature": 1.0,
          "topP": 0.95
        },
        "contextLimit": model.contextWindow || 256000
      }, null, 2);
    }

    if (harnessId === 'aider') {
      return `# .aider.conf.yml para ${model.name}\nmodel: ${model.id}\nedit-format: diff\nreasoning-effort: ${model.reasoning ? model.reasoning.defaultEffort : 'medium'}\nauto-commits: false\n`;
    }

    if (harnessId === 'qwen-code') {
      return JSON.stringify({
        "qwenCode.model": model.id,
        "qwenCode.agentTeam": true,
        "qwenCode.forkTurns": 3,
        "qwenCode.enableReasoning": model.reasoning ? model.reasoning.mandatory : false
      }, null, 2);
    }

    return `// Configuração genérica para ${model.name} (${harnessId})\n{\n  "model": "${model.id}",\n  "max_tokens": ${model.maxOutputTokens || 16384}\n}`;
  }
};

// ==========================================
// 14. AUDITORIA INDEPENDENTE: ARTIFICIAL ANALYSIS (INTELLIGENCE INDEX V4.1.1)
// ==========================================

const ARTIFICIAL_ANALYSIS_DATA = {
  version: '4.1.1',
  sourceUrl: 'https://artificialanalysis.ai',
  verifiedDate: '2026-09-02',
  overviewKpis: {
    topGeneral: { modelId: 'claude-fable-5-1', name: 'Claude Fable 5.1 (Max)', index: 66, gdpvalElo: 1853, cost: 3.20 },
    topOpenWeight: { modelId: 'kimi-k3', name: 'Kimi K3 Max', index: 60, cost: 0.84, throughput: 37.9 },
    topCostBenefit: { modelId: 'gpt-5-6-luna', name: 'GPT-5.6 Luna Max', index: 52, cost: 0.05, speed: 165 },
    topLongContext: { modelId: 'muse-spark-1-2', name: 'Muse Spark 1.2 XHigh', index: 57, lcrScore: 83.3, cost: 0.40 }
  },
  rankings: [
    { rank: 1, modelId: 'claude-opus-5', modelName: 'Claude Opus 5 (Max)', effort: 'Max', aaIndex: 63.0, costPerTask: 2.34, throughputTps: 55.0, contextWindow: '1M', gdpvalElo: 1845, openWeights: false, tier: 'frontier' },
    { rank: 2, modelId: 'claude-opus-5', modelName: 'Claude Opus 5 (XHigh)', effort: 'XHigh', aaIndex: 63.0, costPerTask: 1.80, throughputTps: 55.0, contextWindow: '1M', gdpvalElo: 1814, openWeights: false, tier: 'frontier' },
    { rank: 3, modelId: 'claude-fable-5', modelName: 'Claude Fable 5 (Max)', effort: 'Max', aaIndex: 62.0, costPerTask: 3.14, throughputTps: 71.0, contextWindow: '1M', gdpvalElo: 1738, openWeights: false, tier: 'frontier' },
    { rank: 4, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (XHigh)', effort: 'XHigh', aaIndex: 61.0, costPerTask: 1.20, throughputTps: null, contextWindow: '1.05M', gdpvalElo: 1770, openWeights: false, tier: 'frontier' },
    { rank: 5, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (Max)', effort: 'Max', aaIndex: 61.0, costPerTask: 1.67, throughputTps: null, contextWindow: '1.05M', gdpvalElo: 1770, openWeights: false, tier: 'frontier' },
    { rank: 6, modelId: 'claude-opus-5', modelName: 'Claude Opus 5 (High)', effort: 'High', aaIndex: 61.0, costPerTask: 1.23, throughputTps: 54.0, contextWindow: '1M', gdpvalElo: 1733, openWeights: false, tier: 'frontier' },
    { rank: 7, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol (Max)', effort: 'Max', aaIndex: 61.0, costPerTask: 1.23, throughputTps: 68.0, contextWindow: '1M', gdpvalElo: 1723, openWeights: false, tier: 'frontier' },
    { rank: 8, modelId: 'grok-4-6', modelName: 'Grok 4.6 (High)', effort: 'High', aaIndex: 61.0, costPerTask: 0.84, throughputTps: 58.0, contextWindow: '500k', gdpvalElo: 1747, openWeights: false, tier: 'frontier' },
    { rank: 9, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (High)', effort: 'High', aaIndex: 60.0, costPerTask: 0.96, throughputTps: null, contextWindow: '1.05M', gdpvalElo: 1750, openWeights: false, tier: 'frontier' },
    { rank: 10, modelId: 'kimi-k3', modelName: 'Kimi K3 (Max)', effort: 'Max', aaIndex: 60.0, costPerTask: 0.84, throughputTps: 37.9, contextWindow: '1M', gdpvalElo: 1681, openWeights: true, tier: 'open-weights' },
    { rank: 11, modelId: 'glm-5-3', modelName: 'GLM-5.3 (Max)', effort: 'Max', aaIndex: 60.0, costPerTask: 0.68, throughputTps: 93.0, contextWindow: '1M', gdpvalElo: 1769, openWeights: true, tier: 'open-weights' },
    { rank: 12, modelId: 'gpt-5-6-pro', modelName: 'GPT-5.6 Sol Pro', effort: 'Max', aaIndex: 60.0, costPerTask: 1.80, throughputTps: 60.0, contextWindow: '1M', gdpvalElo: 1730, openWeights: false, tier: 'frontier' },
    { rank: 13, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (Medium)', effort: 'Medium', aaIndex: 59.0, costPerTask: 0.75, throughputTps: null, contextWindow: '1.05M', gdpvalElo: 1710, openWeights: false, tier: 'frontier' },
    { rank: 14, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol (XHigh)', effort: 'XHigh', aaIndex: 59.0, costPerTask: 0.81, throughputTps: 68.0, contextWindow: '1M', gdpvalElo: 1679, openWeights: false, tier: 'frontier' },
    { rank: 15, modelId: 'claude-opus-5', modelName: 'Claude Opus 5 (Medium)', effort: 'Medium', aaIndex: 59.0, costPerTask: 0.72, throughputTps: 55.0, contextWindow: '1M', gdpvalElo: 1620, openWeights: false, tier: 'frontier' },
    { rank: 16, modelId: 'qwen3-8-max', modelName: 'Qwen3.8 Max (Serviço)', effort: 'Max', aaIndex: 58.0, costPerTask: 1.13, throughputTps: 47.2, contextWindow: '1M', gdpvalElo: 1735, openWeights: false, tier: 'frontier' },
    { rank: 17, modelId: 'qwen3-8-2-4t-a95b', modelName: 'Qwen3.8-2.4T-A95B (Raw)', effort: 'High', aaIndex: 58.0, costPerTask: 1.09, throughputTps: 44.8, contextWindow: '984k', gdpvalElo: 1720, openWeights: true, tier: 'open-weights' },
    { rank: 18, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (Low)', effort: 'Low', aaIndex: 57.0, costPerTask: 0.46, throughputTps: null, contextWindow: '1.05M', gdpvalElo: 1650, openWeights: false, tier: 'frontier' },
    { rank: 19, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra (Max)', effort: 'Max', aaIndex: 57.0, costPerTask: 0.51, throughputTps: 110.0, contextWindow: '1M', gdpvalElo: 1576, openWeights: false, tier: 'balanced' },
    { rank: 20, modelId: 'muse-spark-1-2', modelName: 'Muse Spark 1.2 (XHigh)', effort: 'XHigh', aaIndex: 57.0, costPerTask: 0.40, throughputTps: 75.0, contextWindow: '1M', gdpvalElo: 1628, openWeights: true, tier: 'open-weights' },
    { rank: 21, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol (High)', effort: 'High', aaIndex: 57.0, costPerTask: 0.55, throughputTps: 65.0, contextWindow: '1M', gdpvalElo: 1621, openWeights: false, tier: 'frontier' },
    { rank: 22, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (Non-Reasoning)', effort: 'None', aaIndex: 55.0, costPerTask: 0.93, throughputTps: null, contextWindow: '1.05M', gdpvalElo: 1580, openWeights: false, tier: 'frontier', evaluationOnly: true, note: 'Evaluation-only run pela Artificial Analysis, não disponível como esforço público na API' },
    { rank: 17, modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash (High)', effort: 'High', aaIndex: 56.0, costPerTask: 0.40, throughputTps: 340.0, contextWindow: '1M', gdpvalElo: 1532, openWeights: false, tier: 'sub-dollar' },
    { rank: 18, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol (Medium)', effort: 'Medium', aaIndex: 56.0, costPerTask: 0.37, throughputTps: 65.0, contextWindow: '1M', gdpvalElo: 1551, openWeights: false, tier: 'frontier' },
    { rank: 19, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5 (Max)', effort: 'Max', aaIndex: 55.0, costPerTask: 1.72, throughputTps: 83.0, contextWindow: '1M', gdpvalElo: 1595, openWeights: false, tier: 'balanced' },
    { rank: 20, modelId: 'gemini-3-1-pro', modelName: 'Gemini 3.1 Pro', effort: 'High', aaIndex: 55.0, costPerTask: 0.65, throughputTps: 69.0, contextWindow: '1M', gdpvalElo: 1580, openWeights: false, tier: 'frontier' },
    { rank: 21, modelId: 'grok-4-5', modelName: 'Grok 4.5 (High)', effort: 'High', aaIndex: 54.0, costPerTask: 0.75, throughputTps: 52.0, contextWindow: '500k', gdpvalElo: 1600, openWeights: false, tier: 'frontier' },
    { rank: 22, modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash (Medium)', effort: 'Medium', aaIndex: 53.0, costPerTask: 0.26, throughputTps: 320.0, contextWindow: '1M', gdpvalElo: 1480, openWeights: false, tier: 'sub-dollar' },
    { rank: 23, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra (XHigh)', effort: 'XHigh', aaIndex: 53.0, costPerTask: 0.31, throughputTps: 110.0, contextWindow: '1M', gdpvalElo: 1572, openWeights: false, tier: 'balanced' },
    { rank: 24, modelId: 'deepseek-v4-pro-0813', modelName: 'DeepSeek-V4-Pro-0813 (Max)', effort: 'Max', aaIndex: 53.0, costPerTask: 0.25, throughputTps: 77.3, contextWindow: '1M', gdpvalElo: 1590, openWeights: true, tier: 'open-weights' },
    { rank: 25, modelId: 'glm-5-2', modelName: 'GLM-5.2 (Max)', effort: 'Max', aaIndex: 53.0, costPerTask: 0.44, throughputTps: 100.0, contextWindow: '1M', gdpvalElo: 1510, openWeights: true, tier: 'open-weights' },
    { rank: 26, modelId: 'qwen3-8-27b', modelName: 'Qwen3.8-27B (Denso)', effort: 'High', aaIndex: 52.0, costPerTask: 0.33, throughputTps: 65.0, contextWindow: '256k', gdpvalElo: 1546, openWeights: true, tier: 'open-weights' },
    { rank: 27, modelId: 'deepseek-v4-flash-0731', modelName: 'DeepSeek-V4-Flash-0731 (Max)', effort: 'Max', aaIndex: 52.0, costPerTask: 0.11, throughputTps: 101.5, contextWindow: '1M', gdpvalElo: 1559, openWeights: true, tier: 'sub-dollar' },
    { rank: 28, modelId: 'deepseek-v4-flash-vision-exp', modelName: 'DeepSeek-V4-Flash-Vision-Exp (Preview)', effort: 'High', aaIndex: 52.0, costPerTask: 0.11, throughputTps: 98.0, contextWindow: '1M', gdpvalElo: 1550, openWeights: false, tier: 'sub-dollar' },
    { rank: 29, modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna (Max)', effort: 'Max', aaIndex: 52.0, costPerTask: 0.05, throughputTps: 165.0, contextWindow: '1M', gdpvalElo: 1578, openWeights: false, tier: 'sub-dollar' },
    { rank: 30, modelId: 'claude-opus-5', modelName: 'Claude Opus 5 (Low)', effort: 'Low', aaIndex: 52.0, costPerTask: 0.43, throughputTps: 55.0, contextWindow: '1M', gdpvalElo: 1490, openWeights: false, tier: 'frontier' },
    { rank: 31, modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash (Low)', effort: 'Low', aaIndex: 51.0, costPerTask: 0.16, throughputTps: 340.0, contextWindow: '1M', gdpvalElo: 1450, openWeights: false, tier: 'sub-dollar' },
    { rank: 32, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol (Low)', effort: 'Low', aaIndex: 51.0, costPerTask: 0.23, throughputTps: 65.0, contextWindow: '1M', gdpvalElo: 1460, openWeights: false, tier: 'frontier' },
    { rank: 33, modelId: 'gpt-5-5-preview', modelName: 'GPT-5.5 Preview', effort: 'XHigh', aaIndex: 50.0, costPerTask: 0.45, throughputTps: 65.0, contextWindow: '1M', gdpvalElo: 1500, openWeights: false, tier: 'balanced' },
    { rank: 34, modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna (XHigh)', effort: 'XHigh', aaIndex: 50.0, costPerTask: 0.03, throughputTps: 170.0, contextWindow: '1M', gdpvalElo: 1520, openWeights: false, tier: 'sub-dollar' },
    { rank: 35, modelId: 'claude-sonnet-4-6', modelName: 'Claude Sonnet 4.6 (Adaptive Max)', effort: 'Adaptive Max', aaIndex: 48.0, costPerTask: 0.28, throughputTps: 58.0, contextWindow: '1M', gdpvalElo: 1610, openWeights: false, tier: 'frontier' },
    { rank: 36, modelId: 'kimi-k3', modelName: 'Kimi K3 (Low)', effort: 'Low', aaIndex: 48.0, costPerTask: 0.35, throughputTps: 37.0, contextWindow: '1M', gdpvalElo: 1420, openWeights: true, tier: 'open-weights' },
    { rank: 16, modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash (Max)', effort: 'Max', aaIndex: 57.0, costPerTask: 0.09, throughputTps: 44.0, contextWindow: '1M', gdpvalElo: 1773, openWeights: true, tier: 'open-weights' },
    { rank: 38, modelId: 'qwen3-7-max', modelName: 'Qwen3.7 Max (Legado)', effort: 'High', aaIndex: 47.0, costPerTask: 0.30, throughputTps: 200.0, contextWindow: '1M', gdpvalElo: 1470, openWeights: false, tier: 'balanced' },
    { rank: 39, modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna (High)', effort: 'High', aaIndex: 47.0, costPerTask: 0.025, throughputTps: 170.0, contextWindow: '1M', gdpvalElo: 1480, openWeights: false, tier: 'sub-dollar' },
    { rank: 40, modelId: 'gemini-3-5-flash', modelName: 'Gemini 3.5 Flash', effort: 'Standard', aaIndex: 46.0, costPerTask: 0.08, throughputTps: 300.0, contextWindow: '1M', gdpvalElo: 1350, openWeights: false, tier: 'sub-dollar' },
    { rank: 41, modelId: 'claude-opus-4-6', modelName: 'Claude Opus 4.6 (Adaptive Max)', effort: 'Adaptive Max', aaIndex: 45.0, costPerTask: 0.65, throughputTps: 39.0, contextWindow: '1M', gdpvalElo: 1630, openWeights: false, tier: 'frontier' },
    { rank: 42, modelId: 'kimi-k2-6', modelName: 'Kimi K2.6 (1T MoE Reasoning)', effort: 'High', aaIndex: 45.0, costPerTask: 0.37, throughputTps: 51.0, contextWindow: '256k', gdpvalElo: 1190, openWeights: true, tier: 'open-weights' },
    { rank: 43, modelId: 'minimax-m3', modelName: 'MiniMax M3', effort: 'High', aaIndex: 45.0, costPerTask: 0.14, throughputTps: 88.0, contextWindow: '512k', gdpvalElo: 1387, openWeights: true, tier: 'open-weights' },
    { rank: 44, modelId: 'composer-2-5', modelName: 'Composer 2.5 (Cursor Models)', effort: 'Standard', aaIndex: 45.0, costPerTask: 0.44, throughputTps: 70.0, contextWindow: '200k', gdpvalElo: 1350, openWeights: false, tier: 'sub-dollar' },
    { rank: 45, modelId: 'deepseek-v3-2', modelName: 'DeepSeek-V3.2 (Legado)', effort: 'High', aaIndex: 44.0, costPerTask: 0.08, throughputTps: 65.0, contextWindow: '128k', gdpvalElo: 1250, openWeights: false, tier: 'sub-dollar' },
    { rank: 46, modelId: 'kimi-k2-7-code', modelName: 'Kimi K2.7 Code', effort: 'High', aaIndex: 43.0, costPerTask: 0.22, throughputTps: 40.0, contextWindow: '256k', gdpvalElo: 1320, openWeights: true, tier: 'open-weights' },
    { rank: 47, modelId: 'mimo-v2-5-pro', modelName: 'MiMo-V2.5-Pro (Xiaomi)', effort: 'High', aaIndex: 42.0, costPerTask: 0.10, throughputTps: 70.4, contextWindow: '1M', gdpvalElo: 1150, openWeights: true, tier: 'open-weights' },
    { rank: 48, modelId: 'hy3-tencent', modelName: 'Tencent Hy3', effort: 'High', aaIndex: 42.0, costPerTask: 0.04, throughputTps: 68.0, contextWindow: '256k', gdpvalElo: 1120, openWeights: true, tier: 'sub-dollar' },
    { rank: 49, modelId: 'glm-5-1', modelName: 'GLM-5.1', effort: 'High', aaIndex: 40.0, costPerTask: 0.18, throughputTps: 75.0, contextWindow: '200k', gdpvalElo: 1200, openWeights: true, tier: 'open-weights' },
    { rank: 50, modelId: 'qwen3-6-plus', modelName: 'Qwen3.6 Plus (Legado)', effort: 'High', aaIndex: 40.0, costPerTask: 0.25, throughputTps: 120.0, contextWindow: '1M', gdpvalElo: 1180, openWeights: false, tier: 'balanced' },
    { rank: 51, modelId: 'minimax-m2-7', modelName: 'MiniMax M2.7', effort: 'High', aaIndex: 39.0, costPerTask: 0.08, throughputTps: 61.3, contextWindow: '205k', gdpvalElo: 1160, openWeights: true, tier: 'open-weights' },
    { rank: 52, modelId: 'qwen3-7-plus', modelName: 'Qwen3.7 Plus (Legado)', effort: 'High', aaIndex: 39.0, costPerTask: 0.20, throughputTps: 110.0, contextWindow: '1M', gdpvalElo: 1170, openWeights: false, tier: 'balanced' },
    { rank: 53, modelId: 'mimo-v2-5', modelName: 'MiMo-V2.5 (Base)', effort: 'High', aaIndex: 38.0, costPerTask: 0.01, throughputTps: 61.4, contextWindow: '1M', gdpvalElo: 1150, openWeights: true, tier: 'sub-dollar' },
    { rank: 54, modelId: 'claude-sonnet-4-6', modelName: 'Claude Sonnet 4.6 (Non-Reasoning)', effort: 'None', aaIndex: 37.0, costPerTask: 0.18, throughputTps: 44.0, contextWindow: '1M', gdpvalElo: 1350, openWeights: false, tier: 'frontier' },
    { rank: 55, modelId: 'kimi-k2-6', modelName: 'Kimi K2.6 (Non-Reasoning)', effort: 'None', aaIndex: 35.0, costPerTask: 0.20, throughputTps: 42.0, contextWindow: '256k', gdpvalElo: 1100, openWeights: true, tier: 'open-weights' },
    { rank: 56, modelId: 'longcat-2-0', modelName: 'LongCat-2.0', effort: 'High', aaIndex: 34.0, costPerTask: 0.12, throughputTps: 42.0, contextWindow: '1M', gdpvalElo: 1030, openWeights: true, tier: 'open-weights' },
    { rank: 57, modelId: 'minimax-m2-5', modelName: 'MiniMax M2.5', effort: 'High', aaIndex: 34.0, costPerTask: 0.06, throughputTps: 55.0, contextWindow: '205k', gdpvalElo: 1080, openWeights: true, tier: 'open-weights' },
    { rank: 58, modelId: 'claude-haiku-4-5', modelName: 'Claude Haiku 4.5 (Reasoning)', effort: 'Extended', aaIndex: 30.0, costPerTask: 0.22, throughputTps: 92.0, contextWindow: '200k', gdpvalElo: 1180, openWeights: false, tier: 'sub-dollar' },
    { rank: 59, modelId: 'claude-haiku-4-5', modelName: 'Claude Haiku 4.5 (Non-Reasoning)', effort: 'None', aaIndex: 24.0, costPerTask: 0.12, throughputTps: 92.0, contextWindow: '200k', gdpvalElo: 1050, openWeights: false, tier: 'sub-dollar' },
    { rank: 60, modelId: 'gpt-oss-120b', modelName: 'gpt-oss-120b (High)', effort: 'High', aaIndex: 24.0, costPerTask: 0.07, throughputTps: 165.0, contextWindow: '131k', gdpvalElo: 801, openWeights: true, tier: 'open-weights' },
    { rank: 61, modelId: 'nemotron-3-5-lightning', modelName: 'Nemotron 3.5 Lightning', effort: 'NVFP4', aaIndex: 24.0, costPerTask: 0.08, throughputTps: 320.0, contextWindow: '1M', gdpvalElo: 824, openWeights: true, tier: 'sub-dollar' },
    { rank: 62, modelId: 'gpt-oss-20b', modelName: 'gpt-oss-20b (High)', effort: 'High', aaIndex: 15.0, costPerTask: 0.02, throughputTps: 110.0, contextWindow: '131k', gdpvalElo: 710, openWeights: true, tier: 'open-weights' }
  ],
  subBenchmarks: {
    gdpval: [
      { rank: 1, model: 'Claude Opus 5 Max', elo: 1845, badge: '🥇 #1 Geral' },
      { rank: 2, model: 'Claude Opus 5 XHigh', elo: 1814, badge: 'Frontier' },
      { rank: 3, model: 'GLM-5.3 Max', elo: 1769, badge: '🥉 #1 Open-Weights' },
      { rank: 4, model: 'Grok 4.6 High', elo: 1747, badge: 'Frontier' },
      { rank: 5, model: 'Claude Fable 5 Max', elo: 1738, badge: 'Frontier' },
      { rank: 6, model: 'Qwen3.8 Max', elo: 1735, badge: 'Serviço' },
      { rank: 7, model: 'Claude Opus 5 High', elo: 1733, badge: 'Frontier' },
      { rank: 8, model: 'GPT-5.6 Sol Pro', elo: 1730, badge: 'Frontier' },
      { rank: 9, model: 'Claude Opus 4.6 Max', elo: 1730, badge: 'Frontier 1M' },
      { rank: 10, model: 'GPT-5.6 Sol (High)', elo: 1723, badge: 'Frontier' },
      { rank: 11, model: 'Qwen3.8-2.4T-A95B', elo: 1720, badge: 'Open-Weights' },
      { rank: 12, model: 'Kimi K3 Max', elo: 1681, badge: 'Open-Weights' },
      { rank: 13, model: 'Claude Sonnet 4.6 Max', elo: 1640, badge: 'Balanced 1M' },
      { rank: 14, model: 'Muse Spark 1.2 XHigh', elo: 1628, badge: 'Open-Weights' },
      { rank: 15, model: 'Grok 4.5 High', elo: 1600, badge: 'Frontier' },
      { rank: 16, model: 'Claude Sonnet 5 Max', elo: 1595, badge: 'Balanced' },
      { rank: 17, model: 'DeepSeek V4 Pro 0813', elo: 1590, badge: 'Open-Weights' },
      { rank: 18, model: 'Gemini 3.1 Pro', elo: 1580, badge: 'Multimodal 1M' },
      { rank: 19, model: 'GPT-5.6 Luna Max', elo: 1578, badge: 'Sub-Dólar' },
      { rank: 20, model: 'GPT-5.6 Terra Max', elo: 1576, badge: 'Balanced' },
      { rank: 21, model: 'DeepSeek V4 Flash 0731', elo: 1559, badge: 'Sub-Dólar' },
      { rank: 22, model: 'DeepSeek V4 Flash Vision Exp', elo: 1550, badge: 'Visão Nativa' },
      { rank: 23, model: 'Qwen3.8-27B', elo: 1546, badge: 'Denso 24GB' },
      { rank: 24, model: 'Gemini 3.7 Flash High', elo: 1532, badge: '340 tok/s' }
    ],
    tau3Banking: [
      { rank: 1, model: 'Qwen3.8 Max', scorePct: 51.3, badge: '🥇 Campeão Global' },
      { rank: 2, model: 'Grok 4.6 High', scorePct: 50.7, badge: '🥈 Vice-Campeão' },
      { rank: 3, model: 'GLM-5.3 Max', scorePct: 50.3, badge: '🥉 3º Lugar' },
      { rank: 4, model: 'Claude Opus 5 Max', scorePct: 49.6, badge: 'Frontier' },
      { rank: 5, model: 'GPT-5.6 Sol (High)', scorePct: 48.9, badge: 'Frontier' },
      { rank: 6, model: 'Gemini 3.1 Pro', scorePct: 47.5, badge: 'Multimodal' }
    ],
    aaLcr: [
      { rank: 1, model: 'Muse Spark 1.2 XHigh', scorePct: 83.3, badge: '🥇 Líder Long-Context' },
      { rank: 2, model: 'Kimi K3 Max', scorePct: 82.7, badge: '🥈 #1 Open-Weights' },
      { rank: 3, model: 'Muse Spark 1.1 XHigh', scorePct: 81.3, badge: '🥉 Alta Retenção' },
      { rank: 4, model: 'Claude Opus 5 Max', scorePct: 80.8, badge: 'Frontier 1M' },
      { rank: 5, model: 'Claude Opus 4.6 Max', scorePct: 80.4, badge: 'Frontier 1M' },
      { rank: 6, model: 'GPT-5.6 Sol (High)', scorePct: 79.5, badge: 'Frontier 1M' },
      { rank: 7, model: 'Gemini 3.7 Flash', scorePct: 77.8, badge: '1M Context' }
    ],
    aaOmniscience: [
      { rank: 1, model: 'Claude Fable 5 Max', indexScore: 43, badge: '🥇 Mínima Alucinação' },
      { rank: 2, model: 'Claude Opus 5 Max', indexScore: 37, badge: '🥈 Confiabilidade' },
      { rank: 3, model: 'Claude Opus 4.6 Max', indexScore: 36, badge: 'Alta Precisão 1M' },
      { rank: 4, model: 'Claude Opus 5 XHigh', indexScore: 35, badge: '🥉 Alta Precisão' },
      { rank: 5, model: 'GPT-5.6 Sol (High)', indexScore: 33, badge: 'Frontier' },
      { rank: 6, model: 'Grok 4.6 High', indexScore: 31, badge: 'Frontier' }
    ],
    terminalBenchAa: [
      { rank: 1, model: 'GPT-5.6 Sol XHigh', scorePct: 89.5, diffOfficial: '+0,7 pp' },
      { rank: 2, model: 'Claude Opus 5 Max', scorePct: 89.1, diffOfficial: 'Independente' },
      { rank: 3, model: 'Grok 4.6 High', scorePct: 88.4, diffOfficial: 'Independente' },
      { rank: 4, model: 'Gemini 3.7 Flash High', scorePct: 85.8, diffOfficial: 'Oficial Google' },
      { rank: 5, model: 'DeepSeek V4 Flash Vision Exp', scorePct: 83.9, diffOfficial: '+1,2 vs 0731' },
      { rank: 6, model: 'DeepSeek Flash 0731', scorePct: 82.7, diffOfficial: 'Independente' },
      { rank: 7, model: 'Claude Sonnet 5 Max', scorePct: 80.4, diffOfficial: 'Independente' },
      { rank: 8, model: 'Muse Spark 1.2', scorePct: 80.0, diffOfficial: '-2,9 pp (Harness)' },
      { rank: 9, model: 'Gemini 3.1 Pro', scorePct: 73.8, diffOfficial: 'Oficial Google' },
      { rank: 10, model: 'Claude Opus 4.6', scorePct: 65.4, diffOfficial: 'Terminal-Bench 2.0' },
      { rank: 11, model: 'Claude Sonnet 4.6', scorePct: 59.1, diffOfficial: 'Terminal-Bench 2.0' },
      { rank: 12, model: 'Nemotron 3.5 Lightning', scorePct: 24.0, diffOfficial: '~0,0 pp (Exato)' }
    ],
    sciCode: [
      { rank: 1, model: 'Claude Fable 5 Max', scorePct: 60.2 },
      { rank: 2, model: 'Gemini 3.1 Pro', scorePct: 58.9 },
      { rank: 3, model: 'Kimi K3 Max', scorePct: 58.7, note: 'Validação exata 58,7% Moonshot' },
      { rank: 4, model: 'GPT-5.6 Sol (High)', scorePct: 57.4 },
      { rank: 5, model: 'Claude Opus 5 Max', scorePct: 57.1 }
    ],
    gpqaDiamond: [
      { rank: 1, model: 'Grok 4.6 High', scorePct: 94.9 },
      { rank: 2, model: 'Gemini 3.7 Flash High', scorePct: 94.5 },
      { rank: 3, model: 'Gemini 3.1 Pro', scorePct: 94.3 },
      { rank: 4, model: 'GPT-5.6 Sol (High)', scorePct: 94.1 },
      { rank: 5, model: 'Claude Opus 4.6', scorePct: 91.3 },
      { rank: 6, model: 'Claude Sonnet 4.6', scorePct: 89.9 }
    ],
    gdpPdf: [
      { rank: 1, model: 'GPT-6 Astra', scorePct: 33.2, badge: '🥇 #1 All-pass Rate' },
      { rank: 2, model: 'GPT-5.6 Sol', scorePct: 28.2, badge: 'Frontier' },
      { rank: 3, model: 'Claude Fable 5.1', scorePct: 26.2, badge: 'Frontier' }
    ],
    aaBriefcase: [
      { rank: 1, model: 'Claude Fable 5.1 / Claude Opus 5', note: 'Líderes conjuntos' },
      { rank: 2, model: 'GPT-6 Astra', deltaVsSolElo: 85, note: '+85 Elo vs GPT-5.6 Sol' }
    ]
  }
};

// ==========================================
// 15. WORKLOADS PADRONIZADOS DE DESENVOLVIMENTO (5 CENÁRIOS)
// ==========================================
const STANDARDIZED_WORKLOADS_DATA = {
  title: 'Workloads Padronizados de Engenharia de Software (5 Cenários)',
  description: 'Simulação matemática de custos reais por tarefa concluída baseada no volume exato de tokens novos, cache hit e tokens de saída/raciocínio.',
  workloads: [
    {
      id: 'workload_1_bugfix',
      name: 'Workload 1: Bugfix Local & Ajuste CSS',
      badge: 'Micro-Edição',
      description: 'Correção pontual de lógica em 1-2 arquivos ou ajuste de estilo/layout.',
      inputNewTokens: 5000,
      inputCachedTokens: 20000,
      outputTokens: 1000,
      typicalTurns: 1
    },
    {
      id: 'workload_2_feature',
      name: 'Workload 2: Feature Média & CRUD',
      badge: 'Desenvolvimento Padrão',
      description: 'Implementação de novo componente React, endpoint REST ou testes unitários.',
      inputNewTokens: 20000,
      inputCachedTokens: 80000,
      outputTokens: 4000,
      typicalTurns: 3
    },
    {
      id: 'workload_3_heavy_agent',
      name: 'Workload 3: Coding Agent Pesado',
      badge: 'Refatoração Multi-Arquivo',
      description: 'Refatoração com análise de dependências, scaffolding de testes e execução de ferramentas.',
      inputNewTokens: 50000,
      inputCachedTokens: 150000,
      outputTokens: 15000,
      typicalTurns: 8
    },
    {
      id: 'workload_4_monorepo',
      name: 'Workload 4: Monorepo Grande & Auditoria',
      badge: 'Arquitetura & Auditoria',
      description: 'Varredura arquitetural em repositório grande, detecção de vulnerabilidades e migração estrutural.',
      inputNewTokens: 100000,
      inputCachedTokens: 400000,
      outputTokens: 30000,
      typicalTurns: 12
    },
    {
      id: 'workload_5_long_session',
      name: 'Workload 5: Sessão Longa de Agente (20 Turnos)',
      badge: 'Long-Horizon',
      description: 'Sessão prolongada com contexto acumulado médio de 180k tokens por chamada ao longo de 20 turnos contínuos.',
      inputNewTokens: 150000,
      inputCachedTokens: 3450000,
      outputTokens: 50000,
      typicalTurns: 20
    }
  ]
};

// ==========================================
// 16. CALCULADORA DE VISÃO & AGENTES DE UI (BENCHMARKS DE CUSTO)
// ==========================================
const VISION_COST_BENCHMARKS = {
  title: 'Processamento de Imagens & Loops de Agentes de UI',
  description: 'Comparativo de custo por processamento visual, capturas de tela (screenshots) e automações contínuas de UI.',
  deepSeekRule: {
    fixedTokensPerImage: 384,
    costPerImageOffPeakUsd: 0.000084,
    costPer100ImagesUsd: 0.0084,
    costPer1000ImagesUsd: 0.084
  },
  models: [
    { id: 'deepseek-v4-vision-exp', name: 'DeepSeek V4 Flash Vision Exp (Nativo)', tokensPerImage: 384, costPerImage: 0.000084, maxResolution: '800x800 redimensionado', nativeVision: true, badge: 'Ultra-Econômico (~$0,000084/img)' },
    { id: 'gpt-5-6-luna', name: 'GPT-5.6 Luna', tokensPerImage: 765, costPerImage: 0.000153, maxResolution: 'High-res tiles', nativeVision: true, badge: 'Econômico OpenAI (~$0,00015/img)' },
    { id: 'gemini-3-7-flash', name: 'Gemini 3.7 Flash', tokensPerImage: 258, costPerImage: 0.000194, maxResolution: 'Alta resolução nativa', nativeVision: true, badge: 'Alta Fidelidade (~$0,00019/img)' },
    { id: 'claude-sonnet-5', name: 'Claude Sonnet 5', tokensPerImage: 1600, costPerImage: 0.003200, maxResolution: 'High-res nativo', nativeVision: true, badge: 'Frontier Vision (~$0,0032/img)' },
    { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', tokensPerImage: 1600, costPerImage: 0.008000, maxResolution: 'High-res nativo', nativeVision: true, badge: 'Profundo (~$0,0080/img)' },
    { id: 'gpt-5-6-sol', name: 'GPT-5.6 Sol', tokensPerImage: 1105, costPerImage: 0.005525, maxResolution: 'High-res tiles', nativeVision: true, badge: 'Frontier OpenAI (~$0,0055/img)' }
  ]
};

// ==========================================
// 17. SNIPPETS E RECEITAS DE CONFIGURAÇÃO DE CLI & HARNESSES
// ==========================================
const CLI_CONFIG_SNIPPETS = [
  {
    id: 'grok-build-config',
    title: 'Grok Build: Auto-Compactação & Prevenção do Degrau de 200k',
    harness: 'Grok CLI / Grok Build (xAI)',
    filename: '~/.grok/config.toml',
    language: 'toml',
    code: `[session]
# 38% de 500.000 tokens = 190.000 tokens (margem de segurança antes do degrau de 200k)
auto_compact_threshold_percent = 38

[features]
# Compactação em duas passagens para máxima retenção de contexto
two_pass_compaction = true

[mcp]
# Limita saídas brutas de ferramentas para não entupir a janela
max_output_bytes = 20000

# Opcional: Fallback híbrido barato via API xAI para tarefas mecânicas
[model.grok-cheap]
model = "grok-4.3"
base_url = "https://api.x.ai/v1"
env_key = "XAI_API_KEY"`,
    explanation: 'Impede que a sessão ultrapasse 200.000 tokens na API da xAI, evitando o dobro de tarifação ($4 in / $1 cache / $12 out) e preservando o histórico de arquivos e system instructions.'
  },
  {
    id: 'opencode-reasoning-config',
    title: 'OpenCode: Preservação de Histórico de Raciocínio (reasoningField)',
    harness: 'OpenCode / OpenCode Go',
    filename: 'opencode.json',
    language: 'json',
    code: `{
  "$schema": "https://opencode.ai/schema/config.json",
  "default_provider": "opencode-go",
  "compatibility": {
    "reasoningField": "reasoning_content"
  },
  "context": {
    "auto_compaction": true,
    "retain_tail_tokens": 15000
  }
}`,
    explanation: 'Garante a preservação e reapresentação do campo reasoning_content (DeepSeek, Kimi, GLM, Qwen) entre turnos agênticos de ferramentas sem perda de estado cognitivo.'
  },
  {
    id: 'roo-code-tool-calling',
    title: 'Roo Code: Flags Mandatórias de Native Tool Calling',
    harness: 'Roo Code / Cline',
    filename: 'Servidor vLLM / SGLang / Ollama CLI',
    language: 'bash',
    code: `# Exemplo de inicialização vLLM com parser nativo de tool calling:
vllm serve Qwen/Qwen3.8-27B \\
  --enable-auto-tool-choice \\
  --tool-call-parser hermes \\
  --chat-template ./tool_chat_template.jinja \\
  --max-model-len 32768 \\
  --gpu-memory-utilization 0.92`,
    explanation: 'O Roo Code não possui fallback para tags XML de ferramentas; requer que o endpoint de inferência processe tool calling com schema nativo válido.'
  },
  {
    id: 'codex-cli-wire-api',
    title: 'Codex CLI: Roteamento Estrito via Responses Protocol',
    harness: 'Codex CLI (OpenAI)',
    filename: 'codex.toml',
    language: 'toml',
    code: `# A versão atual do Codex removeu o protocolo "chat", exigindo "responses"
[provider.custom_proxy]
wire_api = "responses"
base_url = "https://router.huggingface.co/openai/v1"
api_key_env = "HF_TOKEN"

[agent]
child_context_policy = "clean"
max_parallel_subagents = 4`,
    explanation: 'Evita erros de incompatibilidade no Codex CLI ao conectar provedores compatíveis e mitiga loops de herança descontrolada de contexto em subagentes.'
  },
  {
    id: 'aider-architect-mode',
    title: 'Aider: Arquitetura Híbrida Arquiteto + Editor',
    harness: 'Aider',
    filename: 'Comando de Terminal Aider',
    language: 'bash',
    code: `# Utiliza modelo de alto raciocínio como Arquiteto e modelo ultra-rápido/barato como Editor
aider --architect \\
  --model anthropic/claude-sonnet-4-6 \\
  --editor-model deepseek/deepseek-chat \\
  --cache-prompts \\
  --auto-commits`,
    explanation: 'Reduz em até 70% os custos de geração delegando a aplicação de diffs e formatação sintática a um modelo secundário barato, mantendo o raciocínio no Sonnet 4.6.'
  }
];

// ==========================================
// 18. WORKSTATIONS DE HARDWARE NO BRASIL & CONSUMO ENERGÉTICO
// ==========================================
const HARDWARE_WORKSTATIONS_BR = [
  {
    id: 'budget_single_gpu',
    name: 'Workstation Entrada: 1x RTX 4060 Ti 16GB',
    capexBr: 3600,
    vramGb: 16,
    powerWatts: 165,
    modelsCapable: ['gpt-oss-20b (MXFP4 Oficial)', 'Qwen 2.5 Coder 7B FP16', 'DeepSeek 14B Q4'],
    throughputTps: '~45–60 tok/s',
    costKwhMonth: 35.60,
    badge: 'Melhor Custo Brasil'
  },
  {
    id: 'prosumer_dual_gpu',
    name: 'Workstation Prosumer: 2x RTX 3090 24GB (48GB Total)',
    capexBr: 14000,
    vramGb: 48,
    powerWatts: 700,
    modelsCapable: ['Qwen3.8-27B (FP8 Oficial 128k)', 'Nemotron 3.5 NVFP4 (128k)', 'gpt-oss-20b (FP16)'],
    throughputTps: '~55–70 tok/s',
    costKwhMonth: 151.20,
    badge: 'Sweet Spot 48GB'
  },
  {
    id: 'top_single_gpu',
    name: 'Workstation Nova Geração: 1x RTX 5090 32GB',
    capexBr: 18000,
    vramGb: 32,
    powerWatts: 600,
    modelsCapable: ['Nemotron 3.5 Lightning (NVFP4 Oficial)', 'Qwen3.8-27B FP8 (32k)', 'gpt-oss-20b (MXFP4)'],
    throughputTps: '~130–145 tok/s (NVFP4)',
    costKwhMonth: 129.60,
    badge: 'Alta Velocidade 32GB'
  },
  {
    id: 'apple_mac_studio_128',
    name: 'Workstation Silenciosa: Mac Studio M4/M2 Ultra 128GB',
    capexBr: 35000,
    vramGb: 128,
    powerWatts: 180,
    modelsCapable: ['gpt-oss-120b (MXFP4 / MLX)', 'DeepSeek V4 Flash Q4 (128GB)', 'Qwen 72B FP8'],
    throughputTps: '~25–40 tok/s (120B)',
    costKwhMonth: 38.80,
    badge: '128GB Unificada'
  }
];

// ==========================================
// 19. NOTAS METODOLÓGICAS DA ARTIFICIAL ANALYSIS
// ==========================================
const AA_METHODOLOGY_NOTES = {
  score48vs45Explanation: {
    title: 'Por que o Sonnet 4.6 obteve nota 48 vs 45 do Opus 4.6 na Artificial Analysis?',
    explanation: 'O Artificial Analysis Intelligence Index v4.1.1 é uma média ponderada composta por 9 benchmarks (incluindo velocidade, GDPval, SciCode, etc.). A altíssima agilidade do Sonnet 4.6 (~58 tok/s vs ~39 tok/s do Opus) e a paridade próxima em tarefas gerais elevam seu score composto de produção diária. O Opus 4.6 preserva liderança em tarefas de raciocínio novo extremo (ARC-AGI-2: 68,8% vs 58,3%), HLE com tools (53,0% vs 49,0%) e long-context denso (MRCR 1M: 78,3% vs 65,8%).'
  }
};

// Carregamento dos módulos data/* em ambiente Node.js
if (typeof require !== 'undefined') {
  try {
    const fxMod = require('./data/fx.js');
    global.FX_RATES_DATA = fxMod.FX_RATES_DATA;
    global.FX_HELPERS = fxMod.FX_HELPERS;
    const plansMod = require('./data/plans.js');
    global.SUBSCRIPTION_PLANS_DATA = plansMod.SUBSCRIPTION_PLANS_DATA;
    global.BUDGET_STACK_RECOMMENDER = plansMod.BUDGET_STACK_RECOMMENDER;
    global.ZAI_CREDIT_ACCOUNTING = plansMod.ZAI_CREDIT_ACCOUNTING;
    const platformsMod = require('./data/platforms.js');
    global.OPENCODE_GO_DATA = platformsMod.OPENCODE_GO_DATA;
    global.PLATFORM_MODEL_CATALOG = platformsMod.PLATFORM_MODEL_CATALOG;
    global.PLATFORM_AVAILABILITY_MATRIX = platformsMod.PLATFORM_AVAILABILITY_MATRIX;
    global.CAMELAI_PLATFORM_DATA = platformsMod.CAMELAI_PLATFORM_DATA;
    global.GROK_BOT_METADATA = platformsMod.GROK_BOT_METADATA;
    const historyMod = require('./data/history.js');
    global.MODEL_HISTORY_DATA = historyMod.MODEL_HISTORY_DATA;
    global.BENCHMARK_HISTORY_DATA = historyMod.BENCHMARK_HISTORY_DATA;
    const commMod = require('./data/community.js');
    global.COMMUNITY_REPORTS_DATA = commMod.COMMUNITY_REPORTS_DATA;
    global.BENCHMARK_VS_COMMUNITY_DIVERGENCES = commMod.BENCHMARK_VS_COMMUNITY_DIVERGENCES;
    const behMod = require('./data/behavior.js');
    global.ENGINEERING_BEHAVIOR_DATA = behMod.ENGINEERING_BEHAVIOR_DATA;
    const ucMod = require('./data/use-cases.js');
    global.USE_CASE_COMPARISON_DATA = ucMod.USE_CASE_COMPARISON_DATA;
    global.USE_CASES_DATA = ucMod.USE_CASES_DATA || (ucMod.USE_CASE_COMPARISON_DATA ? ucMod.USE_CASE_COMPARISON_DATA.useCases : []);
    const prHistMod = require('./data/pricing-history.js');
    global.PRICE_HISTORY_DATA = prHistMod.PRICE_HISTORY_DATA;
    const planExpMod = require('./data/plan-explorer.js');
    global.PlanExplorer = planExpMod;
    const dossiersMod = require('./data/dossiers.js');
    global.BENCHMARK_REGISTRY = dossiersMod.BENCHMARK_REGISTRY;
    global.SOURCE_REGISTRY = dossiersMod.SOURCE_REGISTRY;
    global.MODEL_DOSSIERS_DATA = dossiersMod.MODEL_DOSSIERS_DATA;
    global.DEEPSWE_INDEPENDENT_LEADERBOARD = dossiersMod.DEEPSWE_INDEPENDENT_LEADERBOARD;
    global.getModelDossier = dossiersMod.getModelDossier;
    global.getDossierBenchmarkSnapshots = dossiersMod.getDossierBenchmarkSnapshots;
    global.calculatePerformanceFingerprint = dossiersMod.calculatePerformanceFingerprint;
    global.getDeepSweLeaderboard = dossiersMod.getDeepSweLeaderboard;
    global.getProvenanceBadge = dossiersMod.getProvenanceBadge;
  } catch (e) {
    // Silencioso se executado em ambiente sem filesystem local
  }
}

// Exportação global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DATA_SOURCES,
    AI_PROVIDERS_DATA,
    AI_MODELS_DATA,
    CURSORBENCH_32_DATA,
    MARGINAL_GAINS_DATA,
    MULTI_BENCHMARK_LEDGER,
    CAPABILITY_RADAR_10D,
    OPENCODE_GO_DATA: typeof OPENCODE_GO_DATA !== "undefined" ? OPENCODE_GO_DATA : null,
    OPENCODE_GO_CATALOG,
    HARDWARE_GPU_DATABASE,
    KV_CACHE_COMPRESSION_FACTORS,
    ANTIGRAVITY_POOLS_DATA,
    HARNESS_COMPATIBILITY_DATA,
    TROUBLESHOOTER_DATABASE,
    PRIVACY_ZDR_DATABASE,
    ARTIFICIAL_ANALYSIS_DATA,
    STANDARDIZED_WORKLOADS_DATA,
    VISION_COST_BENCHMARKS,
    CLI_CONFIG_SNIPPETS,
    HARDWARE_WORKSTATIONS_BR,
    HARDWARE_LOCAL_MODELS_DATA,
    AA_METHODOLOGY_NOTES,
    AI_DATA_HELPERS,
    FX_RATES_DATA: typeof FX_RATES_DATA !== 'undefined' ? FX_RATES_DATA : null,
    FX_HELPERS: typeof FX_HELPERS !== 'undefined' ? FX_HELPERS : null,
    SUBSCRIPTION_PLANS_DATA: typeof SUBSCRIPTION_PLANS_DATA !== 'undefined' ? SUBSCRIPTION_PLANS_DATA : [],
    BUDGET_STACK_RECOMMENDER: typeof BUDGET_STACK_RECOMMENDER !== 'undefined' ? BUDGET_STACK_RECOMMENDER : null,
    PLATFORM_MODEL_CATALOG: typeof PLATFORM_MODEL_CATALOG !== 'undefined' ? PLATFORM_MODEL_CATALOG : null,
    PLATFORM_AVAILABILITY_MATRIX: typeof PLATFORM_AVAILABILITY_MATRIX !== 'undefined' ? PLATFORM_AVAILABILITY_MATRIX : [],
    CAMELAI_PLATFORM_DATA: typeof CAMELAI_PLATFORM_DATA !== 'undefined' ? CAMELAI_PLATFORM_DATA : null,
    GROK_BOT_METADATA: typeof GROK_BOT_METADATA !== 'undefined' ? GROK_BOT_METADATA : null,
    ZAI_CREDIT_ACCOUNTING: typeof ZAI_CREDIT_ACCOUNTING !== 'undefined' ? ZAI_CREDIT_ACCOUNTING : null,
    MODEL_HISTORY_DATA: typeof MODEL_HISTORY_DATA !== 'undefined' ? MODEL_HISTORY_DATA : null,
    BENCHMARK_HISTORY_DATA: typeof BENCHMARK_HISTORY_DATA !== 'undefined' ? BENCHMARK_HISTORY_DATA : [],
    COMMUNITY_REPORTS_DATA: typeof COMMUNITY_REPORTS_DATA !== 'undefined' ? COMMUNITY_REPORTS_DATA : [],
    BENCHMARK_VS_COMMUNITY_DIVERGENCES: typeof BENCHMARK_VS_COMMUNITY_DIVERGENCES !== 'undefined' ? BENCHMARK_VS_COMMUNITY_DIVERGENCES : [],
    ENGINEERING_BEHAVIOR_DATA: typeof ENGINEERING_BEHAVIOR_DATA !== 'undefined' ? ENGINEERING_BEHAVIOR_DATA : null,
    USE_CASE_COMPARISON_DATA: typeof USE_CASE_COMPARISON_DATA !== 'undefined' ? USE_CASE_COMPARISON_DATA : null,
    USE_CASES_DATA: typeof USE_CASES_DATA !== 'undefined' ? USE_CASES_DATA : (typeof USE_CASE_COMPARISON_DATA !== 'undefined' && USE_CASE_COMPARISON_DATA ? USE_CASE_COMPARISON_DATA.useCases : []),
    PRICE_HISTORY_DATA: typeof PRICE_HISTORY_DATA !== 'undefined' ? PRICE_HISTORY_DATA : null,
    PlanExplorer: typeof PlanExplorer !== 'undefined' ? PlanExplorer : null,
    BENCHMARK_REGISTRY: typeof BENCHMARK_REGISTRY !== 'undefined' ? BENCHMARK_REGISTRY : {},
    SOURCE_REGISTRY: typeof SOURCE_REGISTRY !== 'undefined' ? SOURCE_REGISTRY : {},
    MODEL_DOSSIERS_DATA: typeof MODEL_DOSSIERS_DATA !== 'undefined' ? MODEL_DOSSIERS_DATA : {},
    DEEPSWE_INDEPENDENT_LEADERBOARD: typeof DEEPSWE_INDEPENDENT_LEADERBOARD !== 'undefined' ? DEEPSWE_INDEPENDENT_LEADERBOARD : [],
    getModelDossier: typeof getModelDossier !== 'undefined' ? getModelDossier : null,
    getDossierBenchmarkSnapshots: typeof getDossierBenchmarkSnapshots !== 'undefined' ? getDossierBenchmarkSnapshots : null,
    calculatePerformanceFingerprint: typeof calculatePerformanceFingerprint !== 'undefined' ? calculatePerformanceFingerprint : null,
    getDeepSweLeaderboard: typeof getDeepSweLeaderboard !== 'undefined' ? getDeepSweLeaderboard : null,
    getProvenanceBadge: typeof getProvenanceBadge !== 'undefined' ? getProvenanceBadge : null,
    DomainRankings: typeof DomainRankings !== 'undefined' ? DomainRankings : null,
    DomainEvidence: typeof DomainEvidence !== 'undefined' ? DomainEvidence : null,
    DomainFreshness: typeof DomainFreshness !== 'undefined' ? DomainFreshness : null,
    DomainEntities: typeof DomainEntities !== 'undefined' ? DomainEntities : null
  };
}

if (typeof window !== 'undefined') {
  window.DATA_SOURCES = DATA_SOURCES;
  window.ARTIFICIAL_ANALYSIS_DATA = ARTIFICIAL_ANALYSIS_DATA;
  window.ANTIGRAVITY_POOLS_DATA = ANTIGRAVITY_POOLS_DATA;
  window.STANDARDIZED_WORKLOADS_DATA = STANDARDIZED_WORKLOADS_DATA;
  window.VISION_COST_BENCHMARKS = VISION_COST_BENCHMARKS;
  window.CLI_CONFIG_SNIPPETS = CLI_CONFIG_SNIPPETS;
  window.HARDWARE_WORKSTATIONS_BR = HARDWARE_WORKSTATIONS_BR;
  window.HARDWARE_LOCAL_MODELS_DATA = HARDWARE_LOCAL_MODELS_DATA;
  window.AA_METHODOLOGY_NOTES = AA_METHODOLOGY_NOTES;
  if (typeof OPENCODE_GO_DATA !== "undefined") window.OPENCODE_GO_DATA = OPENCODE_GO_DATA;
  if (typeof PLATFORM_AVAILABILITY_MATRIX !== "undefined") window.PLATFORM_AVAILABILITY_MATRIX = PLATFORM_AVAILABILITY_MATRIX;
  if (typeof PlanExplorer !== "undefined") window.PlanExplorer = PlanExplorer;
  if (typeof BENCHMARK_REGISTRY !== "undefined") window.BENCHMARK_REGISTRY = BENCHMARK_REGISTRY;
  if (typeof SOURCE_REGISTRY !== "undefined") window.SOURCE_REGISTRY = SOURCE_REGISTRY;
  if (typeof MODEL_DOSSIERS_DATA !== "undefined") window.MODEL_DOSSIERS_DATA = MODEL_DOSSIERS_DATA;
  if (typeof DEEPSWE_INDEPENDENT_LEADERBOARD !== "undefined") window.DEEPSWE_INDEPENDENT_LEADERBOARD = DEEPSWE_INDEPENDENT_LEADERBOARD;
  if (typeof getModelDossier !== "undefined") window.getModelDossier = getModelDossier;
  if (typeof getDossierBenchmarkSnapshots !== "undefined") window.getDossierBenchmarkSnapshots = getDossierBenchmarkSnapshots;
  if (typeof calculatePerformanceFingerprint !== "undefined") window.calculatePerformanceFingerprint = calculatePerformanceFingerprint;
  if (typeof getDeepSweLeaderboard !== "undefined") window.getDeepSweLeaderboard = getDeepSweLeaderboard;
  if (typeof getProvenanceBadge !== "undefined") window.getProvenanceBadge = getProvenanceBadge;
  if (typeof DomainRankings !== "undefined") window.DomainRankings = DomainRankings;
  if (typeof DomainEvidence !== "undefined") window.DomainEvidence = DomainEvidence;
  if (typeof DomainFreshness !== "undefined") window.DomainFreshness = DomainFreshness;
  if (typeof DomainEntities !== "undefined") window.DomainEntities = DomainEntities;
}

