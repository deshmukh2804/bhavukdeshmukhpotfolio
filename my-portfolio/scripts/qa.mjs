import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const baseURL = process.env.QA_URL || 'http://127.0.0.1:5173';
const outputDirectory = resolve(process.env.QA_OUTPUT || 'artifacts/qa');
const installedBrowsers = [
  process.env.QA_BROWSER,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);
const executablePath = installedBrowsers.find(existsSync);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
await mkdir(outputDirectory, { recursive: true });
const report = { url: baseURL, browsers: executablePath || 'Playwright Chromium', checks: [], issues: [], screenshots: [] };

function check(condition, description, details = '') {
  report.checks.push({ description, passed: !!condition, ...(details ? { details } : {}) });
  if (!condition) report.issues.push(description + (details ? `: ${details}` : ''));
}

async function screenshot(page, name, fullPage = false) {
  const path = resolve(outputDirectory, `${name}.png`);
  await page.screenshot({ path, fullPage, animations: 'disabled' });
  report.screenshots.push(path);
}

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1100);
}

async function revealPage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round(page.viewportSize().height * 0.75);
  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(100);
}

async function layoutCheck(page, label) {
  const layout = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const overflow = document.documentElement.scrollWidth - width;
    const overflowing = [...document.querySelectorAll('body *')].filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.position !== 'fixed' && rect.width > 0 && (rect.left < -2 || rect.right > width + 2);
    }).slice(0, 10).map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
    const images = [...document.images].map((image) => ({
      alt: image.alt,
      source: image.currentSrc || image.src,
      loaded: image.complete && image.naturalWidth > 0,
      lazy: image.loading === 'lazy',
      stableSize: !!(image.width && image.height) || getComputedStyle(image).aspectRatio !== 'auto',
    }));
    return { overflow, overflowing, images, h1: document.querySelectorAll('h1').length };
  });
  check(layout.overflow <= 1, `${label}: no horizontal document overflow`, JSON.stringify(layout));
  check(layout.h1 === 1, `${label}: one main heading`, String(layout.h1));
  check(layout.images.every((image) => image.loaded), `${label}: all scrolled images loaded`, JSON.stringify(layout.images.filter((image) => !image.loaded)));
  const lazyImages = await page.locator('#work img, #about img').evaluateAll((images) => images.every((image) => image.loading === 'lazy'));
  check(lazyImages, `${label}: project and profile images load lazily`);
  const sections = ['home', 'work', 'capabilities', 'process', 'testimonials', 'about', 'contact'];
  for (const id of sections) check(await page.locator(`#${id}`).count() === 1, `${label}: ${id} section exists`);
}

