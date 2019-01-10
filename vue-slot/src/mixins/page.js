export default {
  name: 'App',
  provide () {
    return {
      app: this
    }
  },
  data () {
    return {
      page: ''
    }
  },
  methods: {
    getPage () {
      this.page = '页面信息'
    }
  },
  created () {
    this.getPage()
  }
}
