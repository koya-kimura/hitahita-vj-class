import type { ImageDrawer } from "./types";
import { leapNoise } from "../../utils/math/gvm";
import { map } from "../../utils/math/mathUtils";

export const drawImage06: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("car");
  if (!img) return;

  for(let i = 0; i < 3; i++) {
    const s = Math.min(tex.width, tex.height) * 0.6;
    const scl = 1 + leapNoise(beat, 4, 4, i) * 2.0;
    const x = map(i, 0, 2, 0, 1.0) * tex.width;
    const y = map(leapNoise(beat, 4, 4, i), 0, 1, 0.4, 0.6);

    tex.push();
    tex.imageMode(p.CENTER);
    tex.image(img, x, tex.height * y, s * scl, s * scl);
    tex.pop();
  }
};
