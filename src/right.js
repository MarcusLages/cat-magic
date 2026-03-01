import { symbols } from "./symbols.js";

const appEl = document.getElementById("app");
const drawPanelEl = document.getElementById("drawPanel");
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

const symbolButtons = Array.from(document.querySelectorAll(".symbol-btn[data-shape]"));
const cleanBtn = document.getElementById("clean");
const runBtn = document.getElementById("run");

const SHAPES = Object.freeze({
  CIRCLE: "circle",
  SQUARE: "square",
  DIAMOND: "diamond",
});

const mirrors = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
const MAX_LAYERS = 3;
const MAX_INDEX = 10;

const COLORS = Object.freeze({
  positive: "#fc8181",
  negative: "#4bebf4",
});

let viewW = appEl.clientWidth;
let viewH = appEl.clientHeight;
let relUnit = 1;

let activeKey = null;

const layers = {
  1: { shape: null, index: null, confirmed: false, polarity: "positive" },
  2: { shape: null, index: null, confirmed: false, polarity: "positive" },
  3: { shape: null, index: null, confirmed: false, polarity: "positive" },
};

function rel(px) {
  return px * relUnit;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toRoman(n) {
  if (!Number.isFinite(n) || n <= 0 || n >= 4000) return "";
  const map = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [num, sym] of map) {
    while (n >= num) {
      out += sym;
      n -= num;
    }
  }
  return out;
}

function colorForPolarity(polarity) {
  return polarity === "negative" ? COLORS.negative : COLORS.positive;
}

function shapeLabel(shape) {
  if (shape === SHAPES.CIRCLE) return "circle";
  if (shape === SHAPES.SQUARE) return "square";
  if (shape === SHAPES.DIAMOND) return "diamond";
  return "—";
}

function activeLayerNumber() {
  if (layers[3].confirmed) return 3;
  if (layers[2].confirmed) return 2;
  if (layers[1].confirmed) return 1;
  return null;
}

function nextLayerNumber() {
  if (!layers[1].confirmed) return 1;
  if (!layers[2].confirmed) return 2;
  if (!layers[3].confirmed) return 3;
  return null;
}

function layerKey(layer) {
  return `${layer.shape}:${layer.polarity}`;
}

function applyGlow(color) {
  ctx.shadowBlur = 18;
  ctx.shadowColor = color;
}

function clearGlow() {
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
}

function strokeArc(r, lineWidth, color, start, end) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  applyGlow(color);
  ctx.beginPath();
  ctx.arc(0, 0, r, start, end);
  ctx.stroke();
  clearGlow();
}

