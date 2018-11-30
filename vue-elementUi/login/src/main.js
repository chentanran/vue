
import Vue from 'vue' 
import ElementUI from 'element-ui'; //引入ui组件
import 'element-ui/lib/theme-chalk/index.css';
import App from './App' //引入App组件
import router from './router' //导入路由
import "@/styles/reset.scss"  //初始化样式

Vue.use(ElementUI)
//


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render : d => d(App)
})
