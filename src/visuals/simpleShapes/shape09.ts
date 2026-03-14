import { fillRole, strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { UniformRandom } from "../../utils/math/uniformRandom";
import { map } from "../../utils/math/mathUtils";

export const drawShape09: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  const pointCount = 42;
  const cols = 16;
  const rows = 9;
  const phase = beat * 0.1;
  const baseStep = Math.floor(phase);
  const t = phase - baseStep;

  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < pointCount; i++) {
    const gx0 = Math.floor(UniformRandom.rand(i, 0, baseStep) * cols);
    const gy0 = Math.floor(UniformRandom.rand(i, 1, baseStep) * rows);
    const gx1 = Math.floor(UniformRandom.rand(i, 0, baseStep + 1) * cols);
    const gy1 = Math.floor(UniformRandom.rand(i, 1, baseStep + 1) * rows);

    const x0 = map(gx0 + 0.5, 0, cols, -0.2, 1.2) * tex.width;
    const y0 = map(gy0 + 0.5, 0, rows, -0.2, 1.2) * tex.height;
    const x1 = map(gx1 + 0.5, 0, cols, -0.2, 1.2) * tex.width;
    const y1 = map(gy1 + 0.5, 0, rows, -0.2, 1.2) * tex.height;

    points.push({
      x: x0 + (x1 - x0) * t,
      y: y0 + (y1 - y0) * t,
    });
  }

  tex.push();
  const threshold = Math.min(tex.width, tex.height) * 0.22;
  const thresholdSq = threshold * threshold;
  const connected: boolean[][] = Array.from({ length: points.length }, () =>
    new Array(points.length).fill(false),
  );

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dSq = dx * dx + dy * dy;
      if (dSq <= thresholdSq) {
        connected[i][j] = true;
        connected[j][i] = true;
      }
    }
  }

  tex.noStroke();
  fillRole(tex, "main", 28);
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (!connected[i][j]) {
        continue;
      }
      for (let k = j + 1; k < points.length; k++) {
        if (connected[i][k] && connected[j][k]) {
          tex.triangle(
            points[i].x,
            points[i].y,
            points[j].x,
            points[j].y,
            points[k].x,
            points[k].y,
          );
        }
      }
    }
  }

  tex.noFill();
  tex.strokeWeight(1.1);
  strokeRole(tex, "accent1", 190);

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (connected[i][j]) {
        tex.line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }

  tex.pop();
};