export const rAF = (() => {
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
    window.setTimeout(fn, 1000 / 60);
  };
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function (timer) {
    clearTimeout(timer);
  };

  return (fn) => { return window.requestAnimationFrame(fn); };
})();
