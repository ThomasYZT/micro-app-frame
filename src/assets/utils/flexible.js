export default (function(win, lib) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 0;
  var scale = 0;
  var tid;
  var flexible = lib.flexible || (lib.flexible = {});

  function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
      width = width * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
  }

  function resizeHandler () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }

  function pageShowHandler (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }

  function DOMContentLoadedHandler (e) {
    doc.body.style.fontSize = 12 * dpr + 'px';
  }

  return {
    clear () {
      setTimeout(() => {
        win.removeEventListener('resize', resizeHandler, false);
        win.removeEventListener('pageshow', pageShowHandler, false);
        doc.removeEventListener('DOMContentLoaded', DOMContentLoadedHandler, false);
        docEl.style.fontSize = '';
        doc.body.style.fontSize = '';
      }, 300);
    },
    init () {
      if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
          scale = parseFloat(match[1]);
          dpr = parseInt(1 / scale);
        }
      } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
          var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
          var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
          if (initialDpr) {
            dpr = parseFloat(initialDpr[1]);
            scale = parseFloat((1 / dpr).toFixed(2));
          }
          if (maximumDpr) {
            dpr = parseFloat(maximumDpr[1]);
            scale = parseFloat((1 / dpr).toFixed(2));
          }
        }
      }

      if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
          // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
          if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
            dpr = 3;
          } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            dpr = 2;
          } else {
            dpr = 1;
          }
        } else {
          dpr = 1;
        }
        scale = 1 / dpr;
      }

      docEl.setAttribute('data-dpr', dpr);
      if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
          docEl.firstElementChild.appendChild(metaEl);
        } else {
          var wrap = doc.createElement('div');
          wrap.appendChild(metaEl);
          doc.write(wrap.innerHTML);
        }
      }

      win.addEventListener('resize', resizeHandler, false);
      win.addEventListener('pageshow', pageShowHandler, false);

      if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
      } else {
        doc.addEventListener('DOMContentLoaded', DOMContentLoadedHandler, false);
      }


      refreshRem();

      flexible.dpr = win.dpr = dpr;
      flexible.refreshRem = refreshRem;
      flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
          val += 'px';
        }
        return val;
      }
      flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
          val += 'rem';
        }
        return val;
      }
    }
  }
})(window, window['lib'] || (window['lib'] = {}))
