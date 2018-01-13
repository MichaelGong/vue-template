// 首页
const index = () => import(/* webpackChunkName: "index" */ '@/pages/index');

// 路由配置
export default [{
  path: '/',
  name: 'index',
  meta: {
    title: '首页',
  },
  component: index,
}, {
  path: '*', // 其他页面
  redirect: '/',
}];
