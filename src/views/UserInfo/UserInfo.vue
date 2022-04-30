<template>
    <el-main>
        <bread-crumb :navData="navData"></bread-crumb>
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
<style lang="">

</style>