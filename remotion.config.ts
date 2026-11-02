import {Config} from '@remotion/cli/config';

// High quality H.264 output, tuned for smooth gradients on dark backgrounds.
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setCrf(14);
Config.setOverwriteOutput(true);
