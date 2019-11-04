<template>
	<form report-submit>
		<view class="cu-form-group margin-top">
			<view class="title">logo</view>
			<view class="solids">
				<text class='cuIcon-cameraadd'></text>
			</view>
		</view>
	
		<view class="cu-form-group margin-top">
			<view class="title">店名</view>
			<input disabled="" v-model="info.name" placeholder="请输入店名"></input>
		</view>
	
		<view class="cu-form-group margin-top">
			<view class="title">分类</view>
			<checkbox-group>
				<label v-for="(item,index) in typeList" :key="index">
					<checkbox disabled :class="item.isSelected?'checked':''" :checked="item.isSelected?true:false" :value="item.value" /><text>{{item.label}}</text>
				</label>
			</checkbox-group>
		</view>
	
		<view class="cu-form-group margin-top">
			<view class="title">标签</view>
			<input disabled v-model="info.tag" placeholder="多个标签,空格区分"></input>
		</view>
	
		<view class="cu-form-group align-start margin-top">
			<view class="title">复制码</view>
			<textarea disabled v-model="info.share" maxlength="-1" placeholder="淘宝分享的复制码"></textarea>
		</view>
	
		<view class="cu-form-group margin-top">
			<textarea disabled v-model="info.intro" maxlength="-1" placeholder="店铺介绍"></textarea>
		</view>
		
		<button type="default" class="margin-top" form-type="submit" @click="handleClick(1)">通过</button>
		<button type="default" class="margin-top" form-type="submit" @click="handleClick(2)">不通过</button>
		
		
		
		<view class="cu-modal" :class="isShow==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">不通过原因</view>
				</view>
				<view class="padding-xl">
					<input v-model="desc" placeholder="请输入原因"></input>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="auditData">确定</button>
					</view>
				</view>
			</view>
		</view>
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
				isShow:false,
				
				info:{
					logo: '',
					name:'',
					tag:'',
					type:[],
					share:'',
					intro:'',
				},
				desc:'',
				type:1,
				
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
			},
			auditData(){
				const data={
					id:this.info.id,
					desc:this.desc,
					type:this.type
				}
				uni.showLoading();
				Audit(data,info=>{
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title:info.message
					})
					uni.navigateBack();
					EventBus.$emit("reloadData-myShop-list");
				})
			},
			handleClick(type){
				const data={}
				this.type=type;
				
				if(type==1){
					//通过审核
					this.auditData();
				}else{
					//不通过审核
					this.isShow=true;
				}
			},
		},
	}
</script>

<style>
    .solids { width:60rpx;height:60rpx;}
    .solids text {  font-size:60rpx;}
    .cu-form-group .title  {width:200rpx;}
    checkbox-group label { float:left; margin:10rpx;}
</style>
