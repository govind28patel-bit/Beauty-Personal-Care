/* DermaSafe prototype — start, home, 7-stage check flow, results, edge states */

document.addEventListener('input', function (e) {
  var b = e.target.getAttribute && e.target.getAttribute('data-bind');
  if (b) S[b] = e.target.value;
});

function labelStrip(small) {
  return '<p class="label-strip"' + (small ? ' style="font-size:11.5px"' : '') + '>Ingredients: ' + INGS.map(function (i) {
    var t = i.inci.toUpperCase();
    return i.flag ? '<mark>' + t + '</mark>' : t;
  }).join(', ') + '.</p>';
}

/* ================= START ================= */
reg('login', { title: 'Welcome & sign in', group: 'Start', render: function () {
  return `<div class="pad" style="padding-top:48px;gap:22px;min-height:100%">
    <div class="row between">${patchMark(48)}<span class="chip c-ai">${ic('sparkle', 14)}AI-assisted, evidence-informed</span></div>
    <h1 class="t1" style="font-size:38px">Know what’s going on your skin.</h1>
    <p class="lead">Check skincare ingredients, spot possible conflicts, and get a personal safety check with the reason behind every answer.</p>
    <div class="card" style="gap:10px">
      <span class="small muted">On the label</span>
      <p class="label-strip" style="font-size:12.5px">Aqua, Glycerin, Niacinamide, <mark>Parfum</mark>, <mark>Linalool</mark>…</p>
      <div class="well" style="flex-direction:row;align-items:flex-start;gap:12px;background:var(--hl-soft)">
        <span style="color:var(--pri);margin-top:2px">${ic('sparkle', 18)}</span>
        <div class="stack" style="gap:4px"><span class="t3">Parfum means added fragrance</span><span class="small muted">It can irritate sensitive skin. We matched it to the itching you described.</span></div>
      </div>
    </div>
    <div class="stack" style="margin-top:auto">
      ${btn('Get started', 'data-go="consent"')}
      ${btn('I already have an account', 'data-act="sheet:signin"', 's')}
    </div>
    <p class="small muted row" style="align-items:flex-start">${ic('lock', 16)}<span>Your skin data stays private and is never shared without your permission.</span></p>
  </div>`;
}});
SHEETS.signin = { label: 'Sign in', render: function () {
  return `<h2 class="t2">Sign in</h2>
    <div class="field"><label for="em">Email</label><input class="input" id="em" type="email" placeholder="you@example.com" autocomplete="email"></div>
    ${btn('Continue with email', 'data-act="signin"')}
    <div class="row" style="gap:10px"><span style="flex:1;height:1px;background:var(--line)"></span><span class="small muted">or</span><span style="flex:1;height:1px;background:var(--line)"></span></div>
    <div class="grid3">${['Google', 'Apple', 'Phone OTP'].map(function (x) { return '<button class="btn b-s b-sm" style="width:100%" data-act="signin">' + x + '</button>'; }).join('')}</div>
    <p class="small muted">We only use your sign-in to save your checks. No marketing unless you turn it on.</p>`;
}};
ACTS.signin = function () { S.sheet = null; S.stack = ['home']; render(true); };

reg('consent', { title: 'Privacy consent', group: 'Start', base: 'login', render: function () {
  return `${hdr({})}<div class="pad" style="gap:18px">
    <span class="li-ic" style="width:56px;height:56px;border-radius:18px;background:var(--hl-soft)">${ic('shield', 28)}</span>
    <h1 class="t1">Your data. Your choice.</h1>
    <p class="lead">We use your information to personalize ingredient and safety checks. You control what we keep and how it’s used.</p>
    <div class="card" style="gap:0;padding:6px 16px">
      ${sw('personal', 'Personalize my checks', 'Uses your concerns and allergies to match ingredients')}
      ${sw('history', 'Save my check history', 'Kept on your account so you can look back')}
      ${sw('research', 'Help improve allergy research', 'Anonymized. Off unless you turn it on')}
    </div>
    <div class="well" style="flex-direction:row;gap:10px;align-items:flex-start">${ic('lock', 18)}<span class="small">Your allergy data is never sold. You can download or delete it any time in Profile.</span></div>
    ${btn('Continue', 'data-go="concern"')}
    <button class="btn b-t" data-go="trust">Read how we use data</button>
  </div>`;
}});

