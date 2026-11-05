import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
const files = ['project-uwe-home.jpg','project-secureface.jpg','project-uwe-partner-cover.jpg','project-uwe-partner-original.jpg'];
const html = `<!doctype html><html><body style="margin:0;background:#111;display:flex;flex-direction:column;gap:40px;align-items:center;padding:20px;">${
  files.map(f=>`<div style="text-align:center"><div style="color:#888;font:14px sans-serif;margin-bottom:8px">${f}</div><img src="/images/${f}" style="max-width:100%;height:auto;border:1px solid #333"></div>`).join('')
}</body></html>`;
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({ path: '/c/potfolio/my-portfolio/artifacts/inspect-projects.png', fullPage: true });
await browser.close();
console.log('done');
