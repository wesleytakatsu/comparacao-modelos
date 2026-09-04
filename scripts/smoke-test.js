/**
 * AI INTELLIGENCE PORTAL 2026 - SMOKE TEST SUITE (scripts/smoke-test.js)
 * Conforme Plano 09 (Seção 75)
 * Validação automatizada das 13 rotas e vistas canônicas
 */

const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('🧪 INICIANDO SMOKE TESTS DAS 13 ROTAS CANÔNICAS');
console.log('====================================================\n');

const errors = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.log(`❌ FALHA: ${message}`);
  } else {
    console.log(`✓ OK: ${message}`);
  }
}

// 1. Verificação do index.html e containers das 13 rotas
const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const requiredRouteContainers = [
  { route: '#dashboard', viewId: 'view-dashboard' },
  { route: '#models', viewId: 'view-models' },
  { route: '#model/:id', viewId: 'view-model-detail' },
  { route: '#plans', viewId: 'view-plans' },
  { route: '#plan/:id', viewId: 'view-plan-detail' },
  { route: '#use-cases', viewId: 'view-use-cases' },
  { route: '#use-case/:id', viewId: 'view-use-case-detail' },
  { route: '#compare', viewId: 'view-comparator' },
  { route: '#benchmarks', viewId: 'view-benchmarks' },
  { route: '#benchmark/:id', viewId: 'view-benchmark-detail' },
  { route: '#provider/:id', viewId: 'view-provider-detail' },
  { route: '#platform/:id', viewId: 'view-platform-detail' },
  { route: '#data-health', viewId: 'view-data-health' }
];

console.log('1. Validando presença física dos 13 containers de view no index.html:');
requiredRouteContainers.forEach(({ route, viewId }) => {
  const exists = htmlContent.includes(`id="${viewId}"`);
  assert(exists, `Rota ${route} possui container correspondente #${viewId}`);
});

// 2. Verificação de Scripts Módulos incluídos no index.html
console.log('\n2. Validando scripts modulares no index.html:');
const requiredScripts = [
  'data/domain.js',
  'data/plan-dossier.js',
  'data/entity-views.js',
  'data/data-health-view.js',
  'app.js'
];
requiredScripts.forEach(script => {
  const exists = htmlContent.includes(`src="${script}"`);
  assert(exists, `Script <script src="${script}"> presente no index.html`);
});

// 3. Verificação de Carregamento dos Módulos em Runtime
console.log('\n3. Validando exportação e execução dos módulos de Domínio e Views:');
const domain = require('../data/domain.js');
assert(domain.DomainRankings, 'DomainRankings carregado');
assert(domain.DomainFreshness, 'DomainFreshness carregado');
assert(domain.DomainEvidence, 'DomainEvidence carregado');
assert(domain.DomainEntities, 'DomainEntities carregado');
assert(domain.DomainRegistry, 'DomainRegistry carregado');
assert(domain.DomainClaims, 'DomainClaims carregado');
assert(domain.DomainImpact, 'DomainImpact carregado');
assert(domain.DomainComparison, 'DomainComparison carregado');
assert(domain.DomainHealth, 'DomainHealth carregado');

const planDossier = require('../data/plan-dossier.js');
assert(typeof planDossier.render === 'function', 'PlanDossierView.render é uma função válida');

const entityViews = require('../data/entity-views.js');
assert(typeof entityViews.renderProvider === 'function', 'EntityViews.renderProvider é uma função válida');
assert(typeof entityViews.renderPlatform === 'function', 'EntityViews.renderPlatform é uma função válida');
assert(typeof entityViews.renderBenchmark === 'function', 'EntityViews.renderBenchmark é uma função válida');
assert(typeof entityViews.renderUseCase === 'function', 'EntityViews.renderUseCase é uma função válida');

const dataHealthView = require('../data/data-health-view.js');
assert(typeof dataHealthView.render === 'function', 'DataHealthView.render é uma função válida');

// 4. Verificação de Renderização e Isolamento da rota #history
console.log('\n4. Validando integridade das linhagens e trilhas paralelas da rota #history:');
const historyMod = require('../data/history.js');
assert(historyMod.MODEL_HISTORY_DATA && historyMod.MODEL_HISTORY_DATA.lineages.length >= 7, 'MODEL_HISTORY_DATA possui pelo menos 7 famílias completas');

const anthropic = historyMod.MODEL_HISTORY_DATA.lineages.find(l => l.familyId === 'anthropic-claude');
assert(anthropic && anthropic.tracks.length === 4, 'Anthropic Claude possui 4 trilhas paralelas isoladas (Fable, Opus, Sonnet, Haiku)');

const sonnetTrack = anthropic.tracks.find(t => t.trackId === 'claude-sonnet-track');
const hasOpusInSonnet = sonnetTrack && sonnetTrack.nodes.some(n => n.modelId.includes('opus'));
assert(!hasOpusInSonnet, 'Trilha Sonnet NÃO possui conexão cruzada com modelos Opus');

const qwenFamily = historyMod.MODEL_HISTORY_DATA.lineages.find(l => l.familyId === 'alibaba-qwen');
assert(qwenFamily && qwenFamily.tracks.length === 2, 'Família Alibaba Qwen presente com trilhas Frontier e Open-Weights');

console.log('\n====================================================');
if (errors.length > 0) {
  console.log(`❌ SMOKE TEST FALHOU COM ${errors.length} ERROS!`);
  process.exit(1);
} else {
  console.log('✅ TODOS OS SMOKE TESTS DAS 13 ROTAS CANÔNICAS PASSARAM COM SUCESSO!');
}
