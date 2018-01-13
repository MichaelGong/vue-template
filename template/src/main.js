// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'es6-promise/auto';
import Vue from 'vue';
import attachFastClick from 'fastclick';
import App from './App';
import router from './router';
import store from './store';
import './assets/css/common.scss';
import Confirm from './plugins/confirm/index';
import Loading from './plugins/loading/index';
import filters from './filters';

if (!window.Promise) {
  window.Promise = Promise;
}
attachFastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(Confirm);
Vue.use(Loading);
// 注册过滤器
Object.keys(filters).forEach(filter => Vue.filter(filter, filters[filter]));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
