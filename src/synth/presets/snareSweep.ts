import p5 from "p5";
import { RectSynthObject } from "../rectSynthObject";
import type { BaseSynthObject } from "../object";

export const snareSweep = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new RectSynthObject({
      startTime,
      bpm,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.35,
      angle: Math.PI * 0.125,
      rect: { stretchMode: "horizontal", aspectRatio: 2.6 },
      params: {
        attackTime: 0.01,
        decayTime: 0.1,
        sustainLevel: 0.8,
        releaseTime: 0.2,
        colorParams: { paletteColor: "ORANGE" },
      },
      style: {
        mode: "stroke",
        strokeWeight: 4,
      },
    }),
  ];
};
