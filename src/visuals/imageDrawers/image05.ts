import type { ImageDrawer } from "./types";
import { map } from "../../utils/math/mathUtils";

export const drawImage05: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const hand = layer.getImageByKey("hand");
  if (!hand) return;

  const n = 50;
  const s = Math.min(tex.width, tex.height) * 0.3;
  for (let i = 0; i < n; i++) {
    const x = map(i, 0, n - 1, tex.width * 1.2, -tex.width * 0.2);
    const y = tex.height * 0.5 + Math.sin(beat * 0.5 + i * 0.2) * tex.height * 0.1;
    tex.push();
    tex.imageMode(p.CENTER);
    tex.translate(x, y);
    tex.rotate(Math.sin(beat * 0.5 + i * 0.2) * 0.4);
    tex.image(hand, 0, 0, s, s);
    tex.pop();
  }
};
