/* ==========================================================================
   HISTORY ATLAS — UTILITÁRIOS PUROS (Prompt 12 / §60, §68, §100)
   Funções determinísticas de escala temporal, hierarquia de eventos e
   identidade de provedor. Sem DOM, testáveis em Node.
   ========================================================================== */
(function (root) {
  'use strict';

  var DAY_MS = 86400000;

  function parseDate(str) {
    if (!str) return null;
    var m = String(str).match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
    if (!m) return null;
    return Date.UTC(+m[1], m[2] ? +m[2] - 1 : 0, m[3] ? +m[3] : 1);
  }

  // Range temporal real dos nós + eventos (nunca gap constante)
  function computeHistoryRange(dates) {
    var t0 = Infinity, t1 = -Infinity;
    (dates || []).forEach(function (d) {
      var t = parseDate(d);
      if (t == null) return;
      if (t < t0) t0 = t;
      if (t > t1) t1 = t;
    });
    if (!isFinite(t0)) { t0 = Date.UTC(2024, 0, 1); t1 = Date.UTC(2026, 8, 30); }
    // margens de meia quarter para o canvas respirar
    t0 = Math.floor(t0 / DAY_MS) * DAY_MS - 21 * DAY_MS;
    t1 = Math.floor(t1 / DAY_MS) * DAY_MS + 21 * DAY_MS;
    return { t0: t0, t1: t1 };
  }

  // scaleDate: posição x proporcional à data normalizada
  function scaleDate(dateStr, range, widthPx) {
    var t = parseDate(dateStr);
    if (t == null) return 0;
    if (!range || !isFinite(range.t0) || range.t1 <= range.t0) return 0;
    var ratio = (t - range.t0) / (range.t1 - range.t0);
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;
    return Math.round(ratio * widthPx * 100) / 100;
  }

  // Hierarquia de eventos (§68)
  var MAJOR_TYPES = ['release', 'identity-reveal', 'weights-released', 'superseded', 'suspension', 'audit-retraction'];
  var MINOR_TYPES = ['benchmark-update', 'snapshot-update', 'availability-expansion', 'metadata-update', 'rollout', 'pricing-change'];
  function eventTier(type) {
    if (MAJOR_TYPES.indexOf(type) !== -1) return 'major';
    if (MINOR_TYPES.indexOf(type) !== -1) return 'minor';
    return 'standard';
  }

  // Semântica visual de arestas (§64): solid = verificada direta;
  // short-dash = sucessão funcional/geracional não documentada; dotted = inferida
  function edgeStyleFor(conn) {
    if (conn.status === 'verified') {
      var rt = conn.relationType || '';
      if (rt === 'parallel-branch' || rt === 'fork') return { dash: '', kind: 'branch' };
      if (rt === 'rename' || rt === 'identity-reveal') return { dash: '', kind: 'rename' };
      return { dash: '', kind: 'solid' };
    }
    return { dash: '5 5', kind: 'inferred' };
  }

  // Identidade de provedor por família (data não traz provider; derivamos do familyId)
  var FAMILY_PROVIDER = {
    'anthropic-claude': 'Anthropic',
    'openai-gpt56': 'OpenAI',
    'google-gemini': 'Google DeepMind',
    'zai-glm': 'Z.ai',
    'deepseek-tree': 'DeepSeek',
    'xai-grok': 'xAI',
    'alibaba-qwen': 'Alibaba / Qwen',
    'moonshot-kimi': 'Moonshot AI',
    'minimax-family': 'MiniMax',
    'meta-muse': 'Meta',
    'tencent-hunyuan': 'Tencent'
  };

  var PROVIDER_COLORS = {
    'Anthropic': '#d97744',
    'OpenAI': '#10b981',
    'Google DeepMind': '#4285f4',
    'Z.ai': '#22d3ee',
    'DeepSeek': '#6d8cff',
    'xAI': '#cbd5e1',
    'Alibaba / Qwen': '#a855f7',
    'Moonshot AI': '#38bdf8',
    'MiniMax': '#f43f5e',
    'Meta': '#0a7cff',
    'Tencent': '#14b8a6'
  };

  function providerForFamily(lineage) {
    if (!lineage) return 'Geral';
    if (lineage.provider) return lineage.provider;
    return FAMILY_PROVIDER[lineage.familyId] || 'Geral';
  }

  function providerColor(provider) {
    return PROVIDER_COLORS[provider] || '#64748b';
  }

  var MONTHS_PT = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

  function formatMonthHeader(dateStr) {
    var t = parseDate(dateStr);
    if (t == null) return String(dateStr || '');
    var d = new Date(t);
    return MONTHS_PT[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }

  function formatDay(dateStr) {
    var t = parseDate(dateStr);
    if (t == null) return '—';
    return String(new Date(t).getUTCDate()).padStart(2, '0');
  }

  function formatShortDate(dateStr) {
    var t = parseDate(dateStr);
    if (t == null) return String(dateStr || '');
    var d = new Date(t);
    return formatDay(dateStr) + ' ' + MONTHS_PT[d.getUTCMonth()] + (d.getUTCFullYear() === 2026 ? '' : ' ' + d.getUTCFullYear());
  }

  function orderNodesByDate(nodes) {
    return (nodes || []).slice().sort(function (a, b) {
      var ta = parseDate(a.releaseDate) || 0, tb = parseDate(b.releaseDate) || 0;
      return ta - tb;
    });
  }

  // Posições x dos nós de uma família no canvas (colisões separadas por micro-jitter de linha)
  function layoutTrackNodes(nodes, range, widthPx) {
    return orderNodesByDate(nodes).map(function (n, i, arr) {
      var x = scaleDate(n.releaseDate, range, widthPx);
      if (i > 0) {
        var prev = arr[i - 1];
        if (parseDate(prev.releaseDate) === parseDate(n.releaseDate)) {
          x += 12; // mesmo dia: pequeno deslocamento para não sobrepor
        }
      }
      return { node: n, x: x };
    });
  }

  var api = {
    DAY_MS: DAY_MS,
    parseDate: parseDate,
    computeHistoryRange: computeHistoryRange,
    scaleDate: scaleDate,
    eventTier: eventTier,
    edgeStyleFor: edgeStyleFor,
    providerForFamily: providerForFamily,
    providerColor: providerColor,
    formatMonthHeader: formatMonthHeader,
    formatDay: formatDay,
    formatShortDate: formatShortDate,
    orderNodesByDate: orderNodesByDate,
    layoutTrackNodes: layoutTrackNodes
  };

  root.HistoryUtils = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
