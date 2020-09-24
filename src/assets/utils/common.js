export const rAF = (() => {
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
    window.setTimeout(fn, 1000 / 60);
  };
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function (timer) {
    clearTimeout(timer);
  };

  return (fn) => { return window.requestAnimationFrame(fn); };
})();


export const Storage = {
  get (key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : ''
  },
  set (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
};
