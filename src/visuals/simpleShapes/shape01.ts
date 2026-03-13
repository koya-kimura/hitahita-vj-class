import { fillRole, strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { map } from "../../utils/math/mathUtils";
import { leapNoise } from "../../utils/math/gvm";

export const drawShape01: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;

  tex.push();
  const n = 100;
  for(let i = 0; i < n; i++) {
    const x = (tex.width / n) * i;
    const y = tex.height * 0.5 + Math.sin(beat * 0.5 + i * 0.3) * tex.height * 0.3;
    const d = Math.min(tex.width, tex.height) * map(Math.sin(beat * 2 + i * 0.5), -1, 1, 0.05, 0.3)
    const val = leapNoise(beat, 8, 6, i);

    if(val > 0.8) {
      fillRole(tex, "main", 255);
      tex.noStroke();
    } else {
      strokeRole(tex, "main", 150);
      tex.noFill();
    }
    tex.circle(x, y, d);
  }
  tex.pop();
};
