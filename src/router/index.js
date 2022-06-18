import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Login/Login.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Home.vue'),
        children: [
            { path: '/admininfo', name: 'admininfo', component: () => import(/* webpackChunkName: "AdminList" */ '../views/AdminInfo/AdminInfo.vue') },
            { path: '/userinfo', name: 'userinfo', component: () => import(/* webpackChunkName: "UserList" */ '../views/UserInfo/UserInfo.vue') },
            { path: '/lease', name: 'lease', component: () => import(/* webpackChunkName: "HouseInfo" */ '../views/HouseInfo/Lease/Lease.vue') },
            { path: '/secondhand', name: 'secondhand', component: () => import(/* webpackChunkName: "HouseInfo" */ '../views/HouseInfo/SecondHand/SecondHand.vue') },
            { path: '/article', name: 'article', component: () => import(/* webpackChunkName: "Article" */ '../views/Article/Article.vue') },
        ],
    },
];

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes,
});
// 挂载路由导航守卫：注意不要让带有路径的next重复执行，否则会栈溢出，执行顺序很重要
router.beforeEach((to, from, next) => {
    // 如果不是去登录页的话先获取是否有对应的token值，也就是是否登录状态中
    const tokenStr = window.localStorage.getItem('token');
    // next()：放行    next('/login')：加上路径强制跳转   next(false)：返回来时的路由
    if (to.path === '/login' && !tokenStr) {
        // 第一种情况：没有token并且要去登录页让他重定向到登录页（因为上面一进来就重定向了）
        next();
    } else if (!tokenStr) {
        // 第二种情况：防止第一种情况没捕获到：如用户没登录想去其他页面调回登录页
        next('/login');
    } else if (tokenStr && to.path === '/login') {
        // 第三种情况：如果有token值还想回去登录页阻断
        next(false);
    } else if (tokenStr) {
        // 第四种情况：在有token之后除了去登录页其他页面都可以去
        next();
    }
});
export default router;
