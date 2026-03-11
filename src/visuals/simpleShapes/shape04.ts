import { map } from "../../utils/math/mathUtils";
import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape04: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const cx = tex.width * 0.5;
  const cy = tex.height * 0.5;
  const s = map(Math.sin(beat * 2), -1, 1, 80, 280);
  tex.push();
  strokeRole(tex, "accent1", 190);
  tex.strokeWeight(2);
  tex.line(cx - s, cy, cx + s, cy);
  tex.line(cx, cy - s, cx, cy + s);
  tex.pop();
};
