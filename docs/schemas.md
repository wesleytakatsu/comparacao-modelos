# 📑 Documentação Canônica de Schemas (Domínio v2)

> Conforme especificação normativa de `docs/prompts/09-prompt-layout.md` (Seções 16, 17, 18, 19, 80, 81).

Versão do Schema: `2.0.0` (Setembro/2026).

---

## 1. Model (Entidade Central do Modelo)
Identidade única e imutável do modelo no catálogo:
```typescript
interface Model {
  id: string;                      // Identificador canônico (e.g. 'claude-fable-5-1')
  name: string;                    // Nome de exibição principal
  providerId: string;              // Provedor criador (e.g. 'anthropic')
  providerName: string;            // Nome legível do provedor
  familyId: string;                // Linhagem arquitetural (e.g. 'anthropic-claude')
  releaseDate: string;             // Data ISO do anúncio oficial
  lifecycleStatus: 'active' | 'stable' | 'preview' | 'superseded' | 'legacy';
  contextWindow: number;           // Janela em tokens
  maxOutputTokens: number;         // Limite de saída em tokens
  openWeights: boolean;            // Se os pesos são abertos
  license?: string;                // Tipo de licença (e.g. 'MIT', 'Apache-2.0', 'Proprietary')
  pricing: {
    standard: { input: number; output: number };
    cachedRead?: number;
    cachedWrite?: number;
  };
  sources: string[];               // IDs de fontes auditadas
}
```

---

## 2. ModelConfiguration (Configurações de Execução)
Mapeamento explícito de variações de raciocínio e esforço computacional:
```typescript
interface ModelConfiguration {
  id: string;                      // e.g. 'claude-fable-5-1:max'
  modelId: string;                 // e.g. 'claude-fable-5-1'
  reasoningMode: 'adaptive' | 'explicit' | 'dynamic' | 'standard' | 'none';
  effort: 'none' | 'low' | 'medium' | 'high' | 'xhigh' | 'max';
  contextWindow: number;
  maxOutputTokens: number;
  temperature: number | null;
  tools: boolean;
  fallbackPolicy: string;
}
```

---

## 3. Offering (Ofertas & Rotas de Acesso)
Disponibilização de um modelo em plataformas comerciais ou abertas:
```typescript
interface Offering {
  id: string;                      // e.g. 'cursor:claude-fable-5-1'
  modelId: string;                 // e.g. 'claude-fable-5-1'
  providerId: string;              // e.g. 'anthropic'
  platformId: string;              // e.g. 'cursor'
  apiModelId: string;              // Nome na API/surface
  region: 'global' | 'us' | 'eu' | 'cn' | 'br';
  accessType: 'metered' | 'quota_burn' | 'pool_quota' | 'prepaid_credits' | 'flat_rate' | 'free_weights';
  multiplier?: number;             // Fator de queima de quota (e.g. 4x)
  availableFrom: string;
  availableUntil: string | null;
}
```

---

## 4. Benchmark (Definição da Suíte de Teste)
Registro canônico de testes e avaliações:
```typescript
interface Benchmark {
  id: string;                      // e.g. 'cursorbench-3.2'
  name: string;
  category: 'coding-agentic' | 'swe-reasoning' | 'terminal-cli' | 'general-composite' | 'math' | 'speed';
  direction: 'higher' | 'lower';
  scoreScale: 'percentage' | 'index' | 'tokens_per_second' | 'usd';
  provider: string;                // Harness/organização mantenedora
  methodology: string;
  primaryMetric: string;
  unit: string;
  verifiedAt: string;
}
```

---

## 5. BenchmarkRun (Execução Específica de Benchmark)
Fato metrológico reprodutível de uma medição com semente e configuração:
```typescript
interface BenchmarkRun {
  runId: string;                   // e.g. 'run-cb-fable-max-202608'
  modelId: string;
  benchmarkKey: string;
  score: number;
  metric: string;                  // e.g. 'pass@1', 'accuracy', 'index'
  reasoningEffort?: string;
  costPerTaskUsd?: number;
  tokensPerTask?: number;
  agentSteps?: number;
  evidence: {
    provenanceTier: 'O' | 'I' | 'C';
    nature: 'M' | 'D' | 'C' | 'A';
    sourceId: string;
  };
  executedAt: string;
}
```

---

## 6. Claim (Afirmação Técnica & Ciclo de Vida)
Afirmações com rastreabilidade formal e suporte a substituição (*superseded*):
```typescript
interface Claim {
  id: string;                      // e.g. 'claim-fable51-cursorbench-1'
  subjectType: 'model' | 'provider' | 'platform';
  subjectId: string;
  predicate: string;               // e.g. 'benchmark-leader'
  benchmarkId?: string;
  value: any;
  unit?: string;
  evidenceType: 'M' | 'D' | 'C' | 'A';
  provenanceType: 'O' | 'I' | 'C';
  sourceIds: string[];
  validFrom: string;
  validUntil: string | null;
  status: 'verified' | 'provisional' | 'superseded' | 'disputed';
  supersededByClaimId?: string;
  confidence: 'high' | 'medium' | 'low';
}
```

---

## 7. Plan (Plano de Assinatura)
Catálogo canônico de ofertas comerciais:
```typescript
interface Plan {
  id: string;                      // e.g. 'openai-pro'
  name: string;
  company: string;
  monthlyPrice: number;
  annualMonthlyPrice?: number;
  currency: 'USD' | 'BRL' | 'CNY';
  currencySymbol: string;
  category: 'individual' | 'team' | 'enterprise';
  modelAccess: Array<{
    modelId: string;
    accessType: 'unlimited' | 'quota' | 'burn_multiplier' | 'metered';
    multiplier?: number;
  }>;
  quotaDetails?: {
    frequency: string;
    requestLimit?: number;
    quotaUncertaintyRange?: string;
  };
  storageGb?: number;
  sources: string[];
}
```

---

## 8. Provider & Platform
Entidades operacionais e de infraestrutura:
```typescript
interface Provider {
  id: string;                      // e.g. 'anthropic'
  name: string;
  reputation: string;
  country: string;
  website: string;
}

interface Platform {
  id: string;                      // e.g. 'cursor'
  name: string;
  category: 'ide' | 'api' | 'cloud' | 'aggregator';
  pricingModel: 'subscription' | 'metered' | 'hybrid' | 'byok';
}
```

---

## 9. UseCase (Caso de Uso de Engenharia)
Receitas e ponderações para tomada de decisão:
```typescript
interface UseCase {
  id: string;                      // e.g. 'agentic-orchestration'
  title: string;
  icon: string;
  criteria: string[];
  weights: Record<string, number>;
  confidence: 'high' | 'medium' | 'provisional';
  sensitivityAnalysis?: {
    criticalWeight: string;
    tippingPointThreshold: number;
    challengerModelId: string;
  };
}
```
