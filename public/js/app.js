// Embedded image data
const IMGS = {};
for (let i = 1; i <= 50; i++) IMGS['f'+String(i).padStart(2,'0')] = 'images/img_'+String(i).padStart(2,'0')+'.webp';

const FLOWERS = [
  // Orchids
  { id:'f01', name:'白紫兰',          file:IMGS.f01, cat:'orchid'   },
  { id:'f04', name:'绿兰',        file:IMGS.f04, cat:'orchid'   },
  { id:'f07', name:'红兰串',    file:IMGS.f07, cat:'orchid'   },
  { id:'f08', name:'红兰',          file:IMGS.f08, cat:'orchid'   },
  { id:'f16', name:'白兰串',  file:IMGS.f16, cat:'orchid'   },
  { id:'f20', name:'白石斛',    file:IMGS.f20, cat:'orchid'   },
  { id:'f21', name:'橙兰串', file:IMGS.f21, cat:'orchid'   },
  { id:'f22', name:'青绿兰',         file:IMGS.f22, cat:'orchid'   },
  { id:'f23', name:'黄兰',       file:IMGS.f23, cat:'orchid'   },
  { id:'f29', name:'橙兰',       file:IMGS.f29, cat:'orchid'   },
  { id:'f37', name:'黄大花蕙兰',    file:IMGS.f37, cat:'orchid'   },
  { id:'f38', name:'白兰',        file:IMGS.f38, cat:'orchid'   },
  { id:'f46', name:'紫兰',       file:IMGS.f46, cat:'orchid'   },
  // Tropical
  { id:'f02', name:'橙芙蓉',     file:IMGS.f02, cat:'tropical' },
  { id:'f03', name:'黄粉芙蓉',file:IMGS.f03, cat:'tropical' },
  { id:'f06', name:'天堂鸟',    file:IMGS.f06, cat:'tropical' },
  { id:'f09', name:'绿掌',     file:IMGS.f09, cat:'tropical' },
  { id:'f10', name:'粉掌',      file:IMGS.f10, cat:'tropical' },
  { id:'f15', name:'桃掌',     file:IMGS.f15, cat:'tropical' },
  { id:'f17', name:'粉鸡蛋花',       file:IMGS.f17, cat:'tropical' },
  { id:'f18', name:'粉白芙蓉', file:IMGS.f18, cat:'tropical' },
  { id:'f34', name:'红姜花',          file:IMGS.f34, cat:'tropical' },
  { id:'f35', name:'黄芙蓉',     file:IMGS.f35, cat:'tropical' },
  { id:'f40', name:'嘉兰',       file:IMGS.f40, cat:'tropical' },
  { id:'f43', name:'天堂鸟二号',  file:IMGS.f43, cat:'tropical' },
  { id:'f44', name:'赫蕉',           file:IMGS.f44, cat:'tropical' },
  { id:'f49', name:'白鸡蛋花',      file:IMGS.f49, cat:'tropical' },
  // Lilies
  { id:'f05', name:'星空百合',      file:IMGS.f05, cat:'lily'     },
  { id:'f12', name:'白马蹄莲',    file:IMGS.f12, cat:'lily'     },
  { id:'f24', name:'黄百合',         file:IMGS.f24, cat:'lily'     },
  { id:'f25', name:'红橙百合',     file:IMGS.f25, cat:'lily'     },
  { id:'f32', name:'粉百合串',     file:IMGS.f32, cat:'lily'     },
  { id:'f33', name:'黄马蹄莲', file:IMGS.f33, cat:'lily'     },
  { id:'f50', name:'蓝百合',           file:IMGS.f50, cat:'lily'     },
  // Greenery
  { id:'f14', name:'绿绣球',     file:IMGS.f14, cat:'greenery' },
  { id:'f27', name:'千日红叶',          file:IMGS.f27, cat:'greenery' },
  { id:'f36', name:'热带叶',     file:IMGS.f36, cat:'greenery' },
  { id:'f42', name:'芋叶',           file:IMGS.f42, cat:'greenery' },
  { id:'f45', name:'龟背竹',            file:IMGS.f45, cat:'greenery' },
  { id:'f47', name:'满天星',         file:IMGS.f47, cat:'greenery' },
  { id:'f48', name:'海桐',         file:IMGS.f48, cat:'greenery' },
  // Other
  { id:'f11', name:'绿菊', file:IMGS.f11, cat:'other'    },
  { id:'f19', name:'勿忘我',      file:IMGS.f19, cat:'other'    },
  { id:'f26', name:'蓝飞燕草',     file:IMGS.f26, cat:'other'    },
  { id:'f28', name:'橙万寿菊',    file:IMGS.f28, cat:'other'    },
  { id:'f30', name:'紫紫罗兰',        file:IMGS.f30, cat:'other'    },
  { id:'f31', name:'万寿菊簇',    file:IMGS.f31, cat:'other'    },
  { id:'f39', name:'粉剑兰',      file:IMGS.f39, cat:'other'    },
  { id:'f41', name:'红千日红',      file:IMGS.f41, cat:'other'    },
  // Stem
  { id:'f13', name:'花茎',                file:IMGS.f13, cat:'stem'     },
];

const STEM = IMGS.f13;

// ---- Vase library ----
const VASES = [
  { id: 'v00', name: '素瓷', file: 'images/vases/vase_00.webp' },
  { id: 'v01', name: '墨玄', file: 'images/vases/vase_01.webp' },
  { id: 'v02', name: '青霭', file: 'images/vases/vase_02.webp' },
  { id: 'v03', name: '丁香', file: 'images/vases/vase_03.webp' },
  { id: 'v04', name: '霁蓝', file: 'images/vases/vase_04.webp' },
  { id: 'v05', name: '胭脂', file: 'images/vases/vase_05.webp' },
  { id: 'v06', name: '赭石', file: 'images/vases/vase_06.webp' },
];
let vaseId = 'v00';

// ---- Preload all images so shared links load instantly ----
Object.values(IMGS).forEach(src => { const i = new Image(); i.src = src; });
VASES.forEach(v => { const i = new Image(); i.src = v.file; });

// ---- State ----
let placed = [];
let selId  = null;
let zc     = 10;
let cat    = 'all';
let hist   = [];
let dragF  = null;

