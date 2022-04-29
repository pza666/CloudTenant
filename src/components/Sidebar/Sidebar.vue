<template>
    <!-- 侧边栏主体区域 -->
    <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse?'70px':'180px'">
            <div class="toggle-button" @click="isCollapse = !isCollapse">|||</div>
            <!--  @open="handleOpen" @close="handleClose" -->
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse"
                :collapse-transition="false" background-color="#2295ff" text-color="#fff" active-text-color="#fdbd09">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 右侧内容主题 -->
        <el-main>
            <!-- 路由占位符 -->
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false   // 控制
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
        }

        .el-menu--collapse {
            width: 100%;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

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
</style>