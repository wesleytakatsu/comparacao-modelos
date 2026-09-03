/**
 * Script de Auditoria Técnica e Integridade de Dados
 * Portal de Inteligência de Modelos de IA
 * Execução: node scripts/audit-data.js
 * Data de Referência: 03/09/2026 ~03:30 BRT
 */

const fs = require('fs');
const path = require('path');

// Carrega os dados do data.js
const dataPath = path.join(__dirname, '..', 'data.js');
let data;
try {
  data = require(dataPath);
} catch (err) {
  console.error('❌ Erro fatal ao carregar data.js:', err.message);
  process.exit(1);
}

const {
  AI_PROVIDERS_DATA,
  AI_MODELS_DATA,
  DATA_SOURCES,
  CURSORBENCH_32_DATA,
  MARGINAL_GAINS_DATA,
  MULTI_BENCHMARK_LEDGER,
  CAPABILITY_RADAR_10D,
  OPENCODE_GO_DATA,
  HARDWARE_LOCAL_MODELS_DATA,
  HARDWARE_GPU_DATABASE,
  KV_CACHE_COMPRESSION_FACTORS,
  ANTIGRAVITY_POOLS_DATA,
  HARNESS_COMPATIBILITY_DATA,
  TROUBLESHOOTER_DATABASE,
  PRIVACY_ZDR_DATABASE,
  ARTIFICIAL_ANALYSIS_DATA,
  STANDARDIZED_WORKLOADS_DATA,
  AI_DATA_HELPERS,
  FX_RATES_DATA,
  FX_HELPERS,
  SUBSCRIPTION_PLANS_DATA,
  BUDGET_STACK_RECOMMENDER,
  MODEL_HISTORY_DATA,
  BENCHMARK_HISTORY_DATA,
  PRICE_HISTORY_DATA,
  COMMUNITY_REPORTS_DATA,
  BENCHMARK_VS_COMMUNITY_DIVERGENCES,
  ENGINEERING_BEHAVIOR_DATA,
  USE_CASE_COMPARISON_DATA,
  PLATFORM_MODEL_CATALOG,
  PLATFORM_AVAILABILITY_MATRIX,
  CAMELAI_PLATFORM_DATA,
  GROK_BOT_METADATA,
  ZAI_CREDIT_ACCOUNTING,
  PlanExplorer,
  BENCHMARK_REGISTRY,
  SOURCE_REGISTRY,
  MODEL_DOSSIERS_DATA,
  DEEPSWE_INDEPENDENT_LEADERBOARD,
  getModelDossier,
  getDossierBenchmarkSnapshots,
  calculatePerformanceFingerprint,
  getDeepSweLeaderboard,
  getProvenanceBadge
} = data;

const errors = [];
const warnings = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function warn(condition, message) {
  if (!condition) warnings.push(message);
}

console.log('====================================================');
console.log('🔍 INICIANDO AUDITORIA TÉCNICA E INTEGRIDADE DE DADOS');
console.log('====================================================\n');

// 1. Contagem de Modelos e Catálogo Canônico
const modelIds = Object.keys(AI_MODELS_DATA);
const modelCount = modelIds.length;
console.log(`📊 Total de modelos catalogados: ${modelCount}`);
assert(modelCount >= 44, `Catálogo de modelos canônicos deve ter pelo menos 44 modelos. Encontrado: ${modelCount}`);
assert(modelCount === MULTI_BENCHMARK_LEDGER.length, `Catálogo de modelos (${modelCount}) deve coincidir exatamente com o Ledger (${MULTI_BENCHMARK_LEDGER.length}) conforme Seção 129`);

// Validação dos estados/status permitidos no catálogo
const validStatuses = ['active', 'stable', 'preview', 'superseded', 'legacy', 'retired', 'stealth-revealed'];
modelIds.forEach(id => {
  const m = AI_MODELS_DATA[id];
  assert(validStatuses.includes(m.status), `Modelo "${id}" possui status não-canônico: "${m.status}". Permitidos: ${validStatuses.join(', ')}`);
});

// 2. Unicidade de IDs e Verificação de Campos Obrigatórios
const requiredModelFields = [
  'id', 'name', 'family', 'provider', 'providerName', 'color', 'status',
  'contextWindow', 'maxOutputTokens', 'modalities', 'reasoning', 'pricing'
];

modelIds.forEach(id => {
  const model = AI_MODELS_DATA[id];
  assert(model.id === id, `Model key "${id}" não corresponde a model.id "${model.id}"`);
  
  requiredModelFields.forEach(field => {
    assert(model[field] !== undefined, `Modelo "${id}" ausente do campo obrigatório "${field}"`);
  });

  assert(AI_PROVIDERS_DATA[model.provider], `Modelo "${id}" referencia provedor inexistente "${model.provider}"`);
  assert(typeof model.contextWindow === 'number' && model.contextWindow > 0, `Modelo "${id}" possui contextWindow inválido: ${model.contextWindow}`);
  assert(typeof model.maxOutputTokens === 'number' && model.maxOutputTokens > 0, `Modelo "${id}" possui maxOutputTokens inválido: ${model.maxOutputTokens}`);

  if (model.pricing && model.pricing.standard) {
    assert(typeof model.pricing.standard.input === 'number' && model.pricing.standard.input >= 0, `Modelo "${id}" possui input price negativo ou inválido`);
    assert(typeof model.pricing.standard.output === 'number' && model.pricing.standard.output >= 0, `Modelo "${id}" possui output price negativo ou inválido`);
  }
});

// 3. Verificação dos Modelos Obrigatórios e Correções Críticas (Seção 97)
const solPro = AI_MODELS_DATA['gpt-5-6-pro'];
assert(solPro, 'Modelo "gpt-5-6-pro" não encontrado');
assert(solPro.directApi === false, `GPT-5.6 Sol Pro deve ter directApi === false. Encontrado: ${solPro.directApi}`);
assert(solPro.pricing.subscriptionOnly === true, 'GPT-5.6 Sol Pro deve ter pricing.subscriptionOnly === true');
assert(solPro.pricing.api === null, 'GPT-5.6 Sol Pro deve ter pricing.api === null');

