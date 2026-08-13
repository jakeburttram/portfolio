import { copyFile, stat } from "node:fs/promises";

const requiredAssets = [
  "out/assets/Jake-Burttram-Resume.pdf",
  "out/assets/putting-cv/hero.webp",
  "out/assets/needlepoint/v1-plotter.webp",
  "out/assets/needlepoint/v2-inkjet.webp",
  "out/assets/imu-golf/demo.webp",
  "out/assets/cnc-massager/hero.webp",
  "out/assets/cnc-massager/cad.png",
  "out/assets/fitness-platform/demo.webp",
  "out/assets/fireplace/cad.png",
  "out/assets/fireplace/hero.webp",
  "out/assets/plotters/chain-plotter.webp",
  "out/assets/led-controller/hero.webp",
  "out/assets/led-controller/matrix.webp",
  "out/assets/uv-plotter/demo.webp",
  "out/assets/uv-plotter/galvo-cad.png",
];

await copyFile("out/index.html", "out/404.html");

for (const asset of requiredAssets) {
  const info = await stat(asset);
  if (!info.isFile() || info.size === 0) {
    throw new Error(`Missing required Pages asset: ${asset}`);
  }
}
