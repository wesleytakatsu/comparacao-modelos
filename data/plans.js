/**
 * DATA PACK: BANCO CANÔNICO DE PLANOS & ASSINATURAS DE IA (SUBSCRIPTIONS)
 * Data de Referência: 03/09/2026 ~03:30 BRT
 * 
 * Separação Arquitetural Estrita (Seções 1 a 73 e 88 a 90):
 * - includedModels: Somente nomes canônicos de modelos de IA (via getter a partir de modelAccess).
 * - features: Ferramentas e recursos de plataforma (Canvas, Deep Research, Workspaces, etc.).
 * - storage: Capacidade de nuvem (GB/TB) e benefícios regionais.
 * - usage: Multiplicadores operacionais de cota e limites.
 * - credits: Créditos de inferência, Flow credits, MCP quotas e SDK allocations.
 * - surfaces: Entry points de produto (chatgpt-chat, codex, claude-code, etc.).
 * - privacy: Governança, retenção, política de treinamento e ZDR estrito (noTraining !== zdr).
 */

function derivePlanFamily(planId, provider, targetAudience) {
  if (planId.startsWith('openai-chatgpt-business')) return 'openai-chatgpt-business';
  if (planId === 'openai-chatgpt-enterprise') return 'openai-chatgpt-enterprise';
  if (planId.startsWith('openai-chatgpt')) return 'openai-chatgpt-consumer';
  if (planId.startsWith('anthropic-claude-team')) return 'anthropic-claude-team';
  if (planId === 'anthropic-claude-enterprise') return 'anthropic-claude-enterprise';
  if (planId.startsWith('anthropic-claude')) return 'anthropic-claude-consumer';
  if (planId.startsWith('google-ai')) return 'google-ai-consumer';
  if (planId.startsWith('cursor-teams')) return 'cursor-teams';
  if (planId.startsWith('cursor-')) return 'cursor-individual';
  if (planId.startsWith('opencode-')) return 'opencode-plans';
  if (planId.startsWith('zai-coding')) return 'zai-coding';
  if (planId.startsWith('kimi-membership')) return 'kimi-membership';
  if (planId === 'xai-grok-business') return 'xai-grok-business';
  if (planId === 'xai-grok-enterprise') return 'xai-grok-enterprise';
  if (planId.startsWith('xai-')) return 'xai-grok-consumer';
  if (planId.startsWith('camelai-stream')) return 'camelai-stream';
  if (planId.startsWith('camelai-code')) return 'camelai-code';
  return `${provider}-${targetAudience || 'general'}`;
}

function createPlanRecord(data) {
  const record = {
    id: data.id,
    provider: data.provider,
    product: data.product,
    planName: data.planName,
    planFamily: data.planFamily || derivePlanFamily(data.id, data.provider, data.targetAudience),
    targetAudience: data.targetAudience, // 'individual' | 'team' | 'enterprise'
    profileTags: data.profileTags || [],
    
    pricing: {
      nativeCurrency: data.pricing?.nativeCurrency || data.nativeCurrency || 'USD',
      monthlyPriceUsd: data.pricing?.monthlyPriceUsd !== undefined ? data.pricing.monthlyPriceUsd : data.monthlyPriceUsd,
      annualPriceUsd: data.pricing?.annualPriceUsd !== undefined ? data.pricing.annualPriceUsd : data.annualPriceUsd,
      monthlyPriceCny: data.pricing?.monthlyPriceCny || null,
      annualPriceCny: data.pricing?.annualPriceCny || null,
      billingPeriod: data.pricing?.billingPeriod || data.billingPeriod || 'monthly',
      localizedPricing: data.pricing?.localizedPricing || data.localizedPricing || null,
      pricingVisibility: data.pricing?.pricingVisibility || 'public',
      minSeats: data.pricing?.minSeats || data.minSeats || 1,
      maxSeats: data.pricing?.maxSeats || data.maxSeats || null,
      usageBundles: data.pricing?.usageBundles || null
    },

    // Campos planos retrocompatíveis para o frontend existente
    nativeCurrency: data.pricing?.nativeCurrency || data.nativeCurrency || 'USD',
    monthlyPriceUsd: data.pricing?.monthlyPriceUsd !== undefined ? data.pricing.monthlyPriceUsd : data.monthlyPriceUsd,
    annualPriceUsd: data.pricing?.annualPriceUsd !== undefined ? data.pricing.annualPriceUsd : data.annualPriceUsd,
    monthlyPriceCny: data.pricing?.monthlyPriceCny || null,
    annualPriceCny: data.pricing?.annualPriceCny || null,
    localizedPricing: data.pricing?.localizedPricing || data.localizedPricing || null,
    billingPeriod: data.pricing?.billingPeriod || data.billingPeriod || 'monthly',
    minSeats: data.pricing?.minSeats || data.minSeats || 1,

    modelAccess: (data.modelAccess || []).map(m => {
      const knownPlatformSkus = ['kimi-for-coding', 'kimi-for-coding-highspeed', 'camel-free', 'premium-models', 'grok-bot', 'stream-fleet-auto'];
      const isPlatformSku = m.platformSku !== undefined 
        ? m.platformSku 
        : knownPlatformSkus.includes(m.modelId);
      return {
        ...m,
        platformSku: isPlatformSku
      };
    }),
    features: data.features || [],
    storage: (function() {
      const s = data.storage || { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null };
      const tb = s.localizedBenefits?.BR?.storageTb || s.cloudStorageTb || null;
      const gb = s.includedGb || s.cloudStorageGb || (tb ? tb * 1000 : null);
      return {
        ...s,
        includedGb: gb,
        cloudStorageGb: gb,
        cloudStorageTb: tb,
        type: s.type || (data.provider === 'google' ? 'Google Drive' : 'Cloud Storage')
      };
    })(),
    usage: data.usage || { unlimitedCompletions: false, notes: '' },
    credits: data.credits || {
      flowCreditsMonthly: null,
      flowCreditsDaily: null,
      flowRollover: false,
      canPurchaseAiCredits: false,
      agentSdkMonthlyCreditUsd: null,
      premiumModelCreditsUsd: null,
      notes: ''
    },
    surfaces: data.surfaces || [],
    privacy: data.privacy || {
      profileType: 'consumer',
      modelTrainingControl: false,
      noTrainingByDefault: false,
      zdr: false,
      retentionPolicy: 'standard',
      retentionDays: null,
      notes: ''
    },

    pools: data.pools || [],
    quotaDescription: data.quotaDescription || '',
    overageAllowed: !!data.overageAllowed,
    apiIncluded: !!data.apiIncluded,
    bestFor: data.bestFor || '',
    privacyNotes: data.privacy?.notes || data.privacyNotes || '',
    verifiedAt: '2026-09-03',
    current: true
  };

  // Getter para includedModels: extrai estritamente os modelos com acesso incluído
  Object.defineProperty(record, 'includedModels', {
    get() {
      const models = [];
      if (Array.isArray(this.modelAccess)) {
        this.modelAccess.forEach(m => {
          if (m.included && m.modelName && !models.includes(m.modelName)) {
            models.push(m.modelName);
          }
        });
      }
      return models;
    },
    enumerable: true,
    configurable: true
  });

  return record;
}

