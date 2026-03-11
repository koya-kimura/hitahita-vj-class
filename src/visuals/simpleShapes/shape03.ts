import { map } from "../../utils/math/mathUtils";
import { fillRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape03: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  tex.noStroke();
  for (let i = 0; i < 16; i++) {
    const x = (tex.width / 16) * i;
    const h = map(Math.sin(beat * 2 + i * 0.6), -1, 1, tex.height * 0.2, tex.height * 0.9);
    fillRole(tex, "sub3", 110);
    tex.rect(x, tex.height - h, tex.width / 24, h);
  }
  tex.pop();
};
