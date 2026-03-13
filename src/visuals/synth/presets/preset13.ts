import p5 from "p5";
import { PolygonSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset13 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new PolygonSynthObject({
      startTime,
      bpm,
      presetIndex: 12,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.18,
      angle: -Math.PI * 0.2,
      polygon: {
        sides: 7,
        irregularity: 0.18,
        spikiness: 0.3,
        vertexLFO: true,
        vertexLFORate: 1.1,
        vertexLFODepth: 0.11,
      },
      params: {
        attackTime: 0.03,
        decayTime: 0.14,
        sustainLevel: 0.72,
        releaseTime: 0.24,
        lfoType: "triangle",
        lfoRate: 1.1,
        lfoDepth: 0.05,
        colorParams: { paletteColor: "YELLOW" },
      },
      movement: {
        angle: Math.PI * 0.75,
        distance: Math.min(p.width, p.height) * 0.5,
        easing: "easeOutBack",
      },
      style: { mode: "stroke", strokeWeight: 3 },
    }),
  ];
};