// ---- Build vase picker ----
(function buildVasePicker() {
  const row = document.getElementById('vaseRow');
  if (!row) return;
  VASES.forEach((v, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'vasesw' + (v.id === vaseId ? ' on' : '');
    btn.dataset.vid = v.id;
    btn.title = v.name;
    btn.setAttribute('aria-label', '花瓶：' + v.name);
    btn.innerHTML = `<img src="${v.file}" alt="${v.name}">`;
    btn.addEventListener('click', () => setVase(v.id));
    row.appendChild(btn);
  });
  const nameEl = document.getElementById('vaseName');
  if (nameEl) nameEl.textContent = VASES.find(v => v.id === vaseId)?.name || '';
})();

// ---- Build palette grid with staggered reveal ----
const fg = document.getElementById('fg');
FLOWERS.forEach((f, i) => {
  const d = document.createElement('div');
  d.className = 'fi';
  d.dataset.fid = f.id;
  d.dataset.cat = f.cat;
  d.draggable = true;
  d.style.animationDelay = (i * 60) + 'ms';
  if (f.id === 'card') {
    d.innerHTML = `<div class="fi-card-preview">留言</div><div class="fi-name">${f.name}</div>`;
  } else {
    d.innerHTML = `<img src="${f.file}" alt="${f.name}"><div class="fi-name">${f.name}</div>`;
  }
  d.addEventListener('dragstart', e => { dragF = f; e.dataTransfer.effectAllowed = 'copy'; e.dataTransfer.setDragImage(new Image(),0,0); });
  d.addEventListener('click', () => {
    addCenter(f);
    // Mobile: close library after add so canvas stays in view; tap flower later to edit
    if (window.innerWidth <= 768 && activeTab === 'flowers') setTab('flowers');
  });
  fg.appendChild(d);
});

function setCat(el) {
  document.querySelectorAll('.cat').forEach(c => c.classList.remove('on'));
  el.classList.add('on'); cat = el.dataset.c; applyFilter();
}
function filter() { applyFilter(); }
function applyFilter() {
  const q = document.getElementById('si').value.toLowerCase();
  document.querySelectorAll('.fi').forEach(item => {
    const n = item.querySelector('.fi-name').textContent.toLowerCase();
    const c = item.dataset.cat;
    item.classList.toggle('hidden', !(( cat==='all' || c===cat ) && (!q || n.includes(q))));
  });
}

// ---- Drop zone ----
const stage = document.getElementById('stage');
function ov(e) { e.preventDefault(); stage.classList.add('drop-zone-active'); }
function ol(e) { stage.classList.remove('drop-zone-active'); }
function od(e) {
  e.preventDefault(); stage.classList.remove('drop-zone-active');
  if (!dragF) return;
  const r = stage.getBoundingClientRect();
  const sc = getStageScale();
  place(dragF, (e.clientX - r.left) / sc, (e.clientY - r.top) / sc);
  dragF = null;
}

function addCenter(f) {
  // Use hardcoded stage dimensions (must match canvas W=540, H=580)
  place(f, 270 + (Math.random()-.5)*80, 580*.38 + (Math.random()-.5)*60);
}

// ---- Place flower ----
let _skipAutoEdit = false;

function place(f, cx, cy) {
  snap();
  const uid = 'p' + Date.now() + Math.random().toString(36).slice(2);
  const sz  = f.id === 'card' ? 160 : 100;
  const d   = { uid, f, x: cx-sz/2, y: cy-sz/2, sz, rot:0, op:100, flip:'none', z:++zc, stem:false, text:'' };
  placed.push(d);
  render(d);
  // Skip auto-opening Edit when placing from the library (keeps multi-add flow fast)
  _skipAutoEdit = true;
  sel(uid);
  _skipAutoEdit = false;
  ui();
  toast(`${f.name} 已添加 ✓`);
  if (navigator.vibrate) try { navigator.vibrate(8); } catch (_) {}
  if (typeof window.__florityOnChange === 'function') window.__florityOnChange();
}

function render(d) {
  document.getElementById(d.uid)?.remove();
  const el = document.createElement('div');
  el.className = 'pf';
  el.id = d.uid;
  el.style.cssText = `left:${d.x}px;top:${d.y}px;width:${d.sz}px;height:${d.sz}px;z-index:${d.z};opacity:${d.op/100};transform:${tx(d)}`;
  // After drop animation finishes, mark ready so transform/opacity can be set directly
  el.addEventListener('animationend', () => { el.classList.add('ready'); el.style.transform = tx(d); el.style.opacity = d.op/100; }, { once: true });
  const ctrlHtml = `
    <div class="ctrl">
      <button class="cbtn" onclick="bFwd('${d.uid}')" title="上移一层">↑</button>
      <button class="cbtn" onclick="bBck('${d.uid}')" title="下移一层">↓</button>
      <button class="cbtn" onclick="dupOne('${d.uid}')" title="复制">⊕</button>
      <button class="cbtn del" onclick="del('${d.uid}')" title="删除">✕</button>
    </div>`;
  if (d.f.id === 'card') {
    el.innerHTML = ctrlHtml + `<div class="card-body"><textarea class="card-text" placeholder="写一句留言…"></textarea></div><div class="rh" id="rh_${d.uid}"></div>`;
    const ta = el.querySelector('.card-text');
    ta.value = d.text || '';
    ta.addEventListener('input', () => { d.text = ta.value; });
    ta.addEventListener('mousedown', e => e.stopPropagation());
    ta.addEventListener('touchstart', e => e.stopPropagation(), {passive:false});
  } else {
    el.innerHTML = ctrlHtml + `<img src="${d.f.file}" alt="${d.f.name}" draggable="false"><div class="rh" id="rh_${d.uid}"></div><div class="rot-handle" id="roth_${d.uid}">↻</div>`;
  }
  if (d.stem) {
    const si = document.createElement('img');
    si.src = STEM; si.id = 'st_'+d.uid;
    si.style.cssText = `position:absolute;bottom:${-(d.sz*.82)}px;left:50%;transform:translateX(-50%);width:${d.sz*.13}px;height:${d.sz*.85}px;object-fit:contain;pointer-events:none;z-index:-1`;
    el.appendChild(si);
  }
  drag(el, d);
  resize(el, d);
  rotateHandle(el, d);
  el.addEventListener('click', e => { e.stopPropagation(); sel(d.uid); });
  stage.appendChild(el);
}

