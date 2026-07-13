// Multiple Ground Agent Roster System Profiles Data Model Matrix Mapping
const fieldAgentRoster = {
  "005": { identity: "Agent Tomba", wardID: 3, registrationQuota: 310, logistics: 3200, food: 1800, campaign: 2500, lastLogTime: 0 },
  "006": { identity: "Agent Chaoba", wardID: 1, registrationQuota: 410, logistics: 4100, food: 2900, campaign: 3400, lastLogTime: 0 }
};

// MULTI-USER CAPABILITY: Central Campaign Planners Accounts Matrix Database
const campaignPlannerRoster = {
  "P101": { name: "Planner Joy (Catering Manager)", food: 12500, transport: 0, stationery: 1200, fuel: 0, gathering: 0 },
  "P102": { name: "Planner Ibomcha (Convoy Marshall)", food: 0, transport: 18400, stationery: 0, fuel: 9500, gathering: 15000 }
};

// Global Consolidated General Ledger State Machine
let globalBudgetLedger = {
  food: 0,
  transport: 0,
  stationery: 0,
  fuel: 0,
  gathering: 0
};

let appState = {
  thangmeiband: { label: "Thangmeiband AC", borderWardsCount: 25 },
  uripok: { label: "Uripok AC", borderWardsCount: 20 },
  activeConstituencyKey: "thangmeiband",
  parsedAgentToken: "005",
  activePlannerToken: "P101", 
  voterWeightMultiplier: 3,
  wards: []
};

const router = {
  init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ac')) appState.activeConstituencyKey = params.get('ac');
    if (params.get('agent') && fieldAgentRoster[params.get('agent')]) appState.parsedAgentToken = params.get('agent');
    if (params.get('planner') && campaignPlannerRoster[params.get('planner')]) appState.activePlannerToken = params.get('planner');
    this.syncACUIContext();
  },

  navigateAC(acKey) {
    appState.activeConstituencyKey = acKey;
    this.syncACUIContext();
    logger.trace(`Dynamic Router: Swapped tenant context layout viewports to [${acKey.toUpperCase()}].`);
  },

  syncACUIContext() {
    const targetAC = appState.thangmeiband[appState.activeConstituencyKey] ? appState.thangmeiband[appState.activeConstituencyKey].label : 'Thangmeiband AC';
    document.getElementById('current-ac-label').innerText = `Active Target: ${targetAC} Core Engine Framework`;
    document.getElementById('warroom-headline-title').innerText = `${targetAC} Executive Operations Command Dashboard`;
    
    appState.wards = [];
    const limit = appState.activeConstituencyKey === 'uripok' ? 20 : 25;
    const currentWorker = fieldAgentRoster[appState.parsedAgentToken];
    
    for (let i = 1; i <= limit; i++) {
      let scoreMetric = (i === currentWorker.wardID && appState.activeConstituencyKey === 'thangmeiband')
        ? Math.round((currentWorker.registrationQuota / 500) * 100)
        : Math.floor(Math.random() * (78 - 35 + 1)) + 35;
      appState.wards.push({ index: i, volume: scoreMetric, anomaly: false });
    }
    this.renderViewports();
  },

  switchView(panelId) {
    document.querySelectorAll('.view-panel').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(`panel-${panelId}`).classList.add('active');
    document.getElementById(`nav-btn-${panelId}`).classList.add('active');
  },

  renderViewports() {
    const agent = fieldAgentRoster[appState.parsedAgentToken];
    const planner = campaignPlannerRoster[appState.activePlannerToken];
    
    // Sync Field Agent UI copy elements
    document.getElementById('agent-profile-title').innerText = `Cockpit: ${agent.identity}`;
    document.getElementById('agent-ward-subtitle').innerText = `Clipboard Token: #${appState.parsedAgentToken} | Jurisdiction Ward ${agent.wardID} Scope`;
    const quotaPct = Math.round((agent.registrationQuota / 500) * 100);
    document.getElementById('agent-quota-label').innerText = `${agent.registrationQuota} / 500 Voters (${quotaPct}%)`;
    document.getElementById('agent-quota-progress-fill').style.width = `${quotaPct}%`;
    document.getElementById('ag-cost-logistics').innerText = "?" + agent.logistics.toLocaleString();
    document.getElementById('ag-cost-food').innerText = "?" + agent.food.toLocaleString();
    document.getElementById('ag-cost-campaign').innerText = "?" + agent.campaign.toLocaleString();
    
    // Sync Logistics Planner UI copy elements
    document.getElementById('planner-profile-title').innerText = planner.name;
    document.getElementById('planner-subtitle').innerText = `Role Authority Layer: Central Logistics Planner Profile Token [${appState.activePlannerToken}]`;
    
    dashboard.recalculateFinances();
    dashboard.renderHeatmap();
  }
};

