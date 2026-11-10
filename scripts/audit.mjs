import { chromium } from "playwright-core";

const BASE = "http://localhost:3000";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const results = [];
const browser = await chromium.launch({ executablePath: CHROME, headless: true });

async function makePage(viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("requestfailed", (req) => {
    if (!req.url().includes("google.com/maps")) {
      errors.push(`requestfailed: ${req.url()} ${req.failure()?.errorText}`);
    }
  });
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2200);
  return { context, page, errors };
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 900 },
  { width: 360, height: 800 },
]) {
  const { context, page, errors } = await makePage(viewport);
  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflows = [];
    document.querySelectorAll("*").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && (rect.right > window.innerWidth + 2 || rect.left < -2)) {
        const style = getComputedStyle(el);
        if (style.position !== "fixed" && style.position !== "absolute" && style.visibility !== "hidden") {
          overflows.push(`${el.tagName}.${String(el.className).slice(0, 60)} right=${Math.round(rect.right)}`);
        }
      }
    });
    const imgs = Array.from(document.images).map((img) => ({
      src: img.currentSrc.split("/").pop(),
      natural: img.naturalWidth,
      complete: img.complete,
    }));
    const sections = ["about", "programs", "facilities", "timings", "plans", "gallery", "enquire", "faq", "contact"];
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflows: overflows.slice(0, 10),
      brokenImages: imgs.filter((i) => !i.complete || i.natural === 0),
      sectionPresence: sections.filter((id) => !document.getElementById(id)),
      h1: document.querySelectorAll("h1").length,
      heroStatus: document.querySelector("section#top")?.innerText.includes("Open") ||
        document.querySelector("section#top")?.innerText.includes("Closed"),
      bottomBarVisible: (() => {
        const el = document.querySelector(".fixed.inset-x-0.bottom-0");
        if (!el) return false;
        return getComputedStyle(el).display !== "none";
      })(),
    };
  });
  results.push({
    viewport: `${viewport.width}x${viewport.height}`,
    ...metrics,
    consoleErrors: errors,
  });
  await context.close();
}

// Interaction pass at desktop
{
  const { context, page, errors } = await makePage({ width: 1440, height: 900 });

  // Plan prefill
  await page.locator("#plans article").nth(1).getByRole("button", { name: "Enquire" }).click();
  await page.waitForTimeout(1400);
  const planValue = await page.locator("#plan").inputValue();
  const scrolledToEnquire = await page.evaluate(() => {
    const rect = document.getElementById("enquire").getBoundingClientRect();
    return rect.top > -30 && rect.top < 200;
  });

  // Validation
  await page.locator("#enquire button[type=submit]").click();
  await page.waitForTimeout(400);
  const errorCount = await page.locator("#enquire [role=alert]").count();

  // Fill and submit
  await page.fill("#name", "Test Member");
  await page.fill("#phone", "9876543210");
  await page.fill("#email", "test@example.com");
  await page.selectOption("#goal", "Fat Loss");
  await page.selectOption("#timing", "Morning");
  await page.fill("#message", "I would like to try the morning slot.");
  const whatsappHref = await page
    .locator("#enquire a", { hasText: "Send via WhatsApp" })
    .getAttribute("href");
  await page.locator("#enquire button[type=submit]").click();
  await page.waitForTimeout(1600);
  const successVisible = await page.locator("#enquire").getByText("Request received.").isVisible();

  // Reset
  await page.getByRole("button", { name: "Send another enquiry" }).click();
  await page.waitForTimeout(400);

  // Gallery
  await page.locator("#gallery button[aria-label^='View image']").first().click();
  await page.waitForTimeout(500);
  const dialogOpen = await page.locator("[role=dialog][aria-modal=true]").isVisible();
  const captionBefore = await page.locator("[role=dialog]").innerText();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(400);
  const captionAfter = await page.locator("[role=dialog]").innerText();
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const dialogClosed = !(await page.locator("[role=dialog][aria-modal=true]").isVisible().catch(() => false));

  // FAQ
  const faqButtons = page.locator("#faq button[aria-expanded]");
  const secondExpandedBefore = await faqButtons.nth(1).getAttribute("aria-expanded");
  await faqButtons.nth(1).click();
  await page.waitForTimeout(400);
  const secondExpandedAfter = await faqButtons.nth(1).getAttribute("aria-expanded");

  // Nav active
  await page.locator("#programs").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const activeNav = await page.locator("header nav a[aria-current=true]").first().innerText().catch(() => "");

  results.push({
    interactions: {
      planValue,
      scrolledToEnquire,
      validationErrors: errorCount,
      successVisible,
      whatsappIsCorrect: Boolean(whatsappHref?.startsWith("https://wa.me/910000000000?text=")),
      gallery: { dialogOpen, arrowChanged: captionBefore !== captionAfter, dialogClosed },
      faq: { before: secondExpandedBefore, after: secondExpandedAfter },
      activeNav,
    },
    consoleErrors: errors,
  });
  await context.close();
}

// Mobile nav pass
{
  const { context, page, errors } = await makePage({ width: 360, height: 800 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(500);
  const drawerOpen = await page.locator("#mobile-menu").isVisible();
  const bodyLocked = await page.evaluate(() => document.body.classList.contains("drawer-open"));
  await page.locator('#mobile-menu a[href="#programs"]').click();
  await page.waitForTimeout(900);
  const drawerClosed = !(await page.locator("#mobile-menu").isVisible().catch(() => false));
  const bodyUnlocked = await page.evaluate(() => !document.body.classList.contains("drawer-open"));

  results.push({ mobileNav: { drawerOpen, bodyLocked, drawerClosed, bodyUnlocked }, consoleErrors: errors });
  await context.close();
}

// Accessibility scan
{
  const { context, page } = await makePage({ width: 1440, height: 900 });
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  const scan = await new AxeBuilder({ page }).analyze();
  results.push({
    axe: {
      violations: scan.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
        samples: v.nodes.slice(0, 3).map((n) => n.html.slice(0, 160)),
      })),
    },
  });
  await context.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
