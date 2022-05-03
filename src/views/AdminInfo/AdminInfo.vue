<template>
    <el-main>
        <!-- 面包屑区域 -->
        <bread-crumb :navData="navData"></bread-crumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 顶部搜索与添加管理员模块 -->
            <el-row :gutter="36">
                <el-col :span="10">
                    <el-input placeholder="请输入要查询的管理人员" @clear="clearInput" clearable v-model="keyword">
                        <el-button type="primary" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary" @click="addOrEdit('添加管理员')">添加管理员</el-button>
            </el-row>
            <!-- 中间表格数据 -->
            <el-table border :data="adminData">
                <el-table-column align="center" label="#" type="index"></el-table-column>
                <el-table-column align="center" label="姓名" prop="name"></el-table-column>
                <el-table-column align="center" label="邮箱地址" prop="email"></el-table-column>
                <el-table-column align="center" label="手机号码" prop="phone"></el-table-column>
                <el-table-column align="center" label="职位权限" prop="postition"></el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scoped">
                        <el-switch v-model="scoped.row.status>1" @change="handlestatusChange(scoped.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scoped">
                        <el-tooltip effect="dark" content="修改信息" placement="top">
                            <el-button icon="el-icon-edit" size="mini" type="primary"
                                @click="addOrEdit('修改管理员',scoped.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="修改密码" placement="top">
                            <el-button icon="el-icon-setting" size="mini" type="warning"
                                @click="addOrEdit('修改密码',scoped.row)">
                            </el-button>
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
                :current-page="pageNum" :hide-on-single-page="SorH" :page-sizes="[2, 10, 15, 20]" :page-size="pageSize"
                layout="->, total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加或更新管理员模块，给每一个表单项设置宽度就会在一行否则是两行显示，也可在 form 添加 inline 成表单内联 -->
        <el-dialog @close="resetForm" :title="title" :visible.sync="dialogFormVisible" width="50%">
            <el-form ref="adminInfoRef" :rules="adminInfoRules" :model="adminInfo" label-width="80px">
                <el-form-item label="手机号码" prop="phone">
                    <el-input :disabled="title=='修改管理员'" v-model="adminInfo.phone" placeholder="请输入您的手机号码"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="adminInfo.name" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="adminInfo.email" placeholder="请输入您的邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="职位权限" prop="postition">
                    <el-input v-model="adminInfo.postition" placeholder="请输入您的权限职务"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="handleForm">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改密码模块 -->
        <el-dialog @close="resetForm" :title="title" :visible.sync="dialogPasswordFormVisible" width="50%">
            <el-form ref="passwordInfoRef" :rules="passwordInfoRules" :model="passwordInfo" label-width="80px">
                <el-form-item label="手机号码" prop="phone">
                    <el-input disabled v-model="passwordInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPasswd">
                    <el-input v-model="passwordInfo.oldPasswd" placeholder="请输入您的旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPasswd">
                    <el-input v-model="passwordInfo.newPasswd" placeholder="请输入您的新密码"></el-input>
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
    // 引入sha1插件后进行加密传输到数据库后修改密码
    import sha1 from 'sha1'
    // 引入lodash对搜索进行节流
    import _ from 'lodash'
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
                pageSize: 2,   // 控制每一页显示的条目数
                pageNum: 1,  // 当前页码值，默认为1
                keyword: '',   // 搜索的管理员名
                adminData: [],    // 表格数据
                dialogFormVisible: false,   // 控制添加管理员弹出框的显示与隐藏
                adminInfo: {
                    name: '',
                    email: '',
                    phone: '',
                    postition: ''
                },   // 添加的管理管理员信息
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
                },   // 添加管理管理员信息时的表单校验
                dialogPasswordFormVisible: false,    // 控制修改密码弹出框的显示与隐藏
                passwordInfo: {
                    phone: '',
                    newPasswd: '',
                    oldPasswd: '',
                },    // 重置密码的表单信息
                passwordInfoRules: {
                    oldPasswd: [
                        { required: true, message: '请输入您的密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ],
                    newPasswd: [
                        { required: true, message: '请输入您的新密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ],
                    new1Password: [
                        { required: true, message: '请输入您的新密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ]
                }
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
            // 获取管理管理员列表信息，默认是第一页并且取5条数据
            async getadminInfoList(pageNum = 1, pageSize = 2) {
                // 切换页码和切换条目数时，用最新的值重置当前页码和每页数据的条目数
                pageNum = this.pageNum
                pageSize = this.pageSize
                // 1、解构获取到的数据
                const { data } = await this.$request(`admin/index?currentPage=${pageNum}&sizePage=${pageSize}`)
                const { data: dataList, code } = data
                const { records, total } = dataList
                // 2、判断状态码是否为200，不是的话返回一个错误信息
                if (code !== 200) {
                    return this.$message({
                        type: 'error',
                        message: '获取管理管理员数据失败！'
                    })
                }
                // 3、是的话提示管理员后赋值给对应的变量
                this.$message({
                    type: 'success',
                    message: '获取管理管理员数据成功！'
                })
                this.adminData = records
                this.total = total
            },
            // 处理查询管理员操作，用了节流操作，防止用户疯狂点击搜索
            handleSearch: _.throttle(async function (pnum = 1, key, psize = 2) {
                let { pageNum, pageSize, keyword } = this
                // 判断key的原始类型是否为string，因为第一次搜索触发的时候是一个事件对象（点击搜索查询）
                // 但当切换页码和页面条目数的时候已经是可以拿到输入框的字符串了，如果是有值则赋值
                if (typeof key === 'string') {
                    pageNum = pnum
                    pageSize = psize
                    keyword = key
                } else if (!this.keyword.replaceAll(' ', '')) {
                    return
                } else {
                    // 不仅要修改请求时的当前页，还要修改本身页面的当前页
                    this.pageNum = pageNum = 1
                }
                // 查询的用户不存在捕获错误并且给用户提示后重新获取列表数据
                try {
                    const { data } = await this.$request(`admin/search?currentPage=${pageNum}&sizePage=${pageSize}&keyword=${keyword}`)
                    this.adminData = data.data.records
                    this.total = data.data.total
                    this.$message({
                        type: 'success',
                        message: `获取数据成功，共有 ${this.total} 条数据!`
                    })
                } catch (error) {
                    this.$message({
                        type: 'error',
                        message: '无此用户，请重新查询!'
                    })
                    this.keyword = ''
                    this.getadminInfoList()
                }
            }, 500),
            // 清空文本框的回调函数
            clearInput() {
                // 不仅要修改请求时的当前页，还要修改本身页面的当前页
                this.pageNum = 1
                this.getadminInfoList(1, this.pageSize)
            },
            // 处理状态按钮改变的回调
            async handlestatusChange(adminInfo) {
                let { status, phone } = adminInfo
                console.log(adminInfo);
                // 如果状态是封禁状态1就改为2普通管理员，反之如果是2普通管理员改为1封禁状态
                status = status == 1 ? 2 : 1
                // 声明一个变量准备接收传回来的值，并准备下一步操作
                let data = null
                try {
                    // 如果权限不够捕获并且提示用户权限不足
                    data = await this.$request.post(`admin/upStatus?phone=${phone}&status=${status}`)
                    console.log(data);
                } catch (error) {
                    // 如果该管理员的权限不是超级管理员则进行提示，并返回
                    this.$message({
                        type: 'error',
                        message: '不好意思，您当前权限不足以修改管理员状态!'
                    })
                    return
                }
                // 如果符合所有条件并且修改成功提示用户
                if (data.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '修改管理用户权限成功!'
                    })
                    // 有和没有关键词的情况下在修改了对应的状态都是停留在当前的页面
                    if (this.keyword.replaceAll(' ', '')) {
                        this.handleSearch(this.pageNum, this.keyword, this.pageSize)
                    } else {
                        this.getadminInfoList()
                    }
                }
            },
            // 重置表单校验结果以及清除数据
            resetForm() {
                // 如果是修改密码的话重置表单并返回退出该函数
                if (this.title === '修改密码') {
                    this.dialogPasswordFormVisible = false
                    this.passwordInfo = {
                        phone: '',
                        oldPasswd: '',
                        newPasswd: ''
                    }
                    this.$refs.passwordInfoRef.resetFields()
                    return
                }
                this.dialogFormVisible = false
                this.$refs.adminInfoRef.resetFields()
            },
            // 页码切换获取最新页码并且赋值重新发请求
            handleCurrentChange(pageNum) {
                // 先将最新的当前页码赋值给全局的页码使之能在请求里正常赋值
                this.pageNum = pageNum
                // 如果搜索框不为空的话，则将当前页码发给查询出来的数据进行更新页码
                if (this.keyword.replaceAll(' ', '')) {
                    this.handleSearch(pageNum, this.keyword, this.pageSize)
                } else {
                    // 如果keyword是空的话则直接更新页码值重新发请求
                    this.getadminInfoList(pageNum, this.pageSize)
                }
            },
            // 页面显示条目个数发生改变调用该回调
            handleSizeChange(pageSize) {
                // 上下基本同理，只不过在切换页面条目数的时候最好将页码值重置为1
                this.pageSize = pageSize
                if (this.keyword.replaceAll(' ', '')) {
                    this.pageNum = 1
                    this.handleSearch(this.pageNum, this.keyword, pageSize)
                } else {
                    this.pageNum = 1
                    this.getadminInfoList(this.pageNum, pageSize)
                }
            },
            // 添加管理员、修改管理员、修改密码的回调处理
            addOrEdit(title, adminInfo = null) {
                this.title = title
                // 如果不在添加管理员中清空对应的数据的话，先点击修改管理员后会将数据赋值到管理员信息对象，
                // 再点击添加管理员会有回显，所以每次进入时都要清空一下
                if (title === '添加管理员') {
                    this.adminInfo = {
                        name: '',
                        email: '',
                        phone: '',
                        postition: ''
                    }
                    this.dialogFormVisible = true
                } else if (title === '修改管理员') {
                    // 因为只有一层对象，所以要做扩展运算(浅拷贝）为浅拷贝，所以原对象和传入的对象已不是同一个，移除数据和校验结果的时候并不会有数据出错的问题
                    this.adminInfo = { ...adminInfo }
                    this.dialogFormVisible = true
                    return
                } else if (title === '修改密码') {
                    this.passwordInfo.phone = adminInfo.phone
                    this.dialogPasswordFormVisible = true
                }
            },
            // 修改或添加管理员提交表单数据的回调
            handleForm() {
                this.$refs.adminInfoRef.validate(async valid => {
                    if (!valid) {
                        return
                    }
                    await this.$request.post('admin/saveOrUp', this.adminInfo)
                    if (this.keyword.replaceAll(' ', '')) {
                        this.handleSearch(this.pageNum, this.keyword, this.pageSize)
                    } else {
                        this.keyword = ''
                        this.getadminInfoList(1, this.pageSize)
                    }
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                })
            },
            // 修改管理员密码的确定按钮回调
            handleEditPasswordForm() {
                /*  主要是校验输入的旧密码是否和管理员本身的旧密码一致
                    旧密码是否和新密码一致
                    新密码和二次输入的新密码是否一致  */
                this.$refs.passwordInfoRef.validate(async valid => {
                    if (!valid) {
                        return
                    } else {
                        let { oldPasswd, newPasswd, new1Password } = this.passwordInfo
                        oldPasswd = sha1(oldPasswd)
                        newPasswd = sha1(newPasswd)
                        new1Password = sha1(new1Password)
                        console.log(oldPasswd);
                        if (oldPasswd !== this.adminData[0].password) {
                            this.$message({
                                type: 'error',
                                message: '旧密码输入有误，请重新输入!'
                            })
                        } else if (newPasswd !== new1Password) {
                            this.$message({
                                type: 'error',
                                message: '新密码不一致，请重新输入!'
                            })
                        } else if (this.adminData[0].password === newPasswd) {
                            this.$message({
                                type: 'error',
                                message: '新密码不能与旧密码重复，请重新输入!'
                            })
                        } else {
                            // 在发请求前将数据浅拷贝一份，否则请求还没发完就会被加密的数据覆盖
                            let passwordInfo = { ...this.passwordInfo }
                            passwordInfo.oldPasswd = oldPasswd
                            passwordInfo.newPasswd = newPasswd
                            await this.$request.post('admin/editPasswd', passwordInfo)
                            this.$message({
                                type: 'success',
                                message: '密码修改成功，请重新登录!'
                            })
                            localStorage.removeItem('token')
                            this.$router.push('/login')
                            this.dialogPasswordFormVisible = false
                        }
                    }
                })
            },
            // 删除管理员账号的回调
            deleteAdmin(adminInfo) {
                this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async (res) => {
                    // 如果点击的是确定按钮会到then里执行，删除成功后判断是否有keyword，如果有，表示当前是在查询管理员，要调用第一个分支继续获取搜索管理员的数据
                    await this.$request.post(`admin/delete?phone=${adminInfo.phone}`)
                    // 如果当前删除后返回的页面数据是1的话，表示删除的是最后一条数据，在当前页-1的时候要先判断当前页是否是第一页是的话不改变，不是的话往前见一页
                    const pageNum = this.adminData.length == 1 ? (this.pageNum <= 1 ? 1 : this.pageNum--) : this.pageNum
                    if (!!this.keyword) {
                        this.handleSearch(pageNum)
                    } else {
                        this.getadminInfoList(pageNum)
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '不好意思，您的权限不足以删除管理员信息!'
                    });
                });
            }
        },
    }
</script>
<style lang="less" scoped></style>