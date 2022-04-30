<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <span class="cloud-tenant">云租客后台管理系统</span>
            <el-button>退出</el-button>
        </el-header>

        <!-- 侧边栏及中间内容区域 -->
        <Sidebar></Sidebar>
    </el-container>
</template>
<script>
    import Sidebar from '@/components/Sidebar/Sidebar'
    export default {
        name: 'Home',
        components: {
            Sidebar
        }
    }
</script>
<style lang="less" scoped>
    .el-container {
        background-color: #eaedf1;

        /* 顶部背景、文字和按钮的样式 */
        .el-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #2295ff;
            height: 80px !important;

            .cloud-tenant {
                font-size: 30px;
                color: #eee;
            }

            .el-button {
                font-size: 16px;
                color: #2295ff;
                font-weight: 700;
            }
        }
    }
</style>