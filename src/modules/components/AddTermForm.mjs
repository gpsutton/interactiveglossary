import { ICON_KEYS } from "../content/icons.mjs";

export default {
  name: "AddTermForm",
  props: {
    categories: { type: Array, default: () => [] },
  },
  emits: ["add", "cancel"],
  data() {
    return {
      iconKeys: ICON_KEYS,
      draft: {
        term: "",
        category: this.categories[0] || "Cells & Structures",
        icon: "neuron",
        definition: "",
        example: "",
      },
    };
  },
  methods: {
    submit() {
      if (!this.draft.term.trim() || !this.draft.definition.trim()) return;
      this.$emit("add", { ...this.draft });
    },
  },
  template: /* html */ `
    <div class="add-panel">
      <div class="add-grid">
        <input class="form-control form-control-sm" v-model="draft.term" placeholder="Term name" />
        <input class="form-control form-control-sm" list="nsg-categories" v-model="draft.category" placeholder="Category" />
        <select class="form-select form-select-sm" v-model="draft.icon">
          <option v-for="key in iconKeys" :key="key" :value="key">{{ key }} icon</option>
        </select>
      </div>
      <textarea class="form-control form-control-sm mb-2" rows="2" v-model="draft.definition" placeholder="Definition"></textarea>
      <textarea class="form-control form-control-sm mb-2" rows="2" v-model="draft.example" placeholder="Example sentence (optional)"></textarea>
      <div style="display: flex; justify-content: flex-end;">
        <button class="btn btn-sm add-btn add-btn-primary" @click="submit">
          <i class="ti ti-check"></i> Save term
        </button>
      </div>
    </div>
  `,
};
