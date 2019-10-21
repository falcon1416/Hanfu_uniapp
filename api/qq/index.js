const ENV = require('../../config/env')
const URL = require("../url.js")
const REQ = require("../request.js")

//查询session
exports.Code2Session = (code, success, fail) => {
	const url = ENV.app.host + URL.qq.code2Session;
	REQ.request(url, {
		code
	}).then(function(info) {
		console.log(info)

		if (success) {
			success({
				openid: info.openid
			})
		}
	}).catch(function (error) {
    console.log(error)
    uni.hideLoading();
    uni.showToast({
      title: error,
      icon: 'none'
    })
  });
}
