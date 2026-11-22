// Single source of truth for every number in the report, deck and assets.
// All media benchmarks are ASSUMPTIONS (see sources) — change them here and rebuild.
const assert = require("assert");

const TOTAL_BUDGET = 100000;
const GST = 0.18; // ASSUMPTION: 18% GST on Meta ad spend, budget is GST-inclusive
const PRICE = 5999;

const budget = [
  { line: "Paid media — Meta (gross incl. GST)", amount: 60000, note: "Instagram + Facebook ads across 3 funnel stages" },
  { line: "Creator partnerships", amount: 25000, note: "5 micro-creators × ₹5,000 (1 Reel + 30-day ad usage rights)" },
  { line: "Content production", amount: 10000, note: "Product shoot, editing, 9:16 cut-downs, stills" },
  { line: "Testing reserve", amount: 5000, note: "Released in week 3 to the winning creative/audience" },
];

const mediaGross = budget[0].amount;
const mediaNet = Math.round(mediaGross / (1 + GST));

// Net media split by funnel stage, with ASSUMED India benchmarks (OwlClaw ranges: CPM ₹50–120, CPC ₹8–25).
const stagesSpec = [
  { stage: "Awareness", objective: "Reach / ThruPlay", share: 0.30, cpm: 80, ctr: 0.004, lpvRate: 0.80, cvr: 0.000 },
  { stage: "Consideration", objective: "Traffic → Landing-page views", share: 0.30, cpm: 100, ctr: 0.0067, lpvRate: 0.80, cvr: 0.005 },
  { stage: "Conversion", objective: "Sales (retargeting + broad)", share: 0.40, cpm: 120, ctr: 0.012, lpvRate: 0.80, cvr: 0.015 },
];

function runScenario(mult = { cpm: 1, cvr: 1 }) {
  const rows = stagesSpec.map((s) => {
    const spend = Math.round(mediaNet * s.share);
    const impressions = Math.round((spend / (s.cpm * mult.cpm)) * 1000);
    const clicks = Math.round(impressions * s.ctr);
    const lpv = Math.round(clicks * s.lpvRate);
    const purchases = lpv * s.cvr * mult.cvr;
    return { ...s, cpm: s.cpm * mult.cpm, spend, impressions, clicks, lpv, purchases };
  });
  const t = rows.reduce(
    (a, r) => ({
      spend: a.spend + r.spend,
      impressions: a.impressions + r.impressions,
      clicks: a.clicks + r.clicks,
      lpv: a.lpv + r.lpv,
      purchases: a.purchases + r.purchases,
    }),
    { spend: 0, impressions: 0, clicks: 0, lpv: 0, purchases: 0 }
  );
  const purchases = Math.round(t.purchases);
  const revenue = purchases * PRICE;
  return {
    rows,
    totals: {
      ...t,
      purchases,
      revenue,
      reach: Math.round(t.impressions / 3.4), // ASSUMPTION: average frequency 3.4 over 6 weeks
      ctr: t.clicks / t.impressions,
      cpc: t.spend / t.clicks,
      costPerLpv: (rows[1].spend + rows[2].spend) / (rows[1].lpv + rows[2].lpv),
      mediaCpa: t.spend / purchases,
      totalCpa: TOTAL_BUDGET / purchases,
      mediaRoas: revenue / t.spend,
      totalRoas: revenue / TOTAL_BUDGET,
    },
  };
}

const scenarios = {
  conservative: runScenario({ cpm: 1.25, cvr: 0.6 }),
  base: runScenario({ cpm: 1, cvr: 1 }),
  optimistic: runScenario({ cpm: 0.9, cvr: 1.6 }),
};

const base = scenarios.base.totals;
const lpvPaid = scenarios.base.rows[1].lpv + scenarios.base.rows[2].lpv;

// Meta learning phase: ~50 optimisation events per ad set per 7 days.
const learningPhase = {
  eventsNeeded: 50,
  weeklyPurchasesBase: Math.round(base.purchases / 6),
  weeklyAddToCartBase: Math.round((lpvPaid * 0.08) / 6), // ASSUMPTION: add-to-cart = 8% of LPVs
};

const objectives = [
  { label: "Reach", kpi: "Unique reach, 18–25, six metros", target: (Math.floor(base.reach / 10000) * 10000).toLocaleString("en-IN"), by: "End of week 6" },
  { label: "Attention", kpi: "Hook rate (3-sec views ÷ impressions) on Reels ads", target: "≥ 25%", by: "Weekly from week 1" },
  { label: "Consideration", kpi: "Landing-page views at ≤ ₹20 each", target: (Math.floor(lpvPaid / 100) * 100).toLocaleString("en-IN"), by: "End of week 6" },
  { label: "Conversion", kpi: "Purchases at media CPA ≤ ₹2,000", target: String(Math.floor(base.purchases / 5) * 5), by: "End of week 6" },
  { label: "Learning", kpi: "Winning creative angle: ≥ 30% lower cost per LPV after ≥ 10,000 impressions each", target: "1 of 3 angles", by: "End of week 3" },
];

// ---- self-check: catches broken edits to the numbers above ----
assert.strictEqual(budget.reduce((a, b) => a + b.amount, 0), TOTAL_BUDGET, "budget lines must sum to ₹1,00,000");
assert.ok(Math.abs(stagesSpec.reduce((a, s) => a + s.share, 0) - 1) < 1e-9, "stage shares must sum to 100%");
assert.ok(Math.abs(base.spend - mediaNet) <= 2, "stage spend must equal net media");
assert.ok(scenarios.conservative.totals.purchases < base.purchases && base.purchases < scenarios.optimistic.totals.purchases);
assert.ok(base.mediaCpa <= 2000, "base case should meet the CPA objective it sets");
assert.ok(base.costPerLpv <= 20, "base case should meet the cost-per-LPV objective it sets");

module.exports = { TOTAL_BUDGET, GST, PRICE, budget, mediaGross, mediaNet, scenarios, base, lpvPaid, learningPhase, objectives };

if (require.main === module) {
  const f = (n) => Math.round(n).toLocaleString("en-IN");
  console.log("net media", f(mediaNet));
  for (const [k, s] of Object.entries(scenarios)) {
    const t = s.totals;
    console.log(k, { impr: f(t.impressions), reach: f(t.reach), clicks: f(t.clicks), lpv: f(t.lpv), purch: t.purchases, rev: f(t.revenue), mediaCPA: f(t.mediaCpa), totalCPA: f(t.totalCpa), mediaROAS: t.mediaRoas.toFixed(2), totalROAS: t.totalRoas.toFixed(2), cpLPV: t.costPerLpv.toFixed(1), ctr: (t.ctr * 100).toFixed(2) });
  }
  console.log(scenarios.base.rows.map((r) => [r.stage, f(r.spend), f(r.impressions), f(r.clicks), f(r.lpv), r.purchases.toFixed(1)]));
  console.log(learningPhase, objectives.map((o) => o.target));
}
