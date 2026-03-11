import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape09: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  tex.noFill();
  strokeRole(tex, "main", 170);
  for (let row = 0; row < 8; row++) {
    tex.beginShape();
    for (let x = 0; x <= tex.width; x += 20) {
      const y =
        tex.height * (0.15 + row * 0.1) +
        Math.sin(x * 0.02 + beat * 0.18 + row) * (12 + row * 2);
      tex.vertex(x, y);
    }
    tex.endShape();
  }
  tex.pop();
};
