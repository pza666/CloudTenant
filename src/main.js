import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入图标样式
import '../src/assets/font-icon/iconfont.css'
// 引入elementui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
Vue.component('BreadCrumb', BreadCrumb)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
