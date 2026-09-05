/**
 * AI INTELLIGENCE PORTAL 2026 - PLAN DOSSIER VIEW (data/plan-dossier.js)
 * Visualização Completa de Dossiê de Plano (#plan/:id) em 10 Seções
 * Conforme Plano 09 (Seções 35, 36, 37)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PlanDossierView = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function render(planId, containerId) {
    var container = document.getElementById(containerId || 'planDetailContainer');
    if (!container) return;

    var plans = typeof SUBSCRIPTION_PLANS_DATA !== 'undefined' ? SUBSCRIPTION_PLANS_DATA : [];
    var plan = plans.find(function (p) { return p.id === planId; });

    if (!plan) {
      container.innerHTML = `
        <div class="empty-state-box" style="padding: 40px; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
          <h3>Plano não encontrado</h3>
          <p style="color: var(--text-muted); margin-bottom: 16px;">O plano "${planId}" não existe no catálogo oficial ou foi descontinuado.</p>
          <a href="#plans" class="btn-primary btn-sm">← Voltar ao Catálogo de Planos</a>
        </div>
      `;
      return;
    }

    var fx = typeof FX_RATES_DATA !== 'undefined' ? FX_RATES_DATA : { usdPtax: 5.1556, cnyBrl: 0.7595 };
    var currency = (typeof AppState !== 'undefined' && AppState.planCurrency) || 'BRL';
    var dispPrice = typeof PlanExplorer !== 'undefined' ? PlanExplorer.getDisplayPrice(plan, currency, fx) : { text: '$' + plan.monthlyPriceUsd, subtext: '' };
    var varBilling = typeof PlanExplorer !== 'undefined' ? PlanExplorer.getPlanVariableBilling(plan) : { hasVariableCost: false, items: [] };

    var fresh = typeof DomainFreshness !== 'undefined'
      ? DomainFreshness.getFreshness(plan.verifiedAt || '2026-09-02', { domain: 'plans' })
      : { label: 'Recente', badgeClass: 'freshness-recent' };

    var isFav = (typeof AppState !== 'undefined' && AppState.planFavoritesList) ? AppState.planFavoritesList.includes(plan.id) : false;
    var isCmp = (typeof AppState !== 'undefined' && AppState.selectedPlanCompare) ? AppState.selectedPlanCompare.includes(plan.id) : false;

    // Model Access rows
    var modelRows = (plan.modelAccess || []).map(function (m) {
      var badgeMap = (typeof PlanExplorer !== 'undefined' && PlanExplorer.PLAN_UI_CONFIG && (PlanExplorer.PLAN_UI_CONFIG.accessBadges || (PlanExplorer.PLAN_UI_CONFIG.universalBadges && PlanExplorer.PLAN_UI_CONFIG.universalBadges.access))) || {};
      var badge = badgeMap[m.billingMode] || { label: m.billingMode || 'Padrão', class: 'badge-frontier' };
      var modelExists = typeof AI_MODELS_DATA !== 'undefined' && Boolean(AI_MODELS_DATA[m.modelId]);
      var modelCell = modelExists
        ? `<a href="#model/${m.modelId}" style="color: var(--accent-cyan); font-weight: 600; text-decoration: underline;" title="Abrir dossiê técnico de ${m.modelId}">${m.modelId} ↗</a>`
        : `<strong>${m.modelId}</strong>`;

      return `
        <tr>
          <td>${modelCell}</td>
          <td><span class="badge-tag badge-frontier">${m.surface || 'Geral'}</span></td>
          <td><span class="badge-tag ${badge.class}">${badge.label}</span></td>
          <td>${m.quotaPool || 'Pool Compartilhado'}</td>
          <td>${m.efforts || 'Todos'}</td>
          <td style="font-size: 0.76rem; color: var(--text-muted);">${m.notes || '—'}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <!-- Cabeçalho Canônico do Dossiê de Plano -->
      <div class="entity-dossier-header" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
              <a href="#plans" class="btn-ghost btn-xs" style="color: var(--text-muted);">← Catálogo de Planos</a>
              <span class="badge-tag badge-frontier">${plan.provider.toUpperCase()} • ${plan.product}</span>
              <span class="badge-tag ${plan.targetAudience === 'team' ? 'badge-warning' : 'badge-subdollar'}">
                ${plan.targetAudience === 'team' ? '👥 Assinatura Corporativa' : '👤 Assinatura Individual'}
              </span>
              <span class="badge-tag ${fresh.badgeClass}">${fresh.label}</span>
            </div>
            <h1 style="font-size: 1.8rem; margin: 4px 0 6px 0; color: var(--text-primary);">${plan.planName}</h1>
            <p style="color: var(--text-secondary); max-width: 800px; font-size: 0.95rem; line-height: 1.5;">${plan.bestFor}</p>
          </div>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <button class="btn-secondary btn-sm" onclick="window.AIApp.togglePlanFavorite('${plan.id}'); PlanDossierView.render('${plan.id}');">
              ${isFav ? '★ Salvo nos Favoritos' : '☆ Salvar Plano'}
            </button>
            <button class="btn-primary btn-sm" onclick="window.AIApp.togglePlanCompare('${plan.id}'); PlanDossierView.render('${plan.id}');">
              ${isCmp ? '✓ No Comparador' : '+ Comparar Plano'}
            </button>
          </div>
        </div>
      </div>

      <!-- GRID DE 10 SEÇÕES NORMATIVAS (Seção 37) -->
      <div class="plan-dossier-grid" style="display: flex; flex-direction: column; gap: 18px;">

        <!-- 1. Visão Geral & Posicionamento -->
        <div class="content-box">
          <div class="box-header">
            <h3>💡 1. Visão Geral & Arquitetura de Acesso</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 10px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Provedor Responsável</span>
              <div style="font-size: 1rem; font-weight: 600;"><a href="#provider/${plan.provider}" style="color: var(--accent-cyan); text-decoration: underline;">${plan.provider.toUpperCase()} ↗</a></div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Produto / Ecossistema</span>
              <div style="font-size: 1rem; font-weight: 600;">${plan.product}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Segmento de Público</span>
              <div style="font-size: 1rem; font-weight: 600;">${plan.targetAudience === 'team' ? 'Equipes / Organizações' : 'Desenvolvedor / Individual'}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Tags de Perfil</span>
              <div style="font-size: 0.85rem; margin-top: 2px;">${(plan.profileTags || []).map(t => `<span class="badge-tag badge-frontier" style="margin-right:4px;">${t}</span>`).join('')}</div>
            </div>
          </div>
        </div>

        <!-- 2. Preço & Conversão Cambial -->
        <div class="content-box">
          <div class="box-header">
            <h3>💵 2. Precificação, Moeda & Ciclos de Cobrança</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 10px;">
            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-xs);">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Mensalidade Efetiva</span>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-cyan);">${dispPrice.text}</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">${dispPrice.subtext}</div>
            </div>
            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-xs);">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Preço Base em Dólar</span>
              <div style="font-size: 1.5rem; font-weight: 700;">US$ ${plan.monthlyPriceUsd.toFixed(2)}</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">Cobrado mensalmente</div>
            </div>
            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-xs);">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Ciclo Anual</span>
              <div style="font-size: 1.5rem; font-weight: 700;">${plan.annualPriceMonthlyUsd ? `US$ ${plan.annualPriceMonthlyUsd.toFixed(2)}/mês` : 'Sem desconto anual'}</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">${plan.annualPriceMonthlyUsd ? 'Faturado anualmente' : 'Cobrança mensal recorrente'}</div>
            </div>
            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-xs);">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Preço Localizado Brasil</span>
              <div style="font-size: 1.5rem; font-weight: 700; color: ${plan.localizedPricing?.BRL ? '#34d399' : 'var(--text-secondary)'};">
                ${plan.localizedPricing?.BRL ? `R$ ${plan.localizedPricing.BRL.price.toFixed(2)}` : 'Conversão Ptax'}
              </div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">${plan.localizedPricing?.BRL ? '🇧🇷 Cobrança oficial em BRL' : 'Conversão aproximada sem IOF'}</div>
            </div>
          </div>
        </div>

        <!-- 3. Modelos Incluídos & Superfícies -->
        <div class="content-box">
          <div class="box-header">
            <h3>🧠 3. Modelos Incluídos & Modos de Acesso</h3>
          </div>
          <div class="table-responsive" style="margin-top: 10px;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Superfície</th>
                  <th>Cobrança</th>
                  <th>Pool de Franquia</th>
                  <th>Reasoning / Effort</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                ${modelRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. Recursos, Storage & Workspace -->
        <div class="content-box">
          <div class="box-header">
            <h3>☁️ 4. Recursos, Ferramentas & Armazenamento</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 10px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Superfícies Habilitadas</span>
              <div style="margin-top: 4px;">
                ${(plan.surfaces || []).map(s => `<span class="badge-tag badge-subdollar" style="margin-right: 4px;">${s}</span>`).join('') || '<span class="badge-tag badge-frontier">Web Chat</span>'}
              </div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Armazenamento Cloud Incluído</span>
              <div style="font-size: 1.05rem; font-weight: 600; margin-top: 4px;">
                ${plan.storage?.includedGb ? `${plan.storage.includedGb >= 1000 ? `${plan.storage.includedGb / 1000} TB` : `${plan.storage.includedGb} GB`} (${plan.storage.type})` : 'Nenhum storage incluído'}
              </div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Recursos Exclusivos</span>
              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
                ${(plan.features || []).join(' · ')}
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Cotas, Janelas & Limites -->
        <div class="content-box">
          <div class="box-header">
            <h3>⚡ 5. Franquia, Quotas & Janelas de Rate Limit</h3>
          </div>
          <p style="font-size: 0.9rem; margin-top: 6px; color: var(--text-primary); line-height: 1.5;">${plan.quotaDescription}</p>
          
          <!-- Faixa de Incerteza da Quota & Custo Efetivo (Seções 88 e 89) -->
          ${(plan.estReqMonth || plan.usageAllowanceUsd || plan.monthlyPriceUsd > 0) ? `
            <div style="margin-top: 12px; padding: 12px 14px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); font-size: 0.82rem;">
              <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                <div>
                  <span style="color: var(--text-muted);">Estimativa de Volume:</span>
                  <strong>${plan.estReqMonth ? `~${plan.estReqMonth.toLocaleString()} req/mês` : 'Cota Flexível'}</strong>
                  ${plan.estReqMonth ? `
                    <span style="color: var(--text-muted); margin-left: 6px;">
                      (Faixa provável: ${Math.round(plan.estReqMonth * 0.75).toLocaleString()}–${Math.round(plan.estReqMonth * 1.25).toLocaleString()} • <span class="badge-tag badge-subdollar" style="font-size: 0.7rem;">E · Estimado</span>)
                    </span>
                  ` : ''}
                </div>
                ${(plan.monthlyPriceUsd > 0 && plan.estReqMonth) ? `
                  <div>
                    <span style="color: var(--text-muted);">Custo Efetivo Estimado:</span>
                    <strong style="color: var(--accent-cyan);">$${(plan.monthlyPriceUsd / plan.estReqMonth).toFixed(4)} / req</strong>
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}

          <div style="margin-top: 8px; font-size: 0.82rem; color: var(--text-muted);">
            <strong>Previsibilidade Operacional:</strong> ${varBilling.predictable ? '✓ Custo fixo previsível sem surpresas' : `⚠ Custos variáveis: ${varBilling.items.join(', ')}`}
          </div>
        </div>

        <!-- 6. Custo Variável & Burn Rate -->
        <div class="content-box">
          <div class="box-header">
            <h3>🔥 6. Dinâmica de Consumo, Excedente & Burn Rate</h3>
          </div>
          <div style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.5;">
            ${plan.overageAllowed ? '<span style="color: #fbbf24; font-weight: 600;">⚠ Permite faturamento de excedente (overage) por token/tarefa pós-esgotamento de cota.</span>' : '<span style="color: #34d399; font-weight: 600;">✓ Sem cobrança de overage inesperado no cartão. Operação limitada por fila ou cooldown.</span>'}
          </div>
          ${plan.id.includes('opencode-go') ? `
            <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; padding: 12px 16px; margin-top: 10px; border-radius: var(--radius-xs); font-size: 0.84rem;">
              <strong>Queima de Franquia por Tier de Modelo (Burn Rate Canônico):</strong>
              <ul style="margin: 6px 0 0 18px; line-height: 1.6;">
                <li>🟢 <strong>Tier US$ 60</strong> → 1× burn (consumo normal 1:1)</li>
                <li>🟡 <strong>Tier US$ 30</strong> → 2× burn (consome 2× mais rápido da franquia)</li>
                <li>🔴 <strong>Tier US$ 15</strong> → 4× burn (consome 4× mais rápido)</li>
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- 7. Privacidade & Governança -->
        <div class="content-box">
          <div class="box-header">
            <h3>🔒 7. Privacidade, Treinamento & Governança</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 10px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Treinamento de Modelos</span>
              <div style="font-size: 0.95rem; font-weight: 600; margin-top: 2px;">
                ${plan.privacy?.noTrainingByDefault ? '🔒 Nenhum dado do cliente é usado para treino' : '⚠ Dados sujeitos a treino a menos que haja opt-out explícito'}
              </div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Zero Data Retention (ZDR)</span>
              <div style="font-size: 0.95rem; font-weight: 600; margin-top: 2px;">
                ${plan.privacy?.zeroDataRetentionContract ? '🛡️ Contrato formal de ZDR disponível' : 'Retenção padrão para conformidade e segurança'}
              </div>
            </div>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">${plan.privacyNotes || ''}</div>
        </div>

        <!-- 8. Histórico de Alterações -->
        <div class="content-box">
          <div class="box-header">
            <h3>📜 8. Histórico & Evolução do Plano</h3>
          </div>
          <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.5; margin-top: 6px;">
            ${plan.historyNotes || `Plano comercialmente ativo e mantido sob a linhagem oficial de ${plan.provider.toUpperCase()} (${plan.product}).`}
          </p>
        </div>

        <!-- 9. Alternativas & Stacks -->
        <div class="content-box">
          <div class="box-header">
            <h3>⚖️ 9. Alternativas & Stacks de Assinatura Recomendadas</h3>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 6px;">
            Explore este plano em conjunto com outros no nosso <strong>Planejador de Orçamento</strong> ou compare-o diretamente com outros ecossistemas.
          </p>
          <div style="margin-top: 10px;">
            <a href="#plans?tab=budget" class="btn-secondary btn-sm" style="margin-right: 8px;">💰 Abrir Planejador de Orçamento</a>
            <button class="btn-secondary btn-sm" onclick="window.AIApp.togglePlanCompare('${plan.id}'); location.hash='#plans?tab=compare';">
              ⚔️ Comparar com Outros Planos
            </button>
          </div>
        </div>

        <!-- 10. Fontes Auditadas & Rastreabilidade -->
        <div class="content-box">
          <div class="box-header">
            <h3>🔍 10. Fontes Auditadas & Rastreabilidade</h3>
          </div>
          <div style="margin-top: 8px; font-size: 0.85rem;">
            <strong>Documentação Oficial do Fornecedor:</strong>
            <div style="margin-top: 6px; display: flex; gap: 8px; flex-wrap: wrap;">
              ${Object.entries(plan.sources || {}).map(function (entry) {
                return `<a href="${entry[1]}" target="_blank" rel="noopener" class="btn-ghost btn-xs" style="color: var(--accent-cyan);">[${entry[0]}] ↗</a>`;
              }).join('')}
            </div>
            <div style="margin-top: 12px; font-size: 0.78rem; color: var(--text-muted);">
              Snapshot verificado via telemetria editorial independente. Última verificação: ${fresh.label}.
            </div>
          </div>
        </div>

      </div>
    `;
  }

  return {
    render: render
  };
}));
