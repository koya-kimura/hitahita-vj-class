import type { ImageDrawer } from "./types";

export const drawImage13: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const hand = layer.getAnimationFrame("hand", 3, beat, 0.28);
  if (!hand) return;

  const corners = [
    [0.15, 0.15],
    [0.85, 0.15],
    [0.15, 0.85],
    [0.85, 0.85],
  ] as const;

  tex.push();
  tex.imageMode(p.CENTER);
  corners.forEach(([nx, ny], i) => {
    tex.push();
    tex.translate(tex.width * nx, tex.height * ny);
    tex.rotate(beat * 0.1 * (i % 2 === 0 ? 1 : -1) + i * 0.3);
    tex.scale(0.9 + Math.sin(beat * 0.7 + i) * 0.6);
    tex.image(hand, 0, 0);
    tex.pop();
  });
  tex.pop();
};
