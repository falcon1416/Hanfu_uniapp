const ENV = require('../../config/env')
const URL = require("../url.js")
const REQ = require("../request.js")

exports.Add = (data, success, fail) => {
	let plantform="qq";
	// #ifdef MP-WEIXIN
	 plantform="wx"
	// #endif
	data['plantform']=plantform;
	const url = ENV.app.host + URL.shop.add;
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

exports.Edit = (data, success, fail) => {
	const url = ENV.app.host + URL.shop.edit;
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

exports.Audit= (data, success, fail) => {
	const url = ENV.app.host + URL.shop.audit;
	REQ.request(url, data).then(function(info) {
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

exports.My = (uid,page, limit, success, fail) => {
	const url = ENV.app.host + URL.shop.my;
	REQ.request(url, {
		page,
		limit,
		uid
	}).then(function(info) {
		for (let i = 0; i < info.list.length; i++) {
			let obj = info.list[i];
			obj.logo = ENV.app.image + obj.logo
		}
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

exports.QueryAudit= (uid,page, limit, success, fail) => {
	const url = ENV.app.host + URL.shop.queryaudit;
	REQ.request(url, {
		page,
		limit,
		uid
	}).then(function(info) {
		for (let i = 0; i < info.list.length; i++) {
			let obj = info.list[i];
			obj.logo = ENV.app.image + obj.logo
		}
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

exports.Detail = (id, success, fail) => {
	const url = ENV.app.host + URL.shop.detail;
	REQ.request(url, {
		id
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
