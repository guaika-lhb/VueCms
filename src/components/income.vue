<template>
<div>
<el-container>
 <div class="navIncome">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>财务管理</el-breadcrumb-item>
  <el-breadcrumb-item >收入</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</el-container>
<el-container>
<!-- 金额核对进度 -->
 <div class="moneyTest">
     <div style="margin-left:30px;margin-top:30px;float:left;width:300px; height:250px;background-color:#a55213; color:white; border-radius:8%">
         <img src="../assets/img/check.png" alt="" width="110px" height="110px" style="margin-left:90px;margin-top:50px">
        <h1 style="margin-top:20px;text-align:center;">本周累计收入：</h1>
        <h2 style="margin-top:20px;text-align:center;">¥2300,90</h2>
     </div>
 
 <div class="checkTitle">
 <div style="font-size:18px;font-weight:bolder;text-align:center;width:96%; padding:35px;">商城盈利金额核对进度</div>
  <div>
 <el-steps :active="2">
  <el-step title="已操作" description="检查收款金额"></el-step>
  <el-step title="已操作" description="核对银行余额"></el-step>
  <el-step title="待操作" description="确认完成"></el-step>
</el-steps>
  </div>
  </div>

  <!-- 进度条 -->
<div class="progro">
<div style="font-size:18px;font-weight:bolder;text-align:center;width:96%; padding:20px;">核对记录表</div>
<el-table
    :data="tableData"
    stripe
    style="width: 100%;"
    height="200">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="操作账号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="登录地">
    </el-table-column>
  </el-table>
</div>
 </div>
