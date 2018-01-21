# router 说明


## config.js
存放路由的配置信息

1、路由组件默认采用了异步加载的方式，如不需要请自行修改。
请注意： `const index = () => import(/* webpackChunkName: "index" */ '@/pages/index');` 中的相关语法
`/* webpackChunkName: "index" */ ` 虽然是注释，但是其中声明了当前组件的`chunkName`，webpack在解析的过程中，会把`@/pages/index`这个组件单独的达成indexXXXX.js，利用这个特性进行的资源分包处理。
详情请查看 [webpack文档-import](https://webpack.js.org/api/module-methods/#import-)

2、meta中的title字段定义了document.title的内容，会在页面跳转时自动切换



