/* DermaSafe prototype — dermatologist care module */
function D() { return DOCS[S.doc]; }
function fee() { return S.consult === 'video' ? D().video : D().clinic; }
function heartBtn(id) { var on = !!S.saved[id]; return '<button class="ib" aria-label="' + (on ? 'Remove from saved' : 'Save doctor') + '" aria-pressed="' + on + '" data-act="save:' + id + '" style="' + (on ? 'color:var(--pri);background:var(--hl-soft)' : '') + '"><svg class="i" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style="' + (on ? 'fill:currentColor' : '') + '">' + ICONS.heart + '</svg></button>'; }
ACTS.save = function (id) { S.saved[id] = !S.saved[id]; render(false); toast(S.saved[id] ? 'Saved to your doctors' : 'Removed from saved'); };
ACTS.openDoc = function (id) { S.doc = id; S.docTab = 'about'; go('doctor'); };
function docCard(id) {
  var d = DOCS[id];
  return `<div class="card" style="gap:12px">
    <div class="row" style="gap:12px;align-items:flex-start">${avatar(d.ini, d.hue)}<div class="li-m"><span class="li-t">${d.name}</span><span class="li-s">${d.role}</span><span class="row small" style="gap:10px;margin-top:4px">${stars(d.rating)}<span class="muted">${d.yrs} yrs</span><span class="muted row" style="gap:3px">${ic('pin', 13)}${d.km}</span></span></div>${heartBtn(id)}</div>
    <div class="row between"><span class="row" style="gap:6px">${d.now ? chip('ok', 'Available now') : chip('unk', 'Next: tomorrow')}${chip('pri', 'Video', 'video')}</span><span class="num small"><b>₹${d.video}</b> <span class="muted">video</span></span></div>
    ${btn('View profile', 'data-act="openDoc:' + id + '"', 's')}
  </div>`;
}

reg('care', { title: 'Dermatologist care', group: 'Tabs', tab: 'care', render: function () {
  var up = S.booked ? `<div class="card edge-ok"><div class="row between"><span class="t3">Upcoming consult</span>${chip('ok', S.consult === 'video' ? 'Video' : 'In clinic')}</div>
      <div class="row" style="gap:12px">${avatar(D().ini, D().hue)}<div class="li-m"><span class="li-t">${D().name}</span><span class="li-s">${S.day} Oct, ${S.slot}</span></div></div>
      <div class="grid2"><button class="btn b-p b-sm" style="width:100%" data-act="toast:${encodeURIComponent('Joining video call (demo)')}">${ic('video', 16)}Join</button><button class="btn b-s b-sm" style="width:100%" data-go="chat">${ic('msg', 16)}Message</button></div></div>` : '';
  return `<div class="pad" style="padding-top:30px">
    <span class="chip c-ok" style="align-self:flex-start">${ic('shield', 14)}Registered dermatologists only</span>
    <h1 class="t1">Dermatologist care</h1>
    <p class="lead">Get professional advice when you need more than an ingredient check.</p>
    ${up}
    <button class="card" data-go="find" style="border:0;cursor:pointer;text-align:left;color:inherit;background:var(--hl-soft);flex-direction:row;align-items:center;gap:14px">
      <span class="li-ic" style="background:var(--pri);color:var(--pri-ink);width:48px;height:48px;border-radius:16px">${ic('search', 22)}</span><span class="li-m"><span class="li-t" style="font-size:16px">Find a dermatologist</span><span class="li-s">Video from ₹600, or visit a clinic near you</span></span>${ic('right', 18)}</button>
    <div class="card"><div class="row between"><span class="t3">Your dermatologists</span><button class="btn b-t b-sm" style="padding:0" data-go="savedDocs">All saved</button></div>
      <div class="list">${['d1', 'd2'].map(function (k) { var d = DOCS[k]; return li({ act: 'openDoc:' + k, t: d.name, s: d.role, right: d.now ? chip('ok', 'Available') : '' }).replace('<span class="li-m">', avatar(d.ini, d.hue) + '<span class="li-m">'); }).join('')}</div></div>
    <div class="card" style="padding:4px 16px"><div class="list">
      ${li({ icon: 'cal', go: 'appointments', t: 'Appointments', s: S.booked ? '1 upcoming' : 'Upcoming and past' })}
      ${li({ icon: 'msg', go: 'chat', t: 'Continue conversation', s: DOCS.d1.name })}
      ${li({ icon: 'file', go: 'summary', t: 'Last consultation summary', s: DOCS.d2.name + ', Sep' })}
    </div></div>
  </div>`;
}});

