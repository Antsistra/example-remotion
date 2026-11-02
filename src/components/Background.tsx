import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, H, W} from '../theme';
import {bob, rand} from '../anim';

/**
 * Persistent cinematic backdrop: deep forest gradient, drifting light pools,
 * a parallax dot grid and a few floating specks. Pure function of the frame,
 * so it stays continuous across every scene.
 */
export const Background: React.FC<{glow?: number}> = ({glow = 1}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  const gridShift = frame * 0.35;
  const specks = Array.from({length: 22}, (_, i) => {
    const x = rand(`sx${i}`, 0, W);
    const speed = rand(`ss${i}`, 6, 22);
    const size = rand(`sz${i}`, 3, 9);
    const y = (rand(`sy${i}`, 0, H) - frame * speed * 0.5 + H * 4) % H;
    const o = rand(`so${i}`, 0.12, 0.38);
    return {x: x + bob(frame, rand(`sp${i}`, 90, 160), i * 13) * 14, y, size, o, i};
  });

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: C.forestDeep}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, #0B3A25 0%, #07291B 52%, ${C.forestDeep} 100%)`,
        }}
      />
      {/* drifting light pools */}
      <div
        style={{
          position: 'absolute',
          width: 1400,
          height: 1400,
          left: -300 + Math.sin(t * 0.5) * 120,
          top: -500 + Math.cos(t * 0.4) * 90,
          background: `radial-gradient(circle, rgba(166,234,110,${0.2 * glow}) 0%, rgba(166,234,110,0) 62%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1500,
          height: 1500,
          left: 20 + Math.cos(t * 0.45) * 140,
          top: 760 + Math.sin(t * 0.35) * 110,
          background: `radial-gradient(circle, rgba(62,154,91,${0.3 * glow}) 0%, rgba(62,154,91,0) 60%)`,
        }}
      />
      {/* dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: -60,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.09) 1.6px, transparent 1.8px)',
          backgroundSize: '60px 60px',
          backgroundPosition: `${gridShift}px ${-gridShift * 0.6}px`,
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 52%, black 0%, transparent 72%)',
          maskImage: 'radial-gradient(ellipse at 50% 52%, black 0%, transparent 72%)',
        }}
      />
      {specks.map((s) => (
        <div
          key={s.i}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: C.lime,
            opacity: s.o,
          }}
        />
      ))}
      {/* vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
};
