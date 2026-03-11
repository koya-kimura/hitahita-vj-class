import { map } from "../../utils/math/mathUtils";
import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape11: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const s = map(Math.sin(beat * 2), -1, 1, 40, 140);
  tex.push();
  tex.noFill();
  strokeRole(tex, "accent2", 180);
  tex.strokeWeight(3);
  tex.rect(20, 20, s, s);
  tex.rect(tex.width - s - 20, 20, s, s);
  tex.rect(20, tex.height - s - 20, s, s);
  tex.rect(tex.width - s - 20, tex.height - s - 20, s, s);
  tex.pop();
};
