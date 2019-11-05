<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">活动详情</block>
		</cu-custom>
		
		<view v-if="info" class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">活动名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.title}}</text>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">活动日期</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.start_time}}</text>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">活动地点</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.address}}</text>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">活动介绍</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.desc}}</text>
				</view>
			</view>
		</view>
		
		<button v-if="info.create_uid==myuid" class="footer" type="default" @click="toEdit">编辑</button>
		<button v-else class="footer" type="default" @click="toEnroll">报名</button>
	</view>
</template>

<script>
	import { Detail,Join } from "@/api/activity/index.js"
	import {
		EventBus
	} from "@/common/bus.js";
	
	export default {
		data() {
			return {
				id: '',
				myuid:'',
				info:null,
			}
		},
		created() {
			EventBus.$on("reloadData-activity-list", () => {
				this.loadData();
			});
		},
		onLoad(options) {
			this.myuid=this.$store.getters.uid
			this.id = parseInt(options.id);
			this.loadData();
		},
		methods: {
			loadData() {
				uni.showLoading();
				Detail(this.id,this.myuid, (info) => {
					uni.hideLoading();
					this.info=info.info
				})
			},
			toEdit(){
				uni.navigateTo({
					url: "/pages/activity/edit?id="+this.info.id
				})
			},
			toEnroll(){
				uni.showLoading();
				Join(this.id,this.myuid,info=>{
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title:'加入成功'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		position: fixed;
		left: 0px;
		bottom: 0px;
		width: 100%;
		z-index: 9999;
	}
</style>
