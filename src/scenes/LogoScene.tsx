import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, DISPLAY_FONT, H, W} from '../theme';
import {E, p, tween} from '../anim';
import {T} from '../timeline';
import {LogoGlow, LogoMark} from '../components/LogoMark';
import {CharReveal} from '../components/Kinetic';

export const LOGO_CENTER = {x: W / 2, y: 800};
const LOGO_SIZE = 430;

/**
 * Opening: the mark draws itself on a dark field, the wordmark rises letter by letter,
 * then a circular "hole" opens from the logo and reveals the phone act underneath.
 */
export const LogoScene: React.FC = () => {
  const g = useCurrentFrame();
  const wipe = tween(g, 0, 1, T.logoWipe, T.logoEnd, E.inOut);
  const r = wipe * 1700;
  const mask = `radial-gradient(circle at ${LOGO_CENTER.x}px ${LOGO_CENTER.y}px, transparent ${r}px, #000 ${r + 2}px)`;

  // lens streak crossing the logo
  const streak = p(g, 38, 26, E.inOut);
  const sub = p(g, 70, 18, E.out);
  const push = 1 + 0.04 * p(g, 0, 90, E.soft) + 0.1 * wipe;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 42%, #0E4A2E 0%, #072A1B 45%, ${C.forestDeep} 82%)`,
        }}
      />
      {/* perspective rings */}
      {[0, 1, 2].map((i) => {
        const k = p(g, 4 + i * 8, 50, E.out);
        const size = 560 + i * 300;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: LOGO_CENTER.x - size / 2,
              top: LOGO_CENTER.y - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              border: `2px solid rgba(166,234,110,${0.28 - i * 0.07})`,
              opacity: k,
              transform: `scale(${0.6 + 0.4 * k})`,
            }}
          />
        );
      })}

      <div style={{position: 'absolute', inset: 0, transform: `scale(${push})`, transformOrigin: `${LOGO_CENTER.x}px ${LOGO_CENTER.y}px`}}>
        <div style={{position: 'absolute', left: LOGO_CENTER.x - 450, top: LOGO_CENTER.y - 450}}>
          <LogoGlow size={900} start={4} />
        </div>
        <div style={{position: 'absolute', left: LOGO_CENTER.x - LOGO_SIZE / 2, top: LOGO_CENTER.y - LOGO_SIZE / 2}}>
          <LogoMark size={LOGO_SIZE} start={4} />
        </div>
        {/* streak */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: LOGO_CENTER.y - 2,
            width: W,
            height: 4,
            opacity: Math.sin(streak * Math.PI) * 0.9,
            transform: `translateX(${(streak - 0.5) * 900}px) scaleX(${0.3 + streak * 0.9})`,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)',
            filter: 'blur(1.5px)',
          }}
        />

        <div style={{position: 'absolute', left: 0, right: 0, top: 1090, display: 'flex', justifyContent: 'center'}}>
          <CharReveal text="Umah Tani" start={44} size={134} stagger={2.4} accent={C.lime} accentFrom={5} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 1262,
            textAlign: 'center',
            fontFamily: DISPLAY_FONT,
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: `${0.34 - 0.1 * (1 - sub)}em`,
            color: 'rgba(255,255,255,0.78)',
            opacity: sub,
            transform: `translateY(${(1 - sub) * 16}px)`,
          }}
        >
          AGRITECH MARKETPLACE × AI
        </div>
      </div>

      {/* rim light on the opening hole */}
      {wipe > 0 && wipe < 1 ? (
        <div
          style={{
            position: 'absolute',
            left: LOGO_CENTER.x - r,
            top: LOGO_CENTER.y - r,
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            border: `6px solid ${C.lime}`,
            opacity: 0.9 * (1 - wipe),
            boxShadow: `0 0 40px ${C.lime}`,
          }}
        />
      ) : null}
    </div>
  );
};
