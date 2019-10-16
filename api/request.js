import config from '../config.js'

const HOST_URL = config.URL;

function post(url, data, success, fail) {
	let token = uni.getStorageSync("X-TOKEN")

	uni.request({
		url: HOST_URL + url,
		method: 'POST',
		data: data, //参数为键值对字符串
		header: {
			'content-type': 'application/json', // 默认值
			"token": token ? token : ''
		},
		success: function(res) {
			if (res.statusCode != 200) {
				if (fail) {
					fail(err)
				} else {
					uni.showToast({
						icon: 'none',
						title: "网络错误"
					});
				}
				return;
			}

			let data = res.data;
			console.log(data)
			if (data.code != 200) {
				if (fail) {
					fail(data.err)
				} else {
					uni.showToast({
						icon: 'none',
						title: data.err
					});
				}
				return;
			}


			if (success) success(data.info)

		},
		fail: function(err) {
			if (fail) {
				fail(err)
			} else {
				uni.showToast({
					icon: 'none',
					title: "网络错误"
				});
			}
		}
	})
}


export default {
	post
}
