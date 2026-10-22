/* DermaSafe prototype — profile, settings, trust center, clinical layer */

reg('profile', { title: 'Profile', group: 'Tabs', tab: 'profile', render: function () {
  return `<div class="pad" style="padding-top:30px">
    <div class="row" style="gap:14px"><span class="avatar" style="width:60px;height:60px;border-radius:20px;background:#C98A6B;font-size:22px">S</span>
      <div class="stack" style="gap:3px"><h1 class="t1" style="font-size:26px">Sarah</h1><span class="row" style="gap:6px">${chip('ok', 'Free plan')}<span class="small muted">5 checks this month</span></span></div></div>
    <span class="t3">Your skin</span>
    <div class="card" style="padding:4px 16px"><div class="list">${li({ icon: 'shield', go: 'safety', t: 'Safety profile', s: 'Allergies, concerns, ingredients to avoid' })}</div></div>
    <span class="t3">Dermatologist care</span>
    <div class="card" style="padding:4px 16px"><div class="list">
      ${li({ icon: 'cal', go: 'appointments', t: 'Appointments', s: S.booked ? '1 upcoming' : 'No upcoming visits' })}
      ${li({ icon: 'clock', act: 'pastAppts', t: 'Consultation history' })}
      ${li({ icon: 'heart', go: 'savedDocs', t: 'Saved doctors' })}
      ${li({ icon: 'search', go: 'find', t: 'Find a dermatologist' })}
    </div></div>
    <span class="t3">Settings</span>
    <div class="card" style="padding:4px 16px"><div class="list">
      ${li({ icon: 'lock', go: 'privacy', t: 'Privacy & data' })}
      ${li({ icon: 'moon', go: 'appearance', t: 'Appearance', s: { light: 'Light', dark: 'Dark', system: 'Match system' }[S.mode] })}
      ${li({ icon: 'bell', go: 'notifications', t: 'Notifications' })}
      ${li({ icon: 'type', go: 'accessibility', t: 'Accessibility' })}
      ${li({ icon: 'gem', go: 'subscription', t: 'Plan & billing', s: 'Safety checks are free forever' })}
    </div></div>
    <span class="t3">Trust & transparency</span>
    <div class="card" style="padding:4px 16px"><div class="list">
      ${li({ icon: 'shield', go: 'trust', t: 'Trust center' })}
      ${li({ icon: 'book', go: 'methodology', t: 'Open methodology', s: 'Version 1.0' })}
      ${li({ icon: 'users', go: 'advisors', t: 'Clinical advisors' })}
      ${li({ icon: 'clinic', go: 'pilot', t: 'Clinic pilot programme' })}
    </div></div>
    <button class="card" data-go="clinicView" style="border:0;cursor:pointer;text-align:left;color:inherit;flex-direction:row;align-items:center;gap:12px;background:#182027;color:#E7EEF3">
      <span class="li-ic" style="background:#202A33;color:#7FB7E0">${ic('grid')}</span><span class="li-m"><span class="li-t">Clinic view</span><span class="li-s" style="color:#9BABB8">For partner dermatologists reviewing AI flags</span></span>${ic('right', 18)}</button>
    ${btn('Sign out', 'data-act="signout"', 't', 'logout')}
  </div>`;
}});
ACTS.signout = function () { S.stack = ['login']; render(true); };
ACTS.pastAppts = function () { S.apptTab = 'past'; go('appointments'); };

