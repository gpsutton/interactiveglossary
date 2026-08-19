import { css } from "../deps.mjs";
import { colorForCategory } from "../content/terms.mjs";
import { ICONS } from "../content/icons.mjs";

const styles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #12161f;
  border: 1px solid #1b2230;
  border-radius: 12px;
  padding: 10px 12px;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: #171e2b;
    border-color: #2a3444;
  }
`;

export default {
  name: "TermRow",
  props: {
    term: { type: Object, required: true },
    categories: { type: Array, default: () => [] },
  },
  emits: ["open", "update", "delete"],
  data() {
    return {
      editing: false,
      confirmingDelete: false,
      draft: null,
      rowClass: styles,
    };
  },
  computed: {
    color() {
      return colorForCategory(this.term.category);
    },
    iconMarkup() {
      const fn = ICONS[this.term.icon];
      return fn ? fn(this.color) : "";
    },
  },
  methods: {
    startEdit() {
      this.draft = { ...this.term };
      this.editing = true;
      this.confirmingDelete = false;
    },
    cancelEdit() {
      this.editing = false;
      this.draft = null;
    },
    saveEdit() {
      if (!this.draft.term.trim() || !this.draft.definition.trim()) return;
      this.$emit("update", this.term.id, { ...this.draft });
      this.editing = false;
      this.draft = null;
    },
    askDelete() {
      this.confirmingDelete = true;
    },
    confirmDelete() {
      this.$emit("delete", this.term.id);
    },
  },
  template: /* html */ `
    <div :class="rowClass">
      <template v-if="editing">
        <div style="width: 100%;">
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px;">
            <div class="icon-wrap" :style="{ borderColor: color + '55' }" v-html="iconMarkup"></div>
            <input class="form-control form-control-sm" style="flex: 1;" v-model="draft.term" placeholder="Term name" />
            <input class="form-control form-control-sm" style="width: 190px;" list="nsg-categories" v-model="draft.category" placeholder="Category" />
          </div>
          <textarea class="form-control form-control-sm mb-2" rows="2" v-model="draft.definition" placeholder="Definition"></textarea>
          <textarea class="form-control form-control-sm mb-2" rows="2" v-model="draft.example" placeholder="Example sentence (optional)"></textarea>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-sm btn-outline-secondary" @click="cancelEdit">Cancel</button>
            <button class="btn btn-sm" style="background: var(--nsg-mint); color: #0a0e16; border-color: var(--nsg-mint);" @click="saveEdit">
              <i class="ti ti-check"></i> Save
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <button class="row-click-area" @click="$emit('open', term.id)">
          <div class="icon-wrap" :style="{ borderColor: color + '55' }" v-html="iconMarkup"></div>
          <div style="text-align: left; min-width: 0;">
            <div class="row-term">{{ term.term }}</div>
            <div class="row-snippet">{{ term.definition }}</div>
          </div>
        </button>
        <div style="display: flex; gap: 4px; flex-shrink: 0;">
          <button class="icon-btn" title="Edit" @click="startEdit">
            <i class="ti ti-pencil"></i>
          </button>
          <button
            v-if="!confirmingDelete"
            class="icon-btn"
            title="Delete"
            @click="askDelete"
          >
            <i class="ti ti-trash"></i>
          </button>
          <button
            v-else
            class="icon-btn icon-btn-danger"
            title="Confirm delete"
            @click="confirmDelete"
          >
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </template>
    </div>
  `,
};
