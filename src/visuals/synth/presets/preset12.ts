import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";
import type { RoleColorKey } from "../../../utils/color/colorPalette";

const CORE_ROLES: RoleColorKey[] = ["base", "main", "sub1", "accent1", "accent2"];

export const preset12 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const cols = 10;
  const rows = 6;
  const cellW = p.width / cols;
  const cellH = p.height / rows;
  const cx = p.width * 0.5;
  const cy = p.height * 0.5;
  const triggerColorSeed = Math.floor(startTime * 0.01);

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const x = (gx + 0.5) * cellW;
      const y = (gy + 0.5) * cellH;
      const dx = x - cx;
      const dy = y - cy;
      const r = Math.hypot(dx, dy);
      const a = Math.atan2(dy, dx);
      const colorSeed = triggerColorSeed * 0.73 + gx * 2.13 + gy * 3.71;
      const colorIndex = Math.floor((Math.sin(colorSeed) * 0.5 + 0.5) * CORE_ROLES.length) % CORE_ROLES.length;
      const roleColor = CORE_ROLES[colorIndex];

      // 中心に近すぎるセルは抜いて螺旋感を作る
      if (r < Math.min(cellW, cellH) * 0.7) {
        continue;
      }

      objects.push(
        new CircleSynthObject({
          startTime,
          bpm,
          presetIndex: 11,
          x,
          y,
          size: Math.min(cellW, cellH) * 0.34,
          params: {
            attackTime: 0.03,
            decayTime: 0.34,
            sustainLevel: 0.7,
            releaseTime: 0.24,
            lfoType: "sine",
            lfoRate: 1.2 + (r / Math.max(p.width, p.height)) * 2.2,
            lfoDepth: 0.1,
            colorParams: { roleColor },
          },
          movement: {
            // 半径方向ではなく接線方向へ少し流し、渦の印象を作る
            angle: a + Math.PI * 0.5,
            distance: Math.min(cellW, cellH) * 0.9,
            easing: "easeInOutSine",
          },
        }),
      );
    }
  }

  return objects;
};
