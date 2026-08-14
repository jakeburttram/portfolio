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
  assert.match(html, /IMU Golf Simulator/i);
  assert.match(html, /CoreXYZ Motion Platform/i);
  assert.match(html, /Interactive Fitness Platform/i);
  assert.match(html, /LED Desktop Fireplace/i);
  assert.match(html, /UV Glow Plotter/i);
  assert.match(html, /Pen Plotters/i);
  assert.match(html, /LED Controller/i);
  assert.match(html, /putting-cv\/hero\.mp4/i);
  assert.match(html, /putting-cv\/system-diagram\.png/i);
  assert.match(html, /imu-golf\/controller-diagram\.png/i);
  assert.match(html, /fitness-platform\/load-cell-board\.png/i);
  assert.match(html, /chain-plotter\.mp4/i);
  assert.match(html, /plotters\/mini-plotter\.png/i);
  assert.match(html, /SELECTED WORK/i);
  assert.doesNotMatch(html, /FEATURED PROJECTS|SMALLER BUILDS/i);
  assert.equal(html.includes(["CNC", "Robotic", "Massager"].join(" ")), false);
  assert.equal(html.includes(["CNC", "Massager"].join(" ")), false);
  assert.equal(html.includes(["IN", "PROGRESS"].join(" ")), false);
  assert.doesNotMatch(html, /media-asset|PROJECT CLIP|RELATED VIEWS/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|react-loading-skeleton/i);
});
