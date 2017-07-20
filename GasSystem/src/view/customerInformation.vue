<template>
	<div class="customerPage">
		<div class="topToolNav">
			<!-- <el-button class="toLayoutBtn LayoutBtnShow" type="primary" :class="{btn:true}" @click="showEvent">显示</el-button>
            <el-button class="toLayoutBtn LayoutBtnHide" type="primary" :class="{btn:true}" @click="hideEvent">隐藏</el-button> -->
			<el-input placeholder="请输入查询关键字" v-model="keyword" class="searchInput">
			     <!-- 选择公司名 -->
	            <el-select v-model="firmSelect" filterable placeholder="请输入查询的公司" slot="prepend" v-show="layout.firmSelectShow" @change="searchFirmSelectToFirmId">
	                <el-option
	                    v-for="item in AllFirm" 
	                    :key="item.name"
	                    :label="item.name" 
	                    :value="item.id">
	                </el-option>
	            </el-select>
			    <el-button slot="append" icon="search"  @click="startSearchEvent"></el-button>
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
	                prop="name"
	                label="姓名">
	            </el-table-column>
	            <el-table-column
	                prop="sex"
	                label="性别">
	            </el-table-column>
	            <el-table-column
	                prop="nation"
	                label="民族">
	            </el-table-column>
	            <el-table-column
	                prop="birthday"
	                label="出生日期">
	            </el-table-column>
	            <el-table-column
	                prop="mobile"
	                label="联系电话">
	            </el-table-column>
	            <el-table-column
	                prop="idcard"
	                label="身份证号">
	            </el-table-column>
	            <el-table-column
	                prop="idcardAddress"
	                label="户籍地址">
	            </el-table-column>
	            <el-table-column
	                prop="address"
	                label="用气地址">
	            </el-table-column>
	            <el-table-column
	                prop="idcardImg"
	                label="身份证照片">
	            </el-table-column>
	        </el-table>
	        <h4 class="hintMsg">客户信息管理中可查询的关键字：客户名、户籍、手机号、身份证、身份证地址、所属公司名、性别、用气地址。</h4>
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

				AllFirm: [],

				searchData: {
					firmId: '',
					key: ''
				},

				tableData: [],
				totalPage: 50,
				currentPage: 1,
				pageNumber: 10,
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
            	
            	}else {
            		this.layout.firmSelectShow = false;
            		return false;
            	}
            },

            showEvent: function() {

            },

            hideEvent: function() {
            	
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
                    url: path.url + "customers",
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