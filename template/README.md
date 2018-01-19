# {{ projectName }} by halo-cli

> {{ projectDesc }}
> 用vue搭建的移动端项目模板

## Build Setup

npm 方式
``` bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建版本
npm run build

# 构建版本是时查看 analyzer report
npm run build --report
```

yarn 方式
``` bash
# 安装依赖
yarn

# 本地开发
yarn dev

# 构建版本
yarn build

# 构建版本是时查看 analyzer report
yarn build --report
```

## 文件夹说明

├── index.html       `入口html`
├── package.json     `应用程序的配置信息`
├── .babelrc         `babel的配置文件`
├── .editorconfig    `编辑器配置信息，vscode编辑器推荐使用：EditorConfig for VS Code`
├── .eslintignore    `eslint的ignore`
├── .eslintrc.json   `eslint的配置`
├── .postcssrc.js    `PostCss的配置`
├── .prettierrc.json `prettier的配置文件,vscode插件：Prettier - Code formatter`
├── build            `webpack相关配置`
├── config           `环境变量的一些配置`
├── src              `业务代码`
|   ├── apis         `http接口相关的配置`
|   ├── assets       `css与images资源`
|   ├── components   `公用组件`
|   ├── directives   `自定义指令`
|   ├── filters      `自定义过滤器`
|   ├── mixins       `自定义mixin`
|   ├── pages        `页面`
|   ├── plugins      `自定义插件`
|   ├── router       `路由相关配置`
|   ├── store        `vuex`
|   ├── util         `工具`
|   ├── app.vue      `app组件`
|   └── main.js      `项目入口文件`
└── static           `静态资源`