reg('safety', { title: 'Safety profile', group: 'Profile', base: 'profile', render: function () {
  return `${hdr({ title: 'Safety profile' })}<div class="pad">
    <p class="lead">We check every product against this. Only you can see it.</p>
    <div class="card"><div class="row between"><span class="t3">Known allergies</span><button class="btn b-t b-sm" style="padding:0" data-act="toast:${encodeURIComponent('Add allergy (demo)')}">Add</button></div>
      <div class="row wrap" style="gap:6px">${chip('crit', 'Nickel', 'octagon')}${chip('warn', 'Fragrance (suspected)', 'alert')}</div><span class="small muted">“Suspected” items are flagged more gently than confirmed ones.</span></div>
    <div class="card"><span class="t3">Concerns</span><div class="row wrap" style="gap:6px">${chip('unk', 'Itching')}${chip('unk', 'Sensitivity')}</div></div>
    <div class="card"><span class="t3">Ingredients to avoid</span><div class="row wrap" style="gap:6px">${chip('unk', 'Parfum')}${chip('unk', 'Linalool')}${chip('unk', 'Limonene')}</div></div>
    <div class="card"><span class="t3">Your routine</span><div class="list">${li({ go: 'conflict', t: 'Retinol serum', s: 'Night' })}${li({ go: 'history', t: 'Gentle cleanser', s: 'Morning and night' })}</div></div>
    <div class="card"><span class="t3">Previously flagged products</span><div class="list">${li({ go: 'redflags', t: PRODUCT.name, s: 'Fragrance, routine conflict', right: chip('warn', '58') })}</div></div>
  </div>`;
}});

reg('subscription', { title: 'Plan & billing', group: 'Profile', base: 'profile', render: function () {
  return `${hdr({ title: 'Plan' })}<div class="pad">
    <h1 class="t1">Safety checks stay free</h1>
    <div class="card edge-ok"><div class="row between"><span class="t2">Free</span>${chip('ok', 'Your plan')}</div>
      <div class="stack small" style="gap:8px">${['Unlimited product checks', 'Every red flag, score and source', 'Safety profile and history', 'Flag-as-wrong with human review'].map(function (x) { return '<span class="row">' + ic('check', 16) + x + '</span>'; }).join('')}</div></div>
    <div class="card"><div class="row between"><span class="t2">Plus</span><span class="num"><b style="font:700 22px var(--f-d)">₹149</b><span class="small muted"> / month</span></span></div>
      <div class="stack small" style="gap:8px">${['Routine tracker with patch-test reminders', 'Export reports to share with your doctor', 'Priority dermatologist booking'].map(function (x) { return '<span class="row">' + ic('plus', 16) + x + '</span>'; }).join('')}</div>
      <span class="small muted">Plus never changes what a safety check tells you.</span>
      ${btn('Try Plus free for 14 days', 'data-act="toast:' + encodeURIComponent('Trial started (demo)') + '"')}</div>
    <div class="well"><span class="t3">How we make money</span><span class="small">Plus subscriptions, a booking fee on dermatologist consults, and clearly labelled sponsored listings that never affect scores or rankings. We never sell your data.</span></div>
  </div>`;
}});

reg('privacy', { title: 'Privacy & data', group: 'Profile', base: 'profile', render: function () {
  return `${hdr({ title: 'Privacy' })}<div class="pad">
    <h1 class="t1">You decide what we keep</h1>
    <div class="card" style="padding:4px 16px;gap:0">
      ${sw('history', 'Save check history', 'Stored on your account, encrypted')}
      ${sw('personal', 'Personalized checks', 'Uses your safety profile to match ingredients')}
      ${sw('research', 'Allergy research', 'Anonymized. Off by default')}
      ${sw('marketing', 'Product emails', 'Off by default')}
    </div>
    <div class="card" style="padding:4px 16px"><div class="list">
      ${li({ icon: 'download', act: 'toast:' + encodeURIComponent('Export prepared. We’ll email a link (demo)'), t: 'Download my data' })}
      ${li({ icon: 'trash', act: 'sheet:deleteData', t: 'Delete all my data', s: 'Removes checks, profile and chats' })}
    </div></div>
  </div>`;
}});
SHEETS.deleteData = { label: 'Delete all data', render: function () {
  return `<h2 class="t2">Delete all your data?</h2><p class="p">This removes your checks, safety profile, saved doctors and chat history. Booked appointments stay with the clinic. This can’t be undone.</p>
    ${btn('Delete everything', 'data-act="deleted"', 'd', 'trash')}${btn('Keep my data', 'data-close', 's')}`;
}};
ACTS.deleted = function () { S.sheet = null; render(false); toast('Your data has been deleted (demo)'); };

