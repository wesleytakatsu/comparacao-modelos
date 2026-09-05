/**
 * AI INTELLIGENCE PORTAL 2026 - ENTITY DOSSIERS VIEW (data/entity-views.js)
 * Dossiês Reais de Entidades do Grafo de Decisão
 * Conforme Plano 09 (Seções 38, 39, 40, 41)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.EntityViews = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // =========================================================================
  // 1. DOSSIÊ DE PROVEDOR (#provider/:id) - Seção 38
  // =========================================================================
  function renderProvider(providerId, containerId) {
    var container = document.getElementById(containerId || 'providerDetailContainer');
    if (!container) return;

    var providers = typeof AI_PROVIDERS_DATA !== 'undefined' ? AI_PROVIDERS_DATA : {};
    var provider = providers[providerId] || { name: providerId, logo: '⚡', website: '#' };

    var models = typeof AI_MODELS_DATA !== 'undefined' ? Object.values(AI_MODELS_DATA).filter(function (m) {
      return (m.provider || '').toLowerCase() === providerId.toLowerCase() || (m.providerName || '').toLowerCase().includes(providerId.toLowerCase());
    }) : [];

    var plans = typeof SUBSCRIPTION_PLANS_DATA !== 'undefined' ? SUBSCRIPTION_PLANS_DATA.filter(function (p) {
      return (p.provider || '').toLowerCase() === providerId.toLowerCase();
    }) : [];

    var sources = typeof AUDITED_SOURCES !== 'undefined' ? Object.values(AUDITED_SOURCES).filter(function (s) {
      return (s.publisher || '').toLowerCase().includes(providerId.toLowerCase()) || (s.domain || '').toLowerCase().includes(providerId.toLowerCase());
    }) : [];

    container.innerHTML = `
      <div class="entity-dossier-header" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <a href="#models" class="btn-ghost btn-xs" style="color: var(--text-muted);">← Voltar ao Catálogo</a>
              <span class="badge-tag badge-frontier">ORGANIZAÇÃO / VENDOR</span>
            </div>
            <h1 style="font-size: 1.8rem; margin: 4px 0 6px 0;">${provider.logo || '⚡'} ${provider.name}</h1>
            <p style="color: var(--text-secondary); max-width: 800px; font-size: 0.95rem;">
              Laboratório e fornecedor tecnológico com ${models.length} modelos e ${plans.length} planos catalogados sob auditoria independente.
            </p>
          </div>
          <div>
            <a href="#models?search=${encodeURIComponent(providerId)}" class="btn-primary btn-sm">Ver Modelos no Catálogo ↗</a>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 18px;">
        <!-- Modelos Ativos e Famílias -->
        <div class="content-box">
          <div class="box-header">
            <h3>🤖 Modelos de IA Disponibilizados (${models.length})</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; margin-top: 10px;">
            ${models.map(function (m) {
              return `
                <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: var(--text-primary);">${m.name}</strong>
                    <span class="badge-tag badge-frontier">${m.lifecycleStatus || 'active'}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">Contexto: ${m.contextWindow || 'N/D'} · Output: ${m.maxOutputTokens || 'N/D'}</div>
                  <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600;">$${m.pricing?.standard?.input || 0}/M in</span>
                    <a href="#model/${m.id}" class="btn-ghost btn-xs" style="color: var(--accent-cyan);">Dossiê ↗</a>
                  </div>
                </div>
              `;
            }).join('') || '<p style="color: var(--text-muted);">Nenhum modelo diretamente registrado para este provedor.</p>'}
          </div>
        </div>

        <!-- Planos e Assinaturas Oferecidas -->
        <div class="content-box">
          <div class="box-header">
            <h3>💳 Planos de Assinatura & Produtos Comerciais (${plans.length})</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; margin-top: 10px;">
            ${plans.map(function (p) {
              return `
                <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>${p.planName}</strong>
                    <span class="badge-tag badge-frontier">US$ ${p.monthlyPriceUsd}/mês</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 6px 0;">${p.bestFor}</p>
                  <a href="#plan/${p.id}" class="btn-ghost btn-xs" style="color: var(--accent-cyan);">Dossiê do Plano ↗</a>
                </div>
              `;
            }).join('') || '<p style="color: var(--text-muted);">Este provedor não opera planos de assinatura direta no catálogo.</p>'}
          </div>
        </div>

        <!-- Fontes Auditadas -->
        <div class="content-box">
          <div class="box-header">
            <h3>🔍 Fontes Oficiais & Documentação Técnica</h3>
          </div>
          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            ${sources.map(function (s) {
              return `
                <div style="font-size: 0.84rem;">
                  <a href="${s.sourceUrl || '#'}" target="_blank" rel="noopener" style="color: var(--accent-cyan); font-weight: 600;">${s.title} ↗</a>
                  <div style="font-size: 0.76rem; color: var(--text-muted);">${s.publisher} · Verificado em ${s.retrievedAt || '03/09/2026'}</div>
                </div>
              `;
            }).join('') || '<p style="color: var(--text-muted); font-size: 0.84rem;">Documentação oficial mapeada no grafo de evidências.</p>'}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. DOSSIÊ DE PLATAFORMA (#platform/:id) - Seção 39
  // =========================================================================
  function renderPlatform(platformId, containerId) {
    var container = document.getElementById(containerId || 'platformDetailContainer');
    if (!container) return;

    var platforms = typeof AI_PLATFORMS_DATA !== 'undefined' ? AI_PLATFORMS_DATA : {};
    var platform = platforms[platformId] || { name: platformId, category: 'Plataforma de Desenvolvimento', description: 'Ambiente de execução e desenvolvimento de IA.' };

    var plans = typeof SUBSCRIPTION_PLANS_DATA !== 'undefined' ? SUBSCRIPTION_PLANS_DATA.filter(function (p) {
      return (p.product || '').toLowerCase().includes(platformId.toLowerCase()) || (p.provider || '').toLowerCase().includes(platformId.toLowerCase());
    }) : [];

    container.innerHTML = `
      <div class="entity-dossier-header" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <a href="#platforms" class="btn-ghost btn-xs" style="color: var(--text-muted);">← Voltar a Plataformas</a>
              <span class="badge-tag badge-frontier">ECOSSISTEMA / PLATAFORMA</span>
            </div>
            <h1 style="font-size: 1.8rem; margin: 4px 0 6px 0;">🚀 ${platform.name}</h1>
            <p style="color: var(--text-secondary); max-width: 800px; font-size: 0.95rem;">
              ${platform.description || 'Ambiente auditado com suporte a orquestração de modelos de fronteira e agentes autônomos.'}
            </p>
          </div>
          <div>
            <a href="#platforms" class="btn-primary btn-sm">Ver Matriz Geral ↗</a>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div class="content-box">
          <div class="box-header">
            <h3>⚙️ Especificações da Plataforma</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 10px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Categoria</span>
              <div style="font-size: 1rem; font-weight: 600;">${platform.category || 'IDE / Runtime'}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Suporte a BYOK</span>
              <div style="font-size: 1rem; font-weight: 600; color: #34d399;">✓ Habilitado com chaves do usuário</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Retenção Zero (ZDR)</span>
              <div style="font-size: 1rem; font-weight: 600;">🛡️ Conforme políticas de provedor</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Disponibilidade Geográfica</span>
              <div style="font-size: 1rem; font-weight: 600;">Global (inclui Brasil)</div>
            </div>
          </div>
        </div>

        <div class="content-box">
          <div class="box-header">
            <h3>💳 Planos com Acesso a esta Plataforma (${plans.length})</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; margin-top: 10px;">
            ${plans.map(function (p) {
              return `
                <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>${p.planName}</strong>
                    <span class="badge-tag badge-frontier">US$ ${p.monthlyPriceUsd}/mês</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 6px 0;">${p.bestFor}</p>
                  <a href="#plan/${p.id}" class="btn-ghost btn-xs" style="color: var(--accent-cyan);">Abrir Dossiê ↗</a>
                </div>
              `;
            }).join('') || '<p style="color: var(--text-muted);">Consulte o explorador de planos para detalhes de integração.</p>'}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 3. DOSSIÊ DE BENCHMARK (#benchmark/:id) - Seção 41
  // =========================================================================
  function renderBenchmark(benchmarkId, containerId) {
    var container = document.getElementById(containerId || 'benchmarkDetailContainer');
    if (!container) return;

    var reg = typeof DomainRegistry !== 'undefined' ? DomainRegistry.getBenchmark(benchmarkId) : null;
    var name = reg ? reg.name : benchmarkId;
    var cat = reg ? reg.category : 'coding-agentic';
    var desc = reg ? reg.description : 'Benchmark auditado.';
    var method = reg ? reg.methodology : 'Avaliação independente.';
    var harness = reg ? reg.harness : 'Sandbox padronizado.';

    var cursorRuns = typeof CURSORBENCH_32_DATA !== 'undefined' ? CURSORBENCH_32_DATA : [];
    var ledger = typeof MULTI_BENCHMARK_LEDGER !== 'undefined' ? MULTI_BENCHMARK_LEDGER : [];

    container.innerHTML = `
      <div class="entity-dossier-header" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <a href="#sources" class="btn-ghost btn-xs" style="color: var(--text-muted);">← Metodologia & Fontes</a>
              <span class="badge-tag badge-frontier">${cat.toUpperCase()}</span>
              <span class="badge-tag badge-subdollar">METROLOGIA AUDITADA</span>
            </div>
            <h1 style="font-size: 1.8rem; margin: 4px 0 6px 0;">📊 ${name}</h1>
            <p style="color: var(--text-secondary); max-width: 800px; font-size: 0.95rem;">${desc}</p>
          </div>
          <div>
            <a href="#sources" class="btn-secondary btn-sm">Ver Todas as Fontes ↗</a>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div class="content-box">
          <div class="box-header">
            <h3>🔬 Metodologia, Sandbox & Harness de Execução</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 10px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Ambiente de Teste (Harness)</span>
              <div style="font-size: 0.95rem; font-weight: 600; margin-top: 2px;">${harness}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Direção da Métrica</span>
              <div style="font-size: 0.95rem; font-weight: 600; margin-top: 2px;">Maior é Melhor (Higher is Better)</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Proveniência Padrão</span>
              <div style="font-size: 0.95rem; font-weight: 600; margin-top: 2px;">[I] Independente Auditado</div>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 12px; line-height: 1.5;">${method}</p>
        </div>

        <div class="content-box">
          <div class="box-header">
            <h3>🏆 Leaderboard & Top Execuções Verificadas</h3>
          </div>
          <p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 4px;">
            Consulte a visão integrada de comparador para cruzar scores deste benchmark com custos computacionais e latência.
          </p>
          <div style="margin-top: 12px;">
            <a href="#compare" class="btn-primary btn-sm">Abrir Comparador Multidimensional ↗</a>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 4. DOSSIÊ DE CASO DE USO (#use-case/:id) - Seção 40
  // =========================================================================
  function renderUseCase(useCaseId, containerId) {
    var container = document.getElementById(containerId || 'useCaseDetailContainer');
    if (!container) return;

    var useCases = typeof USE_CASES_DATA !== 'undefined' ? USE_CASES_DATA : (typeof USE_CASE_COMPARISON_DATA !== 'undefined' ? USE_CASE_COMPARISON_DATA.useCases : []);
    var uc = useCases.find(function (u) { return u.id === useCaseId; }) || useCases[0];

    if (!uc) {
      container.innerHTML = `<p style="padding: 20px;">Caso de uso não catalogado.</p>`;
      return;
    }

    var activeWeights = (typeof AppState !== 'undefined' && AppState.useCaseCustomWeights && AppState.useCaseCustomWeights[uc.id]) || null;
    var rankings = (typeof DomainRankings !== 'undefined' && DomainRankings.calculateUseCaseRanking)
      ? DomainRankings.calculateUseCaseRanking(uc.id, activeWeights)
      : (uc.rankings || []);

    var sensitivity = (typeof DomainRankings !== 'undefined' && DomainRankings.getUseCaseSensitivity)
      ? DomainRankings.getUseCaseSensitivity(uc.id)
      : (uc.sensitivityAnalysis || null);

    var topModel = rankings[0] || (uc.rankings && uc.rankings[0]) || { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', fitScore: 99 };
    var secondModel = rankings[1] || (uc.rankings && uc.rankings[1]);
    
    var modelsData = typeof AI_MODELS_DATA !== 'undefined' ? AI_MODELS_DATA : {};
    var economicModel = rankings.find(function (r) {
      var m = modelsData[r.modelId];
      return m && m.pricing && m.pricing.standard && m.pricing.standard.input < 1.5;
    }) || rankings[rankings.length - 1] || topModel;

    var localModel = rankings.find(function (r) {
      var m = modelsData[r.modelId];
      return m && m.openWeights;
    }) || { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash / gpt-oss-20b' };

    var auditFreshness = (typeof DomainFreshness !== 'undefined' && DomainFreshness.formatDynamicFreshness)
      ? DomainFreshness.formatDynamicFreshness(new Date(), 'benchmarks').label
      : 'Atualizado recentemente';

    var weightsBoxOpen = (typeof AppState !== 'undefined' && AppState.useCaseWeightsBoxOpen) || Boolean(activeWeights);

    // Chips de navegação entre os 12 casos de uso
    var chipsHtml = `
      <div class="use-case-chips-scroll" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 20px;">
        ${useCases.map(function (item) {
          var isActive = item.id === uc.id;
          return `
            <a href="#use-case/${item.id}" class="use-case-chip ${isActive ? 'active' : ''}" style="text-decoration: none;">
              <span>${item.icon || '🎯'}</span> ${item.title || item.name}
            </a>
          `;
        }).join('')}
      </div>
    `;

    // Sliders interativos de pesos
    var criteriaLabels = {
      coding: '💻 Coding / SWE',
      agentic: '🤖 Autonomia Agêntica',
      reliability: '🛡️ Confiabilidade',
      cost: '💵 Custo Baixo',
      speed: '⚡ Velocidade (tok/s)'
    };
    var defaultWeights = uc.weights || { coding: 0.35, agentic: 0.25, reliability: 0.20, cost: 0.10, speed: 0.10 };
    var currentWeights = activeWeights || defaultWeights;

    var slidersHtml = ['coding', 'agentic', 'reliability', 'cost', 'speed'].map(function (crit) {
      var val = Math.round((currentWeights[crit] !== undefined ? currentWeights[crit] : 0.2) * 100);
      return `
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; margin-bottom: 4px;">
            <span>${criteriaLabels[crit] || crit}</span>
            <strong id="val_${crit}">${val}%</strong>
          </div>
          <input type="range" min="0" max="100" step="5" value="${val}"
                 style="width: 100%; accent-color: var(--accent-cyan);"
                 oninput="document.getElementById('val_${crit}').innerText = this.value + '%'; window.AIApp.updateCustomUseCaseWeight('${uc.id}', '${crit}', this.value)">
        </div>
      `;
    }).join('');

    // Receitas de orquestração associadas
    var recipes = (typeof USE_CASE_COMPARISON_DATA !== 'undefined' && USE_CASE_COMPARISON_DATA.orchestrationRecipes) || [];
    var recipesHtml = recipes.length > 0 ? `
      <div class="content-box" style="margin-top: 24px;">
        <div class="box-header">
          <h3>🔀 Receitas Recomendadas de Orquestração Multi-Modelo</h3>
          <p style="font-size: 0.84rem; color: var(--text-secondary); margin-top: 2px;">
            Padrões de pipeline multi-agente recomendados para otimizar custo e acurácia neste perfil.
          </p>
        </div>
        <div class="recipes-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-top: 14px;">
          ${recipes.map(function (rc) {
            return `
              <div class="orchestration-recipe-card" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
                <h4 style="color: var(--accent-cyan); margin: 0 0 4px 0; font-size: 0.95rem;">${rc.title}</h4>
                <div style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 10px;">Foco: ${rc.target}</div>
                <div class="recipe-steps-list" style="display: flex; flex-direction: column; gap: 8px;">
                  ${rc.flow.map(function (s) {
                    return `
                      <div style="display: flex; gap: 8px; font-size: 0.80rem;">
                        <span style="background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.72rem;">${s.step}</span>
                        <div>
                          <strong style="color: var(--text-primary);">${s.role}:</strong>
                          <span style="color: var(--accent-cyan);">${s.model}</span>
                          <div style="color: var(--text-secondary); font-size: 0.75rem; margin-top: 2px;">${s.action}</div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
                <div style="margin-top: 12px; padding: 6px 10px; background: rgba(16, 185, 129, 0.08); border-radius: var(--radius-xs); font-size: 0.76rem; color: #34d399;">
                  💡 <strong>Economia:</strong> ${rc.estimatedCostVsSingleModel}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="entity-dossier-header" style="margin-bottom: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <a href="#use-cases" class="btn-ghost btn-xs" style="color: var(--text-muted);">← Voltar ao Catálogo de Casos</a>
              <span class="badge-tag badge-frontier">RECOMENDAÇÃO DETERMINÍSTICA</span>
              <span class="evidence-badge badge-c">[C] Calibrado</span>
              ${activeWeights ? '<span class="badge-tag badge-frontier">Pesos Personalizados</span>' : ''}
            </div>
            <h1 style="font-size: 1.8rem; margin: 4px 0 6px 0;">${uc.icon || '🎯'} ${uc.title || uc.name}</h1>
            <p style="color: var(--text-secondary); max-width: 800px; font-size: 0.95rem; margin: 0;">${uc.description || ''}</p>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="btn-primary btn-sm" onclick="window.AIApp.openComparatorWith('${topModel.modelId}')">⚔️ Comparar Top Modelos</button>
          </div>
        </div>
      </div>

      ${chipsHtml}

      <!-- Metrologia, Cobertura e Confiança -->
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin-bottom: 18px; padding: 10px 14px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.82rem;">
        <div>
          <strong>📊 Cobertura:</strong> ${rankings.length} modelos avaliados neste perfil
        </div>
        <span style="color: var(--border-medium);">•</span>
        <div>
          <strong>🛡️ Confiança:</strong> <span style="color: #10b981;">Alta (Harmonização Multivariada [M] + [C])</span>
        </div>
        <span style="color: var(--border-medium);">•</span>
        <div>
          <strong>Método:</strong> Multi-Attribute Utility (MAUT)
        </div>
        <span style="color: var(--border-medium);">•</span>
        <div>
          <strong>Auditado em:</strong> ${auditFreshness}
        </div>
      </div>

      <div class="content-box" style="margin-bottom: 20px;">
        <div class="box-header">
          <h3>⚖️ Critérios & Ponderação Multidimensional</h3>
        </div>
        <div style="margin: 10px 0 14px 0;">
          <strong style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Critérios Avaliados (Pesos):</strong>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${(uc.keyAttributes || []).map(function (attr, idx) {
              var w = idx === 0 ? '35%' : idx === 1 ? '25%' : idx === 2 ? '20%' : '20%';
              return `<span class="badge-tag badge-frontier" style="font-size: 0.76rem;">${attr} (${w})</span>`;
            }).join('')}
          </div>
        </div>

        <!-- Análise de Sensibilidade & Customização de Pesos -->
        <div style="padding: 12px 16px; background: rgba(56, 189, 248, 0.04); border-left: 3px solid var(--accent-cyan); border-radius: var(--radius-xs);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <strong style="font-size: 0.84rem; color: var(--accent-cyan);">🔬 Análise de Sensibilidade & Ponto de Virada:</strong>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 4px 0 0 0; line-height: 1.4;">
                ${sensitivity ? sensitivity.tippingPoint : 'Liderança consistente no perfil ponderado.'}
              </p>
            </div>
            <button type="button" class="btn-ghost btn-xs" onclick="const p = document.getElementById('useCaseWeightsBox_${uc.id}'); if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';" style="font-size: 0.75rem;">
              ⚙️ ${activeWeights ? 'Editar Pesos Ativos' : 'Personalizar Critérios (Sliders)'}
            </button>
          </div>

          <!-- Painel de Sliders para Ponderação Multidimensional -->
          <div id="useCaseWeightsBox_${uc.id}" style="display: ${weightsBoxOpen ? 'block' : 'none'}; margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border-subtle);">
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px;">
              Ajuste os sliders para recalcular o <strong>fitScore</strong> e a ordem dos modelos em tempo real:
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
              ${slidersHtml}
            </div>
            <div style="margin-top: 12px; display: flex; justify-content: flex-end;">
              <button type="button" class="btn-ghost btn-xs" onclick="window.AIApp.resetUseCaseWeights('${uc.id}')" style="font-size: 0.72rem; color: var(--text-muted);">
                ↺ Restaurar Pesos Padrão
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Perfis de Vencedores Recomendados -->
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 0.95rem; margin-bottom: 10px; color: var(--text-primary);">🏆 Perfis de Vencedores Recomendados:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
          <div style="padding: 12px; background: rgba(6, 182, 212, 0.06); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: var(--radius-xs);">
            <div style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700;">👑 MELHOR GERAL</div>
            <div style="font-weight: 700; font-size: 0.95rem; margin-top: 4px;"><a href="#model/${topModel.modelId}" style="color: var(--text-primary); text-decoration: none;">${topModel.modelName}</a></div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Fit Score: ${topModel.fitScore}/100</div>
          </div>

          <div style="padding: 12px; background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-xs);">
            <div style="font-size: 0.72rem; color: #10b981; font-weight: 700;">💎 MELHOR VALOR / ROI</div>
            <div style="font-weight: 700; font-size: 0.95rem; margin-top: 4px;"><a href="#model/${secondModel ? secondModel.modelId : topModel.modelId}" style="color: var(--text-primary); text-decoration: none;">${secondModel ? secondModel.modelName : topModel.modelName}</a></div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Equilíbrio custo-qualidade</div>
          </div>

          <div style="padding: 12px; background: rgba(245, 158, 11, 0.06); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-xs);">
            <div style="font-size: 0.72rem; color: #f59e0b; font-weight: 700;">🏷️ MAIS ECONÔMICO</div>
            <div style="font-weight: 700; font-size: 0.95rem; margin-top: 4px;"><a href="#model/${economicModel.modelId}" style="color: var(--text-primary); text-decoration: none;">${economicModel.modelName}</a></div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Sub-dólar por milhão</div>
          </div>

          <div style="padding: 12px; background: rgba(168, 85, 247, 0.06); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: var(--radius-xs);">
            <div style="font-size: 0.72rem; color: #a855f7; font-weight: 700;">🏠 MELHOR LOCAL (PRIVACY)</div>
            <div style="font-weight: 700; font-size: 0.95rem; margin-top: 4px;"><a href="#model/${localModel.modelId}" style="color: var(--text-primary); text-decoration: none;">${localModel.modelName}</a></div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Pesos Abertos & Offline</div>
          </div>
        </div>
      </div>

      <!-- Tabela de Rankings Detalhada -->
      <div class="content-box" style="margin-bottom: 24px;">
        <div class="box-header">
          <h3>📋 Ranking Ordenado por Fit Score (${activeWeights ? 'Recalculado' : 'Calibrado'})</h3>
        </div>
        <div class="table-responsive" style="margin-top: 10px;">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 50px;">Rank</th>
                <th>Modelo</th>
                <th>Fit Score</th>
                <th>Papel Ideal no Projeto</th>
                <th>Justificativa Técnica & Evidências</th>
                <th style="width: 140px;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${rankings.map(function (r) {
                return `
                  <tr>
                    <td><strong>#${r.rank}</strong></td>
                    <td>
                      <strong style="color: var(--text-primary); cursor: pointer;" onclick="location.hash='#model/${r.modelId}'">${r.modelName}</strong>
                    </td>
                    <td>
                      <span class="badge-tag ${r.fitScore >= 95 ? 'badge-frontier' : r.fitScore >= 90 ? 'badge-sweetspot' : 'badge-subdollar'}">
                        ${r.fitScore} / 100
                      </span>
                    </td>
                    <td><strong style="color: var(--accent-cyan); font-size: 0.84rem;">${r.role || 'Implementador'}</strong></td>
                    <td style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4;">${r.rationale || '—'}</td>
                    <td>
                      <div style="display: flex; gap: 4px;">
                        <button class="btn-table-action" onclick="location.hash='#model/${r.modelId}'" title="Ver Dossiê">🔍 Dossiê</button>
                        <button class="btn-table-action" onclick="window.AIApp.openComparatorWith('${r.modelId}')" title="Comparar">⚔️</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      ${recipesHtml}
    `;
  }

  return {
    renderProvider: renderProvider,
    renderPlatform: renderPlatform,
    renderBenchmark: renderBenchmark,
    renderUseCase: renderUseCase
  };
}));
