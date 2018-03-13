const { installDependencies } = require('./utils');

module.exports = {
  prompts: {
    projectName: {
      name: 'projectName',
      message: '请输入项目名称',
      type: 'input',
      // default: projectName,
    },
    projectVersion: {
      name: 'projectVersion',
      message: '请输入项目版本号',
      type: 'input',
      default: '0.0.1',
    },
    projectDesc: {
      name: 'projectDesc',
      message: '请输入项目描述',
      type: 'input',
      default: 'A vue project',
    },
    author: {
      name: 'author',
      message: '请输入作者',
      type: 'input',
      // default: gitUser,
    },
    install: {
      name: 'install',
      message: '请选择依赖安装方式',
      type: 'list',
      choices: ['npm', 'yarn', '不需要安装依赖'],
      filter: function(val) {
        if (val === 'npm' || val === 'yarn') {
          return val;
        }
        return 'not';
      },
    },
  },
  complete: function(data) {
    if (data.metaData.install && data.metaData.install != 'not') {
      installDependencies(data.projectPath, data.metaData.install)
    }
  }
}
