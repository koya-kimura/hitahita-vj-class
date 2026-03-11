import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape07: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  tex.noFill();
  strokeRole(tex, "sub1", 140);
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 7; x++) {
      const px = (x + 1) * (tex.width / 8);
      const py = (y + 1) * (tex.height / 6);
      const s = 20 + Math.sin(beat * 2 + x + y) * 8;
      tex.quad(px, py - s, px + s, py, px, py + s, px - s, py);
    }
  }
  tex.pop();
};
