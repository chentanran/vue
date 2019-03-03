var vue = new Vue({
  el: "#app",
  data() {
    return {
      show: false
    }
  },
  methods: {
    handelShow() {
      this.show = !this.show
    },
    handelClick() {
      this.show = false;
    }
  }
})