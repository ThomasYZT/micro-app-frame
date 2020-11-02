import Vue from 'vue';
import Vuex from 'vuex';
import { Storage } from '../assets/utils/common';
import { storageKeys } from '../assets/enums';
import ajax from '../assets/api';
import MD5 from 'crypto-js/md5';
import logs from './modules/log';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    logs
  },
  state: {
    userInfo: Storage.get(storageKeys.userInfo),
    loginModalStatus: { status: false, name: '' },
    errMsg: ''
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    errMsg: state => {
      return state.errMsg;
    },
    loginModalStatus: state => {
      return state.loginModalStatus;
    }
  },
  mutations: {
    UPDATE_USERINFO: (state, data) => {
      state.userInfo = data;
      Storage.set(storageKeys.userInfo, data);
    },
    UUPDATE_LOGINMODAL_STATUS: (state, config) => {
      state.loginModalStatus = config;
    },
  },
  actions: {
    login ({ commit, dispatch }, params) {
      return ajax.post({
        apiKey: 'webLogin',
        params: params
      }).then(res => {
        if (res.code === 0) {
          commit('UPDATE_USERINFO', res.data);
          // dispatch('showMsg', { type: 'success', content: '登录成功' });
          return res.data;
        } else {
          dispatch('showMsg', { type: 'error', content: '登录失败' });
          return Promise.reject();
        }
      });
    },
    showMsg: (msgObj) => {
      Vue.prototype.$msg[msgObj.type](msgObj.content);
    },
    showLoginModal: ({ commit }, name) => {
      commit('UUPDATE_LOGINMODAL_STATUS', {
        status: true,
        name: name
      });
      setTimeout(() => {
        commit('UUPDATE_LOGINMODAL_STATUS', {
          status: false,
          name: ''
        });
      }, 0);
    },
    // 日志上报
    logging ({ commit, state }, params) {
      params.operationType = 'PC_' + params.operationType;
      params.clientTimestamp = new Date().getTime();
      if (params.extParams) {
        const extParams = JSON.parse(params.extParams);
        extParams.hostType = state.hostType;
        params.extParams = JSON.stringify(extParams);
      } else {
        params.extParams = JSON.stringify({ hostType: state.hostType });
      }
      return new Promise((resolve, reject) => {
        ajax.post({
          apiKey: 'uploadOperationInfo',
          params: params,
          config: null,
          module: 'commonURL'
        }).then(res => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
});
