/**
 * DATA PACK: LINHAGENS HISTÓRICAS, ÁRVORES GERACIONAIS & HISTÓRICO DE BENCHMARKS
 * Base canônica para a rota #history e dossiês de modelo.
 * Conforme especificação normativa de docs/prompts/09-prompt-layout.md e 01-prompt-ajuste.md (Seções 8, 9, 10, 11).
 */

const MODEL_HISTORY_DATA = {
  lineages: [
    {
      familyId: 'anthropic-claude',
      familyName: 'Anthropic Claude Architecture Tree',
      description: 'Linhagens especializadas da Anthropic divididas em quatro vertentes geracionais paralelas: Fable (Ultra-Reasoning), Opus (Frontier Heavyweight), Sonnet (Daily Driver / Agêntico) e Haiku (Subagentes). Cada linha evolui de forma estritamente independente.',
      tracks: [
        {
          trackId: 'claude-fable-track',
          trackName: 'Trilha Claude Fable (Ultra-Reasoning & Planejamento Agêntico)',
          trackDesc: 'Raciocínio profundo e autonomia líder no CursorBench 3.2',
          nodes: [
            { modelId: 'claude-fable-5', name: 'Claude Fable 5', releaseDate: '2026-05-15', status: 'superseded', notes: 'Primeiro modelo da classe Fable; 70,5% CursorBench Max, tarifa $10/$50, cache read $1,00/M.' },
            { modelId: 'claude-fable-5-1', name: 'Claude Fable 5.1', releaseDate: '2026-09-01', status: 'active', notes: 'Atual líder absoluto: 73,4% CursorBench Max ($9,64/task), AA Index 66, cache read reduzido em 75% ($0,25/M).' }
          ]
        },
        {
          trackId: 'claude-opus-track',
          trackName: 'Trilha Claude Opus (Frontier Heavyweight & Contexto Longo 1M)',
          trackDesc: 'Modelos de máxima densidade conceitual, raciocínio novo e grandes bases de código',
          nodes: [
            { modelId: 'claude-3-opus', name: 'Claude 3 Opus', releaseDate: '2024-03-04', status: 'superseded', notes: 'Pioneiro frontier em raciocínio complexo e redação técnica.' },
            { modelId: 'claude-opus-4-6', name: 'Claude Opus 4.6', releaseDate: '2026-02-05', status: 'legacy', notes: 'Raciocínio adaptativo 1M, tarifa $5/$25, mantido em produção.' },
            { modelId: 'claude-opus-5', name: 'Claude Opus 5', releaseDate: '2026-06-12', status: 'active', notes: 'Frontier 1M com saída expandida de 128k e tarifa $5/$25.' }
          ]
        },
        {
          trackId: 'claude-sonnet-track',
          trackName: 'Trilha Claude Sonnet (Daily Driver & Engenharia Agêntica)',
          trackDesc: 'Cavalo de batalha diário com melhor custo-benefício para desenvolvimento e coding',
          nodes: [
            { modelId: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', releaseDate: '2024-06-20', status: 'superseded', notes: 'Marco histórico de coding prático que estabeleceu a dominância da família Sonnet.' },
            { modelId: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', releaseDate: '2025-02-24', status: 'superseded', notes: 'Primeiro modelo híbrido da Anthropic com raciocínio estendido configurável.' },
            { modelId: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', releaseDate: '2026-02-17', status: 'legacy', notes: 'Workhorse balanceado de geração anterior (79,6% SWE-bench Verified).' },
            { modelId: 'claude-sonnet-5', name: 'Claude Sonnet 5', releaseDate: '2026-06-20', status: 'active', notes: 'Novo padrão de custo-benefício intermediário ($2/$10).' }
          ]
        },
        {
          trackId: 'claude-haiku-track',
          trackName: 'Trilha Claude Haiku (Subagentes de Alta Velocidade)',
          trackDesc: 'Execução de subtarefas rápidas, triagem e formatação sintática',
          nodes: [
            { modelId: 'claude-3-haiku', name: 'Claude 3 Haiku', releaseDate: '2024-03-14', status: 'superseded', notes: 'Subagente leve original focado em latência ultra-baixa.' },
            { modelId: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku', releaseDate: '2024-10-22', status: 'superseded', notes: 'Geração rápida de subagentes sub-dólar de alta eficiência.' },
            { modelId: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', releaseDate: '2025-10-15', status: 'active', notes: 'Subagente de alta velocidade para chamadas de ferramenta e triagem contínua.' }
          ]
        }
      ],
      connections: [
        { from: 'claude-fable-5', to: 'claude-fable-5-1', changeType: 'generational-upgrade', improvements: 'CursorBench +2.9pp, custo por tarefa reduzido em 44%, cache read -75%, saída de 128k.' },
        { from: 'claude-3-opus', to: 'claude-opus-4-6', changeType: 'generational-upgrade', improvements: 'Introdução do raciocínio adaptativo e janela nativa de 1M de tokens.' },
        { from: 'claude-opus-4-6', to: 'claude-opus-5', changeType: 'generational-upgrade', improvements: 'Janela de saída para 128k, cutoff Maio/2026.' },
        { from: 'claude-3-5-sonnet', to: 'claude-3-7-sonnet', changeType: 'reasoning-addition', improvements: 'Primeiro modelo com raciocínio híbrido estendido.' },
        { from: 'claude-3-7-sonnet', to: 'claude-sonnet-4-6', changeType: 'generational-upgrade', improvements: 'Avanço para 79,6% no SWE-bench Verified com raciocínio adaptativo refinado.' },
        { from: 'claude-sonnet-4-6', to: 'claude-sonnet-5', changeType: 'generational-upgrade', improvements: 'Redução de preço para $2/$10, melhoria no SWE-bench Verified.' },
        { from: 'claude-3-haiku', to: 'claude-3-5-haiku', changeType: 'generational-upgrade', improvements: 'Salto em velocidade e acurácia de subagentes.' },
        { from: 'claude-3-5-haiku', to: 'claude-haiku-4-5', changeType: 'generational-upgrade', improvements: 'Otimização para microsserviços e chamadas de ferramenta de alta frequência.' }
      ]
    },
    {
      familyId: 'openai-gpt56',
      familyName: 'OpenAI GPT-5.6 Generation & Open-Weights Tree',
      description: 'Arquitetura unificada da OpenAI ramificada a partir do protocolo responses em tiers especializados de raciocínio, além da linhagem aberta oficial gpt-oss.',
      tracks: [
        {
          trackId: 'gpt-sol-track',
          trackName: 'Trilha Sol (Frontier Reasoning & Alta Precisão Lógica)',
          trackDesc: 'Raciocínio XHigh/Max para edge cases e auditoria formal',
          nodes: [
            { modelId: 'openai-o1', name: 'OpenAI o1', releaseDate: '2024-09-12', status: 'superseded', notes: 'Pioneiro em chain-of-thought oculta e raciocínio deliberativo em código.' },
            { modelId: 'openai-o3', name: 'OpenAI o3', releaseDate: '2025-01-31', status: 'superseded', notes: 'Salto massivo em programação competitiva e ARC-AGI.' },
            { modelId: 'gpt-5-5-preview', name: 'GPT-5.5 Preview', releaseDate: '2025-11-10', status: 'superseded', notes: 'Snapshot preliminar do protocolo responses.' },
            { modelId: 'gpt-5-6-sol', name: 'GPT-5.6 Sol', releaseDate: '2026-02-16', status: 'predecessor', notes: 'Frontier de extrema precisão lógica e edge cases financeiros.' },
            { modelId: 'gpt-6-astra', name: 'GPT-6 Astra', releaseDate: '2026-09-03', status: 'active', notes: 'Frontier reasoning flagship, 1.05M contexto, líder em SWE e agentic benchmarks.' }
          ]
        },
        {
          trackId: 'gpt-terra-track',
          trackName: 'Trilha Terra (Workhorse / Daily Driver Balanceado)',
          trackDesc: 'Tier equilibrado ($2 in / $12 out) para desenvolvimento diário robusto',
          nodes: [
            { modelId: 'gpt-4o', name: 'GPT-4o', releaseDate: '2024-05-13', status: 'superseded', notes: 'Modelo omni multimodal de referência para coding e chat geral.' },
            { modelId: 'gpt-4-5', name: 'GPT-4.5 Orion', releaseDate: '2025-02-27', status: 'superseded', notes: 'Workhorse de alta densidade sem raciocínio explícito.' },
            { modelId: 'gpt-5-5-preview', name: 'GPT-5.5 Preview', releaseDate: '2025-11-10', status: 'superseded', notes: 'Snapshot preliminar do protocolo responses.' },
            { modelId: 'gpt-5-6-terra', name: 'GPT-5.6 Terra', releaseDate: '2026-02-16', status: 'active', notes: 'Tier balanceado ($2/$12) para desenvolvimento diário robusto.' }
          ]
        },
        {
          trackId: 'gpt-luna-track',
          trackName: 'Trilha Luna (Ultra-Econômico / Sub-Dólar)',
          trackDesc: 'Subagentes rápidos e operações de altíssimo volume ($0,20 in / $1,20 out)',
          nodes: [
            { modelId: 'gpt-4o-mini', name: 'GPT-4o-mini', releaseDate: '2024-07-18', status: 'superseded', notes: 'Pioneiro sub-dólar de alta velocidade da OpenAI.' },
            { modelId: 'gpt-5-5-preview', name: 'GPT-5.5 Preview', releaseDate: '2025-11-10', status: 'superseded', notes: 'Snapshot preliminar do protocolo responses.' },
            { modelId: 'gpt-5-6-luna', name: 'GPT-5.6 Luna', releaseDate: '2026-02-16', status: 'active', notes: 'Ultra-econômico ($0,20/$1,20) para subagentes e alto volume.' }
          ]
        },
        {
          trackId: 'gpt-oss-track',
          trackName: 'Trilha gpt-oss (Pesos Abertos Apache 2.0)',
          trackDesc: 'Linhagem de modelos abertos oficiais da OpenAI para inferência local',
          nodes: [
            { modelId: 'gpt-oss-20b', name: 'gpt-oss-20b', releaseDate: '2026-07-01', status: 'active', notes: 'Open-weights oficial Apache 2.0 para GPU única de 16GB VRAM.' },
            { modelId: 'gpt-oss-120b', name: 'gpt-oss-120b', releaseDate: '2026-07-01', status: 'active', notes: 'Modelo aberto de alta densidade para workstations multi-GPU / datacenter.' }
          ]
        }
      ],
      connections: [
        { from: 'openai-o1', to: 'openai-o3', changeType: 'reasoning-boost', improvements: 'Avanço significativo em raciocínio matemático e código formal.' },
        { from: 'openai-o3', to: 'gpt-5-5-preview', changeType: 'protocol-unification', improvements: 'Unificação sob protocolo responses.' },
        { from: 'gpt-5-5-preview', to: 'gpt-5-6-sol', changeType: 'full-release', improvements: 'Raciocínio XHigh/Max com MRCR v2.' },
        { from: 'gpt-5-6-sol', to: 'gpt-6-astra', changeType: 'generational-upgrade', improvements: 'Novo paradigma de raciocínio profundo, 1.05M tokens de contexto, Responses API v2, async tool calling e mid-turn steering.' },
        { from: 'gpt-4o', to: 'gpt-4-5', changeType: 'density-scaling', improvements: 'Expansão de parâmetros e redução de alucinações.' },
        { from: 'gpt-4-5', to: 'gpt-5-5-preview', changeType: 'protocol-unification', improvements: 'Migração para responses API.' },
        { from: 'gpt-5-5-preview', to: 'gpt-5-6-terra', changeType: 'full-release', improvements: 'Daily driver com melhor relação custo/performance.' },
        { from: 'gpt-4o-mini', to: 'gpt-5-5-preview', changeType: 'protocol-unification', improvements: 'Arquitetura unificada de sub-dólar.' },
        { from: 'gpt-5-5-preview', to: 'gpt-5-6-luna', changeType: 'full-release', improvements: 'Compressão tarifária sub-dólar para subagentes.' },
        { from: 'gpt-oss-20b', to: 'gpt-oss-120b', changeType: 'scale-up', improvements: 'Escalonamento de 20B para 120B com maior profundidade em código complexo.' }
      ]
    },
    {
      familyId: 'google-gemini',
      familyName: 'Google DeepMind Gemini Architecture Tree',
      description: 'Evolução dos modelos Gemini com 1 milhão de tokens de contexto nativo, dividida entre a linhagem Flash (alta velocidade & raciocínio adaptativo) e Pro (raciocínio denso multimodal).',
      tracks: [
        {
          trackId: 'gemini-flash-track',
          trackName: 'Trilha Gemini Flash (1M Tokens, Raciocínio & Autonomia Agêntica)',
          trackDesc: 'Evolução contínua de velocidade, thinking dinâmico e liderança em Terminal-Bench 2.1 (90,8%)',
          nodes: [
            { modelId: 'gemini-1-5-flash', name: 'Gemini 1.5 Flash', releaseDate: '2024-05-14', status: 'superseded', notes: 'Primeiro modelo com 1M tokens nativos e latência ultra-baixa.' },
            { modelId: 'gemini-2-0-flash', name: 'Gemini 2.0 Flash', releaseDate: '2024-12-11', status: 'superseded', notes: 'Primeiro com suporte multimodal em tempo real e agêntico nativo.' },
            { modelId: 'gemini-3-5-flash', name: 'Gemini 3.5 Flash', releaseDate: '2025-11-20', status: 'stable', notes: 'Primeiro flash com 1M e custo sub-dólar.' },
            { modelId: 'gemini-3-7-flash', name: 'Gemini 3.7 Flash', releaseDate: '2026-03-10', status: 'predecessor', notes: 'Introdução do thinking dinâmico e 85,8% Terminal-Bench 2.1.' },
            { modelId: 'gemini-3-8-flash', name: 'Gemini 3.8 Flash', releaseDate: '2026-09-02', status: 'active', notes: '90,8% Terminal-Bench 2.1, 74,0% DeepSWE, maior autonomia agentic e 305 tok/s.' }
          ]
        },
        {
          trackId: 'gemini-pro-track',
          trackName: 'Trilha Gemini Pro (Frontier Multimodal Denso)',
          trackDesc: 'Máxima capacidade multimodal de vídeo, áudio e raciocínio científico complexo',
          nodes: [
            { modelId: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', releaseDate: '2024-02-15', status: 'superseded', notes: 'Pioneiro em 1M/2M de contexto longo e multimodalidade de áudio/vídeo.' },
            { modelId: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', releaseDate: '2025-03-20', status: 'superseded', notes: 'Avanço expressivo em raciocínio de código e matemática.' },
            { modelId: 'gemini-3-0-pro', name: 'Gemini 3.0 Pro', releaseDate: '2025-12-10', status: 'legacy', notes: 'Primeiro frontier multimodal 1M com suporte estendido a áudio/vídeo.' },
            { modelId: 'gemini-3-5-pro', name: 'Gemini 3.5 Pro', releaseDate: '2026-05-18', status: 'active', notes: 'Frontier denso de 1M com raciocínio expandido para análise de repositórios inteiros.' }
          ]
        }
      ],
      connections: [
        { from: 'gemini-1-5-flash', to: 'gemini-2-0-flash', changeType: 'multimodal-speed', improvements: 'Adição de streaming de vídeo e chamadas nativas de função.' },
        { from: 'gemini-2-0-flash', to: 'gemini-3-5-flash', changeType: 'generational-upgrade', improvements: 'Otimização de custos para nível sub-dólar.' },
        { from: 'gemini-3-5-flash', to: 'gemini-3-7-flash', changeType: 'reasoning-addition', improvements: 'Thinking configurável Low/Med/High.' },
        { from: 'gemini-3-7-flash', to: 'gemini-3-8-flash', changeType: 'agentic-breakthrough', improvements: 'Terminal-Bench 2.1 saltou de 85,8% para 90,8%; DeepSWE atingiu 74,0%.' },
        { from: 'gemini-1-5-pro', to: 'gemini-2-5-pro', changeType: 'reasoning-boost', improvements: 'Ganho substantivo em raciocínio algorítmico.' },
        { from: 'gemini-2-5-pro', to: 'gemini-3-0-pro', changeType: 'generational-upgrade', improvements: 'Aprimoramento multimodal 1M nativo.' },
        { from: 'gemini-3-0-pro', to: 'gemini-3-5-pro', changeType: 'generational-upgrade', improvements: 'Melhoria na taxa de recall de agulha no palheiro de 1M e precisão matemática.' }
      ]
    },
    {
      familyId: 'zai-glm',
      familyName: 'Z.ai GLM Architecture Tree',
      description: 'Linhagem de modelos abertos e MoE da Zhipu AI com ramificação formal entre o frontier denso de 753B e a vertente de eficiência sob licença MIT (ex-Ox Alpha).',
      tracks: [
        {
          trackId: 'glm-frontier-track',
          trackName: 'Trilha Frontier (MoE 753B / Raciocínio Mandatório)',
          trackDesc: 'Evolução de alta capacidade para inferência em nuvem e tarefas complexas',
          nodes: [
            { modelId: 'glm-4', name: 'GLM-4', releaseDate: '2024-01-16', status: 'superseded', notes: 'Modelo flagship da Zhipu AI para chat e function calling.' },
            { modelId: 'glm-4-5', name: 'GLM-4.5', releaseDate: '2024-09-10', status: 'superseded', notes: 'Evolução intermediária de alinhamento e código.' },
            { modelId: 'glm-5-1', name: 'GLM-5.1', releaseDate: '2025-12-05', status: 'legacy', notes: 'MoE aberto 600B com 200k de contexto.' },
            { modelId: 'glm-5-2', name: 'GLM-5.2', releaseDate: '2026-03-22', status: 'stable', notes: 'Expansão para 1M de contexto e 750B MoE.' },
            { modelId: 'glm-5-3', name: 'GLM-5.3', releaseDate: '2026-07-15', status: 'active', notes: 'Frontier de 753B MoE (40B ativos), AA Index ~60.' }
          ]
        },
        {
          trackId: 'glm-efficiency-track',
          trackName: 'Trilha Eficiência & Pesos Abertos MIT (MoE 320B / Sparse Attention)',
          trackDesc: 'Ramificação de alta eficiência testada anonimamente como Ox Alpha e lançada com licença MIT',
          nodes: [
            { modelId: 'glm-5-2', name: 'GLM-5.2 (Base Arquitetural)', releaseDate: '2026-03-22', status: 'stable', notes: 'Ponto de ramificação de onde derivou a arquitetura Sparse-Linear Attention.' },
            { modelId: 'ox-alpha-stealth', name: 'Ox Alpha (Stealth Preview)', releaseDate: '2026-08-20', status: 'superseded', notes: 'Fase de testes anônimos no OpenRouter e OpenCode Go (58,4% no DeepSWE 1.1).' },
            { modelId: 'glm-5-3-flash', name: 'GLM-5.3-Flash', releaseDate: '2026-08-26', status: 'active', notes: 'MoE 320B (18B ativos), licença permissiva MIT, 63,4% DeepSWE e 1M de contexto.' }
          ]
        }
      ],
      connections: [
        { from: 'glm-4', to: 'glm-4-5', changeType: 'alignment-update', improvements: 'Melhorias em aderência a ferramentas e formato JSON.' },
        { from: 'glm-4-5', to: 'glm-5-1', changeType: 'moe-architecture', improvements: 'Transição para MoE aberto 600B.' },
        { from: 'glm-5-1', to: 'glm-5-2', changeType: 'context-scaling', improvements: '1M de contexto nativo.' },
        { from: 'glm-5-2', to: 'glm-5-3', changeType: 'capacity-boost', improvements: 'Raciocínio mandatório de alta densidade.' },
        { from: 'glm-5-2', to: 'ox-alpha-stealth', changeType: 'stealth-fork', improvements: 'Desenvolvimento do MoE leve de 320B com Sparse-Linear Attention.' },
        { from: 'ox-alpha-stealth', to: 'glm-5-3-flash', changeType: 'official-release', improvements: 'Revelação oficial, pesos liberados sob licença MIT e harness otimizado (DeepSWE 63,4%).' }
      ]
    },
    {
      familyId: 'deepseek-tree',
      familyName: 'DeepSeek Architecture Tree',
      description: 'Evolução da arquitetura Multi-Head Latent Attention (MLA) da DeepSeek da versão V2/V3 para a família de fronteira V4.',
      tracks: [
        {
          trackId: 'deepseek-v3-track',
          trackName: 'Trilha V3 Foundation (MLA & MoE de Baixo Custo)',
          trackDesc: 'Base arquitetural inovadora que estabeleceu novos patamares de custo-benefício',
          nodes: [
            { modelId: 'deepseek-v2', name: 'DeepSeek V2', releaseDate: '2024-05-06', status: 'superseded', notes: 'Pioneiro na arquitetura Multi-Head Latent Attention (MLA).' },
            { modelId: 'deepseek-v2-5', name: 'DeepSeek V2.5', releaseDate: '2024-09-05', status: 'superseded', notes: 'Fusão de código e instrução geral.' },
            { modelId: 'deepseek-v3', name: 'DeepSeek V3', releaseDate: '2024-12-26', status: 'predecessor', notes: 'MoE pioneiro com MLA e precificação agressiva sub-dólar.' },
            { modelId: 'deepseek-v3-2', name: 'DeepSeek V3.2', releaseDate: '2025-08-15', status: 'legacy', notes: 'Otimizações de estabilidade em geração de código e aderência a ferramentas.' }
          ]
        },
        {
          trackId: 'deepseek-v4-pro-track',
          trackName: 'Trilha V4 Pro (Frontier Reasoning MoE)',
          trackDesc: 'Raciocínio denso de código e arquitetura de agentes ($0,55 in / $2,19 out)',
          nodes: [
            { modelId: 'deepseek-r1', name: 'DeepSeek R1', releaseDate: '2025-01-20', status: 'superseded', notes: 'Primeiro modelo aberto de raciocínio puro com RL em larga escala.' },
            { modelId: 'deepseek-v4-pro-0813', name: 'DeepSeek V4 Pro (0813)', releaseDate: '2026-08-13', status: 'active', notes: 'Flagship de raciocínio de código com 72,7% no DeepSWE e suporte agêntico nativo.' }
          ]
        },
        {
          trackId: 'deepseek-v4-flash-track',
          trackName: 'Trilha V4 Flash (Ultra-Velocidade & Economia Extrema)',
          trackDesc: 'Modelo balanceado com inferência ultra-rápida a $0,14 / $0,55 por milhão',
          nodes: [
            { modelId: 'deepseek-v3-2', name: 'DeepSeek V3.2', releaseDate: '2025-08-15', status: 'legacy', notes: 'Base precursora.' },
            { modelId: 'deepseek-v4-flash-0731', name: 'DeepSeek V4 Flash (0731)', releaseDate: '2026-07-31', status: 'active', notes: 'Workhorse econômico ideal para subagentes e tarefas de grande escala.' }
          ]
        },
        {
          trackId: 'deepseek-v4-vision-track',
          trackName: 'Trilha V4 Vision (Multimodalidade & OCR Técnico)',
          trackDesc: 'Suporte a visão computacional e diagramas de arquitetura ($0,22 / $0,88)',
          nodes: [
            { modelId: 'deepseek-vl2', name: 'DeepSeek-VL2', releaseDate: '2024-12-15', status: 'superseded', notes: 'Modelo de visão prévio para leitura de gráficos e código.' },
            { modelId: 'deepseek-v4-vision-exp', name: 'DeepSeek V4 Vision (Exp)', releaseDate: '2026-08-10', status: 'active', notes: 'Processamento de capturas de tela, schemas de banco de dados e diagramas UML.' }
          ]
        }
      ],
      connections: [
        { from: 'deepseek-v2', to: 'deepseek-v2-5', changeType: 'refinement', improvements: 'Fusão dos ramos de código e linguagem geral.' },
        { from: 'deepseek-v2-5', to: 'deepseek-v3', changeType: 'generational-upgrade', improvements: 'Adoção de FP8 nativo e compressão tarifária.' },
        { from: 'deepseek-v3', to: 'deepseek-v3-2', changeType: 'refinement', improvements: 'Refinamento de pós-treino e estabilidade de geração.' },
        { from: 'deepseek-r1', to: 'deepseek-v4-pro-0813', changeType: 'generational-upgrade', improvements: 'Salto no DeepSWE para 72,7% e integração agêntica nativa.' },
        { from: 'deepseek-v3-2', to: 'deepseek-v4-flash-0731', changeType: 'speed-optimization', improvements: 'Latência ultrabaixa com preservação de 92% da acurácia geral.' },
        { from: 'deepseek-vl2', to: 'deepseek-v4-vision-exp', changeType: 'multimodal-extension', improvements: 'Adição de encoder de visão de alta resolução para código e diagramas.' }
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
          trackDesc: 'Execução de comandos bash e raciocínio veloz com 88,6% no Terminal-Bench 2.1',
          nodes: [
            { modelId: 'grok-2', name: 'Grok 2', releaseDate: '2024-08-13', status: 'superseded', notes: 'Modelo anterior com suporte multimodal e search.' },
            { modelId: 'grok-3', name: 'Grok 3', releaseDate: '2025-02-17', status: 'predecessor', notes: 'Primeiro frontier com raciocínio expandido treinado no cluster Colossus.' },
            { modelId: 'grok-4-5', name: 'Grok 4.5', releaseDate: '2026-04-10', status: 'legacy', notes: 'Aprimoramento em raciocínio matemático e velocidade.' },
            { modelId: 'grok-4-6', name: 'Grok 4.6', releaseDate: '2026-08-20', status: 'active', notes: '88,6% Terminal-Bench 2.1, raciocínio ágil em CLI e baixa recusa.' }
          ]
        }
      ],
      connections: [
        { from: 'grok-2', to: 'grok-3', changeType: 'reasoning-expansion', improvements: 'Salto de escala computacional no Colossus.' },
        { from: 'grok-3', to: 'grok-4-5', changeType: 'speed-and-math', improvements: 'Melhoria na resolução matemática e diminuição de alucinações.' },
        { from: 'grok-4-5', to: 'grok-4-6', changeType: 'agentic-cli', improvements: 'Otimização para Terminal-Bench 2.1 (88,6%) e ferramentas de shell.' }
      ]
    },
    {
      familyId: 'alibaba-qwen',
      familyName: 'Alibaba Qwen Generation & Open-Weights',
      description: 'Ecossistema líder de modelos proprietários e abertos da Alibaba Cloud com forte eficiência para execução local.',
      tracks: [
        {
          trackId: 'qwen-frontier-track',
          trackName: 'Trilha Qwen Frontier (Raciocínio Denso de Máxima Capacidade)',
          trackDesc: 'Modelos proprietários de altíssima densidade matemática e coding',
          nodes: [
            { modelId: 'qwen-2-5-max', name: 'Qwen 2.5 Max', releaseDate: '2024-09-19', status: 'superseded', notes: 'Frontier proprietário anterior da Alibaba Cloud.' },
            { modelId: 'qwen3-7-max', name: 'Qwen 3.7 Max', releaseDate: '2026-03-15', status: 'legacy', notes: 'Avanço expressivo em raciocínio matemático e código.' },
            { modelId: 'qwen3-8-max', name: 'Qwen 3.8 Max', releaseDate: '2026-08-18', status: 'active', notes: 'Frontier proprietário de alta densidade no Qwen Portal.' }
          ]
        },
        {
          trackId: 'qwen-open-weights-track',
          trackName: 'Trilha Qwen Open-Weights (Pesos Abertos para Inferência Local)',
          trackDesc: 'Referência global em inferência local com o campeão consumer de 16 GB',
          nodes: [
            { modelId: 'qwen-2-5-72b', name: 'Qwen 2.5 72B', releaseDate: '2024-09-19', status: 'superseded', notes: 'Referência global em modelos abertos para workstation.' },
            { modelId: 'qwen3-8-27b', name: 'Qwen 3.8 27B', releaseDate: '2026-08-22', status: 'active', notes: '👑 Campeão Local Consumer: 16 GB VRAM em GPU única.' },
            { modelId: 'qwen3-8-2-4t-a95b', name: 'Qwen 3.8 2.4T A95B', releaseDate: '2026-08-25', status: 'active', notes: 'MoE aberto massivo com 95B ativos para workstations de 64–96 GB.' }
          ]
        }
      ],
      connections: [
        { from: 'qwen-2-5-max', to: 'qwen3-7-max', changeType: 'reasoning-boost', improvements: 'Ganhos no SWE-bench e raciocínio matemático estendido.' },
        { from: 'qwen3-7-max', to: 'qwen3-8-max', changeType: 'generational-upgrade', improvements: 'Redução de alucinações e suporte agêntico nativo.' },
        { from: 'qwen-2-5-72b', to: 'qwen3-8-27b', changeType: 'compression-breakthrough', improvements: '27B superando o antigo 72B consumindo apenas 16 GB VRAM.' },
        { from: 'qwen3-8-27b', to: 'qwen3-8-2-4t-a95b', changeType: 'scale-up-moe', improvements: 'Escala para 2.4T parâmetros totais e 95B ativos para workstations.' }
      ]
    }
  ],

  events: [
    {
      date: '2026-09-04',
      modelId: 'gpt-6-astra',
      type: 'benchmark-update',
      title: 'Artificial Analysis atualiza Index para v4.2',
      description: 'GPT-6 Astra assume liderança do AA Index com 61.0 pontos, superando Claude Fable 5.1 (59.6) no benchmark v4.2 ponderado.',
      sourceId: 'artificial-analysis-v42'
    },
    {
      date: '2026-09-03',
      modelId: 'gpt-6-astra',
      type: 'release',
      title: 'OpenAI lança GPT-6 Astra',
      description: 'OpenAI oficializa GPT-6 Astra com 1.05M de contexto nativo, 5 níveis de reasoning effort, async tool calling e liderança em benchmarks agênticos.',
      sourceId: 'openai-gpt6-astra-launch'
    },
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
      date: '2026-08-20',
      modelId: 'grok-4-6',
      type: 'release',
      title: 'xAI lança Grok 4.6',
      description: 'xAI disponibiliza o Grok 4.6 com foco em velocidade, autonomia em ambiente bash/CLI e 88,6% no Terminal-Bench 2.1.',
      sourceId: 'artificial-analysis-sep2026'
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
      date: '2026-08-13',
      modelId: 'deepseek-v4-pro-0813',
      type: 'release',
      title: 'DeepSeek lança DeepSeek V4 Pro',
      description: 'DeepSeek oficializa o V4 Pro (checkpoint 0813) com 72,7% no DeepSWE e suporte agêntico nativo a $0,55/M.',
      sourceId: 'deepswe-datacurve'
    },
    {
      date: '2026-07-31',
      modelId: 'deepseek-v4-flash-0731',
      type: 'release',
      title: 'DeepSeek lança DeepSeek V4 Flash',
      description: 'Lançamento do V4 Flash focado em ultra-baixa latência e custo extremo de $0,14 / $0,55.',
      sourceId: 'deepswe-datacurve'
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
    },
    {
      date: '2026-06-20',
      modelId: 'claude-sonnet-5',
      type: 'release',
      title: 'Anthropic disponibiliza Claude Sonnet 5',
      description: 'Claude Sonnet 5 lançado com precificação intermediária ($2/$10) e ganhos no SWE-bench Verified.',
      sourceId: 'anthropic-claude-fable-51'
    },
    {
      date: '2026-06-12',
      modelId: 'claude-opus-5',
      type: 'release',
      title: 'Anthropic oficializa Claude Opus 5',
      description: 'Lançamento do Claude Opus 5 com saída de 128k e contexto de 1M.',
      sourceId: 'anthropic-claude-fable-51'
    }
  ]
};

const BENCHMARK_HISTORY_DATA = [
  {
    modelId: 'gpt-6-astra',
    benchmark: 'DeepSWE',
    benchmarkVersion: '1.1',
    date: '2026-09-04',
    score: 74.1,
    confidenceInterval: 0.9,
    costPerTaskUsd: 5.72,
    tokensPerTask: 96000,
    agentSteps: 88,
    sourceId: 'deepswe-datacurve-v11',
    sourceType: 'independent',
    notes: 'Avaliação independente DataCurve v1.1 no esforço XHigh: 74.1% de taxa de resolução superando Gemini 3.8 Flash (74.0%) e Claude Fable 5.1.'
  },
  {
    modelId: 'gpt-6-astra',
    benchmark: 'Terminal-Bench',
    benchmarkVersion: '4.0',
    date: '2026-09-03',
    score: 57.9,
    confidenceInterval: null,
    costPerTaskUsd: null,
    tokensPerTask: null,
    agentSteps: null,
    sourceId: 'openai-gpt6-astra-launch',
    sourceType: 'official',
    notes: 'Avaliação oficial no novo Terminal-Bench 4.0: 57.9% de sucesso em ambiente CLI/terminal agêntico.'
  },
  {
    modelId: 'gpt-6-astra',
    benchmark: 'Terminal-Bench Science',
    benchmarkVersion: '0.1',
    date: '2026-09-04',
    score: 65.4,
    confidenceInterval: null,
    costPerTaskUsd: null,
    tokensPerTask: null,
    agentSteps: null,
    sourceId: 'snorkel-terminal-bench-science',
    sourceType: 'independent',
    notes: 'Auditoria independente Snorkel AI no Terminal-Bench Science 0.1: 65.4% de acurácia em tarefas científicas complexas via terminal.'
  },
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
