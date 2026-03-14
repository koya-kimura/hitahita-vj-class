import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";
import type { RoleColorKey } from "../../../utils/color/colorPalette";

const CORE_ROLES: RoleColorKey[] = ["base", "main", "sub1", "accent1", "accent2"];

export const preset09 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const cols = 3 + (Math.floor(Math.abs(Math.sin(startTime * 0.0017)) * 1000) % 3); // 3..5
  const rows = 3 + (Math.floor(Math.abs(Math.cos(startTime * 0.0013)) * 1000) % 3); // 3..5
  const step = Math.min(p.width / 6, p.height / 6);
  const originX = p.width * 0.5 - ((cols - 1) * step) / 2;
  const originY = p.height * 0.5 - ((rows - 1) * step) / 2;
  const size = Math.min(p.width, p.height) * 0.06;

  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const x = originX + cx * step;
      const y = originY + cy * step;
      const seed = startTime * 0.002 + cx * 7.31 + cy * 11.17;
      const colorSeed = startTime * 0.0041 + cx * 17.23 + cy * 29.41;
      const angle = (Math.sin(seed) * 0.5 + 0.5) * p.TWO_PI;
      const distance = step * (0.12 + (Math.cos(seed * 1.9) * 0.5 + 0.5) * 0.22);
      const colorIndex = Math.floor((Math.sin(colorSeed) * 0.5 + 0.5) * CORE_ROLES.length) % CORE_ROLES.length;
      const roleColor = CORE_ROLES[colorIndex];

      objects.push(
        new CircleSynthObject({
          startTime,
          bpm,
          presetIndex: 8,
          x,
          y,
          size,
          params: {
            attackTime: 0.03,
            decayTime: 0.32,
            sustainLevel: 0.75,
            releaseTime: 0.22,
            lfoType: "sine",
            lfoRate: 1.0 + (cx + cy) * 0.08,
            lfoDepth: 0.06,
            colorParams: { roleColor },
          },
          movement: {
            angle,
            distance,
            easing: "easeInOutSine",
          },
        }),
      );
    }
  }

  return objects;
};
