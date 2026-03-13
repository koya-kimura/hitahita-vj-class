import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset08 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new CircleSynthObject({
      startTime,
      bpm,
      presetIndex: 7,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.18,
      ellipse: { aspectRatio: 1.7 },
      params: {
        attackTime: 0.04,
        decayTime: 0.2,
        sustainLevel: 0.65,
        releaseTime: 0.28,
        lfoType: "sine",
        lfoRate: 1.2,
        lfoDepth: 0.12,
        colorParams: { paletteColor: "RED_PURPLE" },
      },
      movement: {
        angle: -Math.PI * 0.25,
        distance: p.width * 0.42,
        easing: "easeInOutSine",
      },
    }),
  ];
};
