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
        {path: "/msite", component: msite, meta:{showFooter: true}},
        {path: "/order", component: order, meta:{showFooter: true}},
        {path: "/profile", component: profile, meta:{showFooter: true}},
        {path: "/search", component: search, meta:{showFooter: true}},
        {path: "/", redirect: "/msite"},
        {path: "/login", component: login}
    ]
})