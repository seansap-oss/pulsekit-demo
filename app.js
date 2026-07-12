let state = {
  thangmeiband: { name: "Thangmeiband AC", count: 25 },
  uripok: { name: "Uripok AC", count: 20 },
  current: "thangmeiband", multiplier: 3, totalSpent: 5000,
  logistics: 3200, food: 1800
};

function switchAC(ac) { 
  state.current = ac; 
  render(); 
}

function render() {
  document.getElementById('brand-title').innerText = state[state.current].name + " Pulse";
  document.getElementById('scope-text').innerText = state[state.current].name + " Operational Heatmap Viewport";
  const grid = document.getElementById('ward-grid-container'); 
  grid.innerHTML = '';
  
  for(let i=1; i<=state[state.current].count; i++) {
    let pct = i === 3 && state.current === 'thangmeiband' ? Math.round((310/500)*100) : Math.floor(Math.random() * 50) + 35;
    let badge = pct >= 50 ? '?? COHESIVE' : '?? ALERT';
    grid.innerHTML += `<div class="bg-slate-900 p-3 rounded border border-slate-800 flex justify-between"><div>Ward ${i}<br><span class="font-bold">${pct}%</span></div><div class="text-[9px]">${badge}</div></div>`;
  }
}

function agree(type, btn) {
  document.getElementById('water-count').innerText = parseInt(document.getElementById('water-count').innerText) + state.multiplier;
  btn.disabled = true; 
  btn.innerText = "? LOGGED"; 
  log(`Voter logged consensus reflecting full household count (+${state.multiplier}).`);
}

function addFamily() {
  let name = document.getElementById('new-name').value; 
  if(!name) return;
  state.multiplier++; 
  document.getElementById('house-count').innerText = state.multiplier + " Members";
  log(`Agent Tomba onboarded new voter cluster relative: ${name}`); 
  document.getElementById('new-name').value = '';
}

function fileExpense() {
  let amt = parseFloat(document.getElementById('exp-amt').value); 
  if(!amt) return;
  state.logistics += amt; 
  document.getElementById('spent-logistics').innerText = "?" + state.logistics.toLocaleString();
  log(`Agent Tomba recorded field expense allocation layer update: ?${amt}`); 
  document.getElementById('exp-amt').value = '';
}

function log(msg) {
  document.getElementById('telemetry-stream').innerHTML = `<div>[${new Date().toLocaleTimeString()}] - ${msg}</div>` + document.getElementById('telemetry-stream').innerHTML;
}

render();
