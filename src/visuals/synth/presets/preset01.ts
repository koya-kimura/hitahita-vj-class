import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset01 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const centerX = p.width * 0.5;
  const centerY = p.height * 0.5;
  const grooveX = Math.sin(startTime * 0.021) * p.width * 0.025;
  const grooveY = Math.cos(startTime * 0.017) * p.height * 0.02;

  return [
    new CircleSynthObject({
      startTime,
      bpm,
      presetIndex: 0,
      x: centerX + grooveX,
      y: centerY + grooveY,
      size: Math.min(p.width, p.height) * 0.36,
      params: {
        attackTime: 0.02,
        decayTime: 0.32,
        sustainLevel: 0.9,
        releaseTime: 0.18,
        lfoType: "sine",
        lfoRate: 1.2,
        lfoDepth: 0.05,
        colorParams: { roleColor: "accent2" },
      },
    }),
  ];
};
