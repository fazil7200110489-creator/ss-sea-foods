const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\mohamedfazil\\.gemini\\antigravity\\brain\\9fd6acb4-ceb0-4f05-86e0-27ca3da2dc24";
const PORT = 9222;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWebSocketDebuggerUrl() {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${PORT}/json`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const list = JSON.parse(data);
          const page = list.find((p) => p.type === "page") || list[0];
          resolve(page ? page.webSocketDebuggerUrl : null);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function main() {
  console.log("Launching headless chrome...");
  const chromeProcess = exec(
    `"${CHROME_PATH}" --headless --remote-debugging-port=${PORT} --disable-gpu --no-first-run --no-default-browser-check "http://localhost:3000"`
  );

  await delay(2500);

  let wsUrl;
  for (let i = 0; i < 15; i++) {
    try {
      wsUrl = await getWebSocketDebuggerUrl();
      if (wsUrl) break;
    } catch (e) {}
    await delay(500);
  }

  if (!wsUrl) {
    console.error("Could not obtain CDP WebSocket URL.");
    chromeProcess.kill();
    process.exit(1);
  }

  const ws = new globalThis.WebSocket(wsUrl);

  let msgId = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const cb = pending.get(data.id);
      pending.delete(data.id);
      cb(data.result);
    }
  };

  await new Promise((r) => {
    ws.onopen = r;
  });
  console.log("Connected to Chrome via CDP.");

  await send("Page.enable");
  await send("Runtime.enable");

  // 1. Mobile verification (iPhone 14 - 390px)
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await send("Page.navigate", { url: "http://localhost:3000" });
  await delay(3500);

  // Capture Hero at top
  let snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_01_mobile_hero.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_01_mobile_hero.png");

  // Scroll down into Zoom Parallax
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 700, behavior: 'instant' });`,
  });
  await delay(1200);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_02_zoom_mobile_entry.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_02_zoom_mobile_entry.png");

  // Scroll deeper into Zoom Parallax
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 1200, behavior: 'instant' });`,
  });
  await delay(1200);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_03_zoom_mobile_mid.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_03_zoom_mobile_mid.png");

  // Scroll to Seafood Details Catalog
  await send("Runtime.evaluate", {
    expression: `
      const el = document.getElementById('seafood-story');
      if (el) el.scrollIntoView();
      else window.scrollTo({ top: 2200, behavior: 'instant' });
    `,
  });
  await delay(1500);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_04_catalog_mobile.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_04_catalog_mobile.png");

  // Scroll to Commercial Details & Footer
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`,
  });
  await delay(1500);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_05_footer_mobile.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_05_footer_mobile.png");

  // 2. Desktop verification (1440px)
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 0, behavior: 'instant' });`,
  });
  await delay(1500);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_06_hero_desktop.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_06_hero_desktop.png");

  // Desktop Zoom Parallax
  await send("Runtime.evaluate", {
    expression: `
      const el = document.getElementById('zoom-varieties');
      if (el) el.scrollIntoView();
      else window.scrollTo({ top: 800, behavior: 'instant' });
    `,
  });
  await delay(1500);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_07_zoom_desktop.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_07_zoom_desktop.png");

  // Check card styles programmatically
  const styleCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const cards = Array.from(document.querySelectorAll('.rounded-\\[28px\\], .rounded-\\[32px\\], .rounded-3xl, [class*="bg-"]'));
      const results = [];
      for (const c of cards.slice(0, 30)) {
        const bg = window.getComputedStyle(c).backgroundColor;
        const bdrop = window.getComputedStyle(c).backdropFilter;
        results.push({ tag: c.tagName, class: c.className.slice(0, 50), bg, bdrop });
      }
      return results;
    })()`,
    returnByValue: true,
  });
  console.log("Sample card computed styles:", JSON.stringify(styleCheck?.result?.value?.slice(0, 10), null, 2));

  // Check background canvas animation frame index
  const canvasCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const canvas = document.querySelector('canvas');
      return {
        canvasFound: !!canvas,
        width: canvas?.width,
        height: canvas?.height,
        scrollY: window.scrollY,
        maxScroll: document.documentElement.scrollHeight - window.innerHeight
      };
    })()`,
    returnByValue: true,
  });
  console.log("Canvas check:", canvasCheck?.result?.value);

  ws.close();
  chromeProcess.kill();
  console.log("Verification run complete!");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});

