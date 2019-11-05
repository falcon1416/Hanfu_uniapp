<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>

		<button :loading="isLoading" class="margin-top bg-red" open-type="getUserInfo" @getuserinfo="handleUserInfo">获取用户信息</button>
	</view>
</template>

<script>
	import {
		Code2Session
	} from "@/api/app/index.js"
	import {
		Register,
		Login
	} from "@/api/user/index.js"
	export default {
		data() {
			return {
				isLoading: false,
			}
		},
		methods: {
			handleUserInfo(e) {
				let data = e.detail.rawData ? e.detail.rawData : e.detail.data
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
								//重新登录
								Login(openid, info => {
									const uid = info.id;
									this.$store.dispatch('user/setUID', uid)
									if (uid > 0) {
										this.$store.dispatch('user/setName', info.name)
										this.$store.dispatch('user/setAvatar', info.avatar)
										this.$store.dispatch('user/setSex', info.sex)
										this.$store.dispatch('user/setAdmin', info.is_admin)
									}

									this.isLoading = false;
									uni.navigateBack();
								});


							})
						})
					}
				});


				// #endif	

			},
		}
	}
</script>

<style>
</style>
