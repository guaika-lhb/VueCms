<template>
  <section>
<el-container>
 <div class="navIncome">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>账号管理</el-breadcrumb-item>
  <el-breadcrumb-item >用户账号</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</el-container>
    <!--选项卡-->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:30px;">
      <el-tab-pane label="用户列表" name="first">

        <!--查看-->
        <template>
          <el-table
            :data="tabledata.slice((currentPage -1)*pagesize,currentPage*pagesize)"
            align="left"
            :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="id">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="姓名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="账号">
                    <span>{{ props.row.accountNumber }}</span>
                  </el-form-item>
                  <el-form-item label="账号级别">
                    <span>{{ props.row.accountLevel }}</span>
                  </el-form-item>
                  <el-form-item label="注册时间">
                    <template>
                    <span>{{ props.row.data }}</span>
              </template>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <!--表格-->
            <el-table-column
              label="ID"
              prop="id">
            </el-table-column>
            <el-table-column
              label="姓名"
              prop="name">
            </el-table-column>
            <el-table-column
              label="账号"
              prop="accountNumber">
            </el-table-column>
            <el-table-column
              label="账号级别"
              prop="accountLevel">
            </el-table-column>
            <el-table-column
              label="注册时间"
              prop="data"
              sortable>
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.data }}</span>
              </template>
            </el-table-column>
          </el-table>


        </template>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 15, 10]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.tabledata.length">
          </el-pagination>
        </div>

        <!--用户管理界面-->
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="second">

        <el-row>
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="info">
              <img src="../assets/img/kkk3.png" style="width: 70px" alt="">
              <el-form-item>
                <el-button type="primary" @click="addFormVisible = true" icon="el-icon-plus">新增</el-button>
              </el-form-item>

            <el-form-item style="margin-left: 63%">
                <el-input v-model="editForm.name" placeholder="请输入需要查询的用户姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" style="background-color:#a55213;color:white;" @click="getList">查询
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <!--添加-->
        <el-dialog title="添加用户信息" :visible.sync="addFormVisible">
          ID：{{info.id}}
          <el-input v-model="info.id" placeholder="请输入ID"></el-input>

          姓名：{{info.name}}
          <el-input v-model="info.name" placeholder="请输入姓名"></el-input>

          账号：{{info.accountNumber}}
          <el-input v-model="info.accountNumber" placeholder="请输入账号"></el-input>

          账号级别：{{info.accountLevel}}
          <el-select style='margin-top:10px;' v-model="info.accountLevel" placeholder="请选择账号级别">
            <el-option v-for="item in options" :key="item" :value="item"></el-option>
            <!-- 这里的key官方推荐在v-for时使用，不然会警告，但不影响使用 -->
          </el-select>
          <br />
          注册日期：{{info.data}}
            <el-date-picker style='margin-top:10px;' v-model="info.data" type="date" placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click.native="addSubmit">添加</el-button>
          </div>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="ID" prop="name">
              <el-input v-model="editForm.id" placeholder="请输入ID"></el-input>
            </el-form-item>

            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="账号" prop="accountNumber">
              <el-input v-model="editForm.accountNumber" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="账号级别">
              <el-select v-model="editForm.accountLevel" placeholder="请选择账号级别">
                <el-option v-for="item in options" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="修改日期">
              <el-date-picker v-model="editForm.data" type="date" placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">保存</el-button>
          </div>
        </el-dialog>

        <!--列表-->
        <template>
          <el-table :data="tabledata.slice((currentPage -1)*pagesize,currentPage*pagesize)" align="left" id="userTable">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="accountNumber" label="账号" ></el-table-column>
            <el-table-column prop="accountLevel" label="账号级别" ></el-table-column>
            <el-table-column label="日期">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.data }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="small"
                           @click="handleEdit(scope.$index, scope.row)"
                           style="background-color:#a55213;color:white;">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 15, 10]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.tabledata.length">
          </el-pagination>
        </div>

      </el-tab-pane>
    </el-tabs>


  </section>
</template>

<script>
  export default {
    name: 'Edit',
    data() {
      return {
        page:1,
        activeName: 'first',
        currentPage: 1,
        pagesize: 2000,
        addFormVisible: false,
        showFormVisible: false,
        options: [
          '会员', '普通用户'
        ],
        tabledata: [
          {id: 1, name: "张三", accountNumber: 8236543321, accountLevel: "会员", data: '2016-05-04'},
          {id: 2, name: "李四", accountNumber: 8245334545, accountLevel: "普通用户", data: '2016-05-25'},
          {id: 3, name: "zz", accountNumber: 5450422255, accountLevel: "会员", data: '2016-05-12'},
          {id: 4, name: "妞儿", accountNumber: 5424242442, accountLevel: "普通用户", data: '2016-05-13'},
          {id: 5, name: "王五", accountNumber: 5244242425, accountLevel: "会员", data: '2016-05-14'},
          {id: 6, name: "渣渣辉", accountNumber: 5424242242, accountLevel: "普通用户", data: '2016-05-15'},
          {id: 7, name: "张三", accountNumber: 5242427255, accountLevel: "普通用户", data: '2016-05-16'},
          {id: 8, name: "小米", accountNumber: 5465656598, accountLevel: "普通用户", data: '2016-05-17'},
          {id: 9, name: "小学阿红", accountNumber: 5564587854, accountLevel: "会员", data: '2016-05-18'}
        ],

        //初始化用户
        info: {
          id: "",
          name: "",
          accountNumber: "",
          accountLevel: '',
          data: ''
        },
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          accountNumber: '',
          accountLevel: '',
          data: '',
        },
        formLabelWidth: '120px'
      };
    },
    //添加在data(){...},的后面 显示添加后的数据
    methods: {
      handleClick(tab, event) {
      },
      //每页条数
      handleSizeChange(val) {
        this.pagesize = val;
      },
      //当前页数
      handleCurrentChange(val) {
        this.currentPage = val;
      },

      //添加
      addSubmit: function () {
        this.tabledata.push(this.info)  //给tabledata添加一个对象（之前我们创建的info）
        this.info = {id: '', name: '', accountNumber: '', accountLevel: '', data: ''}//点击创建后，让option还原，而不是停留在所选的项
        this.addFormVisible = false
      },

     //查询单个
      getList:function(){
          let para={
            page:this.page,
            name:this.editForm.name
          };
          console.log(para)
      },
      //编辑
      handleEdit: function (index, row) {
        this.tabledata.splice(index, 1)
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

      //提交编辑
      editSubmit: function () {
        this.tabledata.unshift(this.editForm)
        this.editForm = {id: '', name: '', accountNumber: '', accountLevel: '', data: ''}
        this.editFormVisible = false;
      },


      //删除
      del(index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
              type: 'success',
              message: '删除成功!',
            },
            this.tabledata.splice(index, 1)//删除点击的对象，index是lot-scope="a" a.$index传过来的
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      //查看
      handleshow: function (index, row) {
        this.showFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
    }
  }

</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  .el-head {
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    float: right;
  }

  .seek {
    width: 40%;
    margin-left: 130px;
    margin-top: -40px;
  }


  /*脚部分页*/
  .block {
    float: right;
  }
  .navIncome{
    width: 100%;
    height: 30px;
    background-color: #fff;
    line-height: 60px;
    padding
