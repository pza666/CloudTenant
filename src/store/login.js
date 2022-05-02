import request from '@/axios/index.js'
const actions = {
    // 点击登录获取到token值后到mutations对state数据进行操作
    async submitForm({ commit }, val) {
        const { headers } = await request.post('login/admin', val)

        commit('SUBMITFORM', headers.authorization)
    }
}
const mutations = {
    // 如果有了token立马设置，之后去其他路由都要有token的认证
    SUBMITFORM(state, val) {
        state.token = val
        localStorage.setItem('token', state.token)
    }
}
const state = {
    token: ''
}
const getters = {}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}