const { spawn } = require('child_process');
const http = require('http');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9260;

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

async function debugScroll() {
  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    "--user-data-dir=C:\\Users\\mohamedfazil\\tmp_cdp_profile_debug_scroll",
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
    await cdpSend(ws, "Console.enable", {}, id++);

    ws.addEventListener('message', (ev) => {
      const data = JSON.parse(ev.data);
      if (data.method === 'Console.messageAdded') {
        console.log('[BROWSER CONSOLE]', data.params.message.text);
      }
    });

    await cdpSend(ws, "Page.navigate", { url: "http://localhost:3000" }, id++);
    await sleep(2500);

    // Check scroll height and listener
    const docInfo = await cdpSend(ws, "Runtime.evaluate", {
      expression: `({
        scrollY: window.pageYOffset,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: window.innerHeight,
        canvasWidth: document.querySelector('canvas')?.width,
        canvasHeight: document.querySelector('canvas')?.height
      })`,
      returnByValue: true
    }, id++);
    console.log("Document Info:", docInfo.result.value);

    // Scroll to 50%
    console.log("Scrolling to 50%...");
    await cdpSend(ws, "Runtime.evaluate", {
      expression: `window.scrollTo(0, document.documentElement.scrollHeight * 0.5);`
    }, id++);
    await sleep(2000);

    // Check current state after 2 seconds
    const state50 = await cdpSend(ws, "Runtime.evaluate", {
      expression: `({
        scrollY: window.pageYOffset,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: window.innerHeight,
      })`,
      returnByValue: true
    }, id++);
    console.log("State at 50%:", state50.result.value);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

debugScroll().catch(console.error);

