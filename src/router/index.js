import Vue from 'vue';
import store from '../store';
import config from '../config';
import VueRouter from 'vue-router';
import baseLayer from '../main';
import flexible from '../assets/utils/flexible';
import activity from './module/activity';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
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
    },
    ...activity
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.getters.machineCode) store.dispatch('setMachineCode');
  if (!store.getters.channelInfo) {
    store.dispatch('setChannelInfo', to.query.pqadtag);
    store.dispatch('channelReport');
  }
  if (baseLayer) {
    auth(to, from, next);
  } else {
    setTimeout(() => {
      auth(to, from, next);
    }, 0);
  }
});

function resolveParams (params = {}) {
  let queryPath = '';
  let queryIndex = 0;
  Object.keys(params).forEach(key => {
    if (['jumpTo', 'code', 'state'].indexOf(key) < 0) {
      if (key !== 'searchTo') {
        queryPath += queryIndex > 0 ? `&${key}=${params[key]}` : `?${key}=${params[key]}`;
      } else {
        let searchTo = decodeURIComponent(params[key]);
        searchTo = searchTo.indexOf('?') >= 0 ? searchTo.split('?')[1] : searchTo;
        queryPath += queryIndex > 0
          ? `&${searchTo}`
          : `?${searchTo}`;
      }
      queryIndex++;
    }
  });
  return queryPath;
}

function jumpToControl (to, next) {
  switch (to.query.jumpTo) {
    case 'clip':
      next({ path: `/clip${resolveParams(to.query)}`, replace: true });
      break;
    case 'upload':
      next({ path: `/upload${resolveParams(to.query)}`, replace: true });
      break;
    default:
      next({ path: `/upload${resolveParams(to.query)}`, replace: true });
  }
}

function loginUnit (to, next) {
  store.dispatch('login', {
    code: to.query.code,
    appType: 8,
    appId: config.APPID
  }).then(res => {
    flexible.clear();
    baseLayer.startMicroService();
    store.dispatch('channelReport');
    jumpToControl(to, next);
  }).catch(err => {
    next({ path: '/', replace: true });
  });
}

function auth (to, from, next) {
  if (to.path === '' || to.path === '/') {
    // 根路由
    if (!store.getters.userInfo) {
      if (to.query.code) {
        loginUnit(to, next);
      } else {
        next({ replace: true });
      }
    } else {
      flexible.clear();
      baseLayer.startMicroService();
      next({ path: '/upload', replace: true });
    }
  } else {
    // 非根路由
    if (to.query.code) {
      loginUnit(to, next);
    } else {
      if (/\/upload|\/clip/.test(to.path)) {
        if (!store.getters.userInfo) {
          if (to.path === '/upload/help' || /\/clip/.test(to.path)) {
            flexible.clear();
            baseLayer.startMicroService();
            next();
          } else {
            next({ path: '/', replace: true });
          }
        } else {
          flexible.clear();
          baseLayer.startMicroService();
          next({ replace: true });
        }
      } else {
        flexible.init();
        if (to.matched && to.matched.length > 0) {
          next();
        } else {
          next({ path: '/', replace: true });
        }
      }
    }
  }
}

export default router;
