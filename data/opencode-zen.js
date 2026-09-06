
var normalizeOpencodeModelKey = (typeof normalizeOpencodeModelKey === 'function')
  ? normalizeOpencodeModelKey
  : function normalizeOpencodeModelKey(id) {
      if (!id) return '';
      const stripped = String(id).replace(/^opencode-go\//, '').replace(/^opencode\//, '').toLowerCase().replace(/\./g, '-');
      const aliases = {
        'deepseek-v4-pro': 'deepseek-v4-pro-0813',
        'deepseek-v4-flash': 'deepseek-v4-flash-0731',
        'deepseek-v4-flash-vision-exp': 'deepseek-v4-vision-exp'
      };
      return aliases[stripped] || stripped;
    };

/**
 * DATA PACK: CATÁLOGO OPENCODE ZEN (PAY-AS-YOU-GO + GRATUITOS)
 * Snapshot: 06/09/2026
 * Fontes: https://opencode.ai/docs/pt-br/zen/ (endpoints e preços)
 *         https://opencode.ai/zen/v1/models (IDs servíveis)
 * Janela de contexto: models.dev provider `opencode` quando o ID existe lá.
 * Não é o catálogo frontier de comparação (AI_MODELS_DATA); é o gateway Zen.
 */

const OPENCODE_ZEN_DATA = {
  metadata: {
    platformName: 'OpenCode Zen',
    sourceType: 'official',
    publisher: 'OpenCode',
    verifiedAt: '2026-09-06',
    documentationUrl: 'https://opencode.ai/docs/pt-br/zen/',
    modelsApiUrl: 'https://opencode.ai/zen/v1/models',
    endpointBaseUrl: 'https://opencode.ai/zen/v1/',
    billing: 'pay-as-you-go',
    autoReloadBelowUsd: 5,
    autoReloadAmountUsd: 20,
    workspaceModelGating: true,
    totalModels: 72,
    docsEndpointCount: 69,
    apiOnlyCount: 3,
    rulesSummary: 'Zen cobra por token (preço de custo + taxas de cartão). Admins do workspace podem desabilitar modelos. IDs usam o formato opencode/<model-id>. A tabela de endpoints da documentação é a lista curada; /zen/v1/models pode incluir SKUs extras ou omitir IDs ainda documentados.'
  },

  models: [
    {
      id: 'opencode/gpt-6-astra',
      modelId: 'gpt-6-astra',
      canonicalId: 'gpt-6-astra',
      displayName: "GPT 6 Astra",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1050000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 10, output: 50, cacheRead: 1, cacheWrite: 12.5 },
        extendedContext: { threshold: 272000, input: 20, output: 75, cacheRead: 2, cacheWrite: 25 }
      },
    },
    {
      id: 'opencode/gpt-5.6-sol',
      modelId: 'gpt-5.6-sol',
      canonicalId: 'gpt-5-6-sol',
      displayName: "GPT 5.6 Sol",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1050000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 2, output: 10, cacheRead: 0.2, cacheWrite: 2.5 },
        extendedContext: { threshold: 272000, input: 4, output: 15, cacheRead: 0.4, cacheWrite: 5 }
      },
      pricingNote: "Preços exibidos incluem 50% de desconto até 18/09/2026.",
    },
    {
      id: 'opencode/gpt-5.6-terra',
      modelId: 'gpt-5.6-terra',
      canonicalId: 'gpt-5-6-terra',
      displayName: "GPT 5.6 Terra",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1050000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 2, output: 12, cacheRead: 0.2, cacheWrite: 2.5 },
        extendedContext: { threshold: 272000, input: 4, output: 18, cacheRead: 0.4, cacheWrite: 5 }
      },
    },
    {
      id: 'opencode/gpt-5.6-luna',
      modelId: 'gpt-5.6-luna',
      canonicalId: 'gpt-5-6-luna',
      displayName: "GPT 5.6 Luna",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1050000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 0.2, output: 1.2, cacheRead: 0.02, cacheWrite: 0.25 },
        extendedContext: { threshold: 272000, input: 0.4, output: 1.8, cacheRead: 0.04, cacheWrite: 0.5 }
      },
    },
    {
      id: 'opencode/gpt-5.5',
      modelId: 'gpt-5.5',
      canonicalId: 'gpt-5-5',
      displayName: "GPT 5.5",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1050000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 5, output: 30, cacheRead: 0.5 },
        extendedContext: { threshold: 272000, input: 10, output: 45, cacheRead: 1 }
      },
    },
    {
      id: 'opencode/gpt-5.5-pro',
      modelId: 'gpt-5.5-pro',
      canonicalId: 'gpt-5-5-pro',
      displayName: "GPT 5.5 Pro",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1050000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 30, output: 180, cacheRead: 30 }
      },
    },
    {
      id: 'opencode/gpt-5.4',
      modelId: 'gpt-5.4',
      canonicalId: 'gpt-5-4',
      displayName: "GPT 5.4",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1050000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 2.5, output: 15, cacheRead: 0.25 },
        extendedContext: { threshold: 272000, input: 5, output: 22.5, cacheRead: 0.5 }
      },
    },
    {
      id: 'opencode/gpt-5.4-pro',
      modelId: 'gpt-5.4-pro',
      canonicalId: 'gpt-5-4-pro',
      displayName: "GPT 5.4 Pro",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1050000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 30, output: 180, cacheRead: 30 }
      },
    },
    {
      id: 'opencode/gpt-5.4-mini',
      modelId: 'gpt-5.4-mini',
      canonicalId: 'gpt-5-4-mini',
      displayName: "GPT 5.4 Mini",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 0.75, output: 4.5, cacheRead: 0.075 }
      },
    },
    {
      id: 'opencode/gpt-5.4-nano',
      modelId: 'gpt-5.4-nano',
      canonicalId: 'gpt-5-4-nano',
      displayName: "GPT 5.4 Nano",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 0.2, output: 1.25, cacheRead: 0.02 }
      },
    },
    {
      id: 'opencode/gpt-5.3-codex',
      modelId: 'gpt-5.3-codex',
      canonicalId: 'gpt-5-3-codex',
      displayName: "GPT 5.3 Codex",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 1.75, output: 14, cacheRead: 0.175 }
      },
    },
    {
      id: 'opencode/gpt-5.3-codex-spark',
      modelId: 'gpt-5.3-codex-spark',
      canonicalId: 'gpt-5-3-codex-spark',
      displayName: "GPT 5.3 Codex Spark",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 128000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 1.75, output: 14, cacheRead: 0.175 }
      },
    },
    {
      id: 'opencode/gpt-5.2',
      modelId: 'gpt-5.2',
      canonicalId: 'gpt-5-2',
      displayName: "GPT 5.2",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 1.75, output: 14, cacheRead: 0.175 }
      },
    },
    {
      id: 'opencode/gpt-5.2-codex',
      modelId: 'gpt-5.2-codex',
      canonicalId: 'gpt-5-2-codex',
      displayName: "GPT 5.2 Codex",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      deprecatedAt: '2026-07-23',
      zenPricing: {
        standard: { input: 1.75, output: 14, cacheRead: 0.175 }
      },
    },
    {
      id: 'opencode/gpt-5.1',
      modelId: 'gpt-5.1',
      canonicalId: 'gpt-5-1',
      displayName: "GPT 5.1",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 1.07, output: 8.5, cacheRead: 0.107 }
      },
    },
    {
      id: 'opencode/gpt-5.1-codex',
      modelId: 'gpt-5.1-codex',
      canonicalId: 'gpt-5-1-codex',
      displayName: "GPT 5.1 Codex",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      deprecatedAt: '2026-07-23',
      zenPricing: {
        standard: { input: 1.07, output: 8.5, cacheRead: 0.107 }
      },
    },
    {
      id: 'opencode/gpt-5.1-codex-max',
      modelId: 'gpt-5.1-codex-max',
      canonicalId: 'gpt-5-1-codex-max',
      displayName: "GPT 5.1 Codex Max",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      deprecatedAt: '2026-07-23',
      zenPricing: {
        standard: { input: 1.25, output: 10, cacheRead: 0.125 }
      },
    },
    {
      id: 'opencode/gpt-5.1-codex-mini',
      modelId: 'gpt-5.1-codex-mini',
      canonicalId: 'gpt-5-1-codex-mini',
      displayName: "GPT 5.1 Codex Mini",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      deprecatedAt: '2026-07-23',
      zenPricing: {
        standard: { input: 0.25, output: 2, cacheRead: 0.025 }
      },
    },
    {
      id: 'opencode/gpt-5',
      modelId: 'gpt-5',
      canonicalId: 'gpt-5',
      displayName: "GPT 5",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 1.07, output: 8.5, cacheRead: 0.107 }
      },
    },
    {
      id: 'opencode/gpt-5-codex',
      modelId: 'gpt-5-codex',
      canonicalId: 'gpt-5-codex',
      displayName: "GPT 5 Codex",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      deprecatedAt: '2026-07-23',
      zenPricing: {
        standard: { input: 1.07, output: 8.5, cacheRead: 0.107 }
      },
    },
    {
      id: 'opencode/gpt-5-nano',
      modelId: 'gpt-5-nano',
      canonicalId: 'gpt-5-nano',
      displayName: "GPT 5 Nano",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 400000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 0.05, output: 0.4, cacheRead: 0.005 }
      },
    },
    {
      id: 'opencode/claude-fable-5-1',
      modelId: 'claude-fable-5-1',
      canonicalId: 'claude-fable-5-1',
      displayName: "Claude Fable 5.1",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 10, output: 50, cacheRead: 0.25, cacheWrite: 12.5 }
      },
    },
    {
      id: 'opencode/claude-fable-5',
      modelId: 'claude-fable-5',
      canonicalId: 'claude-fable-5',
      displayName: "Claude Fable 5",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 10, output: 50, cacheRead: 1, cacheWrite: 12.5 }
      },
    },
    {
      id: 'opencode/claude-opus-5',
      modelId: 'claude-opus-5',
      canonicalId: 'claude-opus-5',
      displayName: "Claude Opus 5",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 }
      },
    },
    {
      id: 'opencode/claude-opus-4-8',
      modelId: 'claude-opus-4-8',
      canonicalId: 'claude-opus-4-8',
      displayName: "Claude Opus 4.8",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 }
      },
    },
    {
      id: 'opencode/claude-opus-4-7',
      modelId: 'claude-opus-4-7',
      canonicalId: 'claude-opus-4-7',
      displayName: "Claude Opus 4.7",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 }
      },
    },
    {
      id: 'opencode/claude-opus-4-6',
      modelId: 'claude-opus-4-6',
      canonicalId: 'claude-opus-4-6',
      displayName: "Claude Opus 4.6",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 }
      },
    },
    {
      id: 'opencode/claude-opus-4-5',
      modelId: 'claude-opus-4-5',
      canonicalId: 'claude-opus-4-5',
      displayName: "Claude Opus 4.5",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 200000,
      maxOutputTokens: 64000,
      zenPricing: {
        standard: { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 }
      },
    },
    {
      id: 'opencode/claude-sonnet-5',
      modelId: 'claude-sonnet-5',
      canonicalId: 'claude-sonnet-5',
      displayName: "Claude Sonnet 5",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 2, output: 10, cacheRead: 0.2, cacheWrite: 2.5 }
      },
    },
    {
      id: 'opencode/claude-sonnet-4-6',
      modelId: 'claude-sonnet-4-6',
      canonicalId: 'claude-sonnet-4-6',
      displayName: "Claude Sonnet 4.6",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 64000,
      zenPricing: {
        standard: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 }
      },
    },
    {
      id: 'opencode/claude-sonnet-4-5',
      modelId: 'claude-sonnet-4-5',
      canonicalId: 'claude-sonnet-4-5',
      displayName: "Claude Sonnet 4.5",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 64000,
      zenPricing: {
        standard: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 },
        extendedContext: { threshold: 200000, input: 6, output: 22.5, cacheRead: 0.6, cacheWrite: 7.5 }
      },
    },
    {
      id: 'opencode/claude-haiku-4-5',
      modelId: 'claude-haiku-4-5',
      canonicalId: 'claude-haiku-4-5',
      displayName: "Claude Haiku 4.5",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 200000,
      maxOutputTokens: 64000,
      zenPricing: {
        standard: { input: 1, output: 5, cacheRead: 0.1, cacheWrite: 1.25 }
      },
    },
    {
      id: 'opencode/gemini-3.8-flash',
      modelId: 'gemini-3.8-flash',
      canonicalId: 'gemini-3-8-flash',
      displayName: "Gemini 3.8 Flash",
      endpoint: '/models/gemini-3.8-flash',
      sdkPackage: '@ai-sdk/google',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 1.5, output: 7.5, cacheRead: 0.15 }
      },
    },
    {
      id: 'opencode/gemini-3.7-flash',
      modelId: 'gemini-3.7-flash',
      canonicalId: 'gemini-3-7-flash',
      displayName: "Gemini 3.7 Flash",
      endpoint: '/models/gemini-3.7-flash',
      sdkPackage: '@ai-sdk/google',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 1.5, output: 7.5, cacheRead: 0.15 }
      },
    },
    {
      id: 'opencode/gemini-3.6-flash',
      modelId: 'gemini-3.6-flash',
      canonicalId: 'gemini-3-6-flash',
      displayName: "Gemini 3.6 Flash",
      endpoint: '/models/gemini-3.6-flash',
      sdkPackage: '@ai-sdk/google',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 1.5, output: 7.5, cacheRead: 0.15 }
      },
    },
    {
      id: 'opencode/gemini-3.5-flash',
      modelId: 'gemini-3.5-flash',
      canonicalId: 'gemini-3-5-flash',
      displayName: "Gemini 3.5 Flash",
      endpoint: '/models/gemini-3.5-flash',
      sdkPackage: '@ai-sdk/google',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 1.5, output: 9, cacheRead: 0.15 }
      },
    },
    {
      id: 'opencode/gemini-3.5-flash-lite',
      modelId: 'gemini-3.5-flash-lite',
      canonicalId: 'gemini-3-5-flash-lite',
      displayName: "Gemini 3.5 Flash Lite",
      endpoint: '/models/gemini-3.5-flash-lite',
      sdkPackage: '@ai-sdk/google',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 0.3, output: 2.5, cacheRead: 0.03 }
      },
    },
    {
      id: 'opencode/gemini-3.1-pro',
      modelId: 'gemini-3.1-pro',
      canonicalId: 'gemini-3-1-pro',
      displayName: "Gemini 3.1 Pro",
      endpoint: '/models/gemini-3.1-pro',
      sdkPackage: '@ai-sdk/google',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 2, output: 12, cacheRead: 0.2 },
        extendedContext: { threshold: 200000, input: 4, output: 18, cacheRead: 0.4 }
      },
    },
    {
      id: 'opencode/gemini-3-flash',
      modelId: 'gemini-3-flash',
      canonicalId: 'gemini-3-flash',
      displayName: "Gemini 3 Flash",
      endpoint: '/models/gemini-3-flash',
      sdkPackage: '@ai-sdk/google',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 0.5, output: 3, cacheRead: 0.05 }
      },
    },
    {
      id: 'opencode/grok-4.6',
      modelId: 'grok-4.6',
      canonicalId: 'grok-4-6',
      displayName: "Grok 4.6",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 500000,
      maxOutputTokens: 500000,
      zenPricing: {
        standard: { input: 2, output: 6, cacheRead: 0.5 },
        extendedContext: { threshold: 200000, input: 4, output: 12, cacheRead: 1 }
      },
    },
    {
      id: 'opencode/grok-4.5',
      modelId: 'grok-4.5',
      canonicalId: 'grok-4-5',
      displayName: "Grok 4.5",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 500000,
      maxOutputTokens: 500000,
      zenPricing: {
        standard: { input: 2, output: 6, cacheRead: 0.3 },
        extendedContext: { threshold: 200000, input: 4, output: 12, cacheRead: 0.6 }
      },
    },
    {
      id: 'opencode/grok-build-0.1',
      modelId: 'grok-build-0.1',
      canonicalId: 'grok-build-0-1',
      displayName: "Grok Build 0.1",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 256000,
      maxOutputTokens: 256000,
      zenPricing: {
        standard: { input: 1, output: 2, cacheRead: 0.2 }
      },
    },
    {
      id: 'opencode/muse-spark-1.3',
      modelId: 'muse-spark-1.3',
      canonicalId: 'muse-spark-1-3',
      displayName: "Muse Spark 1.3",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 1.25, output: 4.25, cacheRead: 0.15 }
      },
    },
    {
      id: 'opencode/muse-spark-1.2',
      modelId: 'muse-spark-1.2',
      canonicalId: 'muse-spark-1-2',
      displayName: "Muse Spark 1.2",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 1.25, output: 4.25, cacheRead: 0.15 }
      },
    },
    {
      id: 'opencode/qwen3.7-max',
      modelId: 'qwen3.7-max',
      canonicalId: 'qwen3-7-max',
      displayName: "Qwen3.7 Max",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: false,
      zenPricing: {
        standard: { input: 2.5, output: 7.5, cacheRead: 0.5, cacheWrite: 3.125 }
      },
    },
    {
      id: 'opencode/qwen3.7-plus',
      modelId: 'qwen3.7-plus',
      canonicalId: 'qwen3-7-plus',
      displayName: "Qwen3.7 Plus",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: false,
      zenPricing: {
        standard: { input: 0.4, output: 1.6, cacheRead: 0.04, cacheWrite: 0.5 }
      },
    },
    {
      id: 'opencode/qwen3.6-plus',
      modelId: 'qwen3.6-plus',
      canonicalId: 'qwen3-6-plus',
      displayName: "Qwen3.6 Plus",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 262144,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 0.5, output: 3, cacheRead: 0.05, cacheWrite: 0.625 }
      },
    },
    {
      id: 'opencode/qwen3.5-plus',
      modelId: 'qwen3.5-plus',
      canonicalId: 'qwen3-5-plus',
      displayName: "Qwen3.5 Plus",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 262144,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 0.2, output: 1.2, cacheRead: 0.02, cacheWrite: 0.25 }
      },
    },
    {
      id: 'opencode/deepseek-v4-pro',
      modelId: 'deepseek-v4-pro',
      canonicalId: 'deepseek-v4-pro',
      displayName: "DeepSeek V4 Pro",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 384000,
      zenPricing: {
        standard: { input: 1.74, output: 3.48, cacheRead: 0.145 }
      },
    },
    {
      id: 'opencode/deepseek-v4-flash',
      modelId: 'deepseek-v4-flash',
      canonicalId: 'deepseek-v4-flash',
      displayName: "DeepSeek V4 Flash",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 384000,
      zenPricing: {
        standard: { input: 0.14, output: 0.28, cacheRead: 0.028 }
      },
    },
    {
      id: 'opencode/deepseek-v4-flash-vision-exp',
      modelId: 'deepseek-v4-flash-vision-exp',
      canonicalId: 'deepseek-v4-flash-vision-exp',
      displayName: "DeepSeek V4 Flash Vision Exp",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 384000,
      zenPricing: {
        standard: { input: 0.14, output: 0.28, cacheRead: 0.028 }
      },
    },
    {
      id: 'opencode/minimax-m3',
      modelId: 'minimax-m3',
      canonicalId: 'minimax-m3',
      displayName: "MiniMax M3",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 512000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 0.3, output: 1.2, cacheRead: 0.06 }
      },
    },
    {
      id: 'opencode/minimax-m2.7',
      modelId: 'minimax-m2.7',
      canonicalId: 'minimax-m2-7',
      displayName: "MiniMax M2.7",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 204800,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 0.3, output: 1.2, cacheRead: 0.06 }
      },
    },
    {
      id: 'opencode/minimax-m2.5',
      modelId: 'minimax-m2.5',
      canonicalId: 'minimax-m2-5',
      displayName: "MiniMax M2.5",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 204800,
      maxOutputTokens: 131072,
      deprecatedAt: '2026-08-05',
      zenPricing: {
        standard: { input: 0.3, output: 1.2, cacheRead: 0.06 }
      },
    },
    {
      id: 'opencode/glm-5.3-flash',
      modelId: 'glm-5.3-flash',
      canonicalId: 'glm-5-3-flash',
      displayName: "GLM 5.3 Flash",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 0.15, output: 0.5, cacheRead: 0.03 }
      },
    },
    {
      id: 'opencode/glm-5.3',
      modelId: 'glm-5.3',
      canonicalId: 'glm-5-3',
      displayName: "GLM 5.3",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 1.4, output: 4.4, cacheRead: 0.26 }
      },
    },
    {
      id: 'opencode/glm-5.2',
      modelId: 'glm-5.2',
      canonicalId: 'glm-5-2',
      displayName: "GLM 5.2",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 1.4, output: 4.4, cacheRead: 0.26 }
      },
    },
    {
      id: 'opencode/glm-5.1',
      modelId: 'glm-5.1',
      canonicalId: 'glm-5-1',
      displayName: "GLM 5.1",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 204800,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 1.4, output: 4.4, cacheRead: 0.26 }
      },
    },
    {
      id: 'opencode/glm-5',
      modelId: 'glm-5',
      canonicalId: 'glm-5',
      displayName: "GLM 5",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 204800,
      maxOutputTokens: 131072,
      deprecatedAt: '2026-05-14',
      zenPricing: {
        standard: { input: 1, output: 3.2, cacheRead: 0.2 }
      },
    },
    {
      id: 'opencode/kimi-k2.5',
      modelId: 'kimi-k2.5',
      canonicalId: 'kimi-k2-5',
      displayName: "Kimi K2.5",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 262144,
      maxOutputTokens: 65536,
      deprecatedAt: '2026-08-05',
      zenPricing: {
        standard: { input: 0.6, output: 3, cacheRead: 0.1 }
      },
    },
    {
      id: 'opencode/kimi-k2.6',
      modelId: 'kimi-k2.6',
      canonicalId: 'kimi-k2-6',
      displayName: "Kimi K2.6",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 262144,
      maxOutputTokens: 65536,
      zenPricing: {
        standard: { input: 0.95, output: 4, cacheRead: 0.16 }
      },
    },
    {
      id: 'opencode/kimi-k2.7-code',
      modelId: 'kimi-k2.7-code',
      canonicalId: 'kimi-k2-7-code',
      displayName: "Kimi K2.7 Code",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 262144,
      maxOutputTokens: 262144,
      zenPricing: {
        standard: { input: 0.95, output: 4, cacheRead: 0.19 }
      },
    },
    {
      id: 'opencode/kimi-k3',
      modelId: 'kimi-k3',
      canonicalId: 'kimi-k3',
      displayName: "Kimi K3",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'pay-as-you-go',
      status: 'active',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 3, output: 15, cacheRead: 0.3 }
      },
    },
    {
      id: 'opencode/big-pickle',
      modelId: 'big-pickle',
      canonicalId: 'big-pickle',
      displayName: "Big Pickle",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'free',
      status: 'free-limited',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 200000,
      maxOutputTokens: 32000,
      zenPricing: {
        standard: { input: 0, output: 0, cacheRead: 0 }
      },
      privacyNote: "Stealth gratuito por tempo limitado; dados podem ser usados para melhorar o modelo.",
    },
    {
      id: 'opencode/mimo-v2.5-free',
      modelId: 'mimo-v2.5-free',
      canonicalId: 'mimo-v2-5-free',
      displayName: "MiMo-V2.5 Free",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'free',
      status: 'free-limited',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 200000,
      maxOutputTokens: 32000,
      zenPricing: {
        standard: { input: 0, output: 0, cacheRead: 0 }
      },
      privacyNote: "Gratuito por tempo limitado; dados podem ser usados para melhorar o modelo.",
    },
    {
      id: 'opencode/ling-3.0-flash-fin-free',
      modelId: 'ling-3.0-flash-fin-free',
      canonicalId: 'ling-3-0-flash-fin-free',
      displayName: "Ling 3.0 Flash Fin Free",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'free',
      status: 'free-limited',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 262144,
      maxOutputTokens: 32768,
      zenPricing: {
        standard: { input: 0, output: 0, cacheRead: 0 }
      },
      privacyNote: "Gratuito por tempo limitado; dados podem ser usados para melhorar o modelo.",
    },
    {
      id: 'opencode/nemotron-3-ultra-free',
      modelId: 'nemotron-3-ultra-free',
      canonicalId: 'nemotron-3-ultra-free',
      displayName: "Nemotron 3 Ultra Free",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'free',
      status: 'free-limited',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 0, output: 0, cacheRead: 0 }
      },
      privacyNote: "Endpoint gratuito NVIDIA: apenas avaliação; uso registrado para segurança e melhoria de produto.",
    },
    {
      id: 'opencode/nemotron-3.5-lightning-free',
      modelId: 'nemotron-3.5-lightning-free',
      canonicalId: 'nemotron-3-5-lightning-free',
      displayName: "Nemotron 3.5 Lightning Free",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'free',
      status: 'free-limited',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 262144,
      maxOutputTokens: 262144,
      zenPricing: {
        standard: { input: 0, output: 0, cacheRead: 0 }
      },
      privacyNote: "Endpoint gratuito NVIDIA: apenas avaliação; uso registrado para segurança e melhoria de produto.",
    },
    {
      id: 'opencode/muse-spark-1.3-contributor-free',
      modelId: 'muse-spark-1.3-contributor-free',
      canonicalId: 'muse-spark-1-3-contributor-free',
      displayName: "Muse Spark 1.3 Contributor Free",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'free',
      status: 'free-limited',
      listedInDocsEndpoints: true,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 0, output: 0, cacheRead: 0 }
      },
      privacyNote: "Contributor: prompts e respostas podem treinar modelos futuros da Meta.",
    },
    {
      id: 'opencode/claude-sonnet-4',
      modelId: 'claude-sonnet-4',
      canonicalId: 'claude-sonnet-4',
      displayName: "Claude Sonnet 4",
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      billing: 'pay-as-you-go',
      status: 'deprecated',
      listedInDocsEndpoints: false,
      listedInApi: true,
      contextWindow: 1000000,
      maxOutputTokens: 64000,
      deprecatedAt: '2026-06-15',
      zenPricing: {
        standard: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 }
      },
    },
    {
      id: 'opencode/deepseek-v4-flash-free',
      modelId: 'deepseek-v4-flash-free',
      canonicalId: 'deepseek-v4-flash-free',
      displayName: "DeepSeek V4 Flash Free",
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      billing: 'free',
      status: 'free-limited',
      listedInDocsEndpoints: false,
      listedInApi: true,
      contextWindow: 200000,
      maxOutputTokens: 128000,
      zenPricing: {
        standard: { input: 0, output: 0, cacheRead: 0 }
      },
    },
    {
      id: 'opencode/muse-spark-1.2-contributor-free',
      modelId: 'muse-spark-1.2-contributor-free',
      canonicalId: 'muse-spark-1-2-contributor-free',
      displayName: "Muse Spark 1.2 Contributor Free",
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      billing: 'free',
      status: 'free-limited',
      listedInDocsEndpoints: false,
      listedInApi: true,
      contextWindow: 1048576,
      maxOutputTokens: 131072,
      zenPricing: {
        standard: { input: 0, output: 0, cacheRead: 0 }
      },
      privacyNote: "Contributor: prompts e respostas podem treinar modelos futuros da Meta.",
    }
  ],

  getModel(idOrCanonicalId) {
    if (!idOrCanonicalId) return null;
    const key = normalizeOpencodeModelKey(idOrCanonicalId);
    return this.models.find(m => {
      const ids = [m.id, m.modelId, m.canonicalId].filter(Boolean).map(normalizeOpencodeModelKey);
      return ids.includes(key);
    }) || null;
  },

  isModelInZen(idOrCanonicalId) {
    return !!this.getModel(idOrCanonicalId);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OPENCODE_ZEN_DATA };
}

if (typeof window !== 'undefined') {
  window.OPENCODE_ZEN_DATA = OPENCODE_ZEN_DATA;
}
