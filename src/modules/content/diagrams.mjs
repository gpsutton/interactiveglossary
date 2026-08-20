/**
 * Larger, labeled, structurally-accurate diagrams shown inside the term
 * popup bubble. Falls back to the small ICONS (see icons.mjs) for any
 * term id without a custom diagram — e.g. terms added by the user.
 *
 * MUTED / LABEL are mutable by design: every diagram function below
 * closes over these bindings and reads them at call time, so the app
 * flips them via setDiagramTheme(isDark) right before rendering the
 * current view's diagrams. This mirrors how the primary stroke color
 * `c` is supplied by the caller (see terms.mjs diagramColorForCategory).
 */

const MUTED_LIGHT = "#9AA6BE";
const LABEL_LIGHT = "#48577A";
const MUTED_DARK = "#4B5468";
const LABEL_DARK = "#93A0B4";

let MUTED = MUTED_LIGHT;
let LABEL = LABEL_LIGHT;

/** @type {(isDark: boolean) => void} */
export function setDiagramTheme(isDark) {
  MUTED = isDark ? MUTED_DARK : MUTED_LIGHT;
  LABEL = isDark ? LABEL_DARK : LABEL_LIGHT;
}

/** @type {(x: number, y: number, txt: string, opts?: {size?: number, fill?: string, anchor?: string}) => string} */
function label(x, y, txt, opts = {}) {
  const size = opts.size || 9;
  const fill = opts.fill || LABEL;
  const anchor = opts.anchor || "start";
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-family="'JetBrains Mono', monospace" text-anchor="${anchor}" letter-spacing="0.02em">${txt}</text>`;
}

const DEFS_ARROW = `
  <defs>
    <marker id="dg-ah" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
      <path d="M0 0 L5 3 L0 6 Z" fill="context-stroke" />
    </marker>
  </defs>`;

export const DIAGRAMS = {
  neuron: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M95 86 L58 62 M58 62 L42 52 M58 62 L50 76 M95 112 L58 96 M58 96 L38 90 M58 96 L46 110"
        stroke="${c}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="112" cy="100" r="22" stroke="${c}" stroke-width="3" />
      <circle cx="117" cy="96" r="7" stroke="${c}" stroke-width="2.2" />
      <path d="M134 100 H225" stroke="${c}" stroke-width="2.8" stroke-linecap="round" />
      <ellipse cx="160" cy="100" rx="8" ry="11" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="185" cy="100" rx="8" ry="11" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="210" cy="100" rx="8" ry="11" stroke="${c}" stroke-width="2.4" />
      <path d="M225 100 L240 88 M225 100 L244 100 M225 100 L240 112" stroke="${c}" stroke-width="2.4" stroke-linecap="round" />
      <circle cx="240" cy="88" r="2.4" fill="${c}" /><circle cx="244" cy="100" r="2.4" fill="${c}" /><circle cx="240" cy="112" r="2.4" fill="${c}" />
      ${label(18, 34, "DENDRITES")}
      ${label(112, 152, "CELL BODY", { anchor: "middle" })}
      ${label(185, 135, "MYELIN SHEATH", { anchor: "middle" })}
      ${label(232, 72, "AXON TERMINALS", { anchor: "middle" })}
      ${label(145, 80, "AXON", { anchor: "middle", size: 8, fill: MUTED })}
    </svg>`,

  dendrite: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="222" cy="50" r="13" stroke="${MUTED}" stroke-width="2" />
      <path d="M210 51 L150 70 M150 70 L118 58 M150 70 L128 88 M150 70 L100 100 M100 100 L74 90 M100 100 L80 116 M100 100 L52 128 M52 128 L30 120 M52 128 L34 140"
        stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="144" cy="66" r="2.3" fill="${c}" /><circle cx="158" cy="72" r="2.3" fill="${c}" />
      <circle cx="94" cy="96" r="2.3" fill="${c}" /><circle cx="108" cy="102" r="2.3" fill="${c}" />
      <circle cx="46" cy="124" r="2.3" fill="${c}" /><circle cx="60" cy="130" r="2.3" fill="${c}" />
      ${label(222, 22, "CELL BODY", { anchor: "middle", size: 8, fill: MUTED })}
      ${label(150, 20, "DENDRITE", { size: 11, fill: c, anchor: "middle" })}
      ${label(150, 34, "branches to receive signals", { size: 8, anchor: "middle" })}
      ${label(40, 165, "small bumps = dendritic spines,", { size: 8 })}
      ${label(40, 176, "where signals are received", { size: 8 })}
    </svg>`,

  axon: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="34" cy="95" r="20" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M40 84 L20 74 M40 106 L20 116 M50 80 L60 70" stroke="${MUTED}" stroke-width="2" stroke-linecap="round" />
      <path d="M54 95 H210" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <ellipse cx="90" cy="95" rx="10" ry="12" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="130" cy="95" rx="10" ry="12" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="170" cy="95" rx="10" ry="12" stroke="${c}" stroke-width="2.4" />
      <path d="M210 95 L226 84 M210 95 L230 95 M210 95 L226 106" stroke="${c}" stroke-width="2.6" stroke-linecap="round" />
      <path d="M64 68 L196 68" stroke="${LABEL}" stroke-width="1.2" stroke-dasharray="3 4" marker-end="url(#dg-ah)" />
      ${DEFS_ARROW}
      ${label(130, 52, "SIGNAL DIRECTION", { anchor: "middle", size: 8 })}
      ${label(34, 130, "SOMA", { anchor: "middle", size: 8, fill: MUTED })}
      ${label(130, 132, "AXON", { anchor: "middle" })}
      ${label(220, 68, "TERMINALS", { size: 8 })}
    </svg>`,

  myelin: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M20 100 H240" stroke="${c}" stroke-width="2.6" stroke-linecap="round" />
      <ellipse cx="50" cy="100" rx="16" ry="18" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="50" cy="100" rx="10" ry="12" stroke="${c}" stroke-width="1.4" opacity="0.6" />
      <ellipse cx="100" cy="100" rx="16" ry="18" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="100" cy="100" rx="10" ry="12" stroke="${c}" stroke-width="1.4" opacity="0.6" />
      <ellipse cx="150" cy="100" rx="16" ry="18" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="150" cy="100" rx="10" ry="12" stroke="${c}" stroke-width="1.4" opacity="0.6" />
      <ellipse cx="200" cy="100" rx="16" ry="18" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="200" cy="100" rx="10" ry="12" stroke="${c}" stroke-width="1.4" opacity="0.6" />
      <circle cx="75" cy="100" r="2" fill="${LABEL}" />
      <circle cx="125" cy="100" r="2" fill="${LABEL}" />
      <circle cx="175" cy="100" r="2" fill="${LABEL}" />
      ${label(125, 55, "MYELIN SHEATH", { anchor: "middle" })}
      ${label(125, 68, "(insulating layers)", { anchor: "middle", size: 7.5, fill: MUTED })}
      ${label(75, 138, "NODE OF", { anchor: "middle", size: 8 })}
      ${label(75, 149, "RANVIER", { anchor: "middle", size: 8 })}
      ${label(140, 168, "signal jumps node-to-node,", { anchor: "middle", size: 8 })}
      ${label(140, 179, "speeding up the impulse", { anchor: "middle", size: 8 })}
    </svg>`,

  synapse: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M10 100 H52" stroke="${c}" stroke-width="2.8" stroke-linecap="round" />
      <ellipse cx="72" cy="100" rx="20" ry="24" stroke="${c}" stroke-width="2.6" />
      <circle cx="64" cy="88" r="2.6" stroke="${c}" stroke-width="1.6" />
      <circle cx="79" cy="84" r="2.6" stroke="${c}" stroke-width="1.6" />
      <circle cx="66" cy="109" r="2.6" stroke="${c}" stroke-width="1.6" />
      <circle cx="81" cy="114" r="2.6" stroke="${c}" stroke-width="1.6" />
      <path d="M97 92 L112 96 M100 100 L116 100 M97 108 L112 104" stroke="${c}" stroke-width="2" stroke-linecap="round" marker-end="url(#dg-ah2)" />
      <defs><marker id="dg-ah2" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L5 3 L0 6 Z" fill="${c}" /></marker></defs>
      <path d="M118 65 V138" stroke="${MUTED}" stroke-width="2.6" stroke-linecap="round" />
      <path d="M118 74 h-6 M118 88 h-6 M118 100 h-6 M118 112 h-6 M118 126 h-6" stroke="${MUTED}" stroke-width="2" />
      <path d="M118 70 Q 180 55 248 45" stroke="${MUTED}" stroke-width="2.8" stroke-linecap="round" />
      ${label(10, 26, "PRESYNAPTIC NEURON")}
      ${label(250, 26, "POSTSYNAPTIC NEURON", { anchor: "end" })}
      ${label(30, 138, "VESICLES", { size: 8 })}
      <path d="M45 133 L60 118" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" />
      ${label(150, 138, "NEUROTRANSMITTERS", { size: 7.5 })}
      <path d="M170 132 L112 102" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" />
      ${label(85, 165, "SYNAPTIC CLEFT", { anchor: "middle", size: 8 })}
      <path d="M97 158 V145 M118 158 V145 M97 152 H118" stroke="${LABEL}" stroke-width="1" />
    </svg>`,

  synapticcleft: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M40 38 V160" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <path d="M220 38 V160" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <circle cx="40" cy="72" r="10" stroke="${c}" stroke-width="2.2" />
      <circle cx="40" cy="72" r="4" stroke="${c}" stroke-width="1.4" />
      <path d="M50 74 L96 92 M50 70 L96 90 M50 78 L94 96" stroke="${c}" stroke-width="1.6" stroke-dasharray="2 3" />
      <circle cx="96" cy="92" r="2.6" fill="${c}" /><circle cx="90" cy="88" r="2.6" fill="${c}" /><circle cx="88" cy="98" r="2.6" fill="${c}" />
      <path d="M210 96 q-8 -4 -14 -2" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M40 145 L220 145" stroke="${LABEL}" stroke-width="1" />
      <path d="M40 138 V152 M220 138 V152" stroke="${LABEL}" stroke-width="1" />
      ${label(130, 160, "~20 NANOMETERS", { anchor: "middle", size: 8 })}
      ${label(40, 20, "PRESYNAPTIC", { anchor: "middle", size: 8 })}
      ${label(220, 20, "POSTSYNAPTIC", { anchor: "middle", size: 8 })}
      ${label(96, 118, "NEUROTRANSMITTERS", { anchor: "middle", size: 7.5 })}
      ${label(96, 128, "crossing the gap", { anchor: "middle", size: 7.5, fill: MUTED })}
    </svg>`,

  neurotransmitter: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="120" cy="55" r="9" stroke="${c}" stroke-width="2.4" />
      <circle cx="145" cy="45" r="6" stroke="${c}" stroke-width="2" />
      <circle cx="145" cy="68" r="6" stroke="${c}" stroke-width="2" />
      <circle cx="98" cy="42" r="5" stroke="${c}" stroke-width="2" />
      <path d="M126 51 L139 46 M126 60 L139 66 M113 51 L102 44" stroke="${c}" stroke-width="2" />
      <path d="M40 130 H220" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M100 130 Q112 108 130 116 Q140 122 120 130" stroke="${MUTED}" stroke-width="2.4" fill="none" />
      ${label(120, 18, "NEUROTRANSMITTER", { anchor: "middle", size: 9, fill: c })}
      ${label(120, 91, "a chemical messenger molecule", { anchor: "middle", size: 7.5, fill: MUTED })}
      ${label(130, 158, "RECEPTOR", { anchor: "middle", size: 8 })}
      ${label(130, 169, "binding site on the next cell", { anchor: "middle", size: 7.5, fill: MUTED })}
    </svg>`,

  neuroglia: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="120" cy="100" r="18" stroke="${MUTED}" stroke-width="2.4" />
      <path d="M100 92 L70 78 M100 108 L70 118 M138 92 L168 80 M138 108 L168 118 H205" stroke="${MUTED}" stroke-width="2" stroke-linecap="round" />
      <path d="M50 64 L60 76 M50 64 L44 80 M50 64 L64 54 M50 64 L37 58 M50 64 L56 48" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      <circle cx="50" cy="64" r="6" stroke="${c}" stroke-width="2.2" />
      <ellipse cx="185" cy="99" rx="9" ry="12" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="185" cy="99" rx="5" ry="7" stroke="${c}" stroke-width="1.3" opacity="0.6" />
      <circle cx="58" cy="140" r="7" stroke="${c}" stroke-width="2" />
      <path d="M58 133 l-5 -5 M58 133 l5 -5 M58 147 l-5 5 M58 147 l5 5 M51 140 l-7 0 M65 140 l7 0" stroke="${c}" stroke-width="1.6" />
      ${label(20, 22, "ASTROCYTE")}
      ${label(20, 33, "support + nutrients", { size: 7.5, fill: MUTED })}
      ${label(190, 60, "OLIGODENDROCYTE")}
      ${label(190, 71, "forms myelin", { size: 7.5, fill: MUTED })}
      ${label(20, 168, "MICROGLIA")}
      ${label(20, 179, "clean-up cells", { size: 7.5, fill: MUTED })}
      ${label(120, 133, "NEURON", { anchor: "middle", size: 7.5, fill: MUTED })}
    </svg>`,

  cns: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M135 20c-16 0-25 11-25 21-9 4-13 14-8 23-6 7-4 18 5 23 1 11 13 18 24 15 6 6 16 6 21 0 11 3 23-4 24-15 9-5 11-16 5-23 5-9 1-19-8-23 0-10-9-21-25-21-4 0-8 1-11 4-3-3-6-4-2-4z"
        stroke="${c}" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M135 26v52M118 38c5 4 5 9 0 13M152 38c-5 4-5 9 0 13M118 62c6 3 6 10 0 13" stroke="${c}" stroke-width="1.8" stroke-linecap="round" opacity="0.8" />
      <path d="M135 95 V102" stroke="${c}" stroke-width="4" />
      <rect x="123" y="110" width="24" height="9" rx="3" stroke="${c}" stroke-width="2" />
      <path d="M123 114.5 H105 M147 114.5 H165" stroke="${MUTED}" stroke-width="1.4" />
      <rect x="123" y="122" width="24" height="9" rx="3" stroke="${c}" stroke-width="2" />
      <path d="M123 126.5 H105 M147 126.5 H165" stroke="${MUTED}" stroke-width="1.4" />
      <rect x="123" y="134" width="24" height="9" rx="3" stroke="${c}" stroke-width="2" />
      <path d="M123 138.5 H105 M147 138.5 H165" stroke="${MUTED}" stroke-width="1.4" />
      <rect x="123" y="146" width="24" height="9" rx="3" stroke="${c}" stroke-width="2" />
      <path d="M123 150.5 H105 M147 150.5 H165" stroke="${MUTED}" stroke-width="1.4" />
      <rect x="123" y="158" width="24" height="9" rx="3" stroke="${c}" stroke-width="2" />
      <path d="M123 162.5 H105 M147 162.5 H165" stroke="${MUTED}" stroke-width="1.4" />
      <rect x="123" y="170" width="24" height="9" rx="3" stroke="${c}" stroke-width="2" />
      <path d="M123 174.5 H105 M147 174.5 H165" stroke="${MUTED}" stroke-width="1.4" />
      ${label(186, 26, "BRAIN", { size: 10, fill: c })}
      ${label(186, 142, "SPINAL CORD", { size: 9 })}
      ${label(78, 138, "spinal", { size: 7.5, fill: MUTED, anchor: "end" })}
      ${label(78, 148, "nerves", { size: 7.5, fill: MUTED, anchor: "end" })}
    </svg>`,

  pns: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="130" cy="24" r="13" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M130 37 V110" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M130 55 H90 M130 55 H170 M130 110 H100 M130 110 H160" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M130 110 L112 163 M130 110 L148 163" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M90 55 L58 45 M90 55 L54 60 M90 55 L58 68" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      <path d="M170 55 L184 45 M170 55 L188 60 M170 55 L184 68" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      <path d="M112 163 L100 179 M112 163 L108 182 M112 163 L118 182" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      <path d="M148 163 L160 179 M148 163 L154 182 M148 163 L146 182" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      ${label(148, 88, "CNS", { size: 8, fill: MUTED })}
      ${label(198, 38, "PERIPHERAL", { size: 8 })}
      ${label(198, 48, "NERVES", { size: 8 })}
      ${label(198, 58, "reach the limbs", { size: 7, fill: MUTED })}
    </svg>`,

  somatic: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="90" cy="24" r="13" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M90 37 V110" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M90 55 L140 40" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <ellipse cx="160" cy="35" rx="20" ry="11" stroke="${c}" stroke-width="2.4" transform="rotate(-20 160 35)" />
      <path d="M90 110 L90 165 M90 165 L76 182 M90 165 L104 182" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M162 26 L188 18" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" marker-end="url(#dg-ah3)" />
      <defs><marker id="dg-ah3" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L5 3 L0 6 Z" fill="${LABEL}" /></marker></defs>
      ${label(192, 16, "SKELETAL MUSCLE", { size: 8 })}
      ${label(100, 140, "CONTROLS VOLUNTARY", { size: 8, fill: c })}
      ${label(100, 151, "MOVEMENT", { size: 8, fill: c })}
    </svg>`,

  autonomic: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="60" cy="24" r="13" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M60 37 V165" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M60 55 Q80 53 88 65 Q95 53 115 55" stroke="${c}" stroke-width="2.4" fill="none" />
      <path d="M60 55 L78 55" stroke="${c}" stroke-width="2" stroke-dasharray="2 3" />
      <ellipse cx="100" cy="100" rx="18" ry="12" stroke="${c}" stroke-width="2.2" />
      <path d="M60 100 L82 100" stroke="${c}" stroke-width="2" stroke-dasharray="2 3" />
      <ellipse cx="100" cy="150" rx="22" ry="16" stroke="${c}" stroke-width="2.2" />
      <path d="M60 150 L78 150" stroke="${c}" stroke-width="2" stroke-dasharray="2 3" />
      ${label(100, 36, "HEART RATE", { anchor: "middle", size: 8 })}
      ${label(130, 98, "BREATHING", { size: 8 })}
      ${label(134, 148, "DIGESTION", { size: 8 })}
      ${label(100, 182, "INVOLUNTARY CONTROL OF ORGANS", { anchor: "middle", size: 8, fill: c })}
    </svg>`,

  actionpotential: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M30 150 H225" stroke="${MUTED}" stroke-width="1.6" />
      <path d="M30 150 V20" stroke="${MUTED}" stroke-width="1.6" />
      <path d="M30 118 H225" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" />
      <path d="M30 95 H225" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" />
      <path d="M30 122 C 80 122, 95 122, 105 118 C 115 60, 125 30, 140 30 C 150 30, 155 90, 165 130 C 172 152, 190 124, 210 122 L225 122"
        stroke="${c}" stroke-width="3" stroke-linecap="round" fill="none" />
      ${label(15, 25, "+30", { size: 8, anchor: "end" })}
      ${label(15, 99, "0", { size: 8, anchor: "end" })}
      ${label(15, 122, "-70", { size: 8, anchor: "end" })}
      ${label(248, 162, "TIME", { size: 8, anchor: "end" })}
      ${label(10, 90, "mV", { size: 8, anchor: "end" })}
      ${label(48, 138, "RESTING", { size: 7.5, fill: MUTED })}
      ${label(140, 15, "DEPOLARIZATION", { anchor: "middle", size: 7.5 })}
      ${label(185, 168, "REPOLARIZATION", { size: 7.5, anchor: "middle" })}
      ${label(97, 88, "THRESHOLD", { size: 7, fill: MUTED, anchor: "end" })}
    </svg>`,

  reflexarc: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M20 62 q10 -18 22 -4 q8 -14 18 2 q10 -10 16 4" stroke="#8A1F2E" stroke-width="2.2" fill="none" />
      <path d="M30 70 q4 12 -2 20" stroke="${MUTED}" stroke-width="2.2" stroke-linecap="round" />
      <path d="M55 90 L95 100" stroke="${c}" stroke-width="2.4" stroke-linecap="round" marker-end="url(#dg-ah4)" />
      <circle cx="130" cy="105" r="22" stroke="${MUTED}" stroke-width="2.4" />
      <circle cx="130" cy="105" r="6" stroke="${c}" stroke-width="2" />
      <path d="M152 105 L190 105" stroke="${c}" stroke-width="2.4" stroke-linecap="round" marker-end="url(#dg-ah4)" />
      <path d="M210 92 q10 30 -6 46" stroke="${MUTED}" stroke-width="2.4" stroke-linecap="round" />
      <path d="M204 138 l-4 10 M204 138 l10 4" stroke="${MUTED}" stroke-width="2" stroke-linecap="round" />
      <defs><marker id="dg-ah4" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L5 3 L0 6 Z" fill="${c}" /></marker></defs>
      ${label(15, 30, "STIMULUS", { size: 8 })}
      ${label(55, 114, "SENSORY NEURON", { size: 7.5 })}
      ${label(130, 145, "SPINAL CORD", { anchor: "middle", size: 8 })}
      ${label(130, 155, "(interneuron)", { anchor: "middle", size: 7.5, fill: MUTED })}
      ${label(163, 92, "MOTOR NEURON", { size: 7.5 })}
      ${label(190, 160, "MUSCLE RESPONSE", { size: 7.5, anchor: "middle" })}
      ${label(150, 25, "signal bypasses the brain", { size: 7.5, fill: MUTED })}
    </svg>`,
};
