import { fillRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape08: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const cx = tex.width * 0.5;
  const cy = tex.height * 0.5;
  const r = tex.height * 0.3;
  tex.push();
  tex.noStroke();
  fillRole(tex, "accent1", 180);
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2 + beat * 0.09;
    const d = 4 + (i % 5);
    tex.circle(cx + Math.cos(a) * r, cy + Math.sin(a) * r, d);
  }
  tex.pop();
};