function eraseCircle(x, y, radius) {
  ctx.save();
  clearGlow();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHollowMarker(x, y, outerRadius, strokeWidth, color) {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeWidth;
  applyGlow(color);
  ctx.beginPath();
  ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
  ctx.stroke();
  clearGlow();
  ctx.restore();
}

function drawText(text, x, y, sizePx, color) {
  ctx.save();
  clearGlow();
  ctx.fillStyle = color;
  ctx.font = `${sizePx}px system-ui`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawLBorder(half, count, color) {
  if (count <= 0) return;
  const spacing = rel(8);
  const lw = rel(3);

  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = "butt";
  applyGlow(color);

  for (let i = 0; i < count; i++) {
    const inset = i * spacing;

    const x0 = inset;
    const y0 = -half + inset;
    const x1 = half - inset;
    const y1 = -inset;

    if (x0 >= x1 - rel(2) || y0 >= y1 - rel(2)) break;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x1, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

  clearGlow();
}

function drawMarkNearCorner(half, type, color) {
  const lw = rel(3);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = "butt";
  applyGlow(color);

  const pad = rel(52);
  const cx = half - pad;
  const cy = -half + pad;
  const s = rel(12);

  if (type === "V") {
    ctx.beginPath();
    ctx.moveTo(cx - s, cy - s);
    ctx.lineTo(cx, cy + s);
    ctx.lineTo(cx + s, cy - s);
    ctx.stroke();
  } else if (type === "X") {
    ctx.beginPath();
    ctx.moveTo(cx - s, cy - s);
    ctx.lineTo(cx + s, cy + s);
    ctx.moveTo(cx - s, cy + s);
    ctx.lineTo(cx + s, cy - s);
    ctx.stroke();
  }

  clearGlow();
}

function borderCountForLevel(level) {
  if (level <= 0) return 0;
  if (level >= 1 && level <= 5) return level;
  if (level >= 6 && level <= 9) return level - 5;
  if (level === 10) return 1;
  return 0;
}

function markForLevel(level) {
  if (level >= 6 && level <= 9) return "V";
  if (level === 10) return "X";
  return null;
}

function renderCircleLayer(midX, midY, sizeOuterR, idx, strokeColor) {
  const innerR = sizeOuterR - rel(80);
  const outerR = sizeOuterR;

  const start = -Math.PI / 2;
  const end = 0;
  const midAngle = (start + end) / 2;

  const ringWidth = rel(3);
  const markerOuterR = Math.max(rel(18), Math.round(sizeOuterR * 0.10));
  const markerStroke = rel(3);

  for (const [sx, sy] of mirrors) {
    ctx.save();
    ctx.translate(midX, midY);
    ctx.scale(sx, sy);

    strokeArc(outerR, ringWidth, strokeColor, start, end);

    if (idx > 0) {
      strokeArc(innerR, ringWidth, strokeColor, start, end);

      const markerX = Math.cos(midAngle) * innerR;
      const markerY = Math.sin(midAngle) * innerR;

      eraseCircle(markerX, markerY, markerOuterR + rel(3));
      drawHollowMarker(markerX, markerY, markerOuterR, markerStroke, strokeColor);

      const roman = toRoman(idx) || "—";
      const fontSize = Math.max(rel(14), Math.round(markerOuterR * 0.75));
      drawText(roman, markerX, markerY, fontSize, "white");
    }

    ctx.restore();
  }
}

function renderSquareLayer(midX, midY, half, idx, strokeColor) {
  const count = borderCountForLevel(idx);
  const mark = markForLevel(idx);

  for (const [sx, sy] of mirrors) {
    ctx.save();
    ctx.translate(midX, midY);
    ctx.scale(sx, sy);

    ctx.beginPath();
    ctx.rect(0, -half, half, half);
    ctx.clip();

    drawLBorder(half, count, strokeColor);
    if (mark) drawMarkNearCorner(half, mark, strokeColor);

    ctx.restore();
  }
}

function renderDiamondLayer(midX, midY, half, idx, strokeColor) {
  if (idx <= 0) return;

  const d = half * 0.90;
  const lw = rel(3);
  const segments = 10;
  const turnOrder = [1, 10, 2, 9, 3, 8, 4, 7, 5, 6];
  const turned = new Set();
  const turnCount = Math.min(segments, idx);
  for (let i = 0; i < turnCount; i++) turned.add(turnOrder[i]);

  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    pts.push({ x: d * t, y: -d + d * t });
  }

  for (const [sx, sy] of mirrors) {
    ctx.save();
    ctx.translate(midX, midY);
    ctx.scale(sx, sy);

    ctx.beginPath();
    ctx.rect(0, -half, half, half);
    ctx.clip();

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lw;
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    applyGlow(strokeColor);

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);

    for (let i = 0; i < segments; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const segIndex = i + 1;

      if (!turned.has(segIndex)) {
        ctx.lineTo(b.x, b.y);
      } else {
        ctx.lineTo(b.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
    }

    ctx.stroke();
    clearGlow();
    ctx.restore();
  }
}

function computeLayerSizes() {
  const base = Math.min(viewW, viewH);
  const layer1CircleR = base * 0.35 + rel(80);
  const layer1SquareHalf = base * 0.24 + rel(62);
  const layer1DiamondHalf = base * 0.30 + rel(78);
  const layer2Half = base * 0.24 + rel(84);
  const layer3Half = base * 0.15 + rel(80);
  return { layer1CircleR, layer1SquareHalf, layer1DiamondHalf, layer2Half, layer3Half };
}

function outerIsCircle() {
  return layers[1].confirmed && layers[1].shape === SHAPES.CIRCLE;
}

function outerIsSquare() {
  return layers[1].confirmed && layers[1].shape === SHAPES.SQUARE;
}

function nonCircleScale(shape, layer, layer2SameShape) {
  const BASE = {
    [SHAPES.SQUARE]: { 2: 0.94, 3: 0.74 },
    [SHAPES.DIAMOND]: { 2: 0.95, 3: 0.86 },
  };

  const layer2IsCircle =
    layer === 3 &&
    layers[2].confirmed &&
    layers[2].shape === SHAPES.CIRCLE;

  if (outerIsCircle()) {
    if (layer === 2) {
      if (shape === SHAPES.SQUARE) return 0.95;
      if (shape === SHAPES.DIAMOND) return 1.32;
    }
    if (layer === 3) {
      if (layer2IsCircle) {
        if (shape === SHAPES.SQUARE) return 0.82;
        if (shape === SHAPES.DIAMOND) return 1.0;
      }
      if (shape === SHAPES.SQUARE) return layer2SameShape ? 0.56 : 0.7;
      if (shape === SHAPES.DIAMOND) return BASE[SHAPES.DIAMOND][3];
    }
    return 1.0;
  }

  if (outerIsSquare()) {
    if (shape === SHAPES.SQUARE) {
      if (layer === 2) return 0.67;
      if (layer === 3 && layer2IsCircle) return 0.82;
      if (layer === 3) return layer2SameShape ? 0.56 : 0.7;
    }

    if (shape === SHAPES.DIAMOND) {
      if (layer === 2) return 0.92;
      if (layer === 3 && layer2IsCircle) return 1.0;
      if (layer === 3) return BASE[SHAPES.DIAMOND][3];
    }

    return 1.0;
  }

  if (layer === 2) return BASE[shape]?.[2] ?? 1.0;
  if (layer === 3) {
    if (layer2IsCircle) {
      if (shape === SHAPES.SQUARE) return 0.76;
      if (shape === SHAPES.DIAMOND) return 0.92;
    }
    if (layer2SameShape) {
      if (shape === SHAPES.SQUARE) return 0.68;
      if (shape === SHAPES.DIAMOND) return BASE[SHAPES.DIAMOND][3];
    }
    return BASE[shape]?.[3] ?? 1.0;
  }
  return 1.0;
}

function baseHalfForLayerNonCircle(shape, layer, sizes) {
  if (layer === 1) {
    if (shape === SHAPES.SQUARE) return sizes.layer1SquareHalf;
    if (shape === SHAPES.DIAMOND) return sizes.layer1DiamondHalf;
    return sizes.layer1SquareHalf;
  }
  if (layer === 2) return sizes.layer2Half;
  return sizes.layer3Half;
}

function radiusForLayerCircle(layer, sizes) {
  if (layer === 1) return sizes.layer1CircleR;
  if (layer === 2) return sizes.layer2Half;
  const layer2IsCircle = layers[2].confirmed && layers[2].shape === SHAPES.CIRCLE;
  if (layer2IsCircle) return sizes.layer3Half * 0.95;
  return sizes.layer3Half;
}

function outerCircleHalfCap(targetLayer, radiusForLayerCircleOnly) {
  let limitingInnerR = Infinity;

  for (let L = 1; L < targetLayer; L++) {
    if (!layers[L].confirmed) continue;
    if (layers[L].shape !== SHAPES.CIRCLE) continue;

    const outerR = radiusForLayerCircleOnly(L);
    const innerR = outerR - rel(80);
    limitingInnerR = Math.min(limitingInnerR, innerR);
  }

  if (!Number.isFinite(limitingInnerR)) return Infinity;

  const margin = rel(18);
  const maxHalf = (limitingInnerR - margin) / Math.SQRT2;
  return Math.max(rel(20), maxHalf);
}

function computeNonCircleHalf(shape, layer, sizes) {
  const cap = outerCircleHalfCap(layer, (L) => radiusForLayerCircle(L, sizes));
  const baseHalf = Math.min(baseHalfForLayerNonCircle(shape, layer, sizes), cap);
  const layer2SameShape =
    layer === 3 &&
    layers[2].confirmed &&
    layers[2].shape === shape;
  return baseHalf * nonCircleScale(shape, layer, layer2SameShape);
}

function draw() {
  ctx.clearRect(0, 0, viewW, viewH);

  const midX = viewW / 2;
  const midY = viewH / 2;
  const sizes = computeLayerSizes();

  for (const L of [3, 2, 1]) {
    if (!layers[L].confirmed) continue;

    const shape = layers[L].shape;
    const idx = layers[L].index;
    const strokeColor = colorForPolarity(layers[L].polarity);

    if (shape === SHAPES.CIRCLE) {
      renderCircleLayer(midX, midY, radiusForLayerCircle(L, sizes), idx, strokeColor);
    } else if (shape === SHAPES.SQUARE) {
      const half = computeNonCircleHalf(SHAPES.SQUARE, L, sizes);
      renderSquareLayer(midX, midY, half, clamp(idx, 0, 10), strokeColor);
    } else if (shape === SHAPES.DIAMOND) {
      const half = computeNonCircleHalf(SHAPES.DIAMOND, L, sizes);
      renderDiamondLayer(midX, midY, half, clamp(idx, 0, 10), strokeColor);
    }
  }
}

function resize() {
  const dpr = window.devicePixelRatio || 1;
  const rect = drawPanelEl.getBoundingClientRect();

  viewW = Math.max(1, Math.floor(rect.width));
  viewH = Math.max(1, Math.floor(rect.height));
  relUnit = Math.max(0.65, Math.min(1.8, Math.min(viewW, viewH) / 900));

  canvas.style.width = `${viewW}px`;
  canvas.style.height = `${viewH}px`;

  canvas.width = Math.floor(viewW * dpr);
  canvas.height = Math.floor(viewH * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw();
}

function mapLayerToSymbolTerm(layer) {
  const sign = layer.polarity === "negative" ? -1 : 1;
  switch(layer.shape) {
    case SHAPES.CIRCLE:
      return { a: sign, ae: 1, e: 0};
    case SHAPES.SQUARE:
      return { a: sign, ae: 1, e: 1};
    case SHAPES.DIAMOND:
      return { a: sign, ae: -1, e: 1};
    default:
      // error
      return { a: 0, ae: 0, e: 0 };
  }
}

function syncSymbolsModel() {
  for (const L of [1, 2, 3]) {
    if (!layers[L].confirmed) continue;
    const term = mapLayerToSymbolTerm(layers[L]);
    symbols.add_symbol(term);
  }
}

function syncButtonsUI() {
  symbolButtons.forEach((btn) => {
    const key = `${btn.dataset.shape}:${btn.dataset.polarity}`;
    btn.classList.toggle("active", key === activeKey);
  });
}

function resetAll() {
  layers[1] = { shape: null, index: null, confirmed: false, polarity: "positive" };
  layers[2] = { shape: null, index: null, confirmed: false, polarity: "positive" };
  layers[3] = { shape: null, index: null, confirmed: false, polarity: "positive" };
  activeKey = null;
  symbols.cleanup();

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  syncButtonsUI();
  draw();
}

function addOrLevel(shape, polarity) {
  const key = `${shape}:${polarity}`;
  const activeNum = activeLayerNumber();

  if (activeNum && activeKey === key) {
    layers[activeNum].index = clamp(layers[activeNum].index + 1, 1, MAX_INDEX);
    syncSymbolsModel();
    syncButtonsUI();
    draw();
    return;
  }

  const next = nextLayerNumber();
  if (!next) {
    return;
  }

  layers[next] = {
    shape,
    polarity,
    index: 1,
    confirmed: true,
  };

  activeKey = key;
  syncSymbolsModel();
  syncButtonsUI();
  draw();
}

symbolButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    addOrLevel(btn.dataset.shape, btn.dataset.polarity);
  });
});

cleanBtn.addEventListener("click", () => {
  resetAll();
});

runBtn.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    console.log(i, symbols(i));
  }
  resetAll();
});

window.addEventListener("resize", resize);

resize();
syncButtonsUI();