function tx(d) {
  let t = `rotate(${d.rot}deg)`;
  if (d.flip==='h') t += ' scaleX(-1)';
  if (d.flip==='v') t += ' scaleY(-1)';
  return t;
}

function drag(el, d) {
  let sx, sy, sl, st;
  function startDrag(cx, cy) { sx=cx; sy=cy; sl=d.x; st=d.y; }
  function moveDrag(cx, cy) {
    const sc = getStageScale();
    d.x = sl+(cx-sx)/sc; d.y = st+(cy-sy)/sc;
    el.style.left=d.x+'px'; el.style.top=d.y+'px';
  }
  el.addEventListener('mousedown', e => {
    if (e.target.classList.contains('rh') || e.target.classList.contains('rot-handle') || e.target.classList.contains('cbtn')) return;
    e.preventDefault(); startDrag(e.clientX, e.clientY);
    const mm = e2 => moveDrag(e2.clientX, e2.clientY);
    const mu = () => { document.removeEventListener('mousemove',mm); document.removeEventListener('mouseup',mu); };
    document.addEventListener('mousemove',mm); document.addEventListener('mouseup',mu);
  });
  el.addEventListener('touchstart', e => {
    if (e.target.classList.contains('rh') || e.target.classList.contains('rot-handle') || e.target.classList.contains('cbtn') || e.target.tagName === 'TEXTAREA') return;
    e.preventDefault(); sel(d.uid);
    const t = e.touches[0]; startDrag(t.clientX, t.clientY);
    const tm = e2 => { e2.preventDefault(); const t2=e2.touches[0]; moveDrag(t2.clientX, t2.clientY); };
    const tu = () => { el.removeEventListener('touchmove',tm); el.removeEventListener('touchend',tu); };
    el.addEventListener('touchmove', tm, {passive:false});
    el.addEventListener('touchend', tu);
  }, {passive:false});
}

function resize(el, d) {
  const rh = el.querySelector('.rh');
  function doResize(cx, sx, ss) {
    const sc = getStageScale();
    d.sz = Math.max(40, Math.min(220, ss+(cx-sx)/sc));
    el.style.width=d.sz+'px'; el.style.height=d.sz+'px';
    if (d.uid===selId) syncSliders(d);
    const si = document.getElementById('st_'+d.uid);
    if (si) { si.style.width=d.sz*.13+'px'; si.style.height=d.sz*.85+'px'; si.style.bottom=-(d.sz*.82)+'px'; }
  }
  rh.addEventListener('mousedown', e => {
    e.stopPropagation(); e.preventDefault();
    const sx=e.clientX, ss=d.sz;
    const mm = e2 => doResize(e2.clientX, sx, ss);
    const mu = () => { document.removeEventListener('mousemove',mm); document.removeEventListener('mouseup',mu); };
    document.addEventListener('mousemove',mm); document.addEventListener('mouseup',mu);
  });
  rh.addEventListener('touchstart', e => {
    e.stopPropagation(); e.preventDefault();
    const sx=e.touches[0].clientX, ss=d.sz;
    const tm = e2 => { e2.preventDefault(); doResize(e2.touches[0].clientX, sx, ss); };
    const tu = () => { rh.removeEventListener('touchmove',tm); rh.removeEventListener('touchend',tu); };
    rh.addEventListener('touchmove', tm, {passive:false});
    rh.addEventListener('touchend', tu);
  }, {passive:false});
}

