<template>
    <el-main>
        <!-- 面包屑区域 -->
        <bread-crumb :navData="navData"></bread-crumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 顶部搜索与添加管理员模块 -->
            <el-row :gutter="36">
                <el-col :span="10">
                    <el-input placeholder="请输入要查询的管理人员" clearable v-model="adminname">
                        <el-button type="primary" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary" @click="addOrEdit('添加用户')">添加用户</el-button>
            </el-row>
            <!-- 中间表格数据 -->
            <el-table border :data="adminData">
                <el-table-column align="center" label="#" type="index"></el-table-column>
                <el-table-column align="center" label="姓名" prop="name"></el-table-column>
                <el-table-column align="center" label="邮箱地址" prop="email"></el-table-column>
                <el-table-column align="center" label="手机号码" prop="phone"></el-table-column>
                <el-table-column align="center" label="用户职位" prop="postition"></el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scoped">
                        <el-switch v-model="status" @change="handlestatusChange"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scoped">
                        <el-tooltip effect="dark" content="修改信息" placement="top">
                            <el-button icon="el-icon-edit" size="mini" type="primary"
                                @click="addOrEdit('修改用户',scoped.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="修改密码" placement="top">
                            <el-button icon="el-icon-setting" size="mini" type="warning"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除" placement="top">
                            <el-button icon="el-icon-delete" size="mini" type="danger" @click="deleteAdmin(scoped.row)">
                            </el-button>>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部分页器 -->
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pageNum" :hide-on-single-page="SorH" :page-sizes="[1, 10, 15, 20]" :page-size="pageSize"
                layout="->, total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加或更新管理员模块，给每一个表单项设置宽度就会在一行否则是两行显示，也可在 form 添加 inline 成表单内联 -->
        <el-dialog @close="resetForm" :title="title" :visible.sync="dialogFormVisible" width="50%">
            <el-form ref="adminInfoRef" :rules="adminInfoRules" :model="adminInfo" label-width="80px">
                <el-form-item label="手机号码" prop="phone">
                    <el-input :disabled="title=='修改用户'" v-model="adminInfo.phone" placeholder="请输入您的手机号码"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="adminInfo.name" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="adminInfo.email" placeholder="请输入您的邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="用户职位" prop="postition">
                    <el-input v-model="adminInfo.postition" placeholder="请输入您的权限职务"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="handleForm">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改密码模块 -->
        <el-dialog @close="resetPasswordForm" :title="修改密码" :visible.sync="dialogPasswordFormVisible" width="50%">
            <el-form ref="passwordInfoRef" :rules="passwordInfoRules" :model="passwordInfo" label-width="80px">
                <el-form-item label="手机号码" prop="phone">
                    <el-input disabled v-model="passwordInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="passwordInfo.oldPassword" placeholder="请输入您的旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="passwordInfo.newPassword" placeholder="请输入您的新密码"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="new1Password">
                    <el-input v-model="passwordInfo.new1Password" placeholder="请再输入一次"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="handleEditPasswordForm">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>
<script>
    export default {
        name: 'AdminInfo',
        data() {
            // 合并写法
            var check = (rule, value, cb) => {
                if (rule.field == 'phone') {
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
            // var checkphone = (rule, value, cb) => {
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
                title: '',
                total: 0,   // 页面数据总条目数
                pageSize: 10,    // 每一页显示多少条数据
                pageSize: 1,   // 控制每一页显示的条目数
                pageNum: 1,  // 当前页码值，默认为1
                adminname: '',   // 搜索的用户名
                adminData: [],    // 表格数据
                status: true,    // 按钮状态
                dialogFormVisible: false,   // 控制添加用户弹出框的显示与隐藏
                adminInfo: {
                    name: '',
                    email: '',
                    phone: '',
                    postition: ''
                },   // 添加的管理用户信息
                adminInfoRules: {
                    // 第一个对象校验的是否输入了值，第二个对象是校验输入的值是否合法
                    name: [
                        { required: true, message: '请输入您的姓名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
                        { validator: check, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入您的手机号码', trigger: 'blur' },
                        { validator: check, trigger: 'blur' }
                    ],
                    postition: [
                        { required: true, message: '请输入您的权限职务', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                },   // 添加管理用户信息时的表单校验
                j: {}
            }
        },
        computed: {
            // 计算页面数据如果不足一页以上的时候隐藏分页器
            SorH() {
                return this.pageSize >= this.total ? true : false
            }
        },
        mounted() {
            this.getadminInfoList()
        },
        methods: {
            // 获取管理用户列表信息，默认是第一页并且取5条数据
            async getadminInfoList(pageNum = 1, pageSize = 5) {
                // 切换页码和切换条目数时，重新设置页码数和每页取多少条数据
                pageNum = this.pageNum
                pageSize = this.pageSize
                // 1、解构获取到的数据
                const { data } = await this.$request(`admin/index?currentPage=${pageNum}&sizePage=${pageSize}`)
                // console.log(data);
                // return
                const { data: dataList, code } = data
                const { records, total } = dataList

                // 2、判断状态码是否为200，不是的话返回一个错误信息
                if (code !== 200) {
                    return this.$message({
                        type: 'error',
                        message: '获取管理用户数据失败！'
                    })
                }
                // 3、是的话提示用户后赋值给对应的变量
                this.$message({
                    type: 'success',
                    message: '获取管理用户数据成功！'
                })
                this.adminData = records
                this.total = total
            },
            // 处理查询管理员操作
            handleSearch() {
                this.adminname
            },
            // 处理状态按钮改变的回调
            handlestatusChange() {
                console.log(2);
            },
            // 提交表单数据发请求
            handleForm() {
                this.$refs.adminInfoRef.validate(async valid => {
                    if (!valid) {
                        return
                    }
                    await this.$request.post('admin/saveOrUp', this.adminInfo)
                    this.getadminInfoList()
                    this.dialogFormVisible = false
                })
            },
            // 重置表单校验结果以及清除数据
            resetForm() {
                this.dialogFormVisible = false
                if (this.title == '添加用户') {
                    this.adminInfo = {
                        name: '',
                        email: '',
                        phone: '',
                        postition: ''
                    }
                }
                // 因为做多了一层浅拷贝，所以原对象和传入的对象已不是同一个，移除数据和校验结果并不会有数据出错的问题
                this.$refs.adminInfoRef.resetFields()
            },
            // 页面显示条目个数发生改变调用该回调
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.getadminInfoList(pageSize)
            },
            // 页码切换获取最新页码并且赋值重新发请求
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum
                this.getadminInfoList(pageNum)
            },
            // 添加用户按钮的显示与隐藏
            addOrEdit(title, adminInfo = null) {
                this.title = title
                this.dialogFormVisible = true
                if (title != '修改用户') {
                    return
                }
                // 因为只有一层对象，所以要做扩展运算为浅拷贝，否则数据会有误
                this.adminInfo = { ...adminInfo }
            },
            // 删除用户的回调
            deleteAdmin(adminInfo) {
                this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const { data } = await this.$request.post(`admin/delete?phone=${adminInfo.phone}`)
                    if (data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getadminInfoList()
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
    }
</script>
<style lang="less" scoped></style>