/**
 * AI INTELLIGENCE PORTAL 2026 - APLICAÇÃO SPA & LÓGICA DE INTERATIVIDADE
 * Roteamento Hash, Motores de Cálculo, Gráficos Chart.js, Drawer & Command Palette
 */

(function () {
  'use strict';

  // ==========================================
  // 1. ESTADO GLOBAL DA APLICAÇÃO (APP STATE)
  // ==========================================
  const AppState = {
    currentRoute: 'dashboard',
    activeModelId: 'grok-4-6',
    activeDossierSubtab: 'tab-specs',
    activeBenchmarkMetric: 'score',
    activeBenchmarkPreset: 'all',
    showPointLabels: true,
    dashboardFilter: 'all',
    dashboardSearchQuery: '',
    modelsViewMode: 'table',
    comparatorActiveMode: 'specs',
    sourceSearchQuery: '',
    sourceTypeFilter: 'all',
    paretoAxis: 'score_vs_cost',
    selectedRadarModels: ['grok-4-6', 'gpt-5-6-sol', 'gpt-oss-20b', 'deepseek-v4-flash-0731'],
    comparatorModels: [],
    routerTask: 'feature_agent',
    routerBudget: 'balanced',
    routerPrivacy: 'public_cloud',
    commandPaletteFilter: 'all',
    commandSelectedIndex: 0,
    charts: {
      benchmarkMain: null,
      radar10d: null,
      paretoScatter: null
    },
    planActiveTab: 'plans',
    planCurrency: 'BRL',
    planBillingCycle: 'monthly',
    planSelectedCompanies: [],
    planMaxPrice: 250,
    planAudience: 'all',
    planProfile: 'all',
    planGrouping: 'company',
    planSort: 'default',
    planSearchQuery: '',
    filterPredictableOnly: false,
    filterByokOnly: false,
    filterApiIncluded: false,
    filterCloudStorageOnly: false,
    planPrivacyFilter: 'all',
    planSelectedModel: 'claude-fable-5-1',
    planBudgetValue: 200,
    planBudgetProfile: 'coding',
    selectedPlanCompare: [],
    planFavoritesList: (function() {
      try { return JSON.parse(localStorage.getItem('model_intel_favorite_plans') || '[]'); }
      catch(e) { return []; }
    })(),
    compareOnlyDifferences: false,
    comparatorOnlyDiffs: false,
    comparatorRefModelId: null,
    useCaseCustomWeights: {},
    expandedCompanies: { openai: true, anthropic: true, google: true, cursor: true, opencode: true, zai: true, xai: true, kimi: true, camelai: true },
    wizardStep: 1,
    wizardAnswers: { maxBudgetBrl: 250, audience: 'individual', primaryFocus: 'coding', priorityModel: 'any', requirePredictableCost: true },
    activeBudgetStack: 110,
    activeHistoryTab: 'lineages',
    activeTimelineFilter: 'all',
    activeUseCaseId: 'saas-system-architecture',
    activeCommunityTab: 'divergences',
    communitySearchQuery: '',
    platformSearchQuery: ''
  };

  // ==========================================
  // 2. INICIALIZAÇÃO & ROTEADOR HASH SPA
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRouter();
    initGlobalEvents();
    updateDynamicCounters();
    renderDynamicDashboardKpis();
    initEstimator();
    initVramCalculator();
    initRoiCalculator();
    initSimulator();
    initModelRouter();
    initCommandPalette();
    initBackToTop();
  });

  // ==========================================
  // HELPER DE TOKENS CSS DINÂMICOS
  // ==========================================
  function cssVar(name) {
    if (typeof window === 'undefined' || !document.documentElement) return '';
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // ==========================================
  // GESTÃO DE TEMA (DARK / LIGHT / SYSTEM)
  // ==========================================
  function getPreferredTheme() {
    const saved = localStorage.getItem('ai-portal-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function applyTheme(theme, save = true) {
    let effectiveTheme = theme;
    if (theme === 'system' || !theme) {
      effectiveTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.documentElement.style.colorScheme = effectiveTheme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', effectiveTheme === 'dark' ? '#0a0d14' : '#f4f6fb');
    }

    if (save) {
      if (theme === 'light' || theme === 'dark') {
        localStorage.setItem('ai-portal-theme', theme);
      } else if (theme === 'system') {
        localStorage.removeItem('ai-portal-theme');
      }
    }

    // Atualiza botão de toggle
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      const isDark = effectiveTheme === 'dark';
      toggleBtn.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
      toggleBtn.setAttribute('title', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    }

    // Re-renderizar gráficos da view ativa se existirem
    if (AppState.currentRoute === 'benchmarks') {
      renderBenchmarkExplorer();
    } else if (AppState.currentRoute === 'radar') {
      renderRadarView();
    } else if (AppState.currentRoute === 'pareto') {
      renderParetoView();
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
    showToast(nextTheme === 'dark' ? '🌙 Tema escuro ativado' : '☀️ Tema claro ativado');
  }

  function initTheme() {
    const current = getPreferredTheme();
    applyTheme(current, false);

    // Listener para preferência do sistema operacional
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        const saved = localStorage.getItem('ai-portal-theme');
        if (!saved || saved === 'system') {
          applyTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }
  }

  function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  function handleRoute() {
    const rawHash = window.location.hash.replace('#', '') || 'dashboard';
    const [pathPart, queryPart] = rawHash.split('?');
    const parts = pathPart.split('/');
    let route = parts[0];
    const param = parts[1] || null;

    // Aliases para máxima compatibilidade de links e especificações (Plano 08)
    if (route === 'models' || route === 'catalogo') route = 'models';
    if (route === 'compare') route = 'comparator';
    if (route === 'sources' || route === 'methodology' || route === 'metodologia') route = 'sources';
    if (route === 'radar') {
      AppState.comparatorActiveMode = 'radar';
      route = 'comparator';
    }
    if (route === 'pareto') {
      AppState.comparatorActiveMode = 'pareto';
      route = 'comparator';
    }
    if (route === 'aa-intelligence') route = 'artificial-analysis';
    if (route === 'troubleshooter') route = 'troubleshoot';
    if (route === 'antigravity') route = 'antigravity-pools';
    if (route === 'plans' || route === 'subscriptions') route = 'plans';
    if (route === 'history' || route === 'lineages' || route === 'timeline') route = 'history';
    if (route === 'use-cases' || route === 'projects' || route === 'stacks') route = 'use-cases';
    if (route === 'community' || route === 'behavior') route = 'community';
    if (route === 'platforms' || route === 'opencode' || route === 'availability') route = 'platforms';

    if (route === 'provider' && param) {
      // Dossiê Real de Provedor (Seção 38)
      route = 'provider';
    }
    if (route === 'platform') {
      if (param === 'antigravity') {
        route = 'antigravity-pools';
      } else if (param) {
        // Dossiê Real de Plataforma (Seção 39)
        route = 'platform';
      } else {
        route = 'platforms';
      }
    }

    if (route === 'plan' && param) {
      // Dossiê Real de Plano (Seções 35, 37)
      route = 'plan';
    }
    if (route === 'benchmark' && param) {
      // Dossiê Real de Benchmark (Seção 41)
      route = 'benchmark';
    }
    if (route === 'data-health') {
      // Painel de Data Health & Review Queue (Seção 43)
      route = 'data-health';
    }
    if (route === 'use-case' && param) {
      // Dossiê Completo de Caso de Uso (#use-case/:id - Seção 40)
      AppState.activeUseCaseId = param;
      route = 'use-case';
    } else if (route === 'use-case' || route === 'use-cases') {
      if (param) AppState.activeUseCaseId = param;
      if (queryPart) {
        const urlParams = new URLSearchParams(queryPart);
        if (urlParams.get('id') || urlParams.get('case')) {
          AppState.activeUseCaseId = urlParams.get('id') || urlParams.get('case');
        }
      }
      route = 'use-cases';
    }
    if (route === 'models' && queryPart) {
      const urlParams = new URLSearchParams(queryPart);
      if (urlParams.get('filter')) AppState.dashboardFilter = urlParams.get('filter');
      if (urlParams.get('search') || urlParams.get('q')) AppState.dashboardSearchQuery = (urlParams.get('search') || urlParams.get('q')).toLowerCase();
      if (urlParams.get('view') || urlParams.get('mode')) AppState.modelsViewMode = urlParams.get('view') || urlParams.get('mode');
    }
    if (route === 'calculator') {
      let targetModel = param;
      if (!targetModel && queryPart) {
        const urlParams = new URLSearchParams(queryPart);
        targetModel = urlParams.get('model') || urlParams.get('id');
      }
      if (targetModel && AI_MODELS_DATA[targetModel]) {
        sessionStorage.setItem('lastInspectedModelId', targetModel);
      }
    }

    // Suporte a Query Params do Comparador (#compare?mode=...&models=...)
    if (route === 'comparator' && queryPart) {
      const urlParams = new URLSearchParams(queryPart);
      if (urlParams.get('mode') || urlParams.get('view')) {
        AppState.comparatorActiveMode = urlParams.get('mode') || urlParams.get('view');
      }
      if (urlParams.get('models')) {
        const mIds = urlParams.get('models').split(',').filter(Boolean);
        if (mIds.length > 0) {
          AppState.comparatorModels = [mIds[0] || '', mIds[1] || '', mIds[2] || '', mIds[3] || ''];
        }
      }
    }

    AppState.currentRoute = route;

    // Suporte a Deep Links na Rota de Planos & Assinaturas (Seções 61, 62, 63)
    if (route === 'plans') {
      if (parts[1] === 'company' && parts[2]) {
        AppState.planActiveTab = 'plans';
        AppState.planSelectedCompanies = [parts[2].toLowerCase()];
      } else if (parts[1] === 'model' && parts[2]) {
        AppState.planActiveTab = 'models';
        AppState.planSelectedModel = parts[2].toLowerCase();
      } else if (parts[1] === 'plan' && parts[2]) {
        AppState.planActiveTab = 'plans';
        setTimeout(() => openPlanDetailsModal(parts[2]), 100);
      } else if (parts[1] === 'compare') {
        AppState.planActiveTab = 'compare';
      } else if (queryPart) {
        const urlParams = new URLSearchParams(queryPart);
        if (urlParams.get('tab')) AppState.planActiveTab = urlParams.get('tab');
        if (urlParams.get('company')) AppState.planSelectedCompanies = [urlParams.get('company').toLowerCase()];
        if (urlParams.get('model')) {
          AppState.planActiveTab = 'models';
          AppState.planSelectedModel = urlParams.get('model');
        }
        if (urlParams.get('id') || urlParams.get('plan')) {
          AppState.planActiveTab = 'plans';
          const pId = urlParams.get('id') || urlParams.get('plan');
          setTimeout(() => openPlanDetailsModal(pId), 100);
        }
        if (urlParams.get('compare') || urlParams.get('ids')) {
          AppState.planActiveTab = 'compare';
          const compareStr = urlParams.get('compare') || urlParams.get('ids');
          const ids = compareStr.split(',').filter(Boolean);
          if (ids.length) AppState.selectedPlanCompare = ids;
        }
      }
    }

    // Atualiza links da sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      const isMatch = (linkRoute === route) || 
                      (route === 'model' && (linkRoute === 'models' || linkRoute === 'dashboard')) ||
                      (route === 'models' && linkRoute === 'models') ||
                      (route === 'comparator' && (linkRoute === 'compare' || linkRoute === 'comparator')) ||
                      (route === 'sources' && linkRoute === 'sources') ||
                      (route === 'artificial-analysis' && (linkRoute === 'aa-intelligence' || linkRoute === 'artificial-analysis')) ||
                      (route === 'troubleshoot' && (linkRoute === 'troubleshooter' || linkRoute === 'troubleshoot')) ||
                      (route === 'antigravity-pools' && (linkRoute === 'antigravity' || linkRoute === 'antigravity-pools')) ||
                      (route === 'plans' && linkRoute === 'plans') ||
                      (route === 'history' && linkRoute === 'history') ||
                      (route === 'use-cases' && linkRoute === 'use-cases') ||
                      (route === 'community' && linkRoute === 'community') ||
                      (route === 'platforms' && linkRoute === 'platforms');
      if (isMatch) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        const parentZone = link.closest('details.nav-zone');
        if (parentZone) {
          parentZone.setAttribute('open', '');
        }
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // Fecha gaveta se estiver aberta
    closeQuickInspector();

    // Oculta todas as views e exibe a view ativa
    document.querySelectorAll('.spa-view').forEach(view => {
      view.classList.remove('active');
    });

    // Rota Especial: Dossiê do Modelo (Seção 8)
    if (route === 'model' && param) {
      if (param === 'ox-alpha' || param === 'stealth-ox-alpha' || param === 'stealth/ox-alpha') {
        location.hash = '#model/glm-5-3-flash';
        return;
      }
      AppState.activeModelId = param;
      const detailView = document.getElementById('view-model-detail');
      if (detailView) {
        detailView.classList.add('active');
        renderModelDossier(param);
      }
      window.scrollTo(0, 0);
      return;
    }

    // Rota Especial: Dossiê Completo de Plano (Seções 35, 37)
    if (route === 'plan' && param) {
      const planDetailView = document.getElementById('view-plan-detail');
      if (planDetailView) {
        planDetailView.classList.add('active');
        if (typeof PlanDossierView !== 'undefined' && PlanDossierView.render) {
          PlanDossierView.render(param);
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Rota Especial: Dossiê de Provedor (Seção 38)
    if (route === 'provider' && param) {
      const provView = document.getElementById('view-provider-detail');
      if (provView) {
        provView.classList.add('active');
        if (typeof EntityViews !== 'undefined' && EntityViews.renderProvider) {
          EntityViews.renderProvider(param);
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Rota Especial: Dossiê de Plataforma (Seção 39)
    if (route === 'platform' && param && param !== 'antigravity') {
      const platView = document.getElementById('view-platform-detail');
      if (platView) {
        platView.classList.add('active');
        if (typeof EntityViews !== 'undefined' && EntityViews.renderPlatform) {
          EntityViews.renderPlatform(param);
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Rota Especial: Dossiê de Benchmark (Seção 41)
    if (route === 'benchmark' && param) {
      const benchView = document.getElementById('view-benchmark-detail');
      if (benchView) {
        benchView.classList.add('active');
        if (typeof EntityViews !== 'undefined' && EntityViews.renderBenchmark) {
          EntityViews.renderBenchmark(param);
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Rota Especial: Dossiê de Caso de Uso (Seção 40)
    if (route === 'use-case' && param) {
      const ucView = document.getElementById('view-use-case-detail');
      if (ucView) {
        ucView.classList.add('active');
        if (typeof EntityViews !== 'undefined' && EntityViews.renderUseCase) {
          EntityViews.renderUseCase(param);
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Rota Especial: Data Health & Review Queue (Seção 43)
    if (route === 'data-health') {
      const healthView = document.getElementById('view-data-health');
      if (healthView) {
        healthView.classList.add('active');
        if (typeof DataHealthView !== 'undefined' && DataHealthView.render) {
          DataHealthView.render();
        }
      }
      window.scrollTo(0, 0);
      return;
    }

    // Rotas Padrão
    const targetView = document.getElementById(`view-${route}`);
    if (targetView) {
      targetView.classList.add('active');
      renderRouteContent(route);
    } else {
      // Fallback para dashboard
      const dashboardView = document.getElementById('view-dashboard');
      if (dashboardView) dashboardView.classList.add('active');
      renderRouteContent('dashboard');
    }

    window.scrollTo(0, 0);
  }

  function renderRouteContent(route) {
    switch (route) {
      case 'dashboard':
        renderDashboardHome();
        updateEstimatorResults();
        break;
      case 'models':
        renderModelsCatalog();
        break;
      case 'comparator':
        renderComparatorUnified();
        break;
      case 'sources':
        renderSourcesView();
        break;
      case 'plans':
        renderPlansView();
        break;
      case 'history':
        renderHistoryView();
        break;
      case 'use-cases':
        renderUseCasesView();
        break;
      case 'community':
        renderCommunityView();
        break;
      case 'platforms':
        renderPlatformsView();
        break;
      case 'providers':
        renderProvidersGrid();
        break;
      case 'artificial-analysis':
        renderArtificialAnalysisView();
        break;
      case 'benchmarks':
        renderBenchmarkExplorer();
        renderMultiBenchmarkLedger();
        break;
      case 'radar':
        renderRadarView();
        break;
      case 'pareto':
        renderParetoView();
        break;
      case 'comparator':
        renderComparatorView();
        break;
      case 'calculator':
        const lastId = sessionStorage.getItem('lastInspectedModelId');
        const calcSel = document.getElementById('calcModelSelect');
        if (lastId && calcSel && AI_MODELS_DATA[lastId]) {
          calcSel.value = lastId;
        }
        updateVramCalculation();
        renderHardwareWorkstationsTable();
        break;
      case 'simulator':
        updateSimulatorCalculation();
        renderStandardizedWorkloadsTable();
        renderVisionComparisonTable();
        break;
      case 'roi':
        updateRoiCalculation();
        break;
      case 'router':
        updateRouterResult();
        break;
      case 'harnesses':
        renderHarnessMatrix();
        renderCliSnippets();
        break;
      case 'troubleshoot':
        renderTroubleshooter();
        break;
      case 'privacy':
        renderPrivacyTable();
        break;
      case 'antigravity-pools':
        renderAntigravityPoolsView();
        break;
    }
  }

  // ==========================================
  // 3. EVENTOS GLOBAIS & INTERATIVIDADE
  // ==========================================
  function initGlobalEvents() {
    // Menu Mobile
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('appSidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    if (mobileBtn && sidebar && sidebarBackdrop) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarBackdrop.classList.toggle('open');
      });

      sidebarBackdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarBackdrop.classList.remove('open');
      });

      // Fecha a sidebar automaticamente ao clicar em qualquer item no mobile
      sidebar.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 860) {
            sidebar.classList.remove('open');
            sidebarBackdrop.classList.remove('open');
          }
        });
      });

      // Persistência das Zonas Recolhíveis da Sidebar
      try {
        const savedZones = JSON.parse(localStorage.getItem('ai-portal-nav-open') || '{}');
        sidebar.querySelectorAll('details.nav-zone').forEach(zone => {
          if (savedZones[zone.id]) {
            zone.setAttribute('open', '');
          }
          zone.addEventListener('toggle', () => {
            try {
              const current = JSON.parse(localStorage.getItem('ai-portal-nav-open') || '{}');
              current[zone.id] = zone.open;
              localStorage.setItem('ai-portal-nav-open', JSON.stringify(current));
            } catch (e) {}
          });
        });
      } catch (e) {}
    }

    // Listener Único Delegado para o Grid de KPIs do Dashboard
    const kpiGrid = document.querySelector('.kpi-grid');
    if (kpiGrid) {
      kpiGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.kpi-card');
        if (card) {
          const modelId = card.getAttribute('data-model-id');
          if (modelId) openQuickInspector(modelId);
        }
      });
      kpiGrid.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const card = e.target.closest('.kpi-card');
          if (card) {
            e.preventDefault();
            const modelId = card.getAttribute('data-model-id');
            if (modelId) openQuickInspector(modelId);
          }
        }
      });
    }

    // ----------------------------------------------------
    // Eventos das Novas Views (Planos, Histórico, Casos de Uso, Comunidade, Plataformas)
    // ----------------------------------------------------
    // Eventos do Explorador de Planos, Modelos & Orçamento (06)
    // ----------------------------------------------------
    // 1. Abas Principais do Explorador
    const planExplorerTabs = document.getElementById('planExplorerTabs');
    if (planExplorerTabs) {
      planExplorerTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (btn) {
          const tab = btn.getAttribute('data-tab');
          if (tab) {
            AppState.planActiveTab = tab;
            renderPlansView();
          }
        }
      });
    }

    // 2. Alternador de Moeda dos Planos (BRL / USD / DUAL)
    const currencyGroup = document.getElementById('currencyToggleGroup');
    if (currencyGroup) {
      currencyGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toggle');
        if (btn) {
          currencyGroup.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          AppState.planCurrency = btn.getAttribute('data-currency');
          renderPlansView();
        }
      });
    }

    // 3. Toggle de Ciclo de Cobrança (Mensal / Anual)
    const billingCycleGroup = document.getElementById('billingCycleToggleGroup');
    if (billingCycleGroup) {
      billingCycleGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toggle');
        if (btn) {
          billingCycleGroup.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          AppState.planBillingCycle = btn.getAttribute('data-cycle');
          renderPlansView();
        }
      });
    }

    // 4. Filtros de Planos (Público, Perfil, Busca, Agrupamento e Ordenação)
    const planAudienceSel = document.getElementById('planAudienceFilter');
    if (planAudienceSel) {
      planAudienceSel.addEventListener('change', (e) => {
        AppState.planAudience = e.target.value;
        renderPlansView();
      });
    }
    const planProfileSel = document.getElementById('planProfileFilter');
    if (planProfileSel) {
      planProfileSel.addEventListener('change', (e) => {
        AppState.planProfile = e.target.value;
        renderPlansView();
      });
    }
    const planPrivacySel = document.getElementById('planPrivacyFilter');
    if (planPrivacySel) {
      planPrivacySel.addEventListener('change', (e) => {
        AppState.planPrivacyFilter = e.target.value;
        renderPlansView();
      });
    }
    const planGroupingSel = document.getElementById('planGroupingSelect');
    if (planGroupingSel) {
      planGroupingSel.addEventListener('change', (e) => {
        AppState.planGrouping = e.target.value;
        renderPlansView();
      });
    }
    const planSortSel = document.getElementById('planSortSelect');
    if (planSortSel) {
      planSortSel.addEventListener('change', (e) => {
        AppState.planSort = e.target.value;
        renderPlansView();
      });
    }
    const planSearchInp = document.getElementById('planSearchInput');
    if (planSearchInp) {
      planSearchInp.addEventListener('input', (e) => {
        AppState.planSearchQuery = e.target.value;
        renderPlansView();
      });
    }

    // Slider de Preço & Presets
    const planPriceSlider = document.getElementById('planPriceSlider');
    const priceSliderValLabel = document.getElementById('priceSliderCurrentVal');
    if (planPriceSlider) {
      planPriceSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        AppState.planMaxPrice = val;
        if (priceSliderValLabel) {
          priceSliderValLabel.textContent = val >= 250 ? 'Sem limite' : `Até US$ ${val}`;
        }
        renderPlansView();
      });
    }
    const pricePresetsContainer = document.getElementById('pricePresetsPills');
    if (pricePresetsContainer) {
      pricePresetsContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (pill) {
          pricePresetsContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          const pVal = pill.getAttribute('data-price');
          if (pVal === 'all') {
            AppState.planMaxPrice = 250;
            if (planPriceSlider) planPriceSlider.value = 250;
            if (priceSliderValLabel) priceSliderValLabel.textContent = 'Sem limite';
          } else {
            const num = parseInt(pVal, 10);
            AppState.planMaxPrice = num;
            if (planPriceSlider) planPriceSlider.value = num;
            if (priceSliderValLabel) priceSliderValLabel.textContent = num === 0 ? 'Grátis' : `Até US$ ${num}`;
          }
          renderPlansView();
        }
      });
    }

    // Toggles de Recursos
    const filterPredictable = document.getElementById('filterPredictableOnly');
    if (filterPredictable) {
      filterPredictable.addEventListener('change', (e) => {
        AppState.filterPredictableOnly = e.target.checked;
        renderPlansView();
      });
    }
    const filterByok = document.getElementById('filterByokOnly');
    if (filterByok) {
      filterByok.addEventListener('change', (e) => {
        AppState.filterByokOnly = e.target.checked;
        renderPlansView();
      });
    }
    const filterApi = document.getElementById('filterApiIncluded');
    if (filterApi) {
      filterApi.addEventListener('change', (e) => {
        AppState.filterApiIncluded = e.target.checked;
        renderPlansView();
      });
    }
    const filterCloud = document.getElementById('filterCloudStorageOnly');
    if (filterCloud) {
      filterCloud.addEventListener('change', (e) => {
        AppState.filterCloudStorageOnly = e.target.checked;
        renderPlansView();
      });
    }

    // Botão Limpar Filtros
    const btnResetFilters = document.getElementById('btnResetAllFilters');
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', () => {
        resetAllPlanFilters();
      });
    }

    // Expandir / Recolher Todas as Empresas
    const btnExpandAll = document.getElementById('btnExpandAllCompanies');
    if (btnExpandAll) {
      btnExpandAll.addEventListener('click', () => {
        if (typeof PlanExplorer !== 'undefined') {
          PlanExplorer.PLAN_UI_CONFIG.companiesOrder.forEach(c => AppState.expandedCompanies[c] = true);
        }
        renderPlansView();
      });
    }
    const btnCollapseAll = document.getElementById('btnCollapseAllCompanies');
    if (btnCollapseAll) {
      btnCollapseAll.addEventListener('click', () => {
        if (typeof PlanExplorer !== 'undefined') {
          PlanExplorer.PLAN_UI_CONFIG.companiesOrder.forEach(c => AppState.expandedCompanies[c] = false);
        }
        renderPlansView();
      });
    }

    // Botão e Modais do Assistente / Wizard
    const btnOpenWizard = document.getElementById('btnOpenPlanWizard');
    if (btnOpenWizard) btnOpenWizard.addEventListener('click', openPlanWizardModal);
    const btnCloseWizard = document.getElementById('planWizardModalCloseBtn');
    if (btnCloseWizard) btnCloseWizard.addEventListener('click', closePlanWizardModal);
    const btnNextWizard = document.getElementById('btnWizardNextStep');
    if (btnNextWizard) {
      btnNextWizard.addEventListener('click', () => {
        if (AppState.wizardStep < 6) {
          AppState.wizardStep++;
          renderWizardStep();
        } else {
          closePlanWizardModal();
        }
      });
    }
    const btnPrevWizard = document.getElementById('btnWizardPrevStep');
    if (btnPrevWizard) {
      btnPrevWizard.addEventListener('click', () => {
        if (AppState.wizardStep > 1) {
          AppState.wizardStep--;
          renderWizardStep();
        }
      });
    }

    // Modal de Detalhes do Plano
    const btnCloseDetails = document.getElementById('btnClosePlanDetailsModal');
    if (btnCloseDetails) btnCloseDetails.addEventListener('click', closePlanDetailsModal);
    const btnCloseDetailsX = document.getElementById('planDetailsModalCloseBtn');
    if (btnCloseDetailsX) btnCloseDetailsX.addEventListener('click', closePlanDetailsModal);
    const planDetailsOverlay = document.getElementById('planDetailsModalOverlay');
    if (planDetailsOverlay) {
      planDetailsOverlay.addEventListener('click', (e) => {
        if (e.target === planDetailsOverlay) closePlanDetailsModal();
      });
    }

    // Tray de Comparação
    const btnOpenCompareTab = document.getElementById('btnOpenPlanCompareTab');
    if (btnOpenCompareTab) {
      btnOpenCompareTab.addEventListener('click', () => {
        AppState.planActiveTab = 'compare';
        renderPlansView();
      });
    }
    const btnClearCompare = document.getElementById('btnClearPlanCompare');
    if (btnClearCompare) {
      btnClearCompare.addEventListener('click', () => {
        AppState.selectedPlanCompare = [];
        updatePlanCompareTray();
        renderPlansView();
      });
    }

    // 5. Seletor de Orçamento (Budget Stacks)
    const budgetPillsContainer = document.getElementById('budgetSelectorPills');
    if (budgetPillsContainer) {
      budgetPillsContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.budget-pill');
        if (pill) {
          budgetPillsContainer.querySelectorAll('.budget-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          AppState.activeBudgetStack = parseInt(pill.getAttribute('data-budget'), 10) || 0;
          renderBudgetStacks();
        }
      });
    }

    // 6. Abas do Histórico (Lineages, Timeline, Benchmarks)
    const historyTabsNav = document.querySelector('.history-tabs-nav');
    if (historyTabsNav) {
      historyTabsNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toggle');
        if (btn) {
          AppState.activeHistoryTab = btn.getAttribute('data-htab');
          renderHistoryView();
        }
      });
    }

    // 7. Filtros da Timeline
    const timelineFilters = document.querySelector('.timeline-filters');
    if (timelineFilters) {
      timelineFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toggle');
        if (btn) {
          timelineFilters.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          AppState.activeTimelineFilter = btn.getAttribute('data-tfilter');
          renderHistoryView();
        }
      });
    }

    // 8. Seletor de Casos de Uso
    const useCaseChips = document.getElementById('useCaseChipsScroll');
    if (useCaseChips) {
      useCaseChips.addEventListener('click', (e) => {
        const chip = e.target.closest('.use-case-chip');
        if (chip) {
          AppState.activeUseCaseId = chip.getAttribute('data-uc-id');
          renderUseCasesView();
        }
      });
    }

    // 9. Abas da Comunidade
    const commTabsNav = document.querySelector('.community-tabs-nav');
    if (commTabsNav) {
      commTabsNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toggle');
        if (btn) {
          AppState.activeCommunityTab = btn.getAttribute('data-ctab');
          renderCommunityView();
        }
      });
    }

    // 10. Busca de Relatos da Comunidade
    const reportSearch = document.getElementById('reportSearchInput');
    if (reportSearch) {
      reportSearch.addEventListener('input', (e) => {
        AppState.communitySearchQuery = e.target.value;
        renderCommunityView();
      });
    }

    // 11. Busca na Matriz de Plataformas
    const platformSearch = document.getElementById('platformMatrixSearch');
    if (platformSearch) {
      platformSearch.addEventListener('input', (e) => {
        AppState.platformSearchQuery = e.target.value;
        renderPlatformsView();
      });
    }

    // Detecção de Atalho de Teclado no Header (Mac ⌘K vs Win/Linux Ctrl K)
    const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
    const cmdTrigger = document.getElementById('commandTriggerBtn');
    if (cmdTrigger) {
      const kbd = cmdTrigger.querySelector('.key-shortcut');
      if (kbd) kbd.innerText = isMac ? '⌘K' : 'Ctrl K';
      cmdTrigger.setAttribute('aria-label', `Buscar (${isMac ? 'Command K' : 'Control K'})`);
      cmdTrigger.setAttribute('title', `Abrir Busca Rápida (${isMac ? '⌘K' : 'Ctrl K'})`);
    }

    // Quick Inspector Drawer
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerBtnFullDossier = document.getElementById('drawerBtnFullDossier');

    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeQuickInspector);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeQuickInspector);
    if (drawerBtnFullDossier) {
      drawerBtnFullDossier.addEventListener('click', () => {
        closeQuickInspector();
        window.location.hash = `#model/${AppState.activeModelId}`;
      });
    }

    // Header More Menu (⋯)
    const headerMoreBtn = document.getElementById('headerMoreBtn');
    const headerDropdownMenu = document.getElementById('headerDropdownMenu');
    const menuOptCopyReport = document.getElementById('menuOptCopyReport');
    const menuOptDownloadReport = document.getElementById('menuOptDownloadReport');
    const menuOptSystemTheme = document.getElementById('menuOptSystemTheme');

    function closeHeaderMoreMenu() {
      if (headerDropdownMenu && headerDropdownMenu.classList.contains('open')) {
        headerDropdownMenu.classList.remove('open');
        if (headerMoreBtn) headerMoreBtn.setAttribute('aria-expanded', 'false');
      }
    }

    if (headerMoreBtn && headerDropdownMenu) {
      headerMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = headerDropdownMenu.classList.contains('open');
        if (isOpen) {
          closeHeaderMoreMenu();
        } else {
          headerDropdownMenu.classList.add('open');
          headerMoreBtn.setAttribute('aria-expanded', 'true');
          const firstItem = headerDropdownMenu.querySelector('.dropdown-item');
          if (firstItem) firstItem.focus();
        }
      });

      document.addEventListener('click', (e) => {
        if (!headerMoreBtn.contains(e.target) && !headerDropdownMenu.contains(e.target)) {
          closeHeaderMoreMenu();
        }
      });
    }

    if (menuOptCopyReport) {
      menuOptCopyReport.addEventListener('click', () => {
        closeHeaderMoreMenu();
        openExportModal();
      });
    }

    if (menuOptDownloadReport) {
      menuOptDownloadReport.addEventListener('click', () => {
        closeHeaderMoreMenu();
        const md = generateMarkdownExport();
        const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio-inteligencia-modelos-2026.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('⬇️ Relatório .md baixado com sucesso!');
      });
    }

    if (menuOptSystemTheme) {
      menuOptSystemTheme.addEventListener('click', () => {
        closeHeaderMoreMenu();
        applyTheme('system', true);
        showToast('🖥️ Tema do sistema configurado!');
      });
    }

    // Fechar drawer, palette, menu ⋯ ou export modal com Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeHeaderMoreMenu();
        const drawer = document.getElementById('quickInspectorDrawer');
        if (drawer && drawer.classList.contains('open')) {
          closeQuickInspector();
          return;
        }
        const exportModal = document.getElementById('exportModalOverlay');
        if (exportModal && exportModal.classList.contains('open')) {
          closeExportModal();
          return;
        }
        const cmdModal = document.getElementById('commandModalOverlay');
        if (cmdModal && cmdModal.classList.contains('open')) {
          closeCommandPalette();
          return;
        }
      }
    });

    // Export Modal
    const exportModal = document.getElementById('exportModalOverlay');
    const exportCloseBtn = document.getElementById('exportModalCloseBtn');
    const copyExportBtn = document.getElementById('btnCopyExportMarkdown');
    const downloadExportBtn = document.getElementById('btnDownloadExportMarkdown');

    if (exportModal) {
      if (exportCloseBtn) exportCloseBtn.addEventListener('click', closeExportModal);
      exportModal.addEventListener('click', (e) => {
        if (e.target === exportModal) closeExportModal();
      });

      if (copyExportBtn) {
        copyExportBtn.addEventListener('click', () => {
          const textarea = document.getElementById('exportMarkdownTextarea');
          if (textarea) {
            copyTextToClipboard(textarea.value);
            showToast('📋 Relatório Markdown copiado com sucesso!');
            closeExportModal();
          }
        });
      }

      if (downloadExportBtn) {
        downloadExportBtn.addEventListener('click', () => {
          const textarea = document.getElementById('exportMarkdownTextarea');
          if (textarea) {
            const blob = new Blob([textarea.value], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio-inteligencia-modelos-2026.md';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('⬇️ Relatório .md baixado com sucesso!');
            closeExportModal();
          }
        });
      }
    }

    // Filtros Unificados do Catálogo (Segmented Axis + More Filters Details)
    const filterTabs = document.getElementById('dashboardFilterChips');
    const moreFilterChips = document.getElementById('dashboardMoreFilterChips');
    const moreDetails = document.getElementById('moreFiltersDetails');

    function handleFilterSelection(btn) {
      const allChips = document.querySelectorAll('#dashboardFilterChips .chip-btn, #dashboardMoreFilterChips .chip-btn');
      allChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      AppState.dashboardFilter = btn.getAttribute('data-filter');

      // Se o filtro veio do dropdown "Mais filtros", fechar o dropdown
      if (moreDetails && moreDetails.hasAttribute('open')) {
        moreDetails.removeAttribute('open');
      }

      const btnReset = document.getElementById('btnResetFilters');
      if (btnReset) {
        btnReset.style.display = (AppState.dashboardFilter !== 'all' || AppState.dashboardSearchQuery) ? 'inline-block' : 'none';
      }

      renderModelsCatalog();
    }

    if (filterTabs) {
      filterTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (btn) handleFilterSelection(btn);
      });
    }

    if (moreFilterChips) {
      moreFilterChips.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (btn) handleFilterSelection(btn);
      });
    }

    // Fechar dropdown de mais filtros ao clicar fora
    document.addEventListener('click', (e) => {
      if (moreDetails && moreDetails.hasAttribute('open')) {
        if (!moreDetails.contains(e.target)) {
          moreDetails.removeAttribute('open');
        }
      }
    });

    // Checkbox de Seleção no Catálogo (Comparar N)
    const dashboardTable = document.getElementById('dashboardDataTable');
    if (dashboardTable) {
      dashboardTable.addEventListener('change', (e) => {
        if (e.target.classList.contains('compare-checkbox')) {
          const modelId = e.target.getAttribute('data-model-id');
          if (e.target.checked) {
            const valid = AppState.comparatorModels.filter(Boolean);
            if (valid.length >= 4) {
              e.target.checked = false;
              showToast('⚠️ Máximo de 4 modelos para comparação simultânea.');
              return;
            }
            if (!AppState.comparatorModels.includes(modelId)) {
              AppState.comparatorModels.push(modelId);
            }
          } else {
            AppState.comparatorModels = AppState.comparatorModels.filter(id => id && id !== modelId);
          }
          updateComparisonFloatingBar();
        }
      });
    }

    // Ações da Bandeja Flutuante de Comparação
    const btnLaunchComp = document.getElementById('btnLaunchComparison');
    const btnCancelComp = document.getElementById('btnCancelComparison');
    const floatingChips = document.getElementById('comparatorSelectedChips');

    if (btnLaunchComp) {
      btnLaunchComp.addEventListener('click', () => {
        const valid = AppState.comparatorModels.filter(Boolean);
        if (valid.length >= 2) {
          location.hash = `#comparator?models=${valid.join(',')}`;
        } else {
          showToast('⚠️ Selecione pelo menos 2 modelos para comparar.');
        }
      });
    }

    if (btnCancelComp) {
      btnCancelComp.addEventListener('click', () => {
        AppState.comparatorModels = [];
        updateComparisonFloatingBar();
      });
    }

    if (floatingChips) {
      floatingChips.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.pill-remove-btn');
        if (removeBtn) {
          const modelId = removeBtn.getAttribute('data-remove-id');
          AppState.comparatorModels = AppState.comparatorModels.filter(id => id !== modelId);
          updateComparisonFloatingBar();
        }
      });
    }

    // Busca no Catálogo de Modelos (Seção 44)
    const searchInput = document.getElementById('dashboardSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        AppState.dashboardSearchQuery = e.target.value.toLowerCase().trim();
        const btnReset = document.getElementById('btnResetFilters');
        if (btnReset) {
          btnReset.style.display = (AppState.dashboardFilter !== 'all' || AppState.dashboardSearchQuery) ? 'inline-block' : 'none';
        }
        renderModelsCatalog();
      });
    }

    // Alternador de Visualização do Catálogo (Tabela vs Cards - Seção 7)
    const viewModeToggle = document.getElementById('catalogViewModeToggle');
    if (viewModeToggle) {
      viewModeToggle.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toggle');
        if (btn) {
          AppState.modelsViewMode = btn.getAttribute('data-mode') || 'table';
          renderModelsCatalog();
        }
      });
    }

    // Botão Limpar Filtros do Catálogo
    const btnReset = document.getElementById('btnResetFilters');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        AppState.dashboardFilter = 'all';
        AppState.dashboardSearchQuery = '';
        const searchInput = document.getElementById('dashboardSearchInput');
        if (searchInput) searchInput.value = '';
        const allChips = document.querySelectorAll('#dashboardFilterChips .chip-btn, #dashboardMoreFilterChips .chip-btn');
        allChips.forEach(c => {
          const isAll = c.getAttribute('data-filter') === 'all';
          c.classList.toggle('active', isAll);
          c.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
        btnReset.style.display = 'none';
        renderModelsCatalog();
      });
    }

    // Botões da Bandeja Flutuante de Comparação (#comparatorFloatingBar)
    const btnFloatClear = document.getElementById('btnFloatingClear');
    if (btnFloatClear) {
      btnFloatClear.addEventListener('click', () => {
        AppState.comparatorModels = [];
        updateComparisonFloatingBar();
      });
    }

    const btnFloatCompare = document.getElementById('btnFloatingCompare');
    if (btnFloatCompare) {
      btnFloatCompare.addEventListener('click', () => {
        const valid = AppState.comparatorModels.filter(Boolean);
        if (valid.length >= 2) {
          location.hash = `#compare?models=${valid.join(',')}`;
        } else {
          showToast('⚠️ Selecione pelo menos 2 modelos para comparar.');
        }
      });
    }

    // Botão Comparar na Gaveta de Inspeção
    const btnDrawerComp = document.getElementById('btnDrawerCompare');
    if (btnDrawerComp) {
      btnDrawerComp.addEventListener('click', () => {
        if (AppState.activeModelId) {
          window.AIApp.toggleModelInComparison(AppState.activeModelId);
          closeQuickInspector();
          location.hash = '#compare';
        }
      });
    }

    // Filtros e Pesquisa da View de Fontes & Metrologia
    const srcFilter = document.getElementById('sourceFilterType');
    const srcSearch = document.getElementById('sourceSearchInput');
    if (srcFilter) srcFilter.addEventListener('change', renderSourcesView);
    if (srcSearch) srcSearch.addEventListener('input', renderSourcesView);

    const btnExportSrc = document.getElementById('btnExportSources');
    if (btnExportSrc) {
      btnExportSrc.addEventListener('click', () => {
        const text = `# Catálogo de Fontes Auditadas e Metrologia\nSnapshot: 03/09/2026\nTotal de Fontes: ${Object.keys(SOURCE_REGISTRY || {}).length}\n\n` +
          Object.values(SOURCE_REGISTRY || {}).map(s => `- [${s.id}] **${s.title}** (${s.publisher}) - ${s.sourceType} - ${s.url || ''}`).join('\n');
        copyTextToClipboard(text);
        showToast('📋 Catálogo de fontes copiado em Markdown!');
      });
    }

        // Toggle Legendas nos Pontos (Thinking Explorer)
    const chkLabels = document.getElementById('chkPointLabels');
    if (chkLabels) {
      chkLabels.addEventListener('change', (e) => {
        AppState.showPointLabels = e.target.checked;
        if (AppState.charts.benchmarkMain) {
          renderBenchmarkExplorer();
        }
      });
    }

    // Eixo da Fronteira de Pareto
    const paretoAxisSel = document.getElementById('paretoAxisSelector');
    if (paretoAxisSel) {
      paretoAxisSel.addEventListener('change', (e) => {
        AppState.paretoAxis = e.target.value;
        renderParetoView();
      });
    }
  }

  // ==========================================
  // CONTADORES DINÂMICOS & KPIS DO DASHBOARD
  // ==========================================
  function updateDynamicCounters() {
    const stats = (typeof DomainEntities !== 'undefined' && typeof DomainEntities.getCatalogStats === 'function')
      ? DomainEntities.getCatalogStats()
      : {
          modelCount: typeof AI_MODELS_DATA !== 'undefined' ? Object.keys(AI_MODELS_DATA).length : 0,
          benchmarkRunCount: typeof CURSORBENCH_32_DATA !== 'undefined' ? CURSORBENCH_32_DATA.length : 0,
          planCount: typeof SUBSCRIPTION_PLANS_DATA !== 'undefined' ? SUBSCRIPTION_PLANS_DATA.length : 0,
          providerCount: typeof AI_PROVIDERS_DATA !== 'undefined' ? Object.keys(AI_PROVIDERS_DATA).length : 0
        };

    const hdrModelBadge = document.getElementById('hdrModelCountBadge');
    if (hdrModelBadge) hdrModelBadge.innerText = stats.modelCount;

    const hdrModel = document.getElementById('hdrModelCount');
    if (hdrModel) hdrModel.innerText = stats.modelCount;

    const hdrRun = document.getElementById('hdrRunCount');
    if (hdrRun) hdrRun.innerText = stats.benchmarkRunCount;

    const catTotal = document.getElementById('catTotalCount');
    if (catTotal) catTotal.innerText = stats.modelCount;

    const chipAll = document.getElementById('chipAllCount');
    if (chipAll) chipAll.innerText = stats.modelCount;

    const homeCat = document.getElementById('homeCatCount');
    if (homeCat) homeCat.innerText = stats.modelCount;

    const navUcBadge = document.getElementById('navUseCasesBadgeCount');
    if (navUcBadge) {
      const ucCount = (typeof USE_CASES_DATA !== 'undefined' && Array.isArray(USE_CASES_DATA)) 
        ? USE_CASES_DATA.length 
        : ((typeof USE_CASE_COMPARISON_DATA !== 'undefined' && USE_CASE_COMPARISON_DATA.useCases) ? USE_CASE_COMPARISON_DATA.useCases.length : 12);
      navUcBadge.innerText = ucCount;
    }

    const matrixModel = document.getElementById('matrixModelCount');
    if (matrixModel) matrixModel.innerText = stats.modelCount;

    const planBadge = document.getElementById('planCountersBadge');
    if (planBadge && stats.planCount) {
      planBadge.innerText = `${stats.providerCount || 9} empresas · ${stats.planCount} planos · ${stats.modelCount} modelos`;
    }
  }

  function renderDashboardHome() {
    // 1. Bloco 1: O que mudou recentemente? (#homeWhatsNewFeed)
    const feedContainer = document.getElementById('homeWhatsNewFeed');
    if (feedContainer) {
      const feedItems = (typeof DomainEntities !== 'undefined' && DomainEntities.getRecentHistoryFeed)
        ? DomainEntities.getRecentHistoryFeed(6)
        : (typeof MODEL_HISTORY_DATA !== 'undefined' ? MODEL_HISTORY_DATA.slice(0, 6) : []);
      
      feedContainer.innerHTML = feedItems.map(item => {
        const model = AI_MODELS_DATA[item.modelId] || {};
        const dateStr = item.date || item.releaseDate || '03/09/2026';
        return `
          <div class="news-feed-item" onclick="location.hash='#model/${item.modelId}'" style="cursor: pointer;">
            <div class="news-feed-date">${dateStr}</div>
            <div class="news-feed-content">
              <div class="news-feed-title">
                <strong>${item.modelName || model.name || item.modelId}</strong>
                <span class="badge-tag ${item.type === 'launch' ? 'badge-frontier' : 'badge-subdollar'}">${item.tag || item.type || 'Lançamento'}</span>
              </div>
              <div class="news-feed-desc">${item.summary || item.description || item.changeNote || ''}</div>
            </div>
            <div class="news-feed-action">
              <span style="font-size: 0.8rem; color: var(--accent-cyan);">Dossiê →</span>
            </div>
          </div>
        `;
      }).join('');
    }

    // 2. Bloco 3: Destaques Dinâmicos Derivados
    renderDynamicDashboardKpis();

    // 3. Bloco 4: Catálogo Resumido (#homeCatalogPreview)
    const previewContainer = document.getElementById('homeCatalogPreview');
    const catCountEl = document.getElementById('homeCatCount');
    const allModels = Object.values(AI_MODELS_DATA);
    if (catCountEl) catCountEl.innerText = allModels.length;

    if (previewContainer) {
      const dynamicAwardIds = (typeof DomainRankings !== 'undefined' && DomainRankings.getDynamicHomeAwards)
        ? DomainRankings.getDynamicHomeAwards().map(a => a.modelId)
        : [];
      const fallbackShowcaseIds = ['claude-fable-5-1', 'gemini-3-8-flash', 'gpt-5-6-sol', 'grok-4-6', 'deepseek-v4-flash-0731', 'glm-5-3-flash'];
      const uniqueShowcaseIds = Array.from(new Set([...dynamicAwardIds, ...fallbackShowcaseIds])).slice(0, 6);
      const showcaseModels = uniqueShowcaseIds.map(id => AI_MODELS_DATA[id]).filter(Boolean);
      
      previewContainer.innerHTML = `
        <div class="home-catalog-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
          ${showcaseModels.map(m => {
            const priceStr = m.openWeights ? 'Gratuito (Local)' : `$${m.pricing.standard.input.toFixed(2)} in / $${m.pricing.standard.output.toFixed(2)} out`;
            return `
              <div class="content-box" style="margin: 0; display: flex; flex-direction: column; justify-content: space-between; border-left: 3px solid ${m.color || 'var(--accent-cyan)'};">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                      <h4 style="margin: 0; font-size: 1rem;"><a href="#model/${m.id}" style="color: var(--text-primary); text-decoration: none;">${m.name}</a></h4>
                      <span style="font-size: 0.78rem; color: var(--text-muted);">${m.providerName} · ${(m.contextWindow/1000).toFixed(0)}k ctx</span>
                    </div>
                    <span class="badge-tag badge-frontier" style="font-size: 0.72rem;">${m.family.toUpperCase()}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--accent-cyan); margin-bottom: 8px; line-height: 1.3;" title="${m.sweetSpot || ''}">
                    💡 <strong>Melhor para:</strong> ${m.sweetSpot ? m.sweetSpot.split('(')[0].trim() : 'Coding & Engenharia'}
                  </div>
                  <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 10px;">
                    ${priceStr}
                  </div>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="btn-secondary btn-sm" onclick="location.hash='#model/${m.id}'" style="flex: 1;">Dossiê</button>
                  <button class="btn-primary btn-sm" onclick="window.AIApp.openComparatorWith('${m.id}')">Comparar</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  function renderDynamicDashboardKpis() {
    const kpiGrid = document.getElementById('homeDynamicKpis') || document.querySelector('.kpi-grid');
    if (!kpiGrid) return;

    const awards = (typeof DomainRankings !== 'undefined' && DomainRankings.getDynamicHomeAwards)
      ? DomainRankings.getDynamicHomeAwards()
      : [];

    if (awards.length === 0) return;

    kpiGrid.innerHTML = awards.map(a => `
      <button type="button" class="kpi-card ${a.cardClass || ''}" data-model-id="${a.modelId}" onclick="location.hash='#model/${a.modelId}'">
        <div class="kpi-tag">${a.tag}</div>
        <div class="kpi-body">
          <div class="kpi-model-name">${a.modelName}</div>
          <div class="kpi-primary-score">${a.scoreText}</div>
        </div>
        <div class="kpi-footer">
          <span>${a.metricLabel}</span>
          <span class="kpi-badge">${a.badgeText}</span>
        </div>
      </button>
    `).join('');
  }

  // ==========================================
  // 4. MÓDULO CATÁLOGO DE MODELOS (TABELA & CARDS - SEÇÃO 7)
  // ==========================================
  // Função Unificada de Filtragem de Modelos (Seções 7, 37, 43, 44)
  function getFilteredModels() {
    const models = Object.values(AI_MODELS_DATA);
    let filtered = models;

    // Filtros por Eixo/Chips
    if (AppState.dashboardFilter === 'frontier') {
      filtered = filtered.filter(m => (m.badges && m.badges.some(b => b.includes('FRONTIER') || b.includes('LÍDER') || b.includes('CAMPEÃO'))) || (m.aaIndex && m.aaIndex >= 60));
    } else if (AppState.dashboardFilter === 'subagents') {
      filtered = filtered.filter(m => (m.badges && m.badges.some(b => b.includes('SUBAGENT') || b.includes('RÁPIDO') || b.includes('WORKER'))) || (m.sweetSpot && m.sweetSpot.toLowerCase().includes('subagent')));
    } else if (AppState.dashboardFilter === 'open-weights') {
      filtered = filtered.filter(m => m.openWeights);
    } else if (AppState.dashboardFilter === 'multimodal') {
      filtered = filtered.filter(m => m.modalities && (m.modalities.input.includes('video') || m.modalities.input.includes('image')));
    } else if (AppState.dashboardFilter === 'sub-dollar') {
      filtered = filtered.filter(m => m.pricing && m.pricing.standard && m.pricing.standard.input < 1.0);
    } else if (AppState.dashboardFilter === '1m-context') {
      filtered = filtered.filter(m => m.contextWindow >= 1000000);
    } else if (AppState.dashboardFilter === 'opencode-go') {
      filtered = filtered.filter(m => m.openCodeGo && m.openCodeGo.available);
    } else if (AppState.dashboardFilter === 'include-superseded') {
      // Exibe catálogo completo sem ocultar legados
    }

    // Por padrão no catálogo, modelos superseded não competem com atuais (Seção 37)
    if (AppState.dashboardFilter !== 'include-superseded' && !AppState.dashboardSearchQuery) {
      filtered = filtered.filter(m => m.status !== 'superseded');
    }

    // Filtro por Busca de Texto
    if (AppState.dashboardSearchQuery) {
      filtered = filtered.filter(m => {
        const aliases = (m.historicalAliases || []).join(' ');
        const fullText = `${m.id} ${m.name} ${aliases} ${m.providerName} ${m.family} ${m.architectureType || ''} ${m.sweetSpot || ''} ${(m.badges || []).join(' ')} ${m.antigravity ? m.antigravity.poolLabel + ' ' + m.antigravity.role : ''} ${m.openWeights ? 'local open weights gratuito open-source' : 'api cloud pay-as-you-go'}`.toLowerCase();
        return fullText.includes(AppState.dashboardSearchQuery);
      });
    }

    return filtered;
  }

  function renderModelsCatalog() {
    const models = Object.values(AI_MODELS_DATA);
    const filtered = getFilteredModels();

    const catTotalCount = document.getElementById('catTotalCount');
    const chipAllCount = document.getElementById('chipAllCount');
    if (catTotalCount) catTotalCount.innerText = filtered.length;
    if (chipAllCount) chipAllCount.innerText = models.filter(m => m.status !== 'superseded').length;

    const mode = AppState.modelsViewMode || 'table';
    const tableContainer = document.getElementById('catalogTableViewContainer');
    const gridContainer = document.getElementById('catalogGridViewContainer');
    const toggleBtns = document.querySelectorAll('#catalogViewModeToggle .btn-toggle');

    toggleBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    if (mode === 'grid') {
      if (tableContainer) tableContainer.style.display = 'none';
      if (gridContainer) {
        gridContainer.style.display = 'grid';
        renderCatalogGrid();
      }
    } else {
      if (gridContainer) gridContainer.style.display = 'none';
      if (tableContainer) {
        tableContainer.style.display = 'block';
        renderDashboardTable();
      }
    }
    updateComparisonFloatingBar();
  }

  function renderCatalogGrid() {
    const container = document.getElementById('catalogGridViewContainer');
    if (!container) return;

    const filtered = getFilteredModels();

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">Nenhum modelo encontrado no filtro atual.</div>`;
      return;
    }

    const selectedIds = AppState.comparatorModels.filter(Boolean);

    container.innerHTML = filtered.map(model => {
      const isSelected = selectedIds.includes(model.id);
      const topCursor = CURSORBENCH_32_DATA.filter(r => r.modelId === model.id).sort((a, b) => b.score - a.score)[0];
      const ledger = MULTI_BENCHMARK_LEDGER.find(l => l.modelId === model.id);
      const priceStr = model.openWeights ? 'Gratuito (Local)' : `$${model.pricing.standard.input.toFixed(2)} in / $${model.pricing.standard.output.toFixed(2)} out`;

      return `
        <div class="catalog-card" style="border-top: 3px solid ${model.color || 'var(--accent-cyan)'};">
          <div class="catalog-card-header">
            <div>
              <div class="catalog-card-title"><a href="#model/${model.id}" style="color: var(--text-primary); text-decoration: none;">${model.name}</a></div>
              <div class="catalog-card-provider">${model.providerName} · ${model.architectureType}</div>
            </div>
            <input type="checkbox" class="compare-checkbox" data-model-id="${model.id}" ${isSelected ? 'checked' : ''} onchange="window.AIApp.toggleModelInComparison('${model.id}')" title="Comparar">
          </div>
          <div class="catalog-card-badges">
            ${(model.badges || []).slice(0, 3).map(b => `<span class="badge-tag badge-frontier">${b}</span>`).join('')}
          </div>
          <div class="catalog-card-specs">
            <div class="catalog-card-spec-item">
              <span class="catalog-card-spec-label">Contexto</span>
              <span class="catalog-card-spec-val">${(model.contextWindow / 1000).toFixed(0)}k</span>
            </div>
            <div class="catalog-card-spec-item">
              <span class="catalog-card-spec-label">CursorBench</span>
              <span class="catalog-card-spec-val highlight-cyan">${topCursor ? topCursor.score.toFixed(1) + '%' : 'N/D'}</span>
            </div>
            <div class="catalog-card-spec-item">
              <span class="catalog-card-spec-label">Terminal 2.1</span>
              <span class="catalog-card-spec-val highlight-green">${ledger && ledger.terminalBench21 ? ledger.terminalBench21.toFixed(1) + '%' : 'N/D'}</span>
            </div>
            <div class="catalog-card-spec-item">
              <span class="catalog-card-spec-label">Preço</span>
              <span class="catalog-card-spec-val">${priceStr}</span>
            </div>
          </div>
          <div class="catalog-card-actions">
            <button class="btn-secondary btn-sm" onclick="location.hash='#model/${model.id}'" style="flex: 1;">Ver Dossiê</button>
            <button class="btn-primary btn-sm" onclick="window.AIApp.toggleModelInComparison('${model.id}')">${isSelected ? '✓ Comparando' : '+ Comparar'}</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. MÓDULO DASHBOARD & CATÁLOGO
  // ==========================================
  function renderDashboardTable() {
    const tbody = document.getElementById('dashboardTableBody');
    if (!tbody) return;

    const filtered = getFilteredModels();

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
            🔍 Nenhum modelo encontrado para o termo "<strong>${AppState.dashboardSearchQuery}</strong>" no filtro atual.
          </td>
        </tr>
      `;
      updateComparisonFloatingBar();
      return;
    }

    const selectedIds = AppState.comparatorModels.filter(Boolean);

    tbody.innerHTML = filtered.map(model => {
      const topCursorBench = CURSORBENCH_32_DATA.filter(r => r.modelId === model.id).sort((a, b) => b.score - a.score)[0];
      const ledgerEntry = MULTI_BENCHMARK_LEDGER.find(l => l.modelId === model.id);
      const cursorScoreText = topCursorBench ? `${topCursorBench.score.toFixed(1)}%` : 'N/D';
      const terminalScoreText = ledgerEntry && ledgerEntry.terminalBench21 ? `${ledgerEntry.terminalBench21.toFixed(1)}%` : 'N/D';
      const deepSweText = ledgerEntry && ledgerEntry.deepSwe11 ? `${ledgerEntry.deepSwe11.toFixed(1)}%` : 'N/D';

      const priceText = model.openWeights && model.pricing.selfHosted
        ? '<span class="badge-tag badge-openweights">Local (Gratuito)</span>'
        : `$${model.pricing.standard.input.toFixed(2)} / $${model.pricing.standard.output.toFixed(2)}`;

      const goBadge = model.openCodeGo && model.openCodeGo.available
        ? `<span class="badge-tag ${model.openCodeGo.quotaBurnMultiplier === 1 ? 'badge-go-60' : model.openCodeGo.quotaBurnMultiplier === 2 ? 'badge-go-30' : 'badge-go-15'}" title="OpenCode Go: Classe US$${model.openCodeGo.usageAllowanceUsd} (${model.openCodeGo.quotaBurnMultiplier}× Quota Burn)">Go ${model.openCodeGo.quotaBurnMultiplier}× burn (~${(model.openCodeGo.estReqMonth || 0).toLocaleString()} req)</span>`
        : '<span class="badge-subtle">Não listado</span>';

      const provider = AI_PROVIDERS_DATA[model.provider] || {};
      const brandIconHtml = provider.iconSvg 
        ? `<span class="model-brand-icon" style="color: ${model.color || provider.brandColor || '#38bdf8'};" title="${model.providerName}">${provider.iconSvg}</span>`
        : `<span class="model-color-dot" style="background-color: ${model.color || '#38bdf8'}"></span>`;

      const isChecked = selectedIds.includes(model.id);

      return `
        <tr onclick="window.AIApp.openQuickInspector('${model.id}')">
          <td style="text-align: center;" onclick="event.stopPropagation()">
            <input type="checkbox" 
                   class="compare-checkbox" 
                   data-model-id="${model.id}" 
                   ${isChecked ? 'checked' : ''}
                   aria-label="Selecionar ${model.name} para comparar">
          </td>
          <td>
            <div class="table-model-cell">
              ${brandIconHtml}
              <div>
                <div class="model-name-text">${model.name}${model.previewHistory ? ` <span style="font-size: 0.72rem; color: #facc15; font-weight: 500;">(ex-${model.previewHistory.alias})</span>` : ''}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${model.providerName}</div>
              </div>
            </div>
          </td>
          <td><span class="badge-tag">${model.family.toUpperCase()}</span></td>
          <td><span class="badge-tag ${model.status === 'stable' ? 'badge-subdollar' : 'badge-warning'}">${model.status.toUpperCase()}</span></td>
          <td>${(model.contextWindow / 1000).toFixed(0)}k</td>
          <td>${model.reasoning ? (model.reasoning.mandatory ? 'Mandatório' : 'Suportado') : 'Não'}</td>
          <td class="score-cell ${topCursorBench && topCursorBench.score >= 65 ? 'score-highlight' : ''}">${cursorScoreText}</td>
          <td class="score-cell ${ledgerEntry && ledgerEntry.terminalBench21 >= 85 ? 'score-highlight' : ''}">${terminalScoreText}</td>
          <td class="score-cell">${deepSweText}</td>
          <td>${priceText}</td>
          <td>${goBadge}</td>
        </tr>
      `;
    }).join('');

    updateComparisonFloatingBar();
  }

  function updateComparisonFloatingBar() {
    const bar = document.getElementById('comparatorFloatingBar');
    if (!bar) return;

    const validModels = (AppState.comparatorModels || []).filter(Boolean);
    const count = validModels.length;

    if (count === 0) {
      bar.style.display = 'none';
      bar.classList.remove('show');
    } else {
      bar.style.display = 'block';
      bar.classList.add('show');
    }

    const countSpan = document.getElementById('floatingCompareCount') || document.getElementById('comparatorSelectedCount');
    if (countSpan) {
      countSpan.innerText = `Comparar ${count}/4`;
    }

    const chipsContainer = document.getElementById('floatingCompareChips') || document.getElementById('comparatorSelectedChips');
    if (chipsContainer) {
      chipsContainer.innerHTML = validModels.map(id => {
        const m = AI_MODELS_DATA[id] || { name: id };
        return `<span class="floating-model-pill" style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; background: rgba(255,255,255,0.08); border-radius: 12px; font-size: 0.78rem;">${m.name} <button type="button" class="pill-remove-btn" onclick="window.AIApp.toggleModelInComparison('${id}')" title="Remover ${m.name}" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.9rem; padding: 0 2px;">×</button></span>`;
      }).join('');
    }

    const launchBtn = document.getElementById('btnFloatingCompare') || document.getElementById('btnLaunchComparison');
    if (launchBtn) {
      launchBtn.disabled = count < 2;
      launchBtn.innerText = count < 2 ? 'Selecione pelo menos 2' : `Comparar Modelos (${count}) →`;
    }

    // Sincronizar todos os checkboxes presentes no DOM
    document.querySelectorAll('.compare-checkbox').forEach(chk => {
      const id = chk.getAttribute('data-model-id');
      chk.checked = validModels.includes(id);
    });
  }

    // ==========================================
  // 5. ESTIMADOR DE CUSTO POR TURNO (LIVE ESTIMATOR)
  // ==========================================
  function initEstimator() {
    const sIn = document.getElementById('sliderNewInput');
    const sCached = document.getElementById('sliderCachedInput');
    const sOut = document.getElementById('sliderOutput');

    [sIn, sCached, sOut].forEach(slider => {
      if (slider) {
        slider.addEventListener('input', () => {
          document.getElementById('valNewInput').innerText = parseInt(sIn.value).toLocaleString('pt-BR');
          document.getElementById('valCachedInput').innerText = parseInt(sCached.value).toLocaleString('pt-BR');
          document.getElementById('valOutput').innerText = parseInt(sOut.value).toLocaleString('pt-BR');
          updateEstimatorResults();
        });
      }
    });
  }

  function updateEstimatorResults() {
    const container = document.getElementById('estimatorResultsContainer');
    if (!container) return;

    const sIn = parseInt(document.getElementById('sliderNewInput').value);
    const sCached = parseInt(document.getElementById('sliderCachedInput').value);
    const sOut = parseInt(document.getElementById('sliderOutput').value);

    const showcaseModels = ['grok-4-6', 'gpt-5-6-sol', 'gpt-5-6-luna', 'deepseek-v4-flash-0731', 'claude-sonnet-5', 'glm-5-3-flash'];

    container.innerHTML = showcaseModels.map(id => {
      const model = AI_MODELS_DATA[id];
      if (!model) return '';
      const cost = AI_DATA_HELPERS.calculateRequestCost(id, sIn, sCached, sOut, false);
      const costStr = cost === 0.0 ? '$0,00 (Grátis / Local)' : `$${cost.toFixed(4)}`;

      return `
        <div class="estimator-result-chip" onclick="location.hash='#model/${model.id}'" style="cursor: pointer;">
          <span class="chip-label">${model.name}</span>
          <span class="chip-cost">${costStr}</span>
          <span class="chip-desc">${model.openWeights ? 'Pesos Abertos' : `$${model.pricing.standard.input}/$${model.pricing.standard.output}`}</span>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 6. MÓDULO HUB DE PROVEDORES (16 ENTIDADES)
  // ==========================================
  function renderProvidersGrid() {
    const container = document.getElementById('providersGridContainer');
    if (!container) return;

    const providers = Object.values(AI_PROVIDERS_DATA);

    container.innerHTML = providers.map(p => {
      const providerModels = AI_DATA_HELPERS.getModelsByProvider(p.id);
      const logoHtml = p.iconSvg 
        ? `<div class="provider-logo-box" style="color: ${p.brandColor || '#38bdf8'};">${p.iconSvg}</div>`
        : `<span class="provider-logo">${p.logo}</span>`;

      return `
        <div class="provider-card" onclick="window.AIApp.filterByProvider('${p.id}')">
          <div class="provider-card-header">
            ${logoHtml}
            <div>
              <div class="provider-name">${p.name}</div>
              <div class="provider-country">📍 ${p.country}</div>
            </div>
          </div>
          <div class="provider-desc">${p.description}</div>
          <div class="provider-models-badge">
            ⚡ ${providerModels.length} Modelos no Catálogo
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 7. MÓDULO DOSSIÊ COMPLETO DO MODELO (5 ABAS - PLANO 08 / SEÇÃO 9)
  // ==========================================
  function renderModelDossier(modelId) {
    const container = document.getElementById('modelDetailContainer');
    if (!container) return;

    const model = AI_MODELS_DATA[modelId] || AI_MODELS_DATA['grok-4-6'];
    const provider = AI_PROVIDERS_DATA[model.provider] || { name: model.providerName, logo: '⚡' };
    const ledgerEntry = (typeof MULTI_BENCHMARK_LEDGER !== 'undefined' ? MULTI_BENCHMARK_LEDGER.find(l => l.modelId === model.id) : null);
    const cursorBenchRuns = (typeof CURSORBENCH_32_DATA !== 'undefined' ? CURSORBENCH_32_DATA.filter(r => r.modelId === model.id) : []);
    const dossier = (typeof getModelDossier === 'function' ? getModelDossier(model.id) : null) || (typeof MODEL_DOSSIERS_DATA !== 'undefined' ? MODEL_DOSSIERS_DATA[model.id] : null) || {};

    // Indicadores de Metrologia, Cobertura e Frescor (Seção 9)
    const cov = (typeof DomainEvidence !== 'undefined' ? DomainEvidence.getCoverage(model.id) : { coveragePercent: 88, measuredFields: 6, derivedFields: 4, missingFields: [] });
    const fresh = (typeof DomainFreshness !== 'undefined' ? DomainFreshness.getFreshness(model.releaseDate || '2026-08-01') : { label: 'Recente', badgeClass: 'badge-frontier', daysAgo: 2 });

    function renderBadge(sourceType) {
      const b = (typeof getProvenanceBadge === 'function' ? getProvenanceBadge(sourceType) : null) || { code: 'T', cssClass: 'badge-source-independent', label: 'Independente', title: '' };
      return `<span class="badge-provenance ${b.cssClass}" title="${b.title || b.label}">[${b.code}]</span>`;
    }

    const fingerprint = (typeof calculatePerformanceFingerprint === 'function' ? calculatePerformanceFingerprint(model.id) : {}) || {};
    const deepsweBoard = (typeof getDeepSweLeaderboard === 'function' ? getDeepSweLeaderboard('score') : []) || [];

    function renderCategorySnapshots(catTitle, categoryId) {
      const snaps = typeof getDossierBenchmarkSnapshots === 'function' ? getDossierBenchmarkSnapshots(model.id, categoryId) : [];
      if (!snaps || snaps.length === 0) {
        return `<p style="color: var(--text-muted); font-size: 0.82rem; padding: 6px 0;">Nenhum benchmark auditado de ${catTitle} cadastrado no snapshot oficial deste modelo.</p>`;
      }
      return `
        <div class="deepswe-leaderboard-container" style="margin-bottom: 14px;">
          <table class="deepswe-table">
            <thead>
              <tr>
                <th>Benchmark</th>
                <th>Versão</th>
                <th>Score Auditado</th>
                <th>Proveniência</th>
                <th>Harness / Config</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              ${snaps.map(s => {
                const reg = (typeof BENCHMARK_REGISTRY !== 'undefined' ? BENCHMARK_REGISTRY[s.benchmarkId] : null);
                const bName = reg ? reg.name : s.benchmarkId;
                const unitStr = s.unit === 'percent' ? '%' : (s.unit === 'elo' ? ' Elo' : (s.unit === 'f1' ? ' F1' : (s.unit === 'tasks' ? ' tarefas' : '')));
                const valStr = s.score !== null ? `${s.score}${unitStr}` : '<span style="color:var(--text-muted);">null</span>';
                return `
                  <tr>
                    <td><strong>${bName}</strong></td>
                    <td><code>${s.benchmarkVersion || '1.0'}</code></td>
                    <td><strong style="color: var(--accent-cyan); font-size: 0.95rem;">${valStr}</strong></td>
                    <td>${renderBadge(s.sourceType)} <span style="font-size: 0.78rem; color: var(--text-secondary);">${s.sourceType}</span></td>
                    <td><span style="font-size: 0.8rem; color: var(--text-muted);">${s.harness || 'Padrão'} ${s.notes ? `(${s.notes})` : ''}</span></td>
                    <td><span style="font-size: 0.8rem; color: var(--text-muted);">${s.snapshotDate || '2026-09-03'}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    const strengths = (dossier.strengths && dossier.strengths.length) ? dossier.strengths : [
      `Alta fidelidade na geração de código e aderência sintática no monorepo`,
      `Janela de contexto expansiva de ${(model.contextWindow / 1000).toFixed(0)}k tokens`,
      `Excelente raciocínio com verificação formal de tipos e sintaxe`
    ];
    const weaknesses = (dossier.weaknesses && dossier.weaknesses.length) ? dossier.weaknesses : [
      `Custo elevado em loops contínuos sem prompt caching otimizado`,
      `Raciocínio estendido pode aumentar a latência de primeiro token (TTFT)`
    ];
    const bestFor = (dossier.bestFor && dossier.bestFor.length) ? dossier.bestFor : [
      `Refatoração complexa em bases legadas com múltiplos arquivos`,
      `Automação de pull requests e resolução de issues via terminal`,
      `Arquitetura de microsserviços e revisão de contratos de API`
    ];
    const avoidFor = (dossier.avoidFor && dossier.avoidFor.length) ? dossier.avoidFor : [
      `Geração de texto ultrarrápida para autocomplete linha-a-linha de baixa latência (<100ms)`,
      `Workflows restritos a orçamento estrito de sub-dólar sem cache`
    ];

    const modelPlans = (typeof DomainEntities !== 'undefined' ? DomainEntities.getPlansForModel(model.id) : []);
    const communityItems = (typeof COMMUNITY_FEED_DATA !== 'undefined' ? COMMUNITY_FEED_DATA.filter(c => c.modelId === model.id || (c.tags && c.tags.includes(model.id))) : []);
    const divergenceItems = (typeof DIVERGENCE_REPORTS !== 'undefined' ? DIVERGENCE_REPORTS.filter(d => d.modelId === model.id) : []);
    const sIds = dossier.sourceIds || (model.officialBenchmarks ? ['aa-' + model.id, 'google-deepmind-gemini38'] : ['aa-gemini38-flash']);
    const sRegistry = (typeof SOURCE_REGISTRY !== 'undefined' ? SOURCE_REGISTRY : {});

    function renderSourcesTable() {
      const dataSources = typeof DATA_SOURCES !== 'undefined' ? DATA_SOURCES : {};
      if (!sIds || sIds.length === 0) {
        return `<p style="color: var(--text-muted); font-size: 0.85rem;">Nenhuma fonte direta cadastrada.</p>`;
      }
      return `
        <div class="provenance-legend-box" style="margin-bottom: 12px; font-size: 0.8rem; display: flex; flex-wrap: wrap; gap: 10px;">
          <div><strong>Legenda de Metrologia:</strong></div>
          <div>${renderBadge('official')} [M] Medido / Oficial Primária</div>
          <div>${renderBadge('vendor-reported')} [D] Derivado / Harness Fornecedor</div>
          <div>${renderBadge('independent')} [T] Terceiros / DataCurve, AA</div>
          <div>${renderBadge('community')} [C] Calibrado / Comunidade</div>
        </div>
        <div class="deepswe-leaderboard-container">
          <table class="deepswe-table">
            <thead>
              <tr>
                <th>ID da Fonte</th>
                <th>Publicador</th>
                <th>Título / Avaliação</th>
                <th>Proveniência</th>
                <th>Publicação</th>
                <th>Auditado</th>
              </tr>
            </thead>
            <tbody>
              ${sIds.map(sid => {
                const s = sRegistry[sid] || dataSources[sid] || { id: sid, publisher: 'Auditado', title: sid, sourceType: 'independent', publishedAt: '2026-09-02', retrievedAt: '2026-09-03' };
                return `
                  <tr>
                    <td><code>${s.id || sid}</code></td>
                    <td><strong>${s.publisher || 'Auditado'}</strong></td>
                    <td>${s.title || sid}</td>
                    <td>${renderBadge(s.sourceType || 'independent')} <span style="font-size: 0.8rem;">${s.sourceType || 'independent'}</span></td>
                    <td><span style="font-size: 0.8rem; color: var(--text-muted);">${s.publishedAt || 'N/D'}</span></td>
                    <td><span style="font-size: 0.8rem; color: var(--text-muted);">${s.retrievedAt || '2026-09-03'}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="breadcrumb-bar">
        <button class="btn-back" onclick="location.hash='#models'">← Voltar ao Catálogo</button>
        <span style="color: var(--text-muted);">/</span>
        <span style="color: var(--text-secondary);">${provider.name}</span>
        <span style="color: var(--text-muted);">/</span>
        <strong style="color: var(--text-primary);">${model.name}</strong>
      </div>

      <div class="model-hero-card">
        <div class="model-hero-header">
          <div class="model-title-group">
            <div class="model-hero-avatar" style="background: ${model.color}22; border-color: ${model.color}; color: ${model.color};">
              ${provider.iconSvg ? `<span style="width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;">${provider.iconSvg}</span>` : provider.logo}
            </div>
            <div>
              <div class="model-hero-title">${model.name}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Desenvolvido por <strong>${model.providerName}</strong> • ${model.architectureType} • Lançamento: ${model.releaseDate || '2026'}</div>
              <div class="model-badges-list" style="margin-top: 6px;">
                ${(model.badges || []).map(b => `<span class="badge-tag badge-frontier">${b}</span>`).join('')}
              </div>
              ${model.predecessor ? `
                <div style="margin-top: 6px; font-size: 0.8rem; color: var(--text-secondary);">
                  🧬 <strong>Linhagem:</strong> Sucessor de <a href="#model/${model.predecessor}" style="color: var(--accent-cyan); text-decoration: none;"><strong>${model.predecessor}</strong></a>
                </div>
              ` : ''}
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: flex-start; flex-wrap: wrap;">
            <button class="btn-primary" onclick="window.AIApp.openComparatorWith('${model.id}')">⚔️ Comparar Lado a Lado</button>
            <button class="btn-secondary" onclick="window.AIApp.toggleModelInComparison('${model.id}')">➕ Bandeja de Comparação</button>
          </div>
        </div>

        <!-- Indicador de Cobertura e Frescor (Seção 9) -->
        <div class="dossier-evidence-meter" style="display: flex; flex-wrap: wrap; gap: 14px; align-items: center; margin: 14px 0; font-size: 0.82rem; background: rgba(255,255,255,0.03); padding: 8px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-weight: 600; color: var(--accent-cyan);">📊 Cobertura de Evidências:</span>
            <strong>${cov.coveragePercent}%</strong> (${cov.measuredFields} medidos, ${cov.derivedFields} derivados)
          </div>
          <span style="color: var(--border-medium);">•</span>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-weight: 600; color: var(--text-secondary);">⏳ Frescor:</span>
            <span class="badge-tag ${fresh.badgeClass}">${fresh.label}</span>
          </div>
          <span style="color: var(--border-medium);">•</span>
          <div style="color: var(--text-muted);">
            Auditado em: <strong>${model.releaseDate || '2026-09-03'}</strong>
          </div>
        </div>

        <!-- 5 Abas de Alto Nível (Seção 9 do Plano 08) -->
        <div class="dossier-subtabs-nav" id="dossierTopTabsNav">
          <button class="subtab-btn active" data-tab="tab-overview">📋 Visão Geral</button>
          <button class="subtab-btn" data-tab="tab-performance">📊 Desempenho</button>
          <button class="subtab-btn" data-tab="tab-pricing-access">💰 Preço & Acesso</button>
          <button class="subtab-btn" data-tab="tab-history-evidence">📜 Histórico & Evidências</button>
          ${(model.openWeights || model.vramRequirements) ? `<button class="subtab-btn" data-tab="tab-deploy">🖥️ Deploy & Integração</button>` : ''}
        </div>

        <!-- ABA 1: VISÃO GERAL (Resumo Interpretado & Especificações) -->
        <div class="subtab-panel active" id="tab-overview">
          <!-- Resumo Interpretado (Antes das Tabelas) -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 20px;">
            <div class="content-box" style="margin: 0; border-left: 4px solid #10b981;">
              <h4 style="color: #10b981; font-size: 0.95rem; margin-bottom: 8px;">🌟 Excelente em</h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">
                ${strengths.slice(0, 4).map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>

            <div class="content-box" style="margin: 0; border-left: 4px solid #ef4444;">
              <h4 style="color: #ef4444; font-size: 0.95rem; margin-bottom: 8px;">⚠️ Limitações & Trade-offs</h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">
                ${weaknesses.slice(0, 3).map(w => `<li>${w}</li>`).join('')}
              </ul>
            </div>

            <div class="content-box" style="margin: 0; border-left: 4px solid var(--accent-cyan);">
              <h4 style="color: var(--accent-cyan); font-size: 0.95rem; margin-bottom: 8px;">🎯 Use quando</h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">
                ${bestFor.slice(0, 3).map(b => `<li>${b}</li>`).join('')}
              </ul>
            </div>

            <div class="content-box" style="margin: 0; border-left: 4px solid #f59e0b;">
              <h4 style="color: #f59e0b; font-size: 0.95rem; margin-bottom: 8px;">🛑 Evite quando</h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">
                ${avoidFor.slice(0, 3).map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Posição Atual Auditada & Rankings Derivados -->
          <div class="content-box" style="margin-bottom: 20px;">
            <h4 style="font-size: 0.95rem; margin-bottom: 12px;">🏆 Posição Atual & Rankings Auditados</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
              ${model.officialBenchmarks && model.officialBenchmarks.sweBenchVerified ? `
                <div style="padding: 10px; background: rgba(255,255,255,0.02); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                  <div style="font-size: 0.78rem; color: var(--text-muted);">SWE-bench Verified</div>
                  <div style="font-size: 1.2rem; font-weight: 700; color: var(--accent-cyan);">${model.officialBenchmarks.sweBenchVerified}% <span class="evidence-badge badge-m">[M]</span></div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">Harness oficial · ${model.releaseDate || '2026-09-01'}</div>
                </div>
              ` : ''}

              ${ledgerEntry && ledgerEntry.terminalBench21 ? `
                <div style="padding: 10px; background: rgba(255,255,255,0.02); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                  <div style="font-size: 0.78rem; color: var(--text-muted);">Terminal-Bench 2.1</div>
                  <div style="font-size: 1.2rem; font-weight: 700; color: #10b981;">${ledgerEntry.terminalBench21.toFixed(1)}% <span class="evidence-badge badge-m">[M]</span></div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">89 tarefas shell independentes</div>
                </div>
              ` : ''}

              ${cursorBenchRuns && cursorBenchRuns.length > 0 ? `
                <div style="padding: 10px; background: rgba(255,255,255,0.02); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                  <div style="font-size: 0.78rem; color: var(--text-muted);">CursorBench 3.2 (Top Run)</div>
                  <div style="font-size: 1.2rem; font-weight: 700; color: #a855f7;">${cursorBenchRuns[0].score.toFixed(1)}% <span class="evidence-badge badge-m">[M]</span></div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">Esforço ${cursorBenchRuns[0].effort} · Anysphere Eval</div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Especificações Fundamentais -->
          <div class="content-box">
            <h4 style="font-size: 0.95rem; margin-bottom: 12px;">⚙️ Especificações Técnicas Fundamentais</h4>
            <div class="specs-grid">
              <div class="spec-item-card"><div class="spec-label">Janela de Contexto (Nominal)</div><div class="spec-value">${(model.contextWindow).toLocaleString()} tokens (${(model.contextWindow / 1000).toFixed(0)}k)</div></div>
              <div class="spec-item-card"><div class="spec-label">Output Máximo</div><div class="spec-value">${(model.maxOutputTokens || 16384).toLocaleString()} tokens</div></div>
              <div class="spec-item-card"><div class="spec-label">Cutoff de Conhecimento</div><div class="spec-value">${model.knowledgeCutoff || 'fev/2025'}</div></div>
              <div class="spec-item-card"><div class="spec-label">Latência Relativa Provedor</div><div class="spec-value highlight-cyan">${model.relativeLatency || 'Padrão'}</div></div>
              <div class="spec-item-card"><div class="spec-label">Tipo de Atenção / Arquitetura</div><div class="spec-value">${model.architectureType}</div></div>
              ${model.antigravity ? `
                <div class="spec-item-card" style="border-color: rgba(249, 115, 22, 0.4);"><div class="spec-label">Google Antigravity Pool</div><div class="spec-value highlight-amber">${model.antigravity.poolLabel}</div></div>
                <div class="spec-item-card"><div class="spec-label">Papel no Antigravity</div><div class="spec-value">${model.antigravity.role}</div></div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- ABA 2: DESEMPENHO (DeepSWE, CursorBench, Snapshots Categorizados) -->
        <div class="subtab-panel" id="tab-performance">
          <!-- DeepSWE Leaderboard -->
          <div class="content-box" style="margin-bottom: 20px;">
            <h4>🏆 DeepSWE 1.1 Leaderboard Independente (Custo por Tarefa Resolvida)</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
              Ordenação factual por taxa de sucesso e eficiência. Custo por tarefa resolvida calculado dinamicamente com flag <code>[D]</code> via fórmula <code>costPerTask / (score / 100)</code>.
            </p>
            <div class="deepswe-leaderboard-container">
              <table class="deepswe-table">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Score (%)</th>
                    <th>Custo / Task</th>
                    <th>Output Tokens / Task</th>
                    <th>Agent Steps / Task</th>
                    <th>Custo / Tarefa Resolvida</th>
                  </tr>
                </thead>
                <tbody>
                  ${deepsweBoard.map(item => {
                    const isCurrent = item.modelId === model.id;
                    return `
                      <tr style="${isCurrent ? 'background: rgba(6, 182, 212, 0.12); font-weight: 600;' : ''}">
                        <td>${isCurrent ? '👉 ' : ''}<strong>${item.modelName}</strong></td>
                        <td><strong style="color: var(--accent-cyan); font-size: 0.95rem;">${item.score.toFixed(1)}%</strong> <span style="font-size:0.75rem; color:var(--text-muted);">±${item.confidenceInterval}</span></td>
                        <td>$${item.costPerTaskUsd.toFixed(2)}</td>
                        <td>${item.outputTokensPerTask.toLocaleString()}</td>
                        <td>${item.agentStepsPerTask}</td>
                        <td><span class="cost-per-solved-badge">$${item.costPerSolvedTask ? item.costPerSolvedTask.toFixed(2) : 'N/D'}</span></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          ${cursorBenchRuns.length > 0 ? `
            <div class="content-box" style="margin-bottom: 20px;">
              <h4>CursorBench 3.2 por Esforço de Thinking (Cursor Native):</h4>
              <div class="deepswe-leaderboard-container">
                <table class="deepswe-table">
                  <thead><tr><th>Nível de Esforço</th><th>Score (%)</th><th>Custo / Task</th><th>Tokens / Task</th><th>Harness</th><th>Sweet Spot?</th></tr></thead>
                  <tbody>
                    ${cursorBenchRuns.map(r => `
                      <tr>
                        <td><strong>${r.effort}</strong></td>
                        <td><strong style="color: var(--accent-cyan); font-size: 0.95rem;">${r.score.toFixed(1)}%</strong></td>
                        <td>$${r.costUsd.toFixed(2)}</td>
                        <td>${r.tokensPerTask.toLocaleString()}</td>
                        <td>${r.harness}</td>
                        <td>${r.isSweetSpot ? '<span class="badge-tag badge-sweetspot">🌟 Sweet Spot</span>' : '-'}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <!-- Snapshots de Benchmarks por Categoria -->
          <div class="content-box">
            <h4 style="margin-bottom: 12px;">📊 Snapshots Categorizados de Benchmarks Auditados</h4>
            
            <h5 style="margin-top: 14px; margin-bottom: 6px;">💻 Coding & Engenharia de Software</h5>
            ${renderCategorySnapshots('Coding', 'coding')}

            <h5 style="margin-top: 18px; margin-bottom: 6px;">🤖 Ferramentas & Agentes Autônomos</h5>
            ${renderCategorySnapshots('Ferramentas & Agentes', 'agent')}

            <h5 style="margin-top: 18px; margin-bottom: 6px;">🧠 Raciocínio de Fronteira & Ciência</h5>
            ${renderCategorySnapshots('Raciocínio & Ciência', 'science')}

            <h5 style="margin-top: 18px; margin-bottom: 6px;">📜 Contexto Longo & Recuperação</h5>
            ${renderCategorySnapshots('Contexto Longo', 'longContext')}

            <h5 style="margin-top: 18px; margin-bottom: 6px;">👁️ Multimodalidade & Visão Técnica</h5>
            ${renderCategorySnapshots('Multimodalidade', 'multimodal')}

            <h5 style="margin-top: 18px; margin-bottom: 6px;">💼 Trabalho Profissional & Domínios Corporativos</h5>
            ${renderCategorySnapshots('Trabalho Profissional', 'business')}

            <h5 style="margin-top: 18px; margin-bottom: 6px;">🔒 Cibersegurança & Exploit</h5>
            ${renderCategorySnapshots('Cibersegurança', 'cyber')}
          </div>
        </div>

        <!-- ABA 3: PREÇO & ACESSO (APIs, Onde Executar, Planos, Governança) -->
        <div class="subtab-panel" id="tab-pricing-access">
          <!-- Preços de API -->
          <div class="content-box" style="margin-bottom: 20px;">
            <h4>💰 Preços de API & Eficiência</h4>
            <div class="specs-grid">
              <div class="spec-item-card"><div class="spec-label">Preço Padrão (Input / Entrada)</div><div class="spec-value">$${model.pricing.standard.input.toFixed(2)} / milhão</div></div>
              <div class="spec-item-card"><div class="spec-label">Preço Padrão (Output / Saída)</div><div class="spec-value">$${model.pricing.standard.output.toFixed(2)} / milhão</div></div>
              <div class="spec-item-card"><div class="spec-label">Prompt Cache Read (Hit)</div><div class="spec-value highlight-green">${model.pricing.standard.cacheRead !== null && model.pricing.standard.cacheRead !== undefined ? `$${model.pricing.standard.cacheRead.toFixed(4)} / milhão` : 'Padrão'}</div></div>
              <div class="spec-item-card"><div class="spec-label">Cache Write (5 min / 1 hora)</div><div class="spec-value">${model.pricing.standard.cacheWrite5m ? `$${model.pricing.standard.cacheWrite5m.toFixed(2)} / $${model.pricing.standard.cacheWrite1h.toFixed(2)}` : 'N/D'}</div></div>
              ${model.pricing.batch ? `
                <div class="spec-item-card" style="border-color: rgba(34, 197, 94, 0.4);"><div class="spec-label">Batch API (50% de Desconto)</div><div class="spec-value highlight-green">$${model.pricing.batch.input.toFixed(2)} in / $${model.pricing.batch.output.toFixed(2)} out</div></div>
              ` : ''}
              <div class="spec-item-card"><div class="spec-label">Pool no Cursor Pro</div><div class="spec-value">${model.cursorPool ? model.cursorPool.poolLabel : 'Standard'}</div></div>
            </div>
            ${model.pricing && model.pricing.promotionalPeriod ? `
              <div style="margin-top: 14px; background: rgba(234, 179, 8, 0.1); border: 1px solid #eab308; border-radius: var(--radius-sm); padding: 12px 16px; font-size: 0.84rem;">
                <strong style="color: #eab308;">🏷️ Preço Promocional de Lançamento Ativo (Seção 35):</strong>
                <div style="margin-top: 4px; color: var(--text-primary);">
                  <strong>US$ ${model.pricing.promotionalPeriod.input.toFixed(2)} in / US$ ${model.pricing.promotionalPeriod.output.toFixed(2)} out</strong> até ${model.pricing.promotionalPeriod.effectiveUntil.split('-').reverse().join('/')}
                  <span style="color: var(--text-muted); margin-left: 6px;">(após esta data: US$ ${model.pricing.standard.input.toFixed(2)} in / US$ ${model.pricing.standard.output.toFixed(2)} out)</span>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Onde Executar / IDEs -->
          <div class="content-box" style="margin-bottom: 20px;">
            <h4>🌐 Onde Executar Este Modelo & Plataformas de Desenvolvimento</h4>
            <div class="specs-grid" style="margin-bottom: 16px;">
              <div class="spec-item-card"><div class="spec-label">Cursor IDE</div><div class="spec-value">${model.cursorPool ? model.cursorPool.poolLabel : 'Other Models'}</div></div>
              <div class="spec-item-card"><div class="spec-label">OpenCode Go</div><div class="spec-value ${model.openCodeGo && model.openCodeGo.available ? 'highlight-green' : ''}">${model.openCodeGo && model.openCodeGo.available ? `Sim (${model.openCodeGo.quotaBurnMultiplier}× burn)` : 'Consulte OpenRouter'}</div></div>
              <div class="spec-item-card"><div class="spec-label">Google Antigravity</div><div class="spec-value highlight-cyan">${model.antigravity ? `${model.antigravity.poolLabel}` : 'Indisponível'}</div></div>
              <div class="spec-item-card"><div class="spec-label">OpenRouter</div><div class="spec-value">${model.openRouterId || model.id}</div></div>
            </div>
          </div>

          <!-- Planos que incluem o Modelo (Integrado via DomainEntities) -->
          <div class="content-box" style="margin-bottom: 20px;">
            <h4>💳 Assinaturas & Planos que Incluem este Modelo</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
              Planos comerciais de desenvolvedor onde este modelo está disponível em cota inclusa ou créditos.
            </p>
            ${modelPlans && modelPlans.length > 0 ? `
              <div class="deepswe-leaderboard-container">
                <table class="deepswe-table">
                  <thead>
                    <tr>
                      <th>Provedor</th>
                      <th>Plano</th>
                      <th>Preço</th>
                      <th>Superfície</th>
                      <th>Modo de Acesso</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${modelPlans.map(p => `
                      <tr>
                        <td><strong>${p.provider.toUpperCase()}</strong></td>
                        <td><strong>${p.planName}</strong></td>
                        <td>$${p.priceMonthlyUsd}/mês</td>
                        <td><span class="badge-tag badge-subdollar">${p.surface || 'IDE / Web'}</span></td>
                        <td><span class="badge-tag badge-frontier">${p.billingMode || 'included'}</span></td>
                        <td><button class="btn-secondary btn-sm" onclick="location.hash='#plan/${p.id}'">Ver Dossiê do Plano</button></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : `<p style="font-size: 0.82rem; color: var(--text-muted);">Disponível primordialmente via chamadas diretas de API Pay-as-you-go ou BYOK.</p>`}
          </div>

          <!-- Governança e Retenção -->
          <div class="content-box">
            <h4>🔒 Governança, Privacidade & Retenção de Dados</h4>
            <div class="specs-grid" style="margin-top: 12px;">
              <div class="spec-item-card"><div class="spec-label">Zero Data Retention (ZDR)</div><div class="spec-value">${model.privacy ? (model.privacy.retentionDays === 0 ? '✅ ZDR Ativo (0 dias)' : `⚠️ Retenção de até ${model.privacy.retentionDays} dias`) : '✅ ZDR Oficial / API'}</div></div>
              <div class="spec-item-card"><div class="spec-label">Status dos Pesos</div><div class="spec-value">${model.openWeights ? 'Pesos Abertos Auditáveis' : 'Proprietário de Código Fechado'}</div></div>
              <div class="spec-item-card"><div class="spec-label">Treinamento em Dados de Usuário</div><div class="spec-value highlight-green">Zero Treino por Padrão (API)</div></div>
              <div class="spec-item-card"><div class="spec-label">Confiança Metrológica</div><div class="spec-value highlight-green">${(model.sourceConfidence || 'oficial').toUpperCase()}</div></div>
            </div>
          </div>
        </div>

        <!-- ABA 4: HISTÓRICO & EVIDÊNCIAS (Linhagem, Comunidade, Divergências, Fontes) -->
        <div class="subtab-panel" id="tab-history-evidence">
          <!-- Linhagem -->
          <div class="content-box" style="margin-bottom: 20px;">
            <h4>🧬 Linhagem & Evolução Histórica</h4>
            <p style="font-size: 0.85rem; color: var(--text-primary);">
              ${model.predecessor ? `Este modelo é o sucessor direto de <strong>${model.predecessor}</strong>, trazendo melhorias substanciais em raciocínio agêntico, síntese de contexto e redução de TTFT.` : `Modelo de linhagem primária na família ${model.providerName}.`}
            </p>
          </div>

          <!-- Relatos de Comunidade e Telemetria -->
          <div class="content-box" style="margin-bottom: 20px;">
            <h4>💬 Relatos de Desenvolvedores & Telemetria no Mundo Real</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
              Feedback auditado de engenheiros em uso diário com IDEs (Cursor, Windsurf, Aider, OpenCode) com proveniência [C].
            </p>
            ${communityItems && communityItems.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${communityItems.map(c => `
                  <div style="padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                    <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 4px;">
                      <span><strong>${c.author || 'Dev'}</strong> no <em>${c.platform || 'Comunidade'}</em></span>
                      <span class="badge-provenance badge-source-community" title="Relato da Comunidade">[C]</span>
                    </div>
                    <p style="font-size: 0.84rem; color: var(--text-primary); margin: 0 0 6px 0;">"${c.quote || c.text || ''}"</p>
                    ${c.caveats ? `<div style="font-size: 0.75rem; color: #f59e0b;">⚠️ Atenção: ${c.caveats}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : `<p style="font-size: 0.82rem; color: var(--text-muted);">Nenhum relato anedótico direto cadastrado no snapshot atual.</p>`}
          </div>

          <!-- Divergências Documentadas -->
          ${divergenceItems && divergenceItems.length > 0 ? `
            <div class="content-box" style="margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <h4>⚖️ Divergências Documentadas (Benchmark vs Uso Real)</h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${divergenceItems.map(d => `
                  <div style="font-size: 0.84rem;">
                    <strong>${d.topic || 'Divergência'}:</strong> ${d.description || ''}
                    <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">Impacto: ${d.impact || 'Médio'} · Relatado em ${d.date || '2026-09-02'}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Fontes Auditadas e Metrologia Estrita -->
          <div class="content-box">
            <h4>📚 Fontes Auditadas, Publicadores & Metrologia Estrita</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
              Rastreabilidade integral das medições utilizadas neste dossiê com distinção estrita de fontes.
            </p>
            ${renderSourcesTable()}
            <div style="margin-top: 14px;">
              <button class="btn-secondary btn-sm" onclick="location.hash='#sources'">Ver Catálogo Canônico de Fontes Auditadas →</button>
            </div>
          </div>
        </div>

        <!-- ABA 5: DEPLOY & INTEGRAÇÃO (Apenas para pesos abertos ou VRAM) -->
        ${(model.openWeights || model.vramRequirements) ? `
          <div class="subtab-panel" id="tab-deploy">
            <div class="content-box" style="margin-bottom: 20px;">
              <h4>🖥️ Requisitos de VRAM & Quantizações para Deploy Local</h4>
              <div class="specs-grid">
                <div class="spec-item-card"><div class="spec-label">FP16 / BF16 (Não Quantizado)</div><div class="spec-value highlight-cyan">${model.vramRequirements?.fp16 || '80 GB VRAM (1x A100/H100)'}</div></div>
                <div class="spec-item-card"><div class="spec-label">Q8 / INT8 (Alta Precisão)</div><div class="spec-value">${model.vramRequirements?.q8 || '48 GB VRAM (2x RTX 3090/4090)'}</div></div>
                <div class="spec-item-card"><div class="spec-label">Q4_K_M (Quantização Recomendada)</div><div class="spec-value highlight-green">${model.vramRequirements?.q4 || '24 GB VRAM (1x RTX 3090/4090)'}</div></div>
                <div class="spec-item-card"><div class="spec-label">Licença dos Pesos</div><div class="spec-value">${model.license || 'Apache 2.0 / MIT'}</div></div>
              </div>
            </div>

            <div class="content-box" style="margin-bottom: 20px;">
              <h4>🚀 Comandos Rápidos de Execução Local</h4>
              <h5 style="margin-top: 10px; margin-bottom: 6px;">Execução via vLLM:</h5>
              <div class="code-snippet-box">
                <pre><code>vllm serve ${model.hfModelId || model.id} --tensor-parallel-size 1 --max-model-len ${model.contextWindow} --port 8000</code></pre>
              </div>

              <h5 style="margin-top: 14px; margin-bottom: 6px;">Execução via Ollama:</h5>
              <div class="code-snippet-box">
                <pre><code>ollama run ${model.ollamaModelId || model.id}</code></pre>
              </div>
            </div>

            <div class="content-box">
              <h4>⚙️ Snippets de Configuração para Ferramentas de Código</h4>
              <h5 style="margin-top: 10px; margin-bottom: 6px;">Configuração para OpenCode (JSON):</h5>
              <div class="code-snippet-box">
                <button class="btn-copy-code" onclick="window.AIApp.copySnippet('snip-opencode')">Copiar JSON</button>
                <pre id="snip-opencode"><code>${typeof AI_DATA_HELPERS !== 'undefined' && AI_DATA_HELPERS.generateIdeConfig ? AI_DATA_HELPERS.generateIdeConfig(model.id, 'opencode') : '{\n  "model": "' + model.id + '"\n}'}</code></pre>
              </div>
              <h5 style="margin-top: 14px; margin-bottom: 6px;">Configuração para Aider (.aider.conf.yml):</h5>
              <div class="code-snippet-box">
                <button class="btn-copy-code" onclick="window.AIApp.copySnippet('snip-aider')">Copiar YAML</button>
                <pre id="snip-aider"><code>${typeof AI_DATA_HELPERS !== 'undefined' && AI_DATA_HELPERS.generateIdeConfig ? AI_DATA_HELPERS.generateIdeConfig(model.id, 'aider') : 'model: ' + model.id}</code></pre>
              </div>
            </div>
          </div>
        ` : ''}

      </div>
    `;

    // Interatividade das Sub-Abas do Dossiê
    const subtabsNav = container.querySelector('.dossier-subtabs-nav');
    if (subtabsNav) {
      subtabsNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.subtab-btn');
        if (btn) {
          subtabsNav.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const targetTabId = btn.getAttribute('data-tab');
          container.querySelectorAll('.subtab-panel').forEach(p => p.classList.remove('active'));
          const targetPanel = container.querySelector(`#${targetTabId}`);
          if (targetPanel) targetPanel.classList.add('active');
        }
      });
    }
  }

  // ==========================================
  // 8. MÓDULO THINKING & BENCHMARKS EXPLORER
  // ==========================================
  function renderBenchmarkExplorer() {
    const ctx = document.getElementById('benchmarkMainChart');
    if (!ctx) return;
    if (typeof Chart === 'undefined') return;

    if (AppState.charts.benchmarkMain) {
      AppState.charts.benchmarkMain.destroy();
    }

    const metricSwitcher = document.getElementById('benchmarkMetricSwitcher');
    if (metricSwitcher) {
      metricSwitcher.onclick = (e) => {
        if (e.target.classList.contains('metric-btn')) {
          metricSwitcher.querySelectorAll('.metric-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          AppState.activeBenchmarkMetric = e.target.getAttribute('data-metric');
          renderBenchmarkExplorer();
        }
      };
    }

    // Presets de visualização (Dropdown Select)
    const presetSelect = document.getElementById('benchmarkPresetSelect');
    if (presetSelect && !presetSelect._bound) {
      presetSelect._bound = true;
      presetSelect.value = AppState.activeBenchmarkPreset || 'sweet-spots';
      presetSelect.addEventListener('change', () => {
        AppState.activeBenchmarkPreset = presetSelect.value;
        renderBenchmarkExplorer();
      });
    }

    const efforts = ['Low', 'Medium', 'High', 'XHigh', 'Max'];
    let modelKeys = ['grok-4-6', 'gpt-5-6-sol', 'gpt-5-6-terra', 'gpt-5-6-luna', 'claude-opus-5', 'claude-sonnet-5', 'claude-fable-5', 'gemini-3-7-flash'];

    if (AppState.activeBenchmarkPreset === 'sweet-spots') {
      modelKeys = ['grok-4-6', 'gpt-5-6-terra', 'gpt-5-6-luna', 'claude-opus-5', 'gemini-3-7-flash'];
    } else if (AppState.activeBenchmarkPreset === 'cursor-models') {
      modelKeys = ['grok-4-6'];
    } else if (AppState.activeBenchmarkPreset === 'other-models') {
      modelKeys = ['gpt-5-6-sol', 'gpt-5-6-terra', 'gpt-5-6-luna', 'claude-opus-5', 'claude-sonnet-5', 'gemini-3-7-flash'];
    } else if (AppState.activeBenchmarkPreset === 'clear') {
      modelKeys = [];
    }

    const datasets = modelKeys.map(id => {
      const model = AI_MODELS_DATA[id];
      if (!model) return null;

      const data = efforts.map(eff => {
        const run = CURSORBENCH_32_DATA.find(r => r.modelId === id && r.effort.toLowerCase() === eff.toLowerCase());
        if (!run) return null;
        if (AppState.activeBenchmarkMetric === 'cost') return run.costUsd;
        if (AppState.activeBenchmarkMetric === 'tokens') return run.tokensPerTask;
        return run.score;
      });

      return {
        label: model.name,
        data: data,
        borderColor: model.color || '#38bdf8',
        backgroundColor: `${model.color}33`,
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 9,
        spanGaps: true
      };
    }).filter(Boolean);

    AppState.charts.benchmarkMain = new Chart(ctx, {
      type: 'line',
      data: { labels: efforts, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: cssVar('--text-secondary') || '#94a3b8', font: { family: 'Inter' } } },
          tooltip: {
            backgroundColor: cssVar('--bg-glass-heavy') || 'rgba(16, 21, 34, 0.95)',
            titleColor: cssVar('--text-primary') || '#f8fafc',
            bodyColor: cssVar('--text-secondary') || '#94a3b8',
            borderColor: cssVar('--border-accent') || 'rgba(6, 182, 212, 0.4)',
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const val = context.raw;
                if (val === null) return `${context.dataset.label}: N/D`;
                if (AppState.activeBenchmarkMetric === 'cost') return `${context.dataset.label}: ${val.toFixed(2)}`;
                if (AppState.activeBenchmarkMetric === 'tokens') return `${context.dataset.label}: ${val.toLocaleString()} tokens`;
                return `${context.dataset.label}: ${val.toFixed(1)}%`;
              }
            }
          }
        },
        scales: {
          x: { grid: { color: cssVar('--border-subtle') || 'rgba(255, 255, 255, 0.06)' }, ticks: { color: cssVar('--text-secondary') || '#94a3b8' } },
          y: { grid: { color: cssVar('--border-subtle') || 'rgba(255, 255, 255, 0.06)' }, ticks: { color: cssVar('--text-secondary') || '#94a3b8' } }
        }
      }
    });
  }

  function renderMultiBenchmarkLedger() {
    const tbody = document.getElementById('multiBenchmarkTableBody');
    if (!tbody) return;

    tbody.innerHTML = MULTI_BENCHMARK_LEDGER.map(entry => {
      const model = AI_MODELS_DATA[entry.modelId] || { color: '#38bdf8' };
      return `
        <tr onclick="location.hash='#model/${entry.modelId}'" style="cursor: pointer;">
          <td>
            <div class="table-model-cell">
              <span class="model-color-dot" style="background-color: ${model.color}"></span>
              <span class="model-name-text">${entry.modelName}</span>
            </div>
          </td>
          <td class="score-cell ${entry.terminalBench21 >= 85 ? 'score-highlight' : ''}">${entry.terminalBench21 ? `${entry.terminalBench21.toFixed(1)}%` : '-'}</td>
          <td class="score-cell">${entry.terminalBench30 ? `${entry.terminalBench30.toFixed(1)}%` : '-'}</td>
          <td class="score-cell ${entry.sweBenchVerified >= 75 ? 'score-highlight' : ''}">${entry.sweBenchVerified ? `${entry.sweBenchVerified.toFixed(1)}%` : '-'}</td>
          <td class="score-cell">${entry.toolathlonVerified ? `${entry.toolathlonVerified.toFixed(1)}%` : '-'}</td>
          <td class="score-cell">${entry.nl2Repo ? `${entry.nl2Repo.toFixed(1)}%` : '-'}</td>
          <td class="score-cell">${entry.aaIndex ? entry.aaIndex.toFixed(1) : '-'}</td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================
  // 8. MÓDULO ARTIFICIAL ANALYSIS (v4.1.1)
  // ==========================================
  let aaCurrentFilter = 'all';
  let aaSearchQuery = '';
  let aaEventsInitialized = false;

  function initArtificialAnalysisEvents() {
    if (aaEventsInitialized) return;
    aaEventsInitialized = true;

    const searchInput = document.getElementById('aaSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        aaSearchQuery = e.target.value.toLowerCase().trim();
        renderArtificialAnalysisTable();
      });
    }

    const filterChips = document.getElementById('aaFilterChips');
    if (filterChips) {
      filterChips.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (!btn) return;
        filterChips.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        aaCurrentFilter = btn.getAttribute('data-filter') || 'all';
        renderArtificialAnalysisTable();
      });
    }
  }

  function renderArtificialAnalysisView() {
    initArtificialAnalysisEvents();
    renderArtificialAnalysisTable();
    renderAASubBenchmarks();
  }

  function renderArtificialAnalysisTable() {
    const tbody = document.getElementById('aaTableBody');
    if (!tbody || typeof ARTIFICIAL_ANALYSIS_DATA === 'undefined') return;

    let items = [...ARTIFICIAL_ANALYSIS_DATA.rankings];

    // Filtros por Categoria
    if (aaCurrentFilter === 'frontier') {
      items = items.filter(i => i.aaIndex >= 58.0);
    } else if (aaCurrentFilter === 'open-weights') {
      items = items.filter(i => i.openWeights);
    } else if (aaCurrentFilter === 'sub-dollar') {
      items = items.filter(i => i.costPerTask < 0.50);
    } else if (aaCurrentFilter === 'fast-tps') {
      items = items.filter(i => i.throughputTps >= 100.0);
    }

    // Busca textual
    if (aaSearchQuery) {
      items = items.filter(i => {
        const modelObj = AI_MODELS_DATA[i.modelId];
        const providerName = modelObj && AI_PROVIDERS_DATA[modelObj.provider] ? AI_PROVIDERS_DATA[modelObj.provider].name.toLowerCase() : '';
        return i.modelName.toLowerCase().includes(aaSearchQuery) ||
               i.modelId.toLowerCase().includes(aaSearchQuery) ||
               i.effort.toLowerCase().includes(aaSearchQuery) ||
               i.contextWindow.toLowerCase().includes(aaSearchQuery) ||
               providerName.includes(aaSearchQuery);
      });
    }

    if (items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 30px; color: var(--text-muted);">
            Nenhum modelo encontrado para o filtro selecionado.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = items.map(item => {
      let rankBadgeClass = 'rank-badge';
      if (item.rank === 1) rankBadgeClass += ' rank-gold';
      else if (item.rank === 2) rankBadgeClass += ' rank-silver';
      else if (item.rank === 3) rankBadgeClass += ' rank-bronze';

      const modelObj = AI_MODELS_DATA[item.modelId];
      const modelColor = modelObj ? modelObj.color : '#a855f7';
      const provider = modelObj ? (AI_PROVIDERS_DATA[modelObj.provider] || {}) : {};
      const brandIconHtml = provider.iconSvg 
        ? `<span class="model-brand-icon" style="color: ${modelColor || provider.brandColor || '#38bdf8'};">${provider.iconSvg}</span>`
        : '';

      return `
        <tr>
          <td><span class="${rankBadgeClass}">#${item.rank}</span></td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${brandIconHtml}
              <strong style="color: ${modelColor}">${item.modelName}</strong>
              ${item.openWeights ? '<span class="badge-tag" style="font-size: 0.65rem; background: rgba(34,197,94,0.15); color: #4ade80;">OPEN</span>' : '<span class="badge-tag" style="font-size: 0.65rem; background: rgba(168,85,247,0.15); color: #c084fc;">CLOUD</span>'}
            </div>
          </td>
          <td>
            <strong class="highlight-purple" style="font-size: 1.05rem;">${item.aaIndex.toFixed(1)}</strong>
          </td>
          <td>
            <span class="${item.costPerTask < 0.50 ? 'highlight-green' : ''}">$${item.costPerTask.toFixed(2)}</span>
          </td>
          <td>
            <span class="${item.throughputTps >= 100 ? 'highlight-cyan' : ''}"><strong>${item.throughputTps.toFixed(1)}</strong> tok/s</span>
          </td>
          <td>${item.contextWindow}</td>
          <td>
            ${item.gdpvalElo ? `<strong>${item.gdpvalElo} Elo</strong>` : '<span style="color: var(--text-muted);">-</span>'}
          </td>
          <td>
            <button class="btn-table-action" onclick="location.hash='#model/${item.modelId}'" title="Ver Dossiê do Modelo">
              🔍 Dossiê
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderAASubBenchmarks() {
    if (typeof ARTIFICIAL_ANALYSIS_DATA === 'undefined') return;
    const sb = ARTIFICIAL_ANALYSIS_DATA.subBenchmarks;

    // 1. GDPval-AA v2
    const gdpvalContainer = document.getElementById('miniGdpvalList');
    if (gdpvalContainer && sb.gdpval) {
      gdpvalContainer.innerHTML = sb.gdpval.slice(0, 8).map((item, idx) => `
        <div class="mini-lead-item">
          <div class="mini-lead-left">
            <span class="mini-lead-rank">#${item.rank || idx + 1}</span>
            <span class="mini-lead-name">${item.model}</span>
          </div>
          <div class="mini-lead-right">
            <span class="mini-lead-score">${item.elo} Elo</span>
            ${item.badge ? `<span class="badge-tag badge-frontier" style="font-size: 0.65rem;">${item.badge}</span>` : ''}
          </div>
        </div>
      `).join('');
    }

    // 2. τ³-Banking
    const tau3Container = document.getElementById('miniTau3List');
    if (tau3Container && sb.tau3Banking) {
      tau3Container.innerHTML = sb.tau3Banking.map((item, idx) => `
        <div class="mini-lead-item">
          <div class="mini-lead-left">
            <span class="mini-lead-rank">#${item.rank || idx + 1}</span>
            <span class="mini-lead-name">${item.model}</span>
          </div>
          <div class="mini-lead-right">
            <span class="mini-lead-score highlight-gold">${item.scorePct.toFixed(1)}%</span>
            <span class="badge-tag" style="font-size: 0.65rem; background: rgba(234,179,8,0.15); color: #facc15;">${item.badge}</span>
          </div>
        </div>
      `).join('');
    }

    // 3. AA-LCR
    const lcrContainer = document.getElementById('miniLcrList');
    if (lcrContainer && sb.aaLcr) {
      lcrContainer.innerHTML = sb.aaLcr.map((item, idx) => `
        <div class="mini-lead-item">
          <div class="mini-lead-left">
            <span class="mini-lead-rank">#${item.rank || idx + 1}</span>
            <span class="mini-lead-name">${item.model}</span>
          </div>
          <div class="mini-lead-right">
            <span class="mini-lead-score highlight-cyan">${item.scorePct.toFixed(1)}%</span>
            <span class="badge-tag" style="font-size: 0.65rem; background: rgba(6,182,212,0.15); color: #22d3ee;">${item.badge}</span>
          </div>
        </div>
      `).join('');
    }

    // 4. AA-Omniscience
    const omniContainer = document.getElementById('miniOmniscienceList');
    if (omniContainer && sb.aaOmniscience) {
      omniContainer.innerHTML = sb.aaOmniscience.map((item, idx) => `
        <div class="mini-lead-item">
          <div class="mini-lead-left">
            <span class="mini-lead-rank">#${item.rank || idx + 1}</span>
            <span class="mini-lead-name">${item.model}</span>
          </div>
          <div class="mini-lead-right">
            <span class="mini-lead-score highlight-purple">Index ${item.indexScore}</span>
            <span class="badge-tag" style="font-size: 0.65rem; background: rgba(168,85,247,0.15); color: #c084fc;">${item.badge}</span>
          </div>
        </div>
      `).join('');
    }

    // 5. Terminal-Bench 2.1 (AA Independente)
    const terminalContainer = document.getElementById('miniTerminalList');
    if (terminalContainer && sb.terminalBenchAa) {
      terminalContainer.innerHTML = sb.terminalBenchAa.slice(0, 8).map((item, idx) => `
        <div class="mini-lead-item">
          <div class="mini-lead-left">
            <span class="mini-lead-rank">#${item.rank || idx + 1}</span>
            <span class="mini-lead-name">${item.model}</span>
          </div>
          <div class="mini-lead-right">
            <span class="mini-lead-score highlight-green">${item.scorePct.toFixed(1)}%</span>
            <span class="badge-tag" style="font-size: 0.65rem; background: rgba(34,197,94,0.15); color: #4ade80;">${item.diffOfficial}</span>
          </div>
        </div>
      `).join('');
    }

    // 6. SciCode & GPQA Diamond
    const sciContainer = document.getElementById('miniSciCodeList');
    if (sciContainer && sb.sciCode) {
      sciContainer.innerHTML = sb.sciCode.map((item, idx) => `
        <div class="mini-lead-item">
          <div class="mini-lead-left">
            <span class="mini-lead-rank">#${item.rank || idx + 1}</span>
            <span class="mini-lead-name">${item.model}</span>
          </div>
          <div class="mini-lead-right">
            <span class="mini-lead-score highlight-cyan">${item.scorePct.toFixed(1)}%</span>
            ${item.note ? `<span class="badge-tag badge-frontier" style="font-size: 0.65rem;">${item.note}</span>` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // ==========================================
  // 9. MÓDULO RADAR 10D (SPIDER CHART)
  // ==========================================
  function renderRadarView() {
    const checkboxList = document.getElementById('radarModelCheckboxes');
    const ctx = document.getElementById('radar10dChart');
    if (!checkboxList || !ctx) return;

    const availableRadarIds = Object.keys(CAPABILITY_RADAR_10D);

    checkboxList.innerHTML = availableRadarIds.map(id => {
      const model = AI_MODELS_DATA[id];
      if (!model) return '';
      const isChecked = AppState.selectedRadarModels.includes(id);
      return `
        <label class="radar-check-item">
          <input type="checkbox" value="${id}" ${isChecked ? 'checked' : ''} onchange="window.AIApp.toggleRadarModel('${id}')">
          <span class="model-color-dot" style="background-color: ${model.color}"></span>
          <span>${model.name}</span>
        </label>
      `;
    }).join('');

    if (AppState.charts.radar10d) {
      AppState.charts.radar10d.destroy();
    }

    const labels = [
      'Raciocínio & Math', 'Coding Agêntico Monorepo', 'Resolução SWE-bench', 'Retenção Long-Context (1M)',
      'Multimodalidade & UI', 'Throughput & Decode', 'Custo-Eficiência / Task', 'Aderência a Tools & FIM',
      'Baixa Latência (TTFT)', 'Acesso Aberto & Cotas Go'
    ];

    const datasets = AppState.selectedRadarModels.map(id => {
      const model = AI_MODELS_DATA[id];
      const vec = CAPABILITY_RADAR_10D[id];
      if (!model || !vec) return null;

      const data = [
        vec.reasoning !== undefined ? vec.reasoning : (vec.algorithms || 80),
        vec.agentic !== undefined ? vec.agentic : (vec.agenticCoding || 80),
        vec.sweBench !== undefined ? vec.sweBench : (vec.toolShell || 80),
        vec.longContext !== undefined ? vec.longContext : 80,
        vec.multimodal !== undefined ? vec.multimodal : 80,
        vec.throughput !== undefined ? vec.throughput : 80,
        vec.costEfficiency !== undefined ? vec.costEfficiency : (vec.costBenefit || 80),
        vec.toolAdherence !== undefined ? vec.toolAdherence : (vec.toolShell || 80),
        vec.ttftLatency !== undefined ? vec.ttftLatency : 80,
        vec.openAccess !== undefined ? vec.openAccess : (vec.localEfficiency || 80)
      ];

      return {
        label: model.name,
        data: data,
        borderColor: model.color,
        backgroundColor: `${model.color}25`,
        borderWidth: 2,
        pointBackgroundColor: model.color
      };
    }).filter(Boolean);

    AppState.charts.radar10d = new Chart(ctx, {
      type: 'radar',
      data: { labels: labels, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: cssVar('--border-medium') || 'rgba(255, 255, 255, 0.1)' },
            grid: { color: cssVar('--border-subtle') || 'rgba(255, 255, 255, 0.08)' },
            pointLabels: { color: cssVar('--text-primary') || '#0f172a', font: { family: 'Inter', size: 11, weight: '600' } },
            ticks: { display: false, max: 100, min: 0 }
          }
        },
        plugins: {
          legend: { position: 'top', labels: { color: cssVar('--text-primary') || '#f8fafc', font: { family: 'Inter' } } }
        }
      }
    });
  }

  // ==========================================
  // 10. MÓDULO FRONTEIRA DE PARETO
  // ==========================================
  function renderParetoView() {
    const ctx = document.getElementById('paretoScatterChart');
    const insightsBox = document.getElementById('paretoInsightsBox');
    if (!ctx) return;
    if (typeof Chart === 'undefined') return;

    if (AppState.charts.paretoScatter) {
      AppState.charts.paretoScatter.destroy();
    }

    let scatterData = [];
    let xLabel = 'Custo por Tarefa (USD $)';
    let yLabel = 'CursorBench Score (%)';

    if (AppState.paretoAxis === 'score_vs_vram') {
      xLabel = 'VRAM Necessária (GB)';
      yLabel = 'SWE-bench Verified (%)';
      if (insightsBox) {
        insightsBox.innerHTML = '💡 <strong>Modelos na Fronteira de Eficiência Local:</strong> gpt-oss-20b (16 GB / 60,7%), Nemotron 3.5 Lightning (24 GB) e gpt-oss-120b (80 GB / 62,4%).';
      }

      const openModels = Object.values(AI_MODELS_DATA).filter(m => m.openWeights && m.hardwareRequirements);
      scatterData = openModels.map(m => {
        const ledger = MULTI_BENCHMARK_LEDGER.find(l => l.modelId === m.id);
        const score = ledger && ledger.sweBenchVerified ? ledger.sweBenchVerified : 50.0;
        return {
          x: m.hardwareRequirements.minVramGb,
          y: score,
          modelName: m.name,
          color: m.color || '#38bdf8'
        };
      });
    } else if (AppState.paretoAxis === 'aa_index_vs_cost') {
      xLabel = 'Custo Médio por Tarefa (USD $ - Metodologia AA)';
      yLabel = 'Artificial Analysis Intelligence Index (v4.1.1)';
      if (insightsBox) {
        insightsBox.innerHTML = '🛡️ <strong>Fronteira Auditada Artificial Analysis:</strong> GPT-5.6 Luna Max (Index 52 / $0,05), DeepSeek Flash 0731 (Index 52 / $0,11), Muse Spark 1.2 (Index 57 / $0,40), Kimi K3 Max (Index 60 / $0,84), Grok 4.6 High (Index 61 / $0,84) e Claude Opus 5 Max (Index 63 / $2,34).';
      }

      scatterData = ARTIFICIAL_ANALYSIS_DATA.rankings.map(r => {
        const model = AI_MODELS_DATA[r.modelId];
        return {
          x: r.costPerTask,
          y: r.aaIndex,
          modelName: `${r.modelName}`,
          color: model ? model.color : (r.openWeights ? '#22c55e' : '#a855f7')
        };
      });
    } else if (AppState.paretoAxis === 'aa_index_vs_vram') {
      xLabel = 'VRAM Mínima Necessária (GB Local)';
      yLabel = 'Artificial Analysis Intelligence Index (v4.1.1)';
      if (insightsBox) {
        insightsBox.innerHTML = '🛡️ <strong>Densidade de Inteligência por Hardware:</strong> Qwen3.8-27B entrega <strong>Index 52 em apenas 24 GB</strong> (mesmo índice geral do Luna e Flash), superando a relação de modelos de 100B+.';
      }

      const openModels = Object.values(AI_MODELS_DATA).filter(m => m.openWeights && m.hardwareRequirements);
      scatterData = openModels.map(m => {
        const aa = ARTIFICIAL_ANALYSIS_DATA.rankings.find(r => r.modelId === m.id);
        if (!aa) return null;
        return {
          x: m.hardwareRequirements.minVramGb,
          y: aa.aaIndex,
          modelName: m.name,
          color: m.color || '#22c55e'
        };
      }).filter(Boolean);
    } else if (AppState.paretoAxis === 'gdpval_vs_cost') {
      xLabel = 'Custo Médio por Tarefa (USD $ - Metodologia AA)';
      yLabel = 'GDPval-AA v2 (Rating Elo - Trabalho Profissional)';
      if (insightsBox) {
        insightsBox.innerHTML = '🛡️ <strong>Fronteira Agêntica GDPval-AA v2:</strong> GPT-5.6 Luna Max (1578 Elo / $0,05), GLM-5.3 Max (1769 Elo / $0,68), Grok 4.6 High (1747 Elo / $0,84) e Claude Opus 5 Max (1845 Elo / $2,34).';
      }

      scatterData = ARTIFICIAL_ANALYSIS_DATA.rankings.filter(r => r.gdpvalElo).map(r => {
        const model = AI_MODELS_DATA[r.modelId];
        return {
          x: r.costPerTask,
          y: r.gdpvalElo,
          modelName: `${r.modelName}`,
          color: model ? model.color : '#a855f7'
        };
      });
    } else {
      if (insightsBox) {
        insightsBox.innerHTML = '💡 <strong>Modelos na Fronteira de Eficiência Ótima:</strong> Grok 4.6 (Medium), GPT-5.6 Luna (Max), GPT-5.6 Terra (Max), Grok 4.6 (XHigh) e gpt-oss-20b (High).';
      }

      const runs = CURSORBENCH_32_DATA;
      scatterData = runs.map(r => {
        const model = AI_MODELS_DATA[r.modelId];
        return {
          x: r.costUsd,
          y: r.score,
          modelName: `${r.modelName} (${r.effort})`,
          color: model ? model.color : '#38bdf8'
        };
      });
    }

    AppState.charts.paretoScatter = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Fronteira de Modelos',
          data: scatterData,
          backgroundColor: scatterData.map(d => d.color),
          pointRadius: 7,
          pointHoverRadius: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: cssVar('--bg-glass-heavy') || 'rgba(16, 21, 34, 0.95)',
            titleColor: cssVar('--text-primary') || '#f8fafc',
            bodyColor: cssVar('--text-secondary') || '#94a3b8',
            borderColor: cssVar('--border-accent') || 'rgba(6, 182, 212, 0.4)',
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const item = context.raw;
                return `${item.modelName}: ${yLabel} ${item.y.toFixed(1)}% | ${xLabel}: ${item.x}`;
              }
            }
          },
          legend: { display: false }
        },
        scales: {
          x: {
            title: { display: true, text: xLabel, color: cssVar('--text-secondary') || '#94a3b8' },
            grid: { color: cssVar('--border-subtle') || 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: cssVar('--text-secondary') || '#94a3b8' }
          },
          y: {
            title: { display: true, text: yLabel, color: cssVar('--text-secondary') || '#94a3b8' },
            grid: { color: cssVar('--border-subtle') || 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: cssVar('--text-secondary') || '#94a3b8' }
          }
        }
      }
    });
  }

  // ==========================================
  // 11. MÓDULO COMPARADOR LADO A LADO
  // ==========================================
  function renderComparatorView() {
    renderComparatorUnified();
  }

  function renderComparatorUnified() {
    const s1 = document.getElementById('compSelect1');
    const s2 = document.getElementById('compSelect2');
    const s3 = document.getElementById('compSelect3');
    const s4 = document.getElementById('compSelect4');

    if (AppState.comparatorModels.filter(Boolean).length < 2) {
      AppState.comparatorModels = ['claude-fable-5-1', 'gemini-3-8-flash', 'gpt-5-6-sol', ''];
    }

    const models = Object.values(AI_MODELS_DATA);

    if (s1 && s2 && s3 && s4) {
      [s1, s2, s3, s4].forEach((sel, idx) => {
        const currentVal = AppState.comparatorModels[idx] || '';
        sel.innerHTML = (idx >= 2 ? '<option value="">-- Nenhum --</option>' : '') + models.map(m => `
          <option value="${m.id}" ${m.id === currentVal ? 'selected' : ''}>${m.name} (${m.providerName})</option>
        `).join('');

        sel.onchange = () => {
          AppState.comparatorModels[idx] = sel.value;
          const validModels = AppState.comparatorModels.filter(Boolean);
          if (history.replaceState) {
            history.replaceState(null, '', `#compare?mode=${AppState.comparatorActiveMode || 'specs'}&models=${validModels.join(',')}`);
          }
          updateComparisonFloatingBar();
          renderComparatorActiveMode();
        };
      });
    }

    // Configuração das Abas de Modo (#comparatorModesNav)
    const modeBtns = document.querySelectorAll('#comparatorModesNav .comp-mode-btn');
    modeBtns.forEach(btn => {
      const mode = btn.getAttribute('data-mode');
      btn.classList.toggle('active', mode === (AppState.comparatorActiveMode || 'specs'));
      btn.onclick = () => {
        AppState.comparatorActiveMode = mode;
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderComparatorActiveMode();
      };
    });

    const shareBtn = document.getElementById('btnShareComparison');
    if (shareBtn) {
      shareBtn.onclick = () => {
        const url = `${window.location.origin}${window.location.pathname}#compare?mode=${AppState.comparatorActiveMode || 'specs'}&models=${AppState.comparatorModels.filter(Boolean).join(',')}`;
        copyTextToClipboard(url);
        showToast('🔗 Link da comparação copiado com sucesso!');
      };
    }

    renderComparatorActiveMode();
    updateComparisonFloatingBar();
  }

  function renderComparatorActiveMode() {
    const activeMode = AppState.comparatorActiveMode || 'specs';
    const panels = document.querySelectorAll('#view-comparator .comp-mode-panel');
    panels.forEach(p => p.style.display = 'none');

    const panelMap = {
      'specs': 'compModeSpecsPanel',
      'benchmarks': 'compModeBenchmarksPanel',
      'radar': 'compModeRadarPanel',
      'pareto': 'compModeParetoPanel',
      'access': 'compModeAccessPanel',
      'governance': 'compModeGovernancePanel'
    };

    const targetId = panelMap[activeMode] || 'compModeSpecsPanel';
    const activePanel = document.getElementById(targetId);
    if (activePanel) activePanel.style.display = 'block';

    renderComparatorIntelligenceBox();

    switch (activeMode) {
      case 'specs':
        renderComparatorTable();
        break;
      case 'benchmarks':
        renderComparatorBenchmarksMode();
        break;
      case 'radar':
        renderComparatorRadarMode();
        break;
      case 'pareto':
        renderComparatorParetoMode();
        break;
      case 'access':
        renderComparatorAccessMode();
        break;
      case 'governance':
        renderComparatorGovernanceMode();
        break;
    }
  }

  function renderComparatorIntelligenceBox() {
    const box = document.getElementById('comparatorIntelligenceBox');
    if (!box) return;

    const activeIds = AppState.comparatorModels.filter(Boolean);
    if (activeIds.length < 2) {
      box.innerHTML = `
        <div style="padding: 12px 16px; background: rgba(56, 189, 248, 0.04); border: 1px dashed var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-secondary);">
          ℹ️ <strong>Inteligência Comparativa (Seção 25):</strong> Selecione pelo menos 2 modelos acima para habilitar índice de confiança, análise de dominância e resumo automático de trade-offs.
        </div>
      `;
      return;
    }

    const refId = AppState.comparatorRefModelId || activeIds[0];
    const targetId = activeIds.find(id => id !== refId) || activeIds[1];

    let conf = { score: 0.85, label: 'high', sharedBenchmarks: 7, totalComparableMetrics: 8, warnings: [], coveragePct: 85 };
    if (typeof DomainComparison !== 'undefined' && DomainComparison.calculateConfidence) {
      conf = DomainComparison.calculateConfidence(refId, targetId);
    }

    let tradeOff = null;
    if (typeof DomainComparison !== 'undefined' && DomainComparison.getTradeOffSummary) {
      tradeOff = DomainComparison.getTradeOffSummary(refId, targetId);
    }

    const confBadgeClass = conf.label === 'high' ? 'badge-frontier' : conf.label === 'medium' ? 'badge-warning' : 'badge-danger';
    const confLabelPt = conf.label === 'high' ? 'Alta' : conf.label === 'medium' ? 'Média' : 'Baixa';

    box.innerHTML = `
      <div class="content-box" style="padding: 14px 18px; border-left: 4px solid var(--accent-cyan); margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-primary);">🛡️ Metrologia Comparativa:</span>
            <span class="badge-tag ${confBadgeClass}">Confiança ${confLabelPt} (${conf.coveragePct}%)</span>
            <span style="font-size: 0.8rem; color: var(--text-secondary);">${conf.sharedBenchmarks} benchmarks diretamente comparáveis de ${conf.totalComparableMetrics} avaliados</span>
          </div>

          <!-- Seletor de Modelo de Referência (Seção 28) -->
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem;">
            <span style="color: var(--text-muted);">Referência de Linha-Base:</span>
            <div style="display: inline-flex; gap: 4px; flex-wrap: wrap;">
              ${activeIds.map(id => {
                const m = AI_MODELS_DATA[id];
                const isRef = id === refId;
                return `
                  <button type="button" class="btn-xs ${isRef ? 'btn-primary' : 'btn-ghost'}" 
                          onclick="window.AIApp.setComparatorReferenceModel('${id}')" 
                          style="font-size: 0.75rem; padding: 2px 8px; border-radius: 12px;"
                          title="Definir ${m ? m.name : id} como modelo base para deltas">
                    ${isRef ? '★ ' : ''}${m ? m.name : id}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        ${conf.warnings && conf.warnings.length > 0 ? `
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 4px;">
            ${conf.warnings.map(w => `<div style="font-size: 0.78rem; color: #f59e0b;">⚠️ ${w}</div>`).join('')}
          </div>
        ` : ''}

        ${tradeOff ? `
          <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
            <div style="font-size: 0.82rem; font-weight: 600; color: var(--accent-cyan); margin-bottom: 4px;">
              ⚖️ Resumo de Trade-offs (Ao escolher <u>${tradeOff.targetName}</u> em vez de <u>${tradeOff.referenceName}</u>):
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              ${tradeOff.bullets && tradeOff.bullets.length > 0 ? tradeOff.bullets.map(b => `• ${b}`).join(' &nbsp;·&nbsp; ') : 'Desempenho equivalente nas métricas diretamente comparáveis.'}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderComparatorBenchmarksMode() {
    const container = document.getElementById('compBenchmarksContainer');
    if (!container) return;

    const activeIds = AppState.comparatorModels.filter(Boolean);
    const selectedModels = activeIds.map(id => AI_MODELS_DATA[id]).filter(Boolean);

    if (selectedModels.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); padding: 20px;">Selecione modelos acima para comparar benchmarks.</p>';
      return;
    }

    const metrics = [
      { key: 'sweBenchVerified', label: 'SWE-bench Verified (%)', unit: '%' },
      { key: 'terminalBench21', label: 'Terminal-Bench 2.1 (%)', unit: '%' },
      { key: 'terminalBench30', label: 'Terminal-Bench 3.0 (%)', unit: '%' },
      { key: 'deepSwe11', label: 'DeepSWE 1.1 (%)', unit: '%' },
      { key: 'gpqaDiamond', label: 'GPQA Diamond (%)', unit: '%' },
      { key: 'aaIndex', label: 'Artificial Analysis Index', unit: ' pts' }
    ];

    container.innerHTML = `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Métrica de Benchmark</th>
              ${selectedModels.map(m => `<th><strong>${m.name}</strong></th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${metrics.map(met => `
              <tr>
                <td><strong>${met.label}</strong></td>
                ${selectedModels.map(m => {
                  const ledger = (typeof MULTI_BENCHMARK_LEDGER !== 'undefined' ? MULTI_BENCHMARK_LEDGER.find(l => l.modelId === m.id) : null);
                  let val = ledger ? ledger[met.key] : null;
                  if (val === null && m.officialBenchmarks && m.officialBenchmarks[met.key]) {
                    val = m.officialBenchmarks[met.key];
                  }
                  const text = (val !== null && val !== undefined) ? `${val.toFixed(1)}${met.unit}` : '<span style="color: var(--text-muted);">N/D</span>';
                  return `<td><strong style="color: var(--accent-cyan);">${text}</strong></td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderComparatorRadarMode() {
    const canvas = document.getElementById('compRadarCanvas');
    if (!canvas || typeof Chart === 'undefined') return;

    if (AppState.charts.compRadar) {
      AppState.charts.compRadar.destroy();
    }

    const activeIds = AppState.comparatorModels.filter(Boolean);
    const labels = [
      'Raciocínio & Math', 'Coding Monorepo', 'SWE-bench', 'Long-Context (1M)',
      'Multimodal / UI', 'Throughput', 'Custo-Eficiência', 'Tools & FIM',
      'Baixa Latência', 'Acesso Aberto'
    ];

    const datasets = activeIds.map(id => {
      const model = AI_MODELS_DATA[id];
      const vec = (typeof CAPABILITY_RADAR_10D !== 'undefined' ? CAPABILITY_RADAR_10D[id] : null) || {};
      if (!model) return null;

      const data = [
        vec.reasoning !== undefined ? vec.reasoning : (vec.algorithms || 75),
        vec.agentic !== undefined ? vec.agentic : (vec.agenticCoding || 75),
        vec.sweBench !== undefined ? vec.sweBench : (vec.toolShell || 75),
        vec.longContext !== undefined ? vec.longContext : 75,
        vec.multimodal !== undefined ? vec.multimodal : 75,
        vec.throughput !== undefined ? vec.throughput : 75,
        vec.costEfficiency !== undefined ? vec.costEfficiency : (vec.costBenefit || 75),
        vec.toolAdherence !== undefined ? vec.toolAdherence : (vec.toolShell || 75),
        vec.ttftLatency !== undefined ? vec.ttftLatency : 75,
        vec.openAccess !== undefined ? vec.openAccess : (vec.localEfficiency || 75)
      ];

      return {
        label: model.name,
        data: data,
        borderColor: model.color || '#38bdf8',
        backgroundColor: `${model.color || '#38bdf8'}25`,
        borderWidth: 2,
        pointBackgroundColor: model.color || '#38bdf8'
      };
    }).filter(Boolean);

    AppState.charts.compRadar = new Chart(canvas, {
      type: 'radar',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            pointLabels: { font: { family: 'Inter', size: 11, weight: '600' } },
            ticks: { display: false, max: 100, min: 0 }
          }
        },
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }

  function renderComparatorParetoMode() {
    const canvas = document.getElementById('compParetoCanvas');
    if (!canvas || typeof Chart === 'undefined') return;

    if (AppState.charts.compPareto) {
      AppState.charts.compPareto.destroy();
    }

    const activeIds = AppState.comparatorModels.filter(Boolean);
    const allModels = Object.values(AI_MODELS_DATA);
    const backgroundPoints = [];
    const selectedPoints = [];

    allModels.forEach(m => {
      const topCb = (typeof CURSORBENCH_32_DATA !== 'undefined' ? CURSORBENCH_32_DATA.filter(r => r.modelId === m.id).sort((a, b) => b.score - a.score)[0] : null);
      const cost = topCb ? topCb.costUsd : (m.pricing.standard ? (m.pricing.standard.input + m.pricing.standard.output) : 1.0);
      const score = topCb ? topCb.score : ((m.officialBenchmarks && m.officialBenchmarks.sweBenchVerified) ? m.officialBenchmarks.sweBenchVerified : 50);

      const pt = { x: cost, y: score, name: m.name, id: m.id, color: m.color || '#38bdf8' };
      if (activeIds.includes(m.id)) {
        selectedPoints.push(pt);
      } else {
        backgroundPoints.push(pt);
      }
    });

    AppState.charts.compPareto = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Modelos Selecionados',
            data: selectedPoints,
            backgroundColor: selectedPoints.map(p => p.color),
            borderColor: '#ffffff',
            borderWidth: 2,
            pointRadius: 9,
            pointHoverRadius: 11
          },
          {
            label: 'Outros Modelos do Dataset',
            data: backgroundPoints,
            backgroundColor: 'rgba(148, 163, 184, 0.4)',
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Custo por Tarefa ($ USD)' },
            grid: { color: 'rgba(255, 255, 255, 0.08)' }
          },
          y: {
            title: { display: true, text: 'Benchmark Score (%)' },
            grid: { color: 'rgba(255, 255, 255, 0.08)' }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const raw = ctx.raw;
                return `${raw.name}: Score ${raw.y.toFixed(1)}% | $${raw.x.toFixed(2)}`;
              }
            }
          }
        }
      }
    });

    const expBox = document.getElementById('compParetoExplanationBox');
    if (expBox && typeof DomainComparison !== 'undefined' && DomainComparison.getParetoExplanation) {
      expBox.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
          <h4 style="margin: 0; font-size: 0.9rem; color: var(--text-primary);">📐 Explicação Matemática da Fronteira de Pareto (Seção 30):</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
            ${activeIds.map(id => {
              const m = AI_MODELS_DATA[id];
              const pRes = DomainComparison.getParetoExplanation(id);
              const isP = pRes.isPareto;
              return `
                <div style="padding: 12px; background: var(--bg-surface); border: 1px solid ${isP ? 'rgba(56, 189, 248, 0.4)' : 'var(--border-subtle)'}; border-left: 4px solid ${isP ? 'var(--accent-cyan)' : 'var(--text-muted)'}; border-radius: var(--radius-xs);">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: var(--text-primary); font-size: 0.9rem;">${m ? m.name : id}</strong>
                    <span class="badge-tag ${isP ? 'badge-frontier' : 'badge-subdollar'}">${isP ? '✓ Fronteira Ativa' : 'Dominado'}</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 6px 0 0 0; line-height: 1.4;">
                    ${pRes.explanation}
                  </p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  }

  function renderComparatorAccessMode() {
    const container = document.getElementById('compAccessContainer');
    if (!container) return;

    const activeIds = AppState.comparatorModels.filter(Boolean);
    const selectedModels = activeIds.map(id => AI_MODELS_DATA[id]).filter(Boolean);

    container.innerHTML = `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Plataforma / Canal</th>
              ${selectedModels.map(m => `<th><strong>${m.name}</strong></th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Preço API Standard (In / Out)</strong></td>
              ${selectedModels.map(m => `<td>$${m.pricing.standard.input.toFixed(2)} / $${m.pricing.standard.output.toFixed(2)}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Prompt Cache Read (Hit)</strong></td>
              ${selectedModels.map(m => `<td>${m.pricing.standard.cacheRead !== null && m.pricing.standard.cacheRead !== undefined ? `$${m.pricing.standard.cacheRead.toFixed(4)}` : 'Padrão'}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Cursor IDE</strong></td>
              ${selectedModels.map(m => `<td>${m.cursorPool ? m.cursorPool.poolLabel : 'Other Models'}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>OpenCode Go</strong></td>
              ${selectedModels.map(m => `<td>${m.openCodeGo && m.openCodeGo.available ? `Classe $${m.openCodeGo.usageAllowanceUsd} (${m.openCodeGo.quotaBurnMultiplier}× burn)` : 'Não listado'}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Google Antigravity</strong></td>
              ${selectedModels.map(m => `<td>${m.antigravity ? m.antigravity.poolLabel : 'Indisponível'}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Planos de Assinatura</strong></td>
              ${selectedModels.map(m => {
                const plans = (typeof DomainEntities !== 'undefined' ? DomainEntities.getPlansForModel(m.id) : []);
                return `<td>${plans.length > 0 ? plans.map(p => `<a href="#plan/${p.id}" style="color: var(--accent-cyan); display: block; font-size: 0.78rem;">${p.planName}</a>`).join('') : '<span style="color:var(--text-muted);">Apenas API</span>'}</td>`;
              }).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  function renderComparatorGovernanceMode() {
    const container = document.getElementById('compGovernanceContainer');
    if (!container) return;

    const activeIds = AppState.comparatorModels.filter(Boolean);
    const selectedModels = activeIds.map(id => AI_MODELS_DATA[id]).filter(Boolean);

    container.innerHTML = `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Critério de Governança</th>
              ${selectedModels.map(m => `<th><strong>${m.name}</strong></th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Zero Data Retention (ZDR)</strong></td>
              ${selectedModels.map(m => `<td>${m.privacy && m.privacy.retentionDays === 0 ? '✅ ZDR Ativo (0 dias)' : 'Retenção Padrão'}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Treinamento em Dados</strong></td>
              ${selectedModels.map(m => `<td style="color: #10b981;">Zero treino por padrão</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Status dos Pesos</strong></td>
              ${selectedModels.map(m => `<td>${m.openWeights ? 'Pesos Abertos' : 'Proprietário Fechado'}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Licença de Uso</strong></td>
              ${selectedModels.map(m => `<td>${m.license || 'Comercial Proprietária'}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Confiança Metrológica</strong></td>
              ${selectedModels.map(m => `<td><span class="badge-tag badge-frontier">${(m.sourceConfidence || 'oficial').toUpperCase()}</span></td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

    function renderComparatorTable() {
    const table = document.getElementById('comparatorMainTable');
    if (!table) return;

    const activeIds = AppState.comparatorModels.filter(Boolean);
    const models = activeIds.map(id => AI_MODELS_DATA[id]).filter(Boolean);

    const rows = [
      { label: 'Provedor / Fabricante', get: m => m.providerName },
      { label: 'Arquitetura', get: m => m.architectureType },
      { label: 'Tipo de Atenção', get: m => m.attentionType },
      { label: 'Janela de Contexto', get: m => `${(m.contextWindow / 1000).toFixed(0)}k tokens` },
      { label: 'Output Máximo', get: m => `${(m.maxOutputTokens || 16384).toLocaleString()} tokens` },
      { label: 'Pesos Abertos (Open Weights)', get: m => m.openWeights ? '✅ Sim (Self-Hosted)' : '❌ Não (Nuvem Fechada)' },
      { label: 'Raciocínio (Thinking)', get: m => m.reasoning ? (m.reasoning.mandatory ? 'Mandatório' : 'Opcional') : 'Não' },
      { label: 'Preço Entrada (Input)', get: m => m.openWeights ? '$0,00' : `$${m.pricing.standard.input.toFixed(2)} / M` },
      { label: 'Preço Saída (Output)', get: m => m.openWeights ? '$0,00' : `$${m.pricing.standard.output.toFixed(2)} / M` },
      { label: 'Desconto Cache Hit', get: m => m.pricing.cacheDiscount ? `${m.pricing.cacheDiscount}%` : 'Padrão' },
      { label: 'Cota no OpenCode Go', get: m => m.openCodeGo && m.openCodeGo.available ? `Classe US$${m.openCodeGo.usageAllowanceUsd} (${m.openCodeGo.quotaBurnMultiplier}× burn • ~${(m.openCodeGo.estReqMonth || 0).toLocaleString()} req/mês)` : 'Não listado' },
      { label: 'Pool no Cursor Pro', get: m => m.cursorPool ? m.cursorPool.poolLabel : 'Via API' },
      { label: '🛡️ Google Antigravity Pool', get: m => m.antigravity ? `<span class="badge-tag ${m.antigravity.pool.includes('Gemini') ? 'badge-subdollar' : 'badge-danger'}">${m.antigravity.poolLabel}</span>` : 'N/D no Seletor Pro' },
      { label: 'Sweet Spot de Eficiência', get: m => m.sweetSpot || 'Standard' },
      { label: '🏆 SWE-bench Verified Oficial', get: m => m.officialBenchmarks && m.officialBenchmarks.sweBenchVerified ? `<strong class="highlight-green">${m.officialBenchmarks.sweBenchVerified}%</strong>` : '<span style="color: var(--text-muted);">N/D</span>' },
      { label: '🧠 Long-Context MRCR v2 (1M)', get: m => m.officialBenchmarks && m.officialBenchmarks.mrcrV2_1m_max ? `<strong class="highlight-purple">${m.officialBenchmarks.mrcrV2_1m_max}%</strong>` : '<span style="color: var(--text-muted);">-</span>' },
      // Métricas Auditadas Artificial Analysis (v4.1.1)
      { label: '🛡️ AA Intelligence Index (v4.1.1)', get: m => {
        const aa = ARTIFICIAL_ANALYSIS_DATA.rankings.find(r => r.modelId === m.id);
        return aa ? `<strong class="highlight-purple">${aa.aaIndex.toFixed(1)} / 100</strong> (Rank #${aa.rank})` : '<span style="color: var(--text-muted);">N/D público AA</span>';
      }},
      { label: '🛡️ GDPval-AA v2 (Rating Elo)', get: m => {
        const aa = ARTIFICIAL_ANALYSIS_DATA.rankings.find(r => r.modelId === m.id);
        return aa && aa.gdpvalElo ? `<strong>${aa.gdpvalElo} Elo</strong>` : '<span style="color: var(--text-muted);">N/D</span>';
      }},
      { label: '🛡️ Custo / Tarefa (AA Method)', get: m => {
        const aa = ARTIFICIAL_ANALYSIS_DATA.rankings.find(r => r.modelId === m.id);
        return aa ? `$${aa.costPerTask.toFixed(2)}` : '<span style="color: var(--text-muted);">N/D</span>';
      }},
      { label: '🛡️ Decode Medido (P50 tok/s)', get: m => {
        const aa = ARTIFICIAL_ANALYSIS_DATA.rankings.find(r => r.modelId === m.id);
        return aa ? `${aa.throughputTps.toFixed(1)} tok/s` : '<span style="color: var(--text-muted);">N/D</span>';
      }},
      { label: '🛡️ Long-Context (AA-LCR)', get: m => {
        const lcr = ARTIFICIAL_ANALYSIS_DATA.subBenchmarks.aaLcr.find(l => l.model.toLowerCase().includes(m.name.toLowerCase()));
        return lcr ? `<strong class="highlight-cyan">${lcr.scorePct.toFixed(1)}%</strong> (${lcr.badge})` : '<span style="color: var(--text-muted);">-</span>';
      }}
    ];

    const chk = document.getElementById('chkComparatorOnlyDiffs');
    if (chk) chk.checked = !!AppState.comparatorOnlyDiffs;

    const visibleRows = rows.map(r => {
      const renderedValues = models.map(m => String(r.get(m) || ''));
      const textValues = renderedValues.map(v => v.replace(/<[^>]*>/g, '').trim().toLowerCase());
      const hasDifference = textValues.some(v => v !== textValues[0]);
      return {
        label: r.label,
        renderedValues: renderedValues,
        hasDifference: hasDifference
      };
    }).filter(r => {
      if (!AppState.comparatorOnlyDiffs || models.length <= 1) return true;
      return r.hasDifference;
    });

    table.innerHTML = `
      <thead>
        <tr>
          <th>Especificação</th>
          ${models.map(m => {
            const provider = AI_PROVIDERS_DATA[m.provider] || {};
            const iconHtml = provider.iconSvg 
              ? `<span class="model-brand-icon" style="color: ${m.color || provider.brandColor || '#38bdf8'}; margin-right: 6px;">${provider.iconSvg}</span>`
              : '';
            return `<th style="color: ${m.color};"><div style="display: flex; align-items: center; gap: 6px;">${iconHtml}<span>${m.name}</span></div></th>`;
          }).join('')}
        </tr>
      </thead>
      <tbody>
        ${visibleRows.map(r => `
          <tr style="${r.hasDifference && models.length > 1 ? 'background: rgba(56, 189, 248, 0.02);' : ''}">
            <td>
              <strong>${r.label}</strong>
              ${r.hasDifference && models.length > 1 ? '<span style="font-size: 0.68rem; color: var(--accent-cyan); margin-left: 6px;">• Delta</span>' : ''}
            </td>
            ${r.renderedValues.map(val => `<td>${val}</td>`).join('')}
          </tr>
        `).join('')}
        ${visibleRows.length === 0 ? `<tr><td colspan="${models.length + 1}" style="text-align: center; padding: 24px; color: var(--text-muted);">Nenhuma diferença técnica detectada entre os modelos selecionados nas especificações avaliadas.</td></tr>` : ''}
      </tbody>
    `;
  }

  // ==========================================
  // 12. CALCULADORA DE VRAM REAL & HARDWARE
  // ==========================================
  // ==========================================
  // 12. CALCULADORA DE VRAM REAL & HARDWARE
  // ==========================================
  function initVramCalculator() {
    const modelSel = document.getElementById('calcModelSelect');
    const quantSel = document.getElementById('calcQuantSelect');
    const ctxSlider = document.getElementById('calcContextTokens');
    const kvSel = document.getElementById('calcKvQuantSelect');
    const concInput = document.getElementById('calcConcurrency');

    if (!modelSel) return;

    const openWeightModels = Object.values(AI_MODELS_DATA).filter(m => m.openWeights);
    modelSel.innerHTML = openWeightModels.map(m => `
      <option value="${m.id}">${m.name} (${m.paramsTotal || 'Repo'})</option>
    `).join('');

    [modelSel, quantSel, ctxSlider, kvSel, concInput].forEach(ctrl => {
      if (ctrl) {
        ctrl.addEventListener('input', () => {
          if (ctrl === ctxSlider && document.getElementById('lblCalcContext')) {
            document.getElementById('lblCalcContext').innerText = `${parseInt(ctxSlider.value).toLocaleString('pt-BR')}`;
          }
          if (ctrl === concInput && document.getElementById('lblCalcConcurrency')) {
            document.getElementById('lblCalcConcurrency').innerText = concInput.value;
          }
          updateVramCalculation();
        });
      }
    });
  }

  function updateVramCalculation() {
    const modelSel = document.getElementById('calcModelSelect');
    const quantSel = document.getElementById('calcQuantSelect');
    const ctxSlider = document.getElementById('calcContextTokens');
    const kvSel = document.getElementById('calcKvQuantSelect');
    const concInput = document.getElementById('calcConcurrency');

    if (!modelSel || !quantSel || !ctxSlider) return;

    if (!modelSel.options.length) {
      initVramCalculator();
    }

    const modelId = modelSel.value || 'gpt-oss-120b';
    const quant = quantSel.value || 'q4_k_m';
    const ctxTokens = parseInt(ctxSlider.value) || 32768;
    const kvQuant = kvSel ? kvSel.value : 'fp16';
    const concurrency = concInput ? parseInt(concInput.value) || 1 : 1;

    const model = AI_MODELS_DATA[modelId];
    if (!model) return;

    const res = AI_DATA_HELPERS.calculateVramRequirement(modelId, ctxTokens, quant);
    if (!res) return;

    const weightsGb = res.weightsGb;
    let kvCacheGb = res.kvCacheGb * concurrency;
    if (kvQuant === 'fp8') kvCacheGb *= 0.5;
    if (kvQuant === 'q4_0') kvCacheGb *= 0.25;
    const cudaGb = 1.2 + (concurrency * 0.2);
    const totalVramGb = (weightsGb + kvCacheGb + cudaGb);

    if (document.getElementById('valWeightsGb')) document.getElementById('valWeightsGb').innerText = `${weightsGb.toFixed(1)} GB`;
    if (document.getElementById('valKvGb')) document.getElementById('valKvGb').innerText = `${kvCacheGb.toFixed(1)} GB`;
    if (document.getElementById('valCudaGb')) document.getElementById('valCudaGb').innerText = `${cudaGb.toFixed(1)} GB`;
    if (document.getElementById('valTotalVramGb')) document.getElementById('valTotalVramGb').innerText = `${totalVramGb.toFixed(1)} GB`;

    if (document.getElementById('barWeights')) document.getElementById('barWeights').style.width = `${Math.min(100, (weightsGb / totalVramGb) * 100)}%`;
    if (document.getElementById('barKv')) document.getElementById('barKv').style.width = `${Math.min(100, (kvCacheGb / totalVramGb) * 100)}%`;
    if (document.getElementById('barCuda')) document.getElementById('barCuda').style.width = `${Math.min(100, (cudaGb / totalVramGb) * 100)}%`;

    const verdictEl = document.getElementById('valGpuVerdict');
    if (verdictEl) {
      if (totalVramGb <= 16) verdictEl.innerText = '✅ Roda em GPU de entrada (RTX 4060 Ti / RTX 4080)';
      else if (totalVramGb <= 24) verdictEl.innerText = '✅ Roda em GPU de consumidor (RTX 3090 / 4090 / 24GB)';
      else if (totalVramGb <= 32) verdictEl.innerText = '⚠️ Exige RTX 5090 (32GB) ou Mac M3/M4 Max';
      else if (totalVramGb <= 48) verdictEl.innerText = '⚠️ Exige 2x RTX 4090 (48GB) ou Mac Studio 64GB';
      else if (totalVramGb <= 96) verdictEl.innerText = '⚠️ Exige 4x RTX 4090 ou Mac Studio M2/M4 Ultra';
      else verdictEl.innerText = '🚨 Exige cluster de servidores ou quantização mais agressiva';
    }

    renderHardwareVerdictGrid(totalVramGb);
  }

  function renderHardwareVerdictGrid(totalVramGb) {
    const grid = document.getElementById('hardwareVerdictGrid');
    if (!grid || typeof HARDWARE_WORKSTATIONS_BR === 'undefined') return;

    grid.innerHTML = HARDWARE_WORKSTATIONS_BR.map(w => {
      const fits = w.vramGb >= totalVramGb;
      return `
        <div class="hardware-card ${fits ? 'fit' : 'oom'}" style="padding: 10px; border-radius: var(--radius-md); border: 1px solid ${fits ? 'var(--accent-emerald)' : 'var(--border-subtle)'}; background: var(--bg-surface-dim); margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${w.name}</strong> (${w.vramGb} GB)
            <div style="font-size: 0.75rem; color: var(--text-muted);">${w.badge} • R$ ${w.capexBr.toLocaleString('pt-BR')}</div>
          </div>
          <div>
            ${fits ? '<span class="badge-tag badge-subdollar">✅ Suporta</span>' : '<span class="badge-tag badge-danger">❌ OOM</span>'}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderHardwareWorkstationsTable() {
    const tbody = document.getElementById('hardwareWorkstationsTableBody');
    if (!tbody || typeof HARDWARE_WORKSTATIONS_BR === 'undefined') return;

    tbody.innerHTML = HARDWARE_WORKSTATIONS_BR.map(w => `
      <tr>
        <td>
          <strong style="color: var(--text-primary);">${w.name}</strong>
          <div style="font-size: 0.75rem; margin-top: 4px;"><span class="badge-tag badge-subdollar">${w.badge}</span></div>
        </td>
        <td><strong class="highlight-cyan">${w.vramGb} GB</strong></td>
        <td><strong class="highlight-green">R$ ${w.capexBr.toLocaleString('pt-BR')}</strong></td>
        <td>${w.powerWatts} W</td>
        <td style="font-size: 0.8rem; color: var(--text-secondary);">${w.modelsCapable.join(', ')}</td>
        <td><strong class="highlight-purple">${w.throughputTps}</strong></td>
        <td><strong class="highlight-amber">R$ ${w.costKwhMonth.toFixed(2)}</strong> / mês</td>
      </tr>
    `).join('');
  }

  // ==========================================
  // 13. CALCULADORA DE ROI DE EQUIPES
  // ==========================================
  function initRoiCalculator() {
    const devInput = document.getElementById('roiTeamSize') || document.getElementById('roiDevCount');
    const tasksInput = document.getElementById('roiTasksPerDev');
    const tokensInput = document.getElementById('roiAvgTokens');
    const usdInput = document.getElementById('roiUsdRate');
    const energyInput = document.getElementById('roiEnergyRate');

    // Inicialização dinâmica do dólar via FX_RATES_DATA sem hardcode
    if (usdInput && typeof FX_RATES_DATA !== 'undefined' && FX_RATES_DATA.USD_BRL && FX_RATES_DATA.USD_BRL.rate) {
      if (!usdInput.value) {
        usdInput.value = FX_RATES_DATA.USD_BRL.rate.toFixed(3);
      }
    }

    [devInput, tasksInput, tokensInput, usdInput, energyInput].forEach(ctrl => {
      if (ctrl) {
        ctrl.addEventListener('input', () => {
          updateRoiCalculation();
        });
      }
    });

    updateRoiCalculation();
  }

  function updateRoiCalculation() {
    const devCtrl = document.getElementById('roiTeamSize') || document.getElementById('roiDevCount');
    const devs = devCtrl ? (parseInt(devCtrl.value, 10) || 5) : 5;
    const tasksCtrl = document.getElementById('roiTasksPerDev');
    const tasks = tasksCtrl ? (parseInt(tasksCtrl.value, 10) || 120) : 120;
    const tokensCtrl = document.getElementById('roiAvgTokens');
    const tokens = tokensCtrl ? (parseInt(tokensCtrl.value, 10) || 25000) : 25000;
    const usdCtrl = document.getElementById('roiUsdRate');
    const usdRate = usdCtrl && parseFloat(usdCtrl.value) > 0
      ? parseFloat(usdCtrl.value)
      : (typeof FX_RATES_DATA !== 'undefined' && FX_RATES_DATA.USD_BRL ? FX_RATES_DATA.USD_BRL.rate : 5.108);
    const energyCtrl = document.getElementById('roiEnergyRate');
    const energyRate = energyCtrl ? (parseFloat(energyCtrl.value) || 0.85) : 0.85;

    const roi = AI_DATA_HELPERS.calculateTeamRoi(devs, tasks, tokens, energyRate, usdRate);

    const directElem = document.getElementById('roiDirectApiCostBrl');
    const subElem = document.getElementById('roiSubscriptionsCostBrl');
    const localElem = document.getElementById('roiLocalWorkstationCostBrl');
    const bannerElem = document.getElementById('roiSavingsBanner');

    if (directElem) directElem.innerText = `R$ ${roi.directApiAnnualBrl.toLocaleString('pt-BR')}`;
    if (subElem) subElem.innerText = `R$ ${roi.subscriptionsAnnualBrl.toLocaleString('pt-BR')}`;
    if (localElem) localElem.innerText = `R$ ${roi.localAnnualTotalBrl.toLocaleString('pt-BR')}`;

    if (bannerElem) {
      bannerElem.innerHTML = `
        💰 <strong>Economia Anual com Pool de Assinaturas:</strong> R$ ${roi.annualSavingsBrl.toLocaleString('pt-BR')} economizados vs APIs diretas (câmbio base: R$ ${usdRate.toFixed(3)}). 
        <br>Amortização de Workstation dedicada (RTX 5090): <strong>${roi.amortizationMonths} meses</strong>.
      `;
    }
  }

  // ==========================================
  // 14. SIMULADOR DE COTAS, WORKLOADS & VISÃO
  // ==========================================
  let currentWorkloadId = 'workload_1_bugfix';

  function initSimulator() {
    const sTasks = document.getElementById('simDevTasks');
    const sTokens = document.getElementById('simAvgTokens');
    const sCache = document.getElementById('simCacheHitRate');

    [sTasks, sTokens, sCache].forEach(ctrl => {
      if (ctrl) {
        ctrl.addEventListener('input', () => {
          if (ctrl === sTasks) document.getElementById('lblSimTasks').innerText = `${sTasks.value} tarefas`;
          if (ctrl === sTokens) document.getElementById('lblSimTokens').innerText = `${parseInt(sTokens.value).toLocaleString('pt-BR')} tokens`;
          if (ctrl === sCache) document.getElementById('lblSimCache').innerText = `${sCache.value}%`;
          updateSimulatorCalculation();
        });
      }
    });

    // Seletor de Workloads (Dropdown Select)
    const simSelect = document.getElementById('simWorkloadSelect');
    if (simSelect && !simSelect._bound) {
      simSelect._bound = true;
      simSelect.value = currentWorkloadId;
      simSelect.addEventListener('change', () => {
        currentWorkloadId = simSelect.value;
        renderStandardizedWorkloadsTable(currentWorkloadId);
      });
    }

    // Controles de Visão
    const sVisionCount = document.getElementById('visionScreenshotsCount');
    const sVisionTurns = document.getElementById('visionLoopTurnos');
    [sVisionCount, sVisionTurns].forEach(ctrl => {
      if (ctrl) {
        ctrl.addEventListener('input', () => {
          renderVisionComparisonTable();
        });
      }
    });
  }

  function updateSimulatorCalculation() {
    const tasks = parseInt(document.getElementById('simDevTasks').value);
    const tokens = parseInt(document.getElementById('simAvgTokens').value);
    const cacheHit = parseInt(document.getElementById('simCacheHitRate').value) / 100.0;

    const inTokens = tokens * (1 - cacheHit);
    const cachedTokens = tokens * cacheHit;
    const outTokens = 3000;

    const costPerTurnSol = AI_DATA_HELPERS.calculateRequestCost('gpt-5-6-sol', inTokens, cachedTokens, outTokens);
    const totalApiMonthly = costPerTurnSol * tasks;

    document.getElementById('simDirectApiCost').innerText = `$${totalApiMonthly.toFixed(2)} / mês`;
    document.getElementById('simGoLongevity').innerText = `Até $60 nominal (1× a 4× burn)`;
  }

  function renderStandardizedWorkloadsTable(workloadId) {
    if (workloadId) currentWorkloadId = workloadId;
    if (typeof STANDARDIZED_WORKLOADS_DATA === 'undefined') return;

    const workload = STANDARDIZED_WORKLOADS_DATA.workloads.find(w => w.id === currentWorkloadId) || STANDARDIZED_WORKLOADS_DATA.workloads[0];
    
    // Renderiza card do workload ativo
    const cardContainer = document.getElementById('workloadActiveCardContainer');
    if (cardContainer) {
      cardContainer.innerHTML = `
        <div class="workload-active-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--accent-purple); font-size: 1.05rem;">${workload.name}</strong>
            <span class="badge-tag badge-frontier">${workload.badge}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">${workload.description}</p>
          <div class="workload-meta-grid">
            <div class="workload-meta-item"><div class="workload-meta-label">Novos Tokens (In)</div><div class="workload-meta-val highlight-cyan">${workload.inputNewTokens.toLocaleString('pt-BR')}</div></div>
            <div class="workload-meta-item"><div class="workload-meta-label">Cache Read Tokens</div><div class="workload-meta-val highlight-green">${workload.inputCachedTokens.toLocaleString('pt-BR')}</div></div>
            <div class="workload-meta-item"><div class="workload-meta-label">Output / Reasoning</div><div class="workload-meta-val highlight-purple">${workload.outputTokens.toLocaleString('pt-BR')}</div></div>
            <div class="workload-meta-item"><div class="workload-meta-label">Turnos Típicos</div><div class="workload-meta-val">${workload.typicalTurns} turnos</div></div>
          </div>
        </div>
      `;
    }

    // Renderiza tabela comparativa para os modelos
    const tbody = document.getElementById('workloadsComparisonTableBody');
    if (tbody) {
      const allModelIds = Object.keys(AI_MODELS_DATA);
      const computedList = allModelIds.map(id => {
        const m = AI_MODELS_DATA[id];
        const cost = AI_DATA_HELPERS.calculateRequestCost(id, workload.inputNewTokens, workload.inputCachedTokens, workload.outputTokens) || 0;
        return { model: m, cost: cost };
      }).filter(item => item.model);

      computedList.sort((a, b) => a.cost - b.cost);

      const baseCost = computedList.find(c => c.cost > 0) ? computedList.find(c => c.cost > 0).cost : 0.001;

      tbody.innerHTML = computedList.map(({ model: m, cost }) => {
        const multiple = cost === 0 ? '0.0x (Grátis)' : (cost / baseCost).toFixed(1) + 'x';
        const reqsPer10Usd = cost === 0 ? 'Ilimitado (Local)' : '~' + Math.floor(10 / cost).toLocaleString('pt-BR') + ' tarefas';
        
        let quotaBadge = m.openWeights
          ? '<span class="badge-tag badge-openweights">Open-Weights (Local)</span>'
          : m.cursorPool && m.cursorPool.pool === 'cursor-models' 
            ? '<span class="badge-tag badge-subdollar">Pool Cursor (Grátis)</span>'
            : m.openCodeGo && m.openCodeGo.available
              ? `<span class="badge-tag ${m.openCodeGo.quotaBurnMultiplier === 1 ? 'badge-go-60' : m.openCodeGo.quotaBurnMultiplier === 2 ? 'badge-go-30' : 'badge-go-15'}">Go ${m.openCodeGo.quotaBurnMultiplier}× burn</span>`
              : '<span class="badge-tag badge-sweetspot">Pay-as-you-go</span>';

        return `
          <tr>
            <td><strong style="color: ${m.color}; cursor: pointer;" onclick="location.hash='#model/${m.id}'">${m.name}</strong></td>
            <td>${m.providerName}</td>
            <td><strong class="highlight-green">${cost === 0 ? '$0,00 (Local)' : '$' + cost.toFixed(4)}</strong></td>
            <td><strong class="${multiple === '1.0x' || cost === 0 ? 'highlight-cyan' : parseFloat(multiple) > 20 ? 'highlight-red' : ''}">${multiple}</strong></td>
            <td>${reqsPer10Usd}</td>
            <td>${quotaBadge}</td>
          </tr>
        `;
      }).join('');
    }
  }

  function renderVisionComparisonTable() {
    if (typeof VISION_COST_BENCHMARKS === 'undefined') return;

    const sCount = document.getElementById('visionScreenshotsCount');
    const sTurns = document.getElementById('visionLoopTurnos');
    const count = parseInt(sCount ? sCount.value : 500);
    const turns = parseInt(sTurns ? sTurns.value : 5);

    const lblCount = document.getElementById('lblVisionCount');
    if (lblCount) lblCount.innerText = `${count.toLocaleString('pt-BR')} imagens`;
    const lblTurns = document.getElementById('lblVisionTurns');
    if (lblTurns) lblTurns.innerText = `${turns} capturas / loop`;
    const lblTotal = document.getElementById('lblVisionTotalCount');
    if (lblTotal) lblTotal.innerText = count.toLocaleString('pt-BR');

    const tbody = document.getElementById('visionComparisonTableBody');
    if (!tbody) return;

    const baseCostUnit = VISION_COST_BENCHMARKS.models[0].costPerImage;

    tbody.innerHTML = VISION_COST_BENCHMARKS.models.map(m => {
      const totalCost = m.costPerImage * count;
      const multiple = (m.costPerImage / baseCostUnit).toFixed(1);
      return `
        <tr>
          <td><strong style="color: var(--text-primary); cursor: pointer;" onclick="location.hash='#model/${m.id}'">${m.name}</strong></td>
          <td><strong class="highlight-cyan">${m.tokensPerImage.toLocaleString('pt-BR')} tokens</strong></td>
          <td><strong class="highlight-green">$${m.costPerImage.toFixed(6)}</strong></td>
          <td><strong class="highlight-purple">$${totalCost.toFixed(2)}</strong></td>
          <td><strong class="${multiple === '1.0' ? 'highlight-cyan' : 'highlight-rose'}">${multiple}x</strong></td>
          <td><span class="badge-tag ${m.badge.includes('Ultra') ? 'badge-subdollar' : 'badge-frontier'}">${m.maxResolution}</span></td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================
  // 15. MODEL ROUTER (DECISÃO INTELIGENTE)
  // ==========================================
  function initModelRouter() {
    const taskChips = document.getElementById('routerTaskChips');
    const budgetChips = document.getElementById('routerBudgetChips');
    const privacyChips = document.getElementById('routerPrivacyChips');

    const bindChipGroup = (container, stateKey) => {
      if (!container) return;

      const updateGroupState = (btn) => {
        container.querySelectorAll('.router-chip').forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        AppState[stateKey] = btn.getAttribute(stateKey === 'routerTask' ? 'data-task' : stateKey === 'routerBudget' ? 'data-budget' : 'data-privacy');
        updateRouterResult();
      };

      container.addEventListener('click', (e) => {
        const btn = e.target.closest('.router-chip');
        if (btn) updateGroupState(btn);
      });

      container.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const btn = e.target.closest('.router-chip');
          if (btn) {
            e.preventDefault();
            updateGroupState(btn);
          }
        }
      });
    };

    bindChipGroup(taskChips, 'routerTask');
    bindChipGroup(budgetChips, 'routerBudget');
    bindChipGroup(privacyChips, 'routerPrivacy');
  }

  function updateRouterResult() {
    const panel = document.getElementById('routerResultPanel');
    if (!panel) return;

    const rec = AI_DATA_HELPERS.recommendModel(AppState.routerTask, AppState.routerBudget, AppState.routerPrivacy);

    if (!rec || !rec.primaryModelId) {
      panel.innerHTML = `
        <div style="text-align: center; padding: 28px 16px; color: var(--text-muted);">
          🔍 Nenhuma recomendação exata encontrada para esses critérios. Tente flexibilizar o orçamento ou privacidade.
        </div>
      `;
      return;
    }

    const primaryModel = AI_MODELS_DATA[rec.primaryModelId] || {};
    const fallbackModelId = rec.fallbackCascade && rec.fallbackCascade[0] ? rec.fallbackCascade[0] : null;
    const fallbackModel = fallbackModelId ? AI_MODELS_DATA[fallbackModelId] : null;

    const priceInfo = primaryModel.pricing && primaryModel.pricing.standard
      ? `$${primaryModel.pricing.standard.input.toFixed(2)} in / $${primaryModel.pricing.standard.output.toFixed(2)} out`
      : (primaryModel.openWeights ? 'Gratuito (Pesos Abertos)' : 'Consulte Tabela');

    panel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
        <div>
          <span class="badge-tag badge-frontier" style="margin-bottom: 6px;">🎯 Recomendação Principal</span>
          <h3 style="color: var(--accent-cyan); margin: 4px 0 0 0; font-size: 1.35rem;">${rec.primaryModelName}</h3>
          <div style="font-size: 0.84rem; color: var(--text-muted);">${primaryModel.providerName || 'Oficial'} · ${primaryModel.architectureType || 'Arquitetura de Fronteira'}</div>
        </div>
        <div style="text-align: right;">
          <span class="badge-tag badge-subdollar">${priceInfo}</span>
          <div style="font-size: 0.76rem; color: #10b981; margin-top: 4px;">✔ Confiança: Alta (Metrologia [M] + [D])</div>
        </div>
      </div>

      <div class="content-box" style="margin-bottom: 16px; background: rgba(6, 182, 212, 0.04); border-left: 4px solid var(--accent-cyan);">
        <h4 style="margin-bottom: 6px; font-size: 0.95rem; color: var(--accent-cyan);">💡 Justificativa Técnica do Roteador</h4>
        <p style="color: var(--text-primary); font-size: 0.88rem; line-height: 1.5; margin: 0;">${rec.rationale}</p>
      </div>

      <!-- Arquitetura Agêntica Recomendada -->
      <h4 style="font-size: 0.9rem; margin-bottom: 8px;">🤖 Divisão de Papéis no Pipeline:</h4>
      <div class="specs-grid" style="margin-bottom: 16px;">
        <div class="spec-item-card"><div class="spec-label">Agente Planejador (Planner)</div><div class="spec-value highlight-cyan">${rec.planner}</div></div>
        <div class="spec-item-card"><div class="spec-label">Agente Executor de Código</div><div class="spec-value highlight-green">${rec.executor}</div></div>
        <div class="spec-item-card"><div class="spec-label">Agente Revisor (Reviewer)</div><div class="spec-value highlight-amber">${rec.reviewer}</div></div>
        <div class="spec-item-card"><div class="spec-label">Cascata de Fallback</div><div class="spec-value">${rec.fallbackCascade.join(' ➔ ')}</div></div>
      </div>

      <!-- Trade-offs e Limitações -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 16px;">
        <div style="padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
          <strong style="color: #10b981; font-size: 0.85rem;">✨ Pontos Fortes em Produção:</strong>
          <ul style="margin: 6px 0 0 0; padding-left: 18px; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
            <li>Alta aderência sintática no monorepo e conformidade a tipos.</li>
            <li>Latência equilibrada para turnos iterativos de raciocínio.</li>
          </ul>
        </div>
        <div style="padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
          <strong style="color: #f59e0b; font-size: 0.85rem;">⚖️ Trade-offs & Atenção:</strong>
          <ul style="margin: 6px 0 0 0; padding-left: 18px; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
            <li>Custo pode escalar em loops contínuos sem prompt caching ativo.</li>
            <li>Para autocomplete linha-a-linha de ultra-baixa latência (&lt;100ms), prefira modelos especializados.</li>
          </ul>
        </div>
      </div>

      <!-- Alternativas e Ações -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px solid var(--border-subtle);">
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          ${fallbackModel ? `Alternativa viável imediata: <strong>${fallbackModel.name}</strong>` : 'Alternativas na mesma classe de capacidade.'}
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn-secondary btn-sm" onclick="location.hash='#plans?model=${rec.primaryModelId}'">💳 Planos com este Modelo</button>
          ${fallbackModelId ? `<button class="btn-secondary btn-sm" onclick="window.AIApp.openComparatorWith('${rec.primaryModelId}');">⚔️ Comparar com ${fallbackModel ? fallbackModel.name : 'Alternativa'}</button>` : ''}
          <button class="btn-primary btn-sm" onclick="location.hash='#model/${rec.primaryModelId}'">📄 Abrir Dossiê Completo →</button>
        </div>
      </div>
    `;
  }

    // ==========================================
  // 16. MATRIZ DE HARNESSES 15x11 & TROUBLESHOOTER
  // ==========================================
  function renderHarnessMatrix() {
    const table = document.getElementById('harnessMatrixTable');
    if (!table) return;

    const harnesses = HARNESS_COMPATIBILITY_DATA.harnesses;
    const matrix = HARNESS_COMPATIBILITY_DATA.matrix;
    const modelIds = Object.keys(matrix);

    table.innerHTML = `
      <thead>
        <tr>
          <th>Modelo / Harness</th>
          ${harnesses.map(h => `<th>${h.name}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${modelIds.map(id => {
          const model = AI_MODELS_DATA[id] || { name: id };
          const row = matrix[id];
          return `
            <tr>
              <td><strong>${model.name}</strong></td>
              <td>${row.opencode || '-'}</td>
              <td>${row.cursor || '-'}</td>
              <td>${row.qwenCode || '-'}</td>
              <td>${row.grokBuild || '-'}</td>
              <td>${row.codexCli || '-'}</td>
              <td>${row.claudeCode || '-'}</td>
              <td>${row.aider || '-'}</td>
              <td>${row.rooCode || '-'}</td>
              <td>${row.cline || '-'}</td>
              <td>${row.kilo || '-'}</td>
              <td>${row.openhands || '-'}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderCliSnippets() {
    const container = document.getElementById('cliSnippetsContainer');
    if (!container || typeof CLI_CONFIG_SNIPPETS === 'undefined') return;

    container.innerHTML = CLI_CONFIG_SNIPPETS.map(snip => `
      <div class="cli-snippet-card">
        <div class="cli-snippet-header">
          <div class="cli-snippet-title">
            <span>⚙️</span> <strong>${snip.title}</strong>
          </div>
          <span class="cli-snippet-meta">${snip.filename}</span>
        </div>
        <div class="cli-snippet-code-box">
          <button class="btn-copy-snippet" onclick="copyTextToClipboard(\`${snip.code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`); showToast('📋 Snippet copiado com sucesso!');">
            📋 Copiar Snippet
          </button>
          <pre class="cli-snippet-code"><code>${escapeHtml(snip.code)}</code></pre>
        </div>
        <div class="cli-snippet-desc">💡 ${snip.explanation}</div>
      </div>
    `).join('');
  }

  let _troubleshootSearchQuery = '';

  function renderTroubleshooter() {
    const container = document.getElementById('troubleshootListContainer');
    const searchInput = document.getElementById('troubleshootSearchInput');
    if (!container) return;

    if (searchInput && !searchInput._bound) {
      searchInput._bound = true;
      searchInput.addEventListener('input', (e) => {
        _troubleshootSearchQuery = e.target.value.trim();
        renderTroubleshooter();
      });
    }

    let items = (typeof TROUBLESHOOTER_DATABASE !== 'undefined' ? TROUBLESHOOTER_DATABASE : []);
    if (_troubleshootSearchQuery) {
      const q = _troubleshootSearchQuery.toLowerCase();
      items = items.filter(item => {
        const full = `${item.title} ${item.harness} ${(item.models || []).join(' ')} ${item.cause} ${item.solution}`.toLowerCase();
        return full.includes(q);
      });
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="content-box" style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
          🔍 Nenhum erro encontrado para o termo "<strong>${escapeHtml(_troubleshootSearchQuery)}</strong>".
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="content-box">
        <h3 style="color: var(--accent-rose); margin-bottom: 6px;">⚠️ ${item.title}</h3>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Harness: <strong>${item.harness}</strong> • Modelos Afetados: ${item.models.join(', ')}</div>
        <p style="color: var(--text-secondary); margin-bottom: 12px;"><strong>Causa Raiz:</strong> ${item.cause}</p>
        <div style="background: var(--bg-surface-dim); border: 1px solid var(--border-subtle); border-left: 3px solid var(--accent-emerald); padding: 12px; border-radius: var(--radius-sm);">
          <strong style="color: var(--accent-emerald);">Solução Verificada:</strong>
          <div style="margin-top: 6px; color: var(--text-primary);">${item.solution}</div>
        </div>
      </div>
    `).join('');
  }

  function renderPrivacyTable() {
    const tbody = document.getElementById('privacyTableBody');
    if (!tbody) return;

    tbody.innerHTML = Object.values(PRIVACY_ZDR_DATABASE).map(p => `
      <tr>
        <td><strong>${p.provider}</strong></td>
        <td>${p.retentionDays === 0 ? '<span class="badge-tag badge-subdollar">0 Dias (Sem Retenção)</span>' : `${p.retentionDays} Dias`}</td>
        <td>${p.trainingOnPrompts ? '<span class="badge-tag badge-danger">⚠️ Sim (Treinamento Ativo)</span>' : '<span class="badge-tag badge-subdollar">❌ Não (Privado)</span>'}</td>
        <td>${p.zdrGuaranteed ? '✅ Garantido em Contrato' : '❌ Não Aplicável'}</td>
        <td style="font-size: 0.8rem;">${p.notes}</td>
      </tr>
    `).join('');
  }

  function renderAntigravityPoolsView() {
    if (typeof ANTIGRAVITY_POOLS_DATA === 'undefined') return;

    // 1. Renderiza os passos do funil de preservação
    const funnelContainer = document.getElementById('antigravityFunnelSteps');
    if (funnelContainer) {
      funnelContainer.innerHTML = ANTIGRAVITY_POOLS_DATA.funnelWorkflow.map(step => `
        <div class="funnel-step-row">
          <div class="funnel-step-number">${step.step}</div>
          <div class="funnel-step-content">
            <div class="funnel-step-header">
              <span class="funnel-step-condition">${step.condition}</span>
              <span class="badge-tag ${step.step === 1 ? 'badge-subdollar' : step.step === 2 ? 'badge-frontier' : step.step === 3 ? 'badge-sweetspot' : 'badge-warning'}">${step.badge}</span>
            </div>
            <div class="funnel-step-action">
              <strong>${step.targetPool}</strong> ➔ <strong style="color: var(--accent-cyan);">${step.model}</strong>: ${step.action}
            </div>
          </div>
        </div>
      `).join('');
    }

    // 2. Renderiza a tabela comparativa de modelos do Antigravity
    const tbody = document.getElementById('antigravityModelsTableBody');
    if (tbody) {
      const antigravityModels = [
        { modelId: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6 (Thinking)', pool: 'Pool 2: Claude & GPT', effort: 'Adaptive Thinking (Default)', swe: '79,6%', gpqa: '89,9%', mrcr: '65,8%', valueRank: '🥇 1º Lugar (Maior Eficiência)', badgeClass: 'badge-frontier' },
        { modelId: 'claude-opus-4-6', name: 'Claude Opus 4.6 (Thinking)', pool: 'Pool 2: Claude & GPT', effort: 'Adaptive Thinking (Deep)', swe: '80,8%', gpqa: '91,3%', mrcr: '78,3% (Líder 1M)', valueRank: '🥈 2º Lugar (Escalonamento Crítico)', badgeClass: 'badge-frontier' },
        { modelId: 'gpt-oss-120b', name: 'GPT-OSS 120B (Medium)', pool: 'Pool 2: Claude & GPT', effort: 'Medium Effort (Fixo)', swe: '52,6%', gpqa: '73,1%', mrcr: 'N/D (128k)', valueRank: '🥉 3º Lugar (⚠️ Consome Cota Claude)', badgeClass: 'badge-warning' },
        { modelId: 'gemini-3-7-flash', name: 'Gemini 3.7 Flash', pool: 'Pool 1: Gemini Models', effort: 'Thinking Configurável', swe: '73,8%', gpqa: '94,5%', mrcr: '98,0% (1M)', valueRank: '🌟 Cota Proporcional (8x Economia)', badgeClass: 'badge-subdollar' }
      ];

      tbody.innerHTML = antigravityModels.map(m => `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="color: var(--text-primary); cursor: pointer;" onclick="location.hash='#model/${m.modelId}'">${m.name}</strong>
            </div>
          </td>
          <td><span class="badge-tag ${m.pool.includes('Pool 1') ? 'badge-subdollar' : 'badge-danger'}">${m.pool}</span></td>
          <td>${m.effort}</td>
          <td><strong class="highlight-green">${m.swe}</strong></td>
          <td>${m.gpqa}</td>
          <td><strong class="highlight-purple">${m.mrcr}</strong></td>
          <td><span class="badge-tag ${m.badgeClass}">${m.valueRank}</span></td>
          <td>
            <button class="btn-table-action" onclick="location.hash='#model/${m.modelId}'" title="Ver Dossiê">
              🔍 Dossiê
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // ==========================================
  // 17. VIEW: EXPLORADOR DE PLANOS, MODELOS & ORÇAMENTO (06)
  // ==========================================

  function renderPlansView() {
    if (typeof SUBSCRIPTION_PLANS_DATA === 'undefined') return;

    // 1. Atualiza Navegação de Abas do Explorador
    const currentTab = AppState.planActiveTab || 'plans';
    const tabs = document.querySelectorAll('#planExplorerTabs .tab-btn');
    tabs.forEach(btn => {
      const isAct = btn.getAttribute('data-tab') === currentTab;
      btn.classList.toggle('active', isAct);
      btn.setAttribute('aria-selected', isAct ? 'true' : 'false');
    });

    // 2. Atualiza Alternadores de Moeda e Ciclo
    const currBtns = document.querySelectorAll('#currencyToggleGroup .btn-toggle');
    currBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-currency') === (AppState.planCurrency || 'BRL'));
    });
    const cycleBtns = document.querySelectorAll('#billingCycleToggleGroup .btn-toggle');
    cycleBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cycle') === (AppState.planBillingCycle || 'monthly'));
    });

    // 3. Atualiza Badges de Contagem (Header, Comparador e Favoritos)
    const totalPlans = SUBSCRIPTION_PLANS_DATA.length;
    const totalModels = typeof AI_MODELS_DATA !== 'undefined' ? (Array.isArray(AI_MODELS_DATA) ? AI_MODELS_DATA.length : Object.keys(AI_MODELS_DATA).length) : 44;
    const totalCompanies = (typeof PlanExplorer !== 'undefined' && PlanExplorer.PLAN_UI_CONFIG?.companiesOrder) ? PlanExplorer.PLAN_UI_CONFIG.companiesOrder.length : 9;
    const countersBadge = document.getElementById('planCountersBadge');
    if (countersBadge) {
      countersBadge.textContent = `${totalCompanies} empresas · ${totalPlans} planos · ${totalModels} modelos`;
    }

    const compareBadge = document.getElementById('compareBadgeCount');
    if (compareBadge) {
      const cmpLen = (AppState.selectedPlanCompare || []).length;
      compareBadge.textContent = cmpLen;
      compareBadge.style.display = cmpLen > 0 ? 'inline-block' : 'none';
    }

    const favBadge = document.getElementById('favoritesBadgeCount');
    if (favBadge) {
      const favLen = (AppState.planFavoritesList || []).length;
      favBadge.textContent = favLen;
      favBadge.style.display = favLen > 0 ? 'inline-block' : 'none';
    }

    // 4. Alterna Visibilidade dos Painéis de Sub-views
    const tabPanels = [
      { id: 'tabContentPlans', tab: 'plans', fn: renderTabPlans },
      { id: 'tabContentModels', tab: 'models', fn: renderTabModels },
      { id: 'tabContentBudget', tab: 'budget', fn: renderTabBudget },
      { id: 'tabContentCompare', tab: 'compare', fn: renderTabCompare },
      { id: 'tabContentFavorites', tab: 'favorites', fn: renderTabFavorites }
    ];

    tabPanels.forEach(tp => {
      const el = document.getElementById(tp.id);
      if (el) {
        const isActive = tp.tab === currentTab;
        el.style.display = isActive ? 'block' : 'none';
        el.classList.toggle('active', isActive);
        if (isActive) tp.fn();
      }
    });

    updatePlanCompareTray();
  }

  // ----------------------------------------------------
  // SUB-VIEW 1: ABA PLANOS (Catálogo, Sidebar & Acordeão)
  // ----------------------------------------------------
  function renderTabPlans() {
    renderSidebarFilters();
    renderFilteredPlansList();
  }

  function renderSidebarFilters() {
    if (typeof PlanExplorer === 'undefined') return;

    // Renderiza pílulas de empresas na sidebar
    const compContainer = document.getElementById('companyFilterPills');
    if (compContainer) {
      const byComp = PlanExplorer.getPlansByCompany(SUBSCRIPTION_PLANS_DATA);
      const selected = AppState.planSelectedCompanies || [];

      compContainer.innerHTML = PlanExplorer.PLAN_UI_CONFIG.companiesOrder.map(cId => {
        const conf = PlanExplorer.PLAN_UI_CONFIG.companies[cId] || { name: cId, icon: '🏢' };
        const count = (byComp[cId] || []).length;
        const isActive = selected.includes(cId);

        return `
          <button type="button" class="filter-pill ${isActive ? 'active' : ''}" onclick="window.AIApp.toggleCompanyFilter('${cId}')">
            ${conf.icon} ${conf.name} <span style="opacity: 0.7; font-size: 0.7rem;">(${count})</span>
          </button>
        `;
      }).join('');
    }

    // Atualiza valores dos inputs da sidebar com base no AppState
    const slider = document.getElementById('planPriceSlider');
    if (slider) slider.value = AppState.planMaxPrice !== undefined ? AppState.planMaxPrice : 250;

    const valLabel = document.getElementById('priceSliderCurrentVal');
    if (valLabel) {
      valLabel.textContent = AppState.planMaxPrice >= 250 ? 'Sem limite' : `Até US$ ${AppState.planMaxPrice}`;
    }

    const audSel = document.getElementById('planAudienceFilter');
    if (audSel) audSel.value = AppState.planAudience || 'all';

    const profSel = document.getElementById('planProfileFilter');
    if (profSel) profSel.value = AppState.planProfile || 'all';

    const privSel = document.getElementById('planPrivacyFilter');
    if (privSel) privSel.value = AppState.planPrivacyFilter || 'all';

    const predCheck = document.getElementById('filterPredictableOnly');
    if (predCheck) predCheck.checked = !!AppState.filterPredictableOnly;

    const byokCheck = document.getElementById('filterByokOnly');
    if (byokCheck) byokCheck.checked = !!AppState.filterByokOnly;

    const apiCheck = document.getElementById('filterApiIncluded');
    if (apiCheck) apiCheck.checked = !!AppState.filterApiIncluded;

    const storageCheck = document.getElementById('filterCloudStorageOnly');
    if (storageCheck) storageCheck.checked = !!AppState.filterCloudStorageOnly;

    const groupSel = document.getElementById('planGroupingSelect');
    if (groupSel) groupSel.value = AppState.planGrouping || 'company';

    const sortSel = document.getElementById('planSortSelect');
    if (sortSel) sortSel.value = AppState.planSort || 'default';

    const searchInp = document.getElementById('planSearchInput');
    if (searchInp && searchInp.value !== AppState.planSearchQuery) {
      searchInp.value = AppState.planSearchQuery || '';
    }
  }

  function renderFilteredPlansList() {
    if (typeof PlanExplorer === 'undefined') return;

    let plans = SUBSCRIPTION_PLANS_DATA.filter(p => p.current);

    // 1. Filtro por Empresa
    const selComps = AppState.planSelectedCompanies || [];
    if (selComps.length > 0) {
      plans = plans.filter(p => {
        const pComp = (p.provider === 'anysphere' ? 'cursor' : p.provider === 'moonshot' ? 'kimi' : p.provider?.toLowerCase());
        return selComps.includes(pComp);
      });
    }

    // 2. Filtro por Preço Máximo
    if (AppState.planMaxPrice !== undefined && AppState.planMaxPrice < 250) {
      plans = plans.filter(p => {
        if (p.monthlyPriceUsd === null || p.monthlyPriceUsd === undefined) return false;
        return p.monthlyPriceUsd <= AppState.planMaxPrice;
      });
    }

    // 3. Filtro por Público
    if (AppState.planAudience && AppState.planAudience !== 'all') {
      plans = plans.filter(p => p.targetAudience === AppState.planAudience);
    }

    // 4. Filtro por Perfil
    if (AppState.planProfile && AppState.planProfile !== 'all') {
      plans = plans.filter(p => p.profileTags && p.profileTags.includes(AppState.planProfile));
    }

    // 5. Filtro por Custo Previsível (Seção 79)
    if (AppState.filterPredictableOnly) {
      plans = plans.filter(p => {
        const vb = PlanExplorer.getPlanVariableBilling(p);
        return vb.predictable;
      });
    }

    // 6. Filtro por BYOK (Seção 80)
    if (AppState.filterByokOnly) {
      plans = plans.filter(p => {
        const feats = (p.features || []).join(' ').toLowerCase();
        return feats.includes('byok') || (p.notes || '').toLowerCase().includes('byok');
      });
    }

    // 7. Filtro por API Incluída / Créditos de API (Seção 81)
    if (AppState.filterApiIncluded) {
      plans = plans.filter(p => p.apiIncluded || (p.credits && (p.credits.agentSdkMonthlyCreditUsd > 0 || p.credits.premiumModelCreditsUsd > 0)) || (p.surfaces || []).includes('api') || (p.features || []).some(f => f.toLowerCase().includes('api')));
    }

    // 8. Filtro por Cloud Storage (>= 1 TB) (Seção 82)
    if (AppState.filterCloudStorageOnly) {
      plans = plans.filter(p => p.storage && p.storage.includedGb >= 1000);
    }

    // 9. Filtro por Privacidade (Seção 83)
    if (AppState.planPrivacyFilter && AppState.planPrivacyFilter !== 'all') {
      plans = plans.filter(p => {
        if (!p.privacy) return false;
        if (AppState.planPrivacyFilter === 'no-training') {
          return p.privacy.noTrainingByDefault === true || p.privacy.modelTrainingControl === 'never';
        }
        if (AppState.planPrivacyFilter === 'zdr') {
          return p.privacy.zeroDataRetentionContract === true || p.privacy.modelTrainingControl === 'zdr-contract';
        }
        if (AppState.planPrivacyFilter === 'consumer') {
          return p.privacy.modelTrainingControl === 'opt-out' || p.privacy.modelTrainingControl === 'opt-in';
        }
        if (AppState.planPrivacyFilter === 'retention-warning') {
          return p.privacyNotes?.toLowerCase().includes('treino') || p.privacyNotes?.toLowerCase().includes('training') || p.id === 'camelai-stream-flat';
        }
        return true;
      });
    }

    // 10. Busca Textual
    if (AppState.planSearchQuery && AppState.planSearchQuery.trim()) {
      plans = PlanExplorer.searchPlans(plans, AppState.planSearchQuery);
    }

    // 11. Ordenação
    plans = sortPlansList(plans, AppState.planSort);

    // 12. Renderiza Chips de Filtros Ativos (Seção 107)
    renderActiveFilterChips();

    // 13. Atualiza Texto do Contador (Seção 108)
    const countText = document.getElementById('planResultsCountText');
    if (countText) {
      countText.textContent = `Exibindo ${plans.length} de ${SUBSCRIPTION_PLANS_DATA.length} planos`;
    }

    // 14. Renderiza Container Principal com base no Agrupamento
    const container = document.getElementById('companiesContainer');
    if (!container) return;

    if (plans.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 48px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle); color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
          <h4 style="color: var(--text-primary); margin-bottom: 6px;">Nenhum plano atende a todos os filtros selecionados</h4>
          <p style="font-size: 0.85rem; max-width: 460px; margin: 0 auto 16px auto; line-height: 1.5;">
            Tente:<br>
            • Aumentar o teto de orçamento no slider;<br>
            • Permitir planos com opções de chave própria (BYOK);<br>
            • Permitir custos ou créditos variáveis adicionais.
          </p>
          <button class="btn-secondary btn-sm" onclick="window.AIApp.resetAllPlanFilters()">Limpar Todos os Filtros</button>
        </div>
      `;
      return;
    }

    const grouping = AppState.planGrouping || 'company';

    if (grouping === 'company') {
      renderCompanyAccordion(container, plans);
    } else if (grouping === 'price') {
      renderPriceGrouped(container, plans);
    } else if (grouping === 'type') {
      renderTypeGrouped(container, plans);
    } else {
      // Sem agrupamento: grid direto
      container.innerHTML = `
        <div class="plans-grid">
          ${plans.map(p => renderPlanCard(p)).join('')}
        </div>
      `;
    }
  }

  function sortPlansList(plans, sortKey) {
    const list = [...plans];
    if (sortKey === 'price-asc') {
      return list.sort((a, b) => (a.monthlyPriceUsd ?? 9999) - (b.monthlyPriceUsd ?? 9999));
    }
    if (sortKey === 'price-desc') {
      return list.sort((a, b) => (b.monthlyPriceUsd ?? -1) - (a.monthlyPriceUsd ?? -1));
    }
    if (sortKey === 'coding') {
      return list.sort((a, b) => {
        const scA = PlanExplorer.calculatePlanScores(a, FX_RATES_DATA).codingScore;
        const scB = PlanExplorer.calculatePlanScores(b, FX_RATES_DATA).codingScore;
        return scB - scA;
      });
    }
    if (sortKey === 'quota') {
      return list.sort((a, b) => {
        const scA = PlanExplorer.calculatePlanScores(a, FX_RATES_DATA).quotaScore;
        const scB = PlanExplorer.calculatePlanScores(b, FX_RATES_DATA).quotaScore;
        return scB - scA;
      });
    }
    if (sortKey === 'cost-benefit') {
      return list.sort((a, b) => {
        const scA = PlanExplorer.calculatePlanScores(a, FX_RATES_DATA).costBenefitScore;
        const scB = PlanExplorer.calculatePlanScores(b, FX_RATES_DATA).costBenefitScore;
        return scB - scA;
      });
    }
    if (sortKey === 'models') {
      return list.sort((a, b) => (b.modelAccess?.length || b.includedModels?.length || 0) - (a.modelAccess?.length || a.includedModels?.length || 0));
    }
    return list;
  }

  function renderActiveFilterChips() {
    const container = document.getElementById('activeFilterChips');
    if (!container) return;

    const chips = [];

    (AppState.planSelectedCompanies || []).forEach(cId => {
      const conf = PlanExplorer.PLAN_UI_CONFIG.companies[cId] || { name: cId };
      chips.push({
        label: `Empresa: ${conf.name}`,
        removeFn: `window.AIApp.toggleCompanyFilter('${cId}')`
      });
    });

    if (AppState.planMaxPrice !== undefined && AppState.planMaxPrice < 250) {
      chips.push({
        label: `Teto: US$ ${AppState.planMaxPrice}`,
        removeFn: `window.AIApp.resetPriceFilter()`
      });
    }

    if (AppState.planAudience && AppState.planAudience !== 'all') {
      chips.push({
        label: `Público: ${AppState.planAudience === 'individual' ? 'Individual' : AppState.planAudience === 'team' ? 'Equipes' : 'Enterprise'}`,
        removeFn: `window.AIApp.setPlanAudience('all')`
      });
    }

    if (AppState.planProfile && AppState.planProfile !== 'all') {
      chips.push({
        label: `Perfil: ${AppState.planProfile}`,
        removeFn: `window.AIApp.setPlanProfile('all')`
      });
    }

    if (AppState.filterPredictableOnly) {
      chips.push({
        label: 'Apenas Custo Previsível',
        removeFn: `window.AIApp.togglePredictableOnly()`
      });
    }

    if (AppState.filterByokOnly) {
      chips.push({
        label: 'Aceita BYOK',
        removeFn: `window.AIApp.toggleByokOnly()`
      });
    }

    if (AppState.filterApiIncluded) {
      chips.push({
        label: 'Acesso / Créditos API',
        removeFn: `window.AIApp.toggleApiIncludedOnly()`
      });
    }

    if (AppState.filterCloudStorageOnly) {
      chips.push({
        label: 'Cloud Storage (≥ 1 TB)',
        removeFn: `window.AIApp.toggleStorageOnly()`
      });
    }

    if (AppState.planPrivacyFilter && AppState.planPrivacyFilter !== 'all') {
      const privLabel = AppState.planPrivacyFilter === 'no-training' ? 'No-training default' :
                        AppState.planPrivacyFilter === 'zdr' ? 'ZDR sob contrato' :
                        AppState.planPrivacyFilter === 'retention-warning' ? 'Alerta de Treinamento' : 'Consumer / opt-out';
      chips.push({
        label: `Privacidade: ${privLabel}`,
        removeFn: `window.AIApp.setPrivacyFilter('all')`
      });
    }

    if (AppState.planSearchQuery && AppState.planSearchQuery.trim()) {
      chips.push({
        label: `Busca: "${AppState.planSearchQuery}"`,
        removeFn: `window.AIApp.clearPlanSearch()`
      });
    }

    container.innerHTML = chips.map(c => `
      <span class="filter-chip">
        ${c.label}
        <span class="filter-chip-remove" onclick="${c.removeFn}" title="Remover filtro">&times;</span>
      </span>
    `).join('');
  }

  // Agrupamento por Empresa (Acordeão Expansível — Seção 5)
  function renderCompanyAccordion(container, plans) {
    const byComp = PlanExplorer.getPlansByCompany(plans);
    const order = PlanExplorer.PLAN_UI_CONFIG.companiesOrder;

    let html = '';

    order.forEach(cId => {
      const compPlans = byComp[cId] || [];
      if (compPlans.length === 0) return;

      const conf = PlanExplorer.PLAN_UI_CONFIG.companies[cId] || { name: cId, icon: '🏢', description: '' };
      const isExpanded = AppState.expandedCompanies[cId] !== false; // Padrão aberto

      // Calcula faixa de preço da empresa
      const prices = compPlans.map(p => p.monthlyPriceUsd).filter(p => p !== null && p !== undefined);
      const minP = prices.length ? Math.min(...prices) : 0;
      const maxP = prices.length ? Math.max(...prices) : 0;
      const priceRangeStr = minP === 0 && maxP === 0 ? 'Planos Gratuitos' :
        minP === 0 ? `Grátis → US$ ${maxP}/mês` : `US$ ${minP} → US$ ${maxP}/mês`;

      html += `
        <div class="company-group ${isExpanded ? 'expanded' : ''}" id="companyGroup_${cId}">
          <div class="company-group-header" onclick="window.AIApp.toggleCompanyGroup('${cId}')">
            <div class="company-header-main">
              <span class="company-header-icon">${conf.icon}</span>
              <div>
                <div class="company-header-title">${conf.name}</div>
                <div class="company-header-meta">${conf.description || ''}</div>
              </div>
            </div>
            <div class="company-header-stats">
              <span class="badge-tag badge-subdollar">${compPlans.length} plano(s)</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${priceRangeStr}</span>
              <span class="company-toggle-arrow">▼</span>
            </div>
          </div>
          <div class="company-group-content">
            ${compPlans.map(p => renderPlanCard(p)).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function renderPriceGrouped(container, plans) {
    const tiers = [
      { name: 'Gratuitos (R$ 0 / US$ 0)', filter: p => p.monthlyPriceUsd === 0 },
      { name: 'Entrada (Até US$ 15 / ~R$ 77)', filter: p => p.monthlyPriceUsd > 0 && p.monthlyPriceUsd <= 15 },
      { name: 'Pro / Comercial (US$ 16 a US$ 30)', filter: p => p.monthlyPriceUsd > 15 && p.monthlyPriceUsd <= 30 },
      { name: 'Avançado / Heavy (US$ 31 a US$ 100)', filter: p => p.monthlyPriceUsd > 30 && p.monthlyPriceUsd <= 100 },
      { name: 'Ultra / Max Power (US$ 101+)', filter: p => p.monthlyPriceUsd > 100 },
      { name: 'Custom Enterprise / Fale com Vendas', filter: p => p.monthlyPriceUsd === null || p.monthlyPriceUsd === undefined }
    ];

    container.innerHTML = tiers.map(t => {
      const tPlans = plans.filter(t.filter);
      if (tPlans.length === 0) return '';

      return `
        <div class="content-box" style="margin-bottom: 20px;">
          <div class="box-header">
            <h4>${t.name} <span class="badge-tag badge-frontier">${tPlans.length}</span></h4>
          </div>
          <div class="plans-grid">
            ${tPlans.map(p => renderPlanCard(p)).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderTypeGrouped(container, plans) {
    const types = [
      { name: '👤 Planos Individuais & Desenvolvedores', filter: p => p.targetAudience === 'individual' && p.provider !== 'camelai' },
      { name: '👥 Equipes & Times (Team / Business)', filter: p => p.targetAudience === 'team' },
      { name: '🏢 Grandes Empresas (Enterprise)', filter: p => p.targetAudience === 'enterprise' },
      { name: '⚡ Inference APIs & Concorrência Paralela', filter: p => p.provider === 'camelai' }
    ];

    container.innerHTML = types.map(t => {
      const tPlans = plans.filter(t.filter);
      if (tPlans.length === 0) return '';

      return `
        <div class="content-box" style="margin-bottom: 20px;">
          <div class="box-header">
            <h4>${t.name} <span class="badge-tag badge-frontier">${tPlans.length}</span></h4>
          </div>
          <div class="plans-grid">
            ${tPlans.map(p => renderPlanCard(p)).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // Card do Plano (Seções 7, 44-49, 105)
  function renderPlanCard(plan) {
    const currency = AppState.planCurrency || 'BRL';
    const dispPrice = PlanExplorer.getDisplayPrice(plan, currency, FX_RATES_DATA);
    const varBilling = PlanExplorer.getPlanVariableBilling(plan);
    const isChecked = (AppState.selectedPlanCompare || []).includes(plan.id);
    const isFav = (AppState.planFavoritesList || []).includes(plan.id);

    // Destaque para Recursos Especiais (Seções 44 a 49)
    let specialBadge = '';
    if (plan.id === 'google-ai-pro') {
      specialBadge = `<div style="font-size: 0.72rem; color: #34d399; font-weight: 700; margin-top: 4px;">☁️ R$ 96,99 · 5 TB Storage no Brasil · 1.000 Flow credits · 4× vs Free</div>`;
    } else if (plan.id === 'google-ai-ultra-5x') {
      specialBadge = `<div style="font-size: 0.72rem; color: #38bdf8; font-weight: 700; margin-top: 4px;">⚡ 5× Mais Quota + 5 TB Storage + Gemini no Workspace</div>`;
    } else if (plan.id === 'opencode-go' || plan.id === 'opencode-go-standard') {
      specialBadge = `
        <div style="font-size: 0.72rem; color: #fbbf24; font-weight: 700; margin-top: 4px;">
          🔥 US$ 10/mês (até $60 nominal) · Burn rate 1×/2×/4×
        </div>
        <button type="button" class="btn-secondary btn-sm" style="font-size: 0.68rem; padding: 2px 6px; margin-top: 3px; cursor: pointer;" onclick="window.AIApp.openPlanDetails('${plan.id}')">
          📊 Ver tabela de consumo
        </button>
      `;
    } else if (plan.id === 'camelai-stream-flat') {
      specialBadge = `<div style="font-size: 0.72rem; color: #f87171; font-weight: 700; margin-top: 4px;">⚠ Standard camelStream: 1 stream concorrente · Unlimited tokens · Dados sujeitos a treino</div>`;
    } else if (plan.id === 'claude-pro' || plan.id === 'anthropic-claude-pro') {
      specialBadge = `<div style="font-size: 0.72rem; color: #a78bfa; font-weight: 700; margin-top: 4px;">💳 Fable 5.1 disponível via créditos extras pré-pagos</div>`;
    }

    // Badges de Modelos Inclusos
    const modelsBadges = (plan.modelAccess || []).slice(0, 4).map(m => {
      const accessBadge = PlanExplorer.PLAN_UI_CONFIG.accessBadges[m.billingMode] || { label: m.billingMode, class: 'badge-frontier' };
      return `
        <span class="badge-tag ${accessBadge.class}" style="font-size: 0.68rem;" title="${m.surface} • ${m.notes || ''}">
          ${m.modelId} (${accessBadge.label})
        </span>
      `;
    }).join('');

    const moreModelsCount = (plan.modelAccess || []).length - 4;

    // Resumo de Privacidade (Seção 84)
    let privacyTag = '';
    if (plan.privacy?.zeroDataRetentionContract) {
      privacyTag = `<span class="badge-tag badge-subdollar" style="font-size: 0.7rem;" title="Retenção Zero formal sob contrato">🛡️ ZDR Contratual</span>`;
    } else if (plan.privacy?.noTrainingByDefault) {
      privacyTag = `<span class="badge-tag badge-subdollar" style="font-size: 0.7rem;" title="Dados não usados para treinamento por padrão">🔒 No-training default</span>`;
    } else if (plan.privacyNotes?.toLowerCase().includes('treino') || plan.privacyNotes?.toLowerCase().includes('training') || plan.id === 'camelai-stream-flat') {
      privacyTag = `<span class="badge-tag badge-danger" style="font-size: 0.7rem;" title="Dados sujeitos a retenção ou uso em treinamento">⚠️ Training possible</span>`;
    } else {
      privacyTag = `<span class="badge-tag badge-warning" style="font-size: 0.7rem;" title="Política de consumidor com opção de opt-out">👤 Consumer / opt-out</span>`;
    }

    return `
      <div class="plan-card" data-plan-id="${plan.id}">
        <div>
          <div class="plan-card-header">
            <div>
              <div class="plan-provider-badge">${plan.provider} • ${plan.product}</div>
              <div class="plan-card-title">${plan.planName}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="badge-tag ${plan.targetAudience === 'team' ? 'badge-warning' : plan.targetAudience === 'enterprise' ? 'badge-danger' : 'badge-frontier'}">
                ${plan.targetAudience === 'team' ? '👥 Equipe' : plan.targetAudience === 'enterprise' ? '🏢 Enterprise' : '👤 Individual'}
              </span>
              <button type="button" class="badge-btn-favorite ${isFav ? 'active' : ''}" onclick="window.AIApp.togglePlanFavorite('${plan.id}')" title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                ${isFav ? '★' : '☆'}
              </button>
            </div>
          </div>

          <div class="plan-card-price-box">
            <div class="plan-price-main">${dispPrice.text}</div>
            <div class="plan-price-sub">${dispPrice.subtext}</div>
            ${dispPrice.minSeatsText ? `<div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">${dispPrice.minSeatsText}</div>` : ''}
            ${dispPrice.annualOption && AppState.planBillingCycle === 'annual' ? `<div style="font-size: 0.72rem; color: #34d399; margin-top: 2px;">🏷️ ${dispPrice.annualOption}</div>` : ''}
            ${specialBadge}
          </div>

          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">
            <strong title="Quota & Franquia: A capacidade real varia conforme tokens gerados, ferramentas e horários de pico.">Franquia:</strong> ${plan.quotaDescription}
          </div>

          <div style="margin-bottom: 10px;">
            <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Modelos & Acesso:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${modelsBadges}
              ${moreModelsCount > 0 ? `<span class="badge-tag badge-frontier" style="font-size: 0.68rem;">+${moreModelsCount} modelos</span>` : ''}
            </div>
          </div>

          <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 8px;">
            <span class="badge-tag ${varBilling.predictable ? 'badge-subdollar' : 'badge-warning'}" title="Tipo de Cobrança: ${varBilling.predictable ? 'Included / 100% Previsível' : 'Usage credits / Variável'}">
              ${varBilling.predictable ? '💵 Custo 100% Previsível' : '📈 Custo com Variáveis'}
            </span>
            ${privacyTag}
          </div>

          <div style="font-size: 0.78rem; color: var(--accent-cyan); line-height: 1.35; margin-bottom: 4px;">
            💡 <strong>Melhor para:</strong> ${plan.bestFor}
          </div>
        </div>

        <div class="plan-card-footer">
          <label style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; cursor: pointer;">
            <input type="checkbox" class="plan-compare-checkbox" data-plan-id="${plan.id}" ${isChecked ? 'checked' : ''} onchange="window.AIApp.togglePlanCompare('${plan.id}')">
            <span>+ Comparar</span>
          </label>
          <button class="btn-table-action" onclick="window.AIApp.openPlanDetails('${plan.id}')" title="Ver detalhes completos da assinatura">
            Detalhes ➔
          </button>
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------
  // SUB-VIEW 2: ABA MODELOS (Onde Usar Cada Modelo — Seções 18-22, 109-110)
  // ----------------------------------------------------
  function renderTabModels() {
    const container = document.getElementById('modelExplorerContainer');
    if (!container || typeof PlanExplorer === 'undefined') return;

    const models = typeof AI_MODELS_DATA !== 'undefined' ? (Array.isArray(AI_MODELS_DATA) ? AI_MODELS_DATA : Object.values(AI_MODELS_DATA)) : [];
    const activeModelId = AppState.planSelectedModel || (models[0]?.id || 'claude-fable-5-1');
    const selectedModel = models.find(m => m.id === activeModelId) || models[0];

    // Busca todos os planos que oferecem o modelo selecionado
    const plansForModel = PlanExplorer.getPlansForModel(activeModelId, SUBSCRIPTION_PLANS_DATA);

    // Identifica destaques
    const cheapest = plansForModel.find(p => p.plan.monthlyPriceUsd > 0);
    const bestIncluded = plansForModel.find(p => p.billingMode === 'included');

    let rowsHtml = '';
    if (plansForModel.length === 0) {
      rowsHtml = `<tr><td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">Nenhum plano catalogado com acesso direto a este modelo. Verifique se o acesso é exclusivo via API direta.</td></tr>`;
    } else {
      rowsHtml = plansForModel.map(item => {
        const p = item.plan;
        const dispPrice = PlanExplorer.getDisplayPrice(p, AppState.planCurrency || 'BRL', FX_RATES_DATA);
        const accessBadge = PlanExplorer.PLAN_UI_CONFIG.accessBadges[item.billingMode] || { label: item.billingMode, class: 'badge-frontier' };

        return `
          <tr>
            <td>
              <div style="font-weight: 700; color: var(--text-primary);">${p.provider.toUpperCase()} • ${p.product}</div>
              <div style="font-size: 0.74rem; color: var(--text-muted);">${p.targetAudience === 'team' ? 'Equipe' : 'Individual'}</div>
            </td>
            <td>
              <strong style="color: var(--accent-cyan); cursor: pointer;" onclick="window.AIApp.openPlanDetails('${p.id}')">${p.planName}</strong>
            </td>
            <td>
              <span class="badge-tag ${accessBadge.class}">${accessBadge.label}</span>
            </td>
            <td>
              <span class="badge-tag badge-frontier">${item.surface || 'Geral'}</span>
            </td>
            <td>
              <div>${dispPrice.text}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${dispPrice.subtext}</div>
            </td>
            <td>
              <button class="btn-table-action" onclick="window.AIApp.openPlanDetails('${p.id}')">Ver Plano</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    container.innerHTML = `
      <div class="model-explorer-header">
        <div style="flex: 1; min-width: 260px;">
          <label class="filter-label" for="modelSelectorDropdown">Selecione o Modelo Canônico para Descobrir Onde Usar:</label>
          <select id="modelSelectorDropdown" class="form-select" onchange="window.AIApp.selectModelInExplorer(this.value)">
            ${models.map(m => `
              <option value="${m.id}" ${m.id === activeModelId ? 'selected' : ''}>
                ${m.name} (${m.provider}) • ${m.tier || ''}
              </option>
            `).join('')}
          </select>
        </div>
        <div>
          <span class="badge-tag badge-frontier">${plansForModel.length} opção(ões) de assinatura encontradas</span>
        </div>
      </div>

      <!-- Destaques Rápidos -->
      <div class="model-highlights-grid">
        <div class="model-highlight-card">
          <div class="model-highlight-title">Modelo Selecionado</div>
          <div class="model-highlight-val">${selectedModel ? selectedModel.name : activeModelId}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">Contexto: ${selectedModel?.contextWindow || 'N/A'} • Provedor: ${selectedModel?.provider || 'N/A'}</div>
        </div>

        <div class="model-highlight-card">
          <div class="model-highlight-title">Acesso Mais Barato</div>
          <div class="model-highlight-val" style="color: #34d399;">
            ${cheapest ? `${cheapest.plan.planName} (${PlanExplorer.getDisplayPrice(cheapest.plan, AppState.planCurrency || 'BRL', FX_RATES_DATA).text})` : 'N/D'}
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${cheapest ? `Cobrança: ${cheapest.billingMode}` : 'Apenas Free ou Enterprise'}</div>
        </div>

        <div class="model-highlight-card">
          <div class="model-highlight-title">Melhor Acesso Totalmente Incluído</div>
          <div class="model-highlight-val" style="color: #38bdf8;">
            ${bestIncluded ? `${bestIncluded.plan.planName}` : 'Requer Créditos Extras'}
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${bestIncluded ? `Franquia ilimitada/nominal sem medidor` : 'Consumo sob demanda'}</div>
        </div>
      </div>

      <!-- Tabela Detalhada de Superfícies & Planos -->
      <div class="content-box">
        <div class="box-header">
          <h4>Plataformas & Assinaturas Onde Este Modelo Está Disponível</h4>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Plataforma / Provedor</th>
                <th>Plano de Assinatura</th>
                <th>Modalidade de Acesso</th>
                <th>Superfície</th>
                <th>Custo Estimado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------
  // SUB-VIEW 3: ABA ORÇAMENTO (Budget Planner & Stacks — Seções 23-31, 72-78)
  // ----------------------------------------------------
  function renderTabBudget() {
    const container = document.getElementById('budgetExplorerContainer');
    if (!container || typeof PlanExplorer === 'undefined') return;

    const budget = AppState.planBudgetValue !== undefined ? AppState.planBudgetValue : 200;
    const currency = AppState.planCurrency || 'BRL';
    const profile = AppState.planBudgetProfile || 'coding';

    const stacks = PlanExplorer.generateBudgetStacks(budget, currency, profile, SUBSCRIPTION_PLANS_DATA, FX_RATES_DATA);

    const presets = currency === 'BRL' ? [0, 50, 100, 150, 200, 350, 500, 1000] : [0, 10, 20, 30, 40, 70, 100, 200];

    container.innerHTML = `
      <div class="budget-slider-box">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
          <div>
            <h3 style="margin-bottom: 4px;">💰 Planejador Inteligente de Orçamento & Stacks</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Encontre a combinação ideal de ferramentas de IA respeitando seu teto financeiro e separando rigorosamente custo fixo de variáveis.
            </p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent-cyan);">
              ${currency === 'BRL' ? `R$ ${budget}` : `US$ ${budget}`} / mês
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Teto máximo configurado</div>
          </div>
        </div>

        <input type="range" id="budgetRangeSlider" min="0" max="${currency === 'BRL' ? 1000 : 200}" step="${currency === 'BRL' ? 25 : 5}" value="${budget}" style="width: 100%; margin: 20px 0 10px 0;" oninput="window.AIApp.setBudgetValue(this.value)">

        <div class="budget-presets-row">
          <span style="font-size: 0.8rem; color: var(--text-muted); align-self: center; margin-right: 4px;">Presets rápidos:</span>
          ${presets.map(p => `
            <button class="budget-pill ${budget === p ? 'active' : ''}" onclick="window.AIApp.setBudgetValue(${p})">
              ${currency === 'BRL' ? `R$ ${p}` : `US$ ${p}`}
            </button>
          `).join('')}
        </div>

        <div style="display: flex; gap: 16px; margin-top: 20px; flex-wrap: wrap; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label class="filter-label" style="margin: 0; font-size: 0.82rem;">Perfil de Uso:</label>
            <select class="form-select" style="padding: 4px 10px; font-size: 0.82rem;" onchange="window.AIApp.setBudgetProfile(this.value)">
              <option value="coding" ${profile === 'coding' ? 'selected' : ''}>💻 Coding & IDE (Dev)</option>
              <option value="general" ${profile === 'general' ? 'selected' : ''}>💬 Chat & Pesquisa Geral</option>
              <option value="agent" ${profile === 'agent' ? 'selected' : ''}>🤖 Heavy-Agentic & Autônomo</option>
              <option value="multimodal" ${profile === 'multimodal' ? 'selected' : ''}>🎨 Multimodal & Visão</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Resultados: Stacks Recomendados -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>🧩 Stacks de Ferramentas Recomendados Dentro do Orçamento</span>
          <span class="badge-tag badge-frontier">${stacks.length} encontrado(s)</span>
        </h4>

        ${stacks.length === 0 ? `
          <div style="padding: 32px; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle); color: var(--text-muted);">
            Nenhum stack compatível encontrado para o valor selecionado. Tente aumentar o orçamento acima de R$ 50 para liberar opções de assinatura paga.
          </div>
        ` : stacks.slice(0, 10).map((st, idx) => `
          <div class="budget-stack-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span class="badge-tag ${idx === 0 ? 'badge-subdollar' : 'badge-frontier'}">${idx === 0 ? '🏆 Top Recomendação' : `Opção ${idx + 1}`}</span>
                  <h4 style="color: var(--text-primary); margin: 0;">${st.name}</h4>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-muted);">${st.reason}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 1.3rem; font-weight: 800; color: var(--accent-cyan);">
                  ${currency === 'BRL' ? `R$ ${st.fixedMonthlyCost.toFixed(2).replace('.', ',')}` : `US$ ${st.fixedMonthlyCost.toFixed(2)}`} / mês
                </div>
                <div style="font-size: 0.72rem; color: #34d399;">Custo Fixo Mensal Previsível</div>
              </div>
            </div>

            <!-- Radar de Scores Dimensionais (Seção 38) -->
            <div class="stack-scores-radar-bar">
              <span class="score-mini-pill">🤖 Acesso a Modelos: <strong>${st.scores.aiAccessScore}/10</strong></span>
              <span class="score-mini-pill">💻 Coding & IDE: <strong>${st.scores.codingScore}/10</strong></span>
              <span class="score-mini-pill">⚡ Quota & Franquia: <strong>${st.scores.quotaScore}/10</strong></span>
              <span class="score-mini-pill">☁️ Storage: <strong>${st.scores.bundleStorageScore}/10</strong></span>
              <span class="score-mini-pill">🔒 Privacidade: <strong>${st.scores.privacyScore}/10</strong></span>
              <span class="score-mini-pill" style="color: #34d399;">⭐ Custo-Benefício: <strong>${st.costBenefitScore}/10</strong></span>
            </div>

            <!-- Detalhe dos Planos que compõem o Stack -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
              ${st.plans.map(p => `
                <span class="badge-tag badge-frontier" style="cursor: pointer;" onclick="window.AIApp.openPlanDetails('${p.id}')">
                  ${p.provider.toUpperCase()} • ${p.planName}
                </span>
              `).join('')}
            </div>

            <!-- Alerta de Custos Variáveis se existirem -->
            ${st.hasVariableCost ? `
              <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.78rem; color: #fbbf24; margin-top: 8px;">
                📈 <strong>Atenção a Custos Variáveis:</strong> ${st.variableNotes.join(' · ')}
              </div>
            ` : `
              <div style="font-size: 0.76rem; color: #34d399; margin-top: 4px;">
                ✓ 100% de custo fixo previsível sem surpresas na fatura do cartão
              </div>
            `}
          </div>
        `).join('')}
      </div>
    `;
  }

  // ----------------------------------------------------
  // SUB-VIEW 4: ABA COMPARAR (Comparador de 2 a 5 Planos — Seções 32-35)
  // ----------------------------------------------------
  function renderTabCompare() {
    const container = document.getElementById('compareExplorerContainer');
    if (!container || typeof PlanExplorer === 'undefined') return;

    const planIds = AppState.selectedPlanCompare || [];

    if (planIds.length < 2) {
      container.innerHTML = `
        <div style="padding: 48px 20px; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle); color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">⚔️</div>
          <h4 style="color: var(--text-primary); margin-bottom: 6px;">Nenhum plano selecionado para comparação</h4>
          <p style="font-size: 0.85rem; max-width: 450px; margin: 0 auto 16px auto;">
            Selecione de 2 a 5 planos na aba <strong>Planos</strong> marcando a opção <strong>"+ Comparar"</strong> nos cards para comparar lado a lado preços, franquias, políticas de treinamento e superfícies.
          </p>
          <button class="btn-primary btn-sm" onclick="window.AIApp.switchPlanTab('plans')">Ir para Catálogo de Planos</button>
        </div>
      `;
      return;
    }

    const plans = planIds.map(id => SUBSCRIPTION_PLANS_DATA.find(p => p.id === id)).filter(Boolean);

    // Identifica Principal Diferença (Seção 35)
    let smartDiffHtml = '';
    if (plans.length >= 2) {
      const diffText = PlanExplorer.getPlanSmartDifference(plans[0], plans[1]);
      smartDiffHtml = `
        <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid var(--accent-cyan); border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.4rem;">💡</span>
          <div>
            <strong style="color: var(--accent-cyan); font-size: 0.88rem;">Distinção Principal Entre os Planos:</strong>
            <div style="font-size: 0.82rem; color: var(--text-primary); margin-top: 2px;">${diffText}</div>
          </div>
        </div>
      `;
    }

    const rows = [
      {
        label: 'Preço Mensal (BRL / USD)',
        getValue: p => {
          const d = PlanExplorer.getDisplayPrice(p, 'DUAL', FX_RATES_DATA);
          return `<strong>${d.text}</strong><div style="font-size: 0.72rem; color: var(--text-muted);">${d.subtext}</div>`;
        }
      },
      {
        label: 'Opção Anual',
        getValue: p => p.annualPriceUsd ? `US$ ${p.annualPriceUsd}/ano (~$${(p.annualPriceUsd/12).toFixed(2)}/mês)` : 'Apenas cobrança mensal'
      },
      {
        label: 'Público & Mínimo de Assentos',
        getValue: p => `${p.targetAudience === 'team' ? '👥 Equipe' : p.targetAudience === 'enterprise' ? '🏢 Enterprise' : '👤 Individual'} ${p.minSeats ? `(mínimo ${p.minSeats} usuários)` : ''}`
      },
      {
        label: 'Modelos Principais Incluídos',
        getValue: p => {
          const list = (p.includedModels && p.includedModels.length > 0)
            ? p.includedModels
            : (p.modelAccess || []).map(m => m.modelName || m.modelId);
          return list.slice(0, 6).map(m => `<span class="badge-tag badge-frontier" style="font-size: 0.7rem; margin: 1px;">${m}</span>`).join('') + (list.length > 6 ? `<span class="badge-tag badge-frontier">+${list.length - 6}</span>` : '');
        }
      },
      {
        label: 'Franquia & Quotas',
        getValue: p => p.quotaDescription
      },
      {
        label: 'Superfícies de Acesso',
        getValue: p => (p.modelAccess || []).map(m => m.surface).filter((v, i, a) => a.indexOf(v) === i).join(', ') || 'Chat Web'
      },
      {
        label: 'Créditos Extras & Bundles',
        getValue: p => p.extraCreditsIncluded ? `US$ ${p.extraCreditsIncluded}/mês inclusos` : 'Nenhum crédito extra'
      },
      {
        label: 'Armazenamento em Nuvem',
        getValue: p => p.storage?.includedGb ? `${p.storage.includedGb >= 1000 ? `${p.storage.includedGb / 1000} TB` : `${p.storage.includedGb} GB`} (${p.storage.type})` : 'Não inclui cloud storage'
      },
      {
        label: 'Acesso à API & BYOK',
        getValue: p => {
          const feats = (p.features || []).join(' ').toLowerCase();
          const hasByok = feats.includes('byok');
          return `${p.apiIncluded ? '✅ API Incluída' : '❌ Sem endpoint direto de API'} · ${hasByok ? '🔑 Aceita BYOK' : '🔒 Sem BYOK'}`;
        }
      },
      {
        label: 'Previsibilidade de Custo',
        getValue: p => {
          const vb = PlanExplorer.getPlanVariableBilling(p);
          return vb.predictable ? '<span style="color: #34d399;">✓ 100% Previsível</span>' : `<span style="color: #f87171;">⚠ Variável (${vb.items.join('; ')})</span>`;
        }
      },
      {
        label: 'Privacidade & Retenção (ZDR)',
        getValue: p => {
          if (!p.privacy) return p.privacyNotes || 'N/D';
          return `${p.privacy.noTrainingByDefault ? '🔒 No-training por padrão' : '⚠ Pode reter para treino'} · ${p.privacy.zeroDataRetentionContract ? '🛡️ ZDR Formal' : 'Sem ZDR sob contrato'}`;
        }
      },
      {
        label: 'Melhor Para',
        getValue: p => `<span style="color: var(--accent-cyan); font-weight: 600;">${p.bestFor}</span>`
      }
    ];

    // Filtra se toggle de diferenças ativo
    const filteredRows = AppState.compareOnlyDifferences ? rows.filter(r => {
      const vals = plans.map(p => r.getValue(p));
      return vals.some(v => v !== vals[0]);
    }) : rows;

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <h3 style="margin: 0;">⚔️ Comparação Detalhada (${plans.length} planos)</h3>
          <button class="btn-secondary btn-sm" onclick="window.AIApp.clearPlanCompare()">Limpar Comparação</button>
        </div>
        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; cursor: pointer;">
          <input type="checkbox" id="toggleOnlyDifferences" ${AppState.compareOnlyDifferences ? 'checked' : ''} onchange="window.AIApp.toggleCompareDifferences(this.checked)">
          <span>Mostrar Apenas Diferenças</span>
        </label>
      </div>

      ${smartDiffHtml}

      <div class="content-box">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="min-width: 180px;">Atributo</th>
                ${plans.map(p => `
                  <th style="min-width: 220px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                      <div>
                        <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">${p.provider} • ${p.product}</div>
                        <div style="font-size: 1.05rem; color: var(--text-primary); font-weight: 700;">${p.planName}</div>
                      </div>
                      <button type="button" class="btn-table-action" onclick="window.AIApp.removePlanFromCompare('${p.id}')" title="Remover da comparação">&times;</button>
                    </div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${filteredRows.map(r => `
                <tr>
                  <td style="font-weight: 600; color: var(--text-secondary); background: var(--bg-surface);">${r.label}</td>
                  ${plans.map(p => `<td>${r.getValue(p)}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------
  // SUB-VIEW 5: ABA FAVORITOS (Shortlist Salva — Seções 36-37)
  // ----------------------------------------------------
  function renderTabFavorites() {
    const container = document.getElementById('favoritesExplorerContainer');
    if (!container) return;

    const favIds = AppState.planFavoritesList || [];
    const favPlans = favIds.map(id => SUBSCRIPTION_PLANS_DATA.find(p => p.id === id)).filter(Boolean);

    if (favPlans.length === 0) {
      container.innerHTML = `
        <div style="padding: 48px 20px; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle); color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">⭐</div>
          <h4 style="color: var(--text-primary); margin-bottom: 6px;">Sua lista de favoritos está vazia</h4>
          <p style="font-size: 0.85rem; max-width: 450px; margin: 0 auto 16px auto;">
            Clique no ícone de estrela <strong>☆</strong> no canto de qualquer card de plano para salvá-lo aqui e compará-los rapidamente.
          </p>
          <button class="btn-primary btn-sm" onclick="window.AIApp.switchPlanTab('plans')">Explorar Planos</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3 style="margin-bottom: 2px;">⭐ Meus Planos Favoritos (${favPlans.length})</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted);">Shortlist persistida localmente no seu navegador para tomada de decisão.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-primary btn-sm" onclick="window.AIApp.compareAllFavorites()">⚔️ Comparar Todos os Favoritos</button>
          <button class="btn-secondary btn-sm" onclick="window.AIApp.clearAllFavorites()">Limpar Favoritos</button>
        </div>
      </div>

      <div class="plans-grid">
        ${favPlans.map(p => renderPlanCard(p)).join('')}
      </div>
    `;
  }

  // ----------------------------------------------------
  // MODAL DE DETALHES COMPLETOS DO PLANO (Seção 8)
  // ----------------------------------------------------
  function openPlanDetailsModal(planId) {
    const plan = SUBSCRIPTION_PLANS_DATA.find(p => p.id === planId);
    if (!plan) return;

    const modal = document.getElementById('planDetailsModalOverlay');
    const headerEl = document.getElementById('planDetailsHeaderContent');
    const bodyEl = document.getElementById('planDetailsModalBody');
    const footerLeftEl = document.getElementById('planDetailsFooterActionsLeft');
    if (!modal || !headerEl || !bodyEl) return;

    const dispPrice = PlanExplorer.getDisplayPrice(plan, AppState.planCurrency || 'BRL', FX_RATES_DATA);
    const varBilling = PlanExplorer.getPlanVariableBilling(plan);
    const isFav = (AppState.planFavoritesList || []).includes(plan.id);
    const isCmp = (AppState.selectedPlanCompare || []).includes(plan.id);

    headerEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <span class="badge-tag badge-frontier">${plan.provider.toUpperCase()} • ${plan.product}</span>
        <span class="badge-tag ${plan.targetAudience === 'team' ? 'badge-warning' : 'badge-subdollar'}">${plan.targetAudience === 'team' ? '👥 Equipe' : '👤 Individual'}</span>
      </div>
      <h3 style="margin-top: 4px; font-size: 1.3rem;">${plan.planName}</h3>
      <div style="font-size: 0.95rem; color: var(--accent-cyan); font-weight: 700; margin-top: 2px;">
        ${dispPrice.text} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">(${dispPrice.subtext})</span>
      </div>
    `;

    // Tabela completa de modelAccess (Seção 11: Associação Canônica e Links de Dossiê)
    const modelsRows = (plan.modelAccess || []).map(m => {
      const badge = PlanExplorer.PLAN_UI_CONFIG.accessBadges[m.billingMode] || { label: m.billingMode, class: 'badge-frontier' };
      const modelExists = typeof AI_MODELS_DATA !== 'undefined' && Boolean(AI_MODELS_DATA[m.modelId]);
      const modelCell = modelExists
        ? `<a href="#model/${m.modelId}" onclick="window.AIApp.closePlanDetails();" style="color: var(--accent-cyan); text-decoration: underline; cursor: pointer; font-weight: 600;" title="Abrir dossiê completo de ${m.modelId}"><strong>${m.modelId}</strong> ↗</a>`
        : `<strong style="color: var(--text-primary);">${m.modelId}</strong>`;

      return `
        <tr>
          <td>${modelCell}</td>
          <td><span class="badge-tag badge-frontier">${m.surface || 'Padrão'}</span></td>
          <td><span class="badge-tag ${badge.class}">${badge.label}</span></td>
          <td>${m.quotaPool || 'Pool Principal'}</td>
          <td>${m.efforts || 'Todos os níveis'}</td>
          <td style="font-size: 0.76rem; color: var(--text-muted);">${m.notes || '—'}</td>
        </tr>
      `;
    }).join('');

    bodyEl.innerHTML = `
      <!-- Seção 1: Resumo & Posicionamento -->
      <div class="content-box" style="margin-bottom: 16px;">
        <h4 style="margin-bottom: 6px;">💡 Posicionamento & Melhor Caso de Uso</h4>
        <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 8px;">${plan.bestFor}</p>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          <strong>Tags de Perfil:</strong> ${(plan.profileTags || []).join(', ')}
        </div>
      </div>

      <!-- Seção 2: Modelos & Superfícies -->
      <div class="content-box" style="margin-bottom: 16px;">
        <h4 style="margin-bottom: 8px;">🧠 Modelos, Superfícies & Modos de Cobrança</h4>
        <div class="table-responsive">
          <table class="data-table" style="font-size: 0.8rem;">
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Superfície</th>
                <th>Cobrança</th>
                <th>Pool</th>
                <th>Reasoning / Thinking</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody>
              ${modelsRows}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Seção 3: Quota & Cobrança -->
      <div class="content-box" style="margin-bottom: 16px;">
        <h4 style="margin-bottom: 6px;">⚡ Franquia, Quotas & Política de Excedente</h4>
        <p style="font-size: 0.85rem; margin-bottom: 8px;">${plan.quotaDescription}</p>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          <strong>Previsibilidade:</strong> ${varBilling.predictable ? '✓ Custo 100% fixo' : `⚠ Custos variáveis possíveis: ${varBilling.items.join(', ')}`}
        </div>
        ${plan.overageAllowed ? `<div style="font-size: 0.8rem; color: #fbbf24; margin-top: 4px;">Permite faturamento de overage excedente no cartão.</div>` : ''}
        ${(plan.id.includes('opencode-go')) ? `
          <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; padding: 10px 14px; margin-top: 10px; border-radius: var(--radius-xs); font-size: 0.8rem;">
            <strong>🔥 Dinâmica de Queima de Franquia (Burn Rate — Seção 47):</strong>
            <div style="margin-top: 6px; display: flex; flex-direction: column; gap: 4px;">
              <div>🟢 <strong>Modelos tier US$ 60</strong> → <strong>1× burn</strong> (consumo normal na franquia)</div>
              <div>🟡 <strong>Modelos tier US$ 30</strong> → <strong>2× burn</strong> (consome 2× mais rápido)</div>
              <div>🔴 <strong>Modelos tier US$ 15</strong> → <strong>4× burn</strong> (consome 4× mais rápido)</div>
            </div>
            <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 4px;">
              Exemplo: modelos com raciocínio profundo consom 4× da cota nominal mensal de $60.
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Seção 4: Plataformas, Superfícies & Cloud Storage -->
      <div class="content-box" style="margin-bottom: 16px;">
        <h4 style="margin-bottom: 6px;">☁️ Plataformas, Superfícies & Recursos</h4>
        <div style="font-size: 0.84rem; margin-bottom: 6px;">
          <strong>Superfícies & Clientes:</strong> ${(plan.surfaces || []).map(s => `<span class="badge-tag badge-subdollar" style="font-size: 0.72rem; margin-right: 4px;">${s}</span>`).join('') || '<span class="badge-tag badge-frontier" style="font-size: 0.72rem;">Chat Web</span>'}
        </div>
        <div style="font-size: 0.84rem; margin-bottom: 6px;">
          <strong>Storage na Nuvem:</strong> ${plan.storage?.includedGb ? `${plan.storage.includedGb >= 1000 ? `${plan.storage.includedGb / 1000} TB` : `${plan.storage.includedGb} GB`} (${plan.storage.type})` : 'Nenhum armazenamento incluído'}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">
          <strong>Recursos & Ferramentas:</strong> ${(plan.features || []).join(' · ')}
        </div>
      </div>

      <!-- Seção 5: Privacidade & Governança (Seção 83) -->
      <div class="content-box" style="margin-bottom: 16px;">
        <h4 style="margin-bottom: 6px;">🔒 Privacidade, Treinamento & Retenção de Dados</h4>
        <div style="font-size: 0.82rem; margin-bottom: 4px;">
          <strong>Política de Treinamento:</strong> ${plan.privacy?.noTrainingByDefault ? '🔒 Nenhum dado é usado para treino por padrão' : '⚠ Requer opt-out explícito ou pode ser retido'}
        </div>
        <div style="font-size: 0.82rem; margin-bottom: 4px;">
          <strong>Zero Data Retention (ZDR):</strong> ${plan.privacy?.zeroDataRetentionContract ? '🛡️ Suporta ZDR formal contratual' : 'Retenção padrão da plataforma'}
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${plan.privacyNotes || ''}</div>
      </div>

      <!-- Seção 6: Limitações & Histórico (Seções 8, 85, 86) -->
      <div class="content-box" style="margin-bottom: 16px;">
        <h4 style="margin-bottom: 6px;">📜 Limitações Conhecidas & Histórico</h4>
        <div style="font-size: 0.82rem; margin-bottom: 4px;">
          <strong>Limitações:</strong> ${plan.limitations || (plan.usage?.notes ? plan.usage.notes : 'Sem restrições extraordinárias reportadas para a cota nominal.')}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
          <strong>Histórico Recente:</strong> ${plan.historyNotes || `Plano comercialmente ativo e mantido na linhagem oficial de ${plan.provider.toUpperCase()} (${plan.product}).`}
        </div>
      </div>

      <!-- Seção 7: Fontes Auditadas & Freshness (Seções 91, 102) -->
      <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); font-size: 0.76rem; color: var(--text-muted);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span><strong>Fontes Oficiais:</strong> ${Object.entries(plan.sources || {}).map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" style="color: var(--accent-cyan); margin-right: 8px;">[${k}]</a>`).join('')}</span>
          <span class="badge-tag badge-frontier">Verificado em: 03/09/2026</span>
        </div>
      </div>
    `;

    if (footerLeftEl) {
      footerLeftEl.innerHTML = `
        <button class="btn-secondary btn-sm" onclick="window.AIApp.togglePlanFavorite('${plan.id}'); window.AIApp.openPlanDetails('${plan.id}');">
          ${isFav ? '★ Remover dos Favoritos' : '☆ Adicionar aos Favoritos'}
        </button>
        <button class="btn-secondary btn-sm" onclick="window.AIApp.togglePlanCompare('${plan.id}'); window.AIApp.openPlanDetails('${plan.id}');">
          ${isCmp ? '✓ No Comparador' : '+ Adicionar ao Comparador'}
        </button>
        <a href="#plan/${plan.id}" class="btn-primary btn-sm" onclick="window.AIApp.closePlanDetails();" style="text-decoration: none;">
          📄 Abrir dossiê completo ↗
        </a>
      `;
    }

    modal.classList.add('active');
  }

  function closePlanDetailsModal() {
    const modal = document.getElementById('planDetailsModalOverlay');
    if (modal) modal.classList.remove('active');
  }

  // ----------------------------------------------------
  // ASSISTENTE / WIZARD INTERATIVO (Seções 87-89)
  // ----------------------------------------------------
  function openPlanWizardModal() {
    AppState.wizardStep = 1;
    AppState.wizardAnswers = {
      maxBudgetBrl: 250,
      audience: 'individual',
      primaryFocus: 'coding',
      priorityModel: 'any',
      requirePredictableCost: true
    };
    renderWizardStep();
    const modal = document.getElementById('planWizardModalOverlay');
    if (modal) modal.classList.add('active');
  }

  function closePlanWizardModal() {
    const modal = document.getElementById('planWizardModalOverlay');
    if (modal) modal.classList.remove('active');
  }

  function renderWizardStep() {
    const bodyEl = document.getElementById('planWizardModalBody');
    const footerEl = document.getElementById('planWizardModalFooter');
    if (!bodyEl || !footerEl) return;

    const step = AppState.wizardStep || 1;

    const prevBtn = document.getElementById('btnWizardPrevStep');
    const nextBtn = document.getElementById('btnWizardNextStep');
    if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-block' : 'none';

    if (step === 1) {
      bodyEl.innerHTML = `
        <div class="wizard-step-box">
          <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">Etapa 1 de 5</div>
          <h4 style="margin: 8px 0;">Qual é o seu teto máximo de orçamento mensal?</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary);">Isso filtra as ferramentas para evitar recomendações fora da sua realidade financeira.</p>

          <div class="wizard-options-grid">
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.maxBudgetBrl === 0 ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('maxBudgetBrl', 0)">
              <strong>R$ 0 (100% Gratuito)</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Tiers gratuitos e ferramentas open-source</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.maxBudgetBrl === 60 ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('maxBudgetBrl', 60)">
              <strong>Até ~R$ 60/mês</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Z.ai Coding, OpenCode Go ou Kimi</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.maxBudgetBrl === 120 ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('maxBudgetBrl', 120)">
              <strong>Até ~R$ 120/mês</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Google AI Pro (R$ 96,99), Cursor Pro ou Claude Pro</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.maxBudgetBrl === 250 ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('maxBudgetBrl', 250)">
              <strong>Até ~R$ 250/mês</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Stacks compostos (ex: Cursor + Google Pro)</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.maxBudgetBrl === 600 ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('maxBudgetBrl', 600)">
              <strong>R$ 500+ / mês</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Claude Max, Google Ultra 5x, Heavy-Agentic</div>
            </button>
          </div>
        </div>
      `;
      if (nextBtn) nextBtn.textContent = 'Avançar →';
    } else if (step === 2) {
      bodyEl.innerHTML = `
        <div class="wizard-step-box">
          <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">Etapa 2 de 5</div>
          <h4 style="margin: 8px 0;">A assinatura é para uso individual ou para equipe?</h4>
          <div class="wizard-options-grid">
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.audience === 'individual' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('audience', 'individual')">
              <strong>👤 Individual / Desenvolvedor</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Para 1 usuário sem necessidade de gestão de time</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.audience === 'team' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('audience', 'team')">
              <strong>👥 Equipe / Empresa (Teams)</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Múltiplos assentos, faturamento centralizado e SSO</div>
            </button>
          </div>
        </div>
      `;
      if (nextBtn) nextBtn.textContent = 'Avançar →';
    } else if (step === 3) {
      bodyEl.innerHTML = `
        <div class="wizard-step-box">
          <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">Etapa 3 de 5</div>
          <h4 style="margin: 8px 0;">Qual é o seu foco principal de utilização?</h4>
          <div class="wizard-options-grid">
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.primaryFocus === 'coding' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('primaryFocus', 'coding')">
              <strong>💻 Coding & Engenharia de Software</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Editor nativo, agentes de código, terminal</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.primaryFocus === 'general' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('primaryFocus', 'general')">
              <strong>💬 Chat, Redação & Pesquisa Geral</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Interface web, upload de documentos, redação</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.primaryFocus === 'agent' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('primaryFocus', 'agent')">
              <strong>🤖 Agentes Autônomos & Execução Paralela</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Loop infinito de tarefas, streams concorrentes</div>
            </button>
          </div>
        </div>
      `;
      if (nextBtn) nextBtn.textContent = 'Avançar →';
    } else if (step === 4) {
      bodyEl.innerHTML = `
        <div class="wizard-step-box">
          <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">Etapa 4 de 5</div>
          <h4 style="margin: 8px 0;">Você tem preferência por um modelo ou família específica?</h4>
          <div class="wizard-options-grid">
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.priorityModel === 'any' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('priorityModel', 'any')">
              <strong>Qualquer / Melhor Custo-Benefício</strong>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.priorityModel === 'claude' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('priorityModel', 'claude')">
              <strong>Claude (Anthropic)</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Sonnet 4.6, Opus 4.6 ou Fable 5.1</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.priorityModel === 'gemini' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('priorityModel', 'gemini')">
              <strong>Gemini (Google)</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Gemini 3.7 Flash / Pro e 5 TB de Drive</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.priorityModel === 'openai' ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('priorityModel', 'openai')">
              <strong>OpenAI</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">GPT-5.6, Codex e Canvas</div>
            </button>
          </div>
        </div>
      `;
      if (nextBtn) nextBtn.textContent = 'Avançar →';
    } else if (step === 5) {
      bodyEl.innerHTML = `
        <div class="wizard-step-box">
          <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">Etapa 5 de 5</div>
          <h4 style="margin: 8px 0;">Qual a sua tolerância a cobranças variáveis adicionais?</h4>
          <div class="wizard-options-grid">
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.requirePredictableCost === true ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('requirePredictableCost', true)">
              <strong>💵 Exijo Custo 100% Fixo</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Zero cobranças variáveis na fatura além da mensalidade</div>
            </button>
            <button type="button" class="wizard-option-btn ${AppState.wizardAnswers.requirePredictableCost === false ? 'active' : ''}" onclick="window.AIApp.setWizardAnswer('requirePredictableCost', false)">
              <strong>📈 Aceito Créditos e Variáveis</strong>
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Posso pagar extras por requisições ou modelos adicionais</div>
            </button>
          </div>
        </div>
      `;
      if (nextBtn) nextBtn.textContent = 'Ver Recomendações 🎯';
    } else if (step === 6) {
      // Resultados: Executa recomendações determinísticas (Seções 87-89)
      const recs = PlanExplorer.runPlanWizard(AppState.wizardAnswers, SUBSCRIPTION_PLANS_DATA);

      bodyEl.innerHTML = `
        <div class="wizard-step-box">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 1.5rem;">🎯</span>
            <div>
              <h4 style="margin: 0;">Top 3 Planos Recomendados para o Seu Perfil</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">Calculado a partir de scores determinísticos oficiais.</p>
            </div>
          </div>

          ${recs.map((rec, i) => {
            const p = rec.plan;
            const disp = PlanExplorer.getDisplayPrice(p, AppState.planCurrency || 'BRL', FX_RATES_DATA);

            return `
              <div class="wizard-rec-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                  <div>
                    <span class="badge-tag ${i === 0 ? 'badge-subdollar' : 'badge-frontier'}">${i === 0 ? '🥇 Melhor Escolha' : i === 1 ? '🥈 2ª Opção' : '🥉 3ª Opção'}</span>
                    <h4 style="margin: 4px 0; color: var(--text-primary);">${p.provider.toUpperCase()} • ${p.planName}</h4>
                  </div>
                  <div style="text-align: right;">
                    <strong style="color: var(--accent-cyan); font-size: 1.1rem;">${disp.text}</strong>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">${disp.subtext}</div>
                  </div>
                </div>

                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">
                  <strong>Por que recomendamos:</strong>
                  <ul style="margin: 4px 0 0 16px; padding: 0;">
                    ${rec.reasons.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px;">
                  <button class="btn-table-action" onclick="window.AIApp.closePlanWizard(); window.AIApp.openPlanDetails('${p.id}');">Ver Detalhes do Plano</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
      if (nextBtn) nextBtn.textContent = 'Concluir';
    }
  }

  // Helpers de UI e Ações da Interface
  function togglePlanFavorite(planId) {
    let list = AppState.planFavoritesList || [];
    if (list.includes(planId)) {
      list = list.filter(id => id !== planId);
      showToast('Plano removido dos favoritos.');
    } else {
      list.push(planId);
      showToast('Plano adicionado aos favoritos ⭐');
    }
    AppState.planFavoritesList = list;
    try { localStorage.setItem('model_intel_favorite_plans', JSON.stringify(list)); } catch(e) {}
    renderPlansView();
  }

  function togglePlanCompare(planId) {
    let list = AppState.selectedPlanCompare || [];
    if (list.includes(planId)) {
      list = list.filter(id => id !== planId);
    } else {
      if (list.length >= 5) {
        showToast('⚠️ Máximo de 5 planos simultâneos no comparador.');
        return;
      }
      list.push(planId);
    }
    AppState.selectedPlanCompare = list;
    updatePlanCompareTray();
    renderPlansView();
  }

  function updatePlanCompareTray() {
    const tray = document.getElementById('planCompareTray');
    const countLabel = document.getElementById('planCompareCount');
    if (!tray || !countLabel) return;

    const list = AppState.selectedPlanCompare || [];
    if (list.length > 0 && (AppState.planActiveTab || 'plans') !== 'compare') {
      tray.style.display = 'block';
      countLabel.textContent = `${list.length} plano(s) selecionado(s) para comparação (máx 5)`;
    } else {
      tray.style.display = 'none';
    }
  }

  function resetAllPlanFilters() {
    AppState.planSelectedCompanies = [];
    AppState.planMaxPrice = 250;
    AppState.planAudience = 'all';
    AppState.planProfile = 'all';
    AppState.planPrivacyFilter = 'all';
    AppState.filterPredictableOnly = false;
    AppState.filterByokOnly = false;
    AppState.filterApiIncluded = false;
    AppState.filterCloudStorageOnly = false;
    AppState.planSearchQuery = '';
    AppState.planSort = 'default';
    AppState.planGrouping = 'company';
    renderPlansView();
    showToast('Filtros restaurados para o padrão.');
  }

  // Compatibilidade com a função legada openPlanCompareModal
  function openPlanCompareModal() {
    AppState.planActiveTab = 'compare';
    renderPlansView();
  }

  function closePlanCompareModal() {
    const modal = document.getElementById('planCompareModalOverlay');
    if (modal) modal.classList.remove('active');
  }

  // ==========================================
  // 18. VIEW: HISTÓRICO, LINHAGENS & TIMELINE
  // ==========================================
  function renderHistoryView() {
    if (typeof MODEL_HISTORY_DATA === 'undefined') return;

    const currentTab = AppState.activeHistoryTab || 'lineages';

    document.querySelectorAll('.htab-panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.history-tabs-nav .btn-toggle').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-htab') === currentTab);
    });

    const activePanel = document.getElementById(`htab-${currentTab}`);
    if (activePanel) activePanel.style.display = 'block';

    if (currentTab === 'lineages') {
      const container = document.getElementById('lineagesListContainer');
      if (container) {
        container.innerHTML = MODEL_HISTORY_DATA.lineages.map(lin => {
          let flowContentHtml = '';

          if (lin.tracks && lin.tracks.length > 0) {
            flowContentHtml = `
              <div class="lineage-tracks-wrapper">
                ${lin.tracks.map(tr => `
                  <div class="lineage-track-lane">
                    <div class="lineage-track-header">
                      <div class="lineage-track-title">
                        <span>⚡</span> ${tr.trackName}
                      </div>
                      ${tr.trackDesc ? `<div class="lineage-track-desc">${tr.trackDesc}</div>` : ''}
                    </div>
                    <div class="lineage-flow" style="display: flex; align-items: center; gap: 12px; overflow-x: auto; padding: 6px 0; margin-top: 0; background: transparent;">
                      ${tr.nodes.map((n, idx) => {
                        const inCatalog = typeof AI_MODELS_DATA !== 'undefined' && AI_MODELS_DATA[n.modelId];
                        return `
                        <div class="lineage-node ${inCatalog ? '' : 'lineage-node-historical'}" 
                             ${inCatalog ? `onclick="location.hash='#model/${n.modelId}'"` : ''} 
                             style="min-width: 200px; flex-shrink: 0; ${inCatalog ? 'cursor: pointer;' : 'cursor: default; opacity: 0.88;'}">
                          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; gap: 6px;">
                            <strong style="color: var(--text-primary); font-size: 0.92rem;">${n.name}</strong>
                            <span class="badge-tag ${n.status === 'active' ? 'badge-frontier' : n.status === 'superseded' ? 'badge-warning' : n.status === 'stable' ? 'badge-frontier' : 'badge-subdollar'}">${n.status}</span>
                          </div>
                          <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 6px;">Lançamento: ${n.releaseDate}</div>
                          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.35;">${n.notes}</div>
                          ${!inCatalog ? `<div style="font-size: 0.70rem; color: var(--accent-cyan); margin-top: 6px;">📍 Predecessor Histórico</div>` : ''}
                        </div>
                        ${idx < tr.nodes.length - 1 ? `<span class="lineage-arrow" style="color: var(--accent-cyan); font-size: 1.3rem; font-weight: bold; flex-shrink: 0;">➔</span>` : ''}
                      `;
                      }).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            `;
          } else if (lin.nodes && lin.nodes.length > 0) {
            flowContentHtml = `
              <div class="lineage-flow" style="margin-top: 16px;">
                ${lin.nodes.map((n, idx) => `
                  <div class="lineage-node" onclick="location.hash='#model/${n.modelId}'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                      <strong style="color: var(--text-primary); font-size: 0.95rem;">${n.name}</strong>
                      <span class="badge-tag ${n.status === 'active' ? 'badge-frontier' : n.status === 'superseded' ? 'badge-warning' : 'badge-subdollar'}">${n.status}</span>
                    </div>
                    <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 6px;">Lançamento: ${n.releaseDate}</div>
                    <div style="font-size: 0.78rem; color: var(--text-secondary);">${n.notes}</div>
                  </div>
                  ${idx < lin.nodes.length - 1 ? `<span class="lineage-arrow">➔</span>` : ''}
                `).join('')}
              </div>
            `;
          }

          const connectionsHtml = (lin.connections || []).length > 0 ? `
            <div style="margin-top: 14px; font-size: 0.82rem; color: var(--text-muted); background: var(--bg-card); padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <strong style="color: var(--text-primary);">Evoluções registradas na linhagem:</strong>
              <ul style="margin-top: 6px; padding-left: 18px; color: var(--text-secondary); line-height: 1.5;">
                ${lin.connections.map(c => `<li><strong>${c.from} ➔ ${c.to}:</strong> ${c.improvements}</li>`).join('')}
              </ul>
            </div>
          ` : '';

          return `
            <div class="lineage-family-card" style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="color: var(--accent-cyan); margin-bottom: 4px;">${lin.familyName}</h3>
                  <p style="font-size: 0.85rem; color: var(--text-secondary);">${lin.description}</p>
                </div>
              </div>
              ${flowContentHtml}
              ${connectionsHtml}
            </div>
          `;
        }).join('');
      }
    } else if (currentTab === 'timeline') {
      const container = document.getElementById('timelineStreamContainer');
      if (container) {
        const filter = AppState.activeTimelineFilter || 'all';
        const events = MODEL_HISTORY_DATA.events.filter(ev => filter === 'all' || ev.type === filter);

        container.innerHTML = events.map(ev => `
          <div class="timeline-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge-tag badge-frontier" style="font-size: 0.75rem;">${ev.date}</span>
                <span class="badge-tag badge-subdollar" style="font-size: 0.72rem; text-transform: uppercase;">${ev.type}</span>
              </div>
              <strong style="color: var(--accent-cyan); cursor: pointer;" onclick="location.hash='#model/${ev.modelId}'">${ev.modelId}</strong>
            </div>
            <h4 style="color: var(--text-primary); margin-bottom: 6px; font-size: 1rem;">${ev.title}</h4>
            <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 8px;">${ev.description}</p>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Fonte auditada: <code>${ev.sourceId}</code></div>
          </div>
        `).join('');
      }
    } else if (currentTab === 'benchmarks') {
      const tbody = document.getElementById('benchmarkHistoryTableBody');
      if (tbody && typeof BENCHMARK_HISTORY_DATA !== 'undefined') {
        tbody.innerHTML = BENCHMARK_HISTORY_DATA.map(b => `
          <tr>
            <td><code>${b.date}</code></td>
            <td><strong style="color: var(--text-primary); cursor: pointer;" onclick="location.hash='#model/${b.modelId}'">${b.modelId}</strong></td>
            <td><strong>${b.benchmark} ${b.benchmarkVersion}</strong></td>
            <td><strong class="highlight-green">${b.score.toFixed(1)}%</strong></td>
            <td>${b.confidenceInterval ? `±${b.confidenceInterval}pp` : '—'}</td>
            <td>${b.costPerTaskUsd ? `$${b.costPerTaskUsd.toFixed(2)}` : '—'}</td>
            <td>${b.tokensPerTask ? b.tokensPerTask.toLocaleString() : '—'}</td>
            <td>${b.agentSteps || '—'}</td>
            <td><span class="badge-tag ${b.sourceType === 'official' ? 'badge-frontier' : 'badge-subdollar'}">${b.sourceType}</span></td>
            <td><span style="font-size: 0.78rem; color: var(--text-muted);">${b.sourceId}</span></td>
          </tr>
        `).join('');
      }
    }
  }

  // ==========================================
  // 19. VIEW: CASOS DE USO REAIS & PROJETOS
  // ==========================================
  function renderUseCasesView() {
    if (typeof USE_CASE_COMPARISON_DATA === 'undefined') return;

    const chipsContainer = document.getElementById('useCaseChipsScroll');
    if (chipsContainer) {
      chipsContainer.innerHTML = USE_CASE_COMPARISON_DATA.useCases.map(uc => `
        <button class="use-case-chip ${uc.id === AppState.activeUseCaseId ? 'active' : ''}" data-uc-id="${uc.id}" onclick="location.hash='#use-case/${uc.id}';">
          <span>${uc.icon}</span> ${uc.title}
        </button>
      `).join('');
    }

    const activeCase = USE_CASE_COMPARISON_DATA.useCases.find(uc => uc.id === AppState.activeUseCaseId) || USE_CASE_COMPARISON_DATA.useCases[0];
    const contentContainer = document.getElementById('useCaseActiveContent');

    if (contentContainer && activeCase) {
      const activeWeights = AppState.useCaseCustomWeights[activeCase.id] || null;
      const rankings = (typeof DomainRankings !== 'undefined' && DomainRankings.calculateUseCaseRanking)
        ? DomainRankings.calculateUseCaseRanking(activeCase.id, activeWeights)
        : activeCase.rankings;

      const sensitivity = (typeof DomainRankings !== 'undefined' && DomainRankings.getUseCaseSensitivity)
        ? DomainRankings.getUseCaseSensitivity(activeCase.id)
        : (activeCase.sensitivityAnalysis || null);

      const topModel = rankings[0] || activeCase.rankings[0];
      const secondModel = rankings[1] || activeCase.rankings[1];
      const economicModel = rankings.find(r => {
        const m = AI_MODELS_DATA[r.modelId];
        return m && m.pricing && m.pricing.standard && m.pricing.standard.input < 1.5;
      }) || rankings[rankings.length - 1];

      const localModel = rankings.find(r => {
        const m = AI_MODELS_DATA[r.modelId];
        return m && m.openWeights;
      }) || { modelId: 'glm-5-3-flash', modelName: 'GLM-5.3-Flash / gpt-oss-20b' };

      const auditFreshness = (typeof DomainFreshness !== 'undefined' && DomainFreshness.formatDynamicFreshness)
        ? DomainFreshness.formatDynamicFreshness(new Date(), 'benchmarks').label
        : 'Atualizado recentemente';

      contentContainer.innerHTML = `
        <!-- Cabeçalho do Dossiê do Caso de Uso (Seção 23) -->
        <div class="content-box" style="margin-bottom: 24px;">
          <div class="box-header" style="flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 1.6rem;">${activeCase.icon}</span>
                <h3 style="margin: 0; font-size: 1.3rem;">${activeCase.title}</h3>
                <span class="evidence-badge badge-c">[C] Calibrado</span>
                ${activeWeights ? '<span class="badge-tag badge-frontier">Pesos Personalizados</span>' : ''}
              </div>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 2px 0 0 0;">${activeCase.description}</p>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <button class="btn-primary btn-sm" onclick="window.AIApp.openComparatorWith('${topModel.modelId}')">⚔️ Comparar Top Modelos</button>
            </div>
          </div>

          <!-- Metrologia, Cobertura e Confiança -->
          <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin: 16px 0; padding: 10px 14px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.82rem;">
            <div>
              <strong>📊 Cobertura:</strong> ${Object.keys(AI_MODELS_DATA).length} modelos catalogados (${rankings.length} ranqueados neste perfil)
            </div>
            <span style="color: var(--border-medium);">•</span>
            <div>
              <strong>🛡️ Confiança:</strong> <span style="color: #10b981;">Alta (Harmonização Multivariada [M] + [C])</span>
            </div>
            <span style="color: var(--border-medium);">•</span>
            <div>
              <strong>Auditado em:</strong> ${auditFreshness}
            </div>
          </div>

          <!-- Critérios e Metodologia de Ponderação (Seções 31 e 32) -->
          <div style="margin-bottom: 14px;">
            <strong style="font-size: 0.84rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Critérios & Pesos Avaliados (Padrão vs Ativo):</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${activeCase.keyAttributes.map((attr, idx) => `
                <span class="badge-tag badge-frontier" style="font-size: 0.76rem;">
                  ${attr} (${idx === 0 ? '35%' : idx === 1 ? '25%' : idx === 2 ? '20%' : '20%'})
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Análise de Sensibilidade & Customização de Pesos (Seções 33 e 34) -->
          <div style="margin-bottom: 20px; padding: 12px 16px; background: rgba(56, 189, 248, 0.04); border-left: 3px solid var(--accent-cyan); border-radius: var(--radius-xs);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <div>
                <strong style="font-size: 0.84rem; color: var(--accent-cyan);">🔬 Análise de Sensibilidade & Ponto de Virada:</strong>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 4px 0 0 0; line-height: 1.4;">
                  ${sensitivity ? sensitivity.tippingPoint : 'Liderança consistente no perfil ponderado.'}
                </p>
              </div>
              <button type="button" class="btn-ghost btn-xs" onclick="const p = document.getElementById('useCaseWeightsBox'); if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';" style="font-size: 0.75rem;">
                ⚙️ ${activeWeights ? 'Editar Pesos Ativos' : 'Personalizar Critérios (Sliders)'}
              </button>
            </div>

            <!-- Painel de Sliders para Ponderação Multidimensional (Seção 34) -->
            <div id="useCaseWeightsBox" style="display: ${activeWeights ? 'block' : 'none'}; margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border-subtle);">
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px;">
                Ajuste os sliders para recalcular o <strong>fitScore</strong> e a ordem dos modelos em tempo real:
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
                ${['coding', 'agentic', 'reliability', 'cost', 'speed'].map(crit => {
                  const labelMap = { coding: '💻 Coding / SWE', agentic: '🤖 Autonomia Agêntica', reliability: '🛡️ Confiabilidade', cost: '💵 Custo Baixo', speed: '⚡ Velocidade (tok/s)' };
                  const curWeights = activeWeights || activeCase.weights || { coding: 0.35, agentic: 0.25, reliability: 0.20, cost: 0.10, speed: 0.10 };
                  const curVal = Math.round((curWeights[crit] !== undefined ? curWeights[crit] : 0.2) * 100);
                  return `
                    <div>
                      <div style="display: flex; justify-content: space-between; font-size: 0.76rem;">
                        <span>${labelMap[crit] || crit}</span>
                        <strong>${curVal}%</strong>
                      </div>
                      <input type="range" min="0" max="100" step="5" value="${curVal}" 
                             style="width: 100%; margin-top: 4px; accent-color: var(--accent-cyan);"
                             oninput="window.AIApp.updateCustomUseCaseWeight('${activeCase.id}', '${crit}', this.value)">
                    </div>
                  `;
                }).join('')}
              </div>
              <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
                <button type="button" class="btn-ghost btn-xs" onclick="window.AIApp.resetUseCaseWeights('${activeCase.id}')" style="font-size: 0.72rem; color: var(--text-muted);">
                  ↺ Restaurar Pesos Padrão
                </button>
              </div>
            </div>
          </div>

          <!-- 6 Categorias de Vencedor (Seção 23 do Plano 08) -->
          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 0.92rem; margin-bottom: 10px; color: var(--text-primary);">🏆 Perfis de Vencedores Recomendados:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
              <div style="padding: 10px; background: rgba(6, 182, 212, 0.06); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: var(--radius-xs);">
                <div style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700;">👑 MELHOR GERAL</div>
                <div style="font-weight: 700; font-size: 0.9rem; margin-top: 2px;"><a href="#model/${topModel.modelId}" style="color: var(--text-primary); text-decoration: none;">${topModel.modelName}</a></div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Fit Score: ${topModel.fitScore}/100</div>
              </div>

              <div style="padding: 10px; background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-xs);">
                <div style="font-size: 0.72rem; color: #10b981; font-weight: 700;">💎 MELHOR VALOR / ROI</div>
                <div style="font-weight: 700; font-size: 0.9rem; margin-top: 2px;"><a href="#model/${secondModel ? secondModel.modelId : topModel.modelId}" style="color: var(--text-primary); text-decoration: none;">${secondModel ? secondModel.modelName : topModel.modelName}</a></div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Equilíbrio custo-qualidade</div>
              </div>

              <div style="padding: 10px; background: rgba(245, 158, 11, 0.06); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-xs);">
                <div style="font-size: 0.72rem; color: #f59e0b; font-weight: 700;">🏷️ MAIS ECONÔMICO</div>
                <div style="font-weight: 700; font-size: 0.9rem; margin-top: 2px;"><a href="#model/${economicModel.modelId}" style="color: var(--text-primary); text-decoration: none;">${economicModel.modelName}</a></div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Sub-dólar por milhão</div>
              </div>

              <div style="padding: 10px; background: rgba(168, 85, 247, 0.06); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: var(--radius-xs);">
                <div style="font-size: 0.72rem; color: #a855f7; font-weight: 700;">🏠 MELHOR LOCAL (PRIVACY)</div>
                <div style="font-weight: 700; font-size: 0.9rem; margin-top: 2px;"><a href="#model/${localModel.modelId}" style="color: var(--text-primary); text-decoration: none;">${localModel.modelName}</a></div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Pesos Abertos & Offline</div>
              </div>
            </div>
          </div>

          <!-- Tabela de Rankings Detalhada -->
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 50px;">Rank</th>
                  <th>Modelo</th>
                  <th>Fit Score (${activeWeights ? 'Recalculado' : 'Calibrado'})</th>
                  <th>Papel Ideal no Projeto</th>
                  <th>Justificativa Técnica & Evidências</th>
                  <th style="width: 140px;">Ações</th>
                </tr>
              </thead>
              <tbody>
                ${activeCase.rankings.map(r => `
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
                    <td><strong style="color: var(--accent-cyan); font-size: 0.84rem;">${r.role}</strong></td>
                    <td style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4;">${r.rationale}</td>
                    <td>
                      <div style="display: flex; gap: 4px;">
                        <button class="btn-table-action" onclick="location.hash='#model/${r.modelId}'" title="Ver Dossiê">🔍 Dossiê</button>
                        <button class="btn-table-action" onclick="window.AIApp.openComparatorWith('${r.modelId}')" title="Comparar">⚔️</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    const recipesContainer = document.getElementById('recipesGridContainer');
    if (recipesContainer) {
      recipesContainer.innerHTML = USE_CASE_COMPARISON_DATA.orchestrationRecipes.map(rc => `
        <div class="orchestration-recipe-card">
          <h4 style="color: var(--accent-cyan); margin-bottom: 4px;">${rc.title}</h4>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">Foco: ${rc.target}</div>
          <div class="recipe-steps-list">
            ${rc.flow.map(s => `
              <div class="recipe-flow-step">
                <span class="recipe-step-num">${s.step}</span>
                <div>
                  <strong style="color: var(--text-primary); font-size: 0.82rem;">${s.role}:</strong>
                  <span style="color: var(--accent-cyan); font-size: 0.82rem;">${s.model}</span>
                  <div style="color: var(--text-secondary); font-size: 0.76rem; margin-top: 2px;">${s.action}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 12px; padding: 8px 12px; background: rgba(16, 185, 129, 0.08); border-radius: var(--radius-sm); font-size: 0.78rem; color: #34d399;">
            💡 <strong>Impacto Orçamentário:</strong> ${rc.estimatedCostVsSingleModel}
          </div>
        </div>
      `).join('');
    }
  }

    // ==========================================
  // 20. VIEW: COMUNIDADE & BEHAVIOR
  // ==========================================
  function renderCommunityView() {
    if (typeof COMMUNITY_REPORTS_DATA === 'undefined') return;

    const currentTab = AppState.activeCommunityTab || 'divergences';

    document.querySelectorAll('.ctab-panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.community-tabs-nav .btn-toggle').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-ctab') === currentTab);
    });

    const activePanel = document.getElementById(`ctab-${currentTab}`);
    if (activePanel) activePanel.style.display = 'block';

    if (currentTab === 'divergences') {
      const container = document.getElementById('divergencesGridContainer');
      if (container && typeof BENCHMARK_VS_COMMUNITY_DIVERGENCES !== 'undefined') {
        container.innerHTML = BENCHMARK_VS_COMMUNITY_DIVERGENCES.map(d => `
          <div class="divergence-card">
            <div class="divergence-card-header">
              <h4 style="color: var(--text-primary); margin: 0;">${d.modelName}</h4>
              <button class="btn-table-action" onclick="location.hash='#model/${d.modelId}'">🔍 Dossiê</button>
            </div>
            <div class="divergence-claim">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: #38bdf8; font-weight: bold; margin-bottom: 2px;">📈 O que o Benchmark Afirma:</div>
              <div style="color: var(--text-primary);">${d.benchmarkClaim}</div>
            </div>
            <div class="divergence-reality">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: #fbbf24; font-weight: bold; margin-bottom: 2px;">⚠️ O que a Comunidade Vivencia:</div>
              <div style="color: var(--text-primary);">${d.communityReality}</div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
              🎯 <strong>Veredito Técnico:</strong> ${d.verdict}
            </div>
          </div>
        `).join('');
      }
    } else if (currentTab === 'behavior') {
      const container = document.getElementById('behaviorModelsGrid');
      if (container && typeof ENGINEERING_BEHAVIOR_DATA !== 'undefined') {
        const models = ENGINEERING_BEHAVIOR_DATA.models;
        const dims = ENGINEERING_BEHAVIOR_DATA.dimensions;

        container.innerHTML = Object.keys(models).map(mId => {
          const m = models[mId];
          return `
            <div class="behavior-model-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: var(--accent-cyan); margin: 0; cursor: pointer;" onclick="location.hash='#model/${mId}'">${m.modelName}</h4>
                <span class="badge-tag badge-subdollar" style="font-size: 0.7rem;">E — Calibrado</span>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.35;">${m.profileSummary}</p>

              <div>
                ${dims.map(d => {
                  const val = m[d.key];
                  if (typeof val === 'undefined') return '';
                  const barColor = d.isInverted 
                    ? (val > 60 ? '#f87171' : val > 30 ? '#fbbf24' : '#34d399')
                    : (val >= 90 ? '#38bdf8' : val >= 75 ? '#34d399' : '#fbbf24');
                  return `
                    <div class="behavior-metric-row" title="${d.description}">
                      <div class="behavior-metric-label">${d.label}:</div>
                      <div class="behavior-bar-track">
                        <div class="behavior-bar-fill" style="width: ${val}%; background: ${barColor};"></div>
                      </div>
                      <div class="behavior-metric-val">${val}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('');
      }
    } else if (currentTab === 'reports') {
      const container = document.getElementById('communityReportsList');
      if (container) {
        const query = (AppState.communitySearchQuery || '').toLowerCase().trim();
        const reports = COMMUNITY_REPORTS_DATA.filter(r => {
          if (!query) return true;
          const text = `${r.summary} ${(r.models || []).join(' ')} ${r.platform} ${r.harness} ${r.taskCategory}`.toLowerCase();
          return text.includes(query);
        });

        container.innerHTML = reports.map(r => `
          <div class="community-report-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge-tag badge-frontier">${r.date}</span>
                <span class="badge-tag badge-subdollar">${r.platform}</span>
                <span class="badge-tag badge-warning">Harness: ${r.harness}</span>
              </div>
              <div>
                ${(r.models || []).map(m => `<strong style="color: var(--accent-cyan); margin-left: 6px; cursor: pointer;" onclick="location.hash='#model/${m}'">${m}</strong>`).join(', ')}
              </div>
            </div>
            <h4 style="color: var(--text-primary); margin-bottom: 8px; font-size: 0.95rem;">${r.summary}</h4>
            <div style="margin-bottom: 8px;">
              <div style="font-size: 0.76rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Observações Auditadas:</div>
              <ul style="padding-left: 18px; margin: 6px 0 0 0; font-size: 0.8rem; color: var(--text-secondary);">
                ${(r.observations || []).map(o => `<li>${o}</li>`).join('')}
              </ul>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">
              ⚠️ <strong>Ressalvas:</strong> ${r.caveats} · Confiança: <code>${r.confidence}</code>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // ==========================================
  // 21. VIEW: PLATAFORMAS & OPENCODE GO
  // ==========================================
  let _goSimInitialized = false;

  function renderPlatformsView() {
    if (typeof OPENCODE_GO_DATA === 'undefined') return;

    // --- 1. Simulador Interativo de Quota Go ---
    const modelSelect = document.getElementById('goSimModelSelect');
    const windowSelect = document.getElementById('goSimWindowSelect');
    const reqInput = document.getElementById('goSimRequestsInput');
    const fillBaselineBtn = document.getElementById('goSimFillBaselineBtn');
    const resultsCard = document.getElementById('goSimResultsCard');

    if (modelSelect && !_goSimInitialized) {
      modelSelect.innerHTML = OPENCODE_GO_DATA.models.map(m => {
        const icon = m.usageAllowanceUsd === 60 ? '🟢' : m.usageAllowanceUsd === 30 ? '🟡' : '🔴';
        const burnLabel = m.usageAllowanceUsd === 60 ? '1× burn' : m.usageAllowanceUsd === 30 ? '2× burn' : '4× burn';
        return `<option value="${m.id}">${icon} ${m.displayName} (US$ ${m.usageAllowanceUsd} • ${burnLabel})</option>`;
      }).join('');

      const updateSimulation = () => {
        const selModelId = modelSelect.value;
        const selWindow = windowSelect ? windowSelect.value : 'monthly';
        const requests = reqInput ? (parseInt(reqInput.value, 10) || 0) : 1000;
        const sim = OPENCODE_GO_DATA.calculateQuotaConsumption(selModelId, requests, selWindow);
        if (!sim || !resultsCard) return;

        const m = sim.model;
        const windowLabels = {
          monthly: 'Mensal (Limite Nominal: US$ 60)',
          weekly: 'Semanal (Limite Nominal: US$ 30)',
          fiveHours: '5 Horas (Limite Nominal: US$ 12)'
        };

        const progressColor = sim.pctConsumed > 100 ? '#f87171' : sim.pctConsumed > 75 ? '#fbbf24' : '#34d399';

        resultsCard.innerHTML = `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px;">
            <div class="spec-item-card" style="padding: 10px 14px;">
              <div class="spec-label">Classe de Uso & Valor</div>
              <div class="spec-value ${m.usageAllowanceUsd === 60 ? 'highlight-green' : m.usageAllowanceUsd === 30 ? 'highlight-amber' : 'highlight-rose'}">
                US$ ${m.usageAllowanceUsd} <small style="font-size: 0.75rem; color: var(--text-muted);">(${m.valueMultiplierVsSubscription}× vs US$ 10)</small>
              </div>
            </div>
            <div class="spec-item-card" style="padding: 10px 14px;">
              <div class="spec-label">Multiplicador Quota Burn</div>
              <div class="spec-value ${m.quotaBurnMultiplier === 1 ? 'highlight-green' : m.quotaBurnMultiplier === 2 ? 'highlight-amber' : 'highlight-rose'}">
                ${m.quotaBurnMultiplier}× <small style="font-size: 0.75rem; color: var(--text-muted);">${m.quotaBurnMultiplier === 1 ? 'consumo 1:1' : m.quotaBurnMultiplier + '× mais rápido'}</small>
              </div>
            </div>
            <div class="spec-item-card" style="padding: 10px 14px;">
              <div class="spec-label">Franquia Efetiva Go</div>
              <div class="spec-value highlight-cyan">${m.effectiveQuotaPct}% <small style="font-size: 0.75rem; color: var(--text-muted);">(US$ ${m.usageAllowanceUsd} máx)</small></div>
            </div>
            <div class="spec-item-card" style="padding: 10px 14px;">
              <div class="spec-label">Cota Nominal Consumida</div>
              <div class="spec-value" style="color: ${progressColor};">
                US$ ${sim.normalizedGoQuotaConsumedUsd.toFixed(2)} <small style="font-size: 0.75rem; color: var(--text-muted);">/ US$ ${sim.windowLimitUsd}</small>
              </div>
            </div>
          </div>

          <!-- Barra de Progresso de Consumo da Cota -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 4px; color: var(--text-secondary);">
              <span>Consumo da Franquia Nominal (${windowLabels[selWindow]}):</span>
              <strong style="color: ${progressColor};">${sim.pctConsumed}%</strong>
            </div>
            <div style="height: 10px; background: rgba(255,255,255,0.08); border-radius: 5px; overflow: hidden;">
              <div style="height: 10px; width: ${Math.min(100, sim.pctConsumed)}%; background: ${progressColor}; transition: width 0.3s ease;"></div>
            </div>
          </div>

          <!-- Warnings & Notas Específicas do Modelo -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${sim.exceedsQuota ? `
              <div style="padding: 10px 14px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: var(--radius-sm); font-size: 0.82rem; color: #fca5a5;">
                ⚠️ <strong>Cota nominal esgotada nesta janela!</strong> O tráfego excedente continuará operando via <strong>OpenCode Zen Balance</strong> (se você habilitar a opção <em>"Use balance"</em>) ou você poderá continuar utilizando os modelos gratuitos da plataforma.
              </div>
            ` : ''}

            ${m.quotaBurnMultiplier === 4 ? `
              <div style="padding: 10px 14px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-sm); font-size: 0.82rem; color: #fca5a5;">
                ⚠️ <strong>Aviso de Quota Burn (4×):</strong> Embora o plano anuncie até US$ 60 de uso nominal, o modelo <strong>${m.displayName}</strong> pertence à classe <strong>US$ 15</strong>. Cada US$ 1 de uso equivalente consome aproximadamente <strong>US$ 4</strong> da sua franquia nominal Go (queima 4× mais rápido que modelos Full Go de US$ 60).
              </div>
            ` : m.quotaBurnMultiplier === 2 ? `
              <div style="padding: 10px 14px; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-sm); font-size: 0.82rem; color: #fcd34d;">
                ⚠️ <strong>Aviso de Quota Burn (2×):</strong> O modelo <strong>${m.displayName}</strong> pertence à classe <strong>US$ 30</strong>. Ele consome cota aproximadamente <strong>2× mais rápido</strong> que modelos Full Go de US$ 60 (aproveitamento efetivo de até 50% do valor nominal).
              </div>
            ` : `
              <div style="padding: 10px 14px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-sm); font-size: 0.82rem; color: #6ee7b7;">
                🟢 <strong>Eficiência Máxima (1× Burn):</strong> O modelo <strong>${m.displayName}</strong> recebe o valor total de <strong>US$ 60</strong> (6× a assinatura de US$ 10) consumindo a franquia na proporção 1:1.
              </div>
            `}

            ${m.privacy && m.privacy.trainingUsed ? `
              <div style="padding: 10px 14px; background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: var(--radius-sm); font-size: 0.82rem; color: #fca5a5;">
                🚨 <strong>Aviso de Privacidade Crítico:</strong> Prompts e respostas deste modelo Contributor são utilizados para <strong>treinamento de modelos da Meta</strong> em troca do valor ultra-baixo. NÃO possui Zero Data Retention (ZDR).
              </div>
            ` : ''}

            ${m.id === 'opencode-go/deepseek-v4-flash' ? `
              <div style="padding: 10px 14px; background: rgba(245, 158, 11, 0.12); border: 1px solid #f59e0b; border-radius: var(--radius-sm); font-size: 0.82rem; color: #fcd34d;">
                ⚠️ <strong>Status de Governança ZDR:</strong> A tabela oficial indica 0 dias de retenção, mas a nota do termo de compromisso publicada estava documentada até <strong>31/08/2026</strong>. Revalidação contratual necessária.
              </div>
            ` : ''}

            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
              ℹ️ <em>Perfil de Tokens Médio Estimado por Request:</em> ${m.tokenProfile.input.toLocaleString()} in / ${m.tokenProfile.cache.toLocaleString()} cache / ${m.tokenProfile.output.toLocaleString()} out • Endpoint: <code>${m.endpoint}</code> (${m.sdkPackage})
            </div>
          </div>
        `;
      };

      modelSelect.addEventListener('change', updateSimulation);
      if (windowSelect) windowSelect.addEventListener('change', updateSimulation);
      if (reqInput) reqInput.addEventListener('input', updateSimulation);

      if (fillBaselineBtn) {
        fillBaselineBtn.addEventListener('click', () => {
          const selModelId = modelSelect.value;
          const selWindow = windowSelect ? windowSelect.value : 'monthly';
          const m = OPENCODE_GO_DATA.getModel(selModelId);
          if (m && reqInput) {
            reqInput.value = selWindow === 'fiveHours' ? m.req5h : selWindow === 'weekly' ? m.reqWeek : m.reqMonth;
            updateSimulation();
          }
        });
      }

      _goSimInitialized = true;
      updateSimulation();
    }

    // --- 2. Tabela Detalhada dos 26 Modelos Oficiais ---
    const tbodyGo = document.getElementById('opencodeDetailedTableBody');
    const filterClassSelect = document.getElementById('goTableFilterClass');

    const renderGoTable = () => {
      if (!tbodyGo) return;
      const classFilter = filterClassSelect ? filterClassSelect.value : 'all';
      const models = OPENCODE_GO_DATA.models.filter(m => {
        if (classFilter === 'all') return true;
        return m.usageAllowanceUsd === parseInt(classFilter, 10);
      });

      tbodyGo.innerHTML = models.map(item => {
        const badgeClass = item.usageAllowanceUsd === 60 ? 'badge-go-60' : item.usageAllowanceUsd === 30 ? 'badge-go-30' : 'badge-go-15';
        const burnPillClass = `burn-pill-${item.quotaBurnMultiplier}x`;
        
        let privacyBadge = '<span class="badge-tag badge-subdollar" title="Zero Data Retention ativo">✅ ZDR 0-day</span>';
        if (item.privacy.isContributor) {
          privacyBadge = '<span class="badge-tag badge-danger" title="Prompts usados para treino Meta">❌ Treino Meta</span>';
        } else if (item.privacy.zdrAgreementRequiresRenewal) {
          privacyBadge = '<span class="badge-tag badge-warning" title="Acordo publicado até 31/08/2026; revalidação necessária">⚠️ ZDR (Revalidação)</span>';
        } else if (item.privacy.retentionDays === 30) {
          privacyBadge = '<span class="badge-tag badge-warning" title="Retenção de 30 dias para prevenção de abuso">30d retenção (Abuso)</span>';
        }

        return `
          <tr>
            <td>
              <div style="font-weight: 700; color: var(--text-primary);">${item.displayName}</div>
              <div style="font-size: 0.72rem; color: var(--accent-cyan);"><code>${item.id}</code></div>
            </td>
            <td>
              <span class="badge-tag ${badgeClass}">US$ ${item.usageAllowanceUsd}</span>
            </td>
            <td><strong>${item.valueMultiplierVsSubscription}×</strong></td>
            <td><strong class="${burnPillClass}">${item.quotaBurnMultiplier}×</strong></td>
            <td><strong>${item.effectiveQuotaPct}%</strong></td>
            <td>${item.req5h.toLocaleString()}</td>
            <td>${item.reqWeek.toLocaleString()}</td>
            <td><strong class="highlight-green">${item.reqMonth.toLocaleString()}</strong></td>
            <td style="font-size: 0.78rem;">
              <code>${item.endpoint}</code><br>
              <span style="color: var(--text-muted);">${item.sdkPackage}</span>
            </td>
            <td>${privacyBadge}</td>
          </tr>
        `;
      }).join('');
    };

    if (filterClassSelect && !filterClassSelect.dataset.listenerBound) {
      filterClassSelect.addEventListener('change', renderGoTable);
      filterClassSelect.dataset.listenerBound = 'true';
    }
    renderGoTable();

    // --- 3. Matriz Geral de Disponibilidade dos 44 Modelos ---
    const tbodyMatrix = document.getElementById('platformMatrixTableBody');
    const searchInput = document.getElementById('platformMatrixSearch');

    const renderMatrixTable = () => {
      if (!tbodyMatrix || typeof PLATFORM_MODEL_CATALOG === 'undefined') return;
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const rows = PLATFORM_MODEL_CATALOG.availabilityMatrix.filter(r => {
        if (!query) return true;
        return r.name.toLowerCase().includes(query) || r.modelId.toLowerCase().includes(query);
      });

      tbodyMatrix.innerHTML = rows.map(r => `
        <tr>
          <td>
            <strong style="color: var(--text-primary); cursor: pointer;" onclick="location.hash='#model/${r.modelId}'">${r.name}</strong>
          </td>
          <td style="font-size: 0.8rem;">${r.directApi}</td>
          <td style="font-size: 0.8rem;">${r.cursor}</td>
          <td style="font-size: 0.8rem;">${r.opencode}</td>
          <td style="font-size: 0.8rem;">${r.antigravity}</td>
          <td style="font-size: 0.8rem;">${r.openrouter}</td>
          <td style="font-size: 0.8rem;">${r.local}</td>
        </tr>
      `).join('');
    };

    if (searchInput && !searchInput.dataset.listenerBound) {
      searchInput.addEventListener('input', renderMatrixTable);
      searchInput.dataset.listenerBound = 'true';
    }
    renderMatrixTable();

    // --- 4. Tabelas Comparativas da Plataforma camelAI ---
    const tbodyCodeVsStream = document.getElementById('camelaiCodeVsStreamTbody');
    const tbodyHostedVsSelf = document.getElementById('camelaiHostedVsSelfTbody');

    if (typeof CAMELAI_PLATFORM_DATA !== 'undefined' && CAMELAI_PLATFORM_DATA.comparisonTables) {
      if (tbodyCodeVsStream && CAMELAI_PLATFORM_DATA.comparisonTables.codeVsStream) {
        tbodyCodeVsStream.innerHTML = CAMELAI_PLATFORM_DATA.comparisonTables.codeVsStream.rows.map(row => `
          <tr>
            <td><strong>${row[0]}</strong></td>
            <td style="font-size: 0.82rem;">${row[1]}</td>
            <td style="font-size: 0.82rem;">${row[2]}</td>
          </tr>
        `).join('');
      }

      if (tbodyHostedVsSelf && CAMELAI_PLATFORM_DATA.comparisonTables.hostedVsSelfHosted) {
        tbodyHostedVsSelf.innerHTML = CAMELAI_PLATFORM_DATA.comparisonTables.hostedVsSelfHosted.rows.map(row => `
          <tr>
            <td><strong>${row[0]}</strong></td>
            <td style="font-size: 0.82rem;">${row[1]}</td>
            <td style="font-size: 0.82rem;">${row[2]}</td>
          </tr>
        `).join('');
      }
    }
  }

  // ==========================================
  // 17. QUICK INSPECTOR DRAWER
  // ==========================================
  let _lastActiveElementBeforeDrawer = null;

  function openQuickInspector(modelId) {
    const drawer = document.getElementById('quickInspectorDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const title = document.getElementById('drawerTitle');
    const content = document.getElementById('drawerContent');

    const model = AI_MODELS_DATA[modelId];
    if (!drawer || !model) return;

    _lastActiveElementBeforeDrawer = document.activeElement;
    AppState.activeModelId = modelId;
    try {
      sessionStorage.setItem('lastInspectedModelId', modelId);
    } catch (e) {}
    title.innerText = model.name;

    const freshness = (typeof DomainFreshness !== 'undefined') ? DomainFreshness.getFreshness(model.releaseDate || '2026-08-15') : null;
    const ledger = (typeof MULTI_BENCHMARK_LEDGER !== 'undefined') ? MULTI_BENCHMARK_LEDGER.find(l => l.modelId === model.id) : null;
    const topCb = (typeof CURSORBENCH_32_DATA !== 'undefined') ? CURSORBENCH_32_DATA.filter(r => r.modelId === model.id).sort((a, b) => b.score - a.score)[0] : null;

    // 2 a 4 Métricas Chave com proveniência [M] (Seção 8)
    const metrics = [];
    if (topCb) {
      metrics.push({ label: 'CursorBench', val: `${topCb.score.toFixed(1)}%` });
    }
    if (ledger && ledger.terminalBench21) {
      metrics.push({ label: 'Terminal 2.1', val: `${ledger.terminalBench21.toFixed(1)}%` });
    } else if (model.officialBenchmarks && model.officialBenchmarks.terminalBench21) {
      metrics.push({ label: 'Terminal 2.1', val: `${model.officialBenchmarks.terminalBench21.toFixed(1)}%` });
    }
    if (ledger && ledger.deepSwe11) {
      metrics.push({ label: 'DeepSWE 1.1', val: `${ledger.deepSwe11.toFixed(1)}%` });
    } else if (model.officialBenchmarks && model.officialBenchmarks.sweBenchVerified) {
      metrics.push({ label: 'SWE Verified', val: `${model.officialBenchmarks.sweBenchVerified.toFixed(1)}%` });
    }
    if (model.aaIndex) {
      metrics.push({ label: 'AA Intelligence', val: `${model.aaIndex}` });
    }

    const statusLabel = model.isDeprecated ? 'Descontinuado' : (model.status ? model.status.toUpperCase() : (model.openWeights ? 'OPEN WEIGHTS' : 'ATIVO'));

    content.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="model-color-dot" style="background-color: ${model.color || '#38bdf8'}; width: 14px; height: 14px;"></span>
          <strong>${model.providerName}</strong> • <span style="color: var(--text-muted);">${model.architectureType}</span>
        </div>
        <span class="badge-tag ${model.status === 'legacy' || model.status === 'superseded' ? 'badge-warning' : 'badge-frontier'}">${statusLabel}</span>
      </div>

      <div class="model-badges-list" style="margin-bottom: 14px;">
        ${(model.badges || []).map(b => `<span class="badge-tag badge-frontier">${b}</span>`).join('')}
      </div>

      <!-- Specs Principais -->
      <div class="specs-grid" style="grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
        <div class="spec-item-card"><div class="spec-label">Contexto</div><div class="spec-value">${(model.contextWindow / 1000).toFixed(0)}k</div></div>
        <div class="spec-item-card"><div class="spec-label">Output Máx</div><div class="spec-value">${(model.maxOutputTokens || 16384).toLocaleString()}</div></div>
        <div class="spec-item-card"><div class="spec-label">Input / M</div><div class="spec-value">${model.openWeights ? 'Grátis (Local)' : `$${model.pricing.standard.input.toFixed(2)}`}</div></div>
        <div class="spec-item-card"><div class="spec-label">Output / M</div><div class="spec-value">${model.openWeights ? 'Grátis (Local)' : `$${model.pricing.standard.output.toFixed(2)}`}</div></div>
      </div>

      <!-- 2-4 Métricas Chave com Proveniência [M] (Seção 8) -->
      ${metrics.length > 0 ? `
        <div style="margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <h4 style="font-size: 0.82rem; margin: 0; color: var(--text-secondary);">Métricas Principais Auditadas:</h4>
            <span class="evidence-badge badge-m" title="Medição Instrumentada">[M] Medido</span>
          </div>
          <div class="specs-grid" style="grid-template-columns: repeat(${Math.min(metrics.length, 3)}, 1fr); gap: 6px;">
            ${metrics.slice(0, 3).map(m => `
              <div class="spec-item-card" style="padding: 6px 8px; text-align: center;">
                <div class="spec-label" style="font-size: 0.68rem;">${m.label}</div>
                <div class="spec-value highlight-cyan" style="font-size: 1rem;">${m.val}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Melhores Usos & Sweet Spot -->
      <div style="background: var(--bg-surface-dim); border: 1px solid var(--border-accent); padding: 10px; border-radius: var(--radius-md); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 12px;">
        💡 <strong>Melhor Uso / Sweet Spot:</strong> ${model.sweetSpot || 'Engenharia de Software e Workflows Agênticos'}
      </div>

      <!-- Destaques -->
      <h4 style="font-size: 0.82rem; margin-bottom: 4px; color: var(--text-secondary);">Pontos Fortes:</h4>
      <ul style="padding-left: 18px; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px;">
        ${(model.strengths || []).slice(0, 3).map(s => `<li>${s}</li>`).join('')}
      </ul>

      <!-- Limitações (Seção 8) -->
      ${model.weaknesses && model.weaknesses.length > 0 ? `
        <h4 style="font-size: 0.82rem; margin-bottom: 4px; color: #f59e0b;">Limitações Conhecidas:</h4>
        <ul style="padding-left: 18px; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 14px;">
          ${model.weaknesses.slice(0, 2).map(w => `<li>${w}</li>`).join('')}
        </ul>
      ` : ''}

      <!-- Atualização e Freshness (Seção 8) -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: var(--bg-surface); border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--text-muted); border: 1px solid var(--border-subtle);">
        <span>Lançamento: <strong>${model.releaseDate || '2026-08'}</strong></span>
        ${freshness ? `<span class="freshness-pill freshness-${freshness.category}">${freshness.label} (${freshness.daysAgo}d)</span>` : ''}
      </div>
    `;

    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');

    // Foco acessível no botão fechar do drawer
    const closeBtn = document.getElementById('drawerCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeQuickInspector() {
    const drawer = document.getElementById('quickInspectorDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      if (_lastActiveElementBeforeDrawer && typeof _lastActiveElementBeforeDrawer.focus === 'function') {
        _lastActiveElementBeforeDrawer.focus();
      }
    }
  }

  // ==========================================
  // 18. COMMAND PALETTE (CTRL + K)
  // ==========================================
  let _lastActiveElementBeforePalette = null;

  function openCommandPalette() {
    const overlay = document.getElementById('commandModalOverlay');
    const input = document.getElementById('commandSearchInput');
    if (!overlay || !input) return;
    _lastActiveElementBeforePalette = document.activeElement;
    overlay.classList.add('open');
    input.value = '';
    input.focus();
    renderCommandResults('');
  }

  function closeCommandPalette() {
    const overlay = document.getElementById('commandModalOverlay');
    if (overlay && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      if (_lastActiveElementBeforePalette && typeof _lastActiveElementBeforePalette.focus === 'function') {
        _lastActiveElementBeforePalette.focus();
      }
    }
  }

  function initCommandPalette() {
    const overlay = document.getElementById('commandModalOverlay');
    const input = document.getElementById('commandSearchInput');
    const triggerBtn = document.getElementById('commandTriggerBtn');
    const chips = overlay ? overlay.querySelectorAll('.cmd-chip') : [];

    if (triggerBtn) triggerBtn.addEventListener('click', openCommandPalette);

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (overlay && overlay.classList.contains('open')) closeCommandPalette();
        else openCommandPalette();
      }
      if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
        closeCommandPalette();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePalette();
      });
    }

    if (input) {
      input.addEventListener('input', (e) => {
        AppState.commandSelectedIndex = 0;
        renderCommandResults(e.target.value.toLowerCase().trim());
      });

      // Navegação por Teclado na Command Palette
      input.addEventListener('keydown', (e) => {
        const items = document.querySelectorAll('.command-result-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          AppState.commandSelectedIndex = (AppState.commandSelectedIndex + 1) % items.length;
          updateSelectedCommandItem();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          AppState.commandSelectedIndex = (AppState.commandSelectedIndex - 1 + items.length) % items.length;
          updateSelectedCommandItem();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          window.AIApp.selectCommandItem(AppState.commandSelectedIndex);
        }
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        AppState.commandPaletteFilter = chip.getAttribute('data-filter');
        AppState.commandSelectedIndex = 0;
        renderCommandResults(input ? input.value.toLowerCase().trim() : '');
      });
    });
  }

  function updateSelectedCommandItem() {
    const items = document.querySelectorAll('.command-result-item');
    const input = document.getElementById('commandSearchInput');
    items.forEach((it, idx) => {
      if (idx === AppState.commandSelectedIndex) {
        it.classList.add('selected');
        it.setAttribute('aria-selected', 'true');
        it.scrollIntoView({ block: 'nearest' });
        if (input) {
          input.setAttribute('aria-activedescendant', it.id || `cmd-item-${idx}`);
        }
      } else {
        it.classList.remove('selected');
        it.setAttribute('aria-selected', 'false');
      }
    });
  }

  function renderCommandResults(query) {
    const list = document.getElementById('commandResultsList');
    if (!list) return;

    const models = Object.values(AI_MODELS_DATA);
    let items = [];

    if (AppState.commandPaletteFilter === 'all' || AppState.commandPaletteFilter === 'models') {
      models.forEach(m => {
        const provider = AI_PROVIDERS_DATA[m.provider] || {};
        const searchCorpus = `${m.id} ${m.name} ${m.providerName} ${m.family} ${m.architectureType || ''} ${m.sweetSpot || ''} ${(m.badges || []).join(' ')} ${m.antigravity ? m.antigravity.poolLabel + ' ' + m.antigravity.role : ''} ${m.openWeights ? 'local open weights gratuito open-source' : 'api cloud pay-as-you-go'}`.toLowerCase();
        if (!query || searchCorpus.includes(query)) {
          const iconSpan = provider.iconSvg 
            ? `<span class="model-brand-icon" style="color: ${m.color || provider.brandColor || '#38bdf8'};">${provider.iconSvg}</span>`
            : '<span class="model-color-dot" style="background-color: #38bdf8;"></span>';
          items.push({
            group: 'Modelos',
            icon: iconSpan,
            title: m.name,
            subtitle: `${m.providerName} • ${(m.contextWindow / 1000).toFixed(0)}k ctx • ${m.openWeights ? 'Local (Grátis)' : `$${m.pricing && m.pricing.standard ? `${m.pricing.standard.input.toFixed(2)}/$${m.pricing.standard.output.toFixed(2)}` : 'N/D'}`} • ${(m.badges || []).slice(0, 2).join(' | ')}`,
            action: () => { location.hash = `#model/${m.id}`; }
          });
        }
      });
    }

    // Planos de Assinatura (Seção 44)
    if ((AppState.commandPaletteFilter === 'all' || AppState.commandPaletteFilter === 'plans') && typeof SUBSCRIPTION_PLANS_DATA !== 'undefined') {
      SUBSCRIPTION_PLANS_DATA.forEach(p => {
        const pSearch = `${p.id} ${p.planName} ${p.product} ${p.provider} plano assinatura subscription ${p.bestFor || ''} ${(p.profileTags || []).join(' ')}`.toLowerCase();
        if (!query || pSearch.includes(query)) {
          items.push({
            group: 'Planos',
            icon: '<span class="model-brand-icon" style="color: #f59e0b;">💳</span>',
            title: p.planName,
            subtitle: `${p.provider.toUpperCase()} • ${p.product} • ${p.targetAudience === 'team' ? 'Equipe' : 'Individual'} • ${p.bestFor || ''}`.substring(0, 85),
            action: () => {
              location.hash = `#plan/${p.id}`;
            }
          });
        }
      });
    }

    // Casos de Uso (Seção 44)
    if ((AppState.commandPaletteFilter === 'all' || AppState.commandPaletteFilter === 'use-cases') && typeof USE_CASES_DATA !== 'undefined') {
      USE_CASES_DATA.forEach(u => {
        const uSearch = `${u.id} ${u.title} ${u.subtitle || ''} ${u.description || ''} caso de uso use case stack`.toLowerCase();
        if (!query || uSearch.includes(query)) {
          items.push({
            group: 'Casos de Uso',
            icon: '<span class="model-brand-icon" style="color: #ec4899;">🎯</span>',
            title: u.title,
            subtitle: `Caso de Uso • ${u.subtitle || u.description || ''}`.substring(0, 85),
            action: () => {
              location.hash = `#use-case/${u.id}`;
            }
          });
        }
      });
    }

    if (AppState.commandPaletteFilter === 'all' || AppState.commandPaletteFilter === 'providers') {
      Object.values(AI_PROVIDERS_DATA).forEach(p => {
        const pSearch = `${p.id} ${p.name} ${p.country} ${p.description || ''}`.toLowerCase();
        if (!query || pSearch.includes(query)) {
          const iconSpan = p.iconSvg 
            ? `<span class="model-brand-icon" style="color: ${p.brandColor || '#38bdf8'};">${p.iconSvg}</span>`
            : '<span class="model-color-dot" style="background-color: #38bdf8;"></span>';
          items.push({
            group: 'Provedores',
            icon: iconSpan,
            title: p.name,
            subtitle: `${p.country} • ${p.description.substring(0, 70)}...`,
            action: () => { 
              AppState.dashboardSearchQuery = p.id;
              location.hash = '#models';
              renderModelsCatalog();
            }
          });
        }
      });
    }

    if (AppState.commandPaletteFilter === 'all' || AppState.commandPaletteFilter === 'hardware') {
      Object.values(HARDWARE_GPU_DATABASE).forEach(g => {
        const gSearch = `${g.id} ${g.name} ${g.vramGb}gb ${g.tdpWatts}w placa de video gpu hardware`.toLowerCase();
        if (!query || gSearch.includes(query)) {
          items.push({
            group: 'Hardware',
            icon: '<span class="model-brand-icon" style="color: #76b900;"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v12H4z"/></svg></span>',
            title: g.name,
            subtitle: `${g.vramGb} GB VRAM • TDP ${g.tdpWatts}W`,
            action: () => { location.hash = '#calculator'; }
          });
        }
      });
    }

    // Ferramentas & Plataformas (Seção 44)
    if (AppState.commandPaletteFilter === 'all' || AppState.commandPaletteFilter === 'tools') {
      const tools = [
        { name: 'Hardware & Calculadora VRAM', desc: 'Dimensionamento de GPU, parâmetros e quantização local', hash: '#calculator', icon: '🧮' },
        { name: 'Simulador de Custos de API', desc: 'Simulação de custos mensais por volume de tokens', hash: '#simulator', icon: '💵' },
        { name: 'Calculadora de ROI', desc: 'Cálculo de payback e economia em horas de engenharia', hash: '#roi', icon: '📈' },
        { name: 'Antigravity Pools & Cotas', desc: 'Análise de cotas proporcionais e preservação de pools', hash: '#antigravity-pools', icon: '🚀' },
        { name: 'Harnesses & Comandos CLI', desc: 'Comandos prontos para vLLM, Ollama, SGLang e Aider', hash: '#harnesses', icon: '💻' },
        { name: 'Diagnóstico & Troubleshooting', desc: 'Resolução guiada de problemas de contexto e latência', hash: '#troubleshoot', icon: '🩺' },
        { name: 'Catálogo de Fontes Auditadas', desc: 'Registro metrológico e links das fontes auditadas', hash: '#sources', icon: '📚' }
      ];

      tools.forEach(tl => {
        const tlSearch = `${tl.name} ${tl.desc} ferramenta tool calculadora`.toLowerCase();
        if (!query || tlSearch.includes(query)) {
          items.push({
            group: 'Ferramentas',
            icon: `<span class="model-brand-icon" style="color: var(--accent-cyan);">${tl.icon}</span>`,
            title: tl.name,
            subtitle: `Ferramenta • ${tl.desc}`,
            action: () => { location.hash = tl.hash; }
          });
        }
      });

      const platforms = [
        { id: 'cursor', name: 'Cursor IDE', desc: 'Editor AI nativo com motor de diff Composer', hash: '#platforms' },
        { id: 'opencode', name: 'OpenCode / Go', desc: 'Terminal agêntico e plano com multi-modelos', hash: '#platforms' },
        { id: 'antigravity', name: 'Google Antigravity', desc: 'Ambiente agêntico e orquestrador de pools', hash: '#antigravity-pools' },
        { id: 'aider', name: 'Aider CLI', desc: 'Pair programming no terminal com git integration', hash: '#harnesses' },
        { id: 'openrouter', name: 'OpenRouter', desc: 'Roteamento e agregação de APIs globais', hash: '#platforms' }
      ];

      platforms.forEach(pl => {
        const plSearch = `${pl.id} ${pl.name} ${pl.desc} plataforma ide editor ambiente`.toLowerCase();
        if (!query || plSearch.includes(query)) {
          items.push({
            group: 'Plataformas',
            icon: '<span class="model-brand-icon" style="color: #3b82f6;">🌐</span>',
            title: pl.name,
            subtitle: `Plataforma • ${pl.desc}`,
            action: () => { location.hash = pl.hash; }
          });
        }
      });
    }

    // Ações do Sistema (Exportar, Baixar, Temas)
    if (AppState.commandPaletteFilter === 'all') {
      const actions = [
        {
          id: 'act-export',
          icon: '<span class="model-brand-icon" style="color: var(--accent-cyan);">📋</span>',
          title: 'Copiar Relatório Markdown',
          subtitle: 'Abrir modal de exportação ou copiar relatório técnico consolidado',
          corpus: 'exportar copiar relatorio markdown md documentacao relatorio',
          action: () => { openExportModal(); }
        },
        {
          id: 'act-download',
          icon: '<span class="model-brand-icon" style="color: var(--accent-emerald);">⬇️</span>',
          title: 'Baixar Relatório Markdown (.md)',
          subtitle: 'Fazer download direto do arquivo de inteligência de modelos',
          corpus: 'baixar download relatorio markdown md arquivo relatorio',
          action: () => {
            const md = generateMarkdownExport();
            const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio-inteligencia-modelos-2026.md';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('⬇️ Relatório .md baixado com sucesso!');
          }
        },
        {
          id: 'act-toggle-theme',
          icon: '<span class="model-brand-icon" style="color: var(--accent-amber);">🌓</span>',
          title: 'Alternar Tema Claro / Escuro',
          subtitle: 'Mudar rapidamente entre modo claro e modo escuro',
          corpus: 'alternar tema claro escuro light dark modo',
          action: () => { toggleTheme(); }
        },
        {
          id: 'act-system-theme',
          icon: '<span class="model-brand-icon" style="color: var(--accent-purple);">🖥️</span>',
          title: 'Usar Tema do Sistema Operacional',
          subtitle: 'Sincronizar a interface com o tema do sistema operacional',
          corpus: 'tema sistema os automatico sync auto',
          action: () => { applyTheme('system', true); showToast('🖥️ Tema do sistema configurado!'); }
        }
      ];

      actions.forEach(act => {
        if (!query || act.corpus.includes(query) || act.title.toLowerCase().includes(query)) {
          items.push({
            icon: act.icon,
            title: act.title,
            subtitle: act.subtitle,
            action: act.action
          });
        }
      });
    }

    if (items.length === 0) {
      list.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">Nenhum resultado encontrado para "<strong>${escapeHtml(query)}</strong>".</div>`;
      window._commandResultsCache = [];
      return;
    }

    list.innerHTML = `
      <div style="padding: 6px 16px; font-size: 0.75rem; color: var(--text-muted); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between;">
        <span>${items.length} ${items.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}</span>
        <span>Use ↑ ↓ para navegar • Enter para selecionar</span>
      </div>
      ${items.map((item, idx) => `
        <div id="cmd-item-${idx}" role="option" aria-selected="${idx === AppState.commandSelectedIndex ? 'true' : 'false'}" class="command-result-item ${idx === AppState.commandSelectedIndex ? 'selected' : ''}" onclick="window.AIApp.selectCommandItem(${idx})">
          <div style="display: flex; align-items: center; gap: 10px;">
            ${item.icon || ''}
            <div>
              <div class="item-title">
                ${item.title}
                ${item.group ? `<span class="badge-tag badge-subdollar" style="font-size: 0.65rem; margin-left: 6px; padding: 1px 5px;">${item.group}</span>` : ''}
              </div>
              <div class="item-subtitle">${item.subtitle}</div>
            </div>
          </div>
          <kbd class="key-shortcut">Enter</kbd>
        </div>
      `).join('')}
    `;

    const input = document.getElementById('commandSearchInput');
    if (input && items.length > 0) {
      input.setAttribute('aria-activedescendant', `cmd-item-${AppState.commandSelectedIndex}`);
    }

    window._commandResultsCache = items;
  }

  // ==========================================
  // 19. EXPORTAÇÃO & TOASTS
  // ==========================================
  let _lastActiveElementBeforeExportModal = null;

  function generateMarkdownExport() {
    const models = Object.values(AI_MODELS_DATA);
    let md = `# Relatório de Inteligência de Modelos de IA (Agosto / 2026)\n\n`;
    md += `*Gerado pelo Portal de Inteligência de Modelos em ${new Date().toLocaleDateString('pt-BR')}*\n\n`;
    md += `## Resumo Consolidado de Modelos\n\n`;
    md += `| Modelo | Provedor | Contexto | CursorBench 3.2 | Terminal-Bench 2.1 | Preço In/Out |\n`;
    md += `| :--- | :--- | :---: | :---: | :---: | :---: |\n`;

    models.forEach(m => {
      const topRun = CURSORBENCH_32_DATA.filter(r => r.modelId === m.id).sort((a, b) => b.score - a.score)[0];
      const ledger = MULTI_BENCHMARK_LEDGER.find(l => l.modelId === m.id);
      const scoreC = topRun ? `${topRun.score.toFixed(1)}%` : 'N/D';
      const scoreT = ledger && ledger.terminalBench21 ? `${ledger.terminalBench21.toFixed(1)}%` : 'N/D';
      const price = m.openWeights ? 'Local' : `$${m.pricing.standard.input}/$${m.pricing.standard.output}`;
      md += `| ${m.name} | ${m.providerName} | ${(m.contextWindow / 1000).toFixed(0)}k | ${scoreC} | ${scoreT} | ${price} |\n`;
    });

    return md;
  }

  function openExportModal() {
    const overlay = document.getElementById('exportModalOverlay');
    const textarea = document.getElementById('exportMarkdownTextarea');
    const copyBtn = document.getElementById('btnCopyExportMarkdown');
    if (!overlay || !textarea) return;

    _lastActiveElementBeforeExportModal = document.activeElement;
    textarea.value = generateMarkdownExport();
    overlay.classList.add('open');

    setTimeout(() => {
      if (copyBtn) copyBtn.focus();
    }, 50);
  }

  function closeExportModal() {
    const overlay = document.getElementById('exportModalOverlay');
    if (overlay && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      if (_lastActiveElementBeforeExportModal && typeof _lastActiveElementBeforeExportModal.focus === 'function') {
        _lastActiveElementBeforeExportModal.focus();
      }
    }
  }

  function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Falha ao copiar texto: ', err);
      }
      textArea.remove();
    }
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.2s ease-out';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }

  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================

  // ==========================================
  // 19. MÓDULO FONTES & METROLOGIA (SEÇÃO 21 - PLANO 08)
  // ==========================================
  function renderSourcesView() {
    const totalBadge = document.getElementById('sourceRegistryTotal');
    const tbody = document.getElementById('sourcesTableBody');
    const filterType = document.getElementById('sourceFilterType')?.value || 'all';
    const query = (document.getElementById('sourceSearchInput')?.value || '').toLowerCase();

    const registry = typeof SOURCE_REGISTRY !== 'undefined' ? SOURCE_REGISTRY : {};
    let sourcesList = Object.values(registry);

    if (totalBadge) totalBadge.innerText = sourcesList.length;

    if (filterType !== 'all') {
      sourcesList = sourcesList.filter(s => s.sourceType === filterType || (filterType === 'academic' && s.sourceType === 'paper'));
    }

    if (query) {
      sourcesList = sourcesList.filter(s => {
        return (s.id + ' ' + s.title + ' ' + s.publisher + ' ' + (s.description || '')).toLowerCase().includes(query);
      });
    }

    if (!tbody) return;

    if (sourcesList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);">Nenhuma fonte encontrada para o filtro selecionado.</td></tr>`;
      return;
    }

    tbody.innerHTML = sourcesList.map(s => {
      const badge = (typeof DomainEvidence !== 'undefined' && DomainEvidence.getProvenanceBadge)
        ? DomainEvidence.getProvenanceBadge(s.sourceType)
        : { code: 'M', cssClass: 'badge-m', label: s.sourceType };

      return `
        <tr>
          <td><code>${s.id}</code></td>
          <td>
            <strong>${s.title}</strong>
            ${s.url ? `<br><a href="${s.url}" target="_blank" rel="noopener" style="font-size: 0.78rem; color: var(--accent-cyan);">Acessar Documento Oficial ↗</a>` : ''}
          </td>
          <td><strong>${s.publisher}</strong></td>
          <td><span class="evidence-badge ${badge.cssClass}">[${badge.code}] ${s.sourceType}</span></td>
          <td style="font-size: 0.8rem; color: var(--text-muted);">${s.publishedAt || '2026-09-01'}</td>
          <td style="font-size: 0.8rem; color: var(--text-muted);">${s.retrievedAt || '2026-09-03'}</td>
        </tr>
      `;
    }).join('');
  }

    // 20. EXPOSIÇÃO GLOBAL (WINDOW.AIAPP)
  // ==========================================
  window.AIApp = {
    getPreferredTheme,
    applyTheme,
    toggleTheme,
    openQuickInspector,
    closeQuickInspector,
    closeDrawer: closeQuickInspector,
    getState: () => AppState,
    toggleModelInComparison(modelId) {
      const idx = AppState.comparatorModels.indexOf(modelId);
      if (idx > -1) {
        AppState.comparatorModels = AppState.comparatorModels.filter(id => id !== modelId);
        showToast('Modelo removido da comparação.');
      } else {
        const valid = AppState.comparatorModels.filter(Boolean);
        if (valid.length >= 4) {
          showToast('⚠️ Limite de 4 modelos na comparação simultânea.');
          return;
        }
        AppState.comparatorModels.push(modelId);
        showToast('Modelo adicionado à comparação!');
      }
      updateComparisonFloatingBar();
    },
    renderModelsCatalog,
    renderSourcesView,
    renderDashboardHome,
        selectBudgetStackForPlan(planId) {
      location.hash = '#plans';
      setTimeout(() => {
        const box = document.querySelector('#plansCardsGrid');
        if (box) box.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    openPlanCompareModal,
    closePlanCompareModal,
    openComparatorWith(modelId) {
      AppState.comparatorModels[0] = modelId;
      location.hash = '#comparator';
    },
    filterByProvider(providerId) {
      AppState.dashboardFilter = 'all';
      AppState.dashboardSearchQuery = providerId;
      const searchInput = document.getElementById('dashboardSearchInput');
      if (searchInput) searchInput.value = providerId;
      location.hash = '#dashboard';
      const catalog = document.getElementById('dashboard-catalog');
      if (catalog) {
        setTimeout(() => catalog.scrollIntoView({ behavior: 'smooth' }), 100);
      }
      renderDashboardTable();
    },
    toggleRadarModel(modelId) {
      const idx = AppState.selectedRadarModels.indexOf(modelId);
      if (idx > -1) {
        if (AppState.selectedRadarModels.length > 1) {
          AppState.selectedRadarModels.splice(idx, 1);
        }
      } else {
        if (AppState.selectedRadarModels.length < 4) {
          AppState.selectedRadarModels.push(modelId);
        } else {
          showToast('⚠️ Limite de 4 modelos simultâneos no Radar.');
          return;
        }
      }
      renderRadarView();
    },
    copySnippet(elemId) {
      const el = document.getElementById(elemId);
      if (el) {
        copyTextToClipboard(el.innerText);
        showToast('📋 Configuração copiada com sucesso!');
      }
    },
    copyTextToClipboard(text) {
      copyTextToClipboard(text);
    },
    openExportModal,
    closeExportModal,
    generateMarkdownExport,
    selectCommandItem(idx) {
      const overlay = document.getElementById('commandModalOverlay');
      if (window._commandResultsCache && window._commandResultsCache[idx]) {
        if (overlay) overlay.classList.remove('open');
        window._commandResultsCache[idx].action();
      }
    },
    // Métodos do Explorador de Planos (06)
    openPlanDetails: openPlanDetailsModal,
    closePlanDetails: closePlanDetailsModal,
    openPlanWizard: openPlanWizardModal,
    closePlanWizard: closePlanWizardModal,
    setWizardAnswer(key, val) {
      AppState.wizardAnswers[key] = val;
      renderWizardStep();
    },
    togglePlanFavorite,
    togglePlanCompare,
    toggleCompanyGroup(companyId) {
      AppState.expandedCompanies[companyId] = !AppState.expandedCompanies[companyId];
      renderPlansView();
    },
    toggleCompanyFilter(companyId) {
      const idx = (AppState.planSelectedCompanies || []).indexOf(companyId);
      if (idx > -1) {
        AppState.planSelectedCompanies.splice(idx, 1);
      } else {
        AppState.planSelectedCompanies.push(companyId);
      }
      renderPlansView();
    },
    switchPlanTab(tabId) {
      AppState.planActiveTab = tabId;
      renderPlansView();
    },
    selectModelInExplorer(modelId) {
      AppState.planSelectedModel = modelId;
      renderTabModels();
    },
    setBudgetValue(val) {
      AppState.planBudgetValue = parseFloat(val) || 0;
      renderTabBudget();
    },
    setBudgetProfile(val) {
      AppState.planBudgetProfile = val;
      renderTabBudget();
    },
    toggleCompareDifferences(val) {
      AppState.compareOnlyDifferences = !!val;
      renderTabCompare();
    },
    removePlanFromCompare(planId) {
      AppState.selectedPlanCompare = (AppState.selectedPlanCompare || []).filter(id => id !== planId);
      updatePlanCompareTray();
      renderTabCompare();
    },
    clearPlanCompare() {
      AppState.selectedPlanCompare = [];
      updatePlanCompareTray();
      renderTabCompare();
    },
    compareAllFavorites() {
      AppState.selectedPlanCompare = [...(AppState.planFavoritesList || [])];
      AppState.planActiveTab = 'compare';
      renderPlansView();
    },
    clearAllFavorites() {
      AppState.planFavoritesList = [];
      try { localStorage.removeItem('model_intel_favorite_plans'); } catch(e) {}
      renderPlansView();
    },
    resetAllPlanFilters,
    resetPriceFilter() {
      AppState.planMaxPrice = 250;
      renderPlansView();
    },
    setPlanAudience(val) {
      AppState.planAudience = val;
      renderPlansView();
    },
    setPlanProfile(val) {
      AppState.planProfile = val;
      renderPlansView();
    },
    togglePredictableOnly() {
      AppState.filterPredictableOnly = !AppState.filterPredictableOnly;
      renderPlansView();
    },
    toggleByokOnly() {
      AppState.filterByokOnly = !AppState.filterByokOnly;
      renderPlansView();
    },
    toggleApiIncludedOnly() {
      AppState.filterApiIncluded = !AppState.filterApiIncluded;
      renderPlansView();
    },
    toggleStorageOnly() {
      AppState.filterCloudStorageOnly = !AppState.filterCloudStorageOnly;
      renderPlansView();
    },
    setPrivacyFilter(val) {
      AppState.planPrivacyFilter = val;
      renderPlansView();
    },
    clearPlanSearch() {
      AppState.planSearchQuery = '';
      renderPlansView();
    },
    toggleOnlyDiffs(val) {
      AppState.comparatorOnlyDiffs = !!val;
      renderComparatorTable();
    },
    setComparatorReferenceModel(id) {
      AppState.comparatorRefModelId = id;
      renderComparatorActiveMode();
    },
    updateCustomUseCaseWeight(useCaseId, criterion, val) {
      if (!AppState.useCaseCustomWeights[useCaseId]) {
        const uc = (typeof USE_CASE_COMPARISON_DATA !== 'undefined' ? USE_CASE_COMPARISON_DATA.useCases.find(u => u.id === useCaseId) : null);
        AppState.useCaseCustomWeights[useCaseId] = Object.assign({}, uc ? uc.weights : { coding: 0.35, agentic: 0.25, reliability: 0.20, cost: 0.10, speed: 0.10 });
      }
      AppState.useCaseCustomWeights[useCaseId][criterion] = Number(val) / 100;
      renderUseCasesView();
    },
    resetUseCaseWeights(useCaseId) {
      delete AppState.useCaseCustomWeights[useCaseId];
      renderUseCasesView();
    }
  };

  if (typeof window !== 'undefined') {
    window.copyTextToClipboard = copyTextToClipboard;
    window.showToast = showToast;
  }

})();
