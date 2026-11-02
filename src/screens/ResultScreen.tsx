import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, UI_FONT} from '../theme';
import {E, idr, p, pop, tween} from '../anim';
import {Icon, IconName} from '../components/Icon';

/** Local-time beats for the result screen (exported for the 3D data-viz panels). */
export const RESULT = {
  summary: 8,
  standar: 26,
  period: 44,
  card1: 52,
  count1: 62,
  note: 92,
  scrollStart: 112,
  scrollEnd: 142,
  count2: 124,
};

const SummaryItem: React.FC<{icon: IconName; label: string; value: string; d: number; f: number}> = ({icon, label, value, d, f}) => {
  const r = p(f, d, 20, E.out);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: Math.min(1, r * 2), transform: `translateY(${(1 - r) * 18}px)`}}>
      <div style={{width: 38, height: 38, borderRadius: 10, background: '#CBDACF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
        <Icon name={icon} size={21} color={C.primaryDeep} />
      </div>
      <div style={{minWidth: 0}}>
        <div style={{fontSize: 12.5, color: '#4a554e'}}>{label}</div>
        <div style={{fontSize: 16, fontWeight: 700, color: C.ink, lineHeight: 1.15}}>{value}</div>
      </div>
    </div>
  );
};

const Row: React.FC<{icon: IconName; bold: string; text: string}> = ({icon, bold, text}) => (
  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: '#222', lineHeight: 1.35, marginBottom: 9}}>
    <Icon name={icon} size={19} color="#2c3a31" style={{marginTop: 1}} />
    <div>
      <b>{bold}</b> {text}
    </div>
  </div>
);

