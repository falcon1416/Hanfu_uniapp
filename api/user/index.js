const ENV = require('../../config/env')
const URL = require("../url.js")
const REQ = require("../request.js")

//注册
exports.Register = (openid, name, avatar, sex, success, fail) => {
	const url = ENV.app.host + URL.user.register;
	REQ.request(url, {
		openid,
		name,
		avatar,
		sex
	}).then(function(info) {
		if (success) {
			success(info)
		}
	}).catch(function(error) {
		console.log(error)
		uni.hideLoading();
		uni.showToast({
			title: error,
			icon: 'none'
		})
	});
}
