import type { ImageDrawer } from "./types";

export const drawImage15: ImageDrawer = (layer, p, tex, beat, _nowMs) => {
  const logo = layer.getImageByKey("kimuraLogo");
  if (!logo) return;

  tex.push();
  tex.imageMode(p.CENTER);
  tex.translate(tex.width * 0.5, tex.height * 0.5);
  tex.scale(0.25);
  tex.image(logo, 0, 0);
  tex.pop();
};