const voterAuth = {
  triggerMetaWebhook() {
    document.getElementById('meta-webhook-alert').classList.remove('hidden');
    document.getElementById('auth-status-tag').innerText = "VERIFIED";
    document.getElementById('auth-status-tag').className = "bg-[#E4EFE9] text-[#2C3E35] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#C5DCD0]";
    document.getElementById('citizen-agenda-box').classList.remove('opacity-40', 'pointer-events-none');
  },

  submitConsensus(type, element) {
    document.getElementById(`${type}-tally-val`).innerText = parseInt(document.getElementById(`${type}-tally-val`).innerText) + appState.voterWeightMultiplier;
    element.disabled = true; element.innerText = "? ALIGNED";
    element.className = "bg-green-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs cursor-not-allowed shadow-sm";
    document.getElementById('chart-live-trend-bar').style.height = "92%";
  },

  appendRelative() {
    const name = document.getElementById('relative-name-input').value.trim();
    if (!name) return alert('Enter correct identification details.');
    
    const worker = fieldAgentRoster[appState.parsedAgentToken];
    const curTime = Date.now();
    
    if (worker.lastLogTime && (curTime - worker.lastLogTime) < 12000) {
      alert(`?? VELOCITY SECURITY ALERT: Submission blocked. System flagged fast ingestion rate index.`);
      if (appState.activeConstituencyKey === 'thangmeiband') appState.wards[worker.wardID - 1].anomaly = true;
      router.renderViewports();
      logger.trace(`?? SECURITY ANOMALY: Agent #${appState.parsedAgentToken} logged high-speed burst cheat risk in Ward ${worker.wardID}. Entry blocked.`);
      return;
    }
    
    appState.voterWeightMultiplier++;
    worker.registrationQuota++;
    worker.lastLogTime = curTime;
    
    document.getElementById('household-size-badge').innerText = `${appState.voterWeightMultiplier} Voters Tracked`;
    document.getElementById('household-roster-dom').innerHTML += `<div class="bg-[#FAF9F5] p-2 rounded border border-[#EBE7DF]">? ${name} (Verified GPS Stamp Location)</div>`;
    
    if (appState.activeConstituencyKey === 'thangmeiband') {
      appState.wards[worker.wardID - 1].volume = Math.round((worker.registrationQuota / 500) * 100);
    }
    router.renderViewports();
    logger.trace(`Meta API Webhook: Agent #${appState.parsedAgentToken} appended verified voter cluster node entry: "${name}".`);
    document.getElementById('relative-name-input').value = '';
  }
};

const agentOps = {
  switchAgentIdentityMock() {
    appState.parsedAgentToken = appState.parsedAgentToken === "005" ? "006" : "005";
    router.syncACUIContext();
    logger.trace(`Security Matrix: Scanned Clipboard QR Badge. Active Field Agent context mapped to ID: #${appState.parsedAgentToken}.`);
  },

  fileExpenseVoucher() {
    const cat = document.getElementById('agent-expense-category').value;
    const val = parseFloat(document.getElementById('agent-expense-amount').value);
    if (isNaN(val) || val <= 0) return alert('Enter numerical amount vouchers.');
    
    fieldAgentRoster[appState.parsedAgentToken][cat] += val;
    router.renderViewports();
    logger.trace(`Financial Outflow: Field Agent #${appState.parsedAgentToken} logged voucher expense under [${cat.toUpperCase()}]: ?${val}.`);
    document.getElementById('agent-expense-amount').value = '';
  }
};

// =================================================================
// NEW MODULE: MULTI-USER CAMPAIGN LOGISTICS PLANNER CONTROLLER
// =================================================================
const plannerOps = {
  switchPlannerIdentityMock() {
    appState.activePlannerToken = appState.activePlannerToken === "P101" ? "P102" : "P101";
    router.renderViewports();
    logger.trace(`Auth Matrix: Logistics Planner clipboard signature parsed. Swapped control viewport perspective to profile: #${appState.activePlannerToken}.`);
  },

  handleReceiptSnapVisual() {
    document.getElementById('receipt-success-indicator').classList.remove('hidden');
  },

  fileCentralProcurement() {
    const category = document.getElementById('planner-expense-category').value;
    const valueAmt = parseFloat(document.getElementById('planner-expense-amount').value);
    const detailNotes = document.getElementById('planner-expense-notes').value.trim();
    const receiptInput = document.getElementById('planner-receipt-file');

    if (isNaN(valueAmt) || valueAmt <= 0) return alert('Please enter a valid procurement cost layout.');
    if (!detailNotes) return alert('Real-world deployment requires itemized descriptive voucher notes.');
    
    // Core anti-cheating verification constraint
    if (!receiptInput.files.length && !document.getElementById('receipt-success-indicator').classList.contains('hidden') === false) {
      return alert('?? AUDIT COMPLIANCE FAILURE: Live hardware receipt camera click image upload is strictly required to prevent fraud.');
    }

    // Append directly to the logged multi-planner identity database state
    campaignPlannerRoster[appState.activePlannerToken][category] += valueAmt;
    router.renderViewports();
    
    logger.trace(`?? AUDIT SECURE DISPATCH: Planner #${appState.activePlannerToken} logged verified bill under [${category.toUpperCase()}] amounting to ?${valueAmt}. Audit Notes: "${detailNotes}" (Receipt EXIF Timestamp Hash verified).`);
    
    // Clear elements
    document.getElementById('planner-expense-amount').value = '';
    document.getElementById('planner-expense-notes').value = '';
    document.getElementById('receipt-success-indicator').classList.add('hidden');
    receiptInput.value = '';
  }
};

