import { fillRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape10: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const cx = tex.width * 0.5;
  const cy = tex.height * 0.5;
  tex.push();
  tex.noStroke();
  fillRole(tex, "line", 160);
  for (let i = 0; i < 220; i++) {
    const t = i * 0.08 + beat * 0.08;
    const r = i * 0.9;
    const x = cx + Math.cos(t) * r;
    const y = cy + Math.sin(t) * r;
    tex.circle(x, y, 2);
  }
  tex.pop();
};
