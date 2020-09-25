import Vue from 'vue';
import store from '../store';
import config from '../config';
import VueRouter from 'vue-router';
import baseLayer from "../main";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
};

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
  if (baseLayer) {
    auth(to, from, next)
  } else {
    setTimeout(() => {
      auth(to, from, next);
    }, 0);
  }
});

function auth (to, from, next) {
  if (to.path === '' || to.path === '/') {
    if (!store.getters.userInfo) {
      if (to.query.code) {
        store.dispatch('login', {
          code : to.query.code,
          appType : 8,
          appId : config.APPID
        }).then(res => {
          baseLayer.startMicroService();
          next({ path: '/pc', replace: true });
        }).catch(err => {
          next({ path: '/', replace: true });
        });
      } else {
        next({ replace: true });
      }
    } else {
      baseLayer.startMicroService();
      next({ path: '/pc', replace: true });
    }
  } else {
    if (!store.getters.userInfo) {
      next({ path: '/', replace: true });
    } else {
      baseLayer.startMicroService();
      next({ replace: true });
    }
  }
}

export default router;
