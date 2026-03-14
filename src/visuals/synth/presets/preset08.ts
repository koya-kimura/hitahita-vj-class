import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset08 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const n = 5 + (Math.floor(Math.abs(Math.sin(startTime * 0.0021)) * 1000) % 16); // 5..20
  const baseY = p.height * 0.5;
  const step = p.width / n;
  const startsUp = Math.cos(startTime * 0.0037) > 0;

  for (let i = 0; i < n; i++) {
    const x = step * (i + 0.5);
    const direction = (i % 2 === 0) === startsUp ? -1 : 1;

    objects.push(
      new RectSynthObject({
        startTime,
        bpm,
        presetIndex: 7,
        x,
        y: baseY,
        size: Math.min(p.width, p.height) * 0.03,
        params: {
          attackTime: 0.03,
          decayTime: 0.3,
          sustainLevel: 0.78,
          releaseTime: 0.24,
          lfoType: "sine",
          lfoRate: 1.0 + i * 0.03,
          lfoDepth: 0.05,
          colorParams: { roleColor: "accent1" },
        },
        movement: {
          angle: direction > 0 ? Math.PI * 0.5 : -Math.PI * 0.5,
          distance: p.height * 0.18,
          easing: "easeInOutSine",
        },
        rect: {
          stretchMode: "horizontal",
          aspectRatio: 3.6,
        },
      }),
    );
  }

  return objects;
};
