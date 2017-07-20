<template>
	<div class="AccountPage">
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

		<div class="table-area" v-if="layout.tableArea">
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
	                prop="type"
	                label="账号类型">
	            </el-table-column>
	            <el-table-column
	                prop="firmName"
	                label="所属公司">
	            </el-table-column>
	            <el-table-column
	                prop="storeName"
	                label="所属门店">
	            </el-table-column>
	            <el-table-column
	                prop="job"
	                label="职位">
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
	                prop="workNumber"
	                label="工号">
	            </el-table-column>
	            <el-table-column
	                prop="mobile"
	                label="手机号码">
	            </el-table-column>
	             <el-table-column
	                prop="idcard"
	                label="身份证号">
	            </el-table-column>
	            <el-table-column
	                prop="address"
	                label="住址">
	            </el-table-column>
	        </el-table>
	        <h4 class="hintMsg">账户信息管理中可查询的关键字：地址、账户名、身份证、职业、手机号、工号、门店名、账户类型、性别。</h4>
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
	    <el-dialog title="增加账户信息" :visible.sync="add.addDialogFormVisible">
	      <el-form :model="add.form" :label-width="add.formLabelWidth">
		      	<el-row>
		      	  <el-col :span="12" v-if="layout.conpanyShow">
				  	<el-form-item label="燃气公司" :label-width="add.formLabelWidth">
			          <el-select v-model="add.firmName" placeholder="请选择燃气公司" @change="addFirmSelectToStore">
			            <el-option 
			                v-for="item in AllFirm" 
			                :key="item.name"
			                :label="item.name" 
			                :value="item.name">
			            </el-option>
			          </el-select>
			        </el-form-item>
				  </el-col>
				  
				  <el-col :span="12" v-if="layout.storeShow">
				  	<el-form-item label="所属气站" :label-width="edit.formLabelWidth">
			          <el-select v-model="add.storeName" placeholder="请选择燃气公司">
			            <el-option 
			                v-for="item in AllStore" 
			                :key="item.storeName"
			                :label="item.storeName" 
			                :value="item.storeName">
			            </el-option>
			          </el-select>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="账号类型" :label-width="add.formLabelWidth">
			          <el-select v-model="add.form.type" placeholder="请选择用户类型">
			            <el-option 
			                v-for="item in AllAccountType" 
			                :key="item.name"
			                :label="item.name" 
			                :value="item.value">
			            </el-option>
			          </el-select>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="职位">
			          <el-input v-model="add.form.job" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="姓名">
			          <el-input v-model="add.form.name" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="性别">
			          <el-input v-model="add.form.sex" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="工号">
			          <el-input v-model="add.form.workNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="手机号码">
			          <el-input v-model="add.form.mobile" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="密码">
			          <el-input v-model="add.form.password" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="身份证号">
			          <el-input v-model="add.form.idcard" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="24">
				  	<el-form-item label="地址">
			          <el-input v-model="add.form.address" auto-complete="off"></el-input>
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
	    <el-dialog title="修改账户信息" :visible.sync="edit.editDialogFormVisible">
	      <el-form :model="edit.form" :label-width="edit.formLabelWidth">
		      	<el-row>
				  <el-col :span="12" v-if="layout.conpanyShow">
				  	<el-form-item label="燃气公司" :label-width="edit.formLabelWidth">
			          <el-select v-model="edit.firmName" placeholder="请选择燃气公司" @change="editFirmSelectToStore">
			            <el-option 
			                v-for="item in AllFirm" 
			                :key="item.name"
			                :label="item.name" 
			                :value="item.name">
			            </el-option>
			          </el-select>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12" v-if="layout.storeShow">
				  	<el-form-item label="所属气站" :label-width="edit.formLabelWidth">
			          <el-select v-model="edit.storeName" placeholder="请选择燃气公司">
			            <el-option 
			                v-for="item in AllStore" 
			                :key="item.storeName"
			                :label="item.storeName" 
			                :value="item.storeName">
			            </el-option>
			          </el-select>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="账号类型" :label-width="edit.formLabelWidth">
			          <el-select v-model="edit.form.type" placeholder="请选择用户类型">
			            <el-option 
			                v-for="item in AllAccountType" 
			                :key="item.name"
			                :label="item.name" 
			                :value="item.value">
			            </el-option>
			          </el-select>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="职位">
			          <el-input v-model="edit.form.job" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="姓名">
			          <el-input v-model="edit.form.name" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="性别">
			          <el-input v-model="edit.form.sex" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="工号">
			          <el-input v-model="edit.form.workNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="手机号码">
			          <el-input v-model="edit.form.mobile" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="身份证号">
			          <el-input v-model="edit.form.idcard" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="地址">
			          <el-input v-model="edit.form.address" auto-complete="off"></el-input>
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
					storeShow: false,
					firmSelectShow: null,
					tableArea: true,
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
				AllStore: [],
				// 当前勾选的记录条信息 
                selectedFormRow: [],
                // 当前多选的记录条数信息
                selectedRowTotal: [],

                AllAccountType:[
                	{
                		name: '普通用户',
                		value: '1'
                	},
                	{
                		name: '管理员',
                		value: '2'
                	},
                ],

				add: {
					addDialogFormVisible: false,
					formLabelWidth: '100px',
					storeName: '',
					firmName: '',
					form: {
						firmId: '',
						storeId: '',
						type: '',
						job: '',
						name: '',
						sex: '',
						workNumber: '',
						mobile: '',
						password: '',
						idcard: '',
						address: ''
					}
				},

				edit: {
					editDialogFormVisible: false,
					formLabelWidth: '100px',
					storeName: '',
					firmName: '',
					form: {
						firmId: '',
						type: '',
						job: '',
						name: '',
						sex: '',
						workNumber: '',
						mobile: '',
						idcard: '',
						address: '',
						id: '',
						storeId: ''
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

            handleCurrentChange:function( val ) {
            	this.initGrid(val);
            },

           	handleSelectionChange( val ) {
                if(val.length !== 0){
                    this.selectedFormRow = val[0];   
                  	this.edit.storeName = this.selectedFormRow.storeName;
					this.edit.form.type = this.selectedFormRow.type;
					this.edit.firmName = this.selectedFormRow.firmName;
					this.edit.form.name = this.selectedFormRow.name;
					this.edit.form.sex = this.selectedFormRow.sex;
					this.edit.form.idcard = this.selectedFormRow.idcard;
					this.edit.form.address = this.selectedFormRow.address;
					this.edit.form.job = this.selectedFormRow.job;
					this.edit.password = this.selectedFormRow.password;
					this.edit.form.mobile = this.selectedFormRow.mobile;
					this.edit.form.workNumber = this.selectedFormRow.workNumber;                          
                }
            },

            handleSelected: function( selection, row ) {
                this.selectedRowTotal = selection;
            },

            initLayout: function() {
            	// 三种账户类型
            	if(this.AccountType.type === 1) {
            		this.layout.tableArea = false;
            		this.layout.addBtnShow = false;
            		this.layout.editBtnShow = false;
            		this.layout.deleteBtnShow = false;
            		this.layout.firmSelectShow = false;
            		this.layout.conpanyShow = false;
            		this.layout.storeShow = false;
            		this.edit.editDialogFormVisible = true;
            	}else if(this.AccountType.type === 2) {
            		this.layout.tableArea = true;
            		this.layout.addBtnShow = true;
            		this.layout.editBtnShow = true;
            		this.layout.deleteBtnShow = true;
            		this.layout.firmSelectShow = false;
            		this.layout.conpanyShow = false;
            		this.layout.storeShow = false;
            		this.findAllStore(this.AccountType.firmId);
            		this.edit.editDialogFormVisible = false;
            	}else if(this.AccountType.type === 3) {
            		this.layout.tableArea = true;
            		this.layout.addBtnShow = true;
            		this.layout.editBtnShow = true;
            		this.layout.deleteBtnShow = true;
            		this.layout.firmSelectShow = true;
            		this.layout.conpanyShow = true;
            		this.layout.storeShow = true;
            		this.edit.editDialogFormVisible = false;
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

            findAllStore: function(val) {
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
                    	id:val
                    }),
                    contentType: "application/json",
                    url: path.url + "findStoreByFirmId",
                    success: function( res ) {	
                       	_this.AllStore = res.result.data;
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

            addFirmSelectToStore: function() {
            	let _this = this;
            	$.each(_this.AllFirm, function(key, val){
					if(val.name === _this.add.firmName) {
						_this.add.form.firmId = val.id;
					}
				});
            	_this.findAllStore(_this.add.form.firmId);
            },

            editFirmSelectToStore: function() {
            	let _this = this;
            	$.each(_this.AllFirm, function(key, val){
					if(val.name === _this.edit.firmName) {
						_this.edit.form.firmId = val.id;
					}
				});
            	_this.findAllStore(_this.edit.form.firmId);
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
                    url: path.url + "accounts",
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

            	_this.add.type = '';
				_this.add.firmName = '';
				_this.add.storeName = '';
				_this.add.form.workNumber = '';
				_this.add.form.name = '';
				_this.add.form.sex = '';
				_this.add.form.idcard = '';
				_this.add.form.address = '';
				_this.add.form.job = '';
				_this.add.form.password = '';
				_this.add.form.mobile = '';

				_this.add.addDialogFormVisible = true;
			},

			trueToAddEvent: function() {
				let _this = this;

				$.each(_this.AllStore, function(key, val){
					if(val.storeName === _this.add.storeName) {
						_this.add.form.storeId = val.id;
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
                    url: path.url + "account",
                    success: function(res) {

                        if(res.result.text === 'success') {
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
                		_this.edit.form = _this.selectedFormRow;

                   		_this.edit.editDialogFormVisible = true;//弹出编辑框

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
				
				$.each(_this.AllFirm, function(key, val){
					if(val.name === _this.edit.firmName) {
						_this.edit.form.firmId = val.id;
					}
				});

				$.each(_this.AllStore, function(key, val){
					if(val.storeName === _this.edit.storeName) {
						_this.edit.form.storeId = val.id;
					}
				});

				// 添加操作工id
				_this.edit.form.id = _this.selectedFormRow.id;

					delete _this.edit.form.firmName;
					delete _this.edit.form.storeName;

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
                    url: path.url + "accountu",
                    success: function( res ) {

                         if(res.result.text === 'success') {
                        	 _this.edit.addDialogFormVisible = false;
                               
                            _this.$notify({
                                  title: '成功',
                                  message: '添加成功！',
                                  type: 'success'
                            });

                            _this.initGrid(_this.currentPage);
                        }else{
                        	_this.edit.addDialogFormVisible = false;
                               
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
                    url: path.url + "account",
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

           	handleClose(done) {
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
	.AccountPage{
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