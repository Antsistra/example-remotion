import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, DISPLAY_FONT, UI_FONT} from '../theme';
import {E, bob, p, pop, tween} from '../anim';
import {Icon, IconName} from '../components/Icon';
import {BottomNav} from '../components/BottomNav';
import {BannerScene, FertBag, SeedPacket, Spinach} from '../components/ProductArt';
import {TapRipple} from '../components/TapRipple';
import {TAP} from '../timeline';

const rise = (f: number, delay: number, dist = 26) => {
  const r = p(f, delay, 22, E.out);
  return {opacity: Math.min(1, r * 1.6), transform: `translateY(${(1 - r) * dist}px)`};
};

const Weather: React.FC = () => (
  <svg width="26" height="22" viewBox="0 0 26 22">
    <circle cx="9" cy="8" r="5" fill="#F5B83D" />
    <path d="M8 19a4.500 4.500 0 0 1 .5-9 6 6 0 0 1 11.500 1.500A3.800 3.800 0 0 1 19.500 19z" fill="#E8EEF2" stroke="#C9D3D9" strokeWidth="1" />
  </svg>
);

const CATS: Array<{label: string; icon: IconName}> = [
  {label: 'Semua', icon: 'apps'},
  {label: 'AB Mix', icon: 'drop'},
  {label: 'Benih', icon: 'sprout'},
  {label: 'Media Tanam', icon: 'leaf'},
  {label: 'Peralatan Tani', icon: 'tools'},
  {label: 'Pupuk', icon: 'sprout'},
];

type Product = {name: string; price: string; unit: string; art: React.ReactNode; bg: string; official?: boolean};

const PRODUCTS: Product[] = [
  {
    name: 'Bayam segar',
    price: 'Rp 12.000',
    unit: '/ikat',
    bg: 'linear-gradient(160deg,#F3EBDC 0%,#E6D7BC 100%)',
    art: <Spinach w={190} />,
  },
  {
    name: 'Benih Cabai Merah Keriting',
    price: 'Rp 24.500',
    unit: '/pack',
    bg: 'linear-gradient(160deg,#EAF4DE 0%,#CFE5B6 100%)',
    art: <SeedPacket w={140} uid="hp" />,
    official: true,
  },
  {
    name: 'Pupuk NPK Mutiara 16-16-16',
    price: 'Rp 35.000',
    unit: '/kg',
    bg: 'linear-gradient(160deg,#E6F2EA 0%,#C4E0CD 100%)',
    art: <FertBag uid="hn" w={132} title="NPK" sub="16-16-16" c1="#9DD8B0" c2="#3E9A5B" />,
    official: true,
  },
  {
    name: 'Pupuk Organik Granul 5 kg',
    price: 'Rp 48.000',
    unit: '/sak',
    bg: 'linear-gradient(160deg,#F2EBDD 0%,#E3D3B2 100%)',
    art: <FertBag uid="ho" w={132} title="PUPUK" sub="ORGANIK" c1="#CDAA6E" c2="#A58047" />,
  },
];

