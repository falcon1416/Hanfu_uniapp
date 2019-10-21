<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">提交的店铺</block>
		</cu-custom>
		<button type="default" @click="toAdd">添加</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			toAdd() {
				uni.navigateTo({
					url: "/pages/my/addShop"
				})
			}
		}
	}
</script>

<style>
</style>