/* ================= HOME (tab) ================= */
reg('home', { title: 'Home dashboard', group: 'Tabs', tab: 'home', render: function () {
  var appt = S.booked ? `<button class="card" data-go="appointments" style="border:0;text-align:left;cursor:pointer;flex-direction:row;align-items:center;gap:12px">${avatar(DOCS[S.doc].ini, DOCS[S.doc].hue)}<span class="li-m"><span class="small muted">Upcoming video consult</span><span class="li-t">${DOCS[S.doc].name}</span><span class="li-s">${S.day} Oct, ${S.slot}</span></span>${ic('right', 18)}</button>` : '';
  return `<div class="pad" style="padding-top:30px;gap:18px">
    <div class="row between"><div class="stack" style="gap:2px"><span class="muted">Good morning</span><h1 class="t1" style="font-size:30px">Sarah</h1></div>
      <button class="ib" data-tab="profile" aria-label="Profile" style="border-radius:16px;background:#C98A6B;color:#fff;font:600 16px var(--f-d)">S</button></div>

    <button class="card" data-act="startCheck" style="border:0;text-align:left;cursor:pointer;background:var(--pri);color:var(--pri-ink);gap:14px;padding:20px;position:relative;overflow:hidden">
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true" style="position:absolute;right:-30px;top:-30px;opacity:.18"><rect x="10" y="10" width="130" height="130" rx="44" fill="none" stroke="currentColor" stroke-width="10"></rect><circle cx="75" cy="75" r="14" fill="currentColor"></circle></svg>
      <span class="row" style="gap:8px">${ic('scan', 22)}<span style="font:600 13px var(--f-b);opacity:.85">New check</span></span>
      <span style="font:600 25px/1.15 var(--f-d);letter-spacing:-.02em;max-width:240px">Is this product right for your skin?</span>
      <span class="row" style="gap:8px;font-weight:600">Scan, snap a label, or search ${ic('right', 18)}</span>
    </button>

    ${appt}

    <div class="card">
      <div class="row between"><span class="t3">Your concern</span><button class="btn b-t b-sm" style="padding:0 6px" data-go="concern">Update</button></div>
      <p class="p">“${S.concern}”</p>
      <div class="row wrap" style="gap:6px">${chip('ai', 'May relate to sensitivity', 'sparkle')}${chip('unk', 'Avoiding fragrance')}</div>
    </div>

    <div class="card">
      <span class="t3">Built on trust</span>
      <div class="stack small" style="gap:9px">
        <span class="row" style="align-items:flex-start;gap:10px"><span style="color:var(--ok)">${ic('users', 18)}</span>Severity rules reviewed by dermatologists</span>
        <span class="row" style="align-items:flex-start;gap:10px"><span style="color:var(--ok)">${ic('shield', 18)}</span>Safety checks stay free, always</span>
        <span class="row" style="align-items:flex-start;gap:10px"><span style="color:var(--ok)">${ic('lock', 18)}</span>No brand can pay to change a score</span>
      </div>
      <button class="btn b-t b-sm" style="justify-content:flex-start;padding:0" data-go="methodology">See our methodology</button>
    </div>

    <button class="card" data-tab="care" style="border:0;text-align:left;cursor:pointer;flex-direction:row;align-items:center;gap:14px">
      <span class="li-m"><span class="li-t">Need a dermatologist?</span><span class="li-s">Video or in-clinic. Share your analysis in one tap.</span>
      <span class="row" style="gap:0;margin-top:8px">${['d1', 'd2', 'd3'].map(function (k, i) { return '<span class="avatar" style="width:32px;height:32px;border-radius:11px;font-size:12px;border:2px solid var(--surf);background:' + DOCS[k].hue + (i ? ';margin-left:-8px' : '') + '">' + DOCS[k].ini + '</span>'; }).join('')}<span class="small muted" style="margin-left:8px">3 available today</span></span></span>
      ${ic('right', 18)}
    </button>

    <div class="row between"><h2 class="t2">Recent checks</h2><button class="btn b-t b-sm" style="padding:0 6px" data-tab="history">See all</button></div>
    <div class="card" style="padding:4px 16px">
      <div class="list">
        ${li({ go: 'redflags', t: PRODUCT.name, s: 'Today', right: chip('warn', '58', 'alert') })}
        ${li({ go: 'solution', t: ALT.name, s: 'Today', right: chip('ok', '86', 'check') })}
        ${li({ go: 'missing', t: 'Daily Gel Sunscreen SPF 50', s: 'Last week', right: chip('unk', 'Data missing', 'help') })}
      </div>
    </div>
  </div>`;
}});

/* ================= FLOW ================= */
reg('concern', { title: 'State your concern', group: 'Check flow', base: 'home', render: function () {
  var labels = ['Itching', 'Redness', 'Burning', 'Dryness', 'Acne', 'Rash', 'Sensitivity', 'Dark spots', 'Allergic reaction', 'Other'];
  return `${hdr({ step: 2 })}<div class="pad">
    <h1 class="t1">What are you concerned about?</h1>
    <p class="lead">Tell us what you’re experiencing, in your own words.</p>
    <div class="field"><label for="cn">Describe it</label>
      <div style="position:relative"><textarea class="input" id="cn" rows="4" data-bind="concern" style="padding-right:58px;min-height:120px">${S.concern}</textarea>
      <button class="ib" aria-label="Speak instead of typing" data-act="toast:${encodeURIComponent('Listening… (voice input demo)')}" style="position:absolute;right:8px;bottom:10px;background:var(--ai-bg);color:var(--ai)">${ic('mic')}</button></div>
      <span class="small muted">Mention when it happens and what you used.</span></div>
    <span class="t3">Or pick what fits</span>
    <div class="row wrap" style="gap:8px" role="group" aria-label="Common concerns">${labels.map(function (l) { var on = !!S.chips[l]; return '<button class="pick" aria-pressed="' + on + '" data-act="chip:' + l + '">' + (on ? ic('check', 16) : '') + l + '</button>'; }).join('')}</div>
    <div class="well" style="background:var(--ai-bg);color:var(--ai)">
      <span class="row small" style="gap:8px;font-weight:600">${ic('sparkle', 16)}Live interpretation</span>
      <span class="small" style="color:var(--ink)">This may be related to <b>skin sensitivity or irritation</b>. We’ll check fragrance, acids and common allergens first.</span>
    </div>
    <p class="small muted row" style="align-items:flex-start">${ic('info', 16)}<span>We don’t diagnose. We use this to check ingredients against what you feel.</span></p>
    ${btn('Continue', 'data-go="concernAI"')}
  </div>`;
}});
ACTS.chip = function (l) { S.chips[l] = !S.chips[l]; render(false); };

