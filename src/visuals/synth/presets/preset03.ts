import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset03 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const theta = ((Math.sin(startTime * 0.0017) + 1) * 0.5) * p.TWO_PI;
  const radius = Math.min(p.width, p.height) * 0.38;

  return [
    new CircleSynthObject({
      startTime,
      bpm,
      presetIndex: 2,
      x: p.width * 0.5 + Math.cos(theta) * radius,
      y: p.height * 0.5 + Math.sin(theta) * radius,
      size: Math.min(p.width, p.height) * 0.18,
      params: {
        attackTime: 0.02,
        decayTime: 0.24,
        sustainLevel: 0.7,
        releaseTime: 0.22,
        lfoType: "sine",
        lfoRate: 0.7,
        lfoDepth: 0.04,
        colorParams: { roleColor: "main" },
      },
      movement: {
        angle: theta + Math.PI,
        distance: radius * 0.95,
        easing: "easeOutQuad",
      },
    }),
  ];
};
