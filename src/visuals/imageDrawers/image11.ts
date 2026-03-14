import type { ImageDrawer } from "./types";
import { map } from "../../utils/math/mathUtils";
import { UniformRandom } from "../../utils/math/uniformRandom";
import { leapNoise } from "../../utils/math/gvm";

export const drawImage11: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const n = 20;

  tex.push();
  tex.imageMode(p.CENTER);
  // tex.translate(tex.width * 0.5, tex.height * 0.5);
  for (let i = 0; i < n; i++) {
    const hand = layer.getAnimationFrame("hand", 1, beat+UniformRandom.rand(Math.floor(leapNoise(beat, 8, 2, i)*5)), 0.14);
    if (!hand) return;

    const x = map(i, 0, n, -0.2, 1.2) * tex.width;
    tex.push();
    tex.translate(x, tex.height * 0.9);
    tex.scale(0.3)
    tex.image(hand, 0, 0);
    tex.pop();
  }
  tex.pop();
};
