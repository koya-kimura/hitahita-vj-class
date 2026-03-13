import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset05 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new CircleSynthObject({
      startTime,
      bpm,
      presetIndex: 4,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.2,
      params: {
        attackTime: 0.02,
        decayTime: 0.14,
        sustainLevel: 0.9,
        releaseTime: 0.22,
        lfoType: "sine",
        lfoRate: 3,
        lfoDepth: 0.04,
        colorParams: { paletteColor: "GREEN" },
      },
      movement: {
        angle: Math.PI * 0.5,
        distance: p.height * 0.8,
        easing: "easeOutQuad",
      },
    }),
  ];
};
