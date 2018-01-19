# HTTP 请求

## 整体思路

1、使用axios进行请求，必要时引入mock进行数据mock

2、在config.js中进行接口请求的配置

## 文件说明

### config.js：接口的配置文件
  A、在config中可以对 `apiHost` 进行修改， apiHost是你请求接口的host或者URL中一致的部分，
  你也可以在其中定义多个host变量，以便在不同接口中使用

  B、在apiHost的声明中也可以设置开发环境是否采用webpack的代理，如需代理请在 `/config/index.js` 中的`proxyTable`字段进行配置

  C、`apiConfigs`对象，存放了各个接口的名字、请求方式、请求地址、是否需要mock等信息，如有其他需求，请自行扩展
    apiConfigs示例：

    ``` json
    const apiConfigs = {
      getCode: { // getCode 为接口名字
        type: 'get', // 接口请求方式
        url: `${apiHost}/patient/patientInfoList`, // 接口请求url
        mock: true, // 接口是否需要mock
      },
    };
    ```
### index.js：用户api的初始化
  该文件导出一个apis对象，该对象根据config.js中的配置进行处理，会将接口名绑定到apis对象上

  如上例子中，调用的示例代码为：

  ``` javascript
  import apis from '../apis';

  apis.getCode({
    a: 1
  }).then((data) => {
    console.log(data);
  });
  ```

### mock文件夹
  该文件夹下存放了与接口名字对应的js文件，用于进行接口的mock数据配置，mock采用的是http://mockjs.com/，
  如上示例中，如果接口mock设置为true，就会自动根据 /mock/getCode.js 中的内容进行数据的mock


