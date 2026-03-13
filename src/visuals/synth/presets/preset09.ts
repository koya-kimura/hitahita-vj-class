import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset09 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const unit = Math.min(p.width, p.height) * 0.16;
  return [
    new RectSynthObject({
      startTime,
      bpm,
      presetIndex: 8,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: unit,
      angle: Math.PI * 0.25,
      rect: { stretchMode: "uniform", aspectRatio: 1.8 },
      params: {
        attackTime: 0.02,
        decayTime: 0.14,
        sustainLevel: 0.75,
        releaseTime: 0.2,
        lfoType: "square",
        lfoRate: 1,
        lfoDepth: 0.04,
        colorParams: { paletteColor: "ORANGE" },
      },
      movement: {
        angle: Math.PI * 0.25,
        distance: Math.min(p.width, p.height) * 0.7,
        easing: "easeOutCubic",
      },
      style: { mode: "stroke", strokeWeight: 3 },
    }),
  ];
};
