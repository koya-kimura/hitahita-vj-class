import { fillRole, strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { leapNoise, leapRamp } from "../../utils/math/gvm";
import { easeInOutSine } from "../../utils/math/easing";
import { map } from "../../utils/math/mathUtils";

export const drawShape00: SimpleShapeDrawer = (context) => {
  const { p, tex, beat } = context;

  tex.push();

  const n = 20;
  const m = map(leapNoise(beat, 32, 4), 0, 1, 10, 30);
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const x = (col + 0.5) * ((tex.width * 1.2) / n) - tex.width * 0.1;
      const nx = x + (easeInOutSine((beat*0.5)%1)) * (row%2 == 0 ? 1 : -1) * (tex.width * 1.2) / n;
      const y = (row + 0.5) * ((tex.height * 1.2) / m) - tex.height * 0.1;
      const w = tex.width / n;
      const h = tex.height / m;
      const val = leapNoise(beat, 8, 2, col * 0.5, row * 0.5);
      const scl = map(Math.abs(beat%1-0.5), 0.5, 0, 0.6, 0.7);
      const s = Math.min(w * scl, h * scl);

      tex.push();
      tex.translate(nx, y);
      if (val > 0.8) {
        fillRole(tex, "accent1", 255);
        tex.noStroke();
      } else if (Math.floor(beat) % 2 == ((row + col) % 2)) {
        fillRole(tex, "main", 255);
        tex.noStroke();
      } else {
        tex.noFill();
        tex.strokeWeight(2);
        strokeRole(tex, "line", 255);
      }
      tex.rectMode(p.CENTER);
      tex.rect(0, 0, s, s);
      tex.pop();
    }
  }

  tex.pop();
};
