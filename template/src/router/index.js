import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from './config';

Vue.use(Router);

export default new Router({
  routes: routerConfig,
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

