import React from 'react';
import {C, DISPLAY_FONT, UI_FONT} from '../theme';
import {E, idr, p, tween} from '../anim';
import {Icon} from './Icon';

/**
 * Data-visualisation panels that "explode" out of the result screen.
 * Dark glass cards with lime data ink so they separate from the white phone UI.
 * `f` is time local to the panel's start.
 */
const glass: React.CSSProperties = {
  whiteSpace: 'nowrap',
  background: 'linear-gradient(155deg, #145638 0%, #08301F 100%)',
  borderRadius: 38,
  boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 0 0 1.5px rgba(166,234,110,0.28)',
  fontFamily: UI_FONT,
  color: '#fff',
};

const Title: React.FC<{icon: 'flask' | 'drop' | 'clock'; text: string}> = ({icon, text}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 25, color: '#CDEBD2'}}>
    <Icon name={icon} size={28} color={C.lime} />
    {text}
  </div>
);

/** Circular dosage gauge: 300 g per plant on a 0-400 g scale. */
export const DosageRing: React.FC<{f: number}> = ({f}) => {
  const SIZE = 300;
  const R = 118;
  const CIRC = 2 * Math.PI * R;
  const k = tween(f, 0, 0.75, 14, 64, E.out);
  const n = Math.round(tween(f, 0, 300, 14, 64, E.out));
  const ang = -90 + k * 360;
  const dot = {
    x: SIZE / 2 + R * Math.cos((ang * Math.PI) / 180),
    y: SIZE / 2 + R * Math.sin((ang * Math.PI) / 180),
  };
  const ticks = Array.from({length: 40}, (_, i) => i);
  return (
    <div style={{...glass, width: 400, padding: '28px 30px 26px'}}>
      <Title icon="drop" text="Takaran per tanaman" />
      <div style={{position: 'relative', width: SIZE, height: SIZE, margin: '14px auto 0'}}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          <defs>
            <linearGradient id="dz-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4FAF62" />
              <stop offset="1" stopColor={C.lime} />
            </linearGradient>
          </defs>
          {ticks.map((i) => {
            const a = (i / 40) * Math.PI * 2 - Math.PI / 2;
            const on = i / 40 <= k;
            return (
              <line
                key={i}
                x1={SIZE / 2 + Math.cos(a) * 136}
                y1={SIZE / 2 + Math.sin(a) * 136}
                x2={SIZE / 2 + Math.cos(a) * (i % 5 === 0 ? 148 : 143)}
                y2={SIZE / 2 + Math.sin(a) * (i % 5 === 0 ? 148 : 143)}
                stroke={on ? C.lime : 'rgba(255,255,255,0.2)'}
                strokeWidth={i % 5 === 0 ? 3 : 2}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={24} />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="url(#dz-g)"
            strokeWidth={24}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - k)}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
          <circle cx={dot.x} cy={dot.y} r={13} fill="#fff" />
          <circle cx={dot.x} cy={dot.y} r={22} fill="none" stroke={C.lime} strokeWidth={2} opacity={0.6} />
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: 92, lineHeight: 1, letterSpacing: -3, fontVariantNumeric: 'tabular-nums'}}>{n}</div>
          <div style={{fontSize: 26, color: C.lime, fontWeight: 700, marginTop: 2}}>gram / tanaman</div>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 17, color: 'rgba(255,255,255,0.55)', marginTop: 10, padding: '0 6px'}}>
        <span>0 g</span>
        <span>skala 400 g</span>
      </div>
    </div>
  );
};

