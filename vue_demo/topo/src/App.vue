<template>
  <div id="app">
    <div class="topoArea">
        <v-topo 
        :editable="true"
        :topo-data="topoData1"></v-topo>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import topoData1 from './data/topoData1'
import topoData2 from './data/topoData2'

import vTopo from './components/vTopo/vTopo'
export default {
  components: {
    vTopo
  },
  name: 'App',
  data() {
    return {
      topoData1:topoData1,
      topoData2:topoData2
    }
  },
  methods: {
     //初始化topo数据
    initTopoData(){
      let initTopoData = topoData2//开发：topoJson从后台获取数据
      let nullTopoData = {
        nodes:[],
        connectors:[]
      }
      //类型检测
      if(initTopoData instanceof Object && !Array.prototype.isPrototypeOf(initTopoData)){
        if('nodes' in initTopoData && 'connectors' in initTopoData){
          if(!initTopoData.nodes instanceof Array  || !initTopoData.connectors instanceof Array){
            console.error('topoJson.nodes or topoJson.connectors must be Array')
            initTopoData = nullTopoData
          }
        }else{
          console.error('topoJson must has nodes key and connectors key')
          initTopoData = nullTopoData
        }
      }else{
        console.error('topoJson must be {nodes:[],connectors:[]}')
        initTopoData = nullTopoData
      }
      this.topoData =  initTopoData
    }
  }
}
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
