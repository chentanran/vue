import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Bottom from '@/page/bottom.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bottom',
      component: Bottom
    },
    {
      path: '/bottom',
      name: 'bottom',
      component: Bottom
    }
  ]
})
