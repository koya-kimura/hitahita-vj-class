import p5 from "p5";
import { CircleSynthObject, PolygonSynthObject, RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";
import type { RoleColorKey } from "../../../utils/color/colorPalette";

const CORE_ROLES: RoleColorKey[] = ["base", "main", "sub1", "accent1", "accent2"];

export const preset16 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const unit = Math.min(p.width, p.height);
  const triggerSeed = Math.floor(startTime * 0.01);
  const count = 12;

  for (let i = 0; i < count; i++) {
    const t = count <= 1 ? 0 : i / (count - 1);
    const x = p.width * (0.08 + 0.84 * t);
    const y = p.height * (0.2 + (Math.sin(triggerSeed * 0.17 + i * 1.3) * 0.5 + 0.5) * 0.6);
    const roleColor = CORE_ROLES[(triggerSeed + i) % CORE_ROLES.length];
    const movementAngle = (Math.sin(triggerSeed * 0.27 + i * 0.71) * 0.5 + 0.5) * p.TWO_PI;

    if (i % 3 === 0) {
      objects.push(
        new RectSynthObject({
          startTime,
          bpm,
          presetIndex: 15,
          x,
          y,
          size: unit * 0.05,
          rect: {
            stretchMode: "horizontal",
            aspectRatio: 4.0,
          },
          params: {
            attackTime: 0.06,
            decayTime: 0.24,
            sustainLevel: 0.72,
            releaseTime: 0.56,
            lfoType: "triangle",
            lfoRate: 0.8 + i * 0.1,
            lfoDepth: 0.1,
            colorParams: { roleColor },
          },
          movement: {
            angle: movementAngle,
            distance: unit * 0.5,
            easing: "easeInOutExpo",
          },
        }),
      );
      continue;
    }

    if (i % 3 === 1) {
      objects.push(
        new CircleSynthObject({
          startTime,
          bpm,
          presetIndex: 15,
          x,
          y,
          size: unit * 0.04,
          ellipse: { aspectRatio: 1.9 },
          params: {
            attackTime: 0.05,
            decayTime: 0.22,
            sustainLevel: 0.7,
            releaseTime: 0.5,
            lfoType: "sine",
            lfoRate: 1.0 + i * 0.12,
            lfoDepth: 0.08,
            colorParams: { roleColor },
          },
          movement: {
            angle: movementAngle,
            distance: unit * 0.44,
            easing: "easeInOutExpo",
          },
          style: {
            mode: "stroke",
            strokeWeight: 4,
          },
        }),
      );
      continue;
    }

    objects.push(
      new PolygonSynthObject({
        startTime,
        bpm,
        presetIndex: 15,
        x,
        y,
        size: unit * 0.045,
        angle: movementAngle * 0.4,
        polygon: {
          sides: 5,
          irregularity: 0.22,
          spikiness: 0.34,
          vertexLFO: true,
          vertexLFORate: 1.3,
          vertexLFODepth: 0.11,
        },
        params: {
          attackTime: 0.05,
          decayTime: 0.2,
          sustainLevel: 0.68,
          releaseTime: 0.52,
          lfoType: "triangle",
          lfoRate: 0.9 + i * 0.08,
          lfoDepth: 0.08,
          colorParams: { roleColor },
        },
        movement: {
          angle: movementAngle,
          distance: unit * 0.48,
          easing: "easeInOutExpo",
        },
      }),
    );
  }

  return objects;
};
