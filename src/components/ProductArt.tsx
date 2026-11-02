import React from 'react';

/** Vector product illustrations that stand in for the app's product photography. */

export const FertBag: React.FC<{
  uid: string;
  w?: number;
  title: string;
  sub?: string;
  c1: string;
  c2: string;
  labelColor?: string;
  rotate?: number;
}> = ({uid, w = 120, title, sub, c1, c2, labelColor = '#1F5B35', rotate = 0}) => {
  const h = (w * 162) / 120;
  return (
    <svg width={w} height={h} viewBox="0 0 120 162" style={{display: 'block', overflow: 'visible', transform: `rotate(${rotate}deg)`}}>
      <defs>
        <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <linearGradient id={`${uid}-h`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="158" rx="52" ry="5" fill="rgba(0,0,0,0.25)" />
      <path d="M10 22 Q60 10 110 22 L117 148 Q60 160 3 148 Z" fill={`url(#${uid}-b)`} />
      <path d="M10 22 Q60 10 110 22 L110.600 33 Q60 21 9.400 33 Z" fill="rgba(0,0,0,0.22)" />
      <path d="M10 22 Q60 10 110 22 L117 148 Q60 160 3 148 Z" fill={`url(#${uid}-h)`} />
      <rect x="20" y="58" width="80" height="68" rx="7" fill="#fff" fillOpacity="0.95" />
      <path d="M31 77c0-8 6-13 15-13 0 8-6 13-15 13z" fill="#3E9A5B" />
      <text x="60" y="94" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="13" fill={labelColor}>
        {title}
      </text>
      {sub ? (
        <text x="60" y="108" textAnchor="middle" fontFamily="Roboto, Arial, sans-serif" fontWeight="500" fontSize="8.5" fill="#55655a">
          {sub}
        </text>
      ) : null}
      <rect x="32" y="114" width="56" height="4" rx="2" fill="#CDE6D1" />
    </svg>
  );
};

export const Bottle: React.FC<{uid: string; w?: number; title: string}> = ({uid, w = 56, title}) => {
  const h = (w * 130) / 70;
  return (
    <svg width={w} height={h} viewBox="0 0 70 130" style={{display: 'block', overflow: 'visible'}}>
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1B5E35" />
          <stop offset="0.5" stopColor="#3E9A5B" />
          <stop offset="1" stopColor="#14502D" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="127" rx="30" ry="4" fill="rgba(0,0,0,0.25)" />
      <rect x="24" y="2" width="22" height="14" rx="3" fill="#0E3F25" />
      <rect x="20" y="14" width="30" height="12" rx="4" fill={`url(#${uid}-g)`} />
      <path d="M20 24 H50 Q66 30 66 48 V118 Q66 126 58 126 H12 Q4 126 4 118 V48 Q4 30 20 24Z" fill={`url(#${uid}-g)`} />
      <rect x="12" y="56" width="46" height="46" rx="5" fill="#fff" fillOpacity="0.95" />
      <text x="35" y="76" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="8.5" fill="#1F5B35">
        {title}
      </text>
      <text x="35" y="88" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="8.5" fill="#1F5B35">
        CAIR
      </text>
      <path d="M8 40 Q8 32 16 30" stroke="#fff" strokeOpacity="0.4" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
};

const Chili: React.FC<{x: number; y: number; rot: number; s?: number}> = ({x, y, rot, s = 1}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M0 0 C16 28 12 70 -8 104" stroke="#C72B26" strokeWidth="13" strokeLinecap="round" fill="none" />
    <path d="M-1 6 C10 30 8 66 -6 96" stroke="#F0584B" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M-2 -2 C-8 -10 -6 -16 2 -20" stroke="#2F7A35" strokeWidth="5" strokeLinecap="round" fill="none" />
  </g>
);

// 22 teeth across x = 8..140
const ZIG = `M8 6 ${Array.from({length: 22}, (_, i) => `L${8 + i * 6 + 3} 1 L${8 + (i + 1) * 6} 6`).join(' ')} V200 H8Z`;

export const SeedPacket: React.FC<{w?: number; uid?: string}> = ({w = 150, uid = 'sp'}) => {
  const h = (w * 210) / 150;
  return (
    <svg width={w} height={h} viewBox="0 0 150 210" style={{display: 'block', overflow: 'visible'}}>
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9CCB4B" />
          <stop offset="1" stopColor="#4C9A2A" />
        </linearGradient>
        <linearGradient id={`${uid}-w`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F8E8" />
          <stop offset="1" stopColor="#CFE3A8" />
        </linearGradient>
      </defs>
      <ellipse cx="75" cy="205" rx="62" ry="5" fill="rgba(0,0,0,0.22)" />
      <path d={ZIG} fill={`url(#${uid}-g)`} />
      <rect x="22" y="22" width="106" height="30" rx="4" fill="#fff" fillOpacity="0.92" />
      <text x="75" y="42" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="14" fill="#1F5B35">
        TANGGUH F1
      </text>
      <rect x="22" y="60" width="106" height="112" rx="6" fill={`url(#${uid}-w)`} />
      <Chili x={50} y={76} rot={8} s={0.85} />
      <Chili x={74} y={74} rot={-4} s={0.95} />
      <Chili x={100} y={78} rot={-14} s={0.85} />
      <rect x="22" y="178" width="106" height="14" rx="3" fill="#1F5B35" />
    </svg>
  );
};

const SpinachLeaf: React.FC<{rot: number; len: number; w: number; c: string}> = ({rot, len, w, c}) => (
  <g transform={`rotate(${rot})`}>
    <path d={`M0 0 L0 ${-len * 0.38}`} stroke="#CDE9A0" strokeWidth="6" strokeLinecap="round" />
    <path
      d={`M0 ${-len * 0.3} C${-w} ${-len * 0.45} ${-w} ${-len * 0.85} 0 ${-len} C${w} ${-len * 0.85} ${w} ${-len * 0.45} 0 ${-len * 0.3}Z`}
      fill={c}
    />
    <path d={`M0 ${-len * 0.32} L0 ${-len * 0.9}`} stroke="rgba(255,255,255,0.35)" strokeWidth="2.200" strokeLinecap="round" />
  </g>
);

export const Spinach: React.FC<{w?: number}> = ({w = 200}) => (
  <svg width={w} height={w * 0.95} viewBox="0 0 200 190" style={{display: 'block', overflow: 'visible'}}>
    <ellipse cx="100" cy="182" rx="64" ry="6" fill="rgba(0,0,0,0.18)" />
    <g transform="translate(100 172)">
      <SpinachLeaf rot={-48} len={140} w={38} c="#3C9A3F" />
      <SpinachLeaf rot={48} len={140} w={38} c="#3C9A3F" />
      <SpinachLeaf rot={-24} len={158} w={42} c="#4DAE4A" />
      <SpinachLeaf rot={24} len={158} w={42} c="#4DAE4A" />
      <SpinachLeaf rot={0} len={166} w={44} c="#66C25B" />
      <ellipse cx="0" cy="-4" rx="20" ry="9" fill="none" stroke="#E8B44A" strokeWidth="6" />
    </g>
  </svg>
);

/** Rice-terrace banner backdrop with the three product renders on the right. */
export const BannerScene: React.FC<{frame: number; w: number; h: number}> = ({frame, w, h}) => {
  const d = Math.sin(frame / 40) * 3;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{position: 'absolute', inset: 0}}>
        <defs>
          <linearGradient id="bn-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1B4A28" />
            <stop offset="0.55" stopColor="#3D7C3A" />
            <stop offset="1" stopColor="#8FBE6A" />
          </linearGradient>
          <radialGradient id="bn-sun" cx="0.8" cy="0.2" r="0.6">
            <stop offset="0" stopColor="#F4F9C9" stopOpacity="0.85" />
            <stop offset="1" stopColor="#F4F9C9" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={w} height={h} fill="url(#bn-sky)" />
        <rect width={w} height={h} fill="url(#bn-sun)" />
        <path d={`M0 ${h * 0.62} Q${w * 0.3} ${h * 0.5} ${w * 0.6} ${h * 0.62} T${w} ${h * 0.58} V${h} H0Z`} fill="#2C6B31" opacity="0.8" />
        <path d={`M0 ${h * 0.78} Q${w * 0.35} ${h * 0.66} ${w * 0.7} ${h * 0.78} T${w} ${h * 0.74} V${h} H0Z`} fill="#245C2A" opacity="0.9" />
        <path d={`M0 ${h * 0.9} Q${w * 0.4} ${h * 0.82} ${w * 0.8} ${h * 0.9} T${w} ${h * 0.88} V${h} H0Z`} fill="#1B4A22" />
      </svg>
      <div style={{position: 'absolute', right: 24, bottom: 6 + d, display: 'flex', alignItems: 'flex-end', gap: 4}}>
        <FertBag uid="bn1" w={92} title="PUPUK" sub="ORGANIK" c1="#C9A66B" c2="#A98249" labelColor="#1F5B35" />
        <div style={{marginBottom: 2, marginLeft: -6}}>
          <Bottle uid="bn2" w={46} title="PUPUK" />
        </div>
        <div style={{marginLeft: -2, marginBottom: -d}}>
          <FertBag uid="bn3" w={84} title="NPK" sub="16-16-16" c1="#9DD8B0" c2="#4FAF62" labelColor="#1F5B35" />
        </div>
      </div>
    </div>
  );
};
