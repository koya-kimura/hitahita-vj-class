import { map } from "../../utils/math/mathUtils";
import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";
import { leapNoise } from "../../utils/math/gvm";

export const drawShape02: SimpleShapeDrawer = (context) => {
  const { p, tex, beat } = context;
  tex.push();
  const n  = 1000;
  for(let i = 0; i < n; i++) {
   const angle = Math.PI * 2 * (i / n) + beat * 0.01;
    const r = map(Math.sin(beat * 0.1 + i * 0.3), -1, 1, tex.height * 0.5, tex.height * 1.5);
    const x = tex.width * map(Math.sin(beat * 0.2 + i * 0.3), -1, 1, 0.3, 0.7) + Math.cos(angle) * r;
    const y = tex.height * map(Math.sin(beat * 0.17 + i * 0.2), -1, 1, 0.3, 0.7) + Math.sin(angle) * r;
    const a = map(Math.pow(p.noise(beat*0.3, i), 4), 0, 1, 0, 400);
    const val = leapNoise(beat, 8, 6, i);

    tex.push();
    tex.translate((x+tex.width*0.5)/2, (y+tex.height*0.5)/2);
    tex.rotate(angle + beat * 0.1);
    tex.strokeWeight(0.5);
    if(val > 0.95){
      strokeRole(tex, "accent1", a);
    } else if(i % 2 == 0){
       strokeRole(tex, "main", a);
    } else {
        strokeRole(tex, "sub1", a);
    } 
    tex.line(0, 0, x - tex.width * 0.5, y - tex.height * 0.5);
    tex.pop();
  }
  tex.pop();
};
