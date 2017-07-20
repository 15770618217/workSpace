<template>
	<div class="gasPage">
		<div class="topToolNav">
				<el-button class="toLayoutBtn LayoutBtnAdd" type="primary" :class="{btn:true}" @click="addEvent" v-show="layout.addBtnShow">增加</el-button>
               	<el-button class="toLayoutBtn LayoutBtnEdit" type="primary" :class="{btn:true}" @click="editEvent" v-show="layout.editBtnShow">编辑</el-button>
                <el-button class="toLayoutBtn LayoutBtnDelete" type="primary" :class="{btn:true}" @click="deleteEvent" v-show="layout.deleteBtnShow">删除</el-button>
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

		<div class="table-area">
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
	                prop="serialNumber"
	                label="出厂编号">
	            </el-table-column>
	            <el-table-column
	                prop="ownGasNumber"
	                label="自有钢瓶编号">
	            </el-table-column>
	            <el-table-column
	                prop="makeUnit"
	                label="制造单位">
	            </el-table-column>
	            <el-table-column
	                prop="makeTime"
	                label="制造年月">
	            </el-table-column>
	            <el-table-column
	                prop="checkTime"
	                label="下检年月">
	            </el-table-column>
	             <el-table-column
	                prop="gasSpecies"
	                label="钢瓶种类">
	            </el-table-column>
	             <el-table-column
	                prop="gasState"
	                label="钢瓶状态">
	            </el-table-column>
	             <el-table-column
	                prop="gasModel"
	                label="钢瓶型号">
	            </el-table-column>
	             <el-table-column
	                prop="gasWeight"
	                label="钢瓶重量(kg)">
	            </el-table-column>
	            <el-table-column
	                prop="yearsOfUse"
	                label="设计使用年限(年)">
	            </el-table-column>
	        </el-table>
	        <h4 class="hintMsg">气瓶信息管理中可查询的关键字：出厂编号、自有钢瓶编号、制造单位、钢瓶种类、钢瓶状态、钢瓶型号、钢瓶重量、创建人、使用年限、公司名称</h4>
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

	   	<!-- 添加按钮弹出框 -->
	    <el-dialog title="增加气瓶信息" :visible.sync="add.addDialogFormVisible">
	      <el-form :model="add.form" :label-width="add.formLabelWidth">
		      	<el-row>
				  <el-col :span="12">
				  	<el-form-item label="出厂编号">
			          <el-input v-model="add.form.serialNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="自有钢瓶编号">
			          <el-input v-model="add.form.ownGasNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="制造单位">
			          <el-input v-model="add.form.makeUnit" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="制造年月">
			          <el-input v-model="add.form.makeTime" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="下检年月">
			          <el-input v-model="add.form.checkTime" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶种类">
			          <el-input v-model="add.form.gasSpecies" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶状态">
			          <el-input v-model="add.form.gasState" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶型号">
			          <el-input v-model="add.form.gasModel" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶重量(kg)">
			          <el-input v-model="add.form.gasWeight" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="设计使用年限">
			          <el-input v-model="add.form.yearsOfUse" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row> 

				<el-row v-if="layout.conpanyShow">
				  <el-col :span="24">
				  	<el-form-item label="燃气公司" :label-width="add.formLabelWidth">
			          <el-select v-model="add.firmName" placeholder="请选择燃气公司">
			            <el-option 
			                v-for="item in AllFirm" 
			                :key="item.name"
			                :label="item.name" 
			                :value="item.name">
			            </el-option>
			          </el-select>
			        </el-form-item>
				  </el-col>
				</el-row>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="addDialogFormVisible = false">取 消</el-button>
		        <el-button type="primary" @click="trueToAddEvent()">确 定</el-button>
		    </div>
	    </el-dialog>

	    <!-- 编辑按钮弹出框 -->
	    <el-dialog title="气瓶信息编辑" :visible.sync="edit.editDialogFormVisible">
	      <el-form :model="edit.form" :label-width="edit.formLabelWidth">
		      	<el-row>
				  <el-col :span="12">
				  	<el-form-item label="出厂编号">
			          <el-input v-model="edit.form.serialNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="自有钢瓶编号">
			          <el-input v-model="edit.form.ownGasNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="制造单位">
			          <el-input v-model="edit.form.makeUnit" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="制造年月">
			          <el-input v-model="edit.form.makeTime" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="下检年月">
			          <el-input v-model="edit.form.checkTime" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶种类">
			          <el-input v-model="edit.form.gasSpecies" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶状态">
			          <el-input v-model="edit.form.gasState" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶型号">
			          <el-input v-model="edit.form.gasModel" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶重量(kg)">
			          <el-input v-model="edit.form.gasWeight" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="设计使用年限">
			          <el-input v-model="edit.form.yearsOfUse" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row> 

				<el-row v-if="layout.conpanyShow">
				  <el-col :span="24">
				  	<el-form-item label="燃气公司" :label-width="add.formLabelWidth">
			          <el-select v-model="selectedFormRow.company" placeholder="请选择燃气公司">
			            <el-option 
			                v-for="item in AllFirm" 
			                :key="item.name"
			                :label="item.name" 
			                :value="item.name">
			            </el-option>
			          </el-select>
			        </el-form-item>
				  </el-col>
				</el-row>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="editDialogFormVisible = false">取 消</el-button>
		        <el-button type="primary" @click="trueToEditEvent()">确 定</el-button>
		    </div>
	    </el-dialog>

	    <!-- 删除按钮弹出框 -->
	    <el-dialog
	      title="提示"
	      :visible.sync="deleteMsg.deleteDialogFormVisible"
	      size="tiny"
	      :before-close="handleClose">
	      <span>是否确定删除该条信息？</span>
	      <span slot="footer" class="dialog-footer">
	        <el-button @click="deleteDialogFormVisible = false">取 消</el-button>
	        <el-button type="primary" @click="trueToDeleteEvent">确 定</el-button>
	      </span>
	    </el-dialog>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				layout:{
					addBtnShow: true,
					editBtnShow: true,
					deleteBtnShow: true,
					conpanyShow: false,
					firmSelectShow: null,
				},

				firmWord: '',
				firmSelect: '',
				keyword: '',

				searchData: {
					firmId: '',
					key: ''
				},

				tableData: [],
				totalPage: 5,
				currentPage: 1,
				pageNumber: 5,
				// 全部公司名称
				AllFirm: [],
				// 当前勾选的记录条信息 
                selectedFormRow: [],
                // 当前多选的记录条数信息
                selectedRowTotal: [],

				add: {
					addDialogFormVisible: false,
					formLabelWidth: '100px',
					firmName: '',
					form: {
						serialNumber: '',
						ownGasNumber: '',
						makeUnit: '',
						makeTime: '',
						checkTime: '',
						gasSpecies: '',
						gasState: '',
						gasModel: '',
						gasWeight: '',
						yearsOfUse: ''
					}
				},

				edit: {
					editDialogFormVisible: false,
					formLabelWidth: '100px',
					form: {
						id: '',
						serialNumber: '',
						ownGasNumber: '',
						makeUnit: '',
						makeTime: '',
						checkTime: '',
						gasSpecies: '',
						gasState: '',
						gasModel: '',
						gasWeight: '',
						yearsOfUse: '',
						firmId: ''
					}
				},

				deleteMsg: {
					deleteDialogFormVisible: false,
					form: {
						id: '',
					}
				}
			}
		},

		props:[
			'AccountType'
		],

		methods: {
			handleSizeChange:function( val ) {
               
            },

            handleCurrentChange:function( val ) {//分页
            	this.initGrid(val);
            },

            handleSelectionChange( val ) {
               if(val.length !== 0){
                  	this.selectedFormRow = val[0];   

					this.edit.form.id = this.selectedFormRow.id;
					this.edit.form.serialNumber = this.selectedFormRow.serialNumber;
					this.edit.form.ownGasNumber = this.selectedFormRow.ownGasNumber;
					this.edit.form.makeUnit = this.selectedFormRow.makeUnit;
					this.edit.form.makeTime = this.selectedFormRow.makeTime;
					this.edit.form.checkTime = this.selectedFormRow.checkTime;
					this.edit.form.gasSpecies = this.selectedFormRow.gasSpecies;
					this.edit.form.gasState = this.selectedFormRow.gasState;
					this.edit.form.gasModel = this.selectedFormRow.gasModel;
					this.edit.form.gasWeight = this.selectedFormRow.gasWeight;
					this.edit.form.yearsOfUse = this.selectedFormRow.yearsOfUse;
                   
                }
            },

            handleSelected: function( selection, row ) {
                this.selectedRowTotal = selection;
            },

            initLayout: function() {
            	// 三种账户类型
            	if(this.AccountType.type === 1) {
            		this.layout.addBtnShow = false;
            		this.layout.editBtnShow = false;
            		this.layout.deleteBtnShow = false;
            		this.layout.conpanyShow = false;
            		this.layout.firmSelectShow = false;
            	}else if(this.AccountType.type === 2) {
            		this.layout.addBtnShow = true;
            		this.layout.editBtnShow = true;
            		this.layout.deleteBtnShow = true;
            		this.layout.conpanyShow = false;
            		this.layout.firmSelectShow = false;
            	}else if(this.AccountType.type === 3) {
            		this.layout.addBtnShow = true;
            		this.layout.editBtnShow = true;
            		this.layout.deleteBtnShow = true;
            		this.layout.conpanyShow = true;
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
                    url: path.url + "gasbottles",
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

			addEvent: function() {
				let _this = this;

				_this.add.form.serialNumber = '';
				_this.add.form.ownGasNumber = '',
				_this.add.form.makeUnit = '',
				_this.add.form.makeTime = '',
				_this.add.form.checkTime = '',
				_this.add.form.gasSpecies = '',
				_this.add.form.gasState = '',
				_this.add.form.gasModel = '',
				_this.add.form.gasWeight = '',
				_this.add.form.yearsOfUse = ''
				_this.add.form.firmId = ''

				_this.add.addDialogFormVisible = true;
			},
			
			trueToAddEvent: function() {
				let _this = this;
				$.each(_this.AllFirm, function(key, val){
					if(val.name === _this.add.firmName) {
						_this.add.form.firmId = val.id;
					}
				});

				$.ajax({
					type: "PUT",
                    dataType: "json", 
                    async: true,
                    xhrFields:{
                        withCredentials:true
                    },
                    crossDomain: true,
                    data:JSON.stringify(_this.add.form),
                    contentType: "application/json",
                    url: path.url + "gasbottle",
                    success: function( res ) {
                       if(res.code === '0') {
                            _this.add.addDialogFormVisible = false;
                               
                            _this.$notify({
                                  title: '成功',
                                  message: '添加成功！',
                                  type: 'success'
                            });

                            _this.initGrid(_this.currentPage);
                        }else{
                        	 _this.add.addDialogFormVisible = false;
                               
                            _this.$notify({
                                  title: '失败',
                                  message: '添加失败！',
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
			},

			editEvent: function() {
				let _this = this;
                if(_this.selectedRowTotal.length === 0) {
                    this.$notify({
                    title: '警告',
                    message: '请勾选你想要编辑的记录！',
                    type: 'warning'
                	});
                 	return false;
                }else if(_this.selectedRowTotal.length === 1) { 

                    _this.edit.editDialogFormVisible = true;//弹出编辑
                        
                }else {
                    this.$notify({
                        title: '警告',
                        message: '编辑时只能勾选一条记录！',
                        type: 'warning'
                    });
                    return false;
                } 
			},

			trueToEditEvent: function() {
				let _this = this;

				$.ajax({
					type: "POST",
                    dataType: "json", 
                    async: true,
                    xhrFields:{
                        withCredentials:true
                    },
                    crossDomain: true,
                    data:JSON.stringify(_this.edit.form),
                    contentType: "application/json",
                    url: path.url + "gasbottle",
                    success: function( res ) {
                        if(res.code === '0') { 
                                _this.edit.editDialogFormVisible = false;

                                _this.$notify({
                                    title: '成功',
                                    message: '修改成功！',
                                    type: 'success'
                                });

                                _this.initGrid(_this.currentPage);
                        }else{
                        	 	_this.edit.editDialogFormVisible = false;

                                _this.$notify({
                                    title: '失败',
                                    message: '修改失败！',
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
			},

			deleteEvent: function() {
				let _this = this;
				if(_this.selectedRowTotal.length === 0) {
                   	this.$notify({
                        title: '警告',
                        message: '请勾选您需要删除的记录！',
                        type: 'warning'
                    });
                    return false;
                }else {
                    _this.deleteMsg.deleteDialogFormVisible = true;//弹出编辑框
                }
			},

			trueToDeleteEvent: function() {
                let _this = this;  

                _this.deleteMsg.form.id = _this.selectedFormRow.id;

                $.ajax({
					type: "DELETE",
                    dataType: "json", 
                    async: true,
                    xhrFields:{
                        withCredentials:true
                    },
                    crossDomain: true,
                    data:JSON.stringify(_this.deleteMsg.form),
                    contentType: "application/json",
                    url: path.url + "gasbottle",
                    success: function( res ) {

                       if(res.code === '0') {
                            _this.deleteMsg.deleteDialogFormVisible = false;
                                
                            _this.$notify({
                                title: '成功',
                                message: '删除成功！',
                                type: 'success'
                           	});

                           _this.initGrid(_this.currentPage);
                        }else{
                        	_this.deleteMsg.deleteDialogFormVisible = false;
                                
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
           	},

           	handleClose( done ) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
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
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	}
	.el-col {
	    border-radius: 4px;
	}

	.grid-content {
	    border-radius: 4px;
	    min-height: 36px;
	}

	.gasPage{
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
  	.topToolNav .toLayoutBtn{
		position: absolute;
		top: 50%;
		margin-top: -18px;
  	}
  	.topToolNav .LayoutBtnAdd{
  		margin-left: 30px;
  	}
  	.topToolNav .LayoutBtnEdit{
  		margin-left: 110px;
  	}
  	.topToolNav .LayoutBtnDelete{
  		margin-left: 190px;
  	}
  	.topToolNav .searchInput{
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