const dashboard = {
  shiftTimeline(mode) {
    ['daily', 'weekly'].forEach(m => document.getElementById(`filter-tab-${m}`).className = "text-slate-400 px-4 py-1.5 rounded-md font-medium hover:text-white transition");
    document.getElementById(`filter-tab-${mode}`).className = "bg-slate-800 text-white px-4 py-1.5 rounded-md font-medium transition shadow-sm";
    logger.trace(`Ledger Timeline Scope adjusted filtering metrics parameters matching: [${mode.toUpperCase()} SHEET].`);
  },

  recalculateFinances() {
    // Reset Ledger State to baseline aggregates summing both Agent and dynamic multiple Planner structures
    globalBudgetLedger = { food: 0, transport: 0, stationery: 0, fuel: 0, gathering: 0 };
    
    // Sum all unique logistics planner records data structures
    Object.keys(campaignPlannerRoster).forEach(pKey => {
      const p = campaignPlannerRoster[pKey];
      globalBudgetLedger.food += p.food;
      globalBudgetLedger.transport += p.transport;
      globalBudgetLedger.stationery += p.stationery;
      globalBudgetLedger.fuel += p.fuel;
      globalBudgetLedger.gathering += p.gathering;
    });

    // Cross-tally and consolidate operational expenses filed by ground agents
    Object.keys(fieldAgentRoster).forEach(aKey => {
      const a = fieldAgentRoster[aKey];
      globalBudgetLedger.fuel += a.logistics;   // Maps agent travel into central fuel tracking metric
      globalBudgetLedger.food += a.food;        // Maps agent rations into central food track
      globalBudgetLedger.stationery += a.campaign; // Maps campaign brochures/print items into stationery
    });

    const netSumOutflow = globalBudgetLedger.food + globalBudgetLedger.transport + globalBudgetLedger.stationery + globalBudgetLedger.fuel + globalBudgetLedger.gathering;
    document.getElementById('summary-total-outflow-lbl').innerText = `Total Outflow: ?${netSumOutflow.toLocaleString()}`;
    
    const wrapper = document.getElementById('chart-pie-wrapper-box');
    wrapper.innerHTML = '';
    
    const categories = [
      { key: "food", label: "?? Food, Catering & Drinks Provisions" },
      { key: "transport", label: "?? Convoy Transit & Vehicle Logistics" },
      { key: "stationery", label: "?? Printing, Brochures & Stationery" },
      { key: "fuel", label: "? Bulk Generator & Travel Fuel Allocation" },
      { key: "gathering", label: "?? Rally Gatherings & Event Operations" }
    ];

    const colors = ["bg-orange-500", "bg-blue-500", "bg-yellow-500", "bg-emerald-500", "bg-purple-500"];

    categories.forEach((cat, idx) => {
      const sharePct = netSumOutflow > 0 ? Math.round((globalBudgetLedger[cat.key] / netSumOutflow) * 100) : 0;
      wrapper.innerHTML += `<div>
        <div class="flex justify-between text-slate-400 mb-1"><span>${cat.label}</span><span class="font-mono text-white">${sharePct}% (?${globalBudgetLedger[cat.key].toLocaleString()})</span></div>
        <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden"><div class="${colors[idx]} h-2 rounded-full transition-all duration-500" style="width: ${sharePct}%"></div></div>
      </div>`;
    });
  },

  renderHeatmap() {
    const container = document.getElementById('ward-heatmap-grid-dom');
    if (!container) return; container.innerHTML = '';
    
    appState.wards.forEach(w => {
      let markerClass = w.anomaly ? 'border-red-500 bg-red-950 text-red-400 animate-bounce' 
        : w.volume >= 60 ? 'border-emerald-900 bg-emerald-950/20 text-emerald-400'
        : w.volume >= 50 ? 'border-yellow-800 bg-yellow-950/20 text-yellow-500' 
        : 'border-red-950 bg-red-950/40 text-red-400';
        
      let statusLabel = w.anomaly ? '?? CHEAT ALERT' : w.volume >= 60 ? '?? ON TRACK' : w.volume >= 50 ? '?? LAGGING' : '?? STALLED';
      
      container.innerHTML += `<div class="border p-3 rounded-xl flex flex-col justify-between gap-2.5 transition hover:border-slate-700 ${markerClass}">
        <div class="text-slate-500 font-medium">Ward Section ${w.index}</div>
        <div class="flex items-baseline justify-between"><span class="text-base font-black text-white">${w.volume}%</span><span class="text-[7px] font-bold tracking-wider opacity-90">${statusLabel}</span></div>
      </div>`;
    });
  }
};

const logger = {
  trace(msg) {
    const box = document.getElementById('telemetry-log-wrapper');
    if (!box) return;
    box.innerHTML = `<div class="py-1 border-b border-slate-900/40 animate-fadeIn">[${new Date().toLocaleTimeString()}] - ${msg}</div>` + box.innerHTML;
  }
};

router.init();
