import Vue from 'vue';
import bus from './bus';
import ui from './ui';
import wow from './wow';
import globalCom from './globalCom';
import vueLazyload from 'vue-lazyload';

Vue.use(bus);
Vue.use(ui);
Vue.use(wow);
Vue.use(globalCom);
Vue.use(vueLazyload, {
  preload : 1.2,
  attempt: 1
});
