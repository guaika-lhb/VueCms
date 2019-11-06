<template>
   <div>
<el-container>
 <div class="navExpenditure">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"><span class="indexe">首页</span></el-breadcrumb-item>
  <el-breadcrumb-item>财务管理</el-breadcrumb-item>
  <el-breadcrumb-item >支出</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
 </el-container>

 <el-container>
     <div class="news">
         <div class="subnews" style="background-color:#a55213;">
        <img src="../assets/img/zong.png" alt="" width="110px" height="110px" style="margin-left:50px;margin-top:20px;float:left;">
         <div style="margin-top:40px; font-size:24px;font-weight:bold;">总支出：</div>
         <div style="margin-top:15px;font-size:24px;margin-left:50px;">¥283,165</div>
         </div>
         <div class="subnews" style="background-color:#01d045;">
             <img src="../assets/img/out2.png" alt="" width="90px" height="90px" style="margin-left:50px;margin-top:30px;float:left;">
         <div style="margin-top:40px; font-size:24px;font-weight:bold;">线上活动费用支出：</div>
         <div style="margin-top:15px;font-size:24px;margin-left:50px;">¥633,15</div>
         </div>
         <div class="subnews" style="background-color: #a51313;">
             <img src="../assets/img/out3.png" alt="" width="90px" height="90px" style="margin-left:50px;margin-top:40px;float:left;">
         <div style="margin-top:40px; font-size:24px;font-weight:bold;">线下活动费用支出：</div>
         <div style="margin-top:15px;font-size:24px;margin-left:50px;">¥985,47</div>
         </div>
     </div>
 </el-container>

 <el-container>
     <div class="news">
         <div class="subnews" style="background-color:#1E90FF;">
        <img src="../assets/img/out6.png" alt="" width="90px" height="90px" style="margin-left:50px;margin-top:40px;float:left;">
         <div style="margin-top:40px; font-size:24px;font-weight:bold;">网上商城维护：</div>
         <div style="margin-top:15px;font-size:24px;margin-left:50px;">¥274,35</div>
         </div>
         <div class="subnews" style="background-color:#EEEE00;">
             <img src="../assets/img/out5.png" alt="" width="90px" height="90px" style="margin-left:50px;margin-top:40px;float:left;">
         <div style="margin-top:40px; font-size:24px;font-weight:bold;">进货货款支出：</div>
         <div style="margin-top:15px;font-size:24px;margin-left:50px;">¥563,25</div>
         </div>
         <div class="subnews" style="background-color: #EE799F;">
             <img src="../assets/img/out7.png" alt="" width="110px" height="110px" style="margin-left:50px;margin-top:20px;float:left;">
         <div style="margin-top:40px; font-size:24px;font-weight:bold;">运输费用支出：</div>
         <div style="margin-top:15px;font-size:24px;margin-left:50px;">¥875,43</div>
         </div>
     </div>
 </el-container>
 <el-container>
    <div class="checkTable">
		<el-tabs type="border-card">
			<el-tab-pane>
				<span slot="label" style="color:#a55218;"><i class="el-icon-tickets"></i>费用支出记录</span>
				<!--添加部分-->
				<div class="add">
					<el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">添加记录</el-button>
					<el-dialog title="添加出账记录" :visible.sync="dialogFormVisible">
					  	<el-form :model="out">
					    	<el-form-item label="序号" :label-width="formLabelWidth">
					      		<el-input v-model="out.id" ></el-input>
					   		</el-form-item>
					   		<el-form-item label="金额" :label-width="formLabelWidth">
					      		<el-input v-model="out.name" ></el-input>
					   		</el-form-item>
					   		<el-form-item label="支出原因" :label-width="formLabelWidth">
					      		<el-input v-model="out.number" 
					      			 @change="handleChange">
					      		</el-input>
					   		</el-form-item>
					   		<el-form-item label="时间" :label-width="formLabelWidth">
					   			<el-date-picker
      									v-model="out.date" type="date" placeholder="选择日期" 
      									format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd">
    							</el-date-picker>
					      		<!--<el-date-picker
								      v-model="value1" type="date" placeholder="选择日期">
								</el-date-picker>-->
					   		</el-form-item>
				
						</el-form>
						<div slot="footer" class="dialog-footer">
						   	<el-button @click="dialogFormVisible = false">取 消</el-button>
						    <el-button style="background-color:#a55213;color:white;" @click="create">确 定</el-button>
						</div>
					</el-dialog>

				</div>
				<!--搜索部分-->
				<div class="search">
					<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
					<el-button style="background-color:#a55213;color:white;" icon="el-icon-search">搜索</el-button>
				</div>
				<!--编辑部分的模态框-->
				<div class="edit">
					<el-dialog  title="编辑入账记录" :visible.sync="editFormVisible">
						<el-form :model="edit">
					    	<el-form-item label="序号" :label-width="formLabelWidth">
					      		<el-input v-model="edit.id" ></el-input>
					   		</el-form-item>
					   		<el-form-item label="金额" :label-width="formLabelWidth">
					      		<el-input v-model="edit.name" ></el-input>
					   		</el-form-item>
					   		<el-form-item label="支出原因" :label-width="formLabelWidth">
					   			<!--<el-input type="number"  v-model="edit.number" >	</el-input>-->
					      		<el-input v-model="edit.number" 
					      			 @change="handleChange" >
					      		</el-input>
					   		</el-form-item>
					   		<el-form-item label="时间" :label-width="formLabelWidth">
					   			<el-date-picker
      									v-model="edit.date" type="date" placeholder="选择日期" 
      									format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd">
    							</el-date-picker>
					   		</el-form-item>
					
						</el-form>
						<div slot="footer" class="dialog-footer">
						   	<el-button @click="editFormVisible =false">取 消</el-button>
						    <el-button style="background-color:#a55213;color:white;" @click="change">保存</el-button>
						</div>
					</el-dialog>
				</div>
			        <!--仓库盘点-->
				<el-table :data="tableData2.slice((currentPage -1)*pagesize,currentPage*pagesize)" style="width: 100%">
					<el-table-column label="序号" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.id}}</span>
						</template>
					</el-table-column>
					<el-table-column label="金额">
					    <template slot-scope="scope">
					    <div slot="reference" class="name-wrapper">
					    <el-tag size="medium">{{ scope.row.name }}</el-tag>
					    </div>
					    </template>
					</el-table-column>
					<el-table-column label="支出原因">
						<template slot-scope="scope">
							<span>{{scope.row.number}}</span>
						</template>
					</el-table-column>
			
				    <el-table-column label="时间">
				      <template slot-scope="scope">
				        <i class="el-icon-time"></i>
				        <span style="margin-left: 10px">{{ scope.row.date }}</span>
				      </template>
				    </el-table-column>
				
				    <el-table-column label="操作" width="180">
				      <template slot-scope="scope">
				        <el-button size="mini" style="background-color:#a55213;color:white;"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
				        	删除</el-button>
				      </template>
				    </el-table-column>
		  		</el-table>
		  		<!--分页-->
		        <div class="block">
		            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
		              	:current-page="currentPage" :page-sizes="[4, 8, 12]" :page-size="pagesize"
		              	layout="total, sizes, prev, pager, next, jumper" :total="this.tableData2.length">
		            </el-pagination>
		        </div>
			</el-tab-pane>
		</el-tabs>
		
	</div>
