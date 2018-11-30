//引入路由对象
import Vue from "vue"
import VueRouter from "vue-router"
//引入其他页面
import msite from "../pages/MSite/MSite.vue"
import order from "../pages/Order/Order.vue"
import profile from "../pages/profile/profile.vue"
import search from "../pages/search/search.vue"
import login from "../pages/login/login.vue"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {path: "/msite", component: msite},
        {path: "/order", component: order },
        {path: "/profile", component: profile},
        {path: "/search", component: search},
        {path: "/", redirect: "/msite"},
        {path: "/login", component: login}
    ]
})