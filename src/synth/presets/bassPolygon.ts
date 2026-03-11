import p5 from "p5";
import { PolygonSynthObject } from "../polygonSynthObject";
import type { BaseSynthObject } from "../object";

export const bassPolygon = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new PolygonSynthObject({
      startTime,
      bpm,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.22,
      polygon: {
        sides: 6,
        irregularity: 0.15,
        spikiness: 0.4,
        vertexLFO: true,
        vertexLFORate: 2,
        vertexLFODepth: 0.18,
      },
      params: {
        attackTime: 0.03,
        decayTime: 0.2,
        sustainLevel: 0.8,
        releaseTime: 0.32,
        lfoType: "triangle",
        lfoRate: 1,
        lfoDepth: 0.1,
        colorParams: { paletteColor: "BLUE" },
      },
      style: {
        mode: "stroke",
        strokeWeight: 3,
      },
    }),
  ];
};
