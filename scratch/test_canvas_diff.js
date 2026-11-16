const { spawn } = require('child_process');
const http = require('http');

async function test() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9270',
    '--user-data-dir=C:\\Users\\mohamedfazil\\tmp_cdp_profile_canvas_diff',
    '--window-size=390,844',
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const targets = await new Promise((res, rej) => http.get('http://127.0.0.1:9270/json', r => {
    let d=''; r.on('data', c=>d+=c); r.on('end', ()=>res(JSON.parse(d)));
  }).on('error', rej));

  const page = targets.find(t=>t.type==='page')||targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  function send(method, params={}) {
    return new Promise(r => {
      const id = Math.floor(Math.random()*100000);
      const h = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === id) { ws.removeEventListener('message', h); r(d.result); }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Runtime.enable');
  await send('Page.enable');
  await new Promise(r => setTimeout(r, 1000));

  // 1. Get pixel at top
  const p1 = await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelector('canvas');
      const ctx = c.getContext('2d');
      return Array.from(ctx.getImageData(100, 100, 5, 5).data);
    })()`,
    returnByValue: true
  });
  console.log('Pixels at top (frame 1):', p1.result.value?.slice(0, 12));

  // 2. Scroll to 5000px
  console.log('Scrolling to 5000px...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 5000);' });
  await new Promise(r => setTimeout(r, 1500));

  // 3. Get pixel at 5000px
  const p2 = await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelector('canvas');
      const ctx = c.getContext('2d');
      return Array.from(ctx.getImageData(100, 100, 5, 5).data);
    })()`,
    returnByValue: true
  });
  console.log('Pixels at 5000px:', p2.result.value?.slice(0, 12));

  // Compare pixels
  const same = JSON.stringify(p1.result.value) === JSON.stringify(p2.result.value);
  console.log('Are canvas pixels identical after scrolling to 5000px?', same);

  // Scroll to bottom (16000px)
  console.log('Scrolling to 16000px (bottom)...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 16000);' });
  await new Promise(r => setTimeout(r, 2000));

  const p3 = await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelector('canvas');
      const ctx = c.getContext('2d');
      return Array.from(ctx.getImageData(100, 100, 5, 5).data);
    })()`,
    returnByValue: true
  });
  console.log('Pixels at bottom:', p3.result.value?.slice(0, 12));
  const sameBottom = JSON.stringify(p1.result.value) === JSON.stringify(p3.result.value);
  console.log('Are canvas pixels identical at bottom compared to top?', sameBottom);

  ws.close();
  chromeProc.kill();
}

test().catch(console.error);

