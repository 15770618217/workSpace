<!-- 贴码记录查询 -->
<template>
	<div class="customerPage">
		<div class="topToolNav">
			<el-select id="firmChoose" v-model="firmSelect" filterable placeholder="请输入查询的公司" :class="{search:true}" v-show="layout.firmSelectShow" @change="searchFirmSelectToFirmId">
                <el-option
                    v-for="item in AllFirm" 
                    :key="item.name"
                    :label="item.name" 
                    :value="item.id">
                </el-option>
            </el-select>
			<el-input placeholder="请输入查询关键字" v-model="keyword" class="searchInput">
			    <el-select v-model="keySelect" slot="prepend" placeholder="关键字选择" @change="searchKeySelect">
			      <el-option label="气瓶条码" value="1"></el-option>
			      <el-option label="操作人" value="2"></el-option>
			      <el-option label="气瓶出厂编号" value="3"></el-option>
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
	                width="100"
	                type="selection">   
	            </el-table-column>
	            <el-table-column
	                prop="barcode"
	                label="气瓶条码">
	            </el-table-column>
	            <el-table-column
	                prop="bindTime"
	                label="绑定时间">
	            </el-table-column>
	            <el-table-column
	                prop="operator"
	                label="操作人">
	            </el-table-column>
	            <el-table-column
	                prop="steelcode"
	                label="气瓶出厂编号">
	            </el-table-column>
	        </el-table>
	        <h4 class="hintMsg">贴码记录查询中可查询的关键字：出厂编号、钢瓶编号、操作人。</h4>
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
					firmSelectShow: null
				},

				firmWord: '',
				firmSelect: '',
				keyword: '',
				keySelect: '',

				AllFirm: [],

				searchData: {
					barcode: '',
                    firmId: '',
                    operator: '',
                    steelcode: '',
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
                this.initGrid(val)
            },

            handleSelectionChange( val ) {
                
            },

            handleSelected() {

            },

            initLayout: function() {
            	// 三种账户类型
            	if(this.AccountType.type === 1) {
            		this.layout.firmSelectShow = false;
            	
            	}else if(this.AccountType.type === 2) {
            		this.layout.firmSelectShow = false;
            	
            	}else if(this.AccountType.type === 3) {
            		this.layout.firmSelectShow = true;
            	
            	}else {
            		this.layout.firmSelectShow = false;
            		return false;
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

            searchKeySelect: function() {
            	let _this = this;	
            },

            startSearchEvent: function() {
            	let _this = this;
                console.log(_this.firmSelect)
                alert('1')
            	if(_this.keySelect == 1){
            		_this.searchData.barcode = _this.keyword;
            		_this.searchData.operator = '';
            		_this.searchData.steelcode = '';
            		_this.initGrid(_this.currentPage);
            	}else if(_this.keySelect == 2){
            		_this.searchData.barcode = '';
            		_this.searchData.operator = _this.keyword;
            		_this.searchData.steelcode = '';
            		_this.initGrid(_this.currentPage);
            	}else if(_this.keySelect == 3){
            		_this.searchData.barcode = '';
            		_this.searchData.operator = '';
            		_this.searchData.steelcode = _this.keyword;
            		_this.initGrid(_this.currentPage);
            	}else if(_this.keySelect == ''){
                    _this.searchData.barcode = '';
                    _this.searchData.operator = '';
                    _this.searchData.steelcode = _this.keyword;
                    _this.initGrid(_this.currentPage);
                }
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
                    	barcode: _this.searchData.barcode,
                    	firmId: _this.searchData.firmId,
                    	operator: _this.searchData.operator,
                    	steelcode: _this.searchData.steelcode,
                    	pageIndex: val,
                    	pageTotal: _this.pageNumber
                    }),
                    contentType: "application/json",
                    url: path.url + "bottleCodes",
                    success: function(res) {
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
	.customerPage{
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
  	#firmChoose{
  		position: absolute;
  		top: 50%;
  		margin-top: -18px;
  		left: 380px;
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