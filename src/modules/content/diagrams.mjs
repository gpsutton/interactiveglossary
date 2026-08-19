/**
 * Larger, labeled, structurally-accurate diagrams shown inside the term
 * popup bubble. Falls back to the small ICONS (see icons.mjs) for any
 * term id without a custom diagram — e.g. terms added by the user.
 */

const MUTED = "#4B5468";
const LABEL = "#93A0B4";

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
      <path d="M108 85 L62 52 M60 50 L44 42 M60 50 L48 60 M108 92 L58 92 M56 92 L40 84 M56 92 L42 100 M112 100 L64 128 M62 130 L48 124 M62 130 L52 140"
        stroke="${c}" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="132" cy="95" r="24" stroke="${c}" stroke-width="3" />
      <circle cx="136" cy="91" r="8" stroke="${c}" stroke-width="2.2" />
      <path d="M156 95 H230" stroke="${c}" stroke-width="2.8" stroke-linecap="round" />
      <ellipse cx="176" cy="95" rx="8" ry="11" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="197" cy="95" rx="8" ry="11" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="218" cy="95" rx="8" ry="11" stroke="${c}" stroke-width="2.4" />
      <path d="M230 95 L246 84 M230 95 L248 95 M230 95 L246 106" stroke="${c}" stroke-width="2.4" stroke-linecap="round" />
      <circle cx="248" cy="83" r="2.4" fill="${c}" /><circle cx="250" cy="95" r="2.4" fill="${c}" /><circle cx="248" cy="107" r="2.4" fill="${c}" />
      ${label(30, 32, "DENDRITES")}
      ${label(108, 143, "CELL BODY", { anchor: "middle" })}
      ${label(178, 122, "MYELIN SHEATH")}
      ${label(214, 68, "AXON TERMINALS")}
      ${label(150, 95, "AXON", { size: 8, fill: MUTED })}
    </svg>`,

  dendrite: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="214" cy="46" r="16" stroke="${MUTED}" stroke-width="2" />
      <path d="M200 52 L150 70 M150 70 L118 58 M150 70 L128 88 M150 70 L100 100 M100 100 L74 90 M100 100 L80 116 M100 100 L52 128 M52 128 L30 120 M52 128 L34 140"
        stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="144" cy="66" r="2.3" fill="${c}" /><circle cx="158" cy="72" r="2.3" fill="${c}" />
      <circle cx="94" cy="96" r="2.3" fill="${c}" /><circle cx="108" cy="102" r="2.3" fill="${c}" />
      <circle cx="46" cy="124" r="2.3" fill="${c}" /><circle cx="60" cy="130" r="2.3" fill="${c}" />
      ${label(200, 30, "CELL BODY", { size: 8, fill: MUTED })}
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
      <path d="M60 58 L200 58" stroke="${LABEL}" stroke-width="1.2" stroke-dasharray="3 4" marker-end="url(#dg-ah)" />
      ${DEFS_ARROW}
      ${label(130, 50, "SIGNAL DIRECTION", { anchor: "middle", size: 8 })}
      ${label(30, 130, "SOMA", { anchor: "middle", size: 8, fill: MUTED })}
      ${label(130, 128, "AXON", { anchor: "middle" })}
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
      ${label(75, 130, "NODE OF", { anchor: "middle", size: 8 })}
      ${label(75, 141, "RANVIER", { anchor: "middle", size: 8 })}
      ${label(50, 68, "MYELIN SHEATH", { anchor: "middle" })}
      ${label(50, 80, "(insulating layers)", { anchor: "middle", size: 7.5, fill: MUTED })}
      ${label(130, 30, "signal jumps node-to-node,", { anchor: "middle", size: 8 })}
      ${label(130, 41, "speeding up the impulse", { anchor: "middle", size: 8 })}
    </svg>`,

  synapse: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M20 90 Q 60 90 82 95" stroke="${c}" stroke-width="2.8" stroke-linecap="round" />
      <path d="M82 95 Q100 95 105 78 Q108 95 105 112 Q100 95 82 95" stroke="${c}" stroke-width="2.4" />
      <circle cx="92" cy="80" r="3" stroke="${c}" stroke-width="1.6" />
      <circle cx="97" cy="90" r="3" stroke="${c}" stroke-width="1.6" />
      <circle cx="93" cy="100" r="3" stroke="${c}" stroke-width="1.6" />
      <circle cx="98" cy="70" r="3" stroke="${c}" stroke-width="1.6" />
      <path d="M112 82 L128 82 M112 95 L130 95 M112 108 L128 108" stroke="${c}" stroke-width="2" stroke-linecap="round" marker-end="url(#dg-ah)" />
      ${DEFS_ARROW}
      <circle cx="122" cy="82" r="2" fill="${c}" /><circle cx="124" cy="95" r="2" fill="${c}" /><circle cx="122" cy="108" r="2" fill="${c}" />
      <path d="M138 60 V130" stroke="${MUTED}" stroke-width="2.6" stroke-linecap="round" />
      <path d="M138 66 h-6 M138 80 h-6 M138 94 h-6 M138 108 h-6 M138 122 h-6" stroke="${MUTED}" stroke-width="2" />
      <path d="M144 60 Q 190 60 236 90" stroke="${MUTED}" stroke-width="2.8" stroke-linecap="round" />
      ${label(20, 75, "PRESYNAPTIC NEURON", { size: 8 })}
      ${label(150, 45, "POSTSYNAPTIC NEURON", { size: 8 })}
      ${label(96, 145, "VESICLES", { anchor: "middle", size: 8 })}
      ${label(120, 130, "NEUROTRANS-", { anchor: "middle", size: 7.5 })}
      ${label(120, 140, "MITTERS", { anchor: "middle", size: 7.5 })}
      ${label(138, 150, "SYNAPTIC CLEFT", { anchor: "middle", size: 8 })}
    </svg>`,

  synapticcleft: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M40 30 V160" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <path d="M220 30 V160" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <circle cx="40" cy="70" r="10" stroke="${c}" stroke-width="2.2" />
      <circle cx="40" cy="70" r="4" stroke="${c}" stroke-width="1.4" />
      <path d="M50 72 L96 92 M50 68 L96 90 M50 76 L94 96" stroke="${c}" stroke-width="1.6" stroke-dasharray="2 3" />
      <circle cx="96" cy="92" r="2.6" fill="${c}" /><circle cx="90" cy="88" r="2.6" fill="${c}" /><circle cx="88" cy="98" r="2.6" fill="${c}" />
      <path d="M210 96 q-8 -4 -14 -2" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M40 30 L220 30" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" />
      <path d="M40 145 L220 145" stroke="${LABEL}" stroke-width="1" />
      <path d="M40 138 V152 M220 138 V152" stroke="${LABEL}" stroke-width="1" />
      ${label(130, 160, "~20 NANOMETERS", { anchor: "middle", size: 8 })}
      ${label(40, 45, "PRESYNAPTIC", { anchor: "middle", size: 8 })}
      ${label(220, 45, "POSTSYNAPTIC", { anchor: "middle", size: 8 })}
      ${label(96, 115, "NEUROTRANSMITTERS", { anchor: "middle", size: 7.5 })}
      ${label(96, 125, "crossing the gap", { anchor: "middle", size: 7.5, fill: MUTED })}
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
      ${label(120, 25, "NEUROTRANSMITTER", { anchor: "middle", size: 9, fill: c })}
      ${label(120, 37, "a chemical messenger molecule", { anchor: "middle", size: 7.5, fill: MUTED })}
      ${label(130, 158, "RECEPTOR", { anchor: "middle", size: 8 })}
      ${label(130, 168, "binding site on the next cell", { anchor: "middle", size: 7.5, fill: MUTED })}
    </svg>`,

  neuroglia: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="120" cy="100" r="18" stroke="${MUTED}" stroke-width="2.4" />
      <path d="M100 92 L70 78 M100 108 L70 118 M138 92 L168 80 M138 108 L168 118 H210" stroke="${MUTED}" stroke-width="2" stroke-linecap="round" />
      <path d="M50 60 L60 74 M50 60 L44 78 M50 60 L64 50 M50 60 L36 54 M50 60 L58 42" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      <circle cx="50" cy="60" r="6" stroke="${c}" stroke-width="2.2" />
      <ellipse cx="185" cy="99" rx="9" ry="12" stroke="${c}" stroke-width="2.4" />
      <ellipse cx="185" cy="99" rx="5" ry="7" stroke="${c}" stroke-width="1.3" opacity="0.6" />
      <circle cx="60" cy="150" r="7" stroke="${c}" stroke-width="2" />
      <path d="M60 143 l-6 -6 M60 143 l6 -6 M60 157 l-6 6 M60 157 l6 6 M53 150 l-8 0 M67 150 l8 0" stroke="${c}" stroke-width="1.6" />
      ${label(30, 40, "ASTROCYTE", { size: 8 })}
      ${label(30, 50, "support + nutrients", { size: 7.5, fill: MUTED })}
      ${label(190, 70, "OLIGODENDROCYTE", { size: 8 })}
      ${label(190, 80, "forms myelin", { size: 7.5, fill: MUTED })}
      ${label(80, 172, "MICROGLIA", { size: 8 })}
      ${label(80, 182, "clean-up cells", { size: 7.5, fill: MUTED })}
      ${label(120, 130, "NEURON", { anchor: "middle", size: 7.5, fill: MUTED })}
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
      ${label(180, 30, "BRAIN", { size: 10, fill: c })}
      ${label(180, 130, "SPINAL CORD", { size: 9 })}
      ${label(80, 130, "spinal", { size: 7.5, fill: MUTED, anchor: "end" })}
      ${label(80, 140, "nerves", { size: 7.5, fill: MUTED, anchor: "end" })}
    </svg>`,

  pns: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="130" cy="24" r="13" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M130 37 V110" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M130 55 H90 M130 55 H170 M130 110 H100 M130 110 H160" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M130 110 L112 165 M130 110 L148 165" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M90 55 L58 45 M90 55 L54 60 M90 55 L58 68" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      <path d="M170 55 L202 45 M170 55 L206 60 M170 55 L202 68" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      <path d="M112 165 L98 186 M112 165 L106 188 M112 165 L118 188" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      <path d="M148 165 L162 186 M148 165 L154 188 M148 165 L146 188" stroke="${c}" stroke-width="2.2" stroke-linecap="round" />
      ${label(130, 145, "CNS", { anchor: "middle", size: 8, fill: MUTED })}
      ${label(210, 40, "PERIPHERAL", { size: 8 })}
      ${label(210, 50, "NERVES", { size: 8 })}
      ${label(210, 60, "reach the limbs", { size: 7, fill: MUTED })}
    </svg>`,

  somatic: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="90" cy="24" r="13" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M90 37 V110" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M90 55 L140 40" stroke="${c}" stroke-width="3" stroke-linecap="round" />
      <ellipse cx="160" cy="35" rx="20" ry="11" stroke="${c}" stroke-width="2.4" transform="rotate(-20 160 35)" />
      <path d="M90 110 L90 165 M90 165 L74 186 M90 165 L106 186" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M158 30 L200 20" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" marker-end="url(#dg-ah)" />
      ${DEFS_ARROW}
      ${label(205, 18, "SKELETAL MUSCLE", { size: 8 })}
      ${label(90, 145, "CONTROLS VOLUNTARY", { anchor: "middle", size: 8, fill: c })}
      ${label(90, 156, "MOVEMENT", { anchor: "middle", size: 8, fill: c })}
    </svg>`,

  autonomic: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <circle cx="70" cy="24" r="13" stroke="${MUTED}" stroke-width="2.2" />
      <path d="M70 37 V150" stroke="${MUTED}" stroke-width="3" stroke-linecap="round" />
      <path d="M70 60 Q92 58 100 70 Q108 58 130 60" stroke="${c}" stroke-width="2.4" fill="none" />
      <path d="M70 60 L92 60" stroke="${c}" stroke-width="2" stroke-dasharray="2 3" />
      <ellipse cx="105" cy="110" rx="20" ry="13" stroke="${c}" stroke-width="2.2" />
      <path d="M70 105 L88 108" stroke="${c}" stroke-width="2" stroke-dasharray="2 3" />
      <path d="M120 150 q20 -6 20 -20 q0 -12 -14 -12 q10 -10 -2 -18" stroke="${c}" stroke-width="2.2" fill="none" />
      <path d="M70 150 L110 150" stroke="${c}" stroke-width="2" stroke-dasharray="2 3" />
      ${label(75, 44, "HEART RATE", { size: 8 })}
      ${label(140, 108, "DIGESTION", { size: 8 })}
      ${label(150, 165, "BREATHING", { size: 8 })}
      ${label(70, 178, "INVOLUNTARY CONTROL OF ORGANS", { anchor: "middle", size: 8, fill: c })}
    </svg>`,

  actionpotential: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M30 150 H240" stroke="${MUTED}" stroke-width="1.6" />
      <path d="M30 150 V20" stroke="${MUTED}" stroke-width="1.6" />
      <path d="M30 118 H240" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" />
      <path d="M30 95 H240" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" />
      <path d="M30 122 C 80 122, 95 122, 105 118 C 115 60, 125 30, 140 30 C 150 30, 155 90, 165 130 C 172 152, 190 124, 210 122 L240 122"
        stroke="${c}" stroke-width="3" stroke-linecap="round" fill="none" />
      ${label(15, 25, "+30", { size: 8, anchor: "end" })}
      ${label(15, 99, "0", { size: 8, anchor: "end" })}
      ${label(15, 122, "-70", { size: 8, anchor: "end" })}
      ${label(245, 150, "TIME", { size: 8 })}
      ${label(10, 90, "mV", { size: 8, anchor: "end" })}
      ${label(50, 132, "RESTING", { size: 7.5, fill: MUTED })}
      ${label(120, 45, "DEPOLARIZATION", { size: 7.5 })}
      ${label(178, 145, "REPOLARIZATION", { size: 7.5, anchor: "middle" })}
      ${label(97, 108, "THRESHOLD", { size: 7, fill: MUTED, anchor: "end" })}
    </svg>`,

  reflexarc: (c) => `
    <svg viewBox="0 0 260 190" fill="none" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d="M20 70 q10 -18 22 -4 q8 -14 18 2 q10 -10 16 4" stroke="#FF6B6B" stroke-width="2.2" fill="none" />
      <path d="M30 78 q4 12 -2 20" stroke="${MUTED}" stroke-width="2.2" stroke-linecap="round" />
      <path d="M55 92 L95 100" stroke="${c}" stroke-width="2.4" stroke-linecap="round" marker-end="url(#dg-ah)" />
      <circle cx="130" cy="105" r="22" stroke="${MUTED}" stroke-width="2.4" />
      <circle cx="130" cy="105" r="6" stroke="${c}" stroke-width="2" />
      <path d="M152 105 L190 105" stroke="${c}" stroke-width="2.4" stroke-linecap="round" marker-end="url(#dg-ah)" />
      ${DEFS_ARROW}
      <path d="M210 92 q10 30 -6 46" stroke="${MUTED}" stroke-width="2.4" stroke-linecap="round" />
      <path d="M204 138 l-4 10 M204 138 l10 4" stroke="${MUTED}" stroke-width="2" stroke-linecap="round" />
      <path d="M130 60 q0 -25 -30 -34" stroke="${LABEL}" stroke-width="1" stroke-dasharray="2 3" />
      ${label(15, 40, "STIMULUS", { size: 8 })}
      ${label(55, 82, "SENSORY NEURON", { size: 7.5 })}
      ${label(130, 145, "SPINAL CORD", { anchor: "middle", size: 8 })}
      ${label(130, 155, "(interneuron)", { anchor: "middle", size: 7.5, fill: MUTED })}
      ${label(163, 92, "MOTOR NEURON", { size: 7.5 })}
      ${label(190, 160, "MUSCLE RESPONSE", { size: 7.5, anchor: "middle" })}
      ${label(70, 25, "signal bypasses the brain", { size: 7.5, fill: MUTED })}
    </svg>`,
};
