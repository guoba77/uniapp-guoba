
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// import { $http } from '@escook/request-miniprogram'
import {myRequest} from './untils/api.js'
 import showMsg from "./untils/untils.js"
Vue.config.productionTip = false

App.mpType = 'app'
uni.$myRequest= myRequest
// Vue.prototype.$myRequest = myRequest
// uni.$http = $http
// $http.baseUrl = 'https://www.uinav.com'
// // 请求开始之前做一些事情
// $http.beforeRequest = function (options) {
//   console.log(options);
//   // do somethimg...
//     wx.showLoading({
//       title: '数据加载中...'
//     })
// }
// // 请求完成之后做一些事情
// $http.afterRequest = function () {
//   // do something...
//   wx.hideLoading()
// }
//封装弹框的方法
uni.$showMsg=showMsg
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif