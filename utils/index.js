
const spawn = require('child_process').spawn
const chalk = require('chalk');

/**
 * 执行安装命令，默认执行yarn install
 * @param {*} cwd
 * @param {*} executable
 * @param {*} color
 */
function installDependencies(
  cwd,
  executable = 'yarn',
  color = chalk.green
) {
  console.log(`\n\n# ${color('Installing project dependencies ...')}`)
  console.log('# ========================')
  return runCommand(executable, ['install'], {
    cwd,
  })
}
function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    )

    spwan.on('exit', () => {
      resolve()
    })
  })
}

module.exports = {
  installDependencies,
  runCommand,
}