reg('find', { title: 'Find a dermatologist', group: 'Dermatologist care', base: 'care', render: function () {
  var f = [['now', 'Available now'], ['video', 'Video'], ['top', 'Top rated'], ['near', 'Nearby']];
  var ids = Object.keys(DOCS).filter(function (k) { return !S.find.now || DOCS[k].now; });
  return `${hdr({ title: 'Find a dermatologist' })}<div class="pad">
    <div class="field" style="position:relative"><label for="fd" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Search doctors or concerns</label><input class="input" id="fd" type="search" placeholder="Search doctors, clinics or concerns" style="padding-left:42px"><span style="position:absolute;left:14px;top:15px;color:var(--ink2)">${ic('search', 18)}</span></div>
    <div class="row" style="gap:8px;overflow-x:auto;padding-bottom:2px">${f.map(function (x) { return '<button class="pick" style="flex:none" aria-pressed="' + !!S.find[x[0]] + '" data-act="findF:' + x[0] + '">' + x[1] + '</button>'; }).join('')}</div>
    <span class="small muted">${ids.length} dermatologists match, for itching and sensitivity</span>
    ${ids.map(docCard).join('')}
  </div>`;
}});
ACTS.findF = function (k) { S.find[k] = !S.find[k]; render(false); };

reg('doctor', { title: 'Doctor profile & availability', group: 'Dermatologist care', base: 'find', render: function () {
  var d = D(), body;
  if (S.docTab === 'about') body = `<p class="p">Focuses on sensitive skin, eczema and reactions to cosmetics. Often uses patch testing to confirm suspected allergens.</p><div class="card" style="gap:0"><div class="kv"><span class="muted">Languages</span><span>${d.lang}</span></div><div class="kv"><span class="muted">Video consult</span><b class="num">₹${d.video}</b></div><div class="kv"><span class="muted">Clinic visit</span><b class="num">₹${d.clinic}</b></div><div class="kv"><span class="muted">Registration</span>${chip('ok', 'Verified', 'shield')}</div></div>`;
  else if (S.docTab === 'reviews') body = [['5', 'Explained the patch test clearly and didn’t rush.', 'Video, Sep'], ['4', 'Helpful. The clinic was busy so I waited 20 minutes.', 'Clinic, Aug']].map(function (r) { return '<div class="card" style="gap:6px">' + stars(r[0] + '.0') + '<p class="p">' + r[1] + '</p><span class="small muted">' + r[2] + '</span></div>'; }).join('');
  else body = `<div class="empty-img" style="height:120px;width:100%">${ic('pin', 28)}</div><div class="card" style="gap:0"><div class="kv"><span class="muted">Clinic</span><span>${d.clinicName}</span></div><div class="kv"><span class="muted">Hours</span><span>Mon to Sat, 10:00 to 19:00</span></div><div class="kv"><span class="muted">Distance</span><span>${d.km}</span></div></div>`;
  var days = ['Thu 23', 'Fri 24', 'Sat 25'], times = ['10:00', '11:30', '13:00', '16:30', '18:00', '18:30'];
  return `${hdr({ title: 'Doctor', right: heartBtn(S.doc) })}<div class="pad" style="padding-bottom:110px">
    <div class="row" style="gap:14px">${avatar(d.ini, d.hue).replace('class="avatar"', 'class="avatar" data-x')}<div class="li-m"><h1 class="t2" style="font-size:22px">${d.name}</h1><span class="li-s">${d.role}</span><span class="row small" style="gap:10px;margin-top:4px">${stars(d.rating)}<span class="muted">${d.reviews} reviews</span><span class="muted">${d.yrs} yrs</span></span></div></div>
    ${segc('docTab', [['about', 'About'], ['reviews', 'Reviews'], ['clinic', 'Clinic']])}
    ${body}
    <span class="t3">Availability</span>
    <div class="row" style="gap:8px">${days.map(function (x) { return '<button class="pick" style="flex:1;justify-content:center" aria-pressed="' + (S.day === x) + '" data-act="set:day:' + x + '">' + x + '</button>'; }).join('')}</div>
    <div class="grid3">${times.map(function (x) { var off = x === '13:00'; return '<button class="pick" style="justify-content:center' + (off ? ';opacity:.4;text-decoration:line-through' : '') + '" ' + (off ? 'disabled aria-label="' + x + ' booked"' : '') + ' aria-pressed="' + (S.slot === x) + '" data-act="set:slot:' + x + '">' + x + '</button>'; }).join('')}</div>
  </div>
  <div style="position:sticky;bottom:0;z-index:4;background:var(--surf);border-top:1px solid var(--line);padding:12px 20px 18px;display:flex;align-items:center;gap:14px">
    <div class="stack" style="gap:0"><span class="small muted">${S.day}, ${S.slot}</span><b class="num">from ₹${d.video}</b></div>
    <button class="btn b-p" style="flex:1" data-go="consultType">Book consult</button></div>`;
}});

