import { map } from "../../utils/math/mathUtils";
import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { zigzag } from "../../utils/math/mathUtils";
import { easeInOutQuad } from "../../utils/math/easing";

export const drawShape11: SimpleShapeDrawer = (context) => {
    const { p, tex, beat } = context;
    tex.push();
    const n = 500;
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < n; i++) {
            const x = map(i, 0, n, -0.05, 1.05) * tex.width;
            const y = tex.height * 0.5 + Math.sin(beat * 1.3 + i * 0.02 + j * 1.2) * tex.height * 0.3 * easeInOutQuad(map(zigzag(beat), 0, 1, 0.98, 1.0)) + map(p.noise(beat, i * 0.01, j), 0, 1, -1.0, 1.0) * tex.height * 0.3;
            const tx = x + Math.cos(beat * 0.5 + i * 0.6) * tex.width * 0.005;
            strokeRole(tex, "main", 150);
            tex.line(x, tex.height *  map(Math.cos(beat*2.0 + i * 0.02), -1, 1, 0.45, 0.55), tx, y);
        }
    }
    tex.pop();
};
