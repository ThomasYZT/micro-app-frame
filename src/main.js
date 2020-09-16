import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/plugins';
import './assets/style/scss/_common.scss';
import { registerMicroApps, start } from 'qiankun';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


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
