import request from '@/axios/index.js'
const actions = {
    test() {
        console.log(request);
    }
}
const mutations = {}
const state = {}
const getters = {}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}