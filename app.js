// Master Static Database Registry Blueprint Representing Core Operational Entities
const enterpriseRoster = {
  "005": { identity: "Agent Tomba", wardID: 3, registrationQuota: 310, logistics: 3200, food: 1800, campaign: 2500 },
  "006": { identity: "Agent Chaoba", wardID: 1, registrationQuota: 410, logistics: 4100, food: 2900, campaign: 3400 }
};

let appState = {
  thangmeiband: { label: "Thangmeiband AC", borderWardsCount: 25 },
  uripok: { label: "Uripok AC", borderWardsCount: 20 },
  activeConstituencyKey: "thangmeiband",
  parsedAgentToken: "005", 
  timelineWindowFilter: "daily",
  voterWeightMultiplier: 3
};

// =================================================================
// PIPELINE ROUTER MODULE (FLOWCHART LOGIC COMPLIANCE)
// =================================================================
const router = {
  init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ac')) appState.activeConstituencyKey = params.get('ac');
    if (params.get('agent') && enterpriseRoster[params.get('agent')]) {
      appState.parsedAgentToken = params.get('agent');
    }
    this.syncACUIContext();
  },

  navigateAC(acKey) {
    appState.activeConstituencyKey = acKey;
    this.syncACUIContext();
    logger.trace(`Dynamic Router: Swapped tenant runtime context interface layers map to [${acKey.toUpperCase()}].`);
  },

  syncACUIContext() {
    const targetAC = appState.thangmeiband[appState.activeConstituencyKey] 
      ? appState.thangmeiband[appState.activeConstituencyKey].label 
      : (appState.activeConstituencyKey === 'uripok' ? 'Uripok AC' : 'Thangmeiband AC');
      
    document.getElementById('current-ac-label').innerText = `Active Target: ${targetAC} Core Engine Framework`;
    document.getElementById('warroom-headline-title').innerText = `${targetAC} Executive Commander Operations`;
    
    // Seed and compute the specific ward layout density metrics natively
    appState.wards = [];
    const limit = appState.activeConstituencyKey === 'uripok' ? 20 : 25;
    const currentWorker = enterpriseRoster[appState.parsedAgentToken];
    
    for (let i = 1; i <= limit; i++) {
      let scoreMetric = (i === currentWorker.wardID && appState.activeConstituencyKey === 'thangmeiband')
        ? Math.round((currentWorker.registrationQuota / 500) * 100)
        : Math.floor(Math.random() * (78 - 35 + 1)) + 35;
      appState.wards.push({ index: i, volume: scoreMetric });
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
    const currentWorker = enterpriseRoster[appState.parsedAgentToken];
    
    // Sync Cockpit Viewport Copy Properties Natively
    document.getElementById('agent-profile-title').innerText = `Cockpit: ${currentWorker.identity}`;
    document.getElementById('agent-ward-subtitle').innerText = `Unique Clipboard Token: #${appState.parsedAgentToken} | Jurisdiction Ward ${currentWorker.wardID} Scope`;
    
    const quotaPct = Math.round((currentWorker.registrationQuota / 500) * 100);
    document.getElementById('agent-quota-label').innerText = `${currentWorker.registrationQuota} / 500 Voters (${quotaPct}%)`;
    document.getElementById('agent-quota-progress-fill').style.width = `${quotaPct}%`;
    
    dashboard.renderHeatmap();
    dashboard.recalculateFinances();
  }
};

