// Standalone visual assets. Each entry returns the inner HTML of one `.sheet`; build.js renders them to PNG.
const D = require("./data");
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const num = (n) => Math.round(n).toLocaleString("en-IN");

const FOOT = `<div class="foot"><span>AeroRun is a fictional product · Independent educational simulation · Not affiliated with or commissioned by Nike, Inc.</span><span>Portfolio Project 01</span></div>`;

// Stylised side-profile sneaker. The "aero lines" are the campaign's motif (deliberately no swoosh).
const shoe = (w = 420, body = "#fff", line = "#101217", accent = "#ff4f2e") => `
<svg width="${w}" viewBox="0 0 400 175" xmlns="http://www.w3.org/2000/svg" aria-label="Illustrative AeroRun sneaker silhouette">
  <path d="M30 128 L40 76 Q44 62 60 64 L100 72 Q118 74 128 60 L160 32 Q171 24 183 31 L250 82 Q300 102 352 110 Q386 116 389 130 Z" fill="${body}" stroke="${line}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M22 128 L390 128 Q394 150 372 154 L36 154 Q18 152 22 128 Z" fill="#f4f6f9" stroke="${line}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M36 154 L372 154 Q386 154 388 146" fill="none" stroke="${line}" stroke-width="6" stroke-linecap="round"/>
  <path d="M70 112 Q170 70 330 112" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
  <path d="M95 100 Q180 66 300 98" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity=".7"/>
  <path d="M120 88 Q190 62 270 86" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" opacity=".45"/>
  ${[0, 1, 2, 3, 4].map((i) => `<line x1="${180 + i * 14}" y1="${40 + i * 10}" x2="${170 + i * 14}" y2="${52 + i * 10}" stroke="${line}" stroke-width="3" stroke-linecap="round"/>`).join("")}
  <rect x="28" y="70" width="10" height="26" rx="4" fill="${accent}"/>
</svg>`;

const personas = [
  {
    key: "persona-1-aarav",
    initials: "AM", name: "Aarav Mehta", age: 21, city: "Pune",
    archetype: "The Feed-First Stylist",
    role: "Final-year B.Com student · part-time reel editor",
    facts: [["Income", "Pocket money + freelance gigs (assumed)"], ["Platforms", "Instagram Reels, YouTube Shorts, Myntra, AJIO"], ["Shops", "Online, mostly during sale events"], ["Decision", "Independent, but asks friends on DMs"]],
    quote: "If I'm spending six grand, it has to look good in every fit.",
    goals: ["Look current on campus and on his feed", "Own one 'real' big-brand pair", "Get outfit ideas that he can copy"],
    motivations: ["Peer validation and compliments", "Creator-inspired outfits", "Feeling 'upgraded' from local brands"],
    pains: ["₹5,999 is a considered purchase, so he waits for sales", "Has seen fake sneakers sold through Instagram ads", "Can't try on before buying online"],
    triggers: ["A creator he trusts styling the shoe 3 ways", "Clear 'official store only' authenticity cue", "UPI / no-cost EMI at checkout"],
    win: "Lead with fit-check creator Reels; answer 'is it worth ₹5,999?' with the price ladder; remove fake-product fear with official-store cues.",
    meters: [["Price sensitivity", 85], ["Style motivation", 90], ["Creator influence", 80], ["Brand loyalty", 35]],
  },
  {
    key: "persona-2-meera",
    initials: "MI", name: "Meera Iyer", age: 24, city: "Bengaluru",
    archetype: "The Versatile Professional",
    role: "Junior UX designer, second year in her first job",
    facts: [["Income", "Salaried, own disposable income (assumed)"], ["Platforms", "Instagram (saves a lot), Pinterest, Nykaa Fashion, Myntra"], ["Shops", "Researches for a week, buys once"], ["Decision", "Independent, reads reviews closely"]],
    quote: "I want one pair that works from the office to Sunday brunch.",
    goals: ["One versatile pair for office, metro and weekends", "A clean, minimalist look", "All-day comfort for commuting"],
    motivations: ["Versatility and value per wear", "Curated, 'quietly stylish' aesthetic", "Comfort she can feel by evening"],
    pains: ["Trend pairs at ₹10,000+ feel steep for one of several pairs", "Comfort claims feel vague", "Few women-led styling references, sizing doubts"],
    triggers: ["'3 ways to wear it' carousels from women creators", "Honest reviews and ratings", "Easy size exchange"],
    win: "Win on versatility and comfort proof: styling carousels, women creators, visible reviews and a no-hassle exchange promise.",
    meters: [["Price sensitivity", 55], ["Style motivation", 80], ["Creator influence", 60], ["Review reliance", 90]],
  },
  {
    key: "persona-3-kabir",
    initials: "KS", name: "Kabir Singh", age: 19, city: "Delhi NCR",
    archetype: "The Culture Climber",
    role: "First-year engineering student, new to sneaker culture",
    facts: [["Income", "Depends on family; big buys need parents' approval"], ["Platforms", "Instagram, YouTube sneaker reviews, WhatsApp groups"], ["Shops", "Watches drops online; buys for birthdays and festivals"], ["Decision", "Shared: he persuades, a parent pays (hypothesis)"]],
    quote: "I want to get into sneakers, but limited pairs cost more than my phone.",
    goals: ["Credibility with peers who follow sneakers", "Start a collection without resale prices", "Own something that doesn't look 'basic'"],
    motivations: ["Belonging to a culture", "Newness and 'drop' excitement", "Recognition from sneaker creators"],
    pains: ["Worried about authenticity", "Fears AeroRun looks like an entry-level shoe", "Needs a case to convince a parent"],
    triggers: ["A limited launch colourway", "Unboxing by sneaker creators he follows", "Festival or birthday gifting moments"],
    win: "Give him culture cues (limited launch colourway, sneaker-creator unboxing) and a gift-friendly reason his parents will accept.",
    meters: [["Price sensitivity", 75], ["Style motivation", 85], ["Creator influence", 90], ["Hype seeking", 80]],
  },
];