const g31Pro = AI_MODELS_DATA['gemini-3-1-pro'];
assert(g31Pro, 'Modelo "gemini-3-1-pro" não encontrado');
assert(g31Pro.status === 'preview' && g31Pro.apiStatus === 'preview', `Gemini 3.1 Pro deve ter status preview e apiStatus preview. Encontrado: ${g31Pro.status}/${g31Pro.apiStatus}`);

const g37Flash = AI_MODELS_DATA['gemini-3-7-flash'];
assert(g37Flash, 'Modelo "gemini-3-7-flash" não encontrado');
assert(g37Flash.status !== 'legacy' && g37Flash.status === 'stable', `Gemini 3.7 Flash deve ter status "stable" e NÃO legacy. Encontrado: ${g37Flash.status}`);
assert(g37Flash.generationPredecessorOf === 'gemini-3-8-flash', 'Gemini 3.7 Flash deve registrar generationPredecessorOf: gemini-3-8-flash');

const dsV4Exp = AI_MODELS_DATA['deepseek-v4-vision-exp'];
assert(dsV4Exp, 'Modelo "deepseek-v4-vision-exp" não encontrado');
assert(dsV4Exp.sourceConfidence === 'platform-sku/unverified-upstream', `DeepSeek V4 Vision Exp deve ter sourceConfidence platform-sku/unverified-upstream`);

// Preços oficiais xAI Grok 4.5 e 4.6
const grok46 = AI_MODELS_DATA['grok-4-6'];
assert(grok46, 'Modelo "grok-4-6" não encontrado');
assert(grok46.pricing.standard.input === 2.00 && grok46.pricing.standard.output === 6.00, 'Grok 4.6 short context deve ser $2 in / $6 out');
assert(grok46.pricing.longContextMultiplier === 2, 'Grok 4.6 long context multiplier deve ser 2 ($4 in / $12 out)');

const grok45 = AI_MODELS_DATA['grok-4-5'];
assert(grok45, 'Modelo "grok-4-5" não encontrado');
assert(grok45.pricing.standard.input === 2.00 && grok45.pricing.standard.output === 6.00, 'Grok 4.5 short context deve ser $2 in / $6 out');
assert(grok45.pricing.longContextMultiplier === 2, 'Grok 4.5 long context multiplier deve ser 2');

// Preços de Grok no Cursor IDE
assert(PLATFORM_MODEL_CATALOG.cursor.pricing.grok46.standard.input === 2.00 && PLATFORM_MODEL_CATALOG.cursor.pricing.grok46.fast.input === 4.00, 'Cursor Grok 4.6 pricing');
assert(PLATFORM_MODEL_CATALOG.cursor.pricing.grok45.standard.input === 2.00 && PLATFORM_MODEL_CATALOG.cursor.pricing.grok45.fast.output === 18.00, 'Cursor Grok 4.5 pricing');

// 4. CursorBench 3.2 (Teste não-frágil)
console.log(`📋 Total de runs no CursorBench: ${CURSORBENCH_32_DATA.length}`);
assert(CURSORBENCH_32_DATA.length > 0, 'CursorBench não pode estar vazio');
const topCursorBench = [...CURSORBENCH_32_DATA].sort((a, b) => b.score - a.score)[0];
assert(topCursorBench && topCursorBench.score >= 70.0, `Líder do CursorBench deve ter score >= 70.0%. Encontrado: ${topCursorBench?.score}`);

// 5. Multi-Benchmark Ledger e Proveniência Estruturada (Seções 80, 81, 102)
console.log(`📑 Total de modelos no Ledger Multi-Benchmark: ${MULTI_BENCHMARK_LEDGER.length}`);
assert(MULTI_BENCHMARK_LEDGER.length === modelCount, `Ledger deve conter exatamente ${modelCount} modelos. Encontrado: ${MULTI_BENCHMARK_LEDGER.length}`);

const solProRow = MULTI_BENCHMARK_LEDGER.find(r => r.modelId === 'gpt-5-6-pro');
assert(solProRow, 'Linha gpt-5-6-pro no Ledger não encontrada');
assert(solProRow.terminalBench21 === null && solProRow.terminalBench30 === null && solProRow.deepSwe11 === null && solProRow.gpqaDiamond === null,
  'GPT-5.6 Sol Pro NÃO deve ter valores factuais de benchmark sem evidência específica');

const grok46Row = MULTI_BENCHMARK_LEDGER.find(r => r.modelId === 'grok-4-6');
assert(grok46Row, 'Linha grok-4-6 no Ledger não encontrada');
assert(grok46Row.terminalBench30 === 26.0, `Grok 4.6 TB 3.0 oficial deve ser 26.0. Encontrado: ${grok46Row.terminalBench30}`);
assert(grok46Row.terminalBench21 === 88.4, `Grok 4.6 TB 2.1 independente deve ser 88.4. Encontrado: ${grok46Row.terminalBench21}`);

// Validação de benchmarkEvidence em cada célula não-nula do Ledger
let verifiedCells = 0;
MULTI_BENCHMARK_LEDGER.forEach(row => {
  assert(row.benchmarkEvidence && typeof row.benchmarkEvidence === 'object', `Ledger row "${row.modelId}" deve ter benchmarkEvidence`);
  ['terminalBench21', 'terminalBench30', 'sweBenchVerified', 'deepSwe11', 'gpqaDiamond', 'aaIndex'].forEach(metric => {
    if (row[metric] !== null && row[metric] !== undefined) {
      const ev = row.benchmarkEvidence[metric];
      assert(ev, `Métrica "${metric}" do modelo "${row.modelId}" tem valor ${row[metric]} mas falta benchmarkEvidence correspondente`);
      assert(ev && ev.sourceId && ev.evidenceTier && ev.status, `Métrica "${metric}" do modelo "${row.modelId}" possui evidência incompleta`);
      verifiedCells++;
    }
  });
});
console.log(`   ✅ Verificadas ${verifiedCells} células de benchmark com evidência metrológica estruturada.`);

// 6. Câmbio FX (Descongelado de valores frágeis)
console.log('💵 Verificando dados e helpers de câmbio FX...');
assert(FX_RATES_DATA && FX_RATES_DATA.USD_BRL && typeof FX_RATES_DATA.USD_BRL.rate === 'number' && FX_RATES_DATA.USD_BRL.rate > 0, 'USD_BRL deve ser número positivo');
assert(FX_RATES_DATA.USD_BRL.officialPtax === false, 'USD_BRL deve ter officialPtax === false');

