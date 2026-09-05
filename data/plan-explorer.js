/**
 * data/plan-explorer.js
 * Explorador de Assinaturas, Modelos e Orçamento
 * Módulo de suporte a UX, consultas e recomendações sem duplicar os dados de verdade.
 * Em estrita conformidade com 06-prompt-ajuste.md.
 */

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = factory();
  } else {
    // Browser
    root.PlanExplorer = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // =========================================================================
  // 1. CONFIGURAÇÃO DE UI (PLAN_UI_CONFIG) — Seções 6, 9, 115, 116
  // =========================================================================
  const PLAN_UI_CONFIG = {
    // Ordem oficial das empresas na aba Planos (Seção 6)
    companiesOrder: [
      'openai',
      'anthropic',
      'google',
      'cursor',
      'opencode',
      'zai',
      'xai',
      'kimi',
      'camelai'
    ],

    companyMetadata: {
      openai: {
        id: 'openai',
        name: 'OpenAI',
        icon: '🟢',
        brandColor: '#10a37f',
        tagline: 'ChatGPT, Codex & Workspaces'
      },
      anthropic: {
        id: 'anthropic',
        name: 'Anthropic',
        icon: '🟣',
        brandColor: '#d97706',
        tagline: 'Claude Pro, Max 5x/20x & Team'
      },
      google: {
        id: 'google',
        name: 'Google',
        icon: '🔵',
        brandColor: '#4285f4',
        tagline: 'Google AI Pro, Ultra & Flow'
      },
      cursor: {
        id: 'cursor',
        name: 'Cursor',
        icon: '⚡',
        brandColor: '#6366f1',
        tagline: 'Cursor Pro, Ultra & Teams'
      },
      opencode: {
        id: 'opencode',
        name: 'OpenCode',
        icon: '💻',
        brandColor: '#ec4899',
        tagline: 'OpenCode Go & Multi-Model Gateway'
      },
      zai: {
        id: 'zai',
        name: 'Z.ai (Zhipu)',
        icon: '🤖',
        brandColor: '#3b82f6',
        tagline: 'Z.ai Coding Lite, Pro & Max (GLM)'
      },
      xai: {
        id: 'xai',
        name: 'xAI',
        icon: '🚀',
        brandColor: '#1e293b',
        tagline: 'SuperGrok, Grok Business & Enterprise'
      },
      kimi: {
        id: 'kimi',
        name: 'Kimi (Moonshot)',
        icon: '🌙',
        brandColor: '#8b5cf6',
        tagline: 'Kimi Membership & K3 Coding'
      },
      camelai: {
        id: 'camelai',
        name: 'camelAI',
        icon: '🐪',
        brandColor: '#f59e0b',
        tagline: 'camelCode & camelStream Inference API'
      }
    },

    universalBadges: {
      access: {
        included: { id: 'included', label: 'Incluído', icon: '✅', color: '#10b981', category: 'included' },
        partial: { id: 'partial', label: 'Incluído c/ Limite', icon: '✅', color: '#3b82f6', category: 'partial' },
        credits: { id: 'credits', label: 'Créditos Extras', icon: '💳', color: '#f59e0b', category: 'credits' },
        metered: { id: 'metered', label: 'Cobrado por Uso', icon: '🧮', color: '#ef4444', category: 'metered' },
        pool: { id: 'pool', label: 'Pool Compartilhado', icon: '🔄', color: '#8b5cf6', category: 'pool' },
        byok: { id: 'byok', label: 'BYOK', icon: '🔑', color: '#06b6d4', category: 'byok' },
        api: { id: 'api', label: 'API Separada', icon: '🌐', color: '#64748b', category: 'api' },
        none: { id: 'none', label: 'Indisponível', icon: '❌', color: '#475569', category: 'none' }
      },
      planAudience: {
        free: { label: 'Gratuito', icon: '🆓' },
        individual: { label: 'Individual', icon: '👤' },
        team: { label: 'Equipe', icon: '👥' },
        enterprise: { label: 'Enterprise', icon: '🏢' }
      },
      privacy: {
        zdr: { label: 'ZDR Contratual', icon: '🛡️', color: '#10b981', desc: 'Retenção Zero Formal sob contrato' },
        noTraining: { label: 'No-Training Default', icon: '🔒', color: '#3b82f6', desc: 'Dados não usados para treino' },
        consumerOptOut: { label: 'Consumer (Opt-out)', icon: '👤', color: '#f59e0b', desc: 'Opt-out manual necessário' },
        retentionWarning: { label: 'Retenção / Possível Treino', icon: '⚠️', color: '#ef4444', desc: 'Permite retenção de logs' }
      },
      predictability: {
        predictable: { label: 'Custo Previsível', icon: '💵', color: '#10b981' },
        variable: { label: 'Custo Variável', icon: '📈', color: '#f59e0b' }
      }
    }
  };
  PLAN_UI_CONFIG.companies = PLAN_UI_CONFIG.companyMetadata;
  PLAN_UI_CONFIG.accessBadges = PLAN_UI_CONFIG.universalBadges.access;

  // =========================================================================
  // 2. HELPERS DE PREÇO LOCALIZADO E FORMATAÇÃO — Seções 50, 51, 52, 53, 54
  // =========================================================================

  /**
   * Obtém as informações de preço para exibição de acordo com moeda e regras locais.
   * Regras:
   * 1. Preço oficial Brasil se existir;
   * 2. Caso contrário conversão FX com ≈;
   * 3. Planos CNY preservam o preço nativo em ¥;
   * 4. Enterprise exibe "Fale com vendas" / "Preço sob consulta" (nunca US$ 0).
   */
  function getDisplayPrice(plan, currency = 'BRL', fxRates = null) {
    if (!plan) return { text: 'N/D', subtext: '', isEnterprise: false, rawUsd: 0, rawBrl: 0 };

    const officialBrl = plan.localizedPricing?.BRL?.official;
    const brlPrice = plan.localizedPricing?.BRL?.price;
    const usdPrice = plan.monthlyPriceUsd;
    const cnyPrice = plan.monthlyPriceCny;

    // Taxas padrão de referência (03/09/2026) se fxRates não fornecido
    const usdBrlRate = fxRates?.USD_BRL?.rate || 5.1556;
    const cnyBrlRate = fxRates?.CNY_BRL?.rate || 0.7595;

    // 1. Enterprise (Seção 54)
    if (usdPrice === null || usdPrice === undefined || plan.pricing?.pricingVisibility === 'contact-sales' || plan.targetAudience === 'enterprise') {
      return {
        text: 'Fale com vendas',
        subtext: 'Custom Enterprise / Preço sob consulta',
        isEnterprise: true,
        isFree: false,
        rawUsd: null,
        rawBrl: null,
        period: plan.billingPeriod || 'monthly',
        minSeatsText: plan.minSeats > 1 ? `Mínimo de ${plan.minSeats} assentos` : null
      };
    }

    // 2. Gratuito
    if (usdPrice === 0 && (!cnyPrice || cnyPrice === 0)) {
      return {
        text: currency === 'USD' ? 'US$ 0.00' : 'R$ 0,00',
        subtext: 'Gratuito / Free Tier',
        isEnterprise: false,
        isFree: true,
        rawUsd: 0,
        rawBrl: 0,
        period: 'monthly'
      };
    }

    // 3. Preço Oficial Brasil (ex: Google AI Pro R$ 96,99)
    if (officialBrl && currency !== 'USD') {
      const minSeatsText = (plan.minSeats && plan.minSeats > 1)
        ? `Mín. ${plan.minSeats} usuários (total R$ ${(brlPrice * plan.minSeats).toFixed(2).replace('.', ',')}/mês)`
        : null;

      return {
        text: `R$ ${brlPrice.toFixed(2).replace('.', ',')}`,
        subtext: currency === 'DUAL'
          ? `🇧🇷 Preço Oficial Brasil · US$ ${usdPrice.toFixed(2)}/mês`
          : `🇧🇷 Preço Oficial Brasil`,
        isEnterprise: false,
        isFree: false,
        isOfficialBrl: true,
        rawUsd: usdPrice,
        rawBrl: brlPrice,
        period: plan.billingPeriod || 'monthly',
        minSeatsText,
        annualOption: plan.annualPriceUsd ? `Opção anual: US$ ${(plan.annualPriceUsd / 12).toFixed(2)}/mês` : null
      };
    }

    // 4. Moeda Nativa CNY (Kimi Membership - Seção 51, 101)
    if (plan.nativeCurrency === 'CNY' && cnyPrice) {
      const convertedBrl = cnyPrice * cnyBrlRate;
      const convertedUsd = usdPrice || (cnyPrice / 7.2);

      let text = `¥ ${cnyPrice}`;
      let subtext = `≈ R$ ${convertedBrl.toFixed(2).replace('.', ',')} · ≈ US$ ${convertedUsd.toFixed(2)}`;

      if (currency === 'BRL') {
        text = `≈ R$ ${convertedBrl.toFixed(2).replace('.', ',')}`;
        subtext = `¥ ${cnyPrice} nativo (Yuan) · ≈ US$ ${convertedUsd.toFixed(2)}`;
      } else if (currency === 'USD') {
        text = `≈ US$ ${convertedUsd.toFixed(2)}`;
        subtext = `¥ ${cnyPrice} nativo (Yuan) · ≈ R$ ${convertedBrl.toFixed(2).replace('.', ',')}`;
      }

      const annualOption = plan.annualPriceCny 
        ? `Anual: ¥ ${plan.annualPriceCny}/ano (¥ ${(plan.annualPriceCny / 12).toFixed(0)}/mês eq.)` 
        : null;

      return {
        text,
        subtext,
        isEnterprise: false,
        isFree: false,
        rawUsd: convertedUsd,
        rawBrl: convertedBrl,
        nativeText: `¥ ${cnyPrice}`,
        period: plan.billingPeriod || 'monthly',
        annualOption
      };
    }

    // 5. Moeda Padrão USD
    const convertedBrl = usdPrice * usdBrlRate;
    let text = `US$ ${usdPrice.toFixed(2)}`;
    let subtext = `≈ R$ ${convertedBrl.toFixed(2).replace('.', ',')}`;

    if (currency === 'BRL') {
      text = `≈ R$ ${convertedBrl.toFixed(2).replace('.', ',')}`;
      subtext = `US$ ${usdPrice.toFixed(2)} / mês comercial`;
    } else if (currency === 'DUAL') {
      text = `≈ R$ ${convertedBrl.toFixed(2).replace('.', ',')}`;
      subtext = `US$ ${usdPrice.toFixed(2)} / mês comercial`;
    }

    // Detalhe de assentos mínimos para equipes (Seção 53)
    let minSeatsText = null;
    if (plan.minSeats && plan.minSeats > 1) {
      const totalUsd = usdPrice * plan.minSeats;
      const totalBrl = convertedBrl * plan.minSeats;
      minSeatsText = `mínimo ${plan.minSeats} usuários · total US$ ${totalUsd.toFixed(2)} (≈ R$ ${totalBrl.toFixed(2).replace('.', ',')})/mês`;
    }

    // Opção de plano anual (Seção 52)
    let annualOption = null;
    if (plan.annualPriceUsd) {
      const monthlyEquiv = plan.annualPriceUsd / 12;
      annualOption = `US$ ${plan.annualPriceUsd}/ano (~US$ ${monthlyEquiv.toFixed(2)}/mês)`;
    }

    return {
      text,
      subtext,
      isEnterprise: false,
      isFree: false,
      rawUsd: usdPrice,
      rawBrl: convertedBrl,
      period: plan.billingPeriod || 'monthly',
      minSeatsText,
      annualOption
    };
  }

  // =========================================================================
  // 3. ANÁLISE DE CUSTO FIXO E VARIÁVEL — Seções 29, 79, 111
  // =========================================================================

  /**
   * Retorna o custo fixo mensal da assinatura na moeda especificada.
   */
  function getPlanFixedCost(plan, currency = 'BRL', fxRates = null) {
    const disp = getDisplayPrice(plan, currency, fxRates);
    if (disp.isEnterprise) return null;
    return currency === 'USD' ? disp.rawUsd : disp.rawBrl;
  }

  /**
   * Avalia se um plano possui componentes de cobrança variável (créditos extras,
   * overage, pay-as-you-go ou modelos fora da franquia).
   */
  function getPlanVariableBilling(plan) {
    if (!plan) return { hasVariableCost: false, items: [] };

    const items = [];

    // Fable pago por créditos em Claude Pro (Seção 48)
    const hasUsageCredits = plan.modelAccess?.some(m => m.billingMode === 'usage-credits');
    if (hasUsageCredits) {
      items.push('Modelos de raciocínio avançado via Usage Credits (ex: Fable 5.1)');
    }

    // Modelos cobrados por uso / metered pool (ex: Cursor Other Models)
    const hasMetered = plan.modelAccess?.some(m => m.billingMode === 'metered');
    if (hasMetered) {
      items.push('Uso de modelos externos medido por requisição/token (Metered Pool)');
    }

    // OpenCode Go Quota Burn (Seção 46)
    if (plan.id === 'opencode-go' || plan.id === 'opencode-go-standard') {
      items.push('Burn rate variável por modelo (1×, 2× ou 4× na franquia nominal de US$ 60)');
    }

    // camelStream concorrência extra
    if (plan.id === 'camelai-stream-flat') {
      items.push('Streams adicionais concorrentes cobrados a US$ 5/stream');
    }

    // Permite overage
    if (plan.overageAllowed) {
      items.push('Consumo excedente faturado no cartão');
    }

    return {
      hasVariableCost: items.length > 0,
      predictable: items.length === 0,
      items
    };
  }

  // =========================================================================
  // 4. CONSULTAS E FILTROS DE PLANOS — Seções 10-16, 70, 79-84
  // =========================================================================

  function normalizeCompanyId(provider) {
    if (!provider) return 'other';
    const p = provider.toLowerCase();
    if (p === 'anysphere' || p === 'cursor') return 'cursor';
    if (p === 'moonshot' || p === 'kimi') return 'kimi';
    if (p === 'zhipu' || p === 'zai') return 'zai';
    if (p === 'spacexai' || p === 'xai') return 'xai';
    return p;
  }

  /**
   * Agrupa planos pelas empresas canônicas na ordem oficial recomendada.
   */
  function getPlansByCompany(plans = []) {
    const groups = {};
    PLAN_UI_CONFIG.companiesOrder.forEach(comp => {
      groups[comp] = [];
    });
    groups['other'] = [];

    plans.forEach(plan => {
      const compId = normalizeCompanyId(plan.provider);
      if (groups[compId]) {
        groups[compId].push(plan);
      } else {
        groups['other'].push(plan);
      }
    });

    return groups;
  }

  /**
   * Localiza todos os planos e plataformas onde um determinado modelo canônico
   * pode ser consumido, retornando metadados de acesso, billing e superfície.
   */
  function getPlansForModel(modelId, plans = []) {
    if (!modelId) return [];

    const results = [];

    plans.forEach(plan => {
      const accessItem = plan.modelAccess?.find(m => m.modelId === modelId);
      if (accessItem && accessItem.available) {
        results.push({
          plan,
          access: accessItem,
          included: accessItem.included,
          billingMode: accessItem.billingMode,
          surface: accessItem.surface,
          notes: accessItem.notes,
          efforts: accessItem.efforts || []
        });
      }
    });

    // Ordenação canônica por conveniência de acesso (Seção 110)
    // 1. Incluído direto > 2. Incluído c/ cota parcial > 3. Créditos extras > 4. Metered
    const orderScore = (item) => {
      if (item.billingMode === 'included' && item.included) return 1;
      if (item.included) return 2;
      if (item.billingMode === 'usage-credits') return 3;
      if (item.billingMode === 'metered') return 4;
      return 5;
    };

    return results.sort((a, b) => orderScore(a) - orderScore(b));
  }

  /**
   * Realiza busca textual multidimensional (plano, provedor, modelos, features, surfaces).
   */
  function searchPlans(query, plans = []) {
    if (!query || !query.trim()) return plans;
    const q = query.toLowerCase().trim();

    return plans.filter(plan => {
      if (plan.planName.toLowerCase().includes(q)) return true;
      if (plan.provider.toLowerCase().includes(q)) return true;
      if (plan.product?.toLowerCase().includes(q)) return true;
      if (plan.bestFor?.toLowerCase().includes(q)) return true;

      // Busca por modelo
      const matchesModel = plan.modelAccess?.some(m => 
        m.modelId.toLowerCase().includes(q) || 
        (m.modelName && m.modelName.toLowerCase().includes(q))
      );
      if (matchesModel) return true;

      // Busca por surface
      const matchesSurface = plan.surfaces?.some(s => s.toLowerCase().includes(q));
      if (matchesSurface) return true;

      // Busca por feature
      const matchesFeature = plan.features?.some(f => f.toLowerCase().includes(q));
      if (matchesFeature) return true;

      return false;
    });
  }

  // =========================================================================
  // 5. CÁLCULO DE SCORES DIMENSIONAIS DE PLANOS (E — CALIBRADO) — Seção 39, 114
  // =========================================================================

  /**
   * Calcula scores dimensionais calibrados para um plano (0 a 100).
   * Nota metodológica: Indicadores estimados/calibrados (E), não são benchmarks brutos.
   */
  function calculatePlanScores(plan) {
    if (!plan) return { aiAccess: 0, coding: 0, quota: 0, bundle: 0, privacy: 0, costBenefit: 0 };

    // 1. AI Access Score (número e diversidade de modelos frontier)
    let aiAccess = 0;
    const modelsCount = plan.modelAccess?.filter(m => m.available).length || 0;
    aiAccess = Math.min(100, modelsCount * 12);
    if (plan.modelAccess?.some(m => m.modelId.includes('sol') || m.modelId.includes('opus') || m.modelId.includes('fable'))) {
      aiAccess = Math.min(100, aiAccess + 25);
    }

    // 2. Coding Score (ferramentas e superfícies de programação)
    let coding = 20;
    const codingTerms = ['coding', 'code', 'cursor', 'terminal', 'agent', 'ide', 'cli'];
    const isCodingSpecialized = codingTerms.some(t => 
      plan.planName.toLowerCase().includes(t) || 
      plan.product.toLowerCase().includes(t) || 
      plan.bestFor?.toLowerCase().includes(t)
    );
    if (isCodingSpecialized) coding += 40;
    if (plan.features?.some(f => f.toLowerCase().includes('agent') || f.toLowerCase().includes('code'))) coding += 25;
    if (plan.usage?.unlimitedCompletions) coding += 15;
    coding = Math.min(100, coding);

    // 3. Quota Score (generosidade da franquia)
    let quota = 30;
    if (plan.id.includes('pro') || plan.id.includes('moderato')) quota = 60;
    if (plan.id.includes('5x') || plan.id.includes('allegretto')) quota = 80;
    if (plan.id.includes('20x') || plan.id.includes('heavy') || plan.id.includes('allegro') || plan.id.includes('ultra')) quota = 95;
    if (plan.id === 'opencode-go' || plan.id === 'camelai-stream-flat') quota = 85;

    // 4. Bundle / Storage Score (benefícios de ecossistema e nuvem)
    let bundle = 20;
    if (plan.storage?.cloudStorageTb && plan.storage.cloudStorageTb >= 1) bundle = 80;
    if (plan.storage?.cloudStorageTb && plan.storage.cloudStorageTb >= 5) bundle = 95;
    if (plan.credits?.flowCreditsMonthly >= 1000) bundle += 15;
    bundle = Math.min(100, bundle);

    // 5. Privacy Score (rigor de governança e isolamento)
    let privacy = 30;
    if (plan.privacy?.modelTrainingControl) privacy += 20;
    if (plan.privacy?.noTrainingByDefault) privacy += 30;
    if (plan.privacy?.zdr) privacy = 100;

    // 6. Cost-Benefit Score (Fórmula Documentada Seção 39: 30% access, 25% quota, 20% coding, 15% features, 10% price)
    const price = plan.monthlyPriceUsd || 20;
    const priceScore = price === 0 ? 100 : Math.max(10, Math.min(100, 100 - (price / 2.5)));
    const featuresScore = Math.min(100, (plan.features?.length || 0) * 18);

    const costBenefit = Math.round(
      (aiAccess * 0.30) +
      (quota * 0.25) +
      (coding * 0.20) +
      (featuresScore * 0.15) +
      (priceScore * 0.10)
    );

    return {
      aiAccess,
      coding,
      quota,
      bundle,
      privacy,
      costBenefit,
      aiAccessScore: aiAccess,
      codingScore: coding,
      quotaScore: quota,
      bundleStorageScore: bundle,
      privacyScore: privacy,
      costBenefitScore: costBenefit
    };
  }

  // =========================================================================
  // 6. RECOMENDADOR DE ORÇAMENTO E STACKS (BUDGET PLANNER) — Seções 23-31, 72-78
  // =========================================================================

  /**
   * Gera recomendações balanceadas de 1, 2 ou 3 planos compatíveis que cabem no orçamento.
   * Evita duplicar assinaturas mutuamente exclusivas da mesma família.
   */
  function generateBudgetStacks(budgetAmount, currency = 'BRL', profile = 'general', plans = [], fxRates = null) {
    if (!budgetAmount || budgetAmount < 0) budgetAmount = 0;

    // Filtrar planos individuais válidos (exclui Enterprise sob consulta)
    const candidates = plans.filter(p => {
      if (!p.current) return false;
      if (p.monthlyPriceUsd === null || p.monthlyPriceUsd === undefined) return false;
      if (p.targetAudience === 'enterprise') return false;
      return true;
    });

    const stacks = [];

    // 1. Recomendações de plano único
    candidates.forEach(p => {
      const fixedCost = getPlanFixedCost(p, currency, fxRates);
      if (fixedCost !== null && fixedCost <= budgetAmount) {
        const scores = calculatePlanScores(p);
        const varBilling = getPlanVariableBilling(p);
        stacks.push({
          id: `single-${p.id}`,
          type: 'single',
          planCount: 1,
          plans: [p],
          name: p.planName,
          fixedMonthlyCost: fixedCost,
          currency,
          scores,
          variableBilling: varBilling.items,
          summary: p.bestFor || 'Assinatura individual completa',
          fitScore: scores.costBenefit
        });
      }
    });

    // 2. Recomendações de pares complementares (2 planos)
    for (let i = 0; i < candidates.length; i++) {
      for (let j = i + 1; j < candidates.length; j++) {
        const p1 = candidates[i];
        const p2 = candidates[j];

        // Deduplicação: Nunca recomendar dois planos da mesma família (Seção 73, 74)
        if (p1.planFamily && p2.planFamily && p1.planFamily === p2.planFamily) continue;

        // Se ambos forem planos gratuitos, não gerar par redundante
        if (p1.monthlyPriceUsd === 0 && p2.monthlyPriceUsd === 0) continue;

        const cost1 = getPlanFixedCost(p1, currency, fxRates);
        const cost2 = getPlanFixedCost(p2, currency, fxRates);

        if (cost1 !== null && cost2 !== null && (cost1 + cost2) <= budgetAmount) {
          const totalCost = cost1 + cost2;
          const s1 = calculatePlanScores(p1);
          const s2 = calculatePlanScores(p2);

          // Scores combinados ponderados
          const combinedScores = {
            aiAccess: Math.min(100, Math.round(Math.max(s1.aiAccess, s2.aiAccess) * 1.15)),
            coding: Math.min(100, Math.round(Math.max(s1.coding, s2.coding) * 1.15)),
            quota: Math.min(100, Math.round(Math.max(s1.quota, s2.quota) * 1.10)),
            bundle: Math.min(100, Math.max(s1.bundle, s2.bundle)),
            privacy: Math.round((s1.privacy + s2.privacy) / 2),
            costBenefit: Math.round((s1.costBenefit + s2.costBenefit) / 2)
          };
          combinedScores.aiAccessScore = combinedScores.aiAccess;
          combinedScores.codingScore = combinedScores.coding;
          combinedScores.quotaScore = combinedScores.quota;
          combinedScores.bundleStorageScore = combinedScores.bundle;
          combinedScores.privacyScore = combinedScores.privacy;
          combinedScores.costBenefitScore = combinedScores.costBenefit;

          const varItems = Array.from(new Set([
            ...getPlanVariableBilling(p1).items,
            ...getPlanVariableBilling(p2).items
          ]));

          stacks.push({
            id: `pair-${p1.id}-${p2.id}`,
            type: 'pair',
            planCount: 2,
            plans: [p1, p2],
            name: `${p1.planName} + ${p2.planName}`,
            fixedMonthlyCost: totalCost,
            currency,
            scores: combinedScores,
            variableBilling: varItems,
            summary: `Stack balanceado combinando ${p1.product} e ${p2.product}`,
            fitScore: combinedScores.costBenefit
          });
        }
      }
    }

    // Ordenar do maior fitScore para o menor
    return stacks.sort((a, b) => b.fitScore - a.fitScore);
  }

  // =========================================================================
  // 7. COMPARAÇÃO INTELIGENTE DE PLANOS — Seções 33, 34, 35
  // =========================================================================

  /**
   * Gera deterministicamente a descrição da "Principal Diferença" entre dois planos.
   */
  function getPlanSmartDifference(planA, planB) {
    if (!planA || !planB) return 'Selecione dois planos para comparar.';

    // Mesma família de planos (ex: Claude Max 5x vs Max 20x)
    if (planA.planFamily === planB.planFamily) {
      if (planA.monthlyPriceUsd !== planB.monthlyPriceUsd) {
        const higher = (planA.monthlyPriceUsd || 0) > (planB.monthlyPriceUsd || 0) ? planA : planB;
        const lower = higher === planA ? planB : planA;
        return `O ${higher.planName} amplia a franquia de uso (${higher.quotaDescription}), mantendo essencialmente o mesmo conjunto de modelos acessíveis do ${lower.planName}.`;
      }
    }

    // Diferença em foco: Coding vs Generalista
    const isCodingA = planA.profileTags?.includes('coding') || planA.provider === 'cursor' || planA.provider === 'opencode';
    const isCodingB = planB.profileTags?.includes('coding') || planB.provider === 'cursor' || planB.provider === 'opencode';
    if (isCodingA && !isCodingB) {
      return `${planA.planName} é especializado em desenvolvimento de software com IDE/Agent integrado, enquanto ${planB.planName} prioriza interface web conversacional generalista.`;
    }
    if (!isCodingA && isCodingB) {
      return `${planB.planName} é especializado em desenvolvimento de software com IDE/Agent integrado, enquanto ${planA.planName} prioriza interface web conversacional generalista.`;
    }

    // Diferença de modelo exclusivo (ex: Claude Opus/Fable vs GPT Sol)
    const hasOpusA = planA.modelAccess?.some(m => m.modelId.includes('opus') && m.available);
    const hasOpusB = planB.modelAccess?.some(m => m.modelId.includes('opus') && m.available);
    const hasSolA = planA.modelAccess?.some(m => m.modelId.includes('sol') && m.available);
    const hasSolB = planB.modelAccess?.some(m => m.modelId.includes('sol') && m.available);

    if (hasOpusA && !hasOpusB) {
      return `${planA.planName} oferece acesso nativo à família Claude (Opus/Sonnet), enquanto ${planB.planName} atua com outro ecossistema de modelos.`;
    }
    if (hasSolA && !hasSolB) {
      return `${planA.planName} oferece acesso nativo à família GPT-5.6 (Sol), enquanto ${planB.planName} atua com outro ecossistema de modelos.`;
    }

    return `${planA.planName} foca em ${planA.bestFor || 'uso padrão'}, enquanto ${planB.planName} foca em ${planB.bestFor || 'outros fluxos'}.`;
  }

  // =========================================================================
  // 8. WIZARD DETERMINÍSTICO ("QUAL PLANO É MELHOR PARA MIM?") — Seções 87, 88, 89
  // =========================================================================

  /**
   * Executa a recomendação determinística do assistente com base nas respostas do usuário.
   */
  function runPlanWizard(answers = {}, plans = []) {
    const {
      maxBudgetBrl = 250,
      audience = 'individual',
      primaryFocus = 'coding',
      priorityModel = 'any',
      requirePredictableCost = true
    } = answers;

    const scoredPlans = plans.filter(p => p.current).map(p => {
      let score = 50;
      const reasons = [];

      const costBrl = getPlanFixedCost(p, 'BRL') || 0;
      const varBilling = getPlanVariableBilling(p);

      // 1. Orçamento
      if (costBrl <= maxBudgetBrl) {
        score += 30;
        reasons.push(`Cabe no seu orçamento (R$ ${costBrl.toFixed(2).replace('.', ',')}/mês)`);
      } else {
        score -= 40;
      }

      // 2. Público
      if (audience === 'team' && p.targetAudience === 'team') {
        score += 25;
        reasons.push('Projetado para colaboração e gestão de equipes');
      } else if (audience === 'individual' && p.targetAudience === 'individual') {
        score += 15;
      }

      // 3. Foco principal
      if (primaryFocus === 'coding') {
        if (p.provider === 'cursor' || p.provider === 'opencode' || p.product.includes('Code') || p.product.includes('Coding')) {
          score += 30;
          reasons.push('Foco prioritário em programação, terminal e agentes de código');
        }
      } else if (primaryFocus === 'agent') {
        if (p.planName.includes('Pro') || p.planName.includes('Ultra') || p.planName.includes('Max')) {
          score += 20;
          reasons.push('Franquia robusta para execução agêntica prolongada');
        }
      }

      // 4. Modelo prioritário
      if (priorityModel === 'claude' && p.provider === 'anthropic') {
        score += 35;
        reasons.push('Acesso oficial e direto aos modelos Claude (Sonnet, Opus, Fable)');
      } else if (priorityModel === 'openai' && p.provider === 'openai') {
        score += 35;
        reasons.push('Acesso oficial e direto aos modelos GPT-5.6 Sol e Luna');
      } else if (priorityModel === 'google' && p.provider === 'google') {
        score += 35;
        reasons.push('Acesso oficial à família Gemini 3 e créditos Google Flow');
      }

      // 5. Previsibilidade de custo
      if (requirePredictableCost) {
        if (varBilling.predictable) {
          score += 20;
          reasons.push('Custo 100% previsível sem cobrança variável surpresa');
        } else {
          score -= 15;
        }
      }

      return {
        plan: p,
        score,
        reasons: reasons.slice(0, 4)
      };
    });

    // Ordenar e retornar top 3
    return scoredPlans.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  // =========================================================================
  // RETORNO PÚBLICO DO MÓDULO
  // =========================================================================
  return {
    PLAN_UI_CONFIG,
    getDisplayPrice,
    getPlanFixedCost,
    getPlanVariableBilling,
    getPlansByCompany,
    getPlansForModel,
    searchPlans,
    calculatePlanScores,
    generateBudgetStacks,
    getPlanSmartDifference,
    runPlanWizard
  };
});