reg('concernAI', { title: 'Concern: AI interpretation', group: 'Check flow', base: 'home', render: function () {
  var picked = Object.keys(S.chips).filter(function (k) { return S.chips[k]; });
  return `${hdr({ step: 2 })}<div class="pad">
    <h1 class="t1">Here’s what we understood</h1>
    <div class="well"><span class="row" style="gap:8px">${src('u')}</span><p class="p">“${S.concern}”</p><div class="row wrap" style="gap:6px">${picked.map(function (p) { return chip('unk', p); }).join('')}</div></div>
    <div class="card" style="box-shadow:inset 0 0 0 1.5px var(--ai-bg),var(--shadow)">
      <div class="row between">${chip('ai', 'AI interpretation', 'sparkle')}<span class="small muted">Confidence <b style="color:var(--ink)">High</b></span></div>
      <span class="t3">This may be related to</span>
      <div class="stack" style="gap:8px">
        <div class="row between well" style="flex-direction:row;padding:12px"><span class="li-t">Skin sensitivity or irritation</span>${chip('ai', 'Most likely')}</div>
        <div class="row between well" style="flex-direction:row;padding:12px"><span class="li-t">A reaction to one ingredient</span>${chip('unk', 'Possible')}</div>
      </div>
      <span class="small muted">We’ll look closely at fragrance, exfoliating acids, common allergens and your current routine.</span>
    </div>
    <div class="well" style="background:var(--warn-bg);color:var(--warn);flex-direction:row;gap:10px;align-items:flex-start">${ic('alert', 18)}<span class="small">Swelling, blisters or trouble breathing? Stop using the product and get medical help now.</span></div>
    ${btn('Looks right, add a product', 'data-go="add"')}
    ${btn('Edit what I said', 'data-back', 's')}
  </div>`;
}});

reg('add', { title: 'Add product: scan, photo, search', group: 'Check flow', base: 'home', render: function () {
  var body;
  if (S.addMode === 'barcode') body = `<div class="vf" role="img" aria-label="Camera viewfinder scanning a barcode">
      <div class="frame"><span class="c" style="top:0;left:0;border-width:4px 0 0 4px;border-radius:14px 0 0 0"></span><span class="c" style="top:0;right:0;border-width:4px 4px 0 0;border-radius:0 14px 0 0"></span><span class="c" style="bottom:0;left:0;border-width:0 0 4px 4px;border-radius:0 0 0 14px"></span><span class="c" style="bottom:0;right:0;border-width:0 4px 4px 0;border-radius:0 0 14px 0"></span>
      <div class="bars">${[3, 6, 2, 4, 8, 2, 5, 3, 7, 2, 4, 6, 2, 5, 3, 8, 2, 4].map(function (w) { return '<i style="width:' + w + 'px"></i>'; }).join('')}</div><span class="laser"></span></div>
      <span class="chip c-ok" style="position:absolute;bottom:16px">${ic('check', 14)}Barcode detected</span></div>
      <p class="small muted">Hold the barcode inside the frame. We then match it to the ingredient label.</p>`;
  else if (S.addMode === 'photo') body = `<div class="vf" role="img" aria-label="Camera framing an ingredient label"><div style="width:250px;height:170px;border:2px dashed var(--hl);border-radius:16px;display:grid;place-items:center;padding:16px"><p class="label-strip" style="color:#E9D6CC;font-size:10.5px;line-height:1.8;text-align:center">AQUA, GLYCERIN, NIACINAMIDE, CETEARYL ALCOHOL, CERAMIDE NP, PARFUM…</p></div>
      <button class="ib" aria-label="Take photo" style="position:absolute;bottom:14px;width:60px;height:60px;border-radius:50%;background:#fff;color:#2B1D1A" data-go="found">${ic('camera', 24)}</button></div>
      <p class="small muted">Lay the pack flat in daylight and fill the frame with the ingredient list.</p>
      ${btn('Upload a label photo instead', 'data-act="toast:' + encodeURIComponent('Photo library opened (demo)') + '"', 's', 'upload')}`;
  else body = `<div class="field"><label for="q">Product name or brand</label><input class="input" id="q" type="search" value="hydrating moisturizer"></div>
      <div class="card" style="padding:4px 16px"><div class="list">
        ${li({ go: 'found', t: PRODUCT.name, s: PRODUCT.brand + ', ' + PRODUCT.size, right: src('v') })}
        ${li({ go: 'missing', t: 'Hydra Gel Cream', s: 'Brand unverified', right: src('x') })}
      </div></div>
      <button class="btn b-t" data-go="notfound">My product isn’t listed</button>`;
  return `${hdr({ step: 3 })}<div class="pad">
    <h1 class="t1">Which product are you checking?</h1>
    ${segc('addMode', [['barcode', 'Barcode', 'scan'], ['photo', 'Label photo', 'camera'], ['search', 'Search', 'search']])}
    ${body}
    ${S.addMode === 'barcode' ? btn('Use this product', 'data-go="found"') : ''}
  </div>`;
}});

reg('found', { title: 'Product found', group: 'Check flow', base: 'home', render: function () {
  return `${hdr({ step: 3 })}<div class="pad">
    <span class="chip c-ok" style="align-self:flex-start" role="status">${ic('check', 14)}Product found</span>
    <div class="card" style="flex-direction:row;gap:16px;align-items:center">${productArt(92, 112)}
      <div class="stack" style="gap:4px"><span class="small muted">${PRODUCT.brand}</span><h1 class="t2" style="font-size:21px">${PRODUCT.name}</h1><span class="small muted">${PRODUCT.cat}, ${PRODUCT.size}</span></div></div>
    <div class="grid3">
      <div class="well num" style="align-items:center;gap:2px;padding:12px 6px"><b style="font:700 22px var(--f-d)">12</b><span class="small muted">ingredients</span></div>
      <div class="well num" style="align-items:center;gap:2px;padding:12px 6px;background:var(--hl-soft)"><b style="font:700 22px var(--f-d);color:var(--pri)">3</b><span class="small muted">to review</span></div>
      <div class="well" style="align-items:center;gap:2px;padding:12px 6px"><b style="font:700 18px/1.35 var(--f-d)">Label</b><span class="small muted">source</span></div>
    </div>
    <div class="card" style="gap:0">
      <span class="t3" style="padding-bottom:10px">Where this data comes from</span>
      <div class="kv"><span>Product details</span>${src('v')}</div>
      <div class="kv"><span>Ingredient list</span>${src('l')}</div>
      <div class="kv"><span>Formula date</span>${src('x')}</div>
      <button class="btn b-t b-sm" style="justify-content:flex-start;padding:10px 0 0" data-act="sheet:verify">What does “verified” mean?</button>
    </div>
    ${btn('Analyze ingredients', 'data-go="analyzing"')}
    ${btn('Not this product', 'data-back', 's')}
  </div>`;
}});
SHEETS.verify = { label: 'What verified means', render: function () {
  return `<h2 class="t2">What “verified” means</h2>
    <div class="stack">
      <div class="well" style="background:var(--ok-bg)"><span class="t3" style="color:var(--ok)">It means</span><span class="small">The ingredient list matches the label photo or the brand’s published list, checked today.</span></div>
      <div class="well" style="background:var(--warn-bg)"><span class="t3" style="color:var(--warn)">It doesn’t mean</span><span class="small">That the product is safe for everyone, that we tested it, or that the brand paid us. Brands can’t buy verification.</span></div>
    </div>
    ${btn('Got it', 'data-close')}`;
}};