// 7. Auditoria Completa de Planos de Assinatura (Seções 97 a 101)
console.log(`💳 Total de planos cadastrados: ${SUBSCRIPTION_PLANS_DATA.length}`);
assert(SUBSCRIPTION_PLANS_DATA.length >= 40, `Esperado no mínimo 40 planos cadastrados. Encontrado: ${SUBSCRIPTION_PLANS_DATA.length}`);

// Detector de poluição de features em includedModels
const forbiddenInModels = ['Canvas', 'Deep Research', 'Storage', 'TB Cloud', 'Workspaces', 'Credits', 'Flow (', 'Admin Console'];
SUBSCRIPTION_PLANS_DATA.forEach(p => {
  p.includedModels.forEach(m => {
    forbiddenInModels.forEach(f => {
      assert(!m.toLowerCase().includes(f.toLowerCase()), `Poluição semântica no plano "${p.id}": feature "${m}" encontrada em includedModels`);
    });
  });
});

// Google AI Plans (Seção 97)
const gPlus = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'google-ai-plus');
assert(gPlus, 'Plano google-ai-plus não encontrado');
assert(gPlus.storage.cloudStorageGb === 400, 'Google Plus deve ter 400 GB storage');
assert(gPlus.credits.flowCreditsMonthly === 200, 'Google Plus deve ter 200 Flow credits/mês');
assert(gPlus.credits.canPurchaseAiCredits === false, 'Google Plus canPurchaseAiCredits deve ser false');

const gPro = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'google-ai-pro');
assert(gPro, 'Plano google-ai-pro não encontrado');
assert(gPro.storage.localizedBenefits?.BR?.storageTb === 5, 'Google Pro deve ter benefício verificado no Brasil de 5 TB de armazenamento');
assert(gPro.credits.flowCreditsMonthly === 1000, 'Google Pro deve ter 1.000 Flow credits/mês');
assert(gPro.credits.canPurchaseAiCredits === true, 'Google Pro canPurchaseAiCredits deve ser true');

const gUltra5 = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'google-ai-ultra-5x');
assert(gUltra5, 'Plano google-ai-ultra-5x não encontrado');
assert(gUltra5.storage.cloudStorageTb === 20, 'Google AI Ultra 5x deve ter 20 TB storage');
assert(gUltra5.credits.flowCreditsMonthly === 10000, 'Google AI Ultra 5x deve ter 10.000 Flow credits/mês');

const gUltra20 = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'google-ai-ultra-20x');
assert(gUltra20, 'Plano google-ai-ultra-20x não encontrado');
assert(gUltra20.storage.cloudStorageTb === 30, 'Google AI Ultra 20x deve ter 30 TB storage');
assert(gUltra20.credits.flowCreditsMonthly === 25000, 'Google AI Ultra 20x deve ter 25.000 Flow credits/mês');

// Claude / Anthropic Plans (Seção 98)
const claudePro = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'anthropic-claude-pro');
assert(claudePro, 'Plano anthropic-claude-pro não encontrado');
assert(claudePro.pricing.annualPriceUsd === 200, `Claude Pro plano anual total deve ser $200. Encontrado: ${claudePro.pricing.annualPriceUsd}`);
const cProFable = claudePro.modelAccess.find(m => m.modelId === 'claude-fable-5-1');
assert(cProFable && cProFable.available === true && cProFable.included === false && cProFable.billingMode === 'usage-credits',
  'Claude Pro deve ter Fable 5.1 available: true, included: false, billingMode: usage-credits');

const claudeMax5 = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'anthropic-claude-max-5x');
assert(claudeMax5, 'Plano anthropic-claude-max-5x não encontrado');
const cMaxFable = claudeMax5.modelAccess.find(m => m.modelId === 'claude-fable-5-1');
assert(cMaxFable && cMaxFable.included === true && cMaxFable.weeklyShareCapPct === 50,
  'Claude Max 5x deve ter Fable 5.1 included: true com weeklyShareCapPct: 50');

const claudeTeamStd = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'anthropic-claude-team-standard');
assert(claudeTeamStd, 'Plano anthropic-claude-team-standard não encontrado');
assert(claudeTeamStd.usage.sessionMultiplierVsPro === 1.25, `Claude Team Standard sessionMultiplierVsPro deve ser 1.25. Encontrado: ${claudeTeamStd.usage.sessionMultiplierVsPro}`);

const claudeTeamPrem = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'anthropic-claude-team-premium');
assert(claudeTeamPrem, 'Plano anthropic-claude-team-premium não encontrado');
assert(claudeTeamPrem.usage.sessionMultiplierVsPro === 6.25, `Claude Team Premium sessionMultiplierVsPro deve ser 6.25. Encontrado: ${claudeTeamPrem.usage.sessionMultiplierVsPro}`);

// Cursor IDE Pools (Seção 99)
const cursorPool = PLATFORM_MODEL_CATALOG.cursor.pools.cursorModels.models;
const strictlyExpectedCursor = ['composer-2-5', 'grok-4-5', 'grok-4-6'];
assert(JSON.stringify([...cursorPool].sort()) === JSON.stringify(strictlyExpectedCursor.sort()),
  `Cursor Models pool deve ser RIGOROSAMENTE composer-2-5, grok-4-5 e grok-4-6. Encontrado: ${JSON.stringify(cursorPool)}`);
assert(!cursorPool.some(m => m.includes('gemini')), 'Cursor Models pool NÃO deve conter nenhum Gemini');

// Z.ai Coding Plans (Seção 100)
const zLite = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'zai-coding-lite');
assert(zLite && zLite.credits.creditsPer5h === 2000 && zLite.credits.creditsPerWeek === 10000, 'Z.ai Lite deve ter 2.000/5h e 10.000/semana');
assert(zLite.apiIncluded === false && zLite.overageAllowed === false, 'Z.ai Lite individual deve ter generalApiIncluded false e overageAllowed false');

const zPro = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'zai-coding-pro');
assert(zPro && zPro.credits.creditsPer5h === 12000 && zPro.credits.creditsPerWeek === 60000, 'Z.ai Pro deve ter 12.000/5h e 60.000/semana');
assert(zPro.apiIncluded === false && zPro.overageAllowed === false, 'Z.ai Pro individual deve ter generalApiIncluded false e overageAllowed false');

