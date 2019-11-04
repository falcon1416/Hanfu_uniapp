<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">发布活动</block>
		</cu-custom>

		<vEdit></vEdit>
	</view>
</template>

<script>
	import vEdit from "./components/edit"
	export default {
		data() {
			return {
				
			};
		},
		components:{
			vEdit
		},
		methods: {
			
		},
	}
</script>

<style>
</style>
