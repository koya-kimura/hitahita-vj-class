import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset12 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const base = Math.min(p.width, p.height) * 0.12;
  return [
    new RectSynthObject({
      startTime,
      bpm,
      presetIndex: 11,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: base,
      angle: -Math.PI * 0.15,
      rect: { stretchMode: "horizontal", aspectRatio: 4.2 },
      params: {
        attackTime: 0.02,
        decayTime: 0.1,
        sustainLevel: 0.65,
        releaseTime: 0.2,
        lfoType: "saw",
        lfoRate: 3.2,
        lfoDepth: 0.03,
        colorParams: { paletteColor: "PINK" },
      },
      movement: {
        angle: Math.PI,
        distance: p.width,
        easing: "easeInOutQuad",
      },
      style: {
        mode: "stroke",
        strokeWeight: 2,
      },
    }),
  ];
};
