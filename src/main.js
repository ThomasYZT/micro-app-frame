import 'whatwg-fetch';
import 'custom-event-polyfill';
import 'core-js/stable/promise';
import 'core-js/stable/symbol';
import 'core-js/stable/string/starts-with';
import 'core-js/web/url';
import Vue from 'vue';
import flexible from './assets/utils/flexible';
import root from './App.vue';
import router from './router';
import store from './store';
import './assets/plugins';
import 'animate.css';
import './assets/style/scss/_common.scss';
import BaseLayer from '../BaseLayer';

Vue.config.productionTip = false;

flexible.init();
const baseLayer = new BaseLayer({ Vue, root, router, store });

baseLayer.startup();
baseLayer.preloadApp();

export default baseLayer;
