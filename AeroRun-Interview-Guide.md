# AeroRun: Interview Defence Guide

How to explain and defend every major decision in Project 01. Numbers match `build/data.js` (base case unless stated). Everything about campaign results is a **projection**, so say so out loud. Interviewers trust candidates who label their assumptions.

---

## 1. Your 60-second pitch

> "I built a launch strategy for a fictional ₹5,999 Nike lifestyle sneaker aimed at 18–25-year-olds in Indian metros, with a ₹1 lakh budget on Instagram and Facebook. The key insight was on price: every competitor's iconic lifestyle shoe lists at ₹6,999 or more, so AeroRun can be the cheapest way into a big-brand look. But the research also showed this buyer is price-cautious and worried about fakes. So I positioned it on style plus comfort, never on 'cheapest', and put trust devices at the point where people hesitate. The hardest part was the maths. ₹1 lakh buys about 28 sales, which is far below what Meta's algorithm needs to optimise for purchases. So I designed it as a test: three creative angles, five micro-creators, a held-back reserve for the winner, and a pre-agreed scale gate before any bigger spend."

---

## 2. Concepts you must be able to explain

| Concept | Plain-English definition | Where it shows up |
|---|---|---|
| **CPM** | Cost per 1,000 impressions. `spend ÷ impressions × 1,000` | Awareness KPI; assumed ₹80–120 |
| **CTR** | Share of people who click. `clicks ÷ impressions` | Consideration KPI; 0.74% blended |
| **LPV** | Landing-page view: the click that actually loaded the page | Better than clicks because it excludes accidental taps |
| **CVR** | Conversion rate. `purchases ÷ LPVs` | 1.5% on retargeting (assumed) |
| **CPA** | Cost per acquisition. `spend ÷ purchases` | ₹1,816 media-only, ₹3,571 fully loaded |
| **ROAS** | Revenue ÷ ad spend | 3.30× media, 1.68× total. Gross revenue, not profit |
| **Hook rate** | 3-second views ÷ impressions: did the first second stop the scroll? | Target ≥ 25% |
| **Learning phase** | Meta's algorithm needs ~50 optimisation events per ad set per week to stabilise | Why we optimise to add-to-cart, not purchases |
| **Proto-persona** | A persona built from secondary research and assumptions, *before* interviews | All three personas, labelled honestly |
| **SMART** | Specific, Measurable, Achievable, Relevant, Time-bound | Section 09 objectives |
| **TOWS** | Turning a SWOT into actions by crossing quadrants (S×O, W×T…) | Section 07 |
| **Van Westendorp** | Four survey questions that find an acceptable price range | Survey Q11–Q14 |
| **Partnership ads** | Paid ads run from a creator's handle (whitelisting) | Creators' content becomes ad creative |
| **Fully loaded CPA** | Includes creators and production, not just media | The honest number for a CFO |

**Practise this calculation out loud:**
`₹60,000 ÷ 1.18 GST = ₹50,847 net media → ÷ CPM × 1,000 = 5,12,707 impressions → × CTR = 3,819 clicks → × 80% = 3,055 LPVs → × CVR ≈ 28 purchases → ₹50,847 ÷ 28 = ₹1,816 media CPA.`

---

## 3. Decision by decision

### D1. Treat ₹1 lakh as a test-and-learn budget, not a sales campaign
- **Alternatives:** optimise everything for purchases and report ROAS as the headline.
- **Why:** 28 sales over 6 weeks is about 5 a week, against roughly 50 that Meta needs per ad set. Purchase-optimised ad sets would sit in "Learning Limited", and any ROAS number from 28 sales is mostly noise.
- **Likely question:** *"So the campaign loses money?"*
  **Answer:** "On first purchase, yes. Fully loaded CPA is ₹3,571 on a ₹5,999 shoe before margin and returns. What the money buys is a winning creative angle, warm retargeting audiences and a creator content library. The scale gate stops us spending more unless the test proves the model."

### D2. Show market size as a range ($3.2–4.0bn)
- **Alternatives:** pick one number (usually the biggest).
- **Why:** IMARC and TechSci disagree by about 25% because of base year and method. Showing the range shows you can handle conflicting data.
- **Likely question:** *"Which number is right?"*
  **Answer:** "Neither is precisely right. They measure differently. For a ₹1 lakh launch it doesn't change any decision. Reach, price sensitivity and trust do."

### D3. Benchmark against competitors' *icons*, not their cheapest shoes
- **Alternatives:** compare with sub-₹4,000 entry runners or unbranded D2C sneakers.
- **Why:** the style buyer compares the shoe they'll be *seen* in. Against icons (₹6,999–₹11,999), ₹5,999 is smart value. Against entry runners it looks expensive.
- **Likely question:** *"Isn't that cherry-picking?"*
  **Answer:** "It's choosing a frame of reference, which is what positioning is. I'd validate it with survey Q6, which asks which brands they'd consider at ₹5,000–8,000."

