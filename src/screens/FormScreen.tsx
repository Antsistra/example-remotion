import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, UI_FONT} from '../theme';
import {E, bob, p, pop, tween} from '../anim';
import {Icon, IconName} from '../components/Icon';
import {BottomNav} from '../components/BottomNav';
import {TapRipple} from '../components/TapRipple';
import {TAP} from '../timeline';

/** Local-time beats for the form (exported for floaters). */
export const FORM = {
  open: 18,
  pick: 40,
  close: 50,
  age: 58,
  area: 78,
  ready: 88,
};

const OPTIONS = ['Padi', 'Jagung', 'Cabai', 'Melon', 'Tomat'];

const Field: React.FC<{
  label: string;
  icon: IconName;
  value: React.ReactNode;
  trailing?: React.ReactNode;
  highlight?: number;
  valueColor?: string;
}> = ({label, icon, value, trailing, highlight = 0, valueColor = C.ink}) => (
  <div style={{marginBottom: 14}}>
    <div style={{fontSize: 15, fontWeight: 500, color: '#161a17', marginBottom: 8}}>{label}</div>
    <div
      style={{
        height: 52,
        borderRadius: 14,
        border: `1.5px solid ${highlight > 0.05 ? C.primary : '#161a17'}`,
        boxShadow: highlight > 0.05 ? `0 0 0 ${4 * highlight}px rgba(62,154,91,${0.22 * highlight})` : 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 12,
        background: '#fff',
      }}
    >
      <Icon name={icon} size={24} color="#111" />
      <div style={{flex: 1, fontSize: 16.5, color: valueColor, overflow: 'hidden', height: 26, position: 'relative'}}>{value}</div>
      {trailing ?? <Icon name="chevronDown" size={22} color="#111" sw={2.2} />}
    </div>
  </div>
);

/** Slot-machine text swap: old value rolls up, new value rolls in. */
const Roll: React.FC<{from: string; to: string; k: number; color?: string}> = ({from, to, k, color}) => (
  <div style={{position: 'absolute', left: 0, top: 0, color}}>
    <div style={{height: 26, transform: `translateY(${-k * 26}px)`, opacity: 1 - k}}>{from}</div>
    <div style={{height: 26, transform: `translateY(${-k * 26}px)`, opacity: k}}>{to}</div>
  </div>
);

