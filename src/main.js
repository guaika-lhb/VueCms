import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import Echarts from 'echarts'


// 约定
Vue.use(ElementUI);
Vue.use(Echarts);

//更改原型链
Vue.prototype.$echarts=Echarts;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
