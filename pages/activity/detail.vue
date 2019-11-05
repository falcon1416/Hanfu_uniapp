<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">活动详情</block>
		</cu-custom>

		<template v-if="info">
			<!--详情-->
			<view class="cu-list menu">
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

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 报名人员
				</view>
			</view>
			<!--人员-->
			<view class="cu-list menu-avatar">
				<view v-for="(item,index) in joins" :key="index" class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url('+item.avatar+');'"></view>
					<view class="content">
						<view class="text-grey">{{item.name}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								{{item.time}}
							</view>
						</view>
						<view class="action">

						</view>
					</view>
				</view>
			</view>
			<button v-if="info.create_uid==myuid" class="footer" type="default" @click="toEdit">编辑</button>
			<button v-else class="footer" type="default" @click="toEnroll">{{isJoin?'取消报名':'报名'}}</button>
		</template>
	</view>
</template>

<script>
	import {
		Detail,
		Join,
		Leave
	} from "@/api/activity/index.js"
	import {
		EventBus
	} from "@/common/bus.js";

	export default {
		data() {
			return {
				id: '',
				myuid: '',
				info: null,
				joins: [],
				isJoin:false,
			}
		},
		created() {
			EventBus.$on("reloadData-activity-list", () => {
				this.loadData();
			});
		},
		onLoad(options) {
			this.myuid = this.$store.getters.uid
			this.id = parseInt(options.id);
			this.loadData();
		},
		methods: {
			loadData() {
				uni.showLoading();
				Detail(this.id, this.myuid, (info) => {
					uni.hideLoading();
					this.info = info.info
					this.joins = info.joins
					this.isJoin=info.isJoin
				})
			},
			toEdit() {
				uni.navigateTo({
					url: "/pages/activity/edit?id=" + this.info.id
				})
			},
			toEnroll() {
				uni.showLoading();
				if(this.isJoin==false){
					Join(this.id, this.myuid, info => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '加入成功'
						})
						this.loadData();
					})
				}else{
					Leave(this.id, this.myuid, info => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '取消成功'
						})
						this.loadData();
					})
				}
				
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