function rotateHandle(el, d) {
  const roth = el.querySelector('.rot-handle');
  if (!roth) return;
  function getCenter() {
    const sc = getStageScale();
    const stage = document.getElementById('stage');
    const rect = stage.getBoundingClientRect();
    const cx = rect.left + (d.x + d.sz / 2) * sc;
    const cy = rect.top + (d.y + d.sz / 2) * sc;
    return { cx, cy };
  }
  function doRotate(clientX, clientY) {
    const { cx, cy } = getCenter();
    const angle = Math.atan2(clientX - cx, -(clientY - cy)) * 180 / Math.PI;
    d.rot = Math.round(angle);
    el.style.transform = tx(d);
    if (d.uid === selId) syncSliders(d);
  }
  roth.addEventListener('mousedown', e => {
    e.stopPropagation(); e.preventDefault();
    const mm = e2 => doRotate(e2.clientX, e2.clientY);
    const mu = () => { document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
    document.addEventListener('mousemove', mm); document.addEventListener('mouseup', mu);
  });
  roth.addEventListener('touchstart', e => {
    e.stopPropagation(); e.preventDefault();
    const tm = e2 => { e2.preventDefault(); doRotate(e2.touches[0].clientX, e2.touches[0].clientY); };
    const tu = () => { roth.removeEventListener('touchmove', tm); roth.removeEventListener('touchend', tu); };
    roth.addEventListener('touchmove', tm, {passive: false});
    roth.addEventListener('touchend', tu);
  }, {passive: false});
}

function sel(uid) {
  document.querySelectorAll('.pf').forEach(e => e.classList.remove('sel'));
  selId = uid;
  if (uid) document.getElementById(uid)?.classList.add('sel');
  propsPanel();
  // Mobile: tapping a flower on the canvas opens Edit (not when bulk-adding from library)
  if (uid && window.innerWidth <= 768 && !_skipAutoEdit) {
    if (activeTab !== 'edit') setTab('edit');
    document.querySelector('.props')?.classList.add('props-tall');
  }
  if (!uid) {
    document.querySelector('.props')?.classList.remove('props-tall');
  }
  if (typeof window.__florityOnChange === 'function') window.__florityOnChange();
}

stage.addEventListener('click', e => {
  if (e.target===stage || e.target.closest('#pot') || e.target.id==='eh' || e.target.closest('.empty-hint')) {
    sel(null);
  }
  if (window.innerWidth <= 768 && activeTab && !e.target.closest('.pf')) {
    activeTab = null;
    document.querySelector('.palette').classList.remove('open');
    document.querySelector('.props').classList.remove('open');
    document.querySelector('.props')?.classList.remove('props-tall');
    document.querySelectorAll('.mtab').forEach(t => t.classList.remove('on'));
    if (typeof window.__floritySyncBackdrop === 'function') window.__floritySyncBackdrop();
  }
});

function propsPanel() {
  const nosel = document.getElementById('nosel');
  const selp  = document.getElementById('selp');
  if (!selId) { nosel.style.display=''; selp.style.display='none'; return; }
  const d = getD(selId); if (!d) return;
  nosel.style.display='none'; selp.style.display='';
  syncSliders(d);
  const stog = document.getElementById('stog'); if (stog) stog.className = 'tog'+(d.stem?' on':'');
  ['fn','fh','fv'].forEach(id => document.getElementById(id).classList.remove('on'));
  document.getElementById({none:'fn',h:'fh',v:'fv'}[d.flip]).classList.add('on');
}

function syncSliders(d) {
  if (d.uid!==selId) return;
  document.getElementById('sz').value = d.sz; document.getElementById('szv').textContent = d.sz;
  document.getElementById('rot').value = d.rot; document.getElementById('rotv').textContent = d.rot+'°';
  document.getElementById('op').value = d.op; document.getElementById('opv').textContent = d.op+'%';
}

function setSz(v) { const d=gsel(); if(!d)return; d.sz=+v; const el=document.getElementById(d.uid); el.style.width=d.sz+'px'; el.style.height=d.sz+'px'; document.getElementById('szv').textContent=v; }
function setRot(v) { const d=gsel(); if(!d)return; d.rot=+v; document.getElementById(d.uid).style.transform=tx(d); document.getElementById('rotv').textContent=v+'°'; }
function setOp(v)  { const d=gsel(); if(!d)return; d.op=+v; document.getElementById(d.uid).style.opacity=v/100; document.getElementById('opv').textContent=v+'%'; }
function setFlip(f){ const d=gsel(); if(!d)return; d.flip=f; document.getElementById(d.uid).style.transform=tx(d); ['fn','fh','fv'].forEach(id=>document.getElementById(id).classList.remove('on')); document.getElementById({none:'fn',h:'fh',v:'fv'}[f]).classList.add('on'); }
function togStem()  { const d=gsel(); if(!d)return; d.stem=!d.stem; render(d); document.getElementById(d.uid).classList.add('sel'); document.getElementById('stog').className='tog'+(d.stem?' on':''); }
function bFwd(uid){ uid=uid||selId; const d=getD(uid); if(!d)return; d.z=++zc; document.getElementById(uid).style.zIndex=d.z; layerList(); }
function bBck(uid){ uid=uid||selId; const d=getD(uid); if(!d)return; d.z=Math.max(2,d.z-2); document.getElementById(uid).style.zIndex=d.z; layerList(); }
function delSel()  { if(selId) del(selId); else toast('请先点选一朵花 ✕'); }
function del(uid)  { snap(); placed=placed.filter(d=>d.uid!==uid); document.getElementById(uid)?.remove(); if(selId===uid){selId=null;propsPanel();} ui(); toast('已移除花朵'); }
function dupOne(uid){ const d=getD(uid); if(!d)return; place(d.f, d.x+d.sz+10+d.sz/2, d.y+d.sz/2); }
function dupSel()  { if(selId) dupOne(selId); }

function setBg(el) {
  document.querySelectorAll('.bgsw').forEach(s=>s.classList.remove('on'));
  el.classList.add('on');
  const bg = el.dataset.bg;
  const cw = document.getElementById('cw');
  const light = bg==='#f5f0e8' || bg==='#f5f0c8';
  cw.style.background = bg;
  const hintColor = light ? 'rgba(10,10,10,0.6)' : 'rgba(245,240,200,0.8)';
  document.querySelectorAll('.hint-text, .hint-sub').forEach(e => e.style.color = hintColor);
  if (typeof window.__florityOnChange === 'function') window.__florityOnChange();
}

function getVase() {
  return VASES.find(v => v.id === vaseId) || VASES[0];
}

function setVase(id, opts) {
  const v = VASES.find(x => x.id === id);
  if (!v) return;
  const silent = opts && opts.silent;
  if (vaseId === id && !silent) return;
  vaseId = v.id;
  const img = document.getElementById('potImg') || document.querySelector('#pot img');
  if (img) {
    // brief fade for feedback
    const pot = document.getElementById('pot');
    if (pot && !silent) {
      pot.style.transition = 'opacity 0.18s ease';
      pot.style.opacity = '0.35';
      setTimeout(() => {
        img.src = v.file;
        img.alt = v.name;
        pot.style.opacity = '1';
      }, 120);
    } else {
      img.src = v.file;
      img.alt = v.name;
    }
  }
  document.querySelectorAll('.vasesw').forEach(el => {
    el.classList.toggle('on', el.dataset.vid === v.id);
  });
  const nameEl = document.getElementById('vaseName');
  if (nameEl) nameEl.textContent = v.name;
  try { localStorage.setItem('yizhichun-vase', vaseId); } catch (_) {}
  if (!silent) {
    toast('花瓶：' + v.name);
    if (typeof window.__florityOnChange === 'function') window.__florityOnChange();
  }
}

let layerDragUid = null;

function layerList() {
  const ll = document.getElementById('ll');
  const sorted = [...placed].sort((a,b)=>b.z-a.z);
  ll.innerHTML = '';
  sorted.forEach(d => {
    const row = document.createElement('div');
    row.className = 'li' + (d.uid===selId?' on':'');
    row.dataset.uid = d.uid;
    row.draggable = true;
    const thumb = d.f.id === 'card'
      ? `<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:#fff;border-radius:2px;font-size:0.5rem;color:#aaa;font-style:italic;flex-shrink:0">留言</span>`
      : `<img src="${d.f.file}" alt="">`;
    row.innerHTML = `
      <span class="drag-handle">⠿</span>
      ${thumb}
      <span>${d.f.name}</span>
      <button onclick="event.stopPropagation();del('${d.uid}')">✕</button>
    `;
    row.addEventListener('click', e => { if (!e.target.closest('button')) sel(d.uid); });

    // Drag-to-reorder
    row.addEventListener('dragstart', e => {
      layerDragUid = d.uid;
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => row.classList.add('dragging'), 0);
    });
    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
      ll.querySelectorAll('.li').forEach(r => r.classList.remove('drag-over'));
    });
    row.addEventListener('dragover', e => {
      e.preventDefault(); e.dataTransfer.dropEffect = 'move';
      ll.querySelectorAll('.li').forEach(r => r.classList.remove('drag-over'));
      if (d.uid !== layerDragUid) row.classList.add('drag-over');
    });
    row.addEventListener('drop', e => {
      e.preventDefault();
      if (!layerDragUid || layerDragUid === d.uid) return;
      snap();
      // Swap z-indices between the dragged item and drop target
      const src = getD(layerDragUid);
      const dst = getD(d.uid);
      if (!src || !dst) return;
      const tmpZ = src.z; src.z = dst.z; dst.z = tmpZ;
      document.getElementById(src.uid).style.zIndex = src.z;
      document.getElementById(dst.uid).style.zIndex = dst.z;
      layerDragUid = null;
      layerList();
    });

    ll.appendChild(row);
  });
  document.getElementById('lcnt').textContent = placed.length;
}

