<template>
	<div class="gasPage">
		<div class="topToolNav">
				<el-button class="toLayoutBtn LayoutBtnAdd" type="primary" :class="{btn:true}" @click="addEvent">增加</el-button>
               	<el-button class="toLayoutBtn LayoutBtnEdit" type="primary" :class="{btn:true}" @click="editEvent">编辑</el-button>
                <el-button class="toLayoutBtn LayoutBtnDelete" type="primary" :class="{btn:true}" @click="deleteEvent">删除</el-button>
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
	                label="钢瓶重量">
	            </el-table-column>
	            <el-table-column
	                prop="yearsOfUse"
	                label="设计使用年限">
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
	    <el-dialog title="增加操作工信息" :visible.sync="add.addDialogFormVisible">
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
				  	<el-form-item label="钢瓶重量">
			          <el-input v-model="add.form.gasWeight" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="设计使用年限">
			          <el-input v-model="add.form.yearsOfUse" auto-complete="off"></el-input>
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
				  	<el-form-item label="出厂编号">
			          <el-input v-model="selectedFormRow.serialNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="自有钢瓶编号">
			          <el-input v-model="selectedFormRow.ownGasNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="制造单位">
			          <el-input v-model="selectedFormRow.makeUnit" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="制造年月">
			          <el-input v-model="selectedFormRow.makeTime" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="下检年月">
			          <el-input v-model="selectedFormRow.checkTime" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶种类">
			          <el-input v-model="selectedFormRow.gasSpecies" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶状态">
			          <el-input v-model="selectedFormRow.gasState" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶型号">
			          <el-input v-model="selectedFormRow.gasModel" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="钢瓶重量">
			          <el-input v-model="selectedFormRow.gasWeight" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="设计使用年限">
			          <el-input v-model="selectedFormRow.yearsOfUse" auto-complete="off"></el-input>
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
				keyword: '',
				select: '',
				tableData: [],
				totalPage: 5,
				currentPage: 1,
				pageNumber: 5,
				// 当前勾选的记录条信息 
                selectedFormRow: [],
                // 当前多选的记录条数信息
                selectedRowTotal: [],

				add: {
					addDialogFormVisible: false,
					formLabelWidth: '100px',
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
						yearsOfUse: ''
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

		methods: {
			handleSizeChange:function( val ) {
               
            },

            handleCurrentChange:function( val ) {//分页
            	this.initGrid(val);
            },

            handleSelectionChange( val ) {
               console.log(val)
               if(val.length !== 0){
                   this.selectedFormRow = val[0];                      
                }
            },

            handleSelected: function( selection, row ) {
                this.selectedRowTotal = selection;
                console.log(this.selectedFormRow);
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
                    url: "http://10.0.0.244:8089/gas/web/gasbottles",
                    success: function( res ) {
                        console.log(res)
                        _this.totalPage = res.result.count;
                        _this.tableData = res.result.data;
                        // _this.initGrid(_this.currentPage) 
                    },
                    error:function() {
                    	//console.log(XMLHttpRequest.readyState);
                    }
                });  
            },

			addEvent: function() {
				alert('add');
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

				_this.add.addDialogFormVisible = true;
			},
			
			trueToAddEvent: function() {
				let _this = this;
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
                    url: "http://10.0.0.244:8089/gas/web/gasbottle",
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
				_this.edit.form.serialNumber = _this.selectedFormRow.serialNumber;
				_this.edit.form.ownGasNumber = _this.selectedFormRow.ownGasNumber;
				_this.edit.form.makeUnit = _this.selectedFormRow.makeUnit;
				_this.edit.form.makeTime = _this.selectedFormRow.makeTime;
				_this.edit.form.checkTime = _this.selectedFormRow.checkTime;
				_this.edit.form.gasSpecies = _this.selectedFormRow.gasSpecies;
				_this.edit.form.gasState = _this.selectedFormRow.gasState;
				_this.edit.form.gasModel = _this.selectedFormRow.gasModel;
				_this.edit.form.gasWeight = _this.selectedFormRow.gasWeight;
				_this.edit.form.yearsOfUse = _this.selectedFormRow.yearsOfUse;

				// console.log(_this.edit.form)
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
                    url: "http://10.0.0.244:8089/gas/web/gasbottle",
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
				alert('delete')
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

                console.log(_this.deleteMsg.form.id)
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
                    url: "http://10.0.0.244:8089/gas/web/gasbottle",
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