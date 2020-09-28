import {logTypeEnums} from '../../assets/enums';
const logs = {
  state : {

  },
  mutations : {

  },
  actions : {
    log ({ dispatch }, { name, params }) {
      if (name && typeof name === 'string') {
        dispatch(name, params);
      } else {
        throw Error({ reason : '上报类型不存在' });
      }
    },
    visitors ({ dispatch, getters }, params) {
      dispatch('logging', {
        errorMessage : 'success',
        operationType : logTypeEnums.visitors,
        extParams : JSON.stringify({params})
      });
    }
  }
}

export default logs;
