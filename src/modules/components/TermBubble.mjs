import { colorForCategory } from "../content/terms.mjs";
import { ICONS } from "../content/icons.mjs";
import { DIAGRAMS } from "../content/diagrams.mjs";

export default {
  name: "TermBubble",
  props: {
    term: { type: Object, default: null },
  },
  emits: ["close"],
  computed: {
    color() {
      return this.term ? colorForCategory(this.term.category) : "#7DF9C4";
    },
    diagramMarkup() {
      if (!this.term) return "";
      const diagramFn = DIAGRAMS[this.term.id];
      const iconFn = ICONS[this.term.icon];
      const fn = diagramFn || iconFn;
      return fn ? fn(this.color) : "";
    },
  },
  template: /* html */ `
    <div class="overlay" :class="{ 'overlay-open': !!term }" @click="$emit('close')">
      <div v-if="term" class="bubble" @click.stop>
        <button class="bubble-close" @click="$emit('close')" aria-label="Close">
          <i class="ti ti-x"></i>
        </button>

        <div class="bubble-diagram-wrap" :style="{ borderColor: color + '55', boxShadow: '0 0 60px ' + color + '22' }" v-html="diagramMarkup"></div>

        <div class="bubble-tag" :style="{ color: color }">{{ term.category }}</div>
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
