import type { SimpleShapeDrawer } from "./types";

export const drawShape08: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;

  const cols = 32;
  const rows = 21;
  const cellW = tex.width / cols;
  const cellH = tex.height / rows;
  const yShift = cellH * ((beat*0.5)%1);

  tex.push();
  tex.noFill();
  tex.stroke(255, 190);
  tex.strokeWeight(1.2);

  for (let col = -1; col <= cols + 1; col++) {
    const x = col * cellW;
    tex.line(x, 0, x, tex.height);
  }

  for (let row = -1; row <= rows + 1; row++) {
    const y = row * cellH + yShift;
    tex.line(0, y, tex.width, y);
  }

  tex.pop();
};
