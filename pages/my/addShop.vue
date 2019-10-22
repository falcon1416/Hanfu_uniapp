<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">添加店铺</block>
		</cu-custom>

		<form report-submit @submit="formSubmit">
			<view class="cu-form-group margin-top">
				<view class="title">logo</view>
				<view class="solids" @tap="handleChooseImage">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">店名</view>
				<input placeholder="请输入店名" name="name"></input>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">分类</view>
				<checkbox-group name="type" @change="onCheckChange">
					<label v-for="(item,index) in typeList" :key="index">
						<checkbox :class="item.isSelected?'checked':''" :checked="item.isSelected?true:false" :value="item.value" /><text>{{item.label}}</text>
					</label>
				</checkbox-group>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">标签</view>
				<input placeholder="多个标签,空格区分" name="tag"></input>
			</view>

			<view class="cu-form-group align-start margin-top">
				<view class="title">淘宝地址</view>
				<textarea maxlength="-1" name="url" placeholder="请输入淘宝地址"></textarea>
			</view>

			<view class="cu-form-group align-start margin-top">
				<view class="title">复制码</view>
				<textarea maxlength="-1" name="share" placeholder="淘宝分享的复制码"></textarea>
			</view>

			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" name="intro" placeholder="店铺介绍"></textarea>
			</view>

			<button type="default" class="margin-top" form-type="submit">保存</button>
		</form>
	</view>
</template>

<script>
	import { Add } from "@/api/shop/index.js"
	const REQ = require("@/api/upload.js")
	export default {
		data() {
			return {
				logo: '',
				typeList: [{
						value: "1",
						label: "品牌商家",
						isSelected: false
					},
					{
						value: "2",
						label: "白菜商家",
						isSelected: false
					},
					{
						value: "3",
						label: "沧海遗珠",
						isSelected: false
					},
					{
						value: "4",
						label: "正品新店",
						isSelected: false
					},
					{
						value: "5",
						label: "定制商家",
						isSelected: false
					},
					{
						value: "6",
						label: "上新店铺",
						isSelected: false
					}
				]
			};
		},
		methods: {
			onCheckChange(e) {
				const values = e.detail.value;
				for (var i = 0; i < this.typeList.length; ++i) {
					this.typeList[i].isSelected = false;
					for (var j = 0; j < values.length; ++j) {
						if (this.typeList[i].value == values[j]) {
							this.typeList[i].isSelected = true;
							break
						}
					}
				}
			},
			handleChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						uni.showLoading();
						let self=this;
						REQ.upload(res.tempFilePaths[0]).then(function(info) {
							console.log(info)
							self.logo=info.filename;
							console.log(self.logo)
							uni.hideLoading();
							
						}).catch(function(error) {
							uni.hideLoading();
						});
					}
				});
			},
			formSubmit(e) {
				let data = e.detail.value
				data.logo = this.logo;
				console.log(this.logo,data)
				for (let key in data) {
					if (data[key].length == 0) {
						uni.showToast({
							icon: 'none',
							title: '请填写所有信息',
							duration: 2000
						});
						return;
					}
				}
				
				data.uid=uni.getStorageSync('uid');
				data.type=data.type.join(",")
				uni.showLoading();
				Add(data,info=>{
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title:'添加成功,等待审核'
					})
					uni.navigateBack();
				})
			}
		},
	}
</script>

<style>
</style>
