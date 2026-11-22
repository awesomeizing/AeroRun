// Builds AeroRun-Executive-Deck.pptx (12 slides) from data.js. Run: node deck.js
const path = require("path");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("./apply_theme");
const D = require("./data");
const { competitors, personas } = require("./assets");

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const num = (n) => Math.round(n).toLocaleString("en-IN");
const B = D.base, S = D.scenarios;
const OUT = path.resolve(__dirname, "..", "AeroRun-Executive-Deck.pptx");

const THEME = {
  name: "AeroRun Case Study",
  headFontFace: "Arial",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "101217", lt1: "FFFFFF", dk2: "1B2340", lt2: "F4F6F9",
    accent1: "FF4F2E", accent2: "1B2340", accent3: "6B7A99", accent4: "C9D1EA", accent5: "0F7B5A", accent6: "6A35D4",
    hlink: "1F4FD1", folHlink: "6A35D4",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 × 7.5 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "AeroRun Launch Strategy — Executive Deck";
pres.author = "Portfolio Project 01";
const C = pres.SchemeColor;
const DISC = "AeroRun is a fictional product · independent educational simulation · not affiliated with or commissioned by Nike, Inc.";

pres.defineSlideMaster({
  title: "Dark Title",
  background: { color: THEME.colors.dk1 },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.7, y: 0.7, w: 11, h: 0.4, fontSize: 12, bold: true, color: C.accent1, charSpacing: 3 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 1.6, w: 9.5, h: 2.2, fontSize: 48, bold: true, color: C.background1, valign: "top" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.7, y: 4.0, w: 8.2, h: 1.6, fontSize: 18, color: C.accent4, valign: "top" }, text: "" } },
    { text: { text: DISC, options: { x: 0.7, y: 6.85, w: 10, h: 0.3, fontSize: 10, color: C.accent3, isTextBox: true } } },
  ],
});

pres.defineSlideMaster({
  title: "Content",
  background: { color: THEME.colors.lt1 },
  margin: [0.5, 0.6, 0.6, 0.6],
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.6, y: 0.35, w: 12, h: 0.35, fontSize: 11, bold: true, color: C.accent1, charSpacing: 2 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.7, w: 12.1, h: 0.9, fontSize: 30, bold: true, color: C.text1, valign: "top" }, text: "" } },
    { text: { text: DISC, options: { x: 0.6, y: 7.0, w: 10.5, h: 0.3, fontSize: 10, color: C.accent3, isTextBox: true } } },
  ],
  slideNumber: { x: 12.2, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: THEME.colors.accent3, align: "right" },
});

let section = "";
function slide(master, kicker, title, sectionTitle) {
  if (sectionTitle !== section) { pres.addSection({ title: sectionTitle }); section = sectionTitle; }
  const s = pres.addSlide({ masterName: master, sectionTitle });
  s.addText(kicker.toUpperCase(), { placeholder: "kicker" });
  s.addText(title, { placeholder: "title" });
  return s;
}
const text = (s, t, o) => s.addText(t, { isTextBox: true, margin: 0, fontSize: 14, color: C.text1, valign: "top", ...o });
const card = (s, x, y, w, h, fill = C.background2, name) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { type: "none" }, objectName: name });
const stat = (s, x, y, w, big, label, tag, name) => {
  card(s, x, y, w, 1.75, C.background2, name);
  text(s, big, { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.75, fontSize: 32, bold: true, fontFace: THEME.headFontFace });
  text(s, label, { x: x + 0.25, y: y + 0.95, w: w - 0.5, h: 0.5, fontSize: 12, color: C.text2 });
  text(s, tag, { x: x + 0.25, y: y + 1.42, w: w - 0.5, h: 0.25, fontSize: 10, bold: true, color: tag.startsWith("VERIFIED") ? C.accent5 : C.accent6 });
};

