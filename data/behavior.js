/**
 * DATA PACK: COMPORTAMENTO DE ENGENHARIA & PERFIS PRÁTICOS (ENGINEERING BEHAVIOR)
 * Data de Referência: 03/09/2026
 * 
 * ATENÇÃO METROLÓGICA:
 * Estes valores são ESTIMATIVAS CALIBRADAS ('E — Calibrado') derivadas da síntese entre
 * benchmarks operacionais e relatos auditados da comunidade técnica.
 * NÃO constituem medições laboratoriais oficiais nem scores absolutos.
 */

const ENGINEERING_BEHAVIOR_DATA = {
  metadata: {
    scale: '0 a 100 (Maior = melhor, exceto para overengineeringRisk onde maior indica maior tendência a complexidade desnecessária)',
    sourceType: 'calibrated',
    confidenceLevel: 'medium',
    disclaimer: 'Calibração baseada em relatos da comunidade + benchmarks operacionais. Não é benchmark oficial.'
  },

  dimensions: [
    { key: 'scopeDiscipline', label: 'Disciplina de Escopo', description: 'Capacidade de limitar as alterações estritamente ao solicitado sem introduzir código não pedido.' },
    { key: 'architecture', label: 'Visão Arquitetural', description: 'Capacidade de estruturar sistemas modulares, desacoplados e de fácil manutenção.' },
    { key: 'autonomy', label: 'Autonomia Agêntica', description: 'Capacidade de avançar múltiplos passos sem interrupção humana ou pedidos desnecessários de confirmação.' },
    { key: 'persistence', label: 'Persistência & Investigação', description: 'Resistência a desistir prematuramente de bugs difíceis e vontade de investigar logs.' },
    { key: 'firstPassSuccess', label: 'Taxa de Acerto na 1ª Passada', description: 'Probabilidade de o código compilar e passar nos testes básicos na primeira geração.' },
    { key: 'testDiscipline', label: 'Rigor com Testes', description: 'Cuidado em criar testes significativos cobrindo edge cases e regressão.' },
    { key: 'instructionFollowing', label: 'Aderência a Regras', description: 'Obediência a restrições de arquitetura, estilos de lint e convenções do projeto.' },
    { key: 'visualTaste', label: 'Gosto Visual & Estética', description: 'Qualidade do design gerado, responsividade e proporções em interfaces web/mobile.' },
    { key: 'humanReviewEase', label: 'Facilidade de Code Review', description: 'Legibilidade dos diffs e ausência de ruídos ou mudanças desnecessárias no git diff.' },
    { key: 'quotaEfficiency', label: 'Eficiência de Cota', description: 'Capacidade de resolver o problema sem queimar excessivamente o orçamento de tokens.' },
    { key: 'overengineeringRisk', label: 'Risco de Overengineering', description: 'Tendência a criar abstrações e proteções desnecessárias (MAIOR = PIOR).', isInverted: true },
    { key: 'destructiveEditSafety', label: 'Segurança contra Edições Destrutivas', description: 'Proteção contra deletar código legado útil ou quebrar imports de arquivos adjacentes.' }
  ],

  models: {
    'claude-fable-5-1': {
      modelName: 'Claude Fable 5.1',
      scopeDiscipline: 94,
      architecture: 100,
      autonomy: 100,
      persistence: 98,
      firstPassSuccess: 96,
      testDiscipline: 96,
      instructionFollowing: 97,
      visualTaste: 94,
      humanReviewEase: 83,
      quotaEfficiency: 55,
      overengineeringRisk: 32,
      destructiveEditSafety: 91,
      profileSummary: 'O arquiteto supremo: visão holística perfeita e liderança agêntica autônoma, porém com alta demanda de cota em sessões longas.'
    },
    'gpt-6-astra': {
      modelName: 'GPT-6 Astra',
      scopeDiscipline: 85,
      architecture: 99,
      autonomy: 99,
      persistence: 99,
      firstPassSuccess: 98,
      testDiscipline: 99,
      instructionFollowing: 97,
      visualTaste: 88,
      humanReviewEase: 74,
      quotaEfficiency: 52,
      overengineeringRisk: 68,
      destructiveEditSafety: 93,
      profileSummary: 'O oráculo de raciocínio profundo: máxima visão arquitetural e persistência agêntica extrema, com suporte nativo a mid-turn steering e async tool calling, mas alta demanda de cota em esforços elevados.'
    },
    'gpt-5-6-sol': {
      modelName: 'GPT-5.6 Sol',
      scopeDiscipline: 82,
      architecture: 98,
      autonomy: 97,
      persistence: 99,
      firstPassSuccess: 97,
      testDiscipline: 99,
      instructionFollowing: 95,
      visualTaste: 87,
      humanReviewEase: 72,
      quotaEfficiency: 72,
      overengineeringRisk: 72,
      destructiveEditSafety: 90,
      profileSummary: 'O engenheiro de tolerância zero: rigor máximo em testes e concorrência, mas com forte propensão a abstrações e diffs grandes.'
    },
    'gemini-3-8-flash': {
      modelName: 'Gemini 3.8 Flash',
      scopeDiscipline: 92,
      architecture: 94,
      autonomy: 98,
      persistence: 98,
      firstPassSuccess: 94,
      testDiscipline: 97,
      instructionFollowing: 95,
      visualTaste: 94,
      humanReviewEase: 85,
      quotaEfficiency: 91,
      overengineeringRisk: 35,
      destructiveEditSafety: 91,
      profileSummary: 'A locomotiva veloz: throughput de 305 tok/s, excelente persistência e navegação multimodal, gerando mais tokens no nível High.'
    },
    'grok-4-6': {
      modelName: 'Grok 4.6',
      scopeDiscipline: 84,
      architecture: 92,
      autonomy: 94,
      persistence: 94,
      firstPassSuccess: 91,
      testDiscipline: 88,
      instructionFollowing: 92,
      visualTaste: 96,
      humanReviewEase: 87,
      quotaEfficiency: 88,
      overengineeringRisk: 35,
      destructiveEditSafety: 82,
      profileSummary: 'O criador rápido: agilidade impressionante e bom senso estético em UI, mas exige atenção contra desvios de design existente.'
    },
    'glm-5-3': {
      modelName: 'GLM-5.3 (Full)',
      scopeDiscipline: 96,
      architecture: 95,
      autonomy: 96,
      persistence: 98,
      firstPassSuccess: 94,
      testDiscipline: 98,
      instructionFollowing: 96,
      visualTaste: 96,
      humanReviewEase: 91,
      quotaEfficiency: 92,
      overengineeringRisk: 26,
      destructiveEditSafety: 95,
      profileSummary: 'O artesão disciplinado: metódico, fidelidade rigorosa a especificações e quase imune a overengineering.'
    },
    'glm-5-3-flash': {
      modelName: 'GLM-5.3-Flash',
      scopeDiscipline: 94,
      architecture: 91,
      autonomy: 93,
      persistence: 94,
      firstPassSuccess: 91,
      testDiscipline: 94,
      instructionFollowing: 94,
      visualTaste: 93,
      humanReviewEase: 92,
      quotaEfficiency: 99,
      overengineeringRisk: 23,
      destructiveEditSafety: 94,
      profileSummary: 'Eficiência acessível: licença permissiva MIT, multimodalidade nativa em 1M e o menor custo por tarefa concluída.'
    },
    'claude-opus-5': {
      modelName: 'Claude Opus 5',
      scopeDiscipline: 93,
      architecture: 97,
      autonomy: 95,
      persistence: 97,
      firstPassSuccess: 95,
      testDiscipline: 95,
      instructionFollowing: 96,
      visualTaste: 90,
      humanReviewEase: 86,
      quotaEfficiency: 70,
      overengineeringRisk: 38,
      destructiveEditSafety: 93,
      profileSummary: 'Frontier de raciocínio enciclopédico e profundidade analítica para problemas teóricos complexos.'
    },
    'claude-sonnet-5': {
      modelName: 'Claude Sonnet 5',
      scopeDiscipline: 90,
      architecture: 93,
      autonomy: 93,
      persistence: 94,
      firstPassSuccess: 92,
      testDiscipline: 92,
      instructionFollowing: 94,
      visualTaste: 92,
      humanReviewEase: 89,
      quotaEfficiency: 88,
      overengineeringRisk: 28,
      destructiveEditSafety: 93,
      profileSummary: 'O workhorse universal equilibrado: confiável para o dia a dia a um custo acessível de $2/$10.'
    },
    'gpt-5-6-terra': {
      modelName: 'GPT-5.6 Terra',
      scopeDiscipline: 89,
      architecture: 93,
      autonomy: 92,
      persistence: 94,
      firstPassSuccess: 93,
      testDiscipline: 94,
      instructionFollowing: 94,
      visualTaste: 88,
      humanReviewEase: 88,
      quotaEfficiency: 90,
      overengineeringRisk: 42,
      destructiveEditSafety: 92,
      profileSummary: 'O cavalo de batalha do ecossistema OpenAI: 90% da capacidade do Sol por metade do custo.'
    },
    'gpt-5-6-luna': {
      modelName: 'GPT-5.6 Luna',
      scopeDiscipline: 88,
      architecture: 85,
      autonomy: 88,
      persistence: 89,
      firstPassSuccess: 89,
      testDiscipline: 86,
      instructionFollowing: 93,
      visualTaste: 85,
      humanReviewEase: 92,
      quotaEfficiency: 98,
      overengineeringRisk: 18,
      destructiveEditSafety: 94,
      profileSummary: 'Worker econômico ultrarrápido ($0,20/$1,20) perfeito para subagentes em paralelo.'
    },
    'kimi-k3': {
      modelName: 'Kimi K3',
      scopeDiscipline: 91,
      architecture: 93,
      autonomy: 94,
      persistence: 95,
      firstPassSuccess: 90,
      testDiscipline: 93,
      instructionFollowing: 93,
      visualTaste: 90,
      humanReviewEase: 87,
      quotaEfficiency: 82,
      overengineeringRisk: 30,
      destructiveEditSafety: 92,
      profileSummary: 'Raciocínio longo e persistência em 1M de contexto com forte aderência a bases orientais e polyglot.'
    },
    'gpt-oss-20b': {
      modelName: 'gpt-oss-20b',
      scopeDiscipline: 86,
      architecture: 82,
      autonomy: 84,
      persistence: 86,
      firstPassSuccess: 87,
      testDiscipline: 86,
      instructionFollowing: 90,
      visualTaste: 80,
      humanReviewEase: 90,
      quotaEfficiency: 100, // 100% local = custo zero de API
      overengineeringRisk: 15,
      destructiveEditSafety: 92,
      profileSummary: 'O campeão da privacidade local: 100% offline em 16GB de VRAM com custo zero de tokens.'
    }
  }
};

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ENGINEERING_BEHAVIOR_DATA };
}