function ui() {
  document.getElementById('cnt').textContent = placed.length;
  const eh = document.getElementById('eh');
  eh.classList.toggle('gone', placed.length > 0);
  eh.style.display = placed.length > 0 ? 'none' : '';
  layerList();
  if (typeof window.__florityOnChange === 'function') window.__florityOnChange();
}

function snap() { hist.push(JSON.stringify(placed.map(d=>({...d})))); if(hist.length>20) hist.shift(); }
function undo() {
  if (!hist.length) { toast('没有可撤销的操作'); return; }
  placed.forEach(d=>document.getElementById(d.uid)?.remove());
  placed = JSON.parse(hist.pop());
  placed.forEach(d=>render(d));
  selId=null; propsPanel(); ui(); toast('已撤销 ✓');
}

function clearAll() {
  if (!placed.length) return; snap();
  placed.forEach(d=>document.getElementById(d.uid)?.remove());
  placed=[]; selId=null; propsPanel(); ui(); toast('画布已清空');
}

document.addEventListener('keydown', e => {
  if (e.target.tagName==='INPUT' || e.target.tagName==='TEXTAREA') return;
  if ((e.ctrlKey||e.metaKey) && e.key==='z') { e.preventDefault(); undo(); }
  if (e.key==='Delete'||e.key==='Backspace') delSel();
  if ((e.ctrlKey||e.metaKey) && e.key==='d') { e.preventDefault(); dupSel(); }
});

function getD(uid) { return placed.find(d=>d.uid===uid)||null; }
function gsel() { return getD(selId); }
function toast(msg) {
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1000);
}

// ---- Mobile helpers ----
let _stageScale = 1;

function getStageScale() {
  return _stageScale;
}

function scaleStage() {
  if (window.innerWidth > 768) {
    stage.style.transform = '';
    _stageScale = 1;
    return;
  }
  const scale = Math.min(1, (window.innerWidth - 8) / 540);
  _stageScale = scale;
  stage.style.transform = `scale(${scale})`;
  // Reduce bottom space so it doesn't leave a huge gap below the scaled stage
  const spaceBelow = Math.round(580 * (1 - scale));
  document.getElementById('cw').style.marginBottom = '-' + spaceBelow + 'px';
}
window.addEventListener('resize', scaleStage);

let activeTab = null;
function setTab(tab) {
  if (window.innerWidth > 768) return;
  // Tap same tab again → close sheet, return to canvas
  if (activeTab === tab) {
    activeTab = null;
    document.querySelector('.palette').classList.remove('open');
    document.querySelector('.props').classList.remove('open');
    document.querySelector('.props')?.classList.remove('props-tall');
    document.querySelectorAll('.mtab').forEach(t => t.classList.remove('on'));
    if (typeof window.__floritySyncBackdrop === 'function') window.__floritySyncBackdrop();
    return;
  }
  activeTab = tab;
  document.querySelector('.palette').classList.toggle('open', tab === 'flowers');
  document.querySelector('.props').classList.toggle('open', tab === 'edit');
  if (tab !== 'edit') document.querySelector('.props')?.classList.remove('props-tall');
  document.querySelectorAll('.mtab').forEach(t => t.classList.toggle('on', t.dataset.tab === tab));
  if (typeof window.__floritySyncBackdrop === 'function') window.__floritySyncBackdrop();
}

// ---- Share via link ----
function generateShareLink() {
  const activeBg = document.querySelector('.bgsw.on');
  const state = {
    n: document.getElementById('arrName').value || '',
    bg: activeBg ? activeBg.dataset.bg : '#0a0a0a',
    vase: vaseId,
    p: placed.map(d => ({
      id: d.f.id,
      x: Math.round(d.x),
      y: Math.round(d.y),
      sz: Math.round(d.sz),
      rot: Math.round(d.rot),
      op: d.op,
      fl: d.flip === 'none' ? 0 : d.flip === 'h' ? 1 : 2,
      z: d.z,
      st: d.stem ? 1 : 0,
      tx: d.text || ''
    }))
  };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  return location.origin + location.pathname + '#' + encoded;
}

