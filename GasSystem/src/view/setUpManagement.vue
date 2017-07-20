<template>
	<div class="setUpPage">
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="旧密码" prop="oldPass">
		    <el-input type="text" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
		    <el-button @click="resetForm('ruleForm2')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data () {
			var validateOldPass = (rule, value, callback) => {
				if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          callback();
		        }
			};

		    var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.ruleForm2.checkPass !== '') {
		            this.$refs.ruleForm2.validateField('checkPass');
		          }
		          callback();
		        }
		    };

		    var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm2.pass) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		    };

			return {
				ruleForm2: {
				  oldPass: '',
		          pass: '',
		          checkPass: '',
		        },
		        rules2: {
		          oldPass: [
		            { validator: validateOldPass, trigger: 'blur'}
		          ],	
		          pass: [
		            { validator: validatePass, trigger: 'blur' }
		          ],
		          checkPass: [
		            { validator: validatePass2, trigger: 'blur' }
		          ],
		        }
			}
		},

		props:[
			'AccountType'
		],

		methods: {
			submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          let _this = this;
	          if (valid) {
	            $.ajax({
					type: "POST",
                    dataType: "json", 
                    async: true,
                    xhrFields:{
                        withCredentials:true
                    },
                    crossDomain: true,
                    data:JSON.stringify({
                    	newPassword : _this.ruleForm2.oldPass,
                    	oldPassword : _this.ruleForm2.pass
                    }),
                    contentType: "application/json",
                    url: path.url + "account/updatePwd",
                    success: function( res ) {
                        if(res.result.text === 'success') { 
                                _this.$notify({
                                    title: '成功',
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                // 清空
                                _this.ruleForm2.oldPass = '';
                                _this.ruleForm2.pass = '';
                                _this.ruleForm2.checkPass = '';

                        }else{
                                _this.$notify({
                                    title: '失败',
                                    message: res.description,
                                    type: 'warning'
                                });
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrow) {
                    	if(XMLHttpRequest.status == 800) {
                    		_this.$emit( 'reLogin', ['relogin'] )
                    	}
                    }
				});
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
		},

		mounted: function() {
			this.oldPass = this.AccountType.password;
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
	.setUpPage{
		width: 100%;
		height: 100%;
	}
	.setUpPage .demo-ruleForm{
		width: 40%;
		height: 100%;
		margin: 0 auto;
		padding-top: 200px;
		box-sizing: border-box;
	}
</style>