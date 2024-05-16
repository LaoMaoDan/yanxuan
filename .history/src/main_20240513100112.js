import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入适配rem自适应函数
import './assets/js/rem.js'
// 导入vuex
import store from './store'
// 导入自定义指令
import addCartShow from "@/directive/goodsAttribute.js";
Vue.directive('addCartShow', addCartShow)
import addMaskShow from "@/directive/goodsMask.js";
Vue.directive('addMaskShow', addMaskShow)
// 表单校验
// 手机号表单校验
import jiaoyan from "@/directive/phone.js";
Vue.directive('jiaoyan', jiaoyan)
// 其他校验
import otherCheck from "@/directive/otherCheck";
Vue.directive('otherCheck', otherCheck)
// 下拉刷新
import pull from '@/directive/pull'
Vue.directive('pull', pull)
// 上拉加载
import pullup from '@/directive/pullup'
Vue.directive('pullup', pullup)

// 左滑删除
import silde from '@/directive/silde'
Vue.directive('silde', silde)

Vue.config.productionTip = false


import 

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
console.log(process.env.VUE_APP_TITLE);
