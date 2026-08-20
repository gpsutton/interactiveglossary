import { state, addTerm, updateTerm, deleteTerm } from "../services/data.mjs";
import { themeState, toggleTheme } from "../services/theme.mjs";
import { CATEGORY_COLORS, colorForCategory } from "../content/terms.mjs";
import { setDiagramTheme } from "../content/diagrams.mjs";
import NeuralHero from "./NeuralHero.mjs";
import TermRow from "./TermRow.mjs";
import AddTermForm from "./AddTermForm.mjs";
import TermBubble from "./TermBubble.mjs";

export default {
  name: "App",
  components: { NeuralHero, TermRow, AddTermForm, TermBubble },
  data() {
    return {
      state,
      themeState,
      query: "",
      activeId: null,
      showAdd: false,
    };
  },
  computed: {
    isDark() {
      return this.themeState.isDark;
    },
    knownCategories() {
      const fromTerms = state.terms.map((t) => t.category);
      return [...new Set([...Object.keys(CATEGORY_COLORS), ...fromTerms])];
    },
    filtered() {
      const q = this.query.trim().toLowerCase();
      if (!q) return state.terms;
      return state.terms.filter(
        (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
      );
    },
    grouped() {
      const g = {};
      for (const t of this.filtered) {
        (g[t.category] ||= []).push(t);
      }
      return g;
    },
    active() {
      return state.terms.find((t) => t.id === this.activeId) || null;
    },
  },
  watch: {
    isDark: {
      immediate: true,
      handler(isDark) {
        // Diagram SVGs are generated strings (see content/diagrams.mjs),
        // so their annotation colors are flipped here rather than via CSS.
        setDiagramTheme(isDark);
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
          document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
        }
      },
    },
  },
  methods: {
    colorForCategory,
    toggleTheme,
    openTerm(id) {
      this.activeId = id;
    },
    closeTerm() {
      this.activeId = null;
    },
    handleAdd(term) {
      addTerm(term);
      this.showAdd = false;
    },
    handleUpdate(id, patch) {
      updateTerm(id, patch);
    },
    handleDelete(id) {
      deleteTerm(id);
      if (this.activeId === id) this.activeId = null;
    },
  },
  template: /* html */ `
    <div class="glossary-page">
      <datalist id="nsg-categories">
        <option v-for="cat in knownCategories" :key="cat" :value="cat" />
      </datalist>

      <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <i :class="isDark ? 'ti ti-sun' : 'ti ti-moon'"></i>
        {{ isDark ? 'Light mode' : 'Dark mode' }}
      </button>

      <header class="glossary-header">
        <div class="header-top">
          <div>
            <h1 class="glossary-title">Nervous System Glossary</h1>
            <p class="glossary-subtitle">Click a term to see it explained. Edit or add your own anytime.</p>
          </div>
          <NeuralHero />
        </div>

        <div class="toolbar">
          <div class="search-wrap">
            <i class="ti ti-search"></i>
            <input
              class="search-input"
              v-model="query"
              placeholder="Search terms or definitions…"
            />
          </div>
          <button
            class="btn btn-sm add-btn"
            :class="showAdd ? 'add-btn-cancel' : 'add-btn-primary'"
            @click="showAdd = !showAdd"
          >
            <i :class="showAdd ? 'ti ti-x' : 'ti ti-plus'"></i>
            {{ showAdd ? 'Cancel' : 'Add term' }}
          </button>
        </div>

        <AddTermForm
          v-if="showAdd"
          :categories="knownCategories"
          @add="handleAdd"
          @cancel="showAdd = false"
        />
      </header>

      <main class="glossary-main">
        <div v-if="Object.keys(grouped).length === 0" class="empty-state">
          No terms match "{{ query }}". Try another search, or add it yourself.
        </div>

        <section v-for="cat in Object.keys(grouped)" :key="cat" class="category-block">
          <div class="category-heading">
            <span class="category-dot" :style="{ background: colorForCategory(cat, isDark) }"></span>
            {{ cat }}
            <span class="category-count">{{ grouped[cat].length }}</span>
          </div>

          <div class="term-list">
            <TermRow
              v-for="t in grouped[cat]"
              :key="t.id"
              :term="t"
              :categories="knownCategories"
              :is-dark="isDark"
              @open="openTerm"
              @update="handleUpdate"
              @delete="handleDelete"
            />
          </div>
        </section>
      </main>

      <TermBubble :term="active" :is-dark="isDark" @close="closeTerm" />
    </div>
  `,
};
