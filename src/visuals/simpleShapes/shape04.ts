import { fillRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { leapRamp } from "../../utils/math/gvm";

export const drawShape04: SimpleShapeDrawer = (context) => {
  const { p, tex, beat } = context;

  tex.push();

  const n = 64;
  const m = 36;
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const x = (col + 0.5) * (tex.width / n);
      const y = (row + 0.5) * (tex.height / m);
      const w = tex.width / n * 1.05;
      const h = tex.height / m * 1.05;
      const val = p.noise(leapRamp(beat, 8, 4)*3, col * 0.1, row * 0.15 + beat * 0.1);

      tex.push();
      tex.translate(x, y);
      if(val > 0.7) {
        fillRole(tex, "accent1", 255);
        tex.noStroke();
        tex.rectMode(p.CENTER);
        tex.rect(0, 0, w, h);
      } else if(val > 0.5) {
        fillRole(tex, "sub1", 255);
        tex.noStroke();
        tex.rectMode(p.CENTER);
        tex.rect(0, 0, w, h);
      } else if(val > 0.4) {
        fillRole(tex, "main", 255);
        tex.noStroke();
        tex.rectMode(p.CENTER);
        tex.rect(0, 0, w, h);
      } 
      tex.pop();
    }
  }

  tex.pop();
};
