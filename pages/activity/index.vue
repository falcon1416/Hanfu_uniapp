<template>
	<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">

		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="content">活动</block>
		</cu-custom>


		<view class="cu-list menu">
			<view @click="handleClick(item)" v-for="(item,index) in info.list" :key="index" class="cu-item">
				<view class="content">
					<view class="text-grey">{{item.title}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							{{item.address}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{item.start_time}}</view>
				</view>
			</view>
		</view>

		<button class="footer" type="default" @click="toAdd">发布活动</button>
	</mescroll-uni>
</template>

<script>
	import {
		Query
	} from "@/api/activity/index.js"
	import MescrollUni from "@/libs/mescroll-uni/mescroll-uni.vue";

	import {
		EventBus
	} from "@/common/bus.js";
	export default {
		data() {
			return {
				mescroll: null,
				downOption: {
					auto: false, // 不自动加载
				},
				upOption: {
					auto: false, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						// 	size: 10 // 每页数据的数量
					},
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无数据 ~', // 提示
					}
				},

				info: {
					page: 1,
					limit: 10,
					list: [],
				}
			};
		},
		components: {
			MescrollUni
		},
		created() {
			EventBus.$on("reloadData-activity-list", () => {
				this.info.page = 1;
				this.info.list = [];
				this.loadData();
			});

			this.$nextTick(() => {
				this.loadData();
			})

		},
		methods: {
			loadData() {
				this.mescroll.triggerDownScroll();
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let page = this.mescroll.num ? this.mescroll.num : 1
				//联网加载数据
				const uid = this.$store.getters.uid
				Query(uid, page, this.info.limit, (info) => {
					if (mescroll.num == 1) this.info.list = info.list;
					else this.info.list = this.info.list.concat(info.list)
					mescroll.endBySize(this.info.list.length, info.total);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			handleClick(item) {
				uni.navigateTo({
					url: "/pages/activity/detail?id=" + item.id
				})
			},
			toAdd() {
				uni.navigateTo({
					url: "/pages/activity/add"
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
