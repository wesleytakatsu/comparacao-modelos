/**
 * DATA PACK: RELATOS DA COMUNIDADE & EXPERIÊNCIA PRÁTICA (COMMUNITY DATA)
 * Data de Referência: 03/09/2026
 * 
 * Regra: Todos os dados desta base possuem sourceType: 'community' e evidenceType: 'anecdotal'.
 * Não representam medições científicas de laboratório, mas sentimentos e relatos de engenheiros em produção.
 */

const COMMUNITY_REPORTS_DATA = [
  {
    id: 'report-sol-vs-grok-backend',
    models: ['gpt-5-6-sol', 'grok-4-6'],
    date: '2026-08-14',
    platform: 'Reddit / r/cursor',
    harness: 'Cursor IDE',
    taskCategory: 'backend',
    sentiment: 'mixed-sol-preferred',
    summary: 'Comparativo em refatoração concorrente de backend (~2.5k LOC): preferência aproximada de 60/40 para GPT-5.6 Sol sobre Grok 4.6.',
    observations: [
      'GPT-5.6 Sol destacou-se no tratamento de edge cases financeiros e race conditions em código assíncrono.',
      'Sol gerou testes unitários e de integração substancialmente mais profundos e significativos.',
      'Grok 4.6 foi notavelmente mais rápido na emissão do código inicial e mais econômico na cota do Cursor.',
      'Discussão gerou opiniões divididas: desenvolvedores que priorizam velocidade preferiram Grok; desenvolvedores de fintech preferiram Sol.'
    ],
    caveats: 'Amostra baseada em discussão comunitária de um projeto específico de backend.',
    confidence: 'medium',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-grok-46-daily-dev',
    models: ['grok-4-6'],
    date: '2026-08-20',
    platform: 'GitHub Discussions / Cursor Community',
    harness: 'Cursor IDE',
    taskCategory: 'fullstack',
    sentiment: 'positive',
    summary: 'Experiência de uso contínuo em stack React + Java: grande evolução de Grok 4.6 em relação ao 4.5.',
    observations: [
      'Grok 4.6 lida com monorepos e codebases maiores com muito menos regressão que a versão 4.5.',
      'Menor taxa de edições destrutivas e melhor seguimento de instruções complexas.',
      'O autor ainda mantém Sol como modelo de fallback para problemas de lógica matemática ou concorrência extrema.'
    ],
    caveats: 'Relato individual corroborado por múltiplos comentários no fórum.',
    confidence: 'medium-low',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-sol-overengineering',
    models: ['gpt-5-6-sol'],
    date: '2026-08-25',
    platform: 'Hacker News / Lobsters',
    harness: 'Cursor / CLI',
    taskCategory: 'architecture',
    sentiment: 'mixed',
    summary: 'Tema recorrente de engenharia: GPT-5.6 Sol produz código extremamente robusto, mas com alto risco de overengineering.',
    observations: [
      'Sol adiciona camadas extras de abstração, guards defensivos redundantes e interfaces antes de o usuário solicitar.',
      'Relato comparativo apontou changesets até 3x maiores que Claude Fable para resolver a mesma issue de bugfix.',
      'Carga de revisão humana (code review burden) pode ser desgastante se o prompt não delimitar rigorosamente o escopo.',
      'Excelente quando a prioridade absoluta é tolerância a falhas e zero bugs em produção.'
    ],
    caveats: 'Risco de overengineering pode ser mitigado instruindo: "keep it simple, minimal diffs, no unnecessary abstractions".',
    confidence: 'medium-high',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-fable-sol-workflow',
    models: ['claude-fable-5-1', 'gpt-5-6-sol'],
    date: '2026-08-28',
    platform: 'X / Twitter Dev Community',
    harness: 'Claude Code + Cursor',
    taskCategory: 'architecture',
    sentiment: 'positive',
    summary: 'Padrão emergente de orquestração: Claude Fable na arquitetura e GPT-5.6 Sol na implementação detalhada.',
    observations: [
      'Fable mantém uma visão holística e simples do sistema, evitando inflar o projeto com código desnecessário.',
      'Sol pega a arquitetura definida pelo Fable e implementa com precisão cirúrgica de edge cases e cobertura de testes.',
      'Revisão final cruzada entre os dois modelos detectou vulnerabilidades que nenhum modelo sozinho havia notado.'
    ],
    caveats: 'Workflow exige assinatura de múltiplos serviços ou uso de roteador flexível.',
    confidence: 'medium-high',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-unity-claude-mcp',
    models: ['claude-fable-5'],
    date: '2026-08-10',
    platform: 'Unity Forums / r/gamedev',
    harness: 'Claude Code + Unity MCP',
    taskCategory: 'game-dev',
    sentiment: 'positive',
    summary: 'Desenvolvimento iterativo de jogo em Unity por ~13 horas contínuas utilizando Claude e servidor MCP de Unity.',
    observations: [
      'Fluxo metodológico: criar sistema C# → compilar no editor → testar cena via MCP → capturar logs de erro → corrigir → avançar.',
      'Forte evidência de raciocínio espacial e compreensão de GameObjects, componentes e hierarquias da Unity.',
      'Requer supervisão humana ativa para balanceamento de gameplay e sensibilidade de input; a IA não "cria o jogo pronto sozinha".'
    ],
    caveats: 'Harness com suporte a MCP é indispensável para essa experiência fluida.',
    confidence: 'medium',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-fable51-threejs-citybuilder',
    models: ['claude-fable-5-1'],
    date: '2026-09-01',
    platform: 'GitHub / Claude Showcase',
    harness: 'Claude Code CLI Max',
    taskCategory: 'game-dev',
    sentiment: 'positive',
    summary: 'Prototipagem rápida de jogo de simulação / city-builder 3D em Three.js em ~1 hora com ~14 subagentes paralelos.',
    observations: [
      'Fable 5.1 decompôs o projeto em sistemas autônomos (geração procedural de malha, tráfego de veículos, shader de água, UI).',
      'Consumo expressivo medido: 297k tokens de entrada, 1.9M de saída e 118M de tokens em cache read.',
      'Demonstrou capacidade agêntica sem precedentes para orquestrar múltiplos arquivos de código coordenados.',
      'Não substitui polimento de arte final e design de som de um estúdio de jogos, mas entrega protótipo funcional jogável.'
    ],
    caveats: 'Consumo massivo de tokens de cache e saída.',
    confidence: 'high',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-fable51-quota-burn',
    models: ['claude-fable-5-1'],
    date: '2026-09-03',
    platform: 'r/ClaudeAI / Discord Anthropic',
    harness: 'Claude Chat & Claude Code',
    taskCategory: 'general-coding',
    sentiment: 'negative-quota',
    summary: 'Relatos recorrentes pós-lançamento: qualidade espetacular, mas queima rápida da barra de 5 horas de cota do Claude Pro.',
    observations: [
      'Uma sessão de auditoria e refatoração de monorepo de ~30 minutos consumiu quase 90% da cota móvel do plano Pro.',
      'Em tarefas complexas o raciocínio adaptativo emite dezenas de milhares de tokens internos antes da resposta.',
      'Usuários recomendam usar Claude Sonnet 5 para consultas e reservar o Fable 5.1 para impasses técnicos críticos.'
    ],
    caveats: 'Comportamento esperado para o modelo frontier mais denso do mercado.',
    confidence: 'high',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-glm53-vs-grok46-frontend',
    models: ['glm-5-3', 'grok-4-6'],
    date: '2026-08-22',
    platform: 'WeChat Tech Blog / r/Frontend',
    harness: 'OpenCode / Cursor',
    taskCategory: 'frontend',
    sentiment: 'divergent',
    summary: 'Comparativo em ~60 arquivos de frontend: Grok foi 3x mais rápido, mas alterou design; GLM-5.3 foi metódico e sem bugs.',
    observations: [
      'Grok 4.6 concluiu a refatoração em ~25 minutos, porém alterou estilos do design system e gerou 5 bugs reportados depois.',
      'GLM-5.3 levou ~1.5 hora dividida em 12 fases disciplinadas, testando em 3 resoluções e mantendo o design 100% fiel com zero bugs.',
      'Conclusão: Grok é ideal para criação do zero em protótipos; GLM-5.3 é superior para manutenção e fidelidade a design existente.'
    ],
    caveats: 'Estudo de caso comunitário de um time específico.',
    confidence: 'medium',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-gemini-38-antigravity',
    models: ['gemini-3-8-flash'],
    date: '2026-09-02',
    platform: 'GitHub / Antigravity User Group',
    harness: 'Google Antigravity IDE',
    taskCategory: 'agentic',
    sentiment: 'positive',
    summary: 'Primeiras impressões do Gemini 3.8 Flash no Antigravity: maior persistência e menos desistências prematuras vs 3.7.',
    observations: [
      'O modelo não desiste cedo; navega por múltiplos arquivos, roda comandos de terminal e investiga causas-raiz.',
      'Throughput de geração impressionante (~305 tok/s), tornando o feedback quase instantâneo.',
      'Groundedness visual excelente ao inspecionar screenshots de UI e páginas web em testes com headless browser.'
    ],
    caveats: 'Relato inicial logo após o lançamento de 02/09/2026.',
    confidence: 'medium-low',
    evidenceType: 'anecdotal'
  },
  {
    id: 'report-gemini-38-token-burn',
    models: ['gemini-3-8-flash'],
    date: '2026-09-03',
    platform: 'Artificial Analysis Discussions / Reddit',
    harness: 'Gemini API / Mini-SWE-Agent',
    taskCategory: 'economics',
    sentiment: 'mixed',
    summary: 'No nível High de raciocínio, o Gemini 3.8 Flash gera ~30% mais tokens de saída que o 3.7 Flash High.',
    observations: [
      'A velocidade bruta de geração é muito alta, mas o modelo gasta mais tokens explicando e explorando hipóteses.',
      'O custo real por tarefa concluída sobe cerca de ~40% no modo High vs 3.7 Flash, mesmo com o mesmo preço base por milhão.',
      'Para tarefas mecânicas ou subagentes de alto volume, o nível Medium ou Low oferece melhor custo-benefício financeiro.'
    ],
    caveats: 'Corroborado matematicamente pelas medições de 120M output tokens no benchmark completo da Artificial Analysis.',
    confidence: 'high',
    evidenceType: 'anecdotal'
  }
];

