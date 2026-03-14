import type { ImageDrawer } from "./types";

export const drawImage12: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const hand = layer.getAnimationFrame("hand", 2, beat, 0.2);
  if (!hand) return;

  const rows = 5;

  tex.push();
  tex.imageMode(p.CENTER);
  for (let i = 0; i < rows; i++) {
    const y = ((i + 0.5) / rows) * tex.height;
    const drift = Math.sin(beat * 0.6 + i * 0.9) * tex.width * 0.18;

    tex.push();
    tex.translate(tex.width * 0.5 + drift, y);
    tex.rotate(Math.sin(beat * 0.4 + i) * 0.2);
    tex.scale(0.5 + i * 0.12);
    tex.image(hand, 0, 0);
    tex.pop();
  }
  tex.pop();
};
