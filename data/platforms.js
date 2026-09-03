/**
 * DATA PACK: DISPONIBILIDADE POR PLATAFORMA & CATÁLOGO OPENCODE GO
 * Data de Referência: 03/09/2026
 */

const PLATFORM_MODEL_CATALOG = {
  // ==========================================
  // 1. OPENCODE GO — CATÁLOGO COM QUOTAS ESTIMADAS
  // ==========================================
  opencodeGo: {
    platformName: 'OpenCode Go',
    planCostMonthlyUsd: 10,
    limitsDescription: 'Limites monetários de consumo calculados sobre valor de tabela: $12 em 5 horas, $30 semanal, $60 mensal.',
    catalog: [
      { id: 'opencode-grok-4-6', canonicalId: 'grok-4-6', displayName: 'Grok 4.6', multiplier: 5.0, req5h: 169, reqWeek: 423, reqMonth: 845, context: '1M', status: 'active' },
      { id: 'opencode-gpt-5-6-luna', canonicalId: 'gpt-5-6-luna', displayName: 'GPT-5.6 Luna', multiplier: 0.8, req5h: 2050, reqWeek: 5100, reqMonth: 10250, context: '1M', status: 'active' },
      { id: 'opencode-glm-5-3-flash', canonicalId: 'glm-5-3-flash', displayName: 'GLM-5.3-Flash (ex-Ox Alpha)', multiplier: 0.8, req5h: 1580, reqWeek: 3950, reqMonth: 7900, context: '1M', status: 'active' },
      { id: 'opencode-glm-5-3', canonicalId: 'glm-5-3', displayName: 'GLM-5.3', multiplier: 4.0, req5h: 220, reqWeek: 540, reqMonth: 1080, context: '1M', status: 'active' },
      { id: 'opencode-glm-5-2', canonicalId: 'glm-5-2', displayName: 'GLM-5.2', multiplier: 1.5, req5h: 880, reqWeek: 2150, reqMonth: 4300, context: '1M', status: 'active' },
      { id: 'opencode-glm-5-1', canonicalId: 'glm-5-1', displayName: 'GLM-5.1', multiplier: 1.5, req5h: 880, reqWeek: 2150, reqMonth: 4300, context: '200k', status: 'active' },
      { id: 'opencode-kimi-k3', canonicalId: 'kimi-k3', displayName: 'Kimi K3', multiplier: 6.0, req5h: 110, reqWeek: 250, reqMonth: 490, context: '1M', status: 'active' },
      { id: 'opencode-kimi-k2-7-code', canonicalId: 'kimi-k2-7-code', displayName: 'Kimi K2.7 Code', multiplier: 1.2, req5h: 1350, reqWeek: 3380, reqMonth: 6750, context: '256k', status: 'active' },
      { id: 'opencode-kimi-k2-6', canonicalId: 'kimi-k2-6', displayName: 'Kimi K2.6', multiplier: 1.4, req5h: 1150, reqWeek: 2880, reqMonth: 5750, context: '256k', status: 'active' },
      { id: 'opencode-longcat-2-0', canonicalId: 'longcat-2-0', displayName: 'LongCat-2.0', multiplier: 0.2, req5h: 11400, reqWeek: 28600, reqMonth: 57200, context: '1M', status: 'active' },
      { id: 'opencode-mimo-v2-5', canonicalId: 'mimo-v2-5', displayName: 'MiMo-V2.5 (Base)', multiplier: 0.05, req5h: 30100, reqWeek: 75200, reqMonth: 150400, context: '1M', status: 'active' },
      { id: 'opencode-mimo-v2-5-pro', canonicalId: 'mimo-v2-5-pro', displayName: 'MiMo-V2.5-Pro', multiplier: 0.6, req5h: 3250, reqWeek: 8150, reqMonth: 16300, context: '1M', status: 'active' },
      { id: 'opencode-minimax-m3', canonicalId: 'minimax-m3', displayName: 'MiniMax M3', multiplier: 0.7, req5h: 3200, reqWeek: 8000, reqMonth: 16000, context: '512k', status: 'active' },
      { id: 'opencode-minimax-m2-7', canonicalId: 'minimax-m2-7', displayName: 'MiniMax M2.7', multiplier: 0.6, req5h: 3400, reqWeek: 8500, reqMonth: 17000, context: '205k', status: 'active' },
      { id: 'opencode-muse-spark-1-2', canonicalId: 'muse-spark-1-2', displayName: 'Muse Spark 1.2 Contributor', multiplier: 0.03, req5h: 45300, reqWeek: 113300, reqMonth: 226600, context: '1M', status: 'active' },
      { id: 'opencode-qwen3-8-max', canonicalId: 'qwen3-8-max', displayName: 'Qwen3.8 Max', multiplier: 4.5, req5h: 160, reqWeek: 400, reqMonth: 810, context: '1M', status: 'active' },
      { id: 'opencode-qwen3-8-flash', canonicalId: null, displayName: 'Qwen3.8 Flash', multiplier: 0.3, req5h: 5400, reqWeek: 13500, reqMonth: 27000, context: '256k', status: 'active' },
      { id: 'opencode-qwen3-7-max', canonicalId: 'qwen3-7-max', displayName: 'Qwen3.7 Max', multiplier: 4.2, req5h: 170, reqWeek: 420, reqMonth: 840, context: '1M', status: 'legacy' },
      { id: 'opencode-qwen3-7-plus', canonicalId: 'qwen3-7-plus', displayName: 'Qwen3.7 Plus', multiplier: 0.4, req5h: 4300, reqWeek: 10800, reqMonth: 21600, context: '1M', status: 'legacy' },
      { id: 'opencode-qwen3-6-plus', canonicalId: 'qwen3-6-plus', displayName: 'Qwen3.6 Plus', multiplier: 0.5, req5h: 3300, reqWeek: 8200, reqMonth: 16300, context: '1M', status: 'legacy' },
      { id: 'opencode-deepseek-v4-pro', canonicalId: 'deepseek-v4-pro-0813', displayName: 'DeepSeek-V4-Pro (0813)', multiplier: 1.5, req5h: 1050, reqWeek: 2600, reqMonth: 5200, context: '1M', status: 'active' },
      { id: 'opencode-deepseek-v4-flash', canonicalId: 'deepseek-v4-flash-0731', displayName: 'DeepSeek-V4-Flash (0731)', multiplier: 0.2, req5h: 7600, reqWeek: 18900, reqMonth: 37800, context: '1M', status: 'active' },
      { id: 'opencode-deepseek-v4-flash-vision-exp', canonicalId: 'deepseek-v4-vision-exp', displayName: 'DeepSeek-V4-Flash-Vision-Exp', multiplier: 0.4, req5h: 3800, reqWeek: 9450, reqMonth: 18900, context: '1M', status: 'preview' },
      { id: 'opencode-hy4-preview', canonicalId: null, displayName: 'Tencent Hy4 Preview', multiplier: 1.2, req5h: 1350, reqWeek: 3380, reqMonth: 6770, context: '500k', status: 'preview' },
      { id: 'opencode-hy3', canonicalId: 'hy3-tencent', displayName: 'Tencent Hy3', multiplier: 0.4, req5h: 4300, reqWeek: 10750, reqMonth: 21500, context: '256k', status: 'active' }
    ]
  },

  // ==========================================
  // 2. CURSOR POOLS & INTEGRAÇÃO
  // ==========================================
  cursor: {
    platformName: 'Cursor IDE',
    pools: {
      cursorModels: {
        name: 'Cursor Models Pool',
        pricingModel: 'included-generous',
        description: 'Uso prioritário e generoso com taxa de requisições ampliada.',
        models: ['grok-4-6', 'grok-4-5', 'composer-2-5', 'gemini-3-8-flash']
      },
      otherModels: {
        name: 'Other Models ($20 Pool / Fast Requests)',
        pricingModel: 'metered-or-capped',
        description: '500 chamadas rápidas no plano Pro, 1.500 no Pro+, 10.000 no Ultra. Suporte a consumo on-demand a preços de API.',
        models: ['claude-fable-5-1', 'claude-opus-5', 'claude-sonnet-5', 'gpt-5-6-sol', 'gpt-5-6-terra', 'kimi-k3', 'glm-5-3']
      }
    }
  },

  // ==========================================
  // 3. GOOGLE ANTIGRAVITY POOLS
  // ==========================================
  antigravity: {
    platformName: 'Google Antigravity',
    pools: {
      pool1: {
        name: 'Pool 1: Gemini Models',
        description: 'Capacidade massiva e throughput nativo de 305 tok/s em 1 milhão de tokens.',
        models: ['gemini-3-8-flash', 'gemini-3-7-flash', 'gemini-3-5-flash']
      },
      pool2: {
        name: 'Pool 2: Claude & GPT Models (Compartilhado)',
        description: 'Cota compartilhada restrita para escalonamento crítico de profundidade de raciocínio.',
        models: ['claude-opus-4-6', 'claude-sonnet-4-6', 'gemini-3-1-pro']
      }
    }
  },

  // ==========================================
  // 4. MATRIZ GERAL DE DISPONIBILIDADE DOS 44 MODELOS
  // ==========================================
  availabilityMatrix: [
    { modelId: 'claude-fable-5-1', name: 'Claude Fable 5.1', directApi: '🟢 Sim ($10/$50)', cursor: '🟡 Other Models (Pro+/Ultra)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim (z-ai/claude-fable-5-1)', local: '🔴 Proprietário' },
    { modelId: 'claude-fable-5', name: 'Claude Fable 5', directApi: '🟡 Superseded ($10/$50)', cursor: '🟡 Superseded', opencode: '🟡 Cota 6x Restrita', antigravity: '🔴 Indisponível', openrouter: '🟡 Superseded', local: '🔴 Proprietário' },
    { modelId: 'claude-opus-5', name: 'Claude Opus 5', directApi: '🟢 Sim ($5/$25)', cursor: '🟢 Other Models (1.5x)', opencode: '🟡 Cota Restrita', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'claude-sonnet-5', name: 'Claude Sonnet 5', directApi: '🟢 Sim ($2/$10)', cursor: '🟢 Other Models (1.0x)', opencode: '🟢 Go (3.800 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'claude-opus-4-6', name: 'Claude Opus 4.6', directApi: '🟡 Legacy ($5/$25)', cursor: '🟡 Legacy', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 2 Compartilhado', openrouter: '🟡 Legacy', local: '🔴 Proprietário' },
    { modelId: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', directApi: '🟡 Legacy ($3/$15)', cursor: '🟡 Legacy', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 2 Compartilhado', openrouter: '🟡 Legacy', local: '🔴 Proprietário' },
    { modelId: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', directApi: '🟢 Sim ($1/$5)', cursor: '🟢 Other Models (1.0x)', opencode: '🟢 Go (12.000 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gemini-3-8-flash', name: 'Gemini 3.8 Flash', directApi: '🟢 Sim ($0.75/$3.75 promo)', cursor: '🟢 Cursor Models (Generoso)', opencode: '🟢 Go (8.200 req)', antigravity: '🟢 Pool 1 (Principal)', openrouter: '🟢 Sim', local: '🔴 Nuvem Google' },
    { modelId: 'gemini-3-7-flash', name: 'Gemini 3.7 Flash', directApi: '🟢 Sim ($0.75/$3.75)', cursor: '🟢 Cursor Models', opencode: '🟢 Go', antigravity: '🟢 Pool 1', openrouter: '🟢 Sim', local: '🔴 Nuvem Google' },
    { modelId: 'gemini-3-5-flash', name: 'Gemini 3.5 Flash', directApi: '🟢 Sim ($0.075/$0.30)', cursor: '🟢 Other Models', opencode: '🟢 Go', antigravity: '🟢 Pool 1', openrouter: '🟢 Sim', local: '🔴 Nuvem Google' },
    { modelId: 'gemini-3-1-pro', name: 'Gemini 3.1 Pro', directApi: '🟢 Sim ($1.25/$5.00)', cursor: '🟡 Other Models', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 2 (Base/Ultra)', openrouter: '🟢 Sim', local: '🔴 Nuvem Google' },
    { modelId: 'gpt-5-6-sol', name: 'GPT-5.6 Sol', directApi: '🟢 Sim ($4/$20)', cursor: '🟢 Other Models (2.0x)', opencode: '🟡 Cota Restrita', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gpt-5-6-terra', name: 'GPT-5.6 Terra', directApi: '🟢 Sim ($2/$12)', cursor: '🟢 Other Models (1.0x)', opencode: '🟢 Go (3.600 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gpt-5-6-luna', name: 'GPT-5.6 Luna', directApi: '🟢 Sim ($0.20/$1.20)', cursor: '🟢 Other Models', opencode: '🟢 Go (10.250 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gpt-5-6-pro', name: 'GPT-5.6 Sol Pro', directApi: '🟢 Sim ($15/$60)', cursor: '🟡 Other Models (2.0x)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gpt-oss-20b', name: 'gpt-oss-20b', directApi: '🟢 Open Weights', cursor: '🟢 Local via Ollama/vLLM', opencode: '🟢 OpenCode Local', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 100% Local (16GB VRAM)' },
    { modelId: 'gpt-oss-120b', name: 'gpt-oss-120b', directApi: '🟢 Open Weights', cursor: '🟢 Local via vLLM', opencode: '🟢 OpenCode Local', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 100% Local (80GB VRAM)' },
    { modelId: 'grok-4-6', name: 'Grok 4.6', directApi: '🟢 Sim ($2/$10)', cursor: '🟢 Cursor Models (Generoso)', opencode: '🟢 Go (845 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Nuvem xAI' },
    { modelId: 'grok-4-5', name: 'Grok 4.5', directApi: '🟢 Sim ($1/$5)', cursor: '🟢 Cursor Models', opencode: '🟢 Go', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Nuvem xAI' },
    { modelId: 'glm-5-3-flash', name: 'GLM-5.3-Flash (ex-Ox Alpha)', directApi: '🟢 Sim MIT ($0.15/$0.50)', cursor: '🟢 First-class (OpenRouter)', opencode: '🟢 Go (7.900 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 z-ai/glm-5.3-flash', local: '🟢 320B MoE (KTransformers)' },
    { modelId: 'glm-5-3', name: 'GLM-5.3', directApi: '🟢 Sim ($1/$3)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1.080 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'glm-5-2', name: 'GLM-5.2', directApi: '🟢 Sim ($0.60/$2)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (4.300 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'glm-5-1', name: 'GLM-5.1', directApi: '🟢 Sim ($0.40/$1.50)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (4.300 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'kimi-k3', name: 'Kimi K3', directApi: '🟢 Sim (¥ / $)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (490 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster 8x H100' },
    { modelId: 'kimi-k2-7-code', name: 'Kimi K2.7 Code', directApi: '🟢 Sim', cursor: '🟡 OpenRouter', opencode: '🟢 Go (6.750 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'kimi-k2-6', name: 'Kimi K2.6', directApi: '🟢 Sim', cursor: '🟡 OpenRouter', opencode: '🟢 Go (5.750 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'deepseek-v4-pro-0813', name: 'DeepSeek-V4-Pro', directApi: '🟢 Sim ($0.80/$2.40)', cursor: '🟢 OpenRouter / DeepSeek API', opencode: '🟢 Go (5.200 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster FP8' },
    { modelId: 'deepseek-v4-flash-0731', name: 'DeepSeek-V4-Flash', directApi: '🟢 Sim ($0.22/$0.66)', cursor: '🟢 OpenRouter / Direct API', opencode: '🟢 Go (37.800 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 304B MoE Local' },
    { modelId: 'deepseek-v4-vision-exp', name: 'DeepSeek-V4-Flash-Vision-Exp', directApi: '🟢 Sim ($0.22/$0.66)', cursor: '🟢 Direct API', opencode: '🟢 Go (18.900 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Preview de Pesquisa' },
    { modelId: 'deepseek-v3-2', name: 'DeepSeek-V3.2', directApi: '🟡 Legacy ($0.14/$0.28)', cursor: '🟡 Legacy', opencode: '🔴 Descontinuado', antigravity: '🔴 Indisponível', openrouter: '🟡 Legacy', local: '🟢 671B MoE' },
    { modelId: 'qwen3-8-max', name: 'Qwen3.8 Max', directApi: '🟢 Sim Alibaba Cloud', cursor: '🟡 OpenRouter', opencode: '🟢 Go (810 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Serviço Gerenciado' },
    { modelId: 'qwen3-8-2-4t-a95b', name: 'Qwen3.8-2.4T-A95B', directApi: '🟢 Open Weights Apache 2.0', cursor: '🟡 vLLM / SGLang', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster 4x-8x H100' },
    { modelId: 'qwen3-8-27b', name: 'Qwen3.8-27B', directApi: '🟢 Open Weights', cursor: '🟢 Ollama / vLLM', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 1x RTX 4090 / 32GB' },
    { modelId: 'qwen3-7-max', name: 'Qwen3.7 Max', directApi: '🟡 Legacy', cursor: '🟡 Legacy', opencode: '🟢 Go (840 req)', antigravity: '🔴 Indisponível', openrouter: '🟡 Legacy', local: '🔴 Serviço' },
    { modelId: 'mimo-v2-5-pro', name: 'MiMo-V2.5-Pro', directApi: '🟢 Sim ($0.40/$1.20)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (16.300 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster 500B' },
    { modelId: 'mimo-v2-5', name: 'MiMo-V2.5 (Base)', directApi: '🟢 Sim ($0.05/$0.15)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (150.400 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 160B MoE (KTransformers)' },
    { modelId: 'minimax-m3', name: 'MiniMax M3', directApi: '🟢 Sim ($0.40/$1.20)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (16.000 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster 420B' },
    { modelId: 'minimax-m2-7', name: 'MiniMax M2.7', directApi: '🟢 Sim ($0.20/$0.60)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (17.000 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 230B MoE Local' },
    { modelId: 'composer-2-5', name: 'Composer 2.5', directApi: '🔴 Exclusivo Cursor IDE', cursor: '🟢 Nativo Cursor Models', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🔴 Indisponível', local: '🔴 Proprietário Cursor' },
    { modelId: 'nemotron-3-5-lightning', name: 'Nemotron 3.5 Lightning', directApi: '🟢 NVIDIA NIM / Open Weights', cursor: '🟢 Local / NIM', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 1x RTX 4090 (NVFP4)' },
    { modelId: 'hy3-tencent', name: 'Tencent Hy3', directApi: '🟢 Sim ($0.14/$0.58)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (21.500 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 300B MoE Local' },
    { modelId: 'longcat-2-0', name: 'LongCat-2.0', directApi: '🟢 Sim ($0.10/$0.30)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (57.200 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Grande' },
    { modelId: 'muse-spark-1-2', name: 'Muse Spark 1.2', directApi: '🟢 Open Weights MIT', cursor: '🟡 OpenRouter', opencode: '🟢 Go (226.600 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 Local Multi-GPU' },
    { modelId: 'gpt-5-5-preview', name: 'GPT-5.5 Preview', directApi: '🟡 Superseded', cursor: '🟡 Superseded', opencode: '🔴 Descontinuado', antigravity: '🔴 Indisponível', openrouter: '🟡 Superseded', local: '🔴 Proprietário' }
  ]
};

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PLATFORM_MODEL_CATALOG };
}
