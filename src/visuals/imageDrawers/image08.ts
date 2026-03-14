import type { ImageDrawer } from "./types";
import { map } from "../../utils/math/mathUtils";

export const drawImage08: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("calculator");
  if (!img) return;

  const n = 9;
  const size = Math.min(tex.width, tex.height) * 0.34;

  tex.push();
  tex.imageMode(p.CENTER);
  for (let i = 0; i < n; i++) {
    const t = ((beat * 0.18 + i / n) % 1 + 1) % 1;
    const y = map(t, 0, 1, -size, tex.height + size);
    const x = map(i, 0, n - 1, tex.width * 0.08, tex.width * 0.92) + Math.sin(beat * 0.4 + i) * 24;
    tex.push();
    tex.translate(x, y);
    tex.rotate(Math.sin(beat * 0.2 + i * 0.7) * 0.12);
    tex.image(img, 0, 0, size, size);
    tex.pop();
  }
  tex.pop();
};
