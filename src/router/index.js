import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import HomeMain from '@/components/homeMain'
import Admin from '@/components/admin'
import Userlist from '@/components/userlist'
import SuperManager from '@/components/superManager'
import Superadmin from '@/components/superadmin'
import Expenditure from '@/components/expenditure'
import Income from '@/components/income'
import Outin from '@/components/outin'
import Crkone from '@/components/crkone'
import Crktwo from '@/components/crktwo'
import Crkthree from '@/components/crkthree'
import Warehouse from '@/components/warehouse'
import Shopone from '@/components/shopone'
/**
 * 2019/10/18
 * author:zhaoxin
 */
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录页面',
      component: Login
    },
    {
      path: '/home',
      name: '主页',
      component: Home,
      children:[
        {
          path: '/home',
          name: '首页',
          component: HomeMain
        },
        {
          path: '/admin',
          name: '管理员页面',
          component: Admin
        },{
          path: '/userlist',
          name: '用户列表',
          component: Userlist
        },{
          path: '/income',
          name: '收入',
          component: Income
        },{
          path: '/expenditure',
          name: '支出',
          component: Expenditure
        },{
          path: '/outin',
          name: '进出货',
          component: Outin
        },{
          path: '/crkone',
          name: 'dingdan1',
          component: Crkone
        },{
          path: '/crktwo',
          name: '进出货',
          component: Crktwo
        },{
          path: '/crkthree',
          name: '进出货',
          component: Crkthree
        },{
          path: '/warehouse',
          name: '进出货',
          component: Warehouse
        },{
          path: '/shopone',
          name: '进出货',
          component: Shopone
        },{
          path: '/superManager',
          name: '设置管理员',
          component:SuperManager
        },{
          path: '/superadmin',
          name: '超级管理员',
          component:Superadmin
        }
      ]
    },
    {
      path:'/',
      name:"用于跳转失败时显示",
      redirect:'/login',
      hidden:true
    }
  ]
})
