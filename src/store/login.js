import request from '@/axios/index.js';
import router from '../router/index.js';

const actions = {
    // 点击登录获取到token值后到mutations对state数据进行操作
    async submitForm({ commit }, val) {
        // const { headers } = await request.post('login/admin', val);
        // commit('SUBMITFORM', headers.authorization);
        commit('SUBMITFORM');
    },
};
const mutations = {
    // 如果有了token立马设置，之后去其他路由都要有token的认证
    SUBMITFORM(state, val) {
        // 登录不成功不设置token并返回
        // if (!val) {
        //     return this._vm.$message.error('请输入正确的用户名或密码!');
        // }
        // state.token = val;
        // 设置登录的token
        // localStorage.setItem('token', state.token);
        // 因为发请求验证的时候是个异步，在发请求的时候并不能获取到token
        // 所以在Vuex里等token设置完毕再跳转即可
        console.log('------------------------------------');
        router.push('/home');
    },
};
const state = {
    token: '',
};
const getters = {};
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters,
};
