# Project 01: AeroRun Launch Strategy

A complete marketing strategy for **AeroRun**, a fictional ₹5,999 style-led sneaker, launched to 18–25-year-olds in India's metros on Instagram and Facebook with a hypothetical ₹1,00,000 budget.

> AeroRun is a fictional product. Independent educational simulation, not affiliated with or commissioned by Nike, Inc. Campaign results are projections, not real performance data.

## What's in this folder

| File | What it is | Use it for |
|---|---|---|
| [AeroRun-Strategy-Report.pdf](AeroRun-Strategy-Report.pdf) | 32-page strategy report, all 15 sections + survey + sources | The main portfolio piece |
| [AeroRun-Executive-Deck.pptx](AeroRun-Executive-Deck.pptx) | 12-slide editable deck with speaker notes | Presenting in an interview |
| [AeroRun-Interview-Guide.md](AeroRun-Interview-Guide.md) | Every decision: alternatives, reasoning, likely questions | Interview prep |
| [AeroRun-Survey.md](AeroRun-Survey.md) | Ready-to-use questionnaire + analysis plan | Running real research |
| `assets/` | Persona sheets, journey map, competitor table, funnel, price ladder, positioning map, budget, timeline, ad mockups (PNG) | Portfolio site, Behance, LinkedIn posts |
| [00-design-brief.md](00-design-brief.md) | The approved brief for this project | Context |
| `build/` | Scripts that generate everything | Changing numbers and rebuilding |

## Changing an assumption and rebuilding

All numbers live in `build/data.js` (budget lines, CPMs, CTRs, conversion rates). It checks its own maths when it runs.

```powershell
cd "build"; node data.js; node build.js all; node deck.js
```

Rebuilding needs Node.js and Google Chrome (both already installed on this machine).
