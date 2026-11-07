import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const publicDir = path.resolve('public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
};

async function setupRouting(context) {
  await context.route('http://portfolio.local/**', async (route) => {
    const url = new URL(route.request().url());
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';

    let filePath = path.join(distDir, pathname);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(publicDir, pathname);
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const body = fs.readFileSync(filePath);
      await route.fulfill({ status: 200, contentType, body });
    } else {
      // Fallback for HTML5/SPA navigation if needed
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        await route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: fs.readFileSync(indexPath) });
      } else {
        await route.fulfill({ status: 404, body: 'Not found' });
      }
    }
  });
}

const viewports = [
  { name: 'iPhone SE (small mobile)', width: 320, height: 667 },
  { name: 'iPhone SE (375px)', width: 375, height: 667 },
  { name: 'Android standard (360px)', width: 360, height: 800 },
  { name: 'iPhone 14/15 (390px)', width: 390, height: 844 },
  { name: 'Android large (412px)', width: 412, height: 915 },
  { name: 'iPhone Pro Max (430px)', width: 430, height: 932 },
  { name: 'iPad Mini (768px)', width: 768, height: 1024 },
  { name: 'iPad Pro (834px)', width: 834, height: 1194 },
  { name: 'Tablet Landscape (1024px)', width: 1024, height: 768 },
  { name: 'Laptop (1280px)', width: 1280, height: 800 },
  { name: 'Desktop (1440px)', width: 1440, height: 900 },
  { name: 'Large Desktop (1920px)', width: 1920, height: 1080 },
];

console.log('Starting Responsive Test Suite across all 12 Viewports...');
const executablePath = [
  process.env.QA_BROWSER,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean).find(fs.existsSync);

const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });

let totalChecks = 0;
let passedChecks = 0;
const failures = [];

function check(pass, desc) {
  totalChecks++;
  if (pass) {
    passedChecks++;
    console.log(`  ✓ ${desc}`);
  } else {
    failures.push(desc);
    console.log(`  ✗ FAIL: ${desc}`);
  }
}

