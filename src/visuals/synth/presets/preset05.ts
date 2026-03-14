import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset05 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const barHeight = Math.min(p.width, p.height) * 0.08;

  return [
    new RectSynthObject({
      startTime,
      bpm,
      presetIndex: 4,
      x: p.width * (0.5 + Math.sin(startTime * 0.0023) * 0.12),
      y: -barHeight,
      size: barHeight,
      params: {
        attackTime: 0.03,
        decayTime: 0.32,
        sustainLevel: 0.78,
        releaseTime: 0.24,
        lfoType: "sine",
        lfoRate: 1.1,
        lfoDepth: 0.08,
        colorParams: { roleColor: "main" },
      },
      movement: {
        angle: Math.PI * 0.5,
        distance: p.height * 1.2,
        easing: "easeOutQuad",
      },
      rect: {
        stretchMode: "horizontal",
        aspectRatio: p.width / barHeight,
      },
    }),
  ];
};
