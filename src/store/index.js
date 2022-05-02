import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/login'

// 管理员模块
import adminInfo from '@/store/adminInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    adminInfo,
    login
  }
})
