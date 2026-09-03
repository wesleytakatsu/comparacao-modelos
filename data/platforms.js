/**
 * DATA PACK: DISPONIBILIDADE POR PLATAFORMA & CATÁLOGO OPENCODE GO
 * Snapshot Oficial de Referência: 03/09/2026 (Documentação atualizada em 02/09/2026)
 * Fonte Única Canônica para o OpenCode Go
 */

// ============================================================================
// 1. OPENCODE GO — ESTRUTURA CANÔNICA DE DADOS (26 MODELOS OFICIAIS)
// ============================================================================

const OPENCODE_GO_DATA = {
  metadata: {
    platformName: 'OpenCode Go',
    sourceType: 'official',
    publisher: 'OpenCode',
    verifiedAt: '2026-09-03',
    documentationUpdatedAt: '2026-09-02',
    endpointBaseUrl: 'https://opencode.ai/zen/go/v1/',
    planPriceUsd: 10,
    nominalLimits: {
      fiveHoursUsd: 12,
      weeklyUsd: 30,
      monthlyUsd: 60
    },
    targetValueMultiplier: 6,
    subscriberLimitPerWorkspace: 1,
    zenBalanceFallbackSupported: true,
    zenBalanceFallbackRequiresOptIn: true,
    freeModelsAfterLimit: true,
    totalModels: 26,
    rulesSummary: 'OpenCode Go custa US$ 10/mês e oferece até US$ 60 de valor de uso nominal, mas esse multiplicador de 6× não vale igualmente para todos os modelos. Modelos da classe US$ 60 consomem quota a 1×; modelos US$ 30 consomem aproximadamente 2× mais rápido; e modelos US$ 15 consomem aproximadamente 4× mais rápido. Consulte a classe de uso antes de escolher o modelo.'
  },

  // 26 MODELOS OFICIAIS DO SNAPSHOT 02/09/2026
  models: [
    // ------------------------------------------------------------------------
    // CLASSE US$ 15 — QUARTER GO / 1,5× VALOR / 4× QUOTA BURN (9 MODELOS)
    // ------------------------------------------------------------------------
    {
      id: 'opencode-go/grok-4.6',
      canonicalId: 'grok-4-6',
      displayName: 'Grok 4.6',
      provider: 'xai',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 169,
      reqWeek: 423,
      reqMonth: 845,
      context: '1M',
      tokenProfile: { input: 390, cache: 32500, output: 120 },
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      goPricing: {
        standard: { input: 2.00, output: 6.00, cacheRead: 0.50 },
        extendedContext: { threshold: 200000, input: 4.00, output: 12.00, cacheRead: 1.00 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 30,
        zdr: false,
        notes: 'Retenção de 30 dias para logs de prevenção de abuso (não é ZDR estrito).'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/gpt-5.6-luna',
      canonicalId: 'gpt-5-6-luna',
      displayName: 'GPT-5.6 Luna',
      provider: 'openai',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 2050,
      reqWeek: 5100,
      reqMonth: 10250,
      context: '1M',
      tokenProfile: { input: 1000, cache: 50000, output: 220 },
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      goPricing: {
        standard: { input: 0.20, output: 1.20, cacheRead: 0.02, cacheWrite: 0.25 },
        extendedContext: { threshold: 272000, input: 0.40, output: 1.80, cacheRead: 0.04, cacheWrite: 0.50 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 30,
        zdr: false,
        notes: 'Retenção de até 30 dias para monitoramento de segurança/abuso da OpenAI.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/glm-5.3-flash',
      canonicalId: 'glm-5-3-flash',
      displayName: 'GLM-5.3-Flash (ex-Ox Alpha)',
      provider: 'zai',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 1580,
      reqWeek: 3950,
      reqMonth: 7900,
      context: '1M',
      tokenProfile: { input: 1000, cache: 55000, output: 200 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 0.15, output: 0.50, cacheRead: 0.03 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/glm-5.3',
      canonicalId: 'glm-5-3',
      displayName: 'GLM-5.3',
      provider: 'zai',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 220,
      reqWeek: 540,
      reqMonth: 1080,
      context: '1M',
      tokenProfile: { input: 700, cache: 52000, output: 150 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 1.40, output: 4.40, cacheRead: 0.26 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/kimi-k3',
      canonicalId: 'kimi-k3',
      displayName: 'Kimi K3',
      provider: 'moonshot',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 110,
      reqWeek: 250,
      reqMonth: 490,
      context: '1M',
      tokenProfile: { input: 1050, cache: 76500, output: 300 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 3.00, output: 15.00, cacheRead: 0.30 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/mimo-v2.5-pro',
      canonicalId: 'mimo-v2-5-pro',
      displayName: 'MiMo-V2.5-Pro',
      provider: 'xiaomi',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 3250,
      reqWeek: 8150,
      reqMonth: 16300,
      context: '1M',
      tokenProfile: { input: 790, cache: 86000, output: 305 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 0.435, output: 0.87, cacheRead: 0.003625 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/qwen3.8-max',
      canonicalId: 'qwen3-8-max',
      displayName: 'Qwen3.8 Max',
      provider: 'alibaba',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 160,
      reqWeek: 400,
      reqMonth: 810,
      context: '1M',
      tokenProfile: { input: 420, cache: 66000, output: 200 },
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      goPricing: {
        standard: { input: 2.00, output: 6.00, cacheRead: 0.25, cacheWrite: 2.50 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/deepseek-v4-pro',
      canonicalId: 'deepseek-v4-pro-0813',
      displayName: 'DeepSeek V4 Pro',
      provider: 'deepseek',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 1050,
      reqWeek: 2600,
      reqMonth: 5200,
      context: '1M',
      tokenProfile: { input: 750, cache: 82000, output: 290 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        offPeak: { input: 0.66, output: 1.98, cacheRead: 0.022 },
        peak: { input: 1.32, output: 3.96, cacheRead: 0.044, hoursUtc: '01:00-04:00, 06:00-10:00 UTC (seg-sex)' }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/deepseek-v4-flash-vision-exp',
      canonicalId: null,
      platformSku: true,
      displayName: 'DeepSeek V4 Flash Vision Exp',
      provider: 'deepseek',
      usageAllowanceUsd: 15,
      valueMultiplierVsSubscription: 1.5,
      quotaBurnMultiplier: 4,
      effectiveQuotaPct: 25,
      req5h: 3800,
      reqWeek: 9450,
      reqMonth: 18900,
      context: '1M',
      tokenProfile: { input: 410, cache: 71300, output: 310 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        offPeak: { input: 0.22, output: 0.66, cacheRead: 0.007 },
        peak: { input: 0.44, output: 1.32, cacheRead: 0.014, hoursUtc: '01:00-04:00, 06:00-10:00 UTC (seg-sex)' },
        visionNotes: 'Imagens convertidas em tokens conforme dimensões (~384 tok/img) e cobradas como input.'
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'preview'
    },

    // ------------------------------------------------------------------------
    // CLASSE US$ 30 — HALF GO / 3× VALOR / 2× QUOTA BURN (4 MODELOS)
    // ------------------------------------------------------------------------
    {
      id: 'opencode-go/qwen3.8-flash',
      canonicalId: null,
      platformSku: true,
      displayName: 'Qwen3.8 Flash',
      provider: 'alibaba',
      usageAllowanceUsd: 30,
      valueMultiplierVsSubscription: 3,
      quotaBurnMultiplier: 2,
      effectiveQuotaPct: 50,
      req5h: 5400,
      reqWeek: 13500,
      reqMonth: 27000,
      context: '256k',
      tokenProfile: { input: 600, cache: 58000, output: 200 },
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      goPricing: {
        standard: { input: 0.15, output: 0.47, cacheRead: 0.016, cacheWrite: 0.20 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/qwen3.7-max',
      canonicalId: 'qwen3-7-max',
      displayName: 'Qwen3.7 Max',
      provider: 'alibaba',
      usageAllowanceUsd: 30,
      valueMultiplierVsSubscription: 3,
      quotaBurnMultiplier: 2,
      effectiveQuotaPct: 50,
      req5h: 170,
      reqWeek: 420,
      reqMonth: 840,
      context: '1M',
      tokenProfile: { input: 420, cache: 66000, output: 200 },
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      goPricing: {
        standard: { input: 2.50, output: 7.50, cacheRead: 0.50, cacheWrite: 3.125 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'legacy'
    },
    {
      id: 'opencode-go/deepseek-v4-flash',
      canonicalId: 'deepseek-v4-flash-0731',
      displayName: 'DeepSeek V4 Flash',
      provider: 'deepseek',
      usageAllowanceUsd: 30,
      valueMultiplierVsSubscription: 3,
      quotaBurnMultiplier: 2,
      effectiveQuotaPct: 50,
      req5h: 7600,
      reqWeek: 18900,
      reqMonth: 37800,
      context: '1M',
      tokenProfile: { input: 410, cache: 71300, output: 310 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        offPeak: { input: 0.22, output: 0.66, cacheRead: 0.007 },
        peak: { input: 0.44, output: 1.32, cacheRead: 0.014, hoursUtc: '01:00-04:00, 06:00-10:00 UTC (seg-sex)' }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        zdrAgreementRequiresRenewal: true,
        documentedAgreementValidUntil: '2026-08-31',
        currentGuaranteeStatus: 'needs-revalidation',
        notes: 'A tabela oficial indica 0 dias, mas a nota do acordo ZDR publicada está formalmente expirada desde 31/08/2026. Revalidação contratual necessária.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/hy4-preview',
      canonicalId: null,
      platformSku: true,
      displayName: 'Hy4 preview',
      provider: 'tencent',
      usageAllowanceUsd: 30,
      valueMultiplierVsSubscription: 3,
      quotaBurnMultiplier: 2,
      effectiveQuotaPct: 50,
      req5h: 1350,
      reqWeek: 3380,
      reqMonth: 6770,
      context: '500k',
      tokenProfile: { input: 830, cache: 71500, output: 295 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 0.834, output: 2.501, cacheRead: 0.042 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'preview'
    },

    // ------------------------------------------------------------------------
    // CLASSE US$ 60 — FULL GO / 6× VALOR / 1× QUOTA BURN (13 MODELOS)
    // ------------------------------------------------------------------------
    {
      id: 'opencode-go/glm-5.2',
      canonicalId: 'glm-5-2',
      displayName: 'GLM-5.2',
      provider: 'zai',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 880,
      reqWeek: 2150,
      reqMonth: 4300,
      context: '1M',
      tokenProfile: { input: 700, cache: 52000, output: 150 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 1.40, output: 4.40, cacheRead: 0.26 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/glm-5.1',
      canonicalId: 'glm-5-1',
      displayName: 'GLM-5.1',
      provider: 'zai',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 880,
      reqWeek: 2150,
      reqMonth: 4300,
      context: '200k',
      tokenProfile: { input: 700, cache: 52000, output: 150 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 1.40, output: 4.40, cacheRead: 0.26 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/kimi-k2.7-code',
      canonicalId: 'kimi-k2-7-code',
      displayName: 'Kimi K2.7 Code',
      provider: 'moonshot',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 1350,
      reqWeek: 3380,
      reqMonth: 6750,
      context: '256k',
      tokenProfile: { input: 870, cache: 55000, output: 200 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 0.95, output: 4.00, cacheRead: 0.19 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/kimi-k2.6',
      canonicalId: 'kimi-k2-6',
      displayName: 'Kimi K2.6',
      provider: 'moonshot',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 1150,
      reqWeek: 2880,
      reqMonth: 5750,
      context: '256k',
      tokenProfile: { input: 870, cache: 55000, output: 200 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 0.95, output: 4.00, cacheRead: 0.16 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/longcat-2.0',
      canonicalId: 'longcat-2-0',
      displayName: 'LongCat-2.0',
      provider: 'meituan',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 11400,
      reqWeek: 28600,
      reqMonth: 57200,
      context: '1M',
      tokenProfile: { input: 920, cache: 88900, output: 200 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 0.30, output: 1.20, cacheRead: 0.006 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/mimo-v2.5',
      canonicalId: 'mimo-v2-5',
      displayName: 'MiMo-V2.5',
      provider: 'xiaomi',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 30100,
      reqWeek: 75200,
      reqMonth: 150400,
      context: '1M',
      tokenProfile: { input: 830, cache: 71500, output: 295 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 0.14, output: 0.28, cacheRead: 0.0028 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/minimax-m3',
      canonicalId: 'minimax-m3',
      displayName: 'MiniMax M3',
      provider: 'minimax',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 3200,
      reqWeek: 8000,
      reqMonth: 16000,
      context: '512k',
      tokenProfile: { input: 510, cache: 56000, output: 190 },
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      goPricing: {
        standard: { input: 0.30, output: 1.20, cacheRead: 0.06 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/minimax-m2.7',
      canonicalId: 'minimax-m2-7',
      displayName: 'MiniMax M2.7',
      provider: 'minimax',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 3400,
      reqWeek: 8500,
      reqMonth: 17000,
      context: '205k',
      tokenProfile: { input: 300, cache: 55000, output: 125 },
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      goPricing: {
        standard: { input: 0.30, output: 1.20, cacheRead: 0.06, cacheWrite: 0.375 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/muse-spark-1.3-contributor',
      canonicalId: null,
      platformSku: true,
      displayName: 'Muse Spark 1.3 Contributor',
      provider: 'meta',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 45300,
      reqWeek: 113300,
      reqMonth: 226600,
      context: '1M',
      tokenProfile: { input: 620, cache: 71400, output: 300 },
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      goPricing: {
        standard: { input: 0.10, output: 0.20, cacheRead: 0.002 }
      },
      privacy: {
        trainingUsed: true,
        retentionDays: null,
        zdr: false,
        isContributor: true,
        notes: '⚠️ Treinamento autorizado para a Meta. Preço ultra-subsidiado em troca de cessão de dados. NÃO possui ZDR.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/muse-spark-1.2-contributor',
      canonicalId: 'muse-spark-1-2',
      displayName: 'Muse Spark 1.2 Contributor',
      provider: 'meta',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 45300,
      reqWeek: 113300,
      reqMonth: 226600,
      context: '1M',
      tokenProfile: { input: 620, cache: 71400, output: 300 },
      endpoint: '/responses',
      sdkPackage: '@ai-sdk/openai',
      goPricing: {
        standard: { input: 0.10, output: 0.20, cacheRead: 0.002 }
      },
      privacy: {
        trainingUsed: true,
        retentionDays: null,
        zdr: false,
        isContributor: true,
        notes: '⚠️ Treinamento autorizado para a Meta. Preço ultra-subsidiado em troca de cessão de dados. NÃO possui ZDR.'
      },
      status: 'active'
    },
    {
      id: 'opencode-go/qwen3.7-plus',
      canonicalId: null,
      platformSku: true,
      displayName: 'Qwen3.7 Plus',
      provider: 'alibaba',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 4300,
      reqWeek: 10800,
      reqMonth: 21600,
      context: '1M',
      tokenProfile: { input: 500, cache: 57000, output: 190 },
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      goPricing: {
        standard: { input: 0.40, output: 1.60, cacheRead: 0.04, cacheWrite: 0.50 },
        extendedContext: { threshold: 256000, input: 1.20, output: 4.80, cacheRead: 0.12, cacheWrite: 1.50 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'legacy'
    },
    {
      id: 'opencode-go/qwen3.6-plus',
      canonicalId: null,
      platformSku: true,
      displayName: 'Qwen3.6 Plus',
      provider: 'alibaba',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 3300,
      reqWeek: 8200,
      reqMonth: 16300,
      context: '1M',
      tokenProfile: { input: 500, cache: 57000, output: 190 },
      endpoint: '/messages',
      sdkPackage: '@ai-sdk/anthropic',
      goPricing: {
        standard: { input: 0.50, output: 3.00, cacheRead: 0.05, cacheWrite: 0.625 },
        extendedContext: { threshold: 256000, input: 2.00, output: 6.00, cacheRead: 0.20, cacheWrite: 2.50 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'legacy'
    },
    {
      id: 'opencode-go/hy3',
      canonicalId: 'hy3-tencent',
      displayName: 'Hy3',
      provider: 'tencent',
      usageAllowanceUsd: 60,
      valueMultiplierVsSubscription: 6,
      quotaBurnMultiplier: 1,
      effectiveQuotaPct: 100,
      req5h: 4300,
      reqWeek: 10750,
      reqMonth: 21500,
      context: '256k',
      tokenProfile: { input: 830, cache: 71500, output: 295 },
      endpoint: '/chat/completions',
      sdkPackage: '@ai-sdk/openai-compatible',
      goPricing: {
        standard: { input: 0.14, output: 0.58, cacheRead: 0.035 }
      },
      privacy: {
        trainingUsed: false,
        retentionDays: 0,
        zdr: true,
        notes: 'ZDR estrito 0 dias / sem treinamento.'
      },
      status: 'active'
    }
  ],

  // Métodos Utilitários e Lógica da Calculadora de Cota Go
  getModel(idOrCanonicalId) {
    if (!idOrCanonicalId) return null;
    return this.models.find(m => m.id === idOrCanonicalId || m.canonicalId === idOrCanonicalId) || null;
  },

  isModelInGo(idOrCanonicalId) {
    return !!this.getModel(idOrCanonicalId);
  },

  calculateQuotaConsumption(modelId, requestsCount, windowType = 'monthly') {
    const model = this.getModel(modelId);
    if (!model) return null;

    const nominalLimits = this.metadata.nominalLimits;
    let windowLimit = nominalLimits.monthlyUsd;
    let baselineRequests = model.reqMonth;

    if (windowType === 'fiveHours') {
      windowLimit = nominalLimits.fiveHoursUsd;
      baselineRequests = model.req5h;
    } else if (windowType === 'weekly') {
      windowLimit = nominalLimits.weeklyUsd;
      baselineRequests = model.reqWeek;
    }

    // Proporção de requisições consumidas
    const reqRatio = requestsCount / (baselineRequests || 1);
    
    // Valor efetivo consumido do modelo
    const effectiveModelUsageUsd = reqRatio * (model.usageAllowanceUsd * (windowLimit / 60));
    
    // Quota nominal Go consumida (normalizada pelo fator de burn)
    const normalizedGoQuotaConsumed = effectiveModelUsageUsd * model.quotaBurnMultiplier;
    const pctConsumed = Math.min(100, Math.round((normalizedGoQuotaConsumed / windowLimit) * 1000) / 10);
    const exceedsQuota = normalizedGoQuotaConsumed > windowLimit;

    return {
      model,
      requestsCount,
      windowType,
      windowLimitUsd: windowLimit,
      effectiveModelUsageUsd: Math.round(effectiveModelUsageUsd * 100) / 100,
      normalizedGoQuotaConsumedUsd: Math.round(normalizedGoQuotaConsumed * 100) / 100,
      pctConsumed,
      exceedsQuota,
      zenBalanceFallbackTriggered: exceedsQuota && this.metadata.zenBalanceFallbackSupported
    };
  }
};

// ============================================================================
// 1.5. CAMELAI PLATFORM DATA (CAMELCODE & CAMELSTREAM)
// Snapshot Oficial Verificado: 03/09/2026 (Fleet 30/08/2026)
// ============================================================================

const CAMELAI_PLATFORM_DATA = {
  company: {
    id: 'camelai',
    name: 'camelAI',
    legalName: 'CamelQA, Inc.',
    website: 'https://camelai.com',
    country: 'EUA',
    type: ['coding-agent-platform', 'app-builder', 'inference-router'],
    verifiedAt: '2026-09-03',
    notes: 'Plataforma integrada de coding agent autônomo (camelCode) e API de inferência de taxa fixa com tokens ilimitados (camelStream).'
  },

  camelCode: {
    productName: 'camelCode',
    category: 'Full-Stack Coding Agent & App Builder',
    description: 'Agente de codificação autônomo com workspaces persistentes, criação e deploy full-stack de apps e integrações nativas.',
    automationLimits: {
      canonicalDocs: {
        free: { count: 1, interval: 'daily' },
        starter: { count: 1, interval: 'hourly' },
        pro: { count: 50, intervalMinutes: 5 },
        team: { countPerMember: 50, intervalMinutes: 5 }
      },
      marketingPage: {
        free: { count: 2, interval: 'daily' },
        starter: { count: 10, interval: 'hourly' },
        pro: { count: 50 }
      },
      sourceConflict: true,
      preferredSource: 'detailed-plan-documentation'
    },
    hostedPlans: [
      {
        id: 'camelai-code-free',
        name: 'Free',
        monthlyPriceUsd: 0,
        monthlyPriceBrlEstimate: 0,
        seats: 1,
        workspaces: 1,
        storageGbPerWorkspace: 5,
        deployedApps: 3,
        customDomains: 0,
        emailInbox: false,
        rbac: false,
        premiumModelCreditsUsd: 0,
        camelFree: {
          included: true,
          priority: false,
          capacity: 'shared',
          notes: 'Capacidade compartilhada; pode sofrer lentidão em horários de pico.'
        },
        byokAllowed: true,
        topUpAllowed: true,
        openAiLoginAllowed: true,
        creditCardRequired: false,
        automations: '1 daily (docs) / 2 daily (marketing)',
        automationConflict: true,
        bestFor: 'Testes sem compromisso, estudantes e prototipagem leve.'
      },
      {
        id: 'camelai-code-starter',
        name: 'Starter',
        monthlyPriceUsd: 10,
        monthlyPriceBrlEstimate: 51.08,
        seats: 1,
        workspaces: 1,
        storageGbPerWorkspace: 50,
        deployedApps: 30,
        customDomains: 10,
        emailInbox: true,
        rbac: false,
        premiumModelCreditsUsd: 10,
        camelFreePriority: true,
        byokAllowed: true,
        topUpAllowed: true,
        openAiLoginAllowed: true,
        automationLimits: {
          marketingClaim: '10 hourly',
          documentationLimit: '1 hourly',
          conflictStatus: 'unresolved'
        },
        bestFor: 'Desenvolvedores individuais com projetos pessoais ativos.'
      },
      {
        id: 'camelai-code-pro',
        name: 'Pro',
        monthlyPriceUsd: 40,
        monthlyPriceBrlEstimate: 204.32,
        seats: 1,
        workspaces: 1,
        storageGbPerWorkspace: 100,
        deployedApps: 'unlimited',
        customDomains: 'unlimited',
        emailInbox: true,
        rbac: false,
        premiumModelCreditsUsd: 40,
        camelFreePriority: true,
        byokAllowed: true,
        topUpAllowed: true,
        openAiLoginAllowed: true,
        automations: 50,
        automationMinimumIntervalMinutes: 5,
        automationConflict: false,
        bestFor: 'Solo builder usando camelAI como plataforma principal de desenvolvimento contínuo.'
      },
      {
        id: 'camelai-code-team',
        name: 'Team',
        monthlyPriceUsdPerSeat: 50,
        monthlyPriceBrlEstimatePerSeat: 255.40,
        minimumSeats: 3,
        minimumMonthlyCostUsd: 150,
        minimumMonthlyCostBrlEstimate: 766.20,
        workspaces: 2,
        storageGbPerWorkspace: 100,
        deployedApps: 'unlimited',
        customDomains: 'unlimited',
        emailInbox: true,
        rbac: true,
        premiumModelCreditsUsdPerSeat: 50,
        camelFreePriority: true,
        byokAllowed: true,
        topUpAllowed: true,
        openAiLoginAllowed: true,
        automationsPerMember: 50,
        automationMinimumIntervalMinutes: 5,
        bestFor: 'Equipes técnicas com necessidade de RBAC, colaboração em múltiplos apps e credenciais compartilhadas.'
      },
      {
        id: 'camelai-code-enterprise',
        name: 'Enterprise',
        monthlyPriceUsd: 'Custom / Contact Sales',
        seats: 'Custom',
        workspaces: 'Unlimited',
        storageGbPerWorkspace: 'Custom',
        deployedApps: 'unlimited',
        customDomains: 'unlimited',
        emailInbox: true,
        rbac: true,
        ssoSaml: true,
        byoc: {
          supported: true,
          description: 'Deploy apps directly inside customer\'s Cloudflare account.'
        },
        compliance: ['HIPAA', 'SOC 2 Type II'],
        dedicatedSupport: true,
        bestFor: 'Grandes organizações com requisitos rigorosos de segurança e compliance.'
      }
    ],

    modelAccess: {
      fourAccessMethods: [
        {
          method: 'Plan credits',
          description: 'Créditos mensais inclusos (Starter $10, Pro $40, Team $50/seat). Cobrança estritamente à taxa do provedor (provider rate) sem markup camelAI.'
        },
        {
          method: 'Top-up credits',
          description: 'Recargas pré-pagas via Stripe no mesmo saldo dos créditos do plano. Disponível inclusive no tier Free. Política de rollover: unknown/não confirmada.'
        },
        {
          method: 'BYOK (Bring Your Own Key)',
          description: 'Conexão direta com Anthropic, OpenAI, OpenRouter ou AWS Bedrock.',
          importantLimitation: 'BYOK substitui TODOS os modelos hospedados pelo camelAI (inclusive Camel Free). Não é possível combinar chave de um provedor com créditos de outro simultaneamente. Para múltiplas famílias sob uma única chave, utilize OpenRouter.'
        },
        {
          method: 'Sign in with OpenAI',
          description: 'Utiliza a assinatura ChatGPT existente do usuário. Uso de modelos GPT sem custo adicional camelAI. Cobre apenas modelos da família GPT.'
        }
      ],
      supportedFamilies: ['GPT', 'Gemini', 'Grok', 'Kimi', 'DeepSeek', 'Claude'],
      creditDepletionBehavior: 'Quando os créditos premium esgotam, o serviço NÃO para: Camel Free continua funcionando, apps deployed continuam ativos, workspaces e automações permanecem intactos.',
      camelFreeDetails: {
        platformSku: true,
        opaqueHostedModel: true,
        canonicalModelId: null,
        description: 'Modelo hospedado proprietário gratuito. Não incluído no catálogo dos 44 modelos canônicos por não possuir ledger público independente.'
      }
    },

    capabilities: [
      'Agente de codificação persistente com workspace preservado entre sessões',
      'Construção de aplicações full-stack (stack recomendada: React, TypeScript, Tailwind)',
      'One-click deployment com DNS, SSL e CDN totalmente gerenciados',
      '50+ integrações (PostgreSQL, MySQL, MongoDB, Redis, Snowflake, BigQuery, Stripe, Slack, GitHub, Notion)',
      'Segurança de conexões: credenciais criptografadas em repouso, injetadas server-side e nunca expostas em logs/chats'
    ],

    limitations: [
      'Uso de LLM premium não é ilimitado: esgotados os créditos, requer top-up, BYOK ou login OpenAI',
      'Planos individuais (Free, Starter, Pro) possuem apenas 1 workspace (Team tem 2); workspaces adicionais exigem contato comercial',
      'Conflito documental nas automações dos planos Free e Starter (docs detalhados vs marketing page)'
    ]
  },

  selfHosted: {
    productName: 'camelCode Self-Hosted',
    license: 'MIT (Open Source)',
    softwareCostUsd: 0,
    deploymentType: 'Self-Hosted / Single-Node',
    userCosts: 'Infraestrutura própria (VM/servidor), custos de LLM provider (BYOK) e DNS/domínio.',
    hardwareRequirements: {
      os: 'x86_64 Linux (Ubuntu 24.04 LTS recomendado)',
      vcpu: 4,
      ramGib: 8,
      diskGib: 100,
      software: ['Docker Engine', 'Docker Compose v2', 'Git', 'Node.js 22', 'Bun 1.3.14']
    },
    prerequisites: ['Hostname público', 'Provedor OIDC para autenticação', 'Wildcard domain', 'Certificados TLS/DNS', 'API key de provedor'],
    supportedProviders: ['AWS Bedrock', 'Anthropic', 'OpenAI', 'OpenRouter', 'Custom OpenAI-Compatible Endpoint'],
    architecturalLimitations: [
      'Single-node estrito: sem failover multi-node ou alta disponibilidade nativa',
      'Sem control plane gerenciado, sem backup gerenciado e sem disaster recovery automático',
      'Sem suporte a cadastro por senha com verificação de email ou SMTP interno',
      'Convites de membros: admin gera URL de convite e entrega manualmente'
    ],
    criticalSecurityWarning: '🚨 O container da aplicação camelAI possui acesso read-write ao Docker socket (/var/run/docker.sock). Qualquer entidade que comprometa o container obtém efetivamente acesso root à máquina virtual hospedeira.'
  },

  camelStream: {
    productName: 'camelStream',
    serviceType: 'Flat-rate AI Inference API',
    pricing: {
      pricePerStreamUsdMonth: 5,
      pricePerStreamBrlEstimate: 25.54,
      selfServiceStreamRange: '1 a 50 streams',
      enterpriseThreshold: '> 50 streams via contato comercial',
      prorationPolicy: 'Ajustes de quantidade são rateados proporcionalmente no ciclo corrente.'
    },
    tokenPolicy: {
      unlimitedTokens: true,
      tokenMetered: false,
      overageCharge: false,
      summary: 'Tokens estritamente ilimitados. Preço fixo de $5 × número de streams sem cobrança adicional por volume de tokens.'
    },
    concurrencyRules: {
      guaranteedConcurrencyPerStream: 1,
      concurrencyExplanation: 'Cada stream garante 1 geração concorrente paralela. Requisições simultâneas excedentes entram em fila. 5 streams = 5 gerações paralelas simultâneas; 10 streams = 10 gerações.'
    },
    apiSpecs: {
      baseUrl: 'https://stream.camelai.com/v1',
      modelId: 'auto',
      modelPinnedSupported: false,
      compatibility: ['OpenAI Chat Completions', 'OpenAI Responses', 'Anthropic Messages'],
      features: ['Streaming nativo', 'Tool calling', 'Structured output']
    },
    fleet: {
      verifiedAt: '2026-08-30',
      fleetDocsLagPossible: true,
      notes: 'camelAI gerencia dinamicamente o fleet, provedores e versões. O usuário não consegue fixar (pin) um modelo específico.',
      models: [
        { name: 'DeepSeek V4 Flash', version: '0731 as of Aug 2026' },
        { name: 'Gemini Flash', version: '3.7 as of Aug 2026' },
        { name: 'GLM 5.3 Flash', version: 'Latest' },
        { name: 'GPT Luna', version: '5.6 as of Aug 2026' },
        { name: 'Muse Spark', version: '1.2 as of Aug 2026' }
      ],
      qualityFloor: 'Terminal-Bench 2.1 >= 70% OU Artificial Analysis Intelligence Index >= 50.',
      contextGuarantee: 'Mínimo de 260K tokens com multimodalidade de visão nativa em todos os modelos do fleet.',
      contextCompaction: 'Diálogos longos que excedem a janela do modelo sofrem compactação no meio (middle compaction), preservando tarefa original, turnos recentes, papéis e tool-call IDs.'
    },
    performanceTargets: {
      isSla: false,
      disclaimer: '⚠️ Performance targets, not SLA. Não há garantias contratuais de throughput, latência ou uptime no plano standard de $5.',
      targets: {
        throughputP10Tps: 40,
        throughputP5Tps: 20,
        ttftP95Seconds: 5
      }
    },
    privacyWarning: {
      criticalAlert: true,
      standardPlanPolicy: '🚨 ATENÇÃO CRÍTICA DE PRIVACIDADE: No plano standard de $5/stream, prompts e respostas podem ser retidos e utilizados para treinamento por camelAI, provedores de inferência e parceiros. NÃO há opção de opt-out.',
      confidentialityVerdict: 'NÃO recomendado para código proprietário confidencial, segredos comerciais, credenciais, PII, dados médicos ou financeiros.',
      accountDataIsolation: 'Dados da conta (nome, email, billing, chave API, IP) NÃO são enviados aos provedores de inferência, mas o prompt original é integralmente transmitido.',
      traceScrubbing: 'Filtros de privacidade mascaram dados sensíveis na cópia da trace que o camelAI armazena após a requisição, mas o provedor de serving recebe o prompt antes desse processo.',
      enterpriseCustomTerms: 'Termos customizados de Zero Data Retention (ZDR) e sem treinamento estão disponíveis apenas para contratos de 1.000+ streams via contato comercial.'
    },
    harnessCompatibility: ['Hermes', 'Claude Code', 'Codex', 'OpenCode', 'Aider', 'Kilo Code'],
    bestFor: 'Coding agents de alto volume contínuo, background workers não paralelos, processamento em lote, experimentos e código público.',
    avoidFor: 'Código confidencial, dados sujeitos a ZDR, pipelines que exigem modelo específico fixo, concorrência de ultra-baixa latência com 1 stream e SLA corporativo.'
  },

  comparisonTables: {
    codeVsStream: {
      title: 'Comparativo Técnico: camelCode vs camelStream',
      headers: ['Característica', 'camelCode (App Builder)', 'camelStream (Inference API)'],
      rows: [
        ['Função Principal', 'Coding agent autônomo e builder de apps full-stack', 'API de inferência com roteamento dinâmico'],
        ['Estrutura de Preço', 'Planos de US$ 0, $10, $40 ou $50/seat/mês', 'US$ 5 por stream / mês'],
        ['Política de Tokens', 'Créditos premium mensais inclusos + Camel Free', 'Tokens ilimitados (sem overage ou limite de tokens)'],
        ['Seleção de Modelo', 'Usuário escolhe o modelo nas opções disponíveis', 'Roteamento automático (model: auto)'],
        ['Suporte a BYOK', 'Sim (Anthropic, OpenAI, OpenRouter, Bedrock)', 'Não é a proposta do plano standard'],
        ['Workspace Persistente', 'Sim (código, dependências e ambiente preservados)', 'Não (chamadas stateless via API)'],
        ['Deploy de Aplicações', 'Sim (1-click com SSL, DNS e CDN inclusos)', 'Não'],
        ['Automações (Cron Jobs)', 'Sim (de 1 diária a 50 a cada 5 minutos)', 'Não'],
        ['Modelo de Concorrência', 'Por agente e plano', '1 geração paralela garantida por stream contratado'],
        ['Privacidade de Dados', 'Política comercial camelCode / provedor BYOK', '🚨 Prompts/outputs podem ser usados para treino no standard']
      ]
    },
    hostedVsSelfHosted: {
      title: 'Comparativo Técnico: camelCode Hosted vs Self-Hosted',
      headers: ['Dimensão', 'camelCode Hosted (Nuvem)', 'camelCode Self-Hosted (Local/VM)'],
      rows: [
        ['Licença & Custo de Software', 'SaaS comercial (US$ 0 a $50+/mês)', 'Open Source MIT ($0 licença de software)'],
        ['Operação de Infraestrutura', 'Gerenciada 100% pelo camelAI', 'Operada integralmente pelo usuário'],
        ['Custos Adicionais', 'Créditos inclusos no plano (top-up se esgotar)', 'Infraestrutura de nuvem/VM + chaves de API (BYOK)'],
        ['Alta Disponibilidade', 'Nuvem multi-tenant gerenciada', 'Single-node (sem failover multi-node nativo)'],
        ['SMTP / Emails', 'Inbox gerenciado nos planos pagos', 'Sem SMTP interno (convites entregues via URL)'],
        ['Segurança de Acesso', 'Isolamento de tenant gerenciado', '🚨 Warning: container com read-write no Docker socket (root-equivalent)']
      ]
    }
  },

  legacy: {
    professionalOld: {
      id: 'camelai-legacy-professional',
      current: false,
      status: 'legacy',
      monthlyPriceUsd: 200,
      notes: 'Antigo plano camelAI Embedded Analytics ($200/mês + usage). Produto descontinuado e não desenvolvido ativamente.'
    }
  }
};

// ============================================================================
// 2. PLATFORM MODEL CATALOG (MATRIZ GERAL & POOLS)
// ============================================================================

const PLATFORM_MODEL_CATALOG = {
  opencodeGo: OPENCODE_GO_DATA,
  camelai: CAMELAI_PLATFORM_DATA,

  cursor: {
    platformName: 'Cursor IDE',
    pools: {
      cursorModels: {
        name: 'Cursor Models (Included High-Allowance Pool)',
        pricingModel: 'included-generous',
        description: 'Pool canônico incluído de alta franquia de uso no plano Pro/Ultra. Não consome quota de Other Models.',
        models: ['composer-2-5', 'grok-4-5', 'grok-4-6']
      },
      otherModels: {
        name: 'Other Models (Usage-Based / API Price)',
        pricingModel: 'metered-api-price',
        description: 'Franquia base no Pro, ~3x no Pro+, ~20x no Ultra. Demais requisições consumidas à taxa de API do modelo.',
        models: ['gemini-3-8-flash', 'claude-fable-5-1', 'claude-opus-5', 'claude-sonnet-5', 'gpt-5-6-sol', 'gpt-5-6-terra', 'kimi-k3', 'glm-5-3']
      }
    },
    pricing: {
      grok46: {
        standard: { input: 2.00, cacheRead: 0.50, output: 6.00 },
        fast: { input: 4.00, cacheRead: 1.00, output: 12.00 }
      },
      grok45: {
        standard: { input: 2.00, cacheRead: 0.50, output: 6.00 },
        fast: { input: 4.00, cacheRead: 1.00, output: 18.00 }
      }
    }
  },

  antigravity: {
    platformName: 'Google Antigravity',
    pools: {
      pool1: {
        name: 'Pool 1: Gemini Models',
        description: 'Capacidade massiva e throughput nativo de 305 tok/s em 1 milhão de tokens.',
        models: ['gemini-3-8-flash', 'gemini-3-7-flash', 'gemini-3-6-flash', 'gemini-3-1-pro']
      },
      pool2: {
        name: 'Pool 2: Claude & GPT Models (Compartilhado)',
        description: 'Cota compartilhada restrita para escalonamento crítico de profundidade de raciocínio.',
        models: ['claude-sonnet-4-6', 'claude-opus-4-6', 'gpt-oss-120b']
      }
    }
  },

  formatPlatformStatus(modelId, platformKey) {
    const row = this.availabilityMatrix.find(r => r.modelId === modelId);
    if (!row || !row.platforms || !row.platforms[platformKey]) {
      return '🔴 Indisponível';
    }
    const p = row.platforms[platformKey];
    switch (platformKey) {
      case 'directApi':
        if (!p.available) return p.priceDesc ? `🔴 ${p.priceDesc}` : '🔴 Indisponível';
        if (p.status === 'legacy' || p.status === 'superseded') return `🟡 ${p.status === 'legacy' ? 'Legacy' : 'Superseded'} (${p.priceDesc || ''})`.trim();
        if (p.status === 'open-weights') return `🟢 Open Weights (${p.priceDesc || 'Gratuito'})`.trim();
        return `🟢 Sim (${p.priceDesc || 'API'})`;
      case 'cursor':
        if (!p.available) return '🔴 Indisponível';
        if (p.pool === 'cursor-models') return `🟢 Cursor Models (${p.notes || 'Incluso'})`;
        if (p.pool === 'local') return `🟢 Local via ${p.notes || 'vLLM'}`;
        if (p.notes && p.notes.includes('Legacy')) return '🟡 Legacy';
        if (p.notes && p.notes.includes('Superseded')) return '🟡 Superseded';
        if (p.multiplier) return `🟢 Other Models (${p.multiplier}x)`;
        return `🟢 Other Models (${p.notes || 'API Price'})`;
      case 'opencode':
        if (!p.available) return p.notes && p.notes.includes('Descontinuado') ? '🔴 Descontinuado' : '🔴 Indisponível';
        return `🟢 Go (${p.burnRate}× burn • ${p.reqEstimate ? p.reqEstimate.toLocaleString('pt-BR') : ''} req)`;
      case 'antigravity':
        if (!p.available) return '🔴 Indisponível';
        if (p.pool === 'pool1') return `🟢 Pool 1: Gemini (${p.notes || 'Nativo'})`;
        if (p.pool === 'pool2') return `🟢 Pool 2 Compartilhado (${p.notes || 'Claude/GPT'})`;
        return '🟢 Disponível';
      case 'openrouter':
        if (!p.available) return '🔴 Indisponível';
        if (p.status === 'legacy' || p.status === 'superseded') return `🟡 ${p.status === 'legacy' ? 'Legacy' : 'Superseded'}`;
        return `🟢 Sim (${p.notes || 'OpenRouter'})`;
      case 'local':
        if (!p.supported) return p.type === 'cloud-only' ? '🔴 Nuvem' : '🔴 Proprietário';
        return `🟢 ${p.requirements || '100% Local'}`;
      default:
        return '⚪ Desconhecido';
    }
  },

  // Matriz de disponibilidade dos 44 modelos canônicos estruturada por plataforma
  availabilityMatrix: [
    {
      modelId: 'claude-fable-5-1', name: 'Claude Fable 5.1',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$10/$50' },
        cursor: { available: true, pool: 'other-models', multiplier: 2.0, notes: 'Usage-based' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'OpenRouter' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'claude-fable-5', name: 'Claude Fable 5',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'superseded', priceDesc: '$10/$50' },
        cursor: { available: true, pool: 'other-models', multiplier: 2.0, notes: 'Superseded' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'superseded', notes: 'Superseded' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'claude-opus-5', name: 'Claude Opus 5',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$5/$25' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.5, notes: '1.5x' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'claude-sonnet-5', name: 'Claude Sonnet 5',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$2/$10' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: '1.0x' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'claude-opus-4-6', name: 'Claude Opus 4.6',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'legacy', priceDesc: '$5/$25' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.5, notes: 'Legacy' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: true, pool: 'pool2', notes: 'Compartilhado' },
        openrouter: { available: true, status: 'legacy', notes: 'Legacy' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'legacy', priceDesc: '$3/$15' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Legacy' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: true, pool: 'pool2', notes: 'Compartilhado' },
        openrouter: { available: true, status: 'legacy', notes: 'Legacy' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'claude-haiku-4-5', name: 'Claude Haiku 4.5',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$1/$5' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: '1.0x' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'gemini-3-8-flash', name: 'Gemini 3.8 Flash',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.75/$3.75' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: '$0.75/$3.50 API Price' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: true, pool: 'pool1', notes: 'Nativo 1M' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'cloud-only' }
      }
    },
    {
      modelId: 'gemini-3-7-flash', name: 'Gemini 3.7 Flash',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.75/$3.75' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: '$0.75/$3.75' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: true, pool: 'pool1', notes: 'Gemini' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'cloud-only' }
      }
    },
    {
      modelId: 'gemini-3-5-flash', name: 'Gemini 3.5 Flash',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.075/$0.30' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Other Models' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: true, pool: 'pool1', notes: 'Gemini' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'cloud-only' }
      }
    },
    {
      modelId: 'gemini-3-1-pro', name: 'Gemini 3.1 Pro',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'preview', priceDesc: '$1.25/$5.00' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Other Models' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: true, pool: 'pool1', notes: 'Multimodal Pro' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'cloud-only' }
      }
    },
    {
      modelId: 'gpt-5-6-sol', name: 'GPT-5.6 Sol',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$4/$20' },
        cursor: { available: true, pool: 'other-models', multiplier: 2.0, notes: '2.0x' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'gpt-5-6-terra', name: 'GPT-5.6 Terra',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$2/$12' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: '1.0x' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'gpt-5-6-luna', name: 'GPT-5.6 Luna',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.20/$1.20' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Other Models' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 10250, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'gpt-5-6-pro', name: 'GPT-5.6 Sol Pro',
      platforms: {
        directApi: { available: false, accessMode: 'none', pricingRef: null, status: 'unavailable', priceDesc: 'Indisponível (Exclusivo ChatGPT Pro)' },
        cursor: { available: false, pool: 'unverified', multiplier: null, notes: 'Não verificado' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: false, status: 'unverified', notes: 'Não verificado' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'gpt-oss-20b', name: 'gpt-oss-20b',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: null, status: 'open-weights', priceDesc: 'Open Weights' },
        cursor: { available: true, pool: 'local', multiplier: null, notes: 'Ollama/vLLM' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: '16GB VRAM', type: 'open-weights' }
      }
    },
    {
      modelId: 'gpt-oss-120b', name: 'gpt-oss-120b',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: null, status: 'open-weights', priceDesc: 'Open Weights' },
        cursor: { available: true, pool: 'local', multiplier: null, notes: 'vLLM' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: true, pool: 'pool2', notes: 'Claude/GPT' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: '80GB VRAM', type: 'open-weights' }
      }
    },
    {
      modelId: 'grok-4-6', name: 'Grok 4.6',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$2/$0.50/$6 xAI API' },
        cursor: { available: true, pool: 'cursor-models', multiplier: null, notes: 'Standard $2/$6 | Fast $4/$12' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 845, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'cloud-only' }
      }
    },
    {
      modelId: 'grok-4-5', name: 'Grok 4.5',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$2/$0.30/$6 xAI API' },
        cursor: { available: true, pool: 'cursor-models', multiplier: null, notes: 'Standard $2/$6 | Fast $4/$18' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'cloud-only' }
      }
    },
    {
      modelId: 'glm-5-3-flash', name: 'GLM-5.3-Flash (ex-Ox Alpha)',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'open-weights', priceDesc: 'MIT ($0.15/$0.50)' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 7900, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'OpenRouter' },
        local: { supported: true, requirements: '320B MoE (KTransformers)', type: 'open-weights' }
      }
    },
    {
      modelId: 'glm-5-3', name: 'GLM-5.3',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$1/$3' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 1080, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster Multi-GPU', type: 'open-weights' }
      }
    },
    {
      modelId: 'glm-5-2', name: 'GLM-5.2',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.60/$2' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 4300, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster Multi-GPU', type: 'open-weights' }
      }
    },
    {
      modelId: 'glm-5-1', name: 'GLM-5.1',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.40/$1.50' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 4300, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster Multi-GPU', type: 'open-weights' }
      }
    },
    {
      modelId: 'kimi-k3', name: 'Kimi K3',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '¥ / $' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 490, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster 8x H100', type: 'open-weights' }
      }
    },
    {
      modelId: 'kimi-k2-7-code', name: 'Kimi K2.7 Code',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: 'Sim' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 6750, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster Multi-GPU', type: 'open-weights' }
      }
    },
    {
      modelId: 'kimi-k2-6', name: 'Kimi K2.6',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: 'Sim' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 5750, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster Multi-GPU', type: 'open-weights' }
      }
    },
    {
      modelId: 'deepseek-v4-pro-0813', name: 'DeepSeek-V4-Pro',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.80/$2.40' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'DeepSeek API' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 5200, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster FP8', type: 'open-weights' }
      }
    },
    {
      modelId: 'deepseek-v4-flash-0731', name: 'DeepSeek-V4-Flash',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.22/$0.66' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Direct API' },
        opencode: { available: true, tier: 'Go', burnRate: 2, reqEstimate: 37800, notes: '2x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: '304B MoE Local', type: 'open-weights' }
      }
    },
    {
      modelId: 'deepseek-v4-vision-exp', name: 'DeepSeek-V4-Flash-Vision-Exp',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'preview', priceDesc: '$0.22/$0.66' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Direct API' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 18900, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'Preview de Pesquisa', type: 'cloud-only' }
      }
    },
    {
      modelId: 'deepseek-v3-2', name: 'DeepSeek-V3.2',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'legacy', priceDesc: '$0.14/$0.28' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Legacy' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Descontinuado' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'legacy', notes: 'Legacy' },
        local: { supported: true, requirements: '671B MoE', type: 'open-weights' }
      }
    },
    {
      modelId: 'qwen3-8-max', name: 'Qwen3.8 Max',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: 'Alibaba Cloud' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 810, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A', type: 'cloud-only' }
      }
    },
    {
      modelId: 'qwen3-8-2-4t-a95b', name: 'Qwen3.8-2.4T-A95B',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: null, status: 'open-weights', priceDesc: 'Apache 2.0' },
        cursor: { available: true, pool: 'local', multiplier: null, notes: 'vLLM / SGLang' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster 4x-8x H100', type: 'open-weights' }
      }
    },
    {
      modelId: 'qwen3-8-27b', name: 'Qwen3.8-27B',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: null, status: 'open-weights', priceDesc: 'Open Weights' },
        cursor: { available: true, pool: 'local', multiplier: null, notes: 'Ollama / vLLM' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: '1x RTX 4090 / 32GB', type: 'open-weights' }
      }
    },
    {
      modelId: 'qwen3-7-max', name: 'Qwen3.7 Max',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'legacy', priceDesc: 'Legacy' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Legacy' },
        opencode: { available: true, tier: 'Go', burnRate: 2, reqEstimate: 840, notes: '2x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'legacy', notes: 'Legacy' },
        local: { supported: false, requirements: 'N/A', type: 'cloud-only' }
      }
    },
    {
      modelId: 'mimo-v2-5-pro', name: 'MiMo-V2.5-Pro',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.40/$1.20' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 4, reqEstimate: 16300, notes: '4x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster 500B', type: 'open-weights' }
      }
    },
    {
      modelId: 'mimo-v2-5', name: 'MiMo-V2.5 (Base)',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.05/$0.15' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 150400, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: '160B MoE (KTransformers)', type: 'open-weights' }
      }
    },
    {
      modelId: 'minimax-m3', name: 'MiniMax M3',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.40/$1.20' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 16000, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster 420B', type: 'open-weights' }
      }
    },
    {
      modelId: 'minimax-m2-7', name: 'MiniMax M2.7',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.20/$0.60' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 17000, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: '230B MoE Local', type: 'open-weights' }
      }
    },
    {
      modelId: 'composer-2-5', name: 'Composer 2.5',
      platforms: {
        directApi: { available: false, accessMode: 'none', pricingRef: null, status: 'unavailable', priceDesc: 'Exclusivo Cursor IDE' },
        cursor: { available: true, pool: 'cursor-models', multiplier: null, notes: 'Incluso' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: false, status: 'unavailable', notes: 'Indisponível' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'nemotron-3-5-lightning', name: 'Nemotron 3.5 Lightning',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: null, status: 'open-weights', priceDesc: 'NVIDIA NIM' },
        cursor: { available: true, pool: 'local', multiplier: null, notes: 'NIM' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: '1x RTX 4090 (NVFP4)', type: 'open-weights' }
      }
    },
    {
      modelId: 'hy3-tencent', name: 'Tencent Hy3',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.14/$0.58' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 21500, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: '300B MoE Local', type: 'open-weights' }
      }
    },
    {
      modelId: 'longcat-2-0', name: 'LongCat-2.0',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.10/$0.30' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 57200, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster Grande', type: 'open-weights' }
      }
    },
    {
      modelId: 'muse-spark-1-2', name: 'Muse Spark 1.2',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: null, status: 'open-weights', priceDesc: 'MIT' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'OpenRouter' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 226600, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Local Multi-GPU', type: 'open-weights' }
      }
    },
    {
      modelId: 'gpt-5-5-preview', name: 'GPT-5.5 Preview',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'superseded', priceDesc: 'Superseded' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Superseded' },
        opencode: { available: false, tier: null, burnRate: null, reqEstimate: null, notes: 'Indisponível' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'superseded', notes: 'Superseded' },
        local: { supported: false, requirements: 'N/A', type: 'proprietary' }
      }
    },
    {
      modelId: 'hy4-preview', name: 'Hy4 Preview',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'preview', priceDesc: '$0.30/$1.00' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Preview' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 20000, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'preview', notes: 'Preview' },
        local: { supported: true, requirements: '770B MoE (49B active)', type: 'open-weights' }
      }
    },
    {
      modelId: 'qwen3-8-flash', name: 'Qwen3.8 Flash',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$0.16/$0.47' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Direct API' },
        opencode: { available: true, tier: 'Go', burnRate: 0.5, reqEstimate: 40000, notes: '0.5x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: false, requirements: 'N/A (Ver Qwen3.8-Flash-Next)', type: 'proprietary' }
      }
    },
    {
      modelId: 'muse-spark-1-3', name: 'Muse Spark 1.3',
      platforms: {
        directApi: { available: true, accessMode: 'direct', pricingRef: 'standard', status: 'stable', priceDesc: '$1.25/$4.25' },
        cursor: { available: true, pool: 'other-models', multiplier: 1.0, notes: 'Usage-based' },
        opencode: { available: true, tier: 'Go', burnRate: 1, reqEstimate: 113000, notes: '1x burn' },
        antigravity: { available: false, pool: 'none', notes: 'Indisponível' },
        openrouter: { available: true, status: 'stable', notes: 'Sim' },
        local: { supported: true, requirements: 'Cluster multi-GPU', type: 'open-weights' }
      }
    }
  ]
};

