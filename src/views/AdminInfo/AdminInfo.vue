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
            <!-- 中间表格数据 -->
            <el-table border :data="tableData">
                <el-table-column align="center" label="#" type="index"></el-table-column>
                <el-table-column align="center" label="姓名" prop="name"></el-table-column>
                <el-table-column align="center" label="邮箱地址" prop="name"></el-table-column>
                <el-table-column align="center" label="手机号码" prop="name"></el-table-column>
                <el-table-column align="center" label="用户职位" prop="name"></el-table-column>
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
            <!-- 底部分页器 @size-change="handleSizeChange" @current-change="handleCurrentChange" -->
            <el-pagination :current-page="1" :page-sizes="[5, 10, 15, 20]" :page-size="10"
                layout="->, total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </el-card>

        <!-- 添加用户模块，给每一个表单项设置宽度就会在一行否则是两行显示，也可在 form 添加 inline 成表单内联 -->
        <el-dialog @close="resetForm" title="添加用户" :visible.sync="dialogFormVisible" width="50%">
            <el-form ref="userInfoRef" :rules="userInfoRules" :model="userInfo" label-width="80px">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="userInfo.username" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="userInfo.email" placeholder="请输入您的邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="iphone">
                    <el-input v-model="userInfo.iphone" placeholder="请输入您的手机号码"></el-input>
                </el-form-item>
                <el-form-item label="用户职位" prop="role">
                    <el-input v-model="userInfo.role" placeholder="请输入您的权限职务"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="handleForm">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>
<script>
    import request from '../../axios/index.js'
    export default {
        name: 'AdminInfo',
        data() {
            // 合并写法
            var check = (rule, value, cb) => {
                if (rule.field == 'iphone') {
                    // 验证手机号的正则表达式
                    const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                    if (regMobile.test(value)) {
                        return cb()
                    }
                    cb(new Error('请输入合法的手机号'))
                } else {
                    // 验证邮箱的正则表达式
                    const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
                    if (regEmail.test(value)) {
                        return cb()
                    }
                    cb(new Error('请输入合法的邮箱'))
                }
            }
            // // 验证邮箱的规则
            // var checkEmail = (rule, value, cb) => {
            //     // 验证邮箱的正则表达式
            //     const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            //     if (regEmail.test(value)) {
            //         return cb()
            //     }
            //     cb(new Error('请输入合法的邮箱'))
            // }
            // // 验证手机号的规则
            // var checkIphone = (rule, value, cb) => {
            //     console.log(rule);
            //     // 验证手机号的正则表达式
            //     const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            //     if (regMobile.test(value)) {
            //         return cb()
            //     }
            //     cb(new Error('请输入合法的手机号'))
            // }
            return {
                navData: ['后台管理', '管理员'],    // 面包屑文字数据
                username: '',   // 搜索的用户名
                tableData: [{ name: '王小虎' }],    // 表格数据
                status: true,    // 按钮状态
                dialogFormVisible: false,   // 控制添加用户弹出框的显示与隐藏
                userInfo: {
                    username: '',
                    email: '',
                    iphone: '',
                    role: ''
                },   // 添加的管理用户信息
                userInfoRules: {
                    // 第一个对象校验的是否输入了值，第二个对象是校验输入的值是否合法
                    username: [
                        { required: true, message: '请输入您的姓名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
                        { validator: check, trigger: 'blur' }
                    ],
                    iphone: [
                        { required: true, message: '请输入您的手机号码', trigger: 'blur' },
                        { validator: check, trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请输入您的权限职务', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                },   // 添加管理用户信息时的表单校验
            }
        },
        mounted() {
            this.getUserInfoList()
        },
        methods: {
            // 获取管理用户列表信息
            async getUserInfoList() {
                const result = await request('user')
                console.log(result)
            },
            // 处理查询管理员操作
            handleSearch() {
                console.log(1);
            },
            // 处理添加用户操作
            handleAdd() {
                this.dialogFormVisible = true
            },
            // 处理状态按钮改变的回调
            handlestatusChange() {
                console.log(2);
            },
            // 提交表单数据发请求
            handleForm() {
                this.$refs.userInfoRef.validate(valid => {
                    if (!valid) {
                        return
                    }
                    this.getUserInfoList()
                    this.dialogFormVisible = false
                })
            },
            // 重置表单校验结果以及清除数据
            resetForm() {
                this.dialogFormVisible = false
                this.userInfo = {
                    username: '',
                    email: '',
                    iphone: '',
                    role: ''
                }
                this.$refs.userInfoRef.resetFields()
            }
        },
    }
</script>
<style lang="less" scoped></style>