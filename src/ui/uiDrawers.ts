import type { VisualRenderContext } from "../types/render";

export type UIDrawFunction = (context: VisualRenderContext) => void;

const BRAND = "HitaHita";

export const uiPattern0Empty: UIDrawFunction = (context): void => {
  const { p, tex, beat, font } = context;
  tex.push();
  tex.fill(255);
  tex.noStroke();
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(tex.width * 0.04);
  if (font) tex.textFont(font);
  const y = tex.height * (0.9 + Math.sin(beat * 0.8) * 0.02);
  tex.text(BRAND, tex.width * 0.5, y);
  tex.pop();
};

export const uiPattern1SideAndBottom: UIDrawFunction = (context): void => {
  const { p, tex, font } = context;
  const yMid = tex.height * 0.5;
  const size = tex.width * 0.05;

  tex.push();
  tex.fill(255);
  tex.noStroke();
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(size);
  if (font) tex.textFont(font);

  tex.text(BRAND, tex.width * 0.1, yMid);
  tex.text(BRAND, tex.width * 0.9, yMid);

  const yBottom = tex.height * 0.95;
  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    const x = tex.width * (0.12 + (0.88 - 0.12) * t);
    tex.text(BRAND, x, yBottom);
  }
  tex.pop();
};

export const uiPattern2RightBadge: UIDrawFunction = (context): void => {
  const { p, tex, beat, font } = context;
  const cx = tex.width * 0.88;
  const cy = tex.height * 0.5;
  const w = tex.width * 0.2;
  const h = tex.height * 0.1;
  const pulse = 1 + Math.sin(beat * Math.PI * 2) * 0.04;

  tex.push();
  tex.noFill();
  tex.stroke(255);
  tex.rectMode(p.CENTER);
  tex.rect(cx, cy, w * pulse, h * pulse, 8);
  tex.fill(255);
  tex.noStroke();
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(tex.width * 0.035);
  if (font) tex.textFont(font);
  tex.text(BRAND, cx, cy);
  tex.pop();
};

export const uiPattern3Hud: UIDrawFunction = (context): void => {
  const { p, tex, beat, font } = context;
  const margin = tex.width * 0.025;
  const boxX = tex.width * 0.025;
  const boxY = tex.height * 0.82;
  const boxW = tex.width * 0.95;
  const boxH = tex.height * 0.15;

  const dialogues = [
    "HitaHita... Syncing visuals.",
    "HitaHita... Beat locked.",
    "HitaHita... Overlay active.",
  ];
  const dialogue = dialogues[Math.floor(beat / 8) % dialogues.length];
  const count = Math.min(dialogue.length, Math.floor((beat % 16) * 8));
  const text = dialogue.slice(0, count);
  const cursor = Math.floor(beat * 4) % 2 === 0 ? "_" : "";

  tex.push();
  tex.noFill();
  tex.stroke(255);
  tex.rect(margin, margin, tex.width - margin * 2, tex.height - margin * 2);
  tex.rect(boxX, boxY, boxW, boxH);

  tex.fill(255);
  tex.noStroke();
  tex.textAlign(p.LEFT, p.TOP);
  tex.textSize(tex.width * 0.022);
  if (font) tex.textFont(font);
  tex.text(new Date().toLocaleTimeString(), margin * 1.4, margin * 1.2);

  tex.textAlign(p.RIGHT, p.TOP);
  tex.text("vs.HitaHita", tex.width - margin * 1.4, margin * 1.2);

  const gaugeW = tex.width * 0.16;
  const gaugeH = tex.height * 0.012;
  const gaugeX = tex.width - margin * 1.4 - gaugeW;
  const gaugeY = margin * 2.5;
  tex.noFill();
  tex.stroke(255);
  tex.rect(gaugeX, gaugeY, gaugeW, gaugeH);
  tex.noStroke();
  tex.fill(255);
  tex.rect(gaugeX, gaugeY, gaugeW * ((Math.sin(beat) + 1) * 0.5), gaugeH);

  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(tex.width * 0.03);
  tex.text(`${text}${cursor}`, tex.width * 0.5, boxY + boxH * 0.5);
  tex.pop();
};

