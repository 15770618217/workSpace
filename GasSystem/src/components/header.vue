<template>
	<div class="header">
		<h1>{{titleName}}</h1>
		<div class="headerPart userMsg">
			<h4><img src="../assets/images/user.png" height="28" width="23" alt=""><span>&nbsp;&nbsp;{{headerUserName}}</span></h4>
		</div>
		<div class="headerPart loginOut" @click="loginOutEvent">
			<h4><img src="../assets/images/loginout.png" height="30" width="25" alt=""><span>&nbsp;&nbsp;退出</span></h4>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				titleName: '实名制配送系统管理平台',
				loginOut: true,
			}
		},

		props:[
			'headerUserName'
		],

		methods: {
			// 退出登录
			loginOutEvent: function() {
				this.$emit( 'loginOut', [this.loginOut] );
			}
		}
	}
</script>
<style scoped>
	.header{
		position: relative;
		width: 100%;
		height: 100%;
		line-height: 100%;
		background-color: #0E7DD7;
	}
	.header h1{
		width: 100%;
		height: 100%;
		line-height: 100%;
		padding-top: 30px;
		padding-left: 50px;
		text-align: left;
		color: #fff;
		box-sizing: border-box;
	}
	.header .headerPart{
		position: absolute;
		top: 50%;
		margin-top: -18px; 
		width: auto;
		height: 35px;
		line-height: 35px;
	}
	.header .headerPart>h4>img{
		vertical-align: middle;
	}
	.header .headerPart>h4>span{
		color: #fff;
	}
	.header .userMsg{
		right: 100px;
	}
	.header .loginOut{
		right: 20px;
		cursor: pointer;
	}
	.header .loginOut>h3{
		text-align: center;
	}
</style>