reg('consultType', { title: 'Consultation type', group: 'Dermatologist care', base: 'doctor', render: function () {
  return `${hdr({ title: 'Consultation type' })}<div class="pad">
    <h1 class="t1">How would you like to meet?</h1>
    <div class="stack">${opt('consult', 'video', 'Video consult, ₹' + D().video, '20 minutes from home. Share photos and your analysis.', 'video')}${opt('consult', 'clinic', 'Clinic visit, ₹' + D().clinic, D().clinicName + '. Patch testing available.', 'clinic')}</div>
    ${btn('Continue', 'data-go="handoff"')}
  </div>`;
}});

reg('handoff', { title: 'AI to dermatologist handoff', group: 'Dermatologist care', base: 'doctor', render: function () {
  return `${hdr({ title: 'Share with doctor' })}<div class="pad">
    <h1 class="t1">What ${D().name.replace('Dr. ', 'Dr ')} will see</h1>
    <p class="lead">Your analysis saves time in the consult. Choose exactly what to share.</p>
    <div class="card" style="padding:4px 16px;gap:0">
      ${sw('shConcern', 'Your concern', '“' + S.concern + '”')}
      ${sw('shProduct', 'Product checked', PRODUCT.name)}
      ${sw('shIngredients', 'Ingredient list', '12 ingredients, from the label')}
      ${sw('shFlags', 'Red flags', 'Fragrance (moderate), lactic acid with retinol')}
      ${sw('shScore', 'Fit score and confidence', '58, high confidence')}
      ${sw('shPhotos', 'Skin photos', 'Off. You can add photos in chat')}
    </div>
    <div class="well" style="flex-direction:row;gap:10px;align-items:flex-start">${ic('info', 18)}<span class="small">AI results are labelled as AI so the doctor can make their own judgement.</span></div>
    ${btn('Continue to booking', 'data-go="booking"')}
  </div>`;
}});