// Vincula dinamicamente getters compatíveis com legacy UI
PLATFORM_MODEL_CATALOG.availabilityMatrix.forEach(row => {
  ['directApi', 'cursor', 'opencode', 'antigravity', 'openrouter', 'local'].forEach(key => {
    Object.defineProperty(row, key, {
      get() {
        return PLATFORM_MODEL_CATALOG.formatPlatformStatus(this.modelId, key);
      },
      enumerable: true,
      configurable: true
    });
  });
});

// Metadados de integração e proveniência do Grok Bot (Seções 61 e 62)
const GROK_BOT_METADATA = {
  id: 'grok-bot',
  name: 'Grok Bot',
  announcedAt: '2026-08-26',
  quotaType: 'dedicated-separate-pool',
  eligiblePlans: [
    'xai-supergrok',
    'xai-supergrok-plus',
    'xai-supergrok-heavy',
    'cursor-pro',
    'cursor-pro-plus',
    'cursor-ultra',
    'cursor-teams-standard',
    'cursor-teams-premium'
  ],
  sourceConflict: true,
  preferredSource: 'latest-plan-expansion-announcement',
  rolloutDependent: true,
  notes: 'Grok Bot possui sua própria quota separada do uso normal Grok/Cursor. Algumas páginas de setup ainda mostram elegibilidade mais restrita; a preferência do projeto é pelo anúncio oficial de expansão de planos de 26/08/2026.'
};

// Matriz canônica de disponibilidade de plataformas (Seção 40)
const PLATFORM_AVAILABILITY_MATRIX = PLATFORM_MODEL_CATALOG.availabilityMatrix;

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OPENCODE_GO_DATA, CAMELAI_PLATFORM_DATA, PLATFORM_MODEL_CATALOG, PLATFORM_AVAILABILITY_MATRIX, GROK_BOT_METADATA };
}

if (typeof window !== 'undefined') {
  window.CAMELAI_PLATFORM_DATA = CAMELAI_PLATFORM_DATA;
  window.GROK_BOT_METADATA = GROK_BOT_METADATA;
  window.PLATFORM_AVAILABILITY_MATRIX = PLATFORM_AVAILABILITY_MATRIX;
}
