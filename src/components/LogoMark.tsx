import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {E, bob, p, pop, tween} from '../anim';

/**
 * Umah Tani mark, redrawn as vector: a house-like block with a 2x2 window,
 * a sprout growing from its roof and "signal" arcs (AI / connectivity) at the base.
 * Everything animates from `start` (frame in the parent's time).
 */
type Props = {
  size: number;
  start?: number;
  /** Draw the white app-icon tile behind the mark. */
  tile?: boolean;
  /** Gentle idle float after the build. */
  idle?: boolean;
  /** Set to 1 to skip the build animation. */
  settled?: boolean;
};

const ARC_R = [24, 42, 60];
const ARC_C = ['#0F5A37', '#2E8B57', '#7BCB86'];

const Leaf: React.FC<{x: number; y: number; angle: number; s: number; scale: number; fill: string}> = ({
  x,
  y,
  angle,
  s,
  scale,
  fill,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s * scale})`}>
    <path d="M0 0 C-17 -10 -17 -34 0 -50 C17 -34 17 -10 0 0Z" fill={fill} />
    <path d="M0 -4 L0 -38" stroke="rgba(255,255,255,0.35)" strokeWidth={1.6} strokeLinecap="round" />
  </g>
);

export const LogoMark: React.FC<Props> = ({size, start = 0, tile = true, idle = true, settled = false}) => {
  const frame = useCurrentFrame() - start;
  const f = settled ? 999 : frame;

  const tileIn = pop(f, 0, {damping: 15, stiffness: 120});
  const arcDraw = (i: number) => p(f, 6 + i * 4, 24, E.out);
  const dome = p(f, 10, 26, E.out);
  const leafA = pop(f, 26, {damping: 11, stiffness: 150});
  const leafB = pop(f, 32, {damping: 11, stiffness: 150});
  const leafC = pop(f, 38, {damping: 11, stiffness: 150});
  const pane = (i: number) => pop(f, 40 + i * 3, {damping: 12, stiffness: 190});
  const sway = idle && f > 70 ? Math.sin((f - 70) / 22) * 2.2 : 0;
  const floatY = idle && f > 60 ? bob(f, 70) * 3 : 0;

  const panes: Array<[number, number]> = [
    [92, 58],
    [106, 58],
    [92, 72],
    [106, 72],
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      style={{
        overflow: 'visible',
        display: 'block',
        transform: `translateY(${floatY}px) scale(${tile ? 0.6 + tileIn * 0.4 : 1})`,
        opacity: tile ? Math.min(1, tileIn * 1.6) : 1,
      }}
    >
      <defs>
        <clipPath id="um-tile">
          <rect width="140" height="140" rx="32" />
        </clipPath>
        <linearGradient id="um-dome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#15744A" />
          <stop offset="1" stopColor="#0B4A2C" />
        </linearGradient>
      </defs>
      {tile ? <rect width="140" height="140" rx="32" fill="#fff" /> : null}
      <g clipPath="url(#um-tile)">
        {/* house / dome block rises from the base */}
        <g transform={`translate(0 ${(1 - dome) * 90})`}>
          <path d="M50 140 V86 Q50 52 86 52 H100 Q130 52 130 80 V140 Z" fill="url(#um-dome)" />
        </g>
        {/* 2x2 window */}
        {panes.map(([x, y], i) => (
          <rect
            key={i}
            x={x + 5 - 5 * pane(i)}
            y={y + 5 - 5 * pane(i)}
            width={10 * pane(i)}
            height={10 * pane(i)}
            rx={2.2}
            fill="#fff"
          />
        ))}
        {/* signal arcs */}
        {ARC_R.map((r, i) => {
          const len = (Math.PI * r) / 2;
          return (
            <path
              key={r}
              d={`M6 ${140 - r} A ${r} ${r} 0 0 1 ${6 + r} 140`}
              fill="none"
              stroke={ARC_C[i]}
              strokeWidth={9}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - arcDraw(i))}
            />
          );
        })}
      </g>
      {/* sprout */}
      <Leaf x={60} y={54} angle={-34 + sway} s={0.9} scale={leafB} fill="#5FB36E" />
      <Leaf x={62} y={54} angle={30 + sway} s={1.18} scale={leafA} fill="#2E7D4A" />
      <Leaf x={62} y={54} angle={4 + sway} s={0.72} scale={leafC} fill="#8ED08F" />
    </svg>
  );
};

/** Soft radial glow used behind the logo. */
export const LogoGlow: React.FC<{size: number; start?: number}> = ({size, start = 0}) => {
  const frame = useCurrentFrame() - start;
  const a = tween(frame, 0, 1, 6, 40, E.out);
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${C.leaf}55 0%, ${C.leaf}18 38%, transparent 68%)`,
        opacity: a,
        transform: `scale(${0.7 + a * 0.3})`,
      }}
    />
  );
};
