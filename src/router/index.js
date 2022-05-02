import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Home.vue'),
    children: [
      { path: '/admininfo', name: 'admininfo', component: () => import(/* webpackChunkName: "AdminList" */ '../views/AdminInfo/AdminInfo.vue') },
      { path: '/userinfo', name: 'userinfo', component: () => import(/* webpackChunkName: "UserList" */ '../views/UserInfo/UserInfo.vue') }
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
