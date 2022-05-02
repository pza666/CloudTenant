import Vue from 'vue'
import Vuex from 'vuex'
// 管理员模块
import adminInfo from '@/store/adminInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    adminInfo
  }
})
