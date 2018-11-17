//引入文件
import Vue from "../node_modules/vue/dist/vue.js"  //../node_modules/vue/dist/vue.js
import VueRouter from "vue-router"

Vue.use(VueRouter)

import router from "./router.js"

import App from "./App.vue"



const vm = new Vue({
    el: "#app",
    data: {
        msg: "123"
    },
    render: function(res){
        return res(App)
    },
    router
})