<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">提交的店铺</block>
		</cu-custom>
		
		<view v-if="info.list.length==0" class="no-data">
			暂无数据
		</view>
		<view v-else class="cu-list menu-avatar">
			<view v-for="(item,index) in info.list" :key="index"  class="cu-item">
				<view class="cu-avatar round lg" :style="'background-image:url('+item.logo+');'"></view>
				<view class="content">
					<view class="text-grey">{{item.name}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							{{item.intro}}
						</view> </view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{item.status_name}}}</view>
				</view>
			</view>
		</view>
		
		<button class="footer" type="default" @click="toAdd">添加</button>
	</view>
</template>

<script>
	import { My } from "@/api/shop/index.js"
	
	export default {
		data() {
			return {
				info:{
					page:1,
					limit:10,
					list:[],
				}
			};
		},
		created() {
			this.loadData();
		},
		methods: {
			loadData(){
				My(this.info.page,this.info.limit,info=>{
					this.info.list=info.list
				})
			},
			toAdd() {
				uni.navigateTo({
					url: "/pages/my/addShop"
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
