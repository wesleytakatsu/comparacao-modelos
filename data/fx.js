/**
 * DATA PACK: CÂMBIO & CONVERSÃO MONETÁRIA (FX)
 * Snapshot de Referência: 03/09/2026
 */

const FX_RATES_DATA = {
  USD_BRL: {
    rate: 5.1556,
    asOf: '2026-09-03',
    type: 'market-snapshot',
    source: 'Banco Central do Brasil / Fechamento de Mercado Ptax',
    notes: 'Cotação de referência comercial para conversão aproximada de planos e tokens em USD para BRL.'
  },
  CNY_BRL: {
    rate: 0.7595,
    asOf: '2026-09-03',
    type: 'market-snapshot',
    source: 'Mercado de Câmbio Internacional (CNY/USD/BRL)',
    notes: 'Cotação para conversão de planos em Yuan Renminbi chinês (Kimi) para BRL.'
  },
  history: [
    { date: '2026-08-01', usd_brl: 5.1820, cny_brl: 0.7610 },
    { date: '2026-08-15', usd_brl: 5.1680, cny_brl: 0.7602 },
    { date: '2026-09-01', usd_brl: 5.1590, cny_brl: 0.7598 },
    { date: '2026-09-03', usd_brl: 5.1556, cny_brl: 0.7595 }
  ],
  disclaimer: 'Conversões em reais (R$) são aproximadas baseadas na cotação comercial de 03/09/2026 (US$ 1 = R$ 5,1556). A cobrança efetiva na fatura do usuário pode variar conforme preço oficial localizado, impostos federais/estaduais, IOF e taxas de spread cambial da operadora do cartão.'
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
