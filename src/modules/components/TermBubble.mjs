import { colorForCategory, diagramColorForCategory } from "../content/terms.mjs";
import { ICONS } from "../content/icons.mjs";
import { DIAGRAMS } from "../content/diagrams.mjs";

export default {
  name: "TermBubble",
  props: {
    term: { type: Object, default: null },
    isDark: { type: Boolean, default: false },
  },
  emits: ["close"],
  computed: {
    // Category color: used for the wrap border/glow and the small kicker tag.
    tagColor() {
      return this.term ? colorForCategory(this.term.category, this.isDark) : "#8A1F2E";
    },
    // Diagram content color: fixed dark red in light mode, category-colored
    // in dark mode (the original scheme).
    diagramColor() {
      return this.term ? diagramColorForCategory(this.term.category, this.isDark) : "#8A1F2E";
    },
    diagramMarkup() {
      if (!this.term) return "";
      const diagramFn = DIAGRAMS[this.term.id];
      const iconFn = ICONS[this.term.icon];
      const fn = diagramFn || iconFn;
      return fn ? fn(this.diagramColor) : "";
    },
  },
  template: /* html */ `
    <div class="overlay" :class="{ 'overlay-open': !!term }" @click="$emit('close')">
      <div v-if="term" class="bubble" @click.stop>
        <button class="bubble-close" @click="$emit('close')" aria-label="Close">
          <i class="ti ti-x"></i>
        </button>

        <div class="bubble-diagram-wrap" :style="{ borderColor: tagColor + '55', boxShadow: '0 0 60px ' + tagColor + '22' }" v-html="diagramMarkup"></div>

        <div class="bubble-tag" :style="{ color: tagColor }">{{ term.category }}</div>
        <h2 class="bubble-title">{{ term.term }}</h2>
        <p class="bubble-def">{{ term.definition }}</p>

        <div v-if="term.example" class="bubble-example">
          <i class="ti ti-sparkles"></i>
          <span>{{ term.example }}</span>
        </div>
      </div>
    </div>
  `,
};
