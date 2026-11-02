import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, UI_FONT} from '../theme';
import {E, bob, p, pop, tween} from '../anim';
import {Icon} from '../components/Icon';
import {BottomNav} from '../components/BottomNav';
import {TapRipple} from '../components/TapRipple';
import {TAP} from '../timeline';

/** Local-time beats, exported so the 3D floaters in PhoneAct can sync to them. */
export const CHAT = {
  typeStart: 10,
  send: 40,
  dots: 54,
  streamStart: 70,
  streamEnd: 128,
  label: 130,
  cards: [134, 142, 150, 158],
  scrollStart: 100,
  scrollEnd: 168,
};

const QUESTION = 'Pupuk apa yang cocok untuk padi?';

const P1 =
  'Untuk tanaman padi, penggunaan pupuk yang tepat sangat bergantung pada fase pertumbuhannya. Pada fase vegetatif, Anda memerlukan pupuk dengan kandungan nitrogen tinggi seperti Pupuk Urea. Untuk pertumbuhan akar dan penguatan batang, Pupuk SP-36 sangat disarankan.';
const P2 = 'Berapa usia tanaman padi Anda saat ini agar saya bisa memberikan rekomendasi dosis yang lebih spesifik?';

const W1 = P1.split(' ');
const W2 = P2.split(' ');
const ALL = W1.length + W2.length;

const PRODUCTS = [
  {name: 'Pupuk Urea', price: 'Rp 125.000/pcs'},
  {name: 'Pupuk SP-36', price: 'Rp 115.000/pcs'},
  {name: 'Meroke Pupuk NPK Mutiara 16 16 16 Kemasan 1kg Pupuk Seimbang Masa Pertumbuhan', price: 'Rp 35.000/pcs'},
  {name: 'Pupuk KCL', price: 'Rp 135.000/pcs'},
];

const Words: React.FC<{words: string[]; offset: number; progress: number}> = ({words, offset, progress}) => (
  <>
    {words.map((w, i) => {
      const k = Math.min(1, Math.max(0, progress * (ALL + 3) - (offset + i)));
      return (
        <span
          key={i}
          style={{
            opacity: k,
            display: 'inline-block',
            transform: `translateY(${(1 - k) * 6}px)`,
            filter: k < 1 ? `blur(${(1 - k) * 3}px)` : undefined,
            marginRight: '0.28em',
            color: k > 0 && k < 1 ? C.primary : undefined,
          }}
        >
          {w}
        </span>
      );
    })}
  </>
);

const Avatar: React.FC<{size?: number}> = ({size = 36}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 11,
      background: C.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Icon name="leaf" size={size * 0.55} color="#fff" filled sw={1} />
  </div>
);

