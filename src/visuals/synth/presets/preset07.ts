import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset07 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const count = 5 + (Math.floor(Math.abs(Math.sin(startTime * 0.0013)) * 1000) % 6);

  for (let i = 0; i < count; i++) {
    const seed = startTime * 0.0007 + i * 3.17;
    const sx = (Math.sin(seed * 1.7) * 0.5 + 0.5) * p.width;
    const sy = (Math.cos(seed * 2.1) * 0.5 + 0.5) * p.height;
    const tx = (Math.sin(seed * 2.9 + 1.2) * 0.5 + 0.5) * p.width;
    const ty = (Math.cos(seed * 3.4 + 0.6) * 0.5 + 0.5) * p.height;

    const dx = tx - sx;
    const dy = ty - sy;
    const distance = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    objects.push(
      new RectSynthObject({
        startTime,
        bpm,
        presetIndex: 6,
        x: sx,
        y: sy,
        size: Math.min(p.width, p.height) * 0.05,
        angle,
        params: {
          attackTime: 0.02,
          decayTime: 0.34,
          sustainLevel: 0.75,
          releaseTime: 0.22,
          lfoType: "sine",
          lfoRate: 1.4 + i * 0.12,
          lfoDepth: 0.12,
          colorParams: { roleColor: i % 2 === 0 ? "accent2" : "sub1" },
        },
        movement: {
          angle,
          distance,
          easing: "easeOutQuad",
        },
        rect: {
          stretchMode: "horizontal",
          aspectRatio: 8.0,
        },
      }),
    );
  }

  return objects;
};
