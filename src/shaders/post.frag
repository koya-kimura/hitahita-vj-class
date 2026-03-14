precision mediump float;

varying vec2 vTexCoord;
uniform float u_time;
uniform float u_beat;
uniform vec2 u_resolution;
uniform sampler2D u_tex;
uniform sampler2D ui_tex;
uniform float u_fx[9];

const vec3 BASE_BG = vec3(0.0, 1.0, 0.0);

float rand2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float luma(vec3 c) {
    return dot(c, vec3(0.299, 0.587, 0.114));
}

vec2 kaleidoUv(vec2 uv, float segments) {
    vec2 p = uv * 2.0 - 1.0;
    float r = length(p);
    float a = atan(p.y, p.x);
    float sector = 6.28318530718 / max(segments, 1.0);
    a = mod(a, sector);
    a = abs(a - sector * 0.5);
    vec2 q = vec2(cos(a), sin(a)) * r;
    return q * 0.5 + 0.5;
}

void main(void) {
    vec2 uv = vTexCoord;
    vec2 suv = uv;

    float fx1On = step(0.999, u_fx[1]);
    float fx2On = step(0.999, u_fx[2]);
    float fx4On = step(0.999, u_fx[4]);
    float fx5On = step(0.999, u_fx[5]);

    // fx0: モザイク（正方セル）
    float mosaicAmt = clamp(u_fx[0], 0.0, 1.0);
    if (mosaicAmt > 0.0) {
        // fx=1.0 のとき 16x9 相当（16:9画面で正方セル）
        float cols = floor(mix(128.0, 16.0, mosaicAmt));
        float rows = max(1.0, floor(cols * (u_resolution.y / u_resolution.x)));
        vec2 mosaicGrid = vec2(max(1.0, cols), rows);
        suv = (floor(suv * mosaicGrid) + 0.5) / mosaicGrid;
    }

    // fx1: 4個タイリング (2x2)
    vec2 tile2Uv = fract(suv * 2.0);
    suv = mix(suv, tile2Uv, fx1On);

    // fx2: 3分割横タイリング（中央1/3をクロップして3面に複製）
    float tileLocalX = fract(suv.x * 3.0);
    vec2 tile3xUv = vec2((1.0 / 3.0) + tileLocalX / 3.0, suv.y);
    suv = mix(suv, tile3xUv, fx2On);

    // fx4: 万華鏡
    vec2 kaleido = kaleidoUv(suv, mix(16.0, 5.0, clamp(u_fx[4], 0.0, 1.0)));
    suv = mix(suv, kaleido, fx4On);

    // fx5: 2拍ごとに方向を変えながら座標を少しずらす（右→下→左→上）
    float phase = mod(floor(u_beat / 2.0), 4.0);
    vec2 dir = vec2(1.0, 0.0);
    if (phase < 1.0) {
        dir = vec2(1.0, 0.0);
    } else if (phase < 2.0) {
        dir = vec2(0.0, 1.0);
    } else if (phase < 3.0) {
        dir = vec2(-1.0, 0.0);
    } else {
        dir = vec2(0.0, -1.0);
    }
    vec2 offsetUv = suv + dir * 0.03 * fx5On;
    suv = clamp(offsetUv, 0.0, 1.0);

    // fx6: グリッチ (ライン太さを拡大)
    float line = step(0.825, fract((uv.y + u_time * 0.22) * 72.0));
    float jitter = (rand2(vec2(floor(uv.y * 100.0), floor(u_time * 28.0))) - 0.5) * 0.18;
    float vJitter = (rand2(vec2(floor(uv.x * 220.0), floor(u_time * 20.0))) - 0.5) * 0.02;
    vec2 glitchUv = suv + vec2(jitter * line * u_fx[6], vJitter * line * u_fx[6]);

    vec4 col = texture2D(u_tex, clamp(glitchUv, 0.0, 1.0));
    col.rgb = mix(BASE_BG, col.rgb, col.a);
    col.a = 1.0;

    // fx3: エッジ
    vec2 px = 1.0 / u_resolution;
    float l = luma(texture2D(u_tex, clamp(suv + vec2(-px.x, 0.0), 0.0, 1.0)).rgb);
    float r = luma(texture2D(u_tex, clamp(suv + vec2(px.x, 0.0), 0.0, 1.0)).rgb);
    float t = luma(texture2D(u_tex, clamp(suv + vec2(0.0, -px.y), 0.0, 1.0)).rgb);
    float b = luma(texture2D(u_tex, clamp(suv + vec2(0.0, px.y), 0.0, 1.0)).rgb);
    float edge = clamp(length(vec2(r - l, b - t)) * 3.2, 0.0, 1.0);
    col.rgb = mix(col.rgb, vec3(edge), u_fx[3]);

    // fx7: UVランダムノイズ
    vec2 noiseCell = floor(uv * u_resolution * 0.35);
    float n1 = rand2(noiseCell + floor(u_time * 24.0));
    float n2 = rand2(noiseCell.yx + floor(u_time * 19.0));
    vec2 noisyUv = suv + (vec2(n1, n2) - 0.5) * 0.06 * u_fx[7];
    vec3 noisyCol = texture2D(u_tex, clamp(noisyUv, 0.0, 1.0)).rgb;
    col.rgb = mix(col.rgb, noisyCol, u_fx[7]);

    // fx8: モノクロ（黒は黒のまま、0より上はやや白く）
    float monoAmt = clamp(u_fx[8], 0.0, 1.0);
    float gray = luma(col.rgb);
    float liftedGray = min(gray * (1.0 + 0.3 * monoAmt), 1.0);
    vec3 monoCol = vec3(liftedGray);
    col.rgb = mix(col.rgb, monoCol, monoAmt);

    vec4 uiCol = texture2D(ui_tex, uv);
    col = mix(col, uiCol, uiCol.a);

    col.a = 1.0;

    gl_FragColor = col;
}