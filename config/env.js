/*
 *   环境配置文件
 */

const devConfig = require('./dev')
const prodConfig = require('./prod')

const ENV = {
  'dev': devConfig, //开发环境
  'prod': prodConfig, //生产环境
}

let env=ENV.dev;


module.exports = env;