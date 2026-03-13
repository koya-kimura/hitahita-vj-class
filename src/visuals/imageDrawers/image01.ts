import type { ImageDrawer } from "./types";
import { leapNoise } from "../../utils/math/gvm";

export const drawImage01: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("water");
  if (!img) return;

  const s = Math.min(tex.width, tex.height) * 0.75;
  tex.push();
  tex.imageMode(p.CENTER);
  const n = 20;
  for(let i = 0; i < n; i ++){
    const x = i / n * tex.width;
    const y = i / n * tex.height;
    const val = leapNoise(beat + i, 8, 2, i * 0.1);

    if(val > 0.5){
      tex.image(img, x, y, s, s);
    } 
  }
  tex.pop();
};
