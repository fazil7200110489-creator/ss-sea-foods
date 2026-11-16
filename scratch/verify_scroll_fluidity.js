const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9252;

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

async function verify() {
  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    "--user-data-dir=C:\\Users\\mohamedfazil\\tmp_cdp_profile_fluidity",
    "--window-size=390,844",
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

    await cdpSend(ws, "Page.navigate", { url: "http://localhost:3000" }, id++);
    await sleep(2000);

    // Fast scroll down
    console.log("Fast scroll down...");
    for (let i = 1; i <= 10; i++) {
      await cdpSend(ws, "Runtime.evaluate", {
        expression: `window.scrollTo(0, document.body.scrollHeight * ${i / 10});`
      }, id++);
      await sleep(80);
    }

    // Stop and hold
    await sleep(500);

    // Fast scroll up
    console.log("Fast scroll up (reverse)...");
    for (let i = 9; i >= 0; i--) {
      await cdpSend(ws, "Runtime.evaluate", {
        expression: `window.scrollTo(0, document.body.scrollHeight * ${i / 10});`
      }, id++);
      await sleep(80);
    }

    await sleep(500);

    const checkRes = await cdpSend(ws, "Runtime.evaluate", {
      expression: `(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return { error: 'no canvas' };
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
        return {
          width: canvas.width,
          height: canvas.height,
          pixel: Array.from(imgData)
        };
      })()`
    }, id++);

    console.log("Canvas verification at end of reverse scroll:", checkRes.result.value);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

verify().catch(console.error);