// 1 — Title
{
  const s = slide("Dark Title", "Marketing strategy case study · Portfolio Project 01", "AeroRun\nLaunch Strategy", "Opening");
  s.addText("Launching a fictional ₹5,999 style-led sneaker to 18–25-year-olds in India's metros, on Instagram and Facebook, with a ₹1,00,000 test-and-learn budget.", { placeholder: "body" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 5.75, w: 8.2, h: 0.75, rectRadius: 0.08, fill: { color: C.text1 }, line: { color: C.accent1, width: 1 }, objectName: "disclaimer box" });
  text(s, "Fictional product. Independent educational simulation. Not commissioned by, affiliated with or endorsed by Nike, Inc. All campaign results are projections.", { x: 0.9, y: 5.83, w: 7.8, h: 0.6, fontSize: 12, color: C.background1, valign: "middle" });
  s.addImage({ path: path.resolve(__dirname, "..", "assets", "ad-mockups.png"), x: 9.4, y: 0.9, w: 3.4, h: 2.47, transparency: 0, objectName: "creative preview", altText: "Three AeroRun ad concept mockups" });
  s.addNotes("Frame this as an agency-style strategy for a fictional product. The one-line takeaway: a ₹1 lakh budget can't build a brand position, but it can tell us which message, creator and audience deserve a bigger budget. Stress the honesty rules: every number is either sourced, assumed or a projection, and the deck says which.");
}

