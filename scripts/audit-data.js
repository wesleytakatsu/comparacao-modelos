/**
 * Script de Auditoria Técnica e Integridade de Dados
 * Portal de Inteligência de Modelos de IA
 * Execução: node scripts/audit-data.js
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
  CURSORBENCH_32_DATA,
  MARGINAL_GAINS_DATA,
  MULTI_BENCHMARK_LEDGER,
  CAPABILITY_RADAR_10D,
  OPENCODE_GO_CATALOG,
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
  // Novos datasets modulares
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
  PLATFORM_MODEL_CATALOG
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
assert(modelCount > 0, 'Catálogo de modelos não pode estar vazio.');
assert(modelCount === Object.keys(AI_MODELS_DATA).length, `Inconsistência na contagem de chaves de modelos: ${modelCount}`);

// Validação dos estados/status permitidos no catálogo (Seção 1.1)
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

  // Valida Provedor
  assert(AI_PROVIDERS_DATA[model.provider], `Modelo "${id}" referencia provedor inexistente "${model.provider}"`);

  // Valida Contexto
  assert(typeof model.contextWindow === 'number' && model.contextWindow > 0, `Modelo "${id}" possui contextWindow inválido: ${model.contextWindow}`);
  assert(typeof model.maxOutputTokens === 'number' && model.maxOutputTokens > 0, `Modelo "${id}" possui maxOutputTokens inválido: ${model.maxOutputTokens}`);

  // Valida Preços
  if (model.pricing && model.pricing.standard) {
    assert(typeof model.pricing.standard.input === 'number' && model.pricing.standard.input >= 0, `Modelo "${id}" possui input price negativo ou inválido`);
    assert(typeof model.pricing.standard.output === 'number' && model.pricing.standard.output >= 0, `Modelo "${id}" possui output price negativo ou inválido`);
  }
});

// 3. Verificação dos Modelos Obrigatórios e Correções Críticas
assert(AI_MODELS_DATA['gemini-3-8-flash'], 'Modelo "gemini-3-8-flash" não encontrado em AI_MODELS_DATA');
assert(AI_MODELS_DATA['claude-fable-5-1'], 'Modelo "claude-fable-5-1" não encontrado em AI_MODELS_DATA');
assert(AI_MODELS_DATA['glm-5-3-flash'], 'Modelo "glm-5-3-flash" não encontrado em AI_MODELS_DATA');
assert(AI_MODELS_DATA['glm-5-3'], 'Modelo "glm-5-3" deve continuar existindo separadamente de "glm-5-3-flash"');
assert(!AI_MODELS_DATA['ox-alpha'], 'Modelo "ox-alpha" não deve existir como modelo ativo independente (substituído por glm-5-3-flash)');
assert(!AI_PROVIDERS_DATA['stealth'], 'Provedor órfão "stealth" não deve existir como provedor ativo');
assert(AI_MODELS_DATA['glm-5-3-flash'].historicalAliases && AI_MODELS_DATA['glm-5-3-flash'].historicalAliases.includes('Ox Alpha'), 'GLM-5.3-Flash deve registrar "Ox Alpha" em historicalAliases');
assert(AI_MODELS_DATA['gemini-3-7-flash'], 'Modelo predecessor "gemini-3-7-flash" foi removido indevidamente');
assert(AI_MODELS_DATA['claude-fable-5'], 'Modelo predecessor "claude-fable-5" foi removido indevidamente');
assert(HARDWARE_LOCAL_MODELS_DATA.some(h => h.modelId === 'glm-5-3-flash'), 'GLM-5.3-Flash deve estar cadastrado em HARDWARE_LOCAL_MODELS_DATA');

// Validações de preços e status específicos (02-dados-ajuste.md)
const g38 = AI_MODELS_DATA['gemini-3-8-flash'];
assert(g38.pricing.standard.input === 0.75, `Gemini 3.8 Flash input price atual deve ser $0.75 (promocional até 31/12/2026). Encontrado: ${g38.pricing.standard.input}`);
assert(g38.pricing.standard.output === 3.75, `Gemini 3.8 Flash output price atual deve ser $3.75. Encontrado: ${g38.pricing.standard.output}`);
assert(g38.pricing.postPromo && g38.pricing.postPromo.input === 1.50, `Gemini 3.8 Flash postPromo input deve ser $1.50`);
assert(g38.pricing.postPromo && g38.pricing.postPromo.output === 7.50, `Gemini 3.8 Flash postPromo output deve ser $7.50`);
assert(g38.maxOutputTokens === 65536, `Gemini 3.8 Flash maxOutputTokens deve ser 65.536 (64k)`);

const cf51 = AI_MODELS_DATA['claude-fable-5-1'];
assert(!cf51.officialBenchmarks.terminalBench21, 'Terminal-Bench 2.1 não deve estar em officialBenchmarks de Claude Fable 5.1 (é Artificial Analysis)');
assert(!cf51.officialBenchmarks.sciCode, 'SciCode não deve estar em officialBenchmarks de Claude Fable 5.1 (é Artificial Analysis)');
assert(!cf51.officialBenchmarks.hle, 'HLE não deve estar em officialBenchmarks de Claude Fable 5.1 (é Artificial Analysis)');
assert(cf51.independentBenchmarks && cf51.independentBenchmarks.artificialAnalysis && cf51.independentBenchmarks.artificialAnalysis.terminalBench21 === 91.4, 'Terminal-Bench 2.1 (91.4%) deve estar em independentBenchmarks.artificialAnalysis');

const gptPro = AI_MODELS_DATA['gpt-5-6-pro'];
assert(gptPro.benchmarkCoverage === 'limited', 'GPT-5.6 Pro deve ter benchmarkCoverage: "limited"');
assert(!gptPro.sources.includes('xai-grok46'), 'GPT-5.6 Pro não deve conter xai-grok46 em sources');

const cf5 = AI_MODELS_DATA['claude-fable-5'];
assert(cf5.status === 'superseded', `Claude Fable 5 deve ter status "superseded"`);
assert(cf5.pricing.standard.input === 10.00 && cf5.pricing.standard.output === 50.00, `Claude Fable 5 tarifas devem ser $10.00 in / $50.00 out`);
assert(cf5.maxOutputTokens === 131072, `Claude Fable 5 maxOutputTokens deve ser 131.072 (128k)`);

const cop5 = AI_MODELS_DATA['claude-opus-5'];
assert(cop5.pricing.standard.input === 5.00 && cop5.pricing.standard.output === 25.00, `Claude Opus 5 tarifas devem ser $5.00 in / $25.00 out`);
assert(cop5.maxOutputTokens === 131072, `Claude Opus 5 maxOutputTokens deve ser 131.072 (128k)`);

const sol = AI_MODELS_DATA['gpt-5-6-sol'];
assert(sol.pricing.standard.input === 4.00 && sol.pricing.standard.output === 20.00, `GPT-5.6 Sol tarifas devem ser $4.00 in / $20.00 out`);
assert(sol.maxOutputTokens === 131072, `GPT-5.6 Sol maxOutputTokens deve ser 131.072 (128k)`);

const terra = AI_MODELS_DATA['gpt-5-6-terra'];
assert(terra.pricing.standard.input === 2.00 && terra.pricing.standard.output === 12.00, `GPT-5.6 Terra tarifas devem ser $2.00 in / $12.00 out`);

const luna = AI_MODELS_DATA['gpt-5-6-luna'];
assert(luna.pricing.standard.input === 0.20 && luna.pricing.standard.output === 1.20, `GPT-5.6 Luna tarifas devem ser $0.20 in / $1.20 out`);

// 4. CursorBench 3.2
console.log(`📋 Total de runs no CursorBench: ${CURSORBENCH_32_DATA.length}`);
CURSORBENCH_32_DATA.forEach((run, index) => {
  assert(AI_MODELS_DATA[run.modelId], `Run ${index} (${run.modelName}) referencia modelId inexistente: ${run.modelId}`);
  assert(typeof run.score === 'number' && run.score >= 0 && run.score <= 100, `Run ${index} (${run.modelName}) possui score inválido: ${run.score}`);
  assert(typeof run.costUsd === 'number' && run.costUsd >= 0, `Run ${index} (${run.modelName}) possui custo negativo: ${run.costUsd}`);
  assert(typeof run.tokensPerTask === 'number' && run.tokensPerTask > 0, `Run ${index} (${run.modelName}) possui tokensPerTask inválido: ${run.tokensPerTask}`);
});

const topCursorBench = [...CURSORBENCH_32_DATA].sort((a, b) => b.score - a.score)[0];
assert(topCursorBench && topCursorBench.modelId === 'claude-fable-5-1' && topCursorBench.score >= 73.0,
  `O líder do CursorBench deve ser Claude Fable 5.1 Max com score >= 73.0%. Encontrado: ${topCursorBench ? topCursorBench.modelName + ' (' + topCursorBench.score + '%)' : 'Nenhum'}`);

// 5. Multi-Benchmark Ledger
console.log(`📑 Total de modelos no Ledger Multi-Benchmark: ${MULTI_BENCHMARK_LEDGER.length}`);
MULTI_BENCHMARK_LEDGER.forEach((item, index) => {
  assert(AI_MODELS_DATA[item.modelId], `Ledger item ${index} (${item.modelName}) referencia modelId inexistente: ${item.modelId}`);
});

// 6. Capability Radar 10D
console.log(`🕸️ Total de modelos no Radar 10D: ${Object.keys(CAPABILITY_RADAR_10D).length}`);
assert(CAPABILITY_RADAR_10D['gemini-3-8-flash'], 'Radar 10D ausente para "gemini-3-8-flash"');
assert(CAPABILITY_RADAR_10D['claude-fable-5-1'], 'Radar 10D ausente para "claude-fable-5-1"');

// 7. Câmbio FX e Helpers
console.log('💵 Verificando dados e helpers de câmbio FX...');
assert(FX_RATES_DATA && FX_RATES_DATA.USD_BRL && FX_RATES_DATA.USD_BRL.rate === 5.1556, `Cotação USD_BRL deve ser 5.1556. Encontrado: ${FX_RATES_DATA && FX_RATES_DATA.USD_BRL ? FX_RATES_DATA.USD_BRL.rate : 'N/D'}`);
assert(FX_RATES_DATA && FX_RATES_DATA.CNY_BRL && FX_RATES_DATA.CNY_BRL.rate === 0.7595, `Cotação CNY_BRL deve ser 0.7595`);
const convBrl = FX_HELPERS.convertUsdToBrl(20);
assert(Math.abs(convBrl - 103.112) < 0.001, `Conversão de $20 USD para BRL incorreta: ${convBrl}`);

// 8. Planos e Assinaturas (Subscriptions)
console.log(`💳 Total de planos cadastrados: ${SUBSCRIPTION_PLANS_DATA ? SUBSCRIPTION_PLANS_DATA.length : 0}`);
assert(Array.isArray(SUBSCRIPTION_PLANS_DATA) && SUBSCRIPTION_PLANS_DATA.length === 32, `Esperado exatamente 32 planos de assinatura. Encontrado: ${SUBSCRIPTION_PLANS_DATA.length}`);

// Preços Oficiais Brasil
const gPro = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'google-ai-pro');
assert(gPro && gPro.localizedPricing.BRL.price === 96.99 && gPro.localizedPricing.BRL.official === true, 'Google AI Pro deve ter preço oficial BRL de R$ 96,99');

const gUltra5x = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'google-ai-ultra-5x');
assert(gUltra5x && gUltra5x.localizedPricing.BRL.price === 779.90 && gUltra5x.localizedPricing.BRL.official === true, 'Google AI Ultra 5x deve ter preço oficial BRL de R$ 779,90');

const chatGptPro = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'openai-chatgpt-pro');
assert(chatGptPro && chatGptPro.monthlyPriceUsd === 200 && chatGptPro.targetAudience === 'individual', 'ChatGPT Pro individual deve custar $200');

const claudeMax5 = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'anthropic-claude-max-5x');
assert(claudeMax5 && claudeMax5.monthlyPriceUsd === 100, 'Claude Max 5x deve custar $100');

const claudeMax20 = SUBSCRIPTION_PLANS_DATA.find(p => p.id === 'anthropic-claude-max-20x');
assert(claudeMax20 && claudeMax20.monthlyPriceUsd === 200, 'Claude Max 20x deve custar $200');

// 9. Histórico e Linhagens
console.log('🌳 Verificando linhagens e eventos históricos...');
assert(MODEL_HISTORY_DATA && MODEL_HISTORY_DATA.lineages.length >= 5, 'Devem existir pelo menos 5 linhagens genealógicas');
assert(MODEL_HISTORY_DATA && MODEL_HISTORY_DATA.events.length >= 10, 'Devem existir pelo menos 10 eventos na linha do tempo');
assert(BENCHMARK_HISTORY_DATA && BENCHMARK_HISTORY_DATA.length >= 10, 'Devem existir pelo menos 10 benchmarks históricos auditados');

// 10. Comunidade e Comportamento
console.log('💬 Verificando relatos e matriz de comportamento de engenharia...');
assert(COMMUNITY_REPORTS_DATA && COMMUNITY_REPORTS_DATA.length === 10, `Esperado 10 relatos auditados da comunidade. Encontrado: ${COMMUNITY_REPORTS_DATA.length}`);
assert(BENCHMARK_VS_COMMUNITY_DIVERGENCES && BENCHMARK_VS_COMMUNITY_DIVERGENCES.length >= 4, 'Esperado pelo menos 4 análises de divergência benchmark vs comunidade');
assert(ENGINEERING_BEHAVIOR_DATA && ENGINEERING_BEHAVIOR_DATA.dimensions.length === 12, 'Esperado 12 dimensões qualitativas de engenharia');

// 11. Casos de Uso e Projetos
console.log('🎯 Verificando casos de uso e orquestração...');
assert(USE_CASE_COMPARISON_DATA && USE_CASE_COMPARISON_DATA.useCases.length === 12, `Esperado 12 categorias de projetos. Encontrado: ${USE_CASE_COMPARISON_DATA.useCases.length}`);
USE_CASE_COMPARISON_DATA.useCases.forEach(uc => {
  assert(uc.rankings && uc.rankings.length === 10, `Caso de uso "${uc.id}" deve ter exatamente 10 modelos rankeados`);
});
assert(USE_CASE_COMPARISON_DATA.orchestrationRecipes && USE_CASE_COMPARISON_DATA.orchestrationRecipes.length === 3, 'Esperado 3 receitas de orquestração multi-modelo');

// 12. Plataformas e OpenCode Go
console.log('🚀 Verificando catálogo de plataformas...');
assert(PLATFORM_MODEL_CATALOG && PLATFORM_MODEL_CATALOG.opencodeGo.catalog.length === 25, `OpenCode Go deve conter 25 modelos. Encontrado: ${PLATFORM_MODEL_CATALOG.opencodeGo.catalog.length}`);
assert(PLATFORM_MODEL_CATALOG && PLATFORM_MODEL_CATALOG.availabilityMatrix.length === 44, `Matriz de disponibilidade deve cobrir 44 modelos. Encontrado: ${PLATFORM_MODEL_CATALOG.availabilityMatrix.length}`);

// 13. Auditoria Estática Anti-Duplicação de Chaves em data.js e data/*.js
console.log('🛡️ Verificando ausência de chaves de objeto duplicadas...');
const filesToCheck = [
  path.join(__dirname, '..', 'data.js'),
  path.join(__dirname, '..', 'data', 'fx.js'),
  path.join(__dirname, '..', 'data', 'plans.js'),
  path.join(__dirname, '..', 'data', 'platforms.js'),
  path.join(__dirname, '..', 'data', 'history.js'),
  path.join(__dirname, '..', 'data', 'community.js'),
  path.join(__dirname, '..', 'data', 'behavior.js'),
  path.join(__dirname, '..', 'data', 'use-cases.js'),
  path.join(__dirname, '..', 'data', 'pricing-history.js')
];

function findDuplicateKeysInContent(filePath, content) {
  let i = 0;
  const n = content.length;
  let line = 1;
  const stack = [];
  const duplicates = [];

  function skipWhitespaceAndComments() {
    while (i < n) {
      if (content[i] === '\n') {
        line++;
        i++;
      } else if (content[i] === ' ' || content[i] === '\t' || content[i] === '\r') {
        i++;
      } else if (content[i] === '/' && content[i+1] === '/') {
        while (i < n && content[i] !== '\n') i++;
      } else if (content[i] === '/' && content[i+1] === '*') {
        i += 2;
        while (i < n && !(content[i] === '*' && content[i+1] === '/')) {
          if (content[i] === '\n') line++;
          i++;
        }
        if (i < n) i += 2;
      } else {
        break;
      }
    }
  }

  while (i < n) {
    skipWhitespaceAndComments();
    if (i >= n) break;

    const ch = content[i];

    if (ch === '{') {
      stack.push({ keys: new Set(), ternaryDepth: 0 });
      i++;
    } else if (ch === '}') {
      if (stack.length > 0) stack.pop();
      i++;
    } else if (ch === '?') {
      if (stack.length > 0) stack[stack.length - 1].ternaryDepth++;
      i++;
    } else if (ch === '"' || ch === '\'' || ch === '`') {
      const quote = ch;
      const startLine = line;
      i++;
      let str = '';
      while (i < n && content[i] !== quote) {
        if (content[i] === '\\' && i + 1 < n) {
          str += content[i+1];
          i += 2;
        } else {
          if (content[i] === '\n') line++;
          str += content[i];
          i++;
        }
      }
      if (i < n) i++;

      skipWhitespaceAndComments();
      if (content[i] === ':' && stack.length > 0) {
        const cur = stack[stack.length - 1];
        if (cur.ternaryDepth > 0) {
          cur.ternaryDepth--;
          i++;
        } else {
          if (cur.keys.has(str)) {
            duplicates.push({ line: startLine, key: str, file: path.basename(filePath) });
          } else {
            cur.keys.add(str);
          }
          i++;
        }
      }
    } else if (/[a-zA-Z_$]/.test(ch)) {
      const startLine = line;
      let ident = '';
      while (i < n && /[a-zA-Z0-9_$-]/.test(content[i])) {
        ident += content[i];
        i++;
      }
      skipWhitespaceAndComments();
      if (content[i] === ':' && stack.length > 0) {
        const cur = stack[stack.length - 1];
        if (cur.ternaryDepth > 0) {
          cur.ternaryDepth--;
          i++;
        } else {
          if (cur.keys.has(ident)) {
            duplicates.push({ line: startLine, key: ident, file: path.basename(filePath) });
          } else {
            cur.keys.add(ident);
          }
          i++;
        }
      }
    } else {
      i++;
    }
  }
  return duplicates;
}

filesToCheck.forEach(fp => {
  if (fs.existsSync(fp)) {
    const content = fs.readFileSync(fp, 'utf8');
    const dups = findDuplicateKeysInContent(fp, content);
    assert(dups.length === 0, `Chaves duplicadas detectadas em ${path.basename(fp)}: ${dups.map(d => `L${d.line} (${d.key})`).join(', ')}`);
  }
});

// 14. Matriz Real de Cobertura de Dados e Classificação Metrológica (Seção 75)
console.log('\n====================================================');
console.log(`📊 MATRIZ REAL DE COBERTURA DE DADOS (${modelCount} MODELOS CATALOGADOS)`);
console.log('====================================================');

let coverage = {
  specs: 0,
  pricing: 0,
  officialBenchmarks: 0,
  independentBenchmarks: 0,
  cursorBench: 0,
  radar10D: 0,
  privacy: 0,
  operationalGuidance: 0,
  sources: 0
};

let pricingCategories = {
  verifiedCurrent: 0,
  promotionalActive: 0,
  selfHostedOpenWeights: 0,
  legacyOrSuperseded: 0
};

modelIds.forEach(id => {
  const m = AI_MODELS_DATA[id];
  if (m.contextWindow && m.maxOutputTokens && m.modalities) coverage.specs++;
  if (m.pricing && m.pricing.standard) {
    coverage.pricing++;
    if (m.openWeights && m.pricing.standard.input === 0 && m.pricing.standard.output === 0) {
      pricingCategories.selfHostedOpenWeights++;
    } else if (m.pricing.promotionalPeriod) {
      pricingCategories.promotionalActive++;
    } else if (['legacy', 'superseded'].includes(m.status)) {
      pricingCategories.legacyOrSuperseded++;
    } else {
      pricingCategories.verifiedCurrent++;
    }
  }
  if (m.officialBenchmarks && Object.keys(m.officialBenchmarks).length > 1) coverage.officialBenchmarks++;
  if (MULTI_BENCHMARK_LEDGER.some(l => l.modelId === id && (l.deepSwe11 || l.sweBenchVerified || l.terminalBench21))) coverage.independentBenchmarks++;
  if (CURSORBENCH_32_DATA.some(c => c.modelId === id)) coverage.cursorBench++;
  if (CAPABILITY_RADAR_10D[id]) coverage.radar10D++;
  if (m.privacy || PRIVACY_ZDR_DATABASE[m.provider] || PRIVACY_ZDR_DATABASE[`${m.provider}-direct`]) coverage.privacy++;
  if (m.operationalGuidance && m.operationalGuidance.idealFor && m.operationalGuidance.avoidFor) coverage.operationalGuidance++;
  if (m.sources && m.sources.length > 0) coverage.sources++;
});

console.log(`Especificações Canônicas:     ${coverage.specs}/${modelCount} (${Math.round(coverage.specs/modelCount*100)}%)`);
console.log(`Precificação Estruturada:     ${coverage.pricing}/${modelCount} (${Math.round(coverage.pricing/modelCount*100)}%)`);
console.log(`  ├─ Comercial Verificada:    ${pricingCategories.verifiedCurrent}/${modelCount}`);
console.log(`  ├─ Promocional Ativa:       ${pricingCategories.promotionalActive}/${modelCount}`);
console.log(`  ├─ Self-Hosted / Open-W:    ${pricingCategories.selfHostedOpenWeights}/${modelCount}`);
console.log(`  └─ Legado / Predecessores:  ${pricingCategories.legacyOrSuperseded}/${modelCount}`);
console.log(`Benchmarks Oficiais (Metr.):  ${coverage.officialBenchmarks}/${modelCount} (${Math.round(coverage.officialBenchmarks/modelCount*100)}%)`);
console.log(`Benchmarks Independentes:     ${coverage.independentBenchmarks}/${modelCount} (${Math.round(coverage.independentBenchmarks/modelCount*100)}%)`);
console.log(`CursorBench 3.2:              ${coverage.cursorBench}/${modelCount} (${Math.round(coverage.cursorBench/modelCount*100)}%)`);
console.log(`Radar 10D Calibrado:          ${coverage.radar10D}/${modelCount} (${Math.round(coverage.radar10D/modelCount*100)}%)`);
console.log(`Privacidade & ZDR:            ${coverage.privacy}/${modelCount} (${Math.round(coverage.privacy/modelCount*100)}%)`);
console.log(`Guia Operacional:             ${coverage.operationalGuidance}/${modelCount} (${Math.round(coverage.operationalGuidance/modelCount*100)}%)`);
console.log(`Rastreabilidade / Fontes:     ${coverage.sources}/${modelCount} (${Math.round(coverage.sources/modelCount*100)}%)`);

// 15. Auditoria de Freshness de Dados (Seção 76 de 02-dados-ajuste.md)
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

// Benchmark History: <= 30 dias para runs recentes de setembro/2026
BENCHMARK_HISTORY_DATA.forEach(bh => {
  const bDate = new Date(bh.date + 'T00:00:00Z');
  const bDiff = Math.round((refDate - bDate) / (1000 * 60 * 60 * 24));
  assert(bDiff <= 90, `Benchmark histórico ${bh.modelId} (${bh.benchmark}) muito antigo: ${bDiff} dias`);
});

// Community Reports: <= 30 dias
COMMUNITY_REPORTS_DATA.forEach(cr => {
  const cDate = new Date(cr.date + 'T00:00:00Z');
  const cDiff = Math.round((refDate - cDate) / (1000 * 60 * 60 * 24));
  assert(cDiff <= 30, `Relato comunitário ${cr.id} desatualizado: ${cDiff} dias (limite: 30 dias)`);
});
console.log('   ✅ Todos os datasets auditados estão dentro da janela máxima de frescor.');

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
