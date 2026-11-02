import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {C, DISPLAY_FONT, H, W} from '../theme';
import {E, p, spline, tween} from '../anim';
import {T, TAP} from '../timeline';
import {Phone, PHONE_H, PHONE_W} from '../components/Phone';
import {ScreenReveal} from '../components/TapRipple';
import {Kicker, Seg, WordReveal} from '../components/Kinetic';
import {
  AIBadge,
  AIOrb,
  BagFloat,
  CartFloat,
  DiscountSeal,
  Floater,
  ParamChip,
  ProductFloat,
  ProgressBadge,
  RecChip,
  SellFloat,
} from '../components/Floaters';
import {DosageRing, NeedBars, PeriodTrack} from '../components/DataViz';
import {HomeScreen} from '../screens/HomeScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {FormScreen} from '../screens/FormScreen';
import {ResultScreen} from '../screens/ResultScreen';

const PHONE_SCALE = 1.22;
const CX = W / 2;
const CY = 1100;

/** Camera path through the whole phone act, keyed on global frames. */
const camera = (g: number) => ({
  rx: spline(g, [[84, 34], [128, 8], [200, 5], [256, 7], [330, 6], [450, 3], [520, 0], [564, 4], [620, 10], [700, 10], [750, 0]]),
  ry: spline(g, [[84, -40], [128, -22], [180, -6], [230, 10], [256, 14], [300, 4], [360, -8], [420, -14], [450, -8], [500, 4], [560, 6], [600, -24], [660, -28], [722, -14], [750, 0]]),
  rz: spline(g, [[84, 12], [128, 0], [256, -1], [330, 1], [450, 0], [620, -2], [722, 0]]),
  x: spline(g, [[84, 0], [564, 0], [620, -190], [700, -200], [750, -100]]),
  y: spline(g, [[84, 1100], [128, 0], [722, 0], [750, -40]]),
  z: spline(g, [[84, -600], [128, 0], [236, 20], [258, 100], [300, 10], [420, 40], [448, 110], [480, 10], [540, 40], [564, 110], [620, -260], [700, -260], [736, -330], [750, -700]]),
});

type Head = {idx: string; kicker: string; l1: Seg[]; l2: Seg[]; inAt: number; outAt: number};
const L = C.lime;
const HEADS: Head[] = [
  {
    idx: '01',
    kicker: 'MARKETPLACE',
    l1: [{t: 'Belanja'}, {t: 'kebutuhan'}, {t: 'tani,'}],
    l2: [{t: 'jual', color: L}, {t: 'hasil', color: L}, {t: 'panen.', color: L}],
    inAt: 100,
    outAt: 236,
  },
  {
    idx: '02',
    kicker: 'TANYA TANI AI',
    l1: [{t: 'Tanya'}, {t: 'apa'}, {t: 'saja,'}],
    l2: [{t: 'langsung', color: L}, {t: 'dapat', color: L}, {t: 'solusi.', color: L}],
    inAt: 270,
    outAt: 430,
  },
  {
    idx: '03',
    kicker: 'REKOMENDASI PUPUK',
    l1: [{t: 'Pupuk'}, {t: 'tepat'}, {t: 'untuk'}],
    l2: [{t: 'setiap', color: L}, {t: 'tanaman.', color: L}],
    inAt: 464,
    outAt: 550,
  },
  {
    idx: '04',
    kicker: 'DOSIS PRESISI',
    l1: [{t: 'Jenis,'}, {t: 'dosis,'}, {t: 'dan'}],
    l2: [{t: 'cara', color: L}, {t: 'pakai.', color: L}, {t: 'Jelas.', color: L}],
    inAt: 578,
    outAt: 704,
  },
];

const Headlines: React.FC<{g: number}> = ({g}) => (
  <>
    {HEADS.map((h) => {
      if (g < h.inAt - 2 || g > h.outAt + 40) return null;
      return (
        <Sequence key={h.idx} from={h.inAt} durationInFrames={h.outAt - h.inAt + 40}>
          <div style={{position: 'absolute', left: 64, top: 96, zIndex: 30}}>
            <Kicker text={h.kicker} index={h.idx} start={0} outAt={h.outAt - h.inAt} />
            <div style={{marginTop: 22}}>
              <WordReveal lines={[h.l1, h.l2]} start={4} size={66} stagger={3} outAt={h.outAt - h.inAt} lineHeight={1.1} />
            </div>
          </div>
        </Sequence>
      );
    })}
  </>
);

