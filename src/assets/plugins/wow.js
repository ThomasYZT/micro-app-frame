export default {
  install (Vue) {
    Vue.prototype.$wow = wow;
  }
};

const wow = (selector, options) => {
  if (!window.IntersectionObserver) return;
  const _eles = document.querySelectorAll(selector) || [];
  if (_eles && _eles.length > 0) {
    const _options = options || {
      threshold: [0]
    };

    const observer = new IntersectionObserver((items) => {
      const _threshold = _options.threshold;
      items.forEach(item => {
        if (item.intersectionRatio > _threshold[0]) {
          const animateType = item.target.dataset.animate || '';
          item.target.setAttribute(
            'class',
            item.target.getAttribute('class') + ` animate__animated animate__${animateType}`
          );
          observer.unobserve(item.target);
        }
      });
    }, _options);
    _eles.forEach(el => {
      observer.observe(el);
    });

    return true;
  }

  return false;
};