reg('analyzing', { title: 'AI analysis loading', group: 'Check flow', base: 'home', render: function () {
  var labels = [['Reading ingredients', 'Matching the label to our database'], ['Matching your concern', 'Looking for links to itching'], ['Checking conflicts', 'Comparing with your retinol serum'], ['Calculating confidence', 'Weighing how complete the data is']];
  var n = S.analyzing, done = n >= 4;
  return `${hdr({ step: 3 })}<div class="pad" style="align-items:stretch;gap:24px;padding-top:24px">
    <div class="loader" aria-hidden="true"><i></i><i></i><b></b></div>
    <div class="stack" style="align-items:center;gap:6px;text-align:center"><h1 class="t1" style="font-size:25px">${done ? 'Analysis complete' : 'Checking this product for you'}</h1><p class="lead">${PRODUCT.name}, 12 ingredients</p></div>
    <ol class="stack" style="list-style:none;padding:0;margin:0;gap:8px" aria-live="polite">
      ${labels.map(function (l, i) {
        var st = i < n ? 'done' : (i === n ? 'now' : 'wait');
        var mark = st === 'done' ? '<span class="li-ic" style="width:32px;height:32px;border-radius:50%;background:var(--ok-bg);color:var(--ok)">' + ic('check', 16) + '</span>' : (st === 'now' ? '<span style="width:32px;display:grid;place-items:center"><span class="spin"></span></span>' : '<span class="li-ic" style="width:32px;height:32px;border-radius:50%;font:600 13px var(--f-b);color:var(--ink2)">' + (i + 1) + '</span>');
        return '<li class="' + (st === 'done' ? 'card' : 'well') + '" style="flex-direction:row;align-items:center;gap:12px;padding:12px 14px;' + (st === 'wait' ? 'opacity:.6' : '') + '">' + mark + '<span class="li-m"><span class="li-t">' + l[0] + '</span><span class="li-s">' + l[1] + '</span></span></li>';
      }).join('')}
    </ol>
    ${done ? btn('See what’s inside', 'data-go="ingredients"') : '<p class="small muted row" style="justify-content:center">' + ic('lock', 16) + 'Nothing is shared while we check.</p>'}
  </div>`;
}});
ENTER.analyzing = function () {
  S.analyzing = 0;
  function tick() { if (cur() !== 'analyzing') return; S.analyzing++; render(false); if (S.analyzing < 4) later(tick, 1000); }
  later(tick, 900);
};

reg('ingredients', { title: 'Ingredient list', group: 'Check flow', base: 'home', render: function () {
  var f = S.ingFilter;
  var list = INGS.filter(function (i) { return f === 'all' || (f === 'review' ? (i.flag) : !i.flag); });
  return `${hdr({ step: 4 })}<div class="pad">
    <h1 class="t1">What’s inside this product?</h1>
    <div class="card" style="gap:8px">${labelStrip(true)}<span class="small muted">Highlighted ingredients are worth a closer look for you.</span></div>
    ${segc('ingFilter', [['all', 'All 12'], ['review', 'To review 3'], ['fine', 'Fine 9']])}
    <div class="stack">
      ${list.map(function (i) {
        var open = !!S.ingOpen[i.id];
        return `<div class="card" style="gap:0;padding:0;${i.match ? 'box-shadow:inset 0 0 0 1.5px var(--hl),var(--shadow)' : ''}">
          <button class="row" data-act="ingToggle:${i.id}" aria-expanded="${open}" style="width:100%;border:0;background:none;padding:14px 16px;text-align:left;cursor:pointer;color:inherit;font:inherit;align-items:flex-start;gap:12px">
            <span class="li-m"><span class="li-t">${i.inci}${i.plain !== i.inci ? ' <span class="muted" style="font-weight:500">(' + i.plain + ')</span>' : ''}</span><span class="li-s">${i.purpose}</span>${i.match ? '<span class="chip c-pri" style="align-self:flex-start;margin-top:6px">' + ic('flag', 13) + 'Matched to your concern</span>' : ''}</span>
            ${status(i.st)}
          </button>
          ${open ? `<div class="stack" style="padding:0 16px 16px;gap:10px"><p class="p">${i.note || i.purpose + '. No link to your concern.'}</p>${srcs(i.flag ? ['l', 'v', 'ai'] : ['l', 'v'])}<button class="btn b-s b-sm" style="width:100%" data-act="openIng:${i.id}">Tap to understand ${i.plain}</button></div>` : ''}
        </div>`;
      }).join('')}
    </div>
    <button class="well" data-go="advisors" style="border:0;cursor:pointer;flex-direction:row;align-items:center;gap:10px;text-align:left;color:inherit">${ic('users', 18)}<span class="small">Severity rules reviewed by our clinical advisors</span>${ic('right', 16)}</button>
    ${btn('Review 3 ingredients', 'data-go="redflags"')}
  </div>`;
}});
ACTS.ingToggle = function (id) { S.ingOpen[id] = !S.ingOpen[id]; render(false); };
ACTS.openIng = function (id) { S.ing = id; go('ing'); };