const STEPS = [
  {label: 'Marketplace', a: 84, b: 256},
  {label: 'Tanya Tani AI', a: 256, b: 450},
  {label: 'Pupuk Cerdas', a: 450, b: 722},
];

const Steps: React.FC<{g: number}> = ({g}) => {
  const vis = p(g, 112, 20, E.out) * (1 - p(g, 704, 14, E.in));
  return (
    <div style={{position: 'absolute', left: 64, right: 64, top: 1796, display: 'flex', gap: 22, opacity: vis, transform: `translateY(${(1 - vis) * 24}px)`, zIndex: 30}}>
      {STEPS.map((s) => {
        const k = tween(g, 0, 1, s.a, s.b, E.linear);
        const active = g >= s.a && g < s.b;
        return (
          <div key={s.label} style={{flex: 1}}>
            <div style={{height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.18)', overflow: 'hidden'}}>
              <div style={{height: '100%', width: `${k * 100}%`, background: C.lime}} />
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: DISPLAY_FONT,
                fontSize: 24,
                fontWeight: active ? 700 : 500,
                color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                letterSpacing: '-0.01em',
              }}
            >
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * The phone act. Rendered in *global* frames (not inside a Sequence) so the
 * camera and floating layers can be keyed on the master timeline.
 */
export const PhoneAct: React.FC = () => {
  const g = useCurrentFrame();
  const cam = camera(g);
  const glow = p(g, 84, 50, E.out) * (1 - p(g, 722, 28, E.in));

  const hp = (T.chatStart - 6 - T.homeStart);
  const cp = (T.formStart - 6 - T.chatStart);
  const fp = (T.resultStart - 14 - T.formStart);

  return (
    <AbsoluteFill>
      {/* light behind the device */}
      <div
        style={{
          position: 'absolute',
          left: CX - 700,
          top: CY - 700,
          width: 1400,
          height: 1400,
          background: 'radial-gradient(circle, rgba(166,234,110,0.22) 0%, rgba(62,154,91,0.1) 36%, rgba(0,0,0,0) 62%)',
          opacity: glow,
          transform: `translate(${cam.x * 0.4}px, 0)`,
        }}
      />

      <div style={{position: 'absolute', inset: 0, perspective: 2200, perspectiveOrigin: `${CX}px ${H / 2}px`}}>
        <div
          style={{
            position: 'absolute',
            left: CX,
            top: CY,
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `translate3d(${cam.x}px, ${cam.y}px, ${cam.z}px) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg) rotateZ(${cam.rz}deg)`,
          }}
        >
          {/* ---- device ---- */}
          <div
            style={{
              position: 'absolute',
              left: -PHONE_W / 2,
              top: -PHONE_H / 2,
              width: PHONE_W,
              height: PHONE_H,
              transform: `scale(${PHONE_SCALE})`,
              transformStyle: 'preserve-3d',
            }}
          >
            <Phone glare={0.55 + cam.ry / 70}>
              <Sequence from={T.homeStart} durationInFrames={T.chatStart + 30 - T.homeStart}>
                <HomeScreen tapAt={hp} />
              </Sequence>
              <Sequence from={T.chatStart} durationInFrames={T.formStart + 30 - T.chatStart}>
                <ScreenReveal x={TAP.chat.x} y={TAP.chat.y}>
                  <ChatScreen tapAt={cp} />
                </ScreenReveal>
              </Sequence>
              <Sequence from={T.formStart} durationInFrames={T.resultStart + 30 - T.formStart}>
                <ScreenReveal x={TAP.pupuk.x} y={TAP.pupuk.y}>
                  <FormScreen tapAt={fp} />
                </ScreenReveal>
              </Sequence>
              <Sequence from={T.resultStart} durationInFrames={T.actEnd - T.resultStart}>
                <ScreenReveal x={TAP.getRec.x} y={TAP.getRec.y}>
                  <ResultScreen />
                </ScreenReveal>
              </Sequence>
            </Phone>
          </div>

          {/* ---- 01 marketplace floaters ---- */}
          <Floater frame={g} x={-270} y={-380} z={150} inAt={124} outAt={236} ry={10} phase={0}>
            <ProductFloat />
          </Floater>
          <Floater frame={g} x={272} y={-205} z={230} inAt={136} outAt={238} ry={-12} phase={20}>
            <CartFloat frame={g} inAt={136} />
          </Floater>
          <Floater frame={g} x={-240} y={150} z={170} inAt={148} outAt={240} ry={10} phase={40}>
            <SellFloat />
          </Floater>
          <Floater frame={g} x={282} y={330} z={270} inAt={160} outAt={242} phase={10} amp={14}>
            <DiscountSeal frame={g} />
          </Floater>
          <Floater frame={g} x={-250} y={545} z={310} inAt={170} outAt={244} rz={-6} phase={55}>
            <BagFloat />
          </Floater>

          {/* ---- 02 tanya tani floaters ---- */}
          <Floater frame={g} x={320} y={210} z={230} inAt={268} outAt={386} phase={5}>
            <AIOrb frame={g} />
          </Floater>
          <Floater frame={g} x={-290} y={400} z={190} inAt={280} outAt={386} ry={10} phase={30}>
            <AIBadge />
          </Floater>
          <Floater frame={g} x={282} y={-60} z={230} inAt={392} outAt={440} ry={-12} phase={0}>
            <RecChip name="Pupuk Urea" price={125000} />
          </Floater>
          <Floater frame={g} x={-262} y={110} z={200} inAt={400} outAt={440} ry={10} phase={25}>
            <RecChip name="Pupuk SP-36" price={115000} tone="#3E9A5B" />
          </Floater>
          <Floater frame={g} x={282} y={265} z={250} inAt={408} outAt={440} ry={-12} phase={45}>
            <RecChip name="NPK Mutiara" price={35000} tone="#2E8B57" />
          </Floater>
          <Floater frame={g} x={-262} y={420} z={210} inAt={416} outAt={440} ry={10} phase={65}>
            <RecChip name="Pupuk KCL" price={135000} tone="#0F5A37" />
          </Floater>

          {/* ---- 03 smart fertilizer form floaters ---- */}
          <Floater frame={g} x={-262} y={-300} z={200} inAt={490} outAt={558} ry={10} phase={0}>
            <ParamChip icon="sprout" label="Tanaman" value="Melon" />
          </Floater>
          <Floater frame={g} x={270} y={-70} z={230} inAt={508} outAt={558} ry={-12} phase={30}>
            <ParamChip icon="calendar" label="Umur" value="07 HST" />
          </Floater>
          <Floater frame={g} x={-262} y={190} z={210} inAt={526} outAt={558} ry={10} phase={50}>
            <ParamChip icon="ruler" label="Luas lahan" value="1 ha" />
          </Floater>
          <Floater frame={g} x={262} y={380} z={240} inAt={546} outAt={578} ry={-12} phase={10}>
            <ProgressBadge frame={g} start={551} />
          </Floater>

          {/* ---- 04 data visualisation: exploded view ---- */}
          <Floater frame={g} x={440} y={-310} z={260} inAt={590} outAt={704} ry={-8} phase={0} amp={8}>
            <DosageRing f={g - 590} />
          </Floater>
          <Floater frame={g} x={385} y={175} z={200} inAt={606} outAt={704} ry={-8} phase={30} amp={8}>
            <NeedBars f={g - 606} />
          </Floater>
          <Floater frame={g} x={80} y={500} z={250} inAt={622} outAt={704} ry={-6} phase={60} amp={7}>
            <PeriodTrack f={g - 622} />
          </Floater>
        </div>
      </div>

      <Headlines g={g} />
      <Steps g={g} />
    </AbsoluteFill>
  );
};
