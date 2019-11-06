<template>
  <section class="chart-container">
      <el-container>
 <div class="navIncome">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>账号管理</el-breadcrumb-item>
  <el-breadcrumb-item >管理员账号</el-breadcrumb-item>
   <el-breadcrumb-item >超级管理员</el-breadcrumb-item>
</el-breadcrumb>
  </div>
</el-container>
    <el-tabs v-model="activeName" type="card" style="margin-top:30px;">
      <el-tab-pane label="超级管理员" name="first">
        <div>
          <div id="users_info">
            <div id="supuser" class="el-icon-user-solid">超级管理员</div>
            <el-divider></el-divider>
            <img src="../assets/img/usertx.jpg" alt/>
            <div id="supusername">松鼠一号</div>
            <div class="limits">当前用户权限值：<span style="color: #a50b00">100</span></div>
          </div>

          <div id="supUser">
            <div id="Switch" class="el-icon-s-tools">不同用户权限不同</div>
            <el-divider></el-divider>
            <p class="sup-text">您可以通过点击下面的按钮来进入超级管理员管理界面，如果当前用户权限值为0，则表示权限测试页，不可以做任何修改！</p>
            <div class="breaker">
              <el-button @click="Sup()" style="background-color:#a55213;color:white;">查看权限</el-button>
            </div>

          </div>
        </div>

        <div style="margin: 0 auto">
          <el-row>
            <el-col :span="12">
              <div id="chartPie"></div>
            </el-col>
          </el-row>
        </div>

      </el-tab-pane>
    </el-tabs>
  </section>


</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Supadmin',
    data() {
      return {
        activeName: 'first',
        chartPie: null
      }
    },
    methods: {
      Sup() {
        this.$router.push({ path: "/superManager"})
      },

      drawPieChart() {
        this.chartPie = echarts.init(document.getElementById('chartPie'));
        this.chartPie.setOption({
          title: {
            text: '松鼠一号',
            subtext: '拥有全部权限',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['管理员', '客服主管', '订单主管', '商品主管', '超级管理员']
          },
          series: [
            {
              name: '超级管理员权限',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 300, name: '管理员' },
                { value: 300, name: '客服主管' },
                { value: 300, name: '订单主管' },
                { value: 300, name: '商品主管' },
                { value: 1548, name: '超级管理员' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      drawCharts() {
        this.drawPieChart()
      },
    },

    mounted: function () {
      this.drawCharts()
    },
    updated: function () {
      this.drawCharts()
    }
  }

</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  #users_info {
    margin-top: 30px;
    margin-left: 70px;
    width: 520px;
    height: 350px;
    background-color: #fff;
    box-shadow: 5px 5px 5px #ccc;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
  }

  #users_info img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    /* margin: 70px 179px; */
    position: absolute;
    top: 90px;
    left: 190px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  #supusername {
    font-size: 18px;
    font-weight: bolder;
    position: absolute;
    top: 255px;
    left: 220px;
    color: #a55213;
  }

  .limits {
    font-size: 16px;
    position: absolute;
    top: 290px;
    left: 185px;
  }

  #supuser {
    margin-top: 13px;
    margin-left: 60px;
  }

  #Switch {
    margin-top: 13px;
    margin-left: 60px;
  }

  #supUser {
    width: 520px;
    height: 350px;
    background-color: #fff;
    -webkit-box-shadow: 5px 5px 5px #ccc;
    box-shadow: 5px 5px 5px #ccc;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
    float: right;
    top: -350px;
    right: 50px;
  }

  .sup-text {
    width: 80%;
    font-size: 16px;
    text-align: justify;
    margin-top: 52px;
    margin-left: 48px;
    text-indent: 2em;
  }

  .breaker {
    position: absolute;
    top: 250px;
    left: 220px;
  }
  #chartPie{
    width:100%;
    height:400px;
    margin-left: 240px;
    margin-top: 50px;
    float: left;
  }
  .el-icon-user-solid{
    color: #a55213;

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
