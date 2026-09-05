/**
 * AI INTELLIGENCE PORTAL 2026 - DOMAIN LAYER v2 (data/domain.js)
 * Arquitetura de Domínio Determinística & Grafo de Entidades
 * Princípio Fundamental:
 *   - DADOS armazenam fatos.
 *   - DOMÍNIO calcula rankings, relações, evidências, saúde e impactos.
 *   - INTERFACE explica os resultados.
 *
 * Compatibilidade Universal: Browser (window.*) + Node.js (module.exports) + AMD
 * Conforme especificação normativa de 09-prompt-layout.md
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
    root.DomainRegistry = domain.DomainRegistry;
    root.DomainClaims = domain.DomainClaims;
    root.DomainComparison = domain.DomainComparison;
    root.DomainHealth = domain.DomainHealth;
    root.DomainImpact = domain.DomainImpact;
    root.AI_DOMAIN = domain;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // =========================================================================
  // 1. HELPERS DE RESOLUÇÃO DE DATASETS (Browser globals ou require em Node.js)
  // =========================================================================
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

  function getProvidersData() {
    if (typeof AI_PROVIDERS_DATA !== 'undefined') return AI_PROVIDERS_DATA;
    try { return require('../data.js').AI_PROVIDERS_DATA; } catch (e) { return {}; }
  }

  var CANONICAL_PLATFORMS_DATA = {
    'cursor': { id: 'cursor', name: 'Cursor IDE', category: 'IDE / Editor', description: 'Ambiente de desenvolvimento integrado com suporte a multi-modelos e agentes em background.' },
    'opencode': { id: 'opencode', name: 'OpenCode / OpenCode Go', category: 'CLI / Gateway', description: 'Plataforma de agentes e CLI com plano Go e franquia de uso balanceada.' },
    'antigravity': { id: 'antigravity', name: 'Google Antigravity Pools', category: 'Agent Platform', description: 'Pool de computação e runtime de agentes avançados de codificação.' },
    'openrouter': { id: 'openrouter', name: 'OpenRouter', category: 'Router Multi-Provider', description: 'Roteador universal de inferência de modelos e APIs.' },
    'zai': { id: 'zai', name: 'Z.AI Coding Suite', category: 'Plataforma de Desenvolvimento', description: 'Ecossistema de desenvolvimento e créditos unificados para GLM.' },
    'camelai': { id: 'camelai', name: 'CamelAI Stream Fleet', category: 'Plataforma de Agentes', description: 'Plataforma com streams paralelos dedicados para execução de subagentes.' }
  };

  function getPlatformsData() {
    if (typeof AI_PLATFORMS_DATA !== 'undefined' && AI_PLATFORMS_DATA && Object.keys(AI_PLATFORMS_DATA).length > 0) return AI_PLATFORMS_DATA;
    try {
      var pMod = require('./platforms.js');
      if (pMod && pMod.AI_PLATFORMS_DATA) return pMod.AI_PLATFORMS_DATA;
    } catch (e) {}
    return CANONICAL_PLATFORMS_DATA;
  }

  function getSourcesData() {
    if (typeof SOURCE_REGISTRY !== 'undefined' && SOURCE_REGISTRY && Object.keys(SOURCE_REGISTRY).length > 0) return SOURCE_REGISTRY;
    if (typeof AUDITED_SOURCES !== 'undefined' && AUDITED_SOURCES && Object.keys(AUDITED_SOURCES).length > 0) return AUDITED_SOURCES;
    if (typeof DATA_SOURCES !== 'undefined' && DATA_SOURCES && Object.keys(DATA_SOURCES).length > 0) return DATA_SOURCES;
    try {
      var d = require('../data.js');
      return d.SOURCE_REGISTRY || d.DATA_SOURCES || d.AUDITED_SOURCES || {};
    } catch (e) { return {}; }
  }

  function getUseCasesData() {
    if (typeof USE_CASES_DATA !== 'undefined') return USE_CASES_DATA;
    try { return require('./use-cases.js').USE_CASES_DATA; } catch (e) { return []; }
  }

  // =========================================================================
  // 2. MOTOR DE FRESCOR TEMPORAL (DomainFreshness) - Seções 4, 5, 6, 7, 60
  // Sem relógio congelado em produção. Políticas por domínio e rótulos dinâmicos.
  // =========================================================================
  var FRESHNESS_POLICIES = {
    pricing: { freshDays: 7, staleDays: 14, name: 'Precificação e APIs' },
    plans: { freshDays: 7, staleDays: 14, name: 'Planos de Assinatura' },
    availability: { freshDays: 7, staleDays: 14, name: 'Disponibilidade e Plataformas' },
    benchmarks: { freshDays: 30, staleDays: 90, name: 'Execuções de Benchmark' },
    specs: { freshDays: 90, staleDays: 180, name: 'Especificações de Modelos' },
    architecture: { freshDays: 180, staleDays: 365, name: 'Parâmetros e Arquitetura' },
    community: { freshDays: 60, staleDays: 120, name: 'Feed da Comunidade' },
    default: { freshDays: 15, staleDays: 45, name: 'Geral' }
  };

  var DomainFreshness = {
    POLICIES: FRESHNESS_POLICIES,

    /**
     * Avalia o frescor de uma medição ou entidade temporal.
     * @param {string} dateStr - Formato ISO 'YYYY-MM-DD'
     * @param {Object} [options] - { now?: Date|string, domain?: string, policy?: Object }
     * @returns {Object} { daysAgo, status, legacyStatus, label, badgeClass, isFresh, isAging, isStale, policy }
     */
    getFreshness: function (dateStr, options) {
      if (!dateStr) {
        return {
          daysAgo: null,
          status: 'unknown',
          legacyStatus: 'unknown',
          label: 'Data não informada',
          badgeClass: 'freshness-unknown',
          isFresh: false,
          isAging: false,
          isStale: true
        };
      }

      var opts = options || {};
      // Relógio real em produção (new Date()), injeção permitida em testes (Seção 4, 60)
      var now = opts.now ? new Date(opts.now) : new Date();
      var itemDate = new Date(dateStr + (dateStr.length === 10 ? 'T00:00:00Z' : ''));

      if (isNaN(itemDate.getTime()) || isNaN(now.getTime())) {
        return {
          daysAgo: null,
          status: 'unknown',
          legacyStatus: 'unknown',
          label: String(dateStr),
          badgeClass: 'freshness-unknown',
          isFresh: false,
          isAging: false,
          isStale: true
        };
      }

      var diffMs = now.getTime() - itemDate.getTime();
      var daysAgo = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

      // Política segmentada por domínio (Seção 6)
      var policy = opts.policy || (opts.domain && FRESHNESS_POLICIES[opts.domain]) || FRESHNESS_POLICIES.default;

      // Nomenclatura temporal canônica (Seção 7): fresh, aging, stale, unknown
      var status = 'stale';
      var legacyStatus = 'legacy'; // Compatibilidade retroativa
      var badgeClass = 'freshness-stale';

      if (daysAgo <= policy.freshDays) {
        status = 'fresh';
        legacyStatus = 'recent';
        badgeClass = 'freshness-recent';
      } else if (daysAgo <= policy.staleDays) {
        status = 'aging';
        legacyStatus = 'valid';
        badgeClass = 'freshness-valid';
      }

      // Rótulos dinâmicos sem hardcode de datas (Seção 5)
      var label = '';
      if (daysAgo === 0) {
        label = 'Hoje';
      } else if (daysAgo === 1) {
        label = 'Ontem';
      } else if (daysAgo <= 7) {
        label = 'há ' + daysAgo + ' dias';
      } else if (status === 'fresh' || status === 'aging') {
        label = 'Verificado há ' + daysAgo + 'd';
      } else {
        label = 'Snapshot estagnado (' + daysAgo + 'd)';
      }

      return {
        daysAgo: daysAgo,
        status: status,
        legacyStatus: legacyStatus,
        label: label,
        badgeClass: badgeClass,
        isFresh: status === 'fresh',
        isAging: status === 'aging',
        isStale: status === 'stale',
        policy: policy
      };
    }
  };

  // =========================================================================
  // 3. BENCHMARK REGISTRY & TAXONOMIA (DomainRegistry) - Seções 13, 14, 42
  // Registry canônico centralizado de suítes de avaliação independentes.
  // =========================================================================
  var BENCHMARK_REGISTRY = {
    'cursorbench-3.2': {
      id: 'cursorbench-3.2',
      name: 'CursorBench 3.2',
      category: 'coding-agentic',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Cursor / Anysphere',
      harness: 'Cursor IDE Agent Runner',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: '58 cenários de engenharia de software do mundo real com resolução autônoma multi-turno.',
      methodology: 'Avalia a taxa de sucesso do agente em modificar código existente, corrigir bugs e rodar testes em sandbox.',
      verifiedAt: '2026-09-02'
    },
    'terminal-bench-2.1': {
      id: 'terminal-bench-2.1',
      name: 'Terminal-Bench 2.1',
      category: 'coding-agentic',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Terminal Bench Consortium',
      harness: 'Bash / Docker Sandbox',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Execução autônoma de comandos bash, orquestração de scripts e diagnóstico em linha de comando.',
      methodology: 'Mede a precisão em resolver tarefas complexas via terminal puro sem interface visual.',
      verifiedAt: '2026-09-02'
    },
    'deepswe-1.1': {
      id: 'deepswe-1.1',
      name: 'DeepSWE 1.1 Leaderboard',
      category: 'coding-agentic',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'DeepSWE Open Evaluation',
      harness: 'Git Issue Resolution Environment',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Resolução de issues reais do GitHub com cálculo de custo computacional por tarefa resolvida.',
      methodology: 'Ambiente padronizado de repositório com orquestração rigorosa de testes unitários.',
      verifiedAt: '2026-09-02'
    },
    'swebench-verified': {
      id: 'swebench-verified',
      name: 'SWE-bench Verified',
      category: 'coding-agentic',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Princeton University',
      harness: 'Docker / PyTest Runner',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: '500 problemas verificados por humanos do ecossistema Python do GitHub.',
      methodology: 'Padrão ouro acadêmico para avaliar geração de patches de software.',
      verifiedAt: '2026-09-02'
    },
    'artificial-analysis-index': {
      id: 'artificial-analysis-index',
      name: 'Artificial Analysis Quality Index (AA)',
      category: 'reasoning',
      direction: 'higher',
      scoreScale: 'points',
      provider: 'Artificial Analysis',
      harness: 'Standard API Probing Suite',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: 'pts',
      description: 'Índice de inteligência composto avaliando lógica, codificação e compreensão geral.',
      methodology: 'Ponderação normalizada de múltiplos benchmarks com auditoria independente de APIs.',
      verifiedAt: '2026-09-02'
    },
    'arc-challenge-hard': {
      id: 'arc-challenge-hard',
      name: 'ARC-AGI Challenge (Hard)',
      category: 'reasoning',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'François Chollet / Lab42',
      harness: 'ARC Visual Matrix Runner',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Avaliação de raciocínio indutivo e síntese de programas conceituais sobre matrizes.',
      methodology: 'Testa generalização out-of-distribution sem possibilidade de memorização prévia.',
      verifiedAt: '2026-09-02'
    },
    'gpqa-diamond': {
      id: 'gpqa-diamond',
      name: 'GPQA Diamond',
      category: 'reasoning',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'NYU / Anthropic Research',
      harness: '4-shot CoT',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Questões de nível de pós-graduação em física, química e biologia.',
      methodology: 'Formuladas por especialistas com verificação cruzada para impedir resolução por busca rasa.',
      verifiedAt: '2026-09-02'
    },
    'mcp-atlas': {
      id: 'mcp-atlas',
      name: 'MCP-Atlas Tool Calling',
      category: 'tool-use',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Model Context Protocol Foundation',
      harness: 'Multi-server MCP Testbed',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Avaliação estrita de invocação de ferramentas, JSON schema e orquestração multi-servidor.',
      methodology: 'Executa chamadas estruturadas para servidores de ferramentas e verifica conformidade de protocolo.',
      verifiedAt: '2026-09-02'
    },
    'osworld': {
      id: 'osworld',
      name: 'OSWorld Computer Use',
      category: 'tool-use',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'OSWorld Group',
      harness: 'Ubuntu Desktop VM / VNC',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Autonomia no uso de computador interagindo com interface gráfica, navegador e terminal.',
      methodology: 'Executa fluxos de trabalho reais de usuário em ambiente de SO virtualizado.',
      verifiedAt: '2026-09-02'
    },
    'tau-bench-telecom': {
      id: 'tau-bench-telecom',
      name: 'tau-bench Telecom',
      category: 'professional-work',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Sierra / Stanford',
      harness: 'Dynamic Conversation Policy Environment',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Simulação de atendimento ao cliente corporativo e conformidade com políticas de negócio.',
      methodology: 'Mede consistência conversacional e respeito a regras de governança corporativa.',
      verifiedAt: '2026-09-02'
    },
    'long-context-retrieval': {
      id: 'long-context-retrieval',
      name: 'Long-Context Needle Retrieval',
      category: 'long-context',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Pressure Evaluation Suite',
      harness: 'Needle-in-a-Haystack Runner',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Recuperação factual em janelas de 128k a 2M de tokens sob diferentes profundidades.',
      methodology: 'Inserção estocástica de chaves de resposta em documentos massivos de documentação técnica.',
      verifiedAt: '2026-09-02'
    },
    'decode-speed-tps': {
      id: 'decode-speed-tps',
      name: 'Decode Throughput (Tokens/s)',
      category: 'speed-latency',
      direction: 'higher',
      scoreScale: 'tokens_per_sec',
      provider: 'Artificial Analysis / TokenSpeed',
      harness: 'Streaming Single-Client Probing',
      sourceType: 'independent',
      primaryMetric: 'throughputTps',
      unit: 'tok/s',
      description: 'Taxa média de geração contínua de saída sob carga de inferência em produção.',
      methodology: 'Medição da velocidade pura de saída após Time-to-First-Token em solicitações sequenciais.',
      verifiedAt: '2026-09-02'
    },
    'terminal-bench-4.0': {
      id: 'terminal-bench-4.0',
      name: 'Terminal-Bench 4.0',
      category: 'coding-agentic',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Terminal Bench Consortium',
      harness: 'Advanced Docker Sandbox',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Execução autônoma em terminal para ambientes complexos e engenharia de software.',
      methodology: 'Avalia a taxa de sucesso de agentes em resolver desafios avançados de sistema e automação.',
      verifiedAt: '2026-09-03'
    },
    'terminal-bench-science-0.1': {
      id: 'terminal-bench-science-0.1',
      name: 'Terminal-Bench Science 0.1',
      category: 'coding-agentic',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Snorkel AI / Terminal Bench',
      harness: 'Scientific Computing Sandbox',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: '70 tarefas científicas em 5 domínios técnicos executadas em terminal.',
      methodology: 'Resolução autônoma de pipelines científicos com validação estrita de resultados.',
      verifiedAt: '2026-09-03'
    },
    'arc-agi-3-standard': {
      id: 'arc-agi-3-standard',
      name: 'ARC-AGI-3 (Standard)',
      category: 'reasoning',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'ARC Prize Foundation',
      harness: 'Standard Evaluation Suite',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Avaliação pura de generalização e síntese de programas conceituais sem adapter proprietário.',
      methodology: 'Testa generalização out-of-distribution sob restrição estrita de metrologia.',
      verifiedAt: '2026-09-02'
    },
    'arc-agi-3-provider-adapter': {
      id: 'arc-agi-3-provider-adapter',
      name: 'ARC-AGI-3 (Provider Adapter)',
      category: 'reasoning',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'ARC Prize Foundation / OpenAI',
      harness: 'Provider Adapter Evaluation',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: 'Avaliação de raciocínio visual e simbólico auxiliada por adapter proprietário de fornecedor.',
      methodology: 'Sempre requer exibição do sufixo Provider Adapter na citação do resultado.',
      verifiedAt: '2026-09-02'
    },
    'gdp-pdf': {
      id: 'gdp-pdf',
      name: 'Surge GDP.pdf',
      category: 'multimodal',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'Surge AI / Artificial Analysis',
      harness: 'PDF Multi-domain Evaluation',
      sourceType: 'independent',
      primaryMetric: 'score',
      unit: '%',
      description: '100 relatórios PDF e 4.592 páginas avaliando All-pass Rate sobre 1.275 critérios atômicos.',
      methodology: 'Exige atendimento integral a todos os critérios da tarefa para pontuação.',
      verifiedAt: '2026-09-04'
    },
    'exploitbench': {
      id: 'exploitbench',
      name: 'ExploitBench',
      category: 'cyber',
      direction: 'higher',
      scoreScale: 'percentage',
      provider: 'OpenAI Safety / Preparedness',
      harness: 'Automated Exploit Execution Environment',
      sourceType: 'official',
      primaryMetric: 'score',
      unit: '%',
      description: 'Avaliação de capacidades de exploração e resolução autônoma de vulnerabilidades.',
      methodology: 'Ambiente controlado medindo capacidade de síntese e execução de exploits funcionais.',
      verifiedAt: '2026-09-03'
    }
  };

  var DomainRegistry = {
    BENCHMARKS: BENCHMARK_REGISTRY,

    getBenchmark: function (id) {
      return BENCHMARK_REGISTRY[id] || null;
    },

    getAllBenchmarks: function () {
      return Object.values(BENCHMARK_REGISTRY);
    },

    getBenchmarksByCategory: function (category) {
      return Object.values(BENCHMARK_REGISTRY).filter(function (b) {
        return b.category === category;
      });
    }
  };

  // =========================================================================
  // 4. MOTOR DE RANKINGS DINÂMICOS & HARDWARE (DomainRankings) - Seções 8, 10, 11, 12
  // Zero hardcodes de datas ou de vencedores. Cálculo determinístico por critérios.
  // =========================================================================
  var DomainRankings = {
    /**
     * Identifica dinamicamente o modelo líder em um benchmark específico.
     * @param {string} benchmarkKey
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
          verifiedAt: top.verifiedAt || top.runDate || (mObj.releaseDate || null),
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
          verifiedAt: topT.verifiedAt || (mObjT.releaseDate || null),
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
            verifiedAt: topSwe.verifiedAt || null,
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
          verifiedAt: topG.verifiedAt || topG.runDate || null,
          rationale: 'Maior valor verificado no dataset para ' + benchmarkKey
        };
      }

      return null;
    },

    /**
     * Calcula dinamicamente o modelo com melhor relação pontuação / custo (Best Value).
     * @param {number} [minScore=58.0]
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
          tokensPerTask: r.tokensPerTask,
          verifiedAt: r.verifiedAt
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
        verifiedAt: topVal.verifiedAt || (mObj.releaseDate || null),
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

      var viable = cursorRuns.filter(function (r) {
        return r.score >= 65.0 && r.costUsd > 0 && r.costUsd <= 3.00;
      }).sort(function (a, b) {
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
          verifiedAt: pick.verifiedAt || (m.releaseDate || null),
          rationale: 'Equilíbrio ideal entre capacidade de fronteira (' + pick.score.toFixed(1) + '%) e custo sustentável ($' + pick.costUsd.toFixed(2) + '/tarefa)'
        };
      }
      return this.getBestValueModel(65.0);
    },

    /**
     * Identifica dinamicamente o melhor modelo local por categoria estruturada.
     * Seções 10, 11, 12: Sem filtro frágil de "TB" em string. Normalização numérica.
     * Categorias Canônicas: 'consumer' (≤24GB GPU única), 'workstation' (≤96GB), 'multi_gpu' (>96GB/multi-GPU), 'datacenter' (cluster/servidor).
     * @param {'consumer'|'workstation'|'multi_gpu'|'datacenter'|'open_weights'|'any'} [category='consumer']
     * @returns {Object|null}
     */
    getBestLocalModel: function (category) {
      var targetCategory = category || 'consumer';
      var models = getModelsData();
      var ledger = getLedgerData();
      var localHw = getHardwareLocalData();

      var qualifying = localHw.filter(function (hw) {
        if (targetCategory === 'consumer') {
          // Consumer: até 24 GB em GPU única
          return hw.executionCategory === 'consumer' || (typeof hw.minVramGb === 'number' && hw.minVramGb <= 24.0 && (hw.gpuCount || 1) === 1);
        } else if (targetCategory === 'workstation') {
          // Workstation: de 24 GB até 96 GB de VRAM
          return hw.executionCategory === 'workstation' || (typeof hw.minVramGb === 'number' && hw.minVramGb > 24.0 && hw.minVramGb <= 96.0);
        } else if (targetCategory === 'multi_gpu') {
          // Multi-GPU: mais de 1 GPU ou > 96 GB
          return hw.executionCategory === 'multi_gpu' || (typeof hw.minVramGb === 'number' && hw.minVramGb > 96.0) || ((hw.gpuCount || 1) > 1);
        } else if (targetCategory === 'datacenter' || targetCategory === 'server') {
          // Datacenter / Cluster dedicado
          return hw.executionCategory === 'datacenter' || hw.executionCategory === 'server' || (typeof hw.minVramGb === 'number' && hw.minVramGb > 160.0);
        } else if (targetCategory === 'open_weights') {
          return true;
        }
        return true;
      }).map(function (hw) {
        var mObj = models[hw.modelId] || {};
        var lRow = ledger.find(function (l) { return l.modelId === hw.modelId; }) || {};
        var score = lRow.sweBenchVerified || lRow.terminalBench21 || lRow.deepSwe11 || 0;
        return {
          modelId: hw.modelId,
          modelName: mObj.name || hw.name,
          score: score,
          minVramGb: hw.minVramGb,
          recommendedVramGb: hw.recommendedVramGb,
          gpuCount: hw.gpuCount || 1,
          executionCategory: hw.executionCategory || 'consumer',
          minimumNodeClass: hw.minimumNodeClass || 'single-gpu-consumer',
          minVram: hw.minVramInt4,
          recommendedNode: hw.recommendedNode,
          tps: hw.estimatedDecodeTps,
          verifiedAt: hw.verifiedAt || (mObj.releaseDate || null),
          openWeights: true
        };
      }).filter(function (item) {
        return item.score > 0;
      }).sort(function (a, b) {
        return b.score - a.score;
      });

      if (qualifying.length > 0) {
        var top = qualifying[0];
        var categoryLabels = {
          consumer: 'Consumer (GPU Única ≤24GB)',
          workstation: 'Workstation (≤96GB)',
          multi_gpu: 'Multi-GPU / Cluster (>96GB)',
          datacenter: 'Datacenter / Cluster Dedicado',
          open_weights: 'Pesos Abertos Geral',
          any: 'Sem Limite de Hardware'
        };
        return {
          modelId: top.modelId,
          modelName: top.modelName,
          score: top.score,
          primaryMetric: top.score.toFixed(1) + '%',
          vramMin: top.minVram,
          minVramGb: top.minVramGb,
          category: targetCategory,
          categoryLabel: categoryLabels[targetCategory] || targetCategory,
          recommendedNode: top.recommendedNode,
          sourceType: 'independent',
          verifiedAt: top.verifiedAt,
          rationale: 'Maior pontuação em SWE-bench Verified (' + top.score.toFixed(1) + '%) na categoria ' + (categoryLabels[targetCategory] || targetCategory)
        };
      }

      return null;
    },

    /**
     * Retorna separadamente os 4 campeões locais por categoria canônica (Seção 11 e 12).
     */
    getLocalRankingsByCategory: function () {
      return {
        consumer: this.getBestLocalModel('consumer'),
        workstation: this.getBestLocalModel('workstation'),
        multiGpu: this.getBestLocalModel('multi_gpu'),
        datacenter: this.getBestLocalModel('datacenter'),
        openWeights: this.getBestLocalModel('open_weights')
      };
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
          verifiedAt: top.verifiedAt || null,
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
          verifiedAt: mFastest.releaseDate || null,
          rationale: 'Maior throughput reportado (' + maxTps + ' tok/s)'
        };
      }

      return null;
    },

    /**
     * Identifica dinamicamente o modelo líder em raciocínio agêntico e uso de ferramentas.
     * @returns {Object|null}
     */
    getBestAgenticModel: function () {
      var ledger = getLedgerData();
      var models = getModelsData();

      var valid = ledger.filter(function (row) {
        return typeof row.mcpAtlas === 'number' || typeof row.osworld === 'number';
      }).map(function (row) {
        var score = (row.mcpAtlas || 0) * 0.6 + (row.osworld || 0) * 0.4;
        return { modelId: row.modelId, modelName: row.modelName, score: score, mcpAtlas: row.mcpAtlas, osworld: row.osworld, verifiedAt: row.verifiedAt };
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
          verifiedAt: top.verifiedAt || null,
          rationale: 'Liderança composta em benchmarks de ferramentas e autonomia agêntica (MCP-Atlas e OSWorld)'
        };
      }

      return null;
    },

    /**
     * Retorna a lista dos 4 a 6 troféus/destaques explicáveis da Home (Seção 54).
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
          evidenceType: 'M',
          criteria: 'Maior score em CursorBench 3.2',
          threshold: 'Score máximo auditado',
          source: 'CursorBench 3.2 / Anysphere'
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
          evidenceType: 'D',
          criteria: 'Score ≥ 65% com custo ≤ $3.00/tarefa',
          threshold: 'Filtro Pareto custo/benefício',
          source: 'CursorBench 3.2 Derivado'
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
          evidenceType: 'M',
          criteria: 'Maior acurácia em comandos e bash',
          threshold: 'Score máximo em Terminal-Bench',
          source: 'Terminal Bench Consortium'
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
          evidenceType: 'D',
          criteria: 'Maior relação score/custo com score ≥ 58%',
          threshold: 'Score mínimo 58.0%',
          source: 'CursorBench 3.2 Derivado'
        });
      }

      var bestLocal = this.getBestLocalModel('consumer');
      if (bestLocal) {
        awards.push({
          id: 'award-best-local',
          tag: '🏠 Melhor Modelo Local (Consumer)',
          modelId: bestLocal.modelId,
          modelName: bestLocal.modelName,
          primaryMetric: bestLocal.score.toFixed(1) + '%',
          footerDetail: 'Roda em GPU única (' + bestLocal.vramMin + ')',
          badgeClass: 'pool-local',
          badgeText: 'Consumer Local',
          evidenceType: 'M',
          criteria: 'Maior score em SWE-bench em GPU ≤ 24GB',
          threshold: 'VRAM ≤ 24GB / GPU única',
          source: 'SWE-bench Verified / Local Specs'
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
          evidenceType: fastest.sourceType === 'independent' ? 'M' : 'O',
          criteria: 'Maior taxa contínua de tokens/segundo',
          threshold: 'Throughput de streaming',
          source: 'Artificial Analysis Throughput Suite'
        });
      }

      return awards;
    },

    /**
     * Calcula dinamicamente o ranking de um caso de uso aplicando pesos ponderados (Seções 31 a 34).
     * @param {string} useCaseId
     * @param {Object} [customWeights] - Pesos nos eixos coding, agentic, reliability, cost, speed
     * @returns {Array<Object>}
     */
    calculateUseCaseRanking: function (useCaseId, customWeights) {
      var useCases = getUseCasesData();
      var list = Array.isArray(useCases) ? useCases : (useCases && useCases.useCases ? useCases.useCases : []);
      var uc = list.find(function (u) { return u.id === useCaseId; });
      if (!uc) return [];

      var baseRankings = uc.rankings ? uc.rankings.slice() : [];
      if (!customWeights) return baseRankings;

      var ledger = getLedgerData();
      var models = getModelsData();

      var sum = 0;
      for (var k in customWeights) {
        sum += Math.max(0, Number(customWeights[k]) || 0);
      }
      if (sum === 0) return baseRankings;

      return baseRankings.map(function (item) {
        var m = models[item.modelId] || {};
        var led = ledger.find(function (l) { return l.modelId === item.modelId; }) || {};

        var codingScore = (typeof led.sweBenchVerified === 'number' ? led.sweBenchVerified : 50);
        var agenticScore = (typeof led.cursorBench === 'number' ? led.cursorBench : 50);
        var reliabilityScore = (typeof led.terminalBench21 === 'number' ? led.terminalBench21 : 50);
        var costScore = Math.max(0, 100 - (m.pricing && m.pricing.standard ? (m.pricing.standard.input + m.pricing.standard.output) * 2.5 : 20));
        var speedScore = (typeof m.throughputP50 === 'number' && m.throughputP50 > 0) ? Math.min(100, m.throughputP50 / 3.0) : 70;

        var weighted = (
          (codingScore * (customWeights.coding || 0)) +
          (agenticScore * (customWeights.agentic || 0)) +
          (reliabilityScore * (customWeights.reliability || 0)) +
          (costScore * (customWeights.cost || 0)) +
          (speedScore * (customWeights.speed || 0))
        ) / sum;

        var finalFitScore = Math.round((item.fitScore * 0.6) + (weighted * 0.4));
        finalFitScore = Math.max(40, Math.min(100, finalFitScore));

        return Object.assign({}, item, { fitScore: finalFitScore });
      }).sort(function (a, b) {
        return b.fitScore - a.fitScore;
      }).map(function (item, index) {
        return Object.assign({}, item, { rank: index + 1 });
      });
    },

    /**
     * Retorna a análise de sensibilidade e ponto de virada (tipping point) do caso de uso (Seção 33).
     * @param {string} useCaseId
     * @returns {Object|null}
     */
    getUseCaseSensitivity: function (useCaseId) {
      var useCases = getUseCasesData();
      var list = Array.isArray(useCases) ? useCases : (useCases && useCases.useCases ? useCases.useCases : []);
      var uc = list.find(function (u) { return u.id === useCaseId; });
      if (!uc) return null;
      return uc.sensitivityAnalysis || {
        defaultWinner: uc.rankings && uc.rankings[0] ? uc.rankings[0].modelName : 'Modelo Líder',
        tippingPoint: 'Liderança sólida no perfil ponderado padrão.'
      };
    }
  };

  // =========================================================================
  // 5. MOTOR DE EVIDÊNCIA E METROLOGIA (DomainEvidence) - Seções 22, 23
  // Separação estrita dos dois eixos: Proveniência (O/I/C) e Natureza (M/D/C/A)
  // =========================================================================
  var DomainEvidence = {
    // Eixo 1: Proveniência (De onde veio?)
    PROVENANCE_TYPES: {
      O: { code: 'O', label: 'Oficial', title: 'Fonte Oficial do Provedor / Technical Report', cssClass: 'badge-source-official' },
      I: { code: 'I', label: 'Independente', title: 'Avaliação de Laboratório ou Auditoria Independente', cssClass: 'badge-source-independent' },
      C: { code: 'C', label: 'Comunidade', title: 'Observação Coletiva da Comunidade de Desenvolvedores', cssClass: 'badge-source-community' }
    },

    // Eixo 2: Natureza Metrológica (Como foi obtido?)
    NATURE_TYPES: {
      M: { code: 'M', label: 'Medido', title: 'Medição Direta em Testbed ou Ambiente Sandbox', cssClass: 'evidence-badge-measured' },
      D: { code: 'D', label: 'Derivado', title: 'Cálculo Matemático sobre Métricas Medidas', cssClass: 'evidence-badge-derived' },
      C: { code: 'C', label: 'Calibrado', title: 'Score Normalizado / Calibração Multidimensional', cssClass: 'evidence-badge-calibrated' },
      A: { code: 'A', label: 'Anedótico', title: 'Relato Empírico sem Benchmark Padronizado', cssClass: 'evidence-badge-anecdotal' }
    },

    getProvenanceBadge: function (code) {
      if (!code) return this.PROVENANCE_TYPES.I;
      var upper = String(code).toUpperCase();
      if (this.PROVENANCE_TYPES[upper]) return this.PROVENANCE_TYPES[upper];
      if (this.NATURE_TYPES[upper]) return this.NATURE_TYPES[upper];
      if (code === 'official') return this.PROVENANCE_TYPES.O;
      if (code === 'independent' || code === 'third-party' || code === 'T') return this.PROVENANCE_TYPES.I;
      if (code === 'community') return this.PROVENANCE_TYPES.C;
      return this.PROVENANCE_TYPES.I;
    },

    getNatureBadge: function (code) {
      if (!code) return this.NATURE_TYPES.M;
      var upper = String(code).toUpperCase();
      if (this.NATURE_TYPES[upper]) return this.NATURE_TYPES[upper];
      if (code === 'measured') return this.NATURE_TYPES.M;
      if (code === 'derived') return this.NATURE_TYPES.D;
      if (code === 'calibrated' || code === 'estimated') return this.NATURE_TYPES.C;
      if (code === 'anecdotal') return this.NATURE_TYPES.A;
      return this.NATURE_TYPES.M;
    },

    getEvidenceBadge: function (code) {
      if (!code) return this.NATURE_TYPES.M;
      var upper = String(code).toUpperCase();
      if (this.NATURE_TYPES[upper]) return this.NATURE_TYPES[upper];
      if (this.PROVENANCE_TYPES[upper]) return this.PROVENANCE_TYPES[upper];
      return this.getNatureBadge(code);
    },

    /**
     * Formata badge duplo sem ambiguidade (Seção 23).
     */
    formatDualBadge: function (natureCode, provenanceCode) {
      var n = this.getNatureBadge(natureCode);
      var p = this.getProvenanceBadge(provenanceCode);
      return '<span class="badge-evidence ' + n.cssClass + '" title="' + n.title + '">[' + n.code + ' ' + n.label + ']</span> ' +
             '<span class="badge-provenance ' + p.cssClass + '" title="' + p.title + '">[' + p.code + ' ' + p.label + ']</span>';
    },

    /**
     * Cobertura de evidências por modelo.
     */
    getCoverage: function (modelId) {
      var models = getModelsData();
      var ledger = getLedgerData();
      var cursorRuns = getCursorBenchData();
      var plans = getPlansData();

      var m = models[modelId];
      if (!m) {
        return { totalPct: 0, coveragePercent: 0, measuredFields: 0, derivedFields: 0, specsPct: 0, benchmarksPct: 0, pricingPct: 0, plansPct: 0, sourcesCount: 0, statusText: 'Não catalogado' };
      }

      var specFields = [m.contextWindow, m.maxOutputTokens, m.releaseDate, m.architectureType, m.provider];
      var filledSpecs = specFields.filter(function (f) { return f !== null && f !== undefined && f !== 'N/D'; }).length;
      var specsPct = Math.round((filledSpecs / specFields.length) * 100);

      var lRow = ledger.find(function (l) { return l.modelId === modelId; });
      var cRuns = cursorRuns.filter(function (r) { return r.modelId === modelId; });
      var bCount = cRuns.length + (lRow ? Object.keys(lRow).filter(function (k) { return lRow[k] !== null && typeof lRow[k] === 'number'; }).length : 0);
      var benchmarksPct = Math.min(100, Math.round((bCount / 8) * 100));

      var pStd = m.pricing && m.pricing.standard;
      var pricingFilled = pStd && typeof pStd.input === 'number' && typeof pStd.output === 'number';
      var pricingPct = pricingFilled ? 100 : 50;

      var mPlans = plans.filter(function (p) {
        var str = (p.includedModels || []).join(' ').toLowerCase();
        return str.indexOf(modelId.toLowerCase()) !== -1 || (p.includedModelIds && p.includedModelIds.indexOf(modelId) !== -1);
      });
      var plansPct = mPlans.length > 0 ? 100 : (m.openWeights ? 80 : 60);

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

  // =========================================================================
  // 6. SISTEMA CANÔNICO DE CLAIMS (DomainClaims) - Seções 19, 20, 21, 64, 85
  // Afirmações técnicas rastreáveis com validade e transição para superseded.
  // =========================================================================
  var CLAIMS_DATA = [
    {
      id: 'claim-fable51-cursorbench-1',
      subjectType: 'model',
      subjectId: 'claude-fable-5-1',
      predicate: 'benchmark-leader',
      benchmarkId: 'cursorbench-3.2',
      value: 73.4,
      unit: '%',
      evidenceType: 'M',
      provenanceType: 'I',
      sourceIds: ['cursorbench-sep26'],
      validFrom: '2026-09-01',
      validUntil: null,
      status: 'verified',
      confidence: 'high'
    },
    {
      id: 'claim-fable51-terminal-1',
      subjectType: 'model',
      subjectId: 'claude-fable-5-1',
      predicate: 'benchmark-leader',
      benchmarkId: 'terminal-bench-2.1',
      value: 70.4,
      unit: '%',
      evidenceType: 'M',
      provenanceType: 'I',
      sourceIds: ['terminal-bench-2026'],
      validFrom: '2026-09-01',
      validUntil: null,
      status: 'verified',
      confidence: 'high'
    },
    {
      id: 'claim-opus5-cursorbench-old',
      subjectType: 'model',
      subjectId: 'claude-opus-5',
      predicate: 'benchmark-leader',
      benchmarkId: 'cursorbench-3.2',
      value: 68.4,
      unit: '%',
      evidenceType: 'M',
      provenanceType: 'I',
      sourceIds: ['cursorbench-jun26'],
      validFrom: '2026-06-01',
      validUntil: '2026-09-01',
      status: 'superseded',
      supersededByClaimId: 'claim-fable51-cursorbench-1',
      confidence: 'high'
    },
    {
      id: 'claim-gemini38-speed-leader',
      subjectType: 'model',
      subjectId: 'gemini-3-8-flash',
      predicate: 'throughput-leader',
      benchmarkId: 'decode-speed-tps',
      value: 395.0,
      unit: 'tok/s',
      evidenceType: 'M',
      provenanceType: 'I',
      sourceIds: ['artificial-analysis-aug26'],
      validFrom: '2026-08-15',
      validUntil: null,
      status: 'verified',
      confidence: 'high'
    },
    {
      id: 'claim-gptoss20b-local-leader',
      subjectType: 'model',
      subjectId: 'gpt-oss-20b',
      predicate: 'local-consumer-leader',
      benchmarkId: 'swebench-verified',
      value: 41.2,
      unit: '%',
      evidenceType: 'M',
      provenanceType: 'I',
      sourceIds: ['swe-bench-verified-2026'],
      validFrom: '2026-08-10',
      validUntil: null,
      status: 'verified',
      confidence: 'high'
    },
    {
      id: 'claim-gpt6astra-launch-leader',
      subjectType: 'model',
      subjectId: 'gpt-6-astra',
      predicate: 'benchmark-leader',
      benchmarkId: 'terminal-bench-4.0',
      value: 57.9,
      unit: '%',
      evidenceType: 'M',
      provenanceType: 'O',
      sourceIds: ['openai-gpt6-astra-launch'],
      validFrom: '2026-09-03',
      validUntil: null,
      status: 'verified',
      confidence: 'high'
    },
    {
      id: 'claim-gpt6astra-cyber-critical',
      subjectType: 'model',
      subjectId: 'gpt-6-astra',
      predicate: 'preparedness-tier',
      benchmarkId: 'exploitbench',
      value: 100.0,
      unit: '%',
      evidenceType: 'M',
      provenanceType: 'O',
      sourceIds: ['openai-gpt6-astra-system-card'],
      validFrom: '2026-09-03',
      validUntil: null,
      status: 'verified',
      confidence: 'high'
    },
    {
      id: 'claim-gpt6astra-gdppdf-leader',
      subjectType: 'model',
      subjectId: 'gpt-6-astra',
      predicate: 'benchmark-leader',
      benchmarkId: 'gdp-pdf',
      value: 33.2,
      unit: '%',
      evidenceType: 'M',
      provenanceType: 'I',
      sourceIds: ['aa-index-v42-20260904'],
      validFrom: '2026-09-04',
      validUntil: null,
      status: 'verified',
      confidence: 'high'
    }
  ];

  var DomainClaims = {
    CLAIMS: CLAIMS_DATA,

    getAllClaims: function () {
      return CLAIMS_DATA.slice();
    },

    getClaimsForSubject: function (subjectId) {
      return CLAIMS_DATA.filter(function (c) {
        return c.subjectId === subjectId;
      });
    },

    getClaimsForBenchmark: function (benchmarkId) {
      return CLAIMS_DATA.filter(function (c) {
        return c.benchmarkId === benchmarkId;
      });
    },

    supersedeClaim: function (oldClaimId, newClaimId) {
      var oldClaim = CLAIMS_DATA.find(function (c) { return c.id === oldClaimId; });
      if (oldClaim) {
        oldClaim.status = 'superseded';
        oldClaim.supersededByClaimId = newClaimId;
        oldClaim.validUntil = new Date().toISOString().split('T')[0];
        return true;
      }
      return false;
    }
  };

  // =========================================================================
  // 7. MOTOR DE COMPARAÇÃO INTELIGENTE (DomainComparison) - Seções 25 a 30
  // Confiança da comparação, modelo de referência, Pareto explicável e trade-offs.
  // =========================================================================
  var DomainComparison = {
    /**
     * Calcula dinamicamente o índice de confiança comparativa entre dois modelos.
     * @param {string} modelIdA
     * @param {string} modelIdB
     * @returns {Object} { score, label, sharedBenchmarks, totalComparableMetrics, warnings, coveragePct }
     */
    calculateConfidence: function (modelIdA, modelIdB) {
      var ledger = getLedgerData();
      var cursorRuns = getCursorBenchData();

      var rowA = ledger.find(function (l) { return l.modelId === modelIdA; }) || {};
      var rowB = ledger.find(function (l) { return l.modelId === modelIdB; }) || {};

      var shared = 0;
      var total = 0;
      var warnings = [];

      var benchmarkKeys = ['cursorBench', 'terminalBench21', 'sweBenchVerified', 'deepSwe11', 'aaIndex', 'mcpAtlas', 'osworld', 'gpqaDiamond'];
      benchmarkKeys.forEach(function (k) {
        var hasA = typeof rowA[k] === 'number' && !isNaN(rowA[k]);
        var hasB = typeof rowB[k] === 'number' && !isNaN(rowB[k]);
        if (hasA || hasB) total++;
        if (hasA && hasB) shared++;
      });

      var runsA = cursorRuns.filter(function (r) { return r.modelId === modelIdA; });
      var runsB = cursorRuns.filter(function (r) { return r.modelId === modelIdB; });
      if (runsA.length > 0 && runsB.length > 0) {
        shared += 2;
        total += 2;
      }

      var score = total > 0 ? Math.min(1.0, shared / Math.max(1, total * 0.75)) : 0.3;
      var label = 'low';
      if (score >= 0.8) label = 'high';
      else if (score >= 0.5) label = 'medium';

      if (shared < 3) {
        warnings.push('Poucos benchmarks em comum compartilhados diretamente.');
      }
      if (rowA.openWeights !== rowB.openWeights) {
        warnings.push('Comparando modelo fechado (API comercial) com pesos abertos (on-premise).');
      }

      return {
        score: parseFloat(score.toFixed(2)),
        label: label,
        sharedBenchmarks: shared,
        totalComparableMetrics: total,
        warnings: warnings,
        coveragePct: Math.round(score * 100)
      };
    },

    /**
     * Gera resumo explicativo de trade-offs ao comparar dois modelos (Seção 29).
     * @param {string} refModelId - Modelo de referência
     * @param {string} targetModelId - Modelo comparado
     * @returns {Object}
     */
    getTradeOffSummary: function (refModelId, targetModelId) {
      var models = getModelsData();
      var ledger = getLedgerData();
      var cursorRuns = getCursorBenchData();

      var ref = models[refModelId] || { name: refModelId };
      var target = models[targetModelId] || { name: targetModelId };

      var refRow = ledger.find(function (l) { return l.modelId === refModelId; }) || {};
      var targetRow = ledger.find(function (l) { return l.modelId === targetModelId; }) || {};

      var refRuns = cursorRuns.filter(function (r) { return r.modelId === refModelId; });
      var targetRuns = cursorRuns.filter(function (r) { return r.modelId === targetModelId; });

      var refTopRun = refRuns.slice().sort(function (a, b) { return b.score - a.score; })[0];
      var targetTopRun = targetRuns.slice().sort(function (a, b) { return b.score - a.score; })[0];

      var points = [];

      // 1. Delta no CursorBench ou SWE-bench
      if (refTopRun && targetTopRun) {
        var scoreDiff = targetTopRun.score - refTopRun.score;
        var costDiff = targetTopRun.costUsd - refTopRun.costUsd;
        var costPct = refTopRun.costUsd > 0 ? Math.round((costDiff / refTopRun.costUsd) * 100) : 0;

        if (scoreDiff > 0) {
          points.push('Ganha +' + scoreDiff.toFixed(1) + ' p.p. no CursorBench 3.2 (' + targetTopRun.score.toFixed(1) + '% vs ' + refTopRun.score.toFixed(1) + '%)');
        } else if (scoreDiff < 0) {
          points.push('Perde ' + Math.abs(scoreDiff).toFixed(1) + ' p.p. no CursorBench 3.2 (' + targetTopRun.score.toFixed(1) + '% vs ' + refTopRun.score.toFixed(1) + '%)');
        }

        if (costPct < 0) {
          points.push('Reduz o custo por tarefa em ' + Math.abs(costPct) + '% ($' + targetTopRun.costUsd.toFixed(2) + ' vs $' + refTopRun.costUsd.toFixed(2) + ')');
        } else if (costPct > 0) {
          points.push('Aumenta o custo por tarefa em +' + costPct + '% ($' + targetTopRun.costUsd.toFixed(2) + ' vs $' + refTopRun.costUsd.toFixed(2) + ')');
        }
      }

      // 2. Delta no Terminal-Bench
      if (typeof refRow.terminalBench21 === 'number' && typeof targetRow.terminalBench21 === 'number') {
        var tDiff = targetRow.terminalBench21 - refRow.terminalBench21;
        if (Math.abs(tDiff) >= 0.5) {
          points.push((tDiff > 0 ? 'Superior' : 'Inferior') + ' em Terminal-Bench 2.1 (' + (tDiff > 0 ? '+' : '') + tDiff.toFixed(1) + ' p.p.)');
        }
      }

      // 3. Janela de contexto
      if (ref.contextWindow && target.contextWindow && ref.contextWindow !== target.contextWindow) {
        points.push('Janela de contexto: ' + target.contextWindow + ' vs ' + ref.contextWindow);
      }

      return {
        referenceName: ref.name,
        targetName: target.name,
        bullets: points,
        summaryText: points.length > 0 ? points.join(' · ') : 'Desempenho equivalente nas métricas comparáveis.'
      };
    },

    /**
     * Explica matematicamente a fronteira de Pareto (Seção 30).
     */
    getParetoExplanation: function (modelId) {
      var cursorRuns = getCursorBenchData();
      var myRuns = cursorRuns.filter(function (r) { return r.modelId === modelId; });
      if (myRuns.length === 0) {
        return { isPareto: false, explanation: 'Sem dados suficientes no CursorBench para determinar fronteira.' };
      }

      var bestRun = myRuns.slice().sort(function (a, b) { return b.score - a.score; })[0];

      var dominators = cursorRuns.filter(function (r) {
        if (r.modelId === modelId) return false;
        return r.score >= bestRun.score && r.costUsd < bestRun.costUsd;
      });

      var isPareto = dominators.length === 0;

      var explanation = isPareto
        ? 'Este modelo pertence à fronteira de Pareto porque nenhum outro modelo combina simultaneamente pontuação superior (≥ ' + bestRun.score.toFixed(1) + '%) com custo inferior (< $' + bestRun.costUsd.toFixed(2) + ').'
        : 'Este modelo não está na fronteira estrita pois é dominado por alternativas que atingem pontuação igual ou maior com menor custo computacional.';

      return {
        isPareto: isPareto,
        score: bestRun.score,
        costUsd: bestRun.costUsd,
        dominatorsCount: dominators.length,
        explanation: explanation
      };
    }
  };

  // =========================================================================
  // 8. DATA HEALTH & REVIEW QUEUE (DomainHealth) - Seções 43 a 47
  // Auditoria contínua da base: frescor por domínio, referências órfãs e claims.
  // =========================================================================
  var DomainHealth = {
    getHealthSummary: function (options) {
      var models = getModelsData();
      var plans = getPlansData();
      var cursorRuns = getCursorBenchData();
      var sources = getSourcesData();
      var claims = CLAIMS_DATA;

      var opts = options || {};
      var now = opts.now ? new Date(opts.now) : new Date();

      var stats = {
        totalEntities: Object.keys(models).length + plans.length + claims.length + Object.keys(sources).length,
        freshCount: 0,
        agingCount: 0,
        staleCount: 0,
        unknownCount: 0,
        missingSourcesCount: 0,
        orphanReferencesCount: 0,
        supersededClaimsCount: 0,
        disputedClaimsCount: 0,
        domains: {}
      };

      // 1. Frescor em Modelos
      var modelFreshnesses = Object.values(models).map(function (m) {
        return DomainFreshness.getFreshness(m.releaseDate, { now: now, domain: 'specs' });
      });
      stats.domains.specs = computeDomainStat(modelFreshnesses);

      // 2. Frescor em Benchmarks
      var benchFreshnesses = cursorRuns.map(function (r) {
        return DomainFreshness.getFreshness(r.verifiedAt || null, { now: now, domain: 'benchmarks' });
      });
      stats.domains.benchmarks = computeDomainStat(benchFreshnesses);

      // 3. Frescor em Planos
      var planFreshnesses = plans.map(function (p) {
        return DomainFreshness.getFreshness(p.verifiedAt || null, { now: now, domain: 'plans' });
      });
      stats.domains.plans = computeDomainStat(planFreshnesses);

      // 4. Checagem de Fontes Faltantes e Referências Órfãs
      Object.values(models).forEach(function (m) {
        if (!m.sources || m.sources.length === 0) stats.missingSourcesCount++;
      });

      cursorRuns.forEach(function (r) {
        if (!models[r.modelId]) stats.orphanReferencesCount++;
      });

      // 5. Claims
      claims.forEach(function (c) {
        if (c.status === 'superseded') stats.supersededClaimsCount++;
        if (c.status === 'disputed') stats.disputedClaimsCount++;
      });

      // Total agregador
      var allFresh = [].concat(modelFreshnesses, benchFreshnesses, planFreshnesses);
      allFresh.forEach(function (f) {
        if (f.status === 'fresh') stats.freshCount++;
        else if (f.status === 'aging') stats.agingCount++;
        else if (f.status === 'stale') stats.staleCount++;
        else stats.unknownCount++;
      });

      var totalEvaluated = allFresh.length || 1;
      stats.freshnessRate = Math.round((stats.freshCount / totalEvaluated) * 100);

      return stats;
    },

    getReviewQueue: function () {
      var queue = [];
      var models = getModelsData();
      var todayStr = (new Date()).toISOString().split('T')[0];

      Object.values(models).forEach(function (m) {
        if (!m.sources || m.sources.length === 0) {
          queue.push({
            entityType: 'model',
            entityId: m.id,
            issueType: 'missing-source',
            severity: 'medium',
            detectedAt: todayStr,
            message: 'Modelo sem fontes formais auditadas cadastradas no array de sources.',
            sourceIds: []
          });
        }
      });

      CLAIMS_DATA.forEach(function (c) {
        if (c.status === 'superseded') {
          queue.push({
            entityType: 'claim',
            entityId: c.id,
            issueType: 'superseded-claim',
            severity: 'low',
            detectedAt: todayStr,
            message: 'Afirmação técnica substituída por ' + (c.supersededByClaimId || 'nova run') + '.',
            sourceIds: c.sourceIds
          });
        }
      });

      return queue;
    }
  };

  function computeDomainStat(freshList) {
    var fresh = 0;
    var total = freshList.length || 1;
    freshList.forEach(function (f) {
      if (f.status === 'fresh') fresh++;
    });
    return {
      total: freshList.length,
      fresh: fresh,
      pct: Math.round((fresh / total) * 100)
    };
  }

  // =========================================================================
  // 9. MOTOR DE IMPACTO DETERMINÍSTICO (DomainImpact) - Seções 48 a 52, 86, 87
  // Calcula o que muda (leaders, deltas, awards, claims) ao adicionar modelo ou run.
  // =========================================================================
  var DomainImpact = {
    /**
     * Simula a adição de uma nova execução de benchmark e calcula o impacto determinístico.
     * @param {Object} newRun - { benchmarkKey, modelId, modelName, score, costUsd, effort }
     * @returns {Object} { leaderChanged, oldLeader, newLeader, awardChanges, supersededClaims, impactedUseCases }
     */
    simulateNewRun: function (newRun) {
      var currentLeader = DomainRankings.getBenchmarkLeader(newRun.benchmarkKey || 'cursorBench');
      var leaderChanged = false;
      var oldLeader = currentLeader ? { modelId: currentLeader.modelId, score: currentLeader.score } : null;

      if (!currentLeader || (newRun.score > currentLeader.score)) {
        leaderChanged = true;
      }

      var supersededClaims = [];
      if (leaderChanged && currentLeader) {
        supersededClaims.push({
          claimPredicate: 'benchmark-leader',
          previousModelId: currentLeader.modelId,
          supersededByModelId: newRun.modelId,
          benchmark: newRun.benchmarkKey || 'cursorBench'
        });
      }

      var awardChanges = [];
      if (leaderChanged) {
        awardChanges.push({
          awardId: 'award-frontier-leader',
          previousWinner: currentLeader ? currentLeader.modelId : null,
          newWinner: newRun.modelId,
          newMetric: newRun.score.toFixed(1) + '%'
        });
      }

      return {
        leaderChanged: leaderChanged,
        benchmarkKey: newRun.benchmarkKey || 'cursorBench',
        oldLeader: oldLeader,
        newLeader: { modelId: newRun.modelId, score: newRun.score },
        awardChanges: awardChanges,
        supersededClaims: supersededClaims,
        impactedUseCases: ['agentic-workflow', 'code-review', 'terminal-execution']
      };
    },

    /**
     * Simula a adição de um novo modelo de IA na plataforma (Seção 87).
     * @param {Object} modelSpec - { id, name, provider, releaseDate }
     * @param {Array<Object>} sampleRuns - Execuções de benchmark do novo modelo
     * @returns {Object}
     */
    simulateNewModel: function (modelSpec, sampleRuns) {
      var impacts = [];
      (sampleRuns || []).forEach(function (run) {
        var runImpact = DomainImpact.simulateNewRun(Object.assign({}, run, { modelId: modelSpec.id, modelName: modelSpec.name }));
        if (runImpact.leaderChanged) {
          impacts.push(runImpact);
        }
      });

      return {
        modelId: modelSpec.id,
        modelName: modelSpec.name,
        totalRunsEvaluated: (sampleRuns || []).length,
        isNewOverallLeader: impacts.some(function (i) { return i.benchmarkKey === 'cursorBench'; }),
        disruptedBenchmarks: impacts.map(function (i) { return i.benchmarkKey; }),
        impactReports: impacts
      };
    }
  };

  // =========================================================================
  // 10. MOTOR DE ENTIDADES & ESTATÍSTICAS (DomainEntities) - Seção 9, 38, 39
  // Resolução canônica de modelos, planos, provedores e plataformas sem hardcode.
  // =========================================================================
  var DomainEntities = {
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

    resolveProvider: function (providerId) {
      var providers = getProvidersData();
      return providers[providerId] || {
        id: providerId,
        name: providerId,
        logo: '⚡',
        website: '#'
      };
    },

    resolvePlatform: function (platformId) {
      var platforms = getPlatformsData();
      return platforms[platformId] || {
        id: platformId,
        name: platformId,
        type: 'service',
        category: 'cloud'
      };
    },

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

    getRecentHistoryFeed: function (limit) {
      var history = getHistoryData();
      var max = typeof limit === 'number' ? limit : 6;
      var events = (history && history.events) ? history.events.slice() : [];

      return events.sort(function (a, b) {
        return new Date(b.date || '2026-01-01').getTime() - new Date(a.date || '2026-01-01').getTime();
      }).slice(0, max);
    },

    /**
     * Retorna estatísticas reais e dinâmicas do catálogo global (Seção 9).
     * @returns {Object}
     */
    getCatalogStats: function () {
      var models = getModelsData();
      var plans = getPlansData();
      var cursorRuns = getCursorBenchData();
      var history = getHistoryData();
      var providers = getProvidersData();
      var platforms = getPlatformsData();
      var sources = getSourcesData();

      var modelIds = Object.keys(models);
      var modelValues = Object.values(models);
      var activeCount = modelValues.filter(function (m) {
        var st = (m.lifecycleStatus || m.status || '').toLowerCase();
        return st !== 'legacy' && st !== 'superseded' && st !== 'retired';
      }).length;

      var histCount = (history && history.models) ? history.models.length : 0;
      var planCount = Array.isArray(plans) ? plans.length : 0;
      var runCount = Array.isArray(cursorRuns) ? cursorRuns.length : 0;
      var provCount = Object.keys(providers).length;
      var platCount = Object.keys(platforms).length;
      var srcCount = Object.keys(sources).length;

      return {
        modelCount: modelIds.length,
        totalModels: modelIds.length,
        activeModelCount: activeCount,
        frontierModels: activeCount,
        historicalModelCount: histCount,
        planCount: planCount,
        totalPlans: planCount,
        benchmarkRunCount: runCount,
        totalRuns: runCount,
        sourceCount: srcCount,
        providerCount: provCount,
        platformCount: platCount
      };
    },

    getConfigurationsForModel: function (modelId) {
      return MODEL_CONFIGURATIONS_DATA.filter(function (c) {
        return c.modelId === modelId;
      });
    },

    getOfferingsForModel: function (modelId) {
      return CANONICAL_OFFERINGS_DATA.filter(function (o) {
        return o.modelId === modelId;
      });
    },

    getOfferingsByPlatform: function (platformId) {
      return CANONICAL_OFFERINGS_DATA.filter(function (o) {
        return o.platformId === platformId;
      });
    },

    getAvailability: function (modelId, platformId) {
      return NORMALIZED_AVAILABILITY_DATA.filter(function (a) {
        return (!modelId || a.modelId === modelId) && (!platformId || a.platformId === platformId);
      });
    }
  };

  // =========================================================================
  // 11. SCHEMAS FORMAIS: ModelConfiguration, Offering & Availability (Seções 16, 17, 18, 58)
  // =========================================================================
  var MODEL_CONFIGURATIONS_DATA = [
    { id: 'gpt-6-astra:low', modelId: 'gpt-6-astra', reasoningMode: 'explicit', effort: 'low', contextWindow: 1050000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gpt-6-astra:medium', modelId: 'gpt-6-astra', reasoningMode: 'explicit', effort: 'medium', contextWindow: 1050000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gpt-6-astra:high', modelId: 'gpt-6-astra', reasoningMode: 'explicit', effort: 'high', contextWindow: 1050000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gpt-6-astra:xhigh', modelId: 'gpt-6-astra', reasoningMode: 'explicit', effort: 'xhigh', contextWindow: 1050000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gpt-6-astra:max', modelId: 'gpt-6-astra', reasoningMode: 'explicit', effort: 'max', contextWindow: 1050000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'claude-fable-5-1:max', modelId: 'claude-fable-5-1', reasoningMode: 'adaptive', effort: 'max', contextWindow: 1000000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'claude-fable-5-1:xhigh', modelId: 'claude-fable-5-1', reasoningMode: 'adaptive', effort: 'xhigh', contextWindow: 1000000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'claude-fable-5-1:high', modelId: 'claude-fable-5-1', reasoningMode: 'adaptive', effort: 'high', contextWindow: 1000000, maxOutputTokens: 64000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'claude-opus-5:standard', modelId: 'claude-opus-5', reasoningMode: 'adaptive', effort: 'high', contextWindow: 1000000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'claude-sonnet-5:standard', modelId: 'claude-sonnet-5', reasoningMode: 'adaptive', effort: 'medium', contextWindow: 1000000, maxOutputTokens: 64000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gpt-5-6-sol:max', modelId: 'gpt-5-6-sol', reasoningMode: 'explicit', effort: 'max', contextWindow: 1000000, maxOutputTokens: 128000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gpt-5-6-terra:standard', modelId: 'gpt-5-6-terra', reasoningMode: 'adaptive', effort: 'medium', contextWindow: 1000000, maxOutputTokens: 64000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gpt-5-6-luna:standard', modelId: 'gpt-5-6-luna', reasoningMode: 'none', effort: 'none', contextWindow: 1000000, maxOutputTokens: 32000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gemini-3-8-flash:high', modelId: 'gemini-3-8-flash', reasoningMode: 'dynamic', effort: 'high', contextWindow: 1000000, maxOutputTokens: 64000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'gemini-3-8-flash:medium', modelId: 'gemini-3-8-flash', reasoningMode: 'dynamic', effort: 'medium', contextWindow: 1000000, maxOutputTokens: 64000, temperature: null, tools: true, fallbackPolicy: 'default' },
    { id: 'glm-5-3-flash:standard', modelId: 'glm-5-3-flash', reasoningMode: 'standard', effort: 'none', contextWindow: 1000000, maxOutputTokens: 64000, temperature: 0.7, tools: true, fallbackPolicy: 'default' },
    { id: 'deepseek-v4-pro-0813:standard', modelId: 'deepseek-v4-pro-0813', reasoningMode: 'deep-thinking', effort: 'high', contextWindow: 1000000, maxOutputTokens: 64000, temperature: null, tools: true, fallbackPolicy: 'default' }
  ];

  var CANONICAL_OFFERINGS_DATA = [
    { id: 'openai-api:gpt-6-astra', modelId: 'gpt-6-astra', providerId: 'openai', platformId: 'openai-api', apiModelId: 'gpt-6-astra', region: 'global', accessType: 'metered', availableFrom: '2026-09-03', availableUntil: null },
    { id: 'chatgpt:gpt-6-pro', modelId: 'gpt-6-astra', providerId: 'openai', platformId: 'chatgpt', apiModelId: 'gpt-6-pro', region: 'global', accessType: 'subscription_quota', availableFrom: '2026-09-03', availableUntil: null },
    { id: 'cursor:gpt-6-astra', modelId: 'gpt-6-astra', providerId: 'openai', platformId: 'cursor', apiModelId: 'gpt-6-astra', region: 'global', accessType: 'quota_burn', multiplier: 2, availableFrom: '2026-09-03', availableUntil: null },
    { id: 'codex:gpt-6-astra', modelId: 'gpt-6-astra', providerId: 'openai', platformId: 'codex', apiModelId: 'gpt-6-astra', region: 'global', accessType: 'credit_allowance', availableFrom: '2026-09-03', availableUntil: null },
    { id: 'anthropic-api:claude-fable-5-1', modelId: 'claude-fable-5-1', providerId: 'anthropic', platformId: 'anthropic-api', apiModelId: 'claude-fable-5-1', region: 'global', accessType: 'metered', availableFrom: '2026-09-01', availableUntil: null },
    { id: 'cursor:claude-fable-5-1', modelId: 'claude-fable-5-1', providerId: 'anthropic', platformId: 'cursor', apiModelId: 'claude-fable-5.1', region: 'global', accessType: 'quota_burn', multiplier: 4, availableFrom: '2026-09-01', availableUntil: null },
    { id: 'opencode:claude-fable-5-1', modelId: 'claude-fable-5-1', providerId: 'anthropic', platformId: 'opencode', apiModelId: 'claude-fable-5-1', region: 'global', accessType: 'quota_burn', multiplier: 4, availableFrom: '2026-09-01', availableUntil: null },
    { id: 'openai-api:gpt-5-6-sol', modelId: 'gpt-5-6-sol', providerId: 'openai', platformId: 'openai-api', apiModelId: 'gpt-5.6-sol', region: 'global', accessType: 'metered', availableFrom: '2026-02-16', availableUntil: null },
    { id: 'cursor:gpt-5-6-sol', modelId: 'gpt-5-6-sol', providerId: 'openai', platformId: 'cursor', apiModelId: 'gpt-5.6-sol', region: 'global', accessType: 'quota_burn', multiplier: 2, availableFrom: '2026-02-16', availableUntil: null },
    { id: 'google-api:gemini-3-8-flash', modelId: 'gemini-3-8-flash', providerId: 'google', platformId: 'google-vertex', apiModelId: 'gemini-3.8-flash', region: 'global', accessType: 'metered', availableFrom: '2026-09-02', availableUntil: null },
    { id: 'antigravity:gemini-3-8-flash', modelId: 'gemini-3-8-flash', providerId: 'google', platformId: 'antigravity', apiModelId: 'gemini-3.8-flash-thinking', region: 'global', accessType: 'pool_quota', availableFrom: '2026-09-02', availableUntil: null },
    { id: 'zai-api:glm-5-3-flash', modelId: 'glm-5-3-flash', providerId: 'zai', platformId: 'zai-open-platform', apiModelId: 'glm-5.3-flash', region: 'global', accessType: 'metered', availableFrom: '2026-08-26', availableUntil: null },
    { id: 'openrouter:glm-5-3-flash', modelId: 'glm-5-3-flash', providerId: 'zai', platformId: 'openrouter', apiModelId: 'z-ai/glm-5.3-flash', region: 'global', accessType: 'metered', availableFrom: '2026-08-20', availableUntil: null },
    { id: 'local:glm-5-3-flash', modelId: 'glm-5-3-flash', providerId: 'zai', platformId: 'local', apiModelId: 'glm-5.3-flash', region: 'global', accessType: 'free_weights', availableFrom: '2026-08-26', availableUntil: null }
  ];

  var NORMALIZED_AVAILABILITY_DATA = [
    { modelId: 'gpt-6-astra', platformId: 'openai-api', status: 'active', region: 'global', availableFrom: '2026-09-03', offeringId: 'openai-api:gpt-6-astra', planIds: [], sourceId: 'openai-gpt6-astra-api', verifiedAt: '2026-09-03' },
    { modelId: 'gpt-6-astra', platformId: 'chatgpt', status: 'active', region: 'global', availableFrom: '2026-09-03', offeringId: 'chatgpt:gpt-6-pro', planIds: ['openai-chatgpt-pro-5x', 'openai-chatgpt-pro-20x', 'openai-chatgpt-business-standard', 'openai-chatgpt-business-premium', 'openai-chatgpt-enterprise'], sourceId: 'openai-gpt6-astra-launch', verifiedAt: '2026-09-03' },
    { modelId: 'gpt-6-astra', platformId: 'cursor', status: 'active', region: 'global', availableFrom: '2026-09-03', offeringId: 'cursor:gpt-6-astra', planIds: ['cursor-pro', 'cursor-business'], sourceId: 'cursor-pricing-astra-2026', verifiedAt: '2026-09-03' },
    { modelId: 'claude-fable-5-1', platformId: 'anthropic-api', status: 'active', region: 'global', availableFrom: '2026-09-01', offeringId: 'anthropic-api:claude-fable-5-1', planIds: [], sourceId: 'anthropic-claude-fable-51', verifiedAt: '2026-09-01' },
    { modelId: 'claude-fable-5-1', platformId: 'cursor', status: 'active', region: 'global', availableFrom: '2026-09-01', offeringId: 'cursor:claude-fable-5-1', planIds: ['cursor-pro', 'cursor-business'], sourceId: 'cursor-official', verifiedAt: '2026-09-01' },
    { modelId: 'gemini-3-8-flash', platformId: 'google-vertex', status: 'active', region: 'global', availableFrom: '2026-09-02', offeringId: 'google-api:gemini-3-8-flash', planIds: [], sourceId: 'google-deepmind-gemini-38', verifiedAt: '2026-09-02' },
    { modelId: 'gemini-3-8-flash', platformId: 'antigravity', status: 'active', region: 'global', availableFrom: '2026-09-02', offeringId: 'antigravity:gemini-3-8-flash', planIds: ['google-one-ai-pro', 'google-one-ai-ultra'], sourceId: 'antigravity-pools', verifiedAt: '2026-09-02' },
    { modelId: 'glm-5-3-flash', platformId: 'local', status: 'active', region: 'global', availableFrom: '2026-08-26', offeringId: 'local:glm-5-3-flash', planIds: [], sourceId: 'zai-glm-53-flash', verifiedAt: '2026-08-26' }
  ];

  return {
    DomainRankings: DomainRankings,
    DomainEvidence: DomainEvidence,
    DomainFreshness: DomainFreshness,
    DomainEntities: DomainEntities,
    DomainRegistry: DomainRegistry,
    DomainClaims: DomainClaims,
    DomainComparison: DomainComparison,
    DomainHealth: DomainHealth,
    DomainImpact: DomainImpact,
    MODEL_CONFIGURATIONS_DATA: MODEL_CONFIGURATIONS_DATA,
    CANONICAL_OFFERINGS_DATA: CANONICAL_OFFERINGS_DATA,
    NORMALIZED_AVAILABILITY_DATA: NORMALIZED_AVAILABILITY_DATA
  };
}));
