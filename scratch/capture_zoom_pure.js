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

function getWsUrl() {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${PORT}/json`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const list = JSON.parse(data);
          resolve(list[0]?.webSocketDebuggerUrl);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function run() {
  const chromeProcess = exec(
    `"${CHROME_PATH}" --headless --remote-debugging-port=${PORT} --disable-gpu --no-first-run --no-default-browser-check "http://localhost:3000"`
  );
  await delay(2500);

  let wsUrl;
  for (let i = 0; i < 10; i++) {
    try {
      wsUrl = await getWsUrl();
      if (wsUrl) break;
    } catch (e) {}
    await delay(500);
  }

  const ws = new globalThis.WebSocket(wsUrl);
  let id = 1;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((res) => {
      const msgId = id++;
      pending.set(msgId, res);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }
  ws.onmessage = (e) => {
    const d = JSON.parse(e.data);
    if (d.id && pending.has(d.id)) {
      pending.get(d.id)(d.result);
      pending.delete(d.id);
    }
  };
  await new Promise((r) => (ws.onopen = r));

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await send("Page.navigate", { url: "http://localhost:3000" });
  await delay(3000);

  // Scroll directly to Zoom Parallax element
  await send("Runtime.evaluate", {
    expression: 'document.getElementById("zoom-varieties").scrollIntoView();',
  });
  await delay(1200);

  let snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_zoom_pure_mobile.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_zoom_pure_mobile.png");

  // Scroll down 400px more inside Zoom Parallax
  await send("Runtime.evaluate", {
    expression: 'window.scrollBy({ top: 400, behavior: "instant" });',
  });
  await delay(1200);

  snap = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "verify_zoom_deep_mobile.png"), Buffer.from(snap.data, "base64"));
  console.log("Saved verify_zoom_deep_mobile.png");

  ws.close();
  chromeProcess.kill();
  console.log("Done capturing pure zoom screenshots.");
}

run().catch(console.error);

