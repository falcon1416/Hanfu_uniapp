<template>
	<view class="goods-list">
		<view class="title">
			店铺列表
		</view>
		<view class="product-list">
			<view class="product" v-for="shop in info.list" :key="'shop'+shop.id" @tap="toShop(shop)">
				<image mode="widthFix" :src="shop.image"></image>
				<view class="name">{{ shop.name }}</view>

			</view>
		</view>
		<view class="loading-text">{{ loadingText }}</view>
	</view>
</template>

<script>
	import {
		Query
	} from "@/api/shop.js"
	export default {
		data() {
			return {
				loadingText: '正在加载...',

				info: {
					page: 1,
					limit: 20,
					list: [],
				}
			}
		},
		created() {
			this.loadData();
		},
		methods: {
			//读取数据
			loadData() {
				Query(this.info.page,this.info.limit,(info)=>{
					this.info.list=this.info.list.concat(info.list)
				})
			},
			//下一页
			loadNextData(){
				this.info.page++
				this.loadData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list {

		// background-color: #f4f4f4;
		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			color: #f47825;
			font-size: 30upx;
			margin-top: 10upx;

			image {
				width: 30upx;
				height: 30upx;
			}
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
		}
	}
</style>