/** "Tanya Tani" — AI farming assistant chat. Local time 0 = mount. */
export const ChatScreen: React.FC<{tapAt: number}> = ({tapAt}) => {
  const f = useCurrentFrame();

  const typedN = Math.floor(tween(f, 0, QUESTION.length, CHAT.typeStart, CHAT.send - 8, E.linear));
  const typing = f < CHAT.send;
  const sendPress = tween(f, 0, 1, CHAT.send - 4, CHAT.send, E.out) * (1 - tween(f, 0, 1, CHAT.send, CHAT.send + 8, E.out));

  const bubble = p(f, CHAT.send, 20, E.out);
  const dotsIn = p(f, CHAT.dots, 8, E.out) * (1 - p(f, CHAT.streamStart + 4, 6, E.in));
  const streamK = tween(f, 0, 1, CHAT.streamStart, CHAT.streamEnd, E.soft);
  const aiBubble = p(f, CHAT.streamStart, 12, E.out);
  const grow = tween(f, 0, 1, CHAT.streamStart, CHAT.streamEnd, E.soft);

  const scroll = tween(f, 0, 196, CHAT.scrollStart, CHAT.scrollEnd, E.soft);
  const headerBar = p(f, 4, 20, E.out);
  const banner = pop(f, 10, {damping: 15, stiffness: 120});
  const hl = tween(f, 0, 1, 152, 162, E.out) * (1 - tween(f, 0, 1, 172, 184, E.in));

  return (
    <div style={{position: 'absolute', inset: 0, background: '#F7F8F5', fontFamily: UI_FONT, overflow: 'hidden'}}>
      {/* scroll column */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 540, transform: `translateY(${-scroll}px)`}}>
        {/* WhatsApp banner */}
        <div
          style={{
            position: 'absolute',
            left: 16,
            top: 86,
            width: 508,
            height: 76,
            borderRadius: 18,
            background: '#E3F6E8',
            border: '1px solid #BFE9CB',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 14,
            opacity: Math.min(1, banner * 2),
            transform: `translateY(${(1 - banner) * -30}px)`,
          }}
        >
          <div style={{width: 42, height: 42, borderRadius: 21, background: C.wa, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="headset" size={24} color="#fff" />
          </div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 15.5, fontWeight: 700, color: '#0F2A1A'}}>Butuh jawaban lebih akurat?</div>
            <div style={{fontSize: 12.5, color: '#2B4B38', marginTop: 2, whiteSpace: 'nowrap'}}>Konsultasikan percakapan ini ke Penyuluh via WhatsApp</div>
          </div>
          <div style={{width: 44, height: 44, borderRadius: 22, background: C.wa, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="chevronRight" size={24} color="#0b2b17" sw={2.4} />
          </div>
        </div>

        {/* user bubble */}
        <div
          style={{
            position: 'absolute',
            right: 16,
            top: 180,
            maxWidth: 420,
            background: C.primary,
            color: '#fff',
            fontSize: 16.5,
            padding: '13px 16px',
            borderRadius: '18px 18px 4px 18px',
            opacity: Math.min(1, bubble * 3),
            transform: `translate(${(1 - bubble) * 30}px, ${(1 - bubble) * 640}px) scale(${0.7 + bubble * 0.3})`,
            transformOrigin: '100% 100%',
            whiteSpace: 'nowrap',
          }}
        >
          {QUESTION}
        </div>

        {/* AI row */}
        <div style={{position: 'absolute', left: 16, top: 244, width: 508, display: 'flex', gap: 10, alignItems: 'flex-start'}}>
          <div style={{opacity: Math.min(1, p(f, CHAT.dots, 8) * 2), transform: `scale(${pop(f, CHAT.dots, {damping: 12})})`}}>
            <Avatar />
          </div>
          <div style={{position: 'relative', width: 454}}>
            {/* typing dots */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                background: '#E4F0E6',
                borderRadius: '6px 18px 18px 18px',
                padding: '16px 18px',
                display: 'flex',
                gap: 6,
                opacity: dotsIn,
                transform: `scale(${0.8 + dotsIn * 0.2})`,
                transformOrigin: '0 0',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div key={i} style={{width: 9, height: 9, borderRadius: 5, background: C.primary, opacity: 0.45 + 0.55 * Math.max(0, bob(f, 18, -i * 4))}} />
              ))}
            </div>
            {/* answer */}
            <div
              style={{
                background: '#E4F0E6',
                borderRadius: '6px 18px 18px 18px',
                padding: '16px 18px',
                fontSize: 15.5,
                lineHeight: 1.5,
                color: '#1E2A22',
                opacity: aiBubble,
                clipPath: `inset(0 0 ${(1 - grow) * 100}% 0 round 18px)`,
              }}
            >
              <div>
                <Words words={W1} offset={0} progress={streamK} />
              </div>
              <div style={{marginTop: 12}}>
                <Words words={W2} offset={W1.length} progress={streamK} />
              </div>
            </div>
          </div>
        </div>

        {/* recommended products */}
        <div style={{position: 'absolute', left: 62, top: 514, width: 462}}>
          <div style={{fontSize: 14.5, fontWeight: 500, color: '#111', opacity: p(f, CHAT.label, 12), marginBottom: 10}}>Produk Rekomendasi</div>
          {PRODUCTS.map((pr, i) => {
            const r = pop(f, CHAT.cards[i], {damping: 15, stiffness: 150});
            const emph = i === 0 ? hl : 0;
            return (
              <div
                key={pr.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 14px',
                  marginBottom: 10,
                  borderRadius: 16,
                  background: '#fff',
                  border: `1.5px solid ${emph > 0.05 ? C.primary : '#161a17'}`,
                  opacity: Math.min(1, r * 2),
                  transform: `translateX(${(1 - r) * 80}px) scale(${1 + emph * 0.02})`,
                  boxShadow: emph > 0.05 ? `0 10px 24px rgba(45,106,63,${0.28 * emph})` : 'none',
                }}
              >
                <div style={{width: 32, height: 32, borderRadius: 9, background: C.primary, flexShrink: 0}} />
                <div>
                  <div style={{fontSize: 16, fontWeight: 500, color: '#101512', lineHeight: 1.22}}>{pr.name}</div>
                  <div style={{fontSize: 13.5, color: C.primary, marginTop: 3}}>{pr.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* fixed header */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          height: 74,
          background: '#F7F8F5',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px 0',
          gap: 12,
          zIndex: 5,
          transform: `translateY(${(1 - headerBar) * -20}px)`,
        }}
      >
        <Avatar size={40} />
        <div style={{flex: 1}}>
          <div style={{fontSize: 18, fontWeight: 700, color: C.ink}}>TanyaTani</div>
          <div style={{fontSize: 13.5, color: '#333'}}>Asisten Agribisnis</div>
        </div>
        <Icon name="headset" size={26} color={C.wa} />
        <Icon name="refresh" size={24} color="#111" />
      </div>

      {/* input bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 108,
          height: 80,
          background: '#F7F8F5',
          zIndex: 6,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 54,
            borderRadius: 27,
            background: '#fff',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 22px',
            fontSize: 17,
            color: typing && typedN > 0 ? C.ink : '#6d756f',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {typing && typedN > 0 ? QUESTION.slice(0, typedN) : 'Tanya seputar pertanian...'}
          {typing && typedN > 0 && Math.floor(f / 7) % 2 === 0 ? (
            <span style={{display: 'inline-block', width: 2, height: 21, background: C.primary, marginLeft: 1}} />
          ) : null}
        </div>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 27,
            background: C.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${1 - sendPress * 0.16})`,
            boxShadow: typing && typedN > 5 ? '0 6px 16px rgba(45,106,63,0.4)' : 'none',
          }}
        >
          <Icon name="send" size={25} color="#fff" filled sw={1} />
        </div>
      </div>

      <BottomNav active="chat" pressed="pupuk" pressAmt={tween(f, 0, 1, tapAt - 3, tapAt + 1, E.out) * (1 - tween(f, 0, 1, tapAt + 2, tapAt + 8, E.out))} />
      <TapRipple x={TAP.pupuk.x} y={TAP.pupuk.y} pressAt={tapAt} from={{dx: 120, dy: -170}} />
    </div>
  );
};