function renderArrangement(toName, fromName, note) {
  const W = 540, H = 580, S = 2;

  // Calculate how much extra space we need for personalization text at the bottom
  const hasPersonalization = toName || fromName || note;
  const TEXT_AREA = hasPersonalization ? 100 : 0; // extra px for text below arrangement
  const BRAND_AREA = 30; // space for branding at very bottom

  // Find the topmost content (flowers + vase) so we can crop empty space at the top
  const vaseElTmp = document.querySelector('#pot img');
  let topY = H;
  placed.forEach(d => { topY = Math.min(topY, d.y); });
  if (vaseElTmp && vaseElTmp.complete && vaseElTmp.naturalWidth) {
    const vRatioTmp = vaseElTmp.naturalHeight / vaseElTmp.naturalWidth;
    topY = Math.min(topY, H - 24 - 170 * vRatioTmp);
  }
  const PAD = 28;
  const yOff = Math.max(0, topY - PAD);
  const RH = H - yOff + TEXT_AREA + BRAND_AREA;

  const cvs = document.createElement('canvas');
  cvs.width = W * S; cvs.height = RH * S;
  const ctx = cvs.getContext('2d');
  ctx.scale(S, S);
  ctx.translate(0, -yOff);

  // Background
  const bgColor = document.getElementById('cw').style.background || '#0a0a0a';
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, yOff, W, RH);

  // Helper: get img element already loaded in DOM
  function domImg(src) {
    const el = document.querySelector(`img[src="${src}"]`);
    return (el && el.complete && el.naturalWidth) ? el : null;
  }

  // Draw vase behind flowers (with drop shadow matching CSS: drop-shadow(0 16px 32px rgba(0,0,0,0.9)))
  const vaseEl = document.querySelector('#pot img');
  if (vaseEl && vaseEl.complete && vaseEl.naturalWidth) {
    const vW = 170, vRatio = vaseEl.naturalHeight / vaseEl.naturalWidth;
    const vX = (W - vW) / 2, vY = H - 24 - vW * vRatio;
    // Draw shadow pass using offscreen canvas to get alpha-shape shadow like CSS drop-shadow
    const offCvs = document.createElement('canvas');
    offCvs.width = (vW + 128) * S; offCvs.height = (vW * vRatio + 128) * S;
    const offCtx = offCvs.getContext('2d');
    offCtx.scale(S, S);
    offCtx.shadowColor = 'rgba(0,0,0,0.9)';
    offCtx.shadowBlur = 64;
    offCtx.shadowOffsetX = 0;
    offCtx.shadowOffsetY = 16;
    offCtx.drawImage(vaseEl, 64, 48, vW, vW * vRatio);
    // Draw only the shadow (clear the original image area)
    offCtx.globalCompositeOperation = 'destination-out';
    offCtx.shadowColor = 'transparent';
    offCtx.shadowBlur = 0;
    offCtx.shadowOffsetX = 0;
    offCtx.shadowOffsetY = 0;
    offCtx.drawImage(vaseEl, 64, 48, vW, vW * vRatio);
    offCtx.globalCompositeOperation = 'source-over';
    // Stamp shadow onto main canvas
    ctx.drawImage(offCvs, 0, 0, offCvs.width, offCvs.height, vX - 64, vY - 48, (vW + 128), (vW * vRatio + 128));
    // Draw vase on top
    ctx.drawImage(vaseEl, vX, vY, vW, vW * vRatio);
  }

  // Draw flowers sorted by z-index ascending (back to front)
  [...placed].sort((a, b) => a.z - b.z).forEach(d => {
    ctx.save();
    ctx.globalAlpha = d.op / 100;
    ctx.translate(d.x + d.sz / 2, d.y + d.sz / 2);
    ctx.rotate(d.rot * Math.PI / 180);
    if (d.flip === 'h') ctx.scale(-1, 1);
    if (d.flip === 'v') ctx.scale(1, -1);

    if (d.f.id === 'card') {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(-d.sz/2, -d.sz/2, d.sz, d.sz, 4);
      else ctx.rect(-d.sz/2, -d.sz/2, d.sz, d.sz);
      ctx.fill();
      if (d.text) {
        ctx.save();
        ctx.beginPath(); ctx.rect(-d.sz/2, -d.sz/2, d.sz, d.sz); ctx.clip();
        const pad = 12, fs = Math.max(9, Math.round(d.sz * 0.09));
        ctx.font = `${fs}px Georgia, serif`;
        ctx.fillStyle = '#222';
        ctx.textBaseline = 'top';
        const lh = fs * 1.5, maxW = d.sz - pad * 2;
        const lines = [];
        d.text.split('\n').forEach(para => {
          if (!para) { lines.push(''); return; }
          let cur = '';
          para.split(' ').forEach(w => {
            const test = cur ? cur + ' ' + w : w;
            if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; }
            else cur = test;
          });
          lines.push(cur);
        });
        lines.forEach((l, i) => ctx.fillText(l, -d.sz/2 + pad, -d.sz/2 + pad + i * lh));
        ctx.restore();
      }
    } else {
      const img = domImg(d.f.file);
      if (img) ctx.drawImage(img, -d.sz/2, -d.sz/2, d.sz, d.sz);
      if (d.stem) {
        const si = domImg(STEM);
        if (si) {
          const sw = d.sz * 0.13, sh = d.sz * 0.85;
          ctx.drawImage(si, -sw/2, d.sz/2 - sh * 0.18, sw, sh);
        }
      }
    }
    ctx.restore();
  });

  // ---- Personalization text area below arrangement ----
  const textBaseY = H + 10; // start of text area (below the arrangement)
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 1;

  if (hasPersonalization) {
    let curY = textBaseY;

    // "To" name — left aligned
    if (toName) {
      ctx.font = '400 16px "Noto Sans SC", "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(245,240,200,0.85)';
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      ctx.fillText('致：', 40, curY);
      ctx.font = '700 16px "Noto Sans SC", "Space Grotesk", sans-serif';
      ctx.fillText(' ' + toName, 40 + ctx.measureText('致：').width, curY);
    }

    // "From" name — right aligned
    if (fromName) {
      ctx.textAlign = 'right';
      ctx.font = '400 16px "Noto Sans SC", "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(245,240,200,0.85)';
      const fromLabel = '来自：';
      const fromFull = fromLabel + fromName;
      ctx.fillText('来自：', W - 40 - ctx.measureText(fromName).width - 4, curY);
      ctx.font = '700 16px "Noto Sans SC", "Space Grotesk", sans-serif';
      ctx.fillText(fromName, W - 40, curY);
      ctx.textAlign = 'left';
    }

    curY += 28;

    // Note — centered, italic
    if (note) {
      ctx.font = '400 13px "Noto Sans SC", "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(245,240,200,0.7)';
      ctx.textAlign = 'center';
      // Word wrap note (respecting manual line breaks)
      const maxW = W - 80;
      const noteLines = [];
      note.split('\n').forEach(para => {
        if (!para) { noteLines.push(''); return; }
        let line = '';
        para.split(' ').forEach(w => {
          const test = line ? line + ' ' + w : w;
          if (ctx.measureText(test).width > maxW && line) { noteLines.push(line); line = w; }
          else line = test;
        });
        noteLines.push(line);
      });
      noteLines.forEach((l, i) => {
        const prefix = i === 0 ? '\u201C' : '';
        const suffix = i === noteLines.length - 1 ? '\u201D' : '';
        ctx.fillText(prefix + l + suffix, W / 2, curY + i * 18);
      });
      ctx.textAlign = 'left';
    }
  }

  ctx.restore();

  // ---- Branding: "made with flority.digital" ----
  ctx.save();
  ctx.font = '400 10px "Noto Sans SC", "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(245,240,200,0.3)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.letterSpacing = '1.5px';
  const brandHost = (location.hostname && location.hostname !== 'localhost')
    ? location.hostname
    : '一枝春';
  ctx.fillText('一枝春 · ' + brandHost, W / 2, H + TEXT_AREA + BRAND_AREA - 8);
  ctx.restore();

  return cvs;
}

