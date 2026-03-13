import { map } from "../../utils/math/mathUtils";
import type { SimpleShapeDrawer } from "./types";
import { UniformRandom } from "../../utils/math/uniformRandom";
import { easeInOutQuad } from "../../utils/math/easing";

export const drawShape03: SimpleShapeDrawer = (context) => {
  const { tex, beat } = context;
  tex.push();
  tex.translate(tex.width / 2, tex.height / 2);
  tex.rotate(Math.PI * 0.1);
  tex.scale(1.5, 1);
  tex.noStroke();
  const n = 20;
  for (let i = 0; i < n; i++) {
    const x = map(UniformRandom.rand(i, 1, Math.floor(beat)), 0, 1, -0.5, 0.5) * tex.width;
    const y = map(UniformRandom.rand(i, 2, Math.floor(beat)), 0, 1, -0.5, 0.5) * tex.height;
    const angle = UniformRandom.rand(i, 3, Math.floor(beat)) * Math.PI * 2;
    const m = 20;

    tex.push();
    tex.translate(x, y);
    tex.rotate(angle);
    for (let j = 0; j < m; j++) {
      const w = Math.min(tex.width, tex.height) * 0.05;
      const h = Math.min(tex.width, tex.height) * 0.2;
      const scl = map(easeInOutQuad(beat % 1), 0, 1, 0, 0.5);
      const py = map(j, 0, m, -h * scl, h * scl);

      tex.push();
      tex.translate(-w / 2, py - h / 2);
      if (UniformRandom.rand(Math.floor(beat), i, j) > 0.98) {
        tex.rotate(Math.PI * 0.1)
      }
      tex.rect(0, 0, w, h / (m * 2));
      tex.pop();
    }
    tex.pop();
  }
  tex.pop();
};
