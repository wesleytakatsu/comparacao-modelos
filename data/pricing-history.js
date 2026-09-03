/**
 * DATA PACK: HISTÓRICO DE PREÇOS & CONTROLE DE PROMOÇÕES (PRICE HISTORY)
 * Data de Referência: 03/09/2026
 */

const PRICE_HISTORY_DATA = {
  entries: [
    {
      id: 'price-gemini-38-flash',
      modelId: 'gemini-3-8-flash',
      modelName: 'Gemini 3.8 Flash',
      provider: 'google',
      currency: 'USD',
      events: [
        {
          type: 'promotional-launch',
          effectiveFrom: '2026-09-02',
          effectiveUntil: '2026-12-31',
          inputPerMillion: 0.75,
          outputPerMillion: 3.75,
          cacheReadPerMillion: 0.075,
          cacheWritePerMillion: null,
          isPromotional: true,
          notes: 'Tarifa de lançamento promocional válida até 31/12/2026.'
        },
        {
          type: 'scheduled-tariff',
          effectiveFrom: '2027-01-01',
          effectiveUntil: null,
          inputPerMillion: 1.50,
          outputPerMillion: 7.50,
          cacheReadPerMillion: 0.15,
          cacheStoragePerHour: 1.00,
          isPromotional: false,
          notes: 'Preço padrão permanente a vigorar a partir de 01/01/2027 conforme documentação oficial.'
        }
      ]
    },
    {
      id: 'price-claude-fable-5-1',
      modelId: 'claude-fable-5-1',
      modelName: 'Claude Fable 5.1',
      provider: 'anthropic',
      currency: 'USD',
      events: [
        {
          type: 'official-release',
          effectiveFrom: '2026-09-01',
          effectiveUntil: null,
          inputPerMillion: 10.00,
          outputPerMillion: 50.00,
          cacheReadPerMillion: 0.25,
          cacheWrite5Min: 12.50,
          cacheWrite1Hour: 20.00,
          isPromotional: false,
          notes: 'Cache Read 75% mais econômico que o Claude Fable 5 predecessor ($0,25/M vs $1,00/M).'
        }
      ]
    },
    {
      id: 'price-claude-fable-5',
      modelId: 'claude-fable-5',
      modelName: 'Claude Fable 5',
      provider: 'anthropic',
      currency: 'USD',
      events: [
        {
          type: 'historical-tariff',
          effectiveFrom: '2026-05-15',
          effectiveUntil: null,
          inputPerMillion: 10.00,
          outputPerMillion: 50.00,
          cacheReadPerMillion: 1.00,
          cacheWrite5Min: 12.50,
          cacheWrite1Hour: 20.00,
          isPromotional: false,
          notes: 'Tarifa padrão histórica do Fable 5 (atualmente em status superseded).'
        }
      ]
    },
    {
      id: 'price-glm-53-flash',
      modelId: 'glm-5-3-flash',
      modelName: 'GLM-5.3-Flash (ex-Ox Alpha)',
      provider: 'zai',
      currency: 'USD',
      events: [
        {
          type: 'stealth-free-preview',
          effectiveFrom: '2026-08-20',
          effectiveUntil: '2026-08-26',
          inputPerMillion: 0.00,
          outputPerMillion: 0.00,
          cacheReadPerMillion: 0.00,
          isPromotional: true,
          notes: 'Fase de preview anônimo gratuito como Ox Alpha no OpenRouter e OpenCode Go.'
        },
        {
          type: 'commercial-release-promo',
          effectiveFrom: '2026-08-26',
          effectiveUntil: '2026-09-30',
          inputPerMillion: 0.075,
          outputPerMillion: 0.25,
          cacheReadPerMillion: 0.02,
          isPromotional: true,
          notes: 'Desconto promocional de 50% pós-revelação oficial da Z.ai.'
        },
        {
          type: 'standard-list-price',
          effectiveFrom: '2026-10-01',
          effectiveUntil: null,
          inputPerMillion: 0.15,
          outputPerMillion: 0.50,
          cacheReadPerMillion: 0.03,
          isPromotional: false,
          notes: 'Preço de tabela regular de mercado da API Z.ai.'
        }
      ]
    },
    {
      id: 'price-gpt-56-sol',
      modelId: 'gpt-5-6-sol',
      modelName: 'GPT-5.6 Sol',
      provider: 'openai',
      currency: 'USD',
      events: [
        {
          type: 'standard-list-price',
          effectiveFrom: '2026-02-16',
          effectiveUntil: null,
          inputPerMillion: 4.00,
          outputPerMillion: 20.00,
          cacheReadPerMillion: 0.40,
          cacheWritePerMillion: 5.00,
          isPromotional: false,
          notes: 'Preço canônico vigente de $4/$20 por milhão de tokens.'
        }
      ]
    },
    {
      id: 'price-gpt-56-terra',
      modelId: 'gpt-5-6-terra',
      modelName: 'GPT-5.6 Terra',
      provider: 'openai',
      currency: 'USD',
      events: [
        {
          type: 'standard-list-price',
          effectiveFrom: '2026-02-16',
          effectiveUntil: null,
          inputPerMillion: 2.00,
          outputPerMillion: 12.00,
          cacheReadPerMillion: 0.20,
          cacheWritePerMillion: 2.50,
          isPromotional: false,
          notes: 'Preço de tabela para o tier balanceado do GPT-5.6.'
        }
      ]
    },
    {
      id: 'price-gpt-56-luna',
      modelId: 'gpt-5-6-luna',
      modelName: 'GPT-5.6 Luna',
      provider: 'openai',
      currency: 'USD',
      events: [
        {
          type: 'standard-list-price',
          effectiveFrom: '2026-02-16',
          effectiveUntil: null,
          inputPerMillion: 0.20,
          outputPerMillion: 1.20,
          cacheReadPerMillion: 0.02,
          cacheWritePerMillion: 0.25,
          isPromotional: false,
          notes: 'Preço ultra-econômico. Requisições acima de 272k tokens possuem multiplicador de 2x input / 1.5x output.'
        }
      ]
    }
  ],

  helpers: {
    getCurrentPricing(modelId, referenceDateStr = '2026-09-03') {
      const entry = PRICE_HISTORY_DATA.entries.find(e => e.modelId === modelId);
      if (!entry) return null;
      const refDate = new Date(referenceDateStr);

      // Encontrar evento ativo na data
      for (const ev of entry.events) {
        const fromDate = new Date(ev.effectiveFrom);
        const untilDate = ev.effectiveUntil ? new Date(ev.effectiveUntil) : null;

        if (refDate >= fromDate && (!untilDate || refDate <= untilDate)) {
          return { ...ev, currency: entry.currency };
        }
      }

      return entry.events[entry.events.length - 1];
    }
  }
};

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRICE_HISTORY_DATA };
}
