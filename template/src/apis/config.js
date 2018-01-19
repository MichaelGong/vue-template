// 本地开发使用代理，代理的配置在webpack中，如果无需启动代理请自行改动下面代码，此处使用的是拦截带有'/proxy'的请求进行代理
// webpack中默认打开代理配置，请查看'config/index.js'中的 'proxyTable' 字段，请注意相关字段的修改
const apiHost = process.env.NODE_ENV === 'development' ? '/proxy' : (window.location.protocol + '//xxx');

const apiConfigs = {
  // 接口格式示例
  getCode: { // getCode 为接口名字
    type: 'get', // 接口请求方式
    url: `${apiHost}/patient/patientInfoList`, // 接口请求url
    mock: true, // 接口是否需要mock
  },
};

export default apiConfigs;