/** "Rekomendasi Pupuk Cerdas" input form. Local time 0 = mount. */
export const FormScreen: React.FC<{tapAt: number}> = ({tapAt}) => {
  const f = useCurrentFrame();

  const card = (d: number) => {
    const r = p(f, d, 24, E.out);
    return {opacity: Math.min(1, r * 1.8), transform: `translateY(${(1 - r) * 40}px)`};
  };

  // dropdown
  const dd = p(f, FORM.open, 10, E.out) * (1 - p(f, FORM.close, 8, E.in));
  const hoverIdx = tween(f, 0, 3, FORM.open + 6, FORM.pick - 2, E.soft); // slide highlight Padi -> Melon
  const rollK = p(f, FORM.pick, 10, E.out);
  const fieldHi = Math.max(dd, 0);

  // age counter 00 -> 07
  const ageN = Math.round(tween(f, 0, 7, FORM.age, FORM.age + 16, E.out));
  const ageHi = p(f, FORM.age - 2, 6) * (1 - p(f, FORM.age + 20, 8));
  const areaHi = p(f, FORM.area - 2, 6) * (1 - p(f, FORM.area + 14, 8));
  const showArea = f >= FORM.area;

  const ready = p(f, FORM.ready, 10, E.out);
  const press = tween(f, 0, 1, tapAt - 3, tapAt + 1, E.out);
  const loading = f > tapAt + 1;
  const sweep = tween(f, 0, 1, tapAt + 1, tapAt + 22, E.soft);

  return (
    <div style={{position: 'absolute', inset: 0, background: '#fff', fontFamily: UI_FONT, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 20, top: 38, ...card(8)}}>
        <div style={{fontSize: 25, fontWeight: 700, color: C.ink, letterSpacing: -0.3}}>Rekomendasi Pupuk Cerdas</div>
        <div style={{fontSize: 14.5, color: '#222', marginTop: 4}}>Dapatkan rekomendasi pupuk sesuai kondisi tanaman</div>
      </div>

      {/* card 1 */}
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 118,
          width: 512,
          padding: '16px 14px 4px',
          borderRadius: 20,
          background: '#fff',
          boxShadow: '0 4px 22px rgba(20,40,28,0.1)',
          zIndex: 3,
          ...card(12),
        }}
      >
        <Field
          label="Jenis Tanaman"
          icon="sprout"
          highlight={fieldHi}
          value={<Roll from="Pilih tanaman" to="Melon" k={rollK} color={rollK < 0.5 ? '#6d756f' : C.ink} />}
        />
        <Field label="Varietas (opsional)" icon="shapes" value="Semua Varietas" />
      </div>

      {/* card 2 */}
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 342,
          width: 512,
          padding: '16px 14px 4px',
          borderRadius: 20,
          background: '#fff',
          boxShadow: '0 4px 22px rgba(20,40,28,0.1)',
          ...card(18),
        }}
      >
        <Field
          label="Umur Tanaman (HST)"
          icon="calendar"
          highlight={ageHi}
          value={`${String(ageN).padStart(2, '0')} Hari`}
        />
        <Field
          label="Luas Lahan"
          icon="ruler"
          highlight={areaHi}
          value={showArea ? '1' : <span style={{color: '#8a928c'}}>0</span>}
          trailing={
            <div style={{display: 'flex', alignItems: 'center', gap: 4, fontSize: 15, fontWeight: 700}}>
              ha <Icon name="chevronDown" size={18} color="#111" sw={2.4} />
            </div>
          }
        />
      </div>

      {/* tip */}
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 560,
          width: 512,
          borderRadius: 16,
          background: '#E5F2E8',
          padding: '14px 16px',
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          ...card(26),
        }}
      >
        <div style={{width: 40, height: 40, borderRadius: 11, background: '#CFE5D5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="info" size={22} color={C.primaryDeep} />
        </div>
        <div>
          <div style={{fontSize: 15, fontWeight: 700, color: C.primaryDeep}}>Tips Rekomendasi Akurat</div>
          <div style={{fontSize: 12.5, color: '#27402f', marginTop: 2, lineHeight: 1.35}}>
            Isi umur tanaman dan luas lahan dengan benar agar hasil rekomendasi lebih tepat.
          </div>
        </div>
      </div>

      {/* dropdown overlay */}
      <div
        style={{
          position: 'absolute',
          left: 28,
          top: 216,
          width: 484,
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 20px 50px rgba(10,40,25,0.28), 0 0 0 1px rgba(0,0,0,0.06)',
          padding: 8,
          zIndex: 8,
          opacity: dd,
          transform: `translateY(${(1 - dd) * -14}px) scale(${0.96 + dd * 0.04})`,
          transformOrigin: '50% 0',
          pointerEvents: 'none',
        }}
      >
        <div style={{position: 'relative'}}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: hoverIdx * 48,
              height: 48,
              borderRadius: 11,
              background: '#DDEFE2',
            }}
          />
          {OPTIONS.map((o, i) => (
            <div
              key={o}
              style={{
                position: 'relative',
                height: 48,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                fontSize: 16.5,
                color: Math.abs(hoverIdx - i) < 0.5 ? C.primaryDeep : C.ink,
                fontWeight: Math.abs(hoverIdx - i) < 0.5 ? 700 : 400,
                gap: 10,
              }}
            >
              <Icon name="sprout" size={20} color={C.primary} />
              {o}
            </div>
          ))}
        </div>
      </div>

      {/* analyze sweep */}
      {loading ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 40 + sweep * 800,
            height: 90,
            background: 'linear-gradient(180deg, rgba(79,175,98,0) 0%, rgba(79,175,98,0.22) 60%, rgba(166,234,110,0.55) 100%)',
            borderBottom: `2px solid ${C.lime}`,
            zIndex: 9,
            opacity: 1 - p(f, tapAt + 16, 8),
          }}
        />
      ) : null}

      {/* CTA */}
      <div
        style={{
          position: 'absolute',
          left: 14,
          right: 14,
          top: 862,
          height: 54,
          borderRadius: 16,
          background: loading ? C.primary : `rgb(${Math.round(160 - ready * 150)},${Math.round(190 - ready * 100)},${Math.round(170 - ready * 115)})`,
          color: '#fff',
          fontSize: 17,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transform: `scale(${1 - press * 0.03 + (ready > 0.5 && !loading ? bob(f, 28) * 0.006 : 0)})`,
          boxShadow: ready > 0.5 ? `0 8px 22px rgba(15,90,55,${0.35 * ready})` : 'none',
          zIndex: 7,
        }}
      >
        {loading ? (
          <>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                border: '3px solid rgba(255,255,255,0.35)',
                borderTopColor: '#fff',
                transform: `rotate(${f * 24}deg)`,
              }}
            />
            Menganalisis...
          </>
        ) : (
          'Dapatkan Rekomendasi'
        )}
      </div>

      <BottomNav active="pupuk" />
      <TapRipple x={TAP.getRec.x} y={TAP.getRec.y} pressAt={tapAt} from={{dx: -100, dy: 160}} />
    </div>
  );
};
