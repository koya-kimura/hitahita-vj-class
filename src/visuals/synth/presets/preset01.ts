import p5 from "p5";
import { RectSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset01 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const n = 10;
  for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * (p.width / n);
    const y = p.height * 0.5;
    const w = p.width / n;

    objects.push(
      new RectSynthObject({
        startTime,
        bpm,
        presetIndex: 0,
        x,
        y,
        size: w,
        angle: 0,
        params: {
          attackTime: 0.125,
          decayTime: 0.5,
          sustainLevel: 1.0,
          releaseTime: 0.125,
          lfoType: "sine",
          lfoRate: 0.5,
          lfoDepth: 1.5,
          colorParams: { paletteColor: "BLUE" },
        },
        movement: {
          angle: -Math.PI * 0.5,
          distance: p.height,
          easing: "easeOutQuad",
        },
        rect: {
          stretchMode: "vertical",
          aspectRatio: 1.0,
        },
      }),
    );
  }

  return objects;
};