const Fert: React.FC<{
  name: string;
  amount: number;
  perHa: number;
  usage: string;
  f: number;
  d: number;
  countAt: number;
  note?: boolean;
  noteK?: number;
  highlight?: number;
  line2?: string;
}> = ({name, amount, perHa, usage, f, d, countAt, note, noteK = 0, highlight = 0, line2}) => {
  const r = pop(f, d, {damping: 17, stiffness: 120});
  const n = tween(f, 0, amount, countAt, countAt + 34, E.out);
  return (
    <div
      style={{
        borderRadius: 20,
        background: '#fff',
        boxShadow: '0 4px 20px rgba(20,40,28,0.1)',
        padding: '16px 16px 14px',
        marginBottom: 16,
        opacity: Math.min(1, r * 2),
        transform: `translateY(${(1 - r) * 110}px)`,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 54, height: 54, borderRadius: 14, background: '#DCE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="flask" size={30} color={C.primaryDeep} filled sw={1.2} />
        </div>
        <div style={{flex: 1}}>
          <div style={{fontSize: 17, fontWeight: 700, color: C.ink}}>{name}</div>
          {line2 ? <div style={{fontSize: 13.5, color: '#444', marginTop: 3}}>{line2}</div> : null}
        </div>
        <div style={{textAlign: 'right'}}>
          <div
            style={{
              display: 'inline-block',
              background: '#D6E8DA',
              color: C.primaryDeep,
              fontWeight: 700,
              fontSize: 17,
              padding: '7px 14px',
              borderRadius: 11,
              boxShadow: highlight > 0.05 ? `0 0 0 ${5 * highlight}px rgba(79,175,98,${0.35 * (1 - highlight * 0.4)})` : 'none',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {idr(n)} KG
          </div>
          <div style={{fontSize: 12.5, color: '#444', marginTop: 6}}>{idr(n)} KG/ha</div>
        </div>
      </div>
      <div style={{height: 1, background: '#cfd6d1', margin: '14px 0 12px'}} />
      <Row icon="repeat" bold="Frekuensi:" text="1 kali di awal" />
      <Row icon="grid" bold="Est. Populasi:" text="± 40.000 tanaman" />
      <Row icon="book" bold="Cara Pakai:" text={usage} />
      {note ? (
        <div
          style={{
            marginTop: 12,
            borderRadius: 14,
            border: '1px solid #BFD6C6',
            background: '#F2F7F3',
            padding: '14px 14px 12px',
            opacity: noteK,
            transform: `translateY(${(1 - noteK) * 20}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 700, color: C.primaryDeep, marginBottom: 8}}>
            <Icon name="info" size={19} color={C.primaryDeep} /> Petunjuk Takaran Aplikasi
          </div>
          <div style={{fontSize: 13.5, color: '#222', lineHeight: 1.45}}>
            Total kebutuhan pupuk selama periode <b>8 hari (0 - 7 HST)</b> adalah <b>12000 KG</b>. Dengan frekuensi <b>1 kali di awal</b>, pupuk dibagi menjadi <b>1 kali aplikasi</b>.
          </div>
          <div style={{fontSize: 13.5, color: '#222', lineHeight: 1.45, marginTop: 8}}>
            Takaran sekali pemupukan:{' '}
            <span
              style={{
                color: C.primaryDeep,
                fontWeight: 700,
                background: `linear-gradient(transparent 55%, rgba(166,234,110,${0.7 * highlight}) 55%)`,
              }}
            >
              12000.0 KG
            </span>{' '}
            (sekitar <b>300.00 gram/tanaman</b> per tanaman).
          </div>
        </div>
      ) : null}
    </div>
  );
};

/** "Hasil Rekomendasi". Local time 0 = mount. */
export const ResultScreen: React.FC = () => {
  const f = useCurrentFrame();

  const scroll = tween(f, 0, 290, RESULT.scrollStart, RESULT.scrollEnd, E.soft);
  const headerR = p(f, 2, 18, E.out);

  const standarW = tween(f, 0, 100, RESULT.standar, RESULT.standar + 22, E.inOut);
  const checkK = p(f, RESULT.standar + 14, 14, E.back);
  const infoR = p(f, RESULT.standar + 12, 22, E.out);
  const periodR = p(f, RESULT.period, 20, E.out);
  const noteK = p(f, RESULT.note, 20, E.out);
  const hl = tween(f, 0, 1, RESULT.note + 14, RESULT.note + 28, E.out);
  const btnR = pop(f, 22, {damping: 15, stiffness: 120});
  const pulse = tween(f, 0, 1, 130, 142, E.out);

  return (
    <div style={{position: 'absolute', inset: 0, background: '#F4F6F3', fontFamily: UI_FONT, overflow: 'hidden'}}>
      {/* scrolling content */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 540, transform: `translateY(${-scroll}px)`}}>
        {/* summary card */}
        <div
          style={{
            position: 'absolute',
            left: 14,
            top: 76,
            width: 512,
            borderRadius: 22,
            background: '#E5EAE6',
            padding: '18px 18px',
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            rowGap: 20,
            columnGap: 8,
            boxShadow: '0 4px 18px rgba(20,40,28,0.08)',
          }}
        >
          <SummaryItem icon="sprout" label="Tanaman" value="Melon" d={RESULT.summary} f={f} />
          <SummaryItem icon="shapes" label="Varietas" value="Melon Ber-Net (Rock Melon)" d={RESULT.summary + 4} f={f} />
          <SummaryItem icon="calendar" label="Umur Tanaman" value="7 HST" d={RESULT.summary + 8} f={f} />
          <SummaryItem icon="ruler" label="Luas Lahan" value="1 ha" d={RESULT.summary + 12} f={f} />
        </div>

        {/* Standar bar */}
        <div style={{position: 'absolute', left: 14, top: 250, width: 512, height: 72, borderRadius: 18, background: '#DDE7DF', overflow: 'hidden'}}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: C.primary,
              clipPath: `inset(0 ${100 - standarW}% 0 0)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 16.5,
              fontWeight: 700,
              gap: 3,
            }}
          >
            <div style={{transform: `scale(${checkK})`}}>
              <Icon name="checkCircle" size={26} color="#fff" />
            </div>
            Standar
          </div>
        </div>

        {/* Standar info */}
        <div
          style={{
            position: 'absolute',
            left: 14,
            top: 340,
            width: 512,
            borderRadius: 18,
            background: '#E5EAE6',
            padding: '16px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            opacity: infoR,
            transform: `translateY(${(1 - infoR) * 24}px)`,
          }}
        >
          <div style={{width: 46, height: 46, borderRadius: 12, background: '#CBDACF', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="check" size={26} color={C.primaryDeep} sw={2.6} />
          </div>
          <div>
            <div style={{fontSize: 16, fontWeight: 700, color: C.ink}}>Standar</div>
            <div style={{fontSize: 13.5, color: '#3b463f', marginTop: 2}}>Pilihan seimbang untuk kondisi ini.</div>
          </div>
        </div>

        {/* Periode */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 428,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            opacity: periodR,
            transform: `translateX(${(1 - periodR) * -30}px)`,
          }}
        >
          <Icon name="clock" size={22} color="#111" />
          <div>
            <div style={{fontSize: 12.5, color: '#444'}}>Periode</div>
            <div style={{fontSize: 17, fontWeight: 700, color: C.ink}}>0 - 7 HST</div>
          </div>
        </div>

        {/* fertilizer cards */}
        <div style={{position: 'absolute', left: 14, top: 500, width: 512}}>
          <Fert
            name="Dolomit"
            line2="2-4 kg / meter bedengan."
            amount={12000}
            perHa={12000}
            usage="Ditabur merata pada bedengan saat pengolahan lahan."
            f={f}
            d={RESULT.card1}
            countAt={RESULT.count1}
            note
            noteK={noteK}
            highlight={hl}
          />
          <Fert
            name="NPK 16-16-16"
            amount={720}
            perHa={720}
            usage="Ditabur merata di atas bedengan sebelum ditutup mulsa MPHP."
            f={f}
            d={RESULT.card1 + 10}
            countAt={RESULT.count2}
          />
        </div>
      </div>

      {/* fixed header */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 68,
          background: '#F4F6F3',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 18px 0',
          opacity: headerR,
        }}
      >
        <Icon name="back" size={26} color="#111" sw={2.2} />
        <div style={{fontSize: 18, fontWeight: 500, color: C.ink}}>Hasil Rekomendasi</div>
        <Icon name="refresh" size={22} color="#111" />
      </div>

      {/* bottom action bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 84,
          background: 'linear-gradient(180deg, rgba(244,246,243,0) 0%, #F4F6F3 38%)',
          zIndex: 6,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 12,
          padding: '0 8px 14px',
          transform: `translateY(${(1 - btnR) * 100}px)`,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 44,
            borderRadius: 22,
            border: `1.5px solid ${C.primaryDeep}`,
            background: '#fff',
            color: C.primaryDeep,
            fontWeight: 700,
            fontSize: 15.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Hitung Ulang
        </div>
        <div
          style={{
            flex: 1.25,
            height: 44,
            borderRadius: 22,
            background: C.wa,
            color: '#0B2B17',
            fontWeight: 700,
            fontSize: 15.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            boxShadow: `0 0 0 ${8 * pulse * (1 - pulse)}px rgba(34,212,104,0.5)`,
            transform: `scale(${1 + 0.04 * Math.sin(pulse * Math.PI)})`,
          }}
        >
          <Icon name="chat" size={20} color="#0B2B17" filled sw={1} />
          Tanya Penyuluh
        </div>
      </div>
    </div>
  );
};
