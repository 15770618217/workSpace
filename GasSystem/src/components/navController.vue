<template>
	<div class="controller">
		<el-col :span="24">
		    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
		      <el-menu-item index="1">
		      	<router-link to="/fullGasRecordSearch">充装记录查询</router-link>	
		      </el-menu-item>
		      <el-menu-item index="2">
		      	<router-link to="/sendGasRecordSearch">配送记录查询</router-link>
		      </el-menu-item>
		      <el-menu-item index="3">
		      	<router-link to="/stickCodeRecord">贴码记录查询</router-link>
		      </el-menu-item>
		      <el-menu-item index="4">
		      	<router-link to="/customerInformation">客户信息管理</router-link>
		      </el-menu-item>
		      <el-menu-item index="5">
		      	<router-link to="/gasInformation">气瓶信息管理</router-link>
		      </el-menu-item>
		      <el-menu-item index="6">
		      	<router-link to="/workerInformation">操作工信息管理</router-link>
		      </el-menu-item>
		      <el-menu-item index="7">
		      	<router-link to="/storeManagement">门店管理</router-link>
		      </el-menu-item>
		      <el-submenu index="8">
		        <template slot="title" class="drop">系统管理</template>
		          <el-menu-item index="1-1">
		          	<router-link to="/AccountManagement">账户管理</router-link>
		          </el-menu-item>
		           <el-menu-item index="1-2">
		          	<router-link to="/setUpManagement">设置</router-link>
		          </el-menu-item>
		          <el-menu-item index="1-3">
		          	<router-link to="/LogManagement">日志管理</router-link>
		          </el-menu-item>
		      </el-submenu>
		      <el-menu-item index="9">
		      	<router-link to="/gasFile">气瓶档案</router-link>	
		      </el-menu-item>
		    </el-menu>
		</el-col>
	</div>
</template>
<script>
	export default {
		data () {
			return {

			}
		},

		methods: {
			handleOpen(key, keyPath) {
		        // console.log(key, keyPath);
		    },
		      handleClose(key, keyPath) {
		        // console.log(key, keyPath);
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
	
	.controller{
		width: 100%;
		height: 100%;
	}
	.el-menu-item{
		height: 80px!important;
		line-height: 80px!important;
	}
	.el-menu-item:hover{
		background-color: #0894D8!important;
	}
	.el-menu li{
		border-bottom: 1px solid #fff;
		background-color: #04A1E4;
	}
	.el-menu li>a{
		display: inline-block;
		width: 100%;
		height: 100%;
		font-size: 16px;
		color: #fff;
	}
	.el-submenu>div{
		background-color: #000!important;
	}
</style>