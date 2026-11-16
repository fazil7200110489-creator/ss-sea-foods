const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9245;

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
    "--user-data-dir=C:\\Users\\mohamedfazil\\tmp_cdp_profile_after",
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
    const requestedFrames = new Set();
    const startTime = Date.now();

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Network.requestWillBeSent') {
        totalRequests++;
        const url = msg.params.request.url;
        if (url.includes('frame_')) {
          frameRequests++;
          const match = url.match(/frame_(\d+)\.webp/);
          if (match) requestedFrames.add(parseInt(match[1], 10));
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

    console.log("Navigating to http://localhost:3000 with progressive loading...");
    await cdpSend(ws, "Page.navigate", { url: "http://localhost:3000" }, id++);

    // Wait 3 seconds on initial load
    await sleep(3000);

    console.log("--- Initial 3s Load (AFTER OPTIMIZATION) ---");
    console.log("Total Network Requests:", totalRequests);
    console.log("Frame Requests fired:", frameRequests);
    console.log("Frame Data Received (MB):", (frameBytes / (1024 * 1024)).toFixed(2));
    console.log("Time to Frame 1 Response (ms):", frame1Time);
    console.log("Initial frames loaded:", Array.from(requestedFrames).sort((a,b)=>a-b).slice(0, 15));

    // Scroll down 25% (to section 2 - Zoom Parallax)
    console.log("\nScrolling to 25% (Section 2 Zoom)...");
    await cdpSend(ws, "Runtime.evaluate", {
      expression: `window.scrollTo(0, document.body.scrollHeight * 0.25);`
    }, id++);
    await sleep(1500);

    console.log("--- At 25% Scroll ---");
    console.log("Total Frame Requests so far:", frameRequests);
    console.log("Frame Data Received (MB):", (frameBytes / (1024 * 1024)).toFixed(2));

    // Scroll down to 60% (Catalogue)
    console.log("\nScrolling to 60% (Seafood Details)...");
    await cdpSend(ws, "Runtime.evaluate", {
      expression: `window.scrollTo(0, document.body.scrollHeight * 0.60);`
    }, id++);
    await sleep(1500);

    console.log("--- At 60% Scroll ---");
    console.log("Total Frame Requests so far:", frameRequests);
    console.log("Frame Data Received (MB):", (frameBytes / (1024 * 1024)).toFixed(2));

    // Reverse scroll back up to Hero (0%)
    console.log("\nReverse scrolling back to Hero (0%)...");
    await cdpSend(ws, "Runtime.evaluate", {
      expression: `window.scrollTo(0, 0);`
    }, id++);
    await sleep(1500);

    console.log("--- After Reverse Scroll Back to Hero ---");
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

