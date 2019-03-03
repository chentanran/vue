Vue.component('tabs', {
  template: `
    <div>
      <div>
        <div
          v-for="(item, index) in navList"
          @click="changeHandel(index)"
        >
          {{ item.label }}
          
        </div>
        <button :closable="hidden" @click="showOrHidden" ref="but">关闭</button>
      </div>
      <div v-if="hidden">
        <slot></slot>
      </div>
    </div>
  `,
  props: {
    value: {
      type:  [String]
    }
  },
  data() {
    return {
      navList: [],
      currentValue: this.value,
      hidden: true
    }
  },
  methods: {
    getTabs() {
      console.log(this.$children)
      return this.$children.filter((item) => {
        return item.$options._componentTag === "pane";
      })
    },
    updateNav() {
      this.navList = [];

      this.getTabs().forEach((pane, index) => {
 
        this.navList.push({
          label: pane.label,
          name: pane.name || String(index + 1)
        })

        if(!pane.name) return pane.name = String(index + 1);

        if(index == 0) {
          if(!this.currentValue) {
            this.currentValue = pane.name || String(index + 1);
          }
        }
      })

      this.updateShow()
    },

    updateShow() {
      this.getTabs().forEach((tab) => {
        console.log(this.currentValue, tab.name)
        tab.show = tab.name === String(this.currentValue);
      })
    },

    changeHandel(index) {
      // console.log(this.navList[index])
      let tab = this.navList[index];
      let name = tab.name;

      this.currentValue = name;
      this.$emit("input", name);
      this.$emit("on-change", name);
    },

    showOrHidden() {
      this.hidden = !this.hidden;
      console.log(this.$refs.but.innerText)
      this.$refs.but.innerText = !this.hidden ? "开启" : "关闭";
    }
  },
  mounted() {
    
  },

  watch: {
    value: function(val) {
      this.currentValue = val;
      console.log(val)
    },
    currentValue: function() {
      this.updateShow();
    }
  }
})