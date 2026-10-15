/** Set on <html> when the first-visit intro should not run (or has finished). */
export const INTRO_DONE_CLASS = "intro-done";
export const INTRO_SEEN_KEY = "ar-intro-seen";

/**
 * Inlined in <head> so it runs before first paint: skips the intro for repeat
 * visits in this session and for reduced-motion users, so it never flashes.
 */
export const introGateScript = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("${INTRO_DONE_CLASS}")}catch(e){}`;
