<template>
	<div class="logPage">
		<div class="topToolNav">
			<el-input placeholder="请输入查询关键字" v-model="keyword" class="searchInput">
			    <el-select v-model="select" slot="prepend" placeholder="关键字选择">
			      <el-option label="钢瓶型号" value="1"></el-option>
			      <el-option label="充装公司" value="2"></el-option>
			      <el-option label="充装工名字" value="3"></el-option>
			      <el-option label="充装工编号" value="4"></el-option>
			    </el-select>
			    <el-button slot="append" icon="search"></el-button>
			</el-input>
		</div>
		<div class="tableArea">
	        <el-table
	            ref="multipleTable"
	           	:data="tableData"
	            border
	            style="width: 100%"
	            @selection-change = "handleSelectionChange"
	            @select = "handleSelected">
	            <el-table-column
	                prop="time"
	                label="时间">
	            </el-table-column>
	            <el-table-column
	                prop="accountName"
	                label="账号">
	            </el-table-column>
	            <el-table-column
	                prop="ip"
	                label="IP地址">
	            </el-table-column>
	            <el-table-column
	                prop="content"
	                label="操作">
	            </el-table-column>  
	        </el-table>
	        <el-pagination
	            @size-change="handleSizeChange"
	            @current-change="handleCurrentChange"
	            class="pagination"
	            :total="totalPage"
	            :current-page.sync="currentPage"
	            layout="prev, pager, next"
	            :page-size="pageNumber">
	        </el-pagination>
	    </div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				keyword: '',
				select: '',
				tableData: [
					{
						time: '2017:12:9',
						accountName: '刘亦菲',
						ip: '10.0.0.8',
						content: '增加账号张钧甯',
					},
					{
						time: '2017:12:9',
						accountName: '刘亦菲',
						ip: '10.0.0.8',
						content: '增加账号张钧甯',
					},
					{
						time: '2017:12:9',
						accountName: '刘亦菲',
						ip: '10.0.0.8',
						content: '增加账号张钧甯',
					},
					{
						time: '2017:12:9',
						accountName: '刘亦菲',
						ip: '10.0.0.8',
						content: '增加账号张钧甯',
					},
					{
						time: '2017:12:9',
						accountName: '刘亦菲',
						ip: '10.0.0.8',
						content: '增加账号张钧甯',
					},
					{
						time: '2017:12:9',
						accountName: '刘亦菲',
						ip: '10.0.0.8',
						content: '增加账号张钧甯',
					},
				],
				totalPage: 50,
				currentPage: 1,
				pageNumber: 10,
			}
		},

		methods: {
			handleSizeChange:function( val ) {
               
            },

            handleCurrentChange:function( val ) {
            },

            handleSelectionChange( val ) {
                
            },
            handleSelected() {

            }
		}
	}
</script>
<style scoped>
	.logPage{
		width: 100%;
		height: 100%;
	}
	.topToolNav{
		position: relative;
		width: 100%;
		height: 10%;
		background-color: white;
	}
	.el-select,.el-input {
    	width: 135px!important;
  	}
  	.searchInput{
  		position: absolute;
		width: 500px!important;
		height: 36px;
		top: 50%;
    	right: 0;
    	margin-top: -18px;
    	margin-right: 30px;
	}
	.pagination{
		position: absolute;
		right: 20px;
		bottom: 20px;
	}
</style>