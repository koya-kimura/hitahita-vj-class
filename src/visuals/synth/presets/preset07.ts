import p5 from "p5";
import { PolygonSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset07 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new PolygonSynthObject({
      startTime,
      bpm,
      presetIndex: 6,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.3,
      polygon: {
        sides: 8,
        irregularity: 0.05,
        spikiness: 0.2,
        vertexLFO: true,
        vertexLFORate: 2.2,
        vertexLFODepth: 0.12,
      },
      params: {
        attackTime: 0.02,
        decayTime: 0.1,
        sustainLevel: 0.7,
        releaseTime: 0.2,
        lfoType: "saw",
        lfoRate: 2,
        lfoDepth: 0.08,
        colorParams: { paletteColor: "PINK" },
      },
      style: {
        mode: "stroke",
        strokeWeight: 2,
      },
    }),
  ];
};
