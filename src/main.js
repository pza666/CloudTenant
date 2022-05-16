import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入图标样式
import '../src/assets/font-icon/iconfont.css';
// 引入elementui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 蓝色：#2295ff  橙色：#fdbd09  字体色：#fff  背景色：#eee

// 引入面包屑组件为全局组件
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
Vue.component('BreadCrumb', BreadCrumb);

// 引入封装的axios文件并挂载到Vue的原型上
import request from '@/axios/index.js';

Vue.prototype.$request = request;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
