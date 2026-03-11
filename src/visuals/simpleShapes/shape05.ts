import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape05: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  tex.translate(tex.width * 0.5, tex.height * 0.5);
  tex.rotate(beat * 0.12);
  tex.noFill();
  strokeRole(tex, "accent2", 200);
  tex.strokeWeight(3);
  tex.rectMode(tex.CENTER);
  tex.rect(0, 0, tex.width * 0.35, tex.height * 0.2);
  tex.pop();
};