function personaSheet(p) {
  const list = (a) => `<ul>${a.map((x) => `<li>${x}</li>`).join("")}</ul>`;
  return `
  <div class="kicker">Customer persona · proto-persona built from secondary research + hypotheses</div>
  <h1>${p.archetype}</h1>
  <div class="sub">Not a real person. Every attribute is a <b>hypothesis</b> to validate with the proposed survey (Appendix A).</div>
  <div class="persona">
    <div class="id">
      <div class="avatar">${p.initials}</div>
      <h2>${p.name}, ${p.age}</h2>
      <div class="role">${p.role} · ${p.city}</div>
      <div class="facts">${p.facts.map(([k, v]) => `<div><b>${k}</b>${v}</div>`).join("")}</div>
      <blockquote>“${p.quote}”<small>Illustrative line written for this persona. Not a quote from a real interview.</small></blockquote>
    </div>
    <div class="grid">
      <div class="card"><h3>Goals</h3>${list(p.goals)}</div>
      <div class="card"><h3>Motivations</h3>${list(p.motivations)}</div>
      <div class="card"><h3>Pain points</h3>${list(p.pains)}</div>
      <div class="card"><h3>Purchase triggers</h3>${list(p.triggers)}</div>
      <div class="card"><h3>Profile (estimated)</h3>${p.meters.map(([k, v]) => `<div class="meter"><span>${k}</span><span class="bar"><i style="width:${v}%"></i></span></div>`).join("")}</div>
      <div class="card" style="background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center">${shoe(300, "#1b2340", "#fff")}</div>
      <div class="card win"><h3>How AeroRun wins ${p.name.split(" ")[0]}</h3><div style="font-size:17px">${p.win}</div></div>
    </div>
  </div>${FOOT}`;
}