// =================================================================
// VOTER AUTH & HANDSHAKE ENGINE (META API WEBHOOK LAYER)
// =================================================================
const voterAuth = {
  triggerMetaWebhook() {
    const num = document.getElementById('voter-phone-input').value.trim();
    if (!num || num.length < 10) return alert('Enter correct mobile structure constraints.');
    
    // Flowchart Compliance Pipeline Connection Hook Trace
    logger.trace(`POST ? Meta Business API Webhook Gateway | Payload Buffer: { InboundIdentity: "${num}", IngestScope: "${appState.activeConstituencyKey}" }`);
    
    document.getElementById('meta-webhook-alert').classList.remove('hidden');
    document.getElementById('auth-status-tag').innerText = "VERIFIED";
    document.getElementById('auth-status-tag').className = "bg-[#E4EFE9] text-[#2C3E35] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#C5DCD0]";
    document.getElementById('citizen-agenda-box').classList.remove('opacity-40', 'pointer-events-none');
    
    alert(`[Meta Hook Callback Handshake Verified]: System generated secure tracking URL mapping.`);
  },

  submitConsensus(type, element) {
    const boost = appState.voterWeightMultiplier;
    const targetVal = document.getElementById(`${type}-tally-val`);
    targetVal.innerText = parseInt(targetVal.innerText) + boost;
    
    element.disabled = true;
    element.innerText = "? ALIGNED";
    element.className = "bg-green-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs cursor-not-allowed shadow-sm";
    
    document.getElementById('chart-live-trend-bar').style.height = "92%";
    logger.trace(`Voter Registry Node logged agreement allocation tracking onto asset token [${type.toUpperCase()}] (+${boost} weights).`);
  },

  appendRelative() {
    const name = document.getElementById('relative-name-input').value.trim();
    if (!name) return alert('Enter correct relative identification names.');
    
    appState.voterWeightMultiplier++;
    enterpriseRoster[appState.parsedAgentToken].registrationQuota++;
    
    document.getElementById('household-size-badge').innerText = `${appState.voterWeightMultiplier} Voters Tracked`;
    
    const listDom = document.getElementById('household-roster-dom');
    listDom.innerHTML += `<div class="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#EBE7DF] flex justify-between items-center animate-fadeIn"><span>? ${name}</span><span class="text-slate-400 text-[11px] font-mono">Appended Link</span></div>`;
    
    const targetPct = Math.round((enterpriseRoster[appState.parsedAgentToken].registrationQuota / 500) * 100);
    if (appState.activeConstituencyKey === 'thangmeiband') {
      appState.wards[enterpriseRoster[appState.parsedAgentToken].wardID - 1].volume = targetPct;
    }
    
    router.renderViewports();
    logger.trace(`Meta Webhook Router: Ingested household sibling structural link item: "${name}". Mapping relationship rows data updates.`);
    document.getElementById('relative-name-input').value = '';
  }
};

// =================================================================
// AGENT COCKPIT COMPILER OPERATIONS (VOUCHERS & STORAGE SUITE)
// =================================================================
const agentOps = {
  triggerQRScannerMock() {
    alert(`[HTML5 Native Device Capture Active]: Opening phone rear camera arrays scanner core layer...`);
    appState.parsedAgentToken = appState.parsedAgentToken === "005" ? "006" : "005";
    router.navigateAC(appState.activeConstituencyKey);
    logger.trace(`QR Authentication Engine: Scanned clipboard identifier token asset badge. Shifted workspace identity context payload to Agent #${appState.parsedAgentToken}.`);
  },

  fileExpenseVoucher() {
    const category = document.getElementById('agent-expense-category').value;
    const costValue = parseFloat(document.getElementById('agent-expense-amount').value);
    if (isNaN(costValue) || costValue <= 0) return alert('Input valid operational expense voucher value constraints.');
    
    enterpriseRoster[appState.parsedAgentToken][category] += costValue;
    router.renderViewports();
    
    logger.trace(`General Ledger: Agent #${appState.parsedAgentToken} pushed financial voucher allocation trace: [${category.toUpperCase()}], value amount: ?${costValue}.`);
    document.getElementById('agent-expense-amount').value = '';
  },

  uploadTelemetryMedia(formatKey) {
    const note = document.getElementById('agent-media-comment').value.trim();
    logger.trace(`S3 Storage Bucket Ingest: Generated file buffer record mapper link for format [${formatKey.toUpperCase()}]. Metadata comments: "${note || 'Empty asset descriptor text'}"`);
    alert(`[S3 Storage Bridge Inbound Sync Success]: Pushed compressed binary media file telemetry streams to candidate matrix dashboard.`);
    document.getElementById('agent-media-comment').value = '';
  }
};

