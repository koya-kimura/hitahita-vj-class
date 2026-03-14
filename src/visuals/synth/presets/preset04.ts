import p5 from "p5";
import { CircleSynthObject } from "../object";
import type { BaseSynthObject } from "../object";

export const preset04 = (p: p5, bpm: number, startTime: number): BaseSynthObject[] => {
  const theta = ((Math.cos(startTime * 0.0019) + 1) * 0.5) * p.TWO_PI;
  const radius = Math.min(p.width, p.height) * 0.32;

  return [
    new CircleSynthObject({
      startTime,
      bpm,
      presetIndex: 3,
      x: p.width * 0.5 + Math.cos(theta) * radius,
      y: p.height * 0.5 + Math.sin(theta) * radius,
      size: Math.min(p.width, p.height) * 0.16,
      params: {
        attackTime: 0.03,
        decayTime: 0.28,
        sustainLevel: 0.72,
        releaseTime: 0.22,
        lfoType: "sine",
        lfoRate: 0.9,
        lfoDepth: 0.05,
        colorParams: { roleColor: "accent1" },
      },
      movement: {
        // 角度方向へ少し進める（時計回りのグルーブ移動）
        angle: theta + Math.PI * 0.5,
        distance: radius * 0.42,
        easing: "easeOutSine",
      },
    }),
  ];
};
