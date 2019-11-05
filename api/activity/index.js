const ENV = require('../../config/env')
const URL = require("../url.js")
const REQ = require("../request.js")

exports.Query = (uid, page, limit, success, fail) => {
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

exports.Edit = (data, success, fail) => {
	const url = ENV.app.host + URL.activity.edit;
	REQ.request(url, data).then(function(info) {
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

exports.Detail = (id, uid, success, fail) => {
	const url = ENV.app.host + URL.activity.detail;
	REQ.request(url, {
		id,
		uid
	}).then(function(info) {
		console.log(info)
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

exports.Join = (id, uid, success, fail) => {
	const url = ENV.app.host + URL.activity.join;
	REQ.request(url, {
		id,
		uid
	}).then(function(info) {
		console.log(info)
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

exports.Leave = (id, uid, success, fail) => {
	const url = ENV.app.host + URL.activity.leave;
	REQ.request(url, {
		id,
		uid
	}).then(function(info) {
		console.log(info)
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
