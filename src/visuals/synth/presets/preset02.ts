import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset02 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new CircleSynthObject({
      startTime,
      bpm,
      presetIndex: 1,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.38,
      params: {
        attackTime: 0.01,
        decayTime: 0.2,
        sustainLevel: 0.2,
        releaseTime: 0.42,
        lfoType: "sine",
        lfoRate: 1.0,
        lfoDepth: 0.03,
        colorParams: { roleColor: "accent1" },
      },
      style: {
        mode: "stroke",
        strokeWeight: 7,
      },
    }),
  ];
};
