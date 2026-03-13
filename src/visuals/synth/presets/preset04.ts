import p5 from "p5";
import { PolygonSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset04 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  return [
    new PolygonSynthObject({
      startTime,
      bpm,
      presetIndex: 3,
      x: p.width * 0.5,
      y: p.height * 0.5,
      size: Math.min(p.width, p.height) * 0.22,
      angle: Math.PI * 0.1,
      polygon: {
        sides: 6,
        irregularity: 0.25,
        spikiness: 0.45,
        vertexLFO: true,
        vertexLFORate: 1.5,
        vertexLFODepth: 0.1,
      },
      params: {
        attackTime: 0.05,
        decayTime: 0.16,
        sustainLevel: 0.7,
        releaseTime: 0.25,
        lfoType: "triangle",
        lfoRate: 1.2,
        lfoDepth: 0.06,
        colorParams: { paletteColor: "LIGHT_BLUE" },
      },
      movement: {
        angle: 0,
        distance: p.width * 0.22,
        easing: "easeOutCubic",
      },
      style: {
        mode: "stroke",
        strokeWeight: 3,
      },
    }),
  ];
};
