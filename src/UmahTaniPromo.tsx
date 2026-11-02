import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import './fonts';
import {C} from './theme';
import {T} from './timeline';
import {Background} from './components/Background';
import {LogoScene} from './scenes/LogoScene';
import {PhoneAct} from './scenes/PhoneAct';
import {Finale} from './scenes/Finale';

/**
 * Umah Tani — 30s vertical promo (1080x1920 @ 30fps).
 *
 * Layer order (bottom -> top):
 *   Background  persistent drifting forest light + dot grid
 *   PhoneAct    3D phone with camera rig, floating UI, headlines (84-750)
 *   LogoScene   logo reveal, opens a hole-wipe onto the act (0-112)
 *   Finale      circular wipe from the phone, tagline (722-900)
 */
export const UmahTaniPromo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: C.forestDeep}}>
      <Background />
      {frame >= T.actStart - 1 && frame < T.actEnd ? <PhoneAct /> : null}
      {frame < T.logoEnd ? <LogoScene /> : null}
      {frame >= T.finaleStart ? (
        <Sequence from={T.finaleStart}>
          <Finale />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
