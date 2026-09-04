/**
 * AI INTELLIGENCE PORTAL 2026 - LINK & ROUTE REFERENTIAL INTEGRITY (scripts/test-links.js)
 * Conforme Plano 09 (Seções 74, 75)
 */

const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('🔗 VALIDANDO INTEGRIDADE DE LINKS E ROTAS');
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

// 1. Validar links no index.html
const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const validKnownPrefixes = [
  'dashboard', 'models', 'model', 'plans', 'plan', 'use-cases', 'use-case',
  'compare', 'comparator', 'benchmarks', 'benchmark', 'provider', 'platform',
  'platforms', 'data-health', 'router', 'simulator', 'calculator', 'roi',
  'harnesses', 'troubleshoot', 'troubleshooter', 'history', 'community',
  'sources', 'methodology', 'metodologia', 'privacy', 'antigravity-pools',
  'antigravity', 'aa-intelligence', 'artificial-analysis', 'radar', 'pareto'
];

const hrefMatches = html.match(/href="#([^"]+)"/g) || [];
const uniqueHrefs = Array.from(new Set(hrefMatches.map(m => m.replace(/href="|"/g, '').replace('#', ''))));

console.log(`1. Analisando ${uniqueHrefs.length} âncoras/rotas internas em index.html...`);

uniqueHrefs.forEach(target => {
  const cleanTarget = target.split('?')[0].split('/')[0];
  const isValidPrefix = validKnownPrefixes.includes(cleanTarget);
  const existsAsId = html.includes(`id="${target}"`) || html.includes(`id="${cleanTarget}"`);
  
  assert(isValidPrefix || existsAsId, `Destino '#${target}' é prefixo de rota conhecido ou ID no DOM`);
});

// 2. Validar links e integridade de dados no domínio
console.log('\n2. Validando integridade referencial do grafo de domínio...');
const domain = require('../data/domain.js');
const { AI_MODELS_DATA, BENCHMARK_RUNS_DATA, CLAIMS_DATA, USE_CASES_DATA } = domain;

if (BENCHMARK_RUNS_DATA && Array.isArray(BENCHMARK_RUNS_DATA)) {
  let runsValid = 0;
  BENCHMARK_RUNS_DATA.forEach(run => {
    if (AI_MODELS_DATA[run.modelId]) runsValid++;
  });
  assert(runsValid === BENCHMARK_RUNS_DATA.length, `Todos os ${BENCHMARK_RUNS_DATA.length} benchmark runs apontam para modelIds válidos`);
}

if (CLAIMS_DATA && Array.isArray(CLAIMS_DATA)) {
  let claimsValid = 0;
  CLAIMS_DATA.forEach(claim => {
    if (AI_MODELS_DATA[claim.modelId]) claimsValid++;
  });
  assert(claimsValid === CLAIMS_DATA.length, `Todos os ${CLAIMS_DATA.length} claims apontam para modelIds válidos`);
}

console.log('\n====================================================');
if (errors.length > 0) {
  console.log(`❌ TESTE DE LINKS FALHOU COM ${errors.length} ERROS!`);
  process.exit(1);
} else {
  console.log('✅ TODOS OS LINKS E REFERÊNCIAS INTERNAS SÃO VÁLIDOS!');
}
