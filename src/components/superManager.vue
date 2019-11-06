<template>
  <section class="main">
    <el-container>
 <div class="navIncome">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>账号管理</el-breadcrumb-item>
  <el-breadcrumb-item >管理员账号</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/superadmin' }">超级管理员</el-breadcrumb-item>
  <el-breadcrumb-item >权限设置</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</el-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:30px;">
      <el-tab-pane label="超级管理员" name="first">
        <el-row>
          <el-col class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="editForm">
              <el-form-item>
                <img src="../assets/img/kkk3.png" style="width: 70px" alt="">
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
        <!--超级管理员-->
        <template>
          <el-table
            :data="supadmin"
            style="width: 100%">
            <el-table-column
              prop="accNum"
              label="账号"
              width="200">
            </el-table-column>

            <el-table-column
              prop="name"
              label="用户名">
            </el-table-column>

            <el-table-column
              prop="addrole"
              label="角色">
              <el-tag type="success">超级管理员</el-tag>
            </el-table-column>

            <el-table-column
              prop="authority"
              label="菜单权限">
            </el-table-column>
            <el-table-column label="操作" width="180">
            </el-table-column>
          </el-table>
        </template>


        <!--列表-->
        <template>
          <el-table :data="tabledata.slice((currentPage -1)*pagesize,currentPage*pagesize)" align="left">
            <el-table-column
              prop="accNum"
              label="普通管理员权限分配"
              width="200">
            </el-table-column>

            <el-table-column
              prop="name"
              label="">
            </el-table-column>

            <el-table-column
              type="success"
              prop="addrole"
              label="">
            </el-table-column>

            <el-table-column
              prop="authority"
              label="">
            </el-table-column>
            <el-table-column label="" width="180">
              <template slot-scope="scope">
                <el-button type="primary" style="background-color:#a55213;color:white;"
                           size="small" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <!--添加-->
        <el-dialog title="添加管理员" :visible.sync="addFormVisible">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="账号" prop="accNum">
              <el-input v-model="info.accNum" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item label="用户名" prop="accNum">
              <el-input v-model="info.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="accNum">
              <el-select v-model="info.addrole" placeholder="角色分配">
                <el-option v-for="item in roles" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="菜单权限" prop="accNum">
              <el-select v-model="info.authority" placeholder="请选择账号级别">
                <el-option v-for="item in options" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible=false">取 消</el-button>
            <el-button type="primary" @click.native="addSubmit" style="background-color:#a55213;color:white;">添加</el-button>
          </div>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="账号" prop="accNum">
              <el-input v-model="editForm.accNum" placeholder="账号"></el-input>
            </el-form-item>

            <el-form-item label="用户名" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="角色名称" prop="addrole" class="role">
              <el-input v-model="editForm.addrole" auto-complete="off" style="width: 45%"></el-input>
            </el-form-item>

            <el-form-item label="菜单权限" class="role">
             
              <el-row>
                <el-form-item label="角色权限" class="role-checkbox">
                </el-form-item>
                <el-checkbox-group class="role-checkbox-child" v-model="checkedCities"
                                   @change="handleCheckedCitiesChange" style="float:left">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </el-row>

              <el-row>
                <el-form-item label="用户权限" class="role-checkbox">
                </el-form-item>
                <el-checkbox-group class="role-checkbox-child" v-model="checkedCities"
                                   @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </el-row>

              <el-row>
                <el-form-item label="订单权限" class="role-checkbox">
                </el-form-item>
                <el-checkbox-group class="role-checkbox-child" v-model="checkedCities"
                                   @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </el-row>

            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="cancel">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" style="background-color:#a55213;color:white;">保存</el-button>
          </div>
        </el-dialog>
        <!-- 分页 -->
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
  const cityOptions = ['列表', '新增', '修改'];
  export default {
    name: 'SuperManager',
    data() {
      return {
        page:1,
        activeName: 'first',
        currentPage: 1,
        pagesize: 2000,
        addFormVisible: false,
        roles: ['管理员',  '只能看整体效果报表'],
        options: ['客服主管', '订单主管', '商品主管'],
        supadmin: [
          {accNum: 'admin', name: '松鼠一号', addrole: '超级管理员', authority: "全部"}
        ],

        tabledata: [
          {accNum: '31', name: '松鼠二号', addrole: '管理员', authority: "客服主管"},
          {accNum: '3', name: '松鼠三号', addrole: '管理员', authority: "商品主管"},
          {accNum: '5', name: '松鼠四号', addrole: '管理员', authority: "订单主管"},
          {accNum: '6', name: '松鼠五号', addrole: '管理员', authority: "订单主管"},
          {accNum: '7', name: '松鼠六号', addrole: '只能看整体效果报表', authority: "游客"}
        ],

        //初始化用户
        info: {
          accNum: '',
          name: '',
          addrole: '',
          authority: ''
        },

        editFormVisible: false,//编辑界面是否显示
        editFormRules: {
          addrole: [
            {required: true, message: '角色权限', trigger: 'blur'}
          ],
          authority: [
            {required: true, message: '', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: {
          accNum: '',
          name: '',
          addrole: '',
          authority: ''
        },
        formLabelWidth: '120px',
        //多选
        checkedCities: ['列表'],
        cities: cityOptions,
        isIndeterminate: true,
      };

    },

    methods: {
      //每页条数
      handleSizeChange(val) {
        this.pagesize = val;
      },
      //当前页数
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      //多选
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },


      //标签页
      handleClick(tab, event) {
      },

      //添加
      addSubmit: function () {
        this.tabledata.push(this.info)  //给tabledata添加一个对象（之前我们创建的info）
        this.info = {accNum: '', name: '', addrole: '', authority: ''}//点击创建后，让option还原，而不是停留在所选的项
        this.addFormVisible = false
      },

      getList:function(){
          let para={
            page:this.page,
            name:this.editForm.name
          };
          console.log(para)
      },

      //编辑
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        this.tabledata.splice(index, 1)
      },

      //提交编辑
      editSubmit() {
        this.tabledata.unshift(this.editForm)
        this.editForm = {addrole: '', authority: ''}
        this.editFormVisible = false;
      },

      cancel: function () {
        this.editFormVisible = false
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

    }
  }

</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }



  .main {
    border: 1px solid #ccc;
  }

  .toolbar {
    float: right;
  }

  .role {
    margin-top: 20px;
  }

  .role-checkbox {
    width: 90px;
    background: #e6c993;
    margin-top: 10px;
  }

  .role-checkbox-child {
    position: absolute;
    top: 10px;
    left: 120px;
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
