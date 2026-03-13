import { fillRole } from "./palette";
import { map } from "../../utils/math/mathUtils";
import type { SimpleShapeDrawer } from "./types";
import { UniformRandom } from "../../utils/math/uniformRandom";
import { easeInOutSine } from "../../utils/math/easing";

export const drawShape15: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  for (let i = 0; i < 12; i++) {
    const v = Math.pow(UniformRandom.rand(i, 80704), 2) * 0.2 + 0.1;
    const x = map(easeInOutSine((beat * v) % 1), 0, 1, -0.5, 1.5) * tex.width;
    const y = tex.height * 0.5;
    const d = (UniformRandom.rand(i, 47902) * 0.4 + 0.1) * Math.min(tex.width, tex.height) * 0.8;

    tex.noStroke();
    fillRole(tex, "main", 180);
    tex.circle(x, y, d);
  }
  tex.pop();
};