<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">待审核的店铺</block>
		</cu-custom>
		
		<view v-if="info.list.length==0" class="no-data">
			暂无数据
		</view>
		<view v-else class="cu-list menu-avatar">
			<view @click="handleClick(item)" v-for="(item,index) in info.list" :key="index"  class="cu-item">
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
	</view>
</template>

<script>
	import { QueryAudit } from "@/api/shop/index.js"
	import {
		EventBus
	} from "@/common/bus.js";
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
			EventBus.$on("reloadData-myShop-list", () => {
				this.info.page=1;
				this.info.list=[];
				this.loadData();
			});
			
			this.loadData();
		},
		methods: {
			loadData(){
				const uid = this.$store.getters.uid
				QueryAudit(uid,this.info.page,this.info.limit,info=>{
					this.info.list=this.info.list.concat(info.list)
				})
			},
			handleClick(item){
				if(item.status==0){
					uni.navigateTo({
						url: "/pages/my/shop/edit?id="+item.id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