// Matriz de Divergências: O que os Benchmarks dizem vs O que a Comunidade relata
const BENCHMARK_VS_COMMUNITY_DIVERGENCES = [
  {
    modelId: 'claude-fable-5-1',
    modelName: 'Claude Fable 5.1',
    benchmarkClaim: 'Score recorde de 73,4% no CursorBench Max e AA Index 66 (Líder Absoluto da Indústria).',
    communityReality: 'A qualidade de raciocínio é unânime, mas o modelo queima cotas em minutos. Sessões longas de agente podem esgotar planos Pro rapidamente sem um limitador de turnos.',
    verdict: 'O melhor planejador e arquiteto do planeta, mas deve ser usado com disciplina de cota ou em planos Max/Team.'
  },
  {
    modelId: 'gpt-5-6-sol',
    modelName: 'GPT-5.6 Sol',
    benchmarkClaim: '88,8% no Terminal-Bench 2.1 e 72,7% no DeepSWE (precisão lógica e retenção extrema).',
    communityReality: 'Excepcional em concorrência e fintech, porém tende a overengineer. Produz changesets substancialmente maiores e introduz abstrações defensivas não solicitadas.',
    verdict: 'Imbatível para regras de negócio críticas e finanças; exige prompt com instrução de escopo mínimo.'
  },
  {
    modelId: 'grok-4-6',
    modelName: 'Grok 4.6',
    benchmarkClaim: 'Alto throughput e capacidades agênticas de topo integradas nativamente ao pool do Cursor.',
    communityReality: 'Velocidade e estética visual excelentes em protótipos, mas alguns desenvolvedores relatam "design drift", alterando estruturas e estilos existentes de CSS.',
    verdict: 'Campeão para prototipagem rápida e iteração solo; requer harnesses com checagem visual para refatorações corporativas.'
  },
  {
    modelId: 'gemini-3-8-flash',
    modelName: 'Gemini 3.8 Flash',
    benchmarkClaim: '74,0% no DeepSWE e 90,8% no Terminal-Bench 2.1 com impressionantes ~305-310 tokens/segundo.',
    communityReality: 'A velocidade de decode é vertiginosa, mas o modo High emite ~30% mais tokens de raciocínio, encarecendo o custo real da tarefa em ~40% em relação ao Gemini 3.7 Flash.',
    verdict: 'Líder em multimodalidade e velocidade; selecione esforço Medium para melhor eficiência orçamentária.'
  }
];

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COMMUNITY_REPORTS_DATA, BENCHMARK_VS_COMMUNITY_DIVERGENCES };
}
