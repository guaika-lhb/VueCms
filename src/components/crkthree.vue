<template>
  <div>
    <el-container>
 
 <div class="navIncome">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
  <el-breadcrumb-item >全部订单</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</el-container>
   <h3 class="el-icon-s-order" style="margin-top:30px;">出\入库订单</h3>
    <el-table
      :data="tableData.slice((currentPage -1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%;magin:0 auto;">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="Daddress"
        label="发货地址">
      </el-table-column>
      <el-table-column
        prop="Raddress"
        label="收货地址">
      </el-table-column>
      <el-table-column
        prop="mass"
        label="质量等级">
      </el-table-column>
      <el-table-column
        prop="Detector"
        label="检测员">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button style="background-color: #a55213;color: white"  size="small" @click="revise(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="open(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[9, 18, 27]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'usera',
  data () {
    return {
      currentPage: 1,
      pagesize: 2000,
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '李四',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '苏州市姑苏区122号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 2,
        date: '2016-05-03',
        name: '王五',
        amount: '2000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '上海市普陀区金沙江路 117 弄',
        mass: 'B',
        Detector: '张三'
      }, {
        id: 3,
        date: '2016-06-02',
        name: '钱贵',
        amount: '300',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '苏州市姑苏区122号',
        mass: 'c',
        Detector: '张三'
      }, {
        id: 4,
        date: '2016-05-02',
        name: '马虎',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '拉萨市北京中路1号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 5,
        date: '2016-05-02',
        name: '吴江',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '苏州市姑苏区122号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 6,
        date: '2016-05-02',
        name: '王小强',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '南京雨花台区玉兰路98号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 7,
        date: '2016-05-02',
        name: '刘鑫',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '长沙开福区三一大道33号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 8,
        date: '2016-05-02',
        name: '李三',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '广州市珠江区阅江西路222号',
        mass: 'A',
        Detector: '高闵'
      }, {
        id: 9,
        date: '2016-05-02',
        name: '戚长发',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '济南历下区大明湖路33号',
        mass: 'C',
        Detector: '张三'
      }, {
        id: 10,
        date: '2016-05-02',
        name: '王小虎',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '济南历下区大明湖路33号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 11,
        date: '2016-05-02',
        name: '高要',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '西宁市城关区东关大街98号',
        mass: 'C',
        Detector: '张三'
      }, {
        id: 12,
        date: '2016-05-02',
        name: '李莉',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '呼和浩特市新城区新华东街34号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 13,
        date: '2016-05-02',
        name: '吕虎',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '昆明市五华区翠湖南路478号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 14,
        date: '2016-05-02',
        name: '戚长发',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '济南历下区大明湖路33号',
        mass: 'C',
        Detector: '张三'
      }, {
        id: 15,
        date: '2016-05-02',
        name: '王小虎',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '济南历下区大明湖路33号',
        mass: 'A',
        Detector: '张三'
      }, {
        id: 16,
        date: '2016-05-02',
        name: '戚长发',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '济南历下区大明湖路33号',
        mass: 'C',
        Detector: '张三'
      }, {
        id: 17,
        date: '2016-05-02',
        name: '王小虎',
        amount: '3000',
        Daddress: '成都温江区海科路东段777号',
        Raddress: '济南历下区大明湖路33号',
        mass: 'A',
        Detector: '张三'
      }]
    }
  },
  methods: {
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
    open (item) {
      const h = this.$createElement
      this.$msgbox({
        title: '删除',
        message: h('p', null, [h('span', null, '确认删除')]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true,
            instance.confirmButtonText = '执行中....',
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
    }
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
