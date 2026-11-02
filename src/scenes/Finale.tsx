import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, DISPLAY_FONT, H, W} from '../theme';
import {E, p, pop, tween} from '../anim';
import {Background} from '../components/Background';
import {LogoGlow, LogoMark} from '../components/LogoMark';
import {CharReveal, WordReveal} from '../components/Kinetic';
import {Icon, IconName} from '../components/Icon';

const WIPE_FROM = {x: W / 2, y: 1040};

const CHIPS: Array<{icon: IconName; label: string}> = [
  {icon: 'cart', label: 'Marketplace'},
  {icon: 'sparkle', label: 'Tanya Tani AI'},
  {icon: 'sprout', label: 'Pupuk Cerdas'},
];

/**
 * Finale: a circular wipe grows from the phone, the mark returns large,
 * and the tagline is set in kinetic type.
 * Local time 0 = finaleStart.
 */
export const Finale: React.FC = () => {
  const f = useCurrentFrame();
  const k = tween(f, 0, 1, 0, 36, E.inOut);
  const r = k * 2300;
  const slow = 1 + 0.035 * p(f, 20, 160, E.linear);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        clipPath: `circle(${r}px at ${WIPE_FROM.x}px ${WIPE_FROM.y}px)`,
        WebkitClipPath: `circle(${r}px at ${WIPE_FROM.x}px ${WIPE_FROM.y}px)`,
      }}
    >
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 36%, #11603B 0%, #08301F 48%, ${C.forestDeep} 90%)`}} />
      <div style={{position: 'absolute', inset: 0, opacity: 0.55}}>
        <Background glow={0.8} />
      </div>

      <div style={{position: 'absolute', inset: 0, transform: `scale(${slow})`, transformOrigin: '50% 45%'}}>
        {/* logo */}
        <div style={{position: 'absolute', left: W / 2 - 450, top: 430 - 450}}>
          <LogoGlow size={900} start={4} />
        </div>
        <div style={{position: 'absolute', left: W / 2 - 150, top: 280}}>
          <LogoMark size={300} start={6} />
        </div>

        {/* tagline */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 690}}>
          <WordReveal
            align="center"
            start={52}
            stagger={5}
            size={104}
            lineHeight={1.08}
            lines={[
              [{t: 'Teknologi'}, {t: 'Cerdas', color: C.lime}],
              [{t: 'untuk'}, {t: 'Pertanian'}],
              [{t: 'yang'}, {t: 'Lebih', color: C.lime}, {t: 'Baik.', color: C.lime}],
            ]}
          />
        </div>

        {/* feature chips */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 1262, display: 'flex', justifyContent: 'center', gap: 16}}>
          {CHIPS.map((c, i) => {
            const s = pop(f, 100 + i * 7, {damping: 14, stiffness: 150});
            return (
              <div
                key={c.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 24px 16px 18px',
                  borderRadius: 40,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1.5px solid rgba(166,234,110,0.4)',
                  color: '#fff',
                  fontFamily: DISPLAY_FONT,
                  fontWeight: 700,
                  fontSize: 27,
                  opacity: Math.min(1, s * 2),
                  transform: `translateY(${(1 - s) * 40}px) scale(${0.9 + 0.1 * s})`,
                }}
              >
                <Icon name={c.icon} size={30} color={C.lime} filled={c.icon === 'sparkle'} />
                {c.label}
              </div>
            );
          })}
        </div>

        {/* sign-off wordmark */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 1530, display: 'flex', justifyContent: 'center'}}>
          <CharReveal text="Umah Tani" start={122} size={92} stagger={2} accent={C.lime} accentFrom={5} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 1652,
            textAlign: 'center',
            fontFamily: DISPLAY_FONT,
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: '0.34em',
            color: 'rgba(255,255,255,0.72)',
            opacity: p(f, 140, 18, E.out),
            transform: `translateY(${(1 - p(f, 140, 18, E.out)) * 14}px)`,
          }}
        >
          AGRITECH MARKETPLACE × AI
        </div>
      </div>

      {/* wipe rim */}
      {k > 0 && k < 1 ? (
        <div
          style={{
            position: 'absolute',
            left: WIPE_FROM.x - r,
            top: WIPE_FROM.y - r,
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            border: `6px solid ${C.lime}`,
            opacity: 1 - k,
            boxShadow: `0 0 40px ${C.lime}`,
          }}
        />
      ) : null}
    </div>
  );
};
