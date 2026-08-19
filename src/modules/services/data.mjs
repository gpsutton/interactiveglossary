import { reactive, watch } from "../deps.mjs";
import { SEED_TERMS } from "../content/terms.mjs";

const STORAGE_KEY = "nervous-glossary:terms";

/** @type {() => import('../content/terms.mjs').Term[]} */
function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* storage unavailable or corrupt — fall back to defaults */
  }
  return JSON.parse(JSON.stringify(SEED_TERMS));
}

export const state = reactive({
  terms: loadInitial(),
});

watch(
  () => state.terms,
  (terms) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
    } catch (e) {
      /* storage full or disabled — edits just won't persist */
    }
  },
  { deep: true }
);

/** @type {(term: Omit<import('../content/terms.mjs').Term, 'id'>) => void} */
export function addTerm(term) {
  const slug = term.term.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const id = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
  state.terms.push({ ...term, id });
}

/** @type {(id: string, patch: Partial<import('../content/terms.mjs').Term>) => void} */
export function updateTerm(id, patch) {
  const t = state.terms.find((t) => t.id === id);
  if (t) Object.assign(t, patch);
}

/** @type {(id: string) => void} */
export function deleteTerm(id) {
  const i = state.terms.findIndex((t) => t.id === id);
  if (i !== -1) state.terms.splice(i, 1);
}

export function resetToDefaults() {
  state.terms = JSON.parse(JSON.stringify(SEED_TERMS));
}