reg('ing', { title: 'Ingredient detail', group: 'Check flow', base: 'ingredients', render: function () {
  var i = ingById(S.ing), flagged = !!i.flag;
  return `${hdr({ title: 'Ingredient' })}<div class="pad">
    <div class="stack" style="gap:6px"><h1 class="t1">${i.plain}</h1><span class="muted">INCI name: ${i.inci}</span><span style="align-self:flex-start">${status(i.st)}</span></div>
    <div class="card"><span class="t3">In plain words</span><p class="p">${i.note || i.purpose + '.'}</p></div>
    <div class="card" style="gap:0">
      <div class="kv"><span>Function</span><b>${i.purpose}</b></div>
      <div class="kv"><span>Possible concerns</span><b>${flagged ? (i.id === 'lactic' ? 'Irritation with retinol' : 'Irritation, allergy') : 'None for you'}</b></div>
      <div class="kv"><span>Fit with your concern</span>${flagged && i.match ? chip('warn', 'Matched', 'alert') : chip('ok', 'No link', 'check')}</div>
      <div class="kv"><span>Evidence</span>${src(flagged ? 'd' : 'v')}</div>
      <div class="kv"><span>Amount in product</span>${src('x')}</div>
      <div class="kv"><span>AI confidence</span><b>High</b></div>
    </div>
    <div class="card" style="padding:0 16px">${acc('sci-' + i.id, 'Science details', '<span>' + i.inci + ' is listed on the label in descending order of amount. Exact percentages are rarely published by brands.</span>' + srcs(['l', 'd']))}</div>
    ${btn('Back to all ingredients', 'data-back', 's')}
  </div>`;
}});

/* ================= RESULTS ================= */
reg('redflags', { title: 'AI-reviewed red flags', group: 'Results', base: 'home', render: function () {
  var o = !!S.flagOpen.f1;
  return `${hdr({ step: 5 })}<div class="pad">
    <h1 class="t1">We found something worth checking.</h1>
    <p class="lead">A product-safety signal based on your information and the ingredient data. Not a diagnosis.</p>
    <div class="card edge-warn" style="gap:14px">
      <div class="row between"><span class="small muted">Flag 1 of 2</span>${status('mod')}</div>
      <div><h2 class="t2" style="font-size:23px">Fragrance</h2><span class="muted small">Parfum and Linalool</span></div>
      <div class="stack" style="gap:4px"><span class="t3">Why it matters</span><p class="p">Fragrance ingredients can trigger irritation or sensitivity in some people.</p></div>
      <div class="stack" style="gap:4px"><span class="t3">Why you’re seeing this</span><p class="p">You said your skin gets itchy after some moisturizers. This one contains fragrance.</p></div>
      <div class="grid3">
        <div class="well" style="padding:10px;gap:2px"><span class="small muted">Risk</span><b style="color:var(--warn)">Moderate</b></div>
        <div class="well" style="padding:10px;gap:2px"><span class="small muted">Confidence</span><b>High</b></div>
        <div class="well" style="padding:10px;gap:2px"><span class="small muted">Data</span><b style="color:var(--ok)">Verified</b></div>
      </div>
      ${srcs(['v', 'c', 'ai'])}
      <div class="row small" style="gap:8px;color:var(--ok);background:var(--ok-bg);padding:10px 12px;border-radius:12px">${ic('check', 16)}Severity rule reviewed by a dermatologist</div>
      <div style="border-top:1px solid var(--line)">
        <button class="acc-h" aria-expanded="${o}" data-act="flagOpen:f1"><span>Why was this flagged?</span>${ic('down', 18)}</button>
        ${o ? `<div class="stack small" style="gap:8px;padding-bottom:8px">
          <div class="row between"><span class="row">${ic('check', 16)}Found on the product label</span>${src('l')}</div>
          <div class="row between"><span class="row">${ic('check', 16)}Matches the itching you reported</span>${src('u')}</div>
          <div class="row between"><span class="row">${ic('check', 16)}Known irritant in the database</span>${src('v')}</div>
          <div class="row between"><span class="row">${ic('check', 16)}AI reviewed the match</span>${src('ai')}</div>
          <button class="btn b-t b-sm" style="justify-content:flex-start;padding:0" data-go="sources">See full reasoning and sources</button></div>` : ''}
      </div>
      <div class="grid2"><button class="btn b-s b-sm" style="width:100%" data-act="sheet:flagWrong">${ic('flag', 16)}Flag as wrong</button><button class="btn b-s b-sm" style="width:100%" data-go="find">${ic('steth', 16)}Ask a dermatologist</button></div>
    </div>
    <button class="card" data-go="conflict" style="border:0;text-align:left;cursor:pointer;color:inherit;flex-direction:row;align-items:center;gap:12px">
      <span class="li-m"><span class="small muted">Flag 2 of 2</span><span class="li-t">Lactic Acid</span><span class="li-s">Low risk alone. We check it against your routine next.</span></span>${status('routine')}</button>
    <div class="well" style="flex-direction:row;gap:10px;align-items:flex-start">${ic('info', 18)}<span class="small">Itchy right now? Stop using the product and rinse with cool water. See a doctor if it spreads or swells.</span></div>
    ${btn('Check product safety', 'data-go="conflict"')}
    ${btn('View ingredient details', 'data-go="ingredients"', 's')}
  </div>`;
}});
ACTS.flagOpen = function (k) { S.flagOpen[k] = !S.flagOpen[k]; render(false); };
SHEETS.flagWrong = { label: 'Flag as wrong', render: function () {
  var r = [['notInProduct', 'This ingredient isn’t in my product'], ['noReaction', 'I use it without any reaction'], ['wrongSeverity', 'The risk level seems wrong'], ['other', 'Something else']];
  return `<h2 class="t2">What looks wrong?</h2><p class="small muted">Your feedback may be reviewed by our clinical team. It never changes your result automatically.</p>
    <div class="stack">${r.map(function (x) { return opt('flagReason', x[0], x[1]); }).join('')}</div>
    ${btn('Submit for human review', 'data-act="flagSubmit"' + (S.flagReason ? '' : ' disabled style="opacity:.5"'))}`;
}};
ACTS.flagSubmit = function () { if (!S.flagReason) return; S.sheet = null; S.flagReason = null; render(false); toast('Sent for human review'); };

