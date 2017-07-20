<template>
	<div class="header">
		<h1>{{titleName}}</h1>
		<router-link to="/setUpManagement">
			<div class="headerPart userMsg">
				<h4><img src="../static/images/user.png" height="28" width="23" alt=""><span>{{type}}&nbsp;&nbsp;{{headerUserName}}</span></h4>
			</div>
		</router-link>
		
		<div class="headerPart loginOut" @click="loginOutEvent">
			<h4><img src="../static/images/loginout.png" height="30" width="25" alt=""><span>&nbsp;&nbsp;退出</span></h4>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				titleName: '实名制配送系统管理平台',
				loginOut: true,
				type: ''
			}
		},

		props:[
			'headerUserName',
			'AccountType'
		],

		methods: {
			// 退出登录
			loginOutEvent: function() {
				this.$emit( 'loginOut', [this.loginOut] );
			}
		},

		mounted: function() {
			if(this.AccountType.type === 1){
				this.type = '普通用户';
			}else if(this.AccountType.type === 2){
				this.type = '管理员';
			}else if(this.AccountType.type === 3){
				this.type = '超级管理员';
			}
		}
	}
</script>
<style scoped>
	* {
		padding: 0;
		margin: 0;
		list-style-type:none;
	}
	
	html,body{
		width: 100%;
		height: 100%;
	}
	button{
		padding: 10px!important;
	}
	a{color: #2fa0ec;text-decoration: none;outline: none;}
	a:hover,a:focus{color:#74777b;}

	li{list-style-type:none;}
	
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
		cursor: pointer;
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
	}
	.header .loginOut>h3{
		text-align: center;
	}
</style>