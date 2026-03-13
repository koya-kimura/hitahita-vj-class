import type { ImageDrawer } from "./types";

export const drawImage02: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("building");
  if (!img) return;

  tex.push();
  tex.imageMode(p.CENTER);
  for (let i = 0; i < 10; i++) {
    const x = tex.width * 0.5 + Math.cos(beat * 0.05 + i) * tex.width * 1.0;
    const s = Math.min(tex.width, tex.height) * 0.8;
    tex.image(img, x, tex.height - s * 0.5, s, s);
  }
  tex.pop();
};