// 2 — Executive summary
{
  const s = slide("Content", "01 · Executive summary", "₹1 lakh should buy proof, not profit", "Summary");
  const lines = [
    ["Situation", "Nike trails Adidas and Puma in India revenue, and every rival's lifestyle icon lists at ₹6,999 or more."],
    ["Insight", "AeroRun at ₹5,999 is the cheapest way into an iconic-brand look, but the buyer is price-cautious and worried about fakes."],
    ["Strategy", "“Light on your feet. Loud on your feed.” Creator-led, Reels-first; test three angles, then fund the winner."],
    ["Ask", "Run the survey first, judge week 3 on learning KPIs, and scale only through the week-6 gate."],
  ];
  lines.forEach(([h, t], i) => {
    s.addShape(pres.shapes.OVAL, { x: 0.6, y: 1.95 + i * 1.15, w: 0.42, h: 0.42, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `step ${i + 1}` });
    text(s, String(i + 1), { x: 0.6, y: 1.95 + i * 1.15, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle" });
    text(s, [{ text: h + "  ", options: { bold: true } }, { text: t }], { x: 1.25, y: 1.92 + i * 1.15, w: 5.5, h: 1.0, fontSize: 15 });
  });
  stat(s, 7.2, 1.95, 2.7, "₹5,999", "Lowest list price among compared icons", "VERIFIED · list prices", "stat price");
  stat(s, 10.05, 1.95, 2.7, num(B.reach), "People reached (base case)", "PROJECTION · assumed CPMs", "stat reach");
  stat(s, 7.2, 3.95, 2.7, String(B.purchases), `Purchases · media CPA ${inr(B.mediaCpa)}`, "PROJECTION · assumed CVR", "stat purchases");
  stat(s, 10.05, 3.95, 2.7, B.totalRoas.toFixed(2) + "×", "Gross revenue ÷ total budget", "PROJECTION · not profit", "stat roas");
  text(s, "About 5 sales a week is far below the ~50 weekly events Meta's learning phase needs, so this launch is built to learn.", { x: 7.2, y: 5.95, w: 5.55, h: 0.7, fontSize: 13, italic: true, color: C.text2 });
  s.addNotes(`Lead with the answer. The base case is ${num(B.reach)} reach, ${num(B.lpv)} landing-page views and ${B.purchases} purchases: a media CPA of ${inr(B.mediaCpa)}, or ${inr(B.totalCpa)} fully loaded. Revenue of ${inr(B.revenue)} is gross at list price, not profit. The strategic point is that the budget can't exit Meta's learning phase on purchases, so we optimise to add-to-carts and judge on learning KPIs.`);
}

// 3 — Market & audience
{
  const s = slide("Content", "02 · Market & audience", "The buyer is reachable, price-cautious and trust-anxious", "Research");
  const cols = [
    ["$3.2–4bn", "India sneaker market (2024–25 estimates). Estimates differ by ~25%, so we show a range.", "IMARC; TechSci"],
    ["414M", "Instagram users in India (Jan 2025). 18–24 is the largest age group.", "DataReportal; NapoleonCat"],
    ["~70%", "of Gen Z shoppers discover brands online. Gen Z ≈ 40% of e-retail shoppers.", "Bain, How India Shops Online 2025"],
    ["1 in 5", "online shoppers received a fake product in 12 months. Shoes are among the top categories.", "LocalCircles via Inc42"],
  ];
  cols.forEach(([n, l, src], i) => {
    const x = 0.6 + i * 3.08;
    card(s, x, 1.95, 2.85, 3.5, i === 3 ? C.accent1 : C.background2, `market stat ${i + 1}`);
    text(s, n, { x: x + 0.25, y: 2.2, w: 2.4, h: 0.9, fontSize: 30, bold: true, fontFace: THEME.headFontFace, color: i === 3 ? C.background1 : C.text1 });
    text(s, l, { x: x + 0.25, y: 3.15, w: 2.4, h: 1.5, fontSize: 14, color: i === 3 ? C.background1 : C.text2 });
    text(s, "VERIFIED · " + src, { x: x + 0.25, y: 4.85, w: 2.4, h: 0.45, fontSize: 10, bold: true, color: i === 3 ? C.background1 : C.accent5 });
  });
  text(s, [{ text: "So what? ", options: { bold: true, color: C.accent1 } }, { text: "Reach is cheap and easy. Trust and price are the real barriers, so the plan spends its effort at the Evaluate stage, not just on awareness. Gen Z also spends about half as much per purchase as millennials (Redseer)." }], { x: 0.6, y: 5.75, w: 12.1, h: 0.9, fontSize: 15 });
  s.addNotes("If asked why I show a range for market size: the research firms disagree, and picking the most flattering number is a red flag. For a ₹1 lakh launch, exact market size barely matters; reach, price sensitivity and trust do. The Meta-commissioned discovery stat is vendor research, so I used Bain as the main source.");
}

// 4 — Competitors
{
  const s = slide("Content", "03 · Competitor analysis", "Every rival's lifestyle icon costs ₹6,999 or more", "Research");
  const hdr = ["Brand", "India revenue (reported)", "Lifestyle hero · list price", "Strength", "Gap AeroRun can use"].map((t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, fontSize: 12 } }));
  const rows = competitors.map((c) => [c.brand, c.rev, c.hero, c.strong, c.gap].map((t, i) => ({ text: t, options: { fontSize: 12, bold: i === 0 } })));
  rows.push(["AeroRun (fictional)", "Launch", "AeroRun · ₹5,999", "Lowest price in the set", "Must prove it isn't 'the cheap Nike'"].map((t) => ({ text: t, options: { fontSize: 12, bold: true, fill: { color: THEME.colors.lt2 }, color: C.accent1 } })));
  s.addTable([hdr, ...rows], { x: 0.6, y: 1.85, w: 12.1, colW: [1.6, 2.2, 2.3, 2.4, 3.6], border: { type: "solid", pt: 0.75, color: "E4E7EC" }, valign: "top", margin: 0.08, color: C.text1, objectName: "competitor table" });
  text(s, "Revenue: Open Magazine (Nike, Adidas FY25), Apparel Resources (Puma CY2023), Reuters (Brandman, NB's retail partner, FY26). Fiscal years differ. Prices: brand and authorised-retailer listings, Nov 2026.", { x: 0.6, y: 6.3, w: 12.1, h: 0.5, fontSize: 10, color: C.text2 });
  s.addNotes("I benchmark against each rival's lifestyle icon, not their cheapest runner, because that's the shoe an 18–25 style buyer compares with. Against entry runners AeroRun looks expensive; against icons it looks like smart value. Choosing the comparison set is a positioning decision. Puma's Kohli partnership has ended and Adidas is preparing for a Samba slowdown, so both leave openings.");
}

