import p5 from "p5";
import { PolygonSynthObject } from "../polygonSynthObject";
import type { BaseSynthObject } from "../object";
import { UniformRandom } from "../../utils/math/uniformRandom";

export const fxBurst = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const count = 120;

  for (let i = 0; i < count; i++) {
    const angle = UniformRandom.rand(i * 57, startTime) * Math.PI * 2;
    objects.push(
      new PolygonSynthObject({
        startTime,
        bpm,
        x: p.width * 0.5,
        y: p.height * 0.5,
        size: Math.min(p.width, p.height) * (0.01 + UniformRandom.rand(i * 71, startTime) * 0.02),
        polygon: {
          sides: 5,
          irregularity: 0.25,
          spikiness: 0.6,
        },
        params: {
          attackTime: 0.02,
          decayTime: 0.2,
          sustainLevel: 0.6,
          releaseTime: 0.4,
          lfoType: "saw",
          lfoRate: 3,
          lfoDepth: 0.16,
          colorParams: { paletteColor: "LIGHT_BLUE" },
        },
        movement: {
          angle,
          distance: p.width * (0.12 + UniformRandom.rand(i * 97, startTime) * 0.2),
          angleLFO: true,
          angleLFORate: 2,
          angleLFODepth: 0.15,
          easing: "easeOutCubic",
        },
      }),
    );
  }

  return objects;
};
