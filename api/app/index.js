const ENV = require('../../config/env')
const URL = require("../url.js")
const REQ = require("../request.js")

//查询session
exports.Code2Session = (code, success, fail) => {
	let version="qq";
	// #ifdef MP-WEIXIN
	 version="wx"
	// #endif
	const url = ENV.app.host + URL.app.code2Session;
	REQ.request(url, {
		code,
		version
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
