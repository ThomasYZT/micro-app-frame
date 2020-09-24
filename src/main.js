import Vue from 'vue';
import './assets/utils/flexible';
import root from './App.vue';
import router from './router';
import store from './store';
import './assets/plugins';
import 'animate.css';
import './assets/style/scss/_common.scss';
import BaseLayer from '../BaseLayer';

Vue.config.productionTip = false;

const baseLayer = new BaseLayer({ Vue, root, router, store });

baseLayer.startup();

baseLayer.preloadApp();
