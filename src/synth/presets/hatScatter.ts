import p5 from "p5";
import { CircleSynthObject } from "../circleSynthObject";
import type { BaseSynthObject } from "../object";
import { UniformRandom } from "../../utils/math/uniformRandom";

export const hatScatter = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const objects: BaseSynthObject[] = [];
  const count = 42;

  for (let i = 0; i < count; i++) {
    objects.push(
      new CircleSynthObject({
        startTime,
        bpm,
        x: p.width * UniformRandom.rand(i * 13, startTime),
        y: p.height * UniformRandom.rand(i * 19, startTime),
        size: Math.min(p.width, p.height) * (0.008 + UniformRandom.rand(i * 41, startTime) * 0.02),
        params: {
          attackTime: 0.01,
          decayTime: 0.06,
          sustainLevel: 0.55,
          releaseTime: 0.08,
          colorParams: { paletteColor: "YELLOW" },
        },
      }),
    );
  }

  return objects;
};
