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
// 2. PLATFORM MODEL CATALOG (MATRIZ GERAL & POOLS)
// ============================================================================

const PLATFORM_MODEL_CATALOG = {
  opencodeGo: OPENCODE_GO_DATA,

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

  // Matriz de disponibilidade dos 44 modelos canônicos
  availabilityMatrix: [
    { modelId: 'claude-fable-5-1', name: 'Claude Fable 5.1', directApi: '🟢 Sim ($10/$50)', cursor: '🟡 Other Models (Pro+/Ultra)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim (z-ai/claude-fable-5-1)', local: '🔴 Proprietário' },
    { modelId: 'claude-fable-5', name: 'Claude Fable 5', directApi: '🟡 Superseded ($10/$50)', cursor: '🟡 Superseded', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟡 Superseded', local: '🔴 Proprietário' },
    { modelId: 'claude-opus-5', name: 'Claude Opus 5', directApi: '🟢 Sim ($5/$25)', cursor: '🟢 Other Models (1.5x)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'claude-sonnet-5', name: 'Claude Sonnet 5', directApi: '🟢 Sim ($2/$10)', cursor: '🟢 Other Models (1.0x)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'claude-opus-4-6', name: 'Claude Opus 4.6', directApi: '🟡 Legacy ($5/$25)', cursor: '🟡 Legacy', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 2 Compartilhado', openrouter: '🟡 Legacy', local: '🔴 Proprietário' },
    { modelId: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', directApi: '🟡 Legacy ($3/$15)', cursor: '🟡 Legacy', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 2 Compartilhado', openrouter: '🟡 Legacy', local: '🔴 Proprietário' },
    { modelId: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', directApi: '🟢 Sim ($1/$5)', cursor: '🟢 Other Models (1.0x)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gemini-3-8-flash', name: 'Gemini 3.8 Flash', directApi: '🟢 Sim ($0.75/$3.75 promo)', cursor: '🟢 Cursor Models (Generoso)', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 1 (Principal)', openrouter: '🟢 Sim', local: '🔴 Nuvem Google' },
    { modelId: 'gemini-3-7-flash', name: 'Gemini 3.7 Flash', directApi: '🟢 Sim ($0.75/$3.75)', cursor: '🟢 Cursor Models', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 1', openrouter: '🟢 Sim', local: '🔴 Nuvem Google' },
    { modelId: 'gemini-3-5-flash', name: 'Gemini 3.5 Flash', directApi: '🟢 Sim ($0.075/$0.30)', cursor: '🟢 Other Models', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 1', openrouter: '🟢 Sim', local: '🔴 Nuvem Google' },
    { modelId: 'gemini-3-1-pro', name: 'Gemini 3.1 Pro', directApi: '🟢 Sim ($1.25/$5.00)', cursor: '🟡 Other Models', opencode: '🔴 Indisponível', antigravity: '🟢 Pool 2 (Base/Ultra)', openrouter: '🟢 Sim', local: '🔴 Nuvem Google' },
    { modelId: 'gpt-5-6-sol', name: 'GPT-5.6 Sol', directApi: '🟢 Sim ($4/$20)', cursor: '🟢 Other Models (2.0x)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gpt-5-6-terra', name: 'GPT-5.6 Terra', directApi: '🟢 Sim ($2/$12)', cursor: '🟢 Other Models (1.0x)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gpt-5-6-luna', name: 'GPT-5.6 Luna', directApi: '🟢 Sim ($0.20/$1.20)', cursor: '🟢 Other Models', opencode: '🟢 Go (4× burn • 10.250 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gpt-5-6-pro', name: 'GPT-5.6 Sol Pro', directApi: '🟢 Sim ($15/$60)', cursor: '🟡 Other Models (2.0x)', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Proprietário' },
    { modelId: 'gpt-oss-20b', name: 'gpt-oss-20b', directApi: '🟢 Open Weights', cursor: '🟢 Local via Ollama/vLLM', opencode: '🔴 Indisponível (Suporte Local CLI)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 100% Local (16GB VRAM)' },
    { modelId: 'gpt-oss-120b', name: 'gpt-oss-120b', directApi: '🟢 Open Weights', cursor: '🟢 Local via vLLM', opencode: '🔴 Indisponível (Suporte Local CLI)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 100% Local (80GB VRAM)' },
    { modelId: 'grok-4-6', name: 'Grok 4.6', directApi: '🟢 Sim ($2/$10)', cursor: '🟢 Cursor Models (Generoso)', opencode: '🟢 Go (4× burn • 845 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Nuvem xAI' },
    { modelId: 'grok-4-5', name: 'Grok 4.5', directApi: '🟢 Sim ($1/$5)', cursor: '🟢 Cursor Models', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Nuvem xAI' },
    { modelId: 'glm-5-3-flash', name: 'GLM-5.3-Flash (ex-Ox Alpha)', directApi: '🟢 Sim MIT ($0.15/$0.50)', cursor: '🟢 First-class (OpenRouter)', opencode: '🟢 Go (4× burn • 7.900 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 z-ai/glm-5.3-flash', local: '🟢 320B MoE (KTransformers)' },
    { modelId: 'glm-5-3', name: 'GLM-5.3', directApi: '🟢 Sim ($1/$3)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (4× burn • 1.080 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'glm-5-2', name: 'GLM-5.2', directApi: '🟢 Sim ($0.60/$2)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 4.300 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'glm-5-1', name: 'GLM-5.1', directApi: '🟢 Sim ($0.40/$1.50)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 4.300 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'kimi-k3', name: 'Kimi K3', directApi: '🟢 Sim (¥ / $)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (4× burn • 490 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster 8x H100' },
    { modelId: 'kimi-k2-7-code', name: 'Kimi K2.7 Code', directApi: '🟢 Sim', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 6.750 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'kimi-k2-6', name: 'Kimi K2.6', directApi: '🟢 Sim', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 5.750 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Multi-GPU' },
    { modelId: 'deepseek-v4-pro-0813', name: 'DeepSeek-V4-Pro', directApi: '🟢 Sim ($0.80/$2.40)', cursor: '🟢 OpenRouter / DeepSeek API', opencode: '🟢 Go (4× burn • 5.200 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster FP8' },
    { modelId: 'deepseek-v4-flash-0731', name: 'DeepSeek-V4-Flash', directApi: '🟢 Sim ($0.22/$0.66)', cursor: '🟢 OpenRouter / Direct API', opencode: '🟢 Go (2× burn • 37.800 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 304B MoE Local' },
    { modelId: 'deepseek-v4-vision-exp', name: 'DeepSeek-V4-Flash-Vision-Exp', directApi: '🟢 Sim ($0.22/$0.66)', cursor: '🟢 Direct API', opencode: '🟢 Go (4× burn • 18.900 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Preview de Pesquisa' },
    { modelId: 'deepseek-v3-2', name: 'DeepSeek-V3.2', directApi: '🟡 Legacy ($0.14/$0.28)', cursor: '🟡 Legacy', opencode: '🔴 Descontinuado', antigravity: '🔴 Indisponível', openrouter: '🟡 Legacy', local: '🟢 671B MoE' },
    { modelId: 'qwen3-8-max', name: 'Qwen3.8 Max', directApi: '🟢 Sim Alibaba Cloud', cursor: '🟡 OpenRouter', opencode: '🟢 Go (4× burn • 810 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🔴 Serviço Gerenciado' },
    { modelId: 'qwen3-8-2-4t-a95b', name: 'Qwen3.8-2.4T-A95B', directApi: '🟢 Open Weights Apache 2.0', cursor: '🟡 vLLM / SGLang', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster 4x-8x H100' },
    { modelId: 'qwen3-8-27b', name: 'Qwen3.8-27B', directApi: '🟢 Open Weights', cursor: '🟢 Ollama / vLLM', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 1x RTX 4090 / 32GB' },
    { modelId: 'qwen3-7-max', name: 'Qwen3.7 Max', directApi: '🟡 Legacy', cursor: '🟡 Legacy', opencode: '🟢 Go (2× burn • 840 req)', antigravity: '🔴 Indisponível', openrouter: '🟡 Legacy', local: '🔴 Serviço' },
    { modelId: 'mimo-v2-5-pro', name: 'MiMo-V2.5-Pro', directApi: '🟢 Sim ($0.40/$1.20)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (4× burn • 16.300 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster 500B' },
    { modelId: 'mimo-v2-5', name: 'MiMo-V2.5 (Base)', directApi: '🟢 Sim ($0.05/$0.15)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 150.400 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 160B MoE (KTransformers)' },
    { modelId: 'minimax-m3', name: 'MiniMax M3', directApi: '🟢 Sim ($0.40/$1.20)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 16.000 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster 420B' },
    { modelId: 'minimax-m2-7', name: 'MiniMax M2.7', directApi: '🟢 Sim ($0.20/$0.60)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 17.000 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 230B MoE Local' },
    { modelId: 'composer-2-5', name: 'Composer 2.5', directApi: '🔴 Exclusivo Cursor IDE', cursor: '🟢 Nativo Cursor Models', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🔴 Indisponível', local: '🔴 Proprietário Cursor' },
    { modelId: 'nemotron-3-5-lightning', name: 'Nemotron 3.5 Lightning', directApi: '🟢 NVIDIA NIM / Open Weights', cursor: '🟢 Local / NIM', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 1x RTX 4090 (NVFP4)' },
    { modelId: 'hy3-tencent', name: 'Tencent Hy3', directApi: '🟢 Sim ($0.14/$0.58)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 21.500 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 300B MoE Local' },
    { modelId: 'longcat-2-0', name: 'LongCat-2.0', directApi: '🟢 Sim ($0.10/$0.30)', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 57.200 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟡 Cluster Grande' },
    { modelId: 'muse-spark-1-2', name: 'Muse Spark 1.2', directApi: '🟢 Open Weights MIT', cursor: '🟡 OpenRouter', opencode: '🟢 Go (1× burn • 226.600 req)', antigravity: '🔴 Indisponível', openrouter: '🟢 Sim', local: '🟢 Local Multi-GPU' },
    { modelId: 'gpt-5-5-preview', name: 'GPT-5.5 Preview', directApi: '🟡 Superseded', cursor: '🟡 Superseded', opencode: '🔴 Indisponível', antigravity: '🔴 Indisponível', openrouter: '🟡 Superseded', local: '🔴 Proprietário' }
  ]
};

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OPENCODE_GO_DATA, PLATFORM_MODEL_CATALOG };
}
