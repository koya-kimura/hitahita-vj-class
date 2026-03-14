import type { ImageDrawer } from "./types";

export const drawImage10: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const img = layer.getImageByKey("glass");
  if (!img) return;

  const size = Math.min(tex.width, tex.height) * 0.46;

  tex.push();
  tex.imageMode(p.CENTER);

  tex.push();
  tex.translate(tex.width/2, tex.height*0.3);
  tex.rotate(Math.PI)
  tex.image(img, 0, 0, size, size);
  tex.pop();

  tex.push();
  tex.translate(tex.width/2, tex.height*0.7);
  tex.image(img, 0, 0, size, size);
  tex.pop();
  tex.pop();
};
