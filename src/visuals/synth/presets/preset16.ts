import p5 from "p5";
import { PolygonSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset16 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new PolygonSynthObject({
      startTime,
      bpm,
      presetIndex: 15,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.24,
      angle: Math.PI * 0.05,
      polygon: {
        sides: 4,
        irregularity: 0.12,
        spikiness: 0.12,
        vertexLFO: true,
        vertexLFORate: 0.9,
        vertexLFODepth: 0.08,
      },
      params: {
        attackTime: 0.05,
        decayTime: 0.2,
        sustainLevel: 0.7,
        releaseTime: 0.3,
        lfoType: "sine",
        lfoRate: 1.4,
        lfoDepth: 0.06,
        colorParams: { paletteColor: "BLUE" },
      },
      movement: {
        angle: Math.PI * 0.5,
        distance: p.height * 0.25,
        easing: "easeInOutSine",
      },
      style: {
        mode: "fill",
      },
    }),
  ];
};