reg('appearance', { title: 'Appearance (dark mode)', group: 'Profile', base: 'profile', render: function () {
  return `${hdr({ title: 'Appearance' })}<div class="pad">
    <h1 class="t1">Appearance</h1>
    <div class="grid3">${[['light', 'Light', 'sun', '#F6EEE8', '#FFFBF8', '#7A2318'], ['dark', 'Dark', 'moon', '#171110', '#221917', '#EC8A6E'], ['system', 'System', 'monitor', 'linear-gradient(90deg,#F6EEE8 50%,#171110 50%)', 'transparent', '#B4563F']].map(function (m) {
      return '<button class="opt" style="flex-direction:column;align-items:center;gap:8px;padding:10px" aria-pressed="' + (S.mode === m[0]) + '" data-act="setMode:' + m[0] + '"><span style="width:100%;height:84px;border-radius:12px;background:' + m[3] + ';display:flex;flex-direction:column;gap:6px;padding:10px;box-shadow:inset 0 0 0 1px var(--line)"><i style="height:10px;width:60%;border-radius:4px;background:' + m[5] + '"></i><i style="height:26px;border-radius:6px;background:' + (m[4] === 'transparent' ? 'rgba(127,127,127,.25)' : m[4]) + '"></i></span><span class="row small" style="gap:6px;font-weight:600">' + ic(m[2], 16) + m[1] + '</span></button>';
    }).join('')}</div>
    <p class="small muted">System follows your phone’s setting. Risk colours keep the same meaning in every theme.</p>
  </div>`;
}});
ACTS.setMode = function (m) { S.mode = m; render(false); };

reg('notifications', { title: 'Notifications', group: 'Profile', base: 'profile', render: function () {
  return `${hdr({ title: 'Notifications' })}<div class="pad"><h1 class="t1">Notifications</h1>
    <div class="card" style="padding:4px 16px;gap:0">${sw('nResults', 'Check results', 'When an analysis finishes')}${sw('nAppts', 'Appointments', 'Reminders 1 hour before')}${sw('nUpdates', 'Safety updates', 'If new evidence changes a past result')}${sw('nTips', 'Skincare tips', 'Weekly')}</div></div>`;
}});

reg('accessibility', { title: 'Accessibility', group: 'Profile', base: 'profile', render: function () {
  return `${hdr({ title: 'Accessibility' })}<div class="pad"><h1 class="t1">Accessibility</h1>
    <div class="card"><span class="t3">Text size</span>${segc('text', [['default', 'Default'], ['large', 'Large']])}<p class="p">Ingredient names stay readable at every size.</p></div>
    <div class="card" style="padding:4px 16px;gap:0"><div class="li" style="cursor:default"><div class="li-m"><span class="li-t" id="l-rm">Reduce motion</span><span class="li-s">Stops scanning and score animations</span></div><button class="sw" role="switch" aria-checked="${S.rm}" aria-labelledby="l-rm" data-act="rmTog"><i></i></button></div></div>
    <div class="well"><span class="small">Risk levels always use an icon and a word, never colour alone. Every button has a spoken label for screen readers.</span></div></div>`;
}});
ACTS.rmTog = function () { S.rm = !S.rm; render(false); };

