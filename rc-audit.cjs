const { chromium } = require("playwright");

async function runAudit() {
  const url = "http://localhost:4173/";
  console.log(`Starting Release Candidate Audit on ${url} ...\n`);

  const browser = await chromium.launch({ headless: true });
  const errors = [];
  const warnings = [];
  let totalAssetsTested = 0;
  let totalRoutesTested = 0;
  let failedRequestsCount = 0;

  const viewports = [
    { name: "Desktop", width: 1280, height: 800 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Mobile", width: 375, height: 667 }
  ];

  // Target routes (we transition tabs dynamically via buttons)
  const tabs = ["home", "technology", "diagnostics", "specifications", "documentation"];

  for (const vp of viewports) {
    console.log(`--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height }
    });
    const page = await context.newPage();

    // Listen for console messages
    page.on("console", (msg) => {
      const type = msg.type();
      const text = msg.text();
      // Ignore routine logs
      if (type === "error") {
        errors.push(`[Console Error]: ${text}`);
      } else if (type === "warning") {
        warnings.push(`[Console Warning]: ${text}`);
      }
    });

    // Listen for uncaught page errors
    page.on("pageerror", (err) => {
      errors.push(`[Page Error]: ${err.toString()}`);
    });

    // Listen for request/response metrics
    page.on("response", (res) => {
      const status = res.status();
      const reqUrl = res.url();
      
      // We only want to track unique asset requests for stats
      if (reqUrl.includes("/assets/") || reqUrl.endsWith(".woff2") || reqUrl.endsWith(".woff") || reqUrl.endsWith(".css") || reqUrl.endsWith(".js") || reqUrl.endsWith(".svg")) {
        totalAssetsTested++;
      }

      if (status >= 400) {
        failedRequestsCount++;
        errors.push(`[Asset Fail 404/500]: ${reqUrl} returned HTTP ${status}`);
      }
    });

    // Navigate
    try {
      await page.goto(url, { waitUntil: "networkidle" });
      totalRoutesTested++; // Root loaded successfully

      // Audit static page content (skip-link, images, headings) on Desktop
      if (vp.name === "Desktop") {
        // Accessibility audits
        // 1. Skip-link check
        const skipLink = page.locator('a[href="#main-content"]');
        if (await skipLink.count() > 0) {
          const text = await skipLink.textContent();
          console.log(`[A11y Check]: Skip link found: "${text.trim()}"`);
        } else {
          errors.push("[A11y Error]: Skip link is missing.");
        }

        // 2. Headings check
        const h1Count = await page.locator("h1").count();
        if (h1Count !== 1) {
          warnings.push(`[A11y Warning]: Home page has ${h1Count} <h1> elements (expected 1).`);
        } else {
          console.log(`[A11y Check]: Single <h1> title verified.`);
        }

        // 3. Images and SVGs alt texts / aria-hidden
        const images = page.locator("img");
        const imgCount = await images.count();
        for (let i = 0; i < imgCount; i++) {
          const alt = await images.nth(i).getAttribute("alt");
          if (!alt) {
            errors.push(`[A11y Error]: Image ${i} is missing alt text attributes.`);
          }
        }

        const svgs = page.locator("svg");
        const svgCount = await svgs.count();
        for (let i = 0; i < svgCount; i++) {
          const ariaHidden = await svgs.nth(i).getAttribute("aria-hidden");
          const label = await svgs.nth(i).getAttribute("aria-label");
          if (!ariaHidden && !label) {
            warnings.push(`[A11y Warning]: SVG ${i} is missing both aria-hidden and aria-label.`);
          }
        }
      }

      // Transition to each tab view state
      for (const tab of tabs) {
        if (tab === "home") continue;
        
        console.log(`Navigating to tab: ${tab}`);
        
        // Find tab triggers
        let btn;
        if (vp.width < 1024) {
          // Open menu drawer
          const hamburger = page.locator('header button[aria-controls="mobile-navigation-menu"]');
          await hamburger.click();
          await page.waitForTimeout(300);
          btn = page.locator(`#mobile-navigation-menu nav button`, { hasText: new RegExp(tab, "i") }).first();
        } else {
          btn = page.locator(`header nav button`, { hasText: new RegExp(tab, "i") }).first();
        }

        if (await btn.count() > 0) {
          await btn.click();
          totalRoutesTested++;
          // Resilient wait for the tab section to mount in the DOM
          await page.waitForSelector(`#${tab}`, { state: 'attached', timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(200); // Small buffer for visual transition settle

          // Check heading structure on page change
          const activeSection = page.locator(`#${tab}`);
          const h1s = activeSection.locator("h1");
          const h1Count = await h1s.count();
          if (h1Count !== 1) {
            const html = await page.locator("#main-content").innerHTML().catch(() => "N/A");
            errors.push(`[Heading Error]: Tab "${tab}" contains ${h1Count} <h1> titles (expected exactly 1). DOM: ${html.substring(0, 300)}`);
          } else {
            console.log(`[A11y Check]: Tab "${tab}" heading h1 verified: "${await h1s.first().textContent()}"`);
          }

          // Double check horizontal scrolling for responsiveness
          const horizontalScroll = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
          });
          if (horizontalScroll) {
            warnings.push(`[Responsiveness Warning]: Viewport ${vp.name} exhibits horizontal overflow on tab "${tab}".`);
          }
        } else {
          errors.push(`[Navigation Error]: Button for tab "${tab}" could not be located.`);
        }
      }
    } catch (ex) {
      errors.push(`[Navigation Crash]: Failed to navigate viewport ${vp.name}: ${ex.toString()}`);
    } finally {
      await page.close();
      await context.close();
    }
  }

  await browser.close();

  // Print results
  console.log("\n================ AUDIT SUMMARY ================");
  console.log(`Total routes/tab views tested: ${totalRoutesTested}`);
  console.log(`Total asset requests captured: ${totalAssetsTested}`);
  console.log(`Total console/structural warnings: ${warnings.length}`);
  console.log(`Total errors / failed assets: ${errors.length}`);
  
  if (warnings.length > 0) {
    console.log("\nWarnings details:");
    warnings.forEach((w) => console.log(`  - ${w}`));
  }
  if (errors.length > 0) {
    console.log("\nErrors details:");
    errors.forEach((e) => console.log(`  - ${e}`));
  }

  const status = errors.length === 0 ? "APPROVED" : "REJECTED";
  console.log(`\nFinal Release Status: ${status}`);
}

runAudit();
