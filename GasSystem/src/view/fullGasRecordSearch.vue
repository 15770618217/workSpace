<!-- 充装记录查询 -->
<template>
	<div class="fullGasPage">
		<div class="topToolNav">
			<el-button class="toLayoutBtn LayoutBtnShow" type="primary" :class="{btn:true}" @click="showHideEvent('1')" v-show="layout.showBtn">显示</el-button>
            <el-button class="toLayoutBtn LayoutBtnHide" type="primary" :class="{btn:true}" @click="showHideEvent('0')" v-show="layout.hideBtn">隐藏</el-button>
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
	                prop="firmName"
	                label="充装公司">
	            </el-table-column>
	            <el-table-column
	                prop="fillWeight"
	                label="充装重量(kg)">
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
	                prop="jobNumber"
	                label="充装工工号">
	            </el-table-column>
	             <el-table-column
	                prop="show"
	                label="是否已隐藏">
	            </el-table-column>
	        </el-table>
	        <h4 class="hintMsg">充装记录查询中可查询关键字:钢瓶编码、钢瓶重量、充气介质、充装工名。</h4>
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
					showBtn: true,
					hideBtn: true
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

				showHide: {
					idsArr : [],
					ids: '',
					show: ''
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
            		this.layout.showBtn = false;
            		this.layout.hideBtn = false;
            	}else if(this.AccountType.type === 2) {
            		this.layout.firmSelectShow = false;
            		this.layout.showBtn = true;
            		this.layout.hideBtn = true;
            	}else if(this.AccountType.type === 3) {
            		this.layout.firmSelectShow = true;
            		this.layout.showBtn = true;
            		this.layout.hideBtn = true;
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

            showHideEvent: function(val) {
            	let _this = this;

            	if(val == 1){//显示
            		_this.showHide.show = 1;
            	}else{
            		_this.showHide.show = 0;
            	}
            	
            	_this.showHide.idsArr = [];

            	$.each(_this.selectedRowTotal, function( key, value ){
            		_this.showHide.idsArr.push(value.id);
            	});
            	
            	_this.showHide.ids =  _this.showHide.idsArr.join(',');

            	$.ajax({
                    type: "POST",
                    dataType: "json", 
                    async: true,
                    xhrFields:{
                        withCredentials:true
                    },
                    crossDomain: true,
                    data:JSON.stringify({
                    	ids: _this.showHide.ids,
                    	show: _this.showHide.show
                    }),
                    contentType: "application/json",
                    url: path.url + "updateFillRecordShow",
                    success: function(res) {
                        if (res.result.text === 'success') {
                        	_this.initGrid(_this.currentPage)
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrow) {
                        if(XMLHttpRequest.status == 800) {
                            _this.$emit( 'reLogin', ['relogin'] )
                        }
                    }
                });  
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
                    url: path.url + "fill/records",
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