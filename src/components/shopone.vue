<template>
<div>
  <el-container>
 
 <div class="navIncome">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item >商品列表</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
 

</el-container>
      <el-tabs   type="border-card" style="margin-top:30px;">
        <el-tab-pane label="全部商品">
        	<!--增加搜索部分-->
        	<el-row>
        		<el-col :span="24">
        			<div class="first">
        			 	<!--增加商品部分-->
        			 	<img src="../assets/lsy/kkk3.png" style="width:120px;height: auto">
        				<el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">添加商品</el-button>
			          <el-dialog title="增加商品" :visible.sync="dialogFormVisible" style="margin: 10px">
				        		<el-form :model="form">
									    <el-form-item label="商品编号" :label-width="formLabelWidth">
									      	<el-input v-model="form.id" ></el-input>
									   	</el-form-item>
									   	<el-form-item label="商品名称" :label-width="formLabelWidth">
									      	<el-input v-model="form.name" ></el-input>
									   	</el-form-item>
									   	<el-form-item label="商品数量" :label-width="formLabelWidth">
											  	<el-input-number v-model="form.number" 
								      			@change="handleChange" :min="1" :max="10000" label="20">
								      		</el-input-number>
											</el-form-item>
									   	<el-form-item label="库存状态" :label-width="formLabelWidth">
									   			<el-select v-model="form.sta" placeholder="请选择库存状态">
			                				<el-option v-for="item in options" :key="item" :value="item"></el-option>
			              		</el-select>
											</el-form-item>
										</el-form>
										<div slot="footer" class="dialog-footer">
			                <el-button type="primary" plain size="medium" @click="dialogFormVisible = false">取 消</el-button>
			                <el-button type="success" plain size="medium" @click="create">添加</el-button>
			             </div>
			          </el-dialog>	
			          <!--查找商品信息-->
			       		<el-input style="width:200px;margin-left: 60%;" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
								<el-button style="background-color:#a55213;color: white;" icon="el-icon-search">搜索</el-button>
			       </div>
        	</el-col>
        </el-row>
        	
         
          <!--修改商品部分-->
          <div class="changes">
	            <el-dialog title="修改商品信息" :visible.sync="editFormVisible" >
	            	<el-form :model="shop">
						    	<el-form-item label="商品编号" :label-width="formLabelWidth">
						      		<el-input v-model="shop.id" ></el-input>
						   		</el-form-item>
						   		<el-form-item label="商品名称" :label-width="formLabelWidth">
						      		<el-input v-model="shop.name" ></el-input>
						   		</el-form-item>
						   		
						   		</el-form-item>
						   		<el-form-item label="商品数量" :label-width="formLabelWidth">
								    <el-input type="text" v-model="shop.number"></el-input>
									</el-form-item>
						   		<el-form-item label="库存状态" :label-width="formLabelWidth">
								    <el-input type="text" v-model="shop.sta"></el-input>
									</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
							   	<el-button type="primary" @click="editFormVisible = false">取 消</el-button>
							    <el-button type="success" @click="change">保存</el-button>
							</div>
						</el-dialog>
          </div>
          <!--里面信息表格-->
          <el-table
            :data="tableData.slice((currentPage -1)*pagesize,currentPage*pagesize)"
            style="width: 100%">
            <el-table-column prop="id" label="id" width="200"></el-table-column>
            <el-table-column label="图片" width="300" prop="url">
              <template slot-scope="scope">
                <el-popover placement="right" title="" trigger="hover">
                  <img :src="scope.row.url" width="200" height="200" >
                  <img slot="reference" :src="scope.row.url" :alt="scope.row.url" style="max-height:80px;max-width:80px">
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名字" ></el-table-column>
            <el-table-column prop="number" label="数量" width="200"></el-table-column>
            <el-table-column prop="sta" label="库存状态" width="200"></el-table-column>
            <el-table-column prop="make" label="操作" width="300">
              <template slot-scope="scope">
              	<!--编辑按钮-->
                <el-button  icon="el-icon-edit" size="small" circle
                           @click="handleEdit(scope.$index, scope.row)"
                            style="background-color:#a55213;color: white;margin-left: 16px;"></el-button>
                <!--删除按钮-->
                <el-button type="danger" icon="el-icon-delete" size="small" circle @click="deleve(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[4,2]" :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.length">
            </el-pagination>
          </div>
        </el-tab-pane>
        <!--下架商品-->
        <el-tab-pane label="下架商品">
        	<el-row>
        		<el-col>
        			<div class="first">
        					<!--添加-->
        					<img src="../assets/lsy/kkk3.png" style="width:120px;height: auto">
			            <el-button   type="success" icon="el-icon-plus" @click="addsFormVisible = true">添加商品</el-button>
			            <el-dialog title="添加下架商品" :visible.sync="addsFormVisible" style="margin: 10px">
				            	<el-form :model="adds">
									    	<el-form-item label="商品编号" :label-width="formLabelWidth">
									      		<el-input v-model="adds.id" ></el-input>
									   		</el-form-item>
									   		<el-form-item label="商品名称" :label-width="formLabelWidth">
									      		<el-input v-model="adds.name" ></el-input>
									   		</el-form-item>
									   		<el-form-item label="商品数量" :label-width="formLabelWidth">
											    <el-input-number v-model="adds.number" 
								      			 @change="handleChange" :min="1" :max="10000" label="20">
								      		</el-input-number>
												</el-form-item>
												<el-form-item label="库存状态" :label-width="formLabelWidth">
									   			<el-select v-model="adds.sta" placeholder="请选择库存状态">
			                				<el-option v-for="item in options" :key="item" :value="item"></el-option>
			              		</el-select>
												</el-form-item>
										</el-form>
										<div slot="footer" class="dialog-footer">
			                <el-button type="primary" plain size="medium" @click="addsFormVisible = false">取 消</el-button>
			                <el-button type="success" plain size="medium" @click="create2">添加</el-button>
			             </div>
			            </el-dialog>
			            <!--查找商品信息-->
			            <el-input style="width:200px;margin-left: 60%;" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
									<el-button style="background-color:#a55213;color: white;" icon="el-icon-search">搜索</el-button>
        			</div>
        	</el-col>
        </el-row>
        	<!--修改商品部分-->
        <div class="changes">
	        <el-dialog title="修改商品信息" :visible.sync="lllFormVisible" >
	          <el-form :model="lll">
						  <el-form-item label="商品编号" :label-width="formLabelWidth">
						    <el-input v-model="lll.id" ></el-input>
						  </el-form-item>
						  <el-form-item label="商品名称" :label-width="formLabelWidth">
						    <el-input v-model="lll.name" ></el-input>
						  </el-form-item>
						  <el-form-item label="商品数量" :label-width="formLabelWidth">
								  <el-input type="text" v-model="lll.number"></el-input>
							</el-form-item>
						  <el-form-item label="库存状态" :label-width="formLabelWidth">
									<el-input type="text" v-model="lll.sta"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							  <el-button type="primary" @click="lllFormVisible = false">取 消</el-button>
							  <el-button type="success" @click="change2">保存</el-button>
						</div>
					</el-dialog>
        </div>
				<el-table
            :data="tableNone.slice((currentPage -1)*pagesize,currentPage*pagesize)"
            style="width: 100%">
          	<el-table-column prop="id" label="id" width="200"></el-table-column>
            <el-table-column label="图片" width="300" prop="url">
              <template slot-scope="scope">
                <el-popover placement="right" title="" trigger="hover">
                  <img :src="scope.row.url" width="200" height="200" >
                  <img slot="reference" :src="scope.row.url" :alt="scope.row.url" style="max-height:80px;max-width:80px">
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名字"></el-table-column>
            <el-table-column prop="number" label="数量" width="200"></el-table-column>
            <el-table-column prop="sta" label="库存状态" width="200"></el-table-column>
            <el-table-column prop="make" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="small" circle
                           @click="handleEdit2(scope.$index, scope.row)"  
                           style="background-color:#a55213;color: white;margin-left: 16px;"></el-button>
                <!--删除按钮-->
                <el-button type="danger" icon="el-icon-delete" size="small" 
                	circle @click="deleve(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[4,2]" :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper" :total="this.tableNone.length">
          </el-pagination>
        </div>
      </el-tab-pane>
        <!--紧缺商品-->
        <el-tab-pane label="紧缺商品">
        		<el-row>
        			<el-col>
        				<!--添加-->
				        	<div class="first">
				        		<img src="../assets/lsy/kkk3.png" style="width:120px;height: auto">
				            <el-button type="success" icon="el-icon-plus" @click="addssFormVisible = true">添加商品</el-button>
				            <el-dialog title="添加下架商品" :visible.sync="addssFormVisible" style="margin: 10px">
					            	<el-form :model="addss">
										    	<el-form-item label="商品编号" :label-width="formLabelWidth">
										      		<el-input v-model="addss.id" ></el-input>
										   		</el-form-item>
										   		<el-form-item label="商品名称" :label-width="formLabelWidth">
										      		<el-input v-model="addss.name" ></el-input>
										   		</el-form-item>
										   		<el-form-item label="商品数量" :label-width="formLabelWidth">
												    <el-input-number v-model="addss.number" 
									      			 @change="handleChange" :min="1" :max="10000" label="20">
									      		</el-input-number>
													</el-form-item>
													<el-form-item label="库存状态" :label-width="formLabelWidth">
										   			<el-select v-model="addss.sta" placeholder="请选择库存状态">
				                				<el-option v-for="item in options" :key="item" :value="item"></el-option>
				              		</el-select>
													</el-form-item>
											</el-form>
											<div slot="footer" class="dialog-footer">
				                <el-button type="primary" plain size="medium" @click="addssFormVisible = false">取 消</el-button>
				                <el-button type="success" plain size="medium" @click="create3">添加</el-button>
				             </div>
				            </el-dialog>
				            	<!--搜索-->
				            <el-input style="width:200px;margin-left: 60%;" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
										<el-button style="background-color:#a55213;color: white;" icon="el-icon-search">搜索</el-button>
				         </div>
        			</el-col>
        		</el-row>
        	
        	<!--/修改-->
        	<div class="changess">
	            <el-dialog title="修改商品信息" :visible.sync="pppFormVisible" >
	            	<el-form :model="ppp">
						    	<el-form-item label="商品编号" :label-width="formLabelWidth">
						      		<el-input v-model="ppp.id" ></el-input>
						   		</el-form-item>
						   		<el-form-item label="商品名称" :label-width="formLabelWidth">
						      		<el-input v-model="ppp.name" ></el-input>
						   		</el-form-item>
						   		<el-form-item label="商品数量" :label-width="formLabelWidth">
								    <el-input type="text" v-model="ppp.number"></el-input>
									</el-form-item>
						   		<el-form-item label="库存状态" :label-width="formLabelWidth">
								    <el-input type="text" v-model="ppp.sta"></el-input>
									</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
							   	<el-button type="primary" @click="pppFormVisible = false">取 消</el-button>
							    <el-button type="success" @click="change3">保存</el-button>
							</div>
						</el-dialog>
          </div>
        	<el-table
            :data="tableLess.slice((currentPage -1)*pagesize,currentPage*pagesize)"
            style="width: 100%">
            <el-table-column prop="id" label="id" width="200"></el-table-column>
            <el-table-column label="图片" width="300" prop="url">
              <template slot-scope="scope">
                <el-popover placement="right" title="" trigger="hover">
                  <img :src="scope.row.url" width="200" height="200" >
                  <img slot="reference" :src="scope.row.url" :alt="scope.row.url" style="max-height:80px;max-width:80px">
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名字" ></el-table-column>
            <el-table-column prop="number" label="数量" width="200"></el-table-column>
            <el-table-column prop="sta" label="库存状态" width="200"></el-table-column>
            <el-table-column prop="make" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="small" circle
                           @click="handleEdit3(scope.$index, scope.row)"
                            style="background-color:#a55213;color: white;margin-left: 16px;"></el-button>
                <!--删除按钮-->
                <el-button type="danger" icon="el-icon-delete" size="small" circle @click="deleve(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[4,2]" :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper" :total="this.tableLess.length">
            </el-pagination>
          </div>
        	
        </el-tab-pane>
      </el-tabs>
      </div>
