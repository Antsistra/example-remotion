import {loadFont as loadJakarta} from '@remotion/google-fonts/PlusJakartaSans';
import {loadFont as loadRoboto} from '@remotion/google-fonts/Roboto';

/**
 * Display type: Plus Jakarta Sans (kinetic typography, headlines).
 * UI type: Roboto (the Flutter app's Material look).
 * loadFont() registers a delayRender internally, so frames never render with a fallback font.
 */
export const jakarta = loadJakarta('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
});

export const roboto = loadRoboto('normal', {
  weights: ['400', '500', '700'],
  subsets: ['latin'],
});
