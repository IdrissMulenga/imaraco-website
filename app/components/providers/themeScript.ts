// Light/dark mode, without a library.
//
// `themeScript` runs in the page <head> before anything is painted: it reads
// the saved choice (or the phone/computer's own setting) and puts a "light"
// or "dark" class on <html>, which is what Chakra's dark-mode styles use.
// That avoids a white flash when someone has chosen dark mode.
//
// It also adds a "js" class: scroll animations (components/motion/Reveal)
// only hide content when it is there, so pages without JavaScript are fully
// visible. If the app's JavaScript hasn't started after 5 seconds (failed or
// blocked), the class is removed so nothing stays hidden.

export const THEME_STORAGE_KEY = "theme";

export const themeScript = `(function(){try{
var s=localStorage.getItem("${THEME_STORAGE_KEY}");
var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;
var e=document.documentElement;
e.classList.remove("light","dark");e.classList.add(d?"dark":"light");
e.style.colorScheme=d?"dark":"light";
}catch(_){}
try{var h=document.documentElement;h.classList.add("js");
window.__imaraRevealFallback=setTimeout(function(){h.classList.remove("js")},5000);}catch(_){}
})()`;

export type ColorMode = "light" | "dark";

/** Switches the page to `mode` and remembers the choice. */
export function applyColorMode(mode: ColorMode) {
  const el = document.documentElement;
  // Briefly turn off transitions so every color switches at once.
  const freeze = document.createElement("style");
  freeze.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(freeze);

  el.classList.remove("light", "dark");
  el.classList.add(mode);
  el.style.colorScheme = mode;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Storage blocked (private mode): the choice lasts for this visit only.
  }

  window.getComputedStyle(el).opacity; // force the new colors to apply
  requestAnimationFrame(() => freeze.remove());
}