for (const vp of viewports) {
  console.log(`\n=== Testing ${vp.name} (${vp.width}x${vp.height}) ===`);
  const isMobile = vp.width < 768;
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile,
    hasTouch: vp.width <= 1024,
  });
  await setupRouting(context);
  const page = await context.newPage();

  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));

  // 1. Load Homepage
  await page.goto('http://portfolio.local/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  check(pageErrors.length === 0, `No console/runtime errors on ${vp.name} (${pageErrors.join(', ')})`);

  // Check overflow on initial load
  const initialOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth - document.documentElement.clientWidth;
  });
  check(initialOverflow <= 1, `Zero horizontal overflow on initial hero (overflow: ${initialOverflow}px)`);

  // Scroll through entire page to trigger all animations
  await page.evaluate(async () => {
    const totalHeight = document.documentElement.scrollHeight;
    const step = 400;
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);

  // Check overflow after full scroll
  const fullOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth - document.documentElement.clientWidth;
  });
  check(fullOverflow <= 1, `Zero horizontal overflow after full scroll (overflow: ${fullOverflow}px)`);

  // Verify all essential sections exist
  const sections = ['home', 'work', 'capabilities', 'process', 'testimonials', 'about', 'expertise', 'contact'];
  for (const s of sections) {
    const count = await page.locator(`#${s}`).count();
    check(count === 1, `Section #${s} is present`);
  }

  // Navigation check
  if (vp.width <= 1024) {
    // Mobile hamburger menu
    const menuToggle = page.locator('button.menu-toggle');
    const toggleVisible = await menuToggle.isVisible();
    check(toggleVisible, `Hamburger menu toggle is visible on ${vp.width}px`);

    if (toggleVisible) {
      await menuToggle.click();
      await page.waitForTimeout(300);
      const menu = page.locator('#mobile-menu');
      check(await menu.isVisible(), 'Mobile menu opens on click');

      // Click Work link
      const workLink = menu.locator('a[href="#work"]');
      if (await workLink.count()) {
        await workLink.click();
        await page.waitForTimeout(400);
        check(!(await menu.isVisible()), 'Mobile menu closes after clicking section link');
      }
    }
  } else {
    // Desktop navigation
    const desktopNav = page.locator('.desktop-nav');
    check(await desktopNav.isVisible(), `Desktop nav is visible on ${vp.width}px`);
  }

  // Project cards check
  const projectCards = page.locator('.project-card');
  const cardCount = await projectCards.count();
  check(cardCount > 0, `Project cards rendered (${cardCount} cards)`);

  // Dialog check on mobile/desktop
  const firstCard = projectCards.first();
  await firstCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);

  // Check dialog or mobile preview navigation
  // Click first card
  await firstCard.click();
  await page.waitForTimeout(400);

  const currentUrl = page.url();
  if (currentUrl.includes('#/project/')) {
    check(true, `Navigated to Mobile Preview page: ${currentUrl}`);
    const mpOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - document.documentElement.clientWidth;
    });
    check(mpOverflow <= 1, `Mobile Preview has zero horizontal overflow (overflow: ${mpOverflow}px)`);

    // Back to home
    const backBtn = page.locator('.mp-back-btn').first();
    if (await backBtn.isVisible()) {
      await backBtn.click();
      await page.waitForTimeout(400);
      check(!page.url().includes('#/project/'), 'Returned back to portfolio home');
    }
  } else {
    // Check if dialog opened
    const dialog = page.locator('dialog.project-dialog');
    if (await dialog.count()) {
      check(await dialog.isVisible(), 'Project dialog opened successfully');
      const dialogOverflow = await dialog.evaluate((el) => el.scrollWidth - el.clientWidth);
      check(dialogOverflow <= 2, `Project dialog has zero horizontal overflow (overflow: ${dialogOverflow}px)`);

      const closeBtn = dialog.locator('.dialog-close');
      await closeBtn.click();
      await page.waitForTimeout(300);
      check(!(await dialog.isVisible()), 'Project dialog closed successfully');
    }
  }

  await context.close();
}

// 404 Page Check
console.log('\n=== Testing 404 Route on 375px & 1440px ===');
for (const w of [375, 1440]) {
  const context = await browser.newContext({ viewport: { width: w, height: 700 } });
  await setupRouting(context);
  const page = await context.newPage();
  await page.goto('http://portfolio.local/#/non-existent-page', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const notFoundCount = await page.locator('.not-found-page').count();
  check(notFoundCount === 1, `404 page displayed on ${w}px`);
  const nfOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(nfOverflow <= 1, `404 page zero overflow on ${w}px`);

  const returnBtn = page.locator('.not-found-actions button, .not-found-actions a').first();
  if (await returnBtn.isVisible()) {
    await returnBtn.click();
    await page.waitForTimeout(400);
    check(page.url().endsWith('#') || !page.url().includes('/non-existent-page'), 'Returned to home from 404');
  }
  await context.close();
}

// Reduced Motion Check
console.log('\n=== Testing Reduced Motion Mode ===');
const redContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await setupRouting(redContext);
const redPage = await redContext.newPage();
await redPage.goto('http://portfolio.local/', { waitUntil: 'networkidle' });
await redPage.waitForTimeout(500);

const revealedVisible = await redPage.locator('[data-reveal], [data-line]').evaluateAll((elems) => {
  return elems.every((el) => {
    const s = getComputedStyle(el);
    return s.opacity !== '0' && s.visibility !== 'hidden';
  });
});
check(revealedVisible, 'Reduced motion: all revealed content and lines are immediately visible');
await redContext.close();

await browser.close();

console.log(`\n========================================`);
console.log(`RESULTS: ${passedChecks}/${totalChecks} checks passed.`);
if (failures.length > 0) {
  console.log('FAILURES:');
  failures.forEach(f => console.log(' - ' + f));
  process.exit(1);
} else {
  console.log('ALL RESPONSIVE CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
