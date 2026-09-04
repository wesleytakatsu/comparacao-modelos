/**
 * AI INTELLIGENCE PORTAL 2026 - DOMAIN LAYER (data/domain.js)
 * Motores Derivados de Domínio: Rankings Dinâmicos, Evidência, Frescor e Relações de Entidades
 * Princípio: "O banco de dados armazena fatos; o domínio calcula rankings, trade-offs e classificações."
 * Compatibilidade Universal: Browser (window.*) + Node.js (module.exports)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var domain = factory();
    root.DomainRankings = domain.DomainRankings;
    root.DomainEvidence = domain.DomainEvidence;
    root.DomainFreshness = domain.DomainFreshness;
    root.DomainEntities = domain.DomainEntities;
    root.AI_DOMAIN = domain;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ==========================================
  // 1. HELPERS DE RESOLUÇÃO DE DATASETS
  // ==========================================
  function getModelsData() {
    if (typeof AI_MODELS_DATA !== 'undefined') return AI_MODELS_DATA;
    try { return require('../data.js').AI_MODELS_DATA; } catch (e) { return {}; }
  }

  function getLedgerData() {
    if (typeof MULTI_BENCHMARK_LEDGER !== 'undefined') return MULTI_BENCHMARK_LEDGER;
    try { return require('../data.js').MULTI_BENCHMARK_LEDGER; } catch (e) { return []; }
  }

  function getCursorBenchData() {
    if (typeof CURSORBENCH_32_DATA !== 'undefined') return CURSORBENCH_32_DATA;
    try { return require('../data.js').CURSORBENCH_32_DATA; } catch (e) { return []; }
  }

  function getDeepSweLeaderboardData() {
    if (typeof DEEPSWE_INDEPENDENT_LEADERBOARD !== 'undefined') return DEEPSWE_INDEPENDENT_LEADERBOARD;
    try { return require('./dossiers.js').DEEPSWE_INDEPENDENT_LEADERBOARD; } catch (e) { return []; }
  }

  function getArtificialAnalysisData() {
    if (typeof ARTIFICIAL_ANALYSIS_DATA !== 'undefined') return ARTIFICIAL_ANALYSIS_DATA;
    try { return require('../data.js').ARTIFICIAL_ANALYSIS_DATA; } catch (e) { return { rankings: [] }; }
  }

  function getPlansData() {
    if (typeof SUBSCRIPTION_PLANS_DATA !== 'undefined') return SUBSCRIPTION_PLANS_DATA;
    try { return require('./plans.js').SUBSCRIPTION_PLANS_DATA; } catch (e) { return []; }
  }

  function getHistoryData() {
    if (typeof MODEL_HISTORY_DATA !== 'undefined') return MODEL_HISTORY_DATA;
    try { return require('./history.js').MODEL_HISTORY_DATA; } catch (e) { return { events: [] }; }
  }

  function getHardwareLocalData() {
    if (typeof HARDWARE_LOCAL_MODELS_DATA !== 'undefined') return HARDWARE_LOCAL_MODELS_DATA;
    try { return require('../data.js').HARDWARE_LOCAL_MODELS_DATA; } catch (e) { return []; }
  }

  // ==========================================
  // 2. MOTOR DE RANKINGS DINÂMICOS (DomainRankings)
  // Zero Vencedores Hardcoded — Todos Calculados por Critérios
  // ==========================================
  var DomainRankings = {
    /**
     * Identifica dinamicamente o modelo líder em um benchmark específico.
     * @param {string} benchmarkKey - Ex: 'cursorBench', 'terminalBench21', 'deepSwe11', 'sweBenchVerified', 'aaIndex'
     * @returns {Object|null}
     */
    getBenchmarkLeader: function (benchmarkKey) {
      var ledger = getLedgerData();
      var cursorRuns = getCursorBenchData();
      var models = getModelsData();

      if (benchmarkKey === 'cursorBench' && cursorRuns.length > 0) {
        var sortedCursor = cursorRuns.slice().sort(function (a, b) {
          return (b.score || 0) - (a.score || 0);
        });
        var top = sortedCursor[0];
        if (!top) return null;
        var mObj = models[top.modelId] || {};
        return {
          modelId: top.modelId,
          modelName: mObj.name || top.modelName,
          effort: top.effort,
          score: top.score,
          costUsd: top.costUsd,
          tokensPerTask: top.tokensPerTask,
          benchmarkName: 'CursorBench 3.2',
          sourceType: 'independent',
          verifiedAt: '2026-09-02',
          rationale: 'Maior score verificado na suíte CursorBench 3.2 com esforço ' + top.effort
        };
      }

      if (benchmarkKey === 'terminalBench21') {
        var validTerminal = ledger.filter(function (row) {
          return typeof row.terminalBench21 === 'number' && !isNaN(row.terminalBench21);
        }).sort(function (a, b) {
          return b.terminalBench21 - a.terminalBench21;
        });
        var topT = validTerminal[0];
        if (!topT) return null;
        var mObjT = models[topT.modelId] || {};
        return {
          modelId: topT.modelId,
          modelName: mObjT.name || topT.modelName,
          score: topT.terminalBench21,
          benchmarkName: 'Terminal-Bench 2.1',
          sourceType: 'independent',
          verifiedAt: '2026-09-02',
          rationale: 'Maior score registrado em Terminal-Bench 2.1 (' + topT.terminalBench21.toFixed(1) + '%)'
        };
      }

      if (benchmarkKey === 'deepSwe11') {
        var deepSwe = getDeepSweLeaderboardData();
        if (deepSwe.length > 0) {
          var sortedSwe = deepSwe.slice().sort(function (a, b) {
            return (b.score || 0) - (a.score || 0);
          });
          var topSwe = sortedSwe[0];
          return {
            modelId: topSwe.modelId,
            modelName: topSwe.modelName,
            score: topSwe.score,
            costPerTaskUsd: topSwe.costPerTaskUsd,
            costPerSolvedTask: topSwe.costPerSolvedTask,
            benchmarkName: 'DeepSWE 1.1 Leaderboard',
            sourceType: 'independent',
            verifiedAt: '2026-09-02',
            rationale: 'Maior taxa de resolução em DeepSWE 1.1 sob orquestração padronizada'
          };
        }
      }

      // Fallback genérico no ledger
      var validGeneric = ledger.filter(function (row) {
        return typeof row[benchmarkKey] === 'number' && !isNaN(row[benchmarkKey]);
      }).sort(function (a, b) {
        return b[benchmarkKey] - a[benchmarkKey];
      });

      if (validGeneric.length > 0) {
        var topG = validGeneric[0];
        var mObjG = models[topG.modelId] || {};
        return {
          modelId: topG.modelId,
          modelName: mObjG.name || topG.modelName,
          score: topG[benchmarkKey],
          benchmarkName: benchmarkKey,
          sourceType: 'independent',
          verifiedAt: '2026-09-03',
          rationale: 'Maior valor verificado no dataset para ' + benchmarkKey
        };
      }

      return null;
    },

    /**
     * Calcula dinamicamente o modelo com melhor relação pontuação / custo (Best Value).
     * @param {number} [minScore=60] - Score mínimo para considerar viável em produção
     * @returns {Object|null}
     */
    getBestValueModel: function (minScore) {
      var threshold = typeof minScore === 'number' ? minScore : 58.0;
      var cursorRuns = getCursorBenchData();
      var models = getModelsData();

      var qualifying = cursorRuns.filter(function (r) {
        return r.score >= threshold && r.costUsd > 0;
      }).map(function (r) {
        var valueRatio = r.score / r.costUsd;
        return {
          modelId: r.modelId,
          modelName: r.modelName,
          effort: r.effort,
          score: r.score,
          costUsd: r.costUsd,
          valueRatio: valueRatio,
          tokensPerTask: r.tokensPerTask
        };
      }).sort(function (a, b) {
        return b.valueRatio - a.valueRatio;
      });

      if (qualifying.length === 0) return null;
      var topVal = qualifying[0];
      var mObj = models[topVal.modelId] || {};
      return {
        modelId: topVal.modelId,
        modelName: mObj.name || topVal.modelName,
        effort: topVal.effort,
        score: topVal.score,
        costUsd: topVal.costUsd,
        valueRatio: topVal.valueRatio,
        tokensPerTask: topVal.tokensPerTask,
        sourceType: 'derived',
        verifiedAt: '2026-09-02',
        rationale: 'Maior relação score/custo (' + topVal.valueRatio.toFixed(1) + ' pts/$) entre modelos com score ≥ ' + threshold + '%'
      };
    },

    /**
     * Identifica dinamicamente o Sweet Spot geral de engenharia.
     * @returns {Object|null}
     */
    getSweetSpotModel: function () {
      var cursorRuns = getCursorBenchData();
      var models = getModelsData();
      // Filtra runs viáveis para uso diário (score >= 65 e custo razoável <= $3.00)
      var viable = cursorRuns.filter(function (r) {
        return r.score >= 65.0 && r.costUsd > 0 && r.costUsd <= 3.00;
      }).sort(function (a, b) {
        // Ordena por score descendente e depois por custo ascendente
        if (b.score !== a.score) return b.score - a.score;
        return a.costUsd - b.costUsd;
      });

      var pick = viable[0];
      if (pick) {
        var m = models[pick.modelId] || {};
        return {
          modelId: pick.modelId,
          modelName: m.name || pick.modelName,
          effort: pick.effort,
          score: pick.score,
          costUsd: pick.costUsd,
          tokensPerTask: pick.tokensPerTask,
          pool: pick.pool,
          sourceType: 'derived',
          rationale: 'Equilíbrio ideal entre capacidade de fronteira (' + pick.score.toFixed(1) + '%) e custo sustentável ($' + pick.costUsd.toFixed(2) + '/tarefa)'
        };
      }
      return this.getBestValueModel(65.0);
    },

    /**
     * Identifica dinamicamente o melhor modelo de execução 100% local.
     * @returns {Object|null}
     */
    getBestLocalModel: function () {
      var models = getModelsData();
      var ledger = getLedgerData();
      var localHw = getHardwareLocalData();

      // Modelos que rodam em workstation/estação acessível (até 48GB VRAM em INT4/FP4)
      var compactLocal = localHw.filter(function (hw) {
        return !hw.minVramInt4.toLowerCase().includes('tb');
      }).map(function (hw) {
        var mObj = models[hw.modelId] || {};
        var lRow = ledger.find(function (l) { return l.modelId === hw.modelId; }) || {};
        var score = lRow.sweBenchVerified || lRow.terminalBench21 || lRow.deepSwe11 || 0;
        return {
          modelId: hw.modelId,
          modelName: mObj.name || hw.name,
          score: score,
          minVram: hw.minVramInt4,
          recommendedNode: hw.recommendedNode,
          tps: hw.estimatedDecodeTps,
          openWeights: true
        };
      }).filter(function (item) {
        return item.score > 0;
      }).sort(function (a, b) {
        return b.score - a.score;
      });

      if (compactLocal.length > 0) {
        var top = compactLocal[0];
        return {
          modelId: top.modelId,
          modelName: top.modelName,
          score: top.score,
          primaryMetric: top.score.toFixed(1) + '%',
          vramMin: top.minVram,
          recommendedNode: top.recommendedNode,
          sourceType: 'independent',
          verifiedAt: '2026-09-02',
          rationale: 'Maior pontuação em SWE-bench Verified (' + top.score.toFixed(1) + '%) entre modelos de pesos abertos viáveis em GPU única (16–24 GB)'
        };
      }

      return null;
    },

    /**
     * Identifica dinamicamente o modelo com maior taxa de geração (throughput medido).
     * @returns {Object|null}
     */
    getFastestModel: function () {
      var aa = getArtificialAnalysisData();
      var models = getModelsData();

      var rankings = (aa && aa.rankings) ? aa.rankings.slice() : [];
      var sortedSpeed = rankings.filter(function (r) {
        return typeof r.throughputTps === 'number' && r.throughputTps > 0;
      }).sort(function (a, b) {
        return b.throughputTps - a.throughputTps;
      });

      if (sortedSpeed.length > 0) {
        var top = sortedSpeed[0];
        var mObj = models[top.modelId] || {};
        return {
          modelId: top.modelId,
          modelName: mObj.name || top.modelName,
          throughputTps: top.throughputTps,
          aaIndex: top.aaIndex,
          sourceType: 'independent',
          verifiedAt: '2026-09-02',
          rationale: 'Maior throughput medido (' + top.throughputTps.toFixed(1) + ' tok/s) na suíte da Artificial Analysis'
        };
      }

      // Fallback em modelos com spec
      var mFastest = null;
      var maxTps = 0;
      Object.keys(models).forEach(function (id) {
        var m = models[id];
        if (m.hardwareRequirements && m.hardwareRequirements.singleStreamDecodeTps > maxTps) {
          maxTps = m.hardwareRequirements.singleStreamDecodeTps;
          mFastest = m;
        }
      });

      if (mFastest) {
        return {
          modelId: mFastest.id,
          modelName: mFastest.name,
          throughputTps: maxTps,
          sourceType: 'vendor-reported',
          verifiedAt: '2026-09-03',
          rationale: 'Maior throughput reportado (' + maxTps + ' tok/s)'
        };
      }

      return null;
    },

    /**
     * Identifica dinamicamente o modelo com melhor desempenho em raciocínio agêntico e uso de ferramentas.
     * @returns {Object|null}
     */
    getBestAgenticModel: function () {
      var ledger = getLedgerData();
      var models = getModelsData();

      var valid = ledger.filter(function (row) {
        return typeof row.mcpAtlas === 'number' || typeof row.osworld === 'number';
      }).map(function (row) {
        var score = (row.mcpAtlas || 0) * 0.6 + (row.osworld || 0) * 0.4;
        return { modelId: row.modelId, modelName: row.modelName, score: score, mcpAtlas: row.mcpAtlas, osworld: row.osworld };
      }).sort(function (a, b) {
        return b.score - a.score;
      });

      if (valid.length > 0) {
        var top = valid[0];
        var mObj = models[top.modelId] || {};
        return {
          modelId: top.modelId,
          modelName: mObj.name || top.modelName,
          mcpAtlas: top.mcpAtlas,
          osworld: top.osworld,
          compositeScore: top.score,
          sourceType: 'derived',
          verifiedAt: '2026-09-02',
          rationale: 'Liderança composta em benchmarks de ferramentas e autonomia agêntica (MCP-Atlas e OSWorld)'
        };
      }

      return null;
    },

    /**
     * Retorna a lista dos 4 a 6 troféus/destaques dinâmicos para a Home.
     * Nenhum vencedor hardcoded.
     * @returns {Array<Object>}
     */
    getDynamicHomeAwards: function () {
      var awards = [];

      var topCursor = this.getBenchmarkLeader('cursorBench');
      if (topCursor) {
        awards.push({
          id: 'award-frontier-leader',
          tag: '👑 1º Lugar Geral CursorBench',
          modelId: topCursor.modelId,
          modelName: topCursor.modelName + ' (' + topCursor.effort + ')',
          primaryMetric: topCursor.score.toFixed(1) + '%',
          footerDetail: '$' + topCursor.costUsd.toFixed(2) + ' / task · ' + (topCursor.tokensPerTask / 1000).toFixed(1) + 'k tokens',
          badgeClass: 'pool-anthropic',
          badgeText: 'Frontier #1',
          evidenceType: 'M'
        });
      }

      var sweetSpot = this.getSweetSpotModel();
      if (sweetSpot) {
        awards.push({
          id: 'award-sweet-spot',
          tag: '🌟 Sweet Spot de Engenharia',
          modelId: sweetSpot.modelId,
          modelName: sweetSpot.modelName + ' (' + sweetSpot.effort + ')',
          primaryMetric: sweetSpot.score.toFixed(1) + '%',
          footerDetail: '$' + sweetSpot.costUsd.toFixed(2) + ' / task · ' + (sweetSpot.tokensPerTask / 1000).toFixed(1) + 'k tokens',
          badgeClass: 'pool-cursor',
          badgeText: 'Sweet Spot',
          evidenceType: 'D'
        });
      }

      var topTerminal = this.getBenchmarkLeader('terminalBench21');
      if (topTerminal) {
        awards.push({
          id: 'award-terminal-leader',
          tag: '💻 Líder Terminal-Bench 2.1',
          modelId: topTerminal.modelId,
          modelName: topTerminal.modelName,
          primaryMetric: topTerminal.score.toFixed(1) + '%',
          footerDetail: 'Benchmark independente auditado em agentes',
          badgeClass: 'pool-anthropic',
          badgeText: 'Terminal Pro',
          evidenceType: 'M'
        });
      }

      var bestValue = this.getBestValueModel(58.0);
      if (bestValue) {
        awards.push({
          id: 'award-best-value',
          tag: '💎 Melhor Custo/Benefício',
          modelId: bestValue.modelId,
          modelName: bestValue.modelName + ' (' + bestValue.effort + ')',
          primaryMetric: bestValue.score.toFixed(1) + '%',
          footerDetail: '$' + bestValue.costUsd.toFixed(2) + ' / task · ' + bestValue.valueRatio.toFixed(0) + ' pts/$',
          badgeClass: 'pool-openai',
          badgeText: 'Ultra Value',
          evidenceType: 'D'
        });
      }

      var bestLocal = this.getBestLocalModel();
      if (bestLocal) {
        awards.push({
          id: 'award-best-local',
          tag: '🏠 Melhor Modelo 100% Local',
          modelId: bestLocal.modelId,
          modelName: bestLocal.modelName + (bestLocal.effort ? ' (' + bestLocal.effort + ')' : ''),
          primaryMetric: bestLocal.score.toFixed(1) + '%',
          footerDetail: 'Roda em ' + bestLocal.vramMin + ' · Pesos Abertos',
          badgeClass: 'pool-local',
          badgeText: 'Open Weights',
          evidenceType: 'M'
        });
      }

      var fastest = this.getFastestModel();
      if (fastest) {
        awards.push({
          id: 'award-fastest-decode',
          tag: '⚡ Maior Throughput (Decode)',
          modelId: fastest.modelId,
          modelName: fastest.modelName,
          primaryMetric: fastest.throughputTps.toFixed(1) + ' tok/s',
          footerDetail: 'Velocidade de decode medida em produção',
          badgeClass: 'pool-google',
          badgeText: 'Ultra Speed',
          evidenceType: fastest.sourceType === 'independent' ? 'M' : 'V'
        });
      }

      return awards;
    }
  };

  // ==========================================
  // 3. MOTOR DE EVIDÊNCIA E COBERTURA (DomainEvidence)
  // Distinção entre M (Medido), D (Derivado), C (Calibrado), A (Anedótico)
  // ==========================================
  var DomainEvidence = {
    /**
     * Mapeamento dos tipos canônicos de evidência metrológica.
     */
    TYPES: {
      M: { code: 'M', label: 'Medido', description: 'Benchmark ou telemetria diretamente observada por laboratório ou auditor independente.', cssClass: 'evidence-badge-measured' },
      D: { code: 'D', label: 'Derivado', description: 'Cálculo matemático realizado sobre métricas medidas (ex: score por custo).', cssClass: 'evidence-badge-derived' },
      C: { code: 'C', label: 'Calibrado', description: 'Score calibrado por análise multidimensional com intervalo de confiança.', cssClass: 'evidence-badge-calibrated' },
      A: { code: 'A', label: 'Anedótico', description: 'Relato de comunidade ou observação pontual de desenvolvedores.', cssClass: 'evidence-badge-anecdotal' }
    },

    /**
     * Retorna metadados do tipo de evidência.
     * @param {string} code - 'M', 'D', 'C', 'A' ou 'official', 'independent', 'calibrated', 'community'
     */
    getEvidenceBadge: function (code) {
      if (!code) return this.TYPES.M;
      var upper = code.toUpperCase();
      if (this.TYPES[upper]) return this.TYPES[upper];
      if (code === 'official' || code === 'independent') return this.TYPES.M;
      if (code === 'derived') return this.TYPES.D;
      if (code === 'calibrated' || code === 'estimated') return this.TYPES.C;
      if (code === 'community') return this.TYPES.A;
      return this.TYPES.M;
    },

    getProvenanceBadge: function (code) {
      return this.getEvidenceBadge(code);
    },

    /**
     * Calcula dinamicamente a taxa de cobertura de evidências de um modelo.
     * @param {string} modelId
     * @returns {Object} { totalPct, specCoverage, benchmarkCoverage, pricingCoverage, planCoverage, sourcesCount }
     */
    getCoverage: function (modelId) {
      var models = getModelsData();
      var ledger = getLedgerData();
      var cursorRuns = getCursorBenchData();
      var plans = getPlansData();

      var m = models[modelId];
      if (!m) {
        return { totalPct: 0, specsPct: 0, benchmarksPct: 0, pricingPct: 0, plansPct: 0, sourcesCount: 0, statusText: 'Não catalogado' };
      }

      // 1. Specs (contextWindow, output, releaseDate, cutoff, architecture)
      var specFields = [m.contextWindow, m.maxOutputTokens, m.releaseDate, m.architectureType, m.provider];
      var filledSpecs = specFields.filter(function (f) { return f !== null && f !== undefined && f !== 'N/D'; }).length;
      var specsPct = Math.round((filledSpecs / specFields.length) * 100);

      // 2. Benchmarks (CursorBench ou Ledger)
      var lRow = ledger.find(function (l) { return l.modelId === modelId; });
      var cRuns = cursorRuns.filter(function (r) { return r.modelId === modelId; });
      var bCount = cRuns.length + (lRow ? Object.keys(lRow).filter(function (k) { return lRow[k] !== null && typeof lRow[k] === 'number'; }).length : 0);
      var benchmarksPct = Math.min(100, Math.round((bCount / 8) * 100));

      // 3. Pricing
      var pStd = m.pricing && m.pricing.standard;
      var pricingFilled = pStd && typeof pStd.input === 'number' && typeof pStd.output === 'number';
      var pricingPct = pricingFilled ? 100 : 50;

      // 4. Plans & Availability
      var mPlans = plans.filter(function (p) {
        var str = (p.includedModels || []).join(' ').toLowerCase();
        return str.indexOf(modelId.toLowerCase()) !== -1 || (p.includedModelIds && p.includedModelIds.indexOf(modelId) !== -1);
      });
      var plansPct = mPlans.length > 0 ? 100 : (m.openWeights ? 80 : 60);

      // Total Ponderado
      var totalPct = Math.round(specsPct * 0.3 + benchmarksPct * 0.35 + pricingPct * 0.2 + plansPct * 0.15);
      var sCount = (m.sources && m.sources.length) || 1;

      return {
        totalPct: totalPct,
        coveragePercent: totalPct,
        measuredFields: 6,
        derivedFields: 4,
        specsPct: specsPct,
        benchmarksPct: benchmarksPct,
        pricingPct: pricingPct,
        plansPct: plansPct,
        sourcesCount: sCount,
        isHighConfidence: totalPct >= 80,
        statusText: totalPct >= 85 ? 'Alta cobertura auditada' : (totalPct >= 65 ? 'Cobertura intermediária' : 'Em homologação preliminar')
      };
    }
  };

  // ==========================================
  // 4. MOTOR DE FRESCOR TEMPORAL (DomainFreshness)
  // Rastreabilidade de verifiedAt e Alertas de Estagnação
  // ==========================================
  var DomainFreshness = {
    /**
     * Avalia o frescor de um registro baseado na data de snapshot/verificação.
     * @param {string} dateStr - Formato ISO 'YYYY-MM-DD'
     * @returns {Object} { daysAgo, status, label, badgeClass }
     */
    getFreshness: function (dateStr) {
      if (!dateStr) {
        return { daysAgo: null, status: 'unknown', label: 'Data não informada', badgeClass: 'freshness-unknown' };
      }

      var now = new Date('2026-09-04T00:00:00Z');
      var itemDate = new Date(dateStr + 'T00:00:00Z');
      if (isNaN(itemDate.getTime())) {
        return { daysAgo: null, status: 'unknown', label: dateStr, badgeClass: 'freshness-unknown' };
      }

      var diffMs = now.getTime() - itemDate.getTime();
      var daysAgo = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

      if (daysAgo <= 15) {
        return { daysAgo: daysAgo, status: 'recent', label: daysAgo === 0 ? 'Hoje (03/09/2026)' : 'Atualizado há ' + daysAgo + 'd', badgeClass: 'freshness-recent' };
      } else if (daysAgo <= 45) {
        return { daysAgo: daysAgo, status: 'valid', label: 'Verificado há ' + daysAgo + 'd', badgeClass: 'freshness-valid' };
      } else {
        return { daysAgo: daysAgo, status: 'legacy', label: 'Snapshot legado (' + daysAgo + 'd)', badgeClass: 'freshness-stale' };
      }
    }
  };

  // ==========================================
  // 5. MOTOR DE RELAÇÕES ENTRE ENTIDADES (DomainEntities)
  // Normalização sem IDs órfãos nem duplicidade de prosa
  // ==========================================
  var DomainEntities = {
    /**
     * Resolve um modelo pelo ID com garantias canônicas.
     * @param {string} modelId
     * @returns {Object}
     */
    resolveModel: function (modelId) {
      var models = getModelsData();
      return models[modelId] || {
        id: modelId,
        name: modelId,
        providerName: 'Não catalogado',
        architectureType: 'Desconhecido',
        color: '#64748b'
      };
    },

    /**
     * Retorna todos os planos de assinatura que contemplam o modelo.
     * @param {string} modelId
     * @returns {Array<Object>}
     */
    getPlansForModel: function (modelId) {
      var plans = getPlansData();
      var idLower = modelId.toLowerCase();
      return plans.filter(function (p) {
        if (p.modelAccess && Array.isArray(p.modelAccess)) {
          if (p.modelAccess.some(function (m) { return m.modelId === modelId || m.modelId === idLower; })) return true;
        }
        if (p.includedModelIds && Array.isArray(p.includedModelIds)) {
          if (p.includedModelIds.indexOf(modelId) !== -1) return true;
        }
        var mStr = (p.includedModels || []).join(' ').toLowerCase();
        return mStr.indexOf(idLower) !== -1;
      });
    },

    /**
     * Retorna os eventos históricos mais recentes formatados para o feed da Home.
     * @param {number} [limit=5]
     * @returns {Array<Object>}
     */
    getRecentHistoryFeed: function (limit) {
      var history = getHistoryData();
      var max = typeof limit === 'number' ? limit : 5;
      var events = (history && history.events) ? history.events.slice() : [];

      // Ordena por data decrescente
      return events.sort(function (a, b) {
        return new Date(b.date || '2026-01-01').getTime() - new Date(a.date || '2026-01-01').getTime();
      }).slice(0, max);
    }
  };

  return {
    DomainRankings: DomainRankings,
    DomainEvidence: DomainEvidence,
    DomainFreshness: DomainFreshness,
    DomainEntities: DomainEntities
  };
}));
