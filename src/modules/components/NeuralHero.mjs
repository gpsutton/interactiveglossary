// Small animated neural network shown in the header — a static SVG whose
// pulse/travel animations are defined globally in src/styles/app.css
// (keyframes nsgPulse / nsgTravel), so this component stays purely visual.

export default {
  name: "NeuralHero",
  template: /* html */ `
    <svg viewBox="0 0 118 65" width="150" height="82" class="nsg-hero" aria-hidden="true">
      <g class="nsg-hero-edges">
        <line x1="10" y1="30" x2="34" y2="10" />
        <line x1="10" y1="30" x2="34" y2="55" />
        <line x1="34" y1="10" x2="60" y2="30" />
        <line x1="34" y1="55" x2="60" y2="30" />
        <line x1="60" y1="30" x2="84" y2="12" />
        <line x1="60" y1="30" x2="84" y2="48" />
        <line x1="84" y1="12" x2="108" y2="30" />
        <line x1="84" y1="48" x2="108" y2="30" />
      </g>

      <circle class="nsg-spark" r="2.4" style="offset-path: path('M10 30 L34 10'); animation-duration: 2.4s; animation-delay: 0s;" />
      <circle class="nsg-spark" r="2.4" style="offset-path: path('M10 30 L34 55'); animation-duration: 3.0s; animation-delay: 0.35s;" />
      <circle class="nsg-spark" r="2.4" style="offset-path: path('M34 10 L60 30'); animation-duration: 3.6s; animation-delay: 0.7s;" />
      <circle class="nsg-spark" r="2.4" style="offset-path: path('M34 55 L60 30'); animation-duration: 2.4s; animation-delay: 1.05s;" />
      <circle class="nsg-spark" r="2.4" style="offset-path: path('M60 30 L84 12'); animation-duration: 3.0s; animation-delay: 1.4s;" />
      <circle class="nsg-spark" r="2.4" style="offset-path: path('M60 30 L84 48'); animation-duration: 3.6s; animation-delay: 1.75s;" />
      <circle class="nsg-spark" r="2.4" style="offset-path: path('M84 12 L108 30'); animation-duration: 2.4s; animation-delay: 2.1s;" />
      <circle class="nsg-spark" r="2.4" style="offset-path: path('M84 48 L108 30'); animation-duration: 3.0s; animation-delay: 2.45s;" />

      <circle class="nsg-node" cx="10" cy="30" r="4" style="animation-delay: 0s; transform-origin: 10px 30px;" />
      <circle class="nsg-node" cx="34" cy="10" r="4" style="animation-delay: 0.2s; transform-origin: 34px 10px;" />
      <circle class="nsg-node" cx="34" cy="55" r="4" style="animation-delay: 0.4s; transform-origin: 34px 55px;" />
      <circle class="nsg-node" cx="60" cy="30" r="4" style="animation-delay: 0.6s; transform-origin: 60px 30px;" />
      <circle class="nsg-node" cx="84" cy="12" r="4" style="animation-delay: 0.8s; transform-origin: 84px 12px;" />
      <circle class="nsg-node" cx="84" cy="48" r="4" style="animation-delay: 1.0s; transform-origin: 84px 48px;" />
      <circle class="nsg-node" cx="108" cy="30" r="4" style="animation-delay: 1.2s; transform-origin: 108px 30px;" />
    </svg>
  `,
};
