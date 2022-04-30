<template>
    <el-main>
        <!-- 顶部面包屑 -->
        <bread-crumb :navData="navData"></bread-crumb>
        <!-- 卡片视图区域 -->
        <el-card></el-card>
    </el-main>
</template>
<script>
    export default {
        name: 'UserInfo',
        data() {
            return {
                navData: ['用户管理', '用户列表']
            }
        },
    }
</script>
<style lang="less" scoped></style>