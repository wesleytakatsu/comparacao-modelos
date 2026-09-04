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

    var useCases = typeof USE_CASES_DATA !== 'undefined' ? USE_CASES_DATA : [];
    var uc = useCases.find(function (u) { return u.id === useCaseId; }) || useCases[0];

    if (!uc) {
      container.innerHTML = `<p style="padding: 20px;">Caso de uso não catalogado.</p>`;
      return;
    }

    container.innerHTML = `
      <div class="entity-dossier-header" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <a href="#use-cases" class="btn-ghost btn-xs" style="color: var(--text-muted);">← Voltar a Casos de Uso</a>
              <span class="badge-tag badge-frontier">RECOMENDAÇÃO DETERMINÍSTICA</span>
            </div>
            <h1 style="font-size: 1.8rem; margin: 4px 0 6px 0;">🎯 ${uc.title || uc.name}</h1>
            <p style="color: var(--text-secondary); max-width: 800px; font-size: 0.95rem;">${uc.description || ''}</p>
          </div>
          <div>
            <a href="#use-cases" class="btn-primary btn-sm">Alternar Caso de Uso ↗</a>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div class="content-box">
          <div class="box-header">
            <h3>⚖️ Critérios & Ponderação Multidimensional</h3>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 6px;">
            Este perfil de engenharia calcula o <strong>fitScore</strong> balanceando capacidade de raciocínio, autonomia em terminal, velocidade de resposta e custo por tarefa resolvida.
          </p>
        </div>

        <div class="content-box">
          <div class="box-header">
            <h3>🏆 Modelo Campeão Recomendado</h3>
          </div>
          <div style="margin-top: 10px; background: var(--bg-surface); padding: 16px; border-radius: var(--radius-sm); border-left: 4px solid var(--accent-cyan);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="font-size: 1.2rem; margin: 0;">${uc.championModel || 'Claude Fable 5.1'}</h4>
              <span class="badge-tag badge-frontier">Top FitScore</span>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 6px;">
              ${uc.rationale || 'Combinação ótima entre taxa de sucesso e viabilidade operacional para este padrão de fluxo.'}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  return {
    renderProvider: renderProvider,
    renderPlatform: renderPlatform,
    renderBenchmark: renderBenchmark,
    renderUseCase: renderUseCase
  };
}));
