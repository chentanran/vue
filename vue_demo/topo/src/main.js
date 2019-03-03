// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import vTopo from 'vue-topo'
// import 'vue-topo/dist/vue-topo.min.css'

import App from './App'
import router from './router'
// Vue.use(vTopo)

Vue.use(ElementUI)
// Vue.use(vTopo)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
