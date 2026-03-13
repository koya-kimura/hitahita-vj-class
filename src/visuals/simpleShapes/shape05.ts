import { strokeRole } from "./palette";
import { map } from "../../utils/math/mathUtils";
import type { SimpleShapeDrawer } from "./types";
import { leapNoise } from "../../utils/math/gvm";
import { UniformRandom } from "../../utils/math/uniformRandom";
import { zigzag } from "../../utils/math/mathUtils";
import { easeOutExpo } from "../../utils/math/easing";

export const drawShape05: SimpleShapeDrawer = (context) => {
    const { p, tex, beat } = context;
    tex.push();
    const n = 40;
    const m = 5;

    for (let j = 0; j < m; j++) {
        strokeRole(tex, "main", 255);
        tex.noFill();
        tex.strokeCap(p.SQUARE);
        tex.strokeWeight(Math.min(tex.width, tex.height) * map(UniformRandom.rand(j), 0, 1, 0.001, 0.05));
        tex.beginShape();
        for (let i = 0; i < n; i++) {
            const radius = Math.min(tex.width, tex.height) * map(leapNoise(beat, 8, 1, i * 0.5, j), 0, 1, 0.1, 0.35) * map(leapNoise(beat, 8, 7, i * 0.5, j), 0, 1, 0.9, 1.1) * map(j, 0, m, 1, 5) * map(easeOutExpo(zigzag(beat+j*0.02)), 0, 1, 0.95, 1.05);
            const angle = (i / n) * Math.PI * 2 + beat * 0.1;
            const x = tex.width * 0.5 + Math.cos(angle) * radius;
            const y = tex.height * 0.5 + Math.sin(angle) * radius;

            tex.vertex(x, y);
        }
        tex.endShape(p.CLOSE);
    }
    tex.pop();
};
