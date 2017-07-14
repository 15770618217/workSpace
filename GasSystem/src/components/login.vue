<template>
<div class="dialog">
	<div class="loginPage">
		<h1>{{formName.title}}</h1>
		<el-form>
			<el-form-item>
				<span class="userLogo logo"></span>
				<el-input class="formInput" type="text" id="user" v-model="formName.user" @blur="inputBlur('user',formName.user)" placeholder="用户名"></el-input>
				<p>{{formName.userError}}</p>
			</el-form-item>
			<el-form-item>
				<!-- <span class="passwordLogo logo"></span> -->
				<el-input class="formInput" type="password" id="password" v-model="formName.password" @blur="inputBlur('password',formName.password)" placeholder="密码"></el-input>
				<p>{{formName.passwordError}}</p>
			</el-form-item>
			<el-button class="forBtnSize" type="primary" @click="submitForm" v-bind:disabled="formName.beDisabled">提交</el-button>
			<el-button class="forBtnSize" type="primary" @click="resetForm">重置</el-button>
		</el-form>				
	</div>
</div>
</template>
<script>
import Axios from 'axios'
	export default {
		name: '',
		data () {
			return {
				formName: {//表单中的参数
					title: '实名配送制度系统',
					user: '',
					userError: '',
					password: '',
					passwordError: '',
					beDisabled: true
				},
				loginShow: false//传值给父组件
			}			
		},

		methods: {
			resetForm:function() {
				this.formName.user = '';
				this.formName.userError = '';
				this.formName.password = '';
				this.formName.passwordError = '';
			},

			submitForm:function( formName ) {
				var _this = this;
					/*user,
					password;*/
				// 请求后台登录
				/*Axios({
					method: 'post',
					dataType: 'json', 
					url: 'http://10.0.0.46:8089/gas/account/login',
					data: {
						mobile: '136',
						password: '123'						
					},
                	withCredentials: true,
				}).then(function( res ) {
					console.log(res)
					 	if ( res.data.code === '0' ) {
					 		console.log('succ')
					 		//响应成功，与父组件通信传值
							_this.$emit( 'showState', [ _this.loginShow] )
					 	}
				}).catch(function( err ) {
					console.log( err );
				})*/ 
				$.ajax({
    			  type: "post",
    	          dataType: "json",
    	          url: "http://10.0.0.244:8089/gas/web/account/login",
    	          xhrFields:{
    	              withCredentials:true
    	          },
    	          crossDomain: true,
    	          data:JSON.stringify({
    	          	mobile: '149',
					password: '123'	
    	          }),
    	          contentType: "application/json",
    	          success:function(res) { 
    	          	console.log(res.result.result);
    	            if ( res.code === '0' ) {
					 		//响应成功，与父组件通信传值
							_this.$emit( 'showState', [ _this.loginShow, _this.formName.user, res.result.result] )
					 	}
    	          }
    	       });

			},

			inputBlur:function( errorItem, inputContent ) {
				if ( errorItem === 'user' ) {
					if ( inputContent === '' ) {
						this.formName.userError = '用户名不能为空'
					}else{
						this.formName.userError = '';
					}
				}else if( errorItem === 'password' ) {
					if ( inputContent === '' ) {
						this.formName.passwordError = '密码不能为空'
					}else{
						this.formName.passwordError = '';
					}
				}
				//对于按钮的状态进行修改
				if ( this.formName.user != '' && this.formName.password != '' ) {
					this.formName.beDisabled = false;
				}else{
					this.formName.beDisabled = true;
				}
			}
		}
	}
</script>
<style scoped>
	.dialog{
		width: 100%;
		height: 100%;
		background: url(../assets/images/bg.png);
	}
	.loginPage{
		z-index: 10;
		position: absolute;
		width: 550px;
		height: 450px;
		top: 50%;
		left: 50%;
		margin-top: -225px;
		margin-left: -275px;
		padding: 50px 20px 20px;
		border-radius: 8px;
		box-sizing: border-box;
		background: rgba(255,255,255,.1);
	}
	.loginPage h1{
		margin-bottom: 50px;
		text-align: center;
		color: #6BCBF1;
	}
	.loginPage .logo{
		position: absolute;
		display: inline-block;
		width: 27px;
		height: 27px;
		z-index: 100;
	}
	.loginPage .userLogo{
		top: 40px;
		left: 10px;
		/*background: url(../assets/images/user.png);*/
	}
	.loginPage .passwordLogo{
		top: 40px;
		left: 10px;
		/*background: url(../assets/images/passage.png);*/
	}
	.loginPage p{
		color: red;
		text-align: left;
	}
	.loginPage .forBtnSize{
		display: block;
		width: 100%;
		margin-left: 0;
		margin-top: 30px;
	}
</style>