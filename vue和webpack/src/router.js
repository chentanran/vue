// import Vue from "../node_modules/vue/dist/vue.js"  //../node_modules/vue/dist/vue.js
import VueRouter from "vue-router"

// Vue.use(VueRouter)

import account from "./main/account.vue"
import goodsList from "./main/goodsList.vue"

import login from "./user/login.vue"
import register from "./user/register.vue"

const router = new VueRouter ({
    routes: [
        {path: "/account", component: account, 
        children:[
            {path: "/login", component: login},
            {path: "/register", component: register}
        ]
    },
        {path: "/goodsList", component: goodsList}
    ]
})


export default router