// ---- Share Wizard ----
let _wizStep = 0;
let _wizBlob = null;

// Character counter for note textarea
document.getElementById('swizNote').addEventListener('input', function() {
  document.getElementById('swizCharCnt').textContent = this.value.length;
});

function openShare() {
  if (!placed.length) { toast('请先添加一些花朵 🌸'); return; }
  sel(null);
  // Reset wizard
  _wizStep = 0;
  _wizBlob = null;
  document.getElementById('swizTo').value = '';
  document.getElementById('swizFrom').value = '';
  document.getElementById('swizNote').value = '';
  document.getElementById('swizCharCnt').textContent = '0';
  document.getElementById('swizWallName').value = '';
  // Generate clean preview for wall step
  const wallCvs = renderArrangement('', '', '');
  wallCvs.toBlob(function(blob) {
    document.getElementById('swizPreviewWall').src = URL.createObjectURL(blob);
  }, 'image/png');
  wizShowStep(0);
  document.getElementById('swizBg').classList.add('show');
}

function closeWiz() {
  document.getElementById('swizBg').classList.remove('show');
  const img = document.getElementById('swizPreview');
  if (img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
  img.src = '';
  _wizBlob = null;
}

// Close wizard only when clicking directly on the background overlay
document.getElementById('swizBg').addEventListener('mousedown', function(e) {
  if (e.target === this) this._bgClick = true;
});
document.getElementById('swizBg').addEventListener('mouseup', function(e) {
  if (e.target === this && this._bgClick) closeWiz();
  this._bgClick = false;
});
// Prevent any interaction inside the panel from closing the wizard
document.querySelector('.swiz-panel').addEventListener('mousedown', function(e) {
  e.stopPropagation();
});
document.querySelector('.swiz-panel').addEventListener('mouseup', function(e) {
  e.stopPropagation();
});

function wizShowStep(n) {
  _wizStep = n;
  for (let i = 0; i < 4; i++) {
    document.getElementById('swizStep' + i).style.display = i === n ? '' : 'none';
    document.getElementById('swizDot' + i).classList.toggle('on', i === n);
  }
  document.getElementById('swizBack').style.display = n > 1 ? '' : 'none';
  const titles = ['花艺墙', '送给TA', '添加留言', '预览'];
  document.getElementById('swizTitle').textContent = titles[n];
}

function wizBack() {
  if (_wizStep > 1) wizShowStep(_wizStep - 1);
}

function wizNext() {
  if (_wizStep === 1) {
    const to = document.getElementById('swizTo').value.trim();
    const from = document.getElementById('swizFrom').value.trim();
    if (!to) { toast('请填写收件人姓名'); document.getElementById('swizTo').focus(); return; }
    if (!from) { toast('请填写你的名字'); document.getElementById('swizFrom').focus(); return; }
    wizShowStep(2);
    setTimeout(() => document.getElementById('swizNote').focus(), 200);
  } else if (_wizStep === 2) {
    wizGeneratePreview();
  }
}

function wizSkipNote() {
  document.getElementById('swizNote').value = '';
  wizGeneratePreview();
}

function wizSkipAll() {
  document.getElementById('swizTo').value = '';
  document.getElementById('swizFrom').value = '';
  document.getElementById('swizNote').value = '';
  wizGeneratePreview();
}


async function wizGeneratePreview() {
  toast('正在生成预览…');
  try {
    const toName = document.getElementById('swizTo').value.trim();
    const fromName = document.getElementById('swizFrom').value.trim();
    const note = document.getElementById('swizNote').value.trim();
    const cvs = renderArrangement(toName, fromName, note);
    const blob = await new Promise(res => cvs.toBlob(res, 'image/png'));
    _wizBlob = blob;
    const url = URL.createObjectURL(blob);
    document.getElementById('swizPreview').src = url;
    wizShowStep(3);
  } catch (err) {
    toast('出错了：' + err.message);
  }
}

async function wizShare() {
  if (!_wizBlob) return;
  const blob = _wizBlob;
  const file = new File([blob], '一枝春.png', { type: 'image/png' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text: '送你一枝春 🌷 你也可以试试：' + location.origin + location.pathname });
      closeWiz();
      return;
    }
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    closeWiz();
    toast('图片已复制，可以粘贴发送 ✓');
  } catch (err) {
    if (err.name !== 'AbortError') toast('出错了：' + err.message);
  }
}

