<template>
<div>
  <el-container>
 
 <div class="navIncome">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }"> <span class="indexincome">首页</span> </el-breadcrumb-item>
  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
  <el-breadcrumb-item >订单查询</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</el-container>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <h3  style="text-align=center; margin-top:30px;"> <i class="el-icon-search"></i> 仓库订单查询</h3>
    <el-form-item label="货物名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="存放区域" prop="region">
      <el-select v-model="ruleForm.region"  placeholder="请选择区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        <el-option label="区域三" value="shangha"></el-option>
        <el-option label="区域四" value="beijin"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="存放时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="存储条件" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="防潮" name="type"></el-checkbox>
        <el-checkbox label="防摔" name="type"></el-checkbox>
        <el-checkbox label="易燃" name="type"></el-checkbox>
        <el-checkbox label="有毒" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="是否出库" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="已出库"></el-radio>
        <el-radio label="未出库"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="运输方式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button  @click="submitForm('ruleForm')">完成</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      
      rules: {
        name: [
          { required: true, message: '请输入货物名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择存放区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个储存条件', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写运输方式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
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