async function mobileMenuCheck(page, label) {
  const toggle = page.locator('button[aria-controls="mobile-menu"], button[aria-label="Open menu"], button[aria-label="Close menu"]').first();
  check(await toggle.count() > 0, `${label}: accessible menu toggle exists`);
  if (!(await toggle.count())) return;
  await toggle.click();
  await page.waitForTimeout(300);
  check(await toggle.getAttribute('aria-expanded') === 'true', `${label}: menu expanded state updates`);
  const menu = page.locator('#mobile-menu');
  check(await menu.count() > 0 && await menu.isVisible(), `${label}: mobile menu visible`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  check(await toggle.getAttribute('aria-expanded') === 'false', `${label}: Escape closes menu`);
  check(await toggle.evaluate((element) => element === document.activeElement), `${label}: menu restores keyboard focus`);
  await toggle.click();
  const workLink = menu.locator('a[href="#work"]').first();
  if (await workLink.count()) {
    await workLink.click();
    await page.waitForTimeout(700);
    check(await toggle.getAttribute('aria-expanded') === 'false', `${label}: section link closes mobile menu`);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
}

async function projectCheck(page, label) {
  const trigger = page.locator('[data-project-trigger]').first();
  check(await trigger.count() > 0, `${label}: interactive project trigger exists`);
  if (!(await trigger.count())) return;
  await trigger.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.keyboard.press('Tab');
  await trigger.focus();
  check(await trigger.evaluate((element) => element === document.activeElement), `${label}: project accessible by keyboard`);
  check(await trigger.evaluate((element) => {
    const style = getComputedStyle(element);
    return (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) || style.boxShadow !== 'none';
  }), `${label}: project has a visible keyboard focus indicator`);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(350);
  const dialog = page.getByRole('dialog').first();
  check(await dialog.count() > 0 && await dialog.isVisible(), `${label}: project detail opens`);
  if (await dialog.count() && await dialog.isVisible()) {
    check(await dialog.evaluate((element) => element.contains(document.activeElement)), `${label}: project detail receives keyboard focus`);
    await screenshot(page, `${label}-project-dialog`);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
    check(await page.getByRole('dialog').count() === 0 || !(await dialog.isVisible()), `${label}: Escape closes project detail`);
    check(await trigger.evaluate((element) => element === document.activeElement), `${label}: project restores focus`);
  }
}

async function smokeCheck(page) {
  const canvas = page.locator('[data-smoke-cursor]');
  check(await canvas.count() === 1, 'desktop: one smoke cursor canvas exists');
  if (!(await canvas.count())) return;
  check(await canvas.evaluate((element) => getComputedStyle(element).pointerEvents === 'none'), 'desktop: smoke canvas does not block pointer interaction');
  check(await canvas.evaluate((element) => element.width / window.innerWidth <= 2.01), 'desktop: smoke canvas DPR is capped');
  await page.mouse.move(100, 150);
  for (let i = 0; i < 12; i++) {
    await page.mouse.move(100 + i * 18, 150 + i * 8);
    await page.waitForTimeout(16);
  }
  const paintedPixels = await canvas.evaluate((element) => {
    const context = element.getContext('2d');
    if (!context) return 0;
    const pixels = context.getImageData(0, 0, element.width, element.height).data;
    let count = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0) count++;
    return count;
  });
  check(paintedPixels > 0, 'desktop: smoke responds to pointer movement', `${paintedPixels} nontransparent pixels`);
  await page.waitForTimeout(1000);
  const lingeringPixels = await canvas.evaluate((element) => {
    const pixels = element.getContext('2d').getImageData(0, 0, element.width, element.height).data;
    let count = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0) count++;
    return count;
  });
  check(lingeringPixels === 0, 'desktop: smoke fades after pointer stops', `${lingeringPixels} lingering pixels`);
}

async function smokeIsDisabled(page) {
  const canvas = page.locator('[data-smoke-cursor]');
  return await canvas.count() === 0 || await canvas.evaluate((element) => getComputedStyle(element).display === 'none');
}

async function contactCheck(page) {
  const trigger = page.locator('[data-contact-trigger]').first();
  check(await trigger.count() > 0, 'contact: interactive project brief trigger exists');
  if (!(await trigger.count())) return;
  await trigger.click();
  await page.waitForTimeout(300);
  const form = page.locator('[data-contact-form]');
  check(await form.count() === 1, 'contact: project brief form opens');
  if (!(await form.count())) return;
  check(await form.evaluate((element) => !element.checkValidity()), 'contact: required fields prevent empty submission');
  await form.locator('[name="name"]').fill('Portfolio QA');
  await form.locator('[name="email"]').fill('qa@example.com');
  await form.locator('[name="message"]').fill('A test brief used to verify this local portfolio form.');
  check(await form.evaluate((element) => element.checkValidity()), 'contact: completed brief passes validation');
  const submit = form.locator('button[type="submit"]');
  if (await submit.count() && /save/i.test(await submit.innerText())) {
    const downloadPromise = page.waitForEvent('download', { timeout: 5000 });
    await submit.click();
    const download = await downloadPromise;
    check(!!download.suggestedFilename(), 'contact: project brief download starts');
    const status = page.getByRole('status');
    check(await status.count() > 0 && !!(await status.first().textContent()).trim(), 'contact: submission feedback is announced');
  }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  check(await trigger.evaluate((element) => element === document.activeElement), 'contact: closing dialog restores focus');
}

