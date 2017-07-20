<template>
	<div class="logPage">
		<div class="topToolNav">
			<el-input placeholder="请输入查询关键字" v-model="keyword" class="searchInput">
			    <!-- 选择公司名 -->
	            <el-select v-model="firmSelect" slot="prepend" placeholder="请输入查询的公司" v-show="layout.firmSelectShow" @change="searchFirmSelectToFirmId">
	                <el-option
	                    v-for="item in AllFirm" 
	                    :key="item.name"
	                    :label="item.name" 
	                    :value="item.id">
	                </el-option>
	            </el-select>
			    <el-button slot="append" icon="search" @click="startSearchEvent"></el-button>
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
	        <h4 class="hintMsg">日志记录查询中可查询关键字:账户名、ip地址、内容。</h4>
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
				layout: {
					firmSelectShow: null,
				},
			
				firmWord: '',
				firmSelect: '',
				keyword: '',

				AllFirm: [],
				// 当前勾选的记录条信息 
                selectedFormRow: [],
                // 当前多选的记录条数信息
                selectedRowTotal: [],

                searchData: {
					firmId: '',
					key: ''
				},

				tableData: [],
				totalPage: 5,
				currentPage: 1,
				pageNumber: 5,
			}
		},

		props:[
			'AccountType'
		],

		methods: {
			handleSizeChange:function( val ) {
               
            },

            handleCurrentChange:function( val ) {
            	this.initGrid(val);
            },

            handleSelectionChange( val ) {
                if(val.length !== 0){
                  	this.selectedFormRow = val[0];                     
                }
            },

            handleSelected: function( selection, row ) {
                this.selectedRowTotal = selection;
            },

            initLayout: function() {
            	// 三种账户类型
            	if(this.AccountType.type === 1) {
            		this.layout.firmSelectShow = false;
            	}else if(this.AccountType.type === 2) {
            		this.layout.firmSelectShow = false;
            	}else if(this.AccountType.type === 3) {
            		this.layout.firmSelectShow = true;
            	}
            },

            findAllFirm: function() {
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
                    	id:1
                    }),
                    contentType: "application/json",
                    url: path.url + "findAllFirm",
                    success: function( res ) {	
                       	_this.AllFirm = res.result.data;

                    },
                    error:function(XMLHttpRequest, textStatus, errorThrow) {
                        if(XMLHttpRequest.status == 800) {
                            _this.$emit( 'reLogin', ['relogin'] )
                        }
                    }
                });  
            },

            searchFirmSelectToFirmId: function() {
            	let _this = this;
            	_this.searchData.firmId = _this.firmSelect;
            },

            startSearchEvent: function() {
            	let _this = this;
            	_this.searchData.key = _this.keyword;
            	_this.initGrid(1);
            },

            initGrid: function( val ) {
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
                    	key: _this.searchData.key,
                    	firmId: _this.searchData.firmId,
                    	pageIndex: val,
                    	pageTotal: _this.pageNumber
                    }),
                    contentType: "application/json",
                    url: path.url + "operation/records",
                    success: function( res ) {
                        _this.totalPage = res.result.count;
                        _this.tableData = res.result.data;
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrow) {
                        if(XMLHttpRequest.status == 800) {
                            _this.$emit( 'reLogin', ['relogin'] )
                        }
                    }
                });  
            },
		},

		mounted: function() {
			this.initGrid(1);
			this.initLayout();
			this.findAllFirm();
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
    	width: 185px!important;
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