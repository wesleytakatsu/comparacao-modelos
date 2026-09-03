/**
 * DATA PACK: LINHAGENS HISTÓRICAS & HISTÓRICO DE BENCHMARKS (MODEL HISTORY)
 * Data de Referência: 03/09/2026
 */

const MODEL_HISTORY_DATA = {
  lineages: [
    {
      familyId: 'anthropic-fable',
      familyName: 'Anthropic Claude Fable (Ultra-Reasoning)',
      description: 'Linhagem de raciocínio profundo e planejamento agêntico líder da Anthropic.',
      nodes: [
        { modelId: 'claude-fable-5', name: 'Claude Fable 5', releaseDate: '2026-05-15', status: 'superseded', notes: 'Primeiro modelo da classe Fable; 70,5% CursorBench Max, tarifa $10/$50, cache read $1,00/M.' },
        { modelId: 'claude-fable-5-1', name: 'Claude Fable 5.1', releaseDate: '2026-09-01', status: 'active', notes: 'Atual líder absoluto: 73,4% CursorBench Max ($9,64/task), AA Index 66, cache read reduzido em 75% ($0,25/M).' }
      ],
      connections: [
        { from: 'claude-fable-5', to: 'claude-fable-5-1', changeType: 'generational-upgrade', improvements: 'CursorBench +2.9pp, custo por tarefa reduzido em 44%, cache read -75%, saída de 128k.' }
      ]
    },
    {
      familyId: 'anthropic-core',
      familyName: 'Anthropic Claude Core (Opus & Sonnet)',
      description: 'Evolução da arquitetura frontier híbrida da Anthropic de 4.6 para 5.',
      nodes: [
        { modelId: 'claude-opus-4-6', name: 'Claude Opus 4.6', releaseDate: '2026-02-05', status: 'legacy', notes: 'Raciocínio adaptativo 1M, tarifa $5/$25, mantido em produção.' },
        { modelId: 'claude-opus-5', name: 'Claude Opus 5', releaseDate: '2026-06-12', status: 'active', notes: 'Frontier 1M com saída expandida de 128k e tarifa $5/$25.' },
        { modelId: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', releaseDate: '2026-02-17', status: 'legacy', notes: 'Workhorse balanceado de geração anterior.' },
        { modelId: 'claude-sonnet-5', name: 'Claude Sonnet 5', releaseDate: '2026-06-20', status: 'active', notes: 'Novo padrão de custo-benefício intermediário ($2/$10).' },
        { modelId: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', releaseDate: '2025-10-15', status: 'active', notes: 'Subagente de alta velocidade sem sucessor anunciado no catálogo.' }
      ],
      connections: [
        { from: 'claude-opus-4-6', to: 'claude-opus-5', changeType: 'generational-upgrade', improvements: 'Janela de saída para 128k, cutoff Maio/2026.' },
        { from: 'claude-sonnet-4-6', to: 'claude-sonnet-5', changeType: 'generational-upgrade', improvements: 'Redução de preço para $2/$10, melhoria no SWE-bench Verified.' }
      ]
    },
    {
      familyId: 'google-gemini-flash',
      familyName: 'Google DeepMind Gemini Flash Series',
      description: 'Evolução geracional de modelos Flash multimodais de 1 milhão de tokens.',
      nodes: [
        { modelId: 'gemini-3-5-flash', name: 'Gemini 3.5 Flash', releaseDate: '2025-11-20', status: 'stable', notes: 'Primeiro flash com 1M e custo sub-dólar.' },
        { modelId: 'gemini-3-7-flash', name: 'Gemini 3.7 Flash', releaseDate: '2026-03-10', status: 'predecessor', notes: 'Introdução do thinking dinâmico e 85,8% Terminal-Bench 2.1.' },
        { modelId: 'gemini-3-8-flash', name: 'Gemini 3.8 Flash', releaseDate: '2026-09-02', status: 'active', notes: '90,8% Terminal-Bench 2.1, 74,0% DeepSWE, maior autonomia agentic e 305 tok/s.' }
      ],
      connections: [
        { from: 'gemini-3-5-flash', to: 'gemini-3-7-flash', changeType: 'reasoning-addition', improvements: 'Thinking configurável Low/Med/High.' },
        { from: 'gemini-3-7-flash', to: 'gemini-3-8-flash', changeType: 'agentic-breakthrough', improvements: 'Terminal-Bench 2.1 saltou de 85,8% para 90,8%; DeepSWE atingiu 74,0%.' }
      ]
    },
    {
      familyId: 'zai-glm',
      familyName: 'Z.ai GLM Architecture Tree',
      description: 'Linhagem de modelos abertos e MoE da Zhipu AI com ramificação de eficiência.',
      nodes: [
        { modelId: 'glm-5-1', name: 'GLM-5.1', releaseDate: '2025-12-05', status: 'legacy', notes: 'MoE aberto 600B com 200k de contexto.' },
        { modelId: 'glm-5-2', name: 'GLM-5.2', releaseDate: '2026-03-22', status: 'stable', notes: 'Expansão para 1M de contexto e 750B MoE.' },
        { modelId: 'glm-5-3', name: 'GLM-5.3', releaseDate: '2026-07-15', status: 'active', notes: 'Frontier de 753B MoE (40B ativos), AA Index ~60.' },
        { modelId: 'glm-5-3-flash', name: 'GLM-5.3-Flash (ex-Ox Alpha)', releaseDate: '2026-08-26', status: 'active', notes: 'MoE 320B (18B ativos), licença MIT, Sparse-Linear Attention, testado anonimamente como Ox Alpha.' }
      ],
      connections: [
        { from: 'glm-5-1', to: 'glm-5-2', changeType: 'context-scaling', improvements: '1M de contexto nativo.' },
        { from: 'glm-5-2', to: 'glm-5-3', changeType: 'capacity-boost', improvements: 'Raciocínio mandatório de alta densidade.' },
        { from: 'glm-5-2', to: 'glm-5-3-flash', changeType: 'efficiency-branch', improvements: 'Primeiro GLM-5 nativamente multimodal com 45 camadas e licença permissiva MIT.' }
      ]
    },
    {
      familyId: 'openai-gpt56',
      familyName: 'OpenAI GPT-5.6 Generation',
      description: 'Geração proprietária e open-weights da OpenAI.',
      nodes: [
        { modelId: 'gpt-5-5-preview', name: 'GPT-5.5 Preview', releaseDate: '2025-11-10', status: 'superseded', notes: 'Snapshot preliminar do protocolo responses.' },
        { modelId: 'gpt-5-6-sol', name: 'GPT-5.6 Sol', releaseDate: '2026-02-16', status: 'active', notes: 'Frontier de extrema precisão lógica e edge cases financeiros.' },
        { modelId: 'gpt-5-6-terra', name: 'GPT-5.6 Terra', releaseDate: '2026-02-16', status: 'active', notes: 'Tier balanceado ($2/$12) para desenvolvimento diário robusto.' },
        { modelId: 'gpt-5-6-luna', name: 'GPT-5.6 Luna', releaseDate: '2026-02-16', status: 'active', notes: 'Ultra-econômico ($0,20/$1,20) para subagentes e alto volume.' },
        { modelId: 'gpt-oss-20b', name: 'gpt-oss-20b', releaseDate: '2026-07-01', status: 'active', notes: 'Open-weights oficial Apache 2.0 para 16GB VRAM.' }
      ],
      connections: [
        { from: 'gpt-5-5-preview', to: 'gpt-5-6-sol', changeType: 'full-release', improvements: 'Raciocínio XHigh/Max com MRCR v2.' },
        { from: 'gpt-5-5-preview', to: 'gpt-5-6-terra', changeType: 'full-release', improvements: 'Daily driver com melhor relação custo/performance.' }
      ]
    }
  ],

  events: [
    {
      date: '2026-09-02',
      modelId: 'gemini-3-8-flash',
      type: 'release',
      title: 'Google lança Gemini 3.8 Flash',
      description: 'Google DeepMind oficializa o Gemini 3.8 Flash com 90,8% no Terminal-Bench 2.1, 74,0% no DeepSWE 1.1 e 305 tok/s de throughput.',
      sourceId: 'google-deepmind-gemini-38'
    },
    {
      date: '2026-09-01',
      modelId: 'claude-fable-5-1',
      type: 'release',
      title: 'Anthropic anuncia Claude Fable 5.1',
      description: 'Lançamento do Claude Fable 5.1 estabelecendo novos recordes: 73,4% no CursorBench Max e score 66 no Artificial Analysis Intelligence Index.',
      sourceId: 'anthropic-claude-fable-51'
    },
    {
      date: '2026-09-01',
      modelId: 'claude-fable-5',
      type: 'superseded',
      title: 'Claude Fable 5 passa para status superseded',
      description: 'Com a chegada do Fable 5.1 (que reduz o custo de cache em 75% e melhora os scores), Fable 5 é mantido para fins históricos e geracionais.',
      sourceId: 'anthropic-claude-fable-51'
    },
    {
      date: '2026-08-26',
      modelId: 'glm-5-3-flash',
      type: 'identity-reveal',
      title: 'Z.ai revela Ox Alpha como GLM-5.3-Flash',
      description: 'A Z.ai encerra o regime anônimo no OpenCode e OpenRouter, confirmando que o modelo stealth Ox Alpha é o GLM-5.3-Flash sob licença MIT.',
      sourceId: 'zai-glm-53-flash'
    },
    {
      date: '2026-08-26',
      modelId: 'glm-5-3-flash',
      type: 'weights-released',
      title: 'Liberação de Pesos Abertos (MIT)',
      description: 'Disponibilização pública dos checkpoints do MoE de 320B (18B ativos) no HuggingFace e plataformas de inferência aberta.',
      sourceId: 'zai-glm-53-flash'
    },
    {
      date: '2026-08-26',
      modelId: 'glm-5-3-flash',
      type: 'pricing-change',
      title: 'Encerramento do Preview Gratuito e Promoção 50%',
      description: 'O endpoint gratuito de testes é descontinuado e substituído por pricing oficial com 50% de desconto promocional ($0,075 in / $0,25 out).',
      sourceId: 'zai-glm-53-flash'
    },
    {
      date: '2026-08-20',
      modelId: 'glm-5-3-flash',
      type: 'stealth-preview',
      title: 'Surge anonimamente o modelo Ox Alpha',
      description: 'Modelo de 1M de contexto surge em regime stealth sem identificação de fabricante no OpenRouter e OpenCode Go.',
      sourceId: 'deepswe-datacurve'
    },
    {
      date: '2026-08-14',
      modelId: 'grok-4-6',
      type: 'benchmark-update',
      title: 'Avaliação Comunitária: Grok 4.6 vs GPT-5.6 Sol',
      description: 'Discussões no r/cursor comparam Grok 4.6 e Sol em refatorações de ~2.5k LOC com preferência dividida (concorrência Sol vs velocidade Grok).',
      sourceId: 'community-reddit-cursor'
    },
    {
      date: '2026-07-15',
      modelId: 'glm-5-3',
      type: 'release',
      title: 'Z.ai oficializa GLM-5.3 Full',
      description: 'Lançamento do modelo frontier completo de 753B parâmetros com raciocínio mandatório.',
      sourceId: 'zai-glm-53-flash'
    },
    {
      date: '2026-07-01',
      modelId: 'gpt-oss-20b',
      type: 'weights-released',
      title: 'OpenAI lança modelos gpt-oss abertos',
      description: 'OpenAI surpreende a comunidade liberando pesos abertos sob licença Apache 2.0 (gpt-oss-20b e gpt-oss-120b).',
      sourceId: 'openai-gpt56'
    }
  ]
};

const BENCHMARK_HISTORY_DATA = [
  {
    modelId: 'gemini-3-8-flash',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1',
    date: '2026-09-02',
    score: 74.0,
    confidenceInterval: 1.0,
    costPerTaskUsd: 2.36,
    tokensPerTask: 143000,
    agentSteps: 166,
    sourceId: 'deepswe-datacurve',
    sourceType: 'independent',
    notes: 'Avaliação independente de 113 tarefas do DeepSWE 1.1 demonstrando altíssima autonomia e persistência.'
  },
  {
    modelId: 'gemini-3-8-flash',
    benchmark: 'Terminal-Bench',
    benchmarkVersion: '2.1',
    date: '2026-09-02',
    score: 90.8,
    confidenceInterval: null,
    costPerTaskUsd: null,
    tokensPerTask: null,
    agentSteps: null,
    sourceId: 'google-deepmind-gemini-38',
    sourceType: 'official',
    notes: 'Model Card oficial Google DeepMind: salto de +5,0 pp em relação ao Gemini 3.7 Flash.'
  },
  {
    modelId: 'claude-fable-5-1',
    benchmark: 'CursorBench',
    benchmarkVersion: '3.2',
    date: '2026-09-01',
    score: 73.4,
    confidenceInterval: null,
    costPerTaskUsd: 9.64,
    tokensPerTask: 72060,
    agentSteps: 70,
    sourceId: 'cursorbench-32',
    sourceType: 'independent',
    notes: 'Novo #1 do CursorBench no esforço Max. No XHigh alcançou 72,8% com $6,96/task.'
  },
  {
    modelId: 'claude-fable-5',
    benchmark: 'CursorBench',
    benchmarkVersion: '3.2',
    date: '2026-06-15',
    score: 70.5,
    confidenceInterval: null,
    costPerTaskUsd: 17.32,
    tokensPerTask: 103525,
    agentSteps: 85,
    sourceId: 'cursorbench-32',
    sourceType: 'independent',
    notes: 'Resultado histórico do Fable 5 predecessor antes das otimizações do 5.1.'
  },
  {
    modelId: 'glm-5-3-flash',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1 (Stealth Preview)',
    date: '2026-08-22',
    score: 58.4,
    confidenceInterval: null,
    costPerTaskUsd: 0.00,
    tokensPerTask: 73000,
    agentSteps: 123,
    sourceId: 'deepswe-datacurve',
    sourceType: 'independent',
    notes: 'Score preliminar obtido durante a fase de testes anônimos como Ox Alpha no OpenRouter (66/113 resolvidas).'
  },
  {
    modelId: 'glm-5-3-flash',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1 (Release Oficial)',
    date: '2026-08-26',
    score: 63.4,
    confidenceInterval: 4.0,
    costPerTaskUsd: 0.24,
    tokensPerTask: 73000,
    agentSteps: 123,
    sourceId: 'zai-glm-53-flash',
    sourceType: 'official',
    notes: 'Avaliação da versão final de lançamento com harness otimizado e correção de parsing.'
  },
  {
    modelId: 'gpt-5-6-sol',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1',
    date: '2026-07-20',
    score: 72.7,
    confidenceInterval: 1.2,
    costPerTaskUsd: 4.10,
    tokensPerTask: 85000,
    agentSteps: 98,
    sourceId: 'deepswe-datacurve',
    sourceType: 'independent',
    notes: 'Consistência notável em resolução de bugs e regressão.'
  },
  {
    modelId: 'claude-fable-5-1',
    benchmark: 'Terminal-Bench',
    benchmarkVersion: '2.1',
    date: '2026-09-01',
    score: 91.4,
    confidenceInterval: null,
    costPerTaskUsd: 4.80,
    tokensPerTask: 48000,
    agentSteps: 52,
    sourceId: 'artificial-analysis-sep2026',
    sourceType: 'independent',
    notes: 'Auditoria independente Artificial Analysis: maior pontuação já registrada no Terminal-Bench 2.1.'
  },
  {
    modelId: 'claude-fable-5-1',
    benchmark: 'SciCode',
    benchmarkVersion: '1.0',
    date: '2026-09-01',
    score: 62.0,
    confidenceInterval: null,
    costPerTaskUsd: null,
    tokensPerTask: null,
    agentSteps: null,
    sourceId: 'artificial-analysis-sep2026',
    sourceType: 'independent',
    notes: 'Raciocínio científico e codificação algorítmica de ponta.'
  },
  {
    modelId: 'grok-4-6',
    benchmark: 'Terminal-Bench',
    benchmarkVersion: '2.1',
    date: '2026-08-20',
    score: 88.6,
    confidenceInterval: null,
    costPerTaskUsd: 3.80,
    tokensPerTask: 39000,
    agentSteps: 45,
    sourceId: 'artificial-analysis-sep2026',
    sourceType: 'independent',
    notes: 'Raciocínio agêntico rápido em bash/CLI e tarefas de automação de sistemas.'
  },
  {
    modelId: 'claude-opus-5',
    benchmark: 'CursorBench',
    benchmarkVersion: '3.2',
    date: '2026-08-10',
    score: 71.2,
    confidenceInterval: null,
    costPerTaskUsd: 11.20,
    tokensPerTask: 82000,
    agentSteps: 78,
    sourceId: 'cursorbench-32',
    sourceType: 'independent',
    notes: 'Predecessor com tarifas corrigidas para $5 in / $25 out.'
  },
  {
    modelId: 'deepseek-v3-2',
    benchmark: 'LiveCodeBench',
    benchmarkVersion: 'v6',
    date: '2026-08-15',
    score: 49.8,
    confidenceInterval: null,
    costPerTaskUsd: 0.18,
    tokensPerTask: 28000,
    agentSteps: 34,
    sourceId: 'livecodebench-v6',
    sourceType: 'independent',
    notes: 'Eficiência de custo exemplar em desafios competitivos de código aberto.'
  }
];

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MODEL_HISTORY_DATA, BENCHMARK_HISTORY_DATA };
}