// 5 — Positioning + price ladder chart
{
  const s = slide("Content", "04 · Positioning", "Iconic style at the lowest entry price, never “cheapest”", "Strategy");
  const ladder = [["New Balance 530", 11999], ["Adidas Samba OG", 10999], ["Nike Air Force 1 '07", 7495], ["Puma Palermo", 6999], ["AeroRun (fictional)", 5999]];
  s.addChart(pres.charts.BAR, [{ name: "List price (₹)", labels: ladder.map((l) => l[0]), values: ladder.map((l) => l[1]) }], {
    x: 0.6, y: 1.8, w: 6.8, h: 4.6, barDir: "bar", chartColors: ["1B2340", "1B2340", "1B2340", "1B2340", "FF4F2E"],
    showTitle: true, title: "List price, ₹ (Nov 2026 listings)", titleFontSize: 14, titleColor: THEME.colors.dk1, titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "₹#,##0", dataLabelFontSize: 12, dataLabelColor: THEME.colors.dk1, dataLabelFontFace: "+mn-lt",
    catAxisLabelColor: THEME.colors.dk1, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true,
    valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 60, valAxisMaxVal: 14000, objectName: "price ladder chart",
  });
  card(s, 7.8, 1.85, 4.9, 2.75, C.background2, "positioning statement");
  text(s, [{ text: "Positioning statement\n", options: { bold: true, color: C.accent1, fontSize: 12 } }, { text: "For style-driven 18–25s in India's metros who want a recognisable global sneaker without paying ₹10,000+, AeroRun is the lightweight lifestyle runner that delivers iconic-brand style at ₹5,999." }], { x: 8.05, y: 2.05, w: 4.4, h: 2.4, fontSize: 14 });
  card(s, 7.8, 4.8, 4.9, 1.6, C.accent1, "value proposition");
  text(s, [{ text: "Value proposition\n", options: { bold: true, fontSize: 12 } }, { text: "Looks good in the fit check. Still feels light at 9 pm.", options: { fontSize: 18, bold: true } }], { x: 8.05, y: 4.95, w: 4.4, h: 1.35, color: C.background1 });
  s.addNotes("Alternatives I rejected: pure performance positioning (contradicts the style brief), pure value ('Nike for less' damages brand equity and invites the cheap-Nike label) and hype drops (needs scarcity and a budget we don't have). Comfort is the tie-breaker that makes the value story believable. Product attributes such as the foam are assumptions for this simulation.");
}

// 6 — Personas
{
  const s = slide("Content", "05 · Customer personas (proto-personas)", "Three hypotheses about who buys, and one clear priority", "Research");
  const roles = ["PRIMARY · most budget", "SECONDARY · conversion", "TERTIARY · community"];
  personas.forEach((p, i) => {
    const x = 0.6 + i * 4.1, primary = i === 0;
    card(s, x, 1.85, 3.85, 4.75, primary ? C.text2 : C.background2, `persona ${p.name}`);
    const fg = primary ? C.background1 : C.text1;
    text(s, roles[i], { x: x + 0.3, y: 2.05, w: 3.3, h: 0.3, fontSize: 10, bold: true, color: C.accent1 });
    text(s, `${p.name}, ${p.age}`, { x: x + 0.3, y: 2.4, w: 3.3, h: 0.45, fontSize: 20, bold: true, fontFace: THEME.headFontFace, color: fg });
    text(s, `${p.archetype} · ${p.city}`, { x: x + 0.3, y: 2.85, w: 3.3, h: 0.35, fontSize: 13, color: primary ? C.accent4 : C.text2 });
    text(s, [
      { text: "Wants  ", options: { bold: true } }, { text: p.goals[0], options: { breakLine: true } },
      { text: "Blocked by  ", options: { bold: true } }, { text: p.pains[0], options: { breakLine: true } },
      { text: "Tipped by  ", options: { bold: true } }, { text: p.triggers[0] },
    ], { x: x + 0.3, y: 3.35, w: 3.3, h: 2.2, fontSize: 14, color: fg, paraSpaceAfter: 6 });
    text(s, "Every attribute is a hypothesis to test", { x: x + 0.3, y: 6.15, w: 3.3, h: 0.3, fontSize: 10, italic: true, color: primary ? C.accent4 : C.text2 });
  });
  s.addNotes("These are proto-personas: built from secondary data and the brief's hypotheses, not interviews, and I say that up front. Aarav is primary because he matches the brief and the strongest evidence. Meera is the likelier buyer, so retargeting and reviews are built for her. Kabir drives culture but a parent often pays, which is itself a hypothesis (survey Q17). Equal budgets across three personas would leave every test too small to read.");
}

