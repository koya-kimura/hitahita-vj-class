import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape12: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const cx = tex.width * 0.5;
  const cy = tex.height * 0.5;
  tex.push();
  strokeRole(tex, "sub3", 180);
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2 + beat * 0.05;
    const r = tex.height * (0.15 + (i % 2) * 0.2);
    tex.line(cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  tex.pop();
};
