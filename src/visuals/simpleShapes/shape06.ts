import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape06: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const cx = tex.width * 0.5;
  const cy = tex.height * 0.5;
  tex.push();
  tex.noFill();
  strokeRole(tex, "sub2", 160);
  for (let i = 0; i < 18; i++) {
    const a = i * (Math.PI / 9) + beat * 0.08;
    const x = cx + Math.cos(a) * tex.width * 0.35;
    const y = cy + Math.sin(a) * tex.height * 0.35;
    tex.triangle(cx, cy, x, y, cx, y);
  }
  tex.pop();
};