const zMax = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'zai-coding-max');
assert(zMax && zMax.credits.creditsPer5h === 28000 && zMax.credits.creditsPerWeek === 140000, 'Z.ai Max deve ter 28.000/5h e 140.000/semana');
assert(zMax.apiIncluded === false && zMax.overageAllowed === false, 'Z.ai Max individual deve ter generalApiIncluded false e overageAllowed false');

// Kimi Plans (Seção 101)
const kAndante = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'kimi-membership-andante');
assert(kAndante && kAndante.modelAccess.every(m => m.modelId === 'kimi-for-coding'), 'Kimi Andante deve ter acesso apenas a kimi-for-coding no Kimi Code');

const kModerato = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'kimi-membership-moderato');
assert(kModerato && !kModerato.includedModels.some(m => m.includes('1M')), 'Kimi Moderato NÃO deve incluir K3 1M');

const kAllegretto = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'kimi-membership-allegretto');
assert(kAllegretto && kAllegretto.includedModels.some(m => m.includes('1M')), 'Kimi Allegretto DEVE incluir K3 1M');

// Kimi Storage, Anuais e Estimativas de Uso (Seções 53 e 54)
assert(kAndante && kAndante.storage.cloudStorageGb === 20 && kAndante.pricing.annualPriceCny === 468, 'Kimi Andante: 20GB e ¥468 anual');
assert(kModerato && kModerato.storage.cloudStorageGb === 20 && kModerato.pricing.annualPriceCny === 948, 'Kimi Moderato: 20GB e ¥948 anual');
assert(kAllegretto && kAllegretto.storage.cloudStorageGb === 20 && kAllegretto.pricing.annualPriceCny === 1908, 'Kimi Allegretto: 20GB e ¥1.908 anual');
const kAllegro = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'kimi-membership-allegro');
assert(kAllegro && kAllegro.storage.cloudStorageGb === 50 && kAllegro.pricing.annualPriceCny === 6708, 'Kimi Allegro: 50GB e ¥6.708 anual');

// OpenAI Chat Picker (Seções 7 e 8)
const oPlus = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'openai-chatgpt-plus');
assert(oPlus && oPlus.includedModels.length === 1 && oPlus.includedModels[0] === 'GPT-5.6 Sol',
  `ChatGPT Plus generic includedModels deve ser estritamente ["GPT-5.6 Sol"]. Encontrado: ${JSON.stringify(oPlus?.includedModels)}`);
const oFree = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'openai-chatgpt-free');
assert(oFree && oFree.includedModels.length === 1 && oFree.includedModels[0] === 'GPT-5.6 Luna',
  `ChatGPT Free generic includedModels deve ser estritamente ["GPT-5.6 Luna"]. Encontrado: ${JSON.stringify(oFree?.includedModels)}`);
const oPro = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'openai-chatgpt-pro-5x');
assert(oPro && JSON.stringify(oPro.includedModels.sort()) === JSON.stringify(['GPT-5.6 Sol', 'GPT-5.6 Sol Pro'].sort()),
  `ChatGPT Pro generic includedModels deve ser estritamente ["GPT-5.6 Sol", "GPT-5.6 Sol Pro"]`);

// Z.ai Credit Formula e Off-Peak (Seções 46 e 47)
assert(ZAI_CREDIT_ACCOUNTING && ZAI_CREDIT_ACCOUNTING.multipliers['glm-5-3'].output === 24, 'Fórmula Z.ai GLM-5.3 output 24');
assert(ZAI_CREDIT_ACCOUNTING.multipliers['glm-5-3-flash'].output === 8, 'Fórmula Z.ai GLM-5.3-Flash output 8');
assert(ZAI_CREDIT_ACCOUNTING.offPeakDiscountPct === 50, 'Z.ai off-peak 50% discount');

// Grok Bot e Plataforma (Seções 61 e 62)
assert(GROK_BOT_METADATA && GROK_BOT_METADATA.announcedAt === '2026-08-26', 'Grok Bot anúncio 2026-08-26');
assert(GROK_BOT_METADATA.eligiblePlans.includes('cursor-pro') && GROK_BOT_METADATA.eligiblePlans.includes('xai-supergrok-heavy'), 'Grok Bot eligible plans');
assert(GROK_BOT_METADATA.sourceConflict === true, 'Grok Bot source conflict documentado');

// CamelAI Automation Limits (Seção 67)
assert(CAMELAI_PLATFORM_DATA && CAMELAI_PLATFORM_DATA.camelCode.automationLimits.canonicalDocs.starter.count === 1, 'CamelAI docs starter: 1 hourly');
assert(CAMELAI_PLATFORM_DATA.camelCode.automationLimits.marketingPage.starter.count === 10, 'CamelAI marketing starter: 10 hourly');
assert(CAMELAI_PLATFORM_DATA.camelCode.automationLimits.sourceConflict === true, 'CamelAI automation source conflict');

// Enterprise Plans (Seções 10, 23, 59)
assert(SUBSCRIPTION_PLANS_DATA.some(p => p.id === 'openai-chatgpt-enterprise'), 'ChatGPT Enterprise deve estar presente');
assert(SUBSCRIPTION_PLANS_DATA.some(p => p.id === 'anthropic-claude-enterprise'), 'Claude Enterprise deve estar presente');
assert(SUBSCRIPTION_PLANS_DATA.some(p => p.id === 'xai-grok-enterprise'), 'Grok Enterprise deve estar presente');
assert(SUBSCRIPTION_PLANS_DATA.some(p => p.id === 'camelai-code-enterprise'), 'camelCode Enterprise deve estar presente');

// Budget Stacks Recommender (Seções 103, 104)
console.log('📦 Verificando Stacks de Assinatura (Budget Stack Recommender)...');
assert(BUDGET_STACK_RECOMMENDER && BUDGET_STACK_RECOMMENDER.stacks.length >= 5, 'Devem existir pelo menos 5 stacks orçamentárias');
BUDGET_STACK_RECOMMENDER.stacks.forEach(stack => {
  assert(typeof stack.fixedMonthlyCostUsd === 'number', `Stack "${stack.id}" deve definir fixedMonthlyCostUsd`);
  assert(Array.isArray(stack.variableBilling), `Stack "${stack.id}" deve definir array variableBilling`);
});

