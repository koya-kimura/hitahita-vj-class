import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape15: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const cx = tex.width * 0.5;
  const cy = tex.height * 0.5;
  tex.push();
  tex.noFill();
  strokeRole(tex, "main", 180);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + beat * 0.1;
    const orbit = tex.height * (0.12 + i * 0.03);
    const x = cx + Math.cos(a) * orbit;
    const y = cy + Math.sin(a) * orbit;
    tex.circle(x, y, 8 + i * 2);
  }
  tex.pop();
};
