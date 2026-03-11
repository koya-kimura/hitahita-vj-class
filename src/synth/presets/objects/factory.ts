import p5 from "p5";
import type { BaseSynthObject } from "../../object";
import { CircleSynthObject } from "../../circleSynthObject";
import { PolygonSynthObject } from "../../polygonSynthObject";
import { RectSynthObject } from "../../rectSynthObject";
import type { SynthColorKey } from "../../../utils/color/colorPalette";

const SLOT_COLORS: SynthColorKey[] = [
  "LIGHT_BLUE",
  "BLUE",
  "GREEN",
  "RED",
  "YELLOW",
  "PINK",
  "RED_PURPLE",
  "ORANGE",
  "LIGHT_BLUE",
  "GREEN",
  "BLUE",
  "PINK",
  "RED",
  "YELLOW",
  "PURPLE",
  "BROWN",
];

export const createSynthObject = (
  slot: number,
  p: p5,
  bpm: number,
  startTime: number,
): BaseSynthObject[] => {
  const centerX = p.width * 0.5;
  const centerY = p.height * 0.5;
  const minSide = Math.min(p.width, p.height);
  const paletteColor = SLOT_COLORS[slot % SLOT_COLORS.length];

  if (slot % 3 === 0) {
    return [
      new CircleSynthObject({
        startTime,
        bpm,
        x: centerX,
        y: centerY,
        size: minSide * (0.12 + slot * 0.008),
        params: {
          attackTime: 0.02,
          decayTime: 0.12,
          sustainLevel: 0.8,
          releaseTime: 0.22,
          lfoType: "sine",
          lfoRate: 1 + (slot % 4),
          lfoDepth: 0.08,
          colorParams: { paletteColor },
        },
      }),
    ];
  }

  if (slot % 3 === 1) {
    return [
      new RectSynthObject({
        startTime,
        bpm,
        x: centerX,
        y: centerY,
        angle: (Math.PI / 16) * slot,
        size: minSide * (0.1 + slot * 0.006),
        rect: { stretchMode: "horizontal", aspectRatio: 1.6 + (slot % 5) * 0.25 },
        params: {
          attackTime: 0.01,
          decayTime: 0.08,
          sustainLevel: 0.75,
          releaseTime: 0.18,
          lfoType: "triangle",
          lfoRate: 2 + (slot % 3),
          lfoDepth: 0.06,
          colorParams: { paletteColor },
        },
        style: { mode: "stroke", strokeWeight: 2 + (slot % 4) },
      }),
    ];
  }

  return [
    new PolygonSynthObject({
      startTime,
      bpm,
      x: centerX,
      y: centerY,
      angle: (Math.PI / 24) * slot,
      size: minSide * (0.09 + slot * 0.005),
      polygon: {
        sides: 3 + (slot % 6),
        irregularity: 0.1 + (slot % 4) * 0.08,
        spikiness: 0.25 + (slot % 5) * 0.1,
        vertexLFO: true,
        vertexLFORate: 1 + (slot % 4),
        vertexLFODepth: 0.08,
      },
      params: {
        attackTime: 0.02,
        decayTime: 0.1,
        sustainLevel: 0.7,
        releaseTime: 0.2,
        lfoType: "saw",
        lfoRate: 1 + (slot % 5),
        lfoDepth: 0.05,
        colorParams: { paletteColor },
      },
      style: { mode: slot % 2 === 0 ? "fill" : "stroke", strokeWeight: 2 },
    }),
  ];
};
