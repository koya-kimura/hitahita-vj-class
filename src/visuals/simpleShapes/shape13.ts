import { strokeRole } from "./palette";
import type { SimpleShapeDrawer } from "./types";

export const drawShape13: SimpleShapeDrawer = (context) => {
  const { p, tex, beat } = context;
  const cx = tex.width * 0.5;
  const cy = tex.height * 0.5;
  const ringCount = 56;
  const speed = 0.003;
  const travel = (beat * speed) % 1;

  tex.push();
  tex.noFill();

  // 中心をわずかに揺らして、固定的すぎる見え方を避ける。
  const wobbleX = Math.sin(beat * 0.35) * tex.width * 0.03;
  const wobbleY = Math.cos(beat * 0.27) * tex.height * 0.02;
  tex.translate(cx + wobbleX, cy + wobbleY);

  for (let i = 0; i < ringCount; i++) {
    let z = i / ringCount - travel;
    if (z < 0) {
      z += 1;
    }

    // z=0 が手前、z=1 が奥。手前ほど急激に大きくなる透視を作る。
    const depth = 1 - z;
    const perspective = Math.pow(depth, 2.2);

    const w = p.lerp(tex.width * 0.05, tex.width * 1.45, perspective);
    const h = p.lerp(tex.height * 0.04, tex.height * 1.25, perspective);
    const alpha = p.lerp(20, 220, perspective);
    const sw = p.lerp(0.8, 3.8, perspective);

    const ringBeat = beat * 0.8 + i * 0.09;
    const roll = Math.sin(ringBeat) * 0.14 + Math.cos(ringBeat * 0.7) * 0.06;

    tex.push();
    tex.rotate(roll);
    tex.strokeWeight(sw);
    strokeRole(tex, i % 5 === 0 ? "accent1" : "accent2", alpha);
    tex.rectMode(p.CENTER);
    tex.rect(0, 0, w, h);
    tex.pop();

    // 奥行き方向の流れを補強する補助線。
    if (i % 8 === 0) {
      tex.strokeWeight(Math.max(0.6, sw * 0.35));
      strokeRole(tex, "main", alpha * 0.45);
      tex.line(0, 0, Math.cos(roll) * w * 0.5, Math.sin(roll) * h * 0.5);
      tex.line(0, 0, -Math.cos(roll) * w * 0.5, -Math.sin(roll) * h * 0.5);
    }
  }

  tex.pop();
};