reg('trust', { title: 'Trust center', group: 'Trust & clinic', base: 'profile', render: function () {
  return `${hdr({ title: 'Trust center' })}<div class="pad">
    <h1 class="t1">How DermaSafe earns your trust</h1>
    <p class="lead">What we check, who reviews it, and what we’ll never do.</p>
    <div class="card" style="padding:0 16px">
      ${acc('t1', 'Clinical oversight', '<span>Dermatologists review every severity rule before it goes live, and a sample of real flags every month.</span><button class="btn b-s b-sm" data-go="advisors">Meet the advisors</button>')}
      ${acc('t2', 'Methodology', '<span>Every result comes from published rules plus AI matching. Rules are open to read.</span><button class="btn b-s b-sm" data-go="methodology">Read the methodology</button>')}
      ${acc('t3', 'AI transparency', '<span><b>AI does:</b> read labels, match ingredients to your concern, explain in plain words.</span><span><b>AI doesn’t:</b> diagnose, set severity on its own, or hide uncertainty.</span>')}
      ${acc('t4', 'Accountability', '<span>Flag any result as wrong. A person reviews it, and corrections are logged with a date.</span>')}
      ${acc('t5', 'Business transparency', '<span>We earn from Plus, consult booking fees and labelled sponsored listings. Brands can’t pay to change a score or a ranking. We never sell data.</span>')}
    </div>
    <div class="well"><span class="t3">Our pledges</span><span class="small">Same rules for every brand. Uncertainty shown, not hidden. Your data, your choice.</span></div>
  </div>`;
}});

reg('advisors', { title: 'Clinical advisors', group: 'Trust & clinic', base: 'trust', render: function () {
  var adv = [['RD', '#6A4A8A', 'Dr. Ritu Deshpande', 'MD Dermatology, contact dermatitis', 'Reviewed 42 fragrance and preservative rules'], ['FA', '#3E6A6A', 'Dr. Farah Ali', 'Allergy and immunology', 'Leads the monthly flag audit']];
  return `${hdr({ title: 'Clinical advisors' })}<div class="pad">
    <h1 class="t1">Who reviews our rules</h1>
    <p class="lead">Advisors check how serious each ingredient risk is. They don’t treat users through the app.</p>
    ${adv.map(function (a) { return '<div class="card"><div class="row" style="gap:12px">' + avatar(a[0], a[1]) + '<div class="li-m"><span class="li-t">' + a[2] + '</span><span class="li-s">' + a[3] + '</span></div>' + chip('unk', 'Example') + '</div><span class="small">' + a[4] + '</span></div>'; }).join('')}
    <div class="card"><span class="t3">How rules are made</span>
      <ol class="stack small" style="margin:0;padding-left:20px;gap:8px"><li>We draft a rule from published evidence.</li><li>An advisor reviews and sets the severity.</li><li>Real-world flags and feedback are audited monthly.</li></ol></div>
  </div>`;
}});

reg('pilot', { title: 'Clinic pilot programme', group: 'Trust & clinic', base: 'profile', render: function () {
  var loop = ['User gets a flag', 'User marks it wrong or books a consult', 'Case goes to the clinic queue', 'Dermatologist gives a verdict', 'Rule is adjusted if needed', 'Change is logged publicly'];
  return `${hdr({ title: 'Clinic pilot' })}<div class="pad">
    <h1 class="t1">Help make ingredient checks safer</h1>
    <p class="lead">For dermatology clinics. Review real flags from your area and shape the rules your patients see.</p>
    <div class="card"><div class="stack small" style="gap:8px">${['Paid per reviewed case', 'Clinic listed in Doctors, clearly marked as a partner', 'Anonymized cases only'].map(function (x) { return '<span class="row">' + ic('check', 16) + x + '</span>'; }).join('')}</div></div>
    <div class="card"><span class="t3">The feedback loop</span><ol class="stack" style="list-style:none;padding:0;margin:0;gap:8px">${loop.map(function (s, i) { return '<li class="row small" style="gap:10px"><span class="li-ic" style="width:28px;height:28px;border-radius:9px;font:600 12.5px var(--f-b)">' + (i + 1) + '</span>' + s + '</li>'; }).join('')}</ol></div>
    ${btn('Join the clinical pilot', 'data-go="clinicView"')}
  </div>`;
}});

