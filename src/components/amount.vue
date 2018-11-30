<template>
  <div>
    <!-- <h3>{{ $store.state.count }}</h3> -->
    <h2>{{ count }}</h2>
    <!-- <h3>{{ $store.getters.optCount }}</h3> -->
    {{msg}}
    <input type="button" value="修改" @click="modify" />
  </div>
</template>

<script>
// 导入mapState函数
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      msg: '123'
    }
  },
  // methods: mapMutations(['increment']),
  methods: {
    // map 映射
    ...mapMutations(['increment']),
    modify() {
      // this.msg = '456';
      
      // console.log(this.count)
      // console.log(this.$store.state.count)
      // this.$store.state.count = 100
      // 如果需要修改state中的数据 必须经过mutations来修改, 这是mapState的初衷
      // this.count = 100

      // var obj = {
      //   name: '刘希晗',
      //   job: '做直播',
      //   salary: '1000000'
      // }
      // 伪数组: 有索引 有length的对象就被称为伪数组
      // var arr = ['刘希晗', '做直播', '月入百万']
      // var obj = {
      //   ...mapState(["count"])
      // }
      // console.log(obj)
      // console.log(mapState(["count"]))

      // this.$store.commit('increment')

      this.increment()
    }
  },
  computed: {
    // 在state中的数据一定要用mutations进行修改
    // 如果非要在state中进行修改 也可以实现
    // 但是如果用的是mapState的方式导入的属性, 无法修改
    // 其实mapState函数的作用就是帮我们从$store中把指定的数据导出到当前组件的computed数据中
    // 而计算属性有个特点: 默认情况只能获取不能赋值. 所以使用mapState后, 无法直接修改vuex中的数据
    // 将当前组件需要的state数据挂载到computed上
    ...mapState(["count"]),
    msg2 : function() {
      // 如果计算属性内部有用到数据, 数据发生变化时计算属性也会同步更新
      return '123';
    }
  },
  // 这种方法就无法与当前组件的计算属性共存, 只能用vuex中的数据来填满computed属性
  // computed: mapState(["count"])
};
</script>

<style lang="scss" scoped>
</style>
