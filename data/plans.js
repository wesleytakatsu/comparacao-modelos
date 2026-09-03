/**
 * DATA PACK: BANCO CANÔNICO DE PLANOS & ASSINATURAS DE IA (SUBSCRIPTIONS)
 * Data de Referência: 03/09/2026
 * 
 * Regra: Não misturar precificação de tokens de API com assinaturas mensais de ferramentas.
 * Cada plano contém valores nativos, conversão em reais via FX_RATES_DATA e preços oficiais localizados quando existentes.
 */

const SUBSCRIPTION_PLANS_DATA = [
  // ==========================================
  // 1. OPENAI / CHATGPT
  // ==========================================
  {
    id: 'openai-chatgpt-free',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Free',
    targetAudience: 'individual',
    profileTags: ['casual', 'student'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 0,
    annualPriceUsd: null,
    localizedPricing: { BRL: { price: 0, official: true } },
    billingPeriod: 'monthly',
    includedModels: ['GPT-5.6 Luna', 'GPT-4o mini', 'Canvas'],
    pools: ['Free Tier'],
    quotaDescription: 'Acesso padrão com limites dinâmicos por hora e degradação em horários de pico.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Dados de usuários free podem ser utilizados para treinamento salvo opt-out nas configurações.',
    bestFor: 'Uso casual, aprendizado e tarefas pontuais sem custo.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'openai-chatgpt-go',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Go',
    targetAudience: 'individual',
    profileTags: ['student', 'casual', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 8,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['GPT-5.6 Luna', 'GPT-5.6 Terra (Cota Leve)', 'Canvas'],
    pools: ['Go Tier'],
    quotaDescription: 'Cota intermediária superior ao plano gratuito para estudantes e uso individual constante.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Sem garantia formal de ZDR corporativo; retenção padrão de conta individual.',
    bestFor: 'Estudantes e desenvolvedores com orçamento muito reduzido.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'openai-chatgpt-plus',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Plus',
    targetAudience: 'individual',
    profileTags: ['professional-dev', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 20,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['GPT-5.6 Sol (Cota Padrão)', 'GPT-5.6 Terra', 'GPT-5.6 Luna', 'DALL-E', 'Code Interpreter'],
    pools: ['Plus Pool'],
    quotaDescription: 'Acesso prioritário e cotas regulares para modelos de raciocínio frontier Sol e Terra.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Suporte a opt-out de treinamento nas configurações de privacidade.',
    bestFor: 'Desenvolvedor profissional individual no fluxo de trabalho diário.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'openai-chatgpt-pro',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'ChatGPT Pro',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 200,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['GPT-5.6 Sol Pro (Ilimitado/Prioridade Máxima)', 'GPT-5.6 Sol', 'GPT-5.6 Terra', 'Canvas', 'Deep Research'],
    pools: ['Pro Unlimited Pool'],
    quotaDescription: 'Uso ilimitado e prioritário em GPT-5.6 Sol com acesso exclusivo aos níveis máximos de raciocínio e Deep Research.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Proteção avançada de sessão individual; sem treino com prompts habilitado.',
    bestFor: 'Engenheiros seniores, pesquisadores e usuários intensivos sem tolerância a rate limits.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'openai-chatgpt-business-standard',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'Business Standard',
    targetAudience: 'team',
    profileTags: ['team', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 25,
    annualPriceUsd: 240, // $20/mês equivalente
    localizedPricing: null,
    billingPeriod: 'user/month',
    includedModels: ['GPT-5.6 Sol', 'GPT-5.6 Terra', 'GPT-5.6 Luna', 'Workspaces', 'Admin Console'],
    pools: ['Business Team Pool'],
    quotaDescription: 'Cotas corporativas compartilhadas por usuário com console administrativo e créditos flexíveis opcionais.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Zero Data Retention para dados da empresa; prompts NUNCA são usados para treinamento.',
    bestFor: 'Pequenas e médias equipes de desenvolvimento com necessidade de compliance.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'openai-chatgpt-business-premium',
    provider: 'openai',
    product: 'ChatGPT',
    planName: 'Business Premium',
    targetAudience: 'team',
    profileTags: ['team', 'heavy-agentic'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 125,
    annualPriceUsd: 1200, // $100/mês equivalente
    localizedPricing: null,
    billingPeriod: 'user/month',
    includedModels: ['GPT-5.6 Sol (Alta Concorrência)', 'GPT-5.6 Sol Pro', 'Deep Research Team', 'SSO & Audit Logs'],
    pools: ['Premium Enterprise Pool'],
    quotaDescription: 'Altíssima franquia de raciocínio frontier por usuário com suporte SLA e auditoria.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'SOC 2 Type II, ZDR formal e isolamento corporativo estrito.',
    bestFor: 'Equipes técnicas exigentes de alta produtividade e agentes autônomos contínuos.',
    verifiedAt: '2026-09-03',
    current: true
  },

  // ==========================================
  // 2. ANTHROPIC / CLAUDE
  // ==========================================
  {
    id: 'anthropic-claude-free',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Free',
    targetAudience: 'individual',
    profileTags: ['casual', 'student'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 0,
    annualPriceUsd: null,
    localizedPricing: { BRL: { price: 0, official: true } },
    billingPeriod: 'monthly',
    includedModels: ['Claude Sonnet 5 (Acesso Dinâmico)', 'Claude Haiku 4.5'],
    pools: ['Free Public Pool'],
    quotaDescription: 'Cota de mensagens renovada a cada 5 horas com restrição de demanda.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Retenção padrão para moderação; sem treino com prompts em conformidade com termos da Anthropic.',
    bestFor: 'Experimentação inicial com o ecossistema Claude.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'anthropic-claude-pro',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Pro',
    targetAudience: 'individual',
    profileTags: ['professional-dev', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 20,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Claude Fable 5.1 (Cota Compartilhada)', 'Claude Opus 5', 'Claude Sonnet 5', 'Claude Haiku 4.5', 'Projects', 'Artifacts'],
    pools: ['Pro Pool (5x vs Free)'],
    quotaDescription: 'Aproximadamente 5x a capacidade do plano gratuito; janela móvel de 5 horas compartilhada entre todos os modelos.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Prompts comerciais não são usados para treinar modelos.',
    bestFor: 'Desenvolvedores que usam Claude Sonnet 5 e Fable 5.1 para código e arquitetura diária.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'anthropic-claude-max-5x',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Max 5x',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 100,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Claude Fable 5.1', 'Claude Opus 5', 'Claude Sonnet 5', 'Claude Code CLI'],
    pools: ['Max 5x Pool'],
    quotaDescription: '5x a cota do Claude Pro (~25x do plano gratuito). Suporte ampliado a sessões longas no Claude Code.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Proteção comercial com isolamento de projetos e sem treinamento de modelo.',
    bestFor: 'Desenvolvedores usando Claude Code intensivamente em projetos de porte médio a grande.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'anthropic-claude-max-20x',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Max 20x',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 200,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Claude Fable 5.1 (Alta Capacidade)', 'Claude Opus 5', 'Claude Sonnet 5', 'Claude Code CLI Max'],
    pools: ['Max 20x Pool'],
    quotaDescription: '20x a cota do Claude Pro (~100x do Free). Nível máximo individual para coding contínuo com Fable 5.1.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Alta prioridade de infraestrutura e política comercial estrita.',
    bestFor: 'Engenheiros de software e criadores de protótipos complexos que consom cotas rápidas do Fable 5.1.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'anthropic-claude-team',
    provider: 'anthropic',
    product: 'Claude',
    planName: 'Claude Team',
    targetAudience: 'team',
    profileTags: ['team', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 30, // por usuário mensal
    annualPriceUsd: 300, // $25/mês por usuário no plano anual
    localizedPricing: null,
    billingPeriod: 'user/month (min 5 seats)',
    includedModels: ['Claude Fable 5.1', 'Claude Opus 5', 'Claude Sonnet 5', 'Claude Haiku 4.5', 'Team Workspaces'],
    pools: ['Team Pool'],
    quotaDescription: 'Mínimo de 5 usuários ($150/mês total). Limites superiores ao Pro e gestão centralizada de membros.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Termos de equipe com retenção zero para treinamento e controles de compliance.',
    bestFor: 'Times de engenharia compartilhando projetos, bibliotecas e padrões de arquitetura.',
    verifiedAt: '2026-09-03',
    current: true
  },

  // ==========================================
  // 3. GOOGLE AI & ANTIGRAVITY
  // ==========================================
  {
    id: 'google-ai-free',
    provider: 'google',
    product: 'Google AI Studio / Gemini App',
    planName: 'Google AI Free Tier',
    targetAudience: 'individual',
    profileTags: ['casual', 'student'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 0,
    annualPriceUsd: null,
    localizedPricing: { BRL: { price: 0, official: true } },
    billingPeriod: 'monthly',
    includedModels: ['Gemini 3.8 Flash (Rate Limited)', 'Gemini 3.5 Flash', 'Google Search Tool'],
    pools: ['AI Studio Free Pool'],
    quotaDescription: '15 RPM / 1M TPM no AI Studio com rate limits para desenvolvimento e testes.',
    overageAllowed: false,
    apiIncluded: true,
    privacyNotes: 'No tier gratuito do AI Studio prompts podem ser revisados por humanos e usados para produto.',
    bestFor: 'Experimentação de protótipos de visão e áudio sem custo.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'google-ai-pro',
    provider: 'google',
    product: 'Google One AI Premium / Antigravity',
    planName: 'Google AI Pro',
    targetAudience: 'individual',
    profileTags: ['professional-dev', 'student', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 19.99,
    annualPriceUsd: null,
    localizedPricing: {
      BRL: { price: 96.99, official: true, source: 'Google Brasil Store Oficial' }
    },
    billingPeriod: 'monthly',
    includedModels: ['Gemini 3.8 Flash (Pool 1)', 'Gemini 3.7 Flash', 'Gemini 3.1 Pro (Pool 2 Cota Base)', 'Antigravity IDE Stack', '2 TB Google Drive'],
    pools: ['Pool 1 (Gemini) + Pool 2 Base'],
    quotaDescription: 'Acesso prioritário aos modelos Gemini em 1M de tokens e stack do Antigravity com 2 TB de armazenamento.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Dados de assinantes AI Pro não são utilizados para treinamento do Gemini.',
    bestFor: 'Melhor custo-benefício oficial no Brasil (R$ 96,99 com 2TB de nuvem inclusos).',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'google-ai-ultra-5x',
    provider: 'google',
    product: 'Google AI Ultra / Antigravity',
    planName: 'Google AI Ultra 5x',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 99.99,
    annualPriceUsd: null,
    localizedPricing: {
      BRL: { price: 779.90, official: true, source: 'Google Play / Cloud Brasil Oficial' }
    },
    billingPeriod: 'monthly',
    includedModels: ['Gemini 3.8 Flash High', 'Gemini 3.1 Pro Ultra', 'Antigravity Pool 2 (5x)', 'Deep Research Ultra'],
    pools: ['Ultra 5x Pool'],
    quotaDescription: '5x a capacidade de raciocínio do AI Pro no Antigravity e Gemini Apps com suporte a créditos flexíveis.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Garantia comercial de nível corporativo e retenção auditada.',
    bestFor: 'Agentes autônomos intensivos em vídeo, imagem e monorepos no Antigravity.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'google-ai-ultra-20x',
    provider: 'google',
    product: 'Google AI Ultra / Antigravity',
    planName: 'Google AI Ultra 20x',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'team'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 199.99,
    annualPriceUsd: null,
    localizedPricing: {
      BRL: { price: 999.90, official: true, source: 'Google Play / Cloud Brasil Oficial' }
    },
    billingPeriod: 'monthly',
    includedModels: ['Gemini 3.8 Flash Max (Ilimitado)', 'Gemini 3.1 Pro (20x Pool 2)', 'Antigravity Full Tier', '30 TB Cloud'],
    pools: ['Ultra 20x Pool'],
    quotaDescription: 'Nível extremo de capacidade para desenvolvedores de ponta com suporte prioritário e 20x limite do Pro.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'ZDR corporativo e proteção estrita de segredos de código.',
    bestFor: 'Empresas e desenvolvedores que executam múltiplos loops agênticos contínuos.',
    verifiedAt: '2026-09-03',
    current: true
  },

  // ==========================================
  // 4. CURSOR (ANYSPHERE)
  // ==========================================
  {
    id: 'cursor-hobby',
    provider: 'cursor',
    product: 'Cursor IDE',
    planName: 'Cursor Hobby',
    targetAudience: 'individual',
    profileTags: ['casual', 'student'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 0,
    annualPriceUsd: null,
    localizedPricing: { BRL: { price: 0, official: true } },
    billingPeriod: 'monthly',
    includedModels: ['Cursor Tab (Autocomplete ilimitado por 14 dias)', 'Composer Básico', '50 requisições lentas de frontier'],
    pools: ['Free Pool'],
    quotaDescription: '50 requisições frontier gratuitas por mês e período de teste do autocompletar inteligente.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Suporte a Privacy Mode nativo (código local não armazenado).',
    bestFor: 'Testar a experiência do Cursor IDE antes de assinar.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'cursor-pro',
    provider: 'cursor',
    product: 'Cursor IDE',
    planName: 'Cursor Pro',
    targetAudience: 'individual',
    profileTags: ['professional-dev', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 20,
    annualPriceUsd: 192, // $16/mês no anual
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Grok 4.6 (Cursor Pool)', 'Composer 2.5', 'Claude Sonnet 5', 'GPT-5.6 Sol', 'Autocompletar Ilimitado'],
    pools: ['Cursor Models (Ilimitado/Generoso) + 500 Fast Requests Other Models'],
    quotaDescription: 'Autocompletar ilimitado, uso generoso em modelos Cursor (Grok/Composer) e 500 chamadas rápidas nos demais modelos.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Privacy Mode habilitável com 1 clique (zero retenção nos servidores da Anysphere).',
    bestFor: 'O padrão de mercado para desenvolvedores de software no dia a dia.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'cursor-pro-plus',
    provider: 'cursor',
    product: 'Cursor IDE',
    planName: 'Cursor Pro+',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 60,
    annualPriceUsd: 576, // $48/mês no anual
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Grok 4.6 Agent Max', 'Claude Fable 5.1', 'Claude Sonnet 5', 'GPT-5.6 Sol Pro', 'Composer 2.5 Max'],
    pools: ['~3x Limites Agent do Pro (1.500 Fast Requests Other Models)'],
    quotaDescription: 'Aproximadamente 3x a franquia de agente do Pro. Excelente para refatorações longas e coding agents pesados.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Privacy Mode estrito e suporte a chaves próprias de API (BYOK).',
    bestFor: 'Desenvolvedores que esgotam o plano Pro na terceira semana do mês.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'cursor-ultra',
    provider: 'cursor',
    product: 'Cursor IDE',
    planName: 'Cursor Ultra',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 200,
    annualPriceUsd: 1920, // $160/mês no anual
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Claude Fable 5.1 Max', 'Grok 4.6 Ultra', 'GPT-5.6 Sol Max', 'Todos os modelos com prioridade de servidor'],
    pools: ['~20x Limites Agent do Pro (10.000 Fast Requests)'],
    quotaDescription: '20x os limites normais de agentes com acesso irrestrito e prioritário a filas de inferência.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Privacy Mode corporativo com isolamento de cache.',
    bestFor: 'Heavy users que usam o Cursor como principal ambiente de trabalho 10+ horas/dia.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'cursor-teams-standard',
    provider: 'cursor',
    product: 'Cursor IDE',
    planName: 'Cursor Teams Standard',
    targetAudience: 'team',
    profileTags: ['team', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 40,
    annualPriceUsd: 384, // $32/mês por seat
    localizedPricing: null,
    billingPeriod: 'user/month',
    includedModels: ['Grok 4.6', 'Composer 2.5', 'Claude Sonnet 5', 'GPT-5.6 Sol', 'Admin Dashboard', 'SSO'],
    pools: ['Teams Shared Pool'],
    quotaDescription: 'Recursos do plano Pro para cada membro da equipe com painel centralizado de cobrança e governança.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Modo de privacidade forçado em toda a organização (Zero Data Retention corporativo).',
    bestFor: 'Times de desenvolvimento de startups e scale-ups.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'cursor-teams-premium',
    provider: 'cursor',
    product: 'Cursor IDE',
    planName: 'Cursor Teams Premium',
    targetAudience: 'team',
    profileTags: ['team', 'heavy-agentic'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 120,
    annualPriceUsd: 1152, // $96/mês por seat
    localizedPricing: null,
    billingPeriod: 'user/month',
    includedModels: ['Claude Fable 5.1', 'Grok 4.6 Max', 'GPT-5.6 Sol Pro', 'Audit Logs', 'Dedicated Support'],
    pools: ['Teams Premium Pool (~3x por usuário)'],
    quotaDescription: 'Franquia estendida estilo Pro+ para cada membro do time com relatórios de segurança.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'SOC 2, ZDR formal e acordos DPA/BAA sob demanda.',
    bestFor: 'Equipes técnicas com projetos de alta complexidade e pipelines exigentes.',
    verifiedAt: '2026-09-03',
    current: true
  },

  // ==========================================
  // 5. OPENCODE GO
  // ==========================================
  {
    id: 'opencode-go',
    provider: 'opencode',
    product: 'OpenCode Platform',
    planName: 'OpenCode Go',
    targetAudience: 'individual',
    profileTags: ['student', 'indie-dev', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 10,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    nominalLimits: {
      fiveHoursUsd: 12,
      weeklyUsd: 30,
      monthlyUsd: 60
    },
    targetValueMultiplier: 6,
    subscriberLimitPerWorkspace: 1,
    providerCredentialIncluded: true,
    externalProviderCreditsIncluded: false,
    zenBalanceFallbackSupported: true,
    zenBalanceFallbackRequiresOptIn: true,
    freeModelsAfterLimit: true,
    currentModelCount: 26,
    modelCatalogSource: 'OPENCODE_GO_DATA',
    privacyModelSpecific: true,
    get includedModels() {
      if (typeof OPENCODE_GO_DATA !== 'undefined' && OPENCODE_GO_DATA.models) {
        return OPENCODE_GO_DATA.models.map(m => `${m.displayName} (${m.usageAllowanceUsd === 60 ? '1× burn' : m.usageAllowanceUsd === 30 ? '2× burn' : '4× burn'} • ~${m.reqMonth.toLocaleString()} req/mês)`);
      }
      return [
        'MiMo-V2.5 (1× burn • 150.400 req/mês)',
        'LongCat-2.0 (1× burn • 57.200 req/mês)',
        'DeepSeek V4 Flash (2× burn • 37.800 req/mês)',
        'GPT-5.6 Luna (4× burn • 10.250 req/mês)',
        'GLM-5.3-Flash (4× burn • 7.900 req/mês)',
        'Grok 4.6 (4× burn • 845 req/mês)'
      ];
    },
    pools: [
      'Classe US$ 60 (1× burn / 6× valor - 13 modelos)',
      'Classe US$ 30 (2× burn / 3× valor - 4 modelos)',
      'Classe US$ 15 (4× burn / 1,5× valor - 9 modelos)'
    ],
    quotaDescription: 'Limites nominais: $12 em 5h, $30 semanal e $60 mensal. O volume real depende da classe de uso do modelo (1×, 2× ou 4× burn). Modelos 4× queimam a quota 4 vezes mais rápido.',
    overageAllowed: true, // Suporte a fallback no OpenCode Zen balance
    apiIncluded: true, // Fornece API key para endpoints /responses, /chat/completions e /messages
    privacyNotes: 'Privacidade específica por modelo: 22 modelos com ZDR estrito (0 dias); Grok 4.6 e GPT-5.6 Luna retêm logs por até 30 dias para prevenção de abuso; DeepSeek V4 Flash requer revalidação; Muse Spark Contributor autoriza treino Meta.',
    bestFor: 'Assinatura versátil de US$ 10/mês para uso com OpenCode e outros coding agents compatíveis via API dedicada.',
    verifiedAt: '2026-09-03',
    current: true
  },

  // ==========================================
  // 6. Z.AI (ZHIPU AI) CODING PLANS
  // ==========================================
  {
    id: 'zai-coding-lite',
    provider: 'zai',
    product: 'Z.ai Coding Service',
    planName: 'Z.ai Coding Lite',
    targetAudience: 'individual',
    profileTags: ['student', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 18,
    annualPriceUsd: 151.20, // $12.60/mês equivalente
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['GLM-5.3-Flash (Alta Cota)', 'GLM-5.2', 'CodeGeeX 4', 'ZCode Agent'],
    pools: ['Lite Quota Pool'],
    quotaDescription: 'Cota de entrada para programação assistida e geração multimodal de código.',
    overageAllowed: true,
    apiIncluded: true,
    privacyNotes: 'Política ZDR disponível para clientes pagantes comerciais.',
    bestFor: 'Desenvolvedores que priorizam o ecossistema GLM aberto com excelente custo anual ($12,60/mês).',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'zai-coding-pro',
    provider: 'zai',
    product: 'Z.ai Coding Service',
    planName: 'Z.ai Coding Pro',
    targetAudience: 'individual',
    profileTags: ['professional-dev', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 72,
    annualPriceUsd: 604.80, // $50.40/mês equivalente
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['GLM-5.3 (Frontier)', 'GLM-5.3-Flash (Ilimitado)', 'ZCode Multi-Agent Studio'],
    pools: ['Pro Quota Pool (~4x do Lite)'],
    quotaDescription: 'Franquia ampliada para o modelo de ponta GLM-5.3 e autonomia agêntica completa.',
    overageAllowed: true,
    apiIncluded: true,
    privacyNotes: 'Retenção zero de código e isolamento de ambiente.',
    bestFor: 'Engenheiros seniores focados em modelos com arquitetura MoE multimodal aberta.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'zai-coding-max',
    provider: 'zai',
    product: 'Z.ai Coding Service',
    planName: 'Z.ai Coding Max',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'team'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 160,
    annualPriceUsd: 1344, // $112/mês equivalente
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['GLM-5.3 Max Concurrency', 'GLM-5.3-Flash Dedicated Endpoints', 'AutoClaw Agent'],
    pools: ['Max Priority Pool'],
    quotaDescription: 'Nível máximo de concorrência com suporte a múltiplos subagentes simultâneos sem gargalos.',
    overageAllowed: true,
    apiIncluded: true,
    privacyNotes: 'SLA corporativo com auditoria e ZDR garantido.',
    bestFor: 'Agências e desenvolvedores autônomos pesados no ecossistema Z.ai.',
    verifiedAt: '2026-09-03',
    current: true
  },

  // ==========================================
  // 7. KIMI (MOONSHOT AI) MEMBERSHIP
  // ==========================================
  {
    id: 'kimi-andante',
    provider: 'moonshot',
    product: 'Kimi Platform',
    planName: 'Kimi Andante',
    targetAudience: 'individual',
    profileTags: ['student', 'casual'],
    nativeCurrency: 'CNY',
    monthlyPriceCny: 49,
    monthlyPriceUsd: 7.22,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Kimi K2.7 Code', 'Kimi K2.6', 'Kimi Agent'],
    pools: ['Andante Pool'],
    quotaDescription: '30 usos de agente/mês, 1 tarefa paralela, 6 tarefas agendadas, 20 projetos e 20 GB de storage.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Termos de serviço padrão Kimi com proteção individual.',
    bestFor: 'Estudantes e programadores experimentando os modelos Kimi com preço muito acessível (~R$ 37/mês).',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'kimi-moderato',
    provider: 'moonshot',
    product: 'Kimi Platform',
    planName: 'Kimi Moderato',
    targetAudience: 'individual',
    profileTags: ['indie-dev', 'professional-dev'],
    nativeCurrency: 'CNY',
    monthlyPriceCny: 99,
    monthlyPriceUsd: 14.58,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Kimi K3 (Raciocínio Longo)', 'Kimi K2.7 Code', 'Kimi Agent Swarm (25 usos)'],
    pools: ['Moderato Pool'],
    quotaDescription: '60 usos de agente/mês, 2 tarefas paralelas, 25 usos de Agent Swarm (2 subtarefas), 10 tarefas agendadas.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Privacidade comercial com isolamento de projetos.',
    bestFor: 'Excelente equilíbrio para desenvolvimento individual com agente (~R$ 75/mês).',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'kimi-allegretto',
    provider: 'moonshot',
    product: 'Kimi Platform',
    planName: 'Kimi Allegretto',
    targetAudience: 'individual',
    profileTags: ['professional-dev', 'heavy-agentic'],
    nativeCurrency: 'CNY',
    monthlyPriceCny: 199,
    monthlyPriceUsd: 29.32,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Kimi K3', 'Kimi K2.7 Code', 'Kimi Agent Swarm (50 usos / 4 subtarefas)'],
    pools: ['Allegretto Pool'],
    quotaDescription: '150 usos de agente/mês, 2 tarefas paralelas, 50 usos de Agent Swarm (4 subtarefas), 15 tarefas agendadas.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'ZDR corporativo e retenção zero para código.',
    bestFor: 'Engenheiros usando Kimi K3 para análise de grandes bases de código.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'kimi-allegro',
    provider: 'moonshot',
    product: 'Kimi Platform',
    planName: 'Kimi Allegro',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'team'],
    nativeCurrency: 'CNY',
    monthlyPriceCny: 699,
    monthlyPriceUsd: 102.97,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Kimi K3 (1M Tokens Conversação)', 'Kimi Agent Swarm (120 usos / 8 subtarefas)'],
    pools: ['Allegro Max Pool'],
    quotaDescription: '360 usos de agente/mês, 4 tarefas paralelas, 120 usos de Agent Swarm (8 subtarefas), 100 projetos e 50 GB storage.',
    overageAllowed: true,
    apiIncluded: false,
    privacyNotes: 'Máxima prioridade em cluster dedicado e proteção de dados estrita.',
    bestFor: 'Usuários de alta demanda que exploram raciocínio extremo em 1 milhão de tokens.',
    verifiedAt: '2026-09-03',
    current: true
  },

  // ==========================================
  // 8. xAI (GROK)
  // ==========================================
  {
    id: 'xai-free',
    provider: 'xai',
    product: 'Grok / X Platform',
    planName: 'xAI Free',
    targetAudience: 'individual',
    profileTags: ['casual'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 0,
    annualPriceUsd: null,
    localizedPricing: { BRL: { price: 0, official: true } },
    billingPeriod: 'monthly',
    includedModels: ['Grok 4.5 (Cota Básica)', 'Web Search'],
    pools: ['X Free Pool'],
    quotaDescription: 'Cota limitada de mensagens a cada 2 horas integrada à rede social X.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Pode utilizar postagens e interações públicas.',
    bestFor: 'Curiosos e usuários casuais da plataforma X.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'xai-supergrok',
    provider: 'xai',
    product: 'SuperGrok / Grok 4.6',
    planName: 'SuperGrok',
    targetAudience: 'individual',
    profileTags: ['professional-dev', 'indie-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 30,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Grok 4.6 (Prioridade Alta)', 'Grok 4.5', 'Open Design Tools', 'Real-time Web Analysis'],
    pools: ['SuperGrok Pool'],
    quotaDescription: 'Acesso prioritário irrestrito ao Grok 4.6 com janelas estendidas de código e raciocínio.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Modo comercial sem inclusão de prompts no treinamento de modelos públicos.',
    bestFor: 'Desenvolvedores que apreciam a velocidade e estilo direto do Grok 4.6.',
    verifiedAt: '2026-09-03',
    current: true
  },
  {
    id: 'xai-supergrok-plus',
    provider: 'xai',
    product: 'SuperGrok / Grok 4.6',
    planName: 'SuperGrok Plus',
    targetAudience: 'individual',
    profileTags: ['heavy-agentic', 'professional-dev'],
    nativeCurrency: 'USD',
    monthlyPriceUsd: 100,
    annualPriceUsd: null,
    localizedPricing: null,
    billingPeriod: 'monthly',
    includedModels: ['Grok 4.6 Extra High Reasoning', 'Grok 4.6 Concurrency Boost', 'Codebase Analysis Tools'],
    pools: ['SuperGrok Plus Pool (Alta Franquia)'],
    quotaDescription: 'Limites substancialmente maiores para tarefas de grande porte e chamadas complexas de código.',
    overageAllowed: false,
    apiIncluded: false,
    privacyNotes: 'Isolamento avançado de sessão e maior throughput de geração.',
    bestFor: 'Usuários intensivos do ecossistema xAI em busca de máxima velocidade.',
    verifiedAt: '2026-09-03',
    current: true
  }
];

// Helper para cálculo dinâmico de stacks por faixa orçamentária
const BUDGET_STACK_RECOMMENDER = {
  getStacksForBudgetBrl(budgetBrl, priority = 'balanced') {
    const plans = SUBSCRIPTION_PLANS_DATA.filter(p => p.current);
    const results = [];

    // Tiers predefinidos calculados matematicamente
    if (budgetBrl === 0) {
      results.push({
        title: 'Stack 100% Gratuito (Zero Custo)',
        monthlyCostBrl: 0,
        monthlyCostUsd: 0,
        plans: [
          plans.find(p => p.id === 'cursor-hobby'),
          plans.find(p => p.id === 'google-ai-free'),
          plans.find(p => p.id === 'openai-chatgpt-free')
        ],
        planner: 'Gemini 3.8 Flash (AI Studio)',
        executor: 'Cursor Composer (50 req) + gpt-oss-20b (Local)',
        reviewer: 'Claude Free / Gemini Studio',
        pros: 'Custo zero absoluto; ideal para estudantes e testes locais sem cartão de crédito.',
        cons: 'Rate limits frequentes e sem suporte a tarefas agênticas longas de monorepos.'
      });
    } else if (budgetBrl <= 60) {
      const goPlan = plans.find(p => p.id === 'opencode-go');
      const goBrl = FX_HELPERS.convertUsdToBrl(goPlan.monthlyPriceUsd);
      results.push({
        title: 'Stack Campeão Sub-R$60: OpenCode Go Solo',
        monthlyCostBrl: goBrl,
        monthlyCostUsd: goPlan.monthlyPriceUsd,
        plans: [goPlan],
        planner: 'GLM-5.3 (1.080 req/mês - 4× burn) ou Qwen3.7 Max (840 req/mês - 2× burn)',
        executor: 'Workers 1× burn: MiMo-V2.5 (150k req) / LongCat-2.0 (57k req) / Kimi K2.7 Code (6.7k req) ou DeepSeek V4 Flash (2× burn • 37.8k req)',
        reviewer: 'GLM-5.2 (4.300 req - 1× burn) ou GPT-5.6 Luna (10.250 req - 4× burn)',
        pros: 'Excelente custo-benefício de US$ 10/mês com 26 modelos oficiais e chave API compatível com múltiplos coding agents.',
        cons: 'O volume mensal varia fortemente por modelo (de 490 a 226k req); modelos 4× queimam quota 4 vezes mais rápido.'
      });
    } else if (budgetBrl <= 110) {
      const googlePro = plans.find(p => p.id === 'google-ai-pro');
      const zaiLite = plans.find(p => p.id === 'zai-coding-lite');
      const kimiMod = plans.find(p => p.id === 'kimi-moderato');

      results.push({
        title: 'Opção A: Google AI Pro Oficial Brasil (Melhor Multimodal)',
        monthlyCostBrl: 96.99, // Preço oficial Brasil
        monthlyCostUsd: 19.99,
        plans: [googlePro],
        planner: 'Gemini 3.1 Pro (Pool 2)',
        executor: 'Gemini 3.8 Flash (Pool 1)',
        reviewer: 'Gemini 3.8 Flash High',
        pros: 'Preço oficial nacionalizado em R$ 96,99 com 2 TB de nuvem Google Drive incluídos.',
        cons: 'Limitado aos modelos do ecossistema Google/Antigravity.'
      });

      results.push({
        title: 'Opção B: Cursor Pro Solo (Melhor IDE)',
        monthlyCostBrl: FX_HELPERS.convertUsdToBrl(20),
        monthlyCostUsd: 20,
        plans: [plans.find(p => p.id === 'cursor-pro')],
        planner: 'GPT-5.6 Sol / Claude Sonnet 5 (500 fast req)',
        executor: 'Grok 4.6 / Composer 2.5 (Cursor Pool Ilimitado)',
        reviewer: 'GPT-5.6 Sol',
        pros: 'A melhor experiência de edição de código de arquivo único e multi-arquivo do mercado.',
        cons: '500 fast requests em frontier podem acabar se o usuário rodar muitos loops de agente.'
      });
    } else if (budgetBrl <= 200) {
      const cursorPro = plans.find(p => p.id === 'cursor-pro');
      const opencodeGo = plans.find(p => p.id === 'opencode-go');
      const costCursor = FX_HELPERS.convertUsdToBrl(20);
      const costGo = FX_HELPERS.convertUsdToBrl(10);

      results.push({
        title: 'Stack Ouro (~R$155): Cursor Pro + OpenCode Go',
        monthlyCostBrl: costCursor + costGo,
        monthlyCostUsd: 30,
        plans: [cursorPro, opencodeGo],
        planner: 'GPT-5.6 Sol (Cursor) ou GLM-5.3 (OpenCode)',
        executor: 'Grok 4.6 (Cursor) + GPT-5.6 Luna / GLM-5.3-Flash (Go)',
        reviewer: 'Claude Sonnet 5 (Cursor)',
        pros: 'Combinação consagrada: IDE Cursor para UI/edição rápida e OpenCode Go como pool flexível de workers (priorizando modelos 1× e 2× burn).',
        cons: 'Dois ambientes; modelos 4× burn no Go devem ser usados com critério para não esgotar a cota.'
      });

      results.push({
        title: 'Stack Frontier (~R$200): Claude Pro + Google AI Pro',
        monthlyCostBrl: FX_HELPERS.convertUsdToBrl(20) + 96.99,
        monthlyCostUsd: 39.99,
        plans: [plans.find(p => p.id === 'anthropic-claude-pro'), googlePro],
        planner: 'Claude Fable 5.1 (Claude Pro)',
        executor: 'Gemini 3.8 Flash (Google AI Pro)',
        reviewer: 'Claude Opus 5 / Fable 5.1',
        pros: 'Qualidade máxima de raciocínio com Fable 5.1 e throughput veloz de 305 tok/s do Gemini 3.8.',
        cons: 'Sem IDE dedicada nativa; exige uso via CLI ou chat.'
      });
    } else if (budgetBrl <= 370) {
      const cursorPlus = plans.find(p => p.id === 'cursor-pro-plus');
      const opencodeGo = plans.find(p => p.id === 'opencode-go');
      const costCursorPlus = FX_HELPERS.convertUsdToBrl(60);
      const costGo = FX_HELPERS.convertUsdToBrl(10);

      results.push({
        title: 'Stack Profissional Avançado (~R$360): Cursor Pro+ & OpenCode Go',
        monthlyCostBrl: costCursorPlus + costGo,
        monthlyCostUsd: 70,
        plans: [cursorPlus, opencodeGo],
        planner: 'Claude Fable 5.1 / GPT-5.6 Sol (Cursor Pro+ 3x)',
        executor: 'Grok 4.6 Agent Max + GLM-5.3-Flash',
        reviewer: 'Claude Fable 5.1 (Cursor)',
        pros: '3x a capacidade de agente do Cursor Pro, Fable 5.1 integrado e buffer gigante do OpenCode Go.',
        cons: 'Custo mensal mais elevado.'
      });
    } else {
      const claudeMax = plans.find(p => p.id === 'anthropic-claude-max-5x');
      const cursorPlus = plans.find(p => p.id === 'cursor-pro-plus');
      results.push({
        title: 'Stack Ultra Heavy-Agentic (R$500+): Claude Max 5x ou Cursor Ultra',
        monthlyCostBrl: FX_HELPERS.convertUsdToBrl(100),
        monthlyCostUsd: 100,
        plans: [claudeMax],
        planner: 'Claude Fable 5.1 Max',
        executor: 'Claude Code CLI / Gemini 3.8 API',
        reviewer: 'Claude Fable 5.1',
        pros: 'Capacidade massiva para Claude Code executando 14+ subagentes paralelos e prototipagem de sistemas inteiros.',
        cons: 'Investimento premium focado em alta produtividade individual.'
      });
    }

    return results;
  }
};

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUBSCRIPTION_PLANS_DATA, BUDGET_STACK_RECOMMENDER };
}
