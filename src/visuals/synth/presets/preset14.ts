import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";
import type { RoleColorKey } from "../../../utils/color/colorPalette";

const CORE_ROLES: RoleColorKey[] = ["base", "main", "sub1", "accent1", "accent2"];

export const preset14 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const unit = Math.min(p.width, p.height);
  const cx = p.width * 0.5;
  const cy = p.height * 0.5;
  const layers = 6;
  const objects: BaseSynthObject[] = [];

  for (let i = 0; i < layers; i++) {
    const phaseSeed = startTime * 0.0017 + i * 0.83;
    const roleColor = CORE_ROLES[(i + 3) % CORE_ROLES.length];
    objects.push(
      new CircleSynthObject({
        startTime: startTime - i * 42,
        bpm,
        presetIndex: 13,
        x: cx + Math.cos(phaseSeed) * unit * 0.03,
        y: cy + Math.sin(phaseSeed * 1.2) * unit * 0.03,
        size: unit * (0.26 + i * 0.05),
        params: {
          attackTime: 0.015,
          decayTime: 0.85,
          sustainLevel: 0.82,
          releaseTime: 0.55,
          lfoType: "sine",
          lfoRate: 1.9 + i * 0.28,
          lfoDepth: 0.28,
          colorParams: { roleColor },
        },
        style: {
          mode: "stroke",
          strokeWeight: 2 + i * 0.8,
        },
      }),
    );
  }

  return objects;
};
