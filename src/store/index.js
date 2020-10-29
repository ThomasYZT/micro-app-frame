import Vue from 'vue';
import Vuex from 'vuex';
import { Storage } from '../assets/utils/common';
import util from '../assets/utils/util';
import { storageKeys } from '../assets/enums';
import ajax from '../assets/api';
import logs from './modules/log';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    logs
  },
  state: {
    userInfo: Storage.get(storageKeys.userInfo),
    machineCode: Storage.get(storageKeys.machineCode),
    channelInfo: Storage.get(storageKeys.channelInfo),
    loginModalStatus: false,
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
    },
    machineCode: state => {
      return state.machineCode;
    },
    channelInfo: state => {
      return state.channelInfo;
    }
  },
  mutations: {
    UPDATE_USERINFO: (state, data) => {
      state.userInfo = data;
      Storage.set(storageKeys.userInfo, data);
    },
    UUPDATE_LOGINMODAL_STATUS: (state, status) => {
      state.loginModalStatus = status;
    },
    UPDATE_MACHINE_CODE: (state, data) => {
      state.machineCode = data;
      Storage.set(storageKeys.machineCode, data);
    },
    UPDATE_CHANNEL_INFO: (state, data) => {
      state.channelInfo = data;
      Storage.set(storageKeys.channelInfo, data);
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
          // dispatch('showMsg', { type: 'success', content: '登录成功' });
          return res.data;
        } else {
          dispatch('showMsg', { type: 'error', content: '登录失败' });
          return Promise.reject();
        }
      });
    },
    setMachineCode ({ commit }) {
      const mid = util.generateID();
      commit('UPDATE_MACHINE_CODE', mid);
    },
    setChannelInfo ({ commit }, data = '') {
      const _channelInfo = {
        primaryChannel: '',
        secondChannel: ''
      };
      try {
        const _channelArr = data.split('.');
        _channelInfo.primaryChannel = _channelArr[0] || '';
        _channelInfo.secondChannel = _channelArr[1] || '';
        commit('UPDATE_CHANNEL_INFO', _channelInfo);
      } catch (e) {
        commit('UPDATE_CHANNEL_INFO', _channelInfo);
      }
    },
    channelReport ({ state }) {
      return new Promise((resolve, reject) => {
        ajax.post({
          apiKey: 'channelReport',
          params: {
            ...state.channelInfo
          }
        }).then(() => {
          resolve();
        }).catch(() => {
          reject();
        });
      });
    },
    showMsg: (msgObj) => {
      Vue.prototype.$msg[msgObj.type](msgObj.content);
    },
    showLoginModal: ({ commit }) => {
      commit('UUPDATE_LOGINMODAL_STATUS', true);
      setTimeout(() => {
        commit('UUPDATE_LOGINMODAL_STATUS', false);
      }, 0);
    },
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
