const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9240;

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

async function measure() {
  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    "--user-data-dir=C:\\Users\\mohamedfazil\\tmp_cdp_profile_perf_test",
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
    await cdpSend(ws, "Network.enable", {}, id++);
    await cdpSend(ws, "Page.enable", {}, id++);
    await cdpSend(ws, "Runtime.enable", {}, id++);

    // Track requests
    let totalRequests = 0;
    let frameRequests = 0;
    let frameBytes = 0;
    let frame1Time = 0;
    const startTime = Date.now();

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Network.requestWillBeSent') {
        totalRequests++;
        const url = msg.params.request.url;
        if (url.includes('frame_')) {
          frameRequests++;
        }
      }
      if (msg.method === 'Network.loadingFinished') {
        frameBytes += msg.params.encodedDataLength || 0;
      }
      if (msg.method === 'Network.responseReceived') {
        const url = msg.params.response.url;
        if (url.includes('frame_0001.webp') && !frame1Time) {
          frame1Time = Date.now() - startTime;
        }
      }
    });

    console.log("Navigating to http://localhost:3000...");
    await cdpSend(ws, "Page.navigate", { url: "http://localhost:3000" }, id++);

    // Wait 3 seconds on initial load
    await sleep(3000);

    console.log("--- Initial 3s Load ---");
    console.log("Total Network Requests:", totalRequests);
    console.log("Frame Requests fired:", frameRequests);
    console.log("Frame Data Received (MB):", (frameBytes / (1024 * 1024)).toFixed(2));
    console.log("Time to Frame 1 Response (ms):", frame1Time);

    // Fast scroll down
    console.log("\nSimulating fast scroll down over 2.5 seconds...");
    const scrollStart = Date.now();
    for (let p = 0; p <= 1; p += 0.05) {
      await cdpSend(ws, "Runtime.evaluate", {
        expression: `window.scrollTo(0, document.body.scrollHeight * ${p});`
      }, id++);
      await sleep(100);
    }

    console.log("--- After Fast Scroll Down ---");
    console.log("Total Frame Requests so far:", frameRequests);
    console.log("Frame Data Received (MB):", (frameBytes / (1024 * 1024)).toFixed(2));

    // Get JS Heap memory usage
    const heapRes = await cdpSend(ws, "Runtime.evaluate", {
      expression: "window.performance && window.performance.memory ? window.performance.memory.usedJSHeapSize : 0"
    }, id++);
    const usedHeapMB = (heapRes.result.value / (1024 * 1024)).toFixed(2);
    console.log("JS Heap Used (MB):", usedHeapMB);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

measure().catch(console.error);

