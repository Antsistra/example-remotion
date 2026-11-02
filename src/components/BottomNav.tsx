import React from 'react';
import {C, UI_FONT} from '../theme';
import {Icon, IconName} from './Icon';

export type NavKey = 'home' | 'pupuk' | 'chat' | 'edu' | 'profil';

const ITEMS: Array<{key: NavKey; label: string; icon: IconName}> = [
  {key: 'home', label: 'Beranda', icon: 'home'},
  {key: 'pupuk', label: 'Pupuk', icon: 'leaf'},
  {key: 'chat', label: 'Tanya Tani', icon: 'chat'},
  {key: 'edu', label: 'Edukasi', icon: 'school'},
  {key: 'profil', label: 'Profil', icon: 'person'},
];

/** Floating pill navigation from the app (Beranda / Pupuk / Tanya Tani / Edukasi / Profil). */
export const BottomNav: React.FC<{active: NavKey; pressed?: NavKey; pressAmt?: number}> = ({
  active,
  pressed,
  pressAmt = 0,
}) => {
  const colW = 508 / 5;
  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 14,
        height: 80,
        borderRadius: 40,
        background: '#fff',
        boxShadow: '0 6px 26px rgba(15,40,25,0.16), 0 0 0 1px rgba(15,40,25,0.05)',
        fontFamily: UI_FONT,
        zIndex: 20,
      }}
    >
      {ITEMS.map((it, i) => {
        const isActive = it.key === active;
        const isChat = it.key === 'chat';
        const press = pressed === it.key ? pressAmt : 0;
        const left = i * colW;
        if (isChat) {
          return (
            <div
              key={it.key}
              style={{
                position: 'absolute',
                left,
                width: colW,
                top: -20,
                height: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: isActive ? C.primary : '#D3E0D6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? '0 6px 16px rgba(45,106,63,0.42)' : '0 3px 10px rgba(15,40,25,0.12)',
                  transform: `scale(${1 - press * 0.12})`,
                  border: '4px solid #fff',
                }}
              >
                <Icon name="chat" size={26} color={isActive ? '#fff' : C.primary} filled={isActive} />
              </div>
              <div
                style={{
                  marginTop: 9,
                  fontSize: 12.5,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? C.primary : '#66706a',
                }}
              >
                {it.label}
              </div>
            </div>
          );
        }
        return (
          <div
            key={it.key}
            style={{
              position: 'absolute',
              left: left + 4,
              width: colW - 8,
              top: 10,
              height: 60,
              borderRadius: 24,
              background: isActive ? '#E2EEE5' : 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              transform: `scale(${1 - press * 0.1})`,
              color: isActive ? C.primary : '#5d6761',
            }}
          >
            <Icon name={it.icon} size={24} color={isActive ? C.primary : '#5d6761'} filled={isActive} sw={1.8} />
            <div style={{fontSize: 12.5, fontWeight: isActive ? 700 : 400}}>{it.label}</div>
          </div>
        );
      })}
    </div>
  );
};
