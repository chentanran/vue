export default {
  name: 'App',
  provide () {
    return {
      app: this
    }
  },
  data () {
    return {
      userInfo: ''
    }
  },
  methods: {
    getUserInfo () {
      this.userInfo = '登录人信息'
    }
  },
  created () {
    this.getUserInfo()
  }
}
