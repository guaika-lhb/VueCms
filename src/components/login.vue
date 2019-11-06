<template>
<div class="login">
 <el-form ref="loginForm" :model="loginForm" class="elform">
     <img src="../assets/img/zhuren.png" alt="">
     <div class="h1" ><span class="el-icon-eleme"></span>三只松鼠微商城管理系统</div>
<el-form-item >
    <span>用户名：</span><el-input class="nameInput" v-model="loginForm.userName" id="userName" type="text" placeholder="请输入管理员账号" autoComplete="off"></el-input>
</el-form-item>
<el-form-item >
    <span>密 &nbsp;码 ：</span><el-input class="psdInput" v-model="loginForm.userPsd" id="userPsd" type="password" placeholder="请输入管理员密码" autoComplete="off"></el-input>
</el-form-item>
<div class="loginButton">
    <span class="error-tip" v-if="showErrorTip">{{errorTip}}</span>
    <el-button @click="accountLogin">登录</el-button>
</div>
</el-form>
</div>
</template>


<script>
import {isDataValid} from "../util/vaildate";
export default {
    name:'login',
    data(){
        return{
            loginForm:{
                userName:"",
                userPsd:""
            },
            pass:"1",
            uName:"admin",
            showErrorTip:false,
            errorTip:"输入错误"
        }
       
    },
     methods:{
            accountLogin(){
               if(!isDataValid(this.loginForm.userName)){
                   alert("用户名不能为空！！");
                   return false;
               }
               if(!isDataValid(this.loginForm.userPsd)){
                   alert("密码不能为空！！");
                   return false;
               }
               if(this.loginForm.userName==this.uName&&this.loginForm.userPsd==this.pass){
                   var nameUser=[this.uName,this.pass];
                   //将数据存到缓存中
                   localStorage.setItem("nameUser",JSON.stringify(nameUser));
                   //路由跳转
                   this.$router.push("/home");

               }else{
                   alert("用户名或密码输入错误！！")
               }
            }
        }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.login{
    width: 100%;
    min-width:992px;
    height: 930px;
   background-image: url('../assets/img/loginbg.png');
    overflow: hidden;
}
.elform img{
    width: 150px;
    height: 150px;
    margin-top: -90px;
}
.elform{
width: 30%;
margin: 200px auto;
background-color: #A55218;
border-radius: 3%;
}

.h1{
    width: 60%;
   font-size: 26px;
    padding: 17px;
    color: black;
    float: right;
    margin-right: 30px;
}
.el-form-item{
     text-align: center !important;
     margin: 20px auto;
}
.el-form-item span{
    font-size: 18px;

}
.nameInput{
    width: 300px;
    height: 25px;
}
.psdInput{
    width: 300px;
    height: 25px;
}
.loginButton{
    width: 100%;
    text-align: center
}
.el-button:hover{
   
    color: #A55218;
}
.el-button{
    width: 90px;
    height: 40px;
    margin: 10px auto;
    padding: 10px;
    color: black;
    font-size: 16px;
    

}
</style>