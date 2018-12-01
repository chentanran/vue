import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login/login.vue'
import home from "@/page/home/home.vue"
import welcome from "@/page/welcome/welcome.vue"

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/login', name: 'login',component: login},
    {path: '/', redirect: "/home"},
    {path: "/home", component: home, redirect: "/home/welcome",
      children:[
        {path:"welcome", component: welcome}
      ]
    }
  ]
})

//全局路由守卫
router.beforeEach((to,from, next) => {
  let token = localStorage.getItem("token")
  if(token){
    next()
  }else{
    if(to.path !== "/login"){
      next({path: "/login"})
     }else{
    next()
  }
  }
  
})


export default router