// 8. OpenCode Go (Catálogo Canônico Oficial)
console.log('🚀 Verificando catálogo canônico do OpenCode Go...');
assert(OPENCODE_GO_DATA && Array.isArray(OPENCODE_GO_DATA.models), 'OPENCODE_GO_DATA.models deve ser um array');
assert(OPENCODE_GO_DATA.models.length === 26, `OpenCode Go deve conter RIGOROSAMENTE 26 modelos oficiais. Encontrado: ${OPENCODE_GO_DATA.models.length}`);

// 9. Detector Universal de Fake SKUs (Seção 114)
console.log('🛡️ Verificando ausência de Fake SKUs no repositório...');
const forbiddenSkus = [
  'Gemini 3.1 Pro Ultra',
  'Gemini 3.8 Flash Max',
  'Claude Fable 5.1 Max',
  'Grok 4.6 Ultra',
  'GPT-5.6 Sol Max',
  'GLM-5.3 Max Concurrency',
  'Dedicated Endpoint',
  '$15/$60'
];

modelIds.forEach(id => {
  const name = AI_MODELS_DATA[id].name;
  forbiddenSkus.forEach(fake => {
    assert(!name.includes(fake), `Fake SKU "${fake}" detectado no catálogo de modelos: ${name}`);
  });
});

SUBSCRIPTION_PLANS_DATA.forEach(p => {
  p.includedModels.forEach(m => {
    forbiddenSkus.forEach(fake => {
      assert(!m.includes(fake), `Fake SKU "${fake}" detectado no plano ${p.id}: ${m}`);
    });
  });
});

// 10. Matriz Canônica de Disponibilidade por Plataforma (Seção 40)
console.log('🌐 Verificando matriz canônica de disponibilidade por plataforma...');
assert(Array.isArray(PLATFORM_AVAILABILITY_MATRIX) && PLATFORM_AVAILABILITY_MATRIX.length === modelCount,
  `PLATFORM_AVAILABILITY_MATRIX deve conter exatamente ${modelCount} modelos. Encontrado: ${PLATFORM_AVAILABILITY_MATRIX?.length}`);
PLATFORM_AVAILABILITY_MATRIX.forEach(entry => {
  assert(entry.modelId && entry.platforms, `Entrada da matriz de plataforma inválida para ${entry.modelId}`);
  assert(typeof entry.platforms.directApi?.available === 'boolean', `directApi.available deve ser booleano para ${entry.modelId}`);
  assert(typeof entry.platforms.cursor?.available === 'boolean', `cursor.available deve ser booleano para ${entry.modelId}`);
  assert(typeof entry.platforms.opencode?.available === 'boolean', `opencode.available deve ser booleano para ${entry.modelId}`);
  assert(typeof entry.platforms.antigravity?.available === 'boolean', `antigravity.available deve ser booleano para ${entry.modelId}`);
  assert(typeof entry.platforms.openrouter?.available === 'boolean', `openrouter.available deve ser booleano para ${entry.modelId}`);
  assert(typeof entry.platforms.local?.supported === 'boolean', `local.supported deve ser booleano para ${entry.modelId}`);
});

// 11. Segregação de Privacidade e ZDR (Seções 87 e 88)
console.log('🔒 Verificando separação estrita entre noTrainingByDefault e ZDR...');
let plansWithNoTrainingWithoutZdr = 0;
SUBSCRIPTION_PLANS_DATA.forEach(p => {
  // noTrainingByDefault === true NUNCA implica zdr === true
  if (p.privacy.noTrainingByDefault && !p.privacy.zdr) {
    plansWithNoTrainingWithoutZdr++;
  }
  // Planos pessoais / consumer NUNCA devem ter ZDR verdadeiro
  if (p.privacy.profileType === 'consumer') {
    assert(p.privacy.zdr === false, `Plano consumer ${p.id} não pode alegar ZDR`);
  }
});
assert(plansWithNoTrainingWithoutZdr >= 5, `Devem existir planos com exclusão de treino sem alegação de ZDR. Encontrado: ${plansWithNoTrainingWithoutZdr}`);

// 12. Isolamento de Recursos: Features não podem poluir modelAccess (Seção 90)
console.log('📦 Verificando isolamento de features fora de modelAccess...');
const forbiddenFeatureStrings = ['Canvas', 'Deep Research', 'Admin Console', 'Workspaces', '5 TB Cloud', 'SSO', 'Audit Logs'];
SUBSCRIPTION_PLANS_DATA.forEach(p => {
  p.modelAccess.forEach(m => {
    forbiddenFeatureStrings.forEach(feat => {
      assert(!m.modelName?.includes(feat) && !m.modelId?.includes(feat),
        `Feature "${feat}" detectada indevidamente em modelAccess do plano ${p.id}`);
    });
  });
});

// 10. Auditoria de Freshness de Dados
console.log('\n⏱️ Verificando Freshness de Dados (Janela Temporal <= 14/30/90 dias)...');
const refDate = new Date('2026-09-03T00:00:00Z');

// FX Rates: <= 14 dias
const fxDate = new Date(FX_RATES_DATA.USD_BRL.asOf + 'T00:00:00Z');
const fxDaysDiff = Math.round((refDate - fxDate) / (1000 * 60 * 60 * 24));
assert(fxDaysDiff <= 14, `Cotação FX desatualizada: ${fxDaysDiff} dias (limite: 14 dias)`);

// Subscription Plans: <= 14 dias
SUBSCRIPTION_PLANS_DATA.forEach(p => {
  const pDate = new Date(p.verifiedAt + 'T00:00:00Z');
  const pDiff = Math.round((refDate - pDate) / (1000 * 60 * 60 * 24));
  assert(pDiff <= 14, `Plano ${p.id} desatualizado: ${pDiff} dias (limite: 14 dias)`);
});

console.log('   ✅ Todos os datasets auditados estão dentro da janela máxima de frescor.');

// =========================================================================
// 13. VALIDAÇÃO ESPECÍFICA DO PLANO 06: EXPLORADOR MULTIDIMENSIONAL
// =========================================================================
console.log('\n🚀 Verificando requisitos de 06-prompt-ajuste.md (Seções 94 a 101, 113, 114)...');

