<template>
	<div class="gasFile">
		<header>
			<h1>气瓶档案</h1>
		</header>
		<section class="gasMsg">
			<el-row>
			  <el-col :span="6"><div class="grid-content bg-purple"><h3>制造单位：</h3></div></el-col>
			  <el-col :span="18"><div class="grid-content bg-purple"><h3>{{gasMsg.makeUitl}}</h3></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="6"><div class="grid-content bg-purple"><h3>出厂编号：</h3></div></el-col>
			  <el-col :span="18"><div class="grid-content bg-purple"><h3>{{gasMsg.serialNumber}}</h3></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="6"><div class="grid-content bg-purple"><h3>制造年月：</h3></div></el-col>
			  <el-col :span="18"><div class="grid-content bg-purple"><h3>{{gasMsg.makeTime}}</h3></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="6"><div class="grid-content bg-purple"><h3>下检年月:</h3></div></el-col>
			  <el-col :span="18"><div class="grid-content bg-purple"><h3>{{gasMsg.checkTime}}</h3></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="6"><div class="grid-content bg-purple"><h3>气瓶种类：</h3></div></el-col>
			  <el-col :span="18"><div class="grid-content bg-purple"><h3>{{gasMsg.gasSpecies}}</h3></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="6"><div class="grid-content bg-purple"><h3>气瓶状态：</h3></div></el-col>
			  <el-col :span="18"><div class="grid-content bg-purple"><h3>{{gasMsg.gasState}}</h3></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="6"><div class="grid-content bg-purple"><h3>设计使用年限：</h3></div></el-col>
			  <el-col :span="18"><div class="grid-content bg-purple"><h3>{{gasMsg.yearsOfUse}}</h3></div></el-col>
			</el-row>
		</section>
		<section class="saveMsg">
			<el-row>
			  <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>

			  <router-link to="/safetyInstructions">	
				  <el-col :span="22">
				  	<div class="grid-content bg-purple">
				  		<div class="titleMsg"><h3>{{title}}</h3></div>
				  	</div>
				  </el-col>
			  </router-link>
			  
			  <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
			</el-row>

			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple-dark"><h3>温馨提示：</h3></div></el-col>
			</el-row>

			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple-dark"><h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis officia quasi dolorem doloribus aspernatur deserunt nesciunt, aut velit facere sit laboriosam nostrum quam ducimus possimus voluptas illum, ipsam itaque harum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere voluptas obcaecati quaerat laboriosam iure, minus</h3></div></el-col>
			</el-row>
		</section>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				gasMsg:{
					makeUitl: '制造单位',
					serialNumber: '出厂编号',
					makeTime: '制造年月',
					checkTime: '下检年月',
					gasSpecies: '气瓶种类',
					gasState: '气瓶状态',
					yearsOfUse: '设计使用年限'
				},
				title: '液化石油气安全须知'
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
	.gasFile{
		width: 50%;
		height: 100%;
		margin: 0 auto;
	}
	.gasFile header{
		width: 100%;
		height: 10%;
		padding-top:20px;
		padding-left: 20px;
		color: #fff;
		background-color: #373A41;
		box-sizing: border-box;
	}
	.gasFile .gasMsg{
		width: 100%;
		height: 50%;
		padding: 20px 15px;
		background-color: red;
		box-sizing: border-box;
	}
	.gasFile .saveMsg{
		width: 100%;
		height: 40%;
		padding: 10px 15px;
		background-color: #eee;
		box-sizing: border-box;
	}
	.saveMsg .titleMsg{
		width: 100%;
		height: 75px;
		border-radius: 25px;
		background-color: green;
	}
	.saveMsg .titleMsg h3{
		width: 100%;
		height: 75px;
		line-height: 75px;
		text-align: center;
		color: #fff;
		font-size: 28px;
	}
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  .el-col {
	    border-radius: 4px;
	  }
	  .bg-purple-dark {
	    background: #99a9bf;
	  }
	  .bg-purple {
	    background: #d3dce6;
	  }
	  .bg-purple-light {
	    background: #e5e9f2;
	  }
	  .grid-content {
	    border-radius: 4px;
	    min-height: 36px;
	  }
	  .row-bg {
	    padding: 10px 0;
	    background-color: #f9fafc;
	  }
</style>