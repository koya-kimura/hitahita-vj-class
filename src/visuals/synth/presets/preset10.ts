import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset10 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const cols = 16;
  const rows = 9;
  const cellW = p.width / cols;
  const cellH = p.height / rows;

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const maskSeed = startTime * 0.0031 + gx * 13.37 + gy * 19.91;
      const xSeed = startTime * 0.0047 + gx * 31.17 + gy * 7.13;
      const ySeed = startTime * 0.0059 + gx * 5.71 + gy * 37.43;
      const maskRnd = Math.sin(maskSeed) * 0.5 + 0.5;
      const xRnd = Math.sin(xSeed) * 0.5 + 0.5;
      const yRnd = Math.sin(ySeed) * 0.5 + 0.5;

      if (maskRnd < 0.2) {
        const x = (gx + 0.5) * cellW + (xRnd - 0.5) * cellW * 0.55;
        const y = (gy + 0.5) * cellH + (yRnd - 0.5) * cellH * 0.55;
        const size = Math.min(cellW, cellH) * 0.74;
        objects.push(
          new RectSynthObject({
            startTime,
            bpm,
            presetIndex: 9,
            x,
            y,
            size,
            params: {
              attackTime: 0.02,
              decayTime: 0.34,
              sustainLevel: 0.72,
              releaseTime: 0.2,
              lfoType: "sine",
              lfoRate: 3.2 + ((gx + gy) % 5) * 0.35,
              lfoDepth: 0.22,
              colorParams: { roleColor: xRnd > yRnd ? "accent1" : "sub1" },
            },
            rect: {
              stretchMode: "uniform",
              aspectRatio: 1.0,
            },
          }),
        );
      }
    }
  }

  return objects;
};
