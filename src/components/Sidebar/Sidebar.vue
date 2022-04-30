<template>
    <!-- 侧边栏主体区域 -->
    <el-container>
        <!-- 左侧侧边栏 -->
        <el-aside :width="isCollapse?'80px':'180px'">
            <div class="toggle-button" @click="isCollapse = !isCollapse">|||</div>
            <el-menu router :default-active="$route.path.replace('/','')" unique-opened class="el-menu-vertical-demo"
                :collapse="isCollapse" :collapse-transition="false" background-color="#2295ff" text-color="#fff"
                active-text-color="#fdbd09">
                <!-- 每一个侧边栏的大项 -->
                <el-submenu v-for="item in sidebarList" :key="item.id" :index="item.id">
                    <template slot="title">
                        <i class="icon1 iconfont" :class="item.iconName"></i>
                        <span>{{item.name}}</span>
                    </template>
                    <!-- 外边大项循环完，循环内部的侧边栏项，每一个小项是为一组，将图标和名字绑在一起 -->
                    <el-menu-item v-for="item1 in item.children" :key="item1.routeName" :index="item1.routeName">
                        <i class="icon2 iconfont" :class="item1.iconName1"></i>
                        <span>{{item1.childrenName}}</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧内容主题：路由占位符 -->
        <router-view></router-view>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false,   // 控制
                sidebarList: [
                    {
                        id: '1',
                        iconName: 'icon-background-management',
                        name: '后台权限',
                        children: [
                            {
                                routeName: 'admininfo',
                                iconName1: 'icon-admin',
                                childrenName: '管理员'
                            }
                        ]
                    },
                    {
                        id: '2',
                        iconName: 'icon-users',
                        name: '用户管理',
                        children: [
                            {
                                routeName: 'userinfo',
                                iconName1: 'icon-user-info',
                                childrenName: '用户信息'
                            }
                        ]
                    },
                    {
                        id: '3',
                        iconName: 'icon-house',
                        name: '房源信息',
                        children: [
                            { routeName: 'recommended', iconName1: 'icon-good', childrenName: '推荐房源' },
                            { routeName: 'lease', iconName1: 'icon-rent-house', childrenName: '租赁房源' },
                            { routeName: 'secondhand', iconName1: 'icon-secondary', childrenName: '二手房源' },
                            { routeName: 'latest', iconName1: 'icon-new', childrenName: '最新房源' },
                        ]
                    },
                    {
                        id: '4',
                        iconName: 'icon-audit',
                        name: '内容审核',
                        children: [
                            {
                                routeName: 'article',
                                iconName: 'icon-article',
                                childrenName: '审核文章'
                            }
                        ]
                    },
                ]   // 侧边栏数据
            }
        }
    }
</script>

<style lang="less" scoped>
    /* 侧边栏样式 */
    .el-aside {
        height: 100vh;
        background-color: #2295ff;

        /* 需要重置菜单列表突出来的 1px 右边框像素值就不会有突兀了 */
        .el-menu {
            border-right: none;

            /* 大项图标颜色 */
            .icon1 {
                color: #eee;
                font-size: 26px;
                margin: 0 16px 0 5px;
                text-align: center;
            }
        }

        .el-menu--collapse {
            width: 100%;
        }
    }

    /* 主题内容颜色 */
    .el-main {
        background-color: #eaedf1;
    }

    /* 三条竖的样式 ||| */
    .toggle-button {
        background-color: #2273ff;
        font-size: 20px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        /* 设置 字符 间的间距： */
        letter-spacing: 0.2em;
        cursor: pointer;
    }

    /* 小项图标颜色 */
    .icon2 {
        color: #eee;
        font-size: 18px;
        margin-right: 10px;
    }
</style>