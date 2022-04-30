<template>
    <el-main>
        <!-- 面包屑区域 -->
        <bread-crumb :navData="navData"></bread-crumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 顶部搜索与添加用户 -->
            <el-row :gutter="36">
                <el-col :span="10">
                    <el-input placeholder="请输入要查询的用户名" clearable v-model="username">
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary" @click="handleAdd">添加用户</el-button>
            </el-row>
            <el-table border :data="tableData">
                <el-table-column align="center" label="#" type="index"></el-table-column>
                <el-table-column align="center" label="姓名" prop="name"></el-table-column>
                <el-table-column align="center" label="邮箱" prop="name"></el-table-column>
                <el-table-column align="center" label="电话" prop="name"></el-table-column>
                <el-table-column align="center" label="角色" prop="name"></el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scoped">
                        <el-switch v-model="status" @change="handlestatusChange"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scoped">
                        <el-tooltip effect="dark" content="修改" placement="top">
                            <el-button icon="el-icon-edit" size="mini" type="primary"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除" placement="top">
                            <el-button icon="el-icon-delete" size="mini" type="danger"></el-button>>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="分配权限" placement="top">
                            <el-button icon="el-icon-setting" size="mini" type="warning"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-main>
</template>
<script>
    export default {
        name: 'AdminInfo',
        data() {
            return {
                navData: ['后台管理', '管理员'],    // 面包屑文字数据
                username: '',   // 搜索的用户名
                tableData: [{ name: '王小虎' }],    // 表格数据
                status: true    // 按钮状态
            }
        },
        methods: {
            // 处理查询管理员操作
            handleSearch() {
                console.log(1);
            },
            // 处理添加用户操作
            handleAdd() {
                console.log(2);
            },
            // 处理状态按钮改变的回调
            handlestatusChange() {
                console.log(3);
            }
        },
    }
</script>
<style lang="less" scoped></style>