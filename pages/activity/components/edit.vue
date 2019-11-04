<template>
	<form report-submit @submit="formSubmit">
		<view class="cu-form-group margin-top">
			<view class="title">活动名称</view>
			<input v-model="info.title" placeholder="请输入活动名称"></input>
		</view>
	
		<view class="cu-form-group margin-top">
			<view class="title">活动时间</view>
			<picker mode="time" :value="info.start_time" start="00:01" end="23:59" @change="onStartTimeChange">
				<view class="picker">
					{{info.start_time}}
				</view>
			</picker>
		</view>
	
		<view class="cu-form-group margin-top">
			<textarea v-model="info.desc" maxlength="-1" placeholder="活动介绍"></textarea>
		</view>
		
		<button type="default" class="margin-top" form-type="submit">保存</button>
		
	</form>
</template>

<script>
	import { Add,Edit,Audit } from "@/api/shop/index.js"
	import {
		EventBus
	} from "@/common/bus.js";
	const REQ = require("@/api/upload.js")
	export default {
		data() {
			return {
				isAdd:true,
				
				info:{
					title: '',
					desc:'',
					start_time:'',
					end_time:[],
					uid:0,
				},
			};
		},
		created() {
			
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
					intro:info.intro,
					uid:info.create_uid
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
				this.isAdd=false;
			},
			onStartTimeChange(e) {
				this.start_time = e.detail.value
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
			formSubmit(e) {
				let form_id=e.detail.formId;
				console.log(form_id,e)
				// console.log(this.info)
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
				
				data.uid=this.$store.getters.uid;
				data.type=data.type.join(",")
				data.formid=form_id;
				
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
    .solids { width:60rpx;height:60rpx;}
    .solids text {  font-size:60rpx;}
    .cu-form-group .title  {width:200rpx;}
    checkbox-group label { float:left; margin:10rpx;}
</style>
