/*
 *   环境配置文件
 */

const devConfig = require('./dev')
const prodConfig = require('./prod')

const ENV = {
  'dev': devConfig, //开发环境
  'prod': prodConfig, //生产环境
}

let env=""
if(process.env.NODE_ENV === 'development'){
	env = ENV.dev;
}else{
	env = ENV.prod;
}

module.exports = env;