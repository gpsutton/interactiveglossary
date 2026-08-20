import { reactive, watch } from "../deps.mjs";

const STORAGE_KEY = "nervous-glossary:theme";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "dark") return true;
    if (raw === "light") return false;
  } catch (e) {
    /* storage unavailable — fall back to the default */
  }
  return false; // light mode is the default
}

export const themeState = reactive({
  isDark: loadInitial(),
});

watch(
  () => themeState.isDark,
  (isDark) => {
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch (e) {
      /* storage full or disabled — the toggle still works this session */
    }
  }
);

export function toggleTheme() {
  themeState.isDark = !themeState.isDark;
}
