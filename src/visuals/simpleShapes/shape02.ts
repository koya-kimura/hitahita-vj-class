import { map } from "../../utils/math/mathUtils";
import { fillRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape02: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  tex.noStroke();
  for (let i = 0; i < 12; i++) {
    const y = (tex.height / 12) * i;
    const alpha = map(Math.sin(beat * 3 + i), -1, 1, 30, 160);
    fillRole(tex, "sub1", alpha);
    tex.rect(0, y, tex.width, tex.height / 24);
  }
  tex.pop();
};
