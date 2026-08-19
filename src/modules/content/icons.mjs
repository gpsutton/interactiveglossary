/**
 * Small stylized line-art icons used in the term list.
 * Each entry is a function (color) => svg markup string, rendered via v-html.
 */

export const ICONS = {
  neuron: (c) => `
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <path d="M18 30 L34 42 M18 50 L34 46 M18 70 L34 50" stroke="${c}" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="42" cy="48" r="12" stroke="${c}" stroke-width="3.5" />
      <path d="M54 46 L82 40 M82 40 L90 34 M82 40 L90 44" stroke="${c}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M54 51 L78 62 M78 62 L86 58 M78 62 L82 70" stroke="${c}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  synapse: (c) => `
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <path d="M10 50 Q 28 50 36 50" stroke="${c}" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="42" cy="50" r="8" stroke="${c}" stroke-width="3.5" />
      <circle cx="58" cy="50" r="8" stroke="${c}" stroke-width="3.5" />
      <path d="M64 50 Q 78 50 90 50" stroke="${c}" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="48" cy="44" r="2" fill="${c}" />
      <circle cx="52" cy="56" r="2" fill="${c}" />
      <circle cx="50" cy="50" r="2" fill="${c}" />
    </svg>`,
  myelin: (c) => `
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <path d="M8 50 H92" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <ellipse cx="26" cy="50" rx="10" ry="14" stroke="${c}" stroke-width="3.5" />
      <ellipse cx="50" cy="50" rx="10" ry="14" stroke="${c}" stroke-width="3.5" />
      <ellipse cx="74" cy="50" rx="10" ry="14" stroke="${c}" stroke-width="3.5" />
    </svg>`,
  brain: (c) => `
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <path d="M35 22c-10 0-16 8-16 15-6 3-9 10-6 17-4 5-3 13 3 17 1 8 9 13 17 11 4 4 11 4 15 0 8 2 16-3 17-11 6-4 7-12 3-17 3-7 0-14-6-17 0-7-6-15-16-15-3 0-6 1-8 3-2-2-5-3-9-3z"
        stroke="${c}" stroke-width="3.2" stroke-linejoin="round" />
      <path d="M50 25v50M38 34c4 3 4 7 0 10M64 34c-4 3-4 7 0 10M35 52c5 2 5 8 0 11" stroke="${c}" stroke-width="2.4" stroke-linecap="round" />
    </svg>`,
  cable: (c) => `
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <path d="M50 8 V92" stroke="${c}" stroke-width="4" stroke-linecap="round" />
      <path d="M50 22 L28 12 M50 22 L72 12" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <path d="M50 40 L24 34 M50 40 L76 34" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <path d="M50 60 L24 66 M50 60 L76 66" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <path d="M50 78 L28 88 M50 78 L72 88" stroke="${c}" stroke-width="3" stroke-linecap="round" />
    </svg>`,
  pulse: (c) => `
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <path d="M6 54 H30 L38 30 L48 74 L58 46 L64 54 H94"
        stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  cell: (c) => `
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <circle cx="50" cy="50" r="34" stroke="${c}" stroke-width="3.5" />
      <circle cx="46" cy="46" r="10" stroke="${c}" stroke-width="3" />
      <circle cx="70" cy="36" r="3" fill="${c}" />
      <circle cx="30" cy="66" r="3" fill="${c}" />
      <circle cx="66" cy="68" r="3" fill="${c}" />
    </svg>`,
};

export const ICON_KEYS = Object.keys(ICONS);
