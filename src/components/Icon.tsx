import React from 'react';

export type IconName =
  | 'home'
  | 'leaf'
  | 'chat'
  | 'school'
  | 'person'
  | 'search'
  | 'bell'
  | 'cart'
  | 'headset'
  | 'chevronRight'
  | 'chevronDown'
  | 'back'
  | 'send'
  | 'refresh'
  | 'check'
  | 'checkCircle'
  | 'flask'
  | 'repeat'
  | 'grid'
  | 'book'
  | 'info'
  | 'clock'
  | 'calendar'
  | 'ruler'
  | 'sprout'
  | 'shapes'
  | 'drop'
  | 'tools'
  | 'apps'
  | 'sparkle'
  | 'plus'
  | 'star'
  | 'upload';

const paths: Record<IconName, React.ReactNode> = {
  home: <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1z" />,
  leaf: (
    <>
      <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" />
      <path d="M4 20 14 10" data-vein="1" />
    </>
  ),
  chat: (
    <>
      <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h11A1.5 1.5 0 0 1 17 4.5V12a1.5 1.5 0 0 1-1.5 1.5H8L3 17.5z" />
      <path d="M19.5 8H20.5A1.5 1.5 0 0 1 22 9.5V21l-4-3.5h-7.5A1.5 1.5 0 0 1 9 16v-1.5" />
    </>
  ),
  school: (
    <>
      <path d="M12 4 2 9l10 5 8-4v6h2V9z" />
      <path d="M6 13.2V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-3.8l-6 3z" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-3.9 3.6-6.5 8-6.5s8 2.6 8 6.5z" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.2" />
      <path d="M15.2 15.2 21 21" />
    </>
  ),
  bell: (
    <>
      <path d="M6 17v-6a6 6 0 1 1 12 0v6l2 2H4z" />
      <path d="M10 21.5h4" />
    </>
  ),
  cart: (
    <>
      <path d="M2.5 3.5H5l2.6 11.5h10.2l2.2-8.5H6.2" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 14v-2.5a7.5 7.5 0 0 1 15 0V14" />
      <rect x="3.5" y="13" width="4" height="6.5" rx="1.6" />
      <rect x="16.5" y="13" width="4" height="6.5" rx="1.6" />
      <path d="M19 19.5c0 1.4-1.8 2.2-4.5 2.2" />
    </>
  ),
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronDown: <path d="m5 9 7 7 7-7" />,
  back: <path d="m15 5-7 7 7 7" />,
  send: <path d="M3 20 21.5 12 3 4v6.5L14 12 3 13.5z" />,
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.5 3.8v5h-5" />
    </>
  ),
  check: <path d="m5 12.5 4.8 4.8L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m7.6 12.4 3.2 3.2 5.6-6" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3h5" />
      <path d="M10.2 3v6L4.6 18.6a1.6 1.6 0 0 0 1.4 2.4h12a1.6 1.6 0 0 0 1.4-2.4L13.8 9V3" />
      <path d="M7.3 14.5h9.4" />
    </>
  ),
  repeat: (
    <>
      <path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19" />
      <path d="m16 3 3 3-3 3" />
      <path d="M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5" />
      <path d="m8 21-3-3 3-3" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
      <path d="M3.5 9.5h17M3.5 14.8h17M9.2 4v16M14.8 4v16" />
    </>
  ),
  book: (
    <>
      <path d="M3 5.5c2-1 5-1 9 1 4-2 7-2 9-1V19c-2-1-5-1-9 1-4-2-7-2-9-1z" />
      <path d="M12 6.5V20" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 11v5.5M12 7.6v.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 6.8V12l3.4 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2.4" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  ruler: (
    <>
      <path d="M4 20V4l16 16z" />
      <path d="M8 20v-3M12 20v-3M4 16h3M4 12h3" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 13C12 8.8 9.2 6.4 4.6 6.4c0 4.2 2.2 6.6 7.4 6.6z" />
      <path d="M12 15c0-3.2 2.2-5.4 6.4-5.4 0 3.2-2.200 5.400-6.4 5.400z" />
    </>
  ),
  shapes: (
    <>
      <path d="M7 3 3 10h8z" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
      <circle cx="7" cy="17.5" r="3.5" />
    </>
  ),
  drop: <path d="M12 3C8 8 5 11 5 15a7 7 0 0 0 14 0c0-4-3-7-7-12z" />,
  tools: (
    <>
      <path d="M14.6 5.2a4.2 4.2 0 0 0-5.300 5.300L3 16.800 7.200 21l6.300-6.300a4.200 4.200 0 0 0 5.300-5.300l-2.800 2.800-2.700-.6-.6-2.700z" />
    </>
  ),
  apps: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
    </>
  ),
  sparkle: <path d="M12 2.5 14.3 9.7 21.500 12 14.300 14.300 12 21.500 9.700 14.300 2.500 12 9.700 9.700z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  star: <path d="m12 3.2 2.700 5.600 6.100.8-4.500 4.200 1.100 6-5.400-3-5.400 3 1.100-6L3.200 9.600l6.100-.8z" />,
  upload: (
    <>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 15v4a1.500 1.500 0 0 0 1.500 1.500h13A1.500 1.500 0 0 0 20 19v-4" />
    </>
  ),
};

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  /** stroke width in 24px viewBox units */
  sw?: number;
  /** solid variant (used by active nav items) */
  filled?: boolean;
  style?: React.CSSProperties;
};

export const Icon: React.FC<Props> = ({
  name,
  size = 24,
  color = 'currentColor',
  sw = 1.9,
  filled = false,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? color : 'none'}
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{display: 'block', flexShrink: 0, ...style}}
  >
    {paths[name]}
  </svg>
);
