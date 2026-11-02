import React from 'react';
import {C, DISPLAY_FONT, UI_FONT} from '../theme';
import {E, bob, idr, p, pop, tween} from '../anim';
import {Icon} from './Icon';
import {Bottle, FertBag, SeedPacket, Spinach} from './ProductArt';

/**
 * Wraps content in a 3D-positioned layer around the phone.
 * `frame` is the *global* frame. Positions are in stage space (px from the phone centre).
 * Enters flying out of the phone, bobs gently, and exits by sinking back into it.
 */
export const Floater: React.FC<{
  frame: number;
  x: number;
  y: number;
  z: number;
  inAt: number;
  outAt: number;
  rx?: number;
  ry?: number;
  rz?: number;
  amp?: number;
  phase?: number;
  children: React.ReactNode;
}> = ({frame, x, y, z, inAt, outAt, rx = 0, ry = 0, rz = 0, amp = 10, phase = 0, children}) => {
  if (frame < inAt - 1 || frame > outAt + 20) return null;
  const pin = p(frame, inAt, 34, E.out);
  const pout = p(frame, outAt, 16, E.in);
  const open = pin * (1 - pout);
  const k = pin - pout * pin; // 0 -> 1 -> 0
  const bobY = bob(frame, 84, phase) * amp;
  const bobR = bob(frame, 120, phase + 20) * 1.6;
  const ex = x * (0.15 + 0.85 * k);
  const ey = y * (0.15 + 0.85 * k) + bobY;
  const ez = z * k - (1 - k) * 220;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: Math.min(1, open * 2.2),
        transform: `translate3d(${ex}px, ${ey}px, ${ez}px) translate(-50%, -50%) rotateX(${rx}deg) rotateY(${ry + (1 - k) * -40}deg) rotateZ(${rz + bobR}deg) scale(${0.55 + 0.45 * k})`,
        transformStyle: 'flat',
        fontFamily: UI_FONT,
      }}
    >
      {children}
    </div>
  );
};

const cardBase: React.CSSProperties = {
  whiteSpace: 'nowrap',
  background: '#fff',
  borderRadius: 30,
  boxShadow: '0 30px 60px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.4)',
};

/* ---------- marketplace ---------- */

