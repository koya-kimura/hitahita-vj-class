import type { ImageDrawer } from "./types";

export const drawImage14: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const hand = layer.getAnimationFrame("hand", 4, beat, 0.12);
  if (!hand) return;

  const n = 9;

  tex.push();
  tex.imageMode(p.CENTER);
  tex.translate(tex.width * 0.5, tex.height * 0.5);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const scale = 0.8 + t * 4.0;
    const rotation = beat * 0.15 + t * Math.PI * 2;
    tex.push();
    tex.rotate(rotation);
    tex.scale(scale);
    tex.image(hand, 0, 0);
    tex.pop();
  }
  tex.pop();
};
