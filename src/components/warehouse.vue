<template>
	<div>
<el-container>
 
 <div class="navIncome">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item >仓库管理</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
 </el-container>
		<el-tabs type="border-card" style="margin-top:30px">
			<el-tab-pane>
				<span slot="label"><i class="el-icon-box"></i>出库</span>
				<!--添加部分-->
				<el-row>
					<el-col :span='24'>
						<div class="first">
							<img src="../assets/lsy/kkk3.png" style="width:120px;height: auto">
							<el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
							<el-dialog title="出库信息" :visible.sync="dialogFormVisible">
							  	<el-form :model="out">
							    	<el-form-item label="商品编号" :label-width="formLabelWidth">
							      		<el-input v-model="out.id" ></el-input>
							   		</el-form-item>
							   		<el-form-item label="商品名称" :label-width="formLabelWidth">
							      		<el-input v-model="out.name" ></el-input>
							   		</el-form-item>
							   		<el-form-item label="出库数量" :label-width="formLabelWidth">
							      		<el-input-number v-model="out.number" 
							      			 @change="handleChange" :min="1" :max="10000" label="20">
							      		</el-input-number>
							   		</el-form-item>
							   		<el-form-item label="出库日期" :label-width="formLabelWidth">
							   			<el-date-picker
		      									v-model="out.date" type="date" placeholder="选择日期" 
		      									format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd">
		    							</el-date-picker>
							      		<!--<el-date-picker
										      v-model="value1" type="date" placeholder="选择日期">
										</el-date-picker>-->
							   		</el-form-item>
							   		<el-form-item label="出库价格" :label-width="formLabelWidth">
									    <el-input type="text" v-model="out.price"></el-input>
									</el-form-item>
							   		<el-form-item label="出库原因" :label-width="formLabelWidth">
									    <el-input type="textarea" v-model="out.reason"></el-input>
									</el-form-item>
								</el-form>
								<div slot="footer" class="dialog-footer">
								   	<el-button @click="dialogFormVisible = false">取 消</el-button>
								    <el-button style="background-color:#a55213;color:white;"  @click="create">确 定</el-button>
								</div>
							</el-dialog>

							<!--搜索部分-->
							<el-input style="width:200px;margin-left: 60%;" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
							<el-button style="background-color:#a55213;color:white;" icon="el-icon-search">搜索</el-button>
						</div>
					</el-col>
				</el-row>
				
			        <!--仓库盘点-->
				<el-table :data="tableData.slice((currentPage -1)*pagesize,currentPage*pagesize)" style="width: 100%">
					<el-table-column label="编号" width="200">
						<template slot-scope="scope">
							<template v-if="scope.row.editing">
							   	<el-input class="edit-input" v-model="scope.row.id"></el-input>
            				</template>
							<span v-else>{{scope.row.id}}</span>
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
					<el-table-column label="数量">
						<template slot-scope="scope">
							<template v-if="scope.row.editing">
							   	<el-input class="edit-input" v-model="scope.row.number"></el-input>
            				</template>
							<span v-else>{{scope.row.number}}</span>
						</template>
					</el-table-column>
					<el-table-column label="价格">
						<template slot-scope="scope">
							<template v-if="scope.row.editing">
							   	<el-input class="edit-input" v-model="scope.row.price"></el-input>
            				</template>
							<span v-else>{{scope.row.price}}</span>
						</template>
					</el-table-column>
				    <el-table-column label="出库日期">
				      	<template slot-scope="scope">
				        	<template v-if="scope.row.editing">
							   <el-input class="edit-input" v-model="scope.row.date"></el-input>
            				</template>
				        	<span v-else style="margin-left: 10px">{{ scope.row.date }}</span>
				      	</template>
				    </el-table-column>
				    <el-table-column label="出库原因">
						<template slot-scope="scope">
							<template v-if="scope.row.editing">
							   <el-input class="edit-input" v-model="scope.row.reason"></el-input>
            				</template>
							<span v-else>{{scope.row.reason}}</span>
						</template>
					</el-table-column>
				    <el-table-column label="操作" width="180">
				      <template slot-scope="scope">
				        <el-button size="mini" style="background-color:#a55213;color:white;"
				        	 v-if="!scope.row.editing"   v-model="scope.$index" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button size="mini" type="success"  @click="handleCancle(scope.$index, scope.row)"
				        	  v-else v-model="scope.$index">保存</el-button>
				        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
				        	删除</el-button>
				      </template>
				    </el-table-column>
		  		</el-table>
		  		<!--分页-->
		        <div class="block">
		            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
		              	:current-page="currentPage" :page-sizes="[8,6,4]" :page-size="pagesize"
		              	layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.length">
		            </el-pagination>
		        </div>
			</el-tab-pane>
			<el-tab-pane >
				<span slot="label"><i class="el-icon-sold-out"></i>入库</span>
				<!--添加部分-->
				<el-row>
					<el-col>
						<div class="first">
							<img src="../assets/lsy/kkk3.png" style="width:120px;height: auto">
							<el-button type="success" icon="el-icon-plus" @click="InFormVisible = true">添加</el-button>
							<el-dialog title="入库信息" :visible.sync="InFormVisible">
							  	<el-form :model="ins">
							    	<el-form-item label="商品编号" :label-width="formLabelWidth">
							      		<el-input v-model="ins.id" ></el-input>
							   		</el-form-item>
							   		<el-form-item label="商品名称" :label-width="formLabelWidth">
							      		<el-input v-model="ins.name" ></el-input>
							   		</el-form-item>
							   		<el-form-item label="入库数量" :label-width="formLabelWidth">
							      		<el-input-number v-model="ins.number" 
							      			 @change="handleChange" :min="1" :max="10000" label="20">
							      		</el-input-number>
							   		</el-form-item>
							   		<el-form-item label="入库日期" :label-width="formLabelWidth">
							   			<el-date-picker
		      									v-model="ins.date" type="date" placeholder="选择日期" 
		      									format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd">
		    							</el-date-picker>
							      		<!--<el-date-picker
										      v-model="value1" type="date" placeholder="选择日期">
										</el-date-picker>-->
							   		</el-form-item>
							   		<el-form-item label="入库价格" :label-width="formLabelWidth">
									    <el-input type="text" v-model="ins.price"></el-input>
									</el-form-item>
							   		<el-form-item label="入库原因" :label-width="formLabelWidth">
									    <el-input type="textarea" v-model="ins.reason"></el-input>
									</el-form-item>
								</el-form>
								<div slot="footer" class="dialog-footer">
								   	<el-button @click="InFormVisible = false">取 消</el-button>
								    <el-button style="background-color:#a55213;color:white;"  @click="create2">确 定</el-button>
								</div>
							</el-dialog>
							<!--搜索部分-->
							<el-input style="width:200px;margin-left:60%;" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
							<el-button  style="background-color:#a55213;color:white;" icon="el-icon-search">搜索</el-button>
						</div>
					</el-col>
				</el-row>
				
				<el-table :data="tableIn.slice((currentPage -1)*pagesize,currentPage*pagesize)" style="width: 100%">
					<el-table-column label="编号" width="150">
						<template slot-scope="scope">
							 <template v-if="scope.row.editing">
							 	<el-input class="edit-input" v-model="scope.row.id"></el-input>
            				</template>
							<span v-else>{{scope.row.id}}</span>
						</template>
					</el-table-column>
					<el-table-column label="商品名称" width="300">
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
					<el-table-column label="数量" width="200">
						<template slot-scope="scope">
							<template v-if="scope.row.editing">
							 	<el-input class="edit-input" v-model="scope.row.number"></el-input>
            				</template>
							<span v-else>{{scope.row.number}}</span>
						</template>
					</el-table-column>
					<el-table-column label="价格" width="200">
						<template slot-scope="scope">
							<template v-if="scope.row.editing">
							 	<el-input class="edit-input" v-model="scope.row.price"></el-input>
            				</template>
							<span v-else>{{scope.row.price}}</span>
						</template>
					</el-table-column>
				    <el-table-column label="出库日期" width="200">
				      <template slot-scope="scope">
				        <template v-if="scope.row.editing">
							 <el-input class="edit-input" v-model="scope.row.date"></el-input>
            			</template>
				        <span v-else style="margin-left: 10px">{{ scope.row.date }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column label="出库原因" >
						<template slot-scope="scope">
							<template v-if="scope.row.editing">
							 	<el-input class="edit-input" v-model="scope.row.reason"></el-input>
            				</template>
							<span v-else>{{scope.row.reason}}</span>
						</template>
					</el-table-column>
				    <el-table-column label="操作" width="250">
				      <template slot-scope="scope">
				        <el-button size="mini"  style="background-color:#a55213;color:white;" v-if="!scope.row.editing"
				        	 v-model="scope.$index" @click="handleEdit2(scope.$index, scope.row)">编辑</el-button>
	<el-button size="mini" type="success" v-if="!scope.row.editing" v-model="scope.$index" @click="handleCancle2(scope.$index, scope.row)" > 保存</el-button>
			<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
				        	删除</el-button>
				      </template>
				    </el-table-column>
		  		</el-table>
		  		<!--分页-->
		        <div class="block">
		            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
		              	:current-page="currentPage" :page-sizes="[6,4]" :page-size="pagesize"
		              	layout="total, sizes, prev, pager, next, jumper" :total="this.tableIn.length">
		            </el-pagination>
		        </div>
			</el-tab-pane>

		</el-tabs>

	</div>
</template>

<script>
	export default {
	  name: 'warehouse',
	     data() {
	      return {
//	      	出库表格里面的信息
	        tableData: [
	        {
	        	id:"s110",
	          	date: '2019-10-22',
	          	name: '水果干大礼包',
	          	number:'300',
	          	price:'￥39.9',
	          	reason:'邮寄给当地的三家代理商进行销售',
	          	detail: '零食蜜饯果干组合芒果干草莓干5袋装/468g',
	          	editing:false
	        }, 
	        {
	        	id:"s111",
		        date: '2019-10-22',
		        name: '零食大礼包',
		        number:'600',
		        price:'￥59.9',
		       	reason:'邮寄给青岛的代理商进行分别销售',
	          	detail: '网红爆款坚果休闲小吃散装食品一箱780g（含炭烧腰果）/共8袋',
	          	editing:false
	        }, 
	        {
	        	id:"s112",
		        date: '2019-10-22',
		        name: '每日坚果',
		        number:'100',
		        price:'￥149',
		       	reason:'邮寄给当日在网上购买的顾客',
	          	detail: '量版混合干果小包装零食大礼包750g/30天装',
	          	editing:false
	        }, 
	        {
	        	id:"s119",
		        date: '2019-10-22',
		        name: '牛肉风味大礼包',
		        number:'600',
		        price:'￥120.9',
		       	reason:'邮寄给青岛的代理商进行分别销售',
	          	detail: '牛板筋、牛肉粒，牛肚，牛肉片（100g）/共4袋',
	          	editing:false
	        }, 
	        {
	        	id:"s113",
		        date: '2019-10-22',
		        name: '每日坚果',
		        number:'60',
		        price:'￥149',
		       	reason:'寄给当日在网上购买的顾客',
	          	detail: '网红爆款坚果休闲小吃散装食品一箱780g（含炭烧腰果）/共8袋',
	          	editing:false
	        },
	        {
	        	id:"s114",
		        date: '2019-10-21',
		        name: '巨型萌宠大礼包',
		        number:'1000',
		        price:'赠送',
		       	reason:'公司50周年发放员工的礼品',
	          	detail: '网红零食小吃宵夜英雄小醋款2106g/15袋',
	          	editing:false
	        },
	        {
	        	id:"s115",
		        date: '2019-10-21',
		        name: '猪肉铺',
		        number:'800',
		        price:'￥9.9',
		       	reason:'邮寄给云南地区的代理商进行销售',
	          	detail: '麻辣零食风干熟食小吃肉脯特产肉干',
	          	editing:false
	        },
	        {
	        	id:"s116",
		        date: '2019-10-21',
		        name: '坚果大礼包',
		        number:'1000',
		        price:'赠送',
		       	reason:'公司50周年发放员工的礼品',
	          	detail: '零食每日坚果干果混合送礼礼品盒1373g/7袋',
	          	editing:false
	        },
	        {
	        	id:"s117",
		        date: '2019-10-21',
		        name: '开心果',
		        number:'800',
		        price:'￥41.9',
		       	reason:'邮寄给云南地区的代理商进行销售',
	          	detail: '坚果炒货特产干果孕妇无漂白',
	          	editing:false
	        },
	        {
	        	id:"s118",
		        date: '2019-10-21',
		        name: '开口松子',
		        number:'800',
		        price:'￥76.9',
		       	reason:'邮寄给云南地区的代理商进行销售',
	          	detail: '东北特产坚果炒货干果手剥160g',
	          	editing:false
	        },
	        {
	        	id:"s120",
		        date: '2019-10-21',
		        name: '鸭脖大礼包',
		        number:'1000',
		        price:'￥89',
		       	reason:'邮寄给上海地区的代理商进行销售',
	          	detail: '量版休闲零食辣味鸭肉大礼包500g/袋',
	          	editing:false
	        },
	        {
	        	id:"s121",
		        date: '2019-10-21',
		        name: '约辣别妆辣条',
		        number:'800',
		        price:'￥76.9',
		       	reason:'邮寄给上海地区的代理商进行销售',
	          	detail: '麻辣零食面筋5毛钱校园大辣片刀肉',
	          	editing:false
	        },
	        

	        ],
	        // 分页
		    currentPage: 1,
		    pagesize: 8,
		    activeName: 'first',
		    //增加模态框
		    dialogTableVisible: false,
        	dialogFormVisible: false,
        	input:'',
        	prevValue:{
        		id:''
        	},
	        out: {
	        	number:'',
	        	id:'s11',
		        name: '三只松鼠',
		        delivery: false,
		        type: [],
		       	reason:'',
		       	price:'￥',
		       	date: '',
	        },
	        
//	        入库信息
			tableIn :[
			{
				id:"ls112",
		        date: '2019-10-21',
		        name: '开口松子',
		        number:'2000',
		        price:'￥50',
		       	reason:'商品进货',
	          	detail: '东北特产坚果炒货干果手剥160g',
	          	editing:true
			},
			{
	        	id:"ls120",
		        date: '2019-10-21',
		        name: '鸭脖大礼包',
		        number:'2500',
		        price:'￥60',
		       	reason:'商品进货',
	          	detail: '量版休闲零食辣味鸭肉大礼包500g/袋'
	        },
	         {
	        	id:"ls121",
		        date: '2019-10-21',
		        name: '开心果',
		        number:'2000',
		        price:'￥30',
		       	reason:'商品进货',
	          	detail: '坚果炒货特产干果孕妇无漂白'
	        },
	        {
	        	id:"ls122",
		        date: '2019-10-21',
		        name: '牛肉风味大礼包',
		        number:'40',
		        price:'0',
		       	reason:'包装漏气（顾客退货）',
	          	detail: '牛板筋、牛肉粒，牛肚，牛肉片（100g）/共4袋'
	        }, 
	        {
	        	id:"s110",
	          	date: '2019-10-20',
	          	name: '水果干大礼包',
	          	number:'300',
	          	price:'0',
	          	reason:'其他原因（顾客退货）',
	          	detail: '零食蜜饯果干组合芒果干草莓干5袋装/468g'
	        }, 
	        {
	        	id:"s111",
		        date: '2019-10-21',
		        name: '零食大礼包',
		        number:'1500',
		        price:'￥30',
		       	reason:'商家进货',
	          	detail: '网红爆款坚果休闲小吃散装食品一箱780g（含炭烧腰果）/共8袋'
	        }, 
	        {
	        	id:"s112",
		        date: '2019-10-21',
		        name: '每日坚果',
		        number:'200',
		        price:'￥129',
		       	reason:'商家进货',
	          	detail: '量版混合干果小包装零食大礼包750g/30天装'
	        },
	         {
	        	id:"s114",
		        date: '2019-10-20',
		        name: '萌宠大礼包',
		        number:'1800',
		        price:'￥136.9',
		       	reason:'公司50周年发放员工的礼品',
	          	detail: '网红零食小吃宵夜英雄小醋款2106g/15袋'
	        },
			],
			ins: {
	        	number:'',
	        	id:'ls110',
		        name: '三只松鼠',
		        delivery: false,
		        type: [],
		       	reason:'',
		       	price:'￥',
		       	date: '',
	        },
	        InFormVisible: false,
	       
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
		      this.tableData.splice(item, 1)
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
		      this.tableData.push(this.out)// 给tabledata添加一个对象（之前我们创建的info）
		       // 点击创建后，让option还原，而不是停留在所选的项
		      this.out = {id: '', name: '', number: '',price:'',data:'' }
		      this.dialogFormVisible=false;
		     
		    },
//			//改变数字部分
			handleChange(value) {
	        	console.log(value);
	 		 },
		      handleEdit (index, row) { // 编辑
			    row.editing = true
			    this.prevValue = JSON.parse(JSON.stringify(row))
			      },
		      handleCancle (index, row) { // 取消
		        row.editing = false
		        let prevContent = this.prevValue.tableData.id
		        this.$set(row, 'id', prevContent)
		      },
	      
//	      入库部分
//		添加
		create2() {
			this.tableIn.push(this.ins)// 给tabledata添加一个对象（之前我们创建的info）
			// 点击创建后，让option还原，而不是停留在所选的项
			this.ins = {id: '', name: '', number: '',price:'',data:'' }
			this.InFormVisible=false;
		},
//		修改	     
		handleEdit2 (index, row) { // 编辑
				row.editing = true
				this.prevValue = JSON.parse(JSON.stringify(row))
			},
		handleCancle2 (index, row) { // 取消
		    row.editing = false
		    let prevContent = this.prevValue.tableIn.id
		    his.$set(row, 'id', prevContent)
		  },
	   
	}
  }
</script>

<style>
.navIncome{
    width: 100%;
    height: 30px;
    background-color: #fff;
    line-height: 60px;
    padding: 20px;
    box-shadow: 5px 5px 5px #ccc;
}
</style>