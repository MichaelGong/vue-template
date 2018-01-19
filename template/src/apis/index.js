/* eslint-disable global-require */
import axios, { CancelToken } from 'axios';
import apiConfigs from './config';

const apis = {};
const mockApis = {};
/**
 * 加载mock文件,mock 请求数据
 */
if (process.env.NODE_ENV === 'development') {
  const Mock = require('mockjs');
  const files = require.context('./mock/', true, /^\.\/([\w\W]*).js$/);
  files.keys().forEach((key) => {
    let model = apiConfigs[key.replace(/(\.\/|\.js)/g, '')];
    // 开发环境判断是否需要mock数据
    if (model.mock) {
      model.data = files(key).default;
      mockApis[model] = Mock.mock(model.url, model.data);
    }
  });
}

Object.keys(apiConfigs).forEach((item) => {
  let apiConfig = apiConfigs[item];
  /**
   * 创建api请求function，返回promise对象
   */
  apis[item] = function requestApi(data) {
    let dataTmp = Object.assign({}, data);
    return axios({
      method: apiConfig.type.toLowerCase(),
      url: apiConfig.url,
      timeout: 15000,
      data: apiConfig.type.toLowerCase() === 'get' ? {} : dataTmp,
      params: apiConfig.type.toLowerCase() === 'get' ? dataTmp : {},
      withCredentials: true,
      cancelToken: new CancelToken(function executor(c) {
        apis[item + 'Cancel'] = c;
      }),
    }).then((response) => {
      // 此处正常业务逻辑，以下仅为参考
      if (response.data && +response.data.code === 1) {
        return response.data.data;
      }
      return Promise.reject(response.data);
    }).catch(function(errorReturn) {
      // 这里可以做一些全局的错误处理 或者 也可以使用axios的全局拦截器
      return Promise.reject(errorReturn);
    });
  };
});

export default apis;
