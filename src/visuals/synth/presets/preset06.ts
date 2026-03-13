import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset06 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const base = Math.min(p.width, p.height) * 0.14;
  return [
    new RectSynthObject({
      startTime,
      bpm,
      presetIndex: 5,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: base,
      rect: { stretchMode: "horizontal", aspectRatio: 3.4 },
      params: {
        attackTime: 0.03,
        decayTime: 0.18,
        sustainLevel: 0.8,
        releaseTime: 0.22,
        lfoType: "triangle",
        lfoRate: 1.6,
        lfoDepth: 0.06,
        colorParams: { paletteColor: "YELLOW" },
      },
      movement: {
        angle: 0,
        distance: p.width,
        easing: "easeInOutQuad",
      },
      style: { mode: "stroke", strokeWeight: 3 },
    }),
  ];
};
