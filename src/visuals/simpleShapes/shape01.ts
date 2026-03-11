import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape01: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  tex.noFill();
  strokeRole(tex, "main", 170);
  for (let i = 1; i <= 8; i++) {
    const w = i * 50 + Math.sin(beat * 2 + i) * 14;
    tex.ellipse(tex.width * 0.5, tex.height * 0.5, w, w);
  }
  tex.pop();
};