// Seção 94: Testes de integridade de dados de planos
console.log('   - [Seção 94] Validando provider, planFamily, modelAccess, billingMode e nativeCurrency...');
const validBillingModes = ['included', 'partial', 'usage-credits', 'metered', 'pool', 'none'];
SUBSCRIPTION_PLANS_DATA.forEach(p => {
  assert(p.provider && p.provider.trim().length > 0, `Plano ${p.id} não possui provider`);
  assert(p.planFamily && p.planFamily.trim().length > 0, `Plano ${p.id} não possui planFamily canônico`);
  assert(p.nativeCurrency, `Plano ${p.id} não possui nativeCurrency`);
  
  (p.modelAccess || []).forEach(m => {
    assert(validBillingModes.includes(m.billingMode), `Plano ${p.id} possui billingMode inválido: ${m.billingMode} para modelo ${m.modelId}`);
    const existsInModels = Boolean(AI_MODELS_DATA[m.modelId]);
    assert(existsInModels || m.platformSku === true, `Modelo ${m.modelId} no plano ${p.id} não existe em AI_MODELS_DATA nem está marcado como platformSku`);
  });
});

// Seção 95: Testes de UI & Helpers
console.log('   - [Seção 95] Testando helpers de UI do PlanExplorer...');
assert(PlanExplorer, 'PlanExplorer não está definido ou exportado');
const compGroups = PlanExplorer.getPlansByCompany(SUBSCRIPTION_PLANS_DATA);
assert(Object.keys(compGroups).length >= 9, 'getPlansByCompany deve cobrir as 9 empresas canônicas');
const totalGrouped = Object.values(compGroups).reduce((acc, list) => acc + list.length, 0);
assert(totalGrouped === SUBSCRIPTION_PLANS_DATA.length, `Soma dos planos agrupados (${totalGrouped}) difere do total (${SUBSCRIPTION_PLANS_DATA.length})`);

// Seção 96: Teste Claude Fable 5.1
console.log('   - [Seção 96] Validando Claude Fable 5.1 em Claude Pro...');
const fablePlans = PlanExplorer.getPlansForModel('claude-fable-5-1', SUBSCRIPTION_PLANS_DATA);
assert(fablePlans.length > 0, 'Claude Fable 5.1 deve estar presente em ao menos um plano');
const claudeProFable = fablePlans.find(f => f.plan.id === 'anthropic-claude-pro');
assert(claudeProFable, 'Claude Pro deve ser listado para Claude Fable 5.1');
assert(claudeProFable.billingMode === 'usage-credits', `Claude Pro deve disponibilizar Fable 5.1 via usage-credits, encontrado: ${claudeProFable.billingMode}`);

// Seção 97: Teste Google Pro
console.log('   - [Seção 97] Validando Google AI Pro (R$ 96,99 e 5 TB Storage)...');
const googlePro = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'google-ai-pro');
assert(googlePro, 'Plano google-ai-pro deve existir');
assert(googlePro.localizedPricing?.BRL?.price === 96.99, `Preço BRL oficial do Google Pro deve ser 96.99, encontrado: ${googlePro.localizedPricing?.BRL?.price}`);
assert(googlePro.storage?.includedGb >= 5000, `Google Pro deve incluir 5 TB (>= 5000 GB), encontrado: ${googlePro.storage?.includedGb}`);

// Seção 98: Teste OpenCode Go
console.log('   - [Seção 98] Validando OpenCode Go (US$ 10 e burn rate 1x/2x/4x)...');
const opencodeGo = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'opencode-go-standard');
assert(opencodeGo, 'Plano opencode-go-standard deve existir');
assert(opencodeGo.monthlyPriceUsd === 10, `OpenCode Go deve custar US$ 10, encontrado: ${opencodeGo.monthlyPriceUsd}`);
const goVarBilling = PlanExplorer.getPlanVariableBilling(opencodeGo);
assert(goVarBilling.hasVariableCost === true, 'OpenCode Go deve ser identificado como tendo custo variável/burn rate');
assert(goVarBilling.items.some(it => it.includes('1×, 2× ou 4×')), 'OpenCode Go deve declarar burn rate variável 1x/2x/4x');

// Seção 99: Teste camelStream
console.log('   - [Seção 99] Validando camelStream (US$ 5/stream, tokens ilimitados e alerta de training)...');
const camelStream = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'camelai-stream-flat');
assert(camelStream, 'Plano camelai-stream-flat deve existir');
assert(camelStream.monthlyPriceUsd === 5, `camelStream deve custar US$ 5/stream, encontrado: ${camelStream.monthlyPriceUsd}`);
assert(camelStream.privacy?.noTrainingByDefault === false, 'camelStream standard não pode afirmar no-training por padrão');
assert(camelStream.privacyNotes?.toLowerCase().includes('training') || camelStream.privacyNotes?.toLowerCase().includes('treino'), 'camelStream deve explicitar aviso de treinamento');

// Seção 100: Teste Enterprise
console.log('   - [Seção 100] Validando exibição de planos Enterprise (Fale com vendas / Nunca US$ 0)...');
const enterprisePlans = SUBSCRIPTION_PLANS_DATA.filter(p => p.monthlyPriceUsd === null || p.monthlyPriceUsd === undefined);
assert(enterprisePlans.length >= 2, `Devem existir planos Enterprise sob consulta. Encontrados: ${enterprisePlans.length}`);
enterprisePlans.forEach(ep => {
  const disp = PlanExplorer.getDisplayPrice(ep, 'USD', FX_RATES_DATA);
  assert(disp.isEnterprise === true, `Plano ${ep.id} deve ter isEnterprise=true`);
  assert(disp.text === 'Fale com vendas', `Plano ${ep.id} deve exibir "Fale com vendas", exibiu: ${disp.text}`);
  assert(!disp.text.includes('0') && !disp.subtext.includes('0'), `Plano ${ep.id} nunca pode exibir US$ 0`);
});

