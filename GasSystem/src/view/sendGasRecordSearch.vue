<template>
	<div class="sendGasPage">
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
	                prop="customerName"
	                label="客户姓名">
	            </el-table-column>
	            <el-table-column
	                prop="mobile"
	                label="联系电话">
	            </el-table-column>
	            <el-table-column
	                prop="idCard"
	                label="身份证号">
	            </el-table-column>
	            <el-table-column
	                prop="address"
	                label="用气地址">
	            </el-table-column>
	            <el-table-column
	                prop="deliveryTime"
	                label="配送时间">
	            </el-table-column>
	            <el-table-column
	                prop="gasModel"
	                label="钢瓶型号">
	            </el-table-column>
	            <el-table-column
	                prop="barcode"
	                label="钢瓶条码">
	            </el-table-column>
	            <el-table-column
	                prop="firmName"
	                label="配送公司">
	            </el-table-column>
	            <el-table-column
	                prop="storeName"
	                label="配送门店">
	            </el-table-column>
	            <el-table-column
	                prop="operatorName"
	                label="配送工姓名">
	            </el-table-column>
	            <el-table-column
	                prop="sendWorkNumber"
	                label="配送工工号">
	            </el-table-column>
	            <el-table-column
	                prop="remark"
	                label="备注信息">
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
						name: '刘亦菲',
						mobile: '13402202685',
						idCard: '330424199010102017',
						address: '杭州市滨江区阿里园区',
						sendTime: '1990年10月10',
						gasModel: '钢瓶型号',
						barcode: '钢瓶条码',
						sendCompany: '配送公司',
						sendStore: '配送门店',
						sendWorkName: '配送工姓名',
						sendWorkNumber: '配送工工号',
						mark: '备注信息',
					},
					{
						name: '刘亦菲',
						mobile: '13402202685',
						idCard: '330424199010102017',
						address: '杭州市滨江区阿里园区',
						sendTime: '1990年10月10',
						gasModel: '钢瓶型号',
						barcode: '钢瓶条码',
						sendCompany: '配送公司',
						sendStore: '配送门店',
						sendWorkName: '配送工姓名',
						sendWorkNumber: '配送工工号',
						mark: '备注信息',
					},
					{
						name: '刘亦菲',
						mobile: '13402202685',
						idCard: '330424199010102017',
						address: '杭州市滨江区阿里园区',
						sendTime: '1990年10月10',
						gasModel: '钢瓶型号',
						barcode: '钢瓶条码',
						sendCompany: '配送公司',
						sendStore: '配送门店',
						sendWorkName: '配送工姓名',
						sendWorkNumber: '配送工工号',
						mark: '备注信息',
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
                    url: path.url + "delivery/records",
                    success: function(res) {
                        _this.totalPage = res.result.count;
                        _this.tableData = res.result.data;
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown) {
                    
                    	console.log(textStatus)
                     	console.log(XMLHttpRequest.status)
                    }
                });  
            },
		},

		mounted: function() {
			// this.initGrid(1);
		}
	}
</script>
<style scoped>
	.sendGasPage{
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