// 7 — Journey
{
  const s = slide("Content", "06 · Customer journey", "Doubt peaks at Evaluate, so that's where trust is built", "Research");
  s.addImage({ path: path.resolve(__dirname, "..", "assets", "journey-map.png"), x: 0.6, y: 1.75, w: 8.9, h: 5.06, objectName: "journey map", altText: "Customer journey map from Discover to Wear and share, with emotion dipping at Evaluate" });
  card(s, 9.8, 1.85, 2.9, 4.8, C.background2, "journey insight");
  text(s, [
    { text: "The drop-off\n", options: { bold: true, color: C.accent1, fontSize: 12 } },
    { text: "“Is ₹5,999 too much? Is it fake?”", options: { bold: true, breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "Cheap fixes with high impact:", options: { bold: true, breakLine: true } },
    { text: "Official-store badge", options: { bullet: true, breakLine: true } },
    { text: "Ratings above the fold", options: { bullet: true, breakLine: true } },
    { text: "Free size exchange", options: { bullet: true, breakLine: true } },
    { text: "Price ladder vs rivals", options: { bullet: true } },
  ], { x: 10.0, y: 2.05, w: 2.5, h: 4.4, fontSize: 14, paraSpaceAfter: 4 });
  s.addNotes("Awareness isn't the hard part; Meta delivers reach cheaply. The journey shows emotion dropping at Evaluate, where price shock meets counterfeit fear (one in five online shoppers got a fake in a year). Trust devices cost almost no media money and target the biggest drop-off. The emotion curve is illustrative, not data.");
}

// 8 — SWOT
{
  const s = slide("Content", "07 · SWOT", "Lean on brand and price; defend against fakes", "Strategy");
  const q = [
    ["Strengths", "Nike's aspirational equity\nLowest price among compared icons\nMeta age and city targeting", "E3F5EE"],
    ["Weaknesses", "₹1 lakh vs rivals' budgets\nZero reviews at launch\nNike trails Adidas and Puma in India", "FFF3EF"],
    ["Opportunities", "Gen Z discovers brands online\nMicro-creator economy is growing\nTerrace trend may cool", "E5ECFD"],
    ["Threats", "Competitor discounting narrows the gap\nCounterfeit and lookalike ads\nCreative fatigue, rising ad costs", "F4F6F9"],
  ];
  q.forEach(([h, t, col], i) => {
    const x = 0.6 + (i % 2) * 3.75, y = 1.85 + Math.floor(i / 2) * 2.45;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.6, h: 2.3, rectRadius: 0.12, fill: { color: col }, line: { type: "none" }, objectName: `swot ${h}` });
    text(s, h, { x: x + 0.25, y: y + 0.2, w: 3.1, h: 0.4, fontSize: 16, bold: true, fontFace: THEME.headFontFace });
    text(s, t.split("\n").map((l, j, a) => ({ text: l, options: { bullet: true, breakLine: j < a.length - 1 } })), { x: x + 0.25, y: y + 0.7, w: 3.15, h: 1.5, fontSize: 13, paraSpaceAfter: 4 });
  });
  card(s, 8.3, 1.85, 4.4, 4.75, C.text2, "tows moves");
  text(s, [
    { text: "So what? (TOWS)\n", options: { bold: true, color: C.accent1, fontSize: 12 } },
    { text: "S × O  ", options: { bold: true } }, { text: "Brand + price gap in creator Reels", options: { breakLine: true } },
    { text: "W × O  ", options: { bold: true } }, { text: "Creator content stands in for missing reviews", options: { breakLine: true } },
    { text: "S × T  ", options: { bold: true } }, { text: "Defend the price gap with value-adds, not discounts", options: { breakLine: true } },
    { text: "W × T  ", options: { bold: true } }, { text: "Official-store badge in every ad" },
  ], { x: 8.55, y: 2.05, w: 3.9, h: 4.4, fontSize: 15, color: C.background1, paraSpaceAfter: 10 });
  s.addNotes("A SWOT is only useful if it changes decisions, so I turned it into four TOWS moves. The most important: defend the price gap with value-adds such as free size exchange rather than discounts, because discounting trains buyers to wait for sales and invites the cheap-Nike label.");
}