</el-container>
   </div> 
</template>

<script>
export default {
 
    data() {
      return {
    tableData2:[{
	        	id:"01",
	          	date: '2019-10-09',
	          	name: '¥425,95',
	          	number:'线下推广'
	        }, 
	        {
	        	id:"02",
		        date: '2019-09-21',
		        name: '¥124,85',
		        number:'广告费'
	        }, 
	        {
	        	id:"03",
		        date: '2019-08-09',
		        name: '¥853,22',
		        number:'商城活动'
	        }, 
	        {
	        	id:"04",
		        date: '2019-08-01',
		        name: '¥653,22',
		        number:'进货'
	        }, 
	        {
	        	id:"05",
		        date: '2019-07-01',
		        name: '¥653,22',
		        number:'进货'
	        },
	        {
	        	id:"06",
		        date: '2019-06-01',
		        name: '¥196,2',
		        number:'儿童节活动'
	        },
	        {
	        	id:"07",
		        date: '2019-05-29',
		        name: '¥200,0',
		        number:'商城装修'
	        },
	        {
	        	id:"08",
		        date: '2019-04-08',
		        name: '¥529',
		        number:'仓库维护'
	        },
	        {
	        	id:"09",
		        date: '2019-01-05',
		        name: '¥985,60',
		        number:'运输费结算'
	        },
	        {
	        	id:"10",
		        date: '2018-12-04',
		        name: '¥150,62',
		        number:'员工福利'
	        },
	        {
	        	id:"11",
		        date: '2018-10-02',
		        name: '¥247,89',
		        number:'进货'
	        },
	        {
	        	id:"12",
		        date: '2018-08-01',
		        name: '¥247,89',
		        number:'进货'
	        }],
	        // 分页
		    currentPage: 1,
		    pagesize: 4,
		    activeName: 'first',
		    //增加模态框
		    dialogTableVisible: false,
        	dialogFormVisible: false,
        	editFormVisible: false,
        	input:'',
	        out: {
	        	number:'',
	        	id:'13',
		        name: '',
		        delivery: false,
		        type: [],
		       	reason:'',
		       	price:'￥',
		       	date: '',
	        },
	        edit: {
	        	number:'',
	        	id:'14',
		        name: '',
		        delivery: false,
		        type: [],
		       	reason:'',
		       	price:'￥',
		       	date: '',
	        },
	        
	       
        	formLabelWidth: '100px'
      };
       
    },
    
    methods: {
	      handleEdit(index, row) {
	        console.log(index, row);
	      },
	      handleDelete(item) {
	         const h = this.$createElement
		      this.$msgbox({
		        title: '删除',
		        message: h('p', null, [h('span', null, '确认删除')]),
		        showCancelButton: true,
		        cancelButtonText: '取消',
		        confirmButtonText: '确认',
		        beforeClose: (action, instance, done) => {
		          if (action === 'confirm') {
		            instance.confirmButtonLoading = true
		            instance.confirmButtonText = '执行中....'
		            setTimeout(() => {
		              this.deleteRow(item)
		              done()
		              instance.confirmButtonLoading = false
		            }, 1000)
		          } else {
		            done()
		          }
		        }
		      }).then(action => {
		        this.$message({
		          message: '恭喜你，删除成功',
		          type: 'success'
		        })
		      }).catch(err => {
		        this.$message({
		          message: '你取消了删除操作',
		          type: 'info'
		        })
		      })
	      },
	      deleteRow (item) {
		      this.tableData2.splice(item, 1)
		      // window.location.reload()
		    },
//		    分页
	      // 每页条数
		    handleSizeChange (val) {
		      this.pagesize = val
		      console.log(`每页 ${val} 条`)
		    },
		    // 当前页数
		    handleCurrentChange (val) {
		      this.currentPage = val
		      console.log(`当前页: ${val}`)
		    },
		
		    revise (item) {
		      console.log(item.address)
		      console.log(item.date)
		    },
		    // 弹出框关闭
		    handleClose (done) {
		      this.$confirm('确认关闭？')
		        .then(_ => {
		          done()
		        })
		        .catch(_ => {})
		    },
			 create () {
		      this.tableData2.push(this.out)// 给tabledata添加一个对象（之前我们创建的info）
		       // 点击创建后，让option还原，而不是停留在所选的项
		      this.out = {id: '', name: '', number: '',price:'',data:'' }
		      this.dialogFormVisible=false;
		     
		    },
//			//改变数字部分
			handleChange(value) {
	        	console.log(value);
	     },
//			编辑
	      handleEdit: function (index, row) {
	        this.editFormVisible = true;
	        this.edit = Object.assign({}, row);
			this.tableData2.splice(index, 1)
	      },
	      //提交编辑
	      change: function (index) {
	        this.tableData2.unshift(this.edit)
	        this.edit = {id: '', name: '', number:'', data: '',reason:''}
             this.editFormVisible = false;
	        this.editLoading= true
	      },
		} 

}   

</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.navExpenditure{
    width: 100%;
    height: 25px;
    background-color: #fff;
    line-height: 60px;
    padding: 20px;
    box-shadow: 5px 5px 5px #ccc;
}

.news{
    width: 100%;
    height: 200px;
 display: flex;
}
.subnews{
    width: 470px;
    height: 160px;
    margin: 10px 20px;
    box-shadow: 5px 5px 5px #ccc;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: white;
    
}
.checkTable{
    margin-top:-10px;
    width: 100%;
    box-shadow: 5px 5px 5px #ccc;
}
.add .el-button:first-child{
		position: relative;
	}
	
.search{
		position: absolute;
		margin-left: 76%;
		margin-top: -40px;
		
	}
	.search .el-input{
		width:200px;
	
		
	}
.indexe:hover{
	color: #a55218;
}

</style>