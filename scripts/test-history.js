#!/usr/bin/env node
/* Testes do History Atlas (Prompt 12 §100) — apenas lógica pura: escala
 * temporal, ordenação, mapeamento de arestas, tiers e deep-link state. */
'use strict';
const path = require('path');
const HU = require('../history-utils.js');
let failures = 0;
function ok(cond, name) {
  if (cond) console.log('  ✓ ' + name);
  else { failures++; console.error('  ✗ FAIL: ' + name); }
}

console.log('history-utils: escala temporal');
const range = { t0: Date.UTC(2024, 0, 1), t1: Date.UTC(2026, 0, 1) };
ok(HU.scaleDate('2024-01-01', range, 1000) === 0, 'inicio do range mapeia para 0');
ok(HU.scaleDate('2026-01-01', range, 1000) === 1000, 'fim do range mapeia para width');
ok(HU.scaleDate('2025-01-01', range, 1000) > 490 && HU.scaleDate('2025-01-01', range, 1000) < 520, 'midpoint ~ proporcional (ano bissexto tolerado)');
ok(HU.scaleDate('2023-05-01', range, 1000) === 0, 'data anterior ao range é clampada a 0');
ok(HU.scaleDate('2027-01-01', range, 1000) === 1000, 'data posterior ao range é clampada ao fim');
ok(HU.scaleDate('garbage', range, 1000) === 0, 'data inválida não explode');
const d1 = HU.parseDate('2024-01-02'), d0 = HU.parseDate('2024-01-01');
ok(HU.scaleDate('2024-01-02', range, 1000) > HU.scaleDate('2024-01-01', range, 1000), 'monotônica no tempo');
const r2 = HU.computeHistoryRange(['2025-06-01', '2024-03-02', 'bad', null]);
ok(r2.t0 < Date.UTC(2024, 2, 2) && r2.t1 > Date.UTC(2025, 5, 1), 'computeHistoryRange cobre min/max com margem');

console.log('history-utils: hierarquia de eventos');
ok(HU.eventTier('release') === 'major', 'release = major');
ok(HU.eventTier('audit-retraction') === 'major', 'retratação = major');
ok(HU.eventTier('benchmark-update') === 'minor', 'benchmark-update = minor');
ok(HU.eventTier('pricing-change') === 'minor', 'pricing-change = minor');
ok(HU.eventTier('rollout') === 'standard' || HU.eventTier('rollout') === 'minor', 'rollout não é major');

console.log('history-utils: semântica de arestas');
ok(HU.edgeStyleFor({ status: 'verified', relationType: 'generation-successor' }).dash === '', 'verificada é sólida');
ok(HU.edgeStyleFor({ status: 'inferred' }).dash.length > 0, 'inferida tem tracejado');
ok(HU.edgeStyleFor({ status: 'verified', relationType: 'fork' }).kind === 'branch', 'fork identificado');

console.log('history-utils: ordenação e layout de tracks');
const nodes = [{ modelId: 'b', releaseDate: '2025-05-05' }, { modelId: 'a', releaseDate: '2024-01-01' }];
ok(HU.orderNodesByDate(nodes).map(n => n.modelId).join('') === 'ab', 'orderNodesByDate crescente');
const lay = HU.layoutTrackNodes(nodes, HU.computeHistoryRange(['2024-01-01', '2025-05-05']), 1000);
ok(lay[0].x <= lay[1].x, 'layout mantém posição temporal');

console.log('modelo de dados do atlas (edge mapping / deep-link state)');
global.window = global;
const HDATA = require('../data/history.js');
const MODEL_HISTORY_DATA = HDATA.MODEL_HISTORY_DATA || global.MODEL_HISTORY_DATA;
ok(Array.isArray(MODEL_HISTORY_DATA.lineages) && MODEL_HISTORY_DATA.lineages.length > 0, 'lineages presentes');
let orphanEdges = 0;
MODEL_HISTORY_DATA.lineages.forEach(lin => {
  const ids = new Set((lin.tracks ? lin.tracks.flatMap(t => t.nodes) : (lin.nodes || [])).map(n => n.modelId));
  (lin.connections || []).forEach(c => {
    if (!ids.has(c.from) || !ids.has(c.to)) { orphanEdges++; console.error('  órfã:', lin.familyId, c.from, '->', c.to); }
  });
});
ok(orphanEdges === 0, 'todas as arestas apontam para nós da própria família');
const famIds = MODEL_HISTORY_DATA.lineages.map(l => l.familyId);
ok(new Set(famIds).size === famIds.length, 'familyIds únicos (alvo de deep link ?family=)');
const prov = HU.providerForFamily(MODEL_HISTORY_DATA.lineages[0]);
ok(prov !== 'Geral', 'provedor derivado para a primeira família (' + prov + ')');
const datesOk = MODEL_HISTORY_DATA.events.every(e => /^\d{4}-\d{2}-\d{2}$/.test(e.date));
ok(datesOk, 'eventos com data ISO normalizada (escala temporal real)');

console.log(failures === 0 ? 'TEST-HISTORY: PASS' : 'TEST-HISTORY: ' + failures + ' FAILURES');
process.exit(failures === 0 ? 0 : 1);
