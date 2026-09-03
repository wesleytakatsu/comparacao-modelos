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
  AI_DATA_HELPERS
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

// 1. Contagem de Modelos
const modelIds = Object.keys(AI_MODELS_DATA);
const modelCount = modelIds.length;
console.log(`📊 Total de modelos cadastrados: ${modelCount}`);
assert(modelCount === 44, `Esperado exatamente 44 modelos após inclusão de Gemini 3.8 Flash e Claude Fable 5.1. Encontrado: ${modelCount}`);

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

// 3. Verificação dos Novos Modelos Obrigatórios
assert(AI_MODELS_DATA['gemini-3-8-flash'], 'Modelo "gemini-3-8-flash" não encontrado em AI_MODELS_DATA');
assert(AI_MODELS_DATA['claude-fable-5-1'], 'Modelo "claude-fable-5-1" não encontrado em AI_MODELS_DATA');
assert(AI_MODELS_DATA['gemini-3-7-flash'], 'Modelo predecessor "gemini-3-7-flash" foi removido indevidamente');
assert(AI_MODELS_DATA['claude-fable-5'], 'Modelo predecessor "claude-fable-5" foi removido indevidamente');

// 4. CursorBench 3.2
console.log(`📋 Total de runs no CursorBench: ${CURSORBENCH_32_DATA.length}`);
CURSORBENCH_32_DATA.forEach((run, index) => {
  assert(AI_MODELS_DATA[run.modelId], `Run ${index} (${run.modelName}) referencia modelId inexistente: ${run.modelId}`);
  assert(typeof run.score === 'number' && run.score >= 0 && run.score <= 100, `Run ${index} (${run.modelName}) possui score inválido: ${run.score}`);
  assert(typeof run.costUsd === 'number' && run.costUsd >= 0, `Run ${index} (${run.modelName}) possui custo negativo: ${run.costUsd}`);
  assert(typeof run.tokensPerTask === 'number' && run.tokensPerTask > 0, `Run ${index} (${run.modelName}) possui tokensPerTask inválido: ${run.tokensPerTask}`);
});

// Verifica se Claude Fable 5.1 Max é o #1 do CursorBench
const topCursorBench = [...CURSORBENCH_32_DATA].sort((a, b) => b.score - a.score)[0];
assert(topCursorBench && topCursorBench.modelId === 'claude-fable-5-1' && topCursorBench.score >= 73.0,
  `O líder do CursorBench deve ser Claude Fable 5.1 Max com score >= 73.0%. Encontrado: ${topCursorBench ? topCursorBench.modelName + ' (' + topCursorBench.score + '%)' : 'Nenhum'}`);

// 5. Multi-Benchmark Ledger
console.log(`📑 Total de modelos no Ledger Multi-Benchmark: ${MULTI_BENCHMARK_LEDGER.length}`);
MULTI_BENCHMARK_LEDGER.forEach((item, index) => {
  assert(AI_MODELS_DATA[item.modelId], `Ledger item ${index} (${item.modelName}) referencia modelId inexistente: ${item.modelId}`);
  ['terminalBench21', 'deepSwe11', 'sweBenchPro', 'sweBenchVerified', 'gpqaDiamond'].forEach(bench => {
    if (item[bench] !== null && item[bench] !== undefined) {
      assert(typeof item[bench] === 'number' && item[bench] >= 0 && item[bench] <= 100,
        `Ledger ${item.modelName} possui ${bench} fora do intervalo 0-100: ${item[bench]}`);
    }
  });
});

// 6. Capability Radar 10D
console.log(`🕸️ Total de modelos no Radar 10D: ${Object.keys(CAPABILITY_RADAR_10D).length}`);
const requiredRadarDimensions = [
  'reasoning', 'agentic', 'sweBench', 'longContext', 'multimodal',
  'throughput', 'costEfficiency', 'toolAdherence', 'ttftLatency', 'openAccess'
];