reg('methodology', { title: 'Open methodology', group: 'Trust & clinic', base: 'profile', render: function () {
  var st = [['Read the label', 'Barcode, photo or search gives us the ingredient list.'], ['Verify the list', 'We match it to the label or the brand’s published list.'], ['Normalize names', 'INCI names are mapped to one record each.'], ['Match your profile', 'Allergies, concerns and routine are compared.'], ['Apply rules', 'Published, clinically reviewed rules set the severity.'], ['AI explains', 'AI writes the plain-language reason and links evidence.'], ['Score fit', 'Four weighted factors produce the fit score.'], ['Show confidence', 'Missing data lowers confidence and is shown to you.']];
  return `${hdr({ title: 'Methodology' })}<div class="pad">
    <div class="row between"><h1 class="t1">How a check works</h1>${chip('pri', 'v1.0')}</div>
    <div class="card" style="padding:0 16px">${st.map(function (s, i) { return acc('m' + i, (i + 1) + '. ' + s[0], '<span>' + s[1] + '</span>'); }).join('')}</div>
    <div class="card"><span class="t3">An open rule</span><pre class="code"><b>IF</b> product contains a labelled fragrance allergen
<b>AND</b> user reports itching or sensitivity
<b>THEN</b> flag as Moderate, explain, suggest a patch test</pre><span class="small muted">Reviewed by a clinical advisor, March 2026</span></div>
    <div class="card" style="padding:8px;overflow-x:auto"><table class="tbl"><thead><tr><th scope="col"></th><th scope="col">Rules</th><th scope="col">AI</th><th scope="col">Dermatologist</th></tr></thead><tbody>
      <tr><th scope="row">Sets severity</th><td>Yes</td><td>No</td><td>Reviews it</td></tr>
      <tr><th scope="row">Explains in plain words</th><td>No</td><td>Yes</td><td>In consults</td></tr>
      <tr><th scope="row">Diagnoses</th><td>No</td><td>No</td><td>Yes, in consults</td></tr></tbody></table></div>
    <div class="card"><span class="t3">Change history</span><div class="list small">
      <div class="kv"><span>v1.0, Mar 2026</span><span>Fragrance allergen rules reviewed</span></div>
      <div class="kv"><span>v0.9, Jan 2026</span><span>Retinol and acid conflict added</span></div></div></div>
  </div>`;
}});

reg('clinicView', { title: 'Clinic view (dashboard)', group: 'Trust & clinic', base: 'profile', render: function () {
  var q = [['CV-041', 'Fragrance flag disputed', 'User reports no reaction', 'warn', 'Today'], ['CV-039', 'Lactic acid + retinol', 'Severity check requested', 'ai', 'Today'], ['CV-036', 'Unknown botanical extract', 'Ingredient unidentified', 'unk', 'Yesterday']];
  return `<div class="clinic">${hdr({ title: 'Clinic view' })}<div class="pad">
    <div class="stack" style="gap:4px"><span class="small muted">Skinwise Clinic, partner</span><h1 class="t1" style="font-size:25px">Review queue</h1></div>
    <div class="grid3">${[['12', 'Pending'], ['38', 'This week'], ['1.4 d', 'Median review']].map(function (s) { return '<div class="well num" style="gap:2px;padding:12px"><b style="font:700 22px var(--f-d)">' + s[0] + '</b><span class="small muted">' + s[1] + '</span></div>'; }).join('')}</div>
    <div class="card" style="padding:4px 16px"><div class="list">${q.map(function (c) { return li({ go: 'clinicCase', t: c[0] + '  ' + c[1], s: c[2] + ', ' + c[4], right: chip(c[3], c[3] === 'warn' ? 'Disputed' : c[3] === 'ai' ? 'Severity' : 'Unknown') }); }).join('')}</div></div>
    <div class="well"><div class="row between small"><span>Methodology</span><b>v1.0</b></div><span class="small muted">Example dashboard data for the prototype.</span></div>
  </div></div>`;
}});

