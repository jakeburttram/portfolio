import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders Jake's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Jake Burttram/i);
  assert.match(html, /Mechanical Engineer/i);
  assert.match(html, /Putting Computer Vision System/i);
  assert.match(html, /Automated Needlepoint Printer/i);
  assert.match(html, /Wireless IMU Golf Simulator/i);
  assert.match(html, /CNC Robotic Massager/i);
  assert.match(html, /Other Builds|SMALLER BUILDS/i);
  assert.match(html, /PUTTING-CV\/HERO\.WEBP/i);
  assert.match(html, /NEEDLEPOINT\/V1-PLOTTER\.WEBP/i);
  assert.match(html, /NEEDLEPOINT\/V2-INKJET\.WEBP/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|react-loading-skeleton/i);
});