// =================================================================
// CANDIDATE COMMAND EXECUTIVE CHARTS DASHBOARD (4 CHARTS CORE)
// =================================================================
const dashboard = {
  shiftTimeline(modeKey) {
    ['daily', 'weekly'].forEach(m => document.getElementById(`filter-tab-${m}`).className = "text-slate-400 px-4 py-1.5 rounded-md font-medium hover:text-white transition");
    document.getElementById(`filter-tab-${modeKey}`).className = "bg-slate-800 text-white px-4 py-1.5 rounded-md font-medium transition shadow-sm";
    appState.timelineWindowFilter = modeKey;
    logger.trace(`Executive Engine Profile Matrix: Swapped timeline aggregation pipeline filter context to: [${modeKey.toUpperCase()} VIEWPORT].`);
  },

  recalculateFinances() {
    const worker = enterpriseRoster[appState.parsedAgentToken];
    
    // Sync Cockpit financial metrics indicators copy layers
    document.getElementById('ag-cost-logistics').innerText = "?" + worker.logistics.toLocaleString();
    document.getElementById('ag-cost-food').innerText = "?" + worker.food.toLocaleString();
    document.getElementById('ag-cost-campaign').innerText = "?" + worker.campaign.toLocaleString();
    
    // Sync Row Specific targets indices inside the 50-Agent registry grid element layers
    const activeRow = document.getElementById(`row-agent-${appState.parsedAgentToken}`);
    if (activeRow) {
      const cells = activeRow.getElementsByTagName('td');
      cells[2].innerText = `${worker.registrationQuota} / 500`;
      cells[3].innerText = "?" + worker.logistics.toLocaleString();
      cells[4].innerText = "?" + worker.food.toLocaleString();
      cells[5].innerText = "?" + worker.campaign.toLocaleString();
    }
    
    const operationalSum = worker.logistics + worker.food + worker.campaign;
    document.getElementById('summary-total-outflow-lbl').innerText = `Total Outflow: ?${operationalSum.toLocaleString()}`;
    
    const lp = Math.round((worker.logistics / operationalSum) * 100) || 0;
    const fp = Math.round((worker.food / operationalSum) * 100) || 0;
    const cp = 100 - (lp + fp) || 0;
    
    document.getElementById('pie-log-lbl').innerText = lp + "%";
    document.getElementById('pie-log-bar').style.width = lp + "%";
    document.getElementById('pie-food-lbl').innerText = fp + "%";
    document.getElementById('pie-food-bar').style.width = fp + "%";
    document.getElementById('pie-camp-lbl').innerText = cp + "%";
    document.getElementById('pie-camp-bar').style.width = cp + "%";
  },

  renderHeatmap() {
    const container = document.getElementById('ward-heatmap-grid-dom');
    if (!container) return;
    container.innerHTML = '';
    
    appState.wards.forEach(w => {
      let cssMarkerStyles = 'border-slate-900 bg-slate-900/60';
      let captionBadgeStr = '?? ON TRACK';
      
      if (w.volume >= 60) {
        cssMarkerStyles = 'border-emerald-900 bg-emerald-950/20 text-emerald-400';
        captionBadgeStr = '?? ON TRACK';
      } else if (w.volume >= 50) {
        cssMarkerStyles = 'border-yellow-800 bg-yellow-950/20 text-yellow-500';
        captionBadgeStr = '?? LAGGING';
      } else {
        cssMarkerStyles = 'border-red-950 bg-red-950/50 text-red-400 animate-pulse';
        captionBadgeStr = '?? ALERT';
      }
      
      container.innerHTML += `<div class="border p-3 rounded-xl flex flex-col justify-between gap-2.5 transition hover:border-slate-700 ${cssMarkerStyles}">
        <div class="text-slate-500 font-medium">Ward Section ${w.index}</div>
        <div class="flex items-baseline justify-between"><span class="text-base font-black text-white">${w.volume}%</span><span class="text-[7px] font-bold tracking-wider opacity-90">${captionBadgeStr}</span></div>
      </div>`;
    });
  }
};

// =================================================================
// GLOBAL DIAGNOSTIC LOGGER PIPELINE LOGGER
// =================================================================
const logger = {
  trace(messageString) {
    const logsBox = document.getElementById('telemetry-log-wrapper');
    if (!logsBox) return;
    const timestampStr = new Date().toLocaleTimeString();
    logsBox.innerHTML = `<div class="py-1 border-b border-slate-900/40 animate-fadeIn">[${timestampStr}] - ${messageString}</div>` + logsBox.innerHTML;
  }
};

// Start System Runtimes
router.init();
