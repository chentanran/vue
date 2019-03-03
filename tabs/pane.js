Vue.component('pane', {
  name: 'pane',
  template: `
    <div v-show="show">
      <slot></slot>
    </div>
  `,
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean
    }
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    updateNav() {
      console.log(this.$parent)
      this.$parent.updateNav();
    }
  },
  mounted() {
    this.updateNav();
  },
  watch: {
    label() {
      this.updateNav();
    }
  }
})