// Renders assets → PNG and report.html → PDF with the locally installed Chrome.
// Usage: node build.js [assets|report|all]
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const ROOT = path.resolve(__dirname, "..");
const OUT_ASSETS = path.join(ROOT, "assets");
const CSS = fs.readFileSync(path.join(__dirname, "styles.css"), "utf8");
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(fs.existsSync);

const doc = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`;

async function renderAssets(browser) {
  const { sheets } = require("./assets");
  fs.mkdirSync(OUT_ASSETS, { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
  for (const s of sheets) {
    await page.setContent(doc(`<div class="sheet">${s.html}</div>`), { waitUntil: "load" });
    await page.evaluateHandle("document.fonts.ready");
    const el = await page.$(".sheet");
    await el.screenshot({ path: path.join(OUT_ASSETS, `${s.key}.png`) });
    console.log("asset", s.key);
  }
  await page.close();
}

async function renderReport(browser) {
  const html = require("./report").render(CSS);
  const htmlPath = path.join(__dirname, "report.html");
  fs.writeFileSync(htmlPath, html);
  const page = await browser.newPage();
  await page.goto("file:///" + htmlPath.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");
  const pdf = path.join(ROOT, "AeroRun-Strategy-Report.pdf");
  await page.pdf({
    path: pdf, format: "A4", printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `<div style="width:100%;font:7px Arial,sans-serif;color:#9aa1ad;padding:0 17mm;display:flex;justify-content:space-between"><span>AeroRun is a fictional product · independent educational simulation · not affiliated with or commissioned by Nike, Inc.</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  });
  console.log("report", pdf);
  await page.close();
}

(async () => {
  const what = process.argv[2] || "all";
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  try {
    if (what === "assets" || what === "all") await renderAssets(browser);
    if (what === "report" || what === "all") await renderReport(browser);
  } finally {
    await browser.close();
  }
})().catch((e) => { console.error(e); process.exit(1); });
