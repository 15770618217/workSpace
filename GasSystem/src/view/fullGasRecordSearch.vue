<template>
	<div class="fullGasPage">
		<div class="topToolNav">
			<el-button class="toLayoutBtn LayoutBtnShow" type="primary" :class="{btn:true}" @click="showEvent">显示</el-button>
            <el-button class="toLayoutBtn LayoutBtnHide" type="primary" :class="{btn:true}" @click="hideEvent">隐藏</el-button>
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
	                width="100"
	                type="selection">   
	            </el-table-column>
	            <el-table-column
	                prop="barcode"
	                label="钢瓶条码">
	            </el-table-column>
	            <el-table-column
	                prop="fillTime"
	                label="充装时间">
	            </el-table-column>
	            <el-table-column
	                prop="fillCompany"
	                label="充装公司">
	            </el-table-column>
	            <el-table-column
	                prop="fillWeight"
	                label="充装重量">
	            </el-table-column>
	             <el-table-column
	                prop="fillMedium"
	                label="充装介质">
	            </el-table-column>
	            <el-table-column
	                prop="operatorName"
	                label="充装工姓名">
	            </el-table-column>
	            <el-table-column
	                prop="operatorId"
	                label="充装工工号">
	            </el-table-column>
	        </el-table>
	        <h4 class="hintMsg">背景为灰色的是隐藏信息。</h4>
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
						barcode: '131313',					
						fillTime: '1990年10月10',
						fillCompany: '网易',
						fillWeight: '14.00KG',
						fillMedium: '充装介质',
						operatorName: '丁磊',
						operatorId: '330424199010102017',
					},
					{
						barcode: '131313',
						fillTime: '1990年10月10',
						fillCompany: '网易',
						fillWeight: '14.00KG',
						fillMedium: '充装介质',
						operatorName: '丁磊',
						operatorId: '330424199010102017',
					},
					{
						barcode: '131313',
						fillTime: '1990年10月10',
						fillCompany: '网易',
						fillWeight: '14.00KG',
						fillMedium: '充装介质',
						operatorName: '丁磊',
						operatorId: '330424199010102017',
					},
					{
						barcode: '131313',
						fillTime: '1990年10月10',
						fillCompany: '网易',
						fillWeight: '14.00KG',
						fillMedium: '充装介质',
						operatorName: '丁磊',
						operatorId: '330424199010102017',
					},
					{
						barcode: '131313',
						fillTime: '1990年10月10',
						fillCompany: '网易',
						fillWeight: '14.00KG',
						fillMedium: '充装介质',
						operatorName: '丁磊',
						operatorId: '330424199010102017',
					},
					{
						barcode: '131313',
						fillTime: '1990年10月10',
						fillCompany: '网易',
						fillWeight: '14.00KG',
						fillMedium: '充装介质',
						operatorName: '丁磊',
						operatorId: '330424199010102017',
					},
					{
						barcode: '131313',
						fillTime: '1990年10月10',
						fillCompany: '网易',
						fillWeight: '14.00KG',
						fillMedium: '充装介质',
						operatorName: '丁磊',
						operatorId: '330424199010102017',
					},
					{
						barcode: '131313',
						fillTime: '1990年10月10',
						fillCompany: '网易',
						fillWeight: '14.00KG',
						fillMedium: '充装介质',
						operatorName: '丁磊',
						operatorId: '330424199010102017',
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

            },

            showEvent: function() {

            },

            hideEvent: function() {
            	
            },

            initGrid: function(value) {
            	let _this = this;
                $.ajax({
                    type: "POST",
                    dataType: "json", 
                    async: true,
                    xhrFields:{
                        withCredentials:true
                    },
                    crossDomain: true,
                    data:JSON.stringify({
                    	key: "",
                    	pageIndex: 1,
                    	pageTotal: 10
                    }),
                    contentType: "application/json",
                    url: path.url + "accounts",
                    success: function(res) {
                        console.log(res)
                        _this.totalPage = res.result.count;
                        _this.tableData = res.result.data;
                    },
                    error:function() {
                    	//console.log(XMLHttpRequest.readyState);
                    }
                });  
            },

		},

		mounted: function() {
			this.initGrid(1);
		}
	}
</script>
<style scoped>
	.fullGasPage{
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
	.topToolNav .toLayoutBtn{
		position: absolute;
		top: 50%;
		margin-top: -18px;
  	}
  	.topToolNav .LayoutBtnShow{
  		margin-left: 30px;
  	}
  	.topToolNav .LayoutBtnHide{
  		margin-left: 110px;
  	}
	.hintMsg{
		margin-top: 10px;
		color: red;
	}
	.pagination{
		position: absolute;
		right: 20px;
		bottom: 20px;
	}
</style>