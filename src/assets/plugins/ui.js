import button from '../../components/button';
import card from '../../components/card';

export default {
  install (Vue) {
    Vue.component(button.name, button);
    Vue.component(card.name, card);
  }
};
