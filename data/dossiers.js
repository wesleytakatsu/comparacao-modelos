/**
 * DOSSIÊS TÉCNICOS & REGISTRO GLOBAL DE BENCHMARKS
 * Snapshot de Referência: 03/09/2026
 *
 * Separação metrológica estrita entre medições oficiais (official),
 * reportadas pelo fornecedor (vendor-reported), independentes (independent)
 * e da comunidade (community), evitando contaminação cruzada de harnesses.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var exportsObj = factory();
    for (var key in exportsObj) {
      if (Object.prototype.hasOwnProperty.call(exportsObj, key)) {
        root[key] = exportsObj[key];
      }
    }
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ==========================================
  // 1. REGISTRO GLOBAL DE BENCHMARKS (Seções 10 a 18)
  // ==========================================
  var BENCHMARK_REGISTRY = {
    // --- Coding / Software Engineering ---
    'terminal-bench-2-0': { id: 'terminal-bench-2-0', name: 'Terminal-Bench 2.0', category: 'coding', version: '2.0', unit: 'percent', higherIsBetter: true },
    'terminal-bench-2-1': { id: 'terminal-bench-2-1', name: 'Terminal-Bench 2.1', category: 'coding', version: '2.1', unit: 'percent', higherIsBetter: true },
    'terminal-bench-3-0': { id: 'terminal-bench-3-0', name: 'Terminal-Bench 3.0', category: 'coding', version: '3.0', unit: 'percent', higherIsBetter: true },
    'terminal-bench-4-0': { id: 'terminal-bench-4-0', name: 'Terminal-Bench 4.0', category: 'coding', version: '4.0', unit: 'percent', higherIsBetter: true },
    'terminal-bench-science-0-1': { id: 'terminal-bench-science-0-1', name: 'Terminal-Bench Science 0.1', category: 'coding', version: '0.1', unit: 'percent', higherIsBetter: true },
    'deep-swe-1-1': { id: 'deep-swe-1-1', name: 'DeepSWE 1.1', category: 'coding', version: '1.1', unit: 'percent', higherIsBetter: true },
    'swe-bench-verified': { id: 'swe-bench-verified', name: 'SWE-bench Verified', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'swe-bench-pro': { id: 'swe-bench-pro', name: 'SWE-bench Pro', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'swe-bench-multilingual': { id: 'swe-bench-multilingual', name: 'SWE-bench Multilingual', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'swe-atlas': { id: 'swe-atlas', name: 'SWE-Atlas', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'swe-atlas-refactoring': { id: 'swe-atlas-refactoring', name: 'SWE-Atlas Refactoring', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'swe-atlas-test-writing': { id: 'swe-atlas-test-writing', name: 'SWE-Atlas Test Writing', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'nl2repo': { id: 'nl2repo', name: 'NL2Repo', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'programbench': { id: 'programbench', name: 'ProgramBench', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'frontierswe': { id: 'frontierswe', name: 'FrontierSWE', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'swe-marathon-1-1': { id: 'swe-marathon-1-1', name: 'SWE-Marathon 1.1', category: 'coding', version: '1.1', unit: 'percent', higherIsBetter: true },
    'posttrainbench': { id: 'posttrainbench', name: 'PostTrainBench', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'swe-fficiency': { id: 'swe-fficiency', name: 'SWE-fficiency', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'kernelbench-hard': { id: 'kernelbench-hard', name: 'KernelBench Hard', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'frontiercode-1-1-ext': { id: 'frontiercode-1-1-ext', name: 'FrontierCode 1.1 Extended', category: 'coding', version: '1.1', unit: 'percent', higherIsBetter: true },
    'apex-swe': { id: 'apex-swe', name: 'APEX-SWE', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'kimi-codebench-2-0': { id: 'kimi-codebench-2-0', name: 'Kimi Code Bench 2.0', category: 'coding', version: '2.0', unit: 'percent', higherIsBetter: true },
    'dsbench-fullstack': { id: 'dsbench-fullstack', name: 'DSBench FullStack', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'dsbench-hard': { id: 'dsbench-hard', name: 'DSBench Hard', category: 'coding', version: '1.0', unit: 'percent', higherIsBetter: true },
    'cursorbench-3-2': { id: 'cursorbench-3-2', name: 'CursorBench 3.2', category: 'coding', version: '3.2', unit: 'percent', higherIsBetter: true },

    // --- Agent / Tool Use (Seção 12) ---
    'toolathlon-verified': { id: 'toolathlon-verified', name: 'Toolathlon Verified', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'automationbench': { id: 'automationbench', name: 'AutomationBench', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'automationbench-aa': { id: 'automationbench-aa', name: 'AutomationBench-AA', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'agents-last-exam': { id: 'agents-last-exam', name: "Agents' Last Exam (ALE)", category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'ale-cli': { id: 'ale-cli', name: 'ALE-CLI', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'apex-agents': { id: 'apex-agents', name: 'APEX-Agents', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'apex-agents-aa': { id: 'apex-agents-aa', name: 'APEX-Agents-AA', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'mcp-atlas': { id: 'mcp-atlas', name: 'MCP Atlas', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'mcpmark-verified': { id: 'mcpmark-verified', name: 'MCPMark Verified', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'browsecomp': { id: 'browsecomp', name: 'BrowseComp', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'osworld': { id: 'osworld', name: 'OSWorld Original', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'osworld-verified': { id: 'osworld-verified', name: 'OSWorld Verified', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'osworld-2': { id: 'osworld-2', name: 'OSWorld 2', category: 'agent', version: '2.0', unit: 'percent', higherIsBetter: true },
    'coworkbench': { id: 'coworkbench', name: 'CoWorkBench', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'jobbench': { id: 'jobbench', name: 'JobBench', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'deepsearchqa': { id: 'deepsearchqa', name: 'DeepSearchQA', category: 'agent', version: '1.0', unit: 'f1', higherIsBetter: true },
    'researchrubrics': { id: 'researchrubrics', name: 'ResearchRubrics', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'tau2-retail': { id: 'tau2-retail', name: 'τ² Retail', category: 'agent', version: '2.0', unit: 'percent', higherIsBetter: true },
    'tau2-airline': { id: 'tau2-airline', name: 'τ² Airline', category: 'agent', version: '2.0', unit: 'percent', higherIsBetter: true },
    'tau3-banking': { id: 'tau3-banking', name: 'τ³ Banking', category: 'agent', version: '3.0', unit: 'percent', higherIsBetter: true },

    // --- Science / Knowledge / Reasoning (Seção 13) ---
    'gpqa-diamond': { id: 'gpqa-diamond', name: 'GPQA Diamond', category: 'science', version: '1.0', unit: 'percent', higherIsBetter: true },
    'humanitys-last-exam': { id: 'humanitys-last-exam', name: "Humanity's Last Exam (HLE)", category: 'science', version: '1.0', unit: 'percent', higherIsBetter: true },
    'hle-no-tools': { id: 'hle-no-tools', name: 'HLE (No Tools)', category: 'science', version: '1.0', unit: 'percent', higherIsBetter: true },
    'hle-with-tools': { id: 'hle-with-tools', name: 'HLE (With Tools)', category: 'science', version: '1.0', unit: 'percent', higherIsBetter: true },
    'hle-verified': { id: 'hle-verified', name: 'HLE Verified', category: 'science', version: '1.0', unit: 'percent', higherIsBetter: true },
    'critpt': { id: 'critpt', name: 'CritPt', category: 'science', version: '1.0', unit: 'percent', higherIsBetter: true },
    'scicode': { id: 'scicode', name: 'SciCode', category: 'science', version: '1.0', unit: 'percent', higherIsBetter: true },
    'mmlu-pro': { id: 'mmlu-pro', name: 'MMLU-Pro', category: 'science', version: '1.0', unit: 'percent', higherIsBetter: true },
    'frontiermath-t1-3-v2': { id: 'frontiermath-t1-3-v2', name: 'FrontierMath Tier 1–3 v2', category: 'science', version: '2.0', unit: 'percent', higherIsBetter: true },
    'frontiermath-t4-v2': { id: 'frontiermath-t4-v2', name: 'FrontierMath Tier 4 v2', category: 'science', version: '2.0', unit: 'percent', higherIsBetter: true },
    'hmmt-2026': { id: 'hmmt-2026', name: 'HMMT 2026', category: 'science', version: '2026', unit: 'percent', higherIsBetter: true },
    'aime-2025': { id: 'aime-2025', name: 'AIME 2025', category: 'science', version: '2025', unit: 'percent', higherIsBetter: true },

    // --- Long Context (Seção 14) ---
    'mrcr-v2-256k-512k': { id: 'mrcr-v2-256k-512k', name: 'MRCR v2 (256K–512K)', category: 'longContext', version: '2.0', unit: 'percent', higherIsBetter: true },
    'mrcr-v2-512k-1m': { id: 'mrcr-v2-512k-1m', name: 'MRCR v2 (512K–1M)', category: 'longContext', version: '2.0', unit: 'percent', higherIsBetter: true },
    'graphwalks-bfs-256k': { id: 'graphwalks-bfs-256k', name: 'GraphWalks BFS 256K', category: 'longContext', version: '1.0', unit: 'percent', higherIsBetter: true },
    'graphwalks-bfs-1m': { id: 'graphwalks-bfs-1m', name: 'GraphWalks BFS 1M', category: 'longContext', version: '1.0', unit: 'percent', higherIsBetter: true },
    'onemillionbench': { id: 'onemillionbench', name: 'OneMillionBench', category: 'longContext', version: '1.0', unit: 'percent', higherIsBetter: true },
    'corpusqa-1m': { id: 'corpusqa-1m', name: 'CorpusQA 1M', category: 'longContext', version: '1.0', unit: 'percent', higherIsBetter: true },
    'aa-lcr': { id: 'aa-lcr', name: 'AA-LCR (Long Context Reasoning)', category: 'longContext', version: '1.0', unit: 'percent', higherIsBetter: true },

    // --- Multimodal (Seção 15) ---
    'mmmu-pro-no-tools': { id: 'mmmu-pro-no-tools', name: 'MMMU-Pro (No Tools)', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'mmmu-pro-with-tools': { id: 'mmmu-pro-with-tools', name: 'MMMU-Pro (With Tools)', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'charxiv': { id: 'charxiv', name: 'CharXiv', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'gdp-pdf': { id: 'gdp-pdf', name: 'GDP.pdf', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'chartography': { id: 'chartography', name: 'Chartography', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'zerobench': { id: 'zerobench', name: 'ZeroBench', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'officeqa-pro': { id: 'officeqa-pro', name: 'OfficeQA Pro', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'mathvision': { id: 'mathvision', name: 'MathVision', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'omnidocbench': { id: 'omnidocbench', name: 'OmniDocBench', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'videommmu': { id: 'videommmu', name: 'VideoMMMU', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'video-mme': { id: 'video-mme', name: 'Video-MME', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'mvbench': { id: 'mvbench', name: 'MVBench', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'mmvu': { id: 'mmvu', name: 'MMVU', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },
    'babyvision': { id: 'babyvision', name: 'BabyVision', category: 'multimodal', version: '1.0', unit: 'percent', higherIsBetter: true },

    // --- Business / Professional Work (Seção 16) ---
    'gdpval-aa-v2': { id: 'gdpval-aa-v2', name: 'GDPval-AA v2', category: 'business', version: '2.0', unit: 'elo', higherIsBetter: true },
    'aa-briefcase': { id: 'aa-briefcase', name: 'AA-Briefcase', category: 'business', version: '1.0', unit: 'elo', higherIsBetter: true },
    'finance-agent-v2': { id: 'finance-agent-v2', name: 'Finance Agent v2', category: 'business', version: '2.0', unit: 'percent', higherIsBetter: true },
    'harvey-lab': { id: 'harvey-lab', name: 'Harvey LAB', category: 'business', version: '1.0', unit: 'percent', higherIsBetter: true },
    'harvey-legal-agent': { id: 'harvey-legal-agent', name: 'Harvey Legal Agent', category: 'business', version: '1.0', unit: 'percent', higherIsBetter: true },
    'enterpriseops-gym': { id: 'enterpriseops-gym', name: 'EnterpriseOps-Gym', category: 'business', version: '1.0', unit: 'percent', higherIsBetter: true },
    'bankertoolbench': { id: 'bankertoolbench', name: 'BankerToolBench', category: 'business', version: '1.0', unit: 'percent', higherIsBetter: true },
    'aa-analystagent': { id: 'aa-analystagent', name: 'AA-AnalystAgent', category: 'business', version: '1.0', unit: 'percent', higherIsBetter: true },

    // --- Cyber / Security (Seção 17) ---
    'cybergym': { id: 'cybergym', name: 'CyberGym', category: 'cyber', version: '1.0', unit: 'percent', higherIsBetter: true },
    'exploitgym': { id: 'exploitgym', name: 'ExploitGym', category: 'cyber', version: '1.0', unit: 'tasks', higherIsBetter: true },
    'exploitbench': { id: 'exploitbench', name: 'ExploitBench', category: 'cyber', version: '1.0', unit: 'percent', higherIsBetter: true },

    // --- Self-Improvement / Research Engineering (Seção 32) ---
    'internal-research-debug': { id: 'internal-research-debug', name: 'Internal Research Debug', category: 'research', version: '1.0', unit: 'percent', higherIsBetter: true },
    'kernelgen-1p': { id: 'kernelgen-1p', name: 'KernelGen 1P', category: 'research', version: '1.0', unit: 'percent', higherIsBetter: true },
    'nanogpt': { id: 'nanogpt', name: 'NanoGPT', category: 'research', version: '1.0', unit: 'percent', higherIsBetter: true },
    'posttrainbench-lite': { id: 'posttrainbench-lite', name: 'PostTrainBench Lite', category: 'research', version: '1.0', unit: 'percent', higherIsBetter: true },
    'rsi-index': { id: 'rsi-index', name: 'RSI Index', category: 'research', version: '1.0', unit: 'percent', higherIsBetter: true },

    // --- Science / Other Domains (Seção 18) ---
    'arc-agi-2': { id: 'arc-agi-2', name: 'ARC-AGI-2', category: 'other', version: '2.0', unit: 'percent', higherIsBetter: true },
    'arc-agi-3': { id: 'arc-agi-3', name: 'ARC-AGI-3', category: 'other', version: '3.0', unit: 'percent', higherIsBetter: true },
    'genebench-pro': { id: 'genebench-pro', name: 'GeneBench Pro', category: 'other', version: '1.0', unit: 'percent', higherIsBetter: true },
    'lifescibench': { id: 'lifescibench', name: 'LifeSciBench', category: 'other', version: '1.0', unit: 'percent', higherIsBetter: true },
    'medchembench': { id: 'medchembench', name: 'MedChemBench', category: 'other', version: '1.0', unit: 'percent', higherIsBetter: true },
    'healthbench-pro': { id: 'healthbench-pro', name: 'HealthBench Professional', category: 'other', version: '1.0', unit: 'percent', higherIsBetter: true },
    'biomystery': { id: 'biomystery', name: 'BioMystery', category: 'other', version: '1.0', unit: 'percent', higherIsBetter: true },
    'horizonmath': { id: 'horizonmath', name: 'HorizonMath', category: 'other', version: '1.0', unit: 'percent', higherIsBetter: true },

    'arc-agi-1': { id: 'arc-agi-1', name: 'ARC-AGI-1', category: 'other', version: '1.0', unit: 'percent', higherIsBetter: true },
    'arc-agi-3-standard': { id: 'arc-agi-3-standard', name: 'ARC-AGI-3 (Standard)', category: 'other', version: '3.0', unit: 'percent', higherIsBetter: true },
    'arc-agi-3-provider-adapter': { id: 'arc-agi-3-provider-adapter', name: 'ARC-AGI-3 (Provider Adapter)', category: 'other', version: '3.0', unit: 'percent', higherIsBetter: true },
    'frontiercode-1-1-main': { id: 'frontiercode-1-1-main', name: 'FrontierCode 1.1 Main', category: 'coding', version: '1.1', unit: 'percent', higherIsBetter: true },
    'frontiercode-1-1-extended': { id: 'frontiercode-1-1-extended', name: 'FrontierCode 1.1 Extended', category: 'coding', version: '1.1', unit: 'percent', higherIsBetter: true },
    'osworld-2-offline-partial': { id: 'osworld-2-offline-partial', name: 'OSWorld 2 (Offline Partial)', category: 'agent', version: '2.0', unit: 'percent', higherIsBetter: true },
    'screenspot-pro': { id: 'screenspot-pro', name: 'ScreenSpot Pro', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'benchcad': { id: 'benchcad', name: 'BenchCAD', category: 'agent', version: '1.0', unit: 'percent', higherIsBetter: true },
    'healthbench-professional': { id: 'healthbench-professional', name: 'HealthBench Professional', category: 'other', version: '1.0', unit: 'percent', higherIsBetter: true },
    'sre-bench': { id: 'sre-bench', name: 'SRE-bench', category: 'cyber', version: '1.0', unit: 'percent', higherIsBetter: true },
    'sec-bench-pro': { id: 'sec-bench-pro', name: 'SecBench Pro', category: 'cyber', version: '1.0', unit: 'percent', higherIsBetter: true },
    'artificial-analysis-index-v4-1-1': { id: 'artificial-analysis-index-v4-1-1', name: 'Artificial Analysis Intelligence Index v4.1.1', category: 'aa-composite', version: '4.1.1', unit: 'index', higherIsBetter: true },
    'artificial-analysis-index-v4-2': { id: 'artificial-analysis-index-v4-2', name: 'Artificial Analysis Intelligence Index v4.2', category: 'aa-composite', version: '4.2', unit: 'index', higherIsBetter: true },

    // --- Artificial Analysis Composite Index ---
    'aa-intelligence-index': { id: 'aa-intelligence-index', name: 'Artificial Analysis Intelligence Index', category: 'aa-composite', version: '4.1.1', unit: 'index', higherIsBetter: true }
  };

  // ==========================================
  // 2. REGISTRO CANÔNICO DE FONTES (Seção 130)
  // ==========================================
  var SOURCE_REGISTRY = {
    'google-gemini38-enterprise-eval': {
      id: 'google-gemini38-enterprise-eval',
      publisher: 'Google DeepMind',
      title: 'Gemini 3.8 Flash Technical & Enterprise Evaluation Report',
      sourceType: 'official',
      publishedAt: '2026-09-02',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'google-deepmind-gemini38': {
      id: 'google-deepmind-gemini38',
      publisher: 'Google DeepMind',
      title: 'Gemini 3.8 Launch & Model Card',
      sourceType: 'official',
      publishedAt: '2026-09-01',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-gemini38-flash': {
      id: 'aa-gemini38-flash',
      publisher: 'Artificial Analysis',
      title: 'Gemini 3.8 Flash Benchmark Analysis (High, Medium, Low)',
      sourceType: 'independent',
      publishedAt: '2026-09-02',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'openai-gpt56-sol-eval': {
      id: 'openai-gpt56-sol-eval',
      publisher: 'OpenAI',
      title: 'GPT-5.6 Sol System Card & Research Evaluation',
      sourceType: 'official',
      publishedAt: '2026-08-25',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'openai-gpt56-terra-eval': {
      id: 'openai-gpt56-terra-eval',
      publisher: 'OpenAI',
      title: 'GPT-5.6 Terra Technical Specifications & Frontier Benchmarks',
      sourceType: 'official',
      publishedAt: '2026-08-25',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'openai-gpt56-luna-eval': {
      id: 'openai-gpt56-luna-eval',
      publisher: 'OpenAI',
      title: 'GPT-5.6 Luna System Card: Efficiency, Scaling & Retrieval Limits',
      sourceType: 'official',
      publishedAt: '2026-08-25',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-gpt56-sol': {
      id: 'aa-gpt56-sol',
      publisher: 'Artificial Analysis',
      title: 'GPT-5.6 Sol Intelligence Index, Speed & Effort Multipliers',
      sourceType: 'independent',
      publishedAt: '2026-08-27',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-gpt56-terra': {
      id: 'aa-gpt56-terra',
      publisher: 'Artificial Analysis',
      title: 'GPT-5.6 Terra Throughput & Reasoning Performance Analysis',
      sourceType: 'independent',
      publishedAt: '2026-08-27',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-gpt56-luna': {
      id: 'aa-gpt56-luna',
      publisher: 'Artificial Analysis',
      title: 'GPT-5.6 Luna Efficiency & Retrieval Benchmark Profiling',
      sourceType: 'independent',
      publishedAt: '2026-08-27',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'deepseek-v4-flash-0731-release': {
      id: 'deepseek-v4-flash-0731-release',
      publisher: 'DeepSeek AI',
      title: 'DeepSeek-V4-Flash-0731 Architecture & Evaluation Release',
      sourceType: 'official',
      publishedAt: '2026-07-31',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'deepseek-v4-vision-exp-release': {
      id: 'deepseek-v4-vision-exp-release',
      publisher: 'DeepSeek AI',
      title: 'DeepSeek-V4-Flash-Vision-Exp Preview Technical Report',
      sourceType: 'official',
      publishedAt: '2026-08-21',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-deepseek-v4-0731': {
      id: 'aa-deepseek-v4-0731',
      publisher: 'Artificial Analysis',
      title: 'DeepSeek-V4-Flash-0731 Intelligence & Throughput Audit',
      sourceType: 'independent',
      publishedAt: '2026-08-05',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-deepseek-v4-vision-exp': {
      id: 'aa-deepseek-v4-vision-exp',
      publisher: 'Artificial Analysis',
      title: 'DeepSeek-V4-Flash-Vision-Exp Multimodal Intelligence Assessment',
      sourceType: 'independent',
      publishedAt: '2026-08-24',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'deepswe-leaderboard-20260902': {
      id: 'deepswe-leaderboard-20260902',
      publisher: 'DataCurve / DeepSWE Consortium',
      title: 'DeepSWE 1.1 Independent Agentic Coding Leaderboard Snapshot',
      sourceType: 'independent',
      publishedAt: '2026-09-02',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'xai-grok46-announcement': {
      id: 'xai-grok46-announcement',
      publisher: 'xAI',
      title: 'Grok 4.6 Official Announcement & Frontier Benchmark Suite',
      sourceType: 'official',
      publishedAt: '2026-08-18',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-grok46-eval': {
      id: 'aa-grok46-eval',
      publisher: 'Artificial Analysis',
      title: 'Grok 4.6 Independent Intelligence Index & TB2.1 Evaluation',
      sourceType: 'independent',
      publishedAt: '2026-08-22',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'cursorbench-live-20260902': {
      id: 'cursorbench-live-20260902',
      publisher: 'Cursor / Anysphere',
      title: 'CursorBench 3.2 Live Agentic Coding Benchmark Run',
      sourceType: 'independent',
      publishedAt: '2026-09-02',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'zai-glm53-modelcard': {
      id: 'zai-glm53-modelcard',
      publisher: 'Z.ai / Zhipu AI',
      title: 'GLM-5.3 Frontier Model Card & Technical Report',
      sourceType: 'official',
      publishedAt: '2026-08-20',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'zai-glm53-flash-modelcard': {
      id: 'zai-glm53-flash-modelcard',
      publisher: 'Z.ai / Zhipu AI',
      title: 'GLM-5.3-Flash Architecture & Multimodal Evaluation Specifications',
      sourceType: 'official',
      publishedAt: '2026-08-26',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-glm53': {
      id: 'aa-glm53',
      publisher: 'Artificial Analysis',
      title: 'GLM-5.3 Independent Intelligence Index & Efficiency Audit',
      sourceType: 'independent',
      publishedAt: '2026-08-25',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-glm53-flash': {
      id: 'aa-glm53-flash',
      publisher: 'Artificial Analysis',
      title: 'GLM-5.3-Flash Tokenomics, Decode Speed & Intelligence Profile',
      sourceType: 'independent',
      publishedAt: '2026-08-28',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'moonshot-kimi-k3-techblog': {
      id: 'moonshot-kimi-k3-techblog',
      publisher: 'Moonshot AI',
      title: 'Kimi K3 2.8T MoE Architecture, Long-Horizon Search & Coding Benchmarks',
      sourceType: 'official',
      publishedAt: '2026-08-15',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-kimi-k3': {
      id: 'aa-kimi-k3',
      publisher: 'Artificial Analysis',
      title: 'Kimi K3 Independent Intelligence Index & Latency Audit',
      sourceType: 'independent',
      publishedAt: '2026-08-22',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'tencent-hy4-modelcard': {
      id: 'tencent-hy4-modelcard',
      publisher: 'Tencent Hunyuan Team',
      title: 'Hunyuan Hy4 Preview Model Card & Internal Blind Engineering Eval',
      sourceType: 'vendor-reported',
      publishedAt: '2026-08-29',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'tencent-hy3-modelcard': {
      id: 'tencent-hy3-modelcard',
      publisher: 'Tencent Hunyuan Team',
      title: 'Tencent Hunyuan Hy3 Technical Specifications & Baseline Comparison',
      sourceType: 'vendor-reported',
      publishedAt: '2026-05-14',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-hy3': {
      id: 'aa-hy3',
      publisher: 'Artificial Analysis',
      title: 'Tencent Hy3 Throughput & Intelligence Benchmark Run',
      sourceType: 'independent',
      publishedAt: '2026-06-10',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'qwen-qwen38-max-report': {
      id: 'qwen-qwen38-max-report',
      publisher: 'Alibaba Cloud Qwen Team',
      title: 'Qwen3.8 Max Enterprise Intelligence & Coding Benchmark Suite',
      sourceType: 'official',
      publishedAt: '2026-08-10',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'qwen-qwen38-flashnext-eval': {
      id: 'qwen-qwen38-flashnext-eval',
      publisher: 'Alibaba Cloud Qwen Team',
      title: 'Qwen3.8-Flash-Next Open-Weights Technical Evaluation Report',
      sourceType: 'official',
      publishedAt: '2026-08-24',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-qwen38-max': {
      id: 'aa-qwen38-max',
      publisher: 'Artificial Analysis',
      title: 'Qwen3.8 Max Production Service Intelligence & Latency Profiling',
      sourceType: 'independent',
      publishedAt: '2026-08-16',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-qwen38-flashnext': {
      id: 'aa-qwen38-flashnext',
      publisher: 'Artificial Analysis',
      title: 'Qwen3.8-Flash-Next Open-Weights Independent Intelligence Audit',
      sourceType: 'independent',
      publishedAt: '2026-08-27',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'minimax-m3-modelcard': {
      id: 'minimax-m3-modelcard',
      publisher: 'MiniMax AI',
      title: 'MiniMax M3 Multimodal Computer Use & Software Engineering Report',
      sourceType: 'official',
      publishedAt: '2026-08-12',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-minimax-m3': {
      id: 'aa-minimax-m3',
      publisher: 'Artificial Analysis',
      title: 'MiniMax M3 Independent Intelligence, Computer Use & Throughput Eval',
      sourceType: 'independent',
      publishedAt: '2026-08-19',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'meta-muse-spark13-eval': {
      id: 'meta-muse-spark13-eval',
      publisher: 'Meta AI',
      title: 'Muse Spark 1.3 Architecture, Reasoning & Multimodal Report',
      sourceType: 'official',
      publishedAt: '2026-08-30',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'aa-muse-spark13': {
      id: 'aa-muse-spark13',
      publisher: 'Artificial Analysis',
      title: 'Muse Spark 1.3 (XHigh & Max) Intelligence Index, Latency & Banking Audit',
      sourceType: 'independent',
      publishedAt: '2026-09-02',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'opencode-contributor-catalog': {
      id: 'opencode-contributor-catalog',
      publisher: 'OpenCode Operations Team',
      title: 'OpenCode Platform Catalog: Observed SKUs & Contributor Endpoints',
      sourceType: 'community',
      publishedAt: '2026-09-01',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'anthropic-claude-fable-51': {
      id: 'anthropic-claude-fable-51',
      publisher: 'Anthropic',
      title: 'Claude Fable 5.1 System Card: Reasoning & Frontier Agentic Coding',
      sourceType: 'official',
      publishedAt: '2026-08-15',
      retrievedAt: '2026-09-03',
      sourceUrl: null
    },
    'openai-gpt6-astra-launch': {
      id: 'openai-gpt6-astra-launch',
      publisher: 'OpenAI',
      title: 'Introducing GPT-6 Astra: Frontier Reasoning Flagship',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://openai.com/index/gpt-6-astra/'
    },
    'openai-gpt6-astra-api': {
      id: 'openai-gpt6-astra-api',
      publisher: 'OpenAI Developers',
      title: 'OpenAI API Model Card: GPT-6 Astra',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-6-astra'
    },
    'openai-gpt6-astra-system-card': {
      id: 'openai-gpt6-astra-system-card',
      publisher: 'OpenAI Safety',
      title: 'GPT-6 Astra System Card & Safety Overview',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://deploymentsafety.openai.com/gpt-6-astra/vision'
    },
    'openai-chatgpt-pro-pricing': {
      id: 'openai-chatgpt-pro-pricing',
      publisher: 'OpenAI',
      title: 'ChatGPT Pro Plan Specifications & Model Access',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://openai.com/chatgpt/pricing/'
    },
    'openai-business-plans': {
      id: 'openai-business-plans',
      publisher: 'OpenAI',
      title: 'ChatGPT Business & Enterprise Plan Limits',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://openai.com/business/'
    },
    'openai-rate-limits-tier': {
      id: 'openai-rate-limits-tier',
      publisher: 'OpenAI API',
      title: 'Usage Tiers & Rate Limits for GPT-6 Models',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://platform.openai.com/docs/guides/rate-limits'
    },
    'deep-swe-v11-20260903': {
      id: 'deep-swe-v11-20260903',
      publisher: 'DataCurve',
      title: 'DeepSWE Benchmark v1.1 Live Leaderboard - Astra Matrix',
      sourceType: 'independent',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://deepswe.datacurve.ai/'
    },
    'snorkel-terminal-bench-science-01': {
      id: 'snorkel-terminal-bench-science-01',
      publisher: 'Snorkel AI',
      title: 'Terminal-Bench Science 0.1 Leaderboard',
      sourceType: 'independent',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://snorkel.ai/leaderboard/terminal-bench-science/'
    },
    'terminal-bench-40-official': {
      id: 'terminal-bench-40-official',
      publisher: 'Terminal-Bench Team',
      title: 'Terminal-Bench 4.0 Suite & Results',
      sourceType: 'independent',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://terminalbench.org/4.0/'
    },
    'arcprize-gpt6-astra-20260902': {
      id: 'arcprize-gpt6-astra-20260902',
      publisher: 'ARC Prize Foundation',
      title: 'GPT-6 Astra Evaluation on ARC-AGI-3',
      sourceType: 'independent',
      publishedAt: '2026-09-02',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://arcprize.org/blog/gpt-6-astra-results'
    },
    'aa-gpt6-astra-v411': {
      id: 'aa-gpt6-astra-v411',
      publisher: 'Artificial Analysis',
      title: 'GPT-6 Astra Intelligence Index v4.1.1 Evaluation by Effort',
      sourceType: 'independent',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://artificialanalysis.ai/models/releases/gpt-6-astra'
    },
    'aa-index-v42-20260904': {
      id: 'aa-index-v42-20260904',
      publisher: 'Artificial Analysis',
      title: 'Artificial Analysis Intelligence Index v4.2 Release',
      sourceType: 'independent',
      publishedAt: '2026-09-04',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-2'
    },
    'aa-gdp-pdf-leaderboard': {
      id: 'aa-gdp-pdf-leaderboard',
      publisher: 'Artificial Analysis',
      title: 'Surge GDP.pdf Multimodal Evaluation Leaderboard',
      sourceType: 'independent',
      publishedAt: '2026-09-04',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://artificialanalysis.ai/benchmarks/gdp-pdf'
    },
    'cursor-pricing-astra-2026': {
      id: 'cursor-pricing-astra-2026',
      publisher: 'Cursor IDE',
      title: 'Cursor Models & Other Models Pool Updates',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://cursor.com/pricing'
    },
    'opencode-go-catalog-2026': {
      id: 'opencode-go-catalog-2026',
      publisher: 'OpenCode',
      title: 'OpenCode Go Catalog & Model Access',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://opencode.ai/go'
    },
    'openai-responses-api-docs': {
      id: 'openai-responses-api-docs',
      publisher: 'OpenAI Developers',
      title: 'Responses API: Async Tool Calling & Mid-Turn Steering',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://platform.openai.com/docs/api-reference/responses'
    },
    'openai-preparedness-framework-v3': {
      id: 'openai-preparedness-framework-v3',
      publisher: 'OpenAI Preparedness',
      title: 'OpenAI Preparedness Framework Frontier Tracking',
      sourceType: 'official',
      publishedAt: '2026-09-03',
      retrievedAt: '2026-09-04',
      sourceUrl: 'https://openai.com/safety/preparedness-framework/'
    }
  };

  // ==========================================
  // 3. DOSSIÊS TÉCNICOS DETALHADOS (Seções 5 a 9, 20 a 110)
  // ==========================================
  var MODEL_DOSSIERS_DATA = {
    // ------------------------------------------------------------------------
    // 0. GPT-6 ASTRA (Prompt 10 / Lançamento 03/09/2026)
    // ------------------------------------------------------------------------
    'gpt-6-astra': {
      modelId: 'gpt-6-astra',
      identity: {
        canonicalName: 'GPT-6 Astra',
        family: 'openai-gpt',
        provider: 'openai',
        providerName: 'OpenAI',
        releaseDate: '2026-09-03',
        status: 'production',
        openWeights: false,
        license: 'Proprietary OpenAI',
        aliases: ['GPT 6 Astra', 'GPT-6 Astra', 'Astra', 'GPT6 Astra', 'gpt-6-astra', 'GPT-6 Pro (product alias)']
      },
      architecture: {
        architectureType: 'MoE Proprietário Frontier Reasoning com CoT Adaptativo',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1050000,
        maxOutputTokens: 128000,
        attentionType: 'Multi-Head Latent Sparse Attention com CoT Adaptativo'
      },
      context: {
        nominalTokens: 1050000,
        effectiveEvaluation: 'Retenção quase perfeita em contexto longo verdadeiro: 100% no MRCR v2 (256k–512k) e 96.3% (512k–1M). Cliff de precificação em >272k tokens.',
        retrievalAccuracyScore: 98.2,
        longContextThreshold: 272000
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 10.00,
        outputPerMillion: 50.00,
        cacheReadPerMillion: 1.00,
        cacheWritePerMillion: 12.50,
        currency: 'USD',
        longContextMultiplier: { input: 2.0, cacheRead: 2.0, cacheWrite: 2.0, output: 1.5 },
        batchDiscount: 50,
        fastMultiplier: 2.0
      },
      availability: {
        surfaces: ['api', 'chatgpt:gpt-6-pro', 'cursor', 'codex'],
        freeTierAvailable: false,
        proSubscriptionId: 'openai-chatgpt-pro-5x',
        note: 'ChatGPT Plus NÃO inclui GPT-6 Pro Chat (disponível apenas Work/Codex com limite). Acesso via Pro ($100 / $200), Business e API direta.'
      },
      reasoningEffortMatrix: {
        efforts: ['low', 'medium', 'high', 'xhigh', 'max'],
        paretoAnalysis: {
          sweetSpot: ['high', 'xhigh'],
          notes: 'Os níveis High (melhor equilíbrio a $0.96/task) e XHigh (74.1% DeepSWE a $1.20/task) formam a fronteira de Pareto ideal. Max traz ganhos em TB Science e ARC-AGI-3, mas com salto de custo.'
        },
        descriptions: {
          low: 'Esforço rápido e econômico ($0.46/task no AA), indicado para tarefas simples de código e triagem.',
          medium: 'Excelente custo-benefício em tarefas de raciocínio intermediário e automação padrão.',
          high: 'Sweet spot operacional para coding e terminal autônomo (57.9% TB4, 99.95% ARC-AGI-3 Provider Adapter).',
          xhigh: 'Líder absoluto no DeepSWE 1.1 independente (74.1% pass@1 com metade dos tokens de Sol).',
          max: 'Líder em TB Science (65.4%) e ARC-AGI-3 Standard (62.71%). Recomendado para problemas extremos onde custo não é restrição.'
        },
        data: [
          { effort: 'Low', passAt1: 67.0, terminalBench4: 49.3, terminalBenchScience: 55.4, costPerTaskUsd: 0.46, avgReasoningTokens: 12000 },
          { effort: 'Medium', passAt1: 72.8, terminalBench4: 55.2, terminalBenchScience: 57.4, costPerTaskUsd: 0.75, avgReasoningTokens: 18500 },
          { effort: 'High', passAt1: 73.2, terminalBench4: 57.9, terminalBenchScience: 62.0, costPerTaskUsd: 0.96, avgReasoningTokens: 27000 },
          { effort: 'XHigh', passAt1: 74.1, terminalBench4: 56.4, terminalBenchScience: 60.9, costPerTaskUsd: 1.20, avgReasoningTokens: 38000 },
          { effort: 'Max', passAt1: 73.2, terminalBench4: 57.1, terminalBenchScience: 65.4, costPerTaskUsd: 1.67, avgReasoningTokens: 64000 },
          { effort: 'Non-Reasoning', passAt1: 55.0, terminalBench4: null, terminalBenchScience: null, costPerTaskUsd: 0.93, avgReasoningTokens: 0, evaluationOnly: true }
        ],
        low: { effort: 'low', aaIndex: 57, costPerTaskUsd: 0.46, deepSwePass1: 67.0, terminalBench40: 49.3, terminalBenchScience01: 55.4, notes: 'Esforço rápido e econômico ($0.46/task no AA).' },
        medium: { effort: 'medium', aaIndex: 59, costPerTaskUsd: 0.75, deepSwePass1: 72.8, terminalBench40: 55.2, terminalBenchScience01: 57.4, notes: 'Excelente custo-benefício em tarefas de raciocínio intermediário.' },
        high: { effort: 'high', aaIndex: 60, costPerTaskUsd: 0.96, deepSwePass1: 73.2, terminalBench40: 57.9, terminalBenchScience01: 62.0, arcAgi3ProviderAdapter: 99.95, notes: 'Sweet spot para coding e terminal autônomo (57.88% TB4 e 99.95% ARC-AGI-3 Provider Adapter).' },
        xhigh: { effort: 'xhigh', aaIndex: 61, costPerTaskUsd: 1.20, deepSwePass1: 74.1, terminalBench40: 56.4, terminalBenchScience01: 60.9, notes: 'Líder em DeepSWE 1.1 (74.1% pass@1 com metade dos tokens de Sol) e AA Index 61.' },
        max: { effort: 'max', aaIndex: 61, costPerTaskUsd: 1.67, deepSwePass1: 73.2, terminalBench40: 57.1, terminalBenchScience01: 65.4, arcAgi3Standard: 62.71, notes: 'Líder em TB Science (65.4%) e ARC-AGI-3 Standard (62.71%). Retornos decrescentes em DeepSWE (+89.7% custo).' },
        nonReasoning: { effort: 'none', aaIndex: 55, costPerTaskUsd: 0.93, evaluationOnly: true, notes: 'Run de avaliação exclusivo da Artificial Analysis; não disponível como esforço público na API.' }
      },
      artificialAnalysis: {
        verifiedAt: '2026-09-04',
        efforts: {
          low: { aaIndex: 57, costPerTaskUsd: 0.46, outputSpeedTokS: null, ttftSeconds: null },
          medium: { aaIndex: 59, costPerTaskUsd: 0.75, outputSpeedTokS: null, ttftSeconds: null },
          high: { aaIndex: 60, costPerTaskUsd: 0.96, outputSpeedTokS: null, ttftSeconds: null },
          xhigh: { aaIndex: 61, costPerTaskUsd: 1.20, outputSpeedTokS: null, ttftSeconds: null },
          max: { aaIndex: 61, costPerTaskUsd: 1.67, outputSpeedTokS: null, ttftSeconds: null },
          nonReasoning: { aaIndex: 55, costPerTaskUsd: 0.93, evaluationOnly: true, outputSpeedTokS: null, ttftSeconds: null }
        },
        v42Insights: {
          rank: 2,
          deltaVsSolEloBriefcase: 85,
          gdpPdfPassRate: 33.2,
          note: 'Confirmado #2 geral no índice v4.2; lidera o GDP.pdf com 33.2% e domina a fronteira de eficiência de output-tokens.'
        },
        interpretation: 'Frontier absoluto em raciocínio, coding e terminal, com liderança em tarefas densas e velocidade/throughput independente não divulgada (N/D).'
      },
      safetyAndPreparedness: {
        cybersecurity: 'CRITICAL (Primeiro modelo frontier sob Preparedness Framework; 100% no ExploitBench)',
        cbrn: 'HIGH (Biológico / Químico)',
        aiSelfImprovement: 'BELOW HIGH',
        indirectPromptInjection: 99.79,
        instructionHierarchy: 99.99,
        cotMonitorabilityCaveat: 'Regressão de monitorabilidade de cadeia de pensamento (CoT) frente a avaliações adversariais em comparação aos modelos anteriores.'
      },
      developerCapabilities: {
        asyncToolCalling: true,
        midTurnSteering: true,
        responsesApiTools: ['web_search', 'file_search', 'image_generation_tool', 'code_interpreter', 'hosted_shell', 'apply_patch', 'skills', 'computer_use', 'mcp', 'tool_search']
      },
      benchmarkSnapshots: [
        // Coding & Terminal (Launch & Independent)
        { benchmarkId: 'terminal-bench-4-0', benchmarkVersion: '4.0', score: 57.9, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'OpenAI Shell Environment', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-03', notes: '57.88% oficial no Terminal-Bench 4.0; novo recorde da categoria.' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 74.1, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'OpenAI SWE Runner', effort: 'xhigh', toolsEnabled: true, snapshotDate: '2026-09-03', notes: '74.1% pass@1 oficial no DeepSWE 1.1 sob esforço XHigh.' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 74.1, unit: 'percent', sourceType: 'independent', sourceId: 'deep-swe-v11-20260903', harness: 'mini-SWE-agent', effort: 'xhigh', toolsEnabled: true, snapshotDate: '2026-09-03', confidenceInterval: 2.9, costPerTaskUsd: 6.52, outputTokensPerTask: 30000, agentStepsPerTask: 55, notes: 'Avaliação independente DataCurve DeepSWE v1.1: 74.1% [71.2-77.0], $6.52/task, 30k tokens.' },
        { benchmarkId: 'frontiercode-1-1-extended', benchmarkVersion: '1.1', score: 64.5, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'FrontierCode Extended Runner', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'frontiercode-1-1-main', benchmarkVersion: '1.1', score: 53.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'FrontierCode Main Runner', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        // Terminal Science (Oficial e Independente Snorkel)
        { benchmarkId: 'terminal-bench-science-0-1', benchmarkVersion: '0.1', score: 64.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'Science Terminal Runner', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'terminal-bench-science-0-1', benchmarkVersion: '0.1', score: 65.4, unit: 'percent', sourceType: 'independent', sourceId: 'snorkel-terminal-bench-science-01', harness: 'Snorkel AI Testbed', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-03', confidenceInterval: 2.5, notes: 'Avaliação independente Snorkel AI (70 tarefas em 5 domínios): 65.4% ±2.5 sob Max.' },
        // Matemática & Raciocínio Acadêmico
        { benchmarkId: 'frontiermath-t4-v2', benchmarkVersion: '2.0', score: 97.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'FrontierMath Tier 4', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'gpqa-diamond', benchmarkVersion: '1.0', score: 96.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'Standard GPQA', effort: null, toolsEnabled: false, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'hle-with-tools', benchmarkVersion: '1.0', score: 57.2, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'HLE Tools Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        // Long Context & Retenção
        { benchmarkId: 'mrcr-v2-256k-512k', benchmarkVersion: '2.0', score: 100.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'MRCR v2 Suite', effort: null, toolsEnabled: false, snapshotDate: '2026-09-03', notes: '100% de acurácia perfeita na janela 256k-512k.' },
        { benchmarkId: 'mrcr-v2-512k-1m', benchmarkVersion: '2.0', score: 96.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'MRCR v2 Suite', effort: null, toolsEnabled: false, snapshotDate: '2026-09-03', notes: '96.3% de retenção factual na janela máxima 512k-1M.' },
        // Autonomia, Ferramentas & Computer Use
        { benchmarkId: 'agents-last-exam', benchmarkVersion: '1.0', score: 59.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'ALE Runner', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'osworld-2-offline-partial', benchmarkVersion: '2.0', score: 72.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'OSWorld 2 Offline Partial Runner', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'screenspot-pro', benchmarkVersion: '1.0', score: 92.7, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'ScreenSpot Pro GUI Grounding', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Localização precisa de elementos de UI.' },
        { benchmarkId: 'automationbench', benchmarkVersion: '1.0', score: 41.4, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'Automation Platform', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'benchcad', benchmarkVersion: '1.0', score: 95.9, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'BenchCAD Harness', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Modelagem 3D e parametrização CAD.' },
        { benchmarkId: 'browsecomp', benchmarkVersion: '1.0', score: 91.5, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'BrowseComp Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Navegação web e síntese competitiva.' },
        // Ciências Biomédicas & Saúde
        { benchmarkId: 'genebench-pro', benchmarkVersion: '1.0', score: 37.8, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'Genomics Science Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'medchembench', benchmarkVersion: '1.0', score: 49.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'Medicinal Chemistry Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'lifescibench', benchmarkVersion: '1.0', score: 60.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'Life Science Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Launch table maximum-at-any-effort.' },
        { benchmarkId: 'healthbench-professional', benchmarkVersion: '1.0', score: 63.4, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'Health Professional Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Raciocínio clínico profissional ajustado por tamanho.' },
        // Cibersegurança & Preparedness
        { benchmarkId: 'exploitbench', benchmarkVersion: '1.0', score: 100.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'ExploitBench Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: '100% de resolução de exploits; fundamenta classificação Critical.' },
        { benchmarkId: 'exploitgym', benchmarkVersion: '1.0', score: 42.4, unit: 'tasks', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'ExploitGym CTF Runner', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Desafios autônomos de exploração cibernética.' },
        { benchmarkId: 'sre-bench', benchmarkVersion: '1.0', score: 88.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'SRE Incident Remediation', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Resolução autônoma de incidentes de infraestrutura.' },
        { benchmarkId: 'sec-bench-pro', benchmarkVersion: '1.0', score: 85.4, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt6-astra-launch', harness: 'SecBench Pro Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-03', notes: 'Análise de postura e conformidade de segurança.' },
        // Metrologia Estrita ARC-AGI-3 (Standard vs Provider Adapter)
        { benchmarkId: 'arc-agi-3-standard', benchmarkVersion: '3.0', score: 62.71, unit: 'percent', sourceType: 'independent', sourceId: 'arcprize-gpt6-astra-20260902', harness: 'Standard ARC Prize evaluation', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', costPerTaskUsd: 26000, notes: 'Metrologia estrita sem adapter proprietário. Custo de computação ~$26.000.' },
        { benchmarkId: 'arc-agi-3-provider-adapter', benchmarkVersion: '3.0', score: 99.95, unit: 'percent', sourceType: 'independent', sourceId: 'arcprize-gpt6-astra-20260902', harness: 'Provider Adapter (OpenAI)', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', costPerTaskUsd: 18800, notes: 'Exige label Provider Adapter explicitamente. Nunca exibir 99.9% sem o sufixo Provider Adapter. Custo ~$18.800.' },
        // Documentos Massivos (Surge GDP.pdf)
        { benchmarkId: 'gdp-pdf', benchmarkVersion: '1.0', score: 33.2, unit: 'percent', sourceType: 'independent', sourceId: 'aa-index-v42-20260904', harness: 'Surge GDP.pdf Suite', effort: null, toolsEnabled: true, snapshotDate: '2026-09-04', notes: 'Líder geral no teste de 100 PDFs e 4.592 páginas com 33.2% All-pass Rate.' }
      ],
      performanceProfile: {
        scientificReasoning: 'elite',
        softwareEngineering: 'elite',
        terminal: 'elite',
        longContext: 'elite',
        computerUse: 'elite',
        throughput: 'unverified',
        costEfficiency: 'balanced'
      },
      strengths: [
        'Líder global em autonomia de terminal: 57.88% no Terminal-Bench 4.0 e 65.4% no TB Science',
        'Alta eficiência de tokens de saída no DeepSWE (74.1% pass@1 consumindo metade dos tokens de Sol)',
        'Retenção factual perfeita no MRCR v2 (100% em 256k-512k e 96.3% em 512k-1M)',
        'Capacidade de Cibersegurança de nível crítico (100% no ExploitBench e 88% no SRE-bench)',
        'Suporte nativo a Async Tool Calling e Mid-Turn Steering na Responses API',
        'Líder em compreensão documental massiva com 33.2% no Surge GDP.pdf'
      ],
      weaknesses: [
        'Throughput independente e velocidade de geração ainda não divulgados (N/D)',
        'Tarifa de saída elevada ($50/M) com cliff adicional de 2x/1.5x em contexto >272k',
        'Esforço Max apresenta retornos decrescentes (+89.7% de custo no DeepSWE para ganho nulo ou negativo)',
        'GPT-6 Pro Chat não disponível no plano ChatGPT Plus',
        'Regressão de monitorabilidade de CoT em avaliações adversariais em relação ao Sol'
      ],
      bestFor: [
        'Engenharia de software de ponta, monorepos densos e agentes de terminal',
        'Investigação científica autônoma e bioinformática',
        'Operações de ciberdefesa autorizada e mitigação de incidentes SRE',
        'Interpretação e extração sobre bibliotecas massivas de documentação (>272k)'
      ],
      avoidFor: [
        'Aplicações sensíveis a custo estrito por requisição onde $50/M em output é proibitivo',
        'Tarefas mecânicas simples onde GPT-5.6 Terra ou Luna oferecem custo até 50x menor',
        'Default cego no esforço Max (preferir High para coding e XHigh para SWE)'
      ],
      sourceIds: [
        'openai-gpt6-astra-launch',
        'openai-gpt6-astra-api',
        'openai-gpt6-astra-system-card',
        'deep-swe-v11-20260903',
        'snorkel-terminal-bench-science-01',
        'arcprize-gpt6-astra-20260902',
        'aa-index-v42-20260904'
      ],
      verifiedAt: '2026-09-04'
    },

    // ------------------------------------------------------------------------
    // 1. GEMINI 3.8 FLASH (Seções 20 a 28)
    // ------------------------------------------------------------------------
    'gemini-3-8-flash': {
      modelId: 'gemini-3-8-flash',
      identity: {
        canonicalName: 'Gemini 3.8 Flash',
        family: 'google-gemini',
        provider: 'google',
        providerName: 'Google DeepMind',
        releaseDate: '2026-09-01',
        status: 'production',
        openWeights: false,
        license: 'Proprietary Google Cloud'
      },
      architecture: {
        architectureType: 'MoE Multimodal Nativo Frontier',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Linear-Sparse Hybrid Flash Attention'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Alta retenção e agilidade em janelas longas com tool calls estendidas',
        retrievalAccuracyScore: 92.4
      },
      modalities: {
        input: ['text', 'image', 'audio', 'video'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.15,
        outputPerMillion: 0.60,
        cacheReadPerMillion: 0.0375,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'gemini-cli', 'cursor', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: 'google-ai-pro'
      },
      artificialAnalysis: {
        verifiedAt: '2026-09-02',
        efforts: {
          high: { aaIndex: 59, outputSpeedTokS: 304.6, costPerTaskUsd: 0.58, totalOutputTokens: 120000000, ttftSeconds: 13.39 },
          medium: { aaIndex: 57, outputSpeedTokS: 312.0, costPerTaskUsd: 0.41, totalOutputTokens: 53000000, ttftSeconds: 6.44 },
          low: { aaIndex: 52, outputSpeedTokS: 313.5, costPerTaskUsd: 0.24, totalOutputTokens: 19000000, ttftSeconds: 0.70 }
        },
        interpretation: 'Produz ~30% mais output tokens e custo por tarefa ~40% maior no modo High vs Gemini 3.7 Flash High, atingindo inteligência de fronteira por preço unitário extremamente baixo.'
      },
      benchmarkSnapshots: [
        // Benchmarks Oficiais Google (Seção 24)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 90.8, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Google Enterprise Agent Platform', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Benchmark oficial Google Enterprise' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 61.6, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Google Agent Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Avaliação de engenharia corporativa' },
        { benchmarkId: 'swe-atlas', benchmarkVersion: '1.0', score: 51.9, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Google Agent Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Refatoração complexa SWE-Atlas' },
        { benchmarkId: 'tau3-banking', benchmarkVersion: '3.0', score: 38.1, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Google Enterprise Banking Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Avaliação estrita oficial Google' },
        { benchmarkId: 'charxiv', benchmarkVersion: '1.0', score: 86.2, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Google Multimodal Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Raciocínio visual complexo' },
        { benchmarkId: 'gdp-pdf', benchmarkVersion: '1.0', score: 35.0, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Google Document Intelligence', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Compreensão tabular densa em PDF' },
        { benchmarkId: 'humanitys-last-exam', benchmarkVersion: '1.0', score: 45.4, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Standard HLE', effort: 'high', toolsEnabled: false, snapshotDate: '2026-09-02', notes: 'HLE sem ferramentas' },
        { benchmarkId: 'hle-verified', benchmarkVersion: '1.0', score: 54.9, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Verified HLE Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'HLE com validação de ferramentas' },
        { benchmarkId: 'finance-agent-v2', benchmarkVersion: '2.0', score: 61.4, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Google Finance Agent Eval', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Modelagem financeira e planilhas' },
        { benchmarkId: 'harvey-legal-agent', benchmarkVersion: '1.0', score: 10.0, unit: 'percent', sourceType: 'official', sourceId: 'google-gemini38-enterprise-eval', harness: 'Harvey Legal Platform', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Tarefas jurídicas de alta complexidade' },
        // Benchmarks Independentes (Seção 26)
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 74.0, unit: 'percent', sourceType: 'independent', sourceId: 'deepswe-leaderboard-20260902', harness: 'mini-SWE-agent', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', confidenceInterval: 1.0, costPerTaskUsd: 2.36, outputTokensPerTask: 143000, agentStepsPerTask: 166, notes: 'Independent leaderboard snapshot' },
        { benchmarkId: 'tau3-banking', benchmarkVersion: '3.0', score: 45.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-gemini38-flash', harness: 'Artificial Analysis Agent Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Medição independente AA (diferente harness da Google)' },
        // CursorBench Independente (Seção 27)
        { benchmarkId: 'cursorbench-3-2', benchmarkVersion: '3.2', score: 69.2, unit: 'percent', sourceType: 'independent', sourceId: 'cursorbench-live-20260902', harness: 'Cursor Agent Loop', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', costPerTaskUsd: 2.38, outputTokensPerTask: 81524, agentStepsPerTask: 161, pool: 'other-models', notes: 'CursorBench Live High em pool other-models' },
        { benchmarkId: 'cursorbench-3-2', benchmarkVersion: '3.2', score: 67.0, unit: 'percent', sourceType: 'independent', sourceId: 'cursorbench-live-20260902', harness: 'Cursor Agent Loop', effort: 'medium', toolsEnabled: true, snapshotDate: '2026-09-02', costPerTaskUsd: 1.93, outputTokensPerTask: 61603, agentStepsPerTask: 136, pool: 'other-models', notes: 'CursorBench Live Medium em pool other-models' },
        // Correção de Provenance: GPQA Diamond e ARC-AGI2 ficam como null até nova fonte auditada (Seção 25)
        { benchmarkId: 'gpqa-diamond', benchmarkVersion: '1.0', score: null, unit: 'percent', sourceType: 'official', sourceId: 'google-deepmind-gemini38', harness: null, effort: null, toolsEnabled: null, snapshotDate: '2026-09-03', notes: 'Marcado como null por falta de provenance auditada no snapshot atual.' },
        { benchmarkId: 'arc-agi-2', benchmarkVersion: '2.0', score: null, unit: 'percent', sourceType: 'official', sourceId: 'google-deepmind-gemini38', harness: null, effort: null, toolsEnabled: null, snapshotDate: '2026-09-03', notes: 'Marcado como null por falta de provenance auditada no snapshot atual.' }
      ],
      performanceProfile: {
        softwareEngineering: 'elite',
        terminal: 'elite',
        agenticPersistence: 'elite',
        multimodal: 'elite',
        throughput: 'exceptional',
        costEfficiency: 'excellent',
        verbosity: 'poor',
        reasoningLatencyHigh: 'poor',
        securitySpecialization: 'unknown'
      },
      strengths: [
        'Altíssimo throughput de geração (~305 a 313 tok/s)',
        'Excelente persistência agêntica em loops de programação longos',
        'Liderança no DeepSWE 1.1 independente (74%)',
        'Capacidades multimodais nativas sólidas (86.2% no CharXiv)',
        'Janela de contexto nativa de 1M com baixo custo por token'
      ],
      weaknesses: [
        'Modo High extremamente verboso, gerando volume excessivo de tokens',
        'Alto número de agent steps em tarefas iterativas (média 166 passos)',
        'TTFT cresce consideravelmente com thinking ativado no High (13.39s)',
        'Custo por tarefa sobe ~40% vs versão 3.7 quando em esforço máximo'
      ],
      bestFor: [
        'Sessões interativas de desenvolvimento de software em IDE (Cursor/OpenCode)',
        'Tarefas multimodais complexas com diagramas, PDFs e imagens',
        'Pipelines de alto volume exigindo baixa latência de decode'
      ],
      avoidFor: [
        'Aplicações de latência ultra-crítica de primeiro token (TTFT) no modo High',
        'Tarefas financeiras/bancárias altamente burocráticas sem harness especializado'
      ],
      sourceIds: ['google-gemini38-enterprise-eval', 'google-deepmind-gemini38', 'aa-gemini38-flash', 'deepswe-leaderboard-20260902', 'cursorbench-live-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 2. GPT-5.6 SOL (Seções 29 a 38, 99)
    // ------------------------------------------------------------------------
    'gpt-5-6-sol': {
      modelId: 'gpt-5-6-sol',
      identity: {
        canonicalName: 'GPT-5.6 Sol',
        family: 'openai-gpt',
        provider: 'openai',
        providerName: 'OpenAI',
        releaseDate: '2026-08-25',
        status: 'production',
        openWeights: false,
        license: 'Proprietary OpenAI'
      },
      architecture: {
        architectureType: 'Frontier Dense/MoE Flagship Reasoning',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 131072,
        attentionType: 'Full Attention com Thinking CoT Nativo'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Elite em contexto longo: 91.5% no MRCR 256K–512K e 73.8% no MRCR 1M',
        retrievalAccuracyScore: 94.8
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 5.00,
        outputPerMillion: 15.00,
        cacheReadPerMillion: 1.25,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: false,
        proSubscriptionId: 'openai-chatgpt-pro'
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-27',
        efforts: {
          max: { aaIndex: 61, outputSpeedTokS: 74.0, costPerTaskUsd: 0.95, totalOutputTokens: 70000000, ttftSeconds: 8.5 },
          xhigh: { aaIndex: 59, outputSpeedTokS: 79.0, costPerTaskUsd: 0.63, totalOutputTokens: 55000000, ttftSeconds: 6.2 },
          high: { aaIndex: 57, outputSpeedTokS: 78.0, costPerTaskUsd: 0.43, totalOutputTokens: 42000000, ttftSeconds: 4.8 },
          medium: { aaIndex: 56, outputSpeedTokS: 72.0, costPerTaskUsd: 0.29, totalOutputTokens: 30000000, ttftSeconds: 3.1 },
          low: { aaIndex: 51, outputSpeedTokS: 73.0, costPerTaskUsd: 0.18, totalOutputTokens: 20000000, ttftSeconds: 1.9 },
          nonReasoning: { aaIndex: 42, outputSpeedTokS: 75.0, costPerTaskUsd: 0.18, totalOutputTokens: 18000000, ttftSeconds: 1.2 }
        },
        interpretation: 'Frontier absoluto em raciocínio, coding e computer use, com custo premium por token e velocidade de decode moderada (~74 tok/s).'
      },
      benchmarkSnapshots: [
        // Coding Oficial (Seção 30)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 88.8, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI Agent Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Configuração padrão Max. (Harness multi-agent Ultra atinge 91.9)' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 64.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI Agent Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'SWE-Bench Pro oficial' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 72.7, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI SWE Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'DeepSWE vendor harness' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 73.0, unit: 'percent', sourceType: 'independent', sourceId: 'deepswe-leaderboard-20260902', harness: 'mini-SWE-agent', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', confidenceInterval: 3.0, costPerTaskUsd: 6.46, outputTokensPerTask: 60000, agentStepsPerTask: 61, notes: 'DeepSWE independent snapshot' },
        // Science / Health (Seção 31)
        { benchmarkId: 'genebench-pro', benchmarkVersion: '1.0', score: 28.7, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI Science Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Genômica avançada' },
        { benchmarkId: 'lifescibench', benchmarkVersion: '1.0', score: 59.9, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI Science Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Ciências biológicas' },
        { benchmarkId: 'medchembench', benchmarkVersion: '1.0', score: 48.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI Science Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Química medicinal' },
        { benchmarkId: 'healthbench-pro', benchmarkVersion: '1.0', score: 60.5, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI Health Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Raciocínio clínico profissional' },
        // Self-Improvement / Research (Seção 32)
        { benchmarkId: 'internal-research-debug', benchmarkVersion: '1.0', score: 68.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI Internal Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Depuração de experimentos de IA' },
        { benchmarkId: 'kernelgen-1p', benchmarkVersion: '1.0', score: 61.1, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI KernelGen Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Geração de kernels GPU otimizados' },
        { benchmarkId: 'nanogpt', benchmarkVersion: '1.0', score: 9.69, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI NanoGPT Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Otimização de loop NanoGPT (Terra supera Sol neste teste)' },
        { benchmarkId: 'posttrainbench-lite', benchmarkVersion: '1.0', score: 50.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI PostTrain Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Pós-treinamento autônomo' },
        { benchmarkId: 'rsi-index', benchmarkVersion: '1.0', score: 57.9, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OpenAI RSI Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Recursive Self-Improvement Index' },
        // Multimodal (Seção 33)
        { benchmarkId: 'mmmu-pro-no-tools', benchmarkVersion: '1.0', score: 83.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'Standard Multimodal', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'MMMU-Pro sem ferramentas' },
        { benchmarkId: 'mmmu-pro-with-tools', benchmarkVersion: '1.0', score: 84.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'Tool-augmented Multimodal', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'MMMU-Pro com ferramentas' },
        { benchmarkId: 'gdp-pdf', benchmarkVersion: '1.0', score: 30.7, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'Document Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Interpretação de relatórios PDF' },
        // Academic Reasoning (Seção 34)
        { benchmarkId: 'gpqa-diamond', benchmarkVersion: '1.0', score: 94.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'Standard GPQA', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'GPQA Diamond' },
        { benchmarkId: 'frontiermath-t1-3-v2', benchmarkVersion: '2.0', score: 89.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'FrontierMath Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Matemática avançada Tiers 1-3' },
        { benchmarkId: 'frontiermath-t4-v2', benchmarkVersion: '2.0', score: 83.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'FrontierMath Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Matemática avançada Tier 4' },
        // Tool Use & Agent (Seção 35, 37)
        { benchmarkId: 'automationbench', benchmarkVersion: '1.0', score: 18.1, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'Automation Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Automação geral de processos' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 58.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'Toolathlon Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Uso complexo de ferramentas' },
        { benchmarkId: 'osworld-2', benchmarkVersion: '2.0', score: 62.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'OSWorld 2 Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Controle de sistema operacional' },
        // Long Context (Seção 36)
        { benchmarkId: 'mrcr-v2-256k-512k', benchmarkVersion: '2.0', score: 91.5, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'MRCR v2 Suite', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'Recuperação multi-round 256K-512K' },
        { benchmarkId: 'mrcr-v2-512k-1m', benchmarkVersion: '2.0', score: 73.8, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'MRCR v2 Suite', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'Recuperação multi-round 512K-1M' },
        { benchmarkId: 'graphwalks-bfs-256k', benchmarkVersion: '1.0', score: 90.7, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'GraphWalks Suite', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'Grafo 256K' },
        { benchmarkId: 'graphwalks-bfs-1m', benchmarkVersion: '1.0', score: 77.1, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-sol-eval', harness: 'GraphWalks Suite', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'Grafo 1M' }
      ],
      performanceProfile: {
        scientificReasoning: 'elite',
        softwareEngineering: 'elite',
        terminal: 'elite',
        longContext: 'elite',
        computerUse: 'elite',
        throughput: 'medium',
        costEfficiency: 'expensive'
      },
      strengths: [
        'Inteligência de ponta absoluta (AA 61 no Max)',
        'Liderança em ciência, genômica e química medicinal',
        'Excelente retenção em contexto longo verdadeiro (73.8% no MRCR 1M)',
        'Forte capacidade de computer use no OSWorld 2 (62.6%)',
        'Capacidade de geração de kernels GPU especializados (61.1% no KernelGen)'
      ],
      weaknesses: [
        'Custo elevado ($5/$15 por milhão e ~$6.46/task no DeepSWE)',
        'Velocidade moderada de decode (~74 tok/s no Max)',
        'Superado pelo irmão Terra em otimização NanoGPT e PostTrainBench Lite'
      ],
      bestFor: [
        'Pesquisa científica de fronteira e bioinformática',
        'Tarefas críticas de arquitetura e depuração complexa',
        'Agentes com necessidade de controle de sistema operacional e long context'
      ],
      avoidFor: [
        'Rotinas triviais de CRUD e classificação simples de texto',
        'Aplicações sensíveis a custo com alto volume contínuo de tokens'
      ],
      sourceIds: ['openai-gpt56-sol-eval', 'aa-gpt56-sol', 'deepswe-leaderboard-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 3. GPT-5.6 TERRA (Seções 29 a 39)
    // ------------------------------------------------------------------------
    'gpt-5-6-terra': {
      modelId: 'gpt-5-6-terra',
      identity: {
        canonicalName: 'GPT-5.6 Terra',
        family: 'openai-gpt',
        provider: 'openai',
        providerName: 'OpenAI',
        releaseDate: '2026-08-25',
        status: 'production',
        openWeights: false,
        license: 'Proprietary OpenAI'
      },
      architecture: {
        architectureType: 'Frontier Dense/MoE Workhorse Reasoning',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Full Attention otimizada para Throughput'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Muito forte em 1M: 89.6% no MRCR 512K e 72.5% no MRCR 1M',
        retrievalAccuracyScore: 92.1
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 2.50,
        outputPerMillion: 7.50,
        cacheReadPerMillion: 0.625,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: false,
        proSubscriptionId: 'openai-chatgpt-plus'
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-27',
        efforts: {
          max: { aaIndex: 57, outputSpeedTokS: 118.5, costPerTaskUsd: 0.53, totalOutputTokens: 96000000, ttftSeconds: 4.2 },
          xhigh: { aaIndex: 53, outputSpeedTokS: 97.0, costPerTaskUsd: 0.32, totalOutputTokens: 65000000, ttftSeconds: 3.5 },
          high: { aaIndex: 50, outputSpeedTokS: 98.0, costPerTaskUsd: 0.23, totalOutputTokens: 48000000, ttftSeconds: 2.8 },
          medium: { aaIndex: 47, outputSpeedTokS: 98.0, costPerTaskUsd: 0.12, totalOutputTokens: 32000000, ttftSeconds: 2.1 },
          low: { aaIndex: 41, outputSpeedTokS: 100.0, costPerTaskUsd: 0.10, totalOutputTokens: 22000000, ttftSeconds: 1.4 },
          nonReasoning: { aaIndex: 35, outputSpeedTokS: 94.0, costPerTaskUsd: 0.10, totalOutputTokens: 18000000, ttftSeconds: 0.9 }
        },
        interpretation: 'Equilíbrio superior entre inteligência de fronteira (AA 57 no Max) e velocidade sólida (~118 tok/s). Notavelmente supera o Sol em NanoGPT e PostTrainBench Lite.'
      },
      benchmarkSnapshots: [
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 87.4, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'OpenAI Agent Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Terminal-Bench oficial' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 63.4, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'OpenAI Agent Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'SWE-Bench Pro' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 69.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'OpenAI SWE Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'DeepSWE vendor' },
        { benchmarkId: 'genebench-pro', benchmarkVersion: '1.0', score: 23.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'OpenAI Science Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Genômica' },
        { benchmarkId: 'lifescibench', benchmarkVersion: '1.0', score: 56.0, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'OpenAI Science Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Ciências biológicas' },
        { benchmarkId: 'nanogpt', benchmarkVersion: '1.0', score: 14.5, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'OpenAI NanoGPT Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Supera o modelo Sol (14.5% vs 9.69%)' },
        { benchmarkId: 'posttrainbench-lite', benchmarkVersion: '1.0', score: 51.5, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'OpenAI PostTrain Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Supera o modelo Sol (51.5% vs 50.3%)' },
        { benchmarkId: 'gpqa-diamond', benchmarkVersion: '1.0', score: 92.9, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'Standard GPQA', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'GPQA Diamond' },
        { benchmarkId: 'mrcr-v2-512k-1m', benchmarkVersion: '2.0', score: 72.5, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'MRCR v2 Suite', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'MRCR 1M' },
        { benchmarkId: 'osworld-2', benchmarkVersion: '2.0', score: 50.2, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-terra-eval', harness: 'OSWorld 2 Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Computer use' }
      ],
      performanceProfile: {
        softwareEngineering: 'strong',
        terminal: 'elite',
        scientificReasoning: 'strong',
        longContext: 'strong',
        throughput: 'strong',
        costEfficiency: 'average'
      },
      strengths: [
        'Excelente relação inteligência/custo (~metade do preço do Sol)',
        'Throughput de decode veloz (~118.5 tok/s no Max)',
        'Vence o modelo Sol em otimização NanoGPT e PostTrainBench Lite',
        'Consistente em long context (72.5% em 1M)'
      ],
      weaknesses: [
        'Levemente inferior ao Sol em matemática de fronteira Tier 4',
        'Ainda consome volume substancial de tokens em Max effort'
      ],
      bestFor: [
        'Pipelines de engenharia de software de uso contínuo',
        'Aplicações corporativas que requerem alta inteligência com custo controlado'
      ],
      avoidFor: ['Classificação em lote de altíssimo volume onde o Luna é mais vantajoso'],
      sourceIds: ['openai-gpt56-terra-eval', 'aa-gpt56-terra'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 4. GPT-5.6 LUNA (Seções 29 a 40, 100)
    // ------------------------------------------------------------------------
    'gpt-5-6-luna': {
      modelId: 'gpt-5-6-luna',
      identity: {
        canonicalName: 'GPT-5.6 Luna',
        family: 'openai-gpt',
        provider: 'openai',
        providerName: 'OpenAI',
        releaseDate: '2026-08-25',
        status: 'production',
        openWeights: false,
        license: 'Proprietary OpenAI'
      },
      architecture: {
        architectureType: 'Ultra-Fast Lightweight Reasoning Specialist',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Optimized Sparse/Multi-Query Attention'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'ATENÇÃO: Janela nominal de 1M, porém retenção efetiva limitada: MRCR 512K–1M cai para 41.3%',
        retrievalAccuracyScore: 54.2
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.20,
        outputPerMillion: 0.80,
        cacheReadPerMillion: 0.05,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: 'openai-chatgpt-consumer'
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-27',
        efforts: {
          max: { aaIndex: 52, outputSpeedTokS: 128.0, costPerTaskUsd: 0.05, totalOutputTokens: 130000000, ttftSeconds: 1.8 },
          xhigh: { aaIndex: 50, outputSpeedTokS: 128.0, costPerTaskUsd: 0.04, totalOutputTokens: 90000000, ttftSeconds: 1.5 },
          high: { aaIndex: 47, outputSpeedTokS: 129.0, costPerTaskUsd: 0.03, totalOutputTokens: 65000000, ttftSeconds: 1.2 },
          medium: { aaIndex: 39, outputSpeedTokS: 130.0, costPerTaskUsd: 0.02, totalOutputTokens: 40000000, ttftSeconds: 0.9 },
          low: { aaIndex: 34, outputSpeedTokS: 131.0, costPerTaskUsd: 0.015, totalOutputTokens: 25000000, ttftSeconds: 0.6 },
          nonReasoning: { aaIndex: 27, outputSpeedTokS: 132.0, costPerTaskUsd: 0.015, totalOutputTokens: 18000000, ttftSeconds: 0.4 }
        },
        interpretation: 'Extremamente barato ($0.05/tarefa) e ágil (~128 tok/s). Muito forte em coding pelo preço, porém possui retenção fraca em long-context (>500K).'
      },
      benchmarkSnapshots: [
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 84.7, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-luna-eval', harness: 'OpenAI Agent Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Terminal-Bench oficial' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 62.7, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-luna-eval', harness: 'OpenAI Agent Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'SWE-Bench Pro oficial' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 67.2, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-luna-eval', harness: 'OpenAI SWE Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'DeepSWE vendor' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 67.0, unit: 'percent', sourceType: 'independent', sourceId: 'deepswe-leaderboard-20260902', harness: 'mini-SWE-agent', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', confidenceInterval: 4.0, costPerTaskUsd: 0.61, outputTokensPerTask: 73000, agentStepsPerTask: 102, notes: 'DeepSWE independent ($0.61/task)' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 53.4, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-luna-eval', harness: 'Toolathlon Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Notavelmente supera o Terra (53.4% vs 53.1%)' },
        { benchmarkId: 'mrcr-v2-512k-1m', benchmarkVersion: '2.0', score: 41.3, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-luna-eval', harness: 'MRCR v2 Suite', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-25', notes: 'Queda drástica em 1M: nominal 1M ≠ qualidade real' },
        { benchmarkId: 'osworld-2', benchmarkVersion: '2.0', score: 45.6, unit: 'percent', sourceType: 'official', sourceId: 'openai-gpt56-luna-eval', harness: 'OSWorld 2 Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-25', notes: 'Computer use' }
      ],
      performanceProfile: {
        coding: 'strong',
        costEfficiency: 'exceptional',
        throughput: 'excellent',
        longContext: 'weak',
        scientificReasoning: 'average'
      },
      strengths: [
        'Custo por tarefa extraordinariamente baixo ($0.05 no AA e $0.61 no DeepSWE)',
        'Throughput ágil (~128 tok/s)',
        'Score no Toolathlon (53.4%) supera o Terra',
        'Excelente performance de coding relativo ao custo unitário'
      ],
      weaknesses: [
        'Janela nominal de 1M enganosa: recuperação acima de 512K cai para 41.3%',
        'Muito verboso no Max effort gerando muitos tokens desnecessários',
        'Raciocínio científico e genômico muito abaixo de Sol/Terra'
      ],
      bestFor: [
        'Micro-agentes de verificação de testes unitários e linter',
        'Tarefas de programação de escopo local ou repositórios compactos',
        'Sistemas sensíveis a custo com alto volume diário'
      ],
      avoidFor: [
        'Análise de grandes bases de código inteiras (>500K tokens)',
        'Pesquisa científica aprofundada ou síntese biomédica'
      ],
      sourceIds: ['openai-gpt56-luna-eval', 'aa-gpt56-luna', 'deepswe-leaderboard-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 5. DEEPSEEK V4 FLASH 0731 (Seções 41 a 43)
    // ------------------------------------------------------------------------
    'deepseek-v4-flash-0731': {
      modelId: 'deepseek-v4-flash-0731',
      identity: {
        canonicalName: 'DeepSeek-V4-Flash-0731',
        family: 'deepseek-v4',
        provider: 'deepseek',
        providerName: 'DeepSeek AI',
        releaseDate: '2026-07-31',
        status: 'production',
        openWeights: true,
        license: 'MIT / Open Weights'
      },
      architecture: {
        architectureType: 'MoE Text Reasoning Specialist',
        paramsTotal: '238B',
        paramsActive: '16B',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Multi-Head Latent Attention (MLA) com Thinking CoT'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Sólida retenção em documentação e repositórios longos',
        retrievalAccuracyScore: 88.5
      },
      modalities: {
        input: ['text'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.14,
        outputPerMillion: 0.28,
        cacheReadPerMillion: 0.014,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: null
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-05',
        efforts: {
          max: { aaIndex: 52, outputSpeedTokS: 108.0, costPerTaskUsd: 0.11, totalOutputTokens: 210000000, ttftSeconds: 1.5 }
        },
        interpretation: 'Muito eficiente por token ($0.11/tarefa), porém extremamente verboso no AA Intelligence Index (210M tokens).'
      },
      benchmarkSnapshots: [
        // Oficial (Seção 41)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 82.7, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'DeepSeek minimal mode', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'Harness minimal oficial' },
        { benchmarkId: 'nl2repo', benchmarkVersion: '1.0', score: 54.2, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'DeepSeek NL2Repo Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'Geração a partir de especificações' },
        { benchmarkId: 'cybergym', benchmarkVersion: '1.0', score: 76.7, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'DeepSeek Cyber Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'Segurança cibernética ofensiva/defensiva' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 54.4, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'DeepSeek SWE Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'Vendor SWE snapshot oficial' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 70.3, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'DeepSeek Tool Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'Uso de ferramentas' },
        { benchmarkId: 'agents-last-exam', benchmarkVersion: '1.0', score: 25.2, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'ALE Standard', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'ALE oficial' },
        { benchmarkId: 'automationbench', benchmarkVersion: '1.0', score: 25.1, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'AutomationBench Public', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'Automação pública' },
        { benchmarkId: 'dsbench-fullstack', benchmarkVersion: '1.0', score: 68.7, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'DSBench FullStack', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'DSBench FullStack oficial' },
        { benchmarkId: 'dsbench-hard', benchmarkVersion: '1.0', score: 59.6, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-flash-0731-release', harness: 'DSBench Hard', effort: 'max', toolsEnabled: true, snapshotDate: '2026-07-31', notes: 'DSBench Hard oficial' },
        // Independente (Seção 42)
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 53.0, unit: 'percent', sourceType: 'independent', sourceId: 'deepswe-leaderboard-20260902', harness: 'mini-SWE-agent', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', confidenceInterval: 4.0, costPerTaskUsd: 0.46, outputTokensPerTask: 108000, agentStepsPerTask: 153, notes: 'DeepSWE independent snapshot (53% ±4)' }
      ],
      performanceProfile: {
        softwareEngineering: 'strong',
        terminal: 'strong',
        cyber: 'strong',
        toolUse: 'strong',
        costEfficiency: 'exceptional',
        throughput: 'strong'
      },
      strengths: [
        'Custo imbatível por token para modelo open-weights ($0.14/$0.28)',
        'Sólida performance em segurança cibernética (CyberGym 76.7%)',
        'DeepSWE independente confiável em ~53% com custo de apenas $0.46/tarefa',
        'Baixo TTFT (~1.5s) e boa velocidade (~108 tok/s)'
      ],
      weaknesses: [
        'Exclusivamente modalidade de texto (sem visão nativa)',
        'Forte verbosidade aumentando consumo de tokens em certas tarefas',
        'Inferior à variante Vision Exp em Toolathlon e DeepSWE'
      ],
      bestFor: ['Deployments open-weight locais/self-hosted', 'Automação de scripts de terminal e cibersegurança'],
      avoidFor: ['Processamento de imagens, gráficos ou telas de UI'],
      sourceIds: ['deepseek-v4-flash-0731-release', 'aa-deepseek-v4-0731', 'deepswe-leaderboard-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 6. DEEPSEEK V4 FLASH VISION EXP (Seções 44 a 47, 101, 123)
    // ------------------------------------------------------------------------
    'deepseek-v4-flash-vision-exp': {
      modelId: 'deepseek-v4-flash-vision-exp',
      identity: {
        canonicalName: 'DeepSeek-V4-Flash-Vision-Exp',
        family: 'deepseek-v4',
        provider: 'deepseek',
        providerName: 'DeepSeek AI',
        releaseDate: '2026-08-21',
        status: 'preview',
        openWeights: true,
        license: 'Experimental Open Weights'
      },
      architecture: {
        architectureType: 'MoE Multimodal Experimental Vision+Text',
        paramsTotal: '245B',
        paramsActive: '18B',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'MLA Multimodal com Thinking Integrado'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Capaz de processar documentos longos com diagramas e capturas de tela',
        retrievalAccuracyScore: 89.2
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.18,
        outputPerMillion: 0.36,
        cacheReadPerMillion: 0.018,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: null
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-24',
        efforts: {
          max: { aaIndex: 51, outputSpeedTokS: 120.1, costPerTaskUsd: 0.12, totalOutputTokens: 130000000, ttftSeconds: 1.2 }
        },
        interpretation: 'CORREÇÃO FORMAL: AA Index é 51 (NÃO 52!). O modelo é mais especializado que o 0731: ganha significativamente em DeepSWE e Toolathlon, mas regride levemente em CyberGym.'
      },
      benchmarkSnapshots: [
        // Oficial (Seção 45)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 83.9, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'DeepSeek minimal mode', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'Terminal-Bench oficial (supera 0731: 83.9 vs 82.7)' },
        { benchmarkId: 'nl2repo', benchmarkVersion: '1.0', score: 57.7, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'DeepSeek NL2Repo Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'Geração NL2Repo (supera 0731: 57.7 vs 54.2)' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 59.3, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'DeepSeek SWE Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'DeepSWE vendor (supera 0731: 59.3 vs 54.4)' },
        { benchmarkId: 'dsbench-hard', benchmarkVersion: '1.0', score: 63.6, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'DSBench Hard', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'DSBench Hard' },
        { benchmarkId: 'automationbench', benchmarkVersion: '1.0', score: 25.7, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'AutomationBench Public', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'Automação pública' },
        { benchmarkId: 'apex-agents', benchmarkVersion: '1.0', score: 36.5, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'ApexBench Pass@1', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'ApexBench Pass@1' },
        { benchmarkId: 'agents-last-exam', benchmarkVersion: '1.0', score: 27.3, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'ALE Standard', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'ALE oficial' },
        { benchmarkId: 'chartography', benchmarkVersion: '1.0', score: 64.3, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'Chartography Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'Compreensão de gráficos' },
        { benchmarkId: 'zerobench', benchmarkVersion: '1.0', score: 35.0, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'ZeroBench Pass@5', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'ZeroBench Pass@5' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 75.9, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'DeepSeek Tool Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'Toolathlon (supera 0731: 75.9 vs 70.3)' },
        { benchmarkId: 'cybergym', benchmarkVersion: '1.0', score: 75.3, unit: 'percent', sourceType: 'official', sourceId: 'deepseek-v4-vision-exp-release', harness: 'DeepSeek Cyber Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-21', notes: 'Regride levemente vs 0731 (75.3 vs 76.7)' }
      ],
      performanceProfile: {
        visionAgent: 'very-strong',
        toolUse: 'strong',
        coding: 'strong',
        cyber: 'strong',
        costEfficiency: 'excellent'
      },
      strengths: [
        'Modelo com visão nativa com alta velocidade de decode (~120 tok/s)',
        'Ganhos expressivos em DeepSWE (59.3%) e Toolathlon (75.9%) vs 0731',
        'Capacidades visuais fortes em Chartography (64.3%) e ZeroBench',
        'Excelente relação de custo por tarefa ($0.12)'
      ],
      weaknesses: [
        'Índice AA geral (51) ligeiramente menor que versão puramente texto (52)',
        'Leve regressão em cibersegurança CyberGym (75.3% vs 76.7%)'
      ],
      bestFor: [
        'Agentes de interface visual e inspeção de telas',
        'Tarefas multimodais com documentação técnica e diagramas'
      ],
      avoidFor: ['Cenários puramente textuais de cibersegurança onde o 0731 é superior'],
      sourceIds: ['deepseek-v4-vision-exp-release', 'aa-deepseek-v4-vision-exp'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 7. GROK 4.6 (Seções 48 a 52, 125)
    // ------------------------------------------------------------------------
    'grok-4-6': {
      modelId: 'grok-4-6',
      identity: {
        canonicalName: 'Grok 4.6',
        family: 'xai-grok',
        provider: 'xai',
        providerName: 'xAI',
        releaseDate: '2026-08-18',
        status: 'production',
        openWeights: false,
        license: 'Proprietary xAI'
      },
      architecture: {
        architectureType: 'MoE Proprietário Frontier',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 500000,
        maxOutputTokens: 65536,
        attentionType: 'Thinking Nativo com Roteamento Especializado'
      },
      context: {
        nominalTokens: 500000,
        effectiveEvaluation: 'Boa retenção em contexto médio-longo',
        retrievalAccuracyScore: 89.0
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 2.00,
        outputPerMillion: 10.00,
        cacheReadPerMillion: 0.50,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: false,
        proSubscriptionId: 'xai-grok-premium'
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-22',
        efforts: {
          high: { aaIndex: 61, outputSpeedTokS: 54.0, costPerTaskUsd: 0.94, totalOutputTokens: 72000000 },
          xhigh: { aaIndex: 60, outputSpeedTokS: 56.0, costPerTaskUsd: 1.23, totalOutputTokens: 85000000 },
          medium: { aaIndex: 59, outputSpeedTokS: 56.0, costPerTaskUsd: 0.78, totalOutputTokens: 60000000 },
          low: { aaIndex: 52, outputSpeedTokS: 55.0, costPerTaskUsd: 0.25, totalOutputTokens: 28000000 }
        },
        interpretation: 'High (AA 61) supera XHigh (AA 60) no AA Intelligence Index, demonstrando que mais esforço de raciocínio nem sempre é estritamente monótono.'
      },
      benchmarkSnapshots: [
        // Oficial xAI (Seção 49)
        { benchmarkId: 'terminal-bench-3-0', benchmarkVersion: '3.0', score: 26.0, unit: 'percent', sourceType: 'official', sourceId: 'xai-grok46-announcement', harness: 'xAI Agent Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-18', notes: 'Oficial xAI TB 3.0' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 65.9, unit: 'percent', sourceType: 'official', sourceId: 'xai-grok46-announcement', harness: 'xAI Coding Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-18', notes: 'DeepSWE vendor oficial' },
        { benchmarkId: 'frontiercode-1-1-ext', benchmarkVersion: '1.1', score: 61.3, unit: 'percent', sourceType: 'official', sourceId: 'xai-grok46-announcement', harness: 'xAI Evaluation', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-18', notes: 'FrontierCode Extended' },
        { benchmarkId: 'apex-agents', benchmarkVersion: '1.0', score: 57.5, unit: 'percent', sourceType: 'official', sourceId: 'xai-grok46-announcement', harness: 'xAI Agent Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-18', notes: 'APEX-Agents oficial' },
        { benchmarkId: 'apex-swe', benchmarkVersion: '1.0', score: 56.4, unit: 'percent', sourceType: 'official', sourceId: 'xai-grok46-announcement', harness: 'xAI Agent Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-18', notes: 'APEX-SWE oficial' },
        { benchmarkId: 'gdpval-aa-v2', benchmarkVersion: '2.0', score: 1753, unit: 'elo', sourceType: 'official', sourceId: 'xai-grok46-announcement', harness: 'GDPval Suite', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-18', notes: 'GDPval Elo' },
        { benchmarkId: 'aa-briefcase', benchmarkVersion: '1.0', score: 1577, unit: 'elo', sourceType: 'official', sourceId: 'xai-grok46-announcement', harness: 'AA Briefcase Suite', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-18', notes: 'AA-Briefcase Elo' },
        { benchmarkId: 'harvey-lab', benchmarkVersion: '1.0', score: 15.8, unit: 'percent', sourceType: 'official', sourceId: 'xai-grok46-announcement', harness: 'Harvey Suite', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-18', notes: 'Harvey LAB' },
        // Reclassificação Formal: TB2.1 = 88.4 é independente do AA (Seção 50, 125)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 88.4, unit: 'percent', sourceType: 'independent', sourceId: 'aa-grok46-eval', harness: 'Artificial Analysis Agent Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-22', notes: 'RECLASSIFICADO: Medição independente do Artificial Analysis, não xAI' },
        // CursorBench Live (Seção 51)
        { benchmarkId: 'cursorbench-3-2', benchmarkVersion: '3.2', score: 70.8, unit: 'percent', sourceType: 'independent', sourceId: 'cursorbench-live-20260902', harness: 'Cursor Agent Loop', effort: 'xhigh', toolsEnabled: true, snapshotDate: '2026-09-02', costPerTaskUsd: 2.81, outputTokensPerTask: 41136, agentStepsPerTask: 46, pool: 'xai-models', notes: 'CursorBench Live XHigh' },
        { benchmarkId: 'cursorbench-3-2', benchmarkVersion: '3.2', score: 69.9, unit: 'percent', sourceType: 'independent', sourceId: 'cursorbench-live-20260902', harness: 'Cursor Agent Loop', effort: 'high', toolsEnabled: true, snapshotDate: '2026-09-02', costPerTaskUsd: 2.34, outputTokensPerTask: 32449, agentStepsPerTask: 39, pool: 'xai-models', notes: 'CursorBench Live High' },
        { benchmarkId: 'cursorbench-3-2', benchmarkVersion: '3.2', score: 67.1, unit: 'percent', sourceType: 'independent', sourceId: 'cursorbench-live-20260902', harness: 'Cursor Agent Loop', effort: 'medium', toolsEnabled: true, snapshotDate: '2026-09-02', costPerTaskUsd: 1.28, outputTokensPerTask: 17942, agentStepsPerTask: 29, pool: 'xai-models', notes: 'CursorBench Live Medium' },
        { benchmarkId: 'cursorbench-3-2', benchmarkVersion: '3.2', score: 61.0, unit: 'percent', sourceType: 'independent', sourceId: 'cursorbench-live-20260902', harness: 'Cursor Agent Loop', effort: 'low', toolsEnabled: true, snapshotDate: '2026-09-02', costPerTaskUsd: 0.70, outputTokensPerTask: 10658, agentStepsPerTask: 22, pool: 'xai-models', notes: 'CursorBench Live Low' }
      ],
      performanceProfile: {
        softwareEngineering: 'elite',
        terminal: 'elite',
        agenticPersistence: 'strong',
        businessWork: 'strong',
        throughput: 'medium',
        costEfficiency: 'average'
      },
      strengths: [
        'Excelente performance no CursorBench (70.8% em XHigh e 69.9% em High)',
        'Eficiência em passos de agente (apenas 39 passos no High)',
        'Alta precisão em raciocínio de negócios no GDPval (1753 Elo)'
      ],
      weaknesses: [
        'Velocidade de decode lenta (~54 tok/s)',
        'Janela de contexto limitada a 500K tokens vs 1M dos concorrentes diretos',
        'XHigh apresenta regressão de score no AA Intelligence Index vs High'
      ],
      bestFor: ['Agentes de programação no Cursor e tarefas executivas de análise'],
      avoidFor: ['Aplicações que exigem contexto acima de 500K ou decode em tempo real veloz'],
      sourceIds: ['xai-grok46-announcement', 'aa-grok46-eval', 'cursorbench-live-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 8. GLM-5.3 (Seções 53 a 56, 102)
    // ------------------------------------------------------------------------
    'glm-5-3': {
      modelId: 'glm-5-3',
      identity: {
        canonicalName: 'GLM-5.3',
        family: 'glm',
        provider: 'zai',
        providerName: 'Z.ai / Zhipu AI',
        releaseDate: '2026-08-20',
        status: 'production',
        openWeights: true,
        license: 'Open Weights / Enterprise'
      },
      architecture: {
        architectureType: 'MoE Frontier Coding Specialist',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Full Attention com Thinking CoT'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Alta consistência em long horizon software engineering',
        retrievalAccuracyScore: 91.0
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 1.40,
        outputPerMillion: 4.40,
        cacheReadPerMillion: 0.35,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: false,
        proSubscriptionId: 'zai-coding-pro'
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-25',
        efforts: {
          max: { aaIndex: 60, outputSpeedTokS: 78.0, costPerTaskUsd: 0.68, totalOutputTokens: 170000000, ttftSeconds: 1.6 }
        },
        interpretation: 'Frontier open-weight em cibersegurança e engenharia de software de longo alcance. Custo por tarefa equilibrado ($0.68).'
      },
      benchmarkSnapshots: [
        // Oficial Z.ai (Seção 53)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 88.2, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'Z.ai Official Agent Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'Terminal-Bench 2.1 oficial' },
        { benchmarkId: 'terminal-bench-3-0', benchmarkVersion: '3.0', score: 28.3, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'Z.ai Official Agent Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'Terminal-Bench 3.0 oficial' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 66.9, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'Z.ai SWE Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'DeepSWE vendor oficial' },
        { benchmarkId: 'nl2repo', benchmarkVersion: '1.0', score: 58.0, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'Z.ai Evaluation', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'NL2Repo' },
        { benchmarkId: 'programbench', benchmarkVersion: '1.0', score: 19.0, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'ProgramBench Almost Solved', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'ProgramBench' },
        { benchmarkId: 'frontierswe', benchmarkVersion: '1.0', score: 78.1, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'FrontierSWE Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'FrontierSWE' },
        { benchmarkId: 'swe-marathon-1-1', benchmarkVersion: '1.1', score: 42.5, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'SWE-Marathon Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'SWE-Marathon' },
        { benchmarkId: 'posttrainbench', benchmarkVersion: '1.0', score: 39.8, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'PostTrainBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'PostTrainBench' },
        { benchmarkId: 'cybergym', benchmarkVersion: '1.0', score: 84.5, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'CyberGym Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'Destaque de elite em segurança (84.5%)' },
        { benchmarkId: 'exploitgym', benchmarkVersion: '1.0', score: 105, unit: 'tasks', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'ExploitGym (2h window)', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: '105/130 tarefas resolvidas' },
        { benchmarkId: 'exploitbench', benchmarkVersion: '1.0', score: 54.4, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'ExploitBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'ExploitBench' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 73.0, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'Toolathlon', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'Toolathlon' },
        { benchmarkId: 'automationbench', benchmarkVersion: '1.0', score: 48.2, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'AutomationBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'AutomationBench' },
        { benchmarkId: 'ale-cli', benchmarkVersion: '1.0', score: 28.5, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'ALE-CLI', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'ALE-CLI' },
        { benchmarkId: 'hle-with-tools', benchmarkVersion: '1.0', score: 62.5, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'HLE with Tools', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'HLE com ferramentas' },
        { benchmarkId: 'gdpval-aa-v2', benchmarkVersion: '2.0', score: 1769, unit: 'elo', sourceType: 'official', sourceId: 'zai-glm53-modelcard', harness: 'GDPval Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-20', notes: 'GDPval Elo' },
        // Independente (Seção 54)
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 69.0, unit: 'percent', sourceType: 'independent', sourceId: 'deepswe-leaderboard-20260902', harness: 'mini-SWE-agent', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', confidenceInterval: 3.0, costPerTaskUsd: 3.99, outputTokensPerTask: 80000, agentStepsPerTask: 124, notes: 'DeepSWE independent snapshot (69% ±3)' }
      ],
      performanceProfile: {
        cyber: 'elite',
        automation: 'elite',
        softwareEngineering: 'frontier-open-weight',
        toolUse: 'strong',
        costEfficiency: 'medium',
        deployment: 'very-heavy'
      },
      strengths: [
        'Liderança incontestável em cibersegurança e exploit (CyberGym 84.5%)',
        'Forte capacidade agêntica autônoma em SWE-Marathon e FrontierSWE',
        'Alto desempenho com ferramentas em HLE (62.5%) e Toolathlon (73%)',
        'DeepSWE independente atinge 69%'
      ],
      weaknesses: [
        'Modelo de grande porte com deployment local extremamente pesado',
        'Custo unitário superior a concorrentes Flash da mesma família'
      ],
      bestFor: [
        'Equipes de segurança ofensiva/defensiva (AppSec e Red Teaming)',
        'Sistemas agênticos complexos de refatoração de bases de código legadas'
      ],
      avoidFor: ['Deployments em instâncias modestas de GPU com pouca VRAM'],
      sourceIds: ['zai-glm53-modelcard', 'aa-glm53', 'deepswe-leaderboard-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 9. GLM-5.3-FLASH (Seções 57 a 60, 103)
    // ------------------------------------------------------------------------
    'glm-5-3-flash': {
      modelId: 'glm-5-3-flash',
      identity: {
        canonicalName: 'GLM-5.3-Flash',
        family: 'glm',
        provider: 'zai',
        providerName: 'Z.ai / Zhipu AI',
        releaseDate: '2026-08-26',
        status: 'production',
        openWeights: true,
        license: 'MIT Open Weights'
      },
      architecture: {
        architectureType: 'MoE Sparse+Linear Attention Multimodal',
        paramsTotal: '320B',
        paramsActive: '18B',
        layers: 45,
        contextNativeTokens: 1000000,
        maxOutputTokens: 131072,
        attentionType: 'Sparse Attention + Linear Attention (mHC, ~30T tokens multimodal)'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Muito competente em contextos visuais e documentais extensos',
        retrievalAccuracyScore: 89.4
      },
      modalities: {
        input: ['text', 'image', 'video'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.15,
        outputPerMillion: 0.50,
        cacheReadPerMillion: 0.0375,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: 'zai-coding-standard'
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-28',
        efforts: {
          max: { aaIndex: 57, outputSpeedTokS: 44.6, costPerTaskUsd: 0.09, totalOutputTokens: 150000000, ttftSeconds: 1.65 }
        },
        interpretation: 'IMPORTANTE: O rótulo "Flash" refere-se à economia de custo ($0.09/tarefa) e parâmetros ativos (18B), mas o throughput medido no AA é de apenas 44.6 tok/s (relativamente lento).'
      },
      benchmarkSnapshots: [
        // Oficial (Seção 58, 59)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 84.3, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'Z.ai Agent Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'Terminal-Bench 2.1 oficial' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 63.4, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'Z.ai SWE Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'DeepSWE vendor' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 63.0, unit: 'percent', sourceType: 'independent', sourceId: 'deepswe-leaderboard-20260902', harness: 'mini-SWE-agent', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', confidenceInterval: 4.0, costPerTaskUsd: 0.24, outputTokensPerTask: 73000, agentStepsPerTask: 123, notes: 'DeepSWE independent ($0.24/task)' },
        { benchmarkId: 'nl2repo', benchmarkVersion: '1.0', score: 56.3, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'Z.ai Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'NL2Repo' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 78.4, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'Toolathlon', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'Toolathlon Verified excelente (78.4%)' },
        { benchmarkId: 'automationbench', benchmarkVersion: '1.0', score: 48.8, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'AutomationBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'AutomationBench' },
        { benchmarkId: 'agents-last-exam', benchmarkVersion: '1.0', score: 26.3, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'ALE Standard', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'ALE' },
        { benchmarkId: 'hle-with-tools', benchmarkVersion: '1.0', score: 55.3, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'HLE with Tools', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'HLE com ferramentas' },
        { benchmarkId: 'gdpval-aa-v2', benchmarkVersion: '2.0', score: 1773, unit: 'elo', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'GDPval Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'GDPval Elo de destaque (1773)' },
        // Multimodal (Seção 59)
        { benchmarkId: 'officeqa-pro', benchmarkVersion: '1.0', score: 62.4, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'OfficeQA Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'OfficeQA Pro' },
        { benchmarkId: 'charxiv', benchmarkVersion: '1.0', score: 89.4, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'CharXiv Reasoning + Tools', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'CharXiv com ferramentas (89.4%)' },
        { benchmarkId: 'chartography', benchmarkVersion: '1.0', score: 78.0, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'Chartography + Tools', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'Chartography' },
        { benchmarkId: 'mmvu', benchmarkVersion: '1.0', score: 80.5, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'MMVU Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'MMVU' },
        { benchmarkId: 'babyvision', benchmarkVersion: '1.0', score: 53.4, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'BabyVision', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'BabyVision' },
        { benchmarkId: 'mvbench', benchmarkVersion: '1.0', score: 77.8, unit: 'percent', sourceType: 'official', sourceId: 'zai-glm53-flash-modelcard', harness: 'MVBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-26', notes: 'MVBench' }
      ],
      performanceProfile: {
        costEfficiency: 'exceptional',
        multimodal: 'excellent',
        toolUse: 'excellent',
        coding: 'strong',
        decodeSpeed: 'weak',
        localDeployment: 'medium-heavy'
      },
      strengths: [
        'Custo excepcional por tarefa ($0.09 no AA e $0.24 no DeepSWE)',
        'Excelência multimodal (CharXiv 89.4% e OfficeQA Pro 62.4%)',
        'Altíssimo score em Toolathlon (78.4%) e GDPval (1773 Elo)',
        'Licença MIT amigável para open weights'
      ],
      weaknesses: [
        'Throughput de decode lento no AA (~44.6 tok/s)',
        'Embora ative 18B, modelo possui 320B totais exigindo storage substancial'
      ],
      bestFor: [
        'Processamento de documentos e imagens com custo mínimo',
        'Pipelines automatizados de ferramentas (Toolathlon)'
      ],
      avoidFor: ['Aplicações de streaming interativo em tempo real que exijam >100 tok/s'],
      sourceIds: ['zai-glm53-flash-modelcard', 'aa-glm53-flash', 'deepswe-leaderboard-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 10. KIMI K3 (Seções 61 a 65, 104)
    // ------------------------------------------------------------------------
    'kimi-k3': {
      modelId: 'kimi-k3',
      identity: {
        canonicalName: 'Kimi K3',
        family: 'kimi-moonshot',
        provider: 'kimi',
        providerName: 'Moonshot AI',
        releaseDate: '2026-08-15',
        status: 'production',
        openWeights: true,
        license: 'Open Weights / Kimi Commercial'
      },
      architecture: {
        architectureType: 'MoE Maciço com Raciocínio Profundo',
        paramsTotal: '2.8T',
        paramsActive: '104B',
        layers: 93,
        contextNativeTokens: 1000000,
        maxOutputTokens: 131072,
        attentionType: 'Full Attention com Long-Horizon Reasoning Loop'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Elite em busca, pesquisa e recuperação multi-round (AA-LCR 74.7%)',
        retrievalAccuracyScore: 95.0
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 3.00,
        outputPerMillion: 15.00,
        cacheReadPerMillion: 0.75,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: false,
        proSubscriptionId: 'kimi-membership-pro'
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-22',
        efforts: {
          max: { aaIndex: 60, outputSpeedTokS: 38.0, costPerTaskUsd: 0.84, totalOutputTokens: 130000000, ttftSeconds: 3.55 }
        },
        interpretation: 'Extremamente inteligente (AA 60), com liderança em pesquisa e busca web agêntica, mas decode lento (~38 tok/s) e preço mais alto entre pares abertos.'
      },
      benchmarkSnapshots: [
        // Oficial Reasoning & Science (Seção 62)
        { benchmarkId: 'gpqa-diamond', benchmarkVersion: '1.0', score: 93.5, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'Moonshot Reasoning Eval', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-15', notes: 'GPQA Diamond' },
        { benchmarkId: 'critpt', benchmarkVersion: '1.0', score: 23.4, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'Moonshot Science', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-15', notes: 'CritPt' },
        { benchmarkId: 'aa-lcr', benchmarkVersion: '1.0', score: 74.7, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'AA Long Context Reasoning', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-15', notes: 'AA-LCR oficial' },
        { benchmarkId: 'hle-no-tools', benchmarkVersion: '1.0', score: 43.5, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'HLE Text Only', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-15', notes: 'HLE sem ferramentas' },
        { benchmarkId: 'hle-with-tools', benchmarkVersion: '1.0', score: 56.0, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'HLE with Tools', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'HLE com ferramentas' },
        // Coding Oficial & Independente (Seção 63)
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 67.5, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'Kimi Code Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'DeepSWE Kimi Code oficial' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 69.0, unit: 'percent', sourceType: 'independent', sourceId: 'deepswe-leaderboard-20260902', harness: 'mini-SWE-agent', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', confidenceInterval: 5.0, costPerTaskUsd: 4.65, outputTokensPerTask: 81000, agentStepsPerTask: 98, notes: 'DeepSWE independent snapshot (69% ±5)' },
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 88.3, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'Kimi Code Agent', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'Terminal-Bench 2.1' },
        { benchmarkId: 'programbench', benchmarkVersion: '1.0', score: 77.8, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'ProgramBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'ProgramBench excelente (77.8%)' },
        { benchmarkId: 'frontierswe', benchmarkVersion: '1.0', score: 81.2, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'FrontierSWE Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'FrontierSWE de destaque (81.2%)' },
        { benchmarkId: 'swe-marathon-1-1', benchmarkVersion: '1.1', score: 42.0, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'SWE-Marathon', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'SWE-Marathon' },
        { benchmarkId: 'kimi-codebench-2-0', benchmarkVersion: '2.0', score: 72.9, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'Kimi Code Bench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'Kimi Code Bench 2.0' },
        // Agentic Oficial (Seção 64)
        { benchmarkId: 'browsecomp', benchmarkVersion: '1.0', score: 91.2, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'BrowseComp Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'BrowseComp elite (91.2%)' },
        { benchmarkId: 'deepsearchqa', benchmarkVersion: '1.0', score: 95.0, unit: 'f1', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'DeepSearchQA F1', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'Pesquisa profunda F1 = 95.0' },
        { benchmarkId: 'researchrubrics', benchmarkVersion: '1.0', score: 76.2, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'ResearchRubrics', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'ResearchRubrics' },
        { benchmarkId: 'mcpmark-verified', benchmarkVersion: '1.0', score: 94.5, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'MCPMark Verified', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'MCPMark Verified (94.5%)' },
        { benchmarkId: 'osworld-verified', benchmarkVersion: '1.0', score: 84.8, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'OSWorld Verified', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'OSWorld Verified (84.8%)' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 76.5, unit: 'percent', sourceType: 'official', sourceId: 'moonshot-kimi-k3-techblog', harness: 'Toolathlon', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'Toolathlon' }
      ],
      performanceProfile: {
        search: 'elite',
        research: 'elite',
        longHorizonCoding: 'elite',
        toolUse: 'elite',
        speed: 'poor',
        price: 'high-for-open-weight'
      },
      strengths: [
        'Liderança absoluta em busca web agêntica (BrowseComp 91.2% e DeepSearchQA 95.0 F1)',
        'Excelência comprovada no protocolo MCP (MCPMark 94.5%)',
        'Liderança no FrontierSWE (81.2%) e ProgramBench (77.8%)',
        'DeepSWE independente em 69% com menos passos de agente (98)'
      ],
      weaknesses: [
        'Throughput de decode muito lento (~38 tok/s)',
        'Preço de token mais caro entre os pares de pesos abertos ($3/$15)',
        'TTFT perceptível em consultas de raciocínio profundo (~3.55s)'
      ],
      bestFor: [
        'Agentes de pesquisa autônoma, síntese de literatura e busca na web',
        'Automações orquestradas via Model Context Protocol (MCP)'
      ],
      avoidFor: ['Autocompletion de código de latência sub-segundo'],
      sourceIds: ['moonshot-kimi-k3-techblog', 'aa-kimi-k3', 'deepswe-leaderboard-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 11. HY4 PREVIEW (Seções 66 a 71, 105, 128)
    // ------------------------------------------------------------------------
    'hy4-preview': {
      modelId: 'hy4-preview',
      identity: {
        canonicalName: 'Hy4 Preview',
        family: 'tencent-hunyuan',
        provider: 'tencent',
        providerName: 'Tencent',
        releaseDate: '2026-08-29',
        status: 'preview',
        openWeights: true,
        license: 'Tencent Hunyuan Open Weights'
      },
      architecture: {
        architectureType: 'MoE Gated DeepSeek Sparse com IndexCache e MTP',
        paramsTotal: '770B',
        paramsActive: '49B',
        layers: '78 backbone + 1 MTP (10B total / 0.7B active)',
        experts: '256 routed + 1 shared (top-8 routed ativos por token)',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Gated DeepSeek Sparse Attention + iHC Residual'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Excelente retenção em 1M documentada no OneMillionBench (65.4%)',
        retrievalAccuracyScore: 88.0
      },
      modalities: {
        input: ['text', 'code'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.30,
        outputPerMillion: 1.00,
        cacheReadPerMillion: 0.075,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: null
      },
      artificialAnalysis: {
        verifiedAt: null,
        efforts: null,
        interpretation: 'AA Index é N/D (null) até avaliação independente real no snapshot. Não copiar escores de Hy3.'
      },
      benchmarkSnapshots: [
        // Vendor-reported benchmarks (Seção 68)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 85.4, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'Tencent Official Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 64.3, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'Tencent SWE Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 65.7, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'Tencent SWE Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 74.1, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'Toolathlon', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'apex-agents', benchmarkVersion: '1.0', score: 37.1, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'APEX-Agents', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'programbench', benchmarkVersion: '1.0', score: 17.5, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'ProgramBench', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'swe-atlas-refactoring', benchmarkVersion: '1.0', score: 53.3, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'SWE-Atlas', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'ale-cli', benchmarkVersion: '1.0', score: 22.8, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'ALE-CLI', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'posttrainbench', benchmarkVersion: '1.0', score: 35.6, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'PostTrainBench', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'onemillionbench', benchmarkVersion: '1.0', score: 65.4, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'OneMillionBench with tools', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'biomystery', benchmarkVersion: '1.0', score: 71.3, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'BioMystery', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'hle-no-tools', benchmarkVersion: '1.0', score: 43.4, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'HLE Text Only', effort: 'high', toolsEnabled: false, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        { benchmarkId: 'horizonmath', benchmarkVersion: '1.0', score: 8.8, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'HorizonMath pass@4', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Vendor-reported benchmark' },
        // Blind engineering evaluation (Seção 69)
        { benchmarkId: 'internal-research-debug', benchmarkVersion: '1.0', score: 74.75, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy4-modelcard', harness: 'Tencent Blind Engineering Eval (2.99/4)', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-29', notes: 'Avaliação cega com 163 especialistas em 203 tarefas (2.99/4 vs GLM 2.92 e Kimi 2.94)' }
      ],
      performanceProfile: {
        coding: 'frontier-vendor-reported',
        longContext: 'strong',
        gameDevelopment: 'target-focus',
        agentic: 'strong',
        evidenceConfidence: 'medium',
        independentBenchmarks: 'still-sparse'
      },
      strengths: [
        'Enorme evolução vs Hy3 (TB 85.4 vs 70.8 e DeepSWE 64.3 vs 28.0)',
        'Atenção esparsa de 770B com apenas 49B ativos para alta escalabilidade',
        'Foco explícito da Tencent em desenvolvimento de jogos e lógica de backend',
        'Venceu teste cego de engenharia contra GLM-5.3 (46.8% win) e Kimi K3 (51.2% win)'
      ],
      weaknesses: [
        'Classificação como early preview com instabilidade em certas tarefas',
        'Tendência a over-reasoning e verificação repetitiva excessiva',
        'Benchmarks independentes de terceiros ainda escassos neste snapshot'
      ],
      bestFor: ['Engenharia de software voltada a games, lógica de servidores e testes experimentais'],
      avoidFor: ['Ambientes corporativos de produção com tolerância zero a regressões de preview'],
      sourceIds: ['tencent-hy4-modelcard'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 12. HY3 (Seções 72 a 74, 106)
    // ------------------------------------------------------------------------
    'hy3-tencent': {
      modelId: 'hy3-tencent',
      identity: {
        canonicalName: 'Tencent Hy3',
        family: 'tencent-hunyuan',
        provider: 'tencent',
        providerName: 'Tencent',
        releaseDate: '2026-05-14',
        status: 'stable',
        openWeights: true,
        license: 'Tencent Open Weights'
      },
      architecture: {
        architectureType: 'MoE Dense/Sparse Híbrido',
        paramsTotal: '295B',
        paramsActive: '21B',
        contextNativeTokens: 256000,
        maxOutputTokens: 32768,
        attentionType: 'Standard Multi-Head Attention'
      },
      context: {
        nominalTokens: 256000,
        effectiveEvaluation: 'Janela de 256K focada em documentos convencionais',
        retrievalAccuracyScore: 78.0
      },
      modalities: {
        input: ['text'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.14,
        outputPerMillion: 0.55,
        cacheReadPerMillion: 0.035,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api'],
        freeTierAvailable: true,
        proSubscriptionId: null
      },
      artificialAnalysis: {
        verifiedAt: '2026-06-10',
        efforts: {
          standard: { aaIndex: 42, outputSpeedTokS: 95.0, costPerTaskUsd: 0.04, totalOutputTokens: 140000000, ttftSeconds: 2.7 }
        },
        interpretation: 'Econômico e rápido, porém superado amplamente pelos modelos de fronteira da geração 4.'
      },
      benchmarkSnapshots: [
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 70.8, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy3-modelcard', harness: 'Tencent Baseline', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-05-14', notes: 'Linha de base oficial' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 28.0, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy3-modelcard', harness: 'Tencent Baseline', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-05-14', notes: 'Linha de base DeepSWE' },
        { benchmarkId: 'programbench', benchmarkVersion: '1.0', score: 3.0, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy3-modelcard', harness: 'Tencent Baseline', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-05-14', notes: 'ProgramBench' },
        { benchmarkId: 'swe-atlas-refactoring', benchmarkVersion: '1.0', score: 32.9, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy3-modelcard', harness: 'Tencent Baseline', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-05-14', notes: 'SWE-Atlas' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 56.2, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy3-modelcard', harness: 'Tencent Baseline', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-05-14', notes: 'Toolathlon' },
        { benchmarkId: 'onemillionbench', benchmarkVersion: '1.0', score: 51.6, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy3-modelcard', harness: 'Tencent Baseline', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-05-14', notes: 'OneMillionBench' },
        { benchmarkId: 'biomystery', benchmarkVersion: '1.0', score: 54.9, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy3-modelcard', harness: 'Tencent Baseline', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-05-14', notes: 'BioMystery' },
        { benchmarkId: 'humanitys-last-exam', benchmarkVersion: '1.0', score: 34.4, unit: 'percent', sourceType: 'vendor-reported', sourceId: 'tencent-hy3-modelcard', harness: 'HLE Standard', effort: 'standard', toolsEnabled: false, snapshotDate: '2026-05-14', notes: 'HLE' }
      ],
      performanceProfile: {
        costEfficiency: 'exceptional',
        throughput: 'excellent',
        coding: 'below-current-frontier',
        context: 'moderate',
        agentic: 'moderate'
      },
      strengths: ['Custo de inferência ultra-baixo ($0.04/tarefa)', 'Decode ágil (~95 tok/s)'],
      weaknesses: ['Coding muito defasado em relação à fronteira atual', 'Contexto limitado a 256K'],
      bestFor: ['Processamento de texto comum e chatbots informativos'],
      avoidFor: ['Engenharia de software complexa'],
      sourceIds: ['tencent-hy3-modelcard', 'aa-hy3'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 13. QWEN3.8 MAX (Seções 75 a 78, 107)
    // ------------------------------------------------------------------------
    'qwen3-8-max': {
      modelId: 'qwen3-8-max',
      identity: {
        canonicalName: 'Qwen3.8 Max',
        family: 'qwen',
        provider: 'alibaba',
        providerName: 'Alibaba Cloud',
        releaseDate: '2026-08-10',
        status: 'production',
        openWeights: false,
        license: 'Alibaba Cloud API Service'
      },
      architecture: {
        architectureType: 'Frontier Dense/MoE Flagship API',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Full Attention Multimodal Nativo'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Excelente retenção em long context documentada no MRCR 1M (92.9%)',
        retrievalAccuracyScore: 93.5
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 2.00,
        outputPerMillion: 6.00,
        cacheReadPerMillion: 0.50,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: false,
        proSubscriptionId: null
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-16',
        efforts: {
          max: { aaIndex: 58, outputSpeedTokS: 40.0, costPerTaskUsd: 0.91, totalOutputTokens: 150000000, ttftSeconds: 2.5 }
        },
        interpretation: 'Snapshot auditado atualizado: AA 58, speed ~40 tok/s, cost $0.91/task (anteriormente catalogado como 47.2 tok/s e $1.13).'
      },
      benchmarkSnapshots: [
        // Oficial / Tabela comparativa Z.ai (Seção 75)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 86.6, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'Qwen Official Evaluation', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'Terminal-Bench 2.1 oficial' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 56.6, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'Qwen SWE Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'DeepSWE vendor' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 57.0, unit: 'percent', sourceType: 'independent', sourceId: 'deepswe-leaderboard-20260902', harness: 'mini-SWE-agent', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', confidenceInterval: 3.0, costPerTaskUsd: 3.73, outputTokensPerTask: 95000, agentStepsPerTask: 111, notes: 'DeepSWE independent snapshot (57% ±3)' },
        { benchmarkId: 'nl2repo', benchmarkVersion: '1.0', score: 55.9, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'Qwen Eval', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'NL2Repo' },
        { benchmarkId: 'programbench', benchmarkVersion: '1.0', score: 10.5, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'ProgramBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'ProgramBench' },
        { benchmarkId: 'cybergym', benchmarkVersion: '1.0', score: 78.5, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'CyberGym', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'CyberGym' },
        { benchmarkId: 'exploitgym', benchmarkVersion: '1.0', score: 14, unit: 'tasks', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'ExploitGym (14/26)', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'ExploitGym 14/26' },
        { benchmarkId: 'exploitbench', benchmarkVersion: '1.0', score: 28.8, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'ExploitBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'ExploitBench' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 72.5, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'Toolathlon', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'Toolathlon' },
        { benchmarkId: 'automationbench', benchmarkVersion: '1.0', score: 39.8, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'AutomationBench', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'AutomationBench' },
        { benchmarkId: 'agents-last-exam', benchmarkVersion: '1.0', score: 27.0, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'ALE Standard', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'ALE' },
        { benchmarkId: 'hle-with-tools', benchmarkVersion: '1.0', score: 56.2, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'HLE with Tools', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'HLE com ferramentas' },
        { benchmarkId: 'gdpval-aa-v2', benchmarkVersion: '2.0', score: 1739, unit: 'elo', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'GDPval Suite', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'GDPval Elo' },
        { benchmarkId: 'mrcr-v2-512k-1m', benchmarkVersion: '2.0', score: 92.9, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'MRCR Suite', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-10', notes: 'MRCR 1M oficial' },
        { benchmarkId: 'gpqa-diamond', benchmarkVersion: '1.0', score: 92.6, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'GPQA Diamond', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-10', notes: 'GPQA Diamond oficial' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 67.7, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-max-report', harness: 'SWE-Bench Pro', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-10', notes: 'SWE-Bench Pro oficial' }
      ],
      performanceProfile: {
        reasoning: 'strong',
        softwareEngineering: 'strong',
        toolUse: 'strong',
        longContext: 'strong',
        throughput: 'slow',
        costEfficiency: 'moderate-high'
      },
      strengths: [
        'Excepcional retenção em contexto longo (MRCR 1M em 92.9%)',
        'Forte capacidade multilíngue e robustez em SWE-Bench Pro (67.7%)',
        'Consistência em raciocínio acadêmico (GPQA 92.6%)'
      ],
      weaknesses: [
        'Throughput lento (~40 tok/s)',
        'Custo de API moderado a alto ($2/$6 por milhão)'
      ],
      bestFor: ['Análise profunda de grandes bases documentais e repositórios extensos'],
      avoidFor: ['Aplicações interativas que demandem decode de altíssima velocidade'],
      sourceIds: ['qwen-qwen38-max-report', 'aa-qwen38-max', 'deepswe-leaderboard-20260902'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 14. QWEN3.8 FLASH (Seções 4, 79, 80, 108, 126)
    // ------------------------------------------------------------------------
    'qwen3-8-flash': {
      modelId: 'qwen3-8-flash',
      identity: {
        canonicalName: 'Qwen3.8 Flash',
        family: 'qwen',
        provider: 'alibaba',
        providerName: 'Alibaba Cloud',
        releaseDate: '2026-08-24',
        status: 'production',
        openWeights: false,
        license: 'Alibaba Cloud API Service',
        relatedVariants: ['qwen3-8-flash-next']
      },
      architecture: {
        architectureType: 'MoE Flash API Service',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 131072,
        attentionType: 'Flash Sparse Multimodal Attention'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Janela de serviço de 1M com saída expandida de até 131K tokens',
        retrievalAccuracyScore: 87.0
      },
      modalities: {
        input: ['text', 'image', 'video'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.16,
        outputPerMillion: 0.47,
        cacheReadPerMillion: 0.04,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: null
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-27',
        efforts: null,
        relatedVariantMeasured: 'qwen3-8-flash-next',
        relatedVariantIndex: 56,
        relatedVariantSpeed: '86–89 tok/s',
        relatedVariantCostPerTask: '$0.10',
        interpretation: 'O Artificial Analysis mede a release aberta Qwen3.8-Flash-Next (AA ~56, ~$0.10/task). O endpoint de produção Qwen3.8 Flash não possui score AA isolado.'
      },
      benchmarkSnapshots: [
        // Benchmarks oficiais da variante base Flash-Next (Seção 79)
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 58.7, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-flashnext-eval', harness: 'Qwen SWE Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-24', variantMeasured: 'qwen3-8-flash-next', notes: 'Base open-weight Qwen3.8-Flash-Next' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 62.5, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-flashnext-eval', harness: 'Qwen SWE Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-24', variantMeasured: 'qwen3-8-flash-next', notes: 'Base open-weight Qwen3.8-Flash-Next' },
        { benchmarkId: 'swe-bench-multilingual', benchmarkVersion: '1.0', score: 81.0, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-flashnext-eval', harness: 'Multilingual SWE Harness', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-24', variantMeasured: 'qwen3-8-flash-next', notes: 'Liderança em código multilíngue (81.0%)' },
        { benchmarkId: 'nl2repo', benchmarkVersion: '1.0', score: 48.1, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-flashnext-eval', harness: 'Qwen Eval', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-24', variantMeasured: 'qwen3-8-flash-next', notes: 'NL2Repo' },
        { benchmarkId: 'coworkbench', benchmarkVersion: '1.0', score: 73.9, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-flashnext-eval', harness: 'CoWorkBench Suite', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-24', variantMeasured: 'qwen3-8-flash-next', notes: 'CoWorkBench (73.9%)' },
        { benchmarkId: 'jobbench', benchmarkVersion: '1.0', score: 55.7, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-flashnext-eval', harness: 'JobBench', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-24', variantMeasured: 'qwen3-8-flash-next', notes: 'JobBench' },
        { benchmarkId: 'agents-last-exam', benchmarkVersion: '1.0', score: 24.3, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-flashnext-eval', harness: 'ALE Pass@1', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-24', variantMeasured: 'qwen3-8-flash-next', notes: 'ALE Pass@1 (Score 51.2)' },
        { benchmarkId: 'toolathlon-verified', benchmarkVersion: '1.0', score: 73.5, unit: 'percent', sourceType: 'official', sourceId: 'qwen-qwen38-flashnext-eval', harness: 'Toolathlon Suite', effort: 'high', toolsEnabled: true, snapshotDate: '2026-08-24', variantMeasured: 'qwen3-8-flash-next', notes: 'Toolathlon' }
      ],
      performanceProfile: {
        costEfficiency: 'exceptional',
        softwareEngineering: 'strong',
        multilingualSwe: 'very-strong',
        toolUse: 'strong',
        coWork: 'very-strong',
        frontierReasoning: 'below-qwen-max'
      },
      strengths: [
        'Preço extremamente atrativo no serviço de nuvem ($0.16/$0.47)',
        'Liderança expressiva em SWE Multilingual (81.0%)',
        'Forte performance colaborativa em CoWorkBench (73.9%)',
        'Suporte nativo a texto, imagem e vídeo com 131K tokens de saída'
      ],
      weaknesses: [
        'Raciocínio científico puro abaixo do Qwen3.8 Max',
        'Diferenciação necessária entre o serviço comercial e a variante Flash-Next'
      ],
      bestFor: ['Pipelines multilíngues de desenvolvimento e automação colaborativa de baixo custo'],
      avoidFor: ['Problemas teóricos extremos de matemática frontier'],
      sourceIds: ['qwen-qwen38-flashnext-eval', 'aa-qwen38-flashnext'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 15. MINIMAX M3 (Seções 81 a 85, 109, 124)
    // ------------------------------------------------------------------------
    'minimax-m3': {
      modelId: 'minimax-m3',
      identity: {
        canonicalName: 'MiniMax M3',
        family: 'minimax',
        provider: 'minimax',
        providerName: 'MiniMax AI',
        releaseDate: '2026-08-12',
        status: 'production',
        openWeights: true,
        license: 'Open Weights / Commercial'
      },
      architecture: {
        architectureType: 'MoE Multimodal Nativo com Foco em Computer Use',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Video-Aware Native Attention com Computer Vision'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Janela de 1M otimizada para sequências de frames de vídeo e histórico de UI',
        retrievalAccuracyScore: 86.5
      },
      modalities: {
        input: ['text', 'image', 'video'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.30,
        outputPerMillion: 1.20,
        cacheReadPerMillion: 0.075,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: null
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-19',
        efforts: {
          standard: { aaIndex: 45, outputSpeedTokS: 99.0, costPerTaskUsd: 0.14, totalOutputTokens: 89000000, ttftSeconds: 1.4 }
        },
        interpretation: 'Excelente em multimodalidade, vídeo longo e computer use por baixo custo ($0.14/tarefa e ~99 tok/s), porém abaixo dos líderes em raciocínio puro de fronteira.'
      },
      benchmarkSnapshots: [
        // Oficial (Seção 82 - CORREÇÃO TB2.1: 66.0, não 65.5)
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 66.0, unit: 'percent', sourceType: 'official', sourceId: 'minimax-m3-modelcard', harness: 'MiniMax Official Agent Platform', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-08-12', notes: 'CORREÇÃO FORMAL: Terminal-Bench 2.1 oficial é 66.0 (anteriormente catalogado incorretamente como 65.5)' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 59.0, unit: 'percent', sourceType: 'official', sourceId: 'minimax-m3-modelcard', harness: 'MiniMax Agent Harness', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-08-12', notes: 'SWE-Bench Pro oficial' },
        { benchmarkId: 'swe-fficiency', benchmarkVersion: '1.0', score: 34.8, unit: 'percent', sourceType: 'official', sourceId: 'minimax-m3-modelcard', harness: 'SWE-fficiency Suite', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-08-12', notes: 'SWE-fficiency' },
        { benchmarkId: 'kernelbench-hard', benchmarkVersion: '1.0', score: 28.8, unit: 'percent', sourceType: 'official', sourceId: 'minimax-m3-modelcard', harness: 'KernelBench Hard', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-08-12', notes: 'KernelBench Hard' },
        { benchmarkId: 'mcp-atlas', benchmarkVersion: '1.0', score: 74.2, unit: 'percent', sourceType: 'official', sourceId: 'minimax-m3-modelcard', harness: 'MCP Atlas Suite', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-08-12', notes: 'MCP Atlas' },
        // Computer Use (Seção 83)
        { benchmarkId: 'osworld-verified', benchmarkVersion: '1.0', score: 68.70, unit: 'percent', sourceType: 'official', sourceId: 'minimax-m3-modelcard', harness: 'OSWorld Verified (max 100 steps)', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-08-12', maxSteps: 100, notes: 'OSWorld Verified (100 steps max)' },
        { benchmarkId: 'osworld-verified', benchmarkVersion: '1.0', score: 70.06, unit: 'percent', sourceType: 'official', sourceId: 'minimax-m3-modelcard', harness: 'OSWorld Verified (max 200 steps)', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-08-12', maxSteps: 200, notes: 'OSWorld Verified (200 steps max)' },
        // Vídeo (Seção 84)
        { benchmarkId: 'video-mme', benchmarkVersion: '1.0', score: 84.6, unit: 'percent', sourceType: 'official', sourceId: 'minimax-m3-modelcard', harness: 'Video-MME (512 frames config)', effort: 'standard', toolsEnabled: true, snapshotDate: '2026-08-12', configuration: '512 frames', notes: 'Video-MME com 512 frames' }
      ],
      performanceProfile: {
        multimodal: 'strong',
        computerUse: 'strong',
        costEfficiency: 'excellent',
        throughput: 'strong',
        coding: 'mid-high',
        frontierReasoning: 'below-top-models'
      },
      strengths: [
        'Forte capacidade nativa de Computer Use no OSWorld (70.06% em 200 passos)',
        'Excelente compreensão de vídeos longos (Video-MME 84.6% em 512 frames)',
        'Suporte consolidado a MCP Atlas (74.2%)',
        'Throughput ágil (~99 tok/s) com preço competitivo ($0.30/$1.20)'
      ],
      weaknesses: [
        'Raciocínio lógico e matemático de fronteira moderado (AA 45)',
        'Terminal-Bench (66.0%) e SWE-Bench Pro (59.0%) inferiores aos modelos de ponta'
      ],
      bestFor: ['Agentes de desktop, navegação por GUI, automação de vídeo e Computer Use'],
      avoidFor: ['Desafios de engenharia de software complexa que exijam mais de 80% no Terminal-Bench'],
      sourceIds: ['minimax-m3-modelcard', 'aa-minimax-m3'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 16. MUSE SPARK 1.3 (Seções 86 a 89, 110)
    // ------------------------------------------------------------------------
    'muse-spark-1-3': {
      modelId: 'muse-spark-1-3',
      identity: {
        canonicalName: 'Muse Spark 1.3',
        family: 'meta-muse',
        provider: 'meta',
        providerName: 'Meta AI',
        releaseDate: '2026-08-30',
        status: 'production',
        openWeights: true,
        license: 'Meta Community License'
      },
      architecture: {
        architectureType: 'Frontier Dense/MoE Multimodal Nativo',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Full Attention Nativa com Thinking CoT'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Alta retenção multi-turn e raciocínio de contexto longo (AA-LCR 79%)',
        retrievalAccuracyScore: 92.5
      },
      modalities: {
        input: ['text', 'image', 'video'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 1.25,
        outputPerMillion: 4.25,
        cacheReadPerMillion: 0.15,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: true,
        proSubscriptionId: null
      },
      artificialAnalysis: {
        verifiedAt: '2026-09-02',
        efforts: {
          xhigh: { aaIndex: 61, outputSpeedTokS: 181.7, costPerTaskUsd: 0.55, totalOutputTokens: 100000000, ttftSeconds: 27.51 },
          max: { aaIndex: 62, outputSpeedTokS: null, costPerTaskUsd: null, totalOutputTokens: 120000000, ttftSeconds: null }
        },
        interpretation: 'Destaque absoluto do snapshot no XHigh: atinge AA 61 com velocidade live extraordinária de 181.7 tok/s por $0.55/tarefa. Modo Max limitado atinge AA 62.'
      },
      benchmarkSnapshots: [
        // AA Sub-benchmarks XHigh (Seção 88)
        { benchmarkId: 'tau3-banking', benchmarkVersion: '3.0', score: 47.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA Banking Harness', effort: 'xhigh', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'τ³ Banking XHigh independente' },
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 85.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA Agent Harness', effort: 'xhigh', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Terminal-Bench 2.1 XHigh' },
        { benchmarkId: 'gdpval-aa-v2', benchmarkVersion: '2.0', score: 1709, unit: 'elo', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA GDPval Harness', effort: 'xhigh', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'GDPval Elo XHigh' },
        { benchmarkId: 'critpt', benchmarkVersion: '1.0', score: 26.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA Science', effort: 'xhigh', toolsEnabled: false, snapshotDate: '2026-09-02', notes: 'CritPt XHigh' },
        { benchmarkId: 'gpqa-diamond', benchmarkVersion: '1.0', score: 94.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA Science', effort: 'xhigh', toolsEnabled: false, snapshotDate: '2026-09-02', notes: 'GPQA XHigh' },
        { benchmarkId: 'humanitys-last-exam', benchmarkVersion: '1.0', score: 47.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA HLE', effort: 'xhigh', toolsEnabled: false, snapshotDate: '2026-09-02', notes: 'HLE XHigh' },
        { benchmarkId: 'scicode', benchmarkVersion: '1.0', score: 59.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA Coding', effort: 'xhigh', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'SciCode XHigh' },
        { benchmarkId: 'aa-lcr', benchmarkVersion: '1.0', score: 79.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA Long Context', effort: 'xhigh', toolsEnabled: false, snapshotDate: '2026-09-02', notes: 'AA-LCR XHigh (79%)' },
        // AA Sub-benchmarks Max (Seção 88)
        { benchmarkId: 'tau3-banking', benchmarkVersion: '3.0', score: 52.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA Banking Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'τ³ Banking Max atinge impressionantes 52%' },
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 86.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA Agent Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'Terminal-Bench 2.1 Max' },
        { benchmarkId: 'gdpval-aa-v2', benchmarkVersion: '2.0', score: 1754, unit: 'elo', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA GDPval Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'GDPval Elo Max' },
        { benchmarkId: 'humanitys-last-exam', benchmarkVersion: '1.0', score: 49.0, unit: 'percent', sourceType: 'independent', sourceId: 'aa-muse-spark13', harness: 'AA HLE', effort: 'max', toolsEnabled: false, snapshotDate: '2026-09-02', notes: 'HLE Max' }
      ],
      performanceProfile: {
        intelligence: 'frontier',
        throughput: 'exceptional',
        costEfficiency: 'excellent-for-intelligence',
        tau3Banking: 'exceptional',
        ttft: 'poor',
        maxAvailability: 'limited-preview'
      },
      strengths: [
        'Um dos melhores pontos da fronteira: AA 61 combinando ~182 tok/s com $0.55/tarefa',
        'Performance recorde em banking e finanças no τ³ Banking (52% no Max e 47% no XHigh)',
        'Forte raciocínio de contexto longo no AA-LCR (79%) e GPQA Diamond (94%)',
        'Desconto de cache agressivo de 88%'
      ],
      weaknesses: [
        'TTFT extremamente longo no modo XHigh (27.51 segundos de latência inicial)',
        'Modo Max disponível apenas em preview limitado sem precificação pública final'
      ],
      bestFor: [
        'Operações bancárias, fluxos financeiros automatizados e raciocínio de alto throughput',
        'Sistemas assíncronos onde alta latência de primeiro token (TTFT) é tolerada'
      ],
      avoidFor: ['Aplicações de bate-papo interativo que demandem resposta instantânea no primeiro segundo'],
      sourceIds: ['meta-muse-spark13-eval', 'aa-muse-spark13'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 17. MUSE SPARK 1.3 CONTRIBUTOR (Seções 3, 90, 91, 127)
    // ------------------------------------------------------------------------
    'muse-spark-1-3-contributor': {
      modelId: 'muse-spark-1-3-contributor',
      identity: {
        canonicalName: 'Muse Spark 1.3 Contributor',
        family: 'meta-muse',
        provider: 'meta',
        providerName: 'Meta AI (via OpenCode Contributor)',
        releaseDate: '2026-09-01',
        status: 'observed-rollout',
        openWeights: true,
        license: 'Platform Contributor License',
        platformSku: true,
        relatedCanonicalModel: 'muse-spark-1-3',
        exactCheckpointVerified: false,
        benchmarkInheritance: false,
        docsLagPossible: true
      },
      architecture: {
        architectureType: 'SKU de Plataforma Distribuído',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 65536,
        attentionType: 'Hospedado por Contribuidores da Rede OpenCode'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Varia conforme o nó contribuidor na rede descentralizada',
        retrievalAccuracyScore: null
      },
      modalities: {
        input: ['text', 'code'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 0.80,
        outputPerMillion: 2.40,
        cacheReadPerMillion: null,
        currency: 'USD'
      },
      availability: {
        surfaces: ['opencode'],
        freeTierAvailable: false,
        proSubscriptionId: 'opencode-go-standard'
      },
      artificialAnalysis: {
        verifiedAt: null,
        efforts: null,
        interpretation: 'REGRA METROLÓGICA: Não herda automaticamente os escores do Muse Spark 1.3 oficial até verificação inequívoca de checkpoint exato.'
      },
      exactCheckpointVerified: false,
      benchmarkSnapshots: [],
      performanceProfile: {
        softwareEngineering: 'probable-strong',
        evidenceConfidence: 'preliminary',
        benchmarkInheritance: 'none'
      },
      strengths: [
        'Acesso através do pool de créditos flexíveis do ecossistema OpenCode',
        'Possível paridade arquitetural com o checkpoint oficial do Muse Spark 1.3'
      ],
      weaknesses: [
        'Sem garantias contratuais de paridade metrológica com o modelo Meta oficial',
        'Possível lag de documentação oficial do OpenCode Go (ainda listando 1.2)'
      ],
      bestFor: ['Testes de custo reduzido através de instâncias de contribuidores no OpenCode'],
      avoidFor: ['Auditorias rigorosas de conformidade que exijam checkpoint oficial verificado'],
      sourceIds: ['opencode-contributor-catalog'],
      verifiedAt: '2026-09-03'
    },

    // ------------------------------------------------------------------------
    // 18. CLAUDE FABLE 5.1 (Referência Canônica de Fronteira)
    // ------------------------------------------------------------------------
    'claude-fable-5-1': {
      modelId: 'claude-fable-5-1',
      identity: {
        canonicalName: 'Claude Fable 5.1',
        family: 'anthropic-claude',
        provider: 'anthropic',
        providerName: 'Anthropic',
        releaseDate: '2026-08-15',
        status: 'production',
        openWeights: false,
        license: 'Proprietary Anthropic'
      },
      architecture: {
        architectureType: 'Frontier Agentic Reasoning Flagship',
        paramsTotal: 'N/D',
        paramsActive: 'N/D',
        contextNativeTokens: 1000000,
        maxOutputTokens: 131072,
        attentionType: 'Full Attention com Extended Thinking'
      },
      context: {
        nominalTokens: 1000000,
        effectiveEvaluation: 'Liderança global em raciocínio agêntico e contexto multi-arquivo',
        retrievalAccuracyScore: 96.5
      },
      modalities: {
        input: ['text', 'image'],
        output: ['text']
      },
      pricing: {
        inputPerMillion: 6.00,
        outputPerMillion: 22.50,
        cacheReadPerMillion: 1.50,
        currency: 'USD'
      },
      availability: {
        surfaces: ['web', 'api', 'cursor', 'opencode'],
        freeTierAvailable: false,
        proSubscriptionId: 'anthropic-claude-pro'
      },
      artificialAnalysis: {
        verifiedAt: '2026-08-20',
        efforts: {
          max: { aaIndex: 66, outputSpeedTokS: 58.0, costPerTaskUsd: 1.25, totalOutputTokens: 90000000 }
        },
        interpretation: 'Líder global absoluto do Artificial Analysis Intelligence Index v4.1 (AA 66).'
      },
      benchmarkSnapshots: [
        { benchmarkId: 'terminal-bench-2-1', benchmarkVersion: '2.1', score: 91.4, unit: 'percent', sourceType: 'official', sourceId: 'anthropic-claude-fable-51', harness: 'Anthropic Agent Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'Liderança oficial Terminal-Bench 2.1 (91.4%)' },
        { benchmarkId: 'swe-bench-pro', benchmarkVersion: '1.0', score: 81.2, unit: 'percent', sourceType: 'official', sourceId: 'anthropic-claude-fable-51', harness: 'Anthropic Agent Platform', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'Liderança SWE-Bench Pro (81.2%)' },
        { benchmarkId: 'deep-swe-1-1', benchmarkVersion: '1.1', score: 71.5, unit: 'percent', sourceType: 'official', sourceId: 'anthropic-claude-fable-51', harness: 'Anthropic SWE Harness', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'DeepSWE oficial' },
        { benchmarkId: 'cursorbench-3-2', benchmarkVersion: '3.2', score: 73.4, unit: 'percent', sourceType: 'independent', sourceId: 'cursorbench-live-20260902', harness: 'Cursor Agent Loop', effort: 'max', toolsEnabled: true, snapshotDate: '2026-09-02', notes: 'CursorBench Live Max' },
        { benchmarkId: 'gpqa-diamond', benchmarkVersion: '1.0', score: 95.2, unit: 'percent', sourceType: 'official', sourceId: 'anthropic-claude-fable-51', harness: 'Anthropic Science', effort: 'max', toolsEnabled: false, snapshotDate: '2026-08-15', notes: 'GPQA Diamond' },
        { benchmarkId: 'hle-with-tools', benchmarkVersion: '1.0', score: 65.0, unit: 'percent', sourceType: 'official', sourceId: 'anthropic-claude-fable-51', harness: 'HLE with Tools', effort: 'max', toolsEnabled: true, snapshotDate: '2026-08-15', notes: 'HLE com ferramentas' }
      ],
      performanceProfile: {
        softwareEngineering: 'elite',
        terminal: 'elite',
        scientificReasoning: 'elite',
        longContext: 'elite',
        agenticPersistence: 'elite',
        costEfficiency: 'expensive'
      },
      strengths: [
        'Padrão ouro mundial em engenharia de software e raciocínio agêntico (AA 66)',
        'Líder no Terminal-Bench 2.1 (91.4%) e SWE-Bench Pro (81.2%)',
        'Altíssima taxa de conclusão em sessões multi-arquivo complexas'
      ],
      weaknesses: [
        'Custo mais elevado da categoria ($6/$22.50 por milhão)',
        'Disponível no Claude Pro apenas via créditos pré-pagos extras'
      ],
      bestFor: ['Arquitetura de sistemas críticos, refatorações globais e debugging frontier'],
      avoidFor: ['Tarefas de alto volume e baixo orçamento'],
      sourceIds: ['anthropic-claude-fable-51', 'cursorbench-live-20260902'],
      verifiedAt: '2026-09-03'
    }
  };

  // ==========================================
  // 4. DEEPSWE LEADERBOARD INDEPENDENTE (Seções 92 a 94)
  // Snapshot Oficial: 02/09/2026
  // ==========================================
  var DEEPSWE_INDEPENDENT_LEADERBOARD = [
    { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (XHigh)', score: 74.1, confidenceInterval: 2.9, costPerTaskUsd: 6.52, outputTokensPerTask: 30000, agentStepsPerTask: 55 },
    { modelId: 'gemini-3-8-flash', modelName: 'Gemini 3.8 Flash (High)', score: 74.0, confidenceInterval: 1.0, costPerTaskUsd: 2.36, outputTokensPerTask: 143000, agentStepsPerTask: 166 },
    { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (High)', score: 73.2, confidenceInterval: 3.5, costPerTaskUsd: 5.72, outputTokensPerTask: 27000, agentStepsPerTask: 52 },
    { modelId: 'gpt-6-astra', modelName: 'GPT-6 Astra (Max)', score: 73.2, confidenceInterval: 0.9, costPerTaskUsd: 12.37, outputTokensPerTask: 61000, agentStepsPerTask: 95 },
    { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol (Max)', score: 73.0, confidenceInterval: 3.0, costPerTaskUsd: 6.46, outputTokensPerTask: 60000, agentStepsPerTask: 61 },
    { modelId: 'glm-5-3', modelName: 'GLM-5.3 (Max)', score: 69.0, confidenceInterval: 3.0, costPerTaskUsd: 3.99, outputTokensPerTask: 80000, agentStepsPerTask: 124 },
    { modelId: 'kimi-k3', modelName: 'Kimi K3 (Max)', score: 69.0, confidenceInterval: 5.0, costPerTaskUsd: 4.65, outputTokensPerTask: 81000, agentStepsPerTask: 98 },
    { modelId: 'gpt-5-6-luna', modelName: 'GPT-5.6 Luna (Max)', score: 67.0, confidenceInterval: 4.0, costPerTaskUsd: 0.61, outputTokensPerTask: 73000, agentStepsPerTask: 102 },
    { modelId: 'grok-4-6', modelName: 'Grok 4.6 (XHigh)', score: 67.0, confidenceInterval: 2.0, costPerTaskUsd: 5.50, outputTokensPerTask: 71000, agentStepsPerTask: 87 },
    { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash (Max)', score: 63.0, confidenceInterval: 4.0, costPerTaskUsd: 0.24, outputTokensPerTask: 73000, agentStepsPerTask: 123 },
    { modelId: 'qwen3-8-max', modelName: 'Qwen3.8 Max (Max)', score: 57.0, confidenceInterval: 3.0, costPerTaskUsd: 3.73, outputTokensPerTask: 95000, agentStepsPerTask: 111 },
    { modelId: 'deepseek-v4-flash-0731', modelName: 'DeepSeek V4 Flash 0731 (Max)', score: 53.0, confidenceInterval: 4.0, costPerTaskUsd: 0.46, outputTokensPerTask: 108000, agentStepsPerTask: 153 }
  ];

  // ==========================================
  // 5. MÉTODOS AUXILIARES DE CONSULTA & METROLOGIA
  // ==========================================

  function getModelDossier(modelId) {
    if (!modelId) return null;
    var normId = modelId.toLowerCase().trim();
    if (normId === 'hy3' || normId === 'tencent-hy3') normId = 'hy3-tencent';
    if (normId === 'deepseek-v4-vision-exp') normId = 'deepseek-v4-flash-vision-exp';
    return MODEL_DOSSIERS_DATA[normId] || null;
  }

  function getDossierBenchmarkSnapshots(modelId, filterCategory) {
    var dossier = getModelDossier(modelId);
    if (!dossier || !Array.isArray(dossier.benchmarkSnapshots)) return [];

    if (!filterCategory || filterCategory === 'all') {
      return dossier.benchmarkSnapshots;
    }

    return dossier.benchmarkSnapshots.filter(function (snap) {
      var bench = BENCHMARK_REGISTRY[snap.benchmarkId];
      return bench && bench.category === filterCategory;
    });
  }

  function calculatePerformanceFingerprint(modelId) {
    var dossier = getModelDossier(modelId);
    if (!dossier) return {};

    var fp = {};
    var prof = dossier.performanceProfile || {};

    var categories = [
      { key: 'softwareEngineering', label: 'Engenharia de Software' },
      { key: 'terminal', label: 'Execução em Terminal' },
      { key: 'toolUse', label: 'Uso de Ferramentas / MCP' },
      { key: 'scientificReasoning', label: 'Raciocínio Científico' },
      { key: 'longContext', label: 'Retenção Long Context' },
      { key: 'multimodal', label: 'Compreensão Multimodal' },
      { key: 'cyber', label: 'Cibersegurança' },
      { key: 'throughput', label: 'Throughput / Velocidade' },
      { key: 'costEfficiency', label: 'Eficiência de Custo' }
    ];

    categories.forEach(function (cat) {
      var rawVal = prof[cat.key];
      if (!rawVal) {
        fp[cat.key] = { label: cat.label, rating: 'Unknown', cssClass: 'fp-unknown', description: 'Sem métrica factual' };
        return;
      }

      var rating = 'Average';
      var cssClass = 'fp-average';

      if (rawVal === 'elite' || rawVal === 'exceptional' || rawVal === 'frontier' || rawVal === 'very-strong') {
        rating = 'Excellent';
        cssClass = 'fp-excellent';
      } else if (rawVal === 'strong' || rawVal === 'target-focus' || rawVal === 'frontier-open-weight') {
        rating = 'Strong';
        cssClass = 'fp-strong';
      } else if (rawVal === 'medium' || rawVal === 'average' || rawVal === 'moderate') {
        rating = 'Average';
        cssClass = 'fp-average';
      } else if (rawVal === 'poor' || rawVal === 'weak' || rawVal === 'expensive' || rawVal === 'very-heavy' || rawVal === 'slow' || rawVal === 'below-top-models' || rawVal === 'below-current-frontier') {
        rating = 'Weak';
        cssClass = 'fp-weak';
      }

      fp[cat.key] = {
        label: cat.label,
        rating: rating,
        cssClass: cssClass,
        rawQualifier: rawVal
      };
    });

    return fp;
  }

  function getDeepSweLeaderboard(sortBy) {
    var list = DEEPSWE_INDEPENDENT_LEADERBOARD.map(function (item) {
      var costPerSolved = (item.score > 0 && item.costPerTaskUsd) ? (item.costPerTaskUsd / (item.score / 100)) : null;
      return {
        modelId: item.modelId,
        modelName: item.modelName,
        score: item.score,
        confidenceInterval: item.confidenceInterval,
        costPerTaskUsd: item.costPerTaskUsd,
        outputTokensPerTask: item.outputTokensPerTask,
        agentStepsPerTask: item.agentStepsPerTask,
        costPerSolvedTask: costPerSolved,
        derived: true,
        snapshotDate: '2026-09-02'
      };
    });

    if (sortBy === 'cost') {
      return list.sort(function (a, b) { return a.costPerTaskUsd - b.costPerTaskUsd; });
    }
    if (sortBy === 'tokens') {
      return list.sort(function (a, b) { return a.outputTokensPerTask - b.outputTokensPerTask; });
    }
    if (sortBy === 'steps') {
      return list.sort(function (a, b) { return a.agentStepsPerTask - b.agentStepsPerTask; });
    }
    if (sortBy === 'cost-per-solved') {
      return list.sort(function (a, b) { return (a.costPerSolvedTask || 999) - (b.costPerSolvedTask || 999); });
    }

    // Default: ordenar por score decrescente
    return list.sort(function (a, b) { return b.score - a.score; });
  }

  function getProvenanceBadge(sourceType) {
    if (sourceType === 'official') {
      return { code: 'O', label: 'Oficial Primária', cssClass: 'badge-source-official', title: 'Fonte oficial direta do desenvolvedor / laboratório' };
    }
    if (sourceType === 'vendor-reported') {
      return { code: 'V', label: 'Reportado p/ Fornecedor', cssClass: 'badge-source-vendor', title: 'Medição publicada pelo fornecedor sob harness proprietário' };
    }
    if (sourceType === 'independent') {
      return { code: 'T', label: 'Terceiros / Independente', cssClass: 'badge-source-independent', title: 'Avaliação independente de laboratório de terceiros (ex: AA, DataCurve)' };
    }
    if (sourceType === 'community') {
      return { code: 'C', label: 'Comunidade / Plataforma', cssClass: 'badge-source-community', title: 'Reportado por plataformas agregadoras ou operadores' };
    }
    return { code: 'E', label: 'Estimado / Calibrado', cssClass: 'badge-source-estimated', title: 'Estimativa metrológica devidamente sinalizada' };
  }

  return {
    BENCHMARK_REGISTRY: BENCHMARK_REGISTRY,
    SOURCE_REGISTRY: SOURCE_REGISTRY,
    MODEL_DOSSIERS_DATA: MODEL_DOSSIERS_DATA,
    DEEPSWE_INDEPENDENT_LEADERBOARD: DEEPSWE_INDEPENDENT_LEADERBOARD,
    getModelDossier: getModelDossier,
    getDossierBenchmarkSnapshots: getDossierBenchmarkSnapshots,
    calculatePerformanceFingerprint: calculatePerformanceFingerprint,
    getDeepSweLeaderboard: getDeepSweLeaderboard,
    getProvenanceBadge: getProvenanceBadge
  };
});
