import Vue from 'vue';
import Vuex from 'vuex';
import { Storage } from '../assets/utils/common';
import { storageKeys } from '../assets/enums';
import ajax from '../assets/api';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    userInfo: Storage.get(storageKeys.userInfo),
    errMsg: '',
  },
  getters: {
    userInfo: state => {
      return state.userInfo
    },
    errMsg: state => {
      return state.errMsg
    }
  },
  mutations: {
    UPDATE_USERINFO: (state, data) => {
      state.userInfo = data;
      Storage.set(storageKeys.userInfo, data);
    }
  },
  actions: {
    login ({ commit, dispatch }, params) {
      return ajax.post({
        apiKey: 'webLogin',
        params: params
      }).then(res => {
        if (res.code === 0) {
          commit('UPDATE_USERINFO', res.data);
          dispatch('showMsg', { type: 'success', content: '登录成功' });
          return res.data;
        } else {
          dispatch('showMsg', { type: 'error', content: '登录失败' });
          return Promise.reject();
        }
      })
    },
    showMsg : ({ state }, msgObj) => {
      Vue.prototype.$msg[msgObj.type](msgObj.content);
    },
  }
})
