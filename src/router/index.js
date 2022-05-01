import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/admininfo'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Home.vue'),
    children: [
      { path: '/admininfo', name: 'admininfo', component: () => import(/* webpackChunkName: "AdminList" */ '../views/AdminInfo/AdminInfo.vue') },
      { path: '/userinfo', name: 'userinfo', component: () => import(/* webpackChunkName: "UserList" */ '../views/UserInfo/UserInfo.vue') },
      { path: '/recommended', name: 'recommended', component: () => import(/* webpackChunkName: "HouseInfo" */ '../views/HouseInfo/Recommended/Recommended.vue') },
      { path: '/lease', name: 'lease', component: () => import(/* webpackChunkName: "HouseInfo" */ '../views/HouseInfo/Lease/Lease.vue') },
      { path: '/secondhand', name: 'secondhand', component: () => import(/* webpackChunkName: "HouseInfo" */ '../views/HouseInfo/SecondHand/SecondHand.vue') },
      { path: '/latest', name: 'latest', component: () => import(/* webpackChunkName: "HouseInfo" */ '../views/HouseInfo/Latest/Latest.vue') },
      { path: '/article', name: 'article', component: () => import(/* webpackChunkName: "Article" */ '../views/Article/Article.vue') },
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