reg('conflict', { title: 'Conflict detection', group: 'Results', base: 'home', render: function () {
  return `${hdr({ step: 6 })}<div class="pad">
    <h1 class="t1">Checking against your routine</h1>
    <div class="row wrap" style="gap:6px"><span class="small muted">You use:</span>${chip('unk', 'Retinol serum, night')}${chip('unk', 'Gentle cleanser')}</div>
    <div class="card edge-warn">
      <div class="row between"><span class="t3">Potential conflict</span>${status('mod')}</div>
      <div class="row" style="gap:8px">
        <div class="well" style="flex:1;gap:2px;padding:12px;background:var(--hl-soft)"><span class="small muted">This product</span><b style="font:600 17px var(--f-d)">Lactic Acid</b></div>
        <span style="font:700 22px var(--f-d);color:var(--pri)" aria-hidden="true">+</span>
        <div class="well" style="flex:1;gap:2px;padding:12px;background:var(--hl-soft)"><span class="small muted">Your serum</span><b style="font:600 17px var(--f-d)">Retinol</b></div>
      </div>
      <p class="p">Using these together may raise the chance of irritation for sensitive skin.</p>
      <div class="well"><span class="t3">Why this matters</span><span class="small">Both speed up skin renewal. Together they can leave skin drier and more reactive, which could add to the itching.</span></div>
    </div>
    <div class="card"><span class="t3">What you can do</span>
      <ol class="stack small" style="margin:0;padding-left:20px;gap:8px"><li>Use this moisturizer in the morning only.</li><li>Keep retinol for night, on its own.</li><li>Patch test first: a little on your inner arm for 48 hours.</li></ol></div>
    <div class="card" style="flex-direction:row;align-items:center;gap:10px;padding:12px 16px">${chip('ok', 'No conflict', 'check')}<span class="small">with your gentle cleanser</span></div>
    ${btn('See my safety score', 'data-go="score"')}
  </div>`;
}});

function scoreView(low) {
  var val = low ? 61 : 58;
  return `${hdr({ step: 6 })}<div class="pad">
    <h1 class="t1">How well does this product fit your needs?</h1>
    ${low ? `<div class="card edge-warn" style="background:var(--warn-bg)"><span class="row t3" style="color:var(--warn)">${ic('alert', 18)}We’re not confident enough to give a strong answer</span><span class="small">2 ingredients couldn’t be identified, so this score could be off by up to 9 points.</span><div class="grid2"><button class="btn b-s b-sm" style="width:100%" data-go="ingredients">Review ingredients</button><button class="btn b-p b-sm" style="width:100%" data-go="find">Ask a dermatologist</button></div></div>` : ''}
    <div class="patch" role="img" aria-label="Fit score ${val} out of 100, ${low ? 'low confidence' : 'use with caution'}">
      <svg width="220" height="220" viewBox="0 0 220 220" aria-hidden="true"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--hl)"></stop><stop offset="1" stop-color="var(--pri)"></stop></linearGradient></defs>
        <rect x="9" y="9" width="202" height="202" rx="58" fill="none" stroke="var(--surf2)" stroke-width="14"></rect>
        <rect class="ring" x="9" y="9" width="202" height="202" rx="58" fill="none" stroke="url(#pg)" stroke-width="14" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="${S.patchAnim ? 100 - val : 100}" data-to="${100 - val}"></rect></svg>
      <div class="patch-in"><b class="num">${low ? '52–70' : val}</b><span class="small muted">${low ? 'likely range' : 'out of 100'}</span></div>
    </div>
    <div class="stack" style="align-items:center;gap:4px;text-align:center">${low ? chip('unk', 'Low confidence', 'help') : chip('warn', 'Use with caution', 'alert')}<span class="small muted">A fit score for you, not a medical rating</span></div>
    <div class="grid2">
      ${[['Concern match', 'Poor', 'warn', 30], ['Ingredient risk', 'Moderate', 'warn', 55], ['Conflict risk', 'Moderate', 'warn', 50], ['Data confidence', low ? 'Low' : 'High', low ? 'unk' : 'ok', low ? 35 : 90]].map(function (d) {
        return '<div class="well" style="background:var(--' + d[2] + '-bg);gap:6px"><span class="small" style="color:var(--' + d[2] + ')">' + d[0] + '</span><b style="font:600 17px var(--f-d)">' + d[1] + '</b><span class="bar" style="background:var(--surf)"><i style="width:' + d[3] + '%;background:var(--' + d[2] + ')"></i></span></div>';
      }).join('')}
    </div>
    <div class="card" style="padding:0 16px">${acc('calc', 'How is this score calculated?', [['Concern compatibility', 35, 12], ['Ingredient risk', 30, 22], ['Known conflicts', 20, 10], ['Data quality', 15, low ? 8 : 14]].map(function (r) { return '<div class="stack" style="gap:5px"><div class="row between small"><span>' + r[0] + ' <span class="muted">weight ' + r[1] + '%</span></span><b class="num">' + r[2] + ' / ' + r[1] + '</b></div><span class="bar"><i style="width:' + Math.round(r[2] / r[1] * 100) + '%"></i></span></div>'; }).join('') + '<span class="small muted">AI confidence tells you how sure we are. It doesn’t change the score.</span>')}</div>
    ${btn('See what we’d recommend', 'data-go="solution"')}
  </div>`;
}
function animatePatch() { S.patchAnim = false; var r0 = document.querySelector('.patch .ring'); if (r0) r0.setAttribute('stroke-dashoffset', '100'); later(function () { S.patchAnim = true; var r = document.querySelector('.patch .ring'); if (r) r.style.strokeDashoffset = r.getAttribute('data-to'); }, 80); }
reg('score', { title: 'Conflict & safety score', group: 'Results', base: 'home', render: function () { return scoreView(false); } });
ENTER.score = animatePatch;

