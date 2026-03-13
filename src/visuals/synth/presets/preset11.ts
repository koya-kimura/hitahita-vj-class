import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset11 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new CircleSynthObject({
      startTime,
      bpm,
      presetIndex: 10,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.16,
      params: {
        attackTime: 0.04,
        decayTime: 0.16,
        sustainLevel: 0.8,
        releaseTime: 0.22,
        lfoType: "noise",
        lfoRate: 2.5,
        lfoDepth: 0.07,
        colorParams: { paletteColor: "GREEN" },
      },
      movement: {
        angle: -Math.PI * 0.5,
        distance: p.height * 0.85,
        angleLFO: true,
        angleLFORate: 0.5,
        angleLFODepth: 0.25,
        easing: "easeOutQuad",
      },
    }),
  ];
};
