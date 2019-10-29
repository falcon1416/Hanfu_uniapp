<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">审核店铺</block>
		</cu-custom>

		<vAudit ref="audit"></vAudit>
	</view>
</template>

<script>
	import { Detail } from "@/api/shop/index.js"
	import vAudit from "./components/audit"
	export default {
		data() {
			return {
				info:null,
			};
		},
		components:{
			vAudit
		},
		onLoad(options) {
			const id=options.id;
			
			uni.showLoading();
			Detail(parseInt(id),info=>{
				uni.hideLoading();
				
				this.$nextTick(()=>{
					this.$refs['audit'].SetInfo(info)
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