</el-container>
<el-container>
    <div class="checkTable">
		<el-tabs type="border-card">
			<el-tab-pane>
				<span slot="label" style="color:#a55218;"><i class="el-icon-tickets"></i>入账记录</span>
				<!--添加部分-->
				<div class="add">
					<el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">添加记录</el-button>
					<el-dialog title="添加入账记录" :visible.sync="dialogFormVisible">
					  	<el-form :model="out">
					    	<el-form-item label="序号" :label-width="formLabelWidth">
					      		<el-input v-model="out.id" ></el-input>
					   		</el-form-item>
					   		<el-form-item label="商品名称" :label-width="formLabelWidth">
					      		<el-input v-model="out.name" ></el-input>
					   		</el-form-item>
					   		<el-form-item label="交易数量" :label-width="formLabelWidth">
					      		<el-input-number v-model="out.number" 
					      			 @change="handleChange" :min="1" :max="10000" label="20">
					      		</el-input-number>
					   		</el-form-item>
					   		<el-form-item label="交易时间" :label-width="formLabelWidth">
					   			<el-date-picker
      									v-model="out.date" type="date" placeholder="选择日期" 
      									format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd">
    							</el-date-picker>
					      		<!--<el-date-picker
								      v-model="value1" type="date" placeholder="选择日期">
								</el-date-picker>-->
					   		</el-form-item>
					   		<el-form-item label="价格" :label-width="formLabelWidth">
							    <el-input type="text" v-model="out.price"></el-input>
							</el-form-item>
					   		<el-form-item label="入账金额" :label-width="formLabelWidth">
							    <el-input type="textarea" v-model="out.reason"></el-input>
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
					   		<el-form-item label="商品名称" :label-width="formLabelWidth">
					      		<el-input v-model="edit.name" ></el-input>
					   		</el-form-item>
					   		<el-form-item label="成交数量/份" :label-width="formLabelWidth">
					   			<!--<el-input type="number"  v-model="edit.number" >	</el-input>-->
					      		<el-input-number v-model="edit.number" 
					      			 @change="handleChange" :min="1" :max="10000" label="20">
					      		</el-input-number>
					   		</el-form-item>
					   		<el-form-item label="交易时间" :label-width="formLabelWidth">
					   			<el-date-picker
      									v-model="edit.date" type="date" placeholder="选择日期" 
      									format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd">
    							</el-date-picker>
					   		</el-form-item>
					   		<el-form-item label="价格" :label-width="formLabelWidth">
							    <el-input type="text" v-model="edit.price"></el-input>
							</el-form-item>
					   		<el-form-item label="入账金额" :label-width="formLabelWidth">
							    <el-input type="textarea" v-model="edit.reason"></el-input>
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
					<el-table-column label="商品名称">
					    <template slot-scope="scope">
					        <el-popover trigger="hover" placement="top">
					          	<p>商品名称: {{ scope.row.name }}</p>
					          	<p>商品详情: {{ scope.row.detail }}</p>
					          	<div slot="reference" class="name-wrapper">
					            	<el-tag size="medium">{{ scope.row.name }}</el-tag>
					          	</div>
					        </el-popover>
					    </template>
					</el-table-column>
					<el-table-column label="成交数量/份">
						<template slot-scope="scope">
							<span>{{scope.row.number}}</span>
						</template>
					</el-table-column>
					<el-table-column label="价格">
						<template slot-scope="scope">
							<span>{{scope.row.price}}</span>
						</template>
					</el-table-column>
				    <el-table-column label="交易时间">
				      <template slot-scope="scope">
				        <i class="el-icon-time"></i>
				        <span style="margin-left: 10px">{{ scope.row.date }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column label="入账金额">
						<template slot-scope="scope">
							<span>{{scope.row.reason}}</span>
						</template>
					</el-table-column>
				    <el-table-column label="操作" width="180">
				      <template slot-scope="scope">
				        <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)" style="background-color:#a55213;color:white;">编辑</el-button>
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
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
        tableData: [{
          date: '2019-10-31 00：21',
          name: '松鼠一号（超级管理员）',
          address: '四川 成都'
        }, {
          date: '2019-10-07 13：51',
          name: '松鼠一号（超级管理员）',
          address: '四川 成都'
        }, {
          date: '2019-09-30 10：21',
          name: '松鼠三号（普通管理员）',
          address: '四川 成都'
        }, {
          date: '2019-09-22 19：31',
          name: '松鼠二号（普通管理员）',
          address: '四川 成都'
        }],
      
    tableData2:[{
	        	id:"01",
	          	date: '2019-10-09',
	          	name: '水果干大礼包',
	          	number:'300',
	          	price:'￥39.9',
	          	reason:'￥11970',
	          	detail: '零食蜜饯果干组合芒果干草莓干5袋装/468g'
	        }, 
	        {
	        	id:"02",
		        date: '2019-10-09',
		        name: '零食大礼包',
		        number:'600',
		        price:'￥59.9',
		       	reason:'￥35940',
	          	detail: '网红爆款坚果休闲小吃散装食品一箱780g（含炭烧腰果）/共8袋'
	        }, 
	        {
	        	id:"03",
		        date: '2019-10-09',
		        name: '每日坚果',
		        number:'100',
		        price:'￥149',
		       	reason:'￥14900',
	          	detail: '量版混合干果小包装零食大礼包750g/30天装'
	        }, 
	        {
	        	id:"04",
		        date: '2019-10-09',
		        name: '牛肉风味大礼包',
		        number:'600',
		        price:'￥120.9',
		       	reason:'￥72540',
	          	detail: '牛板筋、牛肉粒，牛肚，牛肉片（100g）/共4袋'
	        }, 
	        {
	        	id:"05",
		        date: '2019-10-09',
		        name: '每日坚果',
		        number:'60',
		        price:'￥149',
		       	reason:'￥8940',
	          	detail: '网红爆款坚果休闲小吃散装食品一箱780g（含炭烧腰果）/共8袋'
	        },
	        {
	        	id:"06",
		        date: '2019-10-09',
		        name: '巨型萌宠大礼包',
		        number:'1000',
		        price:'赠送',
		       	reason:'￥0',
	          	detail: '网红零食小吃宵夜英雄小醋款2106g/15袋'
	        },
	        {
	        	id:"07",
		        date: '2019-10-09',
		        name: '猪肉铺',
		        number:'800',
		        price:'￥9.9',
		       	reason:'￥7920',
	          	detail: '麻辣零食风干熟食小吃肉脯特产肉干'
	        },
	        {
	        	id:"08",
		        date: '2019-10-08',
		        name: '坚果大礼包',
		        number:'1000',
		        price:'赠送',
		       	reason:'￥0',
	          	detail: '零食每日坚果干果混合送礼礼品盒1373g/7袋'
	        },
	        {
	        	id:"09",
		        date: '2019-10-05',
		        name: '开心果',
		        number:'800',
		        price:'￥41.9',
		       	reason:'￥33520',
	          	detail: '坚果炒货特产干果孕妇无漂白'
	        },
	        {
	        	id:"10",
		        date: '2019-10-04',
		        name: '开口松子',
		        number:'800',
		        price:'￥76.9',
		       	reason:'￥61520',
	          	detail: '东北特产坚果炒货干果手剥160g'
	        },
	        {
	        	id:"11",
		        date: '2019-10-02',
		        name: '鸭脖大礼包',
		        number:'1000',
		        price:'￥89',
		       	reason:'￥89000',
	          	detail: '量版休闲零食辣味鸭肉大礼包500g/袋'
	        },
	        {
	        	id:"12",
		        date: '2019-10-01',
		        name: '约辣别妆辣条',
		        number:'800',
		        price:'￥76.9',
		       	reason:'￥61520',
	          	detail: '麻辣零食面筋5毛钱校园大辣片刀肉'
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
		        name: '三只松鼠',
		        delivery: false,
		        type: [],
		       	reason:'',
		       	price:'￥',
		       	date: '',
	        },
	        edit: {
	        	number:'',
	        	id:'14',
		        name: '三只松鼠',
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
			 
	      },
	      //提交编辑
	      change: function (index) {
			this.tableData2.splice(index, 1)
	        this.editFormVisible = false;
	        this.editLoading= true;
			this.tableData2.unshift(this.edit);
			this.edit = {id: '', name: '', number:'', data: '',reason:''}
	      },
		} 

}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.checkTable{
    margin-top:40px;
    width: 100%;
    box-shadow: 5px 5px 5px #ccc;
}
.add .el-button:first-child{
		position: relative;
	}
	
	.search{
		position: absolute;
		margin-left: 70%;
		margin-top: -40px;
		
	}
	.search .el-input{
		width:200px;
	
		
	}
.navIncome{
    width: 100%;
    height: 30px;
    background-color: #fff;
    line-height: 60px;
    padding: 20px;
    box-shadow: 5px 5px 5px #ccc;
}

.moneyTest{
    width: 100%;
    height: 300px;
    margin-top: 30px;
    background-color: #fff;
    box-shadow: 5px 5px 5px #ccc;
}
.checkTitle{
    width: 500px;
    float: left;
    margin-left: 30px;
    margin-top: 50px;
}
.progro{
    width: 590px;
    height: 300px;
    float: left;
    margin-left: 25px;
}
.indexincome:hover{
	color: #a55218;
}

</style>