reg('solution', { title: 'Solution & confidence', group: 'Results', base: 'home', render: function () {
  return `${hdr({ step: 7 })}<div class="pad">
    <h1 class="t1">Here’s what we’d recommend.</h1>
    <p class="lead">For itchy, sensitive skin on retinol, a fragrance-free moisturizer without acids fits better.</p>
    <div class="card edge-ok" style="gap:14px">
      <div class="row between">${chip('ok', 'Better fit for your concern', 'check')}<span class="num" style="font:700 22px var(--f-d);color:var(--ok)">${ALT.score}</span></div>
      <div class="row" style="gap:14px">${productArt(64, 76, 'var(--ok)')}<div class="stack" style="gap:2px"><span class="small muted">${ALT.brand}</span><span class="t2">${ALT.name}</span></div></div>
      <div class="stack small" style="gap:8px"><span class="t3">Why we recommend this</span>
        ${['No fragrance or fragrance allergens', 'No acids, so it’s safe with your retinol', 'Ceramides to calm and repair the barrier', 'Ingredient data verified from the label'].map(function (r) { return '<span class="row" style="gap:10px;align-items:flex-start"><span style="color:var(--ok)">' + ic('check', 16) + '</span>' + r + '</span>'; }).join('')}</div>
      <span class="small muted">Not sponsored. Ranked only on fit for you.</span>
    </div>
    <div class="card">
      <div class="row between"><span class="t3">Confidence</span>${chip('ok', 'High', 'shield')}</div>
      <div class="grid2" style="gap:6px">${[['Ingredient data', 'Verified', 1], ['Your concern', 'Clear', 1], ['Safety evidence', 'Documented', 1], ['Amounts', 'Not disclosed', 0]].map(function (c) { return '<div class="row small" style="gap:6px;color:' + (c[2] ? 'var(--ok)' : 'var(--ink2)') + '">' + ic(c[2] ? 'check' : 'minusc', 16) + '<span style="color:var(--ink)">' + c[0] + ': <b>' + c[1] + '</b></span></div>'; }).join('')}</div>
      <span class="small muted">Based on verified ingredient information, your reported concern, and available safety data.</span>
    </div>
    <div class="card" style="box-shadow:inset 0 0 0 1.5px var(--ai-bg),var(--shadow);gap:10px">
      ${chip('ai', 'AI insight', 'sparkle')}
      <p class="p">You mentioned itching and sensitivity. We found fragrance in your product, which irritates some sensitive users, and an acid that clashes with your retinol.</p>
      <div class="kv small"><span class="muted">Data used</span><span>Label, ingredient database, your concern</span></div>
      <div class="kv small"><span class="muted">Next step</span><span>Patch test the alternative for 48 hours</span></div>
    </div>
    <div class="well" style="border:1.5px dashed var(--line);background:transparent">
      <div class="row between"><span class="chip c-unk">Sponsored</span><span class="small muted">Paid placement</span></div>
      <div class="row" style="gap:12px">${productArt(48, 56, 'var(--ink2)')}<span class="li-m"><span class="li-t">Cica Calm Moisturizer</span><span class="li-s">Not part of your ranking. Check it before buying.</span></span></div>
    </div>
    <button class="card" data-go="find" style="border:0;text-align:left;cursor:pointer;color:inherit;flex-direction:row;align-items:center;gap:12px">${avatar('AR', '#9A4A3A')}<span class="li-m"><span class="li-t">Want professional advice?</span><span class="li-s">Ask a dermatologist about this product</span></span>${ic('right', 18)}</button>
    ${btn('Save this analysis', 'data-act="saveAnalysis"', 'p', 'bookmark')}
    <div class="grid2">${btn('Compare', 'data-go="compare"', 's', 'layers')}${btn('Sources', 'data-go="sources"', 's', 'db')}</div>
    <button class="btn b-t" data-act="startCheck">Start a new scan</button>
  </div>`;
}});
ACTS.saveAnalysis = function () { toast('Analysis saved to History'); };

reg('compare', { title: 'Product comparison', group: 'Results', base: 'solution', render: function () {
  var rows = [['Fit score', '<b class="num" style="color:var(--warn);font:700 20px var(--f-d)">58</b>', '<b class="num" style="color:var(--ok);font:700 20px var(--f-d)">86</b>'], ['Fragrance', chip('warn', 'Contains'), chip('ok', 'None')], ['Allergens', 'Linalool', 'None'], ['Acids', 'Lactic acid', 'None'], ['With retinol', chip('warn', 'With care'), chip('ok', 'Works')], ['Barrier support', 'Niacinamide, ceramide', 'Ceramides, niacinamide'], ['Data', src('v'), src('v')], ['Price', '₹649', '₹720']];
  return `${hdr({ title: 'Compare' })}<div class="pad">
    <h1 class="t1">Side by side</h1><p class="lead">Judged against your itching and your retinol routine.</p>
    <div class="card" style="padding:4px 8px;overflow-x:auto"><table class="tbl"><thead><tr><th scope="col"></th><th scope="col">${PRODUCT.name}</th><th scope="col" style="color:var(--ok)">${ALT.name}</th></tr></thead><tbody>${rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; }).join('')}</tbody></table></div>
    ${btn('Save comparison', 'data-act="saveAnalysis"')}
  </div>`;
}});

