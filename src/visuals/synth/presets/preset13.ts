import p5 from "p5";
import { CircleSynthObject, PolygonSynthObject } from "../object";
import type { BaseSynthObject } from "../object";
import type { RoleColorKey } from "../../../utils/color/colorPalette";

const CORE_ROLES: RoleColorKey[] = ["base", "main", "sub1", "accent1", "accent2"];

export const preset13 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const cx = p.width * 0.5;
  const cy = p.height * 0.5;
  const unit = Math.min(p.width, p.height);
  const ringCount = 8;

  for (let i = 0; i < ringCount; i++) {
    const seed = startTime * 0.0013 + i * 1.91;
    const roleColor = CORE_ROLES[i % CORE_ROLES.length];
    const baseX = cx + Math.cos(seed * 1.3) * unit * 0.22;
    const baseY = cy + Math.sin(seed * 1.7) * unit * 0.18;

    objects.push(
      new CircleSynthObject({
        startTime,
        bpm,
        presetIndex: 12,
        x: baseX,
        y: baseY,
        size: unit * (0.075 + i * 0.034),
        params: {
          attackTime: 0.02,
          decayTime: 0.3,
          sustainLevel: 0.78,
          releaseTime: 0.34 + i * 0.08,
          lfoType: "triangle",
          lfoRate: 0.7 + i * 0.16,
          lfoDepth: 0.03,
          colorParams: { roleColor },
        },
        movement: {
          angle: (Math.sin(seed) * 0.5 + 0.5) * p.TWO_PI,
          distance: unit * (0.22 + i * 0.07),
          easing: "easeOutSine",
        },
        style: {
          mode: "fill",
        },
      }),
    );
  }

  objects.push(
    new PolygonSynthObject({
      startTime,
      bpm,
      presetIndex: 12,
      x: cx,
      y: cy,
      size: unit * 0.08,
      angle: startTime * 0.0007,
      polygon: {
        sides: 6,
        irregularity: 0.12,
        spikiness: 0.2,
        vertexLFO: true,
        vertexLFORate: 1.3,
        vertexLFODepth: 0.1,
      },
      params: {
        attackTime: 0.015,
        decayTime: 0.2,
        sustainLevel: 0.66,
        releaseTime: 0.44,
        lfoType: "sine",
        lfoRate: 1.0,
        lfoDepth: 0.06,
        colorParams: { roleColor: "accent1" },
      },
      style: {
        mode: "fill",
      },
    }),
  );

  return objects;
};
