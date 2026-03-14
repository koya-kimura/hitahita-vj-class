import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset11 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const cols = 12;
  const rows = 7;
  const cellW = p.width / cols;
  const cellH = p.height / rows;
  const overY = cellH * 1.3;
  const yRange = p.height + overY * 2;

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      if ((gx + gy) % 2 !== 0) {
        continue;
      }

      const x = (gx + 0.5) * cellW;
      const y = -overY + ((gy + 0.5) / rows) * yRange;
      const dir = (gx % 2 === 0 ? 1 : -1) * (gy % 2 === 0 ? 1 : -1);

      objects.push(
        new RectSynthObject({
          startTime,
          bpm,
          presetIndex: 10,
          x,
          y,
          size: Math.min(cellW, cellH) * 0.42,
          params: {
            attackTime: 0.03,
            decayTime: 0.32,
            sustainLevel: 0.76,
            releaseTime: 0.24,
            lfoType: "sine",
            lfoRate: 1.4 + ((gx + gy) % 4) * 0.2,
            lfoDepth: 0.08,
            colorParams: { roleColor: dir > 0 ? "accent2" : "main" },
          },
          movement: {
            angle: dir > 0 ? Math.PI * 0.5 : -Math.PI * 0.5,
            distance: p.height * 0.32 + cellH,
            easing: "easeInOutSine",
          },
          rect: {
            stretchMode: "vertical",
            aspectRatio: 0.16,
          },
        }),
      );
    }
  }

  return objects;
};