</template>

<script>
export default {
  name: 'Shopone',
  data () {
    return {
      // 全部商品数据
      tableData: [
        {
          id: 's110',
          name: '三只松鼠—芒果116g',
          number: '30',
          sta: '紧缺',
          url: '@/assets/lsy/lsy1.png'
        },
        {
          id: 's111',
          img: '@/assets/lsy/lsy2.jpg',
          name: '三只松鼠—水果干大礼包（芒果干草莓干）',
          sta: '下架',
          number: '0'
        }, {
          id: 's112',
          img: '@/assets/lsy/lsy3.jpg',
          name: '三只松鼠-每日坚果750g/30天装（量版混合干果零食大礼包）',
          sta: '充足',
          number: '45'
        },
        {
          id: 's113',
          img: '@/assets/lsy/lsy4.jpg',
          name: '三只松鼠—巨型零食大礼包3416g/30包（网红抖音小吃零食整箱）',
          sta: '充足',
          number: '70'
        },
        {
          id: 's114',
          img: '@/assets/lsy/lsy10.jpg',
          name: '三只松鼠—卤味大礼包（鸭脖鸭舌熟食卤味鸭肉休闲零食整箱）',
          sta: '下架',
          number: '0'
        },
        {
          id: 's115',
          img: '@/assets/lsy/lsy11.jpg',
          name: '三只松鼠—蜀香牛肉100g（休闲零食小吃肉脯特产牛肉干美食）',
          sta: '充足',
          number: '110'
        },
        {
          id: 's116',
          img: '@/assets/lsy/lsy5.jpg',
          name: '三只松鼠—草本味纸皮核桃1250g（量版新疆特产薄皮整箱坚果）',
          sta: '紧缺',
          number: '20'
        },
        {
          id: 's117',
          img: '@/assets/lsy/lsy6.jpg',
          name: '三只松鼠-手剥巴旦木185g*2(休闲零食坚果炒货扁桃仁杏仁)',
          sta: '下架',
          number: '0'
        },
        {
          id: 's118',
          img: '@/assets/lsy/lsy7.jpg',
          name: '三只松鼠—每日枣夹核桃仁750g/箱（量版特产红枣干果零食）',
          sta: '充足',
          number: '41'
        },
        {
          id: 's119',
          img: '@/assets/lsy/lsy8.jpg',
          name: '三只松鼠—坚果总动员大礼包3袋（休闲零食特产坚果干果散装一箱）',
          sta: '紧缺',
          number: '6'
        },
        {
          id: 's120',
          img: '@/assets/lsy/lsy9.jpg',
          name: '三只松鼠—牛板筋/牛肉粒/牛肚/牛肉片（风味牛肉干休闲零食）',
          sta: '缺货',
          number: '3'
        }],
         // 分页
      currentPage: 1,
      pagesize:4,
      activeName: 'first',
      input:'',
//      添加数据参数
      dialogTableVisible: false,
      dialogFormVisible: false,
      editFormVisible:false,
      shop: {
        id: ' ',
        name: '',
        role:'0',
        number: '',
        sta: ''
      },
      form:{
      	id: ' ',
        name: '',
        number: '20',
        sta: ''
      },
      
      options: [
        '紧缺', '充足', '缺货','下架'
      ],
      formLabelWidth:"120px",
//    下架数据
			tableNone:[
				{
          id: 's111',
          img: '@/assets/lsy/lsy2.jpg',
          name: '三只松鼠—水果干大礼包（芒果干草莓干）',
          sta: '下架',
          number: '0袋'
        }, 
        {
          id: 's114',
          img: '@/assets/lsy/lsy10.jpg',
          name: '三只松鼠—卤味大礼包（鸭脖鸭舌熟食卤味鸭肉休闲零食整箱）',
          sta: '下架',
          number: '0袋'
        },
        {
          id: 's115',
          img: '@/assets/lsy/lsy6.jpg',
          name: '三只松鼠-手剥巴旦木185g*2(休闲零食坚果炒货扁桃仁杏仁)',
          sta: '下架',
          number: '0袋'
        }
         
			],
//			第二部分
			addsFormVisible:false,
			lllFormVisible:false,
//			第三部分
			addssFormVisible:false,
			pppFormVisible:false,
			
//			紧缺商品
			tableLess:[
				{
          id: 's119',
          img: '@/assets/lsy/lsy8.jpg',
          name: '三只松鼠—坚果总动员大礼包3袋（休闲零食特产坚果干果散装一箱）',
          sta: '紧缺',
          number: '6袋'
        },
        {
          id: 's120',
          img: '@/assets/lsy/lsy9.jpg',
          name: '三只松鼠—牛板筋/牛肉粒/牛肚/牛肉片（风味牛肉干休闲零食）',
          sta: '缺货',
          number: '3袋'
        },
			],
			adds:{
      	id: ' ',
        name: '',
        number: '20',
        sta: ''
      },
      lll:{
      	id: ' ',
        name: '',
        number: '20',
        sta: ''
      },
      addss:{
      	id: ' ',
        name: '',
        number: '20',
        sta: ''
      },
       ppp:{
      	id: ' ',
        name: '',
        number: '20',
        sta: ''
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
//  全部数据
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
    // 删除按钮
    deleve (item) {
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
    // 弹出框关闭
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
//  第一部分
		//  增加部分函数
    create () {
      this.tableData.push(this.form)// 给tabledata添加一个对象（之前我们创建的info）
      this.form = {id: '', name: '', number: '', accountStatus: ''}// 点击创建后，让option还原，而不是停留在所选的项
     	this.dialogFormVisible = false
    },
		//  删除增加的部分
    del (index) {
      this.tableData.splice(index, 1)// 删除点击的对象，index是lot-scope="a" a.$index传过来的
    },
		//  编辑部分
    handleEdit (index, row) {
         this.editFormVisible = true; 
        this.shop= Object.assign({}, row);
         this.tableData.splice(index, 1)
     },
      //提交编辑
    change(index) {
        this.tableData.unshift(this.shop)
        this.shop = {id: '', name: '', number: "", sta: ""}
        this.editFormVisible = false;
        this.editLoading= true
      },
      //改变数字部分
		handleChange(value) {
	       console.log(value);
	    },
			
//			第二部分
//  增加部分函数
    create2 () {
      this.tableNone.push(this.adds)// 给tabledata添加一个对象（之前我们创建的info）
      this.adds = {id: '', name: '', number: ''}// 点击创建后，让option还原，而不是停留在所选的项
     	this.addsFormVisible = false
    },
		//  编辑部分
     handleEdit2 (index, row) {
        this.lllFormVisible = true; 
        this.lll= Object.assign({}, row);
          this.tableNone.splice(index, 1)
     },
      //提交编辑
    change2(index) {
        this.tableNone.push(this.lll)
        this.lll = {id: '', name: '', number: "", sta: ""}
      
        this.lllFormVisible = false;
        this.editLoading= true
      },
		//  第三部分
		create3 () {
      this.tableLess.push(this.addss)// 给tabledata添加一个对象（之前我们创建的info）
      this.addss = {id: '', name: '', number: ''}// 点击创建后，让option还原，而不是停留在所选的项
     	this.addssFormVisible = false
    },
    //  编辑部分
     handleEdit3 (index, row) {
        this.pppFormVisible = true; 
        this.ppp= Object.assign({}, row);
     },
      //提交编辑
    change3(index) {
        this.tableLess.push(this.ppp)
        this.lll = {id: '', name: '', number: "", sta: ""}
        this.tableLess.splice(index, 1)
        this.pppFormVisible = false;
        this.editLoading= true
      },
  },
  // 图片路径转化
  mounted: function () {
    const url1 = require('@/assets/lsy/lsy1.png')
    this.tableData[0].url = url1
    const url2 = require('@/assets/lsy/lsy2.jpg')
    this.tableData[1].url = url2
    const url3 = require('@/assets/lsy/lsy3.jpg')
    this.tableData[2].url = url3
    const url4 = require('@/assets/lsy/lsy4.jpg')
    this.tableData[3].url = url4
    const url10 = require('@/assets/lsy/lsy10.jpg')
    this.tableData[4].url = url10
    const url11 = require('@/assets/lsy/lsy11.jpg')
    this.tableData[5].url = url11
    
    const url5 = require('@/assets/lsy/lsy5.jpg')
    this.tableData[6].url = url5
    const url6 = require('@/assets/lsy/lsy6.jpg')
    this.tableData[7].url = url6
    const url7 = require('@/assets/lsy/lsy7.jpg')
    this.tableData[8].url = url7
    const url8 = require('@/assets/lsy/lsy8.jpg')
    this.tableData[9].url = url8
    const url9 = require('@/assets/lsy/lsy9.jpg')
    this.tableData[10].url = url9
//  下架商品
    const url21 = require('@/assets/lsy/lsy2.jpg')
    this.tableNone[0].url = url21
    const url22 = require('@/assets/lsy/lsy6.jpg')
    this.tableNone[2].url = url22
    const url23 = require('@/assets/lsy/lsy10.jpg')
    this.tableNone[1].url = url23

//  紧缺商品
   	const url31 = require('@/assets/lsy/lsy8.jpg')
    this.tableLess[0].url = url31
    const url32 = require('@/assets/lsy/lsy9.jpg')
    this.tableLess[1].url = url32
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
.navIncome{
    width: 100%;
    height: 30px;
    background-color: #fff;
    line-height: 60px;
    padding: 20px;
    box-shadow: 5px 5px 5px #ccc;
}
</style>
