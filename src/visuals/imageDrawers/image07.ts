import type { ImageDrawer } from "./types";

export const drawImage07: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("flower1");
  if (!img) return;

  const s = Math.min(tex.width, tex.height) * 0.8;

  tex.push();
  tex.imageMode(p.CENTER);
  tex.translate(tex.width * 0.5, tex.height * 0.5);
  tex.rotate(beat * 0.1);
  tex.image(img, 0, 0, s, s);
  tex.pop();
};
