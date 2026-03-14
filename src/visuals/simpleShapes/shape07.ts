import { strokeRole, fillRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { UniformRandom } from "../../utils/math/uniformRandom";
import { map } from "../../utils/math/mathUtils";
import { leapNoise } from "../../utils/math/gvm";

export const drawShape07: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  const n = 5;
  const m = 7;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      const px = (x + 1) * (tex.width / (m + 1));
      const py = (y + 1) * (tex.height / (n + 1));

      tex.push();
      tex.translate(px, py);
      for(let i = 0; i < 5; i ++){
        const d = map(Math.sin(beat*UniformRandom.rand(x, y, i)), -1, 1, 0.2, 0.7) * Math.min(tex.width, tex.height) / Math.min(n, m);
        const val = leapNoise(beat, 4, 1, x * n + y * m + i);

        if(val > 0.5) {
        tex.noFill();
        tex.strokeWeight(2)
        strokeRole(tex, "sub1", 140);
        } else if(val > 0.2) {
                    tex.noStroke();
        fillRole(tex, "accent2", 220);
        } else {
                    tex.noStroke();
        fillRole(tex, "main", 220);
        }
        tex.circle(0, 0, d);
      }
      tex.pop();
    }
  }
  tex.pop();
};