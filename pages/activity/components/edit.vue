<template>
	<form report-submit @submit="formSubmit">
		<view class="cu-form-group margin-top">
			<view class="title">活动名称</view>
			<input v-model="info.title" placeholder="请输入活动名称"></input>
		</view>
		
		<view class="cu-form-group margin-top">
			<view class="title">活动日期</view>
			<picker mode="date" :value="info.startime[0]" :start="today" end="2030-09-01" @change="onStartDateChange">
				<view class="picker">
					{{info.startime[0]}}
				</view>
			</picker>
		</view>
		
		<view class="cu-form-group margin-top">
			<view class="title">活动时间</view>
			<picker mode="time" :value="info.startime[1]" start="00:01" end="23:59" @change="onStartTimeChange">
				<view class="picker">
					{{info.startime[1]}}
				</view>
			</picker>
		</view>
		
		<view class="cu-form-group margin-top">
			<textarea v-model="info.address" maxlength="-1" placeholder="活动地点"></textarea>
		</view>
		
		<view class="cu-form-group margin-top">
			<textarea v-model="info.desc" maxlength="-1" placeholder="活动介绍"></textarea>
		</view>
		
		<button type="default" class="margin-top" form-type="submit">保存</button>
		
	</form>
</template>

<script>
	import { Add,Edit } from "@/api/activity/index.js"
	import {
		EventBus
	} from "@/common/bus.js";
	const REQ = require("@/api/upload.js")
	export default {
		data() {
			return {
				isAdd:true,
				today:'',
				info:{
					title: '',
					desc:'',
					address:'',
					startime:['2016-09-01','12:00'],
					uid:0,
				},
			};
		},
		created() {
			const day = new Date();
			let month=day.getMonth()+1;
			month=month<10?'0'+month:month
			let d=day.getDate()
			d=d<10?'0'+d:d
			this.today= day.getFullYear()+"-" + month + "-" + d;
			this.info.startime[0]=this.today;
		},
		methods: {
			SetInfo(info){
				let startimes=info.start_time.split(" ")
				this.info={
					id:info.id,
					title: info.title,
					desc:info.desc,
					address:info.address,
					startime:startimes,
					uid:info.create_uid
				}
				
				this.isAdd=false;
			},
			onStartDateChange(e) {
				let startimes=this.info.startime;
				startimes[0] = e.detail.value
				this.$set(this.info,"startime",startimes)
				this.$forceUpdate()
			},
			onStartTimeChange(e) {
				let startimes=this.info.startime;
				startimes[1] = e.detail.value
				this.$set(this.info,"startime",startimes)
				this.$forceUpdate()
			},
			formSubmit(e) {
				let form_id=e.detail.formId;
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
				
				if(new Date(data.startime[0])<new Date(this.today)){
					uni.showToast({
						icon: 'none',
						title: '不能创建以前的活动',
						duration: 2000
					});
					return;
				}
				data.startime=data.startime[0]+" "+data.startime[1]
				data.uid=this.$store.getters.uid;
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
						title:'发布成功'
					})
					uni.navigateBack();
					EventBus.$emit("reloadData-activity-list");
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
					EventBus.$emit("reloadData-activity-list");
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
