import Card from '../../components/card';
import Modal from '../../components/modal';
import ajax from '../../assets/api';
import util from '../../assets/utils/util';
export default {
  install (Vue) {
    Vue.component(Card.name, Card);
    Vue.component(Modal.name, Modal);

    Vue.prototype.$ajax = ajax;
    Vue.prototype.$msg = msg;
    Vue.prototype.$util = util;
  }
};

const msg = ((config) => {
  function _createTag (msg, type) {
    let _clazz;
    switch (type) {
      case 'default':
        _clazz = 'tzld-msg-box-default';
        break;
      case 'success':
        _clazz = 'tzld-msg-box-success';
        break;
      case 'error':
        _clazz = 'tzld-msg-box-error';
        break;
    }
    const _msgBox = document.createElement('div');
    const _txtDiv = document.createElement('div');
    const _baseClazz = `tzld-msg-box ${_clazz}`;
    _msgBox.setAttribute('class', `${_baseClazz} animate__animated animate__fadeInDownBig`);
    _txtDiv.innerHTML = msg;
    _msgBox.appendChild(_txtDiv);
    return { _msgBox, _baseClazz };
  }

  function removeTag (tag) {
    setTimeout(() => {
      tag.remove();
    }, 300);
  }

  function showToast (msg, type) {
    const obj = _createTag(msg, type);
    document.body.appendChild(obj._msgBox);
    setTimeout(() => {
      obj._msgBox.setAttribute('class', `${obj._baseClazz} animate__animated animate__fadeOutUpBig`);
      removeTag(obj._msgBox);
    }, 2000);
  }

  function _msg (msg) {
    if (msg) {
      _msg.default(msg, 'default');
    }
  }
  _msg.default = (msg) => {
    showToast(msg, 'default');
  };
  _msg.success = (msg) => {
    showToast(msg, 'success');
  };
  _msg.error = (msg) => {
    showToast(msg, 'error');
  };

  return _msg;
})();
