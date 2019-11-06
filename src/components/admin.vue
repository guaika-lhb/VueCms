<template>
  <section class="main">
    <el-container>
 <div class="navIncome">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>账号管理</el-breadcrumb-item>
  <el-breadcrumb-item >管理员账号</el-breadcrumb-item>
  <el-breadcrumb-item >普通管理员</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</el-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:70px;">
      <el-tab-pane label="普通管理员" name="first">

        <!--列表-->
        <template>
          <el-table :data="tabledata.slice((currentPage -1)*pagesize,currentPage*pagesize)" align="left">
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
            </el-table-column>

            <el-table-column
              prop="authority"
              label="菜单&权限">
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary"
                           style="background-color:#a55213;color:white;" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

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
              <el-input disabled v-model="editForm.addrole" auto-complete="off" style="width: 45%"></el-input>
            </el-form-item>
            <el-form-item  class="role">
            <p style="color: brown;opacity: 0.5;">角色权限只能超级管理员分配，不可修改</p>
            </el-form-item>

    
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
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
        activeName: 'first',
        currentPage: 1,
        pagesize: 2000,
        tabledata: [
          {accNum: 'admin', name: 'admin', addrole: '管理员', authority: "订单管理"},
          {accNum: '31', name: '客服主管', addrole: '122334445', authority: "订单管理"},
          {accNum: '3', name: '客服主管', addrole: '122334445', authority: "订单管理"},
          {accNum: '5', name: '客服主管', addrole: '122334445', authority: "订单管理"},
          {accNum: '6', name: '客服主管', addrole: '122334445', authority: "订单管理"},
          {accNum: '7', name: '客服主管', addrole: '122334445', authority: "订单管理"}
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
      handleClick(tab, event) {},

      //编辑
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

      //提交编辑
      editSubmit: function (index) {
        this.tabledata.push(this.editForm)
        this.editForm = {addrole: '', authority: ''}
        this.tabledata.splice(index, 1)
        this.editFormVisible = false;
      },


      //删除
      del() {
        this.$alert('删除权限只有超级管理员才拥有', {
          confirmButtonText: '确定',
        });
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

  *{
    margin: 0;
    padding: 0;
  }
  .main{
    border: 1px solid #ccc;
  }


  .role {
    margin-top: 20px;
  }
  .role-checkbox{
    width: 90px;
    background: #e6c993;
  }
  .role-checkbox-child{
    position: absolute;
    top: 0px;
    left: 120px;
  }
</style>