export const ProductFloat: React.FC = () => (
  <div style={{...cardBase, width: 380, padding: 18, display: 'flex', alignItems: 'center', gap: 18}}>
    <div style={{width: 120, height: 140, borderRadius: 22, background: 'linear-gradient(160deg,#EAF4DE,#CFE5B6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <SeedPacket w={80} uid="fl1" />
    </div>
    <div style={{flex: 1}}>
      <div style={{fontSize: 26, fontWeight: 700, color: C.ink, lineHeight: 1.15}}>Benih Cabai Merah Keriting</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
        <div style={{fontSize: 27, fontWeight: 700, color: C.primary}}>Rp 24.500</div>
        <div style={{width: 46, height: 46, borderRadius: 23, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="plus" size={26} color="#fff" sw={2.6} />
        </div>
      </div>
    </div>
  </div>
);

export const CartFloat: React.FC<{frame: number; inAt: number}> = ({frame, inAt}) => {
  const n = 1 + Math.min(2, Math.floor(Math.max(0, frame - inAt - 24) / 22));
  const bump = pop(frame, inAt + 24 + (n - 1) * 22 - 22 * (n > 1 ? 0 : 1), {damping: 8, stiffness: 260});
  return (
    <div style={{...cardBase, borderRadius: 60, padding: '16px 30px 16px 16px', display: 'flex', alignItems: 'center', gap: 18}}>
      <div style={{position: 'relative', width: 74, height: 74, borderRadius: 37, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="cart" size={38} color="#fff" />
        <div
          style={{
            position: 'absolute',
            right: -6,
            top: -8,
            minWidth: 34,
            height: 34,
            borderRadius: 17,
            background: C.red,
            color: '#fff',
            fontSize: 21,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #fff',
            transform: `scale(${0.8 + 0.2 * Math.min(1.25, bump)})`,
          }}
        >
          {n}
        </div>
      </div>
      <div>
        <div style={{fontSize: 24, fontWeight: 700, color: C.ink}}>Keranjang</div>
        <div style={{fontSize: 18, color: C.muted}}>{n} produk siap</div>
      </div>
    </div>
  );
};

export const SellFloat: React.FC = () => (
  <div style={{...cardBase, width: 400, padding: 20}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 58, height: 58, borderRadius: 18, background: C.lime, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="upload" size={32} color="#0B3A25" sw={2.3} />
      </div>
      <div>
        <div style={{fontSize: 25, fontWeight: 700, color: C.ink}}>Jual Hasil Panen</div>
        <div style={{fontSize: 17, color: C.muted}}>Langsung dari kebun</div>
      </div>
    </div>
    <div style={{marginTop: 16, display: 'flex', alignItems: 'center', gap: 14, background: '#F2F6EF', borderRadius: 20, padding: '10px 14px'}}>
      <div style={{width: 84, height: 66, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <div style={{transform: 'translateY(8px)'}}>
          <Spinach w={82} />
        </div>
      </div>
      <div style={{flex: 1}}>
        <div style={{fontSize: 22, fontWeight: 700, color: C.ink}}>Bayam segar</div>
        <div style={{fontSize: 17, color: C.muted}}>40 kg · Serang</div>
      </div>
      <div style={{fontSize: 17, fontWeight: 700, color: C.primary, background: '#DCEFE1', padding: '6px 12px', borderRadius: 12}}>Aktif</div>
    </div>
  </div>
);

export const DiscountSeal: React.FC<{frame: number}> = ({frame}) => (
  <div
    style={{
      width: 190,
      height: 190,
      borderRadius: '50%',
      background: `radial-gradient(circle at 35% 30%, #D6F8A8 0%, ${C.lime} 55%, #7CCB4A 100%)`,
      boxShadow: '0 26px 50px rgba(0,0,0,0.4), inset 0 -8px 18px rgba(20,90,40,0.25)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0B3A25',
      fontFamily: DISPLAY_FONT,
      transform: `rotate(${Math.sin(frame / 26) * 6}deg)`,
    }}
  >
    <div style={{fontSize: 70, fontWeight: 800, lineHeight: 0.95, letterSpacing: -2}}>30%</div>
    <div style={{fontSize: 17, fontWeight: 800, letterSpacing: 3}}>DISKON</div>
    <div style={{fontSize: 14, fontWeight: 700, letterSpacing: 1, opacity: 0.8}}>LAUNCH</div>
  </div>
);

export const BagFloat: React.FC = () => (
  <div style={{display: 'flex', alignItems: 'flex-end', gap: 8}}>
    <FertBag uid="fb1" w={170} title="NPK" sub="16-16-16" c1="#9DD8B0" c2="#3E9A5B" />
    <div style={{marginLeft: -22}}>
      <Bottle uid="fb2" w={84} title="PUPUK" />
    </div>
  </div>
);

/* ---------- Tanya Tani ---------- */

export const AIOrb: React.FC<{frame: number}> = ({frame}) => {
  const pulse = (o: number) => ((frame + o) % 60) / 60;
  return (
    <div style={{position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {[0, 20, 40].map((o) => (
        <div
          key={o}
          style={{
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: `3px solid ${C.lime}`,
            opacity: (1 - pulse(o)) * 0.7,
            transform: `scale(${1 + pulse(o) * 0.85})`,
          }}
        />
      ))}
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `radial-gradient(circle at 32% 28%, #7DD99A 0%, ${C.primary} 55%, #0F5A37 100%)`,
          boxShadow: '0 24px 50px rgba(0,0,0,0.45), 0 0 60px rgba(166,234,110,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="leaf" size={78} color="#fff" filled sw={1} />
      </div>
      <div style={{position: 'absolute', right: 44, top: 40, transform: `scale(${0.85 + 0.15 * Math.sin(frame / 7)}) rotate(${frame * 2}deg)`}}>
        <Icon name="sparkle" size={44} color={C.lime} filled sw={0.5} />
      </div>
      <div style={{position: 'absolute', left: 52, bottom: 46, transform: `scale(${0.8 + 0.2 * Math.sin(frame / 9 + 2)})`}}>
        <Icon name="sparkle" size={28} color="#fff" filled sw={0.5} />
      </div>
    </div>
  );
};

export const AIBadge: React.FC = () => (
  <div style={{...cardBase, borderRadius: 50, padding: '14px 28px 14px 14px', display: 'flex', alignItems: 'center', gap: 14, whiteSpace: 'nowrap'}}>
    <div style={{width: 56, height: 56, borderRadius: 28, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name="sparkle" size={30} color={C.lime} filled sw={0.5} />
    </div>
    <div>
      <div style={{fontSize: 25, fontWeight: 700, color: C.ink}}>Tanya Tani AI</div>
      <div style={{fontSize: 17, color: C.muted}}>Asisten Agribisnis</div>
    </div>
  </div>
);

/** A product recommendation tag that pops out of the chat card list. */
export const RecChip: React.FC<{name: string; price: number; tone?: string}> = ({name, price, tone = C.primary}) => (
  <div style={{...cardBase, borderRadius: 26, padding: '14px 22px 14px 14px', display: 'flex', alignItems: 'center', gap: 14}}>
    <div style={{width: 52, height: 52, borderRadius: 15, background: tone, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name="flask" size={30} color="#fff" filled sw={1} />
    </div>
    <div>
      <div style={{fontSize: 25, fontWeight: 700, color: C.ink}}>{name}</div>
      <div style={{fontSize: 18, color: C.primary, fontWeight: 500}}>Rp {idr(price)}/pcs</div>
    </div>
  </div>
);

/* ---------- smart fertilizer form ---------- */

export const ParamChip: React.FC<{icon: 'sprout' | 'calendar' | 'ruler'; label: string; value: string}> = ({icon, label, value}) => (
  <div style={{...cardBase, borderRadius: 28, padding: '14px 26px 14px 14px', display: 'flex', alignItems: 'center', gap: 16}}>
    <div style={{width: 62, height: 62, borderRadius: 18, background: '#DCEFE1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name={icon} size={34} color={C.primaryDeep} />
    </div>
    <div>
      <div style={{fontSize: 18, color: C.muted}}>{label}</div>
      <div style={{fontSize: 30, fontWeight: 700, color: C.ink, lineHeight: 1.1}}>{value}</div>
    </div>
  </div>
);

export const ProgressBadge: React.FC<{frame: number; start: number}> = ({frame, start}) => {
  const k = tween(frame, 0, 1, start, start + 22, E.soft);
  return (
    <div style={{...cardBase, borderRadius: 28, padding: '18px 24px', width: 340}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 700, color: C.ink}}>
        <Icon name="sparkle" size={24} color={C.primary} filled sw={0.5} /> Menghitung kebutuhan
      </div>
      <div style={{height: 12, borderRadius: 6, background: '#E3EBE5', marginTop: 14, overflow: 'hidden'}}>
        <div style={{height: '100%', width: `${k * 100}%`, borderRadius: 6, background: `linear-gradient(90deg, ${C.primary}, ${C.lime})`}} />
      </div>
      <div style={{fontSize: 17, color: C.muted, marginTop: 8}}>{Math.round(k * 100)}%</div>
    </div>
  );
};
