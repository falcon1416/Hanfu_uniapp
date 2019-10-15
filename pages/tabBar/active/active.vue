<template>
	<view>
		<view v-if="showHeader" class="status" :style="{position:headerPosition,top:statusTop}"></view>
		<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="title">活动介绍</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 商品列表 -->
		<view class="atout">
            <img src="http://pic8.58cdn.com.cn/zhuanzh/n_v28750a0cc033d406a9158f058a2ef8e53.jpg?w=750&h=0"/>
            
			各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明各种文字说明
            <img src="http://pic8.58cdn.com.cn/zhuanzh/n_v28750a0cc033d406a9158f058a2ef8e53.jpg?w=750&h=0"/>
        </view>

	</view>
</template>

<script>

	export default {
		data() {
			return {
				sumPrice:'0.00',
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				showHeader:true,
				selectedList:[],
				isAllselected:false,
				goodsList:[
					
				],
				//控制滑动效果
				theIndex:null,
				oldIndex:null,
				isStop:false
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			
		},
		methods: {
			
			
			
			
			
			
			
		}
	}
</script>
<style lang="scss">
	page{position: relative;background-color: #fff;}
    .atout {
        padding:30upx;
        img {
            max-width: 100%;;
        }
    }
	.checkbox-box{
		display: flex;
		align-items: center;
		.checkbox{
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #f06c7a;
			display: flex;
			justify-content: center;
			align-items: center;
			.on{
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: #f06c7a;
			}
		}
		.text{
			font-size: 28upx;
			margin-left: 10upx;
		}
	}
.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
	}

	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.title{
			font-size: 36upx;
		}
		
	}
	.place{
		
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	
	
</style>
