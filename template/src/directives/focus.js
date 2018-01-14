import Vue from 'vue';

export default {
  inserted(el) {
    Vue.nextTick(() => {
      el.focus();
    });
  },
};