try {
  for (const viewport of [
    { label: 'desktop', width: 1440, height: 1000 },
    { label: 'tablet', width: 834, height: 1112 },
    { label: 'mobile', width: 390, height: 844 },
    { label: 'small-mobile', width: 320, height: 740 },
  ]) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1, isMobile: viewport.width < 768, hasTouch: viewport.width < 1000, acceptDownloads: true });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__portfolioQA = { cls: 0, lcp: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__portfolioQA.cls += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__portfolioQA.lcp = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('requestfailed', (request) => errors.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`));
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await settle(page);
    await screenshot(page, `${viewport.label}-hero`);
    if (viewport.label === 'desktop') await smokeCheck(page);
    await revealPage(page);
    await layoutCheck(page, viewport.label);
    await screenshot(page, `${viewport.label}-full`, true);
    if (viewport.label === 'desktop' || viewport.label === 'mobile') {
      for (const id of ['work', 'about']) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await screenshot(page, `${viewport.label}-${id}`);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    }
    const navigation = page.locator('header').first();
    if (await navigation.count()) {
      await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
      await page.waitForTimeout(250);
      const rect = await navigation.boundingBox();
      check(rect && rect.y >= 0 && rect.y < 80, `${viewport.label}: navigation stays visible on scroll`, JSON.stringify(rect));
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    }
    if (viewport.width < 1000) {
      check(await smokeIsDisabled(page), `${viewport.label}: smoke cursor disabled for touch`);
      await mobileMenuCheck(page, viewport.label);
    }
    if (viewport.label === 'desktop' || viewport.label === 'mobile') await projectCheck(page, viewport.label);
    if (viewport.label === 'desktop') await contactCheck(page);
    const metrics = await page.evaluate(() => window.__portfolioQA);
    check(metrics.cls < 0.1, `${viewport.label}: image/font loading avoids material layout shift`, JSON.stringify(metrics));
    check(errors.length === 0, `${viewport.label}: no console, runtime, or request errors`, errors.join('\n'));
    await context.close();
  }

  const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(baseURL, { waitUntil: 'networkidle' });
  await settle(reducedPage);
  await revealPage(reducedPage);
  check(await smokeIsDisabled(reducedPage), 'reduced motion: smoke cursor disabled');
  const hiddenContent = await reducedPage.locator('[data-reveal], [data-heading-line], [data-line]').evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).opacity === '0').map((element) => element.textContent.slice(0, 80)));
  check(hiddenContent.length === 0, 'reduced motion: revealed content remains visible', JSON.stringify(hiddenContent));
  const animatedContent = await reducedPage.locator('[data-reveal], [data-heading-line], [data-line], [data-marquee]').evaluateAll((elements) => elements.filter((element) => {
    const style = getComputedStyle(element);
    return style.animationName !== 'none' && parseFloat(style.animationDuration) > 0.01;
  }).map((element) => element.className));
  check(animatedContent.length === 0, 'reduced motion: decorative/reveal animations disabled', JSON.stringify(animatedContent));
  await screenshot(reducedPage, 'reduced-motion', true);
  await reducedContext.close();
} catch (error) {
  report.issues.push(`QA execution error: ${error.stack || error.message}`);
} finally {
  await browser.close();
  await writeFile(resolve(outputDirectory, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`${report.checks.filter((item) => item.passed).length}/${report.checks.length} checks passed.`);
  console.log(`Report: ${resolve(outputDirectory, 'report.json')}`);
  for (const issue of report.issues) console.error(issue);
  process.exitCode = report.issues.length ? 1 : 0;
}
