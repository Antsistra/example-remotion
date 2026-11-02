import {Easing, interpolate, random, spring} from 'remotion';
import {FPS} from './theme';

/** Named easing curves used across the whole film. */
export const E = {
  /** Expo-style out. Fast start, long soft landing. Hero motion. */
  out: Easing.bezier(0.16, 1, 0.3, 1),
  /** Apple-ish smooth out. */
  smooth: Easing.bezier(0.22, 1, 0.36, 1),
  /** Symmetric, decisive in/out. Wipes and camera moves. */
  inOut: Easing.bezier(0.76, 0, 0.24, 1),
  /** Gentler in/out. Scrolls. */
  soft: Easing.bezier(0.45, 0, 0.15, 1),
  /** Slight overshoot. Pops. */
  back: Easing.bezier(0.34, 1.45, 0.64, 1),
  /** Accelerate. Exits. */
  in: Easing.bezier(0.7, 0, 0.84, 0),
  linear: (t: number) => t,
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamped interpolation between two values over [a, b]. */
export const tween = (
  frame: number,
  from: number,
  to: number,
  a: number,
  b: number,
  easing: (t: number) => number = E.smooth,
) =>
  interpolate(frame, [a, b], [from, to], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** 0 -> 1 progress that starts at `start` and lasts `dur` frames. */
export const p = (
  frame: number,
  start: number,
  dur: number,
  easing: (t: number) => number = E.smooth,
) => tween(frame, 0, 1, start, start + dur, easing);

/** Spring pop (0 -> 1 with a little overshoot). */
export const pop = (
  frame: number,
  delay = 0,
  config: {damping?: number; stiffness?: number; mass?: number} = {},
) =>
  spring({
    frame,
    fps: FPS,
    delay,
    config: {damping: 13, stiffness: 140, mass: 0.7, ...config},
  });

/**
 * Smooth camera-style path through keyframes [frame, value].
 * Cubic Hermite with Catmull-Rom tangents (zero velocity at the ends),
 * so the motion flows through keys instead of stopping on each one.
 */
export const spline = (frame: number, pts: Array<[number, number]>): number => {
  const n = pts.length;
  if (frame <= pts[0][0]) return pts[0][1];
  if (frame >= pts[n - 1][0]) return pts[n - 1][1];
  let i = 0;
  while (i < n - 2 && frame > pts[i + 1][0]) i++;
  const tangent = (k: number) => {
    if (k <= 0 || k >= n - 1) return 0;
    return (pts[k + 1][1] - pts[k - 1][1]) / (pts[k + 1][0] - pts[k - 1][0]);
  };
  const [t0, y0] = pts[i];
  const [t1, y1] = pts[i + 1];
  const h = t1 - t0;
  const s = (frame - t0) / h;
  const s2 = s * s;
  const s3 = s2 * s;
  return (
    (2 * s3 - 3 * s2 + 1) * y0 +
    (s3 - 2 * s2 + s) * h * tangent(i) +
    (-2 * s3 + 3 * s2) * y1 +
    (s3 - s2) * h * tangent(i + 1)
  );
};

const hex = (c: string) => {
  const v = c.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
};

/** Linear blend between two #rrggbb colours. */
export const mixColor = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hex(a);
  const [r2, g2, b2] = hex(b);
  const k = clamp01(t);
  return `rgb(${Math.round(mix(r1, r2, k))},${Math.round(mix(g1, g2, k))},${Math.round(mix(b1, b2, k))})`;
};

/** Deterministic random in [min, max) from a seed. */
export const rand = (seed: string | number, min = 0, max = 1) =>
  mix(min, max, random(seed));

/** Idle floating oscillation. */
export const bob = (frame: number, period: number, phase = 0) =>
  Math.sin(((frame + phase) / period) * Math.PI * 2);

/** 1 -> 0 over the last `dur` frames before `end`. Handy for fade-outs. */
export const outFade = (frame: number, end: number, dur: number) =>
  1 - p(frame, end - dur, dur, E.in);

/** Format an integer with Indonesian thousands separators: 12000 -> "12.000". */
export const idr = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
