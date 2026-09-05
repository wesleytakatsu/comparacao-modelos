/**
 * DATA PACK: LINHAGENS HISTÓRICAS, ÁRVORES GERACIONAIS & HISTÓRICO DE BENCHMARKS
 * Base canônica para a rota #history e dossiês de modelo.
 * Conforme especificação normativa de docs/prompts/09-prompt-layout.md e 01-prompt-ajuste.md (Seções 8, 9, 10, 11).
 */

const MODEL_HISTORY_DATA = {
  lineages: [
    {
      familyId: 'anthropic-claude',
      familyName: 'Anthropic Claude Product Tiers & Generation Tree',
      description: 'Portfólio de modelos da Anthropic organizado em quatro vertentes funcionais de produto: Fable (Ultra-Reasoning & Planejamento), Opus (Frontier Heavyweight & Contexto Longo), Sonnet (Workhorse Agêntico & Coding) e Haiku (Subagentes de Alta Velocidade).',
      tracks: [
        {
          trackId: 'claude-fable-track',
          trackName: 'Trilha Claude Fable (Ultra-Reasoning & Planejamento Agêntico)',
          trackDesc: 'Raciocínio profundo e autonomia para fluxos de engenharia e planejamento de software',
          nodes: [
            {
              modelId: 'claude-fable-5',
              name: 'Claude Fable 5',
              releaseDate: '2026-06-09',
              announcedAt: '2026-06-09',
              releasedAt: '2026-06-09',
              gaAt: '2026-06-09',
              suspendedAt: '2026-06-12',
              restoredAt: '2026-07-01',
              knowledgeCutoff: '2026-05-15',
              status: 'superseded',
              historicalOnly: false,
              sourceIds: ['anthropic-fable5-launch', 'anthropic-fable5-redeploy'],
              notes: 'Primeiro modelo da classe Fable; raciocínio profundo voltado a planejamento e engenharia agêntica.'
            },
            {
              modelId: 'claude-fable-5-1',
              name: 'Claude Fable 5.1',
              releaseDate: '2026-09-01',
              announcedAt: '2026-09-01',
              releasedAt: '2026-09-01',
              gaAt: '2026-09-01',
              knowledgeCutoff: '2026-07-31',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['anthropic-fable51-launch'],
              notes: 'Flagship com raciocínio estendido, otimização de custo de cache read e saída de 128k tokens.'
            }
          ]
        },
        {
          trackId: 'claude-opus-track',
          trackName: 'Trilha Claude Opus (Frontier Heavyweight & Contexto Longo 1M)',
          trackDesc: 'Modelos de máxima densidade conceitual, raciocínio novo e grandes bases de código',
          nodes: [
            {
              modelId: 'claude-3-opus',
              name: 'Claude 3 Opus',
              releaseDate: '2024-03-04',
              announcedAt: '2024-03-04',
              releasedAt: '2024-03-04',
              gaAt: '2024-03-04',
              knowledgeCutoff: '2023-08-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['anthropic-fable5-launch'],
              notes: 'Pioneiro frontier da classe Opus em raciocínio complexo e redação técnica.'
            },
            {
              modelId: 'claude-opus-4-6',
              name: 'Claude Opus 4.6',
              releaseDate: '2026-02-05',
              announcedAt: '2026-02-05',
              releasedAt: '2026-02-05',
              gaAt: '2026-02-05',
              knowledgeCutoff: '2025-12-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['anthropic-opus5-launch'],
              notes: 'Raciocínio adaptativo com janela nativa de 1M de tokens, mantido para cargas legadas.'
            },
            {
              modelId: 'claude-opus-5',
              name: 'Claude Opus 5',
              releaseDate: '2026-07-24',
              announcedAt: '2026-07-24',
              releasedAt: '2026-07-24',
              gaAt: '2026-07-24',
              knowledgeCutoff: '2026-05-31',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['anthropic-opus5-launch'],
              notes: 'Frontier de alta capacidade de síntese com 1M de contexto e 128k tokens de saída.'
            }
          ]
        },
        {
          trackId: 'claude-sonnet-track',
          trackName: 'Trilha Claude Sonnet (Daily Driver & Engenharia Agêntica)',
          trackDesc: 'Cavalo de batalha diário com melhor custo-benefício para desenvolvimento e coding',
          nodes: [
            {
              modelId: 'claude-3-5-sonnet',
              name: 'Claude 3.5 Sonnet',
              releaseDate: '2024-06-20',
              announcedAt: '2024-06-20',
              releasedAt: '2024-06-20',
              gaAt: '2024-06-20',
              knowledgeCutoff: '2024-04-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['anthropic-sonnet5-launch'],
              notes: 'Marco histórico de coding prático que estabeleceu a referência da família Sonnet.'
            },
            {
              modelId: 'claude-3-7-sonnet',
              name: 'Claude 3.7 Sonnet',
              releaseDate: '2025-02-24',
              announcedAt: '2025-02-24',
              releasedAt: '2025-02-24',
              gaAt: '2025-02-24',
              knowledgeCutoff: '2024-11-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['anthropic-sonnet5-launch'],
              notes: 'Primeiro modelo com raciocínio híbrido e thinking configurável.'
            },
            {
              modelId: 'claude-sonnet-4-6',
              name: 'Claude Sonnet 4.6',
              releaseDate: '2026-02-17',
              announcedAt: '2026-02-17',
              releasedAt: '2026-02-17',
              gaAt: '2026-02-17',
              knowledgeCutoff: '2025-12-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['anthropic-sonnet5-launch'],
              notes: 'Workhorse balanceado de geração anterior com suporte a raciocínio adaptativo.'
            },
            {
              modelId: 'claude-sonnet-5',
              name: 'Claude Sonnet 5',
              releaseDate: '2026-06-30',
              announcedAt: '2026-06-30',
              releasedAt: '2026-06-30',
              gaAt: '2026-06-30',
              knowledgeCutoff: '2026-05-15',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['anthropic-sonnet5-launch'],
              notes: 'Daily driver com suporte nativo a fluxos agênticos complexos e janela expandida.'
            }
          ]
        },
        {
          trackId: 'claude-haiku-track',
          trackName: 'Trilha Claude Haiku (Subagentes de Alta Velocidade)',
          trackDesc: 'Execução de subtarefas rápidas, triagem e formatação sintática',
          nodes: [
            {
              modelId: 'claude-3-haiku',
              name: 'Claude 3 Haiku',
              releaseDate: '2024-03-14',
              announcedAt: '2024-03-14',
              releasedAt: '2024-03-14',
              gaAt: '2024-03-14',
              knowledgeCutoff: '2023-08-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['anthropic-fable5-launch'],
              notes: 'Subagente leve original focado em latência ultrabaixa.'
            },
            {
              modelId: 'claude-3-5-haiku',
              name: 'Claude 3.5 Haiku',
              releaseDate: '2024-10-22',
              announcedAt: '2024-10-22',
              releasedAt: '2024-10-22',
              gaAt: '2024-10-22',
              knowledgeCutoff: '2024-07-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['anthropic-sonnet5-launch'],
              notes: 'Geração rápida de subagentes sub-dólar de alta eficiência sintática.'
            },
            {
              modelId: 'claude-haiku-4-5',
              name: 'Claude Haiku 4.5',
              releaseDate: '2025-10-15',
              announcedAt: '2025-10-15',
              releasedAt: '2025-10-15',
              gaAt: '2025-10-15',
              knowledgeCutoff: '2025-08-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['anthropic-sonnet5-launch'],
              notes: 'Subagente de alta velocidade para chamadas de ferramenta e triagem contínua.'
            }
          ]
        }
      ],
      connections: [
        { from: 'claude-fable-5', to: 'claude-fable-5-1', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['anthropic-fable51-launch'], improvements: 'CursorBench +2.9pp, custo por tarefa reduzido em 44%, cache read -75%, saída de 128k.' },
        { from: 'claude-3-opus', to: 'claude-opus-4-6', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['anthropic-opus5-launch'], improvements: 'Introdução do raciocínio adaptativo e janela nativa de 1M de tokens.' },
        { from: 'claude-opus-4-6', to: 'claude-opus-5', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['anthropic-opus5-launch'], improvements: 'Janela de saída para 128k e aprimoramento de contexto longo.' },
        { from: 'claude-3-5-sonnet', to: 'claude-3-7-sonnet', relationType: 'generation-successor', changeType: 'reasoning-addition', status: 'verified', confidence: 'high', sourceIds: ['anthropic-sonnet5-launch'], improvements: 'Primeiro modelo com raciocínio híbrido estendido.' },
        { from: 'claude-3-7-sonnet', to: 'claude-sonnet-4-6', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['anthropic-sonnet5-launch'], improvements: 'Refinamento do raciocínio adaptativo e eficiência em SWE-bench Verified.' },
        { from: 'claude-sonnet-4-6', to: 'claude-sonnet-5', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['anthropic-sonnet5-launch'], improvements: 'Nova janela de saída e otimizações em testes de codificação agêntica.' },
        { from: 'claude-3-haiku', to: 'claude-3-5-haiku', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['anthropic-fable5-launch'], improvements: 'Salto em velocidade e acurácia de subagentes.' },
        { from: 'claude-3-5-haiku', to: 'claude-haiku-4-5', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['anthropic-sonnet5-launch'], improvements: 'Otimização para microsserviços e chamadas de ferramenta de alta frequência.' }
      ]
    },
    {
      familyId: 'openai-gpt56',
      familyName: 'OpenAI GPT & Reasoning Architecture Tree',
      description: 'Evolução dos modelos da OpenAI a partir da convergência entre a linha o-series de raciocínio deliberativo e os modelos gerais, ramificada nos tiers GPT-5.6 (Sol, Terra, Luna), no flagship GPT-6 Astra e na linhagem aberta oficial gpt-oss.',
      tracks: [
        {
          trackId: 'gpt-sol-track',
          trackName: 'Trilha Sol / Astra (Frontier Reasoning & Alta Precisão)',
          trackDesc: 'Raciocínio XHigh/Max para edge cases, formal logic e automação agêntica complexa',
          nodes: [
            {
              modelId: 'openai-o1',
              name: 'OpenAI o1 (Preview)',
              releaseDate: '2024-09-12',
              announcedAt: '2024-09-12',
              releasedAt: '2024-09-12',
              gaAt: '2024-12-05',
              knowledgeCutoff: '2023-10-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['openai-o1-preview'],
              notes: 'Pioneiro em chain-of-thought oculta e raciocínio deliberativo em código e matemática.'
            },
            {
              modelId: 'openai-o3',
              name: 'OpenAI o3',
              releaseDate: '2025-04-16',
              announcedAt: '2025-04-16',
              releasedAt: '2025-04-16',
              gaAt: '2025-04-16',
              knowledgeCutoff: '2024-12-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['openai-o3-launch'],
              notes: 'Salto significativo em programação competitiva, ARC-AGI e raciocínio formal.'
            },
            {
              modelId: 'gpt-5-5-preview',
              name: 'GPT-5.5 Preview',
              releaseDate: '2025-11-10',
              announcedAt: '2025-11-10',
              releasedAt: '2025-11-10',
              gaAt: null,
              knowledgeCutoff: '2025-08-01',
              status: 'superseded',
              historicalOnly: false,
              sourceIds: ['openai-gpt56-launch'],
              notes: 'Snapshot preliminar de convergência unificando o protocolo responses com capacidades de raciocínio.'
            },
            {
              modelId: 'gpt-5-6-sol',
              name: 'GPT-5.6 Sol',
              releaseDate: '2026-07-09',
              announcedAt: '2026-06-26',
              previewAt: '2026-06-26',
              releasedAt: '2026-07-09',
              gaAt: '2026-07-09',
              knowledgeCutoff: '2026-02-16',
              status: 'superseded',
              historicalOnly: false,
              sourceIds: ['openai-gpt56-launch', 'openai-gpt56-preview'],
              notes: 'Frontier de precisão lógica e edge cases complexos; antecessor direto do papel de raciocínio frontier assumido pelo Astra.'
            },
            {
              modelId: 'gpt-6-astra',
              name: 'GPT-6 Astra',
              releaseDate: '2026-09-03',
              announcedAt: '2026-09-03',
              releasedAt: '2026-09-03',
              gaAt: '2026-09-03',
              knowledgeCutoff: '2026-04-30',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['openai-gpt6-astra-launch'],
              notes: 'Frontier reasoning flagship com 1.05M de contexto nativo, 5 níveis de reasoning effort, Responses API v2 e async tools.'
            }
          ]
        },
        {
          trackId: 'gpt-terra-track',
          trackName: 'Trilha Terra (Workhorse / Daily Driver Balanceado)',
          trackDesc: 'Tier equilibrado para desenvolvimento diário robusto e integração geral',
          nodes: [
            {
              modelId: 'gpt-4o',
              name: 'GPT-4o',
              releaseDate: '2024-05-13',
              announcedAt: '2024-05-13',
              releasedAt: '2024-05-13',
              gaAt: '2024-05-13',
              knowledgeCutoff: '2023-10-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['openai-gpt56-launch'],
              notes: 'Modelo omni multimodal de referência histórica para coding e chat geral.'
            },
            {
              modelId: 'gpt-4-5',
              name: 'GPT-4.5 Orion',
              releaseDate: '2025-02-27',
              announcedAt: '2025-02-27',
              releasedAt: '2025-02-27',
              gaAt: '2025-02-27',
              knowledgeCutoff: '2024-10-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['openai-gpt56-launch'],
              notes: 'Workhorse denso com redução de alucinações e foco em conhecimento enciclopédico.'
            },
            {
              modelId: 'gpt-5-5-preview',
              name: 'GPT-5.5 Preview',
              releaseDate: '2025-11-10',
              announcedAt: '2025-11-10',
              releasedAt: '2025-11-10',
              gaAt: null,
              knowledgeCutoff: '2025-08-01',
              status: 'superseded',
              historicalOnly: false,
              sourceIds: ['openai-gpt56-launch'],
              notes: 'Snapshot preliminar do protocolo responses.'
            },
            {
              modelId: 'gpt-5-6-terra',
              name: 'GPT-5.6 Terra',
              releaseDate: '2026-07-09',
              announcedAt: '2026-06-26',
              previewAt: '2026-06-26',
              releasedAt: '2026-07-09',
              gaAt: '2026-07-09',
              knowledgeCutoff: '2026-02-16',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['openai-gpt56-launch'],
              notes: 'Tier balanceado para desenvolvimento diário robusto, com redução tarifária de -20% em 30/07/2026.'
            }
          ]
        },
        {
          trackId: 'gpt-luna-track',
          trackName: 'Trilha Luna (Ultra-Econômico / Sub-Dólar)',
          trackDesc: 'Subagentes rápidos e operações de altíssimo volume de processamento textual',
          nodes: [
            {
              modelId: 'gpt-4o-mini',
              name: 'GPT-4o-mini',
              releaseDate: '2024-07-18',
              announcedAt: '2024-07-18',
              releasedAt: '2024-07-18',
              gaAt: '2024-07-18',
              knowledgeCutoff: '2023-10-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['openai-gpt56-launch'],
              notes: 'Pioneiro sub-dólar de alta velocidade da OpenAI.'
            },
            {
              modelId: 'gpt-5-5-preview',
              name: 'GPT-5.5 Preview',
              releaseDate: '2025-11-10',
              announcedAt: '2025-11-10',
              releasedAt: '2025-11-10',
              gaAt: null,
              knowledgeCutoff: '2025-08-01',
              status: 'superseded',
              historicalOnly: false,
              sourceIds: ['openai-gpt56-launch'],
              notes: 'Snapshot preliminar do protocolo responses.'
            },
            {
              modelId: 'gpt-5-6-luna',
              name: 'GPT-5.6 Luna',
              releaseDate: '2026-07-09',
              announcedAt: '2026-06-26',
              previewAt: '2026-06-26',
              releasedAt: '2026-07-09',
              gaAt: '2026-07-09',
              knowledgeCutoff: '2026-02-16',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['openai-gpt56-launch'],
              notes: 'Ultra-econômico para subagentes e triagem em lote, com corte de -80% em 30/07/2026.'
            }
          ]
        },
        {
          trackId: 'gpt-oss-track',
          trackName: 'Trilha gpt-oss (Pesos Abertos Apache 2.0)',
          trackDesc: 'Linhagem paralela oficial de modelos abertos da OpenAI para inferência local',
          nodes: [
            {
              modelId: 'gpt-oss-20b',
              name: 'gpt-oss-20b',
              releaseDate: '2025-08-05',
              announcedAt: '2025-08-05',
              releasedAt: '2025-08-05',
              gaAt: '2025-08-05',
              knowledgeCutoff: '2025-05-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['openai-gpt-oss-launch'],
              notes: 'Open-weights oficial sob licença Apache 2.0 viável para execução em GPU única de 16GB VRAM.'
            },
            {
              modelId: 'gpt-oss-120b',
              name: 'gpt-oss-120b',
              releaseDate: '2025-08-05',
              announcedAt: '2025-08-05',
              releasedAt: '2025-08-05',
              gaAt: '2025-08-05',
              knowledgeCutoff: '2025-05-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['openai-gpt-oss-launch'],
              notes: 'Modelo aberto de alta densidade para workstations multi-GPU e nós locais de inferência.'
            }
          ]
        }
      ],
      connections: [
        { from: 'openai-o1', to: 'openai-o3', relationType: 'generation-successor', changeType: 'reasoning-boost', status: 'verified', confidence: 'high', sourceIds: ['openai-o3-launch'], improvements: 'Avanço significativo em raciocínio matemático e código formal.' },
        { from: 'openai-o3', to: 'gpt-5-5-preview', relationType: 'series-convergence', changeType: 'protocol-unification', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt56-launch'], improvements: 'Unificação sob protocolo responses integrando raciocínio deliberativo.' },
        { from: 'gpt-5-5-preview', to: 'gpt-5-6-sol', relationType: 'product-tier-successor', changeType: 'full-release', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt56-launch'], improvements: 'Raciocínio XHigh/Max com MRCR v2 e salvaguardas formais.' },
        { from: 'gpt-5-6-sol', to: 'gpt-6-astra', relationType: 'flagship-role-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt6-astra-launch'], improvements: 'Novo paradigma de raciocínio profundo, 1.05M tokens de contexto, Responses API v2, async tool calling e mid-turn steering.' },
        { from: 'gpt-4o', to: 'gpt-4-5', relationType: 'generation-successor', changeType: 'density-scaling', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt56-launch'], improvements: 'Expansão de parâmetros e redução de alucinações.' },
        { from: 'gpt-4-5', to: 'gpt-5-5-preview', relationType: 'series-convergence', changeType: 'protocol-unification', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt56-launch'], improvements: 'Migração do ecossistema geral para o protocolo responses.' },
        { from: 'gpt-5-5-preview', to: 'gpt-5-6-terra', relationType: 'product-tier-successor', changeType: 'full-release', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt56-launch'], improvements: 'Daily driver balanceado para engenharia de software.' },
        { from: 'gpt-4o-mini', to: 'gpt-5-5-preview', relationType: 'series-convergence', changeType: 'protocol-unification', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt56-launch'], improvements: 'Unificação arquitetural para o tier de alta velocidade.' },
        { from: 'gpt-5-5-preview', to: 'gpt-5-6-luna', relationType: 'product-tier-successor', changeType: 'full-release', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt56-launch'], improvements: 'Compressão tarifária sub-dólar para subagentes.' },
        { from: 'gpt-oss-20b', to: 'gpt-oss-120b', relationType: 'parallel-branch', changeType: 'scale-up', status: 'verified', confidence: 'high', sourceIds: ['openai-gpt-oss-launch'], improvements: 'Escalonamento de 20B para 120B com maior profundidade em raciocínio complexo.' }
      ]
    },
    {
      familyId: 'google-gemini',
      familyName: 'Google DeepMind Gemini Architecture Tree',
      description: 'Evolução dos modelos Gemini com 1 milhão de tokens de contexto nativo, organizada entre a linhagem Flash (alta velocidade & raciocínio adaptativo) e Pro (raciocínio denso multimodal).',
      tracks: [
        {
          trackId: 'gemini-flash-track',
          trackName: 'Trilha Gemini Flash (1M Tokens, Raciocínio & Autonomia Agêntica)',
          trackDesc: 'Evolução contínua de velocidade, thinking dinâmico e autonomia agêntica',
          nodes: [
            {
              modelId: 'gemini-1-5-flash',
              name: 'Gemini 1.5 Flash',
              releaseDate: '2024-05-14',
              announcedAt: '2024-05-14',
              releasedAt: '2024-05-14',
              gaAt: '2024-05-14',
              knowledgeCutoff: '2024-03-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['google-gemini-35'],
              notes: 'Primeiro modelo Flash com 1M de tokens nativos e latência ultrabaixa.'
            },
            {
              modelId: 'gemini-2-0-flash',
              name: 'Gemini 2.0 Flash',
              releaseDate: '2024-12-11',
              announcedAt: '2024-12-11',
              releasedAt: '2024-12-11',
              gaAt: '2024-12-11',
              knowledgeCutoff: '2024-08-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['google-gemini-35'],
              notes: 'Primeiro com suporte multimodal em tempo real e agêntico nativo.'
            },
            {
              modelId: 'gemini-3-5-flash',
              name: 'Gemini 3.5 Flash',
              releaseDate: '2025-11-20',
              announcedAt: '2025-05-19',
              releasedAt: '2025-11-20',
              gaAt: '2025-11-20',
              knowledgeCutoff: '2025-08-01',
              status: 'superseded',
              historicalOnly: false,
              sourceIds: ['google-gemini-35'],
              notes: 'Primeiro flash com 1M e custo sub-dólar.'
            },
            {
              modelId: 'gemini-3-6-flash',
              name: 'Gemini 3.6 Flash',
              releaseDate: '2026-07-24',
              announcedAt: '2026-07-24',
              releasedAt: '2026-07-24',
              gaAt: '2026-07-24',
              knowledgeCutoff: '2026-05-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['google-deepmind-gemini-37'],
              notes: 'Checkpoint de transição rápida preliminar antecedendo o dynamic thinking.'
            },
            {
              modelId: 'gemini-3-7-flash',
              name: 'Gemini 3.7 Flash',
              releaseDate: '2026-08-13',
              announcedAt: '2026-08-13',
              releasedAt: '2026-08-13',
              gaAt: '2026-08-13',
              knowledgeCutoff: '2026-06-01',
              status: 'stable',
              historicalOnly: false,
              sourceIds: ['google-deepmind-gemini-37'],
              notes: 'Introdução do thinking dinâmico configurável e base estável em produção.'
            },
            {
              modelId: 'gemini-3-8-flash',
              name: 'Gemini 3.8 Flash',
              releaseDate: '2026-09-02',
              announcedAt: '2026-09-02',
              releasedAt: '2026-09-02',
              gaAt: '2026-09-02',
              knowledgeCutoff: '2026-07-15',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['google-deepmind-gemini-38'],
              notes: 'Frontier agêntico com alta velocidade e suporte a variantes especializadas (Gemini 3.8 Flash Cyber).'
            }
          ]
        },
        {
          trackId: 'gemini-pro-track',
          trackName: 'Trilha Gemini Pro (Frontier Multimodal Denso)',
          trackDesc: 'Máxima capacidade multimodal de vídeo, áudio e raciocínio científico complexo',
          nodes: [
            {
              modelId: 'gemini-1-5-pro',
              name: 'Gemini 1.5 Pro',
              releaseDate: '2024-02-15',
              announcedAt: '2024-02-15',
              releasedAt: '2024-02-15',
              gaAt: '2024-02-15',
              knowledgeCutoff: '2023-11-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['google-gemini-35'],
              notes: 'Pioneiro em 1M/2M de contexto longo e multimodalidade de áudio/vídeo.'
            },
            {
              modelId: 'gemini-2-5-pro',
              name: 'Gemini 2.5 Pro',
              releaseDate: '2025-03-20',
              announcedAt: '2025-03-20',
              releasedAt: '2025-03-20',
              gaAt: '2025-03-20',
              knowledgeCutoff: '2025-01-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['google-gemini-35'],
              notes: 'Avanço expressivo em raciocínio de código e matemática.'
            },
            {
              modelId: 'gemini-3-0-pro',
              name: 'Gemini 3.0 Pro',
              releaseDate: '2025-12-10',
              announcedAt: '2025-12-10',
              releasedAt: '2025-12-10',
              gaAt: '2025-12-10',
              knowledgeCutoff: '2025-09-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['google-gemini-31-pro'],
              notes: 'Frontier multimodal com suporte a fluxos estendidos de vídeo e áudio.'
            },
            {
              modelId: 'gemini-3-1-pro',
              name: 'Gemini 3.1 Pro',
              releaseDate: '2026-02-19',
              announcedAt: '2026-02-19',
              previewAt: '2026-02-19',
              releasedAt: '2026-02-19',
              gaAt: null,
              knowledgeCutoff: '2025-12-01',
              status: 'preview',
              historicalOnly: false,
              sourceIds: ['google-gemini-31-pro'],
              notes: 'Preview de raciocínio de código e resolução de problemas matemáticos frontier.'
            },
            {
              modelId: 'gemini-3-5-pro',
              name: 'Gemini 3.5 Pro',
              releaseDate: '2026-05-19',
              announcedAt: '2026-05-19',
              releasedAt: '2026-05-19',
              gaAt: '2026-05-19',
              knowledgeCutoff: '2026-03-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['google-gemini-35'],
              notes: 'Frontier denso de 1M com raciocínio expandido para análise de repositórios inteiros.'
            }
          ]
        }
      ],
      connections: [
        { from: 'gemini-1-5-flash', to: 'gemini-2-0-flash', relationType: 'generation-successor', changeType: 'multimodal-speed', status: 'verified', confidence: 'high', sourceIds: ['google-gemini-35'], improvements: 'Adição de streaming de vídeo e chamadas nativas de função.' },
        { from: 'gemini-2-0-flash', to: 'gemini-3-5-flash', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['google-gemini-35'], improvements: 'Otimização de custos para nível sub-dólar.' },
        { from: 'gemini-3-5-flash', to: 'gemini-3-6-flash', relationType: 'generation-successor', changeType: 'incremental-update', status: 'verified', confidence: 'high', sourceIds: ['google-deepmind-gemini-37'], improvements: 'Refinamento de latência e chamadas de ferramenta.' },
        { from: 'gemini-3-6-flash', to: 'gemini-3-7-flash', relationType: 'generation-successor', changeType: 'reasoning-addition', status: 'verified', confidence: 'high', sourceIds: ['google-deepmind-gemini-37'], improvements: 'Thinking dinâmico configurável Low/Med/High.' },
        { from: 'gemini-3-7-flash', to: 'gemini-3-8-flash', relationType: 'generation-successor', changeType: 'agentic-breakthrough', status: 'verified', confidence: 'high', sourceIds: ['google-deepmind-gemini-38'], improvements: 'Salto em persistência agêntica e disponibilidade de variantes de segurança.' },
        { from: 'gemini-1-5-pro', to: 'gemini-2-5-pro', relationType: 'generation-successor', changeType: 'reasoning-boost', status: 'verified', confidence: 'high', sourceIds: ['google-gemini-35'], improvements: 'Ganho substantivo em raciocínio algorítmico.' },
        { from: 'gemini-2-5-pro', to: 'gemini-3-0-pro', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['google-gemini-31-pro'], improvements: 'Aprimoramento multimodal 1M nativo.' },
        { from: 'gemini-3-0-pro', to: 'gemini-3-1-pro', relationType: 'generation-successor', changeType: 'preview-update', status: 'verified', confidence: 'high', sourceIds: ['google-gemini-31-pro'], improvements: 'Expansão de raciocínio lógico em preview.' },
        { from: 'gemini-3-1-pro', to: 'gemini-3-5-pro', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['google-gemini-35'], improvements: 'Consolidação de raciocínio profundo e recall em 1M.' }
      ]
    },
    {
      familyId: 'zai-glm',
      familyName: 'Z.ai GLM Architecture Tree',
      description: 'Linhagem de modelos abertos e MoE da Zhipu AI (Z.ai) com ramificação formal entre o frontier denso de 753B e a vertente de eficiência sob licença MIT (ex-Ox Alpha).',
      tracks: [
        {
          trackId: 'glm-frontier-track',
          trackName: 'Trilha Frontier (MoE 753B / Raciocínio Mandatório)',
          trackDesc: 'Evolução de alta capacidade para inferência em nuvem e tarefas complexas',
          nodes: [
            {
              modelId: 'glm-4',
              name: 'GLM-4',
              releaseDate: '2024-01-16',
              announcedAt: '2024-01-16',
              releasedAt: '2024-01-16',
              gaAt: '2024-01-16',
              knowledgeCutoff: '2023-09-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['zai-glm-53-flash'],
              notes: 'Modelo flagship da Zhipu AI para chat e function calling.'
            },
            {
              modelId: 'glm-4-5',
              name: 'GLM-4.5',
              releaseDate: '2024-09-10',
              announcedAt: '2024-09-10',
              releasedAt: '2024-09-10',
              gaAt: '2024-09-10',
              knowledgeCutoff: '2024-06-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['zai-glm-53-flash'],
              notes: 'Evolução intermediária de alinhamento e código.'
            },
            {
              modelId: 'glm-5-1',
              name: 'GLM-5.1',
              releaseDate: '2025-12-05',
              announcedAt: '2025-12-05',
              releasedAt: '2025-12-05',
              gaAt: '2025-12-05',
              knowledgeCutoff: '2025-09-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['zai-glm-53-flash'],
              notes: 'MoE aberto 600B com 200k de contexto.'
            },
            {
              modelId: 'glm-5-2',
              name: 'GLM-5.2',
              releaseDate: '2026-03-22',
              announcedAt: '2026-03-22',
              releasedAt: '2026-03-22',
              gaAt: '2026-03-22',
              knowledgeCutoff: '2026-01-01',
              status: 'stable',
              historicalOnly: false,
              sourceIds: ['zai-glm-53-flash'],
              notes: 'Expansão para 1M de contexto e 750B MoE.'
            },
            {
              modelId: 'glm-5-3',
              name: 'GLM-5.3',
              releaseDate: '2026-07-15',
              announcedAt: '2026-07-15',
              releasedAt: '2026-07-15',
              gaAt: '2026-07-15',
              knowledgeCutoff: '2026-05-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['zai-glm-53-flash'],
              notes: 'Frontier de 753B MoE (40B ativos) com raciocínio mandatório denso.'
            }
          ]
        },
        {
          trackId: 'glm-efficiency-track',
          trackName: 'Trilha Eficiência & Pesos Abertos MIT (MoE 320B / Sparse Attention)',
          trackDesc: 'Ramificação de alta eficiência testada anonimamente como Ox Alpha e lançada com licença MIT',
          nodes: [
            {
              modelId: 'glm-5-2',
              name: 'GLM-5.2 (Base Arquitetural)',
              releaseDate: '2026-03-22',
              announcedAt: '2026-03-22',
              releasedAt: '2026-03-22',
              gaAt: '2026-03-22',
              knowledgeCutoff: '2026-01-01',
              status: 'stable',
              historicalOnly: false,
              sourceIds: ['zai-glm-53-flash'],
              notes: 'Ponto de ramificação de onde derivou a arquitetura Sparse-Linear Attention.'
            },
            {
              modelId: 'ox-alpha-stealth',
              name: 'Ox Alpha (Stealth Preview)',
              releaseDate: '2026-08-20',
              announcedAt: '2026-08-20',
              previewAt: '2026-08-20',
              releasedAt: '2026-08-20',
              gaAt: null,
              knowledgeCutoff: '2026-06-01',
              status: 'stealth-revealed',
              historicalOnly: true,
              sourceIds: ['zai-glm-53-flash'],
              notes: 'Fase de testes anônimos no OpenRouter e OpenCode Go em regime stealth.'
            },
            {
              modelId: 'glm-5-3-flash',
              name: 'GLM-5.3-Flash',
              releaseDate: '2026-08-26',
              announcedAt: '2026-08-26',
              releasedAt: '2026-08-26',
              gaAt: '2026-08-26',
              knowledgeCutoff: '2026-06-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['zai-glm-53-flash'],
              notes: 'MoE 320B (18B ativos), pesos liberados sob licença permissiva MIT e contexto de 1M.'
            }
          ]
        }
      ],
      connections: [
        { from: 'glm-4', to: 'glm-4-5', relationType: 'generation-successor', changeType: 'alignment-update', status: 'verified', confidence: 'high', sourceIds: ['zai-glm-53-flash'], improvements: 'Melhorias em aderência a ferramentas e formato JSON.' },
        { from: 'glm-4-5', to: 'glm-5-1', relationType: 'architectural-successor', changeType: 'moe-architecture', status: 'verified', confidence: 'high', sourceIds: ['zai-glm-53-flash'], improvements: 'Transição para MoE aberto 600B.' },
        { from: 'glm-5-1', to: 'glm-5-2', relationType: 'generation-successor', changeType: 'context-scaling', status: 'verified', confidence: 'high', sourceIds: ['zai-glm-53-flash'], improvements: '1M de contexto nativo.' },
        { from: 'glm-5-2', to: 'glm-5-3', relationType: 'generation-successor', changeType: 'capacity-boost', status: 'verified', confidence: 'high', sourceIds: ['zai-glm-53-flash'], improvements: 'Raciocínio mandatório de alta densidade.' },
        { from: 'glm-5-2', to: 'ox-alpha-stealth', relationType: 'parallel-branch', changeType: 'stealth-fork', status: 'inferred', confidence: 'medium', sourceIds: ['zai-glm-53-flash'], improvements: 'Desenvolvimento do MoE leve de 320B com Sparse-Linear Attention.', notes: 'Desenvolvimento do MoE leve de 320B com Sparse-Linear Attention e regime anônimo de avaliação.' },
        { from: 'ox-alpha-stealth', to: 'glm-5-3-flash', relationType: 'identity-reveal', changeType: 'official-release', status: 'verified', confidence: 'high', sourceIds: ['zai-glm-53-flash'], improvements: 'Revelação oficial, pesos liberados sob licença MIT e harness otimizado.' }
      ]
    },
    {
      familyId: 'deepseek-tree',
      familyName: 'DeepSeek Architecture Tree',
      description: 'Evolução da arquitetura Multi-Head Latent Attention (MLA) e MoE da DeepSeek da série V2/V3 para a família de fronteira V4.',
      tracks: [
        {
          trackId: 'deepseek-v3-track',
          trackName: 'Trilha V3 Foundation (MLA & MoE de Baixo Custo)',
          trackDesc: 'Base arquitetural inovadora que estabeleceu novos patamares de custo-benefício',
          nodes: [
            {
              modelId: 'deepseek-v2',
              name: 'DeepSeek V2',
              releaseDate: '2024-05-06',
              announcedAt: '2024-05-06',
              releasedAt: '2024-05-06',
              gaAt: '2024-05-06',
              knowledgeCutoff: '2024-02-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['deepseek-v4-org'],
              notes: 'Pioneiro na arquitetura Multi-Head Latent Attention (MLA).'
            },
            {
              modelId: 'deepseek-v2-5',
              name: 'DeepSeek V2.5',
              releaseDate: '2024-09-05',
              announcedAt: '2024-09-05',
              releasedAt: '2024-09-05',
              gaAt: '2024-09-05',
              knowledgeCutoff: '2024-06-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['deepseek-v4-org'],
              notes: 'Fusão de código e instrução geral.'
            },
            {
              modelId: 'deepseek-v3',
              name: 'DeepSeek V3',
              releaseDate: '2024-12-26',
              announcedAt: '2024-12-26',
              releasedAt: '2024-12-26',
              gaAt: '2024-12-26',
              knowledgeCutoff: '2024-10-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['deepseek-v4-org'],
              notes: 'MoE pioneiro com MLA e precificação agressiva sub-dólar.'
            },
            {
              modelId: 'deepseek-v3-2',
              name: 'DeepSeek V3.2',
              releaseDate: '2025-12-01',
              announcedAt: '2025-12-01',
              releasedAt: '2025-12-01',
              gaAt: '2025-12-01',
              knowledgeCutoff: '2025-09-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['deepseek-v32-updates'],
              notes: 'Otimizações de estabilidade em geração de código e aderência a ferramentas.'
            }
          ]
        },
        {
          trackId: 'deepseek-v4-pro-track',
          trackName: 'Trilha V4 Pro (Frontier Reasoning MoE)',
          trackDesc: 'Raciocínio denso de código e arquitetura de agentes',
          nodes: [
            {
              modelId: 'deepseek-r1',
              name: 'DeepSeek R1',
              releaseDate: '2025-01-20',
              announcedAt: '2025-01-20',
              releasedAt: '2025-01-20',
              gaAt: '2025-01-20',
              knowledgeCutoff: '2024-11-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['deepseek-v4-org'],
              notes: 'Primeiro modelo aberto de raciocínio puro com RL em larga escala.'
            },
            {
              modelId: 'deepseek-v4-pro-0813',
              name: 'DeepSeek V4 Pro (0813)',
              releaseDate: '2026-08-13',
              announcedAt: '2026-08-13',
              releasedAt: '2026-08-13',
              gaAt: '2026-08-13',
              knowledgeCutoff: '2026-06-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['deepseek-v4-pro-ga'],
              notes: 'Flagship de raciocínio de código (DeepSWE 62.7% no release oficial GA) e suporte agêntico nativo.'
            }
          ]
        },
        {
          trackId: 'deepseek-v4-flash-track',
          trackName: 'Trilha V4 Flash (Ultra-Velocidade & Economia Extrema)',
          trackDesc: 'Modelo balanceado com inferência ultrarrápida',
          nodes: [
            {
              modelId: 'deepseek-v3-2',
              name: 'DeepSeek V3.2',
              releaseDate: '2025-12-01',
              announcedAt: '2025-12-01',
              releasedAt: '2025-12-01',
              gaAt: '2025-12-01',
              knowledgeCutoff: '2025-09-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['deepseek-v32-updates'],
              notes: 'Base precursora.'
            },
            {
              modelId: 'deepseek-v4-flash-0731',
              name: 'DeepSeek V4 Flash (0731)',
              releaseDate: '2026-07-31',
              announcedAt: '2026-07-31',
              releasedAt: '2026-07-31',
              gaAt: '2026-07-31',
              knowledgeCutoff: '2026-05-15',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['deepseek-v4-org'],
              notes: 'Workhorse econômico ideal para subagentes e tarefas de grande escala.'
            }
          ]
        },
        {
          trackId: 'deepseek-v4-vision-track',
          trackName: 'Trilha V4 Vision (Multimodalidade & OCR Técnico)',
          trackDesc: 'Suporte a visão computacional e diagramas de arquitetura',
          nodes: [
            {
              modelId: 'deepseek-vl2',
              name: 'DeepSeek-VL2',
              releaseDate: '2024-12-15',
              announcedAt: '2024-12-15',
              releasedAt: '2024-12-15',
              gaAt: '2024-12-15',
              knowledgeCutoff: '2024-09-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['deepseek-v4-org'],
              notes: 'Modelo de visão prévio para leitura de gráficos e código.'
            },
            {
              modelId: 'deepseek-v4-vision-exp',
              name: 'DeepSeek V4 Vision (Exp)',
              releaseDate: '2026-08-21',
              announcedAt: '2026-08-21',
              releasedAt: '2026-08-21',
              gaAt: '2026-08-21',
              knowledgeCutoff: '2026-06-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['deepseek-v4-vision-exp'],
              notes: 'Processamento de capturas de tela, schemas de banco de dados e diagramas UML.'
            }
          ]
        }
      ],
      connections: [
        { from: 'deepseek-v2', to: 'deepseek-v2-5', relationType: 'generation-successor', changeType: 'refinement', status: 'verified', confidence: 'high', sourceIds: ['deepseek-v4-org'], improvements: 'Fusão dos ramos de código e linguagem geral.' },
        { from: 'deepseek-v2-5', to: 'deepseek-v3', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['deepseek-v4-org'], improvements: 'Adoção de FP8 nativo e compressão tarifária.' },
        { from: 'deepseek-v3', to: 'deepseek-v3-2', relationType: 'generation-successor', changeType: 'refinement', status: 'verified', confidence: 'high', sourceIds: ['deepseek-v32-updates'], improvements: 'Refinamento de pós-treino e estabilidade de geração.' },
        { from: 'deepseek-r1', to: 'deepseek-v4-pro-0813', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['deepseek-v4-pro-ga'], improvements: 'Integração agêntica nativa com 62.7% no DeepSWE oficial de GA.' },
        { from: 'deepseek-v3-2', to: 'deepseek-v4-flash-0731', relationType: 'generation-successor', changeType: 'speed-optimization', status: 'verified', confidence: 'high', sourceIds: ['deepseek-v4-org'], improvements: 'Latência ultrabaixa com preservação da acurácia geral.' },
        { from: 'deepseek-vl2', to: 'deepseek-v4-vision-exp', relationType: 'generation-successor', changeType: 'multimodal-extension', status: 'verified', confidence: 'high', sourceIds: ['deepseek-v4-vision-exp'], improvements: 'Adição de encoder de visão de alta resolução para código e diagramas.' }
      ]
    },
    {
      familyId: 'xai-grok',
      familyName: 'xAI Grok Generation',
      description: 'Linhagem de raciocínio de alta velocidade da xAI voltada para engenharia, CLI e automação de sistemas.',
      tracks: [
        {
          trackId: 'grok-frontier-track',
          trackName: 'Trilha Grok (Frontier Reasoning & Agentes CLI)',
          trackDesc: 'Execução de comandos bash e raciocínio veloz em automação de desenvolvimento',
          nodes: [
            {
              modelId: 'grok-2',
              name: 'Grok 2',
              releaseDate: '2024-08-13',
              announcedAt: '2024-08-13',
              releasedAt: '2024-08-13',
              gaAt: '2024-08-13',
              knowledgeCutoff: '2024-05-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['xai-grok-45'],
              notes: 'Modelo anterior com suporte multimodal e search.'
            },
            {
              modelId: 'grok-3',
              name: 'Grok 3',
              releaseDate: '2025-02-17',
              announcedAt: '2025-02-17',
              releasedAt: '2025-02-17',
              gaAt: '2025-02-17',
              knowledgeCutoff: '2024-11-01',
              status: 'legacy',
              historicalOnly: true,
              sourceIds: ['xai-grok-45'],
              notes: 'Primeiro frontier com raciocínio expandido treinado no cluster Colossus.'
            },
            {
              modelId: 'grok-4-5',
              name: 'Grok 4.5',
              releaseDate: '2026-07-16',
              announcedAt: '2026-07-16',
              releasedAt: '2026-07-16',
              gaAt: '2026-07-16',
              knowledgeCutoff: '2026-04-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['xai-grok-45'],
              notes: 'Aprimoramento em raciocínio matemático e velocidade operacional.'
            },
            {
              modelId: 'grok-4-6',
              name: 'Grok 4.6',
              releaseDate: '2026-08-12',
              announcedAt: '2026-08-12',
              releasedAt: '2026-08-12',
              gaAt: '2026-08-12',
              knowledgeCutoff: '2026-06-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['xai-grok-46'],
              notes: 'Raciocínio ágil em ambiente de linha de comando bash/CLI e baixa recusa.'
            }
          ]
        }
      ],
      connections: [
        { from: 'grok-2', to: 'grok-3', relationType: 'generation-successor', changeType: 'reasoning-expansion', status: 'verified', confidence: 'high', sourceIds: ['xai-grok-45'], improvements: 'Salto de escala computacional no cluster Colossus.' },
        { from: 'grok-3', to: 'grok-4-5', relationType: 'generation-successor', changeType: 'speed-and-math', status: 'verified', confidence: 'high', sourceIds: ['xai-grok-45'], improvements: 'Melhoria na resolução matemática e diminuição de alucinações.' },
        { from: 'grok-4-5', to: 'grok-4-6', relationType: 'generation-successor', changeType: 'agentic-cli', status: 'verified', confidence: 'high', sourceIds: ['xai-grok-46'], improvements: 'Otimização para execução em ferramentas de shell e expansão multi-nuvem.' }
      ]
    },
    {
      familyId: 'alibaba-qwen',
      familyName: 'Alibaba Qwen Generation & Open-Weights',
      description: 'Ecossistema líder de modelos proprietários e abertos da Alibaba Cloud com forte eficiência para execução local e em nuvem.',
      tracks: [
        {
          trackId: 'qwen-frontier-track',
          trackName: 'Trilha Qwen Frontier (Raciocínio Denso de Máxima Capacidade)',
          trackDesc: 'Modelos proprietários de altíssima densidade matemática e coding',
          nodes: [
            {
              modelId: 'qwen-2-5-max',
              name: 'Qwen 2.5 Max',
              releaseDate: '2025-01-28',
              announcedAt: '2025-01-28',
              releasedAt: '2025-01-28',
              gaAt: '2025-01-28',
              knowledgeCutoff: '2024-10-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['qwen-25-max'],
              notes: 'Frontier proprietário denso anterior da Alibaba Cloud.'
            },
            {
              modelId: 'qwen3-7-max',
              name: 'Qwen 3.7 Max',
              releaseDate: '2026-03-15',
              announcedAt: '2026-03-15',
              releasedAt: '2026-03-15',
              gaAt: '2026-03-15',
              knowledgeCutoff: '2026-01-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['qwen-38-max'],
              notes: 'Avanço expressivo em raciocínio matemático e código.'
            },
            {
              modelId: 'qwen3-8-max',
              name: 'Qwen 3.8 Max',
              releaseDate: '2026-08-02',
              announcedAt: '2026-08-02',
              releasedAt: '2026-08-02',
              gaAt: '2026-08-02',
              knowledgeCutoff: '2026-05-15',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['qwen-38-max'],
              notes: 'Frontier proprietário de alta densidade no Model Studio com snapshot incremental 0902.'
            },
            {
              modelId: 'qwen3-8-flash',
              name: 'Qwen 3.8 Flash',
              releaseDate: '2026-08-26',
              announcedAt: '2026-08-26',
              releasedAt: '2026-08-26',
              gaAt: '2026-08-26',
              knowledgeCutoff: '2026-06-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['qwen-38-flash'],
              notes: 'Trilha de alta velocidade e custo reduzido para fluxos agênticos contínuos.'
            }
          ]
        },
        {
          trackId: 'qwen-open-weights-track',
          trackName: 'Trilha Qwen Open-Weights (Pesos Abertos para Inferência Local)',
          trackDesc: 'Referência global em inferência local para workstations e servidores dedicados',
          nodes: [
            {
              modelId: 'qwen-2-5-72b',
              name: 'Qwen 2.5 72B',
              releaseDate: '2024-09-19',
              announcedAt: '2024-09-19',
              releasedAt: '2024-09-19',
              gaAt: '2024-09-19',
              knowledgeCutoff: '2024-06-01',
              status: 'superseded',
              historicalOnly: true,
              sourceIds: ['qwen-25-max'],
              notes: 'Referência anterior em modelos abertos para workstation.'
            },
            {
              modelId: 'qwen3-8-27b',
              name: 'Qwen 3.8 27B',
              releaseDate: '2026-08-22',
              announcedAt: '2026-08-22',
              releasedAt: '2026-08-22',
              gaAt: '2026-08-22',
              knowledgeCutoff: '2026-05-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['qwen-38-max'],
              notes: 'Modelo aberto otimizado para GPUs com 16 GB de VRAM.'
            },
            {
              modelId: 'qwen3-8-2-4t-a95b',
              name: 'Qwen 3.8 2.4T A95B',
              releaseDate: '2026-08-25',
              announcedAt: '2026-08-25',
              releasedAt: '2026-08-25',
              gaAt: '2026-08-25',
              knowledgeCutoff: '2026-05-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['qwen-38-max'],
              notes: 'MoE aberto de escala massiva (2.4T parâmetros totais, 95B ativos) para infraestrutura datacenter multi-GPU.'
            }
          ]
        }
      ],
      connections: [
        { from: 'qwen-2-5-max', to: 'qwen3-7-max', relationType: 'generation-successor', changeType: 'reasoning-boost', status: 'verified', confidence: 'high', sourceIds: ['qwen-38-max'], improvements: 'Ganhos no SWE-bench e raciocínio matemático estendido.' },
        { from: 'qwen3-7-max', to: 'qwen3-8-max', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'verified', confidence: 'high', sourceIds: ['qwen-38-max'], improvements: 'Redução de alucinações e suporte agêntico nativo.' },
        { from: 'qwen3-8-max', to: 'qwen3-8-flash', relationType: 'parallel-branch', changeType: 'distillation-speed', status: 'verified', confidence: 'high', sourceIds: ['qwen-38-flash'], improvements: 'Variante de alta velocidade (300+ tok/s) otimizada para fluxos contínuos.' },
        { from: 'qwen-2-5-72b', to: 'qwen3-8-27b', relationType: 'generation-successor', changeType: 'compression-breakthrough', status: 'verified', confidence: 'high', sourceIds: ['qwen-38-max'], improvements: '27B superando o antigo 72B consumindo apenas 16 GB VRAM.' },
        { from: 'qwen3-8-27b', to: 'qwen3-8-2-4t-a95b', relationType: 'parallel-branch', changeType: 'scale-up-moe', status: 'verified', confidence: 'high', sourceIds: ['qwen-38-max'], improvements: 'Escala para MoE massivo de 2.4T parâmetros totais para servidores dedicados.' }
      ]
    },
    {
      familyId: 'moonshot-kimi',
      familyName: 'Moonshot AI Kimi Architecture Tree',
      description: 'Linhagem de raciocínio de contexto longo e engenharia de software desenvolvida pela Moonshot AI.',
      tracks: [
        {
          trackId: 'kimi-frontier-track',
          trackName: 'Trilha Kimi Frontier (Contexto Longo & Raciocínio Geral)',
          trackDesc: 'Evolução dos modelos de raciocínio com janelas de contexto estendidas',
          nodes: [
            {
              modelId: 'kimi-k2-6',
              name: 'Kimi K2.6',
              releaseDate: '2025-06-15',
              announcedAt: '2025-06-15',
              releasedAt: '2025-06-15',
              gaAt: '2025-06-15',
              knowledgeCutoff: '2025-03-01',
              status: 'superseded',
              historicalOnly: false,
              sourceIds: ['moonshot-kimi-k26'],
              notes: 'Modelo de contexto ultra-longo nativo da Moonshot AI.'
            },
            {
              modelId: 'kimi-k3',
              name: 'Kimi K3',
              releaseDate: '2026-06-10',
              announcedAt: '2026-06-10',
              releasedAt: '2026-06-10',
              gaAt: '2026-06-10',
              knowledgeCutoff: '2026-03-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['moonshot-kimi-k3'],
              notes: 'Flagship de raciocínio de próxima geração com contexto estendido.'
            }
          ]
        },
        {
          trackId: 'kimi-code-track',
          trackName: 'Trilha Kimi Code (Especialização em Programação)',
          trackDesc: 'Modelos especializados em síntese e refatoração de código de software',
          nodes: [
            {
              modelId: 'kimi-k2-7-code',
              name: 'Kimi K2.7 Code',
              releaseDate: '2026-01-20',
              announcedAt: '2026-01-20',
              releasedAt: '2026-01-20',
              gaAt: '2026-01-20',
              knowledgeCutoff: '2025-10-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['moonshot-kimi-k27'],
              notes: 'Especialização focada em programação, depuração e manipulação de repositórios.'
            }
          ]
        }
      ],
      connections: [
        { from: 'kimi-k2-6', to: 'kimi-k3', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'inferred', confidence: 'medium', sourceIds: ['moonshot-kimi-k3'], improvements: 'Evolução geracional de raciocínio e capacidade de contexto.', notes: 'Evolução empírica de arquitetura de contexto ultra-longo baseada em comunicados de API sem whitepaper de pesos.' },
        { from: 'kimi-k2-6', to: 'kimi-k2-7-code', relationType: 'parallel-branch', changeType: 'specialization', status: 'inferred', confidence: 'medium', sourceIds: ['moonshot-kimi-k27'], improvements: 'Especialização em código e aderência a ferramentas.', notes: 'Ramo especializado em código inferido a partir de documentação técnica da API Moonshot.' }
      ]
    },
    {
      familyId: 'minimax-family',
      familyName: 'MiniMax M-Series Architecture Tree',
      description: 'Modelos multimodais e de raciocínio com janelas de contexto nativas de 1 milhão de tokens da MiniMax.',
      tracks: [
        {
          trackId: 'minimax-frontier-track',
          trackName: 'Trilha MiniMax Frontier',
          trackDesc: 'Raciocínio frontier com alta capacidade multimodal e contexto longo',
          nodes: [
            {
              modelId: 'minimax-m2-7',
              name: 'MiniMax M2.7',
              releaseDate: '2025-11-10',
              announcedAt: '2025-11-10',
              releasedAt: '2025-11-10',
              gaAt: '2025-11-10',
              knowledgeCutoff: '2025-08-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['minimax-m27'],
              notes: 'Modelo de alta densidade multimodal e textual MiniMax.'
            },
            {
              modelId: 'minimax-m3',
              name: 'MiniMax M3',
              releaseDate: '2026-05-15',
              announcedAt: '2026-05-15',
              releasedAt: '2026-05-15',
              gaAt: '2026-05-15',
              knowledgeCutoff: '2026-02-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['minimax-m3'],
              notes: 'Nova geração de raciocínio frontier da MiniMax com 1M de contexto nativo.'
            }
          ]
        }
      ],
      connections: [
        { from: 'minimax-m2-7', to: 'minimax-m3', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'inferred', confidence: 'medium', sourceIds: ['minimax-m3'], improvements: 'Salto em raciocínio agêntico e contexto nativo de 1M.', notes: 'Continuidade de pipeline de raciocínio híbrido e contexto de 1M sem whitepaper de pré-treino detalhando herança de pesos.' }
      ]
    },
    {
      familyId: 'meta-muse',
      familyName: 'Meta Muse Spark Tree',
      description: 'Linhagem de modelos de engenharia e raciocínio de código desenvolvidos pela Meta AI.',
      tracks: [
        {
          trackId: 'meta-muse-track',
          trackName: 'Trilha Muse Spark',
          trackDesc: 'Modelos de engenharia de software e raciocínio técnico',
          nodes: [
            {
              modelId: 'muse-spark-1-2',
              name: 'Muse Spark 1.2',
              releaseDate: '2026-04-18',
              announcedAt: '2026-04-18',
              releasedAt: '2026-04-18',
              gaAt: '2026-04-18',
              knowledgeCutoff: '2026-01-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['meta-muse-spark'],
              notes: 'Primeira versão pública da linhagem de código e engenharia da Meta.'
            },
            {
              modelId: 'muse-spark-1-3',
              name: 'Muse Spark 1.3',
              releaseDate: '2026-07-10',
              announcedAt: '2026-07-10',
              releasedAt: '2026-07-10',
              gaAt: '2026-07-10',
              knowledgeCutoff: '2026-04-01',
              status: 'active',
              historicalOnly: false,
              sourceIds: ['meta-muse-spark'],
              notes: 'Atualização geracional com refinamentos de alinhamento e aderência a ferramentas.'
            }
          ]
        }
      ],
      connections: [
        { from: 'muse-spark-1-2', to: 'muse-spark-1-3', relationType: 'generation-successor', changeType: 'generational-upgrade', status: 'inferred', confidence: 'medium', sourceIds: ['meta-muse-spark'], improvements: 'Evolução geracional de alinhamento e síntese de código.', notes: 'Evolução geracional de alinhamento e síntese de código sem divulgação de arquitetura de pesos.' }
      ]
    },
    {
      familyId: 'tencent-hunyuan',
      familyName: 'Tencent Hunyuan Tree',
      description: 'Evolução dos modelos Hunyuan desenvolvidos pela Tencent para chat, coding e automação.',
      tracks: [
        {
          trackId: 'tencent-hy-track',
          trackName: 'Trilha Tencent Hunyuan',
          trackDesc: 'Modelos proprietários e previews de nova geração',
          nodes: [
            {
              modelId: 'hy3-tencent',
              name: 'Hy3 Tencent',
              releaseDate: '2025-10-12',
              announcedAt: '2025-10-12',
              releasedAt: '2025-10-12',
              gaAt: '2025-10-12',
              knowledgeCutoff: '2025-07-01',
              status: 'legacy',
              historicalOnly: false,
              sourceIds: ['tencent-hy'],
              notes: 'Modelo de produção da Tencent com forte aderência a ferramentas corporativas.'
            },
            {
              modelId: 'hy4-preview',
              name: 'Hy4 Preview',
              releaseDate: '2026-07-05',
              announcedAt: '2026-07-05',
              previewAt: '2026-07-05',
              releasedAt: '2026-07-05',
              gaAt: null,
              knowledgeCutoff: '2026-04-01',
              status: 'preview',
              historicalOnly: false,
              sourceIds: ['tencent-hy'],
              notes: 'Snapshot preliminar de avaliação da arquitetura de próxima geração Hy4.'
            }
          ]
        }
      ],
      connections: [
        { from: 'hy3-tencent', to: 'hy4-preview', relationType: 'generation-successor', changeType: 'preview-evolution', status: 'inferred', confidence: 'medium', sourceIds: ['tencent-hy'], improvements: 'Evolução de geração para a arquitetura Hy4 em regime de preview.', notes: 'Transição da arquitetura proprietária Hunyuan para regime preliminar de preview multimodal.' }
      ]
    }
  ],

  events: [
    {
      id: 'ev-20260904-retraction-aa-v42',
      date: '2026-09-04',
      publishedAt: '2026-09-04',
      modelId: 'gpt-6-astra',
      type: 'audit-retraction',
      eventType: 'audit-retraction',
      title: 'Retratação Metrológica: Correção de Benchmark Fictício Artificial Analysis v4.2',
      description: 'Retratação formal de evento que atribuía liderança ao GPT-6 Astra sobre o Claude Fable 5.1 no hipotético AA v4.2 (61 vs 59.6). Em conformidade com o rigor de dados, o Intelligence Index vigente auditado é o v4.1.1, onde Claude Fable 5.1 lidera com 66.0 vs 61.0 do Astra.',
      sourceId: 'aa-gpt6-astra-v411',
      sourceIds: ['aa-gpt6-astra-v411'],
      provenanceType: 'independent',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260903-astra-release',
      date: '2026-09-03',
      publishedAt: '2026-09-03',
      modelId: 'gpt-6-astra',
      type: 'release',
      eventType: 'release',
      title: 'OpenAI lança GPT-6 Astra',
      description: 'OpenAI oficializa GPT-6 Astra com 1.05M de contexto nativo, 5 níveis de reasoning effort, Responses API v2, async tool calling e mid-turn steering.',
      sourceId: 'openai-gpt6-astra-launch',
      sourceIds: ['openai-gpt6-astra-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260903-aa-astra-v411',
      date: '2026-09-03',
      publishedAt: '2026-09-03',
      modelId: 'gpt-6-astra',
      type: 'benchmark-update',
      eventType: 'benchmark-update',
      title: 'Artificial Analysis avalia GPT-6 Astra no Index v4.1.1',
      description: 'Artificial Analysis registra scores por esforço para GPT-6 Astra no Intelligence Index v4.1.1: Max 61.0, XHigh 61.0, High 60.0. Claude Fable 5.1 permanece líder isolado com score 66.0 (+5 pontos sobre Astra).',
      sourceId: 'aa-gpt6-astra-v411',
      sourceIds: ['aa-gpt6-astra-v411'],
      provenanceType: 'independent',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260902-qwen-snapshot',
      date: '2026-09-02',
      publishedAt: '2026-09-02',
      modelId: 'qwen3-8-max',
      type: 'snapshot-update',
      eventType: 'snapshot-update',
      title: 'Alibaba Cloud atualiza Qwen 3.8 Max (Snapshot 0902)',
      description: 'Alibaba Cloud lança checkpoint incremental 0902 no Model Studio com melhorias em estabilidade de parsing e aderência a schemas estruturados.',
      sourceId: 'qwen-38-max-0902',
      sourceIds: ['qwen-38-max-0902'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260902-gemini38-release',
      date: '2026-09-02',
      publishedAt: '2026-09-02',
      modelId: 'gemini-3-8-flash',
      type: 'release',
      eventType: 'release',
      title: 'Google lança Gemini 3.8 Flash e Gemini 3.8 Flash Cyber',
      description: 'Google DeepMind oficializa o Gemini 3.8 Flash com 90,8% no Terminal-Bench 2.1, 74,0% no DeepSWE 1.1 e 305 tok/s, juntamente com a variante Cyber via Fairwind.',
      sourceId: 'google-deepmind-gemini-38',
      sourceIds: ['google-deepmind-gemini-38'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260901-fable51-release',
      date: '2026-09-01',
      publishedAt: '2026-09-01',
      modelId: 'claude-fable-5-1',
      type: 'release',
      eventType: 'release',
      title: 'Anthropic anuncia Claude Fable 5.1',
      description: 'Lançamento do Claude Fable 5.1 estabelecendo 73,4% no CursorBench Max e score 66 no Artificial Analysis Intelligence Index v4.1.1.',
      sourceId: 'anthropic-fable51-launch',
      sourceIds: ['anthropic-fable51-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260901-fable5-superseded',
      date: '2026-09-01',
      publishedAt: '2026-09-01',
      modelId: 'claude-fable-5',
      type: 'superseded',
      eventType: 'superseded',
      title: 'Claude Fable 5 passa para status superseded',
      description: 'Com a chegada do Fable 5.1 (que reduz o custo de cache read em 75% e melhora scores), Fable 5 é mantido para fins históricos e geracionais.',
      sourceId: 'anthropic-fable51-launch',
      sourceIds: ['anthropic-fable51-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260826-qwen38-flash',
      date: '2026-08-26',
      publishedAt: '2026-08-26',
      modelId: 'qwen3-8-flash',
      type: 'release',
      eventType: 'release',
      title: 'Alibaba Cloud lança Qwen 3.8 Flash',
      description: 'Disponibilização do Qwen 3.8 Flash focado em alta velocidade e custos reduzidos no Model Studio.',
      sourceId: 'qwen-38-flash',
      sourceIds: ['qwen-38-flash'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260826-glm-reveal',
      date: '2026-08-26',
      publishedAt: '2026-08-26',
      modelId: 'glm-5-3-flash',
      type: 'identity-reveal',
      eventType: 'identity-reveal',
      title: 'Z.ai revela Ox Alpha como GLM-5.3-Flash',
      description: 'A Z.ai encerra o regime anônimo no OpenCode e OpenRouter, confirmando que o modelo stealth Ox Alpha é o GLM-5.3-Flash sob licença permissiva MIT.',
      sourceId: 'zai-glm-53-flash',
      sourceIds: ['zai-glm-53-flash'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260826-glm-weights',
      date: '2026-08-26',
      publishedAt: '2026-08-26',
      modelId: 'glm-5-3-flash',
      type: 'weights-released',
      eventType: 'weights-released',
      title: 'Liberação de Pesos Abertos sob Licença MIT',
      description: 'Disponibilização pública dos checkpoints do MoE de 320B (18B ativos) no HuggingFace e plataformas de inferência aberta.',
      sourceId: 'zai-glm-53-flash',
      sourceIds: ['zai-glm-53-flash'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260826-glm-pricing',
      date: '2026-08-26',
      publishedAt: '2026-08-26',
      modelId: 'glm-5-3-flash',
      type: 'pricing-change',
      eventType: 'pricing-change',
      title: 'Encerramento do Preview Gratuito e Desconto Promocional de 50%',
      description: 'O endpoint gratuito de testes é descontinuado e substituído por tabela com 50% de desconto promocional ($0,075 in / $0,25 out).',
      sourceId: 'zai-glm-53-flash',
      sourceIds: ['zai-glm-53-flash'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260826-grok-foundry',
      date: '2026-08-26',
      publishedAt: '2026-08-26',
      modelId: 'grok-4-6',
      type: 'availability-expansion',
      eventType: 'availability-expansion',
      title: 'Grok 4.6 disponível no Palantir Foundry',
      description: 'Palantir anuncia integração do Grok 4.6 à plataforma Foundry para operações de defesa e inteligência.',
      sourceId: 'xai-grok-46',
      sourceIds: ['xai-grok-46'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260821-sol-volume-credit',
      date: '2026-08-21',
      publishedAt: '2026-08-21',
      modelId: 'gpt-5-6-sol',
      type: 'pricing-change',
      eventType: 'pricing-change',
      title: 'OpenAI introduz desconto de créditos >20% para Sol',
      description: 'OpenAI estabelece programa de descontos em escala para requisições em lote e compromisso de volume no GPT-5.6 Sol.',
      sourceId: 'openai-gpt56-launch',
      sourceIds: ['openai-gpt56-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260821-grok-gcp',
      date: '2026-08-21',
      publishedAt: '2026-08-21',
      modelId: 'grok-4-6',
      type: 'availability-expansion',
      eventType: 'availability-expansion',
      title: 'Grok 4.6 integrado ao Google Cloud & Gemini Enterprise',
      description: 'Google Cloud oficializa a oferta de Grok 4.6 no catálogo de modelos de terceiros para clientes corporativos.',
      sourceId: 'xai-grok-46',
      sourceIds: ['xai-grok-46'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260821-ds-vision',
      date: '2026-08-21',
      publishedAt: '2026-08-21',
      modelId: 'deepseek-v4-vision-exp',
      type: 'release',
      eventType: 'release',
      title: 'DeepSeek lança DeepSeek V4 Vision Experimental',
      description: 'DeepSeek disponibiliza endpoint experimental da vertente de visão computacional da família V4.',
      sourceId: 'deepseek-v4-vision-exp',
      sourceIds: ['deepseek-v4-vision-exp'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260820-ox-alpha-stealth',
      date: '2026-08-20',
      publishedAt: '2026-08-20',
      modelId: 'glm-5-3-flash',
      type: 'preview',
      eventType: 'preview',
      title: 'Surge anonimamente o modelo Ox Alpha',
      description: 'Modelo anônimo com 1M de contexto surge em regime stealth sem identificação de fabricante no OpenRouter e OpenCode Go.',
      sourceId: 'deepswe-datacurve',
      sourceIds: ['deepswe-datacurve'],
      provenanceType: 'independent',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260819-grok-bedrock',
      date: '2026-08-19',
      publishedAt: '2026-08-19',
      modelId: 'grok-4-6',
      type: 'availability-expansion',
      eventType: 'availability-expansion',
      title: 'Grok 4.6 disponível no AWS Bedrock',
      description: 'AWS disponibiliza Grok 4.6 para clientes corporativos com suporte a guardrails e faturamento integrado.',
      sourceId: 'xai-grok-46',
      sourceIds: ['xai-grok-46'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260814-grok-copilot',
      date: '2026-08-14',
      publishedAt: '2026-08-14',
      modelId: 'grok-4-6',
      type: 'availability-expansion',
      eventType: 'availability-expansion',
      title: 'Grok 4.6 integrado ao Microsoft Copilot',
      description: 'Microsoft anuncia disponibilização de Grok 4.6 como motor de raciocínio de código no Copilot.',
      sourceId: 'xai-grok-46',
      sourceIds: ['xai-grok-46'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260813-sol-ultrafast',
      date: '2026-08-13',
      publishedAt: '2026-08-13',
      modelId: 'gpt-5-6-sol',
      type: 'preview',
      eventType: 'preview',
      title: 'OpenAI anuncia preview de GPT-5.6 Ultrafast',
      description: 'OpenAI inicia preview fechado do tier de inferência de baixa latência para o modelo Sol.',
      sourceId: 'openai-gpt56-launch',
      sourceIds: ['openai-gpt56-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260813-gemini37-release',
      date: '2026-08-13',
      publishedAt: '2026-08-13',
      modelId: 'gemini-3-7-flash',
      type: 'release',
      eventType: 'release',
      title: 'Google lança Gemini 3.7 Flash',
      description: 'Google DeepMind oficializa o Gemini 3.7 Flash com dynamic thinking configurável e 85,8% no Terminal-Bench 2.1.',
      sourceId: 'google-deepmind-gemini-37',
      sourceIds: ['google-deepmind-gemini-37'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260813-ds-v4-pro',
      date: '2026-08-13',
      publishedAt: '2026-08-13',
      modelId: 'deepseek-v4-pro-0813',
      type: 'release',
      eventType: 'release',
      title: 'DeepSeek oficializa DeepSeek V4 Pro (GA Checkpoint 0813)',
      description: 'DeepSeek disponibiliza em GA o checkpoint 0813 do V4 Pro com score oficial de 62.7% no DeepSWE e integração agêntica a $0,55/M.',
      sourceId: 'deepseek-v4-pro-ga',
      sourceIds: ['deepseek-v4-pro-ga'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260812-grok46-release',
      date: '2026-08-12',
      publishedAt: '2026-08-12',
      modelId: 'grok-4-6',
      type: 'release',
      eventType: 'release',
      title: 'xAI lança Grok 4.6',
      description: 'xAI disponibiliza o Grok 4.6 com foco em velocidade, autonomia em ambiente bash/CLI e baixa recusa.',
      sourceId: 'xai-grok-46',
      sourceIds: ['xai-grok-46'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260806-chatgpt-update',
      date: '2026-08-06',
      publishedAt: '2026-08-06',
      modelId: 'gpt-5-6-sol',
      type: 'rollout',
      eventType: 'rollout',
      title: 'ChatGPT atualiza interface integrando capacidades de GPT-5.6',
      description: 'OpenAI atualiza a camada de orquestração do ChatGPT para suporte dinâmico a reasoning modes do GPT-5.6.',
      sourceId: 'openai-gpt56-launch',
      sourceIds: ['openai-gpt56-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260802-qwen38-max',
      date: '2026-08-02',
      publishedAt: '2026-08-02',
      modelId: 'qwen3-8-max',
      type: 'release',
      eventType: 'release',
      title: 'Alibaba Cloud lança Qwen 3.8 Max no Model Studio',
      description: 'Disponibilização do modelo denso proprietário Qwen 3.8 Max para empresas e desenvolvedores na nuvem Alibaba.',
      sourceId: 'qwen-38-max',
      sourceIds: ['qwen-38-max'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260731-ds-v4-flash',
      date: '2026-07-31',
      publishedAt: '2026-07-31',
      modelId: 'deepseek-v4-flash-0731',
      type: 'release',
      eventType: 'release',
      title: 'DeepSeek disponibiliza DeepSeek V4 Flash (0731)',
      description: 'Lançamento do V4 Flash focado em ultra-baixa latência e custo agressivo de $0,14 / $0,55 por milhão.',
      sourceId: 'deepseek-v4-org',
      sourceIds: ['deepseek-v4-org'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260730-openai-price-cut',
      date: '2026-07-30',
      publishedAt: '2026-07-30',
      modelId: 'gpt-5-6-luna',
      type: 'pricing-change',
      eventType: 'pricing-change',
      title: 'OpenAI reduz preços de GPT-5.6 Luna (-80%) e Terra (-20%)',
      description: 'OpenAI anuncia agressivo reposicionamento tarifário: Luna passa para $0,20/$1,20 por milhão (-80%) e Terra para $2,00/$12,00 (-20%).',
      sourceId: 'openai-gpt56-launch',
      sourceIds: ['openai-gpt56-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260724-opus5-release',
      date: '2026-07-24',
      publishedAt: '2026-07-24',
      modelId: 'claude-opus-5',
      type: 'release',
      eventType: 'release',
      title: 'Anthropic oficializa Claude Opus 5',
      description: 'Lançamento do Claude Opus 5 com saída expandida de 128k e contexto nativo de 1M de tokens.',
      sourceId: 'anthropic-opus5-launch',
      sourceIds: ['anthropic-opus5-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260716-grok45-release',
      date: '2026-07-16',
      publishedAt: '2026-07-16',
      modelId: 'grok-4-5',
      type: 'release',
      eventType: 'release',
      title: 'xAI lança Grok 4.5',
      description: 'xAI oficializa o Grok 4.5 treinado no cluster Colossus com avanços em resolução matemática e lógica.',
      sourceId: 'xai-grok-45',
      sourceIds: ['xai-grok-45'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260715-glm53-release',
      date: '2026-07-15',
      publishedAt: '2026-07-15',
      modelId: 'glm-5-3',
      type: 'release',
      eventType: 'release',
      title: 'Z.ai oficializa GLM-5.3 Full',
      description: 'Lançamento do modelo frontier completo de 753B parâmetros com raciocínio mandatório.',
      sourceId: 'zai-glm-53-flash',
      sourceIds: ['zai-glm-53-flash'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260709-gpt56-ga',
      date: '2026-07-09',
      publishedAt: '2026-07-09',
      modelId: 'gpt-5-6-sol',
      type: 'ga',
      eventType: 'ga',
      title: 'OpenAI lança oficialmente em GA a família GPT-5.6',
      description: 'Disponibilização geral (GA) dos modelos GPT-5.6 Sol ($4/$20), GPT-5.6 Terra e GPT-5.6 Luna na API OpenAI com Responses API.',
      sourceId: 'openai-gpt56-launch',
      sourceIds: ['openai-gpt56-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260701-fable5-restored',
      date: '2026-07-01',
      publishedAt: '2026-06-30',
      modelId: 'claude-fable-5',
      type: 'redeployment',
      eventType: 'redeployment',
      title: 'Anthropic restaura disponibilidade do Claude Fable 5',
      description: 'Disponibilidade pública do Fable 5 é reativada após implementação de salvaguardas adicionais para conformidade com controles de exportação.',
      sourceId: 'anthropic-fable5-redeploy',
      sourceIds: ['anthropic-fable5-redeploy'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260630-sonnet5-release',
      date: '2026-06-30',
      publishedAt: '2026-06-30',
      modelId: 'claude-sonnet-5',
      type: 'release',
      eventType: 'release',
      title: 'Anthropic disponibiliza Claude Sonnet 5',
      description: 'Claude Sonnet 5 lançado com precificação de $2/$10 e ganhos em SWE-bench Verified como sucessor geracional do Sonnet 4.6.',
      sourceId: 'anthropic-sonnet5-launch',
      sourceIds: ['anthropic-sonnet5-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260626-gpt56-preview',
      date: '2026-06-26',
      publishedAt: '2026-06-26',
      modelId: 'gpt-5-6-sol',
      type: 'preview',
      eventType: 'preview',
      title: 'OpenAI inicia Limited Preview do GPT-5.6 Sol',
      description: 'Início do preview para desenvolvedores selecionados do primeiro modelo frontier da família 5.6 com raciocínio adaptativo.',
      sourceId: 'openai-gpt56-preview',
      sourceIds: ['openai-gpt56-preview'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260612-fable5-suspended',
      date: '2026-06-12',
      publishedAt: '2026-06-12',
      modelId: 'claude-fable-5',
      type: 'suspension',
      eventType: 'suspension',
      title: 'Anthropic suspende temporariamente o Claude Fable 5',
      description: 'Suspensão temporária do acesso público à API do Fable 5 para adequação a diretrizes de segurança e controle de exportação internacional.',
      sourceId: 'anthropic-fable5-redeploy',
      sourceIds: ['anthropic-fable5-redeploy'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260609-fable5-launch',
      date: '2026-06-09',
      publishedAt: '2026-06-09',
      modelId: 'claude-fable-5',
      type: 'release',
      eventType: 'release',
      title: 'Anthropic lança Claude Fable 5',
      description: 'Anúncio inaugural da linhagem Fable focada em ultra-raciocínio e planejamento agêntico em software complexo.',
      sourceId: 'anthropic-fable5-launch',
      sourceIds: ['anthropic-fable5-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260519-gemini35-io',
      date: '2026-05-19',
      publishedAt: '2026-05-19',
      modelId: 'gemini-3-5-flash',
      type: 'announcement',
      eventType: 'announcement',
      title: 'Google apresenta família Gemini 3.5 no Google I/O',
      description: 'Google DeepMind apresenta arquitetura 3.5 com contexto longo de 1M de tokens e anuncia rollout de Flash e Pro.',
      sourceId: 'google-gemini-35',
      sourceIds: ['google-gemini-35'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260424-ds-v4-preview',
      date: '2026-04-24',
      publishedAt: '2026-04-24',
      modelId: 'deepseek-v4-pro-0813',
      type: 'preview',
      eventType: 'preview',
      title: 'DeepSeek publica Preview da Arquitetura V4',
      description: 'Relatório preliminar de pesquisa introduzindo a arquitetura MLA expandida para contexto de 1 milhão de tokens.',
      sourceId: 'deepseek-v4-preview',
      sourceIds: ['deepseek-v4-preview'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20260219-gemini31-pro',
      date: '2026-02-19',
      publishedAt: '2026-02-19',
      modelId: 'gemini-3-1-pro',
      type: 'preview',
      eventType: 'preview',
      title: 'Google inicia Preview do Gemini 3.1 Pro',
      description: 'Google DeepMind libera acesso preliminar de API para o Gemini 3.1 Pro para tarefas multimodais densas e matemática.',
      sourceId: 'google-gemini-31-pro',
      sourceIds: ['google-gemini-31-pro'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20251201-ds-v32',
      date: '2025-12-01',
      publishedAt: '2025-12-01',
      modelId: 'deepseek-v3-2',
      type: 'release',
      eventType: 'release',
      title: 'DeepSeek publica atualização DeepSeek V3.2',
      description: 'Atualização de estabilidade no pós-treino aprimorando confiabilidade de geração de código e JSON output.',
      sourceId: 'deepseek-v32-updates',
      sourceIds: ['deepseek-v32-updates'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20250805-gpt-oss',
      date: '2025-08-05',
      publishedAt: '2025-08-05',
      modelId: 'gpt-oss-20b',
      type: 'weights-released',
      eventType: 'weights-released',
      title: 'OpenAI lança modelos gpt-oss abertos (Apache 2.0)',
      description: 'OpenAI surpreende a comunidade técnica liberando pesos abertos sob licença Apache 2.0 para os modelos gpt-oss-20b e gpt-oss-120b.',
      sourceId: 'openai-gpt-oss-launch',
      sourceIds: ['openai-gpt-oss-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20250416-o3-release',
      date: '2025-04-16',
      publishedAt: '2025-04-16',
      modelId: 'openai-o3',
      type: 'release',
      eventType: 'release',
      title: 'OpenAI lança publicamente o modelo de raciocínio o3',
      description: 'OpenAI oficializa a disponibilidade geral do o3 e o4-mini na API e produtos para assinantes.',
      sourceId: 'openai-o3-launch',
      sourceIds: ['openai-o3-launch'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20250128-qwen25-max',
      date: '2025-01-28',
      publishedAt: '2025-01-28',
      modelId: 'qwen-2-5-max',
      type: 'release',
      eventType: 'release',
      title: 'Alibaba Cloud lança Qwen2.5-Max',
      description: 'Lançamento do modelo denso proprietário de alta capacidade da Alibaba para inferência em nuvem.',
      sourceId: 'qwen-25-max',
      sourceIds: ['qwen-25-max'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    },
    {
      id: 'ev-20240912-o1-preview',
      date: '2024-09-12',
      publishedAt: '2024-09-12',
      modelId: 'openai-o1',
      type: 'preview',
      eventType: 'preview',
      title: 'OpenAI introduz o1-preview e CoT oculta',
      description: 'Marco fundador do paradigma de inferência deliberativa em tempo de execução para código e problemas formais.',
      sourceId: 'openai-o1-preview',
      sourceIds: ['openai-o1-preview'],
      provenanceType: 'official',
      confidence: 'high',
      status: 'verified'
    }
  ]
};

const BENCHMARK_HISTORY_DATA = [
  {
    modelId: 'gpt-6-astra',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1',
    effort: 'xhigh',
    harness: 'DataCurve-SWE-v1.1',
    date: '2026-09-04',
    score: 74.1,
    confidenceInterval: 0.9,
    costPerTaskUsd: 6.80,
    tokensPerTask: 112000,
    agentSteps: 98,
    sourceId: 'deepswe-datacurve-v11',
    sourceType: 'independent',
    notes: 'Avaliação independente DataCurve v1.1 no esforço XHigh: 74.1% de taxa de resolução superando Gemini 3.8 Flash (74.0%).'
  },
  {
    modelId: 'gpt-6-astra',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1',
    effort: 'high',
    harness: 'DataCurve-SWE-v1.1',
    date: '2026-09-04',
    score: 71.8,
    confidenceInterval: 1.1,
    costPerTaskUsd: 5.72,
    tokensPerTask: 96000,
    agentSteps: 88,
    sourceId: 'deepswe-datacurve-v11',
    sourceType: 'independent',
    notes: 'Avaliação independente DataCurve v1.1 no esforço High: 71.8% com custo médio de $5.72 por tarefa resolvida.'
  },
  {
    modelId: 'gpt-6-astra',
    benchmark: 'Terminal-Bench',
    benchmarkVersion: '4.0',
    effort: 'high',
    harness: 'TB4-Official-Harness',
    date: '2026-09-03',
    score: 57.9,
    confidenceInterval: null,
    costPerTaskUsd: 4.50,
    tokensPerTask: 62000,
    agentSteps: 64,
    sourceId: 'openai-gpt6-astra-launch',
    sourceType: 'official',
    notes: 'Avaliação oficial no novo Terminal-Bench 4.0: 57.9% de sucesso em ambiente CLI/terminal agêntico autônomo.'
  },
  {
    modelId: 'gpt-6-astra',
    benchmark: 'Terminal-Bench Science',
    benchmarkVersion: '0.1',
    effort: 'max',
    harness: 'Snorkel-Science-v0.1',
    date: '2026-09-04',
    score: 65.4,
    confidenceInterval: 2.5,
    costPerTaskUsd: 8.40,
    tokensPerTask: 118000,
    agentSteps: 102,
    sourceId: 'snorkel-terminal-bench-science',
    sourceType: 'independent',
    notes: 'Auditoria independente Snorkel AI no Terminal-Bench Science 0.1: 65.4% de acurácia em tarefas científicas complexas via terminal.'
  },
  {
    modelId: 'gpt-6-astra',
    benchmark: 'Artificial Analysis Intelligence Index',
    benchmarkVersion: 'v4.1.1',
    effort: 'max',
    harness: 'AA-Index-Suite-v4.1.1',
    date: '2026-09-03',
    score: 61.0,
    confidenceInterval: null,
    costPerTaskUsd: 1.67,
    tokensPerTask: null,
    agentSteps: null,
    sourceId: 'aa-gpt6-astra-v411',
    sourceType: 'independent',
    notes: 'Índice AA v4.1.1 no esforço Max (61.0 pontos). Fable 5.1 permanece líder isolado com score 66.0.'
  },
  {
    modelId: 'gemini-3-8-flash',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1',
    effort: 'high',
    harness: 'DataCurve-SWE-v1.1',
    date: '2026-09-02',
    score: 74.0,
    confidenceInterval: 1.0,
    costPerTaskUsd: 2.36,
    tokensPerTask: 143000,
    agentSteps: 166,
    sourceId: 'deepswe-datacurve',
    sourceType: 'independent',
    notes: 'Avaliação independente de 113 tarefas do DeepSWE 1.1 demonstrando altíssima autonomia e persistência a $2.36/task.'
  },
  {
    modelId: 'gemini-3-8-flash',
    benchmark: 'Terminal-Bench',
    benchmarkVersion: '2.1',
    effort: 'standard',
    harness: 'TB2.1-Official',
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
    effort: 'max',
    harness: 'CursorBench-Live-3.2',
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
    effort: 'max',
    harness: 'CursorBench-Live-3.2',
    date: '2026-06-15',
    score: 70.5,
    confidenceInterval: null,
    costPerTaskUsd: 17.32,
    tokensPerTask: 103525,
    agentSteps: 85,
    sourceId: 'cursorbench-32',
    sourceType: 'independent',
    notes: 'Resultado histórico do Fable 5 predecessor antes das otimizações tarifárias e de cache do 5.1.'
  },
  {
    modelId: 'glm-5-3-flash',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1 (Stealth Preview)',
    effort: 'default',
    harness: 'DataCurve-SWE-v1.1',
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
    effort: 'default',
    harness: 'ZAI-Benchmark-Harness',
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
    effort: 'high',
    harness: 'DataCurve-SWE-v1.1',
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
    effort: 'max',
    harness: 'AA-TB2.1-Audited',
    date: '2026-09-01',
    score: 91.4,
    confidenceInterval: null,
    costPerTaskUsd: 4.80,
    tokensPerTask: 48000,
    agentSteps: 52,
    sourceId: 'artificial-analysis-sep2026',
    sourceType: 'independent',
    notes: 'Auditoria independente Artificial Analysis: pontuação de referência no Terminal-Bench 2.1.'
  },
  {
    modelId: 'claude-fable-5-1',
    benchmark: 'SciCode',
    benchmarkVersion: '1.0',
    effort: 'max',
    harness: 'SciCode-Evaluation',
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
    effort: 'default',
    harness: 'AA-TB2.1-Audited',
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
    effort: 'max',
    harness: 'CursorBench-Live-3.2',
    date: '2026-08-10',
    score: 71.2,
    confidenceInterval: null,
    costPerTaskUsd: 11.20,
    tokensPerTask: 82000,
    agentSteps: 78,
    sourceId: 'cursorbench-32',
    sourceType: 'independent',
    notes: 'Avaliação independente de código em contexto longo.'
  },
  {
    modelId: 'deepseek-v4-pro-0813',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1',
    effort: 'default',
    harness: 'DeepSeek-Official-Harness',
    date: '2026-08-13',
    score: 62.7,
    confidenceInterval: 1.5,
    costPerTaskUsd: 1.85,
    tokensPerTask: 82000,
    agentSteps: 74,
    sourceId: 'deepseek-v4-pro-ga',
    sourceType: 'official',
    notes: 'Score oficial reportado pela DeepSeek no lançamento GA do checkpoint 0813 (62.7% no DeepSWE).'
  },
  {
    modelId: 'deepseek-v3-2',
    benchmark: 'LiveCodeBench',
    benchmarkVersion: 'v6',
    effort: 'default',
    harness: 'LiveCodeBench-v6',
    date: '2026-08-15',
    score: 49.8,
    confidenceInterval: null,
    costPerTaskUsd: 0.18,
    tokensPerTask: 28000,
    agentSteps: 34,
    sourceId: 'livecodebench-v6',
    sourceType: 'independent',
    notes: 'Eficiência de custo em desafios competitivos de código aberto.'
  }
];

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MODEL_HISTORY_DATA, BENCHMARK_HISTORY_DATA };
}
