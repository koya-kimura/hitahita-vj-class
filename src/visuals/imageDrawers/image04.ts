import type { ImageDrawer } from "./types";
import { map } from "../../utils/math/mathUtils";

export const drawImage04: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("apple");
  if (!img) return;

  const n = 10;
  for(let i = 0; i < n; i++) {
    const x = Math.sin(beat * 0.5 + i) * tex.width * 0.2 + tex.width * 0.5;
    const y = (map(i, 0, n-1, -0.2, 1.2) * tex.height + beat * 10.0 + p.noise(i) * tex.height) % tex.height * 1.4 - tex.height * 0.2;
    const s = Math.min(tex.width, tex.height) * 0.3;

    tex.push();
    tex.imageMode(p.CENTER);
    tex.translate(x, y);
    tex.image(img, 0, 0, s, s);
    tex.pop();
  }
};