Object.keys(CAPABILITY_RADAR_10D).forEach(id => {
  assert(AI_MODELS_DATA[id], `Radar 10D referencia modelId inexistente: ${id}`);
  const vec = CAPABILITY_RADAR_10D[id];
  requiredRadarDimensions.forEach(dim => {
    assert(typeof vec[dim] === 'number' && vec[dim] >= 0 && vec[dim] <= 100,
      `Radar de "${id}" possui dimensão "${dim}" inválida ou fora de 0-100: ${vec[dim]}`);
  });
});
assert(CAPABILITY_RADAR_10D['gemini-3-8-flash'], 'Radar 10D ausente para "gemini-3-8-flash"');
assert(CAPABILITY_RADAR_10D['claude-fable-5-1'], 'Radar 10D ausente para "claude-fable-5-1"');

// 7. Antigravity Pools
assert(ANTIGRAVITY_POOLS_DATA.lastUpdated.startsWith('2026-09'), `Antigravity lastUpdated deve ser de Setembro/2026. Atual: ${ANTIGRAVITY_POOLS_DATA.lastUpdated}`);
const geminiPoolModels = ANTIGRAVITY_POOLS_DATA.pools.pool1.models;
assert(geminiPoolModels.some(m => m.id === 'gemini-3-8-flash'), 'Gemini 3.8 Flash deve constar no Pool 1 do Google Antigravity');

// 8. Artificial Analysis Data
assert(ARTIFICIAL_ANALYSIS_DATA.verifiedDate.startsWith('2026-09'), `Artificial Analysis verifiedDate deve ser de Setembro/2026. Atual: ${ARTIFICIAL_ANALYSIS_DATA.verifiedDate}`);
assert(ARTIFICIAL_ANALYSIS_DATA.overviewKpis.topGeneral.modelId === 'claude-fable-5-1',
  `Líder geral da Artificial Analysis deve ser Claude Fable 5.1 Max. Atual: ${ARTIFICIAL_ANALYSIS_DATA.overviewKpis.topGeneral.modelId}`);

// 9. Calculadora e Helpers (sem NaNs)
console.log('⚡ Testando helper de custo (calculateRequestCost)...');
const testCostG38 = AI_DATA_HELPERS.calculateRequestCost('gemini-3-8-flash', 10000, 40000, 2000);
assert(!isNaN(testCostG38) && testCostG38 > 0, `calculateRequestCost para gemini-3-8-flash retornou NaN ou inválido: ${testCostG38}`);

const testCostF51 = AI_DATA_HELPERS.calculateRequestCost('claude-fable-5-1', 10000, 40000, 2000);
assert(!isNaN(testCostF51) && testCostF51 > 0, `calculateRequestCost para claude-fable-5-1 retornou NaN ou inválido: ${testCostF51}`);

// 10. Matriz de Cobertura de Dados
console.log('\n====================================================');
console.log('📊 MATRIZ REAL DE COBERTURA DE DADOS (44 MODELOS)');
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

modelIds.forEach(id => {
  const m = AI_MODELS_DATA[id];
  if (m.contextWindow && m.maxOutputTokens && m.modalities) coverage.specs++;
  if (m.pricing && m.pricing.standard) coverage.pricing++;
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
console.log(`Benchmarks Oficiais (Metr.):  ${coverage.officialBenchmarks}/${modelCount} (${Math.round(coverage.officialBenchmarks/modelCount*100)}%)`);
console.log(`Benchmarks Independentes:     ${coverage.independentBenchmarks}/${modelCount} (${Math.round(coverage.independentBenchmarks/modelCount*100)}%)`);
console.log(`CursorBench 3.2:              ${coverage.cursorBench}/${modelCount} (${Math.round(coverage.cursorBench/modelCount*100)}%)`);
console.log(`Radar 10D Calibrado:          ${coverage.radar10D}/${modelCount} (${Math.round(coverage.radar10D/modelCount*100)}%)`);
console.log(`Privacidade & ZDR:            ${coverage.privacy}/${modelCount} (${Math.round(coverage.privacy/modelCount*100)}%)`);
console.log(`Guia Operacional:             ${coverage.operationalGuidance}/${modelCount} (${Math.round(coverage.operationalGuidance/modelCount*100)}%)`);
console.log(`Rastreabilidade / Fontes:     ${coverage.sources}/${modelCount} (${Math.round(coverage.sources/modelCount*100)}%)`);

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