function journey() {
  const stages = [
    ["Discover", "Scroll & spot"], ["Consider", "Save & compare"], ["Evaluate", "Doubt & check"], ["Purchase", "Decide & pay"], ["Wear & share", "Show & tell"],
  ];
  const rows = [
    ["Customer goal", ["Find what's new and stylish", "Picture it in my own outfits", "Make sure it's worth ₹5,999 and genuine", "Pay easily, get the right size", "Get compliments, justify the buy"]],
    ["Touchpoints", ["Reels feed, Explore, creator posts", "Profile grid, carousels, Story polls, saves", "Product page, reviews, comments, DMs to friends", "Product page checkout, UPI, EMI", "Unboxing, Stories, tags, reviews"]],
    ["Thinking / feeling", ["“That looks clean.” Curious", "“Would it work with my clothes?” Interested", "“Is ₹5,999 too much? Is it fake?” Anxious", "“Okay, doing it.” Relieved", "“People noticed.” Proud"]],
    ["Pain point", ["Ads all look the same", "Few real-life styling references", "Price shock vs local brands; counterfeit fear", "Size uncertainty, delivery wait", "No reason or prompt to share"]],
    ["AeroRun move", ["Creator fit-check Reels, strong 1-second hook", "‘3 ways to wear’ carousels, colourway picker", "Price ladder, ratings, official-store badge, size guide", "Free size exchange, UPI and EMI, delivery ETA", "#AeroRunFitCheck prompt in the box, repost best UGC"]],
    ["KPI", ["Hook rate, CPM, reach", "Saves, CTR, profile visits", "LPV, add-to-cart rate", "Conversion rate, CPA", "UGC posts, reviews, repeat visits"]],
  ];
  const emo = [55, 70, 25, 65, 90]; // illustrative emotion curve, not data
  const pts = emo.map((e, i) => `${85 + i * 170},${110 - e}`).join(" ");
  return `
  <div class="kicker">Customer journey map · Aarav (primary persona)</div>
  <h1>From scroll to fit-check: where AeroRun must win</h1>
  <div class="sub">Built from the persona hypotheses. The emotion curve is illustrative: it marks where doubt peaks (Evaluate), which is where most of the trust budget goes.</div>
  <div class="journey">
    <div></div>${stages.map(([s, sm]) => `<div class="stage">${s}<small>${sm}</small></div>`).join("")}
    <div class="rowh" style="padding-top:20px">Emotion</div>
    <div style="grid-column: span 5; border-bottom:1px solid var(--line)">
      <svg width="100%" viewBox="0 0 850 120" preserveAspectRatio="none" style="display:block;height:120px">
        <line x1="0" y1="60" x2="850" y2="60" stroke="#e4e7ec" stroke-dasharray="4 6"/>
        <polyline points="${pts}" fill="none" stroke="#ff4f2e" stroke-width="3"/>
        ${emo.map((e, i) => `<circle cx="${85 + i * 170}" cy="${110 - e}" r="7" fill="${e < 40 ? "#101217" : "#ff4f2e"}"/>`).join("")}
      </svg>
    </div>
    ${rows.map(([h, cells]) => `<div class="rowh">${h}</div>${cells.map((c) => `<div class="cell ${h === "Pain point" ? "pain" : h === "AeroRun move" ? "move" : ""}">${c}</div>`).join("")}`).join("")}
  </div>${FOOT}`;
}

const competitors = [
  { brand: "Nike", rev: "≈ ₹1,381 cr (FY25)", src: "S3", pos: "Global aspiration, athlete-led storytelling", hero: "Air Force 1 '07 · ₹7,495", levers: "Global campaigns, athletes, own stores; India e-commerce run with Nykaa as service partner from Jan 2026", strong: "Highest aspirational equity", gap: "Smallest India revenue of the big three. Room to grow if it has a sharper youth price point" },
  { brand: "Adidas", rev: "≈ ₹3,259 cr (FY25)", src: "S3", pos: "Heritage 'Originals' fashion icon", hero: "Samba OG · ₹10,999", levers: "Terrace-shoe trend, heritage silhouettes, collaborations", strong: "Owns the current terrace trend", gap: "Trend-dependent (Adidas itself is preparing for a Samba slowdown), and the icon sits above ₹10k" },
  { brand: "Puma", rev: "≈ ₹3,274 cr (CY2023)", src: "S4", pos: "Sport + celebrity, broad mass reach", hero: "Palermo · ₹6,999", levers: "Cricket, Bollywood and athlete ambassadors; wide distribution", strong: "Scale and price accessibility", gap: "Ended its Virat Kohli partnership, so its youth 'cool' signal is in flux (our read)" },
  { brand: "New Balance", rev: "Small. Retail partner Brandman: ₹162 cr (FY26, +20%)", src: "S8", pos: "Retro running, 'quiet style'", hero: "530 · ₹10,999–11,999", levers: "Fast store roll-out, Janhvi Kapoor as first Indian ambassador", strong: "Trend momentum, premium design credibility", gap: "Small footprint and premium price leave the under-₹6k style buyer unserved" },
];

function competitorTable() {
  return `
  <div class="kicker">Competitor comparison · lifestyle sneakers, India</div>
  <h1>Everyone's icon costs more than ₹6,999. AeroRun's doesn't.</h1>
  <div class="sub">Revenue = latest figure found in reporting on company filings (sources in report). Prices = list prices on brand / authorised retailer sites, checked Nov 2026; discounts are frequent.</div>
  <table class="t" style="margin-top:26px">
    <tr><th style="width:11%">Brand</th><th style="width:13%">India revenue</th><th style="width:15%">Positioning</th><th style="width:13%">Lifestyle hero · list price</th><th style="width:17%">Signature levers</th><th style="width:13%">Strength</th><th>Gap AeroRun can use</th></tr>
    ${competitors.map((c) => `<tr><td>${c.brand}</td><td>${c.rev}</td><td>${c.pos}</td><td>${c.hero}</td><td>${c.levers}</td><td>${c.strong}</td><td>${c.gap}</td></tr>`).join("")}
    <tr class="hl"><td>AeroRun (fictional)</td><td>Launch</td><td>Lifestyle runner: big-brand style at an entry price</td><td>AeroRun · ₹5,999</td><td>Micro-creators, Reels-first, fit-check UGC</td><td>Lowest price in the set</td><td>Must prove it isn't 'the cheap Nike'</td></tr>
  </table>${FOOT}`;
}

const ladder = [
  { name: "AeroRun (fictional)", price: 5999, hl: true },
  { name: "Puma Palermo", price: 6999 },
  { name: "Nike Air Force 1 '07", price: 7495 },
  { name: "Adidas Samba OG", price: 10999 },
  { name: "New Balance 530", price: 11999, note: "₹10,999–11,999" },
];

function priceLadder() {
  const max = 12000, W = 1000;
  return `
  <div class="kicker">Price ladder · list prices, checked Nov 2026</div>
  <h1>The cheapest way into an iconic-brand look</h1>
  <div class="sub">Price is the one axis here that's hard data. Discounts are common, so the real gap is often smaller (see risk R2).</div>
  <svg width="1500" viewBox="0 0 1500 ${ladder.length * 92 + 30}" style="margin-top:26px;display:block">
    ${ladder.map((l, i) => {
      const y = i * 92 + 10, w = (l.price / max) * W;
      return `<text x="0" y="${y + 40}" font-family="Inter" font-size="22" font-weight="${l.hl ? 700 : 500}" fill="#101217">${l.name}</text>
      <rect x="330" y="${y + 12}" width="${w}" height="44" rx="8" fill="${l.hl ? "#ff4f2e" : "#1b2340"}" opacity="${l.hl ? 1 : 0.85}"/>
      <text x="${330 + w + 16}" y="${y + 42}" font-family="Space Grotesk" font-size="24" font-weight="700" fill="#101217">${l.note || inr(l.price)}</text>`;
    }).join("")}
  </svg>${FOOT}`;
}

function positioningMap() {
  // x = list price (data); y = style-led ↔ performance-led (our judgement, labelled)
  const pts = [
    { n: "AeroRun", x: 5999, y: 0.55, hl: true }, { n: "Palermo", x: 6999, y: 0.8 }, { n: "AF1 '07", x: 7495, y: 0.9 },
    { n: "Samba OG", x: 10999, y: 0.85 }, { n: "NB 530", x: 11499, y: 0.6 },
  ];
  const X = (p) => 120 + ((p - 4000) / 9000) * 1280, Y = (s) => 560 - s * 500;
  return `
  <div class="kicker">Positioning map</div>
  <h1>Style-led, with a running-shoe story, at the lowest price</h1>
  <div class="sub">Horizontal: list price (data). Vertical: how style-led vs performance-led each shoe is marketed (<b>our judgement</b>, an assumption to test in the survey).</div>
  <svg width="1500" viewBox="0 0 1500 620" style="margin-top:20px;display:block">
    <rect x="120" y="60" width="1280" height="500" fill="#f4f6f9" rx="12"/>
    <line x1="120" y1="310" x2="1400" y2="310" stroke="#d0d5dd" stroke-dasharray="6 8"/>
    <line x1="760" y1="60" x2="760" y2="560" stroke="#d0d5dd" stroke-dasharray="6 8"/>
    <text x="1388" y="90" text-anchor="end" font-family="Inter" font-size="16" fill="#6b7280">▲ STYLE-LED</text>
    <text x="1388" y="545" text-anchor="end" font-family="Inter" font-size="16" fill="#6b7280">▼ PERFORMANCE-LED</text>
    ${[4000, 6000, 8000, 10000, 12000].map((p) => `<text x="${X(p)}" y="600" text-anchor="middle" font-family="Inter" font-size="16" fill="#6b7280">${inr(p)}</text>`).join("")}
    <rect x="${X(4500)}" y="${Y(0.95)}" width="${X(7000) - X(4500)}" height="${Y(0.4) - Y(0.95)}" rx="14" fill="#ffe9e3" stroke="#ff4f2e" stroke-dasharray="6 6"/>
    <text x="${X(4500) + 14}" y="${Y(0.95) + 28}" font-family="Inter" font-size="15" font-weight="700" fill="#ff4f2e">OPPORTUNITY: under ₹7k, style-first</text>
    ${pts.map((p) => `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="${p.hl ? 18 : 13}" fill="${p.hl ? "#ff4f2e" : "#1b2340"}"/>
      <text x="${X(p.x) + 24}" y="${Y(p.y) + 7}" font-family="Space Grotesk" font-size="22" font-weight="700" fill="#101217">${p.n}</text>`).join("")}
  </svg>${FOOT}`;
}

function funnel() {
  const b = D.scenarios.base, r = b.rows, t = b.totals;
  const tiers = [
    { s: "Awareness", w: 1, kpi: `${num(t.reach)} est. reach · ${num(t.impressions)} impressions`, act: "Creator partnership Reels, Reels ads, broad 18–25 in six metros", spend: r[0].spend },
    { s: "Consideration", w: 0.8, kpi: `${num(t.clicks)} link clicks · ${num(t.lpv)} landing-page views`, act: "‘3 ways to wear’ carousels, colourway Stories, traffic ads", spend: r[1].spend },
    { s: "Conversion", w: 0.6, kpi: `${t.purchases} purchases · media CPA ${inr(t.mediaCpa)}`, act: "Retargeting video viewers and site visitors; reviews; size-exchange promise", spend: r[2].spend },
    { s: "Advocacy", w: 0.42, kpi: "UGC posts, reviews, saves/shares", act: "#AeroRunFitCheck insert card, repost UGC, review request on day 7", spend: 0 },
  ];
  const H = 118, W = 900;
  return `
  <div class="kicker">Marketing funnel · base case (hypothetical)</div>
  <h1>Spend follows the funnel. Advocacy is earned.</h1>
  <div class="sub">Net media ${inr(D.mediaNet)} after an assumed 18% GST on ${inr(D.mediaGross)}. Projections come from the assumed benchmarks in Section 12. They are not results.</div>
  <div style="display:grid;grid-template-columns:${W}px 1fr;gap:36px;margin-top:28px;align-items:center">
    <svg width="${W}" viewBox="0 0 ${W} ${tiers.length * (H + 10)}">
      ${tiers.map((x, i) => {
        const top = x.w * W, bot = (tiers[i + 1] ? tiers[i + 1].w : x.w * 0.75) * W, y = i * (H + 10);
        const c = ["#1b2340", "#2f3b66", "#ff4f2e", "#ff8a70"][i];
        return `<polygon points="${(W - top) / 2},${y} ${(W + top) / 2},${y} ${(W + bot) / 2},${y + H} ${(W - bot) / 2},${y + H}" fill="${c}"/>
        <text x="${W / 2}" y="${y + 48}" text-anchor="middle" font-family="Space Grotesk" font-size="30" font-weight="700" fill="#fff">${x.s}</text>
        <text x="${W / 2}" y="${y + 82}" text-anchor="middle" font-family="Inter" font-size="18" fill="#fff">${x.spend ? inr(x.spend) + " net media" : "Organic + community"}</text>`;
      }).join("")}
    </svg>
    <div style="display:grid;gap:10px">
      ${tiers.map((x) => `<div class="card" style="min-height:${H}px"><h3>${x.s}</h3><div style="font-size:18px;font-weight:700">${x.kpi}</div><div class="muted" style="font-size:15px;margin-top:4px">${x.act}</div></div>`).join("")}
    </div>
  </div>${FOOT}`;
}

function budgetChart() {
  const cols = ["#ff4f2e", "#1b2340", "#6b7a99", "#c9d1ea"];
  let acc = 0;
  const R = 160, C = 2 * Math.PI * R;
  const arcs = D.budget.map((b, i) => {
    const frac = b.amount / D.TOTAL_BUDGET, dash = frac * C, off = -acc * C;
    acc += frac;
    return `<circle r="${R}" cx="220" cy="220" fill="none" stroke="${cols[i]}" stroke-width="70" stroke-dasharray="${dash} ${C - dash}" stroke-dashoffset="${off}" transform="rotate(-90 220 220)"/>`;
  }).join("");
  return `
  <div class="kicker">Budget allocation · hypothetical ₹1,00,000</div>
  <h1>60% media, 25% creators, 10% content, 5% held back</h1>
  <div class="sub">The reserve is a deliberate test-and-learn choice: it goes to the winner in week 3 instead of being spread thin on day 1.</div>
  <div style="display:grid;grid-template-columns:460px 1fr;gap:50px;margin-top:30px;align-items:center">
    <svg width="440" viewBox="0 0 440 440">${arcs}
      <text x="220" y="212" text-anchor="middle" font-family="Space Grotesk" font-size="46" font-weight="700" fill="#101217">₹1,00,000</text>
      <text x="220" y="248" text-anchor="middle" font-family="Inter" font-size="18" fill="#6b7280">6-week launch</text></svg>
    <table class="t"><tr><th>Line</th><th>Amount</th><th>Share</th><th>What it buys</th></tr>
      ${D.budget.map((b, i) => `<tr><td><span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:${cols[i]};margin-right:10px;vertical-align:-1px"></span>${b.line}</td><td>${inr(b.amount)}</td><td>${Math.round((b.amount / D.TOTAL_BUDGET) * 100)}%</td><td>${b.note}</td></tr>`).join("")}
    </table>
  </div>${FOOT}`;
}

function timeline() {
  const weeks = ["W-2", "W-1", "W1", "W2", "W3", "W4", "W5", "W6", "W7"];
  const tasks = [
    ["Run survey (n≈150) + Ad Library audit", 0, 1, "#6a35d4"],
    ["Creator shortlist, briefs, contracts", 0, 1, "#1b2340"],
    ["Product shoot + creator content", 1, 2, "#1b2340"],
    ["Pixel + Conversions API, GA4, UTMs", 1, 1, "#6b7a99"],
    ["TEST: 3 creative angles × broad audience", 2, 2, "#ff4f2e"],
    ["Release reserve to winner; cut losers", 4, 1, "#ff4f2e"],
    ["SCALE: winner + retargeting", 4, 2, "#ff4f2e"],
    ["CONVERT: reviews, exchange promise, last-call Stories", 6, 2, "#ff4f2e"],
    ["UGC reposts + #AeroRunFitCheck", 3, 5, "#ff8a70"],
    ["Wrap report + scale / stop decision", 8, 1, "#6a35d4"],
  ];
  const L = 470, CW = 112;
  return `
  <div class="kicker">Implementation plan · 9 weeks</div>
  <h1>Two weeks to prepare, six to run, one to decide</h1>
  <div class="sub">Every phase ends with a decision, not just an activity.</div>
  <svg width="1500" viewBox="0 0 1500 ${tasks.length * 52 + 70}" style="margin-top:24px;display:block">
    ${weeks.map((w, i) => `<rect x="${L + i * CW}" y="0" width="${CW - 4}" height="38" rx="6" fill="${i < 2 ? "#e4e7ec" : i === 8 ? "#efe8fd" : "#1b2340"}"/><text x="${L + i * CW + CW / 2 - 2}" y="25" text-anchor="middle" font-family="Inter" font-size="16" font-weight="700" fill="${i < 2 || i === 8 ? "#101217" : "#fff"}">${w}</text>`).join("")}
    ${tasks.map(([n, s, d, c], i) => `<text x="0" y="${76 + i * 52}" font-family="Inter" font-size="18" fill="#101217">${n}</text><rect x="${L + s * CW}" y="${54 + i * 52}" width="${d * CW - 4}" height="32" rx="8" fill="${c}"/>`).join("")}
  </svg>${FOOT}`;
}

const ads = [
  { key: "ad-A-fit-check", angle: "A · Fit Check (style)", head: "3 fits.<br>1 pair.", sub: "Campus · gig · date night", cta: "Shop AeroRun", bg: "#1b2340" },
  { key: "ad-B-all-day-light", angle: "B · All-Day Light (comfort)", head: "9 am lecture.<br>9 pm gig.<br>Still light.", sub: "Running-derived foam, everyday look", cta: "Feel the weight", bg: "#ff4f2e" },
  { key: "ad-C-price-smart", angle: "C · Price Smart (value)", head: "Iconic style.<br>Under ₹6K.", sub: "₹5,999 · Official store · Free size exchange", cta: "See colourways", bg: "#101217" },
];

function adMockups() {
  return `
  <div class="kicker">Creative concepts · 9:16 Reels / Stories mockups</div>
  <h1>Light on your feet. Loud on your feed.</h1>
  <div class="sub">Three angles, one test. Mockups show layout, hierarchy and copy only. Final assets would use creator footage and a real product shoot.</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px;margin-top:30px">
  ${ads.map((a) => `
    <div>
      <div style="font:700 15px Inter;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2);margin-bottom:12px">${a.angle}</div>
      <div style="width:100%;aspect-ratio:9/16;border-radius:36px;background:${a.bg};color:#fff;padding:34px 30px;position:relative;overflow:hidden;border:10px solid #101217">
        <div style="display:flex;align-items:center;gap:10px;font-size:15px"><span style="width:34px;height:34px;border-radius:50%;background:#fff3;display:inline-block"></span><b>@creator_handle</b><span style="opacity:.7">· Paid partnership</span></div>
        <div style="font:700 58px/1.02 'Space Grotesk';margin-top:56px">${a.head}</div>
        <div style="font-size:19px;margin-top:16px;opacity:.85">${a.sub}</div>
        <div style="position:absolute;left:0;right:0;bottom:150px;display:flex;justify-content:center">${a.bg === "#ff4f2e" ? shoe(400, "#fff", "#101217", "#ff4f2e") : shoe(400, a.bg, "#fff", "#ff4f2e")}</div>
        <div style="position:absolute;left:30px;right:30px;bottom:40px;background:#fff;color:#101217;border-radius:14px;padding:18px;text-align:center;font:700 20px Inter">${a.cta} →</div>
      </div>
    </div>`).join("")}
  </div>${FOOT}`;
}

module.exports = {
  personas, competitors, ladder, ads, shoe,
  sheets: [
    ...personas.map((p) => ({ key: p.key, html: personaSheet(p) })),
    { key: "journey-map", html: journey() },
    { key: "competitor-table", html: competitorTable() },
    { key: "price-ladder", html: priceLadder() },
    { key: "positioning-map", html: positioningMap() },
    { key: "funnel", html: funnel() },
    { key: "budget", html: budgetChart() },
    { key: "timeline", html: timeline() },
    { key: "ad-mockups", html: adMockups() },
  ],
};
