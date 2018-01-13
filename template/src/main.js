// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'es6-promise/auto';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './assets/css/common.scss';
import Confirm from './components/confirm/index';
import Loading from './plugins/loading/index';
// import 'core-js/fn/array/includes';

if (!window.Promise) {
  window.Promise = Promise;
}

const attachFastClick = require('fastclick');

attachFastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.$confirm = Confirm;
Vue.prototype.$confirm = Confirm;

Vue.use(Loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