const ProductCard: React.FC<{p: Product; f: number; delay: number; focus?: number}> = ({p: pr, f, delay, focus = 0}) => {
  const r = pop(f, delay, {damping: 16, stiffness: 120});
  const floatY = bob(f, 80, delay * 3) * 3;
  return (
    <div
      style={{
        width: 242,
        height: 330,
        borderRadius: 18,
        background: '#fff',
        border: `1.5px solid ${focus > 0.01 ? C.primary : '#A9B1AB'}`,
        overflow: 'hidden',
        opacity: Math.min(1, r * 2),
        transform: `translateY(${(1 - r) * 90}px) scale(${1 + focus * 0.035})`,
        boxShadow: focus > 0.01 ? `0 18px 36px rgba(15,60,35,${0.24 * focus})` : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{height: 214, background: pr.bg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{transform: `translateY(${floatY}px) scale(${1 + focus * 0.06})`}}>{pr.art}</div>
        {pr.official ? (
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 10,
              background: '#D93A2F',
              color: '#fff',
              fontSize: 11.5,
              fontWeight: 700,
              padding: '4px 9px 4px 10px',
              borderRadius: '6px 0 0 6px',
              letterSpacing: 0.2,
            }}
          >
            Official Store
          </div>
        ) : null}
      </div>
      <div style={{padding: '12px 14px 0'}}>
        <div style={{fontSize: 16.5, fontWeight: 500, color: C.ink, lineHeight: 1.2, height: 40}}>{pr.name}</div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6}}>
          <div style={{fontSize: 17, fontWeight: 700, color: C.primary}}>
            {pr.price}
            <span style={{fontSize: 12, fontWeight: 400, color: C.muted}}>{pr.unit}</span>
          </div>
          <div style={{width: 32, height: 32, borderRadius: 16, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="plus" size={18} color="#fff" sw={2.4} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SEARCH_TEXT = 'benih cabai';

/**
 * "Beranda" — the marketplace home.
 * Local time: 0 = screen mounts. Build 18..110, scroll 108..160, tap near the end.
 */
export const HomeScreen: React.FC<{tapAt: number}> = ({tapAt}) => {
  const raw = useCurrentFrame();
  // content starts building a beat after the phone begins rising
  const f = raw - 10;

  const scroll = tween(f, 0, 408, 100, 152, E.soft);
  const catDrift = tween(f, 0, 70, 74, 150, E.soft);

  const typed = Math.max(0, Math.min(SEARCH_TEXT.length, Math.floor((f - 44) * 0.55)));
  const caret = f > 40 && f < 112 && Math.floor(f / 8) % 2 === 0;
  const searchW = tween(f, 0, 500, 30, 58, E.out);

  const bannerReveal = tween(f, 0, 100, 40, 70, E.inOut);
  const cartBadge = pop(f, 74, {damping: 9, stiffness: 220});
  const focus1 = tween(f, 0, 1, 118, 132, E.out) * (1 - tween(f, 0, 1, 150, 160, E.in));

  return (
    <div style={{position: 'absolute', inset: 0, background: C.page, fontFamily: UI_FONT, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 540, height: 1400, transform: `translateY(${-scroll}px)`}}>
        {/* greeting */}
        <div style={{position: 'absolute', left: 20, top: 30, ...rise(f, 14)}}>
          <div style={{fontSize: 28, fontWeight: 700, color: C.ink, letterSpacing: -0.4}}>Halo, Petani!</div>
        </div>
        <div style={{position: 'absolute', left: 20, top: 72, fontSize: 15, color: '#1d241f', ...rise(f, 18)}}>
          Mau rawat tanaman apa hari ini?
        </div>
        <div style={{position: 'absolute', left: 20, top: 104, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, ...rise(f, 22)}}>
          <Weather />
          <span style={{color: '#222'}}>Serang</span>
          <span style={{color: C.primary, fontWeight: 700}}>30°C</span>
        </div>
        {/* bell + cart */}
        <div
          style={{
            position: 'absolute',
            right: 78,
            top: 34,
            width: 42,
            height: 42,
            borderRadius: 21,
            background: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...rise(f, 20),
          }}
        >
          <Icon name="bell" size={22} color="#111" />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 24,
            top: 32,
            width: 46,
            height: 46,
            borderRadius: 23,
            background: C.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...rise(f, 24),
          }}
        >
          <Icon name="cart" size={24} color="#fff" />
          <div
            style={{
              position: 'absolute',
              right: -4,
              top: -5,
              minWidth: 22,
              height: 22,
              borderRadius: 11,
              background: C.red,
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #fff',
              transform: `scale(${cartBadge})`,
            }}
          >
            2
          </div>
        </div>

        {/* search */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 150,
            width: searchW,
            opacity: Math.min(1, searchW / 80),
            height: 50,
            borderRadius: 14,
            border: '1.5px solid #6c726e',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 12,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <Icon name="search" size={23} color="#111" />
          <span style={{fontSize: 17, color: typed ? C.ink : '#333'}}>
            {typed ? SEARCH_TEXT.slice(0, typed) : 'Cari'}
            {caret ? <span style={{display: 'inline-block', width: 2, height: 20, background: C.primary, marginLeft: 1, verticalAlign: 'middle'}} /> : null}
          </span>
        </div>

        {/* banner */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 220,
            width: 500,
            height: 164,
            borderRadius: 16,
            overflow: 'hidden',
            clipPath: `inset(0 ${100 - bannerReveal}% 0 0 round 16px)`,
          }}
        >
          <BannerScene frame={f} w={500} h={164} />
          <div style={{position: 'absolute', left: 18, top: 12}}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(205,240,190,0.95)',
                color: '#1F5B35',
                fontSize: 10.5,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 10,
              }}
            >
              <Icon name="leaf" size={11} color="#1F5B35" filled sw={1} />
              Untuk Petani, Oleh Petani
            </div>
            <div style={{fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: 25, lineHeight: 1.05, color: '#fff', marginTop: 8, letterSpacing: -0.5}}>
              Solusi Tepat
              <br />
              <span style={{color: C.lime}}>Hasil Panen Hebat</span>
            </div>
            <div style={{fontSize: 10.5, color: 'rgba(255,255,255,0.9)', marginTop: 5, width: 200, lineHeight: 1.3}}>
              Pupuk berkualitas, harga terbaik, panen maksimal.
            </div>
          </div>
          <div style={{position: 'absolute', left: 18, bottom: 8, color: '#fff', fontSize: 12.5, fontWeight: 700}}>Diskon Launch 30%</div>
          <div
            style={{
              position: 'absolute',
              right: 14,
              top: 0,
              width: 54,
              height: 34,
              background: '#16623C',
              borderRadius: '0 0 10px 10px',
              color: C.lime,
              fontWeight: 800,
              fontFamily: DISPLAY_FONT,
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            30%
          </div>
        </div>
        {/* dots */}
        <div style={{position: 'absolute', left: 236, top: 396, display: 'flex', gap: 8, opacity: p(f, 56, 16)}}>
          <div style={{width: 26, height: 8, borderRadius: 4, background: C.primary}} />
          <div style={{width: 8, height: 8, borderRadius: 4, background: '#111'}} />
        </div>

        {/* categories */}
        <div style={{position: 'absolute', left: 20, top: 424, fontSize: 23, fontWeight: 500, color: C.ink, ...rise(f, 56)}}>Kategori</div>
        <div style={{position: 'absolute', left: 0, top: 468, width: 540, height: 110, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 20 - catDrift, top: 0, display: 'flex', gap: 32}}>
            {CATS.map((c, i) => {
              const r = pop(f, 60 + i * 4, {damping: 11, stiffness: 190});
              const active = i === 0;
              return (
                <div key={c.label} style={{width: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${r})`, opacity: Math.min(1, r * 2)}}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      background: active ? C.primary : C.mint,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: active ? '0 6px 14px rgba(45,106,63,0.35)' : 'none',
                    }}
                  >
                    <Icon name={c.icon} size={28} color={active ? '#fff' : '#12301d'} filled={c.icon === 'drop' || c.icon === 'apps' || active} />
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      width: 94,
                      textAlign: 'center',
                      fontSize: 13,
                      color: active ? C.primary : '#222',
                      fontWeight: active ? 700 : 400,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* products */}
        <div style={{position: 'absolute', left: 20, top: 586, fontSize: 23, fontWeight: 500, color: C.ink, ...rise(f, 76)}}>Produk Pilihan</div>
        {PRODUCTS.map((pr, i) => (
          <div
            key={pr.name}
            style={{
              position: 'absolute',
              left: i % 2 === 0 ? 20 : 278,
              top: 632 + Math.floor(i / 2) * 348,
              zIndex: i === 1 ? 2 : 1,
            }}
          >
            <ProductCard p={pr} f={f} delay={82 + i * 7} focus={i === 1 ? focus1 : 0} />
          </div>
        ))}
      </div>

      <BottomNav active="home" pressed="chat" pressAmt={tween(raw, 0, 1, tapAt - 3, tapAt + 1, E.out) * (1 - tween(raw, 0, 1, tapAt + 2, tapAt + 8, E.out))} />
      <TapRipple x={TAP.chat.x} y={TAP.chat.y} pressAt={tapAt} />
    </div>
  );
};
