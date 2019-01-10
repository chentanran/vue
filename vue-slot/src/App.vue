<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import mixins_user from './mixins/user.js'
  import mixins_page from './mixins/page.js'
  export default {
    mixins: [mixins_user, mixins_page],
    // provide: {
    //   app: this
    // },
    data () {
      return {

      }
    }
  }

// export default {
//   name: 'App',
//   provide() {
//     return {
//       app: this
//     }
//   },
//   data() {
//     return {
//       userInfo: ''
//     }
//   },
//   methods: {
//     getUserInfo() {
//       this.userInfo = '登录人信息';
//     }
//   },
//   created() {
//     this.getUserInfo();
//   }
// }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