// 9 — Strategy: funnel + angles
{
  const s = slide("Content", "08 · Funnel, channels & creative", "Light on your feet. Loud on your feed.", "Strategy");
  const r = S.base.rows;
  const tiers = [["Awareness", r[0].spend, "Creator Reels · broad 18–25"], ["Consideration", r[1].spend, "Carousels · Stories · traffic"], ["Conversion", r[2].spend, "Retargeting · reviews · exchange"], ["Advocacy", 0, "#AeroRunFitCheck UGC"]];
  tiers.forEach(([n, sp, d], i) => {
    const w = 5.6 - i * 0.9, x = 0.6 + (5.6 - w) / 2, y = 1.85 + i * 1.2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 1.05, rectRadius: 0.1, fill: { color: [C.text2, C.accent3, C.accent1, C.accent4][i] }, line: { type: "none" }, objectName: `funnel ${n}` });
    text(s, [{ text: n, options: { bold: true, fontSize: 15, breakLine: true } }, { text: sp ? `${inr(sp)} net · ${d}` : d, options: { fontSize: 11 } }], { x: x + 0.15, y: y + 0.12, w: w - 0.3, h: 0.85, align: "center", color: i === 3 ? C.text1 : C.background1 });
  });
  text(s, `Net media ${inr(D.mediaNet)} after assumed 18% GST · Meta only, Instagram-led`, { x: 0.6, y: 6.7, w: 5.6, h: 0.3, fontSize: 10, color: C.text2, align: "center" });
  const angles = [["A · Fit Check", "“3 fits. 1 pair.”", "Style · for Aarav"], ["B · All-Day Light", "“9 am lecture. 9 pm gig. Still light.”", "Comfort · for Meera"], ["C · Price Smart", "“Iconic style. Under ₹6K.”", "Value · for Aarav, Kabir"]];
  text(s, "Three angles, one test: the winner gets the 5% reserve in week 3", { x: 6.7, y: 1.85, w: 6, h: 0.4, fontSize: 14, bold: true });
  angles.forEach(([h, line, who], i) => {
    const y = 2.4 + i * 1.4;
    card(s, 6.7, y, 6.0, 1.25, i === 0 ? C.accent1 : C.background2, `angle ${h}`);
    const fg = i === 0 ? C.background1 : C.text1;
    text(s, h, { x: 6.95, y: y + 0.15, w: 2.3, h: 0.4, fontSize: 14, bold: true, color: fg });
    text(s, who, { x: 6.95, y: y + 0.6, w: 2.3, h: 0.45, fontSize: 11, color: fg });
    text(s, line, { x: 9.3, y: y + 0.2, w: 3.2, h: 0.85, fontSize: 16, bold: true, fontFace: THEME.headFontFace, color: fg, valign: "middle" });
  });
  text(s, "5 micro-creators × ₹5,000 (Reel + 30-day ad rights) run as partnership ads", { x: 6.7, y: 6.6, w: 6, h: 0.35, fontSize: 12, italic: true, color: C.text2 });
  s.addNotes("Why Meta only: ₹50,847 of net media split across platforms leaves each one too little data to learn from. Why five micro-creators instead of one bigger name: five audiences and content styles to compare, plus ad usage rights. One creator is a single bet with nothing to compare against. Creator fees are an assumption, to be confirmed with quotes.");
}

