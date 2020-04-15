import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)
// 2.创建对象
const state = {
  cartList: [] // 购物车对象
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
// 3.导出store独享
export default store
