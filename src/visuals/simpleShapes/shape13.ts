import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape13: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  tex.noFill();
  strokeRole(tex, "sub2", 150);
  for (let i = 0; i < 10; i++) {
    const w = tex.width * (0.1 + i * 0.07);
    const h = tex.height * (0.08 + i * 0.055);
    const ox = Math.sin(beat * 0.12 + i * 0.3) * 20;
    tex.rect(tex.width * 0.5 - w * 0.5 + ox, tex.height * 0.5 - h * 0.5, w, h);
  }
  tex.pop();
};
