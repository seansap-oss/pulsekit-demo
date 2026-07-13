let state = {
  thangmeiband: { name: "Thangmeiband AC", count: 25 },
  uripok: { name: "Uripok AC", count: 20 },
  current: "thangmeiband", multiplier: 3, totalSpent: 5000,
  logistics: 3200, food: 1800, voters: 2100
};

function switchAC(ac) { 
  state.current = ac; 
  render(); 
  log(`Switched tracking viewport perspective context natively to [${state[ac].name.toUpperCase()}].`);
}

function requestOTP() {
  const phone = document.getElementById('voter-phone').value;
  if(!phone || phone.length < 10) return alert('Enter a valid mobile registry handshake target.');
  document.getElementById('otp-verify-box').classList.remove('hidden');
  alert(`[WhatsApp API Match Success]: Token link routed to phone registry channel.`);
  log(`Dispatched WhatsApp secure one-time cryptographic trace handshake allocation to: ${phone}`);
}

function verifyVoterToken() {
  document.getElementById('agenda-wrapper').classList.remove('opacity-50', 'pointer-events-none');
  alert('Authentication gate passed. Security authorization variables verified.');
  log('Voter ????? Kumar validated registry record constraints via WhatsApp token check loop.');
}

function render() {
  document.getElementById('brand-title').innerText = state[state.current].name + " Engine Portal";
  document.getElementById('scope-text').innerText = state[state.current].name + " Master Configuration Dashboard Analytics";
  
  const grid = document.getElementById('ward-grid-container'); 
  grid.innerHTML = '';
  
  for(let i=1; i<=state[state.current].count; i++) {
    let pct = i === 3 && state.current === 'thangmeiband' ? Math.round((310/500)*100) : Math.floor(Math.random() * 45) + 40;
    let badge = pct >= 60 ? '?? COHESIVE' : pct >= 50 ? '?? LAGGING' : '?? ALERT';
    let border = pct < 50 ? 'border-red-900/40 bg-red-950/20' : 'border-slate-800 bg-slate-900';
    grid.innerHTML += `<div class="${border} p-3 rounded-xl flex flex-col justify-between gap-2 transition hover:border-slate-700">
      <div class="text-slate-400 font-medium">Ward Block ${i}</div>
      <div class="flex items-baseline justify-between"><span class="text-base font-bold text-white">${pct}%</span><span class="text-[8px] font-bold tracking-wider">${badge}</span></div>
    </div>`;
  }
  calculateMetrics();
}

function agree(type, btn) {
  const countEl = document.getElementById(`${type}-count`);
  countEl.innerText = parseInt(countEl.innerText) + state.multiplier;
  state.voters += state.multiplier;
  document.getElementById('master-total-voters').innerText = state.voters;
  
  btn.disabled = true; 
  btn.innerText = "? ALIGNED";
  btn.className = "bg-green-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium cursor-not-allowed";
  
  // Animate dynamic trend charts bar scale
  document.getElementById('trend-live-bar').style.height = "95%";
  log(`Consensus registered on [${type.toUpperCase()}] matrix configuration. Appended +${state.multiplier} global weights.`);
}

function addFamily() {
  let name = document.getElementById('new-name').value.trim(); 
  if(!name) return;
  state.multiplier++; 
  document.getElementById('house-count').innerText = state.multiplier + " Members";
  
  const container = document.getElementById('family-roster-list');
  container.innerHTML += `<div class="bg-[#FAF9F6] p-2 rounded border border-slate-100 flex justify-between animate-fadeIn"><span>? ${name}</span><span class="text-slate-400">Added Live</span></div>`;
  
  log(`Roster ingestion tracking update: Appended dependency node relationship: ${name}`);
  document.getElementById('new-name').value = '';
}

function fileExpense() {
  let amt = parseFloat(document.getElementById('exp-amt').value); 
  if(!amt || isNaN(amt)) return;
  
  state.logistics += amt; 
  renderExpenseUI();
  log(`Account ledger filed record entry: Added logistics pipeline travel disbursement layer tracking element: ?${amt}`);
  document.getElementById('exp-amt').value = '';
}

function renderExpenseUI() {
  document.getElementById('spent-logistics').innerText = "?" + state.logistics.toLocaleString();
  const sum = state.logistics + state.food;
  document.getElementById('master-total-spent').innerText = "?" + sum.toLocaleString();
  calculateMetrics();
}

function calculateMetrics() {
  const total = state.logistics + state.food;
  const logPct = Math.round((state.logistics / total) * 100);
  const foodPct = 100 - logPct;
  
  document.getElementById('pct-logistics').innerText = logPct + "%";
  document.getElementById('bar-logistics').style.width = logPct + "%";
  document.getElementById('pct-food').innerText = foodPct + "%";
  document.getElementById('bar-food').style.width = foodPct + "%";
}

function captureMedia(mediaType) {
  const text = document.getElementById('incident-comment').value.trim();
  log(`CRITICAL BINARY DISPATCH - Ward 3: Uploaded raw telemetry file data buffer link mapping matching context: "${text || 'No comment provided'}"`);
  alert(`[S3 Storage Bridge Pipeline Success]: Captured ${mediaType} file stream allocation maps directly onto War Room Ledger Track.`);
  document.getElementById('incident-comment').value = '';
}

function log(msg) {
  const stream = document.getElementById('telemetry-stream');
  stream.innerHTML = `<div class="py-1 border-b border-slate-900 animate-fadeIn">[${new Date().toLocaleTimeString()}] - ${msg}</div>` + stream.innerHTML;
}

render();
renderExpenseUI();
