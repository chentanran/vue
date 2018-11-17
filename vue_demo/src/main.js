
import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from "./router/router.js"
//引入字体文件
import "./assets/font/iconfont.css"

new Vue({
    el: '#app',
    render: (c)=> c(App),
    router
})