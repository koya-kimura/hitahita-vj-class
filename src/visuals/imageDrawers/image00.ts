import type { ImageDrawer } from "./types";
import { map } from "../../utils/math/mathUtils";
import { easeOutQuad, easeOutSine } from "../../utils/math/easing";
import { leapRamp } from "../../utils/math/gvm";
import { zigzag } from "../../utils/math/mathUtils";

export const drawImage00: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("clock");
  if (!img) return;

  const y = (map(easeOutQuad((leapRamp(beat, 8, 2))%1), 0, 1, -0.5, 1.5) * tex.height + tex.height*1.5) % (tex.height * 2) - tex.height * 0.5;
  const s = Math.min(tex.width, tex.height) * 0.8;
  const asp = zigzag(leapRamp(beat, 8, 2)) * 0.3 + 1;

  tex.push();
  tex.translate(tex.width * 0.5, y);
  tex.scale(asp, 1);
  tex.rotate((easeOutSine((beat * 0.125) % 1)) * Math.PI * 2);
  tex.imageMode(p.CENTER);
  tex.image(img, 0, 0, s*1.5, s*1.3);
  tex.image(img, 0, 0, s, s);
  tex.pop();
};
