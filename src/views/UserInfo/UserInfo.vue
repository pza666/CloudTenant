<template>
    <el-main>
        <!-- 顶部面包屑 -->
        <bread-crumb :navData="navData"></bread-crumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 顶部搜索用户模块 -->
            <el-row :gutter="36">
                <el-col :span="10">
                    <el-input placeholder="请输入要查询的用户名" clearable v-model="username">
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 中间表格数据 -->
            <el-table :data="userData" border style="width: 100%">
                <el-table-column align="center" label="#" type="index"></el-table-column>
                <el-table-column align="center" label="用户名" prop="date"></el-table-column>
            </el-table>
            <!-- 底部分页器 @current-change="handleCurrentChange" -->
            <el-pagination @size-change="handleSizeChange" :hide-on-single-page="SorH" background :current-page="1"
                :page-sizes="[15, 20, 25, 30]" :page-size="pageSize"
                layout="->, total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </el-main>
</template>
<script>
    export default {
        name: 'UserInfo',
        data() {
            return {
                navData: ['用户管理', '用户列表'],
                username: '',   // 要查询的用户名
                userData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],     // 表格数据对象
                total: 10,   // 页码总页数
                pageSize: 15,   // 当前页面显示的数据条数
            }
        },
        computed: {
            SorH() {
                return this.pageSize >= this.total ? true : false
            }
        },
        methods: {
            // 查询用户名的回调
            handleSearch() { },
            // 页面显示条目个数发生改变调用该回调
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
            }
        },
    }
</script>
<style lang="less" scoped></style>