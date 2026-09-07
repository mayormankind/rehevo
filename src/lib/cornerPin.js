// cornerPin.js
// Maps a flat w x h rectangle onto an arbitrary 4-point quad using a CSS matrix3d.
// Standard 2D projective-transform (homography) technique, adapted for CSS.

function adj(m) {
  return [
    m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3],
  ];
}

function multmm(a, b) {
  const c = Array(9);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cij = 0;
      for (let k = 0; k < 3; k++) cij += a[3 * i + k] * b[3 * k + j];
      c[3 * i + j] = cij;
    }
  }
  return c;
}

function multmv(m, v) {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
  const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  const v = multmv(adj(m), [x4, y4, 1]);
  return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

function general2DProjection(
  x1s, y1s, x1d, y1d,
  x2s, y2s, x2d, y2d,
  x3s, y3s, x3d, y3d,
  x4s, y4s, x4d, y4d
) {
  const s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
  const d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
  return multmm(d, adj(s));
}

/**
 * Returns a CSS matrix3d() string that maps a (w x h) rectangle,
 * with its top-left corner at the origin, onto the given destination quad.
 * Destination points must be in PIXELS, relative to the same origin
 * the transformed element will be positioned at (its own top-left, with
 * transform-origin: 0 0).
 *
 * Corner order: top-left, top-right, bottom-right, bottom-left (clockwise).
 */
export function cornerPinTransform(w, h, dest) {
  const { topLeft: tl, topRight: tr, bottomRight: br, bottomLeft: bl } = dest;

  let t = general2DProjection(
    0, 0, tl.x, tl.y,
    w, 0, tr.x, tr.y,
    0, h, bl.x, bl.y,
    w, h, br.x, br.y
  );

  for (let i = 0; i < 9; i++) t[i] = t[i] / t[8];

  // Reorder 3x3 -> CSS matrix3d 4x4 (column-major)
  const m = [
    t[0], t[3], 0, t[6],
    t[1], t[4], 0, t[7],
    0,    0,    1, 0,
    t[2], t[5], 0, t[8],
  ];

  return `matrix3d(${m.join(", ")})`;
}

/**
 * Converts a quad given in PERCENTAGES of a container's width/height
 * into pixel coordinates for that container's current rendered size.
 */
export function quadPctToPx(quadPct, containerW, containerH) {
  const toPx = (p) => ({ x: (p.x / 100) * containerW, y: (p.y / 100) * containerH });
  return {
    topLeft: toPx(quadPct.topLeft),
    topRight: toPx(quadPct.topRight),
    bottomRight: toPx(quadPct.bottomRight),
    bottomLeft: toPx(quadPct.bottomLeft),
  };
}