reg('clinicCase', { title: 'Clinic case review', group: 'Trust & clinic', base: 'clinicView', render: function () {
  var v = [['agree', 'Agree with the flag'], ['adjust', 'Adjust severity'], ['insufficient', 'Insufficient evidence'], ['incorrect', 'Incorrect match'], ['moreinfo', 'Needs more information']];
  return `<div class="clinic">${hdr({ title: 'CV-041' })}<div class="pad">
    <h1 class="t1" style="font-size:24px">Fragrance flag disputed</h1>
    <div class="card" style="gap:0"><div class="kv"><span class="muted">Product</span><span>${PRODUCT.name}</span></div><div class="kv"><span class="muted">Flag</span>${chip('warn', 'Moderate: Parfum, Linalool')}</div><div class="kv"><span class="muted">User report</span><span>Itching after moisturizers</span></div><div class="kv"><span class="muted">Dispute</span><span>“I use it without any reaction”</span></div></div>
    <div class="card">${chip('ai', 'AI assessment', 'sparkle')}<p class="p">Rule FRG-02 fired: labelled fragrance allergen and reported itching. Confidence high. Amount not disclosed.</p><span class="small muted">Evidence: EU fragrance allergen labelling list; contact dermatitis patch-test series</span></div>
    <span class="t3">Your verdict</span>
    <div class="stack">${v.map(function (x) { return opt('verdict', x[0], x[1]); }).join('')}</div>
    <div class="field"><label for="cnote">Notes for the methodology team</label><textarea class="input" id="cnote" rows="3" placeholder="Optional"></textarea></div>
    ${btn('Submit review', 'data-act="verdict"')}
  </div></div>`;
}});
ACTS.verdict = function () { if (!S.verdict) { toast('Choose a verdict first'); return; } S.verdict = null; back(); later(function () { toast('Review submitted'); }, 50); };

/* ---------- component library: every part below is the same code the screens use ---------- */
reg('components', { title: 'Component library', group: 'Trust & clinic', base: 'profile', render: function () {
  if (!S.libSeg) S.libSeg = 'all';
  function grp(t, body) { return '<div class="card"><span class="t3">' + t + '</span>' + body + '</div>'; }
  return `${hdr({ title: 'Component library' })}<div class="pad">
    <h1 class="t1">One system, every screen</h1>
    <p class="lead">These are the live components all 45 screens are built from.</p>
    ${grp('Buttons', '<div class="stack" style="gap:8px">' + btn('Primary action', '', 'p') + btn('Secondary', '', 's') + '<div class="row" style="gap:8px">' + btn('Small', '', 's b-sm') + btn('Text link', '', 't') + '</div></div>')}
    ${grp('Risk status (icon + word, never colour alone)', '<div class="row wrap" style="gap:6px">' + status('fine') + status('mod') + status('high') + status('unk') + status('routine') + '</div>')}
    ${grp('Source labels', srcs(['v', 'c', 'ai', 'l', 'x']))}
    ${grp('Progress', steps(4))}
    ${grp('Segmented control', segc('libSeg', [['all', 'All 12'], ['review', 'To review 3'], ['fine', 'Fine 9']]))}
    ${grp('Toggle and list row', '<div class="list" style="margin:0 -16px">' + sw('libA', 'Save my check history', 'Kept on your account') + li({ icon: 'shield', t: 'Trust center', s: 'How results are made', go: 'trust' }) + '</div>')}
    ${grp('Input', '<div class="field"><label for="libIn">Product name</label><input class="input" id="libIn" placeholder="e.g. Kumkumadi tailam"></div>')}
    ${grp('Choice', opt('libOpt', 'a', 'Mild', 'Slight itching or redness') + opt('libOpt', 'b', 'Severe', 'Swelling, hives or blistering'))}
  </div>`;
}});
