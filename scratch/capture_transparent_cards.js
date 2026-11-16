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

async function run() {
  console.log("Launching headless chrome...");
  const chromeProcess = exec(
    `"${CHROME_PATH}" --headless --remote-debugging-port=${PORT} --disable-gpu --no-first-run --no-default-browser-check "http://localhost:3000"`
  );

  await delay(2500);

  let wsUrl;
  for (let i = 0; i < 10; i++) {
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

  const WebSocket = require("ws");
  const ws = new WebSocket(wsUrl);

  let msgId = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.on("message", (raw) => {
    const data = JSON.parse(raw);
    if (data.id && pending.has(data.id)) {
      const cb = pending.get(data.id);
      pending.delete(data.id);
      cb(data.result);
    }
  });

  await new Promise((r) => ws.on("open", r));
  console.log("Connected to Chrome via CDP.");

  await send("Page.enable");
  await send("Runtime.enable");

  // Mobile viewport: iPhone 14 Pro
  await send("Emulation.setDeviceMetricsOverride", {
    width: 393,
    height: 852,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await send("Page.navigate", { url: "http://localhost:3000" });
  await delay(3000);

  // Capture Mobile Hero
  let snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "trans_01_mobile_hero.png"), Buffer.from(snap.data, "base64"));
  console.log("Captured trans_01_mobile_hero.png");

  // Scroll to Seafood Details (Catalog)
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 2200, behavior: 'instant' });`
  });
  await delay(1200);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "trans_02_mobile_seafood_card.png"), Buffer.from(snap.data, "base64"));
  console.log("Captured trans_02_mobile_seafood_card.png");

  // Scroll to Logistics / Delivery
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 4000, behavior: 'instant' });`
  });
  await delay(1200);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "trans_03_mobile_delivery.png"), Buffer.from(snap.data, "base64"));
  console.log("Captured trans_03_mobile_delivery.png");

  // Scroll to Business Pillars & Footer
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 5200, behavior: 'instant' });`
  });
  await delay(1200);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "trans_04_mobile_pillars_footer.png"), Buffer.from(snap.data, "base64"));
  console.log("Captured trans_04_mobile_pillars_footer.png");

  // Switch to Desktop Viewport
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 1800, behavior: 'instant' });`
  });
  await delay(1200);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "trans_05_desktop_seafood_card.png"), Buffer.from(snap.data, "base64"));
  console.log("Captured trans_05_desktop_seafood_card.png");

  ws.close();
  chromeProcess.kill();
  console.log("Finished all captures successfully!");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

