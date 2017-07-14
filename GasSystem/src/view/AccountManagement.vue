<template>
	<div class="AccountPage">
		<div class="topToolNav" v-if="layout.topToolNav">
				<el-button class="toLayoutBtn LayoutBtnAdd" type="primary" :class="{btn:true}" @click="addEvent">增加</el-button>
               	<el-button class="toLayoutBtn LayoutBtnEdit" type="primary" :class="{btn:true}" @click="editEvent">编辑</el-button>
                <el-button class="toLayoutBtn LayoutBtnDelete" type="primary" :class="{btn:true}" @click="deleteEvent">删除</el-button>
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
	                prop="respType"
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
	                prop="respSex"
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
	                prop="password"
	                label="密码">
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
				  <el-col :span="12">
				  	<el-form-item label="账号类型">
			          <el-input v-model="add.form.respType" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="所属公司">
			          <el-input v-model="add.form.firmName" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="所属门店">
			          <el-input v-model="add.form.storeName" auto-complete="off"></el-input>
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
			          <el-input v-model="add.form.respSex" auto-complete="off"></el-input>
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
			          <el-input v-model="add.form.idCard" auto-complete="off"></el-input>
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
				  <el-col :span="12">
				  	<el-form-item label="账号类型">
			          <el-input v-model="edit.form.respType" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="所属公司">
			          <el-input v-model="edit.form.firmName" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="所属门店">
			          <el-input v-model="edit.form.storeName" auto-complete="off"></el-input>
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
			          <el-input v-model="edit.form.respSex" auto-complete="off"></el-input>
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
				  	<el-form-item label="密码">
			          <el-input v-model="edit.form.password" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="身份证号">
			          <el-input v-model="edit.form.idCard" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="24">
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
	      :visible.sync="deleteDialogFormVisible"
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
					topToolNav: true,
					tableArea: true,
				},

				keyword: '',
				select: '',
				tableData: [],
				totalPage: 50,
				currentPage: 1,
				pageNumber: 10,

				selectedRowTotal: [],
				selectedFormRow: '',

				add: {
					addDialogFormVisible: false,
					formLabelWidth: '100px',
					form: {
						respType: '',
						firmName: '',
						storeName: '',
						job: '',
						name: '',
						respSex: '',
						workNumber: '',
						mobile: '',
						password: '',
						idCard: '',
						address: ''
					}
				},

				edit: {
					editDialogFormVisible: false,
					formLabelWidth: '100px',
					form: {
						respType: '',
						firmName: '',
						storeName: '',
						job: '',
						name: '',
						respSex: '',
						workNumber: '',
						mobile: '',
						password: '',
						idCard: '',
						address: '',
						id: ''
					}
				},

				deleteDialogFormVisible: false
			}
		},

		props:[
			'AccountType'
		],

		methods: {
			handleSizeChange:function( val ) {
               
            },

            handleCurrentChange:function( val ) {
            },

           	handleSelectionChange( val ) {
                if(val.length !== 0){
                    this.selectedFormRow = val[0];                      
                }
                console.log( this.selectedFormRow)
            },

            handleSelected: function( selection, row ) {
                this.selectedRowTotal = selection;
                console.log(this.selectedRowTotal);
            },

            initLayout: function() {
            	console.log(this.AccountType.type)
            	// 三种账户类型
            	if(this.AccountType.type === 1) {
            		alert('普通用户');
            		this.layout.topToolNav = false;
            		this.layout.tableArea = false;
            		this.edit.editDialogFormVisible = true;

            		console.log(this.AccountType)
            	}else if(this.AccountType.type === 2) {
            		alert('管理员');
            		this.layout.topToolNav = true;
            		this.layout.tableArea = true;
            		this.edit.editDialogFormVisible = false;
            	}else if(this.AccountType.type === 3) {
            		alert('超级管理员');
            		this.layout.topToolNav = true;
            		this.layout.tableArea = true;
            		this.edit.editDialogFormVisible = false;
            	}else {
            		this.layout.topToolNav = true;
            		this.layout.tableArea = true;
            		this.edit.editDialogFormVisible = false;
            		return false;
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
                    	key: "",
                    	pageIndex: val,
                    	pageTotal: _this.pageNumber
                    }),
                    contentType: "application/json",
                    url: "http://10.0.0.46:8089/gas/web/accounts",
                    success: function( res ) {
                        console.log(res)
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
				_this.add.addDialogFormVisible = true;
			},

			trueToAddEvent: function() {
				let _this = this;
				console.log(_this.add.form)
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
                        console.log(res)
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
                        if(res.code === '0') {
                            _this.deteleMsg.deleteDialogFormVisible = false;
                                
                            _this.$notify({
                                title: '成功',
                                message: '删除成功！',
                                type: 'success'
                           	});

                            _this.initGrid(_this.currentPage);
                        }else{
                        	_this.deteleMsg.deleteDialogFormVisible = false;
                                
                            _this.$notify({
                                title: '成功',
                                message: '删除失败！',
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
				alert('delete');
				if(this.selectedRowTotal.length === 0) {
                   	this.$notify({
                        title: '警告',
                        message: '请勾选您需要删除的记录！',
                        type: 'warning'
                    });
                    return false;
                }else {
                    this.deleteDialogFormVisible = true;//弹出编辑框
                }
			},

			trueToDeleteEvent: function() {
                let _this = this;  
                $.ajax({
					type: "DELETE",
                    dataType: "json", 
                    async: true,
                    xhrFields:{
                        withCredentials:true
                    },
                    crossDomain: true,
                    data:JSON.stringify(),
                    contentType: "application/json",
                    url: path.url + "account/1",
                    success: function(res) {
                        console.log(res)
                    },
                    error:function() {
                    	//console.log(XMLHttpRequest.readyState);
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
		}
	}
</script>
<style scoped>
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
/*	.el-select,.el-input {
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