export const uiPattern4Ring: UIDrawFunction = (context): void => {
  const { p, tex, beat, font } = context;
  const centers = [tex.width * 0.17, tex.width * 0.5, tex.width * 0.83];
  const chars = BRAND.split("");
  const count = chars.length * 2;
  const radius = Math.min(tex.width, tex.height) * 0.22;

  tex.push();
  tex.fill(255);
  tex.noStroke();
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(tex.width * 0.025);
  if (font) tex.textFont(font);

  for (const cx of centers) {
    const cy = tex.height * 0.5;
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count + beat * 0.5;
      const x = cx + Math.cos(a) * radius;
      const y = cy + Math.sin(a) * radius;
      tex.push();
      tex.translate(x, y);
      tex.rotate(a + Math.PI / 2);
      tex.text(chars[i % chars.length], 0, 0);
      tex.pop();
    }
  }
  tex.pop();
};

export const uiPattern5Track: UIDrawFunction = (context): void => {
  const { p, tex, beat, font } = context;
  const chars = BRAND.split("");
  const x = tex.width * 0.12;
  const y = tex.height * 0.12;
  const w = tex.width * 0.76;
  const h = tex.height * 0.76;
  const perimeter = (w + h) * 2;
  const samples = 72;
  const speed = beat * 80;

  tex.push();
  tex.fill(255);
  tex.noStroke();
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(Math.min(tex.width, tex.height) * 0.05);
  if (font) tex.textFont(font);

  for (let i = 0; i < samples; i++) {
    const t = (perimeter * (i / samples) + speed) % perimeter;
    let px = x;
    let py = y;
    let a = 0;

    if (t < w) {
      px = x + t;
      py = y;
      a = 0;
    } else if (t < w + h) {
      px = x + w;
      py = y + (t - w);
      a = Math.PI / 2;
    } else if (t < w * 2 + h) {
      px = x + w - (t - (w + h));
      py = y + h;
      a = Math.PI;
    } else {
      px = x;
      py = y + h - (t - (w * 2 + h));
      a = -Math.PI / 2;
    }

    tex.push();
    tex.translate(px, py);
    tex.rotate(a);
    tex.text(chars[i % chars.length], 0, 0);
    tex.pop();
  }
  tex.pop();
};

export const uiPattern6CornerBadges: UIDrawFunction = (context): void => {
  const { p, tex, beat, font } = context;
  const size = Math.min(tex.width, tex.height) * 0.3;
  const points = [
    { x: tex.width * 0.16, y: tex.height * 0.16, s: 1 },
    { x: tex.width * 0.84, y: tex.height * 0.16, s: -1 },
    { x: tex.width * 0.16, y: tex.height * 0.84, s: -1 },
    { x: tex.width * 0.84, y: tex.height * 0.84, s: 1 },
  ];

  tex.push();
  tex.noFill();
  tex.stroke(255);
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(size * 0.2);
  if (font) tex.textFont(font);

  for (const point of points) {
    tex.push();
    tex.translate(point.x, point.y);
    tex.rotate(beat * 0.5 * point.s);
    tex.rectMode(p.CENTER);
    tex.rect(0, 0, size * 0.5, size * 0.5, 8);
    tex.noStroke();
    tex.fill(255);
    tex.text("HitaHita", 0, 0);
    tex.fill(255);
    tex.stroke(255);
    tex.pop();
  }
  tex.pop();
};

export const uiPattern7GridField: UIDrawFunction = (context): void => {
  const { p, tex, beat, font } = context;
  const cols = 10;
  const rows = 6;
  const chars = BRAND.split("");

  tex.push();
  tex.fill(255);
  tex.noStroke();
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(tex.width * 0.05);
  if (font) tex.textFont(font);

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const phase = ((gx * 17 + gy * 31) % 23) / 23;
      const idx = Math.floor(((beat + phase) % 16) / 2) % chars.length;
      const x = ((gx + 0.5) / cols) * tex.width;
      const y = ((gy + 0.5) / rows) * tex.height;
      tex.text(chars[idx], x, y);
    }
  }
  tex.pop();
};

export const UI_PATTERNS: readonly UIDrawFunction[] = [
  uiPattern0Empty,
  uiPattern1SideAndBottom,
  uiPattern2RightBadge,
  uiPattern3Hud,
  uiPattern4Ring,
  uiPattern5Track,
  uiPattern6CornerBadges,
  uiPattern7GridField,
];
