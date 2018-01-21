import SkeletonItem from './skeletonItem.vue';

export default {
  install(Vue) {
    Vue.component(SkeletonItem.name, SkeletonItem);
  },
};
