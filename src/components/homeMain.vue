<template>
  <div>
    <el-row>
      <el-col :span="10">
        <div id="user_info">
          <img src="../assets/img/usertx.jpg" alt />
          <div id="username">松鼠一号</div>
          <div id="user">超级管理员</div>
          <div id="waitThing">
            <el-alert title="您有六件待办事项" type="success" effect="dark" show-icon></el-alert>
            <el-alert title type="warning" effect="dark" show-icon>
              <ul>
                <li>1、核对出入库信息</li>
                <li>2、核对货款金额</li>
                <li>3、提醒发货员发货...</li>
              </ul>
            </el-alert>
          </div>
          <el-divider></el-divider>
          <div class="lastlogin">
            <div>上次登录时间：</div>
            <div>2019/10/21</div>
          </div>
          <div class="lastlogin">
            <div>上次登录地点：</div>
            <div>四川成都</div>
          </div>
        </div>
        <div class="shop-info">
          <h3>各类型访客占店铺流量的比例</h3>
          <span>查看过商品详情的用户量：</span>
          <br />
          <el-progress :text-inside="true" :stroke-width="16" :percentage="90"></el-progress>
          <span>添加商品到购物车的用户量：</span>
          <br />
          <el-progress :text-inside="true" :stroke-width="16" :percentage="80" status="success"></el-progress>
          <span>成交量：</span>
          <br />
          <el-progress :text-inside="true" :stroke-width="16" :percentage="67" status="warning"></el-progress>
          <span>退货量：</span>
          <br />
          <el-progress :text-inside="true" :stroke-width="16" :percentage="8" status="exception"></el-progress>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="usernum">
          <div>
            <i class="el-icon-user"></i>
          </div>
          <div>
            <h2 style="padding:20px; color:#a55213;">5629人</h2>
            <p style="font-size:16px;">今日用户访问量</p>
          </div>
        </div>
        <div>
          <div class="usernews">
            <div>
              <i class="el-icon-bell"></i>
            </div>
            <div>
              <h2 style="padding:20px; color:#01d045">325条</h2>
              <p style="font-size:16px;">商城信息</p>
            </div>
          </div>
          <div class="store">
            <div>
              <i class="el-icon-suitcase"></i>
            </div>
            <div>
              <h2 style="padding:20px; color: #a51313">1564件</h2>
              <p style="font-size:16px;">今日成交量</p>
            </div>
          </div>
        </div>

        <div class="wait">
          <div>
            <i class="el-icon-tickets" style="color:white; font-size:20px;"></i> 待办事项详情
          </div>
          <el-checkbox v-model="checked1" v-if="checked1==false" label="1、清点仓库库存-待完成" border style="color: rgb(69, 143, 212);"></el-checkbox>
          <el-checkbox v-model="checked1" v-if="checked1==true"  border> <span style="text-decoration:line-through;color:#ccc;"> 1、清点仓库库存</span> 完成</el-checkbox>
          <el-checkbox v-model="checked2" v-if="checked2==false" label="2、核对货款金额-待完成" border style="color: rgb(69, 143, 212);"></el-checkbox>
          <el-checkbox v-model="checked2" v-if="checked2==true" border><span style="text-decoration:line-through;color:#ccc;"> 2、核对货款金额</span> 完成</el-checkbox>
          <el-checkbox v-model="checked3" v-if="checked3==false" label="3、将未发商品发出-待完成" border style="color: rgb(69, 143, 212);"></el-checkbox>
          <el-checkbox v-model="checked3"  v-if="checked3==true" border><span style="text-decoration:line-through;color:#ccc;"> 3、将已下单的商品发出</span> 完成</el-checkbox>
          <el-checkbox v-model="checked4" v-if="checked4==false" label="4、客户回访-待完成" border style="color: rgb(69, 143, 212);"></el-checkbox>
          <el-checkbox v-model="checked4" v-if="checked4==true"  border><span style="text-decoration:line-through;color:#ccc;"> 4、客户回访</span> 完成</el-checkbox>
          <el-checkbox v-model="checked5"  v-if="checked5==false" label="5、联系供货商-待完成" border style="color: rgb(69, 143, 212);"></el-checkbox>
          <el-checkbox v-model="checked5"  v-if="checked5==true" border><span style="text-decoration:line-through;color:#ccc;"> 5、联系供货商</span> 完成</el-checkbox>
          <el-checkbox v-model="checked6" v-if="checked6==false" label="6、推送广告-待完成" border style="color: rgb(69, 143, 212);"></el-checkbox>
          <el-checkbox v-model="checked6" v-if="checked6==true"  border><span style="text-decoration:line-through;color:#ccc;"> 6、推送活动广告</span> 完成</el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="11">
        <div style="width:100%;height:420px" id="first"></div>
      </el-col>
      <el-col :span="11">
        <div style="width:100%;height:420px" id="two"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// 引入legend模块
