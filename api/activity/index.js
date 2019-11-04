const ENV = require('../../config/env')
const URL = require("../url.js")
const REQ = require("../request.js")

exports.Query = (uid,page, limit, success, fail) => {
	const url = ENV.app.host + URL.activity.query;
	REQ.request(url, {
		page,
		limit
	}).then(function(info) {
		
		if (success) {
			success(info)
		}
	}).catch(function(error) {
		console.log(error)
		uni.hideLoading();
		if (error) {
			uni.showToast({
				title: error,
				icon: 'none'
			})
		}
	});
}

exports.Add = (data, success, fail) => {
	const url = ENV.app.host + URL.activity.create;
	REQ.request(url, data).then(function(info) {
		console.log(info)
		if (success) {
			success()
		}
	}).catch(function(error) {
		console.log(error)
		uni.hideLoading();
		if (error) {
			uni.showToast({
				title: error,
				icon: 'none'
			})
		}
	});
}
