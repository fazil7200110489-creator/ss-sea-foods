const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9248;
const OUT_DIR = path.resolve(__dirname, "..");

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function cdpSend(ws, method, params = {}, id = 1) {
  return new Promise((resolve, reject) => {
    const msg = JSON.stringify({ id, method, params });
    const onMessage = (event) => {
      const resp = JSON.parse(event.data);
      if (resp.id === id) {
        ws.removeEventListener('message', onMessage);
        if (resp.error) reject(resp.error);
        else resolve(resp.result);
      }
    };
    ws.addEventListener('message', onMessage);
    ws.send(msg);
  });
}

const VIEWPORTS = [
  { name: "360px_android", width: 360, height: 740, mobile: true },
  { name: "390px_iphone", width: 390, height: 844, mobile: true },
  { name: "430px_promax", width: 430, height: 932, mobile: true },
  { name: "768px_tablet", width: 768, height: 1024, mobile: false },
  { name: "1440px_desktop", width: 1440, height: 900, mobile: false },
];

async function run() {
  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    "--user-data-dir=C:\\Users\\mohamedfazil\\tmp_cdp_profile_viewports",
    "--window-size=1440,900",
    "about:blank"
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        targets = await fetchJson(`http://127.0.0.1:${PORT}/json`);
        if (targets && targets.length > 0) break;
      } catch (e) {}
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', reject);
    });

    let id = 1;
    await cdpSend(ws, "Page.enable", {}, id++);
    await cdpSend(ws, "Runtime.enable", {}, id++);

    for (const vp of VIEWPORTS) {
      console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
      await cdpSend(ws, "Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.mobile
      }, id++);

      await cdpSend(ws, "Page.navigate", { url: "http://localhost:3000" }, id++);
      await sleep(1800);

      const shot = await cdpSend(ws, "Page.captureScreenshot", { format: "png" }, id++);
      const filename = `vp_${vp.name}.png`;
      fs.writeFileSync(path.join(OUT_DIR, filename), Buffer.from(shot.data, 'base64'));
      console.log(`Saved ${filename}`);
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch(console.error);

