<template>
	<view>
	</view>
</template>

<script>
	import {
		Code2Session
	} from "@/api/app/index.js"
	import {
		Login
	} from "@/api/user/index.js"

	export default {
		data() {
			return {}
		},
		created() {
			// #ifdef MP-WEIXIN || MP-QQ
			this.autoLogin();
			// #endif	
		},
		methods: {
			autoLogin() {
				//获取openid
				uni.login({
					success: res => {
						Code2Session(res.code, info => {
							const openid = info.openid;
							this.$store.dispatch('app/setOpenID', openid)
							Login(openid,info=>{
								const uid=info.id;
								this.$store.dispatch('user/setUID', uid)
								if(uid>0){
									this.$store.dispatch('user/setName', info.name)
									this.$store.dispatch('user/setAvatar', info.avatar)
									this.$store.dispatch('user/setSex', info.sex)
									this.$store.dispatch('user/setAdmin', info.is_admin)
								}
								
								
								
								uni.switchTab({
									url:"/pages/home/index"
								})
							})
						});
					},
				})
			}
		}
	}
</script>

<style>
</style>
