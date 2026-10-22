/* DermaSafe prototype — core: state, router, icons, components, data */
var S = {
  stack: ['login'], sheet: null, mode: 'system', text: 'default', rm: false,
  concern: 'My skin becomes itchy after using some moisturizers.',
  chips: { Itching: true, Sensitivity: true },
  addMode: 'barcode', ingFilter: 'all', ingOpen: { niacinamide: true }, ing: 'niacinamide',
  analyzing: 0, scoreBreak: false, flagOpen: {}, flagReason: null,
  t: { history: true, personal: true, research: false, marketing: false, nResults: true, nAppts: true, nTips: false, nUpdates: true,
       shConcern: true, shProduct: true, shIngredients: true, shFlags: true, shScore: true, shPhotos: false, consent: false },
  acc: {}, apptTab: 'up', docTab: 'about', doc: 'd1', slot: '11:30', day: 'Thu 23', consult: 'video', pay: 'upi',
  booked: false, saved: { d1: true }, find: { now: true }, verdict: null, attach: null,
  chat: [
    { me: false, t: 'Hi Sarah, I’ve gone through the analysis you shared. Is the itching only where you apply the moisturizer?' },
    { me: true, t: 'Yes, mostly on my cheeks, about an hour after applying it.' },
    { me: false, t: 'That fits a reaction to fragrance. Please stop that product for now. I’d like to see a photo of the area in daylight if you’re comfortable.' }
  ]
};

