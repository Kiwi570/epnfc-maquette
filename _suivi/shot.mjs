import { chromium } from 'playwright';
const [,, url, out, w='1280', h='900'] = process.argv;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url); await p.waitForTimeout(1500); await p.screenshot({ path: out, fullPage: true }); await b.close();