// 10 — Budget & projections
{
  const s = slide("Content", "09 · Budget & projections (hypothetical)", "₹1,00,000 buys about 28 sales and a clear answer", "Plan");
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Budget", labels: D.budget.map((b) => b.line.replace(" (gross incl. GST)", "")), values: D.budget.map((b) => b.amount) }], {
    x: 0.6, y: 1.8, w: 4.9, h: 4.8, holeSize: 60, chartColors: ["FF4F2E", "1B2340", "6B7A99", "C9D1EA"],
    showPercent: true, showValue: false, dataLabelColor: "FFFFFF", dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt",
    showLegend: true, legendPos: "b", legendFontSize: 12, legendFontFace: "+mn-lt", legendColor: THEME.colors.dk1,
    showTitle: true, title: "₹1,00,000 by line", titleFontSize: 14, titleColor: THEME.colors.dk1, titleFontFace: "+mn-lt", objectName: "budget doughnut",
  });
  const hdr = ["Scenario", "Reach", "LPVs", "Sales", "Media CPA", "Rev ÷ budget"].map((t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, fontSize: 12 } }));
  const row = (n, t, hl) => [n, num(t.reach), num(t.lpv), String(t.purchases), inr(t.mediaCpa), t.totalRoas.toFixed(2) + "×"].map((x, i) => ({ text: x, options: { fontSize: 13, bold: hl || i === 0, ...(hl ? { fill: { color: "FFE9E3" } } : {}) } }));
  s.addTable([hdr, row("Conservative", S.conservative.totals), row("Base", B, true), row("Optimistic", S.optimistic.totals)], { x: 5.9, y: 1.9, w: 6.8, colW: [1.45, 1.05, 0.9, 0.8, 1.2, 1.4], border: { type: "solid", pt: 0.75, color: "E4E7EC" }, margin: 0.08, color: C.text1, objectName: "scenario table" });
  text(s, [
    { text: "How the base case is built\n", options: { bold: true, color: C.accent1, fontSize: 12 } },
    { text: `₹60,000 ÷ 1.18 GST = ${inr(D.mediaNet)} net → CPM ₹80–120 → ${num(B.impressions)} impressions → ${num(B.clicks)} clicks → ${num(B.lpv)} LPVs → ${B.purchases} sales (1.5% CVR on retargeting).`, options: { breakLine: true } },
    { text: "All benchmarks are assumptions inside published India ranges (CPM ₹50–120, CPC ₹8–25). Revenue is gross at list price, so it isn't profit.", options: { color: C.text2, fontSize: 12 } },
  ], { x: 5.9, y: 4.15, w: 6.8, h: 2.4, fontSize: 14, paraSpaceAfter: 6 });
  s.addNotes(`Walk the maths left to right. Spend ÷ CPM × 1,000 gives impressions; × CTR gives clicks; × 80% gives landing-page views; × conversion rate gives purchases. Base: ${B.purchases} sales, media CPA ${inr(B.mediaCpa)}, fully loaded ${inr(B.totalCpa)}. Even the optimistic case at ${S.optimistic.totals.totalRoas.toFixed(2)}× gross is thin once margin and returns come off, which is why this is framed as a test. Change any assumption in data.js and the whole deck and report rebuild.`);
}

