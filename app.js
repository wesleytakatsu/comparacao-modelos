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

    // Aliases para máxima compatibilidade de links e especificações
    if (route === 'aa-intelligence') route = 'artificial-analysis';
    if (route === 'troubleshooter') route = 'troubleshoot';
    if (route === 'antigravity') route = 'antigravity-pools';
    if (route === 'plans' || route === 'subscriptions') route = 'plans';
    if (route === 'history' || route === 'lineages' || route === 'timeline') route = 'history';
    if (route === 'use-cases' || route === 'projects' || route === 'stacks') route = 'use-cases';
    if (route === 'community' || route === 'behavior') route = 'community';
    if (route === 'platforms' || route === 'opencode' || route === 'availability') route = 'platforms';

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
                      (route === 'model' && linkRoute === 'dashboard') ||
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

    // Rota Especial: Dossiê do Modelo
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
        renderDashboardTable();
        updateEstimatorResults();
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

      renderDashboardTable();
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

    // Busca no Dashboard
    const searchInput = document.getElementById('dashboardSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        AppState.dashboardSearchQuery = e.target.value.toLowerCase().trim();
        renderDashboardTable();
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
    if (typeof AI_MODELS_DATA === 'undefined') return;
    const totalModels = Object.keys(AI_MODELS_DATA).length;
    const totalRuns = typeof CURSORBENCH_32_DATA !== 'undefined' ? CURSORBENCH_32_DATA.length : 58;

    const hdrModel = document.getElementById('hdrModelCount');
    if (hdrModel) hdrModel.innerText = totalModels;

    const hdrRun = document.getElementById('hdrRunCount');
    if (hdrRun) hdrRun.innerText = totalRuns;

    const catTotal = document.getElementById('catTotalCount');
    if (catTotal) catTotal.innerText = totalModels;

    const chipAll = document.getElementById('chipAllCount');
    if (chipAll) chipAll.innerText = totalModels;
  }

  function renderDynamicDashboardKpis() {
    const kpiGrid = document.querySelector('.kpi-grid');
    if (!kpiGrid || typeof CURSORBENCH_32_DATA === 'undefined') return;

    // 1. Líder CursorBench (Top 1)
    const sortedCursor = [...CURSORBENCH_32_DATA].sort((a, b) => b.score - a.score);
    const topCursor = sortedCursor[0] || { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1', effort: 'Max', score: 73.4, costUsd: 9.64, tokensPerTask: 72060, pool: 'other-models' };

    // 2. Sweet Spot Geral
    const sweetSpotRun = CURSORBENCH_32_DATA.find(r => r.isSweetSpot) || { modelId: 'grok-4-6', modelName: 'Grok 4.6', effort: 'Medium', score: 67.1, costUsd: 1.28, tokensPerTask: 17942, pool: 'cursor-models' };

    // 3. Líder Terminal-Bench 2.1
    const sortedTerminal = (typeof MULTI_BENCHMARK_LEDGER !== 'undefined')
      ? [...MULTI_BENCHMARK_LEDGER].filter(l => l.terminalBench21).sort((a, b) => b.terminalBench21 - a.terminalBench21)
      : [];
    const topTerminal = sortedTerminal[0] || { modelId: 'claude-fable-5-1', modelName: 'Claude Fable 5.1 (Max)', terminalBench21: 91.4, deepSwe11: 71.5, sweBenchPro: 81.2 };

    // 4. Ultra Custo-Benefício
    const lunaRun = CURSORBENCH_32_DATA.find(r => r.modelId === 'gpt-5-6-luna' && r.effort === 'Max') || { modelId: 'gpt-5-6-luna', score: 61.1, costUsd: 0.39 };

    // 5. Campeão 100% Local
    const ossRun = CURSORBENCH_32_DATA.find(r => r.modelId === 'gpt-oss-20b') || { modelId: 'gpt-oss-20b', score: 60.7 };

    kpiGrid.innerHTML = `
      <!-- Card 1: Sweet Spot Geral -->
      <button type="button" class="kpi-card card-sweetspot" data-model-id="${sweetSpotRun.modelId}">
        <div class="kpi-tag">🌟 Sweet Spot Geral</div>
        <div class="kpi-body">
          <div class="kpi-model-name">${sweetSpotRun.modelName} (${sweetSpotRun.effort})</div>
          <div class="kpi-primary-score">${sweetSpotRun.score.toFixed(1)}%</div>
        </div>
        <div class="kpi-footer">
          <span>$${sweetSpotRun.costUsd.toFixed(2)} / task • ${(sweetSpotRun.tokensPerTask / 1000).toFixed(1)}k tokens</span>
          <span class="kpi-badge pool-cursor">${sweetSpotRun.pool === 'cursor-models' ? 'Cursor Pool' : 'Standard'}</span>
        </div>
      </button>

      <!-- Card 2: 1º Lugar Geral CursorBench -->
      <button type="button" class="kpi-card card-top" data-model-id="${topCursor.modelId}">
        <div class="kpi-tag">👑 1º Lugar Geral CursorBench</div>
        <div class="kpi-body">
          <div class="kpi-model-name">${topCursor.modelName} (${topCursor.effort})</div>
          <div class="kpi-primary-score">${topCursor.score.toFixed(1)}%</div>
        </div>
        <div class="kpi-footer">
          <span>$${topCursor.costUsd.toFixed(2)} / task • ${(topCursor.tokensPerTask / 1000).toFixed(1)}k tokens</span>
          <span class="kpi-badge pool-anthropic">Frontier #1</span>
        </div>
      </button>

      <!-- Card 3: 1º Lugar Terminal-Bench -->
      <button type="button" class="kpi-card card-sol" data-model-id="${topTerminal.modelId}">
        <div class="kpi-tag">👑 1º Lugar Terminal-Bench</div>
        <div class="kpi-body">
          <div class="kpi-model-name">${topTerminal.modelName}</div>
          <div class="kpi-primary-score">${topTerminal.terminalBench21 ? topTerminal.terminalBench21.toFixed(1) + '%' : 'N/D'}</div>
        </div>
        <div class="kpi-footer">
          <span>${topTerminal.deepSwe11 ? topTerminal.deepSwe11.toFixed(1) + '% DeepSWE' : ''} • ${topTerminal.sweBenchPro ? topTerminal.sweBenchPro.toFixed(1) + '% Pro' : ''}</span>
          <span class="kpi-badge pool-anthropic">Anthropic Frontier</span>
        </div>
      </button>

      <!-- Card 4: GPT-5.6 Luna Ultra Custo-Benefício -->
      <button type="button" class="kpi-card card-luna" data-model-id="${lunaRun.modelId}">
        <div class="kpi-tag">💎 Ultra Custo/Benefício</div>
        <div class="kpi-body">
          <div class="kpi-model-name">GPT-5.6 Luna (Max)</div>
          <div class="kpi-primary-score">${lunaRun.score ? lunaRun.score.toFixed(1) + '%' : '61,1%'}</div>
        </div>
        <div class="kpi-footer">
          <span>$${lunaRun.costUsd ? lunaRun.costUsd.toFixed(2) : '0,39'} / task • 10.250 req/mês no Go</span>
          <span class="kpi-badge pool-openai">OpenCode Go</span>
        </div>
      </button>

      <!-- Card 5: gpt-oss-20b Campeão Local -->
      <button type="button" class="kpi-card card-local" data-model-id="gpt-oss-20b">
        <div class="kpi-tag">🏠 Campeão 100% Local</div>
        <div class="kpi-body">
          <div class="kpi-model-name">gpt-oss-20b (High)</div>
          <div class="kpi-primary-score">60,7%</div>
        </div>
        <div class="kpi-footer">
          <span>Roda em 16 GB • 3,79 score/GB</span>
          <span class="kpi-badge pool-local">Open Weights</span>
        </div>
      </button>

      <!-- Card 6: Gemini 3.8 Flash Velocidade & Throughput -->
      <button type="button" class="kpi-card card-speed" data-model-id="gemini-3-8-flash">
        <div class="kpi-tag">⚡ Ultra Velocidade & 1M</div>
        <div class="kpi-body">
          <div class="kpi-model-name">Gemini 3.8 Flash</div>
          <div class="kpi-primary-score">305 tok/s</div>
        </div>
        <div class="kpi-footer">
          <span>90,8% TB 2.1 • 1M Multimodal</span>
          <span class="kpi-badge pool-google">Google Flash</span>
        </div>
      </button>

      <!-- Card 7: DeepSeek V4 Flash Vision Exp -->
      <button type="button" class="kpi-card card-vision" data-model-id="deepseek-v4-vision-exp">
        <div class="kpi-tag">👁️ Visão Nativa Barata</div>
        <div class="kpi-body">
          <div class="kpi-model-name">DeepSeek V4 Flash Vision Exp</div>
          <div class="kpi-primary-score">75,9%</div>
        </div>
        <div class="kpi-footer">
          <span>~$0,000084/img • Toolathlon</span>
          <span class="kpi-badge pool-deepseek">DeepSeek API</span>
        </div>
      </button>

      <!-- Card 8: GLM-5.3-Flash Open Weights MIT -->
      <button type="button" class="kpi-card card-go" data-model-id="glm-5-3-flash">
        <div class="kpi-tag">🎁 Aberto MIT & 1M Multimodal</div>
        <div class="kpi-body">
          <div class="kpi-model-name">GLM-5.3-Flash</div>
          <div class="kpi-primary-score">320B MoE</div>
        </div>
        <div class="kpi-footer">
          <span>84,3% TB 2.1 • Ex-Ox Alpha</span>
          <span class="kpi-badge pool-zai">Open Weights MIT</span>
        </div>
      </button>
    `;
  }

  // ==========================================
  // 4. MÓDULO DASHBOARD & CATÁLOGO (44 MODELOS)
  // ==========================================
  function renderDashboardTable() {
    const tbody = document.getElementById('dashboardTableBody');
    if (!tbody) return;

    const models = Object.values(AI_MODELS_DATA);
    let filtered = models;

    // Filtro por Chips
    if (AppState.dashboardFilter === 'frontier') {
      filtered = filtered.filter(m => m.badges && m.badges.some(b => b.includes('FRONTIER') || b.includes('LÍDER') || b.includes('CAMPEÃO')));
    } else if (AppState.dashboardFilter === 'subagents') {
      filtered = filtered.filter(m => (m.badges && m.badges.some(b => b.includes('SUBAGENT') || b.includes('RÁPIDO') || b.includes('WORKER'))) || (m.sweetSpot && m.sweetSpot.toLowerCase().includes('subagent')));
    } else if (AppState.dashboardFilter === 'open-weights') {
      filtered = filtered.filter(m => m.openWeights);
    } else if (AppState.dashboardFilter === 'multimodal') {
      filtered = filtered.filter(m => m.modalities && (m.modalities.input.includes('video') || m.modalities.input.includes('image')));
    } else if (AppState.dashboardFilter === 'sub-dollar') {
      filtered = filtered.filter(m => m.pricing && m.pricing.standard && m.pricing.standard.input < 1.0);
    } else if (AppState.dashboardFilter === 'opencode-go') {
      filtered = filtered.filter(m => m.openCodeGo && m.openCodeGo.available);
    }

    // Filtro por Busca de Texto
    if (AppState.dashboardSearchQuery) {
      filtered = filtered.filter(m => {
        const aliases = (m.historicalAliases || []).join(' ');
        const fullText = `${m.id} ${m.name} ${aliases} ${m.providerName} ${m.family} ${m.architectureType || ''} ${m.sweetSpot || ''} ${(m.badges || []).join(' ')} ${m.antigravity ? m.antigravity.poolLabel + ' ' + m.antigravity.role : ''} ${m.openWeights ? 'local open weights gratuito open-source' : 'api cloud pay-as-you-go'}`.toLowerCase();
        return fullText.includes(AppState.dashboardSearchQuery);
      });
    }

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
    const countSpan = document.getElementById('comparatorSelectedCount');
    const chipsContainer = document.getElementById('comparatorSelectedChips');
    const launchBtn = document.getElementById('btnLaunchComparison');
    if (!bar) return;

    const validModels = (AppState.comparatorModels || []).filter(Boolean);
    const count = validModels.length;

    if (count === 0) {
      bar.classList.remove('show');
    } else {
      bar.classList.add('show');
      if (countSpan) countSpan.innerText = `${count} de 4 selecionados`;

      if (chipsContainer) {
        chipsContainer.innerHTML = validModels.map(id => {
          const m = AI_MODELS_DATA[id] || { name: id };
          return `<span class="floating-model-pill">${m.name} <button type="button" class="pill-remove-btn" data-remove-id="${id}" title="Remover ${m.name}">×</button></span>`;
        }).join('');
      }

      if (launchBtn) {
        launchBtn.disabled = count < 2;
        launchBtn.innerText = count < 2 ? 'Selecione pelo menos 2' : `Comparar (${count}) ⚖️`;
      }
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
  // 7. MÓDULO DOSSIÊ COMPLETO DO MODELO (6 SUB-ABAS)
  // ==========================================
  function renderModelDossier(modelId) {
    const container = document.getElementById('modelDetailContainer');
    if (!container) return;

    const model = AI_MODELS_DATA[modelId] || AI_MODELS_DATA['grok-4-6'];
    const provider = AI_PROVIDERS_DATA[model.provider] || { name: model.providerName, logo: '⚡' };
    const ledgerEntry = MULTI_BENCHMARK_LEDGER.find(l => l.modelId === model.id);
    const cursorBenchRuns = CURSORBENCH_32_DATA.filter(r => r.modelId === model.id);

    container.innerHTML = `
      <div class="breadcrumb-bar">
        <button class="btn-back" onclick="location.hash='#dashboard'">← Voltar ao Catálogo</button>
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
              <div style="font-size: 0.85rem; color: var(--text-muted);">Desenvolvido por <strong>${model.providerName}</strong> • ${model.architectureType}</div>
              <div class="model-badges-list">
                ${(model.badges || []).map(b => `<span class="badge-tag badge-frontier">${b}</span>`).join('')}
              </div>
              ${model.previewHistory ? `
                <div style="margin-top: 8px; display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(234, 179, 8, 0.12); border: 1px solid rgba(234, 179, 8, 0.4); border-radius: 4px; font-size: 0.78rem; color: #facc15;">
                  <span>ℹ️</span> Testado anonimamente no OpenCode e OpenRouter como <strong>${model.previewHistory.alias}</strong> (revelado oficialmente pela Z.ai em 26/08/2026)
                </div>
              ` : ''}
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-primary" onclick="window.AIApp.openComparatorWith('${model.id}')">⚔️ Comparar Lado a Lado</button>
          </div>
        </div>

        <!-- 10 Sub-Abas do Dossiê Expandido -->
        <div class="dossier-subtabs-nav">
          <button class="subtab-btn active" data-tab="tab-specs">📄 Ficha Canônica</button>
          <button class="subtab-btn" data-tab="tab-benchmarks">🧠 Thinking & Benchmarks</button>
          <button class="subtab-btn" data-tab="tab-pricing">💰 Tarifas & Caching</button>
          <button class="subtab-btn" data-tab="tab-plans">💳 Planos & Assinaturas</button>
          <button class="subtab-btn" data-tab="tab-history">📜 Histórico & Linhagem</button>
          <button class="subtab-btn" data-tab="tab-community">💬 Comunidade & Perfil</button>
          <button class="subtab-btn" data-tab="tab-usecases">🎯 Casos de Uso</button>
          <button class="subtab-btn" data-tab="tab-hardware">🖥️ Hardware & VRAM</button>
          <button class="subtab-btn" data-tab="tab-configs">🔌 Harnesses & JSON</button>
          <button class="subtab-btn" data-tab="tab-governance">🔒 Governança & ZDR</button>
        </div>

        <!-- Subtab 1: Ficha Canônica -->
        <div class="subtab-panel active" id="tab-specs">
          <div class="specs-grid">
            <div class="spec-item-card"><div class="spec-label">Janela de Contexto</div><div class="spec-value">${(model.contextWindow).toLocaleString()} tokens (${(model.contextWindow / 1000).toFixed(0)}k)</div></div>
            <div class="spec-item-card"><div class="spec-label">Output Máximo</div><div class="spec-value">${(model.maxOutputTokens || 16384).toLocaleString()} tokens</div></div>
            <div class="spec-item-card"><div class="spec-label">Data de Lançamento</div><div class="spec-value">${model.releaseDate || '2026'}</div></div>
            <div class="spec-item-card"><div class="spec-label">Knowledge / Training Cutoff</div><div class="spec-value">${model.knowledgeCutoff || 'fev/2025'} / ${model.trainingCutoff || 'jul/2025'}</div></div>
            <div class="spec-item-card"><div class="spec-label">Latência Relativa Provedor</div><div class="spec-value highlight-cyan">${model.relativeLatency || 'Padrão'}</div></div>
            <div class="spec-item-card"><div class="spec-label">Tipo de Atenção / Arquitetura</div><div class="spec-value">${model.architectureType}</div></div>
            <div class="spec-item-card"><div class="spec-label">Modalidades de Entrada</div><div class="spec-value">${(model.modalities.input || []).join(', ').toUpperCase()} → ${(model.modalities.output || []).join(', ').toUpperCase()}</div></div>
            <div class="spec-item-card"><div class="spec-label">Raciocínio (Thinking)</div><div class="spec-value">${model.reasoning ? (model.reasoning.extendedThinking ? '✅ Extended Thinking (budget_tokens)' : (model.reasoning.mandatory ? 'Mandatório (Always ON)' : 'Opcional / Configurável')) + (model.reasoning.adaptiveThinking ? ' • ✅ Adaptive' : ' • ❌ Sem Adaptive') : 'Não suportado'}</div></div>
            <div class="spec-item-card"><div class="spec-label">Function Calling / Tools</div><div class="spec-value">${model.tools.functionCalling ? 'Suporte Nativo' : 'Incompatível'}</div></div>
            <div class="spec-item-card"><div class="spec-label">Structured Output</div><div class="spec-value">${model.tools.structuredOutput}</div></div>
            ${model.antigravity ? `
              <div class="spec-item-card" style="border-color: rgba(249, 115, 22, 0.4);"><div class="spec-label">Google Antigravity Pool</div><div class="spec-value highlight-amber">${model.antigravity.poolLabel}</div></div>
              <div class="spec-item-card"><div class="spec-label">Papel no Antigravity</div><div class="spec-value">${model.antigravity.role}</div></div>
            ` : ''}
          </div>

          ${model.antigravity && model.antigravity.quotaWarning ? `
            <div style="margin-top: 14px; padding: 12px 16px; background: rgba(249, 115, 22, 0.08); border: 1px solid rgba(249, 115, 22, 0.3); border-radius: var(--radius-md); font-size: 0.85rem; color: #fdba74;">
              <strong>⚠️ Alerta de Governança de Cota (Antigravity):</strong> ${model.antigravity.quotaWarning}
            </div>
          ` : ''}

          <div style="margin-top: 20px;">
            <h4 style="margin-bottom: 8px;">Pontos Fortes:</h4>
            <ul style="padding-left: 20px; color: var(--text-secondary);">${(model.strengths || []).map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
          ${model.weaknesses && model.weaknesses.length > 0 ? `
            <div style="margin-top: 14px;">
              <h4 style="margin-bottom: 8px; color: var(--accent-rose);">Pontos Fracos / Limitações:</h4>
              <ul style="padding-left: 20px; color: var(--text-secondary);">${model.weaknesses.map(w => `<li>${w}</li>`).join('')}</ul>
            </div>
          ` : ''}

          ${model.effortLatencyTtfa ? `
            <div class="content-box" style="margin-top: 16px; border-color: rgba(251, 146, 60, 0.4); background: rgba(251, 146, 60, 0.04);">
              <h4 style="color: #fb923c; margin-bottom: 8px;">⏱️ Curva de Latência de Raciocínio (TTFA por Esforço de Thinking)</h4>
              <div class="specs-grid" style="grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px;">
                <div class="spec-item-card"><div class="spec-label">Low Effort</div><div class="spec-value">${model.effortLatencyTtfa.low}</div></div>
                <div class="spec-item-card"><div class="spec-label">Medium Effort</div><div class="spec-value">${model.effortLatencyTtfa.medium}</div></div>
                <div class="spec-item-card"><div class="spec-label">High Effort (Default)</div><div class="spec-value highlight-cyan">${model.effortLatencyTtfa.high}</div></div>
                <div class="spec-item-card"><div class="spec-label">XHigh Effort</div><div class="spec-value highlight-purple">${model.effortLatencyTtfa.xhigh}</div></div>
                <div class="spec-item-card"><div class="spec-label">Max Effort</div><div class="spec-value highlight-rose">${model.effortLatencyTtfa.max}</div></div>
              </div>
              ${model.promptCacheWarning ? `
                <div style="margin-top: 10px; font-size: 0.82rem; color: #fdba74;">
                  ⚠️ <strong>Regra de Prompt Caching:</strong> ${model.promptCacheWarning}
                </div>
              ` : ''}
              ${model.tokenizerNote ? `
                <div style="margin-top: 4px; font-size: 0.82rem; color: var(--text-secondary);">
                  ℹ️ <strong>Densidade do Tokenizer:</strong> ${model.tokenizerNote}
                </div>
              ` : ''}
            </div>
          ` : ''}

          ${model.communityEvals && model.communityEvals.deepSwe113 ? `
            <div class="content-box" style="margin-top: 16px; border-color: rgba(244, 63, 94, 0.4); background: rgba(244, 63, 94, 0.04);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: #f43f5e; margin: 0;">🔬 Avaliação de Comunidade DeepSWE 1.1 (113 Tarefas Auditadas)</h4>
                <span class="badge-tag badge-danger">Stealth Telemetry</span>
              </div>
              <div class="specs-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px;">
                <div class="spec-item-card"><div class="spec-label">Resolvidas no DeepSWE</div><div class="spec-value highlight-green">${model.communityEvals.deepSwe113.resolved} / ${model.communityEvals.deepSwe113.total} (${model.communityEvals.deepSwe113.scorePct}%)</div></div>
                <div class="spec-item-card"><div class="spec-label">Taxa de Near-Misses (≥90%)</div><div class="spec-value highlight-amber">${model.communityEvals.deepSwe113.nearMissesPct}% (90/113)</div></div>
                <div class="spec-item-card"><div class="spec-label">Total de Steps / Cache Hit</div><div class="spec-value">${model.communityEvals.deepSwe113.steps.toLocaleString()} steps (96,1%)</div></div>
                <div class="spec-item-card"><div class="spec-label">Harness de Execução</div><div class="spec-value" style="font-size: 0.85rem;">${model.communityEvals.deepSwe113.harness}</div></div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Subtab 2: Benchmarks -->
        <div class="subtab-panel" id="tab-benchmarks">
          <h4>Desempenho no CursorBench 3.2 por Esforço de Thinking:</h4>
          ${cursorBenchRuns.length > 0 ? `
            <table class="data-table" style="margin: 14px 0;">
              <thead><tr><th>Nível de Esforço</th><th>Score (%)</th><th>Custo / Task</th><th>Tokens / Task</th><th>Harness</th><th>Sweet Spot?</th></tr></thead>
              <tbody>
                ${cursorBenchRuns.map(r => `
                  <tr>
                    <td><strong>${r.effort}</strong></td>
                    <td class="score-cell score-highlight">${r.score.toFixed(1)}%</td>
                    <td>$${r.costUsd.toFixed(2)}</td>
                    <td>${r.tokensPerTask.toLocaleString()}</td>
                    <td>${r.harness}</td>
                    <td>${r.isSweetSpot ? '<span class="badge-tag badge-sweetspot">🌟 Sweet Spot</span>' : '-'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<p style="color: var(--text-muted); margin: 12px 0;">Nenhuma bateria do CursorBench 3.2 registrada para este modelo.</p>'}
          
          <!-- BATERIA OFICIAL DO FABRICANTE SE DISPONÍVEL -->
          ${model.officialBenchmarks ? `
            <div class="content-box" style="margin-top: 20px; border-color: var(--border-medium);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="color: var(--accent-amber); margin: 0;">🏆 Bateria Oficial de Benchmarks do Fabricante (${model.providerName})</h4>
                <span class="badge-tag badge-warning">Auditado Oficialmente</span>
              </div>
              <div class="specs-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 14px;">
                ${model.officialBenchmarks.sweBenchVerified !== undefined ? `<div class="spec-item-card"><div class="spec-label">SWE-bench Verified</div><div class="spec-value highlight-green" style="font-size: 1.2rem;">${model.officialBenchmarks.sweBenchVerified}%</div></div>` : ''}
                ${model.officialBenchmarks.terminalBench !== undefined ? `<div class="spec-item-card"><div class="spec-label">Terminal-Bench 2.0</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.terminalBench}%</div></div>` : ''}
                ${model.officialBenchmarks.terminalBenchNoThinking !== undefined ? `<div class="spec-item-card"><div class="spec-label">Terminal-Bench (Sem Think)</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.terminalBenchNoThinking}%</div></div>` : ''}
                ${model.officialBenchmarks.terminalBench32kThinking !== undefined ? `<div class="spec-item-card"><div class="spec-label">Terminal-Bench (32k Think)</div><div class="spec-value highlight-purple" style="font-size: 1.1rem;">${model.officialBenchmarks.terminalBench32kThinking}%</div></div>` : ''}
                ${model.officialBenchmarks.mrcrV2_1m_max !== undefined ? `<div class="spec-item-card"><div class="spec-label">OpenAI MRCR v2 (1M Tokens)</div><div class="spec-value highlight-purple" style="font-size: 1.15rem; font-weight: 800;">${model.officialBenchmarks.mrcrV2_1m_max}% <span style="font-size: 0.75rem; color: var(--text-muted);">(64k: ${model.officialBenchmarks.mrcrV2_1m_64k}%)</span></div></div>` : ''}
                ${model.officialBenchmarks.mcpAtlas !== undefined ? `<div class="spec-item-card"><div class="spec-label">MCP-Atlas (Ferramentas)</div><div class="spec-value highlight-cyan" style="font-size: 1.1rem;">${model.officialBenchmarks.mcpAtlas}%</div></div>` : ''}
                ${model.officialBenchmarks.hleWithTools !== undefined ? `<div class="spec-item-card"><div class="spec-label">Humanities Last Exam (+Tools)</div><div class="spec-value highlight-amber" style="font-size: 1.1rem;">${model.officialBenchmarks.hleWithTools}% <span style="font-size: 0.75rem; color: var(--text-muted);">(Sem tools: ${model.officialBenchmarks.hleWithoutTools}%)</span></div></div>` : ''}
                ${model.officialBenchmarks.arcAgi2Verified !== undefined ? `<div class="spec-item-card"><div class="spec-label">ARC-AGI-2 Verified</div><div class="spec-value highlight-purple" style="font-size: 1.1rem;">${model.officialBenchmarks.arcAgi2Verified}%</div></div>` : ''}
                ${model.officialBenchmarks.osworld !== undefined ? `<div class="spec-item-card"><div class="spec-label">OSWorld (Computer Use)</div><div class="spec-value highlight-cyan" style="font-size: 1.1rem;">${model.officialBenchmarks.osworld}%</div></div>` : ''}
                ${model.officialBenchmarks.gpqaDiamond !== undefined ? `<div class="spec-item-card"><div class="spec-label">GPQA Diamond</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.gpqaDiamond}%</div></div>` : ''}
                ${model.officialBenchmarks.aime2025NoTools !== undefined ? `<div class="spec-item-card"><div class="spec-label">AIME 2025</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.aime2025NoTools}% ${model.officialBenchmarks.aime2025WithTools ? `(+Tools: ${model.officialBenchmarks.aime2025WithTools}%)` : (model.officialBenchmarks.aime2025Python ? `(+Py: ${model.officialBenchmarks.aime2025Python}%)` : '')}</div></div>` : ''}
                ${model.officialBenchmarks.mmlu !== undefined ? `<div class="spec-item-card"><div class="spec-label">MMLU</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.mmlu}%</div></div>` : ''}
                ${model.officialBenchmarks.sweBenchMultilingual !== undefined ? `<div class="spec-item-card"><div class="spec-label">SWE-bench Multilingual</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.sweBenchMultilingual}%</div></div>` : ''}
                ${model.officialBenchmarks.mmmuProWithTools !== undefined ? `<div class="spec-item-card"><div class="spec-label">MMMU-Pro (+Tools)</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.mmmuProWithTools}% <span style="font-size: 0.75rem; color: var(--text-muted);">(No tools: ${model.officialBenchmarks.mmmuProNoTools}%)</span></div></div>` : ''}
                ${model.officialBenchmarks.tau2Retail !== undefined ? `<div class="spec-item-card"><div class="spec-label">τ²-bench Retail / Airline</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.tau2Retail}% ${model.officialBenchmarks.tau2Airline ? `/ ${model.officialBenchmarks.tau2Airline}%` : ''}</div></div>` : ''}
                ${model.officialBenchmarks.aiderPolyglot !== undefined ? `<div class="spec-item-card"><div class="spec-label">Aider Polyglot</div><div class="spec-value" style="font-size: 1.1rem;">${model.officialBenchmarks.aiderPolyglot}%</div></div>` : ''}
              </div>
              <div style="background: var(--bg-surface-dim); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px; font-size: 0.8rem; color: var(--text-secondary);">
                📌 <em>${model.officialBenchmarks.methodology}</em>
              </div>
            </div>
          ` : ''}

          ${model.historicalEvaluations && model.historicalEvaluations.length > 0 ? `
            <div class="content-box" style="margin-top: 20px; border-color: rgba(234, 179, 8, 0.4); background: rgba(234, 179, 8, 0.04);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="color: #facc15; margin: 0;">📜 Avaliações Históricas Pré-Revelação (Fase Stealth Preview)</h4>
                <span class="badge-tag badge-warning">Histórico</span>
              </div>
              <p style="font-size: 0.83rem; color: var(--text-secondary); margin-bottom: 12px;">
                Métricas auditadas registradas enquanto o modelo operava sob o codinome anônimo <strong>${model.historicalEvaluations[0].alias}</strong>:
              </p>
              <table class="data-table">
                <thead><tr><th>Benchmark</th><th>Score</th><th>Tarefas</th><th>Fase</th><th>Notas</th></tr></thead>
                <tbody>
                  ${model.historicalEvaluations.map(h => `
                    <tr>
                      <td><strong>${h.benchmark}</strong></td>
                      <td class="score-cell">${h.score}%</td>
                      <td>${h.solved ? `${h.solved} / ${h.tasks}` : `${h.tasks} tarefas`}</td>
                      <td><span class="badge-tag badge-frontier">${h.phase}</span></td>
                      <td style="font-size: 0.8rem; color: var(--text-muted);">${h.notes}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}

          <h4 style="margin-top: 20px;">Métricas Oficiais nos Principais Ledgers:</h4>
          <div class="specs-grid" style="margin-top: 10px;">
            <div class="spec-item-card"><div class="spec-label">Terminal-Bench 2.1</div><div class="spec-value">${ledgerEntry && ledgerEntry.terminalBench21 ? `${ledgerEntry.terminalBench21.toFixed(1)}%` : 'N/D'}</div></div>
            <div class="spec-item-card"><div class="spec-label">DeepSWE 1.1 (113 tarefas)</div><div class="spec-value">${ledgerEntry && ledgerEntry.deepSwe11 ? `${ledgerEntry.deepSwe11.toFixed(1)}%` : 'N/D'}</div></div>
            <div class="spec-item-card"><div class="spec-label">SWE-bench Pro</div><div class="spec-value">${ledgerEntry && ledgerEntry.sweBenchPro ? `${ledgerEntry.sweBenchPro.toFixed(1)}%` : 'N/D'}</div></div>
            <div class="spec-item-card"><div class="spec-label">SWE-bench Verified</div><div class="spec-value">${ledgerEntry && ledgerEntry.sweBenchVerified ? `${ledgerEntry.sweBenchVerified.toFixed(1)}%` : 'N/D'}</div></div>
          </div>

          <!-- PAINEL OFICIAL DE AUDITORIA ARTIFICIAL ANALYSIS -->
          <div class="aa-audit-dossier-card">
            <div class="aa-audit-header">
              <h4>🛡️ Auditoria Oficial: Artificial Analysis (v4.1.1)</h4>
              <a href="https://artificialanalysis.ai" target="_blank" rel="noopener" class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;">
                <span>Ver no site oficial ↗</span>
              </a>
            </div>
            ${(() => {
              if (model.artificialAnalysis) {
                const r = model.artificialAnalysis.reasoning;
                const nr = model.artificialAnalysis.nonReasoning;
                return `
                  <div class="specs-grid">
                    <div class="spec-item-card" style="border-color: var(--aa-purple-border);"><div class="spec-label">AA Index (Reasoning)</div><div class="spec-value highlight-purple" style="font-size: 1.3rem; font-weight: 800;">${r.aaIndex.toFixed(1)} <span style="font-size: 0.75rem; color: var(--text-muted);">/ 100</span></div></div>
                    <div class="spec-item-card"><div class="spec-label">AA Index (Sem Reasoning)</div><div class="spec-value" style="font-size: 1.3rem;">${nr.aaIndex.toFixed(1)} <span style="font-size: 0.75rem; color: var(--text-muted);">/ 100</span></div></div>
                    <div class="spec-item-card"><div class="spec-label">Custo / Tarefa (AA Method)</div><div class="spec-value">$${r.costPerTaskUsd.toFixed(2)}</div></div>
                    <div class="spec-item-card"><div class="spec-label">Decode Anthropic vs Bedrock</div><div class="spec-value"><strong>~${r.speedTps} tok/s</strong> vs <strong>~${r.bedrockSpeedTps} tok/s</strong></div></div>
                    <div class="spec-item-card"><div class="spec-label">Latência TTFT / Resposta Final</div><div class="spec-value">~${nr.ttftSeconds}s (TTFT) • ${r.timeToFinalAnswer} (Final)</div></div>
                    <div class="spec-item-card"><div class="spec-label">Volume de Tokens Avaliados</div><div class="spec-value">${(r.totalOutputTokens / 1000000).toFixed(0)}M tokens</div></div>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 10px;">
                    🔍 <em>${model.artificialAnalysis.thinkingImpact} Avaliação independente em suíte multimodal e Stirrup Harness.</em>
                  </div>
                `;
              }

              const aa = ARTIFICIAL_ANALYSIS_DATA.rankings.find(r => r.modelId === model.id);
              if (aa) {
                return `
                  <div class="specs-grid">
                    <div class="spec-item-card" style="border-color: var(--aa-purple-border);"><div class="spec-label">AA Intelligence Index</div><div class="spec-value highlight-purple" style="font-size: 1.3rem; font-weight: 800;">${aa.aaIndex.toFixed(1)} <span style="font-size: 0.75rem; color: var(--text-muted);">/ 100</span></div></div>
                    <div class="spec-item-card"><div class="spec-label">Custo / Tarefa (AA Method)</div><div class="spec-value">$${aa.costPerTask.toFixed(2)}</div></div>
                    <div class="spec-item-card"><div class="spec-label">GDPval-AA v2 (Rating Elo)</div><div class="spec-value">${aa.gdpvalElo ? `<strong>${aa.gdpvalElo} Elo</strong>` : 'N/D'}</div></div>
                    <div class="spec-item-card"><div class="spec-label">Decode Medido (Throughput)</div><div class="spec-value">${aa.throughputTps.toFixed(1)} tok/s</div></div>
                    <div class="spec-item-card"><div class="spec-label">Ranking Geral na Suíte</div><div class="spec-value"><strong>#${aa.rank}</strong> de ${ARTIFICIAL_ANALYSIS_DATA.rankings.length} modelos</div></div>
                    <div class="spec-item-card"><div class="spec-label">Contexto no Endpoint AA</div><div class="spec-value">${aa.contextWindow}</div></div>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 10px;">
                    🔍 <em>Bateria independente auditada em múltiplos provedores de nuvem (Stirrup Harness, GDPval-AA v2, τ³-Banking, Terminal-Bench 2.1 e SciCode).</em>
                  </div>
                `;
              } else {
                return `
                  <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle); color: var(--text-secondary); font-size: 0.85rem;">
                    ℹ️ <strong>Status N/D na Artificial Analysis:</strong> Este modelo ainda não possui submissão ou bateria padronizada pública na suíte do Intelligence Index v4.1.1. Mantidas avaliações comunitárias e de fabricantes acima.
                  </div>
                `;
              }
            })()}
          </div>

          <!-- GUIA OPERACIONAL & CASOS DE USO -->
          ${model.operationalGuidance ? `
            <div class="content-box" style="margin-top: 20px; border-color: var(--border-medium);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="color: var(--accent-cyan); margin: 0;">🧭 Papel Arquitetural & Guia Operacional em Coding</h4>
                <span class="badge-tag badge-openweights">Worker Subagente</span>
              </div>
              <div style="background: var(--bg-surface-dim); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 14px; font-size: 0.85rem; color: var(--text-primary);">
                🔄 <strong>Padrão de Orquestração Recomendado:</strong> <code>${model.operationalGuidance.orchestrationFlow}</code>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div style="background: var(--bg-surface-dim); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px;">
                  <h5 style="color: var(--accent-emerald); margin-bottom: 8px;">✅ Onde Brilha (Altamente Recomendado):</h5>
                  <ul style="padding-left: 18px; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
                    ${model.operationalGuidance.idealFor.map(i => `<li>${i}</li>`).join('')}
                  </ul>
                </div>
                <div style="background: var(--bg-surface-dim); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px;">
                  <h5 style="color: var(--accent-rose); margin-bottom: 8px;">❌ Onde Evitar (Não Recomendado):</h5>
                  <ul style="padding-left: 18px; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
                    ${model.operationalGuidance.avoidFor.map(a => `<li>${a}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- PAINEL DE AVALIAÇÃO COMUNITÁRIA & AUDITORIA EMPÍRICA -->
          ${model.communityEvals ? `
            <div class="content-box" style="margin-top: 20px; border-color: var(--border-medium);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="color: var(--accent-rose); margin: 0;">🔬 Auditoria Comunitária Independente (Traces Públicos 24/08/2026)</h4>
                <span class="badge-tag badge-danger">Harness Reproduzível</span>
              </div>
              
              <div class="specs-grid" style="margin-bottom: 16px;">
                <div class="spec-item-card">
                  <div class="spec-label">DeepSWE 1.1 Completo (113 tarefas)</div>
                  <div class="spec-value highlight-green" style="font-size: 1.25rem;">${model.communityEvals.deepSwe113.scorePct}% <span style="font-size: 0.75rem; color: var(--text-muted);">(${model.communityEvals.deepSwe113.resolved}/${model.communityEvals.deepSwe113.total} resolvidas)</span></div>
                </div>
                <div class="spec-item-card">
                  <div class="spec-label">Taxa de Near-Misses (&ge;90% testes)</div>
                  <div class="spec-value" style="font-size: 1.25rem; color: var(--accent-cyan);">${model.communityEvals.deepSwe113.nearMissesPct}% <span style="font-size: 0.75rem; color: var(--text-muted);">(90/113 tarefas)</span></div>
                </div>
                <div class="spec-item-card">
                  <div class="spec-label">LiveCodeBench v6 (Pass@1)</div>
                  <div class="spec-value" style="font-size: 1.25rem; color: var(--accent-amber);">${model.communityEvals.liveCodeBenchV6.scorePct}% <span style="font-size: 0.75rem; color: var(--text-muted);">(Easy: ${model.communityEvals.liveCodeBenchV6.easy}%)</span></div>
                </div>
                <div class="spec-item-card">
                  <div class="spec-label">Telemetria OpenRouter (Throughput)</div>
                  <div class="spec-value">${model.communityEvals.openRouterTelemetrics.throughputP50} tok/s <span style="font-size: 0.75rem; color: var(--text-muted);">(Latência P50: ${model.communityEvals.openRouterTelemetrics.latencyP50}s)</span></div>
                </div>
              </div>

              <div style="background: var(--bg-surface-dim); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
                <div><strong>⏱️ Telemetria do Run DeepSWE:</strong> ${model.communityEvals.deepSwe113.steps.toLocaleString()} passos agênticos (mediana: ${model.communityEvals.deepSwe113.medianSteps} steps | máx: ${model.communityEvals.deepSwe113.maxSteps}) em 20h39m ininterruptas no harness <code>${model.communityEvals.deepSwe113.harness}</code>.</div>
                <div style="margin-top: 6px;"><strong>🚨 Ponto Crítico de Tool Calling:</strong> 9,7% da suíte (11 tarefas) falhou por <code>RepeatedFormatError</code> (o modelo respondeu em texto puro 3 vezes consecutivas sem acionar ferramentas).</div>
                <div style="margin-top: 6px;"><strong>📊 Consumo Massivo em Produção (OpenRouter):</strong> ${model.communityEvals.tokensConsumedAppRank.hermes} tokens (Hermes Agent) • ${model.communityEvals.tokensConsumedAppRank.claudeCode} tokens (Claude Code) • ${model.communityEvals.tokensConsumedAppRank.deepseekHarness} tokens (DeepSeek Multimodal Bridge).</div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Subtab 3: Hardware & VRAM -->
        <div class="subtab-panel" id="tab-hardware">
          ${(() => {
            const localHardware = typeof HARDWARE_LOCAL_MODELS_DATA !== 'undefined' ? HARDWARE_LOCAL_MODELS_DATA.find(h => h.modelId === model.id) : null;
            if (localHardware) {
              return `
                <div class="content-box" style="border-color: rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.03); margin-bottom: 16px;">
                  <h4 style="color: var(--accent-cyan); margin-top: 0;">🖥️ Topologia de Servidor & Requisitos de VRAM (Auditado 2026)</h4>
                  <div class="specs-grid">
                    <div class="spec-item-card"><div class="spec-label">VRAM Mínima Quantizada (INT4 / FP4)</div><div class="spec-value highlight-green">${localHardware.minVramInt4}</div></div>
                    <div class="spec-item-card"><div class="spec-label">VRAM Recomendada (FP16 / BF16)</div><div class="spec-value highlight-purple">${localHardware.recommendedBf16}</div></div>
                    <div class="spec-item-card"><div class="spec-label">Throughput Estimado (Single-Stream)</div><div class="spec-value highlight-cyan">${localHardware.estimatedDecodeTps}</div></div>
                    <div class="spec-item-card" style="grid-column: 1 / -1;"><div class="spec-label">Configuração de Estação / Servidor Recomendada</div><div class="spec-value" style="font-size: 0.95rem;"><strong>${localHardware.recommendedNode}</strong></div></div>
                  </div>
                  <div style="margin-top: 10px; font-size: 0.82rem; color: var(--text-secondary);">
                    📌 <em>${localHardware.notes}</em>
                  </div>
                </div>
              `;
            }
            if (model.openWeights && model.hardwareRequirements) {
              return `
                <div class="specs-grid">
                  <div class="spec-item-card"><div class="spec-label">Tamanho dos Pesos (Download)</div><div class="spec-value">${model.hardwareRequirements.downloadSizeBytes ? (model.hardwareRequirements.downloadSizeBytes / 1073741824).toFixed(1) + ' GB' : 'N/D'}</div></div>
                  <div class="spec-item-card"><div class="spec-label">VRAM Mínima Recomendada</div><div class="spec-value">${model.hardwareRequirements.minVramGb || 'N/D'} GB (Ideal: ${model.hardwareRequirements.recommendedVramGb || 'N/D'} GB)</div></div>
                  <div class="spec-item-card"><div class="spec-label">Throughput Decode</div><div class="spec-value">${model.hardwareRequirements.singleStreamDecodeTps || 'N/D'} tok/s</div></div>
                </div>
              `;
            }
            return '<p style="color: var(--text-muted);">Este modelo é proprietário e executado exclusivamente na nuvem gerenciada do provedor.</p>';
          })()}
          <div style="margin-top: 16px;">
            <button class="btn-primary" onclick="location.hash='#calculator'">🖥️ Simular nesta GPU na Calculadora</button>
          </div>
        </div>

        <!-- Subtab 4: Tarifas & OpenCode Go -->
        <div class="subtab-panel" id="tab-pricing">
          <div class="specs-grid">
            <div class="spec-item-card"><div class="spec-label">Preço Padrão (Input / Entrada)</div><div class="spec-value">$${model.pricing.standard.input.toFixed(2)} / milhão</div></div>
            <div class="spec-item-card"><div class="spec-label">Preço Padrão (Output / Saída)</div><div class="spec-value">$${model.pricing.standard.output.toFixed(2)} / milhão</div></div>
            <div class="spec-item-card"><div class="spec-label">Prompt Cache Read (Hit)</div><div class="spec-value highlight-green">${model.pricing.standard.cacheRead !== null && model.pricing.standard.cacheRead !== undefined ? `$${model.pricing.standard.cacheRead.toFixed(2)} / milhão (90% OFF)` : 'Padrão'}</div></div>
            <div class="spec-item-card"><div class="spec-label">Cache Write (5 min / 1 hora)</div><div class="spec-value">${model.pricing.standard.cacheWrite5m ? `$${model.pricing.standard.cacheWrite5m.toFixed(2)} / $${model.pricing.standard.cacheWrite1h.toFixed(2)}` : 'N/D'}</div></div>
            ${model.pricing.batch ? `
              <div class="spec-item-card" style="border-color: rgba(34, 197, 94, 0.4);"><div class="spec-label">Batch API (50% de Desconto)</div><div class="spec-value highlight-green">$${model.pricing.batch.input.toFixed(2)} in / $${model.pricing.batch.output.toFixed(2)} out</div></div>
            ` : ''}
            <div class="spec-item-card"><div class="spec-label">Pool no Cursor Pro</div><div class="spec-value">${model.cursorPool ? model.cursorPool.poolLabel : 'Standard ($0,50/$2,50)'}</div></div>
            <div class="spec-item-card"><div class="spec-label">OpenCode Go ($10/mês)</div><div class="spec-value">${model.openCodeGo && model.openCodeGo.available ? `Classe US$${model.openCodeGo.usageAllowanceUsd} (${model.openCodeGo.quotaBurnMultiplier}× burn • ~${model.openCodeGo.estReqMonth.toLocaleString()} req/mês)` : 'Não listado no Go'}</div></div>
            ${model.pricing.sonnetComparison ? `
              <div class="spec-item-card"><div class="spec-label">Paridade vs Claude Sonnet 5</div><div class="spec-value highlight-cyan">${model.pricing.sonnetComparison}</div></div>
            ` : ''}
          </div>
        </div>

        <!-- Subtab 5: Harnesses & Configs -->
        <div class="subtab-panel" id="tab-configs">
          <h4>Configuração Oficial Pronta para Copiar (OpenCode):</h4>
          <div class="code-snippet-box">
            <button class="btn-copy-code" onclick="window.AIApp.copySnippet('snip-opencode')">Copiar JSON</button>
            <pre id="snip-opencode"><code>${AI_DATA_HELPERS.generateIdeConfig(model.id, 'opencode')}</code></pre>
          </div>
          <h4 style="margin-top: 16px;">Configuração para Aider (.aider.conf.yml):</h4>
          <div class="code-snippet-box">
            <button class="btn-copy-code" onclick="window.AIApp.copySnippet('snip-aider')">Copiar YAML</button>
            <pre id="snip-aider"><code>${AI_DATA_HELPERS.generateIdeConfig(model.id, 'aider')}</code></pre>
          </div>
        </div>

        <!-- Subtab 4: Planos & Assinaturas -->
        <div class="subtab-panel" id="tab-plans">
          <div class="content-box">
            <div class="box-header">
              <h4>💳 Onde Executar Este Modelo em Assinaturas de Ferramentas</h4>
            </div>
            <div class="specs-grid" style="margin-bottom: 16px;">
              <div class="spec-item-card">
                <div class="spec-label">Cursor IDE</div>
                <div class="spec-value">${model.cursorPool ? model.cursorPool.poolLabel : 'Other Models ($20 Pool)'}</div>
              </div>
              <div class="spec-item-card">
                <div class="spec-label">OpenCode Go ($10/mês)</div>
                <div class="spec-value ${model.openCodeGo && model.openCodeGo.available ? (model.openCodeGo.quotaBurnMultiplier === 1 ? 'highlight-green' : model.openCodeGo.quotaBurnMultiplier === 2 ? 'highlight-amber' : 'highlight-rose') : ''}">${model.openCodeGo && model.openCodeGo.available ? `Classe US$${model.openCodeGo.usageAllowanceUsd} (${model.openCodeGo.quotaBurnMultiplier}× burn • ~${model.openCodeGo.estReqMonth.toLocaleString()} req/mês)` : 'Não listado no plano Go'}</div>
              </div>
              <div class="spec-item-card">
                <div class="spec-label">Google Antigravity</div>
                <div class="spec-value highlight-cyan">${model.antigravity ? `${model.antigravity.poolLabel} (${model.antigravity.role})` : 'Indisponível no Antigravity'}</div>
              </div>
              <div class="spec-item-card">
                <div class="spec-label">OpenRouter API</div>
                <div class="spec-value">${model.openRouterId || model.id}</div>
              </div>
            </div>

            <h5 style="margin-top: 14px; margin-bottom: 8px;">Planos de Assinatura que Contemplam Este Modelo:</h5>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(() => {
                if (typeof SUBSCRIPTION_PLANS_DATA === 'undefined') return '';
                const matchedPlans = SUBSCRIPTION_PLANS_DATA.filter(p => {
                  const mList = (p.includedModels || []).join(' ').toLowerCase();
                  return mList.includes(model.name.toLowerCase()) || mList.includes(model.id.toLowerCase()) || (model.provider === p.provider);
                });
                if (matchedPlans.length === 0) return '<p style="color: var(--text-muted);">Consulte a API direta do provedor para precificação sob demanda.</p>';
                return matchedPlans.map(p => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                    <div>
                      <strong>${p.planName}</strong> • <span style="color: var(--text-muted); font-size: 0.8rem;">${p.provider} (${p.product})</span>
                      <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${p.quotaDescription}</div>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: var(--text-primary);">${p.localizedPricing && p.localizedPricing.BRL && p.localizedPricing.BRL.official ? `R$ ${p.localizedPricing.BRL.price.toFixed(2).replace('.', ',')} (Oficial)` : `~ R$ ${typeof FX_HELPERS !== 'undefined' ? FX_HELPERS.convertUsdToBrl(p.monthlyPriceUsd).toFixed(2).replace('.', ',') : (p.monthlyPriceUsd * 5.1556).toFixed(2)}`}</strong>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">US$ ${p.monthlyPriceUsd.toFixed(2)} / mo</div>
                    </div>
                  </div>
                `).join('');
              })()}
            </div>
          </div>
        </div>

        <!-- Subtab 5: Histórico & Linhagem Geracional -->
        <div class="subtab-panel" id="tab-history">
          <div class="content-box">
            <div class="box-header">
              <h4>📜 Linhagem Arquitetural & Eventos Históricos</h4>
            </div>
            ${model.previewHistory ? `
              <div style="padding: 12px 16px; background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.4); border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 0.85rem;">
                <strong style="color: #facc15;">ℹ️ Revelação Stealth de Identidade:</strong>
                <p style="color: var(--text-secondary); margin: 4px 0 0 0;">
                  Este modelo operou sob o alias de preview <strong>${model.previewHistory.alias}</strong> de 20/08/2026 a 26/08/2026 antes de sua revelação oficial como <strong>${model.name}</strong> sob licença MIT.
                </p>
              </div>
            ` : ''}

            <h5 style="margin-bottom: 8px;">Eventos Históricos Registrados:</h5>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${(() => {
                if (typeof MODEL_HISTORY_DATA === 'undefined') return '';
                const events = MODEL_HISTORY_DATA.events.filter(e => e.modelId === model.id);
                if (events.length === 0) return '<p style="color: var(--text-muted);">Sem eventos históricos específicos registrados para este modelo.</p>';
                return events.map(e => `
                  <div style="padding: 10px 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                      <span class="badge-tag badge-frontier">${e.date}</span>
                      <span class="badge-tag badge-subdollar">${e.type}</span>
                    </div>
                    <strong style="color: var(--text-primary); font-size: 0.9rem;">${e.title}</strong>
                    <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 0 0;">${e.description}</p>
                  </div>
                `).join('');
              })()}
            </div>
          </div>
        </div>

        <!-- Subtab 6: Comunidade & Comportamento Prático de Engenharia -->
        <div class="subtab-panel" id="tab-community">
          <div class="content-box">
            <div class="box-header">
              <h4>💬 Avaliações Práticas & Relatos da Comunidade</h4>
              <span class="badge-tag badge-warning">sourceType: community / calibrated</span>
            </div>

            ${(() => {
              if (typeof ENGINEERING_BEHAVIOR_DATA === 'undefined') return '';
              const bData = ENGINEERING_BEHAVIOR_DATA.models[model.id];
              if (!bData) return '<p style="color: var(--text-muted);">Dados de comportamento calibrado em processamento para este modelo.</p>';
              const dims = ENGINEERING_BEHAVIOR_DATA.dimensions;
              return `
                <div style="margin-bottom: 20px;">
                  <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">${bData.profileSummary}</div>
                  <div class="specs-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px;">
                    ${dims.map(d => {
                      const val = bData[d.key];
                      if (typeof val === 'undefined') return '';
                      return `
                        <div class="spec-item-card" style="padding: 8px 12px;">
                          <div class="spec-label">${d.label}</div>
                          <div class="spec-value ${d.isInverted ? (val > 60 ? 'highlight-rose' : 'highlight-green') : (val >= 90 ? 'highlight-cyan' : 'highlight-green')}">${val} / 100</div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            })()}

            <h5 style="margin-top: 16px; margin-bottom: 8px;">Relatos Auditados de Fóruns & Repositórios:</h5>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(() => {
                if (typeof COMMUNITY_REPORTS_DATA === 'undefined') return '';
                const reports = COMMUNITY_REPORTS_DATA.filter(r => (r.models || []).includes(model.id));
                if (reports.length === 0) return '<p style="color: var(--text-muted);">Nenhum relato anedótico direto registrado no banco para este modelo.</p>';
                return reports.map(r => `
                  <div style="padding: 10px 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                      <span class="badge-tag badge-subdollar">${r.platform} • ${r.date}</span>
                      <span class="badge-tag badge-frontier">Harness: ${r.harness}</span>
                    </div>
                    <strong style="color: var(--text-primary); font-size: 0.88rem;">${r.summary}</strong>
                    <ul style="padding-left: 18px; margin: 6px 0 0 0; font-size: 0.8rem; color: var(--text-secondary);">
                      ${(r.observations || []).map(o => `<li>${o}</li>`).join('')}
                    </ul>
                  </div>
                `).join('');
              })()}
            </div>
          </div>
        </div>

        <!-- Subtab 7: Casos de Uso Recomendados -->
        <div class="subtab-panel" id="tab-usecases">
          <div class="content-box">
            <div class="box-header">
              <h4>🎯 Posições em Casos de Uso Reais & Projetos</h4>
              <span class="badge-tag badge-subdollar">E — Calibrado</span>
            </div>
            <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 16px;">
              Veja em quais categorias de projetos este modelo foi classificado entre os 10 melhores do mercado:
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${(() => {
                if (typeof USE_CASE_COMPARISON_DATA === 'undefined') return '';
                const casesWithModel = [];
                USE_CASE_COMPARISON_DATA.useCases.forEach(uc => {
                  const found = uc.rankings.find(r => r.modelId === model.id);
                  if (found) {
                    casesWithModel.push({ ...uc, rankingInfo: found });
                  }
                });
                if (casesWithModel.length === 0) return '<p style="color: var(--text-muted);">Este modelo não figura no Top 10 dos casos de uso calibrados.</p>';
                return casesWithModel.map(c => `
                  <div style="padding: 12px 16px; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.2rem;">${c.icon}</span>
                        <strong style="color: var(--text-primary); font-size: 0.95rem;">${c.title}</strong>
                        <span class="badge-tag badge-frontier">Rank #${c.rankingInfo.rank}</span>
                      </div>
                      <div style="font-size: 0.82rem; color: var(--accent-cyan); margin-top: 2px;"><strong>Papel:</strong> ${c.rankingInfo.role}</div>
                      <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${c.rankingInfo.rationale}</div>
                    </div>
                    <div>
                      <span class="badge-tag badge-sweetspot" style="font-size: 0.85rem;">Fit Score: ${c.rankingInfo.fitScore}/100</span>
                    </div>
                  </div>
                `).join('');
              })()}
            </div>
          </div>
        </div>

        <!-- Subtab 8: Governança & ZDR -->
        <div class="subtab-panel" id="tab-governance">
          <div class="specs-grid">
            <div class="spec-item-card"><div class="spec-label">Zero Data Retention (ZDR)</div><div class="spec-value">${model.privacy ? (model.privacy.retentionDays === 0 ? '✅ ZDR Ativo (0 dias)' : `⚠️ Retenção de até ${model.privacy.retentionDays} dias`) : (model.openCodeGo && model.openCodeGo.trainingConsent ? '❌ Prompts usados para treino (Contributor)' : (model.id === 'glm-5-3-flash' ? '✅ ZDR Oficial Z.ai API / OpenRouter' : '✅ ZDR Ativo / Sem Treinamento'))}</div></div>
            <div class="spec-item-card"><div class="spec-label">Status dos Pesos</div><div class="spec-value">${model.openWeights ? 'Pesos Abertos Auditáveis' : 'Proprietário de Código Fechado'}</div></div>
            <div class="spec-item-card"><div class="spec-label">Nível de Confiança da Fonte</div><div class="spec-value highlight-green">${(model.sourceConfidence || 'oficial').toUpperCase()}</div></div>
          </div>
          ${model.privacy && model.privacy.notes ? `
            <div style="margin-top: 14px; padding: 12px 16px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-secondary);">
              <strong>🔒 Diretriz de Governança & Retenção:</strong> ${model.privacy.notes}
            </div>
          ` : ''}
          ${model.sources && typeof DATA_SOURCES !== 'undefined' ? `
            <div style="margin-top: 20px;">
              <h4 style="margin-bottom: 8px;">📚 Fontes Primárias e Rastreabilidade do Dossiê:</h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${model.sources.map(sId => {
                  const s = DATA_SOURCES[sId];
                  if (!s) return '';
                  return `
                    <div style="padding: 10px 14px; background: var(--bg-surface-dim); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.83rem;">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="color: var(--accent-cyan);">${s.title}</strong>
                        <span class="badge-tag ${s.sourceType === 'official' ? 'badge-warning' : 'badge-frontier'}">${s.sourceType.toUpperCase()}</span>
                      </div>
                      <div style="color: var(--text-muted); font-size: 0.78rem; margin: 4px 0;">Publicador: ${s.publisher} • Data: ${s.publishedAt} • Acessado: ${s.retrievedAt}</div>
                      <div style="color: var(--text-secondary);">${s.notes}</div>
                      <a href="${s.sourceUrl}" target="_blank" rel="noopener" style="font-size: 0.78rem; color: var(--accent-blue); text-decoration: underline; margin-top: 4px; display: inline-block;">Consultar fonte oficial ↗</a>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
          ${model.previewHistory ? `
            <div style="margin-top: 14px; padding: 14px; background: rgba(234, 179, 8, 0.08); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: var(--radius-md); font-size: 0.85rem;">
              <h5 style="color: #facc15; margin-bottom: 6px;">ℹ️ Histórico de Governança & Revelação de Identidade (${model.previewHistory.alias} → ${model.name})</h5>
              <p style="color: var(--text-secondary); margin-bottom: 8px;">
                Este modelo foi testado em sigilo no OpenRouter (<code>stealth/ox-alpha</code>) e OpenCode (<code>opencode-go/ox-alpha-free</code>) entre 20/08 e 26/08/2026. A Z.ai revelou formalmente sua identidade como <strong>GLM-5.3-Flash</strong> em 26/08/2026, encerrando os termos provisórios do programa stealth.
              </p>
              <p style="color: var(--text-secondary); margin: 0;">
                🔒 <strong>Diretriz de Produção:</strong> Os endpoints de preview foram descontinuados. Em produção, utilize a rota oficial da Z.ai API (<code>glm-5.3-flash</code>) com garantia de ZDR empresarial ou o endpoint canônico do OpenRouter (<code>z-ai/glm-5.3-flash</code>).
              </p>
            </div>
          ` : ''}
        </div>

      </div>
    `;

    // Interatividade das Sub-Abas do Dossiê
    const subtabsNav = container.querySelector('.dossier-subtabs-nav');
    if (subtabsNav) {
      subtabsNav.addEventListener('click', (e) => {
        if (e.target.classList.contains('subtab-btn')) {
          subtabsNav.querySelectorAll('.subtab-btn').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          const targetTabId = e.target.getAttribute('data-tab');
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
    const s1 = document.getElementById('compSelect1');
    const s2 = document.getElementById('compSelect2');
    const s3 = document.getElementById('compSelect3');
    const s4 = document.getElementById('compSelect4');
    const table = document.getElementById('comparatorMainTable');

    if (!s1 || !s2 || !table) return;

    if (AppState.comparatorModels.filter(Boolean).length < 2) {
      AppState.comparatorModels = ['grok-4-6', 'gpt-5-6-sol', '', ''];
    }

    const models = Object.values(AI_MODELS_DATA);

    [s1, s2, s3, s4].forEach((sel, idx) => {
      const currentVal = AppState.comparatorModels[idx] || '';
      sel.innerHTML = (idx >= 2 ? '<option value="">-- Nenhum --</option>' : '') + models.map(m => `
        <option value="${m.id}" ${m.id === currentVal ? 'selected' : ''}>${m.name} (${m.providerName})</option>
      `).join('');

      sel.onchange = () => {
        AppState.comparatorModels[idx] = sel.value;
        const validModels = AppState.comparatorModels.filter(Boolean);
        if (history.replaceState) {
          history.replaceState(null, '', `#comparator?models=${validModels.join(',')}`);
        }
        renderComparatorTable();
      };
    });

    renderComparatorTable();

    const shareBtn = document.getElementById('btnShareComparison');
    if (shareBtn) {
      shareBtn.onclick = () => {
        const url = `${window.location.origin}${window.location.pathname}#comparator?models=${AppState.comparatorModels.filter(Boolean).join(',')}`;
        copyTextToClipboard(url);
        showToast('🔗 Link da comparação copiado com sucesso!');
      };
    }
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
        ${rows.map(r => `
          <tr>
            <td><strong>${r.label}</strong></td>
            ${models.map(m => `<td>${r.get(m)}</td>`).join('')}
          </tr>
        `).join('')}
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

    if (!rec || !rec.primaryModelName) {
      panel.innerHTML = `
        <div style="text-align: center; padding: 28px 16px; color: var(--text-muted);">
          🔍 Nenhuma recomendação exata encontrada para esses critérios. Tente flexibilizar o orçamento ou privacidade.
        </div>
      `;
      return;
    }

    panel.innerHTML = `
      <h3 style="color: var(--accent-cyan); margin-bottom: 8px;">🎯 Modelo Recomendado: ${rec.primaryModelName}</h3>
      <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 16px;">${rec.rationale}</p>
      
      <div class="specs-grid">
        <div class="spec-item-card"><div class="spec-label">Agente de Planejamento (Planner)</div><div class="spec-value">${rec.planner}</div></div>
        <div class="spec-item-card"><div class="spec-label">Agente Executor de Código</div><div class="spec-value">${rec.executor}</div></div>
        <div class="spec-item-card"><div class="spec-label">Agente Revisor (Reviewer)</div><div class="spec-value">${rec.reviewer}</div></div>
        <div class="spec-item-card"><div class="spec-label">Cascata de Fallback</div><div class="spec-value">${rec.fallbackCascade.join(' ➔ ')}</div></div>
      </div>
      
      <div style="margin-top: 16px;">
        <button class="btn-primary" onclick="location.hash='#model/${rec.primaryModelId}'">📄 Abrir Dossiê do Modelo Escolhido</button>
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

    // Tabela completa de modelAccess
    const modelsRows = (plan.modelAccess || []).map(m => {
      const badge = PlanExplorer.PLAN_UI_CONFIG.accessBadges[m.billingMode] || { label: m.billingMode, class: 'badge-frontier' };
      return `
        <tr>
          <td><strong style="color: var(--text-primary);">${m.modelId}</strong></td>
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
        container.innerHTML = MODEL_HISTORY_DATA.lineages.map(lin => `
          <div class="lineage-family-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <h3 style="color: var(--accent-cyan); margin-bottom: 4px;">${lin.familyName}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">${lin.description}</p>
              </div>
            </div>

            <div class="lineage-flow">
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

            ${(lin.connections || []).length > 0 ? `
              <div style="margin-top: 14px; font-size: 0.82rem; color: var(--text-muted);">
                <strong>Evoluções registradas:</strong>
                <ul style="margin-top: 4px; padding-left: 18px; color: var(--text-secondary);">
                  ${lin.connections.map(c => `<li><strong>${c.from} ➔ ${c.to}:</strong> ${c.improvements}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        `).join('');
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
        <button class="use-case-chip ${uc.id === AppState.activeUseCaseId ? 'active' : ''}" data-uc-id="${uc.id}">
          <span>${uc.icon}</span> ${uc.title}
        </button>
      `).join('');
    }

    const activeCase = USE_CASE_COMPARISON_DATA.useCases.find(uc => uc.id === AppState.activeUseCaseId) || USE_CASE_COMPARISON_DATA.useCases[0];
    const contentContainer = document.getElementById('useCaseActiveContent');
    if (contentContainer && activeCase) {
      contentContainer.innerHTML = `
        <div class="content-box" style="margin-bottom: 24px;">
          <div class="box-header">
            <div>
              <h3>${activeCase.icon} ${activeCase.title}</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">${activeCase.description}</p>
            </div>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
            <span style="font-size: 0.78rem; color: var(--text-muted); align-self: center;">Atributos críticos avaliados:</span>
            ${activeCase.keyAttributes.map(a => `<span class="badge-tag badge-frontier" style="font-size: 0.74rem;">${a}</span>`).join('')}
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 50px;">Rank</th>
                  <th>Modelo</th>
                  <th>Fit Score (Calibrado)</th>
                  <th>Papel Ideal no Projeto</th>
                  <th>Justificativa Técnica & Evidências</th>
                  <th style="width: 90px;">Ações</th>
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
                      <button class="btn-table-action" onclick="location.hash='#model/${r.modelId}'" title="Ver Dossiê">
                        🔍 Dossiê
                      </button>
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

    content.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
        <span class="model-color-dot" style="background-color: ${model.color}; width: 14px; height: 14px;"></span>
        <strong>${model.providerName}</strong> • <span style="color: var(--text-muted);">${model.architectureType}</span>
      </div>

      <div class="model-badges-list" style="margin-bottom: 14px;">
        ${(model.badges || []).map(b => `<span class="badge-tag badge-frontier">${b}</span>`).join('')}
      </div>

      <div class="specs-grid" style="grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
        <div class="spec-item-card"><div class="spec-label">Contexto</div><div class="spec-value">${(model.contextWindow / 1000).toFixed(0)}k</div></div>
        <div class="spec-item-card"><div class="spec-label">Output Máx</div><div class="spec-value">${(model.maxOutputTokens || 16384).toLocaleString()}</div></div>
        <div class="spec-item-card"><div class="spec-label">Input / M</div><div class="spec-value">$${model.pricing.standard.input.toFixed(2)}</div></div>
        <div class="spec-item-card"><div class="spec-label">Output / M</div><div class="spec-value">$${model.pricing.standard.output.toFixed(2)}</div></div>
        ${model.relativeLatency ? `<div class="spec-item-card" style="grid-column: span 2;"><div class="spec-label">Latência</div><div class="spec-value highlight-cyan">${model.relativeLatency}</div></div>` : ''}
      </div>

      <h4 style="font-size: 0.85rem; margin-bottom: 6px;">Destaques:</h4>
      <ul style="padding-left: 18px; font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 16px;">
        ${(model.strengths || []).map(s => `<li>${s}</li>`).join('')}
      </ul>

      <div style="background: var(--bg-surface-dim); border: 1px solid var(--border-accent); padding: 10px; border-radius: var(--radius-md); font-size: 0.8rem; color: var(--accent-cyan);">
        💡 <strong>Sweet Spot:</strong> ${model.sweetSpot || 'Configuração Padrão'}
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
            icon: iconSpan,
            title: m.name,
            subtitle: `${m.providerName} • ${(m.contextWindow / 1000).toFixed(0)}k ctx • ${m.openWeights ? 'Local (Grátis)' : `$${m.pricing.standard.input.toFixed(2)}/$${m.pricing.standard.output.toFixed(2)}`} • ${(m.badges || []).slice(0, 2).join(' | ')}`,
            action: () => { location.hash = `#model/${m.id}`; }
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
            icon: iconSpan,
            title: p.name,
            subtitle: `${p.country} • ${p.description.substring(0, 70)}...`,
            action: () => { 
              AppState.dashboardSearchQuery = p.id;
              location.hash = '#dashboard';
              renderDashboardTable();
            }
          });
        }
      });
    }

    if (AppState.commandPaletteFilter === 'all' || AppState.commandPaletteFilter === 'hardware') {
      Object.values(HARDWARE_GPU_DATABASE).forEach(g => {
        const gSearch = `${g.id} ${g.name} ${g.vramGb}gb ${g.tdpWatts}w`.toLowerCase();
        if (!query || gSearch.includes(query)) {
          items.push({
            icon: '<span class="model-brand-icon" style="color: #76b900;"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v12H4z"/></svg></span>',
            title: g.name,
            subtitle: `${g.vramGb} GB VRAM • TDP ${g.tdpWatts}W`,
            action: () => { location.hash = '#calculator'; }
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
              <div class="item-title">${item.title}</div>
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
    }
  };

  if (typeof window !== 'undefined') {
    window.copyTextToClipboard = copyTextToClipboard;
    window.showToast = showToast;
  }

})();
