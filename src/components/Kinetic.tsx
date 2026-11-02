import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, DISPLAY_FONT} from '../theme';
import {E, p, tween} from '../anim';

export type Seg = {t: string; color?: string; style?: React.CSSProperties};

type WordProps = {
  /** Lines of coloured word segments. Each line is laid out on its own row. */
  lines: Seg[][];
  start: number;
  size: number;
  stagger?: number;
  weight?: number;
  lineHeight?: number;
  color?: string;
  letterSpacing?: number | string;
  align?: 'left' | 'center' | 'right';
  /** Frame at which the exit (slide up through the mask) begins. */
  outAt?: number;
  outDur?: number;
  font?: string;
  /** Degrees of rotation words start with while rising. */
  tilt?: number;
};

/**
 * Masked word-by-word reveal. Each word rises out of an overflow:hidden slot
 * with a slight rotation, then (optionally) exits upward through the same mask.
 */
export const WordReveal: React.FC<WordProps> = ({
  lines,
  start,
  size,
  stagger = 4,
  weight = 800,
  lineHeight = 1.08,
  color = C.white,
  letterSpacing = '-0.03em',
  align = 'left',
  outAt,
  outDur = 14,
  font = DISPLAY_FONT,
  tilt = 7,
}) => {
  const frame = useCurrentFrame();
  let idx = 0;
  return (
    <div
      style={{
        fontFamily: font,
        fontSize: size,
        fontWeight: weight,
        lineHeight,
        letterSpacing,
        color,
        textAlign: align,
        whiteSpace: 'nowrap',
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
          }}
        >
          {line.map((seg, wi) => {
            const i = idx++;
            const pin = p(frame, start + i * stagger, 26, E.out);
            const pout = outAt === undefined ? 0 : p(frame, outAt + i * (stagger * 0.5), outDur, E.in);
            const y = (1 - pin) * 118 - pout * 118;
            return (
              <span
                key={wi}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  paddingTop: '0.06em',
                  paddingBottom: '0.2em',
                  marginBottom: '-0.2em',
                  paddingRight: '0.04em',
                  marginRight: '0.26em',
                  verticalAlign: 'top',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    transform: `translateY(${y}%) rotate(${(1 - pin) * tilt}deg)`,
                    transformOrigin: '0% 100%',
                    color: seg.color,
                    ...seg.style,
                  }}
                >
                  {seg.t}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

type CharProps = {
  text: string;
  start: number;
  size: number;
  stagger?: number;
  weight?: number;
  color?: string;
  letterSpacing?: number | string;
  font?: string;
  /** colour for characters from `accentFrom` onward */
  accent?: string;
  accentFrom?: number;
};

/** Per-letter reveal with rise, scale and blur. Used for the wordmark. */
export const CharReveal: React.FC<CharProps> = ({
  text,
  start,
  size,
  stagger = 2,
  weight = 800,
  color = C.white,
  letterSpacing = '-0.04em',
  font = DISPLAY_FONT,
  accent,
  accentFrom = 0,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: font,
        fontSize: size,
        fontWeight: weight,
        letterSpacing,
        color,
        whiteSpace: 'pre',
        display: 'flex',
        lineHeight: 1.1,
      }}
    >
      {text.split('').map((ch, i) => {
        const pin = p(frame, start + i * stagger, 22, E.out);
        const blur = (1 - pin) * 14;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: Math.min(1, pin * 1.8),
              transform: `translateY(${(1 - pin) * 0.55 * size}px) scale(${0.85 + pin * 0.15})`,
              filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
              color: accent && i >= accentFrom ? accent : undefined,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

/** Small uppercase label with a growing rule, used as the section kicker. */
export const Kicker: React.FC<{
  text: string;
  index: string;
  start: number;
  outAt?: number;
}> = ({text, index, start, outAt}) => {
  const frame = useCurrentFrame();
  const pin = p(frame, start, 22, E.out);
  const pout = outAt === undefined ? 0 : p(frame, outAt, 12, E.in);
  const a = pin * (1 - pout);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        opacity: a,
        transform: `translateX(${(1 - pin) * -40 - pout * 40}px)`,
        fontFamily: DISPLAY_FONT,
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: '0.22em',
        color: C.lime,
      }}
    >
      <span style={{color: C.white, opacity: 0.55}}>{index}</span>
      <span
        style={{
          width: tween(frame, 0, 64, start, start + 24, E.out),
          height: 3,
          borderRadius: 2,
          background: C.lime,
        }}
      />
      <span>{text}</span>
    </div>
  );
};
