import type { ImageDrawer } from "./types";

export const drawImage03: ImageDrawer = (layer, p, tex, beat, _nowMs) => {

  tex.push();
  const n = 6;
  for (let i = 0; i < n; i++) {
    const hand = layer.getAnimationFrame("hand", 0, beat + i, 0.1);
    const angle = (p.TWO_PI / n) * i + beat * 0.4;

    if(!hand) continue;

    tex.push();
    tex.imageMode(p.CENTER);
    tex.translate(tex.width * 0.5, tex.height * 0.5);
    tex.rotate(angle);
    tex.scale(3.5);
    tex.image(hand, 0, 0)
    tex.pop();

  }
  tex.pop();
};