reg('sources', { title: 'Data sources & AI explanation', group: 'Results', base: 'redflags', render: function () {
  var steps = [['l', 'Product label', 'Parfum and Linalool appear on the list you scanned today.'], ['v', 'Ingredient database', 'Linalool is one of the fragrance allergens EU rules require brands to label.'], ['u', 'What you told us', 'Itching after moisturizers. Retinol serum at night.'], ['ai', 'AI interpretation', 'Linked fragrance to your itching. High confidence: the ingredient is confirmed and the link is well documented.'], ['x', 'Fragrance amount', 'Brands don’t disclose it, so we can’t say how strong it is.']];
  return `${hdr({ title: 'Sources' })}<div class="pad">
    <h1 class="t1">Where this came from</h1><p class="lead">Every piece of the fragrance flag, and how much to trust it.</p>
    <div class="row wrap" style="gap:6px">${src('v')}${src('u')}${src('ai')}${src('x')}</div>
    <ol class="stack" style="list-style:none;padding:0;margin:0;gap:10px">${steps.map(function (s, i) { return '<li class="card" style="gap:8px"><div class="row between"><span class="t3">' + (i + 1) + '. ' + s[1] + '</span>' + src(s[0]) + '</div><p class="small muted" style="margin:0">' + s[2] + '</p></li>'; }).join('')}</ol>
    ${btn('Something looks wrong? Report it', 'data-act="sheet:flagWrong"', 's', 'flag')}
  </div>`;
}});

/* ================= EDGE STATES ================= */
reg('notfound', { title: 'Error: product not found', group: 'Edge states', base: 'add', render: function () {
  return `${hdr({ step: 3 })}<div class="pad">
    <span class="li-ic" style="width:56px;height:56px;border-radius:18px">${ic('search', 26)}</span>
    <h1 class="t1">We couldn’t verify this product.</h1>
    <p class="lead">It isn’t in our database yet. We won’t guess its ingredients, so add them another way.</p>
    <div class="card" style="padding:4px 16px"><div class="list">
      ${li({ icon: 'camera', go: 'found', t: 'Upload the ingredient label', s: 'Most accurate' })}
      ${li({ icon: 'edit', act: 'toast:' + encodeURIComponent('Manual entry opened (demo)'), t: 'Enter the product manually', s: 'Type the list from the pack' })}
      ${li({ icon: 'refresh', act: 'retake:barcode', t: 'Try another scan', s: 'Wipe the barcode, add light' })}
    </div></div>
  </div>`;
}});
reg('missing', { title: 'Error: ingredient data missing', group: 'Edge states', base: 'home', render: function () {
  return `${hdr({ step: 4 })}<div class="pad">
    <span class="chip c-warn" style="align-self:flex-start">${ic('alert', 14)}Incomplete data</span>
    <h1 class="t1">Some ingredients couldn’t be identified.</h1>
    <p class="lead">2 of 14 on Daily Gel Sunscreen SPF 50 didn’t match anything we know. The score will be less reliable.</p>
    <div class="card" style="gap:0">
      <div class="kv" style="align-items:flex-start"><span class="li-m"><span class="li-t">“EXTR. PLANT SPEC…”</span><span class="li-s">Cut off on the label</span></span>${src('x')}</div>
      <div class="kv" style="align-items:flex-start"><span class="li-m"><span class="li-t">Ingredient 9</span><span class="li-s">Photo too blurry to read</span></span>${src('x')}</div>
    </div>
    <div class="well"><div class="row between small"><span>Fit score</span><b class="num">52–70 (a range)</b></div><div class="row between small"><span>Confidence</span>${chip('unk', 'Lowered to Low')}</div></div>
    ${btn('Retake label photo', 'data-act="retake:photo"', 'p', 'camera')}
    ${btn('Continue with less confidence', 'data-go="lowconf"', 's')}
  </div>`;
}});
ACTS.retake = function (m) { S.addMode = m; go('add'); };
reg('lowconf', { title: 'Low confidence result', group: 'Edge states', base: 'home', render: function () { return scoreView(true); } });
ENTER.lowconf = animatePatch;

/* ================= HISTORY (tab) ================= */
reg('history', { title: 'Analysis history', group: 'Tabs', tab: 'history', render: function () {
  var items = [['Today', [['redflags', PRODUCT.name, chip('warn', '58', 'alert')], ['solution', ALT.name, chip('ok', '86', 'check')]]], ['Earlier', [['missing', 'Daily Gel Sunscreen SPF 50', chip('unk', 'Data missing', 'help')], ['solution', 'Calming Toner', chip('ok', '81', 'check')], ['conflict', 'Brightening Vitamin C Serum', chip('warn', '64', 'alert')]]]];
  return `<div class="pad" style="padding-top:30px">
    <h1 class="t1">Your checks</h1>
    <div class="field" style="position:relative"><label for="hs" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Search your checks</label><input class="input" id="hs" type="search" placeholder="Search your checks" style="padding-left:42px"><span style="position:absolute;left:14px;top:15px;color:var(--ink2)">${ic('search', 18)}</span></div>
    ${items.map(function (g) { return '<span class="t3">' + g[0] + '</span><div class="card" style="padding:4px 16px"><div class="list">' + g[1].map(function (i) { return li({ go: i[0], t: i[1], right: i[2] }); }).join('') + '</div></div>'; }).join('')}
  </div>`;
}});