// 11 — KPIs & risks
{
  const s = slide("Content", "10 · Measurement & risk", "Judge week 3 on learning signals, week 6 on the scale gate", "Plan");
  const k = [["Awareness", "Hook rate", "≥ 25%"], ["Awareness", "CPM", "≤ ₹80"], ["Consideration", "Cost per landing-page view", "≤ ₹20"], ["Conversion", "Add-to-cart rate", "≥ 8%"], ["Conversion", "Media CPA", "≤ ₹2,000"], ["Learning", "Winning angle (≥ 30% lower cost per LPV)", "By week 3"]];
  const hdr = ["Stage", "KPI", "Target"].map((t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, fontSize: 12 } }));
  s.addTable([hdr, ...k.map((r) => r.map((t, i) => ({ text: t, options: { fontSize: 13, bold: i === 0 } })))], { x: 0.6, y: 1.85, w: 6.6, colW: [1.6, 3.6, 1.4], border: { type: "solid", pt: 0.75, color: "E4E7EC" }, margin: 0.08, color: C.text1, objectName: "kpi table" });
  text(s, "Tracking: Meta Pixel + Conversions API, GA4, UTMs per creator and angle", { x: 0.6, y: 6.1, w: 6.6, h: 0.4, fontSize: 12, italic: true, color: C.text2 });
  const risks = [["Too few conversions for Meta to learn", "Optimise to add-to-cart; consolidate ad sets"], ["Rival discounts erase the price gap", "Value-adds (free size exchange), not discounts"], ["Fakes and lookalike ads", "Official-store badge in every ad; report via Meta IP tools"]];
  text(s, "Top risks", { x: 7.6, y: 1.85, w: 5, h: 0.4, fontSize: 14, bold: true });
  risks.forEach(([r, m], i) => {
    const y = 2.35 + i * 1.3;
    card(s, 7.6, y, 5.1, 1.15, i === 0 ? C.accent1 : C.background2, `risk ${i + 1}`);
    const fg = i === 0 ? C.background1 : C.text1;
    text(s, [{ text: r, options: { bold: true, breakLine: true } }, { text: "→ " + m, options: { fontSize: 13 } }], { x: 7.85, y: y + 0.15, w: 4.6, h: 0.9, fontSize: 14, color: fg });
  });
  s.addNotes(`Risk 1 is the one most students miss. At about ${D.learningPhase.weeklyPurchasesBase} purchases a week, purchase-optimised ad sets stay in 'learning limited'. Meta needs roughly 50 events per ad set per week. Add-to-carts (about ${D.learningPhase.weeklyAddToCartBase} a week) and landing-page views give the algorithm enough signal. ROAS is reported, not targeted, because 28 sales is too small a sample.`);
}

// 12 — Recommendations
{
  const s = slide("Dark Title", "11 · Recommendation", "Validate. Test. Then earn the ₹5 lakh phase.", "Close");
  s.addText([
    { text: "1  Run the survey and Ad Library audit before spending", options: { breakLine: true } },
    { text: "2  Creator-led, Reels-first; partnership ads carry creator trust", options: { breakLine: true } },
    { text: "3  Put trust at the point of doubt: badge, reviews, size exchange", options: { breakLine: true } },
    { text: "4  Optimise to signals the budget can afford: LPV, then add-to-cart", options: { breakLine: true } },
    { text: "5  Week 3: reserve goes to the angle with ≥ 30% lower cost per LPV" },
  ], { placeholder: "body", paraSpaceAfter: 6 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.3, y: 3.9, w: 3.4, h: 2.6, rectRadius: 0.12, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "scale gate" });
  text(s, [{ text: "Scale gate · week 6\n", options: { bold: true, fontSize: 12 } }, { text: "Go to ₹5 lakh only if all three hold:", options: { breakLine: true } }, { text: "Media CPA ≤ ₹2,000", options: { bullet: true, breakLine: true } }, { text: "Add-to-cart ≥ 8%", options: { bullet: true, breakLine: true } }, { text: "One clear winning angle", options: { bullet: true } }], { x: 9.5, y: 4.05, w: 3.0, h: 2.3, fontSize: 14, color: C.background1 });
  s.addNotes("Close on the decision, not the activity. Pre-agreeing the scale gate stops anyone moving the goalposts after the data comes in. If the gate isn't met, keep the winning content, fix the weakest funnel stage and retest at ₹50,000. Limitations to volunteer: all results are projections, personas are unvalidated, and the model ignores margin and returns.");
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("deck", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
