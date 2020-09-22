import Vue from 'vue';
import './assets/utils/flexible';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/plugins';
import 'animate.css';
import './assets/style/scss/_common.scss';
import card from './components/card'
import { registerMicroApps, start } from 'qiankun';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.use({
  install (Vue) {
    Vue.component(card.name, card)
  }
});

registerMicroApps([
  {
    name: 'pc', // app name registered
    entry: 'http://locahost:3000',
    container: "#app",
    activeRule: '/pc',
  },
  {
    name: 'clip', // app name registered
    entry: 'http://locahost:8081',
    container: "#app",
    activeRule: '/clip',
  },
]);
start();
