import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {E, mix, p, tween} from '../anim';

/**
 * Touch indicator. A finger dot glides in, presses at `pressAt`, and emits a ring.
 * Coordinates are in the 540x1024 screen space. Frames are in the parent's time.
 */
export const TapRipple: React.FC<{
  x: number;
  y: number;
  pressAt: number;
  /** where the dot starts relative to the target */
  from?: {dx: number; dy: number};
  travel?: number;
}> = ({x, y, pressAt, from = {dx: 110, dy: 150}, travel = 16}) => {
  const frame = useCurrentFrame();
  const startF = pressAt - travel;
  if (frame < startF - 1 || frame > pressAt + 26) return null;

  const approach = p(frame, startF, travel, E.out);
  const px = x + from.dx * (1 - approach);
  const py = y + from.dy * (1 - approach);
  const appear = p(frame, startF, 6, E.out);
  const down = p(frame, pressAt - 3, 4, E.out);
  const release = p(frame, pressAt + 2, 8, E.out);
  const scale = 1 - 0.28 * down + 0.28 * release;
  const fade = 1 - p(frame, pressAt + 8, 12, E.in);

  const ring = p(frame, pressAt - 1, 22, E.out);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x - 70,
          top: y - 70,
          width: 140,
          height: 140,
          borderRadius: '50%',
          border: `3px solid ${C.leaf}`,
          background: `rgba(79,175,98,${0.18 * (1 - ring)})`,
          opacity: ring > 0 ? 1 - ring : 0,
          transform: `scale(${mix(0.2, 1, ring)})`,
          zIndex: 80,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: px - 30,
          top: py - 30,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(18,40,28,0.34)',
          border: '3px solid rgba(255,255,255,0.9)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
          opacity: appear * fade,
          transform: `scale(${scale})`,
          zIndex: 81,
        }}
      />
    </>
  );
};

/**
 * Circular reveal of a new screen. The mask grows from the tap point,
 * with a bright rim and a tiny parallax settle on the incoming content.
 */
export const ScreenReveal: React.FC<{
  x: number;
  y: number;
  dur?: number;
  children: React.ReactNode;
}> = ({x, y, dur = 28, children}) => {
  const frame = useCurrentFrame();
  const k = tween(frame, 0, 1, 0, dur, E.inOut);
  const r = k * 1300;
  const scale = 1.07 - 0.07 * tween(frame, 0, 1, 0, dur + 10, E.out);
  return (
    <div style={{position: 'absolute', inset: 0, zIndex: 10}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `circle(${r}px at ${x}px ${y}px)`,
          WebkitClipPath: `circle(${r}px at ${x}px ${y}px)`,
        }}
      >
        <div style={{position: 'absolute', inset: 0, transform: `scale(${scale})`, transformOrigin: `${x}px ${y}px`}}>
          {children}
        </div>
      </div>
      {k > 0 && k < 1 ? (
        <div
          style={{
            position: 'absolute',
            left: x - r,
            top: y - r,
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            border: `5px solid ${C.leaf}`,
            opacity: 0.85 * (1 - k),
            zIndex: 11,
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </div>
  );
};