### D4. Position on style plus comfort, never "cheapest"
- **Alternatives:** (a) performance positioning, Nike's usual story; (b) "Nike for less"; (c) hype or limited drops.
- **Why:** (a) contradicts the brief's style motivation. (b) damages brand equity and creates the "cheap Nike" label. (c) needs scarcity and budget we don't have. Comfort is the tie-breaker that makes the value claim believable.
- **Likely question:** *"How do you stop it looking like the budget option?"*
  **Answer:** "Creator styling does the status work, the comfort story gives a reason beyond price, and we don't discount. Value-adds like a free size exchange protect the price."

### D5. Aarav (Feed-First Stylist) is the primary persona
- **Alternatives:** Meera, who has her own income; or equal budget across all three.
- **Why:** Aarav matches the brief (style-motivated, Instagram-native, price-aware) and the strongest evidence (Gen Z discovers brands online). Equal budgets would make every test too small to read. Meera is the likelier buyer, so she gets retargeting and reviews.
- **Likely question:** *"Did you interview anyone?"*
  **Answer:** "No, and I say so. They're proto-personas. The survey and 6–8 interviews are the next step, and the attributes most likely to change are price tolerance and who pays (Q17)."

### D6. Meta only, Instagram-led
- **Alternatives:** add YouTube Shorts, Snapchat or Google Search.
- **Why:** ₹50,847 of net media spread across platforms leaves each one too little data to learn from. The brief also specifies Instagram and Facebook.
- **Likely question:** *"What would you add with more money?"*
  **Answer:** "Google brand search first, to catch people who saw a Reel and searched later. Then YouTube Shorts for reach."

### D7. Five micro-creators at ₹5,000 instead of one bigger creator
- **Alternatives:** one mid-tier creator for ₹25,000; no creators.
- **Why:** five audiences and content styles to compare, plus 30-day usage rights for partnership ads. One creator is a single bet with nothing to compare against.
- **Likely question:** *"Is ₹5,000 per creator realistic?"*
  **Answer:** "It's an assumption, labelled as one. Rates vary by follower count, niche and usage rights. Before committing I'd get quotes from 10–15 creators and adjust the count, not the total."

### D8. Budget split 60 / 25 / 10 / 5
- **Alternatives:** 90% media with brand-made assets; 50/50 media and creators.
- **Why:** ads are only as good as their creative, and creator content doubles as ad creative. The 5% reserve goes to the week-3 winner instead of being guessed on day 1.
- **Likely question:** *"Why assume 18% GST?"*
  **Answer:** "Meta's India billing can include 18% GST, and a GST-registered business may claim it back as input credit. I treated it as a cost to be safe, so net media is ₹50,847, not ₹60,000. It's labelled as an assumption."

### D9. Three creative angles: Fit Check, All-Day Light, Price Smart
- **Alternatives:** one hero message; many small variations.
- **Why:** each angle tests one hypothesis (style, comfort, value). Three is enough to compare and few enough that each gets meaningful spend.
- **Likely question:** *"How do you pick the winner?"*
  **Answer:** "A rule agreed in advance: at least 30% lower cost per landing-page view after at least 10,000 impressions each. Hook rate is the tie-breaker."

### D10. Optimise to add-to-cart and LPV; judge on learning KPIs
- **Alternatives:** optimise for purchases from day one.
- **Why:** about 33 add-to-carts a week (base case) gives the algorithm far more signal than 5 purchases.
- **Likely question:** *"Doesn't optimising for add-to-cart attract window-shoppers?"*
  **Answer:** "Some, yes. That's the trade-off. The fix is to move to purchase optimisation in a scale phase, once volume is high enough."

### D11. Put trust devices at the Evaluate stage
- **Alternatives:** spend more on awareness.
- **Why:** reach is cheap. The biggest drop-off is doubt about price and fakes, and about 1 in 5 online shoppers received a fake product in a year. An official-store badge, reviews and a free size exchange cost almost no media money.

### D12. A pre-agreed scale gate
- **Rule:** go to ₹5 lakh only if media CPA ≤ ₹2,000, add-to-cart rate ≥ 8%, **and** one angle clearly wins.
- **Why:** agreeing the rule before the data arrives stops anyone moving the goalposts.

---

## 4. Tough questions and honest answers

- **"Are these real results?"** No. Every campaign number is a projection from labelled assumptions. The market and competitor facts are sourced in Appendix B.
- **"What would you do differently?"** Run the survey before writing the strategy. Add a profitability layer (margin, returns, lifetime value) to set a true break-even CPA.
- **"What's the weakest part?"** The conversion-rate assumption. It drives the purchase number more than anything else. The conservative scenario (CVR −40%) gives 14 sales.
- **"Why should we hire you based on this?"** "Because I can show the maths, label what I don't know, and design a test that tells the team where to put the next rupee."

---

## 5. Limitations to volunteer before they're asked

1. Campaign outcomes are projections; benchmarks vary by season, creative and landing page.
2. Competitor revenues come from press coverage of filings, with different fiscal years.
3. Personas are unvalidated proto-personas.
4. Product attributes (foam, weight, colourways) are invented for the simulation.
5. The model ignores margin, returns and repeat purchases, so it isn't a profit-and-loss statement.