reg('booking', { title: 'Booking & payment', group: 'Dermatologist care', base: 'doctor', render: function () {
  var f = fee(), total = f + 49;
  return `${hdr({ title: 'Confirm & pay' })}<div class="pad">
    <div class="card"><div class="row" style="gap:12px">${avatar(D().ini, D().hue)}<div class="li-m"><span class="li-t">${D().name}</span><span class="li-s">${S.consult === 'video' ? 'Video consult' : 'Clinic visit'}, ${S.day} Oct, ${S.slot}</span></div></div></div>
    <div class="card" style="gap:0"><div class="kv"><span>Consult fee</span><span class="num">₹${f}</span></div><div class="kv"><span>Booking fee</span><span class="num">₹49</span></div><div class="kv"><b>Total</b><b class="num">₹${total}</b></div></div>
    <span class="t3">Pay with</span>
    <div class="stack">${opt('pay', 'upi', 'UPI', 'Any UPI app', 'phone')}${opt('pay', 'card', 'Card', 'Credit or debit', 'card')}${opt('pay', 'net', 'Net banking', '', 'clinic')}</div>
    <p class="small muted">Free cancellation up to 2 hours before. The booking fee is how DermaSafe earns from consults.</p>
    ${btn('Pay ₹' + total, 'data-act="pay"', 'p', 'lock')}
  </div>`;
}});
ACTS.pay = function () { S.booked = true; go('confirmed'); };

reg('confirmed', { title: 'Appointment confirmed', group: 'Dermatologist care', base: 'care', render: function () {
  return `${hdr({ noBack: true })}<div class="pad" style="align-items:stretch;text-align:center;padding-top:20px">
    <span style="align-self:center;width:84px;height:84px;border-radius:28px;background:var(--ok-bg);color:var(--ok);display:grid;place-items:center">${ic('check', 40)}</span>
    <h1 class="t1">You’re booked</h1>
    <p class="lead">${D().name}, ${S.consult === 'video' ? 'video consult' : 'clinic visit'}<br>${S.day} October at ${S.slot}</p>
    <div class="card" style="text-align:left;gap:0"><div class="kv"><span class="muted">Shared with doctor</span><span>Concern, product, flags, score</span></div><div class="kv"><span class="muted">Reminder</span><span>1 hour before</span></div></div>
    ${btn('Add to calendar', 'data-act="toast:' + encodeURIComponent('Added to calendar') + '"', 's', 'cal')}
    ${btn('Message the doctor', 'data-go="chat"', 'p', 'msg')}
    <button class="btn b-t" data-tab="home">Back to home</button>
  </div>`;
}});