const SUBSCRIPTION_PLANS_DATA = [
  // ==========================================
  // 1. OPENAI / CHATGPT (Seções 1 a 11)
  // ==========================================
  createPlanRecord({
    id: 'openai-chatgpt-free',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Free',
    targetAudience: 'individual',
    profileTags: ['casual', 'student'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 0,
      annualPriceUsd: null,
      localizedPricing: { BRL: { price: 0, official: true } },
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['low'], notes: 'Default cotidiano; conversas cotidianas têm limites dinâmicos em uploads/imagem/voz' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['low'], notes: 'Acesso leve de codificação no Codex (não no chat padrão)' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-chat', available: false, included: false, billingMode: 'none', efforts: [], notes: 'Não incluído no plano Free' }
    ],
    features: ['Canvas', 'Code Interpreter', 'Web Search', 'Voice Mode (Básico)'],
    storage: { cloudStorageGb: 1, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Conversas cotidianas têm ressalva clara de limites em uploads e análise.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['chatgpt-chat', 'codex'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Opt-out disponível nas configurações; sem ZDR formal.' },
    pools: ['Free Tier'],
    quotaDescription: 'Uso gratuito de GPT-5.6 Luna com restrições dinâmicas e Codex leve.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Uso casual, aprendizado e tarefas pontuais sem custo.'
  }),

  createPlanRecord({
    id: 'openai-chatgpt-go',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Go',
    targetAudience: 'individual',
    profileTags: ['student', 'casual', 'indie-dev'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 8,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['low', 'medium'], notes: 'Default diário' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['medium'], notes: 'Cota de codificação ampliada no Codex (não no chat padrão)' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-chat', available: false, included: false, billingMode: 'none', efforts: [], notes: 'Não incluído' }
    ],
    features: ['Canvas', 'Code Interpreter', 'File Uploads Ampliados', 'Web Search'],
    storage: { cloudStorageGb: 10, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Cota intermediária leve.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['chatgpt-chat', 'codex'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Opt-out manual nas configurações; sem ZDR.' },
    pools: ['Go Tier'],
    quotaDescription: 'Cota intermediária com maior tolerância de tokens e uploads que o Free.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Estudantes e desenvolvedores com orçamento muito reduzido.'
  }),

  createPlanRecord({
    id: 'openai-chatgpt-plus',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Plus',
    targetAudience: 'individual',
    profileTags: ['dev', 'pro', 'power-user'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 20,
      annualPriceUsd: null,
      localizedPricing: { BRL: { price: 102.16, official: false } },
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['instant', 'medium', 'high'], notes: 'Acesso primário com esforços Instant, Medium e High no chat cotidiano' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-work', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high'], notes: 'Workflows colaborativos no Work' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Disponível em chatgpt-work e codex (não selecionável no picker padrão de chat)' },
      { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['low'], notes: 'Disponível em codex e background (não selecionável no picker padrão de chat)' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (GPT-6 Pro)', surface: 'chatgpt-chat', available: false, included: false, billingMode: 'none', efforts: [], notes: 'GPT-6 Pro Chat não incluído na assinatura Plus' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Rollout limitado de Astra dentro da allowance de Work/Codex; créditos adicionais podem ser adquiridos' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Rollout limitado de Astra no Codex' }
    ],
    features: ['Canvas', 'Deep Research', 'ChatGPT Work', 'Codex', 'Voice Mode Avançado', 'Custom GPTs'],
    storage: { cloudStorageGb: 100, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, usageMultiplierVsPlus: 1.0, notes: 'Cota padrão de raciocínio frontier no chat cotidiano.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['chatgpt-chat', 'chatgpt-work', 'codex'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Configurável pelo usuário (opt-out); não possui ZDR corporativo.' },
    pools: ['Plus Tier'],
    quotaDescription: 'GPT-6 Pro Chat NÃO incluído no Plus (Work/Codex possui rollout limitado). Cota padrão de GPT-5.6 Sol (Instant, Medium, High) e acesso a Work e Codex.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Desenvolvedores e profissionais com necessidade diária de raciocínio frontier e Deep Research.'
  }),

  createPlanRecord({
    id: 'openai-chatgpt-pro-5x',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Pro (5x)',
    targetAudience: 'individual',
    profileTags: ['power-user', 'researcher', 'engineer'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 100,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high', 'xhigh'], notes: '5x uso de raciocínio profundo Sol vs Plus' },
      { modelId: 'gpt-5-6-pro', modelName: 'GPT-5.6 Sol Pro', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], notes: 'Acesso exclusivo de produto ao Sol Pro para investigações críticas' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (GPT-6 Pro)', surface: 'chatgpt-chat', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: '50 msgs/semana compartilhadas entre GPT-6 Pro e Sol Pro' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: 'Full existing allowance de Work/Codex sob rollout' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: 'Full existing allowance de Codex' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Trabalho pesado com contexto amplo em Work' },
      { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['max'], notes: 'Workers de execução rápida no Codex' }
    ],
    features: ['Canvas', 'Deep Research Ilimitado', 'ChatGPT Work Pro', 'Codex Pro', 'Compute Prioritário'],
    storage: { cloudStorageGb: 500, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 1.0, usageMultiplierVsPlus: 5.0, notes: '5x capacidade de raciocínio do Plus.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['chatgpt-chat', 'chatgpt-work', 'codex'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Plano pessoal; opt-out manual disponível; sem ZDR corporativo.' },
    pools: ['Pro 5x Pool'],
    quotaDescription: '50 msgs/semana compartilhadas entre GPT-6 Pro e Sol Pro; full allowance existente em Work/Codex.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Engenheiros de software e pesquisadores que necessitam de raciocínio de fronteira (GPT-6 Pro) e alto volume de coding.'
  }),

  createPlanRecord({
    id: 'openai-chatgpt-pro-20x',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Pro (20x)',
    targetAudience: 'individual',
    profileTags: ['elite-dev', 'frontier-researcher'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 200,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high', 'xhigh'], notes: '20x cota de raciocínio Sol vs Plus' },
      { modelId: 'gpt-5-6-pro', modelName: 'GPT-5.6 Sol Pro', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], notes: 'Cota de 170 msgs/dia de Sol Pro para workflows persistentes' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (GPT-6 Pro)', surface: 'chatgpt-chat', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh', 'max'], notes: '200 msgs/semana GPT-6 Pro Chat (fallback para Sol Thinking Medium ao expirar); cap combinado de 200 msgs/dia' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: 'Full existing allowance de Work/Codex' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: 'Full existing allowance de Codex' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Workflows densos em Work' },
      { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['max'], notes: 'Execuções mecânicas em massa no Codex' }
    ],
    features: ['Canvas', 'Deep Research Prioritário Máximo', 'ChatGPT Work Pro', 'Codex Pro Ultra', 'Fila de Alta Prioridade'],
    storage: { cloudStorageGb: 1000, cloudStorageTb: 1, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 4.0, usageMultiplierVsPlus: 20.0, notes: '20x cota do Plus.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['chatgpt-chat', 'chatgpt-work', 'codex'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Sem ZDR corporativo automático; controle via configurações de usuário.' },
    pools: ['Pro 20x Pool'],
    quotaDescription: '200 msgs/semana GPT-6 Pro Chat (fallback para Sol Thinking Medium), cap diário combinado de 200 msgs/dia e full allowance em Work/Codex.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Pesquisadores de IA e desenvolvedores independentes em regime intensivo de computação frontier.'
  }),

  createPlanRecord({
    id: 'openai-chatgpt-business-standard',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Business Standard',
    targetAudience: 'team',
    profileTags: ['team', 'startup', 'smb'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 25,
      annualPriceUsd: 240, // $20/mês equivalente anual
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 2
    },
    modelAccess: [
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['instant', 'medium', 'high'], notes: 'Cota de equipe compartilhada/gerenciada' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (GPT-6 Pro)', surface: 'chatgpt-chat', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: '15 msgs/mês Pro compartilhadas entre GPT-6 Pro e Sol Pro' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Range estimado de 3–30 msgs locais / janela de 5h em Work/Codex' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Espaços de trabalho corporativos' },
      { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['low', 'medium'], notes: 'Coding colaborativo' }
    ],
    features: ['Canvas', 'Deep Research', 'Workspaces Compartilhados', 'Admin Console', 'SSO SAML', 'Analytics de Uso'],
    storage: { cloudStorageGb: 500, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, usageMultiplierVsPlus: 1.0, notes: 'Cota profissional para equipes (mínimo 2 assentos).' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['chatgpt-chat', 'chatgpt-work', 'codex'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'business-standard', retentionDays: 90, notes: 'Dados excluídos de treino por padrão; ZDR exige contrato corporativo customizado.' },
    pools: ['Business Standard Pool'],
    quotaDescription: 'US$ 25/mês (ou US$ 20/mês no plano anual). 15 msgs/mês Pro compartilhadas e 3–30 msgs locais de Astra / 5h em Work/Codex.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Pequenas equipes que necessitam de governança e exclusão de treino por padrão.'
  }),

  createPlanRecord({
    id: 'openai-chatgpt-business-premium',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Business Premium',
    targetAudience: 'team',
    profileTags: ['team', 'scaleup', 'enterprise-team'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 125,
      annualPriceUsd: 1200, // $100/mês equivalente anual
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 2
    },
    modelAccess: [
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high', 'xhigh'], notes: '5x uso do Standard sem a janela móvel rígida de 5 horas' },
      { modelId: 'gpt-5-6-pro', modelName: 'GPT-5.6 Sol Pro', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], notes: 'Escalonamento corporativo para resolução de incidentes' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (GPT-6 Pro)', surface: 'chatgpt-chat', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: '50 msgs/semana Pro compartilhadas entre GPT-6 Pro e Sol Pro' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: '~5x uso do Standard sem a restrição da janela móvel de 5h' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Workspaces intensivos' }
    ],
    features: ['Canvas', 'Deep Research Prioritário', 'Workspaces Ilimitados', 'Admin Console Avançado', 'SSO/SCIM', 'Audit Logs', 'Suporte Dedicado'],
    storage: { cloudStorageGb: 2000, cloudStorageTb: 2, localizedBenefits: null },
    usage: { unlimitedCompletions: false, usageMultiplierVsPlus: 5.0, notes: '5x uso do Standard; sem limitação de janela de 5 horas.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['chatgpt-chat', 'chatgpt-work', 'codex'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'business-extended', retentionDays: 180, notes: 'Sem treino por padrão; ZDR disponível mediante aditivo Enterprise.' },
    pools: ['Business Premium Pool'],
    quotaDescription: 'US$ 125/mês (ou US$ 100/mês anual). 50 msgs/semana Pro compartilhadas e ~5x capacidade de Work/Codex do Standard sem janela de 5h.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Equipes técnicas com alta demanda contínua de raciocínio de código e auditoria.'
  }),

  createPlanRecord({
    id: 'openai-chatgpt-enterprise',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Enterprise',
    targetAudience: 'team',
    profileTags: ['enterprise', 'compliance', 'security'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: null,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'custom',
      pricingVisibility: 'contact-sales',
      minSeats: 150
    },
    modelAccess: [
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['instant', 'medium', 'high', 'xhigh'], notes: 'Sem janelas de 5h ou limites interativos' },
      { modelId: 'gpt-5-6-pro', modelName: 'GPT-5.6 Sol Pro', surface: 'chatgpt-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], notes: 'Disponível conforme contrato' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (GPT-6 Pro)', surface: 'chatgpt-chat', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh', 'max'], notes: 'Acesso sujeito a controles administrativos corporativos e rollout' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: 'Workspaces corporativos Enterprise' },
      { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['high', 'xhigh'], notes: 'Codex corporativo Enterprise' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', surface: 'chatgpt-work', available: true, included: false, billingMode: 'included', efforts: ['high'], notes: 'Workspaces corporativos' },
      { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', surface: 'codex', available: true, included: false, billingMode: 'included', efforts: ['max'], notes: 'Codex corporativo' }
    ],
    features: ['Canvas', 'Deep Research Ilimitado', 'Workspaces Ilimitados', 'Admin Console Avançado', 'SSO/SAML/SCIM', 'Domain Verification', 'Audit Logs API', 'Contrato BAA/HIPAA'],
    storage: { cloudStorageGb: null, cloudStorageTb: 10, localizedBenefits: null },
    usage: { unlimitedCompletions: false, usageMultiplierVsPlus: 20.0, notes: 'Uso ilimitado de GPT-5.6 Sol em alta velocidade sem limites de 5 horas.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['chatgpt-chat', 'chatgpt-work', 'codex'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: true, retentionPolicy: 'enterprise-custom-retention', retentionDays: 0, notes: 'ZDR formal garantido contratualmente; dados de clientes não são usados para treino.' },
    pools: ['Enterprise Dedicated Pool'],
    quotaDescription: 'Contrato comercial customizado. Alta velocidade sem janela de 5h, ZDR formal e console de compliance.',
    overageAllowed: false,
    apiIncluded: false,
  }),

  // ==========================================
  // 2. CLAUDE / ANTHROPIC (Seções 14 a 28)
  // ==========================================
  createPlanRecord({
    id: 'anthropic-claude-free',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Free',
    targetAudience: 'individual',
    profileTags: ['casual', 'student'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 0,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['none', 'low'], notes: 'Limites dinâmicos de mensagens' },
      { modelId: 'claude-haiku-4-5', modelName: 'Claude Haiku 4.5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['none'], notes: 'Fallback leve' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'claude-chat', available: false, included: false, billingMode: 'none', efforts: [], notes: 'Indisponível no plano Free' }
    ],
    features: ['Artifacts', 'Projects (Leve)', 'Web Search'],
    storage: { cloudStorageGb: 1, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Limite estrito de mensagens com recarga a cada 5 horas.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['claude-chat'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Opt-out manual disponível nas configurações de conta.' },
    pools: ['Claude Free Tier'],
    quotaDescription: 'Acesso básico com limites de sessão renováveis a cada 5 horas.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Interações casuais e experimentação do ecossistema Claude.'
  }),

  createPlanRecord({
    id: 'anthropic-claude-pro',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Pro',
    targetAudience: 'individual',
    profileTags: ['dev', 'pro', 'researcher'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 20,
      annualPriceUsd: 200, // $16.67/mês equivalente anual
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1,
      usageBundles: { tier1: { creditsUsd: 50, priceUsd: 45, discountPct: 10 }, tier2: { creditsUsd: 250, priceUsd: 200, discountPct: 20 }, tier3: { creditsUsd: 1000, priceUsd: 700, discountPct: 30 }, maxMonthlySpendUsd: 2000 }
    },
    modelAccess: [
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['low', 'medium', 'high'], notes: 'Daily driver principal com raciocínio adaptativo' },
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Raciocínio profundo de arquitetura' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'claude-chat', available: true, included: false, billingMode: 'usage-credits', efforts: ['high', 'max'], notes: 'Disponível na interface porém NÃO incluído na cota base do plano; tarifado exclusivamente via usage-credits/recargas' },
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', surface: 'claude-code', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Coding CLI oficial' }
    ],
    features: ['Artifacts', 'Projects com 200k tokens', 'Claude Code CLI', 'Adaptive Thinking', 'Análise de Código'],
    storage: { cloudStorageGb: 50, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 1.0, notes: '5x cota do Free para Sonnet/Opus.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: 20, premiumModelCreditsUsd: 0, notes: 'Crédito separado de US$ 20/mês para Agent SDK.' },
    surfaces: ['claude-chat', 'claude-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Opt-out manual; não possui ZDR corporativo.' },
    pools: ['Pro Pool'],
    quotaDescription: 'US$ 20/mês (ou US$ 200 anual). 5x uso de Sonnet/Opus. Fable 5.1 tarifado via usage-credits.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Desenvolvedores solos e engenheiros que buscam excelência em coding com Sonnet 5 e Opus 5.'
  }),

  createPlanRecord({
    id: 'anthropic-claude-max-5x',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Max (5x)',
    targetAudience: 'individual',
    profileTags: ['power-user', 'lead-dev'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 100,
      annualPriceUsd: null, // Mensal apenas
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1,
      usageBundles: { tier1: { creditsUsd: 50, priceUsd: 45, discountPct: 10 }, tier2: { creditsUsd: 250, priceUsd: 200, discountPct: 20 }, tier3: { creditsUsd: 1000, priceUsd: 700, discountPct: 30 }, maxMonthlySpendUsd: 2000 }
    },
    modelAccess: [
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['low', 'medium', 'high'], notes: '5x cota do Pro' },
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], notes: '5x cota do Pro' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], weeklyShareCapPct: 50, notes: 'Incluído na assinatura base com limite semanal de até 50% da cota total do plano' }
    ],
    features: ['Artifacts', 'Projects Avançados', 'Claude Code CLI Max', 'Fila Prioritária'],
    storage: { cloudStorageGb: 250, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 5.0, notes: '5x capacidade de sessão do Pro. Fable 5.1 com teto de 50% de cota semanal.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: 100, premiumModelCreditsUsd: 0, notes: 'Crédito mensal separado de US$ 100 para Agent SDK.' },
    surfaces: ['claude-chat', 'claude-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Conta pessoal; sem garantia contratual de ZDR.' },
    pools: ['Max 5x Pool'],
    quotaDescription: 'US$ 100/mês (somente mensal). 5x capacidade do Pro. Fable 5.1 incluído até 50% da cota semanal.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Desenvolvedores intensivos que necessitam de Fable 5.1 nativo e alta volumetria de Opus 5.'
  }),

  createPlanRecord({
    id: 'anthropic-claude-max-20x',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Max (20x)',
    targetAudience: 'individual',
    profileTags: ['frontier-dev', 'ai-architect'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 200,
      annualPriceUsd: null, // Mensal apenas
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1,
      usageBundles: { tier1: { creditsUsd: 50, priceUsd: 45, discountPct: 10 }, tier2: { creditsUsd: 250, priceUsd: 200, discountPct: 20 }, tier3: { creditsUsd: 1000, priceUsd: 700, discountPct: 30 }, maxMonthlySpendUsd: 2000 }
    },
    modelAccess: [
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '20x cota do Pro' },
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: '20x cota do Pro' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['max'], weeklyShareCapPct: 50, notes: 'Incluído na base; cota semanal limitada a 50% do volume total do plano' }
    ],
    features: ['Artifacts', 'Projects Ilimitados', 'Claude Code CLI Max 20x', 'Máxima Prioridade em Horários de Pico'],
    storage: { cloudStorageGb: 1000, cloudStorageTb: 1, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 20.0, notes: '20x cota do Pro. Fable 5.1 incluído com cota semanal até 50%.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: 200, premiumModelCreditsUsd: 0, notes: 'Crédito de US$ 200/mês para Agent SDK.' },
    surfaces: ['claude-chat', 'claude-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Sem ZDR automático; retenção pessoal padrão.' },
    pools: ['Max 20x Pool'],
    quotaDescription: 'US$ 200/mês (somente mensal). 20x capacidade do Pro. Fable 5.1 incluído com limite de 50% semanal.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Arquitetos de software líderes e pesquisadores com workflows contínuos de raciocínio profundo.'
  }),

  createPlanRecord({
    id: 'anthropic-claude-team-standard',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Team Standard',
    targetAudience: 'team',
    profileTags: ['team', 'startup'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 25,
      annualPriceUsd: 240, // $20/mês equivalente anual
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 2,
      maxSeats: 150,
      usageBundles: { tier1: { creditsUsd: 50, priceUsd: 45, discountPct: 10 }, tier2: { creditsUsd: 250, priceUsd: 200, discountPct: 20 }, tier3: { creditsUsd: 1000, priceUsd: 700, discountPct: 30 }, maxMonthlySpendUsd: 3000 }
    },
    modelAccess: [
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['low', 'medium', 'high'], notes: '1.25x uso vs Claude Pro individual' },
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '1.25x uso vs Claude Pro individual' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'claude-chat', available: true, included: false, billingMode: 'usage-credits', efforts: ['high'], notes: 'Disponível na UI, consumido via usage-credits' }
    ],
    features: ['Artifacts Compartilhados', 'Projetos de Equipe', 'Admin Console', 'Faturamento Centralizado'],
    storage: { cloudStorageGb: 200, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 1.25, notes: '1.25x capacidade vs Claude Pro individual.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: 20, premiumModelCreditsUsd: 0, notes: 'US$ 20/mês/seat para Agent SDK.' },
    surfaces: ['claude-chat', 'claude-code'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'team-standard', retentionDays: 90, notes: 'Sem treino por padrão; sem alegação de ZDR corporativo sem aditivo Enterprise.' },
    pools: ['Team Standard Pool'],
    quotaDescription: 'US$ 25/mês (ou US$ 20 anual). Mínimo 2, máximo 150 assentos. 1.25x uso do Pro.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Equipes de 2 a 150 membros que buscam projetos colaborativos e gestão centralizada.'
  }),

  createPlanRecord({
    id: 'anthropic-claude-team-premium',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Team Premium',
    targetAudience: 'team',
    profileTags: ['team', 'scaleup', 'engineering-team'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 125,
      annualPriceUsd: 1200, // $100/mês equivalente anual
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 2,
      maxSeats: 150,
      usageBundles: { tier1: { creditsUsd: 50, priceUsd: 45, discountPct: 10 }, tier2: { creditsUsd: 250, priceUsd: 200, discountPct: 20 }, tier3: { creditsUsd: 1000, priceUsd: 700, discountPct: 30 }, maxMonthlySpendUsd: 3000 }
    },
    modelAccess: [
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '6.25x uso vs Claude Pro individual' },
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: '6.25x uso vs Claude Pro individual' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], weeklyShareCapPct: 50, notes: 'Incluído com cota semanal de até 50% do uso total' }
    ],
    features: ['Artifacts Avançados', 'Projetos Ilimitados', 'Admin Console Corporativo', 'SSO SAML', 'Claude Code CLI Team'],
    storage: { cloudStorageGb: 1000, cloudStorageTb: 1, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 6.25, notes: '6.25x capacidade vs Claude Pro individual.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: 100, premiumModelCreditsUsd: 0, notes: 'US$ 100/mês/seat para Agent SDK.' },
    surfaces: ['claude-chat', 'claude-code'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'team-extended', retentionDays: 180, notes: 'Exclusão de treino por padrão; sem ZDR formal.' },
    pools: ['Team Premium Pool'],
    quotaDescription: 'US$ 125/mês (ou US$ 100 anual). Mínimo 2, máximo 150 assentos. 6.25x uso do Pro, Fable 5.1 incluso com 50% cap.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Equipes de engenharia de software com alta demanda de raciocínio profundo e Fable 5.1 incluso.'
  }),

  createPlanRecord({
    id: 'anthropic-claude-enterprise',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Enterprise',
    targetAudience: 'team',
    profileTags: ['enterprise', 'compliance', 'security'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: null,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'custom',
      pricingVisibility: 'contact-sales',
      minSeats: 100,
      usageBundles: { tier1: { creditsUsd: 50, priceUsd: 45, discountPct: 10 }, tier2: { creditsUsd: 250, priceUsd: 200, discountPct: 20 }, tier3: { creditsUsd: 1000, priceUsd: 700, discountPct: 30 }, maxMonthlySpendUsd: 10000 }
    },
    modelAccess: [
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], notes: 'Cota empresarial expandida com contexto de até 500k' },
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', surface: 'claude-chat', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high'], notes: 'Acesso prioritário de altíssima velocidade' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'claude-chat', available: true, included: true, weeklyShareCapPct: 50, billingMode: 'included', efforts: ['max'], notes: 'Acesso incluído até teto semanal contratual' }
    ],
    features: ['Janela de contexto ampliada de 500k', 'Integração Nativa com GitHub', 'Admin Console Enterprise', 'SSO/SAML/SCIM', 'Audit Logs API', 'RBAC Granular'],
    storage: { cloudStorageGb: null, cloudStorageTb: 5, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 10.0, notes: 'Capacidade corporativa superior sem fila compartilhada.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: 20, premiumModelCreditsUsd: 0, notes: 'Crédito mensal Agent SDK de $20 (usage-based) ou $200 (legacy Premium seat).' },
    surfaces: ['claude-chat', 'claude-code', 'claude-cowork', 'claude-agent-sdk'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: true, retentionPolicy: 'enterprise-custom', retentionDays: 0, notes: 'Sem treino por padrão e ZDR sob contrato Enterprise.' },
    pools: ['Anthropic Enterprise Fleet'],
    quotaDescription: 'Preço sob consulta. Contexto de 500k, integração GitHub, Agent SDK e governança centralizada.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Empresas de tecnologia e engenharia com equipes distribuídas e padrões rígidos de compliance.'
  }),

  // ==========================================
  // 3. GOOGLE AI / GOOGLE ONE (Seções 29 a 37)
  // ==========================================
  createPlanRecord({
    id: 'google-ai-free',
    provider: 'google',
    product: 'Google AI',
    planName: 'Google AI Free',
    targetAudience: 'individual',
    profileTags: ['casual', 'student'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 0,
      annualPriceUsd: null,
      localizedPricing: { BRL: { price: 0, official: true } },
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['none', 'low'], notes: 'Throughput ultra-rápido cotidiano' },
      { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['low'], notes: 'Multimodal nativo com limites padrão' }
    ],
    features: ['Busca Google Conectada', 'Geração de Imagens', 'Integração Google Workspace Pessoal'],
    storage: { cloudStorageGb: 15, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Acesso baseline 1x.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: 50, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '50 Flow credits/dia sem rollover.' },
    surfaces: ['gemini-web'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'google-consumer', retentionDays: 540, notes: 'Produto consumer; dados revisados por humanos salvo desativação de atividade.' },
    pools: ['Gemini Free Pool'],
    quotaDescription: '50 Flow credits/dia sem rollover. Acesso padrão a Gemini 3.8 Flash e Gemini 3.7 Flash.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Usuários casuais de produtos Google.'
  }),

  createPlanRecord({
    id: 'google-ai-plus',
    provider: 'google',
    product: 'Google One AI',
    planName: 'Google AI Plus',
    targetAudience: 'individual',
    profileTags: ['casual-pro', 'family'],
    pricing: {
      nativeCurrency: 'BRL',
      monthlyPriceUsd: 4.99,
      annualPriceUsd: null,
      localizedPricing: { BRL: { price: 24.99, official: true } },
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: '2x acesso vs Free' },
      { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: '2x acesso vs Free' }
    ],
    features: ['Compartilhamento Familiar (até 5 membros)', 'Gemini no Gmail e Docs', 'Google Photos Magic Editor'],
    storage: { cloudStorageGb: 400, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, usageMultiplierVsPlus: 1.0, notes: '2x cota de acesso vs Free.' },
    credits: { flowCreditsMonthly: 200, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '200 Flow credits/mês sem rollover. Não pode comprar créditos adicionais.' },
    surfaces: ['gemini-web', 'workspace'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'google-consumer', retentionDays: 540, notes: 'Produto consumer; sem ZDR corporativo.' },
    pools: ['Google AI Plus Pool'],
    quotaDescription: 'R$ 24,99/mês. 400 GB de armazenamento, 200 Flow credits/mês, 2x acesso vs Free, até 5 membros.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Famílias e usuários que desejam armazenamento Google One e IA intermediária.'
  }),

  createPlanRecord({
    id: 'google-ai-pro',
    provider: 'google',
    product: 'Google One AI',
    planName: 'Google AI Pro',
    targetAudience: 'individual',
    profileTags: ['dev', 'pro', 'multimodal'],
    pricing: {
      nativeCurrency: 'BRL',
      monthlyPriceUsd: 19.99,
      annualPriceUsd: null,
      localizedPricing: { BRL: { price: 96.99, official: true } },
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Acesso prioritário de alta vazão' },
      { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Janela de contexto completo de 1M' },
      { modelId: 'gemini-3-1-pro', modelName: 'Gemini 3.1 Pro', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high'], notes: 'Raciocínio científico e multimodal pro' }
    ],
    features: ['Compartilhamento com até 5 membros', 'Gemini Advanced no Workspace', 'Google Antigravity Integration', 'Deep Research'],
    storage: {
      cloudStorageGb: null,
      cloudStorageTb: 2,
      localizedBenefits: {
        BR: { storageTb: 5, notes: 'Benefício exclusivo verificado no Brasil: 5 TB de armazenamento na nuvem' }
      }
    },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 1.0, notes: '4x acesso vs Free.' },
    credits: { flowCreditsMonthly: 1000, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: true, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '1.000 Flow credits/mês sem rollover. Pode comprar créditos de IA adicionais.' },
    surfaces: ['gemini-web', 'workspace', 'antigravity'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'google-consumer', retentionDays: 540, notes: 'Produto consumer; sem ZDR corporativo.' },
    pools: ['Google AI Pro Pool'],
    quotaDescription: 'R$ 96,99/mês. 5 TB no Brasil, 1.000 Flow credits/mês, 4x acesso vs Free, compra de créditos permitida.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Criadores de conteúdo, desenvolvedores no Brasil aproveitando 5 TB e usuários avançados de Gemini Pro.'
  }),

  createPlanRecord({
    id: 'google-ai-ultra-5x',
    provider: 'google',
    product: 'Google One AI',
    planName: 'Google AI Ultra (5x)',
    targetAudience: 'individual',
    profileTags: ['power-user', 'video-creator'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 99.99,
      annualPriceUsd: null,
      localizedPricing: { BRL: { price: 499.99, official: true } },
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '5x uso vs Pro' },
      { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '5x uso vs Pro' },
      { modelId: 'gemini-3-1-pro', modelName: 'Gemini 3.1 Pro', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '5x uso do modelo Pro (multiplicador de uso da cota, NÃO modelo Ultra inventado)' }
    ],
    features: ['20 TB Nuvem', '10.000 Flow credits/mês', 'Até 5 membros', 'Processamento Multimodal de Alta Prioridade'],
    storage: { cloudStorageGb: null, cloudStorageTb: 20, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 5.0, notes: '5x capacidade de uso do Pro (multiplicador de uso de serviço, não de modelo).' },
    credits: { flowCreditsMonthly: 10000, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: true, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '10.000 Flow credits/mês sem rollover. Pode comprar créditos adicionais.' },
    surfaces: ['gemini-web', 'workspace'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'google-consumer', retentionDays: 540, notes: 'Produto consumer; sem ZDR corporativo.' },
    pools: ['Google AI Ultra 5x Pool'],
    quotaDescription: 'US$ 99.99 / R$ 499,99/mês. 20 TB de armazenamento, 10.000 Flow credits/mês, 5x uso do Pro.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Profissionais de mídia com arquivos massivos e automações de geração de vídeo/imagem com Flow.'
  }),

  createPlanRecord({
    id: 'google-ai-ultra-20x',
    provider: 'google',
    product: 'Google One AI',
    planName: 'Google AI Ultra (20x)',
    targetAudience: 'individual',
    profileTags: ['media-studio', 'heavy-storage'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 249.99,
      annualPriceUsd: null,
      localizedPricing: { BRL: { price: 1249.99, official: true } },
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '20x uso vs Pro' },
      { modelId: 'gemini-3-7-flash', modelName: 'Gemini 3.7 Flash', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '20x uso vs Pro' },
      { modelId: 'gemini-3-1-pro', modelName: 'Gemini 3.1 Pro', surface: 'gemini-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '20x uso do modelo Pro' }
    ],
    features: ['30 TB Nuvem', '25.000 Flow credits/mês', 'Até 5 membros', 'Infraestrutura Dedicada para Grandes Volumes'],
    storage: { cloudStorageGb: null, cloudStorageTb: 30, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 20.0, notes: '20x capacidade de uso do Pro.' },
    credits: { flowCreditsMonthly: 25000, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: true, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '25.000 Flow credits/mês sem rollover. Pode comprar créditos adicionais.' },
    surfaces: ['gemini-web', 'workspace'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'google-consumer', retentionDays: 540, notes: 'Produto consumer; sem ZDR corporativo.' },
    pools: ['Google AI Ultra 20x Pool'],
    quotaDescription: 'US$ 249.99 / R$ 1.249,99/mês. 30 TB de armazenamento, 25.000 Flow credits/mês, 20x uso do Pro.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Estúdios de produção e engenheiros com necessidades extremas de armazenamento em nuvem e inferência multimídia.'
  }),

  // ==========================================
  // 4. CURSOR IDE (Seções 38 a 46)
  // ==========================================
  createPlanRecord({
    id: 'cursor-hobby',
    provider: 'anysphere',
    product: 'Cursor',
    planName: 'Cursor Hobby',
    targetAudience: 'individual',
    profileTags: ['free', 'student'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 0,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'composer-2-5', modelName: 'Composer 2.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['low'], notes: '50 requisições rápidas de Composer' }
    ],
    features: ['Tab Completions (2.000/mês)', 'Cursor IDE Editor'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: '2.000 tab completions e 50 requisições lentas/rápidas de IA.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['cursor-ide'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Opt-out de privacidade disponível nas configurações.' },
    pools: ['Hobby Pool'],
    quotaDescription: 'Gratuito com 2.000 completions de tab e 50 requisições de agentes.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Experimentação inicial do Cursor IDE.'
  }),

  createPlanRecord({
    id: 'cursor-pro',
    provider: 'anysphere',
    product: 'Cursor',
    planName: 'Cursor Pro',
    targetAudience: 'individual',
    profileTags: ['dev', 'pro', 'daily-driver'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 20,
      annualPriceUsd: 192,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'composer-2-5', modelName: 'Composer 2.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', surface: 'cursor-ide', available: true, included: false, billingMode: 'metered', efforts: ['high'], notes: 'Other Models pool — tarifado ao preço de API ($0.75/$3.50)' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'cursor-ide', available: true, included: false, billingMode: 'metered', efforts: ['high'], notes: 'Other Models pool — tarifado ao preço de API ($10/$50)' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', surface: 'cursor-ide', available: true, included: false, billingMode: 'metered', efforts: ['high'], notes: 'Other Models pool — tarifado ao preço de API ($4/$20)' }
    ],
    features: ['Tab Completions Ilimitado (não confundir com uso ilimitado de modelos)', 'Grok Bot Incluso', 'Composer com Multi-File Edits', 'Cursor Indexing'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: true, notes: 'Tab completions ilimitado NÃO significa uso ilimitado de modelos de chat/agente.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: 0, notes: 'Grok Bot possui cota própria separada e documentada com anotação de conflito de fonte.' },
    surfaces: ['cursor-ide'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Privacy Mode configurável; sem ZDR formal.' },
    pools: ['Cursor Models (High-Allowance Pool)', 'Other Models (Metered Pool)'],
    quotaDescription: 'US$ 20/mês. Tab completions ilimitado. Cursor Models pool (Composer 2.5, Grok 4.5, Grok 4.6) incluído; Other Models tarifados por API.',
    overageAllowed: true,
    apiIncluded: false,
    bestFor: 'Desenvolvedores solos que buscam a IDE de código mais produtiva com Grok e Composer.'
  }),

  createPlanRecord({
    id: 'cursor-pro-plus',
    provider: 'anysphere',
    product: 'Cursor',
    planName: 'Cursor Pro+',
    targetAudience: 'individual',
    profileTags: ['power-user', 'lead-dev'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 60,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'composer-2-5', modelName: 'Composer 2.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'cursor-ide', available: true, included: false, billingMode: 'metered', efforts: ['high'], notes: '3x franquia em Other Models' }
    ],
    features: ['Tab Completions Ilimitado', '3x Franquia em Other Models', 'Grok Bot Prioritário'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: true, notes: '3x franquia de Other Models vs Pro.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['cursor-ide'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Privacy Mode disponível.' },
    pools: ['Cursor Models (High-Allowance Pool)', 'Other Models (3x Allowance)'],
    quotaDescription: 'US$ 60/mês. 3x franquia de Other Models e uso intensivo de Cursor Models.',
    overageAllowed: true,
    apiIncluded: false,
    bestFor: 'Desenvolvedores que necessitam de mais cota de Claude e GPT além do Cursor Models pool.'
  }),

  createPlanRecord({
    id: 'cursor-ultra',
    provider: 'anysphere',
    product: 'Cursor',
    planName: 'Cursor Ultra',
    targetAudience: 'individual',
    profileTags: ['elite-dev', 'frontier-engineer'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 200,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'composer-2-5', modelName: 'Composer 2.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['xhigh'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', surface: 'cursor-ide', available: true, included: false, billingMode: 'metered', efforts: ['max'], notes: '20x franquia em Other Models' }
    ],
    features: ['Tab Completions Ilimitado', '20x Franquia em Other Models', 'Prioridade Máxima em Todas as Filas'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: true, notes: '20x franquia de Other Models vs Pro.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['cursor-ide'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-opt-out', retentionDays: 30, notes: 'Privacy Mode ativado.' },
    pools: ['Cursor Models (High-Allowance Pool)', 'Other Models (20x Allowance)'],
    quotaDescription: 'US$ 200/mês. 20x franquia de Other Models e computação ultrarrápida contínua.',
    overageAllowed: true,
    apiIncluded: false,
    bestFor: 'Engenheiros de software com uso massivo contínuo de Claude Fable 5.1 e GPT-5.6 Sol.'
  }),

  createPlanRecord({
    id: 'cursor-teams-standard',
    provider: 'anysphere',
    product: 'Cursor',
    planName: 'Cursor Teams Standard',
    targetAudience: 'team',
    profileTags: ['team', 'startup'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 40,
      annualPriceUsd: 384,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 2
    },
    modelAccess: [
      { modelId: 'composer-2-5', modelName: 'Composer 2.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Cursor Models (Included High-Allowance Pool)' }
    ],
    features: ['Tab Completions Ilimitado', 'Admin Dashboard', 'SSO / SAML', 'Faturamento Centralizado'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: true, notes: 'Cota de equipe gerenciada.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['cursor-ide'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'business-team', retentionDays: 90, notes: 'Zero-retention configurável no nível da organização; sem treino por padrão.' },
    pools: ['Teams Pool'],
    quotaDescription: 'US$ 40/seat/mês. Mínimo 2 assentos. Governança e controles de privacidade corporativos.',
    overageAllowed: true,
    apiIncluded: false,
    bestFor: 'Equipes técnicas que exigem controle de assentos e exclusão de treino.'
  }),

  createPlanRecord({
    id: 'cursor-teams-premium',
    provider: 'anysphere',
    product: 'Cursor',
    planName: 'Cursor Teams Premium',
    targetAudience: 'team',
    profileTags: ['team', 'enterprise-team'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 120,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 2
    },
    modelAccess: [
      { modelId: 'composer-2-5', modelName: 'Composer 2.5', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Cursor Models (Included High-Allowance Pool)' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'cursor-ide', available: true, included: true, billingMode: 'included', efforts: ['xhigh'], notes: 'Cursor Models (Included High-Allowance Pool)' }
    ],
    features: ['Tab Completions Ilimitado', '3x Franquia de Other Models por Assento', 'Admin Dashboard Avançado', 'Audit Logs', 'Suporte Prioritário'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: true, notes: '3x franquia de Other Models por assento.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['cursor-ide'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'business-extended', retentionDays: 180, notes: 'Governança avançada de privacidade.' },
    pools: ['Teams Premium Pool'],
    quotaDescription: 'US$ 120/seat/mês. Mínimo 2 assentos. 3x cota de modelos avançados e suporte dedicado.',
    overageAllowed: true,
    apiIncluded: false,
    bestFor: 'Scaleups e empresas com desenvolvedores trabalhando intensivamente em monorepos complexos.'
  }),

  // ==========================================
  // 5. OPENCODE GO (Plataforma Aberta de Roteamento)
  // ==========================================
  createPlanRecord({
    id: 'opencode-go-standard',
    provider: 'opencode',
    product: 'OpenCode Go',
    planName: 'OpenCode Go Standard',
    targetAudience: 'individual',
    profileTags: ['indie-dev', 'open-source', 'sub-dollar'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 10,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'deepseek-v4-flash-0731', modelName: 'DeepSeek-V4-Flash', surface: 'opencode-ide', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '2x burn rate • ~37.800 req/mês' },
      { modelId: 'deepseek-v4-vision-exp', modelName: 'DeepSeek-V4-Flash-Vision-Exp', surface: 'opencode-ide', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '4x burn rate • ~18.900 req/mês' },
      { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', surface: 'opencode-ide', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: '4x burn rate • ~7.900 req/mês' },
      { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', surface: 'opencode-ide', available: true, included: true, billingMode: 'included', efforts: ['low'], notes: '4x burn rate • ~10.250 req/mês' }
    ],
    features: ['Roteamento Inteligente Sub-Dólar', 'Zen Balance Fallback', 'BYOK Suportado'],
    storage: { cloudStorageGb: 10, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Cota de US$ 15 normalizada por mês (1.5x do valor pago).' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: 15, notes: 'Crédito de inferência de US$ 15.' },
    surfaces: ['opencode-ide'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'community-proxy', retentionDays: 30, notes: 'Roteado via endpoints parceiros.' },
    pools: ['Go Standard Pool'],
    quotaDescription: 'US$ 10/mês com cota de US$ 15 de consumo em modelos sub-dólar ultraeficientes.',
    overageAllowed: false,
    apiIncluded: true,
    bestFor: 'Desenvolvedores com foco em custo-benefício radical e modelos open-weights de alta eficiência.'
  }),

  // ==========================================
  // 6. Z.AI (ZHIPU AI CODING) (Seções 47 a 53)
  // ==========================================
  createPlanRecord({
    id: 'zai-coding-lite',
    provider: 'zai',
    product: 'Z.ai Coding Plan',
    planName: 'Z.ai Coding Lite',
    targetAudience: 'individual',
    profileTags: ['indie-dev', 'open-weights', 'economical'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 18,
      annualPriceUsd: 151.20,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Modelo servido nativamente via credencial Z.ai Coding' },
      { modelId: 'glm-5-3', modelName: 'GLM-5.3', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Modelo servido nativamente via credencial Z.ai Coding' }
    ],
    features: ['Z.ai Coding Tool Integrations (Aider, Continue, Cline, Roo)', 'Pico e Horário Off-Peak Diferenciados'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: {
      unlimitedCompletions: false,
      marketingUsageMultiplierVsLite: 1.0,
      creditQuotaRatioVsLite: 1.0,
      notes: '2.000 créditos / 5 horas e 10.000 créditos / semana. Não possui overage.'
    },
    credits: {
      flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null,
      premiumModelCreditsUsd: null,
      creditsPer5h: 2000,
      creditsPerWeek: 10000,
      mcpQuotaPerMonth: 100,
      notes: '2.000/5h • 10.000/sem • 100 chamadas MCP/mês. Horário de pico consome tarifa cheia; off-peak consome 50%.'
    },
    surfaces: ['zai-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-individual', retentionDays: 30, notes: 'Conta pessoal; sem garantia formal de ZDR.' },
    pools: ['Z.ai Lite Pool'],
    quotaDescription: 'US$ 18/mês ($12.60 anual eq). 2.000 créditos/5h, 10.000/sem, 100 MCP calls. Sem overage.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Desenvolvedores independentes usando agentes de código com a API de baixo custo GLM-5.3.'
  }),

  createPlanRecord({
    id: 'zai-coding-pro',
    provider: 'zai',
    product: 'Z.ai Coding Plan',
    planName: 'Z.ai Coding Pro',
    targetAudience: 'individual',
    profileTags: ['dev', 'pro', 'daily-driver'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 72,
      annualPriceUsd: 604.80,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Alta taxa de geração em tarefas rápidas' },
      { modelId: 'glm-5-3', modelName: 'GLM-5.3', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['high', 'max'], notes: 'Raciocínio frontier com 1M de contexto' }
    ],
    features: ['Z.ai Coding Tool Integrations (Aider, Continue, Cline, Roo)', 'Prioridade em Horário de Pico'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: {
      unlimitedCompletions: false,
      marketingUsageMultiplierVsLite: 5.0,
      creditQuotaRatioVsLite: 6.0,
      notes: '12.000 créditos / 5 horas e 60.000 créditos / semana. Sem overage.'
    },
    credits: {
      flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null,
      premiumModelCreditsUsd: null,
      creditsPer5h: 12000,
      creditsPerWeek: 60000,
      mcpQuotaPerMonth: 1000,
      notes: '12.000/5h • 60.000/sem • 1.000 chamadas MCP/mês.'
    },
    surfaces: ['zai-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-individual', retentionDays: 30, notes: 'Conta pessoal; sem ZDR.' },
    pools: ['Z.ai Pro Pool'],
    quotaDescription: 'US$ 72/mês ($50.40 anual eq). 12.000 créditos/5h, 60.000/sem, 1.000 MCP calls. Sem overage.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Desenvolvedores profissionais com alta carga diária de geração de código em GLM.'
  }),

  createPlanRecord({
    id: 'zai-coding-max',
    provider: 'zai',
    product: 'Z.ai Coding Plan',
    planName: 'Z.ai Coding Max',
    targetAudience: 'individual',
    profileTags: ['power-user', 'lead-engineer'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 160,
      annualPriceUsd: 1344,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Cota de alto throughput' },
      { modelId: 'glm-5-3', modelName: 'GLM-5.3', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Capacidade máxima para workflows contínuos' }
    ],
    features: ['Z.ai Coding Tool Integrations', 'Prioridade Máxima', 'Alta Concorrência de Requisições'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: {
      unlimitedCompletions: false,
      marketingUsageMultiplierVsLite: 20.0,
      creditQuotaRatioVsLite: 14.0,
      notes: '28.000 créditos / 5 horas e 140.000 créditos / semana. Sem overage.'
    },
    credits: {
      flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null,
      premiumModelCreditsUsd: null,
      creditsPer5h: 28000,
      creditsPerWeek: 140000,
      mcpQuotaPerMonth: 4000,
      notes: '28.000/5h • 140.000/sem • 4.000 chamadas MCP/mês.'
    },
    surfaces: ['zai-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-individual', retentionDays: 30, notes: 'Conta pessoal; sem ZDR.' },
    pools: ['Z.ai Max Pool'],
    quotaDescription: 'US$ 160/mês ($112 anual eq). 28.000 créditos/5h, 140.000/sem, 4.000 MCP calls. Sem overage.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Engenheiros de software com demandas pesadas e contínuas de automação em GLM-5.3.'
  }),

  createPlanRecord({
    id: 'zai-coding-team-standard',
    provider: 'zai',
    product: 'Z.ai Coding Plan',
    planName: 'Z.ai Coding Team Standard',
    targetAudience: 'team',
    profileTags: ['team', 'startup'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: null,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'contact-sales',
      minSeats: 2
    },
    modelAccess: [
      { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Equipe compartilhada' },
      { modelId: 'glm-5-3', modelName: 'GLM-5.3', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Equipe compartilhada' }
    ],
    features: ['Gestão de Equipe', 'Console de Governança', 'Controle Central de Cota'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: '15.000 créditos/5h e 66.000 créditos/semana por assento.' },
    credits: {
      flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null,
      premiumModelCreditsUsd: null,
      creditsPer5h: 15000,
      creditsPerWeek: 66000,
      mcpQuotaPerMonth: 2000,
      notes: '15.000/5h • 66.000/sem por assento.'
    },
    surfaces: ['zai-code'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'business-team', retentionDays: 90, notes: 'Dados não utilizados para treino; ZDR mediante contrato formal.' },
    pools: ['Z.ai Team Standard Pool'],
    quotaDescription: 'Plano corporativo para equipes (mínimo 2 assentos). 15.000 créditos/5h e 66.000/sem por assento.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Equipes que utilizam GLM para desenvolvimento contínuo com governança.'
  }),

  createPlanRecord({
    id: 'zai-coding-team-premium',
    provider: 'zai',
    product: 'Z.ai Coding Plan',
    planName: 'Z.ai Coding Team Premium',
    targetAudience: 'team',
    profileTags: ['team', 'engineering-team'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: null,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'contact-sales',
      minSeats: 2
    },
    modelAccess: [
      { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Alta prioridade de time' },
      { modelId: 'glm-5-3', modelName: 'GLM-5.3', surface: 'zai-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Raciocínio frontier contínuo' }
    ],
    features: ['Gestão Avançada de Equipe', 'SSO Corporativo', 'Audit Logs', 'Suporte Técnico Prioritário'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: '35.000 créditos/5h e 155.000 créditos/semana por assento.' },
    credits: {
      flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null,
      premiumModelCreditsUsd: null,
      creditsPer5h: 35000,
      creditsPerWeek: 155000,
      mcpQuotaPerMonth: 5000,
      notes: '35.000/5h • 155.000/sem por assento.'
    },
    surfaces: ['zai-code'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'business-extended', retentionDays: 180, notes: 'Governança estrita; ZDR disponível mediante contrato Enterprise.' },
    pools: ['Z.ai Team Premium Pool'],
    quotaDescription: 'Plano corporativo premium (mínimo 2 assentos). 35.000 créditos/5h e 155.000/sem por assento.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Equipes de engenharia de software com desenvolvimento massivo em GLM-5.3.'
  }),

  // ==========================================
  // 7. KIMI (MOONSHOT AI) (Seções 54 a 56)
  // ==========================================
  createPlanRecord({
    id: 'kimi-membership-andante',
    provider: 'moonshot',
    product: 'Kimi',
    planName: 'Kimi Membership Andante',
    targetAudience: 'individual',
    profileTags: ['casual', 'student', 'starter-dev'],
    pricing: {
      nativeCurrency: 'CNY',
      monthlyPriceUsd: 6.86,
      annualPriceUsd: 65.52,
      monthlyPriceCny: 49,
      annualPriceCny: 468,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'kimi-for-coding', modelName: 'kimi-for-coding (256K)', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Janela de 256K para codificação' }
    ],
    features: ['Kimi Web Chat', 'Kimi Code', '1 Tarefa Paralela', '6 Agendamentos', '20 Projetos'],
    storage: { cloudStorageGb: 20, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: '~30 Agent uses estimados com base em consumo típico (não hard cap fixo).' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['kimi-web', 'kimi-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-individual', retentionDays: 30, notes: 'Conta pessoal consumer; sem ZDR corporativo.' },
    pools: ['Kimi Andante Pool'],
    quotaDescription: '¥49/mês (ou ¥39/mês no plano anual de ¥468). ~30 Agent uses estimados, 1 tarefa paralela, 6 agendamentos, 20 projetos, 20 GB storage.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Estudantes e programadores iniciantes no ecossistema Kimi.'
  }),

  createPlanRecord({
    id: 'kimi-membership-moderato',
    provider: 'moonshot',
    product: 'Kimi',
    planName: 'Kimi Membership Moderato',
    targetAudience: 'individual',
    profileTags: ['dev', 'pro'],
    pricing: {
      nativeCurrency: 'CNY',
      monthlyPriceUsd: 13.86,
      annualPriceUsd: 132.72,
      monthlyPriceCny: 99,
      annualPriceCny: 948,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'kimi-k3', modelName: 'Kimi K3 (256K)', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'K3 até 256K de contexto' },
      { modelId: 'kimi-for-coding', modelName: 'kimi-for-coding (256K)', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Coding balanceado' }
    ],
    features: ['Kimi Code Avançado (256K)', '2 Tarefas de Agente Paralelas', '2 Subtarefas Swarm', '10 Agendamentos'],
    storage: { cloudStorageGb: 20, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: '~60 Agent uses e 25 Agent Swarm uses estimados (não hard caps fixos).' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['kimi-web', 'kimi-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-individual', retentionDays: 30, notes: 'Conta pessoal; sem ZDR corporativo.' },
    pools: ['Kimi Moderato Pool'],
    quotaDescription: '¥99/mês (ou ¥79/mês no plano anual de ¥948). ~60 Agent uses, 25 Swarm uses, 2 tarefas paralelas, 2 subtarefas swarm, 20 GB.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Desenvolvedores profissionais com tarefas de coding e análise monorepo de até 256k tokens.'
  }),

  createPlanRecord({
    id: 'kimi-membership-allegretto',
    provider: 'moonshot',
    product: 'Kimi',
    planName: 'Kimi Membership Allegretto',
    targetAudience: 'individual',
    profileTags: ['power-user', 'long-context-pro'],
    pricing: {
      nativeCurrency: 'CNY',
      monthlyPriceUsd: 27.86,
      annualPriceUsd: 267.12,
      monthlyPriceCny: 199,
      annualPriceCny: 1908,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'kimi-k3', modelName: 'Kimi K3 (1M)', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'K3 até 1M de contexto (gasta ~2x da cota de k3-256k)' },
      { modelId: 'kimi-for-coding', modelName: 'kimi-for-coding', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Acesso balanceado' },
      { modelId: 'kimi-for-coding-highspeed', modelName: 'kimi-for-coding-highspeed', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Throughput acelerado' }
    ],
    features: ['Kimi Code 1M', 'Goal Mode', 'Kimi Claw', '4 Subtarefas Swarm', '2 Tarefas Paralelas', '15 Agendamentos'],
    storage: { cloudStorageGb: 20, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: '~150 Agent uses e 50 Swarm uses estimados. K3 1M consome ~2x da cota de k3-256k.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['kimi-web', 'kimi-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-individual', retentionDays: 30, notes: 'Conta pessoal; sem cluster dedicado ou ZDR.' },
    pools: ['Kimi Allegretto Pool'],
    quotaDescription: '¥199/mês (ou ¥159/mês no plano anual de ¥1.908). ~150 Agent uses, 50 Swarm uses, Goal Mode, Kimi Claw, K3 1M (gasto ~2x), 20 GB.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Pesquisadores e engenheiros com necessidade de análise de repositórios massivos de até 1 milhão de tokens.'
  }),

  createPlanRecord({
    id: 'kimi-membership-allegro',
    provider: 'moonshot',
    product: 'Kimi',
    planName: 'Kimi Membership Allegro',
    targetAudience: 'individual',
    profileTags: ['frontier-dev', 'elite'],
    pricing: {
      nativeCurrency: 'CNY',
      monthlyPriceUsd: 97.86,
      annualPriceUsd: 939.12,
      monthlyPriceCny: 699,
      annualPriceCny: 6708,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'kimi-k3', modelName: 'Kimi K3 (1M)', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'K3 1M contínuo com altíssima tolerância de cota' },
      { modelId: 'kimi-for-coding', modelName: 'kimi-for-coding', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['max'], notes: 'Acesso irrestrito' },
      { modelId: 'kimi-for-coding-highspeed', modelName: 'kimi-for-coding-highspeed', surface: 'kimi-code', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Máxima prioridade em horários de pico' }
    ],
    features: ['Kimi Code Máxima Prioridade', 'K3 Million-Token Conversations', '8 Subtarefas Swarm', '4 Tarefas Paralelas', '20 Agendamentos', '100 Projetos'],
    storage: { cloudStorageGb: 50, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: '~360 Agent uses e 120 Swarm uses estimados (não hard caps fixos).' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['kimi-web', 'kimi-code'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-individual', retentionDays: 30, notes: 'Conta pessoal de alto consumo; sem ZDR corporativo.' },
    pools: ['Kimi Allegro Pool'],
    quotaDescription: '¥699/mês (ou ¥559/mês no plano anual de ¥6.708). ~360 Agent uses, 120 Swarm uses, 8 subtarefas swarm, 100 projetos, 50 GB storage.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Power users com necessidade extrema de análise de código em 1M de tokens e alta volumetria de agentes.'
  }),

  // ==========================================
  // 8. XAI / SPACEXAI (Seções 62 a 66)
  // ==========================================
  createPlanRecord({
    id: 'xai-grok-free',
    provider: 'xai',
    product: 'Grok',
    planName: 'Grok Free',
    targetAudience: 'individual',
    profileTags: ['casual', 'social'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 0,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['low'], notes: 'Acesso gratuito com limites reduzidos' }
    ],
    features: ['Busca em Tempo Real no X', 'Geração Básica de Imagens'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Limites dinâmicos de mensagens a cada 2 horas.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['x-chat'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'social-opt-out', retentionDays: 30, notes: 'Dados de usuários gratuitos podem ser utilizados para treinamento por padrão.' },
    pools: ['Free Tier'],
    quotaDescription: 'Acesso gratuito com limites reduzidos na rede social X.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Interações casuais e busca de notícias em tempo real.'
  }),

  createPlanRecord({
    id: 'xai-supergrok-lite',
    provider: 'xai',
    product: 'SuperGrok',
    planName: 'SuperGrok Lite',
    targetAudience: 'individual',
    profileTags: ['casual-pro'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 10,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'checkout-only',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Cota leve' }
    ],
    features: ['Busca em Tempo Real no X', 'Geração de Imagens'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Disponível apenas no checkout (checkout-only).' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['x-chat'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'consumer', retentionDays: 30, notes: 'Consumer individual.' },
    pools: ['SuperGrok Lite Pool'],
    quotaDescription: 'US$ 10/mês (visibilidade checkout-only).',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Usuários leves que buscam um upgrade de custo reduzido.'
  }),

  createPlanRecord({
    id: 'xai-supergrok',
    provider: 'xai',
    product: 'SuperGrok',
    planName: 'SuperGrok',
    targetAudience: 'individual',
    profileTags: ['dev', 'pro', 'power-user'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 30,
      annualPriceUsd: 300,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high'], notes: 'Thinking mandatório, 500k contexto' },
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Throughput elevado' }
    ],
    features: ['Grok 4.6 Thinking', 'DeepSearch em Tempo Real', 'Visão e Imagens sem Limite Rígido', 'Análise de Documentos de 500k'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Alta franquia de mensagens frontier com Thinking.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['x-chat', 'grok-web'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'consumer-opt-out', retentionDays: 30, notes: 'Plano consumer; opt-out de treino nas configurações; sem ZDR corporativo.' },
    pools: ['SuperGrok Pool'],
    quotaDescription: 'US$ 30/mês. Acesso primário ao Grok 4.6 com raciocínio frontier e janela de 500k tokens.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Entusiastas e desenvolvedores que buscam o modelo mais recente da SpaceXAI.'
  }),

  createPlanRecord({
    id: 'xai-supergrok-plus',
    provider: 'xai',
    product: 'SuperGrok',
    planName: 'SuperGrok Plus',
    targetAudience: 'individual',
    profileTags: ['power-user', 'lead-dev'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 100,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'xhigh'], notes: 'Cota ampliada de raciocínio XHigh' },
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Acesso prioritário' }
    ],
    features: ['Grok 4.6 XHigh Reasoning', 'DeepSearch Ilimitado', 'Prioridade Máxima no Cluster Colossus'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, sessionMultiplierVsPro: 4.0, notes: '4x cota de raciocínio do SuperGrok.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['x-chat', 'grok-web'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'consumer-opt-out', retentionDays: 30, notes: 'Consumer individual.' },
    pools: ['SuperGrok Plus Pool'],
    quotaDescription: 'US$ 100/mês. Alta volumetria com Grok 4.6 XHigh e prioridade máxima.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Usuários intensivos que utilizam Grok 4.6 para análises analíticas pesadas.'
  }),

  createPlanRecord({
    id: 'xai-supergrok-heavy',
    provider: 'xai',
    product: 'SuperGrok',
    planName: 'SuperGrok Heavy',
    targetAudience: 'individual',
    profileTags: ['frontier-dev', 'heavy'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 300,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'checkout-only',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['xhigh'], notes: 'Cota máxima de computação' }
    ],
    features: ['Prioridade Total no Cluster Colossus', 'Thinking XHigh em Massa'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Checkout-only para usuários que esgotam o Plus.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['x-chat', 'grok-web'],
    privacy: { profileType: 'consumer', modelTrainingControl: true, noTrainingByDefault: false, zdr: false, retentionPolicy: 'consumer', retentionDays: 30, notes: 'Consumer individual.' },
    pools: ['SuperGrok Heavy Pool'],
    quotaDescription: 'US$ 300/mês (checkout-only). Cota máxima para uso individual extremo.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Pesquisadores solos com orçamentos elevados precisando de computação pesada de Grok 4.6.'
  }),

  createPlanRecord({
    id: 'xai-grok-business',
    provider: 'xai',
    product: 'Grok Business',
    planName: 'Grok Business',
    targetAudience: 'team',
    profileTags: ['team', 'business', 'enterprise-smb'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 30,
      annualPriceUsd: 300,
      localizedPricing: null,
      billingPeriod: 'both',
      pricingVisibility: 'public',
      minSeats: 2
    },
    modelAccess: [
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'grok-web', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high'], notes: 'Ambiente empresarial segregado' },
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'grok-web', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Ambiente empresarial segregado' }
    ],
    features: ['Admin Console', 'SSO / SAML', 'RBAC', 'SOC 2 Type II Compliance', 'Faturamento Consolidado'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Cota corporativa por assento (mínimo 2 assentos).' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['grok-web'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'business-standard', retentionDays: 90, notes: 'Dados excluídos de treinamento de modelos por padrão. SOC 2 compliant.' },
    pools: ['Grok Business Pool'],
    quotaDescription: 'US$ 30/user/mês. Mínimo 2 assentos. Governança empresarial e exclusão de treino.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Empresas e times que necessitam de Grok 4.6 com segurança de dados corporativa.'
  }),

  createPlanRecord({
    id: 'xai-grok-enterprise',
    provider: 'xai',
    product: 'Grok',
    planName: 'Grok Enterprise',
    targetAudience: 'team',
    profileTags: ['enterprise', 'security', 'compliance'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: null,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'custom',
      pricingVisibility: 'contact-sales',
      minSeats: 50
    },
    modelAccess: [
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['high', 'xhigh'], notes: 'Acesso total corporativo com contexto de 500k' },
      { modelId: 'grok-4-5', modelName: 'Grok 4.5', surface: 'x-chat', available: true, included: true, billingMode: 'included', efforts: ['medium', 'high'], notes: 'Cota de alto rendimento' }
    ],
    features: ['no training garantido', 'SOC 2 Type I & II', 'SSO/SAML & SCIM', 'Custom RBAC', 'Dedicated Onboarding', 'CMEK (Customer-Managed Encryption Keys)', 'Dedicated Data Plane', 'Grok Build'],
    storage: { cloudStorageGb: null, cloudStorageTb: 10, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Sem limitações de throttling compartilhado.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['x-chat', 'grok-build', 'grok-api'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: true, retentionPolicy: 'enterprise-cmek', retentionDays: 0, notes: 'Garantia explícita de no-training e ZDR contratual com chaves CMEK.' },
    pools: ['xAI Enterprise Fleet'],
    quotaDescription: 'Contrato comercial enterprise com suporte a SSO, SCIM, CMEK e dedicated data plane.',
    overageAllowed: false,
    apiIncluded: true,
    bestFor: 'Grandes organizações com necessidade de CMEK, isolamento de dados e governança SOC 2.'
  }),

  // ==========================================
  // 9. CAMELAI (CAMELCODE & CAMELSTREAM) (Seções 57 a 61)
  // ==========================================
  createPlanRecord({
    id: 'camelai-code-free',
    provider: 'camelai',
    product: 'camelCode',
    planName: 'camelCode Free',
    targetAudience: 'individual',
    profileTags: ['free', 'builder'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 0,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'camel-free', modelName: 'camelFree (Shared Fleet)', surface: 'camelcode-workspace', available: true, included: true, billingMode: 'included', efforts: ['low'], notes: 'Capacidade compartilhada' }
    ],
    features: ['1 Workspace', '5 GB Armazenamento', 'Deploy de 3 Apps', 'Recargas Top-up Stripe Permitidas'],
    storage: { cloudStorageGb: 5, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Capacidade compartilhada sujeita a filas em horários de pico.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: 0, notes: 'Permite compra de top-up mesmo no plano free.' },
    surfaces: ['camelcode-workspace'],
    privacy: { profileType: 'consumer', modelTrainingControl: false, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard-public', retentionDays: 30, notes: 'Sem ZDR; logs de app públicos por padrão.' },
    pools: ['camelFree Pool'],
    quotaDescription: 'Gratuito com 1 workspace, 5 GB de disco e suporte a recargas top-up.',
    overageAllowed: false,
    apiIncluded: false,
    bestFor: 'Testes de criação de protótipos de apps completos sem custo.'
  }),

  createPlanRecord({
    id: 'camelai-code-starter',
    provider: 'camelai',
    product: 'camelCode',
    planName: 'camelCode Starter',
    targetAudience: 'individual',
    profileTags: ['indie-builder', 'solo-dev'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 10,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'camel-free', modelName: 'camelFree (Priority)', surface: 'camelcode-workspace', available: true, included: true, billingMode: 'included', efforts: ['medium'], notes: 'Acesso prioritário ao fleet gratuito' },
      { modelId: 'premium-models', modelName: 'Modelos Premium (Anthropic, OpenAI)', surface: 'camelcode-workspace', available: true, included: false, billingMode: 'usage-credits', efforts: ['high'], notes: 'Consumido à taxa de provedor através dos US$ 10 em créditos' }
    ],
    features: ['1 Workspace', '50 GB Armazenamento', '30 Deployed Apps', '10 Custom Domains', 'BYOK Permitido', 'Sign in with OpenAI Permitido'],
    storage: { cloudStorageGb: 50, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Conflito de documentação: marketing claim 10 hourly automations vs docs limit 1 hourly automation.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: 10, notes: 'US$ 10/mês em créditos de modelos premium à taxa de provedor.' },
    surfaces: ['camelcode-workspace'],
    privacy: { profileType: 'consumer', modelTrainingControl: false, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard', retentionDays: 60, notes: 'Sem ZDR formal.' },
    pools: ['Starter Pool'],
    quotaDescription: 'US$ 10/mês com US$ 10 em créditos de modelos premium e 50 GB de armazenamento.',
    overageAllowed: true,
    apiIncluded: false,
    bestFor: 'Desenvolvedores individuais com projetos pessoais ativos e necessidade de deploy contínuo.'
  }),

  createPlanRecord({
    id: 'camelai-code-pro',
    provider: 'camelai',
    product: 'camelCode',
    planName: 'camelCode Pro',
    targetAudience: 'individual',
    profileTags: ['power-builder', 'full-stack-agent'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 40,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'camel-free', modelName: 'camelFree (Priority)', surface: 'camelcode-workspace', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Alta prioridade' },
      { modelId: 'premium-models', modelName: 'Modelos Premium (Claude Sonnet 5, Sol, Grok)', surface: 'camelcode-workspace', available: true, included: false, billingMode: 'usage-credits', efforts: ['max'], notes: 'Consumido via US$ 40 em créditos mensais à taxa de provedor' }
    ],
    features: ['1 Workspace', '100 GB Armazenamento', 'Deployed Apps Ilimitados', 'Custom Domains Ilimitados', '50 Automações (intervalo mín. 5 min)', 'BYOK e Top-up'],
    storage: { cloudStorageGb: 100, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: '50 automações com intervalo mínimo de 5 minutos.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: 40, notes: 'US$ 40/mês em créditos de modelos premium à taxa de provedor.' },
    surfaces: ['camelcode-workspace'],
    privacy: { profileType: 'consumer', modelTrainingControl: false, noTrainingByDefault: false, zdr: false, retentionPolicy: 'standard', retentionDays: 90, notes: 'Sem ZDR.' },
    pools: ['Pro Pool'],
    quotaDescription: 'US$ 40/mês com US$ 40 em créditos premium, 100 GB e deploys ilimitados.',
    overageAllowed: true,
    apiIncluded: false,
    bestFor: 'Solo builders usando camelCode como plataforma principal de desenvolvimento full-stack autônomo.'
  }),

  createPlanRecord({
    id: 'camelai-code-team',
    provider: 'camelai',
    product: 'camelCode',
    planName: 'camelCode Team',
    targetAudience: 'team',
    profileTags: ['team', 'startup-builders'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 50,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 3
    },
    modelAccess: [
      { modelId: 'premium-models', modelName: 'Modelos Premium', surface: 'camelcode-workspace', available: true, included: false, billingMode: 'usage-credits', efforts: ['max'], notes: 'US$ 50/seat/mês em créditos à taxa de provedor' }
    ],
    features: ['2 Workspaces', '100 GB por Workspace', 'RBAC de Equipe', '50 Automações por Membro', 'BYOK Corporativo'],
    storage: { cloudStorageGb: 200, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: false, notes: 'Mínimo 3 assentos (US$ 150/mês total).' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: 50, notes: 'US$ 50 em créditos por membro por mês.' },
    surfaces: ['camelcode-workspace'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: false, retentionPolicy: 'team-business', retentionDays: 180, notes: 'Credenciais protegidas em repouso; sem ZDR formal no tier padrão.' },
    pools: ['Team Pool'],
    quotaDescription: 'US$ 50/seat/mês (mínimo 3 assentos = US$ 150/mês). US$ 50 de créditos premium por membro.',
    overageAllowed: true,
    apiIncluded: false,
    bestFor: 'Equipes que desenvolvem e mantêm múltiplos apps em produção de forma colaborativa.'
  }),

  createPlanRecord({
    id: 'camelai-code-enterprise',
    provider: 'camelai',
    product: 'camelCode',
    planName: 'camelCode Enterprise',
    targetAudience: 'team',
    profileTags: ['enterprise', 'devops', 'sla'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: null,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'custom',
      pricingVisibility: 'contact-sales',
      minSeats: 10
    },
    modelAccess: [
      { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', surface: 'camelcode-workspace', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Throughput ultra-rápido' },
      { modelId: 'deepseek-v4-flash-0731', modelName: 'DeepSeek-V4-Flash', surface: 'camelcode-workspace', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Coding de alta eficiência' },
      { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', surface: 'camelcode-workspace', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Workers de execução' }
    ],
    features: ['Custom Seats & Workspaces', 'Custom Domains Ilimitados', 'Dedicated Cloud Cluster', 'SSO/SAML', 'SLA Garantido', 'Suporte Dedicado 24/7'],
    storage: { cloudStorageGb: 1000, cloudStorageTb: 1, localizedBenefits: null },
    usage: { unlimitedCompletions: true, notes: 'Automações e deploys customizados.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['camelcode-workspace', 'camelstream'],
    privacy: { profileType: 'business', modelTrainingControl: true, noTrainingByDefault: true, zdr: true, retentionPolicy: 'enterprise-zdr', retentionDays: 0, notes: 'ZDR formal e exclusão total de treinamento mediante contrato comercial.' },
    pools: ['camelAI Enterprise Dedicated Fleet'],
    quotaDescription: 'Plano enterprise sob medida com cluster dedicado, SLA garantido e ZDR formal.',
    overageAllowed: false,
    apiIncluded: true,
    bestFor: 'Empresas que exigem SLA formal, cluster dedicado e termos estritos de proteção de código.'
  }),

  createPlanRecord({
    id: 'camelai-stream-flat',
    provider: 'camelai',
    product: 'camelStream',
    planName: 'camelStream Flat-Rate',
    targetAudience: 'individual',
    profileTags: ['developer', 'inference-api', 'flat-rate'],
    pricing: {
      nativeCurrency: 'USD',
      monthlyPriceUsd: 5,
      annualPriceUsd: null,
      localizedPricing: null,
      billingPeriod: 'monthly',
      pricingVisibility: 'public',
      minSeats: 1
    },
    modelAccess: [
      { modelId: 'stream-fleet-auto', modelName: 'camelStream Fleet Auto (260K+)', surface: 'camelstream-api', available: true, included: true, billingMode: 'included', efforts: ['high'], notes: 'Roteado dinamicamente no fleet de qualidade garantida (TB 2.1 >= 70% ou AA Index >= 50)' }
    ],
    features: ['Tokens Ilimitados Sem Overage', '1 Concorrência Garantida por Stream', 'Roteamento Automático de Fleet (DeepSeek V4 Flash, Gemini 3.7, GLM 5.3 Flash, Luna 5.6, Muse Spark 1.2)'],
    storage: { cloudStorageGb: null, cloudStorageTb: null, localizedBenefits: null },
    usage: { unlimitedCompletions: true, notes: 'Tokens ilimitados em taxa fixa de US$ 5/stream/mês. 1 requisição concorrente simultânea.' },
    credits: { flowCreditsMonthly: null, flowCreditsDaily: null, flowRollover: false, canPurchaseAiCredits: false, agentSdkMonthlyCreditUsd: null, premiumModelCreditsUsd: null, notes: '' },
    surfaces: ['camelstream-api'],
    privacy: { profileType: 'consumer', modelTrainingControl: false, noTrainingByDefault: false, zdr: false, retentionPolicy: 'stream-standard', retentionDays: null, notes: 'Aviso crítico de privacidade: no plano standard os dados podem ser retidos e usados para treino por camelAI e parceiros. ZDR exige 1.000+ streams.' },
    pools: ['camelStream Fleet'],
    quotaDescription: 'US$ 5/stream/mês. Tokens ilimitados com 1 concorrência por stream e modelo auto dinâmico.',
    overageAllowed: false,
    apiIncluded: true,
    bestFor: 'Agentes contínuos de coding que consomem milhões de tokens sem risco de surpresa na fatura.'
  })
];

// ============================================================================
// 10. RECOMENDADOR DE STACKS DE ASSINATURA OTIMIZADOS (BUDGET STACKS)
// Schema com Fixed Cost vs Variable Billing (Seções 67 a 73)
// ============================================================================

const BUDGET_STACK_RECOMMENDER = {
  version: '2.0.0',
  verifiedDate: '2026-09-03',

  stacks: [
    {
      id: 'stack_budget_20',
      name: 'Stack 1: O Cavalo de Troia ($20/mês)',
      targetBudgetUsd: 20,
      fixedMonthlyCostUsd: 20,
      variableBilling: [],
      totalEstimatedMonthlyCostUsd: 20,
      plans: ['cursor-pro'],
      models: ['Composer 2.5', 'Grok 4.6', 'Grok 4.5', 'Gemini 3.8 Flash'],
      rationale: 'Máxima produtividade com Cursor Pro usando o pool canônico de alta franquia (Composer 2.5 e Grok 4.6).',
      architectureNotes: 'Cursor IDE Pro ($20) fornece o pool Cursor Models de alta franquia sem custos variáveis obrigatórios.'
    },
    {
      id: 'stack_budget_40',
      name: 'Stack 2: Dual Power ($40/mês)',
      targetBudgetUsd: 40,
      fixedMonthlyCostUsd: 40,
      variableBilling: [],
      totalEstimatedMonthlyCostUsd: 40,
      plans: ['cursor-pro', 'anthropic-claude-pro'],
      models: ['Composer 2.5', 'Grok 4.6', 'Claude Sonnet 5', 'Claude Opus 5'],
      rationale: 'A combinação definitiva de engenharia: Cursor Pro para ambiente de IDE e Claude Pro para raciocínio profundo de arquitetura com Sonnet 5 e Opus 5.',
      architectureNotes: 'Fixo de US$ 40/mês (Cursor Pro $20 + Claude Pro $20). Fable 5.1 disponível via recargas avulsas opcionais.'
    },
    {
      id: 'stack_budget_60',
      name: 'Stack 3: A Trindade da Produtividade ($60/mês)',
      targetBudgetUsd: 60,
      fixedMonthlyCostUsd: 59.99,
      variableBilling: [],
      totalEstimatedMonthlyCostUsd: 59.99,
      plans: ['cursor-pro', 'anthropic-claude-pro', 'google-ai-pro'],
      models: ['Composer 2.5', 'Grok 4.6', 'Claude Sonnet 5', 'Gemini 3.8 Flash', 'Gemini 3.1 Pro'],
      rationale: 'Cobertura absoluta: Cursor IDE ($20) + Claude Pro ($20) + Google AI Pro ($19.99 com 5 TB de nuvem no Brasil e Gemini Multimodal).',
      architectureNotes: 'Melhor custo-benefício global para desenvolvedores no Brasil aproveitando os 5 TB de armazenamento regional.'
    },
    {
      id: 'stack_budget_120',
      name: 'Stack 4: Frontier Powerhouse ($120/mês)',
      targetBudgetUsd: 120,
      fixedMonthlyCostUsd: 120,
      variableBilling: [],
      totalEstimatedMonthlyCostUsd: 120,
      plans: ['cursor-pro', 'anthropic-claude-max-5x'],
      models: ['Claude Fable 5.1', 'Claude Opus 5', 'Claude Sonnet 5', 'Grok 4.6', 'Composer 2.5'],
      rationale: 'Cursor Pro ($20) pareado com Claude Max 5x ($100), garantindo acesso nativo incluído a Claude Fable 5.1 (até 50% semanal) e alta volumetria de Opus 5.',
      architectureNotes: 'Fixo de US$ 120/mês. Fable 5.1 incluído na base sem necessidade de tarifação avulsa por token.'
    },
    {
      id: 'stack_budget_200',
      name: 'Stack 5: Total Frontier Autonomy ($200/mês)',
      targetBudgetUsd: 200,
      fixedMonthlyCostUsd: 200,
      variableBilling: [],
      totalEstimatedMonthlyCostUsd: 200,
      plans: ['cursor-ultra'],
      models: ['Composer 2.5', 'Grok 4.6', 'Claude Fable 5.1', 'GPT-5.6 Sol'],
      rationale: '20x franquia em Other Models na melhor IDE de coding do mercado, permitindo uso intensivo de Claude Fable 5.1 e GPT-5.6 Sol diretamente no editor.',
      architectureNotes: 'Uso consolidado em uma única assinatura corporativa com alta tolerância de consumo.'
    }
  ],

  getStacksForBudgetBrl(budgetBrl) {
    const plans = SUBSCRIPTION_PLANS_DATA;
    const fx = typeof FX_HELPERS !== 'undefined' ? FX_HELPERS : { convertUsdToBrl: usd => usd * 5.108 };
    const results = [];

    if (budgetBrl <= 30) {
      results.push({
        title: 'Stack Zero-Dólar: Gemini & ChatGPT Free',
        monthlyCostBrl: 0,
        monthlyCostUsd: 0,
        plans: [plans.find(p => p.id === 'google-ai-free'), plans.find(p => p.id === 'openai-chatgpt-free')].filter(Boolean),
        planner: 'Gemini 3.8 Flash (Web Free)',
        executor: 'GPT-5.6 Luna / Codex (Free)',
        reviewer: 'Gemini 3.7 Flash',
        pros: 'Custo R$ 0,00 com modelos rápidos modernos para uso cotidiano sem compromisso.',
        cons: 'Limites dinâmicos severos em horários de pico e sem garantia de disponibilidade.'
      });
      const streamPlan = plans.find(p => p.id === 'camelai-stream-flat');
      if (streamPlan) {
        results.push({
          title: 'Stack Micro-Inference: camelStream Flat ($5)',
          monthlyCostBrl: fx.convertUsdToBrl(5),
          monthlyCostUsd: 5,
          plans: [streamPlan],
          planner: 'camelStream auto (Dynamic Fleet)',
          executor: 'DeepSeek V4 Flash / Gemini 3.7 Flash',
          reviewer: 'GLM 5.3 Flash',
          pros: 'Tokens ilimitados em taxa fixa de US$ 5/stream/mês sem surpresa na fatura.',
          cons: 'Retenção/treino de prompts no plano standard (sem ZDR corporativo); 1 concorrência/stream.'
        });
      }
    } else if (budgetBrl <= 60) {
      const goPlan = plans.find(p => p.id === 'opencode-go-standard');
      const streamPlan = plans.find(p => p.id === 'camelai-stream-flat');
      if (goPlan) {
        results.push({
          title: 'Opção A: OpenCode Go Solo ($10/mês)',
          monthlyCostBrl: fx.convertUsdToBrl(10),
          monthlyCostUsd: 10,
          plans: [goPlan],
          planner: 'DeepSeek-V4-Flash / Vision (Go 2x/4x)',
          executor: 'GLM-5.3-Flash / Luna (Go 4x)',
          reviewer: 'DeepSeek-V4-Flash',
          pros: 'US$ 10/mês com cota normalizada de US$ 15 em modelos sub-dólar de alta eficiência.',
          cons: 'Modelos de raciocínio pesado consomem 4x burn rate.'
        });
      }
      if (streamPlan) {
        results.push({
          title: 'Opção B: camelStream Flat ($5/mês)',
          monthlyCostBrl: fx.convertUsdToBrl(5),
          monthlyCostUsd: 5,
          plans: [streamPlan],
          planner: 'camelStream auto (Dynamic Fleet)',
          executor: 'DeepSeek V4 Flash / Gemini 3.7 Flash',
          reviewer: 'GLM 5.3 Flash',
          pros: 'Tokens ilimitados em taxa fixa de US$ 5/stream/mês sem medidor ou overage.',
          cons: 'Treino de dados ativo no plano standard; concorrência restrita a 1 por stream.'
        });
      }
    } else if (budgetBrl <= 110) {
      const googlePro = plans.find(p => p.id === 'google-ai-pro');
      const cursorPro = plans.find(p => p.id === 'cursor-pro');

      if (googlePro) {
        results.push({
          title: 'Opção A: Google AI Pro Nacionalizado (Melhor Multimodal & Nuvem)',
          monthlyCostBrl: 96.99,
          monthlyCostUsd: 19.99,
          plans: [googlePro],
          planner: 'Gemini 3.1 Pro (Pool 1 Multimodal)',
          executor: 'Gemini 3.8 Flash (Throughput 305 tok/s)',
          reviewer: 'Gemini 3.7 Flash (Contexto 1M)',
          pros: 'Preço oficial nacionalizado em R$ 96,99 com benefício exclusivo verificado no Brasil de 5 TB de armazenamento e 1.000 Flow credits/mês.',
          cons: 'Restrito ao ecossistema Google One e Antigravity; sem extensão de IDE proprietária.'
        });
      }
      if (cursorPro) {
        results.push({
          title: 'Opção B: Cursor Pro Solo ($20/mês)',
          monthlyCostBrl: fx.convertUsdToBrl(20),
          monthlyCostUsd: 20,
          plans: [cursorPro],
          planner: 'Grok 4.6 (Cursor Models Pool)',
          executor: 'Composer 2.5 / Grok 4.5 (Cursor Models)',
          reviewer: 'Grok 4.6 (Thinking)',
          pros: 'Tab completions ilimitado e alta franquia no pool Cursor Models (Composer 2.5, Grok 4.5, Grok 4.6).',
          cons: 'Modelos fora do pool canônico (como Claude e GPT-5.6 Sol) consomem da franquia base ou tarifação avulsa de API.'
        });
      }
    } else if (budgetBrl <= 220) {
      const cursorPro = plans.find(p => p.id === 'cursor-pro');
      const claudePro = plans.find(p => p.id === 'anthropic-claude-pro');
      const googlePro = plans.find(p => p.id === 'google-ai-pro');

      if (cursorPro && claudePro) {
        results.push({
          title: 'Stack Definitivo Dual Power: Cursor Pro ($20) + Claude Pro ($20)',
          monthlyCostBrl: fx.convertUsdToBrl(40),
          monthlyCostUsd: 40,
          plans: [cursorPro, claudePro],
          planner: 'Claude Opus 5 / Claude Sonnet 5',
          executor: 'Composer 2.5 / Grok 4.6 (Cursor Models)',
          reviewer: 'Claude Opus 5 (Raciocínio Profundo)',
          pros: 'A combinação de maior valor do mercado: melhor IDE de código pareada com Sonnet 5 e Opus 5.',
          cons: 'Claude Fable 5.1 não entra na cota base do Claude Pro (requer recargas avulsas opcionais de usage credits).'
        });
      }
      if (cursorPro && googlePro) {
        results.push({
          title: 'Stack Híbrido: Cursor Pro + Google AI Pro Brasil',
          monthlyCostBrl: fx.convertUsdToBrl(20) + 96.99,
          monthlyCostUsd: 39.99,
          plans: [cursorPro, googlePro],
          planner: 'Gemini 3.1 Pro / Grok 4.6',
          executor: 'Gemini 3.8 Flash (305 tok/s) / Composer 2.5',
          reviewer: 'Gemini 3.7 Flash (1M)',
          pros: 'IDE de alta produtividade somada a 5 TB de armazenamento no Brasil e 1.000 Flow credits.',
          cons: 'Não inclui a família Claude Opus/Sonnet nos planos base.'
        });
      }
    } else {
      const cursorPro = plans.find(p => p.id === 'cursor-pro');
      const claudeMax = plans.find(p => p.id === 'anthropic-claude-max-5x');

      if (cursorPro && claudeMax) {
        results.push({
          title: 'Stack Frontier Powerhouse: Cursor Pro ($20) + Claude Max 5x ($100)',
          monthlyCostBrl: fx.convertUsdToBrl(120),
          monthlyCostUsd: 120,
          plans: [cursorPro, claudeMax],
          planner: 'Claude Fable 5.1 (Incluído até 50% semanal)',
          executor: 'Composer 2.5 / Grok 4.6 (Cursor Models)',
          reviewer: 'Claude Opus 5 (5x Franquia)',
          pros: 'Acesso nativo incluído a Claude Fable 5.1 (teto de 50% semanal) e 5x cota do Claude Pro.',
          cons: 'Faturamento mensal de US$ 120 (sem desconto anual para o plano Max).'
        });
      }
    }

    return results;
  }
};

// Contabilidade e fórmula canônica de créditos Z.ai (Seções 46 e 47)
const ZAI_CREDIT_ACCOUNTING = {
  formula: 'credits = (inputTokens * inputMultiplier + cachedTokens * cachedMultiplier + outputTokens * outputMultiplier) / 10000',
  multipliers: {
    'glm-5-3': { input: 6.9, cached: 1.7, output: 24 },
    'glm-5-3-flash': { input: 2.3, cached: 0.56, output: 8 }
  },
  mcpTools: {
    webSearch: { quotaCalls: 1, creditEquivalent: 1.2 },
    webReader: { quotaCalls: 1, creditEquivalent: 1.2 },
    zRead: { quotaCalls: 1, creditEquivalent: 1.2 }
  },
  offPeakDiscountPct: 50,
  peakWindowUtc8: 'Mon-Fri 14:00-18:00 (Singapore Time UTC+8)',
  notes: 'Horário de pico consome 100% da fórmula de créditos; fora do pico (off-peak) consome 50% dos multiplicadores padrão.'
};

// Rate card de créditos OpenAI para Work/Codex por 1M tokens (Prompt 10 / Seção 75)
const OPENAI_WORK_CODEX_CREDIT_RATES = {
  'gpt-6-astra': { inputCredits: 250, cachedInputCredits: 25, outputCredits: 1250, fastCreditMultiplier: 2.5 },
  'gpt-5-6-sol': { inputCredits: 100, cachedInputCredits: 10, outputCredits: 500, fastCreditMultiplier: 1.0 },
  'gpt-5-6-terra': { inputCredits: 50, cachedInputCredits: 5, outputCredits: 300, fastCreditMultiplier: 1.0 },
  'gpt-5-6-luna': { inputCredits: 5, cachedInputCredits: 0.5, outputCredits: 30, fastCreditMultiplier: 1.0 }
};

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUBSCRIPTION_PLANS_DATA, BUDGET_STACK_RECOMMENDER, createPlanRecord, ZAI_CREDIT_ACCOUNTING, OPENAI_WORK_CODEX_CREDIT_RATES };
}

if (typeof window !== 'undefined') {
  window.SUBSCRIPTION_PLANS_DATA = SUBSCRIPTION_PLANS_DATA;
  window.BUDGET_STACK_RECOMMENDER = BUDGET_STACK_RECOMMENDER;
  window.ZAI_CREDIT_ACCOUNTING = ZAI_CREDIT_ACCOUNTING;
  window.OPENAI_WORK_CODEX_CREDIT_RATES = OPENAI_WORK_CODEX_CREDIT_RATES;
}