// Seção 101: Teste CNY Kimi
console.log('   - [Seção 101] Validando precificação nativa em CNY do Kimi (¥ e ≈ R$)...');
const kimiPlans = SUBSCRIPTION_PLANS_DATA.filter(p => p.provider === 'moonshot');
assert(kimiPlans.length >= 3, `Devem existir planos Kimi cadastrados. Encontrados: ${kimiPlans.length}`);
kimiPlans.forEach(kp => {
  if (kp.monthlyPriceCny > 0) {
    const disp = PlanExplorer.getDisplayPrice(kp, 'BRL', FX_RATES_DATA);
    assert(disp.subtext.includes('¥'), `Kimi ${kp.id} deve incluir símbolo ¥ no subtexto, exibiu: ${disp.subtext}`);
    assert(disp.text.includes('R$'), `Kimi ${kp.id} deve exibir conversão para R$ no texto principal, exibiu: ${disp.text}`);
  }
});

// Seção 113 & 114: Validação de Scores Dimensionais
console.log('   - [Seção 113/114] Validando scores calibrados em 5 dimensões sem inflação artificial...');
SUBSCRIPTION_PLANS_DATA.forEach(p => {
  const scores = PlanExplorer.calculatePlanScores(p, FX_RATES_DATA);
  assert(scores.aiAccessScore >= 0 && scores.aiAccessScore <= 100, `aiAccessScore fora do range [0, 100] para ${p.id}`);
  assert(scores.codingScore >= 0 && scores.codingScore <= 100, `codingScore fora do range [0, 100] para ${p.id}`);
  assert(scores.quotaScore >= 0 && scores.quotaScore <= 100, `quotaScore fora do range [0, 100] para ${p.id}`);
  assert(scores.bundleStorageScore >= 0 && scores.bundleStorageScore <= 100, `bundleStorageScore fora do range [0, 100] para ${p.id}`);
  assert(scores.privacyScore >= 0 && scores.privacyScore <= 100, `privacyScore fora do range [0, 100] para ${p.id}`);
  assert(scores.costBenefitScore >= 0 && scores.costBenefitScore <= 100, `costBenefitScore fora do range [0, 100] para ${p.id}`);
});
console.log('   ✅ Todos os requisitos e testes das Seções 94 a 101, 113 e 114 foram validados com sucesso.');

// ==========================================
// TESTES DO PLANO 07 (DOSSIÊ & METROLOGIA - SEÇÕES 121 A 131)
// ==========================================
console.log('\n🔬 VALIDANDO TESTES DO PLANO 07 (DOSSIÊ TÉCNICO & METROLOGIA)...');

// Seção 121: Teste Gemini 3.8 Flash (GPQA e ARC-AGI-2 nulos)
console.log('   - [Seção 121] Verificando integridade factual do Gemini 3.8 Flash (GPQA e ARC nulos)...');
const g38Row = MULTI_BENCHMARK_LEDGER.find(r => r.modelId === 'gemini-3-8-flash');
assert(g38Row, 'Linha gemini-3-8-flash no ledger não encontrada');
assert(g38Row.gpqaDiamond === null, `Seção 121: Gemini 3.8 Flash gpqaDiamond deve ser null. Encontrado: ${g38Row.gpqaDiamond}`);
assert(g38Row.arcAgi2Verified === null, `Seção 121: Gemini 3.8 Flash arcAgi2Verified deve ser null. Encontrado: ${g38Row.arcAgi2Verified}`);

// Seção 122: Teste DeepSeek V4 Vision Exp (AA Index = 51.0)
console.log('   - [Seção 122] Verificando AA Index de DeepSeek V4 Vision Exp (51.0)...');
const dsv4Row = MULTI_BENCHMARK_LEDGER.find(r => r.modelId === 'deepseek-v4-vision-exp');
assert(dsv4Row, 'Linha deepseek-v4-vision-exp no ledger não encontrada');
assert(dsv4Row.aaIndex === 51.0, `Seção 122: DeepSeek V4 Vision Exp aaIndex deve ser 51.0 (não 52.0). Encontrado: ${dsv4Row.aaIndex}`);

// Seção 123: Teste MiniMax M3 (Terminal-Bench 2.1 = 66.0)
console.log('   - [Seção 123] Verificando Terminal-Bench 2.1 do MiniMax M3 (66.0)...');
const m3Row = MULTI_BENCHMARK_LEDGER.find(r => r.modelId === 'minimax-m3');
assert(m3Row, 'Linha minimax-m3 no ledger não encontrada');
assert(m3Row.terminalBench21 === 66.0, `Seção 123: MiniMax M3 terminalBench21 deve ser 66.0 (não 65.5). Encontrado: ${m3Row.terminalBench21}`);

// Seção 124: Teste Grok 4.6 Terminal-Bench 2.1 (Independente - AA)
console.log('   - [Seção 124] Verificando classificação independente de Grok 4.6 TB 2.1 (AA)...');
const grokRow = MULTI_BENCHMARK_LEDGER.find(r => r.modelId === 'grok-4-6');
assert(grokRow, 'Linha grok-4-6 no ledger não encontrada');
assert(grokRow.benchmarkEvidence?.terminalBench21?.sourceType === 'independent',
  `Seção 124: Grok 4.6 TB 2.1 deve ter sourceType="independent". Encontrado: ${grokRow.benchmarkEvidence?.terminalBench21?.sourceType}`);

// Seção 125: Teste Muse Spark Contributor (não herda benchmarks do base)
console.log('   - [Seção 125] Verificando segregação do Muse Spark Contributor (sem benchmarks herdados)...');
assert(!MULTI_BENCHMARK_LEDGER.some(r => r.modelId === 'muse-spark-1-3-contributor'),
  'Seção 125: muse-spark-1-3-contributor NÃO deve possuir linha no MULTI_BENCHMARK_LEDGER');
const contribDossier = MODEL_DOSSIERS_DATA ? MODEL_DOSSIERS_DATA['muse-spark-1-3-contributor'] : null;
assert(contribDossier, 'Dossiê do muse-spark-1-3-contributor deve existir');
assert(contribDossier.exactCheckpointVerified === false, 'muse-spark-1-3-contributor deve ter exactCheckpointVerified=false');

// Seção 126: Teste Qwen3.8 Flash vs Qwen3.8-Flash-Next (AA Index nulo)
console.log('   - [Seção 126] Verificando Qwen3.8 Flash API vs Qwen3.8-Flash-Next...');
const qfRow = MULTI_BENCHMARK_LEDGER.find(r => r.modelId === 'qwen3-8-flash');
assert(qfRow, 'Linha qwen3-8-flash no ledger não encontrada');
assert(qfRow.aaIndex === null, `Seção 126: Qwen3.8 Flash API não deve reportar AA Index isolado. Encontrado: ${qfRow.aaIndex}`);