reg('chat', { title: 'Chat with dermatologist', group: 'Dermatologist care', base: 'care', render: function () {
  var d = DOCS.d1;
  var bubbles = S.chat.map(function (m) {
    if (m.img) return '<div style="align-self:flex-end;max-width:70%" class="stack"><div class="empty-img" style="height:120px;width:200px">' + ic('image', 30) + '</div><span class="small muted" style="text-align:right">' + m.img + '</span></div>';
    return '<div style="align-self:' + (m.me ? 'flex-end' : 'flex-start') + ';max-width:80%;padding:11px 14px;border-radius:18px;' + (m.me ? 'border-bottom-right-radius:6px;background:var(--pri);color:var(--pri-ink)' : 'border-bottom-left-radius:6px;background:var(--surf);box-shadow:var(--shadow)') + '" class="p">' + m.t + '</div>';
  }).join('');
  return `<header class="hdr"><button class="ib" data-back aria-label="Back">${ic('left')}</button><div class="row hdr-mid" style="gap:10px">${avatar(d.ini, d.hue).replace('width:48px', '')}<div class="li-m"><span class="li-t">${d.name}</span><span class="li-s row" style="gap:5px"><span class="dot"></span>Online</span></div></div><button class="ib" aria-label="Start video call" data-act="toast:${encodeURIComponent('Starting video call (demo)')}">${ic('video')}</button></header>
  <div class="pad" style="gap:10px;padding-bottom:16px">
    <div class="card" style="gap:8px;align-self:flex-end;max-width:88%;box-shadow:inset 0 0 0 1.5px var(--ai-bg),var(--shadow)">
      <span class="row small" style="gap:6px;color:var(--ai);font-weight:600">${ic('sparkle', 15)}Shared analysis</span>
      <span class="li-t">${PRODUCT.name}</span><span class="row wrap" style="gap:6px">${chip('warn', 'Fragrance: moderate')}${chip('warn', 'Fit 58')}</span>
      <button class="btn b-t b-sm" style="justify-content:flex-start;padding:0" data-act="sheet:share">See what was shared</button></div>
    ${bubbles}
  </div>
  <div style="position:sticky;bottom:0;z-index:4;background:var(--surf);border-top:1px solid var(--line);padding:10px 12px 16px;display:flex;gap:8px;align-items:flex-end">
    <button class="ib" aria-label="Attach a photo" data-act="sheet:attach">${ic('clip')}</button>
    <label for="msg" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Message</label>
    <input class="input" id="msg" placeholder="Write a message" style="min-height:44px;border-radius:14px;flex:1;padding:10px 14px" autocomplete="off">
    <button class="ib" aria-label="Send" data-act="send" style="background:var(--pri);color:var(--pri-ink)">${ic('send')}</button>
  </div>`;
}, after: function () { var s = document.getElementById('scroller'); if (s) s.scrollTop = s.scrollHeight; var m = document.getElementById('msg'); if (m && !m._k) { m._k = 1; m.addEventListener('keydown', function (e) { if (e.key === 'Enter') ACTS.send(); }); } } });
ACTS.send = function () {
  var m = document.getElementById('msg'); if (!m || !m.value.trim()) return;
  S.chat.push({ me: true, t: m.value.trim().replace(/</g, '&lt;') }); render(false);
  later(function () { if (cur() !== 'chat') return; S.chat.push({ me: false, t: 'Thanks, noted. We’ll go through this in our consult.' }); render(false); }, 1300);
  var n = document.getElementById('msg'); if (n) n.focus();
};
SHEETS.share = { label: 'Shared analysis', render: function () {
  return `<h2 class="t2">What you shared</h2><p class="small muted">The doctor sees these labelled as AI results, not a diagnosis.</p>
    <div class="card" style="gap:0"><div class="kv"><span>Concern</span>${src('u')}</div><div class="kv"><span>Ingredient list</span>${src('l')}</div><div class="kv"><span>Fragrance flag, moderate</span>${src('ai')}</div><div class="kv"><span>Fit score 58, high confidence</span>${src('ai')}</div><div class="kv"><span>Skin photos</span><span class="small muted">Not shared</span></div></div>
    ${btn('Change what’s shared', 'data-go="handoff"', 's')}${btn('Done', 'data-close')}`;
}};
SHEETS.attach = { label: 'Attach a photo', render: function () {
  return `<h2 class="t2">Attach a photo</h2>
    <div class="card" style="padding:4px 16px"><div class="list">${li({ icon: 'file', act: 'attachProduct', t: 'Product or label photo', s: 'Helps the doctor see the exact formula' })}${li({ icon: 'camera', act: 'sheet:consent', t: 'Photo of your skin', s: 'Only this doctor can see it' })}</div></div>`;
}};
ACTS.attachProduct = function () { S.chat.push({ img: 'Label photo, ' + PRODUCT.name }); S.sheet = null; render(false); };
SHEETS.consent = { label: 'Skin photo consent', render: function () {
  return `<h2 class="t2">Before you share a skin photo</h2>
    <div class="stack small" style="gap:8px">${['Only ' + DOCS.d1.name + ' can see it', 'It’s never used to train AI', 'Delete it from the chat any time'].map(function (x) { return '<span class="row">' + ic('lock', 16) + x + '</span>'; }).join('')}</div>
    <div class="well" style="background:var(--warn-bg);color:var(--warn);flex-direction:row;gap:10px">${ic('alert', 18)}<span class="small">Avoid including your face or identifying marks unless the doctor asks.</span></div>
    <div class="empty-img" style="height:150px">${ic('image', 34)}</div>
    ${btn('Share photo with doctor', 'data-act="attachSkin"')}${btn('Cancel', 'data-close', 's')}`;
}};
ACTS.attachSkin = function () { S.chat.push({ img: 'Skin photo, shared privately' }); S.sheet = null; render(false); };

