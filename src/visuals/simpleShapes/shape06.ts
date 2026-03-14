import { strokeRole, fillRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { leapNoise } from "../../utils/math/gvm";

export const drawShape06: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const n = 40;
  const cx = tex.width * 0.5;
  const cy = tex.height * 0.5;
  tex.push();
  for (let i = 0; i < n; i++) {
    const a = i * (Math.PI / (n*0.5)) + beat * 0.08;
    const x = cx + Math.cos(a) * tex.width * 0.35;
    const y = cy + Math.sin(a) * tex.height * 0.35;
    const val = leapNoise(beat, 2, 1, i);

    if(val > 0.2) {
          tex.noFill();
  strokeRole(tex, "accent2", 160);
    } else {
            tex.noStroke();
    fillRole(tex, "main", 160);
        }
    tex.triangle(cx, cy, x, y, cx, y);
  }
  tex.pop();
};
