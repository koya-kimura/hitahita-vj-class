import { map } from "../../utils/math/mathUtils";
import { fillRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { UniformRandom } from "../../utils/math/uniformRandom";

export const drawShape14: SimpleShapeDrawer = (context) => {
  const { p, tex, beat } = context;
  tex.push();
  for (let j = 0; j < 5; j++) {
    tex.noStroke();
    if(j == 0){
      fillRole(tex, "accent1", 180);
    } else {
      fillRole(tex, "main", 180);
    }
    
    const n = 10;
    tex.beginShape();
    for (let i = 0; i < n; i++) {
      const radius = Math.min(tex.width, tex.height) * 0.7;
      const angle = UniformRandom.rand(i, j) * Math.PI * 2 + (i % 2 == 0 ? 1 : -1) * beat * map(UniformRandom.rand(i, j ,4178), 0, 1, 0.05, 0.4);
      const x = tex.width / 2 + Math.cos(angle) * radius;
      const y = tex.height / 2 + Math.sin(angle) * radius;
      tex.vertex(x, y);
    }
    tex.endShape(p.CLOSE)
  }
  tex.pop();
};