reg('appointments', { title: 'Appointments & history', group: 'Dermatologist care', base: 'care', render: function () {
  var up = S.booked
    ? `<div class="card"><div class="row" style="gap:12px">${avatar(D().ini, D().hue)}<div class="li-m"><span class="li-t">${D().name}</span><span class="li-s">${S.consult === 'video' ? 'Video' : 'Clinic'}, ${S.day} Oct, ${S.slot}</span></div></div><div class="grid3"><button class="btn b-p b-sm" style="width:100%;padding:0" data-act="toast:${encodeURIComponent('Joining (demo)')}">Join</button><button class="btn b-s b-sm" style="width:100%;padding:0" data-go="chat">Message</button><button class="btn b-s b-sm" style="width:100%;padding:0" data-go="doctor">Reschedule</button></div></div>`
    : `<div class="well" style="align-items:center;text-align:center;padding:24px">${ic('cal', 28)}<span class="t3">No upcoming consults</span><span class="small muted">Book a video or clinic visit with a dermatologist.</span>${btn('Find a dermatologist', 'data-go="find"')}</div>`;
  var past = `<button class="card" data-go="summary" style="border:0;text-align:left;cursor:pointer;color:inherit"><div class="row" style="gap:12px">${avatar(DOCS.d2.ini, DOCS.d2.hue)}<div class="li-m"><span class="li-t">${DOCS.d2.name}</span><span class="li-s">Video consult, 12 Sep</span></div>${chip('ok', 'Summary ready')}</div></button>`;
  return `${hdr({ title: 'Appointments' })}<div class="pad">
    ${segc('apptTab', [['up', 'Upcoming'], ['past', 'Past']])}
    ${S.apptTab === 'up' ? up : past}
  </div>`;
}});

reg('summary', { title: 'Consultation summary', group: 'Dermatologist care', base: 'appointments', render: function () {
  return `${hdr({ title: 'Consult summary' })}<div class="pad">
    <div class="row" style="gap:12px">${avatar(DOCS.d2.ini, DOCS.d2.hue)}<div class="li-m"><h1 class="t2">${DOCS.d2.name}</h1><span class="li-s">Video consult, 12 September</span></div></div>
    <div class="card"><span class="row small" style="gap:6px;color:var(--pri);font-weight:600">${ic('steth', 16)}From your dermatologist</span>
      <div class="stack" style="gap:4px"><span class="t3">Assessment</span><p class="p">Likely irritant contact dermatitis, possibly from fragrance. Not confirmed allergy.</p></div>
      <div class="stack" style="gap:4px"><span class="t3">Plan</span><ul class="stack small" style="margin:0;padding-left:18px;gap:6px"><li>Stop fragranced leave-on products for 4 weeks</li><li>Retinol on alternate nights only</li><li>Patch test if itching returns</li></ul></div>
      <div class="kv"><span class="muted">Follow-up</span><span>In 4 weeks</span></div></div>
    <div class="card" style="box-shadow:inset 0 0 0 1.5px var(--ai-bg),var(--shadow)"><span class="row small" style="gap:6px;color:var(--ai);font-weight:600">${ic('sparkle', 16)}AI context you shared</span><p class="small muted" style="margin:0">Fragrance flag (moderate) and lactic acid with retinol conflict, from DermaSafe. Shown here so you can see what the doctor had.</p></div>
    ${btn('Add fragrance to my avoid list', 'data-act="toast:' + encodeURIComponent('Added to your safety profile') + '"')}
  </div>`;
}});

reg('savedDocs', { title: 'Saved doctors', group: 'Dermatologist care', base: 'care', render: function () {
  var ids = Object.keys(S.saved).filter(function (k) { return S.saved[k]; });
  return `${hdr({ title: 'Saved doctors' })}<div class="pad">
    ${ids.length ? ids.map(docCard).join('') : '<div class="well" style="align-items:center;text-align:center;padding:24px">' + ic('heart', 28) + '<span class="t3">No saved doctors yet</span><span class="small muted">Tap the heart on a profile to keep it here.</span>' + btn('Find a dermatologist', 'data-go="find"') + '</div>'}
  </div>`;
}});
