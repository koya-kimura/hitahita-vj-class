import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";
import type { RoleColorKey } from "../../../utils/color/colorPalette";

const TRANSITION_ROLES: RoleColorKey[] = ["main", "accent2", "sub1", "accent1"];

export const preset15 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const bandThickness = Math.min(p.width, p.height) * 0.06;
  const lanes = 4;

  for (let i = 0; i < lanes; i++) {
    const fromLeft = i % 2 === 0;
    const y = p.height * (0.2 + i * 0.2);
    const x = fromLeft ? -p.width * 0.18 : p.width * 1.18;
    const roleColor = TRANSITION_ROLES[i % TRANSITION_ROLES.length];

    objects.push(
      new RectSynthObject({
        startTime,
        bpm,
        presetIndex: 14,
        x,
        y,
        size: bandThickness,
        rect: {
          stretchMode: "horizontal",
          aspectRatio: p.width / bandThickness,
        },
        params: {
          attackTime: 0.04,
          decayTime: 0.72,
          sustainLevel: 0.86,
          releaseTime: 1.0,
          lfoType: "sine",
          lfoRate: 0.6 + i * 0.12,
          lfoDepth: 0.08,
          colorParams: { roleColor },
        },
        movement: {
          angle: fromLeft ? 0 : Math.PI,
          distance: p.width * 1.45,
          easing: "easeOutExpo",
        },
        style: {
          mode: "fill",
        },
      }),
    );
  }

  return objects;
};
