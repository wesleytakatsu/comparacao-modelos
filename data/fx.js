/**
 * DATA PACK: CÂMBIO & CONVERSÃO MONETÁRIA (FX)
 * Snapshot de Referência: 03/09/2026
 */

const FX_RATES_DATA = {
  USD_BRL: {
    rate: 5.108,
    asOf: '2026-09-03',
    verifiedAt: '2026-09-03',
    type: 'mid-market-snapshot',
    officialPtax: false,
    notes: 'Snapshot de mercado para conversão indicativa de planos e tokens em USD para BRL. Não é taxa oficial PTAX.'
  },
  CNY_BRL: {
    rate: 0.7599,
    asOf: '2026-09-03',
    verifiedAt: '2026-09-03',
    type: 'mid-market-snapshot',
    officialPtax: false,
    notes: 'Snapshot de mercado para conversão de planos em Yuan Renminbi chinês (Kimi) para BRL.'
  },
  history: [
    { date: '2026-08-01', usd_brl: 5.1820, cny_brl: 0.7610 },
    { date: '2026-08-15', usd_brl: 5.1680, cny_brl: 0.7602 },
    { date: '2026-09-01', usd_brl: 5.1590, cny_brl: 0.7598 },
    { date: '2026-09-03', usd_brl: 5.1080, cny_brl: 0.7599 }
  ],
  disclaimer: 'Conversões em reais (R$) são indicativas baseadas no snapshot de mercado de 03/09/2026 (US$ 1 ≈ R$ 5,108). Preços oficiais localizados sempre prevalecem sobre a conversão direta. A cobrança final na fatura pode variar conforme impostos (IOF), taxas de emissor e spread cambial.'
};

const FX_HELPERS = {
  convertUsdToBrl(amountUsd) {
    if (typeof amountUsd !== 'number' || isNaN(amountUsd)) return 0;
    return amountUsd * FX_RATES_DATA.USD_BRL.rate;
  },

  convertCnyToBrl(amountCny) {
    if (typeof amountCny !== 'number' || isNaN(amountCny)) return 0;
    return amountCny * FX_RATES_DATA.CNY_BRL.rate;
  },

  convertCnyToUsd(amountCny) {
    if (typeof amountCny !== 'number' || isNaN(amountCny)) return 0;
    const brl = this.convertCnyToBrl(amountCny);
    return brl / FX_RATES_DATA.USD_BRL.rate;
  },

  formatCurrency(value, currency = 'BRL') {
    if (typeof value !== 'number' || isNaN(value)) return 'N/D';
    if (currency === 'BRL') {
      return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (currency === 'USD') {
      return `US$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (currency === 'CNY') {
      return `¥ ${value.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    }
    return `${currency} ${value.toFixed(2)}`;
  }
};

// Exportação universal (Browser + Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FX_RATES_DATA, FX_HELPERS };
}
