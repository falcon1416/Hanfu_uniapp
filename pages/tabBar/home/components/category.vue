<template>
	<view class="category-list">
		<view class="category" v-for="(row, index) in list" :key="index" @tap="toCategory(row)">
			<view class="img">
				<image :src="row.img"></image>
			</view>
			<view class="text">{{ row.name }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						id: 1,
						name: '襦裙',
						img: '/static/img/noorder.png'
					},
					{
						id: 2,
						name: '马面',
						img: '/static/img/noorder.png'
					},
					{
						id: 3,
						name: '道袍',
						img: '/static/img/noorder.png'
					},
					{
						id: 4,
						name: '鞋子',
						img: '/static/img/noorder.png'
					},

				],
			}
		},
		methods: {
			toCategory(item){
				uni.navigateTo({
					url:"/pages/shop/list?type_id="+item.id+"&name="+item.name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	
		.category {
			width: 25%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
	
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
	
				image {
					width: 19vw;
					height: 19vw;
				}
			}
	
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}
</style>
