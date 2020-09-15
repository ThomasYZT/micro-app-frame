export default {
  install (Vue) {
    const bus = new Vue();
    Vue.prototype.$bus = {
      emit: function () {
        bus.$emit.apply(bus, arguments);
      },
      on: function () {
        bus.$on.apply(bus, arguments);
      }
    };
  }
};
