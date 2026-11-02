import React from 'react';
import {Composition} from 'remotion';
import {UmahTaniPromo} from './UmahTaniPromo';
import {FPS, H, TOTAL_FRAMES, W} from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="UmahTaniPromo"
      component={UmahTaniPromo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={W}
      height={H}
    />
  );
};
