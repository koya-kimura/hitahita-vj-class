import p5 from "p5";
import { PolygonSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset10 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new PolygonSynthObject({
      startTime,
      bpm,
      presetIndex: 9,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.26,
      angle: Math.PI * 0.33,
      polygon: {
        sides: 5,
        irregularity: 0.35,
        spikiness: 0.55,
        vertexLFO: true,
        vertexLFORate: 3,
        vertexLFODepth: 0.07,
      },
      params: {
        attackTime: 0.03,
        decayTime: 0.12,
        sustainLevel: 0.78,
        releaseTime: 0.24,
        lfoType: "triangle",
        lfoRate: 1.8,
        lfoDepth: 0.04,
        colorParams: { paletteColor: "LIGHT_BLUE" },
      },
      style: {
        mode: "fill",
      },
    }),
  ];
};
