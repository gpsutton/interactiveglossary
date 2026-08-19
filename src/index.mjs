import { createApp } from "./modules/deps.mjs";
import App from "./modules/components/App.mjs";

const root = document.getElementById("root");
root.innerHTML = "";
const app = createApp(App);
app.mount(root);

// Optional offline support once the app has been loaded once.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      /* offline support is a nice-to-have, not a requirement */
    });
  });
}
