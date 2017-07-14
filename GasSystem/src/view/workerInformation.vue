<template>
	<div class="workerPage">
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
	                prop="firmId"
	                label="所属公司">
	            </el-table-column>
	            <el-table-column
	                prop="station"
	                label="所属气站">
	            </el-table-column>
	            <el-table-column
	                prop="workType"
	                label="工种">
	            </el-table-column>
	            <el-table-column
	                prop="jobNumber"
	                label="工号">
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
	                prop="password"
	                label="密码">
	            </el-table-column>
	             <el-table-column
	                prop="idCard"
	                label="身份证号">
	            </el-table-column>
	             <el-table-column
	                prop="address"
	                label="住址">
	            </el-table-column>
	            <el-table-column
	                prop="IMEICode"
	                label="手机IMEI码">
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
				  	<el-form-item label="所属公司">
			          <el-input v-model="add.form.firmId" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="所属气站">
			          <el-input v-model="add.form.station" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="工种">
			          <el-input v-model="add.form.workType" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="工号">
			          <el-input v-model="add.form.jobNumber" auto-complete="off"></el-input>
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
				  <el-col :span="12">
				  	<el-form-item label="住址">
			          <el-input v-model="add.form.address" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="手机IMEI码">
			          <el-input v-model="add.form.IMEICode" auto-complete="off"></el-input>
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
				  	<el-form-item label="所属公司">
			          <el-input v-model="selectedFormRow.firmId" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="所属气站">
			          <el-input v-model="selectedFormRow.station" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>
	       
	       		<el-row>
				  <el-col :span="12">
				  	<el-form-item label="工种">
			          <el-input v-model="selectedFormRow.workType" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="工号">
			          <el-input v-model="selectedFormRow.jobNumber" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="姓名">
			          <el-input v-model="selectedFormRow.name" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="性别">
			          <el-input v-model="selectedFormRow.sex" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="密码">
			          <el-input v-model="selectedFormRow.password" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="身份证号">
			          <el-input v-model="selectedFormRow.idCard" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row>

				<el-row>
				  <el-col :span="12">
				  	<el-form-item label="住址">
			          <el-input v-model="selectedFormRow.address" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				  <el-col :span="12">
				  	<el-form-item label="手机IMEI码">
			          <el-input v-model="selectedFormRow.IMEICode" auto-complete="off"></el-input>
			        </el-form-item>
				  </el-col>
				</el-row> 
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="editDialogFormVisible = false">取 消</el-button>
		        <el-button type="primary" @click="trueToEditEvent()">确 定</el-button>
		    </div>
	    </el-dialog>
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
						firmId: '义乌燃气公司',
						station: '义务气站',
						workType: '充装工',
						jobNumber: '001',
						name: '张三',
						sex: '男',
						password: '123',
						idCard: '123123',
						address: '义乌',
						IMEICode: '134909090909'
					},
					{
						firmId: '义乌燃气公司',
						station: '义务气站',
						workType: '充装工',
						jobNumber: '001',
						name: '张三',
						sex: '男',
						password: '123',
						idCard: '123123',
						address: '义乌',
						IMEICode: '134909090909'
					},
					{
						firmId: '义乌燃气公司',
						station: '义务气站',
						workType: '充装工',
						jobNumber: '001',
						name: '张三',
						sex: '男',
						password: '123',
						idCard: '123123',
						address: '义乌',
						IMEICode: '134909090909'
					}			
				],
				totalPage: 50,
				currentPage: 1,
				pageNumber: 10,
				// 当前勾选的记录条信息 
                selectedFormRow: [],
                // 当前多选的记录条数信息
                selectedRowTotal: [],

				add: {
					addDialogFormVisible: false,
					formLabelWidth: '100px',
					form: {
						firmId: '',
						station: '',
						workType: '',
						jobNumber: '',
						name: '',
						sex: '',
						password: '',
						idCard: '',
						address: '',
						IMEICode: ''
					}
				},

				edit: {
					editDialogFormVisible: false,
					formLabelWidth: '100px',
					form: {
						firmId: '',
						station: '',
						workType: '',
						jobNumber: '',
						name: '',
						sex: '',
						password: '',
						idCard: '',
						address: '',
						IMEICode: ''
					}
				}
			}
		},

		methods: {
			handleSizeChange:function( val ) {
               
            },

            handleCurrentChange:function( val ) {
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
                // $.ajax({
                //     type: "POST",
                //     dataType: "json", 
                //     async: true,
                //     xhrFields:{
                //         withCredentials:true
                //     },
                //     crossDomain: true,
                //     data:JSON.stringify({
                //     	key: "",
                //     	pageIndex: val,
                //     	pageTotal: _this.pageNumber
                //     }),
                //     contentType: "application/json",
                //     url: "http://10.0.0.60:8089/gas/web/operators",
                //     success: function( res ) {
                //         console.log(res)
                //         _this.totalPage = res.result.count;
                //         _this.tableData = res.result.data;
                //     },
                //     error:function() {
                //     	//console.log(XMLHttpRequest.readyState);
                //     }
                // });  
            },

			addEvent: function() {
				alert('add');
				let _this = this;
				_this.add.addDialogFormVisible = true;
			},
			
			trueToAddEvent: function() {

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

			},

			deleteEvent: function() {
				alert('delete')
			}
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

	.workerPage{
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