/* ---------- icons ---------- */
var ICONS = {
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>', down: '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>', check: '<path d="M20 6 9 17l-5-5"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
  octagon: '<path d="M7.9 2h8.2L22 7.9v8.2L16.1 22H7.9L2 16.1V7.9z"/><path d="M12 8v4M12 16h.01"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  minusc: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17v4M17 19h4"/>',
  steth: '<path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  home: '<path d="M3 11 12 3l9 8v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 8v8M11 8v8M15 8v8M18 8v8"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M8 16H3v5"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  db: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 19A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-3L14 9V3M7 15h10"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  gem: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20M12 22 8 9l3-6M12 22l4-13-3-6"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  video: '<path d="m22 8-6 4 6 4V8z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  clinic: '<path d="M3 21h18M5 21V7l7-4 7 4v14M10 12h4M12 10v4"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  clip: '<path d="m21.4 11-9.2 9.2a6 6 0 0 1-8.5-8.5l8.6-8.6A4 4 0 1 1 18 8.8l-8.6 8.6a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3-3a2 2 0 0 0-2.8 0L6 21"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  layers: '<path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  edit: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'
};
function ic(n, s) { s = s || 20; return '<svg class="i" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || '') + '</svg>'; }

/* ---------- small components ---------- */
function chip(k, t, i) { return '<span class="chip c-' + k + '">' + (i ? ic(i, 14) : '') + t + '</span>'; }
var STAT = { safe: ['ok', 'shield', 'Safe for you'], fine: ['ok', 'check', 'Fine for you'], low: ['ok', 'check', 'Low risk'], mod: ['warn', 'alert', 'Moderate'], high: ['crit', 'octagon', 'High risk'], unk: ['unk', 'help', 'Unknown'], routine: ['warn', 'alert', 'Check routine'] };
function status(k) { var s = STAT[k]; return chip(s[0], s[2], s[1]); }
var SRC = { v: ['shield', 'Verified source', 'src-v'], l: ['file', 'Product label', 'src-l'], u: ['user', 'You told us', 'src-u'], ai: ['sparkle', 'AI interpretation', 'src-ai'], d: ['steth', 'Dermatology source', 'src-d'], c: ['users', 'Clinically reviewed', 'src-c'], x: ['minusc', 'Unable to verify', 'src-x'] };
function src(k) { var s = SRC[k]; return '<span class="src ' + s[2] + '">' + ic(s[0], 13) + s[1] + '</span>'; }
function srcs(list) { return '<div class="row wrap" style="gap:6px">' + list.map(src).join('') + '</div>'; }
function btn(label, attrs, v, icon) { return '<button class="btn b-' + (v || 'p') + '" ' + (attrs || '') + '>' + (icon ? ic(icon, 18) : '') + '<span>' + label + '</span></button>'; }
var STEPN = ['Start', 'Concern', 'Product', 'Ingredients', 'Risks', 'Safety', 'Solution'];
function steps(n) { return '<div class="steps" role="img" aria-label="Step ' + n + ' of 7: ' + STEPN[n - 1] + '"><div class="seg">' + STEPN.map(function (_, i) { return '<i class="' + (i < n ? 'on' : '') + '"></i>'; }).join('') + '</div><span><b>' + STEPN[n - 1] + '</b> &nbsp;' + n + ' of 7</span></div>'; }
function hdr(o) {
  o = o || {};
  var left = o.noBack ? '<span class="sp"></span>' : '<button class="ib" data-back aria-label="Back">' + ic('left') + '</button>';
  var mid = o.step ? steps(o.step) : (o.title ? '<span class="hdr-t">' + o.title + '</span>' : '');
  return '<header class="hdr">' + left + '<div class="hdr-mid">' + mid + '</div>' + (o.right || '<span class="sp"></span>') + '</header>';
}
function sw(key, label, desc) {
  return '<div class="li" style="cursor:default"><div class="li-m"><span class="li-t" id="l-' + key + '">' + label + '</span>' + (desc ? '<span class="li-s">' + desc + '</span>' : '') + '</div><button class="sw" role="switch" aria-checked="' + !!S.t[key] + '" aria-labelledby="l-' + key + '" data-act="tog:' + key + '"><i></i></button></div>';
}
function li(o) {
  return '<button class="li" ' + (o.go ? 'data-go="' + o.go + '"' : '') + (o.act ? ' data-act="' + o.act + '"' : '') + '>' + (o.icon ? '<span class="li-ic">' + ic(o.icon) + '</span>' : '') + '<span class="li-m"><span class="li-t">' + o.t + '</span>' + (o.s ? '<span class="li-s">' + o.s + '</span>' : '') + '</span>' + (o.right || '') + ic('right', 18) + '</button>';
}
function acc(id, title, body) {
  var open = !!S.acc[id];
  return '<div class="acc"><button class="acc-h" aria-expanded="' + open + '" data-act="acc:' + id + '"><span>' + title + '</span>' + ic('down', 18) + '</button>' + (open ? '<div class="acc-b">' + body + '</div>' : '') + '</div>';
}
function segc(key, opts) {
  return '<div class="segc" role="group">' + opts.map(function (o) { return '<button aria-pressed="' + (S[key] === o[0]) + '" data-act="set:' + key + ':' + o[0] + '">' + (o[2] ? ic(o[2], 16) : '') + o[1] + '</button>'; }).join('') + '</div>';
}
function opt(key, val, title, desc, icon) {
  return '<button class="opt" aria-pressed="' + (S[key] === val) + '" data-act="set:' + key + ':' + val + '"><span class="radio"></span><span class="li-m"><span class="li-t">' + (icon ? '<span class="row" style="gap:8px">' + ic(icon, 18) + title + '</span>' : title) + '</span>' + (desc ? '<span class="li-s">' + desc + '</span>' : '') + '</span></button>';
}
function patchMark(size) { size = size || 40; return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="2" width="36" height="36" rx="12" fill="var(--pri)"></rect><rect x="11" y="11" width="18" height="18" rx="6" fill="none" stroke="var(--pri-ink)" stroke-width="2.4"></rect><circle cx="20" cy="20" r="3" fill="var(--hl)"></circle></svg>'; }
function productArt(w, h, tone) {
  return '<div class="empty-img" style="width:' + w + 'px;height:' + h + 'px;flex:none"><svg width="' + Math.round(w * .42) + '" height="' + Math.round(h * .7) + '" viewBox="0 0 40 70" aria-hidden="true"><rect x="14" y="0" width="12" height="8" rx="2" fill="var(--ink2)" opacity=".5"></rect><rect x="9" y="7" width="22" height="9" rx="3" fill="var(--ink2)" opacity=".35"></rect><rect x="4" y="15" width="32" height="54" rx="9" fill="var(--surf)" stroke="var(--line)" stroke-width="1.5"></rect><rect x="11" y="36" width="18" height="3" rx="1.5" fill="' + (tone || 'var(--pri)') + '"></rect><rect x="13" y="43" width="14" height="2" rx="1" fill="var(--line)"></rect></svg></div>';
}
function avatar(initials, hue) { return '<span class="avatar" style="background:' + hue + '">' + initials + '</span>'; }
function stars(r) { return '<span class="row small" style="gap:4px;color:var(--warn)"><svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style="fill:currentColor">' + ICONS.star + '</svg><b class="num" style="color:var(--ink)">' + r + '</b></span>'; }

/* ---------- data (examples) ---------- */
var PRODUCT = { name: 'Hydrating Face Moisturizer', brand: 'Lumea Skin', size: '50 ml', cat: 'Face moisturizer' };
var ALT = { name: 'Gentle Barrier Cream', brand: 'Calmwell', size: '50 ml', score: 86 };
var INGS = [
  { id: 'aqua', inci: 'Aqua', plain: 'Water', purpose: 'Base of the formula', st: 'fine' },
  { id: 'glycerin', inci: 'Glycerin', plain: 'Glycerin', purpose: 'Draws moisture into skin', st: 'fine', note: 'One of the most tolerated moisturizing ingredients.' },
  { id: 'niacinamide', inci: 'Niacinamide', plain: 'Vitamin B3', purpose: 'Supports the skin barrier', st: 'fine', note: 'Helps skin hold moisture and evens tone. Well tolerated by most sensitive skin.' },
  { id: 'cetearyl', inci: 'Cetearyl Alcohol', plain: 'Fatty alcohol', purpose: 'Softens and thickens', st: 'fine', note: 'Not a drying alcohol. Rarely irritating.' },
  { id: 'ceramide', inci: 'Ceramide NP', plain: 'Ceramide', purpose: 'Repairs the barrier', st: 'fine', note: 'Replaces lipids your skin barrier needs.' },
  { id: 'dimethicone', inci: 'Dimethicone', plain: 'Silicone', purpose: 'Smooths and protects', st: 'fine', note: 'Forms a light breathable film.' },
  { id: 'lactic', inci: 'Lactic Acid', plain: 'Lactic acid (AHA)', purpose: 'Gentle exfoliant', st: 'routine', note: 'Low risk alone. May irritate together with your retinol serum.', flag: true },
  { id: 'parfum', inci: 'Parfum', plain: 'Fragrance', purpose: 'Adds scent', st: 'mod', match: true, note: 'A common cause of itching for sensitive skin. Matched to your concern.', flag: true },
  { id: 'linalool', inci: 'Linalool', plain: 'Fragrance allergen', purpose: 'Part of the fragrance', st: 'mod', match: true, note: 'One of the fragrance allergens EU rules require brands to label.', flag: true },
  { id: 'phenoxy', inci: 'Phenoxyethanol', plain: 'Preservative', purpose: 'Keeps the product safe from microbes', st: 'low', note: 'Low irritation risk at normal levels (up to 1%).' },
  { id: 'caprylic', inci: 'Caprylic/Capric Triglyceride', plain: 'Coconut-derived oil', purpose: 'Softens skin', st: 'fine' },
  { id: 'xanthan', inci: 'Xanthan Gum', plain: 'Thickener', purpose: 'Gives texture', st: 'fine' }
];
function ingById(id) { for (var i = 0; i < INGS.length; i++) if (INGS[i].id === id) return INGS[i]; return INGS[0]; }
var DOCS = {
  d1: { name: 'Dr. Ananya Rao', ini: 'AR', hue: '#9A4A3A', role: 'Dermatologist, sensitive skin', yrs: 9, rating: '4.8', reviews: 214, video: 600, clinic: 900, km: '2.1 km', clinicName: 'Skinwise Clinic, Baner', now: true, lang: 'English, Hindi, Marathi' },
  d2: { name: 'Dr. Kabir Mehta', ini: 'KM', hue: '#3E5C7A', role: 'Allergy and contact dermatitis', yrs: 12, rating: '4.7', reviews: 186, video: 800, clinic: 1100, km: '4.5 km', clinicName: 'Derma Point, Aundh', now: false, lang: 'English, Hindi' },
  d3: { name: 'Dr. Sara Thomas', ini: 'ST', hue: '#4D6B52', role: 'Cosmetic and pediatric dermatology', yrs: 7, rating: '4.9', reviews: 98, video: 700, clinic: 1000, km: '6.0 km', clinicName: 'Clearleaf Skin Care, Wakad', now: true, lang: 'English, Malayalam' }
};

/* ---------- router ---------- */
var SCREENS = {}, ORDER = [], SHEETS = {}, ACTS = {}, ENTER = {};
function reg(id, def) { SCREENS[id] = def; ORDER.push(id); }
function cur() { return S.stack[S.stack.length - 1]; }
var GROUPS = ['Start', 'Check flow', 'Results', 'Edge states', 'Tabs', 'Dermatologist care', 'Profile', 'Trust & clinic'];
function go(id) { S.stack.push(id); S.sheet = null; render(true); }
function back() { if (S.stack.length > 1) S.stack.pop(); S.sheet = null; render(true); }
function tab(id) { S.stack = [id]; S.sheet = null; render(true); }
function jump(id) { var d = SCREENS[id]; S.stack = d.base && d.base !== id ? [d.base, id] : [id]; S.sheet = null; render(true); }
var timers = [];
function clearTimers() { timers.forEach(clearTimeout); timers = []; }
function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

function render(top) {
  var app = document.getElementById('app');
  var d = SCREENS[cur()];
  var old = app.querySelector('.scroll');
  var pos = old ? old.scrollTop : 0;
  var sheet = S.sheet && SHEETS[S.sheet] ? '<div class="scrim" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-label="' + (SHEETS[S.sheet].label || 'Details') + '"><span class="grab" aria-hidden="true"></span>' + SHEETS[S.sheet].render() + '</div>' : '';
  app.innerHTML = '<div class="scroll" id="scroller">' + d.render() + '</div>' + (d.tab ? tabbar(d.tab) : '') + sheet + '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
  if (S.mode === 'system') app.removeAttribute('data-mode'); else app.setAttribute('data-mode', S.mode);
  app.setAttribute('data-text', S.text);
  app.setAttribute('data-rm', S.rm ? 'on' : 'off');
  var sc = app.querySelector('.scroll');
  if (!top) sc.scrollTop = pos;
  if (top) { clearTimers(); if (ENTER[cur()]) ENTER[cur()](); }
  if (d.after) d.after();
  syncIndex();
  if (S.sheet) { var f = app.querySelector('.sheet button, .sheet input'); if (f) f.focus({ preventScroll: true }); }
}
function tabbar(active) {
  var items = [['home', 'Home', 'home'], ['history', 'History', 'clock'], ['add', 'Check', 'scan'], ['care', 'Doctors', 'steth'], ['profile', 'Profile', 'user']];
  return '<nav class="tabbar" aria-label="Main">' + items.map(function (it) {
    var cur = active === it[0] ? ' aria-current="page"' : '';
    if (it[0] === 'add') return '<button data-act="startCheck"' + cur + '><span class="box">' + ic('scan', 24) + '</span>' + it[1] + '</button>';
    return '<button data-tab="' + it[0] + '"' + cur + '>' + ic(it[2], 22) + it[1] + '</button>';
  }).join('') + '</nav>';
}
function toast(msg) {
  var t = document.getElementById('toast'); if (!t) return;
  t.innerHTML = ic('check', 18) + '<span>' + msg + '</span>'; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2200);
}

/* ---------- generic actions ---------- */
ACTS.tog = function (k) { S.t[k] = !S.t[k]; render(false); };
ACTS.acc = function (k) { S.acc[k] = !S.acc[k]; render(false); };
ACTS.set = function () { var a = [].slice.call(arguments); a.pop(); var k = a.shift(); S[k] = a.join(':'); render(false); };
ACTS.sheet = function (k) { S.sheet = k; render(false); };
ACTS.close = function () { S.sheet = null; render(false); };
ACTS.toast = function (m) { toast(decodeURIComponent(m)); };
ACTS.startCheck = function () { S.stack = ['home', 'concern']; S.sheet = null; render(true); };

document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-go],[data-back],[data-tab],[data-act],[data-close],[data-jump]');
  if (!t) return;
  if (t.hasAttribute('data-jump')) { jump(t.getAttribute('data-jump')); return; }
  if (!document.getElementById('app').contains(t)) return;
  if (t.getAttribute('data-go')) { e.preventDefault(); go(t.getAttribute('data-go')); }
  else if (t.hasAttribute('data-back')) back();
  else if (t.getAttribute('data-tab')) tab(t.getAttribute('data-tab'));
  else if (t.hasAttribute('data-close')) ACTS.close();
  else if (t.getAttribute('data-act')) {
    var parts = t.getAttribute('data-act').split(':');
    var fn = ACTS[parts[0]]; if (fn) fn.apply(null, parts.slice(1).concat([t]));
  }
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && S.sheet) ACTS.close(); });

