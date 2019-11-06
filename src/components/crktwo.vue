<template>
  <div>
    <el-container>
 <div class="navIncome">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
  <el-breadcrumb-item >订单统计</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</el-container>
    <h3 class="el-icon-s-data" style="margin-top:30px;">近3个月订单量统计</h3>
    <div style="width: 100%;height: 700px;" id="tb"></div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'one',
  methods: {
    // 第一个图
    main: function () {
      var dom = document.getElementById('tb')
      var myChart = echarts.init(dom)
      var app = {}
      var option = null

      setTimeout(function () {
        option = {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: [
              ['product', '2013', '2014', '2015', '2016', '2017', '2018'],
              ['D', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ['B', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
              ['C', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ['A', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              label: {
                formatter: '{b}: {@2012} ({d}%)'
              },
              encode: {
                itemName: 'product',
                value: '2018',
                tooltip: '2018'
              }
            }
          ]
        }

        myChart.on('updateAxisPointer', function (event) {
          var xAxisInfo = event.axesInfo[0]
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            })
          }
        })

        myChart.setOption(option)
      })
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      };
    }
  },
  mounted () {
    this.main()
  }
}
</script>

<style >
.navIncome{
    width: 100%;
    height: 30px;
    background-color: #fff;
    line-height: 60px;
    padding: 20px;
    box-shadow: 5px 5px 5px #ccc;
}
</style>