/** Horizontal bars: total need per hectare for each recommended fertilizer. */
export const NeedBars: React.FC<{f: number}> = ({f}) => {
  const rows = [
    {name: 'Dolomit', value: 12000, share: 1, color: C.lime, d: 10},
    {name: 'NPK 16-16-16', value: 720, share: 720 / 12000, color: '#7BD6A0', d: 20},
  ];
  return (
    <div style={{...glass, width: 500, padding: '28px 32px 30px'}}>
      <Title icon="flask" text="Kebutuhan pupuk per hektar" />
      <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 26}}>
        {rows.map((r) => {
          const w = tween(f, 0, r.share, r.d, r.d + 40, E.out);
          const v = tween(f, 0, r.value, r.d, r.d + 40, E.out);
          return (
            <div key={r.name}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10}}>
                <span style={{fontSize: 24, fontWeight: 500, color: '#fff'}}>{r.name}</span>
                <span style={{fontFamily: DISPLAY_FONT, fontSize: 32, fontWeight: 800, color: r.color, fontVariantNumeric: 'tabular-nums'}}>
                  {idr(v)} <span style={{fontSize: 20, fontWeight: 600}}>kg</span>
                </span>
              </div>
              <div style={{height: 26, borderRadius: 13, background: 'rgba(255,255,255,0.12)', overflow: 'hidden', position: 'relative'}}>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${Math.max(w, 0.012) * 100}%`,
                    borderRadius: 13,
                    background: `linear-gradient(90deg, #3E9A5B, ${r.color})`,
                    boxShadow: `0 0 18px ${r.color}88`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Application window 0-7 HST with a travelling marker and plant population. */
export const PeriodTrack: React.FC<{f: number}> = ({f}) => {
  const days = Array.from({length: 8}, (_, i) => i);
  const k = tween(f, 0, 1, 12, 70, E.soft);
  const pops = Math.round(tween(f, 0, 40000, 12, 60, E.out));
  const W = 500;
  return (
    <div style={{...glass, width: 580, padding: '26px 32px 28px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Title icon="clock" text="Periode 0 - 7 HST" />
        <div style={{fontSize: 20, fontWeight: 700, color: '#0B3A25', background: C.lime, padding: '6px 16px', borderRadius: 16}}>1× di awal</div>
      </div>
      <div style={{position: 'relative', height: 92, marginTop: 20}}>
        <div style={{position: 'absolute', left: 0, top: 44, width: W, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.14)'}} />
        <div style={{position: 'absolute', left: 0, top: 44, width: W * k, height: 8, borderRadius: 4, background: `linear-gradient(90deg, #3E9A5B, ${C.lime})`}} />
        {days.map((d) => {
          const x = (d / 7) * W;
          const on = k >= d / 7 - 0.001;
          return (
            <div key={d} style={{position: 'absolute', left: x - 13, top: 35}}>
              <div style={{width: 26, height: 26, borderRadius: 13, background: on ? C.lime : '#0A3322', border: `3px solid ${on ? '#fff' : 'rgba(255,255,255,0.3)'}`}} />
              <div style={{position: 'absolute', top: 40, left: 0, width: 26, textAlign: 'center', fontSize: 18, color: on ? '#fff' : 'rgba(255,255,255,0.5)'}}>{d}</div>
            </div>
          );
        })}
        <div style={{position: 'absolute', left: W * k - 28, top: -4, width: 56, height: 56}}>
          <div style={{width: 56, height: 56, borderRadius: 28, background: '#fff', boxShadow: '0 8px 20px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="sprout" size={32} color={C.primary} />
          </div>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10}}>
        <span style={{fontSize: 20, color: 'rgba(255,255,255,0.65)'}}>Est. populasi</span>
        <span style={{fontFamily: DISPLAY_FONT, fontSize: 36, fontWeight: 800, fontVariantNumeric: 'tabular-nums'}}>
          ± {idr(pops)} <span style={{fontSize: 20, color: C.lime}}>tanaman</span>
        </span>
      </div>
    </div>
  );
};

export const Tick: React.FC<{f: number}> = ({f}) => {
  const k = p(f, 0, 16, E.back);
  return (
    <div style={{width: 96, height: 96, borderRadius: 48, background: C.lime, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${k})`, boxShadow: '0 20px 40px rgba(0,0,0,0.4)'}}>
      <Icon name="check" size={56} color="#0B3A25" sw={3.2} />
    </div>
  );
};
