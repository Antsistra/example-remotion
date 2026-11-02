/**
 * Master timeline (frames @ 30fps, 900 total = 30s).
 *
 *     0 -  112  Logo reveal (hole-wipe opens at 84)
 *    84 -  750  "Phone act": one continuous phone + camera move
 *                 84 - 256  Marketplace   (Beranda)
 *                256 - 450  Tanya Tani AI (chat)
 *                450 - 564  Smart Fertilizer: input form
 *                564 - 722  Smart Fertilizer: result + data viz
 *   722 -  900  Finale + tagline (circular wipe grows from the phone)
 *
 * Every screen change is a tap on the previous screen followed by a circular
 * reveal that grows from the tapped point.
 */
export const T = {
  total: 900,

  logoEnd: 112,
  logoWipe: 84,

  actStart: 84,
  actEnd: 750,

  homeStart: 84,
  chatStart: 256,
  formStart: 450,
  resultStart: 564,
  finaleStart: 722,
};

/** Tap / reveal origin points in *screen* coordinates (540 x 1024). */
export const TAP = {
  chat: {x: 270, y: 948},
  pupuk: {x: 168, y: 970},
  getRec: {x: 270, y: 889},
};
