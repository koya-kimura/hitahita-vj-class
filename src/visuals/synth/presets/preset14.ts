import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset14 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new CircleSynthObject({
      startTime,
      bpm,
      presetIndex: 13,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.48,
      ellipse: { aspectRatio: 1 },
      params: {
        attackTime: 0.08,
        decayTime: 0.25,
        sustainLevel: 0.55,
        releaseTime: 0.35,
        lfoType: "sine",
        lfoRate: 0.75,
        lfoDepth: 0.1,
        colorParams: { paletteColor: "PURPLE" },
      },
      style: {
        mode: "stroke",
        strokeWeight: 5,
      },
    }),
  ];
};
