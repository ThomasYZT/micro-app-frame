import Vue from 'vue';
import store from '../store';
import config from '../config';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../pages/home/index.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    if (!store.getters.userInfo) {
      if (to.query.code) {
        store.dispatch('login', {
          code : to.query.code,
          appType : 8,
          appId : config.APPID
        }).then(res => {
          next({
            path: '/pc'
          })
        }).catch(err => {
          next(false)
        });
      } else {
        next();
      }
    } else {
      next({ path: '/pc' });
    }
  } else {
    if (!store.getters.userInfo) {
      next('/');
    } else {
      next();
    }
  }
});

export default router;
