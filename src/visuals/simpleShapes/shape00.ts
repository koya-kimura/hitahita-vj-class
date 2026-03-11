import { map } from "../../utils/math/mathUtils";
import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape00: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const r = map(Math.sin(beat * Math.PI * 2), -1, 1, 60, 220);
  tex.push();
  tex.noFill();
  strokeRole(tex, "line", 180);
  tex.strokeWeight(3);
  tex.ellipse(tex.width * 0.5, tex.height * 0.5, r, r);
  tex.pop();
};
