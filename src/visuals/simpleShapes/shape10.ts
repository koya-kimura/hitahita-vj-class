import { fillRole, strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { map } from "../../utils/math/mathUtils";
import { leapNoise } from "../../utils/math/gvm";

export const drawShape10: SimpleShapeDrawer = (context) => {
    const { tex, beat } = context;

    tex.push();
    const n = 64;
    const m = 36;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const d = Math.min(tex.width, tex.height) * 0.005;
            const x = map(i, 0, n - 1, -0.1, 1.1) * tex.width + (j % 2) * tex.width * 1.2 / n / 2;
            const y = map(j, 0, m - 1, -0.1, 1.1) * tex.height;
            const val = leapNoise(beat, 4, 3.5, i, j);

            if (val > 0.8) {
                tex.noStroke();
                fillRole(tex, "accent2", 100);
                tex.circle(x, y, d);
            } else if(val > 0.5) {
                tex.noFill();
                strokeRole(tex, "sub1", 255)
                tex.circle(x, y, d);
            } 
        }
    }
    tex.pop();
};