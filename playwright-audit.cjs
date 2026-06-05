const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const SCREENSHOT_DIR = "C:/Users/ganga/.gemini/antigravity-ide/brain/2dafd393-938a-47b5-aee3-4ed1bc4f993e";

async function runAudit() {
  console.log("Starting production runtime audit...");
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  const logs = [];
  const errors = [];
  const warnings = [];
  const failedRequests = [];
  
  // Listen for console logs, warnings, and errors
  page.on("console", (msg) => {
    const type = msg.type();
    const text = msg.text();
    logs.push({ type, text });
    if (type === "error") {
      errors.push(text);
    } else if (type === "warning") {
      warnings.push(text);
    }
    console.log(`[Browser Console ${type}]: ${text}`);
  });
  
  // Listen for uncaught exceptions
  page.on("pageerror", (err) => {
    errors.push(err.toString());
    console.error(`[Browser PageError]: ${err}`);
  });
  
  // Listen for request failures
  page.on("requestfailed", (request) => {
    const failure = request.failure();
    const url = request.url();
    failedRequests.push({ url, error: failure ? failure.errorText : "Unknown" });
    console.error(`[Browser Request Failed]: ${url} - ${failure ? failure.errorText : ""}`);
  });

  try {
    // Navigate to local preview server
    console.log("Navigating to http://localhost:4173/ ...");
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000); // Wait for initial transitions/animations

    // 1. Home Page Audit
    console.log("Auditing Home page...");
    const homeScreenshotPath = path.join(SCREENSHOT_DIR, "home_audit.png");
    await page.screenshot({ path: homeScreenshotPath });
    console.log(`Saved screenshot to: ${homeScreenshotPath}`);

    // 2. Technology Page Audit
    console.log("Navigating to Technology page...");
    // Find header navigation link with text "Technology"
    const techBtn = page.locator("header nav button", { hasText: "Technology" }).first();
    await techBtn.click();
    await page.waitForTimeout(1000);
    const techScreenshotPath = path.join(SCREENSHOT_DIR, "technology_audit.png");
    await page.screenshot({ path: techScreenshotPath });
    console.log(`Saved screenshot to: ${techScreenshotPath}`);

    // 3. Diagnostics Page Audit
    console.log("Navigating to Diagnostics page...");
    const diagBtn = page.locator("header nav button", { hasText: "Diagnostics" }).first();
    await diagBtn.click();
    await page.waitForTimeout(1500); // Wait for oscilloscope lines to render and update
    const diagScreenshotPath = path.join(SCREENSHOT_DIR, "diagnostics_audit.png");
    await page.screenshot({ path: diagScreenshotPath });
    console.log(`Saved screenshot to: ${diagScreenshotPath}`);

    // 4. Specifications Page Audit
    console.log("Navigating to Specifications page...");
    const specsBtn = page.locator("header nav button", { hasText: "Specifications" }).first();
    await specsBtn.click();
    await page.waitForTimeout(1000);

    // Expand the first FAQ Item
    console.log("Expanding first FAQ accordion item...");
    const firstFaqTrigger = page.locator("#faq-trigger-0");
    await firstFaqTrigger.click();
    await page.waitForTimeout(1000); // wait for spring expand animation
    
    const specsScreenshotPath = path.join(SCREENSHOT_DIR, "specifications_audit.png");
    await page.screenshot({ path: specsScreenshotPath });
    console.log(`Saved screenshot to: ${specsScreenshotPath}`);

    console.log("Audit crawling completed successfully!");
  } catch (err) {
    console.error("Error during audit crawl:", err);
    errors.push(err.toString());
  } finally {
    await browser.close();
  }

  // Generate audit summary data file for models to read
  const reportSummary = {
    errors,
    warnings,
    failedRequests,
    screenshots: {
      home: "home_audit.png",
      technology: "technology_audit.png",
      diagnostics: "diagnostics_audit.png",
      specifications: "specifications_audit.png"
    }
  };

  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, "audit_summary.json"),
    JSON.stringify(reportSummary, null, 2)
  );
  console.log("Audit summary saved.");
}

runAudit();
