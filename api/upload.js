const ENV = require('../config/env')
const URL = require("./url.js")
/*
 * url--访问的地址，全路径从http开始
 * body--json格式的请求数据
 * method--请求方式，默认post
 */
const upload = (file) => {
	return new Promise((resolve, reject) => {
		let arr = file.split("/")
		let filename = arr[arr.length - 1]
		console.log(file, filename)
		uni.uploadFile({
			url: ENV.app.host + URL.file.upload,
			filePath: file,
			name: "file",
			header: {
				'content-type': 'multipart/form-data'
			},
			success(res) {
				//接口调用成功的回调函数
				if (res.statusCode != 200) {
					reject({
						"result": res.statusCode,
						"error": res.errMsg
					})
					return
				}


				let resdata = {};

				try {
					resdata = res.data
					resdata=JSON.parse(resdata)


				} catch (error) {
					console.log(error)

					reject(error.message)
					return
				}

				const result = resdata;
				if (result.code != 200) {
					//发生错误
					reject(resdata.error)
					return
				}

				const data = result.info
				resolve(data)
			},
			fail(error) {
				//接口调用失败的回调函数
				console.log(error)
				reject({
					"result": -1,
					"error": error.message
				})
			}
		})
	});
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function(callback) {
	var Promise = this.constructor;
	return this.then(
		function(value) {
			Promise.resolve(callback()).then(
				function() {
					return value;
				}
			);
		},
		function(reason) {
			Promise.resolve(callback()).then(
				function() {
					throw reason;
				}
			);
		}
	);
}

module.exports = {
	upload,
}
