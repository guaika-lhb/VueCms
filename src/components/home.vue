<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <el-container class="topNav">
            <el-header>
              <img src="../assets/img/logo.png" id="logo" />
              <div class="topRightIcon">
                <span>
                  <el-badge is-dot style="position:relative;">
                    <i
                      class="el-icon-bell"
                      style="position:absolute; top:-28px; right:-6px;"
                      @click="open()"
                    ></i>
                  </el-badge>
                </span>
                <span>
                  <el-badge :value="2" style="position:relative; right:-50px; top:-10px;">
                    <i
                      class="el-icon-message"
                      style="position:absolute;top:-16px; right:-8px; "
                      @click="opentwo()"
                    ></i>
                  </el-badge>
                </span>

                <span>
                  <img src="../assets/img/usertx.jpg" class="tx" style="margin-left:60px;" />
                </span>
                <span>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      超级管理员
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item>我的权限</el-dropdown-item>
                      <el-dropdown-item>待办事项</el-dropdown-item>
                      <el-dropdown-item>设置</el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="backlogin()">退出登录</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
                <span style="cursor:pointer">
                  <i class="el-icon-switch-button" @click="backlogin()"></i>
                </span>
              </div>
            </el-header>
          </el-container>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <div style=" margin-top:30px">
        <el-row>
          <el-col :span="24">
            <div class="control">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="white"
                active-text-color="#A55218"
                :collapse="isCollapse"
              >
                <el-tooltip class="item" effect="dark" content="面板开关" placement="top-start">
                  <el-switch
                    id="ctrolface"
                    v-model="isCollapse"
                    active-color="#ccc"
                    inactive-color="#a55213"
                  ></el-switch>
                </el-tooltip>

                <el-menu-item index="1" @click="openIndex">
                  <i class="el-icon-s-home"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-coordinate"></i>
                    <span>账号管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-submenu index="2-1" >
                      <template slot="title">
                        <i class="el-icon-s-custom"></i>
                        <span>管理员账号</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item index="2-1-1" @click="openSuperadmin()">
                          <i class="el-icon-medal-1"></i>
                          <span>超级管理员</span>
                        </el-menu-item>
                        <el-menu-item index="2-1-2" @click="openAdmin()">
                          <i class="el-icon-medal"></i>
                          <span>普通管理员</span>
                        </el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2-2" @click="openUserlist()">
                      <i class="el-icon-trophy-1"></i>
                      <span>用户账号</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-present"></i>
                    <span>商品管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1" @click="openShopone()">
                      <i class="el-icon-s-management"></i>
                      <span>商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="3-2" @click="openOutin()">
                      <i class="el-icon-s-order"></i>
                      <span>进/出货列表</span>
                    </el-menu-item>
                    <el-menu-item index="3-3" @click="openWarehouse()">
                      <i class="el-icon-s-shop"></i>
                      <span>仓库管理</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>订单管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="4-1" @click="openCrkone()">
                      <i class="el-icon-document-copy"></i>
                      <span>订单查询</span>
                    </el-menu-item>
                    <el-menu-item index="4-2" @click="openCrktwo()">
                      <i class="el-icon-document-checked"></i>
                      <span>订单统计</span>
                    </el-menu-item>
                    <el-menu-item index="4-3" @click="openCrkthree()">
                      <i class="el-icon-document"></i>
                      <span>全部订单</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-bangzhu"></i>
                    <span>财务管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="5-1" @click="openIncome()">
                      <i class="el-icon-mobile"></i>
                      <span>收入</span>
                    </el-menu-item>
                    <el-menu-item index="5-2" @click="openExpenditure()">
                      <i class="el-icon-mouse"></i>
                      <span>支出</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                  <template slot="title">
                    <i class="el-icon-bell"></i>
                    <span>通知管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="6-1">
                      <i class="el-icon-star-off"></i>
                      <span>查看通知</span>
                    </el-menu-item>
                    <el-menu-item index="6-2">
                      <i class="el-icon-s-operation"></i>
                      <span>管理通知</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                  <template slot="title">
                    <i class="el-icon-message"></i>
                    <span>用户留言管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="7-1">
                      <i class="el-icon-s-help"></i>
                      <span>查看留言</span>
                    </el-menu-item>
                    <el-menu-item index="7-2">
                      <i class="el-icon-s-operation"></i>
                      <span>管理留言</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="8">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>设置</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="8-1">
                      <i class="el-icon-sunny"></i>
                      <span>更换显示视图</span>
                    </el-menu-item>
                    <el-menu-item index="8-2">
                      <i class="el-icon-cloudy"></i>
                      <span>更换主题</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      activeIndex: "1",
      isCollapse: false
    };
  },
  methods: {
    openLogin() {
      this.$router.push({ path: "/" });
    },
    openIndex: function() {
      this.$router.push({ path: "/home" });
    },
    openIncome() {
      this.$router.push({ path: "/income" });
    },
    openExpenditure() {
      this.$router.push({ path: "/expenditure" });
    },
    openOutin(){
      this.$router.push({path:"/outin"})
    },
    open() {
      const h = this.$createElement;
        this.$notify({
        title: "商城通知",
        message: h("i",{ style: "color: teal" },
          "亲爱的松鼠管理员，您有六条待办事项，请到待办事项通知面板查看！"
        )
      });
    },
    opentwo() {
      const h = this.$createElement;
        this.$notify({
        title: "用户留言提醒",
        message: h("i",{ style: "color: teal" },
          "亲爱的松鼠管理员，您收到两封邮件，请到留言管理面板查看"
        )
      });
    },
    backlogin() {
        this.$confirm('此操作将退出到登录界面, 是否继续?', '账号注销提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.openLogin();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      },
      openUserlist(){
        this.$router.push({path:"/userlist"})
      },
       openCrkone(){
        this.$router.push({path:"/crkone"})
      },
      openCrktwo(){
        this.$router.push({path:"/crktwo"})
      },
      openCrkthree(){
        this.$router.push({path:"/crkthree"})
      },
      openWarehouse(){
        this.$router.push({path:"/warehouse"})
      },
       openShopone(){
        this.$router.push({path:"/shopone"})
      },
       openUserlist(){
        this.$router.push({path:"/userlist"})
      },
       openAdmin(){
        this.$router.push({path:"/admin"})
      },
       openSuperadmin(){
        this.$router.push({path:"/superadmin"})
      }

    
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 270px;
}

.control {
  height: 840px;
  width: auto;
  background-color: #fff;
  box-shadow: 5px 5px 5px #ccc;
}
.el-submenu i {
  font-size: 20px;
}
.el-menu-item-group {
  font-size: 16px;
}
.el-menu-item-group i {
  font-size: 24px;
}
.el-menu-item {
  font-size: 16px;
}
.el-header {
  padding: 0 0 30px 0;
}
html {
  background-color: #fcfcfc;
}
* {
  margin: 0;
  padding: 0;
}
.el-header {
  width: 100%;
  height: 80px;
}
.topNav {
  width: 100%;
  height: 80px;
  line-height: 1.7;
  background-color: black;
  position: fixed;
  top: 0;
  z-index: 10;
}
#logo {
  padding: 30px;
}
/* 头像的样式 */
.tx {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
}
/* 导航栏中右边的图标 */
.topRightIcon {
  width: 320px;
  height: 80px;
  line-height: 80px;
  float: right;
  padding: 0%;
  color: white;
}
.topRightIcon span {
  display: block;
  margin-top: 10px;
  float: left;
}
.topRightIcon span i {
  font-size: 24px;
  color: white;
  padding: 10px;
  cursor: pointer;
}

/**控制面板開關 */
.el-switch {
  margin-left: 20px;
}
</style>