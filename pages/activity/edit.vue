<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">编辑活动</block>
		</cu-custom>

		<vEdit ref="edit"></vEdit>
	</view>
</template>

<script>
	import vEdit from "./components/edit"
	import { Detail } from "@/api/activity/index.js"
	export default {
		data() {
			return {
				id:0,
			};
		},
		components:{
			vEdit
		},
		onLoad(options) {
			this.id=parseInt(options.id);
			this.loadData()
		},
		methods: {
			loadData() {
				uni.showLoading();
				Detail(this.id,this.$store.getters.uid, (info) => {
					uni.hideLoading();
					this.$nextTick(()=>{
						this.$refs['edit'].SetInfo(info.info)
					})
				})
			},
			
		},
	}
</script>

<style>
</style>
