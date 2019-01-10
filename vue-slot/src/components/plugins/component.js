/**
* @fileoverview 自定义组件
*/
import Vue from 'vue'

Vue.component(
  'base-add-view',
  () => import('../BaseAddView.vue')
)
