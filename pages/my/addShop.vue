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
				<input placeholder="" name="name"></input>
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
				<textarea maxlength="-1" name="url" placeholder=""></textarea>
			</view>

			<view class="cu-form-group align-start margin-top">
				<view class="title">复制码</view>
				<textarea maxlength="-1" name="url" placeholder="淘宝分享的复制码"></textarea>
			</view>

			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" name="intro" placeholder="店铺介绍"></textarea>
			</view>

			<button type="default" class="margin-top" form-type="submit">保存</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logo: '',
				typeList:[
					{value:"1",label:"品牌商家",isSelected:false},
					{value:"2",label:"白菜商家",isSelected:false},
					{value:"3",label:"沧海遗珠",isSelected:false},
					{value:"4",label:"正品新店",isSelected:false},
					{value:"5",label:"定制商家",isSelected:false},
					{value:"6",label:"上新店铺",isSelected:false}
				]
			};
		},
		methods: {
			onCheckChange(e){
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
						this.logo = res.tempFilePaths[0]
					}
				});
			},
			formSubmit(e) {
				console.log(e)
			}
		},
	}
</script>

<style>
</style>
