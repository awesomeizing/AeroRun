// Builds report.html (rendered to PDF by build.js). All numbers come from data.js.
const D = require("./data");
const A = require("./assets");
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const num = (n) => Math.round(n).toLocaleString("en-IN");
const pct = (n, d = 1) => (n * 100).toFixed(d) + "%";
const B = D.base, S = D.scenarios;

const SOURCES = [
  ["S1", "IMARC Group, India Sneaker Market report (summary page)", "https://www.imarcgroup.com/india-sneaker-market", "Paid research, public summary"],
  ["S2", "TechSci Research, India Sneakers Market press release", "https://techsciresearch.com/news/22791-india-sneakers-market.html", "Paid research, public summary"],
  ["S3", "Open Magazine, “Decathlon Has Outrun Nike, Adidas and Puma in India”", "https://openthemagazine.com/business/decathlon-has-outrun-nike-adidas-and-puma-in-india-can-it-win-serious-athletes", "Press, reporting company filings"],
  ["S4", "Apparel Resources, “Puma shifts strategy… amidst 10% sales growth in India”; Storyboard18, “How Puma beat Nike, Adidas and Reebok”", "https://apparelresources.com/business-news/retail/puma-shifts-strategy-focus-sports-performance-amidst-10-per-cent-sales-growth-india", "Trade press, reporting RoC filings"],
  ["S5", "Business Standard, “Decathlon revenue crosses ₹4,000 cr mark in FY24”", "https://www.business-standard.com/companies/news/decathlon-revenue-crosses-4-000-cr-mark-in-fy24-posts-profit-of-197-cr-125032800554_1.html", "Press"],
  ["S6", "Inc42, “Why Is Nike Handing Over India Ecommerce Biz To Nykaa?”", "https://inc42.com/?p=546863", "Press"],
  ["S7", "Business Insider India, “Nike shuts down 35% of its Indian stores” (2016)", "https://www.businessinsider.in/nike-shuts-down-35-of-its-indian-stores-to-cut-losses/articleshow/54427033.cms", "Press (historical)"],
  ["S8", "MarketScreener / Reuters, “New Balance's India partner Brandman to expand fivefold”", "https://www.marketscreener.com/news/new-balance-s-india-partner-brandman-to-expand-fivefold-add-global-brands-exec-says-ce7f5dd3dc80f524", "Wire service"],
  ["S9", "DFU Publications, “New Balance appoints Janhvi Kapoor as maiden Indian brand ambassador”", "https://dfupublications.com/index.php/news/apparel/new-balance-appoints-janhvi-kapoor-as-maiden-indian-brand-ambassador", "Trade press"],
  ["S10", "afaqs!, “Virat Kohli parts ways with Puma”", "https://www.afaqs.com/news/mktg/virat-kohli-parts-ways-with-puma-concludes-rs-110-cr-deal-after-8-years-8950139", "Trade press"],
  ["S11", "The Business of Fashion, “Adidas Prepares for Samba Slump”", "https://businessoffashion.com/news/retail/adidas-prepares-for-samba-slump/", "Press"],
  ["S12", "List-price checks: adidas.co.in (Samba OG), in.puma.com (Palermo), AJIO (Air Force 1 '07), Superkicks and VegNonVeg (NB 530)", "https://in.puma.com/in/en/footwear", "Retail listings, Nov 2026, prices change"],
  ["S13", "DataReportal, Instagram users, stats, data and trends", "https://datareportal.com/essential-instagram-stats", "Analyst, from Meta ad tools"],
  ["S14", "NapoleonCat, Instagram users in India, December 2025", "https://stats.napoleoncat.com/instagram-users-in-india/2025/12/", "Third-party tracker, from Meta ad tools"],
  ["S15", "Bain & Company, How India Shops Online 2025", "https://www.bain.com/insights/how-india-shops-online-2025/", "Consultancy research"],
  ["S16", "Meta Newsroom, India shopper study (GWI, commissioned by Meta), June 2025", "https://about.fb.com/news/2025/06/creators-short-form-videos-and-messaging-are-disrupting-how-offline-retailers-sell-and-scale-in-india/", "Vendor-commissioned, treat with care"],
  ["S17", "BCG × Snap, The $2 Trillion Opportunity: How Gen Z is Shaping the New India (2024)", "https://www.bcg.com/publications/2024/india-the-2-trillion-opportunity-how-gen-z-is-shaping-the-new-india", "Consultancy, platform-commissioned"],
  ["S18", "Redseer, Gen Z: Defining Trends, Influencing Spends", "https://redseer.com/articles/gen-z-defining-trends-influencing-spends/", "Consultancy research"],
  ["S19", "EY × Collective Artists Network, State of Influencer Marketing in India (Apr 2024)", "https://ey.com/en_in/news/2024/04/indias-influencer-marketing-industry-estimated-to-reach-inr-3375-crore-by-2026-ey-collective-artists-networks-big-bang-social-report", "Consultancy research"],
  ["S20", "Kofluence Influencer Marketing Report (via The Tribune)", "https://www.tribuneindia.com/news/business/indias-3-5-4-5-million-creator-economy-powers-3500-crore-influencer-marketing-industry-growth-kofluence-influencer-marketing-report-2025", "Agency estimate"],
  ["S21", "LocalCircles survey via Inc42, “About 1 in 5 online shoppers received fake products”", "https://inc42.com/buzz/about-1-in-5-online-shoppers-received-fake-products-survey", "Community survey"],
  ["S22", "ASPA × CRISIL, State of Counterfeiting in India 2025 (via ThePrint)", "https://theprint.in/feature/indias-fake-goods-boom-9-in-10-urban-shoppers-have-bought-knockoffs-says-survey/2880659", "Industry survey"],
  ["S23", "OwlClaw, Meta Ads benchmarks, India", "https://owlclaw.com/benchmarks/meta-ads-benchmarks-india", "Vendor benchmark, client data"],
  ["S24", "Jon Loomer, “Is the Learning Phase 10 or 50 Events?”", "https://www.jonloomer.com/learning-phase/", "Practitioner, citing Meta documentation"],
  ["S25", "eChai Ventures, “India GST and Meta Ads: what D2C founders need to know”", "https://echai.ventures/d2c/r/india-gst-and-meta-ads-what-d2c-founders-need-to-know--r-india-gst-and-meta-ads-what-d2c-founders", "Secondary guide"],
];
const c = (...ids) => `<sup class="src">[${ids.join(", ")}]</sup>`;
const V = `<span class="tag v">Verified</span>`, AS = `<span class="tag a">Assumption</span>`, H = `<span class="tag h">Hypothesis</span>`, R = `<span class="tag r">Recommendation</span>`;
const img = (k, cls = "") => `<img class="fig ${cls}" src="../assets/${k}.png" alt="${k.replace(/-/g, " ")}">`;

