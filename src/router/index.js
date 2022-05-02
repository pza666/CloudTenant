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
// router.beforeEach((to, from, next) => {
//   if (localStorage.getItem('token') && to.path === '/login') {
//     console.log(2);
//     next(false)
//   } else if (!localStorage.getItem('token') && to.path === '/login') { //放行的判断
//     next(); //放行
//   } else if (!localStorage.getItem('token')) { //你这个判断进入之后会 一直跳login 没有给他放行 所以会一直进login 你需要用next（）结束路由守卫
//     console.log(1);
//     next('/login') //
//   }
// })
// router.beforeEach((to, from, next) => {
// if (localStorage.getItem('token') && to.path === '/login') {
//   next(false)
// } else if (!localStorage.getItem('token')) {
//   if (to.path === '/login') {
//     next()
//   } else {
//     next('/login')
//   }
//   // next('/login')
// }else if (localStorage.getItem('token')) {
//   next(false)  // 这里好像也重复了  之所以没报错 是因为  next（false） 且 localStorage.getItem('token') 为空  你后面可以试试localStorage.getItem('token')有值的话 再把这里面 执行的改成 next('/login') 也会报错 报栈溢出的错
// }
// else if (to.path === '/login' && !localStorage.getItem('token')) {
//   next()  // 你这里的判断重复了
// }
// })
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
// 如果不是去登录页的话先获取是否有对应的token值，也就是是否登录状态中
// const tokenStr = window.sessionStorage.getItem('token')
// next()：放行    next('/login')：加上路径强制跳转   next(false)：返回来时的路由
// if (to.path === '/login' && !tokenStr) {
// 第一种情况：没有token并且要去登录页让他重定向到登录页（因为上面一进来就重定向了）
// next()
// } else if (!tokenStr) {
// 第二种情况：防止第一种情况没捕获到：如用户没登录想去其他页面调回登录页
// next('/login')
// } else if (tokenStr && to.path === '/login') {
// 第三种情况：如果有token值还想回去登录页阻断
// next(false)
// } else if (tokenStr) {
// 第四种情况：在有token之后除了去登录页其他页面都可以去
// next()
// }
// })
export default router
