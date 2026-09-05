/**
 * DATA PACK: CASOS DE USO REAIS & MATRIZ DE PROJETOS (USE CASES)
 * Data de Referência: 03/09/2026
 * 
 * ATENÇÃO: Todos os scores e rankings desta seção são CALIBRADOS ('E — Calibrado').
 * Não representam medições laboratoriais isoladas, mas o fit técnico balanceado para cada tipo de projeto.
 */

const USE_CASE_COMPARISON_DATA = {
  metadata: {
    sourceType: 'calibrated',
    confidenceLevel: 'medium',
    disclaimer: 'Rankings e papéis calibrados a partir de benchmarks SWE e relatos práticos de produção. Não são benchmarks oficiais.'
  },

  useCases: [
    {
      id: 'saas-system-architecture',
      title: 'Arquitetura de Sistemas & SaaS Escalável',
      icon: '🏛️',
      description: 'Definição de microsserviços, modelagem de banco de dados, APIs REST/gRPC e padrões modulares desacoplados.',
      keyAttributes: ['Visão holística', 'Disciplina de escopo', 'Padrões de design', 'Mapeamento de dependências'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.35, "agentic": 0.25, "reliability": 0.2, "cost": 0.1, "speed": 0.1},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["swe-bench-verified", "cursorbench-32", "terminalbench-21"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "Claude Fable 5.1", "tippingPoint": "Fable 5.1 lidera no perfil padrão (99 pts). Se Custo receber peso > 28%, Gemini 3.8 Flash assume o #1 lugar pelo custo sub-dólar com 1M de janela."},
      rankings: [
        { rank: 1, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', fitScore: 99, role: 'Lead System Architect & High-Complexity Planner', rationale: 'Raciocínio profundo de longo alcance, arquitetura modular e suporte a mid-turn steering para ajustes sem perda de contexto.' },
        { rank: 2, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 99, role: 'Lead System Architect & Planner', rationale: 'Visão de longo prazo perfeita, planejamento de múltiplos arquivos sem ruído e menor risco de arquiteturas infladas.' },
        { rank: 3, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 97, role: 'Backend Architect & Hard Debugging', rationale: 'Rigor extremo em contratos de API, isolamento de domínios e tratamento preventivo de falhas de rede.' },
        { rank: 4, modelId: 'claude-opus-5', modelName: 'Claude Opus 5', fitScore: 94, role: 'Senior Enterprise Architect', rationale: 'Compreensão enciclopédica de sistemas distribuídos legados e transições de arquitetura.' },
        { rank: 5, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash High', fitScore: 92, role: 'High-Volume Implementation Lead', rationale: 'Capacidade de ler diagramas e especificações em 1M de tokens com navegação ágil.' },
        { rank: 6, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 90, role: 'Open-Weight / Cloud Planner', rationale: 'Excelente decomposição lógica em 12+ fases ordenadas com disciplina exemplar.' },
        { rank: 7, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 88, role: 'Daily Driver Architect', rationale: 'Excelente relação custo-performance para arquiteturas de SaaS padrão.' },
        { rank: 8, modelId: 'kimi-k3', modelName: 'Kimi K3', fitScore: 86, role: 'Large-Context Orchestrator', rationale: 'Excelente síntese de bases de código inteiras em 1 milhão de tokens.' },
        { rank: 9, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 84, role: 'Fast Feature Implementer', rationale: 'Muito rápido para prototipar serviços e validar hipóteses de arquitetura.' },
        { rank: 10, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 83, role: 'Module Designer', rationale: 'Design de módulos específicos com excelente clareza conceitual.' }
      ]
    },
    {
      id: 'critical-backend-finance',
      title: 'Backend Crítico, Financeiro & Concorrência',
      icon: '🛡️',
      description: 'Sistemas com tolerância zero a falhas: transações financeiras, processamento assíncrono concorrente, race conditions e criptografia.',
      keyAttributes: ['Corretude absoluta', 'Proteção contra race conditions', 'Cobertura de testes', 'Prevenção de deadlock'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.4, "agentic": 0.2, "reliability": 0.3, "cost": 0.05, "speed": 0.05},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["terminalbench-21", "swe-bench-verified", "gpqa-diamond"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "GPT-5.6 Sol", "tippingPoint": "GPT-5.6 Sol é dominante em confiabilidade (100 pts). Apenas se Velocidade e Custo somarem > 60% há troca de liderança."},
      rankings: [
        { rank: 1, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', fitScore: 100, role: 'Zero-Defect Core Auditor & Concurrency Specialist', rationale: 'Rigor lógico absoluto com MRCR v2 (96,3%) e GPQA Diamond (96,0%), eliminando race conditions e edge cases complexos.' },
        { rank: 2, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 100, role: 'Core Logic Implementer & Auditor', rationale: 'O campeão indiscutível da comunidade e benchmarks para edge cases financeiros, idempotência e testes de concorrência.' },
        { rank: 3, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 96, role: 'Formal Verification & Architecture', rationale: 'Modelagem rigorosa de estados e verificação de regras de negócio complexas.' },
        { rank: 4, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 92, role: 'Secondary Service Implementer', rationale: 'Herda a disciplina do Sol com 90% da robustez a uma fração do custo de tokens.' },
        { rank: 5, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash High', fitScore: 90, role: 'Load Testing & Pipeline Workers', rationale: 'Resolução massiva de suites de testes e validação cruzada de dados.' },
        { rank: 6, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 89, role: 'Deterministic Logic Reviewer', rationale: 'Fidelidade absoluta ao contrato de dados sem invenção de parâmetros.' },
        { rank: 7, modelId: 'claude-opus-5', modelName: 'Claude Opus 5', fitScore: 88, role: 'Cryptographic & Compliance Auditor', rationale: 'Análise aprofundada de requisitos PCI-DSS, LGPD e segurança bancária.' },
        { rank: 8, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 86, role: 'Service Integration Lead', rationale: 'Integrações seguras de SDKs de pagamento e webhooks.' },
        { rank: 9, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 83, role: 'High-Throughput Worker', rationale: 'Execução veloz sob supervisão estrita de testes.' },
        { rank: 10, modelId: 'kimi-k3', modelName: 'Kimi K3', fitScore: 81, role: 'Audit Log Ingestion', rationale: 'Varredura e parsing de logs de auditoria gigantescos em 1M.' }
      ]
    },
    {
      id: 'frontend-ui-ux',
      title: 'Frontend Moderno & Design Systems',
      icon: '🎨',
      description: 'Interfaces ricas em React, Vue, Svelte, Tailwind CSS, animações fluidas, acessibilidade WCAG e respeito milimétrico ao design system.',
      keyAttributes: ['Fidelidade de design', 'Zero CSS drift', 'Responsividade', 'Componentização limpa'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.3, "agentic": 0.25, "reliability": 0.15, "cost": 0.15, "speed": 0.15},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["swe-bench-verified", "artificial-analysis"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "Claude Fable 5.1", "tippingPoint": "GLM-5.3 empata tecnicamente se fidelidade CSS for isolada; Grok 4.6 vence se velocidade pura tiver peso > 40%."},
      rankings: [
        { rank: 1, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 97, role: 'Lead UI Architect & Layout Designer', rationale: 'Gosto estético refinado, proporções visuais harmônicas e estrutura de componentes limpa sem código desnecessário.' },
        { rank: 2, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 96, role: 'Design System Guardian', rationale: 'Aderência metódica excepcional ao CSS existente: zero design drift e testes em múltiplas resoluções.' },
        { rank: 3, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 94, role: 'Rapid UI Prototyper', rationale: 'Velocidade vertiginosa para criar páginas inteiras do zero com visual moderno e impactante.' },
        { rank: 4, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', fitScore: 93, role: 'Multimodal UI Inspector', rationale: 'Inspeção nativa de capturas de tela e mockups do Figma com validação visual contínua.' },
        { rank: 5, modelId: 'kimi-k3', modelName: 'Kimi K3', fitScore: 89, role: 'Component Library Migration', rationale: 'Migração de componentes em larga escala mantendo consistência visual.' },
        { rank: 6, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 88, role: 'React/TypeScript Specialist', rationale: 'Tipagem robusta de hooks e estado do frontend com bom design.' },
        { rank: 7, modelId: 'composer-2-5', modelName: 'Composer 2.5', fitScore: 87, role: 'Interactive In-Editor Tweaker', rationale: 'Edição instantânea de estilos e JSX diretamente no editor do Cursor.' },
        { rank: 8, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 85, role: 'State Management & API Glue', rationale: 'Conexão eficiente de stores e APIs REST/GraphQL ao frontend.' },
        { rank: 9, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 83, role: 'Complex Data Grid & Canvas Logic', rationale: 'Ótimo para lógica pesada de UI (tabelas virtuais, canvas 2D), mas tende a inflar o CSS.' },
        { rank: 10, modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', fitScore: 82, role: 'Economic Component Worker', rationale: 'Geração em lote de componentes repetitivos a custo quase zero.' }
      ]
    },
    {
      id: 'game-development-unity',
      title: 'Game Development — Unity (C#)',
      icon: '🎮',
      description: 'Desenvolvimento iterativo de jogos na Unity Engine: arquitetura de sistemas de gameplay, shaders, física, ECS e integração com MCP.',
      keyAttributes: ['Compreensão de C# & GameObjects', 'Suporte a MCP do Unity Editor', 'Raciocínio espacial', 'Ciclo iterativo de teste'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.35, "agentic": 0.3, "reliability": 0.15, "cost": 0.1, "speed": 0.1},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["cursorbench-32", "terminalbench-21"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "Claude Fable 5.1", "tippingPoint": "Fable 5.1 lidera por integração com Unity MCP. GPT-5.6 Sol assume liderança para tarefas puras de matemática vetorial e física."},
      rankings: [
        { rank: 1, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 98, role: 'Game Systems Architect & Narrative Lead', rationale: 'Líder em raciocínio de mecânicas de gameplay iterativas; evidência prática robusta com Claude Code + Unity MCP.' },
        { rank: 2, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 96, role: 'Physics, Math & Optimization Specialist', rationale: 'Cálculos de vetores, quaternions, algoritmos de pathfinding e otimização de GC/alocação de memória.' },
        { rank: 3, modelId: 'claude-opus-5', modelName: 'Claude Opus 5', fitScore: 92, role: 'Complex Scripting & AI Director', rationale: 'Árvores de comportamento (Behavior Trees) e máquinas de estado finitas para NPCs.' },
        { rank: 4, modelId: 'kimi-k3', modelName: 'Kimi K3', fitScore: 89, role: 'Large Asset & Script Indexer', rationale: 'Indexação de projetos massivos da Unity com centenas de MonoBehaviour scripts.' },
        { rank: 5, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', fitScore: 88, role: 'Asset Pipeline & Multimodal Helper', rationale: 'Inspeção de texturas, shaders visuais e documentação multimodal da Unity.' },
        { rank: 6, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 86, role: 'UI & Gameplay Feature Implementer', rationale: 'Implementação metódica de menus e sistemas de inventário da Unity UI.' },
        { rank: 7, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 85, role: 'Rapid Gameplay Prototyper', rationale: 'Geração rápida de scripts de movimentação e controle de câmera para teste de feel.' },
        { rank: 8, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 84, role: 'C# Tooling & Editor Scripting', rationale: 'Criação de Custom Inspectors e Editor Windows personalizadas.' },
        { rank: 9, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 83, role: 'Standard Gameplay Worker', rationale: 'Balanceamento de status e lógica de itens de jogo.' },
        { rank: 10, modelId: 'qwen3-8-max', modelName: 'Qwen3.8 Max', fitScore: 80, role: 'Network & Multiplayer Glue', rationale: 'Integração com soluções de rede como Netcode for GameObjects.' }
      ]
    },
    {
      id: 'game-development-unreal',
      title: 'Game Development — Unreal Engine (C++)',
      icon: '🔥',
      description: 'Projetos AAA e de médio porte na Unreal Engine 5: C++ moderno, gerenciamento de memória, Blueprints nativos, UObject, Chaos Physics e builds demorados.',
      keyAttributes: ['C++ avançado', 'Gestão de ponteiros (TSharedPtr/UPROPERTY)', 'Compilação de monorepos Unreal', 'Debugging de crash'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.45, "agentic": 0.2, "reliability": 0.2, "cost": 0.05, "speed": 0.1},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["swe-bench-verified", "terminalbench-21"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "GPT-5.6 Sol", "tippingPoint": "GPT-5.6 Sol é referência em ponteiros C++ e UObject. Fable 5.1 empata se o escopo for arquitetura de Gameplay Ability System."},
      rankings: [
        { rank: 1, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 99, role: 'Unreal C++ Core Engineer', rationale: 'Domínio irretocável de ponteiros, alocação de memória C++, convenções do UObject e depuração de memory leaks.' },
        { rank: 2, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 97, role: 'Unreal Systems & Gameplay Architect', rationale: 'Desenho de arquitetura de Gameplay Ability System (GAS) e interfaces entre C++ e Blueprints.' },
        { rank: 3, modelId: 'claude-opus-5', modelName: 'Claude Opus 5', fitScore: 93, role: 'Subsystem & Engine Specialist', rationale: 'Navegação de código-fonte bruto da Unreal Engine e criação de Custom Shaders / HLSL.' },
        { rank: 4, modelId: 'kimi-k3', modelName: 'Kimi K3', fitScore: 88, role: 'Monorepo Unreal Indexer', rationale: 'Capacidade de engolir a árvore gigante de headers da Unreal em 1M de tokens.' },
        { rank: 5, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 87, role: 'C++ Build Fixer & Tooling', rationale: 'Resolução sistemática de erros de link e template em compilações do Unreal Build Tool.' },
        { rank: 6, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', fitScore: 86, role: 'Log & Crash Dump Analyzer', rationale: 'Varredura ultrarrápida de arquivos gigantescos de CrashReporter e logs de build.' },
        { rank: 7, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 83, role: 'Rapid Gameplay Iteration', rationale: 'Geração veloz de protótipos de mecânicas sob supervisão de compilação.' },
        { rank: 8, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 82, role: 'Gameplay Framework Specialist', rationale: 'Construção de PlayerControllers, GameModes e HUDs.' },
        { rank: 9, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 81, role: 'General C++ Worker', rationale: 'Implementação de classes auxiliares e helpers matemáticos.' },
        { rank: 10, modelId: 'qwen3-8-max', modelName: 'Qwen3.8 Max', fitScore: 78, role: 'Multiplayer Replication Specialist', rationale: 'Lógica de replicação de atores e RPCs.' }
      ]
    },
    {
      id: 'web-games-threejs',
      title: 'Web Games & 3D Interativo (Three.js / WebGL)',
      icon: '🌐',
      description: 'Prototipagem ágil e desenvolvimento de jogos no browser: Three.js, Babylon.js, WebGPU, shaders GLSL e física 3D leve no cliente.',
      keyAttributes: ['Prototipagem rápida', 'Orquestração multi-agente', 'Gráficos 3D web', 'Performance no navegador'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.3, "agentic": 0.3, "reliability": 0.15, "cost": 0.1, "speed": 0.15},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["cursorbench-32", "artificial-analysis"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "Claude Fable 5.1", "tippingPoint": "Grok 4.6 e Gemini 3.8 Flash superam em velocidade de iteração visual de shaders WebGL."},
      rankings: [
        { rank: 1, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 99, role: 'Multi-Agent World Builder & Architect', rationale: 'Evidência definitiva: prototipou simulação 3D estilo Cities: Skylines em 1 hora orquestrando 14 subagentes paralelos.' },
        { rank: 2, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 93, role: 'Real-time Scene & Shader Coder', rationale: 'Excelente intuição matemática para animações procedurais e shaders GLSL gerados sob demanda.' },
        { rank: 3, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', fitScore: 92, role: 'Asset Integration & High-Speed Worker', rationale: 'Throughput altíssimo de 305 tok/s para carregar modelos glTF, texturas e sons com feedback em tempo real.' },
        { rank: 4, modelId: 'kimi-k3', modelName: 'Kimi K3', fitScore: 88, role: 'Scene Graph Manager', rationale: 'Coordenação de hierarquias de nós e otimização de instanced meshes.' },
        { rank: 5, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 87, role: 'Physics & Collision Discipline', rationale: 'Implementação disciplinada de Cannon.js / Rapier sem bugs de colisão.' },
        { rank: 6, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 86, role: 'Mathematical Optimization & Workers', rationale: 'Otimização de octrees, BVH e workers de simulação pesada em Web Workers.' },
        { rank: 7, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 85, role: 'UI Overlay & Controls', rationale: 'Criação de HUDs HTML/CSS integradas ao canvas 3D.' },
        { rank: 8, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 83, role: 'Game State Controller', rationale: 'Gerenciamento de pontuação, savegames no LocalStorage e áudio.' },
        { rank: 9, modelId: 'composer-2-5', modelName: 'Composer 2.5', fitScore: 82, role: 'Fast In-Browser Tweaker', rationale: 'Ajuste fino de posições de luzes e câmeras no código.' },
        { rank: 10, modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', fitScore: 81, role: 'Economic Mesh Generator', rationale: 'Geração procedural de vértices e tabelas de animação.' }
      ]
    },
    {
      id: 'large-monorepos-hard-bugs',
      title: 'Grandes Monorepos & Resolução de Bugs Difíceis',
      icon: '🔍',
      description: 'Navegação por milhões de linhas de código em repositórios complexos, reprodução de bugs intermitentes e refatorações amplas.',
      keyAttributes: ['Janela de contexto efetiva', 'Retenção needle-in-haystack', 'Persistência agêntica', 'Rigor em git diffs'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.35, "agentic": 0.35, "reliability": 0.15, "cost": 0.05, "speed": 0.1},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["deepswe-leaderboard", "terminalbench-21", "swe-bench-verified"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "Claude Fable 5.1", "tippingPoint": "Gemini 3.8 Flash High (90,8% Terminal-Bench) se torna #1 se o tempo de varredura do repo e custo de contexto 1M forem priorizados."},
      rankings: [
        { rank: 1, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', fitScore: 100, role: 'Autonomous Root-Cause Debugger & Codebase Surgeon', rationale: '74,1% no DeepSWE v1.1 independente e 96,3% no MRCR v2; retenção perfeita em 1.05M tokens e capacidade de resolver regressões intermitentes.' },
        { rank: 2, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 99, role: 'Chief Diagnostician & Root Cause Finder', rationale: 'Capacidade cognitiva incomparável para rastrear fluxo de execução através de dezenas de pacotes sem se perder.' },
        { rank: 3, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 98, role: 'Deep Debugger & Regression Preventer', rationale: 'Persistência teimosa: investiga cada caminho de exceção até isolar a causa exata do problema.' },
        { rank: 4, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash High', fitScore: 96, role: 'Monorepo Scanner & Mass Fixer', rationale: '90,8% no Terminal-Bench 2.1 e 74,0% no DeepSWE; engole 1 milhão de tokens e executa comandos de terminal com agilidade.' },
        { rank: 5, modelId: 'claude-opus-5', modelName: 'Claude Opus 5', fitScore: 94, role: 'Legacy Spaghetti Unraveler', rationale: 'Excelente em decifrar monorepos de 10+ anos com camadas acumuladas de código.' },
        { rank: 6, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 92, role: 'Methodical Test-Driven Fixer', rationale: 'Abordagem metódica faseada com reprodução de teste unitário antes de aplicar o patch.' },
        { rank: 7, modelId: 'kimi-k3', modelName: 'Kimi K3', fitScore: 90, role: 'Large-Context Trace Navigator', rationale: 'Retenção estável em 1M de tokens para correlacionar rastros de execução distantes.' },
        { rank: 8, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 88, role: 'Fast Issue Triager', rationale: 'Identificação rápida de inconsistências em tempo recorde.' },
        { rank: 9, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 87, role: 'Monorepo Feature Maintainer', rationale: 'Manutenção cotidiana de submódulos com custo equilibrado.' },
        { rank: 10, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 85, role: 'Codebase Refactorer', rationale: 'Refatoração consistente de módulos de tamanho intermediário.' }
      ]
    },
    {
      id: 'rapid-prototyping',
      title: 'Prototipagem Rápida & Validação de Ideias (Speed & Cost)',
      icon: '⚡',
      description: 'Criar MVPs funcionais em poucas horas: máxima velocidade de geração, autonomia sem travas, multimodalidade e baixo custo unitário.',
      keyAttributes: ['Throughput (tok/s)', 'Custo por requisição', 'Autonomia', 'Pronto para usar'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.25, "agentic": 0.25, "reliability": 0.1, "cost": 0.2, "speed": 0.2},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["artificial-analysis", "cursorbench-32"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "Gemini 3.8 Flash", "tippingPoint": "Gemini lidera por throughput (305 tok/s) e custo sub-dólar. Se orçamento for zero, GPT-5.6 Luna assume."},
      rankings: [
        { rank: 1, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', fitScore: 98, role: 'MVP Rapid Builder', rationale: 'A combinação definitiva de 305 tok/s, multimodalidade total, 1M de contexto e custo promocional de $0,75/$3,75.' },
        { rank: 2, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 95, role: 'Instant Feature Generator', rationale: 'Entrega aplicações inteiras em minutos diretamente no pool generoso do Cursor.' },
        { rank: 3, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 93, role: 'Full-System Orchestrator', rationale: 'Qualidade suprema, mas reservado para quem tem orçamento de tokens para acelerar MVPs complexos.' },
        { rank: 4, modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', fitScore: 92, role: 'Sub-Dollar Prototype Worker', rationale: 'Custo de centavos ($0,20/$1,20) para gerar dezenas de arquivos de boilerplate.' },
        { rank: 5, modelId: 'composer-2-5', modelName: 'Composer 2.5', fitScore: 91, role: 'Interactive Rapid Editor', rationale: 'Edição direta no Cursor para ver a aplicação nascer em tempo real.' },
        { rank: 6, modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', fitScore: 90, role: 'Open-Weight Rapid Agent', rationale: 'MIT aberto, $0,15/$0,50 e resposta ágil para protótipos autônomos.' },
        { rank: 7, modelId: 'kimi-k3', modelName: 'Kimi K3', fitScore: 87, role: 'Full-Stack Scaffold Builder', rationale: 'Gera scaffolds completos a partir de prompts longos e especificações.' },
        { rank: 8, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 86, role: 'Balanced MVP Driver', rationale: 'Entrega um produto mais perto do estado de produção.' },
        { rank: 9, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 85, role: 'Clean Code MVP', rationale: 'Código estruturado que não precisa ser jogado fora após o protótipo.' },
        { rank: 10, modelId: 'mimo-v2-5', modelName: 'MiMo-V2.5', fitScore: 83, role: 'Hyper-Economic Scaffold Worker', rationale: 'Tarifa absurdamente baixa ($0,05/$0,15) para testes em massa.' }
      ]
    },
    {
      id: 'economic-workers',
      title: 'Melhores Workers Econômicos para Subagentes & Alto Volume',
      icon: '💰',
      description: 'Modelos de baixo custo e alta velocidade desenhados para rodar milhares de chamadas repetitivas como subagentes, linter, testes e indexação.',
      keyAttributes: ['Custo por milhão de tokens', 'Throughput', 'Consumo de VRAM', 'Aderência a ferramentas'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.2, "agentic": 0.2, "reliability": 0.15, "cost": 0.3, "speed": 0.15},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["artificial-analysis", "opencode-go"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "GPT-5.6 Luna", "tippingPoint": "Luna vence a $0,20/$1,20. Se privacidade total (on-prem) tiver peso, gpt-oss-20b assume o #1 lugar."},
      rankings: [
        { rank: 1, modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna', fitScore: 98, role: 'Cloud Worker #1', rationale: 'Apenas $0,20 in / $1,20 out com contexto de 1M e capacidade de raciocínio leve.' },
        { rank: 2, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash (Low/Med)', fitScore: 97, role: 'Multimodal High-Speed Worker', rationale: '313 tok/s a $0,75/$3,75 (com 90% desconto em cache: $0,075/M).' },
        { rank: 3, modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', fitScore: 96, role: 'Open-Source MoE Worker', rationale: 'Licença MIT permissiva, $0,15 in / $0,50 out e 7.900 req/mês no OpenCode Go.' },
        { rank: 4, modelId: 'gpt-oss-20b', modelName: 'gpt-oss-20b (Local)', fitScore: 95, role: 'Local Zero-Cost Worker', rationale: 'Roda em GPU de 16GB VRAM (RTX 4080/4090); custo zero de tokens de API.' },
        { rank: 5, modelId: 'mimo-v2-5', modelName: 'MiMo-V2.5', fitScore: 93, role: 'Ultra-Budget Cloud Worker', rationale: '$0,05 in / $0,15 out: até 150.400 requisições mensais no OpenCode Go.' },
        { rank: 6, modelId: 'nemotron-3-5-lightning', modelName: 'Nemotron 3.5 Lightning', fitScore: 91, role: 'High-Throughput Local Worker', rationale: 'Otimizado em NVFP4 para placas NVIDIA RTX com latência sub-milisegundo.' },
        { rank: 7, modelId: 'deepseek-v4-flash-0731', modelName: 'DeepSeek-V4-Flash', fitScore: 90, role: 'Cloud Codebase Worker', rationale: '$0,22 in / $0,66 out e 37.800 requisições no Go.' },
        { rank: 8, modelId: 'claude-haiku-4-5', modelName: 'Claude Haiku 4.5', fitScore: 89, role: 'Fast Tool Calling Subagent', rationale: '83,2% no Tau² Retail com latência imediata para chamadas de ferramentas.' },
        { rank: 9, modelId: 'qwen3-8-27b', modelName: 'Qwen3.8-27B', fitScore: 88, role: 'Balanced Local Worker', rationale: 'Execução local de código sem internet com 27 bilhões de parâmetros.' },
        { rank: 10, modelId: 'composer-2-5', modelName: 'Composer 2.5', fitScore: 86, role: 'In-IDE Micro Worker', rationale: 'Incluso generosamente dentro do Cursor IDE.' }
      ]
    },
    {
      id: 'mobile-apps',
      title: 'Aplicativos Mobile (React Native, Flutter, Swift, Kotlin)',
      icon: '📱',
      description: 'Desenvolvimento mobile multiplataforma e nativo: ciclo de vida de apps, permissões, navegação nativa, performance de renderização e offline-first.',
      keyAttributes: ['Conhecimento de mobile SDKs', 'Responsividade em telas pequenas', 'Gerenciamento de permissões', 'Arquitetura Clean Mobile'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.35, "agentic": 0.25, "reliability": 0.2, "cost": 0.1, "speed": 0.1},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["swe-bench-verified", "cursorbench-32"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "Claude Sonnet 5", "tippingPoint": "Sonnet 5 vence em Clean Architecture Mobile. Fable 5.1 assume liderança se sincronização offline e persistência local forem centrais."},
      rankings: [
        { rank: 1, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 96, role: 'Clean Architecture Mobile Lead', rationale: 'Excelente em padrões MVVM/Clean em Swift e Kotlin, e tipagem impecável em TypeScript para React Native.' },
        { rank: 2, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 95, role: 'Cross-Platform System Architect', rationale: 'Design de APIs offline-first e sincronização local via SQLite/WatermelonDB.' },
        { rank: 3, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 93, role: 'Flutter & UI Screen Generator', rationale: 'Muito produtivo na geração de árvores de widgets no Flutter e SwiftUI declarativo.' },
        { rank: 4, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 91, role: 'Mobile Feature Developer', rationale: 'Implementação confiável de regras de autenticação, push notifications e deep links.' },
        { rank: 5, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', fitScore: 90, role: 'Multimodal Asset & Screen Tester', rationale: 'Testa layouts inspecionando screenshots de simuladores iOS e Android.' },
        { rank: 6, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 89, role: 'Mobile Security & State Auditor', rationale: 'Auditoria de armazenamento de chaves de criptografia e gerenciamento de estado complexo.' },
        { rank: 7, modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', fitScore: 88, role: 'Rapid Screen Worker', rationale: 'Geração veloz de componentes de lista e telas de cadastro no React Native.' },
        { rank: 8, modelId: 'claude-haiku-4-5', modelName: 'Claude Haiku 4.5', fitScore: 86, role: 'Micro Component Builder', rationale: 'Construção rápida de botões, modais e validações de formulário sem custo excessivo.' },
        { rank: 9, modelId: 'deepseek-v3-2', modelName: 'DeepSeek-V3.2', fitScore: 85, role: 'Local Test Generator', rationale: 'Criação de suites de testes Jest e Detox para mobile.' },
        { rank: 10, modelId: 'qwen3-8-max', modelName: 'Qwen3.8-Max', fitScore: 84, role: 'Multi-Language Localization', rationale: 'Suporte avançado para internacionalização (i18n) e suporte a múltiplos alfabetos.' }
      ]
    },
    {
      id: 'low-level-systems',
      title: 'Sistemas de Baixo Nível, C, Rust & Embarcados',
      icon: '⚙️',
      description: 'Programação de sistemas operacionais, drivers, microcontroladores, Rust com borrow checker e código de alta performance.',
      keyAttributes: ['Borrow checker Rust', 'Gerenciamento de memória manual', 'Registradores e protocolos de hardware', 'Zero warnings'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.4, "agentic": 0.2, "reliability": 0.3, "cost": 0.05, "speed": 0.05},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["terminalbench-21", "swe-bench-verified"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "GPT-5.6 Sol", "tippingPoint": "GPT-5.6 Sol domina borrow checker e memory leaks. Claude Opus 5 empata em protocolos binários de telecom."},
      rankings: [
        { rank: 1, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 99, role: 'Systems & Memory Safety Auditor', rationale: 'Resolução imbatível de erros complexos de lifetimes no Rust e mitigação de buffer overflows em C/C++.' },
        { rank: 2, modelId: 'claude-opus-5', modelName: 'Claude Opus 5', fitScore: 96, role: 'Low-Level Protocol Specialist', rationale: 'Implementação de protocolos binários de rede e arquiteturas de drivers de dispositivo.' },
        { rank: 3, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 94, role: 'Formal Systems Architect', rationale: 'Estruturação de sistemas embarcados desacoplados com controle estrito de concorrência.' },
        { rank: 4, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 90, role: 'C/Rust Feature Implementer', rationale: 'Escrita de rotinas eficientes sem overhead de runtime.' },
        { rank: 5, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 89, role: 'Deterministic Logic Implementer', rationale: 'Implementação de máquinas de estado e controladores de hardware com fidelidade estrita.' },
        { rank: 6, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 88, role: 'Systems Refactoring Partner', rationale: 'Refatoração de bases legadas em C para Rust idiomático mantendo interoperabilidade FFI.' },
        { rank: 7, modelId: 'gpt-oss-120b', modelName: 'GPT-OSS-120B', fitScore: 87, role: 'Self-Hosted Systems Implementer', rationale: 'Execução local privada para compilação e teste de kernels e firmwares sem envio de dados para a nuvem.' },
        { rank: 8, modelId: 'deepseek-v3-2', modelName: 'DeepSeek-V3.2', fitScore: 85, role: 'Algorithmic Optimization Worker', rationale: 'Otimização de loops críticos, vetorização SIMD e profiling de cache L1/L2.' },
        { rank: 9, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash', fitScore: 84, role: 'Documentation & Spec Auditor', rationale: 'Leitura ultrarrápida de centenas de páginas de datasheets de microcontroladores em sua janela de 1M.' },
        { rank: 10, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 83, role: 'Embedded Scripting Assistant', rationale: 'Desenvolvimento ágil de scripts de flash e teste automatizado via porta serial UART/JTAG.' }
      ]
    },
    {
      id: 'devops-infra-cloud',
      title: 'DevOps, Infraestrutura como Código (IaC) & SRE',
      icon: '☁️',
      description: 'Automação com Terraform, Kubernetes, Helm, pipelines de CI/CD (GitHub Actions), Dockerfiles otimizados e observabilidade.',
      keyAttributes: ['Sintaxe de Terraform/HCL', 'Manifestos de Kubernetes', 'Segurança de pipelines', 'Eficiência de build'],
      criteria: ["coding", "agentic", "reliability", "cost", "speed"],
      weights: {"coding": 0.3, "agentic": 0.35, "reliability": 0.15, "cost": 0.1, "speed": 0.1},
      coverage: 10,
      confidence: 'high',
      rankingMethod: 'multi-attribute-utility',
      evidenceIds: ["terminalbench-21", "artificial-analysis"],
      editorialOverrides: [],
      sensitivityAnalysis: {"defaultWinner": "Gemini 3.8 Flash High", "tippingPoint": "Gemini vence pelo índice de 90,8% no Terminal-Bench 2.1 e baixa latência. GPT-5.6 Sol assume para IAM e segurança zero-trust."},
      rankings: [
        { rank: 1, modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra', fitScore: 98, role: 'Autonomous Terminal & Systems Engineer', rationale: 'Líder no Terminal-Bench 4.0 (57,9%) e Snorkel TB Science (65.4%), combinando raciocínio deliberativo com execução precisa de comandos bash e scripts IaC.' },
        { rank: 2, modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash High', fitScore: 97, role: 'DevOps & Pipeline Automation Lead', rationale: '90,8% Terminal-Bench 2.1; execução impecável de comandos shell, scripts de deploy e validação de manifestos.' },
        { rank: 3, modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', fitScore: 96, role: 'Infrastructure Security & IAM Auditor', rationale: 'Configuração rigorosa de políticas IAM, redes VPC seguras e zero-trust architecture no Terraform.' },
        { rank: 4, modelId: 'glm-5-3', modelName: 'GLM-5.3', fitScore: 93, role: 'Disciplined Kubernetes Engineer', rationale: 'Criação metódica de charts do Helm e manifests K8s sem alucinação de APIs descontinuadas.' },
        { rank: 5, modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', fitScore: 91, role: 'CI/CD Pipeline Builder', rationale: 'Construção ágil de workflows do GitHub Actions com caching inteligente.' },
        { rank: 6, modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 90, role: 'Cloud Infrastructure Architect', rationale: 'Modelagem de topologias de nuvem resilientes com multi-region failover.' },
        { rank: 7, modelId: 'grok-4-6', modelName: 'Grok 4.6', fitScore: 89, role: 'Incident Triager & SRE Assistant', rationale: '88,6% no Terminal-Bench 2.1; diagnóstico rápido de logs em tempo real durante indisponibilidades.' },
        { rank: 8, modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', fitScore: 88, role: 'IaC Refactoring Specialist', rationale: 'Modularização de código Terraform em módulos reutilizáveis e versionados.' },
        { rank: 9, modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash', fitScore: 86, role: 'Log Parsing & Script Worker', rationale: 'Processamento eficiente de relatórios de vulnerabilidade (Trivy/SonarQube) e correções automáticas.' },
        { rank: 10, modelId: 'claude-opus-5', modelName: 'Claude Opus 5', fitScore: 85, role: 'Compliance & Governance Auditor', rationale: 'Verificação de conformidade SOC2 e ISO27001 em configurações de nuvem AWS/GCP/Azure.' }
      ]
    }
  ],

  orchestrationRecipes: [
    {
      id: 'recipe-enterprise-gpt6-astra-orchestration',
      title: 'Pipeline Frontier: GPT-6 Astra + Workers de Alta Velocidade',
      target: 'Grandes sistemas de missão crítica, refatoração de monorepos e agentes de terminal',
      flow: [
        { step: 1, role: 'Arquiteto & Raciocínio Profundo', model: 'GPT-6 Astra (XHigh/Max)', action: 'Planejamento formal, decomposição arquitetural e contratos de interface sob Responses API.' },
        { step: 2, role: 'Workers Rápidos de Implementação', model: 'Gemini 3.8 Flash / Grok 4.6', action: 'Geração paralela de código repetitivo e componentes auxiliares em alto throughput.' },
        { step: 3, role: 'Auditoria & Testes Críticos', model: 'GPT-6 Astra (High) / GPT-5.6 Sol', action: 'Verificação profunda de edge cases, concorrência e execução agêntica em ambiente de terminal.' }
      ],
      estimatedCostVsSingleModel: 'Economia de 55–65% vs executar todas as etapas exclusivamente em Astra Max, preservando a corretude de fronteira.'
    },
    {
      id: 'recipe-large-system-max-quality',
      title: 'Pipeline Enterprise: Qualidade Máxima & Zero Regressão',
      target: 'Monorepos grandes, sistemas bancários e SaaS complexos',
      flow: [
        { step: 1, role: 'Arquiteto & Planejador', model: 'Claude Fable 5.1 (High/XHigh)', action: 'Decomposição do sistema, definição de interfaces, tipos de dados e contratos de teste sem overengineering.' },
        { step: 2, role: 'Workers Paralelos de Implementação', model: 'Gemini 3.8 Flash (Med/High)', action: 'Implementação paralela de alta velocidade (305 tok/s) de submódulos, controllers e rotas.' },
        { step: 3, role: 'Revisor de Corretude & Edge Cases', model: 'GPT-5.6 Sol (High/Max)', action: 'Auditoria minuciosa de condições de corrida, segurança transacional e criação de testes de estresse.' },
        { step: 4, role: 'Aprovação Final da Arquitetura', model: 'Claude Fable 5.1', action: 'Validação de que a implementação respeitou a arquitetura inicial sem acúmulo de débito técnico.' }
      ],
      estimatedCostVsSingleModel: 'Redução de ~45% nos custos vs rodar todo o projeto exclusivamente em Fable Max.'
    },
    {
      id: 'recipe-cost-benefit-gemini-fable',
      title: 'Pipeline Custo/Benefício Balanceado (High-Throughput)',
      target: 'Startups, MVPs e desenvolvimento ágil do dia a dia',
      flow: [
        { step: 1, role: 'Planejamento & Scaffolding', model: 'Gemini 3.8 Flash (Medium)', action: 'Criação rápida da estrutura inicial de arquivos e testes básicos.' },
        { step: 2, role: 'Execução & Integração', model: 'Gemini 3.8 Flash (High)', action: 'Desenvolvimento das principais funcionalidades navegando na janela nativa de 1M.' },
        { step: 3, role: 'Escalonamento de Impasses', model: 'Claude Fable 5.1 / GPT-5.6 Sol', action: 'Acionado pontualmente apenas se um teste de integração falhar repetidamente.' }
      ],
      estimatedCostVsSingleModel: 'Custo de tokens ~80% menor que pipelines baseados unicamente em modelos de ponta.'
    },
    {
      id: 'recipe-game-dev-iterative',
      title: 'Pipeline Especializado para Game Development',
      target: 'Jogos Unity, Unreal Engine e Web Games 3D',
      flow: [
        { step: 1, role: 'Game Designer & Systems Architect', model: 'Claude Fable 5.1', action: 'Design de sistemas de gameplay, ciclo de vida e diagramação de dados.' },
        { step: 2, role: 'Gameplay Workers', model: 'Gemini 3.8 Flash / Grok 4.6', action: 'Implementação rápida de scripts de movimentação, shaders, UI e controladores.' },
        { step: 3, role: 'Física, Matemática & Debugging C++', model: 'GPT-5.6 Sol', action: 'Resolução de bugs de memória, física Chaos/PhysX e otimização de GC.' }
      ],
      estimatedCostVsSingleModel: 'Iterações até 3x mais rápidas em harnesses com suporte a MCP de game engine.'
    }
  ]
};


const USE_CASES_DATA = USE_CASE_COMPARISON_DATA.useCases;

if (typeof window !== 'undefined') {
  window.USE_CASE_COMPARISON_DATA = USE_CASE_COMPARISON_DATA;
  window.USE_CASES_DATA = USE_CASES_DATA;
}

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { USE_CASE_COMPARISON_DATA, USE_CASES_DATA };
}