const decision = (d, alts, why) => `
<div class="decision"><div class="dl">Strategist's note</div>
  <p><b>Decision.</b> ${d}</p><p><b>Alternatives considered.</b> ${alts}</p><p><b>Why.</b> ${why}</p></div>`;

const sec = (n, title, lede, body, cls = "") => `
<section class="sec ${cls}"><div class="num">${String(n).padStart(2, "0")}</div><h2>${title}</h2>${lede ? `<p class="lede">${lede}</p>` : ""}${body}</section>`;

const table = (head, rows, cls = "") => `<table class="rt ${cls}"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr${r.hl ? ' class="hl"' : ""}>${(r.cells || r).map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

const css = `
@page { size: A4; margin: 16mm 17mm 20mm; }
@page cover { margin: 0; }
@page wide { size: A4 landscape; margin: 14mm 16mm 18mm; }
body { font-size: 9.6pt; }
.cover { page: cover; height: 297mm; background: #101217; color: #fff; padding: 22mm 20mm; position: relative; overflow: hidden; page-break-after: always; z-index: 10; }
.cover .k { font: 600 9pt Inter; letter-spacing: .2em; text-transform: uppercase; color: #ff4f2e; }
.cover h1 { font-size: 54pt; margin-top: 30mm; line-height: .98; }
.cover .sub { font-size: 15pt; color: #c9d1ea; margin-top: 8mm; max-width: 140mm; }
.cover .shoe { position: absolute; right: -12mm; bottom: 58mm; opacity: .95; }
.cover .meta { position: absolute; left: 20mm; right: 20mm; bottom: 20mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8mm; font-size: 9pt; color: #c9d1ea; border-top: 1px solid #2e3445; padding-top: 6mm; }
.cover .meta b { display: block; color: #fff; font-size: 10pt; }
.cover .disc { margin-top: 10mm; display: inline-block; border: 1px solid #ff4f2e; color: #ffd5cb; padding: 3mm 4mm; border-radius: 2mm; font-size: 8.5pt; max-width: 150mm; }
.sec { page-break-before: always; }
.sec.wide { page: wide; }
.sec.wide .fig { max-height: 120mm; width: auto; max-width: 100%; margin-left: auto; margin-right: auto; page-break-inside: avoid; }
.sec.wide .fig.p { page-break-before: always; }
.num { font: 700 40pt "Space Grotesk"; color: #ff4f2e; line-height: 1; }
h2 { font-size: 22pt; margin: 2mm 0 3mm; }
h3 { font-size: 12pt; margin: 6mm 0 2mm; }
.lede { font-size: 11.5pt; color: #3b4150; max-width: 165mm; margin-bottom: 5mm; }
p { margin: 0 0 2.6mm; }
ul.b { margin: 0 0 3mm 4.5mm; } ul.b li { margin-bottom: 1.4mm; }
.fig { width: 100%; border: 1px solid #e4e7ec; border-radius: 3mm; margin: 3mm 0 4mm; display: block; }
.fig.half { width: 100%; }
.rt { width: 100%; border-collapse: collapse; margin: 2mm 0 5mm; font-size: 8.6pt; page-break-inside: auto; }
.rt th { text-align: left; font: 700 7pt Inter; letter-spacing: .08em; text-transform: uppercase; color: #3b4150; border-bottom: 1.5px solid #101217; padding: 2mm 2mm; }
.rt td { border-bottom: 1px solid #e4e7ec; padding: 2mm; vertical-align: top; }
.rt tr { page-break-inside: avoid; }
.rt tr.hl td { background: #ffe9e3; font-weight: 600; }
.rt td:first-child { font-weight: 600; }
.decision { background: #f4f6f9; border-radius: 3mm; padding: 4mm 5mm; margin: 4mm 0; page-break-inside: avoid; font-size: 9pt; }
.decision .dl { font: 700 7.5pt Inter; letter-spacing: .14em; text-transform: uppercase; color: #ff4f2e; margin-bottom: 2mm; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 4mm 0; }
.stat { background: #f4f6f9; border-radius: 3mm; padding: 4mm; page-break-inside: avoid; }
.stat .n { font: 700 16pt "Space Grotesk"; color: #101217; white-space: nowrap; }
.stat .l { font-size: 8pt; color: #3b4150; margin-top: 1mm; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
.swot { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.swot > div { border-radius: 3mm; padding: 4mm 5mm; page-break-inside: avoid; }
.swot h3 { margin-top: 0; }
.legend { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 4mm 0; }
.legend div { background: #f4f6f9; border-radius: 3mm; padding: 3mm; font-size: 8.3pt; }
.box { border: 1.5px solid #101217; border-radius: 3mm; padding: 5mm; margin: 4mm 0; page-break-inside: avoid; }
.box.accent { border-color: #ff4f2e; background: #fff8f6; }
.formula { font-family: Consolas, monospace; font-size: 8.4pt; background: #f4f6f9; border-radius: 2mm; padding: 3mm 4mm; margin: 2mm 0 4mm; white-space: pre-wrap; }
.toc { columns: 2; column-gap: 10mm; margin-top: 4mm; }
.toc div { break-inside: avoid; display: flex; gap: 3mm; padding: 1.6mm 0; border-bottom: 1px solid #e4e7ec; font-size: 10pt; }
.toc b { color: #ff4f2e; width: 8mm; }
.src-list { font-size: 7.6pt; } .src-list td { padding: 1.4mm 2mm; } .src-list a { color: #1f4fd1; word-break: break-all; text-decoration: none; }
`;

const toc = [
  "Executive summary", "Business problem & market overview", "Competitor analysis", "Customer personas", "Motivations, pain points & research plan",
  "Customer journey map", "SWOT analysis", "Positioning & value proposition", "SMART objectives", "Funnel & channel strategy",
  "Content & advertising strategy", "Budget allocation", "KPI measurement framework", "Risk assessment", "Recommendations, limitations & next steps",
];

function render(CSS) {
  const r = S.base.rows;
  const body = `

<div class="cover">
  <div class="k">Marketing strategy case study · Portfolio Project 01</div>
  <h1>AeroRun<br>Launch Strategy</h1>
  <div class="sub">Launching a fictional ₹5,999 style-led sneaker to 18–25-year-olds in India's metros on Instagram and Facebook, with a ₹1,00,000 test-and-learn budget.</div>
  <div class="disc">AeroRun is a <b>fictional product</b> created for an <b>independent educational simulation</b>. It is not a real Nike product, and this work was not commissioned by, affiliated with or endorsed by Nike, Inc. Brand names are used only for analysis. Campaign results are projections, not real performance data.</div>
  <div class="shoe">${A.shoe(560, "#101217", "#ffffff", "#ff4f2e")}</div>
  <div class="meta"><div><b>Prepared as</b>Junior strategist, independent portfolio</div><div><b>Market</b>Indian metros · age 18–25 · Instagram + Facebook</div><div><b>Date</b>November 2026</div></div>
</div>

<section class="sec" style="page-break-before:auto">
  <h2>Contents</h2>
  <div class="toc">${toc.map((t, i) => `<div><b>${String(i + 1).padStart(2, "0")}</b>${t}</div>`).join("")}<div><b>A</b>Proposed customer survey</div><div><b>B</b>Sources and evidence quality</div></div>
  <h3 style="margin-top:10mm">How to read this report</h3>
  <p>Every claim carries one of four labels. A recruiter should be able to tell at a glance what is known, what is estimated and what is being proposed.</p>
  <div class="legend">
    <div>${V}<br><br>From a named, dated public source. Citations like ${c("S3")} point to Appendix B. “Verified” means <i>sourced</i>, not <i>audited</i>.</div>
    <div>${AS}<br><br>A number or condition we chose in order to plan, such as ad costs or conversion rates. It can be changed, and the maths reruns.</div>
    <div>${H}<br><br>A belief about customers that we haven't tested yet. Each one has a test in Section 05.</div>
    <div>${R}<br><br>What we advise doing, based on the three above.</div>
  </div>
  <div class="box"><b>Honesty note.</b> No customer interviews, survey results, testimonials or campaign results have been invented. The personas are <i>proto-personas</i>, and every campaign outcome in this document is a <b>hypothetical projection</b> from stated assumptions.</div>
</section>

${sec(1, "Executive summary", "AeroRun can win the under-₹7,000 style buyer. ₹1,00,000 won't build that position, but it can prove which message, creator and audience will.", `
<div class="stats">
  <div class="stat"><div class="n">$3.2–4.0bn</div><div class="l">India sneaker market, 2024–25 estimates ${c("S1", "S2")} ${V}</div></div>
  <div class="stat"><div class="n">₹5,999</div><div class="l">Lowest list price among the four iconic lifestyle pairs we compared ${c("S12")} ${V}</div></div>
  <div class="stat"><div class="n">${B.purchases}</div><div class="l">Purchases in the base case: about 5 a week ${AS}</div></div>
  <div class="stat"><div class="n">${B.totalRoas.toFixed(2)}×</div><div class="l">Gross revenue ÷ total budget, base case. Not profitable ${AS}</div></div>
</div>
<h3>The situation</h3>
<p>India's sneaker market is estimated at roughly US$3.2–4.0 billion, growing at about 5.5–5.9% a year ${c("S1", "S2")} ${V}. Nike is the most aspirational global name but not the biggest in India: reported FY25 revenue was about ₹1,381 crore for Nike India against about ₹3,259 crore for Adidas India ${c("S3")} ${V}. Each competitor's lifestyle icon lists at ₹6,999 or more, and two of them list above ₹10,000 ${c("S12")} ${V}.</p>
<h3>The strategy in one line</h3>
<p><b>“Light on your feet. Loud on your feed.”</b> Position AeroRun as the most affordable way into an iconic-brand look. Launch it Reels-first through five micro-creators, test three creative angles (style, comfort, value) and back the winner with the held-back reserve ${R}.</p>
<h3>What ₹1,00,000 can and can't do</h3>
<p>Under assumed Indian Meta benchmarks, the base case gives about ${num(B.reach)} people reached, ${num(B.lpv)} landing-page views and ${B.purchases} purchases. That means a media cost per acquisition (CPA) of ${inr(B.mediaCpa)}, or ${inr(B.totalCpa)} once creators and content are counted ${AS}. At about 5 purchases a week, Meta's sales optimisation can't leave its learning phase, which needs roughly 50 optimisation events per ad set per week ${c("S24")}. So the campaign is designed to <b>learn</b>, not to make a profit ${R}.</p>
<h3>Top recommendations</h3>
<ul class="b">
  <li>Run the 15-minute survey (Appendix A) <b>before</b> spending, to test the price and creator hypotheses ${R}.</li>
  <li>Judge success on learning KPIs: hook rate, cost per landing-page view and add-to-cart rate. Don't judge on ROAS from 28 sales ${R}.</li>
  <li>Build trust where doubt peaks: official-store cues, visible reviews and a free size exchange ${R}.</li>
  <li>Go to a scale phase only if the scale-gate criteria in Section 15 are met ${R}.</li>
</ul>`)}

${sec(2, "Business problem & market overview", "Business problem: How might a fictional ₹5,999 Nike sneaker win a place in the consideration set of style-driven 18–25 metro buyers, who currently default to Puma's accessible style or the Adidas and New Balance trend pairs, with only ₹1,00,000?", `
<h3>Market size and growth</h3>
${table(["Indicator", "Figure", "Source", "Label"], [
  ["India sneaker market", "US$3.98 bn (2025) → US$6.53 bn (2034), 5.65% CAGR", c("S1"), V],
  ["India sneaker market (alt. estimate)", "US$3.20 bn (2024) → US$4.49 bn (2030), 5.87% CAGR", c("S2"), V],
  ["What we use", "A <b>range</b> of US$3.2–4.0 bn, because the estimates differ by base year and method", "—", AS],
])}
<p>Research firms disagree by about 25% on market size. A good analyst shows the range instead of picking the most flattering number. For a ₹1 lakh launch the exact size barely matters. What matters is that the category is large and growing, and that the 18–25 buyer is reachable on Meta.</p>
<h3>Competitive landscape</h3>
${table(["Indicator", "Figure", "Source", "Label"], [
  ["Adidas India Marketing revenue", "≈ ₹3,259 crore (FY25)", c("S3"), V],
  ["Puma India revenue", "≈ ₹3,274 crore (CY2023); ₹2,980 crore (CY2022)", c("S4"), V],
  ["Nike India revenue", "≈ ₹1,381 crore (FY25), reported up 14% year on year", c("S3", "S6"), V],
  ["Decathlon India revenue", "> ₹4,000 crore (FY24), a value-sport player bigger than all three", c("S5"), V],
  ["Nike India e-commerce", "Operated with Nykaa as local service partner; Nike.in relaunch dated 30 Jan 2026", c("S6"), V],
])}
<p class="small muted">Puma reports on a calendar year and the others on an April–March year, so the figures aren't perfectly comparable. All figures are press reports of company filings; before external use, cross-check them on the MCA portal.</p>
<h3>Audience and platform signals</h3>
${table(["Signal", "Evidence", "Source", "Label"], [
  ["Instagram reach in India", "≈ 414 million users (Jan 2025, Meta ad-tool data)", c("S13"), V],
  ["Age skew", "18–24 is the largest Instagram age group in India", c("S14"), V],
  ["Gen Z discovers online", "≈ 70% of Gen Z shoppers discover brands online; Gen Z ≈ 40% of e-retail shoppers", c("S15"), V],
  ["Social as discovery", "≈ 8 in 10 Indian shoppers discover products on social media (Meta-commissioned)", c("S16"), V],
  ["Price sensitivity", "Gen Z average purchase value on fashion platforms is about half that of millennials", c("S18"), V],
  ["Trust problem", "≈ 1 in 5 online shoppers received a fake product in 12 months; shoes among the top categories", c("S21"), V],
  ["Creator economy", "Influencer marketing ≈ ₹3,000–4,500 crore (2025 estimates)", c("S19", "S20"), V],
])}
${decision("Treat the 18–25 metro buyer as reachable and style-motivated but price-cautious and trust-anxious. The trust and price signals shape the strategy as much as the reach data does.",
  "Lead with the market-size story (“a $4 bn market!”); use one market-size number.",
  "Market size impresses nobody in an interview. The useful insight is the gap between AeroRun's price and competitors' icons, plus the counterfeit fear that blocks online purchase. Showing the range of estimates proves you can handle conflicting data.")}`)}

${sec(3, "Competitor analysis", "Each competitor wins on something different. None of them owns “iconic big-brand style under ₹6,000”.", `
${img("competitor-table")}
${img("price-ladder", "p")}
<p><b>Reading the table.</b> Puma's scale comes from accessible pricing and celebrity and cricket marketing, but its long Virat Kohli partnership has ended ${c("S10")} ${V}. Adidas owns the terrace trend and is already preparing for a Samba slowdown ${c("S11")} ${V}. New Balance is growing fast from a small base: its retail partner reported ₹162 crore revenue (+20%) for FY26 and plans a fivefold store expansion ${c("S8")}, with Janhvi Kapoor as its first Indian ambassador ${c("S9")} ${V}. Nike has the strongest aspiration but trails in India revenue and has a history of shrinking its store network ${c("S3", "S7")} ${V}.</p>
${decision("Benchmark AeroRun against each rival's <i>lifestyle icon</i>, not their whole range.",
  "Compare against cheaper entry models (sub-₹4,000 Nike, Puma and Adidas runners) or against unbranded D2C sneakers.",
  "The 18–25 style buyer compares the shoe they'd be <i>seen</i> in. Against entry runners AeroRun looks expensive; against the icons it looks like smart value. Choosing the comparison set is itself a positioning decision.")}`, "wide")}

${sec(4, "Customer personas", "Three proto-personas built from the secondary research and your initial hypotheses. They are starting points to validate, not findings.", `
${img("persona-1-aarav")}
${img("persona-2-meera", "p")}
${img("persona-3-kabir", "p")}
<div style="page-break-before:always"></div>
${table(["Persona", "Role in the plan", "Why"], [
  { cells: ["Aarav: Feed-First Stylist", "<b>Primary</b>: most budget and creative", "Matches the brief's core (style motivation, Instagram-native, price-aware) and sits where the Gen Z evidence is strongest " + c("S15", "S18")], hl: true },
  ["Meera: Versatile Professional", "Secondary: conversion and retargeting", "Has her own income, so she is more likely to convert at ₹5,999, but researches longer, so she responds to reviews and styling"],
  ["Kabir: Culture Climber", "Tertiary: content and community", "High influence on peers and drives the UGC culture, but a parent often pays (hypothesis), so direct conversion is less likely"],
])}
${decision("Make Aarav the primary persona and build the journey map around him.",
  "Make Meera primary because she has more spending power; give all three personas equal budget.",
  "Equal budgets would split ₹1 lakh three ways and leave every test too small to read. Aarav is the best match for the brief and the evidence; Meera is the better buyer, so retargeting and reviews are built for her.")}`, "wide")}

${sec(5, "Motivations, pain points & research plan", "Your four starting hypotheses are useful but unproven. Here is how much evidence each has today, and how we'd test it.", `
${table(["Hypothesis", "Existing evidence", "Status", "How we test it"], [
  [`H1. Fashion creators influence young buyers ${H}`, `Creator spend is large and growing ${c("S19", "S20")}; Meta-commissioned research says social drives discovery ${c("S16")}. Neither shows creators <i>cause</i> sneaker purchases.`, "Partly supported, indirect", "Survey Q8–Q9; A/B test of creator partnership ads vs brand-only ads at equal spend"],
  [`H2. Visual presentation drives discovery ${H}`, `≈ 70% of Gen Z discover brands online ${c("S15")}; short video drives purchase intent (vendor data) ${c("S16")}.`, "Supported for discovery", "Hook-rate and cost-per-LPV comparison across the three creative angles"],
  [`H3. Price sensitivity blocks purchase ${H}`, `Gen Z spends about half as much per purchase as millennials ${c("S18")}; rivals discount often ${c("S12")}.`, "Supported, but its strength at ₹5,999 is unknown", "Van Westendorp price questions (Q11–Q14); add-to-cart vs purchase drop-off"],
  [`H4. Quality, reviews and value perception drive the decision ${H}`, `Fake shoes are among the most-reported counterfeit categories online ${c("S21", "S22")}.`, "Supported for trust", "Survey Q15–Q16; landing-page test with vs without a trust block"],
])}
<div class="two">
  <div><h3>Motivations (why they'd buy)</h3><ul class="b"><li><b>Social currency</b>: being seen in a recognised brand</li><li><b>Self-expression</b>: matching an aesthetic they follow</li><li><b>Smart value</b>: “the look without the ₹11k price tag”</li><li><b>Everyday comfort</b>: one pair for a long day</li></ul></div>
  <div><h3>Pain points (why they wouldn't)</h3><ul class="b"><li><b>Price anxiety</b>: ₹5,999 is a considered purchase at this age</li><li><b>Authenticity fear</b>: fakes sold through social ads</li><li><b>Fit uncertainty</b>: no try-on when buying online</li><li><b>“Is it basic?”</b>: fear of looking like the cheap option</li></ul></div>
</div>
<h3>Research plan</h3>
${table(["Phase", "Method", "Output", "Time"], [
  ["1. Desk research", "Market reports, filings coverage, platform data (this report)", "Market context, competitor table", "Done"],
  ["2. Competitor creative audit", "Meta Ad Library: log 20 active ads each from Nike, Adidas, Puma and New Balance India (format, hook, offer, CTA)", "Creative patterns, white space", "2 days"],
  ["3. Survey", "15-minute online survey, n ≈ 150 aged 18–25, quotas by city and gender (Appendix A)", "Hypotheses validated or rejected; price range", "1 week"],
  ["4. Interviews", "6–8 short video calls, two per persona", "Language for copy; journey corrections", "1 week"],
  ["5. Social listening", "Comments on competitor launch posts; sneaker community threads", "Objections in customers' own words", "Ongoing"],
])}
${decision("Run the survey before launch, even though it costs a week.",
  "Launch immediately and let the ad data “do the research”.",
  "Ad data tells you <i>what</i> happened, not <i>why</i>. A survey can test price acceptance and trust triggers cheaply. Finding the same answers through ad spend would use up much of the budget.")}`)}

${sec(6, "Customer journey map", "Doubt peaks at the Evaluate stage, so that's where the trust budget goes.", `${img("journey-map")}
<p>Awareness isn't the hard part; Meta delivers reach cheaply. The risk is at <b>Evaluate</b>, where price shock meets counterfeit fear, so the plan puts low-cost trust devices there: official-store badge, visible reviews and a free size exchange ${R}.</p>`, "wide")}

${sec(7, "SWOT analysis", "Strengths and weaknesses describe AeroRun and the campaign; opportunities and threats describe the market.", `
<div class="swot">
  <div style="background:#e3f5ee"><h3>Strengths</h3><ul class="b"><li>Nike's global aspirational equity (brand heritage)</li><li>Lowest list price among the compared icons ${c("S12")}</li><li>Running-derived comfort story ${AS}</li><li>Meta's precise age and city targeting</li></ul></div>
  <div style="background:#fff3ef"><h3>Weaknesses</h3><ul class="b"><li>₹1 lakh is tiny next to competitors' spend</li><li>New product, so zero reviews at launch</li><li>Nike trails Adidas and Puma in India revenue ${c("S3")}</li><li>No offline sampling or try-on in this budget</li></ul></div>
  <div style="background:#e5ecfd"><h3>Opportunities</h3><ul class="b"><li>Gen Z discovers brands online ${c("S15")}</li><li>Growing micro-creator economy ${c("S19")}</li><li>Terrace trend may cool, opening space for a new silhouette ${c("S11")}</li><li>Counterfeit fear rewards official-store trust messaging ${c("S21")}</li></ul></div>
  <div style="background:#f4f6f9"><h3>Threats</h3><ul class="b"><li>Competitor discounting narrows the price gap ${c("S12")}</li><li>Counterfeit or lookalike ads copying the launch</li><li>Value players such as Decathlon ${c("S5")}</li><li>Trend cycles, rising ad costs and creative fatigue</li></ul></div>
</div>
<h3>So what? (TOWS)</h3>
${table(["Combine", "Strategic move"], [
  ["Strength × Opportunity", `Use brand equity + price gap in creator-led Reels for an audience that discovers online ${R}`],
  ["Weakness × Opportunity", `Offset zero reviews with creator content and fast review collection from first buyers ${R}`],
  ["Strength × Threat", `Defend the price gap with value-adds (free size exchange), not discounts ${R}`],
  ["Weakness × Threat", `Small budget vs fakes: make the official-store badge part of every ad ${R}`],
])}`)}

${sec(8, "Positioning & value proposition", "Own the white space under ₹7,000 for style-first buyers, with a comfort story that keeps AeroRun from looking like ‘the cheap one’.", `
${img("positioning-map")}
<div class="box accent">
<p style="font-size:11pt"><b>Positioning statement.</b> For style-driven 18–25-year-olds in India's metros who want a recognisable global sneaker without paying ₹10,000+, <b>AeroRun</b> is the lightweight lifestyle runner that delivers iconic-brand style at ₹5,999, because it pairs a clean everyday silhouette with running-derived comfort ${AS}.</p>
<p style="font-size:11pt;margin:0"><b>Value proposition.</b> <i>Looks good in the fit check. Still feels light at 9 pm.</i></p>
</div>
${table(["Reason to believe", "Proof we'd show", "Label"], [
  ["Big-brand credibility", "Official store, global brand, authenticity badge", AS],
  ["Comfort", "Lightweight running-derived foam (an attribute assumed for this simulation)", AS],
  ["Value", "Price ladder vs competitors' list prices " + c("S12"), V],
  ["Social proof", "Creator styling, then buyer reviews from week 2", R],
])}
<p><b>Brand voice:</b> confident, playful and short. It talks like a friend reviewing your outfit, not like a sports-science lab.</p>
${decision("Position on <i>style plus comfort at an accessible price</i>, never on “cheapest”.",
  "(a) Pure performance positioning, as Nike usually does; (b) pure value positioning (“Nike for less”); (c) a hype or limited-drop position.",
  "(a) Contradicts the brief's style motivation. (b) Damages brand equity and invites the ‘cheap Nike’ label. (c) Needs scarcity and budget we don't have. Comfort is the tie-breaker that makes the value story credible.")}`)}

${sec(9, "SMART objectives", "Five objectives: four performance targets and one learning objective, which is the real point of a test budget.", `
${table(["#", "Objective", "KPI", "Target", "Deadline"], D.objectives.map((o, i) => [String(i + 1), o.label, o.kpi, o.target, o.by]))}
<p>Every target comes from the base-case model in Section 12 ${AS}. Each objective is <b>S</b>pecific (one metric), <b>M</b>easurable (Ads Manager or GA4), <b>A</b>chievable (the base case meets it), <b>R</b>elevant (it maps to a funnel stage) and <b>T</b>ime-bound (week 3 or week 6).</p>
${decision("Add an explicit <i>learning objective</i> next to the performance targets.",
  "Set only sales or ROAS targets.",
  "With about 28 projected sales, any ROAS number is mostly noise. The decision that matters is which angle and audience earn a bigger budget, so the objective has to measure that.")}`)}

${sec(10, "Funnel & channel strategy", "Instagram is where they discover; Facebook adds cheaper reach and retargeting. Everything lands on one product page built for trust.", `
${img("funnel")}
${table(["Channel / placement", "Role", "Formats", "Why"], [
  ["Instagram Reels + Explore", "Discovery (primary)", "9:16 creator partnership ads, 15–20 sec", "Where the 18–24 audience is largest " + c("S14")],
  ["Instagram Stories", "Consideration + conversion", "Colourway polls, swipe-up, last-call", "Full-screen, native for retargeting"],
  ["Instagram Feed carousels", "Consideration", "“3 ways to wear”, price ladder", "Saves are a useful intent signal"],
  ["Facebook Feed + Reels", "Cheap reach and retargeting", "Repurposed Reels, catalogue retargeting", "Lower CPMs; also reaches parents for Kabir-style gifting " + H],
  ["Organic Instagram + UGC", "Advocacy", "#AeroRunFitCheck reposts", "Builds social proof the paid ads can use"],
])}
<h3>Targeting</h3>
<ul class="b"><li><b>Geography:</b> Mumbai, Delhi NCR, Bengaluru, Hyderabad, Pune and Chennai ${AS}.</li><li><b>Prospecting:</b> age 18–25, broad interests (Advantage+ audience), so Meta's algorithm finds buyers instead of us guessing interests.</li><li><b>Retargeting:</b> 50% video viewers (30 days), Instagram engagers (30 days), product-page visitors who didn't buy (14 days).</li><li><b>Not used:</b> lookalike audiences, because a new product has no buyer data to seed them yet.</li></ul>
${decision("Keep to Meta only, Instagram-led, with three funnel stages.",
  "Add YouTube Shorts, Snapchat or Google Search; or go conversion-only from day one.",
  "₹50,847 of net media spread over several platforms gives every platform too little data to learn from. A conversion-only setup would need far more purchases than the budget can buy to exit the learning phase " + c("S24") + ". Brand search on Google is the first channel to add in a scale phase.")}`)}

${sec(11, "Content & advertising strategy", "One campaign idea, three testable angles, five creators. The test tells us which story the money should follow.", `
${img("ad-mockups")}
${table(["Angle", "Core message", "Persona", "Hook (first 1–2 seconds)", "Proof point"], [
  ["A · Fit Check", "One pair, every outfit", "Aarav", "Fast outfit transitions on a beat", "Creator styling"],
  ["B · All-Day Light", "Comfortable from 9 am to 9 pm", "Meera", "Time-lapse of one long day", "Weight and comfort demo"],
  ["C · Price Smart", "Iconic style under ₹6K", "Aarav, Kabir", "Price tag ‘flip’ against the ladder", "List-price comparison"],
])}
<h3>Creative specifications</h3>
${table(["Asset", "Spec", "Notes"], [
  ["Reels / partnership ads", "9:16, 1080×1920, 15–20 sec, captions burned in", "Logo by second 3; product within 1 sec; keep safe zones clear of UI"],
  ["Stories", "9:16, 3 frames, poll or slider sticker", "Frame 3 = offer and CTA"],
  ["Carousels", "4:5, 1080×1350, 5 cards", "Card 1 is the hook; card 5 is the CTA"],
  ["Creator brief", "1 Reel + 3 Stories, 30-day ad usage rights", "Must show: authentic styling, size worn, official store link"],
])}
<h3>Organic content pillars (6 weeks, about 4 posts a week)</h3>
${table(["Pillar", "Share", "Example"], [["Style", "40%", "“3 fits, 1 pair” Reels, colourway drops"], ["Proof", "25%", "Comfort test, materials close-up, FAQ on sizing"], ["Community", "25%", "#AeroRunFitCheck reposts, creator takeovers"], ["Offer", "10%", "Launch week, free size exchange reminder"]])}
${img("timeline")}
${decision("Five micro-creators instead of one bigger name.",
  "One mid-tier or macro creator for the whole ₹25,000; or no creators and brand-made content only.",
  "Five creators give five different audiences and content styles to test, plus usage rights for whitelisted ads. One creator is a single bet with no comparison. Brand-only content gives up the creator-trust signal (H1) the brief asks us to test. Creator fees are an assumption; we'd confirm them with quotes.")}`)}

${sec(12, "Budget allocation", `How the hypothetical ₹1,00,000 is split, and what it is assumed to buy.`, `
${img("budget")}
<h3>Media maths: base case</h3>
${table(["Stage", "Net spend", "CPM (assumed)", "Impressions", "CTR (assumed)", "Link clicks", "LPVs", "CVR (assumed)", "Purchases"],
  r.map((x) => [x.stage, inr(x.spend), inr(x.cpm), num(x.impressions), pct(x.ctr, 2), num(x.clicks), num(x.lpv), pct(x.cvr), x.purchases.toFixed(1)]).concat([{ cells: ["Total", inr(B.spend), "—", num(B.impressions), pct(B.ctr, 2), num(B.clicks), num(B.lpv), "—", String(B.purchases)], hl: true }]))}
<div class="formula">Net media     = ₹60,000 ÷ 1.18 (18% GST, assumed) = ${inr(D.mediaNet)}
Impressions   = spend ÷ CPM × 1,000          e.g. ${inr(r[0].spend)} ÷ ₹80 × 1,000 = ${num(r[0].impressions)}
Link clicks   = impressions × CTR
LPVs          = clicks × 80% (page actually loads)
Purchases     = LPVs × conversion rate
Media CPA     = net media ÷ purchases        = ${inr(B.spend)} ÷ ${B.purchases} = ${inr(B.mediaCpa)}
Fully loaded  = ₹1,00,000 ÷ ${B.purchases} = ${inr(B.totalCpa)} per customer</div>
<h3>Three scenarios</h3>
${table(["Scenario", "Assumption change", "Reach", "LPVs", "Purchases", "Media CPA", "Gross revenue", "Revenue ÷ total budget"], [
  ["Conservative", "CPM +25%, CVR −40%", num(S.conservative.totals.reach), num(S.conservative.totals.lpv), String(S.conservative.totals.purchases), inr(S.conservative.totals.mediaCpa), inr(S.conservative.totals.revenue), S.conservative.totals.totalRoas.toFixed(2) + "×"],
  { cells: ["Base", "As in the table above", num(B.reach), num(B.lpv), String(B.purchases), inr(B.mediaCpa), inr(B.revenue), B.totalRoas.toFixed(2) + "×"], hl: true },
  ["Optimistic", "CPM −10%, CVR +60%", num(S.optimistic.totals.reach), num(S.optimistic.totals.lpv), String(S.optimistic.totals.purchases), inr(S.optimistic.totals.mediaCpa), inr(S.optimistic.totals.revenue), S.optimistic.totals.totalRoas.toFixed(2) + "×"],
])}
<p class="small"><b>Assumption sources.</b> CPMs sit inside the India range of about ₹50–120 and implied CPCs inside ₹8–25 from a vendor benchmark ${c("S23")}. Conversion rates, the 80% landing-page-view rate and the 3.4 frequency are our assumptions. GST treatment depends on Meta's billing entity, and GST-registered advertisers may claim input credit ${c("S25")}. Revenue is gross at list price, before GST, returns and product cost, so it isn't profit.</p>
${decision("Allocate 60% to media, 25% to creators, 10% to content and keep 5% in reserve.",
  "90% media with brand-made assets only; or 50/50 media and creators.",
  "Ads are only as good as their creative, and creator content doubles as ad creative through partnership ads. The 5% reserve buys flexibility: it goes to the week-3 winner instead of being guessed on day 1.")}`)}

${sec(13, "KPI measurement framework", "Every KPI has a formula, a target, a data source and a pre-agreed action if it misses.", `
${table(["Stage", "KPI", "Formula", "Target", "Source", "If off-track"], [
  ["Awareness", "CPM", "spend ÷ impressions × 1,000", "≤ ₹80 (prospecting)", "Ads Manager", "Broaden audience, refresh creative"],
  ["Awareness", "Hook rate", "3-sec views ÷ impressions", "≥ 25%", "Ads Manager", "Re-cut the first second"],
  ["Awareness", "Frequency", "impressions ÷ reach", "≤ 3.5 over 6 weeks", "Ads Manager", "Add creative variants"],
  ["Consideration", "Link CTR", "link clicks ÷ impressions", `≥ ${pct(B.ctr, 1)} blended`, "Ads Manager", "Test new hooks and CTAs"],
  ["Consideration", "Cost per LPV", "spend ÷ landing-page views", `≤ ₹20 (base ${inr(B.costPerLpv)})`, "Ads Manager + GA4", "Check page speed; shift budget to the winning angle"],
  ["Conversion", "Add-to-cart rate", "add-to-carts ÷ LPVs", "≥ 8%", "Pixel / CAPI + GA4", "Fix sizing info, price framing"],
  ["Conversion", "Conversion rate", "purchases ÷ LPVs", `≈ ${pct(B.purchases / B.lpv)} blended`, "GA4", "Strengthen the trust block, test the exchange message"],
  ["Conversion", "Media CPA", "net media ÷ purchases", "≤ ₹2,000", "Ads Manager", "Pause bottom 30% of ads"],
  ["Conversion", "Media ROAS", "revenue ÷ net media", `report only (base ${B.mediaRoas.toFixed(1)}×)`, "Ads Manager", "Directional only at this volume"],
  ["Advocacy", "UGC volume", "#AeroRunFitCheck posts", "Track; no target in week 1–6", "Instagram", "Increase prompts, repost more"],
  ["Advocacy", "Review rating", "average star rating", "≥ 4.2 / 5 once 20+ reviews", "Product page", "Investigate fit or quality issues"],
])}
<p><b>Measurement setup:</b> Meta Pixel plus Conversions API, GA4 with UTMs per creator and angle (e.g. <code>utm_content=angleA_creator3</code>), and a weekly dashboard. Attribution: Meta's default 7-day click / 1-day view, read as directional, with GA4 as a cross-check ${R}.</p>
${decision("Make add-to-cart and cost per LPV the main optimisation signals, with purchases as the final score.",
  "Optimise and judge everything on purchases and ROAS.",
  `At about ${D.learningPhase.weeklyPurchasesBase} purchases a week, purchase optimisation can't reach the roughly 50 weekly events Meta's learning phase needs ${c("S24")}. Add-to-carts (about ${D.learningPhase.weeklyAddToCartBase} a week in the base case) and LPVs are frequent enough to give the algorithm a usable signal.`)}`)}

${sec(14, "Risk assessment", "The biggest risks aren't creative. They are statistical (too little data) and trust (fakes and discounting).", `
${table(["#", "Risk", "Likelihood", "Impact", "Mitigation", "Early-warning signal"], [
  ["R1", "Too few conversions to optimise (Meta's learning phase)", "High", "High", "Optimise to ATC/LPV; consolidate ad sets; judge on learning KPIs", "‘Learning limited’ status in week 1"],
  ["R2", "Competitor discounts erase the price gap", "Medium", "High", "Compete on value-adds (free size exchange), not discounts", "Rival sale prices below ₹6,000 in listings"],
  ["R3", "Counterfeit or lookalike ads copy the launch", "Medium", "Medium", "Official-store badge in every ad; report fakes through Meta's IP tools", "Comments asking “is this real?”"],
  ["R4", "Creator underperforms or brand-safety issue", "Medium", "Medium", "Five creators instead of one; vet past content; contract approval rights", "Low hook rate on one creator's ad"],
  ["R5", "Creative fatigue", "High", "Medium", "3 angles × 2 cuts each; refresh in week 3", "Frequency > 3.5, CTR falling week on week"],
  ["R6", "Measurement gaps (consent, iOS, view-through credit)", "Medium", "Medium", "CAPI + UTMs + GA4 cross-check", "Ads Manager and GA4 differ by > 30%"],
  ["R7", "Survey sample bias (college convenience sample)", "High", "Low", "City and gender quotas; treat as directional", "Responses skewed to one city or college"],
])}`)}

${sec(15, "Recommendations, limitations & next steps", "Run this as a disciplined experiment, decide with pre-set rules, then earn a bigger budget.", `
<h3>Recommendations</h3>
<ol class="b" style="margin-left:5mm">
  <li><b>Validate first.</b> Run the survey and Ad Library audit in weeks −2 and −1. Drop or rework any angle the survey rejects ${R}.</li>
  <li><b>Lead with creators, Reels first.</b> Use partnership ads so creator credibility carries into paid reach ${R}.</li>
  <li><b>Put trust at the point of doubt.</b> Official-store badge, size guide, free size exchange and reviews above the fold ${R}.</li>
  <li><b>Optimise for signals the budget can afford</b>: LPV and ATC first, purchases as the score ${R}.</li>
  <li><b>Decide in week 3 by pre-agreed rules</b>: release the reserve to the angle with ≥ 30% lower cost per LPV after ≥ 10,000 impressions ${R}.</li>
</ol>
<div class="box accent"><b>Scale gate (decide after week 6).</b> Recommend a ₹5 lakh second phase only if <b>all three</b> hold: media CPA ≤ ₹2,000; add-to-cart rate ≥ 8%; and one angle clearly beats the others. If not, keep the winning content, fix the weakest funnel stage and retest at ₹50,000 ${R}.</div>
<h3>Limitations</h3>
<ul class="b">
  <li>All campaign outcomes are projections from assumed benchmarks. Real CPMs and conversion rates vary by season, creative and product page.</li>
  <li>Competitor revenues come from press coverage of filings, with different fiscal years. Prices are dated list-price snapshots.</li>
  <li>Personas are proto-personas; no primary research has been done yet.</li>
  <li>Product attributes (foam, weight, colourways) are invented for the simulation.</li>
  <li>The model ignores margin, returns, GST on sales and repeat purchases, so it isn't a profit-and-loss statement.</li>
</ul>
<h3>Future improvements</h3>
<ul class="b"><li>Replace assumptions with survey results and real ad data, then rerun the model.</li><li>Add a profitability layer (gross margin, return rate, customer lifetime value) to set a true break-even CPA.</li><li>In a scale phase, add Google brand search, a quick-commerce or marketplace presence and offline try-on events.</li></ul>`)}

<section class="sec"><div class="num">A</div><h2>Proposed customer survey</h2>
<p class="lede">15 minutes, n ≈ 150, aged 18–25, six metros. Distributed through college networks and Instagram Stories with quotas. No results are reported here because none exist yet.</p>
${table(["#", "Question", "Type", "Tests"], [
  ["Q1", "Age; city; student or working", "Screener", "Quotas"],
  ["Q2", "How many pairs of sneakers have you bought in the last 12 months?", "Single choice", "Category engagement"],
  ["Q3", "What did you pay for your most recent pair?", "Price bands", "Price anchor"],
  ["Q4", "Where did you first see the last pair you bought?", "Multiple choice", "H2 discovery"],
  ["Q5", "Rank: style, comfort, price, brand, reviews, durability", "Ranking", "Motivations"],
  ["Q6", "Which brands would you consider for a ₹5,000–8,000 lifestyle sneaker?", "Multi-select", "Consideration set"],
  ["Q7", "Show AeroRun concept: describe it in three words", "Open", "Positioning fit"],
  ["Q8", "Have you bought something after seeing a creator wear or review it?", "Yes/No + which", "H1"],
  ["Q9", "Which kind of creator do you trust most for sneakers?", "Single choice", "H1 creator type"],
  ["Q10", "Which ad would make you tap first? (show A, B, C)", "Choice + why", "Angle pre-test"],
  ["Q11–Q14", "At what price would AeroRun be: too cheap to trust / a bargain / getting expensive / too expensive?", "Van Westendorp", "H3 price"],
  ["Q15", "What stops you buying sneakers online? (fakes, fit, returns, price…)", "Multi-select", "H4 barriers"],
  ["Q16", "Which of these would make you trust an online sneaker purchase?", "Multi-select", "H4 trust devices"],
  ["Q17", "Who pays for a sneaker purchase like this?", "Single choice", "Kabir co-decision hypothesis"],
])}
<p><b>Analysis plan:</b> split results by persona-like segment (student vs working, city); compute the Van Westendorp acceptable price range; and update the personas, angle priorities and the ₹5,999 assumption before any media is spent.</p></section>

<section class="sec"><div class="num">B</div><h2>Sources and evidence quality</h2>
<p class="lede">All links were accessed in November 2026. The quality column shows how much each source should be trusted.</p>
<table class="rt src-list"><thead><tr><th>ID</th><th>Source</th><th>Type / quality</th></tr></thead><tbody>
${SOURCES.map(([id, t, u, q]) => `<tr><td>${id}</td><td>${t}<br><a href="${u}">${u}</a></td><td>${q}</td></tr>`).join("")}
</tbody></table></section>
`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>AeroRun Launch Strategy</title><style>${CSS}${css}</style></head><body>${body}</body></html>`;
}

module.exports = { render, SOURCES };
