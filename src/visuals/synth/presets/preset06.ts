import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset06 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const centerX = p.width * 0.5;
  const centerY = p.height * 0.5;
  const grooveX = Math.sin(startTime * 0.018) * p.width * 0.02;
  const grooveY = Math.cos(startTime * 0.015) * p.height * 0.018;
  const size = Math.min(p.width, p.height) * 0.42;

  return [
    new RectSynthObject({
      startTime,
      bpm,
      presetIndex: 5,
      x: centerX + grooveX,
      y: centerY + grooveY,
      size,
      rect: {
        stretchMode: "uniform",
        aspectRatio: 1.0,
      },
      params: {
        attackTime: 0.02,
        decayTime: 0.55,
        sustainLevel: 0.86,
        releaseTime: 0.2,
        lfoType: "sine",
        lfoRate: 1.0,
        lfoDepth: 0.035,
        colorParams: { roleColor: "main" },
      },
      style: {
        mode: "fill",
      },
    }),
  ];
};
