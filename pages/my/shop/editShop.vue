<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">编辑店铺</block>
		</cu-custom>

		<vEdit ref="edit"></vEdit>
	</view>
</template>

<script>
	import { Detail } from "@/api/shop/index.js"
	import vEdit from "./components/edit"
	export default {
		data() {
			return {
				info:null,
			};
		},
		components:{
			vEdit
		},
		onLoad(options) {
			const id=options.id;
			
			uni.showLoading();
			Detail(parseInt(id),info=>{
				uni.hideLoading();
				
				this.$nextTick(()=>{
					this.$refs['edit'].SetInfo(info)
				})
			})
		},
		created() {
			
		},
		methods: {
			
		},
	}
</script>

<style>
</style>
