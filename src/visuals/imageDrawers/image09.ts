import type { ImageDrawer } from "./types";

export const drawImage09: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("flower2");
  if (!img) return;

  const count = 10;
  const radius = Math.min(tex.width, tex.height) * 0.26;
  const size = Math.min(tex.width, tex.height) * 0.3;

  tex.push();
  tex.imageMode(p.CENTER);
  tex.translate(tex.width * 0.5, tex.height * 0.5);
  tex.rotate(beat * 0.08);
  for (let i = 0; i < count; i++) {
    const angle = (p.TWO_PI * i) / count;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    tex.push();
    tex.translate(x, y);
    tex.rotate(-beat * 0.18 + i * 0.2);
    tex.image(img, 0, 0, size, size);
    tex.pop();
  }
  tex.pop();
};
