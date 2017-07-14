<template>
	<div class="storePage">
		<div class="topToolNav">
				<el-button class="toLayoutBtn LayoutBtnAdd" type="primary" :class="{btn:true}" @click="addEvent" v-if="layout.addBtnShow">增加</el-button>
               	<el-button class="toLayoutBtn LayoutBtnEdit" type="primary" :class="{btn:true}" @click="editEvent" v-if="layout.editBtnShow">编辑</el-button>
                <el-button class="toLayoutBtn LayoutBtnDelete" type="primary" :class="{btn:true}" @click="deleteEvent" v-if="layout.deleteBtnShow">删除</el-button>
				<el-input placeholder="请输入查询关键字" v-model="keyword" class="searchInput">
			    <el-select v-model="select" slot="prepend" placeholder="关键字选择">
			      <el-option label="所属气站" value="1"></el-option>
			      <el-option label="工号" value="2"></el-option>
			      <el-option label="名字" value="3"></el-option>
			      <el-option label="身份证号" value="4"></el-option>
			    </el-select>
			    <el-button slot="append" icon="search"></el-button>
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
	                prop="company"
	                label="公司名称">
	            </el-table-column>
	            <el-table-column
	                prop="storeName"
	                label="门店名称">
	            </el-table-column>
	            <el-table-column
	                prop="address"
	                label="门店地址">
	            </el-table-column>
	            <el-table-column
	                prop="personLiable"
	                label="门店责任人">
	            </el-table-column>
	            <el-table-column
	                prop="phone"
	                label="联系电话">
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

	   	<!-- 添加按钮弹出框 -->
	    <el-dialog title="新增门店信息" :visible.sync="add.addDialogFormVisible">
	      <el-form :model="add.form" :label-width="add.formLabelWidth">
		      	<el-row>
				  <el-col :span="12">
				  	<el-form-item label="门店名称">
			          <el-input v-model="add.form.storeName" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="门店地址">
			          <el-input v-model="add.form.address" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="门店责任人">
			          <el-input v-model="add.form.personLiable" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="联系电话">
			          <el-input v-model="add.form.phone" auto-complete="off"></el-input>
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
	    <el-dialog title="增加操作工信息" :visible.sync="edit.editDialogFormVisible">
	      <el-form :model="selectedFormRow" :label-width="edit.formLabelWidth">
		      	<el-row>
				  <el-col :span="12">
				  	<el-form-item label="联系电话">
			          <el-input v-model="selectedFormRow.phone" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="门店地址">
			          <el-input v-model="selectedFormRow.address" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="门店责任人">
			          <el-input v-model="selectedFormRow.personLiable" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="门店名称">
			          <el-input v-model="selectedFormRow.storeName" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
			        <el-form-item label="燃气公司" :label-width="edit.formLabelWidth">
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
					conpanyShow: false
				},

				AllFirm: [],
				keyword: '',
				select: '',
				tableData: [],
				totalPage: 50,
				currentPage: 1,
				pageNumber: 5,
				// 当前勾选的记录条信息 
                selectedFormRow: [],
                // 当前多选的记录条数信息
                selectedRowTotal: [],

				add: {
					addDialogFormVisible: false,
					formLabelWidth: '100px',
					firmName: '',
					form: {
						storeName: '',
						address: '',
						personLiable: '',
						phone: '',
						firmId: ''
					}
				},

				edit: {
					editDialogFormVisible: false,
					formLabelWidth: '100px',
					form: {
						id: '',
						storeName: '',
						address: '',
						personLiable: '',
						phone: '',
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

            handleCurrentChange:function( val ) {
            	this.initGrid(val);
            },

            handleSelectionChange( val ) {
               // console.log(val)
               if(val.length !== 0){
                   this.selectedFormRow = val[0];                      
                }
            },

            handleSelected: function( selection, row ) {
                this.selectedRowTotal = selection;
                console.log(this.selectedFormRow);
            },

            initLayout: function() {
            	// console.log(this.AccountType.type)
            	// 三种账户类型
            	if(this.AccountType.type === 1) {
            		alert('普通用户');
            		this.layout.addBtnShow = false;
            		this.layout.editBtnShow = false;
            		this.layout.deleteBtnShow = false;
            		this.layout.conpanyShow = false;
            	}else if(this.AccountType.type === 2) {
            		alert('管理员');
            		this.layout.topToolNav = true;
            		this.layout.editBtnShow = true;
            		this.layout.deleteBtnShow = true;
            		this.layout.conpanyShow = false;
            	}else if(this.AccountType.type === 3) {
            		alert('超级管理员');
            		this.layout.topToolNav = true;
            		this.layout.editBtnShow = true;
            		this.layout.deleteBtnShow = true;
            		this.layout.conpanyShow = true;
            	}else {
            		this.layout.topToolNav = true;
            		this.layout.editBtnShow = true;
            		this.layout.deleteBtnShow = true;
            		this.layout.conpanyShow = false;
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
                    url: "http://10.0.0.46:8089/gas/web/findAllFirm",
                    success: function( res ) {	
                       	_this.AllFirm = res.result.data;
                       	// console.log(_this.AllFirm)

                    },
                    error:function() {
                    	//console.log(XMLHttpRequest.readyState);
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
                    	key: "",
                    	pageIndex: val,
                    	pageTotal: _this.pageNumber
                    }),
                    contentType: "application/json",
                    url: "http://10.0.0.244:8089/gas/web/stores",
                    success: function( res ) {
                        // console.log(res)
                        _this.totalPage = res.result.count;
                        _this.tableData = res.result.data;
                    },
                    error:function() {
                    	//console.log(XMLHttpRequest.readyState);
                    }
                });  
            },

			addEvent: function() {
				alert('add');
				let _this = this;

				_this.add.form.storeName = '';
				_this.add.form.address = '';
				_this.add.form.personLiable = '';
				_this.add.form.phone = '';
				_this.add.form.firmId = '';

				_this.add.addDialogFormVisible = true;
			},
			
			trueToAddEvent: function() {
				let _this = this;

				$.each(_this.AllFirm, function(key, val){
					if(val.name === _this.add.firmName) {
						_this.add.form.firmId = val.id;
					}
				});
				// console.log(_this.add.form)
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
                    url: "http://10.0.0.244:8089/gas/web/store",
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
                    error:function() {
                    	//console.log(XMLHttpRequest.readyState);
                    }
				});
			},

			editEvent: function() {
				alert('edit')
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
				
				_this.edit.form.id = _this.selectedFormRow.id;
				_this.edit.form.phone = _this.selectedFormRow.phone;
				_this.edit.form.personLiable = _this.selectedFormRow.personLiable;
				_this.edit.form.address = _this.selectedFormRow.address;
				_this.edit.form.storeName = _this.selectedFormRow.storeName;

				$.each(_this.AllFirm, function(key, val){
					if(val.name === _this.selectedFormRow.company) {
						_this.edit.form.firmId = val.id;
					}
				});

				console.log(_this.edit.form)
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
                    url: "http://10.0.0.244:8089/gas/web/store",
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
                    error:function() {
                    	//console.log(XMLHttpRequest.readyState);
                    }
				});
			},

			deleteEvent: function() {
				let _this = this;
				alert('delete')
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

                // console.log(_this.deleteMsg.form.id)
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
                    url: "http://10.0.0.244:8089/gas/web/store",
                    success: function( res ) {
                    	// console.log(res)
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
                    error:function() {
                    	//console.log(XMLHttpRequest.readyState);
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

	.storePage{
		width: 100%;
		height: 100%;
	}
	.topToolNav{
		position: relative;
		width: 100%;
		height: 10%;
		background-color: white;
	}
	/*.el-select,.el-input {
    	width: 135px!important;
  	}*/
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
	.pagination{
		position: absolute;
		right: 20px;
		bottom: 20px;
	}
</style>