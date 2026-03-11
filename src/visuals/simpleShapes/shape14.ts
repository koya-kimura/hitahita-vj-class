import { map } from "../../utils/math/mathUtils";
import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape14: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const margin = map(Math.sin(beat * 2), -1, 1, 12, 64);
  tex.push();
  tex.noFill();
  strokeRole(tex, "line", 210);
  tex.strokeWeight(4);
  tex.rect(margin, margin, tex.width - margin * 2, tex.height - margin * 2);
  tex.pop();
};
