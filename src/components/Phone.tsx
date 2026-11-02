import React from 'react';

export const SCREEN_W = 540;
export const SCREEN_H = 1024;
export const BEZEL = 16;
export const PHONE_W = SCREEN_W + BEZEL * 2;
export const PHONE_H = SCREEN_H + BEZEL * 2;
const R_OUT = 78;
const R_IN = 62;

/**
 * Device shell. `children` is the 540x1024 app canvas.
 * A stack of dark slabs behind the body gives real thickness when the camera orbits.
 */
export const Phone: React.FC<{children: React.ReactNode; glare?: number}> = ({children, glare = 0.5}) => {
  const slabs = Array.from({length: 7}, (_, i) => i + 1);
  return (
    <div
      style={{
        position: 'relative',
        width: PHONE_W,
        height: PHONE_H,
        transformStyle: 'preserve-3d',
      }}
    >
      {slabs.map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: R_OUT,
            background: i % 2 ? '#1a201c' : '#121613',
            transform: `translateZ(${-i * 2.4}px)`,
          }}
        />
      ))}
      {/* side keys */}
      <div style={{position: 'absolute', right: -5, top: 250, width: 6, height: 120, borderRadius: 3, background: '#2b312d', transform: 'translateZ(-6px)'}} />
      <div style={{position: 'absolute', left: -5, top: 200, width: 6, height: 70, borderRadius: 3, background: '#2b312d', transform: 'translateZ(-6px)'}} />
      <div style={{position: 'absolute', left: -5, top: 290, width: 6, height: 70, borderRadius: 3, background: '#2b312d', transform: 'translateZ(-6px)'}} />
      {/* body */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: R_OUT,
          background: 'linear-gradient(145deg, #3a423d 0%, #101412 38%, #1f2622 100%)',
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.12), inset 0 0 0 5px #0a0c0b',
          padding: BEZEL,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: SCREEN_W,
            height: SCREEN_H,
            borderRadius: R_IN,
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          {children}
          {/* punch-hole camera */}
          <div
            style={{
              position: 'absolute',
              left: SCREEN_W / 2 - 8,
              top: 10,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#050606',
              boxShadow: '0 0 0 2px rgba(0,0,0,0.25)',
              zIndex: 50,
            }}
          />
          {/* glass reflection */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 60,
              background: `linear-gradient(112deg, rgba(255,255,255,${0.2 * glare}) 0%, rgba(255,255,255,${0.05 * glare}) 22%, rgba(255,255,255,0) 42%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
