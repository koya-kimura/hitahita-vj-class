import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset15 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const h = p.height * 0.08;
  return [
    new RectSynthObject({
      startTime,
      bpm,
      presetIndex: 14,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: h,
      rect: {
        stretchMode: "vertical",
        aspectRatio: p.width / h,
      },
      params: {
        attackTime: 0.02,
        decayTime: 0.12,
        sustainLevel: 0.85,
        releaseTime: 0.18,
        lfoType: "square",
        lfoRate: 0.8,
        lfoDepth: 0.6,
        colorParams: { paletteColor: "BROWN" },
      },
      movement: {
        angle: -Math.PI * 0.5,
        distance: p.height * 0.6,
        easing: "easeInOutSine",
      },
    }),
  ];
};
