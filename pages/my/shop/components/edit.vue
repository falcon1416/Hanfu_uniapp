<template>
	<form report-submit>
		<view class="cu-form-group margin-top">
			<view class="title">logo</view>
			<view class="solids" @tap="handleChooseImage">
				<text class='cuIcon-cameraadd'></text>
			</view>
		</view>
	
		<view class="cu-form-group margin-top">
			<view class="title">店名</view>
			<input v-model="info.name" placeholder="请输入店名"></input>
		</view>
	
		<view class="cu-form-group margin-top">
			<view class="title">分类</view>
			<checkbox-group @change="onCheckChange">
				<label v-for="(item,index) in typeList" :key="index">
					<checkbox :class="item.isSelected?'checked':''" :checked="item.isSelected?true:false" :value="item.value" /><text>{{item.label}}</text>
				</label>
			</checkbox-group>
		</view>
	
		<view class="cu-form-group margin-top">
			<view class="title">标签</view>
			<input v-model="info.tag" placeholder="多个标签,空格区分"></input>
		</view>
	
		<view class="cu-form-group align-start margin-top">
			<view class="title">复制码</view>
			<textarea v-model="info.share" maxlength="-1" placeholder="淘宝分享的复制码"></textarea>
		</view>
	
		<view class="cu-form-group margin-top">
			<textarea v-model="info.intro" maxlength="-1" placeholder="店铺介绍"></textarea>
		</view>
	
		<button type="default" class="margin-top" @click="formSubmit">保存</button>
	</form>
</template>

<script>
	import { Add,Edit } from "@/api/shop/index.js"
	import {
		EventBus
	} from "@/common/bus.js";
	const REQ = require("@/api/upload.js")
	export default {
		data() {
			return {
				isAdd:true,
				
				info:{
					logo: '',
					name:'',
					tag:'',
					type:[],
					share:'',
					intro:'',
					uid:0,
				},
				
				
				
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
			SetInfo(info){
				let types=info.type.split(",")
				this.info={
					id:info.id,
					logo: info.logo,
					name:info.name,
					tag:info.tag,
					type:types,
					share:info.share,
					intro:info.intro
				}
				
				for (var i = 0; i < this.typeList.length; ++i) {
					this.typeList[i].isSelected = false;
					for (var j = 0; j < types.length; ++j) {
						if (this.typeList[i].value == types[j]) {
							this.typeList[i].isSelected = true;
							break
						}
					}
				}
				console.log(this.info)
				this.isAdd=false;
			},
			onCheckChange(e) {
				const values = e.detail.value;
				this.info.type=values;
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
							self.info.logo=info.filename;
							uni.hideLoading();
							
						}).catch(function(error) {
							uni.hideLoading();
						});
					}
				});
			},
			formSubmit() {
				console.log(this.info)
				const data={}
				for (let key in this.info) {
					data[key]=this.info[key]
					if (this.info[key].length == 0) {
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
				
				if(this.isAdd==true){
					this.addData(data);
				}else{
					this.editData(data);
				}
			},
			addData(data){
				uni.showLoading();
				Add(data,info=>{
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title:'添加成功,等待审核'
					})
					uni.navigateBack();
					EventBus.$emit("reloadData-myShop-list");
				})
			},
			editData(data){
				uni.showLoading();
				Edit(data,info=>{
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title:'修改成功'
					})
					uni.navigateBack();
					EventBus.$emit("reloadData-myShop-list");
				})
			}
		},
	}
</script>

<style>
</style>