require("echarts/lib/component/legend");
export default {
  name: "homeMain",
  data() {
    return {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      istrue:"checktrue"
    };
  },
  methods: {
    first() {
      let first = this.$echarts.init(document.getElementById("first"));
      var app = {};
      var option = null;
      option = {
        title: {
          text: "近12天下单量",
          subtext: "包含所有订单"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["下单量", "已到货"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "10月10日",
              "10月11日",
              "10月12日",
              "10月13日",
              "10月14日",
              "10月15日",
              "10月16日",
              "10月17日",
              "10月18日",
              "110月19日",
              "10月20日",
              "10月21日"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "下单量",
            type: "bar",
            data: [
              142,
              234,
              156,
              67,
              34,
              54,
              343,
              123,
              123,
              135,
              211,
              321
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "已到货",
            type: "bar",
            data: [
              142,
              144,
              116,
              27,
              34,
              14,
              233,
              83,
              83,
              125,
              178,
              91
            ],
            markPoint: {
              data: [
                { name: "最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
      if (option && typeof option === "object") {
        first.setOption(option, true);
      }
    },
    two(){
var dom = document.getElementById("two");
var myChart = echarts.init(dom);
var app = {};
var option = null;
app.title = '本周访客量';

var colors = ['#5793f3', '#d14a61', '#675bba'];

option = {
    color: colors,

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        right: '20%'
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['访客量','会员','普通用户']
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: ['周一','周二','周三','周四','周五','周六','周七']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '普通用户',
            min: 0,
            max: 450,
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: colors[0]
                }
            },
            axisLabel: {
                formatter: '{value} 人次'
            }
        },
        {
            type: 'value',
            name: '会员',
            min: 0,
            max: 450,
            position: 'right',
            offset: 80,
            axisLine: {
                lineStyle: {
                    color: colors[1]
                }
            },
            axisLabel: {
                formatter: '{value}人次'
            }
        },
        {
            type: 'value',
            name: '普通用户',
            min: 0,
            max: 450,
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: colors[2]
                }
            },
            axisLabel: {
                formatter: '{value} 人次'
            }
        }
    ],
    series: [
        {
            name:'访客量',
            type:'bar',
            data:[230, 409, 370, 232, 256, 367, 235]
        },
        {
            name:'会员',
            type:'bar',
            yAxisIndex: 1,
            data:[26, 59, 90, 64, 87, 77, 176]
        },
        {
            name:'普通用户',
            type:'line',
            yAxisIndex: 2,
            data:[204, 350, 306, 155, 290, 102, 59]
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
    }
  },

  mounted() {
    this.first();
    this.two();
  }
};
</script>
<style>

/* 待办事项 */
.checktrue{
  text-decoration:line-through;
}
/* 图表样式 */
#first{
margin-top: 30px;
background-color: #fff;
box-shadow: 5px 5px 5px #ccc;
border: 1px solid #ccc;

}
#two{
margin-top: 30px;
margin-left: 102px;
background-color: #fff;
box-shadow: 5px 5px 5px #ccc;
border: 1px solid #ccc;
}
#user_info {
  margin-top: 30px;
  width: 480px;
  height: 300px;
  background-color: #fff;
  box-shadow: 5px 5px 5px #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
}
#user_info img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto 0px 20px;
  border: 1px solid #ccc;
  cursor: pointer;
}
#username {
  font-size: 18px;
  font-weight: bolder;
  margin-left: 35px;
}
#user {
  margin-left: 35px;
  margin-top:8px;
}
li {
  list-style: none;
}
#waitThing {
  width: 230px;
  height: 150px;
  float: right;
  margin-top: -130px;
  margin-right: 60px;
  font-size: 16px;
}
#waitThing ul li {
  font-size: 14px;
}

.lastlogin {
  display: flex;
  width: 300px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  flex-direction: row;
  margin-top:-8px;
}

.lastlogin div {
  margin-left: 30px;
}

.shop-info {
  margin-top: 20px;
  width: 480px;
  height: 260px;
  background-color: #fff;
  box-shadow: 5px 5px 5px #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
.el-progress {
  width: 380px;
  margin-left: 30px;
  margin-bottom: 15px;
}
h3 {
  padding: 10px;
  text-align: center;
}
.shop-info span {
  padding: 7px;
  margin-left: 30px;
}

.usernum {
  margin-top: 30px;
  margin-left: -100px;
  width: 280px;
  height: 120px;
  background-color: #fff;
  box-shadow: 5px 5px 5px #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
.usernum div {
  width: 45%;
  height: 100%;
}
.usernum div:nth-child(1) {
  background-color: #a55213;
  color: #fff;
  font-size: 56px;
  line-height: 1.7;
  border-radius: 5px 0 0 5px;
  text-align: center;
}
.usernum div:nth-child(2) {
  line-height: 30px;
  text-align: center;
}

.usernews {
  margin-top: -123px;
  margin-left: 230px;
  width: 280px;
  height: 120px;
  background-color: #fff;
  box-shadow: 10px 10px 10px #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
.usernews div {
  width: 45%;
  height: 100%;
}
.usernews div:nth-child(1) {
  background-color: #01d045;
  color: #fff;
  font-size: 56px;
  line-height: 1.7;
  border-radius: 5px 0 0 5px;
  text-align: center;
}
.usernews div:nth-child(2) {
  line-height: 30px;

  text-align: center;
}

.store {
  margin-top: -121px;
  margin-left: 560px;
  width: 280px;
  height: 120px;
  background-color: #fff;
  box-shadow: 5px 5px 5px #ccc;
  border: 1px solid #ccc;
  border-radius:5px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
.store div {
  width: 45%;
  height: 100%;
}
.store div:nth-child(1) {
  background-color: #a51313;
  color: #fff;
  font-size: 56px;
  line-height: 1.7;
  border-radius: 5px 0 0 5px;
  text-align: center;
}
.store div:nth-child(2) {
  line-height: 30px;
  text-align: center;
}

.wait {
  margin-top: 30px;
  margin-left: -100px;
  width: 109%;
  height: 430px;
  background-color: #fff;
  box-shadow: 5px 5px 5px #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
.el-checkbox {
  width: 95%;
  padding: 10px;
  margin-top: 15px;
  margin-left: 15px;
}

.wait div {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bolder;
  text-align: center;
  background-color: rgb(69, 143, 212);
  border-radius: 5px 5px 0 0;
  color: #fff;
}
</style>