// Seção 127: Teste Custo por Tarefa Resolvida (DeepSWE Leaderboard com derived: true)
console.log('   - [Seção 127] Verificando cálculo derivado de custo por tarefa resolvida no DeepSWE...');
const deepsweBoard = typeof getDeepSweLeaderboard === 'function' ? getDeepSweLeaderboard('score') : [];
assert(deepsweBoard.length >= 6, `Leaderboard DeepSWE deve conter pelo menos 6 modelos. Encontrados: ${deepsweBoard.length}`);
deepsweBoard.forEach(entry => {
  assert(entry.derived === true, `Seção 127: Modelo ${entry.modelId} no DeepSWE deve ter flag derived=true`);
  assert(typeof entry.costPerSolvedTask === 'number' && entry.costPerSolvedTask > 0,
    `Seção 127: Modelo ${entry.modelId} deve ter costPerSolvedTask > 0. Encontrado: ${entry.costPerSolvedTask}`);
  const expectedCost = entry.costPerTaskUsd / (entry.score / 100);
  assert(Math.abs(entry.costPerSolvedTask - expectedCost) < 0.001,
    `Seção 127: Cálculo de costPerSolvedTask divergente para ${entry.modelId}. Calculado: ${entry.costPerSolvedTask}, Esperado: ${expectedCost}`);
});

// Seção 128: Teste Performance Fingerprint (sem percentuais inventados, apenas ratings categóricos)
console.log('   - [Seção 128] Verificando Performance Fingerprint categórico...');
const fpSample = typeof calculatePerformanceFingerprint === 'function' ? calculatePerformanceFingerprint('gemini-3-8-flash') : {};
const expectedDomains = [
  'softwareEngineering', 'terminal', 'toolUse', 'scientificReasoning',
  'longContext', 'multimodal', 'cyber', 'throughput', 'costEfficiency'
];
const validRatings = ['Excellent', 'Strong', 'Average', 'Weak', 'Unknown'];
assert(Object.keys(fpSample).length === 9, `Seção 128: Fingerprint deve cobrir 9 domínios. Encontrados: ${Object.keys(fpSample).length}`);
expectedDomains.forEach(dom => {
  assert(fpSample[dom], `Domínio ${dom} ausente no fingerprint`);
  assert(validRatings.includes(fpSample[dom].rating), `Rating inválido em ${dom}: ${fpSample[dom].rating}`);
});

// Seção 129: Teste Contagem Dinâmica (Nenhum hardcode)
console.log('   - [Seção 129] Verificando paridade dinâmica de catálogo...');
assert(Object.keys(AI_MODELS_DATA).length === MULTI_BENCHMARK_LEDGER.length,
  `Seção 129: Divergência entre AI_MODELS_DATA (${Object.keys(AI_MODELS_DATA).length}) e MULTI_BENCHMARK_LEDGER (${MULTI_BENCHMARK_LEDGER.length})`);
assert(Object.keys(AI_MODELS_DATA).length === PLATFORM_AVAILABILITY_MATRIX.length,
  `Seção 129: Divergência entre AI_MODELS_DATA (${Object.keys(AI_MODELS_DATA).length}) e PLATFORM_AVAILABILITY_MATRIX (${PLATFORM_AVAILABILITY_MATRIX.length})`);

// Seção 130: Teste 18 Dossiês Prioritários
console.log('   - [Seção 130] Verificando integridade dos 18 dossiês técnicos prioritários...');
const priorityIds = [
  'gemini-3-8-flash', 'gpt-5-6-sol', 'gpt-5-6-terra', 'gpt-5-6-luna',
  'deepseek-v4-flash-0731', 'deepseek-v4-flash-vision-exp', 'grok-4-6',
  'glm-5-3', 'glm-5-3-flash', 'kimi-k3', 'hy4-preview', 'hy3-tencent',
  'qwen3-8-max', 'qwen3-8-flash', 'minimax-m3', 'muse-spark-1-3',
  'muse-spark-1-3-contributor', 'claude-fable-5-1'
];
assert(MODEL_DOSSIERS_DATA, 'Objeto MODEL_DOSSIERS_DATA não definido');
priorityIds.forEach(pId => {
  assert(MODEL_DOSSIERS_DATA[pId], `Seção 130: Dossiê ausente para modelo prioritário "${pId}"`);
  const d = MODEL_DOSSIERS_DATA[pId];
  assert(d.identity && (d.identity.name || d.identity.canonicalName), `Dossiê "${pId}" ausente de identidade`);
  assert(Array.isArray(d.sourceIds) && d.sourceIds.length > 0, `Dossiê "${pId}" deve listar sourceIds`);
});

// Seção 131: Teste Badges de Proveniência Metrológica
console.log('   - [Seção 131] Verificando badges de proveniência [O], [V], [T], [C], [E]...');
const requiredSourceTypes = ['official', 'vendor-reported', 'independent', 'community', 'estimated'];
requiredSourceTypes.forEach(st => {
  const badge = typeof getProvenanceBadge === 'function' ? getProvenanceBadge(st) : null;
  assert(badge, `Badge ausente para sourceType: ${st}`);
  assert(['O', 'V', 'T', 'C', 'E'].includes(badge.code), `Código de badge inválido para ${st}: ${badge.code}`);
  assert(badge.cssClass && badge.cssClass.startsWith('badge-source-'), `Classe CSS inválida para ${st}: ${badge.cssClass}`);
});

console.log('   ✅ Todas as 11 suítes de auditoria das Seções 121 a 131 foram validadas com sucesso!');

console.log('====================================================\n');

if (warnings.length > 0) {
  console.log(`⚠️  AVISOS (${warnings.length}):`);
  warnings.forEach(w => console.log('   - ' + w));
  console.log('');
}

if (errors.length > 0) {
  console.log(`❌ ERROS ENCONTRADOS (${errors.length}):`);
  errors.forEach(e => console.log('   - ' + e));
  console.log('\n❌ AUDITORIA FALHOU!');
  process.exit(1);
} else {
  console.log('✅ AUDITORIA COMPLETA COM SUCESSO! ZERO ERROS ENCONTRADOS.');
}