async function wizWhatsApp() {
  if (!_wizBlob) return;
  const blob = _wizBlob;
  toast('正在上传图片…');
  try {
    const formData = new FormData();
    formData.append('file', blob, 'arrangement.png');
    formData.append('upload_preset', 'Flority files');
    const res = await fetch('https://api.cloudinary.com/v1_1/dew7hucqf/image/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    if (!data.secure_url) throw new Error('No URL returned');
    const waUrl = 'https://wa.me/?text=' + encodeURIComponent('送你一枝春 :)\n' + data.secure_url + '\n\n你也可以试试 ' + location.origin + location.pathname);
    window.location.href = waUrl;
  } catch (err) {
    toast('上传失败：' + err.message);
    console.error('[Flority] WhatsApp share error:', err);
  }
}

async function wizSaveImage() {
  if (!_wizBlob) return;
  const file = new File([_wizBlob], '一枝春.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      wizAskWall();
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }
  const url = URL.createObjectURL(_wizBlob);
  const a = document.createElement('a');
  a.href = url; a.download = '一枝春.png';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  closeWiz();
  toast('图片已保存 ✓');
}

function wizDownload() {
  if (!_wizBlob) return;
  const url = URL.createObjectURL(_wizBlob);
  const a = document.createElement('a');
  a.href = url; a.download = '一枝春.png';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  closeWiz();
  toast('已下载 ✓');
}

// ---- Wall of Flowers ----
let _wallLoaded = false;
let _wallItems = [];

function openWall() {
  document.getElementById('wallBg').classList.add('show');
  if (!_wallLoaded) loadWall();
}

function closeWall() {
  document.getElementById('wallBg').classList.remove('show');
}

async function loadWall() {
  const loading = document.getElementById('wallLoading');
  const empty = document.getElementById('wallEmpty');
  const grid = document.getElementById('wallGrid');
  loading.style.display = '';
  empty.style.display = 'none';
  grid.innerHTML = '';
  try {
    const res = await fetch('https://res.cloudinary.com/dew7hucqf/image/list/flority-wall.json');
    if (res.status === 404) {
      // No images tagged yet — show empty state
      loading.style.display = 'none';
      empty.style.display = '';
      _wallLoaded = true;
      return;
    }
    if (!res.ok) throw new Error('Could not load gallery');
    const data = await res.json();
    _wallItems = (data.resources || []).reverse();
    _wallLoaded = true;
    loading.style.display = 'none';
    if (!_wallItems.length) {
      empty.style.display = '';
      return;
    }
    renderWall();
  } catch (err) {
    loading.textContent = '花艺墙加载失败，请稍后再试。';
    console.error('[Flority] Wall load error:', err);
  }
}

function renderWall() {
  const grid = document.getElementById('wallGrid');
  grid.innerHTML = '';
  const base = 'https://res.cloudinary.com/dew7hucqf/image/upload/';
  const local = (typeof window.__florityGetLocalWall === 'function')
    ? window.__florityGetLocalWall()
    : [];

  // Local submissions first
  local.forEach(item => {
    const card = document.createElement('div');
    card.className = 'wall-card';
    const creator = item.creator || '';
    card.innerHTML = '<img src="' + item.dataUrl + '" alt="Arrangement" loading="lazy">' +
      (creator ? '<div class="wall-card-info">作者 ' + creator + ' · 本地</div>' : '<div class="wall-card-info">本地</div>');
    card.onclick = function() { openWallLightbox(item.dataUrl); };
    grid.appendChild(card);
  });

  _wallItems.forEach(item => {
    const pid = item.public_id;
    const fmt = item.format || 'png';
    const thumbUrl = base + 'c_fill,w_400,h_400,q_auto,f_auto/' + pid + '.' + fmt;
    const fullUrl = base + 'w_800,q_auto,f_auto/' + pid + '.' + fmt;
    const creator = (item.context && item.context.custom && item.context.custom.creator) || '';
    const card = document.createElement('div');
    card.className = 'wall-card';
    card.innerHTML = '<img src="' + thumbUrl + '" alt="花艺作品" loading="lazy">' + (creator ? '<div class="wall-card-info">作者 ' + creator + '</div>' : '');
    card.onclick = function() { openWallLightbox(fullUrl); };
    grid.appendChild(card);
  });

  const empty = document.getElementById('wallEmpty');
  if (empty) {
    empty.style.display = (!local.length && !_wallItems.length) ? '' : 'none';
  }
}

function openWallLightbox(url) {
  document.getElementById('wallLightboxImg').src = url;
  document.getElementById('wallLightbox').classList.add('show');
}

function closeWallLightbox() {
  document.getElementById('wallLightbox').classList.remove('show');
  document.getElementById('wallLightboxImg').src = '';
}

async function wizSubmitToWall() {
  if (!placed.length) return;
  const btn = document.getElementById('wallSubmitBtn');
  btn.textContent = '提交中…';
  btn.disabled = true;
  const creator = document.getElementById('swizWallName').value.trim() || '匿名';
  try {
    // Render a clean image with NO names/notes for privacy
    const cleanCvs = renderArrangement('', '', '');
    const cleanBlob = await new Promise(res => cleanCvs.toBlob(res, 'image/png'));
    const formData = new FormData();
    formData.append('file', cleanBlob, 'arrangement.png');
    formData.append('upload_preset', 'flority-wall');
    formData.append('tags', 'flority-wall');
    formData.append('folder', 'wall');
    formData.append('context', 'creator=' + creator);
    const res = await fetch('https://api.cloudinary.com/v1_1/dew7hucqf/image/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    toast('已提交到花艺墙！');
    _wallLoaded = false;
    wizShowStep(1);
  } catch (err) {
    // Offline / CORS / preset failure → save to local wall so the feature still works
    try {
      const cleanCvs = renderArrangement('', '', '');
      const dataUrl = cleanCvs.toDataURL('image/png');
      if (typeof window.__floritySaveLocalWall === 'function') {
        window.__floritySaveLocalWall({ creator, dataUrl, ts: Date.now() });
        toast('已保存到本地花艺墙（离线）');
        _wallLoaded = false;
        wizShowStep(1);
      } else {
        throw err;
      }
    } catch (err2) {
      toast('提交失败：' + (err.message || err2.message));
      console.error('[Flority] Wall submit error:', err);
    }
  } finally {
    btn.textContent = '提交到花艺墙';
    btn.disabled = false;
  }
}


function loadFromHash() {
  const hash = location.hash.slice(1);
  if (!hash) return;
  try {
    const state = JSON.parse(decodeURIComponent(escape(atob(hash))));
    if (state.n) document.getElementById('arrName').value = state.n;
    if (state.bg) {
      const bgEl = document.querySelector('.bgsw[data-bg="' + state.bg + '"]');
      if (bgEl) setBg(bgEl);
    }
    if (state.vase) setVase(state.vase, { silent: true });
    if (state.p && state.p.length) {
      const flipMap = ['none', 'h', 'v'];
      state.p.forEach(p => {
        const f = FLOWERS.find(fl => fl.id === p.id);
        if (!f) return;
        const uid = 'p' + Date.now() + Math.random().toString(36).slice(2);
        const d = { uid, f, x: p.x, y: p.y, sz: p.sz, rot: p.rot, op: p.op, flip: flipMap[p.fl] || 'none', z: p.z, stem: p.st === 1, text: p.tx || '' };
        zc = Math.max(zc, p.z);
        placed.push(d);
        render(d);
      });
      sel(null); ui();
      toast('作品已加载 ✓');
    }
  } catch(e) { /* invalid hash */ }
}

scaleStage();
ui();
// Restore last-used vase (before hash/draft, so they can override)
try {
  const savedVase = localStorage.getItem('yizhichun-vase');
  if (savedVase && !location.hash) setVase(savedVase, { silent: true });
} catch (_) {}
loadFromHash();
// Restore auto-saved draft when no share-hash is present
if (!location.hash && typeof window.__florityRestoreDraft === 'function') {
  window.__florityRestoreDraft();
}