/* ---------- side index ---------- */
function buildIndex() {
  var idx = document.getElementById('idx'), sel = document.getElementById('jump');
  var html = '', opts = '';
  GROUPS.forEach(function (g) {
    var ids = ORDER.filter(function (id) { return SCREENS[id].group === g; });
    if (!ids.length) return;
    html += '<h3>' + g + '</h3>';
    opts += '<optgroup label="' + g + '">';
    ids.forEach(function (id) { html += '<button data-jump="' + id + '" data-id="' + id + '">' + SCREENS[id].title + '</button>'; opts += '<option value="' + id + '">' + SCREENS[id].title + '</option>'; });
    opts += '</optgroup>';
  });
  idx.innerHTML = html; sel.innerHTML = opts;
  sel.addEventListener('change', function () { jump(sel.value); });
  var mc = document.getElementById('modeCtl');
  function drawMode() { mc.innerHTML = [['light', 'Light', 'sun'], ['dark', 'Dark', 'moon'], ['system', 'System', 'monitor']].map(function (m) { return '<button aria-pressed="' + (S.mode === m[0]) + '" data-mode="' + m[0] + '">' + ic(m[2], 16) + m[1] + '</button>'; }).join(''); }
  drawMode();
  mc.addEventListener('click', function (e) { var b = e.target.closest('[data-mode]'); if (!b) return; S.mode = b.getAttribute('data-mode'); drawMode(); render(false); });
  buildIndex.drawMode = drawMode;
}
function syncIndex() {
  var c = cur();
  document.querySelectorAll('#idx button').forEach(function (b) { b.setAttribute('aria-current', b.getAttribute('data-id') === c ? 'true' : 'false'); });
  var sel = document.getElementById('jump'); if (sel && SCREENS[c]) sel.value = c;
  if (buildIndex.drawMode) buildIndex.drawMode();
}
/* lets the case study page jump the embedded prototype to a screen */
window.addEventListener('message', function (e) {
  if (e.origin !== location.origin) return;
  var d = e.data || {};
  if (d.set) Object.keys(d.set).forEach(function (k) { S[k] = d.set[k]; });
  if (d.jump && SCREENS[d.jump]) jump(d.jump);
  else if (d.set) render(false);
  if (d.sheet !== undefined) { S.sheet = d.sheet || null; render(false); }
  if (d.mode) { S.mode = d.mode; render(false); }
});
function boot() {
  if (document.getElementById('idx')) buildIndex();
  var h = (location.hash || '').replace('#', '');
  if (h && SCREENS[h]) jump(h); else render(true);
}
