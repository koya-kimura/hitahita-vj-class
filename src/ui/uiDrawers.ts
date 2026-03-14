import type p5 from "p5";
import type { VisualRenderContext } from "../types/render";
import { UniformRandom } from "../utils/math/uniformRandom";
import { map } from "../utils/math/mathUtils";
import { leapRamp, leapNoise } from "../utils/math/gvm";
import { zigzag } from "../utils/math/mathUtils";
import { easeInOutQuad, easeInOutSine } from "../utils/math/easing";

export type UIDrawFunction = (context: VisualRenderContext) => void;

const BRAND = "HitaHita";

let cornerBadgeTexture: p5.Graphics | undefined;
let cornerBadgeTextureSize = 0;

const ensureCornerBadgeTexture = (
    p: p5,
    size: number,
    font?: p5.Font,
): p5.Graphics => {
    const roundedSize = Math.max(1, Math.round(size));
    const needsRecreate = !cornerBadgeTexture || cornerBadgeTextureSize !== roundedSize;

    if (needsRecreate) {
        cornerBadgeTexture?.remove();
        cornerBadgeTexture = p.createGraphics(roundedSize, roundedSize);
        cornerBadgeTextureSize = roundedSize;
    }

    const texture = cornerBadgeTexture;
    if (!texture) {
        throw new Error("Corner badge texture is not initialized");
    }
    texture.clear();
    texture.push();
    texture.noStroke();
    // texture.fill(255, 0, 0);
    // texture.circle(texture.width/2, texture.height/2, texture.width);
    texture.fill(255);
    texture.textAlign(p.CENTER, p.CENTER);
    texture.textSize(roundedSize * 1.1);
    if (font) texture.textFont(font);
    texture.text("H", roundedSize * 0.5, roundedSize * 0.62);
    texture.pop();

    return texture;
};

export const uiPattern0Empty: UIDrawFunction = (context): void => {
    const { p, tex, font, beat } = context;

    const minSide = Math.min(tex.width, tex.height);
    const radius = minSide * 0.35;
    const size = minSide * 0.025;

    tex.push();
    tex.fill(255);
    tex.noStroke();
    tex.textAlign(p.LEFT, p.BASELINE);
    tex.textSize(size);
    if (font) tex.textFont(font);

    for (const cx of [0, 1]) {
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 50; i++) {
                const angle =
                    p.noise(i, 0) * p.TAU * 10 +
                    p.map(p.noise(i, 1), 0, 1, 0.01, 0.1) * p.frameCount;

                tex.push();
                tex.translate(tex.width * cx, tex.height * 0.5);
                tex.rotate(angle);
                tex.translate(radius * map(j, 0, 1, 0.5, 1.0), 0);
                tex.rotate(Math.sin(beat * 0.01 + cx + i * 0.1 + j * 0.1) * 0.2);
                tex.text(BRAND, 0, 0);
                tex.pop();
            }
        }
    }
    tex.pop();
};

export const uiPattern1SideAndBottom: UIDrawFunction = (context): void => {
    const { p, tex, font, beat } = context;

    tex.push();
    for (let i = 0; i < 100; i++) {
        const x = UniformRandom.rand(i, 1) * tex.width;
        const y = (UniformRandom.rand(i, 2) * tex.height + beat * map(UniformRandom.rand(i, 3), 0, 1, 10, 50)) % tex.height;
        const s = Math.min(tex.width, tex.height) * 0.025;
        const str = [..."HitaHita"][i % 8];
        const angle = beat * (i % 2 == 0 ? 1 : -1) * map(UniformRandom.rand(i, 4), 0, 1, 0.01, 0.1);

        tex.push();
        tex.translate(x, y);
        tex.rotate(angle);
        if (font) tex.textFont(font);
        tex.textSize(s);
        tex.fill(255, 255);
        tex.textAlign(p.CENTER, p.CENTER);
        tex.text(str, 0, 0);
        tex.pop();
    }
    tex.pop();
};

export const uiPattern2RightBadge: UIDrawFunction = (context): void => {
    const { p, tex, font, beat } = context;

    const s = tex.width * 0.28;
    const scl = map(easeInOutQuad(zigzag(leapRamp(context.beat, 16, 1))), 0, 1, 1, 3);

    if (leapNoise(beat, 0.5, 0.5) < 0.95) {
        tex.push();
        tex.translate(tex.width / 2, tex.height / 2);
        tex.scale(1, scl);
        if (font) tex.textFont(font);
        tex.textSize(s);
        tex.fill(255);
        tex.textAlign(p.CENTER, p.CENTER);
        tex.text(BRAND, 0, s * 0.1);
        tex.pop();
    }
};

export const uiPattern3Hud: UIDrawFunction = (context): void => {
    const { p, tex, beat, font } = context;

    tex.push();
    const n = 20;
    const m = 3;
    for (let j = 0; j < m; j++) {
        for (let i = 0; i < n; i++) {
            const angle = (i / n) * Math.PI * 2 + beat * 0.2;
            const scl = map(j, 0, m, 1, 2);
            const radiusX = Math.min(tex.width, tex.height) * 0.4 * scl;
            const radiusY = Math.min(tex.width, tex.height) * 0.1 * scl;
            const x = tex.width * 0.5 + Math.cos(angle) * radiusX;
            const y = tex.height * 0.5 + Math.sin(angle) * radiusY;
            const str = BRAND[(i + j) % BRAND.length];
            const s = Math.min(tex.width, tex.height) * 0.08 * map(y, 0, tex.height, 0.1, 1.0);

            tex.push();
            tex.translate(x, y);
            if (font) tex.textFont(font);
            tex.textSize(s);
            tex.fill(255);
            tex.textAlign(p.CENTER, p.CENTER);
            tex.text(str, 0, 0);
            tex.pop();
        }
    }

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
    const x = tex.width * 0.05;
    const y = tex.height * 0.05;
    const w = tex.width * 0.9;
    const h = tex.height * 0.9;
    const perimeter = (w + h) * 2;
    const samples = 72;
    const speed = beat * 80;

    tex.push();
    tex.fill(255);
    tex.noStroke();
    tex.textAlign(p.CENTER, p.CENTER);
    tex.textSize(Math.min(tex.width, tex.height) * 0.03);
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
    const gap = size * 0.5 + Math.min(tex.width, tex.height) * map(easeInOutSine(zigzag(leapRamp(beat, 16, 2))), 0, 1, 0, 0.5);
    const points = [
        { x: gap, y: gap, s: 1 },
        { x: tex.width - gap, y: gap, s: -1 },
        { x: gap, y: tex.height - gap, s: -1 },
        { x: tex.width - gap, y: tex.height - gap, s: 1 },
    ];

    const texture = ensureCornerBadgeTexture(p, size, font);

    tex.push();
    tex.textAlign(p.CENTER, p.CENTER);
    tex.textSize(size);
    if (font) tex.textFont(font);

    for (const point of points) {
        tex.push();
        tex.translate(point.x, point.y);
        tex.rotate(beat * 0.12 * point.s);
        tex.imageMode(p.CENTER);
        tex.image(texture, 0, 0);
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
    tex.textSize(tex.width * 0.025);
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
