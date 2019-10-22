<template>
	<scroll-view scroll-y class="page">
		<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636052810&di=a72e718e89843b26bd55500779466e2f&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fad547b7090e0ba0ff5729b5809d40742186e033ff624-sC1wHP_fw658"
		 mode="widthFix" class="response"></image>

		<button v-if="isLogin==false" :loading="isLoading" class="margin-top bg-red" open-type="getUserInfo" @getuserinfo="handleUserInfo">获取用户信息</button>

		<view v-else class="cu-list menu margin-top">
			<view @click="toShop" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">提交的店铺</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{shopInfo.pass_count}}/{{shopInfo.wait_count+shopInfo.pass_count}}</text>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {
		Code2Session
	} from "@/api/qq/index.js"
	import {
		Register,
		MyInfo
	} from "@/api/user/index.js"
	export default {
		data() {
			return {
				isLogin: false,
				isLoading: false,

				shopInfo: {
					pass_count: 0,
					wait_count: 0
				}
			};
		},
		created() {
			const uid = uni.getStorageSync('uid')
			console.log("uid:",uid)
			if (uid && uid > 0) {
				this.isLogin = true;
				this.loadData();
			}
		},
		methods: {
			loadData() {
				MyInfo(info => {
					this.shopInfo = info.shop
				})
			},
			handleUserInfo(e) {
				let data=e.detail.rawData?e.detail.rawData:e.detail.data
				const info = JSON.parse(data)
				this.login(info)
			},
			login(info) {
				const avatar = info.avatarUrl;
				const sex = info.gender;
				const name = info.nickName;
				// #ifdef MP-WEIXIN || MP-QQ
				this.isLoading = true;
				//获取openid
				uni.login({
					success: res => {
						Code2Session(res.code, info => {
							const openid = info.openid;
							Register(openid, name, avatar, sex, info => {
								uni.setStorageSync('openid', openid);
								uni.setStorageSync('name', name);
								uni.setStorageSync('avatar', avatar);
								uni.setStorageSync('sex', sex);
								uni.setStorageSync('token', info.token);
								uni.setStorageSync('uid', info.uid);

								this.isLoading = false;
								this.isLogin = true;

							})
						})
					}
				});


				// #endif	

			},
			toShop() {
				uni.navigateTo({
					url: "/pages/my/shop/index"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
