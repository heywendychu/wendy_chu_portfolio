// Geometry for the homepage "leaf" thumbnails (design review section 13, option F).
// The leaf is a 1.07:1 box with two small (24px) corners and two big curves (46% × 50%).
// Positions are % of the leaf box: x/zoom of its width, y of its height. The review page's
// Thumbnails tab uses the same numbers, so a crop saved there lands exactly the same here.

export const LEAF_RATIO = 1.07; // width ÷ height
const RX = 0.46, RY = 0.5;      // the big top curve, as fractions of width/height

// Right edge of the leaf at height t (0 = top), allowing for the big top-right curve.
function edgeAt(t) {
  if (t >= RY) return 1;
  const dy = (RY - t) / RY;
  return 1 - RX + RX * Math.sqrt(Math.max(0, 1 - dy * dy));
}
// Lowest top that keeps a corner at x (0–1) clear of the curve.
function topClearOf(x) {
  let lo = 0, hi = RY;
  for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (edgeAt(m) >= x) hi = m; else lo = m; }
  return hi;
}
const r1 = (n) => Math.round(n * 10) / 10;

/** Default crop. Screenshots: B's framing at their real proportions (left edge 12% in, top 12%
 *  down, tall enough to run off the bottom), so only the leaf ever cuts them.
 *  See-through images: 76% wide, whole, sitting so ~12% runs off the bottom. */
export function autoCrop({ width = 16, height = 10, transparent = false, flip = false }) {
  const r = width / height;
  if (transparent) {
    const h = (0.76 * LEAF_RATIO) / r;
    const t = Math.max(0.08, topClearOf(0.88), 1 - 0.88 * h);
    return { zoom: 76, x: flip ? 12 : 12, y: r1(t * 100) };
  }
  return { zoom: r1(Math.max(76, (100 * r) / LEAF_RATIO)), x: 12, y: 12 };
}
